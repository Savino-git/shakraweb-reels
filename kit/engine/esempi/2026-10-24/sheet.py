from PIL import Image,ImageDraw;import os,sys
fs=sorted(os.listdir('shots'),key=lambda f:float(f[:-4]));n=len(fs);cols=6;rows=(n+cols-1)//cols
S=Image.new('RGB',(cols*270,rows*500),'white');d=ImageDraw.Draw(S)
for k,f in enumerate(fs):S.paste(Image.open('shots/'+f).resize((270,480)),((k%cols)*270,(k//cols)*500+20));d.text(((k%cols)*270+5,(k//cols)*500+3),f,fill='black')
S.save('sheet.jpg',quality=85)
