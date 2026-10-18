const SP={mess:['red','orange','pink','red','orange'],lost:['navy','navy2','grey','navy'],race:['violet','pink','violet'],crm:['blue','teal','blue'],
 card:['green','mint'],remind:['orange','pink','orange','red'],nolost:['teal','green'],payoff:['night','navy2','navy'],cta:['blue','violet','green','navy']};
// mess: phone + agendas + post-its
{ const g=new THREE.Group();
  const ph=phone(0x20232f,(x)=>{x.fillStyle='#10131f';x.fillRect(0,0,512,1024);x.fillStyle='#fff';x.font='800 36px Inter';x.fillText('Rubrica',40,100);
    ['Sig. Rossi casa?','Bianchi trilocale','??? 347...','Cliente via Po','Mario (affitto)','Sig.ra Verdi'].forEach((s,i)=>{x.fillStyle='#2a2e40';x.fillRect(30,140+i*120,452,100);x.fillStyle='#c9ced8';x.font='600 30px Inter';x.fillText(s,60,200+i*120)})});
  ph.scale.setScalar(.8);ph.position.set(-1.6,.3,0);ph.rotation.set(-.1,.4,.12);g.add(ph);
  const books=[];[0x2d5bff,0x19c37d,0xff3d7f].forEach((c,i)=>{const b=new THREE.Group();const cv=new THREE.Mesh(new RoundedBoxGeometry(1.7,2.3,.32,3,.06),M(c,{roughness:.35}));b.add(cv);
    const pg=new THREE.Mesh(new THREE.BoxGeometry(1.55,2.15,.22),M(0xf5f1e8,{clearcoat:0,roughness:.9}));pg.position.x=.06;b.add(pg);const el=new THREE.Mesh(new THREE.BoxGeometry(.12,2.32,.34),M(0x10131f));el.position.x=.55;b.add(el);
    b.position.set(1.3,-1.4+i*.36,.2);b.rotation.set(Math.PI/2-.05,0,.25*i-.2);g.add(b);books.push(b)});
  const notes=[];for(let i=0;i<7;i++){const n=new THREE.Mesh(new RoundedBoxGeometry(.9,.9,.03,2,.02),M([0xffe14d,0xff8fb1,0x7af0c6,0xffc53d][i%4],{roughness:.7,clearcoat:.1}));g.add(n);notes.push(n)}
  sh(g);
  add3('mess',g,(t)=>{const p=pop(t,0,.4);g.scale.setScalar(Math.max(.001,p.s));g.rotation.set(.1,Math.sin(t*1.1)*.25,0);g.position.y=Math.sin(t*1.5)*.08;
    const q=pop(t,T(10)-.05,.35);ph.visible=q.p>0;ph.scale.setScalar(.8*Math.max(.001,q.s));ph.rotation.z=.12+Math.sin(t*30)*.04*(t<T(11)?1:0);
    books.forEach((b,i)=>{const r=pop(t,T(11)+i*.12,.3);b.visible=r.p>0;b.scale.setScalar(Math.max(.001,r.s))});
    notes.forEach((n,i)=>{const d=t-(T(15)+i*.07);n.visible=d>0;if(d>0){const a=hash(i+3)*6.28;const k=eOut(clamp(d/.5));n.position.set(Math.cos(a)*2.4*k,1.6*Math.sin(a)*k+.5+Math.sin(t*2+i)*.1,1+hash(i)*.6);n.rotation.set(Math.sin(t+i)*.3,Math.cos(t*.8+i)*.4,hash(i+7)*1.5)}})})}
// house + sold sign
{ const g=new THREE.Group();const wall=M(0xfff3e0,{roughness:.6,clearcoat:.2});const roofM=M(0xd9482b,{roughness:.4});
  const body=new THREE.Mesh(new RoundedBoxGeometry(3,2.2,2.4,3,.06),wall);body.position.y=-.8;g.add(body);
  const rs=new THREE.Shape();rs.moveTo(-1.75,0);rs.lineTo(1.75,0);rs.lineTo(0,1.4);rs.lineTo(-1.75,0);
  const roof=new THREE.Mesh(new THREE.ExtrudeGeometry(rs,{depth:2.7,bevelEnabled:true,bevelSize:.05,bevelThickness:.05,bevelSegments:2}),roofM);roof.position.set(0,.3,-1.35);g.add(roof);
  const door=new THREE.Mesh(new RoundedBoxGeometry(.7,1.2,.1,2,.04),M(0x6b3d1f));door.position.set(0,-1.3,1.22);g.add(door);
  [-1,1].forEach(s=>{const w=new THREE.Mesh(new RoundedBoxGeometry(.7,.6,.08,2,.03),M(0x8fd3ff,{roughness:.05}));w.position.set(s*.95,-.6,1.22);g.add(w)});
  const sign=new THREE.Group();const post=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,2.6,12),M(0xffffff));post.position.y=-1.2;sign.add(post);
  const st=texCanvas(512,256,(x)=>{x.fillStyle='#ff2e4d';x.fillRect(0,0,512,256);x.fillStyle='#fff';x.font='900 92px Inter';x.textAlign='center';x.fillText('VENDUTO',256,160)});st.redraw();
  const bd=new THREE.Mesh(new RoundedBoxGeometry(1.9,.95,.08,2,.04),[M(0xff2e4d),M(0xff2e4d),M(0xff2e4d),M(0xff2e4d),new THREE.MeshBasicMaterial({map:st.tx,toneMapped:false}),M(0xff2e4d)]);bd.position.y=.2;sign.add(bd);
  sign.position.set(2.1,0,1.2);g.add(sign);sh(g);
  add3('house',g,(t)=>{const p=pop(t,SC[1].t0+.1,.45);g.scale.setScalar(.9*Math.max(.001,p.s));g.rotation.set(.2,-.5+Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.08;
    const q=pop(t,T(26)-.05,.45);sign.visible=q.p>0;sign.scale.setScalar(Math.max(.001,q.s));sign.rotation.z=Math.sin(t*3)*.05})}
// hourglass
{ const g=new THREE.Group();const pts=[];for(let i=0;i<=30;i++){const y=-1.6+i/30*3.2;const r=.18+1.0*Math.pow(Math.abs(y)/1.6,1.4);pts.push(new THREE.Vector2(r,y))}
  const glass=new THREE.Mesh(new THREE.LatheGeometry(pts,48),M(0xcfe8ff,{transparent:true,opacity:.3,roughness:.05,side:THREE.DoubleSide}));g.add(glass);
  const sm=M(0xffc53d,{roughness:.6,clearcoat:.2});const top=new THREE.Mesh(new THREE.ConeGeometry(.95,1.2,48),sm);top.rotation.x=Math.PI;top.position.y=.75;g.add(top);
  const bot=new THREE.Mesh(new THREE.ConeGeometry(1.05,.7,48),sm);bot.position.y=-1.2;g.add(bot);
  [-1,1].forEach(s=>{const c=new THREE.Mesh(new THREE.CylinderGeometry(1.45,1.45,.22,48),M(0x6a2cf5,{metalness:.3}));c.position.y=s*1.72;g.add(c)});
  for(let i=0;i<3;i++){const a=i/3*6.28;const r=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,3.4,12),gold());r.position.set(Math.cos(a)*1.3,0,Math.sin(a)*1.3);g.add(r)}sh(g);
  add3('hour',g,(t)=>{const p=pop(t,SC[2].t0+.1,.45);g.scale.setScalar(.95*Math.max(.001,p.s));const f=eInOut(prog(t,T(38)-.1,.4));g.rotation.set(.15,t*.5,f*Math.PI);g.position.y=Math.sin(t*1.5)*.08;
    const k=t<T(38)?clamp((t-T(34))/3):clamp((t-T(38))/.8);top.scale.setScalar(Math.max(.001,1-k*.85));bot.scale.setScalar(Math.max(.05,.3+k*.7))})}
// laptop CRM
{ const g=new THREE.Group();const al=M(0xc9ced8,{metalness:.9,roughness:.25});const base=new THREE.Mesh(new RoundedBoxGeometry(4.2,.18,2.8,3,.08),al);base.position.y=-1;g.add(base);
  const lid=new THREE.Group();const lm=new THREE.Mesh(new RoundedBoxGeometry(4.2,2.8,.12,3,.06),al);lm.position.y=1.4;lid.add(lm);
  const st=texCanvas(600,400,(x,n=0)=>{x.fillStyle='#f4f6ff';x.fillRect(0,0,600,400);x.fillStyle='#1d4bff';x.fillRect(0,0,600,50);x.fillStyle='#fff';x.font='800 24px Inter';x.fillText('CRM Agenzia',20,34);
    ['Nuovi','Da richiamare','Visite'].forEach((h,i)=>{const cx=20+i*195;x.fillStyle='#6b7185';x.font='800 18px Inter';x.fillText(h,cx,80);
      const cnt=[2+n,3,2][i];for(let j=0;j<cnt;j++){x.fillStyle=j===0&&i===0&&n>0?'#2EE59D':'#fff';x.beginPath();x.roundRect(cx,95+j*58,180,48,10);x.fill();x.fillStyle='#10131f';x.font='700 16px Inter';x.fillText(['Rossi M.','Bianchi G.','Verdi A.','Neri L.','Conti S.'][(i*2+j)%5],cx+12,125+j*58)}})});
  st.redraw(0);const scr=new THREE.Mesh(new THREE.PlaneGeometry(3.9,2.55),new THREE.MeshBasicMaterial({map:st.tx,toneMapped:false}));scr.position.set(0,1.4,.07);lid.add(scr);lid.position.set(0,-.95,-1.3);g.add(lid);sh(g);
  add3('crm',g,(t)=>{const p=pop(t,SC[3].t0+.1,.45);g.scale.setScalar(.95*Math.max(.001,p.s));lid.rotation.x=-.15-1.2*(1-eOut(prog(t,SC[3].t0,.6)));g.rotation.set(.2,Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.1;
    st.redraw(t>=T(51)?2:t>=T(48)?1:0)})}
// folder
{ const g=new THREE.Group();const fm=M(0xffc53d,{roughness:.4});const back=new THREE.Mesh(new RoundedBoxGeometry(3.4,2.5,.08,3,.05),fm);g.add(back);
  const tab=new THREE.Mesh(new RoundedBoxGeometry(1.2,.4,.08,2,.05),fm);tab.position.set(-1,1.35,0);g.add(tab);
  const paper=new THREE.Mesh(new RoundedBoxGeometry(3,2.3,.03,2,.02),M(0xffffff,{clearcoat:0,roughness:.8}));paper.position.set(0,.15,.08);g.add(paper);
  const front=new THREE.Group();const fr=new THREE.Mesh(new RoundedBoxGeometry(3.4,2.2,.08,3,.05),M(0xffd25c,{roughness:.4}));fr.position.y=1.1;front.add(fr);front.position.set(0,-1.25,.16);g.add(front);sh(g);
  add3('folder',g,(t)=>{const p=pop(t,SC[4].t0+.1,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(-.25,Math.sin(t*1.1)*.4,0);g.position.y=.2+Math.sin(t*1.5)*.08;
    front.rotation.x=.9*eOut(prog(t,T(57),.4));paper.position.y=.15+.6*eOut(prog(t,T(58),.4))})}
// bell
{ const g=new THREE.Group();const pts=[];for(let i=0;i<=30;i++){const k=i/30;pts.push(new THREE.Vector2(.25+1.3*Math.pow(k,1.8)+.15*Math.sin(k*3.14)*0,1.4-k*2.6))}
  const bell=new THREE.Mesh(new THREE.LatheGeometry(pts,64),gold());g.add(bell);const lip=new THREE.Mesh(new THREE.TorusGeometry(1.55,.12,16,64),gold());lip.rotation.x=Math.PI/2;lip.position.y=-1.2;g.add(lip);
  const cl=new THREE.Mesh(new THREE.SphereGeometry(.3,24,12),M(0x10131f));cl.position.y=-1.4;g.add(cl);const kn=new THREE.Mesh(new THREE.TorusGeometry(.3,.09,12,32),gold());kn.position.y=1.65;g.add(kn);
  const badge=new THREE.Mesh(new THREE.SphereGeometry(.42,24,12),M(0xff2e4d));badge.position.set(1.2,1.1,.6);g.add(badge);sh(g);
  add3('bell',g,(t)=>{const p=pop(t,SC[5].t0+.1,.45);g.scale.setScalar(.95*Math.max(.001,p.s));const r=t>T(63)-.05?Math.sin((t-T(63))*28)*.35*Math.exp(-(t-T(63))*2.5):0;g.rotation.set(0,Math.sin(t*1.1)*.3,r);g.position.y=.1+Math.sin(t*1.5)*.08;
    const b=pop(t,T(63),.3);badge.visible=b.p>0;badge.scale.setScalar(Math.max(.001,b.s))})}
// shield
{ const g=new THREE.Group();const s=new THREE.Shape();s.moveTo(0,1.9);s.bezierCurveTo(.8,1.5,1.4,1.5,1.7,1.5);s.lineTo(1.7,.2);s.bezierCurveTo(1.6,-1,.8,-1.7,0,-2.1);s.bezierCurveTo(-.8,-1.7,-1.6,-1,-1.7,.2);s.lineTo(-1.7,1.5);s.bezierCurveTo(-1.4,1.5,-.8,1.5,0,1.9);
  const sm=new THREE.Mesh(new THREE.ExtrudeGeometry(s,{depth:.5,bevelEnabled:true,bevelSize:.12,bevelThickness:.12,bevelSegments:5,curveSegments:24}),M(0x19c37d));sm.position.z=-.25;g.add(sm);
  const ck=new THREE.Shape();ck.moveTo(-.9,0);ck.lineTo(-.55,.35);ck.lineTo(-.2,0);ck.lineTo(.75,.95);ck.lineTo(1.1,.6);ck.lineTo(-.2,-.7);ck.lineTo(-.9,0);
  const cm=new THREE.Mesh(new THREE.ExtrudeGeometry(ck,{depth:.25,bevelEnabled:true,bevelSize:.05,bevelThickness:.05,bevelSegments:3}),M(0xffffff));cm.position.set(-.1,0,.35);g.add(cm);sh(g);
  add3('shield',g,(t)=>{const p=pop(t,SC[6].t0+.1,.45);g.scale.setScalar(.95*Math.max(.001,p.s));g.rotation.set(.1,Math.sin(t*1.4)*.5,0);g.position.y=Math.sin(t*1.5)*.08;
    const c=pop(t,T(73)-.05,.35);cm.scale.setScalar(Math.max(.001,c.s))})}
// moon + stars
{ const g=new THREE.Group();const moon=new THREE.Mesh(new THREE.SphereGeometry(1.7,64,32),M(0xffe08a,{roughness:.55,clearcoat:.3}));g.add(moon);
  [[.5,.6,.35],[-.6,.2,.28],[.1,-.7,.4],[-.3,.95,.2],[.85,-.3,.22]].forEach(([x,y,r])=>{const c=new THREE.Mesh(new THREE.SphereGeometry(r,24,12),M(0xe6c25e,{roughness:.8,clearcoat:0}));const z=Math.sqrt(Math.max(0,1.7*1.7-x*x-y*y))-r*.55;c.position.set(x,y,z);c.scale.z=.35;moon.add(c)});
  const stars=[];const ss=new THREE.Shape();for(let i=0;i<10;i++){const r=i%2?.18:.42,a=i/10*6.28+Math.PI/2;i?ss.lineTo(Math.cos(a)*r,Math.sin(a)*r):ss.moveTo(Math.cos(a)*r,Math.sin(a)*r)}
  for(let i=0;i<5;i++){const st=new THREE.Mesh(new THREE.ExtrudeGeometry(ss,{depth:.12,bevelEnabled:true,bevelSize:.04,bevelThickness:.04,bevelSegments:2}),M(0xffffff,{emissive:0x8899ff,emissiveIntensity:.3}));st.position.set([1.9,2.4,-2.3,1.2,-1.6][i],[1.6,-.6,1.3,-1.9,-1.6][i],.2);g.add(st);stars.push(st)}sh(g);
  add3('moon',g,(t)=>{const p=pop(t,SC[7].t0+.1,.45);const out=clamp((t-T(85)+.15)/.2);g.scale.setScalar(.9*Math.max(.001,p.s*(1-out)));g.rotation.set(.1,Math.sin(t*1.1)*.4,Math.sin(t*.8)*.08);g.position.y=Math.sin(t*1.5)*.1;
    stars.forEach((s,i)=>{const q=pop(t,SC[7].t0+.2+i*.1,.3);s.scale.setScalar(Math.max(.001,q.s*(1+.2*Math.sin(t*5+i))));s.rotation.z=t*(.5+i*.1)})})}
const BOX={mess:[540,1000,840],house:[540,980,820],hour:[540,920,700],crm:[540,960,800],folder:[540,880,600],bell:[540,860,560],shield:[540,960,700],moon:[540,980,760]};
function notif(t,t0,y,a,b){const p=prog(t,t0,.35);if(p<=0)return;const x=lerp(1200,540,eBack(p));card(x-400,y-70,800,140,{r:34});
  ctx.beginPath();ctx.arc(x-320,y,40,0,7);ctx.fillStyle='#2d5bff';ctx.fill();txt('+',x-320,y+16,{size:48,w:900,c:'#fff',al:'center'});
  txt(a,x-260,y-10,{size:34,w:800});txt(b,x-260,y+36,{size:28,w:600,c:'#6b7185'})}
const SCN={
 mess(t){render3D('mess',t,BOX.mess);[['Telefono',T(10),250],['3 agende',T(11),540],['Post-it',T(15),830]].forEach(([s,tt,x])=>{const q=pop(t,tt-.05,.3);withT(x,1480,q.s,q.a,()=>pill(s,x,1480,{size:38,bg:'#fff',c:'#10131f',pad:26}))});
   const c=pop(t,T(17)-.05,.3);withT(540,1600,c.s,c.a,()=>pill('...sul cruscotto',540,1600,{size:36,bg:'#10131f',c:'#FFD60A'}))},
 lost(t){render3D('house',t,BOX.house);const q=pop(t,T(21)-.05,.3);withT(540,1440,q.s,q.a,()=>pill('Perché?',540,1440,{size:44,bg:'#fff',c:'#10131f'}));
   stampTxt('UN\'ALTRA AGENZIA',540,1580,t,T(29),'#ff2e4d',-.08,46)},
 race(t){render3D('hour',t,BOX.hour);const c=pop(t,T(32)-.08,.35);withT(540,1460,c.s,c.a,()=>{card(130,1300,820,330);
   txt('Tu',180,1385,{size:40,w:900});const a=eOut(prog(t,T(35),T(37)-T(35)+.4));bar(300,1360,420,34,a*.95,'#ff2e4d');if(t>=T(37)-.05)txt('3 settimane',905,1390,{size:30,w:800,c:'#ff2e4d',al:'right'});
   const lb=pop(t,T(38)-.05,.25);withT(540,1530,1,lb.a,()=>{txt('Loro',180,1545,{size:40,w:900});const b=eOut(prog(t,T(39),.3));bar(300,1520,420,34,b*.2,'#19c37d');if(t>=T(41)-.05)txt('3 ore',905,1550,{size:30,w:800,c:'#19c37d',al:'right'})})});
   },
 crm(t){render3D('crm',t,BOX.crm);const q=pop(t,T(44)-.05,.3);withT(540,690,q.s,q.a,()=>pill('CRM su misura',540,690,{size:40,bg:'#FFD60A',c:'#10131f'}));
   notif(t,T(48)-.05,1420,'Nuova richiesta dal sito','Trilocale, via Roma');notif(t,T(51)-.05,1580,'Contatto salvato','Rossi Mario · scheda creata')},
 card(t){render3D('folder',t,BOX.folder);const p=pop(t,T(55)-.05,.35);withT(540,1390,p.s,p.a,()=>{card(150,1190,780,420);avatar(250,1290,60,'MR','#2d5bff','#13b4ff');
   txt('Mario Rossi',335,1280,{size:44,w:900});txt('Cliente acquirente',335,1325,{size:28,w:600,c:'#6b7185'});
   [['Cerca','Trilocale'],['Budget','€ 220.000'],['Zona','Centro']].forEach(([a,b],i)=>{const y=1420+i*62;const r=prog(t,T(57)+i*.15,.25);ctx.globalAlpha*=r;txt(a,200,y,{size:32,w:700,c:'#6b7185'});txt(b,880,y,{size:34,w:800,al:'right'});ctx.globalAlpha=p.a})})},
 remind(t){render3D('bell',t,BOX.bell);const p=pop(t,T(64)-.08,.35);withT(540,1400,p.s,p.a,()=>{card(150,1150,780,300);txt('OGGI DA RICHIAMARE',195,1210,{size:28,w:900,c:'#8a90a6',ls:2});
   [['Mario Rossi','10:30',T(65)],['Giulia Bianchi','15:00',T(66)]].forEach(([n,h,tt],i)=>{const y=1290+i*80;const r=pop(t,tt-.03,.3);withT(540,y-12,r.s,r.a,()=>{txt(n,195,y,{size:38,w:800});pill(h,800,y-12,{size:28,bg:'#eef0f6',c:'#ff5e00',pad:18})})})});
   [['Trilocale Centro',T(69),300],['Villa con giardino',T(70),760]].forEach(([s,tt,x])=>{const q=pop(t,tt-.05,.3);withT(x,1560,q.s,q.a,()=>pill(s,x,1560,{size:32,bg:'#10131f',c:'#fff',pad:22}))})},
 nolost(t){render3D('shield',t,BOX.shield);[['0 contatti persi',T(71),1450,'#fff','#0a8f5a'],['0 scuse',T(74),1580,'#10131f','#2EE59D']].forEach(([s,tt,y,bg,c])=>{const q=pop(t,tt-.05,.3);withT(540,y,q.s,q.a,()=>pill(s,540,y,{size:44,bg,c}))})},
 payoff(t){render3D('moon',t,BOX.moon);if(t>=T(85)-.05)drawLogo(t,T(85)-.05,540,1060,700)},
};
