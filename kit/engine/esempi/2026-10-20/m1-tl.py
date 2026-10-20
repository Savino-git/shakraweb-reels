import sys,json; sys.path.insert(0,'..'); from tlcommon import build
W=json.load(open('words.json'))
for i,s in ((10,'home page?'),(14,'clicca,'),(25,'chiude.'),(38,'campagna.'),(33,'page|'),(8,'tutti|'),(21,'staff|'),(54,'prenota.'),(66,'pagine.'),(71,'artificiale.')): W[i][1]=s
json.dump(W,open('words.json','w'),ensure_ascii=False)
T=lambda i:W[i][0]; E=lambda i:W[i][2]
dur=float(sys.argv[1])
VFX=[('high',T(24)-.01,E(25)+.02,5),('mute',E(29),T(30)),('mute',E(73),T(74))]
X=[[T(0),'thump',-13],[T(4),'cash',-16],[T(10),'alert',-17],[T(15),'glitch',-17],[T(23),'stamp',-12],[T(25),'scratch',-15],
   [T(26),'cash',-15],[T(28),'stamp',-12],[T(30),'pop2',-15],[T(32),'shutter',-15],[T(40),'ding0',-16],[T(42),'ding1',-16],[T(48),'cash',-15],
   [T(54),'blip',-13],[T(54)+.12,'ding2',-15],[T(57),'scan',-19],[T(59),'ding',-15],[T(72),'stamp',-12],[T(76),'bell',-18]]
for j in range(10): X.append([T(16)+j*.06,'tick',-22])
for i in (67,68,69,70): X.append([T(i),'pop2',-17])
build([('ads',0),('before',11),('zero',26),('landing',30),('offer',39),('more',55),('all',60),('payoff',74),('cta',84)],
 [1,4,10,16,21,23,25,26,28,29,30,32,33,40,42,48,52,54,57,59,61,67,68,69,72,76,83],VFX,X,'PAGINA',dur,logo_i=83)
