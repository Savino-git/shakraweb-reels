import {pipeline, env} from '@huggingface/transformers';
import fs from 'fs';
env.localModelPath = process.cwd()+'/asr/package/models/'; env.allowRemoteModels=false;
const buf=fs.readFileSync('a16.raw'); const a=new Float32Array(buf.buffer,buf.byteOffset,buf.length/4);
const p=await pipeline('automatic-speech-recognition','Xenova/whisper-small',{dtype:'q8'});
const r=await p(a,{language:'italian',task:'transcribe',return_timestamps:'word',chunk_length_s:30,stride_length_s:5});
fs.writeFileSync('asr.json',JSON.stringify(r.chunks));
console.log(r.text);
for(const c of r.chunks) console.log(c.timestamp[0].toFixed(2),c.timestamp[1]?.toFixed(2),c.text);
