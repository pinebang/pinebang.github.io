# GitHub Pages + Google Sheets 作答收集設定

這份說明用來把「化學鍵互動練習」的學生作答紀錄收進 Google 試算表。

## 一、建立 Google 試算表

1. 到 Google Drive 建立一個新的 Google 試算表。
2. 建議命名為：`高一化學_化學鍵作答紀錄`。
3. 不需要手動建立欄位，程式第一次收到資料時會自動建立。

## 二、貼上 Apps Script 程式

1. 在 Google 試算表中點選：`擴充功能` -> `Apps Script`。
2. 刪除原本的程式碼。
3. 把本資料夾中的 `google-apps-script-score-collector.gs` 內容貼上。
4. 按儲存。

## 三、部署成 Web App

1. 在 Apps Script 右上角點選 `部署` -> `新增部署作業`。
2. 類型選擇 `網頁應用程式`。
3. 執行身分選擇：`我`。
4. 誰可以存取選擇：`所有人`。
5. 按下部署。
6. 第一次部署時，Google 會要求授權，請依畫面授權。
7. 複製產生的 Web App URL。

## 四、把 Web App URL 填回網頁設定

1. 打開 GitHub repository 中的 `chemical-bonding-config.js`。
2. 把這一行：

```js
export const GOOGLE_APPS_SCRIPT_URL = "";
```

改成：

```js
export const GOOGLE_APPS_SCRIPT_URL = "貼上你的 Web App URL";
```

3. 儲存後，GitHub Pages 會重新部署。

## 五、學生使用網址

互動練習頁面：

```text
https://pinebang.github.io/chemical-bonding.html
```

## 六、收集到的欄位

試算表會收到：

- 收到時間
- 學生完成時間
- 班級
- 座號
- 姓名
- 分數
- 答對題數
- 總題數
- 錯題摘要
- 完整作答明細

## 七、目前狀態

在你尚未填入 Google Apps Script Web App URL 前，網頁仍可讓學生練習與看分數，但不會把資料寫入試算表。

