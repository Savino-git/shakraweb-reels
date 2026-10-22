const ST=n=>SC.find(s=>s.name===n).t0;
const SP={ask:['orange','navy','orange'],excel:['green','teal','green','mint'],problem:['red','grey','red'],ai:['violet','blue','violet'],
 chat:['navy2','violet','navy2','blue','navy2'],answer:['teal','green','teal','blue'],all:['blue','violet','pink','blue'],payoff:['night','navy','navy2'],cta:['orange','violet','green','navy']};
function labelTex(s,w=256,h=256,col='#fff',size=150,bg=null){const st=texCanvas(w,h,(x)=>{x.clearRect(0,0,w,h);if(bg){x.fillStyle=bg;x.fillRect(0,0,w,h)}x.fillStyle=col;x.font='900 '+size+'px Inter';x.textAlign='center';x.fillText(s,w/2,h*.7)});st.redraw();return st}
function plane(st,w,h){return new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:st.tx,transparent:true,toneMapped:false}))}
// warehouse: pallet + cardboard boxes + floating question mark
{ const g=new THREE.Group();
  const pal=new THREE.Group();for(let i=0;i<3;i++){const s=new THREE.Mesh(new RoundedBoxGeometry(3.6,.14,.9,2,.04),M(0xc89a5b,{roughness:.7,clearcoat:.1}));s.position.set(0,-1.75,-1+i*1);pal.add(s)}
  [-1.5,0,1.5].forEach(x=>{const b=new THREE.Mesh(new RoundedBoxGeometry(.4,.3,2.8,2,.04),M(0xa97c43,{roughness:.7,clearcoat:.1}));b.position.set(x,-1.97,0);pal.add(b)});g.add(pal);
  const boxes=[];const pos=[[-.85,-1.1,0],[.85,-1.1,0],[0,.15,0],[-.85,-1.1,-.4],[.85,.15,-.6]];
  pos.forEach(([x,y,z],i)=>{const bx=new THREE.Group();const b=new THREE.Mesh(new RoundedBoxGeometry(1.6,1.2,1.4,3,.06),M(0xd6a76a,{roughness:.6,clearcoat:.15}));bx.add(b);
    const tape=new THREE.Mesh(new RoundedBoxGeometry(.32,1.22,1.42,2,.02),M(0xb9874a,{roughness:.4}));bx.add(tape);bx.position.set(x,y,z);g.add(bx);boxes.push(bx)});
  const qt=labelTex('?',256,256,'#ffffff',230);const q=new THREE.Group();const qd=new THREE.Mesh(new THREE.CylinderGeometry(.75,.75,.25,48),M(0xff2e4d));qd.rotation.x=Math.PI/2;q.add(qd);
  const qp=plane(qt,1.4,1.4);qp.position.z=.14;q.add(qp);q.position.set(1.6,1.8,.6);g.add(q);sh(g);
  add3('ware',g,(t)=>{const p=pop(t,.05,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.18,-.45+Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.07+.2;
    boxes.forEach((b,i)=>{const k=pop(t,.1+i*.08,.35);b.scale.setScalar(Math.max(.001,k.s))});
    const qq=pop(t,T(3)-.03,.35);q.visible=qq.p>0;q.scale.setScalar(Math.max(.001,qq.s)*(1+.08*Math.sin(t*6)));q.rotation.y=Math.sin(t*2)*.4})}
// three spreadsheet sheets fanned
{ const g=new THREE.Group();const sheets=[];const names=['magazzino_v3','ordini_FINALE','listino (2)'];
  names.forEach((n,i)=>{const sg=new THREE.Group();const b=new THREE.Mesh(new RoundedBoxGeometry(2.4,3,.12,4,.1),M(0xffffff,{roughness:.35}));sg.add(b);
    const st=texCanvas(384,480,(x)=>{x.fillStyle='#fff';x.fillRect(0,0,384,480);x.fillStyle='#1d7a46';x.fillRect(0,0,384,70);x.fillStyle='#fff';x.font='800 30px Inter';x.fillText(n+'.xlsx',18,46);
      x.strokeStyle='#cfd6e2';x.lineWidth=2;for(let r=0;r<10;r++){x.beginPath();x.moveTo(0,100+r*38);x.lineTo(384,100+r*38);x.stroke()}for(let c=1;c<4;c++){x.beginPath();x.moveTo(c*96,70);x.lineTo(c*96,480);x.stroke()}
      x.fillStyle='#9aa1b3';for(let r=0;r<9;r++)for(let c=0;c<4;c++){x.fillRect(c*96+12,112+r*38,30+((r*7+c*13)%40),12)}});st.redraw();
    const p=plane(st,2.25,2.85);p.position.z=.065;sg.add(p);sg.position.set((i-1)*1.25,0,i*.25);sg.rotation.z=(i-1)*-.18;g.add(sg);sheets.push(sg)});
  const x=new THREE.Group();const xb=new THREE.Mesh(new RoundedBoxGeometry(1,1,.3,4,.2),M(0x1d7a46));x.add(xb);const xl=plane(labelTex('X',256,256,'#fff',200),.85,.85);xl.position.z=.16;x.add(xl);x.position.set(-1.7,1.7,.8);g.add(x);sh(g);
  add3('sheets',g,(t)=>{const p=pop(t,ST('excel')+.1,.45);g.scale.setScalar(1.0*Math.max(.001,p.s));g.rotation.set(.05,Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.07;
    sheets.forEach((s,i)=>{const k=pop(t,T(15+i)-.04,.35);s.visible=k.p>0;s.scale.setScalar(Math.max(.001,k.s));s.position.y=Math.sin(t*2+i)*.08});x.rotation.y=t*1.2})}
// old CRT monitor with red X
{ const g=new THREE.Group();const body=new THREE.Mesh(new RoundedBoxGeometry(3.4,2.8,2.4,6,.35),M(0xd9d2bf,{roughness:.5,clearcoat:.3}));body.position.z=-.5;g.add(body);
  const st=texCanvas(512,400,(x,k)=>{x.fillStyle='#0a3d1a';x.fillRect(0,0,512,400);x.fillStyle='#2bff6a';x.font='700 34px monospace';
    ['C:\\GEST> ARTICOLI','ERRORE 0x00F3','RIAVVIARE...','_'].forEach((l,i)=>x.fillText(l,30,70+i*70))});st.redraw();
  const scr=plane(st,2.6,2.0);scr.position.set(0,.05,.72);g.add(scr);
  const st2=new THREE.Mesh(new RoundedBoxGeometry(1.6,.3,1.2,3,.1),M(0xd9d2bf,{roughness:.5}));st2.position.set(0,-1.65,-.4);g.add(st2);
  const X=new THREE.Group();[1,-1].forEach(s=>{const b=new THREE.Mesh(new RoundedBoxGeometry(3.4,.42,.42,4,.2),M(0xff2e4d));b.rotation.z=s*Math.PI/4;X.add(b)});X.position.z=1.1;g.add(X);sh(g);
  add3('crt',g,(t)=>{const p=pop(t,ST('problem')+.1,.45);g.scale.setScalar(.78*Math.max(.001,p.s));g.rotation.set(.08,.35+Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.07;
    const q=pop(t,T(30)-.03,.3);X.visible=q.p>0;X.scale.setScalar(Math.max(.001,q.s));if(q.p>0&&t<T(30)+.4){g.position.x=(hash(t*50)-.5)*.2}else g.position.x=0})}
// AI chip with glowing core
{ const g=new THREE.Group();const chip=new THREE.Mesh(new RoundedBoxGeometry(2.8,2.8,.4,6,.25),M(0x1a1f45,{metalness:.6,roughness:.3}));g.add(chip);
  const core=new THREE.Mesh(new RoundedBoxGeometry(1.6,1.6,.3,6,.2),M(0x6a2cf5,{emissive:0x8a5cff,emissiveIntensity:.6}));core.position.z=.25;g.add(core);
  const lt=labelTex('AI',256,256,'#ffffff',150);const lp=plane(lt,1.3,1.3);lp.position.z=.41;g.add(lp);
  const pins=[];for(let s=0;s<4;s++)for(let i=0;i<6;i++){const p=new THREE.Mesh(new RoundedBoxGeometry(.14,.5,.1,2,.04),gold());const o=-1.05+i*.42;
    if(s===0)p.position.set(o,1.6,0);if(s===1)p.position.set(o,-1.6,0);if(s===2){p.position.set(1.6,o,0);p.rotation.z=Math.PI/2}if(s===3){p.position.set(-1.6,o,0);p.rotation.z=Math.PI/2}g.add(p);pins.push(p)}
  const rings=[];for(let i=0;i<2;i++){const r=new THREE.Mesh(new THREE.TorusGeometry(2.6+i*.5,.05,8,90),M(0x13b4ff,{emissive:0x13b4ff,emissiveIntensity:.7}));g.add(r);rings.push(r)}sh(g);
  add3('chip',g,(t)=>{const p=pop(t,ST('ai')+.1,.45);g.scale.setScalar(.75*Math.max(.001,p.s));g.rotation.set(-.35+Math.sin(t*.9)*.1,Math.sin(t*1.1)*.45,0);g.position.y=Math.sin(t*1.5)*.07;
    const ph=(t%BEAT)/BEAT;core.material.emissiveIntensity=.5+.6*Math.exp(-ph*4);rings.forEach((r,i)=>{r.rotation.x=1.2+i*.3;r.rotation.y=t*(1+i*.5)})})}
// tablet with chat questions
{ const scr=(x,s=0)=>{x.fillStyle='#f3f5fb';x.fillRect(0,0,512,1024);x.fillStyle='#6a2cf5';x.fillRect(0,0,512,140);x.fillStyle='#fff';x.font='800 36px Inter';x.fillText('Assistente AI',110,92);
    x.beginPath();x.arc(60,80,30,0,7);x.fillStyle='#2EE59D';x.fill();
    const Q=[['Quali articoli sono','fermi da 3 mesi?'],['Chi deve ancora','pagarmi?'],['Cosa devo riordinare','lunedì?']];
    for(let i=0;i<s;i++){const y=190+i*250;x.fillStyle='#2d5bff';x.beginPath();x.roundRect(90,y,392,150,30);x.fill();x.fillStyle='#fff';x.font='700 32px Inter';x.fillText(Q[i][0],120,y+62);x.fillText(Q[i][1],120,y+110)}};
  const g=phone(0x2a2e40,scr);let last=-1;
  add3('tab',g,(t)=>{const p=pop(t,ST('chat')+.1,.45);g.scale.setScalar(.95*Math.max(.001,p.s));g.rotation.set(.05,.3+Math.sin(t*1.1)*.25,Math.sin(t*.9)*.04);g.position.y=Math.sin(t*1.5)*.07;
    const s=t>=T(57)?3:t>=T(53)?2:t>=T(45)?1:0;if(s!==last){g.userData.st.redraw(s);last=s}})}
// stopwatch
{ const g=new THREE.Group();const body=new THREE.Mesh(new THREE.CylinderGeometry(1.7,1.7,.6,64),M(0xffffff,{roughness:.25}));body.rotation.x=Math.PI/2;g.add(body);
  const rim=new THREE.Mesh(new THREE.TorusGeometry(1.7,.16,16,80),M(0x00a676,{metalness:.3}));rim.position.z=.05;g.add(rim);
  const btn=new THREE.Mesh(new THREE.CylinderGeometry(.25,.25,.5,24),M(0x00a676));btn.position.y=2;g.add(btn);
  const crown=new THREE.Mesh(new THREE.TorusGeometry(.3,.08,10,30),M(0xc9ced9,{metalness:1}));crown.position.y=2.35;g.add(crown);
  for(let i=0;i<12;i++){const a=i/12*Math.PI*2;const m=new THREE.Mesh(new RoundedBoxGeometry(.07,i%3?.15:.28,.05,2,.02),M(0x10131f));m.position.set(Math.sin(a)*1.38,Math.cos(a)*1.38,.32);m.rotation.z=-a;g.add(m)}
  const hand=new THREE.Mesh(new RoundedBoxGeometry(.1,1.3,.06,2,.03),M(0xff2e4d));hand.geometry.translate(0,.55,0);hand.position.z=.36;g.add(hand);
  const arc=new THREE.Mesh(new THREE.RingGeometry(.2,1.25,64,1,Math.PI/2,0.01),new THREE.MeshBasicMaterial({color:0x2EE59D,transparent:true,opacity:.6,toneMapped:false}));arc.position.z=.34;g.add(arc);sh(g);
  add3('watch',g,(t)=>{const p=pop(t,ST('answer')+.1,.45);g.scale.setScalar(.75*Math.max(.001,p.s));g.rotation.set(.05,-.35+Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.07;
    const k=eOut(prog(t,T(64),.9));const ang=k*Math.PI*2*(2/60)*6;hand.rotation.z=-ang;arc.geometry.dispose();arc.geometry=new THREE.RingGeometry(.2,1.25,64,1,Math.PI/2-ang,Math.max(.01,ang))})}
// gears for "su misura"
{ const g=new THREE.Group();function gear(r,n,col){const sh2=new THREE.Shape();const N=n*2;for(let i=0;i<=N*2;i++){const a=i/(N*2)*Math.PI*2;const rr2=(Math.floor(i/2)%2)?r:r*1.18;const x=Math.cos(a)*rr2,y=Math.sin(a)*rr2;if(i===0)sh2.moveTo(x,y);else sh2.lineTo(x,y)}
    const hole=new THREE.Path();hole.absarc(0,0,r*.35,0,Math.PI*2,true);sh2.holes.push(hole);
    const geo=new THREE.ExtrudeGeometry(sh2,{depth:.4,bevelEnabled:true,bevelThickness:.06,bevelSize:.05,bevelSegments:3});geo.center();return new THREE.Mesh(geo,M(col,{metalness:.5,roughness:.25}))}
  const g1=gear(1.3,10,0x2d5bff),g2=gear(.85,7,0xffc53d),g3=gear(.7,6,0xff3d7f);g1.position.set(-.6,.2,0);g2.position.set(1.45,.95,0);g3.position.set(1.2,-1.25,.1);g.add(g1,g2,g3);sh(g);
  add3('gears',g,(t)=>{const p=pop(t,ST('all')+.1,.45);g.scale.setScalar(.92*Math.max(.001,p.s));g.rotation.set(-.2,-.35+Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.07;
    g1.rotation.z=t*.9;g2.rotation.z=-t*.9*1.43+.2;g3.rotation.z=-t*.9*1.7})}
// server rack glowing at night
{ const g=new THREE.Group();const rack=new THREE.Mesh(new RoundedBoxGeometry(2.2,4,1.6,6,.18),M(0x1a1f45,{metalness:.7,roughness:.3}));g.add(rack);
  const leds=[];for(let r=0;r<6;r++){const u=new THREE.Mesh(new RoundedBoxGeometry(1.9,.5,.1,3,.06),M(0x2a3170,{metalness:.5}));u.position.set(0,1.55-r*.62,.81);g.add(u);
    for(let k=0;k<4;k++){const l=new THREE.Mesh(new THREE.SphereGeometry(.06,10,8),new THREE.MeshBasicMaterial({color:k%2?0x2EE59D:0x13b4ff,toneMapped:false}));l.position.set(-.7+k*.18,1.55-r*.62,.88);g.add(l);leds.push(l)}}
  const moon=new THREE.Group();const ms=new THREE.Mesh(new THREE.SphereGeometry(.6,40,30),M(0xfff1b8,{emissive:0xffd66b,emissiveIntensity:.35,roughness:.6,clearcoat:.2}));moon.add(ms);
  const cut=new THREE.Mesh(new THREE.SphereGeometry(.56,40,30),M(0x0d1033,{roughness:.6}));cut.position.set(.3,.18,.3);moon.add(cut);moon.position.set(-1.9,1.9,-.5);g.add(moon);sh(g);
  add3('rack',g,(t)=>{const p=pop(t,ST('payoff')+.1,.45);const out=clamp((t-T(97)+.15)/.2);g.scale.setScalar(.88*Math.max(.001,p.s*(1-out)));g.rotation.set(.12,-.5+Math.sin(t*.9)*.3,0);g.position.y=Math.sin(t*1.5)*.06;
    leds.forEach((l,i)=>l.visible=hash(Math.floor(t*8)+i*3.7)>.3);moon.rotation.y=t*.4})}
const BOX={ware:[540,960,760],sheets:[540,930,720],crt:[540,930,700],chip:[540,940,700],tab:[540,1090,920],watch:[540,900,660],gears:[540,880,620],rack:[540,980,760]};
const SCN={
 ask(t){render3D('ware',t,BOX.ware);const q=pop(t,T(8)-.05,.3);withT(540,1450,q.s,q.a,()=>pill('Merce ferma: ??? €',540,1450,{size:48,bg:'#fff',c:'#10131f'}))},
 excel(t){render3D('sheets',t,BOX.sheets);const c=pop(t,T(19)-.08,.35);withT(540,1450,c.s,c.a,()=>{card(190,1340,700,220);
   avatar(290,1450,58,'M','#ff9f43','#ff3d7f');txt('Chiamata in corso…',380,1430,{size:32,w:700,c:'#6b7185'});txt('Magazziniere',380,1490,{size:50,w:900});
   const ph=Math.floor(t*3)%2;ctx.beginPath();ctx.arc(830,1450,26,0,7);ctx.fillStyle=ph?'#ff2e4d':'#ff8a5c';ctx.fill()})},
 problem(t){render3D('crt',t,BOX.crt);stampTxt('VECCHIO GESTIONALE',540,1460,t,T(30)+.05,'#fff',-.06,50)},
 ai(t){render3D('chip',t,BOX.chip);const q=pop(t,T(38)-.05,.3);withT(540,1430,q.s,q.a,()=>pill('Lo chiedi a parole',540,1430,{size:46,bg:'#fff',c:'#6a2cf5'}));
   const r=pop(t,T(43)-.05,.3);withT(540,1560,r.s,r.a,()=>pill('come a una persona',540,1560,{size:42,bg:'#FFD60A',c:'#10131f'}))},
 chat(t){render3D('tab',t,BOX.tab)},
 answer(t){render3D('watch',t,BOX.watch);const c=pop(t,T(68)-.08,.35);withT(540,1460,c.s,c.a,()=>{card(150,1270,780,380);
   const rows=[['Fermi da 90 giorni',37,'',T(68)],['Da incassare',12480,'€ ',T(70)],['Da riordinare',14,'',T(71)]];
   rows.forEach(([l,v,pre,tt],i)=>{const y=1350+i*115;txt(l,200,y,{size:36,w:700,c:'#6b7185'});const n=v*eOut(prog(t,tt,.6));txt(pre+fmt(n),880,y+4,{size:54,w:900,c:i===1?'#00a676':'#10131f',al:'right'});
     if(i<2){ctx.fillStyle='#eef0f6';ctx.fillRect(200,y+38,680,3)}})});
   const q=pop(t,T(66)-.05,.3);withT(540,1720,q.s,q.a,()=>pill('Risposta in 2 secondi',540,1720,{size:40,bg:'#2EE59D',c:'#10131f'}))},
 all(t){render3D('gears',t,BOX.gears);   const items=[['Su misura',T(77)],['Siti',T(84)],['App',T(85)],['Automazioni',T(87)]];
   items.forEach(([s,tt],i)=>{const q=pop(t,tt-.05,.3);withT(540,1240+i*112,q.s,q.a,()=>{const w=pill(s,540,1240+i*112,{size:44,bg:i===0?'#FFD60A':'#fff',c:'#10131f'});check(540-w/2-50,1240+i*112,30,prog(t,tt,.35))})})},
 payoff(t){render3D('rack',t,BOX.rack);if(t>=T(97)-.05)drawLogo(t,T(97)-.05,540,1060,700)},
};
