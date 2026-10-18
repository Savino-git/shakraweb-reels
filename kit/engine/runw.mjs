import {pipeline, env} from '@huggingface/transformers';
import fs from 'fs';
env.localModelPath = process.cwd()+'/asr/package/models/'; env.allowRemoteModels=false;
const buf=fs.readFileSync('a16.raw'); const a=new Float32Array(buf.buffer,buf.byteOffset,buf.length/4);
const p=await pipeline('automatic-speech-recognition','Xenova/whisper-small',{dtype:'q8'});
const wins=JSON.parse(process.argv[2]); let out=[];
for(const [s,e,keep0,keep1] of wins){
  const seg=a.slice(Math.round(s*16000),Math.round(e*16000));
  const r=await p(seg,{language:'italian',task:'transcribe',return_timestamps:'word'});
  console.log('WIN',s,r.text);
  for(const c of r.chunks){const t0=c.timestamp[0]+s,t1=(c.timestamp[1]??c.timestamp[0])+s; if(t0>=keep0&&t0<keep1) out.push({text:c.text,timestamp:[t0,t1]})}
}
fs.writeFileSync('asr.json',JSON.stringify(out));
for(const c of out) console.log(c.timestamp[0].toFixed(2),c.timestamp[1].toFixed(2),c.text);
