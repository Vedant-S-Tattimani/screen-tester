/**
 * fix-all-translations.mjs
 * Fills in all untranslated strings (English copies) with proper translations.
 * Run: node fix-all-translations.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const messagesDir = path.join(__dirname, 'messages');

// ============================================================
// TRANSLATION DICTIONARIES
// key: English string -> translations per language
// ============================================================

// We group by section for clarity
const translations = {

  // ── Header ──────────────────────────────────────────────
  "Header.title": {
    hi: "मॉनिटर टेस्टर",
    es: "Probador de Monitor",
    fr: "Testeur de Moniteur",
    de: "Monitor-Tester",
    pt: "Testador de Monitor",
    ja: "モニターテスター",
    ko: "모니터 테스터"
  },
  "Header.nav.tests": {
    hi: "परीक्षण",
    es: "Pruebas",
    fr: "Tests",
    de: "Tests",
    pt: "Testes",
    ja: "テスト",
    ko: "테스트"
  },
  "Header.nav.inspection": {
    hi: "निरीक्षण",
    es: "Inspección",
    fr: "Inspection",
    de: "Inspektion",
    pt: "Inspeção",
    ja: "検査",
    ko: "검사"
  },
  "Header.nav.guides": {
    hi: "गाइड",
    es: "Guías",
    fr: "Guides",
    de: "Anleitungen",
    pt: "Guias",
    ja: "ガイド",
    ko: "가이드"
  },
  "Header.nav.menu": {
    hi: "मेनू",
    es: "Menú",
    fr: "Menu",
    de: "Menü",
    pt: "Menu",
    ja: "メニュー",
    ko: "메뉴"
  },
  "Header.nav.tools": {
    hi: "उपकरण",
    es: "Herramientas",
    fr: "Outils",
    de: "Werkzeuge",
    pt: "Ferramentas",
    ja: "ツール",
    ko: "도구"
  },
  "Header.tests.pixels": {
    hi: "पिक्सल",
    es: "Píxeles",
    fr: "Pixels",
    de: "Pixel",
    pt: "Pixels",
    ja: "ピクセル",
    ko: "픽셀"
  },
  "Header.tests.color": {
    hi: "रंग",
    es: "Color",
    fr: "Couleur",
    de: "Farbe",
    pt: "Cor",
    ja: "色",
    ko: "색상"
  },
  "Header.tests.luminance": {
    hi: "चमक",
    es: "Luminancia",
    fr: "Luminance",
    de: "Luminanz",
    pt: "Luminância",
    ja: "輝度",
    ko: "휘도"
  },
  "Header.tests.display": {
    hi: "डिस्प्ले",
    es: "Pantalla",
    fr: "Affichage",
    de: "Anzeige",
    pt: "Tela",
    ja: "ディスプレイ",
    ko: "디스플레이"
  },
  "Header.tests.motion": {
    hi: "गति",
    es: "Movimiento",
    fr: "Mouvement",
    de: "Bewegung",
    pt: "Movimento",
    ja: "動き",
    ko: "동작"
  },
  "Header.tests.advanced": {
    hi: "उन्नत",
    es: "Avanzado",
    fr: "Avancé",
    de: "Erweitert",
    pt: "Avançado",
    ja: "詳細",
    ko: "고급"
  },
  "Header.inspection.monitor": {
    hi: "मॉनिटर निरीक्षण",
    es: "Inspección de Monitor",
    fr: "Inspection du Moniteur",
    de: "Monitor-Inspektion",
    pt: "Inspeção de Monitor",
    ja: "モニター検査",
    ko: "모니터 검사"
  },
  "Header.inspection.gaming": {
    hi: "गेमिंग",
    es: "Juegos",
    fr: "Jeux",
    de: "Gaming",
    pt: "Jogos",
    ja: "ゲーミング",
    ko: "게이밍"
  },
  "Header.inspection.oled": {
    hi: "OLED",
    es: "OLED",
    fr: "OLED",
    de: "OLED",
    pt: "OLED",
    ja: "OLED",
    ko: "OLED"
  },
  "Header.inspection.new": {
    hi: "नया मॉनिटर",
    es: "Monitor Nuevo",
    fr: "Nouveau Moniteur",
    de: "Neuer Monitor",
    pt: "Monitor Novo",
    ja: "新しいモニター",
    ko: "새 모니터"
  },
  "Header.inspection.used": {
    hi: "पुराना मॉनिटर",
    es: "Monitor Usado",
    fr: "Moniteur d'Occasion",
    de: "Gebrauchter Monitor",
    pt: "Monitor Usado",
    ja: "中古モニター",
    ko: "중고 모니터"
  },
  "Header.inspection.laptop": {
    hi: "लैपटॉप डिस्प्ले",
    es: "Pantalla de Portátil",
    fr: "Écran d'Ordinateur Portable",
    de: "Laptop-Display",
    pt: "Tela de Laptop",
    ja: "ラップトップディスプレイ",
    ko: "노트북 디스플레이"
  },
  "Header.inspection.tv": {
    hi: "टीवी डिस्प्ले",
    es: "Pantalla de TV",
    fr: "Écran de TV",
    de: "TV-Display",
    pt: "Tela de TV",
    ja: "テレビディスプレイ",
    ko: "TV 디스플레이"
  },
  "Header.inspection.tvSubtitle": {
    hi: "बड़ी स्क्रीन",
    es: "Pantalla grande",
    fr: "Grand écran",
    de: "Großer Bildschirm",
    pt: "Tela grande",
    ja: "大画面",
    ko: "대형 화면"
  },
  "Header.guides.monitor": {
    hi: "मॉनिटर गाइड",
    es: "Guía de Monitor",
    fr: "Guide du Moniteur",
    de: "Monitor-Leitfaden",
    pt: "Guia do Monitor",
    ja: "モニターガイド",
    ko: "모니터 가이드"
  },
  "Header.guides.laptop": {
    hi: "लैपटॉप गाइड",
    es: "Guía de Portátil",
    fr: "Guide d'Ordinateur Portable",
    de: "Laptop-Leitfaden",
    pt: "Guia do Laptop",
    ja: "ラップトップガイド",
    ko: "노트북 가이드"
  },
  "Header.guides.tv": {
    hi: "टीवी गाइड",
    es: "Guía de TV",
    fr: "Guide TV",
    de: "TV-Leitfaden",
    pt: "Guia da TV",
    ja: "テレビガイド",
    ko: "TV 가이드"
  },
  "Header.guides.oled": {
    hi: "OLED गाइड",
    es: "Guía OLED",
    fr: "Guide OLED",
    de: "OLED-Leitfaden",
    pt: "Guia OLED",
    ja: "OLEDガイド",
    ko: "OLED 가이드"
  },
  "Header.guides.mobile": {
    hi: "मोबाइल गाइड",
    es: "Guía Móvil",
    fr: "Guide Mobile",
    de: "Mobil-Leitfaden",
    pt: "Guia Móvel",
    ja: "モバイルガイド",
    ko: "모바일 가이드"
  },
  "Header.guides.lcd": {
    hi: "LCD गाइड",
    es: "Guía LCD",
    fr: "Guide LCD",
    de: "LCD-Leitfaden",
    pt: "Guia LCD",
    ja: "LCDガイド",
    ko: "LCD 가이드"
  },
  "Header.dropdown.popularTests": {
    hi: "लोकप्रिय परीक्षण",
    es: "Pruebas Populares",
    fr: "Tests Populaires",
    de: "Beliebte Tests",
    pt: "Testes Populares",
    ja: "人気のテスト",
    ko: "인기 테스트"
  },
  "Header.dropdown.deadPixels": {
    hi: "डेड पिक्सल टेस्ट",
    es: "Test de Píxeles Muertos",
    fr: "Test de Pixels Morts",
    de: "Toter-Pixel-Test",
    pt: "Teste de Pixels Mortos",
    ja: "デッドピクセルテスト",
    ko: "불량 픽셀 테스트"
  },
  "Header.dropdown.colorTest": {
    hi: "रंग परीक्षण",
    es: "Test de Color",
    fr: "Test de Couleur",
    de: "Farbtest",
    pt: "Teste de Cor",
    ja: "カラーテスト",
    ko: "색상 테스트"
  },
  "Header.dropdown.brightness": {
    hi: "चमक",
    es: "Brillo",
    fr: "Luminosité",
    de: "Helligkeit",
    pt: "Brilho",
    ja: "輝度",
    ko: "밝기"
  },
  "Header.dropdown.contrast": {
    hi: "कंट्रास्ट",
    es: "Contraste",
    fr: "Contraste",
    de: "Kontrast",
    pt: "Contraste",
    ja: "コントラスト",
    ko: "대비"
  },
  "Header.dropdown.ghosting": {
    hi: "घोस्टिंग टेस्ट",
    es: "Test de Ghosting",
    fr: "Test de Ghosting",
    de: "Ghosting-Test",
    pt: "Teste de Ghosting",
    ja: "ゴーストテスト",
    ko: "고스팅 테스트"
  },
  "Header.dropdown.refreshRate": {
    hi: "रिफ्रेश रेट टेस्ट",
    es: "Test de Tasa de Actualización",
    fr: "Test de Taux de Rafraîchissement",
    de: "Bildwiederholraten-Test",
    pt: "Teste de Taxa de Atualização",
    ja: "リフレッシュレートテスト",
    ko: "주사율 테스트"
  },
  "Header.dropdown.viewAllTests": {
    hi: "सभी 28 परीक्षण देखें",
    es: "Ver los 28 Tests",
    fr: "Voir les 28 Tests",
    de: "Alle 28 Tests anzeigen",
    pt: "Ver todos os 28 Testes",
    ja: "28すべてのテストを見る",
    ko: "28개 테스트 모두 보기"
  },
  "Header.dropdown.troubleshootInspect": {
    hi: "समस्या निवारण और निरीक्षण",
    es: "Diagnosticar e Inspeccionar",
    fr: "Dépanner et Inspecter",
    de: "Fehlersuche & Inspektion",
    pt: "Solucionar e Inspecionar",
    ja: "トラブルシューティングと検査",
    ko: "문제 해결 및 검사"
  },
  "Header.dropdown.diagnoseProblem": {
    hi: "समस्या का निदान करें",
    es: "Diagnosticar un Problema",
    fr: "Diagnostiquer un Problème",
    de: "Problem Diagnostizieren",
    pt: "Diagnosticar um Problema",
    ja: "問題を診断する",
    ko: "문제 진단"
  },
  "Header.dropdown.wizardBadge": {
    hi: "विज़ार्ड",
    es: "ASISTENTE",
    fr: "ASSISTANT",
    de: "ASSISTENT",
    pt: "ASSISTENTE",
    ja: "ウィザード",
    ko: "마법사"
  },
  "Header.dropdown.generalCheckup": {
    hi: "सामान्य जांच",
    es: "Revisión General",
    fr: "Vérification Générale",
    de: "Allgemeine Überprüfung",
    pt: "Verificação Geral",
    ja: "一般チェック",
    ko: "일반 점검"
  },
  "Header.dropdown.subAllRound": {
    hi: "सर्व-गोल",
    es: "Todo en uno",
    fr: "Polyvalent",
    de: "Allround",
    pt: "Completo",
    ja: "オールラウンド",
    ko: "전체 검사"
  },
  "Header.dropdown.usedMonitor": {
    hi: "पुराना मॉनिटर",
    es: "Monitor Usado",
    fr: "Moniteur d'Occasion",
    de: "Gebrauchter Monitor",
    pt: "Monitor Usado",
    ja: "中古モニター",
    ko: "중고 모니터"
  },
  "Header.dropdown.subPrePurchase": {
    hi: "पूर्व-खरीद",
    es: "Pre-compra",
    fr: "Pré-achat",
    de: "Vor dem Kauf",
    pt: "Pré-compra",
    ja: "購入前",
    ko: "구매 전"
  },
  "Header.dropdown.gamingDisplay": {
    hi: "गेमिंग डिस्प्ले",
    es: "Pantalla de Juegos",
    fr: "Écran de Jeu",
    de: "Gaming-Display",
    pt: "Tela de Jogos",
    ja: "ゲーミングディスプレイ",
    ko: "게이밍 디스플레이"
  },
  "Header.dropdown.subHzMotion": {
    hi: "Hz और गति",
    es: "Hz y movimiento",
    fr: "Hz et mouvement",
    de: "Hz & Bewegung",
    pt: "Hz e movimento",
    ja: "Hzとモーション",
    ko: "Hz 및 동작"
  },
  "Header.dropdown.oledDisplay": {
    hi: "OLED डिस्प्ले",
    es: "Pantalla OLED",
    fr: "Écran OLED",
    de: "OLED-Display",
    pt: "Tela OLED",
    ja: "OLEDディスプレイ",
    ko: "OLED 디스플레이"
  },
  "Header.dropdown.subBurnIn": {
    hi: "बर्न-इन और काला",
    es: "Burn-in y negro",
    fr: "Burn-in et noir",
    de: "Burn-In & Schwarz",
    pt: "Burn-in e preto",
    ja: "焼き付きと黒",
    ko: "번인 및 블랙"
  },
  "Header.dropdown.laptopDisplay": {
    hi: "लैपटॉप डिस्प्ले",
    es: "Pantalla de Portátil",
    fr: "Écran d'Ordinateur Portable",
    de: "Laptop-Display",
    pt: "Tela de Laptop",
    ja: "ラップトップディスプレイ",
    ko: "노트북 디스플레이"
  },
  "Header.dropdown.subDpiScale": {
    hi: "DPI और स्केल",
    es: "DPI y escala",
    fr: "DPI et échelle",
    de: "DPI & Skalierung",
    pt: "DPI e escala",
    ja: "DPIとスケール",
    ko: "DPI 및 배율"
  },
  "Header.dropdown.savedReports": {
    hi: "सहेजी गई रिपोर्ट और नोट्स",
    es: "Informes y Notas Guardados",
    fr: "Rapports et Notes Sauvegardés",
    de: "Gespeicherte Berichte & Notizen",
    pt: "Relatórios e Notas Salvos",
    ja: "保存済みレポートとメモ",
    ko: "저장된 보고서 및 메모"
  },
  "Header.dropdown.inspectionHub": {
    hi: "निरीक्षण हब",
    es: "Centro de Inspección",
    fr: "Centre d'Inspection",
    de: "Inspektions-Hub",
    pt: "Central de Inspeção",
    ja: "検査ハブ",
    ko: "검사 허브"
  },
  "Header.dropdown.utilitiesTools": {
    hi: "उपयोगिताएं और उपकरण",
    es: "Utilidades y Herramientas",
    fr: "Utilitaires et Outils",
    de: "Hilfsprogramme & Werkzeuge",
    pt: "Utilitários e Ferramentas",
    ja: "ユーティリティとツール",
    ko: "유틸리티 및 도구"
  },
  "Header.dropdown.displayInfo": {
    hi: "डिस्प्ले जानकारी",
    es: "Información de Pantalla",
    fr: "Informations d'Affichage",
    de: "Anzeige-Informationen",
    pt: "Informações da Tela",
    ja: "ディスプレイ情報",
    ko: "디스플레이 정보"
  },
  "Header.dropdown.resolutionPpi": {
    hi: "रिज़ॉल्यूशन और PPI",
    es: "Resolución y PPI",
    fr: "Résolution et PPI",
    de: "Auflösung & PPI",
    pt: "Resolução e PPI",
    ja: "解像度とPPI",
    ko: "해상도 및 PPI"
  },
  "Header.dropdown.compareDisplays": {
    hi: "डिस्प्ले की तुलना करें",
    es: "Comparar Pantallas",
    fr: "Comparer les Affichages",
    de: "Anzeigen Vergleichen",
    pt: "Comparar Telas",
    ja: "ディスプレイを比較",
    ko: "디스플레이 비교"
  },
  "Header.dropdown.customPattern": {
    hi: "कस्टम पैटर्न",
    es: "Patrón Personalizado",
    fr: "Motif Personnalisé",
    de: "Benutzerdefiniertes Muster",
    pt: "Padrão Personalizado",
    ja: "カスタムパターン",
    ko: "사용자 정의 패턴"
  },
  "Header.dropdown.viewAllTools": {
    hi: "सभी टूल देखें",
    es: "Ver Todas las Herramientas",
    fr: "Voir Tous les Outils",
    de: "Alle Werkzeuge Anzeigen",
    pt: "Ver Todas as Ferramentas",
    ja: "すべてのツールを見る",
    ko: "모든 도구 보기"
  },
  "Header.dropdown.practicalGuides": {
    hi: "व्यावहारिक गाइड",
    es: "Guías Prácticas",
    fr: "Guides Pratiques",
    de: "Praktische Anleitungen",
    pt: "Guias Práticos",
    ja: "実践ガイド",
    ko: "실용 가이드"
  },
  "Header.dropdown.deadVsStuck": {
    hi: "डेड बनाम स्टक पिक्सल",
    es: "Píxeles Muertos vs Atascados",
    fr: "Pixels Morts vs Coincés",
    de: "Tote vs. Feststeckende Pixel",
    pt: "Pixels Mortos vs Presos",
    ja: "デッドピクセルvs固着ピクセル",
    ko: "불량 픽셀 vs 고착 픽셀"
  },
  "Header.dropdown.ghostingMotion": {
    hi: "घोस्टिंग और गति",
    es: "Ghosting y Movimiento",
    fr: "Ghosting et Mouvement",
    de: "Ghosting & Bewegung",
    pt: "Ghosting e Movimento",
    ja: "ゴーストとモーション",
    ko: "고스팅 및 동작"
  },
  "Header.dropdown.backlightBleed": {
    hi: "बैकलाइट ब्लीड",
    es: "Sangrado de Retroiluminación",
    fr: "Saignement de Rétroéclairage",
    de: "Hintergrundlicht-Bleed",
    pt: "Sangramento de Retroiluminação",
    ja: "バックライトブリード",
    ko: "백라이트 번짐"
  },
  "Header.dropdown.viewingAngles": {
    hi: "देखने के कोण",
    es: "Ángulos de Visión",
    fr: "Angles de Visionnage",
    de: "Betrachtungswinkel",
    pt: "Ângulos de Visão",
    ja: "視野角",
    ko: "시야각"
  },
  "Header.dropdown.allGuides": {
    hi: "सभी डिस्प्ले गाइड",
    es: "Todas las Guías de Pantalla",
    fr: "Tous les Guides d'Affichage",
    de: "Alle Anzeige-Anleitungen",
    pt: "Todos os Guias de Tela",
    ja: "すべてのディスプレイガイド",
    ko: "모든 디스플레이 가이드"
  },
  "Header.searchPlaceholder": {
    hi: "परीक्षण या गाइड खोजें...",
    es: "Buscar pruebas o guías...",
    fr: "Rechercher des tests ou guides...",
    de: "Tests oder Anleitungen suchen...",
    pt: "Pesquisar testes ou guias...",
    ja: "テストやガイドを検索...",
    ko: "테스트 또는 가이드 검색..."
  },

  // ── Footer ───────────────────────────────────────────────
  "Footer.title": {
    hi: "मॉनिटर टेस्टर",
    es: "Probador de Monitor",
    fr: "Testeur de Moniteur",
    de: "Monitor-Tester",
    pt: "Testador de Monitor",
    ja: "モニターテスター",
    ko: "모니터 테스터"
  },
  "Footer.description": {
    hi: "एक मुफ्त, खुला और गोपनीयता-केंद्रित टूल सूट जो आपके डिस्प्ले को डेड पिक्सल, बैकलाइट ब्लीड, रंग, गति और अधिक के लिए परीक्षण करता है। सीधे आपके ब्राउज़र में काम करता है।",
    es: "Un conjunto de herramientas gratuito, abierto y centrado en la privacidad para probar tu pantalla en busca de píxeles muertos, sangrado de retroiluminación, color, movimiento y más. Funciona directamente en tu navegador.",
    fr: "Une suite d'outils gratuite, ouverte et axée sur la confidentialité pour tester votre écran pour les pixels morts, le saignement de rétroéclairage, la couleur, le mouvement et plus encore. Fonctionne directement dans votre navigateur.",
    de: "Eine kostenlose, offene und datenschutzorientierte Toolsuite zum Testen Ihres Displays auf tote Pixel, Hintergrundlicht-Bleed, Farbe, Bewegung und mehr. Funktioniert direkt in Ihrem Browser.",
    pt: "Um conjunto de ferramentas gratuito, aberto e focado em privacidade para testar sua tela em busca de pixels mortos, sangramento de retroiluminação, cor, movimento e mais. Funciona diretamente no seu navegador.",
    ja: "デッドピクセル、バックライトブリード、色、動きなどをディスプレイでテストするための無料でオープンなプライバシー重視のツールスイート。ブラウザで直接動作します。",
    ko: "불량 픽셀, 백라이트 번짐, 색상, 동작 등을 테스트하기 위한 무료, 개방형, 개인정보 보호 중심 도구 모음. 브라우저에서 직접 작동합니다."
  },
  "Footer.copyright": {
    hi: "मॉनिटर टेस्टर। सर्वाधिकार सुरक्षित।",
    es: "Probador de Monitor. Todos los derechos reservados.",
    fr: "Testeur de Moniteur. Tous droits réservés.",
    de: "Monitor-Tester. Alle Rechte vorbehalten.",
    pt: "Testador de Monitor. Todos os direitos reservados.",
    ja: "モニターテスター。全著作権所有。",
    ko: "모니터 테스터. 모든 권리 보유."
  },
  "Footer.attributes.browserTitle": {
    hi: "ब्राउज़र में काम करता है",
    es: "Funciona en tu navegador",
    fr: "Fonctionne dans votre navigateur",
    de: "Funktioniert im Browser",
    pt: "Funciona no seu navegador",
    ja: "ブラウザで動作",
    ko: "브라우저에서 작동"
  },
  "Footer.attributes.browserDesc": {
    hi: "कोई सॉफ्टवेयर आवश्यक नहीं",
    es: "Sin software necesario",
    fr: "Aucun logiciel requis",
    de: "Keine Software erforderlich",
    pt: "Nenhum software necessário",
    ja: "ソフトウェア不要",
    ko: "소프트웨어 불필요"
  },
  "Footer.attributes.privacyTitle": {
    hi: "निजी और सुरक्षित",
    es: "Privado y seguro",
    fr: "Privé et sécurisé",
    de: "Privat und sicher",
    pt: "Privado e seguro",
    ja: "プライベートで安全",
    ko: "개인 정보 보호 및 보안"
  },
  "Footer.attributes.privacyDesc": {
    hi: "सभी परीक्षण स्थानीय रूप से चलते हैं",
    es: "Todas las pruebas se ejecutan localmente",
    fr: "Tous les tests s'exécutent localement",
    de: "Alle Tests laufen lokal",
    pt: "Todos os testes são executados localmente",
    ja: "すべてのテストはローカルで実行",
    ko: "모든 테스트는 로컬에서 실행"
  },
  "Footer.attributes.deviceTitle": {
    hi: "किसी भी डिवाइस पर काम करता है",
    es: "Funciona en cualquier dispositivo",
    fr: "Fonctionne sur n'importe quel appareil",
    de: "Funktioniert auf jedem Gerät",
    pt: "Funciona em qualquer dispositivo",
    ja: "あらゆるデバイスで動作",
    ko: "모든 기기에서 작동"
  },
  "Footer.attributes.deviceDesc": {
    hi: "डेस्कटॉप, लैपटॉप, टैबलेट, मोबाइल",
    es: "Escritorio, portátil, tableta, móvil",
    fr: "Bureau, ordinateur portable, tablette, mobile",
    de: "Desktop, Laptop, Tablet, Mobil",
    pt: "Desktop, laptop, tablet, celular",
    ja: "デスクトップ、ラップトップ、タブレット、モバイル",
    ko: "데스크탑, 노트북, 태블릿, 모바일"
  },
  "Footer.attributes.i18nTitle": {
    hi: "बहु-भाषा",
    es: "Multilingüe",
    fr: "Multilingue",
    de: "Mehrsprachig",
    pt: "Multilíngue",
    ja: "多言語対応",
    ko: "다국어"
  },
  "Footer.attributes.i18nDesc": {
    hi: "अनेक भाषाओं में उपलब्ध",
    es: "Disponible en múltiples idiomas",
    fr: "Disponible en plusieurs langues",
    de: "In mehreren Sprachen verfügbar",
    pt: "Disponível em vários idiomas",
    ja: "複数の言語で利用可能",
    ko: "여러 언어로 이용 가능"
  },
  "Footer.columns.tests": {
    hi: "परीक्षण",
    es: "Pruebas",
    fr: "Tests",
    de: "Tests",
    pt: "Testes",
    ja: "テスト",
    ko: "테스트"
  },
  "Footer.columns.inspection": {
    hi: "निरीक्षण",
    es: "Inspección",
    fr: "Inspection",
    de: "Inspektion",
    pt: "Inspeção",
    ja: "検査",
    ko: "검사"
  },
  "Footer.columns.guides": {
    hi: "गाइड",
    es: "Guías",
    fr: "Guides",
    de: "Anleitungen",
    pt: "Guias",
    ja: "ガイド",
    ko: "가이드"
  },
  "Footer.columns.about": {
    hi: "हमारे बारे में",
    es: "Acerca de",
    fr: "À propos",
    de: "Über uns",
    pt: "Sobre",
    ja: "について",
    ko: "소개"
  },
  "Footer.columns.guidesAndTools": {
    hi: "गाइड और उपकरण",
    es: "Guías y Herramientas",
    fr: "Guides et Outils",
    de: "Anleitungen & Werkzeuge",
    pt: "Guias e Ferramentas",
    ja: "ガイドとツール",
    ko: "가이드 및 도구"
  },

  // ── Terms ──────────────────────────────────────────────
  "Terms.eyebrow": {
    hi: "उपयोग की शर्तें और अस्वीकरण",
    es: "TÉRMINOS Y AVISO LEGAL",
    fr: "CONDITIONS ET AVIS LÉGAL",
    de: "NUTZUNGSBEDINGUNGEN & HAFTUNGSAUSSCHLUSS",
    pt: "TERMOS E AVISO LEGAL",
    ja: "利用規約と免責事項",
    ko: "이용약관 및 면책조항"
  },
  "Terms.title": {
    hi: "उपयोग की शर्तें",
    es: "Términos de Uso",
    fr: "Conditions d'Utilisation",
    de: "Nutzungsbedingungen",
    pt: "Termos de Uso",
    ja: "利用規約",
    ko: "이용 약관"
  },
  "Terms.description": {
    hi: "मॉनिटर टेस्टर एक मुफ्त नैदानिक उपकरण है जिसे डिस्प्ले की गुणवत्ता का मूल्यांकन करने में मदद के लिए डिज़ाइन किया गया है।",
    es: "Monitor Tester es una herramienta de diagnóstico gratuita diseñada para ayudar a evaluar la calidad de la pantalla.",
    fr: "Monitor Tester est un outil de diagnostic gratuit conçu pour aider à évaluer la qualité de l'écran.",
    de: "Monitor Tester ist ein kostenloses Diagnosewerkzeug, das zur Bewertung der Anzeigequalität entwickelt wurde.",
    pt: "Monitor Tester é uma ferramenta de diagnóstico gratuita projetada para ajudar a avaliar a qualidade da tela.",
    ja: "モニターテスターは、ディスプレイの品質評価を支援するために設計された無料の診断ツールです。",
    ko: "모니터 테스터는 디스플레이 품질 평가를 돕기 위해 설계된 무료 진단 도구입니다."
  },
  "Terms.lastUpdated": {
    hi: "अंतिम अपडेट: सितंबर 2026",
    es: "Última actualización: septiembre de 2026",
    fr: "Dernière mise à jour: septembre 2026",
    de: "Zuletzt aktualisiert: September 2026",
    pt: "Última atualização: setembro de 2026",
    ja: "最終更新日: 2026年9月",
    ko: "마지막 업데이트: 2026년 9월"
  },
  "Terms.diagnosticTitle": {
    hi: "नैदानिक उद्देश्य केवल",
    es: "Solo con Fines de Diagnóstico",
    fr: "À des Fins de Diagnostic Uniquement",
    de: "Nur zu Diagnosezwecken",
    pt: "Apenas para Fins de Diagnóstico",
    ja: "診断目的のみ",
    ko: "진단 목적으로만 사용"
  },
  "Terms.diagnosticText": {
    hi: "इस वेबसाइट पर उपलब्ध परीक्षण और उपकरण पूरी तरह से नैदानिक और शैक्षिक उद्देश्यों के लिए हैं। परिणाम आपके डिवाइस, ब्राउज़र, ऑपरेटिंग सिस्टम और कॉन्फ़िगरेशन के आधार पर भिन्न हो सकते हैं।",
    es: "Las pruebas y herramientas disponibles en este sitio web son exclusivamente para fines de diagnóstico y educativos. Los resultados pueden variar según tu dispositivo, navegador, sistema operativo y configuración.",
    fr: "Les tests et outils disponibles sur ce site Web sont exclusivement à des fins de diagnostic et éducatives. Les résultats peuvent varier en fonction de votre appareil, navigateur, système d'exploitation et configuration.",
    de: "Die auf dieser Website verfügbaren Tests und Werkzeuge dienen ausschließlich Diagnose- und Bildungszwecken. Ergebnisse können je nach Gerät, Browser, Betriebssystem und Konfiguration variieren.",
    pt: "Os testes e ferramentas disponíveis neste site são exclusivamente para fins de diagnóstico e educacionais. Os resultados podem variar dependendo do seu dispositivo, navegador, sistema operacional e configuração.",
    ja: "このウェブサイトで利用可能なテストとツールは、診断および教育目的のみです。結果は、デバイス、ブラウザ、オペレーティングシステム、および設定によって異なる場合があります。",
    ko: "이 웹사이트에서 제공되는 테스트와 도구는 진단 및 교육 목적으로만 사용됩니다. 결과는 기기, 브라우저, 운영 체제 및 구성에 따라 다를 수 있습니다."
  },
  "Terms.accuracyTitle": {
    hi: "सटीकता की सीमाएं",
    es: "Limitaciones de Precisión",
    fr: "Limites de Précision",
    de: "Genauigkeitsgrenzen",
    pt: "Limitações de Precisão",
    ja: "精度の制限",
    ko: "정확도 제한"
  },
  "Terms.accuracyText": {
    hi: "ब्राउज़र-आधारित परीक्षण पेशेवर कैलिब्रेटेड हार्डवेयर उपकरणों की जगह नहीं ले सकते। मापी गई मान जैसे रिफ्रेश रेट, रंग गहराई, और HDR समर्थन ब्राउज़र API द्वारा रिपोर्ट किए जाते हैं और पेशेवर कैलिब्रेशन उपकरण से भिन्न हो सकते हैं।",
    es: "Las pruebas basadas en navegador no pueden reemplazar herramientas de hardware calibrado profesionalmente. Los valores medidos como la tasa de actualización, la profundidad de color y la compatibilidad con HDR son informados por las API del navegador y pueden diferir de las herramientas de calibración profesional.",
    fr: "Les tests basés sur le navigateur ne peuvent pas remplacer les outils matériels calibrés professionnellement. Les valeurs mesurées telles que le taux de rafraîchissement, la profondeur des couleurs et la prise en charge HDR sont rapportées par les API du navigateur et peuvent différer des outils d'étalonnage professionnels.",
    de: "Browserbasierte Tests können professionell kalibrierte Hardware-Tools nicht ersetzen. Gemessene Werte wie Bildwiederholrate, Farbtiefe und HDR-Unterstützung werden von Browser-APIs gemeldet und können von professionellen Kalibrierungswerkzeugen abweichen.",
    pt: "Testes baseados em navegador não podem substituir ferramentas de hardware calibradas profissionalmente. Valores medidos como taxa de atualização, profundidade de cor e suporte HDR são relatados pelas APIs do navegador e podem diferir de ferramentas de calibração profissional.",
    ja: "ブラウザベースのテストは、専門的にキャリブレーションされたハードウェアツールの代替にはなりません。リフレッシュレート、色深度、HDRサポートなどの測定値はブラウザAPIによって報告され、専門的なキャリブレーションツールとは異なる場合があります。",
    ko: "브라우저 기반 테스트는 전문적으로 교정된 하드웨어 도구를 대체할 수 없습니다. 재생률, 색 깊이, HDR 지원과 같은 측정값은 브라우저 API에 의해 보고되며 전문 교정 도구와 다를 수 있습니다."
  },
  "Terms.liabilityTitle": {
    hi: "दायित्व का अस्वीकरण",
    es: "Exención de Responsabilidad",
    fr: "Limitation de Responsabilité",
    de: "Haftungsbeschränkung",
    pt: "Isenção de Responsabilidade",
    ja: "責任の否認",
    ko: "책임 제한"
  },
  "Terms.liabilityText": {
    hi: "मॉनिटर टेस्टर के परिणामों के आधार पर लिए गए निर्णयों के लिए हम जिम्मेदार नहीं हैं, जिसमें वारंटी दावे, खरीद या वापसी निर्णय शामिल हैं।",
    es: "No somos responsables de las decisiones tomadas basándose en los resultados de Monitor Tester, incluidas las reclamaciones de garantía, decisiones de compra o devolución.",
    fr: "Nous ne sommes pas responsables des décisions prises sur la base des résultats de Monitor Tester, y compris les réclamations de garantie, les décisions d'achat ou de retour.",
    de: "Wir übernehmen keine Verantwortung für Entscheidungen, die auf der Grundlage der Ergebnisse von Monitor Tester getroffen werden, einschließlich Garantieansprüche, Kauf- oder Rückgabeentscheidungen.",
    pt: "Não somos responsáveis por decisões tomadas com base nos resultados do Monitor Tester, incluindo reivindicações de garantia, decisões de compra ou devolução.",
    ja: "保証請求、購入または返品の決定を含む、モニターテスターの結果に基づいて下された決定について、当社は責任を負いません。",
    ko: "보증 청구, 구매 또는 반품 결정을 포함하여 모니터 테스터의 결과를 기반으로 내린 결정에 대해 당사는 책임을 지지 않습니다."
  },
  "Terms.warrantyTitle": {
    hi: "वारंटी परामर्श",
    es: "Asesoramiento sobre Garantía",
    fr: "Conseils sur la Garantie",
    de: "Garantieberatung",
    pt: "Assessoria de Garantia",
    ja: "保証アドバイス",
    ko: "보증 조언"
  },
  "Terms.warrantyText": {
    hi: "हमारे परीक्षण परिणाम केवल संदर्भ के लिए हैं। वारंटी दावों के लिए, कृपया अपने निर्माता के दिशानिर्देश देखें और अपने डिस्प्ले का पेशेवर मूल्यांकन करें।",
    es: "Nuestros resultados de prueba son solo de referencia. Para reclamaciones de garantía, consulte las directrices de su fabricante y obtenga una evaluación profesional de su pantalla.",
    fr: "Nos résultats de test sont uniquement à titre de référence. Pour les réclamations de garantie, veuillez consulter les directives de votre fabricant et obtenir une évaluation professionnelle de votre écran.",
    de: "Unsere Testergebnisse sind nur als Referenz gedacht. Für Garantieansprüche konsultieren Sie bitte die Richtlinien Ihres Herstellers und lassen Sie Ihr Display professionell bewerten.",
    pt: "Nossos resultados de teste são apenas para referência. Para reivindicações de garantia, consulte as diretrizes do fabricante e obtenha uma avaliação profissional da sua tela.",
    ja: "当社のテスト結果はあくまで参考用です。保証請求については、製造者のガイドラインを参照し、ディスプレイの専門的な評価を受けてください。",
    ko: "당사의 테스트 결과는 참고용에 불과합니다. 보증 청구에 대해서는 제조업체의 지침을 참조하고 디스플레이의 전문적인 평가를 받으십시오."
  },
  "Terms.openSourceTitle": {
    hi: "ओपन सोर्स",
    es: "Código Abierto",
    fr: "Open Source",
    de: "Open Source",
    pt: "Código Aberto",
    ja: "オープンソース",
    ko: "오픈 소스"
  },
  "Terms.openSourceText": {
    hi: "मॉनिटर टेस्टर ओपन सोर्स है। आप GitHub पर स्रोत कोड की समीक्षा कर सकते हैं, बग रिपोर्ट कर सकते हैं, या सुधार का सुझाव दे सकते हैं।",
    es: "Monitor Tester es de código abierto. Puedes revisar el código fuente, reportar errores o sugerir mejoras en GitHub.",
    fr: "Monitor Tester est open source. Vous pouvez examiner le code source, signaler des bogues ou suggérer des améliorations sur GitHub.",
    de: "Monitor Tester ist Open Source. Sie können den Quellcode auf GitHub überprüfen, Fehler melden oder Verbesserungen vorschlagen.",
    pt: "Monitor Tester é de código aberto. Você pode revisar o código-fonte, relatar erros ou sugerir melhorias no GitHub.",
    ja: "モニターテスターはオープンソースです。GitHubでソースコードを確認したり、バグを報告したり、改善を提案したりできます。",
    ko: "모니터 테스터는 오픈 소스입니다. GitHub에서 소스 코드를 검토하거나 버그를 보고하거나 개선 사항을 제안할 수 있습니다."
  },
  "Terms.changeTitle": {
    hi: "परिवर्तन",
    es: "Cambios",
    fr: "Modifications",
    de: "Änderungen",
    pt: "Alterações",
    ja: "変更",
    ko: "변경 사항"
  },
  "Terms.changeText": {
    hi: "हम इन शर्तों को बिना किसी पूर्व सूचना के किसी भी समय बदलने का अधिकार सुरक्षित रखते हैं।",
    es: "Nos reservamos el derecho de cambiar estos términos en cualquier momento sin previo aviso.",
    fr: "Nous nous réservons le droit de modifier ces conditions à tout moment sans préavis.",
    de: "Wir behalten uns das Recht vor, diese Bedingungen jederzeit ohne vorherige Ankündigung zu ändern.",
    pt: "Reservamo-nos o direito de alterar estes termos a qualquer momento sem aviso prévio.",
    ja: "当社は、事前通知なしにいつでもこれらの規約を変更する権利を留保します。",
    ko: "당사는 사전 통지 없이 언제든지 이 약관을 변경할 권리를 보유합니다."
  },
  "Terms.contactTitle": {
    hi: "संपर्क",
    es: "Contacto",
    fr: "Contact",
    de: "Kontakt",
    pt: "Contato",
    ja: "お問い合わせ",
    ko: "문의"
  },
  "Terms.contactText": {
    hi: "यदि आपके कोई प्रश्न हैं, तो कृपया GitHub के माध्यम से हमसे संपर्क करें।",
    es: "Si tienes preguntas, contáctanos a través de GitHub.",
    fr: "Si vous avez des questions, contactez-nous via GitHub.",
    de: "Wenn Sie Fragen haben, kontaktieren Sie uns über GitHub.",
    pt: "Se você tiver dúvidas, entre em contato conosco pelo GitHub.",
    ja: "ご質問がある場合は、GitHubを通じてお問い合わせください。",
    ko: "질문이 있으시면 GitHub를 통해 문의하십시오."
  },

  // ── Contact ─────────────────────────────────────────────
  "Contact.eyebrow": {
    hi: "संपर्क करें",
    es: "CONTACTO",
    fr: "CONTACT",
    de: "KONTAKT",
    pt: "CONTATO",
    ja: "お問い合わせ",
    ko: "문의"
  },
  "Contact.title": {
    hi: "संपर्क करें",
    es: "Contacto",
    fr: "Contact",
    de: "Kontakt",
    pt: "Contato",
    ja: "お問い合わせ",
    ko: "문의하기"
  },
  "Contact.description": {
    hi: "हमसे GitHub या ईमेल के माध्यम से संपर्क करें।",
    es: "Contáctanos a través de GitHub o correo electrónico.",
    fr: "Contactez-nous via GitHub ou par e-mail.",
    de: "Kontaktieren Sie uns über GitHub oder per E-Mail.",
    pt: "Entre em contato conosco pelo GitHub ou e-mail.",
    ja: "GitHubまたはメールでお問い合わせください。",
    ko: "GitHub 또는 이메일을 통해 문의하세요."
  },
  "Contact.githubTitle": {
    hi: "GitHub के माध्यम से",
    es: "A través de GitHub",
    fr: "Via GitHub",
    de: "Über GitHub",
    pt: "Via GitHub",
    ja: "GitHubを通じて",
    ko: "GitHub를 통해"
  },
  "Contact.githubText": {
    hi: "बग रिपोर्ट करें, सुविधाओं का सुझाव दें, या हमारे GitHub रिपॉजिटरी पर योगदान दें।",
    es: "Reporta errores, sugiere funciones o contribuye en nuestro repositorio de GitHub.",
    fr: "Signalez des bogues, suggérez des fonctionnalités ou contribuez à notre référentiel GitHub.",
    de: "Melden Sie Fehler, schlagen Sie Funktionen vor oder tragen Sie zu unserem GitHub-Repository bei.",
    pt: "Relate erros, sugira recursos ou contribua em nosso repositório do GitHub.",
    ja: "バグを報告したり、機能を提案したり、GitHubリポジトリに貢献したりしてください。",
    ko: "GitHub 리포지토리에서 버그를 보고하거나 기능을 제안하거나 기여하세요."
  },
  "Contact.githubButton": {
    hi: "GitHub पर देखें",
    es: "Ver en GitHub",
    fr: "Voir sur GitHub",
    de: "Auf GitHub ansehen",
    pt: "Ver no GitHub",
    ja: "GitHubで見る",
    ko: "GitHub에서 보기"
  },
  "Contact.emailTitle": {
    hi: "ईमेल द्वारा",
    es: "Por correo electrónico",
    fr: "Par e-mail",
    de: "Per E-Mail",
    pt: "Por e-mail",
    ja: "メールで",
    ko: "이메일로"
  },
  "Contact.emailText": {
    hi: "प्रत्यक्ष प्रश्नों, सहयोग अनुरोधों, या व्यावसायिक पूछताछ के लिए हमें ईमेल करें।",
    es: "Envíanos un correo electrónico para consultas directas, solicitudes de colaboración o consultas comerciales.",
    fr: "Envoyez-nous un e-mail pour des demandes directes, des demandes de collaboration ou des demandes commerciales.",
    de: "Senden Sie uns eine E-Mail für direkte Anfragen, Kooperationsanfragen oder Geschäftsanfragen.",
    pt: "Envie-nos um e-mail para consultas diretas, solicitações de colaboração ou consultas comerciais.",
    ja: "直接のお問い合わせ、コラボレーションのリクエスト、またはビジネスに関するお問い合わせはメールでご連絡ください。",
    ko: "직접 문의, 협업 요청 또는 비즈니스 문의를 위해 이메일을 보내주세요."
  },
  "Contact.bugTitle": {
    hi: "बग रिपोर्ट",
    es: "Informe de Errores",
    fr: "Rapport de Bogues",
    de: "Fehlerbericht",
    pt: "Relatório de Bugs",
    ja: "バグレポート",
    ko: "버그 보고"
  },
  "Contact.bugText": {
    hi: "यदि आपको कोई तकनीकी समस्या मिली है, तो कृपया विस्तृत जानकारी के साथ GitHub पर एक issue खोलें।",
    es: "Si encontraste un problema técnico, por favor abre un issue en GitHub con detalles.",
    fr: "Si vous avez trouvé un problème technique, veuillez ouvrir un problème sur GitHub avec des détails.",
    de: "Wenn Sie ein technisches Problem gefunden haben, öffnen Sie bitte ein Issue auf GitHub mit Details.",
    pt: "Se você encontrou um problema técnico, abra um issue no GitHub com detalhes.",
    ja: "技術的な問題を見つけた場合は、詳細とともにGitHubでissueを開いてください。",
    ko: "기술적인 문제를 발견한 경우 GitHub에서 세부 정보와 함께 이슈를 열어주세요."
  },
  "Contact.featureTitle": {
    hi: "सुविधा अनुरोध",
    es: "Solicitud de Funciones",
    fr: "Demande de Fonctionnalité",
    de: "Funktionsanfrage",
    pt: "Solicitação de Recursos",
    ja: "機能リクエスト",
    ko: "기능 요청"
  },
  "Contact.featureText": {
    hi: "नए परीक्षण या सुधार के लिए सुझाव? हम प्रतिक्रिया का स्वागत करते हैं।",
    es: "¿Sugerencias para nuevas pruebas o mejoras? Bienvenimos los comentarios.",
    fr: "Des suggestions pour de nouveaux tests ou des améliorations? Nous accueillons les commentaires.",
    de: "Vorschläge für neue Tests oder Verbesserungen? Wir begrüßen Feedback.",
    pt: "Sugestões para novos testes ou melhorias? Recebemos feedback.",
    ja: "新しいテストや改善の提案はありますか？フィードバックを歓迎します。",
    ko: "새로운 테스트나 개선 사항에 대한 제안이 있으신가요? 피드백을 환영합니다."
  },

  // ── LanguageSwitcher ────────────────────────────────────
  "LanguageSwitcher.label": {
    hi: "भाषा",
    es: "Idioma",
    fr: "Langue",
    de: "Sprache",
    pt: "Idioma",
    ja: "言語",
    ko: "언어"
  },

  // ── Guides (screen test guide pages) ───────────────────
  "Guides.monitor.title": {
    hi: "मॉनिटर स्क्रीन टेस्ट",
    es: "Test de Pantalla de Monitor",
    fr: "Test d'Écran de Moniteur",
    de: "Monitor-Bildschirmtest",
    pt: "Teste de Tela de Monitor",
    ja: "モニタースクリーンテスト",
    ko: "모니터 화면 테스트"
  },
  "Guides.monitor.description": {
    hi: "डेस्कटॉप मॉनिटर के लिए व्यापक परीक्षण।",
    es: "Pruebas exhaustivas para monitores de escritorio.",
    fr: "Tests complets pour les moniteurs de bureau.",
    de: "Umfassende Tests für Desktop-Monitore.",
    pt: "Testes abrangentes para monitores desktop.",
    ja: "デスクトップモニターの包括的なテスト。",
    ko: "데스크탑 모니터를 위한 포괄적인 테스트."
  },
  "Guides.oled.title": {
    hi: "OLED स्क्रीन टेस्ट",
    es: "Test de Pantalla OLED",
    fr: "Test d'Écran OLED",
    de: "OLED-Bildschirmtest",
    pt: "Teste de Tela OLED",
    ja: "OLEDスクリーンテスト",
    ko: "OLED 화면 테스트"
  },
  "Guides.oled.description": {
    hi: "OLED इमेज रिटेंशन और ब्लैक लेवल के लिए विशेष परीक्षण।",
    es: "Pruebas especializadas para retención de imagen OLED y niveles de negro.",
    fr: "Tests spécialisés pour la rétention d'image OLED et les niveaux de noir.",
    de: "Spezialisierte Tests für OLED-Bildremanenz und Schwarzwerte.",
    pt: "Testes especializados para retenção de imagem OLED e níveis de preto.",
    ja: "OLEDの残像と黒レベルの特殊テスト。",
    ko: "OLED 이미지 잔상 및 블랙 레벨을 위한 특수 테스트."
  },
  "Guides.laptop.title": {
    hi: "लैपटॉप स्क्रीन टेस्ट",
    es: "Test de Pantalla de Portátil",
    fr: "Test d'Écran d'Ordinateur Portable",
    de: "Laptop-Bildschirmtest",
    pt: "Teste de Tela de Laptop",
    ja: "ラップトップスクリーンテスト",
    ko: "노트북 화면 테스트"
  },
  "Guides.laptop.description": {
    hi: "सामान्य लैपटॉप LCD पैनल के लिए परीक्षण।",
    es: "Pruebas para paneles LCD de portátiles típicos.",
    fr: "Tests pour les panneaux LCD d'ordinateurs portables typiques.",
    de: "Tests für typische Laptop-LCD-Panels.",
    pt: "Testes para painéis LCD típicos de laptop.",
    ja: "一般的なラップトップLCDパネルのテスト。",
    ko: "일반적인 노트북 LCD 패널 테스트."
  },
  "Guides.lcd.title": {
    hi: "LCD स्क्रीन टेस्ट",
    es: "Test de Pantalla LCD",
    fr: "Test d'Écran LCD",
    de: "LCD-Bildschirmtest",
    pt: "Teste de Tela LCD",
    ja: "LCDスクリーンテスト",
    ko: "LCD 화면 테스트"
  },
  "Guides.lcd.description": {
    hi: "LCD बैकलाइट ब्लीड और यूनिफॉर्मिटी के लिए परीक्षण।",
    es: "Pruebas para sangrado de retroiluminación LCD y uniformidad.",
    fr: "Tests pour le saignement de rétroéclairage LCD et l'uniformité.",
    de: "Tests für LCD-Hintergrundlicht-Bleed und Gleichmäßigkeit.",
    pt: "Testes para sangramento de retroiluminação LCD e uniformidade.",
    ja: "LCDバックライトブリードと均一性のテスト。",
    ko: "LCD 백라이트 번짐 및 균일성 테스트."
  },
  "Guides.tv.title": {
    hi: "TV स्क्रीन टेस्ट",
    es: "Test de Pantalla de TV",
    fr: "Test d'Écran de TV",
    de: "TV-Bildschirmtest",
    pt: "Teste de Tela de TV",
    ja: "テレビスクリーンテスト",
    ko: "TV 화면 테스트"
  },
  "Guides.tv.description": {
    hi: "TV मोशन प्रोसेसिंग और ब्लूमिंग के लिए परीक्षण।",
    es: "Pruebas para el procesamiento de movimiento de TV y blooming.",
    fr: "Tests pour le traitement du mouvement TV et le blooming.",
    de: "Tests für TV-Bewegungsverarbeitung und Blooming.",
    pt: "Testes para processamento de movimento de TV e blooming.",
    ja: "TVのモーション処理とブルーミングのテスト。",
    ko: "TV 모션 처리 및 블루밍 테스트."
  },
  "Guides.mobile.title": {
    hi: "मोबाइल स्क्रीन टेस्ट",
    es: "Test de Pantalla Móvil",
    fr: "Test d'Écran Mobile",
    de: "Mobil-Bildschirmtest",
    pt: "Teste de Tela Móvel",
    ja: "モバイルスクリーンテスト",
    ko: "모바일 화면 테스트"
  },
  "Guides.mobile.description": {
    hi: "मोबाइल टच स्क्रीन और OLED पैनल के लिए परीक्षण।",
    es: "Pruebas para pantallas táctiles móviles y paneles OLED.",
    fr: "Tests pour les écrans tactiles mobiles et les panneaux OLED.",
    de: "Tests für mobile Touchscreens und OLED-Panels.",
    pt: "Testes para telas touch móveis e painéis OLED.",
    ja: "モバイルタッチスクリーンとOLEDパネルのテスト。",
    ko: "모바일 터치 스크린 및 OLED 패널 테스트."
  },

  // ── Inspection ───────────────────────────────────────────
  "Inspection.hub.title": {
    hi: "मॉनिटर निरीक्षण",
    es: "Inspección de Monitor",
    fr: "Inspection du Moniteur",
    de: "Monitor-Inspektion",
    pt: "Inspeção de Monitor",
    ja: "モニター検査",
    ko: "모니터 검사"
  },
  "Inspection.hub.description": {
    hi: "यादृच्छिक परीक्षण खोलने के बजाय नए या पुराने मॉनिटर की व्यवस्थित जांच करें।",
    es: "Revisa un monitor nuevo o usado de forma sistemática en lugar de abrir pruebas aleatorias.",
    fr: "Vérifiez systématiquement un moniteur neuf ou d'occasion plutôt que d'ouvrir des tests aléatoires.",
    de: "Überprüfen Sie einen neuen oder gebrauchten Monitor systematisch, anstatt zufällige Tests zu öffnen.",
    pt: "Verifique um monitor novo ou usado sistematicamente em vez de abrir testes aleatórios.",
    ja: "ランダムなテストを開く代わりに、新品または中古のモニターを体系的にチェックします。",
    ko: "무작위 테스트를 열기보다 새것 또는 중고 모니터를 체계적으로 점검합니다."
  },
  "Inspection.hub.newMonitor": {
    hi: "मैंने अभी यह मॉनिटर खरीदा है",
    es: "Acabo de comprar este monitor",
    fr: "Je viens d'acheter ce moniteur",
    de: "Ich habe diesen Monitor gerade gekauft",
    pt: "Acabei de comprar este monitor",
    ja: "このモニターを購入したばかりです",
    ko: "이 모니터를 방금 구입했습니다"
  },
  "Inspection.hub.newMonitorDesc": {
    hi: "डेड पिक्सल, यूनिफॉर्मिटी, बैकलाइट ब्लीड और फ़ैक्टरी दोषों पर ध्यान केंद्रित करता है।",
    es: "Se centra en píxeles muertos, uniformidad, sangrado de retroiluminación y defectos de fábrica.",
    fr: "Se concentre sur les pixels morts, l'uniformité, le saignement de rétroéclairage et les défauts d'usine.",
    de: "Konzentriert sich auf tote Pixel, Gleichmäßigkeit, Hintergrundlicht-Bleed und Herstellungsfehler.",
    pt: "Foca em pixels mortos, uniformidade, sangramento de retroiluminação e defeitos de fábrica.",
    ja: "デッドピクセル、均一性、バックライトブリード、および工場の欠陥に焦点を当てます。",
    ko: "불량 픽셀, 균일성, 백라이트 번짐 및 공장 결함에 집중합니다."
  },
  "Inspection.hub.usedMonitor": {
    hi: "मैं पुराने मॉनिटर की जांच कर रहा हूं",
    es: "Estoy revisando un monitor usado",
    fr: "Je vérifie un moniteur d'occasion",
    de: "Ich prüfe einen gebrauchten Monitor",
    pt: "Estou verificando um monitor usado",
    ja: "中古モニターをチェックしています",
    ko: "중고 모니터를 확인하고 있습니다"
  },
  "Inspection.hub.usedMonitorDesc": {
    hi: "बर्न-इन, चमक क्षरण, पोर्ट स्वास्थ्य और डेड पिक्सल पर ध्यान केंद्रित करता है।",
    es: "Se centra en el burn-in, la degradación del brillo, el estado de los puertos y los píxeles muertos.",
    fr: "Se concentre sur le burn-in, la dégradation de la luminosité, l'état des ports et les pixels morts.",
    de: "Konzentriert sich auf Burn-In, Helligkeitsabbau, Port-Zustand und tote Pixel.",
    pt: "Foca em burn-in, degradação de brilho, saúde das portas e pixels mortos.",
    ja: "焼き付き、輝度の低下、ポートの状態、デッドピクセルに焦点を当てます。",
    ko: "번인, 밝기 저하, 포트 상태 및 불량 픽셀에 집중합니다."
  },
  "Inspection.hub.fiveMinuteCheck": {
    hi: "5 मिनट की त्वरित जांच",
    es: "Verificación Rápida de 5 Minutos",
    fr: "Vérification Rapide en 5 Minutes",
    de: "5-Minuten-Schnellprüfung",
    pt: "Verificação Rápida de 5 Minutos",
    ja: "5分間のクイックチェック",
    ko: "5분 빠른 점검"
  },
  "Inspection.hub.fullInspection": {
    hi: "पूर्ण निरीक्षण",
    es: "Inspección Completa",
    fr: "Inspection Complète",
    de: "Vollständige Inspektion",
    pt: "Inspeção Completa",
    ja: "完全検査",
    ko: "전체 검사"
  },
  "Inspection.hub.gamingMonitor": {
    hi: "गेमिंग मॉनिटर वर्कफ्लो",
    es: "Flujo de Trabajo de Monitor de Juegos",
    fr: "Flux de Travail pour Moniteur de Jeu",
    de: "Gaming-Monitor-Workflow",
    pt: "Fluxo de Trabalho para Monitor de Jogos",
    ja: "ゲーミングモニターワークフロー",
    ko: "게이밍 모니터 워크플로우"
  },
  "Inspection.hub.oledMonitor": {
    hi: "OLED वर्कफ्लो",
    es: "Flujo de Trabajo OLED",
    fr: "Flux de Travail OLED",
    de: "OLED-Workflow",
    pt: "Fluxo de Trabalho OLED",
    ja: "OLEDワークフロー",
    ko: "OLED 워크플로우"
  },
  "Inspection.hub.startWorkflow": {
    hi: "वर्कफ्लो शुरू करें",
    es: "Iniciar Flujo de Trabajo",
    fr: "Démarrer le Flux de Travail",
    de: "Workflow Starten",
    pt: "Iniciar Fluxo de Trabalho",
    ja: "ワークフローを開始",
    ko: "워크플로우 시작"
  },
  "Inspection.gaming.title": {
    hi: "गेमिंग मॉनिटर निरीक्षण",
    es: "Inspección de Monitor de Juegos",
    fr: "Inspection du Moniteur de Jeu",
    de: "Gaming-Monitor-Inspektion",
    pt: "Inspeção de Monitor de Jogos",
    ja: "ゲーミングモニター検査",
    ko: "게이밍 모니터 검사"
  },
  "Inspection.gaming.description": {
    hi: "यह वर्कफ्लो रिफ्रेश रेट, घोस्टिंग, स्क्रीन टियरिंग और मोशन क्लैरिटी पर केंद्रित है।",
    es: "Este flujo de trabajo se centra en la tasa de actualización, el ghosting, el rasgado de pantalla y la claridad del movimiento.",
    fr: "Ce flux de travail se concentre sur le taux de rafraîchissement, le ghosting, le déchirement d'écran et la clarté du mouvement.",
    de: "Dieser Workflow konzentriert sich auf Bildwiederholrate, Ghosting, Screen-Tearing und Bewegungsschärfe.",
    pt: "Este fluxo de trabalho foca na taxa de atualização, ghosting, tearing de tela e clareza do movimento.",
    ja: "このワークフローは、リフレッシュレート、ゴースト、画面ティアリング、モーションクラリティに焦点を当てています。",
    ko: "이 워크플로우는 재생률, 고스팅, 화면 티어링 및 모션 선명도에 집중합니다."
  },
  "Inspection.gaming.vrrWarning": {
    hi: "नोट: ब्राउज़र API हार्डवेयर VRR (G-Sync/FreeSync) व्यवहार को सीधे सत्यापित नहीं कर सकते।",
    es: "Nota: Las API del navegador no pueden verificar directamente el comportamiento VRR de hardware (G-Sync/FreeSync).",
    fr: "Remarque: Les API du navigateur ne peuvent pas vérifier directement le comportement VRR matériel (G-Sync/FreeSync).",
    de: "Hinweis: Browser-APIs können Hardware-VRR-Verhalten (G-Sync/FreeSync) nicht direkt überprüfen.",
    pt: "Nota: As APIs do navegador não podem verificar diretamente o comportamento VRR de hardware (G-Sync/FreeSync).",
    ja: "注意: ブラウザAPIはハードウェアVRR（G-Sync/FreeSync）の動作を直接検証できません。",
    ko: "참고: 브라우저 API는 하드웨어 VRR(G-Sync/FreeSync) 동작을 직접 확인할 수 없습니다."
  },
  "Inspection.oled.title": {
    hi: "OLED मॉनिटर निरीक्षण",
    es: "Inspección de Monitor OLED",
    fr: "Inspection du Moniteur OLED",
    de: "OLED-Monitor-Inspektion",
    pt: "Inspeção de Monitor OLED",
    ja: "OLEDモニター検査",
    ko: "OLED 모니터 검사"
  },
  "Inspection.oled.description": {
    hi: "यह वर्कफ्लो बर्न-इन, निकट-काली प्रदर्शन और यूनिफॉर्मिटी पर केंद्रित है।",
    es: "Este flujo de trabajo se centra en el burn-in, el rendimiento casi-negro y la uniformidad.",
    fr: "Ce flux de travail se concentre sur le burn-in, les performances proches du noir et l'uniformité.",
    de: "Dieser Workflow konzentriert sich auf Burn-In, Dunkelleistung und Gleichmäßigkeit.",
    pt: "Este fluxo de trabalho foca em burn-in, desempenho próximo ao preto e uniformidade.",
    ja: "このワークフローは、焼き付き、ほぼ黒のパフォーマンス、均一性に焦点を当てています。",
    ko: "이 워크플로우는 번인, 거의 검정 성능 및 균일성에 집중합니다."
  },
  "Inspection.oled.oledWarning": {
    hi: "नोट: ब्राउज़र-आधारित परीक्षण OLED पैनल क्षरण के हर रूप का निदान नहीं कर सकते।",
    es: "Nota: Las pruebas basadas en navegador no pueden diagnosticar todas las formas de degradación del panel OLED.",
    fr: "Remarque: Les tests basés sur le navigateur ne peuvent pas diagnostiquer toutes les formes de dégradation du panneau OLED.",
    de: "Hinweis: Browserbasierte Tests können nicht jede Form der OLED-Panel-Degradation diagnostizieren.",
    pt: "Nota: Testes baseados em navegador não conseguem diagnosticar todas as formas de degradação do painel OLED.",
    ja: "注意: ブラウザベースのテストは、OLEDパネルの劣化のあらゆる形態を診断できません。",
    ko: "참고: 브라우저 기반 테스트는 OLED 패널 열화의 모든 형태를 진단할 수 없습니다."
  },
  "Inspection.summary.title": {
    hi: "मॉनिटर निरीक्षण",
    es: "Inspección de Monitor",
    fr: "Inspection du Moniteur",
    de: "Monitor-Inspektion",
    pt: "Inspeção de Monitor",
    ja: "モニター検査",
    ko: "모니터 검사"
  },
  "Inspection.summary.description": {
    hi: "यह चेकलिस्ट आपकी टिप्पणियां रिकॉर्ड करती है। यह पेशेवर डिस्प्ले निदान की जगह नहीं लेती।",
    es: "Esta lista de verificación registra tus observaciones. No reemplaza el diagnóstico profesional de pantalla.",
    fr: "Cette liste de contrôle enregistre vos observations. Elle ne remplace pas le diagnostic d'affichage professionnel.",
    de: "Diese Checkliste zeichnet Ihre Beobachtungen auf. Sie ersetzt keine professionelle Anzeigediagnose.",
    pt: "Esta lista de verificação registra suas observações. Não substitui o diagnóstico profissional de tela.",
    ja: "このチェックリストはあなたの観察を記録します。専門的なディスプレイ診断の代わりにはなりません。",
    ko: "이 체크리스트는 귀하의 관찰 사항을 기록합니다. 전문적인 디스플레이 진단을 대체하지 않습니다."
  },
  "Inspection.summary.passed": {
    hi: "पास",
    es: "Aprobado",
    fr: "Réussi",
    de: "Bestanden",
    pt: "Aprovado",
    ja: "合格",
    ko: "통과"
  },
  "Inspection.summary.needsAttention": {
    hi: "ध्यान चाहिए",
    es: "Necesita atención",
    fr: "Nécessite attention",
    de: "Aufmerksamkeit erforderlich",
    pt: "Precisa de atenção",
    ja: "要注意",
    ko: "주의 필요"
  },
  "Inspection.summary.skipped": {
    hi: "छोड़ा गया",
    es: "Omitido",
    fr: "Ignoré",
    de: "Übersprungen",
    pt: "Ignorado",
    ja: "スキップ",
    ko: "건너뜀"
  },
  "Inspection.summary.restart": {
    hi: "निरीक्षण पुनः शुरू करें",
    es: "Reiniciar inspección",
    fr: "Redémarrer l'inspection",
    de: "Inspektion neu starten",
    pt: "Reiniciar inspeção",
    ja: "検査を再開",
    ko: "검사 재시작"
  },
  "Inspection.summary.review": {
    hi: "परीक्षण की समीक्षा करें",
    es: "Revisar pruebas",
    fr: "Réviser les tests",
    de: "Tests überprüfen",
    pt: "Revisar testes",
    ja: "テストを確認",
    ko: "테스트 검토"
  },
  "Inspection.summary.clear": {
    hi: "निरीक्षण डेटा साफ़ करें",
    es: "Borrar datos de inspección",
    fr: "Effacer les données d'inspection",
    de: "Inspektionsdaten löschen",
    pt: "Limpar dados de inspeção",
    ja: "検査データをクリア",
    ko: "검사 데이터 지우기"
  },
  "Inspection.summary.print": {
    hi: "सारांश प्रिंट करें",
    es: "Imprimir resumen",
    fr: "Imprimer le résumé",
    de: "Zusammenfassung drucken",
    pt: "Imprimir resumo",
    ja: "概要を印刷",
    ko: "요약 인쇄"
  },
  "Inspection.steps.displayInfo.title": {
    hi: "डिस्प्ले जानकारी",
    es: "Información de Pantalla",
    fr: "Informations d'Affichage",
    de: "Anzeige-Informationen",
    pt: "Informações da Tela",
    ja: "ディスプレイ情報",
    ko: "디스플레이 정보"
  },
  "Inspection.steps.displayInfo.what": {
    hi: "जांचें कि रिज़ॉल्यूशन, रंग गहराई और HDR समर्थन निर्माता विशिष्टताओं से मेल खाता है।",
    es: "Verifica si la resolución, la profundidad de color y la compatibilidad HDR coinciden con las especificaciones del fabricante.",
    fr: "Vérifiez si la résolution, la profondeur des couleurs et la prise en charge HDR correspondent aux spécifications du fabricant.",
    de: "Überprüfen Sie, ob Auflösung, Farbtiefe und HDR-Unterstützung den Herstellerspezifikationen entsprechen.",
    pt: "Verifique se a resolução, profundidade de cor e suporte HDR correspondem às especificações do fabricante.",
    ja: "解像度、色深度、HDRサポートがメーカー仕様と一致するか確認します。",
    ko: "해상도, 색 깊이 및 HDR 지원이 제조업체 사양과 일치하는지 확인합니다."
  },
  "Inspection.steps.sharpness.title": {
    hi: "रिज़ॉल्यूशन और शार्पनेस",
    es: "Resolución y Nitidez",
    fr: "Résolution et Netteté",
    de: "Auflösung & Schärfe",
    pt: "Resolução e Nitidez",
    ja: "解像度とシャープネス",
    ko: "해상도 및 선명도"
  },
  "Inspection.steps.sharpness.what": {
    hi: "टेक्स्ट के आसपास रंग फ्रिंजिंग या धुंधली सबपिक्सल रेंडरिंग देखें।",
    es: "Busca franjas de color alrededor del texto o renderizado de subpíxeles borroso.",
    fr: "Recherchez des franges de couleur autour du texte ou un rendu de sous-pixels flou.",
    de: "Suchen Sie nach Farbsaum um Text herum oder unscharfer Subpixel-Darstellung.",
    pt: "Procure por franjas de cor ao redor do texto ou renderização de subpixels borrada.",
    ja: "テキスト周りの色フリンジや不鮮明なサブピクセルレンダリングを探します。",
    ko: "텍스트 주위의 색상 프린지 또는 흐릿한 서브픽셀 렌더링을 확인합니다."
  },
  "Inspection.steps.deadPixel.title": {
    hi: "डेड / स्टक पिक्सल",
    es: "Píxeles Muertos / Atascados",
    fr: "Pixels Morts / Coincés",
    de: "Tote / Feststeckende Pixel",
    pt: "Pixels Mortos / Presos",
    ja: "デッド/固着ピクセル",
    ko: "불량/고착 픽셀"
  },
  "Inspection.steps.deadPixel.what": {
    hi: "स्थायी रूप से काले, सफेद या एकल रंग वाले पिक्सल देखें।",
    es: "Busca píxeles que permanezcan permanentemente negros, blancos o de un solo color.",
    fr: "Recherchez des pixels qui restent en permanence noirs, blancs ou d'une seule couleur.",
    de: "Suchen Sie nach Pixeln, die dauerhaft schwarz, weiß oder einfarbig bleiben.",
    pt: "Procure por pixels que permanecem permanentemente pretos, brancos ou de uma única cor.",
    ja: "恒久的に黒、白、または単色のままのピクセルを探します。",
    ko: "영구적으로 검정, 흰색 또는 단일 색상으로 남아 있는 픽셀을 찾습니다."
  },
  "Inspection.steps.color.title": {
    hi: "रंग कैलिब्रेशन",
    es: "Calibración de Color",
    fr: "Calibration des Couleurs",
    de: "Farbkalibrierung",
    pt: "Calibração de Cor",
    ja: "カラーキャリブレーション",
    ko: "색상 캘리브레이션"
  },
  "Inspection.steps.color.what": {
    hi: "सुनिश्चित करें कि प्राथमिक रंग जीवंत और सटीक हैं बिना ब्लीडिंग के।",
    es: "Asegúrate de que los colores primarios se vean vibrantes y precisos sin sangrado.",
    fr: "Assurez-vous que les couleurs primaires semblent vibrantes et précises sans saignement.",
    de: "Stellen Sie sicher, dass die Primärfarben lebendig und präzise ohne Farbbluten wirken.",
    pt: "Certifique-se de que as cores primárias pareçam vibrantes e precisas sem sangramento.",
    ja: "プライマリカラーがにじみなく鮮やかで正確に見えることを確認します。",
    ko: "기본 색상이 번짐 없이 생동감 있고 정확하게 보이는지 확인합니다."
  },
  "Inspection.steps.grayscale.title": {
    hi: "ग्रेस्केल टेस्ट",
    es: "Test de Escala de Grises",
    fr: "Test de Niveaux de Gris",
    de: "Graustufen-Test",
    pt: "Teste de Escala de Cinza",
    ja: "グレースケールテスト",
    ko: "그레이스케일 테스트"
  },
  "Inspection.steps.grayscale.what": {
    hi: "तटस्थ ग्रे में गुलाबी, नीले या हरे रंग के रंग देखें।",
    es: "Busca matices rosas, azules o verdes en lo que debería ser gris neutro.",
    fr: "Recherchez des teintes roses, bleues ou vertes dans ce qui devrait être un gris neutre.",
    de: "Suchen Sie nach rosa, blauen oder grünen Tönen in dem, was neutrales Grau sein sollte.",
    pt: "Procure por tons rosa, azul ou verde no que deveria ser cinza neutro.",
    ja: "中性グレーにあるべきものにピンク、青、緑の色調を探します。",
    ko: "중성 회색이어야 할 곳에서 분홍, 파랑, 녹색 색조를 확인합니다."
  },
  "Inspection.steps.brightness.title": {
    hi: "चमक",
    es: "Brillo",
    fr: "Luminosité",
    de: "Helligkeit",
    pt: "Brilho",
    ja: "輝度",
    ko: "밝기"
  },
  "Inspection.steps.brightness.what": {
    hi: "सुनिश्चित करें कि आप शुद्ध काले से गहरे वर्गों को अलग कर सकते हैं।",
    es: "Asegúrate de poder distinguir cuadros oscuros del negro puro.",
    fr: "Assurez-vous de pouvoir distinguer les carrés sombres du noir pur.",
    de: "Stellen Sie sicher, dass Sie dunkle Quadrate von reinem Schwarz unterscheiden können.",
    pt: "Certifique-se de poder distinguir quadrados escuros do preto puro.",
    ja: "純粋な黒から暗い正方形を区別できることを確認します。",
    ko: "순수한 검정에서 어두운 사각형을 구별할 수 있는지 확인합니다."
  },
  "Inspection.steps.contrast.title": {
    hi: "कंट्रास्ट",
    es: "Contraste",
    fr: "Contraste",
    de: "Kontrast",
    pt: "Contraste",
    ja: "コントラスト",
    ko: "대비"
  },
  "Inspection.steps.contrast.what": {
    hi: "सुनिश्चित करें कि आप शुद्ध सफेद से밝은 वर्गों को अलग कर सकते हैं।",
    es: "Asegúrate de poder distinguir cuadros brillantes del blanco puro.",
    fr: "Assurez-vous de pouvoir distinguer les carrés brillants du blanc pur.",
    de: "Stellen Sie sicher, dass Sie helle Quadrate von reinem Weiß unterscheiden können.",
    pt: "Certifique-se de poder distinguir quadrados brilhantes do branco puro.",
    ja: "純粋な白から明るい正方形を区別できることを確認します。",
    ko: "순수한 흰색에서 밝은 사각형을 구별할 수 있는지 확인합니다."
  },
  "Inspection.steps.blackLevel.title": {
    hi: "ब्लैक लेवल",
    es: "Nivel de Negro",
    fr: "Niveau de Noir",
    de: "Schwarzwert",
    pt: "Nível de Preto",
    ja: "ブラックレベル",
    ko: "블랙 레벨"
  },
  "Inspection.steps.blackLevel.what": {
    hi: "सुनिश्चित करें कि सबसे गहरे शेड शुद्ध काले में संकुचित नहीं हैं।",
    es: "Asegúrate de que los tonos más oscuros no estén comprimidos en negro puro.",
    fr: "Assurez-vous que les nuances les plus sombres ne sont pas écrasées en noir pur.",
    de: "Stellen Sie sicher, dass die dunkelsten Töne nicht zu reinem Schwarz zusammengedrückt werden.",
    pt: "Certifique-se de que os tons mais escuros não estejam esmagados em preto puro.",
    ja: "最も暗いシェードが純粋な黒につぶれていないことを確認します。",
    ko: "가장 어두운 음영이 순수한 검정으로 눌리지 않았는지 확인합니다."
  },
  "Inspection.steps.whiteLevel.title": {
    hi: "व्हाइट लेवल",
    es: "Nivel de Blanco",
    fr: "Niveau de Blanc",
    de: "Weißwert",
    pt: "Nível de Branco",
    ja: "ホワイトレベル",
    ko: "화이트 레벨"
  },
  "Inspection.steps.whiteLevel.what": {
    hi: "सुनिश्चित करें कि सबसे चमकीले शेड शुद्ध सफेद में क्लिप नहीं हो रहे।",
    es: "Asegúrate de que los tonos más brillantes no estén recortándose en blanco puro.",
    fr: "Assurez-vous que les nuances les plus brillantes ne se coupent pas en blanc pur.",
    de: "Stellen Sie sicher, dass die hellsten Töne nicht in reines Weiß beschnitten werden.",
    pt: "Certifique-se de que os tons mais brilhantes não estejam cortando em branco puro.",
    ja: "最も明るいシェードが純粋な白にクリッピングしていないことを確認します。",
    ko: "가장 밝은 음영이 순수한 흰색으로 클리핑되지 않는지 확인합니다."
  },
  "Inspection.steps.uniformity.title": {
    hi: "यूनिफॉर्मिटी",
    es: "Uniformidad",
    fr: "Uniformité",
    de: "Gleichmäßigkeit",
    pt: "Uniformidade",
    ja: "均一性",
    ko: "균일성"
  },
  "Inspection.steps.uniformity.what": {
    hi: "ग्रे में धब्बे, बैंड या डर्टी स्क्रीन इफेक्ट (DSE) देखें।",
    es: "Busca manchas, bandas o efecto de pantalla sucia (DSE) en los grises.",
    fr: "Recherchez des taches, des bandes ou un effet d'écran sale (DSE) dans les gris.",
    de: "Suchen Sie nach Flecken, Streifen oder Dirty-Screen-Effekt (DSE) in Grautönen.",
    pt: "Procure por manchas, faixas ou efeito de tela suja (DSE) nos cinzas.",
    ja: "グレーのスプロッチ、バンド、またはダーティスクリーン効果（DSE）を探します。",
    ko: "회색에서 얼룩, 줄무늬 또는 더러운 화면 효과(DSE)를 확인합니다."
  },
  "Inspection.steps.backlightBleed.title": {
    hi: "बैकलाइट ब्लीड",
    es: "Sangrado de Retroiluminación",
    fr: "Saignement de Rétroéclairage",
    de: "Hintergrundlicht-Bleed",
    pt: "Sangramento de Retroiluminação",
    ja: "バックライトブリード",
    ko: "백라이트 번짐"
  },
  "Inspection.steps.backlightBleed.what": {
    hi: "अंधेरे कमरे में बेज़ल से प्रकाश के अलग-अलग टुकड़े देखें।",
    es: "Busca parches distintos de luz que se filtren desde el bisel en una habitación oscura.",
    fr: "Recherchez des taches distinctes de lumière s'échappant du cadre dans une pièce sombre.",
    de: "Suchen Sie in einem dunklen Raum nach deutlichen Lichtflecken, die vom Rahmen austreten.",
    pt: "Procure por manchas distintas de luz vazando da moldura em um quarto escuro.",
    ja: "暗い部屋でベゼルから漏れる光の明確なパッチを探します。",
    ko: "어두운 방에서 베젤에서 새는 뚜렷한 빛의 패치를 찾습니다."
  },
  "Inspection.steps.ghosting.title": {
    hi: "घोस्टिंग और मोशन ब्लर",
    es: "Ghosting y Desenfoque de Movimiento",
    fr: "Ghosting et Flou de Mouvement",
    de: "Ghosting & Bewegungsunschärfe",
    pt: "Ghosting e Desfoque de Movimento",
    ja: "ゴーストとモーションブラー",
    ko: "고스팅 및 모션 블러"
  },
  "Inspection.steps.ghosting.what": {
    hi: "चलती वस्तुओं के पीछे छाया (घोस्टिंग) या चमकीले हेलो (ओवरशूट) देखें।",
    es: "Busca sombras rezagadas (ghosting) o halos brillantes (overshooting) detrás de objetos en movimiento.",
    fr: "Recherchez des ombres traînantes (ghosting) ou des halos brillants (overshoot) derrière des objets en mouvement.",
    de: "Suchen Sie nach nachlaufenden Schatten (Ghosting) oder hellen Halos (Overshoot) hinter bewegten Objekten.",
    pt: "Procure por sombras residuais (ghosting) ou halos brilhantes (overshoot) atrás de objetos em movimento.",
    ja: "動くオブジェクトの後ろに残像（ゴースト）または明るいハロ（オーバーシュート）を探します。",
    ko: "움직이는 물체 뒤에 잔상(고스팅) 또는 밝은 헤일로(오버슛)를 확인합니다."
  },
  "Inspection.steps.refreshRate.title": {
    hi: "रिफ्रेश रेट",
    es: "Tasa de Actualización",
    fr: "Taux de Rafraîchissement",
    de: "Bildwiederholrate",
    pt: "Taxa de Atualização",
    ja: "リフレッシュレート",
    ko: "주사율"
  },
  "Inspection.steps.refreshRate.what": {
    hi: "सत्यापित करें कि ब्राउज़र रेंडरिंग आपकी अपेक्षित मॉनिटर रिफ्रेश रेट से मेल खाती है।",
    es: "Verifica que el renderizado del navegador coincida con la tasa de actualización esperada del monitor.",
    fr: "Vérifiez que le rendu du navigateur correspond à la fréquence de rafraîchissement attendue du moniteur.",
    de: "Überprüfen Sie, ob das Browser-Rendering mit der erwarteten Monitor-Bildwiederholrate übereinstimmt.",
    pt: "Verifique se a renderização do navegador corresponde à taxa de atualização esperada do monitor.",
    ja: "ブラウザのレンダリングが期待するモニターのリフレッシュレートと一致するか確認します。",
    ko: "브라우저 렌더링이 예상 모니터 주사율과 일치하는지 확인합니다."
  },
  "Inspection.steps.screenTearing.title": {
    hi: "स्क्रीन टियरिंग",
    es: "Desgarro de Pantalla",
    fr: "Déchirement d'Écran",
    de: "Screen-Tearing",
    pt: "Tearing de Tela",
    ja: "画面ティアリング",
    ko: "화면 티어링"
  },
  "Inspection.steps.screenTearing.what": {
    hi: "गति के दौरान क्षैतिज टियरिंग देखें (V-Sync/VRR जांच)।",
    es: "Observa el desgarro horizontal durante el movimiento (comprobación V-Sync/VRR).",
    fr: "Regardez le déchirement horizontal pendant le mouvement (vérification V-Sync/VRR).",
    de: "Achten Sie auf horizontales Tearing während der Bewegung (V-Sync/VRR-Prüfung).",
    pt: "Observe o tearing horizontal durante o movimento (verificação V-Sync/VRR).",
    ja: "動き中の水平ティアリングを確認します（V-Sync/VRRチェック）。",
    ko: "동작 중 수평 티어링을 확인합니다(V-Sync/VRR 점검)."
  },
  "Inspection.steps.hdr.title": {
    hi: "HDR क्षमता",
    es: "Capacidad HDR",
    fr: "Capacité HDR",
    de: "HDR-Fähigkeit",
    pt: "Capacidade HDR",
    ja: "HDR能力",
    ko: "HDR 기능"
  },
  "Inspection.steps.hdr.what": {
    hi: "सत्यापित करें कि OS सही ढंग से HDR और वाइड कलर गैमट का पता लगाता है।",
    es: "Verifica que el OS detecte correctamente HDR y la gama de color amplia.",
    fr: "Vérifiez que l'OS détecte correctement le HDR et la gamme de couleurs étendue.",
    de: "Überprüfen Sie, ob das OS HDR und Wide Color Gamut korrekt erkennt.",
    pt: "Verifique se o SO detecta corretamente HDR e Wide Color Gamut.",
    ja: "OSがHDRとワイドカラーガモットを正しく検出するか確認します。",
    ko: "OS가 HDR 및 와이드 컬러 게멋을 올바르게 감지하는지 확인합니다."
  },
  "Inspection.steps.solidColor.title": {
    hi: "सॉलिड कलर प्यूरिटी",
    es: "Pureza de Color Sólido",
    fr: "Pureté des Couleurs Solides",
    de: "Einfarben-Reinheit",
    pt: "Pureza de Cor Sólida",
    ja: "単色純度",
    ko: "단색 순도"
  },
  "Inspection.steps.solidColor.what": {
    hi: "पूरे स्क्रीन पर समान रंग की जांच करें।",
    es: "Verifica un color uniforme en toda la pantalla.",
    fr: "Vérifiez une couleur uniforme sur tout l'écran.",
    de: "Überprüfen Sie eine gleichmäßige Farbe über den gesamten Bildschirm.",
    pt: "Verifique cor uniforme em toda a tela.",
    ja: "画面全体にわたって均一な色を確認します。",
    ko: "전체 화면에서 균일한 색상을 확인합니다."
  },
  "Inspection.steps.burnIn.title": {
    hi: "बर्न-इन",
    es: "Burn-In",
    fr: "Burn-In",
    de: "Burn-In",
    pt: "Burn-In",
    ja: "焼き付き",
    ko: "번인"
  },
  "Inspection.steps.burnIn.what": {
    hi: "टास्कबार या लोगो जैसे स्थिर तत्वों की धुंधली रूपरेखा देखें।",
    es: "Busca contornos tenues de elementos estáticos como barras de tareas o logotipos.",
    fr: "Recherchez de faint contours d'éléments statiques tels que les barres des tâches ou les logos.",
    de: "Suchen Sie nach blassen Umrissen statischer Elemente wie Taskleisten oder Logos.",
    pt: "Procure por contornos tênues de elementos estáticos como barras de tarefas ou logotipos.",
    ja: "タスクバーやロゴなどの静的要素のかすかな輪郭を探します。",
    ko: "작업 표시줄이나 로고와 같은 정적 요소의 희미한 윤곽을 확인합니다."
  },

  // ── Privacy ─────────────────────────────────────────────
  "Privacy.eyebrow": {
    hi: "गोपनीयता और डेटा नीति",
    es: "POLÍTICA DE PRIVACIDAD Y DATOS",
    fr: "POLITIQUE DE CONFIDENTIALITÉ ET DONNÉES",
    de: "DATENSCHUTZ & DATENRICHTLINIE",
    pt: "POLÍTICA DE PRIVACIDADE E DADOS",
    ja: "プライバシーとデータポリシー",
    ko: "개인정보 및 데이터 정책"
  },
  "Privacy.title": {
    hi: "गोपनीयता नीति",
    es: "Política de Privacidad",
    fr: "Politique de Confidentialité",
    de: "Datenschutzrichtlinie",
    pt: "Política de Privacidade",
    ja: "プライバシーポリシー",
    ko: "개인정보 처리방침"
  },
  "Privacy.description": {
    hi: "मॉनिटर टेस्टर एक सख्त प्राइवेसी-फर्स्ट आर्किटेक्चर के साथ डिज़ाइन किया गया है। सभी डिस्प्ले डायग्नोस्टिक परीक्षण और गणनाएं पूरी तरह से आपके स्थानीय ब्राउज़र के अंदर चलती हैं।",
    es: "Monitor Tester está diseñado con una arquitectura estricta de privacidad primero. Todas las pruebas de diagnóstico y cálculos de pantalla se ejecutan completamente dentro de tu navegador local.",
    fr: "Monitor Tester est conçu avec une architecture stricte axée sur la confidentialité. Tous les tests de diagnostic d'affichage et les calculs s'exécutent entièrement dans votre navigateur local.",
    de: "Monitor Tester ist mit einer strikten Privacy-First-Architektur konzipiert. Alle Anzeige-Diagnosetests und -berechnungen werden vollständig in Ihrem lokalen Browser ausgeführt.",
    pt: "Monitor Tester é projetado com uma arquitetura estritamente focada em privacidade. Todos os testes de diagnóstico de tela e cálculos são executados completamente dentro do seu navegador local.",
    ja: "モニターテスターは厳格なプライバシー優先アーキテクチャで設計されています。すべてのディスプレイ診断テストと計算は、ローカルブラウザ内で完全に実行されます。",
    ko: "모니터 테스터는 엄격한 개인정보 우선 아키텍처로 설계되었습니다. 모든 디스플레이 진단 테스트와 계산은 로컬 브라우저 내에서 완전히 실행됩니다."
  },
  "Privacy.lastUpdated": {
    hi: "अंतिम अपडेट: सितंबर 2026",
    es: "Última actualización: septiembre de 2026",
    fr: "Dernière mise à jour: septembre 2026",
    de: "Zuletzt aktualisiert: September 2026",
    pt: "Última atualização: setembro de 2026",
    ja: "最終更新日: 2026年9月",
    ko: "마지막 업데이트: 2026년 9월"
  },
  "Privacy.noCollectionTitle": {
    hi: "शून्य रिमोट डेटा संग्रह",
    es: "Cero Recopilación Remota de Datos",
    fr: "Zéro Collecte de Données à Distance",
    de: "Keinerlei Remote-Datenerfassung",
    pt: "Zero Coleta Remota de Dados",
    ja: "リモートデータ収集ゼロ",
    ko: "원격 데이터 수집 없음"
  },
  "Privacy.noCollectionText": {
    hi: "जब आप मॉनिटर टेस्टर पर जाते हैं और डिस्प्ले परीक्षण चलाते हैं, तो हम किसी भी व्यक्तिगत डेटा, हार्डवेयर सीरियल नंबर, नैदानिक टिप्पणियां या स्क्रीन मेट्रिक्स को बाहरी सर्वर पर एकत्र, प्रेषित या संग्रहित नहीं करते। कोई बैकएंड ट्रैकिंग डेटाबेस, उपयोगकर्ता खाते या लॉगिन आवश्यकताएं नहीं हैं।",
    es: "Cuando visitas Monitor Tester y ejecutas pruebas de pantalla, NO recopilamos, transmitimos ni almacenamos ningún dato personal, número de serie de hardware, observaciones de diagnóstico o métricas de pantalla en servidores externos. No hay bases de datos de seguimiento backend, cuentas de usuario ni requisitos de inicio de sesión.",
    fr: "Lorsque vous visitez Monitor Tester et effectuez des tests d'affichage, nous ne collectons PAS, ne transmettons PAS et ne stockons PAS de données personnelles, numéros de série matériels, observations de diagnostic ou métriques d'écran sur des serveurs externes. Il n'y a pas de bases de données de suivi backend, de comptes d'utilisateurs ou d'exigences de connexion.",
    de: "Wenn Sie Monitor Tester besuchen und Anzeigetests durchführen, sammeln, übertragen oder speichern wir KEINE persönlichen Daten, Hardware-Seriennummern, Diagnosebeschreibungen oder Bildschirmmetriken auf externen Servern. Es gibt keine Backend-Tracking-Datenbanken, Benutzerkonten oder Anmeldeanforderungen.",
    pt: "Quando você visita o Monitor Tester e executa testes de tela, NÃO coletamos, transmitimos ou armazenamos nenhum dado pessoal, número de série de hardware, observações de diagnóstico ou métricas de tela em servidores externos. Não há bancos de dados de rastreamento backend, contas de usuário ou requisitos de login.",
    ja: "モニターテスターにアクセスしてディスプレイテストを実行すると、個人データ、ハードウェアシリアル番号、診断観察、またはスクリーンメトリクスを外部サーバーに収集、送信、保存することはありません。バックエンドの追跡データベース、ユーザーアカウント、またはログイン要件はありません。",
    ko: "모니터 테스터를 방문하여 디스플레이 테스트를 실행할 때, 외부 서버에 개인 데이터, 하드웨어 일련번호, 진단 관찰 또는 화면 메트릭을 수집, 전송 또는 저장하지 않습니다. 백엔드 추적 데이터베이스, 사용자 계정 또는 로그인 요구 사항이 없습니다."
  },
  "Privacy.localStorageTitle": {
    hi: "स्थानीय ब्राउज़र स्टोरेज",
    es: "Almacenamiento Local del Navegador",
    fr: "Stockage Local du Navigateur",
    de: "Lokaler Browser-Speicher",
    pt: "Armazenamento Local do Navegador",
    ja: "ローカルブラウザストレージ",
    ko: "로컬 브라우저 저장소"
  },
  "Privacy.localStorageText": {
    hi: "चेकलिस्ट ट्रैकिंग और दोष मार्कर समन्वय जैसी सुविधाजनक सुविधाएं प्रदान करने के लिए, मॉनिटर टेस्टर आपके ब्राउज़र के निजी स्थानीय स्टोरेज API का उपयोग करता है:",
    es: "Para proporcionar funciones convenientes como el seguimiento de listas de verificación y coordenadas de marcadores de defectos, Monitor Tester utiliza las API de almacenamiento local privado de tu navegador:",
    fr: "Pour fournir des fonctionnalités pratiques telles que le suivi des listes de contrôle et les coordonnées des marqueurs de défauts, Monitor Tester utilise les API de stockage local privé de votre navigateur:",
    de: "Um praktische Funktionen wie Checklisten-Tracking und Defektmarker-Koordinaten bereitzustellen, verwendet Monitor Tester die privaten lokalen Speicher-APIs Ihres Browsers:",
    pt: "Para fornecer recursos convenientes como rastreamento de lista de verificação e coordenadas de marcadores de defeitos, o Monitor Tester utiliza as APIs de armazenamento local privado do seu navegador:",
    ja: "チェックリスト追跡や欠陥マーカー座標などの便利な機能を提供するために、モニターテスターはブラウザのプライベートローカルストレージAPIを使用します:",
    ko: "체크리스트 추적 및 결함 마커 좌표와 같은 편리한 기능을 제공하기 위해 모니터 테스터는 브라우저의 개인 로컬 저장소 API를 사용합니다:"
  },
  "Privacy.localStorageItem1": {
    hi: "सक्रिय सत्र और टिप्पणियां (localStorage): आपकी स्व-रिपोर्ट किए गए परीक्षण रेटिंग (पास, चेक, इश्यू), कस्टम नोट्स और पिक्सल दोष पिन समन्वय (X/Y पिक्सल) संग्रहित करता है।",
    es: "Sesión Activa y Observaciones (localStorage): Almacena tus calificaciones de prueba autoinformadas (Aprobado, Revisar, Problema), notas personalizadas y coordenadas de marcadores de defectos de píxeles.",
    fr: "Session Active et Observations (localStorage): Stocke vos évaluations de test auto-rapportées (Réussi, Vérifier, Problème), les notes personnalisées et les coordonnées des marqueurs de défauts de pixels.",
    de: "Aktive Sitzung & Beobachtungen (localStorage): Speichert Ihre selbst gemeldeten Testbewertungen (Bestanden, Prüfen, Problem), benutzerdefinierte Notizen und Pixel-Defektmarker-Koordinaten.",
    pt: "Sessão Ativa e Observações (localStorage): Armazena suas avaliações de teste autorrelatadas (Aprovado, Verificar, Problema), notas personalizadas e coordenadas de marcadores de defeitos de pixels.",
    ja: "アクティブセッションと観察（localStorage）: 自己報告のテスト評価（合格、確認、問題）、カスタムメモ、ピクセル欠陥ピン座標を保存します。",
    ko: "활성 세션 및 관찰(localStorage): 자체 보고된 테스트 등급(통과, 확인, 문제), 사용자 정의 메모 및 픽셀 결함 핀 좌표를 저장합니다."
  },
  "Privacy.localStorageItem2": {
    hi: "वर्कफ्लो कतार (sessionStorage): आपके वर्तमान निर्देशित निरीक्षण वर्कफ्लो में चरण को अस्थायी रूप से ट्रैक करता है। यह ब्राउज़र टैब बंद करने पर स्वचालित रूप से साफ़ हो जाता है।",
    es: "Cola de Flujo de Trabajo (sessionStorage): Rastrea temporalmente tu paso actual en flujos de trabajo de inspección guiada. Se borra automáticamente al cerrar la pestaña del navegador.",
    fr: "File d'Attente de Flux de Travail (sessionStorage): Suit temporairement votre étape actuelle dans les flux de travail d'inspection guidée. Elle est automatiquement effacée lorsque vous fermez votre onglet de navigateur.",
    de: "Workflow-Warteschlange (sessionStorage): Verfolgt vorübergehend Ihren aktuellen Schritt in geführten Inspektions-Workflows. Wird automatisch gelöscht, wenn Sie Ihren Browser-Tab schließen.",
    pt: "Fila de Fluxo de Trabalho (sessionStorage): Acompanha temporariamente sua etapa atual em fluxos de trabalho de inspeção guiada. É automaticamente limpa quando você fecha a guia do navegador.",
    ja: "ワークフローキュー（sessionStorage）: ガイド付き検査ワークフローの現在のステップを一時的に追跡します。ブラウザタブを閉じると自動的にクリアされます。",
    ko: "워크플로우 대기열(sessionStorage): 안내된 검사 워크플로우의 현재 단계를 임시로 추적합니다. 브라우저 탭을 닫으면 자동으로 지워집니다."
  },
  "Privacy.localStorageClear": {
    hi: "आप किसी भी समय 'रीसेट' पर क्लिक करके, अपने ब्राउज़र का साइट डेटा साफ़ करके, या अपने ब्राउज़र के प्राइवेट/इनकॉग्निटो मोड का उपयोग करके सभी संग्रहित डेटा साफ़ कर सकते हैं।",
    es: "Puedes borrar todos los datos almacenados en cualquier momento haciendo clic en 'Restablecer' en el ejecutor de pruebas, borrando los datos del sitio de tu navegador o usando el modo privado/incógnito de tu navegador.",
    fr: "Vous pouvez effacer toutes les données stockées à tout moment en cliquant sur 'Réinitialiser' dans l'exécuteur de tests, en effaçant les données du site de votre navigateur ou en utilisant le mode privé/incognito de votre navigateur.",
    de: "Sie können alle gespeicherten Daten jederzeit löschen, indem Sie im Test-Runner auf 'Zurücksetzen' klicken, die Websitedaten Ihres Browsers löschen oder den privaten/Inkognito-Modus Ihres Browsers verwenden.",
    pt: "Você pode apagar todos os dados armazenados a qualquer momento clicando em 'Redefinir' no executor de testes, limpando os dados do site do seu navegador ou usando o modo privado/anônimo do seu navegador.",
    ja: "テストランナーで「リセット」をクリックするか、ブラウザのサイトデータを消去するか、ブラウザのプライベート/シークレットモードを使用することで、いつでも保存されたデータをすべてクリアできます。",
    ko: "테스트 러너에서 '초기화'를 클릭하거나 브라우저의 사이트 데이터를 지우거나 브라우저의 개인/시크릿 모드를 사용하여 언제든지 저장된 모든 데이터를 지울 수 있습니다."
  },
  "Privacy.cookiesTitle": {
    hi: "कोई विज्ञापन या ट्रैकिंग कुकीज़ नहीं",
    es: "Sin Cookies de Publicidad ni Seguimiento",
    fr: "Aucun Cookie Publicitaire ni de Suivi",
    de: "Keine Werbe- oder Tracking-Cookies",
    pt: "Sem Cookies de Publicidade ou Rastreamento",
    ja: "広告またはトラッキングCookieなし",
    ko: "광고 또는 추적 쿠키 없음"
  },
  "Privacy.cookiesText": {
    hi: "मॉनिटर टेस्टर तृतीय-पक्ष विज्ञापन कुकीज़, व्यवहार ट्रैकर या मार्केटिंग पिक्सल का उपयोग नहीं करता। साइट आपकी ब्राउज़िंग गतिविधि को बेचती, किराए पर देती या मुद्रीकृत नहीं करती।",
    es: "Monitor Tester no utiliza cookies de publicidad de terceros, rastreadores de comportamiento ni píxeles de marketing. El sitio no vende, alquila ni monetiza tu actividad de navegación.",
    fr: "Monitor Tester n'utilise pas de cookies publicitaires tiers, de traceurs comportementaux ou de pixels marketing. Le site ne vend pas, ne loue pas et ne monétise pas votre activité de navigation.",
    de: "Monitor Tester verwendet keine Werbe-Cookies von Drittanbietern, Verhaltens-Tracker oder Marketing-Pixel. Die Website verkauft, vermietet oder monetarisiert Ihre Browser-Aktivitäten nicht.",
    pt: "Monitor Tester não usa cookies de publicidade de terceiros, rastreadores comportamentais ou pixels de marketing. O site não vende, aluga ou monetiza sua atividade de navegação.",
    ja: "モニターテスターはサードパーティの広告Cookie、行動トラッカー、またはマーケティングピクセルを使用しません。サイトはあなたのブラウジング活動を売ったり、賃貸したり、収益化したりしません。",
    ko: "모니터 테스터는 타사 광고 쿠키, 행동 추적기 또는 마케팅 픽셀을 사용하지 않습니다. 사이트는 귀하의 브라우징 활동을 판매, 임대 또는 수익화하지 않습니다."
  },
  "Privacy.permissionsTitle": {
    hi: "ब्राउज़र अनुमतियां",
    es: "Permisos del Navegador",
    fr: "Autorisations du Navigateur",
    de: "Browser-Berechtigungen",
    pt: "Permissões do Navegador",
    ja: "ブラウザの権限",
    ko: "브라우저 권한"
  },
  "Privacy.permissionsText": {
    hi: "मॉनिटर टेस्टर केवल मानक फुलस्क्रीन API अनुमति मांगता है जब आप फुल-स्क्रीन परीक्षण मोड में प्रवेश करना चुनते हैं। हम कभी भी कैमरा, माइक्रोफोन, सूचना या भौगोलिक स्थान अनुमतियां नहीं मांगते।",
    es: "Monitor Tester solicita únicamente el permiso estándar de la API de pantalla completa cuando eliges entrar en modo de prueba a pantalla completa. Nunca solicitamos permisos de cámara, micrófono, notificación o ubicación geográfica.",
    fr: "Monitor Tester ne demande que la permission standard de l'API Fullscreen lorsque vous choisissez d'entrer en mode de test plein écran. Nous ne demandons jamais de permissions de caméra, microphone, notification ou localisation géographique.",
    de: "Monitor Tester fordert nur die Standard-Fullscreen-API-Berechtigung an, wenn Sie den Vollbildtestmodus aktivieren. Wir fordern niemals Kamera-, Mikrofon-, Benachrichtigungs- oder Geolokationsberechtigungen an.",
    pt: "Monitor Tester solicita apenas a permissão padrão da API Fullscreen quando você opta por entrar no modo de teste em tela cheia. Nunca solicitamos permissões de câmera, microfone, notificação ou localização geográfica.",
    ja: "モニターテスターは、フルスクリーンテストモードに入ることを選択したときにのみ、標準のFullscreen API権限を要求します。カメラ、マイク、通知、または地理的位置の権限を要求することはありません。",
    ko: "모니터 테스터는 전체 화면 테스트 모드로 진입하도록 선택할 때만 표준 Fullscreen API 권한을 요청합니다. 카메라, 마이크, 알림 또는 지리적 위치 권한을 요청하지 않습니다."
  },

  // ── About ────────────────────────────────────────────────
  "About.eyebrow": {
    hi: "प्रोजेक्ट के बारे में",
    es: "ACERCA DEL PROYECTO",
    fr: "À PROPOS DU PROJET",
    de: "ÜBER DAS PROJEKT",
    pt: "SOBRE O PROJETO",
    ja: "プロジェクトについて",
    ko: "프로젝트 소개"
  },
  "About.title": {
    hi: "मॉनिटर टेस्टर के बारे में",
    es: "Acerca de Monitor Tester",
    fr: "À propos de Monitor Tester",
    de: "Über Monitor Tester",
    pt: "Sobre o Monitor Tester",
    ja: "モニターテスターについて",
    ko: "모니터 테스터 소개"
  },
  "About.description": {
    hi: "एक मुफ्त, प्राइवेसी-फर्स्ट ब्राउज़र उपयोगिता जो सॉफ्टवेयर इंस्टॉलेशन के बिना कंप्यूटर मॉनिटर, लैपटॉप, मोबाइल डिवाइस और TV का मूल्यांकन, निरीक्षण और समस्या निवारण करने के लिए बनाई गई है।",
    es: "Una utilidad de navegador gratuita y centrada en la privacidad para evaluar, inspeccionar y solucionar problemas de monitores de computadora, laptops, dispositivos móviles y televisores sin instalación de software.",
    fr: "Un utilitaire de navigateur gratuit et axé sur la confidentialité conçu pour évaluer, inspecter et dépanner les moniteurs d'ordinateur, ordinateurs portables, appareils mobiles et téléviseurs sans installation de logiciel.",
    de: "Ein kostenloses, datenschutzorientiertes Browser-Dienstprogramm zum Bewerten, Inspizieren und Fehlersuchen von Computermonitoren, Laptops, Mobilgeräten und TVs ohne Softwareinstallation.",
    pt: "Um utilitário de navegador gratuito e focado em privacidade para avaliar, inspecionar e solucionar problemas de monitores de computador, laptops, dispositivos móveis e TVs sem instalação de software.",
    ja: "ソフトウェアのインストールなしにコンピューターモニター、ラップトップ、モバイルデバイス、およびテレビを評価、検査、およびトラブルシューティングするために構築された、無料でプライバシー優先のブラウザユーティリティ。",
    ko: "소프트웨어 설치 없이 컴퓨터 모니터, 노트북, 모바일 기기 및 TV를 평가, 검사 및 문제 해결하기 위해 구축된 무료 개인정보 우선 브라우저 유틸리티."
  },
  "About.missionTitle": {
    hi: "मॉनिटर टेस्टर क्यों अस्तित्व में है",
    es: "Por qué existe Monitor Tester",
    fr: "Pourquoi Monitor Tester Existe",
    de: "Warum Monitor Tester Existiert",
    pt: "Por que o Monitor Tester Existe",
    ja: "モニターテスターが存在する理由",
    ko: "모니터 테스터가 존재하는 이유"
  },
  "About.missionText": {
    hi: "नया या पुराना मॉनिटर खरीदना अक्सर अनिश्चितता से जुड़ा होता है: डेड पिक्सल, बैकलाइट ब्लीड, धुले हुए कंट्रास्ट और घोस्टिंग को संक्षिप्त इन-स्टोर जांच या अनबॉक्सिंग के दौरान पहचानना मुश्किल होता है। मॉनिटर टेस्टर पूर्ण, सुलभ नैदानिक पैटर्न का एक सेट प्रदान करने के लिए बनाया गया था जिसे कोई भी किसी भी आधुनिक वेब ब्राउज़र में तुरंत चला सकता है।",
    es: "Comprar un monitor nuevo o usado a menudo implica incertidumbre: los píxeles muertos, el sangrado de retroiluminación, el contraste lavado y el ghosting son difíciles de identificar durante breves revisiones en tienda o unboxings. Monitor Tester fue creado para proporcionar un conjunto completo y accesible de patrones de diagnóstico que cualquiera puede ejecutar inmediatamente en cualquier navegador web moderno.",
    fr: "L'achat d'un moniteur neuf ou d'occasion implique souvent de l'incertitude: les pixels morts, le saignement de rétroéclairage, le contraste lavé et le ghosting sont difficiles à identifier lors de brèves vérifications en magasin ou de déballages. Monitor Tester a été créé pour fournir une suite complète et accessible de schémas de diagnostic que tout le monde peut exécuter immédiatement dans n'importe quel navigateur Web moderne.",
    de: "Der Kauf eines neuen oder gebrauchten Monitors ist oft mit Unsicherheit verbunden: Tote Pixel, Hintergrundlicht-Bleed, ausgewaschener Kontrast und Ghosting sind bei kurzen Geschäftsprüfungen oder beim Auspacken schwer zu erkennen. Monitor Tester wurde entwickelt, um ein vollständiges, zugängliches Suite diagnostischer Muster bereitzustellen, die jeder sofort in jedem modernen Webbrowser ausführen kann.",
    pt: "Comprar um monitor novo ou usado geralmente envolve incerteza: pixels mortos, sangramento de retroiluminação, contraste lavado e ghosting são difíceis de identificar durante verificações rápidas na loja ou unboxings. O Monitor Tester foi criado para fornecer um conjunto completo e acessível de padrões de diagnóstico que qualquer pessoa pode executar imediatamente em qualquer navegador web moderno.",
    ja: "新品または中古のモニターを購入することは、しばしば不確実性を伴います：デッドピクセル、バックライトブリード、薄いコントラスト、ゴーストは、短い店内チェックや開梱時に識別するのが難しいです。モニターテスターは、誰もがすぐに任意の最新のウェブブラウザで実行できる、完全でアクセスしやすい診断パターンのスイートを提供するために作成されました。",
    ko: "새것 또는 중고 모니터를 구입하는 것은 종종 불확실성을 수반합니다: 불량 픽셀, 백라이트 번짐, 희미한 대비 및 고스팅은 짧은 매장 내 점검이나 개봉 시 식별하기 어렵습니다. 모니터 테스터는 누구나 최신 웹 브라우저에서 즉시 실행할 수 있는 완전하고 접근하기 쉬운 진단 패턴 모음을 제공하기 위해 만들어졌습니다."
  },
  "About.howItWorksTitle": {
    hi: "100% इन-ब्राउज़र निष्पादन",
    es: "100% Ejecución en el Navegador",
    fr: "Exécution 100% dans le Navigateur",
    de: "100% In-Browser-Ausführung",
    pt: "100% Execução no Navegador",
    ja: "100%ブラウザ内実行",
    ko: "100% 브라우저 내 실행"
  },
  "About.howItWorksText": {
    hi: "हर परीक्षण मानक HTML5 Canvas, WebGL, CSS हार्डवेयर त्वरण और Screen और Window API का उपयोग करके आपके डिवाइस पर स्थानीय रूप से चलता है। कोई डाउनलोड, नेटिव इंस्टॉलर या प्रशासनिक अनुमतियों की आवश्यकता नहीं है।",
    es: "Cada prueba se ejecuta localmente en tu dispositivo usando HTML5 Canvas estándar, WebGL, aceleración de hardware CSS y las API de Screen y Window. No se necesitan descargas, instaladores nativos ni permisos administrativos.",
    fr: "Chaque test s'exécute localement sur votre appareil en utilisant HTML5 Canvas standard, WebGL, l'accélération matérielle CSS et les API Screen et Window. Aucun téléchargement, installateur natif ou permission administrative n'est nécessaire.",
    de: "Jeder Test läuft lokal auf Ihrem Gerät mit standardmäßigem HTML5 Canvas, WebGL, CSS-Hardware-Beschleunigung und den Screen- und Window-APIs. Es sind keine Downloads, native Installer oder administrative Berechtigungen erforderlich.",
    pt: "Cada teste é executado localmente no seu dispositivo usando HTML5 Canvas padrão, WebGL, aceleração de hardware CSS e as APIs Screen e Window. Não são necessários downloads, instaladores nativos ou permissões administrativas.",
    ja: "すべてのテストは、標準のHTML5 Canvas、WebGL、CSSハードウェアアクセラレーション、およびScreenとWindow APIを使用してデバイス上でローカルに実行されます。ダウンロード、ネイティブインストーラー、または管理権限は必要ありません。",
    ko: "모든 테스트는 표준 HTML5 Canvas, WebGL, CSS 하드웨어 가속 및 Screen과 Window API를 사용하여 기기에서 로컬로 실행됩니다. 다운로드, 기본 설치 프로그램 또는 관리 권한이 필요하지 않습니다."
  },
  "About.testTypesTitle": {
    hi: "आप क्या परीक्षण कर सकते हैं",
    es: "Qué Puedes Probar",
    fr: "Ce que Vous Pouvez Tester",
    de: "Was Sie Testen Können",
    pt: "O Que Você Pode Testar",
    ja: "テストできること",
    ko: "테스트할 수 있는 것"
  },
  "About.pixelsCategory": {
    hi: "पिक्सल अखंडता और पैनल दोष",
    es: "Integridad de Píxeles y Defectos del Panel",
    fr: "Intégrité des Pixels et Défauts du Panneau",
    de: "Pixel-Integrität & Panel-Defekte",
    pt: "Integridade de Pixels e Defeitos do Painel",
    ja: "ピクセル完整性とパネル欠陥",
    ko: "픽셀 무결성 및 패널 결함"
  },
  "About.pixelsDesc": {
    hi: "शुद्ध रंग क्षेत्रों में डेड पिक्सल, स्टक सबपिक्सल, चमकीले सबपिक्सल और पैनल इमेज रिटेंशन (बर्न-इन) का पता लगाएं।",
    es: "Detecta píxeles muertos, subpíxeles atascados, subpíxeles brillantes y retención de imagen del panel (burn-in) en campos de color puro.",
    fr: "Détectez les pixels morts, les sous-pixels coincés, les sous-pixels brillants et la rétention d'image du panneau (burn-in) dans des champs de couleur pure.",
    de: "Erkennen Sie tote Pixel, feststeckende Subpixel, helle Subpixel und Panel-Bildrückhaltung (Burn-In) in reinen Farbfeldern.",
    pt: "Detecte pixels mortos, subpixels presos, subpixels brilhantes e retenção de imagem do painel (burn-in) em campos de cor pura.",
    ja: "純粋なカラーフィールドでデッドピクセル、固着サブピクセル、明るいサブピクセル、およびパネル残像（焼き付き）を検出します。",
    ko: "순수 색상 필드에서 불량 픽셀, 고착 서브픽셀, 밝은 서브픽셀 및 패널 이미지 잔상(번인)을 감지합니다."
  },
  "About.colorCategory": {
    hi: "रंग पुनरुत्पादन और ग्रेस्केल",
    es: "Reproducción de Color y Escala de Grises",
    fr: "Reproduction des Couleurs et Niveaux de Gris",
    de: "Farbwiedergabe & Graustufen",
    pt: "Reprodução de Cor e Escala de Cinza",
    ja: "色再現とグレースケール",
    ko: "색상 재현 및 그레이스케일"
  },
  "About.colorDesc": {
    hi: "निरंतर ग्रेडिएंट, रंग बैंडिंग चरण, रंग गैमट सीमाएं और मल्टी-स्टेप ग्रेस्केल रैंप का मूल्यांकन करें।",
    es: "Evalúa gradientes continuos, pasos de bandeo de color, límites de gama de color y rampas de escala de grises de múltiples pasos.",
    fr: "Évaluez les dégradés continus, les étapes de banding de couleur, les limites de gamme de couleurs et les rampes de niveaux de gris multi-étapes.",
    de: "Bewerten Sie kontinuierliche Farbverläufe, Farbstreifungs-Schritte, Farbraumgrenzen und mehrstufige Graustufen-Rampen.",
    pt: "Avalie gradientes contínuos, etapas de banding de cor, limites de gama de cor e rampas de escala de cinza em múltiplos passos.",
    ja: "連続グラデーション、カラーバンディングステップ、カラーガモット境界、マルチステップグレースケールランプを評価します。",
    ko: "연속 그라디언트, 색상 밴딩 단계, 색 영역 경계 및 다단계 그레이스케일 램프를 평가합니다."
  },
  "About.luminanceCategory": {
    hi: "चमक, कंट्रास्ट और ब्लीड",
    es: "Luminancia, Contraste y Sangrado",
    fr: "Luminance, Contraste et Saignement",
    de: "Luminanz, Kontrast & Bleed",
    pt: "Luminância, Contraste e Sangramento",
    ja: "輝度、コントラスト、ブリード",
    ko: "휘도, 대비 및 번짐"
  },
  "About.luminanceDesc": {
    hi: "निकट-काले और निकट-सफेद क्लिपिंग को ट्यून करें, अंधेरे कमरे में बैकलाइट ब्लीडिंग की जांच करें।",
    es: "Ajusta el recorte cercano al negro y al blanco, comprueba el sangrado de retroiluminación en habitación oscura.",
    fr: "Ajustez le découpage proche du noir et du blanc, vérifiez le saignement de rétroéclairage dans une pièce sombre.",
    de: "Stellen Sie Fast-Schwarz- und Fast-Weiß-Clipping ein, prüfen Sie Hintergrundlicht-Bleed im Dunkeln.",
    pt: "Ajuste o clipping próximo ao preto e ao branco, verifique o sangramento de retroiluminação em quarto escuro.",
    ja: "ほぼ黒とほぼ白のクリッピングを調整し、暗室でバックライトブリードを確認します。",
    ko: "거의 검정과 거의 흰색 클리핑을 조정하고, 어두운 방에서 백라이트 번짐을 확인합니다."
  },
  "About.motionCategory": {
    hi: "गति, प्रतिक्रिया और गेमिंग",
    es: "Movimiento, Respuesta y Juegos",
    fr: "Mouvement, Réponse et Jeux",
    de: "Bewegung, Reaktion & Gaming",
    pt: "Movimento, Resposta e Jogos",
    ja: "動き、応答、ゲーミング",
    ko: "동작, 응답 및 게이밍"
  },
  "About.motionDesc": {
    hi: "घोस्टिंग ट्रेल की जांच करें, पिक्सल ओवरड्राइव सेटिंग्स का मूल्यांकन करें, V-Sync रिफ्रेश रेट (Hz) मापें।",
    es: "Comprueba rastros de ghosting, evalúa ajustes de overdrive de píxeles, mide la tasa de actualización V-Sync (Hz).",
    fr: "Vérifiez les traces de ghosting, évaluez les paramètres d'overdrive des pixels, mesurez la fréquence de rafraîchissement V-Sync (Hz).",
    de: "Prüfen Sie Ghosting-Schlieren, bewerten Sie Pixel-Overdrive-Einstellungen, messen Sie die V-Sync-Bildwiederholrate (Hz).",
    pt: "Verifique rastros de ghosting, avalie configurações de overdrive de pixels, meça a taxa de atualização V-Sync (Hz).",
    ja: "ゴーストトレイルを確認し、ピクセルオーバードライブ設定を評価し、V-Syncリフレッシュレート（Hz）を測定します。",
    ko: "고스팅 흔적을 확인하고, 픽셀 오버드라이브 설정을 평가하며, V-Sync 새로 고침률(Hz)을 측정합니다."
  },
  "About.toolsCategory": {
    hi: "हार्डवेयर डायग्नोस्टिक्स और कैलकुलेटर",
    es: "Diagnósticos de Hardware y Calculadoras",
    fr: "Diagnostics Matériels et Calculateurs",
    de: "Hardware-Diagnose & Rechner",
    pt: "Diagnósticos de Hardware e Calculadoras",
    ja: "ハードウェア診断とカルキュレーター",
    ko: "하드웨어 진단 및 계산기"
  },
  "About.toolsDesc": {
    hi: "पता लगाए गए स्क्रीन मेट्रिक्स (DPR, रंग गहराई) का निरीक्षण करें, PPI और इष्टतम देखने की दूरी की गणना करें।",
    es: "Inspecciona las métricas de pantalla detectadas (DPR, profundidad de color), calcula PPI y distancias de visualización óptimas.",
    fr: "Inspectez les métriques d'écran détectées (DPR, profondeur de couleur), calculez le PPI et les distances de visualisation optimales.",
    de: "Überprüfen Sie erkannte Bildschirmmetriken (DPR, Farbtiefe), berechnen Sie PPI und optimale Betrachtungsabstände.",
    pt: "Inspecione as métricas de tela detectadas (DPR, profundidade de cor), calcule PPI e distâncias de visualização ideais.",
    ja: "検出された画面メトリクス（DPR、色深度）を確認し、PPIと最適な視聴距離を計算します。",
    ko: "감지된 화면 메트릭(DPR, 색 깊이)을 검사하고, PPI 및 최적 시청 거리를 계산합니다."
  },
  "About.openSourceTitle": {
    hi: "खुला और समुदाय-संचालित",
    es: "Abierto y Orientado a la Comunidad",
    fr: "Ouvert et Piloté par la Communauté",
    de: "Offen & Community-Driven",
    pt: "Aberto e Orientado pela Comunidade",
    ja: "オープンでコミュニティ主導",
    ko: "개방적이고 커뮤니티 중심"
  },
  "About.openSourceText": {
    hi: "मॉनिटर टेस्टर एक ओपन-सोर्स प्रोजेक्ट है। आप GitHub पर स्रोत कोड का निरीक्षण कर सकते हैं, रेंडरिंग बग रिपोर्ट कर सकते हैं, नए परीक्षण पैटर्न का सुझाव दे सकते हैं या सीधे योगदान दे सकते हैं।",
    es: "Monitor Tester es un proyecto de código abierto. Puedes inspeccionar el código fuente, reportar errores de renderizado, sugerir nuevos patrones de prueba o contribuir directamente en GitHub.",
    fr: "Monitor Tester est un projet open-source. Vous pouvez inspecter le code source, signaler des bogues de rendu, suggérer de nouveaux schémas de test ou contribuer directement sur GitHub.",
    de: "Monitor Tester ist ein Open-Source-Projekt. Sie können den Quellcode inspizieren, Rendering-Fehler melden, neue Testmuster vorschlagen oder direkt auf GitHub beitragen.",
    pt: "Monitor Tester é um projeto de código aberto. Você pode inspecionar o código-fonte, relatar bugs de renderização, sugerir novos padrões de teste ou contribuir diretamente no GitHub.",
    ja: "モニターテスターはオープンソースプロジェクトです。GitHubでソースコードを確認したり、レンダリングバグを報告したり、新しいテストパターンを提案したり、直接貢献したりできます。",
    ko: "모니터 테스터는 오픈 소스 프로젝트입니다. GitHub에서 소스 코드를 검사하거나 렌더링 버그를 보고하거나 새로운 테스트 패턴을 제안하거나 직접 기여할 수 있습니다."
  },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function setNestedValue(obj, keyPath, value) {
  const parts = keyPath.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!(parts[i] in current)) current[parts[i]] = {};
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

// ── Main ─────────────────────────────────────────────────────────────────────

const langs = ['hi', 'es', 'fr', 'de', 'pt', 'ja', 'ko'];
const msgFiles = {};

for (const lang of langs) {
  const filePath = path.join(messagesDir, `${lang}.json`);
  msgFiles[lang] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

let updatedCount = 0;
for (const [key, langMap] of Object.entries(translations)) {
  for (const [lang, value] of Object.entries(langMap)) {
    if (langs.includes(lang)) {
      setNestedValue(msgFiles[lang], key, value);
      updatedCount++;
    }
  }
}

for (const lang of langs) {
  const filePath = path.join(messagesDir, `${lang}.json`);
  fs.writeFileSync(filePath, JSON.stringify(msgFiles[lang], null, 2), 'utf8');
}

console.log(`✅ Updated ${updatedCount} translation entries across ${langs.length} language files.`);
console.log('Files updated:', langs.map(l => `${l}.json`).join(', '));
