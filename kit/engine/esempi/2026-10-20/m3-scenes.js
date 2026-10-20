const ST=n=>SC.find(s=>s.name===n).t0;
const SP={intro:['night','navy2','night','navy'],one:['navy','violet','navy','red','navy2'],two:['orange','red','orange','pink'],three:['grey','red','grey','orange','grey'],
 bot:['blue','teal','blue','violet','blue'],drive:['green','teal','green'],link:['violet','blue','violet'],payoff:['night','navy','navy2'],cta:['blue','violet','green','navy']};
function labelTex(s,w=256,h=256,col='#fff',size=150){const st=texCanvas(w,h,(x)=>{x.clearRect(0,0,w,h);x.fillStyle=col;x.font='900 '+size+'px Inter';x.textAlign='center';x.fillText(s,w/2,h*.7)});st.redraw();return st}
// car
{ const g=new THREE.Group();const red=M(0xff2e4d,{metalness:.6,roughness:.2});const low=new THREE.Mesh(new RoundedBoxGeometry(4.4,1,2,5,.35),red);low.position.y=-.6;g.add(low);
  const cab=new THREE.Mesh(new RoundedBoxGeometry(2.4,.95,1.8,5,.4),red);cab.position.set(-.2,.25,0);g.add(cab);
  const glass=M(0x10131f,{metalness:.5,roughness:.05});const gw=new THREE.Mesh(new RoundedBoxGeometry(2.2,.65,1.84,4,.25),glass);gw.position.set(-.2,.3,0);g.add(gw);
  [[-1.4,1],[1.4,1],[-1.4,-1],[1.4,-1]].forEach(([x,z])=>{const w=new THREE.Mesh(new THREE.CylinderGeometry(.5,.5,.4,32),M(0x1a1c26,{roughness:.6,clearcoat:.2}));w.rotation.x=Math.PI/2;w.position.set(x,-1.05,z*.9);g.add(w);
    const r=new THREE.Mesh(new THREE.CylinderGeometry(.28,.28,.42,24),M(0xc9ced9,{metalness:1,roughness:.2}));r.rotation.x=Math.PI/2;r.position.set(x,-1.05,z*.9);g.add(r)});
  [-.6,.6].forEach(z=>{const h=new THREE.Mesh(new THREE.SphereGeometry(.16,16,12),M(0xffffff,{emissive:0xfff2b0,emissiveIntensity:1.5}));h.position.set(2.2,-.45,z);g.add(h)});sh(g);
  add3('car',g,(t)=>{const p=pop(t,0,.4);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.18,-.7+Math.sin(t*1.1)*.4,0);g.position.y=.2+Math.sin(t*1.5)*.06})}
// chat bubble with typing dots
{ const g=new THREE.Group();const b=new THREE.Mesh(new RoundedBoxGeometry(3.6,2.4,.6,6,.5),M(0xffffff,{roughness:.3}));g.add(b);
  const tail=new THREE.Mesh(new THREE.ConeGeometry(.45,.9,4),M(0xffffff,{roughness:.3}));tail.position.set(-1.1,-1.4,0);tail.rotation.z=Math.PI*.85;g.add(tail);
  const dots=[];for(let i=0;i<3;i++){const d=new THREE.Mesh(new THREE.SphereGeometry(.26,24,16),M(0x6a2cf5));d.position.set(-.8+i*.8,0,.35);g.add(d);dots.push(d)}
  const q=labelTex('?',256,256,'#ff2e4d',220);const qm=new THREE.Mesh(new THREE.PlaneGeometry(1.6,1.6),new THREE.MeshBasicMaterial({map:q.tx,transparent:true,toneMapped:false}));qm.position.set(0,-.1,.32);g.add(qm);sh(g);
  add3('bubble',g,(t)=>{const p=pop(t,ST('one')+.1,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.05,.35+Math.sin(t*1.1)*.3,0);g.position.y=.2+Math.sin(t*1.5)*.08;
    const dead=t>=T(25);dots.forEach((d,i)=>{d.visible=!dead;d.position.y=Math.max(0,Math.sin(t*8-i*.8))*.3});qm.visible=dead;qm.scale.setScalar(dead?Math.max(.001,eBack(prog(t,T(25),.35))):.001);
    b.material.color.set(dead?0xffe5ea:0xffffff)})}
// notification bell with badge
{ const g=new THREE.Group();const pts=[];for(let i=0;i<=20;i++){const k=i/20;pts.push(new THREE.Vector2(.15+1.25*Math.pow(k,1.8)+(k>.9?(k-.9)*3:0),1.4-k*2.6))}
  const bell=new THREE.Mesh(new THREE.LatheGeometry(pts,56),M(0xffc53d,{metalness:.9,roughness:.2,side:THREE.DoubleSide}));g.add(bell);
  const knob=new THREE.Mesh(new THREE.TorusGeometry(.22,.07,12,24),M(0xffc53d,{metalness:.9}));knob.position.y=1.55;g.add(knob);
  const cl=new THREE.Mesh(new THREE.SphereGeometry(.28,24,16),M(0xffc53d,{metalness:.9}));cl.position.y=-1.4;g.add(cl);
  const badge=new THREE.Group();const bd=new THREE.Mesh(new THREE.CylinderGeometry(.75,.75,.3,40),M(0xff2e4d));bd.rotation.x=Math.PI/2;badge.add(bd);
  const nt=texCanvas(256,256,(x,n=0)=>{x.clearRect(0,0,256,256);x.fillStyle='#fff';x.font='900 150px Inter';x.textAlign='center';x.fillText(String(n),128,180)});nt.redraw(0);
  const nm=new THREE.Mesh(new THREE.PlaneGeometry(1.3,1.3),new THREE.MeshBasicMaterial({map:nt.tx,transparent:true,toneMapped:false}));nm.position.z=.16;badge.add(nm);badge.position.set(1.15,1.05,.6);g.add(badge);sh(g);let last=-1;
  add3('bell',g,(t)=>{const p=pop(t,ST('two')+.1,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.position.y=Math.sin(t*1.5)*.08;
    const ring=t>T(31)&&t<T(31)+1.2?Math.sin((t-T(31))*30)*.25*(1-(t-T(31))/1.2):0;g.rotation.set(0,Math.sin(t*1.1)*.3,ring);
    const n=Math.round(20*eOut(prog(t,T(31),.5)));if(n!==last){nt.redraw(n);last=n}const q=pop(t,T(31)-.03,.3);badge.visible=q.p>0;badge.scale.setScalar(Math.max(.001,q.s))})}
// repeat loop arrow
{ const g=new THREE.Group();const arc=new THREE.Mesh(new THREE.TorusGeometry(1.6,.3,20,80,Math.PI*1.6),M(0xff9f43,{metalness:.3}));g.add(arc);
  const hd=new THREE.Mesh(new THREE.ConeGeometry(.6,1,32),M(0xff9f43,{metalness:.3}));const a=Math.PI*1.6;hd.position.set(Math.cos(a)*1.6,Math.sin(a)*1.6,0);hd.rotation.z=a;g.add(hd);
  const x=labelTex('×100',512,256,'#10131f',170);const xm=new THREE.Mesh(new THREE.PlaneGeometry(2.4,1.2),new THREE.MeshBasicMaterial({map:x.tx,transparent:true,toneMapped:false}));xm.position.z=.1;
  const disc=new THREE.Mesh(new THREE.CylinderGeometry(1.15,1.15,.2,48),M(0xffffff,{roughness:.4}));disc.rotation.x=Math.PI/2;const c=new THREE.Group();c.add(disc);c.add(xm);xm.position.z=.12;g.add(c);sh(g);
  add3('loop',g,(t)=>{const p=pop(t,ST('three')+.1,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.position.y=Math.sin(t*1.5)*.08;g.rotation.set(0,Math.sin(t*1.1)*.35,0);
    arc.rotation.z=-t*3;hd.position.set(Math.cos(a-t*3)*1.6,Math.sin(a-t*3)*1.6,0);hd.rotation.z=a-t*3;const q=pop(t,T(45)-.03,.3);c.visible=q.p>0;c.scale.setScalar(Math.max(.001,q.s))})}
// robot head
{ const g=new THREE.Group();const head=new THREE.Mesh(new RoundedBoxGeometry(3,2.4,2.2,6,.6),M(0xffffff,{roughness:.25}));g.add(head);
  const vis=new THREE.Mesh(new RoundedBoxGeometry(2.4,1.3,.2,4,.3),M(0x10131f,{roughness:.1}));vis.position.set(0,.05,1.05);g.add(vis);
  const eyes=[];[-.55,.55].forEach(x=>{const e=new THREE.Mesh(new THREE.CapsuleGeometry(.16,.3,6,16),M(0x2ee59d,{emissive:0x2ee59d,emissiveIntensity:1.4}));e.position.set(x,.1,1.17);g.add(e);eyes.push(e)});
  [-1.6,1.6].forEach(x=>{const ear=new THREE.Mesh(new THREE.CylinderGeometry(.35,.35,.3,32),M(0x13b4ff));ear.rotation.z=Math.PI/2;ear.position.x=x;g.add(ear)});
  const ant=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.7,12),M(0xc9ced9,{metalness:1}));ant.position.y=1.55;g.add(ant);
  const ball=new THREE.Mesh(new THREE.SphereGeometry(.2,24,16),M(0xff2e4d,{emissive:0xff2e4d,emissiveIntensity:.6}));ball.position.y=1.95;g.add(ball);sh(g);
  add3('robot',g,(t)=>{const p=pop(t,ST('bot')+.1,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.05,Math.sin(t*1.2)*.4,Math.sin(t*1.6)*.05);g.position.y=Math.sin(t*1.5)*.1;
    const bl=(t%2.4)<.12?.15:1;eyes.forEach(e=>e.scale.y=bl);ball.material.emissiveIntensity=.4+.6*Math.abs(Math.sin(t*5))})}
// steering wheel
{ const g=new THREE.Group();const rim=new THREE.Mesh(new THREE.TorusGeometry(1.7,.22,20,80),M(0x1a1c26,{roughness:.4,clearcoat:.4}));g.add(rim);
  const hub=new THREE.Mesh(new THREE.CylinderGeometry(.55,.55,.35,40),M(0xc9ced9,{metalness:1,roughness:.2}));hub.rotation.x=Math.PI/2;g.add(hub);
  [Math.PI/2,Math.PI*7/6,-Math.PI/6].forEach(a=>{const s=new THREE.Mesh(new RoundedBoxGeometry(.3,1.3,.15,2,.06),M(0x2a2e40));s.position.set(Math.cos(a)*.95,Math.sin(a)*.95,0);s.rotation.z=a-Math.PI/2;g.add(s)});
  const lg=new THREE.Mesh(new THREE.CircleGeometry(.4,32),M(0x19c37d,{emissive:0x19c37d,emissiveIntensity:.4}));lg.position.z=.18;g.add(lg);sh(g);
  add3('wheel',g,(t)=>{const p=pop(t,ST('drive')+.1,.45);g.scale.setScalar(.9*Math.max(.001,p.s));g.rotation.set(-.2,Math.sin(t*1.1)*.3,Math.sin(t*1.8)*.5);g.position.y=Math.sin(t*1.5)*.08})}
// chain links
{ const g=new THREE.Group();const a=new THREE.Mesh(new THREE.TorusGeometry(1.1,.3,20,60),M(0x13b4ff,{metalness:.5}));a.scale.set(1.3,.8,1);a.position.x=-.95;g.add(a);
  const b=new THREE.Mesh(new THREE.TorusGeometry(1.1,.3,20,60),M(0x2ee59d,{metalness:.5}));b.scale.set(1.3,.8,1);b.rotation.x=Math.PI/2;b.position.x=.95;g.add(b);sh(g);
  add3('chain',g,(t)=>{const p=pop(t,ST('link')+.1,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.3,t*.7,.15);g.position.y=Math.sin(t*1.5)*.08;
    const k=eBack(prog(t,T(74)-.05,.4));a.position.x=lerp(-2.4,-.95,k);b.position.x=lerp(2.4,.95,k)})}
// street lamp
{ const g=new THREE.Group();const pole=new THREE.Mesh(new THREE.CylinderGeometry(.12,.18,4.2,20),M(0x2a2e40,{metalness:.7}));pole.position.y=-.4;g.add(pole);
  const arm=new THREE.Mesh(new THREE.TorusGeometry(.6,.08,12,40,Math.PI),M(0x2a2e40,{metalness:.7}));arm.position.set(.6,1.7,0);g.add(arm);
  const head=new THREE.Mesh(new THREE.ConeGeometry(.55,.6,32,1,true),M(0x2a2e40,{metalness:.7,side:THREE.DoubleSide}));head.position.set(1.2,1.45,0);g.add(head);
  const bulb=new THREE.Mesh(new THREE.SphereGeometry(.28,24,16),M(0xffe08a,{emissive:0xffc53d,emissiveIntensity:2}));bulb.position.set(1.2,1.2,0);g.add(bulb);
  const base=new THREE.Mesh(new THREE.CylinderGeometry(.4,.5,.4,24),M(0x2a2e40));base.position.y=-2.5;g.add(base);
  const cone=new THREE.Mesh(new THREE.ConeGeometry(1.5,3.4,40,1,true),new THREE.MeshBasicMaterial({color:0xffe08a,transparent:true,opacity:.14,side:THREE.DoubleSide,depthWrite:false}));cone.position.set(1.2,-.5,0);g.add(cone);
  const st=[];for(let i=0;i<8;i++){const s=new THREE.Mesh(new THREE.OctahedronGeometry(.13),M(0xffffff,{emissive:0xffffff,emissiveIntensity:.7}));g.add(s);st.push(s)}
  pole.castShadow=true;base.castShadow=true;
  add3('lamp',g,(t)=>{const p=pop(t,ST('payoff')+.1,.45);const out=clamp((t-T(88)+.15)/.2);g.scale.setScalar(.85*Math.max(.001,p.s*(1-out)));g.rotation.set(0,-.3+Math.sin(t*.9)*.3,0);g.position.y=Math.sin(t*1.5)*.06;
    st.forEach((s,i)=>{s.position.set(Math.cos(i*2.3)*2.6-.3,1+Math.sin(i*1.7)*1.4,-.8);s.scale.setScalar(.5+.5*Math.abs(Math.sin(t*3+i)))})})}
const BOX={car:[540,930,780],bubble:[540,880,640],bell:[540,920,680],loop:[540,900,640],robot:[540,900,660],wheel:[540,900,640],chain:[540,920,700],lamp:[540,960,720]};
function bubbleMsg(s,x,y,w,me,a){ctx.save();ctx.globalAlpha*=a;const lines=wrapLines(s,w-60,34,700);const h=lines.length*46+36;rr(x,y,w,h,28);ctx.fillStyle=me?'#e8f0ff':'#2d5bff';ctx.fill();
  lines.forEach((l,i)=>txt(l,x+30,y+56+i*46,{size:34,w:700,c:me?'#10131f':'#fff'}));ctx.restore();return h}
const SCN={
 intro(t){render3D('car',t,BOX.car);stampTxt('CLIENTI PERSI',540,1470,t,T(7),'#ff2e4d',-.06,56)},
 one(t){render3D('bubble',t,BOX.bubble);const c=pop(t,T(11)-.1,.35);withT(540,1430,c.s,c.a,()=>{card(130,1200,820,440);
   txt('Sito · Chat',180,1270,{size:32,w:800,c:'#6b7185'});txt(t>=T(12)?'23:04':'',900,1270,{size:32,w:800,c:'#6b7185',al:'right'});
   const m=pop(t,T(19)-.05,.3);if(m.a>0)bubbleMsg('Quanto vale la mia permuta?',180,1300,620,true,m.a);
   const n=prog(t,T(25)-.03,.25);if(n>0){ctx.globalAlpha*=n;txt('Nessuna risposta',540,1560,{size:40,w:900,c:'#ff2e4d',al:'center'});ctx.globalAlpha=c.a}})},
 two(t){render3D('bell',t,BOX.bell);const c=pop(t,T(28)-.1,.35);withT(540,1460,c.s,c.a,()=>{card(170,1320,740,280);
   txt('Messaggi del mattino',230,1400,{size:34,w:700,c:'#6b7185'});txt(String(Math.round(20*eOut(prog(t,T(31),.5)))),850,1405,{size:56,w:900,al:'right'});
   const k=prog(t,T(34),.5);bar(230,1460,620,36,1,'#19c37d');if(k>0){rr(230+620*(1-.5*eOut(k)),1460,620*.5*eOut(k),36,18);ctx.fillStyle='#ff2e4d';ctx.fill()}
   ctx.globalAlpha*=prog(t,T(38),.3);txt('10 dalla concorrenza',850,1555,{size:32,w:800,c:'#ff2e4d',al:'right'});ctx.globalAlpha=c.a})},
 three(t){render3D('loop',t,BOX.loop);const items=[['Orari?',T(49),'#ffc53d'],['Finanziamento?',T(50),'#13b4ff'],['Disponibile?',T(52),'#ff3d7f']];
   items.forEach(([s,tt,col],i)=>{const q=pop(t,tt-.05,.3);withT(540,1380+i*110,q.s,q.a,()=>pill(s,540,1380+i*110,{size:42,bg:'#fff',c:'#10131f'}))})},
 bot(t){render3D('robot',t,BOX.robot);const c=pop(t,T(58)-.1,.35);withT(540,1440,c.s,c.a,()=>{card(130,1250,820,360);
   bubbleMsg('Quanto vale la mia permuta?',270,1280,640,true,1);const m=pop(t,T(59)-.05,.3);if(m.a>0)bubbleMsg('Ciao! Dimmi modello e km: ti faccio subito una stima.',170,1400,700,false,m.a)});
   const q=pop(t,T(60)-.05,.3);withT(540,690,q.s,q.a,()=>pill('24 / 7',540,690,{size:48,bg:'#2EE59D',c:'#10131f'}))},
 drive(t){render3D('wheel',t,BOX.wheel);const c=pop(t,T(65)-.1,.35);withT(540,1450,c.s,c.a,()=>{card(150,1300,780,300);
   txt('AGENDA',210,1375,{size:30,w:900,c:'#19c37d',ls:2});txt('Sabato · 10:00',210,1450,{size:46,w:900});txt('Test drive · Mario Rossi',210,1510,{size:34,w:700,c:'#6b7185'});
   check(860,1440,40,prog(t,T(70),.35))})},
 link(t){render3D('chain',t,BOX.chain);const q=pop(t,T(74)-.05,.3);withT(540,1500,q.s,q.a,()=>pill('Chatbot  ⇄  Gestionale',540,1500,{size:46,bg:'#fff',c:'#6a2cf5'}))},
 payoff(t){render3D('lamp',t,BOX.lamp);if(t>=T(88)-.05)drawLogo(t,T(88)-.05,540,1060,700)},
};
