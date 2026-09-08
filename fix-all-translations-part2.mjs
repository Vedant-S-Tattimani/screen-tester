/**
 * fix-all-translations-part2.mjs
 * Fills in the remaining untranslated strings (part 2).
 * Run: node fix-all-translations-part2.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const messagesDir = path.join(__dirname, 'messages');

const translations = {

  // ── Breadcrumbs ─────────────────────────────────────────
  "Breadcrumbs.tests": {
    hi: "परीक्षण",
    es: "Pruebas",
    fr: "Tests",
    de: "Tests",
    pt: "Testes",
    ja: "テスト",
    ko: "테스트"
  },

  // ── CompareDisplays ─────────────────────────────────────
  "CompareDisplays.comparator.displayA": {
    hi: "डिस्प्ले A",
    es: "Pantalla A",
    fr: "Affichage A",
    de: "Display A",
    pt: "Tela A",
    ja: "ディスプレイ A",
    ko: "디스플레이 A"
  },
  "CompareDisplays.comparator.displayB": {
    hi: "डिस्प्ले B",
    es: "Pantalla B",
    fr: "Affichage B",
    de: "Display B",
    pt: "Tela B",
    ja: "ディスプレイ B",
    ko: "디스플레이 B"
  },
  "CompareDisplays.parameter": {
    hi: "पैरामीटर",
    es: "Parámetro",
    fr: "Paramètre",
    de: "Parameter",
    pt: "Parâmetro",
    ja: "パラメーター",
    ko: "매개변수"
  },
  "CompareDisplays.presets.fhd24": {
    hi: "24\" फुल HD (1080p)",
    es: "24\" Full HD (1080p)",
    fr: "24\" Full HD (1080p)",
    de: "24\" Full HD (1080p)",
    pt: "24\" Full HD (1080p)",
    ja: "24\" フルHD (1080p)",
    ko: "24\" 풀 HD (1080p)"
  },
  "CompareDisplays.presets.mac14": {
    hi: "14\" लैपटॉप (Retina)",
    es: "14\" Laptop (Retina)",
    fr: "14\" Ordinateur Portable (Retina)",
    de: "14\" Laptop (Retina)",
    pt: "14\" Laptop (Retina)",
    ja: "14\" ラップトップ (Retina)",
    ko: "14\" 노트북 (Retina)"
  },
  "CompareDisplays.presets.mac16": {
    hi: "16\" लैपटॉप (Retina)",
    es: "16\" Laptop (Retina)",
    fr: "16\" Ordinateur Portable (Retina)",
    de: "16\" Laptop (Retina)",
    pt: "16\" Laptop (Retina)",
    ja: "16\" ラップトップ (Retina)",
    ko: "16\" 노트북 (Retina)"
  },
  "CompareDisplays.presets.oled27": {
    hi: "27\" OLED 240Hz गेमिंग",
    es: "27\" OLED 240Hz Gaming",
    fr: "27\" OLED 240Hz Gaming",
    de: "27\" OLED 240Hz Gaming",
    pt: "27\" OLED 240Hz Gaming",
    ja: "27\" OLED 240Hz ゲーミング",
    ko: "27\" OLED 240Hz 게이밍"
  },
  "CompareDisplays.presets.qhd27": {
    hi: "27\" क्वाड HD (1440p)",
    es: "27\" Quad HD (1440p)",
    fr: "27\" Quad HD (1440p)",
    de: "27\" Quad HD (1440p)",
    pt: "27\" Quad HD (1440p)",
    ja: "27\" クアッドHD (1440p)",
    ko: "27\" 쿼드 HD (1440p)"
  },
  "CompareDisplays.presets.suw49": {
    hi: "49\" सुपर अल्ट्रावाइड",
    es: "49\" Super Ultrawide",
    fr: "49\" Super Ultrawide",
    de: "49\" Super Ultrawide",
    pt: "49\" Super Ultrawide",
    ja: "49\" スーパーウルトラワイド",
    ko: "49\" 슈퍼 울트라와이드"
  },
  "CompareDisplays.presets.uhd27": {
    hi: "27\" 4K अल्ट्रा HD",
    es: "27\" 4K Ultra HD",
    fr: "27\" 4K Ultra HD",
    de: "27\" 4K Ultra HD",
    pt: "27\" 4K Ultra HD",
    ja: "27\" 4K ウルトラHD",
    ko: "27\" 4K 울트라 HD"
  },
  "CompareDisplays.presets.uhd32": {
    hi: "32\" 4K अल्ट्रा HD",
    es: "32\" 4K Ultra HD",
    fr: "32\" 4K Ultra HD",
    de: "32\" 4K Ultra HD",
    pt: "32\" 4K Ultra HD",
    ja: "32\" 4K ウルトラHD",
    ko: "32\" 4K 울트라 HD"
  },
  "CompareDisplays.presets.uwqhd34": {
    hi: "34\" अल्ट्रावाइड (UWQHD)",
    es: "34\" Ultrawide (UWQHD)",
    fr: "34\" Ultrawide (UWQHD)",
    de: "34\" Ultrawide (UWQHD)",
    pt: "34\" Ultrawide (UWQHD)",
    ja: "34\" ウルトラワイド (UWQHD)",
    ko: "34\" 울트라와이드 (UWQHD)"
  },
  "CompareDisplays.ratios.r32_9": {
    hi: "32:9 (सुपर अल्ट्रावाइड)",
    es: "32:9 (Super Ultrawide)",
    fr: "32:9 (Super Ultrawide)",
    de: "32:9 (Super Ultrawide)",
    pt: "32:9 (Super Ultrawide)",
    ja: "32:9 (スーパーウルトラワイド)",
    ko: "32:9 (슈퍼 울트라와이드)"
  },
  "CompareDisplays.resolution.standardClass": {
    hi: "वर्गीकरण",
    es: "Clasificación",
    fr: "Classification",
    de: "Klassifizierung",
    pt: "Classificação",
    ja: "分類",
    ko: "분류"
  },

  // ── Contact ──────────────────────────────────────────────
  "Contact.contributeAction": {
    hi: "GitHub रिपॉजिटरी देखें →",
    es: "Ver Repositorio en GitHub →",
    fr: "Voir le Dépôt GitHub →",
    de: "GitHub-Repository anzeigen →",
    pt: "Ver Repositório no GitHub →",
    ja: "GitHubリポジトリを見る →",
    ko: "GitHub 저장소 보기 →"
  },
  "Contact.contributeDesc": {
    hi: "मॉनिटर टेस्टर ओपन सोर्स है। परीक्षण सुधारों, प्रदर्शन अनुकूलन और अनुवाद के लिए Pull Requests का स्वागत है।",
    es: "Monitor Tester es de código abierto. Las pull requests para mejoras de pruebas, optimizaciones de rendimiento y traducciones son bienvenidas.",
    fr: "Monitor Tester est open source. Les pull requests pour les améliorations de tests, les optimisations de performance et les traductions sont les bienvenues.",
    de: "Monitor Tester ist Open Source. Pull Requests für Test-Verbesserungen, Performance-Optimierungen und Übersetzungen sind willkommen.",
    pt: "Monitor Tester é de código aberto. Pull requests para melhorias de teste, otimizações de desempenho e traduções são bem-vindas.",
    ja: "モニターテスターはオープンソースです。テストの改善、パフォーマンスの最適化、翻訳のためのプルリクエストを歓迎します。",
    ko: "모니터 테스터는 오픈 소스입니다. 테스트 개선, 성능 최적화 및 번역을 위한 풀 리퀘스트를 환영합니다."
  },
  "Contact.contributeTitle": {
    hi: "कोड और गाइड में योगदान करें",
    es: "Contribuir Código y Guías",
    fr: "Contribuer du Code et des Guides",
    de: "Code & Anleitungen beitragen",
    pt: "Contribuir com Código e Guias",
    ja: "コードとガイドに貢献する",
    ko: "코드 및 가이드 기여"
  },
  "Contact.emailDesc": {
    hi: "सामान्य पूछताछ, सहयोग, या प्रोजेक्ट के बारे में निजी फीडबैक के लिए हमसे संपर्क करें।",
    es: "Para consultas generales, colaboraciones o comentarios privados sobre el proyecto, no dude en comunicarse con nosotros.",
    fr: "Pour les demandes générales, les collaborations ou les commentaires privés concernant le projet, n'hésitez pas à nous contacter.",
    de: "Für allgemeine Anfragen, Kooperationen oder privates Feedback zum Projekt können Sie uns gerne kontaktieren.",
    pt: "Para consultas gerais, colaborações ou feedback privado sobre o projeto, fique à vontade para entrar em contato.",
    ja: "一般的なお問い合わせ、コラボレーション、またはプロジェクトに関するプライベートなフィードバックについては、お気軽にご連絡ください。",
    ko: "일반 문의, 협업 또는 프로젝트에 관한 비공개 피드백을 위해 언제든지 연락하세요."
  },
  "Contact.faqAction": {
    hi: "FAQ पढ़ें →",
    es: "Leer las FAQ →",
    fr: "Lire la FAQ →",
    de: "FAQ lesen →",
    pt: "Ler as FAQ →",
    ja: "FAQを読む →",
    ko: "FAQ 읽기 →"
  },
  "Contact.faqDesc": {
    hi: "ब्राउज़र परीक्षण कैसे काम करते हैं या डेड पिक्सल क्या हैं इस पर त्वरित मार्गदर्शन चाहिए? हमारे व्यापक FAQ देखें।",
    es: "¿Buscas orientación rápida sobre cómo funcionan las pruebas de navegador o qué son los píxeles muertos? Consulta nuestras completas FAQ.",
    fr: "Vous cherchez des conseils rapides sur le fonctionnement des tests de navigateur ou ce que sont les pixels morts? Consultez notre FAQ complète.",
    de: "Suchen Sie schnelle Anleitung dazu, wie Browser-Tests funktionieren oder was tote Pixel sind? Lesen Sie unsere umfassenden FAQ.",
    pt: "Procurando orientação rápida sobre como os testes de navegador funcionam ou o que são pixels mortos? Confira nossas FAQ abrangentes.",
    ja: "ブラウザテストの仕組みやデッドピクセルとは何かについて素早いガイダンスをお探しですか？包括的なFAQをご覧ください。",
    ko: "브라우저 테스트 작동 방식이나 불량 픽셀이 무엇인지에 대한 빠른 안내가 필요하세요? 포괄적인 FAQ를 확인하세요."
  },
  "Contact.faqTitle": {
    hi: "सामान्य प्रश्न देखें",
    es: "Consultar Preguntas Frecuentes",
    fr: "Consulter les Questions Fréquentes",
    de: "Häufige Fragen überprüfen",
    pt: "Verificar Perguntas Frequentes",
    ja: "よくある質問を確認する",
    ko: "자주 묻는 질문 확인"
  },
  "Contact.githubAction": {
    hi: "GitHub पर Issue खोलें →",
    es: "Abrir un Issue en GitHub →",
    fr: "Ouvrir un Issue sur GitHub →",
    de: "Issue auf GitHub öffnen →",
    pt: "Abrir um Issue no GitHub →",
    ja: "GitHubでissueを開く →",
    ko: "GitHub에서 이슈 열기 →"
  },
  "Contact.githubDesc": {
    hi: "हमारे सार्वजनिक GitHub रिपॉजिटरी पर बग, ब्राउज़र रेंडरिंग समस्याएं रिपोर्ट करें या नए परीक्षण पैटर्न का अनुरोध करें।",
    es: "Reporta errores, problemas de renderizado del navegador o solicita nuevos patrones de prueba de pantalla en nuestro repositorio público de GitHub.",
    fr: "Signalez des bogues, des problèmes de rendu du navigateur ou demandez de nouveaux schémas de test d'affichage sur notre référentiel GitHub public.",
    de: "Melden Sie Fehler, Browser-Rendering-Probleme oder fordern Sie neue Anzeige-Testmuster in unserem öffentlichen GitHub-Repository an.",
    pt: "Reporte erros, problemas de renderização do navegador ou solicite novos padrões de teste de tela em nosso repositório público do GitHub.",
    ja: "当社の公開GitHubリポジトリでバグ、ブラウザのレンダリング問題を報告したり、新しいディスプレイテストパターンをリクエストしたりしてください。",
    ko: "공개 GitHub 저장소에서 버그, 브라우저 렌더링 문제를 보고하거나 새로운 디스플레이 테스트 패턴을 요청하세요."
  },

  // ── CustomPattern ────────────────────────────────────────
  "CustomPattern.controls.gradHorizontal": {
    hi: "क्षैतिज",
    es: "Horizontal",
    fr: "Horizontal",
    de: "Horizontal",
    pt: "Horizontal",
    ja: "水平",
    ko: "수평"
  },
  "CustomPattern.controls.gradVertical": {
    hi: "ऊर्ध्वाधर",
    es: "Vertical",
    fr: "Vertical",
    de: "Vertikal",
    pt: "Vertical",
    ja: "垂直",
    ko: "수직"
  },
  "CustomPattern.controls.weightNormal": {
    hi: "सामान्य (400)",
    es: "Regular (400)",
    fr: "Normal (400)",
    de: "Normal (400)",
    pt: "Normal (400)",
    ja: "標準 (400)",
    ko: "보통 (400)"
  },
  "CustomPattern.presets.moire.label": {
    hi: "मोइरे और सीमेंस",
    es: "Moiré y Siemens",
    fr: "Moiré et Siemens",
    de: "Moiré & Siemens",
    pt: "Moiré e Siemens",
    ja: "モアレとジーメンス",
    ko: "무아레 및 지멘스"
  },

  // ── DisplayInfo ──────────────────────────────────────────
  "DisplayInfo.capabilities.colDesc": {
    hi: "विवरण",
    es: "Descripción",
    fr: "Description",
    de: "Beschreibung",
    pt: "Descrição",
    ja: "説明",
    ko: "설명"
  },
  "DisplayInfo.capabilities.colStatus": {
    hi: "स्थिति",
    es: "Estado",
    fr: "Statut",
    de: "Status",
    pt: "Status",
    ja: "ステータス",
    ko: "상태"
  },
  "DisplayInfo.geometry.dprLabel": {
    hi: "डिवाइस पिक्सल अनुपात (DPR)",
    es: "Relación de Píxeles del Dispositivo (DPR)",
    fr: "Rapport de Pixels de l'Appareil (DPR)",
    de: "Gerätepixelverhältnis (DPR)",
    pt: "Proporção de Pixels do Dispositivo (DPR)",
    ja: "デバイスピクセル比 (DPR)",
    ko: "기기 픽셀 비율 (DPR)"
  },
  "DisplayInfo.geometry.viewportFormula": {
    hi: "window.innerWidth × innerHeight",
    es: "window.innerWidth × innerHeight",
    fr: "window.innerWidth × innerHeight",
    de: "window.innerWidth × innerHeight",
    pt: "window.innerWidth × innerHeight",
    ja: "window.innerWidth × innerHeight",
    ko: "window.innerWidth × innerHeight"
  },
  "DisplayInfo.multiScreen.dpr": {
    hi: "डिवाइस पिक्सल अनुपात: {dpr}x",
    es: "Relación de Píxeles: {dpr}x",
    fr: "Rapport de Pixels: {dpr}x",
    de: "Gerätepixelverhältnis: {dpr}x",
    pt: "Proporção de Pixels: {dpr}x",
    ja: "デバイスピクセル比: {dpr}x",
    ko: "기기 픽셀 비율: {dpr}x"
  },
  "DisplayInfo.multiScreen.orientationStandard": {
    hi: "मानक",
    es: "Estándar",
    fr: "Standard",
    de: "Standard",
    pt: "Padrão",
    ja: "標準",
    ko: "표준"
  },
  "DisplayInfo.multiScreen.subtitle": {
    hi: "विंडो मैनेजमेंट API",
    es: "API de Gestión de Ventanas",
    fr: "API de Gestion des Fenêtres",
    de: "Fensterverwaltungs-API",
    pt: "API de Gerenciamento de Janelas",
    ja: "ウィンドウ管理API",
    ko: "창 관리 API"
  },

  // ── Footer remaining ─────────────────────────────────────
  "Footer.columns.guides": {
    hi: "गाइड",
    es: "Guías",
    fr: "Guides",
    de: "Anleitungen",
    pt: "Guias",
    ja: "ガイド",
    ko: "가이드"
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
  "Footer.columns.tests": {
    hi: "परीक्षण",
    es: "Pruebas",
    fr: "Tests",
    de: "Tests",
    pt: "Testes",
    ja: "テスト",
    ko: "테스트"
  },
  "Footer.links.contact": {
    hi: "संपर्क",
    es: "Contacto",
    fr: "Contact",
    de: "Kontakt",
    pt: "Contato",
    ja: "お問い合わせ",
    ko: "문의"
  },

  // ── Guides remaining ─────────────────────────────────────
  "Guides.backlightBleedConcept.backlightBleed.actionLabel": {
    hi: "कार्रवाई",
    es: "Acción",
    fr: "Action",
    de: "Aktion",
    pt: "Ação",
    ja: "アクション",
    ko: "조치"
  },
  "Guides.backlightBleedConcept.breadcrumbsGuides": {
    hi: "गाइड",
    es: "Guías",
    fr: "Guides",
    de: "Anleitungen",
    pt: "Guias",
    ja: "ガイド",
    ko: "가이드"
  },
  "Guides.backlightBleedConcept.breadcrumbsTitle": {
    hi: "बैकलाइट ब्लीड",
    es: "Sangrado de Retroiluminación",
    fr: "Saignement de Rétroéclairage",
    de: "Hintergrundlicht-Bleed",
    pt: "Sangramento de Retroiluminação",
    ja: "バックライトブリード",
    ko: "백라이트 번짐"
  },
  "Guides.backlightBleedConcept.ipsGlow.actionLabel": {
    hi: "कार्रवाई",
    es: "Acción",
    fr: "Action",
    de: "Aktion",
    pt: "Ação",
    ja: "アクション",
    ko: "조치"
  },
  "Guides.backlightBleedConcept.ipsGlow.title": {
    hi: "IPS ग्लो",
    es: "Brillo IPS",
    fr: "Lueur IPS",
    de: "IPS-Leuchten",
    pt: "Brilho IPS",
    ja: "IPSグロー",
    ko: "IPS 글로우"
  },
  "Guides.ghostingConcept.breadcrumbsGuides": {
    hi: "गाइड",
    es: "Guías",
    fr: "Guides",
    de: "Anleitungen",
    pt: "Guias",
    ja: "ガイド",
    ko: "가이드"
  },
  "Guides.ghostingConcept.inverseGhosting.solutionLabel": {
    hi: "समाधान",
    es: "Solución",
    fr: "Solution",
    de: "Lösung",
    pt: "Solução",
    ja: "解決策",
    ko: "해결책"
  },
  "Guides.ghostingConcept.standardGhosting.solutionLabel": {
    hi: "समाधान",
    es: "Solución",
    fr: "Solution",
    de: "Lösung",
    pt: "Solução",
    ja: "解決策",
    ko: "해결책"
  },
  "Guides.pixelDefectsConcept.breadcrumbsGuides": {
    hi: "गाइड",
    es: "Guías",
    fr: "Guides",
    de: "Anleitungen",
    pt: "Guias",
    ja: "ガイド",
    ko: "가이드"
  },
  "Guides.pixelDefectsConcept.deadPixel.causeLabel": {
    hi: "कारण",
    es: "Causa",
    fr: "Cause",
    de: "Ursache",
    pt: "Causa",
    ja: "原因",
    ko: "원인"
  },
  "Guides.pixelDefectsConcept.stuckPixel.causeLabel": {
    hi: "कारण",
    es: "Causa",
    fr: "Cause",
    de: "Ursache",
    pt: "Causa",
    ja: "原因",
    ko: "원인"
  },
  "Guides.viewingAngles.breadcrumbsGuides": {
    hi: "गाइड",
    es: "Guías",
    fr: "Guides",
    de: "Anleitungen",
    pt: "Guias",
    ja: "ガイド",
    ko: "가이드"
  },
  "Guides.viewingAngles.ipsTitle": {
    hi: "IPS (इन-प्लेन स्विचिंग)",
    es: "IPS (In-Plane Switching)",
    fr: "IPS (In-Plane Switching)",
    de: "IPS (In-Plane Switching)",
    pt: "IPS (In-Plane Switching)",
    ja: "IPS (インプレーンスイッチング)",
    ko: "IPS (인플레인 스위칭)"
  },
  "Guides.viewingAngles.tnTitle": {
    hi: "TN (ट्विस्टेड नेमेटिक)",
    es: "TN (Twisted Nematic)",
    fr: "TN (Twisted Nematic)",
    de: "TN (Twisted Nematic)",
    pt: "TN (Twisted Nematic)",
    ja: "TN (ツイストネマティック)",
    ko: "TN (트위스티드 네마틱)"
  },
  "Guides.viewingAngles.vaTitle": {
    hi: "VA (वर्टिकल अलाइनमेंट)",
    es: "VA (Vertical Alignment)",
    fr: "VA (Vertical Alignment)",
    de: "VA (Vertical Alignment)",
    pt: "VA (Vertical Alignment)",
    ja: "VA (バーティカルアライメント)",
    ko: "VA (수직 정렬)"
  },

  // ── Header remaining ─────────────────────────────────────
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
  "Header.nav.guides": {
    hi: "गाइड",
    es: "Guías",
    fr: "Guides",
    de: "Anleitungen",
    pt: "Guias",
    ja: "ガイド",
    ko: "가이드"
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
  "Header.nav.menu": {
    hi: "मेनू",
    es: "Menú",
    fr: "Menu",
    de: "Menü",
    pt: "Menu",
    ja: "メニュー",
    ko: "메뉴"
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
  "Header.tests.pixels": {
    hi: "पिक्सल",
    es: "Píxeles",
    fr: "Pixels",
    de: "Pixel",
    pt: "Pixels",
    ja: "ピクセル",
    ko: "픽셀"
  },

  // ── Home ──────────────────────────────────────────────────
  "Home.allTestsCount": {
    hi: "28 परीक्षण",
    es: "28 pruebas",
    fr: "28 tests",
    de: "28 Tests",
    pt: "28 testes",
    ja: "28テスト",
    ko: "28개 테스트"
  },
  "Home.quickGhosting": {
    hi: "घोस्टिंग टेस्ट",
    es: "Test de Ghosting",
    fr: "Test de Ghosting",
    de: "Ghosting-Test",
    pt: "Teste de Ghosting",
    ja: "ゴーストテスト",
    ko: "고스팅 테스트"
  },

  // ── Inspection remaining ─────────────────────────────────
  "Inspection.hub.testsCount": {
    hi: "{count} परीक्षण",
    es: "{count} pruebas",
    fr: "{count} tests",
    de: "{count} Tests",
    pt: "{count} testes",
    ja: "{count} テスト",
    ko: "{count}개 테스트"
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

  // ── InspectionSummary ────────────────────────────────────
  "InspectionSummary.defects.colAction": {
    hi: "कार्रवाई",
    es: "Acción",
    fr: "Action",
    de: "Aktion",
    pt: "Ação",
    ja: "アクション",
    ko: "조치"
  },
  "InspectionSummary.defects.colClass": {
    hi: "वर्गीकरण",
    es: "Clasificación",
    fr: "Classification",
    de: "Klassifizierung",
    pt: "Classificação",
    ja: "分類",
    ko: "분류"
  },
  "InspectionSummary.defects.colNote": {
    hi: "नोट",
    es: "Nota",
    fr: "Note",
    de: "Notiz",
    pt: "Nota",
    ja: "メモ",
    ko: "메모"
  },
  "InspectionSummary.history.modalDpr": {
    hi: "DPR: {val}x",
    es: "DPR: {val}x",
    fr: "DPR: {val}x",
    de: "DPR: {val}x",
    pt: "DPR: {val}x",
    ja: "DPR: {val}x",
    ko: "DPR: {val}x"
  },
  "InspectionSummary.history.modalTests": {
    hi: "परीक्षण:",
    es: "Pruebas:",
    fr: "Tests:",
    de: "Tests:",
    pt: "Testes:",
    ja: "テスト:",
    ko: "테스트:"
  },
  "InspectionSummary.history.modalViewport": {
    hi: "व्यूपोर्ट: {val}",
    es: "Viewport: {val}",
    fr: "Fenêtre: {val}",
    de: "Ansichtsfenster: {val}",
    pt: "Janela: {val}",
    ja: "ビューポート: {val}",
    ko: "뷰포트: {val}"
  },
  "InspectionSummary.history.testsCount": {
    hi: "{count} परीक्षण",
    es: "{count} pruebas",
    fr: "{count} tests",
    de: "{count} Tests",
    pt: "{count} testes",
    ja: "{count} テスト",
    ko: "{count}개 테스트"
  },

  // ── LanguageSwitcher ─────────────────────────────────────
  "LanguageSwitcher.en": {
    hi: "अंग्रेज़ी",
    es: "Inglés",
    fr: "Anglais",
    de: "Englisch",
    pt: "Inglês",
    ja: "英語",
    ko: "영어"
  },

  // ── Terms remaining ──────────────────────────────────────
  "Terms.acceptanceText": {
    hi: "मॉनिटर टेस्टर तक पहुंच कर और उसका उपयोग करके, आप इन शर्तों को स्वीकार करते हैं। यदि आप सहमत नहीं हैं, तो कृपया सेवा का उपयोग बंद करें।",
    es: "Al acceder y utilizar Monitor Tester, reconoces y aceptas estos términos. Si no estás de acuerdo, deja de usar el servicio.",
    fr: "En accédant et en utilisant Monitor Tester, vous reconnaissez et acceptez ces conditions. Si vous n'êtes pas d'accord, veuillez cesser d'utiliser le service.",
    de: "Durch den Zugriff auf und die Nutzung von Monitor Tester erkennen Sie diese Bedingungen an und stimmen ihnen zu. Wenn Sie nicht einverstanden sind, stellen Sie bitte die Nutzung des Dienstes ein.",
    pt: "Ao acessar e usar o Monitor Tester, você reconhece e concorda com estes termos. Se você não concordar, pare de usar o serviço.",
    ja: "モニターテスターにアクセスして使用することで、これらの規約を認め、同意するものとします。同意しない場合は、サービスの使用を停止してください。",
    ko: "모니터 테스터에 액세스하고 사용함으로써 귀하는 이 약관을 인정하고 동의합니다. 동의하지 않으면 서비스 사용을 중단하십시오."
  },
  "Terms.acceptanceTitle": {
    hi: "शर्तों की स्वीकृति",
    es: "Aceptación de los Términos",
    fr: "Acceptation des Conditions",
    de: "Akzeptanz der Bedingungen",
    pt: "Aceitação dos Termos",
    ja: "利用規約への同意",
    ko: "약관 수락"
  },
  "Terms.disclaimerText": {
    hi: "मॉनिटर टेस्टर किसी भी प्रकार की वारंटी के बिना 'यथावत' और 'उपलब्ध होने पर' आधार पर प्रदान किया जाता है।",
    es: "Monitor Tester se proporciona 'TAL COMO ESTÁ' y 'SEGÚN DISPONIBILIDAD' sin garantías de ningún tipo.",
    fr: "Monitor Tester est fourni 'TEL QUEL' et 'TEL QUE DISPONIBLE' sans garanties d'aucune sorte.",
    de: "Monitor Tester wird 'WIE BESEHEN' und 'WIE VERFÜGBAR' ohne Gewährleistungen jeglicher Art bereitgestellt.",
    pt: "Monitor Tester é fornecido 'NO ESTADO EM QUE SE ENCONTRA' e 'CONFORME DISPONÍVEL' sem garantias de qualquer tipo.",
    ja: "モニターテスターは、いかなる種類の保証もなく「現状のまま」および「利用可能な状態で」提供されます。",
    ko: "모니터 테스터는 어떤 종류의 보증 없이 '있는 그대로' 및 '이용 가능한 상태로' 제공됩니다."
  },
  "Terms.disclaimerTitle": {
    hi: "वारंटी का अस्वीकरण",
    es: "Exención de Garantías",
    fr: "Exonération de Garanties",
    de: "Haftungsausschluss für Garantien",
    pt: "Isenção de Garantias",
    ja: "保証の否認",
    ko: "보증 면책"
  },
  "Terms.manufacturerText": {
    hi: "डिस्प्ले निर्माता पिक्सल दोषों (ISO 13406-2 जैसे मानकों के अनुसार) के बारे में अपनी विशिष्ट वारंटी शर्तें लागू करते हैं। हमारे परीक्षण परिणाम इन नीतियों को प्रभावित नहीं करते।",
    es: "Los fabricantes de pantallas hacen cumplir sus propios términos de garantía específicos con respecto a los defectos de píxeles (como las normas ISO 13406-2). Nuestros resultados de prueba no afectan estas políticas.",
    fr: "Les fabricants d'écrans appliquent leurs propres termes de garantie spécifiques concernant les défauts de pixels (tels que les normes ISO 13406-2). Nos résultats de test n'affectent pas ces politiques.",
    de: "Display-Hersteller setzen ihre eigenen spezifischen Garantiebedingungen bezüglich Pixeldefekten durch (wie ISO 13406-2-Normen). Unsere Testergebnisse beeinflussen diese Richtlinien nicht.",
    pt: "Os fabricantes de telas aplicam seus próprios termos de garantia específicos em relação a defeitos de pixels (como as normas ISO 13406-2). Nossos resultados de teste não afetam essas políticas.",
    ja: "ディスプレイメーカーは、ピクセル欠陥（ISO 13406-2などの基準）に関して独自の特定の保証条件を適用します。当社のテスト結果はこれらのポリシーに影響しません。",
    ko: "디스플레이 제조업체는 픽셀 결함(ISO 13406-2 표준 등)에 관한 자체적인 특정 보증 조건을 시행합니다. 당사의 테스트 결과는 이러한 정책에 영향을 미치지 않습니다."
  },
  "Terms.manufacturerTitle": {
    hi: "निर्माता वारंटी नीतियां",
    es: "Políticas de Garantía del Fabricante",
    fr: "Politiques de Garantie du Fabricant",
    de: "Herstellergarantierichtlinien",
    pt: "Políticas de Garantia do Fabricante",
    ja: "製造業者の保証ポリシー",
    ko: "제조업체 보증 정책"
  },
  "Terms.natureOfServiceText": {
    hi: "मॉनिटर टेस्टर एक खुला वेब उपयोगिता है जो उपयोगकर्ताओं को मानक HTML5 API का उपयोग करके अपने ब्राउज़र में डिस्प्ले पैनल का दृश्य मूल्यांकन करने में सहायता करने के लिए डिज़ाइन किया गया है।",
    es: "Monitor Tester es una utilidad web abierta diseñada para ayudar a los usuarios a evaluar visualmente los paneles de pantalla en sus navegadores usando APIs HTML5 estándar.",
    fr: "Monitor Tester est un utilitaire web ouvert conçu pour aider les utilisateurs à évaluer visuellement les panneaux d'affichage dans leurs navigateurs en utilisant des APIs HTML5 standard.",
    de: "Monitor Tester ist ein offenes Webdienstprogramm, das entwickelt wurde, um Benutzern dabei zu helfen, Anzeigepanels in ihren Browsern mithilfe Standard-HTML5-APIs visuell zu bewerten.",
    pt: "Monitor Tester é um utilitário web aberto projetado para ajudar os usuários a avaliar visualmente os painéis de tela em seus navegadores usando APIs HTML5 padrão.",
    ja: "モニターテスターは、標準のHTML5 APIを使用してブラウザでディスプレイパネルを視覚的に評価するのに役立つオープンなWebユーティリティです。",
    ko: "모니터 테스터는 표준 HTML5 API를 사용하여 브라우저에서 디스플레이 패널을 시각적으로 평가하는 데 도움을 주기 위해 설계된 개방형 웹 유틸리티입니다."
  },
  "Terms.natureOfServiceTitle": {
    hi: "सूचनात्मक और दृश्य परीक्षण का दायरा",
    es: "Alcance Informativo y de Prueba Visual",
    fr: "Portée Informationnelle et de Test Visuel",
    de: "Informations- und visueller Testumfang",
    pt: "Escopo Informacional e de Teste Visual",
    ja: "情報的・視覚的テストの範囲",
    ko: "정보 및 시각적 테스트 범위"
  },
  "Terms.noCalibrationText": {
    hi: "ब्राउज़र-आधारित सॉफ्टवेयर भौतिक स्पेक्ट्रोफोटोमीटर, हार्डवेयर कलरीमीटर (जैसे Calibrite या X-Rite डिवाइस) या ICC प्रोफाइल सॉफ्टवेयर की जगह नहीं ले सकता।",
    es: "El software basado en navegador no puede reemplazar los espectrofotómetros físicos, los colorímetros de hardware (como los dispositivos Calibrite o X-Rite) o el software de perfiles ICC.",
    fr: "Les logiciels basés sur le navigateur ne peuvent pas remplacer les spectrophotomètres physiques, les colorimètres matériels (tels que les appareils Calibrite ou X-Rite) ou les logiciels de profils ICC.",
    de: "Browserbasierte Software kann keine physischen Spektrophotometer, Hardware-Kolorimeter (wie Calibrite- oder X-Rite-Geräte) oder ICC-Profilsoftware ersetzen.",
    pt: "O software baseado em navegador não pode substituir espectrofotômetros físicos, colorímetros de hardware (como dispositivos Calibrite ou X-Rite) ou software de perfis ICC.",
    ja: "ブラウザベースのソフトウェアは、物理的な分光光度計、ハードウェアカラリメーター（CaliberiteやX-Riteデバイスなど）、またはICCプロファイルソフトウェアの代わりにはなりません。",
    ko: "브라우저 기반 소프트웨어는 물리적 분광광도계, 하드웨어 색도계(Calibrite 또는 X-Rite 장치 등) 또는 ICC 프로파일 소프트웨어를 대체할 수 없습니다."
  },
  "Terms.noCalibrationTitle": {
    hi: "हार्डवेयर कलरीमीटर का प्रतिस्थापन नहीं",
    es: "No es un Reemplazo de Colorímetros de Hardware",
    fr: "Pas un Remplacement pour les Colorimètres Matériels",
    de: "Kein Ersatz für Hardware-Kolorimeter",
    pt: "Não é um Substituto para Colorímetros de Hardware",
    ja: "ハードウェアカラリメーターの代替ではない",
    ko: "하드웨어 색도계의 대체가 아님"
  },

  // ── TestLibrary ──────────────────────────────────────────
  "TestLibrary.tags.canvas": {
    hi: "कैनवास",
    es: "CANVAS",
    fr: "CANVAS",
    de: "CANVAS",
    pt: "CANVAS",
    ja: "キャンバス",
    ko: "캔버스"
  },
  "TestLibrary.tags.color": {
    hi: "रंग",
    es: "COLOR",
    fr: "COULEUR",
    de: "FARBE",
    pt: "COR",
    ja: "カラー",
    ko: "색상"
  },
  "TestLibrary.tags.strobe": {
    hi: "स्ट्रोब",
    es: "ESTROBOSCÓPICO",
    fr: "STROBOSCOPIQUE",
    de: "STROBOSKOP",
    pt: "ESTROBOSCÓPICO",
    ja: "ストロボ",
    ko: "스트로브"
  },
  "TestLibrary.tags.visual": {
    hi: "दृश्य",
    es: "VISUAL",
    fr: "VISUEL",
    de: "VISUELL",
    pt: "VISUAL",
    ja: "ビジュアル",
    ko: "시각"
  },
  "TestLibrary.tags.vsync": {
    hi: "V-SYNC",
    es: "VSYNC",
    fr: "VSYNC",
    de: "VSYNC",
    pt: "VSYNC",
    ja: "Vシンク",
    ko: "브이싱크"
  },
  "TestLibrary.tests.backlightBleed.title": {
    hi: "बैकलाइट ब्लीड",
    es: "Sangrado de Retroiluminación",
    fr: "Saignement de Rétroéclairage",
    de: "Hintergrundlicht-Bleed",
    pt: "Sangramento de Retroiluminação",
    ja: "バックライトブリード",
    ko: "백라이트 번짐"
  },
  "TestLibrary.tests.blackLevelTest.description": {
    hi: "डार्क डिटेल को क्रश न हो, यह सुनिश्चित करने के लिए अपने मॉनिटर के ब्लैक लेवल को ट्यून करें।",
    es: "Ajusta los niveles de negro de tu monitor para garantizar que los detalles oscuros no se pierdan.",
    fr: "Ajustez les niveaux de noir de votre moniteur pour garantir que les détails sombres ne sont pas écrasés.",
    de: "Stimmen Sie die Schwarzwerte Ihres Monitors ab, um sicherzustellen, dass dunkle Details nicht verloren gehen.",
    pt: "Ajuste os níveis de preto do seu monitor para garantir que os detalhes escuros não sejam perdidos.",
    ja: "暗い詳細がつぶれないように、モニターのブラックレベルを調整します。",
    ko: "어두운 디테일이 뭉개지지 않도록 모니터의 블랙 레벨을 조정합니다."
  },
  "TestLibrary.tests.blackLevelTest.title": {
    hi: "ब्लैक लेवल टेस्ट",
    es: "Test de Nivel de Negro",
    fr: "Test de Niveau de Noir",
    de: "Schwarzwert-Test",
    pt: "Teste de Nível de Preto",
    ja: "ブラックレベルテスト",
    ko: "블랙 레벨 테스트"
  },
  "TestLibrary.tests.gammaTest.description": {
    hi: "अपने मॉनिटर के गामा ट्रैकिंग का दृश्य रूप से अनुमान लगाएं (sRGB के लिए लक्ष्य 2.2)।",
    es: "Estima visualmente el seguimiento gamma de tu monitor (objetivo 2.2 para sRGB).",
    fr: "Estimez visuellement le suivi gamma de votre moniteur (cible 2.2 pour sRGB).",
    de: "Schätzen Sie visuell das Gamma-Tracking Ihres Monitors (Ziel 2.2 für sRGB).",
    pt: "Estime visualmente o rastreamento gama do seu monitor (alvo 2.2 para sRGB).",
    ja: "モニターのガンマトラッキングを視覚的に推定します（sRGBのターゲット2.2）。",
    ko: "모니터의 감마 추적을 시각적으로 추정합니다(sRGB 목표 2.2)."
  },
  "TestLibrary.tests.gammaTest.title": {
    hi: "गामा कैलिब्रेशन",
    es: "Calibración Gamma",
    fr: "Calibration Gamma",
    de: "Gamma-Kalibrierung",
    pt: "Calibração Gamma",
    ja: "ガンマキャリブレーション",
    ko: "감마 보정"
  },
  "TestLibrary.tests.gradientTest.title": {
    hi: "ग्रेडिएंट बैंडिंग",
    es: "Bandas de Gradiente",
    fr: "Bandes de Dégradé",
    de: "Gradient-Banding",
    pt: "Faixas de Gradiente",
    ja: "グラデーションバンディング",
    ko: "그라디언트 밴딩"
  },
  "TestLibrary.tests.grayscaleTest.description": {
    hi: "रंग टिंटिंग के बिना तटस्थ ग्रे रेंडर करने की मॉनिटर की क्षमता का परीक्षण करें।",
    es: "Prueba la capacidad del monitor para renderizar grises neutros sin teñido de color.",
    fr: "Testez la capacité du moniteur à afficher des gris neutres sans teintage de couleur.",
    de: "Testen Sie die Fähigkeit des Monitors, neutrale Grautöne ohne Farbstich zu rendern.",
    pt: "Teste a capacidade do monitor de renderizar cinzas neutros sem tingimento de cor.",
    ja: "色調なしで中性グレーをレンダリングするモニターの能力をテストします。",
    ko: "색상 착색 없이 중성 회색을 렌더링하는 모니터의 능력을 테스트합니다."
  },
  "TestLibrary.tests.grayscaleTest.title": {
    hi: "ग्रेस्केल टेस्ट",
    es: "Test de Escala de Grises",
    fr: "Test de Niveaux de Gris",
    de: "Graustufen-Test",
    pt: "Teste de Escala de Cinza",
    ja: "グレースケールテスト",
    ko: "그레이스케일 테스트"
  },
  "TestLibrary.tests.hdrCapabilityTest.description": {
    hi: "सत्यापित करें कि आपका ब्राउज़र और OS सही ढंग से HDR और वाइड कलर गैमट का पता लगाते हैं।",
    es: "Verifica que tu navegador y OS detecten correctamente HDR y la gama de color amplia.",
    fr: "Vérifiez que votre navigateur et votre OS détectent correctement le HDR et la gamme de couleurs étendue.",
    de: "Überprüfen Sie, ob Ihr Browser und das OS HDR und Wide Color Gamut korrekt erkennen.",
    pt: "Verifique se seu navegador e SO detectam corretamente HDR e Wide Color Gamut.",
    ja: "ブラウザとOSがHDRとワイドカラーガモットを正しく検出するか確認します。",
    ko: "브라우저와 OS가 HDR 및 와이드 컬러 게멋을 올바르게 감지하는지 확인합니다."
  },
  "TestLibrary.tests.hdrCapabilityTest.title": {
    hi: "HDR क्षमता",
    es: "Capacidad HDR",
    fr: "Capacité HDR",
    de: "HDR-Fähigkeit",
    pt: "Capacidade HDR",
    ja: "HDR能力",
    ko: "HDR 기능"
  },
  "TestLibrary.tests.saturationTest.description": {
    hi: "उच्च-संतृप्ति ग्रेडिएंट में रंग जीवंतता का आकलन करें और बैंडिंग का पता लगाएं।",
    es: "Evalúa la viveza del color y detecta el bandeo en gradientes de alta saturación.",
    fr: "Évaluez la vivacité des couleurs et détectez le banding dans les dégradés à haute saturation.",
    de: "Bewerten Sie die Farblebhaftigkeit und erkennen Sie Banding in hochgesättigten Farbverläufen.",
    pt: "Avalie a vivacidade das cores e detecte banding em gradientes de alta saturação.",
    ja: "色の鮮やかさを評価し、高彩度グラデーションのバンディングを検出します。",
    ko: "색상 선명도를 평가하고 고채도 그라디언트에서 밴딩을 감지합니다."
  },
  "TestLibrary.tests.saturationTest.title": {
    hi: "सैचुरेशन टेस्ट",
    es: "Test de Saturación",
    fr: "Test de Saturation",
    de: "Sättigungs-Test",
    pt: "Teste de Saturação",
    ja: "彩度テスト",
    ko: "채도 테스트"
  },
  "TestLibrary.tests.whiteLevelTest.description": {
    hi: "चमकीले विवरण क्लिप न हों, यह सुनिश्चित करने के लिए अपने मॉनिटर के कंट्रास्ट को ट्यून करें।",
    es: "Ajusta el contraste de tu monitor para garantizar que los detalles brillantes no se recorten.",
    fr: "Ajustez le contraste de votre moniteur pour garantir que les détails lumineux ne soient pas coupés.",
    de: "Stimmen Sie den Kontrast Ihres Monitors ab, um sicherzustellen, dass helle Details nicht abgeschnitten werden.",
    pt: "Ajuste o contraste do seu monitor para garantir que os detalhes brilhantes não sejam cortados.",
    ja: "明るい詳細がクリッピングされないように、モニターのコントラストを調整します。",
    ko: "밝은 디테일이 클리핑되지 않도록 모니터의 대비를 조정합니다."
  },
  "TestLibrary.tests.whiteLevelTest.title": {
    hi: "व्हाइट लेवल टेस्ट",
    es: "Test de Nivel de Blanco",
    fr: "Test de Niveau de Blanc",
    de: "Weißwert-Test",
    pt: "Teste de Nível de Branco",
    ja: "ホワイトレベルテスト",
    ko: "화이트 레벨 테스트"
  },

  // ── TestPages ────────────────────────────────────────────
  "TestPages.backlight-bleed-test.description_p1": {
    hi: "यह परीक्षण एक शुद्ध काली स्क्रीन रेंडर करता है। यह LCD बैकलाइट ब्लीड, क्लाउडिंग या IPS ग्लो को उजागर करने के लिए डिज़ाइन किया गया है।",
    es: "Esta prueba renderiza una pantalla completamente negra. Está diseñada para exponer el sangrado de retroiluminación LCD, el clouding o el brillo IPS.",
    fr: "Ce test affiche un écran entièrement noir. Il est conçu pour exposer le saignement de rétroéclairage LCD, le clouding ou la lueur IPS.",
    de: "Dieser Test rendert einen reinen schwarzen Bildschirm. Er ist darauf ausgelegt, LCD-Hintergrundlicht-Bleed, Clouding oder IPS-Leuchten zu enthüllen.",
    pt: "Este teste renderiza uma tela completamente preta. É projetado para expor o sangramento de retroiluminação LCD, clouding ou brilho IPS.",
    ja: "このテストは純粋に黒い画面をレンダリングします。LCDバックライトブリード、クラウディング、またはIPSグローを露出するように設計されています。",
    ko: "이 테스트는 순수한 검정 화면을 렌더링합니다. LCD 백라이트 번짐, 클라우딩 또는 IPS 글로우를 드러내도록 설계되었습니다."
  },
  "TestPages.backlight-bleed-test.title": {
    hi: "बैकलाइट ब्लीड टेस्ट",
    es: "Test de Sangrado de Retroiluminación",
    fr: "Test de Saignement de Rétroéclairage",
    de: "Hintergrundlicht-Bleed-Test",
    pt: "Teste de Sangramento de Retroiluminação",
    ja: "バックライトブリードテスト",
    ko: "백라이트 번짐 테스트"
  },
  "TestPages.black-level-test.description_p1": {
    hi: "यह परीक्षण आपके मॉनिटर के ब्लैक लेवल (चमक) सेटिंग को कॉन्फ़िगर करने में मदद करता है। यह अत्यंत गहरे ग्रे ब्लॉक प्रदर्शित करता है।",
    es: "Esta prueba te ayuda a configurar el ajuste de nivel de negro (brillo) de tu monitor. Muestra bloques de gris extremadamente oscuros.",
    fr: "Ce test vous aide à configurer le réglage du niveau de noir (luminosité) de votre moniteur. Il affiche des blocs de gris extrêmement sombres.",
    de: "Dieser Test hilft Ihnen, die Schwarzwert-(Helligkeits-)Einstellung Ihres Monitors zu konfigurieren. Er zeigt extrem dunkle Grau-Blöcke an.",
    pt: "Este teste ajuda a configurar o ajuste de nível de preto (brilho) do seu monitor. Exibe blocos de cinza extremamente escuros.",
    ja: "このテストは、モニターのブラックレベル（輝度）設定を構成するのに役立ちます。非常に暗いグレーのブロックを表示します。",
    ko: "이 테스트는 모니터의 블랙 레벨(밝기) 설정을 구성하는 데 도움이 됩니다. 매우 어두운 회색 블록을 표시합니다."
  },
  "TestPages.black-level-test.inst1": {
    hi: "कमरे की लाइट बंद करें या स्क्रीन पर चमक कम करें।",
    es: "Apaga las luces de la habitación o reduce el reflejo en la pantalla.",
    fr: "Éteignez les lumières de la pièce ou réduisez l'éblouissement sur l'écran.",
    de: "Schalten Sie das Raumlicht aus oder reduzieren Sie die Blendung auf dem Bildschirm.",
    pt: "Apague as luzes do quarto ou reduza o brilho na tela.",
    ja: "部屋の電気を消すか、画面のグレアを減らしてください。",
    ko: "방 조명을 끄거나 화면의 눈부심을 줄이세요."
  },
  "TestPages.black-level-test.inst2": {
    hi: "अपने मॉनिटर की 'चमक' सेटिंग को तब तक एडजस्ट करें जब तक आप शुद्ध काले बैकग्राउंड से ब्लॉक 1 को मुश्किल से अलग कर सकें।",
    es: "Ajusta el ajuste de 'Brillo' de tu monitor hasta que puedas apenas distinguir el bloque 1 del fondo negro puro.",
    fr: "Ajustez le réglage 'Luminosité' de votre moniteur jusqu'à ce que vous puissiez à peine distinguer le bloc 1 du fond noir pur.",
    de: "Stellen Sie die 'Helligkeit'-Einstellung Ihres Monitors ein, bis Sie Block 1 kaum vom reinen schwarzen Hintergrund unterscheiden können.",
    pt: "Ajuste o ajuste de 'Brilho' do seu monitor até conseguir distinguir apenas o bloco 1 do fundo preto puro.",
    ja: "モニターの「輝度」設定を調整して、純粋な黒の背景からブロック1をかろうじて区別できるようにします。",
    ko: "순수한 검정 배경에서 블록 1을 간신히 구별할 수 있을 때까지 모니터의 '밝기' 설정을 조정하세요."
  },
  "TestPages.black-level-test.inst3": {
    hi: "यदि ब्लॉक 1-5 बैकग्राउंड के समान दिखते हैं, तो आपके काले रंग क्रश हो रहे हैं।",
    es: "Si los bloques 1-5 parecen idénticos al fondo, tus negros están siendo aplastados.",
    fr: "Si les blocs 1-5 semblent identiques au fond, vos noirs sont écrasés.",
    de: "Wenn die Blöcke 1-5 identisch mit dem Hintergrund aussehen, werden Ihre Schwarzwerte gecrusht.",
    pt: "Se os blocos 1-5 parecerem idênticos ao fundo, seus negros estão sendo esmagados.",
    ja: "ブロック1-5が背景と同一に見える場合、ブラックがクラッシュしています。",
    ko: "블록 1-5가 배경과 동일하게 보이면 블랙이 눌리고 있습니다."
  },
  "TestPages.black-level-test.title": {
    hi: "ब्लैक लेवल टेस्ट",
    es: "Test de Nivel de Negro",
    fr: "Test de Niveau de Noir",
    de: "Schwarzwert-Test",
    pt: "Teste de Nível de Preto",
    ja: "ブラックレベルテスト",
    ko: "블랙 레벨 테스트"
  },
  "TestPages.display-info.colorDepth": {
    hi: "रंग गहराई",
    es: "Profundidad de Color",
    fr: "Profondeur de Couleur",
    de: "Farbtiefe",
    pt: "Profundidade de Cor",
    ja: "色深度",
    ko: "색 깊이"
  },
  "TestPages.display-info.colorGamut": {
    hi: "रंग गैमट समर्थन",
    es: "Soporte de Gama de Color",
    fr: "Prise en charge de la Gamme de Couleurs",
    de: "Farbraumunterstützung",
    pt: "Suporte de Gama de Cor",
    ja: "カラーガモットのサポート",
    ko: "색 영역 지원"
  },
  "TestPages.display-info.description_p1": {
    hi: "यह डेटा सीधे आपके ब्राउज़र के Web API से पढ़ा जाता है। यह दर्शाता है कि ब्राउज़र क्या पता लगा और रिपोर्ट कर सकता है।",
    es: "Estos datos se leen directamente desde las API web de tu navegador. Representa lo que el navegador puede detectar e informar.",
    fr: "Ces données sont lues directement depuis les API web de votre navigateur. Elles représentent ce que le navigateur peut détecter et signaler.",
    de: "Diese Daten werden direkt von den Web-APIs Ihres Browsers gelesen. Sie repräsentieren das, was der Browser erkennen und melden kann.",
    pt: "Esses dados são lidos diretamente das APIs web do seu navegador. Representa o que o navegador pode detectar e relatar.",
    ja: "このデータはブラウザのWeb APIから直接読み取られます。ブラウザが検出し報告できることを表しています。",
    ko: "이 데이터는 브라우저의 Web API에서 직접 읽습니다. 브라우저가 감지하고 보고할 수 있는 것을 나타냅니다."
  },
  "TestPages.display-info.fullscreenEnabled": {
    hi: "फुलस्क्रीन क्षमता",
    es: "Capacidad de Pantalla Completa",
    fr: "Capacité Plein Écran",
    de: "Vollbild-Fähigkeit",
    pt: "Capacidade de Tela Cheia",
    ja: "フルスクリーン機能",
    ko: "전체 화면 기능"
  },
  "TestPages.display-info.gamutStandard": {
    hi: "sRGB (मानक)",
    es: "sRGB (Estándar)",
    fr: "sRGB (Standard)",
    de: "sRGB (Standard)",
    pt: "sRGB (Padrão)",
    ja: "sRGB (標準)",
    ko: "sRGB (표준)"
  },
  "TestPages.display-info.gamutWide": {
    hi: "Display P3 (वाइड)",
    es: "Display P3 (Amplio)",
    fr: "Display P3 (Large)",
    de: "Display P3 (Breit)",
    pt: "Display P3 (Amplo)",
    ja: "Display P3 (ワイド)",
    ko: "디스플레이 P3 (와이드)"
  },
  "TestPages.display-info.hardwareLabel": {
    hi: "हार्डवेयर क्षमताएं",
    es: "Capacidades de Hardware",
    fr: "Capacités Matérielles",
    de: "Hardware-Fähigkeiten",
    pt: "Capacidades de Hardware",
    ja: "ハードウェア機能",
    ko: "하드웨어 기능"
  },
  "TestPages.display-info.hdr": {
    hi: "हाई डायनेमिक रेंज (HDR)",
    es: "Alto Rango Dinámico (HDR)",
    fr: "Haute Plage Dynamique (HDR)",
    de: "Hoher Dynamikbereich (HDR)",
    pt: "Alto Alcance Dinâmico (HDR)",
    ja: "ハイダイナミックレンジ (HDR)",
    ko: "하이 다이나믹 레인지 (HDR)"
  },
  "TestPages.display-info.hdrActive": {
    hi: "समर्थित (सक्रिय)",
    es: "Compatible (Activo)",
    fr: "Supporté (Actif)",
    de: "Unterstützt (Aktiv)",
    pt: "Suportado (Ativo)",
    ja: "サポート済み (アクティブ)",
    ko: "지원됨 (활성)"
  },
  "TestPages.display-info.hdrStandard": {
    hi: "स्टैंडर्ड डायनेमिक रेंज (SDR)",
    es: "Rango Dinámico Estándar (SDR)",
    fr: "Plage Dynamique Standard (SDR)",
    de: "Standard-Dynamikbereich (SDR)",
    pt: "Alcance Dinâmico Padrão (SDR)",
    ja: "標準ダイナミックレンジ (SDR)",
    ko: "표준 다이나믹 레인지 (SDR)"
  },
  "TestPages.display-info.noTouch": {
    hi: "कोई टच समर्थन नहीं मिला",
    es: "No se detectó soporte táctil",
    fr: "Aucun support tactile détecté",
    de: "Kein Touch-Support erkannt",
    pt: "Nenhum suporte touch detectado",
    ja: "タッチサポートが検出されません",
    ko: "터치 지원이 감지되지 않음"
  },
  "TestPages.display-info.notSupported": {
    hi: "समर्थित नहीं",
    es: "No Compatible",
    fr: "Non Pris en Charge",
    de: "Nicht unterstützt",
    pt: "Não Suportado",
    ja: "サポートされていません",
    ko: "지원되지 않음"
  },
  "TestPages.display-info.orientation": {
    hi: "ओरिएंटेशन",
    es: "Orientación",
    fr: "Orientation",
    de: "Ausrichtung",
    pt: "Orientação",
    ja: "向き",
    ko: "방향"
  },
  "TestPages.display-info.pixelDepth": {
    hi: "पिक्सल गहराई",
    es: "Profundidad de Píxel",
    fr: "Profondeur de Pixel",
    de: "Pixeltiefe",
    pt: "Profundidade de Pixel",
    ja: "ピクセル深度",
    ko: "픽셀 깊이"
  },
  "TestPages.display-info.pixelRatio": {
    hi: "डिवाइस पिक्सल अनुपात",
    es: "Relación de Píxeles del Dispositivo",
    fr: "Rapport de Pixels de l'Appareil",
    de: "Gerätepixelverhältnis",
    pt: "Proporção de Pixels do Dispositivo",
    ja: "デバイスピクセル比",
    ko: "기기 픽셀 비율"
  },
  "TestPages.display-info.resLogical": {
    hi: "तार्किक रिज़ॉल्यूशन",
    es: "Resolución Lógica",
    fr: "Résolution Logique",
    de: "Logische Auflösung",
    pt: "Resolução Lógica",
    ja: "論理解像度",
    ko: "논리 해상도"
  },
  "TestPages.display-info.resWorkspace": {
    hi: "उपलब्ध कार्यक्षेत्र",
    es: "Espacio de Trabajo Disponible",
    fr: "Espace de Travail Disponible",
    de: "Verfügbarer Arbeitsbereich",
    pt: "Espaço de Trabalho Disponível",
    ja: "利用可能なワークスペース",
    ko: "사용 가능한 작업 공간"
  },
  "TestPages.display-info.supported": {
    hi: "समर्थित",
    es: "Compatible",
    fr: "Pris en Charge",
    de: "Unterstützt",
    pt: "Suportado",
    ja: "サポート済み",
    ko: "지원됨"
  },
  "TestPages.display-info.title": {
    hi: "डिस्प्ले जानकारी",
    es: "Información de Pantalla",
    fr: "Informations d'Affichage",
    de: "Anzeige-Informationen",
    pt: "Informações da Tela",
    ja: "ディスプレイ情報",
    ko: "디스플레이 정보"
  },
  "TestPages.display-info.touchPoints": {
    hi: "बिंदु",
    es: "puntos",
    fr: "points",
    de: "Punkte",
    pt: "pontos",
    ja: "ポイント",
    ko: "포인트"
  },
  "TestPages.display-info.touchSupport": {
    hi: "टच समर्थन",
    es: "Soporte Táctil",
    fr: "Support Tactile",
    de: "Touch-Unterstützung",
    pt: "Suporte Touch",
    ja: "タッチサポート",
    ko: "터치 지원"
  },
  "TestPages.display-info.unknown": {
    hi: "अज्ञात",
    es: "Desconocido",
    fr: "Inconnu",
    de: "Unbekannt",
    pt: "Desconhecido",
    ja: "不明",
    ko: "알 수 없음"
  },
  "TestPages.display-info.viewport": {
    hi: "ब्राउज़र व्यूपोर्ट",
    es: "Ventana del Navegador",
    fr: "Fenêtre du Navigateur",
    de: "Browser-Ansichtsfenster",
    pt: "Janela do Navegador",
    ja: "ブラウザビューポート",
    ko: "브라우저 뷰포트"
  },
  "TestPages.gamma-test.description_p1": {
    hi: "यह टूल आपके मॉनिटर की भौतिक गामा वक्र का अनुमान लगाने में मदद करता है। 2.2 का गामा sRGB के लिए मानक है।",
    es: "Esta herramienta te ayuda a estimar la curva gamma física de tu monitor. Un gamma de 2.2 es el estándar para sRGB.",
    fr: "Cet outil vous aide à estimer la courbe gamma physique de votre moniteur. Un gamma de 2.2 est le standard pour sRGB.",
    de: "Dieses Tool hilft Ihnen, die physische Gamma-Kurve Ihres Monitors zu schätzen. Ein Gamma von 2.2 ist der Standard für sRGB.",
    pt: "Esta ferramenta ajuda a estimar a curva gamma física do seu monitor. Um gamma de 2.2 é o padrão para sRGB.",
    ja: "このツールは、モニターの物理的なガンマ曲線を推定するのに役立ちます。sRGBのガンマ2.2が標準です。",
    ko: "이 도구는 모니터의 물리적 감마 곡선을 추정하는 데 도움이 됩니다. 감마 2.2는 sRGB의 표준입니다."
  },
  "TestPages.gamma-test.inst1": {
    hi: "फुलस्क्रीन में जाएं और मॉनिटर से दूर हटें, या ऊपरी लाइनें धुंधली होने तक आंखें सिकोड़ें।",
    es: "Entra en pantalla completa y aléjate del monitor, o entrecierra los ojos hasta que las líneas superiores se vuelvan borrosas.",
    fr: "Entrez en plein écran et éloignez-vous du moniteur, ou plissez les yeux jusqu'à ce que les lignes supérieures deviennent floues.",
    de: "Wechseln Sie in den Vollbildmodus und treten Sie vom Monitor zurück, oder kneifen Sie die Augen zusammen, bis die oberen Linien unscharf werden.",
    pt: "Entre em tela cheia e afaste-se do monitor, ou semicerre os olhos até que as linhas superiores fiquem borradas.",
    ja: "フルスクリーンに入り、モニターから離れるか、上部の線がぼやけるまで目を細めてください。",
    ko: "전체 화면으로 들어가서 모니터에서 물러나거나, 위쪽 선이 흐려질 때까지 눈을 가늘게 뜨세요."
  },
  "TestPages.gamma-test.inst2": {
    hi: "धुंधरे ऊपरी आधे हिस्से की तुलना नीचे के तीन सॉलिड ब्लॉकों से करें।",
    es: "Compara la parte superior borrosa con los tres bloques sólidos de abajo.",
    fr: "Comparez la moitié supérieure floue avec les trois blocs solides en dessous.",
    de: "Vergleichen Sie die verschwommene obere Hälfte mit den drei festen Blöcken darunter.",
    pt: "Compare a metade superior desfocada com os três blocos sólidos abaixo.",
    ja: "ぼやけた上半分を下の3つのソリッドブロックと比較します。",
    ko: "흐릿한 상단 절반을 아래의 세 개의 단색 블록과 비교하세요."
  },
  "TestPages.gamma-test.inst3": {
    hi: "जो ब्लॉक धुंधले ऊपरी आधे हिस्से की चमक से पूरी तरह मेल खाता है वह आपके मॉनिटर का अनुमानित गामा दर्शाता है।",
    es: "El bloque que coincide perfectamente con el brillo de la mitad superior borrosa indica el gamma aproximado de tu monitor.",
    fr: "Le bloc qui correspond parfaitement à la luminosité de la moitié supérieure floue indique le gamma approximatif de votre moniteur.",
    de: "Der Block, der perfekt zur Helligkeit der verschwommenen oberen Hälfte passt, gibt das ungefähre Gamma Ihres Monitors an.",
    pt: "O bloco que corresponde perfeitamente ao brilho da metade superior desfocada indica o gamma aproximado do seu monitor.",
    ja: "ぼやけた上半分の明るさと完全に一致するブロックが、モニターのおおよそのガンマを示します。",
    ko: "흐릿한 상단 절반의 밝기와 완벽하게 일치하는 블록이 모니터의 대략적인 감마를 나타냅니다."
  },
  "TestPages.gamma-test.inst4": {
    hi: "<strong>इस परीक्षण के बारे में:</strong> यह टूल दृश्य धारणा और मानक ब्राउज़र रंग रेंडरिंग पर निर्भर करता है।",
    es: "<strong>SOBRE ESTA PRUEBA:</strong> Esta herramienta se basa en la percepción visual y la representación de colores estándar del navegador.",
    fr: "<strong>À PROPOS DE CE TEST:</strong> Cet outil repose sur la perception visuelle et le rendu des couleurs standard du navigateur.",
    de: "<strong>ÜBER DIESEN TEST:</strong> Dieses Tool basiert auf visueller Wahrnehmung und standardmäßigem Browser-Farb-Rendering.",
    pt: "<strong>SOBRE ESTE TESTE:</strong> Esta ferramenta depende da percepção visual e da renderização de cores padrão do navegador.",
    ja: "<strong>このテストについて:</strong> このツールは視覚的な知覚と標準的なブラウザカラーレンダリングに依存しています。",
    ko: "<strong>이 테스트에 대해:</strong> 이 도구는 시각적 인식과 표준 브라우저 색상 렌더링에 의존합니다."
  },
  "TestPages.gamma-test.title": {
    hi: "गामा कैलिब्रेशन",
    es: "Calibración Gamma",
    fr: "Calibration Gamma",
    de: "Gamma-Kalibrierung",
    pt: "Calibração Gamma",
    ja: "ガンマキャリブレーション",
    ko: "감마 보정"
  },
  "TestPages.gradient-test.description_p1": {
    hi: "एक पूरी तरह से चिकनी 24-बिट (1.67 करोड़ रंग) ग्रेडिएंट प्रदर्शित करता है। कम गुणवत्ता वाले पैनल पर बैंडिंग दिखाई दे सकती है।",
    es: "Muestra un degradado perfectamente suave de 24 bits (16,7 millones de colores). En paneles de menor calidad puede aparecer banding.",
    fr: "Affiche un dégradé parfaitement lisse de 24 bits (16,7 millions de couleurs). Sur les panneaux de qualité inférieure, un banding peut apparaître.",
    de: "Zeigt einen perfekt glatten 24-Bit-Farbverlauf (16,7 Millionen Farben) an. Bei qualitativ schlechteren Panels kann Banding auftreten.",
    pt: "Exibe um gradiente perfeitamente suave de 24 bits (16,7 milhões de cores). Em painéis de menor qualidade pode aparecer banding.",
    ja: "完全に滑らかな24ビット（1670万色）グラデーションを表示します。品質の低いパネルではバンディングが現れる場合があります。",
    ko: "완벽하게 매끄러운 24비트(1,670만 색상) 그라디언트를 표시합니다. 품질이 낮은 패널에서는 밴딩이 나타날 수 있습니다."
  },
  "TestPages.gradient-test.title": {
    hi: "ग्रेडिएंट बैंडिंग टेस्ट",
    es: "Test de Bandas de Gradiente",
    fr: "Test de Bandes de Dégradé",
    de: "Gradient-Banding-Test",
    pt: "Teste de Faixas de Gradiente",
    ja: "グラデーションバンディングテスト",
    ko: "그라디언트 밴딩 테스트"
  },
  "TestPages.grayscale-test.description_p1": {
    hi: "यह परीक्षण तटस्थ ग्रेस्केल बैकग्राउंड प्रदर्शित करता है। यह जांचने में मदद करता है कि आपके मॉनिटर में रंग टिंटिंग है या नहीं।",
    es: "Esta prueba muestra fondos de escala de grises neutros. Ayuda a verificar si tu monitor tiene teñido de color.",
    fr: "Ce test affiche des fonds de niveaux de gris neutres. Il aide à vérifier si votre moniteur souffre d'une teinte de couleur.",
    de: "Dieser Test zeigt neutrale Graustufen-Hintergründe an. Er hilft dabei, zu prüfen, ob Ihr Monitor unter Farbstich leidet.",
    pt: "Este teste exibe fundos de escala de cinza neutros. Ajuda a verificar se seu monitor sofre de tingimento de cor.",
    ja: "このテストは中性のグレースケール背景を表示します。モニターに色調がないか確認するのに役立ちます。",
    ko: "이 테스트는 중성 그레이스케일 배경을 표시합니다. 모니터에 색상 착색이 있는지 확인하는 데 도움이 됩니다."
  },
  "TestPages.grayscale-test.inst1": {
    hi: "Space या राइट एरो का उपयोग करके ग्रे लेवल के माध्यम से साइकिल करें।",
    es: "Cicla por los niveles de gris usando Espacio o flecha derecha.",
    fr: "Faites défiler les niveaux de gris avec Espace ou la flèche droite.",
    de: "Radeln Sie durch die Graustufen mit Space oder Rechtspfeil.",
    pt: "Percorra os níveis de cinza usando Espaço ou seta direita.",
    ja: "スペースまたは右矢印を使用してグレーレベルを循環します。",
    ko: "스페이스바 또는 오른쪽 화살표를 사용하여 회색 레벨을 순환합니다."
  },
  "TestPages.grayscale-test.inst2": {
    hi: "तटस्थ ग्रे में गुलाबी, नीले या हरे रंग के रंग देखें।",
    es: "Busca matices rosas, azules o verdes en lo que debería ser gris neutro.",
    fr: "Recherchez des teintes roses, bleues ou vertes dans ce qui devrait être un gris neutre.",
    de: "Suchen Sie nach rosa, blauen oder grünen Tönen in dem, was neutrales Grau sein sollte.",
    pt: "Procure por tons rosa, azul ou verde no que deveria ser cinza neutro.",
    ja: "中性グレーにあるべきものにピンク、青、緑の色調を探します。",
    ko: "중성 회색이어야 할 곳에서 분홍, 파랑, 녹색 색조를 확인합니다."
  },
  "TestPages.grayscale-test.inst3": {
    hi: "किसी भी रंग कास्ट को ठीक करने के लिए अपने मॉनिटर के RGB बैलेंस नियंत्रण का उपयोग करें।",
    es: "Usa los controles de balance RGB de tu monitor para corregir cualquier dominante de color.",
    fr: "Utilisez les contrôles de balance RGB de votre moniteur pour corriger tout dominante de couleur.",
    de: "Verwenden Sie die RGB-Balance-Steuerungen Ihres Monitors, um Farbstiche zu korrigieren.",
    pt: "Use os controles de balanço RGB do seu monitor para corrigir qualquer dominante de cor.",
    ja: "モニターのRGBバランスコントロールを使用して色かぶりを修正します。",
    ko: "모니터의 RGB 밸런스 컨트롤을 사용하여 색상 오류를 수정하세요."
  },
  "TestPages.grayscale-test.title": {
    hi: "ग्रेस्केल टेस्ट",
    es: "Test de Escala de Grises",
    fr: "Test de Niveaux de Gris",
    de: "Graustufen-Test",
    pt: "Teste de Escala de Cinza",
    ja: "グレースケールテスト",
    ko: "그레이스케일 테스트"
  },
  "TestPages.hdr-capability-test.description_p1": {
    hi: "यह टूल आपके ब्राउज़र के API से पता लगाता है कि HDR और वाइड कलर गैमट समर्थित हैं या नहीं।",
    es: "Esta herramienta consulta las APIs de tu navegador para determinar si el Alto Rango Dinámico (HDR) y la Gama de Color Amplia son compatibles.",
    fr: "Cet outil interroge les API de votre navigateur pour déterminer si le Haut Dynamique (HDR) et la Gamme de Couleurs Étendue sont pris en charge.",
    de: "Dieses Tool fragt die APIs Ihres Browsers ab, um zu bestimmen, ob Hoher Dynamikbereich (HDR) und Wide Color Gamut unterstützt werden.",
    pt: "Esta ferramenta consulta as APIs do seu navegador para determinar se o Alto Alcance Dinâmico (HDR) e a Gama de Cor Ampla são suportados.",
    ja: "このツールはブラウザのAPIを照会して、ハイダイナミックレンジ（HDR）とワイドカラーガモットがサポートされているかどうかを確認します。",
    ko: "이 도구는 브라우저의 API를 쿼리하여 하이 다이나믹 레인지(HDR)와 와이드 컬러 게멋이 지원되는지 확인합니다."
  },
  "TestPages.hdr-capability-test.inst1": {
    hi: "ब्राउज़र द्वारा रिपोर्ट की गई क्षमताओं की समीक्षा करें।",
    es: "Revisa las capacidades reportadas por el navegador.",
    fr: "Examinez les capacités rapportées par le navigateur.",
    de: "Überprüfen Sie die vom Browser gemeldeten Fähigkeiten.",
    pt: "Revise as capacidades relatadas pelo navegador.",
    ja: "ブラウザが報告する機能を確認します。",
    ko: "브라우저가 보고하는 기능을 검토하세요."
  },
  "TestPages.hdr-capability-test.inst2": {
    hi: "यदि 'समर्थित नहीं' दिखता है लेकिन आपका मॉनिटर HDR-सक्षम है, तो Windows/macOS में HDR चालू करना सुनिश्चित करें।",
    es: "Si dice 'No Compatible' pero tu monitor admite HDR, asegúrate de que HDR esté activado en Windows/macOS.",
    fr: "Si c'est 'Non Pris en Charge' mais que votre moniteur est compatible HDR, assurez-vous que HDR est activé dans Windows/macOS.",
    de: "Wenn 'Nicht unterstützt' angezeigt wird, Ihr Monitor aber HDR-fähig ist, stellen Sie sicher, dass HDR in Windows/macOS aktiviert ist.",
    pt: "Se diz 'Não Suportado' mas seu monitor suporta HDR, certifique-se de que o HDR está ativado no Windows/macOS.",
    ja: "「サポートされていません」と表示されるがモニターがHDR対応の場合、Windows/macOSでHDRが有効になっていることを確認してください。",
    ko: "'지원되지 않음'이라고 표시되지만 모니터가 HDR 지원인 경우, Windows/macOS에서 HDR이 켜져 있는지 확인하세요."
  },
  "TestPages.hdr-capability-test.inst3": {
    hi: "सुनिश्चित करें कि आप हार्डवेयर त्वरण के साथ आधुनिक ब्राउज़र का उपयोग कर रहे हैं।",
    es: "Asegúrate de usar un navegador moderno con la aceleración de hardware habilitada.",
    fr: "Assurez-vous d'utiliser un navigateur moderne avec l'accélération matérielle activée.",
    de: "Stellen Sie sicher, dass Sie einen modernen Browser mit aktivierter Hardware-Beschleunigung verwenden.",
    pt: "Certifique-se de usar um navegador moderno com aceleração de hardware habilitada.",
    ja: "ハードウェアアクセラレーションが有効な最新のブラウザを使用していることを確認してください。",
    ko: "하드웨어 가속이 활성화된 최신 브라우저를 사용하고 있는지 확인하세요."
  },
  "TestPages.hdr-capability-test.title": {
    hi: "HDR क्षमता टेस्ट",
    es: "Test de Capacidad HDR",
    fr: "Test de Capacité HDR",
    de: "HDR-Fähigkeits-Test",
    pt: "Teste de Capacidade HDR",
    ja: "HDR能力テスト",
    ko: "HDR 기능 테스트"
  },
  "TestPages.motion-blur-test.description_p1": {
    hi: "आकलन करें कि बिना धुंधले या स्मीयरिंग विवरण के आपका मॉनिटर तेज गति को कितनी अच्छी तरह संभालता है।",
    es: "Evalúa qué tan bien tu monitor maneja el movimiento rápido sin desenfoque o deformación de detalles.",
    fr: "Évaluez à quel point votre moniteur gère le mouvement rapide sans flou ni étalement des détails.",
    de: "Bewerten Sie, wie gut Ihr Monitor schnelle Bewegungen ohne Unschärfe oder Verwischen von Details handhabt.",
    pt: "Avalie como seu monitor lida com o movimento rápido sem borrar ou manchar detalhes.",
    ja: "詳細をぼかしたり広げたりせずに、モニターが高速の動きをどれだけ上手く処理するかを評価します。",
    ko: "세부 사항을 흐리게 하거나 번지게 하지 않고 모니터가 빠른 동작을 얼마나 잘 처리하는지 평가합니다."
  },
  "TestPages.motion-blur-test.inst1": {
    hi: "चलती हुई ब्लॉकों को आंखों से ट्रैक करें।",
    es: "Sigue los bloques en movimiento con los ojos.",
    fr: "Suivez les blocs en mouvement avec vos yeux.",
    de: "Verfolgen Sie die sich bewegenden Blöcke mit Ihren Augen.",
    pt: "Siga os blocos em movimento com os olhos.",
    ja: "目で動くブロックを追跡します。",
    ko: "눈으로 움직이는 블록을 추적하세요."
  },
  "TestPages.motion-blur-test.inst2": {
    hi: "छोटे आंतरिक वर्ग को देखें। यदि किनारे पूरी तरह धुंधले हो जाते हैं, तो आपके मॉनिटर में धीमी पिक्सल प्रतिक्रिया है।",
    es: "Mira el pequeño cuadrado interior. Si los bordes se vuelven completamente borrosos, tu monitor tiene una respuesta de píxel lenta.",
    fr: "Regardez le petit carré intérieur. Si les bords deviennent complètement flous, votre moniteur a une réponse de pixel lente.",
    de: "Schauen Sie auf das kleine innere Quadrat. Wenn die Kanten vollständig verschwimmen, hat Ihr Monitor eine langsame Pixelantwort.",
    pt: "Olhe para o pequeno quadrado interior. Se as bordas ficarem completamente borradas, seu monitor tem resposta de pixel lenta.",
    ja: "小さな内側の正方形を見てください。端が完全にぼやける場合、モニターのピクセル応答が遅いです。",
    ko: "작은 내부 사각형을 보세요. 가장자리가 완전히 흐려지면 모니터의 픽셀 응답이 느린 것입니다."
  },
  "TestPages.motion-blur-test.inst3": {
    hi: "विभिन्न पैनल ओवरड्राइव परिदृश्यों के तहत परीक्षण करने के लिए गति और कंट्रास्ट एडजस्ट करें।",
    es: "Ajusta la velocidad y el contraste para probar bajo diferentes escenarios de sobreimpulso del panel.",
    fr: "Ajustez la vitesse et le contraste pour tester dans différents scénarios de surdrive du panneau.",
    de: "Passen Sie Geschwindigkeit und Kontrast an, um unter verschiedenen Panel-Overdrive-Szenarien zu testen.",
    pt: "Ajuste a velocidade e o contraste para testar em diferentes cenários de overdrive do painel.",
    ja: "さまざまなパネルオーバードライブシナリオでテストするために速度とコントラストを調整します。",
    ko: "다양한 패널 오버드라이브 시나리오에서 테스트하려면 속도와 대비를 조정하세요."
  },
  "TestPages.motion-blur-test.title": {
    hi: "मोशन ब्लर टेस्ट",
    es: "Test de Desenfoque de Movimiento",
    fr: "Test de Flou de Mouvement",
    de: "Bewegungsunschärfe-Test",
    pt: "Teste de Desfoque de Movimento",
    ja: "モーションブラーテスト",
    ko: "모션 블러 테스트"
  },
  "TestPages.saturation-test.description_p1": {
    hi: "यह परीक्षण एक निरंतर रंग स्पेक्ट्रम और प्राथमिक रंगों के लिए चरणबद्ध सैचुरेशन ब्लॉक प्रदर्शित करता है।",
    es: "Esta prueba muestra un espectro de color continuo y bloques de saturación escalonados para los colores primarios.",
    fr: "Ce test affiche un spectre de couleurs continu et des blocs de saturation par étapes pour les couleurs primaires.",
    de: "Dieser Test zeigt ein kontinuierliches Farbspektrum und gestufte Sättigungsblöcke für Grundfarben an.",
    pt: "Este teste exibe um espectro de cores contínuo e blocos de saturação em etapas para as cores primárias.",
    ja: "このテストは連続したカラースペクトルと原色の段階的な彩度ブロックを表示します。",
    ko: "이 테스트는 연속 색상 스펙트럼과 기본 색상에 대한 단계별 채도 블록을 표시합니다."
  },
  "TestPages.saturation-test.inst1": {
    hi: "स्पष्ट बैंडिंग या कठोर संक्रमण के लिए चिकने स्पेक्ट्रम की जांच करें।",
    es: "Comprueba el espectro suave en busca de un banding obvio o transiciones bruscas.",
    fr: "Vérifiez le spectre lisse pour un banding évident ou des transitions abruptes.",
    de: "Überprüfen Sie das gleichmäßige Spektrum auf offensichtliches Banding oder abrupte Übergänge.",
    pt: "Verifique o espectro suave para banding óbvio ou transições bruscas.",
    ja: "明らかなバンディングや急激な遷移がないか、滑らかなスペクトルを確認します。",
    ko: "매끄러운 스펙트럼에서 명백한 밴딩이나 급격한 전환을 확인합니다."
  },
  "TestPages.saturation-test.inst2": {
    hi: "ब्लॉकों के बीच अलग अंतर सुनिश्चित करने के लिए अलग-अलग सैचुरेशन चरणों को देखें।",
    es: "Mira los pasos de saturación individuales para asegurarte de que hay diferencias distintas entre los bloques.",
    fr: "Regardez les étapes de saturation individuelles pour vous assurer qu'il y a des différences distinctes entre les blocs.",
    de: "Schauen Sie sich die einzelnen Sättigungsschritte an, um sicherzustellen, dass es deutliche Unterschiede zwischen den Blöcken gibt.",
    pt: "Observe os passos de saturação individuais para garantir diferenças distintas entre os blocos.",
    ja: "ブロック間に明確な差があることを確認するために、個々の彩度ステップを確認します。",
    ko: "블록 간에 뚜렷한 차이가 있는지 확인하기 위해 개별 채도 단계를 살펴보세요."
  },
  "TestPages.saturation-test.inst3": {
    hi: "यदि रंग धुले हुए या अत्यधिक नियॉन दिखते हैं तो अपने मॉनिटर की सैचुरेशन/वाइब्रेंसी सेटिंग एडजस्ट करें।",
    es: "Ajusta los ajustes de saturación/vibrancia de tu monitor si los colores parecen deslavados o demasiado neón.",
    fr: "Ajustez les paramètres de saturation/vibrance de votre moniteur si les couleurs semblent ternes ou trop néon.",
    de: "Passen Sie die Sättigungs-/Vibrance-Einstellungen Ihres Monitors an, wenn Farben ausgewaschen oder zu neon wirken.",
    pt: "Ajuste as configurações de saturação/vibrance do seu monitor se as cores parecerem desbotadas ou excessivamente neon.",
    ja: "色が薄く見えるかネオンすぎる場合は、モニターの彩度/ビブランス設定を調整します。",
    ko: "색상이 흐리거나 너무 형광색으로 보이면 모니터의 채도/선명도 설정을 조정하세요."
  },
  "TestPages.saturation-test.title": {
    hi: "सैचुरेशन टेस्ट",
    es: "Test de Saturación",
    fr: "Test de Saturation",
    de: "Sättigungs-Test",
    pt: "Teste de Saturação",
    ja: "彩度テスト",
    ko: "채도 테스트"
  },
  "TestPages.stuck-pixel-test.description_p1": {
    hi: "एक डेड पिक्सल (जो स्थायी रूप से काला है) के विपरीत, एक <strong>स्टक पिक्सल</strong> एक एकल सबपिक्सल है जो हमेशा चालू रहता है।",
    es: "A diferencia de un píxel muerto (que es permanentemente negro), un <strong>píxel atascado</strong> es un único subpíxel que siempre está encendido.",
    fr: "Contrairement à un pixel mort (qui est en permanence noir), un <strong>pixel coincé</strong> est un unique sous-pixel qui reste toujours allumé.",
    de: "Im Gegensatz zu einem toten Pixel (der dauerhaft schwarz ist) ist ein <strong>feststeckender Pixel</strong> ein einzelner Subpixel, der immer eingeschaltet ist.",
    pt: "Ao contrário de um pixel morto (que é permanentemente preto), um <strong>pixel preso</strong> é um único subpixel que está sempre ligado.",
    ja: "デッドピクセル（恒久的に黒）とは異なり、<strong>固着ピクセル</strong>は常にオンになっている単一のサブピクセルです。",
    ko: "불량 픽셀(영구적으로 검정)과 달리, <strong>고착 픽셀</strong>은 항상 켜져 있는 단일 서브픽셀입니다."
  },
  "TestPages.stuck-pixel-test.title": {
    hi: "स्टक पिक्सल फिक्सर और टेस्ट",
    es: "Reparador y Test de Píxeles Atascados",
    fr: "Réparateur et Test de Pixels Coincés",
    de: "Feststeckende-Pixel-Reparatur & Test",
    pt: "Reparador e Teste de Pixels Presos",
    ja: "固着ピクセル修正 & テスト",
    ko: "고착 픽셀 수리 및 테스트"
  },
  "TestPages.uniformity-test.description_p1": {
    hi: "यह परीक्षण बैकलाइट ब्लीडिंग, किनारे के कालेपन और DSE की पहचान करने में मदद के लिए चरणबद्ध ग्रेस्केल बैकग्राउंड प्रदर्शित करता है।",
    es: "Esta prueba muestra fondos de escala de grises escalonados para ayudar a identificar el sangrado de retroiluminación, el oscurecimiento de bordes y el DSE.",
    fr: "Ce test affiche des fonds de niveaux de gris échelonnés pour aider à identifier le saignement de rétroéclairage, l'assombrissement des bords et le DSE.",
    de: "Dieser Test zeigt abgestufte Graustufen-Hintergründe an, um Hintergrundlicht-Bleed, Randverdunkelung und DSE zu identifizieren.",
    pt: "Este teste exibe fundos de escala de cinza em etapas para ajudar a identificar o sangramento de retroiluminação, escurecimento de bordas e DSE.",
    ja: "このテストは、バックライトブリード、エッジの暗化、DSEを識別するのに役立てるために、段階的なグレースケール背景を表示します。",
    ko: "이 테스트는 백라이트 번짐, 가장자리 어두워짐 및 DSE를 식별하는 데 도움이 되는 단계별 그레이스케일 배경을 표시합니다."
  },
  "TestPages.uniformity-test.title": {
    hi: "स्क्रीन यूनिफॉर्मिटी और DSE टेस्ट",
    es: "Test de Uniformidad de Pantalla y DSE",
    fr: "Test d'Uniformité d'Écran et DSE",
    de: "Bildschirm-Uniformitäts & DSE-Test",
    pt: "Teste de Uniformidade de Tela e DSE",
    ja: "スクリーンの均一性 & DSEテスト",
    ko: "화면 균일성 및 DSE 테스트"
  },
  "TestPages.white-level-test.description_p1": {
    hi: "यह परीक्षण आपके मॉनिटर के व्हाइट लेवल (कंट्रास्ट) सेटिंग को कॉन्फ़िगर करने में मदद करता है। यह अत्यंत चमकीले ग्रे ब्लॉक प्रदर्शित करता है।",
    es: "Esta prueba te ayuda a configurar el ajuste de nivel de blanco (contraste) de tu monitor. Muestra bloques de gris extremadamente brillantes.",
    fr: "Ce test vous aide à configurer le réglage du niveau de blanc (contraste) de votre moniteur. Il affiche des blocs de gris extrêmement lumineux.",
    de: "Dieser Test hilft Ihnen, die Weißwert-(Kontrast-)Einstellung Ihres Monitors zu konfigurieren. Er zeigt extrem helle Grau-Blöcke an.",
    pt: "Este teste ajuda a configurar o ajuste de nível de branco (contraste) do seu monitor. Exibe blocos de cinza extremamente brilhantes.",
    ja: "このテストは、モニターのホワイトレベル（コントラスト）設定を構成するのに役立ちます。非常に明るいグレーのブロックを表示します。",
    ko: "이 테스트는 모니터의 화이트 레벨(대비) 설정을 구성하는 데 도움이 됩니다. 매우 밝은 회색 블록을 표시합니다."
  },
  "TestPages.white-level-test.inst1": {
    hi: "अपने मॉनिटर की 'कंट्रास्ट' सेटिंग को तब तक एडजस्ट करें जब तक आप शुद्ध सफेद बैकग्राउंड से ब्लॉक 254 को अलग कर सकें।",
    es: "Ajusta el ajuste de 'Contraste' de tu monitor hasta que puedas distinguir el bloque 254 del fondo blanco puro.",
    fr: "Ajustez le réglage 'Contraste' de votre moniteur jusqu'à ce que vous puissiez distinguer le bloc 254 du fond blanc pur.",
    de: "Stellen Sie die 'Kontrast'-Einstellung Ihres Monitors ein, bis Sie Block 254 vom reinen weißen Hintergrund unterscheiden können.",
    pt: "Ajuste o ajuste de 'Contraste' do seu monitor até conseguir distinguir o bloco 254 do fundo branco puro.",
    ja: "純粋な白の背景からブロック254を区別できるまで、モニターの「コントラスト」設定を調整します。",
    ko: "순수한 흰색 배경에서 블록 254를 구별할 수 있을 때까지 모니터의 '대비' 설정을 조정하세요."
  },
  "TestPages.white-level-test.inst2": {
    hi: "यदि ब्लॉक 250-254 बैकग्राउंड के समान दिखते हैं, तो आपके सफेद रंग क्लिप हो रहे हैं।",
    es: "Si los bloques 250-254 parecen idénticos al fondo, tus blancos están siendo recortados.",
    fr: "Si les blocs 250-254 semblent identiques au fond, vos blancs sont en train d'être recoupés.",
    de: "Wenn die Blöcke 250-254 identisch mit dem Hintergrund aussehen, werden Ihre Weiß-Töne abgeschnitten.",
    pt: "Se os blocos 250-254 parecerem idênticos ao fundo, seus brancos estão sendo cortados.",
    ja: "ブロック250-254が背景と同一に見える場合、白がクリッピングされています。",
    ko: "블록 250-254가 배경과 동일하게 보이면 화이트가 클리핑되고 있습니다."
  },
  "TestPages.white-level-test.inst3": {
    hi: "कंट्रास्ट को इतना अधिक न बढ़ाएं कि उज्ज्वल विवरण खो जाएं।",
    es: "No establezcas el contraste tan alto que se pierdan los detalles brillantes.",
    fr: "Ne réglez pas le contraste si haut que les détails lumineux soient perdus.",
    de: "Stellen Sie den Kontrast nicht so hoch ein, dass helle Details verloren gehen.",
    pt: "Não defina o contraste tão alto que os detalhes brilhantes sejam perdidos.",
    ja: "明るい詳細が失われるほどコントラストを高く設定しないでください。",
    ko: "밝은 디테일이 손실될 만큼 대비를 높이지 마세요."
  },
  "TestPages.white-level-test.title": {
    hi: "व्हाइट लेवल टेस्ट",
    es: "Test de Nivel de Blanco",
    fr: "Test de Niveau de Blanc",
    de: "Weißwert-Test",
    pt: "Teste de Nível de Branco",
    ja: "ホワイトレベルテスト",
    ko: "화이트 레벨 테스트"
  },

  // ── TestWrapper ──────────────────────────────────────────
  "TestWrapper.addNote": {
    hi: "+ नोट",
    es: "+ Nota",
    fr: "+ Note",
    de: "+ Notiz",
    pt: "+ Nota",
    ja: "+ メモ",
    ko: "+ 메모"
  },
  "TestWrapper.pixelDefect.relativePos": {
    hi: "सापेक्ष स्थिति:",
    es: "Posición Relativa:",
    fr: "Position Relative:",
    de: "Relative Position:",
    pt: "Posição Relativa:",
    ja: "相対位置:",
    ko: "상대적 위치:"
  },

  // ── Tests ────────────────────────────────────────────────
  "Tests.blooming.instructions": {
    hi: "चमकीले वर्ग के आसपास हेलो देखें।",
    es: "Busca halos alrededor del cuadrado brillante.",
    fr: "Recherchez des halos autour du carré brillant.",
    de: "Suchen Sie nach Halos um das helle Quadrat.",
    pt: "Procure por halos ao redor do quadrado brilhante.",
    ja: "明るい正方形の周りのハロを探します。",
    ko: "밝은 사각형 주위의 헤일로를 확인합니다."
  },
  "Tests.burnIn.instructions": {
    hi: "स्थिर तत्वों की धुंधली रूपरेखा देखें।",
    es: "Busca contornos tenues de elementos estáticos.",
    fr: "Recherchez de faint contours d'éléments statiques.",
    de: "Suchen Sie nach blassen Umrissen statischer Elemente.",
    pt: "Procure por contornos tênues de elementos estáticos.",
    ja: "静的要素のかすかな輪郭を探します。",
    ko: "정적 요소의 희미한 윤곽을 확인합니다."
  },
  "Tests.colorAccuracy.instructions": {
    hi: "स्किन टोन और प्राकृतिक रंगों की जांच करें।",
    es: "Verifica los tonos de piel y los colores naturales.",
    fr: "Vérifiez les teintes de peau et les couleurs naturelles.",
    de: "Überprüfen Sie Hauttöne und natürliche Farben.",
    pt: "Verifique tons de pele e cores naturais.",
    ja: "肌のトーンと自然な色を確認します。",
    ko: "피부 톤과 자연스러운 색상을 확인합니다."
  },
  "Tests.colorBanding.instructions": {
    hi: "चिकने संक्रमण देखें।",
    es: "Busca transiciones suaves.",
    fr: "Recherchez des transitions douces.",
    de: "Suchen Sie nach glatten Übergängen.",
    pt: "Procure por transições suaves.",
    ja: "滑らかなトランジションを探します。",
    ko: "부드러운 전환을 확인합니다."
  },
  "Tests.colorGamut.instructions": {
    hi: "जांचें कि केंद्र के रंग बाहरी रिंग से मेल खाते हैं या मिलते हैं।",
    es: "Comprueba si los colores del centro coinciden o se fusionan con el anillo exterior.",
    fr: "Vérifiez si les couleurs au centre correspondent ou se fondent avec l'anneau extérieur.",
    de: "Überprüfen Sie, ob die Farben in der Mitte mit dem äußeren Ring übereinstimmen oder ineinander übergehen.",
    pt: "Verifique se as cores no centro correspondem ou se misturam com o anel externo.",
    ja: "中央の色が外側のリングと一致するかブレンドするか確認します。",
    ko: "중앙의 색상이 외부 링과 일치하거나 혼합되는지 확인합니다."
  },
  "Tests.flicker.instructions": {
    hi: "उच्च शटर गति पर कैमरे का उपयोग करें।",
    es: "Usa una cámara a alta velocidad de obturación.",
    fr: "Utilisez un appareil photo à vitesse d'obturation élevée.",
    de: "Verwenden Sie eine Kamera mit hoher Verschlusszeit.",
    pt: "Use uma câmera com alta velocidade de obturação.",
    ja: "高シャッタースピードのカメラを使用します。",
    ko: "높은 셔터 속도의 카메라를 사용하세요."
  },
  "Tests.screenTearing.instructions": {
    hi: "गति के दौरान क्षैतिज टियरिंग देखें।",
    es: "Observa la barra en movimiento en busca de desgarro horizontal.",
    fr: "Observez la barre en mouvement pour un déchirement horizontal.",
    de: "Beobachten Sie die sich bewegende Leiste auf horizontales Tearing.",
    pt: "Observe a barra em movimento para tearing horizontal.",
    ja: "移動するバーを水平ティアリングがないか観察します。",
    ko: "움직이는 막대에서 수평 티어링을 확인합니다."
  },
  "Tests.sharpness.instructions": {
    hi: "रंग फ्रिंजिंग की जांच करें।",
    es: "Comprueba la presencia de franjas de color.",
    fr: "Vérifiez la présence de franges de couleur.",
    de: "Überprüfen Sie auf Farbsaum.",
    pt: "Verifique por franjas de cor.",
    ja: "色フリンジを確認します。",
    ko: "색상 프린지를 확인합니다."
  },
  "Tests.solidColor.instructions": {
    hi: "असमानता देखें।",
    es: "Busca irregularidades.",
    fr: "Recherchez des irrégularités.",
    de: "Suchen Sie nach Ungleichmäßigkeiten.",
    pt: "Procure por irregularidades.",
    ja: "不均一性を探します。",
    ko: "불균일성을 확인합니다."
  },
  "Tests.touchScreen.instructions": {
    hi: "डेड ज़ोन की जांच के लिए स्क्रीन पर हर जगह ड्रा करें।",
    es: "Dibuja por toda la pantalla para comprobar si hay zonas muertas.",
    fr: "Dessinez partout sur l'écran pour vérifier les zones mortes.",
    de: "Zeichnen Sie überall auf dem Bildschirm, um tote Zonen zu überprüfen.",
    pt: "Desenhe por toda a tela para verificar zonas mortas.",
    ja: "デッドゾーンを確認するために画面全体に描きます。",
    ko: "데드 존을 확인하기 위해 화면 전체에 그려보세요."
  },
  "Tests.viewingAngle.instructions": {
    hi: "चरम कोणों से स्क्रीन देखें।",
    es: "Mira la pantalla desde ángulos extremos.",
    fr: "Regardez l'écran depuis des angles extrêmes.",
    de: "Betrachten Sie den Bildschirm aus extremen Winkeln.",
    pt: "Veja a tela de ângulos extremos.",
    ja: "極端な角度から画面を見ます。",
    ko: "극단적인 각도에서 화면을 봅니다."
  },

  // ── Tests resolution-checker ─────────────────────────────
  "Tests.resolution-checker.disclaimer": {
    hi: "ब्राउज़र द्वारा रिपोर्ट की गई जानकारी वह दर्शाती है जो आपका ब्राउज़र देख सकता है। यह मॉनिटर के भौतिक स्पेक्स की जगह नहीं लेती।",
    es: "La información reportada por el navegador describe lo que tu navegador puede ver. No reemplaza las especificaciones físicas del monitor.",
    fr: "Les informations rapportées par le navigateur décrivent ce que votre navigateur peut voir. Elles ne remplacent pas les spécifications physiques du moniteur.",
    de: "Vom Browser gemeldete Informationen beschreiben das, was Ihr Browser sehen kann. Sie ersetzen nicht die physischen Spezifikationen des Monitors.",
    pt: "As informações relatadas pelo navegador descrevem o que seu navegador pode ver. Não substituem as especificações físicas do monitor.",
    ja: "ブラウザが報告する情報は、ブラウザが見えるものを説明します。モニターの物理的なスペックの代わりにはなりません。",
    ko: "브라우저가 보고하는 정보는 브라우저가 볼 수 있는 것을 설명합니다. 모니터의 물리적 사양을 대체하지 않습니다."
  },
  "Tests.resolution-checker.explain.dprDesc": {
    hi: "DPR बताता है कि एक CSS पिक्सल को कितने भौतिक डिवाइस पिक्सल से बनाया जाता है। DPR 2 का मतलब है 10x10 CSS पिक्सल = 20x20 भौतिक पिक्सल।",
    es: "DPR es cuántos píxeles físicos del dispositivo se usan para dibujar un solo píxel CSS. Un DPR de 2 significa que 10x10 píxeles CSS = 20x20 píxeles físicos.",
    fr: "DPR est le nombre de pixels physiques de l'appareil utilisés pour dessiner un seul pixel CSS. Un DPR de 2 signifie que 10x10 pixels CSS = 20x20 pixels physiques.",
    de: "DPR gibt an, wie viele physische Gerätepixel verwendet werden, um einen einzelnen CSS-Pixel zu zeichnen. Ein DPR von 2 bedeutet 10x10 CSS-Pixel = 20x20 physische Pixel.",
    pt: "DPR é quantos pixels físicos do dispositivo são usados para desenhar um único pixel CSS. Um DPR de 2 significa que 10x10 pixels CSS = 20x20 pixels físicos.",
    ja: "DPRは1つのCSSピクセルを描くために使用される物理デバイスピクセルの数です。DPR2は10x10 CSSピクセル = 20x20物理ピクセルを意味します。",
    ko: "DPR은 단일 CSS 픽셀을 그리는 데 사용되는 물리적 장치 픽셀의 수입니다. DPR 2는 10x10 CSS 픽셀 = 20x20 물리적 픽셀을 의미합니다."
  },
  "Tests.resolution-checker.explain.dprTitle": {
    hi: "डिवाइस पिक्सल अनुपात (DPR) क्या है?",
    es: "¿Qué es la Relación de Píxeles del Dispositivo (DPR)?",
    fr: "Qu'est-ce que le Rapport de Pixels de l'Appareil (DPR)?",
    de: "Was ist das Gerätepixelverhältnis (DPR)?",
    pt: "O que é a Proporção de Pixels do Dispositivo (DPR)?",
    ja: "デバイスピクセル比 (DPR) とは何ですか？",
    ko: "기기 픽셀 비율(DPR)이란 무엇입니까?"
  },
  "Tests.resolution-checker.explain.logicalResDesc": {
    hi: "CSS रिज़ॉल्यूशन भी कहा जाता है, यह वह ग्रिड है जिसका उपयोग आपका ब्राउज़र सामग्री को रेंडर करने के लिए करता है। OS स्केलिंग और ब्राउज़र ज़ूम इसे प्रभावित करते हैं।",
    es: "También llamada resolución CSS, es la cuadrícula que usa tu navegador para renderizar contenido. La escala del OS y el zoom del navegador la afectan.",
    fr: "Aussi appelée résolution CSS, c'est la grille que votre navigateur utilise pour afficher le contenu. La mise à l'échelle du système d'exploitation et le zoom du navigateur l'affectent.",
    de: "Auch als CSS-Auflösung bezeichnet, ist dies das Raster, das Ihr Browser zum Rendern von Inhalten verwendet. OS-Skalierung und Browser-Zoom beeinflussen sie.",
    pt: "Também chamada de resolução CSS, é a grade que seu navegador usa para renderizar conteúdo. A escala do SO e o zoom do navegador a afetam.",
    ja: "CSS解像度とも呼ばれ、ブラウザがコンテンツをレンダリングするために使用するグリッドです。OSのスケーリングとブラウザのズームが影響します。",
    ko: "CSS 해상도라고도 하며, 브라우저가 콘텐츠를 렌더링하는 데 사용하는 그리드입니다. OS 배율과 브라우저 확대/축소가 영향을 미칩니다."
  },
  "Tests.resolution-checker.explain.logicalResTitle": {
    hi: "तार्किक रिज़ॉल्यूशन क्या है?",
    es: "¿Qué es la resolución lógica?",
    fr: "Qu'est-ce que la résolution logique?",
    de: "Was ist die logische Auflösung?",
    pt: "O que é a resolução lógica?",
    ja: "論理解像度とは何ですか？",
    ko: "논리 해상도란 무엇입니까?"
  },
  "Tests.resolution-checker.explain.physicalResDesc": {
    hi: "आपके डिस्प्ले पैनल में बना भौतिक पिक्सल ग्रिड। गैर-नेटिव रिज़ॉल्यूशन पर चलाने में स्केलिंग शामिल होती है।",
    es: "La cuadrícula de píxeles físicos integrada en tu panel de pantalla. Ejecutar a resoluciones no nativas implica escalado.",
    fr: "La grille de pixels physiques intégrée dans votre panneau d'affichage. L'exécution à des résolutions non natives implique un redimensionnement.",
    de: "Das physische Pixelraster, das in Ihrem Display-Panel integriert ist. Beim Betrieb mit Nicht-nativen Auflösungen ist Skalierung erforderlich.",
    pt: "A grade de pixels físicos integrada no seu painel de tela. Executar em resoluções não nativas envolve escalonamento.",
    ja: "ディスプレイパネルに組み込まれた物理ピクセルグリッドです。ネイティブでない解像度で実行するとスケーリングが必要です。",
    ko: "디스플레이 패널에 내장된 물리적 픽셀 그리드입니다. 비원시 해상도로 실행하면 스케일링이 포함됩니다."
  },
  "Tests.resolution-checker.explain.physicalResTitle": {
    hi: "नेटिव रिज़ॉल्यूशन क्या है?",
    es: "¿Qué es la resolución nativa?",
    fr: "Qu'est-ce que la résolution native?",
    de: "Was ist die native Auflösung?",
    pt: "O que é a resolução nativa?",
    ja: "ネイティブ解像度とは何ですか？",
    ko: "기본 해상도란 무엇입니까?"
  },
  "Tests.resolution-checker.explain.ppiDesc": {
    hi: "पिक्सल घनत्व (PPI) बताता है कि डिस्प्ले के प्रत्येक इंच में कितने पिक्सल पैक किए गए हैं। उच्च PPI = तीखा पाठ।",
    es: "La densidad de píxeles (PPI) describe cuántos píxeles se empaquetan en cada pulgada de la pantalla. Mayor PPI = texto más nítido.",
    fr: "La densité de pixels (PPI) décrit combien de pixels sont regroupés dans chaque pouce de l'écran. Un PPI plus élevé = un texte plus net.",
    de: "Die Pixeldichte (PPI) beschreibt, wie viele Pixel in jeden Zoll des Displays gepackt sind. Höherer PPI = schärferer Text.",
    pt: "A densidade de pixels (PPI) descreve quantos pixels são compactados em cada polegada da tela. PPI mais alto = texto mais nítido.",
    ja: "ピクセル密度（PPI）は、ディスプレイの各インチにパックされているピクセルの数を示します。高いPPI = 鋭いテキスト。",
    ko: "픽셀 밀도(PPI)는 디스플레이의 각 인치에 압축된 픽셀 수를 설명합니다. 높은 PPI = 더 선명한 텍스트."
  },
  "Tests.resolution-checker.explain.ppiTitle": {
    hi: "पिक्सल घनत्व क्या है?",
    es: "¿Qué es la densidad de píxeles?",
    fr: "Qu'est-ce que la densité de pixels?",
    de: "Was ist die Pixeldichte?",
    pt: "O que é a densidade de pixels?",
    ja: "ピクセル密度とは何ですか？",
    ko: "픽셀 밀도란 무엇입니까?"
  },
  "Tests.resolution-checker.explain.refreshDesc": {
    hi: "उच्च रिज़ॉल्यूशन रेंडरिंग वर्कलोड बढ़ाता है। उच्च रिफ्रेश रेट फ्रेम डिलीवरी आवश्यकताएं बढ़ाता है।",
    es: "Una mayor resolución aumenta la carga de trabajo de renderización. Una mayor tasa de actualización aumenta los requisitos de entrega de fotogramas.",
    fr: "Une résolution plus élevée augmente la charge de travail de rendu. Une fréquence de rafraîchissement plus élevée augmente les exigences de livraison de trames.",
    de: "Höhere Auflösung erhöht die Rendering-Arbeitslast. Höhere Bildwiederholrate erhöht die Frame-Bereitstellungsanforderungen.",
    pt: "Maior resolução aumenta a carga de trabalho de renderização. Taxa de atualização mais alta aumenta os requisitos de entrega de frames.",
    ja: "解像度が高いとレンダリングの負荷が増えます。リフレッシュレートが高いとフレーム配信の要件が増えます。",
    ko: "해상도가 높을수록 렌더링 작업 부하가 증가합니다. 재생률이 높을수록 프레임 전달 요구 사항이 증가합니다."
  },
  "Tests.resolution-checker.explain.refreshTitle": {
    hi: "रिज़ॉल्यूशन बनाम रिफ्रेश रेट",
    es: "Resolución vs Tasa de Actualización",
    fr: "Résolution vs Taux de Rafraîchissement",
    de: "Auflösung vs. Bildwiederholrate",
    pt: "Resolução vs Taxa de Atualização",
    ja: "解像度とリフレッシュレート",
    ko: "해상도 대 재생률"
  },
  "Tests.resolution-checker.explain.title": {
    hi: "इसका मतलब क्या है?",
    es: "¿QUÉ SIGNIFICA ESTO?",
    fr: "QUE SIGNIFIE CELA?",
    de: "WAS BEDEUTET DAS?",
    pt: "O QUE ISSO SIGNIFICA?",
    ja: "これはどういう意味ですか？",
    ko: "이것은 무엇을 의미합니까?"
  },
  "Tests.resolution-checker.faq.a1": {
    hi: "हमेशा नहीं। ब्राउज़र OS द्वारा प्रदान की गई तार्किक रिज़ॉल्यूशन और स्केलिंग फ़ैक्टर देखते हैं।",
    es: "No de manera confiable. Los navegadores ven la resolución lógica y el factor de escala proporcionados por el sistema operativo.",
    fr: "Pas de manière fiable. Les navigateurs voient la résolution logique et le facteur d'échelle fournis par le système d'exploitation.",
    de: "Nicht zuverlässig. Browser sehen die logische Auflösung und den Skalierungsfaktor, den das Betriebssystem bereitstellt.",
    pt: "Não de forma confiável. Os navegadores veem a resolução lógica e o fator de escala fornecidos pelo sistema operacional.",
    ja: "確実ではありません。ブラウザはOSが提供する論理解像度とスケーリングファクターを見ます。",
    ko: "확실하지 않습니다. 브라우저는 OS가 제공하는 논리 해상도와 배율 인수를 봅니다."
  },
  "Tests.resolution-checker.faq.a2": {
    hi: "यह Windows लैपटॉप (जैसे 125% या 150% स्केलिंग) पर सामान्य है जो उच्च-DPI स्क्रीन पर टेक्स्ट को पठनीय बनाने के लिए है।",
    es: "Esto es común en las laptops con Windows (por ejemplo, escala del 125% o 150%) para que el texto sea legible en pantallas de alta resolución.",
    fr: "C'est courant sur les ordinateurs portables Windows (par exemple, une mise à l'échelle de 125% ou 150%) pour rendre le texte lisible sur les écrans à haute densité.",
    de: "Dies ist auf Windows-Laptops üblich (z.B. 125% oder 150% Skalierung), um Text auf hochauflösenden Bildschirmen lesbar zu machen.",
    pt: "Isso é comum em laptops com Windows (por exemplo, escala de 125% ou 150%) para tornar o texto legível em telas de alta DPI.",
    ja: "これはWindowsノートPC（例えば125%や150%のスケーリング）でよく見られ、高DPI画面でテキストを読みやすくするためです。",
    ko: "이는 Windows 노트북(예: 125% 또는 150% 배율)에서 일반적으로 고DPI 화면에서 텍스트를 읽기 쉽게 만들기 위한 것입니다."
  },
  "Tests.resolution-checker.faq.a3": {
    hi: "ब्राउज़र फ्रेम टाइमिंग सिस्टम लोड, पावर सेविंग, बैकग्राउंड टैब और ब्राउज़र व्यवहार से प्रभावित होती है।",
    es: "El tiempo de cuadros del navegador se ve afectado por la carga del sistema, el ahorro de energía, las pestañas en segundo plano y el comportamiento del navegador.",
    fr: "Le timing des images du navigateur est affecté par la charge du système, la mise en veille, les onglets en arrière-plan et le comportement du navigateur.",
    de: "Browser-Frame-Timing wird durch Systemlast, Energiesparmodus, Hintergrund-Tabs und Browser-Verhalten beeinflusst.",
    pt: "O tempo de quadros do navegador é afetado pela carga do sistema, economia de energia, abas em segundo plano e comportamento do navegador.",
    ja: "ブラウザフレームタイミングは、システム負荷、省電力、バックグラウンドタブ、ブラウザの動作によって影響を受けます。",
    ko: "브라우저 프레임 타이밍은 시스템 부하, 절전, 백그라운드 탭 및 브라우저 동작에 영향을 받습니다."
  },
  "Tests.resolution-checker.faq.q1": {
    hi: "क्या ब्राउज़र मेरे मॉनिटर का वास्तविक भौतिक रिज़ॉल्यूशन पहचान सकता है?",
    es: "¿Puede un navegador detectar la verdadera resolución física de mi monitor?",
    fr: "Un navigateur peut-il détecter la véritable résolution physique de mon moniteur?",
    de: "Kann ein Browser die wahre physische Auflösung meines Monitors erkennen?",
    pt: "Um navegador pode detectar a verdadeira resolução física do meu monitor?",
    ja: "ブラウザはモニターの真の物理解像度を検出できますか？",
    ko: "브라우저가 모니터의 실제 물리적 해상도를 감지할 수 있습니까?"
  },
  "Tests.resolution-checker.faq.q2": {
    hi: "मेरा DPR 1.25 या 1.5 क्यों है?",
    es: "¿Por qué mi DPR es 1.25 o 1.5?",
    fr: "Pourquoi mon DPR est-il de 1,25 ou 1,5?",
    de: "Warum ist mein DPR 1.25 oder 1.5?",
    pt: "Por que meu DPR é 1,25 ou 1,5?",
    ja: "なぜ私のDPRは1.25または1.5ですか？",
    ko: "내 DPR이 1.25 또는 1.5인 이유는 무엇입니까?"
  },
  "Tests.resolution-checker.faq.q3": {
    hi: "मेरा देखा गया फ्रेम टाइमिंग मेरे मॉनिटर की रिफ्रेश रेट से अलग क्यों है?",
    es: "¿Por qué mi tiempo de cuadros observado es diferente de la tasa de actualización de mi monitor?",
    fr: "Pourquoi mon timing de cadre observé est-il différent de la fréquence de rafraîchissement de mon moniteur?",
    de: "Warum weicht mein beobachtetes Frame-Timing von der Bildwiederholrate meines Monitors ab?",
    pt: "Por que meu tempo de quadro observado é diferente da taxa de atualização do meu monitor?",
    ja: "なぜ観測されたフレームタイミングがモニターのリフレッシュレートと異なるのですか？",
    ko: "관측된 프레임 타이밍이 모니터의 재생률과 다른 이유는 무엇입니까?"
  },
  "Tests.resolution-checker.labels.aspectRatio": {
    hi: "आस्पेक्ट रेशियो",
    es: "Relación de Aspecto",
    fr: "Rapport d'Aspect",
    de: "Seitenverhältnis",
    pt: "Proporção de Aspecto",
    ja: "アスペクト比",
    ko: "화면 비율"
  },
  "Tests.resolution-checker.labels.availArea": {
    hi: "उपलब्ध स्क्रीन क्षेत्र",
    es: "Área de Pantalla Disponible",
    fr: "Zone d'Écran Disponible",
    de: "Verfügbarer Bildschirmbereich",
    pt: "Área de Tela Disponível",
    ja: "利用可能な画面領域",
    ko: "사용 가능한 화면 영역"
  },
  "Tests.resolution-checker.labels.classification": {
    hi: "वर्गीकरण",
    es: "Clasificación",
    fr: "Classification",
    de: "Klassifizierung",
    pt: "Classificação",
    ja: "分類",
    ko: "분류"
  },
  "Tests.resolution-checker.labels.colorDepth": {
    hi: "रंग गहराई",
    es: "Profundidad de Color",
    fr: "Profondeur de Couleur",
    de: "Farbtiefe",
    pt: "Profundidade de Cor",
    ja: "色深度",
    ko: "색 깊이"
  },
  "Tests.resolution-checker.labels.colorSpace": {
    hi: "रंग गैमट",
    es: "Gama de Color",
    fr: "Gamme de Couleurs",
    de: "Farbraum",
    pt: "Gama de Cor",
    ja: "カラーガモット",
    ko: "색 영역"
  },
  "Tests.resolution-checker.labels.dpr": {
    hi: "डिवाइस पिक्सल अनुपात",
    es: "Relación de Píxeles del Dispositivo",
    fr: "Rapport de Pixels de l'Appareil",
    de: "Gerätepixelverhältnis",
    pt: "Proporção de Pixels do Dispositivo",
    ja: "デバイスピクセル比",
    ko: "기기 픽셀 비율"
  },
  "Tests.resolution-checker.labels.hdr": {
    hi: "HDR क्षमता",
    es: "Capacidad HDR",
    fr: "Capacité HDR",
    de: "HDR-Fähigkeit",
    pt: "Capacidade HDR",
    ja: "HDR能力",
    ko: "HDR 기능"
  },
  "Tests.resolution-checker.labels.logicalRes": {
    hi: "तार्किक रिज़ॉल्यूशन",
    es: "Resolución Lógica",
    fr: "Résolution Logique",
    de: "Logische Auflösung",
    pt: "Resolução Lógica",
    ja: "論理解像度",
    ko: "논리 해상도"
  },
  "Tests.resolution-checker.labels.orientation": {
    hi: "ओरिएंटेशन",
    es: "Orientación",
    fr: "Orientation",
    de: "Ausrichtung",
    pt: "Orientação",
    ja: "向き",
    ko: "방향"
  },
  "Tests.resolution-checker.labels.pixelDepth": {
    hi: "पिक्सल गहराई",
    es: "Profundidad de Píxel",
    fr: "Profondeur de Pixel",
    de: "Pixeltiefe",
    pt: "Profundidade de Pixel",
    ja: "ピクセル深度",
    ko: "픽셀 깊이"
  },
  "Tests.resolution-checker.labels.refreshRate": {
    hi: "देखा गया फ्रेम टाइमिंग",
    es: "Tiempo de Cuadro Observado",
    fr: "Temps de Cadre Observé",
    de: "Beobachtetes Frame-Timing",
    pt: "Tempo de Quadro Observado",
    ja: "観測フレームタイミング",
    ko: "관측된 프레임 타이밍"
  },
  "Tests.resolution-checker.labels.totalPixels": {
    hi: "कुल पिक्सल",
    es: "Total de Píxeles",
    fr: "Total de Pixels",
    de: "Gesamtpixel",
    pt: "Total de Pixels",
    ja: "総ピクセル数",
    ko: "총 픽셀"
  },
  "Tests.resolution-checker.labels.touchSupport": {
    hi: "टच समर्थन",
    es: "Soporte Táctil",
    fr: "Support Tactile",
    de: "Touch-Unterstützung",
    pt: "Suporte Touch",
    ja: "タッチサポート",
    ko: "터치 지원"
  },
  "Tests.resolution-checker.labels.viewport": {
    hi: "व्यूपोर्ट",
    es: "Ventana",
    fr: "Fenêtre",
    de: "Ansichtsfenster",
    pt: "Janela",
    ja: "ビューポート",
    ko: "뷰포트"
  },
  "Tests.resolution-checker.myDisplay.ppiLabel": {
    hi: "अनुमानित पिक्सल घनत्व",
    es: "Densidad de píxeles estimada",
    fr: "Densité de pixels estimée",
    de: "Geschätzte Pixeldichte",
    pt: "Densidade de pixels estimada",
    ja: "推定ピクセル密度",
    ko: "예상 픽셀 밀도"
  },
  "Tests.resolution-checker.myDisplay.prompt": {
    hi: "पिक्सल घनत्व का अनुमान लगाने के लिए अपनी स्क्रीन का भौतिक आकार दर्ज करें।",
    es: "Ingresa el tamaño físico de tu pantalla para estimar la densidad de píxeles.",
    fr: "Entrez la taille physique de votre écran pour estimer la densité de pixels.",
    de: "Geben Sie die physische Größe Ihres Bildschirms ein, um die Pixeldichte zu schätzen.",
    pt: "Digite o tamanho físico da sua tela para estimar a densidade de pixels.",
    ja: "ピクセル密度を推定するには、画面の物理サイズを入力してください。",
    ko: "픽셀 밀도를 추정하려면 화면의 물리적 크기를 입력하세요."
  },
  "Tests.resolution-checker.myDisplay.resLabel": {
    hi: "नेटिव रिज़ॉल्यूशन",
    es: "Resolución nativa",
    fr: "Résolution native",
    de: "Native Auflösung",
    pt: "Resolução nativa",
    ja: "ネイティブ解像度",
    ko: "기본 해상도"
  },
  "Tests.resolution-checker.myDisplay.resPlaceholder": {
    hi: "जैसे 2560x1440",
    es: "por ejemplo, 2560x1440",
    fr: "par exemple, 2560x1440",
    de: "z.B. 2560x1440",
    pt: "por exemplo, 2560x1440",
    ja: "例: 2560x1440",
    ko: "예: 2560x1440"
  },
  "Tests.resolution-checker.myDisplay.sizeLabel": {
    hi: "स्क्रीन का आकार (इंच)",
    es: "Tamaño de pantalla (pulgadas)",
    fr: "Taille de l'écran (pouces)",
    de: "Bildschirmgröße (Zoll)",
    pt: "Tamanho da tela (polegadas)",
    ja: "画面サイズ (インチ)",
    ko: "화면 크기 (인치)"
  },
  "Tests.resolution-checker.myDisplay.sizePlaceholder": {
    hi: "जैसे 27",
    es: "por ejemplo, 27",
    fr: "par exemple, 27",
    de: "z.B. 27",
    pt: "por exemplo, 27",
    ja: "例: 27",
    ko: "예: 27"
  },
  "Tests.resolution-checker.myDisplay.statusDiffers": {
    hi: "ब्राउज़र-रिपोर्टेड आयाम आपकी दर्ज विशिष्टता से भिन्न हैं",
    es: "Las dimensiones reportadas por el navegador difieren de tu especificación ingresada",
    fr: "Les dimensions rapportées par le navigateur diffèrent de votre spécification saisie",
    de: "Vom Browser gemeldete Abmessungen weichen von Ihrer eingegebenen Spezifikation ab",
    pt: "As dimensões relatadas pelo navegador diferem da sua especificação inserida",
    ja: "ブラウザが報告する寸法が入力した仕様と異なります",
    ko: "브라우저가 보고하는 크기가 입력한 사양과 다릅니다"
  },
  "Tests.resolution-checker.myDisplay.statusLabel": {
    hi: "स्थिति",
    es: "Estado",
    fr: "Statut",
    de: "Status",
    pt: "Status",
    ja: "ステータス",
    ko: "상태"
  },
  "Tests.resolution-checker.myDisplay.statusMatches": {
    hi: "ब्राउज़र से मेल खाता है",
    es: "Coincide con el navegador",
    fr: "Correspond au navigateur",
    de: "Stimmt mit Browser überein",
    pt: "Corresponde ao navegador",
    ja: "ブラウザと一致",
    ko: "브라우저와 일치"
  },
  "Tests.resolution-checker.myDisplay.title": {
    hi: "मेरा डिस्प्ले",
    es: "MI PANTALLA",
    fr: "MON AFFICHAGE",
    de: "MEIN DISPLAY",
    pt: "MEU MONITOR",
    ja: "私のディスプレイ",
    ko: "내 디스플레이"
  },
  "Tests.resolution-checker.standards.colPixels": {
    hi: "लगभग. पिक्सल",
    es: "Aprox. Píxeles",
    fr: "Approx. Pixels",
    de: "Ca. Pixel",
    pt: "Aprox. Pixels",
    ja: "概算ピクセル数",
    ko: "대략적인 픽셀"
  },
  "Tests.resolution-checker.standards.colRes": {
    hi: "रिज़ॉल्यूशन",
    es: "Resolución",
    fr: "Résolution",
    de: "Auflösung",
    pt: "Resolução",
    ja: "解像度",
    ko: "해상도"
  },
  "Tests.resolution-checker.standards.colStandard": {
    hi: "मानक",
    es: "Estándar",
    fr: "Standard",
    de: "Standard",
    pt: "Padrão",
    ja: "標準",
    ko: "표준"
  },
  "Tests.resolution-checker.standards.colUse": {
    hi: "सामान्य उपयोग",
    es: "Uso Común",
    fr: "Utilisation Commune",
    de: "Übliche Verwendung",
    pt: "Uso Comum",
    ja: "一般的な使用",
    ko: "일반적인 용도"
  },
  "Tests.resolution-checker.standards.title": {
    hi: "रिज़ॉल्यूशन मानक",
    es: "ESTÁNDARES DE RESOLUCIÓN",
    fr: "NORMES DE RÉSOLUTION",
    de: "AUFLÖSUNGSSTANDARDS",
    pt: "PADRÕES DE RESOLUÇÃO",
    ja: "解像度標準",
    ko: "해상도 표준"
  },
  "Tests.resolution-checker.troubleshoot.a1": {
    hi: "OS डिस्प्ले स्केलिंग चेक करें (जैसे 150%)। यह ब्राउज़र को रिपोर्ट की गई तार्किक रिज़ॉल्यूशन कम करता है।",
    es: "Comprueba la escala de pantalla del SO (por ejemplo, 150%). Esto reduce la resolución lógica reportada al navegador.",
    fr: "Vérifiez la mise à l'échelle de l'affichage du système d'exploitation (par exemple, 150%). Cela réduit la résolution logique signalée au navigateur.",
    de: "Überprüfen Sie die OS-Anzeigeskalierung (z.B. 150%). Dies reduziert die dem Browser gemeldete logische Auflösung.",
    pt: "Verifique a escala de exibição do SO (por exemplo, 150%). Isso reduz a resolução lógica relatada ao navegador.",
    ja: "OS表示スケーリングを確認します（例: 150%）。これはブラウザに報告される論理解像度を下げます。",
    ko: "OS 디스플레이 배율을 확인하세요(예: 150%). 이는 브라우저에 보고되는 논리 해상도를 줄입니다."
  },
  "Tests.resolution-checker.troubleshoot.a2": {
    hi: "OS आउटपुट 4K पर सेट है या नहीं जांचें। यदि आप कम रिज़ॉल्यूशन लैपटॉप स्क्रीन मिरर कर रहे हैं, तो बाहरी डिस्प्ले नीचे हो सकता है।",
    es: "Verifica que la salida del SO esté configurada en 4K. Si estás reflejando una pantalla de portátil de menor resolución, la pantalla externa puede ser inferior.",
    fr: "Vérifiez que la sortie du système d'exploitation est réglée sur 4K. Si vous reflétez un écran de portable de résolution inférieure, l'affichage externe peut être moins bon.",
    de: "Überprüfen Sie, ob die OS-Ausgabe auf 4K eingestellt ist. Wenn Sie einen Laptop-Bildschirm mit niedrigerer Auflösung spiegeln, kann das externe Display nach unten gezogen werden.",
    pt: "Verifique se a saída do SO está definida como 4K. Se você estiver espelhando uma tela de laptop de resolução mais baixa, o monitor externo pode estar inferior.",
    ja: "OSの出力が4Kに設定されているか確認します。解像度の低いラップトップ画面をミラーリングしている場合、外部ディスプレイが引き下げられる可能性があります。",
    ko: "OS 출력이 4K로 설정되어 있는지 확인하세요. 해상도가 낮은 노트북 화면을 미러링하고 있다면 외부 디스플레이가 낮아질 수 있습니다."
  },
  "Tests.resolution-checker.troubleshoot.a3": {
    hi: "अपना केबल जांचें। कुछ उच्च रिज़ॉल्यूशन + उच्च रिफ्रेश संयोजनों के लिए DisplayPort 1.4 या HDMI 2.1 की आवश्यकता होती है।",
    es: "Comprueba tu cable. Algunas combinaciones de alta resolución + alta tasa de actualización requieren DisplayPort 1.4 o HDMI 2.1.",
    fr: "Vérifiez votre câble. Certaines combinaisons haute résolution + haute fréquence de rafraîchissement nécessitent DisplayPort 1.4 ou HDMI 2.1.",
    de: "Überprüfen Sie Ihr Kabel. Einige Kombinationen aus hoher Auflösung + hoher Bildwiederholrate erfordern DisplayPort 1.4 oder HDMI 2.1.",
    pt: "Verifique seu cabo. Algumas combinações de alta resolução + alta taxa de atualização requerem DisplayPort 1.4 ou HDMI 2.1.",
    ja: "ケーブルを確認してください。一部の高解像度 + 高リフレッシュレートの組み合わせにはDisplayPort 1.4またはHDMI 2.1が必要です。",
    ko: "케이블을 확인하세요. 일부 고해상도 + 고재생률 조합은 DisplayPort 1.4 또는 HDMI 2.1이 필요합니다."
  },
  "Tests.resolution-checker.troubleshoot.q1": {
    hi: "मेरा रिज़ॉल्यूशन अपेक्षा से कम है।",
    es: "Mi resolución es inferior a la esperada.",
    fr: "Ma résolution est inférieure à celle attendue.",
    de: "Meine Auflösung ist niedriger als erwartet.",
    pt: "Minha resolução é menor do que o esperado.",
    ja: "私の解像度が予想より低いです。",
    ko: "내 해상도가 예상보다 낮습니다."
  },
  "Tests.resolution-checker.troubleshoot.q2": {
    hi: "मेरा 4K डिस्प्ले धुंधला दिखता है।",
    es: "Mi pantalla 4K se ve borrosa.",
    fr: "Mon affichage 4K semble flou.",
    de: "Mein 4K-Display sieht verschwommen aus.",
    pt: "Meu monitor 4K parece borrado.",
    ja: "私の4Kディスプレイがぼやけて見えます。",
    ko: "내 4K 디스플레이가 흐릿하게 보입니다."
  },
  "Tests.resolution-checker.troubleshoot.q3": {
    hi: "मेरा हाई-रिफ्रेश विकल्प गायब है।",
    es: "Mi opción de alta tasa de actualización falta.",
    fr: "Mon option de fréquence de rafraîchissement élevée est manquante.",
    de: "Meine Hochfrequenz-Option fehlt.",
    pt: "Minha opção de alta taxa de atualização está faltando.",
    ja: "高リフレッシュレートオプションがありません。",
    ko: "고재생률 옵션이 없습니다."
  },
  "Tests.resolution-checker.troubleshoot.title": {
    hi: "समस्या निवारण",
    es: "RESOLUCIÓN DE PROBLEMAS",
    fr: "DÉPANNAGE",
    de: "FEHLERBEHEBUNG",
    pt: "SOLUÇÃO DE PROBLEMAS",
    ja: "トラブルシューティング",
    ko: "문제 해결"
  },
  "Tests.resolution-checker.values.custom": {
    hi: "कस्टम / अन्य",
    es: "Personalizado / Otro",
    fr: "Personnalisé / Autre",
    de: "Benutzerdefiniert / Andere",
    pt: "Personalizado / Outro",
    ja: "カスタム / その他",
    ko: "사용자 정의 / 기타"
  },
  "Tests.resolution-checker.values.landscape": {
    hi: "लैंडस्केप",
    es: "Horizontal",
    fr: "Paysage",
    de: "Querformat",
    pt: "Paisagem",
    ja: "横向き",
    ko: "가로"
  },
  "Tests.resolution-checker.values.notExposed": {
    hi: "ब्राउज़र द्वारा उजागर नहीं",
    es: "No expuesto por el navegador",
    fr: "Non exposé par le navigateur",
    de: "Nicht vom Browser bereitgestellt",
    pt: "Não exposto pelo navegador",
    ja: "ブラウザによって公開されていない",
    ko: "브라우저에 의해 노출되지 않음"
  },
  "Tests.resolution-checker.values.portrait": {
    hi: "पोर्ट्रेट",
    es: "Vertical",
    fr: "Portrait",
    de: "Hochformat",
    pt: "Retrato",
    ja: "縦向き",
    ko: "세로"
  },
  "Tests.resolution-checker.values.unknown": {
    hi: "अज्ञात",
    es: "Desconocido",
    fr: "Inconnu",
    de: "Unbekannt",
    pt: "Desconhecido",
    ja: "不明",
    ko: "알 수 없음"
  },

  // ── TouchScreenTest ──────────────────────────────────────
  "TouchScreenTest.modes.multi": {
    hi: "मल्टी-टच",
    es: "Multi-Táctil",
    fr: "Multi-Tactile",
    de: "Multi-Touch",
    pt: "Multi-Touch",
    ja: "マルチタッチ",
    ko: "멀티 터치"
  },
  "TouchScreenTest.types.touch": {
    hi: "टच",
    es: "Táctil",
    fr: "Tactile",
    de: "Touch",
    pt: "Toque",
    ja: "タッチ",
    ko: "터치"
  },
  "TouchScreenTest.visualizer.coords": {
    hi: "X: {x} Y: {y}",
    es: "X: {x} Y: {y}",
    fr: "X: {x} Y: {y}",
    de: "X: {x} Y: {y}",
    pt: "X: {x} Y: {y}",
    ja: "X: {x} Y: {y}",
    ko: "X: {x} Y: {y}"
  },
  "TouchScreenTest.visualizer.id": {
    hi: "ID: {id}",
    es: "ID: {id}",
    fr: "ID: {id}",
    de: "ID: {id}",
    pt: "ID: {id}",
    ja: "ID: {id}",
    ko: "ID: {id}"
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
