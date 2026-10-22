import sys,json; sys.path.insert(0,'..'); from tlcommon import build
W=json.load(open('words.json'))
json.dump(W,open('words.json','w'),ensure_ascii=False)
T=lambda i:W[i][0]; E=lambda i:W[i][2]
dur=float(sys.argv[1])
VFX=[('high',T(9)-.01,E(9)+.02,4),('radio',T(19)-.02,E(21)+.03),('mute',E(27),T(28)),('mute',E(87),T(88)),('mute',E(97),T(98))]
X=[[T(0),'thump',-13],[T(3),'pop2',-15],[T(8),'blip',-16],[T(15),'shutter',-16],[T(16),'shutter',-16],[T(17),'shutter',-16],[T(19),'bell',-19],
   [T(30),'glitch',-15],[T(30),'stamp',-12],[T(35),'scan',-18],[T(38),'pop2',-15],[T(43),'pop2',-15],
   [T(45),'send',-15],[T(53),'send',-15],[T(57),'send',-15],[T(64),'alert',-17],[T(66),'blip',-15],[T(68)+.6,'cash',-15],[T(70)+.6,'cash',-15],[T(71)+.6,'ding2',-15],
   [T(77),'ding0',-16],[T(84),'ding1',-16],[T(85),'ding2',-16],[T(87),'ding3',-16]]
for j in range(8): X.append([T(68)+j*.07,'tick',-22])
build([('ask',0),('excel',10),('problem',22),('ai',31),('chat',45),('answer',61),('all',72),('payoff',88),('cta',98)],
 [2,4,8,9,15,17,21,23,27,30,35,36,38,44,46,49,52,56,59,60,64,66,67,70,71,72,77,84,85,87,91,97],VFX,X,'DATI',dur,logo_i=97)
