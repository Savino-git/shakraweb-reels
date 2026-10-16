import sys,json; sys.path.insert(0,'..'); from tlcommon import build
W=json.load(open('words.json')); T=lambda i:W[i][0]; E=lambda i:W[i][2]
dur=float(sys.argv[1])
VFX=[('radio',T(10)-.02,E(11)+.03),('deep',T(15)-.01,E(15)+.02,-4),('high',T(55)-.01,E(56)+.02,5),
     ('swell',T(67)),('echo',T(68),E(68)),('mute',E(83),T(84)),('swell',T(84)),('echo',T(86),E(86))]
X=[[T(14),'stamp',-12],[T(21),'blip',-15],[T(23),'blip',-15],[T(25),'pop2',-15],[T(26),'scan',-19],[T(37),'cash',-15],
   [T(40),'send',-15],[T(44),'ding',-14],[T(52),'scratch',-14],[T(56),'pop2',-14],[T(64),'thump',-13],[T(8),'scratch',-18]]
for j,i in enumerate((71,72,75,76)): X.append([T(i),'ding%d'%j,-17])
build([('before',0),('after',16),('rotate',26),('quote',38),('nights',45),('config',61),('payoff',77),('cta',87)],
 [5,8,10,11,15,19,21,23,25,28,30,32,37,42,44,50,53,56,64,65,67,72,76,86],VFX,X,'3D',dur,logo_i=86)
