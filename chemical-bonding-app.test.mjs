import test from "node:test";
import assert from "node:assert/strict";
import {
  buildSubmissionPayload,
  formatParticipantRows,
  getQuestionStats,
  gradeAnswers,
  maskStudentName,
  normalizeStudentInfo,
  youtubeEmbedUrl,
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
    { classSeat: "10112" },
    answers,
    graded,
    questions,
  );

  assert.equal(payload.classSeat, "10112");
  assert.equal(payload.className, "10112");
  assert.equal(payload.seatNumber, "");
  assert.equal(payload.studentName, "");
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

test("masks student names before showing them publicly", () => {
  assert.equal(maskStudentName("王小明"), "王○明");
  assert.equal(maskStudentName("林可"), "林○");
  assert.equal(maskStudentName("A"), "A");
});

test("formats public participant rows without exposing scores", () => {
  const rows = [
    {
      completedAt: "2026-07-12T01:20:00.000Z",
      classSeat: "10112",
      className: "10112",
      seatNumber: "",
      studentName: "",
      score: 100,
    },
  ];

  const participants = formatParticipantRows(rows);

  assert.deepEqual(participants, [
    {
      completedAt: "2026-07-12T01:20:00.000Z",
      classSeat: "10112",
    },
  ]);
  assert.equal("score" in participants[0], false);
});

test("normalizes new and cached old student fields into class seat", () => {
  assert.deepEqual(normalizeStudentInfo({ classSeat: "101-12" }), {
    classSeat: "101-12",
  });
  assert.deepEqual(normalizeStudentInfo({ className: "101", seatNumber: "12" }), {
    classSeat: "10112",
  });
});

test("converts a short YouTube link to an embed URL", () => {
  assert.equal(youtubeEmbedUrl("https://youtu.be/ZyPhAY4E698"), "https://www.youtube.com/embed/ZyPhAY4E698");
  assert.equal(youtubeEmbedUrl("https://youtu.be/Gfi8360uL70"), "https://www.youtube.com/embed/Gfi8360uL70");
});
