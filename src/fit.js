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
