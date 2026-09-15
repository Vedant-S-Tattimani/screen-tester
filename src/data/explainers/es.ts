import { ExplainerData, ExplainerLabels } from "./types";

export const ES_LABELS: ExplainerLabels = {
  "overviewHeading": "Descripción General de la Inspección",
  "whatToLookForHeading": "Qué Buscar Durante la Inspección",
  "boundariesHeading": "Límites de Medición y Honestidad Técnica",
  "canObserveLabel": "Lo Que Screen Tester Puede Observar",
  "cannotMeasureLabel": "Lo Que el Navegador No Puede Medir con Precisión",
  "interpretationHeading": "Interpretación de Sus Observaciones",
  "nextStepsHeading": "Próximos Pasos Recomendados"
};

export const ES_EXPLAINERS: Record<string, ExplainerData> = {
  "dead-pixel-test": {
    "overview": "Un píxel muerto es un subpíxel de cristal líquido o un emisor OLED permanentemente apagado que permanece completamente oscuro independientemente de la señal que se le envíe. En fondos brillantes, especialmente blanco puro, cian y amarillo, los píxeles muertos se destacan como motas oscuras o negras estáticas y nítidas.",
    "whatToLookFor": [
      {
        "label": "Puntos oscuros estáticos en pantallas blancas/claras",
        "description": "Un pequeño punto negro que no cambia ni se ilumina a medida que recorre fondos sólidos y brillantes indica un píxel muerto."
      },
      {
        "label": "Distinguir los píxeles muertos del polvo",
        "description": "El polvo de la superficie se desplaza cuando se ve desde diferentes ángulos y se puede limpiar suavemente. Un verdadero píxel muerto se encuentra detrás del filtro polarizador exterior."
      },
      {
        "label": "Defectos de subpíxeles frente a píxeles completos",
        "description": "Si solo falla un subpíxel (rojo, verde o azul), el píxel aparecerá ligeramente descolorido en lugar de negro sobre blanco."
      },
      {
        "label": "Defectos del racimo",
        "description": "Múltiples píxeles muertos agrupados en un área pequeña representan un defecto grave del panel y generalmente califican para un reemplazo inmediato bajo garantía del fabricante."
      }
    ],
    "canObserve": [
      "Identificación visual de píxeles apagados en fondos primarios y secundarios sólidos",
      "Coordenadas exactas de la pantalla y recuento de puntos oscuros sospechosos en las zonas de visualización",
      "Validación de contraste entre la luminancia de fondo y los subpíxeles sin alimentación"
    ],
    "cannotMeasure": [
      "Continuidad eléctrica o estado de voltaje del transistor de película delgada (TFT) subyacente",
      "Detección automática sin inspección visual humana del usuario",
      "Clasificación de defectos físicos de fabricación bajo capas de vidrio."
    ],
    "interpretation": "Los píxeles muertos son causados ​​por fallas microscópicas de los transistores durante la fabricación del panel o por impacto físico. La mayoría de los fabricantes de pantallas siguen las pautas ISO 9241-307 Clase 1 o Clase 2, que definen umbrales aceptables (generalmente de 2 a 5 subpíxeles muertos por millón).",
    "nextSteps": {
      "text": "Si detecta subpíxeles atascados que permanecen iluminados en lugar de negros, utilice nuestra herramienta de ejercicio dedicada para intentar recuperarlos.",
      "actionLabel": "Inicie el reparador de píxeles atascados",
      "actionHref": "/tests/stuck-pixel-fixer"
    }
  },
  "stuck-pixel-test": {
    "overview": "A diferencia de un píxel muerto que permanece permanentemente oscuro, un píxel atascado es causado por una celda de cristal líquido atascada en un estado abierto, lo que permite que la luz de fondo pase continuamente. Aparece como un punto persistente de color brillante, generalmente rojo, verde, azul, cian, magenta o blanco puro, más visible sobre fondos negros sólidos y oscuros.",
    "whatToLookFor": [
      {
        "label": "Puntos de colores brillantes sobre negro puro",
        "description": "Inspeccione una pantalla completamente negra en una habitación oscura. Cualquier punto nítido que brille en rojo, verde, azul o amarillo es un subpíxel atascado."
      },
      {
        "label": "Pruebas de color complementarias",
        "description": "Un subpíxel verde atascado desaparecerá sobre un fondo verde, pero brillará intensamente sobre fondos rojos, azules o negros."
      },
      {
        "label": "Píxeles blancos calientes",
        "description": "Si los tres subpíxeles (RGB) están permanentemente abiertos, el punto aparecerá como un punto blanco estático en fondos oscuros."
      },
      {
        "label": "Distinción del sangrado de retroiluminación",
        "description": "Los píxeles atascados son pinchazos de luz de un solo píxel, mientras que el sangrado de la luz de fondo produce parches difusos similares a nubes a lo largo de los bordes de la pantalla."
      }
    ],
    "canObserve": [
      "Identificación visual de subpíxeles iluminados sobre fondos oscuros y complementarios.",
      "Aislamiento de canales de color de subpíxeles defectuosos individuales (R, G o B)",
      "Mapeo de cuadrantes de pantalla de píxeles defectuosos"
    ],
    "cannotMeasure": [
      "Viscosidad química del cristal líquido o estado de alineación física.",
      "Velocidad de conmutación de puerta de transistor o resistencia eléctrica",
      "Permanencia garantizada del defecto sin observación prolongada."
    ],
    "interpretation": "Los píxeles atascados ocurren con frecuencia cuando una molécula de cristal líquido no logra regresar a su estado relajado, a menudo debido a irregularidades de fabricación o cargas eléctricas microscópicas. A diferencia de los píxeles muertos, los píxeles atascados temporalmente a veces se pueden aflojar mediante estimulación visual.",
    "nextSteps": {
      "text": "¿Has localizado un píxel atascado? Intente una rápida estimulación visual de subpíxeles con nuestro ejercitador de color localizado.",
      "actionLabel": "Pruebe el solucionador de píxeles atascados",
      "actionHref": "/tests/stuck-pixel-fixer"
    }
  },
  "stuck-pixel-fixer": {
    "overview": "Stuck Pixel Fixer utiliza ciclos de color localizados de alta frecuencia y patrones de ruido visual para excitar rápidamente las moléculas de cristal líquido. La alternancia rápida de colores primarios y secundarios obliga a los transistores de subpíxeles y a las células de cristal líquido a alternar estados a alta velocidad, lo que ocasionalmente puede liberar un subpíxel temporalmente atascado.",
    "whatToLookFor": [
      {
        "label": "Alineación de caja dirigida",
        "description": "Coloque la caja de estimulación animada directamente sobre el píxel atascado para evitar distracciones estroboscópicas en toda la pantalla."
      },
      {
        "label": "Selección de patrón",
        "description": "Alterne entre ciclo RGB (estimulación amplia) y ruido de color (excitación aleatoria de alta frecuencia) para obtener resultados óptimos."
      },
      {
        "label": "Duración de la sesión",
        "description": "Ejecute la estimulación durante 15 a 30 minutos, luego haga una pausa e inspeccione en negro puro para verificar si el píxel se ha liberado."
      },
      {
        "label": "Aviso de sensibilidad visual",
        "description": "Si experimenta mareos, dolor de cabeza o fatiga visual, detenga la estimulación inmediatamente. Nunca utilizar si es fotosensible."
      }
    ],
    "canObserve": [
      "Reproducción visual en tiempo real de ciclos RGB de alta velocidad y patrones de ruido de subpíxeles aleatorios",
      "Posicionamiento localizado preciso y seguimiento de la duración del temporizador directamente en su navegador",
      "Confirmación visual de si la capacidad de respuesta de los píxeles cambia antes y después de la estimulación"
    ],
    "cannotMeasure": [
      "Reparación eléctrica a nivel de hardware de transistores TFT físicamente dañados o quemados",
      "Cualquier porcentaje de recuperación garantizado: el éxito depende completamente de la química del panel físico.",
      "Reparación automática de software de píxeles muertos (negros permanentemente apagados)"
    ],
    "interpretation": "Los ejercitadores de software trabajan exclusivamente con células de cristal líquido temporalmente atascadas. Si un subpíxel se desprende físicamente, se fractura o está completamente muerto (sin alimentación), la estimulación del software no puede revivirlo. Si la estimulación falla después de repetidas sesiones, consulte los términos de garantía del fabricante.",
    "nextSteps": {
      "text": "Después de ejecutar la estimulación, vuelva a la prueba de píxeles atascados para inspeccionar el área en negro puro.",
      "actionLabel": "Verificar con prueba de píxeles atascados",
      "actionHref": "/tests/stuck-pixel-test"
    }
  },
  "refresh-rate-test": {
    "overview": "La frecuencia de actualización de la pantalla (medida en Hertz, Hz) indica cuántas veces por segundo la pantalla reconstruye la imagen. Esta prueba utiliza el reloj de animación de alta resolución del navegador (requestAnimationFrame) para observar el ritmo de entrega de fotogramas, detectar fotogramas perdidos y verificar si el navegador coincide con la frecuencia de actualización configurada de su sistema operativo.",
    "whatToLookFor": [
      {
        "label": "Frecuencia de actualización informada versus configurada",
        "description": "Verifique que el valor informado coincida con el objetivo de su pantalla (por ejemplo, 60 Hz, 120 Hz, 144 Hz, 240 Hz o 360 Hz)."
      },
      {
        "label": "Ritmo de cuadro y fluctuación",
        "description": "Mire el gráfico del delta de tiempo entre fotogramas. Una pantalla estable de 144 Hz debería ofrecer fotogramas a intervalos constantes de ~6,94 ms."
      },
      {
        "label": "Limitación de marco del navegador",
        "description": "Si un monitor de 144 Hz informa exactamente 60 Hz, es posible que la configuración de pantalla de su navegador o sistema operativo esté limitada para ahorrar batería o que falten indicadores de GPU."
      },
      {
        "label": "Suavidad del indicador móvil",
        "description": "Inspeccione la barra móvil. En pantallas de alta actualización, la animación debe deslizarse con un mínimo de vibración o tartamudeo."
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
      "text": "¿Su frecuencia de actualización tiene un límite de 60 Hz en un monitor de juegos? Consulte nuestra guía sobre cómo configurar las frecuencias de actualización de la pantalla del sistema operativo y la GPU.",
      "actionLabel": "Leer Solución de problemas de frecuencia de actualización",
      "actionHref": "/knowledge-base/troubleshooting#refresh-rate-capped"
    }
  },
  "ghosting-test": {
    "overview": "El efecto fantasma en movimiento aparece como sombras que se arrastran o réplicas manchadas detrás de objetos en movimiento. Ocurre cuando las moléculas de cristal líquido tardan más en realizar la transición entre estados de color (tiempo de respuesta de píxeles) que la duración de un solo cuadro de actualización. Esta prueba representa bloques en movimiento contra varios tonos de fondo para exponer las coronas de sobremarcha y seguimiento del tiempo de respuesta.",
    "whatToLookFor": [
      {
        "label": "Sombras oscuras (fantasma tradicional)",
        "description": "Una mancha oscura detrás de un objeto en movimiento indica transiciones lentas de cristal líquido de oscuro a claro, comunes en los paneles VA."
      },
      {
        "label": "Halos/Coronas brillantes (efecto fantasma inverso)",
        "description": "Un rastro brillante detrás del objeto significa que la configuración de Overdrive (OD) o Tiempo de respuesta del monitor es demasiado agresiva (overshoot)."
      },
      {
        "label": "Seguimiento de color específico",
        "description": "Observe si el seguimiento es peor en fondos rojos, verdes o gris oscuro. Los tiempos de transición varían mucho entre pares de colores."
      },
      {
        "label": "Observación con cámara de persecución",
        "description": "Siga el objeto en movimiento con los ojos o con una cámara en movimiento para aislar la respuesta del panel que se desprende del desenfoque del movimiento de la retina."
      }
    ],
    "canObserve": [
      "Presencia visual de bordes de fuga, manchas y coronas de sobreimpulso en velocidades personalizables",
      "Comparación de sensibilidad de contraste de pares de colores (transiciones de claro a oscuro versus de oscuro a claro)",
      "Impacto visual de ajustar la configuración OSD física de Overdrive/Tiempo de respuesta de su monitor"
    ],
    "cannotMeasure": [
      "Tiempo de respuesta de laboratorio gris a gris (GtG) en milisegundos exactos",
      "Curvas de caída de intensidad de luz de la cámara de seguimiento fotométrica",
      "Curvas de respuesta de voltaje de cristal líquido de subpíxeles"
    ],
    "interpretation": "El efecto fantasma está determinado fundamentalmente por la tecnología del panel (TN es rápido pero de color deficiente, IPS está equilibrado, VA a menudo muestra manchas en el nivel de oscuridad, OLED tiene una respuesta casi instantánea). Ajustar la configuración OSD 'Tiempo de respuesta' o 'Overdrive' de su monitor a Medio generalmente logra el mejor equilibrio entre imágenes fantasma y sobreimpulso.",
    "nextSteps": {
      "text": "¿Quiere aprender cómo funciona la sobremarcha del monitor y cómo eliminar los halos fantasma inversos?",
      "actionLabel": "Lea la guía de imágenes fantasma y desenfoque de movimiento",
      "actionHref": "/knowledge-base/monitor-ghosting-and-motion-blur"
    }
  },
  "motion-blur-test": {
    "overview": "A diferencia del efecto fantasma (que surge de una respuesta lenta de los píxeles), el desenfoque de movimiento en los paneles planos modernos es causado predominantemente por la mecánica de visualización de muestreo y retención. Debido a que la pantalla mantiene cada cuadro de imagen continuamente hasta la siguiente actualización, sus ojos siguen el movimiento suave a través de una imagen estática, creando una percepción de desenfoque retiniano.",
    "whatToLookFor": [
      {
        "label": "Retención de detalles a alta velocidad",
        "description": "Observe las finas líneas verticales y el texto a medida que viajan por la pantalla. Observe dónde se combinan los detalles finos."
      },
      {
        "label": "Comparación de velocidad",
        "description": "Compare el movimiento de baja velocidad (240 px/s) con el de alta velocidad (960 px/s) para ver cómo el desenfoque del seguimiento ocular aumenta con la velocidad."
      },
      {
        "label": "Efectos de inserción de marco negro (BFI)",
        "description": "Si su monitor tiene una función de retroiluminación estroboscópica (ULMB, ELMB, DyAc), habilitarla agudiza drásticamente los patrones en movimiento."
      },
      {
        "label": "Desenfoque de muestra y retención OLED",
        "description": "Incluso con una respuesta de píxeles instantánea de 0,1 ms, el desenfoque de muestreo y retención seguirá produciéndose a 60 Hz o 120 Hz sin luz estroboscópica."
      }
    ],
    "canObserve": [
      "Diferencias de desenfoque de movimiento perceptual a través de diferentes velocidades horizontales y frecuencias de actualización",
      "Mejoras en la nitidez visual al utilizar los modos estroboscópicos/BFI de retroiluminación del hardware",
      "Contraste entre bordes estáticos nítidos y contornos en movimiento borrosos"
    ],
    "cannotMeasure": [
      "Tiempo de respuesta física de imágenes en movimiento (MPRT) en milisegundos exactos",
      "Curvas de integración de la luz retiniana de la visión humana.",
      "Porcentaje del ciclo de trabajo de la luz de fondo estroboscópica"
    ],
    "interpretation": "Para reducir el desenfoque de muestreo y retención, las pantallas deben aumentar la frecuencia de actualización (acortando la duración de la visualización de cada cuadro) o implementar luz de fondo estroboscópica (insertando intervalos oscuros para aclarar la persistencia de la retina).",
    "nextSteps": {
      "text": "Compárelo con la prueba de frecuencia de actualización para comprender cómo los Hz más altos reducen el desenfoque de movimiento.",
      "actionLabel": "Inspeccionar frecuencia de actualización",
      "actionHref": "/tests/refresh-rate-test"
    }
  },
  "vrr-test": {
    "overview": "La frecuencia de actualización variable (VRR), que incluye NVIDIA G-Sync, AMD FreeSync y VESA Adaptive-Sync, sincroniza dinámicamente los ciclos de actualización de su monitor con la velocidad de procesamiento de fotogramas de la GPU. Esta prueba modula las tasas de entrega de animación para inspeccionar visualmente el ritmo, el desgarro y la vibración de fotogramas adaptativos en su navegador.",
    "whatToLookFor": [
      {
        "label": "Artefactos desgarradores de pantalla",
        "description": "Busque líneas de división horizontales donde la parte superior e inferior de la imagen muestren diferentes fotogramas simultáneamente."
      },
      {
        "label": "Vibración y tartamudeo del marco",
        "description": "Observe si el indicador móvil se desliza suavemente o muestra micropausas a medida que cambia la frecuencia de renderizado."
      },
      {
        "label": "VRR en ventana o en pantalla completa",
        "description": "Muchos controladores de GPU solo activan G-Sync/FreeSync en aplicaciones de pantalla completa real, a menos que estén configurados para el modo de ventana."
      },
      {
        "label": "LFC (compensación de baja velocidad de fotogramas)",
        "description": "Cuando la velocidad de fotogramas cae por debajo del rango VRR mínimo de su monitor (por ejemplo, por debajo de 48 Hz), observe si los fotogramas se duplican sin problemas."
      }
    ],
    "canObserve": [
      "Líneas visuales desgarradas y micro tartamudeo durante el renderizado de intervalo variable",
      "Suavidad del ritmo de la animación en condiciones de entrega de fotogramas fluctuantes",
      "Diferencia percibida por el usuario entre el comportamiento de visualización en ventana y en pantalla completa"
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
    "overview": "El sangrado de retroiluminación ocurre en pantallas LCD cuando la capa de cristal líquido no logra bloquear completamente la luz emitida por CCFL o retroiluminación LED, lo que permite que la luz se filtre por los bordes o esquinas. Esta prueba de negro puro en pantalla completa le permite inspeccionar fugas en los bordes, parches turbios y distinguir el sangrado del brillo IPS desde el ángulo de visión.",
    "whatToLookFor": [
      {
        "label": "Bengalas de luz para bordes y esquinas",
        "description": "Luz amarilla o blanca brillante que se acumula a lo largo de los bordes exteriores del marco y permanece visible independientemente del ángulo de visión."
      },
      {
        "label": "Brillo IPS vs sangrado de retroiluminación",
        "description": "Mueve la cabeza de lado a lado. Si el brillo cambia de posición o cambia de intensidad con su ángulo, es un brillo IPS normal, no un sangrado."
      },
      {
        "label": "Nublamiento / Murafanning",
        "description": "Áreas difusas e irregulares de brillo elevado esparcidas por el panel causadas por láminas de difusión desigual o presión mecánica."
      },
      {
        "label": "Comparación OLED / Mini-LED",
        "description": "Las pantallas OLED emiten luz por píxel y no presentan pérdida de retroiluminación (0 nits puros). Los mini-LED FALD pueden mostrar un halo localizado."
      }
    ],
    "canObserve": [
      "Fuga visual en los bordes, puntos de pellizco localizados en el bisel y patrones nublados contra el negro",
      "Gravedad relativa de la fuga de luz en las esquinas de la pantalla en un entorno oscuro",
      "Diferencias de sensibilidad del ángulo de visión (distinguiendo el sangrado estático del brillo dinámico de IPS)"
    ],
    "cannotMeasure": [
      "Luminancia absoluta del panel en cd/m² (nits) sin espectrofotómetro",
      "Relación de contraste estático nativo (por ejemplo, 1000:1 frente a 3000:1)",
      "Certificación de cumplimiento de contraste ANSI de 16 zonas"
    ],
    "interpretation": "El brillo suave de IPS es una característica óptica inherente de los paneles de conmutación en plano de gran angular. Sin embargo, el sangrado grave de la luz de fondo es un defecto de ensamblaje mecánico en el que el bisel del monitor pellizca la placa guía de luz interna.",
    "nextSteps": {
      "text": "Conozca las diferencias cruciales entre el brillo de IPS, el sangrado de retroiluminación y los niveles de negro de OLED.",
      "actionLabel": "Lea la guía de purga de retroiluminación frente a brillo IPS",
      "actionHref": "/knowledge-base/backlight-bleed-vs-ips-glow"
    }
  },
  "near-black-test": {
    "overview": "Las pruebas de casi negro evalúan la capacidad de una pantalla para delinear tonos sutiles de gris oscuro inmediatamente por encima del negro puro (0% a 5% de luminancia). Si un monitor convierte las sombras oscuras en negro puro, se perderán permanentemente los detalles críticos de las sombras en películas, juegos y edición de fotografías.",
    "whatToLookFor": [
      {
        "label": "Black Crush (recorte prematuro)",
        "description": "Si el paso 1 (0,5 % o 1 %) es completamente invisible y se fusiona con un negro puro, su monitor sufre un aplastamiento del negro."
      },
      {
        "label": "Distinción de paso individual",
        "description": "Debería poder percibir contornos de límites tenues entre muestras grises consecutivas de baja luminosidad en una habitación oscura."
      },
      {
        "label": "Desplazamiento gamma del ángulo de visión",
        "description": "En los paneles VA, busque el \"aplastamiento negro en el eje\": detalle de sombra que aparece solo cuando se ve ligeramente fuera de ángulo."
      },
      {
        "label": "Reflejo de luz ambiental",
        "description": "Apague las luces del techo de la habitación; El resplandor ambiental perjudica gravemente la percepción del ojo humano de tonos casi negros."
      }
    ],
    "canObserve": [
      "Umbrales de visibilidad visual para parches de luminancia casi negros del 0,5%, 1%, 2%, 3%, 4% y 5%",
      "Separación de detalles de sombras perceptuales en muestras de colores oscuros",
      "Impacto de la configuración del monitor Gamma, Ecualizador de negro y Rango dinámico HDMI"
    ],
    "cannotMeasure": [
      "Valores de luminancia fotométrica inferiores a 0,05 nits sin colorímetro de laboratorio",
      "Conformidad matemática exacta de la curva gamma (BT.1886 frente a 2,2 frente a sRGB)",
      "Panel hardware punto negro nativo en candelas absolutas por metro cuadrado"
    ],
    "interpretation": "El aplastamiento del negro suele ser causado por un rango dinámico de salida de color de la GPU incorrecto (Limitado 16–235 frente a Completo 0–255), un ecualizador de negro del monitor demasiado agresivo o curvas gamma de gama baja no lineales.",
    "nextSteps": {
      "text": "¿Perdiendo detalles de sombras en juegos y vídeos? Siga nuestra guía de solución de problemas para corregir el aplastamiento negro.",
      "actionLabel": "Lea la solución de problemas de Black Crush",
      "actionHref": "/knowledge-base/troubleshooting#black-crush"
    }
  },
  "gradient-banding-test": {
    "overview": "Los degradados de color suaves requieren gradaciones finas en miles de valores tonales intermedios. Cuando un panel de visualización, un controlador de gráficos o un canal de imágenes tiene una profundidad de bits insuficiente o un procesamiento de color deficiente, los gradientes suaves se degradan en bandas escalonadas visibles o líneas de posterización marcadas.",
    "whatToLookFor": [
      {
        "label": "Líneas de paso visibles",
        "description": "Busque límites de franjas verticales u horizontales distintos en transiciones suaves de color RGB y escala de grises."
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
      "Presencia visual de pasos de bandas de color en escala de grises y gradientes de colores primarios/secundarios",
      "Comparación entre rampas de color horizontales, verticales y multicanal",
      "Artefactos visuales resultantes de perfiles de color de software o configuraciones de rango dinámico de GPU"
    ],
    "cannotMeasure": [
      "Profundidad de bits de hardware directo (6 bits, 8 bits, 10 bits) independiente de los informes de GPU",
      "Desviación de color Delta E cuantificada entre pasos de color adyacentes",
      "Rendimiento del algoritmo de difuminado espacial a nivel de escalador de hardware"
    ],
    "interpretation": "Las bandas pueden deberse a limitaciones de hardware (paneles de 6 bits), configuraciones incorrectas del controlador (rango dinámico RGB limitado) o perfiles de calibración ICC agresivos que truncan los valores de color digitales.",
    "nextSteps": {
      "text": "¿Quiere simular pasos específicos de 6 bits, 8 bits y difuminado? Pruebe nuestra herramienta dedicada Bandas de color y profundidad de bits.",
      "actionLabel": "Pruebe la prueba de profundidad de bits y tramado",
      "actionHref": "/tests/color-banding-test"
    }
  },
  "uniformity-test": {
    "overview": "La uniformidad de la pantalla mide la consistencia con la que un monitor reproduce el brillo y la temperatura del color en toda su superficie. Las imperfecciones en la fabricación, las láminas de difusión de la retroiluminación o la iluminación de los bordes a menudo provocan esquinas más oscuras, puntos calientes centrales o el efecto de pantalla sucia (DSE).",
    "whatToLookFor": [
      {
        "label": "Viñeteado de esquinas y bordes",
        "description": "Inspeccione las esquinas exteriores y los bordes perimetrales con un 25 %, 50 % y 75 % de gris. Observe si las esquinas aparecen notablemente más oscuras."
      },
      {
        "label": "Efecto de pantalla sucia (DSE)",
        "description": "Busque patrones de textura tenues, turbios o con manchas en el centro de la pantalla, que se notan al desplazarse por tonos sólidos."
      },
      {
        "label": "Tinte de temperatura de color",
        "description": "Observe si un lado de la pantalla parece más cálido (rojizo/amarillento) y el lado opuesto más frío (azulado)."
      },
      {
        "label": "Comparación zona por zona",
        "description": "Compare las celdas de la cuadrícula de 5x5 para evaluar la variación relativa de luminancia desde el centro hasta el perímetro."
      }
    ],
    "canObserve": [
      "Caídas de luminancia visual, viñeteado de bordes y puntos calientes centrales en grises y blancos sólidos",
      "La temperatura del color visual cambia entre las regiones del panel izquierdo, central y derecho",
      "Inspección en múltiples niveles de luminancia estandarizados de grises neutros y colores primarios"
    ],
    "cannotMeasure": [
      "Métricas de uniformidad porcentual (por ejemplo, '98,5% uniforme') sin rejillas de espectrofotómetro multipunto",
      "Variaciones de temperatura de color correlacionada (CCT en Kelvin) entre las coordenadas del panel",
      "Estado de activación del circuito de compensación de uniformidad de fábrica (DUC)"
    ],
    "interpretation": "Los monitores de consumo generalmente toleran una caída de luminancia del 10 % al 15 % hacia los bordes. Los monitores gráficos profesionales emplean Compensación de Uniformidad Digital (DUC) para lograr una variación inferior al 5%.",
    "nextSteps": {
      "text": "Descubra por qué se producen el efecto de pantalla sucia y el viñeteado y cuándo se justifica el reemplazo del panel.",
      "actionLabel": "Leer la guía de uniformidad de pantalla",
      "actionHref": "/knowledge-base/backlight-bleed-vs-ips-glow"
    }
  },
  "text-clarity-test": {
    "overview": "La claridad del texto depende de la densidad de píxeles del monitor (PPI), la configuración de escala de la pantalla, la geometría física de los subpíxeles (RGB, BGR, QD-OLED pentile) y los algoritmos de suavizado de fuentes del sistema operativo. Esta prueba evalúa la legibilidad, los bordes de color y la representación de fuentes en múltiples tamaños y pesos.",
    "whatToLookFor": [
      {
        "label": "Franjas de color en los bordes de la fuente",
        "description": "Inspeccione el texto negro de alto contraste sobre blanco. Los tenues halos rojos o cian a lo largo de los trazos verticales indican una discrepancia en el diseño de los subpíxeles."
      },
      {
        "label": "Inversión de subpíxeles BGR",
        "description": "Algunos monitores utilizan diseños de subpíxeles BGR en lugar de RGB estándar, lo que provoca texto borroso a menos que se reconfigure Windows ClearType."
      },
      {
        "label": "Bordes de texto OLED",
        "description": "Las disposiciones de subpíxeles WOLED y QD-OLED triangulares producen sutiles franjas verdes o magenta a lo largo de los bordes horizontales del texto."
      },
      {
        "label": "Desenfoque de escala fraccional",
        "description": "La escala de visualización no entera (como 125 % o 150 %) puede causar una sutil suavidad en la rasterización de fuentes en aplicaciones de escritorio heredadas."
      }
    ],
    "canObserve": [
      "Franjas de color visuales y halos en contornos de texto fino en tamaños de fuente de 8 px a 32 px",
      "Diferencias de representación de subpíxeles entre los pesos de fuente, serif frente a sans-serif y modos de inversión",
      "Impacto del zoom del navegador y la escala de visualización del sistema operativo en la nitidez de las fuentes"
    ],
    "cannotMeasure": [
      "Geometría física microscópica de subpíxeles sin lente macro ni microscopio",
      "Indicadores de configuración del rasterizador de fuentes DirectWrite/ClearType internos del sistema operativo",
      "Función de transferencia de modulación de nitidez acústica u óptica (MTF)"
    ],
    "interpretation": "Si el texto aparece borroso con contornos de colores, volver a ejecutar Windows ClearType Tuner o ajustar el suavizado de fuentes de macOS a menudo resuelve las incompatibilidades de diseño RGB/BGR.",
    "nextSteps": {
      "text": "¿Ves fuentes borrosas o franjas de colores alrededor del texto? Siga nuestra guía para ajustar ClearType y mostrar la escala.",
      "actionLabel": "Leer solución de problemas de claridad del texto",
      "actionHref": "/knowledge-base/troubleshooting#blurry-text-scaling"
    }
  },
  "hdr-capability-test": {
    "overview": "El detector de señales y hardware HDR audita si el compositor de ventanas de su sistema operativo, el controlador de pantalla y el canal del navegador comunican señales de alto rango dinámico. Sondea consultas de medios CSS nivel 4 (rango dinámico: alto), amplia gama de colores (Rec.2020 / Display-P3), buffers de color Canvas P3, objetivos de renderizado de punto flotante WebGL y códecs de video HDR de 10 bits acelerados por hardware.",
    "whatToLookFor": [
      {
        "label": "Estado de la señal HDR del compositor",
        "description": "Confirma si el compositor de ventanas del sistema operativo envía una señal HDR al navegador. Si está inactivo, HDR está deshabilitado en la configuración de Windows o macOS."
      },
      {
        "label": "Profundidad de bits y canalización del búfer",
        "description": "Detecta la profundidad de color de la pantalla informada (SDR de 24 bits frente a HDR de 30 bits o más) y comprueba si HTML5 Canvas y WebGL2 pueden asignar buffers de color flotantes y P3."
      },
      {
        "label": "Amplia gama de colores (Rec.2020 y P3)",
        "description": "Evalúa si su monitor informa un volumen de color extendido más allá del sRGB estándar, desbloqueando rojos carmesí intensos y verdes esmeralda intensos."
      },
      {
        "label": "Aceleración del códec de vídeo HDR",
        "description": "Compatibilidad con decodificación de hardware de sondas para HDR10 (HEVC Main 10), AV1 de 10 bits (YouTube HDR) y VP9 Profile 2."
      }
    ],
    "canObserve": [
      "Estado de salida HDR del compositor del sistema operativo en tiempo real",
      "Compatibilidad de hardware y navegador con las gamas de colores Display-P3 y Rec.2020",
      "Profundidad de color del búfer de pantalla accesible por navegador y compatibilidad con búfer de punto flotante",
      "Capacidad de reproducción de códec de vídeo de 10 bits acelerado por hardware"
    ],
    "cannotMeasure": [
      "Luminancia máxima del panel físico (nits) sin colorímetro de hardware",
      "Cumplimiento de la certificación VESA DisplayHDR (por ejemplo, DisplayHDR 400 vs 600 vs 1000)",
      "Recuento físico de zonas de atenuación local en retroiluminación Mini-LED"
    ],
    "interpretation": "Si el rango dinámico informa estándar (inactivo), presione Win + Alt + B en Windows o habilite HDR en Configuración del sistema en macOS. Si los códecs de vídeo de 10 bits informan de decodificación de software, verifique que la aceleración de hardware esté activada en su navegador.",
    "nextSteps": {
      "text": "¿Quiere inspeccionar el recorte físico de las luces, las curvas de tono y los picos de liendres? Ejecute nuestra prueba óptica complementaria.",
      "actionLabel": "Inicie la inspección visual HDR",
      "actionHref": "/tests/hdr-test"
    }
  },
  "hdr-test": {
    "overview": "La prueba de calibración visual e inspección de luces HDR proporciona patrones ópticos controlados para evaluar cómo responde físicamente su panel de visualización al contenido HDR. Prueba puntos de recorte de luces especulares, atenuación del mapeo de tonos, capacidad de ráfaga de luminancia máxima APL del 10%, rampas de curva de tono PQ/EOTF y detalles de sombras casi negras.",
    "whatToLookFor": [
      {
        "label": "Recorte y reducción de luces especulares",
        "description": "Inspeccione las muestras de luces altas del 90% al 100% de Peak White. Los objetivos de retícula circular concéntrica deben permanecer distinguibles sin mezclarse con un blanco apagado."
      },
      {
        "label": "10% de ráfaga de luminancia máxima APL",
        "description": "Una ventana estándar del 10% sobre un fondo completamente negro prueba el máximo margen de nit de su pantalla, la agresividad de la atenuación local y el florecimiento del halo."
      },
      {
        "label": "Gradación de la curva de tono PQ/EOTF",
        "description": "Compara gradientes suaves de 10 bits con rampas cuantificadas de 8 bits para exponer artefactos de bandas y una compresión agresiva de mapeo de tonos."
      },
      {
        "label": "Detalle de sombra casi negra (Black Crush)",
        "description": "Verifica si los escalones oscuros de baja luminosidad (del 0,5 % al 5 %) se mantienen distintos del negro verdadero del 0 % sin pisos negros elevados y embarrados."
      }
    ],
    "canObserve": [
      "Punto de recorte de resaltado especular a través de niveles escalonados de luminancia blanca",
      "Florecimiento de atenuación local y margen de brillo máximo en la ventana de 10% APL",
      "Suavidad de las transiciones tonales de 10 bits frente a las bandas de cuantificación de 8 bits",
      "Separación de detalles de sombras casi negras y comportamiento de aplastamiento de negros"
    ],
    "cannotMeasure": [
      "Luminancia máxima fotométrica exacta en nits (cd/m²) sin sensores de laboratorio",
      "Precisión de la temperatura de color (Kelvin) sin espectrofotómetro",
      "Tiempo de respuesta del panel o exceso de píxeles"
    ],
    "interpretation": "Las pantallas con un mapeo de tonos HDR deficiente recortarán las luces prematuramente por encima del 94% o aplastarán los detalles de las sombras casi negras en un negro sólido. Los paneles OLED y Mini-LED premium mantienen las retículas de luces hasta en un 99 % y preservan los sutiles pasos de sombra.",
    "nextSteps": {
      "text": "¿Necesita verificar si el compositor de su sistema operativo y los códecs de video son compatibles con HDR? Verifique el detector de hardware.",
      "actionLabel": "Verifique el hardware y la señal HDR",
      "actionHref": "/tests/hdr-capability-test"
    }
  },
  "strobe-crosstalk-test": {
    "overview": "La luz de fondo estroboscópica (ULMB, DyAc, ELMB, LightBoost) elimina el desenfoque del movimiento del seguimiento ocular al encender la luz de fondo solo cuando los cristales líquidos han terminado de realizar la transición. Sin embargo, debido a que las pantallas escanean los píxeles de arriba a abajo mientras las luces de fondo parpadean globalmente en toda la pantalla, las transiciones de píxeles en la parte superior o inferior pueden estar incompletas cuando se activa el pulso. Esta discrepancia de tiempo crea imágenes fantasma duplicadas conocidas como diafonía estroboscópica.",
    "whatToLookFor": [
      {
        "label": "Siluetas de doble imagen",
        "description": "Observe las barras en movimiento en las pistas superior, central e inferior. Observe si ve una sola barra nítida o un débil fantasma duplicado siguiéndola o preparándola."
      },
      {
        "label": "Claridad superior versus central versus inferior",
        "description": "La mayoría de los monitores optimizan la fase estroboscópica para el centro de la pantalla. La zona central debe mostrar movimiento nítido de una sola imagen, mientras que las zonas superior e inferior suelen mostrar distintos grados de diafonía."
      },
      {
        "label": "Ancho y brillo del pulso estroboscópico",
        "description": "Los pulsos estroboscópicos más cortos producen un movimiento más nítido pero un brillo general de la pantalla más bajo. Ajuste el ciclo de trabajo del estroboscópico de su monitor en su OSD para equilibrar la claridad y la luminancia."
      }
    ],
    "canObserve": [
      "Visibilidad relativa de diafonía estroboscópica en las zonas verticales de la pantalla.",
      "Identificación del punto óptimo de calibración de fase estroboscópica en su panel",
      "Comparación de la reducción del desenfoque de movimiento a distintas velocidades de panorámica"
    ],
    "cannotMeasure": [
      "Duración exacta del flash estroboscópico de retroiluminación en microsegundos",
      "Pico de luminancia estroboscópica fotométrica en nits sin fotodiodo",
      "Velocidad de escaneo del panel de hardware e intervalo de tiempo VSYNC"
    ],
    "interpretation": "Una pequeña cantidad de interferencias estroboscópicas en los bordes superior e inferior es normal en los monitores LCD. Una diafonía intensa en la zona central indica una fase estroboscópica no coincidente o una desincronización de la frecuencia de actualización.",
    "nextSteps": {
      "text": "Compare el movimiento estroboscópico con el desenfoque de movimiento nativo de muestreo y retención.",
      "actionLabel": "Ejecutar prueba de desenfoque de movimiento",
      "actionHref": "/tests/motion-blur-test"
    }
  },
  "vrr-flicker-test": {
    "overview": "La frecuencia de actualización variable (VRR / G-Sync / FreeSync) hace coincidir dinámicamente la frecuencia de actualización de la pantalla con la salida de renderizado de la GPU. Sin embargo, la relajación del cristal líquido y las curvas de luminancia de los píxeles OLED varían según la duración del ciclo de actualización. Cuando las velocidades de fotogramas oscilan rápidamente, especialmente entre FPS altos y umbrales de límites más bajos, las curvas de luminancia cambian dinámicamente, produciendo un parpadeo de brillo notable en áreas oscuras y casi negras.",
    "whatToLookFor": [
      {
        "label": "Bombeo de brillo casi negro",
        "description": "Observe los parches de 10% casi negros y 25% de gris oscuro a medida que avanza el ciclo de barrido de velocidad de fotogramas automatizado. Busque pulsaciones rítmicas sutiles en la oscuridad general."
      },
      {
        "label": "Sacudida de transición LFC (compensación de baja velocidad de fotogramas)",
        "description": "Cuando la velocidad de cuadros cae por debajo del umbral mínimo de VRR (por ejemplo, por debajo de 48 Hz), los controladores de gráficos presentan una presentación de cuadro doble (LFC). Este rápido cambio de Hz puede provocar un parpadeo momentáneo de luminancia."
      },
      {
        "label": "Cambio de gama OLED",
        "description": "Las pantallas OLED son particularmente propensas al parpadeo gamma VRR porque los tiempos de carga de los subpíxeles dependen en gran medida de la longitud del fotograma. Las texturas de las escenas oscuras pueden parpadear visiblemente durante las caídas de la velocidad de fotogramas."
      }
    ],
    "canObserve": [
      "Identificación visual de cambios en la curva gamma a través de niveles de luminancia de color gris oscuro",
      "Detección de bombeo de brillo durante la oscilación de velocidad de fotogramas simulada",
      "Comparación entre la sensibilidad al parpadeo del gris sutil de tonos medios y la sensibilidad al parpadeo casi negro"
    ],
    "cannotMeasure": [
      "Paquetes de temporización de sincronización adaptativa de GPU a pantalla de hardware",
      "Fluctuaciones exactas de voltaje de subpíxeles OLED en milivoltios",
      "Detección automática sin evaluación visual del usuario"
    ],
    "interpretation": "Si observa fuertes pulsaciones de brillo, su pantalla tiene curvas gamma VRR sensibles. Limite su velocidad de fotogramas ligeramente por debajo de la frecuencia de actualización máxima o desactive VRR en juegos con tiempos de fotogramas inestables para evitar el parpadeo.",
    "nextSteps": {
      "text": "Verifique el rango y la compatibilidad con la frecuencia de actualización variable de su pantalla.",
      "actionLabel": "Ejecute la prueba de capacidad de VRR",
      "actionHref": "/tests/vrr-test"
    }
  },
  "pursuit-camera-test": {
    "overview": "Los ojos humanos siguen los objetos en movimiento en la pantalla con un movimiento de persecución suave y continuo. Las fotografías de cámaras fijas estándar no pueden capturar el desenfoque de movimiento real porque no se mueven con el ojo. Una cámara de seguimiento rastrea el patrón de movimiento a una velocidad exacta, lo que permite la captura fotográfica del tiempo de respuesta de imagen en movimiento (MPRT) percibido real y la mancha fantasma.",
    "whatToLookFor": [
      {
        "label": "Alineación de graduación temporal",
        "description": "La pista superior contiene marcas de graduación blancas verticales. Al realizar un seguimiento fluido con su cámara o teléfono, estas marcas se fusionarán en una única línea vertical nítida en su foto."
      },
      {
        "label": "Artefactos fantasmas y rastreros",
        "description": "Una vez que se verifica la sincronización del seguimiento mediante marcas verticales nítidas, examine el borde posterior del objeto en movimiento para ver la decadencia del fósforo, las coronas sobrecargadas o los rastros fantasma."
      },
      {
        "label": "Sobremarcha Sobreimpulso (Coronas)",
        "description": "Un contorno brillante que se arrastra detrás del objeto en movimiento indica una sobrecarga excesiva de píxeles del monitor (efecto fantasma inverso)."
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
    "interpretation": "Cuando las marcas de graduación temporal forman una línea vertical limpia en su exposición, el seguimiento se sincronizó. El ancho de la mancha que se arrastra sobre el objeto refleja el verdadero desenfoque de movimiento MPRT de la pantalla.",
    "nextSteps": {
      "text": "Compare el rendimiento del movimiento en diferentes configuraciones de overdrive en el OSD de su monitor.",
      "actionLabel": "Ejecutar prueba de imagen fantasma",
      "actionHref": "/tests/ghosting-test"
    }
  },
  "audio-sync-test": {
    "overview": "El procesamiento visual moderno (escalado de cuadros, mapeo de tonos dinámicos HDR y suavizado de movimiento) introduce latencia de video. Mientras tanto, las barras de sonido, los receptores AV y los dispositivos de audio Bluetooth (buffers de códec A2DP) introducen latencia de audio. Si el vídeo y el audio divergen en más de los umbrales de percepción del UIT-R (+45 ms a -125 ms), la sincronización de labios del habla se vuelve notablemente desarticulada.",
    "whatToLookFor": [
      {
        "label": "Parpadeo y pitido simultáneos",
        "description": "Observe cómo la aguja giratoria pasa la marca cero superior de las 12 en punto. El destello visual blanco/verde instantáneo debe alinearse perfectamente con el pulso audible de 1 kHz."
      },
      {
        "label": "Vídeo líder de audio (compensación negativa)",
        "description": "Si escucha el pitido antes de ver el destello visual, la pantalla está retrasada con respecto al audio. Es necesario retrasar el audio."
      },
      {
        "label": "Audio principal de vídeo (compensación positiva)",
        "description": "Si ve el destello antes de escuchar el pitido, el procesamiento de audio (por ejemplo, retraso de Bluetooth o procesamiento de la barra de sonido) se retrasa en relación con la pantalla."
      }
    ],
    "canObserve": [
      "Sincronización perceptiva humana entre destellos visuales ópticos y pulsos acústicos.",
      "Medición del desplazamiento de compensación de milisegundos requerido (+/- 200 ms)",
      "Verificación del canal de salida de audio mediante Web Audio API Pulsos sintetizados de 1 kHz"
    ],
    "cannotMeasure": [
      "Tiempos de llegada de ondas sonoras acústicas eléctricas de hardware con precisión de laboratorio de microsegundos",
      "Bucle de retroalimentación acústica del micrófono sin autorización de entrada de audio",
      "Retrasos en la retransmisión de paquetes Bluetooth en el nivel del controlador del sistema operativo"
    ],
    "interpretation": "La alineación perceptiva de sincronización de labios dentro de +/- 20 ms se considera excelente e imperceptible para el público humano. Las latencias superiores a 50 ms deben corregirse utilizando la configuración de retardo de audio en su barra de sonido o reproductor multimedia.",
    "nextSteps": {
      "text": "Pruebe sus parlantes para determinar la separación de canales estéreo y el rango de frecuencia.",
      "actionLabel": "Ejecutar prueba de altavoz",
      "actionHref": "/tests/speaker-test"
    }
  },
  "gamepad-test": {
    "overview": "Los controladores de juegos utilizan potenciómetros analógicos o sensores magnéticos de efecto Hall para traducir el movimiento del joystick en coordenadas direccionales. Con el tiempo, el desgaste interno del limpiador de carbono, la degradación de los resortes y la contaminación por polvo hacen que la palanca registre coordenadas descentradas cuando permanece intacta, un defecto conocido como deriva de la palanca.",
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
      "text": "Pruebe la latencia de entrada de su pantalla y su tiempo de reacción personal.",
      "actionLabel": "Ejecutar prueba de tiempo de reacción",
      "actionHref": "/tests/reaction-time-test"
    }
  },
  "battery-test": {
    "overview": "El inspector de estado de energía y estado de la batería lee las métricas de la batería utilizando la API de estado de la batería del W3C. Proporciona visibilidad en tiempo real del nivel de carga de la batería de su dispositivo, el estado de carga, el tiempo de carga estimado y la resistencia de descarga.",
    "whatToLookFor": [
      {
        "label": "Nivel de carga en tiempo real",
        "description": "Supervisa el porcentaje de batería actual informado por el subsistema de energía del sistema operativo."
      },
      {
        "label": "Estado de conexión del adaptador de CA",
        "description": "Identifica si su dispositivo está consumiendo activamente energía de pared de CA o funcionando con reservas de batería de CC internas."
      },
      {
        "label": "Tiempo de carga y descarga",
        "description": "Calcula la duración estimada necesaria para alcanzar el 100 % de la capacidad o el tiempo restante hasta que se agote el sistema."
      },
      {
        "label": "Historial de pendiente de descarga",
        "description": "Realiza un seguimiento del consumo de energía en cargas de trabajo de pantalla activa para identificar un consumo elevado de batería."
      }
    ],
    "canObserve": [
      "Porcentaje de batería en tiempo real informado por la administración de energía del sistema operativo",
      "Transiciones de estado de carga versus descarga a través de eventos de cambio de nivel y cambio de carga",
      "Segundos estimados restantes hasta la carga completa o descarga completa",
      "Tendencias históricas del nivel de carga durante la sesión activa"
    ],
    "cannotMeasure": [
      "Degradación física de la capacidad química de miliamperios hora (mAh) sin herramientas de diagnóstico de raíz",
      "Temperatura, impedancia o recuento de ciclos de la batería interna",
      "Métricas del estado de la batería en navegadores que restringen la API de la batería por motivos de privacidad (por ejemplo, Firefox/Safari)"
    ],
    "interpretation": "Si su navegador informa que las métricas de la batería no son compatibles, el proveedor de su navegador ha restringido la API para mitigar las huellas digitales. Cuando es compatible, una rápida caída en el porcentaje bajo pruebas de pantalla luminosa indica envejecimiento de la batería.",
    "nextSteps": {
      "text": "¿Quiere comprobar el rendimiento de la red y la conexión de su sistema?",
      "actionLabel": "Iniciar prueba de velocidad de red",
      "actionHref": "/tests/network-speed-test"
    }
  },
  "network-speed-test": {
    "overview": "La prueba de velocidad y latencia de la red evalúa la latencia de ping, la fluctuación, el tipo de conexión y el rendimiento de descarga de su conexión a Internet directamente a través del canal de su navegador utilizando API de temporización y la API de información de red.",
    "whatToLookFor": [
      {
        "label": "Latencia de ping (RTT)",
        "description": "Mide el tiempo de ida y vuelta en milisegundos para los paquetes que viajan desde su navegador al servidor de prueba."
      },
      {
        "label": "Rendimiento de descarga (Mbps)",
        "description": "Calcula el ancho de banda sostenido máximo al transmitir paquetes de carga útil de alta resolución."
      },
      {
        "label": "Perfil y tipo de conexión",
        "description": "Detecta el tipo de conexión efectiva reportada (4g, wifi, ethernet) y el límite máximo de enlace descendente."
      },
      {
        "label": "Estabilidad y fluctuación de la conexión",
        "description": "Observa la variación entre ráfagas de ping sucesivas para identificar la cola de paquetes o la sobrecarga del búfer."
      }
    ],
    "canObserve": [
      "Tiempo de ida y vuelta (RTT) de ida y vuelta de solicitud-respuesta HTTP/HTTPS en milisegundos",
      "Clase de velocidad de conexión efectiva a través de navigator.connection",
      "Rendimiento de descarga calculado a través de bytes de flujo de recuperación divididos por el tiempo de transferencia",
      "Estado del indicador de ahorro de datos informado por el agente de usuario"
    ],
    "cannotMeasure": [
      "Sincronización directa de sockets TCP sin procesar sin sobrecarga de pila HTTP del navegador",
      "Atenuación de línea física del ISP, márgenes SNR o niveles de potencia de fibra óptica",
      "Interferencia del canal de radiofrecuencia Wi-Fi local"
    ],
    "interpretation": "Las latencias inferiores a 30 ms son ideales para juegos competitivos en línea y transmisión de pantalla en la nube. Las velocidades superiores a 50 Mbps garantizan una transmisión 4K HDR sin búfer.",
    "nextSteps": {
      "text": "Pruebe si su canal de visualización y gráficos introduce latencia de clic a fotón.",
      "actionLabel": "Iniciar la prueba de retraso de entrada",
      "actionHref": "/tests/input-lag-test"
    }
  },
  "color-blindness-test": {
    "overview": "El Simulador de daltonismo aplica filtros de matriz de color SVG calibrados matemáticamente para emular 8 tipos distintos de deficiencia de visión del color (CVD). Permite a los desarrolladores y diseñadores evaluar la legibilidad de la interfaz de usuario, las relaciones de contraste y la accesibilidad a la información codificada por colores.",
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
      "Comparación lado a lado de la visión tricromática normal frente a la deficiencia de color simulada",
      "Degradación del contraste entre los indicadores clave de estado de la interfaz de usuario (verde de éxito frente a rojo de error)",
      "Legibilidad del texto contra los tonos de fondo bajo cada variante de visión del color."
    ],
    "cannotMeasure": [
      "Diagnóstico clínico de la capacidad genética de visión del color del usuario humano (p. ej., prueba Farnsworth-Munsell 100-Hue)",
      "Variaciones exactas de la sensibilidad retiniana de conos y bastones individuales",
      "Visualización física de picos de emisión espectral sin espectroradiómetro."
    ],
    "interpretation": "Si sus indicadores críticos de la interfaz de usuario (como alertas de error, gráficos o botones de acción principal) se vuelven indistinguibles en Deuteranopia o Protanopia, complemente las señales de color con íconos, tipografía en negrita y contornos de formas distintas para cumplir con las pautas WCAG 2.2.",
    "nextSteps": {
      "text": "Inspeccione la cobertura de la gama de colores física de su monitor en sRGB y DCI-P3.",
      "actionLabel": "Comprobar gama de colores",
      "actionHref": "/tests/color-gamut-test"
    }
  },
  "screen-recorder": {
    "overview": "La utilidad Screen Recorder & Screenshot utiliza Screen Capture API y MediaRecorder API para grabar pantallas de escritorio, ventanas de aplicaciones o pestañas del navegador, y capturar instantáneas PNG con precisión de píxeles directamente sin instalación de software.",
    "whatToLookFor": [
      {
        "label": "Resolución de transmisión de pantalla",
        "description": "Verifica si la pista de video capturada coincide con las dimensiones de píxeles del lienzo nativo de su monitor."
      },
      {
        "label": "Velocidad de fotogramas de captura",
        "description": "Supervisa la suavidad de la velocidad de fotogramas y la duración de la grabación en tiempo real."
      },
      {
        "label": "Integración de pistas de audio",
        "description": "Captura audio del sistema opcional o audio de pestañas junto con la secuencia de visualización."
      },
      {
        "label": "Calidad de instantánea PNG sin pérdidas",
        "description": "Captura búferes instantáneos de mapas de bits de un solo cuadro renderizados directamente en una imagen PNG lista para descargar."
      }
    ],
    "canObserve": [
      "Configuraciones de dimensiones, relación de aspecto y velocidad de fotogramas de la pista de transmisión de video",
      "Grabación del tiempo transcurrido, estados de pausa/reanudación y tamaño del blob de vídeo WebM generado",
      "Representación instantánea de fotogramas congelados en un lienzo HTML5 para exportación a PNG",
      "Concesiones de permisos del navegador para la captura de medios de visualización"
    ],
    "cannotMeasure": [
      "Latencia de codificación de GPU de hardware dentro de los codificadores de vídeo del sistema operativo",
      "Captura de contenido multimedia DRM protegido (Netflix, Disney+, etc. que generan pantallas negras)",
      "Sincronización de actualización del monitor físico sin escalado del búfer de captura"
    ],
    "interpretation": "Las grabaciones de pantalla se generan localmente en la memoria de su navegador y nunca se cargan en ningún servidor remoto, lo que preserva la privacidad absoluta para las pruebas de aplicaciones confidenciales.",
    "nextSteps": {
      "text": "¿Quiere probar la resolución de su cámara web y de su cámara frontal?",
      "actionLabel": "Iniciar prueba de cámara web",
      "actionHref": "/tests/webcam-test"
    }
  },
  "dark-mode-test": {
    "overview": "El inspector de compatibilidad de temas y modo oscuro evalúa la consulta de medios de combinación de colores preferida de su sistema, las propiedades de representación de combinaciones de colores CSS, los metaencabezados de colores de temas y las relaciones de contraste de los componentes en las paletas oscuras y claras.",
    "whatToLookFor": [
      {
        "label": "Sincronización de preferencias del sistema operativo",
        "description": "Prueba si su navegador detecta automáticamente cambios entre el modo oscuro o claro en Windows, macOS, Android o iOS."
      },
      {
        "label": "Soporte de combinación de colores CSS",
        "description": "Inspecciona las barras de desplazamiento del navegador nativo, los controles de formulario y las selecciones resaltadas en modo oscuro."
      },
      {
        "label": "Legibilidad del contraste de componentes",
        "description": "Evalúa las relaciones de contraste de texto, tarjetas, botones e insignias en ambos modos de color."
      },
      {
        "label": "Eficiencia OLED negra pura",
        "description": "Evalúa si las superficies en modo oscuro utilizan negro verdadero #000000 para maximizar el ahorro de batería en paneles OLED."
      }
    ],
    "canObserve": [
      "Estado en tiempo real de window.matchMedia('(prefiere-color-scheme: oscuro)')",
      "Compatibilidad del navegador con propiedades de esquema de color CSS nativo y controles de formulario del sistema",
      "Cambio de tema interactivo (Sistema, Claro, Oscuro) para una comparación visual instantánea",
      "Contraste y legibilidad de la tipografía en fichas de superficies claras y oscuras."
    ],
    "cannotMeasure": [
      "Ahorro de energía en miliamperios de subpíxeles OLED de hardware sin medición física",
      "Adaptación de la luz ambiental sin sensor de luz ambiental activo",
      "Cambios de color con reducción de luz azul de luz nocturna o f.lux"
    ],
    "interpretation": "Las pantallas modernas con retroiluminación OLED o Mini-LED ahorran energía sustancial al reproducir fondos oscuros reales, al tiempo que reducen la exposición a la luz azul en ambientes con poca luz.",
    "nextSteps": {
      "text": "Evalúe el brillo de su pantalla en relación con las condiciones de iluminación de la habitación.",
      "actionLabel": "Iniciar prueba de luz ambiental",
      "actionHref": "/tests/ambient-light-test"
    }
  },
  "input-lag-test": {
    "overview": "El visualizador de retraso de entrada proporciona un punto de referencia estadístico de reacción de 10 pruebas y latencia de canalización. Mide el delta entre un estímulo visual aleatorio y el registro del clic del mouse o la actuación del teclado, gráficando el promedio, la desviación estándar y un histograma de distribución de respuesta.",
    "whatToLookFor": [
      {
        "label": "Tiempo de reacción del estímulo visual",
        "description": "Mide los milisegundos transcurridos desde el cuadro exacto del cambio de color hasta el clic del puntero."
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
      "Marcas de tiempo de milisegundos de alta resolución a través de performance.now() desde la representación del estímulo hasta el envío del evento",
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
      "text": "Verifique la frecuencia de actualización del hardware real de su pantalla y el ritmo de entrega de fotogramas.",
      "actionLabel": "Iniciar prueba de frecuencia de actualización",
      "actionHref": "/tests/refresh-rate-test"
    }
  },
  "ambient-light-test": {
    "overview": "El inspector del sensor de luz ambiental lee los niveles de iluminancia en lux (lx) utilizando la API AmbientLightSensor. Evalúa las condiciones de iluminación de la habitación, proporciona recomendaciones ergonómicas de brillo de la pantalla y representa gráficamente las fluctuaciones de la luz a lo largo del tiempo.",
    "whatToLookFor": [
      {
        "label": "Iluminancia Lux en tiempo real",
        "description": "Supervisa la intensidad de la luz ambiental en lux capturada por fotodetectores de dispositivos integrados."
      },
      {
        "label": "Consejos de brillo ergonómico",
        "description": "Recomienda niveles óptimos del control deslizante de nit/brillo del monitor para las condiciones actuales de su habitación."
      },
      {
        "label": "Advertencia de riesgo de deslumbramiento",
        "description": "Identifica si una iluminación ambiental intensa (> 1000 lx) requiere sombreado antideslumbrante o brillo máximo."
      },
      {
        "label": "Estabilidad de la iluminación ambiental",
        "description": "Realiza un seguimiento de los cambios de iluminación de la habitación a lo largo del tiempo para identificar bombillas parpadeantes o cambios de luz natural."
      }
    ],
    "canObserve": [
      "Valores de iluminancia ambiental en tiempo real en lux de fotodetectores de hardware",
      "Categorización de zonas de iluminación (Totalmente oscuro, Habitación tenue, Oficina, Interiores luminosos, Luz natural)",
      "Porcentaje de brillo de pantalla recomendado según las pautas de ergonomía ISO",
      "Gráfico histórico de niveles de luz durante la sesión activa."
    ],
    "cannotMeasure": [
      "Lecturas de luz ambiental en navegadores o sistemas operativos que carecen de compatibilidad con API de sensor genérico",
      "Temperatura de color (Kelvin) o clasificación CRI de la iluminación de la habitación sin un sensor ambiental RGB",
      "Ángulos del vector de deslumbramiento direccional que inciden en la superficie del panel"
    ],
    "interpretation": "Para una lectura cómoda sin fatiga visual, un entorno de oficina debe oscilar entre 300 lux y 500 lux con el brillo de la pantalla configurado en aproximadamente 120-150 nits. Los valores inferiores a 50 lx requieren reducir el brillo de la pantalla para minimizar la fatiga.",
    "nextSteps": {
      "text": "Calibre el brillo de la pantalla y el umbral del nivel de negro.",
      "actionLabel": "Iniciar prueba de brillo",
      "actionHref": "/tests/brightness-test"
    }
  },
  "dpi-calculator": {
    "overview": "La calculadora de DPI y PPI calcula la densidad de píxeles, el tamaño de subpíxeles, el total de megapíxeles y las distancias de umbral visual Retina definidas por Apple en función de las especificaciones de resolución de píxeles y diagonal de la pantalla física.",
    "whatToLookFor": [
      {
        "label": "Píxeles por pulgada (PPI)",
        "description": "Mide la densidad espacial de píxeles en la diagonal del panel de visualización."
      },
      {
        "label": "Paso de puntos (espaciado de píxeles)",
        "description": "Calcula la distancia física entre centros de subpíxeles adyacentes en milímetros."
      },
      {
        "label": "Distancia de visualización de la retina",
        "description": "Determina la distancia exacta donde la agudeza visual humana 20/20 ya no puede distinguir píxeles individuales (60 PPD)."
      },
      {
        "label": "Relación de aspecto y megapíxeles",
        "description": "Calcula el área de superficie del panel, las proporciones de relación de aspecto y el total de millones de píxeles renderizados."
      }
    ],
    "canObserve": [
      "PPI calculado, tamaño de punto en milímetros y recuento total de megapíxeles",
      "Distancias de visualización óptimas del umbral visual ergonómico y de retina en pulgadas y centímetros",
      "Selección instantánea de ajustes preestablecidos para monitores estándar (24\" 1080p, 27\" 1440p, 32\" 4K, MacBook Pro de 16\")",
      "Resolución interactiva y entradas de control deslizante diagonal"
    ],
    "cannotMeasure": [
      "Medición de cinta física del bisel de plástico exterior de su monitor sin intervención del usuario",
      "La nitidez de la representación de subpíxeles ópticos se ve afectada por los revestimientos antirreflejos mate",
      "Distorsión anamórfica de relación de aspecto no estándar sin dimensiones exactas"
    ],
    "interpretation": "Una densidad de píxeles superior a 110 PPI proporciona una cómoda claridad de texto en el escritorio sin escalas agresivas, mientras que las densidades superiores a 220 PPI logran una verdadera claridad Retina a distancias típicas de escritorio (50 a 60 cm).",
    "nextSteps": {
      "text": "Verifique la nitidez de la fuente y la representación de subpíxeles en diferentes tamaños de texto.",
      "actionLabel": "Iniciar prueba de claridad de texto",
      "actionHref": "/tests/text-clarity-test"
    }
  },
  "subpixel-layout-test": {
    "overview": "Las pruebas de diseño de subpíxeles analizan la geometría física microscópica de las tiras emisoras rojas, verdes y azules dentro de cada píxel. Las variaciones entre los diseños RGB estándar, BGR invertido, QD-OLED triangular y WOLED determinan directamente si el antialiasing de texto del sistema operativo (como Windows ClearType) aparece nítido o presenta halos de color magenta/verde.",
    "whatToLookFor": [
      {
        "label": "Estructura de geometría de subpíxeles",
        "description": "Identifica si su panel utiliza franjas verticales RGB estándar, franjas BGR o subpíxeles triangulares no estándar."
      },
      {
        "label": "Bordes de texto de alto contraste",
        "description": "Inspecciona el texto negro sobre blanco y blanco sobre negro en busca de halos de colores (verde arriba, magenta abajo)."
      },
      {
        "label": "Alineación de cuadrícula de 1px",
        "description": "Verifica si las líneas alternas de 1 píxel se representan como un gris completamente neutro sin artefactos de color."
      },
      {
        "label": "Calibración de antialiasing ClearType",
        "description": "Evalúa si la ejecución de Windows cttune o el suavizado de fuentes elimina la decoloración de los bordes."
      }
    ],
    "canObserve": [
      "Artefactos de franjas de color representados en fuentes serif, sans-serif y monoespaciadas de alto contraste",
      "Alineación de subpíxeles contra rejillas de líneas verticales y horizontales alternas de 1 píxel calibradas",
      "Simulación visual de estructuras de emisión de subpíxeles en 6 arquitecturas de paneles principales"
    ],
    "cannotMeasure": [
      "Verificación óptica con microscopio físico de la geometría del emisor de silicio submilimétrico",
      "Configuración de registro directo del rasterizador de fuentes del sistema operativo host",
      "Interpolación de subpíxeles del escalador de hardware dentro de tarjetas de captura de video externas"
    ],
    "interpretation": "Si el texto muestra bordes verdes o magenta tenues en una pantalla de 1440p o 4K, es probable que su pantalla tenga un diseño de subpíxeles BGR o QD-OLED. Ejecutar Windows ClearType Tuner o cambiar a antialiasing en escala de grises resolverá los bordes.",
    "nextSteps": {
      "text": "¿Quiere inspeccionar la nitidez general de la pantalla y la escala de resolución?",
      "actionLabel": "Iniciar prueba de claridad de texto",
      "actionHref": "/tests/text-clarity-test"
    }
  },
  "pwm-flicker-test": {
    "overview": "La modulación de ancho de pulso (PWM) es una técnica de atenuación utilizada por ciertas luces de fondo LCD y paneles OLED que enciende y apaga rápidamente la fuente de luz para lograr un brillo más bajo. Si bien es invisible a simple vista en altas frecuencias, el PWM de baja frecuencia (120 Hz a 480 Hz) provoca fatiga visual intensa, ojos secos, dolores de cabeza y migrañas.",
    "whatToLookFor": [
      {
        "label": "Perlas fantasma estroboscópicas",
        "description": "Mover los ojos o agitar un objeto frente a la pantalla rompe las líneas en movimiento en distintas cuentas fantasmas si hay PWM presente."
      },
      {
        "label": "Líneas de escaneo del obturador del teléfono inteligente",
        "description": "El uso de la cámara de un teléfono a 1/1000 o más rápido revela bandas horizontales de desplazamiento oscuro causadas por la modulación del ciclo de trabajo."
      },
      {
        "label": "Umbral de brillo sin parpadeos",
        "description": "Identifica en qué porcentaje de brillo OSD del monitor la pantalla cambia de atenuación de CC a PWM."
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
    "interpretation": "Las pantallas certificadas como \"sin parpadeo\" o \"TÜV Eye Comfort\" utilizan corriente directa (CC) continua para atenuar el brillo hasta un 0 %. Si ve rastros de cuentas fantasma, su panel utiliza atenuación PWM en configuraciones de brillo bajo.",
    "nextSteps": {
      "text": "¿Quiere probar las fluctuaciones de luminancia VRR de alta frecuencia?",
      "actionLabel": "Inicie la prueba de parpadeo VRR",
      "actionHref": "/tests/vrr-flicker-test"
    }
  },
  "dead-pixel-mapper": {
    "overview": "Dead Pixel RMA Coordinate Mapper es una herramienta de inspección interactiva diseñada para documentar píxeles de paneles defectuosos. Permite a los compradores identificar las coordenadas de los píxeles defectuosos, clasificar los defectos por tipo, calcular la elegibilidad de la garantía ISO 9241-307 y exportar registros formales de inspección RMA para reclamos de reemplazo del fabricante.",
    "whatToLookFor": [
      {
        "label": "Píxeles muertos (oscuros)",
        "description": "Tríadas de subpíxeles permanentemente desconectadas que permanecen completamente negras contra pantallas blancas, cian y amarillas."
      },
      {
        "label": "Subpíxeles atascados (brillantes)",
        "description": "Subpíxeles bloqueados en un estado abierto, brillando en rojo, verde, azul o blanco sobre fondos negros puros."
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
      "Coordenadas de pantalla exactas (X, Y) de los puntos defectuosos registrados en 9 fondos de prueba sólidos",
      "Cálculo de la agrupación de defectos de la zona central versus la zona periférica",
      "Cumplimiento de devolución de garantía ISO 9241-307 Clase 1 y Clase 2"
    ],
    "cannotMeasure": [
      "Detección algorítmica automática de defectos sin inspección visual manual del usuario",
      "Polvo de vidrio subterráneo versus falla real del transistor TFT sin aumento óptico",
      "Continuidad eléctrica interna del IC del controlador del panel"
    ],
    "interpretation": "La mayoría de los principales fabricantes de monitores (Dell, LG, ASUS, Samsung) cumplen con la norma ISO 9241-307 Clase 2, que permite hasta 2 píxeles muertos completos o 5 subpíxeles atascados por millón. Las pantallas profesionales y de juegos premium a menudo cuentan con cobertura Zero Bright Dot (Clase 1).",
    "nextSteps": {
      "text": "¿Se han atascado subpíxeles que permanecen encendidos? Intente revivirlos con nuestro ejercitador de alta velocidad.",
      "actionLabel": "Inicie el reparador de píxeles atascados",
      "actionHref": "/tests/stuck-pixel-fixer"
    }
  },
  "gtg-response-time-test": {
    "overview": "El tiempo de respuesta de gris a gris (GtG) mide el tiempo necesario para que un píxel de cristal líquido pase de un nivel de gris intermedio arbitrario a otro. Si bien los fabricantes anuncian GtG de 1 ms o 0,5 ms, las transiciones en el mundo real varían significativamente y las configuraciones de overdrive agresivas a menudo causan un efecto fantasma inverso severo (sobreimpulso).",
    "whatToLookFor": [
      {
        "label": "Manchas negras del panel VA",
        "description": "Inspecciona las transiciones de 0 % de negro puro a 20 % de gris oscuro, donde los cristales líquidos VA son más lentos."
      },
      {
        "label": "Sobremarcha Sobreimpulso (Coronas)",
        "description": "Comprueba si hay halos invertidos de color blanco brillante u oscuros detrás de objetos en movimiento causados ​​por un voltaje de sobremarcha excesivo."
      },
      {
        "label": "Desenfoque inicial vs final",
        "description": "Compara el tiempo de subida (de oscuro a claro) con el tiempo de caída (de claro a oscuro) en objetivos en movimiento a alta velocidad."
      },
      {
        "label": "Equilibrio del modo Overdrive",
        "description": "Guía la selección del nivel de sobremarcha OSD óptimo (Apagado, Normal, Rápido, Extremo)."
      }
    ],
    "canObserve": [
      "Senderos visuales fantasma a través de valores de luminancia de grises iniciales y finales personalizables",
      "Simulación de sobreimpulso de corona de sobremarcha en niveles de sobremarcha de cristal líquido estándar",
      "Nitidez y claridad de los bordes de objetos en movimiento a través de niveles de velocidad calibrados"
    ],
    "cannotMeasure": [
      "Curvas de transición de osciloscopio de fotodiodo de submilisegundos (tiempo de subida del 10% al 90%)",
      "Valores de búsqueda de la tabla de voltaje de sobremarcha interna dentro del escalador de monitor ASIC",
      "Cambios en la viscosidad del cristal líquido que dependen de la temperatura"
    ],
    "interpretation": "Si los objetos en movimiento muestran un halo brillante o una silueta inversa, el OSD Overdrive de su monitor está configurado demasiado alto (\"Extremo\"). Volver a marcar a 'Rápido' o 'Normal' brindará una claridad de movimiento más limpia sin artefactos de corona.",
    "nextSteps": {
      "text": "¿Quieres comparar la nitidez de los OVNIs en movimiento y el desenfoque persistente?",
      "actionLabel": "Lanzar prueba de imagen fantasma",
      "actionHref": "/tests/ghosting-test"
    }
  },
  "oled-burn-in-calculator": {
    "overview": "La Calculadora de longevidad y riesgo de quemado de OLED modela la degradación orgánica de subpíxeles de diodos emisores de luz según la generación de tecnología del panel, las horas de funcionamiento diarias, las relaciones de contenido de la interfaz estática y los niveles de luminancia típicos SDR/HDR. Proporciona un pronóstico actuarial de la vida útil del panel y puntos críticos de peligro estáticos del HUD.",
    "whatToLookFor": [
      {
        "label": "Resiliencia de la generación de paneles",
        "description": "Tiene en cuenta las diferencias entre los conjuntos de microlentes QD-OLED de primera generación, los modernos QD-OLED de tercera generación y WOLED MLA."
      },
      {
        "label": "Proporción de contenido estático",
        "description": "Calcula el estrés estático acumulativo de las barras de tareas de Windows, los encabezados del navegador y los HUD de juegos."
      },
      {
        "label": "Multiplicador de estrés de luminancia",
        "description": "Modela la aceleración exponencial del envejecimiento del material orgánico en liendres elevados y sostenidos."
      },
      {
        "label": "Impacto de los hábitos de mitigación",
        "description": "Evalúa el valor de protección del desplazamiento de píxeles, la barra de tareas oculta automáticamente, los atenuadores del logotipo y los tiempos de espera de la pantalla."
      }
    ],
    "canObserve": [
      "Estimación actuarial de las horas estáticas acumuladas antes de que se produzca un envejecimiento desigual de los subpíxeles",
      "Porcentajes de probabilidad de burn-in proyectados en horizontes de propiedad de 1 año, 3 años y 5 años",
      "Visualización de mapas de calor de peligros de regiones de interfaz estáticas de alto riesgo"
    ],
    "cannotMeasure": [
      "Degradación del voltaje físico de subpíxeles en tiempo real en su panel físico específico",
      "Temperatura ambiente de funcionamiento y eficiencia de disipación térmica del disipador térmico del chasis",
      "Datos de registro del ciclo de compensación interno de fábrica almacenados en la EEPROM del panel"
    ],
    "interpretation": "Los monitores OLED modernos con desplazamiento activo de píxeles, disipadores térmicos y barras de tareas ocultas automáticamente suelen lograr más de 5 años de productividad mixta diaria y juegos sin retención visible. El brillo SDR elevado y sostenido sobre fondos blancos estáticos acelera el envejecimiento.",
    "nextSteps": {
      "text": "¿Quiere inspeccionar su panel actual para detectar retención de imágenes estáticas existentes?",
      "actionLabel": "Iniciar la prueba de funcionamiento",
      "actionHref": "/tests/burn-in-test"
    }
  },
  "mouse-polling-test": {
    "overview": "La prueba de precisión del sensor y tasa de sondeo del mouse captura marcas de tiempo de eventos de hardware USB a través de temporizadores de navegador de alta precisión. Mide la frecuencia de sondeo máxima y en tiempo real en Hertz (hasta 8000 Hz), verifica la estabilidad del intervalo de paquetes (jitter), prueba la actuación del botón y diagnostica el rebote del doble clic del interruptor mecánico.",
    "whatToLookFor": [
      {
        "label": "Tasa de sondeo en tiempo real (Hz)",
        "description": "Mide la frecuencia real del informe de eventos USB (125 Hz, 500 Hz, 1000 Hz, 4000 Hz, 8000 Hz)."
      },
      {
        "label": "Jitter y estabilidad del intervalo",
        "description": "Comprueba la coherencia de los tiempos delta entre paquetes de movimiento (por ejemplo, 1,0 ms para 1000 Hz, 0,25 ms para 4000 Hz)."
      },
      {
        "label": "Chat mecánico de doble clic",
        "description": "Detecta intervalos de rebote de interruptores inferiores a 60 ms, lo que indica microinterruptores mecánicos desgastados."
      },
      {
        "label": "Calibración del sensor DPI",
        "description": "Verifica la distancia de arrastre físico en pulgadas frente al movimiento de píxeles de la pantalla registrado."
      }
    ],
    "canObserve": [
      "Frecuencia de eventos de movimiento del mouse USB reportada a través de marcas de tiempo de alta resolución performance.now()",
      "Tasas de sondeo máximas, promedio y en tiempo real en sesiones de movimiento continuo",
      "Recuentos de activación de clics de varios botones e intervalos de milisegundos entre clics"
    ],
    "cannotMeasure": [
      "Tasa de sondeo del bus USB de hardware cuando el mouse está estacionario (los sensores ópticos solo informan sobre el movimiento)",
      "Distancia de despegue del sensor (LOD) en milímetros físicos",
      "Tasa de sondeo directo del firmware de la MCU cuando los bucles de eventos del navegador se ven limitados por tareas pesadas en segundo plano"
    ],
    "interpretation": "Un mouse para juegos configurado a 1000 Hz debe mantener entre 950 Hz y 1000 Hz durante un movimiento rápido con deltas de intervalo de ~1,0 ms. Si los intervalos de clic inferiores a 50 ms se registran debido a depresiones físicas únicas, el interruptor del mouse sufre vibraciones de contacto.",
    "nextSteps": {
      "text": "¿Quieres probar tu velocidad de reacción visual y tu latencia de clics?",
      "actionLabel": "Lanzar prueba de tiempo de reacción",
      "actionHref": "/tests/reaction-time-test"
    }
  },
  "gpu-benchmark-test": {
    "overview": "GPU WebGL 3D Stress & Performance Benchmark representa complejos sistemas de partículas 3D en tiempo real y geometrías giratorias directamente en su navegador. Mide la velocidad de fotogramas sostenida, un 1 % de FPS bajo, la variación del tiempo de fotograma y las capacidades de hardware para identificar cuellos de botella de la GPU y limitación térmica bajo carga.",
    "whatToLookFor": [
      {
        "label": "FPS sostenido frente a Hz de pantalla",
        "description": "Evalúa si su GPU puede igualar consistentemente la frecuencia de actualización nativa de su monitor."
      },
      {
        "label": "1% de tartamudeo de FPS bajo",
        "description": "Realiza un seguimiento del 1 % inferior de los tiempos de fotograma para detectar micro tartamudeos y problemas de recursos en segundo plano."
      },
      {
        "label": "Variación del tiempo de fotograma (ms)",
        "description": "Supervisa la coherencia del ritmo de fotogramas (16,6 ms para 60 Hz, 6,9 ms para 144 Hz, 4,1 ms para 240 Hz)."
      },
      {
        "label": "Caída de estrangulamiento térmico",
        "description": "Identifica si las velocidades de fotogramas se degradan en el transcurso de una prueba de referencia sostenida de 30 segundos."
      }
    ],
    "canObserve": [
      "Rendimiento de renderizado 3D WebGL del lado del cliente entre 10.000 y 200.000 partículas activas",
      "Velocidad de fotogramas en tiempo real, FPS promedio, 1 % de velocidad de fotogramas baja y ritmo de fotogramas de milisegundos",
      "Cadena de renderizado de gráficos WebGL detectada, proveedor de GPU y dimensiones máximas de textura"
    ],
    "cannotMeasure": [
      "Temperatura física del núcleo de la GPU (°C) o RPM del ventilador sin utilidades de telemetría del sistema operativo nativo",
      "Consumo de energía de la placa GPU en vatios (TDP)",
      "Frecuencia de reloj de memoria VRAM o temperaturas de unión de memoria"
    ],
    "interpretation": "FPS promedio alto con FPS bajo 1% indica tartamudeo en el ritmo de fotogramas o contención de subprocesos de CPU en segundo plano. El ritmo de cuadro suave garantiza un movimiento receptivo y sin interrupciones en pantallas de juegos de alta actualización.",
    "nextSteps": {
      "text": "¿Quiere inspeccionar el ritmo de frecuencia de actualización en tiempo real de su monitor?",
      "actionLabel": "Iniciar prueba de frecuencia de actualización",
      "actionHref": "/tests/refresh-rate-test"
    }
  },
  "display-certificate": {
    "overview": "El Certificado de inspección de exhibición es una herramienta formal de documentación de calidad. Agrega parámetros de hardware detectados automáticamente (resolución nativa, profundidad de color, amplia gama, densidad de píxeles) con calificaciones de inspección visual manual para generar un informe de inspección certificado e imprimible para calificaciones de reventa o reclamos de garantía RMA del fabricante.",
    "whatToLookFor": [
      {
        "label": "Registro de especificaciones de hardware",
        "description": "Certifica la resolución nativa del panel, la profundidad de bits del color, la proporción de píxeles del dispositivo y la compatibilidad con una amplia gama de colores."
      },
      {
        "label": "Resumen de auditoría de defectos",
        "description": "Registra recuentos exactos de píxeles muertos, subpíxeles atascados y gravedad del sangrado de retroiluminación."
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
      "Precisión del color del espectrorradiómetro Verificación Delta E sin colorímetros de hardware externos"
    ],
    "interpretation": "Los certificados de inspección de pantallas brindan documentación confiable al comprar o vender monitores usados ​​o al presentar reclamos de devolución RMA durante los períodos de devolución del fabricante.",
    "nextSteps": {
      "text": "¿Necesita identificar las coordenadas de píxeles defectuosos antes de generar su certificado?",
      "actionLabel": "Inicie el mapeador de píxeles muertos",
      "actionHref": "/tools/dead-pixel-mapper"
    }
  },
  "osd-calibration-guide": {
    "overview": "El Asistente de calibración del monitor OSD interactivo es una guía visual para calibrar los botones físicos del hardware de visualización en pantalla (OSD) de su pantalla. Guía a los usuarios a través de 6 pasos esenciales: brillo, contraste, gamma 2.2, temperatura de color de 6500 K, nitidez y sobremarcha, sin necesidad de costosos colorímetros de hardware.",
    "whatToLookFor": [
      {
        "label": "Brillo (recorte negro)",
        "description": "Ajusta el brillo de OSD para que el parche n.° 16 sea apenas visible mientras que el parche n.° 0 permanezca negro como la tinta."
      },
      {
        "label": "Contraste (saturación de blancos)",
        "description": "Ajusta el contraste de OSD para que el parche casi blanco #253 permanezca distinguible del blanco puro #255."
      },
      {
        "label": "Mezcla óptica gamma 2.2",
        "description": "Alinea la luminancia de los medios tonos usando un patrón óptico donde el disco central se mezcla en 2,2."
      },
      {
        "label": "Temperatura de color (6500K D65)",
        "description": "Equilibra los controles deslizantes de ganancia rojo, verde y azul para lograr tonos blancos y grises limpios y neutros."
      }
    ],
    "canObserve": [
      "Objetivos de retroalimentación visual diseñados específicamente para rangos de ajuste OSD de monitores estándar",
      "Tableros de mezcla óptica que verifican la alineación de sRGB Gamma 2.2 sin sondas de calibración",
      "Texto de alto contraste y objetivos de bloques móviles para ajustar la nitidez y los niveles de sobremarcha"
    ],
    "cannotMeasure": [
      "Control directo del software sobre los botones OSD del monitor físico mediante el protocolo DDC/CI",
      "Temperatura de color exacta en Kelvin sin espectrofotómetro ni sonda de colorímetro",
      "Calibración interna de hardware LUT (Look-Up Table) dentro de monitores profesionales de gradación de color"
    ],
    "interpretation": "La configuración predeterminada de fábrica del monitor casi siempre está sobresaturada, demasiado brillante (100%) y demasiado fría (8000K+). Seguir esta guía de ajuste OSD de 6 pasos acercará significativamente su pantalla a los estándares internacionales de masterización sRGB/Rec.709.",
    "nextSteps": {
      "text": "¿Quiere verificar la cobertura de la gama de colores y la precisión de ColorChecker?",
      "actionLabel": "Iniciar la prueba de precisión del color",
      "actionHref": "/tests/color-accuracy-test"
    }
  },
  "bright-pixel-test": {
    "overview": "Los píxeles brillantes o calientes son subpíxeles (rojo, verde, azul o blanco) que permanecen atrapados en un estado iluminado o parcialmente energizado, visibles contra fondos negros puros y oscuros.",
    "whatToLookFor": [
      {
        "label": "Puntos de subpíxeles calientes",
        "description": "Pinchazos de color brillantes aislados visibles contra marcos oscuros en una habitación oscura."
      },
      {
        "label": "Resplandor cromático de subpíxeles",
        "description": "Los canales de subpíxeles rojos, verdes o azules individuales se quedan abiertos mientras los subpíxeles vecinos están apagados."
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
      "Aislamiento del canal de color en los marcos de prueba blancos y RGB primarios",
      "Relación de contraste entre los subpíxeles calientes y el lienzo circundante oscuro"
    ],
    "cannotMeasure": [
      "Corriente de fuga de puerta de transistor de silicio",
      "Profundidad del defecto físico del cristal de silicio debajo del sustrato de vidrio",
      "Características de deriva térmica del panel posterior"
    ],
    "interpretation": "Las pantallas ISO 9241-307 Clase 1 no permiten píxeles brillantes, mientras que los paneles Clase 2 normalmente permiten hasta 2 píxeles permanentemente brillantes por millón.",
    "nextSteps": {
      "text": "¿Has localizado un subpíxel atascado? Intente una estimulación visual rápida para despegarlo.",
      "actionLabel": "Inicie el reparador de píxeles atascados",
      "actionHref": "/tests/stuck-pixel-fixer"
    }
  },
  "burn-in-test": {
    "overview": "El desgaste de la pantalla (retención permanente de la imagen) se produce cuando los compuestos orgánicos OLED o los fósforos se degradan de manera desigual debido a elementos estáticos de alta luminosidad, como barras de tareas, logotipos de canales o medidores HUD.",
    "whatToLookFor": [
      {
        "label": "Siluetas fantasmas de la barra de tareas",
        "description": "Contornos tenues de las barras de tareas del sistema operativo o de las barras de navegación del navegador visibles en gris en pantalla completa."
      },
      {
        "label": "HUD y sombras del logotipo",
        "description": "Sombras persistentes de barras estáticas de salud de videojuegos o carteles de noticias de televisión."
      },
      {
        "label": "50% sombreado de campo gris",
        "description": "Manchas moteadas desiguales o falta de uniformidad de brillo en lienzos de color gris medio."
      },
      {
        "label": "Retención temporal versus permanente",
        "description": "Compruebe si la sombra se disipa después de ejecutar contenido de vídeo no estático durante 15 minutos."
      }
    ],
    "canObserve": [
      "Siluetas tenues en la imagen residual en un 50 % de grises y colores primarios sólidos",
      "Consistencia de luminiscencia de cuadrante en toda el área de visualización",
      "Detección de huellas de límites estáticos en campos de color uniformes"
    ],
    "cannotMeasure": [
      "Porcentaje de degradación química de subpíxeles emisores orgánicos OLED",
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
    "overview": "Las pruebas de color de pantalla evalúan la reproducción del color primario y secundario, la pureza espectral de subpíxeles y la consistencia de la representación del lienzo digital a analógico en los campos de color de pantalla completa.",
    "whatToLookFor": [
      {
        "label": "Pureza y saturación del color",
        "description": "Asegúrese de que el rojo, verde, azul, cian, magenta y amarillo sólidos llenen la pantalla de manera uniforme y sin manchas."
      },
      {
        "label": "Uniformidad cromática del borde",
        "description": "Compruebe que los colores no cambien de matiz o tono cerca de los límites del bisel exterior."
      },
      {
        "label": "Bandas en colores saturados",
        "description": "Inspeccione si los colores puros intensos provocan bandas de contorno o posterización."
      },
      {
        "label": "Aislamiento de defectos de subpíxeles",
        "description": "Observe motas individuales oscuras o descoloridas que se vuelven visibles solo en campos de colores específicos."
      }
    ],
    "canObserve": [
      "Visualización en pantalla completa de campos de color hexadecimal sRGB y P3 calibrados",
      "Temperatura de color visual de borde a borde y consistencia del tinte",
      "Respuesta de cambio de canal de color sin imágenes residuales persistentes"
    ],
    "cannotMeasure": [
      "Coordenadas de color espectrofotométricas absolutas (CIE 1931 xy)",
      "Nits de pico óptico por canal de color individual",
      "Picos espectrales de fósforo de retroiluminación física"
    ],
    "interpretation": "Las pantallas IPS y OLED de calidad ofrecen una saturación de color uniforme de borde a borde sin cambios de temperatura de color ni tintes.",
    "nextSteps": {
      "text": "¿Quiere inspeccionar la precisión del color y las desviaciones delta?",
      "actionLabel": "Iniciar la prueba de precisión del color",
      "actionHref": "/tests/color-accuracy-test"
    }
  },
  "grayscale-test": {
    "overview": "La prueba de escala de grises evalúa la capacidad de un monitor para representar pasos de luminancia neutros y suaves desde el negro absoluto (0%) hasta el blanco máximo (100%) sin matices cromáticos ni recortes de pasos.",
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
        "description": "Verifique que los pasos 1, 2 y 3 no colapsen en negro puro."
      },
      {
        "label": "Resaltar recorte de pasos",
        "description": "Verifique que los pasos más brillantes por debajo del 100% sean claramente visibles contra el blanco puro."
      }
    ],
    "canObserve": [
      "Discriminación de luminancia gradual a través de rampas estandarizadas de 16/32/64 bloques",
      "Neutralidad óptica y equilibrio de color entre parches vecinos en escala de grises.",
      "Representación del lienzo del navegador de pasos lineales y en escala de grises sRGB"
    ],
    "cannotMeasure": [
      "Función de transferencia física exponente de curva gamma sin colorímetro",
      "Luminancia del suelo negro en candelas por metro cuadrado (cd/m²)",
      "Profundidad de bits de la tabla de búsqueda interna de hardware (LUT 1D/3D)"
    ],
    "interpretation": "Incluso los pasos con equilibrio de color neutro indican una calibración de fábrica adecuada. Los bloques grises teñidos indican una desviación del punto blanco o configuraciones de ganancia RGB desequilibradas.",
    "nextSteps": {
      "text": "Evalúe la curva matemática de transferencia de luminancia de su pantalla.",
      "actionLabel": "Iniciar prueba gamma",
      "actionHref": "/tests/gamma-test"
    }
  },
  "saturation-test": {
    "overview": "Las pruebas de saturación verifican qué tan limpiamente una pantalla pasa de un gris neutro completamente desaturado (0%) a un color puro completamente saturado (100%) en los canales primarios y secundarios.",
    "whatToLookFor": [
      {
        "label": "Pasos de saturación lineal",
        "description": "Cada incremento del 10% del 0% al 100% debería mostrar un salto igual y distinto en la intensidad del color."
      },
      {
        "label": "Recorte de color prematuro",
        "description": "Asegúrese de que los colores no alcancen la saturación máxima prematuramente al 80% o 90%."
      },
      {
        "label": "Cambios de tono durante la desaturación",
        "description": "Esté atento a los cambios de color (por ejemplo, el rojo se vuelve naranja a medida que disminuye la saturación)."
      },
      {
        "label": "Sobresaturación de amplia gama",
        "description": "Verifique si los colores parecen naturalmente equilibrados o anormalmente neón."
      }
    ],
    "canObserve": [
      "Rampas de saturación de 10 pasos en rojo, verde, azul, cian, magenta y amarillo",
      "Claridad visual de los límites de los pasos y suavidad de progresión",
      "Consistencia de sujeción del espacio de color del navegador"
    ],
    "cannotMeasure": [
      "Porcentaje de pureza espectrofotométrica",
      "Distribución de potencia espectral de las emisiones de color.",
      "Volumen físico de la gama óptica en unidades CIELAB"
    ],
    "interpretation": "Las pantallas con una buena gestión del color muestran incrementos de saturación claros y distintos sin aplanarse en bloques de color sólido antes del 100%.",
    "nextSteps": {
      "text": "Inspeccione si su pantalla admite espacios de color amplios más allá de sRGB.",
      "actionLabel": "Iniciar prueba de gama de colores",
      "actionHref": "/tests/color-gamut-test"
    }
  },
  "color-banding-test": {
    "overview": "Las bandas de color se producen cuando los gradientes sutiles se dividen en bandas escalonadas visibles o contornos de posterización debido a una profundidad de bits insuficiente, una cuantificación de la GPU o un procesamiento deficiente de la imagen del monitor.",
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
        "label": "Teñido de color en degradados",
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
      "Formato de color de salida de GPU (submuestreo RGB 4:4:4 vs 4:2:2/4:2:0)",
      "Algoritmos de matriz de difuminado del escalador interno"
    ],
    "interpretation": "Los degradados suaves sin líneas marcadas indican una transmisión de color adecuada de 8 o 10 bits. Las bandas visibles sugieren limitaciones de FRC de 6 bits o configuraciones de rango dinámico limitado.",
    "nextSteps": {
      "text": "Pruebe rampas de gradiente multicanal en espectros RGB personalizados.",
      "actionLabel": "Iniciar la prueba de bandas de gradiente",
      "actionHref": "/tests/gradient-banding-test"
    }
  },
  "color-gamut-test": {
    "overview": "Las pruebas de gama de colores evalúan si su pantalla, controlador de GPU y navegador admiten espacios de color amplios, como DCI-P3 y Rec. 2020 más allá del estándar sRGB.",
    "whatToLookFor": [
      {
        "label": "Objetivo de extensión de gama P3",
        "description": "Un símbolo o número oculto visible solo en pantallas capaces de mostrar colores Display P3."
      },
      {
        "label": "Límite de sujeción sRGB",
        "description": "Observe si los colores fuera de sRGB se recortan o se reproducen con precisión."
      },
      {
        "label": "Saturación de rojo intenso y verde",
        "description": "Compruebe si los rojos y verdes se ven significativamente más ricos que en los monitores de oficina estándar."
      },
      {
        "label": "Estado de gestión del color del navegador",
        "description": "Verifique que su navegador web esté utilizando activamente los perfiles de administración de color del sistema operativo."
      }
    ],
    "canObserve": [
      "Detección de consultas de medios de gama de colores CSS del navegador (@media (color-gamut: p3))",
      "Diferenciación visual entre parches de color sRGB y Display P3",
      "Representación del perfil de color de amplia gama de lienzos"
    ],
    "cannotMeasure": [
      "Cobertura porcentual de DCI-P3 o AdobeRGB sin espectrofotómetro",
      "Volumen óptico en unidades CIELAB",
      "Longitudes de onda de emisión de fósforo físico."
    ],
    "interpretation": "Si el logotipo del indicador P3 se distingue claramente del fondo sRGB, el hardware de su pantalla, el sistema operativo y el navegador admiten activamente amplias gamas de colores.",
    "nextSteps": {
      "text": "Verifique el brillo máximo de alto rango dinámico y el manejo de metadatos.",
      "actionLabel": "Inicie la prueba de capacidad HDR",
      "actionHref": "/tests/hdr-capability-test"
    }
  },
  "color-accuracy-test": {
    "overview": "La inspección de la precisión del color utiliza parches de color de referencia estandarizados para detectar visualmente cambios de tono, errores de percepción del color y distorsión del tono de la piel en la pantalla.",
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
        "description": "Compruebe que la fila gris neutra muestre cero tintes cromáticos."
      },
      {
        "label": "Equilibrio de color secundario",
        "description": "Asegúrese de que el cian, el magenta y el amarillo mantengan los tonos puros sin desviarse hacia los primarios."
      }
    ],
    "canObserve": [
      "Representación de paleta de colores de referencia estándar de 24 parches",
      "Alineación visual con valores de referencia digitales estandarizados",
      "Coherencia de parches en paralelo en todas las regiones de la pantalla"
    ],
    "cannotMeasure": [
      "Valores de desviación numéricos Delta E (ΔE 2000) sin sensor externo",
      "Coordenadas absolutas CIE L*a*b*",
      "Impacto de la llamarada de luz ambiental en la percepción"
    ],
    "interpretation": "Las pantallas bien calibradas mantienen el tono y la saturación precisos en todas las zonas de prueba sin enrojecimiento excesivo en los tonos de piel o grises verdosos.",
    "nextSteps": {
      "text": "Aprenda a calibrar su monitor usando controles de visualización en pantalla de hardware.",
      "actionLabel": "Inicie la guía de calibración OSD",
      "actionHref": "/tools/osd-calibration-guide"
    }
  },
  "brightness-test": {
    "overview": "Las pruebas de brillo inspeccionan los detalles de las sombras casi negras (niveles del 1 % al 10 %) para garantizar que los elementos oscuros de los juegos, películas y fotografías no queden aplastados en un tono negro impenetrable.",
    "whatToLookFor": [
      {
        "label": "Visibilidad del cuadrado casi negro",
        "description": "Las manchas cuadradas con valores de luminancia del 1% al 5% apenas deberían distinguirse del fondo negro."
      },
      {
        "label": "Separación de pasos oscuros",
        "description": "Cada cuadrado sucesivo debe ser visiblemente más brillante que el anterior."
      },
      {
        "label": "Piso nivel negro",
        "description": "El fondo debe permanecer negro intenso y no decolorarse hasta convertirse en gris carbón."
      },
      {
        "label": "Impacto de la iluminación de la habitación",
        "description": "Apague las luces de la habitación para verificar que los sutiles cuadrados oscuros sigan siendo discernibles."
      }
    ],
    "canObserve": [
      "Distinción visual de cuadrados casi negros frente a negro puro",
      "Umbral de visibilidad de paso a través de incrementos sutiles de luminancia",
      "Contraste entre el suelo negro y los niveles de gris más bajos"
    ],
    "cannotMeasure": [
      "Pico absoluto o luminancia mínima en candelas por metro cuadrado (nits)",
      "Curvas de regulación de voltaje de retroiluminación.",
      "Porcentaje de deslumbramiento reflejado en el ambiente"
    ],
    "interpretation": "Una visualización óptima revela el paso 2% o 3% sin que el fondo negro de referencia del 0% se desvanezca y se convierta en un gris brumoso.",
    "nextSteps": {
      "text": "Ahora verifique que las luces brillantes no se recorten en un blanco puro.",
      "actionLabel": "Iniciar prueba de contraste",
      "actionHref": "/tests/contrast-test"
    }
  },
  "contrast-test": {
    "overview": "Las pruebas de contraste verifican la relación dinámica entre los blancos más brillantes y los negros más oscuros, asegurando que tanto las texturas de las luces como los detalles de las sombras permanezcan visibles simultáneamente.",
    "whatToLookFor": [
      {
        "label": "Diferenciación de paso blanco",
        "description": "Verifique que los cuadrados del 90% al 99% de luminancia se distingan del fondo blanco puro."
      },
      {
        "label": "Separación de pasos negros",
        "description": "Verifique que los cuadrados oscuros del 1% al 10% permanezcan visibles contra el negro."
      },
      {
        "label": "Resaltar la floración",
        "description": "Asegúrese de que los bloques blancos brillantes no transmitan brillo óptico a las áreas oscuras adyacentes."
      },
      {
        "label": "Medios tonos descoloridos",
        "description": "Compruebe que el contraste no se aumente artificialmente, lo que aplasta los degradados de color."
      }
    ],
    "canObserve": [
      "Visibilidad simultánea de parches de prueba casi blancos y casi negros",
      "Separación de límites a través de rampas de contraste de varios pasos",
      "Equilibrio de rango dinámico visual en toda la pantalla"
    ],
    "cannotMeasure": [
      "Relación de contraste ANSI estática (por ejemplo, 1000:1 frente a 3000:1) sin sonda óptica",
      "Velocidad de modulación de contraste dinámico",
      "Relación de reflectancia del panel"
    ],
    "interpretation": "El contraste configurado correctamente permite que los cuadrados casi blancos (hasta un 98 %) sean visibles sin recortarlos en blanco puro, mientras se mantienen distintos los cuadrados casi negros.",
    "nextSteps": {
      "text": "Examine los detalles de las sombras profundas en entornos de visualización de cuartos oscuros.",
      "actionLabel": "Iniciar prueba de nivel de negro",
      "actionHref": "/tests/black-level-test"
    }
  },
  "black-level-test": {
    "overview": "La prueba de nivel de negro mide la reproducción de los detalles de las sombras y la profundidad del suelo negro, asegurando que las señales de luminancia más baja se representen con precisión sin aplastamiento del negro ni neblina gris.",
    "whatToLookFor": [
      {
        "label": "Paso gris visible más bajo",
        "description": "Localice el cuadro de porcentaje más bajo (1%, 2% o 3%) que pueda distinguir del negro verdadero."
      },
      {
        "label": "Estabilidad del fondo negro puro",
        "description": "Confirme que el fondo exterior se renderice al 0% (RGB 0,0,0)."
      },
      {
        "label": "Resplandor versus profundidad negra",
        "description": "Tenga en cuenta si el fondo es realmente oscuro o elevado por el brillo/sangrado de retroiluminación de IPS."
      },
      {
        "label": "Falta de uniformidad en las esquinas",
        "description": "Compruebe si el nivel de negro aumenta cerca de las esquinas de la pantalla en comparación con el centro."
      }
    ],
    "canObserve": [
      "Umbral exacto del paso más bajo visible casi negro (1% a 8%)",
      "Profundidad visual del negro en una sala de visualización oscura",
      "Interferencia del brillo de las esquinas que afecta la percepción de las sombras."
    ],
    "cannotMeasure": [
      "Luminancia negra mínima absoluta en cd/m² (nits)",
      "Relación de polarización de bloqueo de luz de cristal líquido",
      "Integridad del sello de la luz del panel"
    ],
    "interpretation": "En los paneles OLED, el negro verdadero emite 0 nits. En los paneles LCD, un brillo tenue es normal, pero los pasos del 1% al 2% deben permanecer distintos del fondo.",
    "nextSteps": {
      "text": "Pruebe la respuesta en escala de grises de baja luminosidad cerca del 0 % al 5 %.",
      "actionLabel": "Lanzar prueba casi negra",
      "actionHref": "/tests/near-black-test"
    }
  },
  "white-level-test": {
    "overview": "La prueba de nivel de blanco inspecciona los aspectos más destacados de la pantalla para garantizar que los detalles blancos brillantes (niveles 240 a 254 en 8 bits) no queden atrapados en un lavado blanco sin rasgos distintivos.",
    "whatToLookFor": [
      {
        "label": "Límites del cuadrado casi blanco",
        "description": "Compruebe si los cuadrados 250, 252 y 254 son visiblemente distintos del fondo blanco puro (255)."
      },
      {
        "label": "Decoloración en reflejos brillantes",
        "description": "Asegúrese de que los cuadrados blancos pico no adquieran un tono amarillento o cian."
      },
      {
        "label": "Fatiga ocular/deslumbramiento",
        "description": "Compruebe si el blanco máximo causa molestias oculares con la iluminación actual de su habitación."
      },
      {
        "label": "Resaltar la floración",
        "description": "Observe si los bloques blancos de alto brillo desvían la luz hacia los límites vecinos."
      }
    ],
    "canObserve": [
      "Límites distinguibles de cuadrados de alta luminosidad contra el blanco puro (255)",
      "Neutralidad del color del blanco máximo en los cuadrantes de la pantalla",
      "Umbral de recorte de resaltado de borde"
    ],
    "cannotMeasure": [
      "Luminancia máxima sostenida en liendres sin fotómetro",
      "Temperatura de color óptica del blanco máximo (p. ej., 6500 K) sin colorímetro",
      "Curvas de aceleración del limitador automático de brillo (ABL)"
    ],
    "interpretation": "Si los cuadrados casi blancos de hasta 253 o 254 se distinguen del fondo blanco, su monitor evita el recorte de luces y conserva las nubes y los detalles especulares.",
    "nextSteps": {
      "text": "Inspeccione la uniformidad general de la luminancia en toda la superficie de la pantalla.",
      "actionLabel": "Lanzar prueba de uniformidad",
      "actionHref": "/tests/uniformity-test"
    }
  },
  "gamma-test": {
    "overview": "Las pruebas gamma utilizan campos ópticos de tramado de medios tonos para calibrar visualmente las curvas de luminancia de la pantalla al estándar 2.2 sin necesidad de un costoso colorímetro de hardware.",
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
        "label": "Deriva de color en gris",
        "description": "Observe si el punto de fusión difiere entre los canales rojo, verde y azul."
      }
    ],
    "canObserve": [
      "Punto de coincidencia perceptual entre campos de interpolación de luminancia del 50 % y muestras de gris sólido",
      "Aproximación visual del exponente efectivo de la curva gamma.",
      "Equilibrio de color y neutralidad cromática de los medios tonos."
    ],
    "cannotMeasure": [
      "Curva gamma paramétrica multipunto exacta de 10 puntos/20 puntos",
      "Datos de perfil LUT de hardware dentro del monitor escalar",
      "Función de transferencia de conversión de digital a óptico en milicandelas"
    ],
    "interpretation": "Para informática general y masterización sRGB, el patrón debe mezclarse perfectamente con el fondo en la marca del indicador 2.2 cuando se ve desde una distancia normal.",
    "nextSteps": {
      "text": "Calibre la configuración de su monitor usando los botones de hardware en pantalla.",
      "actionLabel": "Inicie la guía de calibración OSD",
      "actionHref": "/tools/osd-calibration-guide"
    }
  },
  "solid-color-test": {
    "overview": "Las pruebas de campo de color sólido presentan fondos primarios, secundarios, negros, blancos y grises de pantalla completa para inspeccionar la uniformidad del panel, la pureza del color y los defectos de subpíxeles.",
    "whatToLookFor": [
      {
        "label": "Cambios de color de borde",
        "description": "Compruebe si la temperatura del color cambia cerca de los bordes perimetrales de la pantalla."
      },
      {
        "label": "Efecto de pantalla sucia (DSE)",
        "description": "En campos grises y blancos, inspeccione si hay manchas, nubes o bandas."
      },
      {
        "label": "Aislamiento de defectos de subpíxeles",
        "description": "Detecte subpíxeles muertos o atascados que solo se revelan en campos de colores primarios específicos."
      },
      {
        "label": "Viñeteado/sombreado de esquinas",
        "description": "Observe si las esquinas extremas aparecen ligeramente oscurecidas en comparación con el centro."
      }
    ],
    "canObserve": [
      "Consistencia de color visual en pantalla completa en 8 campos de color estandarizados",
      "Cambios de brillo de borde a centro y viñeteado",
      "Detección visual de partículas de polvo y subpíxeles defectuosos"
    ],
    "cannotMeasure": [
      "Porcentaje de uniformidad ANSI fotométrico de 9 puntos o 25 puntos",
      "Variación del espesor del panel en micrómetros.",
      "Eficiencia de transmisión óptica del difusor de retroiluminación."
    ],
    "interpretation": "Los colores sólidos uniformes indican una alta calidad del panel y una distribución uniforme de la luz de fondo. Las manchas irregulares o las viñetas en las esquinas son comunes en las pantallas LCD económicas.",
    "nextSteps": {
      "text": "Inspeccione la uniformidad de la luminancia y la temperatura de color del panel de 9 zonas.",
      "actionLabel": "Lanzar prueba de uniformidad",
      "actionHref": "/tests/uniformity-test"
    }
  },
  "viewing-angle-test": {
    "overview": "La prueba de ángulo de visión evalúa cómo se degradan la saturación del color, el brillo y el contraste cuando la pantalla se ve desde ángulos descentrados, oblicuos y verticales.",
    "whatToLookFor": [
      {
        "label": "Decoloración del color en ángulos",
        "description": "Mueva la cabeza de lado a lado y observe si los colores vibrantes se desvanecen en tonos pastel."
      },
      {
        "label": "Cambio de gamma/pérdida de contraste",
        "description": "Observe si los detalles de las sombras oscuras se desvanecen y los niveles de negro se elevan a un gris lechoso."
      },
      {
        "label": "IPS Glow frente a VA Gamma Shift",
        "description": "Los paneles IPS muestran un brillo plateado/blanco en ángulos amplios; Los paneles VA pierden contraste central."
      },
      {
        "label": "Inversión Vertical (Paneles TN)",
        "description": "Mire desde abajo para comprobar si los colores se invierten en imágenes negativas en paneles TN económicos."
      }
    ],
    "canObserve": [
      "El color percibido y el contraste cambian a medida que el ángulo de visión aumenta en relación con lo normal",
      "Radial gradient uniformity when viewed off-axis",
      "Estabilidad angular del texto y líneas de alto contraste."
    ],
    "cannotMeasure": [
      "Exact VESA-defined 178°/178° viewing angle contrast threshold (10:1 CR)",
      "Optical polarizing filter extinction ratio",
      "Refractive index of panel glass substrate"
    ],
    "interpretation": "IPS and OLED panels maintain high color fidelity across wide angles. VA panels suffer contrast loss and gamma shift, while TN panels invert colors vertically.",
    "nextSteps": {
      "text": "Check if off-angle viewing exposes corner backlight bleed.",
      "actionLabel": "Launch Backlight Bleed Test",
      "actionHref": "/tests/backlight-bleed-test"
    }
  },
  "blooming-test": {
    "overview": "Las pruebas de floración inspeccionan artefactos de halo en pantallas Mini-LED y con atenuación local de matriz completa (FALD) donde la luz se filtra desde las zonas de retroiluminación activa hacia los píxeles oscuros circundantes.",
    "whatToLookFor": [
      {
        "label": "Halos brillantes alrededor de los objetivos",
        "description": "Inspeccione pequeñas cajas blancas sobre negro en busca de un aura brillante difusa alrededor de sus perímetros."
      },
      {
        "label": "Subtítulo que florece en barras negras",
        "description": "Compruebe si el texto blanco provoca destellos de luz que distraen la atención en las áreas del buzón negro."
      },
      {
        "label": "Llamarada del campo estelar",
        "description": "Observe pequeñas estrellas blancas de 1 px para ver si las zonas de retroiluminación adyacentes se iluminan innecesariamente."
      },
      {
        "label": "Pulsación de transición de zona",
        "description": "Mueva objetos de alto contraste por la pantalla para comprobar si hay un retraso en el brillo de la zona de retroiluminación."
      }
    ],
    "canObserve": [
      "Extensión del halo visual y contraste de luminancia en diámetros objetivo calibrados (1 px, 5 px, 20 px, 100 px)",
      "Seguimiento dinámico de elementos móviles de alto contraste en los cuadrantes de la pantalla",
      "Nitidez de límites de subpíxeles frente a lienzos en negro verdadero (RGB 0,0,0)"
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
    "overview": "La prueba de sobreexploración de TV verifica si su televisor o pantalla externa genera imágenes con un mapeo de píxeles exacto de 1:1 o acerca y corta artificialmente los bordes del perímetro.",
    "whatToLookFor": [
      {
        "label": "0 % de visibilidad del borde del borde",
        "description": "Las líneas de límite blancas marcadas con 0% deben tocar perfectamente el marco físico de la pantalla en los cuatro lados."
      },
      {
        "label": "Flechas indicadoras recortadas",
        "description": "Compruebe si las puntas de flecha en los bordes exteriores están truncadas u ocultas detrás del bisel."
      },
      {
        "label": "Escalar el desenfoque",
        "description": "Inspeccione si el texto y los bordes de un solo píxel aparecen suaves y borrosos debido a la interpolación de escala."
      },
      {
        "label": "Nitidez de línea de 1px",
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
    "overview": "Las pruebas de escala y relación de aspecto validan la simetría geométrica en las relaciones de visualización estándar (16:9, 16:10, 21:9, 32:9, 4:3), asegurando que los círculos permanezcan perfectamente redondos y sin deformaciones.",
    "whatToLookFor": [
      {
        "label": "Simetría de círculos concéntricos",
        "description": "Compruebe que los círculos sean perfectamente redondos, sin distorsiones, estiramientos ni aplastamientos ovalados."
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
        "description": "Inspeccione los anillos concéntricos en busca de alias irregulares o brillo muaré."
      }
    ],
    "canObserve": [
      "Simetría circular visual frente a cuadrículas de píxeles en relaciones de aspecto estándar",
      "Distorsión de la relación de aspecto causada por GPU incorrecta o modos de escala de pantalla",
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
    "overview": "El desgarro de la pantalla ocurre cuando la velocidad de fotogramas de la tarjeta gráfica no está sincronizada con los ciclos de actualización fijos del monitor, lo que hace que los fotogramas consecutivos se representen en cortes horizontales divididos.",
    "whatToLookFor": [
      {
        "label": "Líneas de división horizontales",
        "description": "Busque líneas de fractura horizontales que corten barras verticales en movimiento."
      },
      {
        "label": "Movimiento discontinuo",
        "description": "Observe cuando la parte superior de un elemento móvil se desplaza por delante de la parte inferior."
      },
      {
        "label": "Artefactos de múltiples lágrimas",
        "description": "A velocidades de fotogramas altas, busque múltiples desgarros simultáneos en la altura de la pantalla."
      },
      {
        "label": "V-Sync tartamudea frente a desgarro",
        "description": "Compruebe si al habilitar V-Sync se producen desgarros por micro tartamudeos periódicos."
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
    "overview": "Las pruebas de parpadeo de la pantalla exponen rápidas fluctuaciones periódicas de luminancia causadas por retroiluminación PWM de baja frecuencia, ondulación de voltaje o inestabilidad de sincronización del controlador del panel.",
    "whatToLookFor": [
      {
        "label": "Visual estroboscópico o brillante",
        "description": "Detecta zumbidos o destellos sutiles de alta frecuencia en patrones de rayas finas."
      },
      {
        "label": "Líneas fantasma estroboscópicas",
        "description": "Mueva sus ojos rápidamente por la pantalla; Las líneas aparecerán con cuentas si hay parpadeo."
      },
      {
        "label": "Sensibilidad de la visión periférica",
        "description": "Mire ligeramente lejos del monitor para ver si el parpadeo es más pronunciado en la visión periférica."
      },
      {
        "label": "Umbral de brillo",
        "description": "Ajuste el brillo del monitor hacia abajo para ver si el parpadeo comienza solo por debajo de cierto nivel."
      }
    ],
    "canObserve": [
      "Percepción visual de patrones de parpadeo a través de rejillas finas y campos alternos.",
      "Interacción estroboscópica con movimientos oculares sacádicos humanos.",
      "El patrón brilla en máscaras de luminancia de alta frecuencia"
    ],
    "cannotMeasure": [
      "Frecuencia de pulso eléctrico precisa en Hertz sin fotodiodo de osciloscopio",
      "Porcentaje del ciclo de trabajo del controlador de retroiluminación",
      "Índice de parpadeo armónico"
    ],
    "interpretation": "Visible flicker on solid or patterned backgrounds indicates low-frequency PWM dimming or refresh instability, a primary cause of eye fatigue and headaches.",
    "nextSteps": {
      "text": "Perform a dedicated test for pulse-width modulation dimming.",
      "actionLabel": "Iniciar la prueba de parpadeo PWM",
      "actionHref": "/tests/pwm-flicker-test"
    }
  },
  "resolution-checker": {
    "overview": "El Comprobador de resolución proporciona diagnósticos en tiempo real de la resolución de la pantalla física, las dimensiones de la ventana gráfica CSS, la relación de píxeles del dispositivo (DPR) y la densidad de píxeles.",
    "whatToLookFor": [
      {
        "label": "Coincidencia de resolución nativa",
        "description": "Verifique que los píxeles físicos de la pantalla informados coincidan con las especificaciones del fabricante de su monitor."
      },
      {
        "label": "Factor de escala DPR de alto DPI",
        "description": "Compruebe si la proporción de píxeles de su dispositivo está configurada en 1,0x (100%), 1,25x (125%), 1,5x (150%) o 2,0x (200%)."
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
      "Dimensiones de la pantalla del sistema operativo (`screen.width`, `screen.height`)",
      "Device Pixel Ratio (`window.devicePixelRatio`) reported by the browser environment",
      "Orientación de la pantalla y espacio de trabajo de escritorio disponible"
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
    "overview": "Los diagnósticos de pantalla táctil prueban la precisión, la capacidad de respuesta, las zonas muertas y la sensibilidad de los bordes del sensor táctil en dispositivos móviles, tabletas y monitores de pantalla táctil.",
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
        "description": "Observe la distancia entre el dedo en movimiento y el rastro de tinta dibujado."
      },
      {
        "label": "Registro de borde",
        "description": "Verifique que toque a lo largo del borde exterior extremo del registro de pantalla de manera confiable."
      }
    ],
    "canObserve": [
      "Coordenadas táctiles en tiempo real en el lienzo de la pantalla.",
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
    "overview": "Las pruebas de nitidez evalúan la representación de fuentes, la claridad de los bordes y el timbre de mejora artificial de los bordes causado por una configuración excesiva de nitidez de la visualización en pantalla del monitor.",
    "whatToLookFor": [
      {
        "label": "Anillo de halo blanco",
        "description": "Busque bordes o franjas de color blanco brillante alrededor del texto negro y líneas de alto contraste."
      },
      {
        "label": "Resolución espuria de la estrella Siemens",
        "description": "Compruebe si las líneas de los radios convergen limpiamente hacia el centro sin artefactos muaré circulares."
      },
      {
        "label": "Claridad de trama de línea fina de 1 px",
        "description": "Las líneas alternas en blanco y negro deben aparecer nítidas sin manchas grises turbias."
      },
      {
        "label": "Borde del texto manchado",
        "description": "Inspeccione pequeñas muestras de texto para asegurarse de que las letras estén nítidas y sin ruido artificial de nitidez."
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
      "actionLabel": "Iniciar prueba de claridad de texto",
      "actionHref": "/tests/text-clarity-test"
    }
  },
  "compare-displays": {
    "overview": "El conjunto de calculadora y comparación de pantallas calcula la densidad de píxeles (PPI), las distancias de visualización óptimas y las relaciones de aspecto, y proporciona herramientas de evaluación de monitores en paralelo.",
    "whatToLookFor": [
      {
        "label": "Cálculos de PPI y PPD",
        "description": "Compare la densidad de píxeles y los píxeles por grado para determinar la nitidez real."
      },
      {
        "label": "Límite de agudeza visual",
        "description": "Compruebe la distancia a la que los píxeles individuales se vuelven imperceptibles para el ojo humano (\"Retina\")."
      },
      {
        "label": "Proporción de relación de aspecto",
        "description": "Obtenga una vista previa de cuadros de estructura alámbrica comparando formas de pantalla 16:9, 16:10, 21:9 y 32:9."
      },
      {
        "label": "Coincidencia de pantalla dual",
        "description": "Evaluate color, white point, and resolution parity between multiple monitors."
      }
    ],
    "canObserve": [
      "Cálculos matemáticos de PPI y distancia de retina basados ​​en dimensiones del usuario",
      "Interactive aspect ratio wireframe previews and dimension comparisons",
      "Multi-display specification matching matrices"
    ],
    "cannotMeasure": [
      "Colorimeter delta differences between two separate physical panels in real-time",
      "Physical manufacturing bezel tolerances"
    ],
    "interpretation": "Displays exceeding 60 Pixels Per Degree (PPD) at normal viewing distances reach the human visual acuity limit ('Retina'), rendering individual pixels invisible.",
    "nextSteps": {
      "text": "Match color and white point between two side-by-side monitors.",
      "actionLabel": "Launch Dual Monitor Matcher",
      "actionHref": "/tools/dual-monitor-matcher"
    }
  },
  "display-info": {
    "overview": "La prueba de Información de Pantalla recopila los parámetros técnicos disponibles a través del navegador: resolución lógica y física, relación de píxeles (DPR), profundidad de color y tasa de refresco.",
    "whatToLookFor": [
      {
        "label": "Resolución nativa correcta",
        "description": "Compruebe que la resolución informada coincida con las especificaciones del panel."
      },
      {
        "label": "Escalado del sistema (DPR)",
        "description": "Verifique si el factor de escala refleja la configuración de su sistema operativo (100%, 125%, 150%, 200%)."
      }
    ],
    "canObserve": [
      "Resolución de pantalla y ventana",
      "Profundidad de color en bits",
      "Relación de aspecto y DPR"
    ],
    "cannotMeasure": [
      "Dimensiones físicas en pulgadas",
      "Marca y modelo del panel a nivel de hardware"
    ],
    "interpretation": "Confirmar que el sistema operativo y el navegador reconocen la resolución completa evita pérdida de nitidez.",
    "nextSteps": {
      "text": "¿Desea verificar la nitidez del texto?",
      "actionLabel": "Iniciar prueba de nitidez",
      "actionHref": "/tests/sharpness-test"
    }
  },
  "custom-pattern": {
    "overview": "El generador de patrones personalizados permite crear cuadrículas, barras de color y geometrías a medida para verificar la calibración visual de su pantalla.",
    "whatToLookFor": [
      {
        "label": "Alineación de cuadrícula",
        "description": "Compruebe que las líneas de la cuadrícula sean nítidas y regulares en toda la pantalla."
      },
      {
        "label": "Uniformidad de color",
        "description": "Verifique que el color de fondo elegido no presente variaciones en las esquinas."
      }
    ],
    "canObserve": [
      "Patrones de resolución y cuadrículas personalizadas",
      "Inspección de simetría y centrado"
    ],
    "cannotMeasure": [
      "Geometría óptica a nivel de subpíxel microscópico"
    ],
    "interpretation": "Un renderizado simétrico y sin distorsiones geométricas confirma un mapeo 1:1 perfecto.",
    "nextSteps": {
      "text": "¿Desea verificar la relación de aspecto?",
      "actionLabel": "Iniciar prueba de aspecto",
      "actionHref": "/tests/scaling-aspect-test"
    }
  },
  "multi-touch-test": {
    "overview": "La prueba Multi-Touch analiza la capacidad de la pantalla táctil para registrar múltiples puntos de contacto simultáneos de manera precisa y sin retrasos.",
    "whatToLookFor": [
      {
        "label": "Número máximo de toques",
        "description": "Coloque varios dedos simultáneamente en la pantalla para comprobar cuántos puntos detecta su panel."
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
      "actionLabel": "Iniciar prueba táctil",
      "actionHref": "/tests/touch-screen-test"
    }
  },
  "accelerometer-test": {
    "overview": "La prueba del acelerómetro evalúa los sensores de movimiento de su dispositivo en los tres ejes espaciales (X, Y, Z).",
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
      "Sensibilidad al movimiento"
    ],
    "cannotMeasure": [
      "Calibración interna de fábrica del chip",
      "Deriva por temperatura"
    ],
    "interpretation": "Una respuesta inmediata y un valor cercano a 9,8 m/s² en reposo confirman el correcto funcionamiento.",
    "nextSteps": {
      "text": "¿Desea probar el giroscopio?",
      "actionLabel": "Iniciar prueba de giroscopio",
      "actionHref": "/tests/gyroscope-test"
    }
  },
  "gyroscope-test": {
    "overview": "La prueba del giroscopio comprueba la velocidad angular y los movimientos de rotación en los tres ejes.",
    "whatToLookFor": [
      {
        "label": "Estabilidad en reposo",
        "description": "Sin mover el dispositivo, los valores deben mantenerse cerca de 0."
      },
      {
        "label": "Detección de rotación",
        "description": "Compruebe que girar el dispositivo en cualquier sentido se refleje con fluidez."
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
      "actionLabel": "Iniciar prueba de vibración",
      "actionHref": "/tests/vibration-test"
    }
  },
  "vibration-test": {
    "overview": "La prueba de vibración comprueba el motor háptico interno del dispositivo, su intensidad y los pulsos de respuesta.",
    "whatToLookFor": [
      {
        "label": "Nitidez de la vibración",
        "description": "Compruebe que el motor vibre limpiamente sin sonidos extraños ni piezas sueltas."
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
      "actionLabel": "Iniciar prueba de altavoces",
      "actionHref": "/tests/speaker-test"
    }
  },
  "webcam-test": {
    "overview": "La prueba de cámara web permite verificar la señal de vídeo, resolución máxima, tasa de fotogramas y balance de color en tiempo real.",
    "whatToLookFor": [
      {
        "label": "Resolución y nitidez",
        "description": "Compruebe que la imagen sea nítida y coincida con la resolución esperada."
      },
      {
        "label": "Fluidez de movimiento",
        "description": "Asegúrese de que el movimiento se capture a 30 o 60 fps sin tirones."
      },
      {
        "label": "Exposición y color",
        "description": "Verifique que no haya sobreexposición ni ruido excesivo en zonas oscuras."
      }
    ],
    "canObserve": [
      "Vista previa de vídeo en directo",
      "Resolución y tasa de fotogramas activas",
      "Calidad de imagen y color"
    ],
    "cannotMeasure": [
      "Ruido de sensor a nivel físico de fotodiodos",
      "Distorsión óptica de lentes"
    ],
    "interpretation": "Una imagen clara, fluida y con colores naturales confirma que su cámara web está lista para videollamadas.",
    "nextSteps": {
      "text": "¿Desea verificar el micrófono?",
      "actionLabel": "Iniciar prueba de micrófono",
      "actionHref": "/tests/microphone-test"
    }
  },
  "speaker-test": {
    "overview": "La prueba de altavoces comprueba la separación estéreo de los canales izquierdo y derecho, la respuesta en frecuencia y la distorsión acústica.",
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
      "actionLabel": "Iniciar prueba de sincronización",
      "actionHref": "/tests/audio-sync-test"
    }
  },
  "microphone-test": {
    "overview": "La prueba de micrófono analiza la sensibilidad de entrada de audio, el espectro de frecuencias y el nivel de ruido de fondo.",
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
      "actionLabel": "Iniciar prueba de tiempo de reacción",
      "actionHref": "/tests/reaction-time-test"
    }
  },
  "reaction-time-test": {
    "overview": "La prueba de tiempo de reacción mide su velocidad de reflejos visuales combinada con la latencia del sistema y del ratón.",
    "whatToLookFor": [
      {
        "label": "Tiempo medio de respuesta",
        "description": "Haga clic lo más rápido posible cuando el color cambie a verde para medir sus milisegundos (ms)."
      },
      {
        "label": "Consistencia de resultados",
        "description": "Realice varias pruebas consecutivas para calcular su media real."
      }
    ],
    "canObserve": [
      "Tiempo de reacción exacto en milisegundos",
      "Estadísticas y media de intentos",
      "Beneficio de pantallas de alta frecuencia"
    ],
    "cannotMeasure": [
      "Tiempo de conducción neuronal aislado del hardware",
      "Tiempo de rebote físico del interruptor del ratón"
    ],
    "interpretation": "El promedio en adultos sanos se sitúa entre 200 y 250 ms. Menos de 200 ms refleja reflejos muy rápidos.",
    "nextSteps": {
      "text": "¿Desea probar la tasa de sondeo del ratón?",
      "actionLabel": "Iniciar prueba de sondeo",
      "actionHref": "/tests/mouse-polling-test"
    }
  },
  "pixel-inversion-test": {
    "overview": "La prueba de inversión de píxeles (VCOM) comprueba el equilibrio de polaridad en pantallas LCD para evitar parpadeos y patrones de muaré.",
    "whatToLookFor": [
      {
        "label": "Parpadeo rápido",
        "description": "Observe si alguno de los patrones tramados parpadea intensamente o si se muestra como un gris quieto."
      },
      {
        "label": "Tono gris uniforme",
        "description": "En un panel bien calibrado, los patrones deben verse neutros y estables a distancia normal."
      }
    ],
    "canObserve": [
      "Parpadeo visual con patrones de inversión de fase",
      "Comportamiento del tipo de inversión del panel",
      "Estabilidad de frecuencia"
    ],
    "cannotMeasure": [
      "Voltaje VCOM interno en voltios",
      "Ángulo de retardo de las moléculas del cristal líquido"
    ],
    "interpretation": "Si los patrones se perciben como un gris fijo sin centelleo, la tensión VCOM está correctamente calibrada.",
    "nextSteps": {
      "text": "¿Desea comprobar el parpadeo PWM?",
      "actionLabel": "Iniciar prueba de parpadeo PWM",
      "actionHref": "/tests/pwm-flicker-test"
    }
  },
  "oled-abl-test": {
  "overview": "Auto-Brightness Limiter (ABL) is an essential protection mechanism built into OLED, QD-OLED, and Mini-LED displays. Because driving organic subpixels or high-density backlight zones at maximum luminance across the entire screen consumes excessive power and causes rapid thermal buildup, display controllers automatically attenuate brightness as the Average Picture Level (APL) increases.",
  "whatToLookFor": [
    {
      "label": "Luminance Step-Down Across Window Sizes",
      "description": "Observe the drop in white brightness as you transition from a small 2% or 10% window to a large 50% or 100% full-field window."
    },
    {
      "label": "Uniform Brightness OSD Mode Validation",
      "description": "If your monitor has a 'Uniform Brightness' or 'ABL Off' setting in its OSD, verify whether full-screen brightness remains flat across all window percentages."
    },
    {
      "label": "Thermal Sustained Throttling (ASBL)",
      "description": "Static bright windows may trigger Auto-Static Brightness Limiting (ASBL) after 30 to 90 seconds. Watch for secondary dimming over time."
    },
    {
      "label": "Distortion of Gray Gamma",
      "description": "Check if near-black shadows clip or elevate when large white windows are displayed simultaneously."
    }
  ],
  "canObserve": [
    "Visual step-down in peak white luminance across calibrated 1%, 2%, 5%, 10%, 25%, 50%, and 100% window sizes",
    "Verification of monitor OSD Uniform Brightness toggle effectiveness",
    "Sustained brightness decay over time using the built-in interval timer"
  ],
  "cannotMeasure": [
    "Absolute physical candela per square meter (nits) without an external hardware photometer",
    "Panel power supply rail wattage consumption",
    "Micro-temperature of OLED emitter layers in degrees Celsius"
  ],
  "interpretation": "Significant dimming from a 10% window to 100% full screen is normal behavior for OLED and QD-OLED panels. Enabling Uniform Brightness in your monitor's OSD stabilizes luminance at the full-screen ceiling.",
  "nextSteps": {
    "text": "Evaluate pixel longevity and panel burn-in risks for your OLED display.",
    "actionLabel": "Launch OLED Burn-In Calculator",
    "actionHref": "/tools/oled-burn-in-calculator"
  }
},
  "new-monitor-wizard": {
  "overview": "The 5-Minute New Monitor Acceptance Wizard is a structured, sequential diagnostic designed for inspecting brand-new or used monitors upon arrival. It steps through the five critical hardware failure points—dead pixels, backlight bleed/IPS glow, panel uniformity, text clarity, and refresh rate pacing—to help you determine whether to accept the unit or file for a return within your retailer's warranty window.",
  "whatToLookFor": [
    {
      "label": "Primary Color Subpixel Defects",
      "description": "Look for static dark pinpricks on pure red, green, blue, and white, or lit colored specks on pitch black."
    },
    {
      "label": "Backlight Bleed vs Off-Angle IPS Glow",
      "description": "Inspect corners in a dark room. Backlight bleed remains stationary when shifting your head; IPS glow angle-shifts."
    },
    {
      "label": "50% Neutral Gray Uniformity",
      "description": "Scan for Dirty Screen Effect (DSE), vertical banding lines, or dark corner vignetting."
    },
    {
      "label": "Text Edge Color Halos",
      "description": "Inspect letter stems on high-contrast text for chromatic green or magenta fringing under Windows ClearType."
    }
  ],
  "canObserve": [
    "Sequential visual isolation of subpixel, backlight, and panel uniformity defects",
    "Pass/Fail logging for each quality checkpoint",
    "Generation of an overall Panel Acceptance Grade for retailer return claims"
  ],
  "cannotMeasure": [
    "Internal panel hours counter without manufacturer service menu access",
    "Long-term backlight aging or solder joint degradation",
    "Automated optical defect classification without user visual inspection"
  ],
  "interpretation": "A score of A+ or A indicates an excellent panel well within standard ISO 9241-307 Class 1 tolerances. Scores of B or C with multiple dead pixels or severe bleed warrant an immediate return or exchange.",
  "nextSteps": {
    "text": "Export a complete documentation certificate with serial numbers and timestamp.",
    "actionLabel": "Generate Display Certificate",
    "actionHref": "/tools/display-certificate"
  }
},
  "color-temperature-test": {
  "overview": "Color temperature measures the spectral chromaticity of white light emitted by your display, expressed in Kelvin (K). The worldwide broadcast and digital imaging standard is CIE Illuminant D65 (approximately 6500K), which mimics average noon daylight. Displays calibrated too warm (5000K) appear yellow or orange, while displays calibrated too cool (9300K) exhibit an unnatural blue tint.",
  "whatToLookFor": [
    {
      "label": "D65 Neutral Reference Comparison",
      "description": "Compare your monitor's current white output against the D65 daylight standard swatch to identify warmth or coolness."
    },
    {
      "label": "Green vs Magenta Color Cast",
      "description": "Evaluate whether white and neutral gray patches have an unwanted greenish or purplish tint."
    },
    {
      "label": "Grayscale Step Neutrality",
      "description": "Examine the grayscale ramp from 10% to 90% luminance to ensure neutral gray does not shift hue across brightness steps."
    },
    {
      "label": "OSD Preset Validation",
      "description": "Switch your monitor OSD between Warm, Normal, Cool, and sRGB modes to determine which preset is closest to D65."
    }
  ],
  "canObserve": [
    "Visual color cast differences between 5000K (D50), 5500K, 6500K (D65), 7500K, and 9300K targets",
    "Evaluation of grayscale neutrality and color tracking consistency across luminance levels",
    "Green/Magenta tint offset comparison"
  ],
  "cannotMeasure": [
    "Exact correlated color temperature (CCT) in Kelvin without an optical colorimeter",
    "Spectral power distribution (SPD) across individual nanometer wavelengths",
    "Delta E (dE2000) absolute color difference metrics"
  ],
  "interpretation": "For accurate photo editing, web design, and video viewing, D65 (6500K) is the universal target. Switching your monitor OSD color temperature to 'Warm' or 'sRGB' usually brings it much closer to creator intent.",
  "nextSteps": {
    "text": "Calibrate your monitor's physical OSD contrast, brightness, and RGB gain channels.",
    "actionLabel": "Launch OSD Calibration Guide",
    "actionHref": "/tools/osd-calibration-guide"
  }
},
  "temporal-dithering-test": {
  "overview": "Temporal dithering (often combined with Frame Rate Control or FRC) is a technique where LCD, OLED, and GPU controllers rapidly alternate adjacent pixel colors or flicker pixels between consecutive refresh frames to simulate intermediate color shades on lower bit-depth panels. For photosensitive users, this micro-flicker can cause severe eye strain, migraines, and nausea.",
  "whatToLookFor": [
    {
      "label": "High-Frequency Shimmer on Micro-Grids",
      "description": "Look at the 1x1 checkerboard pattern. If temporal dithering or VCOM flicker is present, the static pattern will appear to crawl or shimmer."
    },
    {
      "label": "Smartphone Slow-Motion Camera Detection",
      "description": "Point a smartphone camera at the display recording at 120fps or 240fps. Rapidly pulsating pixel clusters indicate active temporal dithering."
    },
    {
      "label": "Intermediate Dither Step Pulsing",
      "description": "Inspect the 8-bit micro-step pattern (values 127 vs 128) for subtle luminance modulation."
    },
    {
      "label": "Phase Inversion Sensitivity",
      "description": "Observe whether toggling polarity causes visible flashing or visual relief."
    }
  ],
  "canObserve": [
    "Microscopic visual shimmer and crawl on 1x1 and 2x2 subpixel checkerboard grids",
    "High-contrast moire excitation under camera slow-motion video",
    "Identification of panels with aggressive FRC temporal pulsing"
  ],
  "cannotMeasure": [
    "Internal T-CON bit-depth truncation algorithms",
    "Exact hardware FRC temporal alternation frequency in Hertz",
    "Distinction between GPU temporal dithering and panel-level scalar FRC"
  ],
  "interpretation": "If a 1x1 checkerboard appears perfectly solid, still, and calm, your display is likely a true native bit-depth panel (true 8-bit or 10-bit). If it crawls or flickers, temporal dithering or VCOM imbalance is active.",
  "nextSteps": {
    "text": "Test your monitor for pulse-width modulation (PWM) backlight flicker.",
    "actionLabel": "Launch PWM Flicker Test",
    "actionHref": "/tests/pwm-flicker-test"
  }
},
  "hdr-peak-brightness-test": {
  "overview": "High Dynamic Range (HDR) displays must reproduce specular highlights up to hundreds or thousands of nits while preserving subtle gradations in bright clouds, explosions, and light reflections. When a display receives an HDR signal brighter than its hardware panel capability, its tone-mapping algorithm must decide whether to softly roll off highlights or hard-clip them into pure flat white.",
  "whatToLookFor": [
    {
      "label": "Highlight Step Separation",
      "description": "Check whether the inner stepped square remains clearly distinguishable from the outer target block at each luminance tier."
    },
    {
      "label": "Hard Clipping Threshold",
      "description": "Identify the tier (e.g. 600, 1000, or 1400 nits) where the inner square completely blends into the outer block, revealing your panel's clipping ceiling."
    },
    {
      "label": "SDR vs HDR Tone Mapping",
      "description": "Verify that Windows HDR or macOS HDR is active, ensuring true wide dynamic range rendering."
    },
    {
      "label": "Chromaticity Shift in Highlights",
      "description": "Watch for color shifts toward cyan, yellow, or blue when extreme highlights reach panel saturation."
    }
  ],
  "canObserve": [
    "Visual verification of highlight separation across 100 to 4,000 nits PQ targets",
    "Identification of the exact nit ceiling where your display clips highlight gradations",
    "Evaluation of HDR tone mapping curve aggressiveness"
  ],
  "cannotMeasure": [
    "Actual physical photon output in candela/m² without a spectrophotometer",
    "Full-screen sustained vs 10% peak nit differentials",
    "Dynamic metadata processing (HDR10+ or Dolby Vision frame-by-frame RPU curves)"
  ],
  "interpretation": "Knowing your clipping point allows you to calibrate the peak brightness slider in Windows HDR Calibration and video games accurately to prevent blown-out highlights.",
  "nextSteps": {
    "text": "Check your display's color gamut coverage across DCI-P3 and Rec.2020.",
    "actionLabel": "Launch Color Gamut Test",
    "actionHref": "/tests/color-gamut-test"
  }
},
  "audio-latency-test": {
  "overview": "Audio-visual synchronization and low-latency audio processing are critical for gaming, music production, and interactive media. The browser's Web Audio API interfaces directly with your operating system's audio kernel and sound card driver. This diagnostic measures real-time hardware buffer latency, base kernel latency, and audio sample rate to expose audio lag bottlenecks.",
  "whatToLookFor": [
    {
      "label": "Kernel Base vs Driver Output Latency",
      "description": "Observe the breakdown between kernel processing delay and hardware driver buffer latency."
    },
    {
      "label": "Hardware Sample Rate Support",
      "description": "Confirm whether your audio interface is operating at standard 44.1 kHz, 48 kHz, or 96/192 kHz studio rates."
    },
    {
      "label": "Click-to-Sound Actuation Delay",
      "description": "Click the central sound orb to test immediate auditory response and identify perceptible lag."
    },
    {
      "label": "Bluetooth vs Wired Latency",
      "description": "Compare your wired speakers or headphones against Bluetooth devices, which typically introduce 100ms to 250ms of wireless buffer latency."
    }
  ],
  "canObserve": [
    "Real-time Web Audio API hardware buffer metrics and sample rate queries",
    "Kernel base latency and estimated driver buffer round-trip delay",
    "Interactive instantaneous auditory pulse generation"
  ],
  "cannotMeasure": [
    "Physical speaker cone acoustic transit time through room air",
    "Analog digital-to-analog converter (DAC) internal op-amp slew rate",
    "Microphone input round-trip loopback latency without an external audio loop cable"
  ],
  "interpretation": "Wired USB DACs and PCIe sound cards typically achieve low buffer latencies of 5ms to 15ms, ideal for gaming. Bluetooth audio devices often suffer from 120ms to 200ms of lag unless utilizing low-latency codecs.",
  "nextSteps": {
    "text": "Calibrate audio and video synchronization for video playback.",
    "actionLabel": "Launch Audio Sync Test",
    "actionHref": "/tests/audio-sync-test"
  }
},
  "eink-refresh-tool": {
  "overview": "Electronic Paper Displays (EPDs), commonly known as E-Ink, operate by physically moving charged black and white pigment microcapsules suspended in a clear micro-fluid using electric field voltages. Over time, particles suffer from mechanical hysteresis and voltage retention, causing visible residual text and shadow outlines known as ghosting. This tool executes calibrated full-field inversion waveforms to restore microcapsule polarity.",
  "whatToLookFor": [
    {
      "label": "Residual Text & Shadow Purging",
      "description": "Observe whether lingering text outlines, icons, or PDF page ghosts disappear after running a refresh cycle."
    },
    {
      "label": "Waveform Mode Differences",
      "description": "Deep Purge runs an 8-phase multi-tone cycle for stubborn ghosting, while Regal and A2 offer faster, lighter cleanses."
    },
    {
      "label": "Microcapsule Contrast Restoration",
      "description": "Check if the background white field becomes crisper and black text gains higher optical contrast after refreshing."
    },
    {
      "label": "Border and Edge Ghosting",
      "description": "Inspect screen edges where ghosting tends to accumulate most heavily due to weaker edge electric fields."
    }
  ],
  "canObserve": [
    "Execution of high-contrast full-field polarity inversion sequences",
    "Comparison between multi-phase Deep Purge, Regal, and A2 waveform timings",
    "Visual clearing of electronic ink residual shadows and pigment retention"
  ],
  "cannotMeasure": [
    "Microcapsule physical fluid viscosity or electrophoresis velocity",
    "Manufacturer proprietary hardware waveform lookup tables (LUTs) in e-paper T-CON flash",
    "Physical e-paper frontlight color temperature and uniformity"
  ],
  "interpretation": "Running a Deep Purge cycle every 15–30 minutes during heavy e-ink monitor use keeps text crisp and prevents irreversible microcapsule charge polarization.",
  "nextSteps": {
    "text": "Test your display's text rendering and subpixel font clarity.",
    "actionLabel": "Launch Text Clarity Test",
    "actionHref": "/tests/text-clarity-test"
  }
},
};
