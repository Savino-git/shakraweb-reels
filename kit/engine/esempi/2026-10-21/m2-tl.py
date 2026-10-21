import sys,json; sys.path.insert(0,'..'); from tlcommon import build
W=json.load(open('words.json'))
for i,s in ((3,'cantina:'),(17,'100.'),(56,'clic,'),(81,'Web'),(87,'aggiunge'),(44,'vendite.'),(18,'Dieci'),(19,'ordini.'),(36,'trenta.'),(73,'traffico:'),(79,'vende.'),(6,'al'),(7,'mese|')): W[i][1]=s
json.dump(W,open('words.json','w'),ensure_ascii=False)
T=lambda i:W[i][0]; E=lambda i:W[i][2]
dur=float(sys.argv[1])
VFX=[('high',T(45)-.01,E(45)+.02,4),('mute',E(19),T(20)),('mute',E(44),T(45)),('mute',E(67),T(68)),('mute',E(79),T(80))]
X=[[T(0),'thump',-13],[T(2),'cash',-16],[T(13),'ding',-15],[T(18),'alert',-16],[T(32),'pop2',-14],[T(36),'cash',-14],[T(38),'pop2',-16],[T(40),'pop2',-16],[T(42),'cash',-14],
   [T(46),'ding0',-16],[T(48),'ding1',-16],[T(53),'ding2',-16],[T(59),'send',-15],[T(65),'blip',-15],[T(73),'scratch',-14],[T(77),'cash',-16],[T(79),'stamp',-12],
   [T(88),'ding0',-16],[T(89),'ding1',-16],[T(91),'ding2',-16]]
for j in range(10): X.append([T(4)+j*.06,'tick',-22])
for j in range(8): X.append([T(36)+j*.06,'tick',-22])
build([('wine',0),('visits',4),('boost',20),('triple',37),('how',45),('recover',57),('sell',68),('all',80),('cta',93)],
 [3,4,5,10,13,15,17,18,19,23,24,32,35,36,42,44,46,48,53,59,60,63,73,77,79,80,88,89,91],VFX,X,'VENDITE',dur,logo_i=80)
