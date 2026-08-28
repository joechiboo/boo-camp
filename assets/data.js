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
  nightsLabel: '共兩夜',
  holidayNote: '光復節連假',

  // TODO 主辦確認：營區全名、地址、Google 地圖連結
  campName: '（營區名稱待補）',
  campAddress: '（營區地址待補）',
  campMapUrl: '', // 例：'https://maps.app.goo.gl/xxxxx'，留空則不顯示地圖按鈕

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
      state: 'active',
      title: '第二夜 Buffet 自助餐登記',
      desc: '請在 LINE 記事本登記大人／小孩人數，7 歲以下免費仍要標註數量，廠商才知道要備多少份。',
    },
    {
      state: 'todo',
      title: '收費（自助餐、夜衝、租帳）',
      desc: '10 月統一收費，金額與轉帳資訊由主辦在 LINE 群組公告。',
    },
  ],

  /* ---------- 行程 ---------- */
  schedule: [
    {
      day: 'Day 1',
      date: '10/24（六）',
      items: [
        { time: '14:00', text: '入營、搭帳、小木屋 check in' },
        { time: '下午', text: '營位佈置（萬聖節裝飾歡迎盡情發揮 🎃）' },
        { time: '晚餐', text: '自理 — 第一夜餐車未達標取消，請自備食材或外食' },
        { time: '晚上', text: '自由交流、夜衝的朋友這天到' },
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
      q: '可以只來一晚（夜衝）嗎？',
      a: '可以，夜衝需要另外登記，主辦會在 10 月一起收費。',
    },
  ],

  /* ---------- 營位分佈圖 ---------- */
  map: {
    show: true,
    src: 'assets/camp-map.jpg',
    alt: '營區空拍圖，標示各營位編號、聯絡人與家庭人數，以及入口、營本部、浴廁、沙坑、溜滑梯、動物區、生態池的位置',
    caption: '點圖片可放大。營位編號、營本部、浴廁、沙坑、溜滑梯、動物區、生態池位置都標在上面了。',
  },

  // 營區設施（顯示在地圖下方）
  facilities: ['入口', '營本部', '浴廁', '沙坑 ×2', '溜滑梯 ×2', '動物區', '生態池', '昆蟲館', '水彈槍廠'],

  /* ---------- 營位表 ----------
     資料來源：主辦提供的營位分佈圖。
     adults / kids / babies 不確定的填 null，畫面顯示「—」，可用 note 補充。
     刻意不放小孩的年齡與性別（公開網頁上的孩童個資考量）。
     type: 'tent' 帳篷／車露 · 'cabin' 小木屋 */
  showRoster: true, // 改成 false 可整個隱藏營位表區塊
  rosterNote: '資料來源為營位分佈圖。標「—」的是圖上未填人數的營位，請主辦補齊；有誤請在 LINE 群組 tag 主辦。',
  roster: [
    // 小木屋
    { site: '新屋', type: 'cabin', contact: '靜怡',      adults: null, kids: null, babies: 0 },
    { site: '菊屋', type: 'cabin', contact: 'Jan',       adults: 2, kids: 2, babies: 0 },
    { site: '竹屋', type: 'cabin', contact: 'Melinda',   adults: 2, kids: 2, babies: 0 },
    { site: '蘭屋', type: 'cabin', contact: 'Rita',      adults: 2, kids: 3, babies: 0 },
    { site: '梅屋', type: 'cabin', contact: '蕭宇鈞',    adults: 2, kids: 1, babies: 0 },
    { site: '瑞兔', type: 'cabin', contact: '綺砡',      adults: 2, kids: 2, babies: 0 },
    { site: '祥兔', type: 'cabin', contact: '靜怡',      adults: null, kids: null, babies: 0 },
    { site: '彩菊', type: 'cabin', contact: 'Jill',      adults: null, kids: null, babies: 0, note: '共 4 人' },
    { site: '金菊', type: 'cabin', contact: 'Angel',     adults: null, kids: null, babies: 0, note: '共 3 人' },
    // A 區
    { site: 'A1', type: 'tent', contact: '真真車露',     adults: 2, kids: 1, babies: 0 },
    { site: 'A2', type: 'tent', contact: '筳歡車露',     adults: 2, kids: 2, babies: 0 },
    { site: 'A3', type: 'tent', contact: 'Joana',        adults: 2, kids: 2, babies: 0 },
    { site: 'A4', type: 'tent', contact: '小育',         adults: 2, kids: 1, babies: 0 },
    { site: 'A5', type: 'tent', contact: 'sandy',        adults: 2, kids: 2, babies: 0 },
    { site: 'A6', type: 'tent', contact: '玉佩',         adults: 2, kids: 2, babies: 0 },
    // B 區
    { site: 'B1', type: 'tent', contact: '鳥ㄚㄚ',       adults: 2, kids: 2, babies: 0 },
    { site: 'B2', type: 'tent', contact: '小莉',         adults: 2, kids: 2, babies: 0 },
    { site: 'B3', type: 'tent', contact: '淳瑜',         adults: 2, kids: 1, babies: 0 },
    { site: 'B4', type: 'tent', contact: 'Genie Hung',   adults: 2, kids: 1, babies: 0 },
    { site: 'B5', type: 'tent', contact: '小妞',         adults: 2, kids: 1, babies: 1 },
    { site: 'B6', type: 'tent', contact: '栗子',         adults: 2, kids: 1, babies: 0 },
    // C 區
    { site: 'C1', type: 'tent', contact: 'Anita',        adults: 3, kids: 1, babies: 0 },
    { site: 'C2', type: 'tent', contact: 'yoyo',         adults: 2, kids: 1, babies: 1 },
    { site: 'C3', type: 'tent', contact: 'Trini',        adults: 1, kids: 1, babies: 0 },
    { site: 'C4', type: 'tent', contact: 'Lydia',        adults: 2, kids: 1, babies: 1, host: true },
    { site: 'C5', type: 'tent', contact: 'Yello',        adults: null, kids: null, babies: 0, note: '共 2 人' },
    { site: 'C6', type: 'tent', contact: 'Eric',         adults: null, kids: null, babies: 0 },
    // D 區
    { site: 'D1', type: 'tent', contact: 'Doris',        adults: 2, kids: 1, babies: 0 },
    { site: 'D2', type: 'tent', contact: 'Doris',        adults: null, kids: null, babies: 0 },
    { site: 'D3', type: 'tent', contact: '靜怡',         adults: null, kids: null, babies: 0, note: '共 3 人' },
    { site: 'D4', type: 'tent', contact: '靜怡',         adults: 2, kids: 1, babies: 0 },
    { site: 'D5', type: 'tent', contact: 'Darren',       adults: 2, kids: 1, babies: 0 },
    { site: 'D6', type: 'tent', contact: 'Darren',       adults: null, kids: null, babies: 0 },
    // E 區
    { site: 'E1', type: 'tent', contact: 'Tanya',        adults: null, kids: null, babies: 0, note: '共 2 人' },
    { site: 'E2', type: 'tent', contact: 'Phoebe',       adults: 2, kids: 1, babies: 0 },
    { site: 'E3', type: 'tent', contact: 'Eva',          adults: null, kids: null, babies: 0, note: '共 2 人' },
    { site: 'E4', type: 'tent', contact: '依依',         adults: null, kids: null, babies: 0, note: '共 2 人' },
    { site: 'E5', type: 'tent', contact: '裴裴',         adults: null, kids: null, babies: 0, note: '共 2 人' },
    { site: 'E6', type: 'tent', contact: 'Ginny',        adults: 2, kids: 2, babies: 0 },
  ],
};
