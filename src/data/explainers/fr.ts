import { ExplainerData, ExplainerLabels } from "./types";

export const FR_LABELS: ExplainerLabels = {
  "overviewHeading": "Aperçu de l'Inspection de l'Écran",
  "whatToLookForHeading": "Ce Qu'il Faut Observer Pendant l'Inspection",
  "boundariesHeading": "Limites de Mesure et Honnêteté Technique",
  "canObserveLabel": "Ce Que Screen Tester Peut Observer",
  "cannotMeasureLabel": "Ce Que le Navigateur Ne Peut Pas Mesurer Précisément",
  "interpretationHeading": "Interprétation de Vos Observations",
  "nextStepsHeading": "Prochaines Étapes Recommandées"
};

export const FR_EXPLAINERS: Record<string, ExplainerData> = {
  "dead-pixel-test": {
    "overview": "Un píxel muerto es un sous-pixel de cristal líquido o un emisor OLED permanentemente apagado que permanece completamente oscuro independientemente de la señal que se le envíe. En fondos brillantes, especialmente blanc puro, cian y amarillo, los píxeles muertos se destacan como motas oscuras o negras estáticas y nítidas.",
    "whatToLookFor": [
      {
        "label": "Puntos oscuros estáticos en écrans blancas/claras",
        "description": "Un pequeño punto noir que no cambia ni se ilumina a medida que recorre fondos sólidos y brillantes indica un píxel muerto."
      },
      {
        "label": "Distinguir los píxeles muertos del polvo",
        "description": "El polvo de la superficie se desplaza cuando se ve desde diferentes ángulos y se puede limpiar suavemente. Un verdadero píxel muerto se encuentra detrás del filtro polarizador exterior."
      },
      {
        "label": "Defectos de sous-pixels frente a píxeles completos",
        "description": "Si solo falla un sous-pixel (rojo, verde o azul), el píxel aparecerá ligeramente descolorido en lugar de noir sobre blanc."
      },
      {
        "label": "Defectos del racimo",
        "description": "Múltiples píxeles muertos agrupados en un área pequeña representan un defecto grave del panel y generalmente califican para un reemplazo inmediato bajo garantía del fabricante."
      }
    ],
    "canObserve": [
      "Identificación visual de píxeles apagados en fondos primarios y secundarios sólidos",
      "Coordenadas exactas de la écran y recuento de puntos oscuros sospechosos en las zonas de visualización",
      "Validación de contraste entre la luminancia de fondo y los sous-pixels sin alimentación"
    ],
    "cannotMeasure": [
      "Continuidad eléctrica o estado de voltaje del transistor de película delgada (TFT) subyacente",
      "Detección automática sin inspección visual humana del usuario",
      "Clasificación de defectos físicos de fabricación bajo capas de vidrio."
    ],
    "interpretation": "Los píxeles muertos son causados ​​por fallas microscópicas de los transistores durante la fabricación del panel o por impacto físico. La mayoría de los fabricantes de écrans siguen las pautas ISO 9241-307 Clase 1 o Clase 2, que definen umbrales aceptables (generalmente de 2 a 5 sous-pixels muertos por millón).",
    "nextSteps": {
      "text": "Si detecta sous-pixels atascados que permanecen iluminados en lugar de negros, utilice nuestra herramienta de ejercicio dedicada para intentar recuperarlos.",
      "actionLabel": "Inicie el reparador de píxeles atascados",
      "actionHref": "/tests/stuck-pixel-fixer"
    }
  },
  "stuck-pixel-test": {
    "overview": "A diferencia de un píxel muerto que permanece permanentemente oscuro, un píxel atascado es causado por una celda de cristal líquido atascada en un estado abierto, lo que permite que la luz de fondo pase continuamente. Aparece como un punto persistente de couleur brillante, generalmente rojo, verde, azul, cian, magenta o blanc puro, más visible sobre fondos negros sólidos y oscuros.",
    "whatToLookFor": [
      {
        "label": "Puntos de couleurs brillantes sobre noir puro",
        "description": "Inspeccione una écran completamente negra en una habitación oscura. Cualquier punto nítido que brille en rojo, verde, azul o amarillo es un sous-pixel atascado."
      },
      {
        "label": "tests de couleur complementarias",
        "description": "Un sous-pixel verde atascado desaparecerá sobre un fondo verde, pero brillará intensamente sobre fondos rojos, azules o negros."
      },
      {
        "label": "Píxeles blancos calientes",
        "description": "Si los tres sous-pixels (RGB) están permanentemente abiertos, el punto aparecerá como un punto blanc estático en fondos oscuros."
      },
      {
        "label": "Distinción del sangrado de retroiluminación",
        "description": "Los píxeles atascados son pinchazos de luz de un solo píxel, mientras que el sangrado de la luz de fondo produce parches difusos similares a nubes a lo largo de los bordes de la écran."
      }
    ],
    "canObserve": [
      "Identificación visual de sous-pixels iluminados sobre fondos oscuros y complementarios.",
      "Aislamiento de canales de couleur de sous-pixels defectuosos individuales (R, G o B)",
      "Mapeo de cuadrantes de écran de píxeles defectuosos"
    ],
    "cannotMeasure": [
      "Viscosidad química del cristal líquido o estado de alineación física.",
      "Velocidad de conmutación de puerta de transistor o resistencia eléctrica",
      "Permanencia garantizada del defecto sin observación prolongada."
    ],
    "interpretation": "Los píxeles atascados ocurren con frecuencia cuando una molécula de cristal líquido no logra regresar a su estado relajado, a menudo debido a irregularidades de fabricación o cargas eléctricas microscópicas. A diferencia de los píxeles muertos, los píxeles atascados temporalmente a veces se pueden aflojar mediante estimulación visual.",
    "nextSteps": {
      "text": "¿Has localizado un píxel atascado? Intente una rápida estimulación visual de sous-pixels con nuestro ejercitador de couleur localizado.",
      "actionLabel": "Pruebe el solucionador de píxeles atascados",
      "actionHref": "/tests/stuck-pixel-fixer"
    }
  },
  "stuck-pixel-fixer": {
    "overview": "Stuck Pixel Fixer utiliza ciclos de couleur localizados de alta frecuencia y patrones de ruido visual para excitar rápidamente las moléculas de cristal líquido. La alternancia rápida de couleurs primarios y secundarios obliga a los transistores de sous-pixels y a las células de cristal líquido a alternar estados a alta velocidad, lo que ocasionalmente puede liberar un sous-pixel temporalmente atascado.",
    "whatToLookFor": [
      {
        "label": "Alineación de caja dirigida",
        "description": "Coloque la caja de estimulación animada directamente sobre el píxel atascado para evitar distracciones estroboscópicas en toda la écran."
      },
      {
        "label": "Selección de patrón",
        "description": "Alterne entre ciclo RGB (estimulación amplia) y ruido de couleur (excitación aleatoria de alta frecuencia) para obtener resultados óptimos."
      },
      {
        "label": "Duración de la sesión",
        "description": "Ejecute la estimulación durante 15 a 30 minutos, luego haga una pausa e inspeccione en noir puro para verificar si el píxel se ha liberado."
      },
      {
        "label": "Aviso de sensibilidad visual",
        "description": "Si experimenta mareos, dolor de cabeza o fatiga visual, detenga la estimulación inmediatamente. Nunca utilizar si es fotosensible."
      }
    ],
    "canObserve": [
      "Reproducción visual en tiempo real de ciclos RGB de alta velocidad y patrones de ruido de sous-pixels aleatorios",
      "Posicionamiento localizado preciso y seguimiento de la duración del temporizador directamente en su navegador",
      "Confirmación visual de si la capacidad de respuesta de los píxeles cambia antes y después de la estimulación"
    ],
    "cannotMeasure": [
      "Reparación eléctrica a nivel de hardware de transistores TFT físicamente dañados o quemados",
      "Cualquier porcentaje de recuperación garantizado: el éxito depende completamente de la química del panel físico.",
      "Reparación automática de software de píxeles muertos (negros permanentemente apagados)"
    ],
    "interpretation": "Los ejercitadores de software trabajan exclusivamente con células de cristal líquido temporalmente atascadas. Si un sous-pixel se desprende físicamente, se fractura o está completamente muerto (sin alimentación), la estimulación del software no puede revivirlo. Si la estimulación falla después de repetidas sesiones, consulte los términos de garantía del fabricante.",
    "nextSteps": {
      "text": "Después de ejecutar la estimulación, vuelva a la test de píxeles atascados para inspeccionar el área en noir puro.",
      "actionLabel": "Verificar con test de píxeles atascados",
      "actionHref": "/tests/stuck-pixel-test"
    }
  },
  "refresh-rate-test": {
    "overview": "La frecuencia de actualización de la écran (medida en Hertz, Hz) indica cuántas veces por segundo la écran reconstruye la imagen. Esta test utiliza el reloj de animación de alta résolution del navegador (requestAnimationFrame) para observar el ritmo de entrega de fotogramas, detectar fotogramas perdidos y verificar si el navegador coincide con la frecuencia de actualización configurada de su sistema operativo.",
    "whatToLookFor": [
      {
        "label": "Frecuencia de actualización informada versus configurada",
        "description": "Verifique que el valor informado coincida con el objetivo de su écran (por ejemplo, 60 Hz, 120 Hz, 144 Hz, 240 Hz o 360 Hz)."
      },
      {
        "label": "Ritmo de cuadro y fluctuación",
        "description": "Mire el gráfico del delta de tiempo entre fotogramas. Una écran estable de 144 Hz debería ofrecer fotogramas a intervalos constantes de ~6,94 ms."
      },
      {
        "label": "Limitación de marco del navegador",
        "description": "Si un monitor de 144 Hz informa exactamente 60 Hz, es posible que la configuración de écran de su navegador o sistema operativo esté limitada para ahorrar batería o que falten indicadores de GPU."
      },
      {
        "label": "Suavidad del indicador móvil",
        "description": "Inspeccione la barra móvil. En écrans de alta actualización, la animación debe deslizarse con un mínimo de vibración o tartamudeo."
      }
    ],
    "canObserve": [
      "Solicitud del navegadorAnimationFrame Frecuencia de devolución de llamada y variación del tiempo delta",
      "FPS de animación de navegador calculados y consistencia de ritmo de fotogramas",
      "Entrega de sincronización del compositor en ventana en la pestaña activa del navegador"
    ],
    "cannotMeasure": [
      "Frecuencia de actualización del hardware del panel físico independiente de los límites del compositor del navegador",
      "Ancho de banda de enlace de cable DisplayPort o HDMI y temporización de paquetes",
      "Intervalos de supresión vertical a nivel de osciloscopio (VBLANK) o sincronización de sobremarcha del panel"
    ],
    "interpretation": "Los navegadores web sincronizan sus bucles de renderizado con el compositor de visualización a través de vsync. Sin embargo, los perfiles de ahorro de energía, las configuraciones de varios monitores con frecuencias de actualización no coincidentes o la limitación de pestañas en segundo plano pueden hacer que el navegador se muestre por debajo de la capacidad nativa del monitor.",
    "nextSteps": {
      "text": "¿Su frecuencia de actualización tiene un límite de 60 Hz en un monitor de juegos? Consulte nuestra guía sobre cómo configurar las frecuencias de actualización de la écran del sistema operativo y la GPU.",
      "actionLabel": "Leer Solución de problemas de frecuencia de actualización",
      "actionHref": "/knowledge-base/troubleshooting#refresh-rate-capped"
    }
  },
  "ghosting-test": {
    "overview": "El efecto fantasma en mouvement aparece como sombras que se arrastran o réplicas manchadas detrás de objetos en mouvement. Ocurre cuando las moléculas de cristal líquido tardan más en realizar la transición entre estados de couleur (tiempo de respuesta de píxeles) que la duración de un solo cuadro de actualización. Esta test representa bloques en mouvement contra varios tonos de fondo para exponer las coronas de sobremarcha y seguimiento del tiempo de respuesta.",
    "whatToLookFor": [
      {
        "label": "Sombras oscuras (fantasma tradicional)",
        "description": "Una mancha oscura detrás de un objeto en mouvement indica transiciones lentas de cristal líquido de oscuro a claro, comunes en los paneles VA."
      },
      {
        "label": "Halos/Coronas brillantes (efecto fantasma inverso)",
        "description": "Un rastro brillante detrás del objeto significa que la configuración de Overdrive (OD) o Tiempo de respuesta del monitor es demasiado agresiva (overshoot)."
      },
      {
        "label": "Seguimiento de couleur específico",
        "description": "Observe si el seguimiento es peor en fondos rojos, verdes o gris oscuro. Los tiempos de transición varían mucho entre pares de couleurs."
      },
      {
        "label": "Observación con cámara de persecución",
        "description": "Siga el objeto en mouvement con los ojos o con una cámara en mouvement para aislar la respuesta del panel que se desprende del desenfoque del mouvement de la retina."
      }
    ],
    "canObserve": [
      "Presencia visual de bordes de fuga, manchas y coronas de sobreimpulso en velocidades personalizables",
      "Comparación de sensibilidad de contraste de pares de couleurs (transiciones de claro a oscuro versus de oscuro a claro)",
      "Impacto visual de ajustar la configuración OSD física de Overdrive/Tiempo de respuesta de su monitor"
    ],
    "cannotMeasure": [
      "Tiempo de respuesta de laboratorio gris a gris (GtG) en milisegundos exactos",
      "Curvas de caída de intensidad de luz de la cámara de seguimiento fotométrica",
      "Curvas de respuesta de voltaje de cristal líquido de sous-pixels"
    ],
    "interpretation": "El efecto fantasma está determinado fundamentalmente por la tecnología del panel (TN es rápido pero de couleur deficiente, IPS está equilibrado, VA a menudo muestra manchas en el nivel de oscuridad, OLED tiene una respuesta casi instantánea). Ajustar la configuración OSD 'Tiempo de respuesta' o 'Overdrive' de su monitor a Medio generalmente logra el mejor equilibrio entre imágenes fantasma y sobreimpulso.",
    "nextSteps": {
      "text": "¿Quiere aprender cómo funciona la sobremarcha del monitor y cómo eliminar los halos fantasma inversos?",
      "actionLabel": "Lea la guía de imágenes fantasma y desenfoque de mouvement",
      "actionHref": "/knowledge-base/monitor-ghosting-and-motion-blur"
    }
  },
  "motion-blur-test": {
    "overview": "A diferencia del efecto fantasma (que surge de una respuesta lenta de los píxeles), el desenfoque de mouvement en los paneles planos modernos es causado predominantemente por la mecánica de visualización de muestreo y retención. Debido a que la écran mantiene cada cuadro de imagen continuamente hasta la siguiente actualización, sus ojos siguen el mouvement suave a través de una imagen estática, creando una percepción de desenfoque retiniano.",
    "whatToLookFor": [
      {
        "label": "Retención de detalles a alta velocidad",
        "description": "Observe las finas líneas verticales y el texto a medida que viajan por la écran. Observe dónde se combinan los detalles finos."
      },
      {
        "label": "Comparación de velocidad",
        "description": "Compare el mouvement de baja velocidad (240 px/s) con el de alta velocidad (960 px/s) para ver cómo el desenfoque del seguimiento ocular aumenta con la velocidad."
      },
      {
        "label": "Efectos de inserción de marco noir (BFI)",
        "description": "Si su monitor tiene una función de retroiluminación estroboscópica (ULMB, ELMB, DyAc), habilitarla agudiza drásticamente los patrones en mouvement."
      },
      {
        "label": "Desenfoque de muestra y retención OLED",
        "description": "Incluso con una respuesta de píxeles instantánea de 0,1 ms, el desenfoque de muestreo y retención seguirá produciéndose a 60 Hz o 120 Hz sin luz estroboscópica."
      }
    ],
    "canObserve": [
      "Diferencias de desenfoque de mouvement perceptual a través de diferentes velocidades horizontales y frecuencias de actualización",
      "Mejoras en la netteté visual al utilizar los modos estroboscópicos/BFI de retroiluminación del hardware",
      "Contraste entre bordes estáticos nítidos y contornos en mouvement borrosos"
    ],
    "cannotMeasure": [
      "Tiempo de respuesta física de imágenes en mouvement (MPRT) en milisegundos exactos",
      "Curvas de integración de la luz retiniana de la visión humana.",
      "Porcentaje del ciclo de trabajo de la luz de fondo estroboscópica"
    ],
    "interpretation": "Para reducir el desenfoque de muestreo y retención, las écrans deben aumentar la frecuencia de actualización (acortando la duración de la visualización de cada cuadro) o implementar luz de fondo estroboscópica (insertando intervalos oscuros para aclarar la persistencia de la retina).",
    "nextSteps": {
      "text": "Compárelo con la test de frecuencia de actualización para comprender cómo los Hz más altos reducen el desenfoque de mouvement.",
      "actionLabel": "Inspeccionar frecuencia de actualización",
      "actionHref": "/tests/refresh-rate-test"
    }
  },
  "vrr-test": {
    "overview": "La frecuencia de actualización variable (VRR), que incluye NVIDIA G-Sync, AMD FreeSync y VESA Adaptive-Sync, sincroniza dinámicamente los ciclos de actualización de su monitor con la velocidad de procesamiento de fotogramas de la GPU. Esta test modula las tasas de entrega de animación para inspeccionar visualmente el ritmo, el desgarro y la vibración de fotogramas adaptativos en su navegador.",
    "whatToLookFor": [
      {
        "label": "Artefactos desgarradores de écran",
        "description": "Busque líneas de división horizontales donde la parte superior e inferior de la imagen muestren diferentes fotogramas simultáneamente."
      },
      {
        "label": "Vibración y tartamudeo del marco",
        "description": "Observe si el indicador móvil se desliza suavemente o muestra micropausas a medida que cambia la frecuencia de renderizado."
      },
      {
        "label": "VRR en ventana o en écran completa",
        "description": "Muchos controladores de GPU solo activan G-Sync/FreeSync en aplicaciones de écran completa real, a menos que estén configurados para el modo de ventana."
      },
      {
        "label": "LFC (compensación de baja velocidad de fotogramas)",
        "description": "Cuando la velocidad de fotogramas cae por debajo del rango VRR mínimo de su monitor (por ejemplo, por debajo de 48 Hz), observe si los fotogramas se duplican sin problemas."
      }
    ],
    "canObserve": [
      "Líneas visuales desgarradas y micro tartamudeo durante el renderizado de intervalo variable",
      "Suavidad del ritmo de la animación en condiciones de entrega de fotogramas fluctuantes",
      "Diferencia percibida por el usuario entre el comportamiento de visualización en ventana y en écran completa"
    ],
    "cannotMeasure": [
      "Protocolo de enlace interno del controlador de GPU con hardware escalador de monitor",
      "Estado de activación del módulo G-Sync/FreeSync a nivel de hardware",
      "Comunicación de metadatos del canal DisplayPort AUX en tiempo real"
    ],
    "interpretation": "Debido a que los navegadores web se ejecutan dentro del compositor de ventanas del sistema operativo, la participación de VRR depende de la configuración a nivel del sistema operativo (como la programación de GPU acelerada por hardware de Windows y la configuración de G-Sync en ventana del controlador de GPU).",
    "nextSteps": {
      "text": "¿Experimentas microtartamudeos o desgarros? Revise nuestra guía de solución de problemas de VRR paso a paso.",
      "actionLabel": "Lea la solución de problemas de VRR",
      "actionHref": "/knowledge-base/troubleshooting#vrr-stutter-tearing"
    }
  },
  "backlight-bleed-test": {
    "overview": "El sangrado de retroiluminación ocurre en écrans LCD cuando la capa de cristal líquido no logra bloquear completamente la luz emitida por CCFL o retroiluminación LED, lo que permite que la luz se filtre por los bordes o esquinas. Esta test de noir puro en écran completa le permite inspeccionar fugas en los bordes, parches turbios y distinguir el sangrado del luminosité IPS desde el ángulo de visión.",
    "whatToLookFor": [
      {
        "label": "Bengalas de luz para bordes y esquinas",
        "description": "Luz amarilla o blanca brillante que se acumula a lo largo de los bordes exteriores del marco y permanece visible independientemente del ángulo de visión."
      },
      {
        "label": "luminosité IPS vs sangrado de retroiluminación",
        "description": "Mueve la cabeza de lado a lado. Si el luminosité cambia de posición o cambia de intensidad con su ángulo, es un luminosité IPS normal, no un sangrado."
      },
      {
        "label": "Nublamiento / Murafanning",
        "description": "Áreas difusas e irregulares de luminosité elevado esparcidas por el panel causadas por láminas de difusión desigual o presión mecánica."
      },
      {
        "label": "Comparación OLED / Mini-LED",
        "description": "Las écrans OLED emiten luz por píxel y no presentan pérdida de retroiluminación (0 nits puros). Los mini-LED FALD pueden mostrar un halo localizado."
      }
    ],
    "canObserve": [
      "Fuga visual en los bordes, puntos de pellizco localizados en el bisel y patrones nublados contra el noir",
      "Gravedad relativa de la fuga de luz en las esquinas de la écran en un entorno oscuro",
      "Diferencias de sensibilidad del ángulo de visión (distinguiendo el sangrado estático del luminosité dinámico de IPS)"
    ],
    "cannotMeasure": [
      "Luminancia absoluta del panel en cd/m² (nits) sin espectrofotómetro",
      "Relación de contraste estático nativo (por ejemplo, 1000:1 frente a 3000:1)",
      "Certificación de cumplimiento de contraste ANSI de 16 zonas"
    ],
    "interpretation": "El luminosité suave de IPS es una característica óptica inherente de los paneles de conmutación en plano de gran angular. Sin embargo, el sangrado grave de la luz de fondo es un defecto de ensamblaje mecánico en el que el bisel del monitor pellizca la placa guía de luz interna.",
    "nextSteps": {
      "text": "Conozca las diferencias cruciales entre el luminosité de IPS, el sangrado de retroiluminación y los niveles de noir de OLED.",
      "actionLabel": "Lea la guía de purga de retroiluminación frente a luminosité IPS",
      "actionHref": "/knowledge-base/backlight-bleed-vs-ips-glow"
    }
  },
  "near-black-test": {
    "overview": "Las tests de casi noir evalúan la capacidad de una écran para delinear tonos sutiles de gris oscuro inmediatamente por encima del noir puro (0% a 5% de luminancia). Si un monitor convierte las sombras oscuras en noir puro, se perderán permanentemente los detalles críticos de las sombras en películas, juegos y edición de fotografías.",
    "whatToLookFor": [
      {
        "label": "Black Crush (recorte prematuro)",
        "description": "Si el paso 1 (0,5 % o 1 %) es completamente invisible y se fusiona con un noir puro, su monitor sufre un aplastamiento del noir."
      },
      {
        "label": "Distinción de paso individual",
        "description": "Debería poder percibir contornos de límites tenues entre muestras grises consecutivas de baja luminosidad en una habitación oscura."
      },
      {
        "label": "Desplazamiento gamma del ángulo de visión",
        "description": "En los paneles VA, busque el \"aplastamiento noir en el eje\": detalle de sombra que aparece solo cuando se ve ligeramente fuera de ángulo."
      },
      {
        "label": "Reflejo de luz ambiental",
        "description": "Apague las luces del techo de la habitación; El resplandor ambiental perjudica gravemente la percepción del ojo humano de tonos casi negros."
      }
    ],
    "canObserve": [
      "Umbrales de visibilidad visual para parches de luminancia casi negros del 0,5%, 1%, 2%, 3%, 4% y 5%",
      "Separación de detalles de sombras perceptuales en muestras de couleurs oscuros",
      "Impacto de la configuración del monitor Gamma, Ecualizador de noir y Rango dinámico HDMI"
    ],
    "cannotMeasure": [
      "Valores de luminancia fotométrica inferiores a 0,05 nits sin couleurímetro de laboratorio",
      "Conformidad matemática exacta de la curva gamma (BT.1886 frente a 2,2 frente a sRGB)",
      "Panel hardware punto noir nativo en candelas absolutas por metro cuadrado"
    ],
    "interpretation": "El aplastamiento del noir suele ser causado por un rango dinámico de salida de couleur de la GPU incorrecto (Limitado 16–235 frente a Completo 0–255), un ecualizador de noir del monitor demasiado agresivo o curvas gamma de gama baja no lineales.",
    "nextSteps": {
      "text": "¿Perdiendo detalles de sombras en juegos y vídeos? Siga nuestra guía de solución de problemas para corregir el aplastamiento noir.",
      "actionLabel": "Lea la solución de problemas de Black Crush",
      "actionHref": "/knowledge-base/troubleshooting#black-crush"
    }
  },
  "gradient-banding-test": {
    "overview": "Los degradados de couleur suaves requieren gradaciones finas en miles de valores tonales intermedios. Cuando un panel de visualización, un controlador de gráficos o un canal de imágenes tiene una profundidad de bits insuficiente o un procesamiento de couleur deficiente, los gradientes suaves se degradan en bandas escalonadas visibles o líneas de posterización marcadas.",
    "whatToLookFor": [
      {
        "label": "Líneas de paso visibles",
        "description": "Busque límites de franjas verticales u horizontales distintos en transiciones suaves de couleur RGB y escala de grises."
      },
      {
        "label": "Bandas específicas del canal",
        "description": "Observe si las bandas son más pronunciadas en los degradados de sombras azules u oscuras en comparación con la escala de grises de tonos medios."
      },
      {
        "label": "Cuantización de profundidad de bits",
        "description": "Los verdaderos paneles de 8 y 10 bits generan rampas suaves. Los paneles de 6 bits que dependen del control de velocidad de fotogramas (FRC) muestran un grano o bandas sutiles."
      },
      {
        "label": "Rango dinámico limitado versus completo",
        "description": "Si su GPU transmite una señal limitada (16–235) a través de HDMI, los extremos del degradado oscuro y brillante se recortarán nítidamente."
      }
    ],
    "canObserve": [
      "Presencia visual de pasos de bandas de couleur en escala de grises y gradientes de couleurs primarios/secundarios",
      "Comparación entre rampas de couleur horizontales, verticales y multicanal",
      "Artefactos visuales resultantes de perfiles de couleur de software o configuraciones de rango dinámico de GPU"
    ],
    "cannotMeasure": [
      "Profundidad de bits de hardware directo (6 bits, 8 bits, 10 bits) independiente de los informes de GPU",
      "Desviación de couleur Delta E cuantificada entre pasos de couleur adyacentes",
      "Rendimiento del algoritmo de difuminado espacial a nivel de escalador de hardware"
    ],
    "interpretation": "Las bandas pueden deberse a limitaciones de hardware (paneles de 6 bits), configuraciones incorrectas del controlador (rango dinámico RGB limitado) o perfiles de calibración ICC agresivos que truncan los valores de couleur digitales.",
    "nextSteps": {
      "text": "¿Quiere simular pasos específicos de 6 bits, 8 bits y difuminado? Pruebe nuestra herramienta dedicada Bandas de couleur y profundidad de bits.",
      "actionLabel": "Pruebe la test de profundidad de bits y tramado",
      "actionHref": "/tests/color-banding-test"
    }
  },
  "uniformity-test": {
    "overview": "La uniformidad de la écran mide la consistencia con la que un monitor reproduce el luminosité y la temperatura del couleur en toda su superficie. Las imperfecciones en la fabricación, las láminas de difusión de la retroiluminación o la iluminación de los bordes a menudo provocan esquinas más oscuras, puntos calientes centrales o el efecto de écran sucia (DSE).",
    "whatToLookFor": [
      {
        "label": "Viñeteado de esquinas y bordes",
        "description": "Inspeccione las esquinas exteriores y los bordes perimetrales con un 25 %, 50 % y 75 % de gris. Observe si las esquinas aparecen notablemente más oscuras."
      },
      {
        "label": "Efecto de écran sucia (DSE)",
        "description": "Busque patrones de textura tenues, turbios o con manchas en el centro de la écran, que se notan al desplazarse por tonos sólidos."
      },
      {
        "label": "Tinte de temperatura de couleur",
        "description": "Observe si un lado de la écran parece más cálido (rojizo/amarillento) y el lado opuesto más frío (azulado)."
      },
      {
        "label": "Comparación zona por zona",
        "description": "Compare las celdas de la cuadrícula de 5x5 para evaluar la variación relativa de luminancia desde el centro hasta el perímetro."
      }
    ],
    "canObserve": [
      "Caídas de luminancia visual, viñeteado de bordes y puntos calientes centrales en grises y blancos sólidos",
      "La temperatura del couleur visual cambia entre las regiones del panel izquierdo, central y derecho",
      "Inspección en múltiples niveles de luminancia estandarizados de grises neutros y couleurs primarios"
    ],
    "cannotMeasure": [
      "Métricas de uniformidad porcentual (por ejemplo, '98,5% uniforme') sin rejillas de espectrofotómetro multipunto",
      "Variaciones de temperatura de couleur correlacionada (CCT en Kelvin) entre las coordenadas del panel",
      "Estado de activación del circuito de compensación de uniformidad de fábrica (DUC)"
    ],
    "interpretation": "Los monitores de consumo generalmente toleran una caída de luminancia del 10 % al 15 % hacia los bordes. Los monitores gráficos profesionales emplean Compensación de Uniformidad Digital (DUC) para lograr una variación inferior al 5%.",
    "nextSteps": {
      "text": "Descubra por qué se producen el efecto de écran sucia y el viñeteado y cuándo se justifica el reemplazo del panel.",
      "actionLabel": "Leer la guía de uniformidad de écran",
      "actionHref": "/knowledge-base/backlight-bleed-vs-ips-glow"
    }
  },
  "text-clarity-test": {
    "overview": "La claridad del texto depende de la densidad de píxeles del monitor (PPI), la configuración de escala de la écran, la geometría física de los sous-pixels (RGB, BGR, QD-OLED pentile) y los algoritmos de suavizado de fuentes del sistema operativo. Esta test evalúa la legibilidad, los bordes de couleur y la representación de fuentes en múltiples tamaños y pesos.",
    "whatToLookFor": [
      {
        "label": "Franjas de couleur en los bordes de la fuente",
        "description": "Inspeccione el texto noir de alto contraste sobre blanc. Los tenues halos rojos o cian a lo largo de los trazos verticales indican una discrepancia en el diseño de los sous-pixels."
      },
      {
        "label": "Inversión de sous-pixels BGR",
        "description": "Algunos monitores utilizan diseños de sous-pixels BGR en lugar de RGB estándar, lo que provoca texto borroso a menos que se reconfigure Windows ClearType."
      },
      {
        "label": "Bordes de texto OLED",
        "description": "Las disposiciones de sous-pixels WOLED y QD-OLED triangulares producen sutiles franjas verdes o magenta a lo largo de los bordes horizontales del texto."
      },
      {
        "label": "Desenfoque de escala fraccional",
        "description": "La escala de visualización no entera (como 125 % o 150 %) puede causar una sutil suavidad en la rasterización de fuentes en aplicaciones de escritorio heredadas."
      }
    ],
    "canObserve": [
      "Franjas de couleur visuales y halos en contornos de texto fino en tamaños de fuente de 8 px a 32 px",
      "Diferencias de representación de sous-pixels entre los pesos de fuente, serif frente a sans-serif y modos de inversión",
      "Impacto del zoom del navegador y la escala de visualización del sistema operativo en la netteté de las fuentes"
    ],
    "cannotMeasure": [
      "Geometría física microscópica de sous-pixels sin lente macro ni microscopio",
      "Indicadores de configuración del rasterizador de fuentes DirectWrite/ClearType internos del sistema operativo",
      "Función de transferencia de modulación de netteté acústica u óptica (MTF)"
    ],
    "interpretation": "Si el texto aparece borroso con contornos de couleurs, volver a ejecutar Windows ClearType Tuner o ajustar el suavizado de fuentes de macOS a menudo resuelve las incompatibilidades de diseño RGB/BGR.",
    "nextSteps": {
      "text": "¿Ves fuentes borrosas o franjas de couleurs alrededor del texto? Siga nuestra guía para ajustar ClearType y mostrar la escala.",
      "actionLabel": "Leer solución de problemas de claridad del texto",
      "actionHref": "/knowledge-base/troubleshooting#blurry-text-scaling"
    }
  },
  "hdr-capability-test": {
    "overview": "Le test des capacités HDR vérifie si votre écran, votre système d'exploitation et votre navigateur prennent en charge les profils de haute dynamique (HDR10, Dolby Vision) et l'espace étendu.",
    "whatToLookFor": [
      {
        "label": "Prise en charge du profil HDR",
        "description": "Vérifiez si l'écran signale une compatibilité HDR active dans l'espace colorimétrique étendu."
      },
      {
        "label": "Luminosité maximale",
        "description": "Observez les zones de hautes lumières pour confirmer l'impact lumineux supérieur."
      }
    ],
    "canObserve": [
      "Détection de la prise en charge de l'espace étendu",
      "Prise en charge de la plage dynamique du moniteur"
    ],
    "cannotMeasure": [
      "Pic lumineux réel en nits (cd/m²)",
      "Capacité matérielle de gradation locale"
    ],
    "interpretation": "Si le profil HDR est détecté, votre système est prêt pour les flux vidéo et jeux en ultra-haute dynamique.",
    "nextSteps": {
      "text": "Souhaitez-vous lancer la mire HDR ?",
      "actionLabel": "Lancer le test HDR",
      "actionHref": "/tests/hdr-test"
    }
  },
  "hdr-test": {
    "overview": "La mire de test HDR évalue le rendu des hautes lumières, le contraste dynamique et la gradation des détails sans écrêtage lumineux.",
    "whatToLookFor": [
      {
        "label": "Détails dans les hautes lumières",
        "description": "Vérifiez que les zones les plus lumineuses conservent leurs détails sans saturation excessive."
      },
      {
        "label": "Profondeur des noirs",
        "description": "Assurez-vous que les noirs restent profonds en présence d'éléments lumineux intenses."
      }
    ],
    "canObserve": [
      "Rendu des contrastes extrêmes",
      "Absence d'écrêtage des hautes lumières"
    ],
    "cannotMeasure": [
      "Courbe EOTF PQ exacte au niveau photométrique"
    ],
    "interpretation": "Un affichage équilibré entre noirs denses et pics de clarté confirme une excellente gestion HDR.",
    "nextSteps": {
      "text": "Vérifiez les niveaux de noir",
      "actionLabel": "Test du niveau de noir",
      "actionHref": "/tests/black-level-test"
    }
  },
  "strobe-crosstalk-test": {
    "overview": "La luz de fondo estroboscópica (ULMB, DyAc, ELMB, LightBoost) elimina el desenfoque del mouvement del seguimiento ocular al encender la luz de fondo solo cuando los cristales líquidos han terminado de realizar la transición. Sin embargo, debido a que las écrans escanean los píxeles de arriba a abajo mientras las luces de fondo parpadean globalmente en toda la écran, las transiciones de píxeles en la parte superior o inferior pueden estar incompletas cuando se activa el pulso. Esta discrepancia de tiempo crea imágenes fantasma duplicadas conocidas como diafonía estroboscópica.",
    "whatToLookFor": [
      {
        "label": "Siluetas de doble imagen",
        "description": "Observe las barras en mouvement en las pistas superior, central e inferior. Observe si ve una sola barra nítida o un débil fantasma duplicado siguiéndola o preparándola."
      },
      {
        "label": "Claridad superior versus central versus inferior",
        "description": "La mayoría de los monitores optimizan la fase estroboscópica para el centro de la écran. La zona central debe mostrar mouvement nítido de una sola imagen, mientras que las zonas superior e inferior suelen mostrar distintos grados de diafonía."
      },
      {
        "label": "Ancho y luminosité del pulso estroboscópico",
        "description": "Los pulsos estroboscópicos más cortos producen un mouvement más nítido pero un luminosité general de la écran más bajo. Ajuste el ciclo de trabajo del estroboscópico de su monitor en su OSD para equilibrar la claridad y la luminancia."
      }
    ],
    "canObserve": [
      "Visibilidad relativa de diafonía estroboscópica en las zonas verticales de la écran.",
      "Identificación del punto óptimo de calibración de fase estroboscópica en su panel",
      "Comparación de la reducción del desenfoque de mouvement a distintas velocidades de panorámica"
    ],
    "cannotMeasure": [
      "Duración exacta del flash estroboscópico de retroiluminación en microsegundos",
      "Pico de luminancia estroboscópica fotométrica en nits sin fotodiodo",
      "Velocidad de escaneo del panel de hardware e intervalo de tiempo VSYNC"
    ],
    "interpretation": "Una pequeña cantidad de interferencias estroboscópicas en los bordes superior e inferior es normal en los monitores LCD. Una diafonía intensa en la zona central indica una fase estroboscópica no coincidente o una desincronización de la frecuencia de actualización.",
    "nextSteps": {
      "text": "Compare el mouvement estroboscópico con el desenfoque de mouvement nativo de muestreo y retención.",
      "actionLabel": "Ejecutar test de desenfoque de mouvement",
      "actionHref": "/tests/motion-blur-test"
    }
  },
  "vrr-flicker-test": {
    "overview": "La frecuencia de actualización variable (VRR / G-Sync / FreeSync) hace coincidir dinámicamente la frecuencia de actualización de la écran con la salida de renderizado de la GPU. Sin embargo, la relajación del cristal líquido y las curvas de luminancia de los píxeles OLED varían según la duración del ciclo de actualización. Cuando las velocidades de fotogramas oscilan rápidamente, especialmente entre FPS altos y umbrales de límites más bajos, las curvas de luminancia cambian dinámicamente, produciendo un scintillement de luminosité notable en áreas oscuras y casi negras.",
    "whatToLookFor": [
      {
        "label": "Bombeo de luminosité casi noir",
        "description": "Observe los parches de 10% casi negros y 25% de gris oscuro a medida que avanza el ciclo de barrido de velocidad de fotogramas automatizado. Busque pulsaciones rítmicas sutiles en la oscuridad general."
      },
      {
        "label": "Sacudida de transición LFC (compensación de baja velocidad de fotogramas)",
        "description": "Cuando la velocidad de cuadros cae por debajo del umbral mínimo de VRR (por ejemplo, por debajo de 48 Hz), los controladores de gráficos presentan una presentación de cuadro doble (LFC). Este rápido cambio de Hz puede provocar un scintillement momentáneo de luminancia."
      },
      {
        "label": "Cambio de gama OLED",
        "description": "Las écrans OLED son particularmente propensas al scintillement gamma VRR porque los tiempos de carga de los sous-pixels dependen en gran medida de la longitud del fotograma. Las texturas de las escenas oscuras pueden parpadear visiblemente durante las caídas de la velocidad de fotogramas."
      }
    ],
    "canObserve": [
      "Identificación visual de cambios en la curva gamma a través de niveles de luminancia de couleur gris oscuro",
      "Detección de bombeo de luminosité durante la oscilación de velocidad de fotogramas simulada",
      "Comparación entre la sensibilidad al scintillement del gris sutil de tonos medios y la sensibilidad al scintillement casi noir"
    ],
    "cannotMeasure": [
      "Paquetes de temporización de sincronización adaptativa de GPU a écran de hardware",
      "Fluctuaciones exactas de voltaje de sous-pixels OLED en milivoltios",
      "Detección automática sin evaluación visual del usuario"
    ],
    "interpretation": "Si observa fuertes pulsaciones de luminosité, su écran tiene curvas gamma VRR sensibles. Limite su velocidad de fotogramas ligeramente por debajo de la frecuencia de actualización máxima o desactive VRR en juegos con tiempos de fotogramas inestables para evitar el scintillement.",
    "nextSteps": {
      "text": "Verifique el rango y la compatibilidad con la frecuencia de actualización variable de su écran.",
      "actionLabel": "Ejecute la test de capacidad de VRR",
      "actionHref": "/tests/vrr-test"
    }
  },
  "pursuit-camera-test": {
    "overview": "Los ojos humanos siguen los objetos en mouvement en la écran con un mouvement de persecución suave y continuo. Las fotografías de cámaras fijas estándar no pueden capturar el desenfoque de mouvement real porque no se mueven con el ojo. Una cámara de seguimiento rastrea el patrón de mouvement a una velocidad exacta, lo que permite la captura fotográfica del tiempo de respuesta de imagen en mouvement (MPRT) percibido real y la mancha fantasma.",
    "whatToLookFor": [
      {
        "label": "Alineación de graduación temporal",
        "description": "La pista superior contiene marcas de graduación blancas verticales. Al realizar un seguimiento fluido con su cámara o teléfono, estas marcas se fusionarán en una única línea vertical nítida en su foto."
      },
      {
        "label": "Artefactos fantasmas y rastreros",
        "description": "Una vez que se verifica la sincronización del seguimiento mediante marcas verticales nítidas, examine el borde posterior del objeto en mouvement para ver la decadencia del fósforo, las coronas sobrecargadas o los rastros fantasma."
      },
      {
        "label": "Sobremarcha Sobreimpulso (Coronas)",
        "description": "Un contorno brillante que se arrastra detrás del objeto en mouvement indica una sobrecarga excesiva de píxeles del monitor (efecto fantasma inverso)."
      }
    ],
    "canObserve": [
      "Sincronización de panorámica de cámara mediante verificación de seguimiento de graduación temporal",
      "Ancho del frotis visual directamente proporcional al MPRT percibido",
      "Distinción entre desenfoque de transición de píxeles (GtG) y desenfoque de seguimiento ocular de muestreo y retención (MPRT)"
    ],
    "cannotMeasure": [
      "Cálculo MPRT automático sin tomar ni medir una fotografía de seguimiento",
      "Curvas de respuesta óptica de fotodiodos de submilisegundos",
      "Velocidad del riel de seguimiento óptico sin hardware calibrado"
    ],
    "interpretation": "Cuando las marcas de graduación temporal forman una línea vertical limpia en su exposición, el seguimiento se sincronizó. El ancho de la mancha que se arrastra sobre el objeto refleja el verdadero desenfoque de mouvement MPRT de la écran.",
    "nextSteps": {
      "text": "Compare el rendimiento del mouvement en diferentes configuraciones de overdrive en el OSD de su monitor.",
      "actionLabel": "Ejecutar test de imagen fantasma",
      "actionHref": "/tests/ghosting-test"
    }
  },
  "audio-sync-test": {
    "overview": "Le test de synchronisation audio/vidéo vérifie l'alignement temporel entre les repères sonores et les animations visuelles pour éliminer tout décalage (lip-sync).",
    "whatToLookFor": [
      {
        "label": "Précision de l'impact",
        "description": "Le son doit coïncider exactement avec le passage de la barre sur le repère zéro."
      },
      {
        "label": "Latence Bluetooth/HDMI",
        "description": "Détectez d'éventuels retards audio causés par des casques sans fil ou des barres de son."
      }
    ],
    "canObserve": [
      "Alignement précis image-son en millisecondes",
      "Latence des périphériques audio"
    ],
    "cannotMeasure": [
      "Temps de propagation interne du matériel audio analogique"
    ],
    "interpretation": "Une synchronisation parfaite à 0 ms garantit une expérience optimale pour les films et le jeu vidéo.",
    "nextSteps": {
      "text": "Testez vos haut-parleurs",
      "actionLabel": "Test des haut-parleurs",
      "actionHref": "/tests/speaker-test"
    }
  },
  "gamepad-test": {
    "overview": "Los controladores de juegos utilizan potenciómetros analógicos o sensores magnéticos de efecto Hall para traducir el mouvement del joystick en coordenadas direccionales. Con el tiempo, el desgaste interno del limpiador de carbono, la degradación de los resortes y la contaminación por polvo hacen que la palanca registre coordenadas descentradas cuando permanece intacta, un defecto conocido como deriva de la palanca.",
    "whatToLookFor": [
      {
        "label": "Deriva del palo en reposo",
        "description": "Suelte ambos joysticks por completo. Si el indicador en forma de cruz se encuentra fuera del punto cero central o se desplaza continuamente, hay deriva de la palanca."
      },
      {
        "label": "Error de circularidad",
        "description": "Gire los palos a lo largo de sus límites exteriores. Los gamepads de calidad producen un círculo limpio y suave sin quedar plano en las esquinas diagonales."
      },
      {
        "label": "Umbral de zona muerta",
        "description": "Comprueba hasta qué punto debes empujar la palanca antes de que responda la coordenada. Las zonas muertas excesivas hacen que apuntar sea lento, mientras que las zonas muertas demasiado pequeñas provocan desviaciones."
      },
      {
        "label": "Suavidad del disparador analógico",
        "description": "Apriete gradualmente los gatillos LT y RT. La lectura del porcentaje debe subir suavemente del 0 % al 100 % sin saltar ni quedarse pegado."
      }
    ],
    "canObserve": [
      "Lecturas de coordenadas X/Y del joystick analógico en tiempo real y valores de deriva en reposo",
      "Matriz de actuación digital completa de 16 botones y porcentajes de presión de disparo analógico",
      "Estado de conexión del controlador, nombre de ID del dispositivo y tasa de sondeo a través de la API HTML5 Gamepad"
    ],
    "cannotMeasure": [
      "Resistencia física del limpiador del potenciómetro en ohmios",
      "Nivel de voltaje de la batería interna (a menos que sea compatible con extensiones de navegador patentadas)",
      "Interferencias de radio inalámbricas Bluetooth o tasas de caída de paquetes"
    ],
    "interpretation": "Un valor de coordenadas en reposo inferior a 0,05 (5 %) suele ser absorbido por las zonas muertas del juego estándar. Los valores superiores a 0,10 (10%) provocarán una desviación visible de la cámara en el juego y sugerirán una recalibración o limpieza.",
    "nextSteps": {
      "text": "Pruebe la latencia de entrada de su écran y su tiempo de reacción personal.",
      "actionLabel": "Ejecutar test de tiempo de reacción",
      "actionHref": "/tests/reaction-time-test"
    }
  },
  "battery-test": {
    "overview": "Le test de batterie surveille l'état de charge, l'autonomie estimée et l'impact énergétique de l'écran sur votre appareil portable.",
    "whatToLookFor": [
      {
        "label": "Niveau de charge en temps réel",
        "description": "Vérifiez le pourcentage de charge et le statut d'alimentation (secteur ou batterie)."
      },
      {
        "label": "Consommation liée à la luminosité",
        "description": "Observez la variation de l'autonomie estimée selon le niveau de luminosité."
      }
    ],
    "canObserve": [
      "Statut de charge via l'API Battery Status",
      "Estimation du temps de décharge"
    ],
    "cannotMeasure": [
      "Dégradation chimique de la batterie à long terme"
    ],
    "interpretation": "Réduire la luminosité de l'écran permet de prolonger considérablement l'autonomie sur batterie.",
    "nextSteps": {
      "text": "Vérifiez le mode sombre",
      "actionLabel": "Test du mode sombre",
      "actionHref": "/tests/dark-mode-test"
    }
  },
  "network-speed-test": {
    "overview": "Le test de vitesse réseau mesure le débit descendant, la latence et la stabilité de votre connexion Internet directement dans le navigateur.",
    "whatToLookFor": [
      {
        "label": "Vitesse de téléchargement (Mbps)",
        "description": "Vérifiez que le débit atteint les valeurs souscrites auprès de votre fournisseur."
      },
      {
        "label": "Temps de latence (Ping)",
        "description": "Un ping faible est essentiel pour la fluidité des jeux en ligne et des visioconférences."
      }
    ],
    "canObserve": [
      "Débit en mégabits par seconde",
      "Temps de réponse du serveur (ping en ms)"
    ],
    "cannotMeasure": [
      "Perte de paquets sur l'ensemble des nœuds de routage réseau"
    ],
    "interpretation": "Un débit stable et une latence inférieure à 30 ms assurent une navigation et un streaming sans coupure.",
    "nextSteps": {
      "text": "Consultez les informations système",
      "actionLabel": "Infos sur l'affichage",
      "actionHref": "/tests/display-info"
    }
  },
  "color-blindness-test": {
    "overview": "El Simulador de daltonismo aplica filtros de matriz de couleur SVG calibrados matemáticamente para emular 8 tipos distintos de deficiencia de visión del couleur (CVD). Permite a los desarrolladores y diseñadores evaluar la legibilidad de la interfaz de usuario, las relaciones de contraste y la accesibilidad a la información codificada por couleurs.",
    "whatToLookFor": [
      {
        "label": "Protanopía y protanomalía (rojo-débil)",
        "description": "La deficiencia de cono L hace que los rojos puros parezcan marrón oscuro o carbón; Las distinciones rojo-verde disminuyen."
      },
      {
        "label": "Deuteranopia y Deuteranomalía (Verde-Débil)",
        "description": "La deficiencia del cono M desdibuja los verdes y rojos en tonos amarillentos; la forma más frecuente de ECV."
      },
      {
        "label": "Tritanopía y tritanomalía (azul-débil)",
        "description": "La deficiencia del cono S hace que los azules parezcan verdosos y los amarillos parezcan violeta claro o gris."
      },
      {
        "label": "Acromatopsia (monocromacia total)",
        "description": "Ausencia total de fotorreceptores cónicos funcionales, percibiendo la visualización en tonos puros de gris."
      }
    ],
    "canObserve": [
      "Transformación óptica en tiempo real de texto, íconos, gráficos y muestras en 8 matrices CVD",
      "Comparación lado a lado de la visión tricromática normal frente a la deficiencia de couleur simulada",
      "Degradación del contraste entre los indicadores clave de estado de la interfaz de usuario (verde de éxito frente a rojo de error)",
      "Legibilidad del texto contra los tonos de fondo bajo cada variante de visión del couleur."
    ],
    "cannotMeasure": [
      "Diagnóstico clínico de la capacidad genética de visión del couleur del usuario humano (p. ej., test Farnsworth-Munsell 100-Hue)",
      "Variaciones exactas de la sensibilidad retiniana de conos y bastones individuales",
      "Visualización física de picos de emisión espectral sin espectroradiómetro."
    ],
    "interpretation": "Si sus indicadores críticos de la interfaz de usuario (como alertas de error, gráficos o botones de acción principal) se vuelven indistinguibles en Deuteranopia o Protanopia, complemente las señales de couleur con íconos, tipografía en negrita y contornos de formas distintas para cumplir con las pautas WCAG 2.2.",
    "nextSteps": {
      "text": "Inspeccione la cobertura de la gama de couleurs física de su monitor en sRGB y DCI-P3.",
      "actionLabel": "Comprobar gama de couleurs",
      "actionHref": "/tests/color-gamut-test"
    }
  },
  "screen-recorder": {
    "overview": "L'enregistreur d'écran permet de capturer votre écran ou une fenêtre d'application en haute résolution et à cadence élevée sans installer de logiciel.",
    "whatToLookFor": [
      {
        "label": "Qualité de capture",
        "description": "Vérifiez que la vidéo enregistrée est fluide et conserve toute la netteté du bureau."
      },
      {
        "label": "Capture audio intégrée",
        "description": "Assurez-vous que l'audio du système ou du micro est enregistré correctement."
      }
    ],
    "canObserve": [
      "Capture vidéo haute définition via l'API Screen Capture",
      "Exportation vidéo directe"
    ],
    "cannotMeasure": [
      "Encodage matériel externe sur carte d'acquisition dédiée"
    ],
    "interpretation": "Cet outil est idéal pour documenter des anomalies visuelles ou créer des tutoriels vidéo.",
    "nextSteps": {
      "text": "Consultez le certificat d'affichage",
      "actionLabel": "Certificat d'affichage",
      "actionHref": "/tools/display-certificate"
    }
  },
  "dark-mode-test": {
    "overview": "Le test du mode sombre vérifie la détection automatique du thème du système et la lisibilité des éléments graphiques sur fond sombre.",
    "whatToLookFor": [
      {
        "label": "Détection du thème système",
        "description": "Vérifiez si l'application s'adapte instantanément au mode sombre de votre système."
      },
      {
        "label": "Contraste du texte",
        "description": "Assurez-vous que les textes restent parfaitement lisibles sans fatigue oculaire."
      }
    ],
    "canObserve": [
      "Prise en charge de la requête CSS prefers-color-scheme",
      "Rendu des thèmes clair et sombre"
    ],
    "cannotMeasure": [
      "Économie énergétique exacte sur dalle LCD à rétroéclairage global"
    ],
    "interpretation": "Sur les écrans OLED, le mode sombre réduit drastiquement la consommation électrique des pixels noirs éteints.",
    "nextSteps": {
      "text": "Calculez le risque de brûlure OLED",
      "actionLabel": "Calculateur de brûlure OLED",
      "actionHref": "/tools/oled-burn-in-calculator"
    }
  },
  "input-lag-test": {
    "overview": "El visualizador de retraso de entrada proporciona un punto de referencia estadístico de reacción de 10 tests y latencia de canalización. Mide el delta entre un estímulo visual aleatorio y el registro del clic del mouse o la actuación del teclado, gráficando el promedio, la desviación estándar y un histograma de distribución de respuesta.",
    "whatToLookFor": [
      {
        "label": "Tiempo de reacción del estímulo visual",
        "description": "Mide los milisegundos transcurridos desde el cuadro exacto del cambio de couleur hasta el clic del puntero."
      },
      {
        "label": "Consistencia estadística (Std Dev)",
        "description": "Una desviación estándar baja (< 25 ms) indica una sincronización de canalización de hardware y percepción consistente."
      },
      {
        "label": "Picos atípicos y comienzos en falso",
        "description": "Detecta clics preventivos realizados antes de que aparezca el disparador visual verde."
      },
      {
        "label": "Histograma de distribución",
        "description": "Visualiza la agrupación de latencia para distinguir la reacción biológica de los retrasos en las colas del sistema."
      }
    ],
    "canObserve": [
      "Marcas de tiempo de milisegundos de alta résolution a través de performance.now() desde la representación del estímulo hasta el envío del evento",
      "Métricas estadísticas: promedio, mejor (más rápido), peor (más lento) y desviación estándar en 10 ensayos",
      "Máquina de estado visual en tiempo real que evita clics falsos",
      "Histograma de tiempo de respuesta que asigna depósitos de latencia"
    ],
    "cannotMeasure": [
      "Latencia de clic a fotón de fotodiodo óptico aislado sin sondas de hardware externas (por ejemplo, LDAT)",
      "Microintervalos de sondeo USB internos separados de la programación de interrupciones del sistema operativo",
      "Tiempo de respuesta de sobremarcha del monitor físico"
    ],
    "interpretation": "Una reacción humana combinada más una puntuación de canal de visualización de 180 ms a 240 ms es típica para configuraciones de juegos de alta actualización. Las puntuaciones superiores a 300 ms sugieren un retraso en el posprocesamiento de la visualización (modo de juego desactivado) o una mayor latencia de entrada.",
    "nextSteps": {
      "text": "Verifique la frecuencia de actualización del hardware real de su écran y el ritmo de entrega de fotogramas.",
      "actionLabel": "Démarrer test de frecuencia de actualización",
      "actionHref": "/tests/refresh-rate-test"
    }
  },
  "ambient-light-test": {
    "overview": "El inspector del sensor de luz ambiental lee los niveles de iluminancia en lux (lx) utilizando la API AmbientLightSensor. Evalúa las condiciones de iluminación de la habitación, proporciona recomendaciones ergonómicas de luminosité de la écran y representa gráficamente las fluctuaciones de la luz a lo largo del tiempo.",
    "whatToLookFor": [
      {
        "label": "Iluminancia Lux en tiempo real",
        "description": "Supervisa la intensidad de la luz ambiental en lux capturada por fotodetectores de dispositivos integrados."
      },
      {
        "label": "Consejos de luminosité ergonómico",
        "description": "Recomienda niveles óptimos del control deslizante de nit/luminosité del monitor para las condiciones actuales de su habitación."
      },
      {
        "label": "Advertencia de riesgo de deslumbramiento",
        "description": "Identifica si una iluminación ambiental intensa (> 1000 lx) requiere sombreado antideslumbrante o luminosité máximo."
      },
      {
        "label": "Estabilidad de la iluminación ambiental",
        "description": "Realiza un seguimiento de los cambios de iluminación de la habitación a lo largo del tiempo para identificar bombillas parpadeantes o cambios de luz natural."
      }
    ],
    "canObserve": [
      "Valores de iluminancia ambiental en tiempo real en lux de fotodetectores de hardware",
      "Categorización de zonas de iluminación (Totalmente oscuro, Habitación tenue, Oficina, Interiores luminosos, Luz natural)",
      "Porcentaje de luminosité de écran recomendado según las pautas de ergonomía ISO",
      "Gráfico histórico de niveles de luz durante la sesión activa."
    ],
    "cannotMeasure": [
      "Lecturas de luz ambiental en navegadores o sistemas operativos que carecen de compatibilidad con API de sensor genérico",
      "Temperatura de couleur (Kelvin) o clasificación CRI de la iluminación de la habitación sin un sensor ambiental RGB",
      "Ángulos del vector de deslumbramiento direccional que inciden en la superficie del panel"
    ],
    "interpretation": "Para una lectura cómoda sin fatiga visual, un entorno de oficina debe oscilar entre 300 lux y 500 lux con el luminosité de la écran configurado en aproximadamente 120-150 nits. Los valores inferiores a 50 lx requieren reducir el luminosité de la écran para minimizar la fatiga.",
    "nextSteps": {
      "text": "Calibre el luminosité de la écran y el umbral del nivel de noir.",
      "actionLabel": "Démarrer test de luminosité",
      "actionHref": "/tests/brightness-test"
    }
  },
  "dpi-calculator": {
    "overview": "Le calculateur de DPI et PPI détermine la densité physique de pixels de votre écran selon sa diagonale et sa résolution native.",
    "whatToLookFor": [
      {
        "label": "Densité de pixels (PPI)",
        "description": "Une densité supérieure à 110 PPI pour un moniteur garantit des polices lisses et nettes."
      },
      {
        "label": "Distance optimale de vision",
        "description": "Consultez la distance recommandée pour que les pixels deviennent indiscernables."
      }
    ],
    "canObserve": [
      "Calcul précis du pas de masque (pitch) et du PPI",
      "Recommandation d'échelle d'affichage"
    ],
    "cannotMeasure": [
      "Diagonale sans saisie manuelle de l'utilisateur"
    ],
    "interpretation": "Une densité de pixels élevée améliore considérablement le confort de lecture et la netteté des détails.",
    "nextSteps": {
      "text": "Vérifiez la clarté du texte",
      "actionLabel": "Test de clarté du texte",
      "actionHref": "/tests/text-clarity-test"
    }
  },
  "subpixel-layout-test": {
    "overview": "Las tests de diseño de sous-pixels analizan la geometría física microscópica de las tiras emisoras rojas, verdes y azules dentro de cada píxel. Las variaciones entre los diseños RGB estándar, BGR invertido, QD-OLED triangular y WOLED determinan directamente si el antialiasing de texto del sistema operativo (como Windows ClearType) aparece nítido o presenta halos de couleur magenta/verde.",
    "whatToLookFor": [
      {
        "label": "Estructura de geometría de sous-pixels",
        "description": "Identifica si su panel utiliza franjas verticales RGB estándar, franjas BGR o sous-pixels triangulares no estándar."
      },
      {
        "label": "Bordes de texto de alto contraste",
        "description": "Inspecciona el texto noir sobre blanc y blanc sobre noir en busca de halos de couleurs (verde arriba, magenta abajo)."
      },
      {
        "label": "Alineación de cuadrícula de 1px",
        "description": "Verifica si las líneas alternas de 1 píxel se representan como un gris completamente neutro sin artefactos de couleur."
      },
      {
        "label": "Calibración de antialiasing ClearType",
        "description": "Evalúa si la ejecución de Windows cttune o el suavizado de fuentes elimina la decoloración de los bordes."
      }
    ],
    "canObserve": [
      "Artefactos de franjas de couleur representados en fuentes serif, sans-serif y monoespaciadas de alto contraste",
      "Alineación de sous-pixels contra rejillas de líneas verticales y horizontales alternas de 1 píxel calibradas",
      "Simulación visual de estructuras de emisión de sous-pixels en 6 arquitecturas de paneles principales"
    ],
    "cannotMeasure": [
      "Verificación óptica con microscopio físico de la geometría del emisor de silicio submilimétrico",
      "Configuración de registro directo del rasterizador de fuentes del sistema operativo host",
      "Interpolación de sous-pixels del escalador de hardware dentro de tarjetas de captura de video externas"
    ],
    "interpretation": "Si el texto muestra bordes verdes o magenta tenues en una écran de 1440p o 4K, es probable que su écran tenga un diseño de sous-pixels BGR o QD-OLED. Ejecutar Windows ClearType Tuner o cambiar a antialiasing en escala de grises resolverá los bordes.",
    "nextSteps": {
      "text": "¿Quiere inspeccionar la netteté general de la écran y la escala de résolution?",
      "actionLabel": "Démarrer test de claridad de texto",
      "actionHref": "/tests/text-clarity-test"
    }
  },
  "pwm-flicker-test": {
    "overview": "La modulación de ancho de pulso (PWM) es una técnica de atenuación utilizada por ciertas luces de fondo LCD y paneles OLED que enciende y apaga rápidamente la fuente de luz para lograr un luminosité más bajo. Si bien es invisible a simple vista en altas frecuencias, el PWM de baja frecuencia (120 Hz a 480 Hz) provoca fatiga visual intensa, ojos secos, dolores de cabeza y migrañas.",
    "whatToLookFor": [
      {
        "label": "Perlas fantasma estroboscópicas",
        "description": "Mover los ojos o agitar un objeto frente a la écran rompe las líneas en mouvement en distintas cuentas fantasmas si hay PWM presente."
      },
      {
        "label": "Líneas de escaneo del obturador del teléfono inteligente",
        "description": "El uso de la cámara de un teléfono a 1/1000 o más rápido revela bandas horizontales de desplazamiento oscuro causadas por la modulación del ciclo de trabajo."
      },
      {
        "label": "Umbral de luminosité sin parpadeos",
        "description": "Identifica en qué porcentaje de luminosité OSD del monitor la écran cambia de atenuación de CC a PWM."
      },
      {
        "label": "Luminiscencia del ciclo de trabajo",
        "description": "Mide la relación óptica entre la duración de ENCENDIDO y la duración de APAGADO durante cada ciclo de atenuación."
      }
    ],
    "canObserve": [
      "Patrones de interferencia estroboscópica visual generados por rejillas de desplazamiento de alta velocidad",
      "Interacción óptica entre los movimientos oculares sacádicos del usuario y los ciclos de actualización del panel.",
      "Directrices para la verificación de la frecuencia PWM de la cámara de un teléfono inteligente"
    ],
    "cannotMeasure": [
      "Frecuencia de pulso físico exacta en Hertz sin una sonda de osciloscopio de fotodiodo externo",
      "Índice de distorsión armónica del circuito controlador LED.",
      "Ondulación de microvoltaje en el riel de alimentación de retroiluminación"
    ],
    "interpretation": "Las écrans certificadas como \"sin scintillement\" o \"TÜV Eye Comfort\" utilizan corriente directa (CC) continua para atenuar el luminosité hasta un 0 %. Si ve rastros de cuentas fantasma, su panel utiliza atenuación PWM en configuraciones de luminosité bajo.",
    "nextSteps": {
      "text": "¿Quiere probar las fluctuaciones de luminancia VRR de alta frecuencia?",
      "actionLabel": "Inicie la test de scintillement VRR",
      "actionHref": "/tests/vrr-flicker-test"
    }
  },
  "dead-pixel-mapper": {
    "overview": "Dead Pixel RMA Coordinate Mapper es una herramienta de inspección interactiva diseñada para documentar píxeles de paneles defectuosos. Permite a los compradores identificar las coordenadas de los píxeles defectuosos, clasificar los defectos por tipo, calcular la elegibilidad de la garantía ISO 9241-307 y exportar registros formales de inspección RMA para reclamos de reemplazo del fabricante.",
    "whatToLookFor": [
      {
        "label": "Píxeles muertos (oscuros)",
        "description": "Tríadas de sous-pixels permanentemente desconectadas que permanecen completamente negras contra écrans blancas, cian y amarillas."
      },
      {
        "label": "sous-pixels atascados (brillantes)",
        "description": "sous-pixels bloqueados en un estado abierto, brillando en rojo, verde, azul o blanc sobre fondos negros puros."
      },
      {
        "label": "Coordenadas del defecto (X, Y)",
        "description": "Dirección de píxel precisa desde el origen superior izquierdo para demostrar la ubicación del defecto a los técnicos de servicio."
      },
      {
        "label": "Umbrales de clase ISO 9241-307",
        "description": "Comparación automática con los límites de reemplazo de Clase 1 (Cero defectos) y Clase 2 (Asignación al consumidor)."
      }
    ],
    "canObserve": [
      "Coordenadas de écran exactas (X, Y) de los puntos defectuosos registrados en 9 fondos de test sólidos",
      "Cálculo de la agrupación de defectos de la zona central versus la zona periférica",
      "Cumplimiento de devolución de garantía ISO 9241-307 Clase 1 y Clase 2"
    ],
    "cannotMeasure": [
      "Detección algorítmica automática de defectos sin inspección visual manual del usuario",
      "Polvo de vidrio subterráneo versus falla real del transistor TFT sin aumento óptico",
      "Continuidad eléctrica interna del IC del controlador del panel"
    ],
    "interpretation": "La mayoría de los principales fabricantes de monitores (Dell, LG, ASUS, Samsung) cumplen con la norma ISO 9241-307 Clase 2, que permite hasta 2 píxeles muertos completos o 5 sous-pixels atascados por millón. Las écrans profesionales y de juegos premium a menudo cuentan con cobertura Zero Bright Dot (Clase 1).",
    "nextSteps": {
      "text": "¿Se han atascado sous-pixels que permanecen encendidos? Intente revivirlos con nuestro ejercitador de alta velocidad.",
      "actionLabel": "Inicie el reparador de píxeles atascados",
      "actionHref": "/tests/stuck-pixel-fixer"
    }
  },
  "gtg-response-time-test": {
    "overview": "El tiempo de respuesta de gris a gris (GtG) mide el tiempo necesario para que un píxel de cristal líquido pase de un nivel de gris intermedio arbitrario a otro. Si bien los fabricantes anuncian GtG de 1 ms o 0,5 ms, las transiciones en el mundo real varían significativamente y las configuraciones de overdrive agresivas a menudo causan un efecto fantasma inverso severo (sobreimpulso).",
    "whatToLookFor": [
      {
        "label": "Manchas negras del panel VA",
        "description": "Inspecciona las transiciones de 0 % de noir puro a 20 % de gris oscuro, donde los cristales líquidos VA son más lentos."
      },
      {
        "label": "Sobremarcha Sobreimpulso (Coronas)",
        "description": "Comprueba si hay halos invertidos de couleur blanc brillante u oscuros detrás de objetos en mouvement causados ​​por un voltaje de sobremarcha excesivo."
      },
      {
        "label": "Desenfoque inicial vs final",
        "description": "Compara el tiempo de subida (de oscuro a claro) con el tiempo de caída (de claro a oscuro) en objetivos en mouvement a alta velocidad."
      },
      {
        "label": "Equilibrio del modo Overdrive",
        "description": "Guía la selección del nivel de sobremarcha OSD óptimo (Apagado, Normal, Rápido, Extremo)."
      }
    ],
    "canObserve": [
      "Senderos visuales fantasma a través de valores de luminancia de grises iniciales y finales personalizables",
      "Simulación de sobreimpulso de corona de sobremarcha en niveles de sobremarcha de cristal líquido estándar",
      "netteté y claridad de los bordes de objetos en mouvement a través de niveles de velocidad calibrados"
    ],
    "cannotMeasure": [
      "Curvas de transición de osciloscopio de fotodiodo de submilisegundos (tiempo de subida del 10% al 90%)",
      "Valores de búsqueda de la tabla de voltaje de sobremarcha interna dentro del escalador de monitor ASIC",
      "Cambios en la viscosidad del cristal líquido que dependen de la temperatura"
    ],
    "interpretation": "Si los objetos en mouvement muestran un halo brillante o una silueta inversa, el OSD Overdrive de su monitor está configurado demasiado alto (\"Extremo\"). Volver a marcar a 'Rápido' o 'Normal' brindará una claridad de mouvement más limpia sin artefactos de corona.",
    "nextSteps": {
      "text": "¿Quieres comparar la netteté de los OVNIs en mouvement y el desenfoque persistente?",
      "actionLabel": "Lanzar test de imagen fantasma",
      "actionHref": "/tests/ghosting-test"
    }
  },
  "oled-burn-in-calculator": {
    "overview": "Le calculateur de rémanence OLED évalue le risque de marquage permanent en fonction de vos habitudes d'utilisation quotidienne et de la luminosité.",
    "whatToLookFor": [
      {
        "label": "Score de risque d'usure",
        "description": "Consultez votre niveau de risque calculé selon vos heures d'éléments statiques (barre des tâches, logos)."
      },
      {
        "label": "Conseils de prévention",
        "description": "Appliquez les réglages recommandés pour prolonger la durée de vie de votre dalle OLED."
      }
    ],
    "canObserve": [
      "Modélisation statistique de la dégradation des sous-pixels",
      "Recommandations d'entretien du panneau"
    ],
    "cannotMeasure": [
      "État chimique microscopique actuel des composés organiques du panneau"
    ],
    "interpretation": "Activer le masquage automatique de la barre des tâches et limiter la luminosité réduit fortement les risques de marquage.",
    "nextSteps": {
      "text": "Vérifiez la présence de marquage",
      "actionLabel": "Test de brûlure d'écran",
      "actionHref": "/tests/burn-in-test"
    }
  },
  "mouse-polling-test": {
    "overview": "Le test de fréquence de souris mesure le taux d'interrogation (Hz) et la régularité des rapports de position de votre souris ou périphérique de pointage.",
    "whatToLookFor": [
      {
        "label": "Fréquence maximale (Hz)",
        "description": "Déplacez rapidement la souris en cercles pour vérifier si elle atteint 500 Hz, 1000 Hz ou plus."
      },
      {
        "label": "Régularité des intervalles",
        "description": "Vérifiez l'absence de chutes brutales de fréquence pouvant provoquer des micro-saccades."
      }
    ],
    "canObserve": [
      "Taux d'échantillonnage en temps réel (Hz)",
      "Intervalle moyen entre les rapports en millisecondes"
    ],
    "cannotMeasure": [
      "Accélération matérielle interne du capteur optique"
    ],
    "interpretation": "Un taux stable de 1000 Hz offre une précision maximale et s'harmonise parfaitement avec les écrans à haut rafraîchissement.",
    "nextSteps": {
      "text": "Mesurez votre temps de réaction",
      "actionLabel": "Test du temps de réaction",
      "actionHref": "/tests/reaction-time-test"
    }
  },
  "gpu-benchmark-test": {
    "overview": "Le benchmark graphique WebGL évalue les performances de rendu 3D de votre carte graphique et la stabilité du débit d'images sous charge.",
    "whatToLookFor": [
      {
        "label": "Cadence moyenne (FPS)",
        "description": "Observez le nombre d'images par seconde pendant le rendu des scènes 3D complexes."
      },
      {
        "label": "Stabilité du frametime",
        "description": "Vérifiez que le graphe de fluidité ne présente pas de pics de ralentissement."
      }
    ],
    "canObserve": [
      "Fréquence d'images moyenne et minimale",
      "Rendu graphique via WebGL 2.0",
      "Stabilité sous charge"
    ],
    "cannotMeasure": [
      "Température physique de la puce GPU sans utilitaire système dédié"
    ],
    "interpretation": "Un débit d'images constant sans micro-saccades atteste d'une configuration matérielle équilibrée.",
    "nextSteps": {
      "text": "Vérifiez la fréquence de rafraîchissement",
      "actionLabel": "Test de rafraîchissement",
      "actionHref": "/tests/refresh-rate-test"
    }
  },
  "display-certificate": {
    "overview": "El Certificado de inspección de exhibición es una herramienta formal de documentación de calidad. Agrega parámetros de hardware detectados automáticamente (résolution nativa, profundidad de couleur, amplia gama, densidad de píxeles) con calificaciones de inspección visual manual para generar un informe de inspección certificado e imprimible para calificaciones de reventa o reclamos de garantía RMA del fabricante.",
    "whatToLookFor": [
      {
        "label": "Registro de especificaciones de hardware",
        "description": "Certifica la résolution nativa del panel, la profundidad de bits del couleur, la proporción de píxeles del dispositivo y la compatibilidad con una amplia gama de couleurs."
      },
      {
        "label": "Resumen de auditoría de defectos",
        "description": "Registra recuentos exactos de píxeles muertos, sous-pixels atascados y gravedad del sangrado de retroiluminación."
      },
      {
        "label": "Cumplimiento de la norma ISO 9241-307",
        "description": "Documenta si el panel cumple con los criterios de reemplazo del consumidor Clase 1 (cero puntos brillantes) o Clase 2."
      },
      {
        "label": "Diseño de verificación listo para imprimir",
        "description": "Formatea todos los datos en un certificado limpio y certificado con marca de agua optimizado para la exportación e impresión de PDF."
      }
    ],
    "canObserve": [
      "Recopilación de parámetros de visualización informados por el sistema y grados de calidad verificados por el usuario.",
      "Generación de ID de verificación criptográfica únicas y marcas de tiempo de inspección",
      "Diseño de documentos optimizado para impresión que oculta la navegación y los controles interactivos de la interfaz de usuario."
    ],
    "cannotMeasure": [
      "Lectura automatizada del número de serie del panel físico desde el firmware EDID interno (requiere entrada manual)",
      "Suscripción legal de reclamaciones de garantía del fabricante fuera de los centros de servicio oficiales del fabricante.",
      "Precisión del couleur del espectrorradiómetro Verificación Delta E sin couleurímetros de hardware externos"
    ],
    "interpretation": "Los certificados de inspección de écrans brindan documentación confiable al comprar o vender monitores usados ​​o al presentar reclamos de devolución RMA durante los períodos de devolución del fabricante.",
    "nextSteps": {
      "text": "¿Necesita identificar las coordenadas de píxeles defectuosos antes de generar su certificado?",
      "actionLabel": "Inicie el mapeador de píxeles muertos",
      "actionHref": "/tools/dead-pixel-mapper"
    }
  },
  "osd-calibration-guide": {
    "overview": "El Asistente de calibración del monitor OSD interactivo es una guía visual para calibrar los botones físicos del hardware de visualización en écran (OSD) de su écran. Guía a los usuarios a través de 6 pasos esenciales: luminosité, contraste, gamma 2.2, temperatura de couleur de 6500 K, netteté y sobremarcha, sin necesidad de costosos couleurímetros de hardware.",
    "whatToLookFor": [
      {
        "label": "luminosité (recorte noir)",
        "description": "Ajusta el luminosité de OSD para que el parche n.° 16 sea apenas visible mientras que el parche n.° 0 permanezca noir como la tinta."
      },
      {
        "label": "Contraste (saturación de blancos)",
        "description": "Ajusta el contraste de OSD para que el parche casi blanc #253 permanezca distinguible del blanc puro #255."
      },
      {
        "label": "Mezcla óptica gamma 2.2",
        "description": "Alinea la luminancia de los medios tonos usando un patrón óptico donde el disco central se mezcla en 2,2."
      },
      {
        "label": "Temperatura de couleur (6500K D65)",
        "description": "Equilibra los controles deslizantes de ganancia rojo, verde y azul para lograr tonos blancos y grises limpios y neutros."
      }
    ],
    "canObserve": [
      "Objetivos de retroalimentación visual diseñados específicamente para rangos de ajuste OSD de monitores estándar",
      "Tableros de mezcla óptica que verifican la alineación de sRGB Gamma 2.2 sin sondas de calibración",
      "Texto de alto contraste y objetivos de bloques móviles para ajustar la netteté y los niveles de sobremarcha"
    ],
    "cannotMeasure": [
      "Control directo del software sobre los botones OSD del monitor físico mediante el protocolo DDC/CI",
      "Temperatura de couleur exacta en Kelvin sin espectrofotómetro ni sonda de couleurímetro",
      "Calibración interna de hardware LUT (Look-Up Table) dentro de monitores profesionales de gradación de couleur"
    ],
    "interpretation": "La configuración predeterminada de fábrica del monitor casi siempre está sobresaturada, demasiado brillante (100%) y demasiado fría (8000K+). Seguir esta guía de ajuste OSD de 6 pasos acercará significativamente su écran a los estándares internacionales de masterización sRGB/Rec.709.",
    "nextSteps": {
      "text": "¿Quiere verificar la cobertura de la gama de couleurs y la precisión de ColorChecker?",
      "actionLabel": "Démarrer la test de precisión del couleur",
      "actionHref": "/tests/color-accuracy-test"
    }
  },
  "bright-pixel-test": {
    "overview": "Los píxeles brillantes o calientes son sous-pixels (rojo, verde, azul o blanc) que permanecen atrapados en un estado iluminado o parcialmente energizado, visibles contra fondos negros puros y oscuros.",
    "whatToLookFor": [
      {
        "label": "Puntos de sous-pixels calientes",
        "description": "Pinchazos de couleur brillantes aislados visibles contra marcos oscuros en una habitación oscura."
      },
      {
        "label": "Resplandor cromático de sous-pixels",
        "description": "Los canales de sous-pixels rojos, verdes o azules individuales se quedan abiertos mientras los sous-pixels vecinos están apagados."
      },
      {
        "label": "Píxeles calientes agrupados",
        "description": "Múltiples píxeles brillantes defectuosos agrupados muy juntos, que normalmente califican para devolución en garantía."
      },
      {
        "label": "Sangrado versus píxeles brillantes",
        "description": "Distinga los pinchazos nítidos de 1 píxel del sangrado difuso y nublado de la retroiluminación del borde."
      }
    ],
    "canObserve": [
      "Coordenadas exactas de píxeles en tonos negros (#000000) y fondos oscuros",
      "Aislamiento del canal de couleur en los marcos de test blancos y RGB primarios",
      "Relación de contraste entre los sous-pixels calientes y el lienzo circundante oscuro"
    ],
    "cannotMeasure": [
      "Corriente de fuga de puerta de transistor de silicio",
      "Profundidad del defecto físico del cristal de silicio debajo del sustrato de vidrio",
      "Características de deriva térmica del panel posterior"
    ],
    "interpretation": "Las écrans ISO 9241-307 Clase 1 no permiten píxeles brillantes, mientras que los paneles Clase 2 normalmente permiten hasta 2 píxeles permanentemente brillantes por millón.",
    "nextSteps": {
      "text": "¿Has localizado un sous-pixel atascado? Intente una estimulación visual rápida para despegarlo.",
      "actionLabel": "Inicie el reparador de píxeles atascados",
      "actionHref": "/tests/stuck-pixel-fixer"
    }
  },
  "burn-in-test": {
    "overview": "El desgaste de la écran (retención permanente de la imagen) se produce cuando los compuestos orgánicos OLED o los fósforos se degradan de manera desigual debido a elementos estáticos de alta luminosidad, como barras de tareas, logotipos de canales o medidores HUD.",
    "whatToLookFor": [
      {
        "label": "Siluetas fantasmas de la barra de tareas",
        "description": "Contornos tenues de las barras de tareas del sistema operativo o de las barras de navegación del navegador visibles en gris en écran completa."
      },
      {
        "label": "HUD y sombras del logotipo",
        "description": "Sombras persistentes de barras estáticas de salud de videojuegos o carteles de noticias de televisión."
      },
      {
        "label": "50% sombreado de campo gris",
        "description": "Manchas moteadas desiguales o falta de uniformidad de luminosité en lienzos de couleur gris medio."
      },
      {
        "label": "Retención temporal versus permanente",
        "description": "Vérifiez si la sombra se disipa después de ejecutar contenido de vídeo no estático durante 15 minutos."
      }
    ],
    "canObserve": [
      "Siluetas tenues en la imagen residual en un 50 % de grises y couleurs primarios sólidos",
      "Consistencia de luminiscencia de cuadrante en toda el área de visualización",
      "Detección de huellas de límites estáticos en campos de couleur uniformes"
    ],
    "cannotMeasure": [
      "Porcentaje de degradación química de sous-pixels emisores orgánicos OLED",
      "Horas totales de encendido del panel interno (POH)",
      "Contador de ciclos de compensación de fábrica y compensaciones de voltaje."
    ],
    "interpretation": "La retención de imagen temporal (TIR) ​​se desvanece en cuestión de minutos, mientras que la retención permanente permanece visible indefinidamente sobre fondos grises y coloreados uniformes.",
    "nextSteps": {
      "text": "Calcule el riesgo de desgaste a largo plazo de su panel en función de sus hábitos de uso diario.",
      "actionLabel": "Inicie la calculadora de desgaste OLED",
      "actionHref": "/tools/oled-burn-in-calculator"
    }
  },
  "color-test": {
    "overview": "Las tests de couleur de écran evalúan la reproducción del couleur primario y secundario, la pureza espectral de sous-pixels y la consistencia de la representación del lienzo digital a analógico en los campos de couleur de écran completa.",
    "whatToLookFor": [
      {
        "label": "Pureza y saturación del couleur",
        "description": "Asegúrese de que el rojo, verde, azul, cian, magenta y amarillo sólidos llenen la écran de manera uniforme y sin manchas."
      },
      {
        "label": "Uniformidad cromática del borde",
        "description": "Vérifiez que los couleurs no cambien de matiz o tono cerca de los límites del bisel exterior."
      },
      {
        "label": "Bandas en couleurs saturados",
        "description": "Inspeccione si los couleurs puros intensos provocan bandas de contorno o posterización."
      },
      {
        "label": "Aislamiento de defectos de sous-pixels",
        "description": "Observe motas individuales oscuras o descoloridas que se vuelven visibles solo en campos de couleurs específicos."
      }
    ],
    "canObserve": [
      "Visualización en écran completa de campos de couleur hexadecimal sRGB y P3 calibrados",
      "Temperatura de couleur visual de borde a borde y consistencia del tinte",
      "Respuesta de cambio de canal de couleur sin imágenes residuales persistentes"
    ],
    "cannotMeasure": [
      "Coordenadas de couleur espectrofotométricas absolutas (CIE 1931 xy)",
      "Nits de pico óptico por canal de couleur individual",
      "Picos espectrales de fósforo de retroiluminación física"
    ],
    "interpretation": "Las écrans IPS y OLED de calidad ofrecen una saturación de couleur uniforme de borde a borde sin cambios de temperatura de couleur ni tintes.",
    "nextSteps": {
      "text": "¿Quiere inspeccionar la precisión del couleur y las desviaciones delta?",
      "actionLabel": "Démarrer la test de precisión del couleur",
      "actionHref": "/tests/color-accuracy-test"
    }
  },
  "grayscale-test": {
    "overview": "La test de escala de grises evalúa la capacidad de un monitor para representar pasos de luminancia neutros y suaves desde el noir absoluto (0%) hasta el blanc máximo (100%) sin matices cromáticos ni recortes de pasos.",
    "whatToLookFor": [
      {
        "label": "Equilibrio de tonos de grises neutros",
        "description": "Los escalones grises deben parecer completamente neutros sin tintes rosados, verdes o azules."
      },
      {
        "label": "Separación de pasos distintos",
        "description": "Cada bloque en la rampa de 16 o 32 escalones debe distinguirse individualmente de su vecino."
      },
      {
        "label": "Paso oscuro aplastado",
        "description": "Verifique que los pasos 1, 2 y 3 no colapsen en noir puro."
      },
      {
        "label": "Resaltar recorte de pasos",
        "description": "Verifique que los pasos más brillantes por debajo del 100% sean claramente visibles contra el blanc puro."
      }
    ],
    "canObserve": [
      "Discriminación de luminancia gradual a través de rampas estandarizadas de 16/32/64 bloques",
      "Neutralidad óptica y equilibrio de couleur entre parches vecinos en escala de grises.",
      "Representación del lienzo del navegador de pasos lineales y en escala de grises sRGB"
    ],
    "cannotMeasure": [
      "Función de transferencia física exponente de curva gamma sin couleurímetro",
      "Luminancia del suelo noir en candelas por metro cuadrado (cd/m²)",
      "Profundidad de bits de la tabla de búsqueda interna de hardware (LUT 1D/3D)"
    ],
    "interpretation": "Incluso los pasos con equilibrio de couleur neutro indican una calibración de fábrica adecuada. Los bloques grises teñidos indican una desviación del punto blanc o configuraciones de ganancia RGB desequilibradas.",
    "nextSteps": {
      "text": "Evalúe la curva matemática de transferencia de luminancia de su écran.",
      "actionLabel": "Démarrer test gamma",
      "actionHref": "/tests/gamma-test"
    }
  },
  "saturation-test": {
    "overview": "Las tests de saturación verifican qué tan limpiamente una écran pasa de un gris neutro completamente desaturado (0%) a un couleur puro completamente saturado (100%) en los canales primarios y secundarios.",
    "whatToLookFor": [
      {
        "label": "Pasos de saturación lineal",
        "description": "Cada incremento del 10% del 0% al 100% debería mostrar un salto igual y distinto en la intensidad del couleur."
      },
      {
        "label": "Recorte de couleur prematuro",
        "description": "Asegúrese de que los couleurs no alcancen la saturación máxima prematuramente al 80% o 90%."
      },
      {
        "label": "Cambios de tono durante la desaturación",
        "description": "Esté atento a los cambios de couleur (por ejemplo, el rojo se vuelve naranja a medida que disminuye la saturación)."
      },
      {
        "label": "Sobresaturación de amplia gama",
        "description": "Verifique si los couleurs parecen naturalmente equilibrados o anormalmente neón."
      }
    ],
    "canObserve": [
      "Rampas de saturación de 10 pasos en rojo, verde, azul, cian, magenta y amarillo",
      "Claridad visual de los límites de los pasos y suavidad de progresión",
      "Consistencia de sujeción del espacio de couleur del navegador"
    ],
    "cannotMeasure": [
      "Porcentaje de pureza espectrofotométrica",
      "Distribución de potencia espectral de las emisiones de couleur.",
      "Volumen físico de la gama óptica en unidades CIELAB"
    ],
    "interpretation": "Las écrans con una buena gestión del couleur muestran incrementos de saturación claros y distintos sin aplanarse en bloques de couleur sólido antes del 100%.",
    "nextSteps": {
      "text": "Inspeccione si su écran admite espacios de couleur amplios más allá de sRGB.",
      "actionLabel": "Démarrer test de gama de couleurs",
      "actionHref": "/tests/color-gamut-test"
    }
  },
  "color-banding-test": {
    "overview": "Las bandas de couleur se producen cuando los gradientes sutiles se dividen en bandas escalonadas visibles o contornos de posterización debido a una profundidad de bits insuficiente, una cuantificación de la GPU o un procesamiento deficiente de la imagen del monitor.",
    "whatToLookFor": [
      {
        "label": "Contornos de bandas escalonadas",
        "description": "Líneas duras visibles a través de gradientes suaves en lugar de una transición perfecta."
      },
      {
        "label": "Posterización de degradado oscuro",
        "description": "Artefactos de pasos en bloques en regiones de sombras oscuras del degradado."
      },
      {
        "label": "Grano de ruido de tramado",
        "description": "Grano de ruido espacial fino visible cuando el tramado temporal o espacial (FRC) está activo."
      },
      {
        "label": "Teñido de couleur en degradados",
        "description": "Rayas cromáticas que aparecen dentro de degradados monocromáticos o grises supuestamente neutros."
      }
    ],
    "canObserve": [
      "Suavidad de gradiente visual en gradientes RGB de 8 y 10 bits",
      "Presencia de ruido de tramado espacial y artefactos de cuantificación de pasos.",
      "Consistencia de renderizado de degradado lineal y radial"
    ],
    "cannotMeasure": [
      "Profundidad de bits del panel de hardware nativo (8 bits reales frente a 6 bits + FRC)",
      "Formato de couleur de salida de GPU (submuestreo RGB 4:4:4 vs 4:2:2/4:2:0)",
      "Algoritmos de matriz de difuminado del escalador interno"
    ],
    "interpretation": "Los degradados suaves sin líneas marcadas indican una transmisión de couleur adecuada de 8 o 10 bits. Las bandas visibles sugieren limitaciones de FRC de 6 bits o configuraciones de rango dinámico limitado.",
    "nextSteps": {
      "text": "Pruebe rampas de gradiente multicanal en espectros RGB personalizados.",
      "actionLabel": "Démarrer la test de bandas de gradiente",
      "actionHref": "/tests/gradient-banding-test"
    }
  },
  "color-gamut-test": {
    "overview": "Las tests de gama de couleurs evalúan si su écran, controlador de GPU y navegador admiten espacios de couleur amplios, como DCI-P3 y Rec. 2020 más allá del estándar sRGB.",
    "whatToLookFor": [
      {
        "label": "Objetivo de extensión de gama P3",
        "description": "Un símbolo o número oculto visible solo en écrans capaces de mostrar couleurs Display P3."
      },
      {
        "label": "Límite de sujeción sRGB",
        "description": "Observe si los couleurs fuera de sRGB se recortan o se reproducen con precisión."
      },
      {
        "label": "Saturación de rojo intenso y verde",
        "description": "Vérifiez si los rojos y verdes se ven significativamente más ricos que en los monitores de oficina estándar."
      },
      {
        "label": "Estado de gestión del couleur del navegador",
        "description": "Verifique que su navegador web esté utilizando activamente los perfiles de administración de couleur del sistema operativo."
      }
    ],
    "canObserve": [
      "Detección de consultas de medios de gama de couleurs CSS del navegador (@media (couleur-gamut: p3))",
      "Diferenciación visual entre parches de couleur sRGB y Display P3",
      "Representación del perfil de couleur de amplia gama de lienzos"
    ],
    "cannotMeasure": [
      "Cobertura porcentual de DCI-P3 o AdobeRGB sin espectrofotómetro",
      "Volumen óptico en unidades CIELAB",
      "Longitudes de onda de emisión de fósforo físico."
    ],
    "interpretation": "Si el logotipo del indicador P3 se distingue claramente del fondo sRGB, el hardware de su écran, el sistema operativo y el navegador admiten activamente amplias gamas de couleurs.",
    "nextSteps": {
      "text": "Verifique el luminosité máximo de alto rango dinámico y el manejo de metadatos.",
      "actionLabel": "Inicie la test de capacidad HDR",
      "actionHref": "/tests/hdr-capability-test"
    }
  },
  "color-accuracy-test": {
    "overview": "La inspección de la precisión del couleur utiliza parches de couleur de referencia estandarizados para detectar visualmente cambios de tono, errores de percepción del couleur y distorsión del tono de la piel en la écran.",
    "whatToLookFor": [
      {
        "label": "Uniformidad del parche de referencia",
        "description": "Inspeccione los parches estándar estilo ColorChecker para verificar su equilibrio y neutralidad."
      },
      {
        "label": "Naturalidad del tono de piel",
        "description": "Verifique que los tonos de piel del retrato no parezcan quemados artificialmente por el sol (demasiado rojos) o ictéricos (demasiado amarillos)."
      },
      {
        "label": "Alineación del eje gris neutro",
        "description": "Vérifiez que la fila gris neutra muestre cero tintes cromáticos."
      },
      {
        "label": "Equilibrio de couleur secundario",
        "description": "Asegúrese de que el cian, el magenta y el amarillo mantengan los tonos puros sin desviarse hacia los primarios."
      }
    ],
    "canObserve": [
      "Representación de paleta de couleurs de referencia estándar de 24 parches",
      "Alineación visual con valores de referencia digitales estandarizados",
      "Coherencia de parches en paralelo en todas las regiones de la écran"
    ],
    "cannotMeasure": [
      "Valores de desviación numéricos Delta E (ΔE 2000) sin sensor externo",
      "Coordenadas absolutas CIE L*a*b*",
      "Impacto de la llamarada de luz ambiental en la percepción"
    ],
    "interpretation": "Las écrans bien calibradas mantienen el tono y la saturación precisos en todas las zonas de test sin enrojecimiento excesivo en los tonos de piel o grises verdosos.",
    "nextSteps": {
      "text": "Aprenda a calibrar su monitor usando controles de visualización en écran de hardware.",
      "actionLabel": "Inicie la guía de calibración OSD",
      "actionHref": "/tools/osd-calibration-guide"
    }
  },
  "brightness-test": {
    "overview": "Las tests de luminosité inspeccionan los detalles de las sombras casi negras (niveles del 1 % al 10 %) para garantizar que los elementos oscuros de los juegos, películas y fotografías no queden aplastados en un tono noir impenetrable.",
    "whatToLookFor": [
      {
        "label": "Visibilidad del cuadrado casi noir",
        "description": "Las manchas cuadradas con valores de luminancia del 1% al 5% apenas deberían distinguirse del fondo noir."
      },
      {
        "label": "Separación de pasos oscuros",
        "description": "Cada cuadrado sucesivo debe ser visiblemente más brillante que el anterior."
      },
      {
        "label": "Piso nivel noir",
        "description": "El fondo debe permanecer noir intenso y no decolorarse hasta convertirse en gris carbón."
      },
      {
        "label": "Impacto de la iluminación de la habitación",
        "description": "Apague las luces de la habitación para verificar que los sutiles cuadrados oscuros sigan siendo discernibles."
      }
    ],
    "canObserve": [
      "Distinción visual de cuadrados casi negros frente a noir puro",
      "Umbral de visibilidad de paso a través de incrementos sutiles de luminancia",
      "Contraste entre el suelo noir y los niveles de gris más bajos"
    ],
    "cannotMeasure": [
      "Pico absoluto o luminancia mínima en candelas por metro cuadrado (nits)",
      "Curvas de regulación de voltaje de retroiluminación.",
      "Porcentaje de deslumbramiento reflejado en el ambiente"
    ],
    "interpretation": "Una visualización óptima revela el paso 2% o 3% sin que el fondo noir de referencia del 0% se desvanezca y se convierta en un gris brumoso.",
    "nextSteps": {
      "text": "Ahora verifique que las luces brillantes no se recorten en un blanc puro.",
      "actionLabel": "Démarrer test de contraste",
      "actionHref": "/tests/contrast-test"
    }
  },
  "contrast-test": {
    "overview": "Las tests de contraste verifican la relación dinámica entre los blancos más brillantes y los negros más oscuros, asegurando que tanto las texturas de las luces como los detalles de las sombras permanezcan visibles simultáneamente.",
    "whatToLookFor": [
      {
        "label": "Diferenciación de paso blanc",
        "description": "Verifique que los cuadrados del 90% al 99% de luminancia se distingan del fondo blanc puro."
      },
      {
        "label": "Separación de pasos negros",
        "description": "Verifique que los cuadrados oscuros del 1% al 10% permanezcan visibles contra el noir."
      },
      {
        "label": "Resaltar la floración",
        "description": "Asegúrese de que los bloques blancos brillantes no transmitan luminosité óptico a las áreas oscuras adyacentes."
      },
      {
        "label": "Medios tonos descoloridos",
        "description": "Vérifiez que el contraste no se aumente artificialmente, lo que aplasta los degradados de couleur."
      }
    ],
    "canObserve": [
      "Visibilidad simultánea de parches de test casi blancos y casi negros",
      "Separación de límites a través de rampas de contraste de varios pasos",
      "Equilibrio de rango dinámico visual en toda la écran"
    ],
    "cannotMeasure": [
      "Relación de contraste ANSI estática (por ejemplo, 1000:1 frente a 3000:1) sin sonda óptica",
      "Velocidad de modulación de contraste dinámico",
      "Relación de reflectancia del panel"
    ],
    "interpretation": "El contraste configurado correctamente permite que los cuadrados casi blancos (hasta un 98 %) sean visibles sin recortarlos en blanc puro, mientras se mantienen distintos los cuadrados casi negros.",
    "nextSteps": {
      "text": "Examine los detalles de las sombras profundas en entornos de visualización de cuartos oscuros.",
      "actionLabel": "Démarrer test de nivel de noir",
      "actionHref": "/tests/black-level-test"
    }
  },
  "black-level-test": {
    "overview": "La test de nivel de noir mide la reproducción de los detalles de las sombras y la profundidad del suelo noir, asegurando que las señales de luminancia más baja se representen con precisión sin aplastamiento del noir ni neblina gris.",
    "whatToLookFor": [
      {
        "label": "Paso gris visible más bajo",
        "description": "Localice el cuadro de porcentaje más bajo (1%, 2% o 3%) que pueda distinguir del noir verdadero."
      },
      {
        "label": "Estabilidad del fondo noir puro",
        "description": "Confirme que el fondo exterior se renderice al 0% (RGB 0,0,0)."
      },
      {
        "label": "Resplandor versus profundidad negra",
        "description": "Tenga en cuenta si el fondo es realmente oscuro o elevado por el luminosité/sangrado de retroiluminación de IPS."
      },
      {
        "label": "Falta de uniformidad en las esquinas",
        "description": "Vérifiez si el nivel de noir aumenta cerca de las esquinas de la écran en comparación con el centro."
      }
    ],
    "canObserve": [
      "Umbral exacto del paso más bajo visible casi noir (1% a 8%)",
      "Profundidad visual del noir en una sala de visualización oscura",
      "Interferencia del luminosité de las esquinas que afecta la percepción de las sombras."
    ],
    "cannotMeasure": [
      "Luminancia negra mínima absoluta en cd/m² (nits)",
      "Relación de polarización de bloqueo de luz de cristal líquido",
      "Integridad del sello de la luz del panel"
    ],
    "interpretation": "En los paneles OLED, el noir verdadero emite 0 nits. En los paneles LCD, un luminosité tenue es normal, pero los pasos del 1% al 2% deben permanecer distintos del fondo.",
    "nextSteps": {
      "text": "Pruebe la respuesta en escala de grises de baja luminosidad cerca del 0 % al 5 %.",
      "actionLabel": "Lanzar test casi negra",
      "actionHref": "/tests/near-black-test"
    }
  },
  "white-level-test": {
    "overview": "La test de nivel de blanc inspecciona los aspectos más destacados de la écran para garantizar que los detalles blancos brillantes (niveles 240 a 254 en 8 bits) no queden atrapados en un lavado blanc sin rasgos distintivos.",
    "whatToLookFor": [
      {
        "label": "Límites del cuadrado casi blanc",
        "description": "Vérifiez si los cuadrados 250, 252 y 254 son visiblemente distintos del fondo blanc puro (255)."
      },
      {
        "label": "Decoloración en reflejos brillantes",
        "description": "Asegúrese de que los cuadrados blancos pico no adquieran un tono amarillento o cian."
      },
      {
        "label": "Fatiga ocular/deslumbramiento",
        "description": "Vérifiez si el blanc máximo causa molestias oculares con la iluminación actual de su habitación."
      },
      {
        "label": "Resaltar la floración",
        "description": "Observe si los bloques blancos de alto luminosité desvían la luz hacia los límites vecinos."
      }
    ],
    "canObserve": [
      "Límites distinguibles de cuadrados de alta luminosidad contra el blanc puro (255)",
      "Neutralidad del couleur del blanc máximo en los cuadrantes de la écran",
      "Umbral de recorte de resaltado de borde"
    ],
    "cannotMeasure": [
      "Luminancia máxima sostenida en liendres sin fotómetro",
      "Temperatura de couleur óptica del blanc máximo (p. ej., 6500 K) sin couleurímetro",
      "Curvas de aceleración del limitador automático de luminosité (ABL)"
    ],
    "interpretation": "Si los cuadrados casi blancos de hasta 253 o 254 se distinguen del fondo blanc, su monitor evita el recorte de luces y conserva las nubes y los detalles especulares.",
    "nextSteps": {
      "text": "Inspeccione la uniformidad general de la luminancia en toda la superficie de la écran.",
      "actionLabel": "Lanzar test de uniformidad",
      "actionHref": "/tests/uniformity-test"
    }
  },
  "gamma-test": {
    "overview": "Las tests gamma utilizan campos ópticos de tramado de medios tonos para calibrar visualmente las curvas de luminancia de la écran al estándar 2.2 sin necesidad de un costoso couleurímetro de hardware.",
    "whatToLookFor": [
      {
        "label": "Mezcla de patrones sólidos y difuminados",
        "description": "Observe dónde los círculos sólidos internos se mezclan completamente con el fondo de rayas alternas."
      },
      {
        "label": "Ajuste de la distancia de visualización",
        "description": "Retroceda o entrecierre ligeramente los ojos para que las líneas finas de 1 píxel se difuminen y formen un tono sólido."
      },
      {
        "label": "Punto de fusión de curva gamma",
        "description": "Identifique qué valor numérico (1,8, 2,0, 2,2, 2,4, 2,6) coincide con el fondo."
      },
      {
        "label": "Deriva de couleur en gris",
        "description": "Observe si el punto de fusión difiere entre los canales rojo, verde y azul."
      }
    ],
    "canObserve": [
      "Punto de coincidencia perceptual entre campos de interpolación de luminancia del 50 % y muestras de gris sólido",
      "Aproximación visual del exponente efectivo de la curva gamma.",
      "Equilibrio de couleur y neutralidad cromática de los medios tonos."
    ],
    "cannotMeasure": [
      "Curva gamma paramétrica multipunto exacta de 10 puntos/20 puntos",
      "Datos de perfil LUT de hardware dentro del monitor escalar",
      "Función de transferencia de conversión de digital a óptico en milicandelas"
    ],
    "interpretation": "Para informática general y masterización sRGB, el patrón debe mezclarse perfectamente con el fondo en la marca del indicador 2.2 cuando se ve desde una distancia normal.",
    "nextSteps": {
      "text": "Calibre la configuración de su monitor usando los botones de hardware en écran.",
      "actionLabel": "Inicie la guía de calibración OSD",
      "actionHref": "/tools/osd-calibration-guide"
    }
  },
  "solid-color-test": {
    "overview": "Las tests de campo de couleur sólido presentan fondos primarios, secundarios, negros, blancos y grises de écran completa para inspeccionar la uniformidad del panel, la pureza del couleur y los defectos de sous-pixels.",
    "whatToLookFor": [
      {
        "label": "Cambios de couleur de borde",
        "description": "Vérifiez si la temperatura del couleur cambia cerca de los bordes perimetrales de la écran."
      },
      {
        "label": "Efecto de écran sucia (DSE)",
        "description": "En campos grises y blancos, inspeccione si hay manchas, nubes o bandas."
      },
      {
        "label": "Aislamiento de defectos de sous-pixels",
        "description": "Detecte sous-pixels muertos o atascados que solo se revelan en campos de couleurs primarios específicos."
      },
      {
        "label": "Viñeteado/sombreado de esquinas",
        "description": "Observe si las esquinas extremas aparecen ligeramente oscurecidas en comparación con el centro."
      }
    ],
    "canObserve": [
      "Consistencia de couleur visual en écran completa en 8 campos de couleur estandarizados",
      "Cambios de luminosité de borde a centro y viñeteado",
      "Detección visual de partículas de polvo y sous-pixels defectuosos"
    ],
    "cannotMeasure": [
      "Porcentaje de uniformidad ANSI fotométrico de 9 puntos o 25 puntos",
      "Variación del espesor del panel en micrómetros.",
      "Eficiencia de transmisión óptica del difusor de retroiluminación."
    ],
    "interpretation": "Los couleurs sólidos uniformes indican una alta calidad del panel y una distribución uniforme de la luz de fondo. Las manchas irregulares o las viñetas en las esquinas son comunes en las écrans LCD económicas.",
    "nextSteps": {
      "text": "Inspeccione la uniformidad de la luminancia y la temperatura de couleur del panel de 9 zonas.",
      "actionLabel": "Lanzar test de uniformidad",
      "actionHref": "/tests/uniformity-test"
    }
  },
  "viewing-angle-test": {
    "overview": "La test de ángulo de visión evalúa cómo se degradan la saturación del couleur, el luminosité y el contraste cuando la écran se ve desde ángulos descentrados, oblicuos y verticales.",
    "whatToLookFor": [
      {
        "label": "Decoloración del couleur en ángulos",
        "description": "Mueva la cabeza de lado a lado y observe si los couleurs vibrantes se desvanecen en tonos pastel."
      },
      {
        "label": "Cambio de gamma/pérdida de contraste",
        "description": "Observe si los detalles de las sombras oscuras se desvanecen y los niveles de noir se elevan a un gris lechoso."
      },
      {
        "label": "IPS Glow frente a VA Gamma Shift",
        "description": "Los paneles IPS muestran un luminosité plateado/blanc en ángulos amplios; Los paneles VA pierden contraste central."
      },
      {
        "label": "Inversión Vertical (Paneles TN)",
        "description": "Mire desde abajo para comprobar si los couleurs se invierten en imágenes negativas en paneles TN económicos."
      }
    ],
    "canObserve": [
      "El couleur percibido y el contraste cambian a medida que el ángulo de visión aumenta en relación con lo normal",
      "Radial gradient uniformity when viewed off-axis",
      "Estabilidad angular del texto y líneas de alto contraste."
    ],
    "cannotMeasure": [
      "Exact VESA-defined 178°/178° viewing angle contrast threshold (10:1 CR)",
      "Optical polarizing filter extinction ratio",
      "Refractive index of panel glass substrate"
    ],
    "interpretation": "IPS and OLED panels maintain high couleur fidelity across wide angles. VA panels suffer contrast loss and gamma shift, while TN panels invert colors vertically.",
    "nextSteps": {
      "text": "Check if off-angle viewing exposes corner backlight bleed.",
      "actionLabel": "Launch Backlight Bleed Test",
      "actionHref": "/tests/backlight-bleed-test"
    }
  },
  "blooming-test": {
    "overview": "Las tests de floración inspeccionan artefactos de halo en écrans Mini-LED y con atenuación local de matriz completa (FALD) donde la luz se filtra desde las zonas de retroiluminación activa hacia los píxeles oscuros circundantes.",
    "whatToLookFor": [
      {
        "label": "Halos brillantes alrededor de los objetivos",
        "description": "Inspeccione pequeñas cajas blancas sobre noir en busca de un aura brillante difusa alrededor de sus perímetros."
      },
      {
        "label": "Subtítulo que florece en barras negras",
        "description": "Vérifiez si el texto blanc provoca destellos de luz que distraen la atención en las áreas del buzón noir."
      },
      {
        "label": "Llamarada del campo estelar",
        "description": "Observe pequeñas estrellas blancas de 1 px para ver si las zonas de retroiluminación adyacentes se iluminan innecesariamente."
      },
      {
        "label": "Pulsación de transición de zona",
        "description": "Mueva objetos de alto contraste por la écran para comprobar si hay un retraso en el luminosité de la zona de retroiluminación."
      }
    ],
    "canObserve": [
      "Extensión del halo visual y contraste de luminancia en diámetros objetivo calibrados (1 px, 5 px, 20 px, 100 px)",
      "Seguimiento dinámico de elementos móviles de alto contraste en los cuadrantes de la écran",
      "netteté de límites de sous-pixels frente a lienzos en noir verdadero (RGB 0,0,0)"
    ],
    "cannotMeasure": [
      "Recuento total de zonas físicas de atenuación Mini-LED dentro del chasis",
      "Zone microcontroller algorithm response time in milliseconds",
      "Absolute optical halo luminance without a spot photometer"
    ],
    "interpretation": "Blooming is a physical characteristic of Mini-LED zone count resolution. Reducing local dimming intensity or adding ambient bias lighting minimizes the effect.",
    "nextSteps": {
      "text": "Compare el sangrado de la retroiluminación del borde con el rendimiento de la atenuación local.",
      "actionLabel": "Launch Backlight Bleed Test",
      "actionHref": "/tests/backlight-bleed-test"
    }
  },
  "tv-overscan-test": {
    "overview": "La test de sobreexploración de TV verifica si su televisor o écran externa genera imágenes con un mapeo de píxeles exacto de 1:1 o acerca y corta artificialmente los bordes del perímetro.",
    "whatToLookFor": [
      {
        "label": "0 % de visibilidad del borde del borde",
        "description": "Las líneas de límite blancas marcadas con 0% deben tocar perfectamente el marco físico de la écran en los cuatro lados."
      },
      {
        "label": "Flechas indicadoras recortadas",
        "description": "Vérifiez si las puntas de flecha en los bordes exteriores están truncadas u ocultas detrás del bisel."
      },
      {
        "label": "Escalar el desenfoque",
        "description": "Inspeccione si el texto y los bordes de un solo píxel aparecen suaves y borrosos debido a la interpolación de escala."
      },
      {
        "label": "netteté de línea de 1px",
        "description": "Las líneas de borde alternadas de 1 px deberían mostrarse nítidamente sin interferencias de muaré."
      }
    ],
    "canObserve": [
      "Porcentaje de recorte de bordes (0%, 2,5%, 5%) en los cuatro bordes de visualización",
      "Visibilidad de la flecha de límite y alineación exacta del píxel al bisel",
      "Pixel-to-pixel sharpness against canvas edges"
    ],
    "cannotMeasure": [
      "Internal TV scaler DSP chip registers",
      "Video HDMI EDID overscan flags",
      "Chassis bezel optical overlap dimensions"
    ],
    "interpretation": "If the 0% boundary lines are fully visible and 1px borders are razor-sharp, your display has 1:1 pixel mapping enabled ('Just Scan', 'Fit to Screen', or 'Dot by Dot').",
    "nextSteps": {
      "text": "Verify aspect ratio scaling across circular geometric shapes.",
      "actionLabel": "Launch Scaling & Aspect Ratio Test",
      "actionHref": "/tests/scaling-aspect-test"
    }
  },
  "scaling-aspect-test": {
    "overview": "Las tests de escala y relación de aspecto validan la simetría geométrica en las relaciones de visualización estándar (16:9, 16:10, 21:9, 32:9, 4:3), asegurando que los círculos permanezcan perfectamente redondos y sin deformaciones.",
    "whatToLookFor": [
      {
        "label": "Simetría de círculos concéntricos",
        "description": "Vérifiez que los círculos sean perfectamente redondos, sin distorsiones, estiramientos ni aplastamientos ovalados."
      },
      {
        "label": "Uniformidad de aspecto cuadrado",
        "description": "Verifique que las cuadrículas cuadradas tengan un ancho y alto de píxeles idénticos."
      },
      {
        "label": "Ortogonalidad de cuadrícula lineal",
        "description": "Asegúrese de que las líneas horizontales y verticales se encuentren en ángulos rectos exactos de 90 grados."
      },
      {
        "label": "Interpolación muaré",
        "description": "Inspeccione los anillos concéntricos en busca de alias irregulares o luminosité muaré."
      }
    ],
    "canObserve": [
      "Simetría circular visual frente a cuadrículas de píxeles en relaciones de aspecto estándar",
      "Distorsión de la relación de aspecto causada por GPU incorrecta o modos de escala de écran",
      "Canvas resolution scaling behavior"
    ],
    "cannotMeasure": [
      "Physical panel aspect ratio in millimeters",
      "GPU hardware scaling interpolation filter kernels",
      "Anamorphic lens optical distortion"
    ],
    "interpretation": "Elongated or squashed circles indicate an aspect ratio mismatch in the OS display settings, GPU control panel, or monitor OSD aspect mode.",
    "nextSteps": {
      "text": "Check your display's physical and logical resolution settings.",
      "actionLabel": "Launch Resolution Checker",
      "actionHref": "/tests/resolution-checker"
    }
  },
  "screen-tearing-test": {
    "overview": "El desgarro de la écran ocurre cuando la velocidad de fotogramas de la tarjeta gráfica no está sincronizada con los ciclos de actualización fijos del monitor, lo que hace que los fotogramas consecutivos se representen en cortes horizontales divididos.",
    "whatToLookFor": [
      {
        "label": "Líneas de división horizontales",
        "description": "Busque líneas de fractura horizontales que corten barras verticales en mouvement."
      },
      {
        "label": "mouvement discontinuo",
        "description": "Observe cuando la parte superior de un elemento móvil se desplaza por delante de la parte inferior."
      },
      {
        "label": "Artefactos de múltiples lágrimas",
        "description": "A velocidades de fotogramas altas, busque múltiples desgarros simultáneos en la altura de la écran."
      },
      {
        "label": "V-Sync tartamudea frente a desgarro",
        "description": "Vérifiez si al habilitar V-Sync se producen desgarros por micro tartamudeos periódicos."
      }
    ],
    "canObserve": [
      "Visual horizontal tearing artifacts on high-velocity moving bars",
      "Frame synchronization stability across user refresh rates",
      "Impact of browser vsync lock on animation smoothness"
    ],
    "cannotMeasure": [
      "GPU hardware scanout line timing",
      "DisplayPort/HDMI vertical blanking interval micro-timings",
      "Direct G-Sync/FreeSync hardware module handshake registers"
    ],
    "interpretation": "Horizontal tear lines confirm disabled or mismatched V-Sync. Variable Refresh Rate (VRR / FreeSync / G-Sync) eliminates tearing without input lag.",
    "nextSteps": {
      "text": "Test variable refresh rate smoothness and tear-free motion.",
      "actionLabel": "Launch VRR Test",
      "actionHref": "/tests/vrr-test"
    }
  },
  "screen-flicker-test": {
    "overview": "Las tests de scintillement de la écran exponen rápidas fluctuaciones periódicas de luminancia causadas por retroiluminación PWM de baja frecuencia, ondulación de voltaje o inestabilidad de sincronización del controlador del panel.",
    "whatToLookFor": [
      {
        "label": "Visual estroboscópico o brillante",
        "description": "Detecta zumbidos o destellos sutiles de alta frecuencia en patrones de rayas finas."
      },
      {
        "label": "Líneas fantasma estroboscópicas",
        "description": "Mueva sus ojos rápidamente por la écran; Las líneas aparecerán con cuentas si hay scintillement."
      },
      {
        "label": "Sensibilidad de la visión periférica",
        "description": "Mire ligeramente lejos del monitor para ver si el scintillement es más pronunciado en la visión periférica."
      },
      {
        "label": "Umbral de luminosité",
        "description": "Ajuste el luminosité del monitor hacia abajo para ver si el scintillement comienza solo por debajo de cierto nivel."
      }
    ],
    "canObserve": [
      "Percepción visual de patrones de scintillement a través de rejillas finas y campos alternos.",
      "Interacción estroboscópica con movimientos oculares sacádicos humanos.",
      "El patrón brilla en máscaras de luminancia de alta frecuencia"
    ],
    "cannotMeasure": [
      "Frecuencia de pulso eléctrico precisa en Hertz sin fotodiodo de osciloscopio",
      "Porcentaje del ciclo de trabajo del controlador de retroiluminación",
      "Índice de scintillement armónico"
    ],
    "interpretation": "Visible flicker on solid or patterned backgrounds indicates low-frequency PWM dimming or refresh instability, a primary cause of eye fatigue and headaches.",
    "nextSteps": {
      "text": "Perform a dedicated test for pulse-width modulation dimming.",
      "actionLabel": "Démarrer la test de scintillement PWM",
      "actionHref": "/tests/pwm-flicker-test"
    }
  },
  "resolution-checker": {
    "overview": "El Comprobador de résolution proporciona diagnósticos en tiempo real de la résolution de la écran física, las dimensiones de la ventana gráfica CSS, la relación de píxeles del dispositivo (DPR) y la densidad de píxeles.",
    "whatToLookFor": [
      {
        "label": "Coincidencia de résolution nativa",
        "description": "Verifique que los píxeles físicos de la écran informados coincidan con las especificaciones del fabricante de su monitor."
      },
      {
        "label": "Factor de escala DPR de alto DPI",
        "description": "Vérifiez si la proporción de píxeles de su dispositivo está configurada en 1,0x (100%), 1,25x (125%), 1,5x (150%) o 2,0x (200%)."
      },
      {
        "label": "Dimensiones de la ventana gráfica lógica",
        "description": "Observe el espacio de píxeles CSS disponible presentado en páginas web y aplicaciones."
      },
      {
        "label": "Clasificación de relación de aspecto",
        "description": "Confirm that the calculated aspect ratio matches standard 16:9, 16:10, or ultra-wide dimensions."
      }
    ],
    "canObserve": [
      "Dimensiones de la ventana gráfica del navegador (`window.innerWidth`, `window.innerHeight`)",
      "Dimensiones de la écran del sistema operativo (`screen.width`, `screen.height`)",
      "Device Pixel Ratio (`window.devicePixelRatio`) reported by the browser environment",
      "Orientación de la écran y espacio de trabajo de escritorio disponible"
    ],
    "cannotMeasure": [
      "Physical monitor diagonal measurement in inches without user input",
      "Physical dot pitch in millimeters",
      "Multi-monitor topology outside browser scope"
    ],
    "interpretation": "Operating at the panel's native resolution ensures razor-sharp text and graphics. Fractional scaling (e.g. 125%) may cause subtle softness in legacy desktop applications.",
    "nextSteps": {
      "text": "Inspect detailed WebGL graphics capabilities and hardware display info.",
      "actionLabel": "Launch Display Info Diagnostics",
      "actionHref": "/tests/display-info"
    }
  },
  "touch-screen-test": {
    "overview": "Los diagnósticos de écran táctil prueban la precisión, la capacidad de respuesta, las zonas muertas y la sensibilidad de los bordes del sensor táctil en dispositivos móviles, tabletas y monitores de écran táctil.",
    "whatToLookFor": [
      {
        "label": "Precisión del seguimiento táctil",
        "description": "Las líneas dibujadas deben seguir directamente debajo de la yema del dedo sin desplazamientos ni retrasos."
      },
      {
        "label": "Zonas muertas que no responden",
        "description": "Pruebe todas las esquinas y bordes para asegurarse de que cada cuadrante registre entradas táctiles."
      },
      {
        "label": "Latencia táctil / seguimiento",
        "description": "Observe la distancia entre el dedo en mouvement y el rastro de tinta dibujado."
      },
      {
        "label": "Registro de borde",
        "description": "Verifique que toque a lo largo del borde exterior extremo del registro de écran de manera confiable."
      }
    ],
    "canObserve": [
      "Coordenadas táctiles en tiempo real en el lienzo de la écran.",
      "Active touch point tracking and drawing continuity",
      "Touch event firing frequency and responsiveness"
    ],
    "cannotMeasure": [
      "Capacitive touch digitizer sampling rate in Hertz (e.g. 120Hz/240Hz polling)",
      "Physical glass surface impedance and anti-fingerprint coating condition",
      "Pressure sensitivity levels in grams without pressure-sensitive hardware"
    ],
    "interpretation": "Smooth, continuous lines across the entire display area verify that the capacitive digitizer has no dead spots, ghost touch issues, or boundary clipping.",
    "nextSteps": {
      "text": "Test multi-finger gesture tracking and maximum touch points.",
      "actionLabel": "Launch Multi-Touch Test",
      "actionHref": "/tests/multi-touch-test"
    }
  },
  "sharpness-test": {
    "overview": "Las tests de netteté evalúan la representación de fuentes, la claridad de los bordes y el timbre de mejora artificial de los bordes causado por una configuración excesiva de netteté de la visualización en écran del monitor.",
    "whatToLookFor": [
      {
        "label": "Anillo de halo blanc",
        "description": "Busque bordes o franjas de couleur blanc brillante alrededor del texto noir y líneas de alto contraste."
      },
      {
        "label": "résolution espuria de la estrella Siemens",
        "description": "Vérifiez si las líneas de los radios convergen limpiamente hacia el centro sin artefactos muaré circulares."
      },
      {
        "label": "Claridad de trama de línea fina de 1 px",
        "description": "Las líneas alternas en blanc y noir deben aparecer nítidas sin manchas grises turbias."
      },
      {
        "label": "Borde del texto manchado",
        "description": "Inspeccione pequeñas muestras de texto para asegurarse de que las letras estén nítidas y sin ruido artificial de netteté."
      }
    ],
    "canObserve": [
      "High-contrast fine detail rendering across varying font sizes",
      "Presence of artificial white contour halos and edge ringing",
      "Radial spoke resolution on Siemens star patterns"
    ],
    "cannotMeasure": [
      "Curva MTF (función de transferencia de modulación) de lente óptica",
      "Panel subpixel aperture ratio",
      "Anti-glare matte coating graininess"
    ],
    "interpretation": "Excessive sharpness produces white halos around text and lines, creating visual noise. Lowering monitor OSD sharpness to neutral restores clean, natural edges.",
    "nextSteps": {
      "text": "Evaluate subpixel font smoothing and ClearType rendering.",
      "actionLabel": "Démarrer test de claridad de texto",
      "actionHref": "/tests/text-clarity-test"
    }
  },
  "compare-displays": {
    "overview": "L'outil de comparaison d'écrans permet de vérifier simultanément le rendu des couleurs, la balance des blancs et la luminosité sur deux moniteurs côte à côte.",
    "whatToLookFor": [
      {
        "label": "Correspondance du point blanc",
        "description": "Vérifiez si les blancs des deux écrans ont la même température sans dérive chaude ou froide."
      },
      {
        "label": "Fidélité des couleurs",
        "description": "Comparez les teintes de référence pour ajuster les profils colorimétriques entre vos deux dalles."
      }
    ],
    "canObserve": [
      "Affichage de mires identiques sur plusieurs fenêtres",
      "Ajustement visuel de la balance colorimétrique"
    ],
    "cannotMeasure": [
      "Delta E photométrique absolu sans colorimètre externe"
    ],
    "interpretation": "Harmoniser la luminosité et la température de couleur entre deux écrans élimine la fatigue oculaire lors du multitâche.",
    "nextSteps": {
      "text": "Ajustez les réglages OSD",
      "actionLabel": "Guide de calibration OSD",
      "actionHref": "/guides/osd-calibration-guide"
    }
  },
  "display-info": {
    "overview": "La test de Información de écran recopila los parámetros técnicos disponibles a través del navegador: résolution lógica y física, relación de píxeles (DPR), profundidad de couleur y taux de rafraîchissement.",
    "whatToLookFor": [
      {
        "label": "résolution nativa correcta",
        "description": "Vérifiez que la résolution informada coincida con las especificaciones del panel."
      },
      {
        "label": "Escalado del sistema (DPR)",
        "description": "Verifique si el factor de escala refleja la configuración de su sistema operativo (100%, 125%, 150%, 200%)."
      }
    ],
    "canObserve": [
      "résolution de écran y ventana",
      "Profundidad de couleur en bits",
      "Relación de aspecto y DPR"
    ],
    "cannotMeasure": [
      "Dimensiones físicas en pulgadas",
      "Marca y modelo del panel a nivel de hardware"
    ],
    "interpretation": "Confirmar que el sistema operativo y el navegador reconocen la résolution completa evita pérdida de netteté.",
    "nextSteps": {
      "text": "¿Desea verificar la netteté del texto?",
      "actionLabel": "Démarrer test de netteté",
      "actionHref": "/tests/sharpness-test"
    }
  },
  "custom-pattern": {
    "overview": "Le générateur de mires personnalisées permet de créer des grilles, bandes de couleur et formes géométriques pour valider la précision de votre affichage.",
    "whatToLookFor": [
      {
        "label": "Alignement de la grille",
        "description": "Vérifiez que les lignes s'affichent avec une netteté absolue sur toute la surface."
      },
      {
        "label": "Uniformité de la couleur",
        "description": "Contrôlez que le fond choisi ne présente aucune variation de teinte dans les coins."
      }
    ],
    "canObserve": [
      "Génération de mires haute résolution",
      "Contrôle géométrique et centrage parfait"
    ],
    "cannotMeasure": [
      "Alignement microscopique physique des sous-pixels"
    ],
    "interpretation": "Un rendu net et sans déformation confirme un mappage 1:1 parfait de la dalle.",
    "nextSteps": {
      "text": "Vérifiez le format d'image",
      "actionLabel": "Test de format d'image",
      "actionHref": "/tests/scaling-aspect-test"
    }
  },
  "multi-touch-test": {
    "overview": "La test Multi-Touch analiza la capacidad de la écran táctil para registrar múltiples puntos de contacto simultáneos de manera precisa y sin retrasos.",
    "whatToLookFor": [
      {
        "label": "Número máximo de toques",
        "description": "Coloque varios dedos simultáneamente en la écran para comprobar cuántos puntos detecta su panel."
      },
      {
        "label": "Seguimiento fluido",
        "description": "Mueva los dedos en círculos para confirmar que no se producen saltos ni desconexiones."
      }
    ],
    "canObserve": [
      "Conteo de toques simultáneos",
      "Coordenadas X/Y en tiempo real",
      "Tasa de respuesta táctil"
    ],
    "cannotMeasure": [
      "Nivel de presión física sin lápiz óptico compatible",
      "Tiempo de escaneo del controlador táctil"
    ],
    "interpretation": "Los paneles modernos deben reconocer al menos 10 toques simultáneos sin toques fantasma.",
    "nextSteps": {
      "text": "¿Desea comprobar la respuesta táctil simple?",
      "actionLabel": "Démarrer test táctil",
      "actionHref": "/tests/touch-screen-test"
    }
  },
  "accelerometer-test": {
    "overview": "La test del acelerómetro evalúa los sensores de mouvement de su dispositivo en los tres ejes espaciales (X, Y, Z).",
    "whatToLookFor": [
      {
        "label": "Fuerza de gravedad en reposo",
        "description": "Con el dispositivo plano sobre una mesa, el eje Z debe indicar aproximadamente 9,8 m/s² (1G)."
      },
      {
        "label": "Respuesta a la inclinación",
        "description": "Al inclinar el dispositivo, los ejes X e Y deben responder de inmediato."
      }
    ],
    "canObserve": [
      "Valores de aceleración en m/s²",
      "Detección de inclinación",
      "Sensibilidad al mouvement"
    ],
    "cannotMeasure": [
      "Calibración interna de fábrica del chip",
      "Deriva por temperatura"
    ],
    "interpretation": "Una respuesta inmediata y un valor cercano a 9,8 m/s² en reposo confirman el correcto funcionamiento.",
    "nextSteps": {
      "text": "¿Desea probar el giroscopio?",
      "actionLabel": "Démarrer test de giroscopio",
      "actionHref": "/tests/gyroscope-test"
    }
  },
  "gyroscope-test": {
    "overview": "La test del giroscopio comprueba la velocidad angular y los movimientos de rotación en los tres ejes.",
    "whatToLookFor": [
      {
        "label": "Estabilidad en reposo",
        "description": "Sin mover el dispositivo, los valores deben mantenerse cerca de 0."
      },
      {
        "label": "Detección de rotación",
        "description": "Vérifiez que girar el dispositivo en cualquier sentido se refleje con fluidez."
      }
    ],
    "canObserve": [
      "Velocidad de rotación en rad/s",
      "Dirección de giro en cada eje",
      "Fluidez de muestreo"
    ],
    "cannotMeasure": [
      "Orientación magnética absoluta sin brújula",
      "Deriva temporal prolongada"
    ],
    "interpretation": "Valores estables en reposo y respuesta rápida a los giros indican que el sensor está en perfecto estado.",
    "nextSteps": {
      "text": "¿Desea probar la vibración del dispositivo?",
      "actionLabel": "Démarrer test de vibración",
      "actionHref": "/tests/vibration-test"
    }
  },
  "vibration-test": {
    "overview": "La test de vibración comprueba el motor háptico interno del dispositivo, su intensidad y los pulsos de respuesta.",
    "whatToLookFor": [
      {
        "label": "netteté de la vibración",
        "description": "Vérifiez que el motor vibre limpiamente sin sonidos extraños ni piezas sueltas."
      },
      {
        "label": "Patrones de pulso",
        "description": "Verifique si responde a pulsos cortos y secuencias continuas."
      }
    ],
    "canObserve": [
      "Activación del motor mediante la API de vibración",
      "Diferentes ritmos y pulsos"
    ],
    "cannotMeasure": [
      "Aceleración física real en Grms",
      "Consumo de energía del motor"
    ],
    "interpretation": "Un funcionamiento claro y sin ruidos mecánicos anómalos confirma el buen estado del actuador háptico.",
    "nextSteps": {
      "text": "¿Desea probar los altavoces?",
      "actionLabel": "Démarrer test de altavoces",
      "actionHref": "/tests/speaker-test"
    }
  },
  "webcam-test": {
    "overview": "La test de cámara web permite verificar la señal de vídeo, résolution máxima, tasa de fotogramas y balance de couleur en tiempo real.",
    "whatToLookFor": [
      {
        "label": "résolution y netteté",
        "description": "Vérifiez que la imagen sea nítida y coincida con la résolution esperada."
      },
      {
        "label": "Fluidez de mouvement",
        "description": "Asegúrese de que el mouvement se capture a 30 o 60 fps sin tirones."
      },
      {
        "label": "Exposición y couleur",
        "description": "Verifique que no haya sobreexposición ni ruido excesivo en zonas oscuras."
      }
    ],
    "canObserve": [
      "Vista previa de vídeo en directo",
      "résolution y tasa de fotogramas activas",
      "Calidad de imagen y couleur"
    ],
    "cannotMeasure": [
      "Ruido de sensor a nivel físico de fotodiodos",
      "Distorsión óptica de lentes"
    ],
    "interpretation": "Una imagen clara, fluida y con couleurs naturales confirma que su cámara web está lista para videollamadas.",
    "nextSteps": {
      "text": "¿Desea verificar el micrófono?",
      "actionLabel": "Démarrer test de micrófono",
      "actionHref": "/tests/microphone-test"
    }
  },
  "speaker-test": {
    "overview": "La test de altavoces comprueba la separación estéreo de los canales izquierdo y derecho, la respuesta en frecuencia y la distorsión acústica.",
    "whatToLookFor": [
      {
        "label": "Separación estéreo",
        "description": "Asegúrese de que el sonido izquierdo suene únicamente por el altavoz izquierdo y viceversa."
      },
      {
        "label": "Barrido de frecuencias",
        "description": "Escuche el barrido de graves a agudos para detectar vibraciones molestas o cortes."
      }
    ],
    "canObserve": [
      "Reproducción independiente izquierda/derecha",
      "Barrido de audio de 20 Hz a 20 kHz",
      "Detección de chasquidos"
    ],
    "cannotMeasure": [
      "Presión sonora absoluta en decibelios (dB SPL)",
      "Distorsión armónica total (THD%)"
    ],
    "interpretation": "Una separación estéreo nítida y un barrido sin vibraciones garantizan un rendimiento sonoro correcto.",
    "nextSteps": {
      "text": "¿Desea probar la sincronización de audio y vídeo?",
      "actionLabel": "Démarrer test de sincronización",
      "actionHref": "/tests/audio-sync-test"
    }
  },
  "microphone-test": {
    "overview": "La test de micrófono analiza la sensibilidad de entrada de audio, el espectro de frecuencias y el nivel de ruido de fondo.",
    "whatToLookFor": [
      {
        "label": "Nivel de entrada",
        "description": "Al hablar, el indicador debe subir con claridad a la zona verde (-12 dB a -6 dB)."
      },
      {
        "label": "Ruido de fondo",
        "description": "En silencio, el medidor debe caer al mínimo sin emitir zumbidos constantes."
      }
    ],
    "canObserve": [
      "Medidor de volumen en tiempo real",
      "Espectrograma de frecuencias Web Audio",
      "Sensibilidad y ganancia"
    ],
    "cannotMeasure": [
      "Ruido intrínseco del sensor electroacústico",
      "Patrón polar de captación"
    ],
    "interpretation": "Una voz clara y un nivel bajo de ruido de fondo indican que el micrófono funciona correctamente.",
    "nextSteps": {
      "text": "¿Desea probar el tiempo de reacción?",
      "actionLabel": "Démarrer test de tiempo de reacción",
      "actionHref": "/tests/reaction-time-test"
    }
  },
  "reaction-time-test": {
    "overview": "La test de tiempo de reacción mide su velocidad de reflejos visuales combinada con la latencia del sistema y del ratón.",
    "whatToLookFor": [
      {
        "label": "Tiempo medio de respuesta",
        "description": "Haga clic lo más rápido posible cuando el couleur cambie a verde para medir sus milisegundos (ms)."
      },
      {
        "label": "Consistencia de resultados",
        "description": "Realice varias tests consecutivas para calcular su media real."
      }
    ],
    "canObserve": [
      "Tiempo de reacción exacto en milisegundos",
      "Estadísticas y media de intentos",
      "Beneficio de écrans de alta frecuencia"
    ],
    "cannotMeasure": [
      "Tiempo de conducción neuronal aislado del hardware",
      "Tiempo de rebote físico del interruptor del ratón"
    ],
    "interpretation": "El promedio en adultos sanos se sitúa entre 200 y 250 ms. Menos de 200 ms refleja reflejos muy rápidos.",
    "nextSteps": {
      "text": "¿Desea probar la tasa de sondeo del ratón?",
      "actionLabel": "Démarrer test de sondeo",
      "actionHref": "/tests/mouse-polling-test"
    }
  },
  "pixel-inversion-test": {
    "overview": "La test de inversión de píxeles (VCOM) comprueba el equilibrio de polaridad en écrans LCD para evitar parpadeos y patrones de muaré.",
    "whatToLookFor": [
      {
        "label": "scintillement rápido",
        "description": "Observe si alguno de los patrones tramados parpadea intensamente o si se muestra como un gris quieto."
      },
      {
        "label": "Tono gris uniforme",
        "description": "En un panel bien calibrado, los patrones deben verse neutros y estables a distancia normal."
      }
    ],
    "canObserve": [
      "scintillement visual con patrones de inversión de fase",
      "Comportamiento del tipo de inversión del panel",
      "Estabilidad de frecuencia"
    ],
    "cannotMeasure": [
      "Voltaje VCOM interno en voltios",
      "Ángulo de retardo de las moléculas del cristal líquido"
    ],
    "interpretation": "Si los patrones se perciben como un gris fijo sin centelleo, la tensión VCOM está correctamente calibrada.",
    "nextSteps": {
      "text": "¿Desea comprobar el scintillement PWM?",
      "actionLabel": "Démarrer test de scintillement PWM",
      "actionHref": "/tests/pwm-flicker-test"
    }
  }
};
