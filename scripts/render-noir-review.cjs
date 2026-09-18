// Capture unobstructed case layouts; only the screenshots hide fixed portfolio chrome.
const fs = require('fs');
const path = require('path');
const http = require('http');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = path.resolve(__dirname, '..');
const dir = path.join(root, 'review-artifacts', 'noir-form', process.argv.includes('--before') ? 'density-before' : 'density-final');
const captures = [['introduction','.noir-masthead'],['key-visual','.noir-key-visual'],['product','.noir-product-story'],['detail','.noir-detail-story'],['commerce','.noir-commerce-result'],['applications','.noir-applications'],['final','.noir-final-visual']];
const server = http.createServer((req, res) => {
  const file = path.resolve(root, '.' + decodeURIComponent(req.url.split('?')[0] === '/' ? '/index.html' : req.url.split('?')[0]));
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); res.end(); return; }
  res.setHeader('Content-Type', {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.svg':'image/svg+xml','.mp3':'audio/mpeg'}[path.extname(file)] || 'application/octet-stream');
  res.end(fs.readFileSync(file));
});
(async () => {
  await new Promise(resolve => server.listen(8001, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({headless: true});
    fs.mkdirSync(dir, {recursive: true});
    const measurements=[];
    for (const width of [1440, 390]) {
      const page = await browser.newPage({viewport: {width, height: width===390 ? 844 : 900}, reducedMotion: 'reduce'});
      await page.goto('http://127.0.0.1:8001/#project-fashion');
      await page.locator('img').evaluateAll(async images=>{await Promise.all(images.map(async image=>{image.loading='eager';await image.decode();}));});
      await page.evaluate(()=>document.fonts.ready);
      measurements.push(await page.evaluate(()=>({viewport:{width:innerWidth,height:innerHeight},pageHeight:document.documentElement.scrollHeight,sections:[...document.querySelectorAll('.portfolio-section')].map(section=>({id:section.id,height:Math.round(section.getBoundingClientRect().height*100)/100,images:[...section.querySelectorAll('img')].map(image=>({file:image.getAttribute('src'),width:Math.round(image.getBoundingClientRect().width*100)/100,height:Math.round(image.getBoundingClientRect().height*100)/100}))}))})));
      for (const [name, selector] of captures) {
        const target=page.locator(selector),options={path:path.join(dir,`${width}-${name}.png`),style:'.site-header,.section-nav,.skip-link{visibility:hidden!important}'};
        if(width<=720&&['commerce','applications'].includes(name)){
          await target.scrollIntoViewIfNeeded();
          const clip=await target.evaluate(e=>({x:0,y:e.getBoundingClientRect().top+scrollY,width:innerWidth,height:e.getBoundingClientRect().height}));
          await page.screenshot({...options,clip,fullPage:true});
        }else await target.screenshot(options);
      }
      for(const id of ['project-fashion','project-fashion-detail'])await page.locator('#'+id).screenshot({path:path.join(dir,`${width}-${id}.png`),style:'.site-header,.section-nav,.skip-link{visibility:hidden!important}'});
      await page.locator('#project-fashion').evaluate(e => e.scrollIntoView());
      await page.screenshot({path:path.join(dir,`${width}-portfolio-context.png`)});
      await page.evaluate(()=>window.scrollTo(0,0));
      await page.screenshot({path:path.join(dir,`${width}-full-page.png`),fullPage:true,style:'.site-header,.section-nav,.skip-link{visibility:hidden!important}'});
      await page.close();
    }
    fs.writeFileSync(path.join(dir,'measurements.json'),JSON.stringify(measurements,null,2)+'\n');
    console.log(JSON.stringify(measurements.map(result=>({viewport:result.viewport,pageHeight:result.pageHeight,noir:result.sections.filter(section=>section.id.startsWith('project-fashion'))})),null,2));
  } finally { if (browser) await browser.close(); server.close(); }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
