Crew’mong Us — Prototype V6

Ouvrir index.html dans un navigateur récent.

Cette version intègre :
- une bannière graphique Crew’mong Us générée pour le site ;
- des cadres visuels dédiés pour Taux de win, Hall of Fame, Wall of Shame, Avant le premier conseil et Mentions honorables ;
- des icônes dans les lignes de statistiques, proches de l’esprit du récap du Crew ;
- les données restent du vrai HTML superposé aux visuels : elles évoluent quand les chiffres changent ;
- navigation Stats / Sessions / Joueurs / Saisie / Admin ;
- choix Septembre 2026 / Stats globales ;
- sessions filtrées par mois ;
- fiches joueurs avec Cumul du mois / soirée / Cumul global ;
- saisie de plusieurs événements et sabotages dans une même game ;
- bouton Nouvelle game ;
- sauvegarde locale fonctionnelle : Enregistrer remplace/ajoute la fiche du joueur et recalcule Stats/Joueurs ;
- sabotage préféré calculé à partir des sabotages détaillés quand ils existent ;
- Admin pour supprimer les fiches et restaurer la démo.

Les images de la V6 se trouvent dans le dossier assets/ et servent d’habillage. Les statistiques ne sont pas écrites dans les images, donc le site reste dynamique.


V6.1 :
- Ajustements de mise en page sur la front page visuelle.
- Recentrage vertical des textes dans Hall of Fame / Wall of Shame / Mentions honorables.
- Colonnes de valeur élargies.
- Ligne "Taux de win" réorganisée : plus d'espace entre libellés, détails et barre.
- Barre de win repositionnée pour mieux s'aligner au cadre visuel.


V6.2 — correction structurelle de la front page :
- le problème venait des images elles-mêmes :
  * Hall of Fame avait 7 cases graphiques pour 6 statistiques ;
  * Mentions honorables avait 4 cases graphiques pour 5 statistiques ;
  * Taux de win contenait déjà une barre 50/50, puis le site en superposait une seconde.
- Les cadres Hall of Fame et Mentions honorables ont été reconstruits localement avec exactement 6 et 5 lignes.
- La barre du cadre Taux de win a été vidée puis rendue réellement dynamique.
- Les coordonnées HTML/CSS sont maintenant calées 1:1 sur les cases des images.
- Wall of Shame a été recalé sur ses 7 cases réelles.


V6.3 :
- Taux de win : nettoyage total de la zone de barre pour supprimer la double barre.
- Taux de win : nouvelle zone de barre unique réellement dynamique.
- Hall of Fame : reconstruction des lignes internes avec des séparations nettes, sans lignes parasites au centre.
- Wall of Shame : recalage de l'overlay et léger recentrage du contenu.


V6.4 :
- Taux de win : nettoyage encore plus large de l'ancienne zone de barre pour éliminer l'impression de double barre.
- Taux de win : barre dynamique légèrement recentrée.
- Hall of Fame : contenu remonté et aéré.
- Wall of Shame : contenu légèrement descendu et aéré.
- Avant le premier conseil : titre central et mini-cartes mieux équilibrés.
- Mentions honorables : réalignement des icônes et du contenu.


V6.5 :
- Correction ciblée du bloc "Taux de win".
- Repeinture plus large de la zone de barre sur l'asset pour éliminer les restes visuels sous la barre.
- Barre dynamique rétrécie et recentrée.
- Segments rouge / bleu forcés à rester contenus dans la piste.


V6.6 :
- Bloc "Taux de win" : suppression de la barre intégrée dans l'image.
- La zone de barre est maintenant vide côté asset.
- Nouvelle barre 100 % HTML/CSS : piste, bordure, glow et remplissage dynamique.
- Cela évite les doublons, les bavures visuelles et les dépassements liés à l'image.


V6.7 — nouveau bloc Taux de win :
- remplacement de l'ancien asset par le nouveau cadre généré sans barre ;
- suppression des textes/chiffres figés de l'image pour laisser le site les afficher dynamiquement ;
- la partie basse de l'image ne contient aucun dessin de barre ;
- une seule barre HTML/CSS est posée dans l'espace vide ;
- recalage des deux lignes de statistiques sur le nouveau visuel.


V6.8 — correction de taille du bloc Taux de win :
- l'image précédente était en ratio ~1,70 alors que Hall / Shame / T1 sont en 4:3 ;
- panel_win est désormais exactement en 1448 × 1086, comme les autres cadres ;
- les libellés fixes restent dans l'image ;
- seuls les détails, scores et pourcentages sont dynamiques ;
- la barre reste 100 % HTML/CSS dans une zone sans dessin de barre ;
- les coordonnées ont été recalculées pour ce nouveau ratio.


V6.10 — Hall of Fame refait proprement :
- remplacement du fond Hall of Fame par un nouveau visuel propre et vide ;
- plus aucun ancien texte/case doublonné dans l'image ;
- overlay Hall of Fame recalé sur ce nouveau visuel ;
- texte recentré, plus grand et sans décalages cumulés.


V6.11 — Hall of Fame :
- abandon de la grille pour un positionnement absolu ligne par ligne ;
- chaque ligne est maintenant calée directement sur sa case du visuel ;
- fin du décalage cumulatif d'une ligne à l'autre ;
- texte légèrement réduit pour éviter l'effet écrasé dans les cases.


V6.12 — Wall of Shame refait proprement :
- remplacement du fond Wall of Shame par le nouveau visuel vide et plus aéré ;
- plus aucun ancien texte/case écrasé dans l'image ;
- overlay Wall of Shame recalé ligne par ligne ;
- texte légèrement aéré et dimensionné pour mieux tenir dans les cases.


V6.13 — Wall of Shame :
- recalage ligne par ligne, comme Hall of Fame ;
- positions verticales définies individuellement pour chaque case ;
- texte légèrement réduit et compacté pour mieux respirer ;
- objectif : supprimer l'impression de décalage progressif vers le bas.


V6.14 — Wall of Shame :
- l'intitulé et la petite statistique sont désormais sur la même ligne ;
- l'intitulé peut être affiché nettement plus gros ;
- la colonne résultat garde son emplacement à droite ;
- sur écrans plus étroits, la petite statistique repasse sous l'intitulé automatiquement.


V6.15 — Wall of Shame :
- décalage léger vers la droite uniquement de l'icône + bloc intitulé/stat ;
- la colonne des pseudos/résultats à droite ne bouge pas ;
- petite stat rapprochée du bord droit de la case gauche.


V6.16 — Avant le premier conseil :
- "L’équipage perd en moyenne" légèrement descendu ;
- "avant le premier conseil" légèrement remonté ;
- le gros "1,75 Crewmates" n'est pas modifié ;
- dans les 4 petites cartes, l'intitulé devient secondaire ;
- le pseudo / résultat principal devient le texte le plus gros ;
- polices globalement agrandies pour mieux remplir les cases.


V6.17 — Avant le premier conseil refait proprement :
- nouveau fond propre reconstruit, avec icônes intégrées dans l'image ;
- suppression des icônes HTML superposées pour éviter l'effet dédoublé ;
- recalage des zones de texte principale et des 4 mini-cartes ;
- hiérarchie visuelle conservée : intitulé discret, nom/valeur principale plus gros.


V6.18 — Avant le premier conseil :
- seuls les textes des 4 mini-cartes sont remontés ;
- le bloc central « L’équipage perd en moyenne / 1,75 Crewmates / avant le premier conseil » reste inchangé.


V6.19 — Mentions honorables :
- nouveau cadre propre avec icônes intégrées ;
- suppression des icônes HTML pour ce bloc ;
- 5 lignes positionnées individuellement sur les 5 cases ;
- petite statistique placée à côté de l'intitulé au lieu d'être dessous ;
- police légèrement agrandie ;
- résultat/pseudo maintenu dans la colonne de droite.


V6.20 — Mentions honorables :
- nouveau visuel large intégré ;
- colonne de droite élargie pour mieux accueillir les pseudos ;
- lignes toujours calées individuellement ;
- police légèrement renforcée pour rester lisible dans le nouveau cadre.


V6.21 — Mentions honorables :
- correction du doublon de texte ;
- le nouveau fond ne contient plus aucun texte ;
- le titre "Mentions honorables" est maintenant lui aussi en HTML ;
- intitulés, statistiques et pseudos/résultats restent entièrement dynamiques ;
- seules les icônes et la décoration sont intégrées à l'image.


V6.22 — Mentions honorables :
- remplacement par le fond vierge sans petites barres vertes ;
- aucun texte n'est intégré dans l'image ;
- seules les icônes et la décoration sont figées ;
- titre, intitulés, petites stats et pseudos/résultats restent dynamiques ;
- lignes recalées individuellement sur les 5 cases.
