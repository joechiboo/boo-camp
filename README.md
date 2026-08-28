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

## 待補資訊

- [ ] 營區全名、地址、Google 地圖連結（`data.js` 的 `campName` / `campAddress` / `campMapUrl`）
- [ ] 入營與退營的正確時間
- [ ] 營位圖上未填人數的營位：新屋、祥兔、C6、D2、D6
- [ ] 2026 年第一夜是否再嘗試找餐車
