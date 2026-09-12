import { ExplainerData, ExplainerLabels } from "./types";

export const ES_LABELS: ExplainerLabels = {
  overviewHeading: "Descripción General de la Inspección",
  whatToLookForHeading: "Qué Buscar Durante la Inspección",
  boundariesHeading: "Límites de Medición y Honestidad Técnica",
  canObserveLabel: "Lo Que Screen Tester Puede Observar",
  cannotMeasureLabel: "Lo Que el Navegador No Puede Medir con Precisión",
  interpretationHeading: "Interpretación de Sus Observaciones",
  nextStepsHeading: "Próximos Pasos Recomendados",
};

export const ES_EXPLAINERS: Record<string, ExplainerData> = {
  "dead-pixel-test": {
    overview: "Un píxel muerto es un subpíxel de cristal líquido o emisor OLED permanentemente apagado que permanece completamente negro independientemente de la señal. Sobre fondos claros, especialmente blanco puro, cian o amarillo, los píxeles muertos destacan como pequeños puntos oscuros inmóviles.",
    whatToLookFor: [
      {
        label: "Puntos negros estáticos sobre fondo claro",
        description: "Un punto negro diminuto que no cambia de color al alternar entre fondos brillantes indica un píxel muerto."
      },
      {
        label: "Diferenciar píxeles muertos de polvo",
        description: "El polvo sobre la pantalla cambia de posición al variar el ángulo de visión y puede limpiarse. Los píxeles muertos están detrás del filtro polarizador."
      },
      {
        label: "Defectos de subpíxel vs. píxel completo",
        description: "Si solo ha fallado un subpíxel (rojo, verde o azul), el punto aparecerá ligeramente descolorido en lugar de negro absoluto sobre blanco."
      },
      {
        label: "Grupos de píxeles muertos (Clusters)",
        description: "Varios píxeles muertos agrupados representan un defecto grave del panel y suelen dar derecho a reemplazo inmediato en garantía."
      }
    ],
    canObserve: [
      "Identificación visual de píxeles apagados sobre fondos sólidos primarios y secundarios",
      "Coordenadas exactas en pantalla y recuento de puntos oscuros sospechosos",
      "Contraste visual entre el brillo del fondo y los subpíxeles inactivos"
    ],
    cannotMeasure: [
      "Continuidad eléctrica o voltaje de los transistores de película fina (TFT)",
      "Detección automática sin inspección visual humana",
      "Clasificación física del defecto bajo las capas de vidrio del panel"
    ],
    interpretation: "Los píxeles muertos se originan por fallos en transistores durante la fabricación. La mayoría de fabricantes siguen la norma ISO 9241-307 Clase 2, que tolera habitualmente entre 2 y 5 defectos por millón de píxeles.",
    nextSteps: {
      text: "¿Ha detectado subpíxeles que permanecen encendidos en lugar de negros? Utilice nuestra herramienta de estimulación.",
      actionLabel: "Abrir Stuck Pixel Fixer",
      actionHref: "/tests/stuck-pixel-fixer"
    }
  },

  "stuck-pixel-test": {
    overview: "A diferencia de un píxel muerto, un píxel atascado permanece encendido continuamente debido a que la celda de cristal líquido se ha quedado abierta. Aparece como un punto brillante fijo (rojo, verde, azul, cian o blanco), claramente visible sobre fondo negro.",
    whatToLookFor: [
      {
        label: "Puntos brillantes sobre negro puro",
        description: "Inspeccione la pantalla negra en una habitación a oscuras. Cualquier punto que brille en rojo, verde o azul es un subpíxel atascado."
      },
      {
        label: "Prueba con colores complementarios",
        description: "Un subpíxel verde atascado desaparecerá sobre fondo verde, pero brillará intensamente sobre fondo rojo, azul o negro."
      },
      {
        label: "Píxeles blancos permanentes",
        description: "Si los tres subpíxeles (RGB) están abiertos a la vez, el defecto se muestra como un punto blanco fijo sobre fondo oscuro."
      },
      {
        label: "Distinción frente a fugas de luz",
        description: "Los píxeles atascados son puntos individuales nítidos; las fugas de luz producen halos difusos en los bordes del marco."
      }
    ],
    canObserve: [
      "Identificación visual de subpíxeles encendidos sobre fondos negros y complementarios",
      "Aislamiento de canales de color afectados (rojo, verde o azul)",
      "Mapeo de cuadrantes de pantalla con defectos activos"
    ],
    cannotMeasure: [
      "Viscosidad química o estado de alineación molecular de los cristales líquidos",
      "Resistencia eléctrica o velocidad de conmutación de la puerta del transistor",
      "Garantía de permanencia del defecto sin un periodo de observación prolongado"
    ],
    interpretation: "Los píxeles atascados ocurren cuando las moléculas de cristal líquido quedan bloqueadas por cargas electrostáticas o tolerancias de fabricación. A diferencia de los píxeles muertos, a menudo pueden desbloquearse mediante estimulación cromática rápida.",
    nextSteps: {
      text: "¿Ha localizado un píxel atascado? Intente reanimarlo con nuestro ejercitador de colores.",
      actionLabel: "Probar Stuck Pixel Fixer",
      actionHref: "/tests/stuck-pixel-fixer"
    }
  },

  "stuck-pixel-fixer": {
    overview: "El Stuck Pixel Fixer utiliza patrones de cambio rápido de color y ruido cromático de alta frecuencia para forzar la conmutación de los cristales líquidos, intentando desbloquear el subpíxel atascado.",
    whatToLookFor: [
      {
        label: "Alineación del recuadro de estimulación",
        description: "Coloque el recuadro interactivo directamente sobre el píxel atascado para evitar parpadeos molestos en el resto del monitor."
      },
      {
        label: "Selección del patrón",
        description: "Alterne entre Ciclo RGB y Ruido de Color para aplicar diferentes frecuencias de estimulación visual."
      },
      {
        label: "Duración de la sesión",
        description: "Mantenga la estimulación entre 15 y 30 minutos; luego pause y revise sobre fondo negro si el píxel ha recuperado su funcionamiento normal."
      },
      {
        label: "Aviso de sensibilidad visual",
        description: "Detenga la herramienta de inmediato si experimenta mareos o fatiga visual. No utilizar en caso de fotosensibilidad."
      }
    ],
    canObserve: [
      "Reproducción en tiempo real de secuencias RGB de alta velocidad y patrones de ruido directamente en el navegador",
      "Posicionamiento exacto y control de temporizador por sesión",
      "Confirmación visual de si el píxel responde antes y después de la estimulación"
    ],
    cannotMeasure: [
      "Reparación física de transistores TFT quemados o circuitos dañados",
      "Porcentaje garantizado de éxito (depende de la causa física del panel)",
      "Recuperación de píxeles muertos (totalmente negros sin alimentación)"
    ],
    interpretation: "Las herramientas por software solo actúan sobre cristales líquidos mecánicamente encallados. Si el transistor está roto o el circuito quemado, la estimulación visual no podrá resolverlo.",
    nextSteps: {
      text: "Una vez finalizada la sesión, compruebe el resultado sobre fondo negro con la prueba de píxeles atascados.",
      actionLabel: "Verificar con Stuck Pixel Test",
      actionHref: "/tests/stuck-pixel-test"
    }
  },

  "refresh-rate-test": {
    overview: "La frecuencia de actualización (en hercios, Hz) mide cuántas veces por segundo se redibuja la imagen en pantalla. Este test utiliza la API de animación del navegador (requestAnimationFrame) para calcular la tasa de entrega de fotogramas y verificar si coincide con la configuración del sistema operativo.",
    whatToLookFor: [
      {
        label: "Frecuencia observada vs. configurada",
        description: "Compruebe que el valor medido coincide con la tasa fijada en su monitor (ej. 60Hz, 120Hz, 144Hz o 240Hz)."
      },
      {
        label: "Estabilidad de fotogramas (Frame Pacing)",
        description: "En un monitor de 144Hz estable, los fotogramas deben entregarse en intervalos consistentes de aproximadamente 6,94 ms."
      },
      {
        label: "Límite del navegador a 60Hz",
        description: "Si su pantalla de 144Hz se queda clavada en 60Hz, puede deberse a modos de ahorro de energía o aceleración por hardware desactivada."
      },
      {
        label: "Fluidez de la barra de movimiento",
        description: "En monitores con alta tasa de refresco, el elemento móvil debe desplazarse sin saltos ni tirones perceptibles."
      }
    ],
    canObserve: [
      "Frecuencia y variación temporal de las llamadas requestAnimationFrame del navegador",
      "FPS de animación calculados y consistencia de sincronización vertical",
      "Comportamiento de sincronización del compositor en la pestaña activa"
    ],
    cannotMeasure: [
      "Frecuencia de refresco interna del panel independiente del navegador",
      "Ancho de banda físico o protocolo de enlace de cables HDMI o DisplayPort",
      "Intervalos de borrado vertical (VBLANK) u osciloscopio de sincronización"
    ],
    interpretation: "Los navegadores web sincronizan sus bucles gráficos con el compositor del sistema operativo. Perfiles de ahorro de batería o configuraciones multimonitor con diferentes hercios pueden limitar el navegador a 60Hz.",
    nextSteps: {
      text: "¿Su monitor gaming se muestra limitado a 60Hz en el navegador? Consulte nuestra guía de configuración.",
      actionLabel: "Guía de Frecuencia de Actualización",
      actionHref: "/knowledge-base/troubleshooting#refresh-rate-capped"
    }
  },

  "ghosting-test": {
    overview: "El ghosting se manifiesta como estelas o sombras borrosas detrás de objetos en movimiento. Ocurre cuando los píxeles tardan más tiempo en cambiar de color (tiempo de respuesta) del que dura un fotograma en pantalla.",
    whatToLookFor: [
      {
        label: "Estelas oscuras (Ghosting tradicional)",
        description: "Sombras oscuras detrás de objetos móviles indican transiciones lentas de oscuro a claro, muy comunes en paneles VA."
      },
      {
        label: "Halos claros o coronas (Ghosting inverso)",
        description: "Estelas brillantes o blancas indican que el ajuste de Overdrive o Tiempo de Respuesta del monitor es demasiado agresivo (overshoot)."
      },
      {
        label: "Tiempo de respuesta por color",
        description: "Compruebe si el efecto es más acusado sobre fondos rojos, verdes o grises oscuros; las transiciones varían según los tonos."
      },
      {
        label: "Seguimiento ocular vs. panel",
        description: "Siga el objeto con la mirada para aislar el desenfoque retiniano del arrastre real producido por los cristales líquidos."
      }
    ],
    canObserve: [
      "Aparición visual de estelas y coronas a diferentes velocidades de desplazamiento",
      "Diferencias de respuesta entre contrastes claro-sobre-oscuro y oscuro-sobre-claro",
      "Efecto inmediato al modificar los ajustes de Overdrive en el menú OSD del monitor"
    ],
    cannotMeasure: [
      "Tiempo de respuesta Gris a Gris (GtG) exacto en milisegundos bajo normas de laboratorio",
      "Curvas de decaimiento lumínico mediante cámara de seguimiento óptico (Pursuit Camera)",
      "Voltajes internos de conmutación de subpíxeles"
    ],
    interpretation: "El ghosting está directamente ligado al tipo de panel (TN es rápido pero con colores pobres, IPS es equilibrado, VA tiende a estelas oscuras y OLED cambia casi de inmediato). Un ajuste medio de Overdrive suele ofrecer el mejor equilibrio.",
    nextSteps: {
      text: "¿Desea aprender a calibrar el Overdrive y eliminar las coronas de ghosting inverso?",
      actionLabel: "Guía de Ghosting y Desenfoque",
      actionHref: "/knowledge-base/monitor-ghosting-and-motion-blur"
    }
  },

  "motion-blur-test": {
    overview: "A diferencia del ghosting, el desenfoque de movimiento en paneles planos modernos se debe principalmente al principio de retención (Sample-and-Hold): como la imagen permanece estática hasta el siguiente fotograma, el ojo humano crea desenfoque al seguir el movimiento.",
    whatToLookFor: [
      {
        label: "Pérdida de detalle a alta velocidad",
        description: "Observe líneas finas y textos al desplazarse. Fíjese a qué velocidad los detalles empiezan a emborronarse."
      },
      {
        label: "Comparación de velocidades",
        description: "Compare desplazamientos a 240 px/s frente a 960 px/s para evaluar cómo la velocidad agrava el desenfoque retiniano."
      },
      {
        label: "Efecto de la inserción de cuadros negros (BFI)",
        description: "Si su monitor cuenta con reducción de desenfoque por parpadeo (ULMB, ELMB, DyAc), actívelo para apreciar un salto en nitidez."
      },
      {
        label: "Sample-and-Hold en paneles OLED",
        description: "Incluso con 0,1ms de respuesta instantánea, a 60Hz o 120Hz sin parpadeo se produce desenfoque por retención ocular."
      }
    ],
    canObserve: [
      "Variaciones en la nitidez percibida según la velocidad de desplazamiento y los hercios del monitor",
      "Mejoras de claridad al activar tecnologías de estroboscopado de retroiluminación (BFI)",
      "Diferencia entre bordes estáticos nítidos y contornos móviles borrosos"
    ],
    cannotMeasure: [
      "Tiempo de respuesta de imagen en movimiento (MPRT) en milisegundos exactos",
      "Curvas de integración de luz en la retina humana",
      "Ciclo de trabajo porcentual del estroboscopado del monitor"
    ],
    interpretation: "Para reducir el desenfoque por retención se requieren tasas de refresco más altas (menor tiempo de exposición por fotograma) o inserción de intervalos oscuros (Backlight Strobing / BFI).",
    nextSteps: {
      text: "Compruebe con la prueba de refresco cómo mayores hercios atenúan el desenfoque de movimiento.",
      actionLabel: "Probar Frecuencia de Refresco",
      actionHref: "/tests/refresh-rate-test"
    }
  },

  "vrr-test": {
    overview: "La frecuencia de actualización variable (VRR: NVIDIA G-Sync, AMD FreeSync, VESA Adaptive-Sync) sincroniza dinámicamente los ciclos del monitor con la velocidad de la tarjeta gráfica para eliminar cortes y tirones.",
    whatToLookFor: [
      {
        label: "Líneas de corte (Screen Tearing)",
        description: "Busque cortes horizontales donde la parte superior e inferior de la imagen muestran fotogramas desalineados."
      },
      {
        label: "Tirones y microparones (Stutter / Judder)",
        description: "Observe si el indicador se desplaza con total suavidad o da pequeños saltos cuando la tasa de renderizado fluctúa."
      },
      {
        label: "VRR en modo ventana vs. pantalla completa",
        description: "Muchos controladores de tarjeta gráfica solo activan G-Sync o FreeSync en pantalla completa salvo que se configure expresamente."
      },
      {
        label: "Compensación de bajas tasas (LFC)",
        description: "Si los fotogramas caen por debajo del rango mínimo del monitor (ej. 48Hz), compruebe si se duplican sin tirones."
      }
    ],
    canObserve: [
      "Percepción visual de líneas de tearing y microtirones con velocidades de cuadro variables",
      "Continuidad y suavidad del movimiento bajo variaciones de fotogramas",
      "Diferencias de fluidez entre ejecución en ventana y pantalla completa"
    ],
    cannotMeasure: [
      "Comunicación directa a bajo nivel entre el driver de la GPU y el procesador del monitor",
      "Estado de activación del módulo físico G-Sync o FreeSync",
      "Metadatos en tiempo real transmitidos por los canales auxiliares de DisplayPort"
    ],
    interpretation: "Dado que el navegador opera dentro del gestor de ventanas del sistema operativo, el funcionamiento de VRR depende de opciones como la programación acelerada por hardware (HAGS) y la configuración del driver.",
    nextSteps: {
      text: "¿Experimenta tirones o desgarros de pantalla? Revise nuestra guía de resolución de problemas de VRR.",
      actionLabel: "Guía de Resolución de VRR",
      actionHref: "/knowledge-base/troubleshooting#vrr-stutter-tearing"
    }
  },

  "backlight-bleed-test": {
    overview: "Las fugas de luz (backlight bleed) ocurren en pantallas LCD cuando la luz de fondo escapa por los bordes o esquinas debido a presión o desajustes en el marco. Este test en negro absoluto permite identificar fugas y distinguirlas del brillo angular propio de los paneles IPS (IPS Glow).",
    whatToLookFor: [
      {
        label: "Fugas en bordes y esquinas",
        description: "Zonas amarillentas o blanquecinas a lo largo del borde que no cambian de intensidad al mover la cabeza."
      },
      {
        label: "IPS Glow vs. Backlight Bleed",
        description: "Muévase lateralmente: si el resplandor cambia de posición o intensidad según su ángulo, es IPS Glow normal, no una fuga física."
      },
      {
        label: "Efecto nube (Clouding)",
        description: "Manchas difusas y desiguales sobre el panel causadas por tensiones mecánicas o láminas difusoras irregulares."
      },
      {
        label: "Comparativa con OLED y Mini-LED",
        description: "Los paneles OLED emiten luz píxel a píxel con 0 nits y cero fugas. Los Mini-LED pueden mostrar halos alrededor de elementos brillantes."
      }
    ],
    canObserve: [
      "Fugas de luz visibles en bordes y puntos de presión del marco sobre fondo negro",
      "Patrones de luminosidad desigual en entornos totalmente oscurecidos",
      "Dependencia del ángulo de visión para diferenciar fugas reales de brillo IPS Glow"
    ],
    cannotMeasure: [
      "Luminancia absoluta del panel en cd/m² (nits) sin instrumental óptico",
      "Relación de contraste estático nativo (ej. 1000:1 frente a 3000:1)",
      "Certificación formal de contraste ANSI de 16 zonas"
    ],
    interpretation: "Un brillo moderado (IPS Glow) es una propiedad óptica natural de los paneles IPS. Las fugas de luz severas, en cambio, son defectos de ensamblaje en los que el bisel comprime el panel.",
    nextSteps: {
      text: "Conozca las diferencias clave entre IPS Glow, fugas de luz y negros puros OLED.",
      actionLabel: "Leer Guía Backlight Bleed vs IPS Glow",
      actionHref: "/knowledge-base/backlight-bleed-vs-ips-glow"
    }
  },

  "near-black-test": {
    overview: "La prueba de casi negro evalúa la capacidad del monitor para distinguir tonos grises muy oscuros justo por encima del negro absoluto (del 0,5% al 5% de luminancia). Si el monitor comprime estos tonos (Black Crush), se pierden detalles vitales en sombras de películas y juegos.",
    whatToLookFor: [
      {
        label: "Black Crush (Aplastamiento de sombras)",
        description: "Si el primer recuadro (0,5% o 1%) no se distingue del fondo negro, su monitor está aplastando los detalles oscuros."
      },
      {
        label: "Distinción entre niveles contiguos",
        description: "En una habitación a oscuras, debe ser capaz de apreciar la línea divisoria entre los distintos parches de gris bajo."
      },
      {
        label: "Cambio de gamma por ángulo en paneles VA",
        description: "En paneles VA, los detalles oscuros a menudo solo se hacen visibles al mirar la pantalla con una ligera inclinación."
      },
      {
        label: "Reflejos de luz ambiental",
        description: "La luz de la habitación reduce enormemente la capacidad del ojo para ver tonos casi negros; apague las luces para mayor precisión."
      }
    ],
    canObserve: [
      "Umbrales de visibilidad para parches de gris de 0,5%, 1%, 2%, 3%, 4% y 5%",
      "Separación perceptual de detalles en escenas oscuras",
      "Influencia de ajustes como Gamma, Black Equalizer y Rango Dinámico HDMI"
    ],
    cannotMeasure: [
      "Valores de luminancia por debajo de 0,05 nits sin un sensor fotométrico de precisión",
      "Conformidad estricta con curvas gamma matemáticas (BT.1886 vs. 2.2)",
      "Punto de negro nativo absoluto del panel en cd/m²"
    ],
    interpretation: "El aplastamiento de negros suele deberse a un rango dinámico erróneo en la GPU (Limitado 16–235 en vez de Completo 0–255) o a modos de contraste dinámico excesivos.",
    nextSteps: {
      text: "¿Pierde detalles en sombras oscuras? Siga nuestra guía para corregir el Black Crush.",
      actionLabel: "Guía de Corrección de Black Crush",
      actionHref: "/knowledge-base/troubleshooting#black-crush"
    }
  },

  "gradient-banding-test": {
    overview: "Los degradados continuos requieren transiciones tonales precisas. Si el panel, la tarjeta gráfica o el perfil de color carecen de suficiente profundidad de bits, los degradados suaves se rompen en escalones visibles o líneas marcadas (banding / posterización).",
    whatToLookFor: [
      {
        label: "Líneas de escalonamiento visibles",
        description: "Observe si aparecen franjas o cortes bruscos en lugar de un paso fluido entre colores en las rampas de gris y RGB."
      },
      {
        label: "Banding específico por canal de color",
        description: "Compruebe si el efecto es más evidente en tonos azules o zonas oscuras que en la escala general de grises."
      },
      {
        label: "Profundidad de bits y dithering FRC",
        description: "Los paneles de 8 y 10 bits reales ofrecen transiciones suaves; los de 6 bits con FRC suelen mostrar granulado o saltos visibles."
      },
      {
        label: "Rango dinámico completo vs. limitado",
        description: "Si la GPU envía señal 'Limitada' (16–235), los extremos oscuros y claros del degradado quedarán abruptamente recortados."
      }
    ],
    canObserve: [
      "Presencia visual de franjas de banding en degradados monocromáticos y de color",
      "Comparación entre degradados horizontales, verticales y por canales primarios",
      "Artefactos generados por perfiles de color ICC agresivos o rango dinámico limitado"
    ],
    cannotMeasure: [
      "Profundidad de bits física del panel sin depender de los datos del controlador",
      "Valores medibles de desviación Delta E entre franjas adyacentes",
      "Algoritmos internos de dithering espacial integrados en el procesador del monitor"
    ],
    interpretation: "El banding puede derivar de paneles de 6 bits, ajustes de rango dinámico incompleto en el driver o calibraciones que recortan valores cromáticos.",
    nextSteps: {
      text: "¿Desea simular saltos de 6 bits, 8 bits y algoritmos de dithering? Pruebe nuestra herramienta especializada.",
      actionLabel: "Probar Simulación de Bits y Dither",
      actionHref: "/tests/color-banding-test"
    }
  },

  "uniformity-test": {
    overview: "La uniformidad evalúa si el brillo y la temperatura de color se mantienen homogéneos en toda la superficie de la pantalla. Irregularidades en las láminas difusoras causan esquinas oscuras o el Efecto Pantalla Sucia (DSE).",
    whatToLookFor: [
      {
        label: "Viñeteado en esquinas y bordes",
        description: "Inspeccione con fondos gris al 25%, 50% y 75% si los laterales y esquinas están visiblemente más apagados que el centro."
      },
      {
        label: "Efecto Pantalla Sucia (DSE)",
        description: "Patrones turbios o manchas tenues que destacan al desplazar la vista sobre fondos de color uniforme."
      },
      {
        label: "Desviaciones de temperatura de color",
        description: "Compruebe si un lado de la pantalla parece más cálido (rojizo/amarillo) y el opuesto más frío (azulado)."
      },
      {
        label: "Comparativa en cuadrícula 5x5",
        description: "Compare los bloques de la cuadrícula para evaluar la pérdida de luminosidad desde el centro hacia los bordes."
      }
    ],
    canObserve: [
      "Caídas de brillo visuales, oscurecimiento periférico y puntos calientes en fondos grises y blancos",
      "Diferencias perceptibles de temperatura de color entre áreas del panel",
      "Inspección en múltiples niveles normalizados de luminosidad"
    ],
    cannotMeasure: [
      "Porcentajes exactos de uniformidad (ej. '98,5% uniforme') sin espectrofotómetros calibrados multipunto",
      "Variaciones exactas de temperatura de color en grados Kelvin a lo largo del panel",
      "Estado de activación de los circuitos de compensación digital de uniformidad (DUC)"
    ],
    interpretation: "En monitores de consumo es habitual encontrar caídas de brillo de entre el 10% y el 15% hacia los bordes. Los monitores profesionales utilizan circuitos DUC para mantenerse por debajo del 5% de desviación.",
    nextSteps: {
      text: "Conozca las causas del efecto pantalla sucia y los criterios para reclamar en garantía.",
      actionLabel: "Guía de Uniformidad de Pantalla",
      actionHref: "/knowledge-base/backlight-bleed-vs-ips-glow"
    }
  },

  "text-clarity-test": {
    overview: "La nitidez del texto depende de la densidad de píxeles (PPI), el escalado del sistema operativo, la distribución física de subpíxeles (RGB, BGR, QD-OLED) y los motores de suavizado tipográfico.",
    whatToLookFor: [
      {
        label: "Halos de color en bordes de letras",
        description: "Bordes rojizos o azulados en trazos verticales indican desajustes entre la estructura de subpíxeles y el suavizado del sistema."
      },
      {
        label: "Estructura BGR invertida",
        description: "Algunos monitores utilizan subpíxeles BGR en vez de RGB; sin reconfigurar ClearType en Windows, las letras se ven borrosas."
      },
      {
        label: "Bordes coloreados en paneles OLED",
        description: "Las distribuciones triangulares en paneles QD-OLED o WOLED generan finas líneas verdes o magenta en bordes horizontales."
      },
      {
        label: "Pérdida de nitidez por escalado fraccionario",
        description: "Escalados como 125% o 150% pueden producir ligera borrosidad en aplicaciones de escritorio antiguas."
      }
    ],
    canObserve: [
      "Aparición visual de halos de color en contornos tipográficos desde 8px hasta 32px",
      "Diferencias de renderizado entre fuentes con serifa, palo seco e inversión de contraste",
      "Efecto del zoom del navegador y del escalado del sistema sobre la definición de texto"
    ],
    cannotMeasure: [
      "Estructura microscópica de subpíxeles sin lente macro o microscopio",
      "Configuración interna de directivas de renderizado DirectWrite o ClearType",
      "Función de transferencia de modulación óptica (MTF) del monitor"
    ],
    interpretation: "Si las letras se aprecian borrosas o con bordes coloreados, ejecutar el asistente de ClearType en Windows suele corregir las discrepancias con paneles BGR.",
    nextSteps: {
      text: "¿Texto poco nítido o con bordes de color? Siga nuestra guía para calibrar ClearType y el escalado.",
      actionLabel: "Guía de Claridad de Texto",
      actionHref: "/knowledge-base/troubleshooting#blurry-text-scaling"
    }
  },

  "hdr-test": {
    overview: "Las pantallas HDR ofrecen picos de brillo más altos y una gama de colores ampliada. Este test comprueba la compatibilidad HDR en el navegador y evalúa el mapeo de tonos y el recorte en altas luces.",
    whatToLookFor: [
      {
        label: "Detección de HDR en el navegador",
        description: "Compruebe que se notifica '(dynamic-range: high)' como activo. Si no, active HDR en los ajustes de su sistema operativo."
      },
      {
        label: "Conservación de detalles en blancos extremos",
        description: "En las tarjetas del 90%, 94%, 97% y 99% de blanco, los símbolos internos deben mantenerse discernibles del fondo."
      },
      {
        label: "Recorte de altas luces (Clipping)",
        description: "Si los parches del 94% al 100% se funden en un solo blanco uniforme, el monitor recorta en vez de mapear tonos con precisión."
      },
      {
        label: "Amplitud de la gama de color",
        description: "Compruebe si los tonos saturados se perciben con mayor viveza que en contenidos estándar SDR."
      }
    ],
    canObserve: [
      "Respuestas de la API del navegador sobre alto rango dinámico y profundidad de color",
      "Separación visual de matices brillantes hasta el blanco de máxima intensidad",
      "Visibilidad de detalles en sombras en parches de prueba HDR"
    ],
    cannotMeasure: [
      "Luminancia máxima real en cd/m² (nits) sin instrumental físico de medición",
      "Cumplimiento oficial de niveles VESA DisplayHDR (ej. DisplayHDR 400 vs. 1000)",
      "Seguimiento electroóptico estricto de la curva PQ (ST 2084 EOTF)"
    ],
    interpretation: "Muchos monitores 'HDR400' no disponen de atenuación local (local dimming) ni superan el brillo de SDR, lo que puede provocar imágenes lavadas o descoloridas al activar HDR.",
    nextSteps: {
      text: "¿El contenido HDR se ve apagado o sobreexpuesto? Consulte nuestra guía de configuración.",
      actionLabel: "Troubleshooting de HDR",
      actionHref: "/knowledge-base/troubleshooting#hdr-not-working"
    }
  },

  "resolution-checker": {
    overview: "Los sistemas operativos aplican factores de escala para mantener interfaces legibles en pantallas densas, creando una diferencia entre píxeles lógicos CSS y píxeles físicos del panel. Esta herramienta comprueba resoluciones, DPR y área útil.",
    whatToLookFor: [
      {
        label: "Resolución nativa vs. lógica",
        description: "Una pantalla 4K con 150% de escala reporta 2560×1440 píxeles CSS con un DPR de 1,5, sumando 3840×2160 píxeles físicos reales."
      },
      {
        label: "Relación de píxeles del dispositivo (DPR)",
        description: "El multiplicador de escala entre píxeles de diseño y puntos físicos (ej. 1,0 = 100%, 1,25 = 125%, 2,0 = 200%)."
      },
      {
        label: "Espacio de escritorio disponible",
        description: "Screen.availWidth y availHeight muestran el área neta tras descontar la barra de tareas o el dock del sistema."
      },
      {
        label: "Tamaño de ventana vs. pantalla completa",
        description: "Window.innerWidth/innerHeight indica el tamaño de la ventana activa, diferenciado de la resolución total del monitor."
      }
    ],
    canObserve: [
      "Dimensiones de pantalla según el navegador (screen.width, screen.height, availWidth/Height)",
      "Factor de escala (devicePixelRatio) y resolución calculada de renderizado físico",
      "Dimensiones del viewport de diseño en CSS y orientación de pantalla"
    ],
    cannotMeasure: [
      "Matriz física del panel si la GPU o un escalador externo reescala la señal de entrada",
      "Compresiones de resolución forzadas por tarjetas capturadoras o televisores",
      "Relación de aspecto física cuando se fuerzan modos de píxel no cuadrado por hardware"
    ],
    interpretation: "Si la resolución reportada no coincide con las especificaciones del fabricante, revise el ajuste de Escala en la configuración de pantalla de Windows; volver al 100% restablece la lectura 1:1.",
    nextSteps: {
      text: "Compare resoluciones de pantalla, diagonales y densidad PPI con nuestra herramienta interactiva.",
      actionLabel: "Comparar Pantallas y Calcular PPI",
      actionHref: "/tests/compare-displays"
    }
  },

  "display-info": {
    overview: "Su navegador web recopila información sobre la pantalla activa, el tamaño de ventana, la profundidad de color y las capacidades táctiles. Este panel reúne todos los datos accesibles en una sola vista.",
    whatToLookFor: [
      {
        label: "Profundidad de color informada",
        description: "Screen.colorDepth indica los bits por canal (habitualmente 24 bits para 8 bits RGB o 30 bits para 10 bits)."
      },
      {
        label: "Puntos de contacto táctiles",
        description: "Navigator.maxTouchPoints señala si el navegador detecta un digitalizador táctil activo en el dispositivo."
      },
      {
        label: "Restricciones multimonitor",
        description: "Las políticas de seguridad impiden al navegador consultar modelos o números de serie sin permisos especiales de gestión de ventanas."
      },
      {
        label: "Sincronización de fotogramas",
        description: "La telemetría del reloj de animación proporciona una estimación de la entrega de cuadros en la pestaña activa."
      }
    ],
    canObserve: [
      "Parámetros estandarizados DOM de Screen, Window, Navigator y Media Queries",
      "Relación de píxeles del dispositivo, profundidad de color y orientación",
      "Capacidad de punteros y soporte de eventos táctiles"
    ],
    cannotMeasure: [
      "Número de serie o modelo EDID del monitor sin autorizaciones avanzadas",
      "Ancho de banda real de la conexión por cable HDMI o DisplayPort",
      "Frecuencia nativa de refresco del panel al margen de las restricciones del sistema"
    ],
    interpretation: "Las aplicaciones web se ejecutan en un entorno seguro aislado. Los valores reflejan los datos que el sistema operativo y el gestor de ventanas facilitan al navegador.",
    nextSteps: {
      text: "¿Desea comprobar la geometría y la relación de aspecto de su pantalla? Pruebe el test de escala.",
      actionLabel: "Probar Escala y Relación de Aspecto",
      actionHref: "/tests/scaling-aspect-test"
    }
  },

  "scaling-aspect-test": {
    overview: "Ajustes de relación de aspecto incorrectos en la GPU o el monitor pueden deformar círculos en óvalos y restar nitidez a la imagen. Este test utiliza geometrías de referencia (círculos y cuadros) junto a guías de aspecto (16:9, 16:10, 21:9, 4:3) para asegurar píxeles 1:1 perfectamente cuadrados.",
    whatToLookFor: [
      {
        label: "Circularidad geométrica",
        description: "Compruebe que el círculo central sea totalmente redondo. Si se percibe achatado u ovalado, la relación de aspecto está desajustada."
      },
      {
        label: "Píxeles cuadrados (1:1)",
        description: "Revise la cuadrícula del tablero: cada recuadro debe medir exactamente lo mismo de ancho que de alto."
      },
      {
        label: "Ajuste a los marcos de aspecto",
        description: "Verifique si el área de visualización coincide con los límites estándar de 16:9 (panorámico), 16:10 o 21:9 (ultrapanorámico)."
      },
      {
        label: "Modo de escalado de la GPU",
        description: "Si aparecen bandas negras con la resolución nativa, revise las opciones de escalado en el panel de control de su tarjeta gráfica."
      }
    ],
    canObserve: [
      "Geometría visual de círculos y cuadrículas en el viewport del navegador",
      "Alineación con marcos de referencia en proporciones 16:9, 16:10, 21:9 y 4:3",
      "Cálculo de la relación de aspecto del área visible de la ventana"
    ],
    cannotMeasure: [
      "Dimensiones en milímetros del bisel físico del monitor",
      "Deformaciones ópticas anamórficas provocadas por lentes de proyectores",
      "Modos de relación de aspecto forzados internamente por procesadores de vídeo externos"
    ],
    interpretation: "Las distorsiones de imagen ocurren con frecuencia al seleccionar resoluciones no nativas sin activar la casilla 'Mantener relación de aspecto' en el panel de control de NVIDIA, AMD o Intel.",
    nextSteps: {
      text: "¿Tiene el ordenador conectado a un televisor? Compruebe posibles recortes en los bordes con la prueba de overscan.",
      actionLabel: "Probar Overscan de TV",
      actionHref: "/tests/tv-overscan-test"
    }
  },

  "compare-displays": {
    overview: "La diagonal, la resolución y la densidad de píxeles (PPI) determinan el espacio de trabajo y la nitidez visual. Esta herramienta calcula dimensiones físicas, recuento total de píxeles y densidades para comparar dos pantallas en paralelo.",
    whatToLookFor: [
      {
        label: "Densidad de píxeles (PPI)",
        description: "A mayor PPI, mayor nitidez en textos. ~110 PPI es el estándar en monitores de escritorio; ~220 PPI equivale a nitidez de clase Retina."
      },
      {
        label: "Anchura y altura físicas",
        description: "Compare el área útil real: un monitor de 27 pulgadas 16:9 tiene bastante más altura vertical que uno ultrapanorámico de 29 pulgadas (21:9)."
      },
      {
        label: "Recuento total de píxeles",
        description: "Una pantalla 4K (8,29 megapíxeles) contiene cuatro veces más píxeles que una pantalla estándar Full HD de 1080p (2,07 megapíxeles)."
      },
      {
        label: "Distancia óptima de visualización",
        description: "Un PPI más elevado permite sentarse más cerca sin percibir la rejilla física entre píxeles (efecto mosquitera)."
      }
    ],
    canObserve: [
      "Cálculo matemático de PPI, relaciones de aspecto y superficies según los datos introducidos",
      "Comparación visual proporcional del tamaño relativo entre dos configuraciones de pantalla",
      "Cálculo del tamaño de punto (Dot Pitch en milímetros)"
    ],
    cannotMeasure: [
      "Lectura física de la diagonal de un monitor sin que el usuario introduzca sus pulgadas",
      "Detección óptica automática del tamaño del panel mediante APIs de navegador",
      "Grosor de los marcos o medidas de la peana del monitor"
    ],
    interpretation: "La densidad de píxeles se calcula mediante el teorema de Pitágoras dividiendo la resolución diagonal entre las pulgadas reales. Al no estar disponible en las lecturas estándar del navegador, requiere la entrada del usuario.",
    nextSteps: {
      text: "Descubra cómo influye la densidad de píxeles en la claridad del texto según el sistema operativo.",
      actionLabel: "Guía de Claridad de Texto",
      actionHref: "/knowledge-base/text-clarity-and-subpixel-rendering"
    }
  },

  "tv-overscan-test": {
    overview: "El overscan es un estándar heredado de los televisores antiguos que recorta entre el 2% y el 5% de los bordes exteriores de la imagen haciéndole zoom. Al conectar un PC o consola, este recorte oculta la barra de tareas y emborrona el texto al anular el mapeo 1:1 de píxeles.",
    whatToLookFor: [
      {
        label: "Visibilidad de la línea del 0%",
        description: "Si no puede ver el marco blanco exterior ni las flechas con la indicación '0%', su televisor tiene el overscan activo recortando la imagen."
      },
      {
        label: "Marcas porcentuales de recorte",
        description: "Compruebe qué línea coincide con el marco de su televisor (2,5% o 5%) para cuantificar la porción de escritorio que se está perdiendo."
      },
      {
        label: "Puntas de mira en las esquinas",
        description: "Las cruces de las cuatro esquinas deben finalizar justo en el borde físico del panel de su televisor."
      },
      {
        label: "Nitidez de mapeo 1:1",
        description: "Observe el patrón de damero de 1 píxel: si parpadea o se ve borroso, el televisor está reescalando e interpolando la imagen."
      }
    ],
    canObserve: [
      "Visibilidad de bordes exteriores y marcas de recorte porcentual (0%, 2,5%, 5%) en el perímetro",
      "Integridad del patrón de 1 píxel para detectar desenfoques provocados por escaladores",
      "Verificación visual antes y después de modificar los formatos de imagen en el menú del televisor"
    ],
    cannotMeasure: [
      "Control de los menús de configuración del televisor mediante software",
      "Detección automática de los formatos de relación de aspecto a través de HDMI-CEC",
      "Superposición física del bisel frente a recorte digital de la señal"
    ],
    interpretation: "Para disfrutar de texto nítido y recuperar todo el escritorio, acceda a los ajustes de Formato de Pantalla o Tamaño de Imagen de su TV y elija 'Solo escaneo', '1:1 Píxel', 'Ajuste de pantalla', 'Completo' o 'Punto a punto'.",
    nextSteps: {
      text: "¿Necesita ayuda para configurar el mapeo 1:1 en televisores Samsung, LG, Sony o TCL?",
      actionLabel: "Leer Guía de Overscan de TV",
      actionHref: "/knowledge-base/tv-overscan-and-pixel-mapping"
    }
  },

  "multi-touch-test": {
    overview: "Esta prueba registra contactos simultáneos en pantallas táctiles, tabletas y monitores interactivos. Visualiza coordenadas en tiempo real, cuenta puntos activos y confirma que los gestos con varios dedos se reciben correctamente en el navegador.",
    whatToLookFor: [
      {
        label: "Recuento de toques simultáneos",
        description: "Apoye varios dedos a la vez sobre el cristal. Compruebe si el contador reconoce con fiabilidad 2, 5 o 10 puntos de contacto."
      },
      {
        label: "Fluidez de seguimiento",
        description: "Deslice varios dedos por la superficie para comprobar que las trayectorias se registran sin saltos ni cortes."
      },
      {
        label: "Interferencia de gestos del sistema",
        description: "Fíjese si gestos de 3 o 4 dedos disparan funciones del sistema operativo (como cambiar de app) en lugar de registrarse en la prueba."
      },
      {
        label: "Rechazo de palma (Palm Rejection)",
        description: "Apoye la base de la mano en el cristal mientras toca con los dedos para evaluar cómo gestiona el panel las áreas de contacto extensas."
      }
    ],
    canObserve: [
      "Eventos táctiles y de puntero transmitidos en tiempo real a la ventana del navegador",
      "Coordenadas, identificadores y recuento total de contactos simultáneos",
      "Valor reportado por navigator.maxTouchPoints en el navegador"
    ],
    cannotMeasure: [
      "Frecuencia de sondeo del digitalizador en hercios (ej. muestreo táctil de 120Hz vs 240Hz)",
      "Niveles de presión capacitiva sin interfaces de hardware especializadas",
      "Defectos físicos en la malla de electrodos del digitalizador no notificados por el driver"
    ],
    interpretation: "El número de contactos simultáneos detectados depende del hardware del digitalizador y de las restricciones del controlador del sistema operativo.",
    nextSteps: {
      text: "¿Desea comprobar si hay zonas muertas y evaluar la continuidad de trazo en toda la superficie?",
      actionLabel: "Probar Superficie Táctil",
      actionHref: "/tests/touch-screen-test"
    }
  },

  "webcam-test": {
    overview: "Comprueba su cámara web directamente mediante la interfaz WebRTC del navegador (getUserMedia). Permite revisar la calidad del vídeo, verificar resoluciones compatibles (720p, 1080p, 4K), monitorizar la tasa de cuadros y resolver incidencias de permisos de forma local.",
    whatToLookFor: [
      {
        label: "Resolución del flujo de vídeo",
        description: "Compruebe que la resolución indicada se corresponde con la prometida por el fabricante (ej. 1920×1080 Full HD)."
      },
      {
        label: "Estabilidad de la tasa de fotogramas (FPS)",
        description: "Compruebe el contador de FPS. Con poca luz, muchas cámaras bajan a 15-20 FPS para ganar tiempo de exposición."
      },
      {
        label: "Equilibrio de color y exposición",
        description: "Observe si hay sobreexposición en rostros, balance de blancos con luz artificial y presencia de ruido digital en sombras."
      },
      {
        label: "Solicitudes de permisos de cámara",
        description: "Compruebe que el navegador solicita y conserva los permisos de acceso sin conflictos con otras aplicaciones."
      }
    ],
    canObserve: [
      "Reproducción de vídeo en tiempo real procesada de forma estrictamente local en su navegador",
      "Dimensiones de pista negociadas (ancho, alto) y tasa de fotogramas del flujo",
      "Nombres de dispositivo y capacidades a través de la interfaz MediaDeviceInfo"
    ],
    cannotMeasure: [
      "Resolución óptica nativa del sensor al margen de los controladores del sistema",
      "Coeficientes de aberración cromática o distorsión de lente del objetivo",
      "Sensibilidad lumínica calibrada en lux bajo distintas condiciones de iluminación"
    ],
    interpretation: "Los flujos de vídeo se negocian a través de los drivers de su sistema operativo. Si no puede seleccionar altas resoluciones, compruebe el ancho de banda del puerto USB o interruptores físicos de privacidad.",
    nextSteps: {
      text: "¿No se detecta la cámara o los permisos están bloqueados? Siga nuestra guía de solución de problemas.",
      actionLabel: "Guía de Problemas con la Webcam",
      actionHref: "/knowledge-base/troubleshooting#webcam-access-denied"
    }
  },

  "speaker-test": {
    overview: "Emplea la Web Audio API para comprobar altavoces, auriculares y equipos de sonido. Permite verificar la separación de canales estéreo (izquierdo, derecho y ambos) y ejecutar barridos de frecuencia (de 20Hz a 20.000Hz) para detectar distorsiones y vibraciones.",
    whatToLookFor: [
      {
        label: "Separación de canales estéreo",
        description: "Al reproducir el tono del canal izquierdo, el sonido debe provenir única y exclusivamente del altavoz o auricular izquierdo."
      },
      {
        label: "Respuesta en frecuencias bajas (20Hz–100Hz)",
        description: "Preste atención a las frecuencias subgraves. Los altavoces de portátiles suelen cortar por completo por debajo de 80–100Hz."
      },
      {
        label: "Límite en frecuencias agudas (10kHz–20kHz)",
        description: "Identifique a partir de qué frecuencia deja de percibir sonido, ya sea por límites del altavoz o por atenuación del oído humano."
      },
      {
        label: "Vibraciones y ruidos en la carcasa",
        description: "Los tonos medios-bajos (100Hz–300Hz) suelen delatar objetos sueltos en el escritorio o vibraciones en la caja del altavoz."
      }
    ],
    canObserve: [
      "Generación de tonos sintetizados y paneo estéreo en canales izquierdo, derecho y centro",
      "Barridos continuos de frecuencia a lo largo de todo el espectro audible humano (20Hz a 20.000Hz)",
      "Frecuencia de muestreo del AudioContext y capacidad de salida de la Web Audio API"
    ],
    cannotMeasure: [
      "Nivel de presión sonora (SPL en decibelios, dB) sin un micrófono de medición de laboratorio",
      "Distorsión armónica total (THD) o impedancia eléctrica de los transductores",
      "Curvas acústicas de respuesta en frecuencia de la sala de escucha"
    ],
    interpretation: "La prueba estéreo garantiza que la salida de audio no esté mezclándose erróneamente en mono. Los barridos de frecuencia ayudan a detectar conos dañados o resonancias no deseadas.",
    nextSteps: {
      text: "¿No hay sonido o los canales están invertidos? Consulte nuestra guía de problemas de audio.",
      actionLabel: "Guía de Problemas con Altavoces",
      actionHref: "/knowledge-base/troubleshooting#speaker-no-sound"
    }
  }
};
