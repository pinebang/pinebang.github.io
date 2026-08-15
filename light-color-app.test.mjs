import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  lightColorQuestions,
  lightColorTableCells,
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

test("光的色彩頁面在教材前提供 Cosci 視覺化解說連結", () => {
  const html = readFileSync(new URL("./light-color.html", import.meta.url), "utf8");
  const linkIndex = html.indexOf("https://cosci.tw/run/?name=1CW3ld1683252577531");
  const lessonIndex = html.indexOf('<section class="lesson-video"');

  assert.ok(linkIndex >= 0);
  assert.ok(linkIndex < lessonIndex);
});

test("光的色彩頁面提供第二個 Cosci 連結與操作後提示", () => {
  const html = readFileSync(new URL("./light-color.html", import.meta.url), "utf8");
  const secondLink = "https://cosci.tw/run/?name=S6ZM2I1673939403413";

  assert.ok(html.includes(secondLink));
  assert.equal((html.match(/操作完之後，再回到本頁練習。/g) || []).length, 2);
});

test("光的色彩頁面包含兩組下拉式表格", () => {
  const html = readFileSync(new URL("./light-color.html", import.meta.url), "utf8");

  assert.match(html, /id="colorTableList"/);
  assert.match(html, /檢查表格答案/);
  assert.doesNotMatch(html, /id="questionList"/);
});

test("光的色彩單元包含教材圖片判讀題", () => {
  assert.equal(lightColorQuestions.length, 0);
  assert.equal(lightColorTableCells.length, 20);
});

test("光的色彩單元可以計算分數與錯題", () => {
  const answers = Object.fromEntries(
    [...lightColorQuestions, ...lightColorTableCells].map((item) => [item.id, item.answer]),
  );
  answers["single-yellow-1-reflected"] = "紅光";

  const graded = gradeAnswers(answers);

  assert.equal(graded.correct, 19);
  assert.equal(graded.total, 20);
  assert.equal(graded.score, 95);
  assert.deepEqual(graded.missed.map((question) => question.id), ["single-yellow-1-reflected"]);
});

test("光的色彩單元送出的資料會標記正確單元", () => {
  const answers = Object.fromEntries(
    [...lightColorQuestions, ...lightColorTableCells].map((item) => [item.id, item.answer]),
  );
  const graded = gradeAnswers(answers);
  const payload = buildSubmissionPayload({ classSeat: "10112" }, answers, graded);

  assert.equal(payload.lessonTitle, "光的色彩與物體顏色");
  assert.equal(payload.classSeat, "10112");
  assert.equal(payload.score, 100);
  assert.equal(payload.answers.length, 20);
});
