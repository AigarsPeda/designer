import{d as ye,r as W,b as Ie,f as A,o as we,c as Me,a as Re,_ as Ye,e as Te,h as Ee,g as re,i as He,j as Ue,u as $e,k as Fe,w as qe,l as Xe,m as Ze,n as Ve}from"./index-5cda5530.js";const Ne=({canvas:e,containerRef:t})=>{const o=(t==null?void 0:t.offsetWidth)||500,n=(t==null?void 0:t.offsetHeight)||500;e==null||e.setDimensions({width:o,height:n})},Ke=({canvas:e})=>{e.on("mouse:wheel",t=>{const o=t.e.deltaY;let n=e.getZoom();n*=.999**o,n>20&&(n=20),n<.01&&(n=.01),e.zoomToPoint({x:t.e.offsetX,y:t.e.offsetY},n),t.e.preventDefault(),t.e.stopPropagation()})},Qe=ye({__name:"FabricCanvas",props:{id:{}},emits:["canvas-created","mouse-down","mouse-dblclick","selection-created","selection-cleared","selection-updated"],setup(e,{emit:t}){const o=W(null),n=W(null),i=W({width:0,height:0}),r=W(null);return Ie(()=>{var l,f,u,C;const s=new A.fabric.Canvas(r.value,{preserveObjectStacking:!0,width:((l=n.value)==null?void 0:l.offsetWidth)||500,height:((f=n.value)==null?void 0:f.offsetHeight)||500});s&&(o.value=s,t("canvas-created",s),s.on("selection:created",a=>{t("selection-created",a)}),s.on("selection:updated",a=>{t("selection-updated",a)}),s.on("selection:cleared",a=>{t("selection-cleared",a)}),s.on("mouse:dblclick",a=>{t("mouse-dblclick",a)}),s.on("mouse:down:before",a=>{t("mouse-down",a)}),s.on("object:modified",a=>{var b;(b=a.target)==null||b.set({opacity:1}),s.renderAll()}),s.on("object:moving",a=>{var b;(b=a.target)==null||b.set({opacity:.75}),s.renderAll()}),i.value={width:((u=n.value)==null?void 0:u.offsetWidth)||500,height:((C=n.value)==null?void 0:C.offsetHeight)||500},Ke({canvas:s}),window.addEventListener("resize",()=>{Ne({canvas:s,containerRef:n.value})}))}),(s,l)=>(we(),Me("div",{class:"container",ref_key:"containerRef",ref:n},[Re("canvas",{id:"canvas",ref_key:"canvasReference",ref:r,width:500,height:500},null,512)],512))}});const Ge=Ye(Qe,[["__scopeId","data-v-00e31bbc"]]),Je=e=>{const t=W(null),o=()=>{t.value&&window.addEventListener("keydown",t.value)},n=()=>{t.value&&window.removeEventListener("keydown",t.value)};return Ie(()=>{t.value=e}),Te(()=>{n()}),{addListener:o,removeListener:n}},et=(e,t)=>{e.key==="Backspace"&&Ee(t)},tt=e=>{if(!e.length)return"";const t=e.reduce((o,[n,i],r,s)=>{const[l,f]=s[(r+1)%s.length];return o.push(n,i,(n+l)/2,(i+f)/2),o},["M",...e[0],"Q"]);return t.push("Z"),t.join(" ")};function je(e,t,o,n=i=>i){return e*n(.5-t*(.5-o))}function nt(e){return[-e[0],-e[1]]}function x(e,t){return[e[0]+t[0],e[1]+t[1]]}function k(e,t){return[e[0]-t[0],e[1]-t[1]]}function v(e,t){return[e[0]*t,e[1]*t]}function ot(e,t){return[e[0]/t,e[1]/t]}function H(e){return[e[1],-e[0]]}function _e(e,t){return e[0]*t[0]+e[1]*t[1]}function st(e,t){return e[0]===t[0]&&e[1]===t[1]}function rt(e){return Math.hypot(e[0],e[1])}function it(e){return e[0]*e[0]+e[1]*e[1]}function Pe(e,t){return it(k(e,t))}function Le(e){return ot(e,rt(e))}function lt(e,t){return Math.hypot(e[1]-t[1],e[0]-t[0])}function U(e,t,o){let n=Math.sin(o),i=Math.cos(o),r=e[0]-t[0],s=e[1]-t[1],l=r*i-s*n,f=r*n+s*i;return[l+t[0],f+t[1]]}function me(e,t,o){return x(e,v(k(t,e),o))}function Se(e,t,o){return x(e,v(t,o))}var{min:B,PI:at}=Math,Oe=.275,$=at+1e-4;function ct(e,t={}){let{size:o=16,smoothing:n=.5,thinning:i=.5,simulatePressure:r=!0,easing:s=c=>c,start:l={},end:f={},last:u=!1}=t,{cap:C=!0,easing:a=c=>c*(2-c)}=l,{cap:b=!0,easing:d=c=>--c*c*c+1}=f;if(e.length===0||o<=0)return[];let g=e[e.length-1].runningLength,M=l.taper===!1?0:l.taper===!0?Math.max(o,g):l.taper,P=f.taper===!1?0:f.taper===!0?Math.max(o,g):f.taper,Ce=Math.pow(o*n,2),R=[],z=[],ie=e.slice(0,10).reduce((c,m)=>{let h=m.pressure;if(r){let p=B(1,m.distance/o),de=B(1,1-p);h=B(1,c+(de-c)*(p*Oe))}return(c+h)/2},e[0].pressure),w=je(o,i,e[e.length-1].pressure,s),le,ae=e[0].vector,T=e[0].point,V=T,I=T,Y=V,ce=!1;for(let c=0;c<e.length;c++){let{pressure:m}=e[c],{point:h,vector:p,distance:de,runningLength:E}=e[c];if(c<e.length-1&&g-E<3)continue;if(i){if(r){let D=B(1,de/o),he=B(1,1-D);m=B(1,ie+(he-ie)*(D*Oe))}w=je(o,i,m,s)}else w=o/2;le===void 0&&(le=w);let ze=E<M?a(E/M):1,Be=g-E<P?d((g-E)/P):1;w=Math.max(.01,w*Math.min(ze,Be));let ke=(c<e.length-1?e[c+1]:e[c]).vector,fe=c<e.length-1?_e(p,ke):1,We=_e(p,ae)<0&&!ce,ve=fe!==null&&fe<0;if(We||ve){let D=v(H(ae),w);for(let he=1/13,K=0;K<=1;K+=he)I=U(k(h,D),h,$*K),R.push(I),Y=U(x(h,D),h,$*-K),z.push(Y);T=I,V=Y,ve&&(ce=!0);continue}if(ce=!1,c===e.length-1){let D=v(H(p),w);R.push(k(h,D)),z.push(x(h,D));continue}let xe=v(H(me(ke,p,fe)),w);I=k(h,xe),(c<=1||Pe(T,I)>Ce)&&(R.push(I),T=I),Y=x(h,xe),(c<=1||Pe(V,Y)>Ce)&&(z.push(Y),V=Y),ie=m,ae=p}let S=e[0].point.slice(0,2),O=e.length>1?e[e.length-1].point.slice(0,2):x(e[0].point,[1,1]),ue=[],N=[];if(e.length===1){if(!(M||P)||u){let c=Se(S,Le(H(k(S,O))),-(le||w)),m=[];for(let h=1/13,p=h;p<=1;p+=h)m.push(U(c,S,$*2*p));return m}}else{if(!(M||P&&e.length===1))if(C)for(let m=1/13,h=m;h<=1;h+=m){let p=U(z[0],S,$*h);ue.push(p)}else{let m=k(R[0],z[0]),h=v(m,.5),p=v(m,.51);ue.push(k(S,h),k(S,p),x(S,p),x(S,h))}let c=H(nt(e[e.length-1].vector));if(P||M&&e.length===1)N.push(O);else if(b){let m=Se(O,c,w);for(let h=1/29,p=h;p<1;p+=h)N.push(U(m,O,$*3*p))}else N.push(x(O,v(c,w)),x(O,v(c,w*.99)),k(O,v(c,w*.99)),k(O,v(c,w)))}return R.concat(N,z.reverse(),ue)}function ut(e,t={}){var o;let{streamline:n=.5,size:i=16,last:r=!1}=t;if(e.length===0)return[];let s=.15+(1-n)*.85,l=Array.isArray(e[0])?e:e.map(({x:d,y:g,pressure:M=.5})=>[d,g,M]);if(l.length===2){let d=l[1];l=l.slice(0,-1);for(let g=1;g<5;g++)l.push(me(l[0],d,g/4))}l.length===1&&(l=[...l,[...x(l[0],[1,1]),...l[0].slice(2)]]);let f=[{point:[l[0][0],l[0][1]],pressure:l[0][2]>=0?l[0][2]:.25,vector:[1,1],distance:0,runningLength:0}],u=!1,C=0,a=f[0],b=l.length-1;for(let d=1;d<l.length;d++){let g=r&&d===b?l[d].slice(0,2):me(a.point,l[d],s);if(st(a.point,g))continue;let M=lt(g,a.point);if(C+=M,d<b&&!u){if(C<i)continue;u=!0}a={point:g,pressure:l[d][2]>=0?l[d][2]:.5,vector:Le(k(a.point,g)),distance:M,runningLength:C},f.push(a)}return f[0].vector=((o=f[1])==null?void 0:o.vector)||[0,0],f}function dt(e,t={}){return ct(ut(e,t),t)}var ft=dt;let F="",Q=!1,ge=[[0,0]];const ht=({canvas:e,drawingSettings:t})=>{if(!e){console.error("drawStrokeOnCanvas: canvas is null");return}e.on("mouse:down",o=>{Q=!0,F=re();const n=e.getPointer(o.e);ge=[[n.x,n.y]]}),e.on("mouse:move",o=>{if(!Q)return;e.discardActiveObject();const n=e.getPointer(o.e);ge.push([n.x,n.y]);const i=ft(ge,{size:t.size,thinning:t.thinning,smoothing:t.smoothing,streamline:t.streamline,easing(u){return u=Math.max(0,Math.min(1,u)),u*u*(3-2*u)}}),r=tt(i),l=e.getObjects().filter(u=>(u==null?void 0:u.id)===F);if(l.length>0)for(let u=0;u<l.length;u++)e.remove(l[u]);const f=new A.fabric.Path(r,{scaleX:1,scaleY:1,cornerSize:6,evented:!1,selectable:!1,hasRotatingPoint:!1,fill:t.stroke});f.id=F,e.add(f)}),e.on("mouse:up",o=>{if(!Q)return;const i=e.getObjects().filter(r=>(r==null?void 0:r.id)===F);for(let r=0;r<i.length;r++){const s=i[r];s.setCoords(),e.add(s)}F="",Q=!1})},gt=(e,t)=>{if(e)return setTimeout(()=>e.requestRenderAll(),t)},pt=({canvas:e,backgroundColor:t})=>{e&&e.setBackgroundColor(t,()=>gt(e,0))};let G=0,J=0,pe=!1;const bt=({canvas:e})=>{e&&(e.on("mouse:down",t=>{var o,n,i;if(pe=!0,t&&t.e&&t.e.type==="touchstart"){const r=t.e;G=(o=r==null?void 0:r.changedTouches[0])==null?void 0:o.clientX,J=(n=r==null?void 0:r.changedTouches[0])==null?void 0:n.clientY}(i=t.target)==null||i.setOptions({opacity:.5})}),e.on("mouse:move",t=>{if(!(!pe||!t||!t.e||t.target)){if(t.e.type==="mousemove"){const o=new A.fabric.Point(t.e.movementX,t.e.movementY);e.relativePan(o)}if(t.e.type==="touchmove"){const o=t.e,n=o==null?void 0:o.touches[0];if(!n)return;const i=.9;let r=(n.clientX-G)*i,s=(n.clientY-J)*i;G=n.clientX,J=n.clientY;const l=new A.fabric.Point(r,s);e.relativePan(l)}}}),e.on("mouse:up",t=>{var o;pe=!1,(o=t.target)==null||o.setOptions({opacity:1}),G=0,J=0}))};let ee="",te=!1;const mt=({canvas:e,squareModeSettings:t})=>{e&&(e.on("mouse:down",o=>{te=!0,ee=re();const n=e.getPointer(o.e),i=[n.x,n.y,n.x,n.y],r=new A.fabric.Line(i,{cornerSize:6,strokeWidth:3,cornerStyle:"circle",fill:t.stroke,stroke:t.stroke,originX:"center",originY:"center",evented:!1,selectable:!1,hasControls:!1,hasRotatingPoint:!1});r.id=ee,e.add(r)}),e.on("mouse:move",o=>{if(!te)return;const n=e.getPointer(o.e),r=e.getObjects().filter(s=>(s==null?void 0:s.id)===ee);for(let s=0;s<r.length;s++){const l=r[s];l==null||l.setOptions({x2:n.x,y2:n.y})}e.renderAll()}),e.on("mouse:up",()=>{if(!te)return;te=!1;const n=e.getObjects().filter(i=>(i==null?void 0:i.id)===ee);for(let i=0;i<n.length;i++){const r=n[i];e.remove(r),r.setCoords(),e.add(r)}}))},yt=e=>{var o;const t=(o=e.transform)==null?void 0:o.target;if(t){const n=t.scaleX||1,i=t.scaleY||1,r=t.width||1,s=t.height||1,l=r*n,f=s*i;t.set({width:l,height:f,scaleX:1,scaleY:1}),t.setCoords()}},wt=He();let ne="",q=0,Z=0,be=!1;const Mt=({canvas:e,squareModeSettings:t})=>{e&&(e.on("mouse:down",o=>{be=!0;const n=e.getPointer(o.e);q=n.x,Z=n.y;const i=new A.fabric.Rect({angle:0,top:Z,left:q,evented:!1,originY:"top",originX:"left",selectable:!1,noScaleCache:!1,hasRotatingPoint:!1,width:n.x-q,height:n.y-Z,rx:t.rx,ry:t.ry,cornerSize:6,stroke:t.stroke,strokeWidth:t.strokeWidth,fill:Ue({pasterns:wt,stroke:t.stroke,background:t.background})});i.on("scaling",r=>yt(r)),i.id=re(),ne=i.id,e.add(i).renderAll()}),e.on("mouse:move",o=>{if(!be||!ne)return;const n=e.getPointer(o.e),r=e.getObjects().find(s=>s.id===ne);r&&(q>n.x&&r.set({left:Math.abs(n.x)}),Z>n.y&&r.set({top:Math.abs(n.y)}),r.setOptions({width:Math.abs(q-n.x),height:Math.abs(Z-n.y)}),e.renderAll())}),e.on("mouse:up",o=>{be=!1;const i=e.getObjects().find(r=>r.id===ne);i&&(e.remove(i),i.setOptions({evented:!0,selectable:!0,hasRotatingPoint:!0}),i.setCoords(),e.add(i),e.setActiveObject(i))}))},De=e=>e==="drawing"||e==="panning"||e==="line"||e==="arrow",Ct=e=>{if(!e){console.error("makeAllObjCanvasSelectable: canvas is null");return}e.selection=!0,e.forEachObject(t=>{t.setOptions({evented:!0,selectable:!0,hasControls:!0,hasRotatingPoint:!0})})},kt=e=>{if(!e){console.error("makeAllObjCanvasUnselectable: canvas is null");return}e.discardActiveObject(),e.selection=!1,e.forEachObject(t=>{t.setOptions({evented:!1,selectable:!1,hasControls:!1,hasRotatingPoint:!1})})},Ae=e=>{e==null||e.off("mouse:up"),e==null||e.off("mouse:down"),e==null||e.off("mouse:move")};let oe="",se=!1,X=0,L=0,j=0,_=0;const y=5,vt=({canvas:e,squareModeSettings:t})=>{e&&(e.on("mouse:down",o=>{se=!0,oe=re();const n=e.getPointer(o.e),i=[n.x,n.y,n.x,n.y];X=n.x,L=n.y;const r=new A.fabric.Line(i,{cornerSize:6,strokeWidth:3,originX:"center",originY:"center",cornerStyle:"circle",fill:t.stroke,stroke:t.stroke,evented:!1,selectable:!1,hasControls:!1,hasRotatingPoint:!1});r.id=oe,e.add(r)}),e.on("mouse:move",o=>{if(!se)return;const n=e.getPointer(o.e),r=e.getObjects().filter(s=>(s==null?void 0:s.id)===oe);for(let s=0;s<r.length;s++){const l=r[s];l==null||l.setOptions({x2:n.x,y2:n.y})}e.renderAll()}),e.on("mouse:up",o=>{if(!se)return;const n=e.getPointer(o.e),r=e.getObjects().filter(u=>(u==null?void 0:u.id)===oe);for(let u=0;u<r.length;u++){const C=r[u];e.remove(C)}if(j=n.x,_=n.y,X===j&&L===_)return;const s=Math.atan2(_-L,j-X);j=j-y*Math.cos(s),_=_-y*Math.sin(s);const l=[{x:X,y:L},{x:X-y/4*Math.cos(s-Math.PI/2),y:L-y/4*Math.sin(s-Math.PI/2)},{x:j-y/4*Math.cos(s-Math.PI/2),y:_-y/4*Math.sin(s-Math.PI/2)},{x:j-y*Math.cos(s-Math.PI/2),y:_-y*Math.sin(s-Math.PI/2)},{x:j+y*2*Math.cos(s),y:_+y*2*Math.sin(s)},{x:j-y*Math.cos(s+Math.PI/2),y:_-y*Math.sin(s+Math.PI/2)},{x:j-y/4*Math.cos(s+Math.PI/2),y:_-y/4*Math.sin(s+Math.PI/2)},{x:X-y/4*Math.cos(s+Math.PI/2),y:L-y/4*Math.sin(s+Math.PI/2)},{x:X,y:L}],f=new A.fabric.Polyline(l,{opacity:1,cornerSize:6,originY:"top",originX:"left",evented:!1,selectable:!1,hasControls:!1,hasRotatingPoint:!1,fill:t.stroke,stroke:t.stroke});f.setCoords(),se=!1,e.add(f).renderAll()}))},xt=ye({__name:"MainCanvas",setup(e){const t=$e(),o=Fe(),n=W(null),{addListener:i,removeListener:r}=Je(a=>{const b=o.getSelectedCanvas;b&&et(a,b)}),s=a=>{var d,g;if(console.log("double click",a),a.target&&a.target.type==="i-text"){a.target.enterEditing(),r();return}const b={y:((d=a.pointer)==null?void 0:d.y)||0,x:(((g=a.pointer)==null?void 0:g.x)||0)-100};Ze({position:b,text:"Double click to edit text",canvas:o.getSelectedCanvas})},l=a=>{console.log("mouse down",a)},f=a=>{o.setSelectedCanvas({selectedCanvas:a})},u=a=>{console.log("selection",a),i(),t.setCanvasMode({canvasMode:"ObjContextMenu"})},C=a=>{t.setCanvasMode({canvasMode:"mainMenu"})};return qe(()=>({getCanvasMode:t.getCanvasMode,getIsDotBackground:t.getIsDotBackground,getSelectedCanvas:o.getSelectedCanvas,getDrawingSettings:o.getDrawingSettings,getSquareModeSettings:o.getSquareModeSettings}),a=>{const{getCanvasMode:b,getSelectedCanvas:d,getDrawingSettings:g,getIsDotBackground:M,getSquareModeSettings:P}=a;switch(Ae(d),De(b)&&(console.log("unselectable"),kt(d)),De(b)||(console.log("selectable"),Ct(d)),t.getCanvasMode){case"drawing":ht({canvas:d,drawingSettings:g});break;case"panning":bt({canvas:d});break;case"square":Mt({canvas:d,squareModeSettings:P});break;case"line":mt({canvas:d,squareModeSettings:P});break;case"arrow":vt({canvas:d,squareModeSettings:P});break;default:Ae(d);break}pt({canvas:d,backgroundColor:M?Ve({}):"transparent"})}),(a,b)=>(we(),Me("div",{class:"design-canvas-container",ref_key:"elRef",ref:n},[Xe(Ge,{id:"1",onMouseDown:l,onMouseDblclick:s,onCanvasCreated:f,onSelectionCreated:u,onSelectionUpdated:u,onSelectionCleared:C})],512))}});const jt=Ye(xt,[["__scopeId","data-v-13beea1f"]]),Pt=ye({__name:"DesignView",setup(e){return(t,o)=>(we(),Me("main",null,[Xe(jt)]))}});export{Pt as default};
