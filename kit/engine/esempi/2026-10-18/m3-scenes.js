const SP={calc:['blue','violet'],clock:['orange','red','orange','pink','red','orange'],math:['violet','navy2','violet','blue'],trash:['grey','navy','red'],
 gears:['teal','green','teal'],files:['blue','teal','blue'],plane:['pink','violet','pink','orange'],all:['navy2','violet','blue','navy2'],payoff:['night','navy','navy2'],cta:['blue','violet','green','navy']};
// calculator
{ const g=new THREE.Group();g.add(new THREE.Mesh(new RoundedBoxGeometry(2.6,3.8,.4,4,.2),M(0x10131f,{roughness:.3})));
  const st=texCanvas(512,200,(x,v='0')=>{x.fillStyle='#c8f5d8';x.fillRect(0,0,512,200);x.fillStyle='#10131f';x.font='900 120px Inter';x.textAlign='right';x.fillText(v,480,150)});st.redraw('0');
  const sc=new THREE.Mesh(new THREE.PlaneGeometry(2.1,.8),new THREE.MeshBasicMaterial({map:st.tx,toneMapped:false}));sc.position.set(0,1.25,.21);g.add(sc);
  const keys=[];for(let r=0;r<4;r++)for(let c=0;c<4;c++){const k=new THREE.Mesh(new RoundedBoxGeometry(.45,.42,.18,2,.08),M(c===3?0xff7a1a:r===3&&c===2?0x19c37d:0xf4f6ff,{roughness:.3}));k.position.set(-.8+c*.53,.35-r*.53,.25);g.add(k);keys.push(k)}sh(g);
  add3('calc',g,(t)=>{const p=pop(t,0,.4);g.scale.setScalar(Math.max(.001,p.s));g.rotation.set(-.15,Math.sin(t*1.3)*.4,Math.sin(t)*.05);g.position.y=Math.sin(t*1.5)*.1;
    const n=Math.floor(t/.12);keys.forEach((k,i)=>k.position.z=.25-(t<T(3)&&(n*7)%16===i?.08:0));st.redraw(t<T(1)?'0':t<T(2)?'2':'2 × ?')})}
// wall clock
{ const g=new THREE.Group();const rim=new THREE.Mesh(new THREE.TorusGeometry(2,.22,24,80),M(0xff3d7f));g.add(rim);
  const face=new THREE.Mesh(new THREE.CylinderGeometry(1.95,1.95,.1,64),M(0xffffff,{roughness:.3}));face.rotation.x=Math.PI/2;g.add(face);
  for(let i=0;i<12;i++){const tk=new THREE.Mesh(new RoundedBoxGeometry(.1,i%3?.22:.38,.05,2,.02),M(0x10131f));const a=i/12*6.28;tk.position.set(Math.sin(a)*1.6,Math.cos(a)*1.6,.08);tk.rotation.z=-a;g.add(tk)}
  const hh=new THREE.Group(),mh=new THREE.Group();const h1=new THREE.Mesh(new RoundedBoxGeometry(.16,.9,.06,2,.03),M(0x10131f));h1.position.y=.4;hh.add(h1);
  const m1=new THREE.Mesh(new RoundedBoxGeometry(.1,1.35,.06,2,.03),M(0xff2e4d));m1.position.y=.6;mh.add(m1);hh.position.z=.12;mh.position.z=.17;g.add(hh,mh);sh(g);
  add3('clock',g,(t)=>{const p=pop(t,SC[1].t0+.1,.45);g.scale.setScalar(.9*Math.max(.001,p.s));g.rotation.set(0,Math.sin(t*1.1)*.4,0);g.position.y=Math.sin(t*1.5)*.08;
    const sp=t>T(11)?(t-T(11))*9:0;mh.rotation.z=-sp-.3;hh.rotation.z=-sp/12-1.2})}
// calendar block
{ const g=new THREE.Group();const blk=new THREE.Mesh(new RoundedBoxGeometry(3,3,.5,4,.15),M(0xffffff,{roughness:.4}));g.add(blk);
  const top=new THREE.Mesh(new RoundedBoxGeometry(3,.8,.55,4,.15),M(0xff2e4d));top.position.y=1.15;g.add(top);
  [-.8,.8].forEach(x=>{const r=new THREE.Mesh(new THREE.TorusGeometry(.18,.06,12,24),gold());r.position.set(x,1.55,0);g.add(r)});
  const st=texCanvas(512,400,(x,s='40')=>{x.fillStyle='#fff';x.fillRect(0,0,512,400);x.fillStyle='#10131f';x.font='900 200px Inter';x.textAlign='center';x.fillText(s,256,250);x.font='800 56px Inter';x.fillStyle='#6b7185';x.fillText('ORE',256,340)});st.redraw('0');
  const pg=new THREE.Mesh(new THREE.PlaneGeometry(2.7,2.1),new THREE.MeshBasicMaterial({map:st.tx,toneMapped:false}));pg.position.set(0,-.3,.26);g.add(pg);sh(g);
  add3('cal',g,(t)=>{const p=pop(t,SC[2].t0+.1,.45);g.scale.setScalar(.9*Math.max(.001,p.s));g.rotation.set(-.1,Math.sin(t*1.2)*.4,0);g.position.y=Math.sin(t*1.5)*.08;
    const v=t<T(29)?Math.round(40*eOut(prog(t,T(25),.5))):Math.round(lerp(40,480,eOut(prog(t,T(30),.6))));st.redraw(String(v))})}
// trash bin
{ const g=new THREE.Group();const pts=[];for(let i=0;i<=10;i++)pts.push(new THREE.Vector2(1.1+i*.05,-1.6+i*.3));
  const bin=new THREE.Mesh(new THREE.LatheGeometry(pts,48),M(0x9aa0ad,{metalness:.8,roughness:.3,side:THREE.DoubleSide}));g.add(bin);
  const bot=new THREE.Mesh(new THREE.CylinderGeometry(1.1,1.1,.08,48),M(0x9aa0ad,{metalness:.8,roughness:.3}));bot.position.y=-1.6;g.add(bot);
  const rimm=new THREE.Mesh(new THREE.TorusGeometry(1.6,.07,12,64),M(0x6b7185,{metalness:.8}));rimm.rotation.x=Math.PI/2;rimm.position.y=1.4;g.add(rimm);
  const balls=[];for(let i=0;i<8;i++){const b=new THREE.Mesh(new THREE.IcosahedronGeometry(.35+.1*hash(i),1),M(0xfffaf0,{roughness:.9,clearcoat:0,flatShading:true}));g.add(b);balls.push(b)}sh(g);
  add3('trash',g,(t)=>{const p=pop(t,SC[3].t0+.1,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.35,Math.sin(t*1.1)*.3,0);g.position.y=-.3+Math.sin(t*1.5)*.06;
    balls.forEach((b,i)=>{const d=t-(T(34)+i*.18);b.visible=d>0;const k=clamp(d/.5);b.position.set(Math.sin(i*2.3)*.6*(1-.3*k),lerp(4.2,-1.1+.25*(i%3),k*k),Math.cos(i*1.7)*.5);b.rotation.set(t*2+i,t+i,0)})})}
// gears
function gearGeo(R,n,h=.4){const s=new THREE.Shape();for(let i=0;i<n*2;i++){const a0=i/(n*2)*6.283,a1=(i+1)/(n*2)*6.283,r=i%2?R:R+.28;if(i===0)s.moveTo(Math.cos(a0)*r,Math.sin(a0)*r);else s.lineTo(Math.cos(a0)*r,Math.sin(a0)*r);s.lineTo(Math.cos(a1)*r,Math.sin(a1)*r)}
  const hole=new THREE.Path();hole.absarc(0,0,R*.3,0,6.283,true);s.holes.push(hole);const geo=new THREE.ExtrudeGeometry(s,{depth:h,bevelEnabled:true,bevelSize:.04,bevelThickness:.04,bevelSegments:2});geo.center();return geo}
{ const g=new THREE.Group();const g1=new THREE.Mesh(gearGeo(1.3,14),M(0xffc53d,{metalness:.8,roughness:.25}));g1.position.set(-.85,.3,0);g.add(g1);
  const g2=new THREE.Mesh(gearGeo(.85,9),M(0x2d5bff,{metalness:.4}));g2.position.set(1.33,-.55,0);g.add(g2);
  const g3=new THREE.Mesh(gearGeo(.6,7),M(0xff3d7f,{metalness:.4}));g3.position.set(.75,1.65,.05);g.add(g3);sh(g);
  add3('gears',g,(t)=>{const p=pop(t,SC[4].t0+.1,.45);g.scale.setScalar(.95*Math.max(.001,p.s));g.rotation.set(-.2,Math.sin(t*1.1)*.5,0);g.position.y=Math.sin(t*1.5)*.08;
    const a=t*1.4;g1.rotation.z=a;g2.rotation.z=-a*14/9+.2;g3.rotation.z=-a*14/7})}
// filing cabinet
{ const g=new THREE.Group();g.add(new THREE.Mesh(new RoundedBoxGeometry(2.4,4,2.2,4,.12),M(0x2d5bff,{roughness:.3})));const dr=[];
  for(let i=0;i<3;i++){const d=new THREE.Group();const f=new THREE.Mesh(new RoundedBoxGeometry(2.1,1.1,.12,3,.05),M(0xf4f6ff,{roughness:.3}));d.add(f);
    const h=new THREE.Mesh(new RoundedBoxGeometry(.7,.12,.12,2,.05),gold());h.position.set(0,.2,.1);d.add(h);const lb=new THREE.Mesh(new THREE.PlaneGeometry(.8,.3),M(0xffd60a));lb.position.set(0,-.15,.07);d.add(lb);
    const box=new THREE.Mesh(new THREE.BoxGeometry(2,1,1.8),M(0xdfe6ff,{roughness:.6}));box.position.z=-.95;d.add(box);
    for(let j=0;j<5;j++){const pf=new THREE.Mesh(new THREE.BoxGeometry(1.8,.9,.04),M([0xffc53d,0xff7aa8,0x2ee59d][j%3],{roughness:.6}));pf.position.set(0,.15,-.4-j*.3);d.add(pf)}
    d.position.set(0,1.25-i*1.25,1.12);g.add(d);dr.push(d)}sh(g);
  add3('cab',g,(t)=>{const p=pop(t,SC[5].t0+.1,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.15,-.6+Math.sin(t*1.1)*.25,0);g.position.y=Math.sin(t*1.5)*.08;
    dr[1].position.z=1.12+1.3*eBack(prog(t,T(51)-.1,.4))})}
// paper plane
{ const g=new THREE.Group();const pm=new THREE.MeshPhysicalMaterial({color:0xffffff,roughness:.5,side:THREE.DoubleSide,clearcoat:.3});
  const geo=new THREE.BufferGeometry();const v=new Float32Array([0,0,2, -1.4,.25,-1.2, 0,0,-.9,  0,0,2, 0,0,-.9, 1.4,.25,-1.2,  0,0,2, 0,0,-.9, 0,-.55,-1.1]);
  geo.setAttribute('position',new THREE.BufferAttribute(v,3));geo.computeVertexNormals();const pl=new THREE.Mesh(geo,pm);pl.castShadow=true;g.add(pl);
  const trail=[];for(let i=0;i<10;i++){const d=new THREE.Mesh(new THREE.SphereGeometry(.07,10,6),M(0xffffff));g.add(d);trail.push(d)}sh(g);
  add3('plane',g,(t)=>{const p=pop(t,SC[6].t0+.1,.45);g.scale.setScalar(1.2*Math.max(.001,p.s));
    const d=t-T(56);let x=0,y=0;if(d>0&&d<.6){const k=eInOut(d/.6);x=lerp(0,4.5,k);y=lerp(0,2.5,k)}else if(d>=.6){const k=eOut(clamp((d-.6)/.7));x=lerp(-4.5,0,k);y=lerp(-1.5,0,k)}
    pl.position.set(x,y+Math.sin(t*2)*.15,0);pl.rotation.set(-.3+Math.sin(t*1.7)*.1,Math.PI/2+.35+Math.sin(t)*.2,Math.sin(t*2)*.15);
    trail.forEach((m,i)=>{const dd=d-(i+1)*.04;m.visible=dd>0&&dd<.6;const k=eInOut(clamp(dd/.6));m.position.set(lerp(0,4.5,k),lerp(0,2.5,k),0)})})}
// orbit cubes
{ const g=new THREE.Group();const core=new THREE.Mesh(new THREE.SphereGeometry(.8,48,24),M(0x2d5bff,{metalness:.3,emissive:0x1d2bff,emissiveIntensity:.25}));g.add(core);
  const cubes=[];['SITI','GEST.','APP','AI'].forEach((s,i)=>{const st=texCanvas(256,256,(x)=>{x.fillStyle=['#ff3d7f','#ffc53d','#2ee59d','#a36bff'][i];x.fillRect(0,0,256,256);x.fillStyle='#10131f';x.font='900 '+(s.length>3?62:82)+'px Inter';x.textAlign='center';x.fillText(s,128,155)});st.redraw();
    const m=new THREE.MeshPhysicalMaterial({map:st.tx,roughness:.3,clearcoat:1});const c=new THREE.Mesh(new RoundedBoxGeometry(1.1,1.1,1.1,4,.14),m);g.add(c);cubes.push(c)});
  const ring=new THREE.Mesh(new THREE.TorusGeometry(2.2,.03,8,120),M(0xffffff,{emissive:0xffffff,emissiveIntensity:.4}));ring.rotation.x=Math.PI/2-.25;g.add(ring);sh(g);
  add3('orbit',g,(t)=>{const p=pop(t,SC[7].t0+.1,.45);g.scale.setScalar(Math.max(.001,p.s));g.position.y=Math.sin(t*1.5)*.08;const beat=1+.08*Math.exp(-((t%BEAT)/BEAT)*6);core.scale.setScalar(beat);
    cubes.forEach((c,i)=>{const q=pop(t,T(66+i)-.03,.35);c.visible=q.p>0;c.scale.setScalar(Math.max(.001,q.s));const a=t*.8+i*Math.PI/2;c.position.set(Math.cos(a)*2.2,Math.sin(a)*.55,Math.sin(a)*2.2*.9);c.rotation.set(0,-a+Math.PI/2,0)})})}
// server rack
{ const g=new THREE.Group();g.add(new THREE.Mesh(new RoundedBoxGeometry(2.4,4.2,1.8,4,.12),M(0x1c1f2e,{roughness:.3})));const leds=[];
  for(let i=0;i<6;i++){const u=new THREE.Mesh(new RoundedBoxGeometry(2.1,.5,.1,2,.04),M(0x2a2e40,{roughness:.25}));u.position.set(0,1.6-i*.63,.9);g.add(u);
    for(let j=0;j<3;j++){const l=new THREE.Mesh(new THREE.SphereGeometry(.07,10,6),new THREE.MeshBasicMaterial({color:0x2ee59d}));l.position.set(.5+j*.22,1.6-i*.63,.97);g.add(l);leds.push(l)}}sh(g);
  add3('rack',g,(t)=>{const p=pop(t,SC[8].t0+.1,.45);const out=clamp((t-T(85)+.15)/.2);g.scale.setScalar(.85*Math.max(.001,p.s*(1-out)));g.rotation.set(.1,-.5+Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.08;
    leds.forEach((l,i)=>{l.visible=hash(i*13+Math.floor(t*8))>.35;l.material.color.set(i%5===0?0x13b4ff:0x2ee59d)})})}
const BOX={calc:[540,1000,760],clock:[540,940,640],cal:[540,900,620],trash:[540,940,680],gears:[540,920,680],cab:[540,920,640],plane:[540,920,740],orbit:[540,980,860],rack:[540,1000,700]};
const SCN={
 calc(t){render3D('calc',t,BOX.calc);const q=pop(t,T(3)-.05,.3);withT(540,1500,q.s,q.a,()=>pill('Studio professionale',540,1500,{size:44,bg:'#fff',c:'#1d4bff'}))},
 clock(t){render3D('clock',t,BOX.clock);const q=pop(t,T(12)-.05,.3);withT(540,690,q.s,q.a,()=>pill('−2 ore al giorno',540,690,{size:40,bg:'#10131f',c:'#FFD60A'}));
   const c=pop(t,T(15)-.1,.3);withT(540,1440,c.s,c.a,()=>{card(150,1270,780,330);[['Scaricare fatture',T(15)],['Rinominare file',T(17)],['Mandare promemoria',T(20)]].forEach(([s,tt],i)=>{const y=1350+i*90;const r=prog(t,tt-.03,.2);if(r<=0)return;
     ctx.globalAlpha*=r;ctx.beginPath();ctx.arc(215,y-14,26,0,7);ctx.fillStyle='#ff2e4d';ctx.fill();txt('×',215,y-1,{size:40,w:900,c:'#fff',al:'center'});txt(s,265,y,{size:40,w:800});pill('a mano',820,y-14,{size:26,bg:'#eef0f6',c:'#ff2e4d',pad:16});ctx.globalAlpha=c.a})})},
 math(t){render3D('cal',t,BOX.cal);const c=pop(t,T(25)-.1,.35);withT(540,1440,c.s,c.a,()=>{card(130,1270,820,340);
   txt('2 ore × 20 giorni',180,1355,{size:42,w:700,c:'#6b7185'});txt('= 40 ore',900,1355,{size:46,w:900,c:'#10131f',al:'right'});
   const r=pop(t,T(29)-.05,.3);withT(540,1450,r.s,r.a,()=>{txt('× 12 mesi',180,1475,{size:42,w:700,c:'#6b7185'});txt('= 480 ore',900,1475,{size:46,w:900,c:'#ff2e4d',al:'right'})});
   if(t>=T(31))stampTxt('ALL\'ANNO',540,1570,t,T(32),'#6a2cf5',-.04,34)})},
 trash(t){render3D('trash',t,BOX.trash);stampTxt('3 MESI DI LAVORO',540,1440,t,T(34)-.05,'#fff',-.06,52);stampTxt('BUTTATI',540,1590,t,T(37),'#ff2e4d',.05,70)},
 gears(t){render3D('gears',t,BOX.gears);const q=pop(t,T(39)-.05,.3);withT(540,690,q.s,q.a,()=>pill('Automazione su misura',540,690,{size:38,bg:'#FFD60A',c:'#10131f'}));
   const c=pop(t,T(43)-.05,.35);withT(540,1460,c.s,c.a,()=>{card(150,1330,780,250);ctx.beginPath();ctx.arc(240,1410,46,0,7);ctx.fillStyle='#ff5e00';ctx.fill();txt('@',240,1427,{size:48,w:900,c:'#fff',al:'center'});
     txt('Nuova email',310,1400,{size:36,w:800});txt('da Rossi Srl',310,1442,{size:28,w:600,c:'#6b7185'});
     const a=pop(t,T(45)-.05,.3);withT(540,1525,a.s,a.a,()=>{rr(200,1490,680,70,20);ctx.fillStyle='#eef0f6';ctx.fill();txt('PDF',250,1537,{size:28,w:900,c:'#ff2e4d',al:'center'});txt('Fattura_0458.pdf',310,1537,{size:32,w:700})})})},
 files(t){render3D('cab',t,BOX.cab);const q=pop(t,T(51)-.05,.35);withT(540,1480,q.s,q.a,()=>pill('Clienti › Rossi Srl › Fatture',540,1480,{size:38,bg:'#fff',c:'#10131f'}));
   const d=pop(t,T(49)-.05,.3);withT(540,690,d.s,d.a,()=>pill('Da soli',540,690,{size:40,bg:'#2EE59D',c:'#10131f'}));if(t>=T(52))check(870,1380,30,prog(t,T(52),.35))},
 plane(t){render3D('plane',t,BOX.plane);const c=pop(t,T(55)-.1,.35);withT(540,1440,c.s,c.a,()=>{card(150,1300,780,260);rr(190,1340,170,180,24);ctx.fillStyle='#ff2e4d';ctx.fill();
   txt('OTT',275,1390,{size:30,w:900,c:'#fff',al:'center'});txt('30',275,1485,{size:84,w:900,c:'#fff',al:'center',ls:-3});txt('Scadenza fattura',400,1400,{size:36,w:800});
   const s=pop(t,T(56),.3);withT(600,1470,s.s,s.a,()=>{pill('Sollecito inviato',600,1470,{size:32,bg:'#19c37d',c:'#fff',pad:22})})});
   const z=pop(t,T(63)-.05,.3);withT(540,690,z.s,z.a,()=>pill('0 click',540,690,{size:44,bg:'#10131f',c:'#2EE59D'}))},
 all(t){render3D('orbit',t,BOX.orbit);const z=pop(t,T(73)-.05,.35);withT(540,1560,z.s,z.a,()=>pill('Automatizza qualsiasi cosa',540,1560,{size:44,bg:'#2EE59D',c:'#10131f'}))},
 payoff(t){render3D('rack',t,BOX.rack);if(t>=T(85)-.05)drawLogo(t,T(85)-.05,540,1060,700)},
};
