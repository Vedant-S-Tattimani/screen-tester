import { TroubleshootingTopic } from "./types";

export const FR_TROUBLESHOOTING_TOPICS: TroubleshootingTopic[] = [
  {
    "id": "no-image",
    "title": "Pas d'image (écran noir / vide)",
    "category": "display",
    "categoryTitle": "Problèmes d'affichage",
    "symptom": "Le voyant d'alimentation du moniteur peut s'allumer, mais la dalle reste totalement noire sans image, icônes ni rétroéclairage.",
    "possibleCauses": [
      "Câble d'alimentation de l'écran ou adaptateur secteur externe débranché ou mal inséré",
      "Moniteur réglé sur la mauvaise source d'entrée (ex. HDMI 2 au lieu de DisplayPort 1)",
      "Câble vidéo mal branché, décroché ou endommagé entre le GPU et le moniteur",
      "Appareil source en veille profonde, hibernation ou plantage du pilote graphique",
      "Combinaison de résolution et de fréquence non prise en charge envoyée au démarrage",
      "Défaillance de la carte d'alimentation interne, de l'inverter ou de la carte logique T-Con"
    ],
    "checks": [
      "Observez le voyant d'alimentation : Éteint (pas de courant), orange (veille) ou blanc/bleu fixe (actif) ?",
      "Appuyez sur les boutons physiques du menu OSD de l'écran : Le menu d'usine apparaît-il ? (S'il apparaît, la dalle fonctionne ; la cause vient de la source ou du câble)",
      "Rebranchez fermement les deux extrémités du câble DisplayPort ou HDMI dans le GPU et l'écran",
      "Vérifiez que le câble est branché sur la carte graphique dédiée (GPU) et non sur le port vidéo de la carte mère",
      "Testez avec un autre câble vidéo vérifié ou sur un port d'entrée différent"
    ],
    "whatScreenTesterCanTest": {
      "description": "Une fois l'affichage rétabli, Screen Tester permet d'évaluer la stabilité du signal et de générer des mires de test continues.",
      "links": [
        {
          "label": "Informations sur l'écran",
          "testId": "display-info",
          "testPath": "/tests/display-info"
        },
        {
          "label": "Vérificateur de résolution",
          "testId": "resolution-checker",
          "testPath": "/tests/resolution-checker"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Tension d'alimentation secteur ou sortie continue du bloc d'alimentation",
      "Négociation des lignes PCIe de la carte mère ou rails d'alimentation du GPU",
      "Continuité des circuits électroniques internes ou des rampes de LED"
    ],
    "actions": [
      "Redémarrez électriquement l'écran : Débranchez le cordon 30 secondes, maintenez le bouton d'alimentation 10 secondes, puis rebranchez",
      "Utilisez le raccourci Windows Win + Ctrl + Maj + B pour réinitialiser le sous-système de pilote graphique",
      "Démarrez en mode sans échec ou dans le BIOS UEFI pour forcer un signal basique 1024x768 à 60 Hz",
      "Testez l'écran avec une seconde source vidéo (console, PC portable) pour isoler si le défaut vient du PC ou du moniteur"
    ],
    "whenToStop": "Interrompez le dépannage en cas d'odeur de brûlé, de sifflement aigu de condensateur ou si le menu OSD ne s'affiche pas avec tous les câbles vidéo débranchés."
  },
  {
    "id": "no-signal",
    "title": "Aucun signal / Câble non connecté",
    "category": "display",
    "categoryTitle": "Problèmes d'affichage",
    "symptom": "L'écran s'allume et affiche un message tel que 'Pas de signal', 'Vérifier le câble' ou passe immédiatement en veille économique.",
    "possibleCauses": [
      "Mauvais port d'entrée physique sélectionné dans le menu OSD de l'écran",
      "Bande passante du câble vidéo insuffisante ou broches tordues sur les connecteurs DisplayPort/HDMI",
      "Station d'accueil USB-C / Thunderbolt, commutateur KVM ou adaptateur échouant à négocier la connexion",
      "Le système d'exploitation émet une fréquence de rafraîchissement ou une résolution non prise en charge",
      "Pilote GPU désactivé ou en échec lors de l'initialisation de l'affichage"
    ],
    "checks": [
      "Changez manuellement la source d'entrée dans l'OSD de 'Auto' vers le port physique utilisé",
      "Débranchez le câble des deux côtés et inspectez l'état des broches et des prises",
      "Contournez les hubs ou adaptateurs et reliez directement le GPU à l'écran",
      "Testez une autre sortie DisplayPort ou HDMI sur la carte graphique"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester inspecte la chaîne matérielle rapportée par le navigateur, les taux de rafraîchissement et la résolution.",
      "links": [
        {
          "label": "Informations sur l'écran",
          "testId": "display-info",
          "testPath": "/tests/display-info"
        },
        {
          "label": "Test du taux de rafraîchissement",
          "testId": "refresh-rate-test",
          "testPath": "/tests/refresh-rate-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Intégrité du signal matériel ou atténuation physique du câble",
      "Blocages du protocole cryptographique HDCP au niveau du micrologiciel",
      "Dommages mécaniques internes aux connecteurs de la carte graphique"
    ],
    "actions": [
      "Remplacez le câble par un modèle certifié (HDMI 2.1 Ultra High Speed ou DisplayPort 1.4/2.1 VESA)",
      "Réinstallez proprement les pilotes graphiques avec DDU en mode sans échec",
      "Réinitialisez le moniteur aux paramètres d'usine depuis son menu OSD",
      "Mettez à jour le micrologiciel du moniteur et du GPU"
    ],
    "whenToStop": "Arrêtez si plusieurs câbles certifiés et plusieurs appareils sources n'obtiennent aucun signal sur aucun port (panne de carte mère ou T-Con)."
  },
  {
    "id": "wrong-resolution",
    "title": "Mauvaise résolution / Affichage étiré ou avec bandes noires",
    "category": "display",
    "categoryTitle": "Problèmes d'affichage",
    "symptom": "Le bureau paraît flou, étiré, déformé ou présente des bandes noires latérales ou verticales (letterboxing/pillarboxing).",
    "possibleCauses": [
      "Système d'exploitation réglé sur une résolution non native",
      "Mise à l'échelle du GPU réglée sur 'Conserver le format' ou 'Centré' au lieu de 'Plein écran'",
      "Format d'image forcé de manière incorrecte dans l'OSD de l'écran (ex. 4:3 sur dalle 16:9)",
      "Câble HDMI bas de gamme limitant la bande passante à 1080p au lieu de 4K",
      "Pilote d'affichage générique ou obsolète installé"
    ],
    "checks": [
      "Consultez la fiche technique pour connaître la résolution native exacte du moniteur",
      "Dans les paramètres d'affichage de Windows, vérifiez que la résolution marquée '(Recommandé)' est active",
      "Dans l'OSD de l'écran, réglez la mise à l'échelle d'image sur '1:1' ou 'Auto'",
      "Inspectez les options de mise à l'échelle dans le Panneau de configuration NVIDIA ou AMD Software"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester affiche des mires de test au pixel près et des formes géométriques pour révéler les artefacts d'étirement.",
      "links": [
        {
          "label": "Vérificateur de résolution",
          "testId": "resolution-checker",
          "testPath": "/tests/resolution-checker"
        },
        {
          "label": "Test de mise à l'échelle et format",
          "testId": "scaling-aspect-test",
          "testPath": "/tests/scaling-aspect-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Algorithmes d'échelonnage matériel internes du moniteur par rapport au GPU",
      "Blocs de données EDID EEPROM corrompus dans la dalle"
    ],
    "actions": [
      "Sélectionnez la résolution native exacte dans les réglages système",
      "Mettez à jour les pilotes graphiques directement depuis NVIDIA, AMD ou Intel",
      "Activez la mise à l'échelle par le GPU dans les paramètres du pilote",
      "Générez une résolution personnalisée (Custom Resolution) avec CRU en cas de défaillance EDID"
    ],
    "whenToStop": "Si le menu OSD propre à l'écran apparaît lui-même déformé, la puce de traitement d'image interne est défectueuse."
  },
  {
    "id": "wrong-refresh-rate",
    "title": "Mauvais taux de rafraîchissement / Bloqué à 60 Hz",
    "category": "display",
    "categoryTitle": "Problèmes d'affichage",
    "symptom": "Un écran gaming 144 Hz, 240 Hz ou 360 Hz semble saccadé et reste bloqué à 60 Hz dans les réglages du système.",
    "possibleCauses": [
      "L'écran est branché via un vieux câble HDMI 1.4 incompatible avec les hautes fréquences",
      "Les paramètres d'affichage avancés de Windows ont basculé sur 60 Hz après une mise à jour",
      "L'OSD du moniteur est configuré en DisplayPort 1.1 / 1.2 au lieu de DP 1.4 avec DSC",
      "La présence de plusieurs écrans à fréquences hétérogènes perturbe la synchronisation du GPU",
      "Le processeur graphique intégré gère la sortie vidéo du PC portable"
    ],
    "checks": [
      "Dans Windows : Paramètres > Système > Écran > Affichage avancé > Taux de rafraîchissement",
      "Dans le menu OSD de l'écran, vérifiez la version de DisplayPort active (réglez sur DP 1.4 ou 2.1)",
      "Vérifiez le type de câble : le DisplayPort est toujours recommandé pour les hautes fréquences sur PC",
      "Activez le rafraîchissement variable (G-Sync/FreeSync) dans l'OSD et les pilotes"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester mesure précisément la cadence des trames avec requestAnimationFrame pour détecter micro-saccades et pertes de frames.",
      "links": [
        {
          "label": "Test du taux de rafraîchissement",
          "testId": "refresh-rate-test",
          "testPath": "/tests/refresh-rate-test"
        },
        {
          "label": "Test VRR",
          "testId": "vrr-test",
          "testPath": "/tests/vrr-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Gigue d'horloge matérielle sur les sorties physiques du GPU",
      "Version de micrologiciel du module matériel G-Sync"
    ],
    "actions": [
      "Définissez manuellement le taux maximal dans Windows et dans le panneau NVIDIA/AMD",
      "Adoptez un câble certifié DisplayPort 1.4 ou HDMI 2.1",
      "Réinitialisez l'OSD de l'écran et activez le mode Overclock si nécessaire",
      "Mettez à jour vos pilotes de carte graphique"
    ],
    "whenToStop": "Si l'écran produit des écrans noirs constants lors de la sélection du taux nominal, il s'agit d'une rupture de bande passante ou d'un défaut de dalle."
  },
  {
    "id": "screen-tearing",
    "title": "Screen Tearing / Déchirement horizontal de l'image",
    "category": "display",
    "categoryTitle": "Problèmes d'affichage",
    "symptom": "Des lignes de fracture horizontales décalent l'image lors de mouvements rapides de caméra latérale.",
    "possibleCauses": [
      "V-Sync désactivée dans le jeu ou dans le panneau de configuration graphique",
      "Le débit d'images du GPU dépasse ou descend sous la plage de fonctionnement G-Sync/VRR",
      "G-Sync / FreeSync non activé dans les pilotes ou dans l'OSD du moniteur",
      "Le jeu tourne en mode fenêtré sans bordure avec une composition de bureau incompatible",
      "La carte graphique envoie les images de manière désynchronisée par rapport au balayage de l'écran"
    ],
    "checks": [
      "Vérifiez que G-Sync/FreeSync est activé dans le menu OSD du moniteur",
      "Dans le panneau NVIDIA, vérifiez que 'Activer G-SYNC' est coché",
      "Vérifiez si le nombre d'images par seconde dépasse la fréquence maximale de l'écran",
      "Activez V-Sync dans le panneau de contrôle et plafonnez les FPS à 3 unités sous le taux maximal"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester génère des bandes contrastées à haute vélocité pour rendre les lignes de déchirement immédiatement perceptibles.",
      "links": [
        {
          "label": "Test de déchirement d'écran",
          "testId": "screen-tearing-test",
          "testPath": "/tests/screen-tearing-test"
        },
        {
          "label": "Test VRR",
          "testId": "vrr-test",
          "testPath": "/tests/vrr-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Variations de régularité de trame (frame pacing) au sein de moteurs natifs DirectX/Vulkan",
      "Latences internes de file de rendu (swapchain)"
    ],
    "actions": [
      "Activez G-Sync / FreeSync",
      "Plafonnez globalement le débit d'images (ex. 141 FPS pour 144 Hz, 237 FPS pour 240 Hz)",
      "Activez la V-Sync au niveau du pilote graphique pour éliminer le déchirement en bordure de plage",
      "Utilisez un câble DisplayPort (la compatibilité G-Sync l'exige généralement)"
    ],
    "whenToStop": "Si des lignes horizontales apparaissent sur une image fixe ou dans le BIOS, il ne s'agit pas de tearing mais d'un dommage physique de la dalle."
  },
  {
    "id": "flickering",
    "title": "Scintillement de l'écran / Coupures intermittentes",
    "category": "display",
    "categoryTitle": "Problèmes d'affichage",
    "symptom": "L'écran clignote de façon erratique, s'éteint 1 à 2 secondes ou subit des variations brutales d'intensité lumineuse.",
    "possibleCauses": [
      "Câble DisplayPort/HDMI de mauvaise qualité ou trop long perdant l'intégrité du signal",
      "Scintillement de luminosité lié au VRR (G-Sync Flickering) lors de chutes de framerate",
      "Rétroéclairage fonctionnant par modulation de largeur d'impulsion (PWM) à basse fréquence",
      "Parasites électriques provenant d'une multiprise ou d'un bloc d'alimentation instable",
      "Conflit de gestion d'énergie dans le pilote de la carte graphique"
    ],
    "checks": [
      "Le scintillement survient-il uniquement en jeu (avec G-Sync) ou également sur le bureau ?",
      "Assurez-vous que le câble est parfaitement enfiché aux deux extrémités",
      "Ajustez la luminosité dans l'OSD : le scintillement cesse-t-il à 100% de luminosité ? (Signe de PWM)",
      "Désactivez temporairement G-Sync / FreeSync"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester fournit des mires de scintillement et d'uniformité pour évaluer la réponse stroboscopique.",
      "links": [
        {
          "label": "Test de scintillement",
          "testId": "flicker",
          "testPath": "/tests/flicker"
        },
        {
          "label": "Test VRR",
          "testId": "vrr-test",
          "testPath": "/tests/vrr-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Fréquence PWM exacte en kilohertz (nécessite un capteur optique et un oscilloscope)",
      "Micro-variations de tension de l'alimentation"
    ],
    "actions": [
      "Utilisez un câble certifié VESA de longueur raisonnable",
      "Branchez l'écran directement sur une prise murale dédiée",
      "Dans le panneau de la GPU, désactivez G-Sync pour le mode fenêtré ou activez le contrôle anti-scintillement",
      "Procédez à une réinstallation propre des pilotes graphiques"
    ],
    "whenToStop": "Si le moniteur clignote même dans son propre menu OSD sans aucun câble vidéo relié, l'alimentation interne ou les LED sont HS."
  },
  {
    "id": "dead-stuck-bright-pixel",
    "title": "Pixels morts, bloqués et sous-pixels lumineux",
    "category": "pixels",
    "categoryTitle": "Problèmes de pixels",
    "symptom": "Un point minuscule reste constamment noir (mort), figé sur une couleur rouge/vert/bleu (bloqué) ou brille en blanc pur.",
    "possibleCauses": [
      "Défaut de gravure dans la matrice de transistors TFT lors de la fabrication de la dalle",
      "Transistor sans alimentation (sous-pixel mort) ou bloqué à l'état passant (sous-pixel lumineux)",
      "Poussière emprisonnée entre les couches polarisantes et le substrat en verre",
      "Contrainte mécanique ou pression excessive exercée lors du nettoyage"
    ],
    "checks": [
      "Nettoyez délicatement l'écran avec un chiffon microfibre propre pour exclure une impureté externe",
      "Affichez des aplats de couleur pleine page (rouge, vert, bleu, blanc, noir) pour identifier le sous-pixel",
      "Utilisez une loupe pour vérifier s'il s'agit d'un sous-pixel unique ou d'un pixel complet"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester intègre des mires de détection de pixels défectueux et des cycles de flash haute fréquence pour réactiver les cristaux bloqués.",
      "links": [
        {
          "label": "Test de pixels morts",
          "testId": "dead-pixel-test",
          "testPath": "/tests/dead-pixel-test"
        },
        {
          "label": "Réparateur de pixels bloqués",
          "testId": "stuck-pixel-fixer",
          "testPath": "/tests/stuck-pixel-fixer"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Éligibilité à la garantie selon la norme ISO 9241-307 sans comptage manuel",
      "Détérioration physique à l'échelle microscopique du semi-conducteur"
    ],
    "actions": [
      "Faites fonctionner l'outil de réparation de pixels bloqués sur la zone pendant 20 à 30 minutes",
      "Vérifiez la politique de garantie du constructeur relative aux pixels défectueux",
      "Exercez votre droit de rétractation si l'appareil a été acheté récemment",
      "N'appuyez jamais vigoureusement avec les doigts (risque de détruire les transistors voisins)"
    ],
    "whenToStop": "Les pixels morts (noirs) correspondent à des transistors coupés définitivement et ne peuvent être réparés par voie logicielle."
  },
  {
    "id": "washed-out-colors",
    "title": "Couleurs délavées / Contraste erroné et dominante de teinte",
    "category": "imageQuality",
    "categoryTitle": "Qualité d'image",
    "symptom": "Les couleurs manquent d'éclat, les noirs apparaissent grisâtres ou l'image présente une dominante jaunâtre, verdâtre ou bleuâtre.",
    "possibleCauses": [
      "Plage dynamique de sortie RVB incorrecte (Limitée 16-235 au lieu de Complète 0-255)",
      "Windows HDR activé sur du contenu SDR sans réglage de luminance adapté",
      "Éclairage nocturne / filtre anti-lumière bleue activé dans le système ou l'OSD",
      "Profil de couleur ICC corrompu ou inadapté chargé dans Windows",
      "Format de couleur réglé sur YCbCr420 au lieu de RVB 4:4:4"
    ],
    "checks": [
      "Dans le panneau de configuration GPU : la plage dynamique est-elle sur 'Complète' (0-255) ?",
      "Désactivez l'éclairage nocturne dans les paramètres d'affichage de Windows",
      "Dans l'OSD du moniteur, réglez la température de couleur sur 'Standard' ou 'sRGB'",
      "Désactivez temporairement Windows HDR (Win + Alt + B)"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester analyse la justesse chromatique, les dégradés en niveaux de gris et les échelons de contraste.",
      "links": [
        {
          "label": "Test de fidélité des couleurs",
          "testId": "color-test",
          "testPath": "/tests/color-test"
        },
        {
          "label": "Test de contraste",
          "testId": "contrast-test",
          "testPath": "/tests/contrast-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Écarts colorimétriques quantitatifs Delta-E (exige une sonde colorimétrique)",
      "Programmation de la table de conversion matérielle (LUT) interne de l'écran"
    ],
    "actions": [
      "Réglez la plage dynamique sur 'Complète' et la profondeur sur 8 ou 10 bits dans le pilote",
      "Lancez l'étalonnage des couleurs de Windows (dccw) ou réinstallez le profil usine",
      "Calibrez l'OSD en sRGB ou DCI-P3 selon vos usages de travail",
      "Ajustez la luminosité du contenu SDR dans les paramètres Windows HDR"
    ],
    "whenToStop": "Si la dalle présente une dominante de couleur incorrigible même dans l'OSD d'usine, le rétroéclairage LED est dégradé."
  },
  {
    "id": "blurry-text",
    "title": "Texte flou et franges colorées sur les sous-pixels",
    "category": "imageQuality",
    "categoryTitle": "Qualité d'image",
    "symptom": "L'écriture manque de netteté, paraît baveuse ou montre des liserés de couleur (rouges/bleus) sur le bord des caractères.",
    "possibleCauses": [
      "Facteur d'échelle Windows non entier (ex. 125% ou 175% sans ajustement ClearType)",
      "Disposition atypique des sous-pixels (BGR, WRGB ou disposition triangulaire QD-OLED)",
      "Résolution non native sélectionnée",
      "Sous-échantillonnage chromatique actif (YCbCr 4:2:2 ou 4:2:0 au lieu de RVB 4:4:4)",
      "Réglage de netteté du moniteur trop poussé ou trop faible"
    ],
    "checks": [
      "Lancez l'assistant d'optimisation de texte ClearType dans Windows",
      "Vérifiez que la sortie vidéo est configurée en RVB 4:4:4 sans compression",
      "Réglez la netteté de l'OSD du moniteur sur sa valeur neutre (souvent 50%)",
      "Renseignez-vous pour savoir si votre écran possède une dalle avec disposition BGR"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester propose des échelles typographiques fines pour contrôler la netteté des arêtes de sous-pixels.",
      "links": [
        {
          "label": "Test de clarté du texte",
          "testId": "text-clarity-test",
          "testPath": "/tests/text-clarity-test"
        },
        {
          "label": "Test de netteté",
          "testId": "sharpness-test",
          "testPath": "/tests/sharpness-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Noyaux de rastérisation de polices au niveau des API de rendu du système",
      "Géométrie microscopique des sous-pixels"
    ],
    "actions": [
      "Exécutez l'outil ClearType de Windows et sélectionnez les échantillons les plus nets",
      "Assurez-vous de conserver la résolution native et le mode RVB intégral",
      "Pour les dalles BGR, configurez ClearType en mode BGR dans le registre ou via BetterClearTypeTuner",
      "Privilégiez les facteurs d'échelle réguliers (100%, 150%, 200%)"
    ],
    "whenToStop": "Sur les écrans OLED dotés d'une structure de sous-pixels triangulaire, de légères franges colorées sont normales et inhérentes à la technologie."
  },
  {
    "id": "uneven-brightness",
    "title": "Luminosité inégale / Vignettage / Effet d'écran sale (DSE)",
    "category": "imageQuality",
    "categoryTitle": "Qualité d'image",
    "symptom": "Coins assombris (vignettage), taches nébuleuses sur fonds gris ou impression de traces de salissure (DSE).",
    "possibleCauses": [
      "Tolérances de production sur les plaques diffusantes ou rétroéclairage LED latéral (Edge)",
      "Effet d'écran sale (DSE) dû à un laminage imparfait des couches optiques",
      "Pression excessive du châssis extérieur sur la dalle à cristaux liquides",
      "Vieillissement thermique inégal des diodes LED au fil des années"
    ],
    "checks": [
      "Affichez des aplats gris neutres (25%, 50%, 75%) en plein écran",
      "Prenez une photographie à exposition réduite pour matérialiser les nuages de lumière",
      "Vérifiez si l'effet varie selon l'angle de vision (phénomène optique classique sur dalles VA/IPS)"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester évalue l'homogénéité globale et le comportement près du noir sur toute la surface de la dalle.",
      "links": [
        {
          "label": "Test d'uniformité",
          "testId": "uniformity-test",
          "testPath": "/tests/uniformity-test"
        },
        {
          "label": "Test près du noir",
          "testId": "near-black-test",
          "testPath": "/tests/near-black-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Uniformité de luminance absolue en cd/m² sur une matrice étalonnée en 9 points",
      "Déformation thermique des guides d'ondes optiques internes"
    ],
    "actions": [
      "Abaissez la luminosité de l'écran à un niveau ergonomique (120-150 cd/m²) pour atténuer le défaut",
      "Activez la compensation d'uniformité dans l'OSD si votre moniteur en est pourvu",
      "Modérez l'éclairage de votre pièce pour éviter les contrastes violents",
      "Demandez un remplacement si les disparités sont excessives sur un produit neuf"
    ],
    "whenToStop": "Une perte de luminosité allant jusqu'à 15% dans les angles est considérée comme conforme aux normes de fabrication grand public."
  },
  {
    "id": "backlight-bleed-ips-glow",
    "title": "Fuites de rétroéclairage (Backlight Bleed) vs. Lueur IPS (IPS Glow)",
    "category": "imageQuality",
    "categoryTitle": "Qualité d'image",
    "symptom": "Taches lumineuses vives sur les bords dans l'obscurité ou lueur argentée/dorée changeant selon l'angle d'observation.",
    "possibleCauses": [
      "Backlight Bleed : Défaut d'étanchéité mécanique du cadre laissant s'échapper la lumière des LED",
      "IPS Glow : Propriété optique inhérente à l'agencement des cristaux liquides dans les dalles IPS sous angle oblique",
      "Tension mécanique causée par un serrage excessif des vis de fixation VESA"
    ],
    "checks": [
      "Placez-vous bien en face de l'écran à 1,5 mètre : la lueur s'estompe-t-elle ? (Si oui : il s'agit d'IPS Glow)",
      "Des fuites lumineuses fixes persistent-elles aux angles quel que soit l'angle ? (Si oui : il s'agit de Backlight Bleed)",
      "Desserrez légèrement les vis du support de fixation VESA en cas de contrainte sur le cadre"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester met à disposition des mires noires de référence pour dissocier précisément Bleed et Glow.",
      "links": [
        {
          "label": "Test de fuite de rétroéclairage",
          "testId": "backlight-bleed-test",
          "testPath": "/tests/backlight-bleed-test"
        },
        {
          "label": "Test du niveau de noir",
          "testId": "black-level-test",
          "testPath": "/tests/black-level-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Seuils de tolérance contractuels du constructeur sans mesure photométrique en laboratoire",
      "Couple de serrage des vis du châssis interne"
    ],
    "actions": [
      "Reculez votre position de travail et alignez l'écran au niveau des yeux (atténue fortement l'IPS Glow)",
      "Installez un éclairage d'ambiance doux derrière l'écran (bias lighting)",
      "Diminuez la luminosité globale du moniteur pour vous situer entre 30% et 50%",
      "Faites jouer la garantie si des faisceaux de lumière sont visibles en éclairage normal"
    ],
    "whenToStop": "L'IPS Glow ne se répare pas car c'est une propriété optique de la technologie IPS. Seuls les écrans OLED offrent des noirs sans aucun glow."
  },
  {
    "id": "hdr-not-working",
    "title": "Le HDR ne fonctionne pas / Image délavée ou terne en mode HDR",
    "category": "imageQuality",
    "categoryTitle": "Qualité d'image",
    "symptom": "L'activation du HDR produit un rendu décoloré, assombrit le bureau ou brûle complètement les hautes lumières.",
    "possibleCauses": [
      "L'écran possède une certification 'DisplayHDR 400' sans véritable gradation locale ni large gamme de couleurs",
      "L'étalonnage HDR de Windows n'a pas été effectué",
      "Mappage tonal (Tone Mapping) inadapté dans le jeu ou dans l'OSD de l'écran",
      "Bande passante du câble insuffisante pour transmettre du 10 bits HDR à haute fréquence",
      "L'accélération matérielle du navigateur n'est pas activée pour le décodage HDR"
    ],
    "checks": [
      "Vérifiez si le HDR est bien activé dans Windows (Win + Alt + B)",
      "Lancez l'application Étalonnage HDR Windows depuis le Microsoft Store",
      "Dans l'OSD du moniteur, réglez l'option HDR sur 'Auto' ou 'DisplayHDR'",
      "Contrôlez le câble vidéo (DP 1.4 ou HDMI 2.1 indispensable)"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester mesure les pics d'intensité lumineuse, la couverture colorimétrique et l'écrêtage des hautes lumières en HDR.",
      "links": [
        {
          "label": "Test HDR",
          "testId": "hdr-test",
          "testPath": "/tests/hdr-test"
        },
        {
          "label": "Test des capacités HDR",
          "testId": "hdr-capability-test",
          "testPath": "/tests/hdr-capability-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Pic de luminance réelle en nits (nécessite un luxmètre étalonné)",
      "Nombre et réactivité des zones de gradation Mini-LED"
    ],
    "actions": [
      "Utilisez l'application d'étalonnage Windows HDR pour paramétrer les seuils minimum et maximum de nits",
      "Réglez le curseur de luminosité du contenu SDR dans les paramètres d'affichage de Windows",
      "Mettez à jour les pilotes graphiques et sélectionnez une profondeur de couleur de 10 bpc",
      "Sur les écrans sans gradation locale, désactivez le HDR pour la bureautique et réservez-le aux jeux certifiés"
    ],
    "whenToStop": "Si le moniteur n'est pas doté d'un rétroéclairage Mini-LED FALD ou d'une dalle OLED, le HDR ne peut mathématiquement pas offrir de contraste saisissant."
  },
  {
    "id": "tv-overscan-fit",
    "title": "L'image dépasse du téléviseur (Overscan / Bords tronqués)",
    "category": "tv",
    "categoryTitle": "Problèmes de TV",
    "symptom": "La barre des tâches de Windows ou les contours des fenêtres sont rognés aux extrémités ou entourés d'un cadre noir.",
    "possibleCauses": [
      "Fonction de surbalayage (Overscan) activée sur le téléviseur",
      "Format d'image de la TV calé sur '16:9' au lieu de 'Just Scan' / '1:1'",
      "Le pilote GPU applique une correction de sous-balayage inadaptée",
      "L'entrée HDMI du téléviseur n'est pas renommée en mode 'PC'"
    ],
    "checks": [
      "Sur la télécommande du téléviseur, cherchez la touche de format d'image (Format / Ratio)",
      "Examinez l'étiquette d'entrée de la prise HDMI : sélectionnez l'appellation 'PC'",
      "Dans le panneau de configuration GPU, vérifiez si le redimensionnement du bureau est enclenché"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester fournit des grilles de calage au pixel près et des mires avec pourcentages pour contrôler l'ajustement.",
      "links": [
        {
          "label": "Test d'Overscan TV",
          "testId": "tv-overscan-test",
          "testPath": "/tests/tv-overscan-test"
        },
        {
          "label": "Test de mise à l'échelle et format",
          "testId": "scaling-aspect-test",
          "testPath": "/tests/scaling-aspect-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Filtres de post-traitement internes appliqués par le téléviseur",
      "Protocoles de synchronisation HDMI-CEC"
    ],
    "actions": [
      "Réglez le format d'image de la TV sur 'Just Scan', 'Point par point' ou 'Adapter à l'écran'",
      "Renommez l'entrée HDMI de la TV en 'PC' (désactive automatiquement l'overscan et la netteté artificielle)",
      "Dans les pilotes graphiques, restaurez le format d'image par défaut",
      "Placez la netteté de la TV sur une position neutre (souvent 0 ou 50)"
    ],
    "whenToStop": "Lorsque la ligne blanche de 1 pixel de Screen Tester borde exactement les limites physiques du téléviseur, l'affichage est parfait."
  },
  {
    "id": "multi-touch-issues",
    "title": "Problèmes de tactile et de reconnaissance multi-points",
    "category": "deviceInput",
    "categoryTitle": "Problèmes d'appareils et de saisie",
    "symptom": "L'écran tactile manque de précision, ignore les gestes à plusieurs doigts ou enregistre des appuis fantômes (Ghost Touches).",
    "possibleCauses": [
      "Traces de doigts, film gras ou humidité déposés sur le verre",
      "Protection d'écran trop épaisse ou de mauvaise facture gênant la conduction capacitive",
      "Parasites électriques provoqués par un chargeur secteur bon marché non certifié",
      "Pilote d'écran tactile obsolète ou étalonnage défaillant sous Windows"
    ],
    "checks": [
      "Le problème persiste-t-il lorsque l'appareil est débranché de son chargeur ?",
      "Nettoyez scrupuleusement la surface vitrée avec un chiffon adapté",
      "Vérifiez le nombre de points de contact simultanés détectés par l'écran"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester offre un outil de suivi des points de contact avec affichage des coordonnées en temps réel.",
      "links": [
        {
          "label": "Test tactile multi-points",
          "testId": "multi-touch-test",
          "testPath": "/tests/multi-touch-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Rupture de pistes dans le maillage physique du numériseur en verre",
      "Fréquence d'échantillonnage matérielle du contrôleur tactile en hertz"
    ],
    "actions": [
      "Utilisez le chargeur d'origine pour exclure tout courant de fuite parasitaire",
      "Lancez l'assistant d'étalonnage tactile de Windows dans le Panneau de configuration",
      "Retirez la protection d'écran si les dysfonctionnements sont apparus après sa pose",
      "Mettez à jour le pilote de l'écran tactile dans le Gestionnaire de périphériques"
    ],
    "whenToStop": "Si des touches fantômes se déclenchent sur un écran propre débranché du secteur, le numériseur tactile est physiquement endommagé."
  },
  {
    "id": "accelerometer-issues",
    "title": "Problèmes d'accéléromètre et de capteurs de mouvement",
    "category": "deviceInput",
    "categoryTitle": "Problèmes d'appareils et de saisie",
    "symptom": "L'écran ne bascule plus automatiquement, les jeux ne répondent pas à l'inclinaison ou les valeurs dérivent continuellement.",
    "possibleCauses": [
      "Verrouillage de l'orientation portrait activé dans les réglages rapides du système",
      "Le navigateur web n'a pas reçu l'autorisation d'accéder aux capteurs de mouvement",
      "Capteur décalibré à la suite d'une chute ou d'un choc",
      "Le mode d'économie d'énergie coupe la relève continue des capteurs"
    ],
    "checks": [
      "Vérifiez si le verrouillage d'orientation est enclenché dans le centre de contrôle",
      "Consultez les autorisations accordées au site dans le navigateur (Safari/Chrome)",
      "Déposez l'appareil à plat sur une table parfaitement horizontale et observez les chiffres"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester lit en temps réel les composantes d'accélération sur les axes X, Y et Z via l'API DeviceMotion.",
      "links": [
        {
          "label": "Test de l'accéléromètre",
          "testId": "accelerometer-test",
          "testPath": "/tests/accelerometer-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "État de la micro-mécanique interne (MEMS) du composant électronique",
      "Dérive de calibration stockée dans la mémoire protégée du processeur"
    ],
    "actions": [
      "Activez la rotation automatique dans les paramètres système",
      "Autorisez l'accès aux capteurs dans les paramètres du navigateur mobile",
      "Redémarrez le smartphone ou la tablette pour réinitialiser le sous-système de capteurs",
      "Effectuez un réétalonnage du niveau et du mouvement dans les réglages de l'appareil"
    ],
    "whenToStop": "Si les trois axes renvoient constamment une valeur nulle ou un seuil de saturation figé, la puce MEMS est hors d'usage."
  },
  {
    "id": "gyroscope-issues",
    "title": "Problèmes de gyroscope et de capteurs d'orientation",
    "category": "deviceInput",
    "categoryTitle": "Problèmes d'appareils et de saisie",
    "symptom": "La visée dans les applications VR/AR ou les vidéos à 360 degrés tremble, dérive ou tourne sur elle-même sans raison.",
    "possibleCauses": [
      "Interférences électromagnétiques causées par des étuis à fermoir magnétique ou supports de voiture",
      "Refus d'autorisation pour les capteurs d'orientation dans le navigateur web",
      "Le gyroscope MEMS nécessite un recalibrage par un mouvement en forme de 8",
      "Le service système gérant la détection d'orientation a planté"
    ],
    "checks": [
      "Retirez toute coque munie d'aimants ou tout accessoire métallique",
      "Déplacez l'appareil dans les airs en lui faisant décrire des huit pour recalibrer les capteurs",
      "Contrôlez les autorisations d'orientation dans la barre d'adresse du navigateur"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester modélise les angles d'Euler Alpha, Bêta et Gamma avec une simulation physique 3D en temps réel.",
      "links": [
        {
          "label": "Test du gyroscope",
          "testId": "gyroscope-test",
          "testPath": "/tests/gyroscope-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Algorithme de fusion de capteurs combinant le gyroscope et le magnétomètre",
      "Bruit d'échantillonnage de haute fréquence"
    ],
    "actions": [
      "Recalibrez les capteurs en exécutant des figures en 8 dans l'espace",
      "Enlevez les protections dotées de fixations magnétiques",
      "Redémarrez l'appareil",
      "Mettez à jour le navigateur web vers sa version la plus récente"
    ],
    "whenToStop": "Si aucune rotation n'est mesurée sur aucun des trois axes géométriques, le gyroscope est défaillant au plan matériel."
  },
  {
    "id": "vibration-issues",
    "title": "Problèmes d'API de vibration et de retour haptique",
    "category": "deviceInput",
    "categoryTitle": "Problèmes d'appareils et de saisie",
    "symptom": "L'appareil ne vibre pas lors de la réception de notifications ou pendant les tests de retour haptique sur le web.",
    "possibleCauses": [
      "Vibration désactivée dans les paramètres sonores ou mode Ne pas déranger actif",
      "Le navigateur bloque les appels navigator.vibrate() sans interaction préalable de l'utilisateur",
      "iOS Safari ne prend délibérément pas en charge la spécification W3C Vibration API",
      "Le vibreur haptique (Taptic Engine) ou moteur à balourd ERM est cassé"
    ],
    "checks": [
      "Vérifiez que la vibration fonctionne dans les paramètres système de l'appareil",
      "Touchez impérativement l'écran avant de lancer le test pour lever le blocage de sécurité",
      "Vérifiez si l'appareil est un iPhone ou iPad (les appareils Apple bloquent la vibration web)"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester exécute des motifs haptiques prédéfinis et personnalisés via l'API Vibration de HTML5.",
      "links": [
        {
          "label": "Test de vibration",
          "testId": "vibration-test",
          "testPath": "/tests/vibration-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Fréquence mécanique de résonance du vibreur en hertz",
      "Courant électrique délivré au moteur vibrant"
    ],
    "actions": [
      "Activez la vibration et les retours haptiques dans les réglages système",
      "Effectuez le test sous Google Chrome pour Android ou un navigateur compatible",
      "Désactivez le mode d'économie d'énergie (il désactive fréquemment la vibration)",
      "Redémarrez l'appareil"
    ],
    "whenToStop": "Si l'appareil ne vibre jamais non plus lors des appels téléphoniques et des alarmes, le moteur haptique est détruit."
  },
  {
    "id": "webcam-issues",
    "title": "Problèmes de webcam et d'accès à la caméra",
    "category": "deviceInput",
    "categoryTitle": "Problèmes d'appareils et de saisie",
    "symptom": "L'image de la caméra reste noire, le navigateur annonce 'Caméra introuvable' ou l'accès est refusé.",
    "possibleCauses": [
      "Autorisation d'accès à la caméra révoquée dans le navigateur ou les réglages du système",
      "Cache de confidentialité mécanique (volet coulissant) fermé devant l'objectif",
      "Une autre application (ex. Zoom, Teams, OBS) conserve un accès exclusif à la caméra",
      "Interrupteur matériel ou touche de fonction (Fn) du clavier désactivant la caméra",
      "Pilote USB de la webcam corrompu ou obsolète"
    ],
    "checks": [
      "Inspectez physiquement l'objectif pour vérifier que le volet de sécurité est bien ouvert",
      "Vérifiez si un raccourci clavier (ex. Fn + F6) a désactivé la caméra",
      "Fermez complètement toutes les autres applications susceptibles d'utiliser la caméra",
      "Cliquez sur l'icône de cadenas dans la barre d'adresse du navigateur et accordez l'accès"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester mesure la résolution réelle, le débit d'images, le rendu des couleurs et la latence vidéo.",
      "links": [
        {
          "label": "Test de webcam",
          "testId": "webcam-test",
          "testPath": "/tests/webcam-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Rapport signal sur bruit (SNR) au niveau des photosites",
      "Anomalies de micrologiciel interne au contrôleur de la caméra"
    ],
    "actions": [
      "Autorisez la caméra dans la boîte de dialogue contextuelle du navigateur",
      "Vérifiez les paramètres de confidentialité sous Windows/macOS pour autoriser les applications web",
      "Mettez à jour ou réinstallez le pilote de la webcam dans le Gestionnaire de périphériques",
      "Reliez la caméra externe sur un autre port USB direct de l'ordinateur"
    ],
    "whenToStop": "Si la caméra apparaît dans le Gestionnaire de périphériques avec un code d'erreur 10 ou 43 sur plusieurs ordinateurs, elle est hors service."
  },
  {
    "id": "speaker-issues",
    "title": "Problèmes de haut-parleurs et de sortie audio",
    "category": "deviceInput",
    "categoryTitle": "Problèmes d'appareils et de saisie",
    "symptom": "Aucun son n'est émis, un seul côté fonctionne (gauche/droit) ou le son est saturé et grésille.",
    "possibleCauses": [
      "Mauvais périphérique de sortie audio sélectionné dans les réglages système",
      "Haut-parleurs éteints ou onglet du navigateur mis en sourdine",
      "Fiche jack 3,5 mm mal enclenchée au fond de la prise",
      "Balance audio stéréo décalée sur un seul côté",
      "Incohérence de fréquence d'échantillonnage dans le pilote audio (ex. 44,1 kHz vs 48 kHz)"
    ],
    "checks": [
      "Vérifiez le niveau de volume dans le système et sur les molettes des enceintes",
      "Vérifiez que le périphérique actif correspond bien à vos écouteurs ou enceintes",
      "Enfoncez fermement le connecteur jack 3,5 mm jusqu'au déclic",
      "Vérifiez que l'onglet du navigateur n'est pas coupé en sourdine"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester génère des ondes sinusoïdales pures, des balayages de fréquences et des tests de balance stéréo gauche/droite.",
      "links": [
        {
          "label": "Test de haut-parleurs",
          "testId": "speaker-test",
          "testPath": "/tests/speaker-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Taux de distorsion harmonique totale (THD) de l'étage amplificateur",
      "Dommages mécaniques sur la membrane ou la bobine mobile"
    ],
    "actions": [
      "Désignez le bon appareil par défaut dans les paramètres sonores du système",
      "Recentrez la balance audio (50% gauche / 50% droite)",
      "Mettez à jour les pilotes audio (ex. Realtek)",
      "Essayez un autre câble auxiliaire ou une autre paire d'écouteurs"
    ],
    "whenToStop": "Si la membrane émet des craquements mécaniques ou frotte à n'importe quel volume, le transducteur est déchiré ou grillé."
  },
  {
    "id": "microphone-issues",
    "title": "Problèmes de microphone et de captation sonore",
    "category": "deviceInput",
    "categoryTitle": "Problèmes d'appareils et de saisie",
    "symptom": "Le micro ne capte aucun son, la barre de niveau reste à zéro ou la voix est inaudible et couverte de souffle.",
    "possibleCauses": [
      "Autorisation du microphone révoquée dans le navigateur ou dans la sécurité du système",
      "Interrupteur matériel de coupure (Mute) enclenché sur le câble du casque",
      "Mauvais microphone sélectionné par défaut dans les paramètres sonores",
      "Niveau d'enregistrement du micro réglé sur 0 dans les propriétés audio",
      "Prise jack connectée dans le mauvais port (casque au lieu de micro)"
    ],
    "checks": [
      "Vérifiez le bouton physique de coupure du son sur le câble du micro",
      "Cliquez sur l'icône de cadenas dans la barre d'adresse et autorisez le micro",
      "Dans les paramètres audio de Windows, parlez pour voir si la jauge réagit",
      "Pour les casques à prise jack unique, veillez à utiliser l'adaptateur répartiteur en Y requis"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester affiche le niveau d'entrée instantané, le spectre fréquentiel et le monitoring en temps réel via Web Audio.",
      "links": [
        {
          "label": "Test de microphone",
          "testId": "microphone-test",
          "testPath": "/tests/microphone-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Bruit propre intrinsèque de la capsule en dB(A)",
      "Alimentation fantôme 48V sur les micros de studio XLR"
    ],
    "actions": [
      "Accordez les autorisations du microphone dans le navigateur et dans la confidentialité de Windows",
      "Sélectionnez le microphone approprié comme périphérique d'entrée par défaut",
      "Montez le niveau d'entrée à 80-100% et activez l'amplification du microphone si nécessaire",
      "Mettez à jour les pilotes audio de la carte mère"
    ],
    "whenToStop": "Si le microphone ne capte aucun signal sur aucun équipement ni sur aucun port, la capsule ou le câble sont coupés."
  },
{
  "id": "burn-in-image-retention",
  "title": "Marquage OLED (Burn-In), Rémanence d'Image et Ombres Fixes",
  "category": "pixels",
  "categoryTitle": "Problèmes de Pixels",
  "symptom": "Des contours fantômes de barres des tâches, logos ou fenêtres restent visibles en permanence sur la dalle.",
  "possibleCauses": [
    "Affichage d'éléments fixes à forte luminosité pendant de longues périodes",
    "Vieillissement asymétrique des sous-pixels OLED organiques",
    "Rémanence passagère sur les cristaux liquides LCD/IPS"
  ],
  "checks": [
    "Afficher des mires grises (5% et 50%) et des couleurs primaires pour révéler les ombres",
    "Vérifier si le phénomène s'atténue après 15 minutes de vidéo animée",
    "Consulter le compteur d'heures d'utilisation dans l'OSD"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester projette des fonds unis pour déceler les traces de marquage et évalue le risque via le Calculateur de Burn-In OLED.",
    "links": [
      {
        "label": "Test de Burn-In",
        "testId": "burn-in-test",
        "testPath": "/tests/burn-in-test"
      },
      {
        "label": "Calculateur Burn-In OLED",
        "testId": "oled-burn-in-calculator",
        "testPath": "/tools/oled-burn-in-calculator"
      },
      {
        "label": "Test Couleurs Pleines",
        "testId": "solid-color-test",
        "testPath": "/tests/solid-color-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Dégradation chimique de la couche électroluminescente"
  ],
  "actions": [
    "Lancer un cycle de nettoyage des pixels (Pixel Refresh) depuis l'OSD de l'écran",
    "Masquer automatiquement la barre des tâches et réduire la luminosité SDR",
    "Régler la veille automatique de l'écran après 5 minutes"
  ],
  "whenToStop": "Si l'ombre persiste après plusieurs nettoyages approfondis, le marquage est définitif."
},
{
  "id": "temporal-dithering-pixel-inversion",
  "title": "Dithering Temporel (FRC) et Scintillement d'Inversion",
  "category": "pixels",
  "categoryTitle": "Problèmes de Pixels",
  "symptom": "Fourmillement microscopique, tramage instable ou fatigue visuelle rapide sur les fonds gris.",
  "possibleCauses": [
    "La modulation FRC alterne rapidement les nuances pour simuler des couleurs",
    "Déséquilibre de tension VCOM lors de l'inversion de polarité des sous-pixels",
    "Dithering forcé par le pilote graphique sur les sorties 8 bits"
  ],
  "checks": [
    "Observer les grilles 1 pixel pour détecter des vibrations anormales",
    "Vérifier si le changement de fréquence (60Hz vs 120Hz) modifie l'effet",
    "Filmer l'écran au ralenti avec un smartphone"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester affiche des mires d'inversion de phase et des trames FRC pour isoler la modulation temporelle.",
    "links": [
      {
        "label": "Test d'Inversion de Pixels",
        "testId": "pixel-inversion-test",
        "testPath": "/tests/pixel-inversion-test"
      },
      {
        "label": "Test de Dithering Temporel",
        "testId": "temporal-dithering-test",
        "testPath": "/tests/temporal-dithering-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Tension matérielle exacte du potentiomètre VCOM"
  ],
  "actions": [
    "Modifier le taux de rafraîchissement dans les paramètres d'affichage",
    "Configurer la profondeur de couleur sur la valeur native de la dalle",
    "Privilégier les écrans certifiés sans FRC (dalles 8-bit ou 10-bit natives)"
  ],
  "whenToStop": "Interrompez l'utilisation dès l'apparition de maux de tête."
},
{
  "id": "color-calibration-issues",
  "title": "Calibration des Couleurs, Espaces Colorimétriques et Dérives",
  "category": "imageQuality",
  "categoryTitle": "Qualité d'Image",
  "symptom": "Couleurs criardes et fluo, tons chair verdâtres ou disparité des couleurs entre logiciels.",
  "possibleCauses": [
    "Écran large gamut (DCI-P3) sans émulation sRGB pour les contenus classiques",
    "Profil ICC défectueux ou mal assigné dans le système d'exploitation",
    "Réglage d'usine de la balance des blancs déséquilibré"
  ],
  "checks": [
    "Évaluer les teintes de référence pour repérer une saturation excessive",
    "Vérifier la neutralité du blanc sur toute la dalle",
    "Contrôler les profils colorimétriques dans les paramètres d'affichage"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester intègre des mires de gamut, des échantillons de justesse colorimétrique, des rampes de saturation et des cibles D65.",
    "links": [
      {
        "label": "Test d'Espace Colorimétrique",
        "testId": "color-gamut-test",
        "testPath": "/tests/color-gamut-test"
      },
      {
        "label": "Test de Précision des Couleurs",
        "testId": "color-accuracy-test",
        "testPath": "/tests/color-accuracy-test"
      },
      {
        "label": "Test de Température de Couleur",
        "testId": "color-temperature-test",
        "testPath": "/tests/color-temperature-test"
      },
      {
        "label": "Test de Saturation",
        "testId": "saturation-test",
        "testPath": "/tests/saturation-test"
      },
      {
        "label": "Test de Daltonisme",
        "testId": "color-blindness-test",
        "testPath": "/tests/color-blindness-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Mesure absolue de la dérive Delta E"
  ],
  "actions": [
    "Activer le mode d'émulation sRGB dans l'OSD du moniteur",
    "Calibrer l'écran avec une sonde colorimétrique matérielle",
    "Réinitialiser les filtres logiciels de sursaturation de la carte graphique"
  ],
  "whenToStop": "Pour la retouche photo professionnelle, utilisez une sonde physique dédiée."
},
{
  "id": "gamma-black-crush-blown-whites",
  "title": "Noirs Bouchés, Blancs Brûlés et Déformation Gamma",
  "category": "imageQuality",
  "categoryTitle": "Qualité d'Image",
  "symptom": "Les détails sombres disparaissent dans un noir uniforme (Black Crush) ou les hautes lumières sont délavées sans nuance.",
  "possibleCauses": [
    "Courbe gamma éloignée du standard 2.2",
    "Conflit de plage dynamique HDMI (Limité 16-235 vs Complète 0-255)",
    "Réglage de contraste trop élevé tronquant les paliers de blanc"
  ],
  "checks": [
    "Inspecter le Test de Niveau de Noir : les pavés 1 à 5 sont-ils visibles ?",
    "Inspecter le Test de Niveau de Blanc : les carrés 250 à 254 se détachent-ils ?",
    "Aligner la mire de Gamma sur la cible 2.2"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester présente des rampes de gris complètes, des mires de dégradés profonds et des mires optiques pour régler le gamma.",
    "links": [
      {
        "label": "Test Niveau de Noir",
        "testId": "black-level-test",
        "testPath": "/tests/black-level-test"
      },
      {
        "label": "Test Niveau de Blanc",
        "testId": "white-level-test",
        "testPath": "/tests/white-level-test"
      },
      {
        "label": "Test Niveaux de Gris",
        "testId": "grayscale-test",
        "testPath": "/tests/grayscale-test"
      },
      {
        "label": "Test de Gamma",
        "testId": "gamma-test",
        "testPath": "/tests/gamma-test"
      },
      {
        "label": "Test Mode Sombre",
        "testId": "dark-mode-test",
        "testPath": "/tests/dark-mode-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Précision interne de la table LUT de l'écran"
  ],
  "actions": [
    "Régler la plage dynamique HDMI sur 'Complète (0-255)' dans le pilote GPU",
    "Abaisser le contraste dans l'OSD de l'écran pour distinguer les nuances claires",
    "Choisir le profil 'Gamma 2.2' dans les réglages du moniteur"
  ],
  "whenToStop": "Arrêtez dès que les premiers pas de gris et les derniers pas de blanc sont visibles."
},
{
  "id": "oled-abl-blooming-hdr-peak",
  "title": "Atténuation ABL sur OLED et Effet de Halo (Blooming) Mini-LED",
  "category": "imageQuality",
  "categoryTitle": "Qualité d'Image",
  "symptom": "L'écran s'assombrit lors de l'agrandissement de fenêtres claires ou des halos lumineux bavent autour des éléments contrastés.",
  "possibleCauses": [
    "L'ABL bride la luminosité globale en cas d'affichage blanc important",
    "Les zones de rétroéclairage Mini-LED débordent autour des petits points lumineux",
    "Mauvais étalonnage du tone mapping HDR"
  ],
  "checks": [
    "Faire varier la taille des fenêtres de 1% à 100% pour mesurer l'atténuation",
    "Examiner des objets blancs en mouvement sur fond noir pour quantifier les halos",
    "Comparer la luminosité d'une petite fenêtre à celle du plein écran"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester mesure la chute de luminosité liée à l'ABL et met en évidence les halos des zones de rétroéclairage Mini-LED.",
    "links": [
      {
        "label": "Test OLED ABL",
        "testId": "oled-abl-test",
        "testPath": "/tests/oled-abl-test"
      },
      {
        "label": "Test Luminosité Pointe HDR",
        "testId": "hdr-peak-brightness-test",
        "testPath": "/tests/hdr-peak-brightness-test"
      },
      {
        "label": "Test de Blooming",
        "testId": "blooming-test",
        "testPath": "/tests/blooming-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Luminance mesurée en nits sans sonde"
  ],
  "actions": [
    "Activer l'option 'Luminosité Uniforme' dans l'OSD de l'écran OLED",
    "Régler le Local Dimming Mini-LED sur 'Moyen' pour atténuer les halos",
    "Étalonner la luminosité de crête dans l'application Windows HDR Calibration"
  ],
  "whenToStop": "Le blooming est inhérent à la technologie LCD Full Array ; seul l'OLED en est totalement exempt."
},
{
  "id": "response-time-motion-blur-crosstalk",
  "title": "Temps de Réponse Lent, Flou de Mouvement et Strobe Crosstalk",
  "category": "display",
  "categoryTitle": "Problèmes d'Affichage",
  "symptom": "Les objets en mouvement rapide laissent des traînées sombres ou des halos brillants (overshoot / reverse ghosting).",
  "possibleCauses": [
    "Temps de transition Gray-to-Gray (GtG) trop lent sur les transitions sombres",
    "Overdrive poussé au maximum provoquant un dépassement de tension des pixels",
    "Déphasage entre l'impulsion stroboscopique et le balayage de la dalle LCD"
  ],
  "checks": [
    "Observer les blocs de transition GtG pour repérer les bavures sombres",
    "Identifier si la traînée est sombre (ghosting classique) ou lumineuse (dépassement)",
    "Contrôler le dédoublement de l'image en haut et en bas de l'écran avec rétroéclairage pulsé"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester met à disposition des mires animées calibrées, des blocs de transition de couleur et des repères pour caméra de poursuite.",
    "links": [
      {
        "label": "Test Temps de Réponse GtG",
        "testId": "gtg-response-time-test",
        "testPath": "/tests/gtg-response-time-test"
      },
      {
        "label": "Test Strobe Crosstalk",
        "testId": "strobe-crosstalk-test",
        "testPath": "/tests/strobe-crosstalk-test"
      },
      {
        "label": "Test Caméra de Poursuite",
        "testId": "pursuit-camera-test",
        "testPath": "/tests/pursuit-camera-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Courbes de tension à l'oscilloscope"
  ],
  "actions": [
    "Régler l'Overdrive dans l'OSD sur 'Normal' ou 'Rapide' plutôt qu''Extrême'",
    "Ajuster la phase de stroboscopie dans les menus de netteté en mouvement",
    "Faire correspondre le taux d'images par seconde avec le taux de rafraîchissement"
  ],
  "whenToStop": "Arrêtez dès que les halos parasites blancs disparaissent."
},
{
  "id": "input-lag-gaming-responsiveness",
  "title": "Input Lag Élevé, Souris Spongieuse et Latence de Jeu",
  "category": "display",
  "categoryTitle": "Problèmes d'Affichage",
  "symptom": "Sensation de lourdeur du curseur qui semble glisser avec un temps de retard par rapport à la main.",
  "possibleCauses": [
    "Traitements d'amélioration d'image actifs dans l'écran ou le téléviseur",
    "V-Sync traditionnel empilant plusieurs images en mémoire tampon",
    "Taux d'interrogation de la souris trop faible (125Hz)"
  ],
  "checks": [
    "Tester le polling rate de la souris dans Screen Tester (500Hz ou 1000Hz recommandé)",
    "Passer le test de temps de réaction et d'input lag",
    "Vérifier l'activation du 'Mode Jeu' dans le menu de l'écran"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester quantifie la fréquence USB de la souris, le réflexe visuel au clic et le débit d'images WebGL.",
    "links": [
      {
        "label": "Test d'Input Lag",
        "testId": "input-lag-test",
        "testPath": "/tests/input-lag-test"
      },
      {
        "label": "Test Temps de Réaction",
        "testId": "reaction-time-test",
        "testPath": "/tests/reaction-time-test"
      },
      {
        "label": "Test Fréquence Souris",
        "testId": "mouse-polling-test",
        "testPath": "/tests/mouse-polling-test"
      },
      {
        "label": "Test Benchmark GPU",
        "testId": "gpu-benchmark-test",
        "testPath": "/tests/gpu-benchmark-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Mesure directe matériel bouton-écran"
  ],
  "actions": [
    "Activer le 'Mode Jeu' sur l'écran pour court-circuiter le traitement vidéo",
    "Désactiver la V-Sync standard au profit de Nvidia Reflex ou AMD Anti-Lag",
    "Régler la souris sur 1000Hz dans son logiciel constructeur"
  ],
  "whenToStop": "Un délai inférieur à 15 ms assure une réactivité quasi instantanée."
},
{
  "id": "dual-monitor-color-mismatch",
  "title": "Différence de Couleur Multi-Écrans et Alignement",
  "category": "display",
  "categoryTitle": "Problèmes d'Affichage",
  "symptom": "Deux écrans côte à côte affichent des blancs dissemblables ou des contrastes discordants lors du passage d'une fenêtre de l'un à l'autre.",
  "possibleCauses": [
    "Technologies de dalles différentes (IPS combiné à un VA ou OLED)",
    "Températures de couleur d'usine hétérogènes",
    "Formats de sortie vidéo différents dans les paramètres graphiques"
  ],
  "checks": [
    "Étendre une fenêtre blanche sur les deux écrans pour repérer la cassure colorimétrique",
    "Exécuter l'outil Comparer les Écrans en parallèle",
    "Vérifier le format de couleur (RGB Complet) dans le panneau GPU"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester synchronise des mires de comparaison et intègre l'outil Dual Monitor Matcher.",
    "links": [
      {
        "label": "Comparer les Écrans",
        "testId": "compare-displays",
        "testPath": "/tests/compare-displays"
      },
      {
        "label": "Mire Personnalisée",
        "testId": "custom-pattern",
        "testPath": "/tests/custom-pattern"
      },
      {
        "label": "Dual Monitor Matcher",
        "testId": "dual-monitor-matcher",
        "testPath": "/tools/dual-monitor-matcher"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Différences de spectre d'émission entre dalles"
  ],
  "actions": [
    "Utiliser l'outil Dual Monitor Matcher pour caler les gains RGB du second écran",
    "Régler les deux moniteurs sur '6500K' ou 'Chaud'",
    "Harmoniser les niveaux de luminosité"
  ],
  "whenToStop": "L'ajustement est satisfaisant lorsque le regard passe d'un écran à l'autre sans gêne visuelle."
},
{
  "id": "gamepad-controller-issues",
  "title": "Drift de Manette, Latence des Boutons et Zones Mortes",
  "category": "deviceInput",
  "categoryTitle": "Problèmes de Périphériques",
  "symptom": "Les joysticks de la manette bougent tout seuls (stick drift) ou les boutons répondent avec du retard.",
  "possibleCauses": [
    "Usure mécanique des potentiomètres des sticks analogiques",
    "Zone morte configurée trop petite dans les jeux",
    "Interférences Bluetooth créant des pertes de paquets"
  ],
  "checks": [
    "Ouvrir le Test de Manette et appuyer sur une touche pour réveiller l'API",
    "Vérifier si les coordonnées reviennent à (0.00, 0.00) au repos",
    "Tester la progressivité des gâchettes analogiques de 0 à 100%"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester exploite l'API Gamepad pour mesurer le drift, l'état des boutons et tester les moteurs de vibration.",
    "links": [
      {
        "label": "Test de Manette",
        "testId": "gamepad-test",
        "testPath": "/tests/gamepad-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Usure chimique des pistes en graphite"
  ],
  "actions": [
    "Augmenter la zone morte centrale dans les réglages du jeu",
    "Appliquer un nettoyant contact électronique ou passer à des joysticks à effet Hall",
    "Privilégier une connexion USB filaire"
  ],
  "whenToStop": "Un drift dépassant 15% au repos nécessite la réparation ou le remplacement du joystick."
},
{
  "id": "audio-video-sync-latency",
  "title": "Désynchronisation Audio-Vidéo et Décalage Sonore Bluetooth",
  "category": "deviceInput",
  "categoryTitle": "Problèmes de Périphériques",
  "symptom": "Décalage entre les mouvements de lèvres et la parole ou retard des bruitages en jeu.",
  "possibleCauses": [
    "Latence inhérente aux liaisons Bluetooth SBC/AAC (150 à 250 ms)",
    "Retard de traitement sur barre de son ou amplificateur HDMI eARC",
    "Filtres de son spatial dans le système d'exploitation"
  ],
  "checks": [
    "Vérifier si le bip sonore coïncide avec le repère visuel dans le test Audio Sync",
    "Consulter la latence de base dans le test de Latence Audio",
    "Comparer un casque sans fil avec un modèle filaire"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester combine des éclairs visuels et des signaux audio transitoires pour mesurer le décalage.",
    "links": [
      {
        "label": "Test Audio Sync",
        "testId": "audio-sync-test",
        "testPath": "/tests/audio-sync-test"
      },
      {
        "label": "Test Latence Audio",
        "testId": "audio-latency-test",
        "testPath": "/tests/audio-latency-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Propagation acoustique de l'air dans la pièce"
  ],
  "actions": [
    "Adopter une connexion filaire ou radio 2.4 GHz pour le jeu compétitif",
    "Régler le délai audio (Lip-Sync) dans les paramètres du téléviseur ou de la barre de son",
    "Désactiver les effets d'égalisation logicielle"
  ],
  "whenToStop": "Un décalage de moins de 40 ms est indétectable par l'oreille humaine."
},
{
  "id": "sensor-ambient-battery-hardware",
  "title": "Capteur de Luminosité Ambiante, Économie d'Énergie et Débit Réseau",
  "category": "deviceInput",
  "categoryTitle": "Problèmes de Périphériques",
  "symptom": "L'écran s'assombrit inopinément sur PC portable, le taux de rafraîchissement chute sur batterie ou la vidéo saccade.",
  "possibleCauses": [
    "Capteur de lumière ambiante ajustant automatiquement la luminosité",
    "Le mode économie d'énergie du système bride les performances graphiques et impose 60Hz",
    "Gigue Wi-Fi élevée provoquant des pertes de paquets"
  ],
  "checks": [
    "Masquer le capteur de lumière du PC portable pour observer la réaction dans Screen Tester",
    "Débrancher l'alimentation secteur pour contrôler la fréquence d'affichage",
    "Lancer le test réseau pour mesurer la gigue et la bande passante"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester mesure les lux du capteur ambiant, l'état de décharge de la batterie et les performances réseau.",
    "links": [
      {
        "label": "Test Capteur Ambiant",
        "testId": "ambient-light-test",
        "testPath": "/tests/ambient-light-test"
      },
      {
        "label": "Test Batterie",
        "testId": "battery-test",
        "testPath": "/tests/battery-test"
      },
      {
        "label": "Test Vitesse Réseau",
        "testId": "network-speed-test",
        "testPath": "/tests/network-speed-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Usure chimique des cellules de la batterie"
  ],
  "actions": [
    "Désactiver la luminosité automatique dans les paramètres d'affichage",
    "Choisir le mode d'alimentation 'Meilleures performances' sur batterie",
    "Utiliser le Wi-Fi 5GHz/6GHz ou un câble Ethernet"
  ],
  "whenToStop": "La stabilité est assurée lorsque la fréquence d'affichage reste constante."
},
{
  "id": "monitor-setup-bandwidth-calibration",
  "title": "Bande Passante du Câble, Mise à l'Échelle DPI et Réglages OSD",
  "category": "display",
  "categoryTitle": "Problèmes d'Affichage",
  "symptom": "Fréquence maximale inaccessible en 4K, textes trop petits ou coupures d'affichage sporadiques.",
  "possibleCauses": [
    "Câble vidéo saturé en bande passante (ex. câble HDMI 2.0 pour du 4K 144Hz)",
    "Facteur d'échelle DPI inadapté fatiguant la vue ou rendant les textes flous",
    "Réglages d'usine OSD non optimisés"
  ],
  "checks": [
    "Vérifier le débit requis via le Calculateur de Bande Passante DisplayPort/HDMI",
    "Contrôler la distance de recul recommandée avec le Calculateur de Distance",
    "Suivre l'Assistant Nouvel Écran pour paramétrer le moniteur"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester inclut des outils de calcul de bande passante, de densité PPI, de distance ergonomique et de certification d'affichage.",
    "links": [
      {
        "label": "Assistant Nouvel Écran",
        "testId": "new-monitor-wizard",
        "testPath": "/tools/new-monitor-wizard"
      },
      {
        "label": "Calculateur DPI",
        "testId": "dpi-calculator",
        "testPath": "/tools/dpi-calculator"
      },
      {
        "label": "Calculateur Bande Passante",
        "testId": "display-bandwidth-calculator",
        "testPath": "/tools/display-bandwidth-calculator"
      },
      {
        "label": "Calculateur Distance de Recul",
        "testId": "viewing-distance-calculator",
        "testPath": "/tools/viewing-distance-calculator"
      },
      {
        "label": "Enregistreur d'Écran",
        "testId": "screen-recorder",
        "testPath": "/tools/screen-recorder"
      },
      {
        "label": "Certificat d'Écran",
        "testId": "display-certificate",
        "testPath": "/tools/display-certificate"
      },
      {
        "label": "Guide Calibrage OSD",
        "testId": "osd-calibration-guide",
        "testPath": "/tools/osd-calibration-guide"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Blindage physique du câble en cuivre"
  ],
  "actions": [
    "Passer à un câble certifié DisplayPort 1.4/2.1 ou HDMI 2.1 Ultra High Speed",
    "Régler la mise à l'échelle Windows selon les PPI calculés",
    "Appliquer le Guide de Calibration OSD pour parfaire les réglages"
  ],
  "whenToStop": "L'écran fonctionne à sa résolution native et fréquence maximale sans scintillement."
},
{
  "id": "eink-ghosting-slow-refresh",
  "title": "Ghosting sur Écran E-Ink et Rémanence de Texte Résiduelle",
  "category": "imageQuality",
  "categoryTitle": "Qualité d'Image",
  "symptom": "Des ombres grises de pages précédentes restent gravées en arrière-plan sur la liseuse.",
  "possibleCauses": [
    "Charges électrostatiques résiduelles bloquant les microcapsules",
    "Utilisation de modes de rafraîchissement rapide sans cycle complet",
    "Température ambiante trop basse ralentissant le fluide"
  ],
  "checks": [
    "Vérifier la pureté du fond blanc par rapport aux textes affichés",
    "Lancer l'Outil de Rafraîchissement E-Ink dans Screen Tester",
    "S'assurer que la température ambiante est d'au moins 18°C"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester envoie des flashs d'inversion noir/blanc successifs pour réaligner les microcapsules.",
    "links": [
      {
        "label": "Outil de Rafraîchissement E-Ink",
        "testId": "eink-refresh-tool",
        "testPath": "/tools/eink-refresh-tool"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Tables d'ondes propriétaires du microcontrôleur"
  ],
  "actions": [
    "Déclencher 3 à 5 cycles de flashs noirs et blancs avec l'outil de rafraîchissement",
    "Programmer un rafraîchissement complet toutes les 5 à 10 pages sur votre liseuse",
    "Activer le mode qualité (Regal) pour la lecture de livres"
  ],
  "whenToStop": "Le ghosting disparaît complètement dès que les pigments sont réinitialisés."
}
];
