// Carrosserie : une seule peau implicite, maillée puis découpée en panneaux (jeu 4 mm, épaisseur réelle). node bake.mjs -> body.bin
import fs from 'fs';
const lerp=(a,b,t)=>a+(b-a)*t,cl=(x,a,b)=>Math.max(a,Math.min(b,x)),smax=(a,b,k)=>{const h=Math.max(k-Math.abs(a-b),0)/k;return Math.max(a,b)+h*h*h*k/6},smin=(a,b,k)=>-smax(-a,-b,k);
// Catmull-Rom monotone (table z décroissant)
const tab=t=>{const n=t.length,d=[],m=[];for(let i=0;i<n-1;i++)d.push((t[i+1][1]-t[i][1])/(t[i+1][0]-t[i][0]));m[0]=d[0];m[n-1]=d[n-2];for(let i=1;i<n-1;i++)m[i]=d[i-1]*d[i]<=0?0:2*d[i-1]*d[i]/(d[i-1]+d[i]);return x=>{if((x-t[0][0])*(t[0][0]-t[n-1][0])>=0)return t[0][1]+m[0]*(x-t[0][0]);for(let i=0;i<n-1;i++)if((x-t[i+1][0])*(t[0][0]-t[n-1][0])>=0){const h=t[i+1][0]-t[i][0],s=(x-t[i][0])/h;return (1+2*s)*(1-s)**2*t[i][1]+s*(1-s)**2*h*m[i]+s*s*(3-2*s)*t[i+1][1]+s*s*(s-1)*h*m[i+1]}return t[n-1][1]+m[n-1]*(x-t[n-1][0])}};
const spl=(P,n=10)=>{const o=[];for(let i=0;i<P.length;i++){const[a,b,c,d]=[-1,0,1,2].map(k=>P[(i+k+P.length)%P.length]);for(let j=0;j<n;j++){const t=j/n;o.push([0,1].map(q=>.5*(2*b[q]+(c[q]-a[q])*t+(2*a[q]-5*b[q]+4*c[q]-d[q])*t*t+(3*b[q]-a[q]-3*c[q]+d[q])*t**3)))}}return o};
const poly=P=>(x,y)=>{let d=1e18,s=1;for(let i=0,j=P.length-1;i<P.length;j=i++){const ex=P[j][0]-P[i][0],ey=P[j][1]-P[i][1],wx=x-P[i][0],wy=y-P[i][1],t=cl((wx*ex+wy*ey)/(ex*ex+ey*ey),0,1),bx=wx-ex*t,by=wy-ey*t;d=Math.min(d,bx*bx+by*by);const c1=y>=P[i][1],c2=y<P[j][1],c3=ex*wy>ey*wx;if((c1&&c2&&c3)||(!c1&&!c2&&!c3))s=-s}return s*Math.sqrt(d)};
// silhouette basse (z,y) : nez, capot, auvent, ceinture de caisse, poupe
const sideL=poly(spl([[500,-215],[556,-150],[576,-50],[580,60],[566,170],[532,270],[478,345],[390,408],[250,470],[60,524],[-160,566],[-360,594],[-540,612],[-800,582],[-1200,578],[-1700,588],[-2300,602],[-2750,606],[-2980,604],[-3050,590],[-3082,520],[-3103,430],[-3110,280],[-3124,160],[-3134,60],[-3126,-60],[-3090,-160],[-3020,-206],[-2400,-212],[-1500,-214],[-600,-214],[200,-216]]));
const plan=poly((h=>{const a=h.map(p=>p),b=h.slice(1,-1).reverse().map(([z,x])=>[z,-x]);return spl([...a,...b])})([[584,0],[578,220],[556,430],[508,590],[425,704],[300,776],[120,824],[-110,843],[-420,836],[-900,829],[-1500,829],[-2150,836],[-2577,843],[-2790,826],[-2950,778],[-3052,690],[-3106,540],[-3130,300],[-3138,0]]));
const secW=tab([[-300,-46],[-215,-26],[-120,-9],[20,0],[160,-4],[300,-14],[420,-28],[520,-46],[620,-70]]);
const crown=x=>{const a=Math.abs(x);return 1.15e-4*a*a+ (a>560?(a-560)**2*6e-4:0)};
const roofY=tab([[-900,1004],[-1150,1016],[-1450,1027],[-1850,1025],[-2300,1012],[-2700,990],[-2960,970]]);
const ghW=tab([[500,762],[600,735],[760,684],[900,628],[1030,566]]);
const ell=(x,y,z,c,r)=>{const a=(x-c[0])/r[0],b=(y-c[1])/r[1],d=(z-c[2])/r[2],k=Math.hypot(a,b,d);return (k-1)*Math.min(...r)};
export const LB=(x,y,z)=>{const ax=Math.abs(x);let s=sideL(z,y+crown(x)*cl((z+3000)/400,0,1)*lerp(.12,1,(t=>t*t*(3-2*t))(cl((z+640)/560,0,1))));let p=plan(z-0,x);const w=p-secW(y);let d=smax(s,w,lerp(46,115,(t=>t*t*(3-2*t))(cl((z+900)/900,0,1))));
 // bosse d'aile autour des phares
 if(z>-260)d=smin(d,ell(ax,y,z,[572,236,180],[176,158,330]),120);return d};
export const GH=(x,y,z)=>{const ax=Math.abs(x);const zw=z+2.1e-4*x*x;const ws=((zw+520)*.665+(y-600)*.747);const rg=(-(z-1.1e-4*x*x)-3052)*.925+(y-600)*.38;const rf=y+7.5e-5*x*x-roofY(z);const sd=(ax-ghW(y)+Math.max(0,-z-2150)**2*5.5e-5)*.93;
 let d=smax(ws,sd,46);d=smax(d,rg,42);d=smax(d,rf,52);return smax(d,lerp(480,584,cl((-2560-z)/240,0,1))-y,10)};
export const F=(x,y,z)=>smin(LB(x,y,z),GH(x,y,z),lerp(14,40,cl((-2700-z)/200,0,1)));
/* ---- maillage (surface nets, demi-caisse) ---- */
const H=+process.env.H||20,X0=-2*H,Y0=-300,Z0=-3180,nx=Math.ceil(900/H),ny=Math.ceil(1380/H),nz=Math.ceil(3800/H);
const f=new Float32Array((nx+1)*(ny+1)*(nz+1)),I=(i,j,k)=>i+(nx+1)*(j+(ny+1)*k);
for(let k=0;k<=nz;k++)for(let j=0;j<=ny;j++)for(let i=0;i<=nx;i++)f[I(i,j,k)]=F(X0+i*H,Y0+j*H,Z0+k*H);
const grad=p=>{const e=1.5,g=[F(p[0]+e,p[1],p[2])-F(p[0]-e,p[1],p[2]),F(p[0],p[1]+e,p[2])-F(p[0],p[1]-e,p[2]),F(p[0],p[1],p[2]+e)-F(p[0],p[1],p[2]-e)],l=Math.hypot(...g)||1;return[g.map(v=>v/l),l/(2*e)]};
const vid=new Int32Array(nx*ny*nz).fill(-1),C=(i,j,k)=>i+nx*(j+ny*k),V=[],Tt=[];
for(let k=0;k<nz;k++)for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){let m=0,cnt=0,c=[0,0,0];const v=[];for(let q=0;q<8;q++){const s=f[I(i+(q&1),j+(q>>1&1),k+(q>>2&1))];v.push(s);if(s<0)m|=1<<q}if(m===0||m===255)continue;
 for(const[a,b]of[[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]])if((v[a]<0)!==(v[b]<0)){const t=v[a]/(v[a]-v[b]);for(let d=0;d<3;d++)c[d]+=lerp(a>>d&1,b>>d&1,t);cnt++}
 let p=[X0+(i+c[0]/cnt)*H,Y0+(j+c[1]/cnt)*H,Z0+(k+c[2]/cnt)*H];for(let q=0;q<4;q++){const[g,l]=grad(p),d=F(...p)/Math.max(l,.4);p=p.map((x,n)=>x-g[n]*cl(d,-H,H))}
 vid[C(i,j,k)]=V.length;V.push(p)}
for(let k=1;k<nz;k++)for(let j=1;j<ny;j++)for(let i=1;i<nx;i++){const a=f[I(i,j,k)]<0;const q=(b,ids)=>{if(a===b)return;const w=ids.map(x=>vid[x]);if(w.some(x=>x<0))return;const[A,B,D,E]=a?w:[w[0],w[3],w[2],w[1]];Tt.push([A,B,D],[A,D,E])};
 q(f[I(i+1,j,k)]<0,[C(i,j-1,k-1),C(i,j,k-1),C(i,j,k),C(i,j-1,k)]);q(f[I(i,j+1,k)]<0,[C(i-1,j,k-1),C(i-1,j,k),C(i,j,k),C(i,j,k-1)]);q(f[I(i,j,k+1)]<0,[C(i-1,j-1,k),C(i,j-1,k),C(i,j,k),C(i-1,j,k)])}
console.log('peau',V.length,Tt.length);
/* ---- découpe exacte ---- */
const proj=p=>{for(let q=0;q<2;q++){const[g,l]=grad(p),d=F(...p)/Math.max(l,.4);p=p.map((x,n)=>x-g[n]*cl(d,-4,4))}return p};
function clip(M,g){const gv=M.v.map(g),v=[],mp=new Map(),ec=new Map(),t=[];const vx=i=>{if(!mp.has(i)){mp.set(i,v.length);v.push(M.v[i])}return mp.get(i)};const ed=(a,b)=>{const k=a<b?a+'_'+b:b+'_'+a;if(!ec.has(k)){let lo=M.v[a],hi=M.v[b],gl=gv[a],gh=gv[b],p;for(let n=0;n<3;n++){const s=cl(gl/(gl-gh),.02,.98);p=lo.map((x,d)=>lerp(x,hi[d],s));const w=g(p);if((w>0)===(gl>0)){lo=p;gl=w}else{hi=p;gh=w}}ec.set(k,v.length);v.push(p)}return ec.get(k)};
 for(const T of M.t){const P=[];for(let i=0;i<3;i++){const a=T[i],b=T[(i+1)%3],A=gv[a]>0,B=gv[b]>0;if(A)P.push(vx(a));if(A!==B)P.push(ed(a,b))}for(let i=2;i<P.length;i++)t.push([P[0],P[i-1],P[i]])}return{v,t}}
const SKIN={v:V,t:Tt};const cut=(...gs)=>gs.reduce(clip,SKIN);
const out=[];
function panel(id,mat,M,{th=2.5,off=0,mirror=true,center=false,inner=true}={}){ // épaisseur + chant
 const n=M.v.map(p=>grad(p)[0]),o=typeof off==='function'?off:()=>off;const pos=[],nor=[],ix=[];const N=M.v.length;
 const at=(p,k,d)=>p.map((x,i)=>x+n[k][i]*d);
 M.v.forEach((p,k)=>{pos.push(...at(p,k,o(p)));nor.push(...n[k])});M.t.forEach(t=>ix.push(...t));
 if(th){M.v.forEach((p,k)=>{pos.push(...at(p,k,o(p)-th));nor.push(...n[k].map(x=>-x))});M.t.forEach(t=>ix.push(t[0]+N,t[2]+N,t[1]+N));
  const E=new Map();M.t.forEach(t=>{for(let i=0;i<3;i++){const a=t[i],b=t[(i+1)%3];const k=b+'_'+a;E.has(k)?E.delete(k):E.set(a+'_'+b,[a,b])}});
  for(const[a,b]of E.values()){if(center&&Math.abs(M.v[a][0])<1&&Math.abs(M.v[b][0])<1)continue;const pa=M.v[a],pb=M.v[b],e=pb.map((x,i)=>x-pa[i]),na=n[a],q=[e[1]*na[2]-e[2]*na[1],e[2]*na[0]-e[0]*na[2],e[0]*na[1]-e[1]*na[0]],l=Math.hypot(...q)||1,s=pos.length/3;for(const[w,kk]of[[a,0],[b,0],[a,N],[b,N]]){pos.push(...pos.slice(3*(w+kk),3*(w+kk)+3));nor.push(...q.map(x=>x/l))}ix.push(s,s+2,s+1,s+1,s+2,s+3)}}
 const add=(i,pp,nn,xx)=>out.push({id:i,mat,pos:pp,nor:nn,ix:xx});
 out.push({id,mat,pos,nor,ix,center})}
const G=2,x0=p=>p[0]+.01; // demi-jeu ; plan de symétrie
const FZ=-110,RZ=-2577,WY=-70,AR=347;
const aF=p=>Math.hypot(p[1]-WY,p[2]-FZ),aR=p=>Math.hypot(p[1]-WY,p[2]-RZ);
const onG0=p=>LB(...p)-GH(...p),onG=p=>{const t=cl((-2740-p[2])/130,0,1);return t?lerp(onG0(p),p[1]-604,t):onG0(p)}; // >0 : pavillon ; <0 : caisse basse
const seam=tab([[600,300],[300,306],[0,322],[-500,338],[-640,340]]);
// phare : ellipse inclinée vue selon son axe
const HL=p=>{const dx=p[0]-566,dy=p[1]-232,c=Math.cos(.22),s=Math.sin(.22);const a=(dx*c-dy*s)/112,b=(dx*s+dy*c)/128;return p[2]<150?9:Math.hypot(a,b)};
const cowl=p=>p[2]+508+1.75e-4*p[0]*p[0];
const gr=p=>{ // calandre hexagonale : >0 dedans (mm)
 const x=p[0],y=p[1];return p[2]<300?-99:Math.min(280-y+1e-4*x*x*-1,y-96,(372-x-Math.abs(y-196)*.42)*.92)};
const gl=p=>p[2]<300?-99:Math.min(-58-p[1],p[1]+158,(452-p[0]-Math.abs(p[1]+108)*.9)*.75);
const fog=p=>p[2]<200?99:Math.hypot(p[0]-604,p[1]+92)-56;
const bumpS=p=>p[2]-(p[1]>60?250+(p[1]-60)*.35:250); // joint aile / pare-chocs
const zD0=-584,zD1=-1652,dBot=-172;
const doorF=p=>zD0-p[2],doorR=p=>p[2]-zD1-(p[1]<120?(120-p[1])**2*.00035:0);
const hatX=tab([[150,470],[230,548],[420,566],[620,588],[800,560],[1000,500]]);
const hat=p=>Math.min(hatX(p[1])-p[0],p[1]-176,-2700-p[2]);
const TL=p=>{if(p[2]>-2600)return-99;const u=p[0]-664-(p[1]-310)*-.10,v=p[1]-318;const a=Math.abs(u)/82,b=Math.abs(v)/140;return (1-Math.pow(a**3.2+b**3.2,1/3.2))*82};
const rbS=p=>Math.min(162-p[1],-2810-p[2]);
/* caisse basse */
const noHL=p=>(HL(p)-1.085)*112,noF=p=>aF(p)-AR,noR=p=>aR(p)-AR,low=p=>-onG(p)-G;
const scp=p=>p[1]<300?-9:Math.min(150-p[0],p[2]-226,292-p[2]);
panel('capot','body',cut(x0,low,p=>p[1]-seam(p[2])-G,p=>cowl(p)-G,p=>p[2]-zD0-G,noHL,p=>-scp(p)),{center:true});
panel('prise','body',cut(x0,low,scp),{center:true,off:p=>{const t=cl((p[2]-226)/66,0,1);return 20*t*t*(3-2*t)*Math.min(1,(150-p[0])/14)},th:3});panel('priseN','blk',cut(x0,low,p=>p[1]-300,p=>Math.min(142-p[0],p[2]-284,292-p[2])),{center:true,off:13,th:13});
panel('capDb','blk',cut(x0,low,p=>p[1]-seam(p[2])-40,p=>cowl(p)-30,p=>(HL(p)-1.3)*112,p=>p[1]-360,p=>700-p[0]),{center:true,off:-16,th:8});
panel('auvent','blk',cut(x0,low,p=>-cowl(p)-G,p=>p[1]-470,p=>p[2]-zD0-G),{center:true,off:-3});
panel('aile','body',cut(x0,low,p=>seam(p[2])-p[1]-G,p=>-bumpS(p)-G,p=>p[2]-zD0-G,noHL,noF,p=>p[1]+196),{});
panel('ailette','body',cut(x0,low,p=>p[1]-seam(p[2])-G,p=>-cowl(p)-G,p=>560-p[1],p=>p[2]-zD0-G),{});
panel('pcAv','body',cut(x0,low,p=>seam(p[2])-p[1]-G,p=>bumpS(p)-G,noHL,noF,p=>-gr(p)-1,p=>-gl(p)-1,p=>fog(p)-1,p=>p[1]+196),{center:true,th:3});
panel('lame','blk',cut(x0,low,p=>-198-p[1],p=>p[2]-240,p=>p[1]+232),{center:true,th:6,off:3});
panel('calCerc','chr',cut(x0,low,p=>gr(p)-1,p=>20-gr(p)),{center:true,th:16,off:7});
panel('calFond','blk',cut(x0,low,p=>gr(p)-18),{center:true,off:-42,th:2});
panel('grBas','blk',cut(x0,low,gl),{center:true,off:-36,th:2});
panel('grBasC','blk',cut(x0,low,gl,p=>12-gl(p)),{center:true,off:3,th:36});
panel('porte','body',cut(x0,low,p=>doorF(p)-G,p=>doorR(p)-G,p=>p[1]-dBot-G),{});
panel('bas','body',cut(x0,low,p=>dBot-p[1]-G,p=>p[1]+192,noF,noR,p=>zD0+260-p[2],p=>p[2]+2350),{});
panel('basN','blk',cut(x0,low,p=>-194-p[1],p=>p[1]+214,p=>p[0]-560,noF,noR,p=>zD0+300-p[2],p=>p[2]+2350),{off:5,th:10});
panel('quart','body',cut(x0,low,p=>-doorR(p)-G,p=>p[1]-dBot-G,noR,p=>-rbS(p)-G,p=>-hat(p)-G,p=>-TL(p)-G),{});
panel('pcAr','body',cut(x0,low,p=>rbS(p)-G,noR,p=>-hat(p)-G,p=>p[1]+150,p=>-TL(p)-G),{center:true,th:3});
panel('diff','blk',cut(x0,low,p=>-152-p[1],p=>p[1]+205,p=>-2850-p[2],noR,p=>Math.hypot(Math.max(0,p[0]-60),p[1]+196)-46),{center:true,off:2,th:8});
panel('hayonT','body',cut(x0,low,p=>hat(p)-G),{center:true});
/* arcs noirs d'ailes */
const trim=(id,a,ex)=>panel(id,'blk',cut(x0,low,p=>a(p)-AR+1,p=>AR+44-a(p),p=>p[0]-600,p=>p[1]+205,...ex),{off:p=>9*Math.min(1,(AR+44-a(p))/14),th:22});
trim('arcAv',aF,[p=>p[2]-zD0-260>0?1:1]);trim('arcAr',aR,[p=>1]);
/* pavillon */
const gh=p=>onG(p)-G,zA=p=>p[2]-lerp(-640,-1085,(p[1]-560)/430),zC=p=>lerp(-2985,-2800,(p[1]-600)/360)-p[2],ry=p=>p[1]-(roofY(p[2])-50),zB=-1655;
panel('jonc','chr',cut(x0,gh,p=>13-onG(p),p=>-zA(p)+10,p=>-ry(p),p=>p[2]+2860,p=>.5-Math.max(0,p[1]-640)),{off:3,th:5});
const gg=p=>onG(p)-lerp(15,3,cl((-2780-p[2])/90,0,1));
panel('pareb','glass',cut(x0,p=>onG(p)-9,p=>zA(p)-24,p=>-ry(p)-4),{center:true,off:-3,th:0});
panel('joncPb','blk',cut(x0,gh,p=>9-onG(p),p=>zA(p)-10,p=>-ry(p)),{center:true,th:8});
panel('montA','roof',cut(x0,gh,p=>zA(p)+24,p=>22-zA(p),p=>-ry(p)-G),{th:24});
panel('vitreAv','glass',cut(x0,gg,p=>-zA(p)-26,p=>p[2]-zB-22,p=>-ry(p)-G-2),{off:-3,th:0});
panel('montB','roof',cut(x0,gh,p=>20-Math.abs(p[2]-zB),p=>-ry(p)-G),{off:-1,th:26});
panel('vitreAr','glass',cut(x0,gg,p=>zB-22-p[2],p=>-zC(p)-26,p=>-ry(p)-G-2),{off:-3,th:0});
panel('montC','roof',cut(x0,gh,p=>zC(p)+24,p=>24-zC(p),p=>-ry(p)-G),{th:24});
panel('lunette','glass',cut(x0,p=>onG(p)-14,p=>zC(p)-26,p=>-ry(p)-4),{center:true,off:-3,th:0});
panel('hayonC','roof',cut(x0,gh,p=>13-onG(p),p=>zC(p)-26,p=>-ry(p)-4),{center:true,th:20});
const pa=(a,b)=>p=>Math.min(405-p[0],p[2]-a,b-p[2]);const P1=pa(-1640,-1230),P2=pa(-2130,-1665);
panel('toit','roof',cut(x0,gh,p=>ry(p)-G,p=>-P1(p)-1,p=>-P2(p)-1),{center:true,th:3});panel('pano1','pano',cut(x0,gh,p=>P1(p)-1),{center:true,th:5});panel('pano2','pano',cut(x0,gh,p=>P2(p)-1),{center:true,th:5});
const sc=p=>Math.min(150-p[0],p[2]-232,292-p[2]);
panel('gout','chr',cut(x0,gh,p=>7-Math.abs(ry(p)+4),p=>-zA(p),p=>-zC(p)),{off:4,th:8});
/* feux dans la peau */
const bulge=p=>{const r=Math.min(1,HL(p));return 3+20*(1-r*r)};
panel('phGl','clear',cut(x0,low,p=>(1-HL(p))*112),{off:bulge,th:0});
panel('phJ','chr',cut(x0,low,p=>(HL(p)-.985)*112,p=>(1.07-HL(p))*112),{off:6,th:22});
panel('phB','blk',cut(x0,low,p=>(1.0-HL(p))*112),{off:p=>-30-52*(1-Math.min(1,HL(p))**2),th:3});
panel('phR','chr',cut(x0,low,p=>(.58-HL(p))*112),{off:p=>-16-46*(1-Math.min(1,HL(p)/.58)**2),th:2});panel('phA','chr',cut(x0,low,p=>(.66-HL(p))*112,p=>(HL(p)-.59)*112),{off:-8,th:14});
panel('fgGl','clear',cut(x0,low,p=>-fog(p)-10),{off:-6,th:0});panel('fgC','chr',cut(x0,low,p=>-fog(p)-1,p=>fog(p)+10),{off:3,th:26});panel('fgB','chr',cut(x0,low,p=>-fog(p)-10),{off:p=>-14-32*(1-((fog(p)+56)/46)**2),th:2});
panel('tlGl','lens',cut(x0,low,p=>TL(p)-11),{off:p=>2+10*Math.min(1,(TL(p)-11)/30),th:4});panel('tlJ','chr',cut(x0,low,TL,p=>10.5-TL(p)),{off:5,th:18});panel('tlB','chr',cut(x0,low,p=>TL(p)-12),{off:-34,th:2});
/* sortie */
let bytes=0;const meta={},chunks=[];for(const o of out){if(!o.ix.length){console.log('VIDE',o.id);continue}const P=Int16Array.from(o.pos,v=>Math.round(v*8)),N=Int8Array.from(o.nor,v=>Math.round(v*127)),X=(o.pos.length/3<65536?Uint16Array:Uint32Array).from(o.ix);const bad=o.pos.some(v=>Math.abs(v*8)>32767);if(bad)throw Error('plage '+o.id);meta[o.id]=[o.mat,bytes,P.length,X.length,o.center?1:0];for(const a of[P,N,X]){let b=Buffer.from(a.buffer);const pad=(4-b.length%4)%4;b=Buffer.concat([b,Buffer.alloc(pad)]);chunks.push(b);bytes+=b.length}}
fs.writeFileSync('body.bin',Buffer.concat(chunks));fs.writeFileSync('body.json',JSON.stringify(meta));console.log(Object.keys(meta).length,'panneaux',bytes,'octets',out.reduce((s,o)=>s+o.ix.length/3,0)|0,'triangles');
