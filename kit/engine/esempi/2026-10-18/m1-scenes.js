const SP={intro:['orange','red','orange','pink'],print:['grey','navy2','grey','navy'],waiter:['violet','pink','violet','navy2'],tourist:['teal','blue','teal','green'],
 qr:['blue','violet','blue'],phone:['green','teal','mint','green','teal'],price:['pink','orange','red'],payoff:['navy','night','navy2','navy'],cta:['blue','violet','green','navy']};
const {FontLoader}=await import('three/addons/loaders/FontLoader.js');
const {TextGeometry}=await import('three/addons/geometries/TextGeometry.js');
const FONT=new FontLoader().parse(await (await fetch('node_modules/three/examples/fonts/helvetiker_bold.typeface.json')).json());
function menuTex(x,price='8,00',k=0){x.fillStyle='#fffaf0';x.fillRect(0,0,512,700);x.fillStyle='#b5341f';x.font='900 64px Inter';x.textAlign='center';x.fillText('MENU',256,95);
  x.fillStyle='#d9cbb0';x.fillRect(80,125,352,4);x.textAlign='left';x.font='700 32px Inter';
  [['Margherita',price],['Diavola','9,50'],['Capricciosa','10,00'],['Tiramisù','5,00'],['Acqua','2,00']].forEach(([a,b],i)=>{x.fillStyle='#3a2a1a';x.fillText(a,70,200+i*95);x.textAlign='right';x.fillText('€ '+b,442,200+i*95);x.textAlign='left'});
  x.textAlign='left'}
// big gold 3 + warning
{ const g=new THREE.Group();const tg=new TextGeometry('3',{font:FONT,size:3.2,depth:.9,curveSegments:10,bevelEnabled:true,bevelThickness:.12,bevelSize:.08,bevelSegments:5});tg.center();
  const three=new THREE.Mesh(tg,gold());g.add(three);
  const ts=new THREE.Shape();ts.moveTo(0,1);ts.lineTo(1.05,-.8);ts.lineTo(-1.05,-.8);ts.lineTo(0,1);
  const tri=new THREE.Mesh(new THREE.ExtrudeGeometry(ts,{depth:.3,bevelEnabled:true,bevelSize:.1,bevelThickness:.08,bevelSegments:4}),M(0xff2e4d));tri.position.set(2.1,1.6,.4);g.add(tri);
  const ex=new THREE.Mesh(new RoundedBoxGeometry(.16,.8,.1,2,.05),M(0xffffff));ex.position.set(2.1,1.65,.85);g.add(ex);const dot=new THREE.Mesh(new THREE.SphereGeometry(.1,16,8),M(0xffffff));dot.position.set(2.1,1.0,.85);g.add(dot);
  sh(g);
  add3('three',g,(t)=>{const p=pop(t,0,.45);g.scale.setScalar(Math.max(.001,p.s));g.rotation.set(.1,Math.sin(t*1.3)*.5,0);g.position.y=Math.sin(t*1.6)*.12;
    const w=pop(t,T(7)-.05,.35);[tri,ex,dot].forEach(m=>m.visible=w.p>0);tri.scale.setScalar(Math.max(.001,w.s));tri.rotation.z=Math.sin(t*9)*.08})}
// paper stack
{ const g=new THREE.Group();const st=texCanvas(512,700,menuTex);st.redraw('8,00');const sheets=[];
  for(let i=0;i<9;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(2.6,.04,3.5),[M(0xfffaf0,{clearcoat:0,roughness:.8}),M(0xfffaf0,{clearcoat:0,roughness:.8}),new THREE.MeshStandardMaterial({map:st.tx,roughness:.7}),M(0xfffaf0),M(0xfffaf0),M(0xfffaf0)]);g.add(m);sheets.push(m)}
  sh(g);
  add3('stack',g,(t)=>{const p=pop(t,SC[1].t0+.05,.4);g.scale.setScalar(1.05*Math.max(.001,p.s));g.rotation.set(.55,-.5+Math.sin(t)*.15,0);g.position.y=-.6;
    st.redraw(t>=T(21)?'8,50':'8,00');
    sheets.forEach((s,i)=>{const td=T(13)+i*.22;const d=clamp((t-td)/.3);s.visible=t>=td||i===0;const y=i*.06;const fy=i===0?y:lerp(y+4,y,eOut(d));
      s.position.set(Math.sin(i*2.1)*.12,fy,Math.cos(i*1.7)*.1);s.rotation.y=Math.sin(i*3.3)*.12*(1-(i===0?0:0))})})}
// cloche
{ const g=new THREE.Group();const plate=new THREE.Mesh(new THREE.CylinderGeometry(2.2,1.9,.18,64),M(0xffffff,{roughness:.2}));plate.position.y=-1;g.add(plate);
  const pts=[];for(let i=0;i<=24;i++){const a=i/24*Math.PI/2;pts.push(new THREE.Vector2(Math.cos(a)*1.8+.001,Math.sin(a)*1.6))}
  const lid=new THREE.Group();const dome=new THREE.Mesh(new THREE.LatheGeometry(pts,64),M(0xd8dde8,{metalness:1,roughness:.12,side:THREE.DoubleSide}));lid.add(dome);
  const knob=new THREE.Mesh(new THREE.SphereGeometry(.22,24,12),gold());knob.position.y=1.7;lid.add(knob);lid.position.y=-.9;g.add(lid);
  const food=new THREE.Group();const piz=new THREE.Mesh(new THREE.CylinderGeometry(1.3,1.3,.14,48),M(0xf2b84b,{roughness:.6,clearcoat:.2}));food.add(piz);
  const sauce=new THREE.Mesh(new THREE.CylinderGeometry(1.1,1.1,.05,48),M(0xd7261e,{roughness:.5}));sauce.position.y=.09;food.add(sauce);
  for(let i=0;i<6;i++){const c=new THREE.Mesh(new THREE.SphereGeometry(.18,16,8),M(0xfff6dc,{roughness:.6}));c.scale.y=.4;const a=i/6*6.28;c.position.set(Math.cos(a)*.6,.13,Math.sin(a)*.6);food.add(c)}
  const bas=new THREE.Mesh(new THREE.SphereGeometry(.16,12,8),M(0x2e9d3a));bas.scale.y=.3;bas.position.set(0,.15,0);food.add(bas);food.position.y=-.82;g.add(food);sh(g);
  add3('cloche',g,(t)=>{const p=pop(t,SC[2].t0+.1,.45);g.scale.setScalar(1.05*Math.max(.001,p.s));g.rotation.set(.35,Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.1;
    const o=eBack(prog(t,T(32)-.05,.45));lid.position.y=-.9+o*2.2;lid.rotation.z=o*.35;lid.position.x=o*.9})}
// globe
{ const g=new THREE.Group();const st=texCanvas(1024,512,(x)=>{x.fillStyle='#1d6fff';x.fillRect(0,0,1024,512);x.fillStyle='#2ee59d';
   [[180,170,120,80],[260,330,70,110],[520,150,90,70],[560,300,80,120],[760,180,170,90],[860,360,60,40],[120,90,60,30]].forEach(([a,b,c,d])=>{x.beginPath();x.ellipse(a,b,c,d,0,0,7);x.fill()})});st.redraw();
  const ball=new THREE.Mesh(new THREE.SphereGeometry(1.9,64,32),new THREE.MeshPhysicalMaterial({map:st.tx,roughness:.3,clearcoat:1}));g.add(ball);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(2.35,.06,12,100),gold());ring.rotation.x=1.2;g.add(ring);
  const pins=[];[0xff2e4d,0xffc53d,0x7a3cff].forEach((c,i)=>{const pn=new THREE.Group();const h=new THREE.Mesh(new THREE.SphereGeometry(.22,20,10),M(c));h.position.y=.5;pn.add(h);const s=new THREE.Mesh(new THREE.ConeGeometry(.12,.5,16),M(c));s.rotation.x=Math.PI;s.position.y=.18;pn.add(s);g.add(pn);pins.push(pn)});sh(g);
  add3('globe',g,(t)=>{const p=pop(t,SC[3].t0+.1,.45);g.scale.setScalar(Math.max(.001,p.s));ball.rotation.y=t*.6;g.position.y=Math.sin(t*1.4)*.1;
    pins.forEach((pn,i)=>{const q=pop(t,T(38)+i*.5,.35);pn.visible=q.p>0;pn.scale.setScalar(Math.max(.001,q.s));const a=-.9+i*.9;pn.position.set(Math.sin(a)*1.85,1.0-i*.55+.2,Math.cos(a)*1.85);pn.lookAt(0,0,0);pn.rotateX(-Math.PI/2)})})}
// QR tent + totem
{ const g=new THREE.Group();const qr=texCanvas(256,256,(x)=>{x.fillStyle='#fff';x.fillRect(0,0,256,256);x.fillStyle='#10131f';
   for(let i=0;i<21;i++)for(let j=0;j<21;j++){const f=(i<7&&j<7)||(i>13&&j<7)||(i<7&&j>13);const on=f?((i%6===0||j%6===0||(i>1&&i<5&&j>1&&j<5)||(i>14&&i<19&&j>1&&j<5)||(i>1&&i<5&&j>15&&j<19)||i===20&&j<7||j===20&&i<7)):hash(i*31+j*7)>.52;
     if(f){const ii=i%14,jj=j%14;const o=(ii===0||ii===6||jj===0||jj===6)||(ii>=2&&ii<=4&&jj>=2&&jj<=4);if(o)x.fillRect(18+i*10.5,18+j*10.5,10.5,10.5)}else if(on)x.fillRect(18+i*10.5,18+j*10.5,10.5,10.5)}});qr.redraw();
  const tent=new THREE.Group();const pm=M(0x10131f,{roughness:.3});
  [-1,1].forEach(s=>{const pnl=new THREE.Group();const b=new THREE.Mesh(new RoundedBoxGeometry(2.2,3,.08,3,.04),pm);pnl.add(b);
    const f=new THREE.Mesh(new THREE.PlaneGeometry(1.7,1.7),new THREE.MeshBasicMaterial({map:qr.tx,toneMapped:false}));f.position.set(0,.2,.05);pnl.add(f);
    pnl.position.z=s*.55;pnl.rotation.x=-s*.38;if(s<0)pnl.rotation.y=Math.PI;tent.add(pnl)});
  tent.position.y=-.9;g.add(tent);
  const table=new THREE.Mesh(new THREE.CylinderGeometry(3,3,.2,64),M(0x8a4b1f,{roughness:.45,clearcoat:.6}));table.position.y=-2.5;g.add(table);
  const tot=new THREE.Group();const tb=new THREE.Mesh(new RoundedBoxGeometry(1.8,4.6,.4,4,.15),M(0xf4f6ff,{roughness:.2}));tot.add(tb);
  const scr=texCanvas(320,720,(x)=>{const gr=x.createLinearGradient(0,0,0,720);gr.addColorStop(0,'#1d4bff');gr.addColorStop(1,'#13b4ff');x.fillStyle=gr;x.fillRect(0,0,320,720);
    x.fillStyle='#fff';x.font='900 46px Inter';x.textAlign='center';x.fillText('MENU',160,90);x.font='700 24px Inter';x.fillText('Tocca per ordinare',160,130);
    ['#ff9f43','#ff3d7f','#2ee59d','#ffd60a'].forEach((c,i)=>{x.fillStyle=c;x.beginPath();x.roundRect(30+(i%2)*140,170+Math.floor(i/2)*170,120,150,18);x.fill()});
    x.fillStyle='#fff';x.beginPath();x.roundRect(40,560,240,80,40);x.fill();x.fillStyle='#1d4bff';x.font='900 34px Inter';x.fillText('ORDINA',160,612)});scr.redraw();
  const ts=new THREE.Mesh(new THREE.PlaneGeometry(1.5,3.4),new THREE.MeshBasicMaterial({map:scr.tx,toneMapped:false}));ts.position.set(0,.35,.21);tot.add(ts);
  const foot=new THREE.Mesh(new THREE.CylinderGeometry(1.1,1.2,.2,48),M(0x10131f));foot.position.y=-2.4;tot.add(foot);g.add(tot);sh(g);
  add3('qr',g,(t)=>{const p=pop(t,SC[4].t0+.1,.45);g.scale.setScalar(.95*Math.max(.001,p.s));g.rotation.set(.18,Math.sin(t*1.1)*.4+.3,0);g.position.y=Math.sin(t*1.5)*.08+.2;
    const sw=clamp((t-T(53))/.25);tent.visible=table.visible=sw<1;tent.scale.setScalar(Math.max(.001,1-sw));table.scale.setScalar(Math.max(.001,1-sw));
    const q=pop(t,T(54)-.05,.4);tot.visible=q.p>0;tot.scale.setScalar(Math.max(.001,q.s));tot.rotation.y=Math.sin(t*1.3)*.3})}
// phone menu
const LANG=[['IT','Margherita','Pomodoro, mozzarella'],['EN','Margherita','Tomato, mozzarella'],['DE','Margherita','Tomate, Mozzarella'],['FR','Margherita','Tomate, mozzarella']];
{ const g=new THREE.Group();
  const ph=phone(0x20232f,(x,s={})=>{const {li=0,al=0,ord=0}=s;x.fillStyle='#fffaf3';x.fillRect(0,0,512,1024);x.fillStyle='#10131f';x.font='900 44px Inter';x.fillText('Menu',36,110);
    x.fillStyle='#2d5bff';x.beginPath();x.roundRect(380,72,100,52,26);x.fill();x.fillStyle='#fff';x.font='900 28px Inter';x.textAlign='center';x.fillText(LANG[li][0],430,108);x.textAlign='left';
    [['#ffb347','#d7261e'],['#f2b84b','#2e9d3a'],['#e0a96d','#6b3d1f']].forEach(([a,b],i)=>{const y=160+i*250;x.fillStyle=a;x.beginPath();x.roundRect(36,y,180,200,24);x.fill();x.fillStyle=b;x.beginPath();x.arc(126,y+100,60,0,7);x.fill();
      x.fillStyle='#10131f';x.font='800 30px Inter';x.fillText(i===0?LANG[li][1]:['Diavola','Boscaiola'][i-1],236,y+60);x.fillStyle='#6b7185';x.font='600 22px Inter';x.fillText(i===0?LANG[li][2]:'€ 9,50',236,y+98);
      if(al){['G','L','P'].forEach((c,j)=>{x.fillStyle=['#ffd60a','#13b4ff','#ff7a1a'][j];x.beginPath();x.arc(256+j*50,y+150,20,0,7);x.fill();x.fillStyle='#10131f';x.font='900 20px Inter';x.textAlign='center';x.fillText(c,256+j*50,y+157);x.textAlign='left'})}});
    x.fillStyle=ord?'#19c37d':'#10131f';x.beginPath();x.roundRect(36,900,440,90,45);x.fill();x.fillStyle='#fff';x.font='900 34px Inter';x.textAlign='center';x.fillText(ord?'ORDINE INVIATO':'ORDINA',256,958);x.textAlign='left'});
  g.add(ph);
  add3('phone',g,(t)=>{const p=pop(t,SC[5].t0+.1,.45);g.scale.setScalar(.95*Math.max(.001,p.s));ph.rotation.set(-.08,Math.sin(t*1.2)*.35,Math.sin(t*.9)*.04);ph.position.y=Math.sin(t*1.5)*.1;
    const li=t<T(61)?0:Math.min(3,Math.floor((t-T(61))/.3));ph.userData.st.redraw({li,al:t>=T(68)?1:0,ord:t>=T(70)+.1?1:0})})}
// stopwatch
{ const g=new THREE.Group();const body=new THREE.Mesh(new THREE.CylinderGeometry(2,2,.6,64),M(0xff3d7f,{metalness:.2}));body.rotation.x=Math.PI/2;g.add(body);
  const face=new THREE.Mesh(new THREE.CylinderGeometry(1.75,1.75,.62,64),M(0xffffff,{roughness:.3}));face.rotation.x=Math.PI/2;face.position.z=.02;g.add(face);
  for(let i=0;i<12;i++){const tk=new THREE.Mesh(new RoundedBoxGeometry(.08,.3,.05,2,.02),M(0x10131f));const a=i/12*6.28;tk.position.set(Math.sin(a)*1.45,Math.cos(a)*1.45,.34);tk.rotation.z=-a;g.add(tk)}
  const hand=new THREE.Group();const hm=new THREE.Mesh(new RoundedBoxGeometry(.1,1.4,.06,2,.03),M(0xff2e4d));hm.position.y=.6;hand.add(hm);hand.position.z=.38;g.add(hand);
  const hub=new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,.1,24),gold());hub.rotation.x=Math.PI/2;hub.position.z=.42;g.add(hub);
  const btn=new THREE.Mesh(new THREE.CylinderGeometry(.25,.25,.5,24),gold());btn.position.y=2.25;g.add(btn);sh(g);
  add3('watch',g,(t)=>{const p=pop(t,SC[6].t0+.1,.45);g.scale.setScalar(.95*Math.max(.001,p.s));g.rotation.set(-.1,Math.sin(t*1.2)*.4,0);g.position.y=.2+Math.sin(t*1.5)*.1;
    const a=prog(t,T(74),T(81)-T(74));hand.rotation.z=-a*Math.PI*2*10/60*6;btn.position.y=2.25-(t>T(74)&&t<T(74)+.15?.12:0)})}
const BOX={three:[540,1000,820],stack:[540,1000,820],cloche:[540,980,800],globe:[540,960,780],qr:[540,980,820],phone:[540,1000,880],watch:[540,960,720]};
function bubble(s,cx,cy,t,t0,tail=1,bg='#fff',c='#10131f'){const p=pop(t,t0,.3);withT(cx,cy,p.s,p.a,()=>{ctx.font='800 40px Inter';const w=ctx.measureText(s).width+60;
  ctx.save();ctx.shadowColor='rgba(0,0,0,.2)';ctx.shadowBlur=30;ctx.shadowOffsetY=10;rr(cx-w/2,cy-45,w,90,30);ctx.fillStyle=bg;ctx.fill();
  ctx.beginPath();ctx.moveTo(cx+tail*(w/2-70),cy+40);ctx.lineTo(cx+tail*(w/2-40),cy+80);ctx.lineTo(cx+tail*(w/2-30),cy+40);ctx.fill();ctx.restore();txt(s,cx,cy+14,{size:40,w:800,c,al:'center'})})}
const SCN={
 intro(t){render3D('three',t,BOX.three);const p=pop(t,T(10)-.05,.35);withT(540,1500,p.s,p.a,()=>pill('Menu digitale',540,1500,{size:46,bg:'#fff',c:'#ff5e00'}))},
 print(t){render3D('stack',t,BOX.stack);const p=pop(t,T(13)-.05,.3);withT(250,690,p.s,p.a,()=>pill('SEGNALE 1',250,690,{size:34,bg:'#FFD60A',c:'#10131f'}));
   const n=Math.max(1,Math.min(9,Math.floor((t-T(13))/.22)+1));const q=pop(t,T(13),.3);withT(810,690,q.s,q.a,()=>pill('Ristampe: '+n,810,690,{size:34,bg:'#fff',c:'#ff2e4d'}));
   const c=pop(t,T(19)-.1,.35);withT(540,1460,c.s,c.a,()=>{card(150,1360,780,200);txt('Margherita',200,1478,{size:44,w:800});txt('€ 8,00',740,1478,{size:44,w:800,c:'#8a90a6',al:'right'});
     const s=eOut(prog(t,T(20),.2));if(s>0){ctx.strokeStyle='#ff2e4d';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(600,1463);ctx.lineTo(600+150*s,1463);ctx.stroke()}
     const np=pop(t,T(21),.3);withT(845,1463,np.s,np.a,()=>txt('8,50',845,1478,{size:46,w:900,c:'#19c37d',al:'center'}))})},
 waiter(t){render3D('cloche',t,BOX.cloche);const p=pop(t,T(22)-.05,.3);withT(250,690,p.s,p.a,()=>pill('SEGNALE 2',250,690,{size:34,bg:'#FFD60A',c:'#10131f'}));
   bubble('Cosa c\'è dentro?',360,1420,t,T(30)-.05,1);bubble('È piccante?',720,1540,t,T(33)-.05,-1,'#10131f','#fff');
   const q=pop(t,T(26)-.05,.3);withT(810,690,q.s,q.a,()=>pill('Metà serata',810,690,{size:34,bg:'#fff',c:'#6a2cf5'}))},
 tourist(t){render3D('globe',t,BOX.globe);const p=pop(t,T(35)-.05,.3);withT(250,690,p.s,p.a,()=>pill('SEGNALE 3',250,690,{size:34,bg:'#FFD60A',c:'#10131f'}));
   bubble('What is this?',300,1380,t,T(38),1);bubble('Was ist das?',780,1300,t,T(39)+.1,-1);bubble('C\'est quoi?',560,1520,t,T(41),1,'#10131f','#fff');
   const s=pop(t,T(45)-.05,.3);withT(540,1640,s.s,s.a,()=>{const w=pill('Menu solo in italiano',540,1640,{size:34,bg:'#fff',c:'#10131f'});const q=eOut(prog(t,T(46),.2));if(q>0){ctx.strokeStyle='#ff2e4d';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(540-w/2+20,1640);ctx.lineTo(540-w/2+20+(w-40)*q,1640);ctx.stroke()}})},
 qr(t){render3D('qr',t,BOX.qr);const a=pop(t,T(49)-.05,.3);withT(540,1500,a.s*(t<T(53)?1:clamp(1-(t-T(53))/.2)),a.a,()=>pill('QR sul tavolo',540,1500,{size:44,bg:'#fff',c:'#1d4bff'}));
   const b=pop(t,T(54)-.05,.3);withT(540,1500,b.s,b.a,()=>pill('Totem all\'ingresso',540,1500,{size:44,bg:'#FFD60A',c:'#10131f'}))},
 phone(t){render3D('phone',t,BOX.phone);['IT','EN','DE','FR'].forEach((l,i)=>{const q=pop(t,T(62)+i*.12,.28);withT(170,780+i*130,q.s,q.a,()=>pill(l,170,780+i*130,{size:38,bg:i===0?'#fff':'#10131f',c:i===0?'#10131f':'#fff'}))});
   const al=pop(t,T(68)-.05,.3);withT(890,900,al.s,al.a,()=>pill('Allergeni',890,900,{size:32,bg:'#FFD60A',c:'#10131f',pad:22}));
   const o=pop(t,T(70),.3);withT(880,1140,o.s,o.a,()=>{ctx.beginPath();ctx.arc(880,1140,62,0,7);ctx.fillStyle='#fff';ctx.fill();check(880,1140,48,prog(t,T(70),.4))})},
 price(t){render3D('watch',t,BOX.watch);const c=pop(t,T(74)-.08,.35);withT(540,1460,c.s,c.a,()=>{card(150,1340,780,250);txt('MODIFICA PREZZO',195,1400,{size:28,w:900,c:'#8a90a6',ls:2});
   txt('Margherita',195,1490,{size:44,w:800});const v=t<T(76)?'8,50':t<T(76)+.25?'9,':'9,00';rr(640,1430,250,90,20);ctx.fillStyle='#eef0f6';ctx.fill();
   txt('€ '+v+(Math.floor(t*4)%2&&t<T(78)?'|':''),660,1492,{size:44,w:900,c:'#2d5bff'});if(t>=T(81))check(840,1400,26,prog(t,T(81),.3))});
   const s=Math.min(10,Math.max(0,(t-T(74))/(T(81)-T(74))*10));const q=pop(t,T(80)-.05,.3);withT(540,700,q.s,q.a,()=>pill('00:'+String(Math.floor(s)).padStart(2,'0'),540,700,{size:44,bg:'#10131f',c:'#fff'}))},
 payoff(t){if(t>=T(83)-.05)drawLogo(t,T(83)-.05,540,980,520);
   [['Siti',89,250],['Gestionali',90,480],['App',91,700],['AI',92,860]].forEach(([s,i,x])=>{const q=pop(t,T(i)-.03,.3);withT(x,1360,q.s,q.a,()=>pill(s,x,1360,{size:38,bg:'#fff',c:'#10131f',pad:24}))});
   const z=pop(t,T(94)-.03,.35);withT(540,1500,z.s,z.a,()=>pill('Qualsiasi cosa',540,1500,{size:48,bg:'#2EE59D',c:'#10131f'}))},
};
