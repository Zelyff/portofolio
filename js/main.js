/* =========================================================
   ZELYFF — main.js
   Progressive enhancement layer. The site's core content is
   present in the HTML; JS enhances navigation, language,
   motion, and project rendering. Nothing critical should be
   invisible if a script fails to load.
   ========================================================= */

(function () {
  "use strict";

  var LANG_KEY = "zelyff:lang";
  var DEFAULT_LANG = "id";
  var activeProjectFilter = "all";

  /* ---------- Safe storage (falls back to in-memory) ---------- */
  var memoryStore = {};
  function storageGet(key) {
    try {
      var v = window.localStorage.getItem(key);
      return v === null ? memoryStore[key] : v;
    } catch (e) {
      return memoryStore[key];
    }
  }
  function storageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      memoryStore[key] = value;
    }
  }

  /* ---------- i18n ---------- */
  function resolvePath(obj, path) {
    return path.split(".").reduce(function (acc, part) {
      return acc && acc[part] !== undefined ? acc[part] : undefined;
    }, obj);
  }

  function applyTranslations(lang) {
    if (typeof TRANSLATIONS === "undefined") return;
    var dict = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG];

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var value = resolvePath(dict, key);
      if (value !== undefined) {
        el.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      var spec = el.getAttribute("data-i18n-attr"); // format: "attr:key"
      var parts = spec.split(":");
      var attr = parts[0];
      var key = parts[1];
      var value = resolvePath(dict, key);
      if (value !== undefined) {
        el.setAttribute(attr, value);
      }
    });

    document.documentElement.lang = lang;
    var root = document.body.getAttribute("data-site-root") || "";
    document.querySelectorAll("[data-docs-home]").forEach(function (link) { link.setAttribute("href", root + "docs/" + (lang === "en" ? "en/" : "")); });

    document.querySelectorAll(".lang-toggle__option").forEach(function (btn) {
      var isActive = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
    initProjects();
    updateThemeLabel();
    var mobileButton = document.querySelector(".nav__menu-btn");
    if (mobileButton) mobileButton.setAttribute("aria-label", dict.ui[mobileButton.getAttribute("aria-expanded") === "true" ? "menuClose" : "menuOpen"]);
  }

  function initLang() {
    var documentLanguage = document.documentElement.getAttribute("data-document-language");
    if (documentLanguage) { applyTranslations(documentLanguage); return; }
    var saved = storageGet(LANG_KEY);
    var lang = saved === "id" || saved === "en" ? saved : DEFAULT_LANG;
    applyTranslations(lang);

    document.querySelectorAll("[data-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var newLang = btn.getAttribute("data-lang");
        storageSet(LANG_KEY, newLang);
        applyTranslations(newLang);
      });
    });
  }

  /* ---------- Theme: original light palette + matching dark palette ---------- */
  function updateThemeLabel() {
    var button = document.querySelector("[data-theme-toggle]");
    if (!button) return;
    var lang = document.documentElement.lang === "en" ? "en" : "id";
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    var fallback = dark ? "Switch to light mode" : "Switch to dark mode";
    var dict = typeof TRANSLATIONS !== "undefined" ? TRANSLATIONS[lang] : null;
    button.setAttribute("aria-label", dict ? dict.ui[dark ? "themeLight" : "themeDark"] : fallback);
  }

  function initTheme() {
    var button = document.querySelector("[data-theme-toggle]");
    var manual = storageGet("zelyff:theme");
    if (manual !== "light" && manual !== "dark") manual = null;
    var system = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
    function apply(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.style.colorScheme = theme;
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.content = theme === "dark" ? "#0c1015" : "#ffffff";
      updateThemeLabel();
    }
    apply(manual || (system && system.matches ? "dark" : "light"));
    if (button) {
      button.hidden = false;
      button.addEventListener("click", function () {
        manual = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        storageSet("zelyff:theme", manual);
        apply(manual);
      });
    }
    if (system && system.addEventListener) system.addEventListener("change", function (e) {
      if (!manual) apply(e.matches ? "dark" : "light");
    });
  }

  /* ---------- Mobile menu ---------- */
  function setMobileMenuState(menu, btn, isOpen) {
    menu.classList.toggle("is-open", isOpen);
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    var lang = document.documentElement.lang === "en" ? "en" : "id";
    if (typeof TRANSLATIONS !== "undefined") btn.setAttribute("aria-label", TRANSLATIONS[lang].ui[isOpen ? "menuClose" : "menuOpen"]);

    // A closed menu is still in the DOM (for the CSS transition), so its
    // links remain keyboard-focusable unless explicitly removed from the
    // tab order and accessibility tree.
    if (isOpen) {
      menu.removeAttribute("aria-hidden");
      menu.inert = false;
    } else {
      menu.setAttribute("aria-hidden", "true");
      menu.inert = true;
    }
  }

  function initMobileMenu() {
    var btn = document.querySelector(".nav__menu-btn");
    var menu = document.querySelector(".nav__mobile");
    if (!btn || !menu) return;

    setMobileMenuState(menu, btn, false);

    btn.addEventListener("click", function () {
      var isOpen = !menu.classList.contains("is-open");
      setMobileMenuState(menu, btn, isOpen);
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMobileMenuState(menu, btn, false);
      });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.classList.contains("is-open")) {
        setMobileMenuState(menu, btn, false);
        btn.focus();
      }
    });
    document.addEventListener("click", function (event) {
      if (menu.classList.contains("is-open") && !menu.contains(event.target) && !btn.contains(event.target)) setMobileMenuState(menu, btn, false);
    });
    var desktop = window.matchMedia ? window.matchMedia("(min-width: 768px)") : null;
    if (desktop && desktop.addEventListener) desktop.addEventListener("change", function (event) {
      if (!event.matches) return;
      var inside = menu.contains(document.activeElement);
      setMobileMenuState(menu, btn, false);
      if (inside) document.querySelector(".nav__links a").focus();
    });
  }

  /* ---------- Active nav (scroll-spy for the one-page layout) ---------- */
  function initActiveNav() {
    var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__link[href^='#'], .section-rail__link[href^='#']"));
    if (!navLinks.length) return;

    var sections = navLinks
      .map(function (link) {
        var id = link.getAttribute("href").slice(1);
        return document.getElementById(id);
      })
      .filter(Boolean).filter(function (section, index, all) { return all.indexOf(section) === index; });
    if (!sections.length) return;

    function setActive(id) {
      navLinks.forEach(function (link) {
        var isActive = link.getAttribute("href") === "#" + id;
        link.classList.toggle("is-active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    if (!("IntersectionObserver" in window)) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
            var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (!reduced && typeof entry.target.animate === "function") entry.target.animate(
              [{ opacity: 0.7, transform: "translateY(12px)" }, { opacity: 1, transform: "translateY(0)" }],
              { duration: 450, easing: "cubic-bezier(.16,1,.3,1)" }
            );
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Live WIB clock (decorative, not core) ---------- */
  function initClock() {
    var el = document.querySelector("[data-wib-clock]");
    if (!el) return;

    var formatter;
    try {
      formatter = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
      });
    } catch (e) { return; }
    function tick() {
      try {
        el.textContent = formatter.format(new Date()) + " WIB";
      } catch (e) {
        el.textContent = "—";
      }
    }

    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Project rendering ---------- */
  function emptyStateHTML(container) {
    var titleKey = container.getAttribute("data-empty-title") || "work.emptyTitle";
    var descKey = container.getAttribute("data-empty-desc") || "work.emptyDesc";
    return (
      '<div class="empty-state">' +
      // Node-cluster mark: three points being wired together — reads as
      // "in progress / being connected", tied to the systems/server
      // identity rather than a generic inbox glyph.
      '<svg class="empty-state__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">' +
      '<circle cx="5" cy="6" r="2"/>' +
      '<circle cx="19" cy="6" r="2"/>' +
      '<circle cx="12" cy="19" r="2"/>' +
      '<path d="M6.7 7.2L11 17.3M17.3 7.2L13 17.3M7 6h10" stroke-dasharray="2 3"/>' +
      "</svg>" +
      '<div>' +
      '<p class="empty-state__title" data-i18n="' + titleKey + '"></p>' +
      '<p class="empty-state__desc" data-i18n="' + descKey + '"></p>' +
      '<span class="empty-state__meta font-mono" data-i18n="work.emptyMeta"></span>' +
      "</div></div>"
    );
  }

  function initProjects() {
    var containers = document.querySelectorAll("[data-project-grid]");
    if (!containers.length || typeof PROJECTS === "undefined" || typeof renderProjectCardHTML !== "function" || typeof PROJECT_REGISTRY === "undefined" || !PROJECT_REGISTRY) return;
    var data = PROJECTS;
    var lang = document.documentElement.lang || DEFAULT_LANG;
    if (typeof renderConsoleProjectsHTML === "function") {
      var consoleList = document.querySelector("[data-console-projects]");
      if (consoleList) consoleList.innerHTML = '<!-- CONSOLE-PROJECTS:START -->' + renderConsoleProjectsHTML(lang) + '<!-- CONSOLE-PROJECTS:END -->';
    }
    var counts = getProjectCounts(data);
    var workspace = document.querySelector("[data-workspace-projects]");
    if (workspace) workspace.innerHTML = '<!-- WORKSPACE:START -->' + renderWorkspaceHTML(lang) + '<!-- WORKSPACE:END -->';
    document.querySelectorAll("[data-project-count]").forEach(function (el) { el.textContent = String(counts[el.getAttribute("data-project-count")] || 0).padStart(2, "0"); });
    document.querySelectorAll("[data-filter-count]").forEach(function (el) { el.textContent = counts[el.getAttribute("data-filter-count")] || 0; });

    containers.forEach(function (container) {
      if (container.getAttribute("data-rendered") === "true" && container.getAttribute("data-render-lang") === lang) return;
      var list = container.getAttribute("data-project-scope") === "featured" ? data.filter(function (p) { return p.featured; }) : data;
      var projectRoot = container.getAttribute("data-project-root") || "";
      var controls = document.querySelector("[data-project-filters]");
      if (controls) controls.innerHTML = renderProjectFiltersHTML(lang, list);
      var opened = Array.prototype.slice.call(container.querySelectorAll("[data-project]")).filter(function (card) {
        var story = card.querySelector("details");
        return story && story.open;
      }).map(function (card) { return card.getAttribute("data-project"); });

      if (!list.length) {
        container.innerHTML = emptyStateHTML(container);
        if (typeof TRANSLATIONS !== "undefined") container.querySelectorAll("[data-i18n]").forEach(function (el) {
          el.textContent = resolvePath(TRANSLATIONS[lang], el.getAttribute("data-i18n")) || "";
        });
        return;
      }

      container.classList.add("project-grid");
      container.innerHTML = '<!-- PROJECTS:START -->' + list.map(function (project, index) { return renderProjectCardHTML(project, lang, index, projectRoot); }).join("") + '<!-- PROJECTS:END -->';
      container.querySelectorAll("[data-project]").forEach(function (card) {
        if (opened.indexOf(card.getAttribute("data-project")) !== -1) card.querySelector("details").open = true;
      });
      container.setAttribute("data-render-lang", lang);
      container.setAttribute("data-rendered", "true");
    });
    applyProjectFilter(activeProjectFilter, false);
  }

  /* ---------- Console tabs: a small, real interaction in the original window ---------- */
  function initConsole() {
    var controls = document.querySelector("[data-console-controls]");
    var tabs = Array.prototype.slice.call(document.querySelectorAll("[data-console-tab]"));
    if (!controls || tabs.length !== 2) return;
    function select(index, focus) {
      tabs.forEach(function (tab, i) {
        var selected = i === index;
        tab.setAttribute("aria-selected", selected ? "true" : "false");
        tab.tabIndex = selected ? 0 : -1;
        var panel = document.getElementById(tab.getAttribute("aria-controls"));
        if (panel) panel.hidden = !selected;
      });
      if (focus) tabs[index].focus();
    }
    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () { select(index, false); });
      tab.addEventListener("keydown", function (event) {
        var next;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabs.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        select(next, true);
      });
    });
    controls.hidden = false;
    select(0, false);
  }

  function applyProjectFilter(value, announce) {
    activeProjectFilter = value === "all" || (typeof PROJECT_KINDS !== "undefined" && PROJECT_KINDS.some(function (kind) { return kind.id === value; })) ? value : "all";
    var count = 0;
    document.querySelectorAll("[data-project-grid] [data-project-kind]").forEach(function (card) {
      card.hidden = activeProjectFilter !== "all" && card.getAttribute("data-project-kind") !== activeProjectFilter;
      if (!card.hidden) count++;
    });
    document.querySelectorAll("[data-project-filter]").forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-project-filter") === activeProjectFilter ? "true" : "false");
    });
    var feedback = document.querySelector("[data-project-feedback]");
    if (feedback && (announce || feedback.textContent)) feedback.textContent = document.documentElement.lang === "en" ? count + (count === 1 ? " project shown" : " projects shown") : count + " proyek ditampilkan";
  }

  function initProjectFilters() {
    var controls = document.querySelector("[data-project-filters]");
    if (!controls || typeof PROJECT_REGISTRY === "undefined" || !PROJECT_REGISTRY) return;
    controls.hidden = false;
    controls.addEventListener("click", function (event) {
      var button = event.target.closest && event.target.closest("[data-project-filter]");
      if (button && controls.contains(button)) applyProjectFilter(button.getAttribute("data-project-filter"), true);
    });
  }

  function initProjectShortcuts() {
    document.addEventListener("click", function (event) {
      var link = event.target.closest && event.target.closest("a[data-project-link]");
      if (!link) return;
      var hash = link.getAttribute("href");
      if (!hash || hash.indexOf("#project-") !== 0) return;
      var card = document.getElementById(hash.slice(1));
      if (!card) return;
      applyProjectFilter("all", false);
      var story = card.querySelector("details");
      if (story) story.open = true;
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initLang();
    initTheme();
    initMobileMenu();
    initActiveNav();
    initProjects();
    initConsole();
    initProjectFilters();
    initProjectShortcuts();
    initReveal();
    initClock();
    var header = document.querySelector(".nav");
    var progress = document.querySelector("[data-reading-progress]");
    function updateHeader() {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
      if (progress) {
        var height = Math.max(1, (document.documentElement.scrollHeight || 0) - (window.innerHeight || 0));
        var amount = Math.min(1, Math.max(0, (window.scrollY || 0) / height));
        progress.style.transform = "scaleX(" + amount + ")";
      }
    }
    var queued = false;
    window.addEventListener("scroll", function () {
      if (queued) return;
      if (typeof window.requestAnimationFrame !== "function") { updateHeader(); return; }
      queued = true;
      window.requestAnimationFrame(function () { queued = false; updateHeader(); });
    }, { passive: true });
    updateHeader();
    document.documentElement.classList.add("js");
  });
})();
