import fs from 'fs';
import path from 'path';

const TRANSLATIONS = {
  en: {
    pixelDefectsConcept: {
      metaTitle: "Dead Pixel vs Stuck Pixel – How to Diagnose & Fix Screen Defects",
      metaDescription: "Understand the differences between dead pixels and stuck subpixels, how to test for them, and manufacturer warranty policies.",
      breadcrumbsGuides: "Guides",
      breadcrumbsTitle: "Dead vs Stuck Pixels",
      eyebrow: "DISPLAY GUIDE & ANALYSIS",
      title: "Dead Pixel vs Stuck Pixel: How to Tell the Difference",
      intro: "Pixel flaws are among the most common defects found in LCD and OLED panels. Knowing whether an aberrant pixel is permanently dead or merely stuck determines whether it can be recovered or warrants a manufacturer warranty return.",
      deadPixel: {
        badge: "Permanent Defect",
        title: "Dead Pixel",
        desc: "A pixel whose transistor has completely failed, leaving all three RGB subpixels permanently switched off (or unpowered).",
        appearanceLabel: "Appearance",
        appearance: "Always appears pitch black against white and colored backgrounds.",
        causeLabel: "Cause",
        cause: "Broken electrode, failed thin-film transistor (TFT), or severed micro-trace.",
        recoveryLabel: "Recovery",
        recovery: "Hardware-level failure; cannot be fixed via software cycling."
      },
      stuckPixel: {
        badge: "Potentially Recoverable",
        title: "Stuck Pixel",
        desc: "A pixel where one or two subpixels (Red, Green, or Blue) remain constantly energised and cannot turn off.",
        appearanceLabel: "Appearance",
        appearance: "A bright red, green, blue, cyan, or magenta dot, most noticeable against dark or black backgrounds.",
        causeLabel: "Cause",
        cause: "Liquid crystal molecules temporarily locked in open state or charge imbalance.",
        recoveryLabel: "Recovery",
        recovery: "Rapid high-frequency color flashing (stuck pixel cycle) can sometimes unstick the crystal orientation."
      },
      isoTitle: "ISO 9241-307 Panel Defect Standards",
      isoP1: "Most consumer monitors are classified as Class 2 panels. Under ISO standards, manufacturers allow up to 2 permanently bright pixels, 2 permanently dark pixels, or up to 5 defective subpixels per million pixels before considering the panel defective for warranty replacement.",
      isoP2: "If you have discovered a pixel defect within the retailer's initial return or exchange window (typically 14 to 30 days), return it directly to the retailer rather than filing a manufacturer warranty claim, which may be rejected under Class 2 allowances.",
      testsTitle: "Run Diagnostic Tests",
      deadPixelTestTitle: "Dead Pixel Test",
      deadPixelTestDesc: "Cycle through full screen solid white and primary colors",
      stuckPixelTestTitle: "Stuck Pixel Fixer & Test",
      stuckPixelTestDesc: "High-frequency RGB subpixel cycling tool"
    },
    ghostingConcept: {
      metaTitle: "How to Check Monitor Ghosting – Pixel Response Time & Overdrive Guide",
      metaDescription: "Learn what monitor ghosting and inverse ghosting (coronas) are, how to inspect pixel response times, and how to tune overdrive.",
      breadcrumbsGuides: "Guides",
      breadcrumbsTitle: "Ghosting & Motion",
      eyebrow: "DISPLAY GUIDE & MOTION CLARITY",
      title: "How to Check Monitor Ghosting & Motion Clarity",
      intro: "Monitor ghosting occurs when liquid crystals take too long to transition from one color or brightness level to another. Understanding the visual symptoms helps you fine-tune your monitor's overdrive settings for optimal clarity.",
      standardGhosting: {
        title: "Standard Ghosting (Trailing)",
        desc: "A fuzzy, dark or smudged trail following behind moving objects against contrasting backgrounds.",
        causeLabel: "Primary Cause",
        cause: "Slow Gray-to-Gray (GtG) pixel response times. Typical on standard VA panels in dark transitions.",
        solutionLabel: "Solution",
        solution: "Increase the monitor's OSD Overdrive / Trace Free / AMA setting by one step."
      },
      inverseGhosting: {
        title: "Inverse Ghosting (Coronas / Overshoot)",
        desc: "A bright, inverted-colored or glowing halo trailing behind moving objects.",
        causeLabel: "Primary Cause",
        cause: "Excessive panel overdrive voltage pushing liquid crystals past target color states (overshoot).",
        solutionLabel: "Solution",
        solution: "Lower the monitor's Overdrive setting. Never use 'Extreme' or 'Fastest' mode unless running at maximum refresh rate."
      },
      howToTestTitle: "How to Test Motion Clarity in Your Browser",
      howToTestP1: "Open our Ghosting and Motion Blur tests at full screen. Focus your gaze on a moving shape as it passes across the display. If the shape leaves a dark smear behind, overdrive is set too low. If you observe a bright, unnatural glow, overdrive is set too aggressively.",
      howToTestP2: "Important Limitation: While browser tests provide accurate visual cues for adjusting monitor overdrive, true response times (GtG in milliseconds) require specialized high-speed photodiode oscilloscopes.",
      testsTitle: "Related Diagnostic Tests",
      ghostingTestTitle: "Ghosting Test",
      ghostingTestDesc: "High contrast moving blocks across various speed profiles",
      refreshRateTestTitle: "Refresh Rate Test",
      refreshRateTestDesc: "Measure browser frame timing and animation fluidity"
    },
    backlightBleedConcept: {
      metaTitle: "How to Check Backlight Bleed vs IPS Glow – Dark Room Testing Guide",
      metaDescription: "Learn how to differentiate true backlight bleed from normal IPS glow, proper dark room testing methods, and when to request an RMA.",
      breadcrumbsGuides: "Guides",
      breadcrumbsTitle: "Backlight Bleed",
      eyebrow: "DISPLAY GUIDE & LUMINANCE",
      title: "Backlight Bleed vs IPS Glow: Testing & Diagnosis",
      intro: "When viewing dark scenes on an LCD monitor, light imperfections are often noticed in corners or along the bezel edges. Differentiating structural backlight bleed from normal IPS optical glow is critical before deciding to RMA a display.",
      backlightBleed: {
        badge: "Hardware Assembly Defect",
        title: "Backlight Bleed",
        desc: "Unintended light leaking from behind the LCD matrix through uneven bezel pressure, loose frame tolerances, or pinched panel corners.",
        behaviorLabel: "Behavior",
        behavior: "Remains fixed in the exact same spot and brightness regardless of your viewing angle or viewing distance.",
        appearanceLabel: "Appearance",
        appearance: "Jagged white or yellow light puddles spilling inwards from the edges or corners.",
        actionLabel: "Action",
        action: "Severe bleed affecting daily usage justifies a retailer exchange."
      },
      ipsGlow: {
        badge: "Normal Optical Characteristic",
        title: "IPS Glow",
        desc: "An inherent optical phenomenon of In-Plane Switching liquid crystal panels where light reflects at wide viewing angles.",
        behaviorLabel: "Behavior",
        behavior: "Changes intensity, shifts position, or disappears entirely as you tilt your head or step further back from the screen.",
        appearanceLabel: "Appearance",
        appearance: "A soft silver, amber, or violet sheen primarily visible in the 4 corners on dark backgrounds.",
        actionLabel: "Action",
        action: "Present on almost all IPS panels; mitigated by lowering brightness and maintaining arm's-length viewing distance."
      },
      isolationMethodTitle: "The Isolation Test Method",
      isolationSteps: [
        "Dim the room lights completely so reflections do not mask dark details.",
        "Open our full screen Backlight Bleed test.",
        "Set your monitor brightness to your normal working level (around 120-150 nits, usually 30-50% on monitor OSD).",
        "Look at the corners from an arm's length. Now step back 2 meters and bob your head side to side.",
        "If the light shifts with your head position, it is IPS glow. If the light stays anchored to the bezel edge, it is backlight bleed."
      ],
      testsTitle: "Run Diagnostic Tests",
      backlightBleedTestTitle: "Backlight Bleed Test",
      backlightBleedTestDesc: "Fullscreen 0% pure black pattern with brightness calibration",
      uniformityTestTitle: "Screen Uniformity Test",
      uniformityTestDesc: "Inspect gray and luminance steps across screen quadrants"
    }
  },

  hi: {
    pixelDefectsConcept: {
      metaTitle: "डेड पिक्सल बनाम अटका हुआ पिक्सल – स्क्रीन दोषों की पहचान और समाधान",
      metaDescription: "डेड पिक्सल और अटके हुए सबपिक्सल के बीच अंतर, उनके परीक्षण के तरीके और निर्माता वारंटी नीतियों को समझें।",
      breadcrumbsGuides: "गाइड्स",
      breadcrumbsTitle: "डेड बनाम अटका पिक्सल",
      eyebrow: "डिस्प्ले गाइड और विश्लेषण",
      title: "डेड पिक्सल बनाम अटका हुआ पिक्सल: अंतर कैसे पहचानें",
      intro: "एलसीडी और ओलेड पैनलों में पिक्सल की खराबी सबसे आम दोषों में से एक है। यह जानना कि कोई असामान्य पिक्सल पूरी तरह से खराब (डेड) है या केवल अटका हुआ (स्टक) है, यह तय करता है कि उसे ठीक किया जा सकता है या वारंटी के तहत बदला जाना चाहिए।",
      deadPixel: {
        badge: "स्थायी दोष (Permanent Defect)",
        title: "डेड पिक्सल (Dead Pixel)",
        desc: "एक पिक्सल जिसका ट्रांजिस्टर पूरी तरह विफल हो चुका है, जिससे तीनों RGB सबपिक्सल स्थायी रूप से बंद (बिना पावर) रहते हैं।",
        appearanceLabel: "दिखावट",
        appearance: "सफेद और रंगीन पृष्ठभूमि पर हमेशा बिल्कुल काला दिखाई देता है।",
        causeLabel: "कारण",
        cause: "टूटा हुआ इलेक्ट्रोड, खराब थिन-फिल्म ट्रांजिस्टर (TFT) या कटी हुई माइक्रो-ट्रेस।",
        recoveryLabel: "समाधान",
        recovery: "हार्डवेयर स्तर की विफलता; इसे सॉफ्टवेयर चक्रों द्वारा ठीक नहीं किया जा सकता।"
      },
      stuckPixel: {
        badge: "संभावित रूप से ठीक करने योग्य",
        title: "अटका हुआ पिक्सल (Stuck Pixel)",
        desc: "एक पिक्सल जहां एक या दो सबपिक्सल (लाल, हरा या नीला) लगातार चालू रहते हैं और बंद नहीं हो पाते।",
        appearanceLabel: "दिखावट",
        appearance: "काली या गहरी पृष्ठभूमि पर एक चमकीला लाल, हरा, नीला, सियान या मैजेंटा बिंदु दिखाई देता है।",
        causeLabel: "कारण",
        cause: "तरल क्रिस्टल अणु अस्थायी रूप से खुली अवस्था में बंद हो जाते हैं या चार्ज असंतुलन हो जाता है।",
        recoveryLabel: "समाधान",
        recovery: "तेज उच्च-आवृत्ति रंग ब्लिंकिंग (स्टक पिक्सल साइकिल) से कभी-कभी क्रिस्टल का संरेखण ठीक हो सकता है।"
      },
      isoTitle: "ISO 9241-307 पैनल दोष मानक",
      isoP1: "अधिकांश उपभोक्ता मॉनिटरों को क्लास 2 पैनल के रूप में वर्गीकृत किया गया है। ISO मानकों के तहत, निर्माता वारंटी प्रतिस्थापन से पहले प्रति मिलियन पिक्सल पर अधिकतम 2 चमकीले पिक्सल, 2 काले पिक्सल या 5 खराब सबपिक्सल तक की अनुमति देते हैं।",
      isoP2: "यदि आपको रिटेलर की शुरुआती वापसी या विनिमय विंडो (आमतौर पर 14 से 30 दिन) के भीतर कोई पिक्सल दोष मिलता है, तो निर्माता वारंटी का दावा करने के बजाय इसे सीधे रिटेलर को वापस करें।",
      testsTitle: "डायग्नोस्टिक परीक्षण चलाएं",
      deadPixelTestTitle: "डेड पिक्सल टेस्ट",
      deadPixelTestDesc: "फुल स्क्रीन सॉलिड व्हाइट और प्राथमिक रंगों के माध्यम से जांचें",
      stuckPixelTestTitle: "स्टक पिक्सल फिक्सर और टेस्ट",
      stuckPixelTestDesc: "उच्च-आवृत्ति RGB सबपिक्सल साइकलिंग टूल"
    },
    ghostingConcept: {
      metaTitle: "मॉनिटर घोस्टिंग कैसे जांचें – पिक्सल प्रतिक्रिया समय और ओवरड्राइव गाइड",
      metaDescription: "जानें कि मॉनिटर घोस्टिंग और इनवर्स घोस्टिंग (कोरोना) क्या हैं, पिक्सल रिस्पॉन्स टाइम की जांच कैसे करें और ओवरड्राइव को कैसे ट्यून करें।",
      breadcrumbsGuides: "गाइड्स",
      breadcrumbsTitle: "घोस्टिंग और मोशन",
      eyebrow: "डिस्प्ले गाइड और मोशन क्लैरिटी",
      title: "मॉनिटर घोस्टिंग और मोशन क्लैरिटी की जांच कैसे करें",
      intro: "मॉनिटर घोस्टिंग तब होती है जब लिक्विड क्रिस्टल को एक रंग या चमक स्तर से दूसरे में बदलने में बहुत अधिक समय लगता है। इन लक्षणों को समझकर आप स्पष्टता के लिए अपने मॉनिटर की ओवरड्राइव सेटिंग्स को सही कर सकते हैं।",
      standardGhosting: {
        title: "मानक घोस्टिंग (ट्रेलिंग)",
        desc: "विपरीत पृष्ठभूमि पर चलती वस्तुओं के पीछे धुंधला, गहरा या धब्बेदार निशान दिखाई देना।",
        causeLabel: "मुख्य कारण",
        cause: "धीमा ग्रे-टू-ग्रे (GtG) पिक्सल प्रतिक्रिया समय। गहरे रंग के बदलावों में मानक VA पैनलों पर आम।",
        solutionLabel: "समाधान",
        solution: "मॉनिटर के OSD में ओवरड्राइव / ट्रेस फ्री / AMA सेटिंग को एक स्तर बढ़ाएं।"
      },
      inverseGhosting: {
        title: "इनवर्स घोस्टिंग (कोरोना / ओवरशूट)",
        desc: "चलती वस्तुओं के पीछे एक चमकीला, उल्टे रंग का या चमकता हुआ प्रभामंडल (हेलो) दिखाई देना।",
        causeLabel: "मुख्य कारण",
        cause: "अत्यधिक ओवरड्राइव वोल्टेज जो लिक्विड क्रिस्टल को लक्षित रंग से आगे धकेल देता है (ओवरशूट)।",
        solutionLabel: "समाधान",
        solution: "मॉनिटर की ओवरड्राइव सेटिंग कम करें। जब तक अधिकतम रिफ्रेश रेट पर न चल रहे हों, 'Extreme' या 'Fastest' मोड का उपयोग न करें।"
      },
      howToTestTitle: "ब्राउज़र में मोशन क्लैरिटी का परीक्षण कैसे करें",
      howToTestP1: "हमारे घोस्टिंग और मोशन ब्लर टेस्ट को फुल स्क्रीन पर खोलें। डिस्प्ले से गुजरते हुए किसी मूविंग ब्लॉक पर ध्यान केंद्रित करें। यदि वस्तु पीछे गहरा धब्बा छोड़ती है, तो ओवरड्राइव बहुत कम है। यदि चमकीली आभा दिखाई देती है, तो ओवरड्राइव बहुत अधिक है।",
      howToTestP2: "महत्वपूर्ण सीमा: ब्राउज़र परीक्षण विज़ुअल मार्गदर्शन प्रदान करते हैं, लेकिन वास्तविक रिस्पॉन्स टाइम (मिलीसेकंड में GtG) मापने के लिए विशेष हाई-स्पीड फोटोडायोड ऑसिलोस्कोप की आवश्यकता होती है।",
      testsTitle: "संबंधित डायग्नोस्टिक परीक्षण",
      ghostingTestTitle: "घोस्टिंग टेस्ट",
      ghostingTestDesc: "विभिन्न गति प्रोफाइलों पर उच्च कंट्रास्ट गतिशील ब्लॉक",
      refreshRateTestTitle: "रिफ्रेश रेट टेस्ट",
      refreshRateTestDesc: "ब्राउज़र फ्रेम टाइमिंग और एनिमेशन तरलता को मापें"
    },
    backlightBleedConcept: {
      metaTitle: "बैकलाइट ब्लीड बनाम IPS ग्लो की जांच – डार्क रूम टेस्टिंग गाइड",
      metaDescription: "सच्चे बैकलाइट ब्लीड और सामान्य IPS ग्लो के बीच अंतर, उचित डार्क रूम परीक्षण विधियों और RMA के नियमों को समझें।",
      breadcrumbsGuides: "गाइड्स",
      breadcrumbsTitle: "बैकलाइट ब्लीड",
      eyebrow: "डिस्प्ले गाइड और ल्यूमिनेन्स",
      title: "बैकलाइट ब्लीड बनाम IPS ग्लो: परीक्षण और निदान",
      intro: "एलसीडी मॉनिटर पर गहरे दृश्यों को देखते समय अक्सर कोनों या बेज़ल किनारों पर प्रकाश की खामियां दिखाई देती हैं। RMA का निर्णय लेने से पहले हार्डवेयर बैकलाइट ब्लीड और सामान्य IPS ग्लो में अंतर समझना जरूरी है।",
      backlightBleed: {
        badge: "हार्डवेयर असेंबली दोष",
        title: "बैकलाइट ब्लीड (Backlight Bleed)",
        desc: "असमान बेज़ल दबाव, ढीले फ्रेम या मुड़े हुए पैनल कोनों के माध्यम से एलसीडी मैट्रिक्स के पीछे से अनपेक्षित प्रकाश का रिसाव।",
        behaviorLabel: "व्यवहार",
        behavior: "आपके देखने के कोण या दूरी की परवाह किए बिना बिल्कुल उसी स्थान और चमक पर स्थिर रहता है।",
        appearanceLabel: "दिखावट",
        appearance: "किनारों या कोनों से अंदर की ओर फैलती हुई नुकीली सफेद या पीली रोशनी।",
        actionLabel: "कार्रवाई",
        action: "दैनिक उपयोग को प्रभावित करने वाला गंभीर ब्लीड रिटेलर एक्सचेंज के योग्य है।"
      },
      ipsGlow: {
        badge: "सामान्य ऑप्टिकल विशेषता",
        title: "IPS ग्लो (IPS Glow)",
        desc: "इन-प्लेन स्विचिंग (IPS) पैनलों की एक अंतर्निहित ऑप्टिकल घटना जहां चौड़े कोणों पर प्रकाश परावर्तित होता है।",
        behaviorLabel: "व्यवहार",
        behavior: "जैसे ही आप अपना सिर झुकाते हैं या स्क्रीन से पीछे हटते हैं, तीव्रता बदल जाती है, स्थिति बदल जाती है, या पूरी तरह गायब हो जाती है।",
        appearanceLabel: "दिखावट",
        appearance: "काली पृष्ठभूमि पर मुख्य रूप से 4 कोनों में दिखाई देने वाली एक हल्की चांदी, एम्बर, या बैंगनी चमक।",
        actionLabel: "कार्रवाई",
        action: "लगभग सभी IPS पैनलों पर मौजूद; चमक कम करके और उचित दूरी बनाए रखकर इसे कम किया जा सकता है।"
      },
      isolationMethodTitle: "आइसोलेशन परीक्षण विधि",
      isolationSteps: [
        "कमरे की बत्तियाँ पूरी तरह बंद कर दें ताकि प्रतिबिंब गहरे विवरणों को न छिपाएं।",
        "हमारा फुल स्क्रीन बैकलाइट ब्लीड टेस्ट खोलें।",
        "अपने मॉनिटर की चमक को सामान्य स्तर पर सेट करें (लगभग 120-150 nits, OSD पर 30-50%)।",
        "एक हाथ की दूरी से कोनों को देखें। अब 2 मीटर पीछे हटें और सिर को अगल-बगल हिलाएं।",
        "यदि प्रकाश आपके सिर की स्थिति के साथ बदलता है, तो यह IPS ग्लो है। यदि किनारों पर स्थिर रहता है, तो यह बैकलाइट ब्लीड है।"
      ],
      testsTitle: "डायग्नोस्टिक परीक्षण चलाएं",
      backlightBleedTestTitle: "बैकलाइट ब्लीड टेस्ट",
      backlightBleedTestDesc: "चमक अंशांकन के साथ फुलस्क्रीन 0% शुद्ध काला पैटर्न",
      uniformityTestTitle: "स्क्रीन एकरूपता टेस्ट",
      uniformityTestDesc: "स्क्रीन क्वाड्रंट्स में ग्रे और चमक स्तरों की जांच करें"
    }
  },

  es: {
    pixelDefectsConcept: {
      metaTitle: "Píxel muerto vs Píxel atascado – Cómo diagnosticar y solucionar defectos",
      metaDescription: "Comprenda las diferencias entre píxeles muertos y subpíxeles atascados, cómo probarlos y las garantías de los fabricantes.",
      breadcrumbsGuides: "Guías",
      breadcrumbsTitle: "Píxeles muertos vs atascados",
      eyebrow: "GUÍA DE PANTALLA Y ANÁLISIS",
      title: "Píxel muerto vs Píxel atascado: Cómo diferenciarlos",
      intro: "Los fallos de píxeles son de los defectos más comunes en paneles LCD y OLED. Saber si un píxel está muerto permanentemente o simplemente atascado determina si se puede recuperar o si amerita una devolución de garantía.",
      deadPixel: {
        badge: "Defecto permanente",
        title: "Píxel muerto (Dead Pixel)",
        desc: "Un píxel cuyo transistor ha fallado por completo, dejando los tres subpíxeles RGB apagados permanentemente.",
        appearanceLabel: "Aspecto",
        appearance: "Siempre aparece de color negro sobre fondos blancos y de color.",
        causeLabel: "Causa",
        cause: "Electrodo roto, transistor de película fina (TFT) averiado o microtraza cortada.",
        recoveryLabel: "Recuperación",
        recovery: "Fallo a nivel de hardware; no se puede reparar mediante software."
      },
      stuckPixel: {
        badge: "Potencialmente recuperable",
        title: "Píxel atascado (Stuck Pixel)",
        desc: "Un píxel donde uno o dos subpíxeles (rojo, verde o azul) permanecen encendidos constantemente y no pueden apagarse.",
        appearanceLabel: "Aspecto",
        appearance: "Un punto brillante de color rojo, verde, azul, cian o magenta, visible sobre fondos oscuros o negros.",
        causeLabel: "Causa",
        cause: "Moléculas de cristal líquido bloqueadas temporalmente en estado abierto o desequilibrio de carga.",
        recoveryLabel: "Recuperación",
        recovery: "El parpadeo rápido de color a alta frecuencia puede reactivar en ocasiones la orientación del cristal."
      },
      isoTitle: "Normas de defectos de panel ISO 9241-307",
      isoP1: "La mayoría de monitores de consumo se clasifican como paneles Clase 2. Bajo normas ISO, los fabricantes permiten hasta 2 píxeles brillantes, 2 oscuros o hasta 5 subpíxeles defectuosos por millón antes de considerar el panel apto para reemplazo por garantía.",
      isoP2: "Si descubre un defecto dentro del plazo inicial de devolución de la tienda (generalmente 14 a 30 días), devuélvalo a la tienda en lugar de reclamar al fabricante.",
      testsTitle: "Ejecutar pruebas de diagnóstico",
      deadPixelTestTitle: "Prueba de píxeles muertos",
      deadPixelTestDesc: "Recorra campos de pantalla completa en blanco sólido y colores primarios",
      stuckPixelTestTitle: "Reparador y test de píxeles atascados",
      stuckPixelTestDesc: "Herramienta de ciclado RGB de alta frecuencia para subpíxeles"
    },
    ghostingConcept: {
      metaTitle: "Cómo comprobar el ghosting del monitor – Tiempo de respuesta y overdrive",
      metaDescription: "Aprenda qué es el ghosting e inverse ghosting (coronas), cómo inspeccionar tiempos de respuesta y calibrar el overdrive.",
      breadcrumbsGuides: "Guías",
      breadcrumbsTitle: "Ghosting y movimiento",
      eyebrow: "GUÍA DE PANTALLA Y CLARIDAD DE MOVIMIENTO",
      title: "Cómo comprobar el ghosting y la claridad de movimiento",
      intro: "El ghosting ocurre cuando los cristales líquidos tardan demasiado en cambiar de un color o brillo a otro. Conocer los síntomas visuales le permite calibrar los ajustes de overdrive para una nitidez óptima.",
      standardGhosting: {
        title: "Ghosting estándar (Estela oscura)",
        desc: "Un rastro borroso, oscuro o manchado detrás de objetos en movimiento sobre fondos contrastados.",
        causeLabel: "Causa principal",
        cause: "Tiempo de respuesta gris a gris (GtG) lento. Frecuente en paneles VA en transiciones oscuras.",
        solutionLabel: "Solución",
        solution: "Aumente un nivel el ajuste de Overdrive / Trace Free / AMA en el menú del monitor."
      },
      inverseGhosting: {
        title: "Ghosting inverso (Coronas / Overshoot)",
        desc: "Un halo brillante, invertido o brillante que sigue a los objetos en movimiento.",
        causeLabel: "Causa principal",
        cause: "Voltaje excesivo de overdrive que empuja los cristales líquidos más allá del color objetivo.",
        solutionLabel: "Solución",
        solution: "Reduzca el ajuste de Overdrive. Evite modos 'Extremo' o 'Más rápido' salvo a la tasa de refresco máxima."
      },
      howToTestTitle: "Cómo probar la claridad de movimiento en su navegador",
      howToTestP1: "Abra nuestras pruebas de Ghosting y Motion Blur a pantalla completa. Fije la vista en una forma en movimiento. Si deja una estela oscura, el overdrive está muy bajo. Si ve un halo brillante, está demasiado agresivo.",
      howToTestP2: "Limitación importante: Las pruebas del navegador ofrecen pistas visuales precisas, pero medir el tiempo de respuesta real (GtG en ms) requiere osciloscopios de fotodiodos especializados.",
      testsTitle: "Pruebas de diagnóstico relacionadas",
      ghostingTestTitle: "Prueba de ghosting",
      ghostingTestDesc: "Bloques móviles de alto contraste con varios perfiles de velocidad",
      refreshRateTestTitle: "Prueba de tasa de refresco",
      refreshRateTestDesc: "Mida los tiempos de fotogramas del navegador y la fluidez de animación"
    },
    backlightBleedConcept: {
      metaTitle: "Fuga de luz vs IPS Glow – Guía de prueba en habitación oscura",
      metaDescription: "Aprenda a diferenciar fugas de luz (backlight bleed) del IPS glow normal, métodos de prueba y cuándo solicitar garantía.",
      breadcrumbsGuides: "Guías",
      breadcrumbsTitle: "Fuga de luz (Bleed)",
      eyebrow: "GUÍA DE PANTALLA Y LUMINANCIA",
      title: "Fuga de luz (Backlight Bleed) vs IPS Glow: Prueba y diagnóstico",
      intro: "Al ver escenas oscuras en un monitor LCD, suelen verse imperfecciones de luz en esquinas o bordes. Diferenciar una fuga de luz estructural del brillo óptico IPS es crucial antes de tramitar una garantía (RMA).",
      backlightBleed: {
        badge: "Defecto de ensamblaje de hardware",
        title: "Fuga de luz (Backlight Bleed)",
        desc: "Luz que escapa detrás de la matriz LCD por presión desigual del marco, tolerancias sueltas o esquinas pellizcadas.",
        behaviorLabel: "Comportamiento",
        behavior: "Permanece fija en el mismo punto exacto y con el mismo brillo sin importar el ángulo o distancia de visión.",
        appearanceLabel: "Aspecto",
        appearance: "Manchas irregulares de luz blanca o amarillenta que penetran desde los bordes o esquinas.",
        actionLabel: "Acción",
        action: "Fugas graves que afecten el uso diario justifican un cambio con el vendedor."
      },
      ipsGlow: {
        badge: "Característica óptica normal",
        title: "IPS Glow",
        desc: "Fenómeno óptico inherente a paneles In-Plane Switching donde la luz se refleja en ángulos de visión amplios.",
        behaviorLabel: "Comportamiento",
        behavior: "Cambia de intensidad, cambia de posición o desaparece al mover la cabeza o alejarse de la pantalla.",
        appearanceLabel: "Aspecto",
        appearance: "Un brillo plateado, ámbar o violáceo visible en las 4 esquinas sobre fondos oscuros.",
        actionLabel: "Acción",
        action: "Presente en casi todos los paneles IPS; se mitiga reduciendo el brillo y manteniendo distancia de un brazo."
      },
      isolationMethodTitle: "El método de prueba de aislamiento",
      isolationSteps: [
        "Apague las luces de la habitación por completo para que los reflejos no oculten detalles oscuros.",
        "Abra nuestra prueba de fuga de luz a pantalla completa.",
        "Ajuste el brillo del monitor a su nivel normal de trabajo (120-150 nits, aprox. 30-50% en el OSD).",
        "Mire las esquinas a la distancia de un brazo. Ahora retroceda 2 metros y mueva la cabeza de lado a lado.",
        "Si la luz se mueve con la cabeza, es IPS glow. Si permanece anclada al borde del marco, es fuga de luz."
      ],
      testsTitle: "Ejecutar pruebas de diagnóstico",
      backlightBleedTestTitle: "Prueba de fuga de luz",
      backlightBleedTestDesc: "Patrón negro puro al 0% con calibración de brillo",
      uniformityTestTitle: "Prueba de uniformidad de pantalla",
      uniformityTestDesc: "Inspeccione tonos de gris y luminancia en cuadrantes de pantalla"
    }
  },

  fr: {
    pixelDefectsConcept: {
      metaTitle: "Pixel mort vs Pixel bloqué – Comment diagnostiquer et réparer",
      metaDescription: "Comprenez les différences entre pixels morts et sous-pixels bloqués, comment les tester et les politiques de garantie.",
      breadcrumbsGuides: "Guides",
      breadcrumbsTitle: "Pixels morts vs bloqués",
      eyebrow: "GUIDE D'AFFICHAGE & ANALYSE",
      title: "Pixel mort vs Pixel bloqué : Comment faire la différence",
      intro: "Les défauts de pixels figurent parmi les problèmes les plus fréquents sur les dalles LCD et OLED. Savoir si un pixel anormal est définitivement mort ou simplement bloqué détermine s'il peut être récupéré ou justifie un retour en garantie.",
      deadPixel: {
        badge: "Défaut permanent",
        title: "Pixel mort (Dead Pixel)",
        desc: "Un pixel dont le transistor est totalement hors d'usage, laissant les trois sous-pixels RVB éteints en permanence.",
        appearanceLabel: "Apparence",
        appearance: "Apparaît toujours noir absolu sur fond blanc et sur les fonds colorés.",
        causeLabel: "Cause",
        cause: "Électrode brisée, transistor à couches minces (TFT) défaillant ou micro-piste rompue.",
        recoveryLabel: "Récupération",
        recovery: "Panne matérielle physique ; impossible à réparer par logiciel."
      },
      stuckPixel: {
        badge: "Potentiellement réparable",
        title: "Pixel bloqué (Stuck Pixel)",
        desc: "Un pixel dont un ou deux sous-pixels (rouge, vert ou bleu) restent allumés en permanence.",
        appearanceLabel: "Apparence",
        appearance: "Un point rouge, vert, bleu, cyan ou magenta vif, très visible sur fond noir ou sombre.",
        causeLabel: "Cause",
        cause: "Molécules de cristaux liquides temporairement figées en position ouverte ou déséquilibre de charge.",
        recoveryLabel: "Récupération",
        recovery: "Un clignotement rapide à haute fréquence de couleurs RVB peut parfois débloquer l'orientation du cristal."
      },
      isoTitle: "Normes ISO 9241-307 sur les défauts de dalle",
      isoP1: "La plupart des moniteurs grand public appartiennent à la classe 2. Les normes ISO autorisent jusqu'à 2 pixels allumés, 2 pixels éteints ou 5 sous-pixels défectueux par million avant qu'un remplacement sous garantie ne soit obligatoire.",
      isoP2: "Si vous découvrez un pixel défectueux pendant le délai de rétractation du revendeur (14 à 30 jours), retournez-le directement au revendeur plutôt que d'entamer une procédure de garantie fabricant.",
      testsTitle: "Lancer les tests de diagnostic",
      deadPixelTestTitle: "Test des pixels morts",
      deadPixelTestDesc: "Faites défiler des écrans pleins en blanc uni et couleurs primaires",
      stuckPixelTestTitle: "Réparateur & test de pixels bloqués",
      stuckPixelTestDesc: "Outil de cyclage RVB rapide pour sous-pixels bloqués"
    },
    ghostingConcept: {
      metaTitle: "Comment vérifier le ghosting d'écran – Guide temps de réponse & overdrive",
      metaDescription: "Apprenez ce que sont le ghosting et le reverse ghosting (coronas), comment inspecter la réactivité et régler l'overdrive.",
      breadcrumbsGuides: "Guides",
      breadcrumbsTitle: "Ghosting & mouvement",
      eyebrow: "GUIDE D'AFFICHAGE & NETTETÉ EN MOUVEMENT",
      title: "Comment vérifier le ghosting et la netteté en mouvement",
      intro: "Le ghosting survient lorsque les cristaux liquides mettent trop de temps à passer d'une couleur ou d'une luminosité à une autre. Comprendre ces symptômes permet d'ajuster l'overdrive de votre écran pour une netteté idéale.",
      standardGhosting: {
        title: "Ghosting standard (Traînée sombre)",
        desc: "Une traînée floue, sombre ou étalée qui suit les objets en mouvement sur fond contrasté.",
        causeLabel: "Cause principale",
        cause: "Temps de réponse gris à gris (GtG) trop lent. Fréquent sur les dalles VA lors de transitions sombres.",
        solutionLabel: "Solution",
        solution: "Augmentez d'un cran le réglage d'Overdrive / Trace Free / AMA dans le menu de votre écran."
      },
      inverseGhosting: {
        title: "Ghosting inverse (Coronas / Overshoot)",
        desc: "Un halo lumineux, inversé ou brillant qui traîne derrière les objets en mouvement.",
        causeLabel: "Cause principale",
        cause: "Tension d'overdrive excessive propulsant les cristaux au-delà de la couleur cible.",
        solutionLabel: "Solution",
        solution: "Diminuez l'Overdrive. Évitez les modes 'Extrême' ou 'Le plus rapide' sauf à la fréquence maximale."
      },
      howToTestTitle: "Comment tester la netteté en mouvement dans le navigateur",
      howToTestP1: "Ouvrez nos tests de Ghosting et Flou de mouvement en plein écran. Suivez des yeux une forme en déplacement. Si elle laisse une traînée sombre, l'overdrive est trop bas. Si elle laisse un halo blanc, l'overdrive est trop fort.",
      howToTestP2: "Limite importante : Les tests en ligne fournissent d'excellents repères visuels, mais la mesure physique en millisecondes (GtG) exige des oscilloscopes à photodiodes spécialisés.",
      testsTitle: "Tests de diagnostic associés",
      ghostingTestTitle: "Test de ghosting",
      ghostingTestDesc: "Formes mobiles à fort contraste à différentes vitesses",
      refreshRateTestTitle: "Test de taux de rafraîchissement",
      refreshRateTestDesc: "Mesurez la fluidité d'affichage et le cadencement des trames"
    },
    backlightBleedConcept: {
      metaTitle: "Fuites de lumière vs IPS Glow – Guide de test en pièce sombre",
      metaDescription: "Distinguez les véritables fuites de rétroéclairage de l'IPS glow normal, apprenez la méthode en chambre noire et quand demander un échange.",
      breadcrumbsGuides: "Guides",
      breadcrumbsTitle: "Fuite de rétroéclairage",
      eyebrow: "GUIDE D'AFFICHAGE & LUMINANCE",
      title: "Fuite de rétroéclairage vs IPS Glow : Test & diagnostic",
      intro: "Lors de scènes sombres sur un écran LCD, des imperfections lumineuses apparaissent souvent dans les coins ou le long du cadre. Distinguer une fuite mécanique de rétroéclairage de l'IPS glow normal est essentiel avant un retour SAV.",
      backlightBleed: {
        badge: "Défaut d'assemblage matériel",
        title: "Fuite de rétroéclairage (Backlight Bleed)",
        desc: "Lumière qui s'échappe derrière la matrice LCD en raison d'une pression inégale du cadre ou d'un pincement de la dalle.",
        behaviorLabel: "Comportement",
        behavior: "Reste fixe exactement au même endroit et à la même intensité quel que soit l'angle ou la distance de vue.",
        appearanceLabel: "Apparence",
        appearance: "Taches irrégulières blanchâtres ou jaunâtres qui s'étalent depuis les bords ou les coins.",
        actionLabel: "Action",
        action: "Une fuite sévère perturbant l'usage quotidien justifie un échange auprès du vendeur."
      },
      ipsGlow: {
        badge: "Caractéristique optique normale",
        title: "IPS Glow",
        desc: "Phénomène optique propre aux dalles In-Plane Switching où la lumière se reflète sous des angles obliques.",
        behaviorLabel: "Comportement",
        behavior: "Varie en intensité, se déplace ou disparaît selon la position de votre tête et la distance de recul.",
        appearanceLabel: "Apparence",
        appearance: "Un reflet doux argenté, doré ou violacé visible principalement aux 4 coins sur fond sombre.",
        actionLabel: "Action",
        action: "Présent sur presque toutes les dalles IPS ; s'atténue en baissant la luminosité et en se plaçant à une longueur de bras."
      },
      isolationMethodTitle: "La méthode du test d'isolation",
      isolationSteps: [
        "Éteignez complètement la lumière de la pièce pour éviter tout reflet parasite.",
        "Ouvrez notre test de fuite de rétroéclairage en plein écran.",
        "Réglez la luminosité de votre écran à votre niveau habituel (120-150 nits, soit environ 30-50%).",
        "Regardez les coins à une longueur de bras, puis reculez de 2 mètres en bougeant la tête de gauche à droite.",
        "Si la lumière bouge avec votre regard, c'est de l'IPS glow. Si elle reste clouée au bord du cadre, c'est une fuite de rétroéclairage."
      ],
      testsTitle: "Lancer les tests de diagnostic",
      backlightBleedTestTitle: "Test de fuite de rétroéclairage",
      backlightBleedTestDesc: "Mire noir pur 0% en plein écran avec calibration de luminosité",
      uniformityTestTitle: "Test d'uniformité de dalle",
      uniformityTestDesc: "Examinez les niveaux de gris et la répartition lumineuse par quadrants"
    }
  },

  de: {
    pixelDefectsConcept: {
      metaTitle: "Tote Pixel vs Hängende Pixel – Fehler erkennen & beheben",
      metaDescription: "Verstehen Sie die Unterschiede zwischen toten Pixeln und hängenden Subpixeln, Prüfmethoden und Herstellergarantien.",
      breadcrumbsGuides: "Anleitungen",
      breadcrumbsTitle: "Tote vs hängende Pixel",
      eyebrow: "BILDSCHIRM-LEITFADEN & ANALYSE",
      title: "Tote Pixel vs Hängende Pixel: Der Unterschied",
      intro: "Pixelfehler gehören zu den häufigsten Mängeln bei LCD- und OLED-Panels. Zu wissen, ob ein Pixel dauerhaft tot oder nur verklemmt ist, entscheidet über Rettungsversuche oder einen Garantieanspruch.",
      deadPixel: {
        badge: "Permanenter Hardwaredefekt",
        title: "Totes Pixel (Dead Pixel)",
        desc: "Ein Pixel, dessen Transistor vollständig ausgefallen ist, sodass alle drei RGB-Subpixel dauerhaft unbeleuchtet bleiben.",
        appearanceLabel: "Erscheinungsbild",
        appearance: "Erscheint auf weißen und farbigen Hintergründen stets tiefschwarz.",
        causeLabel: "Ursache",
        cause: "Gebrochene Elektrode, defekter Dünnschichttransistor (TFT) oder unterbrochene Leiterbahn.",
        recoveryLabel: "Behebung",
        recovery: "Physischer Hardwareschaden; kann nicht per Software behoben werden."
      },
      stuckPixel: {
        badge: "Potenziell behebbar",
        title: "Hängendes Pixel (Stuck Pixel)",
        desc: "Ein Pixel, bei dem ein oder zwei Subpixel (Rot, Grün oder Blau) dauerhaft leuchten und nicht abschalten.",
        appearanceLabel: "Erscheinungsbild",
        appearance: "Ein hellroter, grüner, blauer, cyan- oder magentafarbener Punkt auf dunklem Grund.",
        causeLabel: "Ursache",
        cause: "Flüssigkristallmoleküle temporär im offenen Zustand blockiert oder Ladungsungleichgewicht.",
        recoveryLabel: "Behebung",
        recovery: "Schnelles, hochfrequentes Farbblitzen (Stuck-Pixel-Zyklus) kann die Ausrichtung wieder lösen."
      },
      isoTitle: "ISO 9241-307 Panel-Fehlerklassen",
      isoP1: "Die meisten Monitore gehören zur Fehlerklasse 2. Nach ISO-Normen sind bis zu 2 dauerhaft helle, 2 dauerhaft dunkle oder 5 defekte Subpixel pro Million Pixel zulässig, bevor ein Gewährleistungsanspruch besteht.",
      isoP2: "Nutzen Sie bei neu gekauften Monitoren das gesetzliche Widerrufsrecht des Händlers (14–30 Tage), statt ein langwieriges Garantieverfahren einzuleiten.",
      testsTitle: "Diagnosetests starten",
      deadPixelTestTitle: "Pixelfehlertest",
      deadPixelTestDesc: "Vollbild-Farbflächen in Weiß und Grundfarben durchlaufen",
      stuckPixelTestTitle: "Subpixel-Fixer & Test",
      stuckPixelTestDesc: "Hochfrequentes Farbwechsel-Tool zur Reaktivierung"
    },
    ghostingConcept: {
      metaTitle: "Monitor-Ghosting prüfen – Reaktionszeit & Overdrive-Ratgeber",
      metaDescription: "Erfahren Sie, was Ghosting und inverses Ghosting (Corona) bedeuten, wie Reaktionszeiten geprüft und Overdrive optimiert wird.",
      breadcrumbsGuides: "Anleitungen",
      breadcrumbsTitle: "Ghosting & Bewegung",
      eyebrow: "BILDSCHIRM-LEITFADEN & BEWEGUNGSSCHÄRFE",
      title: "Monitor-Ghosting und Bewegungsschärfe richtig prüfen",
      intro: "Ghosting entsteht, wenn Flüssigkristalle zu lange für den Farb- oder Helligkeitswechsel benötigen. Das Erkennen der visuellen Symptome hilft Ihnen, den Overdrive Ihres Monitors optimal einzustellen.",
      standardGhosting: {
        title: "Standard-Ghosting (Dunkler Nachzieheffekt)",
        desc: "Ein unscharfer, dunkler oder verwaschener Schweif hinter bewegten Objekten auf kontrastreichen Hintergründen.",
        causeLabel: "Hauptursache",
        cause: "Zu langsame Grau-zu-Grau (GtG) Schaltzeiten. Häufig bei VA-Panels bei dunklen Übergängen.",
        solutionLabel: "Lösung",
        solution: "Erhöhen Sie im Monitor-OSD die Overdrive- / Trace-Free- / AMA-Einstellung um eine Stufe."
      },
      inverseGhosting: {
        title: "Inverses Ghosting (Corona / Überschwinger)",
        desc: "Ein heller, leuchtender oder invertierter Heiligenschein hinter bewegten Objekten.",
        causeLabel: "Hauptursache",
        cause: "Zu hohe Overdrive-Spannung schießt über die Zielfarbe hinaus (Overshoot).",
        solutionLabel: "Lösung",
        solution: "Verringern Sie die Overdrive-Stufe. Vermeiden Sie 'Extreme' oder 'Fastest' außer bei maximaler Bildwiederholrate."
      },
      howToTestTitle: "Bewegungsschärfe im Browser testen",
      howToTestP1: "Öffnen Sie unsere Ghosting- und Bewegungsunschärfe-Tests im Vollbild. Fixieren Sie ein bewegtes Objekt mit den Augen. Zieht es einen dunklen Schlieren nach, ist Overdrive zu niedrig. Leuchtet ein heller Kranz, ist Overdrive zu hoch.",
      howToTestP2: "Wichtiger Hinweis: Browsertests liefern hervorragende optische Anhaltspunkte, doch echte Millisekunden-Messungen (GtG) erfordern Fotodioden-Oszilloskope.",
      testsTitle: "Zugehörige Diagnosetests",
      ghostingTestTitle: "Ghosting-Test",
      ghostingTestDesc: "Kontrastreiche bewegte Blöcke in verschiedenen Geschwindigkeiten",
      refreshRateTestTitle: "Bildwiederholfrequenz-Test",
      refreshRateTestDesc: "Messen Sie Frametiming und Animationsflüssigkeit im Browser"
    },
    backlightBleedConcept: {
      metaTitle: "Backlight Bleed vs IPS Glow – Testen im dunklen Raum",
      metaDescription: "Unterscheiden Sie echte Lichthöfe (Backlight Bleed) vom normalen IPS Glow, lernen Sie die Dunkelkammer-Methode und Reklamationsgründe kennen.",
      breadcrumbsGuides: "Anleitungen",
      breadcrumbsTitle: "Backlight Bleed",
      eyebrow: "BILDSCHIRM-LEITFADEN & LUMINANZ",
      title: "Backlight Bleed vs IPS Glow: Erkennen & Diagnostizieren",
      intro: "Bei dunklen Filmszenen oder Spielen fallen an Ecken und Rändern oft helle Flecken auf. Vor einer Reklamation ist es entscheidend, mechanisches Backlight Bleed vom physikalischen IPS Glow zu unterscheiden.",
      backlightBleed: {
        badge: "Mechanischer Montagefehler",
        title: "Backlight Bleed (Lichthöfe)",
        desc: "Ungewollter Lichtaustritt hinter der LCD-Matrix durch ungleichmäßigen Rahmendruck, Spaltmaße oder verspannte Panel-Ecken.",
        behaviorLabel: "Verhalten",
        behavior: "Bleibt an exakt derselben Stelle und Helligkeit, egal aus welchem Winkel oder welcher Distanz Sie schauen.",
        appearanceLabel: "Erscheinungsbild",
        appearance: "Fleckige, weißliche oder gelbliche Lichtkegel, die von Rändern oder Ecken nach innen strahlen.",
        actionLabel: "Maßnahme",
        action: "Starkes Bleed, das den normalen Betrieb stört, rechtfertigt einen Umtausch beim Händler."
      },
      ipsGlow: {
        badge: "Normale optische Eigenschaft",
        title: "IPS Glow",
        desc: "Physikalisches Merkmal von In-Plane-Switching-Panels, bei dem Licht bei schrägen Betrachtungswinkeln reflektiert wird.",
        behaviorLabel: "Verhalten",
        behavior: "Ändert Intensität und Position oder verschwindet, wenn Sie den Kopf neigen oder weiter zurücktreten.",
        appearanceLabel: "Erscheinungsbild",
        appearance: "Ein sanfter silberner, goldener oder violetter Schimmer in den 4 Ecken auf dunklem Hintergrund.",
        actionLabel: "Maßnahme",
        action: "Auf fast jedem IPS-Monitor vorhanden; verringern Sie die Helligkeit und halten Sie eine Armlänge Abstand."
      },
      isolationMethodTitle: "Die Dunkelkammer-Isolationsmethode",
      isolationSteps: [
        "Dunkeln Sie den Raum vollständig ab, damit Spiegelungen dunkle Details nicht verdecken.",
        "Öffnen Sie unseren Backlight-Bleed-Test im Vollbildmodus.",
        "Stellen Sie die Bildschirmhelligkeit auf Ihr normales Arbeitsniveau (120–150 Nits, ca. 30–50 % OSD).",
        "Betrachten Sie die Ecken aus einer Armlänge. Treten Sie nun 2 Meter zurück und bewegen Sie den Kopf seitlich.",
        "Wandert das Licht mit der Kopfposition, ist es IPS Glow. Bleibt es starr an der Kante, ist es Backlight Bleed."
      ],
      testsTitle: "Diagnosetests durchführen",
      backlightBleedTestTitle: "Backlight-Bleed-Test",
      backlightBleedTestDesc: "Vollbild 0% Tiefschwarz mit Helligkeitsabgleich",
      uniformityTestTitle: "Bildschirm-Homogenitätstest",
      uniformityTestDesc: "Untersuchen Sie Grauflächen und Helligkeitsverteilung in Quadranten"
    }
  },

  pt: {
    pixelDefectsConcept: {
      metaTitle: "Pixel Morto vs Pixel Preso – Como diagnosticar e resolver",
      metaDescription: "Entenda as diferenças entre pixels mortos e subpixels presos, métodos de teste e políticas de garantia.",
      breadcrumbsGuides: "Guias",
      breadcrumbsTitle: "Pixels Mortos vs Presos",
      eyebrow: "GUIA DE TELA & ANÁLISE",
      title: "Pixel Morto vs Pixel Preso: Como Diferenciar",
      intro: "Defeitos de pixel são comuns em telas LCD e OLED. Saber se um pixel está permanentemente morto ou apenas preso determina se pode ser recuperado ou se qualifica para troca na garantia.",
      deadPixel: {
        badge: "Defeito Permanente",
        title: "Pixel Morto (Dead Pixel)",
        desc: "Um pixel cujo transistor falhou completamente, mantendo os três subpixels RGB permanentemente desligados.",
        appearanceLabel: "Aparência",
        appearance: "Aparece sempre como um ponto preto sobre fundos brancos e coloridos.",
        causeLabel: "Causa",
        cause: "Eletrodo quebrado, transistor de filme fino (TFT) danificado ou microtrilha rompida.",
        recoveryLabel: "Recuperação",
        recovery: "Falha física de hardware; não pode ser corrigida por software."
      },
      stuckPixel: {
        badge: "Potencialmente Recuperável",
        title: "Pixel Preso (Stuck Pixel)",
        desc: "Um pixel onde um ou dois subpixels (Vermelho, Verde ou Azul) permanecem energizados e não desligam.",
        appearanceLabel: "Aparência",
        appearance: "Um ponto brilhante vermelho, verde, azul, ciano ou magenta sobre fundos escuros ou pretos.",
        causeLabel: "Causa",
        cause: "Moléculas de cristal líquido temporariamente travadas ou desequilíbrio de carga.",
        recoveryLabel: "Recuperação",
        recovery: "Alternância rápida de cores em alta frequência pode destravar a orientação do cristal."
      },
      isoTitle: "Padrões ISO 9241-307 para Telas",
      isoP1: "A maioria dos monitores de consumo é classificada como Classe 2. Pelas normas ISO, fabricantes toleram até 2 pixels brilhantes, 2 escuros ou até 5 subpixels defeituosos por milhão antes de aceitarem troca em garantia.",
      isoP2: "Se encontrar defeitos no prazo inicial de devolução da loja (14 a 30 dias), devolva diretamente à loja em vez de acionar a garantia do fabricante.",
      testsTitle: "Executar Testes de Diagnóstico",
      deadPixelTestTitle: "Teste de Píxeis Mortos",
      deadPixelTestDesc: "Alterne telas inteiras em branco sólido e cores primárias",
      stuckPixelTestTitle: "Recuperador & Teste de Píxeis Presos",
      stuckPixelTestDesc: "Ferramenta de ciclagem rápida de subpixels RGB"
    },
    ghostingConcept: {
      metaTitle: "Como Testar Ghosting no Monitor – Tempo de Resposta e Overdrive",
      metaDescription: "Saiba o que é ghosting e ghosting inverso (coronas), como avaliar o tempo de resposta e calibrar o overdrive.",
      breadcrumbsGuides: "Guias",
      breadcrumbsTitle: "Ghosting & Movimento",
      eyebrow: "GUIA DE TELA & CLAREZA EM MOVIMENTO",
      title: "Como Verificar Ghosting e Clareza de Movimento no Monitor",
      intro: "O ghosting ocorre quando os cristais líquidos demoram para transitar entre cores ou níveis de brilho. Conhecer esses sinais permite ajustar o overdrive do monitor para a melhor nitidez.",
      standardGhosting: {
        title: "Ghosting Padrão (Rastro Escuro)",
        desc: "Um rastro borrado, escuro ou esfumaçado que segue objetos em movimento sobre fundos contrastantes.",
        causeLabel: "Causa Principal",
        cause: "Tempo de resposta Cinza para Cinza (GtG) lento. Comum em painéis VA em transições escuras.",
        solutionLabel: "Solução",
        solution: "Aumente um nível o ajuste de Overdrive / Trace Free / AMA no menu do monitor."
      },
      inverseGhosting: {
        title: "Ghosting Inverso (Coronas / Overshoot)",
        desc: "Um halo brilhante, com cores invertidas ou iluminadas que persegue objetos em movimento.",
        causeLabel: "Causa Principal",
        cause: "Tensão excessiva de overdrive empurrando os cristais além da cor pretendida (overshoot).",
        solutionLabel: "Solução",
        solution: "Diminua o Overdrive. Evite modos 'Extremo' ou 'Mais Rápido' exceto na taxa máxima de atualização."
      },
      howToTestTitle: "Como Testar Clareza de Movimento no Navegador",
      howToTestP1: "Abra nossos testes de Ghosting e Desfoque de Movimento em tela cheia. Fixe o olhar num bloco móvel. Se deixar rastro escuro, o overdrive está baixo. Se houver um halo brilhante, o overdrive está agressivo demais.",
      howToTestP2: "Limitação Importante: Testes no navegador fornecem excelente guia visual, mas medições exatas em milissegundos (GtG) exigem osciloscópios com fotodiodos especializados.",
      testsTitle: "Testes de Diagnóstico Relacionados",
      ghostingTestTitle: "Teste de Ghosting",
      ghostingTestDesc: "Blocos em movimento de alto contraste em várias velocidades",
      refreshRateTestTitle: "Teste de Taxa de Atualização",
      refreshRateTestDesc: "Meça a fluidez e os intervalos de quadros do navegador"
    },
    backlightBleedConcept: {
      metaTitle: "Vazamento de Luz vs IPS Glow – Guia em Quarto Escuro",
      metaDescription: "Diferencie vazamento de luz no backlight do IPS glow natural, aprenda a testar no escuro e saiba quando solicitar troca.",
      breadcrumbsGuides: "Guias",
      breadcrumbsTitle: "Vazamento de Luz",
      eyebrow: "GUIA DE TELA & LUMINÂNCIA",
      title: "Vazamento de Luz (Backlight Bleed) vs IPS Glow: Diagnóstico",
      intro: "Ao exibir cenas escuras num monitor LCD, imperfeições luminosas podem surgir nos cantos ou bordas. Diferenciar vazamentos mecânicos de luz do brilho óptico IPS é indispensável antes de acionar o RMA.",
      backlightBleed: {
        badge: "Defeito de Montagem de Hardware",
        title: "Vazamento de Luz (Backlight Bleed)",
        desc: "Luz escapando atrás da matriz LCD por pressão desigual do aro externo, folgas ou cantos pressionados.",
        behaviorLabel: "Comportamento",
        behavior: "Permanece fixo exatamente no mesmo ponto e na mesma intensidade independentemente do ângulo de visão.",
        appearanceLabel: "Aparência",
        appearance: "Manchas irregulares esbranquiçadas ou amareladas espalhando-se a partir das bordas ou cantos.",
        actionLabel: "Ação",
        action: "Vazamento severo que atrapalhe o uso normal justifica a troca com o vendedor."
      },
      ipsGlow: {
        badge: "Característica Óptica Normal",
        title: "IPS Glow",
        desc: "Fenômeno óptico próprio de telas In-Plane Switching onde a luz reflete sob ângulos de visualização amplos.",
        behaviorLabel: "Comportamento",
        behavior: "Muda de intensidade, muda de posição ou desaparece ao mover a cabeça ou dar passos para trás.",
        appearanceLabel: "Aparência",
        appearance: "Um brilho suave prateado, dourado ou violeta visível nos 4 cantos sobre fundos escuros.",
        actionLabel: "Ação",
        action: "Presente em quase todos os painéis IPS; amenize reduzindo o brilho e mantendo distância de um braço."
      },
      isolationMethodTitle: "O Método de Teste de Isolamento",
      isolationSteps: [
        "Apague completamente as luzes do cômodo para que reflexos não mascarem detalhes escuros.",
        "Abra nosso teste de vazamento de luz em tela cheia.",
        "Ajuste o brilho do monitor para seu nível de trabalho padrão (120-150 nits, cerca de 30-50% no OSD).",
        "Observe os cantos à distância de um braço. Recue 2 metros e balance a cabeça de um lado para o outro.",
        "Se a luz se deslocar com seu olhar, é IPS glow. Se permanecer ancorada na moldura, é vazamento de luz."
      ],
      testsTitle: "Executar Testes de Diagnóstico",
      backlightBleedTestTitle: "Teste de Vazamento de Luz",
      backlightBleedTestDesc: "Padrão preto puro 0% em tela cheia com ajuste de brilho",
      uniformityTestTitle: "Teste de Uniformidade de Tela",
      uniformityTestDesc: "Inspecione tons de cinza e consistência de iluminação por quadrantes"
    }
  },

  ja: {
    pixelDefectsConcept: {
      metaTitle: "ドット抜け vs 輝点（スタックピクセル）– 診断と対策ガイド",
      metaDescription: "ドット抜け（黒点）と輝点（スタックピクセル）の違い、見分け方、メーカーの保証基準を分かりやすく解説します。",
      breadcrumbsGuides: "ガイド",
      breadcrumbsTitle: "ドット抜け vs 輝点",
      eyebrow: "ディスプレイガイド＆解析",
      title: "ドット抜け vs 輝点（スタックピクセル）：見分け方と違い",
      intro: "液晶やOLEDパネルで最も身近な欠陥がピクセル不良です。異常なドットが完全に機能停止した「ドット抜け（黒点）」なのか、一時的な「輝点（スタックピクセル）」なのかを見極めることで、修復の可能性や初期不良交換の判断ができます。",
      deadPixel: {
        badge: "恒久的なハードウェア欠陥",
        title: "ドット抜け（黒点 / Dead Pixel）",
        desc: "トランジスタが完全に故障し、RGB3色のサブピクセルが常に消灯（無通電）状態のピクセルです。",
        appearanceLabel: "見え方",
        appearance: "白やカラー背景上で、常に真っ黒な点として見えます。",
        causeLabel: "原因",
        cause: "電極の断線、薄膜トランジスタ（TFT）の破損、微細配線のショートなど。",
        recoveryLabel: "修復性",
        recovery: "物理的な回路故障のため、ソフトウェアによる点滅サイクルでは直りません。"
      },
      stuckPixel: {
        badge: "修復の可能性あり",
        title: "輝点（スタックピクセル / Stuck Pixel）",
        desc: "特定のサブピクセル（赤・緑・青）が通電状態のまま固定され、オフにできなくなったピクセルです。",
        appearanceLabel: "見え方",
        appearance: "黒や暗い背景上で、赤・緑・青・シアン・マゼンタなどに常時点灯して見えます。",
        causeLabel: "原因",
        cause: "液晶分子が一時的にオープン状態で固着している、または電荷の偏り。",
        recoveryLabel: "修復性",
        recovery: "高速なRGBカラー切り替えサイクルにより、分子の配向が復帰する場合があります。"
      },
      isoTitle: "ISO 9241-307 パネル欠陥基準",
      isoP1: "一般的な市販モニターの多くは「クラス2」に分類されます。ISO規格では、100万画素あたり常時点灯ドット2個、常時消灯ドット2個、または不良サブピクセル5個までは許容範囲とされ、無償修理の対象外となることがあります。",
      isoP2: "購入直後にドット不良を発見した場合は、メーカー保証申請ではなく、販売店の初期不良返品・交換期間（通常14〜30日間）を利用することをお勧めします。",
      testsTitle: "診断テストを実行",
      deadPixelTestTitle: "ドット抜けテスト",
      deadPixelTestDesc: "全画面の白や原色背景を順に切り替えて目視チェック",
      stuckPixelTestTitle: "輝点修復＆テスト",
      stuckPixelTestDesc: "高速RGBフラッシュによるサブピクセル刺激ツール"
    },
    ghostingConcept: {
      metaTitle: "モニターのゴースト確認方法 – 応答速度とオーバードライブ設定",
      metaDescription: "ゴーストと逆ゴースト（オーバーシュート/コロナ）の違い、応答速度の確認法、最適なオーバードライブ調整を解説します。",
      breadcrumbsGuides: "ガイド",
      breadcrumbsTitle: "ゴースト＆応答速度",
      eyebrow: "ディスプレイガイド＆モーション明瞭度",
      title: "モニターのゴースト現象と動画のキレを確認する方法",
      intro: "モニターのゴーストは、液晶分子が色や輝度を切り替えるのに時間がかかることで発生します。視覚的な症状を見極めることで、モニターのオーバードライブ設定を最適に調整できます。",
      standardGhosting: {
        title: "通常のゴースト（暗い引きずり残像）",
        desc: "動く物体の後方に、暗くぼやけた尾を引くような残像が現れる現象です。",
        causeLabel: "主な原因",
        cause: "中間階調（GtG）応答速度の遅さ。特にVAパネルの暗い階調変化で顕著です。",
        solutionLabel: "対処法",
        solution: "モニターのOSD設定で「オーバードライブ / Trace Free / AMA」を1段階上げてください。"
      },
      inverseGhosting: {
        title: "逆ゴースト（コロナ / オーバーシュート）",
        desc: "動く物体の輪郭後方に、白く発光したり色が反転した輪郭が残る現象です。",
        causeLabel: "主な原因",
        cause: "オーバードライブ電圧が過剰で、目標の色を飛び越えてしまう現象（オーバーシュート）。",
        solutionLabel: "対処法",
        solution: "オーバードライブ設定を1段階下げてください。最高リフレッシュレート時以外は「Extreme」や「Fastest」を避けてください。"
      },
      howToTestTitle: "ブラウザで動画明瞭度をチェックする方法",
      howToTestP1: "全画面でゴースト・モーションブラーテストを開き、画面を横切る図形を目で追ってください。後方に黒い尾を引く場合はオーバードライブが弱すぎ、白い発光輪郭が出る場合は強すぎます。",
      howToTestP2: "測定に関する注記: ブラウザテストは設定調整の優れた視覚的基準になりますが、正確なミリ秒単位のGtG計測には専用のフォトダイオードオシロスコープが必要です。",
      testsTitle: "関連診断テスト",
      ghostingTestTitle: "ゴーストテスト",
      ghostingTestDesc: "異なる速度で移動する高コントラストブロックを追跡",
      refreshRateTestTitle: "リフレッシュレートテスト",
      refreshRateTestDesc: "ブラウザのフレーム間隔と描画の滑らかさを測定"
    },
    backlightBleedConcept: {
      metaTitle: "バックライト漏れ vs IPSグロー – 暗室での正しい見分け方",
      metaDescription: "本物のバックライト漏れとIPSパネル特有のIPSグローの違い、暗室診断法、初期不良交換の判断基準を解説します。",
      breadcrumbsGuides: "ガイド",
      breadcrumbsTitle: "バックライト漏れ",
      eyebrow: "ディスプレイガイド＆輝度",
      title: "バックライト漏れ vs IPSグロー：見分け方と診断法",
      intro: "液晶モニターで暗い映画やゲームを映すと、画面の四隅や縁に光が漏れているように見えることがあります。初期不良交換（RMA）を申し出る前に、構造的な漏光とIPS特有の光沢を見分けることが重要です。",
      backlightBleed: {
        badge: "ハードウェア組み立て不良",
        title: "バックライト漏れ（Backlight Bleed）",
        desc: "ベゼルの不均一な圧力やフレームの歪み、パネル四隅の挟み込みによって液晶の隙間から光が漏れる現象です。",
        behaviorLabel: "挙動の特徴",
        behavior: "見る角度や視点の距離を変えても、全く同じ位置と明るさで固定されています。",
        appearanceLabel: "見え方",
        appearance: "ベゼル端や四隅から内側に向かって差し込むギザギザした白や黄色の光だまり。",
        actionLabel: "対応策",
        action: "通常使用時にも気になる重度の漏れは、販売店での初期不良交換対象になります。"
      },
      ipsGlow: {
        badge: "正常な光学特性",
        title: "IPSグロー（IPS Glow）",
        desc: "IPS（In-Plane Switching）液晶パネルの構造上、斜めから見たときに光が散乱して反射する光学現象です。",
        behaviorLabel: "挙動の特徴",
        behavior: "首を傾けたり画面から離れると、光の強さが変わる、位置が動く、または完全に消えます。",
        appearanceLabel: "見え方",
        appearance: "暗い画面の四隅に現れる、銀色・金色・紫がかった淡く柔らかな光沢。",
        actionLabel: "対応策",
        action: "ほぼすべてのIPSモニターに存在します。輝度を下げ、腕1本分の視距離を確保することで低減できます。"
      },
      isolationMethodTitle: "確実な見極め手順（暗室テスト）",
      isolationSteps: [
        "部屋の照明を完全に消し、外光の映り込みをなくします。",
        "全画面バックライト漏れテストを開きます。",
        "モニター輝度を普段の作業レベル（120〜150cd/m²、OSDで30〜50%程度）に設定します。",
        "腕1本分の距離から四隅を見ます。次に2メートル後ろに下がり、頭を左右に動かします。",
        "頭の位置に合わせて光が動くなら「IPSグロー」、枠の縁に固定されているなら「バックライト漏れ」です。"
      ],
      testsTitle: "診断テストを実行",
      backlightBleedTestTitle: "バックライト漏れテスト",
      backlightBleedTestDesc: "輝度キャリブレーション付き全画面0%純黒パターン",
      uniformityTestTitle: "画面均一性テスト",
      uniformityTestDesc: "各分割エリアにおけるグレー階調と明るさのムラを確認"
    }
  },

  ko: {
    pixelDefectsConcept: {
      metaTitle: "데드 픽셀 vs 스턱 픽셀 – 모니터 불량 화소 구별 및 해결법",
      metaDescription: "완전히 꺼진 데드 픽셀과 켜져 있는 스턱 픽셀의 차이점, 점검 방법 및 제조사 보증 기준을 확인하세요.",
      breadcrumbsGuides: "가이드",
      breadcrumbsTitle: "데드 vs 스턱 픽셀",
      eyebrow: "디스플레이 가이드 & 분석",
      title: "데드 픽셀 vs 스턱 픽셀: 차이점과 정확한 구별법",
      intro: "픽셀 결함은 LCD 및 OLED 패널에서 가장 흔한 불량입니다. 이상이 있는 픽셀이 완전히 죽은 픽셀인지, 아니면 멈춰 있는 픽셀인지 구분해야 복구 시도를 하거나 보증 교환을 받을 수 있습니다.",
      deadPixel: {
        badge: "영구적 결함",
        title: "데드 픽셀 (Dead Pixel / 암점)",
        desc: "트랜지스터가 완전히 고장나 3개의 RGB 서브픽셀이 영구적으로 꺼진(전력 차단) 픽셀입니다.",
        appearanceLabel: "외관",
        appearance: "흰색 및 유채색 배경에서 항상 새까만 점으로 나타납니다.",
        causeLabel: "원인",
        cause: "전극 파손, 박막 트랜지스터(TFT) 고장 또는 미세 배선 단선.",
        recoveryLabel: "복구 여부",
        recovery: "하드웨어 물리적 손상으로 소프트웨어 재생으로는 고칠 수 없습니다."
      },
      stuckPixel: {
        badge: "복구 가능성 있음",
        title: "스턱 픽셀 (Stuck Pixel / 휘점)",
        desc: "하나 이상의 서브픽셀(빨강, 초록, 파랑)이 계속 켜져 있어 꺼지지 않는 픽셀입니다.",
        appearanceLabel: "외관",
        appearance: "어둡거나 검은 배경에서 빨강, 초록, 파랑, 시안, 마젠타의 밝은 점으로 보입니다.",
        causeLabel: "원인",
        cause: "액정 분자가 열린 상태로 일시적으로 고착되었거나 전하 불균형 발생.",
        recoveryLabel: "복구 여부",
        recovery: "고주파 색상 깜빡임(스턱 픽셀 사이클러)을 통해 액정 방향을 되돌릴 수 있습니다."
      },
      isoTitle: "ISO 9241-307 패널 불량 화소 기준",
      isoP1: "시중의 대다수 일반 모니터는 클래스 2 패널에 해당합니다. ISO 규격상 100만 픽셀당 밝은 점 2개, 어두운 점 2개, 또는 서브픽셀 불량 5개까지는 불량 화소 교환 사유로 인정되지 않을 수 있습니다.",
      isoP2: "모니터 수령 후 초기 반품 기간(보통 14~30일) 내에 불량을 발견했다면 제조사 AS보다 구매처 초기 불량 교환이나 반품을 진행하는 것이 안전합니다.",
      testsTitle: "진단 테스트 실행",
      deadPixelTestTitle: "불량 화소 테스트",
      deadPixelTestDesc: "전체 화면 흰색 및 원색 배경을 전환하며 정밀 확인",
      stuckPixelTestTitle: "스턱 픽셀 복구 & 테스트",
      stuckPixelTestDesc: "고주파 RGB 서브픽셀 사이클링 복구 도구"
    },
    ghostingConcept: {
      metaTitle: "모니터 잔상(고스팅) 점검법 – 응답 속도 및 오버드라이브 설정",
      metaDescription: "고스팅과 역잔상(역고스팅/코로나) 현상, 응답 속도 확인법 및 오버드라이브 최적화 팁을 알아봅니다.",
      breadcrumbsGuides: "가이드",
      breadcrumbsTitle: "잔상 & 모션",
      eyebrow: "디스플레이 가이드 & 모션 선명도",
      title: "모니터 잔상(Ghosting)과 모션 선명도 확인 방법",
      intro: "모니터 잔상은 액정이 한 색상이나 밝기에서 다른 상태로 전환하는 데 시간이 너무 오래 걸릴 때 발생합니다. 증상을 정확히 이해하면 오버드라이브 설정을 최적화하여 깔끔한 화면을 얻을 수 있습니다.",
      standardGhosting: {
        title: "일반 잔상 (어두운 끌림 현상)",
        desc: "대비되는 배경에서 움직이는 물체 뒤로 어둡거나 번진 자국이 따라다니는 현상입니다.",
        causeLabel: "주요 원인",
        cause: "느린 Gray-to-Gray (GtG) 응답 속도. VA 패널의 어두운 전환에서 흔히 나타납니다.",
        solutionLabel: "해결 방법",
        solution: "모니터 OSD 메뉴에서 Overdrive / Trace Free / AMA 설정을 한 단계 높이세요."
      },
      inverseGhosting: {
        title: "역잔상 (역고스팅 / 오버슈트)",
        desc: "움직이는 물체 뒤로 하얗거나 반전된 색상의 밝은 테두리가 생기는 현상입니다.",
        causeLabel: "주요 원인",
        cause: "과도한 오버드라이브 전압으로 인해 액정이 목표 색상을 지나쳐 버리는 오버슈트 현상.",
        solutionLabel: "해결 방법",
        solution: "오버드라이브 설정을 낮추세요. 최고 주사율로 구동하지 않는 한 'Extreme'이나 '가장 빠름' 모드는 피하세요."
      },
      howToTestTitle: "브라우저에서 모션 선명도를 테스트하는 법",
      howToTestP1: "전체 화면으로 고스팅 및 모션 블러 테스트를 실행하세요. 화면을 가로지르는 물체에 시선을 고정하세요. 뒤에 어두운 끌림이 남으면 오버드라이브가 너무 낮고, 밝은 빛무리가 생기면 너무 높습니다.",
      howToTestP2: "중요한 한계: 브라우저 테스트는 최적 설정을 위한 훌륭한 시각적 지표를 제공하지만, 밀리초(ms) 단위의 실제 GtG 측정은 전용 오실로스코프 장비가 필요합니다.",
      testsTitle: "관련 진단 테스트",
      ghostingTestTitle: "고스팅(잔상) 테스트",
      ghostingTestDesc: "다양한 속도로 움직이는 고대비 블록 추적",
      refreshRateTestTitle: "주사율(Refresh Rate) 테스트",
      refreshRateTestDesc: "브라우저 프레임 타이밍 및 애니메이션 부드러움 측정"
    },
    backlightBleedConcept: {
      metaTitle: "빛샘(Backlight Bleed) vs IPS 글로우 – 암실 구별 가이드",
      metaDescription: "하드웨어 조립 결함인 빛샘과 정상적인 광학 특성인 IPS 글로우의 차이점, 암실 진단법을 설명합니다.",
      breadcrumbsGuides: "가이드",
      breadcrumbsTitle: "빛샘 현상",
      eyebrow: "디스플레이 가이드 & 휘도",
      title: "빛샘(Backlight Bleed) vs IPS 글로우: 판별 및 진단 가이드",
      intro: "LCD 모니터에서 어두운 화면을 볼 때 모서리나 베젤 가장자리에서 빛이 새어 나오는 경우가 많습니다. AS 교환을 신청하기 전에 구조적 빛샘인지 정상적인 IPS 글로우인지 구별해야 합니다.",
      backlightBleed: {
        badge: "하드웨어 조립 불량",
        title: "빛샘 (Backlight Bleed)",
        desc: "베젤 압력 불균형, 프레임 유격 또는 패널 모서리 눌림으로 인해 LCD 패널 뒤에서 빛이 새는 현상입니다.",
        behaviorLabel: "동작 특성",
        behavior: "바라보는 각도나 거리에 상관없이 정확히 동일한 위치와 밝기로 고정되어 있습니다.",
        appearanceLabel: "외관",
        appearance: "가장자리나 모서리에서 안쪽으로 번져 나오는 뾰족하고 불규칙한 노란색/흰색 빛줄기.",
        actionLabel: "조치 방법",
        action: "일반 사용 중에도 방해될 정도의 심한 빛샘은 초기 불량 교환 사유에 해당합니다."
      },
      ipsGlow: {
        badge: "정상적인 광학적 특성",
        title: "IPS 글로우 (IPS Glow)",
        desc: "In-Plane Switching(IPS) 액정 패널의 특성상 넓은 시야각에서 빛이 반사되어 나타나는 자연스러운 광학 현상입니다.",
        behaviorLabel: "동작 특성",
        behavior: "고개를 기울이거나 모니터에서 뒤로 물러나면 빛의 강도가 변하거나 위치가 이동하며 사라집니다.",
        appearanceLabel: "외관",
        appearance: "어두운 화면의 네 모서리 부근에 은은하게 퍼지는 은색, 황색, 보라색 광채.",
        actionLabel: "조치 방법",
        action: "거의 모든 IPS 패널에 존재합니다. 모니터 밝기를 낮추고 팔 한 뼘 정도의 시청 거리를 유지하면 줄어듭니다."
      },
      isolationMethodTitle: "암실 격리 테스트 방법",
      isolationSteps: [
        "반사광이 어두운 디테일을 가리지 않도록 방 안의 조명을 완전히 끕니다.",
        "전체 화면 빛샘 테스트를 실행합니다.",
        "모니터 밝기를 평소 작업 수준(120~150nit, OSD 30~50% 내외)으로 맞춥니다.",
        "한 팔 거리에서 모서리를 본 후, 2미터 뒤로 물러서서 고개를 좌우로 움직여 봅니다.",
        "머리 위치에 따라 빛이 변하면 IPS 글로우이고, 베젤 테두리에 그대로 고정되어 있으면 빛샘입니다."
      ],
      testsTitle: "진단 테스트 실행",
      backlightBleedTestTitle: "빛샘 테스트",
      backlightBleedTestDesc: "밝기 캘리브레이션이 포함된 전체 화면 0% 순수 블랙 패턴",
      uniformityTestTitle: "화면 균일도 테스트",
      uniformityTestDesc: "화면 사분면 전반의 회색조 및 휘도 균일도 점검"
    }
  }
};

const messagesDir = path.resolve('messages');
const locales = ['en', 'hi', 'es', 'fr', 'de', 'pt', 'ja', 'ko'];

for (const loc of locales) {
  const filePath = path.join(messagesDir, `${loc}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`Missing ${filePath}`);
    continue;
  }
  const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!fileContent.Guides) {
    fileContent.Guides = {};
  }
  const t = TRANSLATIONS[loc] || TRANSLATIONS['en'];
  fileContent.Guides.pixelDefectsConcept = {
    ...fileContent.Guides.pixelDefectsConcept,
    ...t.pixelDefectsConcept
  };
  fileContent.Guides.ghostingConcept = {
    ...fileContent.Guides.ghostingConcept,
    ...t.ghostingConcept
  };
  fileContent.Guides.backlightBleedConcept = {
    ...fileContent.Guides.backlightBleedConcept,
    ...t.backlightBleedConcept
  };

  fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2) + '\n', 'utf8');
  console.log(`Updated ${loc}.json with complete Guides translations.`);
}
