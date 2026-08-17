/* ============================================================
   Kishore Gupta Portfolio - main.js
   Vanilla, no dependencies (EmailJS loaded separately).
   ============================================================ */
(function () {
  "use strict";
  var root = document.documentElement;
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- THEME TOGGLE ---------------- */
  var themeToggle = document.getElementById("themeToggle");
  function systemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function currentTheme() {
    return root.getAttribute("data-theme") || systemTheme();
  }
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ---------------- MOBILE MENU ---------------- */
  var menuToggle = document.getElementById("menuToggle");
  var mobileMenu = document.getElementById("mobileMenu");
  var overlay = document.getElementById("menuOverlay");
  function openMenu() {
    mobileMenu.classList.add("active");
    overlay.classList.add("active");
    menuToggle.classList.add("active");
    document.body.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
    mobileMenu.setAttribute("aria-hidden", "false");
  }
  function closeMenu() {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    menuToggle.classList.remove("active");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
  }
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.contains("active") ? closeMenu() : openMenu();
    });
    overlay.addEventListener("click", closeMenu);
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileMenu.classList.contains("active")) closeMenu();
    });
  }

  /* ---------------- HEADER SCROLL STATE ---------------- */
  var header = document.getElementById("siteHeader");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 20) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------------- SCROLL REVEAL ---------------- */
  var reveals = document.querySelectorAll(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    /* Stagger siblings so grids/lists cascade in like Apple product pages.
       Delay is based on position among reveal siblings sharing a parent,
       capped so long lists don't drag. */
    var STEP = 70, CAP = 6;
    var counts = new Map();
    reveals.forEach(function (el) {
      var parent = el.parentNode;
      var idx = counts.get(parent) || 0;
      counts.set(parent, idx + 1);
      if (idx > 0) {
        el.style.setProperty("--reveal-delay", Math.min(idx, CAP) * STEP + "ms");
      }
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- ACTIVE NAV LINK ---------------- */
  var navLinks = document.querySelectorAll(".nav-links a");
  var sections = Array.prototype.map.call(navLinks, function (a) {
    return document.querySelector(a.getAttribute("href"));
  });
  if ("IntersectionObserver" in window) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navLinks.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { if (s) navIO.observe(s); });
  }

  /* ---------------- PROJECT IMPACT TOGGLES ---------------- */
  document.querySelectorAll(".impact-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var panel = btn.nextElementSibling;
      var open = panel.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.firstChild.textContent = open ? "Hide impact " : "View impact ";
    });
  });

  /* ---------------- PROJECT FILTERS ---------------- */
  var activeDomain = "all";
  var cards = document.querySelectorAll(".project-card");
  var emptyMsg = document.getElementById("filterEmpty");

  function applyFilters() {
    var visible = 0;
    cards.forEach(function (card) {
      var show = activeDomain === "all" || card.dataset.domain === activeDomain;
      card.style.display = show ? "" : "none";
      if (show) visible++;
    });
    if (emptyMsg) emptyMsg.hidden = visible !== 0;
  }

  document.querySelectorAll('.filter[data-filter-type="domain"]').forEach(function (btn) {
    btn.addEventListener("click", function () {
      activeDomain = btn.dataset.value;
      document.querySelectorAll('.filter[data-filter-type="domain"]').forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      applyFilters();
    });
  });

  /* ---------------- PROJECT CARD SPOTLIGHT ---------------- */
  if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".project-card").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  /* ---------------- TIMELINE DRAW-IN ---------------- */
  var timeline = document.querySelector(".htimeline");
  if (timeline) {
    if (prefersReduced || !("IntersectionObserver" in window)) {
      timeline.classList.add("drawn");
    } else {
      var tlIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { timeline.classList.add("drawn"); tlIO.unobserve(timeline); }
        });
      }, { threshold: 0.15 });
      tlIO.observe(timeline);
    }
  }

  /* ---------------- TIMELINE TOOLTIP (custom, card-styled) ---------------- */
  var htlItems = document.querySelectorAll(".htl-item");
  if (htlItems.length) {
    var tip = document.createElement("div");
    tip.className = "tl-tooltip";
    tip.setAttribute("aria-hidden", "true");
    tip.innerHTML =
      '<span class="tl-tip-company"><span class="tl-tip-dot"></span><span class="tl-tip-company-name"></span></span>' +
      '<span class="tl-tip-role"></span><span class="tl-tip-date"></span><span class="tl-tip-caret"></span>';
    document.body.appendChild(tip);
    var tipName = tip.querySelector(".tl-tip-company-name");
    var tipRole = tip.querySelector(".tl-tip-role");
    var tipDate = tip.querySelector(".tl-tip-date");
    var tipCaret = tip.querySelector(".tl-tip-caret");
    var activeItem = null;

    function positionTip(item) {
      var node = item.querySelector(".htl-node") || item;
      var r = node.getBoundingClientRect();
      var tr = tip.getBoundingClientRect();
      var left = r.left + r.width / 2 - tr.width / 2;
      left = Math.max(8, Math.min(left, window.innerWidth - tr.width - 8));
      var top = r.top - tr.height - 12;
      tip.style.left = left + "px";
      tip.style.top = top + "px";
      var caretX = r.left + r.width / 2 - left;
      tipCaret.style.left = Math.max(14, Math.min(caretX, tr.width - 14)) + "px";
    }
    function showTip(item) {
      activeItem = item;
      tipName.textContent = item.dataset.company || "";
      var roleEl = item.querySelector(".htl-role");
      var yearEl = item.querySelector(".htl-year");
      tipRole.textContent = roleEl ? roleEl.textContent : "";
      tipDate.textContent = yearEl ? yearEl.textContent : "";
      tip.style.setProperty("--tip-accent", getComputedStyle(item).getPropertyValue("--card-accent").trim());
      positionTip(item);
      tip.classList.add("show");
    }
    function hideTip() { activeItem = null; tip.classList.remove("show"); }

    htlItems.forEach(function (item) {
      item.addEventListener("mouseenter", function () { showTip(item); });
      item.addEventListener("mouseleave", hideTip);
      item.addEventListener("focus", function () { showTip(item); });
      item.addEventListener("blur", hideTip);
    });
    if (timeline) timeline.addEventListener("scroll", function () { if (activeItem) positionTip(activeItem); }, { passive: true });
    window.addEventListener("scroll", function () { if (activeItem) hideTip(); }, { passive: true });
  }

  /* ---------------- EMAIL / PHONE REVEAL (obfuscated) ---------------- */
  /* Stored base64 so raw values aren't in page source as plain text. */
  var DATA = {
    email: atob("a2lzaG9yZWd1cHRhb2ZmaWNpYWxAZ21haWwuY29t"),
    phone: atob("KzkxIDk5Nzk5ODA5OTM=")
  };
  var revealed = { email: false, phone: false };

  function wireReveal(btnId, textId, key) {
    var btn = document.getElementById(btnId);
    var text = document.getElementById(textId);
    if (!btn || !text) return;
    btn.addEventListener("click", function () {
      if (!revealed[key]) {
        text.textContent = DATA[key];
        revealed[key] = true;
        btn.setAttribute("aria-label", "Copy " + key);
      } else {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(DATA[key]).then(function () {
            var prev = text.textContent;
            text.textContent = "Copied ✓";
            setTimeout(function () { text.textContent = prev; }, 1400);
          });
        }
      }
    });
  }
  wireReveal("emailReveal", "emailText", "email");
  wireReveal("phoneReveal", "phoneText", "phone");

  /* Mailto fallback for contact form */
  var mailto = document.getElementById("mailtoFallback");
  if (mailto) {
    mailto.addEventListener("click", function (e) {
      e.preventDefault();
      var name = (document.getElementById("cf-name").value || "").trim();
      var body = (document.getElementById("cf-msg").value || "").trim();
      var subject = encodeURIComponent("Portfolio contact" + (name ? " from " + name : ""));
      window.location.href = "mailto:" + DATA.email + "?subject=" + subject + "&body=" + encodeURIComponent(body);
    });
  }

  /* ---------------- CONTACT FORM (EmailJS + graceful fallback) ---------------- */
  var form = document.getElementById("contactForm");
  var statusEl = document.getElementById("cf-status");
  var loader = document.getElementById("cf-loader");
  var btnText = document.getElementById("cf-btn-text");
  var submitBtn = document.getElementById("cf-submit");

  if (typeof emailjs !== "undefined") {
    try { emailjs.init("epE6ueg3lV0KVg7ju"); } catch (e) {}
  }

  function setStatus(msg, ok) {
    statusEl.textContent = msg;
    statusEl.style.color = ok ? "var(--accent)" : "#e5484d";
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      loader.hidden = false;
      btnText.style.opacity = "0.6";
      submitBtn.disabled = true;
      setStatus("", true);

      var done = function (ok) {
        loader.hidden = true;
        btnText.style.opacity = "1";
        submitBtn.disabled = false;
        if (ok) { setStatus("✔ Message sent successfully", true); form.reset(); }
        else { setStatus("Couldn't send - please email me directly.", false); }
      };

      if (typeof emailjs !== "undefined" && emailjs.sendForm) {
        emailjs.sendForm("service_85maghr", "template_poq5olc", form)
          .then(function () { done(true); })
          .catch(function () { done(false); });
      } else {
        done(false);
      }
    });
  }

  /* ---------------- METRIC COUNT-UP ---------------- */
  var nums = document.querySelectorAll(".metric-num");
  function runCount(el) {
    var target = parseFloat(el.dataset.count) || 0;
    var suffix = el.dataset.suffix || "";
    if (prefersReduced) { el.textContent = target + suffix; return; }
    var dur = 1300, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (nums.length) {
    if (!("IntersectionObserver" in window)) {
      nums.forEach(runCount);
    } else {
      var countIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { runCount(entry.target); countIO.unobserve(entry.target); }
        });
      }, { threshold: 0.6 });
      nums.forEach(function (n) { countIO.observe(n); });
    }
  }

  /* ---------------- SCROLL PROGRESS + BACK-TO-TOP ---------------- */
  var bar = document.getElementById("scrollBar");
  var fab = document.getElementById("toTopFab");
  var ticking = false;
  function onScrollUI() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    if (bar) bar.style.width = pct + "%";
    if (fab) {
      var show = h.scrollTop > 620;
      fab.hidden = false;
      fab.classList.toggle("show", show);
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { requestAnimationFrame(onScrollUI); ticking = true; }
  }, { passive: true });
  onScrollUI();
  if (fab) {
    fab.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
  }

  /* ---------------- MAGNETIC BUTTONS (desktop, pointer) ---------------- */
  if (!prefersReduced && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll("[data-magnetic]").forEach(function (el) {
      var strength = 0.28;
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - (r.left + r.width / 2)) * strength;
        var y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = "translate(" + x + "px," + y + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  /* ---------------- DYNAMIC YEAR ---------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
