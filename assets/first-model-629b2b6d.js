import{E as o,S as i,A as c,V as s,H as d,a as m}from"./nativeXRFrame-7c0cc334.js";import"./ExtrasAsMetadata-c3c91ed8.js";h();function h(){const a=document.createElement("canvas");a.className="canvas",document.body.appendChild(a);const t=new o(a,!0),e=new i(t),r=new c("camera",-Math.PI/2,Math.PI/2.5,3,s.Zero(),e);r.attachControl(r,!0),new d("light1",new s(0,1,0),e),m.ImportMeshAsync("box","./","box.glb",e),window.addEventListener("keydown",n=>{n.shiftKey&&n.ctrlKey&&n.altKey&&n.key==="I"&&(e.debugLayer.isVisible()?e.debugLayer.hide():e.debugLayer.show())}),window.addEventListener("resize",function(){t.resize()}),t.runRenderLoop(()=>{e.render()})}
