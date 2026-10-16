import json
c=json.load(open('asr.json'))
W=[]
for ch in c:
    t=ch['timestamp'][0]; e=ch['timestamp'][1]; s=ch['text']
    if not s.startswith(' ') and W:   # apostrophe continuation
        W[-1][1]+=s; W[-1][2]=e; continue
    W.append([t,s.strip(),e])
fix={'vendere':'vende','Responde':'risponde','\"Chi':'Chi','pagato?\"':'pagato?'}
out=[]
for t,s,e in W:
    s=fix.get(s,s)
    if s in ("C'è",) and out and out[-1][1]=='Capisce': continue
    if s=='a' and out and out[-1][1]=='vederla': continue
    out.append([round(max(0,t-0.03),3),s,round(e-0.03,3)])
# phone number
out=[w for w in out if not w[1].startswith('-') and w[1]!='331']
out+= [[33.08,'331',33.75],[33.86,'588',34.53],[34.63,'7685',36.1]]
out.sort()
json.dump(out,open('words.json','w'),ensure_ascii=False)
print(len(out)); print(' '.join(f"{i}:{w[1]}" for i,w in enumerate(out)))
