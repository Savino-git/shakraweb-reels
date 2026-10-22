import sys,json; sys.path.insert(0,'..'); from tlcommon import build
W=json.load(open('words.json'))
W[12][1]='WhatsApp:'
json.dump(W,open('words.json','w'),ensure_ascii=False)
T=lambda i:W[i][0]; E=lambda i:W[i][2]
dur=float(sys.argv[1])
VFX=[('radio',T(13)-.02,E(15)+.03),('high',T(30)-.01,E(30)+.02,4),('mute',E(30),T(31)),('mute',E(39),T(40)),('mute',E(79),T(80)),('mute',E(89),T(90))]
X=[[T(0),'thump',-13],[T(5),'bell',-19],[T(13),'blip',-15],[T(18),'tick',-17],[T(22),'send',-15],[T(23),'alert',-17],
   [T(35),'whoosh',-15],[T(39)-.02,'stamp',-11],[T(40),'scan',-18],[T(47),'pop2',-15],[T(48),'blip',-15],[T(49),'ding1',-15],
   [T(53),'send',-15],[T(54),'send',-15],[T(57),'send',-15],[T(61),'ding2',-14],[T(65),'thump',-15],[T(68)+.7,'cash',-14],[T(69),'ding',-15],
   [T(73),'ding0',-16],[T(75),'ding1',-16],[T(76),'ding2',-16],[T(77),'ding3',-16],[T(78),'ding',-15]]
for j in range(9): X.append([T(68)+j*.075,'tick',-22])
build([('night',0),('late',16),('gone',31),('bot',40),('chat',53),('sell',65),('all',70),('payoff',80),('cta',90)],
 [3,5,7,12,15,18,20,23,25,28,32,35,37,39,41,43,47,48,49,53,54,57,58,61,64,67,69,70,73,75,76,77,78,83,89],VFX,X,'PALESTRA',dur,logo_i=89)
