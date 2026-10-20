import sys,json; sys.path.insert(0,'..'); from tlcommon import build
W=json.load(open('words.json'))
for i,s in ((0,'Tre'),(58,'risponde'),(59,'subito,'),(82,'notte'),(18,'sito:'),(63,'24,'),(48,'giorno:'),(33,'e'),(70,'agenda.'),(78,'gestionale.')): W[i][1]=s
json.dump(W,open('words.json','w'),ensure_ascii=False)
T=lambda i:W[i][0]; E=lambda i:W[i][2]
dur=float(sys.argv[1])
VFX=[('radio',T(19)-.02,E(23)+.03),('high',T(45)-.01,E(46)+.02,4),('mute',E(26),T(27)),('mute',E(52),T(53)),('mute',E(78),T(79))]
X=[[T(0),'thump',-13],[T(5),'pop2',-16],[T(7),'scratch',-16],[T(10),'stamp',-13],[T(12),'ding',-17],[T(19),'blip',-15],[T(25),'alert',-15],
   [T(27),'stamp',-13],[T(31),'ding',-16],[T(34),'scratch',-15],[T(39),'alert',-16],[T(40),'stamp',-13],[T(45),'glitch',-17],
   [T(49),'pop2',-16],[T(50),'pop2',-16],[T(52),'pop2',-16],[T(54),'scan',-18],[T(59),'send',-15],[T(60),'ding1',-15],[T(65),'stamp',-13],[T(70),'ding2',-15],
   [T(71),'blip',-15],[T(74),'ding3',-15]]
for j in range(10): X.append([T(31)+j*.05,'tick',-22])
build([('intro',0),('one',10),('two',27),('three',40),('bot',53),('drive',64),('link',71),('payoff',79),('cta',89)],
 [0,5,7,9,10,12,14,18,23,25,26,27,31,32,34,39,40,43,45,49,50,52,54,59,60,63,67,68,70,71,78,82,88],VFX,X,'CHAT',dur,logo_i=88)
