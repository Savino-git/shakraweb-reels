const ST=n=>SC.find(s=>s.name===n).t0;
const SP={pizza:['red','orange','red'],calc:['navy','violet','navy','red'],night:['navy2'],app:['blue','teal','blue','violet','blue'],kitchen:['orange','wood'],mine:['green','mint','green'],
 payoff:['night','navy','navy2'],cta:['orange','violet','green','navy']};
function labelTex(s,w=256,h=256,col='#fff',size=150,bg=null){const st=texCanvas(w,h,(x)=>{x.clearRect(0,0,w,h);if(bg){x.fillStyle=bg;x.fillRect(0,0,w,h)}x.fillStyle=col;x.font='900 '+size+'px Inter';x.textAlign='center';x.fillText(s,w/2,h*.7)});st.redraw();return st}
function plane(st,w,h){return new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:st.tx,transparent:true,toneMapped:false}))}
// pizza made of wedges; 30% slice slides out
function wedge(a0,len){const g=new THREE.Group();
  const crust=new THREE.Mesh(new THREE.CylinderGeometry(2,2,.22,64,1,false,a0,len),M(0xe0a35a,{roughness:.6,clearcoat:.2}));g.add(crust);
  const sauce=new THREE.Mesh(new THREE.CylinderGeometry(1.8,1.8,.08,64,1,false,a0,len),M(0xc81e0e,{roughness:.35}));sauce.position.y=.13;g.add(sauce);
  const ed=new THREE.Mesh(new THREE.TorusGeometry(1.9,.14,12,64,len),M(0xd6923f,{roughness:.6,clearcoat:.2}));ed.rotation.x=Math.PI/2;ed.rotation.z=-(a0-Math.PI/2)-len;ed.rotation.z=a0-Math.PI/2;ed.position.y=.08;
  for(let i=0;i<Math.round(len*3);i++){const a=a0+(i+.5)/Math.round(len*3)*len;const r=.5+hash(i*3.1+a0)*1.1;
    const m=new THREE.Mesh(new THREE.SphereGeometry(.22,20,14),M(0xfff4dc,{roughness:.5}));m.scale.y=.35;m.position.set(Math.sin(a)*r,.2,Math.cos(a)*r);g.add(m);
    if(i%2===0){const b=new THREE.Mesh(new THREE.SphereGeometry(.13,12,8),M(0x2e9e4d,{roughness:.5}));b.scale.set(1.3,.25,.8);const a2=a+.15,r2=r*.8+.3;b.position.set(Math.sin(a2)*r2,.24,Math.cos(a2)*r2);g.add(b)}}
  return g}
{ const g=new THREE.Group();const L=Math.PI*2*.3;const big=wedge(L,Math.PI*2-L);const sl=wedge(0,L);g.add(big,sl);
  const board=new THREE.Mesh(new THREE.CylinderGeometry(2.4,2.4,.18,64),M(0xb07a3e,{roughness:.6,clearcoat:.2}));board.position.y=-.2;g.add(board);sh(g);
  add3('pizza',g,(t)=>{const p=pop(t,.05,.45);g.scale.setScalar(1.0*Math.max(.001,p.s));g.rotation.set(.75,t*.25,0);g.position.y=Math.sin(t*1.5)*.06;
    const k=eOut(prog(t,T(9)-.05,.5));const a=L/2;sl.position.set(Math.sin(a)*k*1.6,k*.5,Math.cos(a)*k*1.6)})}
// delivery thermal bag
{ const g=new THREE.Group();const bag=new THREE.Mesh(new RoundedBoxGeometry(2.6,2.4,2.0,6,.25),M(0x00b39f,{roughness:.45,clearcoat:.4}));g.add(bag);
  const st=texCanvas(512,256,(x)=>{x.clearRect(0,0,512,256);x.fillStyle='#fff';x.font='900 84px Inter';x.textAlign='center';x.fillText('DELIVERY',256,150)});st.redraw();const lb=plane(st,2.2,1.1);lb.position.set(0,.1,1.01);g.add(lb);
  const strap=new THREE.Mesh(new THREE.TorusGeometry(.7,.09,12,40,Math.PI),M(0x10131f));strap.position.y=1.2;g.add(strap);
  const coins=[];for(let i=0;i<6;i++){const c=new THREE.Mesh(new THREE.CylinderGeometry(.35,.35,.08,36),gold());g.add(c);coins.push(c)}sh(g);
  add3('bag',g,(t)=>{const p=pop(t,ST('calc')+.08,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.2,-.5+Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.06;
    coins.forEach((c,i)=>{const t0=T(20)+i*.12;const ph=t-t0;c.visible=ph>0&&ph<1.4;c.position.set(Math.sin(i*2.3)*.6+ph*1.4,1.3+ph*1.6-ph*ph*1.2,Math.cos(i)*.3);c.rotation.set(t*4+i,0,t*3)})})}
// pizza box with coins flying out each night (moon)
{ const g=new THREE.Group();const card=M(0xe8c896,{roughness:.7,clearcoat:.1});const base=new THREE.Mesh(new RoundedBoxGeometry(3,.35,3,3,.04),card);g.add(base);
  const lidG=new THREE.Group();const lid=new THREE.Mesh(new RoundedBoxGeometry(3,.08,3,3,.03),card);lid.position.z=1.5;lidG.add(lid);
  const st=texCanvas(256,256,(x)=>{x.clearRect(0,0,256,256);x.fillStyle='#d9311f';x.beginPath();x.arc(128,128,90,0,7);x.fill();x.fillStyle='#fff';x.font='900 70px Inter';x.textAlign='center';x.fillText('€',128,152)});st.redraw();
  const lp=plane(st,1.4,1.4);lp.rotation.x=-Math.PI/2;lp.position.set(0,.05,1.5);lidG.add(lp);lidG.position.set(0,.18,-1.5);g.add(lidG);
  const coins=[];for(let i=0;i<10;i++){const c=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,.07,32),gold());g.add(c);coins.push(c)}
  const moon=new THREE.Mesh(new THREE.SphereGeometry(.45,32,24),M(0xfff1b8,{emissive:0xffd66b,emissiveIntensity:.4}));moon.position.set(-1.9,2.3,-1);g.add(moon);sh(g);
  add3('box',g,(t)=>{const p=pop(t,ST('night')+.04,.4);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.45,-.4+Math.sin(t*1.1)*.3,0);g.position.y=-.4+Math.sin(t*1.5)*.06;
    lidG.rotation.x=-1.6*eOut(prog(t,ST('night')+.1,.3));coins.forEach((c,i)=>{const ph=(t*1.1+i/10)%1;c.position.set(Math.sin(i*2.7)*(.3+ph*1.6),.3+ph*3.2,Math.cos(i*1.9)*(.3+ph*1.2));c.rotation.set(t*4+i,0,t*3+i)})})}
// phone with pizzeria app
{ const scr=(x,s=0)=>{x.fillStyle='#fff7ef';x.fillRect(0,0,512,1024);x.fillStyle='#ff5e00';x.fillRect(0,0,512,170);x.fillStyle='#fff';x.font='900 42px Inter';x.fillText('Pizzeria da Gino',30,90);x.font='700 26px Inter';x.fillStyle='rgba(255,255,255,.85)';x.fillText('La tua app · consegna gratis',30,135);
    const items=[['Margherita','6,50 €'],['Diavola','8,00 €'],['Capricciosa','9,00 €']];items.forEach(([n,pz],i)=>{const y=210+i*140;x.fillStyle='#fff';x.beginPath();x.roundRect(24,y,464,118,24);x.fill();
      x.fillStyle='#ffd1a8';x.beginPath();x.arc(90,y+59,40,0,7);x.fill();x.fillStyle='#d9311f';x.beginPath();x.arc(90,y+59,30,0,7);x.fill();x.fillStyle='#10131f';x.font='800 34px Inter';x.fillText(n,150,y+55);x.fillStyle='#6b7185';x.font='700 28px Inter';x.fillText(pz,150,y+95);
      x.fillStyle=s>=1&&i<2?'#19c37d':'#ff5e00';x.beginPath();x.arc(440,y+59,26,0,7);x.fill();x.fillStyle='#fff';x.font='900 34px Inter';x.textAlign='center';x.fillText(s>=1&&i<2?'✓':'+',440,y+71);x.textAlign='left'});
    const by=700;x.fillStyle=s>=2?'#19c37d':'#ff5e00';x.beginPath();x.roundRect(24,by,464,110,55);x.fill();x.fillStyle='#fff';x.font='900 38px Inter';x.textAlign='center';x.fillText(s>=2?'Pagato ✓ 14,50 €':'Ordina e paga',256,by+70);x.textAlign='left';
    if(s>=3){x.fillStyle='#10131f';x.beginPath();x.roundRect(24,840,464,120,24);x.fill();x.fillStyle='#2EE59D';x.font='900 30px Inter';x.fillText('IN CUCINA',50,890);x.fillStyle='#fff';x.font='700 28px Inter';x.fillText('Pronta tra 20 minuti',50,935)}};
  const g=phone(0x2a2e40,scr);let last=-1;
  add3('phone',g,(t)=>{const p=pop(t,ST('app')+.08,.45);g.scale.setScalar(.95*Math.max(.001,p.s));g.rotation.set(.05,-.3+Math.sin(t*1.1)*.22,Math.sin(t*.9)*.04);g.position.y=Math.sin(t*1.5)*.07;
    const s=t>=T(40)?3:t>=T(37)?2:t>=T(35)?1:0;if(s!==last){g.userData.st.redraw(s);last=s}})}
// wood-fired oven
{ const g=new THREE.Group();const dome=new THREE.Mesh(new THREE.SphereGeometry(1.8,48,32,0,Math.PI*2,0,Math.PI/2),M(0xc0623a,{roughness:.6,clearcoat:.15}));g.add(dome);
  const base=new THREE.Mesh(new RoundedBoxGeometry(4.2,1.4,4.2,4,.12),M(0x8a8f9e,{roughness:.6}));base.position.y=-.72;g.add(base);
  const mouth=new THREE.Mesh(new THREE.CircleGeometry(.75,40,0,Math.PI),new THREE.MeshBasicMaterial({color:0x1a0a05}));mouth.position.set(0,0,1.79);g.add(mouth);
  const fire=[];for(let i=0;i<5;i++){const f=new THREE.Mesh(new THREE.ConeGeometry(.16,.5,12),new THREE.MeshBasicMaterial({color:i%2?0xffc53d:0xff5e00}));f.position.set(-.4+i*.2,.25,1.6);g.add(f);fire.push(f)}
  const chim=new THREE.Mesh(new THREE.CylinderGeometry(.22,.26,1.2,24),M(0x6b7185));chim.position.set(.6,1.8,-.4);g.add(chim);
  const tk=texCanvas(256,360,(x)=>{x.fillStyle='#fff';x.fillRect(0,0,256,360);x.fillStyle='#10131f';x.font='900 36px Inter';x.fillText('ORDINE',24,60);x.fillText('#128',24,105);x.font='700 26px Inter';x.fillStyle='#6b7185';x.fillText('1x Margherita',24,170);x.fillText('1x Diavola',24,210);x.fillStyle='#19c37d';x.font='900 30px Inter';x.fillText('PAGATO',24,300)});tk.redraw();
  const ticket=plane(tk,1.1,1.55);ticket.material.side=THREE.DoubleSide;g.add(ticket);sh(g);
  add3('oven',g,(t)=>{const p=pop(t,ST('kitchen')+.06,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.2,-.45+Math.sin(t*1.1)*.3,0);g.position.y=-.3+Math.sin(t*1.5)*.05;
    fire.forEach((f,i)=>{f.scale.y=1+.4*Math.sin(t*12+i*2)});const k=eOut(prog(t,T(41)-.05,.6));ticket.position.set(2.3-k*.6,.6+(1-k)*2.5,1.2);ticket.rotation.set(0,-.3,(1-k)*.8)})}
// customer figure with heart magnet
{ const g=new THREE.Group();const mk=(col,x,s)=>{const f=new THREE.Group();const h=new THREE.Mesh(new THREE.SphereGeometry(.42,32,24),M(0xffd1a8));h.position.y=.95;f.add(h);
    const b=new THREE.Mesh(new THREE.CapsuleGeometry(.48,.6,8,20),M(col));b.position.y=-.05;f.add(b);f.position.x=x;f.scale.setScalar(s);return f};
  const P=[mk(0x2d5bff,0,1.1),mk(0xff3d7f,-1.6,.85),mk(0xffc53d,1.6,.85)];P.forEach(f=>g.add(f));
  const hs=new THREE.Shape();hs.moveTo(0,.3);hs.bezierCurveTo(0,.6,-.5,.6,-.5,.3);hs.bezierCurveTo(-.5,0,0,-.2,0,-.45);hs.bezierCurveTo(0,-.2,.5,0,.5,.3);hs.bezierCurveTo(.5,.6,0,.6,0,.3);
  const heart=new THREE.Mesh(new THREE.ExtrudeGeometry(hs,{depth:.25,bevelEnabled:true,bevelThickness:.06,bevelSize:.06,bevelSegments:3}),M(0xff2e4d));heart.geometry.center();heart.rotation.z=Math.PI;heart.position.set(0,2.3,0);g.add(heart);sh(g);
  add3('people',g,(t)=>{const p=pop(t,ST('mine')+.06,.45);g.scale.setScalar(.9*Math.max(.001,p.s));g.rotation.set(.1,Math.sin(t*1.1)*.35,0);g.position.y=-.3+Math.sin(t*1.5)*.06;
    const h=pop(t,T(47)-.05,.35);heart.visible=h.p>0;heart.scale.setScalar(Math.max(.001,h.s)*(1+.1*Math.abs(Math.sin(t*5))));heart.rotation.y=t*1.5;
    P.forEach((f,i)=>{const k=eOut(prog(t,T(47),.6));if(i)f.position.x=(i===1?-1:1)*(1.6-k*.35)})})}
// laptop with code at night
{ const g=new THREE.Group();const base=new THREE.Mesh(new RoundedBoxGeometry(3.4,.16,2.3,4,.08),M(0xc9ced9,{metalness:.9,roughness:.25}));g.add(base);
  const st=texCanvas(512,320,(x,k=0)=>{x.fillStyle='#0b0e2a';x.fillRect(0,0,512,320);const L=[['#2EE59D',220],['#13b4ff',300],['#ffc53d',180],['#ff3d7f',260],['#2EE59D',200],['#13b4ff',320],['#ffc53d',150]];
    L.forEach(([c,w],i)=>{const off=(i+k)%7;x.fillStyle=c;x.fillRect(30+(off%3)*20,30+i*38,w*(.6+.4*hash(i+k)),16)})});st.redraw(0);
  const scrG=new THREE.Group();const lid=new THREE.Mesh(new RoundedBoxGeometry(3.4,2.2,.1,4,.06),M(0xc9ced9,{metalness:.9,roughness:.25}));lid.position.y=1.1;scrG.add(lid);
  const sc=plane(st,3.1,1.94);sc.position.set(0,1.1,.06);scrG.add(sc);scrG.position.z=-1.1;scrG.rotation.x=-.2;g.add(scrG);sh(g);let lk=-1;
  add3('laptop',g,(t)=>{const p=pop(t,ST('payoff')+.08,.45);const out=clamp((t-T(56)+.15)/.2);g.scale.setScalar(1.0*Math.max(.001,p.s*(1-out)));g.rotation.set(.3,-.4+Math.sin(t*.9)*.35,0);g.position.y=-.5+Math.sin(t*1.5)*.08;
    const k=Math.floor(t*6);if(k!==lk){st.redraw(k);lk=k}})}
const BOX={pizza:[540,980,900],bag:[540,820,520],box:[540,960,800],phone:[540,1090,950],oven:[540,960,820],people:[540,960,780],laptop:[540,1000,780]};
const SCN={
 pizza(t){render3D('pizza',t,BOX.pizza);const q=pop(t,T(11)-.05,.3);withT(800,1480,q.s,q.a,()=>pill('-30%',800,1480,{size:64,bg:'#ff2e4d',c:'#fff'}))},
 calc(t){render3D('bag',t,BOX.bag);const c=pop(t,ST('calc')+.05,.35);withT(540,1340,c.s,c.a,()=>{card(130,1090,820,520,{r:44});
   const rows=[['Consegne a sera','50',T(12),'#10131f'],['Pizza media','10 €',T(17),'#10131f']];
   rows.forEach(([l,v,tt,col],i)=>{const y=1190+i*120;const r=prog(t,tt-.05,.25);ctx.globalAlpha=c.a*clamp(r*3);txt(l,180,y,{size:40,w:700,c:'#6b7185'});txt(v,900,y+6,{size:64,w:900,c:col,al:'right'});ctx.globalAlpha=c.a});
   ctx.fillStyle='#eef0f6';ctx.fillRect(180,1350,720,4);const r=prog(t,T(19)-.05,.25);ctx.globalAlpha=c.a*clamp(r*3);txt('Alle app (30%)',180,1440,{size:40,w:800,c:'#10131f'});
   txt('-'+fmt(150*eOut(prog(t,T(20),.6)))+' €',900,1452,{size:90,w:900,c:'#ff2e4d',al:'right'});ctx.globalAlpha=c.a;stampTxt('REGALATI',540,1555,t,T(22)-.02,'#ff2e4d',-.06,50)})},
 night(t){render3D('box',t,BOX.box);const c=pop(t,T(23)+.05,.35);withT(540,1480,c.s,c.a,()=>{card(190,1340,700,280,{r:44});txt('Al mese (26 sere)',540,1415,{size:40,w:700,c:'#6b7185',al:'center'});
   txt('-'+fmt(3900*eOut(prog(t,T(23)+.1,.7)))+' €',540,1550,{size:110,w:900,c:'#ff2e4d',al:'center'})})},
 app(t){render3D('phone',t,BOX.phone);const q=pop(t,T(32)-.05,.3);withT(540,1660,q.s,q.a,()=>pill('La TUA app, zero commissioni',540,1660,{size:40,bg:'#FFD60A',c:'#10131f'}))},
 kitchen(t){render3D('oven',t,BOX.oven);const q=pop(t,T(42)-.05,.3);withT(540,1500,q.s,q.a,()=>pill('Dritto in cucina',540,1500,{size:48,bg:'#fff',c:'#10131f'}))},
 mine(t){render3D('people',t,BOX.people);const c=pop(t,T(46)-.05,.35);withT(540,1460,c.s,c.a,()=>{card(150,1350,780,230,{r:44});txt('I tuoi clienti',540,1420,{size:40,w:700,c:'#6b7185',al:'center'});
   const rows=['Numero','Gusti','Ordini'];rows.forEach((s,i)=>{const x=265+i*235;check(x-80,1500,22,prog(t,T(47)+i*.15,.35));txt(s,x+45,1514,{size:40,w:800,c:'#10131f',al:'center'})})})},
 payoff(t){render3D('laptop',t,BOX.laptop);if(t>=T(56)-.05)drawLogo(t,T(56)-.05,540,1060,700)},
};
