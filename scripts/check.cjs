const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const copy = require('../js/translations.js');
const {PROJECTS,renderProjectCardHTML,getProjectCounts}=require('../js/projects.js');
const {renderMarkdown}=require('./lib/markdown.cjs');
const keys=(value,prefix='')=>Object.entries(value).flatMap(([k,v])=>typeof v==='object'?keys(v,prefix+k+'.'):[prefix+k]);
assert.deepEqual(keys(copy.id).sort(),keys(copy.en).sort());
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert(html.includes('class="hero__title">ZELYFF'));
assert(html.includes('class="status-card"'));
assert.equal((html.match(/class="status-card__dot"/g)||[]).length,3);
assert(html.includes('family=Space+Grotesk:'));
assert(!/Instrument\+Serif|world\.svg|zelyff\.example/.test(html));
assert.deepEqual([...html.matchAll(/<section[^>]*id="([^"]+)"/g)].map(m=>m[1]),['about','experience','work','learning','contact']);
assert.equal((html.match(/class="card project-card"/g)||[]).length,PROJECTS.filter(p=>p.featured).length);
const counts=getProjectCounts();
for(const match of html.matchAll(/data-project-count="([^"]+)"[^>]*>(\d+)/g))assert.equal(+match[2],counts[match[1]],'stale count: '+match[1]);
const generated=JSON.parse(fs.readFileSync(path.join(root,'scripts/generated-pages.json'),'utf8'));
const sources=['index.html',...generated];
const idCache=new Map();
function ids(file){
 if(!idCache.has(file)){
  const source=fs.readFileSync(file,'utf8');
  const list=[...source.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(list).size,list.length,'duplicate IDs in '+file);
  idCache.set(file,new Set(list));
 }
 return idCache.get(file);
}
let references=0;
for(const name of sources){
 const file=path.join(root,name),source=fs.readFileSync(file,'utf8');ids(file);
 assert.equal((source.match(/<h1\b/g)||[]).length,1,'one H1 per page: '+name);
 for(const match of source.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const ref=match[1];if(/^https:\/\//.test(ref)||ref==='#')continue;
  assert(!/^[a-z]+:/i.test(ref),'unexpected URL scheme: '+ref);
  const [url,hash]=ref.split('#');let target=url?path.resolve(path.dirname(file),url):file;
  if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');
  assert(fs.existsSync(target),name+' -> '+ref);
  if(hash)assert(ids(target).has(hash),'missing anchor: '+name+' -> '+ref);
  references++;
 }
 for(const match of source.matchAll(/<([a-z0-9]+)\b[^>]*data-i18n="([^"]+)"[^>]*>([\s\S]*?)<\/\1>/g)){
  assert(match[3].replace(/<[^>]*>/g,'').trim(),'empty default copy: '+name+' '+match[2]);
  assert.equal(typeof match[2].split('.').reduce((o,k)=>o&&o[k],copy.id),'string','unknown copy key: '+match[2]);
 }
}
const hostile={...PROJECTS[0],title:'<img src=x onerror=alert(1)>',description:{id:'<script>bad()</script>',en:'<script>bad()</script>'},tags:['<b>tag</b>']};
const rendered=renderProjectCardHTML(hostile,'id',0);
assert(!rendered.includes('<img src=x'));assert(!rendered.includes('<script>'));assert(rendered.includes('&lt;script&gt;'));assert(!rendered.includes('<b>tag</b>'));
const markdown=renderMarkdown('## Same\n\n## Same\n\n<script>bad()</script>\n\n[unsafe](javascript:alert)\n\n[guide](../guide/)\n\n| Command | Purpose |\n| --- | --- |\n| `test` | **Text** |\n\n```yml\nvalue: <text>\n```');
assert.deepEqual(markdown.toc.map(x=>x.id),['same','same-2']);
assert(!markdown.html.includes('<script>'));assert(!markdown.html.includes('href="javascript:'));
assert(markdown.html.includes('<table>')&&markdown.html.includes('href="../guide/"')&&markdown.html.includes('value: &lt;text&gt;'));
const context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'js/doc-search-data.js'),'utf8'),context);
const search=context.window.DOC_SEARCH_INDEX;
assert.equal(search.length,PROJECTS.reduce((n,p)=>n+(p.docs?.pages.length||0)*2,0));
for(const entry of search)assert(fs.existsSync(path.join(root,entry.url,'index.html')),'search points to missing page');
console.log(`PASS: ${PROJECTS.length} data-driven projects; ${sources.length} HTML pages; ${references} local references; counts, ID/EN, Markdown safety and search index.`);
