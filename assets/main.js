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
    const a = el('a', 'btn ghost', '📍 營區地圖');
    a.href = CAMP.campMapUrl;
    a.target = '_blank';
    a.rel = 'noopener';
    cta.appendChild(a);
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
    const card = el('div', 'day-card');
    const head = el('div', 'day-head');
    head.appendChild(el('span', 'day-name', d.day));
    head.appendChild(el('span', 'day-date', d.date));
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

  /* ---------- 營位分佈圖 ---------- */
  if (CAMP.map && CAMP.map.show) {
    $('#map').hidden = false;
    const img = $('#map-img');
    img.src = CAMP.map.src;
    img.alt = CAMP.map.alt;
    $('#map-caption').textContent = CAMP.map.caption;

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

    const num = (v) => (v == null ? 0 : v);
    const sum = (key) => CAMP.roster.reduce((t, r) => t + num(r[key]), 0);
    const unknown = CAMP.roster.filter((r) => r.adults == null || r.kids == null).length;

    const summary = $('#roster-summary');
    const chips = [
      ['營位', CAMP.roster.length + ' 個'],
      ['大人', sum('adults') + ' 人'],
      ['小孩', sum('kids') + ' 人'],
      ['嫩嬰', sum('babies') + ' 人'],
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
    CAMP.roster.forEach((r) => {
      const tr = el('tr', r.host ? 'is-host' : null);
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

      ['adults', 'kids', 'babies'].forEach((k) => {
        tr.appendChild(el('td', 'num', r[k] == null ? '—' : String(r[k])));
      });

      tr.dataset.search = (r.site + ' ' + r.contact).toLowerCase();
      tbody.appendChild(tr);
    });

    const search = $('#roster-search');
    const empty = $('#roster-empty');
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      let shown = 0;
      tbody.querySelectorAll('tr').forEach((tr) => {
        const hit = !q || tr.dataset.search.includes(q);
        tr.hidden = !hit;
        if (hit) shown++;
      });
      empty.hidden = shown > 0;
    });
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

  /* ---------- 背景飄浮小圖 ---------- */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const icons = ['🎃', '👻', '🦇', '🕸️', '🍬', '🕷️', '💀'];
    const floaters = document.querySelector('.floaters');
    for (let i = 0; i < 14; i++) {
      const s = el('span', null, icons[i % icons.length]);
      s.style.left = (i * 7 + 3) + '%';
      s.style.animationDuration = (18 + (i % 5) * 6) + 's';
      s.style.animationDelay = '-' + i * 3 + 's';
      floaters.appendChild(s);
    }
  }
})();
