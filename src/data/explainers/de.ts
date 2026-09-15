import { ExplainerData, ExplainerLabels } from "./types";

export const DE_LABELS: ExplainerLabels = {
  "overviewHeading": "Übersicht der Displayprüfung",
  "whatToLookForHeading": "Worauf bei der Prüfung zu achten ist",
  "boundariesHeading": "Messgrenzen & Technische Ehrlichkeit",
  "canObserveLabel": "Was Screen Tester beobachten kann",
  "cannotMeasureLabel": "Was der Browser nicht zuverlässig messen kann",
  "interpretationHeading": "Interpretation Ihrer Beobachtungen",
  "nextStepsHeading": "Empfohlene nächste Schritte"
};

export const DE_EXPLAINERS: Record<string, ExplainerData> = {
  "dead-pixel-test": {
    "overview": "Ein toter Pixel ist ein dauerhaft stromloser Flüssigkristall-Subpixel oder OLED-Emitter, der unabhängig vom an ihn gesendeten Signal völlig dunkel bleibt. Auf hellen Hintergründen – insbesondere reinem Weiß, Cyan und Gelb – fallen tote Pixel als scharfes, statisches Schwarz oder dunkle Flecken auf.",
    "whatToLookFor": [
      {
        "label": "Statische dunkle Punkte auf weißen/hellen Bildschirmen",
        "description": "Ein winziger schwarzer Punkt, der sich beim Durchlaufen heller, einfarbiger Hintergründe nicht verändert oder aufleuchtet, weist auf einen toten Pixel hin."
      },
      {
        "label": "Unterscheiden zwischen toten Pixeln und Staub",
        "description": "Oberflächenstaub verschiebt sich bei Betrachtung aus verschiedenen Blickwinkeln und kann vorsichtig abgewischt werden. Ein wirklich toter Pixel sitzt hinter dem äußeren Polarisationsfilter."
      },
      {
        "label": "Subpixel- vs. Vollpixeldefekte",
        "description": "Wenn nur ein Subpixel (rot, grün oder blau) ausgefallen ist, erscheint das Pixel leicht verfärbt und nicht pechschwarz auf weiß."
      },
      {
        "label": "Cluster-Defekte",
        "description": "Mehrere tote Pixel in einem kleinen Bereich stellen einen schwerwiegenden Defekt des Panels dar und qualifizieren sich im Allgemeinen für einen sofortigen Austausch im Rahmen der Herstellergarantie."
      }
    ],
    "canObserve": [
      "Visuelle Identifizierung unbeleuchteter Pixel auf einfarbigen primären und sekundären Hintergründen",
      "Genaue Bildschirmkoordinaten und Anzahl verdächtiger dunkler Flecken in allen Anzeigezonen",
      "Kontrastvalidierung zwischen Hintergrundleuchtdichte und nicht betriebenen Subpixeln"
    ],
    "cannotMeasure": [
      "Zugrunde liegender elektrischer Durchgang oder Spannungszustand des Dünnschichttransistors (TFT).",
      "Automatische Erkennung ohne visuelle Inspektion durch den Benutzer",
      "Klassifizierung physischer Herstellungsfehler unter Glasschichten"
    ],
    "interpretation": "Tote Pixel werden durch mikroskopisch kleine Transistorausfälle während der Panel-Herstellung oder durch physische Einwirkungen verursacht. Die meisten Displayhersteller befolgen die Richtlinien der ISO 9241-307 Klasse 1 oder Klasse 2, die akzeptable Schwellenwerte festlegen (normalerweise 2 bis 5 tote Subpixel pro Million).",
    "nextSteps": {
      "text": "Wenn Sie feststeckende Subpixel entdecken, die weiterhin leuchten statt schwarz, versuchen Sie mit unserem speziellen Übungstool eine Wiederherstellung.",
      "actionLabel": "Starten Sie Stuck Pixel Fixer",
      "actionHref": "/tests/stuck-pixel-fixer"
    }
  },
  "stuck-pixel-test": {
    "overview": "Im Gegensatz zu einem toten Pixel, das dauerhaft dunkel bleibt, wird ein festsitzendes Pixel dadurch verursacht, dass eine Flüssigkristallzelle in einem offenen Zustand festsitzt und das Hintergrundlicht kontinuierlich durchlässt. Es erscheint als dauerhafter heller Farbpunkt – typischerweise Rot, Grün, Blau, Cyan, Magenta oder reines Weiß – der vor allem vor schwarzem und dunklem Hintergrund sichtbar ist.",
    "whatToLookFor": [
      {
        "label": "Helle farbige Punkte auf reinem Schwarz",
        "description": "Untersuchen Sie einen rein schwarzen Bildschirm in einem abgedunkelten Raum. Jeder scharfe Punkt, der rot, grün, blau oder gelb leuchtet, ist ein festsitzendes Subpixel."
      },
      {
        "label": "Komplementäre Farbprüfung",
        "description": "Ein grünes, festsitzendes Subpixel verschwindet vor einem grünen Hintergrund, leuchtet jedoch intensiv vor roten, blauen oder schwarzen Hintergründen."
      },
      {
        "label": "Heiße weiße Pixel",
        "description": "Wenn alle drei Subpixel (RGB) dauerhaft offen bleiben, erscheint der Punkt als statischer weißer Punkt auf dunklen Hintergründen."
      },
      {
        "label": "Unterscheidung von Backlight Bleed",
        "description": "Bei festsitzenden Pixeln handelt es sich um punktförmige Lichtpunkte aus einzelnen Pixeln, wohingegen Backlight Bleeding diffuse, wolkenartige Flecken entlang der Displayränder erzeugt."
      }
    ],
    "canObserve": [
      "Visuelle Identifizierung beleuchteter Subpixel vor dunklem und komplementärem Hintergrund",
      "Isolierung einzelner defekter Subpixel-Farbkanäle (R, G oder B)",
      "Bildschirmquadrantenkartierung fehlerhafter Pixel"
    ],
    "cannotMeasure": [
      "Chemische Viskosität oder physikalischer Ausrichtungszustand eines Flüssigkristalls",
      "Schaltgeschwindigkeit oder elektrischer Widerstand des Transistor-Gates",
      "Garantierte Dauerhaftigkeit des Mangels ohne längere Beobachtung"
    ],
    "interpretation": "Festsitzende Pixel treten häufig auf, wenn ein Flüssigkristallmolekül nicht in seinen entspannten Zustand zurückkehrt, häufig aufgrund von Herstellungsunregelmäßigkeiten oder mikroskopisch kleinen elektrischen Ladungen. Im Gegensatz zu toten Pixeln können vorübergehend festsitzende Pixel manchmal durch visuelle Stimulation gelöst werden.",
    "nextSteps": {
      "text": "Haben Sie ein festsitzendes Pixel gefunden? Versuchen Sie eine schnelle visuelle Subpixel-Stimulation mit unserem lokalisierten Farbtrainer.",
      "actionLabel": "Versuchen Sie es mit Stuck Pixel Fixer",
      "actionHref": "/tests/stuck-pixel-fixer"
    }
  },
  "stuck-pixel-fixer": {
    "overview": "Der Stuck Pixel Fixer nutzt lokalisierte hochfrequente Farbzyklen und visuelle Rauschmuster, um Flüssigkristallmoleküle schnell anzuregen. Der schnelle Wechsel von Primär- und Sekundärfarben zwingt Subpixeltransistoren und Flüssigkristallzellen dazu, den Zustand mit hoher Geschwindigkeit umzuschalten, was gelegentlich dazu führen kann, dass ein vorübergehend festsitzendes Subpixel freigegeben wird.",
    "whatToLookFor": [
      {
        "label": "Gezielte Boxausrichtung",
        "description": "Positionieren Sie das animierte Stimulationsfeld direkt über dem festsitzenden Pixel, um störende bildschirmweite Stroboskopeffekte zu vermeiden."
      },
      {
        "label": "Musterauswahl",
        "description": "Wechseln Sie zwischen RGB-Zyklus (breite Stimulation) und Farbrauschen (zufällige Hochfrequenzanregung), um optimale Ergebnisse zu erzielen."
      },
      {
        "label": "Sitzungsdauer",
        "description": "Lassen Sie die Stimulation 15 bis 30 Minuten lang laufen, pausieren Sie dann und prüfen Sie anhand von reinem Schwarz, ob sich das Pixel gelöst hat."
      },
      {
        "label": "Hinweis zur visuellen Empfindlichkeit",
        "description": "Wenn Sie Schwindel, Kopfschmerzen oder eine Überanstrengung der Augen verspüren, beenden Sie die Stimulation sofort. Niemals verwenden, wenn es lichtempfindlich ist."
      }
    ],
    "canObserve": [
      "Visuelle Echtzeitwiedergabe von Hochgeschwindigkeits-RGB-Zyklen und zufälligen Subpixel-Rauschmustern",
      "Präzise lokalisierte Positionierung und Timer-Dauerverfolgung direkt in Ihrem Browser",
      "Visuelle Bestätigung, ob sich die Pixelreaktionsfähigkeit vor und nach der Stimulation ändert"
    ],
    "cannotMeasure": [
      "Elektrische Reparatur von physisch beschädigten oder durchgebrannten TFT-Transistoren auf Hardwareebene",
      "Jeder garantierte Wiederherstellungsprozentsatz – der Erfolg hängt vollständig von der physikalischen Panel-Chemie ab",
      "Automatische Software-Reparatur toter (dauerhaft nicht mit Strom versorgter schwarzer) Pixel"
    ],
    "interpretation": "Software-Übungsteilnehmer arbeiten ausschließlich an temporär festsitzenden Flüssigkristallzellen. Wenn ein Subpixel physisch abgetrennt, gebrochen oder völlig tot (ohne Stromversorgung) ist, kann es durch Softwarestimulation nicht wiederbelebt werden. Wenn die Stimulation nach wiederholten Sitzungen fehlschlägt, lesen Sie die Garantiebedingungen des Herstellers.",
    "nextSteps": {
      "text": "Wechseln Sie nach dem Ausführen der Stimulation zurück zum Stuck Pixel Test, um den Bereich auf reines Schwarz zu prüfen.",
      "actionLabel": "Überprüfen Sie dies mit dem Stuck-Pixel-Test",
      "actionHref": "/tests/stuck-pixel-test"
    }
  },
  "refresh-rate-test": {
    "overview": "Ihre Bildwiederholfrequenz (gemessen in Hertz, Hz) gibt an, wie oft pro Sekunde der Bildschirm das Bild wiederherstellt. Dieser Test verwendet die hochauflösende Animationsuhr des Browsers (requestAnimationFrame), um die Geschwindigkeit der Frame-Übermittlung zu beobachten, ausgelassene Frames zu erkennen und zu überprüfen, ob der Browser mit der konfigurierten Aktualisierungsrate Ihres Betriebssystems übereinstimmt.",
    "whatToLookFor": [
      {
        "label": "Gemeldete vs. konfigurierte Aktualisierungsrate",
        "description": "Stellen Sie sicher, dass der gemeldete Wert mit dem Ziel Ihres Displays übereinstimmt (z. B. 60 Hz, 120 Hz, 144 Hz, 240 Hz oder 360 Hz)."
      },
      {
        "label": "Frame-Pacing und Jitter",
        "description": "Sehen Sie sich das Interframe-Zeitdelta-Diagramm an. Ein stabiles 144-Hz-Display sollte Bilder in konsistenten Intervallen von ~6,94 ms liefern."
      },
      {
        "label": "Browser-Frame-Capping",
        "description": "Wenn ein 144-Hz-Monitor genau 60 Hz meldet, sind die Anzeigeeinstellungen Ihres Browsers oder Betriebssystems möglicherweise begrenzt, um Batterie zu sparen, oder es fehlen GPU-Flags."
      },
      {
        "label": "Glätte der beweglichen Anzeige",
        "description": "Überprüfen Sie die bewegliche Stange. Auf Displays mit hoher Bildwiederholfrequenz sollte die Animation mit minimalem Ruckeln oder Stottern gleiten."
      }
    ],
    "canObserve": [
      "Browser-RequestAnimationFrame-Rückrufhäufigkeit und Delta-Zeitvarianz",
      "Berechnete Browser-Animations-FPS und Frame-Pacing-Konsistenz",
      "Fensterbasierte Compositor-Synchronisierungsbereitstellung im aktiven Browser-Tab"
    ],
    "cannotMeasure": [
      "Aktualisierungsrate der physischen Panel-Hardware unabhängig von Browser-Compositor-Grenzwerten",
      "DisplayPort- oder HDMI-Kabelverbindungsbandbreite und Paket-Timing",
      "Vertikale Austastintervalle auf Oszilloskopebene (VBLANK) oder Panel-Overdrive-Timing"
    ],
    "interpretation": "Webbrowser synchronisieren ihre Rendering-Schleifen über vsync mit dem Display-Compositor. Allerdings können Energiesparprofile, Multi-Monitor-Setups mit nicht übereinstimmenden Bildwiederholraten oder die Drosselung von Hintergrund-Tabs dazu führen, dass der Browser unterhalb der nativen Leistungsfähigkeit des Monitors gerendert wird.",
    "nextSteps": {
      "text": "Ist Ihre Bildwiederholfrequenz auf einem Gaming-Monitor auf 60 Hz begrenzt? Sehen Sie sich unsere Anleitung zum Konfigurieren der Bildwiederholfrequenzen für Betriebssystem und GPU an.",
      "actionLabel": "Lesen Sie Fehlerbehebung bei der Aktualisierungsrate",
      "actionHref": "/knowledge-base/troubleshooting#refresh-rate-capped"
    }
  },
  "ghosting-test": {
    "overview": "Bewegungsgeisterbilder erscheinen als nachlaufende Schatten oder verschwommene Nachbildungen hinter sich bewegenden Objekten. Es tritt auf, wenn Flüssigkristallmoleküle länger brauchen, um zwischen Farbzuständen zu wechseln (Pixel-Reaktionszeit), als ein einzelnes Bildwiederholbild dauert. Bei diesem Test werden bewegte Blöcke vor verschiedenen Hintergrundschattierungen gerendert, um Reaktionszeit-Trails und Overdrive-Koronas sichtbar zu machen.",
    "whatToLookFor": [
      {
        "label": "Dunkle nachlaufende Schatten (traditionelles Geisterbild)",
        "description": "Ein dunkler Fleck hinter einem sich bewegenden Objekt weist auf langsame Flüssigkristallübergänge von dunkel nach hell hin, wie sie bei VA-Panels häufig vorkommen."
      },
      {
        "label": "Helle Halos/Coronas (Inverse Ghosting)",
        "description": "Eine helle, leuchtende Spur hinter dem Objekt bedeutet, dass die Overdrive- (OD) oder Reaktionszeiteinstellung des Monitors zu aggressiv ist (Überschwingen)."
      },
      {
        "label": "Farbspezifisches Nachziehen",
        "description": "Beachten Sie, ob das Nachziehen auf roten, grünen oder dunkelgrauen Hintergründen schlechter ist. Die Übergangszeiten variieren stark je nach Farbpaar."
      },
      {
        "label": "Verfolgungskamerabeobachtung",
        "description": "Verfolgen Sie das sich bewegende Objekt mit Ihren Augen oder einer sich bewegenden Kamera, um die Reaktion des Panels zu isolieren, die auf eine Bewegungsunschärfe auf der Netzhaut zurückzuführen ist."
      }
    ],
    "canObserve": [
      "Visuelle Präsenz von Hinterkanten, Verschmierungen und Überschwingkoronen bei anpassbaren Geschwindigkeiten",
      "Vergleich der Farbpaar-Kontrastempfindlichkeit (Hell-auf-Dunkel- und Dunkel-auf-Hell-Übergänge)",
      "Visuelle Auswirkungen der Anpassung der physischen Overdrive-/Reaktionszeit-OSD-Einstellungen Ihres Monitors"
    ],
    "cannotMeasure": [
      "Labor-Grau-zu-Grau-Reaktionszeit (GtG) in exakten Millisekunden",
      "Abklingkurven der Lichtintensität der photometrischen Verfolgungskamera",
      "Subpixel-Flüssigkristall-Spannungsreaktionskurven"
    ],
    "interpretation": "Geisterbilder werden im Wesentlichen durch die Panel-Technologie bestimmt (TN ist schnell, hat aber schlechte Farben, IPS ist ausgewogen, VA weist häufig dunkle Verschmierungen auf, OLED reagiert nahezu sofort). Wenn Sie die OSD-Einstellung „Reaktionszeit“ oder „Overdrive“ Ihres Monitors auf „Mittel“ einstellen, erzielen Sie normalerweise die beste Balance zwischen Geisterbildern und Überschwingen.",
    "nextSteps": {
      "text": "Möchten Sie erfahren, wie Monitor-Overdrive funktioniert und wie Sie inverse Ghosting-Halos beseitigen können?",
      "actionLabel": "Lesen Sie den Leitfaden zu Geisterbildern und Bewegungsunschärfe",
      "actionHref": "/knowledge-base/monitor-ghosting-and-motion-blur"
    }
  },
  "motion-blur-test": {
    "overview": "Im Gegensatz zu Geisterbildern (die auf eine langsame Pixelreaktion zurückzuführen sind) wird Bewegungsunschärfe auf modernen Flachbildschirmen hauptsächlich durch die Sample-and-Hold-Anzeigemechanik verursacht. Da das Display jedes Bild kontinuierlich bis zur nächsten Aktualisierung speichert, verfolgen Ihre Augen sanfte Bewegungen über ein statisches Bild, wodurch eine wahrgenommene Unschärfe auf der Netzhaut entsteht.",
    "whatToLookFor": [
      {
        "label": "Detailerhaltung bei hoher Geschwindigkeit",
        "description": "Beobachten Sie feine vertikale Linien und Texte, die sich über den Bildschirm bewegen. Beachten Sie, wo feine Details miteinander verschmelzen."
      },
      {
        "label": "Geschwindigkeitsvergleich",
        "description": "Vergleichen Sie Bewegungen mit niedriger Geschwindigkeit (240 px/s) mit denen mit hoher Geschwindigkeit (960 px/s), um zu sehen, wie sich die Unschärfe beim Eye-Tracking mit der Geschwindigkeit verändert."
      },
      {
        "label": "Black Frame Insertion (BFI)-Effekte",
        "description": "Wenn Ihr Monitor über eine Strobing-Funktion für die Hintergrundbeleuchtung verfügt (ULMB, ELMB, DyAc), werden durch die Aktivierung bewegte Muster deutlich schärfer."
      },
      {
        "label": "OLED Sample-and-Hold-Unschärfe",
        "description": "Selbst bei einer sofortigen Pixelreaktion von 0,1 ms kommt es bei 60 Hz oder 120 Hz immer noch zu Sample-and-Hold-Unschärfen ohne Stroboskopeffekt."
      }
    ],
    "canObserve": [
      "Wahrnehmungsbedingte Bewegungsunschärfeunterschiede bei unterschiedlichen Horizontalgeschwindigkeiten und Bildwiederholraten",
      "Verbesserungen der visuellen Schärfe bei Verwendung der Hardware-Hintergrundbeleuchtungs-Stroboskop-/BFI-Modi",
      "Kontrast zwischen scharfen statischen Kanten und verschwommenen bewegten Konturen"
    ],
    "cannotMeasure": [
      "Physical Moving Picture Response Time (MPRT) in exakten Millisekunden",
      "Retinale Lichtintegrationskurven des menschlichen Sehens",
      "Prozentsatz des Strobing-Arbeitszyklus der Hintergrundbeleuchtung"
    ],
    "interpretation": "Um die Sample-and-Hold-Unschärfe zu reduzieren, müssen Displays entweder die Bildwiederholfrequenz erhöhen (wodurch die Anzeigedauer jedes Frames verkürzt wird) oder ein Strobing der Hintergrundbeleuchtung implementieren (dunkle Intervalle einfügen, um Netzhautpersistenz zu beseitigen).",
    "nextSteps": {
      "text": "Vergleichen Sie es mit dem Bildwiederholfrequenztest, um zu verstehen, wie höhere Hz Bewegungsunschärfe reduzieren.",
      "actionLabel": "Überprüfen Sie die Aktualisierungsrate",
      "actionHref": "/tests/refresh-rate-test"
    }
  },
  "vrr-test": {
    "overview": "Variable Bildwiederholfrequenz (VRR) – einschließlich NVIDIA G-Sync, AMD FreeSync und VESA Adaptive-Sync – synchronisiert die Bildwiederholfrequenzen Ihres Monitors dynamisch mit der Bildwiedergaberate der GPU. Dieser Test moduliert die Animationsbereitstellungsraten, um adaptive Frame-Pacing, Tearing und Ruckeln in Ihrem Browser visuell zu überprüfen.",
    "whatToLookFor": [
      {
        "label": "Bildschirmriss-Artefakte",
        "description": "Suchen Sie nach horizontalen Trennlinien, bei denen oben und unten im Bild gleichzeitig unterschiedliche Rahmen angezeigt werden."
      },
      {
        "label": "Bildruckeln und Stottern",
        "description": "Beobachten Sie, ob der bewegliche Indikator sanft gleitet oder Mikropausen aufweist, wenn sich die Wiedergabefrequenz verschiebt."
      },
      {
        "label": "Fenster- oder Vollbild-VRR",
        "description": "Viele GPU-Treiber aktivieren G-Sync/FreeSync nur in echten Vollbildanwendungen, sofern sie nicht für den Fenstermodus konfiguriert sind."
      },
      {
        "label": "LFC (Low Framerate Compensation)",
        "description": "Wenn die Bildrate unter den minimalen VRR-Bereich Ihres Monitors fällt (z. B. unter 48 Hz), beobachten Sie, ob die Bilder reibungslos dupliziert werden."
      }
    ],
    "canObserve": [
      "Visuelle Risslinien und Mikrostottern beim Rendern mit variablen Intervallen",
      "Reibungslose Animationsgeschwindigkeit bei schwankenden Frame-Lieferraten",
      "Vom Benutzer wahrgenommener Unterschied zwischen Fenster- und Vollbild-Anzeigeverhalten"
    ],
    "cannotMeasure": [
      "Interner Handshake des GPU-Treibers mit Monitor-Scaler-Hardware",
      "Aktivierungsstatus des G-Sync-/FreeSync-Moduls auf Hardwareebene",
      "Echtzeit-Metadatenkommunikation des DisplayPort AUX-Kanals"
    ],
    "interpretation": "Da Webbrowser im Fenster-Compositor des Betriebssystems ausgeführt werden, hängt die VRR-Einbindung von den Einstellungen auf Betriebssystemebene ab (z. B. Windows Hardware Accelerated GPU Scheduling und GPU-Treiber-Fenster-G-Sync-Einstellungen).",
    "nextSteps": {
      "text": "Treten Mikrostottern oder Tearing auf? Sehen Sie sich unsere Schritt-für-Schritt-Anleitung zur VRR-Fehlerbehebung an.",
      "actionLabel": "Lesen Sie VRR-Fehlerbehebung",
      "actionHref": "/knowledge-base/troubleshooting#vrr-stutter-tearing"
    }
  },
  "backlight-bleed-test": {
    "overview": "Bei LCD-Displays tritt Backlight-Bleeding auf, wenn die Flüssigkristallschicht das von der CCFL- oder LED-Hintergrundbeleuchtung emittierte Licht nicht vollständig blockiert, sodass Licht an den Rändern oder Ecken austreten kann. Mit diesem reinen Schwarztest im Vollbildmodus können Sie Kantenlecks und trübe Stellen prüfen und Ausbluten vom IPS-Glanz im Betrachtungswinkel unterscheiden.",
    "whatToLookFor": [
      {
        "label": "Rand- und Ecklichtfackeln",
        "description": "Helles gelbes oder weißes Licht bündelt sich entlang der äußeren Rahmenkanten und bleibt unabhängig von Ihrem Betrachtungswinkel sichtbar."
      },
      {
        "label": "IPS Glow vs. Backlight Bleed",
        "description": "Bewegen Sie Ihren Kopf hin und her. Wenn das Leuchten seine Position oder Intensität mit Ihrem Winkel ändert, handelt es sich um normales IPS-Leuchten und nicht um Ausbluten."
      },
      {
        "label": "Trübung / Murafanning",
        "description": "Diffuse, fleckige Bereiche mit erhöhter Helligkeit, die über das Panel verstreut sind und durch ungleichmäßige Diffusionsfolien oder mechanischen Druck verursacht werden."
      },
      {
        "label": "OLED / Mini-LED-Vergleich",
        "description": "OLED-Displays emittieren Licht pro Pixel und weisen kein Backlight Bleeding auf (reine 0 Nits). FALD-Mini-LEDs können örtlich begrenzte Lichthöfe aufweisen."
      }
    ],
    "canObserve": [
      "Visuelle Kantenlecks, lokalisierte Einklemmstellen am Rahmen und Wolkenmuster auf dem Schwarz",
      "Relativer Schweregrad des Lichtaustritts über die Ecken des Displays in einer abgedunkelten Umgebung",
      "Unterschiede in der Betrachtungswinkelempfindlichkeit (Unterscheidung von statischem Ausbluten und dynamischem IPS-Glühen)"
    ],
    "cannotMeasure": [
      "Absolute Panel-Leuchtdichte in cd/m² (Nits) ohne Spektralfotometer",
      "Natives statisches Kontrastverhältnis (z. B. 1000:1 vs. 3000:1)",
      "ANSI 16-Zonen-Kontrastkonformitätszertifizierung"
    ],
    "interpretation": "Ein milder IPS-Glanz ist ein inhärentes optisches Merkmal von Weitwinkel-In-Plane-Switching-Panels. Bei starkem Backlight Bleeding handelt es sich jedoch um einen mechanischen Montagefehler, bei dem die Monitorblende die interne Lichtleiterplatte einklemmt.",
    "nextSteps": {
      "text": "Erfahren Sie die entscheidenden Unterschiede zwischen IPS-Glühen, Backlight-Bleeding und OLED-Schwarzwerten.",
      "actionLabel": "Lesen Sie den Leitfaden „Backlight Bleed vs. IPS Glow“.",
      "actionHref": "/knowledge-base/backlight-bleed-vs-ips-glow"
    }
  },
  "near-black-test": {
    "overview": "Beim Nahschwarztest wird die Fähigkeit eines Displays bewertet, subtile dunkle Grautöne unmittelbar über reinem Schwarz abzugrenzen (0 % bis 5 % Luminanz). Wenn ein Monitor dunkle Farbtöne in reines Schwarz zerlegt, gehen wichtige Schattendetails in Filmen, Spielen und bei der Fotobearbeitung dauerhaft verloren.",
    "whatToLookFor": [
      {
        "label": "Black Crush (vorzeitiges Abschneiden)",
        "description": "Wenn Schritt 1 (0,5 % oder 1 %) völlig unsichtbar ist und in reines Schwarz übergeht, leidet Ihr Monitor unter Black Crush."
      },
      {
        "label": "Individuelle Stufenunterscheidung",
        "description": "In einem dunklen Raum sollten Sie schwache Grenzkonturen zwischen aufeinanderfolgenden Graufeldern mit geringer Leuchtdichte erkennen können."
      },
      {
        "label": "Gammaverschiebung des Betrachtungswinkels",
        "description": "Achten Sie bei VA-Panels auf „Black Crush on-Axis“ – Schattendetails, die nur bei leicht abweichendem Betrachtungswinkel sichtbar sind."
      },
      {
        "label": "Umgebungslichtreflexion",
        "description": "Schalten Sie die Deckenbeleuchtung im Raum aus. Umgebungsblendung beeinträchtigt die Wahrnehmung nahezu schwarzer Farbtöne durch das menschliche Auge erheblich."
      }
    ],
    "canObserve": [
      "Visuelle Sichtbarkeitsschwellenwerte für nahezu schwarze Luminanzfelder von 0,5 %, 1 %, 2 %, 3 %, 4 % und 5 %",
      "Wahrnehmungsbezogene Schattendetailtrennung über dunkle Farbfelder hinweg",
      "Auswirkungen der Einstellungen für Gamma, Schwarz-Equalizer und HDMI-Dynamikbereich des Monitors"
    ],
    "cannotMeasure": [
      "Photometrische Leuchtdichtewerte unter 0,05 Nits ohne Laborkolorimeter",
      "Exakte mathematische Gammakurvenkonformität (BT.1886 vs. 2,2 vs. sRGB)",
      "Nativer Schwarzpunkt des Hardware-Panels in absoluten Candela pro Quadratmeter"
    ],
    "interpretation": "Black Crush wird häufig durch einen falschen Dynamikbereich der GPU-Farbausgabe (begrenzt 16–235 vs. voll 0–255), einen zu aggressiven Schwarz-Equalizer des Monitors oder nichtlineare Low-End-Gammakurven verursacht.",
    "nextSteps": {
      "text": "Verlieren Schattendetails in Spielen und Videos? Befolgen Sie unsere Anleitung zur Fehlerbehebung, um Black Crush zu beheben.",
      "actionLabel": "Lesen Sie die Fehlerbehebung bei Black Crush",
      "actionHref": "/knowledge-base/troubleshooting#black-crush"
    }
  },
  "gradient-banding-test": {
    "overview": "Sanfte Farbverläufe erfordern feine Abstufungen über Tausende von Zwischentonwerten. Wenn ein Anzeigefeld, ein Grafiktreiber oder eine Bildpipeline über eine unzureichende Bittiefe oder eine schlechte Farbverarbeitung verfügt, verschlechtern sich glatte Farbverläufe in sichtbare Stufenbänder oder harte Posterlinien.",
    "whatToLookFor": [
      {
        "label": "Sichtbare Trittlinien",
        "description": "Achten Sie auf deutliche vertikale oder horizontale Streifengrenzen bei sanften Graustufen- und RGB-Farbübergängen."
      },
      {
        "label": "Kanalspezifisches Banding",
        "description": "Beachten Sie, ob die Streifenbildung bei blauen oder dunklen Schattenverläufen stärker ausgeprägt ist als bei mittleren Graustufen."
      },
      {
        "label": "Bittiefenquantisierung",
        "description": "Echte 8-Bit- und 10-Bit-Panels erzeugen sanfte Rampen. 6-Bit-Panels, die auf Frame Rate Control (FRC) basieren, weisen eine leichte Körnung oder Streifenbildung auf."
      },
      {
        "label": "Begrenzter vs. voller Dynamikbereich",
        "description": "Wenn Ihre GPU ein begrenztes Signal (16–235) über HDMI überträgt, werden dunkle und helle Farbverlaufsenden stark abgeschnitten."
      }
    ],
    "canObserve": [
      "Visuelle Präsenz von Farbstreifenstufen über Graustufen- und Primär-/Sekundärfarbverläufe hinweg",
      "Vergleich zwischen horizontalen, vertikalen und Mehrkanal-Farbverläufen",
      "Visuelle Artefakte aufgrund von Software-Farbprofilen oder GPU-Dynamikbereichseinstellungen"
    ],
    "cannotMeasure": [
      "Direkte Hardware-Bittiefe (6-Bit, 8-Bit, 10-Bit), unabhängig von der GPU-Berichterstellung",
      "Quantisierte Delta-E-Farbabweichung zwischen benachbarten Farbschritten",
      "Leistung des räumlichen Dithering-Algorithmus auf Hardware-Skalierungsebene"
    ],
    "interpretation": "Streifenbildung kann auf Hardwareeinschränkungen (6-Bit-Panels), Treiberfehlkonfigurationen (begrenzter RGB-Dynamikbereich) oder aggressive ICC-Kalibrierungsprofile zurückzuführen sein, die digitale Farbwerte abschneiden.",
    "nextSteps": {
      "text": "Möchten Sie bestimmte 6-Bit-, 8-Bit- und Dithering-Schritte simulieren? Probieren Sie unser spezielles Farbstreifen- und Bittiefen-Tool aus.",
      "actionLabel": "Probieren Sie den Bittiefen- und Dither-Test aus",
      "actionHref": "/tests/color-banding-test"
    }
  },
  "uniformity-test": {
    "overview": "Die Bildschirmgleichmäßigkeit misst, wie konsistent ein Monitor Helligkeit und Farbtemperatur über seine gesamte Oberfläche wiedergibt. Unvollkommenheiten in der Herstellung, in den Backlight-Diffusionsfolien oder in der Kantenbeleuchtung führen oft zu dunkleren Ecken, Hotspots in der Mitte oder dem Dirty Screen Effect (DSE).",
    "whatToLookFor": [
      {
        "label": "Ecken- und Kantenvignettierung",
        "description": "Überprüfen Sie die Außenecken und Umfangskanten auf 25 %, 50 % und 75 % Grau. Beachten Sie, wenn die Ecken deutlich dunkler erscheinen."
      },
      {
        "label": "Dirty-Screen-Effekt (DSE)",
        "description": "Achten Sie auf schwache, wolkige oder fleckige Texturmuster in der Mitte des Bildschirms, die beim Schwenken über Volltöne erkennbar sind."
      },
      {
        "label": "Farbtemperaturtönung",
        "description": "Beobachten Sie, ob eine Seite des Bildschirms wärmer (rötlich/gelblich) und die gegenüberliegende Seite kühler (bläulich) erscheint."
      },
      {
        "label": "Zonenvergleich",
        "description": "Vergleichen Sie die 5x5-Rasterzellen, um die relative Leuchtdichtevarianz von der Mitte zum Umfang zu beurteilen."
      }
    ],
    "canObserve": [
      "Visuelle Luminanzabfälle, Randvignettierung und Hotspots in der Mitte bei einfarbigen Grau- und Weißtönen",
      "Die visuelle Farbtemperatur verschiebt sich zwischen den linken, mittleren und rechten Panelbereichen",
      "Inspektion über mehrere standardisierte neutrale Grau- und Primärfarben-Luminanzstufen hinweg"
    ],
    "cannotMeasure": [
      "Prozentuale Gleichmäßigkeitsmetriken (z. B. „98,5 % Gleichmäßigkeit“) ohne Mehrpunkt-Spektrophotometerraster",
      "Variationen der korrelierten Farbtemperatur (CCT in Kelvin) über Panelkoordinaten hinweg",
      "Aktivierungszustand der Factory Uniformity Compensation (DUC)-Schaltung"
    ],
    "interpretation": "Verbrauchermonitore tolerieren im Allgemeinen einen Helligkeitsabfall von 10 bis 15 % zu den Rändern hin. Professionelle Grafikmonitore nutzen Digital Uniformity Compensation (DUC), um eine Abweichung von weniger als 5 % zu erreichen.",
    "nextSteps": {
      "text": "Erfahren Sie, warum es zu schmutzigen Bildschirmeffekten und Vignettierung kommt und wann ein Austausch des Panels gerechtfertigt ist.",
      "actionLabel": "Lesen Sie den Leitfaden zur Bildschirmeinheitlichkeit",
      "actionHref": "/knowledge-base/backlight-bleed-vs-ips-glow"
    }
  },
  "text-clarity-test": {
    "overview": "Die Textklarheit hängt von der Pixeldichte (PPI) des Monitors, den Skalierungseinstellungen der Anzeige, der physischen Subpixelgeometrie (RGB vs. BGR vs. QD-OLED-Pentile) und den Schriftartglättungsalgorithmen des Betriebssystems ab. Bei diesem Test werden Lesbarkeit, Farbsäume und Schriftwiedergabe in verschiedenen Größen und Stärken bewertet.",
    "whatToLookFor": [
      {
        "label": "Farbsäume an den Schrifträndern",
        "description": "Überprüfen Sie kontrastreichen schwarzen Text auf Weiß. Schwache rote oder cyanfarbene Lichthöfe entlang vertikaler Striche weisen auf eine Nichtübereinstimmung des Subpixel-Layouts hin."
      },
      {
        "label": "BGR-Subpixel-Inversion",
        "description": "Einige Monitore verwenden BGR-Subpixel-Layouts anstelle von Standard-RGB, was zu verschwommenem Text führt, sofern Windows ClearType nicht neu konfiguriert wird."
      },
      {
        "label": "OLED-Textsäume",
        "description": "WOLED- und dreieckige QD-OLED-Subpixelanordnungen erzeugen dezente grüne oder magentafarbene Ränder entlang horizontaler Textkanten."
      },
      {
        "label": "Bruchskalierte Unschärfe",
        "description": "Eine nicht ganzzahlige Anzeigeskalierung (z. B. 125 % oder 150 %) kann in älteren Desktop-Apps zu einer geringfügigen Weichzeichnung der Schriftartenrasterung führen."
      }
    ],
    "canObserve": [
      "Visuelle Farbsäume und Lichthöfe auf feinen Textkonturen in Schriftgrößen von 8 bis 32 Pixel",
      "Subpixel-Rendering-Unterschiede zwischen Schriftstärken, Serifen vs. Sans-Serifen und Umkehrmodi",
      "Einfluss des Browser-Zooms und der Skalierung der Betriebssystemanzeige auf die Schärfe der Schriftart"
    ],
    "cannotMeasure": [
      "Mikroskopische physikalische Subpixelgeometrie ohne Makrolinse oder Mikroskop",
      "Interne DirectWrite-/ClearType-Font-Rasterizer-Konfigurationsflags des Betriebssystems",
      "Akustische oder optische Schärfemodulationsübertragungsfunktion (MTF)"
    ],
    "interpretation": "Wenn Text mit farbigen Umrissen unscharf erscheint, können RGB/BGR-Layout-Inkompatibilitäten häufig durch erneutes Ausführen des Windows ClearType Tuner oder durch Anpassen der macOS-Schriftglättung behoben werden.",
    "nextSteps": {
      "text": "Sehen Sie verschwommene Schriftarten oder farbige Ränder um den Text? Befolgen Sie unsere Anleitung zum Optimieren von ClearType und zur Anzeigeskalierung.",
      "actionLabel": "Lesen Sie die Fehlerbehebung bei der Textklarheit",
      "actionHref": "/knowledge-base/troubleshooting#blurry-text-scaling"
    }
  },
  "hdr-capability-test": {
    "overview": "Der HDR-Hardware- und Signaldetektor prüft, ob der Windows-Compositor, der Anzeigetreiber und die Browser-Pipeline Ihres Betriebssystems Signale mit hohem Dynamikbereich kommunizieren. Es prüft CSS-Medienabfragen der Stufe 4 (Dynamikbereich: hoch), Wide Color Gamut (Rec.2020 / Display-P3), Canvas P3-Farbpuffer, WebGL-Gleitkomma-Renderziele und hardwarebeschleunigte 10-Bit-HDR-Videocodecs.",
    "whatToLookFor": [
      {
        "label": "Compositor HDR-Signalstatus",
        "description": "Bestätigt, ob der Windows-Compositor des Betriebssystems ein HDR-Signal an den Browser ausgibt. Bei Inaktivität ist HDR in den Windows- oder macOS-Einstellungen deaktiviert."
      },
      {
        "label": "Pufferbittiefe und Pipeline",
        "description": "Erkennt die gemeldete Bildschirmfarbtiefe (24-Bit-SDR vs. 30-Bit+ HDR) und prüft, ob HTML5 Canvas und WebGL2 Float- und P3-Farbpuffer zuweisen können."
      },
      {
        "label": "Großer Farbraum (Rec.2020 & P3)",
        "description": "Bewertet, ob Ihr Monitor ein erweitertes Farbvolumen über das Standard-sRGB hinaus meldet und so lebendige purpurrote Rottöne und tiefe Smaragdgrüntöne freigibt."
      },
      {
        "label": "HDR-Video-Codec-Beschleunigung",
        "description": "Prüft die Hardware-Dekodierungsunterstützung für HDR10 (HEVC Main 10), AV1 10-Bit (YouTube HDR) und VP9 Profile 2."
      }
    ],
    "canObserve": [
      "Echtzeit-Betriebssystem-Compositor-HDR-Ausgabestatus",
      "Hardware- und Browserunterstützung für die Farbskalen Display-P3 und Rec.2020",
      "Über den Browser zugängliche Farbtiefe des Bildschirmpuffers und Unterstützung für Gleitkommapuffer",
      "Hardwarebeschleunigte 10-Bit-Video-Codec-Wiedergabefunktion"
    ],
    "cannotMeasure": [
      "Maximale Leuchtdichte des physischen Panels (Nits) ohne Hardware-Kolorimeter",
      "Einhaltung der VESA DisplayHDR-Zertifizierung (z. B. DisplayHDR 400 vs. 600 vs. 1000)",
      "Bei Mini-LED-Hintergrundbeleuchtungen werden physische lokale Dimmzonen gezählt"
    ],
    "interpretation": "Wenn der Dynamikbereich standardmäßig (inaktiv) ist, drücken Sie Win + Alt + B unter Windows oder aktivieren Sie HDR in den Systemeinstellungen unter macOS. Wenn 10-Bit-Videocodecs Software-Dekodierung melden, stellen Sie sicher, dass die Hardwarebeschleunigung in Ihrem Browser aktiviert ist.",
    "nextSteps": {
      "text": "Möchten Sie physische Highlight-Clippings, Tonwertkurven und Peak-Nits überprüfen? Führen Sie unseren begleitenden optischen Test durch.",
      "actionLabel": "Starten Sie die visuelle HDR-Inspektion",
      "actionHref": "/tests/hdr-test"
    }
  },
  "hdr-test": {
    "overview": "Der HDR Visual Calibration & Highlight Inspection-Test liefert kontrollierte optische Muster, um zu bewerten, wie Ihr Anzeigefeld physisch auf HDR-Inhalte reagiert. Es testet spiegelnde Highlight-Clipping-Punkte, Tone-Mapping-Roll-off, 10 % APL-Spitzenluminanz-Burst-Fähigkeit, PQ/EOTF-Tonkurvenrampen und nahezu schwarze Schattendetails.",
    "whatToLookFor": [
      {
        "label": "Specular Highlight Roll-Off und Clipping",
        "description": "Überprüfen Sie die Highlight-Farbfelder von 90 % bis 100 % Peak White. Konzentrische kreisförmige Fadenkreuzziele sollten erkennbar bleiben, ohne in ausgeblendetes Weiß überzugehen."
      },
      {
        "label": "10 % APL Peak Luminance Burst",
        "description": "Ein standardmäßiges 10-%-Fenster vor einem pechschwarzen Hintergrund testet den Spitzenwert des Nit-Headrooms, die Aggressivität des lokalen Dimmens und das Halo-Blooming Ihres Displays."
      },
      {
        "label": "PQ/EOTF-Tonkurvenabstufung",
        "description": "Vergleicht glatte 10-Bit-Verläufe mit quantisierten 8-Bit-Rampen, um Banding-Artefakte und aggressive Tone-Mapping-Komprimierung aufzudecken."
      },
      {
        "label": "Nahezu schwarze Schattendetails (Black Crush)",
        "description": "Überprüft, ob dunkle Stufen mit geringer Luminanz (0,5 % bis 5 %) sich von echtem 0 %-Schwarz ohne schlammige erhöhte schwarze Böden unterscheiden."
      }
    ],
    "canObserve": [
      "Punkt der spiegelnden Glanzlichtbeschneidung über abgestufte weiße Luminanzstufen",
      "Lokales Dimmen mit Blooming und Spitzenhelligkeitsspielraum im 10 %-APL-Fenster",
      "Glätte von 10-Bit-Tonübergängen im Vergleich zu 8-Bit-Quantisierungsbändern",
      "Nahezu schwarze Schatten-Detailtrennung und Black-Crush-Verhalten"
    ],
    "cannotMeasure": [
      "Exakte photometrische Spitzenleuchtdichte in Nits (cd/m²) ohne Laborsensoren",
      "Genauigkeit der Farbtemperatur (Kelvin) ohne Spektralfotometer",
      "Reaktionszeit des Panels oder Pixelüberschreitung"
    ],
    "interpretation": "Bei Displays mit schlechter HDR-Tonzuordnung werden Glanzlichter vorzeitig über 94 % abgeschnitten oder nahezu schwarze Schattendetails in sattes Schwarz umgewandelt. Premium-OLED- und Mini-LED-Panels behalten die Glanzlichtabsehen bis zu 99 % bei und bewahren subtile Schattenstufen.",
    "nextSteps": {
      "text": "Müssen Sie überprüfen, ob Ihr Betriebssystem-Compositor und Ihre Video-Codecs HDR unterstützen? Überprüfen Sie den Hardware-Detektor.",
      "actionLabel": "Überprüfen Sie die HDR-Hardware und das Signal",
      "actionHref": "/tests/hdr-capability-test"
    }
  },
  "strobe-crosstalk-test": {
    "overview": "Das Strobing der Hintergrundbeleuchtung (ULMB, DyAc, ELMB, LightBoost) eliminiert Bewegungsunschärfe bei Blickverfolgung, indem die Hintergrundbeleuchtung erst dann eingeschaltet wird, wenn die Flüssigkristalle den Übergang abgeschlossen haben. Da Displays jedoch Pixel von oben nach unten scannen, während die Hintergrundbeleuchtung global über den gesamten Bildschirm blinkt, können Pixelübergänge ganz oben oder unten unvollständig sein, wenn der Impuls ausgelöst wird. Diese Timing-Diskrepanz führt zu doppelten Phantombildern, die als Strobe-Crosstalk bezeichnet werden.",
    "whatToLookFor": [
      {
        "label": "Doppelbild-Silhouetten",
        "description": "Beobachten Sie die beweglichen Balken oben, in der Mitte und unten. Achten Sie darauf, ob Sie dahinter oder davor einen einzelnen scharfen Balken oder ein schwaches Duplikat sehen."
      },
      {
        "label": "Klarheit oben vs. Mitte vs. unten",
        "description": "Die meisten Monitore optimieren die Strobe-Phase für die Bildschirmmitte. Die mittlere Zone sollte scharfe Einzelbildbewegungen zeigen, während die oberen und unteren Zonen typischerweise unterschiedliche Grade an Übersprechen aufweisen."
      },
      {
        "label": "Breite und Helligkeit des Strobe-Impulses",
        "description": "Kürzere Strobe-Impulse führen zu schärferen Bewegungen, aber zu einer geringeren Gesamthelligkeit des Displays. Passen Sie den Stroboskop-Arbeitszyklus Ihres Monitors im OSD an, um Klarheit und Leuchtdichte auszugleichen."
      }
    ],
    "canObserve": [
      "Relative Strobe-Crosstalk-Sichtbarkeit über vertikale Bildschirmzonen hinweg",
      "Identifizierung des optimalen Strobe-Phasen-Kalibrierungspunkts auf Ihrem Panel",
      "Vergleich der Reduzierung von Bewegungsunschärfe bei verschiedenen Schwenkgeschwindigkeiten"
    ],
    "cannotMeasure": [
      "Genaue Blitzdauer der Hintergrundbeleuchtung in Mikrosekunden",
      "Photometrischer Blitzleuchtdichte-Peak in Nits ohne Fotodiode",
      "Scan-Out-Geschwindigkeit des Hardware-Panels und VSYNC-Zeitintervall"
    ],
    "interpretation": "Bei LCD-Monitoren ist ein geringes Übersprechen der Blitze an den äußersten Ober- und Unterkanten normal. Starkes Übersprechen in der Mittelzone weist auf eine nicht übereinstimmende Strobe-Phase oder eine Desynchronisierung der Bildwiederholfrequenz hin.",
    "nextSteps": {
      "text": "Vergleichen Sie Stroboskopbewegungen mit nativer Sample-and-Hold-Bewegungsunschärfe.",
      "actionLabel": "Führen Sie den Bewegungsunschärfetest durch",
      "actionHref": "/tests/motion-blur-test"
    }
  },
  "vrr-flicker-test": {
    "overview": "Die variable Aktualisierungsrate (VRR / G-Sync / FreeSync) passt die Bildschirmaktualisierungsrate dynamisch an die GPU-Rendering-Ausgabe an. Allerdings variieren die Flüssigkristallrelaxations- und OLED-Pixel-Luminanzkurven je nach Dauer des Aktualisierungszyklus. Wenn die Frameraten schnell schwanken – insbesondere zwischen hohen FPS und unteren Grenzschwellenwerten –, verschieben sich die Luminanzkurven dynamisch, was zu einem spürbaren Helligkeitsflimmern in dunklen und nahezu schwarzen Bereichen führt.",
    "whatToLookFor": [
      {
        "label": "Nahezu schwarzes Helligkeitspumpen",
        "description": "Beobachten Sie die 10 % nahezu schwarzen und 25 % dunkelgrauen Flecken, während der automatische Framerate-Sweep-Zyklus erfolgt. Suchen Sie in der allgemeinen Dunkelheit nach subtilen rhythmischen Pulsationen."
      },
      {
        "label": "LFC (Low Framerate Compensation) Übergangsstoß",
        "description": "Wenn die Frameraten unter den minimalen VRR-Schwellenwert fallen (z. B. unter 48 Hz), verdoppeln Grafiktreiber die Frame-Präsentation (LFC). Diese schnelle Hz-Verschiebung kann ein kurzzeitiges Flackern der Leuchtdichte verursachen."
      },
      {
        "label": "OLED-Gammaverschiebung",
        "description": "OLED-Displays sind besonders anfällig für VRR-Gamma-Flimmern, da die Ladezeiten der Subpixel stark von der Bildlänge abhängen. Dunkle Szenentexturen können bei Framerate-Einbrüchen sichtbar pulsieren."
      }
    ],
    "canObserve": [
      "Visuelle Identifizierung von Gammakurvenverschiebungen über dunkelgraue Luminanzstufen",
      "Erkennung von Helligkeitsschwankungen während der simulierten Framerate-Schwankung",
      "Vergleich zwischen subtilem Mitteltongrau und nahezu schwarzer Flimmerempfindlichkeit"
    ],
    "cannotMeasure": [
      "Hardware-GPU zur Anzeige von Adaptive-Sync-Timing-Paketen",
      "Exakte Millivolt-OLED-Subpixel-Spannungsschwankungen",
      "Automatische Erkennung ohne visuelle Bewertung durch den Benutzer"
    ],
    "interpretation": "Wenn Sie starke Helligkeitsschwankungen beobachten, weist Ihr Display empfindliche VRR-Gammakurven auf. Begrenzen Sie Ihre Framerate leicht unter die maximale Bildwiederholfrequenz oder deaktivieren Sie VRR in Spielen mit instabilen Frametimes, um Flimmern zu verhindern.",
    "nextSteps": {
      "text": "Überprüfen Sie die Unterstützung und den Bereich Ihrer Anzeige für variable Bildwiederholfrequenzen.",
      "actionLabel": "Führen Sie den VRR-Fähigkeitstest durch",
      "actionHref": "/tests/vrr-test"
    }
  },
  "pursuit-camera-test": {
    "overview": "Das menschliche Auge verfolgt sich bewegende Objekte auf dem Bildschirm mit einer kontinuierlichen, gleichmäßigen Verfolgungsbewegung. Standardfotos mit stationären Kameras können keine echte Bewegungsunschärfe auf dem Display erfassen, da sie sich nicht mit dem Auge bewegen. Eine Verfolgungskamera verfolgt das Bewegungsmuster mit exakt angepasster Geschwindigkeit und ermöglicht so die fotografische Erfassung der tatsächlich wahrgenommenen Motion Picture Response Time (MPRT) und Geisterbilder.",
    "whatToLookFor": [
      {
        "label": "Zeitliche Graduierungsausrichtung",
        "description": "Die obere Spur enthält vertikale weiße Graduierungsstriche. Bei reibungsloser Verfolgung mit Ihrer Kamera oder Ihrem Telefon verschmelzen diese Häkchen zu einer einzigen scharfen vertikalen Linie in Ihrem Foto."
      },
      {
        "label": "Geisterbilder und nachlaufende Artefakte",
        "description": "Sobald die Tracking-Synchronisierung durch klare vertikale Ticks bestätigt ist, untersuchen Sie die Hinterkante des sich bewegenden Objekts, um Phosphorzerfall, Overdrive-Koronas oder Geisterspuren zu erkennen."
      },
      {
        "label": "Overdrive-Überschwinger (Coronas)",
        "description": "Ein hell leuchtender Umriss hinter dem sich bewegenden Objekt weist auf eine übermäßige Übersteuerung der Monitorpixel hin (inverse Geisterbilder)."
      }
    ],
    "canObserve": [
      "Kameraschwenk-Synchronisation über zeitliche Teilungsspurverifizierung",
      "Die Breite des visuellen Abstrichs ist direkt proportional zur wahrgenommenen MPRT",
      "Unterscheidung zwischen Pixel Transition Blur (GtG) und Sample-and-Hold Eye-Tracking Blur (MPRT)"
    ],
    "cannotMeasure": [
      "Automatische MPRT-Berechnung ohne Aufnahme und Messung eines Trackingfotos",
      "Optische Reaktionskurven von Photodioden im Submillisekundenbereich",
      "Optische Verfolgung der Schienengeschwindigkeit ohne kalibrierte Hardware"
    ],
    "interpretation": "Wenn die zeitlichen Teilungsmarkierungen in Ihrer Aufnahme eine saubere vertikale Linie bilden, wurde die Nachführung synchronisiert. Die Breite des nachlaufenden Schlierens auf dem Objekt spiegelt die tatsächliche MPRT-Bewegungsunschärfe des Displays wider.",
    "nextSteps": {
      "text": "Vergleichen Sie die Bewegungsleistung bei verschiedenen Overdrive-Einstellungen im OSD Ihres Monitors.",
      "actionLabel": "Führen Sie den Ghosting-Test durch",
      "actionHref": "/tests/ghosting-test"
    }
  },
  "audio-sync-test": {
    "overview": "Moderne visuelle Verarbeitung (Bildskalierung, dynamische HDR-Tonzuordnung und Bewegungsglättung) führt zu Videolatenz. Mittlerweile führen Soundbars, AV-Receiver und Bluetooth-Audiogeräte (A2DP-Codec-Puffer) zu Audiolatenz. Wenn Video und Audio um mehr als die ITU-R-Wahrnehmungsschwellen (+45 ms bis -125 ms) voneinander abweichen, wird die Lippensynchronisation der Sprache merklich unzusammenhängend.",
    "whatToLookFor": [
      {
        "label": "Gleichzeitiges Blinken und Piepen",
        "description": "Beobachten Sie, wie die rotierende Nadel die obere 12-Uhr-Nullmarkierung passiert. Der sofort sichtbare weiß/grüne Blitz sollte perfekt mit dem hörbaren 1-kHz-Impuls übereinstimmen."
      },
      {
        "label": "Audio-führendes Video (negativer Offset)",
        "description": "Wenn Sie den Piepton hören, bevor Sie das visuelle Blinken sehen, hinkt die Anzeige dem Ton hinterher. Der Ton muss verzögert werden."
      },
      {
        "label": "Video-führendes Audio (positiver Offset)",
        "description": "Wenn Sie das Blinken sehen, bevor Sie den Piepton hören, ist die Audioverarbeitung (z. B. Bluetooth-Verzögerung oder Soundbar-Verarbeitung) im Vergleich zur Anzeige verzögert."
      }
    ],
    "canObserve": [
      "Menschliche Wahrnehmungssynchronisation zwischen optischen visuellen Blitzen und akustischen Impulsen",
      "Messung des erforderlichen Millisekunden-Kompensationsoffsets (+/- 200 ms)",
      "Überprüfung des Audioausgangskanals über die Web-Audio-API, synthetisierte 1-kHz-Impulse"
    ],
    "cannotMeasure": [
      "Hardware-Ankunftszeiten elektrischer akustischer Schallwellen mit Laborgenauigkeit im Mikrosekundenbereich",
      "Akustische Rückkopplungsschleife des Mikrofons ohne Audioeingangsberechtigung",
      "Verzögerungen bei der erneuten Übertragung von Bluetooth-Paketen auf Betriebssystemtreiberebene"
    ],
    "interpretation": "Die wahrnehmungsmäßige Ausrichtung der Lippensynchronisation innerhalb von +/- 20 ms gilt als ausgezeichnet und ist für das menschliche Publikum nicht wahrnehmbar. Latenzen von mehr als 50 ms sollten mithilfe der Audioverzögerungseinstellungen in Ihrer Soundbar oder Ihrem Mediaplayer korrigiert werden.",
    "nextSteps": {
      "text": "Testen Sie Ihre Lautsprecher auf Stereokanaltrennung und Frequenzbereich.",
      "actionLabel": "Führen Sie einen Lautsprechertest durch",
      "actionHref": "/tests/speaker-test"
    }
  },
  "gamepad-test": {
    "overview": "Gamecontroller verwenden analoge Potentiometer oder Hall-Effekt-Magnetsensoren, um die Bewegung des Daumenstifts in Richtungskoordinaten umzuwandeln. Im Laufe der Zeit führt der Verschleiß des internen Kohlenstoffabstreifers, die Verschlechterung der Feder und die Verschmutzung durch Staub dazu, dass der Stock außermittige Koordinaten registriert, wenn er unberührt ruht – ein Defekt, der als Stickdrift bekannt ist.",
    "whatToLookFor": [
      {
        "label": "Ruhender Stickdrift",
        "description": "Lassen Sie beide Thumbsticks vollständig los. Befindet sich der Fadenkreuzindikator außerhalb des zentralen Nullpunkts oder driftet er kontinuierlich, liegt eine Stabdrift vor."
      },
      {
        "label": "Zirkularitätsfehler",
        "description": "Drehen Sie die Stäbchen entlang ihrer Außengrenzen. Hochwertige Gamepads erzeugen einen sauberen, glatten Kreis, ohne dass die diagonalen Ecken flach werden."
      },
      {
        "label": "Deadzone-Schwellenwert",
        "description": "Prüfen Sie, wie weit Sie den Stick bewegen müssen, bevor die Koordinate reagiert. Zu große Totzonen erschweren das Zielen, während zu kleine Totzonen zu Drift führen."
      },
      {
        "label": "Glätte des analogen Triggers",
        "description": "Drücken Sie nach und nach die LT- und RT-Auslöser. Die Prozentanzeige sollte sanft von 0 % auf 100 % ansteigen, ohne zu springen oder zu hängen."
      }
    ],
    "canObserve": [
      "Echtzeit-Analogstick-X/Y-Koordinatenanzeige und Ruhedriftwerte",
      "Vollständige digitale 16-Tasten-Betätigungsmatrix und analoge Auslösedruckprozentsätze",
      "Controller-Verbindungsstatus, Geräte-ID-Name und Abfragerate über die HTML5-Gamepad-API"
    ],
    "cannotMeasure": [
      "Physikalischer Schleiferwiderstand des Potentiometers in Ohm",
      "Interner Batteriespannungspegel (sofern nicht von proprietären Browsererweiterungen unterstützt)",
      "Drahtlose Bluetooth-Funkstörungen oder Paketverlustraten"
    ],
    "interpretation": "Ein Ruhekoordinatenwert unter 0,05 (5 %) wird typischerweise von Standard-Wildtotzonen absorbiert. Werte über 0,10 (10 %) führen zu einer sichtbaren Abweichung der Kamera im Spiel und erfordern eine Neukalibrierung oder Reinigung.",
    "nextSteps": {
      "text": "Testen Sie die Eingabelatenz Ihres Displays und Ihre persönliche Reaktionszeit.",
      "actionLabel": "Führen Sie den Reaktionszeittest durch",
      "actionHref": "/tests/reaction-time-test"
    }
  },
  "battery-test": {
    "overview": "Der Battery Health & Power Status Inspector liest Batteriemetriken mithilfe der W3C Battery Status API. Es bietet Echtzeit-Einblick in den Akkuladestand, den Ladezustand, die geschätzte Ladezeit und die Entladedauer Ihres Geräts.",
    "whatToLookFor": [
      {
        "label": "Ladezustand in Echtzeit",
        "description": "Überwacht den aktuellen Batterieprozentsatz, der vom Stromversorgungssubsystem des Betriebssystems gemeldet wird."
      },
      {
        "label": "Verbindungsstatus des Wechselstromadapters",
        "description": "Gibt an, ob Ihr Gerät aktiv Wechselstrom aus der Wand zieht oder mit internen Gleichstrom-Batteriereserven betrieben wird."
      },
      {
        "label": "Lade- und Entladezeit",
        "description": "Berechnet die geschätzte Dauer, die erforderlich ist, um 100 % Kapazität zu erreichen, oder die verbleibende Zeit bis zur Erschöpfung des Systems."
      },
      {
        "label": "Verlauf der Abflussneigung",
        "description": "Verfolgt den Stromverbrauch bei aktiven Bildschirmarbeitslasten, um einen hohen Batterieverbrauch zu erkennen."
      }
    ],
    "canObserve": [
      "Von der Energieverwaltung des Betriebssystems gemeldeter Batterieprozentsatz in Echtzeit",
      "Lade- und Entladezustandsübergänge über Pegelwechsel- und Ladewechselereignisse",
      "Geschätzte verbleibende Sekunden bis zur vollständigen Aufladung oder vollständigen Entladung",
      "Verlaufstrends des Ladezustands während der aktiven Sitzung"
    ],
    "cannotMeasure": [
      "Physikalische Verschlechterung der chemischen Kapazität in Milliamperestunden (mAh) ohne Root-Diagnosetools",
      "Interne Batterietemperatur, Impedanz oder Zyklenzahl",
      "Batteriezustandsmetriken in Browsern, die die Battery API aus Datenschutzgründen einschränken (z. B. Firefox/Safari)"
    ],
    "interpretation": "Wenn Ihr Browser Batteriemetriken als nicht unterstützt meldet, hat Ihr Browser-Anbieter die API zur Fingerabdruck-Abwehr eingeschränkt. Wenn dies unterstützt wird, weist ein schneller Abfall des Prozentsatzes beim Lichtanzeigetest auf eine Alterung der Batterie hin.",
    "nextSteps": {
      "text": "Möchten Sie den Netzwerkdurchsatz und die Verbindungsleistung Ihres Systems überprüfen?",
      "actionLabel": "Starten Sie den Netzwerkgeschwindigkeitstest",
      "actionHref": "/tests/network-speed-test"
    }
  },
  "network-speed-test": {
    "overview": "Der Netzwerkgeschwindigkeits- und Latenztest bewertet die Ping-Latenz, den Jitter, den Verbindungstyp und den Download-Durchsatz Ihrer Internetverbindung direkt über Ihre Browser-Pipeline mithilfe von Timing-APIs und der Netzwerkinformations-API.",
    "whatToLookFor": [
      {
        "label": "Ping-Latenz (RTT)",
        "description": "Misst die Umlaufzeit in Millisekunden für Pakete, die von Ihrem Browser zum Testserver übertragen werden."
      },
      {
        "label": "Download-Durchsatz (Mbps)",
        "description": "Berechnet die maximale nachhaltige Bandbreite beim Streamen hochauflösender Nutzlastpakete."
      },
      {
        "label": "Verbindungsprofil und -typ",
        "description": "Erkennt den gemeldeten effektiven Verbindungstyp (4G, WLAN, Ethernet) und die Downlink-Obergrenze."
      },
      {
        "label": "Verbindungsstabilität und Jitter",
        "description": "Beobachtet die Varianz zwischen aufeinanderfolgenden Ping-Bursts, um Paketwarteschlangen oder Bufferbloat zu identifizieren."
      }
    ],
    "canObserve": [
      "HTTP/HTTPS-Request-Response-Round-Trip-Round-Trip-Time (RTT) in Millisekunden",
      "Effektive Verbindungsgeschwindigkeitsklasse über navigator.connection",
      "Der Download-Durchsatz wird anhand der Fetch-Stream-Bytes geteilt durch die Übertragungszeit berechnet",
      "Vom Benutzeragenten gemeldeter Status des Data Saver-Flags"
    ],
    "cannotMeasure": [
      "Direkte rohe TCP-Socket-Synchronisierung ohne Browser-HTTP-Stack-Overhead",
      "Physikalische Leitungsdämpfung des ISP, SNR-Margen oder Glasfaser-Leistungspegel",
      "Störung des lokalen WLAN-Funkfrequenzkanals"
    ],
    "interpretation": "Latenzen unter 30 ms sind ideal für wettbewerbsfähiges Online-Gaming und Cloud-Display-Streaming. Geschwindigkeiten über 50 Mbit/s sorgen für pufferfreies 4K-HDR-Streaming.",
    "nextSteps": {
      "text": "Testen Sie, ob Ihre Anzeige- und Grafikpipeline eine Click-to-Photon-Latenz verursacht.",
      "actionLabel": "Starten Sie den Input-Lag-Test",
      "actionHref": "/tests/input-lag-test"
    }
  },
  "color-blindness-test": {
    "overview": "Der Farbenblindheitssimulator wendet mathematisch kalibrierte SVG-Farbmatrixfilter an, um 8 verschiedene Arten von Farbfehlsichtigkeit (CVD) zu emulieren. Es ermöglicht Entwicklern und Designern, die Lesbarkeit der Benutzeroberfläche, die Kontrastverhältnisse und die Zugänglichkeit farbcodierter Informationen zu bewerten.",
    "whatToLookFor": [
      {
        "label": "Protanopie und Protanomalie (rotschwach)",
        "description": "Ein L-Zapfen-Mangel lässt reine Rottöne dunkelbraun oder anthrazit erscheinen; Rot-Grün-Unterschiede nehmen ab."
      },
      {
        "label": "Deuteranopie und Deuteranomalie (grün-schwach)",
        "description": "Ein M-Zapfen-Mangel lässt Grün- und Rottöne in gelbliche Farbtöne übergehen; die häufigste Form von Herz-Kreislauf-Erkrankungen."
      },
      {
        "label": "Tritanopie und Tritanomalie (blau-schwach)",
        "description": "Ein S-Zapfen-Mangel lässt Blautöne grünlich und Gelbtöne hellviolett oder grau erscheinen."
      },
      {
        "label": "Achromatopsie (totale Monochromie)",
        "description": "Völliges Fehlen funktionsfähiger Zapfen-Photorezeptoren, Wahrnehmung der Darstellung in reinen Grautönen."
      }
    ],
    "canObserve": [
      "Optische Echtzeittransformation von Text, Symbolen, Diagrammen und Farbfeldern über 8 CVD-Matrizen",
      "Direkter Vergleich des normalen trichromatischen Sehens mit dem simulierten Farbmangel",
      "Kontrastverschlechterung zwischen wichtigen UI-Statusindikatoren (Erfolg grün vs. Fehler rot)",
      "Textlesbarkeit gegenüber Hintergrundtönen bei jeder Farbvisionsvariante"
    ],
    "cannotMeasure": [
      "Klinische Diagnose des genetischen Farbsehvermögens des menschlichen Benutzers (z. B. Farnsworth-Munsell 100-Hue-Test)",
      "Genaue individuelle Schwankungen der Netzhautempfindlichkeit zwischen Stäbchen und Zapfen",
      "Physikalische Anzeige spektraler Emissionsspitzen ohne Spektroradiometer"
    ],
    "interpretation": "Wenn Ihre kritischen UI-Indikatoren (z. B. Fehlerwarnungen, Diagramme oder primäre Aktionsschaltflächen) unter Deuteranopie oder Protanopie nicht mehr zu unterscheiden sind, ergänzen Sie Farbhinweise durch Symbole, fette Typografie und eindeutige Formumrisse, um den WCAG 2.2-Richtlinien zu entsprechen.",
    "nextSteps": {
      "text": "Überprüfen Sie die physische Farbraumabdeckung Ihres Monitors für sRGB und DCI-P3.",
      "actionLabel": "Überprüfen Sie den Farbraum",
      "actionHref": "/tests/color-gamut-test"
    }
  },
  "screen-recorder": {
    "overview": "Das Dienstprogramm „Screen Recorder & Screenshot“ nutzt die Screen Capture API und die MediaRecorder API, um Desktop-Bildschirme, Anwendungsfenster oder Browser-Registerkarten aufzuzeichnen und pixelgenaue PNG-Schnappschüsse direkt ohne Softwareinstallation zu erfassen.",
    "whatToLookFor": [
      {
        "label": "Stream-Auflösung anzeigen",
        "description": "Überprüft, ob die aufgenommene Videospur mit den Pixelabmessungen der nativen Leinwand Ihres Monitors übereinstimmt."
      },
      {
        "label": "Bildrate erfassen",
        "description": "Überwacht die Glätte der Bildrate und die Aufnahmedauer in Echtzeit."
      },
      {
        "label": "Audiospur-Integration",
        "description": "Erfasst optionales Systemaudio oder Tab-Audio neben dem Anzeigestream."
      },
      {
        "label": "Verlustfreie PNG-Schnappschussqualität",
        "description": "Erfasst sofortige Einzelbild-Bitmap-Puffer, die direkt in ein herunterladbares PNG-Bild gerendert werden."
      }
    ],
    "canObserve": [
      "Streamen Sie die Videoabmessungen, das Seitenverhältnis und die Bildrateneinstellungen",
      "Aufzeichnung der verstrichenen Zeit, Pausen-/Fortsetzungsstatus und generierte WebM-Video-Blob-Größe",
      "Sofortiges Rendern von Standbildern auf einem HTML5-Canvas für den PNG-Export",
      "Browserberechtigungen für die Anzeigemedienerfassung werden gewährt"
    ],
    "cannotMeasure": [
      "Hardware-GPU-Codierungslatenz innerhalb der Video-Encoder des Betriebssystems",
      "Erfassung geschützter DRM-Medieninhalte (Netflix, Disney+ usw., die schwarze Bildschirme ausgeben)",
      "Aktualisierungssynchronisierung des physischen Monitors ohne Skalierung des Erfassungspuffers"
    ],
    "interpretation": "Bildschirmaufzeichnungen werden lokal im Speicher Ihres Browsers generiert und niemals auf einen Remote-Server hochgeladen, wodurch die absolute Privatsphäre bei sensiblen Anwendungstests gewahrt bleibt.",
    "nextSteps": {
      "text": "Möchten Sie die Auflösung Ihrer Webcam und Frontkamera testen?",
      "actionLabel": "Starten Sie den Webcam-Test",
      "actionHref": "/tests/webcam-test"
    }
  },
  "dark-mode-test": {
    "overview": "Der Dunkelmodus- und Designkompatibilitätsinspektor wertet die Medienabfrage Ihres Systems nach bevorzugten Farbschemata, die Rendering-Eigenschaften des CSS-Farbschemas, die Meta-Header für Designfarben und die Kontrastverhältnisse der Komponenten in dunklen und hellen Paletten aus.",
    "whatToLookFor": [
      {
        "label": "Synchronisierung der Betriebssystemeinstellungen",
        "description": "Testet, ob Ihr Browser das Umschalten zwischen dunklem und hellem Modus in Windows, macOS, Android oder iOS automatisch erkennt."
      },
      {
        "label": "Unterstützung für CSS-Farbschemata",
        "description": "Überprüft native Browser-Bildlaufleisten, Formularsteuerelemente und Auswahlhervorhebungen im dunklen Modus."
      },
      {
        "label": "Lesbarkeit des Komponentenkontrasts",
        "description": "Bewertet die Kontrastverhältnisse für Text, Karten, Schaltflächen und Abzeichen in beiden Farbmodi."
      },
      {
        "label": "Pure Black OLED-Effizienz",
        "description": "Bewertet, ob Oberflächen im Dunkelmodus echtes #000000-Schwarz verwenden, um die Batterieeinsparung auf OLED-Panels zu maximieren."
      }
    ],
    "canObserve": [
      "Echtzeitstatus von window.matchMedia('(prefers-color-scheme: dark)')",
      "Browserunterstützung für native CSS-Farbschemaeigenschaften und Systemformularsteuerelemente",
      "Interaktiver Themenwechsel (System, Hell, Dunkel) für sofortigen visuellen Vergleich",
      "Kontrast und Lesbarkeit der Typografie auf hellen und dunklen Oberflächen"
    ],
    "cannotMeasure": [
      "Hardware-OLED-Subpixel-Milliampere-Stromeinsparung ohne physische Messung",
      "Raumlichtanpassung ohne aktiven Umgebungslichtsensor",
      "Farbverschiebungen bei Nachtlicht oder F.Lux-Blaulichtreduzierung"
    ],
    "interpretation": "Moderne Displays mit OLED- oder Mini-LED-Hintergrundbeleuchtung sparen bei der Darstellung wirklich dunkler Hintergründe erheblich Strom und reduzieren gleichzeitig die Belastung durch blaues Licht in dunklen Umgebungen.",
    "nextSteps": {
      "text": "Bewerten Sie die Helligkeit Ihres Displays im Verhältnis zu den Lichtverhältnissen im Raum.",
      "actionLabel": "Umgebungslichttest starten",
      "actionHref": "/tests/ambient-light-test"
    }
  },
  "input-lag-test": {
    "overview": "Der Input Lag Visualizer bietet einen statistischen 10-Test-Reaktions- und Pipeline-Latenz-Benchmark. Es misst das Delta zwischen einem zufälligen visuellen Reiz und der Registrierung Ihres Mausklicks oder Ihrer Tastaturbetätigung, stellt den Durchschnitt, die Standardabweichung und ein Antwortverteilungshistogramm grafisch dar.",
    "whatToLookFor": [
      {
        "label": "Reaktionszeit für visuelle Reize",
        "description": "Misst die verstrichenen Millisekunden vom genauen Bild der Farbverschiebung bis zum Klicken Ihres Zeigers."
      },
      {
        "label": "Statistische Konsistenz (Std Dev)",
        "description": "Eine niedrige Standardabweichung (< 25 ms) weist auf ein konsistentes Wahrnehmungs- und Hardware-Pipeline-Timing hin."
      },
      {
        "label": "Ausreißerspitzen und Fehlstarts",
        "description": "Erkennt vorbeugende Klicks, bevor der grüne visuelle Auslöser erscheint."
      },
      {
        "label": "Verteilungshistogramm",
        "description": "Visualisiert Latenzcluster, um biologische Reaktionen von Verzögerungen in der Systemwarteschlange zu unterscheiden."
      }
    ],
    "canObserve": [
      "Hochauflösende Millisekunden-Zeitstempel über performance.now() vom Stimulus-Rendering bis zum Ereignisversand",
      "Statistische Kennzahlen: Durchschnitt, Beste (am schnellsten), Schlechteste (am langsamsten) und Standardabweichung über 10 Versuche",
      "Visuelle Zustandsmaschine in Echtzeit, die Fehlklicks verhindert",
      "Antwortzeit-Histogramm, das Latenz-Buckets zuordnet"
    ],
    "cannotMeasure": [
      "Isolierte Click-to-Photon-Latenz einer optischen Fotodiode ohne externe Hardware-Sonden (z. B. LDAT)",
      "Interne USB-Abfrage-Mikrointervalle getrennt von der Betriebssystem-Interrupt-Planung",
      "Übersteuerungsreaktionszeit des physischen Monitors"
    ],
    "interpretation": "Ein kombinierter menschlicher Reaktions- und Display-Pipeline-Score von 180 ms bis 240 ms ist typisch für Gaming-Setups mit hoher Bildwiederholfrequenz. Werte über 300 ms deuten auf eine Nachbearbeitungsverzögerung der Anzeige (Spielemodus deaktiviert) oder eine höhere Eingabelatenz hin.",
    "nextSteps": {
      "text": "Überprüfen Sie die tatsächliche Hardware-Aktualisierungsrate und die Frame-Liefergeschwindigkeit Ihres Displays.",
      "actionLabel": "Starten Sie den Aktualisierungsratentest",
      "actionHref": "/tests/refresh-rate-test"
    }
  },
  "ambient-light-test": {
    "overview": "Der Ambient Light Sensor Inspector liest mithilfe der AmbientLightSensor API die Beleuchtungsstärke in Lux (lx). Es bewertet die Lichtverhältnisse im Raum, gibt ergonomische Empfehlungen zur Displayhelligkeit und stellt Lichtschwankungen im Zeitverlauf grafisch dar.",
    "whatToLookFor": [
      {
        "label": "Lux-Beleuchtungsstärke in Echtzeit",
        "description": "Überwacht die Umgebungslichtintensität in Lux, die von integrierten Fotodetektoren des Geräts erfasst wird."
      },
      {
        "label": "Ergonomische Helligkeitshinweise",
        "description": "Empfiehlt optimale Monitor-Nieten-/Helligkeits-Schiebereglerstufen für Ihre aktuellen Raumbedingungen."
      },
      {
        "label": "Warnung vor Blendgefahr",
        "description": "Ermittelt, ob bei intensiver Umgebungsbeleuchtung (> 1000 lx) eine blendfreie Beschattung oder Spitzenhelligkeit erforderlich ist."
      },
      {
        "label": "Stabilität der Umgebungsbeleuchtung",
        "description": "Verfolgt Änderungen der Raumbeleuchtung im Laufe der Zeit, um flackernde Glühbirnen oder wechselndes Tageslicht zu erkennen."
      }
    ],
    "canObserve": [
      "Echtzeitwerte der Umgebungsbeleuchtungsstärke in Lux von Hardware-Fotodetektoren",
      "Kategorisierung der Beleuchtungszonen (Pitch Dark, Dim Room, Office, Bright Indoor, Daylight)",
      "Empfohlener Prozentsatz der Displayhelligkeit basierend auf den ISO-Ergonomierichtlinien",
      "Historisches Diagramm der Lichtstärke während der aktiven Sitzung"
    ],
    "cannotMeasure": [
      "Umgebungslichtmessungen auf Browsern oder Betriebssystemen ohne Unterstützung für die generische Sensor-API",
      "Farbtemperatur (Kelvin) oder CRI-Bewertung der Raumbeleuchtung ohne RGB-Umgebungssensor",
      "Vektorwinkel der gerichteten Blendung, die auf die Paneloberfläche treffen"
    ],
    "interpretation": "Für angenehmes Lesen ohne Belastung der Augen sollte eine Büroumgebung zwischen 300 Lux und 500 Lux liegen und die Displayhelligkeit auf etwa 120–150 Nits eingestellt sein. Bei Werten unter 50 lx muss die Displayhelligkeit verringert werden, um Ermüdungserscheinungen vorzubeugen.",
    "nextSteps": {
      "text": "Kalibrieren Sie die Helligkeit und den Schwarzwertschwellenwert Ihres Bildschirms.",
      "actionLabel": "Starten Sie den Helligkeitstest",
      "actionHref": "/tests/brightness-test"
    }
  },
  "dpi-calculator": {
    "overview": "Der DPI- und PPI-Rechner berechnet die Pixeldichte, den Subpixelabstand, die Gesamtzahl der Megapixel und die von Apple definierten visuellen Schwellenabstände für die Retina basierend auf den Spezifikationen für die physische Bildschirmdiagonale und die Pixelauflösung.",
    "whatToLookFor": [
      {
        "label": "Pixel pro Zoll (PPI)",
        "description": "Misst die räumliche Pixeldichte über die Diagonale Ihres Anzeigefelds."
      },
      {
        "label": "Punktabstand (Pixelabstand)",
        "description": "Berechnet den physischen Abstand zwischen benachbarten Subpixelzentren in Millimetern."
      },
      {
        "label": "Betrachtungsabstand der Netzhaut",
        "description": "Bestimmt den genauen Abstand, bei dem die menschliche Sehschärfe 20/20 einzelne Pixel nicht mehr unterscheiden kann (60 PPD)."
      },
      {
        "label": "Seitenverhältnis und Megapixel",
        "description": "Berechnet die Paneloberfläche, die Proportionen des Seitenverhältnisses und die insgesamt gerenderten Millionen Pixel."
      }
    ],
    "canObserve": [
      "Berechneter PPI, Punktabstand in Millimetern und Gesamtzahl der Megapixel",
      "Optimale ergonomische und retina-visuelle Betrachtungsabstände in Zoll und Zentimetern",
      "Sofortige Voreinstellungsauswahl für Standardmonitore (24\" 1080p, 27\" 1440p, 32\" 4K, 16\" MacBook Pro)",
      "Interaktive Auflösung und diagonale Schiebereglereingänge"
    ],
    "cannotMeasure": [
      "Physische Bandmessung des äußeren Kunststoffrahmens Ihres Monitors ohne Benutzereingabe",
      "Die optische Subpixel-Rendering-Schärfe wird durch matte Anti-Glare-Beschichtungen beeinträchtigt",
      "Nicht standardmäßige anamorphotische Verzerrung ohne genaue Abmessungen"
    ],
    "interpretation": "Eine Pixeldichte über 110 PPI sorgt für angenehme Textklarheit auf dem Desktop ohne aggressive Skalierung, während Dichten über 220 PPI bei typischen Schreibtischabständen (50–60 cm) echte Retina-Klarheit erreichen.",
    "nextSteps": {
      "text": "Überprüfen Sie die Schriftschärfe und die Subpixel-Wiedergabe für verschiedene Textgrößen.",
      "actionLabel": "Starten Sie den Textklarheitstest",
      "actionHref": "/tests/text-clarity-test"
    }
  },
  "subpixel-layout-test": {
    "overview": "Beim Testen des Subpixel-Layouts wird die mikroskopische physikalische Geometrie der roten, grünen und blauen Emitterstreifen innerhalb jedes Pixels analysiert. Variationen zwischen Standard-RGB-, invertiertem BGR-, dreieckigem QD-OLED- und WOLED-Layout bestimmen direkt, ob das Text-Antialiasing des Betriebssystems (wie Windows ClearType) scharf erscheint oder unter magenta/grünen Farbhöfen leidet.",
    "whatToLookFor": [
      {
        "label": "Subpixel-Geometriestruktur",
        "description": "Gibt an, ob Ihr Panel standardmäßige vertikale RGB-Streifen, BGR-Streifen oder nicht standardmäßige dreieckige Subpixel verwendet."
      },
      {
        "label": "Kontrastreiche Textsäume",
        "description": "Untersucht Schwarz-auf-Weiß- und Weiß-auf-Schwarz-Text auf farbige Lichthöfe (grün oben, magenta unten)."
      },
      {
        "label": "1px-Rasterausrichtung",
        "description": "Überprüft, ob abwechselnde 1-Pixel-Linien als völlig neutrales Grau ohne Farbartefakte gerendert werden."
      },
      {
        "label": "ClearType-Antialiasing-Kalibrierung",
        "description": "Bewertet, ob durch Ausführen von Windows cttune oder Schriftartenglättung Kantenverfärbungen beseitigt werden."
      }
    ],
    "canObserve": [
      "Farbsaum-Artefakte, die in kontrastreichen Serifen-, Sans-Serif- und Monospace-Schriftarten gerendert werden",
      "Subpixel-Ausrichtung gegen kalibrierte 1-Pixel-alternierende vertikale und horizontale Liniengitter",
      "Visuelle Simulation von Subpixel-Emissionsstrukturen über 6 große Panel-Architekturen hinweg"
    ],
    "cannotMeasure": [
      "Optische Verifizierung der Submillimeter-Silizium-Emitter-Geometrie mit einem physikalischen Mikroskop",
      "Direkte Registrierungseinstellungen des Font-Rasterizers des Host-Betriebssystems",
      "Hardware-Scaler-Subpixel-Interpolation in externen Videoaufnahmekarten"
    ],
    "interpretation": "Wenn Text auf einem 1440p- oder 4K-Bildschirm schwache grüne oder magentafarbene Ränder aufweist, verfügt Ihr Display wahrscheinlich über ein BGR- oder QD-OLED-Subpixel-Layout. Durch Ausführen des Windows ClearType Tuner oder Wechseln zu Graustufen-Antialiasing werden die Farbsäume behoben.",
    "nextSteps": {
      "text": "Möchten Sie die Gesamtschärfe der Anzeige und die Skalierung der Auflösung überprüfen?",
      "actionLabel": "Starten Sie den Textklarheitstest",
      "actionHref": "/tests/text-clarity-test"
    }
  },
  "pwm-flicker-test": {
    "overview": "Pulsweitenmodulation (PWM) ist eine Dimmtechnik, die von bestimmten LCD-Hintergrundbeleuchtungen und OLED-Panels verwendet wird und die Lichtquelle schnell ein- und ausschaltet, um eine geringere Helligkeit zu erreichen. Während niederfrequentes PWM (120–480 Hz) bei hohen Frequenzen für das bloße Auge unsichtbar ist, verursacht es schwere Augenbelastung, trockene Augen, Kopfschmerzen und Migräne.",
    "whatToLookFor": [
      {
        "label": "Stroboskopische Phantomperlen",
        "description": "Wenn Sie Ihre Augen bewegen oder mit einem Objekt vor dem Bildschirm schwenken, werden sich bewegende Linien in deutliche Phantomperlen zerlegt, sofern PWM vorhanden ist."
      },
      {
        "label": "Smartphone-Shutter-Scanlines",
        "description": "Die Verwendung einer Telefonkamera mit 1/1000s oder schneller zeigt dunkle, scrollende horizontale Bänder, die durch Modulation des Arbeitszyklus verursacht werden."
      },
      {
        "label": "Flimmerfreier Helligkeitsschwellenwert",
        "description": "Gibt an, bei welchem Prozentsatz der Monitor-OSD-Helligkeit das Display von DC-Dimmung auf PWM umschaltet."
      },
      {
        "label": "Arbeitszyklus-Lumineszenz",
        "description": "Misst das optische Verhältnis zwischen EIN-Dauer und AUS-Dauer während jedes Dimmzyklus."
      }
    ],
    "canObserve": [
      "Visuelle stroboskopische Interferenzmuster, die durch Hochgeschwindigkeits-Scrollgitter erzeugt werden",
      "Optische Interaktion zwischen sakkadischen Augenbewegungen des Benutzers und Panel-Aktualisierungszyklen",
      "Richtlinien für die Überprüfung der PWM-Frequenz durch Smartphone-Kameras"
    ],
    "cannotMeasure": [
      "Exakte physikalische Pulsfrequenz in Hertz ohne externen Fotodioden-Oszilloskop-Tastkopf",
      "Harmonischer Verzerrungsindex der LED-Treiberschaltung",
      "Mikrospannungswelligkeit auf der Stromschiene der Hintergrundbeleuchtung"
    ],
    "interpretation": "Als „Flicker-Free“ oder „TÜV Eye Comfort“ zertifizierte Displays nutzen eine kontinuierliche Gleichstromdimmung auf 0 % Helligkeit. Wenn Sie perlenförmige Geisterspuren sehen, verwendet Ihr Panel die PWM-Dimmung bei niedrigen Helligkeitseinstellungen.",
    "nextSteps": {
      "text": "Möchten Sie hochfrequente VRR-Leuchtdichteschwankungen testen?",
      "actionLabel": "Starten Sie den VRR-Flimmertest",
      "actionHref": "/tests/vrr-flicker-test"
    }
  },
  "dead-pixel-mapper": {
    "overview": "Der Dead Pixel RMA Coordinate Mapper ist ein interaktives Inspektionstool zur Dokumentation defekter Panelpixel. Es ermöglicht Käufern, defekte Pixelkoordinaten zu lokalisieren, Defekte nach Typ zu klassifizieren, die Garantieberechtigung gemäß ISO 9241-307 zu berechnen und formelle RMA-Inspektionsprotokolle für Herstellerersatzansprüche zu exportieren.",
    "whatToLookFor": [
      {
        "label": "Tote (dunkle) Pixel",
        "description": "Dauerhaft ausgeschaltete Subpixel-Triaden, die auf weißen, cyanfarbenen und gelben Bildschirmen pechschwarz bleiben."
      },
      {
        "label": "Hängende (helle) Subpixel",
        "description": "In einem offenen Zustand gesperrte Subpixel leuchten rot, grün, blau oder weiß vor einem rein schwarzen Hintergrund."
      },
      {
        "label": "Fehlerkoordinaten (X, Y)",
        "description": "Präzise Pixeladresse vom Ursprung oben links, um Servicetechnikern den Fehlerort nachzuweisen."
      },
      {
        "label": "Klassengrenzwerte nach ISO 9241-307",
        "description": "Automatischer Vergleich mit den Ersatzgrenzwerten der Klassen 1 (Null-Fehler) und 2 (Verbraucherfreibetrag)."
      }
    ],
    "canObserve": [
      "Exakte Bildschirmkoordinaten (X, Y) der protokollierten fehlerhaften Punkte auf 9 soliden Testhintergründen",
      "Berechnung der Fehlerhäufung in der zentralen Zone gegenüber der peripheren Zone",
      "Einhaltung von Garantierückgaben gemäß ISO 9241-307 Klasse 1 und Klasse 2"
    ],
    "cannotMeasure": [
      "Automatische algorithmische Fehlererkennung ohne manuelle Sichtprüfung durch den Benutzer",
      "Unter der Oberfläche befindlicher Glasstaub vs. echter TFT-Transistorausfall ohne optische Vergrößerung",
      "Interner elektrischer Durchgang des Panel-Treiber-ICs"
    ],
    "interpretation": "Die meisten großen Monitorhersteller (Dell, LG, ASUS, Samsung) halten sich an ISO 9241-307 Klasse 2, die bis zu 2 vollständige tote Pixel oder 5 feststeckende Subpixel pro Million zulässt. Premium-Gaming- und professionelle Displays verfügen häufig über eine Zero Bright Dot-Abdeckung (Klasse 1).",
    "nextSteps": {
      "text": "Sind Subpixel festgefahren, die weiterhin leuchten? Versuchen Sie, sie mit unserem Hochgeschwindigkeitstrainer wiederzubeleben.",
      "actionLabel": "Starten Sie Stuck Pixel Fixer",
      "actionHref": "/tests/stuck-pixel-fixer"
    }
  },
  "gtg-response-time-test": {
    "overview": "Die Grau-zu-Grau-Reaktionszeit (GtG) misst die Zeit, die ein Flüssigkristallpixel benötigt, um von einer beliebigen Zwischengraustufe in eine andere überzugehen. Während die Hersteller mit 1 ms oder 0,5 ms GtG werben, variieren die realen Übergänge erheblich, und aggressive Overdrive-Einstellungen führen häufig zu starkem inversem Ghosting (Überschwingen).",
    "whatToLookFor": [
      {
        "label": "Schwarzes Verschmieren des VA-Panels",
        "description": "Prüft Übergänge von 0 % reinem Schwarz zu 20 % Dunkelgrau, wo VA-Flüssigkristalle am langsamsten sind."
      },
      {
        "label": "Overdrive-Überschwinger (Coronas)",
        "description": "Prüft auf helle weiße oder dunkle invertierte Lichthöfe hinter sich bewegenden Objekten, die durch übermäßige Übersteuerungsspannung verursacht werden."
      },
      {
        "label": "Führende vs. nachlaufende Unschärfe",
        "description": "Vergleicht die Anstiegszeit (dunkel zu hell) mit der Abfallzeit (hell zu dunkel) bei sich schnell bewegenden Zielen."
      },
      {
        "label": "Balancing im Overdrive-Modus",
        "description": "Führt zur Auswahl der optimalen OSD-Overdrive-Stufe (Aus, Normal, Schnell, Extrem)."
      }
    ],
    "canObserve": [
      "Visuelle Geisterbilder verlaufen über anpassbare Anfangs- und End-Grauluminanzwerte",
      "Simulation des Overdrive-Korona-Überschwingens über Standard-Flüssigkristall-Overdrive-Stufen",
      "Kantenschärfe und Klarheit sich bewegender Objekte über kalibrierte Geschwindigkeitsstufen hinweg"
    ],
    "cannotMeasure": [
      "Übergangskurven des Photodiodenoszilloskops im Submillisekundenbereich (10 % bis 90 % Anstiegszeit)",
      "Interne Overdrive-Spannungstabellen-Suchwerte im Monitor-Scaler-ASIC",
      "Temperaturabhängige Änderungen der Flüssigkristallviskosität"
    ],
    "interpretation": "Wenn sich bewegende Objekte einen hellen Lichthof oder eine inverse Silhouette zeigen, ist die OSD-Übersteuerung Ihres Monitors zu hoch („Extrem“) eingestellt. Wenn Sie auf „Schnell“ oder „Normal“ zurückschalten, erhalten Sie eine klarere Bewegungsschärfe ohne Koronaartefakte.",
    "nextSteps": {
      "text": "Möchten Sie die Schärfe und Persistenzunschärfe von sich bewegenden UFOs vergleichen?",
      "actionLabel": "Ghosting-Test starten",
      "actionHref": "/tests/ghosting-test"
    }
  },
  "oled-burn-in-calculator": {
    "overview": "Der OLED Burn-in Risk & Longevity Calculator modelliert die Verschlechterung der Subpixel organischer Leuchtdioden basierend auf der Generation der Panel-Technologie, den täglichen Betriebsstunden, den statischen Schnittstelleninhaltsverhältnissen und den typischen SDR/HDR-Leuchtdichteniveaus. Es bietet eine versicherungsmathematische Prognose der Panel-Lebensdauer und statischer HUD-Gefahren-Hotspots.",
    "whatToLookFor": [
      {
        "label": "Widerstandsfähigkeit der Panel-Generierung",
        "description": "Berücksichtigt die Unterschiede zwischen QD-OLED der ersten Generation, modernen QD-OLED der dritten Generation und WOLED MLA-Mikrolinsen-Arrays."
      },
      {
        "label": "Statisches Inhaltsverhältnis",
        "description": "Berechnet die kumulative statische Belastung von Windows-Taskleisten, Browser-Headern und Gaming-HUDs."
      },
      {
        "label": "Luminanz-Stress-Multiplikator",
        "description": "Modelliert die exponentielle Beschleunigung der Alterung organischen Materials bei hohen Nits."
      },
      {
        "label": "Auswirkungen der Schadensminderungsgewohnheiten",
        "description": "Bewertet den Schutzwert von Pixelverschiebung, automatischem Ausblenden der Taskleiste, Logo-Dimmern und Bildschirm-Timeouts."
      }
    ],
    "canObserve": [
      "Versicherungsmathematische Schätzung der kumulativen statischen Stunden, bevor eine ungleichmäßige Alterung der Subpixel auftritt",
      "Prognostizierte Burn-in-Wahrscheinlichkeitsprozentsätze über einen 1-Jahres-, 3-Jahres- und 5-Jahres-Besitzhorizont",
      "Gefahren-Heatmap-Visualisierung von statischen Schnittstellenregionen mit hohem Risiko"
    ],
    "cannotMeasure": [
      "Verschlechterung der physischen Subpixelspannung in Echtzeit auf Ihrem spezifischen physischen Panel",
      "Umgebungstemperatur im Raum und Wärmeableitungseffizienz des Gehäusekühlkörpers",
      "Interne werkseitige Kompensationszyklus-Protokolldaten, die im Panel-EEPROM gespeichert sind"
    ],
    "interpretation": "Moderne OLED-Monitore mit aktiver Pixelverschiebung, thermischen Kühlkörpern und automatisch ausgeblendeten Taskleisten erreichen in der Regel mehr als fünf Jahre tägliche gemischte Produktivität und Spiele ohne sichtbare Einlagerungen. Eine hohe, anhaltende SDR-Helligkeit auf statisch weißen Hintergründen beschleunigt die Alterung.",
    "nextSteps": {
      "text": "Möchten Sie Ihr aktuelles Panel auf vorhandene statische Bildeinlagerungen untersuchen?",
      "actionLabel": "Starten Sie den Burn-In-Test",
      "actionHref": "/tests/burn-in-test"
    }
  },
  "mouse-polling-test": {
    "overview": "Der Mouse Polling Rate & Sensor Precision-Test erfasst USB-Hardware-Ereigniszeitstempel über hochpräzise Browser-Timer. Es misst die Echtzeit- und Spitzenabfragefrequenz in Hertz (bis zu 8000 Hz), überprüft die Stabilität des Paketintervalls (Jitter), testet die Tastenbetätigung und diagnostiziert das Prellen mechanischer Schalter-Doppelklicks.",
    "whatToLookFor": [
      {
        "label": "Echtzeit-Abfragerate (Hz)",
        "description": "Misst die tatsächliche USB-Ereignisberichtsfrequenz (125 Hz, 500 Hz, 1000 Hz, 4000 Hz, 8000 Hz)."
      },
      {
        "label": "Intervall-Jitter und Stabilität",
        "description": "Überprüft die Konsistenz der Delta-Zeiten zwischen Bewegungspaketen (z. B. 1,0 ms für 1000 Hz, 0,25 ms für 4000 Hz)."
      },
      {
        "label": "Mechanischer Doppelklick-Chatter",
        "description": "Erkennt Schalterprellintervalle unter 60 ms, was auf abgenutzte mechanische Mikroschalter hinweist."
      },
      {
        "label": "DPI-Sensorkalibrierung",
        "description": "Überprüft den physischen Widerstandsabstand in Zoll anhand der registrierten Bildschirmpixelbewegung."
      }
    ],
    "canObserve": [
      "Häufigkeit von USB-Mausbewegungsereignissen, gemeldet über hochauflösende Zeitstempel von performance.now()",
      "Spitzen-, Durchschnitts- und Echtzeit-Abfrageraten über kontinuierliche Bewegungssitzungen hinweg",
      "Anzahl der Klickbetätigungen bei mehreren Tasten und Millisekunden-Intervalle zwischen den Klicks"
    ],
    "cannotMeasure": [
      "Hardware-USB-Bus-Abfragerate bei stationärer Maus (optische Sensoren melden nur Bewegungen)",
      "Sensor-Lift-Off-Distanz (LOD) in physikalischen Millimetern",
      "Direkte MCU-Firmware-Abfragerate, wenn Browser-Ereignisschleifen durch umfangreiche Hintergrundaufgaben gedrosselt werden"
    ],
    "interpretation": "Eine Gaming-Maus, die auf 1000 Hz eingestellt ist, sollte bei schnellen Bewegungen 950 Hz–1000 Hz mit Intervalldeltas von ca. 1,0 ms aufrechterhalten. Wenn Klickintervalle unter 50 ms durch einzelnes physisches Drücken registriert werden, leidet Ihr Mausschalter unter Kontaktvibrationen.",
    "nextSteps": {
      "text": "Möchten Sie Ihre visuelle Reaktionsgeschwindigkeit und Klicklatenz testen?",
      "actionLabel": "Starten Sie den Reaktionszeittest",
      "actionHref": "/tests/reaction-time-test"
    }
  },
  "gpu-benchmark-test": {
    "overview": "Der GPU WebGL 3D Stress & Performance Benchmark rendert komplexe 3D-Partikelsysteme und rotierende Geometrien in Echtzeit direkt in Ihrem Browser. Es misst die anhaltende Bildrate, 1 % niedrige FPS, die Frame-Time-Varianz und die Hardware-Fähigkeiten, um GPU-Engpässe und thermische Drosselung unter Last zu identifizieren.",
    "whatToLookFor": [
      {
        "label": "Anhaltende FPS im Vergleich zu Display-Hz",
        "description": "Bewertet, ob Ihre GPU konsistent mit der nativen Bildwiederholfrequenz Ihres Monitors mithalten kann."
      },
      {
        "label": "1 % Ruckeln bei niedrigen FPS",
        "description": "Verfolgt die unteren 1 % der Bildzeiten, um Mikroruckler und Hintergrund-Asset-Störungen zu erkennen."
      },
      {
        "label": "Rahmenzeitvarianz (ms)",
        "description": "Überwacht die Frame-Pacing-Konsistenz (16,6 ms für 60 Hz, 6,9 ms für 144 Hz, 4,1 ms für 240 Hz)."
      },
      {
        "label": "Thermischer Drosselungsabfall",
        "description": "Gibt an, ob sich die Bildraten im Verlauf eines 30-sekündigen kontinuierlichen Benchmarks verschlechtern."
      }
    ],
    "canObserve": [
      "Clientseitiger WebGL-3D-Rendering-Durchsatz über 10.000 bis 200.000 aktive Partikel",
      "Echtzeit-Bildrate, durchschnittliche FPS, 1 % niedrige Bildraten und Frame-Pacing im Millisekundenbereich",
      "Erkannte WebGL-Grafik-Renderer-Zeichenfolge, GPU-Anbieter und maximale Texturabmessungen"
    ],
    "cannotMeasure": [
      "Physische GPU-Kerntemperatur (°C) oder Lüfterdrehzahl ohne native Telemetrie-Dienstprogramme des Betriebssystems",
      "Leistungsaufnahme der GPU-Platine in Watt (TDP)",
      "VRAM-Speichertaktfrequenz oder Speicherverbindungstemperaturen"
    ],
    "interpretation": "Hohe durchschnittliche FPS mit niedrigen 1 % niedrigen FPS weisen auf ein Stottern der Frame-Pacing oder einen CPU-Thread-Konflikt im Hintergrund hin. Eine gleichmäßige Bildfrequenz sorgt für reaktionsschnelle, ruckelfreie Bewegungen auf Gaming-Displays mit hoher Bildwiederholfrequenz.",
    "nextSteps": {
      "text": "Möchten Sie die Echtzeit-Bildwiederholfrequenz Ihres Monitors überprüfen?",
      "actionLabel": "Starten Sie den Aktualisierungsratentest",
      "actionHref": "/tests/refresh-rate-test"
    }
  },
  "display-certificate": {
    "overview": "Das Display Inspection Certificate ist ein formelles Qualitätsdokumentationsinstrument. Es aggregiert automatisch erkannte Hardwareparameter (native Auflösung, Farbtiefe, breiter Farbraum, Pixeldichte) mit manuellen visuellen Inspektionsbewertungen, um einen druckbaren, zertifizierten Inspektionsbericht für die Wiederverkaufsbewertung oder RMA-Garantieansprüche des Herstellers zu erstellen.",
    "whatToLookFor": [
      {
        "label": "Hardware-Spezifikationsprotokoll",
        "description": "Zertifiziert die native Panel-Auflösung, die Farbbittiefe, das Pixelverhältnis des Geräts und die Unterstützung eines breiten Farbraums."
      },
      {
        "label": "Zusammenfassung der Fehlerprüfung",
        "description": "Zeichnet die genaue Anzahl toter Pixel, festsitzender Subpixel und den Schweregrad des Backlight-Bleedings auf."
      },
      {
        "label": "Konformität mit ISO 9241-307",
        "description": "Dokumentiert, ob das Panel die Verbraucheraustauschkriterien der Klasse 1 (Zero Bright Dot) oder Klasse 2 erfüllt."
      },
      {
        "label": "Druckfertiges Verifizierungslayout",
        "description": "Formatiert alle Daten in ein sauberes, wasserzeichenzertifiziertes Zertifikat, das für den PDF-Export und -Druck optimiert ist."
      }
    ],
    "canObserve": [
      "Zusammenstellung systemgemeldeter Anzeigeparameter und benutzerverifizierter Qualitätsstufen",
      "Generierung eindeutiger kryptografischer Verifizierungs-IDs und Inspektionszeitstempel",
      "Druckoptimiertes Dokumentlayout, das Navigation und interaktive UI-Steuerelemente verbirgt"
    ],
    "cannotMeasure": [
      "Automatisiertes Auslesen der Seriennummer des physischen Panels aus der internen EDID-Firmware (erfordert manuelle Eingabe)",
      "Rechtliche Übernahme von Herstellergarantieansprüchen außerhalb offizieller Hersteller-Servicezentren",
      "Spektralradiometer-Farbgenauigkeit, Delta-E-Verifizierung ohne externe Hardware-Kolorimeter"
    ],
    "interpretation": "Display-Inspektionszertifikate bieten eine vertrauenswürdige Dokumentation beim Kauf oder Verkauf gebrauchter Monitore oder beim Einreichen von RMA-Rückgabeansprüchen während der Rückgabefristen des Herstellers.",
    "nextSteps": {
      "text": "Müssen Sie fehlerhafte Pixelkoordinaten lokalisieren, bevor Sie Ihr Zertifikat erstellen?",
      "actionLabel": "Starten Sie Dead Pixel Mapper",
      "actionHref": "/tools/dead-pixel-mapper"
    }
  },
  "osd-calibration-guide": {
    "overview": "Der interaktive OSD-Monitorkalibrierungsassistent ist eine visuelle Anleitung zum Kalibrieren der physischen On-Screen-Display (OSD)-Hardwaretasten Ihres Displays. Es führt Benutzer durch sechs wesentliche Schritte – Helligkeit, Kontrast, Gamma 2,2, 6500K Farbtemperatur, Schärfe und Overdrive –, ohne dass teure Hardware-Kolorimeter erforderlich sind.",
    "whatToLookFor": [
      {
        "label": "Helligkeit (Schwarzausschnitt)",
        "description": "Stellt die OSD-Helligkeit so ein, dass Patch Nr. 16 schwach sichtbar ist, während Patch Nr. 0 tintenschwarz bleibt."
      },
      {
        "label": "Kontrast (Weißsättigung)",
        "description": "Passt den OSD-Kontrast so an, dass das nahezu weiße Feld Nr. 253 vom reinweißen Feld Nr. 255 unterscheidbar bleibt."
      },
      {
        "label": "Gamma 2,2 Optische Mischung",
        "description": "Richtet die Mittelton-Leuchtdichte mithilfe eines optischen Musters aus, bei dem die Mittelscheibe bei 2,2 übergeht."
      },
      {
        "label": "Farbtemperatur (6500K D65)",
        "description": "Gleicht die Verstärkungsregler für Rot, Grün und Blau aus, um saubere, neutrale Weiß- und Grautöne zu erzielen."
      }
    ],
    "canObserve": [
      "Visuelle Feedback-Ziele, die speziell für Standard-OSD-Einstellbereiche von Monitoren entwickelt wurden",
      "Schachbrettmuster mit optischer Mischung zur Überprüfung der sRGB-Gamma-2.2-Ausrichtung ohne Kalibrierungssonden",
      "Kontrastreicher Text und bewegliche Blockziele zur Feinabstimmung von Schärfe und Overdrive-Stufen"
    ],
    "cannotMeasure": [
      "Direkte Softwaresteuerung über die OSD-Tasten des physischen Monitors über das DDC/CI-Protokoll",
      "Exakte Farbtemperatur in Kelvin ohne Spektralfotometer oder Kolorimeter-Hardwaresonde",
      "Interne Hardware-LUT-Kalibrierung (Look-Up-Tabelle) in professionellen Farbkorrekturmonitoren"
    ],
    "interpretation": "Die werkseitigen Standardeinstellungen des Monitors sind fast immer übersättigt, zu hell (100 %) und zu kühl (8000 K+). Wenn Sie dieser 6-stufigen OSD-Tuning-Anleitung folgen, kommt Ihr Display den internationalen Mastering-Standards sRGB/Rec.709 deutlich näher.",
    "nextSteps": {
      "text": "Möchten Sie die Farbraumabdeckung und die ColorChecker-Genauigkeit überprüfen?",
      "actionLabel": "Starten Sie den Farbgenauigkeitstest",
      "actionHref": "/tests/color-accuracy-test"
    }
  },
  "bright-pixel-test": {
    "overview": "Helle oder heiße Pixel sind Subpixel (rot, grün, blau oder weiß), die in einem beleuchteten oder teilweise erregten Zustand stecken bleiben und vor rein schwarzem und dunklem Hintergrund sichtbar sind.",
    "whatToLookFor": [
      {
        "label": "Heiße Subpixelpunkte",
        "description": "Vereinzelte leuchtende Farbflecken, sichtbar vor dunklen Rahmen in einem abgedunkelten Raum."
      },
      {
        "label": "Chromatisches Subpixel-Glühen",
        "description": "Einzelne rote, grüne oder blaue Subpixelkanäle bleiben offen, während benachbarte Subpixel ausgeschaltet sind."
      },
      {
        "label": "Geclusterte heiße Pixel",
        "description": "Mehrere defekte helle Pixel, die eng beieinander gruppiert sind und normalerweise Anspruch auf Garantierückgabe haben."
      },
      {
        "label": "Anschnitt vs. helle Pixel",
        "description": "Unterscheiden Sie scharfe 1-Pixel-Nadelstiche von diffusem, wolkigem Backlight-Bleeding am Rand."
      }
    ],
    "canObserve": [
      "Exakte Pixelkoordinaten auf tiefschwarzem (#000000) und dunklem Hintergrund",
      "Farbkanalisolierung über primäre RGB- und Weiß-Testbilder hinweg",
      "Kontrastverhältnis zwischen heißen Subpixeln und dunkler umgebender Leinwand"
    ],
    "cannotMeasure": [
      "Leckstrom am Gate des Siliziumtransistors",
      "Physikalische Defekttiefe im Siliziumkristall unter dem Glassubstrat",
      "Wärmedrifteigenschaften der Panel-Rückwandplatine"
    ],
    "interpretation": "Displays der Klasse 1 gemäß ISO 9241-307 erlauben null helle Pixel, während Panels der Klasse 2 typischerweise bis zu 2 dauerhaft helle Pixel pro Million zulassen.",
    "nextSteps": {
      "text": "Haben Sie ein hängengebliebenes Subpixel gefunden? Versuchen Sie einen schnellen visuellen Reiz, um es zu lösen.",
      "actionLabel": "Starten Sie Stuck Pixel Fixer",
      "actionHref": "/tests/stuck-pixel-fixer"
    }
  },
  "burn-in-test": {
    "overview": "Ein Einbrennen des Bildschirms (permanente Bildretention) tritt auf, wenn organische OLED-Verbindungen oder Leuchtstoffe aufgrund statischer Elemente mit hoher Leuchtdichte wie Taskleisten, Kanallogos oder HUD-Anzeigen ungleichmäßig abgebaut werden.",
    "whatToLookFor": [
      {
        "label": "Geisterhafte Taskleisten-Silhouetten",
        "description": "Schwache Umrisse der Betriebssystem-Taskleisten oder Browser-Navigationsleisten sind im Vollbildgrau sichtbar."
      },
      {
        "label": "HUD & Logo-Schatten",
        "description": "Ständige Schatten von statischen Videospiel-Gesundheitsbalken oder Fernsehnachrichtenbannern."
      },
      {
        "label": "50 % Graufeldschattierung",
        "description": "Ungleichmäßige fleckige Flecken oder ungleichmäßige Helligkeit auf mittelgrauen Leinwänden."
      },
      {
        "label": "Vorübergehende vs. dauerhafte Aufbewahrung",
        "description": "Überprüfen Sie, ob sich der Schatten auflöst, nachdem 15 Minuten lang nicht statische Videoinhalte ausgeführt wurden."
      }
    ],
    "canObserve": [
      "Nachbild: Schwache Silhouetten über 50 % Grau und Volltonfarben",
      "Quadrantenlumineszenzkonsistenz über den gesamten Anzeigebereich",
      "Statische Grenzabdruckerkennung auf einheitlichen Farbfeldern"
    ],
    "cannotMeasure": [
      "Prozentsatz des chemischen Abbaus organischer emittierender OLED-Subpixel",
      "Gesamtbetriebsstunden des internen Panels (POH)",
      "Werksseitiger Kompensationszykluszähler und Spannungsoffsets"
    ],
    "interpretation": "Die vorübergehende Bildretention (TIR) verblasst innerhalb von Minuten, während das permanente Einbrennen auf einheitlichen grauen und farbigen Hintergründen unbegrenzt sichtbar bleibt.",
    "nextSteps": {
      "text": "Berechnen Sie das langfristige Einbrennrisiko Ihres Panels anhand Ihrer täglichen Nutzungsgewohnheiten.",
      "actionLabel": "Starten Sie den OLED-Burn-in-Rechner",
      "actionHref": "/tools/oled-burn-in-calculator"
    }
  },
  "color-test": {
    "overview": "Beim Testen der Display-Farben werden die primäre und sekundäre Farbwiedergabe, die spektrale Reinheit der Subpixel und die Konsistenz der Digital-zu-Analog-Leinwandwiedergabe über Vollbild-Farbfelder hinweg bewertet.",
    "whatToLookFor": [
      {
        "label": "Farbreinheit und -sättigung",
        "description": "Stellen Sie sicher, dass die Farben Rot, Grün, Blau, Cyan, Magenta und Gelb den Bildschirm gleichmäßig und ohne Flecken ausfüllen."
      },
      {
        "label": "Kantenchromatische Gleichmäßigkeit",
        "description": "Stellen Sie sicher, dass sich der Farbton oder Ton der Farben in der Nähe der äußeren Ränder des Rahmens nicht ändert."
      },
      {
        "label": "Streifenbildung in gesättigten Farben",
        "description": "Prüfen Sie, ob intensive reine Farben Konturstreifen oder Posterisierung auslösen."
      },
      {
        "label": "Subpixel-Defektisolierung",
        "description": "Beobachten Sie einzelne dunkle oder farbfremde Flecken, die nur auf bestimmten Farbfeldern sichtbar werden."
      }
    ],
    "canObserve": [
      "Vollbildanzeige kalibrierter sRGB- und P3-Hex-Farbfelder",
      "Visuelle Farbtemperatur und Farbtonkonsistenz von Kante zu Kante",
      "Reaktion beim Wechsel des Farbkanals ohne anhaltende Nachbilder"
    ],
    "cannotMeasure": [
      "Absolute spektrophotometrische Farbkoordinaten (CIE 1931 xy)",
      "Optische Spitzennits pro einzelnem Farbkanal",
      "Physikalische Hintergrundbeleuchtungs-Phosphor-Spektralspitzen"
    ],
    "interpretation": "Hochwertige IPS- und OLED-Displays sorgen für eine gleichmäßige Farbsättigung von Kante zu Kante, ohne fleckige Farbtemperaturverschiebungen oder Farbtöne.",
    "nextSteps": {
      "text": "Möchten Sie präzise Farbgenauigkeit und Delta-Abweichungen überprüfen?",
      "actionLabel": "Starten Sie den Farbgenauigkeitstest",
      "actionHref": "/tests/color-accuracy-test"
    }
  },
  "grayscale-test": {
    "overview": "Der Graustufentest bewertet die Fähigkeit eines Monitors, sanfte, neutrale Luminanzstufen von absolutem Schwarz (0 %) bis Spitzenweiß (100 %) ohne chromatische Farbstiche oder Stufenbeschneidung wiederzugeben.",
    "whatToLookFor": [
      {
        "label": "Neutrale Grautonbalance",
        "description": "Graue Stufen sollten völlig neutral erscheinen, ohne rosa, grüne oder blaue Tönung."
      },
      {
        "label": "Deutliche Stufentrennung",
        "description": "Jeder Block in der 16- oder 32-stufigen Rampe sollte individuell von seinem Nachbarn unterscheidbar sein."
      },
      {
        "label": "Dark Step Crush",
        "description": "Stellen Sie sicher, dass die Schritte 1, 2 und 3 nicht zu reinem Schwarz führen."
      },
      {
        "label": "Markieren Sie „Schrittausschnitt“.",
        "description": "Stellen Sie sicher, dass die hellsten Stufen unter 100 % vor reinem Weiß deutlich sichtbar sind."
      }
    ],
    "canObserve": [
      "Stufenweise Luminanzunterscheidung über standardisierte 16/32/64-Block-Rampen",
      "Optische Neutralität und Farbbalance zwischen benachbarten Graustufenfeldern",
      "Browser-Canvas-Rendering von linearen und sRGB-Graustufenschritten"
    ],
    "cannotMeasure": [
      "Exponent der Gammakurve der physikalischen Übertragungsfunktion ohne Kolorimeter",
      "Leuchtdichte des schwarzen Bodens in Candela pro Quadratmeter (cd/m²)",
      "Bittiefe der Hardware-internen Look-Up-Tabelle (1D/3D LUT)."
    ],
    "interpretation": "Selbst Schritte mit neutraler Farbbalance weisen auf eine ordnungsgemäße Werkskalibrierung hin. Getönte graue Blöcke weisen auf eine Weißpunktdrift oder unausgewogene RGB-Verstärkungseinstellungen hin.",
    "nextSteps": {
      "text": "Bewerten Sie die mathematische Luminanzübertragungskurve Ihres Displays.",
      "actionLabel": "Gammatest starten",
      "actionHref": "/tests/gamma-test"
    }
  },
  "saturation-test": {
    "overview": "Sättigungstests überprüfen, wie sauber eine Anzeige von vollständig entsättigtem Neutralgrau (0 %) zu vollständig gesättigter reiner Farbe (100 %) über primäre und sekundäre Kanäle übergeht.",
    "whatToLookFor": [
      {
        "label": "Lineare Sättigungsschritte",
        "description": "Jeder 10 %-Schritt von 0 % auf 100 % sollte einen gleichmäßigen und deutlichen Sprung in der Farbintensität zeigen."
      },
      {
        "label": "Vorzeitiges Abschneiden der Farbe",
        "description": "Stellen Sie sicher, dass die Farben bei 80 % oder 90 % nicht vorzeitig ihre maximale Sättigung erreichen."
      },
      {
        "label": "Farbtonverschiebungen während der Entsättigung",
        "description": "Achten Sie auf Farbverschiebungen (z. B. Rot wird orange, wenn die Sättigung abnimmt)."
      },
      {
        "label": "Übersättigung im breiten Spektrum",
        "description": "Überprüfen Sie, ob die Farben natürlich ausgewogen oder unnatürlich neonfarben wirken."
      }
    ],
    "canObserve": [
      "10-stufige Sättigungsrampen für Rot, Grün, Blau, Cyan, Magenta und Gelb",
      "Visuelle Klarheit der Schrittgrenzen und gleichmäßiger Verlauf",
      "Konsistenz der Browser-Farbraumbegrenzung"
    ],
    "cannotMeasure": [
      "Spektrophotometrischer Reinheitsprozentsatz",
      "Spektrale Leistungsverteilung der Farbemissionen",
      "Physikalisches optisches Farbraumvolumen in CIELAB-Einheiten"
    ],
    "interpretation": "Displays mit gutem Farbmanagement zeigen saubere, deutliche Sättigungsstufen, ohne dass sie vor 100 % zu Vollfarbblöcken verflachen.",
    "nextSteps": {
      "text": "Überprüfen Sie, ob Ihr Display große Farbräume über sRGB hinaus unterstützt.",
      "actionLabel": "Starten Sie den Farbraumtest",
      "actionHref": "/tests/color-gamut-test"
    }
  },
  "color-banding-test": {
    "overview": "Farbstreifen treten auf, wenn subtile Farbverläufe aufgrund unzureichender Bittiefe, GPU-Quantisierung oder schlechter Bildverarbeitung auf dem Monitor in sichtbare Stufenbänder oder Posterkonturen zerfallen.",
    "whatToLookFor": [
      {
        "label": "Abgestufte Banderolierungskonturen",
        "description": "Sichtbare harte Linien über sanfte Verläufe statt eines nahtlosen Übergangs."
      },
      {
        "label": "Posterisierung mit dunklem Farbverlauf",
        "description": "Blockartige Stufenartefakte in dunklen Schattenbereichen des Farbverlaufs."
      },
      {
        "label": "Dithering-Rauschkörnung",
        "description": "Feine räumliche Rauschkörnung sichtbar, wenn zeitliches oder räumliches Dithering (FRC) aktiv ist."
      },
      {
        "label": "Farbtönung in Farbverläufen",
        "description": "Chromatische Streifen, die in vermeintlich neutralen Grau- oder Monochromverläufen auftreten."
      }
    ],
    "canObserve": [
      "Visuelle Farbverlaufsglätte über 8-Bit- und 10-Bit-RGB-Farbverläufe",
      "Vorhandensein von räumlichem Dithering-Rauschen und Schrittquantisierungsartefakten",
      "Konsistenz der Wiedergabe linearer und radialer Farbverläufe"
    ],
    "cannotMeasure": [
      "Native Hardware-Panel-Bittiefe (echte 8-Bit vs. 6-Bit+FRC)",
      "GPU-Ausgabefarbformat (RGB 4:4:4 vs. 4:2:2/4:2:0-Unterabtastung)",
      "Interne Scaler-Dithering-Matrix-Algorithmen"
    ],
    "interpretation": "Glatte Farbverläufe ohne scharfe Linien weisen auf eine ordnungsgemäße 8-Bit- oder 10-Bit-Farbübertragung hin. Sichtbare Streifen weisen auf 6-Bit-FRC-Einschränkungen oder eingeschränkte Dynamikbereichseinstellungen hin.",
    "nextSteps": {
      "text": "Testen Sie Mehrkanal-Gradientenrampen über benutzerdefinierte RGB-Spektren.",
      "actionLabel": "Starten Sie den Gradient Banding-Test",
      "actionHref": "/tests/gradient-banding-test"
    }
  },
  "color-gamut-test": {
    "overview": "Beim Testen des Farbraums wird bewertet, ob Ihr Display, Ihr GPU-Treiber und Ihr Browser große Farbräume wie DCI-P3 und Rec unterstützen. 2020 über Standard sRGB hinaus.",
    "whatToLookFor": [
      {
        "label": "P3-Gamut-Erweiterungsziel",
        "description": "Ein verstecktes Symbol oder eine versteckte Zahl, die nur auf Bildschirmen sichtbar ist, die Display-P3-Farben anzeigen können."
      },
      {
        "label": "sRGB-Klemmgrenze",
        "description": "Beobachten Sie, ob Farben außerhalb von sRGB abgeschnitten oder genau wiedergegeben werden."
      },
      {
        "label": "Tiefe Rot- und Grünsättigung",
        "description": "Überprüfen Sie, ob Rot- und Grüntöne deutlich satter aussehen als auf Standard-Büromonitoren."
      },
      {
        "label": "Status der Browser-Farbverwaltung",
        "description": "Stellen Sie sicher, dass Ihr Webbrowser die Farbverwaltungsprofile des Betriebssystems aktiv nutzt."
      }
    ],
    "canObserve": [
      "Browser-CSS-Farbraum-Medienabfrageerkennung (@media (Farbraum: p3))",
      "Visuelle Unterscheidung zwischen sRGB- und Display P3-Farbfeldern",
      "Canvas-Farbprofilwiedergabe mit großem Farbraum"
    ],
    "cannotMeasure": [
      "Prozentuale Abdeckung von DCI-P3 oder AdobeRGB ohne Spektralfotometer",
      "Optisches Volumen in CIELAB-Einheiten",
      "Physikalische Wellenlängen der Phosphoremission"
    ],
    "interpretation": "Wenn das P3-Indikatorlogo deutlich vom sRGB-Hintergrund zu unterscheiden ist, unterstützen Ihre Anzeigehardware, Ihr Betriebssystem und Ihr Browser aktiv große Farbskalen.",
    "nextSteps": {
      "text": "Überprüfen Sie die Spitzenhelligkeit im hohen Dynamikbereich und die Verarbeitung von Metadaten.",
      "actionLabel": "Starten Sie den HDR-Fähigkeitstest",
      "actionHref": "/tests/hdr-capability-test"
    }
  },
  "color-accuracy-test": {
    "overview": "Bei der Farbgenauigkeitsprüfung werden standardisierte Referenzfarbfelder verwendet, um Farbtonverschiebungen, Farbwahrnehmungsfehler und Hauttonverzerrungen auf Ihrem Display visuell zu erkennen.",
    "whatToLookFor": [
      {
        "label": "Referenz-Patch-Einheitlichkeit",
        "description": "Überprüfen Sie Standard-Patches im ColorChecker-Stil auf Ausgewogenheit und Neutralität."
      },
      {
        "label": "Natürlichkeit des Hauttons",
        "description": "Stellen Sie sicher, dass Porträt-Hauttöne nicht künstlich sonnenverbrannt (zu rot) oder gelblich (zu gelb) wirken."
      },
      {
        "label": "Neutralgraue Achsenausrichtung",
        "description": "Stellen Sie sicher, dass die neutrale Graureihe keine chromatische Tönung aufweist."
      },
      {
        "label": "Sekundäre Farbbalance",
        "description": "Stellen Sie sicher, dass Cyan, Magenta und Gelb reine Farbtöne beibehalten, ohne in Richtung Primärfarben zu driften."
      }
    ],
    "canObserve": [
      "Standardmäßige 24-Patch-Referenzfarbpalettenwiedergabe",
      "Visueller Abgleich mit standardisierten digitalen Referenzwerten",
      "Parallele Patch-Konsistenz über alle Bildschirmbereiche hinweg"
    ],
    "cannotMeasure": [
      "Numerische Delta E (ΔE 2000) Abweichungswerte ohne externen Sensor",
      "Absolute CIE L*a*b*-Koordinaten",
      "Einfluss von Umgebungslicht auf die Wahrnehmung"
    ],
    "interpretation": "Gut kalibrierte Displays sorgen für genaue Farbtöne und Sättigung in allen Testfeldern ohne übermäßige Rötung der Hauttöne oder grünliche Grautöne.",
    "nextSteps": {
      "text": "Erfahren Sie, wie Sie Ihren Monitor mithilfe von Hardware-Steuerelementen für die Bildschirmanzeige kalibrieren.",
      "actionLabel": "Starten Sie den OSD-Kalibrierungsleitfaden",
      "actionHref": "/tools/osd-calibration-guide"
    }
  },
  "brightness-test": {
    "overview": "Beim Helligkeitstest werden nahezu schwarze Schattendetails überprüft (Stufen 1 bis 10 %), um sicherzustellen, dass dunkle Elemente in Spielen, Filmen und Fotos nicht in undurchdringliches Pechschwarz zerdrückt werden.",
    "whatToLookFor": [
      {
        "label": "Nahezu schwarze Quadratsichtbarkeit",
        "description": "Quadratische Flächen mit Luminanzwerten von 1 % bis 5 % sollten kaum vom schwarzen Hintergrund zu unterscheiden sein."
      },
      {
        "label": "Dunkle Stufentrennung",
        "description": "Jedes nachfolgende Quadrat sollte sichtbar heller sein als das vorherige."
      },
      {
        "label": "Schwarzer ebener Boden",
        "description": "Der Hintergrund sollte tiefschwarz bleiben und nicht ins Anthrazitgrau übergehen."
      },
      {
        "label": "Auswirkungen auf die Raumbeleuchtung",
        "description": "Schalten Sie die Raumbeleuchtung aus, um sicherzustellen, dass subtile dunkle Quadrate erkennbar bleiben."
      }
    ],
    "canObserve": [
      "Visuelle Unterscheidung von nahezu schwarzen Quadraten gegenüber reinem Schwarz",
      "Erhöhen Sie den Sichtbarkeitsschwellenwert in subtilen Luminanzschritten",
      "Kontrast zwischen schwarzem Boden und niedrigsten Graustufen"
    ],
    "cannotMeasure": [
      "Absolute Spitzen- oder Mindestleuchtdichte in Candela pro Quadratmeter (Nits)",
      "Spannungsregelungskurven für die Hintergrundbeleuchtung",
      "Prozentsatz der reflektierten Umgebungsblendung"
    ],
    "interpretation": "Bei einer optimalen Anzeige werden Schritt 2 % oder 3 % angezeigt, ohne dass der 0 % Referenz-Schwarzhintergrund in ein verschwommenes Grau übergeht.",
    "nextSteps": {
      "text": "Stellen Sie nun sicher, dass helle Glanzlichter nicht in reines Weiß übergehen.",
      "actionLabel": "Starten Sie den Kontrasttest",
      "actionHref": "/tests/contrast-test"
    }
  },
  "contrast-test": {
    "overview": "Kontrasttests überprüfen das dynamische Verhältnis zwischen den hellsten Weißtönen und den dunkelsten Schwarztönen und stellen so sicher, dass sowohl Glanzlichttexturen als auch Schattendetails gleichzeitig sichtbar bleiben.",
    "whatToLookFor": [
      {
        "label": "White-Step-Differenzierung",
        "description": "Stellen Sie sicher, dass Quadrate mit einer Leuchtdichte von 90 % bis 99 % vom rein weißen Hintergrund unterscheidbar sind."
      },
      {
        "label": "Schwarze Stufentrennung",
        "description": "Stellen Sie sicher, dass dunkle Quadrate von 1 % bis 10 % vor Schwarz sichtbar bleiben."
      },
      {
        "label": "Markieren Sie „Blühen“.",
        "description": "Stellen Sie sicher, dass helle weiße Blöcke keine optische Blendung in benachbarte dunkle Bereiche übertragen."
      },
      {
        "label": "Ausgewaschene Mitteltöne",
        "description": "Stellen Sie sicher, dass der Kontrast nicht künstlich verstärkt wird, wodurch Farbverläufe zerstört werden."
      }
    ],
    "canObserve": [
      "Gleichzeitige Sichtbarkeit von nahezu weißen und nahezu schwarzen Testfeldern",
      "Grenztrennung über mehrstufige Kontrastrampen",
      "Balance des visuellen Dynamikbereichs auf dem Bildschirm"
    ],
    "cannotMeasure": [
      "Statisches ANSI-Kontrastverhältnis (z. B. 1000:1 vs. 3000:1) ohne optische Sonde",
      "Dynamische Kontrastmodulationsgeschwindigkeit",
      "Reflexionsverhältnis des Panels"
    ],
    "interpretation": "Durch den richtig eingestellten Kontrast können nahezu weiße Quadrate (bis zu 98 %) sichtbar sein, ohne dass sie in reines Weiß übergehen, während nahezu schwarze Quadrate deutlich erkennbar bleiben.",
    "nextSteps": {
      "text": "Untersuchen Sie tiefe Schattendetails in dunklen Raumumgebungen.",
      "actionLabel": "Starten Sie den Schwarzwerttest",
      "actionHref": "/tests/black-level-test"
    }
  },
  "black-level-test": {
    "overview": "Der Schwarzwerttest misst die Wiedergabe von Schattendetails und die Tiefe des schwarzen Bodens und stellt sicher, dass die Signale mit der niedrigsten Luminanz präzise wiedergegeben werden, ohne dass es zu Schwarzstichen oder Grauschleier kommt.",
    "whatToLookFor": [
      {
        "label": "Niedrigste sichtbare graue Stufe",
        "description": "Suchen Sie das Kästchen mit dem niedrigsten Prozentsatz (1 %, 2 % oder 3 %), den Sie von echtem Schwarz unterscheiden können."
      },
      {
        "label": "Stabilität des rein schwarzen Hintergrunds",
        "description": "Bestätigen Sie, dass der äußere Hintergrund mit 0 % gerendert wird (RGB 0,0,0)."
      },
      {
        "label": "Glühen vs. schwarze Tiefe",
        "description": "Beachten Sie, ob der Hintergrund wirklich dunkel ist oder durch IPS-Glühen/Backlight-Bleeding erhöht ist."
      },
      {
        "label": "Eckenungleichmäßigkeit",
        "description": "Überprüfen Sie, ob der Schwarzwert in der Nähe der Bildschirmecken im Vergleich zur Mitte ansteigt."
      }
    ],
    "canObserve": [
      "Genauer Schwellenwert der niedrigsten sichtbaren nahezu schwarzen Stufe (1 % bis 8 %)",
      "Visuelle schwarze Tiefe vor einem abgedunkelten Betrachtungsraum",
      "Eckglutinterferenz, die die Schattenwahrnehmung beeinträchtigt"
    ],
    "cannotMeasure": [
      "Absolute minimale Schwarzluminanz in cd/m² (Nits)",
      "Lichtblockierendes Polarisationsverhältnis von Flüssigkristallen",
      "Unversehrtheit der Dichtung der Panelleuchte"
    ],
    "interpretation": "Auf OLED-Panels emittiert echtes Schwarz 0 Nits. Bei LCD-Panels ist ein schwaches Leuchten normal, die Schritte 1–2 % sollten sich jedoch deutlich vom Hintergrund abheben.",
    "nextSteps": {
      "text": "Testen Sie die Graustufenreaktion bei niedriger Luminanz nahe 0 % bis 5 %.",
      "actionLabel": "Starten Sie den Near-Black-Test",
      "actionHref": "/tests/near-black-test"
    }
  },
  "white-level-test": {
    "overview": "Beim Weißpegeltest werden die oberen Glanzlichter Ihres Displays überprüft, um sicherzustellen, dass helle Weißdetails (Stufen 240 bis 254 in 8-Bit) nicht zu einem strukturlosen Weißstich führen.",
    "whatToLookFor": [
      {
        "label": "Nahezu weiße quadratische Grenzen",
        "description": "Überprüfen Sie, ob sich die Quadrate 250, 252 und 254 deutlich vom reinweißen Hintergrund (255) unterscheiden."
      },
      {
        "label": "Verfärbung in hellen Glanzlichtern",
        "description": "Stellen Sie sicher, dass die Spitzenweißquadrate keinen gelblichen oder cyanfarbenen Farbstich annehmen."
      },
      {
        "label": "Augenermüdung / Blendung",
        "description": "Prüfen Sie, ob maximales Weiß bei Ihrer aktuellen Raumbeleuchtung zu Augenbeschwerden führt."
      },
      {
        "label": "Markieren Sie „Blühen“.",
        "description": "Beobachten Sie, ob weiße Blöcke mit hoher Helligkeit Licht in benachbarte Ränder ausstrahlen."
      }
    ],
    "canObserve": [
      "Unterscheidbare Grenzen von Quadraten mit hoher Leuchtdichte gegenüber reinem Weiß (255)",
      "Farbneutralität des Spitzenweißes über alle Bildschirmquadranten hinweg",
      "Schwellenwert für Kantenhervorhebungsbeschneidung"
    ],
    "cannotMeasure": [
      "Dauerhafte Spitzenluminanz in Nits ohne Belichtungsmesser",
      "Optische Farbtemperatur von Spitzenweiß (z. B. 6500 K) ohne Kolorimeter",
      "Drosselkurven des automatischen Helligkeitsbegrenzers (ABL)."
    ],
    "interpretation": "Wenn nahezu weiße Quadrate bis zu 253 oder 254 vom weißen Hintergrund unterscheidbar sind, vermeidet Ihr Monitor das Abschneiden von Glanzlichtern und bewahrt Wolken- und Glanzdetails.",
    "nextSteps": {
      "text": "Überprüfen Sie die allgemeine Gleichmäßigkeit der Leuchtdichte auf der gesamten Anzeigeoberfläche.",
      "actionLabel": "Einheitlichkeitstest starten",
      "actionHref": "/tests/uniformity-test"
    }
  },
  "gamma-test": {
    "overview": "Der Gamma-Test überprüft die nichtlineare Helligkeitskurve Ihres Bildschirms, um sicherzustellen, dass die Grauabstufungen dem Standard-Gammawert 2,2 für sRGB und BT.1886 entsprechen.",
    "whatToLookFor": [
      {
        "label": "Verschmelzungspunkt bei Gamma 2,2",
        "description": "Prüfen Sie, bei welchem Wert (1.8, 2.0, 2.2, 2.4) die gestreiften Muster optisch mit dem grauen Hintergrund verschmelzen."
      },
      {
        "label": "Farbtonneutralität",
        "description": "Die Testmuster sollten ein neutrales Grau ohne Farbstiche (z. B. Rot- oder Grünstich) aufweisen."
      }
    ],
    "canObserve": [
      "Visuelle Gamma-Übereinstimmung bei Standardwerten",
      "Farbkanaldrift entlang der Helligkeitskurve",
      "Gammastabilität bei verschiedenen Blickwinkeln"
    ],
    "cannotMeasure": [
      "Genaue photometrische Leuchtdichte in Candela pro Quadratmeter",
      "Hardware-interne 3D-LUT-Koeffizienten"
    ],
    "interpretation": "Verschmilzt das 2,2-Muster aus normalem Betrachtungsabstand nahtlos, ist Ihr Monitor ideal für Webinhalte und Fotobearbeitung kalibriert.",
    "nextSteps": {
      "text": "Möchten Sie auch den Schwarzwert überprüfen?",
      "actionLabel": "Schwarzwert-Test starten",
      "actionHref": "/tests/black-level-test"
    }
  },
  "solid-color-test": {
    "overview": "Beim Testen von Vollfarbfeldern werden Primär-, Sekundär-, Schwarz-, Weiß- und Grauhintergründe im Vollbildmodus dargestellt, um die Einheitlichkeit des Panels, die Farbreinheit und Subpixeldefekte zu prüfen.",
    "whatToLookFor": [
      {
        "label": "Kantenfarbverschiebungen",
        "description": "Überprüfen Sie, ob sich die Farbtemperatur in der Nähe der Randkanten des Bildschirms verschiebt."
      },
      {
        "label": "Dirty-Screen-Effekt (DSE)",
        "description": "Überprüfen Sie graue und weiße Felder auf fleckige, trübe oder bandförmige Stellen."
      },
      {
        "label": "Subpixel-Defektisolierung",
        "description": "Erkennen Sie tote oder festsitzende Subpixel, die nur auf bestimmten Primärfarbfeldern sichtbar sind."
      },
      {
        "label": "Vignettierung / Eckenschatten",
        "description": "Beobachten Sie, ob die äußersten Ecken im Vergleich zur Mitte leicht abgedunkelt erscheinen."
      }
    ],
    "canObserve": [
      "Visuelle Farbkonsistenz im gesamten Bildschirm über 8 standardisierte Farbfelder",
      "Helligkeitsverschiebungen und Vignettierung vom Rand zur Mitte",
      "Visuelle Erkennung von Staubpartikeln und defekten Subpixeln"
    ],
    "cannotMeasure": [
      "Photometrischer 9-Punkt- oder 25-Punkt-ANSI-Gleichmäßigkeitsprozentsatz",
      "Variation der Plattendicke in Mikrometern",
      "Optische Übertragungseffizienz des Hintergrundbeleuchtungsdiffusors"
    ],
    "interpretation": "Einheitliche Volltonfarben weisen auf eine hohe Panelqualität und eine gleichmäßige Verteilung der Hintergrundbeleuchtung hin. Ungleichmäßige Flecken oder Vignettierung in den Ecken sind bei preisgünstigen LCD-Displays häufig.",
    "nextSteps": {
      "text": "Überprüfen Sie die Leuchtdichte und Farbtemperaturgleichmäßigkeit des 9-Zonen-Panels.",
      "actionLabel": "Einheitlichkeitstest starten",
      "actionHref": "/tests/uniformity-test"
    }
  },
  "viewing-angle-test": {
    "overview": "Beim Betrachtungswinkeltest wird bewertet, wie sich Farbsättigung, Helligkeit und Kontrast verschlechtern, wenn das Display aus außermittigen, schrägen und vertikalen Winkeln betrachtet wird.",
    "whatToLookFor": [
      {
        "label": "Farbauswaschung bei Winkeln",
        "description": "Bewegen Sie Ihren Kopf hin und her und beobachten Sie, ob leuchtende Farben in Pastelltöne übergehen."
      },
      {
        "label": "Gammaverschiebung/Kontrastverlust",
        "description": "Beachten Sie, wenn dunkle Schattendetails ausgewaschen werden und die Schwarzwerte zu milchigem Grau ansteigen."
      },
      {
        "label": "IPS Glow vs. VA Gamma Shift",
        "description": "IPS-Panels zeigen im weiten Winkel einen silbrig-weißen Schimmer; VA-Panels verlieren den Kontrast in der Mitte."
      },
      {
        "label": "Vertikale Inversion (TN-Panels)",
        "description": "Schauen Sie von unten, um zu prüfen, ob sich die Farben auf preisgünstigen TN-Panels in negative Bilder umwandeln."
      }
    ],
    "canObserve": [
      "Die wahrgenommene Farbe und der Kontrast verschieben sich mit zunehmendem Betrachtungswinkel im Vergleich zum Normalzustand",
      "Gleichmäßigkeit des radialen Gradienten bei Betrachtung außerhalb der Achse",
      "Winkelstabilität von Text und kontrastreichen Linien"
    ],
    "cannotMeasure": [
      "Exakte VESA-definierte 178°/178° Betrachtungswinkel-Kontrastschwelle (10:1 CR)",
      "Extinktionsverhältnis des optischen Polarisationsfilters",
      "Brechungsindex des Glassubstrats"
    ],
    "interpretation": "IPS- und OLED-Panels gewährleisten eine hohe Farbtreue über weite Winkel hinweg. VA-Panels leiden unter Kontrastverlust und Gammaverschiebung, während TN-Panels die Farben vertikal invertieren.",
    "nextSteps": {
      "text": "Überprüfen Sie, ob bei Betrachtung aus einem anderen Winkel ein Ausbluten der Hintergrundbeleuchtung in den Ecken auftritt.",
      "actionLabel": "Starten Sie den Backlight-Bleeding-Test",
      "actionHref": "/tests/backlight-bleed-test"
    }
  },
  "blooming-test": {
    "overview": "Der Blooming-Test bewertet Lichthöfe (Halo-Effekt) auf Mini-LED- und FALD-Bildschirmen, bei denen hell erleuchtete Objekte auf tiefschwarzem Hintergrund Licht in benachbarte Dimmzonen streuen.",
    "whatToLookFor": [
      {
        "label": "Lichthof um helle Elemente",
        "description": "Beobachten Sie, ob um den wandernden weißen Kreis oder die Schrift ein sichtbarer Lichtschein entsteht."
      },
      {
        "label": "Zonenschaltverzögerung",
        "description": "Achten Sie darauf, ob lokale Dimmzonen bei schnellen Bewegungen mit sichtbarer Verzögerung aufleuchten."
      }
    ],
    "canObserve": [
      "Sichtbarkeit von Blooming-Halos auf echtem Schwarz",
      "Aggressivität des lokalen Dimm-Algorithmus",
      "Auswirkungen des Betrachtungswinkels auf Lichthöfe"
    ],
    "cannotMeasure": [
      "Exakte Anzahl der physischen Dimmzonen",
      "Firmware-Dimmkurve"
    ],
    "interpretation": "OLED-Displays zeigen gar kein Blooming; hochwertige Mini-LEDs halten Lichthöfe minimal.",
    "nextSteps": {
      "text": "Möchten Sie auch den Kontrast überprüfen?",
      "actionLabel": "Kontrast-Test starten",
      "actionHref": "/tests/contrast-test"
    }
  },
  "tv-overscan-test": {
    "overview": "Beim TV-Overscan-Test wird überprüft, ob Ihr Fernseher oder Ihr externes Display Bilder mit einer exakten 1:1-Pixelzuordnung wiedergibt oder ob sie künstlich heranzoomt und Umfangskanten abschneidet.",
    "whatToLookFor": [
      {
        "label": "0 % Randsichtbarkeit",
        "description": "Weiße Grenzlinien mit der Markierung 0 % müssen den physischen Bildschirmrahmen auf allen vier Seiten perfekt berühren."
      },
      {
        "label": "Abgeschnittene Anzeigepfeile",
        "description": "Überprüfen Sie, ob die Pfeilspitzen an den Außenkanten abgeschnitten oder hinter der Blende verborgen sind."
      },
      {
        "label": "Unschärfe skalieren",
        "description": "Überprüfen Sie, ob Text und Einzelpixelränder aufgrund der Skalierungsinterpolation weich und unscharf erscheinen."
      },
      {
        "label": "1px Linienschärfe",
        "description": "Abwechselnde 1-Pixel-Grenzlinien sollten klar und ohne Moiré-Störungen dargestellt werden."
      }
    ],
    "canObserve": [
      "Prozentsatz der Kantenbeschneidung (0 %, 2,5 %, 5 %) an allen vier Anzeigerändern",
      "Sichtbarkeit der Grenzpfeile und exakte Pixel-zu-Rahmen-Ausrichtung",
      "Pixel-zu-Pixel-Schärfe gegenüber Leinwandkanten"
    ],
    "cannotMeasure": [
      "Interne TV-Scaler-DSP-Chipregister",
      "Video-HDMI-EDID-Overscan-Flags",
      "Abmessungen der optischen Überlappung der Gehäuseblende"
    ],
    "interpretation": "Wenn die 0 %-Grenzlinien vollständig sichtbar und die 1-Pixel-Ränder gestochen scharf sind, ist auf Ihrem Display die 1:1-Pixelzuordnung aktiviert („Just Scan“, „Fit to Screen“ oder „Dot by Dot“).",
    "nextSteps": {
      "text": "Überprüfen Sie die Skalierung des Seitenverhältnisses über kreisförmige geometrische Formen hinweg.",
      "actionLabel": "Skalierungs- und Seitenverhältnistest starten",
      "actionHref": "/tests/scaling-aspect-test"
    }
  },
  "scaling-aspect-test": {
    "overview": "Skalierungs- und Seitenverhältnistests validieren die geometrische Symmetrie über Standard-Anzeigeverhältnisse (16:9, 16:10, 21:9, 32:9, 4:3) und stellen sicher, dass Kreise perfekt rund und unverzerrt bleiben.",
    "whatToLookFor": [
      {
        "label": "Konzentrische Kreissymmetrie",
        "description": "Stellen Sie sicher, dass die Kreise perfekt rund sind und keine ovale Verformung, Dehnung oder Quetschung aufweisen."
      },
      {
        "label": "Einheitlichkeit des quadratischen Aspekts",
        "description": "Stellen Sie sicher, dass quadratische Gitter die gleiche Pixelbreite und -höhe haben."
      },
      {
        "label": "Orthogonalität des linearen Gitters",
        "description": "Stellen Sie sicher, dass horizontale und vertikale Linien genau im rechten Winkel von 90 Grad aufeinandertreffen."
      },
      {
        "label": "Interpolation Moiré",
        "description": "Überprüfen Sie konzentrische Ringe auf gezacktes Aliasing oder Moiré-Schimmer."
      }
    ],
    "canObserve": [
      "Visuelle Kreissymmetrie gegenüber Pixelgittern über Standardseitenverhältnisse hinweg",
      "Verzerrung des Seitenverhältnisses durch falsche GPU- oder Anzeigeskalierungsmodi",
      "Skalierungsverhalten der Canvas-Auflösung"
    ],
    "cannotMeasure": [
      "Physisches Seitenverhältnis des Panels in Millimetern",
      "GPU-Hardware-Skalierungs-Interpolationsfilterkerne",
      "Optische Verzerrung durch anamorphotische Linse"
    ],
    "interpretation": "Verlängerte oder gequetschte Kreise weisen auf eine Nichtübereinstimmung des Seitenverhältnisses in den Anzeigeeinstellungen des Betriebssystems, im GPU-Bedienfeld oder im OSD-Seitenmodus des Monitors hin.",
    "nextSteps": {
      "text": "Überprüfen Sie die physischen und logischen Auflösungseinstellungen Ihres Displays.",
      "actionLabel": "Starten Sie den Resolution Checker",
      "actionHref": "/tests/resolution-checker"
    }
  },
  "screen-tearing-test": {
    "overview": "Bildschirmrisse treten auf, wenn die Bildrate der Grafikkarte nicht mit den festen Aktualisierungszyklen des Monitors synchronisiert ist, was dazu führt, dass aufeinanderfolgende Bilder in geteilten horizontalen Slices gerendert werden.",
    "whatToLookFor": [
      {
        "label": "Horizontale Trennlinien",
        "description": "Suchen Sie nach horizontalen Bruchlinien, die sich über bewegliche vertikale Balken erstrecken."
      },
      {
        "label": "Diskontinuierliche Bewegung",
        "description": "Beachten Sie, wenn der obere Teil eines beweglichen Elements vor dem unteren Teil verschoben wird."
      },
      {
        "label": "Multi-Tear-Artefakte",
        "description": "Achten Sie bei hohen Bildraten auf mehrere gleichzeitige Risse über die gesamte Bildschirmhöhe."
      },
      {
        "label": "V-Sync-Stuttern vs. Tearing",
        "description": "Überprüfen Sie, ob die Aktivierung von V-Sync Tearing durch periodische Mikroruckler ersetzt."
      }
    ],
    "canObserve": [
      "Visuelle horizontale Tearing-Artefakte auf sich mit hoher Geschwindigkeit bewegenden Stäben",
      "Stabilität der Frame-Synchronisierung über Benutzeraktualisierungsraten hinweg",
      "Einfluss der Browser-Vsync-Sperre auf die Glätte der Animation"
    ],
    "cannotMeasure": [
      "Timing der GPU-Hardware-Scanout-Zeile",
      "Mikro-Timings für das vertikale Austastintervall von DisplayPort/HDMI",
      "Direkte Handshake-Register des G-Sync/FreeSync-Hardwaremoduls"
    ],
    "interpretation": "Horizontale Risslinien bestätigen deaktiviertes oder nicht übereinstimmendes V-Sync. Variable Bildwiederholfrequenz (VRR / FreeSync / G-Sync) eliminiert Tearing ohne Eingabeverzögerung.",
    "nextSteps": {
      "text": "Testen Sie die Glätte und ruckelfreie Bewegung mit variabler Bildwiederholfrequenz.",
      "actionLabel": "Starten Sie den VRR-Test",
      "actionHref": "/tests/vrr-test"
    }
  },
  "screen-flicker-test": {
    "overview": "Beim Testen von Bildschirmflimmern werden schnelle periodische Luminanzschwankungen aufgedeckt, die durch niederfrequente PWM-Hintergrundbeleuchtungen, Spannungsschwankungen oder Instabilität des Panel-Treiber-Timings verursacht werden.",
    "whatToLookFor": [
      {
        "label": "Visuelles Stroboskopieren oder Schimmern",
        "description": "Erkennen Sie subtiles hochfrequentes Summen oder Blinken auf feinen Streifenmustern."
      },
      {
        "label": "Stroboskopische Phantomlinien",
        "description": "Bewegen Sie Ihre Augen schnell über den Bildschirm. Bei Flimmern erscheinen die Linien perlenförmig."
      },
      {
        "label": "Periphere Sehempfindlichkeit",
        "description": "Schauen Sie leicht vom Monitor weg, um festzustellen, ob das Flimmern im peripheren Sichtfeld stärker ausgeprägt ist."
      },
      {
        "label": "Helligkeitsschwelle",
        "description": "Verringern Sie die Helligkeit des Monitors, um festzustellen, ob das Flimmern erst unter einem bestimmten Wert beginnt."
      }
    ],
    "canObserve": [
      "Visuelle Wahrnehmung von Flimmermustern über feine Gitter und Wechselfelder",
      "Stroboskopische Interaktion mit sakkadischen Augenbewegungen des Menschen",
      "Musterschimmer über Hochfrequenz-Luminanzmasken"
    ],
    "cannotMeasure": [
      "Präzise elektrische Impulsfrequenz in Hertz ohne Oszilloskop-Fotodiode",
      "Prozentsatz des Arbeitszyklus des Hintergrundbeleuchtungstreibers",
      "Harmonischer Flickerindex"
    ],
    "interpretation": "Sichtbares Flackern auf einfarbigen oder gemusterten Hintergründen weist auf niederfrequentes PWM-Dimmen oder Auffrischungsinstabilität hin, eine Hauptursache für Augenermüdung und Kopfschmerzen.",
    "nextSteps": {
      "text": "Führen Sie einen speziellen Test für das Pulsweitenmodulations-Dimmen durch.",
      "actionLabel": "Starten Sie den PWM-Flimmertest",
      "actionHref": "/tests/pwm-flicker-test"
    }
  },
  "resolution-checker": {
    "overview": "Der Resolution Checker bietet Echtzeitdiagnosen der physischen Bildschirmauflösung, der CSS-Ansichtsfensterabmessungen, des Device Pixel Ratio (DPR) und der Pixeldichte.",
    "whatToLookFor": [
      {
        "label": "Native Auflösungsübereinstimmung",
        "description": "Stellen Sie sicher, dass die gemeldeten physischen Bildschirmpixel mit den Spezifikationen Ihres Monitorherstellers übereinstimmen."
      },
      {
        "label": "DPR-Skalierungsfaktor für hohe DPI",
        "description": "Überprüfen Sie, ob das Pixelverhältnis Ihres Geräts auf 1,0x (100 %), 1,25x (125 %), 1,5x (150 %) oder 2,0x (200 %) eingestellt ist."
      },
      {
        "label": "Logische Ansichtsfensterabmessungen",
        "description": "Beobachten Sie den verfügbaren CSS-Pixelraum, der Webseiten und Anwendungen angezeigt wird."
      },
      {
        "label": "Klassifizierung des Seitenverhältnisses",
        "description": "Bestätigen Sie, dass das berechnete Seitenverhältnis den Standardabmessungen 16:9, 16:10 oder Ultra-Wide entspricht."
      }
    ],
    "canObserve": [
      "Abmessungen des Browser-Ansichtsfensters („window.innerWidth“, „window.innerHeight“)",
      "Bildschirmabmessungen des Betriebssystems („screen.width“, „screen.height“)",
      "Von der Browserumgebung gemeldetes Gerätepixelverhältnis („window.devicePixelRatio“)",
      "Bildschirmausrichtung und verfügbarer Desktop-Arbeitsbereich"
    ],
    "cannotMeasure": [
      "Diagonale des physischen Monitors in Zoll ohne Benutzereingabe",
      "Physikalischer Punktabstand in Millimetern",
      "Multi-Monitor-Topologie außerhalb des Browserbereichs"
    ],
    "interpretation": "Der Betrieb mit der nativen Auflösung des Panels sorgt für gestochen scharfe Texte und Grafiken. Eine gebrochene Skalierung (z. B. 125 %) kann in älteren Desktop-Anwendungen zu geringfügiger Weichheit führen.",
    "nextSteps": {
      "text": "Sehen Sie sich detaillierte WebGL-Grafikfunktionen und Hardware-Anzeigeinformationen an.",
      "actionLabel": "Starten Sie die Display-Info-Diagnose",
      "actionHref": "/tests/display-info"
    }
  },
  "touch-screen-test": {
    "overview": "Die Touchscreen-Diagnose testet die Genauigkeit, Reaktionsfähigkeit, Totzonen und Kantenempfindlichkeit des Berührungssensors auf Mobilgeräten, Tablets und Touchscreen-Monitoren.",
    "whatToLookFor": [
      {
        "label": "Touch-Tracking-Genauigkeit",
        "description": "Gezeichnete Linien sollten ohne Versatz oder Verzögerung direkt unter Ihrer Fingerspitze verlaufen."
      },
      {
        "label": "Nicht reagierende tote Zonen",
        "description": "Testen Sie alle Ecken und Ränder, um sicherzustellen, dass jeder Quadrant Berührungseingaben registriert."
      },
      {
        "label": "Berühren Sie Latenz/Trailing",
        "description": "Beachten Sie den Nachlaufabstand zwischen Ihrem bewegten Finger und der gezeichneten Tintenspur."
      },
      {
        "label": "Kantenregistrierung",
        "description": "Stellen Sie sicher, dass Berührungen entlang der äußersten Außenkante des Displays zuverlässig registriert werden."
      }
    ],
    "canObserve": [
      "Echtzeit-Touch-Koordinaten auf der Bildschirmfläche",
      "Aktive Berührungspunktverfolgung und Zeichnungskontinuität",
      "Häufigkeit und Reaktionsfähigkeit der Touch-Ereignisauslösung"
    ],
    "cannotMeasure": [
      "Abtastrate des kapazitiven Touch-Digitalisierers in Hertz (z. B. 120 Hz/240 Hz-Abfrage)",
      "Physikalische Glasoberflächenimpedanz und Zustand der Anti-Fingerprint-Beschichtung",
      "Druckempfindlichkeitsstufen in Gramm ohne druckempfindliche Hardware"
    ],
    "interpretation": "Glatte, durchgehende Linien über den gesamten Anzeigebereich stellen sicher, dass der kapazitive Digitalisierer keine toten Stellen, Geisterberührungsprobleme oder Grenzüberschreitungen aufweist.",
    "nextSteps": {
      "text": "Testen Sie die Gestenverfolgung mit mehreren Fingern und maximale Berührungspunkte.",
      "actionLabel": "Starten Sie den Multi-Touch-Test",
      "actionHref": "/tests/multi-touch-test"
    }
  },
  "sharpness-test": {
    "overview": "Bei der Schärfeprüfung werden die Schriftwiedergabe, die Kantenschärfe und die künstliche Kantenverstärkung durch übermäßige Schärfeeinstellungen auf dem Bildschirm bewertet.",
    "whatToLookFor": [
      {
        "label": "Weißes Halo-Klingeln",
        "description": "Achten Sie auf leuchtend weiße Ränder oder Ränder um schwarzen Text und kontrastreiche Linien."
      },
      {
        "label": "Siemens Star Spurious Resolution",
        "description": "Überprüfen Sie, ob die Speichenlinien sauber zur Mitte zusammenlaufen und keine kreisförmigen Moiré-Artefakte aufweisen."
      },
      {
        "label": "1 Pixel Rasterklarheit mit feinen Linien",
        "description": "Abwechselnde schwarze und weiße Linien sollten scharf erscheinen, ohne dass ein schlammiges Grau verschwimmt."
      },
      {
        "label": "Verschmierte Textränder",
        "description": "Überprüfen Sie kleine Textproben, um sicherzustellen, dass die Buchstaben ohne künstliche Schärfgeräusche scharf sind."
      }
    ],
    "canObserve": [
      "Kontrastreiche Darstellung feiner Details in verschiedenen Schriftgrößen",
      "Vorhandensein künstlicher weißer Konturhöfe und Kantenringbildung",
      "Radiale Speichenauflösung bei Siemens-Sternmustern"
    ],
    "cannotMeasure": [
      "MTF-Kurve (Modulation Transfer Function) der optischen Linse",
      "Subpixel-Aperturverhältnis des Panels",
      "Blendfreie matte Körnigkeit der Beschichtung"
    ],
    "interpretation": "Bei zu hoher Schärfe entstehen weiße Lichthöfe um Text und Linien, was zu visuellem Rauschen führt. Durch Verringern der OSD-Schärfe des Monitors auf Neutral werden saubere, natürliche Kanten wiederhergestellt.",
    "nextSteps": {
      "text": "Bewerten Sie die Glättung von Subpixel-Schriftarten und die ClearType-Wiedergabe.",
      "actionLabel": "Starten Sie den Textklarheitstest",
      "actionHref": "/tests/text-clarity-test"
    }
  },
  "compare-displays": {
    "overview": "Die Display-Vergleichs- und Rechner-Suite berechnet die Pixeldichte (PPI), optimale Betrachtungsabstände und Seitenverhältnisse und bietet Tools zur Bewertung paralleler Monitore.",
    "whatToLookFor": [
      {
        "label": "PPI- und PPD-Berechnungen",
        "description": "Vergleichen Sie Pixeldichte und Pixel pro Grad, um die wahre Schärfe zu bestimmen."
      },
      {
        "label": "Sehschärfegrenze",
        "description": "Prüfen Sie den Abstand, ab dem einzelne Pixel für das menschliche Auge („Retina“) nicht mehr wahrnehmbar sind."
      },
      {
        "label": "Seitenverhältnis",
        "description": "Vorschau der Wireframe-Boxen im Vergleich der Bildschirmformen 16:9, 16:10, 21:9 und 32:9."
      },
      {
        "label": "Dual-Screen-Matching",
        "description": "Bewerten Sie Farbe, Weißpunkt und Auflösungsparität zwischen mehreren Monitoren."
      }
    ],
    "canObserve": [
      "Mathematische PPI- und Netzhautentfernungsberechnungen basierend auf Benutzerabmessungen",
      "Interaktive Wireframe-Vorschauen mit Seitenverhältnissen und Dimensionsvergleiche",
      "Multi-Display-Spezifikations-Matching-Matrizen"
    ],
    "cannotMeasure": [
      "Delta-Unterschiede des Kolorimeters zwischen zwei separaten physischen Panels in Echtzeit",
      "Physische Fertigungstoleranzen der Lünette"
    ],
    "interpretation": "Displays mit mehr als 60 Pixeln pro Grad (PPD) erreichen bei normalem Betrachtungsabstand die Grenze der menschlichen Sehschärfe („Retina“) und machen einzelne Pixel unsichtbar.",
    "nextSteps": {
      "text": "Passen Sie Farbe und Weißpunkt zwischen zwei nebeneinander liegenden Monitoren an.",
      "actionLabel": "Starten Sie Dual Monitor Matcher",
      "actionHref": "/tools/dual-monitor-matcher"
    }
  },
  "display-info": {
    "overview": "Display Information Diagnostics fragt Webplattform- und Hardware-APIs ab, um GPU-Anbieter, WebGL-Renderer-Funktionen, HDR-Unterstützung, Farbtiefe und Bildschirmgeometrie zu überprüfen.",
    "whatToLookFor": [
      {
        "label": "GPU-Hardwaremodell und -Anbieter",
        "description": "Überprüfen Sie die von Ihrem System gemeldete nicht maskierte WebGL-Grafikkartenzeichenfolge."
      },
      {
        "label": "WebGL 1- und WebGL 2-Unterstützung",
        "description": "Stellen Sie sicher, dass die 3D-Canvas-Beschleunigung und moderne Shader-Profile aktiv sind."
      },
      {
        "label": "Breite Farbskala",
        "description": "Überprüfen Sie, ob Ihr Browser sRGB, Display-P3 oder Rec erkennt. Farbunterstützung 2020."
      },
      {
        "label": "Platzierung von Multi-Screen-Fenstern",
        "description": "Überprüfen Sie die Verfügbarkeit der Multi-Monitor-Placement-API für Multi-Display-Setups."
      }
    ],
    "canObserve": [
      "Systemfarbtiefe und Bits pro Pixel",
      "Abmessungen des Browserbildschirms und verfügbarer Arbeitsbereich",
      "WebGL entlarvte Renderer- und Anbieterzeichenfolgen",
      "Abfragefunktionen für CSS-Farbskala-Medien"
    ],
    "cannotMeasure": [
      "Interne GPU-Kerntakte und VRAM-Bandbreite",
      "Firmware-Version des physischen Monitors",
      "Physische Überarbeitung des HDMI/DisplayPort-Kabels"
    ],
    "interpretation": "Eine umfassende Hardwareerkennung bestätigt, ob die Hardwarebeschleunigung und moderne Webgrafikfunktionen in Ihrem Browser vollständig aktiviert sind.",
    "nextSteps": {
      "text": "Benchmark für 3D-WebGL-Rendering-Framestabilität und FPS.",
      "actionLabel": "Starten Sie den GPU-Benchmark-Test",
      "actionHref": "/tests/gpu-benchmark-test"
    }
  },
  "custom-pattern": {
    "overview": "Mit dem benutzerdefinierten Mustergenerator können Sie 12 Präzisionstestmuster konfigurieren – darunter 2D-Gitter, Schachbrettmuster, Linienraster und Moiré-Kreise –, um die Anzeigegeometrie und die optische Ausrichtung zu überprüfen.",
    "whatToLookFor": [
      {
        "label": "Geradheit der Gitterlinie",
        "description": "Überprüfen Sie die äußeren Grenzlinien auf tonnenförmige Verzerrungen oder Nadelkissen bei gekrümmten Displays."
      },
      {
        "label": "Schachbrettkontrast und Bloom",
        "description": "Überprüfen Sie, ob helle weiße Quadrate in angrenzende dunkle Quadrate übergehen."
      },
      {
        "label": "1 Pixel horizontale/vertikale Linien",
        "description": "Bestätigen Sie, dass feine Liniengitter mit gestochen scharfer 1:1-Pixel-Phasenverfolgung gerendert werden."
      },
      {
        "label": "Moiré-Interferenzringe",
        "description": "Suchen Sie nach kreisförmigen Aliasing-Ringen auf feinen konzentrischen Linienmustern."
      }
    ],
    "canObserve": [
      "Echtzeit-Rendering anpassbarer Liniendichten, Farben und Schachbrettgrößen",
      "Benutzerdefinierte Textwiedergabe für Serifen- und Sans-Serif-Stile",
      "Visuelle Fadenkreuzkonvergenz und Grenzausrichtung"
    ],
    "cannotMeasure": [
      "Externe optische Verzerrung durch Projektorobjektive oder Kameras",
      "Interner Video-Scaler-Taktjitter an analogen VGA-Eingängen",
      "Physische Ausrichtungstoleranzen des Gehäuserahmens"
    ],
    "interpretation": "Präzise geometrische Gitter offenbaren sofort Krümmungsverzerrungen, Skalierungsphasenprobleme und Kontrasteinschränkungen, die in natürlichen Bildern verborgen bleiben.",
    "nextSteps": {
      "text": "Lesen Sie unseren umfassenden Leitfaden zu Display-Inspektionsstandards.",
      "actionLabel": "Lesen Sie den Leitfaden zu Testmustern",
      "actionHref": "/knowledge-base/display-test-patterns-and-visual-inspection-standards"
    }
  },
  "multi-touch-test": {
    "overview": "Bei Multi-Touch-Tests werden die gleichzeitige Kontaktverfolgung, maximale Berührungspunktgrenzen und die Gestenregistrierung auf Laptops, Tablets und Telefonen mit Touchscreen bewertet.",
    "whatToLookFor": [
      {
        "label": "Maximale Anzahl an Berührungspunkten",
        "description": "Platzieren Sie 2, 5 oder 10 Finger auf dem Bildschirm, um zu überprüfen, wie viele gleichzeitige Punkte registriert werden."
      },
      {
        "label": "Individuelle Punktdrift/Jitter",
        "description": "Halten Sie die Finger ruhig und prüfen Sie, ob die gemeldeten Koordinaten stabil bleiben oder wackeln."
      },
      {
        "label": "Ghost Touch-Artefakte",
        "description": "Stellen Sie sicher, dass in Bereichen, in denen Sie das Glas nicht berühren, keine Phantomberührungen auftreten."
      },
      {
        "label": "Reibungsloses Multi-Finger-Tracking",
        "description": "Bewegen Sie mehrere Finger über den Bildschirm und überprüfen Sie, ob alle Trails aktualisiert werden, ohne dass Frames verloren gehen."
      }
    ],
    "canObserve": [
      "Gleichzeitige Anzahl aktiver Berührungspunkte und Identifikatoren",
      "Individuelle Berührungskoordinaten, Radius und Drehwinkel",
      "Reaktionsfähigkeit bei Gesteninteraktionen und Ereignisauslösungsraten"
    ],
    "cannotMeasure": [
      "Abtastrate des kapazitiven Hardware-Controllers in Hertz",
      "Schwellenwertalgorithmen für die Palm-Ablehnung in der Geräte-Firmware",
      "Elektromagnetische Digitalisierungsschichten für Stifte/Stifte"
    ],
    "interpretation": "Hochwertige, moderne Touchscreens unterstützen 5 bis 10 gleichzeitige Berührungen ohne Übersprech-Jitter oder Kontaktverluste.",
    "nextSteps": {
      "text": "Testen Sie die Single-Touch-Genauigkeit und die Randtotzonengrenzen.",
      "actionLabel": "Starten Sie den Touchscreen-Test",
      "actionHref": "/tests/touch-screen-test"
    }
  },
  "accelerometer-test": {
    "overview": "Die Beschleunigungsmesserdiagnose überprüft interne 3-Achsen-Bewegungssensoren (X-, Y-, Z-Beschleunigung) auf Mobilgeräten, Laptops und Tablets mithilfe der DeviceMotion-API.",
    "whatToLookFor": [
      {
        "label": "Schwerkraftvektorverfolgung",
        "description": "Stellen Sie sicher, dass die Z-Achse etwa 9,8 m/s² registriert, wenn das Gerät flach auf einem Tisch ruht."
      },
      {
        "label": "Neigungsempfindlichkeit in Echtzeit",
        "description": "Neigen Sie das Gerät nach vorne, hinten, links und rechts, um gleichmäßige Beschleunigungsänderungen zu beobachten."
      },
      {
        "label": "Sensor-Grundrauschen",
        "description": "Prüfen Sie, wie stabil die Messwerte bleiben, wenn das Gerät vollständig stillsteht."
      },
      {
        "label": "Reaktionsfähigkeit auf Bewegungen",
        "description": "Schütteln oder bewegen Sie das Gerät, um die sofortige Beschleunigungsreaktion zu bestätigen."
      }
    ],
    "canObserve": [
      "3-Achsen-Beschleunigung in Echtzeit einschließlich Schwerkraft („accelerationInclusionGravity.x/y/z“)",
      "Linearbeschleunigung ohne Schwerkraft (`acceleration.x/y/z`)",
      "Vom Browser gemeldete Sensoraktualisierungsrate in Hertz"
    ],
    "cannotMeasure": [
      "Physikalische MEMS-Siliziumfederkalibrierung",
      "Drift des Temperaturkoeffizienten innerhalb des Sensorpakets",
      "Direkte analoge Spannungspegel von der Sensorschaltung"
    ],
    "interpretation": "Ein flaches, stationäres Gerät sollte auf der Z-Achse etwa 9,81 m/s² und auf der X- und Y-Achse nahezu 0 m/s² registrieren. Übermäßige Schwankungen weisen auf Sensorrauschen hin.",
    "nextSteps": {
      "text": "Überprüfen Sie die Rotationsgeschwindigkeit und die Winkelausrichtung.",
      "actionLabel": "Starten Sie den Gyroskoptest",
      "actionHref": "/tests/gyroscope-test"
    }
  },
  "gyroscope-test": {
    "overview": "Der Gyroskop-Test prüft die Erkennung der Winkelgeschwindigkeit (Rotationsgeschwindigkeit in rad/s oder deg/s) und die Drehachsen Ihres Geräts.",
    "whatToLookFor": [
      {
        "label": "Nullpunktdrift im Ruhezustand",
        "description": "Wenn das Gerät ruhig liegt, sollten alle Rotationsachsen Werte nahe Null anzeigen."
      },
      {
        "label": "Erkennung der Drehrichtung",
        "description": "Prüfen Sie, ob Neige- und Drehbewegungen ohne spürbare Verzögerung registriert werden."
      }
    ],
    "canObserve": [
      "Echtzeit-Winkelgeschwindigkeit für Nick-, Roll- und Gierachsen",
      "Sensorreaktionszeit",
      "Stabilität bei Bewegung"
    ],
    "cannotMeasure": [
      "Absolute Ausrichtung ohne Magnetometer",
      "Langzeitdrift bei Temperaturschwankungen"
    ],
    "interpretation": "Stabile Werte im Ruhezustand und sofortiges Ansprechen auf Drehungen bestätigen die einwandfreie Funktion.",
    "nextSteps": {
      "text": "Möchten Sie auch den Beschleunigungssensor testen?",
      "actionLabel": "Beschleunigungssensor-Test starten",
      "actionHref": "/tests/accelerometer-test"
    }
  },
  "vibration-test": {
    "overview": "Bei Vibrationstests werden haptische Feedback-Motoren und Vibrationsaktoren auf Mobilgeräten mithilfe der Web Vibration API überprüft.",
    "whatToLookFor": [
      {
        "label": "Haptische Pulsschärfe",
        "description": "Spüren Sie, ob die Vibration knackig beginnt und stoppt, ohne dass ein anhaltendes Summen auftritt."
      },
      {
        "label": "Anhaltende motorische Intensität",
        "description": "Stellen Sie sicher, dass die Vibrationskraft bei kontinuierlichen Vibrationsimpulsen konstant bleibt."
      },
      {
        "label": "Genauigkeit rhythmischer Muster",
        "description": "Hören und spüren Sie unterschiedliche Rhythmuskadenzen während der SOS- oder benutzerdefinierten Musterwiedergabe."
      },
      {
        "label": "Chassis-Resonanz",
        "description": "Überprüfen Sie, ob die Vibration ein übermäßiges mechanisches Klappern der Gerätetasten verursacht."
      }
    ],
    "canObserve": [
      "Ausführung von Einzelpuls- und rhythmischen Vibrationsmuster-Arrays",
      "Unterstützung der Browser Web Vibration API-Funktion („navigator.vibrate“)",
      "Vom Benutzer ausgelöste haptische taktile Reaktionen"
    ],
    "cannotMeasure": [
      "Physikalische G-Kraftbeschleunigung des Aktuators",
      "ERM-Motorarchitektur (Exzentrische rotierende Masse) vs. LRA-Motorarchitektur (Linearresonanzantrieb).",
      "Akustische Geräuschemission in Dezibel"
    ],
    "interpretation": "Klare, deutliche haptische Impulse bestätigen, dass der Vibrationsmotor des Geräts und die Betriebssystemberechtigungen ordnungsgemäß funktionieren.",
    "nextSteps": {
      "text": "Überprüfen Sie die Reaktionsfähigkeit und Genauigkeit des Touchscreens des Geräts.",
      "actionLabel": "Starten Sie den Touchscreen-Test",
      "actionHref": "/tests/touch-screen-test"
    }
  },
  "webcam-test": {
    "overview": "Die Webcam-Diagnose bewertet die Videoaufnahmeauflösung, Bildrate, Fokus, Belichtung und Farbgenauigkeit aller integrierten und USB-Webkameras.",
    "whatToLookFor": [
      {
        "label": "Optische Schärfe und Fokus",
        "description": "Überprüfen Sie feine Text- und Gesichtsdetails für einen klaren Fokus ohne digitale Unschärfe."
      },
      {
        "label": "Automatische Belichtungsjagd",
        "description": "Überprüfen Sie, ob die Helligkeit kontinuierlich ansteigt oder konstant bleibt, wenn sich die Beleuchtung ändert."
      },
      {
        "label": "Sensorrauschen bei schwachem Licht",
        "description": "Beobachten Sie, ob in dunklen Bereichen starke Farbkörner oder Mückengeräusche auftreten."
      },
      {
        "label": "Farbbalance und Hauttöne",
        "description": "Stellen Sie sicher, dass der Weißabgleich natürlich und nicht gelblich oder kränklich blau aussieht."
      }
    ],
    "canObserve": [
      "Auflösung und Seitenverhältnis des Videostreams in Echtzeit",
      "Auswahl und Wechsel des Kamerageräts",
      "Erfassen und Vorschau von Canvas-Schnappschüssen"
    ],
    "cannotMeasure": [
      "Physikalische Pixelgröße des CMOS-Bildsensors in Mikrometern",
      "Hardware-ISP-Algorithmen zur Korrektur der Objektivverzerrung",
      "Signal-Rausch-Verhältnis (SNR) in Dezibel"
    ],
    "interpretation": "Hohe Bildraten und eine scharfe, rauschfreie Aufnahme weisen auf eine ausreichende Umgebungsbeleuchtung und die richtige Konfiguration des Kameratreibers hin.",
    "nextSteps": {
      "text": "Testen Sie den Mikrofoneingangspegel und die Audioklarheit.",
      "actionLabel": "Starten Sie den Mikrofontest",
      "actionHref": "/tests/microphone-test"
    }
  },
  "speaker-test": {
    "overview": "Lautsprechertests überprüfen die Trennung des linken und rechten Stereokanals, den Frequenzgang, die Phasenausrichtung und die Wiedergabebalance des Audiotreibers.",
    "whatToLookFor": [
      {
        "label": "Isolierung des linken Kanals",
        "description": "Stellen Sie sicher, dass der Ton ausschließlich über den linken physischen Lautsprecher wiedergegeben wird."
      },
      {
        "label": "Isolierung des rechten Kanals",
        "description": "Stellen Sie sicher, dass der Ton ausschließlich über den richtigen physischen Lautsprecher wiedergegeben wird."
      },
      {
        "label": "Stereo-Center-Bildgebung",
        "description": "Wenn beide Lautsprecher gleichzeitig spielen, sollte die Illusion eines Klangs entstehen, der aus der Mitte kommt."
      },
      {
        "label": "Rasseln oder Verzerrung",
        "description": "Achten Sie beim Frequenzdurchlauf auf Brummen, Clipping oder Gehäusevibrationen."
      }
    ],
    "canObserve": [
      "Unabhängige Wiedergabe synthetisierter Töne links, rechts und in der Mitte",
      "Web-Audio-API-Stereo-Panner-Routing und Lautstärkeverstärkung",
      "Frequenz-Sweep-Tonerzeugung von 20 Hz bis 20.000 Hz"
    ],
    "cannotMeasure": [
      "Akustische Frequenzgangkurve in dB SPL ohne externes kalibriertes Mikrofon",
      "Prozentsatz der gesamten harmonischen Verzerrung (THD).",
      "Temperatur und Impedanz der Lautsprecher-Schwingspule"
    ],
    "interpretation": "Während des Kanaltests sollte der Ton ausschließlich über den vorgesehenen Lautsprecher ausgegeben werden. Wenn Ton zum gegenüberliegenden Lautsprecher gelangt, deutet dies auf ein Mono-Downmixing hin.",
    "nextSteps": {
      "text": "Überprüfen Sie die Latenz der Video- und Audiosynchronisierung.",
      "actionLabel": "Starten Sie den Audio-Synchronisierungstest",
      "actionHref": "/tests/audio-sync-test"
    }
  },
  "microphone-test": {
    "overview": "Beim Mikrofontest werden Audioeingangspegel, Hintergrundgeräusche, Frequenzgang und Mikrofonempfindlichkeit mithilfe der Web-Audio-API bewertet.",
    "whatToLookFor": [
      {
        "label": "VU-Meter-Aktivität",
        "description": "Sprechen Sie in das Mikrofon und vergewissern Sie sich, dass der Lautstärkemesser dynamisch reagiert."
      },
      {
        "label": "Hintergrundgeräuschpegel",
        "description": "Wenn Sie stumm bleiben, sollte die Lautstärkeanzeige auf nahezu Null sinken."
      },
      {
        "label": "Clipping/Peaking",
        "description": "Lautes Sprechen sollte das Messgerät nicht dauerhaft auf Rot übersteuern lassen."
      },
      {
        "label": "Frequenzspektrumbereich",
        "description": "Beobachten Sie, ob tiefe, mittlere und hohe Sprachfrequenzen auf dem Visualizer registriert werden."
      }
    ],
    "canObserve": [
      "Echtzeit-Audio-Wellenform- und Frequenzspektrum-Visualizer",
      "Spitzenlautstärke-Eingangspegel und Dezibel-Grenzwerte",
      "Auswahl des Mikrofon-Hardwaregeräts und Berechtigungsstatus"
    ],
    "cannotMeasure": [
      "Akustische Frequenzgangkurve der Kapsel in Hertz",
      "Absoluter Schalldruckpegel (dBA)",
      "Eigenrauschen der analogen Vorverstärkerschaltung"
    ],
    "interpretation": "Deutliche Wellenformspitzen während des Sprechens und eine ruhige Grundlinie während der Stille bestätigen eine gesunde Mikrofonempfindlichkeit und die richtigen Verstärkungseinstellungen.",
    "nextSteps": {
      "text": "Überprüfen Sie die Kanaltrennung und Ausgangsbalance der Stereolautsprecher.",
      "actionLabel": "Lautsprechertest starten",
      "actionHref": "/tests/speaker-test"
    }
  },
  "reaction-time-test": {
    "overview": "Beim Testen der Reaktionszeit wird die Latenz menschlicher visueller Reflexe in Kombination mit Verzögerungen bei der Anzeigeeingabe und Verzögerungen bei der Verarbeitung von Browserereignissen gemessen.",
    "whatToLookFor": [
      {
        "label": "Sofortige visuelle Zustandsänderung",
        "description": "Konzentrieren Sie sich aufmerksam auf das Zielfeld, während es von „Warterot“ zu „Auslösergrün“ wechselt."
      },
      {
        "label": "Klicken Sie auf Reaktionszeitpunkt",
        "description": "Klicken oder tippen Sie so schnell wie möglich, sobald Grün erscheint."
      },
      {
        "label": "Fehlstarterkennung",
        "description": "Wenn Sie zu früh klicken, wird eine Warnung ausgelöst und die Testversion zurückgesetzt."
      },
      {
        "label": "Latenzverteilung",
        "description": "Führen Sie 5 Versuche durch, um Ihre durchschnittliche Reaktionsgeschwindigkeit und Konstanz zu beobachten."
      }
    ],
    "canObserve": [
      "Millisekunden-Latenz vom visuellen Zustandsübergang bis zum Zeiger-/Tastatur-Ereignisauslöser",
      "Statistischer Durchschnitt, Median und Varianz über mehrere aufeinanderfolgende Versuche",
      "Verstöße gegen die falsche Startzeit"
    ],
    "cannotMeasure": [
      "Isolierte menschliche neuronale synaptische Übertragungszeit, unabhängig von der Verzögerung der Anzeigeeingabe und der USB-Abfragelatenz der Maus",
      "Verzögerung der internen Frame-Verarbeitung des Anzeigefelds isoliert"
    ],
    "interpretation": "Typische visuelle menschliche Reaktionszeiten liegen zwischen 200 ms und 260 ms. Die insgesamt gemessene Zeit umfasst die Verzögerung der Monitoraktualisierung und die Latenz der Peripherieeingabe.",
    "nextSteps": {
      "text": "Bewerten Sie Input-Lag- und Click-to-Photon-Latenzfaktoren.",
      "actionLabel": "Starten Sie den Input-Lag-Test",
      "actionHref": "/tests/input-lag-test"
    }
  },
  "pixel-inversion-test": {
    "overview": "Die Pixelinversion (Interlace-Flimmern) testet, wie gut die VCOM-Spannung des Monitors die Flüssigkristallpolarität ausgleicht und so sichtbares Flimmern und Pixelübersprechen verhindert.",
    "whatToLookFor": [
      {
        "label": "Flackernde Musterblöcke",
        "description": "Suchen Sie nach Patches, die summen, flackern oder vibrieren, während andere Patches statisch bleiben."
      },
      {
        "label": "Solide graue Stabilität",
        "description": "Muster sollten als ruhige, gleichmäßige graue Blöcke ohne pulsierende Intensität erscheinen."
      },
      {
        "label": "Pixelinversionsübersprechen",
        "description": "Überprüfen Sie, ob sich bewegende Linien auf gestreiften Hintergründen zu vertikalen oder horizontalen Geisterbändern führen."
      },
      {
        "label": "Farbtönung bei Inversion",
        "description": "Beobachten Sie, ob feine Wechselmuster einen grünen oder violetten Farbstich annehmen."
      }
    ],
    "canObserve": [
      "Visuelles Flackern auf kalibrierten Subpixel-Schachbrettmustern und Punktinversionsmustern",
      "Stabilität der VCOM-Spannungsbalance über 6 standardisierte Inversionstestmuster",
      "Subpixel-Übersprechen bei hochfrequenter elektrischer Polaritätsumschaltung"
    ],
    "cannotMeasure": [
      "Interne VCOM-Vorspannung des LCD-Panels in Millivolt",
      "Mikroströme zum Umschalten der Polarität von Flüssigkristallen",
      "Timing-Register des Hardware-Panel-Treibers"
    ],
    "interpretation": "Wenn ein Muster merklich flackert, weist Ihr Display ein leichtes VCOM-Spannungsungleichgewicht auf, das bei preisgünstigen Gaming-Panels mit hoher Bildwiederholfrequenz häufig vorkommt.",
    "nextSteps": {
      "text": "Testen Sie Helligkeitsschwankungen mit variabler Bildwiederholfrequenz.",
      "actionLabel": "Starten Sie den VRR-Flimmertest",
      "actionHref": "/tests/vrr-flicker-test"
    }
  },
  "oled-abl-test": {
  "overview": "Auto-Brightness Limiter (ABL) is an essential protection mechanism built into OLED, QD-OLED, and Mini-LED displays. Because driving organic subpixels or high-density backlight zones at maximum luminance across the entire screen consumes excessive power and causes rapid thermal buildup, display controllers automatically attenuate brightness as the Average Picture Level (APL) increases.",
  "whatToLookFor": [
    {
      "label": "Luminance Step-Down Across Window Sizes",
      "description": "Observe the drop in white brightness as you transition from a small 2% or 10% window to a large 50% or 100% full-field window."
    },
    {
      "label": "Uniform Brightness OSD Mode Validation",
      "description": "If your monitor has a 'Uniform Brightness' or 'ABL Off' setting in its OSD, verify whether full-screen brightness remains flat across all window percentages."
    },
    {
      "label": "Thermal Sustained Throttling (ASBL)",
      "description": "Static bright windows may trigger Auto-Static Brightness Limiting (ASBL) after 30 to 90 seconds. Watch for secondary dimming over time."
    },
    {
      "label": "Distortion of Gray Gamma",
      "description": "Check if near-black shadows clip or elevate when large white windows are displayed simultaneously."
    }
  ],
  "canObserve": [
    "Visual step-down in peak white luminance across calibrated 1%, 2%, 5%, 10%, 25%, 50%, and 100% window sizes",
    "Verification of monitor OSD Uniform Brightness toggle effectiveness",
    "Sustained brightness decay over time using the built-in interval timer"
  ],
  "cannotMeasure": [
    "Absolute physical candela per square meter (nits) without an external hardware photometer",
    "Panel power supply rail wattage consumption",
    "Micro-temperature of OLED emitter layers in degrees Celsius"
  ],
  "interpretation": "Significant dimming from a 10% window to 100% full screen is normal behavior for OLED and QD-OLED panels. Enabling Uniform Brightness in your monitor's OSD stabilizes luminance at the full-screen ceiling.",
  "nextSteps": {
    "text": "Evaluate pixel longevity and panel burn-in risks for your OLED display.",
    "actionLabel": "Launch OLED Burn-In Calculator",
    "actionHref": "/tools/oled-burn-in-calculator"
  }
},
  "new-monitor-wizard": {
  "overview": "The 5-Minute New Monitor Acceptance Wizard is a structured, sequential diagnostic designed for inspecting brand-new or used monitors upon arrival. It steps through the five critical hardware failure points—dead pixels, backlight bleed/IPS glow, panel uniformity, text clarity, and refresh rate pacing—to help you determine whether to accept the unit or file for a return within your retailer's warranty window.",
  "whatToLookFor": [
    {
      "label": "Primary Color Subpixel Defects",
      "description": "Look for static dark pinpricks on pure red, green, blue, and white, or lit colored specks on pitch black."
    },
    {
      "label": "Backlight Bleed vs Off-Angle IPS Glow",
      "description": "Inspect corners in a dark room. Backlight bleed remains stationary when shifting your head; IPS glow angle-shifts."
    },
    {
      "label": "50% Neutral Gray Uniformity",
      "description": "Scan for Dirty Screen Effect (DSE), vertical banding lines, or dark corner vignetting."
    },
    {
      "label": "Text Edge Color Halos",
      "description": "Inspect letter stems on high-contrast text for chromatic green or magenta fringing under Windows ClearType."
    }
  ],
  "canObserve": [
    "Sequential visual isolation of subpixel, backlight, and panel uniformity defects",
    "Pass/Fail logging for each quality checkpoint",
    "Generation of an overall Panel Acceptance Grade for retailer return claims"
  ],
  "cannotMeasure": [
    "Internal panel hours counter without manufacturer service menu access",
    "Long-term backlight aging or solder joint degradation",
    "Automated optical defect classification without user visual inspection"
  ],
  "interpretation": "A score of A+ or A indicates an excellent panel well within standard ISO 9241-307 Class 1 tolerances. Scores of B or C with multiple dead pixels or severe bleed warrant an immediate return or exchange.",
  "nextSteps": {
    "text": "Export a complete documentation certificate with serial numbers and timestamp.",
    "actionLabel": "Generate Display Certificate",
    "actionHref": "/tools/display-certificate"
  }
},
  "color-temperature-test": {
  "overview": "Color temperature measures the spectral chromaticity of white light emitted by your display, expressed in Kelvin (K). The worldwide broadcast and digital imaging standard is CIE Illuminant D65 (approximately 6500K), which mimics average noon daylight. Displays calibrated too warm (5000K) appear yellow or orange, while displays calibrated too cool (9300K) exhibit an unnatural blue tint.",
  "whatToLookFor": [
    {
      "label": "D65 Neutral Reference Comparison",
      "description": "Compare your monitor's current white output against the D65 daylight standard swatch to identify warmth or coolness."
    },
    {
      "label": "Green vs Magenta Color Cast",
      "description": "Evaluate whether white and neutral gray patches have an unwanted greenish or purplish tint."
    },
    {
      "label": "Grayscale Step Neutrality",
      "description": "Examine the grayscale ramp from 10% to 90% luminance to ensure neutral gray does not shift hue across brightness steps."
    },
    {
      "label": "OSD Preset Validation",
      "description": "Switch your monitor OSD between Warm, Normal, Cool, and sRGB modes to determine which preset is closest to D65."
    }
  ],
  "canObserve": [
    "Visual color cast differences between 5000K (D50), 5500K, 6500K (D65), 7500K, and 9300K targets",
    "Evaluation of grayscale neutrality and color tracking consistency across luminance levels",
    "Green/Magenta tint offset comparison"
  ],
  "cannotMeasure": [
    "Exact correlated color temperature (CCT) in Kelvin without an optical colorimeter",
    "Spectral power distribution (SPD) across individual nanometer wavelengths",
    "Delta E (dE2000) absolute color difference metrics"
  ],
  "interpretation": "For accurate photo editing, web design, and video viewing, D65 (6500K) is the universal target. Switching your monitor OSD color temperature to 'Warm' or 'sRGB' usually brings it much closer to creator intent.",
  "nextSteps": {
    "text": "Calibrate your monitor's physical OSD contrast, brightness, and RGB gain channels.",
    "actionLabel": "Launch OSD Calibration Guide",
    "actionHref": "/tools/osd-calibration-guide"
  }
},
  "temporal-dithering-test": {
  "overview": "Temporal dithering (often combined with Frame Rate Control or FRC) is a technique where LCD, OLED, and GPU controllers rapidly alternate adjacent pixel colors or flicker pixels between consecutive refresh frames to simulate intermediate color shades on lower bit-depth panels. For photosensitive users, this micro-flicker can cause severe eye strain, migraines, and nausea.",
  "whatToLookFor": [
    {
      "label": "High-Frequency Shimmer on Micro-Grids",
      "description": "Look at the 1x1 checkerboard pattern. If temporal dithering or VCOM flicker is present, the static pattern will appear to crawl or shimmer."
    },
    {
      "label": "Smartphone Slow-Motion Camera Detection",
      "description": "Point a smartphone camera at the display recording at 120fps or 240fps. Rapidly pulsating pixel clusters indicate active temporal dithering."
    },
    {
      "label": "Intermediate Dither Step Pulsing",
      "description": "Inspect the 8-bit micro-step pattern (values 127 vs 128) for subtle luminance modulation."
    },
    {
      "label": "Phase Inversion Sensitivity",
      "description": "Observe whether toggling polarity causes visible flashing or visual relief."
    }
  ],
  "canObserve": [
    "Microscopic visual shimmer and crawl on 1x1 and 2x2 subpixel checkerboard grids",
    "High-contrast moire excitation under camera slow-motion video",
    "Identification of panels with aggressive FRC temporal pulsing"
  ],
  "cannotMeasure": [
    "Internal T-CON bit-depth truncation algorithms",
    "Exact hardware FRC temporal alternation frequency in Hertz",
    "Distinction between GPU temporal dithering and panel-level scalar FRC"
  ],
  "interpretation": "If a 1x1 checkerboard appears perfectly solid, still, and calm, your display is likely a true native bit-depth panel (true 8-bit or 10-bit). If it crawls or flickers, temporal dithering or VCOM imbalance is active.",
  "nextSteps": {
    "text": "Test your monitor for pulse-width modulation (PWM) backlight flicker.",
    "actionLabel": "Launch PWM Flicker Test",
    "actionHref": "/tests/pwm-flicker-test"
  }
},
  "hdr-peak-brightness-test": {
  "overview": "High Dynamic Range (HDR) displays must reproduce specular highlights up to hundreds or thousands of nits while preserving subtle gradations in bright clouds, explosions, and light reflections. When a display receives an HDR signal brighter than its hardware panel capability, its tone-mapping algorithm must decide whether to softly roll off highlights or hard-clip them into pure flat white.",
  "whatToLookFor": [
    {
      "label": "Highlight Step Separation",
      "description": "Check whether the inner stepped square remains clearly distinguishable from the outer target block at each luminance tier."
    },
    {
      "label": "Hard Clipping Threshold",
      "description": "Identify the tier (e.g. 600, 1000, or 1400 nits) where the inner square completely blends into the outer block, revealing your panel's clipping ceiling."
    },
    {
      "label": "SDR vs HDR Tone Mapping",
      "description": "Verify that Windows HDR or macOS HDR is active, ensuring true wide dynamic range rendering."
    },
    {
      "label": "Chromaticity Shift in Highlights",
      "description": "Watch for color shifts toward cyan, yellow, or blue when extreme highlights reach panel saturation."
    }
  ],
  "canObserve": [
    "Visual verification of highlight separation across 100 to 4,000 nits PQ targets",
    "Identification of the exact nit ceiling where your display clips highlight gradations",
    "Evaluation of HDR tone mapping curve aggressiveness"
  ],
  "cannotMeasure": [
    "Actual physical photon output in candela/m² without a spectrophotometer",
    "Full-screen sustained vs 10% peak nit differentials",
    "Dynamic metadata processing (HDR10+ or Dolby Vision frame-by-frame RPU curves)"
  ],
  "interpretation": "Knowing your clipping point allows you to calibrate the peak brightness slider in Windows HDR Calibration and video games accurately to prevent blown-out highlights.",
  "nextSteps": {
    "text": "Check your display's color gamut coverage across DCI-P3 and Rec.2020.",
    "actionLabel": "Launch Color Gamut Test",
    "actionHref": "/tests/color-gamut-test"
  }
},
  "audio-latency-test": {
  "overview": "Audio-visual synchronization and low-latency audio processing are critical for gaming, music production, and interactive media. The browser's Web Audio API interfaces directly with your operating system's audio kernel and sound card driver. This diagnostic measures real-time hardware buffer latency, base kernel latency, and audio sample rate to expose audio lag bottlenecks.",
  "whatToLookFor": [
    {
      "label": "Kernel Base vs Driver Output Latency",
      "description": "Observe the breakdown between kernel processing delay and hardware driver buffer latency."
    },
    {
      "label": "Hardware Sample Rate Support",
      "description": "Confirm whether your audio interface is operating at standard 44.1 kHz, 48 kHz, or 96/192 kHz studio rates."
    },
    {
      "label": "Click-to-Sound Actuation Delay",
      "description": "Click the central sound orb to test immediate auditory response and identify perceptible lag."
    },
    {
      "label": "Bluetooth vs Wired Latency",
      "description": "Compare your wired speakers or headphones against Bluetooth devices, which typically introduce 100ms to 250ms of wireless buffer latency."
    }
  ],
  "canObserve": [
    "Real-time Web Audio API hardware buffer metrics and sample rate queries",
    "Kernel base latency and estimated driver buffer round-trip delay",
    "Interactive instantaneous auditory pulse generation"
  ],
  "cannotMeasure": [
    "Physical speaker cone acoustic transit time through room air",
    "Analog digital-to-analog converter (DAC) internal op-amp slew rate",
    "Microphone input round-trip loopback latency without an external audio loop cable"
  ],
  "interpretation": "Wired USB DACs and PCIe sound cards typically achieve low buffer latencies of 5ms to 15ms, ideal for gaming. Bluetooth audio devices often suffer from 120ms to 200ms of lag unless utilizing low-latency codecs.",
  "nextSteps": {
    "text": "Calibrate audio and video synchronization for video playback.",
    "actionLabel": "Launch Audio Sync Test",
    "actionHref": "/tests/audio-sync-test"
  }
},
  "eink-refresh-tool": {
  "overview": "Electronic Paper Displays (EPDs), commonly known as E-Ink, operate by physically moving charged black and white pigment microcapsules suspended in a clear micro-fluid using electric field voltages. Over time, particles suffer from mechanical hysteresis and voltage retention, causing visible residual text and shadow outlines known as ghosting. This tool executes calibrated full-field inversion waveforms to restore microcapsule polarity.",
  "whatToLookFor": [
    {
      "label": "Residual Text & Shadow Purging",
      "description": "Observe whether lingering text outlines, icons, or PDF page ghosts disappear after running a refresh cycle."
    },
    {
      "label": "Waveform Mode Differences",
      "description": "Deep Purge runs an 8-phase multi-tone cycle for stubborn ghosting, while Regal and A2 offer faster, lighter cleanses."
    },
    {
      "label": "Microcapsule Contrast Restoration",
      "description": "Check if the background white field becomes crisper and black text gains higher optical contrast after refreshing."
    },
    {
      "label": "Border and Edge Ghosting",
      "description": "Inspect screen edges where ghosting tends to accumulate most heavily due to weaker edge electric fields."
    }
  ],
  "canObserve": [
    "Execution of high-contrast full-field polarity inversion sequences",
    "Comparison between multi-phase Deep Purge, Regal, and A2 waveform timings",
    "Visual clearing of electronic ink residual shadows and pigment retention"
  ],
  "cannotMeasure": [
    "Microcapsule physical fluid viscosity or electrophoresis velocity",
    "Manufacturer proprietary hardware waveform lookup tables (LUTs) in e-paper T-CON flash",
    "Physical e-paper frontlight color temperature and uniformity"
  ],
  "interpretation": "Running a Deep Purge cycle every 15–30 minutes during heavy e-ink monitor use keeps text crisp and prevents irreversible microcapsule charge polarization.",
  "nextSteps": {
    "text": "Test your display's text rendering and subpixel font clarity.",
    "actionLabel": "Launch Text Clarity Test",
    "actionHref": "/tests/text-clarity-test"
  }
},
};
