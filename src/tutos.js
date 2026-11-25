// [titre, catégorie, difficulté 1-4, durée, outils, avertissement, étapes [texte, pièce]]
const JACK='Voiture à plat, frein serré, deux chandelles sur les points de levage. Jamais seulement au cric.',COLD='Moteur froid, vase jamais ouvert à chaud.';
export const TUTOS=[
['Trouver une fuite d’eau','Diagnostic',1,'45 min','Lampe, miroir, pompe de mise en pression',COLD,[['Niveau à froid sur le vase : noter.','vase'],['Chercher les croûtes sèches colorées : elles restent quand l’eau s’évapore.','thermo'],['Mettre en pression sans dépasser la valeur marquée sur le bouchon. Attendre 15 min.','bvase'],['Contrôler le boîtier thermostat, sonde et purge.','thermo'],['Contrôler le tube d’eau arrière et son O-ring.','jtube'],['Contrôler la pompe à eau et son trou témoin.','peau'],['Contrôler les durites du turbo et la pompe auxiliaire.','paux'],['Contrôler radiateur, piquages, petite durite.','radiateur'],['Rien dehors et pression qui chute : moquette humide côté chauffage ?','rchauf'],['Toujours rien : test CO₂ dans le vase.','jdc']]],
['Trouver une fuite d’huile','Diagnostic',2,'1 h + essai','Dégraissant, chiffons, lampe UV',JACK,[['Dégraisser, protéger alternateur et courroie.','alt'],['Rouler 10 min, puis chercher le point mouillé le plus haut.','cc'],['Couvre-culasse et solénoïde VANOS.','jcc'],['Pompe à vide : coulure côté boîte.','jpav'],['Support de filtre et échangeur.','jfiltre'],['Alimentation du turbo : banjos.','thuile'],['Retour du turbo : sous la bride.','rhuile'],['Tendeur de chaîne.','tendeurCh'],['Spi avant et arrière, carter en dernier.','spiAv'],['Goutte au carter seule : vérifier plus haut avant.','carter']]],
['Test fumée admission','Diagnostic',2,'45 min','Machine à fumée basse pression','Pression faible, ne pas souffler à l’air comprimé.',[['Débrancher la durite après le débitmètre.','maf'],['Injecter, regarder durites et colliers.','pipeC'],['Intercooler et coudes.','ic'],['Papillon et collecteur.','manifold'],['Couvre-culasse : membrane du reniflard.','cc'],['Tuyaux de dépression du turbo.','vide']]],
['Lire les codes défauts','Diagnostic',1,'10 min','Valise OBD',null,[['Brancher, contact mis.','obd'],['Noter les codes AVANT d’effacer.','dme'],['Mélange pauvre : fuite d’air ou pompe HP.','hp'],['Ratés : bougie, bobine, injecteur, encrassement.','bobines'],['Pression de suralimentation : durites, wastegate, électrovanne.','dv']]],
['Bruit de chaîne à froid','Diagnostic',2,'30 min','Clé, jauge','Si le bruit persiste à chaud : ne pas insister, risque moteur.',[['Vérifier le niveau d’huile d’abord.','jauge'],['Écouter côté distribution au démarrage froid.','distri'],['Tendeur : longueur et O-ring. Remplacement 65 N·m, joint neuf.','tendeurCh'],['Mesure de tension de chaîne avec l’outil spécial.','distri']]],
['Pompe HP : à-coups à froid','Diagnostic',3,'1 h','Valise (pression rampe)','Circuit haute pression : ne rien desserrer.',[['Lire pression de rampe demandée / réelle.','rampe'],['Écouter la pompe, chercher odeur d’essence.','hp'],['Contrôler la pression basse avant d’accuser la HP.','reservoir']]],
['Wastegate et sifflement turbo','Diagnostic',2,'45 min','Lampe, pompe à vide','Moteur froid, échappement brûlant.',[['Localiser le turbo : à l’avant, sous l’écran.','turbo'],['Retirer l’écran pour voir.','ecranT'],['Tringle : jeu, grippage.','turbo.wastegate-capsule-et-tringle'],['Durites et colliers côté pression.','pipeC'],['Huile dans l’entrée : jeu d’axe.','turbo.roue-compresseur-axe']]],
['Rappel pompe à eau auxiliaire','Diagnostic',1,'5 min','VIN',null,[['Repérer la pompe électrique sous le turbo.','paux'],['Faire vérifier le VIN chez MINI : un rappel a existé (18V-248 aux États-Unis) ; la situation en France dépend du VIN.','paux']]],
['Vidange huile + filtre','Entretien moteur',1,'45 min','Clé 27 ou cloche de filtre, bac, huile 5W-30 homologuée BMW',JACK,[['Moteur tiède. Dévisser le couvercle de filtre : l’huile redescend.','cfiltre'],['Bouchon de vidange : joint neuf, 30 N·m.','vidange'],['Filtre neuf + O-ring huilé, couvercle 25 N·m.','cfiltre'],['Remplir environ 4 L, puis compléter à la jauge (4,2 L annoncés).','bouchonH'],['Tourner 2 min, attendre 5 min, contrôler.','jauge']]],
['Bougies et bobines','Entretien moteur',1,'40 min','Douille bougie 14 mm 12 pans (à vérifier), clé dynamo','Moteur froid.',[['Déposer les connecteurs puis les bobines à la main.','bobines'],['Souffler les puits avant de dévisser.','cc'],['Bougie : 23 N·m, à la main au départ.','bobines'],['Remettre chaque bobine à sa place.','bobines']]],
['Filtre à air','Entretien moteur',1,'15 min','Tournevis / Torx',null,[['Ouvrir la boîte à air.','boite'],['Sortir l’élément, aspirer le fond.','boite'],['Contrôler le débitmètre et le tube.','maf']]],
['Courroie accessoires et galet','Entretien moteur',3,'1 h 30','Torx, clés, chandelle, cric',JACK,[['Roue avant droite et pare-boue.','aileD'],['Écarter le galet de friction.','galet'],['Détendre et bloquer le tendeur.','tendeurCo'],['Relever le trajet en photo, remplacer.','courroie'],['Contrôler pompe et alternateur à la main.','poulieeau']]],
['Purge et liquide de refroidissement','Eau',2,'1 h','Liquide homologué, entonnoir',COLD+' Toxique : récupérer.',[['Vidanger par la durite basse.','d8'],['Remplir lentement au vase.','vase'],['Ouvrir la vis de purge jusqu’au filet sans bulle.','purge'],['Chauffage à fond, monter en température, surveiller.','rchauf'],['À froid : refaire le niveau. Environ 5,5 L au total.','vase']]],
['Boîtier thermostat','Eau',3,'2 à 3 h','Pinces à colliers, Torx, joints neufs',COLD,[['Vidanger partiellement.','d8'],['Dégager boîte à air et accès côté boîte.','boite'],['Repérer chaque durite en photo.','thermo'],['Déposer durites et connecteur de sonde.','sondeT'],['Boîtier neuf + joint, 8 N·m en croix.','jthermo'],['Contrôler l’O-ring du tube arrière tant que c’est ouvert.','jtube'],['Remplir et purger.','purge']]],
['Pompe à eau mécanique','Eau',3,'3 h','Torx, clés, joint',JACK+' '+COLD,[['Roue droite, pare-boue.','aileD'],['Courroie et galet.','galet'],['Poulie de pompe.','poulieeau'],['Pompe + joint profilé neuf, plan propre (couple à confirmer).','peau'],['Remplir et purger.','purge']]],
['Pompe à eau auxiliaire','Eau',3,'2 h','Pinces, Torx',COLD+' Accès par l’avant ou par dessous.',[['Débrancher la batterie.','batterie'],['Localiser sous le turbo.','paux'],['Pincer et repérer les deux durites.','turboE3'],['Remplacer, colliers neufs si fatigués.','turboE1'],['Purger et vérifier le fonctionnement après coupure.','purge']]],
['Vase d’expansion','Eau',1,'45 min','Pinces',COLD,[['Vider le vase à la pompe.','vase'],['Déposer les durites.','d9'],['Remplacer avec bouchon neuf si doute.','bvase'],['Niveau et purge.','purge']]],
['Radiateur : position service','Eau',4,'4 h','Torx, clés, chandelles','Ne pas ouvrir la clim : laisser le condenseur raccordé.',[['Déposer pare-chocs.','pcAv'],['Dégager la face avant.','faceAv'],['Vidanger, déposer durites.','d8'],['Séparer radiateur et condenseur.','cond'],['Sortir le radiateur.','radiateur']]],
['Joint de couvre-culasse','Huile',3,'2 à 3 h','Torx, clé dynamo','Moteur froid, rien ne tombe dans les puits.',[['Bobines et connecteurs.','bobines'],['Reniflard et durites.','reniflard'],['Dévisser de l’extérieur vers le centre.','cc'],['Joints neufs, plan propre.','jcc'],['10 N·m en croix, du centre vers l’extérieur.','cc']]],
['Support de filtre à huile','Huile',4,'4 à 5 h','Torx, joints complets','Huile et eau se vident : deux bacs.',[['Vidanger eau et huile.','vidange'],['Accès avant (position service utile).','faceAv'],['Déposer collecteur ou écrans si nécessaire.','ecranT'],['Support, échangeur.','filtre'],['Joints neufs.','jfiltre'],['Remplir, purger, contrôler.','purge']]],
['Joint de pompe à vide','Huile',2,'1 h','Torx, joint','Freinage assisté : contrôler avant de rouler.',[['Dégager l’accès côté boîte.','boite'],['Débrancher le tuyau de dépression.','tvide'],['Pompe : repérer l’entraînement.','pav'],['Joint neuf.','jpav'],['Tester la pédale moteur tournant.','servo']]],
['Retour d’huile turbo','Huile',3,'2 h','Torx, miroir, O-ring 15,6×1,78',JACK,[['Écran thermique.','ecranT'],['Bride : 8 N·m, vis M6×18.','rhuile'],['O-ring neuf.','rhuile.o-ring-15-6-1-78'],['Collier Ø 24 côté bloc.','rhuile']]],
['Alimentation d’huile turbo','Huile',3,'2 h','Clés, 4 joints cuivre A12×17','Amorcer avant démarrage.',[['Écran thermique.','ecranT'],['Banjo côté turbo : 30 N·m.','thuile'],['Banjo côté bloc, joints neufs.','thuile'],['Refixer la plaque pare-chaleur.','thuile'],['Démarrer, contrôler immédiatement.','thuile']]],
['Remplacer le turbo','Turbo',4,'1 journée','Torx, douilles, joints complets, pâte haute température','Cause à traiter AVANT (huile, tuyau d’alimentation) sinon le neuf casse.',[['Vidanger huile et eau.','vidange'],['Position service.','faceAv'],['Écran thermique.','ecranT'],['Catalyseur : collier 25 N·m.','cata'],['Durites d’air.','pipeC'],['Eau : banjos M12×1,5, 35 N·m.','turboE1'],['Huile : arrivée 30 N·m.','thuile'],['Retour 8 N·m.','rhuile'],['Support 25 N·m.','turbo.support-de-turbo-14-vis-15-16'],['Turbo / collecteur : goujons 15, écrous 20 N·m, joint neuf.','turbo.goujons-m8-25-ecrous-bride-collecteur'],['Amorcer l’huile, remplir, purger, contrôler.','turbo']]],
['Électrovanne de décharge (DV)','Turbo',2,'45 min','Torx, joint','Moteur froid.',[['Localiser sur le compresseur.','dv'],['3 vis M6×16 (catalogue).','dv'],['Membrane et joint neufs.','dv']]],
['Sonde lambda','Échappement',2,'45 min','Douille à sonde','Échappement froid.',[['Repérer amont et aval.','lambda'],['Débrancher, dévisser.','lambda'],['50 N·m, sans graisse sur la pointe.','lambda']]],
['Roue : montage','Châssis',1,'20 min','Clé dynamo','Chandelle.',[['Débloquer au sol.','roueAvG'],['Lever au point prévu.','bas'],['Remonter en étoile : 140 N·m.','roueAvG.vis-de-roue-4']]],
['Freins avant','Châssis',2,'2 h','Repousse-piston, Torx, clé dynamo',JACK+' Organe de sécurité : en cas de doute, atelier.',[['Roue.','roueAvG'],['Témoin d’usure.','freinAvG.temoin-d-usure'],['Étrier : 35 N·m, suspendu, jamais par le flexible.','freinAvG.etrier'],['Plaquettes.','freinAvG.plaquettes'],['Support : 110 N·m.','freinAvG.support-d-etrier'],['Disque 294×22, vis 27 N·m.','freinAvG.disque-ventile-294-22'],['Pomper la pédale AVANT de rouler.','mc']]],
['Freins arrière','Châssis',3,'2 h 30','Repousse-piston à visser, Torx',JACK+' Frein à main desserré, roues calées.',[['Roue.','roueArG'],['Étrier 35 N·m.','freinArG.etrier-levier-frein-a-main'],['Piston : tourner en poussant.','freinArG.etrier-levier-frein-a-main'],['Support 65 N·m, vis neuves.','freinArG.support-d-etrier'],['Disque 259×10.','freinArG.disque-259-10'],['Pomper la pédale, régler le frein à main.','console.frein-a-main']]],
['Liquide de frein','Châssis',3,'1 h','DOT 4, tuyau, aide',JACK+' Jamais laisser le bocal se vider. DSC : purge valise si de l’air est entré.',[['Aspirer l’ancien bocal.','mc'],['Purger roue par roue.','freinArD.vis-de-purge'],['Niveau, pédale ferme.','mc']]],
['Biellette et barre stabilisatrice','Châssis',2,'1 h','Clés',JACK,[['Roue.','roueAvG'],['Biellette : 56 N·m.','moyAvG.biellette-de-barre-stab'],['Barre.','stab']]],
['Amortisseur avant','Châssis',4,'3 h/côté','Compresseur de ressort','Ressort comprimé : danger. Atelier si pas d’outil adapté.',[['Roue, flexible et capteur dégagés.','freinAvG'],['Bride pivot 100 N·m.','moyAvG.amortisseur'],['Coupelle 34 N·m.','jambes'],['Géométrie ensuite.','moyAvG.rotule-de-direction']]],
['Huile de boîte','Châssis',2,'1 h','Huile homologuée, seringue',JACK+' Vérifier que le bouchon de remplissage se dévisse d’abord.',[['Remplissage 43 N·m.','bv'],['Vidange 43 N·m.','bv']]],
['Ampoules de phare','Éclairage',2,'30 min/côté','Gants','Contact coupé. Xénon = haute tension, déconnecter.',[['Identifier halogène ou xénon.','phareG.ampoule-croisement-route'],['Cache arrière.','phareG.caches-arriere-croisement-route'],['Remplacer sans toucher le verre.','phareG.ampoule-croisement-route'],['Clignotant : quart de tour.','phareG.ampoule-clignotant'],['Régler la hauteur.','phareG']]],
['Déposer un phare','Éclairage',3,'1 h','Torx',null,[['Ouvrir le capot : le jonc y est fixé.','capot'],['Vis et supports.','phareG.vis-et-supports-de-phare'],['Connecteur, sortir.','phareG'],['Faire régler.','phareG']]],
['Feux arrière','Éclairage',1,'20 min','Torx T20, levier plastique','Contact coupé. Compare chaque culot à l’ancien avant d’acheter.',[['Déclipser l’enjoliveur, puis 3 vis T20 (Pelican) : le feu sort par l’extérieur.','feuArG.jonc-chrome'],['Sortir la platine, contrôler les contacts : douille fondue = panne connue.','feuArG.porte-ampoules-platine'],['Stop / position : ampoule P21W mono-filament.','feuArG.ampoule-stop-position'],['Clignotant : PY21W.','feuArG.ampoule-clignotant'],['Recul.','feuArG.ampoule-recul'],['Remonter : 1,5 N·m, très peu.','feuArG.vis-ecrou-expansible']]],
['Antibrouillards','Éclairage',2,'30 min','Torx',null,[['Accès par le pare-boue ou dessous.','aileG.pare-boue'],['H8 35 W.','abG.ampoule-antibrouillard'],['Position 5 W.','abG.ampoule-feu-de-position']]],
['Plaque, 3e stop, plafonnier','Éclairage',1,'15 min','Petit tournevis',null,[['Plaque 5 W.','plaque'],['3e stop : bloc complet.','stop3'],['Plafonnier.','plafAv']]],
['Batterie','Électricité',1,'30 min','Clé 10','Négatif d’abord. Maintenir la charge : le module FRM supporte mal les coupures.',[['Contact coupé 10 min.','batterie'],['Bride 6 N·m.','batterie'],['Cosses 5 N·m.','batterie'],['Contrôler vitres, feux.','frm']]],
['Remplacer un fusible','Électricité',1,'10 min','Pince','Même ampérage, toujours.',[['Boîte moteur.','fus'],['Boîte habitacle.','fusHab'],['Grille imprimée dans le couvercle = référence.','fusHab']]],
['Balais d’essuie-glace','Carrosserie',1,'5 min','Aucun',null,[['Position service, bras relevés.','essAv'],['Arrière.','hayon.essuie-glace-arriere-moteur']]],
['Filtre d’habitacle','Habitacle',1,'15 min','Torx',null,[['Pieds passager.','filtreHab'],['Sens de la flèche d’air.','filtreHab']]],
['Déposer un siège avant','Habitacle',2,'30 min','Torx, clé dynamo','Airbag et prétensionneur : batterie débranchée, attendre, contact jamais remis.',[['4 vis de glissière.','siegeG.glissieres-4-vis'],['Débrancher les connecteurs.','siegeG.connecteurs-sous-siege'],['Remontage 35 N·m.','siegeG.glissieres-4-vis']]],
['Garniture de porte','Habitacle',2,'45 min','Torx, levier plastique',null,[['Vis cachées.','porteG.garniture-de-porte'],['Déclipser, câble, connecteurs.','porteG.garniture-de-porte'],['Membrane intacte au remontage.','porteG']]],
['Lève-vitre','Habitacle',3,'2 h','Torx, adhésif','Vitre bloquée en haut.',[['Garniture.','porteG.garniture-de-porte'],['Mécanisme et moteur.','porteG.leve-vitre-moteur'],['Initialiser la vitre.','porteG.vitre']]],
['Eau dans l’habitacle','Habitacle',2,'1 h','Arrosoir, lampe',null,[['Sucré et gras : chauffage.','rchauf'],['Claire devant : baie et tablier.','caisse.tablier-passages-faisceau-pedales-chauffage'],['Claire : condensats.','blocClim.evacuation-des-condensats'],['Portes.','porteG.joint-de-porte'],['Coffre.','feuArG'],['Toit ouvrant.','toit.toit-panoramique-option']]],
['Accès pompe à essence','Essence',4,'2 h','Clé à bague','Danger incendie : extérieur, extincteur, batterie débranchée, réservoir bas.',[['Assise arrière.','banquette.assises'],['Pompe côté gauche.','reservoir.pompe-jauge-gauche'],['Filtre côté droit.','reservoir.filtre-regulateur-droite'],['Bague métal 45 / plastique 85 N·m (une source), joint neuf.','reservoir.pompe-jauge-gauche']]]];
export const TQ={jdc:[['Culasse M10×145','30 N·m + 90° + 90°'],['Culasse M8×95','15 N·m + 90° + 90°'],['Culasse M8×35','30 N·m']],turbo:[['Turbo / collecteur','20 N·m'],['Goujon turbo','15 N·m'],['Support de turbo','25 N·m']],thuile:[['Arrivée d’huile turbo','30 N·m']],rhuile:[['Retour d’huile turbo','8 N·m']],turboE1:[['Banjo eau M12×1,5','35 N·m']],turboE2:[['Banjo eau M12×1,5','35 N·m']],collecteur:[['Collecteur / culasse','25 N·m']],ecranT:[['Écran thermique','4 N·m']],cata:[['Collier turbo-catalyseur','25 N·m'],['Catalyseur / bloc','25 N·m']],thermo:[['Boîtier thermostat','8 N·m']],cc:[['Couvre-culasse','10 N·m']],vidange:[['Bouchon','30 N·m']],carter:[['Carter','12 N·m']],pompehuile:[['Pompe à huile','25 N·m'],['Pignon de pompe','5 N·m + 90°']],mano:[['Contacteur de pression','20 N·m']],hp:[['Pompe HP','11 N·m']],vanos:[['Solénoïde','9 N·m']],aac:[['Pignon échappement M10×30','20 N·m + 90°'],['VANOS / arbre','20 N·m + 180°']],tendeurCh:[['Tendeur M22×1,5','65 N·m']],cliquetis:[['Capteur','20 N·m']],pmh:[['Capteur','5 N·m']],damper:[['Moyeu / vilebrequin (vis neuve)','50 N·m + 180°'],['Damper M8×16','28 N·m']],alt:[['Alternateur M8','20 N·m'],['Câble B+','13,5 N·m']],clim:[['Compresseur','20 N·m']],demarreur:[['Démarreur','20 N·m'],['Câble B+','14 N·m']],bobines:[['Bougie','23 N·m']],lambda:[['Sonde','50 N·m']],volant:[['Volant / vilebrequin','8, puis 30 N·m + 90°']],embrayage:[['Mécanisme','28 N·m']],bv:[['Boîte / moteur','38 N·m'],['Bouchons','43 N·m']],cardans:[['Écrou','182 N·m']],berceau:[['Berceau / caisse','100 N·m']],cremail:[['Crémaillère / berceau','100 N·m']],stab:[['Biellettes','56 N·m']],servo:[['Servo / tablier','21 N·m']],mc:[['Maître-cylindre','23 N·m'],['Canalisations','14 N·m'],['Bocal','8 N·m']],batterie:[['Bride','6 N·m'],['Cosse','5 N·m']],lave:[['Réservoir','4 N·m']],tclim:[['Tuyaux condenseur / détendeur','8 N·m'],['Tuyaux compresseur','20 N·m']],sboite:[['Support sur caisse','25 N·m + 90°'],['Support','100 N·m']],essuie:[['Bras sur axe','20 N·m']],distri:[['Axes de guides M16×1,5','30 N·m']]};
export const FICHE=[['Moteur','N14 B16 A, 1 598 cm³, 4 cyl., 16 soupapes, injection directe, turbo','auto-data'],['Puissance','175 ch à 5 500 tr/min (174 selon certaines fiches)','auto-data'],['Couple','240 N·m de 1 600 à 5 000 tr/min','auto-data'],['Alésage × course','77 × 85,8 mm','auto-data'],['Compression','10,5 : 1','auto-data'],['Turbo','BorgWarner K03 (une source)','résultat de recherche'],['Huile','4,2 L, finir à la jauge','auto-data'],['Liquide de refroidissement','5,5 L','auto-data'],['Réservoir','40 L (à vérifier sur ton manuel)','auto-data'],['Longueur × largeur × hauteur','3 714 × 1 683 × 1 407 mm (d’autres fiches donnent 3 699 à 3 729)','auto-data'],['Empattement','2 467 mm','auto-data'],['Voies av / ar','1 453 / 1 461 mm','auto-data'],['Garde au sol','130 mm','résultat de recherche'],['Pneus','195/55 R16, jante 6,5J×16','auto-data'],['Poids','1 130 kg','auto-data'],['Boîte','Manuelle 6 rapports, traction','auto-data'],['Disques avant','294 × 22 mm','catalogue'],['Disques arrière','259 × 10 mm','catalogue'],['Bougies / roues','23 / 140 N·m','r56repo']];
const f=s=>s.trim().split('\n').map(l=>l.split('|'));
export const FUS={'Habitacle (pied passager)':f(`2|20|Prise remorque
3|30|Lave-phares
4|30|Module remorque
5|30|Module de pied (FRM)
6|20|Amplificateur (30 A capote R57)
7|30|Toit ouvrant
8|15|Module de pied
9|10|Serrures portes, trappe
10|10|Téléphone
11|10|Vidéo, tuner, navigation
12|15|Changeur CD
13|10|Commande de boîte
14|10|Miroirs de courtoisie, toit, coffre
15|5|Commodos
16|5|DSC
17|10|Capteur pluie/feux, pression pneus
18|10|Chauffage/clim, boîte à gants
19|7,5|Accès confort / CAS
20|10|Rétros rabattables
21|15|Radio, écran
22|10|Essuie-glace arrière
23|15|Embrayage compresseur clim
24|5|Pompe lave-glace
25|7,5|Rétro intérieur
26|5|Alarme
27|15|Prise OBD
28|5|Serrures, trappe (Europe)
29|5|Téléphone
30|5|PDC
31|5 à 7,5|Capteur AUC, convertisseur, chauffage additionnel
32|5|Réglage rétros, sièges chauffants
33|5|Capteur DSC
34|5|CAS
36|5|Navigation (Japon)
37|30|Instrument additionnel
38|30|Dégivrage arrière
39|30|Siège chauffant passager
40|20|Siège chauffant conducteur
42|20|Allume-cigare
43|20|Relais pompe à essence
44|20|Klaxon, commodos
45|20|Radio
46|40|Pulseur / clim
47|40|Module de pied
48|40|Module de pied
49|?|CAS`),'Compartiment moteur':f(`1|5|DME
2|25|DME
3|20|DME, chauffage reniflard
4|20|DME
5|5|Diag fuite réservoir, relais ventilateur, relais injecteurs (Cooper S)
6|25|DSC
7|7,5|Relais chauffage reniflard
8|30|Ventilateur
9|25|Relais d’essuie-glace
10|20|Relais borne 15
J6|40|DSC (ordre incertain)
J8|30|DSC (ordre incertain)
J9|50|Relais ventilateur 2
J10|50|Pare-brise chauffant
J12|30|Convertisseur DC/DC`)};
