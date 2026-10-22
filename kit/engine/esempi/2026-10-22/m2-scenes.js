const ST=n=>SC.find(s=>s.name===n).t0;
const SP={myth:['red','orange','red'],false:['navy','navy2','navy'],old:['grey','orange','grey','red','grey'],config:['blue','teal','violet','blue','teal'],
 price:['violet','pink','violet'],lead:['green','teal','green'],all:['navy2','blue','violet'],cta:['blue','violet','green','navy']};
function labelTex(s,w=256,h=256,col='#fff',size=150){const st=texCanvas(w,h,(x)=>{x.clearRect(0,0,w,h);x.fillStyle=col;x.font='900 '+size+'px Inter';x.textAlign='center';x.fillText(s,w/2,h*.7)});st.redraw();return st}
function plane(st,w,h){return new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:st.tx,transparent:true,toneMapped:false}))}
// sports car on turntable
{ const g=new THREE.Group();const tt=new THREE.Mesh(new THREE.CylinderGeometry(2.6,2.7,.3,64),M(0x2a2e40,{metalness:.6,roughness:.3}));tt.position.y=-1.3;g.add(tt);
  const car=new THREE.Group();const body=new THREE.Mesh(new RoundedBoxGeometry(3.8,.8,1.8,6,.35),M(0xff2e4d,{metalness:.4,roughness:.18}));body.position.y=-.45;car.add(body);
  const cab=new THREE.Mesh(new RoundedBoxGeometry(2,.7,1.55,6,.32),M(0x10131f,{metalness:.6,roughness:.1}));cab.position.set(-.2,.15,0);car.add(cab);
  [[-1.2,.9],[1.2,.9],[-1.2,-.9],[1.2,-.9]].forEach(([x,z])=>{const w=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,.32,32),M(0x1a1a1a,{roughness:.6}));w.rotation.x=Math.PI/2;w.position.set(x,-.8,z);car.add(w);
    const hub=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,.34,20),M(0xc9ced9,{metalness:1}));hub.rotation.x=Math.PI/2;hub.position.set(x,-.8,z);car.add(hub)});
  [-.55,.55].forEach(z=>{const l=new THREE.Mesh(new THREE.SphereGeometry(.13,16,12),new THREE.MeshBasicMaterial({color:0xfff6c8,toneMapped:false}));l.position.set(1.88,-.4,z);car.add(l)});
  g.add(car);sh(g);
  add3('car',g,(t)=>{const p=pop(t,.05,.45);g.scale.setScalar(.8*Math.max(.001,p.s));g.rotation.set(.25,0,0);car.rotation.y=t*.9;tt.rotation.y=t*.9;g.position.y=Math.sin(t*1.5)*.06})}
// house with windows
{ const g=new THREE.Group();const body=new THREE.Mesh(new RoundedBoxGeometry(3.4,2.4,2.4,4,.12),M(0xfff4e0,{roughness:.5}));body.position.y=-.6;g.add(body);
  const roof=new THREE.Mesh(new THREE.ConeGeometry(2.7,1.5,4),M(0xff5e00,{roughness:.4}));roof.rotation.y=Math.PI/4;roof.position.y=1.35;roof.scale.set(1,1,.95);g.add(roof);
  const door=new THREE.Mesh(new RoundedBoxGeometry(.7,1.2,.1,3,.05),M(0x8a4b1f,{roughness:.5}));door.position.set(0,-1.2,1.22);g.add(door);
  const wins=[];[[-1.05,-.2],[1.05,-.2],[-1.05,-1.15],[1.05,-1.15]].forEach(([x,y])=>{const w=new THREE.Group();const fr=new THREE.Mesh(new RoundedBoxGeometry(.85,.75,.12,3,.04),M(0xffffff));w.add(fr);
    const gl=new THREE.Mesh(new THREE.PlaneGeometry(.68,.58),new THREE.MeshBasicMaterial({color:0x7fd3ff,toneMapped:false}));gl.position.z=.07;w.add(gl);w.position.set(x,y,1.22);g.add(w);wins.push(w)});sh(g);
  add3('house',g,(t)=>{const p=pop(t,ST('false')+.1,.45);g.scale.setScalar(.9*Math.max(.001,p.s));g.rotation.set(.12,-.4+Math.sin(t*1.1)*.35,0);g.position.y=Math.sin(t*1.5)*.07;
    wins.forEach((w,i)=>{const k=pop(t,T(17)-.05+i*.08,.3);w.scale.setScalar(Math.max(.001,k.p>0?k.s*(1+.15*Math.exp(-(t-T(17))*4)):.001))})})}
// tape measure
{ const g=new THREE.Group();const cs=new THREE.Mesh(new RoundedBoxGeometry(1.8,1.8,.8,6,.35),M(0xffc53d,{roughness:.3}));cs.position.x=-2.1;g.add(cs);
  const disc=new THREE.Mesh(new THREE.CylinderGeometry(.55,.55,.84,40),M(0x10131f,{roughness:.4}));disc.rotation.x=Math.PI/2;disc.position.x=-2.1;g.add(disc);
  const st=texCanvas(1024,64,(x)=>{x.fillStyle='#ffd60a';x.fillRect(0,0,1024,64);x.fillStyle='#10131f';for(let i=0;i<=100;i++){const h=i%10?18:36;x.fillRect(i*10.2,0,3,h);if(i%10===0&&i>0){x.font='800 22px Inter';x.fillText(String(i),i*10.2-12,58)}}});st.redraw();
  const tape=new THREE.Mesh(new THREE.BoxGeometry(1,.4,.04),[M(0xffd60a),M(0xffd60a),M(0xffd60a),M(0xffd60a),new THREE.MeshBasicMaterial({map:st.tx,toneMapped:false}),M(0xffd60a)]);
  tape.geometry.translate(.5,0,0);tape.position.set(-1.3,-.6,.2);g.add(tape);const tip=new THREE.Mesh(new RoundedBoxGeometry(.12,.55,.25,2,.04),M(0xc9ced9,{metalness:1}));g.add(tip);sh(g);
  add3('tape',g,(t)=>{const p=pop(t,ST('old')+.1,.45);g.scale.setScalar(1.1*Math.max(.001,p.s));g.rotation.set(.15,-.25+Math.sin(t*1.1)*.25,0);g.position.y=Math.sin(t*1.5)*.07;
    const L=.05+3.4*eOut(prog(t,T(27),.7));tape.scale.x=L;tape.material[4].map.repeat.set(L/3.45,1);tip.position.set(-1.3+L,-.6,.2)})}
// configurable window
const WIN={};
{ const g=new THREE.Group();const frameM=M(0xffffff,{roughness:.3});WIN.frameM=frameM;
  const bars=[[0,1.9,3.2,.35],[0,-1.9,3.2,.35],[-1.45,0,.35,4.1],[1.45,0,.35,4.1],[0,0,.22,3.6]];
  bars.forEach(([x,y,w,h])=>{const b=new THREE.Mesh(new RoundedBoxGeometry(w,h,.45,4,.08),frameM);b.position.set(x,y,0);g.add(b)});
  const glassM=new THREE.MeshPhysicalMaterial({color:0xbfe6ff,transparent:true,opacity:.32,roughness:.05,metalness:0,clearcoat:1});WIN.glassM=glassM;
  [-.72,.72].forEach(x=>{const p=new THREE.Mesh(new THREE.BoxGeometry(1.2,3.5,.05),glassM);p.position.set(x,0,0);g.add(p)});
  const handleM=M(0xc9ced9,{metalness:1,roughness:.25});WIN.handleM=handleM;const h=new THREE.Group();const hb=new THREE.Mesh(new RoundedBoxGeometry(.18,.4,.12,2,.05),handleM);h.add(hb);
  const hl=new THREE.Mesh(new RoundedBoxGeometry(.12,.7,.12,2,.05),handleM);hl.position.set(0,-.35,.14);h.add(hl);h.position.set(.32,0,.3);g.add(h);WIN.h=h;
  const sill=new THREE.Mesh(new RoundedBoxGeometry(3.6,.2,.9,3,.06),M(0xe8edf8,{roughness:.4}));sill.position.set(0,-2.15,.2);g.add(sill);sh(g);
  add3('win',g,(t)=>{const p=pop(t,ST('config')+.1,.45);g.scale.setScalar(.88*Math.max(.001,p.s));g.position.y=Math.sin(t*1.5)*.07;
    let ry=-.35+Math.sin(t*1.1)*.3;if(t>=T(63))ry+=Math.PI*2*eInOut(prog(t,T(63),1.3));g.rotation.set(.05,ry,0);
    const st=t>=T(57)?3:t>=T(56)?2:t>=T(54)?1:0;
    const cols=[[0xffffff,0,.3],[0x9a5b2c,0,.55],[0xb8bec9,.95,.22],[0x3a3f4a,.6,.3]][st];frameM.color.set(cols[0]);frameM.metalness=cols[1];frameM.roughness=cols[2];
    const hg=t>=T(58);handleM.color.set(hg?0xffc53d:0xc9ced9);h.scale.setScalar(hg?1+.4*Math.exp(-(t-T(58))*6):1);
    const vg=t>=T(59);glassM.color.set(vg?0x5ab0ff:0xbfe6ff);glassM.opacity=vg?.5:.32})}
// envelope with check
{ const g=new THREE.Group();const env=new THREE.Mesh(new RoundedBoxGeometry(3.4,2.2,.25,4,.1),M(0xffffff,{roughness:.35}));g.add(env);
  const sh2=new THREE.Shape();sh2.moveTo(-1.7,0);sh2.lineTo(1.7,0);sh2.lineTo(0,-1.3);sh2.lineTo(-1.7,0);
  const flap=new THREE.Mesh(new THREE.ExtrudeGeometry(sh2,{depth:.06,bevelEnabled:false}),M(0xe8edf8,{roughness:.35}));const fg=new THREE.Group();fg.add(flap);fg.position.set(0,1.1,.14);g.add(fg);
  const ck=new THREE.Group();const disc=new THREE.Mesh(new THREE.CylinderGeometry(.6,.6,.22,40),M(0x19c37d));disc.rotation.x=Math.PI/2;ck.add(disc);
  const ct=texCanvas(256,256,(x)=>{x.clearRect(0,0,256,256);x.strokeStyle='#fff';x.lineWidth=34;x.lineCap='round';x.lineJoin='round';x.beginPath();x.moveTo(60,135);x.lineTo(110,185);x.lineTo(200,85);x.stroke()});ct.redraw();
  const cm=plane(ct,1,1);cm.position.z=.12;ck.add(cm);ck.position.set(1.6,1.1,.5);g.add(ck);sh(g);
  add3('env',g,(t)=>{const p=pop(t,ST('lead')+.1,.45);g.scale.setScalar(.95*Math.max(.001,p.s));g.rotation.set(.1,.35+Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.07+.3;
    fg.rotation.x=-Math.PI*eOut(prog(t,T(75),.5))*.95;const q=pop(t,T(79)-.03,.3);ck.visible=q.p>0;ck.scale.setScalar(Math.max(.001,q.s))})}
const BOX={car:[540,960,780],house:[540,960,720],tape:[540,880,700],win:[540,940,760],env:[540,880,680]};
function chips(t,y,items){ctx.font='800 50px Inter';const pad=30,gap=18;const ws=items.map(([s])=>ctx.measureText(s).width+pad*2);const tot=ws.reduce((a,b)=>a+b,0)+gap*(ws.length-1);let x=540-tot/2;
  items.forEach(([s,tt],i)=>{const q=pop(t,tt-.05,.28);const on=t>=tt;withT(x+ws[i]/2,y,q.s,q.a,()=>{pill(s,x+ws[i]/2,y,{size:50,bg:on?'#FFD60A':'#fff',c:'#10131f',pad})});x+=ws[i]+gap})}
const SCN={
 myth(t){render3D('car',t,BOX.car);const q=pop(t,T(6)-.05,.3);withT(540,1460,q.s,q.a,()=>pill('Solo per le grandi marche?',540,1460,{size:46,bg:'#fff',c:'#10131f'}))},
 false(t){render3D('house',t,BOX.house);stampTxt('FALSO',540,1460,t,ST('false')+.08,'#FF2E4D',-.1,90)},
 old(t){render3D('tape',t,BOX.tape);const c=pop(t,T(23)-.08,.35);withT(540,1380,c.s,c.a,()=>{card(170,1280,740,220);
   txt('Preventivo #214',230,1355,{size:34,w:700,c:'#6b7185'});const d=1+Math.round(6*eOut(prog(t,T(34),1.0)));txt('Giorno '+d,230,1440,{size:58,w:900,c:d>=7?'#ff2e4d':'#10131f'});
   txt('in attesa…',850,1440,{size:34,w:700,c:'#a3a8b8',al:'right'})});stampTxt('FIRMATO CON UN ALTRO',540,1610,t,T(40)-.02,'#fff',-.06,46)},
 config(t){render3D('win',t,BOX.win);chips(t,1440,[['Legno',T(54)],['Alluminio',T(56)]]);chips(t,1575,[['Colore',T(57)],['Maniglia',T(58)],['Vetro',T(59)]])},
 price(t){render3D('win',t,BOX.win);const c=pop(t,T(68)-.08,.35);withT(540,1460,c.s,c.a,()=>{card(220,1360,640,210);txt('Prezzo',280,1435,{size:34,w:700,c:'#6b7185'});
   const v=480+210*eOut(prog(t,T(70),.9));txt('€ '+fmt(v),280,1520,{size:72,w:900,c:'#6a2cf5'});pill('LIVE',780,1430,{size:28,bg:'#2EE59D',c:'#10131f',pad:18})})},
 lead(t){render3D('env',t,BOX.env);const c=pop(t,T(77)-.08,.35);withT(540,1400,c.s,c.a,()=>{card(150,1240,780,330);
   txt('NUOVA RICHIESTA',200,1310,{size:30,w:900,c:'#00a676',ls:2});
   [['Finestra','120 × 140 cm',T(80)],['Alluminio','antracite',T(81)],['Maniglia','oro · € 690',T(82)]].forEach(([a,b,tt],i)=>{const y=1380+i*62;const q=prog(t,tt-.05,.2);ctx.globalAlpha*=1;
     if(q>0){txt(a,200,y,{size:38,w:800});txt(b,880,y,{size:38,w:700,c:'#6b7185',al:'right'})}})})},
 all(t){if(t>=T(84)-.05)drawLogo(t,T(84)-.05,540,900,640);
   const items=[['Siti',T(86)],['Gestionali',T(87)],['App',T(89)],['AI',T(90)],['3D',T(91)]];chips(t,1330,items.slice(0,3));chips(t,1450,items.slice(3));
   const q=pop(t,T(89)-.05,.3);withT(540,1580,q.s,q.a,()=>pill('qualsiasi cosa ti serva',540,1580,{size:42,bg:'#FFD60A',c:'#10131f'}))},
};
