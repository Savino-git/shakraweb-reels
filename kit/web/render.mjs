import {chromium} from 'playwright';
import {spawn} from 'child_process';
const [f0,f1,out]=[+process.argv[2],+process.argv[3],process.argv[4]];
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--disable-accelerated-2d-canvas']});
const pg=await b.newPage({viewport:{width:1080,height:1920}});pg.on('pageerror',e=>console.log('ERR',e.message));
await pg.goto('http://localhost:8765/index.html');await pg.waitForFunction(()=>window.READY,null,{timeout:120000});
const ff=spawn('ffmpeg',['-y','-v','error','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','17','-pix_fmt','yuv420p','-r','30',out],{stdio:['pipe','inherit','inherit']});
for(let f=f0;f<f1;f+=10){const n=Math.min(10,f1-f);
  const arr=await pg.evaluate(([a,n])=>{const r=[];for(let k=0;k<n;k++){renderFrame((a+k)/30);r.push(document.getElementById('c').toDataURL('image/jpeg',.94).split(',')[1])}return r},[f,n]);
  for(const d of arr){if(!ff.stdin.write(Buffer.from(d,'base64')))await new Promise(r=>ff.stdin.once('drain',r))}
  if(f%300<10)console.log(out,f)}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();
