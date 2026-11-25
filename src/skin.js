// panneaux de carrosserie précalculés (bake.mjs) : demi-caisse, symétrisée au chargement
import * as T from 'three';
import {mesh} from './kit.js';
import BIN from './body.bin';
import META from './body.json';
const buf=BIN.buffer.slice(BIN.byteOffset,BIN.byteOffset+BIN.byteLength),al=n=>n+(4-n%4)%4;
const raw=(id,side)=>{const[mat,o,n,nx,c]=META[id],P=new Int16Array(buf,o,n),o2=o+al(n*2),N=new Int8Array(buf,o2,n),o3=o2+al(n),X=n/3<65536?new Uint16Array(buf,o3,nx):new Uint32Array(buf,o3,nx);
 const half=s=>{const p=new Float32Array(n),q=new Float32Array(n),x=new Uint32Array(nx);for(let i=0;i<n;i++){const k=i%3===0?s:1;p[i]=P[i]/8*k;q[i]=N[i]/127*k}for(let i=0;i<nx;i+=3){x[i]=X[i];x[i+1]=X[i+(s>0?1:2)];x[i+2]=X[i+(s>0?2:1)]}return[p,q,x]};
 const L=c&&side===undefined?[half(1),half(-1)]:[half(side??1)];const tot=L.length*n,pos=new Float32Array(tot),nor=new Float32Array(tot),ix=new Uint32Array(L.length*nx);L.forEach(([p,q,x],k)=>{pos.set(p,k*n);nor.set(q,k*n);for(let i=0;i<nx;i++)ix[k*nx+i]=x[i]+k*n/3});
 const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pos,3));g.setAttribute('normal',new T.BufferAttribute(nor,3));const uv=new Float32Array(tot/3*2);for(let i=0;i<tot/3;i++){uv[2*i]=pos[3*i+2]/400;uv[2*i+1]=pos[3*i+1]/400}g.setAttribute('uv',new T.BufferAttribute(uv,2));g.setIndex(new T.BufferAttribute(ix,1));return[g,mat]};
export const skin=(id,s,m)=>{const[g,mat]=raw(id,s);return mesh(g,m||mat)};
