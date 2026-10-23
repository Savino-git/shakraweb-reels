import sys,json; sys.path.insert(0,'..'); from tlcommon import build
W=json.load(open('words.json'))
T=lambda i:W[i][0]; E=lambda i:W[i][2]
dur=float(sys.argv[1])
VFX=[('high',T(46)-.01,E(46)+.02,4),('mute',E(3),T(4)),('mute',E(32),T(33)),('mute',E(67),T(68)),('mute',E(90),T(91))]
X=[[T(0),'thump',-13],[T(6),'scratch',-15],[T(8),'pop2',-15],[T(9)+.6,'cash',-14],[T(15),'alert',-17],[T(16),'pop2',-15],
   [T(23),'cash',-14],[T(28)+.8,'cash',-13],[T(32)-.02,'stamp',-10],[T(32),'glitch',-16],[T(35),'pop2',-15],[T(38),'thump',-16],[T(42),'pop2',-15],[T(46)-.05,'scratch',-14],[T(46),'blip',-15],
   [T(55),'alert',-17],[T(58),'blip',-15],[T(62),'cash',-15],[T(65),'pop2',-15],
   [T(69),'thump',-17],[T(70),'thump',-17],[T(71)+.1,'thump',-17],[T(72),'thump',-17],[T(73),'thump',-17],[T(76),'ding0',-16],[T(77),'ding1',-16],[T(79),'ding2',-16],[T(81),'bell',-19]]
for j in range(8): X.append([T(0)+.1+j*.12,'key',-21])
for j in range(8): X.append([T(9)+j*.08,'tick',-22])
for j in range(10): X.append([T(28)+j*.08,'tick',-22])
build([('conti',0),('bin',4),('pantry',14),('year',22),('crates',33),('gest',47),('build',68),('payoff',81),('cta',91)],
 [2,3,6,9,12,13,15,21,23,28,32,35,38,44,46,48,50,56,58,62,64,67,70,74,76,77,79,84,87,90],VFX,X,'DISPENSA',dur,logo_i=90)
