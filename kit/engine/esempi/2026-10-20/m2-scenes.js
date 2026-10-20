const ST=n=>SC.find(s=>s.name===n).t0;
const SP={villa:['teal','blue','teal'],shop:['orange','pink','orange'],bulb:['night','navy2','night','navy'],shutter:['grey','red','grey'],
 app:['violet','blue','violet','navy2','blue'],sched:['green','teal','green','red'],save:['pink','rose'],all:['blue','violet','navy2','blue'],brand:['navy','night'],cta:['blue','violet','green','navy']};
function labelTex(s,w=512,h=128,col='#10131f',size=80){const st=texCanvas(w,h,(x)=>{x.clearRect(0,0,w,h);x.fillStyle=col;x.font='900 '+size+'px Inter';x.textAlign='center';x.fillText(s,w/2,h*.72)});st.redraw();return st}
// villa with pool + X
{ const g=new THREE.Group();const a=new THREE.Mesh(new RoundedBoxGeometry(3.4,1.3,2,3,.06),M(0xffffff,{roughness:.4}));a.position.y=-1;g.add(a);
  const b=new THREE.Mesh(new RoundedBoxGeometry(2.2,1.1,1.8,3,.06),M(0xffffff,{roughness:.4}));b.position.set(-.5,.2,-.1);g.add(b);
  const gl=new THREE.MeshPhysicalMaterial({color:0x13b4ff,roughness:.05,metalness:.3,clearcoat:1,transparent:true,opacity:.75});
  [[-1,-1,1.01,1.1,.8],[.6,-1,1.01,1.2,.8],[-.5,.2,.91,1.6,.6]].forEach(([x,y,z,w,h])=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),gl);m.position.set(x,y,z);g.add(m)});
  const pool=new THREE.Mesh(new RoundedBoxGeometry(3.2,.2,1.2,3,.08),M(0x26e0c0,{roughness:.05,metalness:.2}));pool.position.set(.2,-1.6,1.9);g.add(pool);
  const edge=new THREE.Mesh(new RoundedBoxGeometry(3.5,.15,1.5,3,.06),M(0xf4f6ff));edge.position.set(.2,-1.68,1.9);g.add(edge);
  const X=new THREE.Group();[1,-1].forEach(k=>{const r=new THREE.Mesh(new RoundedBoxGeometry(4.6,.6,.4,3,.18),M(0xff2e4d));r.rotation.z=k*Math.PI/4;X.add(r)});X.position.z=2.6;g.add(X);sh(g);
  add3('villa',g,(t)=>{const p=pop(t,0,.4);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.2,-.5+Math.sin(t*1.1)*.3,0);g.position.y=.2+Math.sin(t*1.5)*.08;
    const q=pop(t,T(8)-.03,.3);X.visible=q.p>0;X.scale.setScalar(Math.max(.001,q.s));X.rotation.y=.5-g.rotation.y+.5})}
// shop storefront
{ const g=new THREE.Group();const body=new THREE.Mesh(new RoundedBoxGeometry(3.6,2.8,1.6,3,.08),M(0xffe08a,{roughness:.5}));body.position.y=-.4;g.add(body);
  const win=new THREE.Mesh(new THREE.PlaneGeometry(1.8,1.3),new THREE.MeshPhysicalMaterial({color:0xbfe9ff,roughness:.05,clearcoat:1,emissive:0xfff2b0,emissiveIntensity:.3}));win.position.set(-.6,-.6,.81);g.add(win);
  const door=new THREE.Mesh(new RoundedBoxGeometry(.9,1.8,.08,2,.04),M(0x2d5bff));door.position.set(1.05,-.9,.82);g.add(door);
  for(let i=0;i<8;i++){const s=new THREE.Mesh(new RoundedBoxGeometry(.48,.18,1.1,2,.05),M(i%2?0xffffff:0xff2e4d));s.position.set(-1.68+i*.48,1.05,1.15);s.rotation.x=.45;g.add(s)}
  const sign=labelTex('NEGOZIO',512,128,'#10131f',84);const sg=new THREE.Mesh(new THREE.PlaneGeometry(2.4,.6),new THREE.MeshBasicMaterial({map:sign.tx,transparent:true}));sg.position.set(0,.5,.81);g.add(sg);sh(g);
  add3('shop',g,(t)=>{const p=pop(t,ST('shop')+.1,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.1,.4+Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.08})}
// light bulb
{ const g=new THREE.Group();const glass=new THREE.Mesh(new THREE.SphereGeometry(1.3,48,32),M(0xffe08a,{emissive:0xffc53d,emissiveIntensity:1.2,roughness:.1}));glass.position.y=.5;g.add(glass);
  const neck=new THREE.Mesh(new THREE.CylinderGeometry(.6,.85,.7,40),M(0xffe08a,{emissive:0xffc53d,emissiveIntensity:1}));neck.position.y=-.75;g.add(neck);
  for(let i=0;i<4;i++){const r=new THREE.Mesh(new THREE.TorusGeometry(.6,.08,10,40),M(0xc9ced9,{metalness:1,roughness:.2}));r.rotation.x=Math.PI/2;r.position.y=-1.2-i*.17;g.add(r)}
  const cap=new THREE.Mesh(new THREE.SphereGeometry(.35,24,12),M(0x2a2e40));cap.position.y=-1.85;g.add(cap);
  const rays=[];for(let i=0;i<10;i++){const r=new THREE.Mesh(new RoundedBoxGeometry(.12,.55,.12,2,.05),M(0xffd60a,{emissive:0xffd60a,emissiveIntensity:.8}));g.add(r);rays.push(r)}sh(g);
  add3('bulb',g,(t)=>{const p=pop(t,ST('bulb')+.1,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(0,Math.sin(t*1.1)*.3,Math.sin(t*1.7)*.08);g.position.y=Math.sin(t*1.5)*.08;
    const k=.5+.5*Math.abs(Math.sin(t*3));rays.forEach((r,i)=>{const a=i/10*Math.PI*2;const d=2+.25*k;r.position.set(Math.cos(a)*d,.5+Math.sin(a)*d,0);r.rotation.z=a-Math.PI/2})})}
// rolling shutter
{ const g=new THREE.Group();const fr=new THREE.Mesh(new RoundedBoxGeometry(3.8,3.4,.6,3,.08),M(0x3a3f52,{metalness:.6}));fr.position.z=-.35;g.add(fr);
  const box=new THREE.Mesh(new THREE.CylinderGeometry(.35,.35,3.9,24),M(0x6b7185,{metalness:.7}));box.rotation.z=Math.PI/2;box.position.y=1.75;g.add(box);
  const sl=[];for(let i=0;i<12;i++){const s=new THREE.Mesh(new RoundedBoxGeometry(3.4,.24,.1,2,.04),M(0xc9ced9,{metalness:.85,roughness:.3}));s.position.set(0,1.4-i*.26,0);g.add(s);sl.push(s)}
  const q=labelTex('?',256,256,'#FFD60A',220);const qm=new THREE.Mesh(new THREE.PlaneGeometry(1.4,1.4),new THREE.MeshBasicMaterial({map:q.tx,transparent:true,toneMapped:false}));qm.position.set(1.5,1.6,.6);g.add(qm);sh(g);
  add3('shutter',g,(t)=>{const p=pop(t,ST('shutter')+.1,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(0,-.35+Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.08;
    const up=.5+.5*Math.sin((t-ST('shutter'))*2.2);sl.forEach((s,i)=>{s.visible=i<12-Math.round(up*5)});qm.scale.setScalar(.8+.2*Math.abs(Math.sin(t*4)));qm.rotation.z=Math.sin(t*3)*.2})}
// phone app
const SWN=['Luci','Clima','Allarme','Telecamere'],SWC=['#ffc53d','#13b4ff','#ff3d7f','#2ee59d'];
const appDraw=(x,n=0)=>{const gr=x.createLinearGradient(0,0,0,1024);gr.addColorStop(0,'#0d0826');gr.addColorStop(1,'#2b1263');x.fillStyle=gr;x.fillRect(0,0,512,1024);
  x.fillStyle='#fff';x.font='900 40px Inter';x.fillText('Shakra Domotic',36,110);x.fillStyle='#a3a8d8';x.font='700 24px Inter';x.fillText('Negozio · Via Roma 12',36,150);
  SWN.forEach((s,i)=>{const y=210+i*190;x.fillStyle='rgba(255,255,255,.1)';x.beginPath();x.roundRect(30,y,452,160,32);x.fill();
    x.fillStyle=SWC[i];x.beginPath();x.arc(100,y+80,38,0,7);x.fill();x.fillStyle='#fff';x.font='800 36px Inter';x.fillText(s,160,y+92);
    const on=i<n;x.fillStyle=on?'#19c37d':'#555a75';x.beginPath();x.roundRect(370,y+55,90,50,25);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(on?435:395,y+80,20,0,7);x.fill()})};
{ const g=phone(0x6a2cf5,appDraw);let last=-1;
  add3('app',g,(t)=>{const p=pop(t,ST('app')+.1,.45);g.scale.setScalar(1.05*Math.max(.001,p.s));g.rotation.set(.05,lerp(-Math.PI,0,eOut(prog(t,ST('app')+.1,.7)))+Math.sin(t*1.2)*.25,0);g.position.y=Math.sin(t*1.5)*.08;
    const n=[45,46,47,48].filter(i=>t>=T(i)).length;if(n!==last){g.userData.st.redraw(n);last=n}})}
// smart thermostat
{ const g=new THREE.Group();const ring=new THREE.Mesh(new THREE.TorusGeometry(1.6,.28,24,80),M(0xc9ced9,{metalness:1,roughness:.18}));g.add(ring);
  const face=new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,.25,64),M(0x10131f,{roughness:.2}));face.rotation.x=Math.PI/2;g.add(face);
  const st=texCanvas(512,512,(x,txt='08:55',col='#2ee59d')=>{x.fillStyle='#10131f';x.fillRect(0,0,512,512);x.strokeStyle=col;x.lineWidth=18;x.beginPath();x.arc(256,256,200,Math.PI*.75,Math.PI*2.25);x.stroke();
    x.fillStyle='#fff';x.font='900 120px Inter';x.textAlign='center';x.fillText(txt,256,300);x.fillStyle=col;x.font='800 40px Inter';x.fillText(txt==='08:55'?'ACCENDI':'SPEGNI',256,370)});st.redraw();
  const sc=new THREE.Mesh(new THREE.CircleGeometry(1.45,64),new THREE.MeshBasicMaterial({map:st.tx,toneMapped:false}));sc.position.z=.13;g.add(sc);sh(g);let last='';
  add3('thermo',g,(t)=>{const p=pop(t,ST('sched')+.1,.45);g.scale.setScalar(.9*Math.max(.001,p.s));g.rotation.set(0,Math.sin(t*1.1)*.4,0);g.position.y=Math.sin(t*1.5)*.08;
    const k=t>=T(52)?'off':'on';if(k!==last){k==='on'?st.redraw('08:55','#2ee59d'):st.redraw('19:30','#ff3d7f');last=k}})}
// piggy bank
{ const g=new THREE.Group();const pk=M(0xff7eb3,{roughness:.3});const body=new THREE.Mesh(new THREE.SphereGeometry(1.4,48,32),pk);body.scale.set(1.25,1,1);g.add(body);
  const sn=new THREE.Mesh(new THREE.CylinderGeometry(.45,.5,.4,32),pk);sn.rotation.z=Math.PI/2;sn.position.x=1.8;g.add(sn);
  [-.25,.25].forEach(z=>{const n=new THREE.Mesh(new THREE.SphereGeometry(.08,12,8),M(0x9c2a5a));n.position.set(2.01,0,z*.6);g.add(n);
    const e=new THREE.Mesh(new THREE.ConeGeometry(.3,.5,24),pk);e.position.set(.9,1.2,z*2.4);e.rotation.z=-.4;g.add(e);
    const ey=new THREE.Mesh(new THREE.SphereGeometry(.1,12,8),M(0x10131f));ey.position.set(1.45,.5,z*1.6);g.add(ey)});
  [[-.8,-.6],[.8,-.6],[-.8,.6],[.8,.6]].forEach(([x,z])=>{const l=new THREE.Mesh(new THREE.CylinderGeometry(.25,.28,.6,20),pk);l.position.set(x,-1.25,z);g.add(l)});
  const slot=new THREE.Mesh(new RoundedBoxGeometry(.8,.1,.15,2,.04),M(0x9c2a5a));slot.position.y=1.4;g.add(slot);
  const coins=[];for(let i=0;i<5;i++){const c=new THREE.Mesh(new THREE.CylinderGeometry(.34,.34,.08,32),gold());c.rotation.x=Math.PI/2;g.add(c);coins.push(c)}sh(g);
  add3('piggy',g,(t)=>{const p=pop(t,ST('save')+.05,.4);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.15,-.6+Math.sin(t*1.1)*.3,0);g.position.y=-.2+Math.sin(t*1.5)*.08;
    coins.forEach((c,i)=>{const d=((t-ST('save'))*1.4+i/5)%1;c.position.set(0,3.4-d*2,0);c.visible=t>T(64)&&d<.98;c.rotation.y=t*3})})}
// block tower
{ const g=new THREE.Group();const bl=[];const cols=[0xff3d7f,0xffc53d,0x2ee59d,0x13b4ff];
  ['SITI','GESTIONALI','APP','AI'].forEach((s,i)=>{const b=new THREE.Group();const m=new THREE.Mesh(new RoundedBoxGeometry(3.4,.9,1.4,4,.14),M(cols[i]));b.add(m);
    const lt=labelTex(s,512,128,'#10131f',s.length>5?66:84);const lb=new THREE.Mesh(new THREE.PlaneGeometry(3,.75),new THREE.MeshBasicMaterial({map:lt.tx,transparent:true,toneMapped:false}));lb.position.z=.71;b.add(lb);g.add(b);bl.push(b)});sh(g);
  add3('tower',g,(t)=>{g.rotation.set(.12,-.35+Math.sin(t*1.1)*.35,0);g.position.y=Math.sin(t*1.5)*.06;
    bl.forEach((b,i)=>{const q=prog(t,T([73,74,75,76][i])-.2,.25);b.visible=q>0;const y=-1.5+i*1;b.position.set(0,lerp(y+4,y,q<1?q*q:1),0);b.rotation.y=(i%2?.12:-.12)*(1-q)+Math.sin(t*1.3+i)*.04})})}
const BOX={villa:[540,930,760],shop:[540,920,720],bulb:[540,930,700],shutter:[540,920,700],app:[540,930,760],thermo:[540,900,640],piggy:[540,920,720],tower:[540,940,760]};
const SCN={
 villa(t){render3D('villa',t,BOX.villa);stampTxt('FALSO',540,1460,t,T(8),'#ff2e4d',-.08,80)},
 shop(t){render3D('shop',t,BOX.shop);const c=pop(t,T(14)-.1,.35);withT(540,1470,c.s,c.a,()=>{card(170,1330,740,270);
   txt('Bolletta luce',230,1420,{size:40,w:700,c:'#6b7185'});txt(fmt(1240*eOut(prog(t,T(15),.6)))+' €',850,1425,{size:56,w:900,c:'#ff2e4d',al:'right'});
   txt('ogni bimestre',230,1520,{size:32,w:700,c:'#a3a8b8'})})},
 bulb(t){render3D('bulb',t,BOX.bulb);const c=pop(t,T(18)-.1,.35);withT(540,1460,c.s,c.a,()=>{card(140,1310,800,300);
   [['Luci accese tutta la notte',T(18)],['Clima a porta aperta',T(23)]].forEach(([s,tt],i)=>{const y=1410+i*110;const q=pop(t,tt,.3);
     withT(200,y-14,q.s,q.a,()=>{ctx.beginPath();ctx.arc(200,y-14,28,0,7);ctx.fillStyle='#ff2e4d';ctx.fill();txt('!',200,y,{size:40,w:900,c:'#fff',al:'center'})});
     ctx.globalAlpha*=clamp(q.p*3);txt(s,250,y,{size:38,w:800});ctx.globalAlpha=c.a})})},
 shutter(t){render3D('shutter',t,BOX.shutter);const q=pop(t,T(33)-.05,.3);withT(540,1480,q.s,q.a,()=>pill('La controlli solo quando arrivi',540,1480,{size:40,bg:'#fff',c:'#10131f'}))},
 app(t){render3D('app',t,BOX.app);const q=pop(t,T(41)-.05,.3);withT(540,1560,q.s,q.a,()=>pill('Tutto dal telefono',540,1560,{size:44,bg:'#fff',c:'#6a2cf5'}))},
 sched(t){render3D('thermo',t,BOX.thermo);const c=pop(t,T(49)-.1,.35);withT(540,1450,c.s,c.a,()=>{card(140,1270,800,360);
   [['08:55','Accendi tutto',T(50)],['Chiusura','Spegni tutto',T(52)]].forEach(([a,b,tt],i)=>{const y=1355+i*90;check(200,y-14,26,prog(t,tt,.35));ctx.globalAlpha*=prog(t,tt-.05,.2);
     txt(a,250,y,{size:38,w:900});txt(b,880,y,{size:34,w:700,c:'#6b7185',al:'right'});ctx.globalAlpha=c.a});
   const n=pop(t,T(56)-.05,.35);withT(540,1555,n.s,n.a,()=>{rr(180,1505,720,100,30);ctx.fillStyle='#fff3f5';ctx.fill();ctx.strokeStyle='#ff2e4d';ctx.lineWidth=3;ctx.stroke();
     txt('⚠  Avviso: porta aperta',540,1568,{size:36,w:800,c:'#ff2e4d',al:'center'})})})},
 save(t){render3D('piggy',t,BOX.piggy);const c=pop(t,T(63)-.08,.35);withT(540,1460,c.s,c.a,()=>{card(170,1320,740,280);
   txt('Prima',230,1400,{size:34,w:700,c:'#6b7185'});bar(400,1375,450,34,1,'#ff2e4d');
   txt('Dopo',230,1500,{size:34,w:700,c:'#6b7185'});bar(400,1475,450,34,lerp(1,.62,eOut(prog(t,T(64),.6))),'#19c37d')})},
 all(t){render3D('tower',t,BOX.tower)},
 brand(t){drawLogo(t,T(78)-.05,540,1000,760);const q=pop(t,T(78)+.1,.3);withT(540,1500,q.s,q.a,()=>pill('Shakra Web',540,1500,{size:44,bg:'#fff',c:'#1d4bff'}))},
};
