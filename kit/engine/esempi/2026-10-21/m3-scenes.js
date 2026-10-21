const ST=n=>SC.find(s=>s.name===n).t0;
function labelTex(s,w=256,h=256,col='#fff',size=150){const st=texCanvas(w,h,(x)=>{x.clearRect(0,0,w,h);x.fillStyle=col;x.font='900 '+size+'px Inter';x.textAlign='center';x.fillText(s,w/2,h*.7)});st.redraw();return st}
const SP={luca:['orange','wood'],late:['night','navy2','night','grey','navy'],sw:['blue','violet','blue'],app:['teal','green','teal'],mat:['orange','red','orange'],
 quote:['green','mint','green','teal','green'],sofa:['pink','violet','pink'],all:['navy2','violet','blue','navy2'],payoff:['night','navy','navy2'],cta:['blue','violet','green','navy']};
// hard hat
{ const g=new THREE.Group();const y=M(0xffc53d,{roughness:.25});
  const dome=new THREE.Mesh(new THREE.SphereGeometry(1.5,48,32,0,Math.PI*2,0,Math.PI/2),y);g.add(dome);
  const brim=new THREE.Mesh(new THREE.CylinderGeometry(1.95,1.95,.12,56),y);brim.scale.z=1.15;brim.position.set(0,.02,.25);g.add(brim);
  const ridge=new THREE.Mesh(new THREE.TorusGeometry(1.5,.12,12,60,Math.PI),y);ridge.rotation.y=Math.PI/2;g.add(ridge);
  const lab=labelTex('L',256,256,'#10131f',170);const lm=new THREE.Mesh(new THREE.CircleGeometry(.45,32),new THREE.MeshBasicMaterial({map:lab.tx,transparent:true,toneMapped:false}));lm.position.set(0,.75,1.3);lm.rotation.x=-.5;g.add(lm);
  g.position.y=-.5;const w=new THREE.Group();w.add(g);sh(w);
  add3('hat',w,(t)=>{const p=pop(t,0,.4);w.scale.setScalar(.85*Math.max(.001,p.s));w.rotation.set(.12,-.4+Math.sin(t*1.1)*.4,0);w.position.y=Math.sin(t*1.5)*.07})}
// paper stack + desk lamp light
{ const g=new THREE.Group();const sheets=[];for(let i=0;i<9;i++){const s=new THREE.Mesh(new RoundedBoxGeometry(2.6,.06,3.4,2,.02),M(i%3?0xffffff:0xf2f2e6,{roughness:.6,clearcoat:.2}));s.position.set(Math.sin(i*1.9)*.15,-1.2+i*.08,Math.cos(i*1.3)*.15);s.rotation.y=Math.sin(i*2.7)*.25;g.add(s);sheets.push(s)}
  const top=texCanvas(256,340,(x)=>{x.fillStyle='#fff';x.fillRect(0,0,256,340);x.fillStyle='#10131f';x.font='800 26px Inter';x.fillText('Cantiere 3',20,40);x.strokeStyle='#c9ced9';
    for(let r=0;r<8;r++){x.beginPath();x.moveTo(20,70+r*32);x.lineTo(236,70+r*32);x.stroke();x.fillStyle='#2d5bff';x.font='600 20px Inter';x.fillText(['Mario 8h','Luigi 7h','Sabbia 2q','Cemento 6','Gino 8h','Tubi 12m','Piastr. 20','Colla 3'][r],24,92+r*32)}});top.redraw();
  const tm=new THREE.Mesh(new THREE.PlaneGeometry(2.5,3.3),new THREE.MeshBasicMaterial({map:top.tx,toneMapped:false}));tm.rotation.x=-Math.PI/2;tm.position.y=-1.2+9*.08+.01;g.add(tm);
  const pen=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,2.2,16),M(0x2d5bff));pen.rotation.set(Math.PI/2,0,.6);pen.position.set(1.2,-.35,.6);g.add(pen);
  const clock=new THREE.Group();const cf=new THREE.Mesh(new THREE.CylinderGeometry(.75,.75,.15,48),M(0xffffff));cf.rotation.x=Math.PI/2;clock.add(cf);
  const cr=new THREE.Mesh(new THREE.TorusGeometry(.75,.08,12,48),M(0xff2e4d));clock.add(cr);const ch=new THREE.Mesh(new RoundedBoxGeometry(.07,.42,.05,2,.02),M(0x10131f));ch.geometry.translate(0,.18,0);ch.position.z=.1;ch.rotation.z=Math.PI/3;clock.add(ch);
  const cm=new THREE.Mesh(new RoundedBoxGeometry(.05,.58,.05,2,.02),M(0x10131f));cm.geometry.translate(0,.26,0);cm.position.z=.12;clock.add(cm);clock.position.set(-1.4,1.3,0);g.add(clock);sh(g);
  add3('papers',g,(t)=>{const p=pop(t,ST('late')+.1,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.45,-.3+Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.06;
    clock.rotation.set(-.45,0,0);cm.rotation.z=-t*2;sheets.forEach((s,i)=>s.position.x=Math.sin(i*1.9)*.15+Math.sin(t*2+i)*.03)})}
// laptop opening with custom software
{ const g=new THREE.Group();const base=new THREE.Mesh(new RoundedBoxGeometry(3.8,.18,2.5,4,.08),M(0x2a2e40,{metalness:.8,roughness:.25}));base.position.y=-1;g.add(base);
  const lid=new THREE.Group();const lb=new THREE.Mesh(new RoundedBoxGeometry(3.8,2.5,.12,4,.08),M(0x2a2e40,{metalness:.8,roughness:.25}));lb.position.y=1.25;lid.add(lb);
  const st=texCanvas(512,340,(x)=>{x.fillStyle='#f4f6ff';x.fillRect(0,0,512,340);x.fillStyle='#ff9f43';x.fillRect(0,0,512,56);x.fillStyle='#fff';x.font='900 28px Inter';x.fillText('Cantieri · Luca Edilizia',20,38);
    [['Via Roma 12','68%','#19c37d'],['Villa Neri','35%','#ffc53d'],['Bagno Rossi','90%','#2d5bff']].forEach(([n,v,c],i)=>{x.fillStyle='#fff';x.beginPath();x.roundRect(20,76+i*86,472,70,14);x.fill();
      x.fillStyle='#10131f';x.font='800 24px Inter';x.fillText(n,40,118+i*86);x.fillStyle='#eef0f6';x.fillRect(250,104+i*86,170,14);x.fillStyle=c;x.fillRect(250,104+i*86,170*parseInt(v)/100,14);x.fillStyle='#10131f';x.fillText(v,430,118+i*86)})});st.redraw();
  const s=new THREE.Mesh(new THREE.PlaneGeometry(3.5,2.25),new THREE.MeshBasicMaterial({map:st.tx,toneMapped:false}));s.position.set(0,1.25,.07);lid.add(s);lid.position.set(0,-.95,-1.2);g.add(lid);
  const tape=new THREE.Group();const tb=new THREE.Mesh(new RoundedBoxGeometry(.9,.9,.4,4,.15),M(0xffc53d));tape.add(tb);const tt=new THREE.Mesh(new RoundedBoxGeometry(1.4,.22,.04,2,.02),M(0xc9ced9,{metalness:1}));tt.position.set(.9,-.3,0);tape.add(tt);tape.position.set(2.3,-.55,.6);g.add(tape);sh(g);
  add3('laptop',g,(t)=>{const p=pop(t,ST('sw')+.1,.45);g.scale.setScalar(.78*Math.max(.001,p.s));g.rotation.set(.25,-.4+Math.sin(t*.9)*.3,0);g.position.y=Math.sin(t*1.5)*.06;
    lid.rotation.x=-lerp(1.45,.15,eOut(prog(t,ST('sw')+.15,.7)));const q=pop(t,T(28)-.05,.35);tape.visible=q.p>0;tape.scale.setScalar(Math.max(.001,q.s));tt.scale.x=lerp(.2,1,eOut(prog(t,T(28),.4)));tt.position.x=.45+.45*eOut(prog(t,T(28),.4))})}
// phone: hours + photo
{ const scr=(x,s=0)=>{x.fillStyle='#f4f6ff';x.fillRect(0,0,512,1024);x.fillStyle='#ff9f43';x.fillRect(0,0,512,150);x.fillStyle='#fff';x.font='900 40px Inter';x.fillText('Cantiere',40,100);
    x.fillStyle='#fff';x.beginPath();x.roundRect(30,190,452,180,28);x.fill();x.fillStyle='#6b7185';x.font='700 28px Inter';x.fillText('Ore di oggi',60,245);x.fillStyle='#10131f';x.font='900 80px Inter';x.fillText(s>=1?'8 h':'— h',60,340);
    x.fillStyle='#fff';x.beginPath();x.roundRect(30,400,452,380,28);x.fill();
    if(s>=2){const gr=x.createLinearGradient(60,430,450,750);gr.addColorStop(0,'#8ec5ff');gr.addColorStop(1,'#d9b38c');x.fillStyle=gr;x.beginPath();x.roundRect(60,430,392,300,18);x.fill();
      x.fillStyle='#b5651d';for(let r=0;r<5;r++)for(let c=0;c<6;c++){x.fillRect(80+c*62+(r%2)*30,600+r*26,56,22)}x.fillStyle='#fff';x.font='800 26px Inter';x.fillText('Foto caricata',150,765)}
    else{x.fillStyle='#a3a8b8';x.font='700 30px Inter';x.fillText('+ Foto',190,600)}};
  const g=phone(0x10131f,scr);let last=-1;
  add3('phone',g,(t)=>{const p=pop(t,ST('app')+.1,.45);g.scale.setScalar(.95*Math.max(.001,p.s));g.rotation.set(.05,.3+Math.sin(t*1.1)*.25,Math.sin(t*.9)*.04);g.position.y=Math.sin(t*1.5)*.07;
    const s=t>=T(35)?2:t>=T(33)?1:0;if(s!==last){g.userData.st.redraw(s);last=s}})}
// bricks pallet decreasing
{ const g=new THREE.Group();const bg=new RoundedBoxGeometry(.9,.4,.45,2,.05);const br=[];
  for(let l=0;l<4;l++)for(let r=0;r<2;r++)for(let c=0;c<3;c++){const b=new THREE.Mesh(bg,M(0xc8552a,{roughness:.6,clearcoat:.2}));b.position.set(-1+c*1+(l%2)*.0,-1.1+l*.43,-.25+r*.5);g.add(b);br.push(b)}
  const pal=new THREE.Mesh(new RoundedBoxGeometry(3.3,.25,1.4,2,.04),M(0xd08a45,{roughness:.7,clearcoat:.1}));pal.position.y=-1.5;g.add(pal);sh(g);
  add3('bricks',g,(t)=>{const p=pop(t,ST('mat')+.1,.45);g.scale.setScalar(.95*Math.max(.001,p.s));g.rotation.set(.35,-.4+Math.sin(t*1.1)*.35,0);g.position.y=Math.sin(t*1.5)*.06;
    br.forEach((b,i)=>{const k=br.length-1-i;const tt=T(41)+k*.05;const q=prog(t,tt,.3);b.visible=k>=8||q<1;if(k<8){b.position.y=-1.1+Math.floor(i/6)*.43+eOut(q)*2.5;b.scale.setScalar(Math.max(.001,1-q))}})})}
// document sheet with seal
{ const g=new THREE.Group();const st=texCanvas(512,700,(x,n=0)=>{x.fillStyle='#fff';x.fillRect(0,0,512,700);x.fillStyle='#19c37d';x.fillRect(0,0,512,90);x.fillStyle='#fff';x.font='900 44px Inter';x.fillText('PREVENTIVO',40,62);
    x.fillStyle='#10131f';x.font='800 30px Inter';x.fillText('Rossi Srl · Bagno',40,150);x.font='600 26px Inter';
    [['Manodopera','4.200'],['Materiali','6.150'],['Smaltimento','830'],['Impianti','1.300']].forEach(([a,b],i)=>{if(i<n){x.fillStyle='#6b7185';x.fillText(a,40,220+i*60);x.fillStyle='#10131f';x.textAlign='right';x.fillText('€ '+b,470,220+i*60);x.textAlign='left'}});
    if(n>=4){x.fillStyle='#eef0f6';x.fillRect(40,470,430,4);x.fillStyle='#10131f';x.font='900 40px Inter';x.fillText('Totale',40,540);x.textAlign='right';x.fillText('€ 12.480',470,540);x.textAlign='left'}});st.redraw(0);
  const sheet=new THREE.Mesh(new RoundedBoxGeometry(2.6,3.55,.06,2,.03),M(0xffffff,{roughness:.5}));g.add(sheet);
  const face=new THREE.Mesh(new THREE.PlaneGeometry(2.56,3.5),new THREE.MeshBasicMaterial({map:st.tx,toneMapped:false}));face.position.z=.035;g.add(face);
  const seal=new THREE.Group();const sd=new THREE.Mesh(new THREE.CylinderGeometry(.55,.55,.18,6),M(0x19c37d,{metalness:.4}));sd.rotation.x=Math.PI/2;seal.add(sd);
  const ct=texCanvas(256,256,(x)=>{x.clearRect(0,0,256,256);x.strokeStyle='#fff';x.lineWidth=34;x.lineCap='round';x.lineJoin='round';x.beginPath();x.moveTo(60,135);x.lineTo(110,185);x.lineTo(200,85);x.stroke()});ct.redraw();
  const cm=new THREE.Mesh(new THREE.PlaneGeometry(.8,.8),new THREE.MeshBasicMaterial({map:ct.tx,transparent:true,toneMapped:false}));cm.position.z=.1;seal.add(cm);seal.position.set(1.0,-1.45,.25);g.add(seal);sh(g);let last=-1;
  add3('doc',g,(t)=>{const p=pop(t,ST('quote')+.1,.45);g.scale.setScalar(.95*Math.max(.001,p.s));g.rotation.set(-.05,-.35+Math.sin(t*1.1)*.25,Math.sin(t*.9)*.03);g.position.y=lerp(-2,0,eOut(prog(t,ST('quote')+.1,.5)))+Math.sin(t*1.5)*.06;
    const n=Math.min(4,Math.max(0,Math.floor((t-T(46))/.35)+1));if(n!==last){st.redraw(n);last=n}const q=pop(t,T(52)-.03,.3);seal.visible=q.p>0;seal.scale.setScalar(Math.max(.001,q.s))})}
// sofa
{ const g=new THREE.Group();const c=M(0x6a2cf5,{roughness:.55,clearcoat:.3});
  const seat=new THREE.Mesh(new RoundedBoxGeometry(3.6,.6,1.6,4,.25),c);seat.position.y=-.6;g.add(seat);
  const back=new THREE.Mesh(new RoundedBoxGeometry(3.6,1.4,.5,4,.22),c);back.position.set(0,.2,-.6);g.add(back);
  [-1.95,1.95].forEach(x=>{const a=new THREE.Mesh(new RoundedBoxGeometry(.5,1.1,1.7,4,.22),c);a.position.set(x,-.35,0);g.add(a)});
  [-1.6,1.6].forEach(x=>[-.6,.6].forEach(z=>{const l=new THREE.Mesh(new THREE.CylinderGeometry(.08,.05,.35,12),M(0xd08a45));l.position.set(x,-1.07,z);g.add(l)}));
  const cush=new THREE.Mesh(new RoundedBoxGeometry(.9,.9,.3,4,.14),M(0xffc53d,{roughness:.6}));cush.position.set(-1.1,.1,-.25);cush.rotation.z=.2;g.add(cush);
  const zs=[];for(let i=0;i<3;i++){const zt=labelTex('Z',256,256,'#fff',180);const m=new THREE.Mesh(new THREE.PlaneGeometry(.6,.6),new THREE.MeshBasicMaterial({map:zt.tx,transparent:true,toneMapped:false}));g.add(m);zs.push(m)}sh(g);
  add3('sofa',g,(t)=>{const p=pop(t,ST('sofa')+.1,.45);g.scale.setScalar(.9*Math.max(.001,p.s));g.rotation.set(.2,-.45+Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.06;
    zs.forEach((m,i)=>{const k=((t*.6)+i/3)%1;m.position.set(.8+k*.8,.8+k*1.6,0);m.scale.setScalar(.5+k*.8);m.visible=t>=T(65)})})}
// crane for "all"
{ const g=new THREE.Group();const y=M(0xffc53d,{metalness:.4,roughness:.3});
  const mast=new THREE.Mesh(new RoundedBoxGeometry(.35,4,.35,2,.05),y);mast.position.set(-1,0,0);g.add(mast);
  const jib=new THREE.Group();const arm=new THREE.Mesh(new RoundedBoxGeometry(4.2,.3,.3,2,.05),y);arm.position.x=1;jib.add(arm);
  const cw=new THREE.Mesh(new RoundedBoxGeometry(.7,.5,.5,2,.05),M(0x3a3f52));cw.position.x=-.9;jib.add(cw);
  const rope=new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,1.4,6),M(0x10131f));rope.position.set(2.4,-.7,0);jib.add(rope);
  const box=new THREE.Mesh(new RoundedBoxGeometry(.8,.6,.6,3,.1),M(0x13b4ff));box.position.set(2.4,-1.6,0);jib.add(box);jib.position.set(-1,2.1,0);g.add(jib);
  const base=new THREE.Mesh(new RoundedBoxGeometry(1.4,.3,1.4,2,.05),M(0x3a3f52));base.position.set(-1,-2.1,0);g.add(base);sh(g);
  add3('crane',g,(t)=>{const p=pop(t,ST('all')+.1,.45);g.scale.setScalar(.7*Math.max(.001,p.s));g.rotation.set(.1,-.4+Math.sin(t*.7)*.3,0);jib.rotation.y=Math.sin(t*1.2)*.6;g.position.y=Math.sin(t*1.5)*.06})}
// moon over hat for payoff
{ const g=new THREE.Group();const ms=new THREE.Mesh(new THREE.SphereGeometry(1.3,48,32),M(0xfff1b8,{emissive:0xffd66b,emissiveIntensity:.35,roughness:.6,clearcoat:.2}));g.add(ms);
  const cut=new THREE.Mesh(new THREE.SphereGeometry(1.2,48,32),M(0x0d1033,{roughness:.6}));cut.position.set(.65,.35,.6);g.add(cut);
  const st=[];for(let i=0;i<9;i++){const o=new THREE.Mesh(new THREE.OctahedronGeometry(.13),M(0xffffff,{emissive:0xffffff,emissiveIntensity:.8}));o.position.set(Math.cos(i*2.3)*2.7,Math.sin(i*1.7)*1.9,-.8);g.add(o);st.push(o)}sh(g);
  add3('moon',g,(t)=>{const p=pop(t,ST('payoff')+.1,.45);const out=clamp((t-T(86)+.15)/.2);g.scale.setScalar(.8*Math.max(.001,p.s*(1-out)));g.rotation.set(0,Math.sin(t*.9)*.3,Math.sin(t*.7)*.1);g.position.y=Math.sin(t*1.5)*.06;
    st.forEach((o,i)=>o.scale.setScalar(.5+.5*Math.abs(Math.sin(t*3+i))))})}
const BOX={hat:[540,940,720],papers:[540,940,760],laptop:[540,930,760],phone:[540,1080,900],bricks:[540,900,700],doc:[540,1000,820],sofa:[540,920,760],crane:[540,860,560],moon:[540,940,700]};
const SCN={
 luca(t){render3D('hat',t,BOX.hat);const q=pop(t,T(3)-.05,.3);withT(540,1460,q.s,q.a,()=>pill('Luca · impresa edile',540,1460,{size:46,bg:'#fff',c:'#8a4b1f'}))},
 late(t){render3D('papers',t,BOX.papers);const q=pop(t,T(7)-.05,.3);withT(540,1400,q.s,q.a,()=>pill('Ore 22:00 · ancora in ufficio',540,1400,{size:42,bg:'#fff',c:'#10131f'}));
   const r=pop(t,T(22)-.05,.3);withT(540,1530,r.s,r.a,()=>pill('Copia e incolla su Excel',540,1530,{size:42,bg:'#ff2e4d',c:'#fff'}))},
 sw(t){render3D('laptop',t,BOX.laptop);stampTxt('SU MISURA',540,1480,t,T(28),'#FFD60A',-.06,64)},
 app(t){render3D('phone',t,BOX.phone);const items=[['Ore',T(33)],['Foto',T(35)]];items.forEach(([s,tt],i)=>{const q=pop(t,tt-.05,.3);withT(220+i*640,1500,q.s,q.a,()=>{pill(s,220+i*640,1500,{size:44,bg:'#fff',c:'#10131f'});check(220+i*640,1410,30,prog(t,tt,.35))})})},
 mat(t){render3D('bricks',t,BOX.bricks);const c=pop(t,T(39)-.1,.35);withT(540,1450,c.s,c.a,()=>{card(190,1330,700,240);
   txt('MAGAZZINO',250,1400,{size:30,w:900,c:'#ff5e00',ls:2});txt('Mattoni',250,1490,{size:52,w:900});txt(fmt(lerp(1200,960,eOut(prog(t,T(41),.6)))),830,1490,{size:60,w:900,c:'#ff2e4d',al:'right'})})},
 quote(t){render3D('doc',t,BOX.doc);stampTxt('COSTI VERI',540,1560,t,T(55),'#fff',-.08,60)},
 sofa(t){render3D('sofa',t,BOX.sofa);const q=pop(t,T(59)-.05,.3);withT(540,1460,q.s,q.a,()=>pill('Ore 22:00 · sul divano',540,1460,{size:46,bg:'#fff',c:'#6a2cf5'}))},
 all(t){render3D('crane',t,BOX.crane);const items=[['Siti',T(69)],['App',T(70)],['Gestionali',T(71)],['Intelligenza artificiale',T(73)],['Qualsiasi cosa',T(75)]];
   items.forEach(([s,tt],i)=>{const q=pop(t,tt-.05,.3);withT(540,1180+i*112,q.s,q.a,()=>{const w=pill(s,540,1180+i*112,{size:44,bg:i===4?'#FFD60A':'#fff',c:'#10131f'});check(540-w/2-50,1180+i*112,30,prog(t,tt,.35))})})},
 payoff(t){render3D('moon',t,BOX.moon);if(t>=T(86)-.05)drawLogo(t,T(86)-.05,540,1060,700)},
};
