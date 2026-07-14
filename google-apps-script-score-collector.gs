var TEACHER_EMAIL = "pine.bang@gmail.com";

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("作答紀錄");
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("作答紀錄");
  }

  ensureHeader_(sheet);

  var payload = JSON.parse(e.postData.contents);
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
  ]);

  sendTeacherEmail_(payload, wrongItems);

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

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("作答紀錄");
  var participants = sheet ? readParticipants_(sheet) : [];
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
  ]);
}

function readParticipants_(sheet) {
  ensureHeader_(sheet);
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    return [];
  }

  var rowCount = Math.min(lastRow - 1, 30);
  var startRow = Math.max(2, lastRow - rowCount + 1);
  var values = sheet.getRange(startRow, 1, rowCount, 5).getValues();

  return values
    .map(function (row) {
      return {
        receivedAt: row[0],
        completedAt: row[1],
        classSeat: row[2],
        className: row[2],
        seatNumber: row[3],
        studentName: row[4],
      };
    })
    .reverse();
}

function sendTeacherEmail_(payload, wrongItems) {
  var classSeat = payload.classSeat || payload.className || "未填班級座號";
  var subject = "化學鍵練習作答通知：" + classSeat + "，" + payload.score + " 分";
  var body = [
    "有學生完成化學鍵互動練習。",
    "",
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
