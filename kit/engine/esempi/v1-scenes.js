const SP={phone:['red','orange','pink'],centralino:['violet','pink','navy2'],lost:['navy','navy2','red','navy2'],robot:['blue','teal','violet'],
 chat:['green','blue','teal','violet','blue'],night:['night','navy2'],pizza:['orange','red','pink'],payoff:['navy','night','navy2'],cta:['blue','violet','green','navy']};
// phone ringing
{ const g=new THREE.Group();
  const ph=phone(0x20232f,(x,k=0)=>{const gr=x.createLinearGradient(0,0,0,1024);gr.addColorStop(0,'#1b3a2a');gr.addColorStop(1,'#0b1410');x.fillStyle=gr;x.fillRect(0,0,512,1024);
    x.textAlign='center';x.fillStyle='rgba(255,255,255,.65)';x.font='600 30px Inter';x.fillText('Chiamata in arrivo',256,180);
    x.fillStyle='#fff';x.font='800 50px Inter';x.fillText('Cliente',256,250);
    x.strokeStyle=`rgba(46,229,157,${1-k})`;x.lineWidth=8;x.beginPath();x.arc(256,470,90+80*k,0,7);x.stroke();
    x.fillStyle='#2EE59D';x.beginPath();x.arc(256,470,90,0,7);x.fill();x.fillStyle='#fff';x.font='900 90px Inter';x.fillText('?',256,502);
    x.fillStyle='#ff3b30';x.beginPath();x.arc(150,860,62,0,7);x.fill();x.fillStyle='#34c759';x.beginPath();x.arc(362,860,62,0,7);x.fill();x.textAlign='left'});
  g.add(ph);ph.rotation.set(-.05,-.3,0);
  const fl=[];const wm=M(0xfafafa,{roughness:.9,clearcoat:0});for(let i=0;i<16;i++){const s=new THREE.Mesh(new THREE.SphereGeometry(.1+.14*hash(i),16,8),wm);s.castShadow=true;g.add(s);fl.push(s)}
  add3('phone',g,(t)=>{const p=pop(t,0,.4);g.scale.setScalar(Math.max(.001,p.s));
    const ring=t<T(14)?1:0;ph.rotation.z=Math.sin(t*55)*.07*ring*(Math.sin(t*6)>0?1:.2);ph.position.y=Math.sin(t*1.5)*.1;
    ph.userData.st.redraw((t*1.5)%1);
    fl.forEach((s,i)=>{const d=t-T(13);s.visible=d>0;if(d>0){const a=hash(i+1)*6.28,v=1.2+2.2*hash(i+5),dd=Math.min(d,.9);
      s.position.set(Math.cos(a)*v*dd*1.5,-1.6+4.5*dd-4*dd*dd+Math.sin(a)*.4,1.4+hash(i+9))}})});
}
// headset
{ const g=new THREE.Group();const pm=M(0xff3d7f,{metalness:.3}),dk=M(0x1c1f2e,{roughness:.35});
  const band=new THREE.Mesh(new THREE.TorusGeometry(1.7,.16,20,80,Math.PI),pm);band.position.y=.2;g.add(band);
  [-1,1].forEach(s=>{const cup=new THREE.Mesh(new THREE.CylinderGeometry(.75,.75,.55,48),dk);cup.rotation.z=Math.PI/2;cup.position.set(s*1.7,.1,0);g.add(cup);
    const pad=new THREE.Mesh(new THREE.TorusGeometry(.5,.18,16,40),pm);pad.rotation.y=Math.PI/2;pad.position.set(s*1.38,.1,0);g.add(pad)});
  const arm=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(-1.85,-.1,.3),new THREE.Vector3(-1.5,-1.1,.9),new THREE.Vector3(-.5,-1.45,1.3)]),40,.07,12),dk);g.add(arm);
  const mic=new THREE.Mesh(new THREE.SphereGeometry(.24,24,12),pm);mic.position.set(-.5,-1.45,1.3);g.add(mic);
  sh(g);
  add3('centralino',g,(t)=>{const p=pop(t,SC[1].t0+.15,.45);const pu=1+.2*Math.exp(-Math.max(0,t-T(19))*7)*(t>=T(19)?1:0);g.scale.setScalar(1.15*Math.max(.001,p.s)*pu);g.rotation.set(.15,Math.sin(t*1.2)*.5,0);g.position.y=.2+Math.sin(t*1.6)*.12});
}
// red X
{ const g=new THREE.Group();const rm=M(0xff2e4d,{metalness:.2});[1,-1].forEach(s=>{const b=new THREE.Mesh(new RoundedBoxGeometry(3.6,.8,.8,4,.3),rm);b.rotation.z=s*Math.PI/4;g.add(b)});sh(g);
  add3('x',g,(t)=>{const p=pop(t,T(28),.35);g.scale.setScalar(Math.max(.001,p.s));g.rotation.set(.2,Math.sin(t*2)*.4,Math.sin(t*1.3)*.08)});
}
// robot
{ const g=new THREE.Group();const wm=M(0xf4f6fb),bm=M(0x25d366,{metalness:.2});
  const head=new THREE.Mesh(new RoundedBoxGeometry(3,2.4,2.2,6,.5),wm);g.add(head);
  const face=new THREE.Mesh(new RoundedBoxGeometry(2.5,1.6,.1,4,.04),M(0x0d1330,{roughness:.2}));face.position.z=1.08;g.add(face);
  const eyes=[-.55,.55].map(x=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.26,24,12),new THREE.MeshBasicMaterial({color:0x2ee59d}));e.position.set(x,.15,1.15);e.scale.z=.4;g.add(e);return e});
  const mouth=new THREE.Mesh(new THREE.TorusGeometry(.35,.06,8,24,Math.PI),new THREE.MeshBasicMaterial({color:0x2ee59d}));mouth.rotation.z=Math.PI;mouth.position.set(0,-.25,1.15);g.add(mouth);
  const ant=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.8,12),wm);ant.position.y=1.6;g.add(ant);
  const ball=new THREE.Mesh(new THREE.SphereGeometry(.22,24,12),bm);ball.position.y=2.1;g.add(ball);
  [-1,1].forEach(s=>{const ear=new THREE.Mesh(new THREE.CylinderGeometry(.4,.4,.3,32),bm);ear.rotation.z=Math.PI/2;ear.position.x=s*1.6;g.add(ear)});
  sh(g);
  add3('robot',g,(t)=>{const p=pop(t,SC[3].t0+.15,.5);g.scale.setScalar(1.0*Math.max(.001,p.s));g.rotation.y=Math.sin(t*1.3)*.35;g.position.y=-.1+Math.sin(t*1.8)*.15;
    const bl=(t%2.2)<.12?.1:1;eyes.forEach(e=>e.scale.y=bl);ball.scale.setScalar(1+.3*Math.exp(-((t%BEAT)/BEAT)*5))});
}
// clock 2:00
{ const g=new THREE.Group();
  const rim=new THREE.Mesh(new THREE.TorusGeometry(2,.22,24,96),M(0x2d5bff,{metalness:.6,roughness:.2}));g.add(rim);
  const st=texCanvas(512,512,(x)=>{x.fillStyle='#f7f8ff';x.beginPath();x.arc(256,256,256,0,7);x.fill();x.fillStyle='#10131f';x.font='800 54px Inter';x.textAlign='center';x.textBaseline='middle';
    for(let i=1;i<=12;i++){const a=i/12*Math.PI*2;x.fillText(i,256+Math.sin(a)*195,256-Math.cos(a)*195)}});st.redraw();
  const face=new THREE.Mesh(new THREE.CircleGeometry(2,96),new THREE.MeshBasicMaterial({map:st.tx,toneMapped:false}));face.position.z=-.02;g.add(face);
  const hh=new THREE.Group(),mh=new THREE.Group();const h1=new THREE.Mesh(new RoundedBoxGeometry(.2,1.0,.08,2,.04),M(0x10131f));h1.position.y=.42;hh.add(h1);
  const m1=new THREE.Mesh(new RoundedBoxGeometry(.13,1.5,.08,2,.04),M(0x10131f));m1.position.y=.68;mh.add(m1);hh.position.z=.1;mh.position.z=.16;g.add(hh,mh);
  const cap=new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,.1,24),M(0xff3b5c));cap.rotation.x=Math.PI/2;cap.position.z=.22;g.add(cap);
  sh(g);
  add3('night',g,(t)=>{const p=pop(t,SC[5].t0+.12,.4);g.scale.setScalar(1.1*Math.max(.001,p.s));const k=eOut(prog(t,SC[5].t0,.7));
    mh.rotation.z=-k*Math.PI*2*4;hh.rotation.z=-(lerp(10,14,k)/12)*Math.PI*2;g.rotation.y=Math.sin(t*1.1)*.3;g.position.y=Math.sin(t*1.5)*.1});
}
// pizza
{ const g=new THREE.Group();
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(2.2,2.1,.25,64),M(0xe9b872,{roughness:.6,clearcoat:.2})));
  const crust=new THREE.Mesh(new THREE.TorusGeometry(2.15,.24,16,80),M(0xd9963f,{roughness:.6,clearcoat:.2}));crust.rotation.x=Math.PI/2;crust.position.y=.12;g.add(crust);
  const sauce=new THREE.Mesh(new THREE.CylinderGeometry(1.95,1.95,.06,64),M(0xd62b1e,{roughness:.35}));sauce.position.y=.15;g.add(sauce);
  for(let i=0;i<11;i++){const a=hash(i)*6.28,r=.3+1.3*hash(i+3);const m=new THREE.Mesh(new THREE.SphereGeometry(.3+.12*hash(i+7),20,10),M(0xfff6e0,{roughness:.5}));m.scale.y=.3;m.position.set(Math.cos(a)*r,.2,Math.sin(a)*r);g.add(m)}
  for(let i=0;i<5;i++){const a=i*1.3+.4,r=.6+.25*i;const l=new THREE.Mesh(new THREE.SphereGeometry(.22,16,8),M(0x2f8f3a));l.scale.set(1.3,.15,.7);l.position.set(Math.cos(a)*r,.27,Math.sin(a)*r);l.rotation.y=a;g.add(l)}
  sh(g);
  add3('pizza',g,(t)=>{const p=pop(t,SC[6].t0+.12,.45);const d=t-T(73);const toss=d>0&&d<.8;g.scale.setScalar(1.15*Math.max(.001,p.s));
    g.rotation.set(.55,t*.8+(toss?d*8:0),0);g.position.y=-.4+(toss?Math.sin(d/.8*Math.PI)*1.6:0)});
}
// cogs
{ const g=new THREE.Group();
  function cog(R,n,col){const s=new THREE.Shape();const N=n*4;for(let i=0;i<=N;i++){const a=i/N*Math.PI*2;const r=(i%4<2)?R:R*.8;const x=Math.cos(a)*r,y=Math.sin(a)*r;i?s.lineTo(x,y):s.moveTo(x,y)}
    const h=new THREE.Path();h.absarc(0,0,R*.3,0,Math.PI*2,true);s.holes.push(h);
    const m=new THREE.Mesh(new THREE.ExtrudeGeometry(s,{depth:.45,bevelEnabled:true,bevelSize:.05,bevelThickness:.05,bevelSegments:2,curveSegments:8}),M(col,{metalness:.9,roughness:.2}));m.geometry.center();return m}
  const c1=cog(1.7,12,0xffc53d),c2=cog(1.15,8,0x5b8cff),c3=cog(.8,6,0x2ee59d);c1.position.set(-.9,.4,0);c2.position.set(1.62,-.75,0);c3.position.set(1.3,1.45,.1);g.add(c1,c2,c3);sh(g);
  add3('payoff',g,(t)=>{const p=pop(t,SC[7].t0+.12,.45);const out=clamp((t-T(85)+.1)/.2);g.scale.setScalar(1.05*Math.max(.001,p.s*(1-out)));
    c1.rotation.z=t*1.2;c2.rotation.z=-t*1.2*12/8+.2;c3.rotation.z=-t*1.2*12/6;g.rotation.set(-.2,Math.sin(t)*.35,0);g.position.y=Math.sin(t*1.5)*.1});
}
const BOX={phone:[540,1070,880],centralino:[540,940,720],x:[540,1430,340],robot:[540,1000,800],night:[540,1010,760],pizza:[540,1020,860],payoff:[540,1040,820]};
const SCN={
 phone(t){render3D('phone',t,BOX.phone);const p=pop(t,T(13)-.02,.3);withT(540,1560,p.s,p.a,()=>pill('3 chiamate perse',540,1560,{size:40,bg:'#ff2e4d',c:'#fff'}))},
 centralino(t){render3D('centralino',t,BOX.centralino);
   const p=pop(t,T(16)-.05,.35);withT(540,1390,p.s,p.a,()=>{card(130,1260,820,270);txt('IL TUO RUOLO STASERA',175,1325,{size:28,w:900,c:'#8a90a6',ls:2});
     txt('Pizzaiolo + centralino',175,1400,{size:46,w:900});txt('Costo: le tue serate',175,1465,{size:34,w:700,c:'#6b7185'});
     stampTxt('IL PIÙ CARO',770,1460,t,T(19),'#ff2e4d',-.12,32)})},
 lost(t){const o=prog(t,T(31)-.05,.2);
   if(o<1){withT(540,940,1,1-o,()=>{const p=pop(t,SC[2].t0+.1,.35);withT(540,940,p.s,p.a,()=>{card(110,680,860,520);txt('Chiamate perse',160,750,{size:34,w:900});
     const n=Math.round(lerp(0,7,eOut(prog(t,T(25),.5))));txt(String(n),920,752,{size:56,w:900,c:'#ff2e4d',al:'right'});
     ['19:42','20:05','20:31','21:10'].forEach((h,i)=>{const q=pop(t,T(24)+i*.1,.3);const y=800+i*92;withT(540,y+38,1,q.a,()=>{rr(150,y,780,76,22);ctx.fillStyle='#fff1f2';ctx.fill();
       ctx.beginPath();ctx.arc(192,y+38,22,0,7);ctx.fillStyle='#ff2e4d';ctx.fill();txt('×',192,y+50,{size:34,w:900,c:'#fff',al:'center'});
       txt('Numero sconosciuto',232,y+50,{size:32,w:700});txt(h,900,y+50,{size:30,w:700,c:'#8a90a6',al:'right'})})})});
     render3D('x',t,BOX.x)})}
   if(t>=T(31)-.05){const p=pop(t,T(31)-.05,.35);withT(540,1060,p.s,p.a,()=>{card(130,860,820,400);txt('Pizzeria del vicino',180,940,{size:40,w:900});
     txt('Nuova prenotazione',180,1000,{size:32,w:700,c:'#6b7185'});rr(180,1050,720,140,30);ctx.fillStyle='#e9fbf2';ctx.fill();
     txt('Tavolo per 4 · 21:00',220,1135,{size:40,w:800,c:'#0a7a4f'});check(840,1120,34,prog(t,T(33),.4))})}},
 robot(t){render3D('robot',t,BOX.robot);const p=pop(t,T(42),.35);withT(540,1540,p.s,p.a,()=>pill('Assistente AI su WhatsApp',540,1540,{size:40,bg:'#25d366',c:'#fff'}))},
 chat(t,t0){const p=pop(t,t0+.08,.4);withT(540,1100,p.s,p.a,()=>{card(80,680,920,860,{r:52});
   avatar(150,760,40,'AI','#25d366','#0a8f5a');txt('Pizzeria · Assistente',210,755,{size:34,w:800});
   ctx.beginPath();ctx.arc(220,786,8,0,7);ctx.fillStyle='#19c37d';ctx.fill();txt('online 24/7',236,797,{size:26,w:600,c:'#19c37d'});
   ctx.fillStyle='#eef0f6';ctx.fillRect(80,822,920,3);
   const bubble=(s,y,t1,right)=>{const q=pop(t,t1,.3);if(q.a<=0)return;const lines=wrapLines(s,560,36,700);const h=lines.length*46+40;const w=Math.max(...lines.map(l=>ctx.measureText(l).width))+56;
     const x=right?960-w:120;withT(right?960-w/2:120+w/2,y+h/2,q.s,q.a,()=>{rr(x,y,w,h,30);ctx.fillStyle=right?'#d9fdd3':'#f1f3f9';ctx.fill();
     lines.forEach((l,i)=>txt(l,x+28,y+56+i*46,{size:36,w:700,c:'#10131f'}))})};
   bubble('Avete un tavolo per 4 stasera alle 21?',850,t0+.15,false);
   const tq=pop(t,T(47)-.02,.3);withT(860,995,tq.s,tq.a,()=>pill('3 s',860,995,{size:30,bg:'#2d5bff',c:'#fff',pad:22}));
   bubble('Fatto! Tavolo per 4 alle 21:00. A nome di?',1040,T(49),true);
   const mq=pop(t,T(54)-.05,.3);withT(780,1230,mq.s,mq.a,()=>{rr(600,1170,360,120,30);ctx.fillStyle='#d9fdd3';ctx.fill();rr(625,1192,62,76,10);ctx.fillStyle='#ff2e4d';ctx.fill();
     txt('PDF',656,1240,{size:22,w:900,c:'#fff',al:'center'});txt('Menù.pdf',710,1225,{size:34,w:800});txt('2 pagine',710,1262,{size:24,w:600,c:'#6b7185'})});
   stampTxt('CONFERMATO',330,1300,t,T(56),'#0aa66b',-.1,40);
   const d=prog(t,T(59)-.05,.35);if(d>0)withT(540,1450,1,d,()=>{ctx.save();ctx.translate(0,lerp(-60,0,eBack(d)));rr(110,1380,860,130,32);ctx.fillStyle='#10131f';ctx.fill();
     ctx.beginPath();ctx.arc(180,1445,36,0,7);ctx.fillStyle='#FFD60A';ctx.fill();txt('!',180,1462,{size:46,w:900,al:'center'});
     txt('Nuova prenotazione',240,1432,{size:32,w:800,c:'#fff'});txt('Rossi · 4 persone · 21:00',240,1478,{size:28,w:600,c:'#a3a8b8'});ctx.restore()})})},
 night(t){render3D('night',t,BOX.night);const p=pop(t,T(67)-.02,.3);withT(540,1530,p.s,p.a,()=>pill('02:00 · prenotazione presa',540,1530,{size:38,bg:'#fff',c:'#16205a'}))},
 pizza(t){render3D('pizza',t,BOX.pizza);const p=pop(t,T(74)-.02,.3);withT(540,1540,p.s,p.a,()=>{const n=Math.round(lerp(0,12,eOut(prog(t,T(74),.8))));pill('Il bot intanto: '+n+' prenotazioni',540,1540,{size:36,bg:'#fff',c:'#ff3d00'})})},
 payoff(t){render3D('payoff',t,BOX.payoff);if(t>=T(85)-.05)drawLogo(t,T(85)-.05,540,1060,700)},
};
