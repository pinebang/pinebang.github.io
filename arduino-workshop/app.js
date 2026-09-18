(function initWorkshop() {
  'use strict';

  const STORAGE_KEY = 'arduino-workshop-state-v1';
  const sharedTaskIds = ['check-board', 'check-ide', 'check-port', 'check-blink', 'check-serial', 'check-diagnose'];
  const sharedGuides = {
    'check-board': {
      title: '鋼鐵神殿的守護檢視：認識 Arduino UNO',
      goal: '為 Arduino 穿上盔甲，能指出板子上的主要區域，知道哪些地方可以接線，以及什麼時候必須先斷電。',
      sections: [
        { heading: '先找找看', items: ['USB 連接埠：連接電腦、供電與上傳程式。', 'DC 電源插座與 VIN：外部供電入口；初學時優先使用 USB。', 'RESET 按鈕：讓板子重新開始執行程式。', 'L、TX、RX LED：顯示內建 LED 與序列傳輸活動。', '數位腳位 0–13：可讀取 HIGH/LOW，也可輸出 HIGH/LOW；0、1 是序列通訊腳位。', '類比輸入 A0–A5：讀取感測器的類比電壓變化。', '5V、3.3V、GND：供電與共同參考點，GND 必須和電路共地。'] },
        { heading: '安全操作', items: ['拔插 LED、按鈕或跳線前先拔除 USB 或外部電源。', '不要讓 5V 與 GND 直接短接，也不要把不同電壓的電源直接相接。', 'LED 通常要串接限流電阻；不確定接法時先問老師。'] },
        { heading: '自我檢查', items: ['我能指出 USB、RESET、L、數位腳位、類比腳位與 GND。', '我知道拔插元件前要先斷電。'] },
      ],
      links: [{ label: '開啟 Arduino UNO Rev3 官方腳位圖', url: 'https://docs.arduino.cc/resources/pinouts/A000073-full-pinout.pdf' }],
    },
    'check-ide': {
      title: '智慧火種的喚醒：熟悉 Arduino IDE 2',
      goal: '能開啟 Arduino IDE 2、建立草稿，找到驗證與上傳功能。',
      sections: [
        { heading: '畫面上要認識的區域', items: ['編輯區：撰寫 Arduino 程式，檔案通常稱為 sketch。', '驗證按鈕：只編譯程式，先檢查語法與函式是否正確。', '上傳按鈕：把編譯後的程式寫入開發板。', '序列監控工具：讀取板子傳回電腦的文字。', '板型與連接埠選擇器：告訴 IDE 要用哪一種板子、哪一個 USB 連接埠。'] },
        { heading: '第一次操作', items: ['開啟 Arduino IDE 2，建立新的空白草稿。', '先按驗證，觀察下方訊息區是否出現完成或錯誤。', '接上 Arduino 後，再選擇正確板型與 Port。', '看到板型與 Port 後，才進行上傳。'] },
        { heading: '自我檢查', items: ['我能說出驗證和上傳的差別。', '我能找到編輯區、板型選擇器和下方訊息區。'] },
      ],
      links: [{ label: 'Arduino 硬體資料（AEH004000）', url: 'assets/arduino-ide-hardware-guide.pdf' }, { label: '下載 Arduino IDE 官方軟體', url: 'https://www.arduino.cc/en/software/' }, { label: '查看 Arduino IDE 2 官方文件', url: 'https://docs.arduino.cc/software/ide/' }, { label: '查看官方上傳步驟', url: 'https://support.arduino.cc/hc/en-us/articles/4733418441116-Upload-a-sketch-in-Arduino-IDE' }],
    },
    'check-port': {
      title: '天命羅盤的校準：Board 和 Port',
      goal: '能分辨 Board 與 Port，找到自己的 Arduino 出現在哪一個 COM 連接埠。',
      sections: [
        { heading: '兩個名詞的差別', items: ['Board 是板子的型號，例如 Arduino Uno；它決定程式如何編譯與上傳。', 'Port 是電腦分配給實際 USB 裝置的連接埠，例如 COM3。', '同一塊板子換一個 USB 孔，Port 編號可能改變；Board 通常不會跟著改變。'] },
        { heading: '辨識步驟', items: ['先拔掉 Arduino，記住目前 Port 清單。', '接上資料傳輸 USB 線，確認板上的電源燈亮起。', '在 IDE 的板型與連接埠選擇器中，找新出現的裝置。', '若看到 Unknown，先選擇其他板子與連接埠，再指定 Arduino Uno。', '若完全沒有 Port，先換 USB 線或 USB 孔；有些線只能充電、不能傳資料。'] },
        { heading: '自我檢查', items: ['我能說明 Board 和 Port 的差別。', '我能拔插一次 USB，找出哪一個 COM 是自己的板子。'] },
      ],
      links: [{ label: '查看官方 Board 與 Port 說明', url: 'https://support.arduino.cc/hc/en-us/articles/4733418441116-Upload-a-sketch-in-Arduino-IDE' }],
    },
    'check-blink': {
      title: '神火初燃：Blink 讓內建 LED 閃爍',
      goal: '能從官方內建範例開啟 Blink，完成驗證、上傳，並觀察板上的 L 燈。',
      sections: [
        { heading: '操作步驟', items: ['開啟 Arduino IDE，選擇 File > Examples > 01.Basics > Blink。', '確認板型與 Port 已選好。', '按驗證，確認程式可以編譯。', '按上傳，等待下方訊息顯示上傳完成。', '觀察板上標示 L 的內建 LED，應該大約亮 1 秒、暗 1 秒反覆循環。'] },
        { heading: '看懂程式', items: ['setup() 只在開機或重置時執行一次。', 'loop() 會不斷重複執行。', 'pinMode(LED_BUILTIN, OUTPUT) 把內建 LED 腳位設定為輸出。', 'digitalWrite() 控制 LED HIGH 或 LOW；delay() 讓程式暫停一段時間。'] },
        { heading: '自我檢查', items: ['我看到 L 燈穩定閃爍。', '我能指出 setup()、loop() 和 digitalWrite() 各自的用途。'] },
      ],
      links: [{ label: '開啟 Arduino 官方內建範例', url: 'https://docs.arduino.cc/built-in-examples' }, { label: '查看官方上傳教學', url: 'https://support.arduino.cc/hc/en-us/articles/4733418441116-Upload-a-sketch-in-Arduino-IDE' }],
    },
    'check-serial': {
      title: '回音神諭的傳訊：讓板子回傳文字',
      goal: '能使用 Serial Monitor 觀察 Arduino 傳回的文字，並知道鮑率不一致會造成亂碼。',
      sections: [
        { heading: '基本概念', items: ['Serial 是 Arduino 和電腦交換文字或數值的通道。', 'Serial.begin(9600) 會在 setup() 啟動通訊；9600 是鮑率。', 'Serial.println() 會送出一行文字，方便觀察程式執行狀況。', 'Serial Monitor 的鮑率必須和程式設定相同，否則常會看到亂碼。'] },
        { heading: '操作步驟', items: ['開啟 File > Examples > 01.Basics > AnalogReadSerial，或使用會定時 println 的範例。', '上傳程式後開啟 Serial Monitor。', '將右下角鮑率設成和 Serial.begin(...) 相同的數值。', '觀察文字或數值是否持續出現；若要測感測器，可轉動旋鈕或遮住光敏電阻。'] },
        { heading: '自我檢查', items: ['我能找到 Serial Monitor。', '我能說明鮑率是什麼，並能處理亂碼問題。'] },
      ],
      links: [{ label: '查看 Arduino IDE 2 Serial Monitor 官方說明', url: 'https://docs.arduino.cc/software/ide-v2/tutorials/ide-v2-serial-monitor' }, { label: '瀏覽官方內建範例', url: 'https://docs.arduino.cc/built-in-examples' }],
    },
    'check-diagnose': {
      title: '賢者之眼的排錯試煉：60 秒依序找出問題',
      goal: '遇到無法上傳或沒有輸出時，能按照固定順序檢查，不靠猜測反覆重試。',
      sections: [
        { heading: '60 秒排錯順序', items: ['1. 電源：板上的 ON 或電源指示燈是否亮起？', '2. COM 連接埠：拔插一次，比較清單前後差異；有些 USB 線只能充電。', '3. 板型與連接埠：IDE 是否選到正確 Board 和 COM？', '4. 序列監控：先關閉 Serial Monitor、另一個 IDE 視窗或可能占用 Port 的程式。'] },
        { heading: '仍然無法上傳時', items: ['移除不必要的跳線，尤其不要把元件接在 0(RX)、1(TX)。', '重新插拔或按 RESET；記下完整錯誤訊息再請老師協助。'] },
        { heading: '留下證據', items: ['記錄你看到的錯誤訊息，而不是只說「不能上傳」。', '寫下板型、Port、USB 線是否更換，以及你已經嘗試過的步驟。', '一次只改一個條件，才知道哪個方法有效。'] },
        { heading: '請 GPT 協助排錯', items: ['可以截取整個 Arduino IDE 畫面；如果畫面太大，也可以只截取程式碼與下方狀態或錯誤訊息區。', '把截圖貼到 GPT，並一起說明板型、Port、想達成的結果與實際看到的現象。', '可以這樣問：「請根據這張截圖，找出最可能的問題，指出要修改哪裡，並告訴我下一步怎麼檢查。」', '送出前先遮住姓名、帳號、Email、序號等個人資料。'] },
        { heading: '自我檢查', items: ['我能說出至少兩個無法上傳時的檢查方法。', '我能把錯誤訊息和已嘗試的步驟清楚告訴同學或老師。'] },
      ],
      links: [{ label: '查看 Arduino 官方 avrdude 排錯清單', url: 'https://support.arduino.cc/hc/en-us/articles/4401874331410--Error-avrdude' }, { label: '查看官方無法上傳排錯流程', url: 'https://support.arduino.cc/hc/en-us/articles/4403365313810-If-your-sketch-doesn-t-upload' }],
    },
  };
  const guideImages = {
    'check-board': { src: 'assets/arduino-uno-pinout-complete.png', alt: 'Arduino Uno Rev3 外觀與 A 到 P 功能完整標註圖', caption: '核對 Arduino Uno Rev3 外觀，以及 A 到 P 各部位的功能；圖片來源：Arduino.cc。', href: 'https://www.arduino.cc/en/Guide/ArduinoUno' },
    'check-ide': { src: 'assets/arduino-ide-software.png', alt: 'Arduino 官方軟體下載頁面與 Arduino IDE 介面', caption: '認識 Arduino IDE 2 的下載頁面與操作介面；圖片來源：Arduino 官方軟體頁面。', href: 'https://www.arduino.cc/en/software/' },
    'check-blink': { src: 'assets/arduino-blink-menu.png', alt: 'Arduino IDE 從檔案選單開啟 Blink 範例的畫面', caption: '在 Arduino IDE 中依序選擇「檔案 → 範例 → 01.Basics → Blink」；圖片為課程操作示意圖。' },
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
  const stageGroups = [...document.querySelectorAll('[data-stage-index]')];
  const allTaskIds = taskInputs.map((input) => input.dataset.taskId);
  const core = window.ArduinoCore;
  const siteConfig = window.ArduinoWorkshopConfig || {};
  let independentGuides = {};
  let independentGuidesReady = Promise.resolve();
  const taskFlows = {
    'myth-light': ['接光敏電阻分壓電路並用 analogRead() 讀值。', '用 Serial Monitor 觀察亮暗讀值，找出穩定的臨界值。', '讓 LED 在低於臨界值時點亮，測試白天、夜晚與遮光情境。'],
    'myth-piano': ['為五個按鈕設定輸入腳位，接上被動蜂鳴器。', '替每個按鈕指定不同頻率與音名。', '逐一測試音階，再組合成一段精靈旋律。'],
    'myth-reaction': ['按下開始後用 random() 產生不可預測的等待時間。', '亮燈當下用 millis() 記錄開始時間。', '按下按鈕後計算反應時間，重複多次比較結果。'],
    'myth-whack': ['準備多組 LED 與對應按鈕，建立目標編號。', '隨機亮起一顆晶石，等待玩家按下對應按鈕。', '判斷正確、錯誤或超時並更新分數。'],
    'myth-climate': ['接上 DHT11／DHT22 與 LCD 1602 I2C。', '定時讀取溫度與濕度並處理讀取失敗。', '在螢幕顯示數值，設定安全範圍並觀察環境變化。'],
    'myth-radar': ['接線並用超音波感測器量測回波時間。', '把時間換算成公分距離，先用 Serial Monitor 校正。', '依距離改變蜂鳴器間隔，測試靠近與遠離障礙物。'],
    'myth-timer': ['設計開始、暫停與歸零三個按鈕狀態。', '用 millis() 計算經過時間，不讓畫面被 delay() 卡住。', '在倒數結束時顯示提示並播放警示聲。'],
    'myth-bin': ['固定超音波感測器與 SG90 伺服馬達，先測試角度。', '偵測手靠近時開啟箱蓋並保持一段時間。', '確認沒有人靠近後關蓋，測試反覆開關是否穩定。'],
    'myth-memory': ['建立燈號與按鈕陣列，先完成單一燈號輸入。', '每回合播放越來越長的隨機序列。', '逐一比對玩家輸入，答對進入下一關，答錯結束。'],
    'myth-safe': ['接上 4x4 Keypad 與 LCD，先確認每個按鍵讀值。', '建立密碼輸入、清除與確認流程。', '正確時轉動伺服馬達解鎖，錯誤多次時發出警告並暫停輸入。'],
    'myth-1a2b': ['產生四個不重複的秘密數字並保存。', '讀取玩家輸入，逐位計算 A，再計算數字存在但位置不同的 B。', '顯示提示並持續遊戲，直到猜中或達到嘗試上限。'],
    'myth-station': ['分別接上溫濕度、光線等感測器並確認讀值。', '用固定時間間隔記錄多組資料與時間。', '整理資料找出異常時段，製作簡單圖表並提出解釋。'],
    'myth-dino': ['在 OLED 畫出角色、地面與障礙物。', '用 millis() 控制障礙物移動與按鈕跳躍，加入簡單重力。', '做矩形碰撞判斷，通過時間越久就提高速度。'],
    'myth-snake': ['用座標陣列保存蛇身，讓蛇持續朝目前方向移動。', '隨機產生果實，吃到後增加蛇身長度並更新分數。', '判斷撞牆與撞到自己，完成遊戲結束畫面。'],
    'myth-tetris': ['用二維陣列建立遊戲場地，畫出一個可移動方塊。', '加入左右移動、下落、旋轉與碰撞檢查。', '方塊固定後檢查滿行、消除、加分，測試堆到頂端的情況。'],
  };
  const taskComponentTests = {
    'myth-light': ['先測試光敏電阻：只接分壓電路，從 Serial Monitor 觀察亮暗數值。', '再測試 LED：不接感測器，讓 LED 單獨亮滅。', '最後合併光敏電阻與 LED，確認門檻控制。'],
    'myth-piano': ['先測試每個按鈕：按下與放開的狀態要能被讀到。', '再測試蜂鳴器：用固定音調確認能發聲。', '最後逐一配對五個按鈕與五個音階。'],
    'myth-reaction': ['先測試 LED：確認能由程式控制亮滅。', '再測試按鈕：確認按下狀態穩定且不會重複觸發。', '最後加入 millis() 計時與 random() 等待。'],
    'myth-whack': ['先測試每顆 LED：確認編號與亮滅位置正確。', '再逐一測試對應按鈕，確認按鈕編號沒有接反。', '最後合併隨機目標、判斷與計分。'],
    'myth-climate': ['先測試 DHT11／DHT22：在 Serial Monitor 顯示溫度與濕度。', '再測試 LCD 1602 I2C：顯示固定文字確認位址與背光。', '最後把感測數值更新到 LCD，並處理讀取失敗。'],
    'myth-radar': ['先測試 HC-SR04：在 Serial Monitor 顯示距離公分值。', '再測試蜂鳴器：播放固定音調確認接腳。', '最後讓距離改變蜂鳴器間隔。'],
    'myth-timer': ['先測試 LCD 或 OLED：顯示固定倒數數字。', '再逐一測試開始、暫停、歸零按鈕。', '最後加入 millis() 計時與倒數結束警示。'],
    'myth-bin': ['先測試 HC-SR04：確認手靠近時距離讀值變小。', '再測試 SG90：讓伺服馬達轉到開蓋與關蓋角度。', '最後合併距離判斷與自動開關蓋。'],
    'myth-memory': ['先測試四顆 LED：確認顏色與陣列編號一致。', '再逐一測試四顆按鈕與去彈跳。', '最後測試燈號播放、玩家輸入與逐關增加。'],
    'myth-safe': ['先測試 Keypad：在 Serial Monitor 顯示每個按鍵。', '再測試 LCD：顯示輸入中的密碼符號。', '再測試伺服馬達的鎖定與解鎖角度，最後加入錯誤次數。'],
    'myth-1a2b': ['先測試按鈕或 Keypad：確認四位數輸入順序。', '再用固定秘密數字測試 A、B 計算，不先加入亂數。', '最後加入不重複亂數、提示與猜測次數。'],
    'myth-station': ['先分別測試溫濕度感測器與光敏電阻，確認每個讀值會變化。', '再測試 LCD、OLED 或序列埠的資料顯示。', '最後加入時間記錄、多感測器整合與資料分析。'],
    'myth-dino': ['先測試 OLED：顯示角色、地面與一個障礙物。', '再測試按鈕：確認按下能讓角色跳躍。', '最後逐步加入重力、障礙物移動與碰撞判斷。'],
    'myth-snake': ['先測試 OLED 或點矩陣的座標顯示。', '再逐一測試方向按鈕或搖桿，確認方向不會反轉。', '最後加入蛇身陣列、果實、成長與碰撞。'],
    'myth-tetris': ['先測試 OLED 或點矩陣的格子座標。', '再逐一測試左右、下移與旋轉按鈕。', '最後依序加入方塊碰撞、固定、消行與遊戲結束。'],
  };
  const componentGuides = {
    'Arduino': { title: 'Arduino 開發板', goal: 'Arduino 是作品的控制核心，負責讀取輸入、執行程式並控制輸出。', sections: [{ heading: '使用重點', items: ['先確認板型、USB 資料線與 COM 連接埠。', '所有元件的 GND 要和 Arduino 共地。', '拔插元件前先斷開 USB 或外部電源。'] }, { heading: '基本測試', items: ['上傳內建 Blink 範例，確認板子能正常執行程式。', '開啟 Serial Monitor，確認能看到程式輸出的文字。'] }], links: [] },
    'Arduino或ESP32': { title: 'Arduino 或 ESP32', goal: '兩者都是微控制器平台；ESP32 額外提供較多效能與 Wi-Fi／藍牙功能。', sections: [{ heading: '選擇建議', items: ['初學者可先使用 Arduino UNO，接線與教學較容易。', '需要 Wi-Fi、較多記憶體或多感測器時，可考慮 ESP32。', 'Arduino UNO 與 ESP32 的腳位編號、電壓與程式設定不完全相同。'] }, { heading: '基本測試', items: ['先確認電源燈亮起，再用最小程式測試一個 LED 或序列埠。'] }], links: [] },
    '光敏電阻': { title: '光敏電阻', goal: '光敏電阻會隨環境亮度改變阻值，可用來偵測明亮或昏暗。', sections: [{ heading: '接線重點', items: ['要和固定電阻組成分壓電路，再把中間接點接到 A0 等類比輸入。', '光敏電阻本身沒有固定正負極，重點是分壓接法與共地。'] }, { heading: '測試方式', items: ['遮住與照亮感測器，觀察 analogRead() 數值是否明顯變化。', '記錄亮與暗的數值，再設定適合的臨界值。'] }], links: [] },
    'LED': { title: 'LED 發光二極體', goal: 'LED 是用電流控制的發光元件，可作為狀態或結果提示。', sections: [{ heading: '接線重點', items: ['長腳通常是正極，短腳通常是負極。', 'LED 必須串接限流電阻，負極接 GND。', '不要把 LED 兩腳插在麵包板同一條導電列。'] }, { heading: '測試方式', items: ['先用 Blink 類型程式讓 LED 亮、滅，確認腳位與極性。', '若完全不亮，先反轉 LED 方向並檢查電阻與 GND。'] }], links: [] },
    '電阻': { title: '電阻', goal: '電阻用來限制電流、分壓或設定感測器的工作範圍。', sections: [{ heading: '使用重點', items: ['LED 常用約 220Ω 限流；光敏電阻常和固定電阻組成分壓。', '電阻沒有正負極，方向通常不影響功能。', '依色環或萬用電表確認阻值，避免拿錯規格。'] }, { heading: '測試方式', items: ['確認電阻兩端接在不同節點，不能被麵包板同一條導電列短路。'] }], links: [] },
    '麵包板': { title: '麵包板', goal: '麵包板讓元件可以暫時插接，不需要焊接。', sections: [{ heading: '接線重點', items: ['中央區同一排通常是五個孔相通；中間凹槽兩側不相通。', '電源軌可能在中間斷開，使用前要確認是否需要跳線連接。', '元件腳位不要全部插在同一條導電列。'] }, { heading: '測試方式', items: ['用跳線把 5V 和 GND 接到電源軌，再用 LED 與電阻測試供電。'] }], links: [] },
    '杜邦線': { title: '杜邦線', goal: '杜邦線用來連接 Arduino、麵包板與各種模組。', sections: [{ heading: '使用重點', items: ['公對公、公對母、母對母要依元件接頭選擇。', '線兩端要插到底，但不要用力拉扯腳位。', '接線前先依顏色區分 5V、GND 與訊號線。'] }, { heading: '測試方式', items: ['若數值不穩定或元件沒有反應，先重新插拔並檢查是否使用資料線而非只有充電功能的線材。'] }], links: [] },
    '按鈕': { title: '按鈕', goal: '按鈕是數位輸入元件，讓使用者把「按下／放開」傳給 Arduino。', sections: [{ heading: '接線重點', items: ['四腳按鈕通常要跨過麵包板中央凹槽。', '可使用 INPUT_PULLUP，按下時通常讀到 LOW。', '按鈕可能有彈跳，快速連續讀取時要加入去彈跳處理。'] }, { heading: '測試方式', items: ['先用 Serial Monitor 印出 HIGH／LOW，確認按下與放開狀態符合預期。'] }], links: [] },
    '被動蜂鳴器': { title: '被動蜂鳴器', goal: '被動蜂鳴器需要 Arduino 提供頻率，才能播放不同音高。', sections: [{ heading: '接線重點', items: ['正極接數位輸出腳位，負極接 GND。', '使用 tone() 播放頻率，使用 noTone() 停止。'] }, { heading: '測試方式', items: ['先固定播放一個音調，再改變頻率確認音高會改變。', '若沒有聲音，檢查是否誤用主動蜂鳴器或接反腳位。'] }], links: [] },
    'DHT11或DHT22': { title: 'DHT11／DHT22 溫濕度感測器', goal: 'DHT 感測器可讀取環境溫度與相對濕度。', sections: [{ heading: '使用重點', items: ['依模組標示接 VCC、GND 與 DATA；不同模組腳位排列可能不同。', 'DHT22 通常精度與量測範圍較好，但讀取速度仍有限。', '讀取失敗時不要把錯誤數值當成真實環境資料。'] }, { heading: '測試方式', items: ['先只在 Serial Monitor 顯示溫度與濕度，確認數值穩定後再接 LCD。'] }], links: [] },
    'DHT11/DHT22': { title: 'DHT11／DHT22 溫濕度感測器', goal: 'DHT 感測器可讀取環境溫度與相對濕度。', sections: [{ heading: '使用重點', items: ['依模組標示接 VCC、GND 與 DATA；不同模組腳位排列可能不同。', 'DHT22 通常精度與量測範圍較好，但讀取速度仍有限。', '讀取失敗時不要把錯誤數值當成真實環境資料。'] }, { heading: '測試方式', items: ['先只在 Serial Monitor 顯示溫度與濕度，確認數值穩定後再接 LCD。'] }], links: [] },
    'LCD 1602 I2C': { title: 'LCD 1602 I2C', goal: 'LCD 1602 I2C 用兩條訊號線顯示文字與數值，可減少 Arduino 佔用的腳位。', sections: [{ heading: '接線重點', items: ['通常接 VCC、GND、SDA、SCL；Arduino UNO 的 SDA／SCL 在 A4／A5 附近。', 'I2C 位址可能是 0x27 或其他值，模組不同時要重新確認。'] }, { heading: '測試方式', items: ['先顯示固定文字，若只有背光沒有文字，檢查對比旋鈕與 I2C 位址。'] }], links: [] },
    'HC-SR04': { title: 'HC-SR04 超音波感測器', goal: 'HC-SR04 透過發射與接收超音波估算物體距離。', sections: [{ heading: '接線重點', items: ['VCC 接電源、GND 接地，TRIG 與 ECHO 接兩個數位腳位。', '先確認模組工作電壓與 Arduino 的輸入電壓相容。'] }, { heading: '測試方式', items: ['先在 Serial Monitor 顯示距離，拿物體靠近與移開，確認數值跟著改變。', '避免把手或物體放得太近，超出模組量測範圍時要處理異常值。'] }], links: [] },
    'SG90伺服馬達': { title: 'SG90 伺服馬達', goal: '伺服馬達可轉到指定角度，適合控制箱蓋、門鎖或指針。', sections: [{ heading: '接線重點', items: ['通常是紅線接電源、棕／黑線接 GND、橙／黃線接訊號。', '馬達啟動電流可能造成 Arduino 重置，必要時使用穩定的外部電源並共地。', '不要強行把馬達轉到機械極限。'] }, { heading: '測試方式', items: ['先讓馬達依序轉到 0、90、180 度，確認角度方向與機構不會卡住。'] }], links: [] },
    '4x4 Keypad': { title: '4×4 矩陣鍵盤', goal: '4×4 Keypad 用列與行的矩陣方式輸入數字與符號。', sections: [{ heading: '使用重點', items: ['先確認八條接線的列／行順序，順序錯誤會造成按鍵對應錯亂。', '可先用測試程式把每個按鍵印到 Serial Monitor。'] }, { heading: '測試方式', items: ['逐一按下 0–9、A–D、*、#，確認每個按鍵只回報一次且符號正確。'] }], links: [] },
    'OLED': { title: 'OLED 顯示器', goal: 'OLED 可用像素座標顯示文字、圖形與簡單遊戲畫面。', sections: [{ heading: '接線重點', items: ['I2C OLED 通常接 VCC、GND、SDA、SCL。', '常見尺寸是 0.96 吋，解析度可能為 128×64；程式設定要相符。'] }, { heading: '測試方式', items: ['先顯示固定文字與矩形，再測試清除畫面與重新繪製。'] }], links: [] },
    '方向按鈕或搖桿': { title: '方向按鈕或搖桿', goal: '方向控制元件讓玩家改變角色、蛇或方塊的移動方向。', sections: [{ heading: '使用重點', items: ['四向按鈕要分別確認上、下、左、右的輸入。', '類比搖桿除了方向，也可能需要讀取 X、Y 軸與按壓開關。'] }, { heading: '測試方式', items: ['先在 Serial Monitor 顯示每個方向的狀態，確認沒有按下時不會漂移或誤觸發。'] }], links: [] },
    'LED點矩陣': { title: 'LED 點矩陣', goal: 'LED 點矩陣用格子顯示角色、方塊、蛇身或其他圖案。', sections: [{ heading: '使用重點', items: ['先確認矩陣的列、行與模組驅動方式，避免直接把過多電流拉過 Arduino。', '顯示座標通常從左上角開始，但不同函式庫方向可能不同。'] }, { heading: '測試方式', items: ['先逐格點亮或顯示棋盤格，確認行列沒有顛倒，再顯示角色圖案。'] }], links: [] },
  };
    independentGuidesReady = fetch('tasks.json?v=20260916-scroll1').then((response) => response.json()).then((data) => {
    independentGuides = Object.fromEntries(data.tasks.map((task, index) => [`myth-${['light', 'piano', 'reaction', 'whack', 'climate', 'radar', 'timer', 'bin', 'memory', 'safe', '1a2b', 'station', 'dino', 'snake', 'tetris'][index]}`, {
      title: task.title,
      scenario: task.scenario,
      goal: `${task.mission} 學習重點：${task.learn.join('、')}。`,
      sections: [
        { heading: '要解決的問題', items: [task.problem] },
        { heading: '可以學到', items: task.learn },
        { heading: '建議材料／元件', items: task.materials },
        { heading: '零件逐一測試', items: taskComponentTests[`myth-${['light', 'piano', 'reaction', 'whack', 'climate', 'radar', 'timer', 'bin', 'memory', 'safe', '1a2b', 'station', 'dino', 'snake', 'tetris'][index]}`] },
        { heading: '任務流程', items: taskFlows[`myth-${['light', 'piano', 'reaction', 'whack', 'climate', 'radar', 'timer', 'bin', 'memory', 'safe', '1a2b', 'station', 'dino', 'snake', 'tetris'][index]}`] },
      ],
      links: [],
    }]));
  }).catch((error) => console.warn('無法載入獨立任務教材', error));
  let authCredential = '';
  let authEmail = '';

  function clearSchoolAuth() {
    authCredential = '';
    authEmail = '';
    try {
      sessionStorage.removeItem(AUTH_SESSION_KEY);
    } catch {
      // sessionStorage 不可用時，仍保留目前頁面的登入功能。
    }
  }

  function restoreSchoolAuth() {
    try {
      const stored = JSON.parse(sessionStorage.getItem(AUTH_SESSION_KEY) || 'null');
      if (!stored || typeof stored.credential !== 'string' || typeof stored.email !== 'string') return false;
      const email = stored.email.toLowerCase();
      if (!email.endsWith('@ms.gmjh.tyc.edu.tw')) {
        sessionStorage.removeItem(AUTH_SESSION_KEY);
        return false;
      }
      authCredential = stored.credential;
      authEmail = email;
      return true;
    } catch {
      return false;
    }
  }

  function persistSchoolAuth(credential, email) {
    authCredential = credential;
    authEmail = email;
    try {
      sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({ credential, email }));
    } catch {
      // sessionStorage 不可用時，仍保留目前頁面的登入功能。
    }
  }

  const defaultState = {
    completedIds: [],
    selectedRoute: '',
    profile: { group: '', projectTitle: '' },
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
    if (!target) return;
    target.textContent = message;
    target.classList.toggle('is-error', isError);
  }

  function gateComplete() {
    return core.isGateComplete(sharedTaskIds, state.completedIds);
  }

  function stageHasAny(stageIndex) {
    const stage = stageGroups[stageIndex];
    return Boolean(stage && [...stage.querySelectorAll('[data-task-id]')].some((input) => state.completedIds.includes(input.dataset.taskId)));
  }

  function isStageUnlocked(stageIndex) {
    if (!gateComplete()) return false;
    if (stageIndex === 0) return true;
    if (stageIndex === 1) return stageHasAny(0);
    if (stageIndex >= 2) return stageHasAny(1);
    return false;
  }

  function render() {
    state.completedIds = core.normalizeProgressForGate(sharedTaskIds, state.completedIds);
    const unlocked = gateComplete();
    taskInputs.forEach((input) => {
      input.checked = state.completedIds.includes(input.dataset.taskId);
      const stage = input.closest('[data-stage-index]');
      const stageIndex = stage ? Number(stage.dataset.stageIndex) : -1;
      input.disabled = true;
    });

    stageGroups.forEach((stage, index) => {
      stage.disabled = !isStageUnlocked(index);
      stage.classList.toggle('is-locked', !isStageUnlocked(index));
    });

    const gateStatus = document.querySelector('#gate-status');
    gateStatus.textContent = unlocked ? '健檢完成 · 已鎖定' : `尚缺 ${sharedTaskIds.filter((id) => !state.completedIds.includes(id)).length} 項`;
    gateStatus.className = `status-badge ${unlocked ? 'status-complete' : 'status-warning'}`;
    const lockLabel = document.querySelector('#route-lock-label');
    lockLabel.textContent = unlocked ? '任務已解鎖' : '健檢後解鎖任務';
    lockLabel.className = `status-badge ${unlocked ? 'status-complete' : 'status-locked'}`;

    document.querySelectorAll('[data-profile]').forEach((input) => {
      input.value = state.profile[input.dataset.profile] || '';
    });
    updateSyncControl();
  }

  function updateSyncControl() {
    const button = document.querySelector('#progress-sync');
    if (!button) return;
    const classSeat = core.normalizeClassSeat(state.profile.group);
    button.disabled = !authCredential || !classSeat;
  }

  document.querySelectorAll('[data-profile]').forEach((input) => {
    input.addEventListener('input', () => {
      state.profile[input.dataset.profile] = input.value;
      saveState();
      updateSyncControl();
    });
  });

  document.querySelector('#export-button').addEventListener('click', () => {
    const record = {
      ...core.createExportRecord(state.profile, state.completedIds, state.reflections || {}),
      selectedRoute: state.selectedRoute,
          progress: core.calculateStageProgress(state.completedIds),
    };
    const blob = new Blob([JSON.stringify(record, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = core.normalizeClassSeat(state.profile.group).replace(/[\\/:*?"<>|\s]+/g, '-') || 'student';
    link.href = url;
    link.download = `arduino-workshop-${safeName}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus('學習紀錄已匯出。');
  });

  const resetDialog = document.querySelector('#reset-dialog');
  document.querySelector('#reset-button').addEventListener('click', () => resetDialog.showModal());
  document.querySelector('#confirm-reset').addEventListener('click', async () => {
    localStorage.removeItem(STORAGE_KEY);
    state = structuredClone(defaultState);
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
            return { progress: core.calculateStageProgress(state.completedIds), gateComplete: gateComplete(), selectedRoute: state.selectedRoute };
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
        throw new Error('任務完成狀態只能由老師認證');
      },
    });
  }

  function renderCompletionRows(rows) {
    const list = document.querySelector('#completion-list');
    const empty = document.querySelector('#completion-empty');
    const fragment = document.createDocumentFragment();
    rows.forEach((row) => {
      const progress = core.calculateStageProgress(row.tasks);
      const studentLabel = row.classSeat === '12345' ? 'Ya' : row.classSeat;
      const bar = document.createElement('div');
      bar.className = 'completion-bar';
      bar.title = `${studentLabel}：完成 ${progress.completed} / ${progress.total} 個階段`;
      bar.style.setProperty('--completion-height', `${progress.percent}%`);
      const value = document.createElement('strong');
      value.textContent = `${progress.completed} / ${progress.total}`;
      const fill = document.createElement('span');
      fill.className = 'completion-bar-fill';
      fill.append(value);
      const label = document.createElement('small');
      label.textContent = studentLabel;
      bar.append(fill, label);
      fragment.append(bar);
    });
    list.replaceChildren(fragment);
    empty.hidden = rows.length !== 0;
  }

  async function openGuide(taskId) {
    if (!sharedGuides[taskId] && !routeGuides[taskId] && !independentGuides[taskId]) await independentGuidesReady;
    const guide = sharedGuides[taskId] || routeGuides[taskId] || independentGuides[taskId];
    const images = guideImages[taskId] ? (Array.isArray(guideImages[taskId]) ? guideImages[taskId] : [guideImages[taskId]]) : [];
    const dialog = document.querySelector('#guide-dialog');
    if (!guide || !dialog) return;
    document.querySelector('#guide-title').textContent = guide.title;
    const scenario = guide.scenario
      ? `<section class="guide-scenario"><p class="guide-scroll-label">任務卷軸</p><h3>情境任務</h3><p>${guide.scenario}</p></section>`
      : '';
    document.querySelector('#guide-content').innerHTML = [
      scenario,
      `<p class="guide-goal"><strong>冒險目標</strong>${guide.goal}</p>`,
      images.map((image) => `<figure class="guide-figure"><img src="${image.src}" alt="${image.alt}" data-full-src="${image.src}" loading="lazy"><figcaption>${image.caption}</figcaption></figure>`).join(''),
          ...guide.sections.map((section) => `<section><h3>${section.heading}</h3><ul>${section.heading === '建議材料／元件' ? section.items.map((item) => `<li><button class="component-link" type="button" data-component-name="${item}">${item}</button></li>`).join('') : section.items.map((item) => `<li>${item}</li>`).join('')}</ul></section>`),
          guide.links?.length ? `<section><h3>官方延伸資料</h3><ul class="guide-links">${guide.links.map((link) => `<li><a href="${link.url}" target="_blank" rel="noopener">${link.label}</a></li>`).join('')}</ul></section>` : '',
    ].join('');
    dialog.showModal();
  }

  function openComponent(componentName) {
    const guide = componentGuides[componentName] || { title: componentName, goal: '這個元件目前尚未建立詳細說明。', sections: [], links: [] };
    const dialog = document.querySelector('#guide-dialog');
    if (!dialog) return;
    document.querySelector('#guide-title').textContent = guide.title;
    document.querySelector('#guide-content').innerHTML = [
      `<p class="guide-goal"><strong>用途</strong>${guide.goal}</p>`,
      ...guide.sections.map((section) => `<section><h3>${section.heading}</h3><ul>${section.items.map((item) => `<li>${item}</li>`).join('')}</ul></section>`),
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
      clearSchoolAuth();
      setLoginStatus('請使用學校 @ms.gmjh.tyc.edu.tw 帳號登入。', true);
      updateSyncControl();
      return;
    }
    persistSchoolAuth(response.credential, email);
    setLoginStatus(`已登入：${email}。請確認班級座號後同步。`);
    updateSyncControl();
  }

  function configureGoogleLogin() {
    const clientId = siteConfig.googleClientId || '';
    if (!clientId) {
      setLoginStatus('學校 Google 登入尚未完成設定。', true);
      return;
    }
    if (restoreSchoolAuth()) {
      setLoginStatus(`已登入：${authEmail}。請確認班級座號後同步。`);
      updateSyncControl();
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
    setLoginStatus(`正在同步 ${authEmail} 的 21 項任務...`);
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
    button.textContent = '老師同步 21 項任務';
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
      const payload = core.normalizeCompletionPayload(await response.json());
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
  document.querySelector('#completion-refresh').addEventListener('click', refreshCompletionBoard);
      document.querySelectorAll('[data-guide-id]').forEach((button) => {
    button.textContent = '開啟冒險卷軸';
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      openGuide(button.dataset.guideId);
      });
      document.querySelector('#guide-content').addEventListener('click', (event) => {
        const image = event.target.closest('[data-full-src]');
        if (image) {
          const preview = document.querySelector('#image-dialog-preview');
          preview.src = image.dataset.fullSrc;
          preview.alt = image.alt;
          document.querySelector('#image-dialog').showModal();
          return;
        }
        const button = event.target.closest('[data-component-name]');
        if (button) openComponent(button.dataset.componentName);
      });
  });
  document.querySelector('#guide-close').addEventListener('click', closeGuide);
  document.querySelector('#image-dialog-close').addEventListener('click', () => document.querySelector('#image-dialog').close());
  document.querySelector('#guide-dialog').addEventListener('click', (event) => {
    if (event.target === event.currentTarget) closeGuide();
  });
  void refreshCompletionBoard();
  if (/^https:\/\/script\.google\.com\/macros\/s\//.test(siteConfig.completionApiUrl || '')) {
    window.setInterval(refreshCompletionBoard, 30000);
  }
  registerWebMcpTools();
})();
