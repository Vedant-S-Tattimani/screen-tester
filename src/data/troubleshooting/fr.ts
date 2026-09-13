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
  }
];
