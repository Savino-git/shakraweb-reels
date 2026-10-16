import json,sys
fix=json.load(open(sys.argv[1])) if len(sys.argv)>1 else {}
c=json.load(open('asr.json'))
W=[]
for ch in c:
    t,e=ch['timestamp']; s=ch['text']
    if not s.startswith(' ') and W:
        W[-1][1]+=s; W[-1][2]=e; continue
    W.append([t,s.strip(),e])
out=[]
for t,s,e in W:
    s=fix.get(s,s).lstrip('-')
    out.append([round(max(0,t-0.03),3),s,round(e-0.03,3)])
json.dump(out,open('words.json','w'),ensure_ascii=False)
print(' '.join(f"{i}:{w[1]}" for i,w in enumerate(out)))
