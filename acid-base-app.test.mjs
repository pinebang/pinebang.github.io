import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  acidBaseQuestions,
  buildSubmissionPayload,
  getQuestionStats,
  gradeAnswers,
} from "./acid-base-app.js";

test("acid-base practice has enough mixed question types", () => {
  const stats = getQuestionStats(acidBaseQuestions);

  assert.ok(stats.total >= 12);
  assert.ok(stats.byType.choice >= 1);
  assert.ok(stats.byType.trueFalse >= 1);
  assert.ok(stats.byType.scenario >= 1);
});

test("acid-base answers can be graded", () => {
  const answers = Object.fromEntries(acidBaseQuestions.map((question) => [question.id, question.answer]));
  answers[acidBaseQuestions[0].id] = "__wrong__";

  const result = gradeAnswers(answers, acidBaseQuestions);

  assert.equal(result.total, acidBaseQuestions.length);
  assert.equal(result.correct, acidBaseQuestions.length - 1);
  assert.equal(result.missed.length, 1);
});

test("acid-base submission identifies the lesson", () => {
  const answers = Object.fromEntries(acidBaseQuestions.map((question) => [question.id, question.answer]));
  const graded = gradeAnswers(answers, acidBaseQuestions);
  const payload = buildSubmissionPayload({ classSeat: "10112" }, answers, graded, acidBaseQuestions);

  assert.equal(payload.lessonTitle, "酸鹼中和");
  assert.equal(payload.classSeat, "10112");
  assert.equal(payload.score, 100);
  assert.equal(payload.answers.length, acidBaseQuestions.length);
});

test("course navigation includes the acid-base page", () => {
  for (const file of ["index.html", "chemical-bonding.html", "periodic-table.html", "acid-base-neutralization.html"]) {
    const html = fs.readFileSync(file, "utf8");

    assert.match(html, /href="acid-base-neutralization\.html"/);
    assert.match(html, /酸鹼中和/);
  }
});

test("acid-base page follows the practice layout", () => {
  const html = fs.readFileSync("acid-base-neutralization.html", "utf8");

  assert.match(html, /酸鹼中和互動練習/);
  assert.match(html, /id="questionList"/);
  assert.match(html, /id="practiceForm"/);
  assert.match(html, /id="participantList"/);
  assert.match(html, /acid-base-app\.js/);
});

test("acid-base participant list is filtered by lesson", () => {
  const app = fs.readFileSync("acid-base-app.js", "utf8");

  assert.match(app, /lessonTitle=/);
  assert.match(app, /encodeURIComponent\(LESSON_TITLE\)/);
});
