import{M as w,V as t,C as c,y as f,D as L,c as y}from"./babylon.inspector.bundle.max-42b26fab.js";function m(e,n){function a(h,C,v){const d=new L("DynamicTexture",50,n,!0);d.hasAlpha=!0,d.drawText(h,5,40,"bold 36px Arial",C,"transparent",!0);const x=w.CreatePlane("TextPlane",{size:v,updatable:!0},n),l=new y("TextPlaneMaterial",n);return l.backFaceCulling=!1,l.specularColor=new c(0,0,0),l.diffuseTexture=d,x.material=l,x}const u=w.CreateLines("axisX",{points:[t.Zero(),new t(e,0,0),new t(e*.95,.05*e,0),new t(e,0,0),new t(e*.95,-.05*e,0)]},n);u.color=new c(1,0,0);const s=a("X","red",e/10);s.position=new t(.9*e,-.05*e,0);const r=w.CreateLines("axisX",{points:[t.Zero(),new t(0,e,0),new t(-.05*e,e*.95,0),new t(0,e,0),new t(.05*e,e*.95,0)]},n);r.color=new c(0,1,0);const o=a("Y","green",e/10);o.position=new t(0,.9*e,-.05*e);const p=w.CreateLines("axisX",{points:[t.Zero(),new t(0,0,e),new t(0,-.05*e,e*.95),new t(0,0,e),new t(0,.05*e,e*.95)]},n);p.color=new c(0,0,1);const b=a("Z","blue",e/10);b.position=new t(0,.05*e,.9*e)}var i;function M(e,n){i&&window.URL.revokeObjectURL(i);var a=f.SerializeMesh(n,!0,!0),u=JSON.stringify(a);(e.toLowerCase().lastIndexOf(".babylon")!==e.length-8||e.length<9)&&(e+=".babylon");var s=new Blob([u],{type:"octet/stream"});i=(window.webkitURL||window.URL).createObjectURL(s);var r=window.document.createElement("a");r.href=i,r.download=e;var o=document.createEvent("MouseEvents");o.initEvent("click",!0,!1),r.dispatchEvent(o)}export{M as d,m as s};