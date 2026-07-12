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
