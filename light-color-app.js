import { GOOGLE_APPS_SCRIPT_URL } from "./chemical-bonding-config.js";

const LESSON_TITLE = "光的色彩與物體顏色";

export const lightColorQuestions = [
  {
    id: "l01",
    type: "choice",
    topic: "單一頻率光",
    prompt: "根據教材圖，單一頻率的黃光照射物體時，光源中主要包含哪一種光？",
    options: ["黃光", "紅光和綠光", "藍光和紫光", "所有可見光"],
    answer: "黃光",
    explanation: "單一頻率的黃光可視為只含有黃光，和由多種色光組成的複合黃光不同。",
    image: "assets/light-color/single-and-composite-yellow-light.png",
  },
  {
    id: "l02",
    type: "choice",
    topic: "複合黃光",
    prompt: "教材中的複合黃光是由哪兩種色光組成？",
    options: ["紅光和綠光", "紅光和藍光", "綠光和藍光", "黃光和藍光"],
    answer: "紅光和綠光",
    explanation: "圖中以實線代表紅光、虛線代表綠光，兩者合成複合黃光。",
    image: "assets/light-color/single-and-composite-yellow-light.png",
  },
  {
    id: "l03",
    type: "choice",
    topic: "反射光",
    prompt: "在單一頻率的黃光下，紅色物體最可能反射什麼？",
    options: ["無光", "黃光", "藍光", "所有色光"],
    answer: "無光",
    explanation: "單一頻率黃光沒有紅光可供紅色物體反射，因此在此光源下可能看起來很暗。",
  },
  {
    id: "l04",
    type: "choice",
    topic: "看到的顏色",
    prompt: "在單一頻率的黃光下，白色物體反射黃光，我們看到的顏色是什麼？",
    options: ["紅", "綠", "黃", "黑"],
    answer: "黃",
    explanation: "白色物體能反射照到它的光，因此反射黃光進入眼睛時會看到黃色。",
    image: "assets/light-color/single-and-composite-yellow-light.png",
  },
  {
    id: "l05",
    type: "choice",
    topic: "光源與物體顏色",
    prompt: "在複合黃光（紅光＋綠光）下，藍色物體最可能看起來是什麼顏色？",
    options: ["藍色", "黃色", "白色", "黑色"],
    answer: "黑色",
    explanation: "複合黃光中沒有藍光，藍色物體缺少可反射的藍光，因此可能看起來接近黑色。",
  },
  {
    id: "l06",
    type: "choice",
    topic: "複合光判讀",
    prompt: "在複合黃光（紅光＋綠光）下，綠色物體最可能反射哪一種光？",
    options: ["紅光", "綠光", "藍光", "沒有光"],
    answer: "綠光",
    explanation: "綠色物體主要反射綠光；複合黃光中含有綠光，所以能反射綠光。",
  },
  {
    id: "l07",
    type: "trueFalse",
    topic: "看見物體",
    prompt: "物體反射的光進入眼睛後，我們才可能看見物體的顏色。",
    options: ["正確", "錯誤"],
    answer: "正確",
    explanation: "眼睛接收到物體反射的光，才能形成對物體顏色的視覺感受。",
  },
  {
    id: "l08",
    type: "trueFalse",
    topic: "白色物體",
    prompt: "白色物體在不同色光下，通常能反射照射到它的色光。",
    options: ["正確", "錯誤"],
    answer: "正確",
    explanation: "白色物體可反射多種可見光，因此在不同光源下可能呈現光源的顏色。",
  },
  {
    id: "l09",
    type: "choice",
    topic: "黑色物體",
    prompt: "黑色物體看起來黑，主要是因為它對可見光的作用通常是什麼？",
    options: ["吸收較多、反射較少", "只反射藍光", "只發出黃光", "把光變成聲音"],
    answer: "吸收較多、反射較少",
    explanation: "進入眼睛的反射光較少時，物體通常看起來較暗或接近黑色。",
  },
  {
    id: "l10",
    type: "choice",
    topic: "綜合判斷",
    prompt: "下列哪個敘述最能說明『看到的顏色』？",
    options: ["取決於光源、物體反射的光與進入眼睛的光", "只取決於物體名稱", "只取決於眼睛大小", "和光源完全無關"],
    answer: "取決於光源、物體反射的光與進入眼睛的光",
    explanation: "看見的顏色不是只由物體決定，也和照明光源及物體反射進入眼睛的光有關。",
  },
];

export function gradeAnswers(answers, questionList = lightColorQuestions) {
  const details = questionList.map((question) => {
    const selected = answers[question.id] ?? "";
    const isCorrect = selected === question.answer;
    return { ...question, selected, isCorrect };
  });
  const correct = details.filter((item) => item.isCorrect).length;
  const total = questionList.length;
  return {
    correct,
    total,
    score: total === 0 ? 0 : Math.round((correct / total) * 100),
    details,
    missed: details.filter((item) => !item.isCorrect),
  };
}

export function buildSubmissionPayload(student, answers, graded, questionList = lightColorQuestions) {
  const classSeat = String(student.classSeat || "").trim();
  return {
    lessonTitle: LESSON_TITLE,
    completedAt: new Date().toISOString(),
    classSeat,
    className: classSeat,
    seatNumber: "",
    studentName: "",
    score: graded.score,
    correct: graded.correct,
    total: graded.total,
    answers: questionList.map((question) => ({
      id: question.id,
      topic: question.topic,
      type: question.type,
      prompt: question.prompt,
      selected: answers[question.id] || "",
      correctAnswer: question.answer,
      isCorrect: answers[question.id] === question.answer,
    })),
  };
}

export function getQuestionStats(questionList = lightColorQuestions) {
  return questionList.reduce(
    (stats, question) => {
      stats.total += 1;
      stats.byType[question.type] = (stats.byType[question.type] || 0) + 1;
      stats.byTopic[question.topic] = (stats.byTopic[question.topic] || 0) + 1;
      return stats;
    },
    { total: 0, byType: {}, byTopic: {} },
  );
}

function optionId(question, optionIndex) {
  return `${question.id}-${optionIndex}`;
}

function collectAnswers() {
  return Object.fromEntries(
    lightColorQuestions.map((question) => {
      const checked = document.querySelector(`input[name="${question.id}"]:checked`);
      return [question.id, checked ? checked.value : ""];
    }),
  );
}

function renderQuestions() {
  const container = document.querySelector("#questionList");
  container.innerHTML = lightColorQuestions
    .map(
      (question, index) => `
        <article class="question-card" data-question-id="${question.id}">
          <div class="question-meta"><span>第 ${index + 1} 題</span><span>${question.topic}</span></div>
          <h3>${question.prompt}</h3>
          ${question.image ? `<img class="question-image" src="${question.image}" alt="單一頻率黃光與複合黃光示意圖">` : ""}
          <div class="options">
            ${question.options.map((option, optionIndex) => `<label class="option" for="${optionId(question, optionIndex)}"><input id="${optionId(question, optionIndex)}" type="radio" name="${question.id}" value="${option}"><span>${option}</span></label>`).join("")}
          </div>
          <p class="feedback" aria-live="polite"></p>
        </article>
      `,
    )
    .join("");
}

function renderFeedback(graded) {
  graded.details.forEach((detail) => {
    const card = document.querySelector(`[data-question-id="${detail.id}"]`);
    const feedback = card.querySelector(".feedback");
    card.classList.toggle("is-correct", detail.isCorrect);
    card.classList.toggle("is-wrong", !detail.isCorrect);
    feedback.textContent = detail.isCorrect ? `答對了。${detail.explanation}` : `再想想。正確答案是「${detail.answer}」。${detail.explanation}`;
  });
}

function renderResult(graded) {
  const result = document.querySelector("#result");
  const missedList = graded.missed.length === 0
    ? "<li>全部答對，可以進一步比較不同光源下的物體顏色。</li>"
    : graded.missed.map((item) => `<li>${item.topic}：${item.prompt}<br>你的答案：${item.selected || "未作答"}；正確答案：${item.answer}</li>`).join("");
  result.hidden = false;
  result.innerHTML = `<div class="score-ring" aria-label="分數 ${graded.score} 分">${graded.score}<span>分</span></div><div><h2>練習結果</h2><p>答對 ${graded.correct} / ${graded.total} 題。請對照解析，理解光源、反射光與看到的顏色之間的關係。</p><h3>錯題整理</h3><ul>${missedList}</ul></div>`;
}

function renderParticipants(participants) {
  const list = document.querySelector("#participantList");
  const count = document.querySelector("#participantCount");
  count.textContent = `${participants.length} 人完成`;
  list.innerHTML = participants.length === 0 ? `<li class="participant-empty">尚無完成紀錄。</li>` : participants.slice(0, 30).map((student) => {
    const time = student.completedAt ? new Date(student.completedAt).toLocaleString("zh-TW", { hour12: false }) : "時間未記錄";
    return `<li class="participant-row"><strong>${student.classSeat || "未填班級座號"}</strong><time>${time}</time></li>`;
  }).join("");
}

function loadJsonp(url) {
  return new Promise((resolve, reject) => {
    const callbackName = `lightColorParticipants_${Date.now()}_${Math.round(Math.random() * 10000)}`;
    const script = document.createElement("script");
    const separator = url.includes("?") ? "&" : "?";
    window[callbackName] = (data) => { delete window[callbackName]; script.remove(); resolve(data); };
    script.onerror = () => { delete window[callbackName]; script.remove(); reject(new Error("participants jsonp failed")); };
    script.src = `${url}${separator}action=participants&lessonTitle=${encodeURIComponent(LESSON_TITLE)}&callback=${callbackName}`;
    document.body.appendChild(script);
  });
}

async function loadParticipants() {
  const status = document.querySelector("#participantStatus");
  if (!GOOGLE_APPS_SCRIPT_URL) { status.textContent = "尚未設定 Google Apps Script，完成名單暫不更新。"; return; }
  status.textContent = "正在讀取完成名單...";
  try {
    const data = await loadJsonp(GOOGLE_APPS_SCRIPT_URL);
    const rows = (data.participants || []).map((row) => ({ completedAt: row.completedAt, classSeat: String(row.classSeat || row.className || "").trim() }));
    renderParticipants(rows);
    status.textContent = "已顯示本單元最近 30 筆完成紀錄。";
  } catch (error) { status.textContent = "暫時無法讀取完成名單，請稍後再試。"; }
}

async function submitToSheet(payload) {
  if (!GOOGLE_APPS_SCRIPT_URL) return { skipped: true, message: "尚未設定 Google Apps Script，分數只會顯示在本頁。" };
  await fetch(GOOGLE_APPS_SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) });
  return { skipped: false };
}

function downloadPayload(payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `light-color-${payload.classSeat}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function bindEvents() {
  const form = document.querySelector("#practiceForm");
  const submitStatus = document.querySelector("#submitStatus");
  const downloadButton = document.querySelector("#downloadResult");
  let latestPayload = null;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const classSeat = document.querySelector("#classSeat")?.value.trim() || "";
    const answers = collectAnswers();
    const unanswered = lightColorQuestions.filter((question) => !answers[question.id]);
    if (!classSeat) { submitStatus.textContent = "請先輸入班級座號。"; return; }
    if (unanswered.length > 0) { submitStatus.textContent = `還有 ${unanswered.length} 題尚未作答。`; return; }
    const graded = gradeAnswers(answers);
    latestPayload = buildSubmissionPayload({ classSeat }, answers, graded);
    renderFeedback(graded);
    renderResult(graded);
    downloadButton.disabled = false;
    submitStatus.textContent = "正在送出作答資料...";
    try {
      const submission = await submitToSheet(latestPayload);
      submitStatus.textContent = submission.skipped ? submission.message : "作答資料已送出。";
      if (!submission.skipped) setTimeout(loadParticipants, 1200);
    } catch (error) { submitStatus.textContent = "分數已在本頁顯示，但送出到試算表時發生問題。"; }
  });
  downloadButton.addEventListener("click", () => { if (latestPayload) downloadPayload(latestPayload); });
}

export function initLightColorPage() {
  if (!document.querySelector("#questionList")) return;
  document.querySelector("#questionCount").textContent = `${getQuestionStats().total} 題`;
  renderQuestions();
  renderParticipants([]);
  bindEvents();
  loadParticipants();
}

if (typeof document !== "undefined") initLightColorPage();
