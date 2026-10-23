import sys,json; sys.path.insert(0,'..'); from tlcommon import build
W=json.load(open('words.json'))
W[64][1]='sono|'
json.dump(W,open('words.json','w'),ensure_ascii=False)
T=lambda i:W[i][0]; E=lambda i:W[i][2]
dur=float(sys.argv[1])
VFX=[('radio',T(12)-.02,E(15)+.03),('high',T(30)-.01,E(30)+.02,4),('mute',E(30),T(31)),('mute',E(46),T(47)),('mute',E(85),T(86))]
X=[[T(0),'thump',-13],[T(2),'blip',-17],[T(5),'pop2',-15],[T(18),'ding0',-16],[T(18)+.15,'ding1',-16],[T(19),'ding2',-16],
   [T(20),'stamp',-11],[T(20),'glitch',-16],[T(27),'pop2',-15],[T(30),'blip',-15],[T(33),'ding0',-16],[T(36),'ding1',-16],[T(41),'pop2',-14],[T(43),'ding2',-16],
   [T(50),'pop2',-15],[T(56),'alert',-15],[T(56)+.35,'bell',-18],[T(58),'blip',-16],[T(63),'blip',-16],[T(65)+1.0,'cash',-14],
   [T(71),'pop2',-15],[T(76),'ding0',-16],[T(77),'ding1',-16],[T(78),'ding2',-16],[T(80),'ding3',-16],[T(82),'ding',-15]]
for j in range(10): X.append([T(12)+j*.12,'key',-22])
for j in range(10): X.append([T(65)+j*.1,'tick',-22])
build([('leak',0),('search',9),('notyou',20),('after',31),('ring',47),('calc',58),('brand',71),('all',75),('cta',86)],
 [2,8,12,19,20,22,25,27,30,31,33,37,41,43,49,53,56,57,58,67,68,73,76,77,78,80,82],VFX,X,'TROVAMI',dur,logo_i=73)
