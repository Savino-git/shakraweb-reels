import {chromium} from 'playwright';
import fs from 'fs';
const times=process.argv.slice(2).map(Number);
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--disable-accelerated-2d-canvas']}).catch(async e=>{return chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--disable-accelerated-2d-canvas']})});
const pg=await b.newPage({viewport:{width:1080,height:1920}});
pg.on('console',m=>console.log('LOG',m.text()));pg.on('pageerror',e=>console.log('ERR',e.message));
await pg.goto('http://localhost:8765/index.html');await pg.waitForFunction(()=>window.READY,null,{timeout:120000});
fs.mkdirSync('shots',{recursive:true});
for(const t of times){const t0=Date.now();const d=await pg.evaluate(t=>{renderFrame(t);return document.getElementById('c').toDataURL('image/jpeg',.85)},t);
 fs.writeFileSync(`shots/${t.toFixed(2)}.jpg`,Buffer.from(d.split(',')[1],'base64'));console.log(t,Date.now()-t0,'ms')}
await b.close();
