import sys,json; sys.path.insert(0,'..'); from tlcommon import build
W=json.load(open('words.json'))
for i,s in ((2,"un'impresa"),(67,'Web'),(69,'siti,'),(37,'telefono,'),(43,'soli,'),(74,'artificiale:'),(75,'qualsiasi'),(52,'pronto,'),(38,'i')): W[i][1]=s
json.dump(W,open('words.json','w'),ensure_ascii=False)
T=lambda i:W[i][0]; E=lambda i:W[i][2]
dur=float(sys.argv[1])
VFX=[('high',T(21)-.01,E(22)+.02,4),('mute',E(22),T(23)),('mute',E(56),T(57)),('mute',E(76),T(77)),('mute',E(86),T(87))]
X=[[T(0),'thump',-13],[T(3),'pop2',-15],[T(7),'tick',-16],[T(13),'key',-18],[T(14),'key',-18],[T(16),'key',-18],[T(22),'glitch',-16],[T(22),'alert',-17],
   [T(27),'blip',-15],[T(28),'stamp',-12],[T(33),'ding0',-15],[T(35),'shutter',-14],[T(35)+.1,'ding1',-15],[T(41),'whoosh',-18],
   [T(46),'shutter',-17],[T(48),'key',-18],[T(49),'key',-18],[T(50),'key',-18],[T(52),'ding2',-14],[T(55),'stamp',-12],[T(59),'pop2',-15],[T(65),'pop2',-15],
   [T(69),'ding0',-16],[T(70),'ding1',-16],[T(71),'ding2',-16],[T(73),'ding3',-16],[T(75),'ding',-15]]
for j in range(8): X.append([T(41)+j*.07,'tick',-22])
build([('luca',0),('late',4),('sw',23),('app',30),('mat',38),('quote',44),('sofa',57),('all',66),('payoff',77),('cta',87)],
 [0,3,5,7,13,16,20,22,27,29,31,33,35,37,39,41,46,49,52,55,58,60,65,66,69,70,71,73,75,80,86],VFX,X,'CANTIERE',dur,logo_i=86)
