import numpy as np, scipy.io.wavfile as w, sys
sr,x=w.read('orig.wav'); x=x.astype(np.float32)/32768
win=int(.01*sr); n=len(x)//win
rms=np.sqrt(np.mean(x[:n*win].reshape(n,win)**2,1)); db=20*np.log10(rms+1e-9)
sil=db<-40
# find silent runs
segs=[];i=0
while i<n:
    if sil[i]:
        j=i
        while j<n and sil[j]: j+=1
        segs.append((i,j)); i=j
    else: i+=1
keep=0.10; out=[]; pos=0; fade=int(.008*sr)
for a,b in segs:
    a_s,b_s=a*win,b*win
    L=(b-a)*.01
    lead = a==0; tail = b>=n
    if lead: k=0.0
    elif tail: k=0.15
    elif L>0.18: k=keep
    else: continue
    if L<=k: continue
    half=int(k*sr/2)
    out.append(x[pos:a_s+half]); pos=b_s-half
out.append(x[pos:])
# crossfade join
y=out[0]
for s in out[1:]:
    f=min(fade,len(y),len(s)); r=np.linspace(0,1,f)
    y=np.concatenate([y[:-f], y[-f:]*(1-r)+s[:f]*r, s[f:]])
w.write('cut.wav',sr,(np.clip(y,-1,1)*32767).astype(np.int16))
print(len(x)/sr, len(y)/sr)
