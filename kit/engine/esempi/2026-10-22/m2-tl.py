import sys,json; sys.path.insert(0,'..'); from tlcommon import build
W=json.load(open('words.json'))
W[4][1]='solo'
json.dump(W,open('words.json','w'),ensure_ascii=False)
T=lambda i:W[i][0]; E=lambda i:W[i][2]
dur=float(sys.argv[1])
VFX=[('high',T(9)-.01,E(9)+.02,4),('mute',E(9),T(10)),('mute',E(43),T(44)),('mute',E(93),T(94))]
X=[[T(0),'thump',-13],[T(6),'pop2',-15],[T(10),'stamp',-10],[T(10),'glitch',-16],[T(17),'ding0',-16],[T(17)+.08,'ding1',-17],[T(17)+.16,'ding2',-17],
   [T(23),'blip',-16],[T(27),'scratch',-15],[T(40)-.02,'stamp',-12],[T(47),'scan',-18],
   [T(54),'pop2',-14],[T(56),'pop2',-14],[T(57),'pop2',-14],[T(58),'ding1',-15],[T(59),'ding2',-15],[T(63),'whoosh',-16],[T(70)+.9,'cash',-14],
   [T(75),'send',-15],[T(77),'blip',-15],[T(79),'ding',-14],[T(86),'ding0',-16],[T(87),'ding1',-16],[T(89),'ding2',-16],[T(90),'ding3',-16]]
for j in range(10): X.append([T(34)+j*.1,'tick',-21])
for j in range(10): X.append([T(70)+j*.09,'tick',-22])
build([('myth',0),('false',10),('old',20),('config',44),('price',60),('lead',73),('all',84),('cta',94)],
 [1,2,7,9,10,17,19,25,29,32,36,40,43,46,47,50,54,56,57,58,59,62,63,68,70,77,79,82,84,89,91],VFX,X,'FINESTRA',dur,logo_i=84)
