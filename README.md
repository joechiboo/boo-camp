# 2026 萬聖節團露 🎃

給團露成員看的活動資訊網站。主辦：江嘉芸、Lydia。

**網址**：<https://joechiboo.github.io/boo-camp/>

營區：遊橘露營區（312 新竹縣橫山鄉福興村 112-6 號）· 2026/10/24（六）～ 10/26（一），兩夜

## 要改內容的話

九成的內容都在 [`assets/data.js`](assets/data.js)，改那一個檔就好，不用碰 HTML。

```text
assets/data.js       ← 所有文字內容：日期、行程、餐食、營位表、Q&A、打包清單
assets/camp-map.jpg  ← 營位分佈圖（換圖直接覆蓋同名檔案即可）
assets/style.css     ← 樣式
assets/main.js       ← 把 data.js 渲染到畫面上
index.html           ← 版面結構
```

改完存檔後：

```bash
git add -A
git commit -m "更新活動資訊"
git push
```

推上去約 1 分鐘後線上就會更新（可能要重新整理／清快取）。

### 常見的修改

| 想改什麼 | 改 `data.js` 的哪裡 |
| --- | --- |
| 目前該做什麼（首頁最上面那塊） | `status` — 每項的 `state` 改成 `done` / `active` / `todo` |
| 營區名稱、地址、Google 地圖連結 | `campName` / `campAddress` / `campMapUrl` |
| 倒數計時的目標時間 | `startISO` |
| 行程時間 | `schedule` |
| 餐車狀態 | `meals` — `status` 用 `confirmed` 或 `cancelled` |
| 營位人數 | `roster` — 不確定的填 `null`，畫面會顯示「—」 |
| 討糖禮物要備幾份 | `giftPlan` — 調 `perUnknownSite` 和 `extraBuffer`，總數自動重算 |
| 暫時隱藏營位表 | `showRoster: false` |
| 暫時隱藏營位圖 | `map.show: false` |

## 開 GitHub Pages

Repo → **Settings** → **Pages** → Source 選 **Deploy from a branch** → Branch 選 `main` / `/ (root)` → Save。

沒有 build 步驟，純靜態檔案，push 就是部署。

## 隱私相關的設計決定

這個網站是**公開**的（GitHub Pages 免費版無法設密碼），任何拿到網址的人都看得到。基於這點做了幾個處理：

- 頁面加了 `<meta name="robots" content="noindex, nofollow">`，**不會被 Google 收錄**，只有拿到網址的人進得來。
- **不放轉帳帳號**。收費資訊一律由主辦在 LINE 群組公告，避免帳號被爬蟲抓走或被冒用詐騙。
- 營位表**只放小孩人數，不放年齡與性別**。
- 營位分佈圖含團員姓名與家庭人數。若之後覺得不妥，把 `data.js` 的 `map.show` 改成 `false` 就會隱藏；要徹底移除請一併刪掉 `assets/camp-map.jpg` 並 push。

> 若要真正私密（需登入才能看），得改用 GitHub Pages 私有站（需付費方案）或其他有密碼保護的空間。

## 待辦與待確認

### 要主辦確認的（卡住資料正確性）

- [ ] **新屋是不是改名叫「太陽」？** 三份資料不一致：
  - 舊營位圖：`新屋 靜怡`（這筆本來就抄錯，靜怡是祥兔）
  - 費用試算表：`Elaine → 新屋`（四人房 3300 / 6600）
  - 新版營位圖：`太陽 Elaine-2大2小`、另外多一家 `星星 家禾`
  - 目前 `data.js` 暫用「新屋 / Elaine」並在備註標明待確認
- [ ] **星星（家禾）的大人／小孩人數**
- [ ] 其餘未填人數的營位：祥兔、金菊、C5、C6、D2、D3、D6、E1、E3、E4、E5
- [ ] 入營與退營的正確時間（目前行程寫 14:00 入營，是推測值）
- [ ] 2026 年第一夜是否再嘗試找餐車

### 要換的檔案

- [ ] **換上新版營位分佈圖** → 覆蓋 `assets/camp-map.jpg`，然後把 `data.js` 裡 `map.stale` 清成 `''`
  （舊圖還沒換掉之前，頁面會顯示「這張圖是舊版」的提醒）

### 已確認、已反映在網站上

- 蘭屋 ⇄ 彩菊 換房：Rita 蘭屋四人房 → 彩菊六人房，Jill 反向（2026/08 LINE 群組）
- 夜衝是 **10/23（五）晚上**先到，等於多住一夜，不是「只來一晚」
- 第一夜日式丼飯餐車未達 $20,000 低銷，2025/11/22 確定取消

### 刻意不放上網站的

- **轉帳帳號** — 公開網頁會被爬走，收費資訊一律由主辦在 LINE 公告
- **房型與費用**（六人房 4200/8400、四人加大 3300/6600、四人房 3000/6000）—
  金額未定案，先放上去之後改了要一家一家解釋。10 月收費確定後再考慮
- **小孩年齡與性別** — 只放人數，討糖與禮物統計夠用
