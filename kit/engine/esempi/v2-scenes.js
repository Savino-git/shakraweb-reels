const SP={calc:['pink','orange','violet'],phone:['violet','blue','pink','violet','blue'],noshow:['navy','red','navy2','red','navy'],booking:['blue','teal','violet','blue'],
 reminder:['green','teal','blue','green','teal'],scissors:['pink','violet','orange'],all:['navy','violet','navy2','blue','violet','navy'],cta:['blue','violet','green','navy']};
// calculator
{ const g=new THREE.Group();g.add(new THREE.Mesh(new RoundedBoxGeometry(3.2,4.6,.5,6,.3),M(0x1c1f2e,{roughness:.3})));
  const st=texCanvas(512,200,(x,k=0)=>{x.fillStyle='#d8f5e6';x.fillRect(0,0,512,200);x.fillStyle='#10131f';x.font='900 110px Inter';x.textAlign='right';x.fillText(['0','40','40×30','= ?'][k]||'0',480,150)});st.redraw(0);
  const scr=new THREE.Mesh(new THREE.PlaneGeometry(2.6,1.0),new THREE.MeshBasicMaterial({map:st.tx,toneMapped:false}));scr.position.set(0,1.45,.26);g.add(scr);
  const keys=[];for(let r=0;r<4;r++)for(let c=0;c<4;c++){const k=new THREE.Mesh(new RoundedBoxGeometry(.56,.5,.2,3,.08),M(c===3?0xff7a1a:(r===3&&c===2?0x2ee59d:0xf1f3f9)));k.position.set(-1.0+c*.66,.45-r*.62,.3);g.add(k);keys.push(k)}
  sh(g);let last=-1;
  add3('calc',g,(t)=>{const p=pop(t,0,.4);g.scale.setScalar(1.05*Math.max(.001,p.s));g.rotation.set(-.25,Math.sin(t*1.2)*.4,.05);g.position.y=Math.sin(t*1.6)*.1;
    const kk=Math.min(3,Math.floor(Math.max(0,t-T(0))/.25));if(kk!==last){st.redraw(kk);last=kk}
    keys.forEach((k,i)=>{let z=.3;for(let j=0;j<5;j++){const d=t-(T(0)+j*.12);if(d>0&&d<.12&&(i*7+j*5)%16===i)z=.2}const d=t-(T(0)+(i%5)*.12);k.position.z=(i<5&&d>0&&d<.1)?.2:.3})});
}
// hourglass
{ const g=new THREE.Group();const wood=M(0x8a4b1f,{roughness:.45,clearcoat:.4});
  [1,-1].forEach(s=>{const c=new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,.3,48),wood);c.position.y=s*2.1;g.add(c)});
  for(let i=0;i<3;i++){const a=i/3*Math.PI*2;const r=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,4.2,12),wood);r.position.set(Math.cos(a)*1.3,0,Math.sin(a)*1.3);g.add(r)}
  const pts=[];for(let i=0;i<=40;i++){const y=-1.95+i/40*3.9;const r=.12+1.0*Math.pow(Math.abs(y)/1.95,.7);pts.push(new THREE.Vector2(r,y))}
  g.add(new THREE.Mesh(new THREE.LatheGeometry(pts,48),M(0xbfe6ff,{transparent:true,opacity:.28,roughness:.05})));
  const sm=M(0xffc53d,{roughness:.6,clearcoat:.1});const top=new THREE.Mesh(new THREE.ConeGeometry(.85,1.3,40),sm);top.rotation.x=Math.PI;top.position.y=.85;g.add(top);
  const bot=new THREE.Mesh(new THREE.ConeGeometry(.95,1,40),sm);bot.position.y=-1.45;g.add(bot);
  const stream=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,1.6,8),sm);stream.position.y=-.6;g.add(stream);sh(g);
  add3('glass',g,(t)=>{const p=pop(t,SC[1].t0+.12,.45);g.scale.setScalar(.85*Math.max(.001,p.s));const k=clamp((t-SC[1].t0)/3.6);
    top.scale.set(1-.6*k,1-.6*k,1-.6*k);top.position.y=.25+.6*(1-.6*k);bot.scale.set(.4+.6*k,.4+.6*k,.4+.6*k);bot.position.y=-1.95+.5*(.4+.6*k);
    g.rotation.set(0,t*.6,Math.sin(t*1.3)*.08);const fl=t>T(15)&&t<T(15)+.6?(t-T(15))/.6:0;g.rotation.z+=fl*Math.PI})
}
// bin with coins
{ const g=new THREE.Group();const bm=M(0x9aa3b8,{metalness:.9,roughness:.3});
  const pts=[[0,-1.6],[1.25,-1.6],[1.55,1.4],[1.62,1.5],[1.5,1.5],[1.18,-1.45],[0,-1.45]].map(([x,y])=>new THREE.Vector2(x,y));g.add(new THREE.Mesh(new THREE.LatheGeometry(pts,64),bm));
  const coins=[];for(let i=0;i<8;i++){const c=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,.1,40),gold());c.castShadow=true;g.add(c);coins.push(c)}sh(g);
  add3('bin',g,(t)=>{const p=pop(t,T(31)-.05,.4);g.scale.setScalar(1.0*Math.max(.001,p.s));g.rotation.set(.3,Math.sin(t)*.2,0);
    coins.forEach((c,i)=>{const d=t-(T(33)+i*.08);c.visible=d>0&&d<.9;const y=4-14*d*d;c.position.set(Math.sin(i*2.1)*.6,Math.max(y,-1.2+.1*i),Math.cos(i*1.7)*.5);c.rotation.set(d*9+i,i,d*5)});
    const sk=t>T(37)?Math.exp(-(t-T(37))*6):0;g.position.x=Math.sin(t*80)*.15*sk});
}
// booking phone
{ const g=new THREE.Group();
  const ph=phone(0xf2f2f7,(x,s=0)=>{x.fillStyle='#fff';x.fillRect(0,0,512,1024);x.fillStyle='#2d5bff';x.fillRect(0,0,512,170);x.fillStyle='#fff';x.font='800 40px Inter';x.fillText('Prenota',40,95);x.font='600 26px Inter';x.fillText('Salone · online 24/7',40,140);
    x.fillStyle='#10131f';x.font='800 30px Inter';x.fillText('Ottobre',40,230);
    for(let i=0;i<21;i++){const c=i%7,r=Math.floor(i/7);const cx=60+c*66,cy=290+r*72;const sel=s>=1&&i===10;x.fillStyle=sel?'#2d5bff':'#f1f3f9';x.beginPath();x.arc(cx,cy,26,0,7);x.fill();x.fillStyle=sel?'#fff':'#10131f';x.font='700 24px Inter';x.textAlign='center';x.fillText(String(13+i),cx,cy+9);x.textAlign='left'}
    x.fillStyle='#10131f';x.font='800 30px Inter';x.fillText('Orario',40,540);
    ['09:00','10:30','11:30','15:00','16:30','18:00'].forEach((h,i)=>{const cx=40+(i%3)*150,cy=570+Math.floor(i/3)*90;const sel=s>=2&&i===1;x.fillStyle=sel?'#2d5bff':'#f1f3f9';x.beginPath();x.roundRect(cx,cy,135,70,20);x.fill();x.fillStyle=sel?'#fff':'#10131f';x.font='700 28px Inter';x.fillText(h,cx+30,cy+46)});
    x.fillStyle=s>=3?'#19c37d':'#c9d3ff';x.beginPath();x.roundRect(40,820,432,100,50);x.fill();x.fillStyle='#fff';x.font='800 36px Inter';x.textAlign='center';x.fillText(s>=3?'Prenotato ✓':'Conferma',256,883);x.textAlign='left'});
  g.add(ph);ph.rotation.set(-.06,.32,.03);let last=-1;
  add3('booking',g,(t)=>{const p=pop(t,SC[3].t0+.12,.45);g.scale.setScalar(1.1*Math.max(.001,p.s));ph.rotation.y=.32+Math.sin(t*1.1)*.1;g.position.y=Math.sin(t*1.5)*.1;
    const s=t>=T(52)?3:t>=T(50)?2:t>=T(48)?1:0;if(s!==last){ph.userData.st.redraw(s);last=s}});
}
// scissors
{ const g=new THREE.Group();const steel=M(0xe3e8f0,{metalness:1,roughness:.12}),pk=M(0xff3d7f,{metalness:.2});
  function blade(s){const b=new THREE.Group();const sh2=new THREE.Shape();sh2.moveTo(0,0);sh2.lineTo(3.2,s*.08);sh2.quadraticCurveTo(1.6,s*.45,0,s*.32);sh2.lineTo(0,0);
    const m=new THREE.Mesh(new THREE.ExtrudeGeometry(sh2,{depth:.08,bevelEnabled:true,bevelSize:.03,bevelThickness:.03,bevelSegments:2}),steel);b.add(m);
    const arm=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,1,12),steel);arm.rotation.z=Math.PI/2;arm.position.set(-.5,0,.04);b.add(arm);
    const h=new THREE.Mesh(new THREE.TorusGeometry(.5,.14,16,48),pk);h.position.set(-1.45,s*.15,.04);h.scale.y=.75;b.add(h);return b}
  const b1=blade(1),b2=blade(-1);b2.position.z=.14;g.add(b1,b2);const pin=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.4,24),gold());pin.rotation.x=Math.PI/2;pin.position.z=.08;g.add(pin);sh(g);
  add3('scissors',g,(t)=>{const p=pop(t,SC[5].t0+.1,.4);g.scale.setScalar(1.0*Math.max(.001,p.s));const sn=Math.abs(Math.sin((t-SC[5].t0)*7));const a=.08+.32*sn;
    b1.rotation.z=a;b2.rotation.z=-a;g.rotation.set(.3,Math.sin(t*1.2)*.4,-.4+Math.sin(t)*.1);g.position.set(.2,Math.sin(t*1.6)*.12,0)});
}
// browser window
{ const g=new THREE.Group();g.add(new THREE.Mesh(new RoundedBoxGeometry(4.4,3.2,.3,5,.2),M(0xf4f6fb)));
  const st=texCanvas(600,420,(x,k=0)=>{x.fillStyle='#fff';x.fillRect(0,0,600,420);x.fillStyle='#eef0f6';x.fillRect(0,0,600,56);['#ff5f57','#febc2e','#28c840'].forEach((c,i)=>{x.fillStyle=c;x.beginPath();x.arc(30+i*30,28,10,0,7);x.fill()});
    if(k<1){x.fillStyle='#c9cfdd';x.font='900 120px Inter';x.textAlign='center';x.fillText('404',300,250);x.font='700 30px Inter';x.fillText('Sito non trovato',300,310);x.textAlign='left'}
    else{x.fillStyle='#2d5bff';x.fillRect(30,80,540*Math.min(1,k-1+.3),110);x.fillStyle='#10131f';[0,1,2].forEach(i=>{x.fillStyle=['#ffd60a','#2ee59d','#ff4f8b'][i];x.fillRect(30+i*185,215,170*Math.min(1,Math.max(0,(k-1)*3-i*.5)),170)})}});st.redraw(0);
  const scr=new THREE.Mesh(new THREE.PlaneGeometry(4.1,2.87),new THREE.MeshBasicMaterial({map:st.tx,toneMapped:false}));scr.position.z=.16;g.add(scr);sh(g);
  add3('web',g,(t)=>{const p=pop(t,SC[6].t0+.1,.4);const out=clamp((t-T(81)+.1)/.2);g.scale.setScalar(1.05*Math.max(.001,p.s*(1-out)));g.rotation.set(-.08,Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.1;
    st.redraw(t<T(79)?0:1+clamp((t-T(79))/.7))});
}
const BOX={calc:[540,1050,860],glass:[540,880,560],bin:[540,880,560],booking:[540,1060,900],scissors:[540,1030,860],web:[540,1040,800]};
const SCN={
 calc(t){render3D('calc',t,BOX.calc)},
 phone(t){render3D('glass',t,BOX.glass);
   const p=pop(t,T(7)-.05,.35);withT(540,1370,p.s,p.a,()=>{card(130,1190,820,360);txt('TEMPO AL TELEFONO',175,1255,{size:28,w:900,c:'#8a90a6',ls:2});
     txt('40 min × 30 giorni',175,1330,{size:46,w:900});const h=Math.round(lerp(0,20,eOut(prog(t,T(15),.5))));
     if(t>=T(14)-.05){txt('= '+h+' ore',175,1460,{size:96,w:900,c:'#6a2cf5',ls:-2})}})},
 noshow(t){const o=prog(t,T(31)-.05,.2);
   if(o<1)withT(540,1000,1,1-o,()=>{const p=pop(t,SC[2].t0+.08,.35);withT(540,980,p.s,p.a,()=>{card(110,700,860,500);txt('Questa settimana',160,770,{size:34,w:900});
     ['Laura · Mar 10:30','Sara · Gio 15:00','Elena · Sab 11:30'].forEach((s,i)=>{const y=810+i*120;rr(150,y,780,100,26);ctx.fillStyle='#f4f5fa';ctx.fill();
       avatar(205,y+50,32,s[0],'#ff4f8b','#ff9f43');txt(s,255,y+62,{size:32,w:700});stampTxt('NON VENUTA',800,y+52,t,T(22)+i*.2,'#ff2e4d',-.1,24)})});
     const q=pop(t,T(28)-.05,.3);withT(540,1330,q.s,q.a,()=>pill('× 30 € l\'una',540,1330,{size:46,bg:'#fff',c:'#ff2e4d'}))});
   if(t>=T(31)-.05){render3D('bin',t,BOX.bin);const p=pop(t,T(33)-.05,.35);withT(540,1340,p.s,p.a,()=>{card(150,1200,780,300);txt('Soldi buttati al mese',195,1270,{size:32,w:700,c:'#6b7185'});
     const v=Math.round(lerp(0,360,eOut(prog(t,T(33),.6))));txt('€ '+v,195,1400,{size:110,w:900,c:'#ff2e4d',ls:-3});
     const q=eOut(prog(t,T(37),.2));if(q>0){ctx.strokeStyle='#10131f';ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(190,1365);ctx.lineTo(190+460*q,1365);ctx.stroke()}})}},
 booking(t){render3D('booking',t,BOX.booking);const p=pop(t,T(52)-.05,.3);withT(540,1560,p.s,p.a,()=>pill('Il cliente prenota da solo',540,1560,{size:38,bg:'#fff',c:'#2d5bff'}))},
 reminder(t,t0){const p=pop(t,t0+.06,.35);withT(540,860,p.s,p.a,()=>{card(90,690,900,330,{r:46});avatar(160,760,36,'S','#25d366','#0a8f5a');txt('Salone · WhatsApp',215,772,{size:32,w:800});
     rr(130,815,700,170,28);ctx.fillStyle='#f1f3f9';ctx.fill();txt('Promemoria: domani alle 10:30',160,872,{size:34,w:800});txt('Taglio + piega. Rispondi NO per disdire.',160,925,{size:28,w:600,c:'#6b7185'});
     const q=pop(t,T(60)-.05,.3);withT(860,960,q.s,q.a,()=>{rr(760,920,190,80,26);ctx.fillStyle='#d9fdd3';ctx.fill();txt('NO',855,975,{size:38,w:900,al:'center'})})});
   const c=pop(t,T(61)-.05,.35);withT(540,1290,c.s,c.a,()=>{card(130,1090,820,400);txt('Agenda · Mar 10:30',175,1160,{size:34,w:900});
     const lib=prog(t,T(64),.3);rr(175,1200,730,110,28);ctx.fillStyle=lib>0?'#e6fbf2':'#f4f5fa';ctx.fill();
     txt('Giulia B.',215,1272,{size:38,w:800,c:lib>0?'#a3a8b8':'#10131f'});if(lib>0){ctx.strokeStyle='#ff2e4d';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(210,1260);ctx.lineTo(210+170*eOut(lib),1260);ctx.stroke();
       const q=pop(t,T(64),.3);withT(760,1255,q.s,q.a,()=>pill('LIBERO',760,1255,{size:30,bg:'#19c37d',c:'#fff',pad:22}))}
     const a=prog(t,T(66)-.05,.3);if(a>0){withT(540,1400,1,a,()=>{txt('Riassegnato a Marta R.',175,1410,{size:34,w:800,c:'#0a7a4f'});check(860,1398,28,prog(t,T(66),.4))})}})},
 scissors(t){render3D('scissors',t,BOX.scissors);const p=pop(t,T(70)-.05,.3);withT(540,1540,p.s,p.a,()=>{const w=pill('Telefonate',540,1540,{size:44,bg:'#fff',c:'#10131f'});
   const q=eOut(prog(t,T(71),.2));if(q>0){ctx.strokeStyle='#ff2e4d';ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(540-w/2+20,1540);ctx.lineTo(540-w/2+20+(w-40)*q,1540);ctx.stroke()}})},
 all(t){render3D('web',t,BOX.web);if(t>=T(81)-.08){drawLogo(t,T(81)-.08,540,800,520);
   const p=pop(t,T(82)-.08,.35);withT(540,1290,p.s,p.a,()=>{card(190,1060,700,470);['Siti','Gestionali','App','Qualsiasi cosa'].forEach((s,i)=>{const y=1100+i*102;const q=prog(t,T(82+i)-.02,.3);
     withT(540,y+45,1,clamp(q*3),()=>{check(265,y+45,30,q);txt(s,320,y+62,{size:46,w:900})})})})}},
};
