import numpy as np, json, subprocess, scipy.io.wavfile as wf
from scipy import signal as sg
SR=48000; rng=np.random.default_rng(7)
TL=json.load(open('timeline.json'))
def rd(p):
    sr,x=wf.read(p); x=x.astype(np.float32)/32768
    return x if x.ndim==1 else x.mean(1)
def wr(p,x): wf.write(p,SR,(np.clip(x,-1,1)*32767).astype(np.int16))
v=rd('voice_fast.wav'); N=len(v); dur=N/SR
# base chain via ffmpeg
wr('_v.wav',v)
subprocess.run(['ffmpeg','-y','-v','error','-i','_v.wav','-af',
 'highpass=f=80,equalizer=f=4000:t=q:w=1:g=3,deesser=i=0.3,acompressor=threshold=-20dB:ratio=4:attack=5:release=60:makeup=2','_vb.wav'],check=True)
v=rd('_vb.wav')[:N]; v=np.pad(v,(0,N-len(v)))
fx=np.zeros(N+SR*3)   # tails
def fade(x,f=int(.008*SR)):
    f=min(f,len(x)//2); r=np.linspace(0,1,f); x=x.copy(); x[:f]*=r; x[-f:]*=r[::-1]; return x
def replace(a,b,y):
    i,j=int(a*SR),int(b*SR); y=y[:j-i]; y=np.pad(y,(0,j-i-len(y)))
    f=int(.01*SR); r=np.linspace(0,1,f)
    seg=v[i:j].copy(); out=y.copy()
    out[:f]=seg[:f]*(1-r)+y[:f]*r
    out[-f:]=y[-f:]*r[::-1]+seg[-f:]*(1-r[::-1])
    v[i:j]=out
def pitch(seg,st):
    wr('_s.wav',seg); subprocess.run(['ffmpeg','-y','-v','error','-i','_s.wav','-af',f'rubberband=pitch={2**(st/12):.5f}:pitchq=quality','_p.wav'],check=True)
    return rd('_p.wav')
def reverb_ir(L=1.6):
    t=np.arange(int(L*SR))/SR; return rng.standard_normal(len(t))*np.exp(-t*4)*0.05
IR=reverb_ir()
mutes=[]
for e in TL['vfx']:
    k=e[0]
    if k=='radio':
        a,b=e[1],e[2]; seg=v[int(a*SR):int(b*SR)]
        bb,aa=sg.butter(4,[400,3200],'band',fs=SR); y=sg.lfilter(bb,aa,seg)
        y=np.tanh(y*6)/3.2; replace(a,b,y*1.15)
    elif k in('deep','high'):
        a,b,st=e[1],e[2],e[3]; replace(a,b,pitch(v[int(a*SR):int(b*SR)],st)*(1.15 if k=='deep' else 1))
        if k=='deep':  # epic layer reverb
            i=int(a*SR); y=sg.fftconvolve(v[i:int(b*SR)],IR)[:SR*2]; fx[i:i+len(y)]+=y*0.8
    elif k=='echo':
        a,b=e[1],e[2]; i=int(a*SR); seg=fade(v[i:int(b*SR)])
        for d,g in ((0.14,.45),(0.28,.3),(0.42,.18),(0.56,.1)):
            j=i+int(d*SR); fx[j:j+len(seg)]+=seg*g
        y=sg.fftconvolve(seg,IR)[:SR*2]; fx[i:i+len(y)]+=y*0.6
    elif k=='swell':
        t=e[1]; i=int(t*SR); seg=v[i:i+int(.45*SR)]
        y=sg.fftconvolve(seg,IR)[:int(1.2*SR)][::-1]; y=y/np.abs(y).max()*0.35
        s=i-len(y); 
        if s<0: y=y[-s:]; s=0
        fx[s:s+len(y)]+=y
    elif k=='mute': mutes.append((e[1],e[2]))
vox=v+fx[:N]
# ---------- SFX synth ----------
def env_exp(n,tau): return np.exp(-np.arange(n)/SR/tau)
def noise(n): return rng.standard_normal(n)
def bp(x,lo,hi,o=2): b,a=sg.butter(o,[lo,hi],'band',fs=SR); return sg.lfilter(b,a,x)
def lp(x,f,o=2): b,a=sg.butter(o,f,'low',fs=SR); return sg.lfilter(b,a,x)
def hp(x,f,o=2): b,a=sg.butter(o,f,'high',fs=SR); return sg.lfilter(b,a,x)
def sweep(f0,f1,n,curve='exp'):
    t=np.arange(n)/SR; f=f0*(f1/f0)**(t/t[-1]) if curve=='exp' else np.linspace(f0,f1,n)
    return np.sin(2*np.pi*np.cumsum(f)/SR)
def norm(x): return x/(np.abs(x).max()+1e-9)
def whoosh():
    n=int(.38*SR); x=noise(n); out=np.zeros(n); blk=480
    for k in range(0,n,blk):
        c=300*(6000/300)**(k/n); out[k:k+blk]=bp(x[k:k+blk+2000],c*0.7,min(c*1.4,20000))[:len(out[k:k+blk])]
    w=np.sin(np.pi*np.linspace(0,1,n))**2; return norm(out*w)
def pop(): n=int(.06*SR); return norm(sweep(900*rng.uniform(.9,1.15),300,n)*env_exp(n,.02))
def pop2(): n=int(.12*SR); return norm(sweep(1400,350,n)*env_exp(n,.035))
def ding(f=1800):
    n=int(.5*SR); t=np.arange(n)/SR
    return norm((np.sin(2*np.pi*f*t)+.4*np.sin(2*np.pi*2*f*t)+.2*np.sin(2*np.pi*3.01*f*t))*env_exp(n,.13))
def tick(): n=int(.025*SR); return norm(hp(noise(n),3000)*env_exp(n,.004))
def cash():
    n=int(.7*SR); t=np.arange(n)/SR
    x=tick()[:n]; c=np.pad(x,(0,n-len(x)))
    b=(np.sin(2*np.pi*2637*t)+np.sin(2*np.pi*3520*t)*.7)*env_exp(n,.18); b[:int(.05*SR)]=0
    return norm(c*1.5+b)
def stamp():
    n=int(.3*SR); t=np.arange(n)/SR
    return norm(np.sin(2*np.pi*80*t)*env_exp(n,.08)*1.4+lp(noise(n),2500)*env_exp(n,.02))
def boom():
    n=int(1.6*SR); t=np.arange(n)/SR; f=60*(35/60)**(t/t[-1])
    s=np.sin(2*np.pi*np.cumsum(f)/SR)*env_exp(n,.5); s+=lp(noise(n),300)*env_exp(n,.05)*.6
    return norm(np.tanh(s*1.6))
def thump(): n=int(.25*SR); t=np.arange(n)/SR; return norm(np.sin(2*np.pi*110*np.exp(-t*8)*t*3)*env_exp(n,.06)+lp(noise(n),1200)*env_exp(n,.015)*.5)
def scratch(): n=int(.16*SR); return norm(bp(noise(n),1500,5000)*np.sin(np.pi*np.linspace(0,1,n)))
def glitch():
    base=bp(noise(int(.02*SR)),500,6000); s=np.concatenate([base*(1 if k%2 else .4) for k in range(10)])
    return norm(np.concatenate([s, sweep(2000,200,int(.08*SR))*0.5]))
def riser(L):
    n=int(L*SR); t=np.arange(n)/SR; x=bp(noise(n),800,8000)*(t/L)**2
    x+=sweep(200,1600,n)*(t/L)**2*0.5; return norm(x)
def shutter():
    a=hp(noise(int(.03*SR)),2000)*env_exp(int(.03*SR),.006); b=lp(noise(int(.05*SR)),3000)*env_exp(int(.05*SR),.01)
    return norm(np.concatenate([a,np.zeros(int(.06*SR)),b]))
def scan(): n=int(1.0*SR); return norm(sweep(400,1600,n,'lin')*0.3*np.sin(np.pi*np.linspace(0,1,n))+bp(noise(n),2000,6000)*0.15)
def alert():
    n=int(.12*SR); t=np.arange(n)/SR; a=np.sin(2*np.pi*880*t)*env_exp(n,.05); b=np.sin(2*np.pi*660*t)*env_exp(n,.05)
    return norm(np.concatenate([a,b]))
def blip(): n=int(.09*SR); return norm(sweep(600,1300,n)*env_exp(n,.04))
def send(): return norm(whoosh()[::2]*0.7)
def bell():
    n=int(1.4*SR); t=np.arange(n)/SR
    return norm(sum(g*np.sin(2*np.pi*f*t) for f,g in ((1320,1),(2640,.5),(3600,.3),(5100,.15)))*env_exp(n,.35)*(1+.3*np.sin(2*np.pi*11*t)))
def key(): n=int(.035*SR); return norm(bp(noise(n),1500,7000)*env_exp(n,.006)+np.sin(2*np.pi*2400*np.arange(n)/SR)*env_exp(n,.01)*.3)
GEN={'whoosh':whoosh,'pop':pop,'pop2':pop2,'ding':ding,'tick':tick,'cash':cash,'stamp':stamp,'boom':boom,'thump':thump,
     'scratch':scratch,'glitch':glitch,'shutter':shutter,'scan':scan,'alert':alert,'blip':blip,'send':send,'bell':bell,'key':key}
sfx=np.zeros(N+3*SR)
riser_t=None
for t,k,db in TL['sfx']:
    if k=='riser1': y=riser(T:=1.0); start=t
    elif k=='riser':
        tb=[e for e in TL['sfx'] if e[1]=='boom' and e[0]>t][0][0]; L=tb-t; y=riser(L); start=t
    elif k.startswith('ding') and k!='ding': y=ding(1500*2**(int(k[4:])*2/12)); start=t
    else: y=GEN[k](); start=t
    if k=='whoosh': start=t-0.15
    i=max(0,int(start*SR)); y=y*10**(db/20)
    sfx[i:i+len(y)]+=y[:len(sfx)-i]
sfx=sfx[:N]
# ---------- music 124bpm melodic ----------
bpm=TL['bpm']; beat=60/bpm; mus=np.zeros(N+SR)
def note(f,n,tau,kind='pluck'):
    t=np.arange(n)/SR
    if kind=='pluck':
        x=sg.sawtooth(2*np.pi*f*t)*0.5+np.sin(2*np.pi*f*2*t)*0.2; x=lp(x,2500); return x*env_exp(n,tau)
    if kind=='pad':
        x=sum(sg.sawtooth(2*np.pi*f*d*t) for d in (0.997,1.0,1.004))/3; x=lp(x,1400)
        a=np.minimum(1,t/0.25)*np.minimum(1,(t[-1]-t)/0.3+0.01); return x*a
    if kind=='bass': return (np.sin(2*np.pi*f*t)+0.3*np.sin(2*np.pi*2*f*t))*env_exp(n,tau)
mid=lambda m:440*2**((m-69)/12)
prog=[(57,[57,60,64]),(53,[53,57,60]),(48,[52,55,60]),(55,[55,59,62])]  # Am F C G
nb=int(dur/beat)+2
for b in range(nb):
    t=b*beat; i=int(t*SR); root,ch=prog[(b//8)%4]
    # kick
    n=int(.35*SR); tt=np.arange(n)/SR; k=np.sin(2*np.pi*np.cumsum(50+120*np.exp(-tt*30))/SR)*env_exp(n,.12)
    mus[i:i+n]+=k*0.9
    # hat offbeat
    j=int((t+beat/2)*SR); h=hp(noise(int(.05*SR)),7000)*env_exp(int(.05*SR),.012); mus[j:j+len(h)]+=h*0.25
    if b%2==1: c=hp(noise(int(.12*SR)),1500)*env_exp(int(.12*SR),.05); mus[i:i+len(c)]+=c*0.25  # clap
    # bass offbeat
    bs=note(mid(root-12),int(beat/2*SR),.12,'bass'); mus[j:j+len(bs)]+=bs*0.45
    # pluck arpeggio 8ths
    arp=ch+[ch[0]+12]
    for s in range(2):
        f=mid(arp[(b*2+s)%4]+12); p=note(f,int(.3*SR),.09); q=int((t+s*beat/2)*SR); mus[q:q+len(p)]+=p*0.22
    if b%8==0:
        L=int(8*beat*SR)
        for m in ch: pd=note(mid(m),L,0,'pad'); mus[i:i+L]+=pd[:len(mus)-i]*0.10
mus=mus[:N]
# intro: music only partially for first beat; mutes
g=np.ones(N)
for a,b in mutes:
    i,j=int(a*SR),int(b*SR); r=int(.01*SR); g[i:j]=0; g[i-r:i]=np.linspace(1,0,r); g[j:j+r]=np.minimum(g[j:j+r],np.linspace(0,1,r))
# sidechain ducking by voice envelope
envv=np.abs(vox); envv=sg.lfilter([1-np.exp(-1/(SR*.08))],[1,-np.exp(-1/(SR*.08))],envv)
duck=1-0.5*np.clip(envv/0.08,0,1)
mus=mus*duck*g*10**(-17/20)/ (np.abs(mus).max()*0.5)
sfx=sfx*np.maximum(g,0.6)
# tail: let last boom/music fade out 0.5s after voice
mix=vox*0.9+sfx*0.9+mus
wr('mix_raw.wav',mix)
subprocess.run(['ffmpeg','-y','-v','error','-i','mix_raw.wav','-af','loudnorm=I=-14:TP=-1.5:LRA=9:print_format=summary','-ar','48000','final_audio.wav'],check=True)
print('dur',dur)
