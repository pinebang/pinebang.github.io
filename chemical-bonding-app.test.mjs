import test from "node:test";
import assert from "node:assert/strict";
import {
  buildSubmissionPayload,
  getQuestionStats,
  gradeAnswers,
  questions,
} from "./chemical-bonding-app.js";

test("grades answers and returns missed question details", () => {
  const answers = Object.fromEntries(questions.map((question) => [question.id, question.answer]));
  answers[questions[0].id] = "__wrong__";

  const result = gradeAnswers(answers, questions);

  assert.equal(result.total, questions.length);
  assert.equal(result.correct, questions.length - 1);
  assert.equal(result.score, Math.round(((questions.length - 1) / questions.length) * 100));
  assert.equal(result.missed.length, 1);
  assert.equal(result.missed[0].id, questions[0].id);
});

test("builds a spreadsheet-ready submission payload", () => {
  const answers = Object.fromEntries(questions.map((question) => [question.id, question.answer]));
  const graded = gradeAnswers(answers, questions);
  const payload = buildSubmissionPayload(
    { className: "101", seatNumber: "12", studentName: "王小明" },
    answers,
    graded,
    questions,
  );

  assert.equal(payload.className, "101");
  assert.equal(payload.seatNumber, "12");
  assert.equal(payload.studentName, "王小明");
  assert.equal(payload.score, 100);
  assert.equal(payload.correct, questions.length);
  assert.equal(payload.total, questions.length);
  assert.equal(payload.answers.length, questions.length);
  assert.ok(payload.completedAt);
});

test("reports question type statistics for the practice dashboard", () => {
  const stats = getQuestionStats(questions);

  assert.ok(stats.total >= 12);
  assert.ok(stats.byType.choice >= 1);
  assert.ok(stats.byType.trueFalse >= 1);
  assert.ok(stats.byType.scenario >= 1);
});
