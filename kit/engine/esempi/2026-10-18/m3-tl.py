import sys,json; sys.path.insert(0,'..'); from tlcommon import build
W=json.load(open('words.json')); T=lambda i:W[i][0]; E=lambda i:W[i][2]
dur=float(sys.argv[1])
VFX=[('radio',T(15)-.02,E(16)+.03),('mute',E(36),T(37)),('high',T(63)-.01,E(65)+.02,5),('swell',T(71)),('echo',T(72),E(72)),('mute',E(84),T(85)),('swell',T(85)),('echo',T(85),E(85))]
X=[[T(3),'pop2',-15],[T(12),'alert',-17],[T(15),'scratch',-17],[T(17),'scratch',-17],[T(20),'scratch',-17],
   [T(29),'pop2',-15],[T(32),'stamp',-13],[T(34),'stamp',-12],[T(37),'stamp',-10],[T(37),'boom',-13],[T(39),'pop2',-15],[T(43),'blip',-15],[T(45),'send',-16],
   [T(49),'blip',-16],[T(51),'thump',-13],[T(52),'ding',-14],[T(56),'send',-14],[T(56)+.1,'ding',-15],[T(63),'pop2',-15]]
for j in range(6): X.append([T(0)+j*.12,'key',-19])
for j in range(8): X.append([T(11)+j*.08,'tick',-22])
for j in range(6): X.append([T(25)+j*.08,'tick',-22]); X.append([T(30)+j*.1,'tick',-22])
X.append([T(30)+.65,'cash',-15])
for j in range(8): X.append([T(34)+j*.18+.4,'thump',-21])
for j,i in enumerate((66,67,68,69)): X.append([T(i),'ding%d'%j,-17])
build([('calc',0),('clock',5),('math',24),('trash',33),('gears',38),('files',47),('plane',53),('all',66),('payoff',76),('cta',86)],
 [1,2,4,11,12,13,15,17,21,25,26,30,32,34,37,39,43,46,49,51,55,56,60,63,65,66,67,68,71,72,74,79,82,85],VFX,X,'TEMPO',dur,logo_i=85)
