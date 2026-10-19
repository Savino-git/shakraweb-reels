import sys,json; sys.path.insert(0,'..'); from tlcommon import build
W=json.load(open('words.json'))
for i,s in ((9,'20'),(25,'a richiesta.'),(64,'Tu'),(14,'giorno.'),(17,'ognuna:'),(39,'sito,'),(2,'conti,'),(28,'ore|'),(36,'personalizzatore|'),(42,'carica|'),(52,"l'anteprima|"),(55,'reale|'),(70,'file|'),(74,'bozze|'),(59,'prezzo|')): W[i][1]=s
json.dump(W,open('words.json','w'),ensure_ascii=False)
T=lambda i:W[i][0]; E=lambda i:W[i][2]
dur=float(sys.argv[1])
VFX=[('radio',T(18)-.02,E(23)+.03),('mute',E(33),T(34)),('high',T(73)-.01,E(77)+.02,4),('mute',E(77),T(78))]
X=[[T(0),'thump',-13],[T(5),'pop2',-16],[T(9),'alert',-17],[T(18),'blip',-16],[T(20),'blip',-16],[T(21),'blip',-16],[T(23),'blip',-16],
   [T(27),'cash',-15],[T(31),'stamp',-12],[T(36),'whoosh',-15],[T(42),'shutter',-15],[T(45),'stamp',-13],[T(47),'pop2',-16],[T(48),'pop2',-16],[T(50),'pop2',-16],
   [T(52),'scan',-19],[T(57),'cash',-14],[T(61),'ding',-15],[T(65),'send',-15],[T(70),'ding',-15],[T(73),'stamp',-11],[T(74),'scratch',-15]]
for j in range(8): X.append([T(24)+j*.1,'tick',-21])
for j in range(5): X.append([T(59)+j*.08,'key',-19])
build([('intro',0),('inbox',9),('hours',24),('config',34),('preview',51),('price',58),('order',64),('payoff',78),('cta',88)],
 [2,5,7,9,12,18,20,21,23,24,27,28,33,36,39,45,47,48,50,52,55,57,59,61,67,72,73,74,81,84,87],VFX,X,'LOGO',dur,logo_i=87)
