import{E as h,S as m,A as g,V as i,H as x,b as r,M as u,c as l,d as w,T as f,e as b,C as M}from"./babylon.inspector.bundle.max-42b26fab.js";y();function y(){const o=document.createElement("canvas");o.className="canvas",document.body.appendChild(o);const n=new h(o,!0),e=new m(n),a=new g("camera",-Math.PI/2,Math.PI/2.5,25,i.Zero(),e);a.attachControl(a,!0),new x("light1",new i(1,1,0),e),p(-1,e),C(1.5,e),T(),window.addEventListener("keydown",t=>{t.shiftKey&&t.ctrlKey&&t.altKey&&t.key==="I"&&(e.debugLayer.isVisible()?e.debugLayer.hide():e.debugLayer.show())}),window.addEventListener("resize",function(){n.resize()}),n.runRenderLoop(()=>{e.render()})}function p(o,n){const e=[];e[0]=new r(.5,0,.75,1),e[1]=new r(0,0,.25,1),e[2]=new r(.25,0,.5,1),e[3]=new r(.75,0,1,1);const a=new i(1,1,1),t=u.CreateBox("box",{faceUV:e,wrap:!0},n);t.scaling=a,t.position=new i(o,a.y/2,0);const c=new l("boxMat");c.diffuseTexture=new w("https://assets.babylonjs.com/environments/cubehouse.png",n),t.material=c;const s=u.CreateCylinder("roof",{diameter:1.6,height:a.x,tessellation:3});s.scaling.x=.75,s.rotation.z=f.ToRadians(90),s.position=new i(o,a.y+1.6/4*.75,0);const d=new l("roofMat");d.diffuseTexture=new w("https://assets.babylonjs.com/environments/roof.jpg",n),s.material=d,b.MergeMeshes([t,s],!0,!1,void 0,!1,!0)}function C(o,n){const e=[];e[0]=new r(3/5,0,1,1),e[1]=new r(0,0,2/5,1),e[2]=new r(2/5,0,3/5,1),e[3]=new r(2/5,0,3/5,1);const a=new i(2,1,1),t=u.CreateBox("box",{faceUV:e,wrap:!0},n);t.scaling=a,t.position=new i(o,a.y/2,0);const c=new l("boxMat");c.diffuseTexture=new w("https://assets.babylonjs.com/environments/semihouse.png",n),t.material=c;const s=u.CreateCylinder("roof",{diameter:1.6,height:a.x+.2,tessellation:3});s.scaling.x=.75,s.rotation.z=f.ToRadians(90),s.position=new i(o,a.y+1.6/4*.75,0);const d=new l("roofMat");d.diffuseTexture=new w("https://assets.babylonjs.com/environments/roof.jpg",n),s.material=d,b.MergeMeshes([t,s],!0,!1,void 0,!1,!0)}function T(){const o=u.CreateGround("ground",{width:10,height:10}),n=new l("groundMat");return n.diffuseColor=new M(0,1,0),o.material=n,o}