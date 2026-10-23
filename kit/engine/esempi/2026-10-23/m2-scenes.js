const ST=n=>SC.find(s=>s.name===n).t0;
const SP={intro:['pink','orange','pink'],s1:['green','teal','green','mint'],s2:['blue','violet','blue','navy2'],s3:['red','grey','red','orange'],
 shop:['violet','pink','blue','violet','teal'],payoff:['night','navy','navy2'],cta:['orange','violet','green','navy']};
function labelTex(s,w=256,h=256,col='#fff',size=150,bg=null){const st=texCanvas(w,h,(x)=>{x.clearRect(0,0,w,h);if(bg){x.fillStyle=bg;x.fillRect(0,0,w,h)}x.fillStyle=col;x.font='900 '+size+'px Inter';x.textAlign='center';x.fillText(s,w/2,h*.7)});st.redraw();return st}
function plane(st,w,h){return new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:st.tx,transparent:true,toneMapped:false}))}
// storefront with striped awning + badge 3
{ const g=new THREE.Group();const wall=new THREE.Mesh(new RoundedBoxGeometry(4,3,1.4,4,.12),M(0xfff4e0,{roughness:.5}));g.add(wall);
  const win=new THREE.Mesh(new RoundedBoxGeometry(2.1,1.5,.1,3,.06),M(0x1a2a4a,{roughness:.1,metalness:.3}));win.position.set(-.7,-.35,.72);g.add(win);
  const door=new THREE.Mesh(new RoundedBoxGeometry(.9,2,.1,3,.06),M(0x7a3d1a,{roughness:.4}));door.position.set(1.25,-.5,.72);g.add(door);
  const kn=new THREE.Mesh(new THREE.SphereGeometry(.07,12,10),gold());kn.position.set(1.0,-.5,.8);g.add(kn);
  for(let i=0;i<8;i++){const s=new THREE.Mesh(new RoundedBoxGeometry(.52,.12,1.1,2,.04),M(i%2?0xffffff:0xff2e4d,{roughness:.4}));s.position.set(-1.82+i*.52,1.05,1.1);s.rotation.x=.45;g.add(s)}
  const sign=plane(labelTex('GASTRONOMIA',768,128,'#7a3d1a',84,'#ffe8b0'),3.2,.53);sign.position.set(0,1.75,.72);g.add(sign);
  const roof=new THREE.Mesh(new RoundedBoxGeometry(4.3,.25,1.6,3,.08),M(0x7a3d1a,{roughness:.4}));roof.position.y=2.15;g.add(roof);
  const items=[];[[-1.3,0xffc53d],[-.75,0xff9f43],[-.2,0xc0392b]].forEach(([x,c],i)=>{const m=new THREE.Mesh(i===2?new THREE.CapsuleGeometry(.14,.5,6,16):new THREE.CylinderGeometry(.22,.22,.3,24),M(c,{roughness:.5}));m.position.set(x,-.7,.8);if(i===2)m.rotation.z=Math.PI/2;g.add(m);items.push(m)});
  const b=new THREE.Group();const bd=new THREE.Mesh(new THREE.CylinderGeometry(.75,.75,.25,48),M(0xffd60a));bd.rotation.x=Math.PI/2;b.add(bd);const bl=plane(labelTex('3',256,256,'#10131f',200),1.2,1.2);bl.position.z=.14;b.add(bl);b.position.set(1.9,2.4,.9);g.add(b);sh(g);
  add3('store',g,(t)=>{const p=pop(t,.05,.45);g.scale.setScalar(.78*Math.max(.001,p.s));g.rotation.set(.12,-.4+Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.06;
    const q=pop(t,.15,.35);b.scale.setScalar(Math.max(.001,q.s)*(1+.08*Math.exp(-((t%BEAT)/BEAT)*5)));b.rotation.y=Math.sin(t*2)*.4})}
// notepad + pencil
{ const g=new THREE.Group();const st=texCanvas(512,640,(x,k=0)=>{x.fillStyle='#fff7b0';x.fillRect(0,0,512,640);x.strokeStyle='#c9d6f0';x.lineWidth=3;for(let r=0;r<12;r++){x.beginPath();x.moveTo(0,80+r*48);x.lineTo(512,80+r*48);x.stroke()}
    x.strokeStyle='#ff8a8a';x.beginPath();x.moveTo(70,0);x.lineTo(70,640);x.stroke();x.fillStyle='#1d2a6e';x.font='italic 700 38px Inter';
    const L=['Sig.ra Bianchi 2 etti','crudo  ritira 18?','Verdi: lasagna x4','mozz. -> chi??','Rossi: ...'];for(let i=0;i<Math.min(k,5);i++){x.save();x.translate(90,120+i*96);x.rotate((hash(i)-.5)*.06);x.fillText(L[i],0,0);x.restore()}
    if(k>=5){x.strokeStyle='#ff2e4d';x.lineWidth=6;x.beginPath();x.moveTo(100,330);x.bezierCurveTo(300,250,350,420,460,360);x.stroke()}});st.redraw(0);
  const pad=new THREE.Mesh(new RoundedBoxGeometry(2.6,3.2,.16,3,.05),M(0xfff7b0,{roughness:.6,clearcoat:.2}));g.add(pad);const pp=plane(st,2.5,3.1);pp.position.z=.085;g.add(pp);
  for(let i=0;i<7;i++){const r=new THREE.Mesh(new THREE.TorusGeometry(.12,.035,8,20),M(0xc9ced9,{metalness:1}));r.position.set(-1.05+i*.35,1.6,.05);r.rotation.y=Math.PI/2;g.add(r)}
  const pen=new THREE.Group();const pb=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,2.6,6),M(0xffc53d,{roughness:.35}));pen.add(pb);const tip=new THREE.Mesh(new THREE.ConeGeometry(.13,.4,6),M(0xf1d3a5,{roughness:.6}));tip.position.y=-1.5;tip.rotation.x=Math.PI;pen.add(tip);
  const er=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.3,16),M(0xff8fab));er.position.y=1.45;pen.add(er);pen.position.set(1.4,0,.6);pen.rotation.z=.5;g.add(pen);sh(g);let last=-1;
  add3('notepad',g,(t)=>{const p=pop(t,ST('s1')+.08,.45);g.scale.setScalar(.82*Math.max(.001,p.s));g.rotation.set(-.15,.35+Math.sin(t*1.1)*.25,0);g.position.y=Math.sin(t*1.5)*.06;
    const k=t<T(23)?0:Math.min(6,1+Math.floor((t-T(23))/.35));if(k!==last){st.redraw(k);last=k}
    const w=t>=T(23)&&t<T(27)+.4;pen.position.set(w?-.2+Math.sin(t*18)*.5:1.4,w?.4-((t-T(23))*.5)%1.6:0,w?.9:.6);pen.rotation.z=w?.35:.5})}
// salami + parcel with ?
{ const g=new THREE.Group();const stt=texCanvas(256,128,(x)=>{x.fillStyle='#8b2e2a';x.fillRect(0,0,256,128);for(let i=0;i<120;i++){x.fillStyle=`rgba(255,${220+hash(i)*30|0},${200+hash(i+3)*40|0},.9)`;x.beginPath();x.arc(hash(i*1.3)*256,hash(i*2.7)*128,1.5+hash(i*4.1)*3,0,7);x.fill()}});stt.redraw();
  const sal=new THREE.Mesh(new THREE.CapsuleGeometry(.55,2.2,12,32),new THREE.MeshPhysicalMaterial({map:stt.tx,roughness:.55,clearcoat:.3}));sal.rotation.z=Math.PI/2.4;sal.position.set(-1.1,.3,0);g.add(sal);
  
  const box=new THREE.Group();const bb=new THREE.Mesh(new RoundedBoxGeometry(1.8,1.4,1.4,3,.06),M(0xd6a76a,{roughness:.6,clearcoat:.15}));box.add(bb);
  const tp=new THREE.Mesh(new RoundedBoxGeometry(.32,1.42,1.42,2,.02),M(0xb9874a,{roughness:.4}));box.add(tp);box.position.set(1.3,-1,.2);g.add(box);
  const q=new THREE.Group();const qd=new THREE.Mesh(new THREE.CylinderGeometry(.6,.6,.22,40),M(0xff2e4d));qd.rotation.x=Math.PI/2;q.add(qd);const qp=plane(labelTex('?',256,256,'#fff',220),1.1,1.1);qp.position.z=.12;q.add(qp);q.position.set(1.4,.6,.9);g.add(q);sh(g);
  add3('salame',g,(t)=>{const p=pop(t,ST('s2')+.08,.45);g.scale.setScalar(.78*Math.max(.001,p.s));g.rotation.set(.1,-.3+Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.06;
    const k=pop(t,T(41)-.05,.35);sal.scale.setScalar(Math.max(.001,lerp(.6,1,clamp(k.p*1.5))));const bx=pop(t,T(42)-.05,.35);box.scale.setScalar(Math.max(.001,bx.s));
    const qq=pop(t,T(45)-.05,.3);q.visible=qq.p>0;q.scale.setScalar(Math.max(.001,qq.s)*(1+.08*Math.sin(t*6)));q.rotation.y=Math.sin(t*2)*.5})}
// hanging CHIUSO sign
{ const g=new THREE.Group();const bar=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,3.4,16),M(0x10131f,{metalness:.6}));bar.rotation.z=Math.PI/2;bar.position.y=2;g.add(bar);
  const sw=new THREE.Group();sw.position.y=2;g.add(sw);
  const board=new THREE.Mesh(new RoundedBoxGeometry(3,1.5,.16,4,.12),M(0xff2e4d,{roughness:.35}));board.position.y=-1.9;sw.add(board);
  const lp=plane(labelTex('CHIUSO',768,256,'#fff',170),2.7,.9);lp.position.set(0,-1.9,.09);sw.add(lp);
  [-1,1].forEach(s=>{const c=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,1.45,8),M(0xd9d2bf));c.position.set(s*.6,-.55,0);c.rotation.z=-s*.42;sw.add(c)});
  const clk=new THREE.Group();const cb=new THREE.Mesh(new THREE.CylinderGeometry(.6,.6,.2,40),M(0xffffff));cb.rotation.x=Math.PI/2;clk.add(cb);const hh=new THREE.Mesh(new RoundedBoxGeometry(.07,.42,.05,2,.02),M(0x10131f));hh.geometry.translate(0,.18,0);hh.position.z=.12;clk.add(hh);
  const mh=new THREE.Mesh(new RoundedBoxGeometry(.05,.5,.05,2,.02),M(0xff2e4d));mh.geometry.translate(0,.22,0);mh.position.z=.14;clk.add(mh);clk.position.set(1.8,-1.4,.4);g.add(clk);sh(g);
  add3('closed',g,(t)=>{const p=pop(t,ST('s3')+.08,.45);g.scale.setScalar(.8*Math.max(.001,p.s));g.rotation.set(.05,Math.sin(t*1.1)*.3,0);
    const k=t-ST('s3');sw.rotation.z=Math.sin(k*4)*.25*Math.exp(-k*.6)+.03*Math.sin(t*2);hh.rotation.z=-t*.6;mh.rotation.z=-t*4})}
// phone with deli shop
{ const scr=(x,s=0)=>{x.fillStyle='#f6f2ea';x.fillRect(0,0,512,1024);x.fillStyle='#7a3d1a';x.fillRect(0,0,512,140);x.fillStyle='#fff';x.font='900 36px Inter';x.fillText('Gastronomia Rossi',30,92);
    x.beginPath();x.arc(455,78,32,0,7);x.fillStyle='#ffd60a';x.fill();x.fillStyle='#10131f';x.font='900 30px Inter';x.textAlign='center';x.fillText(String(Math.min(s,3)),455,89);x.textAlign='left';
    const P=[['Salame nostrano','12,90 €','#8b2e2a'],['Prosciutto crudo','4,50 € / etto','#e88f8f'],['Pecorino stagionato','18,00 €','#f2c14e']];
    P.forEach(([n,pr,c],i)=>{const y=175+i*215;x.fillStyle='#fff';x.beginPath();x.roundRect(24,y,464,190,26);x.fill();x.fillStyle=c;x.beginPath();x.roundRect(44,y+22,146,146,20);x.fill();
      x.fillStyle='#10131f';x.font='800 30px Inter';x.fillText(n,210,y+66);x.fillStyle='#6b7185';x.font='700 28px Inter';x.fillText(pr,210,y+108);
      const on=s>i;x.fillStyle=on?'#19c37d':'#7a3d1a';x.beginPath();x.roundRect(210,y+128,on?170:150,46,23);x.fill();x.fillStyle='#fff';x.font='800 24px Inter';x.fillText(on?'Nel carrello':'Aggiungi',228,y+160)});
    if(s>=2){x.fillStyle='#19c37d';x.beginPath();x.roundRect(24,830,464,72,36);x.fill();x.fillStyle='#fff';x.font='800 30px Inter';x.fillText('Pagamento ricevuto',100,877)}
    if(s>=3){x.fillStyle='#2d5bff';x.beginPath();x.roundRect(24,920,464,72,36);x.fill();x.fillStyle='#fff';x.font='800 30px Inter';x.fillText('Spedizione prenotata',96,967)}};
  const g=phone(0xe9e4da,scr);let last=-1;
  add3('shop',g,(t)=>{const p=pop(t,ST('shop')+.08,.45);g.scale.setScalar(.95*Math.max(.001,p.s));g.rotation.set(.05,.35+Math.sin(t*1.1)*.2,Math.sin(t*.9)*.04);g.position.y=Math.sin(t*1.5)*.07;
    const s=t>=T(76)?3:t>=T(71)?2:t>=T(67)?1:0;if(s!==last){g.userData.st.redraw(s);last=s}})}
// delivery van at night
{ const g=new THREE.Group();const body=new THREE.Mesh(new RoundedBoxGeometry(3,1.9,1.7,5,.2),M(0xffffff,{roughness:.3}));body.position.set(-.4,.3,0);g.add(body);
  const cab=new THREE.Mesh(new RoundedBoxGeometry(1.3,1.4,1.65,5,.25),M(0x2d5bff));cab.position.set(1.65,.05,0);g.add(cab);
  const wsc=new THREE.Mesh(new RoundedBoxGeometry(.1,.6,1.4,2,.04),M(0x10131f,{roughness:.05}));wsc.position.set(2.3,.35,0);g.add(wsc);
  const lg=plane(labelTex('SPESA',512,128,'#7a3d1a',96),2.2,.55);lg.position.set(-.4,.4,.86);g.add(lg);
  const wh=[];[[-1.3,.85],[-1.3,-.85],[1.6,.85],[1.6,-.85]].forEach(([x,z])=>{const w=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,.3,32),M(0x10131f,{roughness:.6}));w.rotation.x=Math.PI/2;w.position.set(x,-.75,z);g.add(w);wh.push(w)});
  const hl=new THREE.Mesh(new THREE.SphereGeometry(.12,12,10),new THREE.MeshBasicMaterial({color:0xfff1b8,toneMapped:false}));hl.position.set(2.32,-.25,.6);g.add(hl);
  const moon=new THREE.Group();const ms=new THREE.Mesh(new THREE.SphereGeometry(.55,40,30),M(0xfff1b8,{emissive:0xffd66b,emissiveIntensity:.35,roughness:.6}));moon.add(ms);
  const ct=new THREE.Mesh(new THREE.SphereGeometry(.5,40,30),M(0x0d1033,{roughness:.6}));ct.position.set(.28,.16,.28);moon.add(ct);moon.position.set(-1.8,2.3,-.8);g.add(moon);
  const stars=[];for(let i=0;i<6;i++){const s=new THREE.Mesh(new THREE.OctahedronGeometry(.1),new THREE.MeshBasicMaterial({color:0xffffff,toneMapped:false}));s.position.set(-2.5+i*1.0,2+hash(i)*.8,-1.5);g.add(s);stars.push(s)}sh(g);
  add3('van',g,(t)=>{const p=pop(t,ST('payoff')+.08,.45);const out=clamp((t-T(91)+.15)/.2);g.scale.setScalar(.72*Math.max(.001,p.s*(1-out)));g.rotation.set(.15,-.6+Math.sin(t*.9)*.25,0);
    g.position.y=Math.abs(Math.sin(t*9))*.05;wh.forEach(w=>w.rotation.y=t*6);stars.forEach((s,i)=>s.visible=hash(Math.floor(t*6)+i*2.3)>.25)})}
const BOX={store:[540,960,800],notepad:[540,820,540],salame:[540,880,820],closed:[540,880,700],shop:[330,1080,860],van:[540,980,780]};
const SCN={
 intro(t){render3D('store',t,BOX.store);const q=pop(t,T(10)-.05,.3);withT(540,1530,q.s,q.a,()=>pill('Negozio online?',540,1530,{size:52,bg:'#fff',c:'#ff3d7f'}))},
 s1(t){render3D('notepad',t,BOX.notepad);const c=pop(t,T(13)-.08,.35);withT(540,1370,c.s,c.a,()=>{card(140,1110,800,520,{r:44});
   ctx.beginPath();ctx.arc(205,1170,30,0,7);ctx.fillStyle='#25d366';ctx.fill();txt('WhatsApp · 14 nuovi',250,1182,{size:32,w:800,c:'#10131f'});
   const M2=[['Mi tieni 2 etti di crudo?',T(14)],['Lasagna per 4, stasera!',T(16)],['Passo alle 18, ok?',T(19)]];
   M2.forEach(([s,tt],i)=>{const q=pop(t,tt-.05,.28);const y=1250+i*120;withT(i%2?600:440,y+40,q.s,q.a,()=>{ctx.font='700 34px Inter';const w=ctx.measureText(s).width+60;const x=i%2?900-w:180;
     rr(x,y,w,84,30);ctx.fillStyle=i%2?'#dcf8c6':'#f1f3f8';ctx.fill();txt(s,x+30,y+54,{size:34,w:700})})})});
   stampTxt('CAOS',560,1040,t,T(27)+.02,'#fff',-.1,60)},
 s2(t){render3D('salame',t,BOX.salame);const c=pop(t,T(32)-.08,.35);withT(540,1470,c.s,c.a,()=>{card(140,1340,800,260,{r:44});
   ctx.beginPath();ctx.arc(270,1440,22,0,7);ctx.fillStyle='#7a3d1a';ctx.fill();txt('La tua bottega',290,1510,{size:30,w:800,c:'#6b7185',al:'center'});
   const k=eOut(prog(t,T(34),.6));ctx.setLineDash([16,14]);ctx.strokeStyle='#2d5bff';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(300,1440);ctx.lineTo(lerp(300,790,k),1440);ctx.stroke();ctx.setLineDash([]);
   const ci=pop(t,T(35)-.05,.3);withT(810,1440,ci.s,ci.a,()=>{ctx.beginPath();ctx.arc(810,1440,24,0,7);ctx.fillStyle='#ff2e4d';ctx.fill();txt('Altra città',790,1510,{size:30,w:800,c:'#6b7185',al:'center'})});
   const qq=pop(t,T(44)-.05,.3);withT(540,1440,qq.s,qq.a,()=>{ctx.beginPath();ctx.arc(540,1440,46,0,7);ctx.fillStyle='#ff2e4d';ctx.fill();txt('?',540,1462,{size:64,w:900,c:'#fff',al:'center'})})})},
 s3(t){render3D('closed',t,BOX.closed);const D=['L','M','M','G','V','S','D'];const c=pop(t,T(49)-.08,.35);withT(540,1440,c.s,c.a,()=>{card(120,1360,840,160,{r:40});
   D.forEach((d,i)=>{const x=190+i*117;const dom=i===6;const on=dom&&t>=T(50)-.03;rr(x-46,1394,92,92,22);ctx.fillStyle=on?'#ff2e4d':'#eef0f6';ctx.fill();txt(d,x,1457,{size:44,w:900,c:on?'#fff':'#10131f',al:'center'})})});
   const q=pop(t,T(55)-.05,.3);withT(540,1630,q.s,q.a,()=>pill('Ma la gente ha fame!',540,1630,{size:46,bg:'#FFD60A',c:'#10131f'}))},
 shop(t){render3D('shop',t,BOX.shop);const items=[['Vendi 24 ore su 24',T(67)],['Pagamenti sicuri',T(73)],['Spedisci in 2 clic',T(78)]];
   items.forEach(([s,tt],i)=>{const y=920+i*150;const q=pop(t,tt-.05,.3);withT(765,y,q.s,q.a,()=>{ctx.font='800 34px Inter';const w=pill(s,765,y,{size:34,bg:'#fff',c:'#10131f',pad:26});check(765-w/2+4,y-48,24,prog(t,tt,.35))})})},
 payoff(t){render3D('van',t,BOX.van);if(t>=T(91)-.05)drawLogo(t,T(91)-.05,540,1060,700)},
};
