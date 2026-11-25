import * as T from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
export const V=a=>new T.Vector3(...a);
const M=(c,m=.1,r=.6,b)=>({c,m,r,b});
export const MAT={alu:M(0xaeb3b8,.75,.42,'cast'),cast:M(0x8b9096,.6,.55,'cast'),iron:M(0x6f625a,.6,.75,'cast'),steel:M(0xc8ccd0,.9,.28),zinc:M(0xd3cfae,.85,.35),blk:M(0x34393f,.05,.55),rub:M(0x26292c,0,.75,'rub'),gold:M(0xb89a5a,.85,.35),shield:M(0xa9aaa6,.85,.38,'cast'),white:M(0xdcdcd2,0,.4),red:M(0xb3312c,.1,.5),body:M(0x8f1d22,.45,.38),cu:M(0xb06a3a,.9,.3),blue:M(0x2b8fd8,.0,.3),green:M(0x3b8f55,0,.5),yel:M(0xd9a520,0,.5),paper:M(0xd8c79a,0,.9),roof:M(0x17191b,.3,.25),chr:M(0xe6e9ec,1,.12),mir:M(0xdfe6ea,1,.03),rim:M(0xb9bec3,.85,.3),tyre:M(0x202224,0,.82,'rub'),disc:M(0x9aa0a5,.9,.35),pad:M(0x5a4a40,.1,.9),lth:M(0x3d4147,0,.5),fab:M(0x5b6067,0,.95,'rub'),carp:M(0x303338,0,1),hdl:M(0xb5b2a8,0,.95),org:M(0xff8a1a,0,.3),lens:M(0xb3121a,.05,.15),glass:{...M(0x9fc0c4,.1,.05),o:.3},clear:{...M(0xf2f7fa,.1,.05),o:.45}};
const bump={};
function tex(k){if(bump[k])return bump[k];const n=128,d=new Uint8Array(n*n*4);for(let i=0;i<n*n;i++){const u=i%n,v=i/n|0;const g=k==='cast'?120+Math.random()*110:128+40*Math.sin((u+v)*.8)+40*Math.sin((u-v)*.8)+Math.random()*20;d.set([g,g,g,255],i*4)}const t=new T.DataTexture(d,n,n);t.magFilter=T.LinearFilter;t.minFilter=T.LinearMipmapLinearFilter;t.generateMipmaps=true;t.needsUpdate=true;t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(k==='cast'?3:10,3);return bump[k]=t}
export const material=m=>{const o=MAT[m],cc=['body','roof'].includes(m),x=new (cc?T.MeshPhysicalMaterial:T.MeshStandardMaterial)({color:o.c,metalness:o.m,roughness:o.r,side:T.DoubleSide,...(cc?{clearcoat:1,clearcoatRoughness:.04}:{}),envMapIntensity:o.o?1.6:1});if(o.o){x.transparent=true;x.opacity=o.o;x.userData.o=o.o}x.userData.mk=m;if(o.b){x.bumpMap=tex(o.b);x.bumpScale=o.b==='cast'?.7:.5}return x};
export const mesh=(g,m,p,rot)=>{const x=new T.Mesh(g,undefined);x.userData.mat=m;if(p)x.position.set(...p);if(rot)x.rotation.set(...rot);return x};
export const box=(s,p=[0,0,0],m='cast',r=8,rot)=>mesh(new RoundedBoxGeometry(...s,2,Math.min(r,Math.min(...s)/2.1)),m,p,rot);
const AX={x:[0,0,Math.PI/2],y:[0,0,0],z:[Math.PI/2,0,0]};
export const cyl=(r,h,p=[0,0,0],ax='y',m='alu',r2=r,n=32)=>mesh(new T.CylinderGeometry(r2,r,h,n),m,p,AX[ax]);
export const tor=(R,r,p=[0,0,0],ax='y',m='steel')=>mesh(new T.TorusGeometry(R,r,10,40),m,p,ax==='x'?[0,Math.PI/2,0]:ax==='y'?[Math.PI/2,0,0]:[0,0,0]);
export const lathe=(pts,p,ax,m,n=48)=>mesh(new T.LatheGeometry(pts.map(q=>new T.Vector2(...q)),n),m,p,AX[ax]);
const crv=(pts,cl=false)=>new T.CatmullRomCurve3(pts.map(V),cl,'centripetal');
// tube à rayon variable
export function vtube(pts,rf,m='rub',seg=80,rad=18){const c=crv(pts),f=c.computeFrenetFrames(seg,false),pos=[],uv=[],ix=[];for(let i=0;i<=seg;i++){const u=i/seg,q=c.getPointAt(u),r=rf(u);for(let j=0;j<=rad;j++){const a=j/rad*2*Math.PI,v=q.clone().addScaledVector(f.normals[i],Math.cos(a)*r).addScaledVector(f.binormals[i],Math.sin(a)*r);pos.push(v.x,v.y,v.z);uv.push(j/rad*2,u*6);if(i<seg&&j<rad){const k=i*(rad+1)+j;ix.push(k,k+rad+1,k+1,k+1,k+rad+1,k+rad+2)}}}const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(ix);g.computeVertexNormals();return mesh(g,m)}
export const tube=(pts,r,m='rub',seg=Math.max(40,pts.length*12))=>mesh(new T.TubeGeometry(crv(pts),seg,r,r<9?10:18),m);
// place des maillages construits sur l'axe +Y local
export const loc=(ms,at,dir)=>{ms=ms.flat(9);const mx=new T.Matrix4().compose(V(at),new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),V(dir).normalize()),new T.Vector3(1,1,1));return ms.map(m=>{m.updateMatrix();m.applyMatrix4(mx);return m})};
const D={x:[1,0,0],'-x':[-1,0,0],y:[0,1,0],'-y':[0,-1,0],z:[0,0,1],'-z':[0,0,-1]};
export const dv=d=>typeof d==='string'?D[d]:d;
// vis H à embase, tête vers dir
export const hb=(p,dir='y',M=6,L=16)=>{const r={5:4.6,6:5.8,8:7.5,10:9.2,12:10.4,14:12}[M]||M;return loc([mesh(new T.CylinderGeometry(r,r,M*.75,6),'zinc',[0,M*.6,0]),cyl(r*1.25,1.6,[0,.8,0],'y','zinc',r*1.15,20),cyl(M/2,L,[0,-L/2,0],'y','steel',M/2,12)],p,dv(dir))};
export const nut=(p,dir='y',M=8)=>loc([mesh(new T.CylinderGeometry(M*.9,M*.9,M*.8,6),'zinc',[0,M*.4,0]),cyl(M*1.15,1.8,[0,.9,0],'y','zinc'),cyl(M/2,M*1.7,[0,M*.5,0],'y','steel',M/2,12)],p,dv(dir));
export const oring=(Di,s,p,ax='y',m='red')=>tor(Di/2+s/2,s/2,p,ax,m);
// raccord banjo : œil, vis creuse, deux joints cuivre
export const banjo=(p,dir,R=9)=>{const d=dv(dir);return{oeil:loc([cyl(R,9,[0,0,0],'y','steel')],p,d),vis:loc([mesh(new T.CylinderGeometry(R*.85,R*.85,7,6),'zinc',[0,10,0]),cyl(R*.45,28,[0,-4,0],'y','steel')],p,d),j1:loc([tor(R*.75,1.3,[0,5.6,0],'y','cu')],p,d),j2:loc([tor(R*.75,1.3,[0,-5.6,0],'y','cu')],p,d)}};
export const spring=(at,dir,r)=>loc([mesh(new T.CylinderGeometry(r+1.6,r+1.6,10,32,1,true),'steel'),mesh(new T.CylinderGeometry(r+2.6,r+2.6,10,32,1,true),'steel'),box([3,10,12],[r+7,0,4],'steel',1),box([3,10,12],[r+7,0,-4],'steel',1)],at,dir);
export const worm=(at,dir,r)=>loc([mesh(new T.CylinderGeometry(r+1.6,r+1.6,9,36,1,true),'steel'),box([11,11,22],[r+7,0,0],'steel',2),mesh(new T.CylinderGeometry(4,4,9,6),'zinc',[r+8,0,15],[Math.PI/2,0,0]),...[...Array(14)].map((_,i)=>{const a=1+i*.12;return box([1.4,6,1.2],[(r+2.3)*Math.cos(a),0,(r+2.3)*Math.sin(a)],'blk',.3)})],at,dir);
export const conn=(p,dir,n=3,c='blk')=>loc([box([8+n*5,22,16],[0,8,0],c,2),box([6,16,4],[0,8,10],c,1),box([10+n*5,3,18],[0,2,0],'red',1),...[...Array(n)].map((_,i)=>tube([[(i-(n-1)/2)*5,18,0],[(i-(n-1)/2)*4,30,2],[(i-(n-1)/2)*2,44,-3]],1.3,['red','blue','yel','green','white'][i%5],10))],p,dv(dir));
export const ext=(pts,d,p,m,rot,bev=4,holes=[])=>{const s=new T.Shape(pts.map(q=>new T.Vector2(...q)));for(const h of holes)s.holes.push(h);return mesh(new T.ExtrudeGeometry(s,{depth:d,bevelEnabled:bev>0,bevelSize:bev,bevelThickness:bev,bevelSegments:2,curveSegments:20}),m,p,rot)};
export const hole=(x,y,r,ry=r)=>{const h=new T.Path();h.absellipse(x,y,r,ry,0,2*Math.PI,false);return h};
export const poly=pts=>new T.Path(pts.map(q=>new T.Vector2(...q)));
// plaque percée, plan XZ, épaisseur vers +Y
export const plateY=(pts,d,y,m,holes=[],bev=0)=>ext(pts.map(([a,b])=>[a,-b]),d,[0,y,0],m,[-Math.PI/2,0,0],bev,holes);
export const ring=(pts,r,m='red',seg=140)=>mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts.map(V),true,'catmullrom',.15),seg,r,6,true),m);
export const gear=(r,h,n,p,ax,m='steel',hb=8)=>{const pts=[];for(let i=0;i<n*4;i++){const a=i/(n*4)*2*Math.PI,k=(i%4<2)?r:r-4;pts.push([k*Math.cos(a),k*Math.sin(a)])}const g=ext(pts,h,[0,0,0],m,null,0,[hole(0,0,hb),...(r>35?[0,1,2,3,4,5].map(i=>hole(r*.6*Math.cos(i*1.047),r*.6*Math.sin(i*1.047),r*.14)):[])]);g.geometry.translate(0,0,-h/2);if(ax==='x')g.geometry.rotateY(Math.PI/2);if(ax==='y')g.geometry.rotateX(Math.PI/2);g.position.set(...p);return g};
export const spr=(p,r,w,L,n,m='steel',ax=[0,1,0])=>{const pts=[];for(let i=0;i<=n*12;i++){const a=i/12*2*Math.PI;pts.push(new T.Vector3(r*Math.cos(a),L*(i/(n*12)-.5),r*Math.sin(a)))}return loc([mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts),n*14,w,6),m)],p,ax)[0]};
export const _=0;export const tg=(name,ms,o={})=>{ms=[].concat(ms).flat(9);ms.forEach(m=>m.userData.sub={name,...o});return ms};
let hmode='spring';export const setClamp=m=>hmode=m;
export const hose=(pts,r,m='rub',cl=true,kind)=>{const L=crv(pts).getLength(),e=Math.min(.12,26/L);const a=[vtube(pts,u=>u<e||u>1-e?r+1.8:r,m,Math.min(120,Math.round(L/4)+20))];if(cl){const c=crv(pts);const k=kind||(r>24?'worm':'spring');[['A',e*.5],['B',1-e*.5]].forEach(([s,u])=>{const q=c.getPointAt(u),d=c.getTangentAt(u);const ms=(k==='worm'?worm:spring)(q.toArray(),d.toArray(),r+1.5);ms.forEach(x=>x.userData.end=s);a.push(...ms)})}return a};
export const C=[-126,-42,42,126];
export const rep=(a,f)=>a.flatMap(f);
export const circ=(n,f,o=0)=>[...Array(n)].flatMap((_,i)=>f(i/n*2*Math.PI+o,i));
