const ST=n=>SC.find(s=>s.name===n).t0;
const SP={boss:['violet','pink','violet'],copy:['blue','teal','blue'],manual:['grey','navy','grey'],wait:['red','orange'],auto:['green','teal','green','mint','green'],
 sleep:['navy2'],all:['pink','orange','violet'],payoff:['night','navy','navy2'],cta:['orange','violet','green','navy']};
function labelTex(s,w=256,h=256,col='#fff',size=150,bg=null){const st=texCanvas(w,h,(x)=>{x.clearRect(0,0,w,h);if(bg){x.fillStyle=bg;x.fillRect(0,0,w,h)}x.fillStyle=col;x.font='900 '+size+'px Inter';x.textAlign='center';x.fillText(s,w/2,h*.7)});st.redraw();return st}
function plane(st,w,h){return new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:st.tx,transparent:true,toneMapped:false}))}
// badge + crown
{ const g=new THREE.Group();
  const st=texCanvas(512,700,(x)=>{x.fillStyle='#ffffff';x.fillRect(0,0,512,700);x.fillStyle='#6a2cf5';x.fillRect(0,0,512,170);x.fillStyle='#fff';x.font='900 56px Inter';x.textAlign='center';x.fillText('STAFF',256,110);
    x.fillStyle='#e9e3ff';x.beginPath();x.arc(256,320,110,0,7);x.fill();x.fillStyle='#6a2cf5';x.beginPath();x.arc(256,290,45,0,7);x.fill();x.beginPath();x.ellipse(256,395,80,50,0,Math.PI,0);x.fill();
    x.fillStyle='#10131f';x.font='900 54px Inter';x.fillText('IL TITOLARE',256,510);x.fillStyle='#6b7185';x.font='700 34px Inter';x.fillText('Turno: sempre',256,570);x.fillStyle='#ff9f43';x.font='900 34px Inter';x.fillText('Copia & incolla',256,630)});st.redraw();
  const card3=new THREE.Mesh(new RoundedBoxGeometry(2.4,3.3,.08,4,.14),M(0xffffff,{roughness:.35}));g.add(card3);
  const face=plane(st,2.3,3.15);face.position.z=.045;g.add(face);
  const clip=new THREE.Mesh(new RoundedBoxGeometry(.7,.3,.14,3,.06),M(0xc9ced9,{metalness:1,roughness:.2}));clip.position.y=1.75;g.add(clip);
  const lan=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(-.3,1.85,0),new THREE.Vector3(-1.1,3.4,-.3),new THREE.Vector3(0,4.4,-.5),new THREE.Vector3(1.1,3.4,-.3),new THREE.Vector3(.3,1.85,0)]),40,.07,8),M(0x6a2cf5));g.add(lan);
  const crown=new THREE.Group();const cb=new THREE.Mesh(new THREE.CylinderGeometry(.8,.8,.45,40,1,true),gold());cb.material.side=THREE.DoubleSide;crown.add(cb);
  for(let i=0;i<5;i++){const a=i/5*Math.PI*2;const sp=new THREE.Mesh(new THREE.ConeGeometry(.2,.55,4),gold());sp.position.set(Math.cos(a)*.75,.48,Math.sin(a)*.75);crown.add(sp);
    const gem=new THREE.Mesh(new THREE.SphereGeometry(.09,16,12),M([0xff2e4d,0x2d5bff,0x19c37d,0xff2e4d,0x2d5bff][i]));gem.position.set(Math.cos(a)*.81,0,Math.sin(a)*.81);crown.add(gem)}
  crown.position.set(1.1,2.1,.5);crown.rotation.z=-.3;g.add(crown);sh(g);
  add3('badge',g,(t)=>{const p=pop(t,.05,.45);g.scale.setScalar(1.0*Math.max(.001,p.s));g.rotation.set(.05,-.35+Math.sin(t*1.2)*.35,Math.sin(t*1.6)*.05);g.position.y=-.9+Math.sin(t*1.5)*.06;
    const c=pop(t,T(6)-.05,.35);crown.visible=c.p>0;crown.scale.setScalar(Math.max(.001,c.s));crown.rotation.y=t*1.2})}
// keyboard with ctrl C / ctrl V
{ const g=new THREE.Group();const base=new THREE.Mesh(new RoundedBoxGeometry(5.2,.3,2.2,4,.12),M(0x2a2e40,{metalness:.6,roughness:.3}));g.add(base);const keys=[];
  for(let r=0;r<3;r++)for(let c=0;c<8;c++){if(r===2&&c>2&&c<6)continue;const k=new THREE.Mesh(new RoundedBoxGeometry(.52,.2,.52,3,.07),M(0xe9ecf5,{roughness:.35}));k.position.set(-2.1+c*.6,.22,-.65+r*.62);g.add(k);keys.push(k)}
  const sp=new THREE.Mesh(new RoundedBoxGeometry(1.75,.2,.52,3,.07),M(0xe9ecf5));sp.position.set(.3,.22,.59);g.add(sp);
  const mk=(s,col)=>{const k=new THREE.Group();const b=new THREE.Mesh(new RoundedBoxGeometry(1.0,.35,1.0,4,.12),M(col));k.add(b);const l=plane(labelTex(s,256,256,'#fff',130),.8,.8);l.rotation.x=-Math.PI/2;l.position.y=.18;k.add(l);return k};
  const kc=mk('C',0xff3d7f),kv=mk('V',0x2d5bff);kc.position.set(-1.0,.9,.2);kv.position.set(1.0,.9,.2);g.add(kc,kv);sh(g);
  add3('kbd',g,(t)=>{const p=pop(t,ST('copy')+.08,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.7,Math.sin(t*1.1)*.25,0);g.position.y=Math.sin(t*1.5)*.05;
    const ph=Math.floor(t*4.5)%2;kc.position.y=.9-(ph===0?.22:0);kv.position.y=.9-(ph===1?.22:0);keys.forEach((k,i)=>{k.position.y=.22-((Math.floor(t*9)+i*7)%13===0?.08:0)})})}
// paper stack fluttering
{ const g=new THREE.Group();const S=[];for(let i=0;i<9;i++){const pp=new THREE.Mesh(new THREE.BoxGeometry(2.1,.03,2.8),M(i%3===0?0xfff6d6:0xffffff,{roughness:.7,clearcoat:.1}));pp.position.y=-1.5+i*.07;pp.rotation.y=(hash(i)-.5)*.3;g.add(pp);S.push(pp)}
  const fly=[];for(let i=0;i<5;i++){const pp=new THREE.Mesh(new THREE.BoxGeometry(1.5,.02,2),M(0xffffff,{roughness:.7}));g.add(pp);fly.push(pp)}sh(g);
  add3('papers',g,(t)=>{const p=pop(t,ST('manual')+.08,.45);g.scale.setScalar(.95*Math.max(.001,p.s));g.rotation.set(.35,-.4+Math.sin(t*1.1)*.3,0);
    fly.forEach((f,i)=>{const ph=(t*.45+i/5)%1;f.position.set(Math.sin(i*2.1+t)*1.4,-1+ph*3.4,Math.cos(i*1.3)*.6);f.rotation.set(t*1.5+i,t+i,Math.sin(t*2+i)*.6)})})}
// hourglass + gear stopped
{ const g=new THREE.Group();const pts=[];for(let i=0;i<=20;i++){const y=-1.3+i*.13;const r=.12+.85*Math.pow(Math.abs(y)/1.3,1.4);pts.push(new THREE.Vector2(r,y))}
  const glass=new THREE.Mesh(new THREE.LatheGeometry(pts,48),M(0xffffff,{transparent:true,opacity:.3,roughness:.05}));g.add(glass);
  const wood=M(0xb07a3e,{roughness:.5,clearcoat:.3});[1.4,-1.4].forEach(y=>{const d=new THREE.Mesh(new THREE.CylinderGeometry(1.15,1.15,.2,40),wood);d.position.y=y;g.add(d)});
  [0,1,2].forEach(i=>{const a=i/3*Math.PI*2;const r=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,2.8,12),wood);r.position.set(Math.cos(a)*1.0,0,Math.sin(a)*1.0);g.add(r)});
  const sandT=new THREE.Mesh(new THREE.ConeGeometry(.7,.9,40),M(0xffc53d,{roughness:.7,clearcoat:0}));sandT.rotation.x=Math.PI;sandT.position.y=.65;g.add(sandT);
  const sandB=new THREE.Mesh(new THREE.ConeGeometry(.75,.6,40),M(0xffc53d,{roughness:.7,clearcoat:0}));sandB.position.y=-1.0;g.add(sandB);
  const stream=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,1.1,8),M(0xffc53d));stream.position.y=-.3;g.add(stream);sh(g);
  add3('hourglass',g,(t)=>{const p=pop(t,ST('wait')+.08,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.1,t*.6,Math.sin(t*1.3)*.08);g.position.y=Math.sin(t*1.5)*.06+.2;
    const k=clamp((t-ST('wait'))/3);sandT.scale.set(1-k*.5,1-k*.6,1-k*.5);sandB.scale.set(.6+k*.5,.5+k*.7,.6+k*.5)})}
// interlocking gears
function gearGeo(R,n,th=.35){const s=new THREE.Shape();const r0=R*.82;for(let i=0;i<n*2;i++){const a0=i/(n*2)*Math.PI*2,a1=(i+1)/(n*2)*Math.PI*2;const r=i%2?r0:R;
  if(i===0)s.moveTo(Math.cos(a0)*r,Math.sin(a0)*r);s.lineTo(Math.cos(a0)*r,Math.sin(a0)*r);s.lineTo(Math.cos(a1)*r,Math.sin(a1)*r)}
  const h=new THREE.Path();h.absarc(0,0,R*.28,0,Math.PI*2,true);s.holes.push(h);const ge=new THREE.ExtrudeGeometry(s,{depth:th,bevelEnabled:true,bevelThickness:.05,bevelSize:.04,bevelSegments:2});ge.center();return ge}
{ const g=new THREE.Group();const g1=new THREE.Mesh(gearGeo(1.3,14),M(0x19c37d,{metalness:.5,roughness:.25}));const g2=new THREE.Mesh(gearGeo(.85,9),M(0xffc53d,{metalness:.8,roughness:.2}));const g3=new THREE.Mesh(gearGeo(.7,8),M(0x2d5bff,{metalness:.5,roughness:.25}));
  g1.position.set(-.7,0,0);g2.position.set(1.32,.55,0);g3.position.set(.9,-1.55,0);g.add(g1,g2,g3);sh(g);
  add3('gears',g,(t)=>{const p=pop(t,ST('auto')+.06,.45);g.scale.setScalar(1.05*Math.max(.001,p.s));g.rotation.set(-.25,-.5+Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.06+.2;
    const a=t*1.6;g1.rotation.z=a;g2.rotation.z=-a*14/9+.2;g3.rotation.z=-a*14/8+.1})}
// pillow + Zs
{ const g=new THREE.Group();const pil=new THREE.Mesh(new RoundedBoxGeometry(3.2,.9,2.0,8,.42),M(0xeef1ff,{roughness:.6,clearcoat:.2}));pil.scale.set(1,1,1);g.add(pil);
  const zz=[];for(let i=0;i<3;i++){const z=plane(labelTex('Z',128,128,'#9fc0ff',110),.8-i*.15,.8-i*.15);g.add(z);zz.push(z)}
  const moon=new THREE.Group();const ms=new THREE.Mesh(new THREE.SphereGeometry(.45,40,30),M(0xfff1b8,{emissive:0xffd66b,emissiveIntensity:.35,roughness:.6}));moon.add(ms);
  const ct=new THREE.Mesh(new THREE.SphereGeometry(.42,40,30),M(0x1a1040,{roughness:.6}));ct.position.set(.24,.14,.24);moon.add(ct);moon.position.set(-1.6,1.6,-.3);g.add(moon);sh(g);
  add3('pillow',g,(t)=>{const p=pop(t,ST('sleep')+.04,.35);g.scale.setScalar(.9*Math.max(.001,p.s));g.rotation.set(.35,Math.sin(t*.9)*.3,0);pil.scale.y=1+.04*Math.sin(t*3);
    zz.forEach((z,i)=>{const ph=(t*.7+i/3)%1;z.position.set(.6+ph*.9,.8+ph*1.6,.4);z.material.opacity=Math.sin(ph*Math.PI)})})}
// torus knot + orbiting orbs
{ const g=new THREE.Group();const k=new THREE.Mesh(new THREE.TorusKnotGeometry(.9,.3,160,24),M(0xff3d7f,{metalness:.3,roughness:.15}));g.add(k);
  const orbs=[0x2d5bff,0xffc53d,0x19c37d,0x6a2cf5].map(c=>{const o=new THREE.Mesh(new THREE.SphereGeometry(.28,32,24),M(c));g.add(o);return o});sh(g);
  add3('knot',g,(t)=>{const p=pop(t,ST('all')+.06,.45);g.scale.setScalar(1.1*Math.max(.001,p.s));k.rotation.set(t*.7,t*.9,0);g.position.y=Math.sin(t*1.5)*.06;
    const tt=[T(65),T(66),T(67),T(68)];orbs.forEach((o,i)=>{const q=pop(t,tt[i]-.04,.3);o.visible=q.p>0;o.scale.setScalar(Math.max(.001,q.s));const a=t*1.4+i*Math.PI/2;o.position.set(Math.cos(a)*1.9,Math.sin(a*1.3)*.5,Math.sin(a)*1.9)})})}
// server rack at night
{ const g=new THREE.Group();const rack=new THREE.Mesh(new RoundedBoxGeometry(2.2,3.8,1.6,4,.12),M(0x1a1f45,{metalness:.6,roughness:.3}));g.add(rack);const leds=[];
  for(let i=0;i<6;i++){const u=new THREE.Mesh(new RoundedBoxGeometry(1.9,.42,.1,3,.05),M(0x2a2e60,{metalness:.7,roughness:.3}));u.position.set(0,1.45-i*.58,.81);g.add(u);
    for(let j=0;j<4;j++){const l=new THREE.Mesh(new THREE.SphereGeometry(.05,12,8),new THREE.MeshBasicMaterial({color:0x2ee59d}));l.position.set(-.75+j*.16,1.45-i*.58,.88);g.add(l);leds.push(l)}
    const sl=new THREE.Mesh(new RoundedBoxGeometry(.8,.08,.04,2,.02),M(0x0b0e2a));sl.position.set(.45,1.45-i*.58,.88);g.add(sl)}sh(g);
  add3('rack',g,(t)=>{const p=pop(t,ST('payoff')+.08,.45);const out=clamp((t-T(80)+.15)/.2);g.scale.setScalar(1.05*Math.max(.001,p.s*(1-out)));g.rotation.set(.12,-.4+Math.sin(t*.9)*.35,0);g.position.y=Math.sin(t*1.5)*.08;
    leds.forEach((l,i)=>{const on=hash(Math.floor(t*8)+i*13.7)>.35;l.material.color.setHex(on?(i%5===0?0x13b4ff:0x2ee59d):0x0b2a20)})})}
const BOX={badge:[540,1080,900],kbd:[540,960,820],papers:[540,800,560],hourglass:[540,940,760],gears:[540,800,520],pillow:[540,1000,760],knot:[540,880,620],rack:[540,1000,760]};
function strike(x0,x1,y,k){if(k<=0)return;ctx.strokeStyle='#ff2e4d';ctx.lineWidth=8;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x0,y);ctx.lineTo(x0+(x1-x0)*k,y);ctx.stroke()}
const SCN={
 boss(t){render3D('badge',t,BOX.badge);const q=pop(t,T(6)-.05,.3);withT(780,1520,q.s,q.a,()=>pill('Stipendio: 0 €',780,1520,{size:42,bg:'#FFD60A',c:'#10131f'}))},
 copy(t){render3D('kbd',t,BOX.kbd);const q=pop(t,T(13)-.05,.3);withT(540,1400,q.s,q.a,()=>{card(300,1320,480,160,{r:40});ctx.beginPath();ctx.arc(385,1400,42,0,7);ctx.strokeStyle='#1d4bff';ctx.lineWidth=8;ctx.stroke();ctx.lineCap='round';ctx.beginPath();ctx.moveTo(385,1400);ctx.lineTo(385,1372);ctx.moveTo(385,1400);ctx.lineTo(362,1390);ctx.stroke();txt('23:40',600,1430,{size:86,w:900,c:'#1d4bff',al:'center'})})},
 manual(t){render3D('papers',t,BOX.papers);const c=pop(t,ST('manual')+.05,.35);withT(540,1340,c.s,c.a,()=>{card(120,1080,840,520,{r:44});txt('Lavoro a mano',170,1160,{size:38,w:800,c:'#6b7185'});
   const rows=[['Ordini email → gestionale',T(19),T(24)],['Bolle ricopiate in Excel',T(26),T(29)],['Solleciti uno per uno',T(30),T(33)]];
   rows.forEach(([s,a,b],i)=>{const y=1260+i*120;const r=prog(t,a-.05,.25);if(r<=0)return;ctx.globalAlpha=c.a*clamp(r*3);txt(s,170,y,{size:44,w:800,c:'#10131f'});ctx.font='800 44px Inter';const w=ctx.measureText(s).width;strike(165,175+w,y-14,eOut(prog(t,b,.3)));ctx.globalAlpha=c.a})})},
 wait(t){render3D('hourglass',t,BOX.hourglass);const q=pop(t,T(37)-.05,.3);withT(540,1420,q.s,q.a,()=>{card(220,1330,640,190,{r:40});txt('Produzione',540,1405,{size:40,w:800,c:'#6b7185',al:'center'});txt('in attesa…',540,1480,{size:56,w:900,c:'#10131f',al:'center'})});
   stampTxt('FERMA',540,1610,t,T(39)-.02,'#ffffff',-.08,64)},
 auto(t){render3D('gears',t,BOX.gears);const c=pop(t,T(44)-.05,.35);withT(540,1350,c.s,c.a,()=>{card(110,1070,860,560,{r:44});
   const rows=[['L\'ordine arriva',T(46)],['Entra nel sistema',T(48)],['Conferma al cliente',T(53)],['Magazzino aggiornato',T(58)]];
   rows.forEach(([s,a],i)=>{const y=1160+i*125;const r=prog(t,a-.05,.25);ctx.globalAlpha=c.a*(.25+.75*clamp(r*3));check(200,y-14,34,prog(t,a,.35));txt(s,260,y,{size:46,w:800,c:'#10131f'});
     if(i<3){ctx.fillStyle='#e3e7f2';ctx.fillRect(196,y+26,8,60)}ctx.globalAlpha=c.a})})},
 sleep(t){render3D('pillow',t,BOX.pillow);const q=pop(t,T(64)-.05,.3);withT(540,1520,q.s,q.a,()=>pill('Fa tutto da solo',540,1520,{size:46,bg:'#2EE59D',c:'#10131f'}))},
 all(t){render3D('knot',t,BOX.knot);const items=[['Siti',T(65),360,1330],['Gestionali',T(66),720,1330],['App',T(67),360,1460],['Intelligenza artificiale',T(68),540,1590]];
   items.forEach(([s,tt,x,y],i)=>{if(i===2)x=720-300;const q=pop(t,tt-.05,.3);withT(x,y,q.s,q.a,()=>{const w=pill(s,x,y,{size:44,bg:'#fff',c:'#10131f'});check(x-w/2+6,y-44,24,prog(t,tt,.35))})});
   const z=pop(t,T(71)-.05,.3);withT(720,1460,z.s,z.a,()=>pill('Qualsiasi cosa',720,1460,{size:44,bg:'#FFD60A',c:'#10131f'}))},
 payoff(t){render3D('rack',t,BOX.rack);if(t>=T(80)-.05)drawLogo(t,T(80)-.05,540,1060,700)},
};
