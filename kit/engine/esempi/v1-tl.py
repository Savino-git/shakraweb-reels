import sys,json; sys.path.insert(0,'..'); from tlcommon import build
W=json.load(open('words.json')); T=lambda i:W[i][0]; E=lambda i:W[i][2]
dur=float(sys.argv[1])
VFX=[('mute',E(13),T(14)),('deep',T(19)-.01,E(19)+.02,-4),('swell',T(37)),('echo',T(38),E(38)),
     ('high',T(74)-.01,E(75)+.02,5),('mute',E(82),T(83)),('swell',T(83)),('echo',T(85),E(85))]
X=[[0.05,'alert',-17],[0.45,'alert',-18],[T(13),'thump',-13],[T(19),'boom',-11],
   [T(28),'scratch',-14],[T(32),'alert',-17],[T(35),'glitch',-18],[T(42),'blip',-15],
   [T(45),'send',-15],[T(47),'tick',-20],[T(49),'blip',-16],[T(54),'pop2',-15],[T(56),'stamp',-12],[T(59),'bell',-14],
   [T(73),'thump',-13],[T(75),'ding',-14]]
for j in range(6): X.append([T(25)+j*.08,'tick',-22])
for j in range(4): X.append([T(63)+j*.15,'tick',-20])
build([('phone',0),('centralino',14),('lost',22),('robot',35),('chat',45),('night',63),('pizza',68),('payoff',76),('cta',86)],
 [1,13,17,19,25,34,37,42,44,47,48,51,54,56,65,67,73,75,79,85],VFX,X,'ROBOT',dur,logo_i=85)
