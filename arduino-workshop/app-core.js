(function initArduinoCore(globalScope) {
  'use strict';

  function uniqueKnownIds(taskIds, completedIds) {
    const known = new Set(taskIds);
    return [...new Set(completedIds)].filter((id) => known.has(id));
  }

  function calculateProgress(taskIds, completedIds) {
    const total = taskIds.length;
    const completed = uniqueKnownIds(taskIds, completedIds).length;
    return {
      completed,
      total,
      percent: total === 0 ? 0 : Math.round((completed / total) * 100),
    };
  }

  function isGateComplete(requiredIds, completedIds) {
    const completed = new Set(completedIds);
    return requiredIds.every((id) => completed.has(id));
  }

  function toggleTask(completedIds, taskId) {
    const next = new Set(completedIds);
    if (next.has(taskId)) {
      next.delete(taskId);
    } else {
      next.add(taskId);
    }
    return [...next];
  }

  function cleanText(value) {
    return typeof value === 'string' ? value.trim() : '';
  }

  function normalizeClassSeat(value) {
    return cleanText(value).replace(/\s+/g, ' ');
  }

  function isSharedTaskLocked(requiredIds, completedIds, taskId) {
    return requiredIds.includes(taskId) && isGateComplete(requiredIds, completedIds);
  }

  function normalizeProgressForGate(requiredIds, completedIds) {
    const knownCompleted = uniqueKnownIds(workshopTaskIds, completedIds);
    return isGateComplete(requiredIds, knownCompleted)
      ? knownCompleted
      : knownCompleted.filter((id) => requiredIds.includes(id));
  }

  const workshopTaskIds = [
    'check-board', 'check-ide', 'check-port', 'check-blink', 'check-serial', 'check-diagnose',
    'myth-light', 'myth-piano', 'myth-reaction', 'myth-whack', 'myth-climate',
    'myth-radar', 'myth-timer', 'myth-bin', 'myth-memory', 'myth-safe',
    'myth-1a2b', 'myth-station', 'myth-dino', 'myth-snake', 'myth-tetris',
  ];

  const completionStages = [
    { id: 'newbie-village', label: '新手村', taskIds: workshopTaskIds.slice(0, 6), requireAll: true },
    { id: 'stage-one', label: '神火啟程', taskIds: workshopTaskIds.slice(6, 10), requireAll: false },
    { id: 'stage-two', label: '元素感知殿', taskIds: workshopTaskIds.slice(10, 14), requireAll: false },
    { id: 'stage-three', label: '賢者試煉塔', taskIds: workshopTaskIds.slice(14, 18), requireAll: false },
    { id: 'stage-four', label: '創世競技場', taskIds: workshopTaskIds.slice(18, 21), requireAll: false },
  ];

  function summarizeStageProgress(tasks) {
    const taskMap = Array.isArray(tasks)
      ? Object.fromEntries(tasks.map((taskId) => [taskId, true]))
      : tasks && typeof tasks === 'object' ? tasks : {};
    return completionStages.map((stage) => ({
      id: stage.id,
      label: stage.label,
      completed: stage.requireAll
        ? stage.taskIds.every((taskId) => taskMap[taskId] === true)
        : stage.taskIds.some((taskId) => taskMap[taskId] === true),
    }));
  }

  function calculateStageProgress(tasks) {
    const stages = summarizeStageProgress(tasks);
    const completed = stages.filter((stage) => stage.completed).length;
    return {
      completed,
      total: stages.length,
      percent: stages.length === 0 ? 0 : Math.round((completed / stages.length) * 100),
    };
  }

  function buildCompletionRows(roster, completed) {
    const completedSet = new Set((Array.isArray(completed) ? completed : []).map(normalizeClassSeat).filter(Boolean));
    const uniqueRoster = [...new Set((Array.isArray(roster) ? roster : []).map(normalizeClassSeat).filter(Boolean))];
    return uniqueRoster
      .sort((left, right) => left.localeCompare(right, 'zh-Hant', { numeric: true }))
      .map((classSeat) => ({ classSeat, completed: completedSet.has(classSeat) }));
  }

  function validateCompletionPayload(payload) {
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return false;
    const payloadKeys = Object.keys(payload).sort();
    if (payloadKeys.join(',') !== 'students,updatedAt') return false;
    if (!Array.isArray(payload.students) || typeof payload.updatedAt !== 'string') return false;
    return payload.students.every((student) => {
      if (!student || typeof student !== 'object' || Array.isArray(student)) return false;
      if (Object.keys(student).sort().join(',') !== 'classSeat,tasks') return false;
      if (normalizeClassSeat(student.classSeat) === '' || !student.tasks || typeof student.tasks !== 'object' || Array.isArray(student.tasks)) return false;
      const taskKeys = Object.keys(student.tasks).sort();
      if (taskKeys.join(',') !== [...workshopTaskIds].sort().join(',')) return false;
      return workshopTaskIds.every((taskId) => typeof student.tasks[taskId] === 'boolean');
    });
  }

  function normalizeCompletionPayload(payload) {
    if (!payload || !Array.isArray(payload.students)) return payload;
    const legacyTaskIds = [
      'check-board', 'check-ide', 'check-port', 'check-blink', 'check-serial', 'check-diagnose',
      'light-led', 'light-button', 'light-melody', 'light-extension', 'game-random', 'game-button',
      'game-score', 'game-extension', 'sensor-read', 'sensor-threshold', 'sensor-output',
      'sensor-extension', 'creative-plan', 'creative-prototype', 'creative-test', 'creative-extension',
    ];
    const studentAliases = Object.freeze({ Ya: '12345' });
    const normalizedStudents = payload.students.map((student) => {
      const sourceTasks = student && student.tasks;
      const classSeat = studentAliases[student?.classSeat] || student?.classSeat;
      if (!sourceTasks || workshopTaskIds.every((taskId) => Object.prototype.hasOwnProperty.call(sourceTasks, taskId))) {
        return { ...student, classSeat, tasks: sourceTasks };
      }
      const tasks = workshopTaskIds.reduce((result, taskId) => {
        result[taskId] = false;
        return result;
      }, {});
      workshopTaskIds.forEach((taskId, index) => {
        const legacyTaskId = legacyTaskIds[index];
        tasks[taskId] = sourceTasks[legacyTaskId] === true;
      });
      return { ...student, classSeat, tasks };
    });
    const mergedStudents = new Map();
    normalizedStudents.forEach((student) => {
      const existing = mergedStudents.get(student.classSeat);
      if (!existing) {
        mergedStudents.set(student.classSeat, student);
        return;
      }
      workshopTaskIds.forEach((taskId) => {
        existing.tasks[taskId] = existing.tasks[taskId] === true || student.tasks?.[taskId] === true;
      });
    });
    return {
      ...payload,
      students: [...mergedStudents.values()],
    };
  }

  function createExportRecord(profile, completedIds, reflections, exportedAt = new Date().toISOString()) {
    return {
      version: 1,
      exportedAt,
      student: {
        group: cleanText(profile.group),
        projectTitle: cleanText(profile.projectTitle),
      },
      completedTaskIds: [...new Set(completedIds)],
      reflections: {
        learning: cleanText(reflections.learning),
        challenge: cleanText(reflections.challenge),
      },
    };
  }

  const api = {
    calculateProgress,
    calculateStageProgress,
    isGateComplete,
    isSharedTaskLocked,
    normalizeProgressForGate,
    toggleTask,
    createExportRecord,
    normalizeClassSeat,
    buildCompletionRows,
    summarizeStageProgress,
    normalizeCompletionPayload,
    validateCompletionPayload,
    workshopTaskIds,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  globalScope.ArduinoCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : window);
