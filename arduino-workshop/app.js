(function initWorkshop() {
  'use strict';

  const STORAGE_KEY = 'arduino-workshop-state-v1';
  const DB_NAME = 'arduino-workshop-files';
  const DB_STORE = 'artifacts';
  const ARTIFACT_KEY = 'current-artifact';
  const MAX_FILE_SIZE = 30 * 1024 * 1024;
  const sharedTaskIds = ['check-board', 'check-ide', 'check-port', 'check-blink', 'check-serial', 'check-diagnose'];
  const sharedGuides = {
    'check-board': {
      title: '外觀與安全：認識 Arduino UNO',
      goal: '能指出板子上的主要區域，知道哪些地方可以接線，以及什麼時候必須先斷電。',
      sections: [
        { heading: '先找找看', items: ['USB 連接埠：連接電腦、供電與上傳程式。', 'DC 電源插座與 VIN：外部供電入口；初學時優先使用 USB。', 'RESET 按鈕：讓板子重新開始執行程式。', 'L、TX、RX LED：顯示內建 LED 與序列傳輸活動。', '數位腳位 0–13：可讀取 HIGH/LOW，也可輸出 HIGH/LOW；0、1 是序列通訊腳位。', '類比輸入 A0–A5：讀取感測器的類比電壓變化。', '5V、3.3V、GND：供電與共同參考點，GND 必須和電路共地。'] },
        { heading: '安全操作', items: ['拔插 LED、按鈕或跳線前先拔除 USB 或外部電源。', '不要讓 5V 與 GND 直接短接，也不要把不同電壓的電源直接相接。', 'LED 通常要串接限流電阻；不確定接法時先問老師。'] },
        { heading: '自我檢查', items: ['我能指出 USB、RESET、L、數位腳位、類比腳位與 GND。', '我知道拔插元件前要先斷電。'] },
      ],
      links: [{ label: '開啟 Arduino UNO Rev3 官方腳位圖', url: 'https://docs.arduino.cc/resources/pinouts/A000073-full-pinout.pdf' }],
    },
    'check-ide': {
      title: '開啟開發環境：熟悉 Arduino IDE 2',
      goal: '能開啟 Arduino IDE 2、建立草稿，找到驗證與上傳功能。',
      sections: [
        { heading: '畫面上要認識的區域', items: ['編輯區：撰寫 Arduino 程式，檔案通常稱為 sketch。', '驗證按鈕：只編譯程式，先檢查語法與函式是否正確。', '上傳按鈕：把編譯後的程式寫入開發板。', '序列監控工具：讀取板子傳回電腦的文字。', '板型與連接埠選擇器：告訴 IDE 要用哪一種板子、哪一個 USB 連接埠。'] },
        { heading: '第一次操作', items: ['開啟 Arduino IDE 2，建立新的空白草稿。', '先按驗證，觀察下方訊息區是否出現完成或錯誤。', '接上 Arduino 後，再選擇正確板型與 Port。', '看到板型與 Port 後，才進行上傳。'] },
        { heading: '自我檢查', items: ['我能說出驗證和上傳的差別。', '我能找到編輯區、板型選擇器和下方訊息區。'] },
      ],
      links: [{ label: '查看 Arduino IDE 2 官方文件', url: 'https://docs.arduino.cc/software/ide/' }, { label: '查看官方上傳步驟', url: 'https://support.arduino.cc/hc/en-us/articles/4733418441116-Upload-a-sketch-in-Arduino-IDE' }],
    },
    'check-port': {
      title: '選對板子與連接埠：Board 和 Port',
      goal: '能分辨 Board 與 Port，找到自己的 Arduino 出現在哪一個 COM 連接埠。',
      sections: [
        { heading: '兩個名詞的差別', items: ['Board 是板子的型號，例如 Arduino Uno；它決定程式如何編譯與上傳。', 'Port 是電腦分配給實際 USB 裝置的連接埠，例如 COM3。', '同一塊板子換一個 USB 孔，Port 編號可能改變；Board 通常不會跟著改變。'] },
        { heading: '辨識步驟', items: ['先拔掉 Arduino，記住目前 Port 清單。', '接上資料傳輸 USB 線，確認板上的電源燈亮起。', '在 IDE 的板型與連接埠選擇器中，找新出現的裝置。', '若看到 Unknown，先選擇其他板子與連接埠，再指定 Arduino Uno。', '若完全沒有 Port，先換 USB 線或 USB 孔；有些線只能充電、不能傳資料。'] },
        { heading: '自我檢查', items: ['我能說明 Board 和 Port 的差別。', '我能拔插一次 USB，找出哪一個 COM 是自己的板子。'] },
      ],
      links: [{ label: '查看官方 Board 與 Port 說明', url: 'https://support.arduino.cc/hc/en-us/articles/4733418441116-Upload-a-sketch-in-Arduino-IDE' }],
    },
    'check-blink': {
      title: '上傳 Blink：讓內建 LED 閃爍',
      goal: '能從官方內建範例開啟 Blink，完成驗證、上傳，並觀察板上的 L 燈。',
      sections: [
        { heading: '操作步驟', items: ['開啟 Arduino IDE，選擇 File > Examples > 01.Basics > Blink。', '確認板型與 Port 已選好。', '按驗證，確認程式可以編譯。', '按上傳，等待下方訊息顯示上傳完成。', '觀察板上標示 L 的內建 LED，應該大約亮 1 秒、暗 1 秒反覆循環。'] },
        { heading: '看懂程式', items: ['setup() 只在開機或重置時執行一次。', 'loop() 會不斷重複執行。', 'pinMode(LED_BUILTIN, OUTPUT) 把內建 LED 腳位設定為輸出。', 'digitalWrite() 控制 LED HIGH 或 LOW；delay() 讓程式暫停一段時間。'] },
        { heading: '自我檢查', items: ['我看到 L 燈穩定閃爍。', '我能指出 setup()、loop() 和 digitalWrite() 各自的用途。'] },
      ],
      links: [{ label: '開啟 Arduino 官方內建範例', url: 'https://docs.arduino.cc/built-in-examples' }, { label: '查看官方上傳教學', url: 'https://support.arduino.cc/hc/en-us/articles/4733418441116-Upload-a-sketch-in-Arduino-IDE' }],
    },
    'check-serial': {
      title: '序列埠通訊：讓板子回傳文字',
      goal: '能使用 Serial Monitor 觀察 Arduino 傳回的文字，並知道鮑率不一致會造成亂碼。',
      sections: [
        { heading: '基本概念', items: ['Serial 是 Arduino 和電腦交換文字或數值的通道。', 'Serial.begin(9600) 會在 setup() 啟動通訊；9600 是鮑率。', 'Serial.println() 會送出一行文字，方便觀察程式執行狀況。', 'Serial Monitor 的鮑率必須和程式設定相同，否則常會看到亂碼。'] },
        { heading: '操作步驟', items: ['開啟 File > Examples > 01.Basics > AnalogReadSerial，或使用會定時 println 的範例。', '上傳程式後開啟 Serial Monitor。', '將右下角鮑率設成和 Serial.begin(...) 相同的數值。', '觀察文字或數值是否持續出現；若要測感測器，可轉動旋鈕或遮住光敏電阻。'] },
        { heading: '自我檢查', items: ['我能找到 Serial Monitor。', '我能說明鮑率是什麼，並能處理亂碼問題。'] },
      ],
      links: [{ label: '查看 Arduino IDE 2 Serial Monitor 官方說明', url: 'https://docs.arduino.cc/software/ide-v2/tutorials/ide-v2-serial-monitor' }, { label: '瀏覽官方內建範例', url: 'https://docs.arduino.cc/built-in-examples' }],
    },
    'check-diagnose': {
      title: '初步排錯：依順序找出問題',
      goal: '遇到無法上傳或沒有輸出時，能按照固定順序檢查，不靠猜測反覆重試。',
      sections: [
        { heading: '排錯順序', items: ['1. 電源：板上的 ON 或電源指示燈是否亮起？', '2. 線材：USB 線是否為可傳資料的線？換一條線或 USB 孔測試。', '3. 板型與 Port：IDE 是否選到正確 Board 和 COM？', '4. 其他程式：關閉 Serial Monitor、另一個 IDE 視窗或可能占用 Port 的程式。', '5. 接線：上傳時先移除不必要的跳線，尤其不要把元件接在 0(RX)、1(TX)。', '6. 重置與求助：重新插拔或按 RESET；記下完整錯誤訊息再請老師協助。'] },
        { heading: '留下證據', items: ['記錄你看到的錯誤訊息，而不是只說「不能上傳」。', '寫下板型、Port、USB 線是否更換，以及你已經嘗試過的步驟。', '一次只改一個條件，才知道哪個方法有效。'] },
        { heading: '自我檢查', items: ['我能說出至少兩個無法上傳時的檢查方法。', '我能把錯誤訊息和已嘗試的步驟清楚告訴同學或老師。'] },
      ],
      links: [{ label: '查看 Arduino 官方 avrdude 排錯清單', url: 'https://support.arduino.cc/hc/en-us/articles/4401874331410--Error-avrdude' }, { label: '查看官方無法上傳排錯流程', url: 'https://support.arduino.cc/hc/en-us/articles/4403365313810-If-your-sketch-doesn-t-upload' }],
    },
  };
  const guideImages = {
    'check-board': { src: 'https://docs.arduino.cc/static/bcc9ff87c195de70ed7e0731050bd9ca/image.svg', alt: 'Arduino UNO R3 官方產品圖', caption: '核對板子外觀與接頭；圖片來源：Arduino UNO R3 官方頁面。', href: 'https://docs.arduino.cc/hardware/uno-rev3' },
    'check-blink': { src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Arduino-LED-Pin13.jpg', alt: 'Arduino UNO 與 LED 接線照片', caption: '核對 LED、電阻與數位腳位的基本接線；圖片來源：Wikimedia Commons。', href: 'https://commons.wikimedia.org/wiki/File:Arduino-LED-Pin13.jpg' },
    'light-led': { src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Arduino-LED-Pin13.jpg', alt: 'Arduino UNO 與 LED 接線照片', caption: '核對外接 LED 與限流電阻；圖片來源：Wikimedia Commons。', href: 'https://commons.wikimedia.org/wiki/File:Arduino-LED-Pin13.jpg' },
    'light-button': { src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Button_LED_bb.svg', alt: '按鈕與 LED 麵包板接線圖', caption: '核對按鈕、LED 與麵包板的接線方向；圖片來源：Wikimedia Commons。', href: 'https://commons.wikimedia.org/wiki/File:Button_LED_bb.svg' },
    'sensor-read': { src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Arduino_Uno_with_ADXL335_Accelerometer.jpg', alt: 'Arduino UNO 與感測器接線照片', caption: '感測任務可先核對感測器、電源與訊號線；圖片來源：Wikimedia Commons。', href: 'https://commons.wikimedia.org/wiki/File:Arduino-Uno-with-ADXL335-Accelerometer.jpg' },
    'sensor-output': { src: 'https://commons.wikimedia.org/wiki/Special:FilePath/ArduinoBreadboard.jpeg', alt: 'Arduino 麵包板電路照片', caption: '核對感測輸入與 LED 輸出的電路概念；圖片來源：Wikimedia Commons。', href: 'https://commons.wikimedia.org/wiki/File:ArduinoBreadboard.jpeg' },
  };
  const routeGuides = {
    'light-led': { title: '讓外接 LED 閃爍', goal: '用一顆 LED 看懂輸出腳位、極性與限流電阻。', sections: [{ heading: '接線核對', items: ['LED 長腳通常接 Arduino 輸出腳位，短腳接 GND。', 'LED 必須串接約 220Ω 電阻，避免電流過大。', '麵包板上的 LED 兩腳不要插在同一條導電列。'] }, { heading: '程式步驟', items: ['設定 LED 腳位為 OUTPUT。', '用 digitalWrite() 設為 HIGH，再 delay(500)。', '用 digitalWrite() 設為 LOW，再 delay(500)，放進 loop() 重複。'] }, { heading: '完成判斷', items: ['LED 能穩定亮、滅，不會只亮一下。', '拔掉 LED 後，能說出長腳、短腳、電阻與 GND 的作用。'] }], links: [{ label: '瀏覽官方 Blink 與 LED 範例', url: 'https://docs.arduino.cc/built-in-examples' }] },
    'light-button': { title: '用按鈕控制燈', goal: '讀取按鈕的 HIGH/LOW，讓輸入控制 LED 輸出。', sections: [{ heading: '接線核對', items: ['按鈕要跨過麵包板中央凹槽，按下時才會改變接點狀態。', '使用 INPUT_PULLUP 時，按下通常讀到 LOW，放開讀到 HIGH。', 'LED 仍要串接限流電阻，並確認 GND 共地。'] }, { heading: '程式步驟', items: ['設定按鈕腳位為 INPUT_PULLUP，LED 腳位為 OUTPUT。', '用 digitalRead() 讀取按鈕。', '用 if 判斷按鈕狀態，再用 digitalWrite() 控制 LED。'] }, { heading: '完成判斷', items: ['按下按鈕時 LED 改變狀態，放開後恢復。', '能解釋為什麼 INPUT_PULLUP 的按下狀態是 LOW。'] }], links: [{ label: '查看官方按鈕範例', url: 'https://docs.arduino.cc/built-in-examples' }] },
    'light-melody': { title: '加入提示音', goal: '用 tone() 讓蜂鳴器播放簡單音符，建立聲音回饋。', sections: [{ heading: '接線核對', items: ['蜂鳴器正極接數位輸出腳位，負極接 GND；若元件有標示，依標示接線。', '先用短時間測試音效，避免長時間持續發聲。'] }, { heading: '程式步驟', items: ['用 tone(腳位, 頻率) 播放音符。', '用 delay() 控制音符持續時間。', '用 noTone() 停止聲音，再播放下一個音符。'] }, { heading: '完成判斷', items: ['按下按鈕或完成事件時能聽到提示音。', '能改變頻率，觀察音高變化。'] }], links: [{ label: '瀏覽官方 tone() 相關範例', url: 'https://docs.arduino.cc/built-in-examples' }] },
    'light-extension': { title: '延伸：做一組交通號誌', goal: '把 LED、按鈕與時序組合成可解釋的交通號誌。', sections: [{ heading: '設計先行', items: ['先畫出紅、黃、綠三顆 LED 的輸出腳位。', '決定每個狀態的時間，例如紅燈、綠燈、黃燈。', '每顆 LED 都要有自己的限流電阻。'] }, { heading: '程式步驟', items: ['用多個 pinMode() 設定輸出。', '依序 digitalWrite() 控制三色燈。', '用函式整理每個燈號狀態，讓 loop() 容易閱讀。'] }, { heading: '完成判斷', items: ['燈號依預定順序循環。', '能說明自己如何決定等待時間與燈號順序。'] }], links: [{ label: '瀏覽官方 Blink、Fading 與按鈕範例', url: 'https://docs.arduino.cc/built-in-examples' }] },
    'game-random': { title: '隨機等待後亮燈', goal: '用 random() 製造不可預測的開始時刻，完成反應遊戲基礎。', sections: [{ heading: '核心概念', items: ['random(最小值, 最大值) 會產生範圍內的整數。', 'delay() 會讓程式等待，但等待期間無法同時處理其他輸入。', '遊戲開始前要先讓 LED 熄滅，避免學生看到提示。'] }, { heading: '操作步驟', items: ['按下開始按鈕後先記錄開始狀態。', '隨機等待一段時間，再亮 LED。', '亮燈後才讀取玩家按鈕。'] }, { heading: '完成判斷', items: ['每次等待時間不完全相同。', '太早按下時，程式能判定為搶按。'] }], links: [{ label: '瀏覽官方 Blink Without Delay 與按鈕範例', url: 'https://docs.arduino.cc/built-in-examples' }] },
    'game-button': { title: '按鍵偵測反應', goal: '讓遊戲只在正確時機接受按鍵，避免偷按造成誤判。', sections: [{ heading: '接線核對', items: ['按鈕跨過麵包板中央凹槽。', '使用 INPUT_PULLUP 時，按下是 LOW，放開是 HIGH。', '先用 Serial Monitor 印出按鈕狀態，確認接線再做遊戲。'] }, { heading: '程式步驟', items: ['先等待提示事件，再進入可接受按鍵的狀態。', '用 digitalRead() 讀取按鈕。', '按下後等待放開，避免一次按壓被計算多次。'] }, { heading: '完成判斷', items: ['偷按、正確按下、沒有按下三種情況結果不同。', '能指出程式中「等待提示」與「接受按鍵」的區段。'] }], links: [{ label: '查看官方按鈕與去彈跳範例', url: 'https://docs.arduino.cc/built-in-examples' }] },
    'game-score': { title: '序列埠顯示反應時間', goal: '用 millis() 計算從亮燈到按下按鈕經過的時間。', sections: [{ heading: '核心概念', items: ['millis() 回傳 Arduino 開機後經過的毫秒數。', '反應時間 = 按下時間 − 亮燈時間。', '使用 millis() 可以計時，不必讓整段程式停在 delay()。'] }, { heading: '操作步驟', items: ['亮燈當下保存 startTime。', '偵測到按鈕後保存 endTime。', '用 endTime - startTime 算出反應時間，再 Serial.println() 印出。'] }, { heading: '完成判斷', items: ['Serial Monitor 能看到每次反應時間。', '能解釋為什麼要在亮燈當下記錄時間。'] }], links: [{ label: '瀏覽官方序列埠與控制結構範例', url: 'https://docs.arduino.cc/built-in-examples' }] },
    'game-extension': { title: '延伸：雙人搶答器', goal: '把兩個按鈕、指示燈與計時整合成公平的搶答判定。', sections: [{ heading: '設計先行', items: ['為兩位玩家各指定一個按鈕與指示燈。', '先定義同時按下時的處理方式。', '一次回合結束後，必須重新設定遊戲狀態。'] }, { heading: '程式步驟', items: ['等待開始訊號，再開放兩個按鈕。', '依序讀取兩個按鈕，記錄第一個有效按下者。', '鎖定結果，顯示勝者並等待重新開始。'] }, { heading: '完成判斷', items: ['兩位玩家都能正常觸發，且一回合只判定一次。', '能測試同時按下與未按下的情況。'] }], links: [{ label: '瀏覽官方按鈕與狀態判斷範例', url: 'https://docs.arduino.cc/built-in-examples' }] },
    'sensor-read': { title: '讀取感測器數值', goal: '把環境變化轉成可觀察的數值，先確認輸入真的在變化。', sections: [{ heading: '接線核對', items: ['感測器先接 5V 或 3.3V、GND，再把訊號腳接到 A0。', '類比輸入的數值通常落在 0 到 1023 的範圍。', '不確定感測器工作電壓時，先看元件標示或詢問老師。'] }, { heading: '操作步驟', items: ['用 analogRead(A0) 讀取數值。', '用 Serial.begin(9600) 啟動序列埠。', '用 Serial.println() 每隔一段時間輸出，開啟 Serial Plotter 看變化。'] }, { heading: '完成判斷', items: ['遮光、照光、靠近或移動物體時，數值會有可重複的變化。', '能指出感測器的電源、GND 與訊號腳。'] }], links: [{ label: '查看官方 Analog Read Serial 範例', url: 'https://docs.arduino.cc/built-in-examples' }] },
    'sensor-threshold': { title: '找出觸發門檻', goal: '用實際測量值設定合理門檻，而不是直接猜一個數字。', sections: [{ heading: '測量方法', items: ['記錄沒有事件時的數值範圍。', '再記錄有事件時的數值範圍，例如變暗或靠近。', '選擇兩個範圍中間較穩定的位置作為門檻。'] }, { heading: '程式步驟', items: ['用 if 判斷讀值是否大於或小於門檻。', '先把讀值與門檻用 Serial.println() 印出來。', '反覆測試，必要時調整門檻或加入遲滯。'] }, { heading: '完成判斷', items: ['能說明門檻數字來自哪些測量。', '改變環境後，程式仍能在合理範圍內判斷。'] }], links: [{ label: '瀏覽官方校正與類比輸入範例', url: 'https://docs.arduino.cc/built-in-examples' }] },
    'sensor-output': { title: '讓輸出回應環境', goal: '把感測器輸入接到 LED、蜂鳴器或其他輸出，完成輸入到輸出的回饋。', sections: [{ heading: '設計先行', items: ['先寫一句話：當什麼條件成立時，哪個輸出要如何反應。', '輸入是感測器讀值，輸出可以是 LED 亮滅或蜂鳴器提示。', '輸出元件也要確認腳位、電壓與共地。'] }, { heading: '程式步驟', items: ['讀取感測值。', '用 if/else 判斷狀態。', '用 digitalWrite()、analogWrite() 或 tone() 產生回饋。'] }, { heading: '完成判斷', items: ['改變光線或距離時，輸出會跟著改變。', '能指出輸入、判斷與輸出三個區段。'] }], links: [{ label: '瀏覽官方類比輸入、LED 與 tone 範例', url: 'https://docs.arduino.cc/built-in-examples' }] },
    'sensor-extension': { title: '延伸：三段狀態顯示', goal: '把連續的感測數值分成低、中、高三段，讓輸出更容易閱讀。', sections: [{ heading: '設計先行', items: ['先量測數值的最低與最高大致範圍。', '設定兩個門檻，分成低、中、高三種狀態。', '為三種狀態設計不同 LED、音效或文字回饋。'] }, { heading: '程式步驟', items: ['用 if、else if、else 判斷三個區間。', '每次只讓目前狀態的輸出啟用。', '用 Serial Monitor 印出狀態名稱，方便除錯。'] }, { heading: '完成判斷', items: ['緩慢改變環境時，三種狀態會依序切換。', '能說明門檻與輸出設計的理由。'] }], links: [{ label: '瀏覽官方類比輸入與狀態判斷範例', url: 'https://docs.arduino.cc/built-in-examples' }] },
    'creative-plan': { title: '畫出輸入與輸出', goal: '先把作品想法畫成輸入、處理、輸出的流程，降低接線與寫程式的混亂。', sections: [{ heading: '一張圖就好', items: ['輸入：按鈕、旋鈕、光線、距離或其他感測器。', '處理：Arduino 讀取、判斷、計時或計算。', '輸出：LED、蜂鳴器、馬達或 Serial Monitor。'] }, { heading: '操作步驟', items: ['用箭頭畫出「輸入 → Arduino 處理 → 輸出」。', '標上每個元件要接的腳位。', '用一句話描述作品何時做什麼。'] }, { heading: '完成判斷', items: ['同學看圖能說出作品功能。', '每個輸入和輸出都能對應到一個實際元件。'] }], links: [{ label: '參考 Arduino UNO 官方硬體介紹', url: 'https://docs.arduino.cc/hardware/uno-rev3' }] },
    'creative-prototype': { title: '先做最小可行原型', goal: '一次只接一個輸入與一個輸出，先驗證核心功能。', sections: [{ heading: '先縮小問題', items: ['先暫時移除外殼、裝飾與不必要元件。', '只保留最重要的一個輸入和一個輸出。', '每接一個元件就先測試，不要一次全部接完。'] }, { heading: '操作步驟', items: ['先讓輸出單獨工作，例如 LED Blink。', '再加入輸入，確認 Serial Monitor 能讀到變化。', '最後把輸入與輸出放進同一個 if 判斷。'] }, { heading: '完成判斷', items: ['核心功能能穩定重複。', '能指出哪些功能尚未加入，以及下一步要測什麼。'] }], links: [{ label: '瀏覽官方內建範例', url: 'https://docs.arduino.cc/built-in-examples' }] },
    'creative-test': { title: '測試三種情境', goal: '用正常、邊界、錯誤三種情境檢查作品，不只測一次成功。', sections: [{ heading: '三種測試', items: ['正常：按照預期操作，作品應該正確回應。', '邊界：接近門檻、快速連按或極暗極亮時，觀察是否穩定。', '錯誤：拔掉元件、接錯輸入或不操作，確認作品不會失控。'] }, { heading: '紀錄方法', items: ['每次只改變一個條件。', '記錄輸入、預期輸出、實際輸出與是否通過。', '失敗時先拍照並記下錯誤訊息或數值。'] }, { heading: '完成判斷', items: ['三種情境都有測試紀錄。', '能提出一個下一版改善方向。'] }], links: [{ label: '查看 Arduino 官方排錯建議', url: 'https://support.arduino.cc/hc/en-us/articles/4403365313810-If-your-sketch-doesn-t-upload' }] },
    'creative-extension': { title: '延伸：改善互動體驗', goal: '讓作品更容易理解、更好操作，也更能表現自己的設計想法。', sections: [{ heading: '改善方向', items: ['加入 LED、聲音或文字，讓使用者知道作品目前狀態。', '避免按鈕重複觸發，必要時加入去彈跳或狀態鎖定。', '整理接線與外觀，讓使用者不容易誤觸或接錯。'] }, { heading: '操作步驟', items: ['先選一個最影響使用者的問題。', '修改後重新測試正常、邊界、錯誤三種情境。', '拍下改善前後的差異，並寫出改善理由。'] }, { heading: '完成判斷', items: ['使用者不看程式也能理解如何操作。', '能說出這次改善解決了什麼問題。'] }], links: [{ label: '瀏覽 Arduino 官方教學與範例', url: 'https://docs.arduino.cc/tutorials/' }] },
  };
  const taskInputs = [...document.querySelectorAll('[data-task-id]')];
  const allTaskIds = taskInputs.map((input) => input.dataset.taskId);
  const core = window.ArduinoCore;
  const siteConfig = window.ArduinoWorkshopConfig || {};
  let artifactUrl = null;
  let authCredential = '';
  let authEmail = '';

  const defaultState = {
    completedIds: [],
    selectedRoute: '',
    profile: { group: '', projectTitle: '' },
    reflections: { learning: '', challenge: '' },
    teacherMode: false,
  };

  function readState() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!stored || typeof stored !== 'object') return structuredClone(defaultState);
      return {
        ...structuredClone(defaultState),
        ...stored,
        profile: { ...defaultState.profile, ...(stored.profile || {}) },
        reflections: { ...defaultState.reflections, ...(stored.reflections || {}) },
        completedIds: Array.isArray(stored.completedIds) ? stored.completedIds : [],
      };
    } catch {
      return structuredClone(defaultState);
    }
  }

  let state = readState();

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function setStatus(message, isError = false) {
    const target = document.querySelector('#status-message');
    target.textContent = message;
    target.classList.toggle('is-error', isError);
  }

  function gateComplete() {
    return core.isGateComplete(sharedTaskIds, state.completedIds);
  }

  function render() {
    state.completedIds = core.normalizeProgressForGate(sharedTaskIds, state.completedIds);
    const unlocked = gateComplete();
    taskInputs.forEach((input) => {
      input.checked = state.completedIds.includes(input.dataset.taskId);
      input.disabled = core.isSharedTaskLocked(sharedTaskIds, state.completedIds, input.dataset.taskId);
    });

    document.querySelectorAll('.route-tasks').forEach((fieldset) => { fieldset.disabled = !unlocked; });
    document.querySelectorAll('input[name="route"]').forEach((input) => {
      input.disabled = !unlocked;
      input.checked = state.selectedRoute === input.value;
    });
    document.querySelectorAll('[data-route]').forEach((route) => {
      route.classList.toggle('is-selected', state.selectedRoute === route.dataset.route);
    });

    const gateStatus = document.querySelector('#gate-status');
    gateStatus.textContent = unlocked ? '健檢完成 · 已鎖定' : `尚缺 ${sharedTaskIds.filter((id) => !state.completedIds.includes(id)).length} 項`;
    gateStatus.className = `status-badge ${unlocked ? 'status-complete' : 'status-warning'}`;
    const lockLabel = document.querySelector('#route-lock-label');
    lockLabel.textContent = unlocked ? '路線已解鎖' : '健檢後解鎖';
    lockLabel.className = `status-badge ${unlocked ? 'status-complete' : 'status-locked'}`;

    const progress = core.calculateProgress(allTaskIds, state.completedIds);
    document.querySelector('#progress-text').textContent = `${progress.completed} / ${progress.total}`;
    document.querySelector('#progress-bar').style.width = `${progress.percent}%`;
    document.querySelector('.progress-track').setAttribute('aria-valuenow', String(progress.percent));
    document.querySelector('#next-action').textContent = !unlocked
      ? '先完成共同健檢，才能開啟興趣路線。'
      : progress.percent === 100
        ? '全部任務完成，記得整理作品紀錄並與同學分享。'
        : state.selectedRoute
          ? '主路線已選定，完成後可自由跨線挑戰。'
          : '健檢完成，現在選一條最有興趣的主路線。';

    document.querySelectorAll('[data-profile]').forEach((input) => {
      input.value = state.profile[input.dataset.profile] || '';
    });
    document.querySelectorAll('[data-reflection]').forEach((input) => {
      input.value = state.reflections[input.dataset.reflection] || '';
    });
    document.querySelector('#teacher-toggle').checked = Boolean(state.teacherMode);
    document.querySelector('#teacher-overview').hidden = !state.teacherMode;
    updateSyncControl();
  }

  function updateSyncControl() {
    const button = document.querySelector('#progress-sync');
    if (!button) return;
    const classSeat = core.normalizeClassSeat(state.profile.group);
    button.disabled = !authCredential || !classSeat;
  }

  taskInputs.forEach((input) => {
    input.addEventListener('change', () => {
      if (!sharedTaskIds.includes(input.dataset.taskId) && !gateComplete()) {
        input.checked = false;
        setStatus('請先完成開發板共同健檢。', true);
        return;
      }
      state.completedIds = core.toggleTask(state.completedIds, input.dataset.taskId);
      saveState();
      render();
    });
  });

  document.querySelectorAll('[data-profile]').forEach((input) => {
    input.addEventListener('input', () => {
      state.profile[input.dataset.profile] = input.value;
      saveState();
      updateSyncControl();
    });
  });

  document.querySelectorAll('[data-reflection]').forEach((input) => {
    input.addEventListener('input', () => {
      state.reflections[input.dataset.reflection] = input.value;
      saveState();
    });
  });

  document.querySelectorAll('input[name="route"]').forEach((input) => {
    input.addEventListener('change', () => {
      state.selectedRoute = input.value;
      saveState();
      render();
      document.querySelector(`[data-route="${input.value}"]`).scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  document.querySelector('#teacher-toggle').addEventListener('change', (event) => {
    state.teacherMode = event.target.checked;
    saveState();
    render();
  });

  function openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains(DB_STORE)) request.result.createObjectStore(DB_STORE);
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function withArtifactStore(mode, action) {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(DB_STORE, mode);
      const request = action(transaction.objectStore(DB_STORE));
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      transaction.oncomplete = () => db.close();
    });
  }

  function showArtifact(record) {
    const preview = document.querySelector('#artifact-preview');
    const removeButton = document.querySelector('#remove-artifact');
    if (artifactUrl) URL.revokeObjectURL(artifactUrl);
    artifactUrl = URL.createObjectURL(record.blob);
    const media = document.createElement(record.type.startsWith('video/') ? 'video' : 'img');
    media.src = artifactUrl;
    media.alt = record.type.startsWith('image/') ? 'Arduino 作品本機預覽' : '';
    if (media.tagName === 'VIDEO') media.controls = true;
    const caption = document.createElement('p');
    caption.textContent = `${record.name} · ${(record.size / 1024 / 1024).toFixed(1)} MB`;
    preview.replaceChildren(media, caption);
    preview.hidden = false;
    removeButton.hidden = false;
  }

  async function loadArtifact() {
    try {
      const record = await withArtifactStore('readonly', (store) => store.get(ARTIFACT_KEY));
      if (record) showArtifact(record);
    } catch {
      setStatus('這個瀏覽器目前無法讀取作品檔案，文字與勾選仍可正常使用。', true);
    }
  }

  document.querySelector('#artifact-input').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      setStatus('檔案格式不支援，請選擇圖片或影片。', true);
      event.target.value = '';
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setStatus('檔案超過 30 MB，請縮短影片或改用較小的圖片。', true);
      event.target.value = '';
      return;
    }
    try {
      const record = { blob: file, name: file.name, type: file.type, size: file.size, savedAt: new Date().toISOString() };
      await withArtifactStore('readwrite', (store) => store.put(record, ARTIFACT_KEY));
      showArtifact(record);
      setStatus('本機預覽已準備完成；請到下方 Google 表單正式繳交。');
    } catch {
      setStatus('作品檔案儲存失敗，請改用較小的檔案後再試一次。', true);
    } finally {
      event.target.value = '';
    }
  });

  document.querySelector('#remove-artifact').addEventListener('click', async () => {
    try {
      await withArtifactStore('readwrite', (store) => store.delete(ARTIFACT_KEY));
      if (artifactUrl) URL.revokeObjectURL(artifactUrl);
      artifactUrl = null;
      document.querySelector('#artifact-preview').replaceChildren();
      document.querySelector('#artifact-preview').hidden = true;
      document.querySelector('#remove-artifact').hidden = true;
      setStatus('作品檔案已移除。');
    } catch {
      setStatus('暫時無法移除作品檔案，請重新整理後再試。', true);
    }
  });

  document.querySelector('#export-button').addEventListener('click', () => {
    const record = {
      ...core.createExportRecord(state.profile, state.completedIds, state.reflections),
      selectedRoute: state.selectedRoute,
      progress: core.calculateProgress(allTaskIds, state.completedIds),
      artifactStoredOnThisDevice: !document.querySelector('#artifact-preview').hidden,
    };
    const blob = new Blob([JSON.stringify(record, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = core.normalizeClassSeat(state.profile.group).replace(/[\\/:*?"<>|\s]+/g, '-') || 'student';
    link.href = url;
    link.download = `arduino-workshop-${safeName}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus('學習紀錄已匯出；作品照片或影片不會包含在 JSON 檔中。');
  });

  const resetDialog = document.querySelector('#reset-dialog');
  document.querySelector('#reset-button').addEventListener('click', () => resetDialog.showModal());
  document.querySelector('#confirm-reset').addEventListener('click', async () => {
    localStorage.removeItem(STORAGE_KEY);
    try { await withArtifactStore('readwrite', (store) => store.delete(ARTIFACT_KEY)); } catch { /* IndexedDB 不可用時仍清除其他資料。 */ }
    state = structuredClone(defaultState);
    if (artifactUrl) URL.revokeObjectURL(artifactUrl);
    artifactUrl = null;
    document.querySelector('#artifact-preview').replaceChildren();
    document.querySelector('#artifact-preview').hidden = true;
    document.querySelector('#remove-artifact').hidden = true;
    render();
    setStatus('本機紀錄已全部清除。');
  });

  function registerWebMcpTools() {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const register = (definition) => {
      try { void Promise.resolve(context.registerTool(definition)).catch(() => {}); } catch { /* 不支援時不影響一般介面。 */ }
    };
    register({
      name: 'read_workshop_progress',
      title: '讀取 Arduino 講座進度',
      description: 'Read the current student checklist progress and gate status without changing it.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute() {
        return { progress: core.calculateProgress(allTaskIds, state.completedIds), gateComplete: gateComplete(), selectedRoute: state.selectedRoute };
      },
    });
    register({
      name: 'update_workshop_task',
      title: '更新 Arduino 任務狀態',
      description: 'Mark one visible workshop checklist task as completed or incomplete.',
      inputSchema: {
        type: 'object',
        properties: { taskId: { type: 'string' }, completed: { type: 'boolean' } },
        required: ['taskId', 'completed'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        if (!input || !allTaskIds.includes(input.taskId) || typeof input.completed !== 'boolean') throw new Error('Invalid task update');
        if (!sharedTaskIds.includes(input.taskId) && !gateComplete()) throw new Error('Shared board check is incomplete');
        const alreadyCompleted = state.completedIds.includes(input.taskId);
        if (alreadyCompleted !== input.completed) state.completedIds = core.toggleTask(state.completedIds, input.taskId);
        saveState();
        render();
        return { taskId: input.taskId, completed: input.completed, progress: core.calculateProgress(allTaskIds, state.completedIds) };
      },
    });
  }

  function configureGoogleForm() {
    const frame = document.querySelector('#google-form-frame');
    const link = document.querySelector('#google-form-link');
    const unavailable = document.querySelector('#form-unavailable');
    const hasUrls = /^https:\/\/docs\.google\.com\/forms\//.test(siteConfig.formViewUrl || '')
      && /^https:\/\/docs\.google\.com\/forms\//.test(siteConfig.formEmbedUrl || '');

    if (!hasUrls) return;
    frame.src = siteConfig.formEmbedUrl;
    frame.hidden = false;
    link.href = siteConfig.formViewUrl;
    link.removeAttribute('aria-disabled');
    unavailable.hidden = true;
  }

  function renderCompletionHeaders() {
    const headerRow = document.querySelector('.completion-table thead tr');
    const fragment = document.createDocumentFragment();
    const seatHeader = document.createElement('th');
    seatHeader.scope = 'col';
    seatHeader.textContent = '班級座號';
    fragment.append(seatHeader);
    taskInputs.forEach((input) => {
      const header = document.createElement('th');
      header.scope = 'col';
      header.textContent = input.closest('label')?.querySelector('strong')?.textContent || input.dataset.taskId;
      fragment.append(header);
    });
    headerRow.replaceChildren(fragment);
  }

  function renderCompletionRows(rows) {
    const list = document.querySelector('#completion-list');
    const empty = document.querySelector('#completion-empty');
    const fragment = document.createDocumentFragment();
    rows.forEach((row) => {
      const tableRow = document.createElement('tr');
      const classSeat = document.createElement('td');
      classSeat.textContent = row.classSeat;
      tableRow.append(classSeat);
      taskInputs.forEach((input) => {
        const cell = document.createElement('td');
        const result = document.createElement('span');
        const completed = Boolean(row.tasks[input.dataset.taskId]);
        result.textContent = completed ? '完成' : '未完成';
        result.className = `completion-result ${completed ? 'is-complete' : 'is-incomplete'}`;
        cell.append(result);
        tableRow.append(cell);
      });
      fragment.append(tableRow);
    });
    list.replaceChildren(fragment);
    empty.hidden = rows.length !== 0;
  }

  function openGuide(taskId) {
    const guide = sharedGuides[taskId] || routeGuides[taskId];
    const image = guideImages[taskId];
    const dialog = document.querySelector('#guide-dialog');
    if (!guide || !dialog) return;
    document.querySelector('#guide-title').textContent = guide.title;
    document.querySelector('#guide-content').innerHTML = [
      `<p class="guide-goal"><strong>學習目標</strong>${guide.goal}</p>`,
      image ? `<figure class="guide-figure"><img src="${image.src}" alt="${image.alt}" loading="lazy"><figcaption>${image.caption} <a href="${image.href}" target="_blank" rel="noopener">查看來源</a></figcaption></figure>` : '',
      ...guide.sections.map((section) => `<section><h3>${section.heading}</h3><ul>${section.items.map((item) => `<li>${item}</li>`).join('')}</ul></section>`),
      `<section><h3>官方延伸資料</h3><ul class="guide-links">${guide.links.map((link) => `<li><a href="${link.url}" target="_blank" rel="noopener">${link.label}</a></li>`).join('')}</ul></section>`,
    ].join('');
    dialog.showModal();
  }

  function closeGuide() {
    const dialog = document.querySelector('#guide-dialog');
    if (dialog?.open) dialog.close();
  }

  function decodeCredentialEmail(credential) {
    try {
      const payload = credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const decoded = decodeURIComponent(atob(payload).split('').map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`).join(''));
      return JSON.parse(decoded).email || '';
    } catch {
      return '';
    }
  }

  function setLoginStatus(message, isError = false) {
    const status = document.querySelector('#login-status');
    status.textContent = message;
    status.classList.toggle('is-error', isError);
  }

  function handleGoogleCredential(response) {
    const email = decodeCredentialEmail(response.credential).toLowerCase();
    if (!email.endsWith('@ms.gmjh.tyc.edu.tw')) {
      authCredential = '';
      authEmail = '';
      setLoginStatus('請使用學校 @ms.gmjh.tyc.edu.tw 帳號登入。', true);
      updateSyncControl();
      return;
    }
    authCredential = response.credential;
    authEmail = email;
    setLoginStatus(`已登入：${email}。請確認班級座號後同步。`);
    updateSyncControl();
  }

  function configureGoogleLogin() {
    const clientId = siteConfig.googleClientId || '';
    if (!clientId) {
      setLoginStatus('學校 Google 登入尚未完成設定。', true);
      return;
    }
    let attempts = 0;
    const initialize = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({ client_id: clientId, callback: handleGoogleCredential });
        window.google.accounts.id.renderButton(document.querySelector('#google-login'), { theme: 'outline', size: 'large', text: 'signin_with', shape: 'rectangular' });
        return;
      }
      attempts += 1;
      if (attempts < 20) window.setTimeout(initialize, 300);
      else setLoginStatus('Google 登入元件載入失敗，請重新整理頁面。', true);
    };
    initialize();
  }

  async function syncProgress() {
    const endpoint = siteConfig.completionApiUrl || '';
    const classSeat = core.normalizeClassSeat(state.profile.group);
    if (!authCredential || !classSeat) {
      setLoginStatus('請先登入學校帳號並輸入班級座號。', true);
      return;
    }
    const button = document.querySelector('#progress-sync');
    button.disabled = true;
    button.textContent = '同步中...';
    setLoginStatus(`正在同步 ${authEmail} 的 22 項任務...`);
    try {
      const tasks = Object.fromEntries(taskInputs.map((input) => [input.dataset.taskId, state.completedIds.includes(input.dataset.taskId)]));
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ credential: authCredential, classSeat, tasks }),
      });
      if (!response.ok) throw new Error('Request failed');
      const payload = await response.json();
      if (!payload.ok) throw new Error(payload.error || '同步失敗');
      setLoginStatus('同步成功，公開總表稍後會更新。');
      await refreshCompletionBoard();
    } catch (error) {
      setLoginStatus(error.message || '同步失敗，請稍後再試。', true);
    } finally {
      button.textContent = '同步 22 項任務';
      updateSyncControl();
    }
  }

  async function refreshCompletionBoard() {
    const status = document.querySelector('#completion-status');
    const endpoint = siteConfig.completionApiUrl || '';
    if (!/^https:\/\/script\.google\.com\/macros\/s\//.test(endpoint)) {
      status.textContent = '完成狀況總表尚未啟用。';
      return;
    }
    status.textContent = '正在更新完成狀況...';
    status.classList.remove('is-error');
    try {
      const response = await fetch(endpoint, { cache: 'no-store' });
      if (!response.ok) throw new Error('Request failed');
      const payload = await response.json();
      if (!core.validateCompletionPayload(payload)) throw new Error('Invalid payload');
      renderCompletionRows(payload.students);
      const updatedAt = new Date(payload.updatedAt);
      status.textContent = Number.isNaN(updatedAt.getTime())
        ? '完成狀況已更新。'
        : `最後更新：${updatedAt.toLocaleString('zh-TW')}`;
    } catch {
      status.textContent = '暫時無法更新，請稍後重試。';
      status.classList.add('is-error');
    }
  }

  render();
  void loadArtifact();
  configureGoogleForm();
  renderCompletionHeaders();
  configureGoogleLogin();
  document.querySelector('#progress-sync').addEventListener('click', syncProgress);
  document.querySelector('#completion-refresh').addEventListener('click', refreshCompletionBoard);
  document.querySelectorAll('[data-guide-id]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      openGuide(button.dataset.guideId);
    });
  });
  document.querySelector('#guide-close').addEventListener('click', closeGuide);
  document.querySelector('#guide-dialog').addEventListener('click', (event) => {
    if (event.target === event.currentTarget) closeGuide();
  });
  void refreshCompletionBoard();
  if (/^https:\/\/script\.google\.com\/macros\/s\//.test(siteConfig.completionApiUrl || '')) {
    window.setInterval(refreshCompletionBoard, 30000);
  }
  registerWebMcpTools();
})();
