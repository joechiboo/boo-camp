/* ============================================================
   2026 萬聖節團露 — 資料檔
   要改網站內容，改這個檔就好，不用動 index.html / main.js
   改完存檔 → git commit → git push，GitHub Pages 會自動更新
   ============================================================ */

const CAMP = {
  /* ---------- 基本資訊 ---------- */
  year: 2026,
  title: '2026 萬聖節團露',
  subtitle: '一起過一個開心不用煮的萬聖節 👻',

  // 倒數計時的目標時間（入營時間）。格式：YYYY-MM-DDTHH:mm:ss+08:00
  startISO: '2026-10-24T14:00:00+08:00',

  dateLabel: '2026/10/24（六）～ 10/26（一）',
  dateStart: '10/24（六）',   // 資訊卡用，避免長日期在窄卡片裡斷行
  dateEnd: '10/26（一）',
  nightsLabel: '共兩夜',
  holidayNote: '光復節連假',
  nightsNote: '共兩夜 · 光復節連假（夜衝 10/23 五 起，共三夜）',

  campName: '遊橘露營區',
  campAddress: '312 新竹縣橫山鄉福興村 112-6 號',
  campMapUrl: 'https://www.google.com/maps/search/?api=1&query=%E9%81%8A%E6%A9%98%E9%9C%B2%E7%87%9F%E5%8D%80',

  hosts: [
    { name: '江嘉芸', role: '主辦' },
    { name: 'Lydia', role: '主辦' },
  ],
  hostNote: '有問題請在 LINE 群組 tag 主辦，或私訊主辦。',

  /* ---------- 目前進度（首頁最上面那塊，最常要更新） ----------
     state: 'done' 已完成 / 'active' 進行中 / 'todo' 還沒開始 */
  status: [
    {
      state: 'done',
      title: '營位確認',
      desc: '各家庭在 LINE 記事本確認自己的營位與家庭人數。',
    },
    {
      state: 'done',
      title: '第一夜日式丼飯餐車',
      desc: '未達廠商 $20,000 低銷，已於 2025/11/22 確定取消，第一夜晚餐請自理。',
    },
    {
      state: 'done',
      title: '第二夜 Buffet 自助餐登記',
      desc: '各家庭人數與年齡已統計完成，共 32 個營位訂餐。',
    },
    {
      state: 'active',
      title: '自助餐收費中 — 9/4（五）前',
      desc: '請對照下方收費表確認自己的金額，轉帳給你的負責人，並在該負責人的 LINE 記事本留言對帳。',
    },
    {
      state: 'todo',
      title: '夜衝與租帳登記收費',
      desc: '自助餐收完後另行處理，金額與方式由主辦在 LINE 群組公告。',
    },
  ],

  /* ---------- 自助餐收費 ----------
     費用會用 feeRules 從「大人數 + 每個小孩的年齡」重算一次，
     跟 roster 裡填的 fee 對不起來時，畫面上那筆會標紅提醒。 */
  fees: {
    show: true,
    title: '中式自助晚餐（第二夜）',
    deadline: '9/4（五）前',
    rules: [
      { label: '13 歲以上', price: 380 },
      { label: '8–12 歲', price: 200 },
      { label: '7 歲以下', price: 0 },
    ],
    // 依上面的規則計算：大人一律 380，小孩看年齡
    adultPrice: 380,
    tiers: [{ min: 13, price: 380 }, { min: 8, price: 200 }, { min: 0, price: 0 }],
    howto: [
      '對照下方表格確認自己的金額是否正確',
      '9/4（五）前轉帳給你那一組的負責人',
      '轉完帳請到該負責人的 LINE 記事本留言，方便對帳',
    ],
    example: 'C3　1大1小(9y)　580',
    // 轉帳帳號預設不放在公開網頁上（見 README）。要顯示改成 true。
    showAccounts: false,
    accountsHiddenNote: '轉帳帳號請看 LINE 群組公告或私訊負責人。網站不放帳號，收到任何要你轉到其他帳戶的訊息，請先向主辦確認。',
    accounts: [
      {
        owner: 'Lydia（陳玉雯）',
        method: '街口支付',
        code: '機構代碼 396',
        account: '901161550',
        url: 'https://service.jkopay.com/r/transfer?j=Transfer:901161550',
      },
    ],
  },

  /* ---------- 行程 ---------- */
  schedule: [
    {
      day: '夜衝',
      date: '10/23（五）',
      tag: '加購',
      optional: true,
      items: [
        { time: '晚上', text: '夜衝的朋友這天晚上先到，等於多住一夜' },
        { time: '', text: '需另外登記，主辦會在 10 月一起收費' },
      ],
    },
    {
      day: 'Day 1',
      date: '10/24（六）',
      items: [
        { time: '14:00', text: '入營、搭帳、小木屋 check in' },
        { time: '下午', text: '營位佈置（萬聖節裝飾歡迎盡情發揮 🎃）' },
        { time: '晚餐', text: '自理 — 第一夜餐車未達標取消，請自備食材或外食' },
        { time: '晚上', text: '自由交流、繼續佈置營位' },
      ],
    },
    {
      day: 'Day 2',
      date: '10/25（日）',
      items: [
        { time: '上午', text: '自由活動' },
        { time: '下午', text: '換裝時間 — 大人小孩一起變裝 🧛' },
        { time: '傍晚', text: 'Buffet 自助餐（不用煮！）' },
        { time: '壓軸', text: '討糖大遊行 🍬 各家庭在營位發糖果，小孩挨家挨戶 trick or treat' },
      ],
    },
    {
      day: 'Day 3',
      date: '10/26（一）',
      items: [
        { time: '上午', text: '收帳、拔營' },
        { time: '中午前', text: '退場，明年見 👋' },
      ],
    },
  ],
  scheduleNote: '細部時間主辦會在接近活動時公告，以 LINE 群組為準。',

  /* ---------- 餐食 ---------- */
  meals: [
    {
      day: 'Day 1 · 10/24 晚餐',
      name: '日式丼飯餐車',
      status: 'cancelled',
      statusLabel: '已取消',
      desc: '原訂分時段領餐的日式丼飯餐車，因訂購金額未達廠商 $20,000 低銷，已於 2025/11/22 確定取消。',
      points: ['第一夜晚餐請各家自理', '可自備食材、卡式爐，或提前買好外食'],
    },
    {
      day: 'Day 2 · 10/25 晚餐',
      name: 'Buffet 自助餐',
      status: 'confirmed',
      statusLabel: '確定舉辦',
      desc: '討糖活動是第二夜的壓軸，所以特別安排 Buffet，讓大家不用同時忙著煮飯、佈置、裝扮、找（罵）小孩，可以稍微輕鬆一點 🙂',
      points: [
        '7 歲以下小孩免費，但登記時「務必標註免費小孩的數量」，廠商才知道要準備多少份',
        '登記格式範例：C3　3大2小（10y、6y）',
        '有低銷，希望大家共襄盛舉；未達金額會流標',
        '登記地點：LINE 群組記事本',
      ],
    },
  ],

  /* ---------- 討糖禮物備量估算 ----------
     數字會從下面的 roster 自動算，這裡只調參數。
     建議備量 = 已確認小孩數 ＋（未確認營位數 × perUnknownSite）＋ extraBuffer */
  giftPlan: {
    show: true,
    perUnknownSite: 2,    // 每個「未填人數」的營位先預留幾份
    extraBuffer: 5,       // 額外備品：弄丟、臨時加入、印壞
    includeBabies: false, // 嫩嬰是否也算一份（3D 列印小零件對 3 歲以下有窒息風險）
  },

  /* ---------- 討糖活動 ---------- */
  trickOrTreat: {
    desc: '第二夜的壓軸。小孩換上裝扮，挨家挨戶到各營位討糖。',
    points: [
      '每個家庭請準備糖果／小禮物，放在自己營位發送',
      '禮物數量請抓「全團小孩總數」，主辦會統計後公告',
      '建議準備個別包裝的糖果或小玩具，方便發送',
      '大人也很歡迎一起變裝，氣氛會更好 🧟',
    ],
  },

  /* ---------- 報名／繳費流程 ---------- */
  steps: [
    {
      no: 'Step 1',
      title: '確認營位',
      desc: '到 LINE 群組記事本確認自己的營位（帳篷區 or 小木屋）與聯絡人，有誤請 tag 主辦修改。',
    },
    {
      no: 'Step 2',
      title: '登記 Buffet 人數',
      desc: '在記事本按範例登記大人／小孩人數，7 歲以下免費的小孩也要標出數量。修改請直接改掉舊的那筆，不要另外新增，方便主辦統計。',
    },
    {
      no: 'Step 3',
      title: '繳費',
      desc: '人數統計完成後，主辦會在 LINE 群組公告自助餐、夜衝與租帳的金額與轉帳方式。',
    },
  ],
  paymentNote: '⚠️ 轉帳資訊一律以 LINE 群組公告為準，本網站不會公開帳號。收到任何要求你匯款到其他帳戶的訊息，請先向主辦確認。',

  /* ---------- 打包清單 ---------- */
  packing: [
    {
      cat: '萬聖節專用 🎃',
      items: ['全家人的變裝服', '營位裝飾（南瓜燈、蜘蛛網、鬼燈串）', '討糖用糖果／小禮物', '小孩裝糖果的提袋或南瓜桶'],
    },
    {
      cat: '露營基本',
      items: ['帳篷、地墊、睡袋（住小木屋的可略）', '照明：營燈、頭燈、延長線', '桌椅', '保暖衣物 — 10 月底山區早晚很冷'],
    },
    {
      cat: '飲食',
      items: ['第一夜晚餐食材或外食（餐車已取消）', '早餐、午餐、點心', '飲用水、保溫瓶', '餐具、垃圾袋'],
    },
    {
      cat: '其他',
      items: ['個人藥品、防蚊液', '雨具', '健保卡', '相機／手機充電'],
    },
  ],

  /* ---------- Q&A ---------- */
  faq: [
    {
      q: '第一夜的餐車真的沒有了嗎？',
      a: '是的。日式丼飯餐車因為訂購總額沒有達到廠商的 $20,000 低銷，2025/11/22 已確定取消，第一夜晚餐請自理。',
    },
    {
      q: 'Buffet 小孩要算錢嗎？',
      a: '7 歲以下免費。但登記時還是要把免費小孩的數量寫出來，廠商才知道要準備多少份食材。',
    },
    {
      q: '登記錯了要怎麼改？',
      a: '請把記事本上舊的那一筆刪掉，只留一筆正確的，主辦最後會重新統計。不要用新增留言的方式修改。',
    },
    {
      q: '費用是一天還兩天？',
      a: '這次是兩夜，營位費用記得要 ×2。',
    },
    {
      q: '沒有帳篷可以參加嗎？',
      a: '可以，營區有小木屋，也可以登記租帳。租帳的收費會跟自助餐一起在 10 月統一處理。',
    },
    {
      q: '夜衝是什麼？幾點到？',
      a: '夜衝是提前一晚、10/23（五）晚上就先到營區，等於比大家多住一夜。需要另外登記，主辦會在 10 月跟自助餐、租帳一起收費。',
    },
  ],

  /* ---------- 營位分佈圖 ---------- */
  map: {
    show: true,
    src: 'assets/camp-map.jpg',
    alt: '營區空拍圖，標示各營位編號、聯絡人與家庭人數，以及入口、營本部、浴廁、沙坑、溜滑梯、動物區、生態池的位置',
    caption: '點圖片可放大。營位編號、營本部、浴廁、沙坑、溜滑梯、動物區、生態池位置都標在上面了。',
    // 圖還沒換新版時填這行，畫面會顯示提醒；換上新圖後把字串清成 '' 即可
    stale: '這張圖是舊版：蘭屋⇄彩菊換房、星星與太陽都還沒反映在圖上。營位與人數請以下方營位表為準。',
  },

  // 營區設施（顯示在地圖下方）
  facilities: ['入口', '營本部', '浴廁', '沙坑 ×2', '溜滑梯 ×2', '動物區', '生態池', '昆蟲館', '水彈槍廠'],

  /* ---------- 營位表 ----------
     資料來源：主辦提供的營位分佈圖。
     adults / kids / babies 不確定的填 null，畫面顯示「—」，可用 note 補充。
     刻意不放小孩的年齡與性別（公開網頁上的孩童個資考量）。
     type: 'tent' 帳篷／車露 · 'cabin' 小木屋 */
  showRoster: true, // 改成 false 可整個隱藏營位表區塊
  rosterNote: '人數與年齡以「各組名單與費用總計」為準，比頁面上那張營位圖新。標「—」的是沒訂自助餐、資料也還沒補齊的營位。有誤請在 LINE 群組 tag 你的負責人。',

  /* 欄位說明：
     group   收費負責人（嘉芸／淳瑜／Tanya／Lydia），沒訂餐的填 null
     adults  大人數
     kids    小孩數
     ages    每個小孩的年齡（陣列）。有填才會驗算費用；長度要等於 kids
     fee     收費表上的金額，會跟 feeRules 重算的結果比對
     ordered 是否有訂第二夜自助餐 */
  roster: [
    // ── 小木屋 ──
    { site: '星星', type: 'cabin', contact: '家禾',        group: null,    adults: null, kids: null, ages: null,       fee: null, ordered: false, note: '收費表上沒有這一戶，待主辦確認' },
    { site: '太陽', type: 'cabin', contact: 'Elaine',      group: '嘉芸',  adults: 2, kids: 2, ages: [8, 10],          fee: 1160, ordered: true,  note: '舊營位圖上標示為「新屋」' },
    { site: '菊屋', type: 'cabin', contact: 'Vito',        group: '嘉芸',  adults: 2, kids: 2, ages: [11, 11],         fee: 1160, ordered: true,  note: '營位圖上的聯絡人是 Jan' },
    { site: '竹屋', type: 'cabin', contact: 'Melinda',     group: '嘉芸',  adults: 2, kids: 2, ages: [11, 8],          fee: 1160, ordered: true },
    { site: '蘭屋', type: 'cabin', contact: 'Jill Liao',   group: 'Tanya', adults: 3, kids: 1, ages: null,             fee: 1340, ordered: true,  note: '與彩菊換房；收費表上的營位還是換房前的' },
    { site: '梅屋', type: 'cabin', contact: '玉佩',        group: '淳瑜',  adults: 2, kids: 1, ages: [4],              fee: 760,  ordered: true,  note: '營位圖上的聯絡人是蕭宇鈞' },
    { site: '瑞兔', type: 'cabin', contact: '綺亞',        group: '淳瑜',  adults: 2, kids: 2, ages: [9, 10],          fee: 1160, ordered: true },
    { site: '祥兔', type: 'cabin', contact: '靜怡',        group: null,    adults: null, kids: null, ages: null,       fee: null, ordered: false },
    { site: '彩菊', type: 'cabin', contact: 'Rita',        group: '嘉芸',  adults: 2, kids: 3, ages: [13, 11, 9],      fee: 1540, ordered: true,  note: '與蘭屋換房；收費表上的營位還是換房前的' },
    { site: '金菊', type: 'cabin', contact: 'Angel',       group: '淳瑜',  adults: 2, kids: 3, ages: [9, 6, 6],        fee: 960,  ordered: true },
    // ── A 區 ──
    { site: 'A1', type: 'tent', contact: '真真',           group: '淳瑜',  adults: 2, kids: 1, ages: [9],              fee: 960,  ordered: true },
    { site: 'A2', type: 'tent', contact: '庭歡',           group: '淳瑜',  adults: 2, kids: 2, ages: [11, 9],          fee: 1160, ordered: true },
    { site: 'A3', type: 'tent', contact: 'Joana',          group: '淳瑜',  adults: 2, kids: 2, ages: [9, 6],           fee: 960,  ordered: true },
    { site: 'A4', type: 'tent', contact: '林小宥',         group: '淳瑜',  adults: 2, kids: 1, ages: [9],              fee: 960,  ordered: true },
    { site: 'A5', type: 'tent', contact: 'Sandy',          group: '淳瑜',  adults: 2, kids: 2, ages: [9, 7],           fee: 960,  ordered: true },
    { site: 'A6', type: 'tent', contact: '玉佩',           group: '淳瑜',  adults: 2, kids: 2, ages: [15, 8],          fee: 1340, ordered: true,  note: '收費表寫 3大1小 — 15Y 依規則以大人計費' },
    // ── B 區 ──
    { site: 'B1', type: 'tent', contact: '鳥ㄚㄚ',         group: null,    adults: 2, kids: 2, ages: null,             fee: null, ordered: false },
    { site: 'B2', type: 'tent', contact: '宜穎(小莉)',     group: 'Tanya', adults: 2, kids: 2, ages: [10, 5],          fee: 960,  ordered: true },
    { site: 'B3', type: 'tent', contact: '淳瑜',           group: '淳瑜',  adults: 2, kids: 1, ages: [9],              fee: 960,  ordered: true },
    { site: 'B4', type: 'tent', contact: 'Genie Hung',     group: '淳瑜',  adults: 2, kids: 1, ages: [9],              fee: 960,  ordered: true },
    { site: 'B5', type: 'tent', contact: '小妞',           group: '淳瑜',  adults: 2, kids: 2, ages: [10, 5],          fee: 960,  ordered: true },
    { site: 'B6', type: 'tent', contact: '燕',             group: '淳瑜',  adults: 2, kids: 1, ages: [11],             fee: 960,  ordered: true,  note: '營位圖上的聯絡人是栗子' },
    // ── C 區 ──
    { site: 'C1', type: 'tent', contact: 'anita-平安',     group: '嘉芸',  adults: 2, kids: 0, ages: [],               fee: 760,  ordered: true,  note: '營位圖上是 3大1小' },
    { site: 'C2', type: 'tent', contact: 'yoyo Liu',       group: '嘉芸',  adults: 2, kids: 2, ages: [10, 3],          fee: 960,  ordered: true },
    { site: 'C3', type: 'tent', contact: '江嘉芸',         group: '嘉芸',  adults: 1, kids: 1, ages: [9],              fee: 580,  ordered: true,  note: '營位圖上的聯絡人是 Trini' },
    { site: 'C4', type: 'tent', contact: '紀伯喬',         group: 'Lydia', adults: 2, kids: 2, ages: [8, 5],           fee: 960,  ordered: true,  note: '營位圖上這格是 Lydia' },
    { site: 'C5', type: 'tent', contact: 'Lydia 陳玉雯',   group: 'Lydia', adults: 2, kids: 2, ages: [11, 6],          fee: 960,  ordered: true,  host: true, note: '收費表寫 2大1小，但列了兩個年齡；金額是以 2大2小 計算' },
    { site: 'C6', type: 'tent', contact: 'Eric Yang',      group: 'Lydia', adults: 2, kids: 2, ages: [9, 6],           fee: 960,  ordered: true },
    // ── D 區 ──
    { site: 'D1', type: 'tent', contact: 'Doris Lu呂珮琳', group: 'Lydia', adults: 2, kids: 1, ages: [6],              fee: 760,  ordered: true },
    { site: 'D2', type: 'tent', contact: 'Candice 姿方',   group: 'Lydia', adults: 2, kids: 1, ages: [6],              fee: 760,  ordered: true },
    { site: 'D3', type: 'tent', contact: '靜怡',           group: null,    adults: null, kids: null, ages: null,       fee: null, ordered: false, note: '共 3 人' },
    { site: 'D4', type: 'tent', contact: '靜怡',           group: 'Lydia', adults: 2, kids: 2, ages: [8, 10],          fee: 1160, ordered: true },
    { site: 'D5', type: 'tent', contact: 'zizi婆婆',       group: 'Lydia', adults: 2, kids: 1, ages: [6],              fee: 760,  ordered: true,  note: '營位圖上的聯絡人是 Darren' },
    { site: 'D6', type: 'tent', contact: 'Mini',           group: 'Lydia', adults: 2, kids: 1, ages: [5],              fee: 760,  ordered: true,  note: '營位圖上的聯絡人是 Darren' },
    // ── E 區 ──
    { site: 'E1', type: 'tent', contact: 'TANYA',          group: 'Tanya', adults: 2, kids: 2, ages: [9, 7],           fee: 960,  ordered: true },
    { site: 'E2', type: 'tent', contact: 'Phoebe',         group: null,    adults: 2, kids: 1, ages: null,             fee: null, ordered: false },
    { site: 'E3', type: 'tent', contact: 'Eva',            group: null,    adults: null, kids: null, ages: null,       fee: null, ordered: false, note: '共 2 人' },
    { site: 'E4', type: 'tent', contact: '依依',           group: 'Tanya', adults: 2, kids: 2, ages: [8, 10],          fee: 1160, ordered: true },
    { site: 'E5', type: 'tent', contact: '裴裴',           group: null,    adults: null, kids: null, ages: null,       fee: null, ordered: false, note: '共 2 人' },
    { site: 'E6', type: 'tent', contact: 'Ginny',          group: null,    adults: 2, kids: 2, ages: null,             fee: null, ordered: false },
  ],
};
