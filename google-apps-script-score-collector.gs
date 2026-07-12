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
    payload.className,
    payload.seatNumber,
    payload.studentName,
    payload.score,
    payload.correct,
    payload.total,
    wrongItems,
    JSON.stringify(payload.answers),
  ]);

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
    "班級",
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
        className: row[2],
        seatNumber: row[3],
        studentName: row[4],
      };
    })
    .reverse();
}
