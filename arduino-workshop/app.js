(function initWorkshop() {
  'use strict';

  const STORAGE_KEY = 'arduino-workshop-state-v1';
  const DB_NAME = 'arduino-workshop-files';
  const DB_STORE = 'artifacts';
  const ARTIFACT_KEY = 'current-artifact';
  const MAX_FILE_SIZE = 30 * 1024 * 1024;
  const sharedTaskIds = ['check-board', 'check-ide', 'check-port', 'check-blink', 'check-serial', 'check-diagnose'];
  const taskInputs = [...document.querySelectorAll('[data-task-id]')];
  const allTaskIds = taskInputs.map((input) => input.dataset.taskId);
  const core = window.ArduinoCore;
  const siteConfig = window.ArduinoWorkshopConfig || {};
  let artifactUrl = null;

  const defaultState = {
    completedIds: [],
    selectedRoute: '',
    profile: { name: '', group: '', projectTitle: '' },
    reflections: { learning: '', challenge: '' },
    teacherMode: false,
  };

  function readState() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!stored || typeof stored !== 'object') return structuredClone(defaultState);
      return {
        ...structuredClone(defaultState),
        ...stored,
        profile: { ...defaultState.profile, ...(stored.profile || {}) },
        reflections: { ...defaultState.reflections, ...(stored.reflections || {}) },
        completedIds: Array.isArray(stored.completedIds) ? stored.completedIds : [],
      };
    } catch {
      return structuredClone(defaultState);
    }
  }

  let state = readState();

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function setStatus(message, isError = false) {
    const target = document.querySelector('#status-message');
    target.textContent = message;
    target.classList.toggle('is-error', isError);
  }

  function gateComplete() {
    return core.isGateComplete(sharedTaskIds, state.completedIds);
  }

  function render() {
    const unlocked = gateComplete();
    taskInputs.forEach((input) => {
      input.checked = state.completedIds.includes(input.dataset.taskId);
    });

    document.querySelectorAll('.route-tasks').forEach((fieldset) => { fieldset.disabled = !unlocked; });
    document.querySelectorAll('input[name="route"]').forEach((input) => {
      input.disabled = !unlocked;
      input.checked = state.selectedRoute === input.value;
    });
    document.querySelectorAll('[data-route]').forEach((route) => {
      route.classList.toggle('is-selected', state.selectedRoute === route.dataset.route);
    });

    const gateStatus = document.querySelector('#gate-status');
    gateStatus.textContent = unlocked ? '健檢完成' : `尚缺 ${sharedTaskIds.filter((id) => !state.completedIds.includes(id)).length} 項`;
    gateStatus.className = `status-badge ${unlocked ? 'status-complete' : 'status-warning'}`;
    const lockLabel = document.querySelector('#route-lock-label');
    lockLabel.textContent = unlocked ? '路線已解鎖' : '健檢後解鎖';
    lockLabel.className = `status-badge ${unlocked ? 'status-complete' : 'status-locked'}`;

    const progress = core.calculateProgress(allTaskIds, state.completedIds);
    document.querySelector('#progress-text').textContent = `${progress.completed} / ${progress.total}`;
    document.querySelector('#progress-bar').style.width = `${progress.percent}%`;
    document.querySelector('.progress-track').setAttribute('aria-valuenow', String(progress.percent));
    document.querySelector('#next-action').textContent = !unlocked
      ? '先完成共同健檢，才能開啟興趣路線。'
      : progress.percent === 100
        ? '全部任務完成，記得整理作品紀錄並與同學分享。'
        : state.selectedRoute
          ? '主路線已選定，完成後可自由跨線挑戰。'
          : '健檢完成，現在選一條最有興趣的主路線。';

    document.querySelectorAll('[data-profile]').forEach((input) => {
      input.value = state.profile[input.dataset.profile] || '';
    });
    document.querySelectorAll('[data-reflection]').forEach((input) => {
      input.value = state.reflections[input.dataset.reflection] || '';
    });
    document.querySelector('#teacher-toggle').checked = Boolean(state.teacherMode);
    document.querySelector('#teacher-overview').hidden = !state.teacherMode;
  }

  taskInputs.forEach((input) => {
    input.addEventListener('change', () => {
      if (!sharedTaskIds.includes(input.dataset.taskId) && !gateComplete()) {
        input.checked = false;
        setStatus('請先完成開發板共同健檢。', true);
        return;
      }
      state.completedIds = core.toggleTask(state.completedIds, input.dataset.taskId);
      saveState();
      render();
    });
  });

  document.querySelectorAll('[data-profile]').forEach((input) => {
    input.addEventListener('input', () => {
      state.profile[input.dataset.profile] = input.value;
      saveState();
    });
  });

  document.querySelectorAll('[data-reflection]').forEach((input) => {
    input.addEventListener('input', () => {
      state.reflections[input.dataset.reflection] = input.value;
      saveState();
    });
  });

  document.querySelectorAll('input[name="route"]').forEach((input) => {
    input.addEventListener('change', () => {
      state.selectedRoute = input.value;
      saveState();
      render();
      document.querySelector(`[data-route="${input.value}"]`).scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  document.querySelector('#teacher-toggle').addEventListener('change', (event) => {
    state.teacherMode = event.target.checked;
    saveState();
    render();
  });

  function openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains(DB_STORE)) request.result.createObjectStore(DB_STORE);
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function withArtifactStore(mode, action) {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(DB_STORE, mode);
      const request = action(transaction.objectStore(DB_STORE));
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      transaction.oncomplete = () => db.close();
    });
  }

  function showArtifact(record) {
    const preview = document.querySelector('#artifact-preview');
    const removeButton = document.querySelector('#remove-artifact');
    if (artifactUrl) URL.revokeObjectURL(artifactUrl);
    artifactUrl = URL.createObjectURL(record.blob);
    const media = document.createElement(record.type.startsWith('video/') ? 'video' : 'img');
    media.src = artifactUrl;
    media.alt = record.type.startsWith('image/') ? 'Arduino 作品本機預覽' : '';
    if (media.tagName === 'VIDEO') media.controls = true;
    const caption = document.createElement('p');
    caption.textContent = `${record.name} · ${(record.size / 1024 / 1024).toFixed(1)} MB`;
    preview.replaceChildren(media, caption);
    preview.hidden = false;
    removeButton.hidden = false;
  }

  async function loadArtifact() {
    try {
      const record = await withArtifactStore('readonly', (store) => store.get(ARTIFACT_KEY));
      if (record) showArtifact(record);
    } catch {
      setStatus('這個瀏覽器目前無法讀取作品檔案，文字與勾選仍可正常使用。', true);
    }
  }

  document.querySelector('#artifact-input').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      setStatus('檔案格式不支援，請選擇圖片或影片。', true);
      event.target.value = '';
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setStatus('檔案超過 30 MB，請縮短影片或改用較小的圖片。', true);
      event.target.value = '';
      return;
    }
    try {
      const record = { blob: file, name: file.name, type: file.type, size: file.size, savedAt: new Date().toISOString() };
      await withArtifactStore('readwrite', (store) => store.put(record, ARTIFACT_KEY));
      showArtifact(record);
      setStatus('本機預覽已準備完成；請到下方 Google 表單正式繳交。');
    } catch {
      setStatus('作品檔案儲存失敗，請改用較小的檔案後再試一次。', true);
    } finally {
      event.target.value = '';
    }
  });

  document.querySelector('#remove-artifact').addEventListener('click', async () => {
    try {
      await withArtifactStore('readwrite', (store) => store.delete(ARTIFACT_KEY));
      if (artifactUrl) URL.revokeObjectURL(artifactUrl);
      artifactUrl = null;
      document.querySelector('#artifact-preview').replaceChildren();
      document.querySelector('#artifact-preview').hidden = true;
      document.querySelector('#remove-artifact').hidden = true;
      setStatus('作品檔案已移除。');
    } catch {
      setStatus('暫時無法移除作品檔案，請重新整理後再試。', true);
    }
  });

  document.querySelector('#export-button').addEventListener('click', () => {
    const record = {
      ...core.createExportRecord(state.profile, state.completedIds, state.reflections),
      selectedRoute: state.selectedRoute,
      progress: core.calculateProgress(allTaskIds, state.completedIds),
      artifactStoredOnThisDevice: !document.querySelector('#artifact-preview').hidden,
    };
    const blob = new Blob([JSON.stringify(record, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = state.profile.name.trim().replace(/[\\/:*?"<>|\s]+/g, '-') || 'student';
    link.href = url;
    link.download = `arduino-workshop-${safeName}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus('學習紀錄已匯出；作品照片或影片不會包含在 JSON 檔中。');
  });

  const resetDialog = document.querySelector('#reset-dialog');
  document.querySelector('#reset-button').addEventListener('click', () => resetDialog.showModal());
  document.querySelector('#confirm-reset').addEventListener('click', async () => {
    localStorage.removeItem(STORAGE_KEY);
    try { await withArtifactStore('readwrite', (store) => store.delete(ARTIFACT_KEY)); } catch { /* IndexedDB 不可用時仍清除其他資料。 */ }
    state = structuredClone(defaultState);
    if (artifactUrl) URL.revokeObjectURL(artifactUrl);
    artifactUrl = null;
    document.querySelector('#artifact-preview').replaceChildren();
    document.querySelector('#artifact-preview').hidden = true;
    document.querySelector('#remove-artifact').hidden = true;
    render();
    setStatus('本機紀錄已全部清除。');
  });

  function registerWebMcpTools() {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const register = (definition) => {
      try { void Promise.resolve(context.registerTool(definition)).catch(() => {}); } catch { /* 不支援時不影響一般介面。 */ }
    };
    register({
      name: 'read_workshop_progress',
      title: '讀取 Arduino 講座進度',
      description: 'Read the current student checklist progress and gate status without changing it.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute() {
        return { progress: core.calculateProgress(allTaskIds, state.completedIds), gateComplete: gateComplete(), selectedRoute: state.selectedRoute };
      },
    });
    register({
      name: 'update_workshop_task',
      title: '更新 Arduino 任務狀態',
      description: 'Mark one visible workshop checklist task as completed or incomplete.',
      inputSchema: {
        type: 'object',
        properties: { taskId: { type: 'string' }, completed: { type: 'boolean' } },
        required: ['taskId', 'completed'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        if (!input || !allTaskIds.includes(input.taskId) || typeof input.completed !== 'boolean') throw new Error('Invalid task update');
        if (!sharedTaskIds.includes(input.taskId) && !gateComplete()) throw new Error('Shared board check is incomplete');
        const alreadyCompleted = state.completedIds.includes(input.taskId);
        if (alreadyCompleted !== input.completed) state.completedIds = core.toggleTask(state.completedIds, input.taskId);
        saveState();
        render();
        return { taskId: input.taskId, completed: input.completed, progress: core.calculateProgress(allTaskIds, state.completedIds) };
      },
    });
  }

  function configureGoogleForm() {
    const frame = document.querySelector('#google-form-frame');
    const link = document.querySelector('#google-form-link');
    const unavailable = document.querySelector('#form-unavailable');
    const hasUrls = /^https:\/\/docs\.google\.com\/forms\//.test(siteConfig.formViewUrl || '')
      && /^https:\/\/docs\.google\.com\/forms\//.test(siteConfig.formEmbedUrl || '');

    if (!hasUrls) return;
    frame.src = siteConfig.formEmbedUrl;
    frame.hidden = false;
    link.href = siteConfig.formViewUrl;
    link.removeAttribute('aria-disabled');
    unavailable.hidden = true;
  }

  render();
  void loadArtifact();
  configureGoogleForm();
  registerWebMcpTools();
})();
