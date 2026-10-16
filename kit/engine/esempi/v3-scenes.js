const SP={before:['grey','navy','grey','navy2','grey'],after:['green','teal','mint','green','teal'],rotate:['blue','violet','blue','teal'],quote:['orange','pink','orange'],
 nights:['navy2','violet','pink','red','pink'],config:['violet','blue','teal','violet','blue','pink'],payoff:['navy','night','navy2'],cta:['blue','violet','green','navy']};
// catalog book
{ const g=new THREE.Group();const cov=M(0xc0392b,{roughness:.4,clearcoat:.5}),pg=M(0xf5f1e8,{roughness:.8,clearcoat:0});
  const back=new THREE.Mesh(new RoundedBoxGeometry(2.4,3.2,.1,3,.04),cov);back.position.x=1.2;g.add(back);
  const block=new THREE.Mesh(new THREE.BoxGeometry(2.25,3.05,.3),pg);block.position.set(1.18,0,.2);g.add(block);
  const lp=new THREE.Group();const lpm=new THREE.Mesh(new RoundedBoxGeometry(2.4,3.2,.1,3,.04),cov);lpm.position.x=1.2;lp.add(lpm);lp.position.z=.4;g.add(lp);
  const fp=[];for(let i=0;i<3;i++){const p=new THREE.Group();const m=new THREE.Mesh(new THREE.PlaneGeometry(2.2,3.0),new THREE.MeshStandardMaterial({color:0xfbf8f1,side:THREE.DoubleSide,roughness:.9}));m.position.x=1.1;p.add(m);p.position.z=.36+i*.01;g.add(p);fp.push(p)}
  sh(g);
  add3('book',g,(t)=>{const p=pop(t,0,.4);g.scale.setScalar(1.15*Math.max(.001,p.s));g.position.set(-1.2,Math.sin(t*1.4)*.1,0);g.rotation.set(-.5,.25+Math.sin(t)*.1,0);
    lp.rotation.y=-Math.PI*.92*eOut(prog(t,T(6)-.3,.4));fp.forEach((f,i)=>f.rotation.y=-Math.PI*.9*eInOut(prog(t,T(6)+.05+i*.22,.35)));
    const out=prog(t,T(14),.3);g.position.y-=out*0;})
}
// kitchen
const KD=M(0xffffff,{roughness:.35,clearcoat:.6}),KT=M(0x9aa0ad,{roughness:.4}),KH=M(0xffc53d,{metalness:1,roughness:.2});
{ const g=new THREE.Group();const handles=[];
  for(let i=0;i<3;i++){const x=(i-1)*1.45;const body=new THREE.Mesh(new RoundedBoxGeometry(1.4,1.7,1.3,3,.04),M(0xe9ebf0,{roughness:.5}));body.position.set(x,-.85,0);g.add(body);
    const door=new THREE.Mesh(new RoundedBoxGeometry(1.32,1.55,.08,3,.03),KD);door.position.set(x,-.85,.68);g.add(door);
    const h=new THREE.Mesh(new RoundedBoxGeometry(.7,.08,.1,2,.03),KH);h.position.set(x,-.25,.76);g.add(h);handles.push(h);
    if(i!==1){const wb=new THREE.Mesh(new RoundedBoxGeometry(1.4,1.1,.8,3,.04),M(0xe9ebf0,{roughness:.5}));wb.position.set(x,1.45,-.25);g.add(wb);
      const wd=new THREE.Mesh(new RoundedBoxGeometry(1.32,1.0,.08,3,.03),KD);wd.position.set(x,1.45,.19);g.add(wd);
      const wh=new THREE.Mesh(new RoundedBoxGeometry(.5,.07,.08,2,.03),KH);wh.position.set(x,1.02,.26);g.add(wh);handles.push(wh)}}
  const top=new THREE.Mesh(new RoundedBoxGeometry(4.6,.16,1.45,3,.05),KT);top.position.set(0,.08,.05);g.add(top);
  const hob=new THREE.Mesh(new RoundedBoxGeometry(.9,.03,.7,2,.01),M(0x10131f,{roughness:.1}));hob.position.set(0,.18,.05);g.add(hob);
  sh(g);
  add3('kitchen',g,(t,s)=>{const tA=SC[1].t0,p=pop(t,tA+.15,.5);g.scale.setScalar(.95*Math.max(.001,p.s));
    KD.color.set(t>=T(21)?0x7fa88f:0xffffff);KT.color.set(t>=T(23)?0xb07a45:0x9aa0ad);KT.roughness=t>=T(23)?.55:.4;
    const hp=prog(t,T(25),.3);handles.forEach(h=>{h.visible=hp>0;h.scale.setScalar(Math.max(.001,eBack(hp)))});
    const fl=eOut(prog(t,T(21),.3))*(t<T(21)+.3?1:0);
    const r=t<T(26)?Math.sin(t*1.1)*.35-.3:-.3+Math.PI*2*eInOut(prog(t,T(26),T(33)-T(26)))+Math.sin(t*1.1)*.1*(t>T(33)?1:0);
    g.rotation.set(.18,r,0);g.position.y=-.2+Math.sin(t*1.4)*.08});
}
// envelope
{ const g=new THREE.Group();const em=M(0xffffff,{roughness:.4});g.add(new THREE.Mesh(new RoundedBoxGeometry(3.6,2.3,.2,3,.08),em));
  const fs=new THREE.Shape();fs.moveTo(-1.8,0);fs.lineTo(1.8,0);fs.lineTo(0,-1.3);fs.lineTo(-1.8,0);
  const flap=new THREE.Group();const fm=new THREE.Mesh(new THREE.ExtrudeGeometry(fs,{depth:.04,bevelEnabled:false}),M(0xff7a1a));flap.add(fm);flap.position.set(0,1.15,.12);g.add(flap);
  const seal=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,.08,32),M(0xff2e4d));seal.rotation.x=Math.PI/2;seal.position.set(0,-.12,.16);g.add(seal);sh(g);
  add3('env',g,(t)=>{const p=pop(t,SC[3].t0+.1,.4);const fly=clamp((t-T(40))/.6);g.scale.setScalar(1.0*Math.max(.001,p.s)*(1-.5*fly));
    g.position.set(lerp(0,4,fly*fly),Math.sin(t*1.6)*.1+lerp(0,3,fly*fly),0);g.rotation.set(-.15,-.3+Math.sin(t)*.15,Math.sin(t*1.3)*.05+fly*.4);flap.rotation.x=0});
}
// pencil + heart
{ const g=new THREE.Group();const pen=new THREE.Group();const body=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,3.6,6),M(0xffc53d));pen.add(body);
  const tip=new THREE.Mesh(new THREE.ConeGeometry(.3,.8,6),M(0xe9c39b,{roughness:.6}));tip.position.y=-2.2;tip.rotation.x=Math.PI;pen.add(tip);
  const lead=new THREE.Mesh(new THREE.ConeGeometry(.1,.27,12),M(0x2a2a2a));lead.position.y=-2.47;lead.rotation.x=Math.PI;pen.add(lead);
  const er=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,.5,24),M(0xff7aa8));er.position.y=2.05;pen.add(er);pen.rotation.z=-.7;g.add(pen);
  const hs=new THREE.Shape();hs.moveTo(0,-1.2);hs.bezierCurveTo(-.4,-.8,-1.6,-.2,-1.6,.6);hs.bezierCurveTo(-1.6,1.4,-.5,1.6,0,.9);hs.bezierCurveTo(.5,1.6,1.6,1.4,1.6,.6);hs.bezierCurveTo(1.6,-.2,.4,-.8,0,-1.2);
  const heart=new THREE.Mesh(new THREE.ExtrudeGeometry(hs,{depth:.6,bevelEnabled:true,bevelSize:.18,bevelThickness:.2,bevelSegments:6,curveSegments:24}),M(0xff2e5b,{roughness:.15}));heart.geometry.center();g.add(heart);sh(g);
  add3('heart',g,(t)=>{const p=pop(t,SC[4].t0+.1,.4);const sw=prog(t,T(56)-.1,.15);pen.scale.setScalar(Math.max(.001,p.s*(1-sw)));
    const sk=t>T(52)&&t<T(53)+.3?Math.sin(t*40)*.15:0;pen.rotation.z=-.7+sk;pen.position.set(Math.sin(t*2)*.2,0,0);
    const h=pop(t,T(56)-.05,.4);const beat=1+.12*Math.exp(-((t%BEAT)/BEAT)*6);heart.scale.setScalar(1.3*Math.max(.001,h.s)*beat);heart.rotation.y=Math.sin(t*1.5)*.5;g.position.y=Math.sin(t*1.5)*.1});
}
// sofa
{ const g=new THREE.Group();const SM=M(0xff7a1a,{roughness:.6,clearcoat:.15});
  const seat=new THREE.Mesh(new RoundedBoxGeometry(4,.7,1.8,4,.25),SM);seat.position.y=-.5;g.add(seat);
  const back=new THREE.Mesh(new RoundedBoxGeometry(4,1.5,.5,4,.22),SM);back.position.set(0,.4,-.7);g.add(back);
  [-1,1].forEach(s=>{const a=new THREE.Mesh(new RoundedBoxGeometry(.5,1.1,1.8,4,.22),SM);a.position.set(s*2.15,-.15,0);g.add(a)});
  [-.95,.95].forEach(x=>{const c=new THREE.Mesh(new RoundedBoxGeometry(1.85,.35,1.4,4,.15),SM);c.position.set(x,0,.12);g.add(c)});
  [[-1.8,.7],[1.8,.7],[-1.8,-.7],[1.8,-.7]].forEach(([x,z])=>{const l=new THREE.Mesh(new THREE.CylinderGeometry(.08,.05,.4,12),gold());l.position.set(x,-1.05,z);g.add(l)});sh(g);
  const cols=[0xff7a1a,0x2d5bff,0x2ee59d,0xff2e5b,0x7a3cff,0xffc53d];
  add3('sofa',g,(t)=>{const p=pop(t,SC[5].t0+.12,.45);g.scale.setScalar(1.0*Math.max(.001,p.s));const k=Math.floor(Math.max(0,t-T(64))/.45)%cols.length;SM.color.set(cols[k]);
    g.rotation.set(.25,t*.7,0);g.position.y=Math.sin(t*1.5)*.1});
}
// laptop
{ const g=new THREE.Group();const al=M(0xc9ced8,{metalness:.9,roughness:.25});const base=new THREE.Mesh(new RoundedBoxGeometry(4.2,.18,2.8,3,.08),al);base.position.y=-1;g.add(base);
  const lid=new THREE.Group();const lm=new THREE.Mesh(new RoundedBoxGeometry(4.2,2.8,.12,3,.06),al);lm.position.y=1.4;lid.add(lm);
  const st=texCanvas(600,400,(x)=>{const gr=x.createLinearGradient(0,0,600,400);gr.addColorStop(0,'#16205a');gr.addColorStop(1,'#2b1263');x.fillStyle=gr;x.fillRect(0,0,600,400);
    x.fillStyle='#fff';x.font='800 30px Inter';x.fillText('Configuratore 3D',30,50);x.fillStyle='#7fa88f';x.fillRect(60,170,150,150);x.fillRect(225,170,150,150);x.fillRect(390,170,150,150);x.fillStyle='#b07a45';x.fillRect(50,150,500,22);
    x.fillStyle='#2EE59D';x.beginPath();x.roundRect(380,340,190,44,22);x.fill();x.fillStyle='#10131f';x.font='800 24px Inter';x.fillText('€ 8.450',420,370)});st.redraw();
  const scr=new THREE.Mesh(new THREE.PlaneGeometry(3.9,2.55),new THREE.MeshBasicMaterial({map:st.tx,toneMapped:false}));scr.position.set(0,1.4,.07);lid.add(scr);lid.position.set(0,-.95,-1.3);g.add(lid);sh(g);
  add3('laptop',g,(t)=>{const p=pop(t,SC[6].t0+.12,.45);const out=clamp((t-T(86)+.1)/.2);g.scale.setScalar(.95*Math.max(.001,p.s*(1-out)));lid.rotation.x=-.15-1.2*(1-eOut(prog(t,SC[6].t0,.6)));
    g.rotation.set(.2,Math.sin(t*1.1)*.35,0);g.position.y=Math.sin(t*1.5)*.1});
}
const BOX={book:[540,1000,880],kitchen:[540,960,820],env:[540,900,600],heart:[540,980,700],sofa:[540,960,820],laptop:[540,1000,820]};
function swatches(t){const p=pop(t,T(20)-.05,.35);withT(540,1440,p.s,p.a,()=>{card(110,1310,860,260);
  const rows=[['Anta',['#ffffff','#7fa88f','#2d3142'],1,T(21)],['Legno',['#9aa0ad','#b07a45','#5c3a1e'],1,T(23)],['Maniglia',['#ffc53d','#10131f','#c9ced8'],0,T(25)]];
  rows.forEach(([l,cs,sel,tt],i)=>{const x=160+i*280;txt(l,x,1370,{size:30,w:800,c:'#6b7185'});cs.forEach((c,j)=>{const cx=x+30+j*72,cy=1450;ctx.beginPath();ctx.arc(cx,cy,26,0,7);ctx.fillStyle=c;ctx.fill();ctx.strokeStyle='#dfe3ee';ctx.lineWidth=2;ctx.stroke();
    if(j===sel&&t>=tt){const q=eBack(prog(t,tt,.25));ctx.strokeStyle='#2d5bff';ctx.lineWidth=6;ctx.beginPath();ctx.arc(cx,cy,26+10*q,0,7);ctx.stroke()}});
    if(t>=tt)check(x+225,1370-10,18,prog(t,tt,.3))})})}
const SCN={
 before(t){render3D('book',t,BOX.book);const l=pop(t,.1,.3);withT(220,700,l.s,l.a,()=>pill('PRIMA',220,700,{size:40,bg:'#10131f',c:'#fff'}));
   const b=pop(t,T(10)-.05,.3);withT(760,1300,b.s,b.a,()=>{rr(560,1230,400,130,40);ctx.fillStyle='#fff';ctx.fill();ctx.beginPath();ctx.moveTo(620,1355);ctx.lineTo(600,1400);ctx.lineTo(660,1355);ctx.fill();txt('"Ci penso..."',760,1312,{size:44,w:800,al:'center'})});
   stampTxt('CLIENTE PERSO',540,1520,t,T(14),'#ff2e4d',-.1,52)},
 after(t){render3D('kitchen',t,BOX.kitchen);const l=pop(t,SC[1].t0+.05,.3);withT(220,700,l.s,l.a,()=>pill('DOPO',220,700,{size:40,bg:'#fff',c:'#0a8f5a'}));
   const b=pop(t,T(17)-.05,.3);withT(800,700,b.s,b.a,()=>pill('tuosito.it',800,700,{size:32,bg:'#10131f',c:'#fff',w:700}));swatches(t)},
 rotate(t){render3D('kitchen',t,BOX.kitchen);
   const f=prog(t,T(31)-.1,.25);if(f>0&&t<T(34)){const x=lerp(380,700,eInOut(clamp((t-T(31))/.8)));withT(x,1150,1,f,()=>{ctx.beginPath();ctx.arc(x,1150,46,0,7);ctx.fillStyle='rgba(255,255,255,.85)';ctx.fill();ctx.beginPath();ctx.arc(x,1150,70,0,7);ctx.strokeStyle='rgba(255,255,255,.5)';ctx.lineWidth=6;ctx.stroke()})}
   const p=pop(t,T(35)-.05,.35);withT(540,1430,p.s,p.a,()=>{card(190,1310,700,240);txt('Prezzo cucina',235,1375,{size:32,w:700,c:'#6b7185'});
     txt('€ '+fmt(lerp(0,8450,eOut(prog(t,T(37),.6)))),235,1490,{size:100,w:900,ls:-3,c:'#10131f'})})},
 quote(t){render3D('env',t,BOX.env);const p=pop(t,T(41)-.05,.35);withT(540,1330,p.s,p.a,()=>{card(130,1130,820,420);txt('PREVENTIVO N. 58',175,1195,{size:28,w:900,c:'#8a90a6',ls:2});
   [['Cucina Linea Salvia','3 moduli'],['Top in rovere','4,6 m'],['Maniglie oro','5 pz']].forEach(([a,b],i)=>{const y=1260+i*58;txt(a,175,y,{size:34,w:700});txt(b,905,y,{size:32,w:700,c:'#6b7185',al:'right'})});
   ctx.fillStyle='#eef0f6';ctx.fillRect(175,1420,730,3);txt('Totale',175,1490,{size:38,w:800});txt('€ 8.450',905,1490,{size:50,w:900,al:'right',c:'#ff5e00'});
   stampTxt('GIÀ FATTO',740,1220,t,T(44),'#0aa66b',-.12,30)})},
 nights(t){render3D('heart',t,BOX.heart);const p=pop(t,T(47)-.05,.3);withT(540,1500,p.s,p.a,()=>{const w=pill('Disegni rifatti a mano',540,1500,{size:40,bg:'#fff',c:'#10131f'});
   const q=eOut(prog(t,T(52),.2));if(q>0){ctx.strokeStyle='#ff2e4d';ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(540-w/2+24,1500);ctx.lineTo(540-w/2+24+(w-48)*q,1500);ctx.stroke()}})},
 config(t){render3D('sofa',t,BOX.sofa);const p=pop(t,T(64)-.05,.3);withT(540,1330,p.s,p.a,()=>pill('Configuratore 3D su misura',540,1330,{size:40,bg:'#fff',c:'#6a2cf5'}));
   ['Cucine','Divani','Porte','Ogni prodotto'].forEach((s,i)=>{const tt=[T(71),T(72),T(75),T(76)][i];const q=pop(t,tt-.03,.3);const x=[245,470,665,880][i];if(i<3)withT(x,1470,q.s,q.a,()=>pill(s,x,1470,{size:34,bg:'#FFD60A',c:'#10131f',pad:24}));
     else withT(540,1580,q.s,q.a,()=>pill(s,540,1580,{size:38,bg:'#2EE59D',c:'#10131f'}))})},
 payoff(t){render3D('laptop',t,BOX.laptop);if(t>=T(86)-.05)drawLogo(t,T(86)-.05,540,1060,700)},
};
