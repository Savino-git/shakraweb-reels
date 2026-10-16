import json,subprocess,sys
d=sys.argv[1]; TL=json.load(open(f'{d}/timeline.json')); W=TL['words']
p=lambda a:subprocess.run(a,capture_output=True,text=True)
print(p(['ffprobe','-v','error','-show_entries','stream=codec_type,duration,nb_frames,r_frame_rate','-of','csv=p=0',f'{d}/out.mp4']).stdout)
print(p(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'{d}/final_audio.wav']).stdout)
r=p(['ffmpeg','-i',f'{d}/out.mp4','-af','ebur128=peak=true','-f','null','-']).stderr
print('\n'.join(r.strip().split('\n')[-8:]))
ks=TL['kw'][::max(1,len(TL['kw'])//10)][:10]
import os; os.makedirs(f'{d}/kf',exist_ok=True)
for i in ks:
    t=W[i][0]+0.05
    p(['ffmpeg','-y','-v','error','-ss',str(t),'-i',f'{d}/out.mp4','-frames:v','1','-vf','scale=270:480',f'{d}/kf/{i:03d}.jpg'])
from PIL import Image,ImageDraw
fs=sorted(os.listdir(f'{d}/kf'));S=Image.new('RGB',(270*len(fs),510),'white');dr=ImageDraw.Draw(S)
for k,f in enumerate(fs):
    S.paste(Image.open(f'{d}/kf/'+f),(k*270,30));dr.text((k*270+5,5),W[int(f[:3])][1]+' @%.2f'%W[int(f[:3])][0],fill='black')
S.save(f'{d}/kfsheet.jpg',quality=80)
