import sys,json; sys.path.insert(0,'..'); from tlcommon import build
W=json.load(open('words.json'))
json.dump(W,open('words.json','w'),ensure_ascii=False)
T=lambda i:W[i][0]; E=lambda i:W[i][2]
dur=float(sys.argv[1])
VFX=[('high',T(5)-.01,E(6)+.02,4),('mute',E(40),T(41)),('mute',E(64),T(65)),('mute',E(72),T(73)),('mute',E(82),T(83))]
X=[[T(0),'thump',-13],[T(4),'pop2',-15],[T(6),'cash',-15],[T(13),'bell',-19],
   [T(19),'blip',-16],[T(25),'scratch',-15],[T(26),'blip',-16],[T(29),'scratch',-15],[T(30),'blip',-16],[T(34),'scratch',-15],
   [T(38),'alert',-16],[T(39),'stamp',-11],[T(39),'glitch',-16],
   [T(44),'pop2',-14],[T(47),'ding0',-16],[T(50),'ding1',-16],[T(55),'ding2',-16],[T(60),'ding3',-16],
   [T(64),'blip',-17],[T(65),'ding0',-16],[T(66),'ding1',-16],[T(67),'ding2',-16],[T(68),'ding3',-16],[T(71),'pop2',-14]]
for j in range(10): X.append([T(16)+j*.11,'key',-22])
build([('boss',0),('copy',10),('manual',19),('wait',35),('auto',41),('sleep',63),('all',65),('payoff',73),('cta',83)],
 [1,4,6,13,16,18,21,23,25,27,29,30,38,39,42,44,47,50,55,60,64,65,66,67,68,71,76,82],VFX,X,'TURBO',dur,logo_i=80)
