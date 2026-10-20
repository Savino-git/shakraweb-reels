const ST=n=>SC.find(s=>s.name===n).t0;
const SP={ads:['pink','orange','pink','red'],before:['grey','navy','grey','red','grey'],zero:['red','night','red'],landing:['teal','blue','teal'],
 offer:['blue','mint','blue','violet','teal','blue'],more:['green','teal','green'],all:['navy2','violet','blue','navy2'],payoff:['night','navy','navy2'],cta:['blue','violet','green','navy']};
const coinGeo=new THREE.CylinderGeometry(.34,.34,.08,32);
// megaphone with coins
{ const g=new THREE.Group();const pts=[];for(let i=0;i<=16;i++){const k=i/16;pts.push(new THREE.Vector2(.35+1.25*k*k,-1.4+k*2.8))}
  const horn=new THREE.Mesh(new THREE.LatheGeometry(pts,56),M(0xffffff,{side:THREE.DoubleSide,roughness:.3}));g.add(horn);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(1.6,.1,14,64),M(0xff3d7f));ring.rotation.x=Math.PI/2;ring.position.y=1.4;g.add(ring);
  const back=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,.6,32),M(0xff3d7f));back.position.y=-1.65;g.add(back);
  const hd=new THREE.Mesh(new RoundedBoxGeometry(.35,1.1,.5,3,.12),M(0x10131f));hd.position.set(.75,-.9,0);hd.rotation.z=.3;g.add(hd);
  g.rotation.z=-Math.PI/2.4;const w=new THREE.Group();w.add(g);
  const coins=[];for(let i=0;i<9;i++){const c=new THREE.Mesh(coinGeo,gold());w.add(c);coins.push(c)}sh(w);
  add3('mega',w,(t)=>{const p=pop(t,0,.4);w.scale.setScalar(.8*Math.max(.001,p.s));w.rotation.set(.1,-.35+Math.sin(t*1.2)*.3,0);w.position.set(-.5,Math.sin(t*1.5)*.08,0);
    coins.forEach((c,i)=>{const d=((t*.8)+i/9)%1;c.position.set(1.2+d*3.2,.3+d*1.2+Math.sin(i*3)*d*1.4,Math.cos(i*2)*d);c.rotation.set(t*4+i,i,0);c.scale.setScalar(Math.max(.001,1-d*.4));c.visible=t>T(3)})})}
// chaotic old site monitor
{ const g=new THREE.Group();const fr=new THREE.Mesh(new RoundedBoxGeometry(4.2,2.9,.25,4,.12),M(0x2a2e40,{metalness:.5}));g.add(fr);
  const st=texCanvas(640,440,(x,n=0,dead=0)=>{x.fillStyle='#fdfdfd';x.fillRect(0,0,640,440);x.fillStyle='#8aa0c8';x.fillRect(0,0,640,60);
    const items=['Home','Chi siamo','Studio','Staff','Servizi','News','Galleria','Orari','Dove','Contatti'];x.font='700 15px Inter';
    for(let i=0;i<Math.min(n,10);i++){x.fillStyle=['#d33','#36c','#393','#c90','#939'][i%5];x.fillRect(8+(i%5)*126,6+Math.floor(i/5)*26,118,22);x.fillStyle='#fff';x.fillText(items[i],14+(i%5)*126,22+Math.floor(i/5)*26)}
    x.fillStyle='#c9c2b0';x.fillRect(20,80,300,200);x.fillStyle='#8a8170';for(let k=0;k<4;k++){x.beginPath();x.arc(70+k*70,170,24,0,7);x.fill();x.fillRect(48+k*70,196,44,70)}
    x.fillStyle='#555';x.font='600 18px Inter';x.fillText('Il nostro staff (foto 2012)',24,305);x.fillStyle='#ddd';for(let k=0;k<6;k++)x.fillRect(340,90+k*30,270-k*25,14);
    x.fillStyle='#ccc';for(let k=0;k<3;k++)x.fillRect(20,330+k*28,560-k*80,14);
    if(dead){x.fillStyle='rgba(10,12,30,.82)';x.fillRect(0,0,640,440);x.strokeStyle='#ff2e4d';x.lineWidth=26;x.lineCap='round';x.beginPath();x.moveTo(250,150);x.lineTo(390,290);x.moveTo(390,150);x.lineTo(250,290);x.stroke()}});
  const scr=new THREE.Mesh(new THREE.PlaneGeometry(3.95,2.7),new THREE.MeshBasicMaterial({map:st.tx,toneMapped:false}));scr.position.z=.13;g.add(scr);
  const tabs=[];for(let i=0;i<10;i++){const b=new THREE.Mesh(new RoundedBoxGeometry(.9,.36,.12,2,.06),M([0xff2e4d,0x2d5bff,0x19c37d,0xffc53d,0xa36bff][i%5]));g.add(b);tabs.push(b)}sh(g);
  let last='';
  add3('old',g,(t)=>{const p=pop(t,ST('before')+.1,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(-.05,.4+Math.sin(t*1.1)*.25,0);g.position.y=Math.sin(t*1.5)*.08;
    const n=Math.floor(clamp((t-T(16))/.6)*10),dead=t>T(25)?1:0;const key=n+'_'+dead;if(key!==last){st.redraw(n,dead);last=key}
    tabs.forEach((b,i)=>{const q=pop(t,T(16)+i*.06,.3);b.visible=q.p>0&&!dead;b.scale.setScalar(Math.max(.001,q.s));const a=i/10*Math.PI*2;b.position.set(Math.cos(a)*2.6,Math.sin(a)*1.9,.4+Math.sin(t*2+i)*.2);b.rotation.z=Math.sin(i*1.7)*.4})})}
// trash bin + coins
{ const g=new THREE.Group();const pts=[];for(let i=0;i<=10;i++){const k=i/10;pts.push(new THREE.Vector2(.95+.3*k,-1.3+k*2.4))}
  const bin=new THREE.Mesh(new THREE.LatheGeometry(pts,48),M(0x9aa3b8,{metalness:.85,roughness:.3,side:THREE.DoubleSide}));g.add(bin);
  const bt=new THREE.Mesh(new THREE.CylinderGeometry(.95,.95,.05,48),M(0x9aa3b8,{metalness:.85}));bt.position.y=-1.3;g.add(bt);
  const rim=new THREE.Mesh(new THREE.TorusGeometry(1.25,.07,12,60),M(0xc9ced9,{metalness:.9}));rim.rotation.x=Math.PI/2;rim.position.y=1.1;g.add(rim);
  const coins=[];for(let i=0;i<8;i++){const c=new THREE.Mesh(coinGeo,gold());g.add(c);coins.push(c)}sh(g);
  add3('bin',g,(t)=>{const p=pop(t,ST('zero')+.05,.4);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.35,Math.sin(t*1.1)*.3,0);g.position.y=-.3+Math.sin(t*1.5)*.06;
    coins.forEach((c,i)=>{const d=t-(T(26)+i*.11);c.visible=d>0;const k=clamp(d/.6);c.position.set(Math.sin(i*2.1)*.5,lerp(3.4,-.9+i*.09,k*k),Math.cos(i*1.3)*.4);c.rotation.set(1+d*6*(1-k),i,0)})})}
// phone landing
const land=(x)=>{const gr=x.createLinearGradient(0,0,512,420);gr.addColorStop(0,'#13b4ff');gr.addColorStop(1,'#1d4bff');x.fillStyle=gr;x.fillRect(0,0,512,1024);
  x.fillStyle='#fff';x.font='800 26px Inter';x.fillText('Studio Dentistico Rossi',36,90);x.font='900 64px Inter';x.fillText('Sorriso',36,220);x.fillText('nuovo.',36,290);
  x.fillStyle='#fff';x.beginPath();x.roundRect(30,350,452,330,36);x.fill();x.fillStyle='#6b7185';x.font='700 30px Inter';x.fillText('Prima visita + igiene',60,420);
  x.fillStyle='#10131f';x.font='900 120px Inter';x.fillText('60 €',60,560);x.fillStyle='#19c37d';x.font='800 26px Inter';x.fillText('solo questo mese',62,620);
  x.fillStyle='#19c37d';x.beginPath();x.roundRect(30,730,452,120,60);x.fill();x.fillStyle='#fff';x.font='900 52px Inter';x.textAlign='center';x.fillText('PRENOTA',256,808);x.textAlign='left'};
{ const g=phone(0x10131f,land);
  add3('phone',g,(t)=>{const p=pop(t,ST('landing')+.1,.45);g.scale.setScalar(1.05*Math.max(.001,p.s));g.rotation.set(.05,lerp(Math.PI,0,eOut(prog(t,ST('landing')+.1,.7)))+Math.sin(t*1.2)*.25,Math.sin(t*.9)*.05);g.position.y=Math.sin(t*1.5)*.08})}
// tooth
{ const g=new THREE.Group();const mat=M(0xffffff,{roughness:.15,clearcoat:1});
  const crown=new THREE.Mesh(new RoundedBoxGeometry(2.4,1.7,1.9,6,.6),mat);crown.position.y=.7;g.add(crown);
  [[-.55,-.45],[.55,-.45],[-.55,.45],[.55,.45]].forEach(([x,z])=>{const c=new THREE.Mesh(new THREE.SphereGeometry(.6,32,16),mat);c.scale.set(1,.7,1);c.position.set(x,1.45,z*.8);g.add(c)});
  [-.6,.6].forEach(x=>{const r=new THREE.Mesh(new THREE.CapsuleGeometry(.42,1.1,8,24),mat);r.position.set(x,-.55,0);r.rotation.z=x*.22;g.add(r)});
  const sp=[];for(let i=0;i<6;i++){const s=new THREE.Mesh(new THREE.OctahedronGeometry(.16),M(0x13b4ff,{emissive:0x13b4ff,emissiveIntensity:.6}));g.add(s);sp.push(s)}sh(g);
  add3('tooth',g,(t)=>{const p=pop(t,ST('offer')+.1,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.15,t*.8,Math.sin(t)*.06);g.position.y=.1+Math.sin(t*1.5)*.1;
    sp.forEach((s,i)=>{const a=i/6*Math.PI*2+t;s.position.set(Math.cos(a)*2,.6+Math.sin(a*2)*.8,Math.sin(a)*1.3);s.rotation.set(t*2,t*3,0);s.scale.setScalar(.6+.4*Math.abs(Math.sin(t*4+i)))})})}
// bar chart growing
{ const g=new THREE.Group();const bars=[];const cols=[0x9aa3b8,0x9aa3b8,0x19c37d,0x19c37d,0x19c37d];
  for(let i=0;i<5;i++){const b=new THREE.Mesh(new RoundedBoxGeometry(.7,1,.7,3,.1),M(cols[i]));b.position.x=-2+i;g.add(b);bars.push(b)}
  const base=new THREE.Mesh(new RoundedBoxGeometry(5.4,.2,1.4,3,.08),M(0xffffff,{roughness:.4}));base.position.y=-1.6;g.add(base);
  const arr=new THREE.Group();const sh1=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,3.6,16),gold());sh1.rotation.z=-Math.PI/2+.55;arr.add(sh1);
  const hd=new THREE.Mesh(new THREE.ConeGeometry(.35,.7,24),gold());hd.position.set(1.55,1.02,0);hd.rotation.z=-Math.PI/2+.55;arr.add(hd);arr.position.set(0,.6,.8);g.add(arr);sh(g);
  const H=[.8,.9,1.8,2.6,3.4];
  add3('chart',g,(t)=>{const p=pop(t,ST('more')+.05,.4);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.2,-.4+Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.08;
    bars.forEach((b,i)=>{const k=i<2?1:eBack(prog(t,T(57)+(i-2)*.12,.4));const h=Math.max(.05,H[i]*k);b.scale.y=h;b.position.y=-1.5+h/2});
    const a=prog(t,T(59),.4);arr.visible=a>0;arr.scale.setScalar(Math.max(.001,eBack(a)))})}
// capsule stack
{ const g=new THREE.Group();const caps=[];const cols=[0xff3d7f,0xffc53d,0x2ee59d,0x13b4ff];
  ['SITI','GESTIONALI','APP','AI'].forEach((s,i)=>{const c=new THREE.Group();const m=new THREE.Mesh(new THREE.CapsuleGeometry(.55,2.6,8,24),M(cols[i]));m.rotation.z=Math.PI/2;c.add(m);
    const st=texCanvas(512,128,(x)=>{x.clearRect(0,0,512,128);x.fillStyle='#10131f';x.font='900 '+(s.length>5?64:80)+'px Inter';x.textAlign='center';x.fillText(s,256,94)});st.redraw();
    const lb=new THREE.Mesh(new THREE.PlaneGeometry(3,.75),new THREE.MeshBasicMaterial({map:st.tx,transparent:true,toneMapped:false}));lb.position.z=.56;c.add(lb);c.position.y=1.8-i*1.2;g.add(c);caps.push(c)});sh(g);
  add3('caps',g,(t)=>{g.rotation.set(-.05,Math.sin(t*1.1)*.4,0);g.position.y=Math.sin(t*1.5)*.08;
    caps.forEach((c,i)=>{const q=pop(t,T([67,68,69,70][i])-.03,.35);c.visible=q.p>0;c.scale.setScalar(Math.max(.001,q.s));c.position.x=lerp(i%2?3:-3,0,eOut(q.p))+Math.sin(t*2+i)*.12;c.rotation.x=Math.sin(t*1.5+i)*.2})})}
// night clock
{ const g=new THREE.Group();const body=new THREE.Mesh(new THREE.CylinderGeometry(1.7,1.7,.35,64),M(0x2d5bff,{metalness:.4}));body.rotation.x=Math.PI/2;g.add(body);
  const face=new THREE.Mesh(new THREE.CircleGeometry(1.5,64),M(0xf4f6ff,{roughness:.5,clearcoat:.3}));face.position.z=.18;g.add(face);
  for(let i=0;i<12;i++){const m=new THREE.Mesh(new RoundedBoxGeometry(.08,i%3?.18:.32,.04,1,.02),M(0x10131f));const a=i/12*Math.PI*2;m.position.set(Math.sin(a)*1.3,Math.cos(a)*1.3,.2);m.rotation.z=-a;g.add(m)}
  const hh=new THREE.Mesh(new RoundedBoxGeometry(.12,.8,.05,1,.03),M(0x10131f));hh.geometry.translate(0,.35,0);hh.position.z=.23;g.add(hh);
  const mh=new THREE.Mesh(new RoundedBoxGeometry(.08,1.15,.05,1,.03),M(0xff3d7f));mh.geometry.translate(0,.5,0);mh.position.z=.26;g.add(mh);
  const st=[];for(let i=0;i<8;i++){const s=new THREE.Mesh(new THREE.OctahedronGeometry(.13),M(0xffffff,{emissive:0xffffff,emissiveIntensity:.7}));g.add(s);st.push(s)}sh(g);
  add3('clock',g,(t)=>{const p=pop(t,ST('payoff')+.1,.45);const out=clamp((t-T(83)+.15)/.2);g.scale.setScalar(.95*Math.max(.001,p.s*(1-out)));g.rotation.set(0,Math.sin(t*.9)*.35,0);g.position.y=Math.sin(t*1.5)*.08;
    mh.rotation.z=-t*6;hh.rotation.z=-t*.5;st.forEach((s,i)=>{s.position.set(Math.cos(i*2.3)*2.6,Math.sin(i*1.7)*2,-.5);s.scale.setScalar(.5+.5*Math.abs(Math.sin(t*3+i)))})})}
const BOX={mega:[540,940,740],old:[540,900,720],bin:[540,920,680],phone:[540,900,700],tooth:[540,910,720],chart:[540,930,720],caps:[540,950,740],clock:[540,980,680]};
const SCN={
 ads(t){render3D('mega',t,BOX.mega);const c=pop(t,T(2)-.08,.35);withT(540,1460,c.s,c.a,()=>{card(170,1320,740,280);
   txt('Campagna attiva',230,1400,{size:34,w:700,c:'#6b7185'});txt(fmt(500*eOut(prog(t,T(4),.5)))+' €',850,1400,{size:56,w:900,al:'right'});
   const r=pop(t,T(9)-.05,.3);withT(540,1520,r.s,r.a,()=>{txt('Destinazione:',230,1530,{size:34,w:700,c:'#6b7185'});pill('Home page ⚠',700,1518,{size:32,bg:'#ff2e4d',c:'#fff'})})})},
 before(t){render3D('old',t,BOX.old);stampTxt('PRIMA',540,1400,t,T(11),'#ff2e4d',-.06,64);
   const c=pop(t,T(16)-.05,.3);withT(540,1520,c.s,c.a,()=>pill(Math.max(1,Math.round(10*clamp((t-T(16))/.6)))+' menu',540,1520,{size:44,bg:'#fff',c:'#10131f'}));
   stampTxt('FOTO 2012',540,1630,t,T(23),'#FFD60A',.05,44)},
 zero(t){render3D('bin',t,BOX.bin);const c=pop(t,T(26)-.1,.35);withT(540,1460,c.s,c.a,()=>{card(150,1300,780,320);
   txt('Pubblicità',200,1395,{size:42,w:700,c:'#6b7185'});txt(fmt(500*eOut(prog(t,T(26),.4)))+' €',880,1395,{size:54,w:900,al:'right'});
   const r=pop(t,T(28)-.05,.3);withT(540,1520,r.s,r.a,()=>{txt('Chiamate',200,1535,{size:42,w:700,c:'#6b7185'});txt('0',880,1540,{size:72,w:900,c:'#ff2e4d',al:'right'})})})},
 landing(t){render3D('phone',t,BOX.phone);stampTxt('DOPO',540,1420,t,T(30),'#ffffff',-.06,64);
   const q=pop(t,T(35)-.05,.3);withT(540,1560,q.s,q.a,()=>pill('1 campagna = 1 pagina',540,1560,{size:44,bg:'#fff',c:'#008f9e'}))},
 offer(t){render3D('tooth',t,BOX.tooth);const c=pop(t,T(39)-.1,.35);withT(540,1440,c.s,c.a,()=>{card(140,1260,800,360);
   [['Titolo chiaro',T(40)],['Prima visita + igiene 60 €',T(42)],['Un solo pulsante',T(51)]].forEach(([s,tt],i)=>{const y=1340+i*80;const r=prog(t,tt-.05,.2);check(200,y-14,26,prog(t,tt,.35));ctx.globalAlpha*=r;txt(s,250,y,{size:38,w:800});ctx.globalAlpha=c.a});
   const b=pop(t,T(54)-.05,.3);const press=t>T(54)&&t<T(54)+.18?.94:1;withT(540,1570,b.s*press,b.a,()=>pill('PRENOTA',540,1570,{size:44,bg:'#19c37d',c:'#fff'}))})},
 more(t){render3D('chart',t,BOX.chart);const c=pop(t,T(55)-.08,.35);withT(540,1470,c.s,c.a,()=>{card(170,1330,740,270);
   txt('Budget',230,1410,{size:38,w:700,c:'#6b7185'});txt('stesso',850,1410,{size:44,w:900,al:'right'});
   const r=pop(t,T(58)-.05,.3);withT(540,1520,r.s,r.a,()=>{txt('Richieste',230,1535,{size:38,w:700,c:'#6b7185'});txt('▲▲▲',850,1538,{size:46,w:900,c:'#19c37d',al:'right'})})})},
 all(t){render3D('caps',t,BOX.caps);const z=pop(t,T(72)-.05,.35);withT(540,1580,z.s,z.a,()=>pill('Qualsiasi cosa',540,1580,{size:48,bg:'#2EE59D',c:'#10131f'}))},
 payoff(t){render3D('clock',t,BOX.clock);if(t>=T(83)-.05)drawLogo(t,T(83)-.05,540,1060,700)},
};
