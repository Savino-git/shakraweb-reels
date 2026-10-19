import sys,json; sys.path.insert(0,'..'); from tlcommon import build
W=json.load(open('words.json'))
W[27][1]='portale,'; W[46][1]='notte.'; W[1][1]='titolare|'; W[8][1]='recensioni|'; W[50][1]='veloce,'; W[19][1]=W[19][1]; json.dump(W,open('words.json','w'),ensure_ascii=False)
T=lambda i:W[i][0]; E=lambda i:W[i][2]
dur=float(sys.argv[1])
VFX=[('high',T(21)-.01,E(21)+.02,5),('mute',E(46),T(47)),('mute',E(77),T(78))]
X=[[T(0),'thump',-13],[T(14),'glitch',-18],[T(20),'stamp',-12],[T(25),'send',-16],[T(33),'stamp',-11],
   [T(38),'cash',-15],[T(40),'scratch',-15],[T(46),'alert',-16],[T(49),'blip',-15],
   [T(50),'ding0',-16],[T(52),'ding1',-16],[T(55),'ding2',-16],[T(61),'send',-15],[T(65),'cash',-14],[T(66),'stamp',-13],[T(76),'ding',-15]]
for j in range(5): X.append([T(10)+j*.07,'ding%d'%j,-20])
for j in range(6): X.append([T(7)+j*.07,'tick',-22])
for j in range(3): X.append([E(21)+.05+j*.2,'thump',-18])
for j in range(5): X.append([T(27)+j*.15,'tick',-19])
for i in (71,72,73,74): X.append([T(i),'pop2',-16])
build([('stars',0),('oldsite',12),('portal',22),('math',34),('site',47),('direct',56),('all',67),('payoff',78),('cta',88)],
 [5,7,11,18,20,21,27,33,38,40,46,50,52,55,63,66,71,72,73,75,76,81,84,87],VFX,X,'SITO',dur,logo_i=87)
