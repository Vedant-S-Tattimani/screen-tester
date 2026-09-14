import { ExplainerData, ExplainerLabels } from "./types";

export const FR_LABELS: ExplainerLabels = {
  overviewHeading: "Aperçu de l'Inspection de l'Écran",
  whatToLookForHeading: "Ce Qu'il Faut Observer Pendant l'Inspection",
  boundariesHeading: "Limites de Mesure et Honnêteté Technique",
  canObserveLabel: "Ce Que Screen Tester Peut Observer",
  cannotMeasureLabel: "Ce Que le Navigateur Ne Peut Pas Mesurer Précisément",
  interpretationHeading: "Interprétation de Vos Observations",
  nextStepsHeading: "Prochaines Étapes Recommandées",
};

export const FR_EXPLAINERS: Record<string, ExplainerData> = {
  "dead-pixel-test": {
    overview: "Un pixel mort est un sous-pixel à cristaux liquides ou un émetteur OLED définitivement hors tension qui reste entièrement noir, quel que soit le signal envoyé. Sur des fonds clairs (notamment blanc pur, cyan ou jaune), les pixels morts se distinguent comme de minuscules points noirs immobiles.",
    whatToLookFor: [
      {
        label: "Points noirs statiques sur fond clair",
        description: "Un point noir minuscule qui ne change pas de couleur lors du défilement des fonds clairs indique un pixel mort."
      },
      {
        label: "Distinguer un pixel mort d'une poussière",
        description: "Une poussière externe change de position selon l'angle de vue et peut être essuyée. Les vrais pixels morts se situent derrière le filtre polarisant."
      },
      {
        label: "Défaut de sous-pixel vs pixel complet",
        description: "Si un seul sous-pixel (rouge, vert ou bleu) est éteint, le point apparaîtra légèrement décoloré plutôt que noir profond sur fond blanc."
      },
      {
        label: "Amas de pixels morts (Clusters)",
        description: "Plusieurs pixels morts regroupés dans une petite zone représentent un défaut de fabrication majeur et ouvrent généralement droit à un remplacement sous garantie."
      }
    ],
    canObserve: [
      "Identification visuelle des pixels éteints sur des fonds unis primaires et secondaires",
      "Localisation précise et comptage des points sombres suspects sur les zones de l'écran",
      "Contraste visuel entre la luminosité du fond et les sous-pixels inactifs"
    ],
    cannotMeasure: [
      "Continuité électrique ou tension des transistors en couches minces (TFT)",
      "Détection logicielle automatisée sans inspection visuelle humaine",
      "Classification matérielle des défauts internes sous les couches de verre"
    ],
    interpretation: "Les pixels morts proviennent d'une défaillance de micro-transistors lors de la fabrication. La plupart des constructeurs appliquent la norme ISO 9241-307 Classe 2, tolérant généralement 2 à 5 sous-pixels défectueux par million.",
    nextSteps: {
      text: "Vous observez des pixels qui restent allumés en couleur ? Utilisez notre outil de stimulation dédié.",
      actionLabel: "Lancer Stuck Pixel Fixer",
      actionHref: "/tests/stuck-pixel-fixer"
    }
  },

  "stuck-pixel-test": {
    overview: "Contrairement à un pixel mort qui reste éteint, un pixel bloqué (stuck pixel) correspond à une cellule de cristaux liquides bloquée en position ouverte. Il apparaît comme un point lumineux fixe (rouge, vert, bleu, cyan ou blanc), particulièrement visible sur fond noir uni.",
    whatToLookFor: [
      {
        label: "Points lumineux sur fond noir pur",
        description: "Inspectez l'écran noir dans une pièce sombre. Tout point qui brille en rouge, vert, bleu ou jaune est un sous-pixel bloqué."
      },
      {
        label: "Test aux couleurs complémentaires",
        description: "Un sous-pixel vert bloqué disparaîtra sur fond vert mais brillera intensément sur un fond rouge, bleu ou noir."
      },
      {
        label: "Pixels blancs permanents",
        description: "Si les trois sous-pixels (RGB) restent ouverts en permanence, le défaut prendra la forme d'un point blanc fixe sur fond sombre."
      },
      {
        label: "Différence avec les fuites de lumière",
        description: "Les pixels bloqués sont des points ponctuels isolés, tandis que le backlight bleed produit des halos diffus le long des bordures du cadre."
      }
    ],
    canObserve: [
      "Repérage visuel des sous-pixels allumés sur fonds sombres et complémentaires",
      "Isolement des canaux de couleur affectés (rouge, vert ou bleu)",
      "Cartographie des quadrants d'écran contenant des anomalies"
    ],
    cannotMeasure: [
      "Viscosité chimique ou orientation physique des molécules de cristaux liquides",
      "Résistance électrique ou vitesse de commutation de la grille du transistor",
      "Persistance garantie du défaut sans observation prolongée"
    ],
    interpretation: "Les pixels bloqués surviennent lorsqu'un cristal liquide reste figé suite à des charges électrostatiques ou des tolérances de production. Contrairement aux pixels morts, ils peuvent souvent être débloqués par une stimulation visuelle rapide.",
    nextSteps: {
      text: "Vous avez repéré un pixel bloqué ? Tentez de le débloquer avec notre outil de stimulation de sous-pixels.",
      actionLabel: "Essayer Stuck Pixel Fixer",
      actionHref: "/tests/stuck-pixel-fixer"
    }
  },

  "stuck-pixel-fixer": {
    overview: "Le Stuck Pixel Fixer utilise des cycles de couleurs primaires à haute fréquence et des motifs de bruit aléatoire pour stimuler mécaniquement et électriquement les molécules de cristaux liquides afin de tenter de débloquer le sous-pixel.",
    whatToLookFor: [
      {
        label: "Positionnement ciblé du cadre",
        description: "Placez la zone de stimulation animée directement sur le pixel bloqué pour éviter un clignotement inutile sur l'ensemble de l'écran."
      },
      {
        label: "Choix du motif de stimulation",
        description: "Alternez entre le cycle RGB rapide et le bruit chromatique pour tester différentes fréquences d'excitation."
      },
      {
        label: "Durée de la séance",
        description: "Faites tourner l'outil pendant 15 à 30 minutes, puis mettez en pause et inspectez sur fond noir pour vérifier si le pixel a retrouvé sa mobilité."
      },
      {
        label: "Avertissement de sensibilité visuelle",
        description: "Arrêtez immédiatement si vous ressentez des étourdissements ou une fatigue oculaire. Ne pas utiliser en cas de photosensibilité."
      }
    ],
    canObserve: [
      "Lecture fluide en temps réel de séquences RGB rapides et de bruit chromatique dans le navigateur",
      "Positionnement millimétrique du cadre et suivi du minuteur par session",
      "Contrôle visuel avant/après stimulation sur fond sombre"
    ],
    cannotMeasure: [
      "Réparation matérielle de transistors TFT grillés ou de circuits endommagés",
      "Pourcentage de réussite garanti (dépend de la cause physique du blocage)",
      "Restauration de pixels morts (totalement noirs et non alimentés)"
    ],
    interpretation: "Les méthodes logicielles n'agissent que sur des cristaux liquides mécaniquement coincés. Si le composant est physiquement rompu ou le transistor détruit, seule une prise en charge sous garantie constructeur permettra de remplacer la dalle.",
    nextSteps: {
      text: "Après la session, repassez sur le Stuck Pixel Test pour vérifier le résultat sur fond noir uni.",
      actionLabel: "Vérifier avec Stuck Pixel Test",
      actionHref: "/tests/stuck-pixel-test"
    }
  },

  "refresh-rate-test": {
    overview: "Le taux de rafraîchissement (mesuré en Hertz, Hz) indique le nombre de fois par seconde où la dalle reconstruit l'image. Ce test s'appuie sur l'horloge d'animation du navigateur (requestAnimationFrame) pour évaluer la cadence d'affichage et vérifier la synchronisation avec le système d'exploitation.",
    whatToLookFor: [
      {
        label: "Taux observé vs configuré",
        description: "Vérifiez que la valeur mesurée correspond bien au réglage de votre écran (ex. 60Hz, 120Hz, 144Hz ou 240Hz)."
      },
      {
        label: "Régularité des images (Frame Pacing)",
        description: "Sur un écran 144Hz stable, les images doivent être délivrées à des intervalles réguliers d'environ 6,94 ms."
      },
      {
        label: "Blocage du navigateur à 60Hz",
        description: "Si un écran 144Hz reste bloqué à 60Hz, des modes d'économie d'énergie ou l'absence d'accélération matérielle peuvent être en cause."
      },
      {
        label: "Fluidité du repère mobile",
        description: "Sur les dalles à haute fréquence, la barre d'animation doit glisser sans saccade ni saut perceptible."
      }
    ],
    canObserve: [
      "Fréquence et écarts temporels des appels requestAnimationFrame du navigateur",
      "Estimation des FPS d'animation et régularité de la synchronisation verticale",
      "Comportement de synchronisation du compositeur graphique dans l'onglet actif"
    ],
    cannotMeasure: [
      "Fréquence matérielle réelle de la dalle indépendamment des limites du navigateur",
      "Bande passante et protocole physique des câbles HDMI ou DisplayPort",
      "Intervalles de rafraîchissement vertical (VBLANK) mesurés à l'oscilloscope"
    ],
    interpretation: "Les navigateurs web synchronisent leur boucle de rendu avec le compositeur du système d'exploitation. Des profils d'économie d'énergie ou des configurations multi-écrans à fréquences mixtes peuvent limiter l'onglet à 60Hz.",
    nextSteps: {
      text: "Votre écran gamer est bridé à 60Hz dans le navigateur ? Consultez notre guide de dépannage.",
      actionLabel: "Guide Taux de Rafraîchissement",
      actionHref: "/knowledge-base/troubleshooting#refresh-rate-capped"
    }
  },

  "ghosting-test": {
    overview: "Le ghosting se traduit par des traînées ou des silhouettes floues à l'arrière des objets en mouvement. Il survient lorsque les cristaux liquides mettent plus de temps à changer d'état (temps de réponse) que la durée d'affichage d'une image.",
    whatToLookFor: [
      {
        label: "Traînées sombres (Ghosting classique)",
        description: "Des traînées sombres indiquent une transition lente du sombre vers le clair, très fréquente sur les dalles VA."
      },
      {
        label: "Halos clairs ou couronnes (Ghosting inverse)",
        description: "Des traînées blanches ou lumineuses signalent un réglage d'Overdrive ou de Temps de Réponse trop agressif (overshoot)."
      },
      {
        label: "Sensibilité selon les teintes",
        description: "Observez si les traînées sont plus prononcées sur des fonds rouges ou gris foncé que sur des surfaces claires."
      },
      {
        label: "Suivi oculaire vs réactivité de la dalle",
        description: "Suivez l'objet du regard pour distinguer le flou rétinien physiologique du traînage réel des cristaux liquides."
      }
    ],
    canObserve: [
      "Apparition visuelle de traînées et de couronnes d'overshoot à différentes vitesses",
      "Comparaison des temps de transition entre contrastes sombre/clair et clair/sombre",
      "Effet direct de la modification du réglage d'Overdrive dans le menu OSD de l'écran"
    ],
    cannotMeasure: [
      "Temps de réponse Gris à Gris (GtG) exact en millisecondes selon les normes de laboratoire",
      "Courbes d'extinction lumineuse mesurées par caméra de poursuite optique (Pursuit Camera)",
      "Tensions électriques appliquées aux sous-pixels"
    ],
    interpretation: "Le ghosting est tributaire de la technologie de dalle (TN rapide mais couleurs réduites, IPS équilibré, VA sujet aux traînées sombres, OLED quasi instantané). Un Overdrive réglé sur Moyen offre généralement le meilleur compromis.",
    nextSteps: {
      text: "Vous souhaitez éliminer les couronnes d'overshoot et régler au mieux l'Overdrive ?",
      actionLabel: "Lire le Guide Ghosting & Flou de Mouvement",
      actionHref: "/knowledge-base/monitor-ghosting-and-motion-blur"
    }
  },

  "motion-blur-test": {
    overview: "Contrairement au ghosting, le flou de mouvement sur les écrans plats modernes résulte essentiellement du principe de maintien (Sample-and-Hold) : l'image restant affichée jusqu'au rafraîchissement suivant, le suivi oculaire engendre un flou rétinien.",
    whatToLookFor: [
      {
        label: "Perte de détails à haute vitesse",
        description: "Observez les lignes fines et les caractères en mouvement. Repérez la vitesse à laquelle les détails se brouillent."
      },
      {
        label: "Comparaison de vélocités",
        description: "Comparez un déplacement à 240 px/s et à 960 px/s pour constater l'impact de la vitesse sur le flou perçu."
      },
      {
        label: "Effet de l'insertion d'images noires (BFI)",
        description: "Si votre moniteur dispose d'un rétroéclairage stroboscopique (ULMB, ELMB, DyAc), activez-le pour constater un gain net de netteté."
      },
      {
        label: "Sample-and-Hold sur dalles OLED",
        description: "Même avec un temps de réponse de 0,1ms, un écran OLED à 60Hz ou 120Hz sans stroboscopie produira du flou de rétention."
      }
    ],
    canObserve: [
      "Différences de netteté perçue selon la vitesse de déplacement et la fréquence de l'écran",
      "Amélioration optique lors de l'activation des modes stroboscopiques matériels (BFI)",
      "Différence entre contours statiques nets et silhouettes animées estompées"
    ],
    cannotMeasure: [
      "Temps de réponse d'image en mouvement (MPRT) en millisecondes exactes",
      "Courbes physiologiques d'intégration de la lumière sur la rétine",
      "Cycle d'extinction stroboscopique du rétroéclairage"
    ],
    interpretation: "Pour atténuer le flou Sample-and-Hold, il faut augmenter le taux de rafraîchissement (pour réduire la durée d'exposition de chaque image) ou introduire des phases d'obscurité (BFI / Stroboscopie).",
    nextSteps: {
      text: "Vérifiez avec le test de rafraîchissement comment des fréquences plus élevées réduisent le flou.",
      actionLabel: "Tester le Taux de Rafraîchissement",
      actionHref: "/tests/refresh-rate-test"
    }
  },

  "vrr-test": {
    overview: "La fréquence de rafraîchissement variable (VRR : NVIDIA G-Sync, AMD FreeSync, VESA Adaptive-Sync) synchronise dynamiquement les cycles de l'écran avec la production de la carte graphique afin d'éliminer déchirements et saccades.",
    whatToLookFor: [
      {
        label: "Déchirements d'image (Screen Tearing)",
        description: "Repérez les lignes horizontales où les parties haute et basse de l'image affichent des trames désalignées."
      },
      {
        label: "Microsaccades (Stutter / Judder)",
        description: "Vérifiez si l'élément mobile progresse avec une fluidité parfaite ou montre des à-coups lors des variations de cadence."
      },
      {
        label: "VRR en mode fenêtré vs plein écran",
        description: "De nombreux pilotes graphiques n'activent G-Sync ou FreeSync qu'en plein écran exclusif sauf configuration spécifique."
      },
      {
        label: "Compensation de faible fréquence (LFC)",
        description: "Si le débit descend sous le seuil minimal de l'écran (ex. sous 48Hz), observez si les images sont dupliquées de façon fluide."
      }
    ],
    canObserve: [
      "Perception visuelle des lignes de tearing et des microsaccades sous cadences de trames fluctuantes",
      "Régularité du défilement lors de variations de rendu imposées au navigateur",
      "Différences de comportement entre affichage fenêtré et plein écran"
    ],
    cannotMeasure: [
      "Communication matérielle directe entre le pilote GPU et le processeur de la dalle",
      "État d'activation du module physique G-Sync ou FreeSync",
      "Flux de métadonnées en temps réel sur les canaux auxiliaires DisplayPort"
    ],
    interpretation: "Le navigateur fonctionnant au sein du gestionnaire de fenêtres du système d'exploitation, l'engagement du VRR dépend de paramètres système tels que la planification graphique accélérée (HAGS) et les pilotes.",
    nextSteps: {
      text: "Vous observez des saccades ou des coupures d'image malgré le VRR ? Consultez notre guide de dépannage.",
      actionLabel: "Guide Dépannage VRR",
      actionHref: "/knowledge-base/troubleshooting#vrr-stutter-tearing"
    }
  },

  "backlight-bleed-test": {
    overview: "Le backlight bleed se produit lorsque la lumière du rétroéclairage s'échappe par les bords ou les coins d'une dalle LCD sous l'effet de tensions mécaniques du cadre. Ce test sur fond noir pur permet d'identifier ces fuites et de les distinguer du halo angulaire propre aux dalles IPS (IPS Glow).",
    whatToLookFor: [
      {
        label: "Fuites aux coins et bordures",
        description: "Des zones lumineuses jaunâtres ou blanchâtres le long du cadre qui restent visibles quel que soit l'angle de vision."
      },
      {
        label: "IPS Glow vs Fuite réelle",
        description: "Déplacez votre tête latéralement : si le reflet change d'intensité ou de position selon l'angle, il s'agit d'IPS Glow normal, non d'une fuite."
      },
      {
        label: "Effet de clouding (nébulosité)",
        description: "Des taches blanchâtres diffuses causées par des feuilles de diffusion irrégulières ou des torsions mécaniques du châssis."
      },
      {
        label: "Comparaison avec OLED et Mini-LED",
        description: "Les dalles OLED émettent leur propre lumière et affichent 0 nits sans aucune fuite. Les Mini-LED peuvent montrer de légers halos locaux."
      }
    ],
    canObserve: [
      "Fuites de lumière visibles sur les bords et zones de pression du châssis sur fond noir",
      "Répartition des taches de luminosité dans un environnement totalement obscurci",
      "Dépendance à l'angle de vision pour distinguer fuite mécanique et reflet IPS Glow"
    ],
    cannotMeasure: [
      "Luminance absolue de la dalle en cd/m² (nits) sans sonde spectrophotométrique",
      "Rapport de contraste statique natif (ex. 1000:1 contre 3000:1)",
      "Certification officielle de contraste ANSI à 16 zones"
    ],
    interpretation: "Un léger reflet IPS Glow est une caractéristique optique normale des dalles IPS. En revanche, un backlight bleed marqué est un défaut d'assemblage où le châssis comprime le guide de lumière.",
    nextSteps: {
      text: "Apprenez à faire la différence entre IPS Glow, fuites de lumière et noirs parfaits OLED.",
      actionLabel: "Guide Backlight Bleed vs IPS Glow",
      actionHref: "/knowledge-base/backlight-bleed-vs-ips-glow"
    }
  },

  "near-black-test": {
    overview: "Le test proche du noir évalue la capacité de l'écran à restituer les nuances de gris très sombres juste au-dessus du noir absolu (de 0,5% à 5% de luminance). Si le moniteur écrase ces nuances (Black Crush), les détails dans les scènes sombres disparaissent complètement.",
    whatToLookFor: [
      {
        label: "Black Crush (Écrasement des ombres)",
        description: "Si le premier palier (0,5% ou 1%) est invisible et se fond dans le noir, votre écran souffre d'écrasement des ombres."
      },
      {
        label: "Distinction des seuils successifs",
        description: "Dans une pièce sombre, vous devez distinguer nettement les limites entre chaque échantillon de gris faible."
      },
      {
        label: "Glissement de gamma sur dalles VA",
        description: "Sur les écrans VA, les détails sombres n'apparaissent souvent que lorsqu'on regarde la dalle légèrement de biais."
      },
      {
        label: "Reflets de l'éclairage ambiant",
        description: "La lumière de la pièce masque les nuances très sombres pour l'œil humain ; éteignez les éclairages directs pour le test."
      }
    ],
    canObserve: [
      "Seuils visuels de visibilité pour les nuances de 0,5%, 1%, 2%, 3%, 4% et 5%",
      "Séparation perceptive des détails dans les scènes très sombres",
      "Effet des réglages de Gamma, Égaliseur de Noirs et Plage Dynamique HDMI"
    ],
    cannotMeasure: [
      "Luminance photométrique sous 0,05 nits sans équipement de mesure dédié",
      "Conformité mathématique exacte aux courbes gamma (BT.1886 vs 2.2)",
      "Niveau de noir natif absolu du panneau en cd/m²"
    ],
    interpretation: "L'écrasement des noirs résulte souvent d'une plage dynamique inadaptée dans le pilote GPU (Limitée 16–235 au lieu de Complète 0–255) ou de modes d'amélioration artificielle du contraste.",
    nextSteps: {
      text: "Vous perdez les détails dans les zones d'ombre ? Suivez notre guide pour corriger le Black Crush.",
      actionLabel: "Dépannage Black Crush",
      actionHref: "/knowledge-base/troubleshooting#black-crush"
    }
  },

  "gradient-banding-test": {
    overview: "Des dégradés continus exigent une gradation fine des teintes. Si la dalle, le pilote graphique ou le profil d'affichage manquent de profondeur de bits, les transitions douces se dégradent en bandes étagées ou en lignes de posterisation visibles.",
    whatToLookFor: [
      {
        label: "Lignes de coupure visibles",
        description: "Repérez les démarcations nettes ou les marches d'escalier au lieu d'une transition continue sur les rampes de gris et RGB."
      },
      {
        label: "Banding ciblé par canal de couleur",
        description: "Vérifiez si le phénomène est plus marqué sur les bleus ou les zones sombres que sur les gris moyens."
      },
      {
        label: "Profondeur de bits et tramage FRC",
        description: "Les dalles 8 bits et 10 bits natives offrent des transitions fluides ; les dalles 6 bits avec FRC laissent souvent voir un léger grain ou des marches."
      },
      {
        label: "Plage dynamique complète vs limitée",
        description: "Si la carte graphique envoie un signal 'Limité' (16–235), les extrémités sombres et claires du dégradé seront brutalement tronquées."
      }
    ],
    canObserve: [
      "Présence visuelle de marches de banding sur les dégradés monochromes et couleur",
      "Comparaison entre rampes horizontales, verticales et multicanales",
      "Artefacts provoqués par des profils ICC mal calibrés ou une plage dynamique tronquée"
    ],
    cannotMeasure: [
      "Profondeur de bits physique de la dalle sans dépendre des données du pilote",
      "Écarts mesurables Delta E entre paliers de couleur adjacents",
      "Algorithmes internes de tramage spatial intégrés au processeur de l'écran"
    ],
    interpretation: "Le banding provient souvent d'une dalle 6 bits, d'un réglage de plage dynamique restreint (16–235) ou d'un profil ICC qui tronque les valeurs numériques.",
    nextSteps: {
      text: "Vous souhaitez simuler des paliers 6 bits, 8 bits et tester le dithering ? Essayez notre outil dédié.",
      actionLabel: "Test de Profondeur & Tramage",
      actionHref: "/tests/color-banding-test"
    }
  },

  "uniformity-test": {
    overview: "L'uniformité mesure la régularité de la luminosité et de la température de couleur sur toute la dalle. Les défauts de diffusion du rétroéclairage causent un assombrissement périphérique ou l'effet d'écran sale (Dirty Screen Effect - DSE).",
    whatToLookFor: [
      {
        label: "Vignettage aux coins et bordures",
        description: "Examinez sur des gris à 25%, 50% et 75% si les pourtours et angles sont sensiblement plus sombres que le centre."
      },
      {
        label: "Effet d'écran sale (DSE)",
        description: "Des marbrures ou taches nébuleuses perceptibles lors de travellings sur des teintes unies (ex. retransmissions sportives)."
      },
      {
        label: "Dérive de température de couleur",
        description: "Notez si un côté de la dalle paraît plus chaud (jaune/rouge) et l'autre plus froid (bleuté)."
      },
      {
        label: "Comparaison sur grille 5x5",
        description: "Évaluez la baisse progressive de luminosité entre le centre et la périphérie de la grille."
      }
    ],
    canObserve: [
      "Baisse de luminosité visuelle, vignettage et points chauds sur fonds gris et blancs",
      "Différences perceptibles de température de couleur entre quadrants",
      "Évaluation sur plusieurs paliers normalisés de luminosité"
    ],
    cannotMeasure: [
      "Pourcentage d'uniformité chiffré (ex. '98,5% uniforme') sans spectrophotomètre de laboratoire multipoint",
      "Variation thermique exacte en degrés Kelvin sur les coordonnées de la dalle",
      "Statut d'activation des circuits de compensation numérique d'uniformité (DUC)"
    ],
    interpretation: "Les écrans grand public tolèrent en général 10% à 15% de baisse lumineuse vers les bords. Les écrans graphiques professionnels utilisent des circuits DUC pour rester sous 5% d'écart.",
    nextSteps: {
      text: "Comprenez l'origine du DSE et les seuils d'acceptabilité pour une prise en charge sous garantie.",
      actionLabel: "Guide Uniformité d'Écran",
      actionHref: "/knowledge-base/backlight-bleed-vs-ips-glow"
    }
  },

  "text-clarity-test": {
    overview: "La lisibilité des polices dépend de la densité de pixels (PPI), de la mise à l'échelle du système, de l'agencement physique des sous-pixels (RGB, BGR, QD-OLED) et des moteurs de lissage logiciel.",
    whatToLookFor: [
      {
        label: "Franges colorées sur les contours",
        description: "Des liserés rouges ou bleus le long des lignes verticales de texte indiquent un désalignement entre sous-pixels et lissage système."
      },
      {
        label: "Disposition BGR inversée",
        description: "Certains écrans adoptent un agencement BGR au lieu de RGB ; sans reconfigurer Windows ClearType, les polices deviennent floues."
      },
      {
        label: "Franges sur dalles OLED",
        description: "Les agencements triangulaires des dalles QD-OLED et WOLED créent de fines franges vertes ou magenta sur les arêtes horizontales."
      },
      {
        label: "Flou de mise à l'échelle fractionnaire",
        description: "Des taux d'échelle comme 125% ou 150% peuvent rendre floues certaines applications de bureau plus anciennes."
      }
    ],
    canObserve: [
      "Franges de couleur sur les contours des caractères de 8px à 32px",
      "Différences de rendu entre polices avec et sans empattement et en mode inversé",
      "Impact du zoom navigateur et de l'échelle système sur la netteté du texte"
    ],
    cannotMeasure: [
      "Disposition géométrique microscopique des sous-pixels sans objectif macro ou microscope",
      "Paramètres internes de DirectWrite ou ClearType non exposés au navigateur",
      "Fonction de transfert de modulation optique (MTF) de l'écran"
    ],
    interpretation: "Si le texte semble baveux avec des contours colorés, réexécuter l'assistant ClearType de Windows permet souvent de corriger la lisibilité sur dalles BGR.",
    nextSteps: {
      text: "Vos polices manquent de netteté ? Suivez notre guide pour calibrer ClearType et l'échelle d'affichage.",
      actionLabel: "Guide de Clarté du Texte",
      actionHref: "/knowledge-base/troubleshooting#blurry-text-scaling"
    }
  },

    "hdr-capability-test": {
    "overview": "Le Détecteur Matériel et Signal HDR vérifie si le compositeur de l'OS, le pilote d'affichage et le navigateur communiquent des signaux HDR. Il analyse les CSS Media Queries Niveau 4 (dynamic-range: high), le large gamut (Rec.2020 / Display-P3), les tampons Canvas P3, les tampons WebGL float et les décodeurs vidéo HDR 10 bits accélérés par le matériel.",
    "whatToLookFor": [
        {
            "label": "État du Signal HDR du Compositeur",
            "description": "Confirme si le compositeur de l'OS émet un signal HDR vers le navigateur. Si inactif, le HDR est désactivé dans les réglages système."
        },
        {
            "label": "Profondeur de Tampon & Pipeline",
            "description": "Détecte la profondeur de couleur (24 bits SDR vs 30 bits+ HDR) et vérifie si Canvas et WebGL2 peuvent allouer des tampons P3 et float."
        },
        {
            "label": "Gamut Étendu (Rec.2020 et P3)",
            "description": "Évalue si votre moniteur dépasse le sRGB classique pour afficher des rouges carmin et verts émeraude éclatants."
        },
        {
            "label": "Accélération des Codecs Vidéo HDR",
            "description": "Teste le décodage matériel pour HDR10 (HEVC Main 10), AV1 10 bits (YouTube HDR) et VP9 Profil 2."
        }
    ],
    "canObserve": [
        "État d'émission HDR en temps réel du compositeur de l'OS",
        "Prise en charge matérielle et navigateur des gamuts Display-P3 et Rec.2020",
        "Profondeur de couleur du tampon d'affichage et support des tampons float",
        "Capacités de lecture vidéo 10 bits accélérée par le matériel"
    ],
    "cannotMeasure": [
        "Luminance de crête physique (nits) sans colorimètre de laboratoire",
        "Niveau de certification VESA DisplayHDR (ex. DisplayHDR 400 vs 600 vs 1000)",
        "Nombre physique de zones de gradation locale sur rétroéclairage Mini-LED"
    ],
    "interpretation": "Si dynamic-range affiche standard (inactif), appuyez sur Win + Alt + B sous Windows ou activez HDR dans Réglages macOS.",
    "nextSteps": {
        "text": "Vous souhaitez inspecter l'écrêtage des hautes lumières, les courbes tonales et les nits de crête ? Lancez le test optique.",
        "actionLabel": "Lancer l'Inspection Visuelle HDR",
        "actionHref": "/tests/hdr-test"
    }
},

  "hdr-test": {
    "overview": "Le test d'Étalonnage Visuel et d'Inspection des Hautes Lumières HDR offre des mires optiques pour évaluer la réponse du moniteur aux signaux HDR. Il examine l'écrêtage des hautes lumières spéculaires, le tone mapping, le pic de luminance à 10% APL, les courbes PQ/EOTF et les ombres.",
    "whatToLookFor": [
        {
            "label": "Rolloff et Écrêtage des Hautes Lumières",
            "description": "Inspectez les patchs de 90% à 100% de blanc. Les mires circulaires doivent rester visibles sans se fondre en blanc brûlé."
        },
        {
            "label": "Fenêtre de Luminance Pic 10% APL",
            "description": "Une fenêtre à 10% sur fond noir absolu évalue la réserve de nits, le local dimming et les halos lumineux."
        },
        {
            "label": "Gradation de Courbe Tonale PQ / EOTF",
            "description": "Compare les dégradés fluides 10 bits aux rampes 8 bits pour révéler le banding et les compressions agressives."
        },
        {
            "label": "Détails d'Ombre (Black Crush)",
            "description": "Vérifie si les nuances très sombres (0,5% à 5%) se distinguent du noir pur 0% sans délaver les noirs."
        }
    ],
    "canObserve": [
        "Point d'écrêtage des hautes lumières à travers les paliers de blanc",
        "Halos de gradation locale et réserve de pic de luminosité dans la fenêtre 10% APL",
        "Fluidité des transitions tonales 10 bits par rapport au banding 8 bits",
        "Séparation des détails d'ombre et comportement d'écrasement des noirs"
    ],
    "cannotMeasure": [
        "Luminance exacte en nits sans appareils de mesure de laboratoire",
        "Précision de température de couleur (Kelvin) sans spectrophotomètre",
        "Temps de réponse des pixels ou dépassement d'overdrive"
    ],
    "interpretation": "Les moniteurs avec un tone mapping insuffisant brûlent les blancs au-dessus de 94% ou écrasent les ombres. Les écrans OLED et Mini-LED haut de gamme préservent les mires jusqu'à 99%.",
    "nextSteps": {
        "text": "Vérifier si votre système et vos codecs vidéo supportent le HDR ? Consultez le détecteur matériel.",
        "actionLabel": "Vérifier Matériel et Signal HDR",
        "actionHref": "/tests/hdr-capability-test"
    }
},

  "strobe-crosstalk-test": {
    "overview": "Backlight strobing (ULMB, DyAc, ELMB, LightBoost) eliminates eye-tracking motion blur by pulsing the backlight on only when liquid crystals have finished transitioning. However, because displays scan pixels from top to bottom while backlights flash globally across the entire screen, pixel transitions at the very top or bottom may be incomplete when the pulse fires. This timing mismatch creates duplicate phantom images known as strobe crosstalk.",
    "whatToLookFor": [
      {
        "label": "Double-Image Silhouettes",
        "description": "Watch the moving bars in the top, center, and bottom tracks. Notice whether you see a single sharp bar or a faint duplicate ghost trailing or leading it."
      },
      {
        "label": "Top vs Center vs Bottom Clarity",
        "description": "Most monitors optimize strobe phase for the screen center. The center zone should show crisp, single-image motion, while top and bottom zones typically show varying degrees of crosstalk."
      },
      {
        "label": "Strobe Pulse Width & Brightness",
        "description": "Shorter strobe pulses yield sharper motion but lower overall display brightness. Adjust your monitor's strobe duty cycle in its OSD to balance clarity vs luminance."
      }
    ],
    "canObserve": [
      "Relative strobe crosstalk visibility across vertical screen zones",
      "Identification of optimal strobe phase calibration point on your panel",
      "Comparison of motion blur reduction at various panning velocities"
    ],
    "cannotMeasure": [
      "Exact backlight strobe flash duration in microseconds",
      "Photometric strobe luminance peak in nits without a photodiode",
      "Hardware panel scan-out velocity and VSYNC timing interval"
    ],
    "interpretation": "A small amount of strobe crosstalk at the extreme top and bottom edges is normal on LCD monitors. Severe crosstalk across the center zone indicates mismatched strobe phase or refresh rate desync.",
    "nextSteps": {
      "text": "Compare strobed motion against native sample-and-hold motion blur.",
      "actionLabel": "Run Motion Blur Test",
      "actionHref": "/tests/motion-blur-test"
    }
  },
  "vrr-flicker-test": {
    "overview": "Variable Refresh Rate (VRR / G-Sync / FreeSync) dynamically matches screen refresh rate to GPU rendering output. However, liquid crystal relaxation and OLED pixel luminance curves vary depending on the duration of the refresh cycle. When framerates swing rapidly—especially between high FPS and lower boundary thresholds—luminance curves shift dynamically, producing noticeable brightness flicker in dark and near-black areas.",
    "whatToLookFor": [
      {
        "label": "Near-Black Brightness Pumping",
        "description": "Observe the 10% near-black and 25% dark gray patches as the automated framerate sweep cycles. Look for subtle rhythmic pulsations in overall darkness."
      },
      {
        "label": "LFC (Low Framerate Compensation) Transition Jolt",
        "description": "When framerates dip below the minimum VRR threshold (e.g., below 48Hz), graphics drivers double frame presentation (LFC). This rapid Hz shift can cause a momentary luminance flicker."
      },
      {
        "label": "OLED Gamma Shift",
        "description": "OLED displays are particularly prone to VRR gamma flicker because subpixel charge times depend heavily on frame length. Dark scene textures may pulse visibly during framerate drops."
      }
    ],
    "canObserve": [
      "Visual identification of gamma curve shifts across dark gray luminance levels",
      "Detection of brightness pumping during simulated framerate oscillation",
      "Comparison between subtle midtone gray vs near-black flicker sensitivity"
    ],
    "cannotMeasure": [
      "Hardware GPU-to-display Adaptive-Sync timing packets",
      "Exact millivolt OLED subpixel voltage fluctuations",
      "Automatic detection without user visual evaluation"
    ],
    "interpretation": "If you observe strong brightness pulsing, your display has sensitive VRR gamma curves. Cap your framerate slightly below max refresh rate or disable VRR in games with unstable frame times to prevent flicker.",
    "nextSteps": {
      "text": "Verify your display's variable refresh rate support and range.",
      "actionLabel": "Run VRR Capability Test",
      "actionHref": "/tests/vrr-test"
    }
  },
  "pursuit-camera-test": {
    "overview": "Human eyes track moving on-screen objects with continuous smooth pursuit motion. Standard stationary camera photographs cannot capture true display motion blur because they don't move with the eye. A pursuit camera tracks the moving pattern at exact matched speed, allowing photographic capture of true perceived Motion Picture Response Time (MPRT) and ghosting smear.",
    "whatToLookFor": [
      {
        "label": "Temporal Graduation Alignment",
        "description": "The top track contains vertical white graduation ticks. When tracking smoothly with your camera or phone, these ticks will merge into a single sharp vertical line in your photo."
      },
      {
        "label": "Ghosting & Trailing Artifacts",
        "description": "Once tracking sync is verified by crisp vertical ticks, examine the trailing edge of the moving object to see phosphor decay, overdrive coronas, or ghost trails."
      },
      {
        "label": "Overdrive Overshoot (Coronas)",
        "description": "A bright glowing outline trailing behind the moving object indicates excessive monitor pixel overdrive (inverse ghosting)."
      }
    ],
    "canObserve": [
      "Camera panning synchronization via temporal graduation track verification",
      "Visual smear width directly proportional to perceived MPRT",
      "Distinction between pixel transition blur (GtG) and sample-and-hold eye-tracking blur (MPRT)"
    ],
    "cannotMeasure": [
      "Automatic MPRT calculation without taking and measuring a tracking photograph",
      "Sub-millisecond photodiode optical response curves",
      "Optical tracking rail velocity without calibrated hardware"
    ],
    "interpretation": "When temporal graduation marks form a clean vertical line in your exposure, tracking was synchronized. The width of trailing smear on the object reflects the display's true MPRT motion blur.",
    "nextSteps": {
      "text": "Compare motion performance across different overdrive settings in your monitor OSD.",
      "actionLabel": "Run Ghosting Test",
      "actionHref": "/tests/ghosting-test"
    }
  },
  "audio-sync-test": {
    "overview": "Modern visual processing (frame scaling, HDR dynamic tone mapping, and motion smoothing) introduces video latency. Meanwhile, soundbars, AV receivers, and Bluetooth audio devices (A2DP codec buffers) introduce audio latency. If video and audio diverge by more than ITU-R perceptual thresholds (+45ms to -125ms), speech lip-sync becomes noticeably disjointed.",
    "whatToLookFor": [
      {
        "label": "Simultaneous Flash and Beep",
        "description": "Watch the rotating needle pass the top 12 o'clock zero mark. The instant visual white/green flash should align perfectly with the audible 1 kHz pulse."
      },
      {
        "label": "Audio Leading Video (Negative Offset)",
        "description": "If you hear the beep before you see the visual flash, the display is lagging behind the audio. Audio needs to be delayed."
      },
      {
        "label": "Video Leading Audio (Positive Offset)",
        "description": "If you see the flash before you hear the beep, audio processing (e.g., Bluetooth lag or soundbar processing) is delayed relative to the display."
      }
    ],
    "canObserve": [
      "Human perceptual synchronization between optical visual flashes and acoustic pulses",
      "Measurement of required millisecond compensation offset (+/- 200ms)",
      "Audio output channel verification via Web Audio API 1 kHz synthesized pulses"
    ],
    "cannotMeasure": [
      "Hardware electrical acoustic sound wave arrival times with microsecond laboratory precision",
      "Microphone acoustic feedback loop without audio input authorization",
      "Bluetooth packet retransmission delays at the operating system driver level"
    ],
    "interpretation": "Perceptual lip-sync alignment within +/- 20ms is considered excellent and imperceptible to human audiences. Latencies greater than 50ms should be corrected using audio delay settings in your soundbar or media player.",
    "nextSteps": {
      "text": "Test your speakers for stereo channel separation and frequency range.",
      "actionLabel": "Run Speaker Test",
      "actionHref": "/tests/speaker-test"
    }
  },
  "gamepad-test": {
    "overview": "Game controllers use analog potentiometers or Hall-effect magnetic sensors to translate thumbstick movement into directional coordinates. Over time, internal carbon wiper wear, spring degradation, and dust contamination cause the stick to register off-center coordinates when resting untouched—a defect known as stick drift.",
    "whatToLookFor": [
      {
        "label": "Resting Stick Drift",
        "description": "Release both thumbsticks completely. If the crosshair indicator sits outside the central zero point or drifts continuously, stick drift is present."
      },
      {
        "label": "Circularity Error",
        "description": "Rotate the sticks along their outer boundaries. Quality gamepads produce a clean, smooth circle without clipping flat at the diagonal corners."
      },
      {
        "label": "Deadzone Thresholding",
        "description": "Check how far you must nudge the stick before the coordinate responds. Excessive deadzones make aiming sluggish, while too-small deadzones cause drift."
      },
      {
        "label": "Analog Trigger Smoothness",
        "description": "Gradually squeeze LT and RT triggers. The percentage readout should climb smoothly from 0% to 100% without jumping or sticking."
      }
    ],
    "canObserve": [
      "Real-time analog stick X/Y coordinate readouts and resting drift values",
      "Full 16-button digital actuation matrix and analog trigger pressure percentages",
      "Controller connection status, device ID name, and polling rate via HTML5 Gamepad API"
    ],
    "cannotMeasure": [
      "Physical potentiometer wiper resistance in ohms",
      "Internal battery voltage level (unless supported by proprietary browser extensions)",
      "Wireless Bluetooth radio interference or packet drop rates"
    ],
    "interpretation": "A resting coordinate value below 0.05 (5%) is typically absorbed by standard game deadzones. Values exceeding 0.10 (10%) will cause visible in-game camera drift and suggest recalibration or cleaning.",
    "nextSteps": {
      "text": "Test your display's input latency and your personal reaction time.",
      "actionLabel": "Run Reaction Time Test",
      "actionHref": "/tests/reaction-time-test"
    }
  }
  ,
  "battery-test": {
    "overview": "L'inspecteur de batterie et d'alimentation utilise l'API W3C Battery Status pour afficher en temps réel le pourcentage de charge, l'état d'alimentation et le temps restant estimé.",
    "whatToLookFor": [
        {
            "label": "Niveau de charge en temps réel",
            "description": "Surveille le pourcentage de batterie fourni par le système d'exploitation."
        },
        {
            "label": "État de branchement secteur",
            "description": "Détecte si l'appareil est alimenté sur secteur ou sur batterie interne."
        },
        {
            "label": "Temps de charge et décharge",
            "description": "Estime la durée nécessaire pour atteindre 100% ou le temps restant avant extinction."
        },
        {
            "label": "Historique de décharge",
            "description": "Suit la consommation d'énergie lors des tests d'affichage."
        }
    ],
    "canObserve": [
        "Pourcentage de batterie en temps réel",
        "Changements d'état de charge via les événements standards",
        "Secondes restantes estimées avant charge complète ou décharge",
        "Évolution du niveau de charge pendant la session active"
    ],
    "cannotMeasure": [
        "Capacité réelle en mAh sans logiciel de diagnostic constructeur",
        "Température interne, résistance ou nombre de cycles",
        "Métriques sur navigateurs restreignant l'API pour confidentialité"
    ],
    "interpretation": "Si l'API est indisponible, votre navigateur bloque cet accès pour protéger votre vie privée. Une chute rapide du pourcentage traduit une usure de la batterie.",
    "nextSteps": {
        "text": "Souhaitez-vous tester votre débit et votre latence réseau ?",
        "actionLabel": "Lancer le test de réseau",
        "actionHref": "/tests/network-speed-test"
    }
},

  "network-speed-test": {
    "overview": "Le test de vitesse et latence réseau mesure le ping RTT, la gigue, le type de connexion et le débit de téléchargement directement dans le navigateur.",
    "whatToLookFor": [
        {
            "label": "Latence Ping (RTT)",
            "description": "Mesure le temps d'aller-retour en millisecondes vers le serveur de test."
        },
        {
            "label": "Débit descendant (Mbps)",
            "description": "Calcule la bande passante maximale soutenue lors du téléchargement."
        },
        {
            "label": "Type de connexion",
            "description": "Détecte le type effectif (4G, Wi-Fi, Ethernet) et le débit théorique."
        },
        {
            "label": "Stabilité et gigue",
            "description": "Observe les variations de temps de réponse entre requêtes consécutives."
        }
    ],
    "canObserve": [
        "Temps d'aller-retour HTTP/HTTPS en millisecondes",
        "Classe de connexion effective via navigator.connection",
        "Débit descendant réel calculé en streaming de paquets",
        "Statut de l'économiseur de données du navigateur"
    ],
    "cannotMeasure": [
        "Latence TCP brute sans surcharge de la pile HTTP",
        "Atténuation physique du câble ou rapport signal/bruit optique",
        "Interférences radio Wi-Fi sur les fréquences locales"
    ],
    "interpretation": "Un ping inférieur à 30 ms est idéal pour le jeu vidéo en ligne et le streaming d'affichage distant. Plus de 50 Mbps assure une lecture 4K fluide.",
    "nextSteps": {
        "text": "Testez la latence de bout en bout entre votre clic et l'affichage.",
        "actionLabel": "Tester la latence d'entrée",
        "actionHref": "/tests/input-lag-test"
    }
},

  "color-blindness-test": {
    "overview": "Le simulateur de daltonisme utilise des matrices de couleurs SVG étalonnées pour reproduire 8 formes d'anomalies de la vision des couleurs, aidant à concevoir des interfaces accessibles.",
    "whatToLookFor": [
        {
            "label": "Protanopie & Protanomalie (Rouge)",
            "description": "Déficience des cônes L; les rouges apparaissent bruns ou gris foncé."
        },
        {
            "label": "Deutéranopie & Deutéranomalie (Vert)",
            "description": "Déficience des cônes M; les verts et rouges se confondent en teintes jaunâtres."
        },
        {
            "label": "Tritanopie & Tritanomalie (Bleu)",
            "description": "Déficience des cônes S; les bleus virent au vert et les jaunes au gris/violet."
        },
        {
            "label": "Achromatopsie (Vision monochrome)",
            "description": "Absence de cônes fonctionnels; perception uniquement en nuances de gris."
        }
    ],
    "canObserve": [
        "Simulation optique en temps réel d'interfaces, graphiques et textes",
        "Comparaison côte à côte entre vision normale et vision altérée",
        "Perte de contraste entre codes couleurs critiques (vert vs rouge)",
        "Lisibilité de la typographie sous chaque type de déficience"
    ],
    "cannotMeasure": [
        "Diagnostic médical clinique de la vision d'un utilisateur",
        "Sensibilité individuelle des photorécepteurs rétiniens",
        "Spectre d'émission physique du rétroéclairage sans spectroradiomètre"
    ],
    "interpretation": "Si des alertes ou boutons clés deviennent impossibles à distinguer en Deutéranopie, complétez la couleur par des pictogrammes et des bordures conformes WCAG 2.2.",
    "nextSteps": {
        "text": "Inspectez la couverture de l'espace colorimétrique sRGB et DCI-P3.",
        "actionLabel": "Vérifier le gamut couleur",
        "actionHref": "/tests/color-gamut-test"
    }
},

  "screen-recorder": {
    "overview": "L'enregistreur d'écran et outil de capture exploite les APIs Screen Capture et MediaRecorder pour enregistrer votre écran en WebM ou capturer des images PNG haute fidélité sans logiciel tiers.",
    "whatToLookFor": [
        {
            "label": "Résolution de flux vidéo",
            "description": "Vérifie que la définition capturée correspond à la résolution native de l'écran."
        },
        {
            "label": "Fréquence d'images",
            "description": "Surveille la fluidité et le temps d'enregistrement en direct."
        },
        {
            "label": "Capture audio système",
            "description": "Enregistre l'audio du système ou de l'onglet simultanément."
        },
        {
            "label": "Capture PNG sans perte",
            "description": "Exporte instantanément une capture d'image fixe en haute résolution."
        }
    ],
    "canObserve": [
        "Définition du flux, ratio d'aspect et fréquence d'images",
        "Durée d'enregistrement, états de pause et taille du fichier WebM",
        "Rendu d'image fixe sur Canvas pour téléchargement PNG",
        "Permissions d'accès à l'écran accordées au navigateur"
    ],
    "cannotMeasure": [
        "Latence matérielle de l'encodeur vidéo GPU du système",
        "Flux vidéo protégés par DRM (restitués en écran noir)",
        "Synchronisation de rafraîchissement au-delà des limites du navigateur"
    ],
    "interpretation": "Les enregistrements sont traités localement dans votre mémoire vive sans jamais transiter par des serveurs tiers pour une confidentialité absolue.",
    "nextSteps": {
        "text": "Souhaitez-vous tester votre webcam et sa résolution ?",
        "actionLabel": "Tester la webcam",
        "actionHref": "/tests/webcam-test"
    }
},

  "dark-mode-test": {
    "overview": "L'inspecteur de mode sombre et de thèmes vérifie la détection de prefers-color-scheme, la prise en charge de CSS color-scheme et le contraste des composants en modes clair et sombre.",
    "whatToLookFor": [
        {
            "label": "Synchronisation OS",
            "description": "Teste si le navigateur réagit aux bascules de thème de Windows, macOS, Android ou iOS."
        },
        {
            "label": "Support CSS color-scheme",
            "description": "Inspecte les barres de défilement et champs de formulaire natifs en mode sombre."
        },
        {
            "label": "Contraste des éléments",
            "description": "Évalue la lisibilité des textes et boutons sur les deux palettes."
        },
        {
            "label": "Noir absolu pour OLED",
            "description": "Vérifie l'utilisation du noir #000000 pour maximiser l'économie d'énergie sur écran OLED."
        }
    ],
    "canObserve": [
        "État en temps réel de prefers-color-scheme via matchMedia",
        "Prise en charge de la propriété native CSS color-scheme",
        "Basculement interactif entre Système, Clair et Sombre",
        "Lisibilité de la typographie sur surfaces sombres et claires"
    ],
    "cannotMeasure": [
        "Consommation électrique réelle de la dalle sans sonde matérielle",
        "Adaptation à la luminosité de la pièce sans capteur ambiant",
        "Altérations de teinte induites par les filtres anti-lumière bleue"
    ],
    "interpretation": "Les écrans OLED éteignent complètement leurs pixels sur fond noir pur, prolongeant l'autonomie et atténuant la fatigue visuelle nocturne.",
    "nextSteps": {
        "text": "Mesurez la luminosité ambiante de votre pièce pour ajuster l'écran.",
        "actionLabel": "Tester le capteur de lumière",
        "actionHref": "/tests/ambient-light-test"
    }
},

  "input-lag-test": {
    "overview": "Le visualiseur de latence d'entrée propose un banc d'essai statistique en 10 essais pour mesurer le délai entre le stimulus visuel et la détection du clic.",
    "whatToLookFor": [
        {
            "label": "Temps de réaction au stimulus",
            "description": "Mesure les millisecondes écoulées entre le passage au vert et le clic."
        },
        {
            "label": "Régularité statistique",
            "description": "Un faible écart-type (< 25 ms) démontre une grande constance."
        },
        {
            "label": "Détection des faux départs",
            "description": "Pénalise les clics anticipés survenus pendant la phase rouge."
        },
        {
            "label": "Histogramme de répartition",
            "description": "Affiche la dispersion des temps de réponse obtenus."
        }
    ],
    "canObserve": [
        "Horodatage haute précision avec performance.now()",
        "Métrique complète : moyenne, meilleur, pire temps et écart-type sur 10 essais",
        "Contrôle strict contre les clics anticipés",
        "Histogramme de distribution des latences"
    ],
    "cannotMeasure": [
        "Latence absolue clic-à-photon sans capteur optique externe (type LDAT)",
        "Polling USB brut indépendant des interruptions de l'OS",
        "Temps de réponse physique des cristaux liquides"
    ],
    "interpretation": "Un résultat combiné de 180 ms à 240 ms est représentatif d'une configuration gaming performante. Au-delà de 300 ms, activez le Mode Jeu sur votre moniteur.",
    "nextSteps": {
        "text": "Vérifiez la fréquence de rafraîchissement réelle de votre écran.",
        "actionLabel": "Tester le taux de rafraîchissement",
        "actionHref": "/tests/refresh-rate-test"
    }
},

  "ambient-light-test": {
    "overview": "L'inspecteur du capteur de lumière ambiante mesure l'éclairement en lux (lx) via l'API AmbientLightSensor et fournit des recommandations ergonomiques de luminosité.",
    "whatToLookFor": [
        {
            "label": "Éclairement en lux en temps réel",
            "description": "Surveille la lumière de la pièce captée par le capteur optique intégré."
        },
        {
            "label": "Recommandation ergonomique",
            "description": "Conseille le niveau de luminosité optimal pour vos yeux."
        },
        {
            "label": "Risque d'éblouissement",
            "description": "Signale si la lumière ambiante (> 1000 lx) nécessite un traitement anti-reflet."
        },
        {
            "label": "Stabilité de l'éclairage",
            "description": "Enregistre les fluctuations lumineuses au fil du temps."
        }
    ],
    "canObserve": [
        "Valeurs d'éclairement en lux en direct",
        "Catégorisation de la pièce (obscurité, tamisé, bureau, ensoleillé)",
        "Pourcentage de luminosité recommandé selon les normes ergonomiques",
        "Graphique d'historique de luminosité au cours du test"
    ],
    "cannotMeasure": [
        "Mesures sur navigateurs ne prenant pas en charge la Generic Sensor API",
        "Température de couleur (Kelvin) ou indice IRC des ampoules",
        "Vecteur d'incidence angulaire des reflets sur la dalle"
    ],
    "interpretation": "Pour un confort optimal, un bureau doit se situer entre 300 lx et 500 lx avec un écran réglé vers 120-150 nits. Sous 50 lx, baissez fortement la luminosité.",
    "nextSteps": {
        "text": "Ajustez la luminosité et le point de noir de votre écran.",
        "actionLabel": "Tester la luminosité",
        "actionHref": "/tests/brightness-test"
    }
},

  "dpi-calculator": {
    "overview": "Le calculateur DPI et PPI calcule la densité de pixels, le pas de masque (dot pitch), le nombre total de mégapixels et la distance de vision Retina à partir de la diagonale et de la résolution.",
    "whatToLookFor": [
        {
            "label": "Pixels par pouce (PPI)",
            "description": "Mesure la densité spatiale de pixels sur la diagonale de la dalle."
        },
        {
            "label": "Pas de masque (Dot Pitch)",
            "description": "Calcule la distance physique entre centres de sous-pixels en millimètres."
        },
        {
            "label": "Distance de vision Retina",
            "description": "Détermine la distance à laquelle l'œil humain ne discerne plus les pixels (60 PPD)."
        },
        {
            "label": "Format et mégapixels",
            "description": "Calcule la surface d'affichage, le ratio d'aspect et le total de pixels."
        }
    ],
    "canObserve": [
        "PPI calculé, pas de pixel en millimètres et total de mégapixels",
        "Distances de vision recommandées et seuil Retina en cm et pouces",
        "Préréglages pour écrans standards (24\" 1080p, 27\" 1440p, 32\" 4K)",
        "Curseurs interactifs pour ajuster résolution et diagonale"
    ],
    "cannotMeasure": [
        "Mesure physique des bordures du moniteur sans saisie",
        "Diffusion lumineuse causée par le traitement mat anti-reflet",
        "Déformations d'affichage non standards sans dimensions exactes"
    ],
    "interpretation": "Une densité supérieure à 110 PPI assure une typographie nette, tandis que plus de 220 PPI confère une netteté Retina à distance de travail usuelle (50 à 60 cm).",
    "nextSteps": {
        "text": "Vérifiez le rendu des sous-pixels et la netteté des polices.",
        "actionLabel": "Tester la clarté du texte",
        "actionHref": "/tests/text-clarity-test"
    }
},

  "subpixel-layout-test": {
    "overview": "Subpixel layout testing analyzes the microscopic physical geometry of red, green, and blue emitter strips within each pixel. Variations between standard RGB, inverted BGR, triangular QD-OLED, and WOLED layouts directly determine whether operating system text antialiasing (such as Windows ClearType) appears crisp or suffers from magenta/green color halos.",
    "whatToLookFor": [
        {
            "label": "Subpixel Geometry Structure",
            "description": "Identifies whether your panel uses standard RGB vertical stripes, BGR stripes, or non-standard triangular subpixels."
        },
        {
            "label": "High-Contrast Text Fringing",
            "description": "Inspects black-on-white and white-on-black text for colored halos (green on top, magenta below)."
        },
        {
            "label": "1px Grid Alignment",
            "description": "Verifies whether 1-pixel alternating lines render as completely neutral grey without color artifacts."
        },
        {
            "label": "ClearType Antialiasing Calibration",
            "description": "Evaluates whether running Windows cttune or font smoothing eliminates edge discoloration."
        }
    ],
    "canObserve": [
        "Color fringing artifacts rendered across high-contrast serif, sans-serif, and monospace fonts",
        "Subpixel alignment against calibrated 1-pixel alternating vertical and horizontal line gratings",
        "Visual simulation of subpixel emission structures across 6 major panel architectures"
    ],
    "cannotMeasure": [
        "Physical microscope optical verification of sub-millimeter silicon emitter geometry",
        "Direct registry settings of the host operating system's font rasterizer",
        "Hardware scaler subpixel interpolation inside external video capture cards"
    ],
    "interpretation": "If text shows faint green or magenta borders on a 1440p or 4K screen, your display likely features a BGR or QD-OLED subpixel layout. Running the Windows ClearType Tuner or switching to grayscale antialiasing will resolve the fringing.",
    "nextSteps": {
        "text": "Want to inspect overall display sharpness and resolution scaling?",
        "actionLabel": "Launch Text Clarity Test",
        "actionHref": "/tests/text-clarity-test"
    }
},

  "pwm-flicker-test": {
    "overview": "Pulse-Width Modulation (PWM) is a dimming technique used by certain LCD backlights and OLED panels that rapidly strobes the light source on and off to achieve lower brightness. While invisible to the naked eye at high frequencies, low-frequency PWM (120Hz–480Hz) causes severe eye strain, dry eyes, headaches, and migraines.",
    "whatToLookFor": [
        {
            "label": "Stroboscopic Phantom Beads",
            "description": "Moving your eyes or waving an object in front of the screen breaks moving lines into distinct phantom beads if PWM is present."
        },
        {
            "label": "Smartphone Shutter Scanlines",
            "description": "Using a phone camera at 1/1000s or faster reveals dark scrolling horizontal bands caused by duty-cycle modulation."
        },
        {
            "label": "Flicker-Free Brightness Threshold",
            "description": "Identifies at what monitor OSD brightness percentage the display switches from DC dimming to PWM."
        },
        {
            "label": "Duty Cycle Luminescence",
            "description": "Measures the optical ratio between ON duration and OFF duration during each dimming cycle."
        }
    ],
    "canObserve": [
        "Visual stroboscopic interference patterns generated by high-velocity scrolling gratings",
        "Optical interaction between user saccadic eye movements and panel refresh cycles",
        "Guidelines for smartphone camera verification of PWM frequency"
    ],
    "cannotMeasure": [
        "Exact physical pulse frequency in Hertz without an external photodiode oscilloscope probe",
        "Harmonic distortion index of the LED driver circuit",
        "Micro-voltage ripple on the backlight power rail"
    ],
    "interpretation": "Displays certified as 'Flicker-Free' or 'TÜV Eye Comfort' utilize continuous Direct Current (DC) dimming down to 0% brightness. If you see beaded ghosting trails, your panel uses PWM dimming at low brightness settings.",
    "nextSteps": {
        "text": "Want to test for high-frequency VRR luminance fluctuations?",
        "actionLabel": "Launch VRR Flicker Test",
        "actionHref": "/tests/vrr-flicker-test"
    }
},

  "dead-pixel-mapper": {
    "overview": "The Dead Pixel RMA Coordinate Mapper is an interactive inspection tool designed for documenting defective panel pixels. It allows buyers to pinpoint defective pixel coordinates, classify defects by type, calculate ISO 9241-307 warranty eligibility, and export formal RMA inspection logs for manufacturer replacement claims.",
    "whatToLookFor": [
        {
            "label": "Dead (Dark) Pixels",
            "description": "Permanently unpowered subpixel triads that remain pitch black against white, cyan, and yellow screens."
        },
        {
            "label": "Stuck (Bright) Subpixels",
            "description": "Subpixels locked in an open state, glowing red, green, blue, or white against pure black backgrounds."
        },
        {
            "label": "Defect Coordinates (X, Y)",
            "description": "Precise pixel address from the top-left origin to prove defect location to service technicians."
        },
        {
            "label": "ISO 9241-307 Class Thresholds",
            "description": "Automatic comparison against Class 1 (Zero-Defect) and Class 2 (Consumer Allowance) replacement limits."
        }
    ],
    "canObserve": [
        "Exact screen coordinates (X, Y) of logged defective points across 9 solid test backgrounds",
        "Calculation of central zone vs. peripheral zone defect clustering",
        "ISO 9241-307 Class 1 and Class 2 warranty return compliance"
    ],
    "cannotMeasure": [
        "Automatic algorithmic defect detection without manual user visual inspection",
        "Sub-surface glass dust vs. true TFT transistor failure without optical magnification",
        "Internal electrical continuity of the panel driver IC"
    ],
    "interpretation": "Most major monitor manufacturers (Dell, LG, ASUS, Samsung) adhere to ISO 9241-307 Class 2, which allows up to 2 full dead pixels or 5 stuck subpixels per million. Premium gaming and professional displays often feature Zero Bright Dot (Class 1) coverage.",
    "nextSteps": {
        "text": "Have stuck subpixels that remain lit? Try reviving them with our high-speed exerciser.",
        "actionLabel": "Launch Stuck Pixel Fixer",
        "actionHref": "/tests/stuck-pixel-fixer"
    }
},

  "gtg-response-time-test": {
    "overview": "Grey-to-Grey (GtG) response time measures the time required for a liquid crystal pixel to transition from one arbitrary intermediate grey level to another. While manufacturers advertise 1ms or 0.5ms GtG, real-world transitions vary significantly, and aggressive overdrive settings often cause severe inverse ghosting (overshoot).",
    "whatToLookFor": [
        {
            "label": "VA Panel Black Smearing",
            "description": "Inspects transitions from 0% pure black to 20% dark grey, where VA liquid crystals are slowest."
        },
        {
            "label": "Overdrive Overshoot (Coronas)",
            "description": "Checks for bright white or dark inverted halos trailing moving objects caused by excessive overdrive voltage."
        },
        {
            "label": "Leading vs Trailing Blur",
            "description": "Compares rise time (dark to light) against fall time (light to dark) across high-speed moving targets."
        },
        {
            "label": "Overdrive Mode Balancing",
            "description": "Guides selection of the optimal OSD overdrive tier (Off, Normal, Fast, Extreme)."
        }
    ],
    "canObserve": [
        "Visual ghosting trails across customizable start and end grey luminance values",
        "Simulation of overdrive corona overshoot across standard liquid crystal overdrive tiers",
        "Edge sharpness and clarity of moving objects across calibrated velocity levels"
    ],
    "cannotMeasure": [
        "Sub-millisecond photodiode oscilloscope transition curves (10% to 90% rise time)",
        "Internal overdrive voltage table lookup values inside the monitor scaler ASIC",
        "Temperature-dependent liquid crystal viscosity changes"
    ],
    "interpretation": "If moving objects show a bright halo or inverse silhouette, your monitor's OSD Overdrive is set too high ('Extreme'). Dialing back to 'Fast' or 'Normal' will deliver cleaner motion clarity without corona artifacts.",
    "nextSteps": {
        "text": "Want to benchmark moving UFO sharpness and persistence blur?",
        "actionLabel": "Launch Ghosting Test",
        "actionHref": "/tests/ghosting-test"
    }
},

  "oled-burn-in-calculator": {
    "overview": "The OLED Burn-in Risk & Longevity Calculator models organic light-emitting diode subpixel degradation based on panel technology generation, daily operating hours, static interface content ratios, and typical SDR/HDR luminance levels. It provides an actuarial forecast of panel lifespan and static HUD hazard hotspots.",
    "whatToLookFor": [
        {
            "label": "Panel Generation Resilience",
            "description": "Accounts for differences between first-gen QD-OLED, modern Gen 3 QD-OLED, and WOLED MLA micro-lens arrays."
        },
        {
            "label": "Static Content Ratio",
            "description": "Calculates cumulative static stress from Windows taskbars, browser headers, and gaming HUDs."
        },
        {
            "label": "Luminance Stress Multiplier",
            "description": "Models the exponential acceleration of organic material aging at high sustained nits."
        },
        {
            "label": "Mitigation Habits Impact",
            "description": "Evaluates the protective value of pixel shift, auto-hide taskbar, logo dimmers, and screen timeouts."
        }
    ],
    "canObserve": [
        "Actuarial estimation of cumulative static hours before uneven subpixel aging occurs",
        "Projected burn-in probability percentages across 1-year, 3-year, and 5-year ownership horizons",
        "Hazard heatmap visualization of high-risk static interface regions"
    ],
    "cannotMeasure": [
        "Real-time physical subpixel voltage degradation on your specific physical panel",
        "Ambient room operating temperature and chassis heatsink thermal dissipation efficiency",
        "Internal factory compensation cycle log data stored in panel EEPROM"
    ],
    "interpretation": "Modern OLED monitors with active pixel shift, thermal heatsinks, and auto-hide taskbars typically achieve 5+ years of daily mixed productivity and gaming without visible retention. High sustained SDR brightness on static white backgrounds accelerates aging.",
    "nextSteps": {
        "text": "Want to inspect your current panel for existing static image retention?",
        "actionLabel": "Launch Burn-In Test",
        "actionHref": "/tests/burn-in-test"
    }
},

  "mouse-polling-test": {
    "overview": "The Mouse Polling Rate & Sensor Precision test captures USB hardware event timestamps via high-precision browser timers. It measures real-time and peak polling frequency in Hertz (up to 8000Hz), checks packet interval stability (jitter), tests button actuation, and diagnoses mechanical switch double-click bouncing.",
    "whatToLookFor": [
        {
            "label": "Real-Time Polling Rate (Hz)",
            "description": "Measures actual USB event report frequency (125Hz, 500Hz, 1000Hz, 4000Hz, 8000Hz)."
        },
        {
            "label": "Interval Jitter & Stability",
            "description": "Checks consistency of delta times between movement packets (e.g. 1.0ms for 1000Hz, 0.25ms for 4000Hz)."
        },
        {
            "label": "Mechanical Double-Click Chatter",
            "description": "Detects switch bounce intervals under 60ms indicating worn mechanical microswitches."
        },
        {
            "label": "DPI Sensor Calibration",
            "description": "Verifies physical drag distance in inches against registered screen pixel movement."
        }
    ],
    "canObserve": [
        "USB mouse movement event frequency reported via performance.now() high-resolution timestamps",
        "Peak, average, and real-time polling rates across continuous motion sessions",
        "Multi-button click actuation counts and millisecond inter-click intervals"
    ],
    "cannotMeasure": [
        "Hardware USB bus polling rate when the mouse is stationary (optical sensors only report on movement)",
        "Sensor lift-off distance (LOD) in physical millimeters",
        "Direct MCU firmware polling rate when browser event loops are throttled by heavy background tasks"
    ],
    "interpretation": "A gaming mouse set to 1000Hz should sustain 950Hz–1000Hz during rapid movement with ~1.0ms interval deltas. If click intervals under 50ms register from single physical depressions, your mouse switch suffers from contact chatter.",
    "nextSteps": {
        "text": "Want to test your visual reaction speed and click latency?",
        "actionLabel": "Launch Reaction Time Test",
        "actionHref": "/tests/reaction-time-test"
    }
},

  "gpu-benchmark-test": {
    "overview": "The GPU WebGL 3D Stress & Performance Benchmark renders complex real-time 3D particle systems and rotating geometries directly in your browser. It measures sustained frame rate, 1% low FPS, frame time variance, and hardware capabilities to identify GPU bottlenecks and thermal throttling under load.",
    "whatToLookFor": [
        {
            "label": "Sustained FPS vs Display Hz",
            "description": "Evaluates whether your GPU can consistently match your monitor's native refresh rate."
        },
        {
            "label": "1% Low FPS Stutter",
            "description": "Tracks the bottom 1% of frame times to detect micro-stutters and background asset hitches."
        },
        {
            "label": "Frame Time Variance (ms)",
            "description": "Monitors frame pacing consistency (16.6ms for 60Hz, 6.9ms for 144Hz, 4.1ms for 240Hz)."
        },
        {
            "label": "Thermal Throttling Drop",
            "description": "Identifies whether frame rates degrade over the course of a 30-second sustained benchmark."
        }
    ],
    "canObserve": [
        "Client-side WebGL 3D rendering throughput across 10,000 to 200,000 active particles",
        "Real-time frame rate, average FPS, 1% low frame rates, and millisecond frame pacing",
        "Detected WebGL graphics renderer string, GPU vendor, and maximum texture dimensions"
    ],
    "cannotMeasure": [
        "Physical GPU core temperature (°C) or fan RPM without native operating system telemetry utilities",
        "GPU board power draw in Watts (TDP)",
        "VRAM memory clock frequency or memory junction temperatures"
    ],
    "interpretation": "High average FPS with low 1% low FPS indicates frame pacing stutter or background CPU thread contention. Smooth frame pacing ensures responsive, tear-free motion on high-refresh gaming displays.",
    "nextSteps": {
        "text": "Want to inspect your monitor's real-time refresh rate pacing?",
        "actionLabel": "Launch Refresh Rate Test",
        "actionHref": "/tests/refresh-rate-test"
    }
},

  "display-certificate": {
    "overview": "The Display Inspection Certificate is a formal quality documentation tool. It aggregates automatically detected hardware parameters (native resolution, color depth, wide gamut, pixel density) with manual visual inspection ratings to generate a printable, certified inspection report for resale grading or manufacturer RMA warranty claims.",
    "whatToLookFor": [
        {
            "label": "Hardware Specification Log",
            "description": "Certifies native panel resolution, color bit-depth, device pixel ratio, and wide color gamut support."
        },
        {
            "label": "Defect Audit Summary",
            "description": "Records exact counts of dead pixels, stuck subpixels, and backlight bleed severity."
        },
        {
            "label": "ISO 9241-307 Compliance",
            "description": "Documents whether the panel meets Class 1 (Zero Bright Dot) or Class 2 consumer replacement criteria."
        },
        {
            "label": "Print-Ready Verification Layout",
            "description": "Formats all data into a clean, watermark-certified certificate optimized for PDF export and printing."
        }
    ],
    "canObserve": [
        "Compilation of system-reported display parameters and user-verified quality grades",
        "Generation of unique cryptographic verification IDs and inspection timestamps",
        "Print-optimized document layout hiding navigation and interactive UI controls"
    ],
    "cannotMeasure": [
        "Automated physical panel serial number readout from internal EDID firmware (requires manual entry)",
        "Legal underwriting of manufacturer warranty claims outside official manufacturer service centers",
        "Spectroradiometer color accuracy Delta E verification without external hardware colorimeters"
    ],
    "interpretation": "Display inspection certificates provide trusted documentation when buying or selling used monitors or submitting RMA return claims during manufacturer return windows.",
    "nextSteps": {
        "text": "Need to pinpoint defective pixel coordinates before generating your certificate?",
        "actionLabel": "Launch Dead Pixel Mapper",
        "actionHref": "/tools/dead-pixel-mapper"
    }
},

  "osd-calibration-guide": {
    "overview": "The Interactive OSD Monitor Calibration Assistant is a visual guide for calibrating your display's physical On-Screen Display (OSD) hardware buttons. It walks users through 6 essential steps—Brightness, Contrast, Gamma 2.2, 6500K Color Temperature, Sharpness, and Overdrive—without requiring expensive hardware colorimeters.",
    "whatToLookFor": [
        {
            "label": "Brightness (Black Clipping)",
            "description": "Tunes OSD Brightness so patch #16 is faintly visible while patch #0 remains inky black."
        },
        {
            "label": "Contrast (White Saturation)",
            "description": "Adjusts OSD Contrast so near-white patch #253 remains distinguishable from pure white #255."
        },
        {
            "label": "Gamma 2.2 Optical Blend",
            "description": "Aligns midtone luminance using an optical pattern where the center disc blends at 2.2."
        },
        {
            "label": "Color Temperature (6500K D65)",
            "description": "Balances Red, Green, and Blue gain sliders to achieve clean, neutral white and grey tones."
        }
    ],
    "canObserve": [
        "Visual feedback targets designed specifically for standard monitor OSD adjustment ranges",
        "Optical blend checkerboards verifying sRGB Gamma 2.2 alignment without calibration probes",
        "High-contrast text and moving block targets for tuning sharpness and overdrive tiers"
    ],
    "cannotMeasure": [
        "Direct software control over physical monitor OSD buttons via DDC/CI protocol",
        "Exact color temperature in Kelvin without a spectrophotometer or colorimeter hardware probe",
        "Hardware LUT (Look-Up Table) internal calibration inside professional color-grading monitors"
    ],
    "interpretation": "Factory default monitor settings are almost always oversaturated, overly bright (100%), and too cool (8000K+). Following this 6-step OSD tuning guide brings your display significantly closer to international sRGB/Rec.709 mastering standards.",
    "nextSteps": {
        "text": "Want to verify color gamut coverage and ColorChecker accuracy?",
        "actionLabel": "Launch Color Accuracy Test",
        "actionHref": "/tests/color-accuracy-test"
    }
},

};

