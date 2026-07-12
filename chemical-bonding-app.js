import { GOOGLE_APPS_SCRIPT_URL } from "./chemical-bonding-config.js";

export const questions = [
  {
    id: "q01",
    type: "choice",
    topic: "化學鍵形成",
    prompt: "原子形成化學鍵後，整體系統通常會發生什麼變化？",
    options: ["能量降低，較穩定", "能量升高，較穩定", "質量消失", "原子核互相融合"],
    answer: "能量降低，較穩定",
    explanation: "化學鍵形成的根本原因是系統能量降低，因此狀態較穩定。",
  },
  {
    id: "q02",
    type: "choice",
    topic: "價電子",
    prompt: "下列哪一個最接近「價電子」的意思？",
    options: ["最外層電子", "原子核中的質子", "內層電子", "中子數"],
    answer: "最外層電子",
    explanation: "價電子是最外層電子，化學鍵與化學反應主要和價電子重新排列有關。",
  },
  {
    id: "q03",
    type: "choice",
    topic: "離子鍵",
    prompt: "離子鍵形成時，電子主要發生什麼行為？",
    options: ["轉移", "共享", "完全消失", "只在原子核中移動"],
    answer: "轉移",
    explanation: "離子鍵通常由金屬失去電子、非金屬得到電子，再由正負離子吸引形成。",
  },
  {
    id: "q04",
    type: "trueFalse",
    topic: "離子晶格",
    prompt: "NaCl 是由一個 Na 原子和一個 Cl 原子形成的單一分子。",
    options: ["正確", "錯誤"],
    answer: "錯誤",
    explanation: "固態 NaCl 是大量 Na+ 和 Cl- 規則排列成的離子晶格，不是單一分子。",
  },
  {
    id: "q05",
    type: "choice",
    topic: "導電性",
    prompt: "為什麼固態食鹽不導電，但熔融食鹽可以導電？",
    options: ["熔融時離子可以自由移動", "熔融時變成金屬", "固態食鹽沒有電子", "熔融時產生質子流"],
    answer: "熔融時離子可以自由移動",
    explanation: "導電需要可自由移動的帶電粒子；固態離子固定在晶格中，熔融後離子可移動。",
  },
  {
    id: "q06",
    type: "choice",
    topic: "共價鍵",
    prompt: "共價鍵最主要的電子行為是什麼？",
    options: ["共享電子", "轉移電子", "電子離域成電子海", "失去所有電子"],
    answer: "共享電子",
    explanation: "共價鍵通常形成於非金屬之間，原子透過共享電子達到較穩定狀態。",
  },
  {
    id: "q07",
    type: "choice",
    topic: "鍵結數",
    prompt: "氮氣 N2 中的 N≡N 常被表示為什麼鍵？",
    options: ["三鍵", "雙鍵", "單鍵", "離子鍵"],
    answer: "三鍵",
    explanation: "三鍵代表兩個原子共享三對電子。",
  },
  {
    id: "q08",
    type: "trueFalse",
    topic: "石墨",
    prompt: "所有共價物質都完全不能導電。",
    options: ["正確", "錯誤"],
    answer: "錯誤",
    explanation: "多數共價分子物質不導電，但石墨有可移動電子，因此可以導電。",
  },
  {
    id: "q09",
    type: "choice",
    topic: "金屬鍵",
    prompt: "金屬鍵常用哪一個模型說明？",
    options: ["電子海模型", "八面體模型", "水滴模型", "氣體分子模型"],
    answer: "電子海模型",
    explanation: "金屬中部分價電子離域，在整個金屬晶體中自由移動，稱為電子海模型。",
  },
  {
    id: "q10",
    type: "scenario",
    topic: "生活應用",
    prompt: "一種材料可拉成細線、可導電，最可能主要具有哪一種化學鍵？",
    options: ["金屬鍵", "離子鍵", "小分子共價鍵", "氫鍵"],
    answer: "金屬鍵",
    explanation: "金屬具有自由電子而導電，原子層滑動時仍受電子海吸引，所以延展性佳。",
  },
  {
    id: "q11",
    type: "scenario",
    topic: "生活應用",
    prompt: "鹽水能導電，但糖水通常不能導電，主要原因是什麼？",
    options: ["鹽水中有可移動離子，糖水主要是分子", "糖水沒有水", "鹽水裡有金屬絲", "糖分子會吸收所有電流"],
    answer: "鹽水中有可移動離子，糖水主要是分子",
    explanation: "鹽溶於水後可形成可移動離子；糖多以分子形式溶解，缺少自由移動的帶電粒子。",
  },
  {
    id: "q12",
    type: "choice",
    topic: "比較",
    prompt: "下列哪一組配對最合理？",
    options: ["銅線：金屬鍵", "食鹽：金屬鍵", "水：離子鍵", "鑽石：小分子共價物質"],
    answer: "銅線：金屬鍵",
    explanation: "銅是金屬，主要以金屬鍵結合；食鹽是離子晶格，水是共價分子，鑽石是巨大共價網狀結構。",
  },
  {
    id: "q13",
    type: "trueFalse",
    topic: "八隅體法則",
    prompt: "八隅體法則是高中常用模型，但不是所有原子與化合物都完全適用。",
    options: ["正確", "錯誤"],
    answer: "正確",
    explanation: "八隅體法則可幫助理解許多主族元素鍵結，但它是近似模型，不是絕對規則。",
  },
  {
    id: "q14",
    type: "scenario",
    topic: "結構判斷",
    prompt: "一種固體很硬、熔點高、不導電，且由碳原子形成三維網狀結構。它最可能是什麼？",
    options: ["鑽石", "石墨", "氯化鈉", "鋁箔"],
    answer: "鑽石",
    explanation: "鑽石中每個碳與四個碳形成三維共價網狀結構，因此非常硬且不導電。",
  },
];

export function gradeAnswers(answers, questionList = questions) {
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

export function normalizeStudentInfo(student) {
  const directClassSeat = String(student.classSeat || "").trim();
  if (directClassSeat) {
    return { classSeat: directClassSeat };
  }

  const className = String(student.className || "").trim();
  const seatNumber = String(student.seatNumber || "").trim();
  return { classSeat: `${className}${seatNumber}`.trim() };
}

export function buildSubmissionPayload(student, answers, graded, questionList = questions) {
  const { classSeat } = normalizeStudentInfo(student);
  return {
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

export function getQuestionStats(questionList = questions) {
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

export function maskStudentName(name) {
  const cleanName = String(name || "").trim();
  if (cleanName.length <= 1) {
    return cleanName;
  }
  if (cleanName.length === 2) {
    return `${cleanName[0]}○`;
  }
  return `${cleanName[0]}${"○".repeat(cleanName.length - 2)}${cleanName[cleanName.length - 1]}`;
}

export function formatParticipantRows(rows) {
  return rows.map((row) => ({
    completedAt: row.completedAt,
    classSeat: String(row.classSeat || row.className || "").trim(),
  }));
}

function optionId(question, optionIndex) {
  return `${question.id}-${optionIndex}`;
}

function collectStudentInfo() {
  const classSeatInput = document.querySelector("#classSeat");
  if (classSeatInput) {
    return { classSeat: classSeatInput.value };
  }

  return {
    className: document.querySelector("#className")?.value || "",
    seatNumber: document.querySelector("#seatNumber")?.value || "",
  };
}

function collectAnswers() {
  return Object.fromEntries(
    questions.map((question) => {
      const checked = document.querySelector(`input[name="${question.id}"]:checked`);
      return [question.id, checked ? checked.value : ""];
    }),
  );
}

function renderQuestions() {
  const container = document.querySelector("#questionList");
  container.innerHTML = questions
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

function validateForm(student, answers) {
  const missingProfile = !normalizeStudentInfo(student).classSeat;
  const unanswered = questions.filter((question) => !answers[question.id]);
  return { missingProfile, unanswered };
}

function renderFeedback(graded) {
  graded.details.forEach((detail) => {
    const card = document.querySelector(`[data-question-id="${detail.id}"]`);
    const feedback = card.querySelector(".feedback");
    card.classList.toggle("is-correct", detail.isCorrect);
    card.classList.toggle("is-wrong", !detail.isCorrect);
    feedback.textContent = detail.isCorrect
      ? `答對了。${detail.explanation}`
      : `答錯了。正確答案：${detail.answer}。${detail.explanation}`;
  });
}

function renderResult(graded) {
  const result = document.querySelector("#result");
  const missedList =
    graded.missed.length === 0
      ? "<li>全部答對，可以挑戰同學解釋原因。</li>"
      : graded.missed
          .map((item) => `<li>${item.topic}：${item.prompt}<br>你的答案：${item.selected || "未作答"}；正確答案：${item.answer}</li>`)
          .join("");

  result.hidden = false;
  result.innerHTML = `
    <div class="score-ring" aria-label="得分 ${graded.score} 分">${graded.score}<span>分</span></div>
    <div>
      <h2>練習結果</h2>
      <p>答對 ${graded.correct} / ${graded.total} 題。請把答錯題目的解析再讀一次。</p>
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
    list.innerHTML = `<li class="participant-empty">目前還沒有學生完成練習。</li>`;
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

function loadJsonp(url) {
  return new Promise((resolve, reject) => {
    const callbackName = `chemicalBondingParticipants_${Date.now()}_${Math.round(Math.random() * 10000)}`;
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
    status.textContent = "尚未設定作答紀錄來源。";
    return;
  }

  status.textContent = "正在讀取已完成名單...";
  try {
    const data = await loadJsonp(GOOGLE_APPS_SCRIPT_URL);
    renderParticipants(formatParticipantRows(data.participants || []));
    status.textContent = "名單會顯示最近 30 筆完成紀錄，不公開分數。";
  } catch (error) {
    status.textContent = "目前無法讀取已完成名單，稍後再試。";
  }
}

async function submitToSheet(payload) {
  if (!GOOGLE_APPS_SCRIPT_URL) {
    return { skipped: true, message: "尚未設定 Google Apps Script 收件網址，這次只在本機顯示分數。" };
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
  link.download = `chemical-bonding-${payload.classSeat}.json`;
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
    const student = collectStudentInfo();
    const answers = collectAnswers();
    const validation = validateForm(student, answers);

    if (validation.missingProfile) {
      submitStatus.textContent = "請先填寫班級座號。";
      return;
    }

    if (validation.unanswered.length > 0) {
      submitStatus.textContent = `還有 ${validation.unanswered.length} 題尚未作答。`;
      return;
    }

    const graded = gradeAnswers(answers);
    latestPayload = buildSubmissionPayload(student, answers, graded);
    renderFeedback(graded);
    renderResult(graded);
    downloadButton.disabled = false;

    submitStatus.textContent = "正在送出作答紀錄...";
    try {
      const submission = await submitToSheet(latestPayload);
      submitStatus.textContent = submission.skipped ? submission.message : "作答紀錄已送出。";
      if (!submission.skipped) {
        setTimeout(loadParticipants, 1200);
      }
    } catch (error) {
      submitStatus.textContent = "分數已計算，但送出紀錄失敗。請通知老師或下載備份。";
    }
  });

  downloadButton.addEventListener("click", () => {
    if (latestPayload) {
      downloadPayload(latestPayload);
    }
  });
}

export function initPracticePage() {
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
  initPracticePage();
}
