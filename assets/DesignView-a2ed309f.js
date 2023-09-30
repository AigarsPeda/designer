import{d as de,u as Se,b as Pe,r as B,e as Ae,f as P,o as ce,c as he,a as Ee,_ as De,g as We,h as Ye,i as Fe,w as Xe,j as Ie,k as Ue}from"./index-001f3735.js";const qe=({canvas:e,containerRef:t})=>{const o=(t==null?void 0:t.offsetWidth)||500,n=(t==null?void 0:t.offsetHeight)||500;e==null||e.setDimensions({width:o,height:n})},He=({canvas:e})=>{e.on("mouse:wheel",t=>{const o=t.e.deltaY;let n=e.getZoom();n*=.999**o,n>20&&(n=20),n<.01&&(n=.01),e.zoomToPoint({x:t.e.offsetX,y:t.e.offsetY},n),t.e.preventDefault(),t.e.stopPropagation()})},$e=de({__name:"FabricCanvas",props:{id:{}},emits:["mouse:dblclick","canvas-created"],setup(e,{emit:t}){Se(),Pe();const o=B(null),n=B(null),r=B({width:0,height:0}),s=B(null);return Ae(()=>{var i,f,g,w;const l=new P.fabric.Canvas(s.value,{width:((i=n.value)==null?void 0:i.offsetWidth)||500,height:((f=n.value)==null?void 0:f.offsetHeight)||500});l&&(o.value=l,t("canvas-created",l),l.on("mouse:dblclick",()=>{t("mouse:dblclick")}),r.value={width:((g=n.value)==null?void 0:g.offsetWidth)||500,height:((w=n.value)==null?void 0:w.offsetHeight)||500},He({canvas:l}),window.addEventListener("resize",()=>{qe({canvas:l,containerRef:n.value})}))}),(l,i)=>(ce(),he("div",{class:"container",ref_key:"containerRef",ref:n},[Ee("canvas",{id:"canvas",ref_key:"canvasReference",ref:s,width:500,height:500},null,512)],512))}});const Ve=De($e,[["__scopeId","data-v-3428e730"]]),Ze=e=>{const t=B(null),o=()=>{t.value&&window.addEventListener("keydown",t.value)},n=()=>{t.value&&window.removeEventListener("keydown",t.value)};return Ae(()=>{t.value=e}),We(()=>{n()}),{addListener:o,removeListener:n}},Ge=(e,t)=>{if(e.key==="Backspace"){const o=t.getActiveObject();if(!o)return;t.remove(o)}},Re=e=>{if(!e){console.error("makeAllObjCanvasUnselectable: canvas is null");return}e.selection=!1,e.discardActiveObject(),e.forEachObject(t=>{t.setOptions({evented:!1,selectable:!1,hasControls:!1,hasRotatingPoint:!1})})},Ke=e=>{if(!e.length)return"";const t=e.reduce((o,[n,r],s,l)=>{const[i,f]=l[(s+1)%l.length];return o.push(n,r,(n+i)/2,(r+f)/2),o},["M",...e[0],"Q"]);return t.push("Z"),t.join(" ")},ae=()=>`id-${Math.random().toString(16).slice(2)}`;function _e(e,t,o,n=r=>r){return e*n(.5-t*(.5-o))}function Ne(e){return[-e[0],-e[1]]}function C(e,t){return[e[0]+t[0],e[1]+t[1]]}function b(e,t){return[e[0]-t[0],e[1]-t[1]]}function _(e,t){return[e[0]*t,e[1]*t]}function ve(e,t){return[e[0]/t,e[1]/t]}function W(e){return[e[1],-e[0]]}function Ce(e,t){return e[0]*t[0]+e[1]*t[1]}function Qe(e,t){return e[0]===t[0]&&e[1]===t[1]}function Je(e){return Math.hypot(e[0],e[1])}function et(e){return e[0]*e[0]+e[1]*e[1]}function we(e,t){return et(b(e,t))}function Be(e){return ve(e,Je(e))}function tt(e,t){return Math.hypot(e[1]-t[1],e[0]-t[0])}function Y(e,t,o){let n=Math.sin(o),r=Math.cos(o),s=e[0]-t[0],l=e[1]-t[1],i=s*r-l*n,f=s*n+l*r;return[i+t[0],f+t[1]]}function fe(e,t,o){return C(e,_(b(t,e),o))}function Oe(e,t,o){return C(e,_(t,o))}var{min:I,PI:ot}=Math,ke=.275,F=ot+1e-4;function nt(e,t={}){let{size:o=16,smoothing:n=.5,thinning:r=.5,simulatePressure:s=!0,easing:l=u=>u,start:i={},end:f={},last:g=!1}=t,{cap:w=!0,easing:O=u=>u*(2-u)}=i,{cap:A=!0,easing:h=u=>--u*u*u+1}=f;if(e.length===0||o<=0)return[];let a=e[e.length-1].runningLength,k=i.taper===!1?0:i.taper===!0?Math.max(o,a):i.taper,L=f.taper===!1?0:f.taper===!0?Math.max(o,a):f.taper,ge=Math.pow(o*n,2),T=[],D=[],v=e.slice(0,10).reduce((u,p)=>{let d=p.pressure;if(s){let c=I(1,p.distance/o),oe=I(1,1-c);d=I(1,u+(oe-u)*(c*ke))}return(u+d)/2},e[0].pressure),m=_e(o,r,e[e.length-1].pressure,l),Q,J=e[0].vector,z=e[0].point,H=z,x=z,S=H,ee=!1;for(let u=0;u<e.length;u++){let{pressure:p}=e[u],{point:d,vector:c,distance:oe,runningLength:E}=e[u];if(u<e.length-1&&a-E<3)continue;if(r){if(s){let j=I(1,oe/o),re=I(1,1-j);p=I(1,v+(re-v)*(j*ke))}m=_e(o,r,p,l)}else m=o/2;Q===void 0&&(Q=m);let Le=E<k?O(E/k):1,Te=a-E<L?h((a-E)/L):1;m=Math.max(.01,m*Math.min(Le,Te));let pe=(u<e.length-1?e[u+1]:e[u]).vector,ne=u<e.length-1?Ce(c,pe):1,ze=Ce(c,J)<0&&!ee,me=ne!==null&&ne<0;if(ze||me){let j=_(W(J),m);for(let re=1/13,V=0;V<=1;V+=re)x=Y(b(d,j),d,F*V),T.push(x),S=Y(C(d,j),d,F*-V),D.push(S);z=x,H=S,me&&(ee=!0);continue}if(ee=!1,u===e.length-1){let j=_(W(c),m);T.push(b(d,j)),D.push(C(d,j));continue}let be=_(W(fe(pe,c,ne)),m);x=b(d,be),(u<=1||we(z,x)>ge)&&(T.push(x),z=x),S=C(d,be),(u<=1||we(H,S)>ge)&&(D.push(S),H=S),v=p,J=c}let y=e[0].point.slice(0,2),M=e.length>1?e[e.length-1].point.slice(0,2):C(e[0].point,[1,1]),te=[],$=[];if(e.length===1){if(!(k||L)||g){let u=Oe(y,Be(W(b(y,M))),-(Q||m)),p=[];for(let d=1/13,c=d;c<=1;c+=d)p.push(Y(u,y,F*2*c));return p}}else{if(!(k||L&&e.length===1))if(w)for(let p=1/13,d=p;d<=1;d+=p){let c=Y(D[0],y,F*d);te.push(c)}else{let p=b(T[0],D[0]),d=_(p,.5),c=_(p,.51);te.push(b(y,d),b(y,c),C(y,c),C(y,d))}let u=W(Ne(e[e.length-1].vector));if(L||k&&e.length===1)$.push(M);else if(A){let p=Oe(M,u,m);for(let d=1/29,c=d;c<1;c+=d)$.push(Y(p,M,F*3*c))}else $.push(C(M,_(u,m)),C(M,_(u,m*.99)),b(M,_(u,m*.99)),b(M,_(u,m)))}return T.concat($,D.reverse(),te)}function rt(e,t={}){var o;let{streamline:n=.5,size:r=16,last:s=!1}=t;if(e.length===0)return[];let l=.15+(1-n)*.85,i=Array.isArray(e[0])?e:e.map(({x:h,y:a,pressure:k=.5})=>[h,a,k]);if(i.length===2){let h=i[1];i=i.slice(0,-1);for(let a=1;a<5;a++)i.push(fe(i[0],h,a/4))}i.length===1&&(i=[...i,[...C(i[0],[1,1]),...i[0].slice(2)]]);let f=[{point:[i[0][0],i[0][1]],pressure:i[0][2]>=0?i[0][2]:.25,vector:[1,1],distance:0,runningLength:0}],g=!1,w=0,O=f[0],A=i.length-1;for(let h=1;h<i.length;h++){let a=s&&h===A?i[h].slice(0,2):fe(O.point,i[h],l);if(Qe(O.point,a))continue;let k=tt(a,O.point);if(w+=k,h<A&&!g){if(w<r)continue;g=!0}O={point:a,pressure:i[h][2]>=0?i[h][2]:.5,vector:Be(b(O.point,a)),distance:k,runningLength:w},f.push(O)}return f[0].vector=((o=f[1])==null?void 0:o.vector)||[0,0],f}function it(e,t={}){return nt(rt(e,t),t)}var st=it;const ye="drawnObjects";let Z=!1,ie=[[0,0]],R=null;const lt=({canvas:e,drawingSettings:t})=>{if(!e){console.error("drawStrokeOnCanvas: canvas is null");return}e==null||e.off("mouse:up"),e==null||e.off("mouse:move"),e==null||e.off("mouse:down"),e.on("mouse:down",o=>{Z=!0,R=null;const n=e.getPointer(o.e);ie=[[n.x,n.y]]}),e.on("mouse:move",o=>{if(!Z)return;e.discardActiveObject();const n=e.getPointer(o.e);ie.push([n.x,n.y]);const r=st(ie,{size:t.size,thinning:t.thinning,smoothing:t.smoothing,streamline:t.streamline,easing(l){return l=Math.max(0,Math.min(1,l)),l*l*(3-2*l)}}),s=Ke(r);P.fabric.loadSVGFromString(`<svg>
         <path fill="${t.stroke}" d="${s}" />
      </svg>`,l=>{const i=new P.fabric.Group(l,{id:ye,selectable:!1,hasRotatingPoint:!1});R=i,e.add(i)})}),e.on("mouse:up",o=>{if(!Z)return;const r=e.getObjects().filter(s=>(s==null?void 0:s.id)===ye);if(r.length>0&&R){for(let s=0;s<r.length;s++)e.remove(r[s]);R.setOptions({selectable:!0,id:ae(),hasRotatingPoint:!0}),R.bringForward(!0),e.add(R),e.renderAll()}Re(e),Z=!1})},ut=(e,t)=>{if(e)return setTimeout(()=>e.requestRenderAll(),t)},ft=({canvas:e,backgroundColor:t})=>{e&&e.setBackgroundColor(t,()=>ut(e,0))};let G=0,K=0,se=!1;const dt=({canvas:e})=>{e&&(e==null||e.off("mouse:up"),e==null||e.off("mouse:move"),e==null||e.off("mouse:down"),e.on("mouse:down",t=>{var o,n,r;if(se=!0,t&&t.e&&t.e.type==="touchstart"){const s=t.e;G=(o=s==null?void 0:s.changedTouches[0])==null?void 0:o.clientX,K=(n=s==null?void 0:s.changedTouches[0])==null?void 0:n.clientY}(r=t.target)==null||r.setOptions({opacity:.5})}),e.on("mouse:move",t=>{if(!(!se||!t||!t.e||t.target)){if(t.e.type==="mousemove"){const o=new P.fabric.Point(t.e.movementX,t.e.movementY);e.relativePan(o)}if(t.e.type==="touchmove"){const o=t.e,n=o==null?void 0:o.touches[0];if(!n)return;const r=.9;let s=(n.clientX-G)*r,l=(n.clientY-K)*r;G=n.clientX,K=n.clientY;const i=new P.fabric.Point(s,l);e.relativePan(i)}}}),e.on("mouse:up",t=>{var o;se=!1,(o=t.target)==null||o.setOptions({opacity:1}),G=0,K=0}))};let le=0;const Me=200;let N=!1;const je=({canvas:e,action:t,removeListener:o})=>{e==null||e.off("mouse:up"),e==null||e.off("mouse:move"),e==null||e.off("mouse:down"),e==null||e.on("mouse:up",n=>{le&&clearTimeout(le),le=setTimeout(()=>{if(N)return;const s=e.getActiveObjects().map(l=>(l==null?void 0:l.id)||"no id");if(s.length>0){t("ObjContextMenu",s);return}t("mainMenu",[])},Me)}),e==null||e.on("mouse:dblclick",n=>{var s,l;const r=e.findTarget(n.e,!0);if(console.log("double clicked type ---->",r==null?void 0:r.type),!N){if((r==null?void 0:r.type)==="i-text"){o();const i=r;if(i!=null&&i.isEditing)return;i.enterEditing()}if((r==null?void 0:r.type)==="rect"||!r){const i={x:((s=n.pointer)==null?void 0:s.x)||0,y:((l=n.pointer)==null?void 0:l.y)||0},f=new P.fabric.IText("Double click to edit text",{fontSize:16,editable:!0,selected:!0,fontWeight:"bold",top:i.y,left:i.x,hasRotatingPoint:!1,fontFamily:"Montserrat"});f.id=ae(),f.bringToFront(),e==null||e.add(f),e.setActiveObject(f),t("ObjContextMenu",[f.id])}N=!0,setTimeout(()=>{N=!1},Me+100)}})},ct=Ye();let X="",U=0,q=0,ue=!1;const ht=({canvas:e,endAction:t,squareModeSettings:o})=>{e&&(e==null||e.off("mouse:up"),e==null||e.off("mouse:move"),e==null||e.off("mouse:down"),e.on("mouse:down",n=>{ue=!0;const r=e.getPointer(n.e);U=r.x,q=r.y;const s=new P.fabric.Rect({angle:0,top:q,left:U,evented:!0,originY:"top",originX:"left",selectable:!0,hasRotatingPoint:!0,width:r.x-U,height:r.y-q,rx:o.rx,ry:o.ry,stroke:o.stroke,strokeWidth:o.strokeWidth,fill:Fe({pasterns:ct,stroke:o.stroke,background:o.background})});s.id=ae(),X=s.id,e.add(s),e.setActiveObject(s)}),e.on("mouse:move",n=>{if(!ue||!X)return;const r=e.getPointer(n.e),l=e.getObjects().find(i=>i.id===X);l&&(U>r.x&&l.set({left:Math.abs(r.x)}),q>r.y&&l.set({top:Math.abs(r.y)}),l.setOptions({width:Math.abs(U-r.x),height:Math.abs(q-r.y)}),e.renderAll())}),e.on("mouse:up",n=>{const r=e.getActiveObject();r&&(e.add(r),ue=!1,t(X),X="")}))},xe=e=>e==="drawing"||e==="panning",at=e=>{if(!e){console.error("makeAllObjCanvasSelectable: canvas is null");return}e.selection=!0,e.forEachObject(t=>{t.setOptions({evented:!0,selectable:!0,hasControls:!0,hasRotatingPoint:!0})})},gt=e=>{e==null||e.off("mouse:up"),e==null||e.off("mouse:move"),e==null||e.off("mouse:down")},pt=de({__name:"MainCanvas",setup(e){const t=Se(),o=Pe(),n=B(null),r=i=>{o.setSelectedCanvas({selectedCanvas:i})},{addListener:s,removeListener:l}=Ze(i=>{const f=o.getSelectedCanvas;f&&Ge(i,f)});return Xe(()=>({getCanvasMode:t.getCanvasMode,getIsDotBackground:t.getIsDotBackground,getSelectedCanvas:o.getSelectedCanvas,getDrawingSettings:o.getDrawingSettings,getSquareModeSettings:o.getSquareModeSettings}),i=>{const{getCanvasMode:f,getSelectedCanvas:g,getDrawingSettings:w,getIsDotBackground:O,getSquareModeSettings:A}=i;switch(xe(f)&&Re(g),xe(f)||at(g),t.getCanvasMode){case"drawing":lt({canvas:g,drawingSettings:w});break;case"panning":dt({canvas:g});break;case"square":ht({canvas:g,squareModeSettings:A,endAction:h=>{t.setCanvasMode({canvasMode:"ObjContextMenu"}),o.setSelectedObjectIds({selectedObjectIds:[h]})}});break;case"mainMenu":je({removeListener:l,canvas:g,action:(h,a)=>{t.setCanvasMode({canvasMode:h}),o.setSelectedObjectIds({selectedObjectIds:a})}});break;case"ObjContextMenu":s(),je({removeListener:l,canvas:g,action:(h,a)=>{t.setCanvasMode({canvasMode:h}),o.setSelectedObjectIds({selectedObjectIds:a})}});break;default:gt(g);break}ft({canvas:g,backgroundColor:O?Ue({}):"transparent"})}),(i,f)=>(ce(),he("div",{class:"design-canvas-container",ref_key:"elRef",ref:n},[Ie(Ve,{onCanvasCreated:r,id:"1"})],512))}});const mt=De(pt,[["__scopeId","data-v-e8158b46"]]),_t=de({__name:"DesignView",setup(e){return(t,o)=>(ce(),he("main",null,[Ie(mt)]))}});export{_t as default};
