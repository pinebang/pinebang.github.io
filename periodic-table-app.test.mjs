import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  buildSubmissionPayload,
  getQuestionStats,
  gradeAnswers,
  periodicQuestions,
} from "./periodic-table-app.js";

test("periodic table practice has enough mixed question types", () => {
  const stats = getQuestionStats(periodicQuestions);

  assert.ok(stats.total >= 12);
  assert.ok(stats.byType.choice >= 1);
  assert.ok(stats.byType.trueFalse >= 1);
  assert.ok(stats.byType.scenario >= 1);
});

test("periodic table answers can be graded", () => {
  const answers = Object.fromEntries(periodicQuestions.map((question) => [question.id, question.answer]));
  answers[periodicQuestions[0].id] = "__wrong__";

  const result = gradeAnswers(answers, periodicQuestions);

  assert.equal(result.total, periodicQuestions.length);
  assert.equal(result.correct, periodicQuestions.length - 1);
  assert.equal(result.missed.length, 1);
});

test("periodic table submission identifies the lesson", () => {
  const answers = Object.fromEntries(periodicQuestions.map((question) => [question.id, question.answer]));
  const graded = gradeAnswers(answers, periodicQuestions);
  const payload = buildSubmissionPayload({ classSeat: "10112" }, answers, graded, periodicQuestions);

  assert.equal(payload.lessonTitle, "元素週期表");
  assert.equal(payload.classSeat, "10112");
  assert.equal(payload.score, 100);
  assert.equal(payload.answers.length, periodicQuestions.length);
});

test("course navigation includes the periodic table page", () => {
  for (const file of ["index.html", "chemical-bonding.html", "periodic-table.html"]) {
    const html = fs.readFileSync(file, "utf8");

    assert.match(html, /href="periodic-table\.html"/);
    assert.match(html, /元素週期表/);
  }
});

test("periodic table page follows the chemical bonding practice layout", () => {
  const html = fs.readFileSync("periodic-table.html", "utf8");

  assert.match(html, /元素週期表互動練習/);
  assert.match(html, /id="questionList"/);
  assert.match(html, /id="practiceForm"/);
  assert.match(html, /id="participantList"/);
  assert.match(html, /periodic-table-app\.js/);
});

test("participant lists are filtered by lesson", () => {
  const chemicalApp = fs.readFileSync("chemical-bonding-app.js", "utf8");
  const periodicApp = fs.readFileSync("periodic-table-app.js", "utf8");
  const appsScript = fs.readFileSync("google-apps-script-score-collector.gs", "utf8");

  assert.match(chemicalApp, /lessonTitle=/);
  assert.match(chemicalApp, /encodeURIComponent\(LESSON_TITLE\)/);
  assert.match(periodicApp, /lessonTitle=/);
  assert.match(periodicApp, /encodeURIComponent\(LESSON_TITLE\)/);
  assert.match(appsScript, /lessonTitleFilter/);
  assert.match(appsScript, /row\[10\] === lessonTitleFilter/);
});
