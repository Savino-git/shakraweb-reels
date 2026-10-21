import sys,json; sys.path.insert(0,'..'); from tlcommon import build
W=json.load(open('words.json'))
for i,s in ((9,'11'),(42,'e|'),(15,'rispondi:'),(22,'Complimenti:'),(74,'Web'),(78,'agende:'),(11,'sera,'),(44,'notte,'),(33,'online,')): W[i][1]=s
json.dump(W,open('words.json','w'),ensure_ascii=False)
T=lambda i:W[i][0]; E=lambda i:W[i][2]
dur=float(sys.argv[1])
VFX=[('radio',T(16)-.02,E(21)+.03),('high',T(22)-.01,E(22)+.02,5),('mute',E(21),T(22)),('mute',E(85),T(86)),('mute',E(95),T(96))]
X=[[T(0),'thump',-13],[T(9),'tick',-18],[T(12),'bell',-19],[T(18),'blip',-16],[T(26),'stamp',-12],[T(29),'ding',-16],[T(29)+.15,'stamp',-12],
   [T(33),'pop2',-15],[T(36),'blip',-14],[T(39),'ding1',-15],[T(41),'pop2',-15],[T(44),'pop2',-15],[T(47),'send',-15],[T(52),'blip',-15],[T(56),'ding2',-15],
   [T(61),'pop2',-15],[T(66),'scratch',-14],[T(79),'ding0',-16],[T(80),'ding1',-16],[T(81),'ding2',-16],[T(82),'ding3',-16],[T(84),'ding',-15]]
for j in range(8): X.append([T(68)+j*.07,'tick',-22])
build([('night',0),('phone',12),('lost',22),('online',30),('day',40),('remind',45),('work',59),('all',72),('payoff',86),('cta',96)],
 [1,7,9,11,16,17,22,26,29,32,33,39,41,44,47,49,52,56,58,61,66,73,79,80,81,82,84,89,95],VFX,X,'PRENOTA',dur,logo_i=95)
