import { TroubleshootingTopic } from "./types";

export const DE_TROUBLESHOOTING_TOPICS: TroubleshootingTopic[] = [
  {
    "id": "no-image",
    "title": "Kein Bild (schwarzer / leerer Bildschirm)",
    "category": "display",
    "categoryTitle": "Bildschirm-Probleme",
    "symptom": "Die Monitor-Betriebs-LED leuchtet möglicherweise, das Panel bleibt jedoch pechschwarz ohne Bild, Desktopsymbole oder Hintergrundbeleuchtung.",
    "possibleCauses": [
      "Stromkabel des Monitors oder externes Netzteil nicht angeschlossen oder locker",
      "Monitor auf falsche Eingangsquelle eingestellt (z. B. HDMI 2 statt DisplayPort 1)",
      "Loses, ungesichertes oder beschädigtes Videokabel zwischen GPU und Monitor",
      "Quellgerät im tiefen Energiesparmodus, Ruhezustand oder GPU-Treiberabsturz",
      "Nicht unterstützte Kombination aus Auflösung und Bildwiederholfrequenz beim Systemstart",
      "Defekt an Hintergrundbeleuchtungs-Inverter, Stromversorgungsplatine oder T-Con-Logikboard"
    ],
    "checks": [
      "Monitor-LED prüfen: Aus (kein Strom), bernsteinfarben/orange (Standby) oder weiß/blau (aktiv)?",
      "Physische OSD-Menütasten am Monitorgehäuse drücken: Erscheint das Herstellermenü? (Wenn ja, funktionieren Panel und Beleuchtung; der Fehler liegt an Quelle oder Kabel)",
      "Beide Enden des DisplayPort- oder HDMI-Kabels fest in GPU und Monitor einstecken",
      "Sicherstellen, dass das Kabel direkt in der dedizierten Grafikkarte (GPU) steckt, nicht am Mainboard (außer bei APU/iGPU)",
      "Mit einem anderen geprüften Videokabel oder an einem anderen Videoanschluss testen"
    ],
    "whatScreenTesterCanTest": {
      "description": "Sobald das Bild wiederhergestellt ist, kann Screen Tester die Signalstabilität prüfen und kontinuierliche Testmuster rendern.",
      "links": [
        {
          "label": "Display-Informationen",
          "testId": "display-info",
          "testPath": "/tests/display-info"
        },
        {
          "label": "Auflösungs-Checker",
          "testId": "resolution-checker",
          "testPath": "/tests/resolution-checker"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Physische Netzspannung oder Ausgangsspannung des Netzteils",
      "Mainboard-PCIe-Slot-Handshake oder GPU-Stromversorgungsschienenfehler",
      "Elektrische Kontinuität der Inverter-Schaltung oder LED-Streifen"
    ],
    "actions": [
      "Monitor neu starten: Netzkabel 30 Sekunden abziehen, Einschalttaste 10 Sekunden gedrückt halten, wieder anschließen",
      "Windows-Tastenkombination Win + Strg + Umschalt + B drücken, um das Grafiktreiber-Subsystem neu zu starten",
      "Im abgesicherten Modus oder UEFI-BIOS starten, um ein Basissignal mit 1024x768 bei 60 Hz zu erzwingen",
      "Den Monitor mit einer zweiten Videoquelle (z. B. Konsole, Laptop) testen, um die Fehlerquelle einzugrenzen"
    ],
    "whenToStop": "Brechen Sie die Fehlersuche ab, wenn Sie Brandgeruch bemerken, hochfrequentes Pfeifen hören oder das OSD bei getrennten Videokabeln nicht erscheint."
  },
  {
    "id": "no-signal",
    "title": "Kein Signal / Kabel nicht angeschlossen",
    "category": "display",
    "categoryTitle": "Bildschirm-Probleme",
    "symptom": "Der Monitor schaltet sich ein und zeigt Meldungen wie 'Kein Signal', 'Signalkabel prüfen' oder wechselt sofort in den Standby-Modus.",
    "possibleCauses": [
      "Falscher physischer Eingangsanschluss im Monitor-OSD ausgewählt",
      "Bandbreite des Videokabels überschritten oder verbogene Pins (z. B. DisplayPort-Pins oder lockerer HDMI-Stecker)",
      "USB-C / Thunderbolt-Dock, KVM-Switch oder Adapter scheitert beim Handshake",
      "Betriebssystem gibt eine nicht unterstützte Pixeltaktung, Bildwiederholfrequenz oder Auflösung aus",
      "GPU-Treiber deaktiviert oder stürzt bei der Display-Initialisierung ab"
    ],
    "checks": [
      "OSD-Eingangsquelle manuell von 'Auto' auf den tatsächlich belegten Anschluss umstellen",
      "Videokabel auf beiden Seiten abziehen und auf verbogene Pins oder Verunreinigungen prüfen",
      "Dockingstationen oder Adapter umgehen und GPU direkt mit dem Monitor verbinden",
      "Anderen DisplayPort- oder HDMI-Ausgang an der Grafikkarte ausprobieren"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester überprüft die vom Browser gemeldete Hardware-Pipeline, Bildwiederholfrequenzen und Auflösungs-Metadaten.",
      "links": [
        {
          "label": "Display-Informationen",
          "testId": "display-info",
          "testPath": "/tests/display-info"
        },
        {
          "label": "Bildwiederholfrequenz-Test",
          "testId": "refresh-rate-test",
          "testPath": "/tests/refresh-rate-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Hardware-Signalintegrität oder Kabeldämpfung auf physikalischer Ebene",
      "HDCP-Kryptografie-Handshake-Blockaden auf Firmware-Ebene",
      "Mechanische Beschädigung interner GPU-Anschlussbuchsen"
    ],
    "actions": [
      "HDMI-/DisplayPort-Kabel durch ein zertifiziertes Kabel (HDMI 2.1 Ultra High Speed oder DP 1.4/2.1 VESA) ersetzen",
      "Grafiktreiber mit DDU (Display Driver Uninstaller) im abgesicherten Modus sauber deinstallieren und neu installieren",
      "Monitor auf Werkseinstellungen im OSD-Menü zurücksetzen",
      "Firmware des Monitors und der GPU aktualisieren"
    ],
    "whenToStop": "Brechen Sie ab, wenn mehrere zertifizierte Kabel und mehrere Quellgeräte an keinem Eingang ein Signal liefern (T-Con- oder Hauptplatinendefekt)."
  },
  {
    "id": "wrong-resolution",
    "title": "Falsche Auflösung / Verzerrte / Mit Balken versehene Darstellung",
    "category": "display",
    "categoryTitle": "Bildschirm-Probleme",
    "symptom": "Desktop wirkt unscharf, gestreckt, gestaucht oder weist schwarze Trauerränder (Pillarbox/Letterbox) auf.",
    "possibleCauses": [
      "Betriebssystem auf nicht-native Auflösung eingestellt",
      "GPU-Skalierung auf 'Seitenverhältnis beibehalten' oder 'Zentriert' statt 'Vollbild' konfiguriert",
      "Falsches Seitenverhältnis im OSD des Monitors erzwungen (z. B. 4:3 auf 16:9 Panel)",
      "Minderwertiges HDMI-Kabel begrenzt Bandbreite auf 1080p statt 4K",
      "Veralteter oder generischer Windows-Displaytreiber installiert"
    ],
    "checks": [
      "Native Panelauflösung in den technischen Daten des Monitors ermitteln",
      "Windows-Anzeigeeinstellungen öffnen und prüfen, ob die als '(Empfohlen)' markierte Auflösung aktiv ist",
      "Im OSD-Menü des Monitors die Bildskalierung auf '1:1' oder 'Auto' stellen",
      "In der NVIDIA-Systemsteuerung oder AMD Software die Skalierungseinstellungen prüfen"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester visualisiert pixelgenaue Testgitter und Kreisstrukturen, um Seitenverhältnisverzerrungen und Skalierungsartefakte sofort aufzudecken.",
      "links": [
        {
          "label": "Auflösungs-Checker",
          "testId": "resolution-checker",
          "testPath": "/tests/resolution-checker"
        },
        {
          "label": "Skalierungs- & Format-Test",
          "testId": "scaling-aspect-test",
          "testPath": "/tests/scaling-aspect-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Interne Skalierungsalgorithmen des Monitors im Vergleich zur GPU-Skalierung",
      "Fehlerhafte EDID-EEPROM-Datenbausteine im Display"
    ],
    "actions": [
      "In den Anzeigeeinstellungen die native Monitorauflösung auswählen",
      "Grafiktreiber direkt von NVIDIA, AMD oder Intel aktualisieren",
      "GPU-Skalierung im Treiber aktivieren und auf 'Seitenverhältnis' setzen",
      "Benutzerdefinierte Auflösung (Custom Resolution) über Treiber oder CRU erstellen, falls EDID fehlerhaft ist"
    ],
    "whenToStop": "Wenn das Panel selbst im OSD-Menü verzerrte Grafiken anzeigt, liegt ein physischer Fehler des Scaler-Chips vor."
  },
  {
    "id": "wrong-refresh-rate",
    "title": "Falsche Bildwiederholfrequenz / Bei 60 Hz blockiert",
    "category": "display",
    "categoryTitle": "Bildschirm-Probleme",
    "symptom": "Ein 144Hz-, 240Hz- oder 360Hz-Gaming-Monitor läuft spürbar ruckelig und ist im Betriebssystem auf 60 Hz limitiert.",
    "possibleCauses": [
      "Monitor ist über älteres HDMI 1.4 Kabel angeschlossen, das hohe Bildwiederholraten nicht unterstützt",
      "Windows-Erweiterte Anzeigeeinstellungen nach Treiber-Update auf 60 Hz zurückgesetzt",
      "Im Monitor-OSD ist DisplayPort 1.1 / 1.2 statt DP 1.4 mit DSC aktiviert",
      "Mehrere Monitore mit unterschiedlichen Frequenzen behindern GPU-Taktung",
      "Integrierte GPU steuert DisplayPort-Ausgang am Laptop an"
    ],
    "checks": [
      "In Windows: Einstellungen > System > Anzeige > Erweiterte Anzeige > Bildwiederholfrequenz prüfen",
      "Im Monitor-OSD prüfen, welche DisplayPort-Version aktiv ist (auf DP 1.4 / 2.1 stellen)",
      "Verwendetes Kabel prüfen: DisplayPort wird HDMI bei hohen Frequenzen am PC vorgezogen",
      "Variable Refresh Rate (G-Sync/FreeSync) im OSD und Treiber aktivieren"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester misst präzise Bildraten per requestAnimationFrame und erkennt Mikroruckler oder Frame-Drops.",
      "links": [
        {
          "label": "Bildwiederholfrequenz-Test",
          "testId": "refresh-rate-test",
          "testPath": "/tests/refresh-rate-test"
        },
        {
          "label": "VRR-Test",
          "testId": "vrr-test",
          "testPath": "/tests/vrr-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Hardware-Taktsignal-Jitter am GPU-Ausgang",
      "G-Sync-Hardware-Modul-Firmwareversion"
    ],
    "actions": [
      "Bildwiederholfrequenz in Windows und NVIDIA/AMD-Systemsteuerung manuell auf Maximum setzen",
      "Auf zertifiziertes DisplayPort 1.4- oder HDMI 2.1-Kabel umsteigen",
      "Monitor-OSD auf Werkseinstellungen zurücksetzen und Overclock-Modus aktivieren",
      "Grafiktreiber aktualisieren"
    ],
    "whenToStop": "Wenn der Monitor bei Auswahl der Nennfrequenz Bildaussetzer ('Black Screens') zeigt, liegt ein Bandbreiten- oder Paneldefekt vor."
  },
  {
    "id": "screen-tearing",
    "title": "Screen Tearing / Horizontale Bildrisse",
    "category": "display",
    "categoryTitle": "Bildschirm-Probleme",
    "symptom": "Horizontale Risse oder Versatzlinien wandern bei schnellen horizontalen Bewegungen über das Bild.",
    "possibleCauses": [
      "V-Sync im Spiel oder Treiber deaktiviert",
      "Bildrate der GPU liegt oberhalb oder unterhalb des VRR-G-Sync-Bereichs",
      "G-Sync / FreeSync im Treiber oder Monitor-OSD nicht aktiviert",
      "Spiel läuft im rahmenlosen Fenstermodus mit inkompatibler Desktop-Komposition",
      "GPU gibt Bilder asynchron zur Bildwiederholfrequenz des Monitors aus"
    ],
    "checks": [
      "Prüfen, ob G-Sync/FreeSync im OSD des Monitors eingeschaltet ist",
      "NVIDIA-Systemsteuerung: 'G-SYNC, G-SYNC-Kompatibilität aktivieren' prüfen",
      "Im Spiel prüfen, ob Bildrate die Monitorfrequenz überschreitet",
      "V-Sync im Treiber auf 'Ein' und Framerate-Begrenzer 3 FPS unter Maximalfrequenz setzen"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester erzeugt Hochgeschwindigkeits-Balkenmuster, um Tearing-Linien und V-Sync-Synchronisation sichtbar zu machen.",
      "links": [
        {
          "label": "Screen Tearing Test",
          "testId": "screen-tearing-test",
          "testPath": "/tests/screen-tearing-test"
        },
        {
          "label": "VRR-Test",
          "testId": "vrr-test",
          "testPath": "/tests/vrr-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Frame-Pacing-Schwankungen innerhalb nativer DirectX/Vulkan-Rendering-Pipelines",
      "Treiberinterne Swapchain-Latenzen"
    ],
    "actions": [
      "G-Sync/FreeSync aktivieren",
      "Framerate global auf z. B. 141 FPS bei 144 Hz oder 237 FPS bei 240 Hz begrenzen",
      "V-Sync im Grafikkartentreiber aktivieren, um Tearing im Grenzbereich zu verhindern",
      "DisplayPort-Kabel verwenden (G-Sync Compatible funktioniert meist nur über DP)"
    ],
    "whenToStop": "Wenn horizontale Linien auch bei statischem Standbild und im BIOS sichtbar sind, liegt kein Tearing, sondern ein Display-Schaden vor."
  },
  {
    "id": "flickering",
    "title": "Bildschirmflackern / Sporadische Bildaussetzer",
    "category": "display",
    "categoryTitle": "Bildschirm-Probleme",
    "symptom": "Bildschirm flackert unregelmäßig, wird für 1-2 Sekunden schwarz oder zeigt Helligkeitspumpen.",
    "possibleCauses": [
      "Minderwertiges oder zu langes DisplayPort-/HDMI-Kabel verliert Signalintegrität",
      "G-Sync / FreeSync Helligkeitsflackern (Brightness Flickering) bei schwankenden Bildraten",
      "Hintergrundbeleuchtung nutzt niederfrequentes PWM (Pulsweitenmodulation)",
      "Störquellen oder instabile Steckdosenleiste / Netzteil",
      "Inkompatibler GPU-Energiesparmodus oder Treiberkonflikt"
    ],
    "checks": [
      "Tritt das Flackern nur beim Spielen (G-Sync an) oder auch auf dem Desktop auf?",
      "Videokabel fest andrücken und an beiden Enden überprüfen",
      "Monitorhelligkeit im OSD verändern: Verschwindet das Flackern bei 100% Helligkeit? (PWM-Hinweis)",
      "Testweise G-Sync / FreeSync deaktivieren"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester bietet Flicker- und Gleichmäßigkeits-Tests zur Identifikation stroboskopischer Effekte.",
      "links": [
        {
          "label": "Flicker-Test",
          "testId": "flicker",
          "testPath": "/tests/flicker"
        },
        {
          "label": "VRR-Test",
          "testId": "vrr-test",
          "testPath": "/tests/vrr-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Exakte PWM-Frequenz in Kilohertz (erfordert optische Fotodiode)",
      "Netzteil-Spannungsschwankungen"
    ],
    "actions": [
      "Hochwertiges, VESA-zertifiziertes Kabel verwenden",
      "Monitor direkt an Wandsteckdose anschließen (nicht an überlastete Mehrfachsteckdosen)",
      "In NVIDIA/AMD-Systemsteuerung G-Sync für den Fenstermodus deaktivieren oder VRR-Flackerunterdrückung einschalten",
      "Grafiktreiber per sauberer Neuinstallation aktualisieren"
    ],
    "whenToStop": "Wenn das Panel unabhängig von Signalkabel und Helligkeitsstufe im OSD flackert, ist das Netzteil oder die LED-Leiste defekt."
  },
  {
    "id": "dead-stuck-bright-pixel",
    "title": "Tote, festsitzende und leuchtende Subpixel-Fehler",
    "category": "pixels",
    "categoryTitle": "Pixel-Probleme",
    "symptom": "Ein winziger Punkt auf dem Bildschirm bleibt dauerhaft schwarz (tot), leuchtet permanent in Rot/Grün/Blau (stuck) oder strahlt weiß (bright).",
    "possibleCauses": [
      "Fertigungsfehler in der TFT-Transistormatrix während der Panelproduktion",
      "Transistor dauerhaft stromlos (totes Subpixel) oder im leitenden Zustand blockiert (leuchtendes Subpixel)",
      "Partikel- oder Staub-Einschluss zwischen Polarisator und Glassubstrat",
      "Mechanischer Druckschaden durch Stoß oder zu festes Reinigen"
    ],
    "checks": [
      "Bildschirm vorsichtig mit einem Mikrofasertuch reinigen, um Oberflächenschmutz auszuschließen",
      "Vollbild-Farbflächen (Rot, Grün, Blau, Weiß, Schwarz) anzeigen, um betroffene Subpixel zu identifizieren",
      "Mit Lupe prüfen: Ist es ein einzelnes RGB-Subpixel oder ein vollständiges Pixel?"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester bietet gezielte Dead-Pixel-Suchläufe und hochfrequente Farbwechselmuster, um festsitzende Flüssigkristalle zu reaktivieren.",
      "links": [
        {
          "label": "Dead-Pixel-Test",
          "testId": "dead-pixel-test",
          "testPath": "/tests/dead-pixel-test"
        },
        {
          "label": "Stuck-Pixel-Fixer",
          "testId": "stuck-pixel-fixer",
          "testPath": "/tests/stuck-pixel-fixer"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Garantieanspruch nach ISO 9241-307 Fehlerklasse ohne manuelle Zählung",
      "Physische Transistorschäden auf Siliziumebene"
    ],
    "actions": [
      "Stuck-Pixel-Fixer 20-30 Minuten auf der betroffenen Stelle laufen lassen (schneller Farbzyklus)",
      "Hersteller-Pixelfehlerrichtlinie (Garantiebedingungen) prüfen",
      "Innerhalb der 14-tägigen Rückgabefrist bei Neukauf umtauschen",
      "Keine Gewalt anwenden (Druck auf das Panel kann weitere Pixel zerstören)"
    ],
    "whenToStop": "Tote (schwarze) Pixel sind physisch zerstört und können softwareseitig nicht repariert werden. Wenden Sie sich an den Hersteller."
  },
  {
    "id": "washed-out-colors",
    "title": "Ausgewaschene Farben / Falscher Kontrast & Farbstich",
    "category": "imageQuality",
    "categoryTitle": "Bildqualität",
    "symptom": "Farben wirken blass, Schwarztöne grau, oder das Bild hat einen störenden Gelb-, Grün- oder Blaustich.",
    "possibleCauses": [
      "Falscher dynamischer RGB-Ausgabebereich (Begrenzt 16-235 statt Voll 0-255)",
      "Windows-HDR auf SDR-Inhalten aktiviert ohne korrekte Helligkeitskalibrierung",
      "Nachtmodus / Blaulichtfilter im Betriebssystem oder Monitor-OSD aktiviert",
      "Falsches Farbprofil (ICC-Profil) in Windows geladen",
      "Farbformat auf YCbCr420 statt RGB 4:4:4 eingestellt"
    ],
    "checks": [
      "In NVIDIA/AMD-Systemsteuerung prüfen: Dynamikbereich auf 'Voll' (0-255) gestellt?",
      "Windows-Nachtmodus deaktivieren",
      "Im Monitor-OSD Farbtemperatur auf 'Standard' oder 'sRGB' einstellen",
      "Windows HDR (Win + Alt + B) testweise ausschalten"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester testet Farbraumtreue, Graustufen-Differenzierung und Kontrastabstufungen.",
      "links": [
        {
          "label": "Farbgenauigkeits-Test",
          "testId": "color-test",
          "testPath": "/tests/color-test"
        },
        {
          "label": "Kontrast-Test",
          "testId": "contrast-test",
          "testPath": "/tests/contrast-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Absolute Delta-E-Farbabweichungen (erfordert Kolorimeter)",
      "Hardware-LUT-Programmierung des Monitors"
    ],
    "actions": [
      "Dynamikbereich im Grafikkartentreiber auf 'Voll' und Farbtiefe auf 8-Bit oder 10-Bit setzen",
      "Windows-Farbkalibrierung (dccw) ausführen oder Werksprofil laden",
      "OSD-Farbprofil auf sRGB oder DCI-P3 kalibrieren",
      "HDR-Inhalt-Helligkeit in den Windows-HDR-Einstellungen anpassen"
    ],
    "whenToStop": "Wenn das Panel dauerhaft einen unkorrigierbaren Farbstich aufweist, liegt eine Alterung der LED-Hintergrundbeleuchtung vor."
  },
  {
    "id": "blurry-text",
    "title": "Unscharfer Text & Subpixel-Farbsäume",
    "category": "imageQuality",
    "categoryTitle": "Bildqualität",
    "symptom": "Schrift wirkt verwaschen, unscharf oder zeigt farbige Ränder (Farbsäume) an Buchstabenkanten.",
    "possibleCauses": [
      "Falsche Windows-DPI-Skalierung (z. B. ungerade 125% oder 175% Skalierung ohne ClearType-Anpassung)",
      "Ungewöhnliches Subpixel-Layout (BGR, WRGB oder QD-OLED dreieckiges Layout)",
      "Nicht-native Auflösung eingestellt",
      "Farbunterabtastung (Chroma Subsampling YCbCr 4:2:2 oder 4:2:0) aktiv",
      "Schärferegler im Monitor-OSD zu hoch oder zu niedrig eingestellt"
    ],
    "checks": [
      "ClearType-Textanpassung in Windows ausführen",
      "Prüfen, ob Farbausgabe auf RGB 4:4:4 steht (keine Kompression)",
      "Monitor-OSD Schärfe auf Standardwert (meist 50%) setzen",
      "Prüfen, ob der Monitor ein BGR- statt RGB-Panel besitzt"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester bietet spezifische Schriftgrößen- und Subpixel-Rendering-Muster zur Beurteilung der Kantenschärfe.",
      "links": [
        {
          "label": "Textschärfe-Test",
          "testId": "text-clarity-test",
          "testPath": "/tests/text-clarity-test"
        },
        {
          "label": "Schärfe-Test",
          "testId": "sharpness-test",
          "testPath": "/tests/sharpness-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Betriebssystem-Schrift-Rasterizer-Kernels auf API-Ebene",
      "Physikalische Subpixel-Geometrie unter dem Mikroskop"
    ],
    "actions": [
      "ClearType-Assistenten in Windows durchlaufen und optimale Schriftglättung wählen",
      "Sicherstellen, dass native Auflösung und RGB-Vollbereichsausgabe aktiv sind",
      "Bei BGR-Panels ClearType per Registrierungsschlüssel oder BetterClearTypeTuner auf BGR umstellen",
      "Skalierung auf glatte Werte (100%, 150%, 200%) festlegen"
    ],
    "whenToStop": "Bei OLED-Panels mit QD- oder WOLED-Subpixelstruktur sind leichte Farbsäume bauartbedingt unvermeidbar."
  },
  {
    "id": "uneven-brightness",
    "title": "Ungleichmäßige Helligkeit / Vignettierung / Dirty Screen Effect",
    "category": "imageQuality",
    "categoryTitle": "Bildqualität",
    "symptom": "Dunkle Ecken (Vignettierung), wolkige Flecken auf grauen Flächen oder streifige Schmutzeffekte (DSE).",
    "possibleCauses": [
      "Toleranzen bei Diffusorplatten oder Edge-LED-Hintergrundbeleuchtung",
      "Dirty Screen Effect (DSE) durch ungleichmäßige Panelverklebung",
      "Spannung im Gehäuserahmen drückt auf die Flüssigkristallschicht",
      "Alterung der Hintergrundbeleuchtungs-LEDs bei älteren Bildschirmen"
    ],
    "checks": [
      "Einfarbig graue Flächen (25%, 50%, 75% Grau) im Vollbild betrachten",
      "Kameratest: Foto mit kurzer Belichtungszeit machen, um Wolkenbildung festzuhalten",
      "Prüfen, ob das Phänomen blickwinkelabhängig ist (normaler IPS-/VA-Blickwinkeleffekt)"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester analysiert Gleichmäßigkeit und Near-Black-Verhalten über die gesamte Bildschirmfläche.",
      "links": [
        {
          "label": "Gleichmäßigkeits-Test",
          "testId": "uniformity-test",
          "testPath": "/tests/uniformity-test"
        },
        {
          "label": "Near-Black-Test",
          "testId": "near-black-test",
          "testPath": "/tests/near-black-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Exakte Leuchtdichte-Gleichmäßigkeit in cd/m² über ein 9-Punkte-Messgitter",
      "Thermische Verformung interner Lichtleiterplatten"
    ],
    "actions": [
      "Monitorhelligkeit auf augenfreundliche 120-150 cd/m² senken (reduziert Sichtbarkeit)",
      "Gleichmäßigkeitsausgleich (Uniformity Compensation) im Monitor-OSD aktivieren, falls vorhanden",
      "Raumbeleuchtung anpassen, um störende Kontraste zu minimieren",
      "Bei gravierenden Mängeln innerhalb der Rückgabefrist austauschen"
    ],
    "whenToStop": "Geringfügige Helligkeitsabfälle an den Ecken (<15%) sind bei Consumer-Monitoren technisch üblich."
  },
  {
    "id": "backlight-bleed-ips-glow",
    "title": "Backlight Bleed vs. IPS Glow",
    "category": "imageQuality",
    "categoryTitle": "Bildqualität",
    "symptom": "Helle Lichtflecken an den Bildschirmrändern in dunklen Szenen oder silbriger/goldener Schimmer aus schrägen Blickwinkeln.",
    "possibleCauses": [
      "Backlight Bleed: Gehäusedruck oder undichte Kanten lassen Licht der Hintergrundbeleuchtung durchscheinen",
      "IPS Glow: Optische Eigenheit der Flüssigkristall-Ausrichtung bei IPS-Panels bei schräger Betrachtung",
      "Mechanische Verbiegung des Rahmens durch Wandhalterungsschrauben"
    ],
    "checks": [
      "Betrachten Sie den Bildschirm aus 1,5 Metern Entfernung genau frontal: Verschwindet der Schimmer? (Wenn ja: IPS Glow)",
      "Bleiben helle Lichtkeile an den Rändern auch bei frontaler Betrachtung sichtbar? (Wenn ja: Backlight Bleed)",
      "Wandhalterungsschrauben minimal lockern, falls Rahmenverspannung vorliegt"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester bietet optimierte Schwarzbilder zur klaren Unterscheidung von Bleed und Glow.",
      "links": [
        {
          "label": "Backlight-Bleed-Test",
          "testId": "backlight-bleed-test",
          "testPath": "/tests/backlight-bleed-test"
        },
        {
          "label": "Schwarzwert-Test",
          "testId": "black-level-test",
          "testPath": "/tests/black-level-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Toleranzgrenzen der Hersteller-Garantie ohne optische Laboranalyse",
      "Drehmoment der Gehäuseschrauben"
    ],
    "actions": [
      "Sitzabstand vergrößern und Monitor auf Augenhöhe ausrichten (reduziert IPS Glow deutlich)",
      "Raumbeleuchtung dezent einschalten (Bias-Lighting hinter dem Monitor)",
      "Helligkeit von 100% auf einen praxisgerechten Wert (30-50%) reduzieren",
      "Bei extremem Lichtaustritt Monitor reklamieren"
    ],
    "whenToStop": "IPS Glow lässt sich nicht reparieren, da es eine inhärente Panel-Eigenschaft ist. Nur OLED-Panels bieten echtes Schwarz ohne Glow."
  },
  {
    "id": "hdr-not-working",
    "title": "HDR funktioniert nicht / Bild im HDR-Modus ausgewaschen oder grau",
    "category": "imageQuality",
    "categoryTitle": "Bildqualität",
    "symptom": "Aktivieren von HDR führt zu blassen Farben, dunklem Desktop oder überstrahlten Highlights.",
    "possibleCauses": [
      "Monitor besitzt nur einfaches 'HDR400' ohne echtes Local Dimming und breiten Farbraum",
      "Windows-HDR-Kalibrierung nicht durchgeführt",
      "Inkorrektes Tonemapping im Spiel oder Monitor-OSD",
      "HDMI-/DisplayPort-Bandbreite unzureichend für 10-Bit-HDR bei hoher Bildrate",
      "Browser unterstützt kein Hardware-beschleunigtes HDR-Videorendering"
    ],
    "checks": [
      "Prüfen, ob HDR in Windows aktiviert ist (Win + Alt + B)",
      "Windows HDR-Kalibrierungs-App aus dem Microsoft Store ausführen",
      "Monitor-OSD: HDR-Einstellung auf 'Auto' oder 'DisplayHDR' setzen",
      "Kabelverbindung prüfen (DP 1.4 oder HDMI 2.1 erforderlich)"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester testet Spitzenhelligkeit, HDR-Farbraumabdeckung und Highlight-Clipping.",
      "links": [
        {
          "label": "HDR-Test",
          "testId": "hdr-test",
          "testPath": "/tests/hdr-test"
        },
        {
          "label": "HDR-Fähigkeiten-Test",
          "testId": "hdr-capability-test",
          "testPath": "/tests/hdr-capability-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Spitzenleuchtdichte in Nits (erfordert Leuchtdichtemessgerät)",
      "Anzahl und Reaktionszeit der Mini-LED-Dimmzonen"
    ],
    "actions": [
      "Windows HDR-Kalibrierungs-App durchführen, um minimale und maximale Helligkeitswerte zu hinterlegen",
      "SDR-Inhalt-Helligkeitsregler in den Windows-Anzeigeeinstellungen auf angenehmes Niveau stellen",
      "Grafiktreiber aktualisieren und Farbtiefe auf 10 bpc stellen",
      "Bei Monitoren ohne Local Dimming HDR für Desktop-Arbeiten deaktivieren und nur in echten HDR-Spielen nutzen"
    ],
    "whenToStop": "Wenn der Monitor kein FALD (Full-Array Local Dimming) oder OLED ist, kann HDR physikalisch keinen hohen Kontrast erzeugen."
  },
  {
    "id": "tv-overscan-fit",
    "title": "Bild passt nicht auf den TV-Bildschirm (Overscan / Abgeschnittene Ränder)",
    "category": "tv",
    "categoryTitle": "TV-Probleme",
    "symptom": "Windows-Taskleiste oder Fensterkanten sind an den Rändern abgeschnitten oder das Bild ist von schwarzen Balken umgeben.",
    "possibleCauses": [
      "TV-Overscan-Funktion aktiv (Erbe alter analoger Röhrenfernseher-Standards)",
      "Bildformat am Fernseher auf '16:9' statt 'Just Scan' / '1:1' eingestellt",
      "GPU-Treiber führt manuelle Underscan-Korrektur durch",
      "HDMI-Eingang am TV nicht als 'PC' benannt"
    ],
    "checks": [
      "TV-Fernbedienung: Taste für Bildformat/Seitenverhältnis suchen",
      "Eingangsbezeichnung des HDMI-Ports am TV prüfen: Steht sie auf 'PC'?",
      "In der NVIDIA/AMD-Systemsteuerung prüfen, ob die Desktop-Größenanpassung aktiv ist"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester bietet 1:1-Pixelmapping- und TV-Overscan-Testgitter mit Prozentmarkierungen.",
      "links": [
        {
          "label": "TV-Overscan-Test",
          "testId": "tv-overscan-test",
          "testPath": "/tests/tv-overscan-test"
        },
        {
          "label": "Skalierungs- & Format-Test",
          "testId": "scaling-aspect-test",
          "testPath": "/tests/scaling-aspect-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Interne Bildprozessor-Filter des Fernsehers",
      "HDMI-CEC-Steuerungsprotokolle"
    ],
    "actions": [
      "Bildformat am TV auf 'Just Scan', 'Nativ', 'Voll' oder '1:1' einstellen",
      "HDMI-Eingang am TV auf 'PC' umbenennen (deaktiviert Overscan und Nachschärfung automatisch)",
      "GPU-Treiber: Desktop-Größenanpassung auf Standardwerte zurücksetzen",
      "Schärferegler am Fernseher auf neutral (oft 0 oder 50) setzen"
    ],
    "whenToStop": "Sobald die 1-Pixel-Gitterlinie von Screen Tester randlos auf dem Display aufliegt, ist das Problem gelöst."
  },
  {
    "id": "multi-touch-issues",
    "title": "Multi-Touch & Berührungserkennungs-Probleme",
    "category": "deviceInput",
    "categoryTitle": "Geräte- & Eingabeprobleme",
    "symptom": "Touchscreen registriert Fingerberührungen ungenau, ignoriert Mehrfinger-Gesten oder erzeugt Geister-Berührungen (Ghost Touches).",
    "possibleCauses": [
      "Verschmutzungen, Fettfilme oder Feuchtigkeit auf der Glasoberfläche",
      "Minderwertige Schutzfolie oder Panzerglas beeinträchtigt kapazitiven Sensor",
      "Störspannungen durch billige Drittanbieter-Ladekabel (verursacht Ghost Touches)",
      "Veraltete Touchscreen-Treiber oder fehlerhafte Windows-Touch-Kalibrierung"
    ],
    "checks": [
      "Tritt das Problem auch auf, wenn das Ladekabel ausgesteckt ist?",
      "Bildschirm mit alkoholfreiem Tuch gründlich reinigen",
      "Prüfen, wie viele gleichzeitige Berührungspunkte registriert werden"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester bietet interaktive Multi-Touch-Diagnosen mit Koordinatenanzeige und Kontaktverfolgung.",
      "links": [
        {
          "label": "Multi-Touch-Test",
          "testId": "multi-touch-test",
          "testPath": "/tests/multi-touch-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Physische Leiterbahnbrüche im Digitizer-Glas",
      "Hardware-Abtastrate des Touch-Controllers in Hertz"
    ],
    "actions": [
      "Original-Netzteil verwenden, um Störströme auszuschließen",
      "Windows-Touch-Kalibrierung in der Systemsteuerung zurücksetzen oder neu durchführen",
      "Schutzfolie entfernen, falls das Problem nach deren Anbringung auftrat",
      "Touchscreen-Treiber im Geräte-Manager aktualisieren"
    ],
    "whenToStop": "Wenn Geister-Eingaben auch bei gereinigtem Display und ohne Ladekabel auftreten, ist der Digitizer defekt."
  },
  {
    "id": "accelerometer-issues",
    "title": "Beschleunigungssensor & Bewegungssensor-Probleme",
    "category": "deviceInput",
    "categoryTitle": "Geräte- & Eingabeprobleme",
    "symptom": "Bildschirm dreht sich nicht automatisch, Spiele reagieren nicht auf Neigung oder Werte driften ab.",
    "possibleCauses": [
      "Automatische Bildschirmdrehung im Betriebssystem gesperrt",
      "Browser hat keine Berechtigung für Bewegungssensoren",
      "Sensor durch Stürze dekalibriert",
      "Energiesparmodus deaktiviert Hintergrund-Sensorabfrage"
    ],
    "checks": [
      "Prüfen, ob die Rotationssperre im Schnellmenü / Kontrollzentrum aktiviert ist",
      "Website-Berechtigungen im Browser für Bewegungssensoren prüfen (Safari/Chrome)",
      "Gerät auf eine ebene Fläche legen und Messwerte beobachten"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester liest Beschleunigungskräfte auf X-, Y- und Z-Achse in Echtzeit über die DeviceMotion-API aus.",
      "links": [
        {
          "label": "Beschleunigungssensor-Test",
          "testId": "accelerometer-test",
          "testPath": "/tests/accelerometer-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Physische Mikromechanik (MEMS) des Sensorchips",
      "Kalibrierungs-Offset im geschützten Bereich des Baseband-Prozessors"
    ],
    "actions": [
      "Automatische Drehung in den Geräteeinstellungen aktivieren",
      "Im Browser (besonders iOS Safari) Sensorzugriff in den Einstellungen erlauben",
      "Gerät neu starten",
      "Sensorkalibrierung in den Systemeinstellungen durchführen"
    ],
    "whenToStop": "Wenn alle Achsen dauerhaft 0 oder statische Maximalwerte liefern, liegt ein MEMS-Hardwareschaden vor."
  },
  {
    "id": "gyroscope-issues",
    "title": "Gyroskop & Ausrichtungssensor-Probleme",
    "category": "deviceInput",
    "categoryTitle": "Geräte- & Eingabeprobleme",
    "symptom": "Rotationserkennung in VR/AR-Anwendungen wackelt, dreht sich unkontrolliert im Kreis oder reagiert verzögert.",
    "possibleCauses": [
      "Magnetische Störfelder durch Hüllen mit Magnetverschluss",
      "Fehlende Gyroskop-Berechtigung im mobilen Browser",
      "MEMS-Gyroskop benötigt 8er-Schleifen-Kalibrierung",
      "Systemweiter Sensor-Dienst abgestürzt"
    ],
    "checks": [
      "Magnethülle oder metallisches Zubehör vom Gerät entfernen",
      "Gerät in einer Achter-Schleife durch die Luft bewegen, um Sensoren zu rekalibrieren",
      "Browserberechtigungen für Orientierung prüfen"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester visualisiert Alpha-, Beta- und Gamma-Rotationswinkel mit Echtzeit-Physiksimulation.",
      "links": [
        {
          "label": "Gyroskop-Test",
          "testId": "gyroscope-test",
          "testPath": "/tests/gyroscope-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Gekoppelte Sensordatenfusion aus Gyroskop und Magnetometer auf Treiberebene",
      "Sensor-Rauschen bei Hochfrequenzmessungen"
    ],
    "actions": [
      "Gerät mit Achter-Bewegung rekalibrieren",
      "Schutzhüllen mit Magneten abnehmen",
      "Gerät neu starten",
      "Browser aktualisieren"
    ],
    "whenToStop": "Wenn keine Drehbewegung auf einer der drei Raumachsen erkannt wird, ist das Gyroskop hardwareseitig defekt."
  },
  {
    "id": "vibration-issues",
    "title": "Vibrations-API & Haptik-Probleme",
    "category": "deviceInput",
    "categoryTitle": "Geräte- & Eingabeprobleme",
    "symptom": "Gerät vibriert nicht bei Benachrichtigungen oder webbasierten Haptik-Tests.",
    "possibleCauses": [
      "Vibration im Systemmenü oder Nicht-stören-Modus deaktiviert",
      "Browser blockiert navigator.vibrate() ohne vorherige Benutzerinteraktion",
      "iOS Safari unterstützt die W3C Vibration API grundsätzlich nicht",
      "Linearmotor (Taptic Engine) oder ERM-Vibrationsmotor physisch defekt"
    ],
    "checks": [
      "Prüfen, ob Vibration in den Toneinstellungen des Betriebssystems aktiv ist",
      "Sicherstellen, dass vor dem Test auf den Bildschirm getippt wurde (User-Activation)",
      "Prüfen, ob ein iPhone/iPad verwendet wird (iOS unterstützt Web-Vibration nicht)"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester testet Vibrationsmuster (kurz, lang, Puls) über die HTML5 Vibration API.",
      "links": [
        {
          "label": "Vibrations-Test",
          "testId": "vibration-test",
          "testPath": "/tests/vibration-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Mechanische Schwingungsfrequenz in Hertz",
      "Spannungsversorgung des Vibrationsaktors"
    ],
    "actions": [
      "Vibration in den Systemeinstellungen aktivieren",
      "Auf Android Chrome oder kompatiblen Browser wechseln",
      "Stromsparmodus deaktivieren, da dieser oft die Haptik abschaltet",
      "Gerät neu starten"
    ],
    "whenToStop": "Wenn das Gerät auch bei Anrufen und Weckern nicht vibriert, ist der Vibrationsmotor defekt."
  },
  {
    "id": "webcam-issues",
    "title": "Webcam & Kamera-Zugriffsprobleme",
    "category": "deviceInput",
    "categoryTitle": "Geräte- & Eingabeprobleme",
    "symptom": "Kamerabild bleibt schwarz, Browser meldet 'Kamera nicht gefunden' oder 'Zugriff verweigert'.",
    "possibleCauses": [
      "Kameraberechtigung im Browser oder Betriebssystem verweigert",
      "Physische Schutzblende (Privacy Shutter) an der Webcam ist geschlossen",
      "Anderes Programm (z. B. Zoom, Teams, OBS) belegt die Kamera exklusiv",
      "Hardware-Kameraschalter an der Laptoptastatur deaktiviert",
      "Veralteter oder beschädigter USB-Kameratreiber"
    ],
    "checks": [
      "Physische Schiebeblende an der Kameralinse prüfen",
      "Prüfen, ob eine Tastenkombination (z. B. Fn + F6) die Kamera deaktiviert hat",
      "Alle anderen Videokonferenz-Tools vollständig beenden",
      "Schlosssymbol in der Browser-Adressleiste anklicken und Kamerazugriff erlauben"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester prüft Kameraauflösung, Bildrate, Farbdarstellung und Latenz im Browser.",
      "links": [
        {
          "label": "Webcam-Test",
          "testId": "webcam-test",
          "testPath": "/tests/webcam-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Sensorrauschabstand (SNR) auf Pixelebene",
      "Hardware-Firmware-Fehler im Kamera-Mikrocontroller"
    ],
    "actions": [
      "Kameraberechtigung im Browser erteilen",
      "Datenschutzeinstellungen in Windows/macOS prüfen und Browser Zugriff gewähren",
      "Kameratreiber im Geräte-Manager aktualisieren oder neu installieren",
      "USB-Kamera an einem anderen USB-Port anschließen"
    ],
    "whenToStop": "Wenn die Kamera im Geräte-Manager mit Fehlercode 43/10 gelistet ist oder an keinem PC erkannt wird, ist sie defekt."
  },
  {
    "id": "speaker-issues",
    "title": "Lautsprecher & Audioausgabe-Probleme",
    "category": "deviceInput",
    "categoryTitle": "Geräte- & Eingabeprobleme",
    "symptom": "Kein Ton, Ton nur auf einem Kanal (Links/Rechts), Ton verzerrt oder knisternd.",
    "possibleCauses": [
      "Falsches Audio-Ausgabegerät in den Betriebssystem-Einstellungen ausgewählt",
      "Lautsprecher oder Browser-Tab stummgeschaltet",
      "Audiokabel (3,5mm Klinke) nicht vollständig eingesteckt",
      "Audio-Balance im System einseitig verstellt",
      "Samplerate-Konflikt im Audiotreiber (z. B. 44,1 kHz vs. 48 kHz)"
    ],
    "checks": [
      "Lautstärkeregler im Betriebssystem und am Lautsprecher prüfen",
      "Prüfen, ob das Ausgabegerät korrekt auf Kopfhörer oder Lautsprecher steht",
      "Klinkenstecker fest eindrücken und auf festen Sitz prüfen",
      "Prüfen, ob der Browser-Tab stummgeschaltet ist"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester erzeugt reine Sinustöne, Kanaltests (Links/Rechts) und Frequenzdurchläufe zur Überprüfung der Audioausgabe.",
      "links": [
        {
          "label": "Lautsprecher-Test",
          "testId": "speaker-test",
          "testPath": "/tests/speaker-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Klirrfaktor (THD) der Verstärkerschaltung",
      "Physische Schwingspulen-Beschädigung"
    ],
    "actions": [
      "Korrektes Standard-Audiogerät in den Sound-Einstellungen auswählen",
      "Audio-Balance auf die Mitte (50/50) stellen",
      "Audiotreiber (z. B. Realtek) aktualisieren",
      "Anderes Audiokabel oder anderen Kopfhörer ausprobieren"
    ],
    "whenToStop": "Wenn die Lautsprechermembran mechanisch kratzt oder knistert, liegt ein Defekt der Lautsprechereinheit vor."
  },
  {
    "id": "microphone-issues",
    "title": "Mikrofon & Audioeingabe-Probleme",
    "category": "deviceInput",
    "categoryTitle": "Geräte- & Eingabeprobleme",
    "symptom": "Mikrofon nimmt keinen Ton auf, Pegelausschlag bleibt bei null oder Sprache ist extrem leise und verrauscht.",
    "possibleCauses": [
      "Mikrofonberechtigung im Browser oder Betriebssystem verweigert",
      "Hardware-Stummschalter am Headset-Kabel aktiviert",
      "Falsches Eingabegerät in den Systemeinstellungen ausgewählt",
      "Mikrofon-Eingangspegel in den Soundeinstellungen auf 0 gestellt",
      "Klinkenstecker im falschen Port (Kopfhörer statt Mikrofon eingesteckt)"
    ],
    "checks": [
      "Physischen Mute-Schalter am Headset / Mikrofon prüfen",
      "Schlosssymbol in der Adressleiste anklicken und Mikrofonzugriff erlauben",
      "In den Windows-Soundeinstellungen prüfen, ob der Pegelbalken beim Sprechen ausschlägt",
      "Sicherstellen, dass bei Klinken-Headsets der richtige Splitter verwendet wird"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester visualisiert Eingangspegel, Frequenzspektrum und Signalpegel in Echtzeit über die Web Audio API.",
      "links": [
        {
          "label": "Mikrofon-Test",
          "testId": "microphone-test",
          "testPath": "/tests/microphone-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Eigenrauschen der Mikrofonkapsel in dB(A)",
      "Phantomspeisung bei XLR-Mikrofonen"
    ],
    "actions": [
      "Mikrofonberechtigung im Browser und den Windows-Datenschutzeinstellungen erteilen",
      "Standard-Eingabegerät in den Soundeinstellungen korrekt festlegen",
      "Mikrofonpegel auf 80-100% einstellen und Mikrofonverstärkung anpassen",
      "Audiotreiber aktualisieren"
    ],
    "whenToStop": "Wenn das Mikrofon an mehreren Geräten keinen Pegel liefert, ist das Kabel oder die Kapsel defekt."
  },
{
  "id": "burn-in-image-retention",
  "title": "OLED-Burn-In, Einbrenneffekte & Geisterbilder",
  "category": "pixels",
  "categoryTitle": "Pixel-Probleme",
  "symptom": "Schattenhafte Umrisse von Taskleisten, Senderlogos oder Fenstern bleiben auch nach Inhaltswechseln sichtbar auf dem Panel eingebrannt.",
  "possibleCauses": [
    "Statische Bildelemente über hunderte Stunden bei hoher Helligkeit",
    "Ungleichmäßige Alterung der organischen Subpixel bei OLED/QD-OLED",
    "Temporäre Bildremanenz bei LCD/IPS-Panels"
  ],
  "checks": [
    "Graue (5% und 50%) sowie vollfarbige Testbilder anzeigen, um Schattenmuster zu erkennen",
    "Prüfen, ob der Effekt nach 15 Minuten dynamischem Video verblasst",
    "Betriebsstundenzähler im Monitor-OSD überprüfen"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester zeigt vollflächige Farb- und Graustufenfelder zur Erkennung von Einbrennschatten und bietet einen OLED-Burn-In-Rechner.",
    "links": [
      {
        "label": "Burn-In-Test",
        "testId": "burn-in-test",
        "testPath": "/tests/burn-in-test"
      },
      {
        "label": "OLED-Burn-In-Rechner",
        "testId": "oled-burn-in-calculator",
        "testPath": "/tools/oled-burn-in-calculator"
      },
      {
        "label": "Vollfarben-Test",
        "testId": "solid-color-test",
        "testPath": "/tests/solid-color-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Physikalische Alterung der Leuchtschicht",
    "Hersteller-Pixel-Shift-Algorithmen"
  ],
  "actions": [
    "Manuelle Pixel-Reinigung (Pixel Refresh) im Monitor-OSD ausführen",
    "Taskleiste im Betriebssystem automatisch ausblenden und Helligkeit drosseln",
    "Bildschirmschoner oder Bildschirmsperre nach 5 Minuten Inaktivität aktivieren"
  ],
  "whenToStop": "Wenn die Schatten nach mehreren Reinigungszyklen unverändert bleiben, liegt dauerhafter Burn-In vor, der nur durch einen Paneltausch behoben werden kann."
},
{
  "id": "temporal-dithering-pixel-inversion",
  "title": "Temporäres Dithering (FRC) & Pixel-Inversions-Flimmern",
  "category": "pixels",
  "categoryTitle": "Pixel-Probleme",
  "symptom": "Mikroskopisches Schimmern, Zeilenkriechen oder starke Augenermüdung und Kopfschmerzen bei mittleren Farbtönen.",
  "possibleCauses": [
    "Frame Rate Control (FRC) wechselt Farbstufen mit der Bildwiederholrate",
    "VCOM-Polaritätsungleichgewicht bei Pixel-Inversionsmustern",
    "Erzwungenes Dithering im Grafikkartentreiber"
  ],
  "checks": [
    "Feine 1-Pixel-Gitter auf Flimmern oder Bewegungsartefakte prüfen",
    "Bildwiederholrate testweise von 144Hz auf 120Hz/60Hz umstellen",
    "Display mit Zeitlupenaufnahme auf Pulsieren untersuchen"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester erzeugt Phasenmuster für Pixelinversion und Dithering, um Mikromodulationen sichtbar zu machen.",
    "links": [
      {
        "label": "Pixel-Inversions-Test",
        "testId": "pixel-inversion-test",
        "testPath": "/tests/pixel-inversion-test"
      },
      {
        "label": "Temporäres-Dithering-Test",
        "testId": "temporal-dithering-test",
        "testPath": "/tests/temporal-dithering-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Interne Spannungseinstellung des VCOM-Potentiometers"
  ],
  "actions": [
    "Aktualisierungsrate im Betriebssystem wechseln",
    "Farbtiefe im Grafiktreiber auf native Panelwerte einstellen",
    "Bei Flimmerempfindlichkeit auf Monitore mit echtem 8-Bit/10-Bit-Panel umsteigen"
  ],
  "whenToStop": "Bei Schwindel oder Migräne sofort pausieren."
},
{
  "id": "color-calibration-issues",
  "title": "Farbkalibrierung, Farbraum-Clamping & Farbstiche",
  "category": "imageQuality",
  "categoryTitle": "Bildqualität",
  "symptom": "Übersättigte Neon-Farben, unnatürliche Hauttöne oder Farbunterschiede zwischen Programmen.",
  "possibleCauses": [
    "Wide-Gamut-Display (DCI-P3) ohne sRGB-Farbraumbegrenzung im SDR-Modus",
    "Fehlerhafte oder kollidierende ICC-Farbprofile im Betriebssystem",
    "Falsche Voreinstellungen für Farbtemperatur oder Gamma im Monitor-OSD"
  ],
  "checks": [
    "Genormte Farbfelder auf Überstrahlung oder unnatürliche Sättigung prüfen",
    "Weiße Flächen auf Grün-, Rosa- oder Gelbstich untersuchen",
    "Farbmanagement des Betriebssystems auf Standard-Profile prüfen"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester bietet Farbraum-Vergleiche, Farbgenauigkeits-Felder, Sättigungsrampen und D65-Farbtemperatur-Referenzen.",
    "links": [
      {
        "label": "Farbraum-Test",
        "testId": "color-gamut-test",
        "testPath": "/tests/color-gamut-test"
      },
      {
        "label": "Farbgenauigkeits-Test",
        "testId": "color-accuracy-test",
        "testPath": "/tests/color-accuracy-test"
      },
      {
        "label": "Farbtemperatur-Test",
        "testId": "color-temperature-test",
        "testPath": "/tests/color-temperature-test"
      },
      {
        "label": "Sättigungs-Test",
        "testId": "saturation-test",
        "testPath": "/tests/saturation-test"
      },
      {
        "label": "Farbenblindheits-Test",
        "testId": "color-blindness-test",
        "testPath": "/tests/color-blindness-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Exakte Delta-E-Messwerte ohne Kolorimeter"
  ],
  "actions": [
    "sRGB-Modus im OSD aktivieren, um Übersättigung bei normalen Inhalten zu verhindern",
    "Hardware-Kalibriergerät für präzise ICC-Profile nutzen",
    "Grafikkarten-Farbverstärker (z. B. Digitale Schwingung) auf Standard setzen"
  ],
  "whenToStop": "Für farbkritische Druck- und Videoproduktion ist ein Hardware-Messkopf unerlässlich."
},
{
  "id": "gamma-black-crush-blown-whites",
  "title": "Schwarzwert-Crushing, Überstrahlte Lichter & Gamma-Fehler",
  "category": "imageQuality",
  "categoryTitle": "Bildqualität",
  "symptom": "Schatten saufen im reinen Schwarz ab (Black Crush) oder helle Wolken brennen zu strukturlosem Weiß aus.",
  "possibleCauses": [
    "Gamma-Kurve weicht stark vom Standardwert 2.2 ab",
    "Falscher HDMI-Dynamikbereich (Begrenzt 16-235 vs. Voll 0-255)",
    "Zu hoher Kontrast im Monitor-Menü schneidet helle Stufen ab"
  ],
  "checks": [
    "Schwarzstufen-Test prüfen: Sind Stufen 1 bis 5 vom Hintergrund unterscheidbar?",
    "Weißstufen-Test prüfen: Sind die Stufen 250 bis 254 sichtbar?",
    "Optischen Gamma-Test auf Übereinstimmung bei 2.2 prüfen"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester zeigt 256-stufige Graukeile, Near-Black-Felder und optische Gamma-Messstreifen.",
    "links": [
      {
        "label": "Schwarzwert-Test",
        "testId": "black-level-test",
        "testPath": "/tests/black-level-test"
      },
      {
        "label": "Weißwert-Test",
        "testId": "white-level-test",
        "testPath": "/tests/white-level-test"
      },
      {
        "label": "Graustufen-Test",
        "testId": "grayscale-test",
        "testPath": "/tests/grayscale-test"
      },
      {
        "label": "Gamma-Test",
        "testId": "gamma-test",
        "testPath": "/tests/gamma-test"
      },
      {
        "label": "Dark-Mode-Test",
        "testId": "dark-mode-test",
        "testPath": "/tests/dark-mode-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Interne LUT-Bittiefe des Monitor-Skalierers"
  ],
  "actions": [
    "Im Grafiktreiber Dynamikbereich auf 'Voll (0-255)' einstellen",
    "Monitor-Kontrast reduzieren (meist 50-70), bis Weißabstufungen sichtbar sind",
    "Im Monitor-OSD Gamma auf '2.2' stellen"
  ],
  "whenToStop": "Sobald dunkelste und hellste Nuancen differenzierbar sind, ist das Display optimal eingestellt."
},
{
  "id": "oled-abl-blooming-hdr-peak",
  "title": "OLED-ABL-Dimmung & Mini-LED-Blooming (Lichthöfe)",
  "category": "imageQuality",
  "categoryTitle": "Bildqualität",
  "symptom": "Bild verdunkelt sich beim Vergrößern weißer Fenster (ABL) oder helle Objekte zeigen leuchtende Lichthöfe auf schwarzem Grund (Blooming).",
  "possibleCauses": [
    "OLED-Auto-Brightness-Limiter (ABL) drosselt Helligkeit bei hohem Weißanteil",
    "Mini-LED-Dimmzonen streuen Licht um kleine Spitzlichter",
    "Falsches HDR-Tone-Mapping im Betriebssystem"
  ],
  "checks": [
    "Fenstergrößen von 1% bis 100% umschalten, um Helligkeitssprünge zu beobachten",
    "Weiße Objekte auf schwarzem Grund auf Ausleuchtungskränze prüfen",
    "Spitzenhelligkeit bei 10% Fenster mit Vollbild vergleichen"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester testet fenstergrößenabhängigen Helligkeitsabfall, ABL-Kurven und Blooming-Effekte bei Mini-LED.",
    "links": [
      {
        "label": "OLED-ABL-Test",
        "testId": "oled-abl-test",
        "testPath": "/tests/oled-abl-test"
      },
      {
        "label": "HDR-Spitzenhelligkeits-Test",
        "testId": "hdr-peak-brightness-test",
        "testPath": "/tests/hdr-peak-brightness-test"
      },
      {
        "label": "Blooming-Test",
        "testId": "blooming-test",
        "testPath": "/tests/blooming-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Exakte Nit-Werte ohne Sensor"
  ],
  "actions": [
    "Modus 'Gleichmäßige Helligkeit' im OLED-Menü einschalten",
    "Local Dimming bei Mini-LED auf 'Mittel' stellen, um Halos zu minimieren",
    "Windows HDR-Kalibrierung ausführen"
  ],
  "whenToStop": "Leichtes Blooming ist eine physikalische Eigenschaft von FALD-Zonenhintergrundbeleuchtungen."
},
{
  "id": "response-time-motion-blur-crosstalk",
  "title": "Reaktionszeit, Bewegungsunschärfe & Strobe-Crosstalk",
  "category": "display",
  "categoryTitle": "Display-Probleme",
  "symptom": "Schnell bewegte Objekte ziehen dunkle Schlieren, Geisterbilder oder helle Heiligenscheine (Overshoot) hinter sich her.",
  "possibleCauses": [
    "Langsame Grau-zu-Grau-Schaltzeiten (GtG), besonders bei dunklen Übergängen auf VA-Panels",
    "Übersteuertes Monitor-Overdrive erzeugt inverse Geisterbilder",
    "Blacklight-Strobing (BFI) nicht synchron mit dem Bildaufbau (Strobe-Crosstalk)"
  ],
  "checks": [
    "GtG-Test auf dunkle Nachzieheffekte bei Kontrastübergängen prüfen",
    "UFO-Testmuster auf dunkle (Ghosting) oder helle (Overshoot) Nachziehränder prüfen",
    "Bildschirm oben, mittig und unten bei aktiviertem Strobing auf Doppelbilder prüfen"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester bietet Hochgeschwindigkeits-Testmuster, GtG-Farbübergänge und Pursuit-Camera-Synchronisationsbalken.",
    "links": [
      {
        "label": "GtG-Reaktionszeit-Test",
        "testId": "gtg-response-time-test",
        "testPath": "/tests/gtg-response-time-test"
      },
      {
        "label": "Strobe-Crosstalk-Test",
        "testId": "strobe-crosstalk-test",
        "testPath": "/tests/strobe-crosstalk-test"
      },
      {
        "label": "Pursuit-Camera-Test",
        "testId": "pursuit-camera-test",
        "testPath": "/tests/pursuit-camera-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Oszilloskop-Spannungsmessungen im Submillisekundenbereich"
  ],
  "actions": [
    "Overdrive-Stufe im Monitor-OSD auf 'Normal' oder 'Fast' anstelle von 'Extreme' stellen",
    "Strobe-Phase oder Impulsbreite im OSD feinjustieren",
    "Sicherstellen, dass die FPS der GPU der Bildwiederholrate entsprechen"
  ],
  "whenToStop": "Optimale Einstellung erreicht, wenn helle Koronen verschwinden und das Zentrum scharf bleibt."
},
{
  "id": "input-lag-gaming-responsiveness",
  "title": "Hoher Input-Lag, schwammige Maus & Gaming-Verzögerung",
  "category": "display",
  "categoryTitle": "Display-Probleme",
  "symptom": "Die Maus fühlt sich träge und schwammig an, als würde der Cursor der Handbewegung hinterherhinken.",
  "possibleCauses": [
    "Bildverbesserer, Zwischenbildberechnung oder Upscaler im Monitor/TV aktiv",
    "Klassisches V-Sync puffert mehrere Frames in der Grafik-Pipeline",
    "Niedrige Maus-Abtastrate (125Hz) oder überlastete GPU"
  ],
  "checks": [
    "Maus-Polling-Rate in Screen Tester testen (sollte 500Hz oder 1000Hz betragen)",
    "Reaktionszeit- und Input-Lag-Test durchführen",
    "Prüfen, ob am Bildschirm der 'Spielmodus' aktiviert ist"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester misst USB-Mausabfrageraten, visuelle Reaktionszeiten und WebGL-GPU-Leistung.",
    "links": [
      {
        "label": "Input-Lag-Test",
        "testId": "input-lag-test",
        "testPath": "/tests/input-lag-test"
      },
      {
        "label": "Reaktionszeit-Test",
        "testId": "reaction-time-test",
        "testPath": "/tests/reaction-time-test"
      },
      {
        "label": "Maus-Polling-Test",
        "testId": "mouse-polling-test",
        "testPath": "/tests/mouse-polling-test"
      },
      {
        "label": "GPU-Benchmark-Test",
        "testId": "gpu-benchmark-test",
        "testPath": "/tests/gpu-benchmark-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Exakte Schalter-zu-Photonen-Latenz ohne Hardware-Maus-Sensor"
  ],
  "actions": [
    "Am Monitor/Fernseher den 'Spielmodus' (Game Mode) aktivieren",
    "Klassisches V-Sync deaktivieren und Nvidia Reflex / AMD Anti-Lag nutzen",
    "Maus-Polling-Rate in der Herstellersoftware auf 1000Hz stellen"
  ],
  "whenToStop": "Eine Latenz unter 15 ms fühlt sich unmittelbar und direkt an."
},
{
  "id": "dual-monitor-color-mismatch",
  "title": "Dual-Monitor-Farbunterschiede & Ausrichtungsfehler",
  "category": "display",
  "categoryTitle": "Display-Probleme",
  "symptom": "Zwei nebeneinanderstehende Monitore zeigen unterschiedliche Weißtöne oder Helligkeiten beim Verschieben von Fenstern.",
  "possibleCauses": [
    "Unterschiedliche Panel-Typen (z. B. IPS neben VA oder OLED)",
    "Unterschiedliche Farbtemperaturen der beiden Monitore",
    "Grafikkarte gibt unterschiedliche Farbformate aus (RGB vs. YCbCr)"
  ],
  "checks": [
    "Ein weißes Fenster mittig über beide Monitore spannen, um den Farbsprung an der Kante zu sehen",
    "Compare-Displays-Tool auf beiden Monitoren öffnen",
    "Farbformate im Grafiktreiber vergleichen"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester bietet synchrone Vergleichsmuster und das Dual-Monitor-Matcher-Werkzeug.",
    "links": [
      {
        "label": "Displays vergleichen",
        "testId": "compare-displays",
        "testPath": "/tests/compare-displays"
      },
      {
        "label": "Benutzerdefiniertes Muster",
        "testId": "custom-pattern",
        "testPath": "/tests/custom-pattern"
      },
      {
        "label": "Dual-Monitor-Matcher",
        "testId": "dual-monitor-matcher",
        "testPath": "/tools/dual-monitor-matcher"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Physikalischer Metamerie-Index unterschiedlicher Panel-Filter"
  ],
  "actions": [
    "Nutzen Sie den Dual-Monitor-Matcher zur visuellen Feinabstimmung der RGB-Werte",
    "Beide Monitore im OSD auf den Modus '6500K' oder 'Warm' stellen",
    "Helligkeit beider Panels auf gleiches Niveau einpegeln"
  ],
  "whenToStop": "Sobald der Weißton beider Monitore harmonisch wirkt, ist das Setup optimal."
},
{
  "id": "gamepad-controller-issues",
  "title": "Gamepad-Stick-Drift, Tastenlatenz & Deadzone-Probleme",
  "category": "deviceInput",
  "categoryTitle": "Geräte- & Eingabeprobleme",
  "symptom": "Controller-Analogsticks bewegen sich von selbst (Stick Drift) oder Tasten reagieren unzuverlässig.",
  "possibleCauses": [
    "Abgenutzte Potentiometer-Schleifbahnen im Analogstick",
    "Zu kleine Deadzone-Einstellungen im Spiel",
    "Funkstörungen bei Bluetooth-Verbindung"
  ],
  "checks": [
    "Gamepad-Test in Screen Tester öffnen und Taste zum Aktivieren drücken",
    "Prüfen, ob die Stick-Koordinaten in Ruhe exakt auf (0.00, 0.00) stehen",
    "Trigger-Achsen von 0% bis 100% auf gleichmäßigen Verlauf testen"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester liest die HTML5-Gamepad-API aus, um Stick-Drift, Tastendrücke, Trigger-Werte und Vibration zu testen.",
    "links": [
      {
        "label": "Gamepad-Test",
        "testId": "gamepad-test",
        "testPath": "/tests/gamepad-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Mechanische Schalterabnutzung im Gehäuse"
  ],
  "actions": [
    "Deadzone im Spiel leicht vergrößern, um kleines Driften abzufangen",
    "Kontaktreiniger verwenden oder Controller mit Hall-Effekt-Sensoren wählen",
    "Kabelverbindung oder USB-Funkadapter statt Bluetooth nutzen"
  ],
  "whenToStop": "Driftet der Stick im Ruhezustand um mehr als 15%, ist ein Hardware-Tausch erforderlich."
},
{
  "id": "audio-video-sync-latency",
  "title": "Ton-Bild-Asynchronität (Lip-Sync) & Bluetooth-Latenz",
  "category": "deviceInput",
  "categoryTitle": "Geräte- & Eingabeprobleme",
  "symptom": "Lippenbewegungen in Filmen passen nicht zum Ton oder Schussgeräusche in Spielen ertönen verspätet.",
  "possibleCauses": [
    "Hohe Bluetooth-Latenz (SBC/AAC verursacht 150-250 ms Verzögerung)",
    "Verzögerung durch Soundbar oder HDMI-eARC-Audioprozessoren",
    "Aktive Raumklangeffekte im Betriebssystem"
  ],
  "checks": [
    "Audio-Sync-Test prüfen: Ertönt der Klick genau beim visuellen Aufprall?",
    "Puffergröße im Audio-Latenz-Test ablesen",
    "Bluetooth mit kabelgebundenem Kopfhörer vergleichen"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester bietet visuell-akustische Synchronisationsprüfungen und Pufferlatenz-Messungen.",
    "links": [
      {
        "label": "Audio-Sync-Test",
        "testId": "audio-sync-test",
        "testPath": "/tests/audio-sync-test"
      },
      {
        "label": "Audio-Latenz-Test",
        "testId": "audio-latency-test",
        "testPath": "/tests/audio-latency-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Schalllaufzeit durch den Raum"
  ],
  "actions": [
    "Für Gaming kabelgebundene Kopfhörer oder 2,4-GHz-Funk nutzen",
    "Audio-Delay (Lip-Sync-Verzögerung) in den TV- oder Receiver-Einstellungen anpassen",
    "Audioverbesserungen im Betriebssystem abschalten"
  ],
  "whenToStop": "Eine Differenz unter 40 ms wird vom Gehirn als perfekt synchron wahrgenommen."
},
{
  "id": "sensor-ambient-battery-hardware",
  "title": "Umgebungslichtsensor, Akku-Drosselung & Netzwerk-Ruckler",
  "category": "deviceInput",
  "categoryTitle": "Geräte- & Eingabeprobleme",
  "symptom": "Bildschirm dunkelt am Laptop plötzlich ab, Bildwiederholrate fällt im Akkubetrieb auf 60Hz oder Streams stocken.",
  "possibleCauses": [
    "Umgebungslichtsensor regelt Displayhelligkeit automatisch herunter",
    "Energiesparmodus drosselt GPU-Takt und begrenzt die Bildwiederholrate",
    "WLAN-Verbindungsstörungen oder hohe Latenzschwankungen"
  ],
  "checks": [
    "Lichtsensor am Laptop abdecken und Lux-Wert in Screen Tester prüfen",
    "Netzteil abziehen und prüfen, ob die Bildwiederholrate einbricht",
    "Netzwerktest zur Messung von Bandbreite und Ping-Jitter durchführen"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester liest Lichtsensoren (Lux), Batteriestatus-APIs und Netzwerkübertragungsraten aus.",
    "links": [
      {
        "label": "Umgebungslicht-Test",
        "testId": "ambient-light-test",
        "testPath": "/tests/ambient-light-test"
      },
      {
        "label": "Batterie-Test",
        "testId": "battery-test",
        "testPath": "/tests/battery-test"
      },
      {
        "label": "Netzwerk-Speedtest",
        "testId": "network-speed-test",
        "testPath": "/tests/network-speed-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Chemischer Verschleiß der Akkuzellen"
  ],
  "actions": [
    "Automatische Helligkeitsanpassung in den Windows-Anzeigeeinstellungen deaktivieren",
    "Energieprofil im Akkubetrieb auf 'Beste Leistung' stellen",
    "WLAN auf 5GHz/6GHz umstellen oder LAN-Kabel nutzen"
  ],
  "whenToStop": "Stabile Helligkeit und konstante Bildwiederholrate garantieren zuverlässigen Betrieb."
},
{
  "id": "monitor-setup-bandwidth-calibration",
  "title": "Kabel-Bandbreitenengpässe, DPI-Skalierung & OSD-Kalibrierung",
  "category": "display",
  "categoryTitle": "Display-Probleme",
  "symptom": "Maximale Bildwiederholrate bei 4K nicht anwählbar, Text zu klein oder Kabel verliert zeitweise das Signal.",
  "possibleCauses": [
    "HDMI- oder DisplayPort-Kabel überschreitet maximale Datenrate (z. B. HDMI 2.0 für 4K 144Hz)",
    "Falscher Skalierungsfaktor im Betriebssystem erzeugt unscharfe Fenster",
    "Ungünstige OSD-Voreinstellungen ab Werk"
  ],
  "checks": [
    "Benötigte Bandbreite im Bandbreitenrechner ermitteln",
    "Optimalen Betrachtungsabstand und Pixeldichte im DPI-Rechner prüfen",
    "Neumonitor-Assistenten zur systematischen OSD-Einrichtung durchlaufen"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester bietet Werkzeuge zur Bandbreitenberechnung (HDMI/DP/DSC), Pixeldichtebestimmung, ergonomischen Abstandsermittlung und Zertifikatserstellung.",
    "links": [
      {
        "label": "Neumonitor-Assistent",
        "testId": "new-monitor-wizard",
        "testPath": "/tools/new-monitor-wizard"
      },
      {
        "label": "DPI-Rechner",
        "testId": "dpi-calculator",
        "testPath": "/tools/dpi-calculator"
      },
      {
        "label": "Display-Bandbreitenrechner",
        "testId": "display-bandwidth-calculator",
        "testPath": "/tools/display-bandwidth-calculator"
      },
      {
        "label": "Betrachtungsabstand-Rechner",
        "testId": "viewing-distance-calculator",
        "testPath": "/tools/viewing-distance-calculator"
      },
      {
        "label": "Bildschirmrekorder",
        "testId": "screen-recorder",
        "testPath": "/tools/screen-recorder"
      },
      {
        "label": "Display-Zertifikat",
        "testId": "display-certificate",
        "testPath": "/tools/display-certificate"
      },
      {
        "label": "OSD-Kalibrierungsleitfaden",
        "testId": "osd-calibration-guide",
        "testPath": "/tools/osd-calibration-guide"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Physikalische Kupfer-Schirmungsqualität"
  ],
  "actions": [
    "Auf zertifiziertes DisplayPort 1.4/2.1 oder Ultra High Speed HDMI 2.1 Kabel aufrüsten",
    "Windows-Skalierung passend zur Pixeldichte einstellen",
    "OSD-Leitfaden für Kontrast, Farbtemperatur und Helligkeit anwenden"
  ],
  "whenToStop": "Volle native Auflösung und maximale Frequenz laufen stabil ohne Aussetzer."
},
{
  "id": "eink-ghosting-slow-refresh",
  "title": "E-Ink-Display-Ghosting, Schattenbildung & träger Bildaufbau",
  "category": "imageQuality",
  "categoryTitle": "Bildqualität",
  "symptom": "Schatten von vorherigen Buchseiten oder Menüleisten bleiben auf dem E-Reader sichtbar.",
  "possibleCauses": [
    "Restladungen in den elektrophoretischen Mikrokapseln halten Partikel fest",
    "Nutzung von schnellen A2-Modi, die Partikelrückstellung überspringen",
    "Kühle Umgebungstemperaturen verlangsamen die Partikelbewegung"
  ],
  "checks": [
    "Hintergrund prüfen: Reines Papierweiß oder graue Schattenschleier?",
    "E-Ink-Auffrischungswerkzeug in Screen Tester starten",
    "Sicherstellen, dass die Raumtemperatur über 18°C liegt"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester erzeugt kontrollierte Schwarz-Weiß-Invertierungspulse zur Rückstellung der Farbpartikel.",
    "links": [
      {
        "label": "E-Ink-Auffrischungswerkzeug",
        "testId": "eink-refresh-tool",
        "testPath": "/tools/eink-refresh-tool"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Proprietäre Wellenformtabellen des Controllers"
  ],
  "actions": [
    "Mehrere Invertierungszyklen im E-Ink-Werkzeug durchführen",
    "Im Reader einstellen, dass alle 5-10 Seiten ein Vollbild-Refresh erfolgt",
    "Für Text den Qualitäts- statt Geschwindigkeitsmodus wählen"
  ],
  "whenToStop": "Sobald der Hintergrund wieder sauber und weiß ist, ist das Display vollständig erholt."
}
];
