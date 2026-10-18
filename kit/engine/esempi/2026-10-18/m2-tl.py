import sys,json; sys.path.insert(0,'..'); from tlcommon import build
W=json.load(open('words.json')); T=lambda i:W[i][0]; E=lambda i:W[i][2]
dur=float(sys.argv[1])
VFX=[('high',T(15)-.01,E(17)+.02,5),('mute',E(37),T(38)),('radio',T(26)-.02,E(30)+.03),('mute',E(84),T(85))]
X=[[T(0),'alert',-18],[T(10),'thump',-14],[T(15),'scratch',-17],[T(26),'stamp',-12],[T(29),'stamp',-11],
   [T(38),'whoosh',-15],[T(41),'stamp',-12],[T(44),'pop2',-15],[T(48),'send',-15],[T(48)+.2,'blip',-15],[T(51),'blip',-15],[T(51)+.2,'ding',-15],
   [T(57),'shutter',-16],[T(63),'bell',-12],[T(65),'blip',-16],[T(66),'blip',-16],[T(69),'pop2',-16],[T(70),'pop2',-16],
   [T(71),'thump',-13],[T(73),'ding',-14],[T(74),'scratch',-15]]
for j in range(3): X.append([T(11)+j*.12,'thump',-18])
for j in range(7): X.append([T(15)+j*.07,'tick',-22])
for j in range(5): X.append([T(35)+j*.25,'tick',-21])
for j in range(6): X.append([T(39)+j*.05,'tick',-21])
build([('mess',0),('lost',18),('race',31),('crm',42),('card',54),('remind',60),('nolost',71),('payoff',76),('cta',86)],
 [1,5,7,10,12,15,17,26,27,29,30,34,37,40,41,44,46,48,51,59,63,64,66,69,73,75,79,82,85],VFX,X,'CLIENTI',dur,logo_i=85)
