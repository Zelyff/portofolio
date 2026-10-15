/* Search enhances static documents; all navigation works without JavaScript. */
(function () {
  "use strict";
  var language = document.documentElement.lang === "en" ? "en" : "id";
  var en = language === "en";
  var prefix = document.body.getAttribute("data-site-root") || "";
  var input = document.querySelector("#doc-query");
  var results = document.querySelector("#doc-search-results");
  var status = document.querySelector("[data-search-status]");
  document.querySelectorAll(".locale-link").forEach(function (link) {
    link.addEventListener("click", function () {
      try { window.localStorage.setItem("zelyff:lang", link.textContent.trim().toLowerCase()); } catch (_) {}
    });
  });
  function normalize(value) { return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, ""); }
  if (input && results && Array.isArray(window.DOC_SEARCH_INDEX)) {
    var entries = window.DOC_SEARCH_INDEX.filter(function (entry) { return entry.lang === language; });
    document.querySelector("[data-doc-search]").hidden = false;
    var timer;
    function search() {
      results.replaceChildren();
      var query = normalize(input.value.trim());
      if (!query) { results.hidden = true; status.textContent = ""; return; }
      var words = query.split(/\s+/);
      var matches = entries.map(function (entry) {
        var title = normalize(entry.project + " " + entry.title), full = title + " " + normalize(entry.text);
        return { entry: entry, score: words.every(function (word) { return full.includes(word); }) ? words.reduce(function (sum, word) { return sum + (title.includes(word) ? 5 : 1); }, 0) : 0 };
      }).filter(function (match) { return match.score; }).sort(function (a, b) { return b.score - a.score; }).slice(0, 8);
      matches.forEach(function (match) {
        var item = document.createElement("li"), link = document.createElement("a"), project = document.createElement("span"), title = document.createElement("strong");
        link.href = prefix + match.entry.url;
        project.textContent = match.entry.project;
        title.textContent = match.entry.title;
        link.append(project, title); item.append(link); results.append(item);
      });
      results.hidden = !matches.length;
      status.textContent = matches.length ? matches.length + (en ? " results" : " hasil") : (en ? "No results. Try another topic." : "Belum ada hasil. Coba topik lain.");
    }
    input.addEventListener("input", function () { clearTimeout(timer); timer = setTimeout(search, 120); });
    input.addEventListener("keydown", function (event) {
      if (event.key === "Escape") { clearTimeout(timer); input.value = ""; search(); }
      if (event.key === "ArrowDown" && !results.hidden) { var first = results.querySelector("a"); if (first) { event.preventDefault(); first.focus(); } }
      if (event.key === "Enter") { clearTimeout(timer); search(); }
    });
  }
  var sidebar = document.querySelector("[data-doc-sidebar]");
  if (sidebar && window.matchMedia) {
    var desktop = window.matchMedia("(min-width: 1000px)");
    function resize(event) {
      sidebar.open = event.matches;
      var toc = document.querySelector(".docs-toc");
      if (toc) toc.open = event.matches;
    }
    resize(desktop);
    if (desktop.addEventListener) desktop.addEventListener("change", resize);
    sidebar.addEventListener("keydown", function (event) { if (event.key === "Escape" && !desktop.matches) { sidebar.open = false; sidebar.querySelector("summary").focus(); } });
  }
})();
