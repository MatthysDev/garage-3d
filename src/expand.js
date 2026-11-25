import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {MeshBVH,acceleratedRaycast} from 'three-mesh-bvh';
import {PARTS} from './parts3d.js';
import './car.js';
import {ENDS,LINKS} from './detail.js';
import {material} from './kit.js';
const S0=new T.Sphere();T.Mesh.prototype.raycast=function(r,h){const g=this.geometry;if(!g.boundingSphere)g.computeBoundingSphere();S0.copy(g.boundingSphere).applyMatrix4(this.matrixWorld);if(!r.ray.intersectsSphere(S0))return;if(!g.boundsTree)g.boundsTree=new MeshBVH(g);acceleratedRaycast.call(this,r,h)};import {MAT} from './kit.js';
const slug=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
function merge(ms){const g=new T.Group(),by={};for(const m of ms){m.updateMatrix();let q=m.geometry;q=q.clone();if(!q.index){const n=q.attributes.position.count,a=new Uint32Array(n);for(let i=0;i<n;i++)a[i]=i;q.setIndex(new T.BufferAttribute(a,1))}q.applyMatrix4(m.matrix);for(const k of Object.keys(q.attributes))if(!['position','normal',MAT[m.userData.mat].b?'uv':''].includes(k))q.deleteAttribute(k);q.groups=[];(by[m.userData.mat]||=[]).push(q)}
 for(const k in by){const q=mergeGeometries(by[k]);if(!q)throw Error('fusion '+k);const m=new T.Mesh(q,material(k));m.castShadow=m.receiveShadow=true;g.add(m)}return g}
export const ALL=[];
for(const p of PARTS){const own=[],subs=new Map();for(const m of p.geo().flat(9)){if(!m.isMesh)throw Error('geo '+p.id);let s=m.userData.sub;const e=m.userData.end,E=ENDS[p.id];
  if(!s&&e&&E&&E[0])s={name:'Collier '+E[e==='A'?0:1],pos:E[2],zones:p.zones,leak:Object.fromEntries(Object.entries(p.leak||{}).map(([k,v])=>[k,v*.85])),dims:(p.dims||[]).filter(d=>/Collier/.test(d[0])),ind:p.ind,test:'Collier à fond de piquage, bien orienté, pas de trace sèche ni d’humidité autour.',k:'end'+e};
  if(s){const k=s.name;if(!subs.has(k))subs.set(k,{s,ms:[]});subs.get(k).ms.push(m)}else own.push(m)}
 p.g=merge(own);p.links=LINKS[p.id];p.kids=[];ALL.push(p);
 for(const[n,{s,ms}]of subs){const c={...s,id:p.id+'.'+slug(n),name:n,sys:p.sys,grp:s.grp||p.grp,pos:s.pos||[],par:p.id,ind:s.ind??p.ind,inner:p.inner,hinge:p.hinge,zones:s.zones||p.zones||[],g:merge(ms)};p.kids.push(c);ALL.push(c)}
 const b=new T.Box3();[p,...p.kids].forEach(q=>b.expandByObject(q.g));p.c=b.getCenter(new T.Vector3());
 for(const c of p.kids){const q=new T.Box3().setFromObject(c.g).getCenter(new T.Vector3()).sub(p.c).multiplyScalar(.7);c.ex=p.ex.map((v,i)=>v+q.getComponent(i))}}
{const ids=ALL.map(p=>p.id),d=ids.filter((x,i)=>ids.indexOf(x)!==i);if(d.length)throw Error('id en double '+d)}
for(const k in LINKS)for(const i of[k,...LINKS[k]])if(!ALL.some(p=>p.id===i))throw Error('lien '+i);
