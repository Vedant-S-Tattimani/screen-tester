import { ExplainerData, ExplainerLabels } from "./types";

export const DE_LABELS: ExplainerLabels = {
  overviewHeading: "Übersicht der Displayprüfung",
  whatToLookForHeading: "Worauf bei der Prüfung zu achten ist",
  boundariesHeading: "Messgrenzen & Technische Ehrlichkeit",
  canObserveLabel: "Was Screen Tester beobachten kann",
  cannotMeasureLabel: "Was der Browser nicht zuverlässig messen kann",
  interpretationHeading: "Interpretation Ihrer Beobachtungen",
  nextStepsHeading: "Empfohlene nächste Schritte",
};

export const DE_EXPLAINERS: Record<string, ExplainerData> = {
  "dead-pixel-test": {
    overview: "Ein toter Pixel ist ein dauerhaft unbestromter Flüssigkristall-Subpixel oder OLED-Emitter, der unabhängig vom Signal vollständig dunkel bleibt. Auf hellen Hintergründen – insbesondere reinem Weiß, Cyan und Gelb – heben sich tote Pixel als scharfe, statische schwarze Punkte ab.",
    whatToLookFor: [
      {
        label: "Statische dunkle Punkte auf weißem/hellem Bildschirm",
        description: "Ein winziger schwarzer Punkt, der bei wechselnden hellen Volltonfarben dunkel bleibt, weist auf einen toten Pixel hin."
      },
      {
        label: "Unterscheidung zwischen toten Pixeln und Staub",
        description: "Oberflächenstaub verändert seine Position bei wechselndem Blickwinkel und lässt sich abwischen. Echte tote Pixel liegen hinter dem Polarisationsfilter."
      },
      {
        label: "Subpixel- vs. Vollpixel-Defekte",
        description: "Fällt nur ein Subpixel (Rot, Grün oder Blau) aus, erscheint der Punkt auf Weiß leicht verfärbt statt tiefschwarz."
      },
      {
        label: "Pixel-Cluster-Defekte",
        description: "Mehrere tote Pixel auf engem Raum stellen einen schweren Panelfehler dar und berechtigen meist zum sofortigen Garantieaustausch."
      }
    ],
    canObserve: [
      "Visuelle Identifikation unbeleuchteter Pixel auf einfarbigen Primär- und Sekundärfarben",
      "Genaue Bildschirmkoordinaten und Lokalisierung verdächtiger dunkler Punkte",
      "Kontrastprüfung zwischen Hintergrundhelligkeit und defekten Subpixeln"
    ],
    cannotMeasure: [
      "Elektrische Spannungszustände der Dünnschichttransistoren (TFT)",
      "Automatische Defekterkennung ohne menschliche visuelle Inspektion",
      "Physische Klassifizierung von Fertigungsfehlern unter den Glasschichten"
    ],
    interpretation: "Tote Pixel entstehen durch Ausfälle einzelner Transistoren bei der Panelfertigung. Die meisten Hersteller orientieren sich an der ISO 9241-307 Fehlerklasse 2 (zulässig sind typischerweise 2 bis 5 Pixelfehler pro Million Pixel).",
    nextSteps: {
      text: "Leuchtet ein Pixel dauerhaft farbig statt schwarz? Nutzen Sie unseren Stimulations-Exerciser.",
      actionLabel: "Stuck Pixel Fixer starten",
      actionHref: "/tests/stuck-pixel-fixer"
    }
  },

  "stuck-pixel-test": {
    overview: "Im Gegensatz zu einem toten Pixel bleibt ein hängender Pixel (Stuck Pixel) dauerhaft geöffnet und leuchtet kontinuierlich. Er erscheint als permanenter heller Punkt (meist Rot, Grün, Blau, Cyan oder Weiß), der auf reinem Schwarz besonders auffällt.",
    whatToLookFor: [
      {
        label: "Helle Farbpunkte auf reinem Schwarz",
        description: "Prüfen Sie den schwarzen Bildschirm im abgedunkelten Raum. Jeder scharf leuchtende rote, grüne oder blaue Punkt ist ein hängender Subpixel."
      },
      {
        label: "Komplementärfarb-Prüfung",
        description: "Ein grüner hängender Pixel verschwindet auf grünem Hintergrund, leuchtet jedoch intensiv auf Rot, Blau oder Schwarz."
      },
      {
        label: "Dauerhaft weiße Pixel",
        description: "Sind alle drei Subpixel (RGB) dauerhaft geöffnet, erscheint der Defekt als weißer Leuchtpunkt auf dunklem Grund."
      },
      {
        label: "Unterschied zu Backlight-Bleeding",
        description: "Hängende Pixel sind punktgenaue Einzelfehler, während Backlight Bleed diffuse Lichthöfe an den Panelrändern erzeugt."
      }
    ],
    canObserve: [
      "Visuelle Lokalisierung dauerhaft leuchtender Subpixel auf dunklen Hintergründen",
      "Identifikation der betroffenen Farbkanäle (Rot, Grün oder Blau)",
      "Präzise Zuordnung defekter Bildschirmbereiche"
    ],
    cannotMeasure: [
      "Viskosität und mikroskopische Ausrichtung der Flüssigkristalle",
      "Schaltgeschwindigkeit oder Innenwiderstand der Transistoren",
      "Garantierte Dauerhaftigkeit des Defekts ohne Langzeitbeobachtung"
    ],
    interpretation: "Hängende Pixel entstehen, wenn Flüssigkristallmoleküle durch elektrostatische Ladungen oder Fertigungstoleranzen in einer Position verharren. Im Gegensatz zu toten Pixeln können hängende Pixel oft durch gezielte Farbstimulation reaktiviert werden.",
    nextSteps: {
      text: "Haben Sie einen hängenden Pixel entdeckt? Versuchen Sie, ihn mit unserem gezielten Farb-Exerciser zu reaktivieren.",
      actionLabel: "Stuck Pixel Fixer ausprobieren",
      actionHref: "/tests/stuck-pixel-fixer"
    }
  },

  "stuck-pixel-fixer": {
    overview: "Der Stuck Pixel Fixer nutzt schnelle Farbwechsel und hochfrequentes Bildrauschen, um festsitzende Flüssigkristalle mechanisch und elektrisch zu stimulieren und wieder in Bewegung zu versetzen.",
    whatToLookFor: [
      {
        label: "Zielbereich exakt ausrichten",
        description: "Platzieren Sie das animierte Stimulationsfeld direkt über dem betroffenen Pixel, um unnötiges Flackern auf dem restlichen Bildschirm zu vermeiden."
      },
      {
        label: "Stimulationsmuster wählen",
        description: "Wechseln Sie zwischen schnellem RGB-Zyklus und Farbrauschen für unterschiedliche Anregungsfrequenzen."
      },
      {
        label: "Dauer der Anwendung",
        description: "Lassen Sie das Werkzeug 15 bis 30 Minuten laufen und prüfen Sie danach auf schwarzem Hintergrund, ob der Pixel wieder schaltet."
      },
      {
        label: "Hinweis für Lichtempfindlichkeit",
        description: "Stoppen Sie die Anwendung sofort bei Schwindel oder Kopfschmerzen. Nicht geeignet bei Photosensibilität."
      }
    ],
    canObserve: [
      "Echtzeit-Wiedergabe hochfrequenter RGB-Sequenzen und Farbrauschmuster direkt im Browser",
      "Präzise Positionierung und einstellbare Timer-Intervalle",
      "Visuelle Vorher-Nachher-Prüfung des Pixels nach der Stimulationsphase"
    ],
    cannotMeasure: [
      "Hardware-Reparatur durchgebrannter oder physisch beschädigter TFT-Transistoren",
      "Garantierte Erfolgsquote (hängt von der chemischen Panelbeschaffenheit ab)",
      "Wiederbelebung vollständig toter (schwarzer) Pixel"
    ],
    interpretation: "Softwarebasierte Methoden funktionieren nur bei temporär verklemmten Flüssigkristallzellen. Bei mechanischen Beschädigungen oder getrennten Leiterbahnen hilft nur ein Paneltausch über den Herstellerservice.",
    nextSteps: {
      text: "Überprüfen Sie das Ergebnis anschließend mit dem Stuck Pixel Test auf reinem Schwarz.",
      actionLabel: "Mit Stuck Pixel Test prüfen",
      actionHref: "/tests/stuck-pixel-test"
    }
  },

  "refresh-rate-test": {
    overview: "Die Bildwiederholfrequenz (in Hertz, Hz) gibt an, wie oft der Bildschirm pro Sekunde aktualisiert wird. Dieser Test nutzt die Browser-Animations-API (requestAnimationFrame), um die Taktrate und Framestabilität zu messen.",
    whatToLookFor: [
      {
        label: "Gemessene vs. eingestellte Bildwiederholrate",
        description: "Prüfen Sie, ob der ermittelte Wert mit der Monitor-Einstellung übereinstimmt (z. B. 60Hz, 120Hz, 144Hz, 240Hz)."
      },
      {
        label: "Frame-Pacing & Zeitvarianz",
        description: "Ein stabiler 144Hz-Monitor sollte Frames in gleichmäßigen Abständen von ca. 6,94 ms liefern."
      },
      {
        label: "Browser-Drosselung auf 60Hz",
        description: "Wird trotz 144Hz-Monitor nur 60Hz gemessen, drosseln möglicherweise Energiesparmodi oder fehlende Browser-Flags das Rendering."
      },
      {
        label: "Gleichmäßigkeit des Zeigers",
        description: "Auf Bildschirmen mit hoher Bildwiederholrate gleitet der Animationsbalken ohne Ruckeln über das Display."
      }
    ],
    canObserve: [
      "Frequenz und Zeitdifferenzen der browserinternen requestAnimationFrame-Aufrufe",
      "Berechnete Browser-FPS und Gleichmäßigkeit des Bildaufbaus",
      "Compositor-Synchronisation des aktiven Browserfensters"
    ],
    cannotMeasure: [
      "Hardware-Bildwiederholfrequenz des Panels unabhängig von Browsergrenzen",
      "DisplayPort- oder HDMI-Kabelbandbreite und Übertragungsprotokolle",
      "Oszilloskop-Signalflanken oder hardwareseitige VBLANK-Intervalle"
    ],
    interpretation: "Webbrowser synchronisieren ihre Darstellung mit dem Betriebssystem-Compositor. Energiesparoptionen oder Multi-Monitor-Konfigurationen mit unterschiedlichen Frequenzen können den Browser auf 60Hz drosseln.",
    nextSteps: {
      text: "Ihr Gaming-Monitor läuft im Browser nur mit 60Hz? Lesen Sie unsere Anleitung zur Fehlerbehebung.",
      actionLabel: "Bildwiederholfrequenz Troubleshooting",
      actionHref: "/knowledge-base/troubleshooting#refresh-rate-capped"
    }
  },

  "ghosting-test": {
    overview: "Motion Ghosting zeigt sich als nachziehende Schlieren hinter bewegten Objekten. Es entsteht, wenn die Flüssigkristalle länger für den Farbwechsel benötigen als die Dauer eines einzelnen Bildes. Dieser Test visualisiert Nachziehen und Overdrive-Artefakte.",
    whatToLookFor: [
      {
        label: "Dunkle Nachziehschlieren (klassisches Ghosting)",
        description: "Dunkle Schweife hinter dem Objekt deuten auf langsame Dunkel-zu-Hell-Schaltzeiten hin (häufig bei VA-Panels)."
      },
      {
        label: "Helle Lichthöfe / Koronas (Inverses Ghosting)",
        description: "Helle weiße Schatten weisen auf eine zu aggressive Overdrive-Einstellung (Overshoot) im Monitor-Menü hin."
      },
      {
        label: "Farbabhängige Reaktionszeit",
        description: "Schlieren können auf rotem oder dunkelgrauem Hintergrund deutlich ausgeprägter sein als auf hellem Grund."
      },
      {
        label: "Augenverfolgung vs. Panel-Reaktionszeit",
        description: "Folgen Sie dem Objekt mit den Augen, um physiologische Netzhautunschärfe von echtem Panel-Nachziehen zu trennen."
      }
    ],
    canObserve: [
      "Visuelle Erkennung von Nachziehstreifen und Koronas bei verschiedenen Geschwindigkeiten",
      "Kontrastunterschiede zwischen Hell-auf-Dunkel- und Dunkel-auf-Hell-Übergängen",
      "Direkte Auswirkung von Änderungen der Overdrive-Einstellung im Monitor-OSD"
    ],
    cannotMeasure: [
      "Exakte Grau-zu-Grau-Reaktionszeit (GtG) in Millisekunden nach Labormethoden",
      "Lichtintensitätsabfallkurven einer Verfolgungskamera (Pursuit Camera)",
      "Subpixel-Steuerspannungen der Flüssigkristalle"
    ],
    interpretation: "Ghosting hängt stark von der Paneltechnologie ab (TN ist schnell, IPS ausgewogen, VA neigt zu Schwarz-Schlieren, OLED schaltet nahezu verzögerungsfrei). Eine mittlere Overdrive-Stufe bietet meist den besten Kompromiss.",
    nextSteps: {
      text: "Möchten Sie mehr über Overdrive und die Beseitigung von Geisterbildern erfahren?",
      actionLabel: "Ghosting & Motion Blur Guide lesen",
      actionHref: "/knowledge-base/monitor-ghosting-and-motion-blur"
    }
  },

  "motion-blur-test": {
    overview: "Bewegungsunschärfe auf modernen Flachbildschirmen entsteht vor allem durch das Sample-and-Hold-Prinzip: Da das Bild bis zum nächsten Refresh unverändert gehalten wird, erzeugt die Augenbewegung eine kontinuierliche Netzhautunschärfe.",
    whatToLookFor: [
      {
        label: "Detailverlust bei hoher Geschwindigkeit",
        description: "Beobachten Sie vertikale Linien und Schriften bei der Bewegung. Achten Sie darauf, ab welchem Tempo Details verschwimmen."
      },
      {
        label: "Geschwindigkeitsvergleich",
        description: "Vergleichen Sie 240 px/s mit 960 px/s, um den Einfluss der Bewegungsgeschwindigkeit auf die wahrgenommene Schärfe zu sehen."
      },
      {
        label: "Backlight-Strobing-Effekte (BFI)",
        description: "Aktivieren Sie BFI / Strobing am Monitor (ULMB, ELMB, DyAc), um bewegte Muster deutlich schärfer wahrzunehmen."
      },
      {
        label: "Sample-and-Hold bei OLED",
        description: "Auch bei 0,1ms Reaktionszeit tritt bei 60Hz oder 120Hz ohne Strobing wahrnehmbare Bewegungsunschärfe auf."
      }
    ],
    canObserve: [
      "Unterschiede in der wahrgenommenen Bewegungsschärfe bei verschiedenen Geschwindigkeiten",
      "Optische Schärfegewinne durch hardwareseitiges Backlight-Strobing (BFI)",
      "Unterschied zwischen scharfen statischen Kanten und unscharfen bewegten Konturen"
    ],
    cannotMeasure: [
      "Physikalische Moving Picture Response Time (MPRT) in genauen Millisekunden",
      "Lichtintegrationskurven des menschlichen Auges",
      "Tastverhältnis der Hintergrundbeleuchtungs-Strobing-Zyklen"
    ],
    interpretation: "Um Sample-and-Hold-Unschärfe zu reduzieren, helfen höhere Bildwiederholraten (kürzere Standzeit pro Bild) oder Dunkelphasen-Einfügung (Backlight Strobing / BFI).",
    nextSteps: {
      text: "Testen Sie mit dem Refresh Rate Test, wie höhere Hertz-Zahlen die Bewegungsschärfe verbessern.",
      actionLabel: "Bildwiederholfrequenz prüfen",
      actionHref: "/tests/refresh-rate-test"
    }
  },

  "vrr-test": {
    overview: "Variable Refresh Rate (VRR – NVIDIA G-Sync, AMD FreeSync, VESA Adaptive-Sync) passt die Bildwiederholrate des Monitors dynamisch an die GPU-Renderleistung an, um Tearing und Ruckeln zu verhindern.",
    whatToLookFor: [
      {
        label: "Screen-Tearing-Artefakte",
        description: "Achten Sie auf horizontale Bruchlinien, bei denen oberer und unterer Bildteil gegeneinander versetzt sind."
      },
      {
        label: "Mikroruckler & Frame-Judder",
        description: "Beobachten Sie den Animationszeiger bei variierenden Frequenzen auf gleichmäßige Bewegung ohne Stocken."
      },
      {
        label: "Fenstermodus vs. Vollbild",
        description: "G-Sync und FreeSync sind im Treiber oft standardmäßig nur für den exklusiven Vollbildmodus aktiviert."
      },
      {
        label: "Low Framerate Compensation (LFC)",
        description: "Prüfen Sie, ob unterhalb des VRR-Mindestbereichs (z. B. unter 48Hz) Bilder gleichmäßig verdoppelt werden."
      }
    ],
    canObserve: [
      "Visuelle Wahrnehmung von Tearing-Linien und Mikrorucklern bei variablen Renderabständen",
      "Gleichmäßigkeit der Animation bei schwankenden Bildabgaberaten",
      "Unterschiede im Bildfluss zwischen Fenster- und Vollbilddarstellung"
    ],
    cannotMeasure: [
      "Direkter Hardware-Handshake zwischen Grafikkartentreiber und Monitor-Scaler",
      "Aktivierungsstatus des physischen G-Sync- oder FreeSync-Moduls",
      "Echtzeit-Metadaten auf den DisplayPort-AUX-Kanälen"
    ],
    interpretation: "Da Webbrowser im Fenstermodus des Betriebssystems laufen, hängt VRR von Systemeinstellungen wie der Windows Hardware-beschleunigten GPU-Planung (HAGS) und Treibereinstellungen ab.",
    nextSteps: {
      text: "Treten trotz VRR Ruckler oder Bildrisse auf? Nutzen Sie unseren Leitfaden zur Treiberkonfiguration.",
      actionLabel: "VRR Troubleshooting lesen",
      actionHref: "/knowledge-base/troubleshooting#vrr-stutter-tearing"
    }
  },

  "backlight-bleed-test": {
    overview: "Backlight Bleeding tritt auf, wenn Licht der Hintergrundbeleuchtung durch ungleichmäßigen Druck des Gehäuses an den Kanten oder Ecken des LCD-Panels austritt. Dieser Vollbild-Schwarztest hilft, Bleed von blickwinkelabhängigem IPS-Glow zu unterscheiden.",
    whatToLookFor: [
      {
        label: "Lichthöfe an Kanten und Ecken",
        description: "Helle, gelbliche oder weiße Lichtinseln an den Gehäuserändern, die auch bei wechselndem Blickwinkel unverändert bleiben."
      },
      {
        label: "IPS Glow vs. Backlight Bleed",
        description: "Bewegen Sie Ihren Kopf seitlich: Verändert der Schimmer seine Intensität oder Position, handelt es sich um normalen IPS Glow."
      },
      {
        label: "Clouding (Wolkeneffekte)",
        description: "Fleckige, diffuse Helligkeitsunterschiede auf der Fläche durch ungleichmäßige Diffusorfolien oder Gehäusespannung."
      },
      {
        label: "OLED- & Mini-LED-Vergleich",
        description: "OLEDs schalten Pixel einzeln ab und zeigen 0 nits ohne jedes Bleed. Mini-LEDs können lokales Haloing um helle Elemente zeigen."
      }
    ],
    canObserve: [
      "Sichtbare Lichtaustritte an Kanten, Ecken und Druckstellen auf dunklem Hintergrund",
      "Verteilung von Helligkeitsflecken in abgedunkelter Testumgebung",
      "Blickwinkelabhängigkeit zur Unterscheidung zwischen statischem Bleed und dynamischem IPS Glow"
    ],
    cannotMeasure: [
      "Absolute Panelleuchtdichte in cd/m² (Nits) ohne externes Kolorimeter",
      "Statisches Kontrastverhältnis des Panels (z. B. 1000:1 vs. 3000:1)",
      "Zertifizierte ANSI-16-Zonen-Kontrastwerte"
    ],
    interpretation: "Leichter IPS Glow ist eine optische Eigenschaft von In-Plane-Switching-Panels. Starkes Backlight Bleed dagegen ist ein Verarbeitungsfehler, bei dem der Rahmen zu viel Druck auf das Panel ausübt.",
    nextSteps: {
      text: "Erfahren Sie mehr über die Unterschiede zwischen IPS Glow, Backlight Bleed und echtem Schwarz.",
      actionLabel: "Backlight Bleed vs. IPS Glow Ratgeber",
      actionHref: "/knowledge-base/backlight-bleed-vs-ips-glow"
    }
  },

  "near-black-test": {
    overview: "Der Nah-Schwarz-Test prüft die Differenzierung dunkler Graustufen knapp über reinem Schwarz (0,5% bis 5% Leuchtdichte). Werden diese Stufen verschluckt (Black Crush), gehen in Filmen und Spielen wichtige Schattendetails verloren.",
    whatToLookFor: [
      {
        label: "Black Crush (Detailschwärzung)",
        description: "Sind die ersten Stufen (0,5% oder 1%) unsichtbar und verschmelzen mit dem Hintergrund, leidet das Display unter Black Crush."
      },
      {
        label: "Erkennbarkeit einzelner Stufen",
        description: "Im abgedunkelten Raum sollten die Kanten zwischen den feinen Graustufen klar voneinander unterscheidbar sein."
      },
      {
        label: "Blickwinkelabhängigkeit bei VA",
        description: "Bei VA-Panels werden Schattendetails oft erst sichtbar, wenn man leicht schräg auf das Display blickt."
      },
      {
        label: "Einfluss des Raumlichts",
        description: "Reflexionen auf dem Bildschirm mindern die Erkennbarkeit dunkler Details erheblich; dunkeln Sie den Raum ab."
      }
    ],
    canObserve: [
      "Visuelle Erkennbarkeitsschwellen für 0,5%, 1%, 2%, 3%, 4% und 5% Graustufen",
      "Kontrasttrennung sehr dunkler Bildbereiche",
      "Einfluss von Monitor-Gamma-, Schwarzstabilisator- und RGB-Dynamikbereich-Einstellungen"
    ],
    cannotMeasure: [
      "Exakte Leuchtdichten unter 0,05 Nits ohne optisches Messgerät",
      "Präzise mathematische Gammakurven-Konformität (BT.1886 vs. 2.2)",
      "Physikalischer nativer Schwarzwert des Panels in cd/m²"
    ],
    interpretation: "Black Crush entsteht häufig durch einen falschen HDMI-Dynamikbereich (Begrenzt 16–235 statt Voll 0–255), fehlerhafte Gamma-Voreinstellungen oder übertriebene Schwarzwerteinstellungen am Monitor.",
    nextSteps: {
      text: "Gehen Schattendetails in dunklen Szenen verloren? Nutzen Sie unsere Anleitung zur Beseitigung von Black Crush.",
      actionLabel: "Black Crush Troubleshooting lesen",
      actionHref: "/knowledge-base/troubleshooting#black-crush"
    }
  },

  "gradient-banding-test": {
    overview: "Sanfte Farbverläufe erfordern feine Helligkeitsabstufungen. Weist das Panel oder die Signalübertragung eine unzureichende Farbtiefe auf, zerfallen Verläufe in sichtbare Farbabrisse und blockartige Streifen (Banding / Posterisation).",
    whatToLookFor: [
      {
        label: "Sichtbare Stufenlinien",
        description: "Achten Sie auf abrupte Linien anstelle gleichmäßiger Übergänge in Graustufen- und RGB-Verläufen."
      },
      {
        label: "Kanalbezogene Streifenbildung",
        description: "Prüfen Sie, ob Banding in Einzelfarben (besonders Blau oder in dunklen Bereichen) stärker hervortritt."
      },
      {
        label: "Farbtiefe & FRC-Dithering",
        description: "Echte 8-Bit- und 10-Bit-Panels zeigen glatte Übergänge. 6-Bit-Panels mit FRC zeigen oft ein feines Flimmern oder Banding."
      },
      {
        label: "Einfluss des Farbraums",
        description: "Ist der GPU-Ausgang auf 'Begrenzt' (16–235) gestellt, werden dunkle und helle Bereiche hart abgeschnitten."
      }
    ],
    canObserve: [
      "Visuelle Farbstufen und Banding-Muster über Grau- und Farbverläufe",
      "Vergleich horizontaler, vertikaler und mehrkanaliger Verläufe",
      "Sichtbare Auswirkungen von Farbprofilen und GPU-Dynamikbereich-Einstellungen"
    ],
    cannotMeasure: [
      "Hardware-Farbtiefe (6-Bit, 8-Bit, 10-Bit) unabhängig von den Treiberangaben",
      "Messbare Delta-E-Farbabweichungen zwischen einzelnen Verlaufsstufen",
      "Hardwareinterne Dithering-Algorithmen des Monitor-Scalers"
    ],
    interpretation: "Banding kann an 6-Bit-Panels, falschem HDMI-Dynamikbereich (16–235) oder aggressiven Farbprofilen liegen, die Tonwerte beschneiden.",
    nextSteps: {
      text: "Möchten Sie 6-Bit-, 8-Bit- und Dithering-Stufen simulieren? Nutzen Sie unseren Farbtiefe-Test.",
      actionLabel: "Farbtiefe & Dither Test öffnen",
      actionHref: "/tests/color-banding-test"
    }
  },

  "uniformity-test": {
    overview: "Die Bildschirm-Homogenität beschreibt, wie gleichmäßig Helligkeit und Farbtemperatur über das gesamte Panel verteilt sind. Unebenheiten in Diffusionsfolien führen zu dunkleren Rändern oder dem Dirty Screen Effect (DSE).",
    whatToLookFor: [
      {
        label: "Vignettierung an Rändern & Ecken",
        description: "Prüfen Sie bei 25%, 50% und 75% Grau, ob Ecken und Kanten merklich dunkler als das Zentrum sind."
      },
      {
        label: "Dirty Screen Effect (DSE)",
        description: "Fleckige oder wolkige Muster, die besonders bei Kameraschwenks über einfarbige Flächen (z. B. Sportübertragungen) stören."
      },
      {
        label: "Farbtemperatur-Verschiebungen",
        description: "Achten Sie darauf, ob eine Bildschirmseite wärmer (rötlich/gelblich) und die andere kühler (bläulich) wirkt."
      },
      {
        label: "Zonenvergleich im 5x5-Raster",
        description: "Vergleichen Sie die Helligkeit der Rasterfelder von der Mitte nach außen."
      }
    ],
    canObserve: [
      "Visuelle Helligkeitsabfälle, Randabschattungen und Hotspots auf Grau- und Weißflächen",
      "Sichtbare Farbtemperaturunterschiede zwischen verschiedenen Panelbereichen",
      "Prüfung bei mehreren genormten Helligkeitsstufen"
    ],
    cannotMeasure: [
      "Prozentuale Homogenitätswerte (z. B. '98,5% homogen') ohne kalibriertes Mehrpunkt-Spektrometer",
      "Genaue Farbtemperaturabweichungen in Kelvin über Panelkoordinaten",
      "Status interner digitaler Homogenitätsausgleichsschaltungen (DUC)"
    ],
    interpretation: "Bei Standardmonitoren sind Helligkeitsabfälle von 10% bis 15% zu den Ecken hin üblich. Professionelle Grafikmonitore nutzen DUC-Schaltungen, um unter 5% Abweichung zu bleiben.",
    nextSteps: {
      text: "Erfahren Sie mehr über DSE, Vignettierung und Reklamationsgrenzen bei ungleichmäßigen Panels.",
      actionLabel: "Homogenitäts-Ratgeber lesen",
      actionHref: "/knowledge-base/backlight-bleed-vs-ips-glow"
    }
  },

  "text-clarity-test": {
    overview: "Textschärfe hängt von der Pixeldichte (PPI), der Windows-Skalierung, der Subpixelstruktur (RGB vs. BGR vs. QD-OLED) und den Schriftglättungsalgorithmen ab. Dieser Test prüft Kantenschärfe und Farbsäume.",
    whatToLookFor: [
      {
        label: "Farbsäume an Schriftkanten",
        description: "Feine rote oder blaue Ränder an vertikalen Buchstabenstrichen weisen auf eine nicht passende Subpixel-Konfiguration hin."
      },
      {
        label: "BGR-Subpixel-Anordnung",
        description: "Einige Monitore nutzen BGR statt RGB. Ohne Anpassung von Windows ClearType wirkt Text darauf verwaschen."
      },
      {
        label: "OLED-Text-Farbsäume",
        description: "WOLED- und QD-OLED-Dreiecksstrukturen verursachen feine grüne oder magentafarbene Kanten an horizontalen Linien."
      },
      {
        label: "Skalierungsunschärfe",
        description: "Krumme Skalierungsfaktoren (z. B. 125% oder 150%) können bei älteren Programmen Unschärfe erzeugen."
      }
    ],
    canObserve: [
      "Visuelle Farbsäume an Schriftkonturen bei Schriftgrößen von 8px bis 32px",
      "Schriftglättungsunterschiede zwischen Serif, Sans-Serif und invertierter Darstellung",
      "Einfluss von Browser-Zoom und Windows-Skalierung auf die Schärfe"
    ],
    cannotMeasure: [
      "Physikalische Subpixel-Geometrie ohne optische Makrovergrößerung",
      "Betriebssystem-interne DirectWrite- oder ClearType-Konfigurationsflags",
      "Optische Modulationsübertragungsfunktion (MTF) des Displays"
    ],
    interpretation: "Wirkt Schrift unscharf mit Farbsäumen, hilft meist die Ausführung des Windows ClearType-Assistenten oder die Prüfung des RGB/BGR-Layouts.",
    nextSteps: {
      text: "Schriften wirken matschig? Nutzen Sie unsere Schritt-für-Schritt-Anleitung für scharfe Texte.",
      actionLabel: "Textschärfe Troubleshooting lesen",
      actionHref: "/knowledge-base/troubleshooting#blurry-text-scaling"
    }
  },

    "hdr-capability-test": {
    "overview": "Der HDR-Hardware & Signal-Detektor prüft, ob Ihr Betriebssystem-Compositor, Grafikkartentreiber und Browser-Pipeline HDR-Signale korrekt übertragen. Er analysiert CSS Media Queries Level 4 (dynamic-range: high), Farbräume (Rec.2020 / Display-P3), Canvas-P3-Farbpuffer, WebGL-Float-Renderziele und hardwarebeschleunigte 10-Bit-HDR-Videocodecs.",
    "whatToLookFor": [
        {
            "label": "Compositor-HDR-Signalstatus",
            "description": "Bestätigt, ob das Betriebssystem ein HDR-Signal an den Browser ausgibt. Falls inaktiv, ist HDR in den Systemeinstellungen deaktiviert."
        },
        {
            "label": "Puffer-Farbtiefe & Pipeline",
            "description": "Erkennt die gemeldete Farbtiefe (24-Bit SDR vs. 30-Bit+ HDR) und prüft, ob Canvas und WebGL2 Float- und P3-Puffer zuweisen können."
        },
        {
            "label": "Wide Color Gamut (Rec.2020 & P3)",
            "description": "Ermittelt, ob Ihr Monitor erweiterte Farbräume über sRGB hinaus unterstützt für sattes Karmesinrot und Smaragdgrün."
        },
        {
            "label": "HDR-Videocodec-Beschleunigung",
            "description": "Testet die Hardware-Dekodierung für HDR10 (HEVC Main 10), AV1 10-Bit (YouTube HDR) und VP9 Profil 2."
        }
    ],
    "canObserve": [
        "Echtzeit-Ausgabestatus des Betriebssystem-HDR-Compositors",
        "Hardware- und Browser-Unterstützung für Display-P3 und Rec.2020",
        "Für den Browser zugängliche Farbtiefe und WebGL-Float-Puffer",
        "Hardwarebeschleunigte 10-Bit-Videodekodierungsfunktionen"
    ],
    "cannotMeasure": [
        "Physische Spitzenhelligkeit (Nits) ohne optisches Kolorimeter",
        "VESA DisplayHDR-Zertifizierungsstufen (z.B. DisplayHDR 400 vs 600 vs 1000)",
        "Anzahl physischer Dimmzonen bei Mini-LED-Hintergrundbeleuchtung"
    ],
    "interpretation": "Falls dynamic-range als Standard gemeldet wird, drücken Sie Win + Alt + B unter Windows oder aktivieren Sie HDR in den macOS-Einstellungen.",
    "nextSteps": {
        "text": "Möchten Sie Glanzlicht-Clipping, Tonkurven und Spitzenhelligkeit visuell prüfen? Starten Sie den Sehtest.",
        "actionLabel": "HDR Visuelle Inspektion starten",
        "actionHref": "/tests/hdr-test"
    }
},

  "hdr-test": {
    "overview": "Der HDR Visuelle Kalibrierungs- & Highlight-Inspektionstest bietet kontrollierte optische Muster zur Bewertung der Displayreaktion auf HDR-Signale. Er testet Glanzlicht-Clipping, Tone-Mapping-Rolloff, 10%-APL-Spitzenhelligkeit, PQ/EOTF-Tonkurven und Schattendetails.",
    "whatToLookFor": [
        {
            "label": "Glanzlicht-Rolloff & Clipping",
            "description": "Untersuchen Sie die Felder von 90% bis 100% Spitzenweiß. Zielkreuze sollten sichtbar bleiben, ohne in reines Weiß abzusaufen."
        },
        {
            "label": "10%-APL-Spitzenweiß-Fenster",
            "description": "Ein 10%-Fenster auf echtem Schwarz testet Spitzenhelligkeit, Local-Dimming-Verhalten und Halos."
        },
        {
            "label": "PQ / EOTF Tonkurven-Abstufung",
            "description": "Vergleicht stufenlose 10-Bit-Verläufe mit quantisierten 8-Bit-Rampen zur Erkennung von Banding und Kompression."
        },
        {
            "label": "Schattendetails (Near-Black)",
            "description": "Überprüft, ob minimale Graustufen (0,5% bis 5%) von echtem 0%-Schwarz trennbar sind, ohne Schwarzwerte aufzuhellen."
        }
    ],
    "canObserve": [
        "Punkt des Glanzlicht-Clippings über abgestufte Weiß-Helligkeitsstufen",
        "Local-Dimming-Halos und Helligkeitsreserve im 10%-APL-Fenster",
        "Geschmeidigkeit von 10-Bit-Tonübergängen vs. 8-Bit-Banding",
        "Differenzierung von Schattendetails und Schwarz-Crush-Verhalten"
    ],
    "cannotMeasure": [
        "Exakte photometrische Spitzenhelligkeit in Nits ohne Labor-Messgeräte",
        "Farbtemperatur-Genauigkeit (Kelvin) ohne Spektralphotometer",
        "Pixel-Reaktionszeit oder Overdrive-Overshoot"
    ],
    "interpretation": "Displays mit mangelhaftem HDR-Tone-Mapping clippen Glanzlichter vorzeitig ab 94% oder verschlucken Schattendetails. Hochwertige OLED- und Mini-LED-Panels erhalten Fadenkreuze bis 99% Weiß.",
    "nextSteps": {
        "text": "Möchten Sie prüfen, ob Betriebssystem und Videocodecs HDR unterstützen? Nutzen Sie den Hardware-Detektor.",
        "actionLabel": "HDR Hardware- & Signal-Status prüfen",
        "actionHref": "/tests/hdr-capability-test"
    }
},

  "strobe-crosstalk-test": {
    "overview": "Backlight Strobing (ULMB, DyAc, ELMB) reduziert Bewegungsunschärfe durch kurzes Aufblitzen der Hintergrundbeleuchtung. Da Zeilen von oben nach unten abgetastet werden, entstehen an den Rändern Doppelbilder (Strobe Crosstalk).",
    "whatToLookFor": [
      {
        "label": "Doppelbild-Silhouetten",
        "description": "Achten Sie auf Geisterbilder hinter den bewegten Balken in oberer, mittlerer und unterer Spur."
      },
      {
        "label": "Schärfe nach Bildschirmzonen",
        "description": "Die Bildmitte ist meist optimal abgestimmt, während oben und unten Crosstalk auftreten kann."
      },
      {
        "label": "Pulsbreite & Helligkeit",
        "description": "Kürzere Strobes erhöhen die Bewegungsschärfe, verringern jedoch die Gesamthelligkeit."
      }
    ],
    "canObserve": [
      "Sichtbarkeit von Strobe Crosstalk in verschiedenen Bildschirmzonen",
      "Erkennung der optimalen Strobe-Phase Ihres Monitors",
      "Vergleich der Unschärfereduktion bei verschiedenen Geschwindigkeiten"
    ],
    "cannotMeasure": [
      "Genaue Strobe-Pulsdauer in Mikrosekunden",
      "Spitzenleuchtdichte in Nits ohne Messsonde",
      "Timing-Controller-Scanout-Verzögerung"
    ],
    "interpretation": "Geringer Crosstalk an den Außenkanten ist normal. Ausgeprägter Crosstalk in der Bildschirmmitte deutet auf falsche Phasenabstimmung hin.",
    "nextSteps": {
      "text": "Vergleichen Sie gestrobtes Bild mit nativer Bewegungsunschärfe.",
      "actionLabel": "Bewegungsunschärfetest starten",
      "actionHref": "/tests/motion-blur-test"
    }
  },
  "vrr-flicker-test": {
    "overview": "Variable Refresh Rate (G-Sync, FreeSync) passt die Bildwiederholrate an die GPU an. Bei starken FPS-Sprüngen verschieben sich die Leuchtdichtekurven, was zu Helligkeitsflimmern in dunklen Bereichen führt.",
    "whatToLookFor": [
      {
        "label": "Helligkeitspumpen im Fast-Schwarz-Bereich",
        "description": "Beobachten Sie 10%- und 25%-Graufelder während des automatischen Framerate-Sweeps."
      },
      {
        "label": "LFC-Übergangssprung",
        "description": "Fällt die Bildrate unter die VRR-Grenze, verdoppelt der Treiber Frames, was einen Helligkeitsruck erzeugt."
      },
      {
        "label": "OLED-Gammashift",
        "description": "OLEDs reagieren wegen spannungsabhängiger Subpixelkapazitäten besonders empfindlich auf VRR-Flimmern."
      }
    ],
    "canObserve": [
      "Visuelle Erkennung von Gammakurvenverschiebungen",
      "Erkennung von Helligkeitspumpen bei Frequenzschwankungen",
      "Vergleich der Flimmeranfälligkeit von Mitteltönen zu Fast-Schwarz"
    ],
    "cannotMeasure": [
      "Hardware-GPU-Adaptive-Sync-Paketdaten",
      "Subpixel-Spannungsschwankungen in Millivolt",
      "Automatische Erkennung ohne menschliche Beurteilung"
    ],
    "interpretation": "Bei starkem Helligkeitspumpen begrenzen Sie die maximale Bildrate 3 FPS unterhalb der Monitorgrenze oder deaktivieren Sie VRR bei instabilen Titeln.",
    "nextSteps": {
      "text": "Überprüfen Sie den variablen Bildwiederholratenbereich.",
      "actionLabel": "VRR-Test starten",
      "actionHref": "/tests/vrr-test"
    }
  },
  "pursuit-camera-test": {
    "overview": "Menschliche Augen verfolgen bewegte Objekte mit flüssiger Bewegung. Eine Pursuit-Kamera bewegt sich synchron mit dem Testmuster, um die tatsächliche Bewegungsunschärfe (MPRT) fotografisch zu erfassen.",
    "whatToLookFor": [
      {
        "label": "Ausrichtung der Zeitskalierung",
        "description": "Die vertikalen Teilstriche müssen im Foto zu einer einzigen scharfen Linie verschmelzen."
      },
      {
        "label": "Ghosting & Nachzieheffekte",
        "description": "Untersuchen Sie die Hinterkante des Objekts auf Pixel-Schaltverzögerungen oder Farbfahnen."
      },
      {
        "label": "Overdrive-Overshoot (Koronas)",
        "description": "Helle leuchtende Ränder hinter dem Objekt deuten auf zu aggressiven Monitor-Overdrive hin."
      }
    ],
    "canObserve": [
      "Kamera-Panning-Synchronisation anhand der Skalierungsmarken",
      "Visuelle Schweifbreite proportional zum tatsächlichen MPRT",
      "Unterscheidung zwischen GtG-Schaltzeit und Sample-and-Hold-Haltezeit"
    ],
    "cannotMeasure": [
      "Automatische MPRT-Berechnung ohne Auswertung eines Fotos",
      "Sub-Millisekunden-Fotodioden-Messkurven",
      "Schienengeschwindigkeit ohne Spezialhardware"
    ],
    "interpretation": "Wenn die Skalierungsmarken im Foto eine scharfe Linie bilden, war die Nachführung synchron. Die Schweifbreite entspricht dem wahren MPRT.",
    "nextSteps": {
      "text": "Testen Sie verschiedene Overdrive-Stufen Ihres Monitors.",
      "actionLabel": "Ghosting-Test starten",
      "actionHref": "/tests/ghosting-test"
    }
  },
  "audio-sync-test": {
    "overview": "Bildverarbeitung (HDR, Upscaling) erzeugt Videoverzögerung; Soundbars und Bluetooth erzeugen Audiopuffer. Weichen Ton und Bild zu stark ab, leidet die Lippensynchronisation.",
    "whatToLookFor": [
      {
        "label": "Gleichzeitiger Blitz und Ton",
        "description": "Beim Durchgang der Nadel durch die 12-Uhr-Marke müssen Blitz und 1-kHz-Ton synchron wahrgenommen werden."
      },
      {
        "label": "Ton vor Bild (negativer Offset)",
        "description": "Hören Sie den Ton vor dem Blitz, hinkt die Videoanzeige hinterher."
      },
      {
        "label": "Bild vor Ton (positiver Offset)",
        "description": "Sehen Sie den Blitz vor dem Ton, verzögert das Audiosystem (z.B. Bluetooth) die Wiedergabe."
      }
    ],
    "canObserve": [
      "Menschliche Wahrnehmungssynchronisation zwischen Lichtblitz und Tonpuls",
      "Bestimmung des erforderlichen Korrektur-Offsets in Millisekunden",
      "Präzise 1-kHz-Audioausgabe über die Web Audio API"
    ],
    "cannotMeasure": [
      "Elektrische Laufzeiten auf HDMI-Kabeln im Mikrosekundenbereich",
      "Akustische Schallausbreitung im Raum",
      "Interne Betriebssystem-Bluetooth-Puffer"
    ],
    "interpretation": "Ein Offset innerhalb von +/- 20ms gilt als hervorragend und ist nicht wahrnehmbar. Abweichungen über 50ms sollten im Audiosystem korrigiert werden.",
    "nextSteps": {
      "text": "Testen Sie Ihre Lautsprecher auf Stereotrennung.",
      "actionLabel": "Lautsprechertest starten",
      "actionHref": "/tests/speaker-test"
    }
  },
  "gamepad-test": {
    "overview": "Game-Controller nutzen Potentiometer oder Hall-Effekt-Sensoren. Mit der Zeit verschleißen Schleifkontakte, was zu Stick-Drift führt – der Controller sendet Bewegungssignale im Ruhezustand.",
    "whatToLookFor": [
      {
        "label": "Ruhedrift",
        "description": "Lassen Sie beide Sticks los. Weicht das Fadenkreuz vom Nullpunkt ab, liegt Stick-Drift vor."
      },
      {
        "label": "Zirkularitätsfehler",
        "description": "Kreisen Sie den Stick am Anschlag. Ein sauberer Kreis ohne Eckabschneidungen ist optimal."
      },
      {
        "label": "Deadzone-Verhalten",
        "description": "Prüfen Sie, wie weit der Stick bewegt werden muss, bevor eine Reaktion registriert wird."
      },
      {
        "label": "Trigger-Gleichmäßigkeit",
        "description": "Drücken Sie LT/RT langsam durch: Der Wert sollte gleichmäßig von 0% auf 100% steigen."
      }
    ],
    "canObserve": [
      "Echtzeit-Koordinaten der Analogsticks und Ruhedriftwerte",
      "Vollständige 16-Tasten-Betätigungsmatrix und analoge Triggerdrücke",
      "Controller-Verbindungsstatus und Modellname über HTML5 Gamepad API"
    ],
    "cannotMeasure": [
      "Widerstand der Potentiometerbahn in Ohm",
      "Akkustand ohne herstellerspezifische Erweiterungen",
      "Funkstörungen oder Bluetooth-Paketverluste"
    ],
    "interpretation": "Werte unter 5% (0.05) werden von normalen Spiel-Deadzones absorbiert. Werte über 10% führen zu sichtbaren Drehungen und erfordern Neukalibrierung.",
    "nextSteps": {
      "text": "Testen Sie Ihre Reaktionszeit am Controller.",
      "actionLabel": "Reaktionstest starten",
      "actionHref": "/tests/reaction-time-test"
    }
  }
  ,
  "battery-test": {
    "overview": "Die Akkuzustands- und Energieprüfung liest Gerätedaten über die W3C Battery Status API aus. Sie bietet Einblick in Ladezustand, Ladestatus, geschätzte Ladezeit und Restlaufzeit.",
    "whatToLookFor": [
        {
            "label": "Echtzeit-Ladestand",
            "description": "Überwacht den aktuellen Akkuprozentsatz des Betriebssystems."
        },
        {
            "label": "Netzteil-Status",
            "description": "Erkennt, ob das Gerät am Stromnetz lädt oder im Akkubetrieb läuft."
        },
        {
            "label": "Lade- und Entladezeit",
            "description": "Berechnet die geschätzte Dauer bis 100 % oder die verbleibende Betriebszeit."
        },
        {
            "label": "Entladekurve",
            "description": "Verfolgt den Energieverbrauch bei aktiven Bildschirmtests."
        }
    ],
    "canObserve": [
        "Echtzeit-Akkuprozentsatz über Betriebssystem-Energieverwaltung",
        "Statuswechsel zwischen Laden und Entladen via Events",
        "Geschätzte Restzeit bis zur vollen Ladung oder Entladung",
        "Verlauf des Ladestands während der aktuellen Sitzung"
    ],
    "cannotMeasure": [
        "Chemische Kapazitätsalterung in mAh ohne Tiefendiagnose",
        "Innentemperatur, Innenwiderstand oder Ladezyklen",
        "Akkudaten in Browsern mit Fingerprinting-Schutz (z. B. Firefox/Safari)"
    ],
    "interpretation": "Wird die API als nicht unterstützt gemeldet, blockiert der Browser den Zugriff aus Datenschutzgründen. Bei aktiver Anzeige deutet ein schneller Abfall auf einen gealterten Akku hin.",
    "nextSteps": {
        "text": "Möchten Sie die Netzwerkgeschwindigkeit und Latenz prüfen?",
        "actionLabel": "Netzwerk-Test starten",
        "actionHref": "/tests/network-speed-test"
    }
},

  "network-speed-test": {
    "overview": "Der Netzwerk-Geschwindigkeitstest misst Ping-Latenz, Jitter, Verbindungstyp und Download-Durchsatz direkt im Browser mittels Zeitmess-APIs und Network Information API.",
    "whatToLookFor": [
        {
            "label": "Ping-Latenz (RTT)",
            "description": "Misst die Paketumlaufzeit in Millisekunden zum Server."
        },
        {
            "label": "Download-Durchsatz (Mbps)",
            "description": "Berechnet die nutzbare Bandbreite beim Empfang von Datenpaketen."
        },
        {
            "label": "Verbindungsprofil & Typ",
            "description": "Erkennt effektiven Verbindungstyp (4G, WLAN, Ethernet) und Bandbreitenlimit."
        },
        {
            "label": "Stabilität & Jitter",
            "description": "Erkennt Schwankungen zwischen aufeinanderfolgenden Ping-Messungen."
        }
    ],
    "canObserve": [
        "HTTP/HTTPS-Umlaufzeiten in Millisekunden",
        "Effektive Verbindungsklasse über navigator.connection",
        "Download-Geschwindigkeit anhand empfangener Bytes pro Zeiteinheit",
        "Status des Datensparmodus im Browser"
    ],
    "cannotMeasure": [
        "Reine TCP-Socket-Latenz ohne HTTP-Protokolloverhead",
        "Physikalische Leitungsdämpfung oder SNR-Werte des DSL/Kabel-Modems",
        "WLAN-Kanalinterferenzen auf Funkebene"
    ],
    "interpretation": "Latenzen unter 30 ms sind optimal für Cloud-Gaming und Streaming. Ab 50 Mbps ist ruckelfreies 4K-HDR-Streaming gewährleistet.",
    "nextSteps": {
        "text": "Überprüfen Sie Eingabeverzögerungen und Click-to-Photon-Latenzen.",
        "actionLabel": "Eingabeverzögerung testen",
        "actionHref": "/tests/input-lag-test"
    }
},

  "color-blindness-test": {
    "overview": "Der Farbenblindheit-Simulator nutzt mathematisch kalibrierte SVG-Farbmatrizen, um 8 Formen von Farbsehschwäche (CVD) nachzubilden. Damit lässt sich die Barrierefreiheit von Designs und Kontrasten prüfen.",
    "whatToLookFor": [
        {
            "label": "Protanopie & Protanomalie (Rotblindheit/-schwäche)",
            "description": "L-Zapfen-Defekt lässt Rot wie Dunkelbraun wirken; Rot und Grün verschwimmen."
        },
        {
            "label": "Deuteranopie & Deuteranomalie (Grünblindheit/-schwäche)",
            "description": "M-Zapfen-Defekt lässt Grün und Rot gelblich erscheinen; häufigste Form."
        },
        {
            "label": "Tritanopie & Tritanomalie (Blaublindheit/-schwäche)",
            "description": "S-Zapfen-Defekt lässt Blau grünlich und Gelb violett/grau wirken."
        },
        {
            "label": "Achromatopsie (Vollständige Farbenblindheit)",
            "description": "Fehlen funktionierender Zapfen; Darstellung erfolgt rein in Graustufen."
        }
    ],
    "canObserve": [
        "Echtzeit-Farbtransformation von Texten, Icons und Diagrammen über 8 Matrizen",
        "Direkter Vergleich zwischen normalem Sehen und simulierter Farbsehschwäche",
        "Kontrastverlust zwischen Statusfarben (Erfolg Grün vs. Fehler Rot)",
        "Lesbarkeit von Beschriftungen unter allen Sehvarianten"
    ],
    "cannotMeasure": [
        "Klinische medizinische Diagnose menschlicher Sehkraft",
        "Individuelle Netzhautempfindlichkeit einzelner Personen",
        "Spektrale Emissionskurven des Monitors ohne Spektrometer"
    ],
    "interpretation": "Werden wichtige Statusanzeigen unter Rot-Grün-Schwäche ununterscheidbar, sollten ergänzende Symbole oder Formate nach WCAG 2.2 integriert werden.",
    "nextSteps": {
        "text": "Prüfen Sie den Farbraum Ihres Monitors für sRGB und DCI-P3.",
        "actionLabel": "Farbraum-Test starten",
        "actionHref": "/tests/color-gamut-test"
    }
},

  "screen-recorder": {
    "overview": "Der Bildschirmrekorder und Screenshot-Dienst nutzt die Screen Capture und MediaRecorder API zur lokalen Erfassung von Bildschirmen, Fenstern oder Tabs als WebM-Video oder PNG-Screenshot.",
    "whatToLookFor": [
        {
            "label": "Stream-Auflösung",
            "description": "Prüft, ob die Videoauflösung der nativen Monitorauflösung entspricht."
        },
        {
            "label": "Bildwiederholrate",
            "description": "Überwacht Framerate und Aufnahmedauer in Echtzeit."
        },
        {
            "label": "Audio-Einbindung",
            "description": "Nimmt optionalen System- oder Tab-Sound parallel zum Bild auf."
        },
        {
            "label": "Verlustfreie PNG-Screenshots",
            "description": "Erfasst Einzelbilder direkt als hochauflösende PNG-Datei."
        }
    ],
    "canObserve": [
        "Videoauflösung, Seitenverhältnis und Framerate des Capture-Streams",
        "Aufnahmedauer, Pausenstatus und erzeugte WebM-Dateigröße",
        "Direkter Canvas-Export in hochauflösendes PNG",
        "Berechtigungsstatus für Bildschirmfreigabe im Browser"
    ],
    "cannotMeasure": [
        "GPU-Hardware-Encoder-Latenz auf Betriebssystemebene",
        "DRM-geschützte Inhalte (Streaming-Dienste bleiben schwarz)",
        "Physikalische Monitor-Synchronisation bei 144Hz+"
    ],
    "interpretation": "Aufnahmen verbleiben vollständig im lokalen Browserspeicher und werden niemals übertragen, was maximale Privatsphäre garantiert.",
    "nextSteps": {
        "text": "Möchten Sie Ihre Webcam und Frontkamera überprüfen?",
        "actionLabel": "Webcam-Test starten",
        "actionHref": "/tests/webcam-test"
    }
},

  "dark-mode-test": {
    "overview": "Die Dunkelmodus-Prüfung analysiert die Erkennung von prefers-color-scheme, native CSS-Farbschemata, Formularsteuerelemente und Kontrastverhältnisse in hellen und dunklen Themes.",
    "whatToLookFor": [
        {
            "label": "OS-Präferenz-Synchronisation",
            "description": "Prüft, ob der Browser Dunkelmodus-Umschaltungen des Betriebssystems übernimmt."
        },
        {
            "label": "CSS color-scheme Unterstützung",
            "description": "Testet native Bildlaufleisten und Formularfelder im Dunkelmodus."
        },
        {
            "label": "Komponenten-Kontrast",
            "description": "Bewertet die Lesbarkeit von Texten und Schaltflächen in beiden Modi."
        },
        {
            "label": "Echtes OLED-Schwarz",
            "description": "Prüft die Verwendung von reinem #000000 Schwarz für maximale OLED-Energieersparnis."
        }
    ],
    "canObserve": [
        "Echtzeit-Abfrage von prefers-color-scheme über matchMedia",
        "Unterstützung nativer CSS-Steuerelemente im Dunkelmodus",
        "Umschaltbare Vorschau (System, Hell, Dunkel)",
        "Kontrast und Lesbarkeit von Schriften auf beiden Oberflächen"
    ],
    "cannotMeasure": [
        "Exakte elektrische Stromersparnis des OLED-Panels in Milliampere",
        "Raumlichtanpassung ohne dedizierten Umgebungslichtsensor",
        "Blaulichtfilter-Verschiebungen von Nachtmodus-Tools"
    ],
    "interpretation": "OLED-Displays sparen bei echten schwarzen Hintergründen signifikant Strom und verringern die Augenbelastung bei schwacher Raumbeleuchtung.",
    "nextSteps": {
        "text": "Messen Sie die Umgebungshelligkeit im Raum für optimalen Ergonomie.",
        "actionLabel": "Umgebungslicht-Test starten",
        "actionHref": "/tests/ambient-light-test"
    }
},

  "input-lag-test": {
    "overview": "Der Eingabeverzögerung-Visualisierer führt einen 10-Versuchs-Reaktionstest durch und misst die Latenz zwischen optischem Signal und Mausklick. Er liefert Durchschnitt, Standardabweichung und ein Histogramm.",
    "whatToLookFor": [
        {
            "label": "Optische Reaktionszeit",
            "description": "Misst die Millisekunden vom Farbwechsel bis zur Klick-Registrierung."
        },
        {
            "label": "Statistische Konstanz",
            "description": "Geringe Standardabweichung (< 25 ms) zeigt ein stabiles Gesamtsystem."
        },
        {
            "label": "Fehlstarts & Ausreißer",
            "description": "Erkennt vorzeitige Klicks vor dem grünen Signal."
        },
        {
            "label": "Verteilungshistogramm",
            "description": "Zeigt die Häufung der Reaktionszeiten im Zeitverlauf."
        }
    ],
    "canObserve": [
        "Hochpräzise Zeitstempel über performance.now()",
        "Statistiken: Durchschnitt, Bester, Schlechtester Wert und Standardabweichung über 10 Versuche",
        "Zustandslogik zur Vermeidung von Frühstarts",
        "Histogramm zur Verteilung der Reaktionszeiten"
    ],
    "cannotMeasure": [
        "Reine optische Photodioden-Latenz ohne externe Testhardware (z. B. NVIDIA LDAT)",
        "Isoliertes USB-Polling getrennt von Windows-Interrupts",
        "Reaktionszeit der Flüssigkristalle des Monitors"
    ],
    "interpretation": "Gesamtwerte von 180 ms bis 240 ms sind typisch für Gaming-Monitore. Werte über 300 ms deuten auf aktives Bild-Post-Processing am Monitor (Spielmodus aktivieren) hin.",
    "nextSteps": {
        "text": "Prüfen Sie die tatsächliche Bildwiederholrate Ihres Monitors.",
        "actionLabel": "Bildwiederholrate testen",
        "actionHref": "/tests/refresh-rate-test"
    }
},

  "ambient-light-test": {
    "overview": "Der Umgebungslicht-Sensor-Test liest Beleuchtungsstärken in Lux (lx) über die AmbientLightSensor API aus und empfiehlt ergonomische Bildschirmhelligkeiten.",
    "whatToLookFor": [
        {
            "label": "Echtzeit-Beleuchtungsstärke (Lux)",
            "description": "Misst das Raumlicht über den integrierten Fotosensor des Geräts."
        },
        {
            "label": "Ergonomische Helligkeitsempfehlung",
            "description": "Empfiehlt optimale Monitorhelligkeiten für die aktuellen Lichtverhältnisse."
        },
        {
            "label": "Blendungs-Warnung",
            "description": "Erkennt übermäßige Raumhelligkeit (> 1000 lx), die zu Reflexionen führt."
        },
        {
            "label": "Lichtstabilität",
            "description": "Zeichnet Lichtschwankungen durch Lampenflackern oder Tageslicht auf."
        }
    ],
    "canObserve": [
        "Echtzeit-Lux-Werte von Hardware-Fotosensoren",
        "Zoneneinteilung (Dunkelheit, Dämmerung, Büro, Hell, Tageslicht)",
        "Empfohlene Monitor-Helligkeitseinstellung in Prozent",
        "Verlaufsdiagramm der Raumhelligkeit während des Tests"
    ],
    "cannotMeasure": [
        "Sensordaten auf Systemen ohne Generic Sensor API Unterstützung",
        "Farbtemperatur (Kelvin) oder Farbwiedergabeindex (CRI) des Raumlichts",
        "Einfallswinkel von störenden Lichtreflexionen"
    ],
    "interpretation": "In Büroumgebungen sind 300 bis 500 Lux bei ca. 120–150 Nits Displayhelligkeit ideal. Bei Werten unter 50 Lux sollte der Monitor stark abgedunkelt werden.",
    "nextSteps": {
        "text": "Kalibrieren Sie Helligkeit und Schwarzwerte Ihres Bildschirms.",
        "actionLabel": "Helligkeitstest starten",
        "actionHref": "/tests/brightness-test"
    }
},

  "dpi-calculator": {
    "overview": "Der DPI & PPI Rechner berechnet Pixeldichte, Pixelabstand (Dot Pitch), Gesamtmegapixel und Retina-Sichtabstände basierend auf Bildschirmdiagonale und Auflösung.",
    "whatToLookFor": [
        {
            "label": "Pixel pro Zoll (PPI)",
            "description": "Misst die räumliche Pixeldichte über die Diagonale des Bildschirms."
        },
        {
            "label": "Pixelabstand (Dot Pitch)",
            "description": "Berechnet den Abstand benachbarter Subpixelzentren in Millimetern."
        },
        {
            "label": "Retina-Betrachtungsabstand",
            "description": "Ermittelt den Abstand, ab dem das menschliche Auge keine Einzelpixel mehr erkennt (60 PPD)."
        },
        {
            "label": "Seitenverhältnis & Megapixel",
            "description": "Berechnet Bildfläche, Seitenverhältnis und Gesamtzahl der Pixel."
        }
    ],
    "canObserve": [
        "Berechnete PPI, Pixelabstand in Millimetern und Gesamtmegapixel",
        "Optimale Betrachtungsabstände in Zentimetern und Zoll",
        "Vordefinierte Voreinstellungen für Standardmonitore (24\" 1080p, 27\" 1440p, 32\" 4K)",
        "Interaktive Schieberegler für Auflösung und Diagonale"
    ],
    "cannotMeasure": [
        "Physikalische Maße des Rahmens ohne Benutzereingabe",
        "Optische Mattierungsunschärfe durch Anti-Glare-Beschichtungen",
        "Anamorphe Verzerrungen bei Sondermonitoren"
    ],
    "interpretation": "Eine Pixeldichte über 110 PPI bietet scharfe Schrift auf dem Desktop; über 220 PPI wird echte Retina-Schärfe bei normalem Schreibtischabstand (50–60 cm) erreicht.",
    "nextSteps": {
        "text": "Prüfen Sie die Schärfe und Subpixel-Darstellung von Schriften.",
        "actionLabel": "Textschärfe-Test starten",
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

