import{E as c,S as h,A as l,V as t,H as w,M as s,T as u}from"./babylon.inspector.bundle.max-76957990.js";g();function g(){const a=document.createElement("canvas");a.className="canvas",document.body.appendChild(a);const o=new c(a,!0),e=new h(o),r=new l("camera",-Math.PI/2,Math.PI/2.5,25,t.Zero(),e);r.attachControl(r,!0),new w("light1",new t(1,1,0),e);const d=s.CreateBox("box",{width:2,height:1.8,depth:1},e);d.position=new t(0,.9,0);const i=s.CreateCylinder("roof",{diameter:1.6,height:2,tessellation:3});i.scaling.x=.75,i.rotation.z=u.ToRadians(90),i.position=new t(0,1.8+1.6/4*.75,0),s.CreateGround("ground",{width:10,height:10}),window.addEventListener("keydown",n=>{n.shiftKey&&n.ctrlKey&&n.altKey&&n.key==="I"&&(e.debugLayer.isVisible()?e.debugLayer.hide():e.debugLayer.show())}),window.addEventListener("resize",function(){o.resize()}),o.runRenderLoop(()=>{e.render()})}