/* Small, escaped Markdown subset for public documentation. Raw HTML is text. */
const { projectEscape: escape } = require('../../js/projects.js');
function inline(value) {
  const token=/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^\s)]+\))/g;
  return value.split(token).map(part=>{
    if(part.startsWith('`')&&part.endsWith('`'))return '<code>'+escape(part.slice(1,-1))+'</code>';
    if(part.startsWith('**')&&part.endsWith('**'))return '<strong>'+escape(part.slice(2,-2))+'</strong>';
    const link=part.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
    if(link){
      const href=link[2];
      if(!/^(https:\/\/|#[a-z0-9-]+$|\.{0,2}\/)/i.test(href)||href.startsWith('//')||/["'<>\\]/.test(href))return escape(link[1]);
      return '<a href="'+escape(href)+'">'+escape(link[1])+'</a>';
    }
    return escape(part);
  }).join('');
}
function renderMarkdown(source) {
  const lines=source.replace(/\r/g,'').split('\n'), toc=[], output=[], used=new Map();
  let paragraph=[], list=[], listType=null, code=null, language='';
  const flushParagraph=()=>{if(paragraph.length)output.push('<p>'+inline(paragraph.join(' '))+'</p>');paragraph=[];};
  const flushList=()=>{if(list.length)output.push('<'+listType+'>'+list.map(x=>'<li>'+inline(x)+'</li>').join('')+'</'+listType+'>');list=[];listType=null;};
  for(let i=0;i<lines.length;i++){
    const line=lines[i];
    if(/^```/.test(line)){
      flushParagraph();flushList();
      if(code){output.push('<pre><code'+(language?' data-language="'+escape(language)+'"':'')+'>'+escape(code.join('\n'))+'</code></pre>');code=null;}
      else {code=[];language=line.slice(3).trim();}
      continue;
    }
    if(code){code.push(line);continue;}
    if(line.includes('|')&&/^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[i+1]||'')){
      flushParagraph();flushList();
      const cells=row=>row.trim().replace(/^\||\|$/g,'').split('|').map(x=>x.trim());
      const head=cells(line), rows=[];i+=2;
      while(i<lines.length&&lines[i].includes('|')&&lines[i].trim()){rows.push(cells(lines[i]));i++;}i--;
      output.push('<div class="docs-table"><table><thead><tr>'+head.map(x=>'<th scope="col">'+inline(x)+'</th>').join('')+'</tr></thead><tbody>'+rows.map(row=>'<tr>'+head.map((_,col)=>'<td>'+inline(row[col]||'')+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>');
      continue;
    }
    const heading=line.match(/^(#{2,3})\s+(.+)$/);
    const item=line.match(/^([-*]|\d+\.)\s+(.+)$/);
    if(heading){
      flushParagraph();flushList();
      const base=heading[2].toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'section';
      const count=(used.get(base)||0)+1;used.set(base,count);const id=base+(count>1?'-'+count:'');
      const level=heading[1].length;toc.push({id,title:heading[2],level});
      output.push('<h'+level+' id="'+id+'">'+inline(heading[2])+'<a class="heading-anchor" href="#'+id+'" aria-label="'+escape(heading[2])+'">#</a></h'+level+'>');
    }else if(item){
      flushParagraph();const type=/\d/.test(item[1])?'ol':'ul';if(listType && listType!==type)flushList();listType=type;list.push(item[2]);
    }else if(!line.trim()){flushParagraph();flushList();}
    else {flushList();paragraph.push(line.trim());}
  }
  if(code)throw new Error('Unclosed code fence');
  flushParagraph();flushList();
  return {html:output.join('\n'),toc,text:source.replace(/[#*`]/g,'').replace(/\s+/g,' ').trim()};
}
module.exports={renderMarkdown};
