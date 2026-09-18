// Local QA; uses the already cached Playwright installation, adds no dependencies.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('fs');
const path = require('path');
const http = require('http');
const assert = require('assert/strict');
const trackArchitecture = require('./scripts/render-offbeat-tracks.cjs');
const root = __dirname;
const tracks = trackArchitecture.loadTracks();
const trackSelection = trackArchitecture.selectTracks(tracks);
const renderedTracks = [...trackSelection.primary, ...trackSelection.remaining];
const trackPositions = new Map(tracks.map((track,index)=>[track.id,index+1]));
const indexHtml = fs.readFileSync(path.join(root,'index.html'),'utf8');
assert.equal(trackArchitecture.markerRegion(indexHtml).current,trackArchitecture.expectedBlock());
assert.deepEqual(trackArchitecture.runFixtureTests().map(result=>[result.tracks,result.primary,result.remaining,result.columns,result.details]),[[4,4,0,2,false],[5,5,0,3,false],[8,8,0,3,false],[9,6,3,3,true],[12,6,6,3,true],[20,6,14,3,true]]);
const server = http.createServer((req,res) => {
  const file = path.join(root, decodeURIComponent(req.url.split('?')[0] === '/' ? '/index.html' : req.url.split('?')[0]));
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file)) {res.writeHead(404);res.end();return;}
  const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.mp3':'audio/mpeg'};
  res.setHeader('Content-Type',types[path.extname(file)] || 'application/octet-stream');res.end(fs.readFileSync(file));
});
(async()=>{
 await new Promise(r=>server.listen(8000,'127.0.0.1',r));
 const browser=await chromium.launch({headless:true});
 const results=[];
 try {
  for(const [width,height] of [[1920,1080],[1440,900],[1024,768],[768,1024],[390,844],[320,720]]) {
   const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
   const errors=[];page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
   await page.goto('http://127.0.0.1:8000');
   assert.equal(await page.locator('#project-digital-title').textContent(),'OFFBEAT');
   assert.deepEqual(await page.locator('.release-system h4').allTextContents(),['MUSIC','IDENTITY','VISUAL','CONTENT','RELEASE']);
   assert.equal(await page.locator('.release-social-grid img').count(),9);
   assert.deepEqual(await page.locator('.release-social-grid img').evaluateAll(es=>es.map(e=>e.getAttribute('src').split('/').pop())),["01-offbeat-brand.png","02-release-001.png","03-saved-song.png","04-lyric.png","05-cover-art.png","06-late-night.png","07-sound.png","08-moment.png","09-still-here.png"]);
   assert.equal(await page.locator('.side-project').count(),0);
   assert.equal(await page.locator('.offbeat img').count(),12 + tracks.length);
   assert.equal(/Digital Music Curation|MOOD DROP|AFTER MIDNIGHT|ONE ARTIST|IF YOU LIKE|TOO MUCH MUSIC/i.test(await page.locator('.offbeat').allTextContents().then(es=>es.join(' '))),false);
   assert.deepEqual(await page.locator('.commercial-flow h3').allTextContents(),['PRODUCT','INFORMATION','VISUAL','CAMPAIGN','ADAPTATION']);
   assert.deepEqual(await page.locator('.commercial-features dt').allTextContents(),['MOISTURE','LIGHT TEXTURE','DAILY ROUTINE']);
   assert.equal(await page.locator('.commercial-asset[hidden]').count(),0);
   assert.equal(await page.locator('.commercial img').count(),9);
   const commercialText=(await page.locator('.commercial').allTextContents()).join(' ');
   assert.match(commercialText,/MORU/);
   assert.match(commercialText,/Concept Product Brand/);
   assert.match(commercialText,/CALM BARRIER SERUM/);
   assert.match(commercialText,/WORK EXPERIENCE BASED RECONSTRUCTION/);
   assert.equal((commercialText.match(/VISUAL CASE IN DEVELOPMENT/g)||[]).length,0);
   assert.equal(/MORU L01|Portable Table Light|CORDLESS|USB-C|CASE IN PREPARATION|CONTEXT|RESPOND|IMPROVE|SHARE|CTR|전환율|매출|판매량|할인율/.test(commercialText),false);
   assert.deepEqual(await page.locator('.commercial-asset').evaluateAll(es=>es.map(e=>e.dataset.contentSlot)),['master','hero','detail','desktop','mobile','story','social-01','social-02','social-03']);
   assert.equal(/\d+\s*(?:mAh|lm|kg|시간|원|%)/i.test(commercialText),false);
   assert.deepEqual(await page.locator('.ai-flow h3').allTextContents(),['BRIEF','GENERATE','REVIEW','REFINE','FINAL']);
   assert.deepEqual(await page.locator('.ai-stage').evaluateAll(es=>es.map(e=>e.dataset.contentSlot)),['initial','revision','final']);
   assert.deepEqual(await page.locator('.ai-visual img').evaluateAll(es=>es.map(e=>e.getAttribute('src').split('/').pop())),['01-initial.png','02-revision.png','03-final.png']);
   assert.equal(/CASE IN PROGRESS|placeholder|Content coming/i.test(await page.locator('#project-ai-detail').textContent()),false);
   const ids=await page.locator('.portfolio-section').evaluateAll(s=>s.map(e=>e.id));
   assert.deepEqual(ids,['cover','about','experience','project-digital','project-digital-detail','offbeat-tracks','project-operation','project-operation-detail','project-fashion','project-fashion-detail','project-ai','project-ai-detail','process','toolkit','contact']);
   assert.deepEqual(await page.locator('.portfolio-section').evaluateAll(es=>es.map(e=>e.dataset.label)),['Cover','About','Experience','OFFBEAT','RELEASE 001','OFFBEAT TRACKS','MORU','Commercial Case','NOIR FORM','Fashion Commerce','AI Creative','AI Case','Process','Toolkit','Contact']);
   assert.deepEqual(await page.locator('.portfolio-section > .section-inner > .eyebrow').allTextContents().then(es=>es.map(e=>e.split(' / ')[0])),Array.from({length:15},(_,i)=>String(i+1).padStart(2,'0')));
   assert.deepEqual(await page.locator('[data-noir-slot]').evaluateAll(es=>es.map(e=>e.dataset.noirSlot)),['key-visual','product','silhouette','detail','fabric','commerce-final','campaign-applications','final-visual']);
   assert.deepEqual(await page.locator('.noir-visual img').evaluateAll(es=>es.map(e=>e.getAttribute('src').split('/').pop())),['01-hero.png','02-product.png','03-silhouette.png','04-detail.png','05-fabric.png','16-commerce-page-final.png','17-campaign-applications.png','10-campaign-model.png']);
   for(const img of await page.locator('.noir-visual img').all()){
     const src=await img.getAttribute('src');
     let current=root;
     for(const part of src.split('/')){assert.equal(fs.readdirSync(current).includes(part),true,src);current=path.join(current,part);}
     await img.scrollIntoViewIfNeeded();await img.evaluate(e=>e.decode());
     assert.equal(await img.evaluate(e=>e.naturalWidth>0&&Number(e.getAttribute('width'))===e.naturalWidth&&Number(e.getAttribute('height'))===e.naturalHeight&&Math.abs(e.getBoundingClientRect().width/e.getBoundingClientRect().height-e.naturalWidth/e.naturalHeight)<.02&&getComputedStyle(e).objectFit==='contain'&&!!e.alt),true,src);
   }
   for(const selector of ['.noir-key-visual','.noir-result-copy','.noir-final-visual'])assert.equal(await page.locator(selector).evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length),width>720?2:1);
   const productWidths=await page.locator('.noir-product-grid img').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().width));
   assert.equal(productWidths[1]>productWidths[0],true);
   const detailWidths=await page.locator('.noir-detail-grid img').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().width));
   assert.equal(detailWidths[0]>detailWidths[1],true);
   assert.equal(await page.locator('#project-fashion-detail img').count(),3);
   assert.equal(await page.locator('.noir-detail-hint').isVisible(),width<=390);
   const finalPageWidth=await page.locator('.noir-final-page img').evaluate(e=>e.getBoundingClientRect().width);
   const moruDetailWidth=await page.locator('.commercial-detail img').evaluate(e=>e.getBoundingClientRect().width);
   const closingWidth=await page.locator('.noir-final-visual img').evaluate(e=>e.getBoundingClientRect().width);
   assert.equal(width>1024||width<=720 ? finalPageWidth>moruDetailWidth : finalPageWidth>=moruDetailWidth-2,true);
   assert.equal(finalPageWidth>closingWidth*1.8,true);
   if(width<=720){
     assert.equal(finalPageWidth>=width-4,true);
     const toggle=page.locator('.noir-detail-toggle'),viewport=page.locator('#noir-detail-viewport');
     await toggle.focus();await page.keyboard.press('Enter');
     assert.equal(await toggle.getAttribute('aria-pressed'),'true');
     assert.equal(await viewport.evaluate(e=>e.scrollWidth>=820&&e.scrollWidth>e.clientWidth),true);
     assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
     await viewport.focus();await page.keyboard.press('ArrowRight');await page.waitForTimeout(200);
     assert.equal(await viewport.evaluate(e=>e.scrollLeft>0),true);
     await toggle.click();assert.equal(await toggle.getAttribute('aria-pressed'),'false');
     assert.equal(await viewport.evaluate(e=>e.scrollLeft),0);
     if([390,320].includes(width))await page.locator('.noir-commerce-result').screenshot({path:path.join(process.env.TEMP,`noir-mobile-guidance-${width}.png`),style:'.site-header,.section-nav,.skip-link{visibility:hidden!important}'});
   }
   for(const link of await page.locator('.noir-text-link[target="_blank"]').all())assert.equal(fs.existsSync(path.join(root,await link.getAttribute('href'))),true);
   if(width<=720)assert.equal(await page.locator('.section-nav ol').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length),15);
   assert.deepEqual(await page.locator('.track-card h3').allTextContents(),renderedTracks.map(track=>track.title));
   assert.deepEqual(await page.locator('.track-number').allTextContents(),renderedTracks.map(track=>`${String(trackPositions.get(track.id)).padStart(2,'0')} / SINGLE`));
   assert.deepEqual(await page.locator('.track-meta').allTextContents(),renderedTracks.map(track=>[...track.genre,track.vocal].filter(Boolean).join(' · ')).filter(Boolean));
   assert.deepEqual(await page.locator('.track-character').allTextContents(),renderedTracks.map(track=>track.character.join(' · ')).filter(Boolean));
   assert.equal(await page.locator('.track-card .track-role').count(),0);
   assert.equal(await page.locator('.track-shared-role').count(),1);
   assert.equal(await page.locator('.track-player>p').count(),0);
   assert.equal(Number(await page.locator('.track-archive').getAttribute('data-track-count')),tracks.length);
   assert.equal(Number(await page.locator('.track-archive').getAttribute('data-visible-count')),trackSelection.primary.length);
   assert.equal(await page.locator('.track-grid-primary .track-card').count(),trackSelection.primary.length);
   assert.equal(await page.locator('.track-archive-more').count(),trackSelection.remaining.length?1:0);
   assert.equal(await page.locator('.track-grid-more .track-card').count(),trackSelection.remaining.length);
   assert.equal(await page.locator('.track-grid-primary').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length),width>1024&&tracks.length>=5?3:width>720?2:1);
   if(trackSelection.remaining.length)await page.locator('.track-archive-more').evaluate(e=>e.open=true);
   for(const [i,track] of renderedTracks.entries()){
     const card=page.locator('.track-card').nth(i),img=card.locator('img'),audio=card.locator('audio');
     assert.equal(await img.getAttribute('src'),track.cover);
     assert.equal(await card.locator('source').getAttribute('src'),track.audio);
     assert.equal(fs.existsSync(path.join(root,await img.getAttribute('src'))),true);
     assert.equal(fs.existsSync(path.join(root,await card.locator('source').getAttribute('src'))),true);
     await img.scrollIntoViewIfNeeded();await img.evaluate(e=>e.decode());
     assert.equal(await img.evaluate(e=>Math.abs(e.getBoundingClientRect().width-e.getBoundingClientRect().height)<1&&getComputedStyle(e).filter==='none'),true);
     assert.equal((await img.getAttribute('alt')).includes(track.title),true);
     assert.equal(await audio.getAttribute('preload'),'metadata');
     await page.waitForFunction(i=>document.querySelectorAll('.track-player audio')[i].readyState>=1,i);
     assert.equal(await audio.evaluate(e=>Number.isFinite(e.duration)&&e.duration>0&&!e.error&&e.paused&&!e.autoplay&&!e.loop),true);
     assert.equal(await audio.evaluate(e=>e.getBoundingClientRect().width<=e.parentElement.getBoundingClientRect().width),true);
     await audio.evaluate(async e=>{e.muted=true;await e.play()});
     await page.waitForFunction(i=>document.querySelectorAll('.track-player audio')[i].currentTime>.1,i);
     await audio.evaluate(e=>e.pause());
     assert.equal(await audio.evaluate(e=>e.paused&&!e.error),true);
     assert.equal(await audio.getAttribute('aria-label'),`Listen to ${track.title}`);
     const order=await card.evaluate(e=>['.track-artwork','h3','.track-meta','.track-character','.track-player'].map(s=>e.querySelector(s)).filter(Boolean).map(el=>el.getBoundingClientRect().top));
     assert.equal(order.every((y,j)=>j===0||y>=order[j-1]),true);
   }
   const missingAria=await page.locator('[aria-labelledby],[aria-controls]').evaluateAll(es=>es.flatMap(e=>['aria-labelledby','aria-controls'].flatMap(a=>(e.getAttribute(a)||'').split(/\s+/).filter(Boolean))).filter(id=>!document.getElementById(id)));assert.deepEqual(missingAria,[]);
   assert.equal(await page.locator('.portfolio-section[id*="music"]').count(),0);
   assert.equal(await page.locator('#saved-song').count(),1);
   assert.equal(await page.locator('#saved-song').evaluate(e=>e.closest('.portfolio-section').id),'project-digital-detail');
   assert.equal(await page.locator('.section-nav a[href="#saved-song"]').count(),0);

   assert.equal(await page.locator('audio[autoplay],audio[loop]').count(),0);
   assert.equal(await page.locator('#saved-song img').count(),1);
   assert.equal(await page.locator('#saved-song audio').count(),1);
   assert.equal(await page.locator('#saved-song audio').getAttribute('preload'),'metadata');
   assert.equal(await page.locator('#saved-song audio').evaluate(e=>e.paused && !e.autoplay && !e.loop),true);
   assert.equal(new Set(ids).size,15);
   assert.equal(await page.locator('.section-nav a').count(),15);
   const duplicateIds=await page.locator('[id]').evaluateAll(es=>es.map(e=>e.id).filter((id,i,arr)=>arr.indexOf(id)!==i));assert.deepEqual(duplicateIds,[]);
   const broken=await page.locator('[href],[src]').evaluateAll(es=>es.flatMap(e=>['href','src'].filter(a=>e.hasAttribute(a)).map(a=>e.getAttribute(a))).filter(s=>s.startsWith('#')&&!document.getElementById(s.slice(1))));assert.deepEqual(broken,[]);
   for(const id of ids) {
    await page.locator(`.section-nav a[href="#${id}"]`).click();
    await page.waitForTimeout(70);
    await page.waitForFunction(id=>document.querySelector('.section-nav a[aria-current]')?.hash===`#${id}`,id);
    const issues=await page.locator(`#${id}`).evaluate(section=>{
      const bad=[];
      for(const e of section.querySelectorAll('h1,h2,h3,h4,h5,p,a,dt,dd,li,img,audio')) {
       const r=e.getBoundingClientRect();
       if(!r.width&&!r.height)continue;
       const sectionRect=section.getBoundingClientRect();
       if(r.bottom>sectionRect.bottom+1||r.top<sectionRect.top-1)bad.push('content outside section: '+e.tagName);
       const nav=document.querySelector('.section-nav').getBoundingClientRect();
       if(innerWidth>720&&r.right>nav.left&&r.left<nav.right&&r.bottom>nav.top&&r.top<nav.bottom)bad.push('navigation overlap: '+e.tagName);
       if(r.width && (r.left < -1 || r.right>innerWidth+1)) bad.push(`${e.tagName}: ${e.textContent.slice(0,30)}`);
       if(e.scrollWidth>e.clientWidth+2 && e.clientWidth)bad.push(`internal overflow: ${e.tagName} ${e.textContent.slice(0,30)}`);
      }return bad;
    });assert.deepEqual(issues,[],`${width} #${id}`);
    assert.equal(await page.locator(`#${id}`).evaluate(e=>getComputedStyle(e.querySelector('.reveal')).opacity),'1');
    if([1440,390].includes(width)&&['project-digital','project-digital-detail','offbeat-tracks','project-operation','project-operation-detail','project-ai','project-ai-detail'].includes(id))await page.screenshot({path:`${process.env.TEMP}/portfolio-${width}-${id}.png`});
    if(width<=720){
      await page.locator(`#${id}`).evaluate(section=>{
        const nodes=[...section.querySelectorAll('h1,h2,h3,h4,h5,p,a,dt,dd,li,img,audio')];
        const bottom=Math.max(...nodes.map(e=>e.getBoundingClientRect().bottom));
        const navTop=document.querySelector('.section-nav').getBoundingClientRect().top;
        window.scrollBy(0,Math.max(0,bottom-navTop+16));
      });
      await page.waitForTimeout(70);
      assert.equal(await page.locator(`#${id}`).evaluate(section=>Math.max(...[...section.querySelectorAll('h1,h2,h3,h4,h5,p,a,dt,dd,li,img,audio')].map(e=>e.getBoundingClientRect().bottom))<=document.querySelector('.section-nav').getBoundingClientRect().top),true,`${width} #${id} bottom content accessible`);
    }
   }

   await page.locator('#saved-song').evaluate(e=>e.scrollIntoView());
   await page.locator('#saved-song img').scrollIntoViewIfNeeded();
   await page.waitForFunction(()=>document.querySelector('#saved-song img').complete && document.querySelector('#saved-song img').naturalWidth>0);
   assert.equal(await page.locator('#saved-song img').evaluate(e=>Math.abs(e.getBoundingClientRect().width/e.getBoundingClientRect().height-e.naturalWidth/e.naturalHeight)<.01),true);
   await page.waitForFunction(()=>document.querySelector('#saved-song audio').readyState>=1);
   assert.equal(await page.locator('#saved-song audio').evaluate(e=>Number.isFinite(e.duration)&&e.duration>0&&!e.error),true);
   if(width===390){
     await page.locator('#saved-song audio').evaluate(e=>{e.muted=true});
     await page.locator('#saved-song audio').focus();await page.keyboard.press('Space');
     await page.waitForFunction(()=>document.querySelector('#saved-song audio').currentTime>.1);
     await page.keyboard.press('Space');
     assert.equal(await page.locator('#saved-song audio').evaluate(e=>e.paused&&!e.error),true);
   }
   await page.locator('#saved-song').evaluate(e=>e.scrollIntoView());
   await page.waitForTimeout(100);
   assert.equal(await page.locator('.section-nav a[aria-current]').getAttribute('href'),'#project-digital-detail');
   const sideIssues=await page.locator('#saved-song').evaluate(section=>{
     const errors=[];
     for(const e of section.querySelectorAll('h2,h3,h4,p,a,dt,dd,li,img,audio')){
       const r=e.getBoundingClientRect();
       if(!r.width&&!r.height)continue;
       if(!r.width&&!r.height)continue; // Native audio fallback is not rendered in supporting browsers.
       if(r.left<0||r.right>innerWidth+1||(e.clientWidth&&e.scrollWidth>e.clientWidth+2))errors.push(e.tagName+' overflow');
       if(r.top<section.getBoundingClientRect().top-1||r.bottom>section.getBoundingClientRect().bottom+1)errors.push(e.tagName+' clipped');
       const nav=document.querySelector('.section-nav').getBoundingClientRect();
       if(innerWidth>720&&r.right>nav.left&&r.left<nav.right&&r.bottom>nav.top&&r.top<nav.bottom)errors.push(e.tagName+' nav overlap');
     }return errors;
   });assert.deepEqual(sideIssues,[],width+' saved-song');
   if([1440,390].includes(width))await page.screenshot({path:`${process.env.TEMP}/saved-song-${width}.png`});
   for(const img of await page.locator('.offbeat img').all()){
     await img.scrollIntoViewIfNeeded();
     await page.waitForFunction(src=>{const e=[...document.images].find(e=>e.getAttribute('src')===src);return e.complete&&e.naturalWidth>0},await img.getAttribute('src'));
     assert.equal(await img.evaluate(e=>getComputedStyle(e).objectFit==='contain'),true);
     assert.equal((await img.getAttribute('alt')).length>0,true);
   }
   for(const img of await page.locator('.commercial img,.ai-visual img').all()){
     await img.scrollIntoViewIfNeeded();
     await img.evaluate(e=>e.decode());
     assert.equal(await img.evaluate(e=>e.naturalWidth>0&&Math.abs(e.clientWidth/e.clientHeight-e.naturalWidth/e.naturalHeight)<.02&&getComputedStyle(e).objectFit==='contain'&&!!e.alt),true);
   }
   assert.equal(await page.locator('.ai-comparison').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length),width>1024?2:1);
   assert.equal(await page.locator('.commercial-campaign-pair').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length),width>720?2:1);
   for(const id of ['process','toolkit','contact'])assert.equal(await page.locator('#'+id+' .section-inner').evaluate(e=>getComputedStyle(e).minHeight),'0px');
   const aiWidths=await page.locator('.ai-visual img').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().width));
   assert.equal(aiWidths[2]>aiWidths[0]&&aiWidths[2]>aiWidths[1],true);
   assert.equal(await page.locator('.commercial-social').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length),width>720?3:1);
   assert.equal(await page.locator('.release-social-frame').first().evaluate(e=>Math.abs(e.clientWidth-e.clientHeight)<=1),true);
   assert.equal(await page.locator('.release-social-grid').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length),width>720?3:1);
   if([1440,390].includes(width)){
     await page.locator('.release-social').evaluate(e=>e.scrollIntoView());
     await page.waitForTimeout(100);
     await page.screenshot({path:`${process.env.TEMP}/release-social-${width}.png`});
   }
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   assert.deepEqual(errors,[]);
   await page.locator('a[href="#cover"]').last().click();
   await page.waitForFunction(()=>document.querySelector('.section-nav a[aria-current]')?.hash==='#cover');
   await page.screenshot({path:`${process.env.TEMP}/portfolio-${width}.png`});
   if([1440,390].includes(width)){
     const qaDir=path.join(root,'review-artifacts','noir-form');fs.mkdirSync(qaDir,{recursive:true});
     for(const [name,selector] of [['introduction','.noir-masthead'],['key-visual','.noir-key-visual'],['product','.noir-product-story'],['detail','.noir-detail-story'],['commerce','.noir-commerce-result'],['applications','.noir-applications'],['final','.noir-final-visual']]){
       await page.locator(selector).screenshot({path:path.join(qaDir,`${width}-${name}.png`),style:'.site-header,.section-nav,.skip-link{visibility:hidden!important}'});
     }
   }
   results.push({width,height,sections:15,noirImages:8,overflow:0,errors});
   await page.close();
  }
  const page=await browser.newPage({viewport:{width:390,height:844}});
  await page.goto('http://127.0.0.1:8000');await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(()=>document.activeElement.className),'skip-link');
  await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'cover');
  await page.locator('.section-nav a[href="#project-operation"]').focus();await page.keyboard.press('Enter');
  await page.waitForFunction(()=>location.hash==='#project-operation');
  assert.equal(await page.locator('.section-nav a[href="#project-operation"]').getAttribute('aria-label'),'7. MORU');
  await page.goto('http://127.0.0.1:8000/#project-operation-detail');
  await page.waitForFunction(()=>document.querySelector('#project-operation-detail').classList.contains('is-visible') && getComputedStyle(document.querySelector('#project-operation-detail .reveal')).opacity==='1');
  assert.equal(await page.locator('#project-operation-detail .reveal').first().evaluate(e=>getComputedStyle(e).opacity),'1');
  await page.goto('http://127.0.0.1:8000/#project-fashion-detail');
  await page.waitForFunction(()=>document.querySelector('.section-nav a[aria-current]')?.hash==='#project-fashion-detail');
  assert.equal(await page.locator('.section-nav a[href="#project-fashion-detail"]').getAttribute('aria-label'),'10. Fashion Commerce');
  await page.locator('.noir-commerce-result .noir-text-link').focus();
  assert.equal(await page.evaluate(()=>document.activeElement.className),'noir-text-link');
  await page.goto('http://127.0.0.1:8000/#saved-song');
  assert.equal(await page.locator('#saved-song').isVisible(),true);
  assert.equal(await page.locator('#saved-song').evaluate(e=>getComputedStyle(e).opacity),'1');
  const context=await browser.newContext({javaScriptEnabled:false});const plain=await context.newPage();
  await plain.goto('http://127.0.0.1:8000');assert.equal(await plain.locator('#about .reveal').first().evaluate(e=>getComputedStyle(e).opacity),'1');
  assert.equal(await plain.locator('#saved-song').evaluate(e=>getComputedStyle(e).opacity),'1');
  assert.equal(await plain.locator('.track-card').count(),tracks.length);
  assert.deepEqual(await plain.locator('.track-grid-primary .track-card h3').allTextContents(),trackSelection.primary.map(track=>track.title));
  assert.equal(await plain.locator('.noir-visual img').count(),8);
  assert.equal(await plain.locator('.noir-detail-toggle').isVisible(),false);
  assert.equal(await plain.locator('.noir-output-heading').evaluate(e=>getComputedStyle(e).opacity),'1');

  const cssValidation=await page.evaluate(async()=>{
    function separatePriority(rawValue) {
      let quote='',escaped=false,depth=0,priorityAt=-1;
      for(let i=0;i<rawValue.length;i++) {
        const character=rawValue[i];
        if(escaped){escaped=false;continue}
        if(character==='\\'){escaped=true;continue}
        if(quote){if(character===quote)quote='';continue}
        if(character==='"'||character==="'"){quote=character;continue}
        if(character==='('){depth++;continue}
        if(character===')'){depth=Math.max(0,depth-1);continue}
        if(character==='!'&&!depth)priorityAt=i;
      }
      if(priorityAt>=0&&/^!\s*important\s*$/i.test(rawValue.slice(priorityAt))) {
        return {value:rawValue.slice(0,priorityAt).trim(),priority:'important'};
      }
      return {value:rawValue.trim(),priority:''};
    }
    const validImportantCases=[['transition','none !important'],['transition','none!important'],['transform','none !important'],['opacity','1!important']]
      .map(([property,rawValue])=>{const parsed=separatePriority(rawValue);return parsed.priority==='important'&&CSS.supports(property,parsed.value)});
    const invalidRejected=!CSS.supports('transform',separatePriority('definitely-not-a-valid-transform-value').value);
    const errors=[];
    for(const sheet of [...document.styleSheets]) {
      const source=await (await fetch(sheet.href)).text();
      const withoutComments=source.replace(/\/\*[\s\S]*?\*\//g,'');
      for(const match of withoutComments.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
        if(match[1].trim().startsWith('@'))continue;
        for(const declaration of match[2].split(';')) {
          const colon=declaration.indexOf(':');if(colon<0)continue;
          const property=declaration.slice(0,colon).trim(),rawValue=declaration.slice(colon+1).trim();
          const {value}=separatePriority(rawValue);
          if(!property.startsWith('--')&&!CSS.supports(property,value))errors.push(`${sheet.href}: ${property}: ${rawValue}`);
        }
      }
    }return {errors,validImportantCases,invalidRejected};
  });
  assert.deepEqual(cssValidation.validImportantCases,[true,true,true,true]);
  assert.equal(cssValidation.invalidRejected,true);
  assert.deepEqual(cssValidation.errors,[]);
  console.log(JSON.stringify({responsive:results,keyboard:'PASS',deepLink:'PASS',noJavaScript:'PASS'},null,2));
 }finally {await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1});
