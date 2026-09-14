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

    "hdr-capability-test": {
    "overview": "El Detector de Hardware y Señal HDR audita si el compositor del sistema operativo, el controlador de pantalla y el navegador comunican señales HDR. Evalúa CSS Media Queries Nivel 4 (dynamic-range: high), gamas amplias (Rec.2020 / Display-P3), búferes de color Canvas P3, objetivos WebGL float y códecs de video HDR de 10 bits acelerados por hardware.",
    "whatToLookFor": [
        {
            "label": "Estado de Señal HDR del Compositor",
            "description": "Confirma si el sistema operativo emite señal HDR al navegador. Si está inactivo, HDR está apagado en los ajustes del sistema."
        },
        {
            "label": "Profundidad de Búfer y Canalización",
            "description": "Detecta la profundidad de color (24 bits SDR vs 30 bits+ HDR) y comprueba si Canvas y WebGL2 pueden asignar búferes P3 y float."
        },
        {
            "label": "Gama Amplia (Rec.2020 y P3)",
            "description": "Verifica si su monitor reporta cobertura de color extendida más allá de sRGB para rojos carmesí y verdes esmeralda intensos."
        },
        {
            "label": "Aceleración de Códecs de Video HDR",
            "description": "Prueba la decodificación por hardware para HDR10 (HEVC Main 10), AV1 de 10 bits (YouTube HDR) y VP9 Perfil 2."
        }
    ],
    "canObserve": [
        "Estado en tiempo real de la señal HDR del compositor del sistema operativo",
        "Compatibilidad de hardware y navegador con Display-P3 y Rec.2020",
        "Profundidad de color del búfer de pantalla y soporte para búferes float",
        "Capacidad de reproducción de códecs de video de 10 bits por hardware"
    ],
    "cannotMeasure": [
        "Brillo pico físico (nits) sin un colorímetro de laboratorio",
        "Nivel de certificación VESA DisplayHDR (p. ej., DisplayHDR 400 vs 600 vs 1000)",
        "Número de zonas físicas de atenuación local en paneles Mini-LED"
    ],
    "interpretation": "Si dynamic-range aparece como estándar (inactivo), presione Win + Alt + B en Windows o active HDR en Ajustes de macOS.",
    "nextSteps": {
        "text": "¿Desea inspeccionar el recorte visual de luces, curvas tonales y brillo pico? Inicie la prueba óptica.",
        "actionLabel": "Iniciar Inspección Visual HDR",
        "actionHref": "/tests/hdr-test"
    }
},

  "hdr-test": {
    "overview": "La prueba de Calibración Visual e Inspección de Luces HDR proporciona patrones ópticos controlados para evaluar cómo responde su pantalla a señales HDR. Examina puntos de recorte en altas luces, asignación de tonos, brillo pico en ventana APL del 10%, curvas PQ/EOTF y sombras.",
    "whatToLookFor": [
        {
            "label": "Recorte y Rolloff de Luces Especulares",
            "description": "Inspeccione los parches de 90% a 100% de blanco pico. Las retículas circulares deben distinguirse sin fundirse en blanco quemado."
        },
        {
            "label": "Ventana de Brillo Pico 10% APL",
            "description": "Una ventana del 10% sobre negro absoluto prueba los nits pico de su pantalla, la agresividad de atenuación local y los halos de luz."
        },
        {
            "label": "Gradación de Curva PQ / EOTF",
            "description": "Compara degradados suaves de 10 bits con rampas cuantizadas de 8 bits para detectar bandas y compresión tonal excesiva."
        },
        {
            "label": "Detalle en Sombras (Black Crush)",
            "description": "Verifica si los tonos oscuros tenues (0.5% al 5%) se distinguen del negro puro al 0% sin elevar los niveles de negro."
        }
    ],
    "canObserve": [
        "Punto de recorte de luces especulares a través de niveles de brillo escalonados",
        "Halos de atenuación local y reserva de brillo pico en la ventana 10% APL",
        "Fluidez de transiciones tonales de 10 bits frente al banding de 8 bits",
        "Separación de detalles en sombras y comportamiento de aplastamiento de negros"
    ],
    "cannotMeasure": [
        "Brillo pico fotométrico exacto en nits sin sensores de laboratorio",
        "Precisión de temperatura de color (Kelvin) sin espectrofotómetro",
        "Tiempo de respuesta de píxeles o sobreimpulso de overdrive"
    ],
    "interpretation": "Las pantallas con mapeo de tonos deficiente queman luces antes del 94% o aplastan sombras en negro sólido. Los paneles OLED y Mini-LED de gama alta retienen retículas hasta el 99%.",
    "nextSteps": {
        "text": "¿Necesita comprobar si su sistema operativo y códecs de video admiten HDR? Revise el detector de hardware.",
        "actionLabel": "Verificar Hardware y Señal HDR",
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
    "overview": "El inspector de salud de batería lee métricas del sistema mediante la API Battery Status de W3C. Proporciona visibilidad en tiempo real del porcentaje de carga, estado de conexión a corriente y tiempo restante estimado.",
    "whatToLookFor": [
        {
            "label": "Nivel de carga en tiempo real",
            "description": "Monitorea el porcentaje de batería reportado por el sistema operativo."
        },
        {
            "label": "Estado del adaptador de corriente",
            "description": "Detecta si el dispositivo está conectado a corriente alterna o usando batería interna."
        },
        {
            "label": "Tiempo de carga y descarga",
            "description": "Calcula el tiempo estimado para alcanzar 100% o el tiempo restante hasta descargarse."
        },
        {
            "label": "Historial de descarga",
            "description": "Rastrea el drenaje de energía durante pruebas de pantalla activas."
        }
    ],
    "canObserve": [
        "Porcentaje de batería en tiempo real según el sistema operativo",
        "Transiciones de estado de carga mediante eventos levelchange",
        "Segundos estimados hasta carga completa o descarga",
        "Tendencia histórica del nivel de carga durante la sesión"
    ],
    "cannotMeasure": [
        "Degradación de capacidad en mAh sin herramientas del sistema",
        "Temperatura interna, impedancia o ciclos de carga",
        "Métricas en navegadores que bloquean la API por privacidad (Firefox/Safari)"
    ],
    "interpretation": "Si el navegador no soporta la API, se debe a restricciones de privacidad para evitar huellas digitales. Una descarga acelerada indica degradación de celdas.",
    "nextSteps": {
        "text": "¿Desea verificar la velocidad y latencia de su conexión de red?",
        "actionLabel": "Iniciar prueba de red",
        "actionHref": "/tests/network-speed-test"
    }
},

  "network-speed-test": {
    "overview": "La prueba de velocidad y latencia de red mide el ping, fluctuación, tipo de conexión y velocidad de descarga directamente en el navegador.",
    "whatToLookFor": [
        {
            "label": "Latencia Ping (RTT)",
            "description": "Mide el tiempo de ida y vuelta en milisegundos hacia el servidor."
        },
        {
            "label": "Velocidad de descarga (Mbps)",
            "description": "Calcula el ancho de banda efectivo transfiriendo paquetes de datos."
        },
        {
            "label": "Tipo de conexión",
            "description": "Detecta conexión efectiva (4g, wifi, ethernet) y límite de enlace descendente."
        },
        {
            "label": "Estabilidad de red (Jitter)",
            "description": "Evalúa variaciones en los paquetes sucesivos para detectar saturación."
        }
    ],
    "canObserve": [
        "Tiempo de respuesta HTTP/HTTPS en milisegundos",
        "Clase de conexión reportada por navigator.connection",
        "Velocidad de descarga en Mbps calculada con transferencias reales",
        "Modo de ahorro de datos activado o desactivado"
    ],
    "cannotMeasure": [
        "Latencia a nivel de socket sin sobrecarga del protocolo web",
        "Atenuación física de la fibra óptica o par trenzado",
        "Interferencias de canal de radiofrecuencia Wi-Fi"
    ],
    "interpretation": "Valores de ping menores a 30 ms son excelentes para gaming en línea. Velocidades superiores a 50 Mbps permiten reproducir 4K HDR sin pausas.",
    "nextSteps": {
        "text": "¿Desea medir la latencia entre el clic y la respuesta en pantalla?",
        "actionLabel": "Test de Latencia de Entrada",
        "actionHref": "/tests/input-lag-test"
    }
},

  "color-blindness-test": {
    "overview": "El simulador de daltonismo aplica matrices de color SVG calibradas para emular 8 tipos de deficiencia de visión cromática, permitiendo evaluar la accesibilidad y contraste de diseños.",
    "whatToLookFor": [
        {
            "label": "Protanopía y Protanomalía (Rojo)",
            "description": "Afecta los conos L; el rojo se percibe marrón oscuro o grisáceo."
        },
        {
            "label": "Deuteranopía y Deuteranomalía (Verde)",
            "description": "Afecta los conos M; verdes y rojos se confunden en tonos amarillentos."
        },
        {
            "label": "Tritanopía y Tritanomalía (Azul)",
            "description": "Afecta los conos S; el azul parece verdoso y el amarillo lila o gris."
        },
        {
            "label": "Acromatopsia (Monocromatismo)",
            "description": "Ausencia total de conos funcionales; visión exclusiva en tonos de gris."
        }
    ],
    "canObserve": [
        "Transformación óptica en tiempo real de componentes y gráficos con 8 filtros",
        "Comparación lado a lado de visión normal frente a visión simulada",
        "Pérdida de contraste entre indicadores de estado (verde éxito vs rojo error)",
        "Legibilidad de texto sobre fondos bajo cada variante cromática"
    ],
    "cannotMeasure": [
        "Diagnóstico clínico oftalmológico de la visión del usuario",
        "Variación individual de sensibilidad retiniana",
        "Emisión espectral del panel físico sin espectrorradiómetro"
    ],
    "interpretation": "Si elementos cruciales pierden diferenciación en Deuteranopía o Protanopía, añada iconos, etiquetas de texto o patrones visuales según las pautas WCAG 2.2.",
    "nextSteps": {
        "text": "Verifique la cobertura del espacio de color sRGB y DCI-P3 de su pantalla.",
        "actionLabel": "Verificar gama de color",
        "actionHref": "/tests/color-gamut-test"
    }
},

  "screen-recorder": {
    "overview": "La herramienta de grabación de pantalla y captura usa las APIs Screen Capture y MediaRecorder para grabar el escritorio o ventanas y exportar imágenes PNG sin software externo.",
    "whatToLookFor": [
        {
            "label": "Resolución del flujo de captura",
            "description": "Comprueba si el video capturado coincide con la resolución nativa de la pantalla."
        },
        {
            "label": "Tasa de cuadros por segundo",
            "description": "Supervisa la fluidez de fotogramas y la duración en tiempo real."
        },
        {
            "label": "Pista de audio integrada",
            "description": "Permite capturar audio del sistema o de la pestaña seleccionada."
        },
        {
            "label": "Captura PNG sin pérdidas",
            "description": "Genera una instantánea nítida de un fotograma lista para descargar."
        }
    ],
    "canObserve": [
        "Dimensiones de video, proporción de aspecto y fotogramas por segundo",
        "Tiempo de grabación, control de pausa y tamaño del archivo WebM",
        "Generación directa de fotograma en canvas para exportar a PNG",
        "Permisos del navegador para compartir pantalla"
    ],
    "cannotMeasure": [
        "Latencia del codificador GPU interno del sistema operativo",
        "Contenido protegido por DRM (aparece en negro por restricciones de seguridad)",
        "Tasa de refresco nativa del panel físico"
    ],
    "interpretation": "Todo el procesamiento se realiza en la memoria local del navegador sin enviar datos a servidores externos, garantizando privacidad total.",
    "nextSteps": {
        "text": "¿Desea probar el funcionamiento y resolución de su cámara web?",
        "actionLabel": "Probar cámara web",
        "actionHref": "/tests/webcam-test"
    }
},

  "dark-mode-test": {
    "overview": "El inspector de modo oscuro y compatibilidad de temas evalúa prefers-color-scheme, el soporte nativo de controles de formulario CSS y el contraste en temas claros y oscuros.",
    "whatToLookFor": [
        {
            "label": "Sincronización con el sistema",
            "description": "Verifica si el navegador detecta el cambio de tema del sistema operativo."
        },
        {
            "label": "Soporte CSS color-scheme",
            "description": "Comprueba barras de desplazamiento e inputs nativos en modo oscuro."
        },
        {
            "label": "Contraste de componentes",
            "description": "Evalúa legibilidad de textos, tarjetas y botones en ambos temas."
        },
        {
            "label": "Negro puro para OLED",
            "description": "Verifica el uso de fondos #000000 para ahorro de energía en pantallas OLED."
        }
    ],
    "canObserve": [
        "Detección en tiempo real de prefers-color-scheme en el navegador",
        "Soporte de la propiedad CSS color-scheme en controles nativos",
        "Cambio interactivo entre tema Sistema, Claro y Oscuro",
        "Contraste visual de tipografía sobre fondos claros y oscuros"
    ],
    "cannotMeasure": [
        "Ahorro eléctrico exacto en miliamperios sin instrumentos de laboratorio",
        "Ajuste automático a la luz de la habitación sin sensor ambiental",
        "Efectos de software de reducción de luz azul nocturna"
    ],
    "interpretation": "Las pantallas OLED ahorran batería apagando subpíxeles en zonas negras puras, además de reducir la fatiga ocular en condiciones de poca luz.",
    "nextSteps": {
        "text": "¿Desea medir la luz ambiente de su habitación para calibrar el brillo?",
        "actionLabel": "Test de Sensor de Luz Ambiental",
        "actionHref": "/tests/ambient-light-test"
    }
},

  "input-lag-test": {
    "overview": "El visualizador de latencia de entrada realiza una prueba estadística de 10 intentos para medir el tiempo transcurrido entre el estímulo visual y el clic del ratón.",
    "whatToLookFor": [
        {
            "label": "Tiempo de reacción visual",
            "description": "Mide los milisegundos desde el cambio de color hasta el clic."
        },
        {
            "label": "Consistencia estadística",
            "description": "Una desviación estándar baja (< 25 ms) indica sincronización estable."
        },
        {
            "label": "Detección de inicios en falso",
            "description": "Registra clics prematuros realizados antes de que aparezca el verde."
        },
        {
            "label": "Histograma de distribución",
            "description": "Visualiza la agrupación de los tiempos de respuesta obtenidos."
        }
    ],
    "canObserve": [
        "Marcas de tiempo de alta resolución con performance.now()",
        "Estadísticas completas: promedio, mejor, peor tiempo y desviación estándar en 10 intentos",
        "Máquina de estados para evitar clics anticipados",
        "Histograma de distribución de latencia"
    ],
    "cannotMeasure": [
        "Latencia pura de fotodiodo clic-a-fotón sin hardware externo especializado",
        "Intervalos de sondeo USB aislados de las interrupciones del sistema operativo",
        "Tiempo de respuesta físico de transición de píxeles"
    ],
    "interpretation": "Tiempos combinados de 180 ms a 240 ms son típicos en monitores de alta tasa de refresco. Valores superiores a 300 ms sugieren desactivar el procesado de imagen en la pantalla.",
    "nextSteps": {
        "text": "¿Desea verificar la tasa de refresco real de su monitor?",
        "actionLabel": "Probar tasa de refresco",
        "actionHref": "/tests/refresh-rate-test"
    }
},

  "ambient-light-test": {
    "overview": "El inspector del sensor de luz ambiental lee niveles de iluminancia en lux (lx) usando la API AmbientLightSensor y recomienda niveles óptimos de brillo ergonómico.",
    "whatToLookFor": [
        {
            "label": "Nivel de lux en tiempo real",
            "description": "Mide la luz ambiental captada por el fotosensor del dispositivo."
        },
        {
            "label": "Recomendación ergonómica de brillo",
            "description": "Sugiere el ajuste de brillo idóneo según la iluminación de la habitación."
        },
        {
            "label": "Alerta de reflejos",
            "description": "Identifica si la luz ambiental (> 1000 lx) puede causar deslumbramiento."
        },
        {
            "label": "Estabilidad de la iluminación",
            "description": "Registra variaciones producidas por luz natural o bombillas parpadeantes."
        }
    ],
    "canObserve": [
        "Valores de iluminancia en lux en tiempo real",
        "Clasificación ambiental (oscuridad, penumbra, oficina, luz diurna)",
        "Porcentaje de brillo recomendado según normas de ergonomía",
        "Gráfico histórico de fluctuaciones de luz durante la sesión"
    ],
    "cannotMeasure": [
        "Lecturas en navegadores sin soporte de la API Generic Sensor",
        "Temperatura de color (Kelvin) o índice CRI de la luz de la habitación",
        "Ángulos de incidencia directa de reflejos en la pantalla"
    ],
    "interpretation": "En oficinas se recomiendan entre 300 lx y 500 lx con un brillo de pantalla de 120-150 nits. En entornos oscuros (< 50 lx), reduzca el brillo para prevenir fatiga.",
    "nextSteps": {
        "text": "¿Desea calibrar el contraste y nivel de negro de su monitor?",
        "actionLabel": "Probar brillo",
        "actionHref": "/tests/brightness-test"
    }
},

  "dpi-calculator": {
    "overview": "La calculadora de DPI y PPI calcula la densidad de píxeles, tamaño de punto (dot pitch), megapíxeles totales y distancia umbral Retina según la diagonal y resolución del panel.",
    "whatToLookFor": [
        {
            "label": "Píxeles por pulgada (PPI)",
            "description": "Mide la densidad de píxeles en la diagonal de la pantalla."
        },
        {
            "label": "Tamaño de punto (Dot Pitch)",
            "description": "Calcula la distancia física entre centros de subpíxeles en milímetros."
        },
        {
            "label": "Distancia de visualización Retina",
            "description": "Determina la distancia a la cual el ojo humano ya no distingue píxeles individuales (60 PPD)."
        },
        {
            "label": "Proporción y megapíxeles",
            "description": "Calcula el área del panel, relación de aspecto y total de píxeles."
        }
    ],
    "canObserve": [
        "Cálculo de PPI, tamaño de punto en mm y total de megapíxeles",
        "Distancia ergonómica y umbral Retina en centímetros y pulgadas",
        "Preajustes instantáneos para monitores populares (24\" 1080p, 27\" 1440p, 32\" 4K)",
        "Controles deslizantes para resolución y diagonal"
    ],
    "cannotMeasure": [
        "Medida física de los marcos sin datos introducidos por el usuario",
        "Pérdida de nitidez óptica producida por recubrimientos antirreflejos",
        "Distorsión no estándar sin especificaciones del panel"
    ],
    "interpretation": "Densidades superiores a 110 PPI ofrecen texto nítido sin escalado agresivo, mientras que más de 220 PPI alcanzan calidad Retina a distancias de escritorio (50-60 cm).",
    "nextSteps": {
        "text": "Evalúe la claridad tipográfica y el renderizado de subpíxeles.",
        "actionLabel": "Probar claridad de texto",
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

