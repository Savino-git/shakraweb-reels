const ST=n=>SC.find(s=>s.name===n).t0;
const SP={conti:['orange','pink'],bin:['red','orange','red'],pantry:['wood','grey','wood'],year:['navy','red','navy','red'],crates:['green','teal','green','mint'],
 gest:['blue','violet','blue','teal','blue','violet'],build:['pink','violet','orange','pink'],payoff:['night','navy','navy2'],cta:['orange','violet','green','navy']};
function labelTex(s,w=256,h=256,col='#fff',size=150,bg=null){const st=texCanvas(w,h,(x)=>{x.clearRect(0,0,w,h);if(bg){x.fillStyle=bg;x.fillRect(0,0,w,h)}x.fillStyle=col;x.font='900 '+size+'px Inter';x.textAlign='center';x.fillText(s,w/2,h*.7)});st.redraw();return st}
function plane(st,w,h){return new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:st.tx,transparent:true,toneMapped:false}))}
function tomato(){const g=new THREE.Group();const b=new THREE.Mesh(new THREE.SphereGeometry(.42,32,24),M(0xff2e2e,{roughness:.2}));b.scale.y=.85;g.add(b);const l=new THREE.Mesh(new THREE.ConeGeometry(.18,.16,5),M(0x2e9e4d,{roughness:.5}));l.position.y=.38;g.add(l);return g}
function cheese(){const s=new THREE.Shape();s.moveTo(0,0);s.lineTo(1,0);s.lineTo(0,.6);s.closePath();const ge=new THREE.ExtrudeGeometry(s,{depth:.45,bevelEnabled:true,bevelThickness:.04,bevelSize:.04,bevelSegments:2});ge.center();return new THREE.Mesh(ge,M(0xffd34d,{roughness:.45,clearcoat:.3}))}
function bread(){const m=new THREE.Mesh(new THREE.CapsuleGeometry(.28,.6,8,20),M(0xd08a45,{roughness:.55,clearcoat:.2}));m.rotation.z=Math.PI/2;return m}
// calculator
{ const g=new THREE.Group();const body=new THREE.Mesh(new RoundedBoxGeometry(2.6,3.6,.4,6,.25),M(0x1a1f45,{roughness:.3}));g.add(body);
  const st=texCanvas(512,160,(x,v=0)=>{x.fillStyle='#c8f7d8';x.fillRect(0,0,512,160);x.fillStyle='#10131f';x.font='900 96px Inter';x.textAlign='right';x.fillText(v+' €',490,120)});st.redraw(0);
  const scr=plane(st,2.2,.7);scr.position.set(0,1.2,.21);g.add(scr);const keys=[];const kc=[0xffffff,0xffffff,0xffffff,0xff9f43];
  for(let r=0;r<4;r++)for(let c=0;c<4;c++){const k=new THREE.Mesh(new RoundedBoxGeometry(.48,.42,.16,3,.08),M(kc[c]===0xff9f43||r===3&&c===3?0xff9f43:0xe9ecf5,{roughness:.3}));k.position.set(-.84+c*.56,.25-r*.52,.24);g.add(k);keys.push(k)}sh(g);let lv=-1;
  add3('calc',g,(t)=>{const p=pop(t,.05,.45);g.scale.setScalar(.82*Math.max(.001,p.s));g.rotation.set(-.2,-.35+Math.sin(t*1.1)*.3,.05);g.position.y=Math.sin(t*1.5)*.06;
    keys.forEach((k,i)=>{const pr=Math.floor(t*7)%16===i;k.position.z=pr?.17:.24});const v=Math.floor(clamp(t/1.1)*100);if(v!==lv){st.redraw(v);lv=v}})}
// trash bin with food falling
{ const g=new THREE.Group();const bin=new THREE.Mesh(new THREE.CylinderGeometry(1.25,1.0,2.6,48,1,true),M(0x6b7185,{metalness:.5,roughness:.3,side:THREE.DoubleSide}));bin.position.y=-1.2;g.add(bin);
  const bot=new THREE.Mesh(new THREE.CylinderGeometry(1.0,1.0,.08,48),M(0x6b7185,{metalness:.5}));bot.position.y=-2.5;g.add(bot);
  const rimm=new THREE.Mesh(new THREE.TorusGeometry(1.25,.08,12,60),M(0x3a3f52,{metalness:.6}));rimm.rotation.x=Math.PI/2;rimm.position.y=.1;g.add(rimm);
  const lid=new THREE.Group();const ld=new THREE.Mesh(new THREE.CylinderGeometry(1.32,1.32,.16,48),M(0x3a3f52,{metalness:.6,roughness:.3}));lid.add(ld);const hd=new THREE.Mesh(new THREE.TorusGeometry(.3,.06,10,24,Math.PI),M(0x10131f));hd.position.y=.1;lid.add(hd);
  lid.position.set(-1.2,.4,0);g.add(lid);const F=[tomato(),cheese(),bread(),tomato(),cheese()];F.forEach(f=>g.add(f));sh(g);
  add3('bin',g,(t)=>{const p=pop(t,ST('bin')+.08,.45);g.scale.setScalar(1.0*Math.max(.001,p.s));g.rotation.set(.25,Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.05+.2;
    lid.rotation.z=.9+Math.sin(t*3)*.05;F.forEach((f,i)=>{const t0=T(6)+i*.35;const ph=((t-t0)*.9)%1.4;f.visible=t>=t0&&ph<1;const y=2.8-ph*4.2;f.position.set(Math.sin(i*2.1)*.5,Math.max(-1.6,y),Math.cos(i*1.7)*.3);f.rotation.set(t*2+i,t*3+i,0)})})}
// pantry shelf
{ const g=new THREE.Group();const wood=M(0xc89a5b,{roughness:.6,clearcoat:.15});
  [[-1.9],[1.9]].forEach(([x])=>{const s=new THREE.Mesh(new RoundedBoxGeometry(.2,4,1.2,2,.05),wood);s.position.x=x;g.add(s)});
  [-1.9,-.3,1.3].forEach(y=>{const b=new THREE.Mesh(new RoundedBoxGeometry(3.9,.16,1.2,2,.05),wood);b.position.y=y;g.add(b)});
  const it=[];const jc=[0xff2e4d,0xffc53d,0x45e07d,0xff9f43,0x8b2e2a,0xffffff];
  for(let r=0;r<2;r++)for(let i=0;i<4;i++){const j=new THREE.Group();const can=r===1;const h=can?.9:1.1;
    const bd=new THREE.Mesh(new THREE.CylinderGeometry(.32,.32,h,28),can?M(0xc9ced9,{metalness:1,roughness:.2}):M(0xffffff,{transparent:true,opacity:.35,roughness:.05}));j.add(bd);
    const ins=new THREE.Mesh(new THREE.CylinderGeometry(can?.33:.27,can?.33:.27,can?h*.55:h*.7,28),M(jc[(i+r*3)%6],{roughness:.5}));ins.position.y=can?0:-h*.12;j.add(ins);
    const cap=new THREE.Mesh(new THREE.CylinderGeometry(.34,.34,.1,28),can?M(0xc9ced9,{metalness:1}):M(0xff2e4d));cap.position.y=h/2;j.add(cap);
    j.position.set(-1.35+i*.9,(r?-.3:-1.9)+.08+h/2,0);g.add(j);it.push(j)}
  const q=new THREE.Group();const qd=new THREE.Mesh(new THREE.CylinderGeometry(.7,.7,.24,40),M(0xff2e4d));qd.rotation.x=Math.PI/2;q.add(qd);const qp=plane(labelTex('?',256,256,'#fff',220),1.3,1.3);qp.position.z=.13;q.add(qp);q.position.set(1.4,2.3,.9);g.add(q);sh(g);
  add3('pantry',g,(t)=>{const p=pop(t,ST('pantry')+.08,.45);g.scale.setScalar(.8*Math.max(.001,p.s));g.rotation.set(.12,-.35+Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.06;
    it.forEach((j,i)=>{const k=pop(t,ST('pantry')+.1+i*.05,.3);j.scale.setScalar(Math.max(.001,k.s))});const qq=pop(t,T(15)-.04,.3);q.visible=qq.p>0;q.scale.setScalar(Math.max(.001,qq.s)*(1+.08*Math.sin(t*6)));q.rotation.y=Math.sin(t*2)*.5})}
// coins raining into a pit
{ const g=new THREE.Group();const coins=[];const cg=new THREE.CylinderGeometry(.42,.42,.1,40);
  for(let i=0;i<12;i++){const c=new THREE.Mesh(cg,gold());g.add(c);coins.push(c)}
  const stack=[];for(let i=0;i<6;i++){const c=new THREE.Mesh(cg,gold());c.position.set(-1.2,-1.9+i*.12,.3);g.add(c);stack.push(c)}
  const ring=new THREE.Mesh(new THREE.TorusGeometry(1.3,.1,12,60),M(0xff2e4d));ring.rotation.x=Math.PI/2;ring.position.set(.6,-1.9,0);g.add(ring);sh(g);
  add3('coins',g,(t)=>{const p=pop(t,ST('year')+.08,.45);g.scale.setScalar(1.1*Math.max(.001,p.s));g.rotation.set(.3,Math.sin(t*1.1)*.3,0);
    coins.forEach((c,i)=>{const ph=(t*.8+i/12)%1;c.position.set(.6+Math.sin(i*2.3)*.7,2.5-ph*4.4,Math.cos(i*1.9)*.5);c.rotation.set(t*3+i,0,t*2+i);c.visible=t>=T(24)-.1});
    stack.forEach((c,i)=>{c.visible=t<T(30)+i*.06})})}
// wooden crates with tomatoes + clock
{ const g=new THREE.Group();const wood=M(0xd6a76a,{roughness:.6,clearcoat:.15});
  function crate(){const c=new THREE.Group();[-.5,.5].forEach(z=>{for(let k=0;k<3;k++){const s=new THREE.Mesh(new RoundedBoxGeometry(1.9,.2,.08,2,.03),wood);s.position.set(0,-.3+k*.3,z);c.add(s)}});
    [-.9,.9].forEach(x=>{const s=new THREE.Mesh(new RoundedBoxGeometry(.12,.9,1.08,2,.03),wood);s.position.x=x;c.add(s)});const b=new THREE.Mesh(new RoundedBoxGeometry(1.9,.08,1.08,2,.03),wood);b.position.y=-.42;c.add(b);
    for(let i=0;i<4;i++){const tm=tomato();tm.scale.setScalar(.75);tm.position.set(-.55+i*.37,.12,(i%2-.5)*.4);c.add(tm)}return c}
  const C=[crate(),crate(),crate()];C[0].position.set(-1,-1.6,0);C[1].position.set(1,-1.6,0);C[2].position.set(0,-.6,0);C.forEach(c=>g.add(c));
  const clk=new THREE.Group();const cb=new THREE.Mesh(new THREE.CylinderGeometry(.8,.8,.25,48),M(0xffffff));cb.rotation.x=Math.PI/2;clk.add(cb);const rr2=new THREE.Mesh(new THREE.TorusGeometry(.8,.09,12,48),M(0x00a676));clk.add(rr2);
  const hh=new THREE.Mesh(new RoundedBoxGeometry(.09,.5,.06,2,.03),M(0x10131f));hh.geometry.translate(0,.2,0);hh.position.z=.15;clk.add(hh);const mh=new THREE.Mesh(new RoundedBoxGeometry(.06,.65,.06,2,.03),M(0xff2e4d));mh.geometry.translate(0,.28,0);mh.position.z=.17;clk.add(mh);
  clk.position.set(1.5,1.3,.4);g.add(clk);sh(g);
  add3('crates',g,(t)=>{const p=pop(t,ST('crates')+.08,.45);g.scale.setScalar(1.05*Math.max(.001,p.s));g.rotation.set(.18,-.4+Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.06+.3;
    C.forEach((c,i)=>{const k=pop(t,T(38)-.1+i*.12,.35);c.scale.setScalar(Math.max(.001,k.s))});hh.rotation.z=-t*1.2;mh.rotation.z=-t*9})}
// phone with restaurant dashboard
{ const scr=(x,s=0)=>{x.fillStyle='#f3f5fb';x.fillRect(0,0,512,1024);x.fillStyle='#1d4bff';x.fillRect(0,0,512,150);x.fillStyle='#fff';x.font='900 38px Inter';x.fillText('Trattoria da Mario',30,85);x.font='700 26px Inter';x.fillStyle='rgba(255,255,255,.8)';x.fillText('Gestionale cucina',30,125);
    const R=[['SCADE DOMANI','Mozzarella 3 kg','#ff2e4d'],['DA ORDINARE','Farina 00 · 25 kg','#ff9f43'],['COSTO PIATTO','Carbonara: 2,80 €','#19c37d']];
    for(let i=0;i<Math.min(s,3);i++){const y=190+i*230;x.fillStyle='#fff';x.beginPath();x.roundRect(24,y,464,200,28);x.fill();x.fillStyle=R[i][2];x.beginPath();x.roundRect(24,y,14,200,7);x.fill();
      x.fillStyle=R[i][2];x.font='900 28px Inter';x.fillText(R[i][0],64,y+60);x.fillStyle='#10131f';x.font='800 38px Inter';x.fillText(R[i][1],64,y+118);
      x.fillStyle='#6b7185';x.font='600 24px Inter';x.fillText(['Usala oggi nel menu del giorno','Ordine pronto da confermare','Margine: 72%'][i],64,y+162)}};
  const g=phone(0x2a2e40,scr);let last=-1;
  add3('dash',g,(t)=>{const p=pop(t,ST('gest')+.08,.45);g.scale.setScalar(.95*Math.max(.001,p.s));g.rotation.set(.05,-.3+Math.sin(t*1.1)*.22,Math.sin(t*.9)*.04);g.position.y=Math.sin(t*1.5)*.07;
    const s=t>=T(62)?3:t>=T(58)?2:t>=T(53)?1:0;if(s!==last){g.userData.st.redraw(s);last=s}})}
// building blocks with studs
{ const g=new THREE.Group();const cols=[0x2d5bff,0xffc53d,0xff3d7f,0x19c37d,0x6a2cf5];const B=[];const pos=[[-1,-1.5],[1,-1.5],[0,-.5],[-1,.5],[1,.5]];
  pos.forEach(([x,y],i)=>{const b=new THREE.Group();const m=new THREE.Mesh(new RoundedBoxGeometry(1.9,.95,1.2,4,.1),M(cols[i]));b.add(m);
    for(let k=0;k<2;k++)for(let j=0;j<2;j++){const s=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,.18,24),M(cols[i]));s.position.set(-.48+k*.96,.56,-.28+j*.56);b.add(s)}b.userData.y=y;b.position.set(x,y,0);g.add(b);B.push(b)});sh(g);
  add3('blocks',g,(t)=>{const p=pop(t,ST('build')+.05,.4);g.scale.setScalar(.75*Math.max(.001,p.s));g.rotation.set(.2,-.5+Math.sin(t*1.1)*.35,0);
    const tt=[T(69),T(70),T(71)+.1,T(72),T(73)];B.forEach((b,i)=>{const k=prog(t,tt[i]-.05,.3);b.visible=k>0;b.position.y=b.userData.y+(1-eOut(k))*2.5;b.rotation.y=(1-eOut(k))*1.2})})}
// chef hat at night
{ const g=new THREE.Group();const wm=M(0xffffff,{roughness:.55,clearcoat:.2});const band=new THREE.Mesh(new THREE.CylinderGeometry(1.1,1.1,1.0,48),wm);band.position.y=-.9;g.add(band);
  [[0,.4,0,1.0],[-.7,.15,.2,.75],[.7,.15,.2,.75],[0,.2,-.6,.75],[0,.15,.65,.7]].forEach(([x,y,z,r])=>{const s=new THREE.Mesh(new THREE.SphereGeometry(r,32,24),wm);s.position.set(x,y,z);g.add(s)});
  const moon=new THREE.Group();const ms=new THREE.Mesh(new THREE.SphereGeometry(.5,40,30),M(0xfff1b8,{emissive:0xffd66b,emissiveIntensity:.35,roughness:.6}));moon.add(ms);
  const ct=new THREE.Mesh(new THREE.SphereGeometry(.46,40,30),M(0x0d1033,{roughness:.6}));ct.position.set(.26,.15,.26);moon.add(ct);moon.position.set(1.9,1.9,-.5);g.add(moon);
  const zz=[];for(let i=0;i<3;i++){const z=plane(labelTex('Z',128,128,'#9fc0ff',110),.5-i*.08,.5-i*.08);g.add(z);zz.push(z)}sh(g);
  add3('chef',g,(t)=>{const p=pop(t,ST('payoff')+.08,.45);const out=clamp((t-T(90)+.15)/.2);g.scale.setScalar(.78*Math.max(.001,p.s*(1-out)));g.rotation.set(.15,Math.sin(t*.9)*.35,Math.sin(t*1.3)*.05);g.position.y=Math.sin(t*1.5)*.08;
    moon.rotation.y=t*.4;zz.forEach((z,i)=>{const ph=(t*.5+i/3)%1;z.position.set(-1.6+ph*.6,1.2+ph*1.4,.5);z.material.opacity=Math.sin(ph*Math.PI)})})}
const BOX={calc:[540,980,780],bin:[540,840,560],pantry:[540,950,800],coins:[540,800,540],crates:[540,860,600],dash:[540,1090,950],blocks:[540,900,620],chef:[540,980,760]};
const SCN={
 conti(t){render3D('calc',t,BOX.calc)},
 bin(t){render3D('bin',t,BOX.bin);const c=pop(t,T(8)-.05,.35);withT(540,1380,c.s,c.a,()=>{card(190,1180,700,400,{r:44});txt('Buttati ogni settimana',540,1265,{size:38,w:800,c:'#6b7185',al:'center'});
   const n=100*eOut(prog(t,T(9),.6));txt('-'+fmt(n)+' €',540,1420,{size:130,w:900,c:'#ff2e4d',al:'center'});txt('cibo scaduto',540,1510,{size:36,w:700,c:'#10131f',al:'center'})})},
 pantry(t){render3D('pantry',t,BOX.pantry);const q=pop(t,T(16)-.05,.3);withT(540,1560,q.s,q.a,()=>pill('Cosa c\'è davvero?',540,1560,{size:48,bg:'#fff',c:'#10131f'}))},
 year(t){render3D('coins',t,BOX.coins);const c=pop(t,ST('year')+.05,.35);withT(540,1370,c.s,c.a,()=>{card(140,1090,800,560,{r:44});
   const rows=[['Al mese','400 €',T(23),'#10131f'],['All\'anno','',T(28),'#ff2e4d']];
   rows.forEach(([l,v,tt,col],i)=>{const y=1200+i*160;const r=prog(t,tt-.05,.25);ctx.globalAlpha=c.a*clamp(r*3);txt(l,190,y,{size:40,w:700,c:'#6b7185'});
     const val=i===1?String(Math.round(4800*eOut(prog(t,tt,.8)))).replace(/\B(?=(\d{3})+(?!\d))/g,'.')+' €':v;txt(val,890,y+10,{size:84,w:900,c:col,al:'right'});if(!i){ctx.fillStyle='#eef0f6';ctx.fillRect(190,y+60,700,3)}ctx.globalAlpha=c.a});
   stampTxt('NELLA SPAZZATURA',540,1555,t,T(32)-.02,'#ff2e4d',-.06,52)})},
 crates(t){render3D('crates',t,BOX.crates);const q=pop(t,T(35)-.05,.3);withT(540,1340,q.s,q.a,()=>pill('+5 ore a settimana',540,1340,{size:48,bg:'#fff',c:'#00a676'}));
   const r=pop(t,T(42)-.05,.3);withT(540,1500,r.s,r.a,()=>{const w=pill('Ordini a memoria',540,1500,{size:46,bg:'#fff',c:'#10131f'});const k=eOut(prog(t,T(46)-.05,.3));if(k>0){ctx.strokeStyle='#ff2e4d';ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(540-w/2+20,1500);ctx.lineTo(540-w/2+20+(w-40)*k,1500);ctx.stroke()}})},
 gest(t){render3D('dash',t,BOX.dash);const q=pop(t,T(65)-.05,.3);withT(540,1640,q.s,q.a,()=>pill('Tutto sul telefono',540,1640,{size:44,bg:'#FFD60A',c:'#10131f'}))},
 build(t){render3D('blocks',t,BOX.blocks);const items=[['Su misura',T(71)],['Siti',T(76)],['App',T(77)],['Intelligenza artificiale',T(79)]];
   items.forEach(([s,tt],i)=>{const x=i===0?540:i===1?360:i===2?720:540,y=i===0?1300:i<3?1430:1560;const q=pop(t,tt-.05,.3);withT(x,y,q.s,q.a,()=>{const w=pill(s,x,y,{size:44,bg:i===0?'#FFD60A':'#fff',c:'#10131f'});if(i)check(x-w/2+6,y-44,24,prog(t,tt,.35))})})},
 payoff(t){render3D('chef',t,BOX.chef);if(t>=T(90)-.05)drawLogo(t,T(90)-.05,540,1060,700)},
};
