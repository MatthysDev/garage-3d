// ajustements de montage (mm) : chaque ensemble déplacé pour ne plus recouper son voisin
import {PARTS} from './parts3d.js';
const mv=(ids,d)=>ids.split(' ').forEach(id=>{const p=PARTS.find(q=>q.id===id);if(!p)throw Error('fit '+id);const g=p.geo;p.geo=()=>{const a=g().flat(9);a.forEach(m=>{m.position.x+=d[0];m.position.y+=d[1];m.position.z+=d[2]});return a}});
mv('filtre jfiltre cfiltre echangeur',[26,-62,-2]);mv('rampe',[0,-34,0]);mv('demarreur',[0,-38,-4]);mv('pmh',[-14,62,4]);mv('sondeT',[4,0,36]);mv('pav jpav',[0,20,6]);
mv('klaxon',[14,-40,10]);mv('retroInt',[0,0,152]);mv('soleil',[0,4,70]);mv('sondeT',[0,0,6]);
mv('alt',[0,-34,-6]);mv('bouchonH',[0,0,-12]);mv('batterie',[16,0,0]);mv('servo mc',[14,0,0]);mv('stop3',[0,-14,4]);
export const MOVED=1;export {mv};
import {box,tube} from './kit.js';
const add=(id,f)=>{const p=PARTS.find(q=>q.id===id),g=p.geo;p.geo=()=>[...g(),...f()]};
add('fus',()=>[box([60,5,90],[560,262,-316],'steel',2),box([5,80,60],[592,226,-316],'steel',2)]);
add('obd',()=>[box([50,4,60],[560,31,-700],'blk',1),box([50,120,4],[560,90,-728],'blk',1)]);
add('commClim',()=>[box([150,56,180],[0,180,-762],'blk',4)]);
add('filtreHab',()=>[box([60,30,60],[-222,130,-610],'blk',4)]);

/* implantation relevée sur photos de dessus d'un vrai N14 (conduite à gauche) : moteur décalé vers la droite de la voiture, durites étirées en continu */
const D=-105,S=(x,a,b)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)};
const warp=(ids,f)=>ids.split(' ').forEach(id=>{const p=PARTS.find(q=>q.id===id);if(!p)throw Error('warp '+id);const g=p.geo;p.geo=()=>{const a=g().flat(9);a.forEach(m=>{m.updateMatrix();const G=m.geometry=m.geometry.clone(),P=G.attributes.position,M=m.matrix,I=M.clone().invert(),v=m.position.clone();for(let i=0;i<P.count;i++){v.fromBufferAttribute(P,i).applyMatrix4(M);const o=f(v.x,v.y,v.z);v.x+=o[0];v.y+=o[1];v.z+=o[2];v.applyMatrix4(I);P.setXYZ(i,v.x,v.y,v.z)}G.computeVertexNormals()});return a}});
mv('bloc chemises carter vidange jauge spiAr spiAv cliquetis pmh pompehuile volant jdc culasse aac distri tendeurCh ccarter cc jcc bouchonH capAac vanos mano bobines pav jpav hp rampe thermo jthermo sondeT purge tubeeau jtube peau jpeau poulieeau paux turboE1 turboE2 turboE3 echangeur filtre jfiltre cfiltre thuile rhuile reniflard collecteur turbo ecranT dv manifold map papillon damper galet tendeurCo courroie alt clim demarreur bv noyauEau vilo bielles pistons embrayage soupapes lambda',[D,0,0]);
mv('boite maf',[D,0,-30]);
warp('tubeadm',(x,y,z)=>[D,0,-30*S(-z,20,80)]);
const wz=z=>S(z,-400,-280)*S(-z,-345,-250),wx=x=>x>0?1-S(x,260,460):1-.45*S(-x,300,480);
warp('d1 d5 d7 d8 d9 essence chauf1 chauf2 cata pipeC pipeP son vide purgeEss cmdEmb faisceau tclim tvide',(x,y,z)=>[D*wz(z)*(x>0?wx(x):1),0,0]);
warp('pipeF tmap',(x,y,z)=>[D*.8*S(-z,-345,-250),0,0]);
warp('smoteur sboite',(x,y,z)=>[y<0?D*S(z,-240,-130):D*(Math.abs(x)<330&&x<0?1:x<0?.45:.8*(1-S(x,330,430))),0,0]);
warp('cardans',(x)=>[D*(1-S(Math.abs(x),x>0?330:120,x>0?560:470)),0,0]);
warp('jauge',(x,y,z)=>{const k=S(y,60,330);return[-215*k,0,75*k]});
mv('vase bvase',[-76,0,16]);mv('dme',[-181,30,-160]);mv('fus',[-106,20,231]);mv('dsc',[-20,-34,-24]);
mv('klaxon',[-40,0,0]);
