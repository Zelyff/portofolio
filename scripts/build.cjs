/* Optional static build. Nothing from content/ or scripts/ is published. */
const fs=require('node:fs');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
for(const script of ['sync-content.cjs','check.cjs'])execFileSync(process.execPath,[path.join(__dirname,script)],{cwd:root,stdio:'inherit'});
const dist=path.join(root,'dist');
fs.rmSync(dist,{recursive:true,force:true});fs.mkdirSync(dist,{recursive:true});
for(const name of ['css','js','assets'])fs.cpSync(path.join(root,name),path.join(dist,name),{recursive:true});
const pages=['index.html',...JSON.parse(fs.readFileSync(path.join(__dirname,'generated-pages.json'),'utf8'))];
for(const name of pages){const target=path.join(dist,name);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(path.join(root,name),target);}
console.log(`Static output ready: ${pages.length} HTML pages in dist/.`);
