import { KnowledgeBaseCategory, KnowledgeCategoryInfo } from "./types";

export const CATEGORIES_BY_LOCALE: Record<string, KnowledgeCategoryInfo[]> = {
  en: [
    {
      id: "display-basics",
      title: "Display Basics & Architecture",
      shortTitle: "Display Basics",
      description: "Core physical and optical fundamentals: resolution, refresh rates, HDR pipelines, color depth, black levels, and panel uniformity.",
      iconName: "Layers"
    },
    {
      id: "display-problems",
      title: "Display Defects & Artifacts",
      shortTitle: "Display Problems",
      description: "Diagnosing visual flaws: dead vs. stuck pixels, backlight bleed, IPS glow, ghosting, screen tearing, text fringing, and burn-in.",
      iconName: "AlertTriangle"
    },
    {
      id: "tv-and-display-setup",
      title: "TV & Display Setup",
      shortTitle: "TV & Setup",
      description: "Configuring living room televisions, external monitors, aspect ratios, overscan pixel mapping, and multi-monitor workstations.",
      iconName: "Tv"
    },
    {
      id: "device-and-input",
      title: "Device & Input Testing",
      shortTitle: "Device & Input",
      description: "Diagnostic procedures for mobile touchscreens, multi-touch gestures, integrated webcams, audio stereophony, and motion sensors.",
      iconName: "Smartphone"
    },
    {
      id: "browser-and-testing",
      title: "Browser & Testing Methodology",
      shortTitle: "Browser & Limits",
      description: "Understanding web browser capabilities, hardware API access boundaries, and the distinction between software vs. lab measurements.",
      iconName: "ShieldCheck"
    }
  ],
  de: [
    {
      id: "display-basics",
      title: "Display-Grundlagen & Panel-Architektur",
      shortTitle: "Display-Grundlagen",
      description: "Physikalische und optische Grundlagen: Auflösung, Bildwiederholrate, HDR-Pipelines, Farbtiefe, Schwarzwerte und Panel-Homogenität.",
      iconName: "Layers"
    },
    {
      id: "display-problems",
      title: "Bildschirmfehler & Bildartefakte",
      shortTitle: "Display-Fehler",
      description: "Visuelle Fehler diagnostizieren: tote vs. festsitzende Pixel, Backlight Bleed, IPS-Glow, Ghosting, Tearing, Farbsäume und Einbrennen.",
      iconName: "AlertTriangle"
    },
    {
      id: "tv-and-display-setup",
      title: "TV- & Monitor-Konfiguration",
      shortTitle: "TV & Setup",
      description: "Optimales Einrichten von Fernsehern, externen Displays, Seitenverhältnissen, Overscan-Pixel-Mapping und Multi-Monitor-Setups.",
      iconName: "Tv"
    },
    {
      id: "device-and-input",
      title: "Geräte- & Eingabe-Diagnose",
      shortTitle: "Geräte & Sensoren",
      description: "Prüfverfahren für Touchscreens, Multitouch-Gesten, Webcams, Stereokanaltrennung und mobile Bewegungssensoren.",
      iconName: "Smartphone"
    },
    {
      id: "browser-and-testing",
      title: "Browser- & Testmethodik",
      shortTitle: "Browser & Grenzen",
      description: "Browser-Funktionen, W3C-Hardware-APIs und die klare Abgrenzung zwischen webbasierten Tests und optischen Labormessungen.",
      iconName: "ShieldCheck"
    }
  ],
  es: [
    {
      id: "display-basics",
      title: "Fundamentos y Arquitectura de Pantalla",
      shortTitle: "Básicos de Pantalla",
      description: "Principios ópticos y físicos fundamentales: resolución, tasa de refresco, HDR, profundidad de color, niveles de negro y uniformidad.",
      iconName: "Layers"
    },
    {
      id: "display-problems",
      title: "Defectos y Artefactos de Pantalla",
      shortTitle: "Problemas Visuales",
      description: "Diagnóstico de fallos visuales: píxeles muertos y atascados, fuga de luz, brillo IPS, ghosting, tearing y retención de imagen.",
      iconName: "AlertTriangle"
    },
    {
      id: "tv-and-display-setup",
      title: "Configuración de TV y Monitores",
      shortTitle: "TV y Configuración",
      description: "Configuración de televisores, monitores externos, relaciones de aspecto, mapeo 1:1 de píxeles sin overscan y estaciones de trabajo.",
      iconName: "Tv"
    },
    {
      id: "device-and-input",
      title: "Pruebas de Dispositivos y Entrada",
      shortTitle: "Dispositivos y Entrada",
      description: "Procedimientos de diagnóstico para pantallas táctiles, gestos multitáctiles, cámaras web, estéreo y sensores de movimiento.",
      iconName: "Smartphone"
    },
    {
      id: "browser-and-testing",
      title: "Metodología y Límites del Navegador",
      shortTitle: "Navegador y Límites",
      description: "Capacidades de los navegadores web, APIs de hardware y la distinción entre pruebas en navegador y mediciones de laboratorio.",
      iconName: "ShieldCheck"
    }
  ],
  fr: [
    {
      id: "display-basics",
      title: "Fondamentaux et Architecture d'Écran",
      shortTitle: "Bases d'Écran",
      description: "Principes physiques et optiques essentiels : résolution, taux de rafraîchissement, HDR, profondeur de couleur, noirs et uniformité.",
      iconName: "Layers"
    },
    {
      id: "display-problems",
      title: "Défauts et Artefacts d'Écran",
      shortTitle: "Problèmes d'Écran",
      description: "Diagnostic des défauts visuels : pixels morts ou bloqués, fuites de rétroéclairage, IPS glow, ghosting, tearing et marquage.",
      iconName: "AlertTriangle"
    },
    {
      id: "tv-and-display-setup",
      title: "Configuration TV et Moniteurs",
      shortTitle: "TV et Configuration",
      description: "Configuration des téléviseurs, moniteurs externes, formats d'image, mappage 1:1 sans overscan et postes multi-écrans.",
      iconName: "Tv"
    },
    {
      id: "device-and-input",
      title: "Tests de Périphériques et Entrées",
      shortTitle: "Périphériques et Entrée",
      description: "Procédures de diagnostic pour écrans tactiles, gestes multi-touch, webcams, séparation stéréo et capteurs de mouvement.",
      iconName: "Smartphone"
    },
    {
      id: "browser-and-testing",
      title: "Méthodologie et Limites du Navigateur",
      shortTitle: "Navigateur et Limites",
      description: "Capacités des navigateurs web, API matérielles et distinction entre tests logiciels et mesures en laboratoire.",
      iconName: "ShieldCheck"
    }
  ],
  pt: [
    {
      id: "display-basics",
      title: "Fundamentos e Arquitetura de Telas",
      shortTitle: "Básicos da Tela",
      description: "Fundamentos físicos e ópticos: resolução, taxa de atualização, HDR, profundidade de cor, níveis de preto e uniformidade do painel.",
      iconName: "Layers"
    },
    {
      id: "display-problems",
      title: "Defeitos e Artefatos Visuais",
      shortTitle: "Problemas de Tela",
      description: "Diagnóstico de falhas visuais: pixels mortos ou presos, backlight bleed, IPS glow, ghosting, tearing e retenção de imagem.",
      iconName: "AlertTriangle"
    },
    {
      id: "tv-and-display-setup",
      title: "Configuração de TV e Monitores",
      shortTitle: "TV e Ajustes",
      description: "Ajuste de televisores, monitores externos, proporções de tela, mapeamento 1:1 de pixels sem overscan e múltiplos monitores.",
      iconName: "Tv"
    },
    {
      id: "device-and-input",
      title: "Testes de Dispositivos e Entrada",
      shortTitle: "Dispositivos e Entrada",
      description: "Diagnóstico para telas sensíveis ao toque, gestos multitoque, webcams, canais estéreo e sensores de movimento.",
      iconName: "Smartphone"
    },
    {
      id: "browser-and-testing",
      title: "Metodologia e Limites do Navegador",
      shortTitle: "Navegador e Limites",
      description: "Capacidades do navegador, APIs de hardware W3C e a distinção entre testes na web e medições laboratoriais ópticas.",
      iconName: "ShieldCheck"
    }
  ],
  ja: [
    {
      id: "display-basics",
      title: "ディスプレイの基本とパネルアーキテクチャ",
      shortTitle: "基本仕様",
      description: "解像度、リフレッシュレート、HDRパイプライン、色深度、黒レベル、均一性などの物理的・光学的基礎知識。",
      iconName: "Layers"
    },
    {
      id: "display-problems",
      title: "画面の欠陥と表示アーティファクト",
      shortTitle: "画面の不具合",
      description: "ドット抜け（デッド/スタックピクセル）、バックライト漏れ、IPSグロー、ゴースト、テアリング、焼き付きの診断。",
      iconName: "AlertTriangle"
    },
    {
      id: "tv-and-display-setup",
      title: "テレビとモニターの設定",
      shortTitle: "テレビ・設定",
      description: "テレビ、外部モニター、アスペクト比、オーバースキャン無効化（ドットバイドット）、マルチモニター環境の最適化。",
      iconName: "Tv"
    },
    {
      id: "device-and-input",
      title: "デバイスおよび入力テスト",
      shortTitle: "デバイス・入力",
      description: "タッチスクリーン、マルチタッチジェスチャー、内蔵Webカメラ、ステレオ音響分離、モーションセンサーの診断手順。",
      iconName: "Smartphone"
    },
    {
      id: "browser-and-testing",
      title: "ブラウザテストの測定限界と手法",
      shortTitle: "ブラウザ・測定限界",
      description: "ブラウザWeb APIの機能と権限、ブラウザテストで検証可能な項目と物理測定機器が必要な項目の技術的境界。",
      iconName: "ShieldCheck"
    }
  ],
  ko: [
    {
      id: "display-basics",
      title: "디스플레이 기초 및 패널 아키텍처",
      shortTitle: "디스플레이 기초",
      description: "해상도, 주사율, HDR 파이프라인, 색 심도, 블랙 레벨, 화면 균일도 등 핵심 물리 및 광학 기초 원리.",
      iconName: "Layers"
    },
    {
      id: "display-problems",
      title: "화면 결함 및 시각적 왜곡",
      shortTitle: "화면 결함 진단",
      description: "불량 화소(데드/스턱 픽셀), 빛샘, IPS 글로우, 잔상(고스팅), 화면 찢김(티어링), 번인 현상 진단.",
      iconName: "AlertTriangle"
    },
    {
      id: "tv-and-display-setup",
      title: "TV 및 디스플레이 설정",
      shortTitle: "TV 및 설정",
      description: "TV 연결, 외장 모니터, 화면비, 오버스캔 1:1 픽셀 매칭, 다중 모니터 작업 공간 최적화.",
      iconName: "Tv"
    },
    {
      id: "device-and-input",
      title: "기기 및 입력 장치 테스트",
      shortTitle: "기기 및 입력",
      description: "터치스크린 디지타이저, 멀티터치 제스처, 웹캠, 스테레오 오디오 채널 분리, 모바일 모션 센서 진단.",
      iconName: "Smartphone"
    },
    {
      id: "browser-and-testing",
      title: "브라우저 테스트 방법론 및 한계",
      shortTitle: "브라우저 및 측정 한계",
      description: "웹 브라우저 Web API의 기능과 권한 제약, 소프트웨어 진단과 전문 실험실 광학 측정 장비의 명확한 구분.",
      iconName: "ShieldCheck"
    }
  ],
  hi: [
    {
      id: "display-basics",
      title: "डिस्प्ले की मूल बातें और पैनल वास्तुकला",
      shortTitle: "डिस्प्ले मूल बातें",
      description: "मूल भौतिक और ऑप्टिकल सिद्धांत: रिज़ॉल्यूशन, रिफ्रेश दर, एचडीआर पाइपलाइन, रंग गहराई, ब्लैक लेवल और पैनल एकरूपता।",
      iconName: "Layers"
    },
    {
      id: "display-problems",
      title: "स्क्रीन दोष और दृश्य कलाकृतियां",
      shortTitle: "डिस्प्ले दोष",
      description: "दृश्य दोषों का निदान: मृत बनाम अटके हुए पिक्सेल, बैकलाइट ब्लीड, आईपीएस ग्लो, घोस्टिंग, स्क्रीन टियरिंग और बर्न-इन।",
      iconName: "AlertTriangle"
    },
    {
      id: "tv-and-display-setup",
      title: "टीवी और डिस्प्ले सेटअप",
      shortTitle: "टीवी और सेटअप",
      description: "टेलीविज़न, बाहरी मॉनिटर, पहलू अनुपात, ओवरस्कैन 1:1 पिक्सेल मैपिंग और मल्टी-मॉनिटर कार्यक्षेत्र कॉन्फ़िगर करना।",
      iconName: "Tv"
    },
    {
      id: "device-and-input",
      title: "उपकरण और इनपुट परीक्षण",
      shortTitle: "उपकरण और इनपुट",
      description: "मोबाइल टचस्क्रीन, मल्टी-टच जेस्चर, वेबकैम, स्टीरियो ऑडियो चैनल अलगाव और मोशन सेंसर के लिए परीक्षण।",
      iconName: "Smartphone"
    },
    {
      id: "browser-and-testing",
      title: "ब्राउज़र परीक्षण कार्यप्रणाली और सीमाएं",
      shortTitle: "ब्राउज़र और सीमाएं",
      description: "वेब ब्राउज़र क्षमताओं, हार्डवेयर एपीआई पहुंच सीमाओं और सॉफ़्टवेयर परीक्षण बनाम लैब माप के बीच अंतर।",
      iconName: "ShieldCheck"
    }
  ]
};

export function getLocalizedCategories(locale: string = "en"): KnowledgeCategoryInfo[] {
  return CATEGORIES_BY_LOCALE[locale] || CATEGORIES_BY_LOCALE.en;
}

export function getLocalizedCategory(id: KnowledgeBaseCategory, locale: string = "en"): KnowledgeCategoryInfo | undefined {
  const list = getLocalizedCategories(locale);
  return list.find(cat => cat.id === id) || CATEGORIES_BY_LOCALE.en.find(cat => cat.id === id);
}
