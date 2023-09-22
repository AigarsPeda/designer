import{f as b,d as fe,u as Oe,b as Se,r as V,e as Ie,o as ce,c as de,a as We,_ as Me,w as Be,g as xe}from"./index-0c8368d8.js";const je=e=>{if(!e){console.error("makeAllObjCanvasUnselectable: canvas is null");return}e.selection=!1,e.discardActiveObject(),e.forEachObject(t=>{t.setOptions({evented:!1,selectable:!1,hasControls:!1,hasRotatingPoint:!1})})},Ye=e=>{if(!e.length)return"";const t=e.reduce((n,[o,i],r,s)=>{const[l,f]=s[(r+1)%s.length];return n.push(o,i,(o+l)/2,(i+f)/2),n},["M",...e[0],"Q"]);return t.push("Z"),t.join(" ")},Pe=()=>`id-${Math.random().toString(16).slice(2)}`;function me(e,t,n,o=i=>i){return e*o(.5-t*(.5-n))}function Xe(e){return[-e[0],-e[1]]}function C(e,t){return[e[0]+t[0],e[1]+t[1]]}function m(e,t){return[e[0]-t[0],e[1]-t[1]]}function w(e,t){return[e[0]*t,e[1]*t]}function ze(e,t){return[e[0]/t,e[1]/t]}function z(e){return[e[1],-e[0]]}function be(e,t){return e[0]*t[0]+e[1]*t[1]}function Fe(e,t){return e[0]===t[0]&&e[1]===t[1]}function Le(e){return Math.hypot(e[0],e[1])}function Te(e){return e[0]*e[0]+e[1]*e[1]}function _e(e,t){return Te(m(e,t))}function De(e){return ze(e,Le(e))}function Ue(e,t){return Math.hypot(e[1]-t[1],e[0]-t[0])}function F(e,t,n){let o=Math.sin(n),i=Math.cos(n),r=e[0]-t[0],s=e[1]-t[1],l=r*i-s*o,f=r*o+s*i;return[l+t[0],f+t[1]]}function ue(e,t,n){return C(e,w(m(t,e),n))}function we(e,t,n){return C(e,w(t,n))}var{min:$,PI:Ve}=Math,Ce=.275,L=Ve+1e-4;function qe(e,t={}){let{size:n=16,smoothing:o=.5,thinning:i=.5,simulatePressure:r=!0,easing:s=u=>u,start:l={},end:f={},last:O=!1}=t,{cap:_=!0,easing:k=u=>u*(2-u)}=l,{cap:R=!0,easing:a=u=>--u*u*u+1}=f;if(e.length===0||n<=0)return[];let g=e[e.length-1].runningLength,y=l.taper===!1?0:l.taper===!0?Math.max(n,g):l.taper,W=f.taper===!1?0:f.taper===!0?Math.max(n,g):f.taper,he=Math.pow(n*o,2),B=[],A=[],K=e.slice(0,10).reduce((u,h)=>{let c=h.pressure;if(r){let d=$(1,h.distance/n),ne=$(1,1-d);c=$(1,u+(ne-u)*(d*Ce))}return(u+c)/2},e[0].pressure),p=me(n,i,e[e.length-1].pressure,s),Q,v=e[0].vector,Y=e[0].point,E=Y,P=Y,D=E,ee=!1;for(let u=0;u<e.length;u++){let{pressure:h}=e[u],{point:c,vector:d,distance:ne,runningLength:X}=e[u];if(u<e.length-1&&g-X<3)continue;if(i){if(r){let x=$(1,ne/n),re=$(1,1-x);h=$(1,K+(re-K)*(x*Ce))}p=me(n,i,h,s)}else p=n/2;Q===void 0&&(Q=p);let Re=X<y?k(X/y):1,Ae=g-X<W?a((g-X)/W):1;p=Math.max(.01,p*Math.min(Re,Ae));let ge=(u<e.length-1?e[u+1]:e[u]).vector,oe=u<e.length-1?be(d,ge):1,$e=be(d,v)<0&&!ee,ae=oe!==null&&oe<0;if($e||ae){let x=w(z(v),p);for(let re=1/13,H=0;H<=1;H+=re)P=F(m(c,x),c,L*H),B.push(P),D=F(C(c,x),c,L*-H),A.push(D);Y=P,E=D,ae&&(ee=!0);continue}if(ee=!1,u===e.length-1){let x=w(z(d),p);B.push(m(c,x)),A.push(C(c,x));continue}let pe=w(z(ue(ge,d,oe)),p);P=m(c,pe),(u<=1||_e(Y,P)>he)&&(B.push(P),Y=P),D=C(c,pe),(u<=1||_e(E,D)>he)&&(A.push(D),E=D),K=h,v=d}let S=e[0].point.slice(0,2),M=e.length>1?e[e.length-1].point.slice(0,2):C(e[0].point,[1,1]),te=[],G=[];if(e.length===1){if(!(y||W)||O){let u=we(S,De(z(m(S,M))),-(Q||p)),h=[];for(let c=1/13,d=c;d<=1;d+=c)h.push(F(u,S,L*2*d));return h}}else{if(!(y||W&&e.length===1))if(_)for(let h=1/13,c=h;c<=1;c+=h){let d=F(A[0],S,L*c);te.push(d)}else{let h=m(B[0],A[0]),c=w(h,.5),d=w(h,.51);te.push(m(S,c),m(S,d),C(S,d),C(S,c))}let u=z(Xe(e[e.length-1].vector));if(W||y&&e.length===1)G.push(M);else if(R){let h=we(M,u,p);for(let c=1/29,d=c;d<1;d+=c)G.push(F(h,M,L*3*d))}else G.push(C(M,w(u,p)),C(M,w(u,p*.99)),m(M,w(u,p*.99)),m(M,w(u,p)))}return B.concat(G,A.reverse(),te)}function Ee(e,t={}){var n;let{streamline:o=.5,size:i=16,last:r=!1}=t;if(e.length===0)return[];let s=.15+(1-o)*.85,l=Array.isArray(e[0])?e:e.map(({x:a,y:g,pressure:y=.5})=>[a,g,y]);if(l.length===2){let a=l[1];l=l.slice(0,-1);for(let g=1;g<5;g++)l.push(ue(l[0],a,g/4))}l.length===1&&(l=[...l,[...C(l[0],[1,1]),...l[0].slice(2)]]);let f=[{point:[l[0][0],l[0][1]],pressure:l[0][2]>=0?l[0][2]:.25,vector:[1,1],distance:0,runningLength:0}],O=!1,_=0,k=f[0],R=l.length-1;for(let a=1;a<l.length;a++){let g=r&&a===R?l[a].slice(0,2):ue(k.point,l[a],s);if(Fe(k.point,g))continue;let y=Ue(g,k.point);if(_+=y,a<R&&!O){if(_<i)continue;O=!0}k={point:g,pressure:l[a][2]>=0?l[a][2]:.5,vector:De(m(k.point,g)),distance:y,runningLength:_},f.push(k)}return f[0].vector=((n=f[1])==null?void 0:n.vector)||[0,0],f}function Ge(e,t={}){return qe(Ee(e,t),t)}var He=Ge;const ke="drawnObjects";let Z=!1,ie=[[0,0]],I=null;const Ze=({canvas:e,drawingMode:t})=>{if(!e){console.error("drawStrokeOnCanvas: canvas is null");return}e==null||e.off("mouse:up"),e==null||e.off("mouse:move"),e==null||e.off("mouse:down"),e.on("mouse:down",n=>{Z=!0,I=null;const o=e.getPointer(n.e);ie=[[o.x,o.y]]}),e.on("mouse:move",n=>{if(!Z)return;e.discardActiveObject();const o=e.getPointer(n.e);ie.push([o.x,o.y]);const i=He(ie,{size:t.size,thinning:t.thinning,smoothing:t.smoothing,streamline:t.streamline,easing(s){return s=Math.max(0,Math.min(1,s)),s*s*(3-2*s)}}),r=Ye(i);b.fabric.loadSVGFromString(`<svg>
         <path fill="${t.stroke}" d="${r}" />
      </svg>`,s=>{const l=new b.fabric.Group(s,{id:ke,selectable:!1,hasRotatingPoint:!1});I=l,e.add(l)})}),e.on("mouse:up",n=>{if(!Z)return;const i=e.getObjects().filter(r=>(r==null?void 0:r.id)===ke);if(i.length>0&&I){for(let r=0;r<i.length;r++)e.remove(i[r]);I.setOptions({selectable:!0,id:Pe(),hasRotatingPoint:!0}),I.bringForward(!0),e.add(I),e.renderAll()}je(e),Z=!1})},Ne=(e,t)=>{if(e)return setTimeout(()=>e.requestRenderAll(),t)},Je=({canvas:e,backgroundColor:t})=>{e&&e.setBackgroundColor(t,()=>Ne(e,0))};let N=0,J=0,se=!1;const Ke=({canvas:e})=>{e&&(e==null||e.off("mouse:up"),e==null||e.off("mouse:move"),e==null||e.off("mouse:down"),e.on("mouse:down",t=>{var n,o,i;if(se=!0,t&&t.e&&t.e.type==="touchstart"){const r=t.e;N=(n=r==null?void 0:r.changedTouches[0])==null?void 0:n.clientX,J=(o=r==null?void 0:r.changedTouches[0])==null?void 0:o.clientY}(i=t.target)==null||i.setOptions({opacity:.5})}),e.on("mouse:move",t=>{if(!(!se||!t||!t.e||t.target)){if(t.e.type==="mousemove"){const n=new b.fabric.Point(t.e.movementX,t.e.movementY);e.relativePan(n)}if(t.e.type==="touchmove"){const n=t.e,o=n==null?void 0:n.touches[0];if(!o)return;const i=.9;let r=(o.clientX-N)*i,s=(o.clientY-J)*i;N=o.clientX,J=o.clientY;const l=new b.fabric.Point(r,s);e.relativePan(l)}}}),e.on("mouse:up",t=>{var n;se=!1,(n=t.target)==null||n.setOptions({opacity:1}),N=0,J=0}))},Qe=({canvas:e,containerRef:t})=>{const n=(t==null?void 0:t.offsetWidth)||500,o=(t==null?void 0:t.offsetHeight)||500;e==null||e.setDimensions({width:n,height:o})},ve=({canvas:e})=>{e.on("mouse:wheel",t=>{const n=t.e.deltaY;let o=e.getZoom();o*=.999**n,o>20&&(o=20),o<.01&&(o=.01),e.zoomToPoint({x:t.e.offsetX,y:t.e.offsetY},o),t.e.preventDefault(),t.e.stopPropagation()})},et=e=>{e==null||e.off("mouse:up"),e==null||e.off("mouse:move"),e==null||e.off("mouse:down")},q=25,tt=.5,nt="fill:#64748b;stroke:#64748b;stroke-width:0.5;",ot=[[q,0],[0,0],[q,q],[0,q]],rt=({size:e=q,radius:t=tt,circleStyle:n=nt,circlePositions:o=ot})=>`<svg width="${e/2}" height="${e/2}" viewBox="0 0 ${e/2} ${e/2}" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs/><g>
    ${o.map(([i,r])=>`<circle style="${n}" cx="${i}" cy="${r}" r="${t}"/>`).join(`
`)}
    </g></svg>`,it=({svgString:e})=>`data:image/svg+xml;utf8,${encodeURIComponent(e)}`,st=()=>new b.fabric.Pattern({source:it({svgString:rt({})}),repeat:"repeat"}),lt=fe({__name:"FabricCanvas",props:{id:{}},emits:["mouse:dblclick","canvas-created"],setup(e,{emit:t}){Oe(),Se();const n=V(null),o=V(null),i=V({width:0,height:0}),r=V(null);return Ie(()=>{var l,f,O,_;const s=new b.fabric.Canvas(r.value,{width:((l=o.value)==null?void 0:l.offsetWidth)||500,height:((f=o.value)==null?void 0:f.offsetHeight)||500});s&&(n.value=s,t("canvas-created",s),s.on("mouse:dblclick",()=>{t("mouse:dblclick")}),i.value={width:((O=o.value)==null?void 0:O.offsetWidth)||500,height:((_=o.value)==null?void 0:_.offsetHeight)||500},ve({canvas:s}),window.addEventListener("resize",()=>{Qe({canvas:s,containerRef:o.value})}))}),(s,l)=>(ce(),de("div",{class:"container",ref_key:"containerRef",ref:o},[We("canvas",{id:"canvas",ref_key:"canvasReference",ref:r,width:500,height:500},null,512)],512))}});const ut=Me(lt,[["__scopeId","data-v-e56d0c65"]]),ft=({canvas:e,action:t})=>{e==null||e.off("mouse:up"),e==null||e.off("mouse:move"),e==null||e.off("mouse:down"),e==null||e.on("mouse:up",n=>{console.log("mouse:up",n);const i=e.getActiveObjects().map(r=>(r==null?void 0:r.id)||"no id");if(i.length>0){t("ObjContextMenu",i);return}t("mainMenu",[])})};let j="",T=0,U=0,le=!1;const ct=({canvas:e,endAction:t,squareModeSettings:n})=>{if(e){if(e==null||e.off("mouse:up"),e==null||e.off("mouse:move"),e==null||e.off("mouse:down"),j){const i=e.getObjects().find(r=>r.id===j);if(!i)return;i.set({stroke:n.stroke,fill:n.background,strokeWidth:n.strokeWidth}),e.renderAll()}e.on("mouse:down",o=>{if(j!==""){j="",t();return}le=!0;const i=e.getPointer(o.e);T=i.x,U=i.y;const r=new b.fabric.Rect({angle:0,top:U,left:T,evented:!0,originY:"top",originX:"left",selectable:!0,hasRotatingPoint:!0,width:i.x-T,height:i.y-U,stroke:n.stroke,fill:n.background,strokeWidth:n.strokeWidth});r.id=Pe(),j=r.id,e.add(r)}),e.on("mouse:move",o=>{if(!le||!j)return;const i=e.getPointer(o.e),s=e.getObjects().find(l=>l.id===j);s&&(T>i.x&&s.set({left:Math.abs(i.x)}),U>i.y&&s.set({top:Math.abs(i.y)}),s.setOptions({width:Math.abs(T-i.x),height:Math.abs(U-i.y)}),e.renderAll())}),e.on("mouse:up",o=>{e.getObjects().find(s=>s.id===j)&&(le=!1)})}},ye=e=>e==="drawing"||e==="panning",dt=e=>{if(!e){console.error("makeAllObjCanvasSelectable: canvas is null");return}e.selection=!0,e.forEachObject(t=>{t.setOptions({evented:!0,selectable:!0,hasControls:!0,hasRotatingPoint:!0})})},ht=fe({__name:"MainDesign",setup(e){const t=Oe(),n=Se(),o=V(null),i=r=>{n.setSelectedCanvas({selectedCanvas:r});const s=r.getCenter();new b.fabric.Circle({radius:20,fill:"#4f46e5",top:s.top+100,left:s.left+100}),new b.fabric.Triangle({width:60,height:70,fill:"#c026d3",top:s.top+50,left:s.left+50}),new b.fabric.IText("Test text",{fontSize:22,top:s.top,left:s.left,hasControls:!0,fontStyle:"normal",fontWeight:"normal",fontFamily:"Helvetica"}),new b.fabric.Line([80,10,200,150],{stroke:"#374151"}),new b.fabric.Polyline([{x:80,y:10},{x:200,y:150},{x:500,y:250}],{stroke:"#ea580c",fill:"transparent",strokeWidth:5,strokeLineCap:"round",strokeLineJoin:"round"}),console.log("handleCreated --->",r)};return Be(()=>({getCanvasMode:t.getCanvasMode,getDrawingMode:n.getDrawingMode,getIsDotBackground:t.getIsDotBackground,getSelectedCanvas:n.getSelectedCanvas,getSquareModeSettings:n.getSquareModeSettings}),r=>{const{getCanvasMode:s,getDrawingMode:l,getSelectedCanvas:f,getIsDotBackground:O,getSquareModeSettings:_}=r;switch(ye(s)&&je(f),ye(s)||dt(f),t.getCanvasMode){case"drawing":Ze({canvas:f,drawingMode:l});break;case"panning":Ke({canvas:f});break;case"square":console.log("getSquareModeSettings --->",_),ct({canvas:f,squareModeSettings:_,endAction:()=>{t.setCanvasMode({canvasMode:"mainMenu"})}});break;case"mainMenu":case"ObjContextMenu":ft({canvas:f,action:(k,R)=>{t.setCanvasMode({canvasMode:k}),n.setSelectedObjectIds({selectedObjectIds:R})}});break;default:et(f);break}Je({canvas:f,backgroundColor:O?st():"transparent"})}),(r,s)=>(ce(),de("div",{class:"design-canvas-container",ref_key:"elRef",ref:o},[xe(ut,{onCanvasCreated:i,id:"1"})],512))}});const gt=Me(ht,[["__scopeId","data-v-ecd800d9"]]),pt=fe({__name:"DesignView",setup(e){return(t,n)=>(ce(),de("main",null,[xe(gt)]))}});export{pt as default};
