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

  function createExportRecord(profile, completedIds, reflections, exportedAt = new Date().toISOString()) {
    return {
      version: 1,
      exportedAt,
      student: {
        name: cleanText(profile.name),
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
    isGateComplete,
    toggleTask,
    createExportRecord,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  globalScope.ArduinoCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : window);
