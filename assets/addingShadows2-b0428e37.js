import{E as p,S as x,A as L,V as a,q as M,r as k,a as h,i as w,T as m,j as y,M as B,c as S,l as A,d as T,C as b}from"./babylon.inspector.bundle.max-42b26fab.js";v();function v(){const r=document.createElement("canvas");r.className="canvas",document.body.appendChild(r);const i=new p(r,!0),e=new x(i);new L("camera",-Math.PI/2,Math.PI/2.5,20,a.Zero(),e).attachControl(r,!0);const u=new M("dir01",new a(0,-1,1),e);u.position=new a(0,50,-100);const g=new k(1024,u),d=[{turn:86,dist:7},{turn:-85,dist:14.8},{turn:-93,dist:16.5},{turn:48,dist:25.5},{turn:-112,dist:30.5},{turn:-72,dist:33.2},{turn:42,dist:37.5},{turn:-98,dist:45.2},{turn:0,dist:47}];h.ImportMeshAsync("him","./meshes/Dude/","Dude.babylon",e).then(n=>{const t=n.meshes[0];t.scaling=new a(.008,.008,.008),g.addShadowCaster(t,!0),t.position=new a(-6,0,0),t.rotate(w.Y,m.ToRadians(-95),y.LOCAL);const C=t.rotationQuaternion?.clone();e.beginAnimation(n.skeletons[0],0,100,!0);let c=0;const l=.01;let o=0;e.onBeforeRenderObservable.add(()=>{t.movePOV(0,0,l),c+=l,c>d[o].dist&&(t.rotate(w.Y,m.ToRadians(d[o].turn),y.LOCAL),o+=1,o%=d.length,o===0&&(c=0,t.position=a.Zero(),t.rotationQuaternion=C.clone()))})});const f=B.CreateBox("skyBox",{size:150},e),s=new S("skyBoxMat");s.backFaceCulling=!1,s.reflectionTexture=new A("./textures/skyboxCube/skybox",e),s.reflectionTexture.coordinatesMode=T.SKYBOX_MODE,s.diffuseColor=new b(0,0,0),s.specularColor=new b(0,0,0),f.material=s,h.ImportMeshAsync("","./meshes/","valleyvillage.glb").then(()=>{e.getMeshByName("ground").receiveShadows=!0}),window.addEventListener("keydown",n=>{n.shiftKey&&n.ctrlKey&&n.altKey&&n.key==="I"&&(e.debugLayer.isVisible()?e.debugLayer.hide():e.debugLayer.show())}),window.addEventListener("resize",function(){i.resize()}),i.runRenderLoop(()=>{e.render()})}