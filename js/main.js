/* ============================================================
   Kishore Gupta Portfolio — main.js
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
  var activeFilters = { domain: "all", role: "all" };
  var cards = document.querySelectorAll(".project-card");
  var emptyMsg = document.getElementById("filterEmpty");

  function applyFilters() {
    var visible = 0;
    cards.forEach(function (card) {
      var okDomain = activeFilters.domain === "all" || card.dataset.domain === activeFilters.domain;
      var okRole = activeFilters.role === "all" || card.dataset.role === activeFilters.role;
      var show = okDomain && okRole;
      card.style.display = show ? "" : "none";
      if (show) visible++;
    });
    if (emptyMsg) emptyMsg.hidden = visible !== 0;
  }

  document.querySelectorAll(".filter").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var type = btn.dataset.filterType;
      activeFilters[type] = btn.dataset.value;
      document.querySelectorAll('.filter[data-filter-type="' + type + '"]').forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      applyFilters();
    });
  });

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
        else { setStatus("Couldn't send — please email me directly.", false); }
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

  /* ---------------- DYNAMIC YEAR ---------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
