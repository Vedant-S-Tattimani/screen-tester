import { InspectionWorkflow } from "./types";

export const DE_INSPECTION_WORKFLOWS: InspectionWorkflow[] = [
  {
    "id": "general",
    "route": "/monitor-inspection/general",
    "title": "Allgemeine Display-Prüfung",
    "shortDescription": "Grundlegender Rundum-Check für jeden Bildschirm.",
    "longDescription": "Eine ausgewogene, essenzielle Diagnosesequenz zur Überprüfung jedes Desktop-Monitors, Laptop-Bildschirms oder externen Displays auf Pixelfehler, Farbtreue, Helligkeit, Kontrast, Bildhomogenität und Bildwiederholfrequenz.",
    "inspectionTip": "Stellen Sie Ihr Display vor Beginn der Prüfung auf die native Auflösung und empfohlene Skalierung ein.",
    "browserLimitations": "Browserbasierte Tests prüfen clientseitig gerenderte Testmuster und können interne Netzteilspannungen oder physikalische Videoeingänge nicht direkt messen.",
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
        "title": "Auflösung & Display-Info",
        "description": "Native Auflösung, DPR-Skalierung und Anzeigeparameter überprüfen."
      },
      {
        "title": "Pixelfehler-Finder",
        "description": "Vollflächige Farbfelder durchlaufen, um tote oder festsitzende Subpixel aufzuspüren."
      },
      {
        "title": "Bildschirm-Gleichmäßigkeit",
        "description": "Neutrale Graustufen und Farbflächen auf Wolkenbildung oder Vignettierung prüfen."
      },
      {
        "title": "Near-Black Schattendetails",
        "description": "Dunkle Tonwertabstufungen und Schattendurchzeichnung nahe echtem Schwarz testen."
      },
      {
        "title": "Farbverläufe & Banding",
        "description": "Fließende Farbübergänge von Schwarz nach Weiß auf Banding-Artefakte untersuchen."
      },
      {
        "title": "Textschärfe & Subpixel",
        "description": "Schriftkantenglättung und Subpixel-Randschärfe über verschiedene Schriftgrößen hinweg bewerten."
      },
      {
        "title": "Skalierung & Seitenverhältnis",
        "description": "Kreise und Quadratgitter auf geometrische Verzerrungen prüfen."
      },
      {
        "title": "Ghosting & Bewegungsunschärfe",
        "description": "Reaktionszeit der Pixel anhand bewegter Kontrastblöcke beurteilen."
      },
      {
        "title": "Bildwiederholfrequenz & Timing",
        "description": "Browser-Animations-Timing mit der Bildwiederholfrequenz des Panels abgleichen."
      }
    ]
  },
  {
    "id": "used",
    "route": "/monitor-inspection/used",
    "title": "Gebrauchtmonitor-Inspektion",
    "shortDescription": "Gezielte Prüfung mit Notizen und Bericht, optimiert vor dem Kauf eines gebrauchten Monitors.",
    "longDescription": "Ein gründlicher Prüfablauf speziell zur Beurteilung gebrauchter oder generalüberholter Monitore. Untersucht systematisch Hardware-Parameter, Pixelfehler, Helligkeitsverschleiß, Farbtreue und Bewegungsschärfe und erfasst alle Befunde direkt in einem Prüfbericht.",
    "inspectionTip": "Stellen Sie die Helligkeit beim Prüfen eines Gebrauchtgeräts auf 100%, um Einbrennmuster, ungleichmäßige LED-Alterung und Gehäusedruckschäden sichtbar zu machen.",
    "browserLimitations": "Betriebsstunden und interne Temperatursensoren können nur über das werksseitige Servicemenü des Monitors via Gehäusetasten eingesehen werden.",
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
        "title": "1. Display-Informationen",
        "description": "Vom Browser gemeldete Parameter, Farbtiefe und Grafikfunktionen abfragen."
      },
      {
        "title": "2. Auflösung & Geometrie",
        "description": "Native Auflösung, Skalierungsfaktor (DPR) und Desktop-Viewport überprüfen."
      },
      {
        "title": "3. Tote Pixel",
        "description": "Weiße und Primärfarbfelder auf inaktive, schwarze Subpixel untersuchen."
      },
      {
        "title": "4. Festsitzende Pixel",
        "description": "Dunkle Felder auf permanent leuchtende Subpixel kontrollieren."
      },
      {
        "title": "5. Farbwiedergabe",
        "description": "RGB- und CMY-Flächen auf Farbverschiebungen oder Kanaldegradation prüfen."
      },
      {
        "title": "6. Helligkeit & Schattentrennung",
        "description": "Prüfen, ob die Hintergrundbeleuchtung ausreichend Leuchtkraft liefert."
      },
      {
        "title": "7. Bildschirm-Gleichmäßigkeit",
        "description": "Grauflächen auf LED-Alterung, Randabschattung oder Vergilbung testen."
      },
      {
        "title": "8. Backlight Bleed & Rahmenspannung",
        "description": "Im abgedunkelten Raum auf Gehäusedruck und Lichtlecks an den Kanten achten."
      },
      {
        "title": "9. Ghosting & Reaktionszeit",
        "description": "Schlierenbildung und Overdrive-Performance bei Bewegtbildern beurteilen."
      },
      {
        "title": "10. Bildwiederholfrequenz-Stabilität",
        "description": "Sicherstellen, dass das Panel ohne Mikroruckler mit der Nennfrequenz läuft."
      },
      {
        "title": "11. Inspektionsnotizen",
        "description": "Äußeren Zustand, Gehäusekratzer und visuelle Befunde im Bericht festhalten."
      },
      {
        "title": "12. Abschließender Prüfbericht",
        "description": "Einen druckbaren und exportierbaren Gesamtbericht mit allen Resultaten erstellen."
      }
    ]
  },
  {
    "id": "gaming",
    "route": "/monitor-inspection/gaming",
    "title": "Gaming-Display-Inspektion",
    "shortDescription": "Prüfung von Bildwiederholfrequenz, Ghosting, Overdrive, Tearing, Black Smearing, HDR und Bewegung.",
    "longDescription": "Ein spezialisierter Prüfpfad für Monitore mit hoher Bildwiederholrate (120Hz, 144Hz, 240Hz, 360Hz+). Bewertet Synchronisation, Ghosting, Overdrive-Overshoot (inverses Ghosting), Screen Tearing, VA Black Smearing, Flimmern und HDR-Verhalten.",
    "inspectionTip": "Testen Sie den Monitor bei maximaler Bildwiederholrate zuerst mit Overdrive auf 'Normal', bevor Sie 'Extrem/Schnell' testen, um Pixel-Overshoot-Halos zu erkennen.",
    "browserLimitations": "Dynamische variable Frameraten (G-Sync/FreeSync) erfordern native DirectX/Vulkan-Spiele, um das Verhalten bei schwankenden Bildraten im Grenzbereich zu testen.",
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
        "title": "VRR & Adaptive Sync Prüfung",
        "description": "Gleichmäßigkeit des Frame-Pacings bei wechselnder Belastung beobachten."
      },
      {
        "title": "Screen Tearing & V-Sync",
        "description": "Bildrisse bei schnellen horizontalen und vertikalen Bewegungen prüfen."
      },
      {
        "title": "Bildwiederholfrequenz-Verifikation",
        "description": "Browser requestAnimationFrame-Timing gegen die native Gaming-Frequenz benchen."
      },
      {
        "title": "Ghosting, Overdrive & Black Smearing",
        "description": "Pixelreaktionszeiten, Überschwing-Halos und VA-Schwarzwert-Schlieren bewerten."
      },
      {
        "title": "Visuelle HDR-Prüfung",
        "description": "Spitzenhelligkeit, Highlight-Clipping und Farbraumdarstellung untersuchen."
      },
      {
        "title": "Text- & HUD-Schärfe",
        "description": "Lesbarkeit kleiner Schriften und HUD-Elemente im Spiel überprüfen."
      }
    ]
  },
  {
    "id": "oled",
    "route": "/monitor-inspection/oled",
    "title": "OLED-Display-Inspektion",
    "shortDescription": "Near-Black-Felder, Gleichmäßigkeit, Banding, Nachleuchten, Einbrennen, HDR und Bewegungsschärfe prüfen.",
    "longDescription": "Ein spezialisierter Diagnoseablauf für selbstleuchtende OLED-, QD-OLED- und WOLED-Panels. Bewertet Near-Black-Farbabstufungen, vertikales Banding, Bildhomogenität, temporäres Nachleuchten vs. permanentes Einbrennen, HDR-Dynamikumfang und Bewegungsschärfe.",
    "inspectionTip": "Betrachten Sie dunkelgraue Muster (1%, 2%, 5% Grau) in einem vollkommen abgedunkelten Raum, um vertikales Banding ohne Reflexionen zu beurteilen.",
    "browserLimitations": "Der OLED-ABL (Automatic Brightness Limiter) dimmt große weiße Browserfenster ab; die Messung von Einbrenneffekten im Labor erfordert optische Leuchtdichtemessgeräte.",
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
        "title": "Near-Black & Schattendurchzeichnung",
        "description": "0,25% bis 5% Graustufen prüfen, um feine Schattendetails und OLED-Einschaltverhalten zu testen."
      },
      {
        "title": "Leuchtdichte & Dunkel-Gleichmäßigkeit",
        "description": "Gleichmäßigkeit auf 5%, 20% und 50% Grauflächen auf vertikales Banding untersuchen."
      },
      {
        "title": "HDR & Spitzenglanzlichter",
        "description": "Breite Farbraumdarstellung und Highlight-Roll-off ohne ABL-Clipping kontrollieren."
      },
      {
        "title": "Textdarstellung & Subpixelstruktur",
        "description": "Subpixel-Schriftrendering (RGB/WRGB/QD-OLED) auf Farbsäume an Kanten prüfen."
      },
      {
        "title": "Sample-and-Hold Bewegungsschärfe",
        "description": "Sofortige OLED-Schaltzeiten im Vergleich zur Augenfolgebewegungs-Unschärfe beobachten."
      },
      {
        "title": "Subpixel-Ausfall & Einbrenn-Check",
        "description": "Farbflächen auf inaktive Emitter oder statische Schattenmuster prüfen."
      }
    ]
  },
  {
    "id": "laptop",
    "route": "/monitor-inspection/laptop",
    "title": "Laptop-Display-Inspektion",
    "shortDescription": "Auflösung, Helligkeit, Gleichmäßigkeit, Farbe, Textdarstellung, Bildwiederholrate und HDR prüfen.",
    "longDescription": "Ein fokussierter Prüfablauf für integrierte Laptop-Bildschirme (MacBook Retina, Windows Ultrabooks, Gaming-Laptops). Überprüft High-DPI-Skalierung, maximale Helligkeitsreserven, Panelseiten-Uniformität, Farbtreue, ClearType-Textschärfe und HDR.",
    "inspectionTip": "Schließen Sie den Laptop an das Netzteil an und deaktivieren Sie automatische Helligkeitssensoren, damit Energiesparprofile die Helligkeit während des Tests nicht drosseln.",
    "browserLimitations": "Farbraumabdeckungen in Prozent (z. B. 100% sRGB oder DCI-P3) sind Panel-Eigenschaften, die ein Hardware-Kolorimeter zur exakten Vermessung erfordern.",
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
        "title": "Auflösung & High-DPI Skalierung",
        "description": "Viewport-Skalierung, Device Pixel Ratio (DPR) und native Panel-Auflösung prüfen."
      },
      {
        "title": "Helligkeit & Dynamikumfang",
        "description": "Maximale Helligkeitsausgabe und Schattenschritte für Innen-/Außeneinsatz testen."
      },
      {
        "title": "Gleichmäßigkeit & Rahmenspannung",
        "description": "Auf Rahmendruckstellen, Randlichtlecks oder dunklere Ecken untersuchen."
      },
      {
        "title": "Farbleuchtkraft & Homogenität",
        "description": "Primär- und Sekundärfarbfelder auf gleichmäßige Darstellung prüfen."
      },
      {
        "title": "Textdarstellung & Subpixel-Schärfe",
        "description": "Subpixel-Schriftglättung (ClearType) über verschiedene Schriftgrößen (8px–24px) testen."
      },
      {
        "title": "Bildwiederholfrequenz-Prüfung",
        "description": "Sicherstellen, dass hohe Bildwiederholraten (90Hz, 120Hz ProMotion, 144Hz+) aktiv sind."
      },
      {
        "title": "HDR & Breiter Farbraum",
        "description": "HDR-Fähigkeit und Farbraumunterstützung auf kompatiblen Laptop-Panels testen."
      }
    ]
  },
  {
    "id": "new",
    "route": "/monitor-inspection/new",
    "title": "Neumonitor-Inspektion",
    "shortDescription": "Wichtige Prüfungen vor dem ersten Einsatz und innerhalb der Rückgabefrist.",
    "longDescription": "Eine umfassende Verifikations-Checkliste zur Inspektion neu gekaufter Monitore auf Fertigungsmängel, Pixelfehler, Lichthöfe und Panel-Leistung, bevor die Rückgabefrist des Händlers abläuft.",
    "inspectionTip": "Prüfen Sie sowohl in einem hellen Raum (auf Panel-Finish, Reflexionen und Mikrokratzer) als auch in einem völlig abgedunkelten Raum (auf Backlight Bleed und IPS Glow).",
    "browserLimitations": "Browser können physische Anschlüsse (DisplayPort, HDMI, USB-C Power Delivery) oder proprietäre Hardware-G-Sync-Module nicht direkt testen. Führen Sie auch manuelle Kabeltests durch.",
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
        "title": "Auflösung & Display-Fähigkeiten",
        "description": "Native Auflösung, Device Pixel Ratio und gemeldete Bildwiederholrate prüfen."
      },
      {
        "title": "Textschärfe & Subpixel-Klarheit",
        "description": "Textdarstellung, Kantenglättung und Schärfeeinstellungen ohne Artefakte beurteilen."
      },
      {
        "title": "Pixelfehler-Check",
        "description": "Primärfarbfelder durchlaufen, um inaktive, schwarze Subpixel aufzuspüren."
      },
      {
        "title": "Festsitzende Pixel prüfen",
        "description": "Auf permanent leuchtende Subpixel prüfen, die sich nicht abschalten."
      },
      {
        "title": "Vollfarb-Gleichmäßigkeit",
        "description": "Rot-, Grün-, Blau-, Cyan-, Magenta- und Gelbfelder über das gesamte Panel testen."
      },
      {
        "title": "Graustufen-Gradienten",
        "description": "Farbübergänge von 0% bis 100% Leuchtdichte ohne sichtbare Streifenbildung prüfen."
      },
      {
        "title": "Helligkeit & Dynamikumfang",
        "description": "Unterscheidbarkeit der Leuchtdichtestufen von Schwarz bis Weiß sicherstellen."
      },
      {
        "title": "Kontrastabstufungen",
        "description": "Klare Trennung aller kontrastierten Referenzfelder überprüfen."
      },
      {
        "title": "Schwarzwert-Clipping",
        "description": "Schwarzwert so einstellen, dass dunkle Schatten nicht im Schwarz absaufen."
      },
      {
        "title": "Weißwert-Clipping",
        "description": "Kontrast so abstimmen, dass helle Lichter nicht ins Weiß ausbrennen."
      },
      {
        "title": "Leuchtdichte-Gleichmäßigkeit",
        "description": "Auf Wolkenbildung, Vignettierung oder Schmutzeffekte auf Grauflächen achten."
      },
      {
        "title": "Backlight Bleed & IPS Glow",
        "description": "Im Dunkeln testen, um Randlichtlecks von blickwinkelabhängigem IPS Glow zu trennen."
      },
      {
        "title": "Ghosting & Pixel-Reaktionszeit",
        "description": "Bewegte Kontrastmuster beobachten, um Schlierenbildung festzustellen."
      },
      {
        "title": "Bildwiederholrate & Frame-Timing",
        "description": "Browser requestAnimationFrame-Timing mit der Monitorfrequenz abgleichen."
      },
      {
        "title": "HDR & Breiter Farbraum",
        "description": "HDR-Meldungen des Betriebssystems und DCI-P3-Farbraumunterstützung prüfen."
      }
    ]
  },
  {
    "id": "tv",
    "route": "/monitor-inspection/tv",
    "title": "TV-Display-Inspektion",
    "shortDescription": "Displayqualität, Local Dimming und Performance Ihres Fernsehers prüfen.",
    "longDescription": "Ein spezialisiertes Testpaket für Wohnzimmer-Fernseher und Großbildschirme, die über HDMI angeschlossen sind. Identifiziert Local-Dimming-Blooming, Dirty Screen Effect (DSE), 24p-Ruckeln, Overscan-Beschnitt und HDR-Verarbeitung.",
    "inspectionTip": "Stellen Sie den Bildmodus Ihres Fernsehers auf 'PC', 'Spiel' oder 'Filmmaker' und das Bildformat auf 'Just Scan' / '1:1', um künstliche Nachschärfung und Overscan-Beschnitt zu deaktivieren.",
    "browserLimitations": "Bildverbesserer des Fernsehers (wie Zwischenbildberechnung / Soap-Opera-Effekt) müssen direkt im Einstellungsmenü des Fernsehers konfiguriert werden.",
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
        "title": "Visuelle HDR-Prüfung",
        "description": "Highlight-Roll-off bei hohem Dynamikumfang und breite Farbraumwiedergabe testen."
      },
      {
        "title": "Near-Black Schattendetails",
        "description": "HDMI-Schwarzwert prüfen, um Schattenquetschen oder aufgehelltes Schwarz zu vermeiden."
      },
      {
        "title": "Gleichmäßigkeit & Dirty Screen Effect",
        "description": "Über Graufelder schwenken, um vertikale Streifen oder dunkle Flecken zu erkennen."
      },
      {
        "title": "TV-Overscan & 1:1 Pixelmapping",
        "description": "Vollständige 4K/1080p-Ausgabe ohne Kantenbeschnitt durch Overscan sicherstellen."
      },
      {
        "title": "Seitenverhältnis & Skalierungsgeometrie",
        "description": "Bestätigen, dass Kreis- und Quadratmuster korrekte Proportionen behalten."
      },
      {
        "title": "Wohnzimmer-Blickwinkel",
        "description": "Farb- und Kontrastabfall aus seitlichen Sitzpositionen beurteilen."
      }
    ]
  }
];
