const ST=n=>SC.find(s=>s.name===n).t0;
const SP={leak:['navy','night','navy2'],search:['white','blue','white','blue'],notyou:['red','grey','red','grey'],after:['green','teal','green','mint','green'],
 ring:['blue','violet','blue','pink'],calc:['orange','pink','orange'],brand:['night'],all:['violet','blue','pink','violet'],cta:['orange','violet','green','navy']};
function labelTex(s,w=256,h=256,col='#fff',size=150,bg=null){const st=texCanvas(w,h,(x)=>{x.clearRect(0,0,w,h);if(bg){x.fillStyle=bg;x.fillRect(0,0,w,h)}x.fillStyle=col;x.font='900 '+size+'px Inter';x.textAlign='center';x.fillText(s,w/2,h*.7)});st.redraw();return st}
function plane(st,w,h){return new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:st.tx,transparent:true,toneMapped:false}))}
function starShape(r1,r2){const s=new THREE.Shape();for(let i=0;i<10;i++){const a=Math.PI/2+i*Math.PI/5;const r=i%2?r2:r1;const x=Math.cos(a)*r,y=Math.sin(a)*r;i?s.lineTo(x,y):s.moveTo(x,y)}s.closePath();return s}
// broken pipe leaking at night
{ const g=new THREE.Group();const pm=()=>M(0xc9ced9,{metalness:1,roughness:.2});
  const p1=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,4.2,40),pm());p1.rotation.z=Math.PI/2;p1.position.set(-.6,.9,0);g.add(p1);
  const elb=new THREE.Mesh(new THREE.TorusGeometry(.8,.42,24,40,Math.PI/2),pm());elb.position.set(1.5,.1,0);g.add(elb);
  const p2=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,2.2,40),pm());p2.position.set(2.3,-1,0);g.add(p2);
  [-2.2,.9].forEach(x=>{const r=new THREE.Mesh(new THREE.CylinderGeometry(.52,.52,.3,40),M(0xb07a2a,{metalness:1,roughness:.25}));r.rotation.z=Math.PI/2;r.position.set(x,.9,0);g.add(r)});
  const valve=new THREE.Mesh(new THREE.TorusGeometry(.45,.09,12,40),M(0xff2e4d));valve.rotation.x=Math.PI/2;valve.position.set(-1.4,1.65,0);g.add(valve);
  const stem=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,.5,12),pm());stem.position.set(-1.4,1.4,0);g.add(stem);
  const drops=[];const wm=M(0x3aa8ff,{transparent:true,opacity:.85,roughness:.05});
  for(let i=0;i<7;i++){const d=new THREE.Mesh(new THREE.SphereGeometry(.16,20,16),wm);d.scale.y=1.4;g.add(d);drops.push(d)}
  const pud=new THREE.Mesh(new THREE.CylinderGeometry(1.4,1.4,.04,48),wm);pud.position.set(0,-2.5,0);g.add(pud);
  const moon=new THREE.Group();const ms=new THREE.Mesh(new THREE.SphereGeometry(.55,40,30),M(0xfff1b8,{emissive:0xffd66b,emissiveIntensity:.35,roughness:.6}));moon.add(ms);
  const ct=new THREE.Mesh(new THREE.SphereGeometry(.5,40,30),M(0x0d1033,{roughness:.6}));ct.position.set(.28,.16,.28);moon.add(ct);moon.position.set(-2.3,2.5,-1);g.add(moon);sh(g);
  add3('leak',g,(t)=>{const p=pop(t,.05,.45);g.scale.setScalar(.72*Math.max(.001,p.s));g.rotation.set(.2,-.3+Math.sin(t*1.1)*.25,0);g.position.y=Math.sin(t*1.5)*.06+.2;
    const sp=t>=T(2)-.05;drops.forEach((d,i)=>{const ph=((t*1.4+i/7)%1);d.visible=sp;d.position.set(.15+(hash(i)-.5)*.3,.45-ph*2.9,.1);d.scale.setScalar(.7+.5*Math.sin(ph*3));d.scale.y=1.4});
    pud.scale.setScalar(Math.max(.001,clamp((t-T(2))/3)));valve.rotation.z=t*.5})}
// retro brick phone 1995
{ const g=new THREE.Group();const body=new THREE.Mesh(new RoundedBoxGeometry(1.6,3.6,.7,6,.22),M(0x3a3f52,{roughness:.45}));g.add(body);
  const ant=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,1.4,16),M(0x10131f));ant.position.set(.5,2.4,0);g.add(ant);
  const tip=new THREE.Mesh(new THREE.SphereGeometry(.15,16,12),M(0xff2e4d));tip.position.set(.5,3.1,0);g.add(tip);
  const st=texCanvas(256,160,(x)=>{x.fillStyle='#9bbf5a';x.fillRect(0,0,256,160);x.fillStyle='#1d2a0e';x.font='900 70px monospace';x.fillText('1995',30,105)});st.redraw();
  const scr=plane(st,1.2,.75);scr.position.set(0,.95,.36);g.add(scr);
  const keys=[];for(let r=0;r<4;r++)for(let c=0;c<3;c++){const k=new THREE.Mesh(new RoundedBoxGeometry(.34,.24,.12,2,.05),M(0xc9ced9,{roughness:.3}));k.position.set(-.42+c*.42,-.1-r*.36,.36);g.add(k);keys.push(k)}sh(g);
  add3('brick',g,(t)=>{const p=pop(t,ST('notyou')+.08,.45);g.scale.setScalar(.82*Math.max(.001,p.s));g.rotation.set(.1,.4+Math.sin(t*1.1)*.35,Math.sin(t*.8)*.06);g.position.y=Math.sin(t*1.5)*.07;
    if(t>=T(20)&&t<T(20)+.35)g.position.x=(hash(t*50)-.5)*.25;else g.position.x=0;tip.material.emissive=new THREE.Color(Math.floor(t*3)%2?0xff2e4d:0x000000)})}
// map pin + orbiting stars
{ const g=new THREE.Group();const red=M(0xff2e4d);const pinG=new THREE.Group();
  const head=new THREE.Mesh(new THREE.SphereGeometry(1.1,48,36),red);head.position.y=.9;pinG.add(head);
  const cone=new THREE.Mesh(new THREE.ConeGeometry(.82,1.9,48),red);cone.rotation.x=Math.PI;cone.position.y=-.55;pinG.add(cone);
  const dot=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,.2,40),M(0xffffff));dot.rotation.x=Math.PI/2;dot.position.set(0,.9,1.02);pinG.add(dot);g.add(pinG);
  const stars=[];const sg=new THREE.ExtrudeGeometry(starShape(.36,.15),{depth:.12,bevelEnabled:true,bevelThickness:.04,bevelSize:.03,bevelSegments:2});sg.center();
  for(let i=0;i<5;i++){const s=new THREE.Mesh(sg,gold());g.add(s);stars.push(s)}
  const base=new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,.08,48),M(0x00a676,{transparent:true,opacity:.5}));base.position.y=-1.55;g.add(base);sh(g);
  add3('pin',g,(t)=>{const p=pop(t,ST('after')+.08,.45);g.scale.setScalar(.8*Math.max(.001,p.s));g.rotation.set(.12,Math.sin(t*1.1)*.3,0);
    pinG.position.y=.25+Math.abs(Math.sin(t*Math.PI*2/(BEAT*2)))*.25;pinG.rotation.y=t*.8;
    stars.forEach((s,i)=>{const k=pop(t,T(43)-.05+i*.08,.3);s.visible=k.p>0;const a=t*1.2+i*Math.PI*2/5;s.position.set(Math.cos(a)*2.1,.6+Math.sin(a*2)*.15,Math.sin(a)*1.2);s.scale.setScalar(Math.max(.001,k.s));s.rotation.y=t*2})})}
// smartphone ringing
{ const scr=(x)=>{const gr=x.createLinearGradient(0,0,0,1024);gr.addColorStop(0,'#1d4bff');gr.addColorStop(1,'#0d1033');x.fillStyle=gr;x.fillRect(0,0,512,1024);
    x.fillStyle='rgba(255,255,255,.75)';x.font='700 34px Inter';x.textAlign='center';x.fillText('Chiamata in arrivo',256,170);
    x.beginPath();x.arc(256,340,95,0,7);x.fillStyle='#ff9f43';x.fill();x.fillStyle='#fff';x.font='900 90px Inter';x.fillText('MB',256,372);
    x.font='900 46px Inter';x.fillText('Mario Bianchi',256,520);x.font='600 32px Inter';x.fillStyle='rgba(255,255,255,.8)';x.fillText('"Tubo rotto in cucina!"',256,575);
    x.beginPath();x.arc(140,860,62,0,7);x.fillStyle='#ff2e4d';x.fill();x.beginPath();x.arc(372,860,62,0,7);x.fillStyle='#25d366';x.fill();
    x.fillStyle='#fff';x.font='800 28px Inter';x.fillText('Rifiuta',140,965);x.fillText('Rispondi',372,965);x.textAlign='left'};
  const g=phone(0x2a2e40,scr);const rings=[];for(let i=0;i<3;i++){const r=new THREE.Mesh(new THREE.TorusGeometry(1.9,.05,8,80),new THREE.MeshBasicMaterial({color:0x2EE59D,transparent:true,toneMapped:false}));g.add(r);rings.push(r)}
  add3('ring',g,(t)=>{const p=pop(t,ST('ring')+.08,.45);g.scale.setScalar(.95*Math.max(.001,p.s));g.rotation.set(.05,-.3+Math.sin(t*1.1)*.25,0);g.position.y=Math.sin(t*1.5)*.07;
    const on=t>=T(56)-.03;if(on){const k=(t-T(56))*28;g.rotation.z=Math.sin(k)*.07}else g.rotation.z=0;
    rings.forEach((r,i)=>{const q=on?((t-T(56))*1.3+i/3)%1:0;r.visible=on;r.scale.setScalar(.8+q*1.2);r.material.opacity=1-q})})}
// wrench + coin
{ const g=new THREE.Group();const mt=M(0xc9ced9,{metalness:1,roughness:.18});
  const handle=new THREE.Mesh(new RoundedBoxGeometry(.6,3.4,.3,4,.12),mt);g.add(handle);
  const hs=new THREE.Shape();hs.absarc(0,0,.75,0,Math.PI*2,false);const hole=new THREE.Path();hole.moveTo(-.3,.9);hole.lineTo(.3,.9);hole.lineTo(.3,.05);hole.lineTo(-.3,.05);hole.closePath();hs.holes.push(hole);
  const hg=new THREE.ExtrudeGeometry(hs,{depth:.3,bevelEnabled:true,bevelThickness:.04,bevelSize:.04,bevelSegments:2});hg.translate(0,0,-.15);const hd=new THREE.Mesh(hg,mt);hd.position.y=1.9;g.add(hd);
  const grip=new THREE.Mesh(new RoundedBoxGeometry(.7,1.5,.36,4,.15),M(0xff5e00,{roughness:.4}));grip.position.y=-.9;g.add(grip);
  const coins=[];for(let i=0;i<5;i++){const c=new THREE.Mesh(new THREE.CylinderGeometry(.55,.55,.14,40),gold());c.position.set(1.7,-1.9+i*.17,.2);g.add(c);coins.push(c)}sh(g);
  add3('wrench',g,(t)=>{const p=pop(t,ST('calc')+.08,.45);g.scale.setScalar(.72*Math.max(.001,p.s));g.rotation.set(.1,Math.sin(t*1.1)*.4,-.5+Math.sin(t*1.4)*.08);g.position.y=Math.sin(t*1.5)*.07;
    coins.forEach((c,i)=>{const k=pop(t,T(67)+i*.09,.3);c.visible=k.p>0;c.scale.setScalar(Math.max(.001,k.s))})})}
// four floating blocks: WEB GEST APP AI
{ const g=new THREE.Group();const cols=[0x2d5bff,0xffc53d,0xff3d7f,0x6a2cf5],lab=['WEB','GEST','APP','AI'];const bl=[];
  lab.forEach((l,i)=>{const b=new THREE.Group();const m=new THREE.Mesh(new RoundedBoxGeometry(1.5,1.5,1.5,5,.25),M(cols[i]));b.add(m);
    const lp=plane(labelTex(l,256,256,'#fff',l.length>3?78:96),1.2,1.2);lp.position.z=.76;b.add(lp);b.position.set((i%2?1:-1)*1.05,(i<2?1:-1)*1.0,0);g.add(b);bl.push(b)});sh(g);
  add3('blocks',g,(t)=>{const p=pop(t,ST('all')+.05,.4);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(-.15,-.35+Math.sin(t*1.1)*.35,0);
    const tt=[T(76),T(77),T(78),T(80)];bl.forEach((b,i)=>{const k=pop(t,tt[i]-.04,.35);b.visible=k.p>0;b.scale.setScalar(Math.max(.001,k.s));b.position.z=Math.sin(t*2+i)*.15;b.rotation.y=Math.sin(t*1.5+i)*.25})})}
const BOX={leak:[540,980,780],leakS:[540,800,470],brick:[540,950,720],pin:[540,830,560],ring:[540,1080,900],wrench:[540,810,500],blocks:[540,980,680]};
function stars5(x,y,size,n){for(let i=0;i<5;i++){const cx=x+i*size*1.1+size/2,cy=y-size*.38,r1=size*.5,r2=size*.21;ctx.beginPath();for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,r=k%2?r2:r1;k?ctx.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r):ctx.moveTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r)}ctx.closePath();ctx.fillStyle=i<n?'#ffb800':'#d5d9e4';ctx.fill()}}
const SCN={
 leak(t){render3D('leak',t,BOX.leak);const q=pop(t,T(5)-.05,.3);withT(540,1500,q.s,q.a,()=>pill('Ore 20:00',540,1500,{size:48,bg:'#fff',c:'#10131f'}))},
 search(t){render3D('leak',t,BOX.leakS);const c=pop(t,ST('search')+.05,.35);withT(540,1390,c.s,c.a,()=>{card(130,1110,820,560,{r:44});
   rr(170,1145,740,96,48);ctx.fillStyle='#f1f3f8';ctx.fill();ctx.font='900 46px Inter';const gc=['#4285f4','#ea4335','#fbbc05','#34a853'];txt('G',205,1210,{size:50,w:900,c:gc[Math.floor(t*4)%4]});
   const q='idraulico vicino a me';const k=Math.floor(q.length*clamp((t-T(12)+.05)/(E(15)-T(12)+.05)));txt(q.slice(0,k)+(Math.floor(t*4)%2&&k<q.length?'|':''),260,1208,{size:40,w:600,c:'#10131f'});
   const R=[['Idraulica Bianchi',5,'#2d5bff'],['Termoidraulica Verdi',4,'#00a676'],['Rossi Impianti',4,'#ff5e00']];
   R.forEach(([n,s,col],i)=>{const r=pop(t,T(18)-.05+i*.15,.3);withT(540,1320+i*115,r.s,r.a,()=>{avatar(225,1320+i*115,40,n[0],col,'#10131f');txt(n,285,1312+i*115,{size:38,w:800});stars5(285,1352+i*115,26,s);
     if(i<2){ctx.fillStyle='#eef0f6';ctx.fillRect(180,1375+i*115,720,3)}})})})},
 notyou(t){render3D('brick',t,BOX.brick);stampTxt('NON CI SEI',540,1430,t,T(20)+.05,'#fff',-.08,64);
   const q=pop(t,T(27)-.05,.3);withT(540,1610,q.s,q.a,()=>pill('Aspetti il passaparola…',540,1610,{size:42,bg:'#fff',c:'#10131f'}))},
 after(t){render3D('pin',t,BOX.pin);const c=pop(t,T(32)-.08,.35);withT(540,1440,c.s,c.a,()=>{card(140,1180,800,500,{r:44});
   avatar(220,1255,44,'R','#2d5bff','#13b4ff');txt('Idraulica Rossi',290,1250,{size:44,w:900});
   const sr=prog(t,T(43)-.05,.3);ctx.globalAlpha*=clamp(.25+sr);stars5(290,1295,30,5);txt('4,9 · 128 recensioni',470,1293,{size:28,w:700,c:'#6b7185'});ctx.globalAlpha=c.a;
   const rows=[['Scheda Google curata',T(33)],['Sito veloce',T(36)],['Recensioni in evidenza',T(43)]];
   rows.forEach(([s,tt],i)=>{const y=1390+i*90;const r=prog(t,tt-.05,.3);ctx.globalAlpha=c.a*clamp(r*3);check(215,y,28,prog(t,tt,.35));txt(s,265,y+14,{size:40,w:800});ctx.globalAlpha=c.a});
   const b=pop(t,T(41)-.05,.3);withT(745,1480,b.s,b.a,()=>{const pu=1+.04*Math.sin(t*9);withT(745,1480,pu,1,()=>pill('Chiama subito',745,1480,{size:32,bg:'#25d366',c:'#fff',pad:24}))})})},
 ring(t){render3D('ring',t,BOX.ring);const q=pop(t,T(50)-.05,.3);withT(540,1625,q.s,q.a,()=>pill('Stessa sera · ore 20:05',540,1625,{size:42,bg:'#fff',c:'#1d4bff'}))},
 calc(t){render3D('wrench',t,BOX.wrench);const c=pop(t,ST('calc')+.05,.35);withT(540,1380,c.s,c.a,()=>{card(140,1100,800,560,{r:44});
   const rows=[['Chiamate in più',3,'+',' / sett.',T(58)],['Settimane',4,'× ','',T(63)]];
   rows.forEach(([l,v,pre,suf,tt],i)=>{const y=1190+i*110;const r=prog(t,tt-.05,.25);ctx.globalAlpha=c.a*clamp(r*3);txt(l,190,y,{size:38,w:700,c:'#6b7185'});txt(pre+v+suf,890,y+4,{size:54,w:900,al:'right'});ctx.fillStyle='#eef0f6';ctx.fillRect(190,y+40,700,3);ctx.globalAlpha=c.a});
   const r=prog(t,T(65)-.05,.25);ctx.globalAlpha=c.a*clamp(r*3);txt('Lavori in più al mese',190,1440,{size:38,w:800,c:'#10131f'});
   const n=Math.round(12*eOut(prog(t,T(65),1.0)));txt('+'+n,540,1590,{size:130,w:900,c:'#00a676',al:'center'});ctx.globalAlpha=c.a})},
 brand(t){const q=pop(t,T(71)-.05,.25);if(t<T(73)-.05)withT(540,1000,q.s,q.a,()=>pill('Noi di…',540,1000,{size:60,bg:'#fff',c:'#10131f'}));if(t>=T(73)-.05)drawLogo(t,T(73)-.05,540,1020,760)},
 all(t){if(t<T(76)+.1)drawLogo(t,-10,540,1000,lerp(760,0.01,eOut(prog(t,T(76)-.1,.2))));render3D('blocks',t,BOX.blocks);const items=[['Siti',T(76)],['Gestionali',T(77)],['App',T(78)],['Intelligenza artificiale',T(80)]];
   items.forEach(([s,tt],i)=>{const x=i<2?(i?740:340):540,y=i<2?1420:(i===2?1530:1640);const q=pop(t,tt-.05,.3);withT(x,y,q.s,q.a,()=>pill(s,x,y,{size:42,bg:i===3?'#FFD60A':'#fff',c:'#10131f'}))});
   const z=pop(t,T(82)-.05,.3);if(t>=T(82)-.05)withT(540,1300,z.s,z.a,()=>pill('Qualsiasi cosa',540,1300,{size:44,bg:'#2EE59D',c:'#10131f'}))},
};
