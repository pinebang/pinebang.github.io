import { GOOGLE_APPS_SCRIPT_URL } from "./chemical-bonding-config.js";

const LESSON_TITLE = "酸鹼中和";

export const acidBaseQuestions = [
  {
    id: "a01",
    type: "choice",
    topic: "酸的性質",
    prompt: "下列哪一項最符合酸性水溶液的常見性質？",
    options: ["pH 小於 7", "pH 大於 7", "一定不能導電", "一定是藍色"],
    answer: "pH 小於 7",
    explanation: "酸性水溶液的 pH 通常小於 7，且常能導電。",
  },
  {
    id: "a02",
    type: "choice",
    topic: "鹼的性質",
    prompt: "下列哪一種物質在生活中常呈現鹼性？",
    options: ["小蘇打水", "檸檬汁", "醋", "汽水"],
    answer: "小蘇打水",
    explanation: "小蘇打溶於水後通常呈弱鹼性；檸檬汁、醋和汽水多偏酸性。",
  },
  {
    id: "a03",
    type: "choice",
    topic: "pH 值",
    prompt: "若某溶液 pH = 7，通常代表它是什麼性質？",
    options: ["中性", "強酸性", "強鹼性", "一定有毒"],
    answer: "中性",
    explanation: "在一般水溶液中，pH = 7 通常表示中性。",
  },
  {
    id: "a04",
    type: "choice",
    topic: "酸鹼中和",
    prompt: "酸和鹼發生中和反應時，通常會生成什麼？",
    options: ["鹽和水", "氧氣和氫氣", "金屬和水", "糖和水"],
    answer: "鹽和水",
    explanation: "酸鹼中和反應常可表示為酸 + 鹼 → 鹽 + 水。",
  },
  {
    id: "a05",
    type: "trueFalse",
    topic: "pH 判讀",
    prompt: "pH 越小，溶液通常越酸。",
    options: ["正確", "錯誤"],
    answer: "正確",
    explanation: "pH 越小代表酸性越強；pH 越大代表鹼性越強。",
  },
  {
    id: "a06",
    type: "trueFalse",
    topic: "中和觀念",
    prompt: "只要把任何酸和任何鹼混合，最後溶液一定剛好是 pH 7。",
    options: ["正確", "錯誤"],
    answer: "錯誤",
    explanation: "是否剛好 pH 7 要看酸和鹼的種類、濃度與加入量，不是混合就一定中性。",
  },
  {
    id: "a07",
    type: "choice",
    topic: "指示劑",
    prompt: "石蕊試紙遇酸性溶液時，常見變化是什麼？",
    options: ["藍色石蕊變紅", "紅色石蕊變藍", "一定變黑", "完全消失"],
    answer: "藍色石蕊變紅",
    explanation: "酸性溶液會使藍色石蕊試紙變紅；鹼性溶液會使紅色石蕊試紙變藍。",
  },
  {
    id: "a08",
    type: "choice",
    topic: "生活酸鹼",
    prompt: "胃酸的主要成分之一是鹽酸。胃酸過多時，制酸劑常利用什麼概念？",
    options: ["酸鹼中和", "金屬導電", "蒸發結晶", "光合作用"],
    answer: "酸鹼中和",
    explanation: "制酸劑常含弱鹼性物質，可中和過多胃酸，減輕不適。",
  },
  {
    id: "a09",
    type: "scenario",
    topic: "情境判斷",
    prompt: "某同學測得 A 溶液 pH = 3、B 溶液 pH = 11。哪一個判斷較合理？",
    options: ["A 偏酸，B 偏鹼", "A 偏鹼，B 偏酸", "兩者都中性", "兩者都不能導電"],
    answer: "A 偏酸，B 偏鹼",
    explanation: "pH 小於 7 為酸性，大於 7 為鹼性。",
  },
  {
    id: "a10",
    type: "scenario",
    topic: "中和計算概念",
    prompt: "將鹽酸慢慢滴入氫氧化鈉溶液，pH 最可能如何變化？",
    options: ["由大逐漸變小", "由小逐漸變大", "永遠不變", "一定先變成 14"],
    answer: "由大逐漸變小",
    explanation: "氫氧化鈉溶液偏鹼，加入酸後會逐漸被中和，pH 通常下降。",
  },
  {
    id: "a11",
    type: "choice",
    topic: "離子觀點",
    prompt: "在酸鹼中和的簡化離子觀點中，H+ 和 OH- 會生成什麼？",
    options: ["H2O", "NaCl", "CO2", "O2"],
    answer: "H2O",
    explanation: "酸提供的 H+ 可和鹼提供的 OH- 結合生成水。",
  },
  {
    id: "a12",
    type: "choice",
    topic: "安全觀念",
    prompt: "進行酸鹼實驗時，下列哪一項做法最安全？",
    options: ["戴護目鏡並少量操作", "直接用手摸強酸", "把未知溶液拿來聞很久", "把酸鹼隨意倒在桌上"],
    answer: "戴護目鏡並少量操作",
    explanation: "酸鹼可能刺激皮膚與眼睛，實驗時應少量操作並使用護目鏡等安全防護。",
  },
  {
    id: "a13",
    type: "trueFalse",
    topic: "生活酸鹼",
    prompt: "檸檬汁和醋通常都偏酸性。",
    options: ["正確", "錯誤"],
    answer: "正確",
    explanation: "檸檬汁含檸檬酸，醋含醋酸，因此通常偏酸性。",
  },
  {
    id: "a14",
    type: "scenario",
    topic: "反應產物",
    prompt: "鹽酸 HCl 和氫氧化鈉 NaOH 反應後，最主要生成哪一組物質？",
    options: ["氯化鈉和水", "氧氣和水", "氫氣和氯氣", "二氧化碳和水"],
    answer: "氯化鈉和水",
    explanation: "HCl + NaOH → NaCl + H2O，這是常見的酸鹼中和例子。",
  },
];

export function gradeAnswers(answers, questionList = acidBaseQuestions) {
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

export function buildSubmissionPayload(student, answers, graded, questionList = acidBaseQuestions) {
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

export function getQuestionStats(questionList = acidBaseQuestions) {
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
    acidBaseQuestions.map((question) => {
      const checked = document.querySelector(`input[name="${question.id}"]:checked`);
      return [question.id, checked ? checked.value : ""];
    }),
  );
}

function renderQuestions() {
  const container = document.querySelector("#questionList");
  container.innerHTML = acidBaseQuestions
    .map(
      (question, index) => `
        <article class="question-card" data-question-id="${question.id}">
          <div class="question-meta">
            <span>第 ${index + 1} 題</span>
            <span>${question.topic}</span>
          </div>
          <h3>${question.prompt}</h3>
          <div class="options">
            ${question.options
              .map(
                (option, optionIndex) => `
                  <label class="option" for="${optionId(question, optionIndex)}">
                    <input id="${optionId(question, optionIndex)}" type="radio" name="${question.id}" value="${option}">
                    <span>${option}</span>
                  </label>
                `,
              )
              .join("")}
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
    feedback.textContent = detail.isCorrect
      ? `答對了。${detail.explanation}`
      : `再想想。正確答案是「${detail.answer}」。${detail.explanation}`;
  });
}

function renderResult(graded) {
  const result = document.querySelector("#result");
  const missedList =
    graded.missed.length === 0
      ? "<li>全部答對，可以挑戰用酸鹼概念解釋生活例子。</li>"
      : graded.missed
          .map((item) => `<li>${item.topic}：${item.prompt}<br>你的答案：${item.selected || "未作答"}；正確答案：${item.answer}</li>`)
          .join("");

  result.hidden = false;
  result.innerHTML = `
    <div class="score-ring" aria-label="分數 ${graded.score} 分">${graded.score}<span>分</span></div>
    <div>
      <h2>練習結果</h2>
      <p>答對 ${graded.correct} / ${graded.total} 題。請對照錯題，回想酸、鹼、pH 與中和反應的關係。</p>
      <h3>錯題整理</h3>
      <ul>${missedList}</ul>
    </div>
  `;
}

function renderParticipants(participants) {
  const list = document.querySelector("#participantList");
  const count = document.querySelector("#participantCount");
  if (!list || !count) {
    return;
  }

  count.textContent = `${participants.length} 人完成`;
  if (participants.length === 0) {
    list.innerHTML = `<li class="participant-empty">尚無完成紀錄。</li>`;
    return;
  }

  list.innerHTML = participants
    .slice(0, 30)
    .map((student) => {
      const time = student.completedAt ? new Date(student.completedAt).toLocaleString("zh-TW", { hour12: false }) : "時間未記錄";
      return `
        <li class="participant-row">
          <strong>${student.classSeat || "未填班級座號"}</strong>
          <time>${time}</time>
        </li>
      `;
    })
    .join("");
}

function formatParticipantRows(rows) {
  return rows.map((row) => ({
    completedAt: row.completedAt,
    classSeat: String(row.classSeat || row.className || "").trim(),
  }));
}

function loadJsonp(url) {
  return new Promise((resolve, reject) => {
    const callbackName = `acidBaseParticipants_${Date.now()}_${Math.round(Math.random() * 10000)}`;
    const script = document.createElement("script");
    const separator = url.includes("?") ? "&" : "?";

    window[callbackName] = (data) => {
      delete window[callbackName];
      script.remove();
      resolve(data);
    };

    script.onerror = () => {
      delete window[callbackName];
      script.remove();
      reject(new Error("participants jsonp failed"));
    };

    script.src = `${url}${separator}action=participants&lessonTitle=${encodeURIComponent(LESSON_TITLE)}&callback=${callbackName}`;
    document.body.appendChild(script);
  });
}

async function loadParticipants() {
  const status = document.querySelector("#participantStatus");
  if (!GOOGLE_APPS_SCRIPT_URL) {
    status.textContent = "尚未設定 Google Apps Script，完成名單暫不更新。";
    return;
  }

  status.textContent = "正在讀取完成名單...";
  try {
    const data = await loadJsonp(GOOGLE_APPS_SCRIPT_URL);
    renderParticipants(formatParticipantRows(data.participants || []));
    status.textContent = "已顯示本單元最近 30 筆完成紀錄。";
  } catch (error) {
    status.textContent = "暫時無法讀取完成名單，請稍後再試。";
  }
}

async function submitToSheet(payload) {
  if (!GOOGLE_APPS_SCRIPT_URL) {
    return { skipped: true, message: "尚未設定 Google Apps Script，分數只會顯示在本頁。" };
  }

  const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });

  return { skipped: false, response };
}

function downloadPayload(payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `acid-base-neutralization-${payload.classSeat}.json`;
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
    const unanswered = acidBaseQuestions.filter((question) => !answers[question.id]);

    if (!classSeat) {
      submitStatus.textContent = "請先輸入班級座號。";
      return;
    }

    if (unanswered.length > 0) {
      submitStatus.textContent = `還有 ${unanswered.length} 題尚未作答。`;
      return;
    }

    const graded = gradeAnswers(answers);
    latestPayload = buildSubmissionPayload({ classSeat }, answers, graded);
    renderFeedback(graded);
    renderResult(graded);
    downloadButton.disabled = false;

    submitStatus.textContent = "正在送出作答資料...";
    try {
      const submission = await submitToSheet(latestPayload);
      submitStatus.textContent = submission.skipped ? submission.message : "作答資料已送出。";
      if (!submission.skipped) {
        setTimeout(loadParticipants, 1200);
      }
    } catch (error) {
      submitStatus.textContent = "分數已在本頁顯示，但送出到試算表時發生問題。";
    }
  });

  downloadButton.addEventListener("click", () => {
    if (latestPayload) {
      downloadPayload(latestPayload);
    }
  });
}

export function initAcidBasePage() {
  if (!document.querySelector("#questionList")) {
    return;
  }
  const stats = getQuestionStats();
  document.querySelector("#questionCount").textContent = `${stats.total} 題`;
  renderQuestions();
  renderParticipants([]);
  bindEvents();
  loadParticipants();
}

if (typeof document !== "undefined") {
  initAcidBasePage();
}
