var TEACHER_EMAIL = "pine.bang@gmail.com";
var SHEET_NAME = "作答紀錄";

function authorizeMailOnce() {
  MailApp.sendEmail({
    to: TEACHER_EMAIL,
    subject: "互動練習通知系統授權測試",
    body: "如果你收到這封信，代表 Apps Script 已取得寄信權限。之後學生交卷時就能寄出通知。",
  });
}

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);
  }

  ensureHeader_(sheet);

  var payload = JSON.parse(e.postData.contents);
  var lessonTitle = payload.lessonTitle || "化學鍵";
  var wrongItems = payload.answers
    .filter(function (item) {
      return !item.isCorrect;
    })
    .map(function (item) {
      return item.id + " " + item.topic + "：學生答「" + item.selected + "」，正解「" + item.correctAnswer + "」";
    })
    .join("\n");

  sheet.appendRow([
    new Date(),
    payload.completedAt,
    payload.classSeat || payload.className,
    "",
    "",
    payload.score,
    payload.correct,
    payload.total,
    wrongItems,
    JSON.stringify(payload.answers),
    lessonTitle,
  ]);

  sendTeacherEmail_(payload, lessonTitle, wrongItems);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  if (e.parameter.action !== "participants") {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  var lessonTitleFilter = e.parameter.lessonTitle || "";
  var participants = sheet ? readParticipants_(sheet, lessonTitleFilter) : [];
  var payload = {
    ok: true,
    participants: participants,
  };

  if (e.parameter.callback) {
    return ContentService
      .createTextOutput(e.parameter.callback + "(" + JSON.stringify(payload) + ");")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function ensureHeader_(sheet) {
  if (sheet.getLastRow() > 0) {
    return;
  }

  sheet.appendRow([
    "收到時間",
    "學生完成時間",
    "班級座號",
    "座號",
    "姓名",
    "分數",
    "答對題數",
    "總題數",
    "錯題摘要",
    "完整作答明細",
    "單元",
  ]);
}

function readParticipants_(sheet, lessonTitleFilter) {
  ensureHeader_(sheet);
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    return [];
  }

  var rowCount = lastRow - 1;
  var values = sheet.getRange(2, 1, rowCount, 11).getValues();

  return values
    .filter(function (row) {
      return !lessonTitleFilter || row[10] === lessonTitleFilter;
    })
    .map(function (row) {
      return {
        receivedAt: row[0],
        completedAt: row[1],
        classSeat: row[2],
        className: row[2],
        seatNumber: row[3],
        studentName: row[4],
        lessonTitle: row[10],
      };
    })
    .slice(-30)
    .reverse();
}

function sendTeacherEmail_(payload, lessonTitle, wrongItems) {
  var classSeat = payload.classSeat || payload.className || "未填班級座號";
  var subject = lessonTitle + "練習作答通知：" + classSeat + "，" + payload.score + " 分";
  var body = [
    "有學生完成互動練習。",
    "",
    "單元：" + lessonTitle,
    "班級座號：" + classSeat,
    "分數：" + payload.score,
    "答對題數：" + payload.correct + " / " + payload.total,
    "學生完成時間：" + payload.completedAt,
    "",
    "錯題摘要：",
    wrongItems || "沒有錯題。",
    "",
    "完整作答明細已寫入 Google 試算表。",
  ].join("\n");

  MailApp.sendEmail({
    to: TEACHER_EMAIL,
    subject: subject,
    body: body,
  });
}
