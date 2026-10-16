import sys,json; sys.path.insert(0,'..'); from tlcommon import build
W=json.load(open('words.json')); T=lambda i:W[i][0]; E=lambda i:W[i][2]
dur=float(sys.argv[1])
VFX=[('radio',T(6)-.02,E(10)+.03),('mute',E(36),T(37)),('deep',T(37)-.01,E(37)+.02,-4),('swell',T(43)),('echo',T(44),E(44)),
     ('high',T(67)-.01,E(69)+.02,5),('deep',T(71)-.01,E(71)+.02,-4)]
X=[[T(37),'scratch',-14],[T(47),'blip',-15],[T(50),'ding',-15],[T(53),'send',-15],[T(55),'blip',-16],[T(60),'scratch',-14],[T(64),'ding',-14],[T(71),'scratch',-14]]
for j in range(5): X.append([T(0)+j*.12,'key',-19])
for j in range(6): X.append([T(7)+j*.08,'tick',-22])
X.append([T(15)+.5,'cash',-16])
for j in range(3): X.append([T(22)+j*.2,'thump',-15])
for j in range(6): X.append([T(33)+j*.08,'tick',-22])
X.append([T(33)+.55,'cash',-16])
for j,i in enumerate((82,83,84,85)): X.append([T(i),'ding%d'%j,-17])
build([('calc',0),('phone',4),('noshow',19),('booking',38),('reminder',53),('scissors',67),('all',72),('cta',87)],
 [2,3,7,10,15,16,22,28,33,37,41,43,48,50,55,57,64,66,69,71,82,83,84,85],VFX,X,'AGENDA',dur,logo_i=81)
