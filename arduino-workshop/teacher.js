(function initTeacherPage() {
  'use strict';

  const AUTH_SESSION_KEY = 'arduino-workshop-teacher-auth-v1';
  const sharedTaskIds = ['check-board', 'check-ide', 'check-port', 'check-blink', 'check-serial', 'check-diagnose'];
  const stageTaskIds = [
    ['myth-light', 'myth-piano', 'myth-reaction', 'myth-whack'],
    ['myth-climate', 'myth-radar', 'myth-timer', 'myth-bin'],
    ['myth-memory', 'myth-safe', 'myth-1a2b', 'myth-station'],
    ['myth-dino', 'myth-snake', 'myth-tetris'],
  ];
  const taskLabels = Object.fromEntries([...document.querySelectorAll('[data-task-id]')].map((input) => [input.dataset.taskId, input.closest('label')?.textContent.trim() || input.dataset.taskId]));
  const endpoint = window.ArduinoWorkshopConfig?.completionApiUrl || '';
  const clientId = window.ArduinoWorkshopConfig?.googleClientId || '';
  let credential = '';
  let email = '';
  let students = [];
  let selectedStudent = null;

  function setStatus(id, message, isError = false) {
    const target = document.querySelector(`#${id}`);
    if (!target) return;
    target.textContent = message;
    target.classList.toggle('is-error', isError);
  }

  function decodeCredentialEmail(token) {
    try {
      const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(decodeURIComponent(atob(payload).split('').map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`).join(''))).email || '';
    } catch { return ''; }
  }

  function persistAuth(nextCredential, nextEmail) {
    credential = nextCredential;
    email = nextEmail;
    try { sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({ credential, email })); } catch { /* 部分瀏覽器可能停用工作階段儲存。 */ }
  }

  function restoreAuth() {
    try {
      const stored = JSON.parse(sessionStorage.getItem(AUTH_SESSION_KEY) || 'null');
      if (!stored?.credential || !stored?.email || !stored.email.endsWith('@ms.gmjh.tyc.edu.tw')) return false;
      credential = stored.credential;
      email = stored.email;
      return true;
    } catch { return false; }
  }

  function renderNewbie(tasks) {
    const target = document.querySelector('#teacher-newbie-status');
    const complete = sharedTaskIds.every((id) => tasks[id] === true);
    target.innerHTML = `<strong>新手村：${complete ? '已全部完成' : '尚未全部完成'}</strong><span>${sharedTaskIds.map((id) => `<span class="teacher-check ${tasks[id] ? 'is-complete' : ''}">${tasks[id] ? '●' : '○'} ${id.replace('check-', '')}</span>`).join('')}</span>`;
  }

  function renderSelectedStudent() {
    const tasks = selectedStudent?.tasks || {};
    document.querySelectorAll('.teacher-stage').forEach((stage) => { stage.disabled = !selectedStudent; });
    document.querySelectorAll('#teacher-stages [data-task-id]').forEach((input) => { input.checked = tasks[input.dataset.taskId] === true; });
    renderNewbie(tasks);
    const hasStudent = Boolean(selectedStudent);
    const selection = document.querySelector('#teacher-selection-status');
    selection.textContent = hasStudent ? selectedStudent.classSeat : '尚未選擇';
    selection.className = `status-badge ${hasStudent ? 'status-complete' : 'status-locked'}`;
    document.querySelector('#teacher-save').disabled = !hasStudent;
  }

  function renderStudents() {
    const select = document.querySelector('#teacher-student');
    select.innerHTML = '<option value="">請選擇學生班級座號</option>';
    students.forEach((student) => { const option = document.createElement('option'); option.value = student.classSeat; option.textContent = student.classSeat; select.append(option); });
    select.disabled = false;
  }

  async function loadStudents() {
    if (!/^https:\/\/script\.google\.com\/macros\/s\//.test(endpoint)) { setStatus('teacher-save-status', '尚未設定完成狀況資料來源。', true); return; }
    try {
      const response = await fetch(endpoint, { cache: 'no-store' });
      if (!response.ok) throw new Error('讀取名單失敗');
      const payload = ArduinoCore.normalizeCompletionPayload(await response.json());
      if (!ArduinoCore.validateCompletionPayload(payload)) throw new Error('名單格式不正確');
      students = payload.students;
      renderStudents();
      setStatus('teacher-save-status', `已讀取 ${students.length} 位學生。`);
    } catch (error) { setStatus('teacher-save-status', error.message || '目前無法讀取學生名單。', true); }
  }

  function handleCredential(response) {
    const nextEmail = decodeCredentialEmail(response.credential).toLowerCase();
    if (!nextEmail.endsWith('@ms.gmjh.tyc.edu.tw')) { setStatus('teacher-login-status', '請使用學校 @ms.gmjh.tyc.edu.tw 帳號登入。', true); return; }
    persistAuth(response.credential, nextEmail);
    setStatus('teacher-login-status', `已登入：${nextEmail}。`);
    loadStudents();
  }

  function configureLogin() {
    if (restoreAuth()) { setStatus('teacher-login-status', `已登入：${email}。`); loadStudents(); }
    if (!clientId) { setStatus('teacher-login-status', '尚未設定 Google 登入用戶端。', true); return; }
    const waitForGoogle = () => {
      if (window.google?.accounts?.id) { window.google.accounts.id.initialize({ client_id: clientId, callback: handleCredential }); window.google.accounts.id.renderButton(document.querySelector('#teacher-login'), { theme: 'outline', size: 'large', text: 'signin_with' }); return; }
      window.setTimeout(waitForGoogle, 300);
    };
    waitForGoogle();
  }

  document.querySelector('#teacher-student').addEventListener('change', (event) => { selectedStudent = students.find((student) => student.classSeat === event.target.value) || null; renderSelectedStudent(); });
  document.querySelectorAll('#teacher-stages [data-task-id]').forEach((input) => input.addEventListener('change', () => { if (selectedStudent) selectedStudent.tasks[input.dataset.taskId] = input.checked; }));
  document.querySelector('#teacher-save').addEventListener('click', async () => {
    if (!selectedStudent || !credential) return;
    const button = document.querySelector('#teacher-save'); button.disabled = true; setStatus('teacher-save-status', '儲存中...');
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ teacher: true, credential, classSeat: selectedStudent.classSeat, tasks: selectedStudent.tasks }) });
      const payload = await response.json(); if (!response.ok || !payload.ok) throw new Error(payload.error || '儲存失敗');
      setStatus('teacher-save-status', '老師確認已儲存，公開總表稍後會更新。');
    } catch (error) { setStatus('teacher-save-status', error.message || '儲存失敗，請稍後再試。', true); }
    finally { button.disabled = false; }
  });
  renderSelectedStudent();
  configureLogin();
})();
