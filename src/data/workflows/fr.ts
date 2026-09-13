import { InspectionWorkflow } from "./types";

export const FR_INSPECTION_WORKFLOWS: InspectionWorkflow[] = [
  {
    "id": "general",
    "route": "/monitor-inspection/general",
    "title": "Vérification générale de l'écran",
    "shortDescription": "Vérification visuelle complète et essentielle pour tout écran.",
    "longDescription": "Une séquence diagnostique équilibrée et essentielle conçue pour examiner tout moniteur de bureau, écran de PC portable ou écran externe afin de détecter pixels morts, fidélité des couleurs, luminosité, contraste, uniformité et taux de rafraîchissement.",
    "inspectionTip": "Réglez votre écran sur sa résolution native et son échelle recommandée avant de commencer la vérification.",
    "browserLimitations": "Les tests sur navigateur évaluent des motifs générés côté client et ne peuvent inspecter la stabilité des alimentations internes ni les ports vidéo physiques.",
    "sequence": [
      "/tests/resolution-checker",
      "/tests/dead-pixel-test",
      "/tests/uniformity-test",
      "/tests/near-black-test",
      "/tests/gradient-banding-test",
      "/tests/text-clarity-test",
      "/tests/scaling-aspect-test",
      "/tests/ghosting-test",
      "/tests/refresh-rate-test"
    ],
    "steps": [
      {
        "title": "Résolution & infos d'affichage",
        "description": "Vérifiez la résolution native, l'échelle DPR et les paramètres d'affichage."
      },
      {
        "title": "Localisateur de pixels morts",
        "description": "Parcourez des fonds de couleurs pures pour repérer les sous-pixels morts ou bloqués."
      },
      {
        "title": "Uniformité de l'écran",
        "description": "Inspectez les gris neutres et aplats solides pour détecter effets de nuages ou vignettage."
      },
      {
        "title": "Détails dans les ombres (Near-Black)",
        "description": "Vérifiez la séparation des tons sombres et le détail dans les ombres près du noir absolu."
      },
      {
        "title": "Dégradés & banding",
        "description": "Examinez les transitions du noir au blanc sans bandes de quantification marquées."
      },
      {
        "title": "Netteté du texte & sous-pixels",
        "description": "Évaluez l'anticrénelage des polices et la netteté des arêtes de sous-pixels à plusieurs tailles."
      },
      {
        "title": "Mise à l'échelle & géométrie",
        "description": "Contrôlez les cercles et quadrillages géométriques contre tout étirement ou écrasement."
      },
      {
        "title": "Ghosting & traînées de mouvement",
        "description": "Observez des blocs contrastés en mouvement pour évaluer le temps de réponse des pixels."
      },
      {
        "title": "Taux de rafraîchissement & synchronisation",
        "description": "Comparez la cadence d'animation du navigateur avec le taux de rafraîchissement de la dalle."
      }
    ]
  },
  {
    "id": "used",
    "route": "/monitor-inspection/used",
    "title": "Inspection d'écran d'occasion",
    "shortDescription": "Inspection ciblée en 10 tests avec notes et génération de rapport, optimisée avant l'achat.",
    "longDescription": "Un protocole d'inspection rigoureux préalable à l'achat, spécialement conçu pour évaluer les moniteurs d'occasion ou reconditionnés. Couvre systématiquement les paramètres matériels, défauts de pixels, vieillissement du rétroéclairage et enregistre les observations dans un rapport.",
    "inspectionTip": "Réglez la luminosité à 100% lors de l'examen d'un écran d'occasion pour mettre en évidence les marquages résiduels, l'usure inégale des LED et les déformations du cadre.",
    "browserLimitations": "Le nombre total d'heures de fonctionnement et les sondes thermiques internes nécessitent d'accéder au menu d'entretien d'usine de l'écran via les boutons du châssis.",
    "sequence": [
      "/tests/display-info",
      "/tests/resolution-checker",
      "/tests/dead-pixel-test",
      "/tests/stuck-pixel-test",
      "/tests/color-test",
      "/tests/brightness-test",
      "/tests/uniformity-test",
      "/tests/backlight-bleed-test",
      "/tests/ghosting-test",
      "/tests/refresh-rate-test"
    ],
    "steps": [
      {
        "title": "1. Informations sur l'écran",
        "description": "Interrogez les paramètres de la dalle, la profondeur de couleur et les fonctionnalités GPU."
      },
      {
        "title": "2. Résolution & géométrie",
        "description": "Vérifiez la résolution native, le facteur d'échelle (DPR) et le champ d'affichage."
      },
      {
        "title": "3. Pixels morts",
        "description": "Balayez les fonds blancs et primaires à la recherche de sous-pixels noirs inactifs."
      },
      {
        "title": "4. Pixels bloqués",
        "description": "Inspectez les fonds sombres pour repérer les sous-pixels continuellement allumés."
      },
      {
        "title": "5. Restitution des couleurs",
        "description": "Vérifiez les primaires RVB et secondaires CMJ contre toute dérive ou décoloration."
      },
      {
        "title": "6. Luminosité & ombres",
        "description": "Confirmez que le rétroéclairage délivre une luminance suffisante sans écraser les ombres."
      },
      {
        "title": "7. Uniformité de l'écran",
        "description": "Contrôlez les gris à 25%, 50% et 75% contre le jaunissement ou le vignettage."
      },
      {
        "title": "8. Fuites de lumière & pression du cadre",
        "description": "Dans le noir, examinez les tensions de cadre et les fuites lumineuses sur les bords."
      },
      {
        "title": "9. Ghosting & réactivité",
        "description": "Évaluez les traînées de rémanence des pixels et l'overdrive en mouvement."
      },
      {
        "title": "10. Stabilité du rafraîchissement",
        "description": "Confirmez que la dalle fonctionne à sa fréquence nominale sans micro-saccades."
      },
      {
        "title": "11. Notes d'inspection",
        "description": "Notez l'état cosmétique physique, l'intégrité des connecteurs et les constats visuels."
      },
      {
        "title": "12. Rapport final d'inspection",
        "description": "Générez un rapport complet, imprimable et exportable documentant tous les résultats."
      }
    ]
  },
  {
    "id": "gaming",
    "route": "/monitor-inspection/gaming",
    "title": "Inspection d'écran gaming",
    "shortDescription": "Vérifiez rafraîchissement, ghosting, overdrive, tearing, black smearing, HDR et réactivité.",
    "longDescription": "Un flux de travail spécialisé pour les écrans de jeu à haute fréquence (120 Hz, 144 Hz, 240 Hz, 360 Hz+). Évalue la synchronisation, le ghosting, le dépassement d'overdrive (ghosting inverse), le tearing, le black smearing sur dalles VA et la réponse HDR.",
    "inspectionTip": "Testez votre écran à sa fréquence maximale certifiée avec l'overdrive sur 'Normal' avant d'essayer 'Extrême/Rapide' afin d'identifier les halos de dépassement.",
    "browserLimitations": "Le taux de rafraîchissement variable dynamique (G-Sync / FreeSync) nécessite l'exécution de jeux DirectX/Vulkan pour éprouver les variations de cadence extrêmes.",
    "sequence": [
      "/tests/vrr-test",
      "/tests/screen-tearing-test",
      "/tests/refresh-rate-test",
      "/tests/ghosting-test",
      "/tests/hdr-test",
      "/tests/text-clarity-test"
    ],
    "steps": [
      {
        "title": "Inspection VRR & Adaptive Sync",
        "description": "Observez la régularité du rythme des images lors de fluctuations de charge."
      },
      {
        "title": "Screen Tearing & V-Sync",
        "description": "Éprouvez le déchirement d'image sur des déplacements horizontaux à haute vitesse."
      },
      {
        "title": "Vérification de la fréquence",
        "description": "Comparez la cadence requestAnimationFrame du navigateur au taux de la dalle."
      },
      {
        "title": "Ghosting, Overdrive & Black Smearing",
        "description": "Évaluez les transitions de pixels, les halos d'inversion et les traînées sombres VA."
      },
      {
        "title": "Inspection visuelle HDR",
        "description": "Vérifiez les éclats de lumière, l'écrêtage et la restitution de la large gamme."
      },
      {
        "title": "Netteté du texte & interface de jeu",
        "description": "Mesurez la lisibilité des petites polices et des éléments d'interface ATH."
      }
    ]
  },
  {
    "id": "oled",
    "route": "/monitor-inspection/oled",
    "title": "Inspection d'écran OLED",
    "shortDescription": "Inspectez les champs sombres, l'uniformité, le banding, la rétention, le marquage, le HDR et le mouvement.",
    "longDescription": "Un protocole diagnostique sur mesure pour les dalles auto-émissives OLED, QD-OLED et WOLED. Évalue les échelons près du noir, le banding vertical, l'uniformité, la rémanence temporaire face au marquage permanent, la dynamique HDR et la netteté en mouvement.",
    "inspectionTip": "Observez les mires de gris sombre (1%, 2%, 5% de gris) dans une pièce complètement noire pour examiner le banding vertical sans reflets parasites.",
    "browserLimitations": "Le limiteur automatique de luminosité (ABL) assombrit les grandes fenêtres de navigateur blanches ; quantifier le marquage permanent exige des photomètres de laboratoire.",
    "sequence": [
      "/tests/near-black-test",
      "/tests/uniformity-test",
      "/tests/hdr-test",
      "/tests/text-clarity-test",
      "/tests/motion-blur-test",
      "/tests/dead-pixel-test"
    ],
    "steps": [
      {
        "title": "Near-Black & séparation des ombres",
        "description": "Inspectez les échelons sombres de 0,25% à 5% pour juger de l'allumage des pixels OLED."
      },
      {
        "title": "Luminance & uniformité sombre",
        "description": "Contrôlez l'homogénéité sur gris 5%, 20% et 50% pour détecter d'éventuelles bandes verticales."
      },
      {
        "title": "HDR & hautes lumières spéculaires",
        "description": "Vérifiez l'étendue colorimétrique et l'amortissement des pics sans coupure ABL."
      },
      {
        "title": "Rendu du texte & sous-pixels",
        "description": "Examinez l'affichage des polices (RGB/WRGB/QD-OLED) pour déceler des franges colorées."
      },
      {
        "title": "Netteté de mouvement Sample-and-Hold",
        "description": "Observez les transitions instantanées de l'OLED conjointement à la persistance oculaire."
      },
      {
        "title": "Sous-pixels inactifs & contrôle de marquage",
        "description": "Parcourez les aplats de couleur pour détecter les émetteurs éteints ou ombres fixes."
      }
    ]
  },
  {
    "id": "laptop",
    "route": "/monitor-inspection/laptop",
    "title": "Inspection d'écran de PC portable",
    "shortDescription": "Contrôlez résolution, luminosité, uniformité, couleurs, texte, taux de rafraîchissement et HDR.",
    "longDescription": "Un flux de vérification dédié aux écrans intégrés d'ordinateurs portables (MacBook Retina, ultrabooks Windows, PC portables gaming). Valide la mise à l'échelle haute densité DPI, la réserve de luminosité, l'uniformité de dalle et le rendu du texte ClearType.",
    "inspectionTip": "Branchez votre ordinateur portable sur le secteur et désactivez les capteurs de luminosité automatique afin d'éviter que les profils de batterie ne réduisent la puissance du rétroéclairage.",
    "browserLimitations": "Les pourcentages de couverture colorimétrique (ex. 100% sRGB ou DCI-P3) sont des caractéristiques physiques de la dalle nécessitant une sonde de calibration matérielle.",
    "sequence": [
      "/tests/resolution-checker",
      "/tests/brightness-test",
      "/tests/uniformity-test",
      "/tests/solid-color-test",
      "/tests/sharpness-test",
      "/tests/refresh-rate-test",
      "/tests/hdr-capability-test"
    ],
    "steps": [
      {
        "title": "Résolution & mise à l'échelle High-DPI",
        "description": "Vérifiez l'échelle logique, le ratio de pixels (DPR) et la résolution native."
      },
      {
        "title": "Luminosité & dynamique",
        "description": "Validez la puissance d'éclairage maximale et le discernement des ombres pour l'extérieur."
      },
      {
        "title": "Uniformité & contraintes du cadre",
        "description": "Inspectez les marques de pression du châssis, fuites de bord ou angles assombris."
      },
      {
        "title": "Éclat des couleurs & homogénéité",
        "description": "Contrôlez la fidélité des aplats primaires et secondaires sur toute la surface."
      },
      {
        "title": "Rendu du texte & netteté de sous-pixels",
        "description": "Vérifiez l'anticrénelage des polices (ClearType) sur plusieurs échelles de corps (8px–24px)."
      },
      {
        "title": "Vérification du rafraîchissement",
        "description": "Confirmez que les fréquences élevées (90 Hz, 120 Hz ProMotion, 144 Hz+) sont bien enclenchées."
      },
      {
        "title": "HDR & espace étendu (le cas échéant)",
        "description": "Vérifiez la compatibilité HDR et le rendu étendu sur les dalles de PC portable compatibles."
      }
    ]
  },
  {
    "id": "new",
    "route": "/monitor-inspection/new",
    "title": "Inspection de moniteur neuf",
    "shortDescription": "Vérifications essentielles avant la première utilisation et durant le délai de rétractation.",
    "longDescription": "Une liste complète de vérification au déballage conçue pour inspecter les moniteurs neufs à la recherche de vices de fabrication, défauts de pixels, fuites de rétroéclairage et performances globales avant l'expiration de la période de retour.",
    "inspectionTip": "Examinez l'écran à la fois dans une pièce lumineuse (finition de dalle, reflets et micro-rayures) et dans une pièce plongée dans le noir complet (fuites de lumière et lueur IPS).",
    "browserLimitations": "Les navigateurs ne peuvent tester les connecteurs physiques (DisplayPort, HDMI, USB-C Power Delivery) ni les modules matériels G-Sync. Réalisez également des tests physiques de câbles.",
    "sequence": [
      "/tests/resolution-checker",
      "/tests/sharpness-test",
      "/tests/dead-pixel-test",
      "/tests/stuck-pixel-test",
      "/tests/solid-color-test",
      "/tests/grayscale-test",
      "/tests/brightness-test",
      "/tests/contrast-test",
      "/tests/black-level-test",
      "/tests/white-level-test",
      "/tests/uniformity-test",
      "/tests/backlight-bleed-test",
      "/tests/ghosting-test",
      "/tests/refresh-rate-test",
      "/tests/hdr-capability-test"
    ],
    "steps": [
      {
        "title": "Résolution & capacités d'affichage",
        "description": "Vérifiez la résolution native, le ratio de pixels et la fréquence de rafraîchissement rapportée."
      },
      {
        "title": "Netteté du texte & clarté de sous-pixels",
        "description": "Contrôlez le rendu des polices, l'anticrénelage et la netteté sans artefacts parasites."
      },
      {
        "title": "Contrôle des pixels morts",
        "description": "Parcourez les aplats de couleurs primaires pour déceler les sous-pixels noirs inactifs."
      },
      {
        "title": "Examen des pixels bloqués",
        "description": "Vérifiez l'absence de sous-pixels illuminés en continu qui refusent de s'éteindre."
      },
      {
        "title": "Uniformité des couleurs solides",
        "description": "Validez la consistance des fonds rouge, vert, bleu, cyan, magenta et jaune."
      },
      {
        "title": "Échelons de dégradés en niveaux de gris",
        "description": "Inspectez les transitions tonales de 0% à 100% de luminance sans banding marqué."
      },
      {
        "title": "Luminosité & dynamique",
        "description": "Assurez-vous que l'ensemble du spectre de luminance du noir au blanc est discernable."
      },
      {
        "title": "Échelons de contraste",
        "description": "Vérifiez la séparation distincte des mires de contraste échelonnées."
      },
      {
        "title": "Écrêtage du niveau de noir",
        "description": "Ajustez le niveau de noir pour que les ombres profondes ne soient pas bouchées."
      },
      {
        "title": "Écrêtage du niveau de blanc",
        "description": "Réglez le contraste pour éviter que les hautes lumières ne soient brûlées en blanc pur."
      },
      {
        "title": "Uniformité de la luminance de l'écran",
        "description": "Recherchez les effets de nuages, de vignettage ou de salissure sur les fonds gris."
      },
      {
        "title": "Fuites de lumière & lueur IPS",
        "description": "Testez dans le noir pour distinguer les fuites de cadre de la lueur angulaire IPS."
      },
      {
        "title": "Ghosting & réponse des pixels",
        "description": "Observez des silhouettes en mouvement contrastées pour évaluer la rémanence."
      },
      {
        "title": "Fréquence de rafraîchissement & timing",
        "description": "Confirmez la concordance de requestAnimationFrame avec la fréquence de la dalle."
      },
      {
        "title": "HDR & large gamme colorimétrique",
        "description": "Vérifiez la prise en charge HDR du système et l'espace P3 lorsque disponible."
      }
    ]
  },
  {
    "id": "tv",
    "route": "/monitor-inspection/tv",
    "title": "Inspection d'écran TV",
    "shortDescription": "Inspectez la qualité d'affichage, la gradation locale et les performances de votre téléviseur.",
    "longDescription": "Une suite de tests spécialisée pour les téléviseurs de salon et grands écrans connectés via HDMI. Identifie les halos de gradation locale (blooming), l'effet d'écran sale (DSE), les saccades en 24p, le rognage par surbalayage et le HDR.",
    "inspectionTip": "Passez le préréglage d'image de votre téléviseur sur 'PC', 'Jeu' ou 'Filmmaker' et réglez le format sur 'Just Scan' / '1:1' pour désactiver la netteté artificielle et le rognage des bords.",
    "browserLimitations": "Les fonctionnalités de traitement vidéo du téléviseur (telles que l'interpolation de mouvement) doivent être configurées directement dans les réglages du téléviseur.",
    "sequence": [
      "/tests/hdr-test",
      "/tests/near-black-test",
      "/tests/uniformity-test",
      "/tests/tv-overscan-test",
      "/tests/scaling-aspect-test",
      "/tests/viewing-angle-test"
    ],
    "steps": [
      {
        "title": "Inspection visuelle HDR",
        "description": "Vérifiez la gestion des hautes lumières et la restitution de la large palette de couleurs."
      },
      {
        "title": "Détails dans les ombres Near-Black",
        "description": "Contrôlez le niveau de noir HDMI pour prévenir le bouchage des ombres ou les noirs délavés."
      },
      {
        "title": "Uniformité & effet d'écran sale (DSE)",
        "description": "Balaiez les aplats gris pour déceler d'éventuelles bandes verticales ou zones sombres."
      },
      {
        "title": "Overscan TV & mappage 1:1",
        "description": "Vérifiez un affichage 4K/1080p intégral sans pixels tronqués par le surbalayage du téléviseur."
      },
      {
        "title": "Format d'image & géométrie",
        "description": "Confirmez que les mires circulaires et carrées conservent des proportions mathématiques exactes."
      },
      {
        "title": "Angles de visionnage de salon",
        "description": "Évaluez l'altération des couleurs et du contraste depuis les places assises décentrées."
      }
    ]
  }
];
