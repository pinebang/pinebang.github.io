import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  lightColorQuestions,
  gradeAnswers,
  buildSubmissionPayload,
} from "./light-color-app.js";

test("光的色彩頁面在教材前提供 PhET 色彩視覺模擬連結", () => {
  const html = readFileSync(new URL("./light-color.html", import.meta.url), "utf8");
  const linkIndex = html.indexOf("https://phet.colorado.edu/sims/html/color-vision/latest/color-vision_all.html?locale=zh_TW");
  const lessonIndex = html.indexOf('<section class="lesson-video"');

  assert.ok(linkIndex >= 0);
  assert.ok(linkIndex < lessonIndex);
  assert.match(html, /target="_blank"/);
});

test("光的色彩單元包含教材圖片判讀題", () => {
  assert.equal(lightColorQuestions.length, 10);
  assert.ok(lightColorQuestions.some((question) => question.image));
  assert.equal(lightColorQuestions.find((question) => question.id === "l04").answer, "黃");
});

test("光的色彩單元可以計算分數與錯題", () => {
  const answers = Object.fromEntries(lightColorQuestions.map((question) => [question.id, question.answer]));
  answers.l04 = "紅";

  const graded = gradeAnswers(answers);

  assert.equal(graded.correct, 9);
  assert.equal(graded.total, 10);
  assert.equal(graded.score, 90);
  assert.deepEqual(graded.missed.map((question) => question.id), ["l04"]);
});

test("光的色彩單元送出的資料會標記正確單元", () => {
  const answers = Object.fromEntries(lightColorQuestions.map((question) => [question.id, question.answer]));
  const graded = gradeAnswers(answers);
  const payload = buildSubmissionPayload({ classSeat: "10112" }, answers, graded);

  assert.equal(payload.lessonTitle, "光的色彩與物體顏色");
  assert.equal(payload.classSeat, "10112");
  assert.equal(payload.score, 100);
  assert.equal(payload.answers.length, 10);
});
