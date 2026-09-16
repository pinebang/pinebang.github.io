(function initTeacherPage() {
  'use strict';

  const sharedTaskIds = ['check-board', 'check-ide', 'check-port', 'check-blink', 'check-serial', 'check-diagnose'];
  const stageTaskIds = [
    ['myth-light', 'myth-piano', 'myth-reaction', 'myth-whack'],
    ['myth-climate', 'myth-radar', 'myth-timer', 'myth-bin'],
    ['myth-memory', 'myth-safe', 'myth-1a2b', 'myth-station'],
    ['myth-dino', 'myth-snake', 'myth-tetris'],
  ];
  const endpoint = window.ArduinoWorkshopConfig?.completionApiUrl || '';
  let students = [];
  let selectedStudent = null;
  let teacherCode = '';

  function setStatus(id, message, isError = false) {
    const target = document.querySelector(`#${id}`);
    if (!target) return;
    target.textContent = message;
    target.classList.toggle('is-error', isError);
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

  document.querySelector('#teacher-student').addEventListener('change', (event) => { selectedStudent = students.find((student) => student.classSeat === event.target.value) || null; renderSelectedStudent(); });
  document.querySelectorAll('#teacher-stages [data-task-id]').forEach((input) => input.addEventListener('change', () => { if (selectedStudent) selectedStudent.tasks[input.dataset.taskId] = input.checked; }));
  document.querySelector('#teacher-save').addEventListener('click', async () => {
    if (!selectedStudent) return;
    const button = document.querySelector('#teacher-save'); button.disabled = true; setStatus('teacher-save-status', '儲存中...');
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ teacher: true, teacherCode, classSeat: selectedStudent.classSeat, tasks: selectedStudent.tasks }) });
      const payload = await response.json(); if (!response.ok || !payload.ok) throw new Error(payload.error || '儲存失敗');
      setStatus('teacher-save-status', '老師確認已儲存，公開總表稍後會更新。');
    } catch (error) { setStatus('teacher-save-status', error.message || '儲存失敗，請稍後再試。', true); }
    finally { button.disabled = false; }
  });
  document.querySelector('#teacher-access-form').addEventListener('submit', (event) => {
    event.preventDefault();
    teacherCode = document.querySelector('#teacher-code').value;
    if (!teacherCode) return;
    setStatus('teacher-access-status', '正在驗證老師密碼...');
    loadStudents().then(() => setStatus('teacher-access-status', students.length ? '驗證完成，可以選擇學生。' : '沒有可選擇的學生。', !students.length));
  });
  renderSelectedStudent();
})();
