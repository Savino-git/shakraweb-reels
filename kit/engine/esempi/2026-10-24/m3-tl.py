import sys,json; sys.path.insert(0,'..'); from tlcommon import build
W=json.load(open('words.json'))
json.dump(W,open('words.json','w'),ensure_ascii=False)
T=lambda i:W[i][0]; E=lambda i:W[i][2]
dur=float(sys.argv[1])
VFX=[('high',T(22)-.01,E(22)+.02,4),('mute',E(24),T(25)),('mute',E(48),T(49)),('mute',E(58),T(59))]
X=[[T(0),'thump',-13],[T(3),'pop2',-15],[T(11),'scratch',-14],[T(11),'alert',-17],
   [T(12),'blip',-16],[T(17),'blip',-16],[T(20)+.6,'cash',-14],[T(22),'stamp',-11],[T(22),'glitch',-16],
   [T(23),'pop2',-15],[T(25),'pop2',-14],[T(35),'ding0',-16],[T(37),'ding1',-16],[T(41),'send',-15],[T(44),'bell',-18],
   [T(47),'ding2',-15],[T(48),'ding3',-16]]
for j in range(8): X.append([T(20)+j*.07,'tick',-22])
for j in range(8): X.append([T(23)+j*.09,'tick',-23])
build([('pizza',0),('calc',12),('night',23),('app',25),('kitchen',40),('mine',45),('payoff',49),('cta',59)],
 [3,5,7,11,12,17,20,22,24,26,29,32,35,37,39,41,44,47,48,52,58],VFX,X,'PIZZA',dur,logo_i=56)
