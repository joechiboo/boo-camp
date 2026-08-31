/* 2026 萬聖節團露 — 把 data.js 的內容渲染到頁面上 */
(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  /* ---------- 簡單欄位綁定 data-bind="key" ---------- */
  document.querySelectorAll('[data-bind]').forEach((n) => {
    const v = CAMP[n.dataset.bind];
    if (v != null) n.textContent = v;
  });

  /* ---------- 主辦 ---------- */
  const hostNames = CAMP.hosts.map((h) => h.name).join('、');
  $('#hosts').textContent = hostNames;
  $('#foot-hosts').textContent = '主辦：' + hostNames + ' 👻';
  $('#host-note').textContent = CAMP.hostNote;

  /* ---------- Hero 按鈕 ---------- */
  const cta = $('#hero-cta');
  cta.appendChild(Object.assign(el('a', 'btn primary', '看目前進度'), { href: '#status' }));
  if (CAMP.campMapUrl) {
    const a = el('a', 'btn ghost', '📍 ' + CAMP.campName + ' 地圖');
    a.href = CAMP.campMapUrl;
    a.target = '_blank';
    a.rel = 'noopener';
    cta.appendChild(a);
  }

  /* ---------- Hero 蝙蝠 ---------- */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const BAT = '<svg viewBox="0 0 100 40" fill="currentColor" aria-hidden="true"><path d="M50 26 C46 30 42 30 38 26 C32 22 24 22 18 26 C16 22 12 19 4 19 C8 15 13 14 17 17 C20 14 20 10 16 4 C28 2 38 6 44 14 L46 10 L45 3 L49 7 L51 7 L55 3 L54 10 L56 14 C62 6 72 2 84 4 C80 10 80 14 83 17 C87 14 92 15 96 19 C88 19 84 22 82 26 C76 22 68 22 62 26 C58 30 54 30 50 26 Z"/></svg>';
    const bats = $('#bats');
    [[9, 26, 4], [22, 34, 0], [16, 42, 9]].forEach(([top, dur, delay], i) => {
      const b = el('div', 'bat');
      b.innerHTML = BAT;
      b.style.top = top + '%';
      b.style.width = (20 + i * 7) + 'px';
      b.style.animationDuration = dur + 's, ' + (0.28 + i * 0.06) + 's';
      b.style.animationDelay = '-' + delay + 's, 0s';
      bats.appendChild(b);
    });
  }

  /* ---------- 倒數計時 ---------- */
  const target = new Date(CAMP.startISO).getTime();
  const cd = { days: $('[data-cd="days"]'), hours: $('[data-cd="hours"]'), mins: $('[data-cd="mins"]'), secs: $('[data-cd="secs"]') };
  const caption = $('#cd-caption');

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      $('#countdown').hidden = true;
      caption.textContent = '🎉 團露開始囉，營區見！';
      clearInterval(timer);
      return;
    }
    const s = Math.floor(diff / 1000);
    cd.days.textContent = Math.floor(s / 86400);
    cd.hours.textContent = String(Math.floor(s / 3600) % 24).padStart(2, '0');
    cd.mins.textContent = String(Math.floor(s / 60) % 60).padStart(2, '0');
    cd.secs.textContent = String(s % 60).padStart(2, '0');
    caption.textContent = '距離入營還有';
  }
  tick();
  const timer = setInterval(tick, 1000);

  /* ---------- 目前進度 ---------- */
  const DOT = { done: '✅', active: '🔥', todo: '⬜' };
  const TAG = { active: ['tag-active', '進行中'], todo: ['tag-todo', '待辦'] };
  const statusList = $('#status-list');
  CAMP.status.forEach((s) => {
    const li = el('li', 'status-item ' + s.state);
    li.appendChild(el('span', 'status-dot', DOT[s.state] || '⬜'));
    const body = el('div');
    const title = el('div', 'status-title', s.title);
    if (TAG[s.state]) title.appendChild(el('span', 'status-tag ' + TAG[s.state][0], TAG[s.state][1]));
    body.appendChild(title);
    body.appendChild(el('p', 'status-desc', s.desc));
    li.appendChild(body);
    statusList.appendChild(li);
  });

  /* ---------- 行程 ---------- */
  const days = $('#schedule-days');
  CAMP.schedule.forEach((d) => {
    const card = el('div', 'day-card' + (d.optional ? ' optional' : ''));
    const head = el('div', 'day-head');
    head.appendChild(el('span', 'day-name', d.day));
    head.appendChild(el('span', 'day-date', d.date));
    if (d.tag) head.appendChild(el('span', 'day-tag', d.tag));
    card.appendChild(head);
    const ul = el('ul', 'day-items');
    d.items.forEach((it) => {
      const li = el('li');
      li.appendChild(el('span', 'item-time', it.time));
      li.appendChild(el('span', null, it.text));
      ul.appendChild(li);
    });
    card.appendChild(ul);
    days.appendChild(card);
  });
  $('#schedule-note').textContent = CAMP.scheduleNote;

  /* ---------- 餐食 ---------- */
  const meals = $('#meals-list');
  CAMP.meals.forEach((m) => {
    const card = el('div', 'meal-card ' + m.status);
    card.appendChild(el('div', 'meal-day', m.day));
    card.appendChild(el('div', 'meal-name', m.name));
    card.appendChild(el('div', 'pill ' + m.status, m.statusLabel));
    card.appendChild(el('p', 'meal-desc', m.desc));
    const ul = el('ul', 'bullets');
    m.points.forEach((p) => ul.appendChild(el('li', null, p)));
    card.appendChild(ul);
    meals.appendChild(card);
  });

  /* ---------- 討糖 ---------- */
  $('#treat-desc').textContent = CAMP.trickOrTreat.desc;
  const tp = $('#treat-points');
  CAMP.trickOrTreat.points.forEach((p) => tp.appendChild(el('li', null, p)));

  /* ---------- 禮物備量估算 ---------- */
  // 「未確認」＝ 大人或小孩任一欄沒填，人數無法拆解
  const isUnconfirmed = (r) => r.adults == null || r.kids == null;
  const unconfirmed = CAMP.roster.filter(isUnconfirmed);
  const knownKids = CAMP.roster.reduce((t, r) => t + (r.kids || 0), 0);
  // 3 歲以下：3D 列印小物、小零件禮物要避開的對象
  const knownBabies = CAMP.roster.reduce(
    (t, r) => t + ((r.ages || []).filter((a) => a <= 3).length), 0);

  const gp = CAMP.giftPlan;
  if (gp && gp.show && CAMP.roster.length) {
    const babyPart = gp.includeBabies ? knownBabies : 0;
    const gapPart = unconfirmed.length * gp.perUnknownSite;
    const total = knownKids + babyPart + gapPart + gp.extraBuffer;

    $('#gift-card').hidden = false;
    $('#gift-total').textContent = total;

    const parts = ['已確認小孩 ' + knownKids];
    if (gp.includeBabies) parts.push('嫩嬰 ' + knownBabies);
    if (gapPart) parts.push('未確認營位 ' + unconfirmed.length + ' × ' + gp.perUnknownSite + ' = ' + gapPart);
    parts.push('備品 ' + gp.extraBuffer);
    $('#gift-formula').textContent = parts.join('　＋　') + '　＝　' + total + ' 份';

    if (unconfirmed.length) {
      $('#gift-gap').hidden = false;
      $('#gift-gap-title').textContent = '⚠️ 還有 ' + unconfirmed.length + ' 個營位沒填人數：';
      const gapList = $('#gift-gap-sites');
      unconfirmed.forEach((r) => gapList.appendChild(el('li', null, r.site + '　' + r.contact)));
    }

    if (knownBabies) {
      tp.appendChild(el('li', null,
        '有 ' + knownBabies + ' 位 3 歲以下的小小孩 — 請避開有小零件的禮物（窒息風險）。'));
    }
  }

  /* ---------- 報名步驟 ---------- */
  const steps = $('#steps-list');
  CAMP.steps.forEach((s) => {
    const card = el('div', 'step-card');
    card.appendChild(el('div', 'step-no', s.no));
    card.appendChild(el('div', 'step-title', s.title));
    card.appendChild(el('p', 'step-desc', s.desc));
    steps.appendChild(card);
  });
  $('#payment-note').textContent = CAMP.paymentNote;

  /* ---------- 自助餐收費 ---------- */
  const money = (n) => '$' + n.toLocaleString('en-US');

  // 依收費標準重算：大人一律 adultPrice，小孩看年齡落在哪一段
  function priceForAge(age) {
    const tier = CAMP.fees.tiers.find((t) => age >= t.min);
    return tier ? tier.price : 0;
  }
  function computeFee(r) {
    if (r.adults == null || !r.ages) return null;
    return r.adults * CAMP.fees.adultPrice + r.ages.reduce((t, a) => t + priceForAge(a), 0);
  }
  // 人數與年齡的顯示字串，例：2大2小（8Y、10Y）
  function partyLabel(r) {
    if (r.adults == null) return '—';
    let s = r.adults + '大';
    if (r.kids) s += r.kids + '小';
    if (r.ages && r.ages.length) s += '（' + r.ages.map((a) => a + 'Y').join('、') + '）';
    return s;
  }

  const fees = CAMP.fees;
  if (fees && fees.show) {
    $('#fees').hidden = false;
    $('#fees-lead').textContent = fees.title + '，' + fees.deadline + '完成轉帳。';

    const rulesUl = $('#fee-rules');
    fees.rules.forEach((r) => {
      const li = el('li');
      li.appendChild(el('span', null, r.label));
      li.appendChild(el('b', null, r.price ? money(r.price) : '免費'));
      rulesUl.appendChild(li);
    });

    const howto = $('#fee-howto');
    fees.howto.forEach((h) => howto.appendChild(el('li', null, h)));
    $('#fee-example').textContent = fees.example;

    if (fees.showAccounts) {
      const wrap = $('#fee-accounts');
      fees.accounts.forEach((a) => {
        const card = el('div', 'account-card');
        card.appendChild(el('div', 'acct-owner', a.owner));
        card.appendChild(el('div', 'acct-line', a.method + '　' + a.code));
        card.appendChild(el('div', 'acct-no', a.account));
        if (a.url) {
          const link = el('a', 'btn primary', '開啟轉帳連結');
          link.href = a.url;
          link.target = '_blank';
          link.rel = 'noopener';
          card.appendChild(link);
        }
        wrap.appendChild(card);
      });
    } else {
      $('#fee-account-note').textContent = '⚠️ ' + fees.accountsHiddenNote;
    }

    // 依負責人分組
    const ordered = CAMP.roster.filter((r) => r.ordered);
    const groups = [];
    ordered.forEach((r) => {
      let g = groups.find((x) => x.name === r.group);
      if (!g) groups.push((g = { name: r.group, rows: [] }));
      g.rows.push(r);
    });

    let grand = 0;
    let mismatches = 0;
    const groupsWrap = $('#fee-groups');

    groups.forEach((g) => {
      const subtotal = g.rows.reduce((t, r) => t + r.fee, 0);
      grand += subtotal;

      const card = el('section', 'fee-group');
      const head = el('div', 'fee-group-head');
      head.appendChild(el('h3', 'fee-group-name', '負責人　' + g.name));
      head.appendChild(el('span', 'fee-group-sum', money(subtotal)));
      card.appendChild(head);

      const table = el('table', 'fee-table');
      const thead = el('thead');
      const htr = el('tr');
      ['營位', '訂購人', '人數與年齡', '費用'].forEach((t, i) => {
        htr.appendChild(el('th', i === 3 ? 'num' : null, t));
      });
      thead.appendChild(htr);
      table.appendChild(thead);

      const tb = el('tbody');
      g.rows.forEach((r) => {
        const tr = el('tr');
        tr.dataset.search = (r.site + ' ' + r.contact).toLowerCase();

        const td1 = el('td');
        td1.appendChild(el('span', 'site-badge', r.site));
        tr.appendChild(td1);
        tr.appendChild(el('td', null, r.contact));
        tr.appendChild(el('td', 'party', partyLabel(r)));

        const tdFee = el('td', 'num fee-cell');
        tdFee.appendChild(el('span', 'fee-amt', money(r.fee)));
        const calc = computeFee(r);
        if (calc != null && calc !== r.fee) {
          mismatches++;
          tr.classList.add('fee-bad');
          tdFee.appendChild(el('span', 'fee-warn', '規則算出 ' + money(calc)));
        }
        tr.appendChild(tdFee);
        tb.appendChild(tr);
      });
      table.appendChild(tb);
      card.appendChild(table);

      groupsWrap.appendChild(card);
    });

    const notOrdered = CAMP.roster.filter((r) => !r.ordered);
    const grandBox = $('#fee-grand');
    grandBox.appendChild(el('span', 'grand-k', '總計'));
    grandBox.appendChild(el('span', 'grand-v', money(grand)));
    grandBox.appendChild(el('span', 'grand-x',
      ordered.length + ' 個營位訂餐，' + notOrdered.length + ' 個未訂購'
      + (mismatches ? '　·　⚠️ ' + mismatches + ' 筆金額與收費標準對不上' : '　·　金額全數與收費標準相符')));

    const feeSearch = $('#fee-search');
    const feeEmpty = $('#fee-empty');
    feeSearch.addEventListener('input', () => {
      const q = feeSearch.value.trim().toLowerCase();
      let shown = 0;
      groupsWrap.querySelectorAll('.fee-group').forEach((card) => {
        let inCard = 0;
        card.querySelectorAll('tbody tr').forEach((tr) => {
          const hit = !q || tr.dataset.search.includes(q);
          tr.hidden = !hit;
          if (hit) inCard++;
        });
        card.hidden = inCard === 0;
        shown += inCard;
      });
      feeEmpty.hidden = shown > 0;
    });
  }

  /* ---------- 營位分佈圖 ---------- */
  if (CAMP.map && CAMP.map.show) {
    $('#map').hidden = false;
    const img = $('#map-img');
    img.src = CAMP.map.src;
    img.alt = CAMP.map.alt;
    $('#map-caption').textContent = CAMP.map.caption;

    if (CAMP.map.stale) {
      const s = $('#map-stale');
      s.textContent = '⚠️ ' + CAMP.map.stale;
      s.hidden = false;
    }

    const fac = $('#facilities');
    (CAMP.facilities || []).forEach((f) => fac.appendChild(el('li', null, f)));

    const box = $('#lightbox');
    const boxImg = $('#lightbox-img');
    $('#map-open').addEventListener('click', () => {
      boxImg.src = CAMP.map.src;
      boxImg.alt = CAMP.map.alt;
      box.showModal();
    });
    $('#lightbox-close').addEventListener('click', () => box.close());
    box.addEventListener('click', (e) => { if (e.target === box || e.target === boxImg) box.close(); });
  }

  /* ---------- 營位表 ---------- */
  if (CAMP.showRoster && CAMP.roster.length) {
    $('#roster').hidden = false;
    $('#roster-note').textContent = CAMP.rosterNote;

    const sum = (key) => CAMP.roster.reduce((t, r) => t + (r[key] || 0), 0);
    const unknown = unconfirmed.length;

    const summary = $('#roster-summary');
    const chips = [
      ['營位', CAMP.roster.length + ' 個'],
      ['大人', sum('adults') + ' 人'],
      ['小孩', sum('kids') + ' 人'],
      ['訂自助餐', CAMP.roster.filter((r) => r.ordered).length + ' 戶'],
    ];
    chips.forEach(([k, v]) => {
      const c = el('span', 'chip');
      c.appendChild(document.createTextNode(k + ' '));
      c.appendChild(el('b', null, v));
      summary.appendChild(c);
    });
    if (unknown) {
      summary.appendChild(el('span', 'chip', '另有 ' + unknown + ' 個營位未填人數'));
    }

    const tbody = $('#roster-body');
    CAMP.roster.forEach((r, idx) => {
      const tr = el('tr', r.host ? 'is-host' : null);
      tr.dataset.idx = idx;
      const tdSite = el('td');
      tdSite.appendChild(el('span', 'site-badge', r.site));
      tr.appendChild(tdSite);
      tr.appendChild(el('td', 'type-' + r.type, r.type === 'cabin' ? '小木屋' : '帳篷'));

      const tdContact = el('td');
      tdContact.appendChild(document.createTextNode(r.contact));
      if (r.note) {
        tdContact.appendChild(document.createElement('br'));
        tdContact.appendChild(el('span', 'row-note', r.note));
      }
      tr.appendChild(tdContact);

      ['adults', 'kids'].forEach((k) => {
        tr.appendChild(el('td', 'num', r[k] == null ? '—' : String(r[k])));
      });
      tr.appendChild(el('td', r.group ? null : 'muted-cell', r.group || '未訂餐'));

      tr.dataset.search = (r.site + ' ' + r.contact).toLowerCase();
      tbody.appendChild(tr);
    });

    // 合計列：只加總「畫面上看得到」的列，所以搜尋 C 就會得到 C 區小計
    const totalLabel = $('#roster-total-label');
    const totalCells = { adults: $('#total-adults'), kids: $('#total-kids') };

    function refreshTotals() {
      const rows = [...tbody.querySelectorAll('tr')].filter((tr) => !tr.hidden);
      let gaps = 0;
      let paying = 0;
      const t = { adults: 0, kids: 0 };
      rows.forEach((tr) => {
        const r = CAMP.roster[Number(tr.dataset.idx)];
        t.adults += r.adults || 0;
        t.kids += r.kids || 0;
        if (r.ordered) paying++;
        if (isUnconfirmed(r)) gaps++;
      });
      Object.keys(totalCells).forEach((k) => { totalCells[k].textContent = t[k]; });
      $('#total-group').textContent = paying + ' 戶訂餐';
      const all = rows.length === CAMP.roster.length;
      totalLabel.textContent = '合計　' + (all ? '' : '（篩選後）') + rows.length + ' 個營位'
        + (gaps ? '　·　其中 ' + gaps + ' 個未填人數' : '');
      return rows.length;
    }

    /* 排序：點標題 → 升冪 → 降冪 → 回復原順序 */
    const collator = new Intl.Collator('zh-Hant', { numeric: true, sensitivity: 'base' });
    const NUMERIC = new Set(['adults', 'kids', 'babies']);
    const TYPE_ORDER = { tent: 0, cabin: 1 };
    let sortKey = null;
    let sortDir = 1;

    function compare(key, dir, ra, rb) {
      const a = CAMP.roster[ra.dataset.idx];
      const b = CAMP.roster[rb.dataset.idx];
      const tie = collator.compare(a.site, b.site);
      if (NUMERIC.has(key)) {
        // 未填的一律沉底，不隨升降冪翻上來
        if (a[key] == null && b[key] == null) return tie;
        if (a[key] == null) return 1;
        if (b[key] == null) return -1;
        return (a[key] - b[key]) * dir || tie;
      }
      if (key === 'type') return (TYPE_ORDER[a.type] - TYPE_ORDER[b.type]) * dir || tie;
      // 依營位排序時，帳篷區 A1→E6 先，小木屋殿後（跟看地圖的順序一致）
      if (key === 'site') return ((TYPE_ORDER[a.type] - TYPE_ORDER[b.type]) || tie) * dir;
      return collator.compare(a[key], b[key]) * dir || tie;
    }

    function applySort() {
      const rows = [...tbody.querySelectorAll('tr')];
      rows.sort(sortKey
        ? (ra, rb) => compare(sortKey, sortDir, ra, rb)
        : (ra, rb) => ra.dataset.idx - rb.dataset.idx);
      const frag = document.createDocumentFragment();
      rows.forEach((r) => frag.appendChild(r));
      tbody.appendChild(frag);

      document.querySelectorAll('table.roster thead th').forEach((th) => {
        const on = th.dataset.key === sortKey;
        th.setAttribute('aria-sort', on ? (sortDir === 1 ? 'ascending' : 'descending') : 'none');
      });
    }

    document.querySelectorAll('table.roster thead th').forEach((th) => {
      th.querySelector('.th-btn').addEventListener('click', () => {
        const key = th.dataset.key;
        if (sortKey !== key) { sortKey = key; sortDir = 1; }
        else if (sortDir === 1) { sortDir = -1; }
        else { sortKey = null; sortDir = 1; }
        applySort();
      });
    });

    const search = $('#roster-search');
    const empty = $('#roster-empty');
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      tbody.querySelectorAll('tr').forEach((tr) => {
        tr.hidden = !!q && !tr.dataset.search.includes(q);
      });
      empty.hidden = refreshTotals() > 0;
    });
    refreshTotals();
  }

  /* ---------- 打包清單（勾選存在 localStorage） ---------- */
  const KEY = 'boo-camp-packing';
  let checked = {};
  try { checked = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { checked = {}; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(checked)); } catch (e) { /* 無痕模式忽略 */ } };

  const packing = $('#packing-list');
  CAMP.packing.forEach((group, gi) => {
    const card = el('div', 'pack-card');
    card.appendChild(el('div', 'pack-cat', group.cat));
    group.items.forEach((item, ii) => {
      const id = gi + '-' + ii;
      const label = el('label');
      const box = el('input');
      box.type = 'checkbox';
      box.checked = !!checked[id];
      box.addEventListener('change', () => {
        if (box.checked) checked[id] = 1; else delete checked[id];
        save();
      });
      label.appendChild(box);
      label.appendChild(el('span', null, item));
      card.appendChild(label);
    });
    packing.appendChild(card);
  });

  $('#packing-reset').addEventListener('click', () => {
    checked = {};
    save();
    packing.querySelectorAll('input[type="checkbox"]').forEach((b) => { b.checked = false; });
  });

  /* ---------- FAQ ---------- */
  const faq = $('#faq-list');
  CAMP.faq.forEach((f) => {
    const d = el('details');
    d.appendChild(el('summary', null, f.q));
    d.appendChild(el('p', 'faq-a', f.a));
    faq.appendChild(d);
  });

  /* ---------- 手機選單 ---------- */
  const toggle = $('.nav-toggle');
  const links = $('#nav-links');
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

})();
