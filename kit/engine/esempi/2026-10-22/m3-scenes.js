const ST=n=>SC.find(s=>s.name===n).t0;
const SP={night:['night','navy2','night','navy'],late:['orange','red','orange','pink'],gone:['grey','red','grey'],bot:['green','teal','green','mint'],
 chat:['teal','blue','teal','green'],sell:['pink','orange','pink'],all:['violet','blue','navy2','violet'],payoff:['night','navy','navy2'],cta:['green','blue','violet','navy']};
function labelTex(s,w=256,h=256,col='#fff',size=150){const st=texCanvas(w,h,(x)=>{x.clearRect(0,0,w,h);x.fillStyle=col;x.font='900 '+size+'px Inter';x.textAlign='center';x.fillText(s,w/2,h*.7)});st.redraw();return st}
function plane(st,w,h){return new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:st.tx,transparent:true,toneMapped:false}))}
function moonG(r){const moon=new THREE.Group();const ms=new THREE.Mesh(new THREE.SphereGeometry(r,40,30),M(0xfff1b8,{emissive:0xffd66b,emissiveIntensity:.35,roughness:.6,clearcoat:.2}));moon.add(ms);
  const cut=new THREE.Mesh(new THREE.SphereGeometry(r*.93,40,30),M(0x0d1033,{roughness:.6}));cut.position.set(r*.5,r*.3,r*.5);moon.add(cut);return moon}
// dumbbell + moon
{ const g=new THREE.Group();const db=new THREE.Group();const bar=new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,4.2,24),M(0xc9ced9,{metalness:1,roughness:.2}));bar.rotation.z=Math.PI/2;db.add(bar);
  [-1,1].forEach(s=>{[[1.35,1.1],[1.7,.9]].forEach(([x,r])=>{const d=new THREE.Mesh(new THREE.CylinderGeometry(r,r,.32,48),M(0x10131f,{roughness:.35}));d.rotation.z=Math.PI/2;d.position.x=s*x;db.add(d);
    const rim=new THREE.Mesh(new THREE.TorusGeometry(r,.05,8,48),M(0x2EE59D,{emissive:0x2EE59D,emissiveIntensity:.4}));rim.rotation.y=Math.PI/2;rim.position.x=s*(x+.17);db.add(rim)})});g.add(db);
  const moon=moonG(.6);moon.position.set(1.8,2,-.6);g.add(moon);
  const stars=[];for(let i=0;i<6;i++){const s=new THREE.Mesh(new THREE.OctahedronGeometry(.11),M(0xffffff,{emissive:0xffffff,emissiveIntensity:.8}));s.position.set(Math.cos(i*2.1)*2.7,1+Math.sin(i*1.3)*1.4,-.8);g.add(s);stars.push(s)}sh(g);
  add3('dumb',g,(t)=>{const p=pop(t,.05,.45);g.scale.setScalar(.8*Math.max(.001,p.s));g.position.y=Math.sin(t*1.5)*.07;db.rotation.set(.3,t*.8,Math.sin(t*1.2)*.15);moon.rotation.y=t*.4;
    stars.forEach((s,i)=>s.scale.setScalar(.5+.5*Math.abs(Math.sin(t*3+i))))})}
// hourglass
{ const g=new THREE.Group();const pts=[];for(let i=0;i<=40;i++){const y=-1.6+i*3.2/40;const k=Math.abs(y)/1.6;pts.push(new THREE.Vector2(.12+1.0*Math.pow(k,.7),y))}
  const glass=new THREE.Mesh(new THREE.LatheGeometry(pts,48),new THREE.MeshPhysicalMaterial({color:0xdff3ff,transparent:true,opacity:.3,roughness:.05,clearcoat:1,side:THREE.DoubleSide}));g.add(glass);
  [-1.75,1.75].forEach(y=>{const c=new THREE.Mesh(new THREE.CylinderGeometry(1.35,1.35,.28,48),M(0x8a4b1f,{roughness:.45}));c.position.y=y;g.add(c)});
  [[1,1],[-1,1],[1,-1],[-1,-1]].forEach(([x,z])=>{const r=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,3.5,12),M(0x8a4b1f,{roughness:.45}));r.position.set(x*.95,0,z*.95*0);r.position.set(Math.cos(Math.atan2(z,x))*1.15,0,Math.sin(Math.atan2(z,x))*1.15);g.add(r)});
  const top=new THREE.Mesh(new THREE.ConeGeometry(.85,1,40),M(0xffc53d,{roughness:.6,clearcoat:.2}));top.rotation.x=Math.PI;g.add(top);
  const bot=new THREE.Mesh(new THREE.ConeGeometry(.9,1,40),M(0xffc53d,{roughness:.6,clearcoat:.2}));g.add(bot);
  const stream=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,1.5,8),M(0xffc53d));stream.position.y=-.75;g.add(stream);sh(g);
  add3('hour',g,(t)=>{const p=pop(t,ST('late')+.1,.45);g.scale.setScalar(.72*Math.max(.001,p.s));g.position.y=Math.sin(t*1.5)*.07;
    const k=clamp((t-ST('late'))/(ST('gone')-ST('late')));top.scale.set(1-k*.85,1-k*.85,1-k*.85);top.position.y=.25+.5*(1-k)*.6;bot.scale.set(.15+k*.85,.15+k*.85,.15+k*.85);bot.position.y=-1.6+.5*(.15+k*.85);
    g.rotation.set(.1,t*.5,Math.sin(t*1.1)*.12)})}
// membership card flying away
{ const g=new THREE.Group();const st=texCanvas(512,320,(x)=>{const gr=x.createLinearGradient(0,0,512,320);gr.addColorStop(0,'#10131f');gr.addColorStop(1,'#3a3f52');x.fillStyle=gr;x.fillRect(0,0,512,320);
    x.fillStyle='#FFD60A';x.font='900 40px Inter';x.fillText('PALESTRA',36,80);x.fillText('DI FRONTE',36,128);x.fillStyle='#fff';x.font='700 26px Inter';x.fillText('MEMBER · Mario Rossi',36,250);
    x.fillStyle='#FFD60A';x.beginPath();x.roundRect(390,40,86,64,12);x.fill()});st.redraw();
  const card3=new THREE.Mesh(new RoundedBoxGeometry(3.6,2.25,.08,4,.14),M(0x10131f,{metalness:.4,roughness:.25}));g.add(card3);const face=plane(st,3.45,2.15);face.position.z=.045;g.add(face);sh(g);
  add3('card',g,(t)=>{const p=pop(t,ST('gone')+.1,.45);const k=eInOut(prog(t,T(35),1.2));g.scale.setScalar(1.0*Math.max(.001,p.s)*(1-.25*k));
    g.rotation.set(.2-k*.4,-.4+Math.sin(t*1.1)*.3+k*2.5,k*.3);g.position.set(k*.8,Math.sin(t*1.5)*.07+k*.4,0)})}
// friendly robot head
{ const g=new THREE.Group();const head=new THREE.Mesh(new RoundedBoxGeometry(3,2.4,2.2,8,.6),M(0xffffff,{roughness:.25}));g.add(head);
  const visor=new THREE.Mesh(new RoundedBoxGeometry(2.4,1.3,.3,6,.3),M(0x10131f,{roughness:.15,metalness:.4}));visor.position.z=1.05;g.add(visor);
  const eyes=[-.55,.55].map(x=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.22,24,16),new THREE.MeshBasicMaterial({color:0x2EE59D,toneMapped:false}));e.position.set(x,.05,1.22);e.scale.z=.4;g.add(e);return e});
  const ant=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.7,12),M(0xc9ced9,{metalness:1}));ant.position.y=1.5;g.add(ant);
  const tip=new THREE.Mesh(new THREE.SphereGeometry(.18,20,14),M(0x25d366,{emissive:0x25d366,emissiveIntensity:.6}));tip.position.y=1.9;g.add(tip);
  [-1,1].forEach(s=>{const ear=new THREE.Mesh(new THREE.CylinderGeometry(.45,.45,.3,32),M(0x25d366));ear.rotation.z=Math.PI/2;ear.position.x=s*1.6;g.add(ear)});
  const bub=new THREE.Group();const bb=new THREE.Mesh(new RoundedBoxGeometry(1.5,.95,.3,5,.3),M(0x25d366));bub.add(bb);const tl=new THREE.Mesh(new THREE.ConeGeometry(.2,.4,12),M(0x25d366));tl.position.set(-.5,-.55,0);tl.rotation.z=.6;bub.add(tl);
  const dots=[-.4,0,.4].map(x=>{const d=new THREE.Mesh(new THREE.SphereGeometry(.1,12,10),M(0xffffff));d.position.set(x,0,.17);bub.add(d);return d});bub.position.set(1.9,1.6,.4);g.add(bub);sh(g);
  add3('robot',g,(t)=>{const p=pop(t,ST('bot')+.1,.45);g.scale.setScalar(.82*Math.max(.001,p.s));g.rotation.set(.05,-.35+Math.sin(t*1.1)*.35,Math.sin(t*.9)*.05);g.position.y=Math.sin(t*1.5)*.08;
    const bl=(t%2.4)<.12;eyes.forEach(e=>e.scale.y=bl?.15:1);const q=pop(t,T(47)-.03,.3);bub.visible=q.p>0;bub.scale.setScalar(Math.max(.001,q.s));dots.forEach((d,i)=>d.position.y=Math.max(0,Math.sin(t*9-i))*.1)})}
// phone chat with gym bot
{ const scr=(x,s=0)=>{x.fillStyle='#ece5dd';x.fillRect(0,0,512,1024);x.fillStyle='#075e54';x.fillRect(0,0,512,150);x.fillStyle='#fff';x.font='800 34px Inter';x.fillText('FitClub · Assistente',110,100);
    x.beginPath();x.arc(60,88,32,0,7);x.fillStyle='#25d366';x.fill();
    const B=[[['Mensile 49 €','Annuale 449 €'],'#fff'],[['Spinning lun/mer 19:00','Pilates mar/gio 9:30'],'#fff'],[['Prova gratuita:','sabato alle 10?'],'#fff'],[['Prenotato!','Spinning mer 19:00'],'#dcf8c6']];
    for(let i=0;i<s;i++){const y=180+i*200;const [ls,c]=B[i];x.fillStyle=c;x.beginPath();x.roundRect(i===3?120:24,y,370,160,26);x.fill();x.fillStyle=i===3?'#075e54':'#10131f';
      x.font='800 30px Inter';x.fillText(ls[0],(i===3?150:54),y+62);x.font='700 28px Inter';x.fillStyle='#3a3f52';x.fillText(ls[1],(i===3?150:54),y+110)}};
  const g=phone(0x10131f,scr);let last=-1;
  add3('chatph',g,(t)=>{const p=pop(t,ST('chat')+.1,.45);g.scale.setScalar(.95*Math.max(.001,p.s));g.rotation.set(.05,.3+Math.sin(t*1.1)*.25,Math.sin(t*.9)*.04);g.position.y=Math.sin(t*1.5)*.07;
    const s=t>=T(61)?4:t>=T(57)?3:t>=T(54)?2:t>=T(53)?1:0;if(s!==last){g.userData.st.redraw(s);last=s}})}
// kettlebell
{ const g=new THREE.Group();const ball=new THREE.Mesh(new THREE.SphereGeometry(1.4,48,36),M(0xff3d7f,{roughness:.3}));ball.scale.y=.92;g.add(ball);
  const h=new THREE.Mesh(new THREE.TorusGeometry(.85,.22,20,48,Math.PI),M(0x10131f,{roughness:.35}));h.position.y=1.05;g.add(h);
  [-.85,.85].forEach(x=>{const l=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,.4,20),M(0x10131f,{roughness:.35}));l.position.set(x,.95,0);g.add(l)});
  sh(g);
  add3('kettle',g,(t)=>{const p=pop(t,ST('sell')+.1,.45);g.scale.setScalar(.95*Math.max(.001,p.s));g.rotation.set(.1,-.3+Math.sin(t*1.1)*.4,Math.sin(t*3)*.06);
    g.position.y=Math.sin(t*1.5)*.07+.4*Math.abs(Math.sin((t-ST('sell'))*4))*(t<T(68)?1:0)})}
// stacked tiles
{ const g=new THREE.Group();const cols=[0x2d5bff,0x25d366,0xffc53d,0xff3d7f];const tiles=cols.map((c,i)=>{const m=new THREE.Mesh(new RoundedBoxGeometry(2.6,.32,2.6,5,.12),M(c));m.position.y=-1.2+i*.75;g.add(m);return m});sh(g);
  add3('stack',g,(t)=>{const p=pop(t,ST('all')+.1,.45);g.scale.setScalar(1.0*Math.max(.001,p.s));g.rotation.set(.45,t*.6,0);g.position.y=Math.sin(t*1.5)*.07;
    tiles.forEach((m,i)=>{const k=pop(t,ST('all')+.15+i*.1,.35);m.scale.setScalar(Math.max(.001,k.s));m.rotation.y=Math.sin(t*1.3+i)*.25})})}
// moon with orbiting chat bubbles
{ const g=new THREE.Group();const moon=moonG(1.2);g.add(moon);const bubs=[];
  for(let i=0;i<3;i++){const b=new THREE.Group();const bb=new THREE.Mesh(new RoundedBoxGeometry(1.1,.7,.25,5,.22),M(0x25d366,{emissive:0x25d366,emissiveIntensity:.2}));b.add(bb);
    const tl=new THREE.Mesh(new THREE.ConeGeometry(.14,.3,12),M(0x25d366));tl.position.set(-.35,-.42,0);tl.rotation.z=.6;b.add(tl);g.add(b);bubs.push(b)}sh(g);
  add3('moonchat',g,(t)=>{const p=pop(t,ST('payoff')+.1,.45);const out=clamp((t-T(89)+.15)/.2);g.scale.setScalar(.95*Math.max(.001,p.s*(1-out)));g.rotation.set(.15,0,0);g.position.y=Math.sin(t*1.5)*.06;
    moon.rotation.y=t*.4;bubs.forEach((b,i)=>{const a=t*1.1+i*2.09;b.position.set(Math.cos(a)*2.3,Math.sin(a*1.3)*.6+.3,Math.sin(a)*1.2);b.rotation.y=-.3})})}
const BOX={dumb:[540,920,760],hour:[540,920,720],card:[540,900,700],robot:[540,920,720],chatph:[540,1090,920],kettle:[540,900,640],stack:[540,860,560],moonchat:[540,980,760]};
const SCN={
 night(t){render3D('dumb',t,BOX.dumb);const c=pop(t,T(13)-.08,.35);withT(540,1440,c.s,c.a,()=>{card(140,1340,800,200,{r:36});
   ctx.beginPath();ctx.arc(230,1440,50,0,7);ctx.fillStyle='#25d366';ctx.fill();txt('W',230,1458,{size:46,w:900,c:'#fff',al:'center'});
   txt('Marco · 23:04',310,1415,{size:32,w:700,c:'#6b7185'});txt('Quanto costa',310,1470,{size:42,w:900});txt("l'abbonamento?",310,1515,{size:34,w:800,c:'#3a3f52'})})},
 late(t){render3D('hour',t,BOX.hour);const c=pop(t,T(22)-.08,.35);withT(540,1440,c.s,c.a,()=>{card(190,1330,700,220);
   txt('Risposta inviata',250,1400,{size:34,w:700,c:'#6b7185'});txt('15:12',250,1490,{size:68,w:900});pill('+16 ore',770,1460,{size:40,bg:'#ff2e4d',c:'#fff'})})},
 gone(t){render3D('card',t,BOX.card);stampTxt('CLIENTE PERSO',540,1460,t,T(39)-.02,'#fff',-.06,56)},
 bot(t){render3D('robot',t,BOX.robot);const q=pop(t,T(48)-.05,.3);withT(540,1440,q.s,q.a,()=>pill('Risponde in 3 secondi',540,1440,{size:46,bg:'#fff',c:'#00a676'}));
   const r=pop(t,T(49)-.05,.3);withT(540,1570,r.s,r.a,()=>pill('24 ore su 24 · 7 giorni su 7',540,1570,{size:42,bg:'#FFD60A',c:'#10131f'}))},
 chat(t){render3D('chatph',t,BOX.chatph)},
 sell(t){render3D('kettle',t,BOX.kettle);const c=pop(t,T(67)-.08,.35);withT(540,1440,c.s,c.a,()=>{card(190,1330,700,230);
   txt('Nuovi iscritti questo mese',250,1400,{size:34,w:700,c:'#6b7185'});const n=Math.round(18*eOut(prog(t,T(68),.7)));txt('+'+n,250,1500,{size:80,w:900,c:'#ff3d7f'});check(820,1470,40,prog(t,T(69),.35))})},
 all(t){render3D('stack',t,BOX.stack);const items=[['Assistenti AI',T(73)],['Siti',T(75)],['Gestionali',T(76)],['App',T(77)],['Qualsiasi cosa',T(78)]];
   items.forEach(([s,tt],i)=>{const q=pop(t,tt-.05,.3);withT(540,1150+i*108,q.s,q.a,()=>{const w=pill(s,540,1150+i*108,{size:44,bg:i===4?'#FFD60A':'#fff',c:'#10131f'});check(540-w/2-50,1150+i*108,30,prog(t,tt,.35))})})},
 payoff(t){render3D('moonchat',t,BOX.moonchat);if(t>=T(89)-.05)drawLogo(t,T(89)-.05,540,1060,700)},
};
