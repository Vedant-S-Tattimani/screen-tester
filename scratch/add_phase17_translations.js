/* eslint-disable */
const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../messages');
const locales = ['en', 'de', 'es', 'fr', 'hi', 'ja', 'ko', 'pt'];

const translations = {
  en: {
    TestPages_mic: {
      metaTitle: "Microphone Test – Online Mic Check, Live Level & Audio Waveform Inspection",
      metaDescription: "Test your microphone and audio input online. Live audio level meter, waveform oscilloscope, digital clipping indicator, and 100% private in-browser loopback test.",
      title: "Microphone Test",
      description_p1: "Verify microphone hardware connectivity, browser audio capture, and live input amplitude. Audio data remains strictly within device memory; zero sound is recorded, processed by AI, or sent across the network.",
      instructions: [
        "<strong>START MICROPHONE:</strong> Click 'Start Microphone' and allow browser audio access when prompted (video is never requested).",
        "<strong>INPUT LEVEL & WAVEFORM:</strong> Speak or make sound toward the microphone. Verify that the waveform oscillates and the live input meter registers between 30% and 80%.",
        "<strong>LOOPBACK CHECK & OBSERVATION:</strong> Use the 5-second loopback test to hear your voice through your speakers or headphones, then record your acoustic evaluation."
      ]
    },
    Tests_mic: {
      title: "Microphone Test",
      description: "Verify microphone input functionality, live level metering, waveform activity, and digital clipping."
    },
    Tools_voiceRecorder: {
      title: "Voice Recorder",
      description: "Record voice notes and audio clips in browser memory with pause, resume, instant playback, and local download.",
      badge: "LOCAL AUDIO"
    },
    MicrophoneTest: {
      title: "Microphone Test",
      labels: {
        status: "Status",
        selectMicrophone: "Select microphone",
        liveWaveform: "Live Audio Input Waveform",
        possibleClipping: "Possible Clipping (Input > 95%)",
        silenceDetected: "Silence / No Input Detected",
        inputDetected: "Input Active",
        browserReportedLevel: "Browser-reported input level",
        peak: "Peak"
      },
      states: {
        active: "Live Input Stream",
        requesting: "Requesting Microphone...",
        idle: "Ready to Test",
        permissionDenied: "Microphone Permission Blocked",
        notFound: "No Microphone Detected",
        inUse: "Microphone In Use / Locked",
        unsupported: "getUserMedia Unsupported",
        error: "Hardware Access Error"
      },
      buttons: {
        startMicrophone: "Start Microphone",
        stopMicrophone: "Stop Microphone",
        retryPermission: "Retry Permission",
        refreshDevices: "Scan Devices"
      },
      idle: {
        title: "Test Your Microphone Hardware",
        description: "Click below to request microphone access. Screen Tester evaluates live PCM audio signal amplitude, waveform shape, and input clipping in local device RAM."
      },
      denied: {
        title: "Microphone Access Was Blocked",
        description: "Your browser or operating system denied microphone access. Click the microphone/tune icon in your browser URL address bar and choose 'Allow', then retry."
      },
      notFound: {
        title: "No Microphone Hardware Found",
        description: "No audio input devices were detected by the operating system. Verify your USB or 3.5mm microphone connection or check physical privacy switches."
      },
      loopback: {
        title: "Audio Loopback Check",
        description: "Record a quick 5-second test sample to listen back to your voice through your speakers or headphones.",
        startRecordSample: "Record 5s Sample",
        recordingCountdown: "Recording... {seconds}s",
        playSample: "Play Sample",
        stopPlayback: "Stop Playback",
        verifySpeakers: "Test Speakers"
      },
      telemetry: {
        title: "Hardware Audio Telemetry",
        channels: "Channel Count",
        sampleRate: "Sample Rate",
        noiseSuppression: "Noise Suppression",
        echoCancellation: "Echo Cancellation"
      },
      badges: {
        browserReported: "Browser Reported"
      },
      observation: {
        title: "User Acoustic Observation (Mandatory Human Check)",
        description: "The browser evaluates digital PCM signal amplitude, but cannot measure physical acoustic distortion or room SPL decibels. How does the input behave?",
        recordedBadge: "Recorded",
        workingNormally: "Working normally",
        inputDetected: "Input detected",
        lowInput: "Low input volume",
        noInput: "No input / Silent",
        possibleClipping: "Clipping / Distorted",
        unsure: "Unsure"
      },
      privacy: {
        title: "Privacy & Client-Side Sandbox",
        notice: "Audio is processed purely in your browser's local memory (RAM) via the Web Audio API. Zero audio streams or recordings are transmitted to any cloud servers."
      },
      errors: {
        failedToAccess: "Failed to access microphone hardware."
      }
    },
    VoiceRecorder: {
      metaTitle: "Voice Recorder – Free Online Audio & Mic Recording Tool (100% Private)",
      metaDescription: "Record voice notes and audio clips directly in your browser. Pause, resume, playback, and download audio files locally. 100% private client-side recording.",
      header: {
        eyebrow: "Online Audio Tool",
        title: "Voice Recorder",
        subtitle: "A lightweight, zero-install voice recorder operating entirely within your browser memory. Pause, resume, listen to instant playback, and download audio locally."
      },
      labels: {
        microphone: "Microphone Input",
        defaultMicrophone: "System Default Microphone"
      },
      states: {
        recording: "Recording",
        paused: "Paused",
        completed: "Recording Ready",
        ready: "Ready to Record"
      },
      buttons: {
        startRecording: "Start Recording",
        pause: "Pause",
        resume: "Resume",
        stop: "Finish Recording",
        downloadRecording: "Download Recording",
        recordAgain: "Record Again",
        delete: "Delete"
      },
      privacy: {
        title: "Client-Side Privacy Standard",
        notice: "Voice recordings are created in local device memory via the MediaRecorder API. No audio is ever uploaded, transcribed by external servers, or stored remotely.",
        limitTitle: "Duration Limit",
        limitNotice: "Recordings are capped at 5 minutes to prevent uncontrolled memory allocation during diagnostic testing."
      },
      errors: {
        permissionDenied: "Microphone permission was denied. Please allow microphone access in your browser settings.",
        deviceNotFound: "No microphone device was detected.",
        startFailed: "Failed to start recording."
      }
    }
  },
  de: {
    TestPages_mic: {
      metaTitle: "Mikrofon-Test – Online-Mikrofonprüfung, Pegelanzeige & Wellenform",
      metaDescription: "Testen Sie Ihr Mikrofon online. Echtzeit-Eingangspegelanzeige, Wellenform-Oszilloskop, Clipping-Erkennung und 100% privater lokaler Loopback-Test.",
      title: "Mikrofon-Test",
      description_p1: "Überprüfen Sie die Hardware-Verbindung, den Audio-Stream und den Eingangspegel Ihres Mikrofons. Audiodaten verbleiben ausschließlich im lokalen Gerätespeicher; es wird nichts auf Server übertragen.",
      instructions: [
        "<strong>MIKROFON STARTEN:</strong> Klicken Sie auf 'Mikrofon starten' und erlauben Sie den Mikrofonzugriff (Video wird niemals angefordert).",
        "<strong>PEGEL & WELLENFORM:</strong> Sprechen Sie in das Mikrofon. Prüfen Sie, ob die Wellenform ausschlägt und der Pegelmesser zwischen 30 % und 80 % anzeigt.",
        "<strong>LOOPBACK-TEST:</strong> Nehmen Sie eine 5-sekündige Hörprobe auf, um Ihre Stimme über Lautsprecher oder Kopfhörer zu überprüfen."
      ]
    },
    Tests_mic: {
      title: "Mikrofon-Test",
      description: "Prüfen Sie die Mikrofonfunktion, Live-Pegelanzeige, Wellenform und digitale Übersteuerung."
    },
    Tools_voiceRecorder: {
      title: "Sprachrekorder",
      description: "Sprachmemos und Audioaufnahmen im Browserspeicher aufnehmen mit Pause, Fortsetzen, Wiedergabe und Download.",
      badge: "LOKALES AUDIO"
    },
    MicrophoneTest: {
      title: "Mikrofon-Test",
      labels: {
        status: "Status",
        selectMicrophone: "Mikrofon wählen",
        liveWaveform: "Live-Audio-Wellenform",
        possibleClipping: "Mögliche Übersteuerung (Eingang > 95 %)",
        silenceDetected: "Stille / Kein Eingang erkannt",
        inputDetected: "Signal aktiv",
        browserReportedLevel: "Vom Browser gemeldeter Eingangspegel",
        peak: "Spitze"
      },
      states: {
        active: "Live-Eingangssignal",
        requesting: "Mikrofon anfordern...",
        idle: "Testbereit",
        permissionDenied: "Mikrofonzugriff blockiert",
        notFound: "Kein Mikrofon gefunden",
        inUse: "Mikrofon blockiert / in Benutzung",
        unsupported: "getUserMedia nicht unterstützt",
        error: "Hardware-Zugriffsfehler"
      },
      buttons: {
        startMicrophone: "Mikrofon starten",
        stopMicrophone: "Mikrofon stoppen",
        retryPermission: "Berechtigung wiederholen",
        refreshDevices: "Geräte suchen"
      },
      idle: {
        title: "Mikrofon-Hardware testen",
        description: "Klicken Sie unten, um den Mikrofonzugriff zu aktivieren. Screen Tester analysiert das PCM-Signal, Wellenform und Übersteuerungen im lokalen RAM."
      },
      denied: {
        title: "Mikrofonzugriff verweigert",
        description: "Ihr Browser hat den Zugriff verweigert. Klicken Sie auf das Mikrofonsymbol in der Adressleiste, wählen Sie 'Zulassen' und versuchen Sie es erneut."
      },
      notFound: {
        title: "Kein Mikrofon erkannt",
        description: "Es wurde kein Audioeingangsgerät vom Betriebssystem gefunden. Überprüfen Sie Kabelverbindungen und physische Stummschalter."
      },
      loopback: {
        title: "Audio-Loopback-Hörprobe",
        description: "Nehmen Sie eine kurze 5-sekündige Probe auf, um Ihre Stimme direkt über Lautsprecher oder Kopfhörer abzuhören.",
        startRecordSample: "5s Probe aufnehmen",
        recordingCountdown: "Aufnahme... {seconds}s",
        playSample: "Probe abspielen",
        stopPlayback: "Wiedergabe stoppen",
        verifySpeakers: "Lautsprecher testen"
      },
      telemetry: {
        title: "Hardware-Audio-Telemetrie",
        channels: "Kanäle",
        sampleRate: "Abtastrate",
        noiseSuppression: "Rauschunterdrückung",
        echoCancellation: "Echounterdrückung"
      },
      badges: {
        browserReported: "Vom Browser gemeldet"
      },
      observation: {
        title: "Akustische Benutzerbeobachtung (Menschliche Prüfung)",
        description: "Der Browser prüft digitale PCM-Pegel, kann aber keine physische Raumakustik messen. Wie verhält sich der Eingang?",
        recordedBadge: "Gespeichert",
        workingNormally: "Funktioniert normal",
        inputDetected: "Eingang erkannt",
        lowInput: "Niedrige Lautstärke",
        noInput: "Kein Ton / Stille",
        possibleClipping: "Verzerrt / Übersteuert",
        unsure: "Unsicher"
      },
      privacy: {
        title: "Datenschutz & Lokale Verarbeitung",
        notice: "Audiodaten werden ausschließlich im lokalen Speicher (RAM) verarbeitet. Keine Streams oder Aufnahmen werden an Cloud-Server gesendet."
      },
      errors: {
        failedToAccess: "Zugriff auf die Mikrofon-Hardware fehlgeschlagen."
      }
    },
    VoiceRecorder: {
      metaTitle: "Sprachrekorder – Kostenloses Online-Audiotool (100% Privat)",
      metaDescription: "Sprachaufnahmen direkt im Browser erstellen. Pausieren, fortsetzen, anhören und lokal herunterladen. 100% privat ohne Server-Upload.",
      header: {
        eyebrow: "Online-Audio-Werkzeug",
        title: "Sprachrekorder",
        subtitle: "Ein schlanker Sprachrekorder, der vollständig im Browserspeicher arbeitet. Aufnehmen, pausieren, sofort anhören und lokal speichern."
      },
      labels: {
        microphone: "Mikrofoneingang",
        defaultMicrophone: "Standard-Mikrofon"
      },
      states: {
        recording: "Aufnahme läuft",
        paused: "Pausiert",
        completed: "Aufnahme fertig",
        ready: "Bereit zur Aufnahme"
      },
      buttons: {
        startRecording: "Aufnahme starten",
        pause: "Pause",
        resume: "Fortsetzen",
        stop: "Aufnahme beenden",
        downloadRecording: "Aufnahme herunterladen",
        recordAgain: "Erneut aufnehmen",
        delete: "Löschen"
      },
      privacy: {
        title: "Lokaler Datenschutzstandard",
        notice: "Sprachaufnahmen entstehen im RAM über die MediaRecorder-API. Keine Audiodaten werden hochgeladen oder auf Servern gespeichert.",
        limitTitle: "Zeitlimit",
        limitNotice: "Aufnahmen sind auf 5 Minuten begrenzt, um den lokalen Speicher zu schonen."
      },
      errors: {
        permissionDenied: "Mikrofonberechtigung wurde verweigert. Bitte in den Browsereinstellungen aktivieren.",
        deviceNotFound: "Kein Mikrofon gefunden.",
        startFailed: "Aufnahme konnte nicht gestartet werden."
      }
    }
  },
  es: {
    TestPages_mic: {
      metaTitle: "Prueba de Micrófono – Verificación Online, Medidor de Nivel y Onda de Audio",
      metaDescription: "Prueba tu micrófono online. Medidor de nivel en tiempo real, osciloscopio de onda, indicador de saturación y prueba de reproducción local 100% privada.",
      title: "Prueba de Micrófono",
      description_p1: "Verifica la conexión del micrófono, la captura de audio y la amplitud en tiempo real. Los datos de audio permanecen únicamente en la memoria local del dispositivo; ningún sonido se transmite por la red.",
      instructions: [
        "<strong>INICIAR MICRÓFONO:</strong> Haz clic en 'Iniciar micrófono' y permite el acceso al audio cuando el navegador lo solicite.",
        "<strong>NIVEL Y FORMA DE ONDA:</strong> Habla hacia el micrófono. Comprueba que la onda oscile y que el medidor marque entre 30% y 80%.",
        "<strong>REPRODUCCIÓN Y OBSERVACIÓN:</strong> Graba una muestra de 5 segundos para escuchar tu voz por los altavoces o auriculares y registra tu evaluación."
      ]
    },
    Tests_mic: {
      title: "Prueba de Micrófono",
      description: "Verifica la entrada del micrófono, medidor de nivel en vivo, onda de audio y saturación digital."
    },
    Tools_voiceRecorder: {
      title: "Grabadora de Voz",
      description: "Graba notas de voz y clips de audio en la memoria del navegador con pausa, reanudar, reproducción y descarga.",
      badge: "AUDIO LOCAL"
    },
    MicrophoneTest: {
      title: "Prueba de Micrófono",
      labels: {
        status: "Estado",
        selectMicrophone: "Seleccionar micrófono",
        liveWaveform: "Forma de onda de audio en vivo",
        possibleClipping: "Posible saturación (Entrada > 95%)",
        silenceDetected: "Silencio / Sin entrada detectada",
        inputDetected: "Entrada activa",
        browserReportedLevel: "Nivel de entrada detectado por el navegador",
        peak: "Pico"
      },
      states: {
        active: "Transmisión en vivo",
        requesting: "Solicitando micrófono...",
        idle: "Listo para probar",
        permissionDenied: "Permiso de micrófono denegado",
        notFound: "No se detectó micrófono",
        inUse: "Micrófono ocupado / bloqueado",
        unsupported: "getUserMedia no compatible",
        error: "Error de acceso al hardware"
      },
      buttons: {
        startMicrophone: "Iniciar micrófono",
        stopMicrophone: "Detener micrófono",
        retryPermission: "Reintentar permiso",
        refreshDevices: "Buscar dispositivos"
      },
      idle: {
        title: "Prueba el hardware de tu micrófono",
        description: "Haz clic abajo para solicitar acceso al micrófono. Screen Tester analiza la amplitud digital PCM, la forma de onda y la saturación en la RAM local."
      },
      denied: {
        title: "Acceso al micrófono bloqueado",
        description: "El navegador denegó el acceso. Haz clic en el icono del micrófono en la barra de direcciones, selecciona 'Permitir' y vuelve a intentarlo."
      },
      notFound: {
        title: "No se encontró ningún micrófono",
        description: "El sistema no detectó dispositivos de audio. Revisa las conexiones físicas o los interruptores de silencio."
      },
      loopback: {
        title: "Prueba de escucha local",
        description: "Graba una muestra rápida de 5 segundos para escuchar tu voz en los altavoces o auriculares.",
        startRecordSample: "Grabar muestra de 5s",
        recordingCountdown: "Grabando... {seconds}s",
        playSample: "Reproducir muestra",
        stopPlayback: "Detener reproducción",
        verifySpeakers: "Probar altavoces"
      },
      telemetry: {
        title: "Telemetría de audio de hardware",
        channels: "Canales",
        sampleRate: "Frecuencia de muestreo",
        noiseSuppression: "Supresión de ruido",
        echoCancellation: "Cancelación de eco"
      },
      badges: {
        browserReported: "Reportado por el navegador"
      },
      observation: {
        title: "Observación acústica del usuario (Evaluación humana)",
        description: "El navegador evalúa niveles digitales PCM, pero no puede medir la acústica de la habitación. ¿Cómo responde la entrada?",
        recordedBadge: "Registrado",
        workingNormally: "Funciona normalmente",
        inputDetected: "Entrada detectada",
        lowInput: "Volumen bajo",
        noInput: "Sin entrada / Silencio",
        possibleClipping: "Distorsionado / Saturado",
        unsure: "Inseguro"
      },
      privacy: {
        title: "Privacidad y entorno local",
        notice: "El audio se procesa únicamente en la memoria local (RAM) mediante la Web Audio API. Ninguna transmisión se envía a servidores en la nube."
      },
      errors: {
        failedToAccess: "No se pudo acceder al hardware del micrófono."
      }
    },
    VoiceRecorder: {
      metaTitle: "Grabadora de Voz – Grabación Online Gratis (100% Privada)",
      metaDescription: "Graba notas de voz directamente en tu navegador. Pausa, reanuda, escucha y descarga archivos de audio localmente sin subir nada a internet.",
      header: {
        eyebrow: "Herramienta de audio online",
        title: "Grabadora de Voz",
        subtitle: "Una grabadora ligera que funciona totalmente en la memoria del navegador. Graba, pausa, escucha de inmediato y descarga archivos localmente."
      },
      labels: {
        microphone: "Entrada de micrófono",
        defaultMicrophone: "Micrófono predeterminado"
      },
      states: {
        recording: "Grabando",
        paused: "Pausado",
        completed: "Grabación lista",
        ready: "Listo para grabar"
      },
      buttons: {
        startRecording: "Iniciar grabación",
        pause: "Pausar",
        resume: "Reanudar",
        stop: "Terminar grabación",
        downloadRecording: "Descargar grabación",
        recordAgain: "Grabar de nuevo",
        delete: "Eliminar"
      },
      privacy: {
        title: "Estándar de privacidad local",
        notice: "Las grabaciones se generan en la memoria RAM mediante la API MediaRecorder. No se sube ningún archivo ni se procesa de forma remota.",
        limitTitle: "Límite de tiempo",
        limitNotice: "Las grabaciones tienen un tope de 5 minutos para evitar el consumo descontrolado de memoria."
      },
      errors: {
        permissionDenied: "Permiso de micrófono denegado. Actívalo en los ajustes del navegador.",
        deviceNotFound: "No se detectó ningún micrófono.",
        startFailed: "No se pudo iniciar la grabación."
      }
    }
  },
  fr: {
    TestPages_mic: {
      metaTitle: "Test de Microphone – Vérification de Micro en Ligne, Niveau et Forme d'Onde",
      metaDescription: "Testez votre microphone en ligne. Vumètre en temps réel, oscilloscope d'onde, indicateur d'écrêtage et test d'écoute en boucle 100% privé.",
      title: "Test de Microphone",
      description_p1: "Vérifiez la connectivité de votre microphone, la capture audio et l'amplitude d'entrée. Les données audio restent exclusivement dans la mémoire locale de l'appareil.",
      instructions: [
        "<strong>DÉMARRER LE MICROPHONE :</strong> Cliquez sur 'Démarrer le microphone' et autorisez l'accès audio demandé par le navigateur.",
        "<strong>NIVEAU & FORME D'ONDE :</strong> Parlez vers le microphone. Vérifiez que la forme d'onde réagit et que le vumètre oscille entre 30% et 80%.",
        "<strong>TEST D'ÉCOUTE & OBSERVATION :</strong> Enregistrez un extrait de 5 secondes pour réécouter votre voix au casque ou sur haut-parleurs."
      ]
    },
    Tests_mic: {
      title: "Test de Microphone",
      description: "Vérifiez l'entrée microphone, le vumètre en direct, l'activité de forme d'onde et l'écrêtage numérique."
    },
    Tools_voiceRecorder: {
      title: "Enregistreur Vocal",
      description: "Enregistrez des mémos vocaux en mémoire locale avec pause, reprise, lecture instantanée et téléchargement.",
      badge: "AUDIO LOCAL"
    },
    MicrophoneTest: {
      title: "Test de Microphone",
      labels: {
        status: "État",
        selectMicrophone: "Sélectionner le microphone",
        liveWaveform: "Forme d'onde audio en direct",
        possibleClipping: "Écrêtage possible (Entrée > 95%)",
        silenceDetected: "Silence / Aucun signal détecté",
        inputDetected: "Signal actif",
        browserReportedLevel: "Niveau d'entrée rapporté par le navigateur",
        peak: "Pic"
      },
      states: {
        active: "Flux en direct actif",
        requesting: "Demande d'accès au micro...",
        idle: "Prêt à tester",
        permissionDenied: "Accès au microphone bloqué",
        notFound: "Aucun microphone détecté",
        inUse: "Microphone occupé / verrouillé",
        unsupported: "getUserMedia non pris en charge",
        error: "Erreur d'accès matériel"
      },
      buttons: {
        startMicrophone: "Démarrer le microphone",
        stopMicrophone: "Arrêter le microphone",
        retryPermission: "Réessayer l'autorisation",
        refreshDevices: "Actualiser les périphériques"
      },
      idle: {
        title: "Testez votre microphone",
        description: "Cliquez ci-dessous pour activer le microphone. Screen Tester inspecte l'amplitude PCM, la forme d'onde et l'écrêtage dans la RAM locale."
      },
      denied: {
        title: "Accès au micro refusé",
        description: "Votre navigateur a refusé l'accès. Cliquez sur l'icône de microphone dans la barre d'adresse, choisissez 'Autoriser' et réessayez."
      },
      notFound: {
        title: "Aucun microphone trouvé",
        description: "Le système n'a détecté aucun périphérique audio. Vérifiez le branchement ou les commutateurs physiques de sourdine."
      },
      loopback: {
        title: "Écoute en boucle (Bouclage audio)",
        description: "Enregistrez un échantillon rapide de 5 secondes pour écouter votre voix directement sur vos haut-parleurs ou votre casque.",
        startRecordSample: "Enregistrer 5s d'échantillon",
        recordingCountdown: "Enregistrement... {seconds}s",
        playSample: "Lire l'échantillon",
        stopPlayback: "Arrêter la lecture",
        verifySpeakers: "Tester les haut-parleurs"
      },
      telemetry: {
        title: "Télémétrie audio matérielle",
        channels: "Canaux",
        sampleRate: "Fréquence d'échantillonnage",
        noiseSuppression: "Suppression du bruit",
        echoCancellation: "Annulation de l'écho"
      },
      badges: {
        browserReported: "Rapporté par le navigateur"
      },
      observation: {
        title: "Observation acoustique utilisateur (Évaluation humaine)",
        description: "Le navigateur évalue les niveaux numériques PCM, mais ne peut mesurer l'acoustique de la pièce. Comment se comporte le signal ?",
        recordedBadge: "Enregistré",
        workingNormally: "Fonctionne normalement",
        inputDetected: "Signal détecté",
        lowInput: "Volume d'entrée faible",
        noInput: "Aucun son / Silence",
        possibleClipping: "Distorsion / Écrêtage",
        unsure: "Incertain"
      },
      privacy: {
        title: "Confidentialité & Traitement local",
        notice: "Le flux audio est traité exclusivement dans la mémoire vive (RAM) de votre navigateur. Aucun flux n'est envoyé sur des serveurs distants."
      },
      errors: {
        failedToAccess: "Impossible d'accéder au matériel de microphone."
      }
    },
    VoiceRecorder: {
      metaTitle: "Enregistreur Vocal – Outil Audio en Ligne Gratuit (100% Privé)",
      metaDescription: "Enregistrez votre voix directement dans votre navigateur. Mettez en pause, reprenez, écoutez et téléchargez localement sans aucun envoi sur le cloud.",
      header: {
        eyebrow: "Outil audio en ligne",
        title: "Enregistreur Vocal",
        subtitle: "Un enregistreur vocal léger fonctionnant entièrement dans la mémoire de votre navigateur. Enregistrez, mettez en pause et téléchargez localement."
      },
      labels: {
        microphone: "Entrée microphone",
        defaultMicrophone: "Microphone par défaut"
      },
      states: {
        recording: "Enregistrement en cours",
        paused: "En pause",
        completed: "Enregistrement prêt",
        ready: "Prêt à enregistrer"
      },
      buttons: {
        startRecording: "Démarrer l'enregistrement",
        pause: "Pause",
        resume: "Reprendre",
        stop: "Terminer",
        downloadRecording: "Télécharger l'enregistrement",
        recordAgain: "Enregistrer à nouveau",
        delete: "Supprimer"
      },
      privacy: {
        title: "Standard de confidentialité locale",
        notice: "Les enregistrements sont créés en mémoire RAM via l'API MediaRecorder. Aucun audio n'est transmis ni stocké à distance.",
        limitTitle: "Limite de temps",
        limitNotice: "Les enregistrements sont limités à 5 minutes pour préserver les ressources mémoire de l'appareil."
      },
      errors: {
        permissionDenied: "Autorisation de microphone refusée. Veuillez l'activer dans les paramètres du navigateur.",
        deviceNotFound: "Aucun microphone détecté.",
        startFailed: "Échec du démarrage de l'enregistrement."
      }
    }
  },
  hi: {
    TestPages_mic: {
      metaTitle: "माइक्रोफ़ोन टेस्ट – ऑनलाइन माइक जाँच, लाइव स्तर और ऑडियो वेवफ़ॉर्म",
      metaDescription: "अपने माइक्रोफ़ोन का ऑनलाइन परीक्षण करें। लाइव इनपुट स्तर मीटर, वेवफ़ॉर्म ऑसिलोस्कोप, डिजिटल क्लिपिंग सूचक और 100% निजी लोकल लूपबैक टेस्ट।",
      title: "माइक्रोफ़ोन टेस्ट",
      description_p1: "माइक्रोफ़ोन कनेक्टिविटी, ऑडियो कैप्चर और इनपुट आयाम की पुष्टि करें। ऑडियो डेटा केवल डिवाइस मेमोरी (RAM) में रहता है; नेटवर्क पर कुछ भी नहीं भेजा जाता।",
      instructions: [
        "<strong>माइक्रोफ़ोन शुरू करें:</strong> 'माइक्रोफ़ोन शुरू करें' पर क्लिक करें और संकेत मिलने पर अनुमति दें (वीडियो कभी नहीं मांगा जाता)।",
        "<strong>इनपुट स्तर और वेवफ़ॉर्म:</strong> माइक में बोलें। जांचें कि वेवफ़ॉर्म प्रतिक्रिया दे रहा है और स्तर 30% से 80% के बीच है।",
        "<strong>लूपबैक और अवलोकन:</strong> स्पीकर या हेडफ़ोन के माध्यम से अपनी आवाज़ सुनने के लिए 5-सेकंड का नमूना रिकॉर्ड करें और अपना मूल्यांकन दर्ज करें।"
      ]
    },
    Tests_mic: {
      title: "माइक्रोफ़ोन टेस्ट",
      description: "माइक्रोफ़ोन इनपुट, लाइव स्तर मीटर, वेवफ़ॉर्म गतिविधि और डिजिटल क्लिपिंग का परीक्षण करें।"
    },
    Tools_voiceRecorder: {
      title: "वॉइस रिकॉर्डर",
      description: "ब्राउज़र मेमोरी में वॉइस नोट्स रिकॉर्ड करें, रोकें, फिर से शुरू करें, सुनें और स्थानीय रूप से डाउनलोड करें।",
      badge: "लोकल ऑडियो"
    },
    MicrophoneTest: {
      title: "माइक्रोफ़ोन टेस्ट",
      labels: {
        status: "स्थिति",
        selectMicrophone: "माइक्रोफ़ोन चुनें",
        liveWaveform: "लाइव ऑडियो इनपुट वेवफ़ॉर्म",
        possibleClipping: "संभावित क्लिपिंग (इनपुट > 95%)",
        silenceDetected: "शांति / कोई इनपुट नहीं मिला",
        inputDetected: "सिग्नल सक्रिय",
        browserReportedLevel: "ब्राउज़र द्वारा दर्ज इनपुट स्तर",
        peak: "शिखर"
      },
      states: {
        active: "लाइव इनपुट चालू",
        requesting: "माइक का अनुरोध किया जा रहा है...",
        idle: "परीक्षण के लिए तैयार",
        permissionDenied: "माइक्रोफ़ोन अनुमति अस्वीकृत",
        notFound: "कोई माइक्रोफ़ोन नहीं मिला",
        inUse: "माइक्रोफ़ोन अन्य ऐप में व्यस्त",
        unsupported: "getUserMedia असमर्थित",
        error: "हार्डवेयर एक्सेस त्रुटि"
      },
      buttons: {
        startMicrophone: "माइक्रोफ़ोन शुरू करें",
        stopMicrophone: "माइक्रोफ़ोन रोकें",
        retryPermission: "अनुमति पुनः प्रयास करें",
        refreshDevices: "डिवाइस खोजें"
      },
      idle: {
        title: "अपने माइक्रोफ़ोन का परीक्षण करें",
        description: "माइक्रोफ़ोन एक्सेस के लिए नीचे क्लिक करें। Screen Tester लोकल RAM में ऑडियो आयाम और क्लिपिंग की जाँच करता है।"
      },
      denied: {
        title: "माइक्रोफ़ोन एक्सेस अस्वीकृत",
        description: "ब्राउज़र ने अनुमति अस्वीकार कर दी। एड्रेस बार में माइक आइकन पर क्लिक करके 'Allow' चुनें और पुनः प्रयास करें।"
      },
      notFound: {
        title: "कोई माइक्रोफ़ोन नहीं मिला",
        description: "ऑपरेटिंग सिस्टम द्वारा कोई माइक नहीं मिला। केबल कनेक्शन और म्यूट स्विच की जाँच करें।"
      },
      loopback: {
        title: "ऑडियो लूपबैक जाँच",
        description: "स्पीकर या हेडफ़ोन पर अपनी आवाज़ सुनने के लिए 5-सेकंड का परीक्षण नमूना रिकॉर्ड करें।",
        startRecordSample: "5s नमूना रिकॉर्ड करें",
        recordingCountdown: "रिकॉर्डिंग... {seconds}s",
        playSample: "नमूना सुनें",
        stopPlayback: "रोकें",
        verifySpeakers: "स्पीकर टेस्ट"
      },
      telemetry: {
        title: "हार्डवेयर ऑडियो टेलीमेट्री",
        channels: "चैनल संख्या",
        sampleRate: "सैंपल दर",
        noiseSuppression: "शोर निवारण",
        echoCancellation: "इको निरस्तीकरण"
      },
      badges: {
        browserReported: "ब्राउज़र द्वारा रिपोर्ट किया गया"
      },
      observation: {
        title: "उपयोगकर्ता अवलोकन (मानव मूल्यांकन)",
        description: "ब्राउज़र डिजिटल सिग्नल मापता है, कमरे की ध्वनिकी नहीं। इनपुट कैसा व्यवहार कर रहा है?",
        recordedBadge: "दर्ज किया गया",
        workingNormally: "सामान्य रूप से काम कर रहा है",
        inputDetected: "आवाज़ मिली",
        lowInput: "कम आवाज़",
        noInput: "कोई आवाज़ नहीं / मौन",
        possibleClipping: "विकृत / क्लिपिंग",
        unsure: "अनिश्चित"
      },
      privacy: {
        title: "गोपनीयता और स्थानीय सैंडबॉक्स",
        notice: "ऑडियो विशुद्ध रूप से आपके ब्राउज़र की मेमोरी (RAM) में संसाधित होता है। कोई डेटा सर्वर पर नहीं भेजा जाता।"
      },
      errors: {
        failedToAccess: "माइक्रोफ़ोन हार्डवेयर तक पहुँचने में विफल।"
      }
    },
    VoiceRecorder: {
      metaTitle: "वॉइस रिकॉर्डर – मुफ़्त ऑनलाइन ऑडियो रिकॉर्डर (100% निजी)",
      metaDescription: "ब्राउज़र में सीधे वॉइस नोट्स रिकॉर्ड करें। रोकें, फिर शुरू करें, सुनें और बिना किसी सर्वर अपलोड के डाउनलोड करें।",
      header: {
        eyebrow: "ऑनलाइन ऑडियो टूल",
        title: "वॉइस रिकॉर्डर",
        subtitle: "एक हल्का वॉइस रिकॉर्डर जो पूरी तरह से आपके ब्राउज़र मेमोरी में काम करता है। रिकॉर्ड करें, रोकें, तुरंत सुनें और सहेजें।"
      },
      labels: {
        microphone: "माइक इनपुट",
        defaultMicrophone: "डिफ़ॉल्ट माइक्रोफ़ोन"
      },
      states: {
        recording: "रिकॉर्डिंग जारी",
        paused: "रुका हुआ",
        completed: "रिकॉर्डिंग तैयार",
        ready: "रिकॉर्ड करने के लिए तैयार"
      },
      buttons: {
        startRecording: "रिकॉर्डिंग शुरू करें",
        pause: "रोकें",
        resume: "पुनः शुरू करें",
        stop: "समाप्त करें",
        downloadRecording: "डाउनलोड करें",
        recordAgain: "फिर से रिकॉर्ड करें",
        delete: "हटाएं"
      },
      privacy: {
        title: "लोकल गोपनीयता मानक",
        notice: "रिकॉर्डिंग MediaRecorder API के माध्यम से केवल RAM में बनती है। कोई ऑडियो बाहर नहीं भेजा जाता।",
        limitTitle: "समय सीमा",
        limitNotice: "मेमोरी सुरक्षित रखने के लिए रिकॉर्डिंग 5 मिनट तक सीमित है।"
      },
      errors: {
        permissionDenied: "माइक्रोफ़ोन अनुमति अस्वीकृत। ब्राउज़र सेटिंग्स में अनुमति दें।",
        deviceNotFound: "कोई माइक्रोफ़ोन नहीं मिला।",
        startFailed: "रिकॉर्डिंग शुरू करने में विफल।"
      }
    }
  },
  ja: {
    TestPages_mic: {
      metaTitle: "マイクテスト – オンラインマイク診断・入力レベル＆波形測定",
      metaDescription: "マイクと音声入力をオンラインでテスト。リアルタイム入力レベルメーター、波形オシロスコープ、クリッピング検出、100%プライベートなループバック試聴。",
      title: "マイクテスト",
      description_p1: "マイクの接続、音声入力キャプチャ、リアルタイム振幅を検証します。音声データはデバイスのメモリ内でのみ処理され、サーバーへの送信は一切行われません。",
      instructions: [
        "<strong>マイクを開始:</strong> 'マイクを開始'をクリックし、ブラウザの許可ダイアログで音声アクセスを許可します（カメラは要求されません）。",
        "<strong>入力レベルと波形:</strong> マイクに向かって声を出します。波形が振動し、レベルメーターが30%〜80%の間で振れることを確認します。",
        "<strong>試聴と確認:</strong> 5秒間のサンプルを録音してスピーカーやヘッドホンで自分の声を確認し、結果を記録します。"
      ]
    },
    Tests_mic: {
      title: "マイクテスト",
      description: "マイクの入力機能、リアルタイムレベルメーター、波形表示、デジタルクリッピングをテストします。"
    },
    Tools_voiceRecorder: {
      title: "ボイスレコーダー",
      description: "ブラウザメモリ内で音声メモを録音。一時停止、再開、即時再生、ローカル保存に対応。",
      badge: "ローカル録音"
    },
    MicrophoneTest: {
      title: "マイクテスト",
      labels: {
        status: "状態",
        selectMicrophone: "マイクを選択",
        liveWaveform: "リアルタイム音声入力波形",
        possibleClipping: "クリッピングの可能性（入力 > 95%）",
        silenceDetected: "無音 / 入力未検出",
        inputDetected: "入力検出中",
        browserReportedLevel: "ブラウザ検出入力レベル",
        peak: "ピーク"
      },
      states: {
        active: "ライブ入力中",
        requesting: "マイクアクセスを要求中...",
        idle: "テスト準備完了",
        permissionDenied: "マイクのアクセス権限が拒否されました",
        notFound: "マイクが見つかりません",
        inUse: "マイクが他のアプリで使用中",
        unsupported: "getUserMedia非対応",
        error: "ハードウェアアクセスエラー"
      },
      buttons: {
        startMicrophone: "マイクを開始",
        stopMicrophone: "マイクを停止",
        retryPermission: "権限を再試行",
        refreshDevices: "デバイスを再検出"
      },
      idle: {
        title: "マイクハードウェアのテスト",
        description: "下のボタンをクリックしてマイクへのアクセスを許可してください。Screen TesterはローカルRAM上で波形と音量を安全に診断します。"
      },
      denied: {
        title: "マイクへのアクセスが拒否されました",
        description: "ブラウザのアドレスバーにあるマイクアイコンをクリックし、「許可」を選択して再試行してください。"
      },
      notFound: {
        title: "マイクが検出されませんでした",
        description: "OSによってマイクが認識されていません。ケーブル接続や物理ミュートスイッチを確認してください。"
      },
      loopback: {
        title: "ループバック試聴テスト",
        description: "5秒間のテスト音声を録音し、スピーカーまたはヘッドホンから自分の声を即座に確認できます。",
        startRecordSample: "5秒サンプル録音",
        recordingCountdown: "録音中... {seconds}秒",
        playSample: "サンプルを再生",
        stopPlayback: "再生停止",
        verifySpeakers: "スピーカーをテスト"
      },
      telemetry: {
        title: "ハードウェア音声テレメトリ",
        channels: "チャンネル数",
        sampleRate: "サンプリングレート",
        noiseSuppression: "ノイズ抑制",
        echoCancellation: "エコーキャンセラー"
      },
      badges: {
        browserReported: "ブラウザ検出情報"
      },
      observation: {
        title: "ユーザーによる音声評価（人間の耳による確認）",
        description: "ブラウザはPCM信号レベルを測定しますが、部屋の音響特性までは測れません。音声はどのように聞こえますか？",
        recordedBadge: "記録完了",
        workingNormally: "正常に動作している",
        inputDetected: "音声を検出",
        lowInput: "音量が小さい",
        noInput: "無音 / 音が出ない",
        possibleClipping: "歪み / 音割れ",
        unsure: "判断がつかない"
      },
      privacy: {
        title: "プライバシーと完全ローカル処理",
        notice: "音声はWeb Audio APIを通じてブラウザのメモリ内でのみ処理されます。音声が外部サーバーに送信されることは一切ありません。"
      },
      errors: {
        failedToAccess: "マイクハードウェアへのアクセスに失敗しました。"
      }
    },
    VoiceRecorder: {
      metaTitle: "ボイスレコーダー – 無料オンライン録音ツール（完全プライベート）",
      metaDescription: "ブラウザ上で直接音声録音。一時停止、再開、即時再生、ローカルダウンロードに対応。サーバーへの送信はゼロの完全ローカル仕様。",
      header: {
        eyebrow: "オンライン音声ツール",
        title: "ボイスレコーダー",
        subtitle: "ブラウザのメモリ内だけで動作する軽量ボイスレコーダー。一時停止、再開、即時再生、ローカル保存が簡単に行えます。"
      },
      labels: {
        microphone: "マイク入力",
        defaultMicrophone: "システム規定のマイク"
      },
      states: {
        recording: "録音中",
        paused: "一時停止中",
        completed: "録音完了",
        ready: "録音準備完了"
      },
      buttons: {
        startRecording: "録音を開始",
        pause: "一時停止",
        resume: "再開",
        stop: "録音を終了",
        downloadRecording: "録音をダウンロード",
        recordAgain: "もう一度録音",
        delete: "削除"
      },
      privacy: {
        title: "安心のローカルプライバシー基準",
        notice: "MediaRecorder APIを使用して端末のメモリ内でのみ音声ファイルを生成します。外部サーバーへのアップロードは行いません。",
        limitTitle: "時間制限",
        limitNotice: "メモリ消費を防ぐため、1回の録音時間は最大5分間に制限されています。"
      },
      errors: {
        permissionDenied: "マイクのアクセスが拒否されました。ブラウザの設定で許可してください。",
        deviceNotFound: "マイクが見つかりませんでした。",
        startFailed: "録音の開始に失敗しました。"
      }
    }
  },
  ko: {
    TestPages_mic: {
      metaTitle: "마이크 테스트 – 온라인 마이크 점검, 실시간 볼륨 레벨 및 파형 측정",
      metaDescription: "마이크와 오디오 입력을 온라인에서 테스트하세요. 실시간 레벨 미터, 파형 오실로스코프, 디지털 클리핑 감지, 100% 비공개 로컬 루프백 테스트.",
      title: "마이크 테스트",
      description_p1: "마이크 연결 상태, 브라우저 오디오 캡처 및 실시간 진폭을 확인합니다. 오디오 데이터는 기기 메모리 내에서만 처리되며 서버로 전송되지 않습니다.",
      instructions: [
        "<strong>마이크 시작:</strong> '마이크 시작'을 클릭하고 브라우저 권한 대화상자에서 마이크를 허용합니다(비디오는 요청하지 않음).",
        "<strong>입력 레벨 및 파형:</strong> 마이크를 향해 소리를 냅니다. 파형이 반응하고 레벨 미터가 30%~80% 사이에서 움직이는지 확인합니다.",
        "<strong>루프백 및 평가:</strong> 5초 샘플을 녹음하여 스피커나 헤드폰으로 직접 목소리를 듣고 평가를 기록합니다."
      ]
    },
    Tests_mic: {
      title: "마이크 테스트",
      description: "마이크 입력 기능, 실시간 레벨 측정, 파형 반응 및 디지털 클리핑을 테스트합니다."
    },
    Tools_voiceRecorder: {
      title: "음성 녹음기",
      description: "브라우저 메모리에서 음성 메모를 녹음하고 일시 정지, 재개, 즉시 재생 및 다운로드할 수 있습니다.",
      badge: "로컬 오디오"
    },
    MicrophoneTest: {
      title: "마이크 테스트",
      labels: {
        status: "상태",
        selectMicrophone: "마이크 선택",
        liveWaveform: "실시간 오디오 입력 파형",
        possibleClipping: "클리핑 가능성 (입력 > 95%)",
        silenceDetected: "무음 / 입력 미감지",
        inputDetected: "입력 감지됨",
        browserReportedLevel: "브라우저 감지 입력 레벨",
        peak: "최고점"
      },
      states: {
        active: "실시간 입력 중",
        requesting: "마이크 요청 중...",
        idle: "테스트 준비 완료",
        permissionDenied: "마이크 권한 거부됨",
        notFound: "마이크를 찾을 수 없음",
        inUse: "마이크 다른 앱에서 사용 중",
        unsupported: "getUserMedia 지원되지 않음",
        error: "하드웨어 접근 오류"
      },
      buttons: {
        startMicrophone: "마이크 시작",
        stopMicrophone: "마이크 중지",
        retryPermission: "권한 다시 시도",
        refreshDevices: "장치 검색"
      },
      idle: {
        title: "마이크 하드웨어 테스트",
        description: "아래 버튼을 눌러 마이크 권한을 허용하세요. Screen Tester는 로컬 RAM에서 파형과 볼륨 레벨을 안전하게 분석합니다."
      },
      denied: {
        title: "마이크 접근이 차단됨",
        description: "브라우저 주소창의 마이크 아이콘을 클릭하여 '허용'으로 변경한 후 다시 시도하세요."
      },
      notFound: {
        title: "마이크를 찾을 수 없음",
        description: "오디오 입력 장치가 감지되지 않았습니다. 케이블 연결이나 물리적 음소거 스위치를 확인하세요."
      },
      loopback: {
        title: "오디오 루프백 점검",
        description: "5초 테스트 샘플을 녹음하여 스피커나 헤드폰으로 자신의 목소리를 즉시 들어볼 수 있습니다.",
        startRecordSample: "5초 샘플 녹음",
        recordingCountdown: "녹음 중... {seconds}초",
        playSample: "샘플 재생",
        stopPlayback: "재생 중지",
        verifySpeakers: "스피커 테스트"
      },
      telemetry: {
        title: "하드웨어 오디오 텔레메트리",
        channels: "채널 수",
        sampleRate: "샘플 레이트",
        noiseSuppression: "노이즈 억제",
        echoCancellation: "에코 캔슬링"
      },
      badges: {
        browserReported: "브라우저 감지 정보"
      },
      observation: {
        title: "사용자 음향 평가 (육안 및 청각 확인)",
        description: "브라우저는 디지털 PCM 신호를 측정하지만 방 안의 음향 환경은 측정할 수 없습니다. 소리가 어떻게 들리나요?",
        recordedBadge: "기록됨",
        workingNormally: "정상 작동함",
        inputDetected: "입력 감지됨",
        lowInput: "볼륨이 작음",
        noInput: "무음 / 소리 없음",
        possibleClipping: "음 왜곡 / 찢어짐",
        unsure: "확인 불가"
      },
      privacy: {
        title: "개인정보 보호 및 로컬 샌드박스",
        notice: "오디오는 Web Audio API를 통해 브라우저 로컬 메모리(RAM)에서만 처리됩니다. 어떤 데이터도 서버로 전송되지 않습니다."
      },
      errors: {
        failedToAccess: "마이크 장치에 접근하지 못했습니다."
      }
    },
    VoiceRecorder: {
      metaTitle: "음성 녹음기 – 무료 온라인 녹음 도구 (100% 비공개)",
      metaDescription: "브라우저에서 바로 음성을 녹음하세요. 일시 정지, 재개, 즉시 재생 및 로컬 파일 다운로드 지원. 서버 전송 없는 안전한 녹음.",
      header: {
        eyebrow: "온라인 오디오 도구",
        title: "음성 녹음기",
        subtitle: "브라우저 메모리 안에서 완전히 동작하는 가벼운 음성 녹음기입니다. 일시 정지, 즉시 재생, 로컬 저장을 간편하게 이용하세요."
      },
      labels: {
        microphone: "마이크 입력",
        defaultMicrophone: "기본 마이크"
      },
      states: {
        recording: "녹음 중",
        paused: "일시 정지됨",
        completed: "녹음 완료",
        ready: "녹음 준비 완료"
      },
      buttons: {
        startRecording: "녹음 시작",
        pause: "일시 정지",
        resume: "계속 녹음",
        stop: "녹음 완료",
        downloadRecording: "녹음 파일 다운로드",
        recordAgain: "다시 녹음",
        delete: "삭제"
      },
      privacy: {
        title: "로컬 프라이버시 기준",
        notice: "MediaRecorder API를 통해 기기 메모리에만 오디오가 저장됩니다. 외부 서버로 음성이 업로드되지 않습니다.",
        limitTitle: "시간 제한",
        limitNotice: "메모리 과부하를 방지하기 위해 녹음 시간은 최대 5분으로 제한됩니다."
      },
      errors: {
        permissionDenied: "마이크 권한이 거부되었습니다. 브라우저 설정에서 허용해 주세요.",
        deviceNotFound: "마이크가 감지되지 않았습니다.",
        startFailed: "녹음을 시작하지 못했습니다."
      }
    }
  },
  pt: {
    TestPages_mic: {
      metaTitle: "Teste de Microfone – Verificação Online, Medidor de Nível e Forma de Onda",
      metaDescription: "Teste seu microfone online. Medidor de nível em tempo real, osciloscópio de onda, indicador de corte digital e teste de reprodução local 100% privado.",
      title: "Teste de Microfone",
      description_p1: "Verifique a conectividade do microfone, captura de áudio e amplitude em tempo real. Os dados de áudio permanecem estritamente na memória local do dispositivo.",
      instructions: [
        "<strong>INICIAR MICROFONE:</strong> Clique em 'Iniciar microfone' e permita o acesso ao áudio quando solicitado pelo navegador.",
        "<strong>NÍVEL E FORMA DE ONDA:</strong> Fale no microfone. Verifique se a onda oscila e se o medidor de nível marca entre 30% e 80%.",
        "<strong>REPRODUÇÃO E OBSERVAÇÃO:</strong> Grave uma amostra de 5 segundos para ouvir sua voz nos alto-falantes ou fones e registre sua avaliação."
      ]
    },
    Tests_mic: {
      title: "Teste de Microfone",
      description: "Verifique a entrada do microfone, medidor de nível ao vivo, atividade da forma de onda e corte digital."
    },
    Tools_voiceRecorder: {
      title: "Gravador de Voz",
      description: "Grave notas de voz e clipes de áudio na memória do navegador com pausa, retomar, reprodução instantânea e download.",
      badge: "ÁUDIO LOCAL"
    },
    MicrophoneTest: {
      title: "Teste de Microfone",
      labels: {
        status: "Status",
        selectMicrophone: "Selecionar microfone",
        liveWaveform: "Forma de onda de áudio ao vivo",
        possibleClipping: "Possível distorção (Entrada > 95%)",
        silenceDetected: "Silêncio / Nenhum sinal detectado",
        inputDetected: "Sinal ativo",
        browserReportedLevel: "Nível de entrada relatado pelo navegador",
        peak: "Pico"
      },
      states: {
        active: "Transmissão ao vivo",
        requesting: "Solicitando microfone...",
        idle: "Pronto para testar",
        permissionDenied: "Permissão de microfone negada",
        notFound: "Nenhum microfone detectado",
        inUse: "Microfone em uso / bloqueado",
        unsupported: "getUserMedia não suportado",
        error: "Erro de acesso ao hardware"
      },
      buttons: {
        startMicrophone: "Iniciar microfone",
        stopMicrophone: "Parar microfone",
        retryPermission: "Tentar permissão novamente",
        refreshDevices: "Procurar dispositivos"
      },
      idle: {
        title: "Teste o hardware do seu microfone",
        description: "Clique abaixo para solicitar acesso ao microfone. O Screen Tester analisa a amplitude PCM, forma de onda e distorção na memória RAM local."
      },
      denied: {
        title: "Acesso ao microfone bloqueado",
        description: "O navegador negou o acesso. Clique no ícone do microfone na barra de endereços, escolha 'Permitir' e tente novamente."
      },
      notFound: {
        title: "Nenhum microfone encontrado",
        description: "Nenhum dispositivo de entrada foi detectado pelo sistema operacional. Verifique os cabos ou chaves físicas de mudo."
      },
      loopback: {
        title: "Verificação de escuta local (Loopback)",
        description: "Grave uma amostra rápida de 5 segundos para ouvir sua voz diretamente nos alto-falantes ou fones de ouvido.",
        startRecordSample: "Gravar amostra de 5s",
        recordingCountdown: "Gravando... {seconds}s",
        playSample: "Ouvir amostra",
        stopPlayback: "Parar reprodução",
        verifySpeakers: "Testar alto-falantes"
      },
      telemetry: {
        title: "Telemetria de áudio de hardware",
        channels: "Canais",
        sampleRate: "Taxa de amostragem",
        noiseSuppression: "Supressão de ruído",
        echoCancellation: "Cancelamento de eco"
      },
      badges: {
        browserReported: "Relatado pelo navegador"
      },
      observation: {
        title: "Observação acústica do usuário (Avaliação humana)",
        description: "O navegador avalia níveis digitais PCM, mas não mede a acústica da sala. Como a entrada está respondendo?",
        recordedBadge: "Gravado",
        workingNormally: "Funcionando normalmente",
        inputDetected: "Sinal detectado",
        lowInput: "Volume baixo",
        noInput: "Sem som / Silêncio",
        possibleClipping: "Distorção / Estourado",
        unsure: "Não tenho certeza"
      },
      privacy: {
        title: "Privacidade e isolamento local",
        notice: "O áudio é processado unicamente na memória local (RAM) do navegador via Web Audio API. Nenhum dado é enviado para servidores."
      },
      errors: {
        failedToAccess: "Falha ao acessar o hardware do microfone."
      }
    },
    VoiceRecorder: {
      metaTitle: "Gravador de Voz – Gravador de Áudio Online Grátis (100% Privado)",
      metaDescription: "Grave notas de voz diretamente no seu navegador. Pause, retome, ouça e baixe arquivos de áudio localmente sem envio para a nuvem.",
      header: {
        eyebrow: "Ferramenta de áudio online",
        title: "Gravador de Voz",
        subtitle: "Um gravador de voz leve que funciona inteiramente na memória do navegador. Grave, pause, escute na hora e salve localmente."
      },
      labels: {
        microphone: "Entrada de microfone",
        defaultMicrophone: "Microfone padrão do sistema"
      },
      states: {
        recording: "Gravando",
        paused: "Pausado",
        completed: "Gravação pronta",
        ready: "Pronto para gravar"
      },
      buttons: {
        startRecording: "Iniciar gravação",
        pause: "Pausar",
        resume: "Retomar",
        stop: "Finalizar gravação",
        downloadRecording: "Baixar gravação",
        recordAgain: "Gravar novamente",
        delete: "Excluir"
      },
      privacy: {
        title: "Padrão de privacidade local",
        notice: "As gravações são salvas na memória RAM via MediaRecorder API. Nenhum áudio é enviado para servidores remotos.",
        limitTitle: "Limite de tempo",
        limitNotice: "As gravações são limitadas a 5 minutos para economizar recursos de memória."
      },
      errors: {
        permissionDenied: "Permissão de microfone negada. Ative-a nas configurações do navegador.",
        deviceNotFound: "Nenhum microfone detectado.",
        startFailed: "Falha ao iniciar a gravação."
      }
    }
  }
};

for (const loc of locales) {
  const filePath = path.join(messagesDir, `${loc}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const tLoc = translations[loc] || translations['en'];

  // 1. TestPages['microphone-test']
  if (!data.TestPages) data.TestPages = {};
  data.TestPages['microphone-test'] = tLoc.TestPages_mic;

  // 2. Tests.microphoneTest
  if (!data.Tests) data.Tests = {};
  data.Tests.microphoneTest = tLoc.Tests_mic;

  // 3. Tools.items.voiceRecorder
  if (!data.Tools) data.Tools = {};
  if (!data.Tools.items) data.Tools.items = {};
  data.Tools.items.voiceRecorder = tLoc.Tools_voiceRecorder;

  // 4. MicrophoneTest namespace
  data.MicrophoneTest = tLoc.MicrophoneTest;

  // 5. VoiceRecorder namespace
  data.VoiceRecorder = tLoc.VoiceRecorder;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated ${loc}.json successfully.`);
}

console.log('All 8 locales populated.');
