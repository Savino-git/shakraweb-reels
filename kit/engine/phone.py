# refine phone number group timings from energy: groups = speech runs after 'al'
import json,numpy as np
def refine(W):
    x=np.fromfile('a16.raw',np.float32); w=160; n=len(x)//w
    db=20*np.log10(np.sqrt((x[:n*w].reshape(n,w)**2).mean(1))+1e-9)
    c=[i for i,t in enumerate(W) if t[1]=='Scrivi'][-1]; al=c+4
    a0=int(W[al][2]*100)
    sp=db[a0:]>-35
    # runs of speech, merge gaps <0.12s
    runs=[];i=0
    while i<len(sp):
        if sp[i]:
            j=i
            while j<len(sp) and sp[j]: j+=1
            runs.append([i,j]); i=j
        else: i+=1
    m=[]
    for r in runs:
        if m and r[0]-m[-1][1]<12: m[-1][1]=r[1]
        else: m.append(r)
    m=[r for r in m if r[1]-r[0]>8]
    print('phone runs',[(round((a0+r[0])/100,2),round((a0+r[1])/100,2)) for r in m])
    # pick 3 groups by 2 largest gaps
    if len(m)>3:
        gaps=sorted(range(len(m)-1),key=lambda k:m[k+1][0]-m[k][1])[-2:]; gaps.sort()
        G=[[m[0][0],m[gaps[0]][1]],[m[gaps[0]+1][0],m[gaps[1]][1]],[m[gaps[1]+1][0],m[-1][1]]]
    else: G=m
    for k,(s,e) in enumerate(G[:3]):
        W[c+5+k]=[round((a0+s)/100-0.03,3),W[c+5+k][1],round((a0+e)/100,3)]
    W[c+5][1]='331';W[c+6][1]='588';W[c+7][1]='7685'
    return W
