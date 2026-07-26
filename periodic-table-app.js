import { GOOGLE_APPS_SCRIPT_URL } from "./chemical-bonding-config.js";

export const periodicQuestions = [
  {
    id: "p01",
    type: "choice",
    topic: "原子序",
    prompt: "元素週期表中，原子序代表什麼？",
    options: ["質子數", "中子數", "電子層數", "相對原子質量"],
    answer: "質子數",
    explanation: "原子序等於原子核中的質子數，也是元素身分最重要的依據。",
  },
  {
    id: "p02",
    type: "choice",
    topic: "元素符號",
    prompt: "下列哪一個是鈉的元素符號？",
    options: ["Na", "N", "S", "Ne"],
    answer: "Na",
    explanation: "鈉的英文名稱來自 sodium，元素符號是 Na。",
  },
  {
    id: "p03",
    type: "choice",
    topic: "週期",
    prompt: "同一週期的元素通常有相同的什麼特徵？",
    options: ["電子層數", "價電子數", "化學性質完全相同", "都是金屬"],
    answer: "電子層數",
    explanation: "週期表橫列稱為週期，同週期元素通常有相同的電子層數。",
  },
  {
    id: "p04",
    type: "choice",
    topic: "族",
    prompt: "同一族的主族元素通常有相似化學性質，主要原因是什麼？",
    options: ["價電子數相同", "原子序相同", "中子數相同", "顏色相同"],
    answer: "價電子數相同",
    explanation: "主族元素同族時，價電子數通常相同，因此化學性質常相似。",
  },
  {
    id: "p05",
    type: "choice",
    topic: "鹼金屬",
    prompt: "鋰、鈉、鉀屬於哪一類元素？",
    options: ["鹼金屬", "鹵素", "鈍氣", "類金屬"],
    answer: "鹼金屬",
    explanation: "鋰、鈉、鉀在第 1 族，是常見的鹼金屬。",
  },
  {
    id: "p06",
    type: "choice",
    topic: "鹵素",
    prompt: "氟、氯、溴、碘屬於哪一族元素？",
    options: ["鹵素", "鹼土金屬", "鈍氣", "過渡金屬"],
    answer: "鹵素",
    explanation: "氟、氯、溴、碘是第 17 族的鹵素，常與金屬形成鹽類。",
  },
  {
    id: "p07",
    type: "trueFalse",
    topic: "鈍氣",
    prompt: "氦、氖、氬因最外層電子排列穩定，所以通常不容易反應。",
    options: ["正確", "錯誤"],
    answer: "正確",
    explanation: "鈍氣的電子排列穩定，在一般情況下反應性低。",
  },
  {
    id: "p08",
    type: "trueFalse",
    topic: "金屬與非金屬",
    prompt: "週期表左側大多是非金屬，右側大多是金屬。",
    options: ["正確", "錯誤"],
    answer: "錯誤",
    explanation: "週期表左側與中間大多是金屬，右上方多為非金屬。",
  },
  {
    id: "p09",
    type: "choice",
    topic: "類金屬",
    prompt: "矽常用於半導體材料，它在週期表中通常被歸為哪一類？",
    options: ["類金屬", "鹼金屬", "鹵素", "鈍氣"],
    answer: "類金屬",
    explanation: "矽具有介於金屬與非金屬之間的性質，常被歸為類金屬。",
  },
  {
    id: "p10",
    type: "scenario",
    topic: "性質判斷",
    prompt: "某元素有光澤、可導電、可延展，最可能是哪一類元素？",
    options: ["金屬", "非金屬", "鈍氣", "鹵素"],
    answer: "金屬",
    explanation: "金屬通常具有光澤、良好導電性與延展性。",
  },
  {
    id: "p11",
    type: "scenario",
    topic: "元素位置",
    prompt: "一個元素位於第 3 週期、第 17 族，最可能具有哪種特性？",
    options: ["容易形成陰離子", "是活潑金屬", "通常完全不反應", "一定能導電"],
    answer: "容易形成陰離子",
    explanation: "第 17 族為鹵素，常傾向得到電子形成陰離子。",
  },
  {
    id: "p12",
    type: "choice",
    topic: "元素分類",
    prompt: "下列哪一個元素是非金屬？",
    options: ["氧", "鈉", "鐵", "銅"],
    answer: "氧",
    explanation: "氧位於週期表右上方，是常見非金屬元素。",
  },
  {
    id: "p13",
    type: "trueFalse",
    topic: "週期表規律",
    prompt: "週期表是依照原子序由小到大排列元素。",
    options: ["正確", "錯誤"],
    answer: "正確",
    explanation: "現代週期表依原子序排列，而不是單純依照原子量排列。",
  },
  {
    id: "p14",
    type: "scenario",
    topic: "生活應用",
    prompt: "食鹽中的氯離子來自氯元素。氯元素在週期表中屬於哪一類？",
    options: ["鹵素", "鈍氣", "鹼金屬", "類金屬"],
    answer: "鹵素",
    explanation: "氯是第 17 族鹵素，常與鈉等金屬形成鹽類。",
  },
];

export function gradeAnswers(answers, questionList = periodicQuestions) {
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

export function buildSubmissionPayload(student, answers, graded, questionList = periodicQuestions) {
  const classSeat = String(student.classSeat || "").trim();
  return {
    lessonTitle: "元素週期表",
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

export function getQuestionStats(questionList = periodicQuestions) {
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
    periodicQuestions.map((question) => {
      const checked = document.querySelector(`input[name="${question.id}"]:checked`);
      return [question.id, checked ? checked.value : ""];
    }),
  );
}

function renderQuestions() {
  const container = document.querySelector("#questionList");
  container.innerHTML = periodicQuestions
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
      ? "<li>全部答對，可以挑戰用週期表解釋生活中的元素應用。</li>"
      : graded.missed
          .map((item) => `<li>${item.topic}：${item.prompt}<br>你的答案：${item.selected || "未作答"}；正確答案：${item.answer}</li>`)
          .join("");

  result.hidden = false;
  result.innerHTML = `
    <div class="score-ring" aria-label="分數 ${graded.score} 分">${graded.score}<span>分</span></div>
    <div>
      <h2>練習結果</h2>
      <p>答對 ${graded.correct} / ${graded.total} 題。請對照下面錯題，再回到週期表觀察位置與分類。</p>
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
    const callbackName = `periodicTableParticipants_${Date.now()}_${Math.round(Math.random() * 10000)}`;
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

    script.src = `${url}${separator}action=participants&callback=${callbackName}`;
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
    status.textContent = "已顯示最近 30 筆完成紀錄。";
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
  link.download = `periodic-table-${payload.classSeat}.json`;
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
    const unanswered = periodicQuestions.filter((question) => !answers[question.id]);

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

export function initPeriodicTablePage() {
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
  initPeriodicTablePage();
}
