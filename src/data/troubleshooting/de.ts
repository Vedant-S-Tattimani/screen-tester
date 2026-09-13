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
  }
];
