import json
W=json.load(open('words.json')); W=[w for w in W if w[1]!='331-588-7685.']
assert len(W)==139, len(W)
T=lambda i:W[i][0]; E=lambda i:W[i][2]
cuts=[0,2,5,8,10,13,15,18,22,24,28,29,31,33,37,39,43,46,48,52,56,60,63,66,69,71,72,75,77,80,82,84,86,89,92,96,99,103,106,110,112,115,119,122,125,127,131,135,139]
groups=[[cuts[i],cuts[i+1]] for i in range(len(cuts)-1)]
KW=[4,7,12,23,28,31,32,42,45,51,58,59,60,65,70,76,79,85,90,91,94,98,105,109,112,114,118,124,130,132,134,136,137,138]
scenes=[('ask',0),('answer',10),('notnormal',24),('ai',29),('chat',37),('scan',60),('stock',71),('client',82),('bell',96),('boss',106),('night',115),('cta',125)]
S=[]
for k,(n,i) in enumerate(scenes):
    end = scenes[k+1][1] if k+1<len(scenes) else len(W)
    S.append({'name':n,'w0':i,'w1':end,'t0':max(0,T(i)-0.12)})
# voice fx: type, t0, t1, param
VFX=[('radio',T(18)-0.02,E(23)+0.03),('deep',T(28)-0.01,E(28)+0.02,-4),
     ('swell',T(31)),('echo',T(32),E(32)),('radio',T(43)-0.02,E(47)+0.03),('radio',T(48)-0.02,E(55)+0.03),
     ('high',T(69)-0.01,E(70)+0.02,5),('swell',T(106)),('deep',T(114)-0.01,E(114)+0.03,-4),
     ('echo',T(124),E(124)),('mute',E(105),T(106)),('mute',E(114),T(115))]
SFX=[]
for s in S[1:]: SFX.append([s['t0']-0.05,'whoosh',-14])
for g in groups:
    for i in range(*g): SFX.append([T(i),'pop',-30])
add=lambda t,k,v: SFX.append([round(t,3),k,v])
for j in range(8): add(T(12)+j*0.07,'tick',-24)
add(T(12)+0.6,'cash',-16)
add(T(22),'stamp',-12); add(T(23),'stamp',-12); add(T(23)+0.25,'stamp',-12)
add(T(24),'glitch',-18); add(T(28),'scratch',-14); add(T(28),'boom',-10)
add(T(29),'riser1',-20)
add(T(43),'blip',-16); add(E(47),'cash',-17); add(T(48),'blip',-16); add(E(55),'ding',-16,)
for j in range(4): add(T(56)+j*0.2,'tick',-20)
add(T(59),'ding',-15)
add(T(60),'shutter',-12); add(T(62),'scan',-20); add(T(70),'ding',-14)
add(T(71),'thump',-14); add(T(72),'thump',-15); add(T(74),'thump',-15); add(T(76),'alert',-18); add(T(81),'ding',-14)
add(T(85),'blip',-16); add(T(94),'send',-14); add(T(98),'bell',-12); add(T(105),'alert',-17)
add(T(109),'boom',-11)
for j in range(5): SFX.append([round(T(112)+j*0.13,3),'ding%d'%j,-17])
add(T(114),'boom',-10)
add(T(115),'riser',-18); add(T(124),'boom',-8)
add(T(132),'pop2',-14); add(T(134),'ding',-15)
for i in (136,137,138):
    for j in range(3): add(T(i)+j*0.18,'key',-20)
add(E(138)+0.15,'ding',-14)
SFX.sort()
json.dump({'words':W,'groups':groups,'kw':KW,'scenes':S,'vfx':VFX,'sfx':SFX,'bpm':124,'dur':36.219},open('timeline.json','w'),ensure_ascii=False)
for g in groups: print(round(T(g[0]),2),' '.join(W[i][1] for i in range(*g)))
