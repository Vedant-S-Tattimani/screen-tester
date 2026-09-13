import { InspectionWorkflow } from "./types";

export const ES_INSPECTION_WORKFLOWS: InspectionWorkflow[] = [
  {
    "id": "general",
    "route": "/monitor-inspection/general",
    "title": "Revisión general de pantalla",
    "shortDescription": "Revisión visual esencial y completa para cualquier pantalla.",
    "longDescription": "Una secuencia de diagnóstico equilibrada y esencial diseñada para examinar cualquier monitor de escritorio, pantalla de portátil o display externo en busca de píxeles muertos, precisión de color, brillo, contraste, uniformidad y frecuencia de actualización.",
    "inspectionTip": "Ajuste su pantalla a su resolución nativa y escala recomendada antes de comenzar la revisión.",
    "browserLimitations": "Las pruebas en navegador evalúan patrones generados por el cliente y no pueden comprobar la estabilidad de fuentes de alimentación ni los puertos físicos.",
    "sequence": [
      "/tests/resolution-checker",
      "/tests/dead-pixel-test",
      "/tests/uniformity-test",
      "/tests/near-black-test",
      "/tests/gradient-banding-test",
      "/tests/text-clarity-test",
      "/tests/scaling-aspect-test",
      "/tests/ghosting-test",
      "/tests/refresh-rate-test"
    ],
    "steps": [
      {
        "title": "Resolución e info de pantalla",
        "description": "Verifique la resolución nativa, escala DPR y parámetros del display."
      },
      {
        "title": "Localizador de píxeles muertos",
        "description": "Recorra fondos de colores puros para localizar subpíxeles inactivos o atascados."
      },
      {
        "title": "Uniformidad de pantalla",
        "description": "Inspeccione grises neutros y colores sólidos en busca de manchas o viñeteado."
      },
      {
        "title": "Detalle en sombras (Near-Black)",
        "description": "Compruebe la separación de tonos oscuros y detalle en sombras cerca del negro puro."
      },
      {
        "title": "Gradientes y banding",
        "description": "Evalúe transiciones de negro a blanco sin bandas de cuantización visibles."
      },
      {
        "title": "Claridad de texto y subpíxeles",
        "description": "Examine el suavizado tipográfico y la nitidez de bordes en varios tamaños."
      },
      {
        "title": "Escalado y relación de aspecto",
        "description": "Compruebe círculos geométricos y cuadrículas en busca de distorsión."
      },
      {
        "title": "Ghosting y estelas de movimiento",
        "description": "Observe bloques de contraste en movimiento para probar el tiempo de respuesta."
      },
      {
        "title": "Frecuencia de actualización y timing",
        "description": "Compare la cadencia de animación del navegador con la frecuencia del panel."
      }
    ]
  },
  {
    "id": "used",
    "route": "/monitor-inspection/used",
    "title": "Inspección de monitor usado",
    "shortDescription": "Inspección enfocada de 10 pruebas con notas y generación de informe, optimizada antes de comprar.",
    "longDescription": "Un flujo de trabajo riguroso de verificación previa a la compra, diseñado específicamente para evaluar monitores de segunda mano o reacondicionados. Cubre parámetros de hardware, defectos de píxeles, desgaste de retroiluminación, fidelidad de color y guarda los hallazgos en un informe.",
    "inspectionTip": "Ajuste el brillo al 100% al inspeccionar una pantalla usada para evidenciar quemados latentes, desgaste de LED y daños por presión en el marco.",
    "browserLimitations": "Las horas de encendido y los sensores térmicos internos requieren acceder al menú de servicio de fábrica del monitor mediante sus botones físicos.",
    "sequence": [
      "/tests/display-info",
      "/tests/resolution-checker",
      "/tests/dead-pixel-test",
      "/tests/stuck-pixel-test",
      "/tests/color-test",
      "/tests/brightness-test",
      "/tests/uniformity-test",
      "/tests/backlight-bleed-test",
      "/tests/ghosting-test",
      "/tests/refresh-rate-test"
    ],
    "steps": [
      {
        "title": "1. Información de pantalla",
        "description": "Consulte parámetros del display, profundidad de color y capacidades gráficas."
      },
      {
        "title": "2. Resolución y geometría",
        "description": "Verifique resolución nativa, ratio de escala (DPR) y viewport completo."
      },
      {
        "title": "3. Píxeles muertos",
        "description": "Examine campos blancos y primarios en busca de subpíxeles oscuros e inactivos."
      },
      {
        "title": "4. Píxeles atascados",
        "description": "Inspeccione fondos oscuros en busca de subpíxeles permanentemente encendidos."
      },
      {
        "title": "5. Reproducción de color",
        "description": "Revise primarios RGB y secundarios CMY para detectar degradación de canales."
      },
      {
        "title": "6. Brillo y separación de sombras",
        "description": "Confirme que la luz de fondo entrega suficiente luminancia sin aplastar sombras."
      },
      {
        "title": "7. Uniformidad de pantalla",
        "description": "Compruebe campos grises al 25%, 50% y 75% para detectar amarillamiento o viñeteado."
      },
      {
        "title": "8. Fugas de luz y presión del marco",
        "description": "En entorno oscuro, verifique daños por presión en el bisel y fugas de luz."
      },
      {
        "title": "9. Ghosting y degradación de respuesta",
        "description": "Evalúe estelas de respuesta de píxel y rendimiento del overdrive en movimiento."
      },
      {
        "title": "10. Estabilidad de frecuencia de refresco",
        "description": "Confirme que el panel opera a su tasa nominal sin micro-tirones ni saltos."
      },
      {
        "title": "11. Notas de inspección",
        "description": "Registre estado estético físico, funcionamiento de puertos y observaciones."
      },
      {
        "title": "12. Informe final de prueba",
        "description": "Genere un informe completo, imprimible y exportable con los resultados."
      }
    ]
  },
  {
    "id": "gaming",
    "route": "/monitor-inspection/gaming",
    "title": "Inspección de pantalla gaming",
    "shortDescription": "Compruebe frecuencia de refresco, ghosting, overdrive, tearing, black smearing, HDR y movimiento.",
    "longDescription": "Un flujo de trabajo especializado diseñado para monitores gaming de alta tasa de refresco (120Hz, 144Hz, 240Hz, 360Hz+). Evalúa sincronización, ghosting, sobreimpulso de overdrive (ghosting inverso), screen tearing, black smearing en paneles VA y respuesta HDR.",
    "inspectionTip": "Pruebe su monitor a su tasa máxima anunciada con el Overdrive en 'Normal' antes de probar 'Extremo/Rápido' para identificar halos de ghosting inverso.",
    "browserLimitations": "La tasa de refresco variable dinámica (G-Sync / FreeSync) requiere ejecución de juegos en DirectX/Vulkan nativos para probar la fluctuación en los límites.",
    "sequence": [
      "/tests/vrr-test",
      "/tests/screen-tearing-test",
      "/tests/refresh-rate-test",
      "/tests/ghosting-test",
      "/tests/hdr-test",
      "/tests/text-clarity-test"
    ],
    "steps": [
      {
        "title": "Inspección de VRR y Adaptive Sync",
        "description": "Observe la estabilidad del ritmo de fotogramas ante cargas variables."
      },
      {
        "title": "Screen Tearing y V-Sync",
        "description": "Ponga a prueba el desgarro de imagen en desplazamientos rápidos horizontales."
      },
      {
        "title": "Verificación de tasa de refresco",
        "description": "Compare el timing de requestAnimationFrame del navegador con el panel gaming."
      },
      {
        "title": "Ghosting, Overdrive y Black Smearing",
        "description": "Evalúe transiciones de píxel, halos de sobreimpulso y estelas oscuras en VA."
      },
      {
        "title": "Inspección visual de HDR",
        "description": "Compruebe reflejos especulares, recorte de iluminaciones y gama amplia."
      },
      {
        "title": "Claridad de texto y UI de juego",
        "description": "Examine la legibilidad de fuentes pequeñas y elementos HUD en pantalla."
      }
    ]
  },
  {
    "id": "oled",
    "route": "/monitor-inspection/oled",
    "title": "Inspección de pantalla OLED",
    "shortDescription": "Inspeccione campos near-black, uniformidad, banding, retención, quemado, HDR y movimiento.",
    "longDescription": "Un flujo de diagnóstico especializado para paneles autoemisivos OLED, QD-OLED y WOLED. Evalúa transiciones cerca del negro, bandas verticales, uniformidad, retención temporal vs. quemado permanente, rango dinámico HDR y claridad de movimiento.",
    "inspectionTip": "Observe patrones de gris oscuro (1%, 2%, 5% de gris) en una habitación totalmente oscura para examinar bandas verticales near-black sin reflejos.",
    "browserLimitations": "El limitador automático de brillo (ABL) atenúa ventanas de navegador blancas amplias; cuantificar quemados requiere luminancímetros de laboratorio.",
    "sequence": [
      "/tests/near-black-test",
      "/tests/uniformity-test",
      "/tests/hdr-test",
      "/tests/text-clarity-test",
      "/tests/motion-blur-test",
      "/tests/dead-pixel-test"
    ],
    "steps": [
      {
        "title": "Near-Black y separación de sombras",
        "description": "Inspeccione pasos oscuros del 0,25% al 5% para evaluar detalle en sombras."
      },
      {
        "title": "Luminancia y uniformidad en oscuros",
        "description": "Revise la uniformidad en grises al 5%, 20% y 50% para detectar bandas verticales."
      },
      {
        "title": "HDR y reflejos especulares",
        "description": "Verifique la gama amplia de color y la transición de luces altas sin recorte ABL."
      },
      {
        "title": "Renderizado de texto y subpíxeles",
        "description": "Compruebe el renderizado tipográfico (RGB/WRGB/QD-OLED) en busca de halos de color."
      },
      {
        "title": "Claridad de movimiento Sample-and-Hold",
        "description": "Observe transiciones instantáneas de píxel OLED junto con la persistencia retiniana."
      },
      {
        "title": "Comprobación de quemados y subpíxeles",
        "description": "Recorra colores sólidos para detectar subpíxeles inactivos o marcas estáticas de UI."
      }
    ]
  },
  {
    "id": "laptop",
    "route": "/monitor-inspection/laptop",
    "title": "Inspección de pantalla de portátil",
    "shortDescription": "Compruebe resolución, brillo, uniformidad, color, renderizado de texto, refresco y HDR.",
    "longDescription": "Un flujo de trabajo enfocado a pantallas integradas de portátiles (MacBook Retina, Ultrabooks Windows, portátiles gaming). Valida escalado de alta densidad DPI, reserva de brillo máximo, uniformidad de panel, fidelidad de color y nitidez ClearType.",
    "inspectionTip": "Conecte el portátil a la corriente eléctrica y desactive sensores de brillo automático para evitar que perfiles de ahorro atenúen la pantalla.",
    "browserLimitations": "Los porcentajes de cobertura de gama de color (ej. 100% sRGB o DCI-P3) requieren calibración con colorímetro de hardware para medirse con exactitud.",
    "sequence": [
      "/tests/resolution-checker",
      "/tests/brightness-test",
      "/tests/uniformity-test",
      "/tests/solid-color-test",
      "/tests/sharpness-test",
      "/tests/refresh-rate-test",
      "/tests/hdr-capability-test"
    ],
    "steps": [
      {
        "title": "Resolución y escalado High-DPI",
        "description": "Verifique escala lógica, ratio de píxeles del dispositivo (DPR) y resolución nativa."
      },
      {
        "title": "Brillo y rango dinámico",
        "description": "Compruebe la salida máxima de luz y pasos de sombra para uso interior/exterior."
      },
      {
        "title": "Uniformidad de pantalla y presión de marco",
        "description": "Inspeccione marcas de presión del bisel, fugas de luz o esquinas oscuras."
      },
      {
        "title": "Vivacidad y uniformidad de color",
        "description": "Verifique campos de colores primarios y secundarios de manera uniforme."
      },
      {
        "title": "Renderizado de texto y subpíxeles",
        "description": "Inspeccione renderizado tipográfico (ClearType) en múltiples tamaños (8px–24px)."
      },
      {
        "title": "Verificación de tasa de refresco",
        "description": "Confirme que las tasas altas (90Hz, 120Hz ProMotion, 144Hz+) estén activas."
      },
      {
        "title": "HDR y gama amplia (si aplica)",
        "description": "Verifique capacidad HDR y soporte de gama amplia en paneles compatibles."
      }
    ]
  },
  {
    "id": "new",
    "route": "/monitor-inspection/new",
    "title": "Inspección de monitor nuevo",
    "shortDescription": "Comprobaciones esenciales antes del primer uso y dentro del plazo de devolución.",
    "longDescription": "Una lista de verificación completa recién sacada de la caja para inspeccionar monitores nuevos en busca de defectos de fabricación, píxeles defectuosos, fugas de luz y rendimiento general antes de que venza el plazo de devolución.",
    "inspectionTip": "Inspeccione tanto en una habitación iluminada (acabado de panel, reflejos y micro-rayas) como en una totalmente oscura (fugas de luz y brillo IPS).",
    "browserLimitations": "Los navegadores no pueden comprobar puertos físicos (DisplayPort, HDMI, USB-C Power Delivery) ni módulos propietarios de G-Sync. Realice pruebas físicas de cable.",
    "sequence": [
      "/tests/resolution-checker",
      "/tests/sharpness-test",
      "/tests/dead-pixel-test",
      "/tests/stuck-pixel-test",
      "/tests/solid-color-test",
      "/tests/grayscale-test",
      "/tests/brightness-test",
      "/tests/contrast-test",
      "/tests/black-level-test",
      "/tests/white-level-test",
      "/tests/uniformity-test",
      "/tests/backlight-bleed-test",
      "/tests/ghosting-test",
      "/tests/refresh-rate-test",
      "/tests/hdr-capability-test"
    ],
    "steps": [
      {
        "title": "Resolución y capacidades de pantalla",
        "description": "Verifique resolución nativa, ratio de píxeles y tasa de refresco informada."
      },
      {
        "title": "Nitidez de texto y claridad de subpíxeles",
        "description": "Compruebe renderizado tipográfico, suavizado y nitidez sin artefactos."
      },
      {
        "title": "Comprobación de píxeles muertos",
        "description": "Recorra campos de color primarios para detectar subpíxeles oscuros inactivos."
      },
      {
        "title": "Inspección de píxeles atascados",
        "description": "Compruebe subpíxeles permanentemente encendidos que no conmutan a apagado."
      },
      {
        "title": "Uniformidad de colores sólidos",
        "description": "Verifique campos rojo, verde, azul, cian, magenta y amarillo en el panel."
      },
      {
        "title": "Pasos de gradiente en escala de grises",
        "description": "Inspeccione transiciones de 0% a 100% de luminancia sin bandas marcadas."
      },
      {
        "title": "Brillo y rango dinámico",
        "description": "Asegúrese de que el espectro completo de negro a blanco sea distinguible."
      },
      {
        "title": "Pasos de contraste",
        "description": "Verifique separación clara entre las muestras de contraste escalonado."
      },
      {
        "title": "Recorte de nivel de negro",
        "description": "Ajuste el nivel de negro para que las sombras oscuras no se aplasten."
      },
      {
        "title": "Recorte de nivel de blanco",
        "description": "Ajuste el contraste para que las luces altas no se quemen en blanco puro."
      },
      {
        "title": "Uniformidad de luminancia en pantalla",
        "description": "Busque manchas, viñeteado o efecto de pantalla sucia en campos grises."
      },
      {
        "title": "Fugas de luz y brillo IPS",
        "description": "Pruebe a oscuras para aislar fugas del bisel respecto al brillo IPS angular."
      },
      {
        "title": "Ghosting y respuesta de píxel",
        "description": "Observe formas móviles de alto contraste para detectar estelas o barrido."
      },
      {
        "title": "Frecuencia de refresco y timing",
        "description": "Confirme que requestAnimationFrame del navegador coincida con la tasa del panel."
      },
      {
        "title": "HDR y gama amplia de color",
        "description": "Compruebe soporte de HDR en el sistema y espacio de color P3 cuando aplique."
      }
    ]
  },
  {
    "id": "tv",
    "route": "/monitor-inspection/tv",
    "title": "Inspección de pantalla de TV",
    "shortDescription": "Compruebe calidad de pantalla, atenuación local y rendimiento de su televisor.",
    "longDescription": "Una suite de pruebas especializada para televisores de salón y pantallas de gran formato conectadas por HDMI. Identifica halos de atenuación local (blooming), efecto pantalla sucia (DSE), tirones en 24p, recorte por sobreexploración y HDR.",
    "inspectionTip": "Cambie el modo de imagen a 'PC', 'Juego' o 'Filmmaker' y ajuste la relación de aspecto a 'Solo escaneo' / '1:1' para desactivar la nitidez artificial y el recorte de bordes.",
    "browserLimitations": "Las funciones de procesamiento de imagen del televisor (como la interpolación de movimiento) deben configurarse directamente en el menú propio del televisor.",
    "sequence": [
      "/tests/hdr-test",
      "/tests/near-black-test",
      "/tests/uniformity-test",
      "/tests/tv-overscan-test",
      "/tests/scaling-aspect-test",
      "/tests/viewing-angle-test"
    ],
    "steps": [
      {
        "title": "Inspección visual de HDR",
        "description": "Verifique el comportamiento de luces altas y la reproducción de gama amplia."
      },
      {
        "title": "Detalle en sombras Near-Black",
        "description": "Compruebe el nivel de negro HDMI para evitar sombras aplastadas o negros lavados."
      },
      {
        "title": "Uniformidad y efecto pantalla sucia (DSE)",
        "description": "Desplácese por campos grises para detectar bandas verticales o manchas oscuras."
      },
      {
        "title": "Overscan de TV y mapeo de píxeles 1:1",
        "description": "Verifique salida completa 4K/1080p sin recorte de píxeles en los bordes."
      },
      {
        "title": "Relación de aspecto y geometría",
        "description": "Confirme que patrones circulares y cuadrados conserven proporciones exactas."
      },
      {
        "title": "Ángulos de visión en sala de estar",
        "description": "Evalúe degradación de color y contraste desde posiciones de asiento laterales."
      }
    ]
  }
];
