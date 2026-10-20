import json,sys,subprocess
sys.path.insert(0,'/home/claude/work')
fix=json.loads(sys.argv[1]); spl=json.loads(sys.argv[2]) if len(sys.argv)>2 else {}
json.dump(fix,open('fix.json','w'))
subprocess.run(['python3','../words.py','fix.json'],check=True,capture_output=True)
W=json.load(open('words.json'))
out=[]
for t,s,e in W:
    if s in spl:
        a,b=spl[s]; m=t+(e-t)*len(a)/(len(a)+len(b)); out+=[[t,a,round(m,3)],[round(m,3),b,e]]
    else: out.append([t,s,e])
W=out
c=[i for i,w in enumerate(W) if w[1].lower()=='scrivi'][-1]
W[c][1]='Scrivi'; W[c+3][1]='WhatsApp'; W[c+1][1]=W[c+1][1].upper()
W=W[:c+5]+[[0,'x',0]]*3
from phone import refine
W=refine(W)
json.dump(W,open('words.json','w'),ensure_ascii=False)
print(' '.join(f"{i}:{w[1]}" for i,w in enumerate(W)))
print(W[c:])
