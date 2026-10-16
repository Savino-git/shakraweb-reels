import json
PUN=tuple('.,:;?!"')
def build(scenes,KW,VFX,extra,cta_word,dur,logo_i=None,sfx_vol=None):
    W=json.load(open('words.json'))
    T=lambda i:W[i][0]; E=lambda i:W[i][2]
    starts={i for _,i in scenes}
    cuts=[0]; n=0
    for i in range(len(W)):
        if i>0 and (i in starts or n>=4 or W[i-1][1].endswith(PUN)):
            cuts.append(i); n=0
        n+=1
    c=[i for i,w in enumerate(W) if w[1]=='Scrivi'][-1]
    # phone numbers group: force cut at 'al'+1
    cuts=[x for x in cuts if x!=c+5]+[c+4]
    cuts=sorted(set(cuts))+[len(W)]
    groups=[[cuts[i],cuts[i+1]] for i in range(len(cuts)-1)]
    S=[]
    for k,(nm,i) in enumerate(scenes):
        end=scenes[k+1][1] if k+1<len(scenes) else len(W)
        S.append({'name':nm,'w0':i,'w1':end,'t0':max(0,T(i)-0.12)})
    KW=sorted(set(KW+[c+1,c+3,c+5,c+6,c+7]))
    SFX=[]
    for s in S[1:]: SFX.append([round(s['t0']-0.05,3),'whoosh',-14])
    for g in groups:
        for i in range(*g): SFX.append([T(i),'pop',-30])
    add=lambda t,k,v: SFX.append([round(t,3),k,v])
    add(T(c+1),'pop2',-14); add(T(c+3),'ding',-15)
    for i in (c+5,c+6,c+7):
        for j in range(3): add(T(i)+j*0.18,'key',-20)
    add(E(c+7)+0.15,'ding',-14)
    if logo_i is not None:
        add(T(logo_i)-1.4,'riser',-18); add(T(logo_i),'boom',-8)
    for e in extra: add(*e)
    SFX.sort()
    json.dump({'words':W,'groups':groups,'kw':KW,'scenes':S,'vfx':VFX,'sfx':SFX,'bpm':124,'dur':dur,'cta':cta_word,'ctai':c,'logo':logo_i},open('timeline.json','w'),ensure_ascii=False)
    for g in groups: print(g[0],round(T(g[0]),2),' '.join(W[i][1] for i in range(*g)))
    return W,T,E
