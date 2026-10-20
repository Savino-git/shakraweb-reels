import sys,json; sys.path.insert(0,'..'); from tlcommon import build
W=json.load(open('words.json'))
for i,s in ((4,'da'),(17,'conto.'),(22,'notte,'),(29,'aperta,'),(40,'Domotic|'),(44,'telefono:'),(48,'telecamere.'),(54,'chiusura,'),(62,'va.'),(72,'domotica:'),(77,'artificiale.')): W[i][1]=s
json.dump(W,open('words.json','w'),ensure_ascii=False)
T=lambda i:W[i][0]; E=lambda i:W[i][2]
dur=float(sys.argv[1])
VFX=[('high',T(5)-.01,E(7)+.02,5),('mute',E(8),T(9)),('mute',E(36),T(37)),('mute',E(77),T(78))]
X=[[T(0),'thump',-13],[T(8),'stamp',-11],[T(8)+.05,'scratch',-15],[T(13),'pop2',-15],[T(15),'cash',-15],[T(18),'blip',-15],[T(23),'alert',-17],
   [T(31),'scratch',-15],[T(35),'alert',-17],[T(39),'pop2',-15],[T(45),'ding0',-16],[T(46),'ding1',-16],[T(47),'ding2',-16],[T(48),'ding3',-16],
   [T(51),'blip',-15],[T(52),'blip',-15],[T(58),'alert',-15],[T(64),'cash',-15],[T(66),'ding',-15]]
for i in (73,74,75,76): X.append([T(i),'stamp',-17])
for j in range(6): X.append([T(15)+j*.08,'tick',-22])
build([('villa',0),('shop',9),('bulb',18),('shutter',30),('app',37),('sched',49),('save',63),('all',67),('brand',78),('cta',80)],
 [1,5,7,8,13,17,18,22,23,29,31,39,40,44,45,46,47,48,51,52,58,64,66,73,74,75,76,78],VFX,X,'LUCE',dur,logo_i=78)
