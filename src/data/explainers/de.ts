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

  "hdr-test": {
    overview: "HDR-Displays bieten höhere Spitzenhelligkeiten und einen erweiterten Farbraum. Dieser Test prüft die HDR-Unterstützung im Browser und visualisiert Tonemapping und Spitzenweiß-Differenzierung.",
    whatToLookFor: [
      {
        label: "HDR-Erkennung im Browser",
        description: "Prüfen Sie, ob '(dynamic-range: high)' aktiv gemeldet wird. Wenn nicht, ist HDR im Betriebssystem deaktiviert."
      },
      {
        label: "Spitzenweiß-Differenzierung",
        description: "Symbole in den Testfeldern für 90%, 94%, 97% und 99% Weiß sollten sich klar vom Hintergrund abheben."
      },
      {
        label: "Clipping in hellen Bereichen",
        description: "Verschmelzen 94% bis 100% Weiß zu einer einzigen Fläche, schneidet das Panel Spitzen ab, statt sauber abzubilden."
      },
      {
        label: "Erweiterter Farbraum (Wide Color Gamut)",
        description: "Prüfen Sie, ob hochgesättigte Farben kräftiger wirken als bei normalem SDR-Material."
      }
    ],
    canObserve: [
      "Meldung der Browser-Umgebung für High Dynamic Range und Farbtiefe-APIs",
      "Visuelle Trennung feinster Helligkeitsstufen bis hin zum Spitzenweiß",
      "Erkennbarkeit von Schattendetails in HDR-Testfeldern"
    ],
    cannotMeasure: [
      "Spitzenleuchtdichte in cd/m² (Nits) ohne optischen Messsensor",
      "Konformität zu VESA-DisplayHDR-Stufen (z. B. DisplayHDR 400 vs. 1000)",
      "Exakte PQ-Kurventreue (ST 2084 EOTF)"
    ],
    interpretation: "Viele Einstiegsmonitore mit 'HDR400' besitzen kein echtes Local Dimming und erreichen kaum mehr Helligkeit als im SDR-Betrieb, was zu flauen Farben führen kann.",
    nextSteps: {
      text: "HDR wirkt grau, dunkel oder ausgewaschen? Lesen Sie unseren Ratgeber zur richtigen HDR-Einstellung.",
      actionLabel: "HDR Troubleshooting öffnen",
      actionHref: "/knowledge-base/troubleshooting#hdr-not-working"
    }
  },

  "resolution-checker": {
    overview: "Betriebssysteme nutzen Skalierungsfaktoren, um Oberflächen auf hochauflösenden Bildschirmen lesbar zu halten. Dieser Checker ermittelt die logischen CSS-Pixel, den Skalierungsfaktor (DPR) und die native Auflösung.",
    whatToLookFor: [
      {
        label: "Native vs. logische Auflösung",
        description: "Ein 4K-Monitor bei 150% Skalierung meldet 2560×1440 CSS-Pixel mit DPR 1,5, was rechnerisch 3840×2160 echten Pixeln entspricht."
      },
      {
        label: "Device Pixel Ratio (DPR)",
        description: "Der Multiplikator zwischen CSS-Pixeln und Display-Punkten (z. B. 1,0 = 100%, 1,25 = 125%, 2,0 = 200%)."
      },
      {
        label: "Nutzbare Arbeitsfläche",
        description: "Screen.availWidth und availHeight zeigen den Platz nach Abzug der Windows-Taskleiste oder des Docks an."
      },
      {
        label: "Viewport vs. Bildschirmgröße",
        description: "Window.innerWidth zeigt die Fenstergröße an – getrennt von der vollen Monitorauflösung."
      }
    ],
    canObserve: [
      "Vom Browser gemeldete Bildschirmmaße (screen.width, screen.height, availWidth/Height)",
      "Skalierungsfaktor (devicePixelRatio) und berechnete physische Renderauflösung",
      "Abmessungen des sichtbaren Browser-Viewports"
    ],
    cannotMeasure: [
      "Physische Panelmatrix, wenn Signal vor dem Monitor herunterskaliert wird",
      "Skalierungsüberschreibungen externer TV-Eingänge oder Capture-Cards",
      "Nicht-quadratische Pixelmodi, die hardwareseitig erzwungen werden"
    ],
    interpretation: "Stimmt die Auflösung nicht mit den Herstellerangaben überein, prüfen Sie die Windows-Skalierungseinstellungen. Eine Rückstellung auf 100% stellt die 1:1-Ausgabe wieder her.",
    nextSteps: {
      text: "Vergleichen Sie Monitorauflösungen, Diagonalen und Pixeldichte (PPI) in unserem Vergleichsrechner.",
      actionLabel: "Displays vergleichen & PPI berechnen",
      actionHref: "/tests/compare-displays"
    }
  },

  "display-info": {
    overview: "Der Webbrowser stellt Umgebungsdaten über das aktive Display, Fenstergrenzen, Farbtiefe, Pixeldichte und Eingabemethoden bereit. Diese Übersicht fasst alle erreichbaren Parameter zusammen.",
    whatToLookFor: [
      {
        label: "Ausgabe der Farbtiefe",
        description: "Screen.colorDepth meldet die Bit-Tiefe (typisch 24-Bit für 8-Bit-RGB oder 30-Bit für 10-Bit-Pipelines)."
      },
      {
        label: "Touchscreen-Erkennung",
        description: "Navigator.maxTouchPoints zeigt an, ob der Browser einen aktiven Touch-Digitizer erkennt."
      },
      {
        label: "Multi-Monitor-Grenzen",
        description: "Aus Sicherheitsgründen dürfen Web-Apps Monitormodelle und Seriennummern nicht ohne Sonderrechte auslesen."
      },
      {
        label: "Animations-Frametakt",
        description: "Echtzeit-Telemetrie liefert eine Schätzung der aktiven Bildausgabe im Browserfenster."
      }
    ],
    canObserve: [
      "Alle standardisierten Screen-, Window-, Navigator- und Media-Query-Parameter",
      "Device Pixel Ratio, Farbtiefe, Pixeltiefe und Bildschirmausrichtung",
      "Unterstützung von Touch-Eingaben und Zeigergeräten"
    ],
    cannotMeasure: [
      "Monitor-EDID-Seriennummern oder Gerätenamen ohne gesonderte Freigabe",
      "Physische HDMI- oder DisplayPort-Kabelbandbreite",
      "Hardware-Bildwiederholfrequenz unabhängig von Betriebssystembeschränkungen"
    ],
    interpretation: "Webbrowser laufen in einer Sandbox. Die angezeigten Parameter entsprechen den Daten, die Betriebssystem und Fenstermanager der App zur Verfügung stellen.",
    nextSteps: {
      text: "Möchten Sie Geometrie und Seitenverhältnisse prüfen? Starten Sie den Skalierungs-Test.",
      actionLabel: "Seitenverhältnis & Skalierung testen",
      actionHref: "/tests/scaling-aspect-test"
    }
  },

  "scaling-aspect-test": {
    overview: "Fehlerhafte Skalierungseinstellungen verzerren Bildinhalte, stauchen Kreise zu Ovalen und lassen Schriften matschig wirken. Dieser Test prüft mit Referenzgeometrie und Seitenverhältnissen (16:9, 16:10, 21:9, 4:3) die 1:1-Darstellung.",
    whatToLookFor: [
      {
        label: "Geometrische Kreisform",
        description: "Prüfen Sie, ob der Referenzkreis exakt rund ist. Wirkt er oval, liegt eine Seitenverhältnis-Verzerrung vor."
      },
      {
        label: "Quadratische Pixel (1:1)",
        description: "Jedes Quadrat des Schachbrettmusters muss exakt die gleiche Breite und Höhe aufweisen."
      },
      {
        label: "Seitenverhältnis-Rahmen",
        description: "Prüfen Sie, ob Ihr Bildinhalt exakt an den 16:9-, 16:10- oder 21:9-Begrenzungslinien anliegt."
      },
      {
        label: "GPU-Skalierungsmodus",
        description: "Erscheinen schwarze Balken bei nativer Auflösung, prüfen Sie die Skalierungseinstellungen im Grafikkartentreiber."
      }
    ],
    canObserve: [
      "Visuelle Kreis- und Quadratgeometrie im Browser-Viewport",
      "Übereinstimmung mit 16:9, 16:10, 21:9 und 4:3 Referenzrahmen",
      "Berechnung des aktiven Seitenverhältnisses des Browserfensters"
    ],
    cannotMeasure: [
      "Millimetergenaue Rahmenmaße des Gehäuses",
      "Anamorphotische optische Linsenverzerrungen bei Projektoren",
      "Hardware-Seitenverhältnis-Modi externer Videoprozessoren"
    ],
    interpretation: "Verzerrungen entstehen meist, wenn nicht-native Auflösungen gewählt werden, ohne 'Seitenverhältnis beibehalten' im Grafikkartentreiber zu aktivieren.",
    nextSteps: {
      text: "Schließen Sie einen Fernseher an? Prüfen Sie Bildkanten auf Overscan-Beschnitt.",
      actionLabel: "TV-Overscan prüfen",
      actionHref: "/tests/tv-overscan-test"
    }
  },

  "compare-displays": {
    overview: "Bildschirmdiagonale, Auflösung und Pixeldichte (PPI) bestimmen Arbeitsfläche und Schärfe. Dieses Werkzeug vergleicht Abmessungen, Gesamtpixelzahlen und Pixeldichten zweier Monitore direkt miteinander.",
    whatToLookFor: [
      {
        label: "Pixeldichte (PPI)",
        description: "Höhere PPI sorgen für schärfere Schriften. ~110 PPI ist Standard für Desktop-Monitore, ab ~220 PPI spricht man von Retina-Schärfe."
      },
      {
        label: "Physische Breite & Höhe",
        description: "Ein 27-Zoll-Monitor im 16:9-Format bietet deutlich mehr vertikale Höhe als ein 29-Zoll-Ultrawide-Display (21:9)."
      },
      {
        label: "Gesamtzahl der Pixel",
        description: "Ein 4K-Display (8,29 Megapixel) besitzt viermal so viele Pixel wie ein Standard-Full-HD-Bildschirm (2,07 Megapixel)."
      },
      {
        label: "Optimaler Betrachtungsabstand",
        description: "Bei höherer Pixeldichte können Sie näher am Bildschirm sitzen, ohne einzelne Pixelstrukturen zu erkennen."
      }
    ],
    canObserve: [
      "Mathematische Berechnung von PPI, Seitenverhältnissen und Bildflächen auf Basis Ihrer Eingaben",
      "Proportionaler visueller Größenvergleich zweier Display-Konfigurationen nebeneinander",
      "Berechnung des Pixelabstands (Dot Pitch in Millimetern)"
    ],
    cannotMeasure: [
      "Automatische Erkennung der Bildschirmdiagonale ohne Benutzereingabe",
      "Physische Gehäusedicke oder Maße des Standfußes",
      "Reale Krümmungsradien (z. B. 1000R vs. 1800R) gebogener Bildschirme"
    ],
    interpretation: "Die Pixeldichte wird über den Satz des Pythagoras aus Pixelauflösung und Diagonale errechnet. Da Browser-APIs die Bildschirmdiagonale nicht auslesen können, ist die manuelle Eingabe erforderlich.",
    nextSteps: {
      text: "Erfahren Sie, wie sich die Pixeldichte auf Schriftbild und Rendering auswirkt.",
      actionLabel: "Textschärfe-Ratgeber lesen",
      actionHref: "/knowledge-base/text-clarity-and-subpixel-rendering"
    }
  },

  "tv-overscan-test": {
    overview: "Overscan ist ein Relikt früherer Fernsehtechnik: Die äußeren 2% bis 5% des Bildes werden abgeschnitten und herangezoomt. Bei PCs und Konsolen schneidet dies Taskleisten ab und macht Schriften durch fehlendes 1:1-Pixelmapping unscharf.",
    whatToLookFor: [
      {
        label: "Sichtbarkeit des 0%-Rahmens",
        description: "Können Sie die weiße Außenlinie mit den 0%-Pfeilen nicht sehen, schneidet Ihr Fernseher das Bild ab."
      },
      {
        label: "Overscan-Prozentmarkierungen",
        description: "Anhand der 2,5%- und 5%-Markierungen sehen Sie genau, welcher Anteil Ihres Desktops verloren geht."
      },
      {
        label: "Eck-Fadenkreuze",
        description: "Die Fadenkreuze in den Bildecken sollten exakt an den physischen Gehäusekanten enden."
      },
      {
        label: "1:1 Pixelmapping-Schärfemuster",
        description: "Achten Sie auf das 1-Pixel-Schachbrettmuster. Flimmert es oder wirkt es matschig, skaliert der TV das Signal."
      }
    ],
    canObserve: [
      "Sichtbarkeit der Außenkanten und prozentuale Beschnitt-Marken (0%, 2,5%, 5%)",
      "Intaktes 1-Pixel-Prüfmuster zur Erkennung von Interpolationsunschärfe",
      "Visuelle Kontrolle vor und nach Anpassung der TV-Bildeinstellungen"
    ],
    cannotMeasure: [
      "Direkte Steuerung der internen Firmware-Menüs des Fernsehers",
      "Automatische Erkennung der aktiven Bildformate über HDMI-CEC",
      "Physische Rahmenüberdeckung gegenüber elektronischem Bildbeschnitt"
    ],
    interpretation: "Um ein scharfes Bild ohne Randbeschnitt zu erhalten, stellen Sie das Bildformat am Fernseher auf 'Nur Scan', '1:1 Pixel', 'Bildanpassung', 'Voll' oder 'Dot-by-Dot'.",
    nextSteps: {
      text: "Hilfe bei Samsung-, LG-, Sony- oder Philips-Fernsehern? Folgen Sie unserer Anleitung.",
      actionLabel: "TV-Overscan & 1:1 Mapping Guide lesen",
      actionHref: "/knowledge-base/tv-overscan-and-pixel-mapping"
    }
  },

  "multi-touch-test": {
    overview: "Dieser Test erfasst gleichzeitige Berührungspunkte auf Touchscreens und Tablets. Er visualisiert Koordinaten, zählt aktive Fingerkontakte und stellt sicher, dass Mehrfingergesten fehlerfrei verarbeitet werden.",
    whatToLookFor: [
      {
        label: "Gleichzeitige Berührungspunkte",
        description: "Legen Sie mehrere Finger gleichzeitig auf das Glas. Der Zähler sollte 2, 5 oder 10 Berührungen zuverlässig melden."
      },
      {
        label: "Flüssige Kontaktverfolgung",
        description: "Ziehen Sie mehrere Finger über den Bildschirm; die Spuren sollten ohne Abbrüche durchgezogen bleiben."
      },
      {
        label: "Systemgesten-Konflikte",
        description: "Achten Sie darauf, ob 3- oder 4-Finger-Berührungen Systemfunktionen (wie App-Wechsel) auslösen, statt im Test zu landen."
      },
      {
        label: "Handballenerkennung (Palm Rejection)",
        description: "Legen Sie den Handballen auf das Display, um zu prüfen, ob die Software große Kontaktflächen herausfiltert."
      }
    ],
    canObserve: [
      "In Echtzeit an das Browserfenster übermittelte Touch- und Pointer-Ereignisse",
      "Koordinaten, IDs und Gesamtzahl simultan erkannter Berührungspunkte",
      "Meldung der navigator.maxTouchPoints Eigenschaft des Browsers"
    ],
    cannotMeasure: [
      "Abtastrate des Digitizers in Hertz (z. B. 120Hz vs. 240Hz Touch-Sampling-Rate)",
      "Kapazitive Druckstufen ohne herstellerspezifische Schnittstellen",
      "Defekte in der Leiterbahn-Matrix des Digitizers, die das Betriebssystem nicht meldet"
    ],
    interpretation: "Die Anzahl simultan erkannter Berührungen hängt von der Hardware des Touch-Digitizers und den Treibern des Betriebssystems ab.",
    nextSteps: {
      text: "Möchten Sie die gesamte Oberfläche auf tote Zonen und Zeichenunterbrechungen prüfen?",
      actionLabel: "Touchscreen-Flächentest starten",
      actionHref: "/tests/touch-screen-test"
    }
  },

  "webcam-test": {
    overview: "Prüft Ihre Kamera direkt über die WebRTC-Schnittstelle des Browsers (getUserMedia). Sie können die Videoauflösung kontrollieren, Bildraten überwachen und Berechtigungsprobleme lokal untersuchen.",
    whatToLookFor: [
      {
        label: "Videostream-Auflösung",
        description: "Prüfen Sie, ob die gemeldete Auflösung den Herstellerangaben entspricht (z. B. 1920×1080 Full HD)."
      },
      {
        label: "Stabilität der Bildrate",
        description: "Beobachten Sie den FPS-Zähler. Bei schlechtem Licht drosseln viele Kameras auf 15–20 FPS, um länger zu belichten."
      },
      {
        label: "Farbabgleich & Belichtung",
        description: "Achten Sie auf überstrahlte Gesichter, Weißabgleich bei Kunstlicht und störendes Bildrauschen in dunklen Bereichen."
      },
      {
        label: "Kamera-Berechtigungsabfragen",
        description: "Prüfen Sie, ob der Browser den Kamerazugriff ohne Konflikte mit anderen Programmen anfordert."
      }
    ],
    canObserve: [
      "Echtzeit-Videowiedergabe, die vollständig lokal in Ihrem Browser verarbeitet wird",
      "Ausgehandelte Auflösung (Breite, Höhe) und Bildfrequenz des Videostreams",
      "Gerätenamen und Erkennung über MediaDeviceInfo-Schnittstellen"
    ],
    cannotMeasure: [
      "Physikalische Sensorauflösung unabhängig von den Betriebssystemtreibern",
      "Optische Linsenverzerrungen oder chromatische Aberrationen des Objektivs",
      "Kalibrierte Lichtempfindlichkeit in Lux bei wechselnder Umgebungsbeleuchtung"
    ],
    interpretation: "Videostreams werden vom Betriebssystemtreiber bereitgestellt. Stehen hohe Auflösungen nicht zur Verfügung, prüfen Sie USB-Bandbreiten oder Privatsphäre-Schalter.",
    nextSteps: {
      text: "Kamera wird nicht erkannt oder Zugriff blockiert? Nutzen Sie unsere Fehlerbehebung.",
      actionLabel: "Webcam Troubleshooting lesen",
      actionHref: "/knowledge-base/troubleshooting#webcam-access-denied"
    }
  },

  "speaker-test": {
    overview: "Nutzt die Web Audio API, um Lautsprecher, Kopfhörer und Soundsysteme zu prüfen. Testet Stereotrennung (Links, Rechts, Beide) und deckt mit Frequenzdurchläufen (20Hz bis 20.000Hz) Klirrgeräusche auf.",
    whatToLookFor: [
      {
        label: "Stereo-Kanaltrennung",
        description: "Beim Testen des linken Kanals darf der Ton ausschließlich aus dem linken Lautsprecher oder Kopfhörertreiber ertönen."
      },
      {
        label: "Tiefton-Wiedergabe (20Hz–100Hz)",
        description: "Hören Sie auf Subbass-Frequenzen. Kleine Laptop-Lautsprecher setzen unterhalb von 80–100Hz meist komplett aus."
      },
      {
        label: "Hochton-Grenze (10kHz–20kHz)",
        description: "Achten Sie darauf, ab welcher Frequenz Töne durch Treibergrenzen oder das menschliche Gehör verstummen."
      },
      {
        label: "Gehäuserappeln & Vibrationen",
        description: "Mittenbässe (100Hz–300Hz) bringen lose Schreibtischgegenstände oder Monitorlautsprecher schnell zum Vibrieren."
      }
    ],
    canObserve: [
      "Audiosignalerzeugung und Stereo-Panning auf linkem, rechtem und beiden Kanälen",
      "Lückenlose Frequenzsweeps über das menschliche Hörspektrum (20Hz bis 20.000Hz)",
      "AudioContext-Samplerate und Ausgabefähigkeit der Web Audio API"
    ],
    cannotMeasure: [
      "Schalldruckpegel (SPL in Dezibel, dB) ohne kalibriertes Labormikrofon",
      "Total Harmonic Distortion (THD) oder elektrische Lautsprecher-Impedanz",
      "Raumakustische Frequenzgangkurven Ihres Zimmers"
    ],
    interpretation: "Der Stereotest stellt sicher, dass das Audiosignal nicht versehentlich in Mono ausgegeben wird. Frequenzdurchläufe helfen, störendes Gehäusescheppern zu identifizieren.",
    nextSteps: {
      text: "Kein Ton oder falsche Kanalzuordnung? Lesen Sie unsere Fehlerbehebung für Audioausgaben.",
      actionLabel: "Lautsprecher Troubleshooting lesen",
      actionHref: "/knowledge-base/troubleshooting#speaker-no-sound"
    }
  },

  "accelerometer-test": {
    overview: "Der Beschleunigungsmesser-Test misst die lineare Beschleunigung und Gravitationskräfte entlang dreier physischer Achsen (X, Y und Z) mithilfe der DeviceMotionEvent-API. Er visualisiert Neigung, dynamische Bewegung und die Erdbeschleunigung von 1g in Echtzeit.",
    whatToLookFor: [
      {
        label: "Verteilung der Gravitationskraft (1g)",
        description: "Flach auf dem Tisch liegend sollte die Z-Achse etwa ~9,8 m/s² (1g) anzeigen, während X und Y nahe 0 m/s² verweilen."
      },
      {
        label: "Achsenreaktion bei Neigung",
        description: "Das Neigen nach links/rechts verändert die X-Werte, während Vor- und Zurückneigen die Y-Werte stufenlos anpasst."
      },
      {
        label: "Ausschläge bei schneller Bewegung",
        description: "Ruckartiges Schütteln oder Bewegen erzeugt vorübergehende Beschleunigungsspitzen im interaktiven Echtzeit-Diagramm."
      },
      {
        label: "Sensor-Berechtigungsstatus",
        description: "Unter iOS Safari ist eine explizite Benutzerbestätigung erforderlich, bevor Bewegungsdaten an den Browser übertragen werden."
      }
    ],
    canObserve: [
      "Rohbeschleunigung mit und ohne Gravitation auf X-, Y- und Z-Achsen in m/s²",
      "Vom Browser unterstützte Abtastrate und Aktualisierungsintervalle",
      "Interaktives Ausrichtungs-Fadenkreuz basierend auf dem Erdschwerefeld"
    ],
    cannotMeasure: [
      "Werkskalibriertes Sensor-Offset oder Labor-Nullpunktdrift",
      "Interne mikroelektronische Siliziumfehler im MEMS-Chip",
      "Absolute geografische Position oder GPS-Koordinaten"
    ],
    interpretation: "Ein einwandfreier Beschleunigungsmesser zeigt stabile ~9,8 m/s² auf der nach unten gerichteten Achse. Einfrierende Werte deuten auf Berechtigungsblockaden oder Sensorfehler hin.",
    nextSteps: {
      text: "Sensorwerte verändern sich nicht oder bleiben bei null? Konsultieren Sie unsere Sensor-Fehlerbehebung.",
      actionLabel: "Sensor-Troubleshooting aufrufen",
      actionHref: "/knowledge-base/troubleshooting"
    }
  },

  "gyroscope-test": {
    overview: "Der Gyroskop-Test erfasst die Winkelgeschwindigkeit und Drehbewegung um die Achsen Alpha (Gier/Z), Beta (Nick/X) und Gamma (Roll/Y) über die DeviceOrientationEvent-API. Er bietet einen künstlichen Horizont und eine 3D-Kugel zur Drehprüfung.",
    whatToLookFor: [
      {
        label: "Künstlicher Horizont",
        description: "Die Horizontlinie sollte sich beim seitlichen Kippen sanft neigen und beim Neigen nach oben/unten steigen bzw. sinken."
      },
      {
        label: "Nickwinkel (Beta: -180° bis 180°)",
        description: "Das Vor- und Zurückneigen verändert die Nickgrade stufenlos und ohne sprunghafte Artefakte."
      },
      {
        label: "Rollwinkel (Gamma: -90° bis 90°)",
        description: "Seitliches Kippen aktualisiert den Rollwinkel präzise und richtungstreu."
      },
      {
        label: "Kompasskurs (Alpha: 0° bis 360°)",
        description: "Flaches Drehen des Geräts folgt dem Azimut, sofern ein absoluter Kompass-Sensor verbaut ist."
      }
    ],
    canObserve: [
      "Winkelorientierung (Alpha, Beta, Gamma in Grad) aus dem Browser-Event",
      "Visueller künstlicher Horizont und 3D-Rotationsvorschau",
      "Erkennung von absolutem Kompasskurs versus relativer Bewegung"
    ],
    cannotMeasure: [
      "Thermische Langzeitdrift des MEMS-Gyroskops ohne stationäre Messreihe",
      "Interne Hardware-Abtastraten jenseits der Browser-Ereignisschleife",
      "Magnetische Störfeldkompensation auf Geräten ohne Magnetometer"
    ],
    interpretation: "Das Gyroskop bestimmt die Raumlage durch Integration der Winkelgeschwindigkeit. Minimale Ruhedrift ist bei Mobilgeräten üblich; blockierte Werte weisen auf Systemberechtigungen hin.",
    nextSteps: {
      text: "Neigung reagiert nicht oder invertiert? Prüfen Sie die Berechtigungen für mobile Sensoren.",
      actionLabel: "Sensor-Troubleshooting aufrufen",
      actionHref: "/knowledge-base/troubleshooting"
    }
  },

  "vibration-test": {
    overview: "Der Vibrationstest steuert den haptischen Vibrationsmotor Ihres Mobilgeräts über die HTML5 Vibration API (navigator.vibrate) an. Er prüft Einzelimpulse, rhythmische Takte und Dauervibration.",
    whatToLookFor: [
      {
        label: "Einzelimpuls-Reaktion",
        description: "Ein 200ms- oder 500ms-Testimpuls sollte sofort ein spürbares mechanisches Brummen im Gerätegehäuse erzeugen."
      },
      {
        label: "Rhythmusmuster & Pausen",
        description: "Bei Mustern wie SOS oder Herzschlag prüfen, ob die Pausen zwischen Vibrationen sauber und ohne Nachschwingen getrennt sind."
      },
      {
        label: "Vibrationsstärke & Klang",
        description: "Achten Sie darauf, dass die Vibration gleichmäßig ist und keine scheppernden Fremdgeräusche im Gehäuse auftreten."
      },
      {
        label: "Browser- und Betriebssystem-Support",
        description: "Die Vibration API wird von Android Chrome/Firefox unterstützt, unter Apple iOS Safari ist sie aus Sicherheitsgründen gesperrt."
      }
    ],
    canObserve: [
      "Direkte Ausführung von Vibrationsbefehlen (Einzelimpulse und Arrays) in Millisekunden",
      "Erkennung der navigator.vibrate-Unterstützung und Benutzerinteraktions-Prüfung",
      "Interaktive visuelle Animation synchron zum Vibrationsablauf"
    ],
    cannotMeasure: [
      "Schwingfrequenz des Haptik-Motors in Hz oder Motordrehzahl (RPM)",
      "Mechanische Beschleunigungskraft (G-Kraft) ohne externe Messinstrumente",
      "Unterscheidung zwischen ERM-Rotationsmotor und modernem LRA-Linearmotor"
    ],
    interpretation: "Vibriert ein Android-Smartphone nicht, prüfen Sie die Systemeinstellungen unter Ton & Haptik und deaktivieren Sie den Energiesparmodus. Auf iOS-Geräten ist Web-Vibration prinzipbedingt nicht möglich.",
    nextSteps: {
      text: "Motor vibriert trotz Tastendruck nicht? Lesen Sie unsere Vibrations-Fehlerbehebung.",
      actionLabel: "Vibrations-Troubleshooting lesen",
      actionHref: "/knowledge-base/troubleshooting"
    }
  },

  "microphone-test": {
    overview: "Der Mikrofontest erfasst Audiosignale in Echtzeit über WebRTC getUserMedia und die Web Audio API. Ein Live-Oszilloskop, Frequenzspektrum, Pegelmesser und Loopback-Wiedergabe ermöglichen die akustische Qualitätsprüfung.",
    whatToLookFor: [
      {
        label: "Live-Eingangspegel und VU-Meter",
        description: "Beim Sprechen ins Mikrofon sollte die grüne Pegelanzeige weich ausschlagen (ideal: 40 % bis 75 % bei normaler Sprache)."
      },
      {
        label: "Übersteuerungs- und Clipping-Schutz",
        description: "Laute Laute sollten die Pegelanzeige nicht in den roten Bereich treiben, um digitales Übersteuern zu vermeiden."
      },
      {
        label: "Wellenform & Frequenzspektrum",
        description: "Beobachten Sie, wie Oszilloskop und Frequenzbalken reaktionsschnell auf Tonhöhe und Lautstärke Ihrer Stimme reagieren."
      },
      {
        label: "Klangreinheit bei Loopback-Wiedergabe",
        description: "Nehmen Sie einen kurzen 5-Sekunden-Clip auf und spielen Sie ihn ab, um Hintergrundrauschen, Hall oder Aussetzer zu erkennen."
      }
    ],
    canObserve: [
      "Audio-Wellenform und Spektrum in Echtzeit über Web Audio AnalyserNode",
      "RMS-Lautstärkepegel und Aussteuerungsreserve rein lokal im Browser berechnet",
      "Lokale Testaufnahme und Loopback-Wiedergabe ohne Serverübertragung"
    ],
    cannotMeasure: [
      "Absoluter Schalldruckpegel (dB SPL) ohne geeichtes Messmikrofon",
      "Akustische Richtcharakteristik der Kapsel (Niere, Kugel, Acht)",
      "Analoges Vorverstärker-Eigenrauschen (EIN) vor der A/D-Wandlung"
    ],
    interpretation: "Ein fehlerfreies Mikrofon liefert saubere Wiedergabe bei geringem Grundrauschen. Geringe Lautstärke liegt meist am Systemeinstellungs-Pegel, während starkes Knistern auf Wackelkontakte oder Samplerate-Fehler hinweist.",
    nextSteps: {
      text: "Mikrofon nimmt keinen Ton auf oder klingt verzerrt? Konsultieren Sie unsere Mikrofon-Fehlerbehebung.",
      actionLabel: "Mikrofon-Troubleshooting aufrufen",
      actionHref: "/knowledge-base/troubleshooting#mic-not-working"
    }
  }
};

