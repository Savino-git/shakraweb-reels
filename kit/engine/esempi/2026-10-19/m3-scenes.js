
const ST=n=>SC.find(s=>s.name===n).t0;
const SP={intro:['teal','blue','violet'],inbox:['grey','navy','grey','red','grey','navy'],hours:['red','orange','red','pink','red'],config:['blue','violet','pink','orange','green','blue'],
 preview:['teal','mint','teal'],price:['orange','pink'],order:['green','teal','violet','red','orange'],payoff:['night','navy','navy2'],cta:['blue','violet','green','navy']};
function shirtGeo(){const s=new THREE.Shape();s.moveTo(-.5,1.5);s.quadraticCurveTo(0,1.05,.5,1.5);s.lineTo(1.3,1.25);s.lineTo(1.95,.45);s.lineTo(1.35,.08);s.lineTo(1.1,.4);s.lineTo(1.1,-1.6);
  s.lineTo(-1.1,-1.6);s.lineTo(-1.1,.4);s.lineTo(-1.35,.08);s.lineTo(-1.95,.45);s.lineTo(-1.3,1.25);s.closePath();
  const g=new THREE.ExtrudeGeometry(s,{depth:.28,bevelEnabled:true,bevelSize:.07,bevelThickness:.07,bevelSegments:3,curveSegments:16});g.center();return g}
const logoTex=texCanvas(256,256,(x)=>{x.clearRect(0,0,256,256);x.fillStyle='#10131f';x.beginPath();x.arc(128,110,80,0,7);x.fill();x.fillStyle='#FFD60A';x.font='900 100px Inter';x.textAlign='center';x.fillText('R',128,145);
  x.fillStyle='#10131f';x.font='900 40px Inter';x.fillText('ROSSI',128,236)});logoTex.redraw();
function mug(col){const g=new THREE.Group();const b=new THREE.Mesh(new THREE.CylinderGeometry(.75,.7,1.6,48,1,true),M(col,{side:THREE.DoubleSide}));g.add(b);
  const bt=new THREE.Mesh(new THREE.CylinderGeometry(.7,.7,.05,48),M(col));bt.position.y=-.8;g.add(bt);const h=new THREE.Mesh(new THREE.TorusGeometry(.4,.1,12,32,Math.PI*1.2),M(col));h.position.x=.8;h.rotation.z=-Math.PI*.6;g.add(h);return g}
function cap(col){const g=new THREE.Group();const d=new THREE.Mesh(new THREE.SphereGeometry(.9,40,20,0,Math.PI*2,0,Math.PI/2),M(col));g.add(d);
  const br=new THREE.Mesh(new THREE.CylinderGeometry(.75,.75,.06,40,1,false,0,Math.PI),M(col));br.position.set(0,0,.55);br.scale.set(1.1,1,1);br.rotation.y=-Math.PI/2;g.add(br);
  const bt=new THREE.Mesh(new THREE.SphereGeometry(.1,12,8),M(col));bt.position.y=.9;g.add(bt);return g}
// intro trio
{ const g=new THREE.Group();const sh1=new THREE.Mesh(shirtGeo(),M(0xffffff,{roughness:.5,clearcoat:.3}));g.add(sh1);
  const lg=new THREE.Mesh(new THREE.PlaneGeometry(.9,.9),new THREE.MeshBasicMaterial({map:logoTex.tx,transparent:true}));lg.position.set(0,.45,.22);sh1.add(lg);
  const m=mug(0xff3d7f);m.position.set(-2.2,-1,.6);m.scale.setScalar(.8);g.add(m);const c=cap(0x2d5bff);c.position.set(2.2,-1.2,.6);c.scale.setScalar(.8);g.add(c);sh(g);
  add3('trio',g,(t)=>{const p=pop(t,0,.4);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.05,Math.sin(t*1.1)*.4,0);g.position.y=.2+Math.sin(t*1.5)*.08;
    const q=pop(t,T(7)-.05,.35);[m,c].forEach(o=>{o.visible=q.p>0;o.scale.setScalar(.8*Math.max(.001,q.s))});m.rotation.y=t;c.rotation.y=-t})}
// envelopes
{ const g=new THREE.Group();const envs=[];for(let i=0;i<6;i++){const e=new THREE.Group();const b=new THREE.Mesh(new RoundedBoxGeometry(2.6,1.7,.12,3,.06),M(0xffffff,{roughness:.4}));e.add(b);
    const fl=new THREE.Mesh(new THREE.CylinderGeometry(1.3,1.3,.02,3),M(0xdfe6ff,{roughness:.4}));fl.rotation.set(Math.PI/2,0,Math.PI);fl.scale.set(1,1,.62);fl.position.set(0,.35,.07);e.add(fl);
    const st=new THREE.Mesh(new RoundedBoxGeometry(.35,.42,.03,2,.02),M(0xff2e4d));st.position.set(.95,.5,.08);e.add(st);g.add(e);envs.push(e)}sh(g);
  add3('env',g,(t)=>{const p=pop(t,ST('inbox')+.1,.45);g.scale.setScalar(.9*Math.max(.001,p.s));g.rotation.set(-.1,Math.sin(t*1.1)*.4,0);g.position.y=Math.sin(t*1.5)*.08;
    envs.forEach((e,i)=>{const q=prog(t,ST('inbox')+.15+i*.12,.35);e.visible=q>0;e.position.set(Math.sin(i*1.7)*.5,lerp(4,-1.2+i*.32,eOut(q)),-i*.05);e.rotation.z=Math.sin(i*2.3)*.25})})}
// hourglass
{ const g=new THREE.Group();const pts=[];for(let i=0;i<=20;i++){const k=i/20;pts.push(new THREE.Vector2(.12+1*Math.pow(Math.abs(k-.5)*2,1.3),-1.5+k*3))}
  const gl=new THREE.Mesh(new THREE.LatheGeometry(pts,48),new THREE.MeshPhysicalMaterial({color:0xffffff,roughness:.05,transparent:true,opacity:.3,clearcoat:1,side:THREE.DoubleSide}));g.add(gl);
  [1.65,-1.65].forEach(y=>{const c=new THREE.Mesh(new THREE.CylinderGeometry(1.35,1.35,.25,48),M(0x8a4b1f,{roughness:.35}));c.position.y=y;g.add(c)});
  [[1,1],[-1,1],[1,-1],[-1,-1]].forEach(([x,z])=>{const r=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,3.3,12),M(0x8a4b1f));r.position.set(x*1.05,0,z*.6);g.add(r)});
  const top=new THREE.Mesh(new THREE.ConeGeometry(.9,1,40),M(0xffc53d,{roughness:.8,clearcoat:0}));top.rotation.x=Math.PI;g.add(top);
  const bot=new THREE.Mesh(new THREE.ConeGeometry(1,1,40),M(0xffc53d,{roughness:.8,clearcoat:0}));g.add(bot);
  const stream=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,1.4,8),M(0xffc53d));g.add(stream);sh(g);
  add3('hour',g,(t)=>{const p=pop(t,ST('hours')+.1,.45);g.scale.setScalar(.8*Math.max(.001,p.s));g.rotation.set(.1,t*.5,Math.sin(t)*.05);g.position.y=Math.sin(t*1.5)*.08;
    const k=clamp((t-ST('hours'))/3);top.scale.setScalar(Math.max(.05,1-k*.8));top.position.y=.05+.5*(1-k*.8);bot.scale.setScalar(.2+k*.8);bot.position.y=-1.5+.5*(.2+k*.8);stream.position.y=-.6})}
// big shirt configurator
const COLS=[0xffffff,0xff3d7f,0x2d5bff,0x19c37d,0x10131f];
{ const g=new THREE.Group();const mat=M(0xffffff,{roughness:.5,clearcoat:.3});const s=new THREE.Mesh(shirtGeo(),mat);g.add(s);
  const lg=new THREE.Mesh(new THREE.PlaneGeometry(1.1,1.1),new THREE.MeshBasicMaterial({map:logoTex.tx,transparent:true}));lg.position.set(0,.4,.22);s.add(lg);
  const c=new THREE.Color();sh(g);
  add3('shirt',g,(t)=>{const p=pop(t,ST('config')+.1,.45);g.scale.setScalar(1.05*Math.max(.001,p.s));g.rotation.set(0,Math.sin(t*1.3)*.5,0);g.position.y=.1+Math.sin(t*1.5)*.08;
    const q=pop(t,T(45)-.05,.35);lg.visible=q.p>0;lg.scale.setScalar(Math.max(.001,q.s*(q.p<1?1.5-q.p*.5:1)));
    let ci=0;if(t>T(47))ci=1+Math.floor((t-T(47))/.35)%4;if(t>T(48)+.2)ci=2;c.set(COLS[ci]);mat.color.copy(c);
    const sz=t>T(48)?1+.12*Math.sin(clamp((t-T(48))/.5)*Math.PI*2):1;s.scale.setScalar(sz)})}
// tablet preview
{ const g=new THREE.Group();const body=new THREE.Mesh(new RoundedBoxGeometry(4.2,3,.2,5,.25),M(0x10131f,{metalness:.7,roughness:.25}));g.add(body);
  const st=texCanvas(640,440,(x,k=0)=>{x.fillStyle='#f4f6ff';x.fillRect(0,0,640,440);x.fillStyle='#2d5bff';x.beginPath();
    x.moveTo(170,90);x.quadraticCurveTo(230,130,290,90);x.lineTo(340,110);x.lineTo(380,170);x.lineTo(345,195);x.lineTo(325,175);x.lineTo(325,360);x.lineTo(135,360);x.lineTo(135,175);x.lineTo(115,195);x.lineTo(80,170);x.lineTo(120,110);x.closePath();x.fill();
    x.drawImage(logoTex.c,195,160,70,70);x.fillStyle='#10131f';x.font='800 26px Inter';x.fillText('Colore',420,110);
    ['#ffffff','#ff3d7f','#2d5bff','#19c37d'].forEach((c,i)=>{x.fillStyle=c;x.beginPath();x.arc(440+i*46,140,17,0,7);x.fill();if(i===2){x.strokeStyle='#10131f';x.lineWidth=4;x.stroke()}});
    x.fillStyle='#10131f';x.fillText('Taglia  L',420,210);x.fillText('Quantità  50',420,260);
    x.fillStyle='#19c37d';x.beginPath();x.roundRect(410,320,200,70,35);x.fill();x.fillStyle='#fff';x.font='900 30px Inter';x.fillText('Paga',470,366);
    if(k>0){x.fillStyle=`rgba(45,91,255,${.25*k})`;x.fillRect(0,(1-k)*440,640,8)}});st.redraw(0);
  const scr=new THREE.Mesh(new THREE.PlaneGeometry(3.9,2.7),new THREE.MeshBasicMaterial({map:st.tx,toneMapped:false}));scr.position.z=.11;g.add(scr);sh(g);
  add3('tablet',g,(t)=>{const p=pop(t,ST('preview')+.1,.45);g.scale.setScalar(.9*Math.max(.001,p.s));g.rotation.set(-.25,-.35+Math.sin(t*1.1)*.25,.05);g.position.y=Math.sin(t*1.5)*.08;
    st.redraw(t>T(52)&&t<T(52)+1?((t-T(52))%1):0)})}
// price tag
{ const g=new THREE.Group();const s=new THREE.Shape();s.moveTo(-1.6,1);s.lineTo(1,1);s.lineTo(1.8,0);s.lineTo(1,-1);s.lineTo(-1.6,-1);s.closePath();const h=new THREE.Path();h.absarc(1.05,0,.18,0,7,true);s.holes.push(h);
  const geo=new THREE.ExtrudeGeometry(s,{depth:.15,bevelEnabled:true,bevelSize:.05,bevelThickness:.05,bevelSegments:2});geo.center();const tag=new THREE.Mesh(geo,M(0xffd60a));g.add(tag);
  const st=texCanvas(512,320,(x,v='0')=>{x.clearRect(0,0,512,320);x.fillStyle='#10131f';x.font='900 150px Inter';x.textAlign='center';x.fillText(v+'€',256,210)});st.redraw('0');
  const lb=new THREE.Mesh(new THREE.PlaneGeometry(2.4,1.5),new THREE.MeshBasicMaterial({map:st.tx,transparent:true,toneMapped:false}));lb.position.set(-.35,0,.16);g.add(lb);
  const str=new THREE.Mesh(new THREE.TorusGeometry(.6,.03,8,40,Math.PI),M(0xffffff));str.position.set(1.65,.35,0);str.rotation.z=-1;g.add(str);sh(g);
  add3('tag',g,(t)=>{const p=pop(t,ST('price')+.1,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.1,Math.sin(t*1.2)*.4,Math.sin(t*2)*.08);g.position.y=Math.sin(t*1.5)*.08;
    st.redraw(String(Math.round(445*eOut(prog(t,T(59),.9)))))})}
// shipping box
{ const g=new THREE.Group();const b=new THREE.Mesh(new RoundedBoxGeometry(3,2,2.2,3,.06),M(0xc8915a,{roughness:.7,clearcoat:.1}));b.position.y=-.6;g.add(b);
  const tape=new THREE.Mesh(new THREE.BoxGeometry(.5,.02,2.24),M(0xa06a35,{roughness:.6}));tape.position.y=.41;g.add(tape);
  const fl1=new THREE.Group(),fl2=new THREE.Group();[fl1,fl2].forEach((f,i)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(1.5,.05,2.2),M(0xc8915a,{roughness:.7,clearcoat:.1}));m.position.x=i?-.75:.75;f.add(m);f.position.set(i?1.5:-1.5,.4,0);g.add(f)});
  const shirts=[];COLS.slice(1,4).forEach((c,i)=>{const s=new THREE.Mesh(shirtGeo(),M(c,{roughness:.5}));s.scale.setScalar(.35);g.add(s);shirts.push(s)});
  const lab=new THREE.Mesh(new THREE.PlaneGeometry(1.1,.7),new THREE.MeshBasicMaterial({map:logoTex.tx,transparent:true}));lab.position.set(0,-.5,1.11);g.add(lab);sh(g);
  add3('box',g,(t)=>{const p=pop(t,ST('order')+.1,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.35,-.5+Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.08;
    const o=eBack(prog(t,T(65),.5));fl1.rotation.z=-o*2.2;fl2.rotation.z=o*2.2;tape.visible=o<.1;
    shirts.forEach((s,i)=>{const q=prog(t,T(66)+i*.12,.5);s.visible=q>0;s.position.set(-.7+i*.7,lerp(.2,1.4+Math.sin(t*2+i)*.1,eBack(q)),0);s.rotation.y=t+i})})}
// night printer
{ const g=new THREE.Group();const body=new THREE.Mesh(new RoundedBoxGeometry(3.6,1.8,2.4,4,.2),M(0x2a2e40,{roughness:.3}));g.add(body);
  const top=new THREE.Mesh(new RoundedBoxGeometry(3.2,.2,2,3,.08),M(0x3a3f52,{roughness:.3}));top.position.y=.95;g.add(top);
  const led=new THREE.Mesh(new THREE.BoxGeometry(1.2,.1,.05),new THREE.MeshBasicMaterial({color:0x2ee59d}));led.position.set(.9,.5,1.21);g.add(led);
  const sheets=[];for(let i=0;i<4;i++){const s=new THREE.Mesh(new THREE.BoxGeometry(2.2,.02,1.5),M(COLS[1+i%3],{roughness:.6}));g.add(s);sheets.push(s)}
  const moon=new THREE.Mesh(new THREE.SphereGeometry(.5,32,16),M(0xffe08a,{emissive:0xffc53d,emissiveIntensity:.5}));moon.position.set(-1.8,2.1,-.5);g.add(moon);sh(g);
  add3('printer',g,(t)=>{const p=pop(t,ST('payoff')+.1,.45);const out=clamp((t-T(87)+.15)/.2);g.scale.setScalar(.85*Math.max(.001,p.s*(1-out)));g.rotation.set(.3,-.5+Math.sin(t*1.1)*.3,0);g.position.y=-.3+Math.sin(t*1.5)*.08;
    led.visible=Math.floor(t*4)%2===0;sheets.forEach((s,i)=>{const d=((t*.7+i/4)%1);s.position.set(0,-.2-i*.0,1.2+d*1.6);s.position.y=-.3+d*.0-i*.03;s.rotation.x=d*.3})})}
const BOX={trio:[540,960,780],env:[540,940,660],hour:[540,930,640],shirt:[540,960,780],tablet:[540,950,780],tag:[540,930,700],box:[540,920,700],printer:[540,960,720]};
const SCN={
 intro(t){render3D('trio',t,BOX.trio);const q=pop(t,T(7)-.05,.3);withT(540,1480,q.s,q.a,()=>pill('Magliette · tazze · cappellini',540,1480,{size:40,bg:'#fff',c:'#10131f'}))},
 inbox(t){render3D('env',t,BOX.env);const q=pop(t,T(9)-.05,.3);withT(540,690,q.s,q.a,()=>pill('20 preventivi al giorno',540,690,{size:40,bg:'#10131f',c:'#FFD60A'}));
   const c=pop(t,T(18)-.1,.3);withT(540,1460,c.s,c.a,()=>{card(150,1270,780,380);[['Email',T(18)],['Bozza grafica',T(19)],['Correzioni',T(21)],['Altra email',T(22)]].forEach(([s,tt],i)=>{const y=1345+i*82;const r=prog(t,tt-.03,.2);if(r<=0)return;
     ctx.globalAlpha*=r;ctx.beginPath();ctx.arc(215,y-14,24,0,7);ctx.fillStyle=i===3?'#ff2e4d':'#ff9f43';ctx.fill();txt('↻',215,y-2,{size:32,w:900,c:'#fff',al:'center'});txt(s,260,y,{size:40,w:800});ctx.globalAlpha=c.a})})},
 hours(t){render3D('hour',t,BOX.hour);const c=pop(t,T(24)-.1,.35);withT(540,1440,c.s,c.a,()=>{card(130,1270,820,340);
   txt('30 min × 20',180,1355,{size:42,w:700,c:'#6b7185'});txt('= '+Math.round(10*eOut(prog(t,T(27),.5)))+' ore',900,1355,{size:46,w:900,al:'right'});
   const r=pop(t,T(29)-.05,.3);withT(540,1450,r.s,r.a,()=>{txt('ogni giorno',180,1475,{size:42,w:700,c:'#6b7185'});txt('solo email',900,1475,{size:42,w:900,c:'#ff2e4d',al:'right'})});
   if(t>=T(31)-.05)stampTxt('SOLO PER RISPONDERE',540,1570,t,T(32),'#ff2e4d',-.04,30)})},
 config(t){render3D('shirt',t,BOX.shirt);const q=pop(t,T(36)-.05,.3);withT(540,690,q.s,q.a,()=>pill('Personalizzatore',540,690,{size:40,bg:'#FFD60A',c:'#10131f'}));
   const c=pop(t,T(42)-.1,.35);withT(540,1480,c.s,c.a,()=>{card(130,1380,820,200);
     [['Logo','✓',T(45)],['Colore','●',T(47)],['Taglia','L',T(48)],['Q.tà','50',T(50)]].forEach(([a,b,tt],i)=>{const x=232+i*205;const r=pop(t,tt,.3);ctx.globalAlpha*=clamp(.35+r.p*2);
       txt(a,x,1450,{size:30,w:700,c:'#6b7185',al:'center'});withT(x,1515,Math.max(.6,r.s),1,()=>txt(b,x,1535,{size:52,w:900,c:i===1?'#2d5bff':'#10131f',al:'center'}));ctx.globalAlpha=c.a})})},
 preview(t){render3D('tablet',t,BOX.tablet);const q=pop(t,T(53)-.05,.3);withT(540,1460,q.s,q.a,()=>pill('Anteprima in tempo reale',540,1460,{size:42,bg:'#fff',c:'#008f9e'}));
   const p2=pop(t,T(57)-.03,.3);withT(540,1570,p2.s,p2.a,()=>pill('Pagato ✓',540,1570,{size:44,bg:'#19c37d',c:'#fff'}))},
 price(t){render3D('tag',t,BOX.tag);const c=pop(t,T(59)-.1,.35);withT(540,1470,c.s,c.a,()=>{card(150,1340,780,250);txt('50 × 8,90 €',200,1430,{size:44,w:700,c:'#6b7185'});
   txt('445 €',880,1430,{size:52,w:900,al:'right'});const a=pop(t,T(61),.3);withT(540,1530,a.s,a.a,()=>pill('Calcolato in automatico',540,1525,{size:32,bg:'#19c37d',c:'#fff',pad:22}))})},
 order(t){render3D('box',t,BOX.box);const c=pop(t,T(65)-.1,.35);withT(540,1440,c.s,c.a,()=>{card(150,1290,780,220);txt('Ordine #1207 · Rossi Srl',200,1360,{size:34,w:800});
   const f=pop(t,T(70)-.05,.3);withT(540,1440,f.s,f.a,()=>{rr(200,1405,680,70,20);ctx.fillStyle='#eef0f6';ctx.fill();txt('PDF',250,1452,{size:28,w:900,c:'#ff2e4d',al:'center'});txt('file_stampa_logo.pdf',310,1452,{size:32,w:700})})});
   stampTxt('ZERO BOZZE',540,1620,t,T(73),'#FFD60A',-.06,60)},
 payoff(t){render3D('printer',t,BOX.printer);if(t>=T(87)-.05)drawLogo(t,T(87)-.05,540,1060,700)},
};
