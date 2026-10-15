/* Optional content sync. The site itself stays plain, ready-to-host HTML. */
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const copy = require(path.join(root, "js/translations.js")).id;
const { PROJECTS, renderProjectCardHTML, renderConsoleProjectsHTML, renderWorkspaceHTML, renderProjectFiltersHTML, getProjectCounts } = require(path.join(root, "js/projects.js"));
const { generatePages } = require("./lib/pages.cjs");
const get = key => key.split(".").reduce((obj, part) => obj && obj[part], copy);
const escape = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const base = new URL(process.env.PORTFOLIO_SITE_URL || "https://zelyff.github.io/portofolio/");
if (base.protocol !== "https:") throw new Error("Production metadata requires an HTTPS URL");
const site = base.href.replace(/\/?$/, "/");
let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
html = html.replace(/<!--\s*TODO \(deploy\):[\s\S]*?-->/, "");
html = html.replace(/(<([a-z][a-z0-9]*)\b[^>]*\bdata-i18n="([^"]+)"[^>]*>)[\s\S]*?(<\/\2>)/g, (_, start, tag, key, end) => {
  const value = get(key);
  if (typeof value !== "string") throw new Error("Missing default translation: " + key);
  return start + escape(value) + end;
});
html = html.replace(/<[^>]+\bdata-i18n-attr="([^"]+)"[^>]*>/g, (tag, spec) => {
  const [attr, key] = spec.split(":");
  if (!["aria-label", "title", "alt"].includes(attr)) throw new Error("Unsupported translated attribute");
  const value = get(key);
  if (typeof value !== "string") throw new Error("Missing attribute translation: " + key);
  const pattern = new RegExp('\\b' + attr + '="[^"]*"');
  return pattern.test(tag) ? tag.replace(pattern, attr + '="' + escape(value) + '"') : tag.replace(/>$/, ' ' + attr + '="' + escape(value) + '">');
});
html = html.replace(/<!-- PROJECTS:START -->[\s\S]*?<!-- PROJECTS:END -->/, '<!-- PROJECTS:START -->' + PROJECTS.filter(p=>p.featured).map((project, index) => renderProjectCardHTML(project, "id", index)).join("\n") + '<!-- PROJECTS:END -->');
html = html.replace(/<!-- CONSOLE-PROJECTS:START -->[\s\S]*?<!-- CONSOLE-PROJECTS:END -->/, '<!-- CONSOLE-PROJECTS:START -->' + renderConsoleProjectsHTML("id") + '<!-- CONSOLE-PROJECTS:END -->');
html = html.replace(/<!-- WORKSPACE:START -->[\s\S]*?<!-- WORKSPACE:END -->/, '<!-- WORKSPACE:START -->' + renderWorkspaceHTML("id") + '<!-- WORKSPACE:END -->');
html = html.replace(/<!-- FILTERS:START -->[\s\S]*?<!-- FILTERS:END -->/, '<!-- FILTERS:START -->' + renderProjectFiltersHTML("id",PROJECTS.filter(p=>p.featured)) + '<!-- FILTERS:END -->');
const counts = getProjectCounts();
html = html.replace(/(<(?:span|strong)\b[^>]*data-project-count="([a-z0-9-]+)"[^>]*>)[^<]*(<\/(?:span|strong)>)/g,(_,start,key,end)=>start+String(counts[key] || 0).padStart(2,"0")+end);
html = html.replace(/(<link rel="canonical" href=")[^"]+/, "$1" + site)
  .replace(/(<meta property="og:url" content=")[^"]+/, "$1" + site)
  .replace(/(<meta property="og:image" content=")[^"]+/, "$1" + site + "assets/og-image.png")
  .replace(/(<meta name="twitter:image" content=")[^"]+/, "$1" + site + "assets/og-image.png");
html = html.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/, (_, start, json, end) => {
  const data = JSON.parse(json); data.url = site;
  return start + "\n" + JSON.stringify(data, null, 2) + "\n  " + end;
});
fs.writeFileSync(path.join(root, "index.html"), html.replace(/[ \t]+$/gm, ""));
const registry=JSON.parse(fs.readFileSync(path.join(root,"content/projects.json"),"utf8"));
fs.writeFileSync(path.join(root,"js/project-data.js"),'/* Generated from content/projects.json. */\nwindow.PORTFOLIO_DATA = '+JSON.stringify(registry).replace(/</g,'\\u003c')+';\n');
const pages=generatePages(site);
console.log(`Synced ${PROJECTS.length} projects, generated ${pages} pages and public documentation search.`);
