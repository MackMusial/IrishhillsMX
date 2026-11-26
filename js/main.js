/* IrishHillsMX — page behaviour.
   Content comes from js/site-data.js; owners shouldn't need to edit this file. */
(function () {
  'use strict';

  var data = window.SITE_DATA || {};
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  if (!reduceMotion) root.classList.add('motion');

  /* ---------- helpers ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function phTag() { return el('span', 'ph-tag', 'Placeholder'); }

  // Fill a node with text, marking it as a placeholder when flagged.
  function fill(node, text, isPlaceholder, href) {
    if (!node) return;
    node.textContent = '';
    var target = node;
    if (href && !isPlaceholder) {
      target = el('a');
      target.href = href;
      node.appendChild(target);
    }
    if (isPlaceholder) {
      // Keep the tag on the same line as the last word so it never wraps alone.
      var words = String(text).split(' ');
      var last = words.pop();
      var wrap = el('span', 'ph', words.length ? words.join(' ') + ' ' : '');
      var end = el('span', 'ph-end', last + ' ');
      end.appendChild(phTag());
      wrap.appendChild(end);
      target.appendChild(wrap);
    } else {
      target.textContent = text;
    }
  }

  // "2027-05-15" -> local Date at midnight (avoids the UTC off-by-one).
  function parseDate(iso) {
    var p = String(iso).split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }
  function fmt(d, opts) { return d.toLocaleDateString('en-US', opts); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function ymd(d) { return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()); }
  // Local calendar date as YYYY-MM-DD (toISOString would shift it to UTC).
  function isoDate(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }

  var today = new Date();
  today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  /* ---------- rides ---------- */
  var rides = (data.rides || [])
    .filter(function (r) { return r && /^\d{4}-\d{2}-\d{2}$/.test(r.date); })
    .map(function (r) {
      var d = parseDate(r.date);
      return { date: d, note: r.note || '', past: d < today, isToday: +d === +today };
    })
    .sort(function (a, b) { return a.date - b.date; });

  var next = rides.filter(function (r) { return !r.past; })[0] || null;
  var seasonYear = next ? next.date.getFullYear()
    : (rides.length ? rides[rides.length - 1].date.getFullYear() : today.getFullYear());
  var season = rides.filter(function (r) { return r.date.getFullYear() === seasonYear; });
  var earlier = rides.filter(function (r) { return r.date.getFullYear() < seasonYear; });
  var placeholderDates = !!data.ridesArePlaceholder;
  var hours = data.rideHours || {};

  function icsHref(r) {
    var end = new Date(r.date); end.setDate(end.getDate() + 1);
    var L = data.location || {};
    var loc = (L.address && L.address.text && !L.address.placeholder) ? L.address.text : (L.region || 'Irish Hills, Michigan');
    var ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//IrishHillsMX//Ride Days//EN',
      'BEGIN:VEVENT',
      'UID:ride-' + ymd(r.date) + '@irishhillsmx',
      'DTSTAMP:' + ymd(today) + 'T000000Z',
      'DTSTART;VALUE=DATE:' + ymd(r.date),
      'DTEND;VALUE=DATE:' + ymd(end),
      'SUMMARY:IrishHillsMX ride day',
      'LOCATION:' + loc.replace(/,/g, '\\,'),
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
    return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);
  }

  // Hero: next ride block
  (function renderNextRide() {
    var box = $('[data-next-ride]');
    if (!box) return;
    box.textContent = '';
    box.appendChild(el('h2', 'next-ride-label', next && next.isToday ? 'Ride day today' : 'Next ride day'));
    if (!next) {
      box.appendChild(el('p', 'next-ride-date next-ride-date--tba', 'Dates coming soon'));
      return;
    }
    var p = el('p', 'next-ride-date');
    var t = el('time');
    t.dateTime = isoDate(next.date);
    t.textContent = fmt(next.date, { weekday: 'short', month: 'short', day: 'numeric' });
    p.appendChild(t);
    box.appendChild(p);

    var idx = season.indexOf(next) + 1;
    var meta = el('p', 'next-ride-meta');
    // Only count "ride n of N" once the season's dates are confirmed.
    meta.textContent = placeholderDates
      ? seasonYear + ' season · tentative'
      : 'Ride ' + idx + ' of ' + season.length + ' · ' + seasonYear + ' season';
    if (placeholderDates) { meta.appendChild(document.createTextNode(' ')); meta.appendChild(phTag()); }
    box.appendChild(meta);

    var heroFees = [];
    (data.fees || []).forEach(function (g) {
      (g.items || []).forEach(function (f) { if (f.inHero) heroFees.push(f); });
    });
    if (heroFees.length) {
      var dl = el('dl', 'next-ride-prices');
      heroFees.forEach(function (f) {
        var row = el('div');
        row.appendChild(el('dt', null, f.heroLabel || f.label));
        row.appendChild(el('dd', null, f.price));
        dl.appendChild(row);
      });
      box.appendChild(dl);
    }
  })();

  // Hero: the five-date run along the bottom of the poster
  (function renderDateRun() {
    var wrap = $('[data-date-run]');
    var list = $('[data-date-run-list]');
    if (!wrap || !list || !season.length) return;
    $('[data-date-run-title]').textContent = seasonYear + ' ride days';
    season.forEach(function (r) {
      var li = el('li', 'run-date' + (r === next ? ' is-next' : '') + (r.past ? ' is-past' : ''));
      var a = el('a');
      a.href = '#ride-' + ymd(r.date);
      var label = fmt(r.date, { weekday: 'long', month: 'long', day: 'numeric' }) +
        (r === next ? ' (next ride)' : r.past ? ' (past)' : '');
      a.setAttribute('aria-label', label);
      a.appendChild(el('span', 'run-month', fmt(r.date, { month: 'short' })));
      a.appendChild(el('span', 'run-day', String(r.date.getDate())));
      if (r === next) {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'run-circle');
        svg.setAttribute('viewBox', '0 0 120 100');
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('preserveAspectRatio', 'none');
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M66 8C34 6 9 22 8 48c-1 27 25 44 57 43 31-1 49-19 48-43C112 22 92 7 58 9 44 10 31 15 22 22');
        path.setAttribute('pathLength', '1');
        svg.appendChild(path);
        a.appendChild(svg);
      }
      li.appendChild(a);
      list.appendChild(li);
    });
    wrap.hidden = false;
  })();

  // Calendar section
  (function renderCalendar() {
    var list = $('[data-ride-list]');
    if (!list) return;
    var title = $('[data-rides-title]');
    if (title && season.length) title.textContent = seasonYear + ' ride dates';

    var hoursEl = $('[data-ride-hours]');
    fill(hoursEl, hours.text || '', !!hours.placeholder);
    fill($('[data-hours-detail]'), hours.text || '', !!hours.placeholder);

    if (placeholderDates) $('[data-sample-banner]').hidden = false;
    if (!next) $('[data-rides-empty]').hidden = false;

    season.forEach(function (r, i) {
      var state = r === next ? 'is-next' : r.past ? 'is-past' : 'is-upcoming';
      var li = el('li', 'ride ' + state);
      li.id = 'ride-' + ymd(r.date);
      li.setAttribute('data-reveal', '');

      li.appendChild(el('span', 'ride-num', String(i + 1)));

      var when = el('div', 'ride-when');
      var t = el('time', 'ride-date');
      t.dateTime = isoDate(r.date);
      t.textContent = fmt(r.date, { month: 'long', day: 'numeric' });
      when.appendChild(el('span', 'ride-weekday', fmt(r.date, { weekday: 'long' })));
      when.appendChild(t);
      li.appendChild(when);

      var meta = el('div', 'ride-meta');
      // Plain upcoming rides need no tag: the next ride is highlighted and past ones are crossed out.
      var statusText = r.isToday ? 'Today' : r === next ? 'Next ride' : r.past ? 'Past' : '';
      if (statusText) meta.appendChild(el('span', 'ride-status', statusText));
      if (r.note) meta.appendChild(el('span', 'ride-note', r.note));
      li.appendChild(meta);

      if (!r.past) {
        var cal = el('a', 'ride-cal');
        cal.href = icsHref(r);
        cal.download = 'irishhillsmx-ride-' + ymd(r.date) + '.ics';
        cal.innerHTML = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="1.5"/><path d="M4 10h16M9 3v4M15 3v4M12 13v5M9.5 15.5h5"/></svg>';
        cal.appendChild(document.createTextNode('Add to calendar'));
        var vh = el('span', 'visually-hidden', ' for ' + fmt(r.date, { month: 'long', day: 'numeric' }));
        cal.appendChild(vh);
        li.appendChild(cal);
      } else {
        li.appendChild(el('span', 'ride-cal ride-cal--done', 'Done'));
      }
      list.appendChild(li);
    });

    if (earlier.length) {
      var det = $('[data-past-seasons]');
      var pl = $('[data-past-list]');
      earlier.slice().reverse().forEach(function (r) {
        var li = el('li');
        var t = el('time', null, fmt(r.date, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }));
        t.dateTime = isoDate(r.date);
        li.appendChild(t);
        pl.appendChild(li);
      });
      det.hidden = false;
    }
  })();

  // Rider fees
  (function renderFees() {
    var sheet = $('[data-fee-sheet]');
    if (sheet) {
      sheet.textContent = '';
      (data.fees || []).forEach(function (g) {
        var col = el('div', 'price');
        col.appendChild(el('h3', 'price-label', g.group));
        var dl = el('dl', 'fee-list');
        (g.items || []).forEach(function (f) {
          var row = el('div', 'fee');
          row.appendChild(el('dt', 'fee-label', f.label));
          var dd = el('dd', 'fee-value');
          dd.appendChild(el('span', 'price-amount', f.price));
          var per = el('span', 'fee-per');
          fill(per, f.per || '', !!f.placeholder);
          if (f.per || f.placeholder) dd.appendChild(per);
          row.appendChild(dd);
          dl.appendChild(row);
        });
        col.appendChild(dl);
        sheet.appendChild(col);
      });
    }
    var notes = $('[data-price-notes]');
    (data.feeNotes || []).forEach(function (n) {
      var li = el('li');
      fill(li, n.text, !!n.placeholder);
      notes.appendChild(li);
    });
  })();

  // Location + contact
  (function renderContact() {
    var loc = data.location || {};
    var c = data.contact || {};
    if (loc.region) $all('[data-region]').forEach(function (n) { n.textContent = loc.region; });
    var addr = loc.address || {};
    fill($('[data-address]'), addr.text || '', !!addr.placeholder);
    fill($('[data-contact-address]'), addr.placeholder ? (loc.region || '') : addr.text, false);

    var q = loc.mapsQuery || loc.region || 'Irish Hills, Michigan';
    var url = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
    $all('[data-directions]').forEach(function (a) { a.href = url; });
    if (!loc.mapsQueryIsExact) $('[data-directions-note]').hidden = false;

    // Each contact row hides itself when its text is left empty in site-data.js.
    function contactRow(key, item, autoLink) {
      item = item || {};
      var row = $('[data-contact-row="' + key + '"]');
      if (!item.text) { if (row) row.hidden = true; return; }
      if (row) row.hidden = false;
      fill($('[data-contact="' + key + '"]'), item.text, !!item.placeholder, item.link || autoLink(item.text));
    }
    contactRow('group', c.facebookGroup, function () { return null; });
    contactRow('facebook', c.facebook, function () { return null; });
    contactRow('phone', c.phone, function (t) { return 'tel:' + String(t).replace(/[^\d+]/g, ''); });
    contactRow('email', c.email, function (t) { return 'mailto:' + t; });
    var group = c.facebookGroup || {};
    $all('[data-group-link]').forEach(function (a) {
      if (group.link) a.href = group.link; else a.hidden = true;
    });
  })();

  var yr = $('[data-year]');
  if (yr) yr.textContent = String(new Date().getFullYear());

  /* ---------- mobile menu ---------- */
  (function menu() {
    var btn = $('.menu-toggle');
    var nav = $('#nav-list');
    if (!btn || !nav) return;
    function setOpen(open) {
      btn.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    }
    btn.addEventListener('click', function () {
      setOpen(btn.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        btn.focus();
      }
    });
  })();

  /* ---------- the print: hero ink pulls into registration ---------- */
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { root.classList.add('is-printed'); });
  });

  /* ---------- section reveals ---------- */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var targets = $all('[data-reveal]');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(function (t) {
      // Anything already on screen at load stays put; only below-the-fold content reveals.
      var r = t.getBoundingClientRect();
      if (r.top < window.innerHeight) { t.classList.add('is-in'); return; }
      t.classList.add('will-reveal');
      io.observe(t);
    });
  }

  /* ---------- date band: show where a jump lands ---------- */
  (function jumpFeedback() {
    var band = $('[data-date-run-list]');
    var list = $('[data-ride-list]');
    if (!band || !list || reduceMotion) return;
    band.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      var row = a && document.getElementById(a.hash.slice(1));
      if (!row) return;
      // Print the whole list at once so its entrance doesn't compete with the landing.
      list.classList.add('is-jumping');
      $all('.ride.will-reveal', list).forEach(function (r) {
        r.classList.add('is-in');
        if (io) io.unobserve(r);
      });
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { list.classList.remove('is-jumping'); });
      });
      // Flash the row once the smooth scroll has actually arrived.
      $all('.ride.is-landed', list).forEach(function (r) { r.classList.remove('is-landed'); });
      var done = false;
      function land() {
        if (done) return;
        done = true;
        window.removeEventListener('scrollend', land);
        void row.offsetWidth; // restart the animation on repeat clicks
        row.classList.add('is-landed');
      }
      window.addEventListener('scrollend', land);
      setTimeout(land, 1000);
    });
  })();
})();
