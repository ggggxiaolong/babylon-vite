import{E as f,S as g,A as y,V as s,H as L,a as u,g as m,i as A,T as w,j as p}from"./babylon.inspector.bundle.max-42b26fab.js";import{s as b}from"./tools-9b968e73.js";I();function I(){const r=document.createElement("canvas");r.className="canvas",document.body.appendChild(r);const c=new f(r,!0),n=new g(c);b(2,n);const l=new y("camera",-Math.PI/2,Math.PI/2.5,50,s.Zero(),n);l.attachControl(l,!0),new L("light1",new s(1,1,0),n),u.ImportMeshAsync("","./meshes/","village.glb",n),u.ImportMeshAsync("","./meshes/","car.glb",n).then(t=>{t.meshes.forEach(e=>{if(e.name==="car"){e.rotation=new s(Math.PI/2,0,-Math.PI/2),e.position=new s(-3,.1+.125/2,8);const o=new m("carAnimation","position.z",30,m.ANIMATIONTYPE_FLOAT,m.ANIMATIONLOOPMODE_CYCLE),a=[];a.push({frame:0,value:8}),a.push({frame:150,value:-7}),a.push({frame:210,value:-7}),o.setKeys(a),e.animations=[o],n.beginAnimation(e,0,210,!0)}e.name.startsWith("wheel")&&n.beginAnimation(e,0,30,!0)})}),u.ImportMeshAsync("him","./meshes/Dude/","Dude.babylon",n).then(t=>{const e=t.meshes[0];e.scaling=new s(.008,.008,.008),e.position=new s(-6,0,0),e.rotate(A.Y,w.ToRadians(-95),p.LOCAL);const o=e.rotationQuaternion.clone();n.beginAnimation(t.skeletons[0],0,100,!0,1);const a=[{turn:86,dist:7},{turn:-85,dist:14.8},{turn:-93,dist:16.5},{turn:48,dist:25.5},{turn:-112,dist:30.5},{turn:-72,dist:33.2},{turn:42,dist:37.5},{turn:-98,dist:45.2},{turn:0,dist:47}];let i=0,d=0;const h=.015;n.onBeforeRenderObservable.add(()=>{d>a[i].dist&&(e.rotate(A.Y,w.ToRadians(a[i].turn),p.LOCAL),i+=1,i%=a.length,i===0&&(d=0,e.position=new s(-6,0,0),e.rotationQuaternion=o.clone())),d+=h,e.movePOV(0,0,h)})}),window.addEventListener("keydown",t=>{t.shiftKey&&t.ctrlKey&&t.altKey&&t.key==="I"&&(n.debugLayer.isVisible()?n.debugLayer.hide():n.debugLayer.show())}),window.addEventListener("resize",function(){c.resize()}),c.runRenderLoop(()=>{n.render()})}