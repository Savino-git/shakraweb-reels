import sys,json; sys.path.insert(0,'..'); from tlcommon import build
W=json.load(open('words.json'))
T=lambda i:W[i][0]; E=lambda i:W[i][2]
dur=float(sys.argv[1])
VFX=[('high',T(57)-.01,E(57)+.02,4),('mute',E(11),T(12)),('mute',E(47),T(48)),('mute',E(60),T(61)),('mute',E(91),T(92))]
X=[[T(0),'thump',-13],[T(10),'pop2',-15],[T(12),'stamp',-12],[T(14),'send',-16],[T(16),'send',-16],[T(19),'send',-16],[T(23),'scratch',-17],[T(27)+.02,'stamp',-11],[T(27),'glitch',-16],
   [T(28),'stamp',-12],[T(34),'scan',-19],[T(35),'blip',-15],[T(44),'alert',-17],[T(48),'stamp',-12],[T(50),'scratch',-15],[T(55),'pop2',-15],[T(57),'blip',-15],
   [T(61),'whoosh',-16],[T(67),'cash',-15],[T(67),'ding0',-16],[T(71),'cash',-15],[T(73),'ding1',-16],[T(76),'cash',-15],[T(78),'ding2',-16],[T(81),'ding3',-16],[T(82),'bell',-19]]
build([('intro',0),('s1',12),('s2',28),('s3',48),('shop',61),('payoff',82),('cta',92)],
 [0,5,10,11,12,18,20,27,28,35,41,47,48,50,52,57,60,63,67,68,70,71,74,78,81,85,88,91],VFX,X,'SPESA',dur,logo_i=91)
