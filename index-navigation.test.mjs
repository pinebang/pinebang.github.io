import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");

test("作品展示的物理組提供光的色彩入口", () => {
  const physicalGroup = html.slice(html.indexOf("<h3>物理組</h3>"), html.indexOf("<h3>化學組</h3>"));
  assert.match(physicalGroup, /href="light-color\.html"/);
});

test("作品展示的化學組提供三個化學單元入口", () => {
  const chemistryGroup = html.slice(html.indexOf("<h3>化學組</h3>"), html.indexOf("<h3>生物組</h3>"));
  assert.match(chemistryGroup, /href="chemical-bonding\.html"/);
  assert.match(chemistryGroup, /href="periodic-table\.html"/);
  assert.match(chemistryGroup, /href="acid-base-neutralization\.html"/);
});

test("酸鹼中和不再以作品展示中的獨立卡片呈現", () => {
  const works = html.slice(html.indexOf('<section class="area works">'));
  const standaloneCard = /<a class="card" href="acid-base-neutralization\.html">/;
  assert.doesNotMatch(works, standaloneCard);
});
