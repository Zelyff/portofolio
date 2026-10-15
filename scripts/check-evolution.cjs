/* Integration check: content can grow without editing renderers or page layouts. */
const fs=require('node:fs');
const path=require('node:path');
const os=require('node:os');
const assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const fixture=fs.mkdtempSync(path.join(os.tmpdir(),'zelyff-catalog-'));
try{
  fs.cpSync(root,fixture,{recursive:true,filter:src=>!['.git','dist','node_modules'].includes(path.basename(src))});
  const file=path.join(fixture,'content/projects.json');
  const data=JSON.parse(fs.readFileSync(file,'utf8'));
  const oldTotal=data.projects.length, oldFeatured=data.projects.filter(p=>p.featured).length;
  data.kinds.push({id:'web-tools',label:{id:'Web',en:'Web'}});
  const project={slug:'future-project',title:'Future Project',kind:'web-tools',category:'Web Tool',status:'development',private:false,ecosystem:'Community',featured:false,tags:['HTML'],description:{id:'Ringkasan baru.',en:'New summary.'},detail:{id:'Konteks baru.',en:'New context.'},presentation:{type:'flow',label:{id:'ALUR',en:'FLOW'},steps:{id:['Mulai','Selesai'],en:['Start','Finish']}},docs:{pages:[{slug:'overview',title:{id:'Ikhtisar',en:'Overview'}}]}};
  data.projects.push(project);
  const docs=path.join(fixture,'content/docs/future-project');fs.mkdirSync(docs,{recursive:true});
  for(const lang of ['id','en'])fs.writeFileSync(path.join(docs,'overview.'+lang+'.md'),'## Future guide\n\nNew project content.\n');
  const sync=()=>{fs.writeFileSync(file,JSON.stringify(data));execFileSync(process.execPath,['scripts/sync-content.cjs'],{cwd:fixture,stdio:'pipe'});execFileSync(process.execPath,['scripts/check.cjs'],{cwd:fixture,stdio:'pipe'});};
  const read=name=>fs.readFileSync(path.join(fixture,name),'utf8');
  const cards=html=>(html.match(/class="card project-card"/g)||[]).length;
  sync();
  assert.equal(cards(read('index.html')),oldFeatured);
  assert.equal(cards(read('projects/index.html')),oldTotal+1);
  assert(read('projects/index.html').includes('data-project-filter="web-tools"'));
  assert(read('docs/future-project/index.html').includes('Future guide'));
  project.featured=true;sync();
  assert.equal(cards(read('index.html')),oldFeatured+1);
  assert(read('index.html').includes('project-future-project'));
  const removed=data.projects.shift();data.projects.pop();sync();
  assert(!fs.existsSync(path.join(fixture,'docs/future-project/index.html')));
  assert(!fs.existsSync(path.join(fixture,'docs/en/future-project/index.html')));
  assert(!read('projects/index.html').includes('Future Project'));
  assert(!read('index.html').includes('project-'+removed.slug+'"'));
  assert(!fs.existsSync(path.join(fixture,'docs',removed.slug,'index.html')));
  console.log('PASS: add project + new category + docs; opt into featured; remove projects and clean both language routes without renderer edits.');
}finally{fs.rmSync(fixture,{recursive:true,force:true});}
