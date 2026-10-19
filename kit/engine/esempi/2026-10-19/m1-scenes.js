
const ST=n=>SC.find(s=>s.name===n).t0;
const SP={stars:['orange','pink','orange','red'],oldsite:['grey','navy','grey','blue'],portal:['violet','navy2','violet','red'],math:['red','orange','red','pink'],
 site:['blue','teal','blue'],direct:['green','teal','green'],all:['navy2','violet','blue','navy2','violet'],payoff:['night','navy','navy2'],cta:['blue','violet','green','navy']};
function star2(cx,cy,R,col){ctx.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5;const r=i%2?R*.45:R;ctx.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r)}ctx.closePath();ctx.fillStyle=col;ctx.fill()}
function starShape(R,r){const s=new THREE.Shape();for(let i=0;i<10;i++){const a=i/10*Math.PI*2+Math.PI/2;const q=i%2?r:R;const x=Math.cos(a)*q,y=Math.sin(a)*q;i?s.lineTo(x,y):s.moveTo(x,y)}s.closePath();return s}
// house + stars
{ const g=new THREE.Group();const body=new THREE.Mesh(new RoundedBoxGeometry(2.6,1.9,2,4,.1),M(0xfff4e0,{roughness:.4}));body.position.y=-.9;g.add(body);
  const roof=new THREE.Mesh(new THREE.ConeGeometry(2.2,1.3,4,1),M(0xff5e3a));roof.rotation.y=Math.PI/4;roof.position.y=.6;roof.scale.set(1,1,.85);g.add(roof);
  const door=new THREE.Mesh(new RoundedBoxGeometry(.6,1,.1,2,.05),M(0x8a4b1f));door.position.set(0,-1.35,1.02);g.add(door);
  [-.85,.85].forEach(x=>{const w=new THREE.Mesh(new RoundedBoxGeometry(.55,.55,.08,2,.04),M(0x13b4ff,{metalness:.3,roughness:.1}));w.position.set(x,-.75,1.02);g.add(w)});
  const stars=[];const geo=new THREE.ExtrudeGeometry(starShape(.42,.18),{depth:.16,bevelEnabled:true,bevelSize:.04,bevelThickness:.04,bevelSegments:2});geo.center();
  for(let i=0;i<5;i++){const s=new THREE.Mesh(geo,gold());g.add(s);stars.push(s)}sh(g);
  add3('house',g,(t)=>{const p=pop(t,0,.4);g.scale.setScalar(.9*Math.max(.001,p.s));g.rotation.set(.12,-.5+Math.sin(t*1.1)*.35,0);g.position.y=-.3+Math.sin(t*1.5)*.08;
    stars.forEach((s,i)=>{const q=pop(t,T(10)+i*.07,.35);s.visible=q.p>0;s.scale.setScalar(Math.max(.001,q.s));const a=Math.PI*(.15+.7*i/4);s.position.set(Math.cos(a)*-2.3,1.2+Math.sin(a)*1.3,.3);s.rotation.set(0,t*2+i,0)})})}
// old CRT monitor
{ const g=new THREE.Group();const box=new THREE.Mesh(new RoundedBoxGeometry(3.6,3,2.4,5,.3),M(0xe8e0c8,{roughness:.6,clearcoat:.2}));box.position.z=-.6;g.add(box);
  const bez=new THREE.Mesh(new RoundedBoxGeometry(3.6,3,.3,4,.12),M(0xd9d0b4,{roughness:.6,clearcoat:.2}));bez.position.z=.65;g.add(bez);
  const st=texCanvas(512,400,(x,on=1,gl=0)=>{x.fillStyle='#e9ebee';x.fillRect(0,0,512,400);if(!on){x.fillStyle='#111';x.fillRect(0,0,512,400);return}
    x.fillStyle='#3b5998';x.fillRect(0,0,512,56);x.fillStyle='#fff';x.font='800 30px Inter';x.fillText('Pagina social',16,38);
    x.fillStyle='#b9c1d0';x.fillRect(16,72,480,110);x.fillStyle='#fff';x.font='700 26px Inter';x.fillText('B&B Villa Rossi',30,160);
    x.fillStyle='#fff';x.fillRect(16,196,480,190);x.fillStyle='#90949c';x.font='600 22px Inter';x.fillText('Post del 12/06/2015',30,230);
    x.fillStyle='#ccd0d5';for(let i=0;i<4;i++)x.fillRect(30,250+i*30,420-i*60,14);
    x.fillStyle='rgba(0,0,0,.08)';for(let y=0;y<400;y+=4)x.fillRect(0,y,512,2);if(gl){x.fillStyle='rgba(255,255,255,.35)';x.fillRect(0,(gl*400)%400,512,30)}});st.redraw(0);
  const sc=new THREE.Mesh(new THREE.PlaneGeometry(3,2.35),new THREE.MeshBasicMaterial({map:st.tx,toneMapped:false}));sc.position.z=.81;g.add(sc);
  const ft=new THREE.Mesh(new THREE.CylinderGeometry(.9,1.1,.3,32),M(0xd9d0b4,{roughness:.6}));ft.position.y=-1.75;g.add(ft);sh(g);
  add3('crt',g,(t)=>{const p=pop(t,ST('oldsite')+.1,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(-.05,.45+Math.sin(t*1.1)*.25,0);g.position.y=Math.sin(t*1.5)*.08;
    const on=t>T(14)?1:0;st.redraw(on,t<T(14)+.4?(t-T(14))*2:0)})}
// funnel + coins
{ const g=new THREE.Group();const pts=[];for(let i=0;i<=14;i++){const k=i/14;pts.push(new THREE.Vector2(.25+1.9*k*k,-1.6+k*2.6))}
  const fun=new THREE.Mesh(new THREE.LatheGeometry(pts,56),M(0x6a2cf5,{metalness:.5,roughness:.2,side:THREE.DoubleSide}));g.add(fun);
  const rim=new THREE.Mesh(new THREE.TorusGeometry(2.15,.08,12,72),M(0xc062e8,{metalness:.6}));rim.rotation.x=Math.PI/2;rim.position.y=1;g.add(rim);
  const coins=[];for(let i=0;i<7;i++){const c=new THREE.Mesh(new THREE.CylinderGeometry(.4,.4,.1,32),gold());g.add(c);coins.push(c)}sh(g);
  add3('funnel',g,(t)=>{const p=pop(t,ST('portal')+.1,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.35,t*.4,0);g.position.y=-.2+Math.sin(t*1.5)*.06;
    coins.forEach((c,i)=>{const d=((t-ST('portal'))*.9+i/7)%1;const a=i*2.4+d*9;const r=1.8*(1-d);c.position.set(Math.cos(a)*r,2.6-d*4,Math.sin(a)*r);c.rotation.set(1.2+d*3,a,0);c.scale.setScalar(1-d*.6)})})}
// bed
{ const g=new THREE.Group();const base=new THREE.Mesh(new RoundedBoxGeometry(3.8,.6,2.6,4,.12),M(0x8a4b1f,{roughness:.35}));base.position.y=-1;g.add(base);
  const head=new THREE.Mesh(new RoundedBoxGeometry(.3,1.8,2.6,4,.12),M(0x8a4b1f,{roughness:.35}));head.position.set(-1.9,-.4,0);g.add(head);
  const mat=new THREE.Mesh(new RoundedBoxGeometry(3.5,.45,2.4,4,.18),M(0xffffff,{roughness:.6,clearcoat:.2}));mat.position.y=-.5;g.add(mat);
  const bl=new THREE.Mesh(new RoundedBoxGeometry(2.2,.18,2.46,4,.08),M(0xff3d7f,{roughness:.5}));bl.position.set(.65,-.25,0);g.add(bl);
  [-.55,.55].forEach(z=>{const pl=new THREE.Mesh(new RoundedBoxGeometry(.8,.3,.95,4,.14),M(0xf4f6ff,{roughness:.6}));pl.position.set(-1.3,-.12,z);g.add(pl)});
  const coins=[];for(let i=0;i<5;i++){const c=new THREE.Mesh(new THREE.CylinderGeometry(.32,.32,.08,32),gold());g.add(c);coins.push(c)}sh(g);
  add3('bed',g,(t)=>{const p=pop(t,ST('math')+.1,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.3,-.6+Math.sin(t*1.1)*.25,0);g.position.y=Math.sin(t*1.5)*.08;
    coins.forEach((c,i)=>{const d=t-(T(40)+i*.12);c.visible=d>0&&d<1.6;const k=clamp(d/1.4);c.position.set(.5+i*.3-.6,.1+k*3.2,Math.sin(i*2)*.6);c.rotation.set(Math.PI/2,t*4+i,0);c.scale.setScalar(Math.max(.001,1-k*.7))})})}
// laptop with new site
{ const g=new THREE.Group();const base=new THREE.Mesh(new RoundedBoxGeometry(4,.18,2.7,4,.08),M(0xc9ced9,{metalness:.8,roughness:.25}));base.position.y=-1.3;g.add(base);
  const kb=new THREE.Mesh(new THREE.PlaneGeometry(3.4,1.4),M(0x2a2e40,{roughness:.6}));kb.rotation.x=-Math.PI/2;kb.position.set(0,-1.2,-.2);g.add(kb);
  const lid=new THREE.Group();lid.position.set(0,-1.25,-1.3);g.add(lid);
  const sh_=new THREE.Mesh(new RoundedBoxGeometry(4,2.7,.12,4,.08),M(0xc9ced9,{metalness:.8,roughness:.25}));sh_.position.y=1.35;lid.add(sh_);
  const st=texCanvas(640,420,(x)=>{const gr=x.createLinearGradient(0,0,640,260);gr.addColorStop(0,'#ffb86b');gr.addColorStop(1,'#ff5e7e');x.fillStyle=gr;x.fillRect(0,0,640,260);
    x.fillStyle='#2d6a4f';x.beginPath();x.moveTo(0,260);x.quadraticCurveTo(200,170,380,230);x.quadraticCurveTo(520,180,640,220);x.lineTo(640,260);x.fill();
    x.fillStyle='#fff4e0';x.fillRect(250,150,140,90);x.fillStyle='#ff5e3a';x.beginPath();x.moveTo(235,152);x.lineTo(320,95);x.lineTo(405,152);x.fill();
    x.fillStyle='#fff';x.font='900 40px Inter';x.fillText('Villa Rossi B&B',24,60);x.font='600 22px Inter';x.fillText('Vista mare · colazione inclusa',24,92);
    x.fillStyle='#fff';x.fillRect(0,260,640,160);x.fillStyle='#10131f';x.font='800 24px Inter';x.fillText('Check-in   12 nov',30,312);x.fillText('Check-out  14 nov',30,352);
    x.fillStyle='#19c37d';x.beginPath();x.roundRect(380,290,230,76,38);x.fill();x.fillStyle='#fff';x.font='900 30px Inter';x.fillText('Prenota ora',408,338)});st.redraw();
  const scr=new THREE.Mesh(new THREE.PlaneGeometry(3.7,2.42),new THREE.MeshBasicMaterial({map:st.tx,toneMapped:false}));scr.position.set(0,1.35,.065);lid.add(scr);sh(g);
  add3('laptop',g,(t)=>{const p=pop(t,ST('site')+.1,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.2,-.35+Math.sin(t*1.1)*.3,0);g.position.y=.2+Math.sin(t*1.5)*.08;
    lid.rotation.x=lerp(1.5,-.25,eOut(prog(t,ST('site')+.15,.6)))})}
// room key
{ const g=new THREE.Group();const ring=new THREE.Mesh(new THREE.TorusGeometry(.5,.1,16,40),gold());ring.position.y=1.9;g.add(ring);
  const k=new THREE.Group();const head=new THREE.Mesh(new THREE.TorusGeometry(.45,.16,16,40),gold());k.add(head);
  const sh2=new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,2,16),gold());sh2.position.y=-1.4;k.add(sh2);
  [[-2.1,.3],[-2.3,.2]].forEach(([y,w])=>{const b=new THREE.Mesh(new RoundedBoxGeometry(w+.15,.18,.14,2,.04),gold());b.position.set(w/2+.08,y,0);k.add(b)});k.position.set(-.9,1.35,0);k.rotation.z=.25;g.add(k);
  const st=texCanvas(320,420,(x)=>{x.fillStyle='#ff3d7f';x.beginPath();x.roundRect(0,0,320,420,40);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(160,60,24,0,7);x.fill();
    x.font='800 44px Inter';x.textAlign='center';x.fillText('CAMERA',160,190);x.font='900 170px Inter';x.fillText('7',160,360)});st.redraw();
  const tag=new THREE.Mesh(new RoundedBoxGeometry(1.6,2.1,.12,3,.05),M(0xff3d7f));tag.position.set(.7,.4,0);g.add(tag);
  const face=new THREE.Mesh(new THREE.PlaneGeometry(1.5,1.97),new THREE.MeshBasicMaterial({map:st.tx,toneMapped:false}));face.position.set(.7,.4,.065);g.add(face);sh(g);
  add3('key',g,(t)=>{const p=pop(t,ST('direct')+.1,.45);g.scale.setScalar(.9*Math.max(.001,p.s));g.rotation.set(0,Math.sin(t*1.3)*.5,Math.sin(t*2.2)*.12);g.position.y=Math.sin(t*1.5)*.08})}
// hex tiles
{ const g=new THREE.Group();const tiles=[];const cols=['#ff3d7f','#ffc53d','#2ee59d','#a36bff'];
  ['SITI','GEST.','APP','AI'].forEach((s,i)=>{const t=new THREE.Group();const h=new THREE.Mesh(new THREE.CylinderGeometry(1.05,1.05,.4,6),M(new THREE.Color(cols[i])));h.rotation.x=Math.PI/2;h.rotation.y=Math.PI/6;t.add(h);
    const st=texCanvas(256,256,(x)=>{x.clearRect(0,0,256,256);x.fillStyle='#10131f';x.font='900 '+(s.length>3?66:86)+'px Inter';x.textAlign='center';x.fillText(s,128,158)});st.redraw();
    const lb=new THREE.Mesh(new THREE.PlaneGeometry(1.6,1.6),new THREE.MeshBasicMaterial({map:st.tx,transparent:true,toneMapped:false}));lb.position.z=.21;t.add(lb);
    const pos=[[-1,1],[1,1],[-1,-.75],[1,-.75]][i];t.position.set(pos[0]*1.05,pos[1]*.95+.1,0);g.add(t);tiles.push(t)});sh(g);
  add3('hex',g,(t)=>{g.rotation.set(-.1,Math.sin(t*1.1)*.45,0);g.position.y=Math.sin(t*1.5)*.08;
    tiles.forEach((m,i)=>{const q=pop(t,T([71,72,73,74][i])-.03,.35);m.visible=q.p>0;m.scale.setScalar(Math.max(.001,q.s));m.position.z=Math.sin(t*2+i)*.15})})}
// moon
{ const g=new THREE.Group();const moon=new THREE.Mesh(new THREE.SphereGeometry(1.5,64,32),M(0xffe08a,{emissive:0xffc53d,emissiveIntensity:.35,roughness:.5}));g.add(moon);
  const cut=new THREE.Mesh(new THREE.SphereGeometry(1.45,64,32),M(0x141a44,{roughness:.8,clearcoat:0}));cut.position.set(.75,.35,.6);g.add(cut);
  const st=[];for(let i=0;i<9;i++){const s=new THREE.Mesh(new THREE.ExtrudeGeometry(starShape(.18,.08),{depth:.05,bevelEnabled:false}),M(0xffffff,{emissive:0xffffff,emissiveIntensity:.6}));g.add(s);st.push(s)}
  add3('moon',g,(t)=>{const p=pop(t,ST('payoff')+.1,.45);const out=clamp((t-T(87)+.15)/.2);g.scale.setScalar(.95*Math.max(.001,p.s*(1-out)));g.rotation.set(0,Math.sin(t*.8)*.3,Math.sin(t)*.05);g.position.y=Math.sin(t*1.5)*.08;
    st.forEach((s,i)=>{s.position.set(Math.cos(i*2.1)*2.5,Math.sin(i*1.3)*2,-.5);s.rotation.z=t+i;s.scale.setScalar(.6+.4*Math.abs(Math.sin(t*3+i)))})})}
const BOX={house:[540,950,700],crt:[540,930,660],funnel:[540,940,660],bed:[540,920,700],laptop:[540,930,760],key:[540,930,780],hex:[540,960,720],moon:[540,980,680]};
const SCN={
 stars(t){render3D('house',t,BOX.house);const c=pop(t,T(7)-.08,.35);withT(540,1480,c.s,c.a,()=>{card(190,1360,700,240);
   const n=Math.round(200*eOut(prog(t,T(7),.5)));txt(String(n),300,1470,{size:96,w:900,al:'center',ls:-3});txt('recensioni',300,1530,{size:30,w:700,c:'#6b7185',al:'center'});
   for(let i=0;i<5;i++){const q=pop(t,T(10)+i*.07,.3);withT(500+i*78,1460,q.s,q.a,()=>star2(500+i*78,1460,32,'#ffc53d'))}txt('5,0 su 5',655,1540,{size:30,w:800,c:'#10131f',al:'center'})})},
 oldsite(t){render3D('crt',t,BOX.crt);stampTxt('2015',540,1440,t,T(20),'#ff2e4d',-.1,90);
   const q=pop(t,T(21)-.03,.3);withT(540,1600,q.s,q.a,()=>pill('Complimenti...',540,1600,{size:40,bg:'#fff',c:'#10131f'}))},
 portal(t){render3D('funnel',t,BOX.funnel);const q=pop(t,T(26)-.05,.3);withT(540,690,q.s,q.a,()=>pill('Portale di prenotazione',540,690,{size:38,bg:'#fff',c:'#6a2cf5'}));
   stampTxt('−18%',540,1470,t,T(33),'#FFD60A',-.06,110)},
 math(t){render3D('bed',t,BOX.bed);const c=pop(t,T(36)-.1,.35);withT(540,1440,c.s,c.a,()=>{card(130,1270,820,340);
   txt('Camera, 1 notte',180,1355,{size:42,w:700,c:'#6b7185'});txt(fmt(100*eOut(prog(t,T(38),.4)))+' €',900,1355,{size:50,w:900,al:'right'});
   const r=pop(t,T(40)-.05,.3);withT(540,1460,r.s,r.a,()=>{txt('Al portale',180,1475,{size:42,w:700,c:'#6b7185'});txt('−18 €',900,1475,{size:50,w:900,c:'#ff2e4d',al:'right'})});
   if(t>=T(45)-.05)stampTxt('OGNI NOTTE',540,1575,t,T(45),'#ff2e4d',-.04,38)})},
 site(t){render3D('laptop',t,BOX.laptop);const c=pop(t,T(49)-.1,.35);withT(540,1460,c.s,c.a,()=>{card(170,1300,740,320);
   [['Sito veloce',T(50)],['Foto vere',T(52)],['Prenotazione diretta',T(55)]].forEach(([s,tt],i)=>{const y=1380+i*90;const r=prog(t,tt-.05,.2);check(230,y-14,28,prog(t,tt,.35));ctx.globalAlpha*=r;txt(s,285,y,{size:42,w:800});ctx.globalAlpha=c.a})})},
 direct(t){render3D('key',t,BOX.key);const c=pop(t,T(60)-.1,.35);withT(540,1460,c.s,c.a,()=>{card(150,1300,780,300);avatar(240,1390,48,'MR','#2d5bff','#13b4ff');
   txt('Mario Rossi',310,1380,{size:38,w:800});txt('2 notti · prenotato dal sito',310,1422,{size:28,w:600,c:'#6b7185'});
   txt('Commissione',200,1530,{size:36,w:700,c:'#6b7185'});txt('0 €',880,1530,{size:48,w:900,c:'#19c37d',al:'right'})});
   stampTxt('PAGA TE',540,690,t,T(65),'#FFD60A',-.06,56)},
 all(t){render3D('hex',t,BOX.hex);const z=pop(t,T(76)-.05,.35);withT(540,1560,z.s,z.a,()=>pill('Qualsiasi cosa',540,1560,{size:48,bg:'#2EE59D',c:'#10131f'}))},
 payoff(t){render3D('moon',t,BOX.moon);if(t>=T(87)-.05)drawLogo(t,T(87)-.05,540,1060,700)},
};
