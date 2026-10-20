import json,numpy as np
W=json.load(open('words.json'))
x=np.fromfile('a16.raw',np.float32); w=160; n=len(x)//w
db=20*np.log10(np.sqrt((x[:n*w].reshape(n,w)**2).mean(1))+1e-9)
c=[i for i,t in enumerate(W) if t[1]=='Scrivi'][-1]
a,b=W[c+6][0],W[c+6][2]
i0,i1=int((a+(b-a)*.28)*100),int((a+(b-a)*.6)*100)
sm=np.convolve(db,np.ones(6)/6,'same'); k=i0+int(np.argmin(sm[i0:i1])); split=k/100
W[c+6]=[a,'588',round(split,3)]; W[c+7]=[round(split+0.02,3),'7685',b]
print([(w[1],w[0],w[2]) for w in W[c+5:]],'min db',sm[k])
json.dump(W,open('words.json','w'),ensure_ascii=False)
