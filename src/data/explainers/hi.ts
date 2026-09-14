import { ExplainerData, ExplainerLabels } from "./types";

export const HI_LABELS: ExplainerLabels = {
  overviewHeading: "डिस्प्ले परीक्षण अवलोकन",
  whatToLookForHeading: "परीक्षण के दौरान क्या देखें",
  boundariesHeading: "मापन सीमाएं और तकनीकी ईमानदारी",
  canObserveLabel: "Screen Tester क्या देख और जांच सकता है",
  cannotMeasureLabel: "ब्राउज़र में क्या सटीक रूप से नहीं मापा जा सकता",
  interpretationHeading: "अवलोकन परिणामों का विश्लेषण",
  nextStepsHeading: "अनुशंसित अगले कदम",
};

export const HI_EXPLAINERS: Record<string, ExplainerData> = {
  "dead-pixel-test": {
    overview: "डेड पिक्सेल एक स्थायी रूप से बंद लिक्विड क्रिस्टल सब-पिक्सेल या OLED उत्सर्जक होता है जो सिग्नल मिलने पर भी पूरी तरह काला रहता है। शुद्ध सफेद, सियान और पीले जैसे चमकीले बैकग्राउंड पर यह एक स्थिर काले बिंदु के रूप में दिखता है।",
    whatToLookFor: [
      {
        label: "चमकीली स्क्रीन पर स्थिर काला बिंदु",
        description: "चमकदार रंगों को बदलते समय भी यदि कोई बिंदु लगातार काला रहता है, तो वह एक डेड पिक्सेल है।"
      },
      {
        label: "धूल और डेड पिक्सेल में अंतर",
        description: "स्क्रीन पर जमी धूल देखने का कोण बदलने पर अपनी जगह बदलती है और पोंछी जा सकती है, जबकि डेड पिक्सेल स्क्रीन के अंदर होता है।"
      },
      {
        label: "सब-पिक्सेल बनाम पूरा पिक्सेल दोष",
        description: "यदि केवल एक सब-पिक्सेल (लाल, हरा या नीला) खराब है, तो वह बिंदु पूरी तरह काले के बजाय थोड़ा रंगहीन दिखाई देगा।"
      },
      {
        label: "पिक्सेल क्लस्टर खराबी",
        description: "एक ही जगह पर कई डेड पिक्सेल का होना एक गंभीर पैनल दोष है और आमतौर पर वारंटी के तहत तुरंत बदले जाने योग्य होता है।"
      }
    ],
    canObserve: [
      "ठोस प्राथमिक और द्वितीयक रंगों पर बंद पिक्सेल की दृश्य पहचान",
      "स्क्रीन पर संदिग्ध काले बिंदुओं के सटीक निर्देशांक और गिनती",
      "बैकग्राउंड की चमक और बंद सब-पिक्सेल के बीच दृश्य कंट्रास्ट"
    ],
    cannotMeasure: [
      "TFT ट्रांजिस्टर की आंतरिक विद्युत निरंतरता या वोल्टेज स्तर",
      "मानवीय आंखों की जांच के बिना ब्राउज़र द्वारा स्वचालित पहचान",
      "कांच की परतों के नीचे भौतिक निर्माण दोषों का आंतरिक विश्लेषण"
    ],
    interpretation: "डेड पिक्सेल निर्माण के दौरान ट्रांजिस्टर की खराबी से होते हैं। अधिकांश निर्माता ISO 9241-307 क्लास 2 मानक का पालन करते हैं, जिसमें प्रति 10 लाख पिक्सेल पर 2 से 5 दोष स्वीकार्य माने जाते हैं।",
    nextSteps: {
      text: "यदि कोई पिक्सेल काले के बजाय किसी रंग में लगातार जल रहा है, तो हमारे रिपेयर टूल का उपयोग करें।",
      actionLabel: "Stuck Pixel Fixer खोलें",
      actionHref: "/tests/stuck-pixel-fixer"
    }
  },

  "stuck-pixel-test": {
    overview: "डेड पिक्सेल के विपरीत, स्टक पिक्सेल (अटका हुआ पिक्सेल) खुली अवस्था में फंसा हुआ सब-पिक्सेल होता है जिससे बैकलाइट लगातार निकलती रहती है। यह काले बैकग्राउंड पर लाल, हरे, नीले, सियान या सफेद बिंदु के रूप में चमकता है।",
    whatToLookFor: [
      {
        label: "काले बैकग्राउंड पर चमकता हुआ रंगीन बिंदु",
        description: "कमरे में अंधेरा करके काली स्क्रीन देखें। लाल, हरे या नीले रंग में लगातार चमकने वाला बिंदु एक स्टक पिक्सेल है।"
      },
      {
        label: "पूरक रंगों पर परीक्षण",
        description: "हरा अटका पिक्सेल हरे बैकग्राउंड पर छिप जाएगा, लेकिन लाल, नीले या काले बैकग्राउंड पर साफ चमकेगा।"
      },
      {
        label: "सफेद रंग में अटका पिक्सेल",
        description: "यदि RGB तीनों सब-पिक्सेल एक साथ खुले रह जाएं, तो गहरे बैकग्राउंड पर सफेद बिंदु दिखाई देगा।"
      },
      {
        label: "बैकलाइट ब्लीड से अंतर",
        description: "स्टक पिक्सेल एक बारीक बिंदु होता है, जबकि बैकलाइट ब्लीड स्क्रीन के किनारों पर बादलों जैसा फैला हुआ प्रकाश होता है।"
      }
    ],
    canObserve: [
      "काले और पूरक बैकग्राउंड पर जलते हुए सब-पिक्सेल की दृश्य पहचान",
      "प्रभावित रंग चैनल (लाल, हरा या नीला) की अलग से पहचान",
      "स्क्रीन के किस भाग में दोष है उसका सटीक स्थान"
    ],
    cannotMeasure: [
      "लिक्विड क्रिस्टल अणुओं की रासायनिक चिपचिपाहट या भौतिक स्थिति",
      "ट्रांजिस्टर गेट की स्विचिंग गति या विद्युत प्रतिरोध",
      "लंबे समय तक देखे बिना दोष के हमेशा के लिए ठीक होने की गारंटी"
    ],
    interpretation: "स्टक पिक्सेल स्थिर बिजली या निर्माण विषमता के कारण क्रिस्टल के अटक जाने से होते हैं। इन्हें तेज रंग बदलने वाले दृश्यों से दोबारा चालू किया जा सकता है।",
    nextSteps: {
      text: "क्या कोई अटका हुआ पिक्सेल मिला? हमारे कलर एक्सरसाइज़र से उसे ठीक करने का प्रयास करें।",
      actionLabel: "Stuck Pixel Fixer आज़माएं",
      actionHref: "/tests/stuck-pixel-fixer"
    }
  },

  "stuck-pixel-fixer": {
    overview: "स्टक पिक्सेल फिक्सर उच्च गति वाले RGB रंग चक्र और दृश्य नॉइज़ पैटर्न का उपयोग करके फंसे हुए लिक्विड क्रिस्टल अणुओं को उत्तेजित करता है, जिससे वे पुनः सामान्य रूप से कार्य करने लगें।",
    whatToLookFor: [
      {
        label: "स्टिमुलेशन बॉक्स का सही स्थान",
        description: "पूरी स्क्रीन पर अनावश्यक चमक से बचने के लिए बॉक्स को सीधे अटके हुए पिक्सेल के ऊपर रखें।"
      },
      {
        label: "पैटर्न का चयन",
        description: "व्यापक उत्तेजना के लिए 'RGB साइकिल' और उच्च आवृत्ति के लिए 'कलर नॉइज़' का बारी-बारी से उपयोग करें।"
      },
      {
        label: "सत्र की अवधि",
        description: "इसे 15 से 30 मिनट तक चलने दें, फिर रोककर काली स्क्रीन पर जांचें कि क्या पिक्सेल ठीक हो गया है।"
      },
      {
        label: "प्रकाश संवेदनशीलता चेतावनी",
        description: "यदि चक्कर या आंखों में तनाव महसूस हो तो तुरंत बंद कर दें। फोटोसेंसिटिव मिर्गी के रोगी इसका उपयोग न करें।"
      }
    ],
    canObserve: [
      "ब्राउज़र में हाई-स्पीड RGB चक्र और रैंडम कलर नॉइज़ का सीधा प्रसारण",
      "प्रभावित हिस्से पर बॉक्स को रखने की सुविधा और टाइमर ट्रैकिंग",
      "सत्र से पहले और बाद में पिक्सेल की स्थिति की दृश्य पुष्टि"
    ],
    cannotMeasure: [
      "भौतिक रूप से जले हुए या टूटे हुए TFT ट्रांजिस्टर की मरम्मत",
      "सफलता की निश्चित गारंटी (यह पैनल की स्थिति पर निर्भर करता है)",
      "पूरी तरह बंद हो चुके डेड पिक्सेल (काले बिंदु) को दोबारा चालू करना"
    ],
    interpretation: "सॉफ्टवेयर केवल अस्थायी रूप से अटके क्रिस्टल पर ही काम करता है। यदि ट्रांजिस्टर आंतरिक रूप से टूट चुका है, तो केवल पैनल बदलकर ही समाधान संभव है।",
    nextSteps: {
      text: "सत्र पूरा होने के बाद, काली स्क्रीन पर स्टक पिक्सेल टेस्ट से दोबारा जांच करें।",
      actionLabel: "Stuck Pixel Test से जांचें",
      actionHref: "/tests/stuck-pixel-test"
    }
  },

  "refresh-rate-test": {
    overview: "रिफ्रेश रेट (हर्ट्ज़, Hz) यह बताता है कि स्क्रीन प्रति सेकंड कितनी बार छवि को ताज़ा करती है। यह टेस्ट ब्राउज़र के requestAnimationFrame API का उपयोग करके फ्रेम दर और स्थिरता को मापता है।",
    whatToLookFor: [
      {
        label: "मापी गई दर बनाम सेट की गई दर",
        description: "जांचें कि क्या मापा गया मान आपके मॉनिटर की सेटिंग (जैसे 60Hz, 120Hz, 144Hz, 240Hz) से मेल खाता है।"
      },
      {
        label: "फ्रेम स्थिरता (Frame Pacing)",
        description: "एक स्थिर 144Hz मॉनिटर पर फ्रेम लगभग 6.94 मिलीसेकंड के नियमित अंतराल पर आने चाहिए।"
      },
      {
        label: "ब्राउज़र का 60Hz पर सीमित होना",
        description: "यदि 144Hz स्क्रीन पर भी 60Hz दिखता है, तो पावर सेवर मोड या हार्डवेयर एक्सेलेरेशन की जांच करें।"
      },
      {
        label: "मूविंग बार की स्मूथनेस",
        description: "हाई रिफ्रेश रेट स्क्रीन पर मूविंग इंडिकेटर बिना किसी झटके या रुकावट के बहुत स्मूथ चलता है।"
      }
    ],
    canObserve: [
      "ब्राउज़र के requestAnimationFrame कॉल की आवृत्ति और समय का अंतर",
      "अनुमानित ब्राउज़र FPS और वर्टिकल सिंक स्थिरता",
      "सक्रिय टैब में विंडो कंपोजिटर का समन्वय"
    ],
    cannotMeasure: [
      "ब्राउज़र सीमाओं से परे पैनल की वास्तविक भौतिक हार्डवेयर रिफ्रेश दर",
      "DisplayPort या HDMI केबल की लिंक बैंडविड्थ",
      "ऑसिलोस्कोप स्तर के VBLANK सिग्नल अंतराल"
    ],
    interpretation: "वेब ब्राउज़र ऑपरेटिंग सिस्टम के कंपोजिटर के साथ तालमेल बिठाते हैं। अलग-अलग रिफ्रेश रेट वाले कई मॉनिटर जुड़े होने पर ब्राउज़र 60Hz पर सीमित हो सकता है।",
    nextSteps: {
      text: "क्या आपका गेमिंग मॉनिटर ब्राउज़र में 60Hz पर अटका हुआ है? समाधान गाइड देखें।",
      actionLabel: "रिफ्रेश रेट ट्रबलशूटिंग पढ़ें",
      actionHref: "/knowledge-base/troubleshooting#refresh-rate-capped"
    }
  },

  "ghosting-test": {
    overview: "घोस्टिंग का अर्थ है चलती हुई वस्तु के पीछे धुंधली परछाई या लकीर दिखाई देना। यह तब होता है जब लिक्विड क्रिस्टल को रंग बदलने में लगने वाला समय (रिस्पॉन्स टाइम) एक फ्रेम के समय से अधिक हो।",
    whatToLookFor: [
      {
        label: "काली परछाई (पारंपरिक घोस्टिंग)",
        description: "चलते हुए ब्लॉक के पीछे गहरा साया दिखना बताता है कि अंधेरे से उजाले में रंग बदलने की गति धीमी है (VA पैनल में आम)।"
      },
      {
        label: "चमकीला घेरा या कोरोना (उल्टा घोस्टिंग)",
        description: "वस्तु के पीछे सफेद या चमकीला साया दिखना यह दर्शाता है कि मॉनिटर का ओवरड्राइव बहुत अधिक आक्रामक है।"
      },
      {
        label: "रंग के आधार पर अलग रिस्पॉन्स टाइम",
        description: "देखें कि क्या लाल या गहरे स्लेटी बैकग्राउंड पर लकीरें अधिक खिंचती हैं।"
      },
      {
        label: "आंखों से पीछा करके देखना",
        description: "चलती हुई वस्तु का आंखों से पीछा करें ताकि रेटिना के प्राकृतिक ब्लर और पैनल के वास्तविक खिंचाव में फर्क समझ सकें।"
      }
    ],
    canObserve: [
      "अलग-अलग गति पर खिंचने वाली लकीरों और ओवरशूट कोरोना की दृश्य पुष्टि",
      "हल्के और गहरे रंगों के बीच बदलाव की गति में अंतर की तुलना",
      "मॉनिटर के OSD में ओवरड्राइव सेटिंग बदलने से दिखने वाला तत्काल प्रभाव"
    ],
    cannotMeasure: [
      "प्रयोगशाला मानकों के अनुसार मिलीसेकंड (ms) में सटीक GtG रिस्पॉन्स टाइम",
      "पर्स्यूट कैमरे द्वारा ली जाने वाली प्रकाश तीव्रता में गिरावट की माप",
      "सब-पिक्सेल लिक्विड क्रिस्टल का ड्राइविंग वोल्टेज"
    ],
    interpretation: "घोस्टिंग मुख्य रूप से पैनल तकनीक पर निर्भर करता है (TN तेज है, IPS संतुलित है, VA में गहरा खिंचाव होता है, OLED तुरंत प्रतिक्रिया देता है)। ओवरड्राइव को 'मीडियम' रखना सबसे अच्छा होता है।",
    nextSteps: {
      text: "ओवरड्राइव ट्यूनिंग और इनवर्स घोस्टिंग ठीक करने के बारे में विस्तार से पढ़ें।",
      actionLabel: "घोस्टिंग और मोशन ब्लर गाइड पढ़ें",
      actionHref: "/knowledge-base/monitor-ghosting-and-motion-blur"
    }
  },

  "motion-blur-test": {
    overview: "घोस्टिंग के विपरीत, आधुनिक डिस्प्ले पर मोशन ब्लर सैंपल-एंड-होल्ड तकनीक के कारण होता है: छवि अगले फ्रेम तक स्थिर रहती है, इसलिए आंखों द्वारा गति को ट्रैक करते समय रेटिना पर धुंधलापन बन जाता है।",
    whatToLookFor: [
      {
        label: "तेज गति पर विवरण का धुंधला होना",
        description: "चलती हुई रेखाओं और टेक्स्ट को देखें कि किस गति पर पहुंचने पर अक्षर आपस में मिलकर अस्पष्ट हो जाते हैं।"
      },
      {
        label: "गति की तुलना",
        description: "240 px/s और 960 px/s की तुलना करें और देखें कि गति बढ़ने के साथ मोशन ब्लर कैसे बढ़ता है।"
      },
      {
        label: "ब्लैक फ्रेम इंसर्शन (BFI) का प्रभाव",
        description: "यदि आपके मॉनिटर में बैकलाइट स्ट्रोबिंग (ULMB, DyAc, ELMB) है, तो उसे चालू करने पर चलती हुई वस्तुएं बेहद तीखी दिखने लगेंगी।"
      },
      {
        label: "OLED पर सैंपल-एंड-होल्ड ब्लर",
        description: "0.1ms के तुरंत रिस्पॉन्स टाइम वाले OLED पर भी बिना स्ट्रोबिंग के 60Hz/120Hz पर मोशन ब्लर दिखेगा।"
      }
    ],
    canObserve: [
      "अलग-अलग गति और रिफ्रेश रेट के अनुसार दिखने वाले धुंधलेपन का अंतर",
      "हार्डवेयर बैकलाइट स्ट्रोबिंग चालू करने पर स्पष्टता में होने वाला सुधार",
      "स्थिर किनारों की तीक्ष्णता और गतिमान किनारों के धुंधलेपन में फर्क"
    ],
    cannotMeasure: [
      "सटीक मिलीसेकंड में मूविंग पिक्चर रिस्पॉन्स टाइम (MPRT)",
      "मानव रेटिना का प्रकाश एकत्रीकरण वक्र",
      "बैकलाइट स्ट्रोबिंग का ड्यूटी साइकिल प्रतिशत"
    ],
    interpretation: "मोशन ब्लर को कम करने के लिए या तो रिफ्रेश रेट बढ़ाना आवश्यक है (हर फ्रेम का प्रदर्शन समय कम करना) या डार्क फ्रेम इंसर्शन (BFI) का उपयोग करना होता है।",
    nextSteps: {
      text: "जांचें कि कैसे उच्च रिफ्रेश रेट मोशन ब्लर को कम करता है।",
      actionLabel: "रिफ्रेश रेट टेस्ट खोलें",
      actionHref: "/tests/refresh-rate-test"
    }
  },

  "vrr-test": {
    overview: "वैरिएबल रिफ्रेश रेट (VRR: NVIDIA G-Sync, AMD FreeSync, VESA Adaptive-Sync) ग्राफिक्स कार्ड के फ्रेम तैयार होने की गति के अनुसार मॉनिटर के रिफ्रेश चक्र को तालमेल में रखता है ताकि स्क्रीन फटने और झटके से बचा जा सके।",
    whatToLookFor: [
      {
        label: "स्क्रीन टियरिंग (Screen Tearing)",
        description: "क्षैतिज दरारें देखें जहां स्क्रीन का ऊपरी और निचला हिस्सा अलग-अलग फ्रेम एक साथ दिखाते हैं।"
      },
      {
        label: "माइक्रो-स्टटर और झटके",
        description: "देखें कि क्या फ्रेम दर में उतार-चढ़ाव होने पर चलती हुई पट्टी बिना किसी अड़चन के सहज रूप से चलती है।"
      },
      {
        label: "विंडो मोड बनाम फुलस्क्रीन VRR",
        description: "कई जीपीयू ड्राइवर जब तक खास तौर पर सेट न किए जाएं, केवल फुलस्क्रीन में ही G-Sync या FreeSync सक्रिय करते हैं।"
      },
      {
        label: "लो फ्रेमरेट कंपन्सेशन (LFC)",
        description: "जब फ्रेम दर मॉनिटर की न्यूनतम सीमा (जैसे 48Hz से कम) से नीचे चली जाए, तो देखें कि क्या फ्रेम सहज रूप से दोहराए जाते हैं।"
      }
    ],
    canObserve: [
      "परिवर्तनशील फ्रेम दरों के तहत टियरिंग लाइनों और झटकों की दृश्य उपस्थिति",
      "फ्रेम गति में बदलाव के दौरान एनिमेशन की निरंतरता और सहजता",
      "विंडो मोड और फुलस्क्रीन मोड में प्रदर्शन का अंतर"
    ],
    cannotMeasure: [
      "GPU ड्राइवर और मॉनिटर स्केलर के बीच आंतरिक हार्डवेयर संचार",
      "G-Sync / FreeSync हार्डवेयर मॉड्यूल की सक्रिय स्थिति",
      "DisplayPort ऑक्सिलरी चैनल (AUX) पर रीयल-टाइम मेटा데이터"
    ],
    interpretation: "वेब ब्राउज़र ऑपरेटिंग सिस्टम के विंडो कंपोजिटर के तहत काम करता है, इसलिए VRR का चलना विंडोज़ हार्डवेयर एक्सेलेरेटेड जीपीयू शेड्यूलिंग (HAGS) और ड्राइवर सेटिंग्स पर निर्भर करता है।",
    nextSteps: {
      text: "VRR चालू होने पर भी झटके या टियरिंग दिख रही है? हमारी समाधान गाइड पढ़ें।",
      actionLabel: "VRR ट्रबलशूटिंग पढ़ें",
      actionHref: "/knowledge-base/troubleshooting#vrr-stutter-tearing"
    }
  },

  "backlight-bleed-test": {
    overview: "बैकलाइट ब्लीड एलसीडी स्क्रीन के कोनों या किनारों से बैकलाइट की रोशनी बाहर लीक होने की समस्या है। यह फुल-स्क्रीन ब्लैक टेस्ट आपको लाइट लीकेज पहचानने और इसे देखने के कोण पर निर्भर IPS ग्लो से अलग करने में मदद करता है।",
    whatToLookFor: [
      {
        label: "किनारों और कोनों से प्रकाश का रिसाव",
        description: "फ्रेम के किनारों पर पीली या सफेद रोशनी जो सिर हिलाने पर भी अपनी जगह नहीं बदलती।"
      },
      {
        label: "IPS ग्लो बनाम बैकलाइट ब्लीड",
        description: "सिर को इधर-उधर घुमाकर देखें: यदि कोण बदलने पर चमक की जगह या तीव्रता बदलती है, तो यह सामान्य IPS ग्लो है, कोई खराबी नहीं।"
      },
      {
        label: "क्लाउडिंग (बादलों जैसे धब्बे)",
        description: "डिफ्यूज़र शीट में दबाव के कारण स्क्रीन के बीच में असमान रूप से दिखने वाले हल्के सफेद धब्बे।"
      },
      {
        label: "OLED और Mini-LED से तुलना",
        description: "OLED में हर पिक्सेल खुद रोशनी देता है और 0 nits पर कोई ब्लीड नहीं होता। Mini-LED में रोशनी के इर्द-गिर्द थोड़ा प्रभामंडल दिख सकता है।"
      }
    ],
    canObserve: [
      "काले बैकग्राउंड पर किनारों से निकलने वाली रोशनी और दबाव बिंदुओं की दृश्य पहचान",
      "अंधेरे कमरे में कोनों से होने वाले प्रकाश रिसाव का स्तर",
      "दृष्टि कोण बदलने पर स्थिर ब्लीड और गतिशील IPS ग्लो के बीच अंतर"
    ],
    cannotMeasure: [
      "मापक उपकरण के बिना cd/m² (nits) में पैनल की सटीक चमक",
      "पैनल का मूल स्थिर कंट्रास्ट अनुपात (जैसे 1000:1 बनाम 3000:1)",
      "प्रमाणित ANSI 16-ज़ोन कंट्रास्ट अनुपात"
    ],
    interpretation: "हल्का IPS ग्लो विस्तृत व्यूइंग एंगल वाले IPS पैनल की स्वाभाविक विशेषता है। लेकिन किनारों पर तेज प्रकाश का रिसाव एक निर्माण दोष है जहां फ्रेम स्क्रीन को बहुत ज्यादा दबा रहा होता है।",
    nextSteps: {
      text: "IPS ग्लो, बैकलाइट ब्लीड और OLED के काले स्तरों के बीच के अंतर को समझें।",
      actionLabel: "बैकलाइट ब्लीड बनाम IPS ग्लो गाइड",
      actionHref: "/knowledge-base/backlight-bleed-vs-ips-glow"
    }
  },

  "near-black-test": {
    overview: "नियर-ब्लैक टेस्ट यह जांचता है कि डिस्प्ले काले रंग (0%) के ठीक ऊपर के बहुत गहरे स्लेटी शेड्स (0.5% से 5%) को कितनी अच्छी तरह दिखाता है। यदि मॉनिटर इन्हें दबाकर काला कर देता है (ब्लैक क्रश), तो फिल्मों और गेम्स में अंधेरे दृश्यों के विवरण गायब हो जाते हैं।",
    whatToLookFor: [
      {
        label: "ब्लैक क्रश (विवरण का दबना)",
        description: "यदि पहला ब्लॉक (0.5% या 1%) काले बैकग्राउंड से बिल्कुल अलग नहीं दिखता, तो स्क्रीन ब्लैक क्रश से जूझ रही है।"
      },
      {
        label: "एक के बाद एक शेड का अंतर",
        description: "अंधेरे कमरे में आपको गहरे स्लेटी ब्लॉक के बीच की सीमा रेखाएं साफ दिखाई देनी चाहिए।"
      },
      {
        label: "VA पैनल पर कोण बदलने से अंतर",
        description: "VA पैनल पर सीधे सामने से देखने पर जो विवरण दब जाते हैं, वे थोड़ा तिरछा देखने पर उभर आते हैं।"
      },
      {
        label: "कमरे की रोशनी का प्रभाव",
        description: "कमरे की रोशनी आंखों की गहरे शेड्स पहचानने की क्षमता को कम करती है; परीक्षण के लिए कमरे की लाइट बंद करें।"
      }
    ],
    canObserve: [
      "0.5%, 1%, 2%, 3%, 4% और 5% गहरे स्लेटी पैच की दृश्य पहचान सीमाएं",
      "काले दृश्यों में शैडो डिटेल्स की स्पष्टता",
      "गामा, ब्लैक इक्वलाइज़र और HDMI डायनामिक रेंज बदलने पर होने वाला असर"
    ],
    cannotMeasure: [
      "सटीक उपकरण के बिना 0.05 nits से कम का सूक्ष्म प्रकाश स्तर",
      "गामा वक्र मानकों (BT.1886 बनाम 2.2) के साथ गणितीय अनुरूपता",
      "पैनल का वास्तविक ब्लैक पॉइंट स्तर (cd/m² में)"
    ],
    interpretation: "ब्लैक क्रश आमतौर पर गलत जीपीयू डायनामिक रेंज (फुल 0-255 के स्थान पर लिमिटेड 16-235) या अत्यधिक कंट्रास्ट एन्हांसर सेटिंग्स के कारण होता है।",
    nextSteps: {
      text: "अंधेरे दृश्यों में बारीक चीजें नहीं दिख रहीं? ब्लैक क्रश सुधार गाइड देखें।",
      actionLabel: "ब्लैक क्रश ट्रबलशूटिंग पढ़ें",
      actionHref: "/knowledge-base/troubleshooting#black-crush"
    }
  },

  "gradient-banding-test": {
    overview: "चिकने ग्रेडिएंट के लिए रंगों में सूक्ष्म क्रमिक बदलाव की आवश्यकता होती है। यदि पैनल या ग्राफिक्स सिग्नल में बिट डेप्थ कम है, तो ग्रेडिएंट चिकना दिखने के बजाय धारियों या सीढ़ीनुमा पट्टियों (कलर बैंडिंग) में टूट जाता है।",
    whatToLookFor: [
      {
        label: "सीढ़ीनुमा पट्टियां (बैंडिंग लाइनें)",
        description: "ग्रे और आरजीबी ढलानों में सहज फैलाव के स्थान पर स्पष्ट धारियां या सीमा रेखाएं देखें।"
      },
      {
        label: "विशेष रंग चैनल में बैंडिंग",
        description: "जांचें कि क्या नीले या गहरे रंगों में सामान्य ग्रे की तुलना में धारियां अधिक दिख रही हैं।"
      },
      {
        label: "बिट डेप्थ और FRC डिदरिंग",
        description: "8-बिट और 10-बिट पैनल स्मूथ रंग दिखाते हैं, जबकि 6-बिट+FRC पैनल में थोड़ा दानेदारपन या पट्टियां दिख सकती हैं।"
      },
      {
        label: "फुल बनाम लिमिटेड रेंज",
        description: "यदि जीपीयू आउटपुट 'लिमिटेड (16-235)' पर है, तो ग्रेडिएंट के दोनों छोर कट जाएंगे।"
      }
    ],
    canObserve: [
      "ग्रे और रंगीन ग्रेडिएंट पर कलर बैंडिंग की दृश्य उपस्थिति",
      "क्षैतिज, लंबवत और बहु-चैनल ग्रेडिएंट की गुणवत्ता की तुलना",
      "आईसीसी प्रोफाइल या सीमित डायनामिक रेंज से होने वाली विकृति"
    ],
    cannotMeasure: [
      "ड्राइवर रिपोर्टिंग के अलावा पैनल की वास्तविक आंतरिक बिट डेप्थ",
      "पास-पास के शेड्स के बीच मापने योग्य Delta E रंग अंतर",
      "मॉनिटर स्केलर के अंदर चलने वाला स्पेशल डिदरिंग एल्गोरिदम"
    ],
    interpretation: "बैंडिंग का कारण 6-बिट पैनल, गलत HDMI रेंज (16-235) या दोषपूर्ण आईसीसी कलर प्रोफाइल हो सकते हैं जो रंगों को काट देते हैं।",
    nextSteps: {
      text: "6-बिट, 8-बिट और डिदरिंग का सिमुलेशन देखना चाहते हैं? हमारा विशेष टूल आज़माएं।",
      actionLabel: "बिट-डेप्थ और डिदर टेस्ट खोलें",
      actionHref: "/tests/color-banding-test"
    }
  },

  "uniformity-test": {
    overview: "स्क्रीन एकरूपता यह जांचती है कि पूरी स्क्रीन पर चमक और रंग तापमान कितना समान है। डिफ्यूज़र शीट या फ्रेम के दबाव के कारण किनारे काले पड़ सकते हैं या स्क्रीन पर गंदे धब्बे (DSE) दिख सकते हैं।",
    whatToLookFor: [
      {
        label: "कोनों और किनारों का अंधेरा होना (विगनेडिंग)",
        description: "25%, 50%, 75% ग्रे पर देखें कि क्या कोने और किनारे बीच की तुलना में ज्यादा काले दिख रहे हैं।"
      },
      {
        label: "डर्टी स्क्रीन इफेक्ट (DSE)",
        description: "स्क्रीन पर आंखें घुमाने पर दिखने वाले हल्के बादलों या मैल जैसे धब्बे, जो खेल देखते समय अधिक दिखते हैं।"
      },
      {
        label: "रंग तापमान का असंतुलन",
        description: "देखें कि क्या स्क्रीन का एक हिस्सा गर्म (लाल/पीला) और दूसरा हिस्सा ठंडा (नीला) दिख रहा है।"
      },
      {
        label: "5x5 ग्रिड तुलना",
        description: "ग्रिड के विभिन्न चौकोर खानों की तुलना करके देखें कि बीच से बाहर की ओर रोशनी कितनी घट रही है।"
      }
    ],
    canObserve: [
      "ग्रे और सफेद स्क्रीन पर कोनों का अंधेरा होना और चमक में अंतर",
      "स्क्रीन के विभिन्न हिस्सों के बीच रंग तापमान में दिखने वाला बदलाव",
      "कई स्तरों की चमक पर एकरूपता की जांच"
    ],
    cannotMeasure: [
      "लैब उपकरणों के बिना '98.5% एकरूप' जैसा सटीक प्रतिशत निकालना",
      "स्क्रीन के अलग-अलग हिस्सों में केल्विन (K) में रंग तापमान",
      "डिजिटल यूनिफॉर्मिटी कंपन्सेशन (DUC) सर्किट की आंतरिक स्थिति"
    ],
    interpretation: "सामान्य मॉनिटर में किनारों पर 10% से 15% तक चमक कम होना सामान्य माना जाता है। पेशेवर ग्राफिक मॉनिटर DUC सर्किट की मदद से इसे 5% से कम रखते हैं।",
    nextSteps: {
      text: "डर्टी स्क्रीन इफेक्ट के कारणों और वारंटी नियमों के बारे में जानें।",
      actionLabel: "स्क्रीन एकरूपता गाइड पढ़ें",
      actionHref: "/knowledge-base/backlight-bleed-vs-ips-glow"
    }
  },

  "text-clarity-test": {
    overview: "टेक्स्ट की स्पष्टता पिक्सेल डेंसिटी (PPI), ऑपरेटिंग सिस्टम की स्केलिंग, सब-पिक्सेल बनावट (RGB, BGR, QD-OLED) और फॉन्ट स्मूथिंग एल्गोरिदम पर निर्भर करती है।",
    whatToLookFor: [
      {
        label: "अक्षरों के किनारों पर रंगीन झालर (कलर फ्रिंजिंग)",
        description: "अक्षरों के किनारों पर लाल या नीली लकीरें दिखना सब-पिक्सेल बनावट और फॉन्ट रेंडरिंग में बेमेल होने का संकेत है।"
      },
      {
        label: "BGR सब-पिक्सेल लेआउट",
        description: "कुछ मॉनिटर BGR लेआउट का उपयोग करते हैं; विंडोज़ ClearType को दोबारा सेट किए बिना उन पर टेक्स्ट धुंधला दिखता है।"
      },
      {
        label: "OLED पर टेक्स्ट फ्रिंजिंग",
        description: "WOLED और QD-OLED के त्रिकोणीय सब-पिक्सेल आड़ी रेखाओं पर हल्का हरा या मैजेंटा रंग छोड़ सकते हैं।"
      },
      {
        label: "दशमलव स्केलिंग से धुंधलापन",
        description: "125% या 150% जैसी स्केलिंग पुराने डेस्कटॉप ऐप्स में टेक्स्ट को हल्का धुंधला कर सकती है।"
      }
    ],
    canObserve: [
      "8px से 32px फॉन्ट आकारों पर टेक्स्ट के किनारों पर रंगीन लकीरें और धुंधलापन",
      "सेरिफ, सैन-सेरिफ और उल्टे बैकग्राउंड पर फॉन्ट रेंडरिंग की स्पष्टता",
      "ब्राउज़र ज़ूम और ओएस स्केलिंग का टेक्स्ट की तीक्ष्णता पर प्रभाव"
    ],
    cannotMeasure: [
      "माइक्रोस्कोप के बिना सब-पिक्सेल की वास्तविक सूक्ष्म संरचना",
      "DirectWrite या ClearType की गैर-सार्वजनिक रजिस्ट्री सेटिंग्स",
      "स्क्रीन का ऑप्टिकल मॉड्यूलेशन ट्रांसफर फंक्शन (MTF)"
    ],
    interpretation: "यदि अक्षर धुंधले या रंगीन किनारों वाले दिख रहे हैं, तो विंडोज़ में 'ClearType टेक्स्ट ट्यूनर' चलाने से BGR पैनल पर यह समस्या काफी हद तक ठीक हो जाती है।",
    nextSteps: {
      text: "टेक्स्ट पढ़ने में परेशानी हो रही है? ClearType और स्केलिंग ट्यूनिंग गाइड पढ़ें।",
      actionLabel: "टेक्स्ट स्पष्टता गाइड पढ़ें",
      actionHref: "/knowledge-base/troubleshooting#blurry-text-scaling"
    }
  },

    "hdr-capability-test": {
    "overview": "HDR हार्डवेयर और सिग्नल डिटेक्टर यह जांचता है कि आपका ऑपरेटिंग सिस्टम विंडो कंपोजिटर, डिस्प्ले ड्राइवर और ब्राउज़र पाइपलाइन HDR सिग्नल संचारित कर रहे हैं या नहीं। यह CSS Media Queries Level 4 (dynamic-range: high), वाइड कलर गैमट (Rec.2020 / Display-P3), Canvas P3 कलर बफर, WebGL फ्लोट रेंडर टारगेट और 10-बिट HDR वीडियो कोडेक की जांच करता है।",
    "whatToLookFor": [
        {
            "label": "कंपोजिटर HDR सिग्नल स्थिति",
            "description": "पुष्टि करता है कि OS विंडो कंपोजिटर ब्राउज़र को HDR सिग्नल भेज रहा है या नहीं। यदि निष्क्रिय है, तो सेटिंग्स में HDR बंद है।"
        },
        {
            "label": "बफर बिट डेप्थ और पाइपलाइन",
            "description": "स्क्रीन colorDepth (24-बिट SDR बनाम 30-बिट+ HDR) की पहचान करता है और जांचता है कि क्या Canvas और WebGL2 फ्लोट बफर आवंटित कर सकते हैं।"
        },
        {
            "label": "वाइड कलर गैमट (Rec.2020 और P3)",
            "description": "मूल्यांकन करता है कि क्या आपका मॉनिटर गहरे लाल और जीवंत पन्ना हरे रंग के लिए sRGB से परे रंग मात्रा का समर्थन करता है।"
        },
        {
            "label": "HDR वीडियो कोडेक एक्सेलेरेशन",
            "description": "HDR10 (HEVC Main 10), AV1 10-बिट (YouTube HDR) और VP9 प्रोफाइल 2 के लिए हार्डवेयर डिकोडिंग समर्थन की जांच करता है।"
        }
    ],
    "canObserve": [
        "ऑपरेटिंग सिस्टम कंपोजिटर की रीयल-टाइम HDR आउटपुट स्थिति",
        "Display-P3 और Rec.2020 कलर गैमट के लिए हार्डवेयर और ब्राउज़र समर्थन",
        "स्क्रीन बफर कलर डेप्थ और फ्लोटिंग-पॉइंट बफर समर्थन",
        "हार्डवेयर-त्वरित 10-बिट वीडियो कोडेक प्लेबैक क्षमता"
    ],
    "cannotMeasure": [
        "हार्डवेयर कोलोरीमीटर के बिना भौतिक पैनल पीक ब्राइटनेस (nits)",
        "VESA DisplayHDR प्रमाणन स्तर (उदा. DisplayHDR 400 बनाम 600 बनाम 1000)",
        "मिनी-एलईडी बैकलाइट पर भौतिक लोकल डिमिंग ज़ोन की संख्या"
    ],
    "interpretation": "यदि dynamic-range मानक (निष्क्रिय) दिखाता है, तो Windows पर Win + Alt + B दबाएं या macOS डिस्प्ले सेटिंग्स में HDR चालू करें।",
    "nextSteps": {
        "text": "क्या आप हाइलाइट क्लिपिंग, टोन कर्व और पीक निट्स का ऑप्टिकल परीक्षण करना चाहते हैं?",
        "actionLabel": "HDR दृश्य निरीक्षण शुरू करें",
        "actionHref": "/tests/hdr-test"
    }
},

  "hdr-test": {
    "overview": "HDR दृश्य अंशांकन और हाइलाइट निरीक्षण परीक्षण यह जांचने के लिए नियंत्रित ऑप्टिकल पैटर्न प्रदान करता है कि आपका डिस्प्ले HDR सिग्नल पर भौतिक रूप से कैसे प्रतिक्रिया करता है। यह स्पेक्युलर हाइलाइट क्लिपिंग, टोन-मैपिंग रोल-ऑफ, 10% APL पीक ल्यूमिनेन्स बर्स्ट, PQ/EOTF टोन कर्व और शैडो डिटेल का परीक्षण करता है।",
    "whatToLookFor": [
        {
            "label": "स्पेक्युलर हाइलाइट रोल-ऑफ और क्लिपिंग",
            "description": "90% से 100% पीक व्हाइट पैच की जांच करें। गोलाकार रेटिकल टारगेट ठोस सफेद में बदले बिना स्पष्ट दिखने चाहिए।"
        },
        {
            "label": "10% APL पीक ल्यूमिनेन्स बर्स्ट विंडो",
            "description": "काले बैकग्राउंड पर 10% विंडो आपके डिस्प्ले के पीक निट्स, लोकल डिमिंग और हेलो ब्लूमिंग का परीक्षण करती है।"
        },
        {
            "label": "PQ / EOTF टोन कर्व ग्रेडेशन",
            "description": "कलर बैंडिंग और अत्यधिक टोन कम्प्रेशन को पकड़ने के लिए सहज 10-बिट ग्रेडिएंट की तुलना 8-बिट रैंप से करता है।"
        },
        {
            "label": "नियर-ब्लैक शैडो डिटेल (Black Crush)",
            "description": "सत्यापित करता है कि क्या सूक्ष्म अंधेरे चरण (0.5% से 5%) बिना काले स्तर को उठाए 0% काले से अलग रहते हैं।"
        }
    ],
    "canObserve": [
        "सफेद ल्यूमिनेन्स स्तरों पर स्पेक्युलर हाइलाइट क्लिपिंग का बिंदु",
        "10% APL विंडो में लोकल डिमिंग ब्लूमिंग और पीक ब्राइटनेस हेडरूम",
        "8-बिट बैंडिंग की तुलना में 10-बिट टोनल ट्रांज़िशन की सहजता",
        "शैडो डिटेल सेपरेशन और ब्लैक क्रश व्यवहार"
    ],
    "cannotMeasure": [
        "प्रयोगशाला सेंसर के बिना nits में सटीक फोटोमेट्रिक पीक ल्यूमिनेन्स",
        "स्पेक्ट्रोफोटोमीटर के बिना रंग तापमान (Kelvin) सटीकता",
        "पिक्सेल प्रतिक्रिया समय या ओवरड्राइव ओवरशूट"
    ],
    "interpretation": "खराब टोन मैपिंग वाले डिस्प्ले 94% से ऊपर की हाइलाइट्स को सफेद में बदल देते हैं या शैडो को दबा देते हैं। प्रीमियम OLED और Mini-LED 99% तक विवरण बनाए रखते हैं।",
    "nextSteps": {
        "text": "क्या आप जांचना चाहते हैं कि आपका ऑपरेटिंग सिस्टम और वीडियो कोडेक HDR का समर्थन करते हैं या नहीं?",
        "actionLabel": "HDR हार्डवेयर और सिग्नल जांचें",
        "actionHref": "/tests/hdr-capability-test"
    }
},

  "strobe-crosstalk-test": {
    "overview": "Backlight strobing (ULMB, DyAc, ELMB, LightBoost) eliminates eye-tracking motion blur by pulsing the backlight on only when liquid crystals have finished transitioning. However, because displays scan pixels from top to bottom while backlights flash globally across the entire screen, pixel transitions at the very top or bottom may be incomplete when the pulse fires. This timing mismatch creates duplicate phantom images known as strobe crosstalk.",
    "whatToLookFor": [
      {
        "label": "Double-Image Silhouettes",
        "description": "Watch the moving bars in the top, center, and bottom tracks. Notice whether you see a single sharp bar or a faint duplicate ghost trailing or leading it."
      },
      {
        "label": "Top vs Center vs Bottom Clarity",
        "description": "Most monitors optimize strobe phase for the screen center. The center zone should show crisp, single-image motion, while top and bottom zones typically show varying degrees of crosstalk."
      },
      {
        "label": "Strobe Pulse Width & Brightness",
        "description": "Shorter strobe pulses yield sharper motion but lower overall display brightness. Adjust your monitor's strobe duty cycle in its OSD to balance clarity vs luminance."
      }
    ],
    "canObserve": [
      "Relative strobe crosstalk visibility across vertical screen zones",
      "Identification of optimal strobe phase calibration point on your panel",
      "Comparison of motion blur reduction at various panning velocities"
    ],
    "cannotMeasure": [
      "Exact backlight strobe flash duration in microseconds",
      "Photometric strobe luminance peak in nits without a photodiode",
      "Hardware panel scan-out velocity and VSYNC timing interval"
    ],
    "interpretation": "A small amount of strobe crosstalk at the extreme top and bottom edges is normal on LCD monitors. Severe crosstalk across the center zone indicates mismatched strobe phase or refresh rate desync.",
    "nextSteps": {
      "text": "Compare strobed motion against native sample-and-hold motion blur.",
      "actionLabel": "Run Motion Blur Test",
      "actionHref": "/tests/motion-blur-test"
    }
  },
  "vrr-flicker-test": {
    "overview": "Variable Refresh Rate (VRR / G-Sync / FreeSync) dynamically matches screen refresh rate to GPU rendering output. However, liquid crystal relaxation and OLED pixel luminance curves vary depending on the duration of the refresh cycle. When framerates swing rapidly—especially between high FPS and lower boundary thresholds—luminance curves shift dynamically, producing noticeable brightness flicker in dark and near-black areas.",
    "whatToLookFor": [
      {
        "label": "Near-Black Brightness Pumping",
        "description": "Observe the 10% near-black and 25% dark gray patches as the automated framerate sweep cycles. Look for subtle rhythmic pulsations in overall darkness."
      },
      {
        "label": "LFC (Low Framerate Compensation) Transition Jolt",
        "description": "When framerates dip below the minimum VRR threshold (e.g., below 48Hz), graphics drivers double frame presentation (LFC). This rapid Hz shift can cause a momentary luminance flicker."
      },
      {
        "label": "OLED Gamma Shift",
        "description": "OLED displays are particularly prone to VRR gamma flicker because subpixel charge times depend heavily on frame length. Dark scene textures may pulse visibly during framerate drops."
      }
    ],
    "canObserve": [
      "Visual identification of gamma curve shifts across dark gray luminance levels",
      "Detection of brightness pumping during simulated framerate oscillation",
      "Comparison between subtle midtone gray vs near-black flicker sensitivity"
    ],
    "cannotMeasure": [
      "Hardware GPU-to-display Adaptive-Sync timing packets",
      "Exact millivolt OLED subpixel voltage fluctuations",
      "Automatic detection without user visual evaluation"
    ],
    "interpretation": "If you observe strong brightness pulsing, your display has sensitive VRR gamma curves. Cap your framerate slightly below max refresh rate or disable VRR in games with unstable frame times to prevent flicker.",
    "nextSteps": {
      "text": "Verify your display's variable refresh rate support and range.",
      "actionLabel": "Run VRR Capability Test",
      "actionHref": "/tests/vrr-test"
    }
  },
  "pursuit-camera-test": {
    "overview": "Human eyes track moving on-screen objects with continuous smooth pursuit motion. Standard stationary camera photographs cannot capture true display motion blur because they don't move with the eye. A pursuit camera tracks the moving pattern at exact matched speed, allowing photographic capture of true perceived Motion Picture Response Time (MPRT) and ghosting smear.",
    "whatToLookFor": [
      {
        "label": "Temporal Graduation Alignment",
        "description": "The top track contains vertical white graduation ticks. When tracking smoothly with your camera or phone, these ticks will merge into a single sharp vertical line in your photo."
      },
      {
        "label": "Ghosting & Trailing Artifacts",
        "description": "Once tracking sync is verified by crisp vertical ticks, examine the trailing edge of the moving object to see phosphor decay, overdrive coronas, or ghost trails."
      },
      {
        "label": "Overdrive Overshoot (Coronas)",
        "description": "A bright glowing outline trailing behind the moving object indicates excessive monitor pixel overdrive (inverse ghosting)."
      }
    ],
    "canObserve": [
      "Camera panning synchronization via temporal graduation track verification",
      "Visual smear width directly proportional to perceived MPRT",
      "Distinction between pixel transition blur (GtG) and sample-and-hold eye-tracking blur (MPRT)"
    ],
    "cannotMeasure": [
      "Automatic MPRT calculation without taking and measuring a tracking photograph",
      "Sub-millisecond photodiode optical response curves",
      "Optical tracking rail velocity without calibrated hardware"
    ],
    "interpretation": "When temporal graduation marks form a clean vertical line in your exposure, tracking was synchronized. The width of trailing smear on the object reflects the display's true MPRT motion blur.",
    "nextSteps": {
      "text": "Compare motion performance across different overdrive settings in your monitor OSD.",
      "actionLabel": "Run Ghosting Test",
      "actionHref": "/tests/ghosting-test"
    }
  },
  "audio-sync-test": {
    "overview": "Modern visual processing (frame scaling, HDR dynamic tone mapping, and motion smoothing) introduces video latency. Meanwhile, soundbars, AV receivers, and Bluetooth audio devices (A2DP codec buffers) introduce audio latency. If video and audio diverge by more than ITU-R perceptual thresholds (+45ms to -125ms), speech lip-sync becomes noticeably disjointed.",
    "whatToLookFor": [
      {
        "label": "Simultaneous Flash and Beep",
        "description": "Watch the rotating needle pass the top 12 o'clock zero mark. The instant visual white/green flash should align perfectly with the audible 1 kHz pulse."
      },
      {
        "label": "Audio Leading Video (Negative Offset)",
        "description": "If you hear the beep before you see the visual flash, the display is lagging behind the audio. Audio needs to be delayed."
      },
      {
        "label": "Video Leading Audio (Positive Offset)",
        "description": "If you see the flash before you hear the beep, audio processing (e.g., Bluetooth lag or soundbar processing) is delayed relative to the display."
      }
    ],
    "canObserve": [
      "Human perceptual synchronization between optical visual flashes and acoustic pulses",
      "Measurement of required millisecond compensation offset (+/- 200ms)",
      "Audio output channel verification via Web Audio API 1 kHz synthesized pulses"
    ],
    "cannotMeasure": [
      "Hardware electrical acoustic sound wave arrival times with microsecond laboratory precision",
      "Microphone acoustic feedback loop without audio input authorization",
      "Bluetooth packet retransmission delays at the operating system driver level"
    ],
    "interpretation": "Perceptual lip-sync alignment within +/- 20ms is considered excellent and imperceptible to human audiences. Latencies greater than 50ms should be corrected using audio delay settings in your soundbar or media player.",
    "nextSteps": {
      "text": "Test your speakers for stereo channel separation and frequency range.",
      "actionLabel": "Run Speaker Test",
      "actionHref": "/tests/speaker-test"
    }
  },
  "gamepad-test": {
    "overview": "Game controllers use analog potentiometers or Hall-effect magnetic sensors to translate thumbstick movement into directional coordinates. Over time, internal carbon wiper wear, spring degradation, and dust contamination cause the stick to register off-center coordinates when resting untouched—a defect known as stick drift.",
    "whatToLookFor": [
      {
        "label": "Resting Stick Drift",
        "description": "Release both thumbsticks completely. If the crosshair indicator sits outside the central zero point or drifts continuously, stick drift is present."
      },
      {
        "label": "Circularity Error",
        "description": "Rotate the sticks along their outer boundaries. Quality gamepads produce a clean, smooth circle without clipping flat at the diagonal corners."
      },
      {
        "label": "Deadzone Thresholding",
        "description": "Check how far you must nudge the stick before the coordinate responds. Excessive deadzones make aiming sluggish, while too-small deadzones cause drift."
      },
      {
        "label": "Analog Trigger Smoothness",
        "description": "Gradually squeeze LT and RT triggers. The percentage readout should climb smoothly from 0% to 100% without jumping or sticking."
      }
    ],
    "canObserve": [
      "Real-time analog stick X/Y coordinate readouts and resting drift values",
      "Full 16-button digital actuation matrix and analog trigger pressure percentages",
      "Controller connection status, device ID name, and polling rate via HTML5 Gamepad API"
    ],
    "cannotMeasure": [
      "Physical potentiometer wiper resistance in ohms",
      "Internal battery voltage level (unless supported by proprietary browser extensions)",
      "Wireless Bluetooth radio interference or packet drop rates"
    ],
    "interpretation": "A resting coordinate value below 0.05 (5%) is typically absorbed by standard game deadzones. Values exceeding 0.10 (10%) will cause visible in-game camera drift and suggest recalibration or cleaning.",
    "nextSteps": {
      "text": "Test your display's input latency and your personal reaction time.",
      "actionLabel": "Run Reaction Time Test",
      "actionHref": "/tests/reaction-time-test"
    }
  }
  ,
  "battery-test": {
    "overview": "बैटरी स्वास्थ्य और पावर स्थिति परीक्षक W3C Battery Status API का उपयोग करके डिवाइस का बैटरी स्तर, चार्जिंग स्थिति और शेष समय की निगरानी करता है।",
    "whatToLookFor": [
        {
            "label": "रीयल-टाइम चार्ज स्तर",
            "description": "ऑपरेटिंग सिस्टम द्वारा रिपोर्ट किए गए बैटरी प्रतिशत की निगरानी करता है।"
        },
        {
            "label": "पावर एडाप्टर कनेक्शन",
            "description": "पहचानता है कि डिवाइस एसी पावर पर चार्ज हो रहा है या बैटरी पर चल रहा है।"
        },
        {
            "label": "चार्ज और डिस्चार्ज समय",
            "description": "पूर्ण चार्ज या बैटरी समाप्त होने के अनुमानित समय की गणना करता है।"
        },
        {
            "label": "डिस्चार्ज इतिहास",
            "description": "स्क्रीन परीक्षणों के दौरान बैटरी खपत को ट्रैक करता है।"
        }
    ],
    "canObserve": [
        "रीयल-टाइम बैटरी प्रतिशत और चार्ज स्थिति",
        "चार्जिंग और डिस्चार्जिंग परिवर्तनों का रीयल-टाइम अपडेट",
        "फुल चार्ज या खाली होने का अनुमानित समय",
        "सत्र के दौरान चार्ज स्तर का रुझान"
    ],
    "cannotMeasure": [
        "वास्तविक मिलीएम्पीयर-घंटे (mAh) रासायनिक गिरावट",
        "आंतरिक बैटरी तापमान या चक्र गणना",
        "गोपनीयता प्रतिबंधों वाले ब्राउज़रों में बैटरी डेटा"
    ],
    "interpretation": "यदि ब्राउज़र API का समर्थन नहीं करता है, तो यह गोपनीयता सुरक्षा के कारण है। तेजी से बैटरी गिरना बैटरी उम्र बढ़ने का संकेत देता है।",
    "nextSteps": {
        "text": "क्या आप अपने नेटवर्क की गति और लेटेंसी जांचना चाहते हैं?",
        "actionLabel": "नेटवर्क स्पीड टेस्ट शुरू करें",
        "actionHref": "/tests/network-speed-test"
    }
},

  "network-speed-test": {
    "overview": "नेटवर्क स्पीड और लेटेंसी टेस्ट आपके इंटरनेट कनेक्शन के पिंग, डाउनलोड थ्रूपुट और कनेक्शन प्रकार को सीधे ब्राउज़र टाइमिंग API से मापता है।",
    "whatToLookFor": [
        {
            "label": "पिंग लेटेंसी (RTT)",
            "description": "ब्राउज़र से सर्वर तक पैकेट के आने-जाने का समय मिलीसेकंड में मापता है।"
        },
        {
            "label": "डाउनलोड थ्रूपुट (Mbps)",
            "description": "डेटा पैकेट डाउनलोड करके वास्तविक बैंडविड्थ की गणना करता है।"
        },
        {
            "label": "कनेक्शन प्रोफ़ाइल",
            "description": "प्रभावी कनेक्शन प्रकार (4G, वाई-फाई, ईथरनेट) की पहचान करता है।"
        },
        {
            "label": "कनेक्शन स्थिरता",
            "description": "पिंग में उतार-चढ़ाव की निगरानी करके नेटवर्क स्थिरता जांचता है।"
        }
    ],
    "canObserve": [
        "मिलीसेकंड में HTTP/HTTPS राउंड-ट्रिप लेटेंसी",
        "navigator.connection के माध्यम से प्रभावी नेटवर्क श्रेणी",
        "वास्तविक डेटा ट्रांसफर से मापी गई डाउनलोड गति",
        "ब्राउज़र डेटा सेवर स्थिति"
    ],
    "cannotMeasure": [
        "ब्राउज़र HTTP स्टैक के बिना रॉ TCP सॉकेट लेटेंसी",
        "इंटरनेट सेवा प्रदाता की भौतिक फाइबर लाइन शक्ति स्तर",
        "स्थानीय वाई-फाई रेडियो फ्रीक्वेंसी व्यवधान"
    ],
    "interpretation": "30 मिलीसेकंड से कम पिंग ऑनलाइन गेमिंग और क्लाउड स्ट्रीमिंग के लिए उत्कृष्ट है। 50 Mbps से अधिक गति 4K वीडियो के लिए उपयुक्त है।",
    "nextSteps": {
        "text": "क्या आप अपने डिस्प्ले की इनपुट लेटेंसी मापना चाहते हैं?",
        "actionLabel": "इनपुट लैग टेस्ट चलाएं",
        "actionHref": "/tests/input-lag-test"
    }
},

  "color-blindness-test": {
    "overview": "कलर ब्लाइंडनेस सिम्युलेटर 8 विभिन्न प्रकार के रंग दृष्टि दोषों का अनुकरण करने के लिए SVG कलर मैट्रिक्स फिल्टर का उपयोग करता है, जिससे UI एक्सेसिबिलिटी का मूल्यांकन किया जा सकता है।",
    "whatToLookFor": [
        {
            "label": "प्रोटानोपिया और प्रोटानोमली (लाल दोष)",
            "description": "L-शंकु दोष के कारण लाल रंग गहरा भूरा या धूसर दिखाई देता है।"
        },
        {
            "label": "ड्यूटेरानोपिया और ड्यूटेरानोमली (हरा दोष)",
            "description": "M-शंकु दोष के कारण हरे और लाल रंग पीले रंग में मिल जाते हैं।"
        },
        {
            "label": "ट्रिटानोपिया और ट्रिटानोमली (नीला दोष)",
            "description": "S-शंकु दोष के कारण नीला रंग हरा और पीला रंग बैंगनी दिखता है।"
        },
        {
            "label": "एक्रोमैटोप्सिया (पूर्ण रंगहीनता)",
            "description": "शंकु कोशिकाओं की अनुपस्थिति के कारण पूरी स्क्रीन केवल ग्रे शेड्स में दिखती है।"
        }
    ],
    "canObserve": [
        "8 विभिन्न दोषों के तहत टेक्स्ट और ग्राफिक्स का रीयल-टाइम रूपांतरण",
        "सामान्य दृष्टि और सिम्युलेटेड दृष्टि की साथ-साथ तुलना",
        "महत्वपूर्ण स्थिति रंगों (सफलता हरा बनाम त्रुटि लाल) के बीच कंट्रास्ट की जांच",
        "प्रत्येक दृष्टि प्रकार में टेक्स्ट की पठनीयता"
    ],
    "cannotMeasure": [
        "व्यक्तिगत मानवीय दृष्टि का नैदानिक चिकित्सा परीक्षण",
        "रेटिना शंकु कोशिकाओं की व्यक्तिगत संवेदनशीलता",
        "स्पेक्ट्रोरेडियोमीटर के बिना स्क्रीन का भौतिक वर्णक्रमीय उत्सर्जन"
    ],
    "interpretation": "यदि आपके महत्वपूर्ण बटन या अलर्ट ड्यूटेरानोपिया में अस्पष्ट हो जाते हैं, तो WCAG 2.2 मानकों का पालन करने के लिए केवल रंग पर निर्भर रहने के बजाय आइकन जोड़ें।",
    "nextSteps": {
        "text": "अपने मॉनिटर के sRGB और DCI-P3 रंग सरगम की जांच करें।",
        "actionLabel": "कलर गैमट टेस्ट चलाएं",
        "actionHref": "/tests/color-gamut-test"
    }
},

  "screen-recorder": {
    "overview": "स्क्रीन रिकॉर्डर और स्क्रीनशॉट टूल स्क्रीन कैप्चर API और MediaRecorder API का उपयोग करके बिना किसी सॉफ़्टवेयर इंस्टॉलेशन के स्क्रीन रिकॉर्डिंग और उच्च गुणवत्ता वाले PNG स्क्रीनशॉट प्रदान करता है।",
    "whatToLookFor": [
        {
            "label": "कैप्चर रिज़ॉल्यूशन",
            "description": "जांचता है कि रिकॉर्ड किया गया वीडियो स्क्रीन के रिज़ॉल्यूशन से मेल खाता है या नहीं।"
        },
        {
            "label": "फ्रेम दर और तरलता",
            "description": "रीयल-टाइम में फ्रेम दर और रिकॉर्डिंग अवधि की निगरानी करता है।"
        },
        {
            "label": "ऑडियो ट्रैक एकीकरण",
            "description": "स्क्रीन के साथ सिस्टम या टैब ऑडियो रिकॉर्ड करने की अनुमति देता है।"
        },
        {
            "label": "नुकसान रहित PNG स्नैपशॉट",
            "description": "तुरंत डाउनलोड करने योग्य उच्च-रिज़ॉल्यूशन PNG इमेज कैप्चर करता है।"
        }
    ],
    "canObserve": [
        "वीडियो रिज़ॉल्यूशन, पक्ष अनुपात और फ्रेम दर सेटिंग्स",
        "रिकॉर्डिंग का बीता समय और उत्पन्न WebM फ़ाइल आकार",
        "PNG डाउनलोड के लिए HTML5 कैनवास पर तात्कालिक फ्रेम रेंडरिंग",
        "स्क्रीन कैप्चर के लिए ब्राउज़र अनुमति स्थिति"
    ],
    "cannotMeasure": [
        "ऑपरेटिंग सिस्टम का आंतरिक GPU एनकोडिंग विलंब",
        "DRM संरक्षित सामग्री (जो काली स्क्रीन के रूप में दिखाई देती है)",
        "भौतिक मॉनिटर की मूल रीफ़्रेश दर"
    ],
    "interpretation": "रिकॉर्डिंग पूरी तरह से आपके ब्राउज़र में स्थानीय रूप से बनाई जाती है और कभी भी किसी सर्वर पर अपलोड नहीं की जाती है, जिससे पूर्ण गोपनीयता सुनिश्चित होती है।",
    "nextSteps": {
        "text": "क्या आप अपने वेबकैम के रिज़ॉल्यूशन और फ़ंक्शन की जांच करना चाहते हैं?",
        "actionLabel": "वेबकैम टेस्ट शुरू करें",
        "actionHref": "/tests/webcam-test"
    }
},

  "dark-mode-test": {
    "overview": "डार्क मोड और थीम संगतता निरीक्षक सिस्टम के prefers-color-scheme मीडिया क्वेरी, CSS color-scheme रेंडरिंग और डार्क/लाइट थीम में कंट्रास्ट अनुपात का मूल्यांकन करता है।",
    "whatToLookFor": [
        {
            "label": "OS वरीयता सिंक्रनाइज़ेशन",
            "description": "परीक्षण करता है कि क्या ब्राउज़र ऑपरेटिंग सिस्टम के डार्क मोड टॉगल का पता लगाता है।"
        },
        {
            "label": "CSS color-scheme समर्थन",
            "description": "डार्क मोड में नेटिव स्क्रॉलबार और फ़ॉर्म नियंत्रणों का निरीक्षण करता है।"
        },
        {
            "label": "घटक कंट्रास्ट पठनीयता",
            "description": "दोनों कलर मोड में टेक्स्ट, कार्ड और बटन के कंट्रास्ट का मूल्यांकन करता है।"
        },
        {
            "label": "OLED के लिए शुद्ध काला",
            "description": "OLED स्क्रीन पर बैटरी बचत के लिए शुद्ध #000000 काले रंग की जांच करता है।"
        }
    ],
    "canObserve": [
        "window.matchMedia के माध्यम से रीयल-टाइम डार्क मोड स्थिति",
        "नेटिव CSS color-scheme का ब्राउज़र समर्थन",
        "सिस्टम, लाइट और डार्क मोड के बीच इंटरैक्टिव स्विचिंग",
        "लाइट और डार्क बैकग्राउंड पर टेक्स्ट की स्पष्टता"
    ],
    "cannotMeasure": [
        "भौतिक उपकरण के बिना OLED सबपिक्सेल की सटीक मिलीएम्पीयर बचत",
        "एम्बिएंट सेंसर के बिना कमरे की रोशनी का स्वत: अनुकूलन",
        "सॉफ़्टवेयर द्वारा नीली रोशनी में कमी का प्रभाव"
    ],
    "interpretation": "OLED डिस्प्ले शुद्ध काले बैकग्राउंड पर सबपिक्सेल बंद करके बिजली बचाते हैं और कम रोशनी वाले वातावरण में आंखों के तनाव को कम करते हैं।",
    "nextSteps": {
        "text": "कमरे की रोशनी के अनुसार अपने डिस्प्ले ब्राइटनेस की जांच करें।",
        "actionLabel": "एम्बिएंट लाइट टेस्ट चलाएं",
        "actionHref": "/tests/ambient-light-test"
    }
},

  "input-lag-test": {
    "overview": "इनपुट लैग विज़ुअलाइज़र एक सांख्यिकीय 10-ट्रायल रिएक्शन और पाइपलाइन लेटेंसी बेंचमार्क है जो विज़ुअल सिग्नल और माउस क्लिक के बीच के समय को मापता है।",
    "whatToLookFor": [
        {
            "label": "विज़ुअल रिएक्शन समय",
            "description": "हरे रंग के बदलाव से लेकर क्लिक तक के समय को मिलीसेकंड में मापता है।"
        },
        {
            "label": "सांख्यिकीय स्थिरता",
            "description": "कम मानक विचलन (< 25ms) स्थिर प्रदर्शन को दर्शाता है।"
        },
        {
            "label": "फॉल्स स्टार्ट डिटेक्शन",
            "description": "हरे रंग से पहले किए गए क्लिक को पकड़ता है।"
        },
        {
            "label": "वितरण हिस्टोग्राम",
            "description": "विभिन्न श्रेणियों में प्रतिक्रिया समय का वितरण दिखाता है।"
        }
    ],
    "canObserve": [
        "performance.now() के माध्यम से उच्च रिज़ॉल्यूशन टाइमस्टैम्प",
        "10 परीक्षणों में औसत, सर्वश्रेष्ठ, सबसे धीमा और मानक विचलन",
        "गलत क्लिक रोकने के लिए रीयल-टाइम स्टेट मशीन",
        "विलंबता वितरण का हिस्टोग्राम ग्राफ"
    ],
    "cannotMeasure": [
        "बाहरी हार्डवेयर सेंसर के बिना शुद्ध क्लिक-टू-फोटॉन लेटेंसी",
        "OS रुकावटों से अलग कच्चा USB पोलिंग अंतराल",
        "मॉनिटर पिक्सेल संक्रमण का भौतिक समय"
    ],
    "interpretation": "180ms से 240ms का संयुक्त स्कोर गेमिंग मॉनिटर के लिए सामान्य है। 300ms से अधिक स्कोर मॉनिटर में गेम मोड चालू करने का सुझाव देता है।",
    "nextSteps": {
        "text": "अपने मॉनिटर की वास्तविक हार्डवेयर रीफ़्रेश दर की जांच करें।",
        "actionLabel": "रीफ़्रेश दर टेस्ट चलाएं",
        "actionHref": "/tests/refresh-rate-test"
    }
},

  "ambient-light-test": {
    "overview": "एम्बिएंट लाइट सेंसर निरीक्षक AmbientLightSensor API का उपयोग करके लक्स (lx) में रोशनी के स्तर को मापता है और एर्गोनोमिक ब्राइटनेस सिफारिशें प्रदान करता है।",
    "whatToLookFor": [
        {
            "label": "रीयल-टाइम लक्स स्तर",
            "description": "डिवाइस के फोटोडिटेक्टर द्वारा मापी गई परिवेशी रोशनी की तीव्रता दिखाता है।"
        },
        {
            "label": "एर्गोनोमिक ब्राइटनेस सलाह",
            "description": "कमरे की रोशनी के अनुसार इष्टतम स्क्रीन ब्राइटनेस की सिफारिश करता है।"
        },
        {
            "label": "ग्लेयर जोखिम चेतावनी",
            "description": "पहचानता है कि क्या अत्यधिक रोशनी (> 1000 lx) स्क्रीन पर चकाचौंध पैदा कर रही है।"
        },
        {
            "label": "रोशनी स्थिरता चार्ट",
            "description": "समय के साथ कमरे की रोशनी में बदलाव को ट्रैक करता है।"
        }
    ],
    "canObserve": [
        "हार्डवेयर सेंसर से रीयल-टाइम लक्स मान",
        "पर्यावरण वर्गीकरण (अंधेरा, मंद कमरा, कार्यालय, दिन का उजाला)",
        "एर्गोनोमिक दिशानिर्देशों के आधार पर अनुशंसित ब्राइटनेस प्रतिशत",
        "सत्र के दौरान रोशनी के स्तर का इतिहास चार्ट"
    ],
    "cannotMeasure": [
        "Generic Sensor API का समर्थन न करने वाले ब्राउज़रों पर डेटा",
        "कमरे की रोशनी का रंग तापमान (केल्विन)",
        "स्क्रीन पर पड़ने वाली सीधी रोशनी के कोण"
    ],
    "interpretation": "आंखों के आराम के लिए कार्यालय का वातावरण 300 से 500 लक्स के बीच होना चाहिए और स्क्रीन की ब्राइटनेस लगभग 120-150 निट्स होनी चाहिए।",
    "nextSteps": {
        "text": "अपने डिस्प्ले की ब्राइटनेस और ब्लैक लेवल कैलिब्रेट करें।",
        "actionLabel": "ब्राइटनेस टेस्ट चलाएं",
        "actionHref": "/tests/brightness-test"
    }
},

  "dpi-calculator": {
    "overview": "DPI और PPI कैलकुलेटर स्क्रीन विकर्ण और रिज़ॉल्यूशन के आधार पर पिक्सेल घनत्व, डॉट पिच, कुल मेगापिक्सल और रेटिना देखने की दूरी की गणना करता है।",
    "whatToLookFor": [
        {
            "label": "पिक्सेल प्रति इंच (PPI)",
            "description": "डिस्प्ले पैनल के विकर्ण पर स्थानिक पिक्सेल घनत्व को मापता है।"
        },
        {
            "label": "डॉट पिच (पिक्सेल रिक्ति)",
            "description": "मिलीमीटर में आसन्न सबपिक्सेल केंद्रों के बीच की दूरी की गणना करता है।"
        },
        {
            "label": "रेटिना देखने की दूरी",
            "description": "वह दूरी निर्धारित करता है जहां मानव आंख अलग-अलग पिक्सेल में अंतर नहीं कर सकती।"
        },
        {
            "label": "पहलू अनुपात और मेगापिक्सल",
            "description": "पैनल सतह क्षेत्र, पक्ष अनुपात और कुल पिक्सेल की गणना करता है।"
        }
    ],
    "canObserve": [
        "परिकलित PPI, मिलीमीटर में डॉट पिच और कुल मेगापिक्सल",
        "सेंटीमीटर और इंच में इष्टतम एर्गोनोमिक और रेटिना दूरी",
        "मानक मॉनिटरों के लिए त्वरित प्रीसेट (24\" 1080p, 27\" 1440p, 32\" 4K)",
        "रिज़ॉल्यूशन और विकर्ण के लिए इंटरैक्टिव इनपुट"
    ],
    "cannotMeasure": [
        "उपयोगकर्ता इनपुट के बिना मॉनिटर के प्लास्टिक बेज़ेल का आकार",
        "मैट एंटी-ग्लेयर कोटिंग से प्रभावित ऑप्टिकल स्पष्टता",
        "सटीक आयामों के बिना गैर-मानक विरूपण"
    ],
    "interpretation": "110 PPI से अधिक पिक्सेल घनत्व स्पष्ट टेक्स्ट प्रदान करता है, जबकि 220 PPI से अधिक सामान्य दूरी पर रेटिना स्पष्टता प्राप्त करता है।",
    "nextSteps": {
        "text": "विभिन्न आकारों में फ़ॉन्ट की स्पष्टता की जांच करें।",
        "actionLabel": "टेक्स्ट स्पष्टता टेस्ट चलाएं",
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

