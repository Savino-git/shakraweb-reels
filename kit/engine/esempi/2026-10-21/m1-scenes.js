const ST=n=>SC.find(s=>s.name===n).t0;
const SP={night:['night','navy2','night'],phone:['grey','red','grey','orange'],lost:['red','pink','red'],online:['blue','teal','blue','violet'],
 day:['orange','navy'],remind:['green','teal','green','mint'],work:['violet','pink','violet','blue'],all:['navy2','violet','blue','navy2'],payoff:['night','navy','navy2'],cta:['blue','violet','green','navy']};
function labelTex(s,w=256,h=256,col='#fff',size=150){const st=texCanvas(w,h,(x)=>{x.clearRect(0,0,w,h);x.fillStyle=col;x.font='900 '+size+'px Inter';x.textAlign='center';x.fillText(s,w/2,h*.7)});st.redraw();return st}
// moon + wall clock 23:00
{ const g=new THREE.Group();
  const clock=new THREE.Group();const rim=new THREE.Mesh(new THREE.TorusGeometry(1.5,.18,20,80),M(0xffffff,{roughness:.3}));clock.add(rim);
  const face=new THREE.Mesh(new THREE.CylinderGeometry(1.45,1.45,.12,64),M(0x1a1f45,{roughness:.4}));face.rotation.x=Math.PI/2;clock.add(face);
  for(let i=0;i<12;i++){const a=i/12*Math.PI*2;const m=new THREE.Mesh(new RoundedBoxGeometry(.08,i%3?.18:.32,.06,2,.02),M(0xffffff));m.position.set(Math.sin(a)*1.2,Math.cos(a)*1.2,.08);m.rotation.z=-a;clock.add(m)}
  const hh=new THREE.Mesh(new RoundedBoxGeometry(.13,.75,.06,2,.03),M(0xffc53d,{metalness:.6}));hh.geometry.translate(0,.32,0);hh.position.z=.12;clock.add(hh);
  const mh=new THREE.Mesh(new RoundedBoxGeometry(.09,1.05,.06,2,.03),M(0xffffff,{metalness:.4}));mh.geometry.translate(0,.46,0);mh.position.z=.15;clock.add(mh);
  const pin=new THREE.Mesh(new THREE.SphereGeometry(.1,16,12),M(0xff2e4d));pin.position.z=.2;clock.add(pin);g.add(clock);
  const moon=new THREE.Group();const ms=new THREE.Mesh(new THREE.SphereGeometry(.75,40,30),M(0xfff1b8,{emissive:0xffd66b,emissiveIntensity:.35,roughness:.6,clearcoat:.2}));moon.add(ms);
  const cut=new THREE.Mesh(new THREE.SphereGeometry(.7,40,30),M(0x0d1033,{roughness:.6}));cut.position.set(.38,.22,.35);moon.add(cut);moon.position.set(1.7,1.5,-.3);g.add(moon);
  const st=[];for(let i=0;i<7;i++){const s=new THREE.Mesh(new THREE.OctahedronGeometry(.12),M(0xffffff,{emissive:0xffffff,emissiveIntensity:.8}));s.position.set(Math.cos(i*2.1)*2.6,Math.sin(i*1.3)*2,-.6);g.add(s);st.push(s)}sh(g);
  add3('clock',g,(t)=>{const p=pop(t,0,.4);g.scale.setScalar(.82*Math.max(.001,p.s));g.rotation.set(.05,-.3+Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.07;
    const k=eOut(prog(t,T(8),.6));const hr=lerp(9,11,k);hh.rotation.z=-hr/12*Math.PI*2;mh.rotation.z=-(k*24)*Math.PI*2;
    moon.rotation.y=t*.4;st.forEach((s,i)=>s.scale.setScalar(.5+.5*Math.abs(Math.sin(t*3+i))))})}
// old telephone ringing
{ const g=new THREE.Group();const base=new THREE.Mesh(new RoundedBoxGeometry(3,1.3,2,6,.45),M(0xff2e4d,{roughness:.25}));base.position.y=-.8;g.add(base);
  const dial=new THREE.Mesh(new THREE.CylinderGeometry(.62,.62,.12,48),M(0xffffff,{roughness:.3}));dial.rotation.x=Math.PI/2*0.6;dial.position.set(0,-.55,1.0);g.add(dial);
  for(let i=0;i<10;i++){const a=i/10*Math.PI*1.6+.6;const h=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,.14,16),M(0x10131f));h.rotation.x=Math.PI/2*0.6;h.position.set(Math.cos(a)*.42,-.55+Math.sin(a)*.42*.81,1.0+Math.sin(a)*.42*.59+.02);g.add(h)}
  const hs=new THREE.Group();const bar=new THREE.Mesh(new THREE.CapsuleGeometry(.24,2.4,8,20),M(0xff2e4d,{roughness:.25}));bar.rotation.z=Math.PI/2;hs.add(bar);
  [-1.35,1.35].forEach(x=>{const c=new THREE.Mesh(new THREE.CylinderGeometry(.45,.38,.5,32),M(0xff2e4d,{roughness:.25}));c.position.set(x,-.25,0);hs.add(c)});hs.position.y=.15;g.add(hs);
  const waves=[];for(let i=0;i<3;i++){const w=new THREE.Mesh(new THREE.TorusGeometry(1.9+i*.45,.06,8,60,Math.PI*.5),M(0xffffff,{emissive:0xffffff,emissiveIntensity:.5}));w.rotation.z=Math.PI/4;w.position.y=-.3;g.add(w);waves.push(w)}sh(g);
  add3('tel',g,(t)=>{const p=pop(t,ST('phone')+.1,.45);g.scale.setScalar(.82*Math.max(.001,p.s));g.rotation.set(.2,Math.sin(t*1.1)*.35,0);g.position.y=Math.sin(t*1.5)*.07;
    const r=t<T(16)?Math.sin(t*45)*.08:0;hs.position.y=.15+(t<T(16)?Math.abs(Math.sin(t*22))*.15:0);hs.rotation.z=r;
    waves.forEach((w,i)=>{const q=((t*1.6)+i/3)%1;w.scale.setScalar(.8+q*.5);w.material.opacity=1;w.visible=t<T(16)})})}
// red X over calendar (lost booking)
{ const g=new THREE.Group();const cal=new THREE.Mesh(new RoundedBoxGeometry(3,3.2,.4,6,.3),M(0xffffff,{roughness:.3}));g.add(cal);
  const top=new THREE.Mesh(new RoundedBoxGeometry(3,.8,.45,6,.3),M(0x2d5bff));top.position.y=1.2;g.add(top);
  [-.8,.8].forEach(x=>{const r=new THREE.Mesh(new THREE.TorusGeometry(.2,.07,10,24),M(0xc9ced9,{metalness:1}));r.position.set(x,1.65,0);g.add(r)});
  const dt=labelTex('10',256,256,'#10131f',170);const dm=new THREE.Mesh(new THREE.PlaneGeometry(1.8,1.8),new THREE.MeshBasicMaterial({map:dt.tx,transparent:true,toneMapped:false}));dm.position.set(0,-.25,.21);g.add(dm);
  const X=new THREE.Group();[1,-1].forEach(s=>{const b=new THREE.Mesh(new RoundedBoxGeometry(3.6,.45,.45,4,.2),M(0xff2e4d));b.rotation.z=s*Math.PI/4;X.add(b)});X.position.z=.5;g.add(X);sh(g);
  add3('calx',g,(t)=>{const p=pop(t,ST('lost')+.1,.45);g.scale.setScalar(.78*Math.max(.001,p.s));g.rotation.set(.05,.3+Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.07;
    const q=pop(t,T(26)-.03,.3);X.visible=q.p>0;X.scale.setScalar(Math.max(.001,q.s))})}
// booking calendar with green slot
{ const g=new THREE.Group();const board=new THREE.Mesh(new RoundedBoxGeometry(3.6,3.6,.35,6,.35),M(0xffffff,{roughness:.3}));g.add(board);
  const cells=[];for(let r=0;r<4;r++)for(let c=0;c<4;c++){const m=new THREE.Mesh(new RoundedBoxGeometry(.7,.6,.2,3,.1),M(0xe8edf8,{roughness:.4}));m.position.set(-1.17+c*.78,1.1-r*.72,.22);g.add(m);cells.push(m)}
  const ck=new THREE.Group();const disc=new THREE.Mesh(new THREE.CylinderGeometry(.55,.55,.2,40),M(0x19c37d));disc.rotation.x=Math.PI/2;ck.add(disc);
  const ct=texCanvas(256,256,(x)=>{x.clearRect(0,0,256,256);x.strokeStyle='#fff';x.lineWidth=34;x.lineCap='round';x.lineJoin='round';x.beginPath();x.moveTo(60,135);x.lineTo(110,185);x.lineTo(200,85);x.stroke()});ct.redraw();const cm=new THREE.Mesh(new THREE.PlaneGeometry(.9,.9),new THREE.MeshBasicMaterial({map:ct.tx,transparent:true,toneMapped:false}));cm.position.z=.11;ck.add(cm);ck.position.set(1.5,1.5,.5);g.add(ck);sh(g);
  add3('book',g,(t)=>{const p=pop(t,ST('online')+.1,.45);g.scale.setScalar(.78*Math.max(.001,p.s));g.rotation.set(-.1,-.35+Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.07;
    const sel=t>=T(36);cells.forEach((m,i)=>{const on=sel&&i===6;m.material.color.set(on?0x19c37d:0xe8edf8);m.position.z=.22+(on?.15*eBack(prog(t,T(36),.3)):0)});
    const q=pop(t,T(39)-.03,.3);ck.visible=q.p>0;ck.scale.setScalar(Math.max(.001,q.s))})}
// sun / moon disk
{ const g=new THREE.Group();const sun=new THREE.Mesh(new THREE.SphereGeometry(1,40,30),M(0xffc53d,{emissive:0xff9f43,emissiveIntensity:.5}));sun.position.x=-1.6;g.add(sun);
  const rays=[];for(let i=0;i<10;i++){const r=new THREE.Mesh(new THREE.ConeGeometry(.16,.5,12),M(0xffc53d,{emissive:0xff9f43,emissiveIntensity:.4}));const a=i/10*Math.PI*2;r.position.set(-1.6+Math.cos(a)*1.4,Math.sin(a)*1.4,0);r.rotation.z=a-Math.PI/2;g.add(r);rays.push(r)}
  const moon=new THREE.Mesh(new THREE.SphereGeometry(.9,40,30),M(0xe9ecff,{roughness:.7,clearcoat:.2}));moon.position.x=1.6;g.add(moon);
  const cr=[[.3,.3,.2],[-.25,-.2,.15],[.1,-.45,.12]].map(([x,y,r])=>{const c=new THREE.Mesh(new THREE.SphereGeometry(r,20,16),M(0xc5cae6,{roughness:.8}));c.position.set(1.6+x,y,.78);g.add(c);return c});sh(g);
  add3('sunmoon',g,(t)=>{const p=pop(t,ST('day')+.1,.4);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(0,Math.sin(t*1.1)*.3,Math.sin(t*.8)*.1);g.position.y=Math.sin(t*1.5)*.07;
    const ks=pop(t,T(41)-.03,.3),km=pop(t,T(44)-.03,.3);sun.scale.setScalar(Math.max(.001,ks.s));rays.forEach(r=>{r.visible=ks.p>0;r.scale.setScalar(Math.max(.001,ks.s))});
    moon.scale.setScalar(Math.max(.001,km.s));cr.forEach(c=>c.visible=km.p>0);g.children.forEach((o,i)=>{if(rays.includes(o))o.rotation.z+=0})})}
// phone with reminder
{ const scr=(x,s=0)=>{x.fillStyle='#ece5dd';x.fillRect(0,0,512,1024);x.fillStyle='#075e54';x.fillRect(0,0,512,150);x.fillStyle='#fff';x.font='800 34px Inter';x.fillText('Studio Fisio',120,100);
    x.beginPath();x.arc(65,88,36,0,7);x.fillStyle='#25d366';x.fill();
    if(s>=1){x.fillStyle='#fff';x.beginPath();x.roundRect(30,200,440,250,28);x.fill();x.fillStyle='#075e54';x.font='800 30px Inter';x.fillText('Promemoria',60,255);
      x.fillStyle='#10131f';x.font='700 30px Inter';x.fillText('Domani alle 10:30',60,310);x.fillText('seduta con Giulia.',60,355);x.fillStyle='#6b7185';x.font='600 26px Inter';x.fillText('Confermi?  SÌ / NO',60,410)}
    if(s>=2){x.fillStyle='#dcf8c6';x.beginPath();x.roundRect(250,490,220,90,24);x.fill();x.fillStyle='#10131f';x.font='800 34px Inter';x.fillText('NO',330,548)}
    if(s>=3){x.fillStyle='#fff';x.beginPath();x.roundRect(30,620,440,150,28);x.fill();x.fillStyle='#19c37d';x.font='800 30px Inter';x.fillText('Posto liberato:',60,680);x.fillStyle='#10131f';x.font='700 30px Inter';x.fillText('nuovo paziente avvisato',60,728)}};
  const g=phone(0x2a2e40,scr);let last=-1;
  add3('remind',g,(t)=>{const p=pop(t,ST('remind')+.1,.45);g.scale.setScalar(.95*Math.max(.001,p.s));g.rotation.set(.05,-.3+Math.sin(t*1.1)*.25,Math.sin(t*.9)*.04);g.position.y=Math.sin(t*1.5)*.07;
    const s=t>=T(56)?3:t>=T(52)?2:t>=T(47)?1:0;if(s!==last){g.userData.st.redraw(s);last=s}})}
// headset crossed out
{ const g=new THREE.Group();const band=new THREE.Mesh(new THREE.TorusGeometry(1.5,.16,16,60,Math.PI),M(0x2a2e40,{metalness:.4}));band.position.y=.1;g.add(band);
  [-1.5,1.5].forEach(x=>{const c=new THREE.Mesh(new THREE.CylinderGeometry(.6,.6,.45,40),M(0xa36bff));c.rotation.z=Math.PI/2;c.position.set(x,0,0);g.add(c);
    const pad=new THREE.Mesh(new THREE.TorusGeometry(.42,.14,12,30),M(0x10131f,{roughness:.7}));pad.rotation.y=Math.PI/2;pad.position.set(x*.88,0,0);g.add(pad)});
  const mic=new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(new THREE.Vector3(-1.5,-.3,.3),new THREE.Vector3(-1.4,-1.4,.9),new THREE.Vector3(-.3,-1.3,1.1)),20,.06,8),M(0x2a2e40));g.add(mic);
  const tip=new THREE.Mesh(new THREE.SphereGeometry(.18,16,12),M(0x10131f));tip.position.set(-.3,-1.3,1.1);g.add(tip);
  const sl=new THREE.Mesh(new RoundedBoxGeometry(4.6,.4,.4,4,.18),M(0xff2e4d));sl.rotation.z=-Math.PI/4.5;sl.position.z=1.3;g.add(sl);sh(g);
  add3('headset',g,(t)=>{const p=pop(t,ST('work')+.1,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.05,Math.sin(t*1.1)*.35,0);g.position.y=Math.sin(t*1.5)*.07;
    const q=prog(t,T(66),.25);sl.visible=q>0;sl.scale.set(Math.max(.001,eOut(q)),1,1)})}
// gem for "all"
{ const g=new THREE.Group();const gem=new THREE.Mesh(new THREE.IcosahedronGeometry(1.5,0),M(0x13b4ff,{metalness:.3,roughness:.1,flatShading:true}));g.add(gem);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(2.3,.07,10,80),M(0xffc53d,{metalness:1,roughness:.2}));ring.rotation.x=1.2;g.add(ring);sh(g);
  add3('gem',g,(t)=>{const p=pop(t,ST('all')+.1,.45);g.scale.setScalar(.7*Math.max(.001,p.s));gem.rotation.set(t*.6,t*.9,0);ring.rotation.z=t*.8;g.position.y=Math.sin(t*1.5)*.07})}
// laptop glowing at night for payoff
{ const g=new THREE.Group();const base=new THREE.Mesh(new RoundedBoxGeometry(3.8,.18,2.5,4,.08),M(0xc9ced9,{metalness:.9,roughness:.25}));base.position.y=-1;g.add(base);
  const lid=new THREE.Group();const lb=new THREE.Mesh(new RoundedBoxGeometry(3.8,2.5,.12,4,.08),M(0xc9ced9,{metalness:.9,roughness:.25}));lb.position.y=1.25;lid.add(lb);
  const st=texCanvas(512,340,(x)=>{const gr=x.createLinearGradient(0,0,512,340);gr.addColorStop(0,'#1d4bff');gr.addColorStop(1,'#13b4ff');x.fillStyle=gr;x.fillRect(0,0,512,340);
    x.fillStyle='#fff';x.font='900 44px Inter';x.fillText('Prenotazioni',40,90);for(let i=0;i<4;i++){x.fillStyle='rgba(255,255,255,.9)';x.beginPath();x.roundRect(40,120+i*52,432,40,12);x.fill();x.fillStyle='#19c37d';x.beginPath();x.arc(445,140+i*52,12,0,7);x.fill()}});st.redraw();
  const s=new THREE.Mesh(new THREE.PlaneGeometry(3.5,2.25),new THREE.MeshBasicMaterial({map:st.tx,toneMapped:false}));s.position.set(0,1.25,.07);lid.add(s);lid.position.set(0,-.95,-1.2);g.add(lid);
  const stars=[];for(let i=0;i<8;i++){const o=new THREE.Mesh(new THREE.OctahedronGeometry(.12),M(0xffffff,{emissive:0xffffff,emissiveIntensity:.8}));o.position.set(Math.cos(i*2.3)*2.8,1.4+Math.sin(i*1.7)*1.2,-1.5);g.add(o);stars.push(o)}sh(g);
  add3('laptop',g,(t)=>{const p=pop(t,ST('payoff')+.1,.45);const out=clamp((t-T(95)+.15)/.2);g.scale.setScalar(.78*Math.max(.001,p.s*(1-out)));g.rotation.set(.25,-.4+Math.sin(t*.9)*.3,0);g.position.y=Math.sin(t*1.5)*.06;
    lid.rotation.x=-lerp(1.4,.15,eOut(prog(t,ST('payoff')+.1,.6)));stars.forEach((o,i)=>o.scale.setScalar(.5+.5*Math.abs(Math.sin(t*3+i))))})}
const BOX={clock:[540,960,720],tel:[540,930,700],calx:[540,920,680],book:[540,920,680],sunmoon:[540,960,760],remind:[540,1080,900],headset:[540,920,700],gem:[540,860,520],laptop:[540,960,740]};
const SCN={
 night(t){render3D('clock',t,BOX.clock);const q=pop(t,T(9)-.05,.3);withT(540,1440,q.s,q.a,()=>pill('Ore 23:00 · mal di schiena',540,1440,{size:44,bg:'#fff',c:'#10131f'}))},
 phone(t){render3D('tel',t,BOX.tel);const c=pop(t,T(18)-.08,.35);withT(540,1460,c.s,c.a,()=>{card(190,1330,700,250);
   txt('SEGRETERIA',250,1400,{size:30,w:900,c:'#ff2e4d',ls:2});txt('Lun–Ven · 9:00–12:00',250,1480,{size:48,w:900});txt('Richiamare domani',250,1540,{size:32,w:700,c:'#6b7185'})})},
 lost(t){render3D('calx',t,BOX.calx);const c=pop(t,T(27)-.08,.35);withT(540,1440,c.s,c.a,()=>{card(170,1320,740,240);
   txt('Un altro studio',230,1400,{size:34,w:700,c:'#6b7185'});txt('Prenotato · 9:00',230,1480,{size:52,w:900});check(830,1440,44,prog(t,T(29),.35))});
   stampTxt('PAZIENTE PERSO',540,1640,t,T(29)+.15,'#fff',-.06,50)},
 online(t){render3D('book',t,BOX.book);const q=pop(t,T(33)-.05,.3);withT(540,1420,q.s,q.a,()=>pill('Prenota online · 24/7',540,1420,{size:46,bg:'#fff',c:'#1d4bff'}));
   const r=pop(t,T(36)-.05,.3);withT(540,1550,r.s,r.a,()=>{const w=pill('Giovedì · 18:30',540,1550,{size:42,bg:'#2EE59D',c:'#10131f'});check(540+w/2+50,1550,32,prog(t,T(39),.35))})},
 day(t){render3D('sunmoon',t,BOX.sunmoon)},
 remind(t){render3D('remind',t,BOX.remind);const q=pop(t,T(56)-.05,.3);withT(540,1600,q.s,q.a,()=>pill('Posto libero in automatico',540,1600,{size:42,bg:'#FFD60A',c:'#10131f'}))},
 work(t){render3D('headset',t,BOX.headset);const c=pop(t,T(61)-.08,.35);withT(540,1450,c.s,c.a,()=>{card(190,1330,700,240);
   txt('Oggi',250,1400,{size:32,w:700,c:'#6b7185'});const n=Math.round(12*eOut(prog(t,T(68),.6)));txt(String(Math.max(0,n))+' sedute',250,1490,{size:60,w:900});
   txt('0 telefonate',830,1490,{size:36,w:800,c:'#19c37d',al:'right'})})},
 all(t){render3D('gem',t,BOX.gem);const items=[['Siti',T(79)],['Gestionali',T(80)],['App',T(81)],['Intelligenza artificiale',T(82)],['Qualsiasi cosa',T(84)]];
   items.forEach(([s,tt],i)=>{const q=pop(t,tt-.05,.3);withT(540,1180+i*112,q.s,q.a,()=>{const w=pill(s,540,1180+i*112,{size:44,bg:i===4?'#FFD60A':'#fff',c:'#10131f'});check(540-w/2-50,1180+i*112,30,prog(t,tt,.35))})})},
 payoff(t){render3D('laptop',t,BOX.laptop);if(t>=T(95)-.05)drawLogo(t,T(95)-.05,540,1060,700)},
};
