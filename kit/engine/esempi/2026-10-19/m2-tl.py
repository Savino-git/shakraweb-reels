import sys,json; sys.path.insert(0,'..'); from tlcommon import build
W=json.load(open('words.json'))
T=lambda i:W[i][0]; E=lambda i:W[i][2]
for i,s in ((6,'scrive|'),(54,'caldi,'),(60,'bancone|'),(78,'essere|'),(80,'catena|'),(85,'qualcuno|'),(88,'faccia|'),(43,'decimo|')): W[i][1]=s
json.dump(W,open('words.json','w'),ensure_ascii=False)
dur=float(sys.argv[1])
VFX=[('high',T(13)-.01,E(16)+.02,5),('radio',T(53)-.02,E(57)+.03),('mute',E(62),T(63)),('mute',E(75),T(76))]
X=[[T(0),'thump',-13],[T(8),'blip',-15],[T(10),'pop2',-16],[T(16),'alert',-16],[T(20),'shutter',-15],[T(25),'blip',-15],
   [T(27),'ding0',-16],[T(33),'ding1',-16],[T(35),'cash',-15],[T(47),'stamp',-12],[T(49),'bell',-14],[T(52),'blip',-14],[T(62),'ding',-15],
   [T(66),'scratch',-15],[T(71),'ding',-16],[T(77),'stamp',-13],[T(80),'scratch',-15],[T(85),'send',-16]]
n=10
for j in range(n): X.append([T(39)+j*(T(43)-T(39))/n,'tick',-19])
for j in range(5): X.append([T(60)+j*.1,'pop',-20])
for j in range(5): X.append([T(73)+j*.08,'tick',-21])
build([('shop',0),('app',17),('order',23),('points',37),('notify',48),('result',63),('custom',76),('cta',91)],
 [0,3,8,12,16,20,25,27,33,35,38,40,43,47,49,52,54,62,63,66,67,71,75,80,83,90],VFX,X,'APP',dur,logo_i=90)
