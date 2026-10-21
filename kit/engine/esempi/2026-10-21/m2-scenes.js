const ST=n=>SC.find(s=>s.name===n).t0;
function labelTex(s,w=256,h=256,col='#fff',size=150){const st=texCanvas(w,h,(x)=>{x.clearRect(0,0,w,h);x.fillStyle=col;x.font='900 '+size+'px Inter';x.textAlign='center';x.fillText(s,w/2,h*.7)});st.redraw();return st}
const SP={wine:['wood','red'],visits:['violet','navy2','violet','blue'],boost:['green','teal','green','mint','green'],triple:['orange','pink','orange'],
 how:['blue','teal','blue','violet'],recover:['pink','rose','pink','red'],sell:['night','navy','navy2'],all:['navy2','violet','blue','navy2'],cta:['blue','violet','green','navy']};
// wine bottle + glass
{ const g=new THREE.Group();const pts=[];const prof=[[0,-2.2],[.62,-2.2],[.66,-2.1],[.66,.2],[.6,.55],[.4,.85],[.22,1.05],[.2,1.9],[.24,2.0],[0,2.0]];
  prof.forEach(([r,y])=>pts.push(new THREE.Vector2(r,y)));
  const bot=new THREE.Mesh(new THREE.LatheGeometry(pts,56),M(0x3d0a1a,{metalness:.2,roughness:.08}));g.add(bot);
  const lab=texCanvas(512,256,(x)=>{x.fillStyle='#f6efe2';x.fillRect(0,0,512,256);x.fillStyle='#7a1030';x.font='900 64px Inter';x.textAlign='center';x.fillText('ROSSO',256,120);x.font='700 34px Inter';x.fillText('Riserva 2022',256,180)});lab.redraw();
  const lb=new THREE.Mesh(new THREE.CylinderGeometry(.672,.672,1.2,56,1,true),new THREE.MeshStandardMaterial({map:lab.tx,roughness:.6}));lb.position.y=-.9;g.add(lb);
  const cap=new THREE.Mesh(new THREE.CylinderGeometry(.25,.25,.5,32),M(0xffc53d,{metalness:1,roughness:.25}));cap.position.y=1.85;g.add(cap);bot.position.x=lb.position.x=cap.position.x=-.9;
  const gp=[[0,-1.6],[.7,-1.6],[.72,-1.55],[.08,-1.45],[.06,-.4],[.2,-.3],[.65,0],[.8,.6],[.75,1.2],[.73,1.2]].map(([r,y])=>new THREE.Vector2(r,y));
  const gl=new THREE.Mesh(new THREE.LatheGeometry(gp,48),M(0xffffff,{transparent:true,opacity:.35,roughness:.05,side:THREE.DoubleSide}));gl.position.set(1.2,-.6,.4);g.add(gl);
  const wine=new THREE.Mesh(new THREE.SphereGeometry(.62,32,16,0,Math.PI*2,Math.PI/2,Math.PI/2),M(0x8a0f2e,{roughness:.1}));wine.position.set(1.2,-.35,.4);g.add(wine);sh(g);
  add3('wine',g,(t)=>{const p=pop(t,0,.4);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.1,-.3+Math.sin(t*1.1)*.35,0);g.position.y=Math.sin(t*1.5)*.07})}
// grid of 100 people, buyers turn gold
const peopleGeo=new THREE.CapsuleGeometry(.12,.22,4,10);
function crowd(name,nBuy,tBuy,sceneName){ const g=new THREE.Group();const ms=[];
  for(let r=0;r<10;r++)for(let c=0;c<10;c++){const m=new THREE.Mesh(peopleGeo,M(0xffffff,{roughness:.35}));m.position.set(-2.25+c*.5,0,-2.25+r*.5);g.add(m);ms.push(m)}
  const buyIdx=[44,17,72].slice(0,nBuy);const plate=new THREE.Mesh(new RoundedBoxGeometry(5.4,.2,5.4,4,.1),M(0x2a2e40,{roughness:.4}));plate.position.y=-.35;g.add(plate);sh(g);
  add3(name,g,(t)=>{const p=pop(t,ST(sceneName)+.1,.45);g.scale.setScalar(.72*Math.max(.001,p.s));g.rotation.set(.55,t*.25,0);g.position.y=-.2+Math.sin(t*1.5)*.06;
    ms.forEach((m,i)=>{const d=pop(t,ST(sceneName)+.1+i*.006,.3);const bi=buyIdx.indexOf(i);const on=bi>=0&&t>=tBuy[bi];
      m.material.color.set(on?0xffc53d:0xffffff);m.material.emissive&&m.material.emissive.set(on?0x664400:0x000000);
      m.position.y=on?.25+Math.abs(Math.sin(t*5))*.15:0;m.scale.setScalar(Math.max(.001,d.s)*(on?1.5:1))})})}
crowd('crowd1',1,[T(13)],'visits');
// 3D bars 1% -> 3%
{ const g=new THREE.Group();const b1=new THREE.Mesh(new RoundedBoxGeometry(1.2,1,1.2,4,.12),M(0xffffff,{roughness:.3}));const b2=new THREE.Mesh(new RoundedBoxGeometry(1.2,1,1.2,4,.12),M(0xffc53d,{metalness:.6,roughness:.2}));
  b1.position.x=-.9;b2.position.x=.9;g.add(b1);g.add(b2);
  const l1=labelTex('1%',256,256,'#10131f',120),l2=labelTex('3%',256,256,'#10131f',120);
  const m1=new THREE.Mesh(new THREE.PlaneGeometry(1.1,1.1),new THREE.MeshBasicMaterial({map:l1.tx,transparent:true,toneMapped:false}));const m2=new THREE.Mesh(new THREE.PlaneGeometry(1.1,1.1),new THREE.MeshBasicMaterial({map:l2.tx,transparent:true,toneMapped:false}));
  g.add(m1);g.add(m2);const ar=new THREE.Mesh(new THREE.ConeGeometry(.35,.6,24),M(0x19c37d));ar.position.set(0,2.6,0);g.add(ar);sh(g);
  add3('bars',g,(t)=>{const p=pop(t,ST('boost')+.1,.45);g.scale.setScalar(.8*Math.max(.001,p.s));g.rotation.set(.15,-.35+Math.sin(t*1.1)*.25,0);g.position.y=-.3+Math.sin(t*1.5)*.06;
    const h1=1.2,h2=lerp(1.2,3.6,eBack(prog(t,T(32)-.05,.5)));b1.scale.y=h1;b1.position.y=-1.5+h1/2;b2.scale.y=h2;b2.position.y=-1.5+h2/2;
    m1.position.set(-.9,-1.5+h1+.6,.0);m2.position.set(.9,-1.5+h2+.6,0);ar.visible=t>=T(32);ar.position.y=-1.5+h2+1.4+Math.sin(t*5)*.1})}
// three coin stacks
{ const g=new THREE.Group();const cg=new THREE.CylinderGeometry(.55,.55,.16,40);const stacks=[[],[],[]];
  for(let s=0;s<3;s++)for(let i=0;i<8;i++){const c=new THREE.Mesh(cg,gold());c.position.set(-1.5+s*1.5,-1.6+i*.18,0);c.rotation.y=i;g.add(c);stacks[s].push(c)}sh(g);
  add3('coins',g,(t)=>{const p=pop(t,ST('triple')+.1,.45);g.scale.setScalar(.9*Math.max(.001,p.s));g.rotation.set(.3,Math.sin(t*1.1)*.4,0);g.position.y=Math.sin(t*1.5)*.06;
    stacks.forEach((st,s)=>st.forEach((c,i)=>{const show=s===0||t>=T(42)+s*.12+i*.03;const q=pop(t,T(42)+s*.12+i*.03,.25);c.visible=show;if(s>0)c.scale.setScalar(Math.max(.001,q.s))}))})}
// shopping cart
{ const g=new THREE.Group();const red=M(0xff2e4d,{metalness:.5,roughness:.25});
  const basket=new THREE.Mesh(new RoundedBoxGeometry(3,1.6,1.8,4,.15),M(0xffffff,{transparent:true,opacity:.35,roughness:.1}));basket.position.y=.3;g.add(basket);
  const edges=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(3,1.6,1.8)),new THREE.LineBasicMaterial({color:0xff2e4d}));edges.position.y=.3;g.add(edges);
  const rim=new THREE.Mesh(new RoundedBoxGeometry(3.2,.15,2,2,.06),red);rim.position.y=1.15;g.add(rim);
  const handle=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,2.2,16),red);handle.rotation.x=Math.PI/2;handle.position.set(-1.9,1.5,0);g.add(handle);
  const bar=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,.8,12),red);bar.position.set(-1.7,1.25,0);bar.rotation.z=.5;g.add(bar);
  [[-1.1,.7],[1.1,.7],[-1.1,-.7],[1.1,-.7]].forEach(([x,z])=>{const w=new THREE.Mesh(new THREE.CylinderGeometry(.25,.25,.15,24),M(0x1a1c26));w.rotation.x=Math.PI/2;w.position.set(x,-.85,z);g.add(w)});
  const bots=[];for(let i=0;i<3;i++){const b=new THREE.Mesh(new THREE.CylinderGeometry(.22,.24,1.3,24),M(0x3d0a1a,{roughness:.08}));b.position.set(-.7+i*.7,.6,0);g.add(b);bots.push(b)}sh(g);
  add3('cart',g,(t)=>{const p=pop(t,ST('how')+.1,.45);g.scale.setScalar(.8*Math.max(.001,p.s));g.rotation.set(.15,-.5+Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.06;
    bots.forEach((b,i)=>{const q=prog(t,T(53)+i*.1,.35);b.visible=q>0;b.position.y=lerp(3,.6,eOut(q))})})}
// paper plane
{ const g=new THREE.Group();const sh2=new THREE.Shape();sh2.moveTo(0,1.6);sh2.lineTo(-1.3,-1.4);sh2.lineTo(0,-.7);sh2.lineTo(1.3,-1.4);sh2.lineTo(0,1.6);
  const pl=new THREE.Mesh(new THREE.ExtrudeGeometry(sh2,{depth:.08,bevelEnabled:true,bevelSize:.03,bevelThickness:.03}),M(0xffffff,{roughness:.3}));g.add(pl);
  const keel=new THREE.Mesh(new THREE.ExtrudeGeometry((()=>{const s=new THREE.Shape();s.moveTo(0,1.6);s.lineTo(0,-.7);s.lineTo(-.5,-.9);s.lineTo(0,1.6);return s})(),{depth:.06,bevelEnabled:false}),M(0xff5fa2));
  keel.rotation.y=Math.PI/2;g.add(keel);const trail=[];for(let i=0;i<6;i++){const d=new THREE.Mesh(new THREE.SphereGeometry(.09,12,8),M(0xffffff,{emissive:0xffffff,emissiveIntensity:.5}));g.add(d);trail.push(d)}sh(g);
  add3('plane',g,(t)=>{const p=pop(t,ST('recover')+.1,.45);g.scale.setScalar(.75*Math.max(.001,p.s));g.rotation.set(-1.0+Math.sin(t*1.3)*.1,0,-.6+Math.sin(t*1.1)*.2);g.position.set(Math.sin(t*1.2)*.3,.4+Math.sin(t*1.5)*.1,0);
    trail.forEach((d,i)=>d.position.set(0,-1.2-i*.45,Math.sin(t*4+i)*.1))})}
// funnel with coins out
{ const g=new THREE.Group();const pts=[[1.9,1.6],[1.85,1.5],[.35,-.6],[.32,-1.6],[.25,-1.6],[.28,-.6],[1.78,1.5]].map(([r,y])=>new THREE.Vector2(r,y));
  const f=new THREE.Mesh(new THREE.LatheGeometry(pts,56),M(0x13b4ff,{metalness:.3,roughness:.2,side:THREE.DoubleSide}));g.add(f);
  const coins=[];const cg=new THREE.CylinderGeometry(.3,.3,.07,32);for(let i=0;i<7;i++){const c=new THREE.Mesh(cg,gold());g.add(c);coins.push(c)}
  const dots=[];for(let i=0;i<14;i++){const d=new THREE.Mesh(new THREE.SphereGeometry(.12,12,8),M(0xffffff));g.add(d);dots.push(d)}sh(g);
  add3('funnel',g,(t)=>{const p=pop(t,ST('sell')+.1,.45);g.scale.setScalar(.75*Math.max(.001,p.s));g.rotation.set(.25,t*.3,0);g.position.y=.2+Math.sin(t*1.5)*.06;
    dots.forEach((d,i)=>{const k=((t*.7)+i/14)%1;d.position.set(Math.cos(i*2.4)*(1.5-k*1.2),2.4-k*2.6,Math.sin(i*2.4)*(1.5-k*1.2))});
    coins.forEach((c,i)=>{const k=((t*.9)+i/7)%1;c.visible=t>=T(77);c.position.set(Math.sin(i*1.7)*k*.6,-1.7-k*1.6,Math.cos(i*1.7)*k*.6);c.rotation.set(t*5+i,i,0)})})}
const BOX={wine:[540,940,740],crowd1:[540,900,760],bars:[540,900,700],coins:[540,920,700],cart:[540,920,720],plane:[540,880,640],funnel:[540,900,700]};
function counter(label,val,x,y,col='#10131f'){txt(label,x,y,{size:30,w:800,c:'#6b7185'});txt(val,x,y+70,{size:66,w:900,c:col})}
const SCN={
 wine(t){render3D('wine',t,BOX.wine);const q=pop(t,T(2)-.05,.3);withT(540,1460,q.s,q.a,()=>pill('Calcolatrice alla mano',540,1460,{size:44,bg:'#fff',c:'#8a4b1f'}))},
 visits(t){render3D('crowd1',t,BOX.crowd1);const c=pop(t,T(5)-.1,.35);withT(540,1460,c.s,c.a,()=>{card(150,1330,780,250);
   counter('VISITE / MESE',fmt(1000*eOut(prog(t,T(4),.6))),210,1400);ctx.globalAlpha*=prog(t,T(18)-.05,.25);counter('ORDINI',String(Math.round(10*eOut(prog(t,T(18),.4)))),660,1400,'#ff2e4d')})},
 boost(t){render3D('bars',t,BOX.bars);const c=pop(t,T(33)-.1,.35);withT(540,1460,c.s,c.a,()=>{card(150,1330,780,250);
   counter('CONVERSIONE','3%',210,1400,'#19c37d');counter('ORDINI',String(Math.round(lerp(10,30,eOut(prog(t,T(36),.5))))),660,1400,'#19c37d')})},
 triple(t){render3D('coins',t,BOX.coins);const items=[['Visite: uguali',T(38),'#fff'],['Pubblicità: uguale',T(40),'#fff'],['Vendite ×3',T(42),'#FFD60A']];
   items.forEach(([s,tt,bg],i)=>{const q=pop(t,tt-.05,.3);withT(540,1340+i*112,q.s,q.a,()=>pill(s,540,1340+i*112,{size:46,bg,c:'#10131f'}))})},
 how(t){render3D('cart',t,BOX.cart);const items=[['Pagine veloci',T(46)],['Foto che fanno sete',T(48)],['Carrello in 2 clic',T(53)]];
   items.forEach(([s,tt],i)=>{const q=pop(t,tt-.05,.3);withT(540,1340+i*112,q.s,q.a,()=>{const w=pill(s,540,1340+i*112,{size:44,bg:'#fff',c:'#10131f'});check(540-w/2-50,1340+i*112,30,prog(t,tt,.35))})})},
 recover(t){render3D('plane',t,BOX.plane);const c=pop(t,T(59)-.1,.35);withT(540,1440,c.s,c.a,()=>{card(150,1270,780,330);
   txt('MESSAGGIO AUTOMATICO',210,1335,{size:28,w:900,c:'#ff3d7f',ls:2});txt('Il tuo Rosso Riserva',210,1405,{size:44,w:900});txt('ti aspetta nel carrello.',210,1460,{size:40,w:700,c:'#6b7185'});
   const b=pop(t,T(65)-.05,.3);withT(540,1530,b.s,b.a,()=>pill("Completa l'ordine",540,1530,{size:36,bg:'#19c37d',c:'#fff'}))})},
 sell(t){render3D('funnel',t,BOX.funnel);const q=pop(t,T(71)-.05,.3);withT(540,1420,q.s,q.a,()=>{pill('+ traffico',540,1420,{size:44,bg:'#fff',c:'#a3a8b8'});ctx.strokeStyle='#ff2e4d';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(400,1424);ctx.lineTo(400+280*eOut(prog(t,T(73),.25)),1424);ctx.stroke()});
   stampTxt('SITO CHE VENDE',540,1580,t,T(79),'#2EE59D',-.06,56)},
 all(t){drawLogo(t,T(80)-.05,540,880,640);const items=[['Gestionale',T(88)],['App',T(89)],['Intelligenza artificiale',T(91)]];
   items.forEach(([s,tt],i)=>{const q=pop(t,tt-.05,.3);withT(540,1260+i*112,q.s,q.a,()=>{const w=pill(s,540,1260+i*112,{size:44,bg:'#fff',c:'#10131f'});check(540-w/2-50,1260+i*112,30,prog(t,tt,.35))})})},
};
