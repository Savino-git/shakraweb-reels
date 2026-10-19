
const ST=n=>SC.find(s=>s.name===n).t0;
const SP={shop:['rose','pink','orange','rose','pink'],app:['violet','blue'],order:['blue','teal','blue','violet'],points:['wood','orange','wood','red'],
 notify:['navy','navy2','violet','pink','orange','pink'],result:['green','teal','green','mint','green'],custom:['violet','pink','orange','violet','blue'],cta:['blue','violet','green','navy']};
// croissant
function croissant(){const g=new THREE.Group();
  const d=new THREE.Mesh(new THREE.TorusGeometry(1,.55,32,64),M(0xc9782a,{roughness:.5,clearcoat:.4}));g.add(d);
  const ic=new THREE.Mesh(new THREE.TorusGeometry(1,.57,32,64,Math.PI*2),M(0x8fd14f,{roughness:.25,clearcoat:1}));ic.scale.set(1.02,1.02,.62);ic.position.z=.2;g.add(ic);
  g.rotation.x=-Math.PI/2;const w=new THREE.Group();w.add(g);
  for(let i=0;i<22;i++){const sp=new THREE.Mesh(new RoundedBoxGeometry(.08,.22,.08,1,.03),M([0xff3d7f,0xffffff,0xffc53d][i%3]));const a=i*2.39,r=.65+.7*hash(i);sp.position.set(Math.cos(a)*r,.58,Math.sin(a)*r);sp.rotation.set(Math.PI/2,0,a*3);w.add(sp)}
  g.position.y=.05;const out=w;
  return sh(out)}
{ const g=new THREE.Group();const c=croissant();g.add(c);const pist=[];for(let i=0;i<14;i++){const p=new THREE.Mesh(new THREE.IcosahedronGeometry(.09,0),M(0x7cc243,{roughness:.6,flatShading:true}));g.add(p);pist.push(p)}
  const plate=new THREE.Mesh(new THREE.CylinderGeometry(2.1,1.7,.18,64),M(0xffffff,{roughness:.2}));plate.position.y=-.65;g.add(plate);sh(g);
  add3('croiss',g,(t)=>{const p=pop(t,0,.4);g.scale.setScalar(Math.max(.001,p.s));g.rotation.set(.5,t*.6,0);g.position.y=Math.sin(t*1.5)*.08;
    pist.forEach((m,i)=>{const d=t-(T(12)+i*.03);m.visible=d>0;const k=clamp(d/.4);const a=(i/14-.5)*2.4;m.position.set(Math.cos(a*2.6)*1.1,lerp(3,.75,eOut(k)),Math.sin(a*2.6)*1.1)})})}
// app phone
{ const g=phone(0x10131f,(x)=>{const gr=x.createLinearGradient(0,0,0,1024);gr.addColorStop(0,'#ff5fa2');gr.addColorStop(1,'#ffb3c7');x.fillStyle=gr;x.fillRect(0,0,512,1024);
    x.fillStyle='#fff';x.font='900 46px Inter';x.textAlign='center';x.fillText('Pasticceria',256,130);x.fillText('Giulia',256,185);
    const items=[['Cornetto pistacchio','1,50 €'],['Torta Sacher','28 €'],['Cappuccino','1,40 €']];
    items.forEach(([a,b],i)=>{const y=250+i*170;x.fillStyle='#fff';x.beginPath();x.roundRect(36,y,440,140,30);x.fill();x.fillStyle='#ffc53d';x.beginPath();x.arc(110,y+70,44,0,7);x.fill();
      x.textAlign='left';x.fillStyle='#10131f';x.font='800 30px Inter';x.fillText(a,175,y+62);x.fillStyle='#ff3d7f';x.font='900 32px Inter';x.fillText(b,175,y+104)});
    x.fillStyle='#10131f';x.beginPath();x.roundRect(60,800,392,110,55);x.fill();x.fillStyle='#fff';x.font='900 40px Inter';x.textAlign='center';x.fillText('Ordina',256,870)});
  add3('phone',g,(t)=>{const p=pop(t,ST('app')+.05,.45);g.scale.setScalar(.9*Math.max(.001,p.s));g.rotation.set(-.05,lerp(3.14,-.35,eOut(prog(t,ST('app'),.6)))+Math.sin(t*1.2)*.2,.06);g.position.y=Math.sin(t*1.5)*.08})}
// cake
{ const g=new THREE.Group();const l1=new THREE.Mesh(new THREE.CylinderGeometry(1.8,1.8,1,64),M(0x5a2e1a,{roughness:.35}));l1.position.y=-.9;g.add(l1);
  const l2=new THREE.Mesh(new THREE.CylinderGeometry(1.3,1.3,.9,64),M(0x5a2e1a,{roughness:.35}));l2.position.y=0;g.add(l2);
  const ic=new THREE.Mesh(new THREE.TorusGeometry(1.3,.12,12,64),M(0xffffff,{roughness:.4}));ic.rotation.x=Math.PI/2;ic.position.y=.45;g.add(ic);
  const ic2=new THREE.Mesh(new THREE.TorusGeometry(1.8,.14,12,64),M(0xffffff,{roughness:.4}));ic2.rotation.x=Math.PI/2;ic2.position.y=-.4;g.add(ic2);
  const ch=new THREE.Mesh(new THREE.SphereGeometry(.28,32,16),M(0xff1e3c,{roughness:.15}));ch.position.y=.75;g.add(ch);
  const stem=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,.4,8),M(0x2d6a4f));stem.position.set(.08,1.1,0);stem.rotation.z=-.3;g.add(stem);
  const stand=new THREE.Mesh(new THREE.CylinderGeometry(2.2,.5,.5,64),M(0xdfe6ff,{metalness:.6,roughness:.2}));stand.position.y=-1.65;g.add(stand);sh(g);
  add3('cake',g,(t)=>{const p=pop(t,ST('order')+.1,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.25,t*.5,0);g.position.y=.2+Math.sin(t*1.5)*.08;
    ch.position.y=.75+Math.abs(Math.sin(t*4))*.0+(t>T(27)&&t<T(27)+.3?Math.sin((t-T(27))/.3*Math.PI)*.5:0)})}
// coffee cup
{ const g=new THREE.Group();const pts=[];for(let i=0;i<=12;i++){const k=i/12;pts.push(new THREE.Vector2(.85+.35*Math.pow(k,1.4),-1+k*1.9))}
  const cup=new THREE.Mesh(new THREE.LatheGeometry(pts,64),M(0xffffff,{roughness:.15,side:THREE.DoubleSide}));g.add(cup);
  const bot=new THREE.Mesh(new THREE.CylinderGeometry(.85,.85,.06,48),M(0xffffff));bot.position.y=-1;g.add(bot);
  const cof=new THREE.Mesh(new THREE.CylinderGeometry(1.12,1.12,.04,48),M(0x6b3b1d,{roughness:.3}));cof.position.y=.72;g.add(cof);
  const fo=new THREE.Mesh(new THREE.TorusGeometry(.35,.12,12,32),M(0xf3dcc0,{roughness:.6,clearcoat:0}));fo.rotation.x=Math.PI/2;fo.position.y=.75;g.add(fo);
  const hd=new THREE.Mesh(new THREE.TorusGeometry(.45,.12,16,32,Math.PI*1.2),M(0xffffff,{roughness:.15}));hd.position.set(1.2,0,0);hd.rotation.z=-Math.PI*.6;g.add(hd);
  const sau=new THREE.Mesh(new THREE.CylinderGeometry(1.9,1.5,.16,64),M(0xffffff,{roughness:.15}));sau.position.y=-1.08;g.add(sau);
  const steam=[];for(let i=0;i<3;i++){const s=new THREE.Mesh(new THREE.SphereGeometry(.18,16,8),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.5}));g.add(s);steam.push(s)}sh(g);
  add3('cup',g,(t)=>{const p=pop(t,ST('points')+.1,.45);g.scale.setScalar(.95*Math.max(.001,p.s));g.rotation.set(.35,-.6+Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.08;
    steam.forEach((s,i)=>{const d=((t*.6+i/3)%1);s.position.set(Math.sin(d*6+i)*.25,1+d*1.8,0);s.material.opacity=.5*(1-d);s.scale.setScalar(.6+d)})})}
// bell
{ const g=new THREE.Group();const pts=[];for(let i=0;i<=16;i++){const k=i/16;pts.push(new THREE.Vector2(.25+1.2*Math.pow(k,2.2)+.15*Math.sin(k*3),1.2-k*2.3))}
  const bell=new THREE.Mesh(new THREE.LatheGeometry(pts,64),M(0xffc53d,{metalness:.9,roughness:.2,side:THREE.DoubleSide}));const bg=new THREE.Group();bg.add(bell);
  const top=new THREE.Mesh(new THREE.TorusGeometry(.22,.07,12,24),M(0xffc53d,{metalness:.9,roughness:.2}));top.position.y=1.35;bg.add(top);
  const cl=new THREE.Mesh(new THREE.SphereGeometry(.24,24,12),M(0xffc53d,{metalness:.9,roughness:.2}));cl.position.y=-1.25;bg.add(cl);g.add(bg);
  const badge=new THREE.Mesh(new THREE.SphereGeometry(.42,32,16),M(0xff2e4d));badge.position.set(1.1,.9,.3);g.add(badge);
  const st=texCanvas(128,128,(x)=>{x.clearRect(0,0,128,128);x.fillStyle='#fff';x.font='900 84px Inter';x.textAlign='center';x.fillText('1',64,94)});st.redraw();
  const bl=new THREE.Mesh(new THREE.PlaneGeometry(.6,.6),new THREE.MeshBasicMaterial({map:st.tx,transparent:true,toneMapped:false}));bl.position.set(1.1,.9,.73);g.add(bl);sh(g);
  add3('bell',g,(t)=>{const p=pop(t,ST('notify')+.1,.45);g.scale.setScalar(.95*Math.max(.001,p.s));g.rotation.set(.1,Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.08;
    const d=t-T(49);bg.rotation.z=d>0?Math.sin(d*22)*.35*Math.exp(-d*2.5):0;const q=pop(t,T(52),.3);badge.visible=bl.visible=q.p>0;badge.scale.setScalar(Math.max(.001,q.s));bl.scale.setScalar(Math.max(.001,q.s))})}
// bar chart
{ const g=new THREE.Group();const cols=[0xff3d7f,0xffc53d,0x2ee59d,0x2d5bff];const bars=[];
  cols.forEach((c,i)=>{const b=new THREE.Mesh(new RoundedBoxGeometry(.8,1,.8,4,.12),M(c));b.position.x=-1.65+i*1.1;g.add(b);bars.push(b)});
  const base=new THREE.Mesh(new RoundedBoxGeometry(5,.2,1.4,4,.08),M(0xffffff,{roughness:.3}));base.position.y=-1.9;g.add(base);
  const arr=new THREE.Group();const sh1=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,4.4,12),M(0xffffff,{emissive:0xffffff,emissiveIntensity:.3}));sh1.rotation.z=-Math.PI/2+.55;arr.add(sh1);
  const hd=new THREE.Mesh(new THREE.ConeGeometry(.28,.6,20),M(0xffffff,{emissive:0xffffff,emissiveIntensity:.3}));hd.position.set(1.88,1.13,0);hd.rotation.z=-Math.PI/2+.55;arr.add(hd);arr.position.set(0,.6,.8);g.add(arr);sh(g);
  add3('bars',g,(t)=>{const p=pop(t,ST('result')+.1,.45);g.scale.setScalar(.85*Math.max(.001,p.s));g.rotation.set(.15,-.4+Math.sin(t*1.1)*.3,0);g.position.y=Math.sin(t*1.5)*.08;
    bars.forEach((b,i)=>{const h=lerp(.6,[1.2,1.8,2.5,3.4][i],eBack(prog(t,T(73)+i*.08,.45)));b.scale.y=h;b.position.y=-1.8+h/2});arr.visible=t>T(74);arr.scale.setScalar(Math.max(.001,eBack(prog(t,T(74),.4))))})}
// measuring tape
{ const g=new THREE.Group();const caseM=new THREE.Mesh(new RoundedBoxGeometry(2,2,.9,5,.4),M(0xffc53d,{roughness:.3}));g.add(caseM);
  const hub=new THREE.Mesh(new THREE.CylinderGeometry(.45,.45,.95,32),M(0x10131f));hub.rotation.x=Math.PI/2;g.add(hub);
  const st=texCanvas(1024,64,(x)=>{x.fillStyle='#fff3b0';x.fillRect(0,0,1024,64);x.fillStyle='#10131f';for(let i=0;i<100;i++){x.fillRect(i*10.24,0,2,i%10?18:34)}x.font='800 20px Inter';for(let i=0;i<10;i++)x.fillText(String(i*10),i*102.4+4,56)});st.redraw();
  st.tx.wrapS=THREE.RepeatWrapping;const tape=new THREE.Mesh(new THREE.PlaneGeometry(4,.42),new THREE.MeshPhysicalMaterial({map:st.tx,roughness:.3,clearcoat:1,side:THREE.DoubleSide}));tape.position.set(2.9,-.75,0);g.add(tape);
  const tip=new THREE.Mesh(new RoundedBoxGeometry(.12,.6,.4,2,.04),M(0x9aa0ad,{metalness:.9}));g.add(tip);sh(g);
  add3('tape',g,(t)=>{const p=pop(t,ST('custom')+.1,.45);const out=clamp((t-T(90)+.15)/.2);g.scale.setScalar(.8*Math.max(.001,p.s*(1-out)));g.rotation.set(.1,-.5+Math.sin(t*1.1)*.3,0);g.position.set(-1.2,Math.sin(t*1.5)*.08,0);
    const L=lerp(.2,4,eOut(prog(t,T(84),.7)));tape.scale.x=L/4;tape.position.x=1+L/2;st.tx.repeat.x=L/4;tip.position.set(1+L,-.75,0)})}
const BOX={croiss:[540,940,840],phone:[540,960,760],cake:[540,920,680],cup:[540,920,660],bell:[540,900,620],bars:[540,930,820],tape:[540,930,840]};
const SCN={
 shop(t){render3D('croiss',t,BOX.croiss);const c=pop(t,T(7)-.08,.35);withT(540,1460,c.s,c.a,()=>{card(170,1310,740,300);avatar(250,1390,44,'G','#ff5fa2','#ff9f43');
   txt('pasticceria.giulia',315,1380,{size:34,w:800});txt('Oggi cornetti al pistacchio!',315,1420,{size:28,w:600,c:'#6b7185'});
   const v=pop(t,T(16)-.05,.3);withT(540,1530,v.s,v.a,()=>{txt('Visualizzazioni',220,1545,{size:34,w:700,c:'#6b7185'});txt(String(Math.round(30*eOut(prog(t,T(16),.4)))),860,1550,{size:56,w:900,c:'#ff2e4d',al:'right'})})})},
 app(t){render3D('phone',t,BOX.phone);const q=pop(t,T(21)-.05,.3);withT(540,1500,q.s,q.a,()=>pill('Tutta sua',540,1500,{size:44,bg:'#FFD60A',c:'#10131f'}))},
 order(t){render3D('cake',t,BOX.cake);const c=pop(t,T(25)-.1,.35);withT(540,1460,c.s,c.a,()=>{card(150,1290,780,330);txt('Ordine #0458',200,1360,{size:30,w:800,c:'#6b7185'});
   [['Torta Sacher',T(27)],['Ritiro ore 17:30',T(33)]].forEach(([s,tt],i)=>{const y=1430+i*70;const r=prog(t,tt-.05,.2);check(220,y-12,24,prog(t,tt,.35));ctx.globalAlpha*=r;txt(s,265,y,{size:40,w:800});ctx.globalAlpha=c.a});
   const pg=pop(t,T(35),.3);withT(760,1360,pg.s,pg.a,()=>pill('PAGATO',760,1352,{size:30,bg:'#19c37d',c:'#fff',pad:22}))})},
 points(t){render3D('cup',t,BOX.cup);const c=pop(t,T(39)-.1,.35);withT(540,1450,c.s,c.a,()=>{card(150,1300,780,280);txt('Carta fedeltà',200,1370,{size:34,w:800});
   for(let i=0;i<10;i++){const x=215+(i%5)*130,y=1430+Math.floor(i/5)*80;ctx.beginPath();ctx.arc(x,y,28,0,7);ctx.fillStyle='#eef0f6';ctx.fill();
     const tt=T(39)+i*(T(43)-T(39))/10;const q=pop(t,tt,.25);if(q.p>0)withT(x,y,q.s,q.a,()=>{ctx.beginPath();ctx.arc(x,y,28,0,7);ctx.fillStyle=i===9?'#ff3d7f':'#8a4b1f';ctx.fill()})}});
   stampTxt('GRATIS',540,690,t,T(47),'#FFD60A',-.08,64)},
 notify(t){render3D('bell',t,BOX.bell);const n=pop(t,T(52)-.05,.35);withT(540,1330,n.s,n.a,()=>{card(110,1250,860,170,{r:44});rr(150,1290,90,90,22);ctx.fillStyle='#ff5fa2';ctx.fill();txt('G',195,1352,{size:52,w:900,c:'#fff',al:'center'});
   txt('Pasticceria Giulia · ora',265,1315,{size:26,w:700,c:'#6b7185'});txt('Cornetti caldi, ancora 10 minuti!',265,1365,{size:32,w:800})});
   for(let i=0;i<5;i++){const q=pop(t,T(60)+i*.1,.3);const x=300+i*120;withT(x,1520,q.s,q.a,()=>avatar(x,1520,48,['M','L','A','S','F'][i],['#2d5bff','#ff5e00','#19c37d','#a36bff','#ff2e4d'][i],'#ffc53d'))}},
 result(t){render3D('bars',t,BOX.bars);const c=pop(t,T(64)-.1,.35);withT(540,1460,c.s,c.a,()=>{card(150,1310,780,290);
   txt('Ordini persi',200,1400,{size:40,w:800,c:'#6b7185'});const z=pop(t,T(67),.3);withT(860,1385,z.s,z.a,()=>txt('0',860,1405,{size:60,w:900,c:'#19c37d',al:'right'}));
   if(t>T(67))check(760,1385,22,prog(t,T(67),.35));const r=pop(t,T(71)-.05,.3);withT(540,1520,r.s,r.a,()=>{txt('Clienti che tornano',200,1530,{size:40,w:800,c:'#6b7185'});txt('↑',860,1535,{size:64,w:900,c:'#2d5bff',al:'right'})})})},
 custom(t){render3D('tape',t,BOX.tape);stampTxt('NON SERVE',540,690,t,T(77),'#fff',-.06,44);const q=pop(t,T(80)-.05,.3);withT(540,1480,q.s,q.a,()=>{pill('Una catena',540,1480,{size:44,bg:'#fff',c:'#10131f'});
   if(t>T(80)){ctx.strokeStyle='#ff2e4d';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(400,1480);ctx.lineTo(lerp(400,680,eOut(prog(t,T(80),.2))),1480);ctx.stroke()}});
   const s=pop(t,T(86)-.05,.3);withT(540,1590,s.s,s.a,()=>pill('Su misura',540,1590,{size:44,bg:'#2EE59D',c:'#10131f'}));
   if(t>=T(90)-.05)drawLogo(t,T(90)-.05,540,1060,700)},
};
