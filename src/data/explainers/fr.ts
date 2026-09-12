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

  "hdr-test": {
    overview: "Les écrans HDR offrent des pics de luminosité élevés et un espace colorimétrique étendu. Ce test vérifie la prise en charge HDR dans le navigateur et permet d'évaluer le tone mapping et le comportement en hautes lumières.",
    whatToLookFor: [
      {
        label: "Détection HDR dans le navigateur",
        description: "Assurez-vous que '(dynamic-range: high)' est signalé comme actif. Sinon, activez le HDR dans les réglages système."
      },
      {
        label: "Maintien des détails dans les blancs extrêmes",
        description: "Sur les cartes à 90%, 94%, 97% et 99% de blanc, les symboles intérieurs doivent rester discernables du fond."
      },
      {
        label: "Écrêtage des hautes lumières (Clipping)",
        description: "Si les pavés de 94% à 100% se confondent en une seule tache blanche uniforme, l'écran écrête au lieu de mapper les nuances."
      },
      {
        label: "Étendue de l'espace colorimétrique",
        description: "Observez si les nuances saturées se distinguent avec plus d'éclat que sur des contenus SDR classiques."
      }
    ],
    canObserve: [
      "Statut de l'environnement de navigation concernant le HDR et la profondeur de couleur",
      "Séparation visuelle des nuances claires jusqu'au blanc de pointe",
      "Lisibilité des détails d'ombre sur des mires de test HDR"
    ],
    cannotMeasure: [
      "Luminance maximale absolue en cd/m² (nits) sans équipement de laboratoire",
      "Niveau de certification officiel VESA DisplayHDR (ex. DisplayHDR 400 vs 1000)",
      "Suivi rigoureux de la courbe électro-optique PQ (ST 2084 EOTF)"
    ],
    interpretation: "De nombreux écrans vendus comme 'HDR400' n'ont pas de rétroéclairage local (local dimming) et ne dépassent pas la luminosité SDR, ce qui peut donner une image délavée une fois le HDR activé.",
    nextSteps: {
      text: "L'image HDR paraît sombre ou brûlée ? Consultez nos recommandations de configuration.",
      actionLabel: "Dépannage HDR",
      actionHref: "/knowledge-base/troubleshooting#hdr-not-working"
    }
  },

  "resolution-checker": {
    overview: "Les systèmes d'exploitation appliquent une mise à l'échelle pour conserver des interfaces lisibles sur les écrans haute densité, ce qui crée un décalage entre pixels logiques CSS et pixels physiques de la dalle. Cet outil contrôle résolutions, DPR et surface utile.",
    whatToLookFor: [
      {
        label: "Résolution native vs logique",
        description: "Un écran 4K à 150% d'échelle affiche 2560×1440 pixels CSS avec un DPR de 1,5, soit 3840×2160 pixels physiques réels."
      },
      {
        label: "Ratio de pixels de l'appareil (DPR)",
        description: "Le coefficient multiplicateur entre pixels CSS et points physiques (ex. 1,0 = 100%, 1,25 = 125%, 2,0 = 200%)."
      },
      {
        label: "Espace de bureau disponible",
        description: "Screen.availWidth et availHeight indiquent la surface utile après déduction de la barre des tâches ou du dock."
      },
      {
        label: "Fenêtre vs écran complet",
        description: "Window.innerWidth/innerHeight affiche la taille de la fenêtre active, distincte de la définition totale du moniteur."
      }
    ],
    canObserve: [
      "Dimensions d'écran rapportées par le navigateur (screen.width, screen.height, availWidth/Height)",
      "Facteur d'échelle (devicePixelRatio) et résolution de rendu physique calculée",
      "Dimensions du viewport CSS et orientation de l'affichage"
    ],
    cannotMeasure: [
      "Matrice physique réelle si la carte graphique ou un boîtier externe réduit le signal",
      "Définition d'entrée altérée par une carte d'acquisition vidéo ou un téléviseur",
      "Rapports de pixels non carrés forcés matériellement par l'écran"
    ],
    interpretation: "Si la résolution affichée ne correspond pas à la fiche technique de votre écran, vérifiez l'échelle dans les paramètres d'affichage de Windows ; revenir à 100% rétablit la lecture 1:1.",
    nextSteps: {
      text: "Comparez résolutions, diagonales et densités de pixels (PPI) avec notre outil dédié.",
      actionLabel: "Comparer Écrans & Calculer PPI",
      actionHref: "/tests/compare-displays"
    }
  },

  "display-info": {
    overview: "Le navigateur expose des informations sur l'écran actif, la taille de la fenêtre, la profondeur de couleur et les fonctionnalités tactiles. Ce tableau de bord regroupe tous les paramètres disponibles.",
    whatToLookFor: [
      {
        label: "Profondeur de couleur signalée",
        description: "Screen.colorDepth renseigne sur les bits par canal (habituellement 24 bits pour du 8 bits RGB ou 30 bits pour du 10 bits)."
      },
      {
        label: "Prise en charge tactile",
        description: "Navigator.maxTouchPoints indique si le navigateur détecte un numériseur tactile actif sur l'appareil."
      },
      {
        label: "Restrictions multi-écrans",
        description: "Pour des raisons de sécurité, le navigateur ne peut pas lire les numéros de série ou modèles sans permissions explicites."
      },
      {
        label: "Cadence d'animation en temps réel",
        description: "La télémétrie de l'horloge d'animation donne une estimation en temps réel du rythme de rendu dans l'onglet."
      }
    ],
    canObserve: [
      "Paramètres standard DOM de Screen, Window, Navigator et Media Queries",
      "Ratio de pixels de l'appareil, profondeur de couleur et orientation",
      "Fonctionnalités des pointeurs et prise en charge des contacts tactiles"
    ],
    cannotMeasure: [
      "Numéro de série ou nom de modèle EDID de l'écran sans autorisation spéciale",
      "Bande passante physique des liaisons par câble HDMI ou DisplayPort",
      "Taux de rafraîchissement matériel de la dalle indépendamment du système"
    ],
    interpretation: "Les applications web tournent dans un bac à sable sécurisé. Les données affichées reflètent ce que le système d'exploitation et le gestionnaire de fenêtres transmettent au navigateur.",
    nextSteps: {
      text: "Vous souhaitez vérifier la géométrie et les proportions de votre écran ? Lancez le test de mise à l'échelle.",
      actionLabel: "Tester Échelle & Format d'Image",
      actionHref: "/tests/scaling-aspect-test"
    }
  },

  "scaling-aspect-test": {
    overview: "Un mauvais réglage de format d'image déforme les cercles en ovales et floute les textes. Ce test projette des géométries de référence (cercles et carrés) ainsi que des guides de format (16:9, 16:10, 21:9, 4:3) pour garantir un affichage 1:1 à pixels parfaitement carrés.",
    whatToLookFor: [
      {
        label: "Circularité géométrique",
        description: "Vérifiez que le cercle central est parfaitement rond. S'il paraît aplati ou étiré, le format d'image est déformé."
      },
      {
        label: "Pixels carrés (1:1)",
        description: "Contrôlez le damier : chaque carré doit avoir rigoureusement la même largeur et la même hauteur."
      },
      {
        label: "Alignement avec les cadres de format",
        description: "Vérifiez si votre zone d'affichage coïncide avec les repères 16:9 (panoramique), 16:10 ou 21:9 (ultralarge)."
      },
      {
        label: "Mode de mise à l'échelle GPU",
        description: "Si des barres noires apparaissent sur une définition native, vérifiez les options de mise à l'échelle dans le panneau GPU."
      }
    ],
    canObserve: [
      "Géométrie visuelle des cercles et quadrillages dans la fenêtre du navigateur",
      "Concordance avec les gabarits de référence 16:9, 16:10, 21:9 et 4:3",
      "Calcul de la proportion de la zone d'affichage active"
    ],
    cannotMeasure: [
      "Mesure millimétrique du cadre physique du moniteur",
      "Déformations optiques anamorphiques causées par l'optique d'un projecteur",
      "Modes de format d'image imposés matériellement par des processeurs vidéo externes"
    ],
    interpretation: "Les distorsions surviennent souvent lorsqu'on choisit une résolution non native sans activer l'option 'Conserver le format d'image' dans les pilotes NVIDIA, AMD ou Intel.",
    nextSteps: {
      text: "Vous utilisez un téléviseur relié à votre PC ? Vérifiez l'absence de rognage avec le test d'overscan.",
      actionLabel: "Tester l'Overscan TV",
      actionHref: "/tests/tv-overscan-test"
    }
  },

  "compare-displays": {
    overview: "La diagonale, la résolution et la densité de pixels (PPI) définissent l'espace de travail et la netteté. Cet outil calcule dimensions physiques, total de pixels et densités pour comparer deux moniteurs côte à côte.",
    whatToLookFor: [
      {
        label: "Densité de pixels (PPI)",
        description: "Plus le PPI est élevé, plus les textes sont nets. ~110 PPI est la norme bureautique ; ~220 PPI correspond au niveau Retina."
      },
      {
        label: "Largeur et hauteur physiques",
        description: "Comparez la surface réelle : un écran 16:9 de 27 pouces est nettement plus haut qu'un écran 21:9 de 29 pouces."
      },
      {
        label: "Nombre total de pixels",
        description: "Un écran 4K (8,29 millions de pixels) propose quatre fois plus de pixels qu'un écran Full HD 1080p classique (2,07 millions)."
      },
      {
        label: "Distance de recul idéale",
        description: "Un PPI élevé permet d'être plus proche de l'écran sans distinguer la grille physique des pixels (effet de grille)."
      }
    ],
    canObserve: [
      "Calcul mathématique des PPI, formats et surfaces selon les données saisies",
      "Comparaison visuelle proportionnelle de la taille relative entre deux écrans",
      "Calcul du pas de masque (Dot Pitch en millimètres)"
    ],
    cannotMeasure: [
      "Lecture automatique de la diagonale d'un écran sans saisie utilisateur",
      "Mesure optique de la surface du panneau via les API du navigateur",
      "Épaisseur des bordures ou encombrement du pied du moniteur"
    ],
    interpretation: "La densité de pixels est calculée selon le théorème de Pythagore en divisant la résolution diagonale par la diagonale en pouces. Cette mesure nécessitant la taille physique, la saisie utilisateur est obligatoire.",
    nextSteps: {
      text: "Découvrez comment la densité de pixels influence directement la netteté du texte selon votre système.",
      actionLabel: "Guide de Clarté du Texte",
      actionHref: "/knowledge-base/text-clarity-and-subpixel-rendering"
    }
  },

  "tv-overscan-test": {
    overview: "L'overscan est un héritage des téléviseurs cathodiques qui zoome et rogne de 2% à 5% les bordures de l'image. Sur un PC ou une console, il masque la barre des tâches et rend le texte flou en supprimant le mappage pixel 1:1.",
    whatToLookFor: [
      {
        label: "Visibilité du cadre à 0%",
        description: "Si vous ne voyez pas la bordure blanche extérieure ni les flèches marquées '0%', votre téléviseur rogne l'image par overscan."
      },
      {
        label: "Repères de pourcentage de rognage",
        description: "Vérifiez quelle ligne correspond au cadre de votre téléviseur (2,5% ou 5%) pour évaluer la part de bureau tronquée."
      },
      {
        label: "Mires d'alignement aux quatre coins",
        description: "Les réticules d'angle doivent s'arrêter exactement au ras du cadre physique de votre téléviseur."
      },
      {
        label: "Netteté du motif de contrôle 1:1",
        description: "Examinez le damier de 1 pixel : s'il scintille ou paraît flou, le téléviseur rééchantillonne et interpole l'image."
      }
    ],
    canObserve: [
      "Visibilité des bordures et des repères de rognage (0%, 2,5%, 5%) sur le périmètre",
      "Intégrité de la mire de 1 pixel pour détecter les flous d'interpolation",
      "Contrôle visuel avant et après ajustement des réglages de format de l'écran"
    ],
    cannotMeasure: [
      "Accès aux menus de configuration internes du téléviseur via le navigateur",
      "Détection automatique du format d'affichage actif par HDMI-CEC",
      "Recouvrement physique du cadre par rapport au rognage électronique du signal"
    ],
    interpretation: "Pour obtenir un affichage net et retrouver l'intégralité du bureau, réglez le format d'image du téléviseur sur 'Point par point', 'Scan uniquement', 'Adapter à l'écran', '1:1 Pixel' ou 'Plein'.",
    nextSteps: {
      text: "Besoin d'aide pour régler le mappage 1:1 sur TV Samsung, LG, Sony ou Philips ?",
      actionLabel: "Lire le Guide Overscan TV & Mappage 1:1",
      actionHref: "/knowledge-base/tv-overscan-and-pixel-mapping"
    }
  },

  "multi-touch-test": {
    overview: "Ce test enregistre les contacts simultanés sur écrans tactiles, tablettes et dalles interactives. Il affiche les coordonnées, dénombre les points de contact actifs et confirme la bonne transmission des gestes multi-doigts au navigateur.",
    whatToLookFor: [
      {
        label: "Nombre de contacts simultanés",
        description: "Posez plusieurs doigts en même temps sur l'écran. Vérifiez si le compteur affiche bien 2, 5 ou 10 points de contact distincts."
      },
      {
        label: "Fluidité du suivi des doigts",
        description: "Faites glisser plusieurs doigts sur la dalle pour vérifier que les trajectoires ne subissent pas de coupures."
      },
      {
        label: "Interférence des gestes système",
        description: "Vérifiez si poser 3 ou 4 doigts déclenche des raccourcis système (changement d'application) au lieu d'être pris en compte dans le test."
      },
      {
        label: "Rejet de la paume (Palm Rejection)",
        description: "Posez le bas de la paume sur l'écran tout en touchant avec les doigts pour observer le filtrage des zones larges."
      }
    ],
    canObserve: [
      "Événements tactiles et de pointeur transmis en temps réel à la fenêtre du navigateur",
      "Coordonnées, identifiants et total de points de contact simultanés",
      "Propriété navigator.maxTouchPoints exposée par le navigateur"
    ],
    cannotMeasure: [
      "Fréquence d'échantillonnage physique du numériseur en Hertz (ex. 120Hz vs 240Hz)",
      "Niveaux de pression capacitive sans API matérielle dédiée",
      "Défauts microscopiques du maillage d'électrodes non rapportés par le pilote"
    ],
    interpretation: "Le nombre de contacts simultanés dépend du numériseur matériel de l'écran et des restrictions des pilotes du système d'exploitation.",
    nextSteps: {
      text: "Vous souhaitez vérifier les zones mortes et la continuité du tracé sur toute la surface ?",
      actionLabel: "Tester la Surface Tactile",
      actionHref: "/tests/touch-screen-test"
    }
  },

  "webcam-test": {
    overview: "Contrôle votre caméra directement via l'interface WebRTC du navigateur (getUserMedia). Il permet de vérifier la qualité d'image, de contrôler les définitions prises en charge (720p, 1080p, 4K) et de résoudre les problèmes de permissions en local.",
    whatToLookFor: [
      {
        label: "Définition du flux vidéo",
        description: "Vérifiez que la résolution affichée correspond bien aux caractéristiques annoncées de la webcam (ex. 1920×1080 Full HD)."
      },
      {
        label: "Stabilité de la fréquence d'images (FPS)",
        description: "Surveillez le compteur de FPS. En basse lumière, de nombreux capteurs descendent à 15-20 FPS pour prolonger l'exposition."
      },
      {
        label: "Équilibre des couleurs et exposition",
        description: "Observez les risques de surexposition sur les visages, la balance des blancs sous éclairage artificiel et le bruit dans les ombres."
      },
      {
        label: "Gestion des autorisations de la caméra",
        description: "Vérifiez que le navigateur demande et mémorise correctement les autorisations sans conflit avec d'autres logiciels."
      }
    ],
    canObserve: [
      "Flux vidéo en direct traité de manière strictement locale au sein de votre onglet",
      "Définition de piste négociée (largeur, hauteur) et fréquence d'images du flux",
      "Noms de périphériques et énumération via l'interface MediaDeviceInfo"
    ],
    cannotMeasure: [
      "Résolution optique native du capteur indépendamment du pilote système",
      "Aberrations chromatiques ou distorsions géométriques de l'objectif",
      "Sensibilité optique étalonnée en lux sous différents éclairages"
    ],
    interpretation: "Les flux vidéo sont régis par les pilotes de votre système d'exploitation. Si les hautes définitions sont indisponibles, vérifiez la bande passante USB ou les commutateurs de confidentialité.",
    nextSteps: {
      text: "La caméra n'est pas détectée ou les autorisations sont bloquées ? Consultez notre guide d'aide.",
      actionLabel: "Dépannage de la Webcam",
      actionHref: "/knowledge-base/troubleshooting#webcam-access-denied"
    }
  },

  "speaker-test": {
    overview: "Exploite la Web Audio API pour vérifier vos haut-parleurs, écouteurs et casques. Permet de contrôler la séparation stéréo (Gauche, Droite, Les deux) et d'effectuer des balayages en fréquence (20Hz à 20 000Hz) pour déceler distorsions et vibrations.",
    whatToLookFor: [
      {
        label: "Séparation des canaux stéréo",
        description: "Lors de la lecture du canal gauche, le son doit provenir exclusivement de l'enceinte ou de l'oreillette gauche."
      },
      {
        label: "Restitution des basses profondes (20Hz–100Hz)",
        description: "Écoutez les fréquences sub-basses. Les haut-parleurs d'ordinateurs portables coupent souvent sous 80–100Hz."
      },
      {
        label: "Limite des hautes fréquences (10kHz–20kHz)",
        description: "Notez la fréquence à partir de laquelle le signal devient inaudible, liée aux limites du transducteur ou de votre ouïe."
      },
      {
        label: "Vibrations du châssis ou du bureau",
        description: "Les fréquences bas-médiums (100Hz–300Hz) font souvent entrer en résonance les objets du bureau ou le boîtier des enceintes."
      }
    ],
    canObserve: [
      "Génération sonore synthétisée et panoramique stéréo sur les canaux gauche, droit et centre",
      "Balayage continu sur l'ensemble du spectre audible humain (20Hz à 20 000Hz)",
      "Fréquence d'échantillonnage de l'AudioContext et capacités de sortie Web Audio"
    ],
    cannotMeasure: [
      "Niveau de pression acoustique réel (SPL en décibels, dB) sans micro de mesure étalonné",
      "Taux de distorsion harmonique totale (THD) ou impédance électrique des haut-parleurs",
      "Courbes acoustiques de réponse en fréquence de la pièce d'écoute"
    ],
    interpretation: "Le test stéréo confirme que la sortie audio n'est pas convertie par erreur en mono. Les balayages aident à détecter les membranes fatiguées ou les bruits parasites de châssis.",
    nextSteps: {
      text: "Pas de son ou canaux inversés ? Suivez notre guide de résolution des problèmes audio.",
      actionLabel: "Dépannage Haut-Parleurs",
      actionHref: "/knowledge-base/troubleshooting#speaker-no-sound"
    }
  }
};
