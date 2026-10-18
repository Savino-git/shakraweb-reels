import sys,json; sys.path.insert(0,'..'); from tlcommon import build
W=json.load(open('words.json')); T=lambda i:W[i][0]; E=lambda i:W[i][2]
dur=float(sys.argv[1])
VFX=[('high',T(29)-.01,E(29)+.02,5),('radio',T(43)-.02,E(46)+.03),('mute',E(82),T(83)),('swell',T(83)),('echo',T(84),E(84))]
X=[[T(0),'thump',-13],[T(7),'alert',-18],[T(10),'pop2',-15],[T(12),'ding0',-16],[T(22),'ding1',-16],[T(35),'ding2',-16],
   [T(20),'scratch',-15],[T(21),'cash',-16],[T(30),'blip',-15],[T(32),'shutter',-16],[T(33),'blip',-16],
   [T(38),'blip',-16],[T(39)+.1,'blip',-16],[T(41),'blip',-16],[T(46),'scratch',-14],
   [T(49),'scan',-19],[T(53),'glitch',-19],[T(54),'thump',-13],[T(68),'pop2',-15],[T(70),'send',-15],[T(70)+.2,'ding',-15],
   [T(81),'ding',-14]]
for j in range(9): X.append([T(13)+j*.22+.25,'thump',-20])
for j in range(4): X.append([T(62)+j*.12,'tick',-20])
for j in range(3): X.append([T(76)+j*.1,'key',-19])
for j in range(6): X.append([T(78)+j*.1,'tick',-22])
for j,i in enumerate((89,90,91,92)): X.append([T(i),'ding%d'%j,-17])
build([('intro',0),('print',12),('waiter',22),('tourist',35),('qr',47),('phone',56),('price',73),('payoff',82),('cta',96)],
 [0,1,10,11,13,21,24,29,37,42,46,49,54,62,63,68,70,74,80,81,83,84,89,90,91,92,94],VFX,X,'MENU',dur,logo_i=83)
