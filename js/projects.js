/* Shared presentation functions. Content lives in content/projects.json. */
var PROJECT_REGISTRY = typeof module !== "undefined" && module.exports ? require("../content/projects.json") : window.PORTFOLIO_DATA;
var PROJECTS = PROJECT_REGISTRY ? PROJECT_REGISTRY.projects : [];
var PROJECT_KINDS = PROJECT_REGISTRY ? PROJECT_REGISTRY.kinds : [];
function projectEscape(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, function(c) {
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
  });
}
function projectText(value, lang) { return typeof value === "string" ? value : value && (value[lang] || value.id) || ""; }
function projectDocsURL(project, lang, root) {
  return (root || "") + "docs/" + (lang === "en" ? "en/" : "") + encodeURIComponent(project.slug) + "/";
}
function getProjectCounts(projects) {
  var data = projects || PROJECTS;
  var counts = {all:data.length,internal:data.filter(function(p) { return p.private && p.ecosystem === "AlamNusa"; }).length};
  PROJECT_KINDS.forEach(function(k) { counts[k.id] = data.filter(function(p) { return p.kind === k.id; }).length; });
  return counts;
}
function renderProjectFiltersHTML(lang, projects) {
  var counts = getProjectCounts(projects);
  return [{id:"all",label:{id:"Semua",en:"All"}}].concat(PROJECT_KINDS).filter(function(k) { return k.id === "all" || counts[k.id]; }).map(function(k) {
    return '<button type="button" data-project-filter="' + projectEscape(k.id) + '" aria-pressed="' + (k.id === "all") + '"><span>' + projectEscape(projectText(k.label,lang)) + '</span><span data-filter-count="' + projectEscape(k.id) + '">' + counts[k.id] + '</span></button>';
  }).join("");
}
function renderProjectPreview(project, lang, status) {
  var visual = project.presentation;
  if (!visual) return "";
  var body = "", type = visual.type;
  if (type === "flow") {
    var steps = visual.steps[lang] || visual.steps.id;
    body = '<ol class="cooking-flow">' + steps.map(function(step,i) {
      return '<li><span class="cooking-flow__step" aria-hidden="true">' + String(i+1).padStart(2,"0") + '</span><span>' + projectEscape(step) + '</span><span class="flow-step-mark" aria-hidden="true">' + (i === steps.length-1 ? '✓' : '↓') + '</span></li>';
    }).join("") + '</ol><span class="preview-caption">' + projectEscape(project.title + " / " + project.ecosystem) + '</span>';
  } else if (type === "wordmark") {
    body = '<div class="gogo-wordmark" aria-hidden="true">' + visual.lines.map(function(line,i) { return i ? '<span>' + projectEscape(line) + '<span class="gogo-wordmark__dot">.</span></span>' : projectEscape(line); }).join("") + '</div><div class="gogo-status"><span class="summary-status" aria-hidden="true"></span>' + projectEscape(status) + '</div>';
  } else return "";
  return '<div class="project-preview project-preview--' + type + '"><div class="preview-heading"><span>' + projectEscape(projectText(visual.label,lang)) + '</span><span aria-hidden="true">' + (type === "flow" ? '↳' : '✳') + '</span></div>' + body + '</div>';
}
function renderProjectCardHTML(project, lang, index, root) {
  var en = lang === "en";
  var statuses = {active:en?"Up & running":"Aktif berjalan",complete:en?"Completed":"Selesai",development:en?"In development":"Dikembangkan",archived:en?"Archived":"Arsip"};
  var status = statuses[project.status] || statuses.development;
  var access = project.private ? (en?"Private · ":"Privat · ") + project.ecosystem : (en?"Community tool":"Alat komunitas");
  var icon = project.kind === "bots" ? '<path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="M8 10h8m-8 3h5"/>' : '<path d="m8 6-5 6 5 6m8-12 5 6-5 6m-3-14-2 20"/>';
  var preview = renderProjectPreview(project,lang,status);
  var docs = project.docs && project.docs.pages.length ? '<a class="project-doc-link" href="' + projectEscape(projectDocsURL(project,lang,root)) + '"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 4h6a3 3 0 0 1 3 3v14a4 4 0 0 0-3-2H4Zm16 0h-4a3 3 0 0 0-3 3v14a4 4 0 0 1 3-2h6V4Z"/></svg><span>' + (en?'Read documentation':'Baca dokumentasi') + '</span><span aria-hidden="true">↗</span></a>' : "";
  return '<article class="card project-card" id="project-' + projectEscape(project.slug) + '" data-project="' + projectEscape(project.slug) + '" data-project-kind="' + projectEscape(project.kind) + '" data-layout="' + (preview?'wide':'standard') + '"><div class="project-card__body"><div class="project-card__top"><span class="project-card__symbol" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' + icon + '</svg></span><span class="project-card__number font-mono" aria-hidden="true">' + String(index+1).padStart(2,"0") + '</span></div><span class="project-card__type">' + projectEscape(project.category) + '</span><h3 class="project-card__title">' + projectEscape(project.title) + '</h3><p class="project-card__desc">' + projectEscape(projectText(project.description,lang)) + '</p><div class="tag-list">' + project.tags.map(function(tag) { return '<span class="badge">' + projectEscape(tag) + '</span>'; }).join("") + '</div><div class="project-card__status"><span class="project-state' + (project.status==="active"?' project-state--active':'') + '">' + projectEscape(status) + '</span><span>' + projectEscape(access) + '</span></div><details class="project-story"><summary>' + (en?'About this project':'Tentang proyek') + '<span aria-hidden="true">+</span></summary><p>' + projectEscape(projectText(project.detail,lang)) + '</p></details>' + docs + '</div>' + preview + '</article>';
}
function renderConsoleProjectsHTML(lang, root) {
  return PROJECTS.map(function(p) {
    return '<li><a href="' + projectEscape(projectDocsURL(p,lang,root)) + '"><span class="console-file-dot" aria-hidden="true"></span><span>' + projectEscape(p.title) + '</span><span class="console-file-state">↗</span></a></li>';
  }).join("");
}
function renderWorkspaceHTML(lang, root) {
  return PROJECTS.filter(function(p) { return p.private && p.ecosystem==="AlamNusa"; }).map(function(p) {
    return '<li><a href="' + projectEscape(projectDocsURL(p,lang,root)) + '"><span class="workspace-file" aria-hidden="true">' + projectEscape(p.title.charAt(0)) + '</span>' + projectEscape(p.title) + '<span aria-hidden="true">↗</span></a></li>';
  }).join("");
}
if (typeof module !== "undefined") module.exports = {PROJECTS,PROJECT_KINDS,projectEscape,projectText,projectDocsURL,getProjectCounts,renderProjectCardHTML,renderConsoleProjectsHTML,renderWorkspaceHTML,renderProjectFiltersHTML};
