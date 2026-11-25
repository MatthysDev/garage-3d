import * as T from 'three';
import {MeshBVH} from 'three-mesh-bvh';
const bv=g=>g.boundsTree||=new MeshBVH(g);
// profondeur de pénétration mesurée sur les points d'échantillon de A situés dans le volume de B (parité majoritaire sur 3 rayons)
export function audit(PARTS,by){const roots=PARTS.filter(p=>!p.par);const inf=roots.map(p=>{const ms=[];[p,...p.kids].forEach(q=>q.g.traverse(m=>{if(m.isMesh){m.updateWorldMatrix(true,false);ms.push(m)}}));const box=new T.Box3();ms.forEach(m=>{m.geometry.computeBoundingBox();box.union(m.geometry.boundingBox)});
 const pts=[];ms.forEach(m=>{const a=m.geometry.attributes.position,n=Math.max(1,Math.floor(a.count/260));for(let i=0;i<a.count;i+=n)pts.push(new T.Vector3().fromBufferAttribute(a,i))});return{p,ms,box,pts}});
 const R=[new T.Vector3(.577,.621,.531),new T.Vector3(-.71,.21,.672),new T.Vector3(.13,-.83,-.542)].map(v=>v.normalize()),ray=new T.Ray(),hit={};
 const inside=(v,m)=>{let k=0;for(const d of R){ray.origin.copy(v);ray.direction.copy(d);if(bv(m.geometry).raycast(ray,T.DoubleSide).length%2)k++}return k===3};
 const pairs=[],touch=new Map(inf.map(i=>[i,false]));
 for(let i=0;i<inf.length;i++)for(let j=0;j<inf.length;j++){if(i===j)continue;const A=inf[i],B=inf[j];const bx=B.box.clone().expandByScalar(6);if(!A.box.intersectsBox(bx))continue;let n=0,dep=0,at=null;
  for(const v of A.pts){if(!bx.containsPoint(v))continue;for(const m of B.ms){if(!m.geometry.boundingBox.clone().expandByScalar(6).containsPoint(v))continue;bv(m.geometry).closestPointToPoint(v,hit);if(hit.distance<6)touch.set(A,true),touch.set(B,true);if(hit.distance>4&&m.geometry.boundingBox.containsPoint(v)&&inside(v,m)){n++;if(hit.distance>dep){dep=hit.distance;at=v}break}}}
  if(n)pairs.push([A.p.id,'dans',B.p.id,n+'/'+A.pts.length,Math.round(dep)+'mm',at.toArray().map(Math.round).join(',')])}
 pairs.sort((a,b)=>parseInt(b[4])*Math.sqrt(parseInt(b[3]))-parseInt(a[4])*Math.sqrt(parseInt(a[3])));
 return{pairs,float:inf.filter(i=>!touch.get(i)).map(i=>[i.p.id,i.box.getCenter(new T.Vector3()).toArray().map(Math.round).join(',')])}}
