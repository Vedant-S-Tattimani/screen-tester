import { ExplainerData, ExplainerLabels } from "./types";

export const PT_LABELS: ExplainerLabels = {
  "overviewHeading": "Visão Geral da Inspeção de Tela",
  "whatToLookForHeading": "O Que Observar Durante a Inspeção",
  "boundariesHeading": "Limites de Medição e Honestidade Técnica",
  "canObserveLabel": "O Que o Screen Tester Pode Observar",
  "cannotMeasureLabel": "O Que o Navegador Não Consegue Medir com Precisão",
  "interpretationHeading": "Interpretação das Suas Observações",
  "nextStepsHeading": "Próximos Passos Recomendados"
};

export const PT_EXPLAINERS: Record<string, ExplainerData> = {
  "dead-pixel-test": {
    "overview": "Un píxel muerto es un subpixel de cristal líquido ou un emisor OLED permanentemente apagado que permanece completamente oscuro independientemente da señal que se le envíe. En fondos brillantes, especialmente branco puro, cian e amarillo, los píxeles muertos se destacan como motas oscuras ou negras estáticas e nítidas.",
    "whatToLookFor": [
      {
        "label": "Puntos oscuros estáticos en telas blancas/claras",
        "description": "Un pequeñou punto preto que no cambia ni se ilumina a medida que recorre fondos sólidos e brillantes indica un píxel muerto."
      },
      {
        "label": "Distinguir los píxeles muertos do polvo",
        "description": "El polvo da superficie se desplaza cuando se ve desde diferentes ángulos e se puede limpiar suavemente. Un verdadero píxel muerto se encuentra detrás do filtro polarizador exterior."
      },
      {
        "label": "Defectos de subpixels frente a píxeles completos",
        "description": "Si solo falla un subpixel (rojo, verde ou azul), el píxel aparecerá ligeramente descolorido en lugar de preto sobre branco."
      },
      {
        "label": "Defectos do racimo",
        "description": "Múltiples píxeles muertos agrupados en un área pequeña representan un defecto grave do panel e generalmente califican para un reemplazo inmediato bajo garantía do fabricante."
      }
    ],
    "canObserve": [
      "Identificación visual de píxeles apagados en fondos primarios e secundarios sólidos",
      "Coordenadas exactas da tela e recuento de puntos oscuros sospechosos nas zonas de visualización",
      "Validación de contraste entre la luminancia de fondo e los subpixels sin alimentación"
    ],
    "cannotMeasure": [
      "Continuidad eléctrica ou estado de voltaje do transistor de película delgada (TFT) subyacente",
      "Detección automática sin inspección visual humana do usuario",
      "Clasificación de defectos físicos de fabricación bajo capas de vidrio."
    ],
    "interpretation": "Los píxeles muertos son causados ​​por fallas microscópicas de los transistores durante la fabricación do panel ou por impacto físico. La mayoría de los fabricantes de telas siguen las pautas ISO 9241-307 Clase 1 ou Clase 2, que definen umbrales aceptables (generalmente de 2 a 5 subpixels muertos por millón).",
    "nextSteps": {
      "text": "Si detecta subpixels atascados que permanecen iluminados en lugar de negros, utilice nuestra herramienta de ejercicio dedicada para intentar recuperarlos.",
      "actionLabel": "Inicie el reparador de píxeles atascados",
      "actionHref": "/tests/stuck-pixel-fixer"
    }
  },
  "stuck-pixel-test": {
    "overview": "A diferencia de un píxel muerto que permanece permanentemente oscuro, un píxel atascado es causado por una celda de cristal líquido atascada en un estado abierto, lo que permite que la luz de fondo pase continuamente. Aparece como un punto persistente de cor brillante, generalmente rojo, verde, azul, cian, magenta ou branco puro, más visible sobre fondos negros sólidos e oscuros.",
    "whatToLookFor": [
      {
        "label": "Puntos de cores brillantes sobre preto puro",
        "description": "Inspeccione una tela completamente negra en una habitación oscura. Cualquier punto nítido que brille en rojo, verde, azul ou amarillo es un subpixel atascado."
      },
      {
        "label": "testes de cor complementarias",
        "description": "Un subpixel verde atascado desaparecerá sobre un fondo verde, pero brillará intensamente sobre fondos rojos, azules ou negros."
      },
      {
        "label": "Píxeles blancos calientes",
        "description": "Si los tres subpixels (RGB) están permanentemente abiertos, el punto aparecerá como un punto branco estático en fondos oscuros."
      },
      {
        "label": "Distinción do sangrado de retroiluminación",
        "description": "Los píxeles atascados son pinchazos de luz de un solo píxel, mientras que el sangrado da luz de fondo produce parches difusos similares a nubes a lo largo de los bordes da tela."
      }
    ],
    "canObserve": [
      "Identificación visual de subpixels iluminados sobre fondos oscuros e complementarios.",
      "Aislamiento de canales de cor de subpixels defectuosos individuales (R, G ou B)",
      "Mapeo de cuadrantes de tela de píxeles defectuosos"
    ],
    "cannotMeasure": [
      "Viscosidad química do cristal líquido ou estado de alineación física.",
      "Velocidad de conmutación de puerta de transistor ou resistencia eléctrica",
      "Permanencia garantizada do defecto sin observación prolongada."
    ],
    "interpretation": "Los píxeles atascados ocurren con frecuencia cuando una molécula de cristal líquido no logra regresar a su estado relajado, a menudo debido a irregularidades de fabricación ou cargas eléctricas microscópicas. A diferencia de los píxeles muertos, los píxeles atascados temporalmente a veces se pueden aflojar mediante estimulación visual.",
    "nextSteps": {
      "text": "¿Has localizado un píxel atascado? Intente una rápida estimulación visual de subpixels con nuestro ejercitador de cor localizado.",
      "actionLabel": "Pruebe el solucionador de píxeles atascados",
      "actionHref": "/tests/stuck-pixel-fixer"
    }
  },
  "stuck-pixel-fixer": {
    "overview": "Stuck Pixel Fixer utiliza ciclos de cor localizados de alta frecuencia e patrones de ruido visual para excitar rápidamente las moléculas de cristal líquido. La alternancia rápida de cores primarios e secundarios obliga a los transistores de subpixels e a las células de cristal líquido a alternar estados a alta velocidad, lo que ocasionalmente puede liberar un subpixel temporalmente atascado.",
    "whatToLookFor": [
      {
        "label": "Alineación de caja dirigida",
        "description": "Coloque la caja de estimulación animada directamente sobre el píxel atascado para evitar distracciones estroboscópicas en toda la tela."
      },
      {
        "label": "Selección de patrón",
        "description": "Alterne entre ciclo RGB (estimulación amplia) e ruido de cor (excitación aleatoria de alta frecuencia) para obtener resultados óptimos."
      },
      {
        "label": "Duración da sesión",
        "description": "Ejecute la estimulación durante 15 a 30 minutos, luego haga una pausa e inspeccione en preto puro para verificar si el píxel se ha liberado."
      },
      {
        "label": "Aviso de sensibilidad visual",
        "description": "Si experimenta mareos, dolor de cabeza ou fatiga visual, detenga la estimulación inmediatamente. Nunca utilizar si es fotosensible."
      }
    ],
    "canObserve": [
      "Reproducción visual en tiempo real de ciclos RGB de alta velocidad e patrones de ruido de subpixels aleatorios",
      "Posicionamiento localizado preciso e seguimiento da duración do temporizador directamente en su navegador",
      "Confirmación visual de si la capacidad de respuesta de los píxeles cambia antes e después da estimulación"
    ],
    "cannotMeasure": [
      "Reparación eléctrica a nivel de hardware de transistores TFT físicamente dañados ou quemados",
      "Cualquier porcentaje de recuperación garantizado: el éxito depende completamente da química do panel físico.",
      "Reparación automática de software de píxeles muertos (negros permanentemente apagados)"
    ],
    "interpretation": "Los ejercitadores de software trabajan exclusivamente con células de cristal líquido temporalmente atascadas. Si un subpixel se desprende físicamente, se fractura ou está completamente muerto (sin alimentación), la estimulación do software no puede revivirlo. Si la estimulación falla después de repetidas sesiones, consulte los términos de garantía do fabricante.",
    "nextSteps": {
      "text": "Después de ejecutar la estimulación, vuelva a la teste de píxeles atascados para inspeccionar el área en preto puro.",
      "actionLabel": "Verificar con teste de píxeles atascados",
      "actionHref": "/tests/stuck-pixel-test"
    }
  },
  "refresh-rate-test": {
    "overview": "La frecuencia de actualización da tela (medida en Hertz, Hz) indica cuántas veces por segundo la tela reconstruye la imagen. Esta teste utiliza el reloj de animación de alta resoluçãou do navegador (requestAnimationFrame) para observar el ritmo de entrega de quadros, detectar quadros perdidos e verificar si el navegador coincide com a frecuencia de actualización configurada de su sistema operativo.",
    "whatToLookFor": [
      {
        "label": "Frecuencia de actualización informada versus configurada",
        "description": "Verifique que el valor informado coincida com ou objetivo de su tela (por ejemplo, 60 Hz, 120 Hz, 144 Hz, 240 Hz ou 360 Hz)."
      },
      {
        "label": "Ritmo de cuadro e fluctuación",
        "description": "Mire el gráfico do delta de tiempo entre quadros. Una tela estable de 144 Hz debería ofrecer quadros a intervalos constantes de ~6,94 ms."
      },
      {
        "label": "Limitación de marco do navegador",
        "description": "Si un monitor de 144 Hz informa exactamente 60 Hz, es posible que la configuraçãou de tela de su navegador ou sistema operativo esté limitada para ahorrar batería ou que falten indicadores de GPU."
      },
      {
        "label": "Suavidad do indicador móvil",
        "description": "Inspeccione la barra móvil. En telas de alta actualización, la animación debe deslizarse con un mínimo de vibración ou tartamudeo."
      }
    ],
    "canObserve": [
      "Solicitud do navegadorAnimationFrame Frecuencia de devolución de llamada e variación do tiempo delta",
      "FPS de animación de navegador calculados e consistencia de ritmo de quadros",
      "Entrega de sincronización do compositor en ventana en la pestaña activa do navegador"
    ],
    "cannotMeasure": [
      "Frecuencia de actualización do hardware do panel físico independiente de los límites do compositor do navegador",
      "Ancho de banda de enlace de cable DisplayPort ou HDMI e temporización de paquetes",
      "Intervalos de supresión vertical a nivel de osciloscopio (VBLANK) ou sincronización de sobremarcha do panel"
    ],
    "interpretation": "Los navegadores web sincronizan sus bucles de renderizado com ou compositor de visualización a través de vsync. Sin embargo, los perfiles de ahorro de energía, las configuraciones de varios monitores con frecuencias de actualización no coincidentes ou la limitación de pestañas en segundo plano pueden hacer que el navegador se muestre por debajo da capacidad nativa do monitor.",
    "nextSteps": {
      "text": "¿Su frecuencia de actualización tiene un límite de 60 Hz en un monitor de juegos? Consulte nuestra guía sobre cómo configurar las frecuencias de actualización da tela do sistema operativo e la GPU.",
      "actionLabel": "Leer Solución de problemas de frecuencia de actualización",
      "actionHref": "/knowledge-base/troubleshooting#refresh-rate-capped"
    }
  },
  "ghosting-test": {
    "overview": "El efecto fantasma en movimento aparece como sombras que se arrastran ou réplicas manchadas detrás de objetos en movimento. Ocurre cuando las moléculas de cristal líquido tardan más en realizar la transición entre estados de cor (tiempo de respuesta de píxeles) que la duración de un solo cuadro de actualización. Esta teste representa bloques en movimento contra varios tonos de fondo para exponer las coronas de sobremarcha e seguimiento do tiempo de respuesta.",
    "whatToLookFor": [
      {
        "label": "Sombras oscuras (fantasma tradicional)",
        "description": "Una mancha oscura detrás de un objeto en movimento indica transiciones lentas de cristal líquido de oscuro a claro, comunes nos paneles VA."
      },
      {
        "label": "Halos/Coronas brillantes (efecto fantasma inverso)",
        "description": "Un rastro brillante detrás do objeto significa que la configuraçãou de Overdrive (OD) ou Tiempo de respuesta do monitor es demasiado agresiva (overshoot)."
      },
      {
        "label": "Seguimiento de cor específico",
        "description": "Observe si el seguimiento es peor en fondos rojos, verdes ou cinza oscuro. Los tiempos de transición varían mucho entre pares de cores."
      },
      {
        "label": "Observación con cámara de persecución",
        "description": "Siga el objeto en movimento con los ojos ou con una cámara en movimento para aislar la respuesta do panel que se desprende do desenfoque do movimento da retina."
      }
    ],
    "canObserve": [
      "Presencia visual de bordes de fuga, manchas e coronas de sobreimpulso en velocidades personalizables",
      "Comparación de sensibilidad de contraste de pares de cores (transiciones de claro a oscuro versus de oscuro a claro)",
      "Impacto visual de ajustar la configuraçãou OSD física de Overdrive/Tiempo de respuesta de su monitor"
    ],
    "cannotMeasure": [
      "Tiempo de respuesta de laboratorio cinza a cinza (GtG) en milisegundos exactos",
      "Curvas de caída de intensidad de luz da cámara de seguimiento fotométrica",
      "Curvas de respuesta de voltaje de cristal líquido de subpixels"
    ],
    "interpretation": "El efecto fantasma está determinado fundamentalmente por la tecnología do panel (TN es rápido pero de cor deficiente, IPS está equilibrado, VA a menudo muestra manchas en el nivel de oscuridad, OLED tiene una respuesta casi instantánea). Ajustar la configuraçãou OSD 'Tiempo de respuesta' ou 'Overdrive' de su monitor a Medio generalmente logra el mejor equilibrio entre imágenes fantasma e sobreimpulso.",
    "nextSteps": {
      "text": "¿Quiere aprender cómo funciona la sobremarcha do monitor e cómo eliminar los halos fantasma inversos?",
      "actionLabel": "Lea la guía de imágenes fantasma e desenfoque de movimento",
      "actionHref": "/knowledge-base/monitor-ghosting-and-motion-blur"
    }
  },
  "motion-blur-test": {
    "overview": "A diferencia do efecto fantasma (que surge de una respuesta lenta de los píxeles), el desenfoque de movimento nos paneles planos modernos es causado predominantemente por la mecánica de visualización de muestreo e retención. Debido a que la tela mantiene cada cuadro de imagen continuamente hasta la siguiente actualización, sus ojos siguen el movimento suave a través de una imagen estática, creando una percepción de desenfoque retiniano.",
    "whatToLookFor": [
      {
        "label": "Retención de detalles a alta velocidad",
        "description": "Observe las finas líneas verticales e el texto a medida que viajan por la tela. Observe dónde se combinan los detalles finos."
      },
      {
        "label": "Comparación de velocidad",
        "description": "Compare el movimento de baja velocidad (240 px/s) com ou de alta velocidad (960 px/s) para ver cómo el desenfoque do seguimiento ocular aumenta com a velocidad."
      },
      {
        "label": "Efectos de inserción de marco preto (BFI)",
        "description": "Si su monitor tiene una función de retroiluminación estroboscópica (ULMB, ELMB, DyAc), habilitarla agudiza drásticamente los patrones en movimento."
      },
      {
        "label": "Desenfoque de muestra e retención OLED",
        "description": "Incluso con una respuesta de píxeles instantánea de 0,1 ms, el desenfoque de muestreo e retención seguirá produciéndose a 60 Hz ou 120 Hz sin luz estroboscópica."
      }
    ],
    "canObserve": [
      "Diferencias de desenfoque de movimento perceptual a través de diferentes velocidades horizontales e frecuencias de actualización",
      "Mejoras en la nitidez visual al utilizar los modos estroboscópicos/BFI de retroiluminación do hardware",
      "Contraste entre bordes estáticos nítidos e contornos en movimento borrosos"
    ],
    "cannotMeasure": [
      "Tiempo de respuesta física de imágenes en movimento (MPRT) en milisegundos exactos",
      "Curvas de integración da luz retiniana da visión humana.",
      "Porcentaje do ciclo de trabajo da luz de fondo estroboscópica"
    ],
    "interpretation": "Para reducir el desenfoque de muestreo e retención, las telas deben aumentar la frecuencia de actualización (acortando la duración da visualización de cada cuadro) ou implementar luz de fondo estroboscópica (insertando intervalos oscuros para aclarar la persistencia da retina).",
    "nextSteps": {
      "text": "Compárelo com a teste de frecuencia de actualización para comprender cómo los Hz más altos reducen el desenfoque de movimento.",
      "actionLabel": "Inspeccionar frecuencia de actualización",
      "actionHref": "/tests/refresh-rate-test"
    }
  },
  "vrr-test": {
    "overview": "La frecuencia de actualización variable (VRR), que incluye NVIDIA G-Sync, AMD FreeSync e VESA Adaptive-Sync, sincroniza dinámicamente los ciclos de actualización de su monitor com a velocidad de procesamiento de quadros da GPU. Esta teste modula las tasas de entrega de animación para inspeccionar visualmente el ritmo, el desgarro e la vibración de quadros adaptativos en su navegador.",
    "whatToLookFor": [
      {
        "label": "Artefactos desgarradores de tela",
        "description": "Busque líneas de división horizontales donde la parte superior e inferior da imagen muestren diferentes quadros simultáneamente."
      },
      {
        "label": "Vibración e tartamudeo do marco",
        "description": "Observe si el indicador móvil se desliza suavemente ou muestra micropausas a medida que cambia la frecuencia de renderizado."
      },
      {
        "label": "VRR en ventana ou en tela completa",
        "description": "Muchos controladores de GPU solo activan G-Sync/FreeSync en aplicaciones de tela completa real, a menos que estén configurados para el modo de ventana."
      },
      {
        "label": "LFC (compensación de baja velocidad de quadros)",
        "description": "Cuando la velocidad de quadros cae por debajo do rango VRR mínimo de su monitor (por ejemplo, por debajo de 48 Hz), observe si los quadros se duplican sin problemas."
      }
    ],
    "canObserve": [
      "Líneas visuales desgarradas e micro tartamudeo durante el renderizado de intervalo variable",
      "Suavidad do ritmo da animación en condiciones de entrega de quadros fluctuantes",
      "Diferencia percibida por el usuario entre el comportamiento de visualización en ventana e en tela completa"
    ],
    "cannotMeasure": [
      "Protocolo de enlace interno do controlador de GPU con hardware escalador de monitor",
      "Estado de activación do módulo G-Sync/FreeSync a nivel de hardware",
      "Comunicación de metadatos do canal DisplayPort AUX en tiempo real"
    ],
    "interpretation": "Debido a que los navegadores web se ejecutan dentro do compositor de ventanas do sistema operativo, la participación de VRR depende da configuraçãou a nivel do sistema operativo (como la programación de GPU acelerada por hardware de Windows e la configuraçãou de G-Sync en ventana do controlador de GPU).",
    "nextSteps": {
      "text": "¿Experimentas microtartamudeos ou desgarros? Revise nuestra guía de solución de problemas de VRR paso a paso.",
      "actionLabel": "Lea la solución de problemas de VRR",
      "actionHref": "/knowledge-base/troubleshooting#vrr-stutter-tearing"
    }
  },
  "backlight-bleed-test": {
    "overview": "El sangrado de retroiluminación ocurre en telas LCD cuando la capa de cristal líquido no logra bloquear completamente la luz emitida por CCFL ou retroiluminación LED, lo que permite que la luz se filtre por los bordes ou esquinas. Esta teste de preto puro en tela completa le permite inspeccionar fugas nos bordes, parches turbios e distinguir el sangrado do brilho IPS desde el ángulo de visión.",
    "whatToLookFor": [
      {
        "label": "Bengalas de luz para bordes e esquinas",
        "description": "Luz amarilla ou blanca brillante que se acumula a lo largo de los bordes exteriores do marco e permanece visible independientemente do ángulo de visión."
      },
      {
        "label": "brilho IPS vs sangrado de retroiluminación",
        "description": "Mueve la cabeza de lado a lado. Si el brilho cambia de posición ou cambia de intensidad con su ángulo, es un brilho IPS normal, no un sangrado."
      },
      {
        "label": "Nublamiento / Murafanning",
        "description": "Áreas difusas e irregulares de brilho elevado esparcidas por el panel causadas por láminas de difusión desigual ou presión mecánica."
      },
      {
        "label": "Comparación OLED / Mini-LED",
        "description": "Las telas OLED emiten luz por píxel e no presentan pérdida de retroiluminación (0 nits puros). Los mini-LED FALD pueden mostrar un halo localizado."
      }
    ],
    "canObserve": [
      "Fuga visual nos bordes, puntos de pellizco localizados en el bisel e patrones nublados contra el preto",
      "Gravedad relativa da fuga de luz nas esquinas da tela en un entorno oscuro",
      "Diferencias de sensibilidad do ángulo de visión (distinguiendo el sangrado estático do brilho dinámico de IPS)"
    ],
    "cannotMeasure": [
      "Luminancia absoluta do panel en cd/m² (nits) sin espectrofotómetro",
      "Relación de contraste estático nativo (por ejemplo, 1000:1 frente a 3000:1)",
      "Certificación de cumplimiento de contraste ANSI de 16 zonas"
    ],
    "interpretation": "El brilho suave de IPS es una característica óptica inherente de los paneles de conmutación en plano de gran angular. Sin embargo, el sangrado grave da luz de fondo es un defecto de ensamblaje mecánico en el que el bisel do monitor pellizca la placa guía de luz interna.",
    "nextSteps": {
      "text": "Conozca las diferencias cruciales entre el brilho de IPS, el sangrado de retroiluminación e los niveles de preto de OLED.",
      "actionLabel": "Lea la guía de purga de retroiluminación frente a brilho IPS",
      "actionHref": "/knowledge-base/backlight-bleed-vs-ips-glow"
    }
  },
  "near-black-test": {
    "overview": "Las testes de casi preto evalúan la capacidad de una tela para delinear tonos sutiles de cinza oscuro inmediatamente por encima do preto puro (0% a 5% de luminancia). Si un monitor convierte las sombras oscuras en preto puro, se perderán permanentemente los detalles críticos de las sombras en películas, juegos e edición de fotografías.",
    "whatToLookFor": [
      {
        "label": "Black Crush (recorte prematuro)",
        "description": "Si el paso 1 (0,5 % ou 1 %) es completamente invisible e se fusiona con un preto puro, su monitor sufre un aplastamiento do preto."
      },
      {
        "label": "Distinción de paso individual",
        "description": "Debería poder percibir contornos de límites tenues entre muestras tons de cinza consecutivas de baja luminosidad en una habitación oscura."
      },
      {
        "label": "Desplazamiento gamma do ángulo de visión",
        "description": "En los paneles VA, busque el \"aplastamiento preto en el eje\": detalle de sombra que aparece solo cuando se ve ligeramente fuera de ángulo."
      },
      {
        "label": "Reflejo de luz ambiental",
        "description": "Apague las luces do techo da habitación; El resplandor ambiental perjudica gravemente la percepción do ojo humano de tonos casi negros."
      }
    ],
    "canObserve": [
      "Umbrales de visibilidad visual para parches de luminancia casi negros do 0,5%, 1%, 2%, 3%, 4% e 5%",
      "Separación de detalles de sombras perceptuales en muestras de cores oscuros",
      "Impacto da configuraçãou do monitor Gamma, Ecualizador de preto e Rango dinámico HDMI"
    ],
    "cannotMeasure": [
      "Valores de luminancia fotométrica inferiores a 0,05 nits sin corímetro de laboratorio",
      "Conformidad matemática exacta da curva gamma (BT.1886 frente a 2,2 frente a sRGB)",
      "Panel hardware punto preto nativo en candelas absolutas por metro cuadrado"
    ],
    "interpretation": "El aplastamiento do preto suele ser causado por un rango dinámico de salida de cor da GPU incorrecto (Limitado 16–235 frente a Completo 0–255), un ecualizador de preto do monitor demasiado agresivo ou curvas gamma de gama baja no lineales.",
    "nextSteps": {
      "text": "¿Perdiendo detalles de sombras en juegos e vídeos? Siga nuestra guía de solución de problemas para corregir el aplastamiento preto.",
      "actionLabel": "Lea la solución de problemas de Black Crush",
      "actionHref": "/knowledge-base/troubleshooting#black-crush"
    }
  },
  "gradient-banding-test": {
    "overview": "Los degradados de cor suaves requieren gradaciones finas en miles de valores tonales intermedios. Cuando un panel de visualización, un controlador de gráficos ou un canal de imágenes tiene una profundidad de bits insuficiente ou un procesamiento de cor deficiente, los gradientes suaves se degradan en bandas escalonadas visibles ou líneas de posterización marcadas.",
    "whatToLookFor": [
      {
        "label": "Líneas de paso visibles",
        "description": "Busque límites de franjas verticales u horizontales distintos en transiciones suaves de cor RGB e escala de tons de cinza."
      },
      {
        "label": "Bandas específicas do canal",
        "description": "Observe si las bandas son más pronunciadas nos degradados de sombras azules u oscuras en comparación com a escala de tons de cinza de tonos medios."
      },
      {
        "label": "Cuantización de profundidad de bits",
        "description": "Los verdaderos paneles de 8 e 10 bits generan rampas suaves. Los paneles de 6 bits que dependen do control de velocidad de quadros (FRC) muestran un grano ou bandas sutiles."
      },
      {
        "label": "Rango dinámico limitado versus completo",
        "description": "Si su GPU transmite una señal limitada (16–235) a través de HDMI, los extremos do degradado oscuro e brillante se recortarán nítidamente."
      }
    ],
    "canObserve": [
      "Presencia visual de pasos de bandas de cor en escala de tons de cinza e gradientes de cores primarios/secundarios",
      "Comparación entre rampas de cor horizontales, verticales e multicanal",
      "Artefactos visuales resultantes de perfiles de cor de software ou configuraciones de rango dinámico de GPU"
    ],
    "cannotMeasure": [
      "Profundidad de bits de hardware directo (6 bits, 8 bits, 10 bits) independiente de los informes de GPU",
      "Desviación de cor Delta E cuantificada entre pasos de cor adyacentes",
      "Rendimiento do algoritmo de difuminado espacial a nivel de escalador de hardware"
    ],
    "interpretation": "Las bandas pueden deberse a limitaciones de hardware (paneles de 6 bits), configuraciones incorrectas do controlador (rango dinámico RGB limitado) ou perfiles de calibración ICC agresivos que truncan los valores de cor digitales.",
    "nextSteps": {
      "text": "¿Quiere simular pasos específicos de 6 bits, 8 bits e difuminado? Pruebe nuestra herramienta dedicada Bandas de cor e profundidad de bits.",
      "actionLabel": "Pruebe la teste de profundidad de bits e tramado",
      "actionHref": "/tests/color-banding-test"
    }
  },
  "uniformity-test": {
    "overview": "La uniformidad da tela mide la consistencia com a que un monitor reproduce el brilho e la temperatura do cor en toda su superficie. Las imperfecciones en la fabricación, las láminas de difusión da retroiluminación ou la iluminación de los bordes a menudo provocan esquinas más oscuras, puntos calientes centrales ou el efecto de tela sucia (DSE).",
    "whatToLookFor": [
      {
        "label": "Viñeteado de esquinas e bordes",
        "description": "Inspeccione las esquinas exteriores e los bordes perimetrales con un 25 %, 50 % e 75 % de cinza. Observe si las esquinas aparecen notablemente más oscuras."
      },
      {
        "label": "Efecto de tela sucia (DSE)",
        "description": "Busque patrones de textura tenues, turbios ou con manchas en el centro da tela, que se notan al desplazarse por tonos sólidos."
      },
      {
        "label": "Tinte de temperatura de cor",
        "description": "Observe si un lado da tela parece más cálido (rojizo/amarillento) e el lado opuesto más fríou (azulado)."
      },
      {
        "label": "Comparación zona por zona",
        "description": "Compare las celdas da cuadrícula de 5x5 para evaluar la variación relativa de luminancia desde el centro hasta el perímetro."
      }
    ],
    "canObserve": [
      "Caídas de luminancia visual, viñeteado de bordes e puntos calientes centrales en tons de cinza e blancos sólidos",
      "La temperatura do cor visual cambia entre las regiones do panel izquierdo, central e derecho",
      "Inspección en múltiples niveles de luminancia estandarizados de tons de cinza neutros e cores primarios"
    ],
    "cannotMeasure": [
      "Métricas de uniformidad porcentual (por ejemplo, '98,5% uniforme') sin rejillas de espectrofotómetro multipunto",
      "Variaciones de temperatura de cor correlacionada (CCT en Kelvin) entre las coordenadas do panel",
      "Estado de activación do circuito de compensación de uniformidad de fábrica (DUC)"
    ],
    "interpretation": "Los monitores de consumo generalmente toleran una caída de luminancia do 10 % al 15 % hacia los bordes. Los monitores gráficos profesionales emplean Compensación de Uniformidad Digital (DUC) para lograr una variación inferior al 5%.",
    "nextSteps": {
      "text": "Descubra por qué se producen el efecto de tela sucia e el viñeteado e cuándo se justifica el reemplazo do panel.",
      "actionLabel": "Leer la guía de uniformidad de tela",
      "actionHref": "/knowledge-base/backlight-bleed-vs-ips-glow"
    }
  },
  "text-clarity-test": {
    "overview": "La claridad do texto depende da densidad de píxeles do monitor (PPI), la configuraçãou de escala da tela, la geometría física de los subpixels (RGB, BGR, QD-OLED pentile) e los algoritmos de suavizado de fuentes do sistema operativo. Esta teste evalúa la legibilidad, los bordes de cor e la representación de fuentes en múltiples tamaños e pesos.",
    "whatToLookFor": [
      {
        "label": "Franjas de cor nos bordes da fuente",
        "description": "Inspeccione el texto preto de alto contraste sobre branco. Los tenues halos rojos ou cian a lo largo de los trazos verticales indican una discrepancia en el diseñou de los subpixels."
      },
      {
        "label": "Inversión de subpixels BGR",
        "description": "Algunos monitores utilizan diseños de subpixels BGR en lugar de RGB estándar, lo que provoca texto borroso a menos que se reconfigure Windows ClearType."
      },
      {
        "label": "Bordes de texto OLED",
        "description": "Las disposiciones de subpixels WOLED e QD-OLED triangulares producen sutiles franjas verdes ou magenta a lo largo de los bordes horizontales do texto."
      },
      {
        "label": "Desenfoque de escala fraccional",
        "description": "La escala de visualización no entera (como 125 % ou 150 %) puede causar una sutil suavidad en la rasterización de fuentes en aplicaciones de escritorio heredadas."
      }
    ],
    "canObserve": [
      "Franjas de cor visuales e halos en contornos de texto fino en tamaños de fuente de 8 px a 32 px",
      "Diferencias de representación de subpixels entre los pesos de fuente, serif frente a sans-serif e modos de inversión",
      "Impacto do zoom do navegador e la escala de visualización do sistema operativo en la nitidez de las fuentes"
    ],
    "cannotMeasure": [
      "Geometría física microscópica de subpixels sin lente macro ni microscopio",
      "Indicadores de configuraçãou do rasterizador de fuentes DirectWrite/ClearType internos do sistema operativo",
      "Función de transferencia de modulación de nitidez acústica u óptica (MTF)"
    ],
    "interpretation": "Si el texto aparece borroso con contornos de cores, volver a ejecutar Windows ClearType Tuner ou ajustar el suavizado de fuentes de macOS a menudo resuelve las incompatibilidades de diseñou RGB/BGR.",
    "nextSteps": {
      "text": "¿Ves fuentes borrosas ou franjas de cores alrededor do texto? Siga nuestra guía para ajustar ClearType e mostrar la escala.",
      "actionLabel": "Leer solución de problemas de claridad do texto",
      "actionHref": "/knowledge-base/troubleshooting#blurry-text-scaling"
    }
  },
  "hdr-capability-test": {
    "overview": "O teste des capacités HDR verifica si votre écran, votre système d'exploitation et votre navigateur prennent en charge les profils de haute dynamique (HDR10, Dolby Vision) et l'espace étendu.",
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
    "overview": "La mire de test HDR avalia le rendu des hautes lumières, le contraste dynamique et la gradation des détails sans écrêtage lumineux.",
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
    "overview": "La luz de fondo estroboscópica (ULMB, DyAc, ELMB, LightBoost) elimina el desenfoque do movimento do seguimiento ocular al encender la luz de fondo solo cuando los cristales líquidos han terminado de realizar la transición. Sin embargo, debido a que las telas escanean los píxeles de arriba a abajo mientras las luces de fondo parpadean globalmente en toda la tela, las transiciones de píxeles en la parte superior ou inferior pueden estar incompletas cuando se activa el pulso. Esta discrepancia de tiempo crea imágenes fantasma duplicadas conocidas como diafonía estroboscópica.",
    "whatToLookFor": [
      {
        "label": "Siluetas de doble imagen",
        "description": "Observe las barras en movimento nas pistas superior, central e inferior. Observe si ve una sola barra nítida ou un débil fantasma duplicado siguiéndola ou preparándola."
      },
      {
        "label": "Claridad superior versus central versus inferior",
        "description": "La mayoría de los monitores optimizan la fase estroboscópica para el centro da tela. La zona central debe mostrar movimento nítido de una sola imagen, mientras que las zonas superior e inferior suelen mostrar distintos grados de diafonía."
      },
      {
        "label": "Ancho e brilho do pulso estroboscópico",
        "description": "Los pulsos estroboscópicos más cortos producen un movimento más nítido pero un brilho general da tela más bajo. Ajuste el ciclo de trabajo do estroboscópico de su monitor en su OSD para equilibrar la claridad e la luminancia."
      }
    ],
    "canObserve": [
      "Visibilidad relativa de diafonía estroboscópica nas zonas verticales da tela.",
      "Identificación do punto óptimo de calibración de fase estroboscópica en su panel",
      "Comparación da reducción do desenfoque de movimento a distintas velocidades de panorámica"
    ],
    "cannotMeasure": [
      "Duración exacta do flash estroboscópico de retroiluminación en microsegundos",
      "Pico de luminancia estroboscópica fotométrica en nits sin fotodiodo",
      "Velocidad de escaneo do panel de hardware e intervalo de tiempo VSYNC"
    ],
    "interpretation": "Una pequeña cantidad de interferencias estroboscópicas nos bordes superior e inferior es normal nos monitores LCD. Una diafonía intensa en la zona central indica una fase estroboscópica no coincidente ou una desincronización da frecuencia de actualización.",
    "nextSteps": {
      "text": "Compare el movimento estroboscópico com ou desenfoque de movimento nativo de muestreo e retención.",
      "actionLabel": "Ejecutar teste de desenfoque de movimento",
      "actionHref": "/tests/motion-blur-test"
    }
  },
  "vrr-flicker-test": {
    "overview": "La frecuencia de actualización variable (VRR / G-Sync / FreeSync) hace coincidir dinámicamente la frecuencia de actualización da tela com a salida de renderizado da GPU. Sin embargo, la relajación do cristal líquido e las curvas de luminancia de los píxeles OLED varían según la duración do ciclo de actualización. Cuando las velocidades de quadros oscilan rápidamente, especialmente entre FPS altos e umbrales de límites más bajos, las curvas de luminancia cambian dinámicamente, produciendo un cintilação de brilho notable en áreas oscuras e casi negras.",
    "whatToLookFor": [
      {
        "label": "Bombeo de brilho casi preto",
        "description": "Observe los parches de 10% casi negros e 25% de cinza oscuro a medida que avanza el ciclo de barrido de velocidad de quadros automatizado. Busque pulsaciones rítmicas sutiles en la oscuridad general."
      },
      {
        "label": "Sacudida de transición LFC (compensación de baja velocidad de quadros)",
        "description": "Cuando la velocidad de cuadros cae por debajo do umbral mínimo de VRR (por ejemplo, por debajo de 48 Hz), los controladores de gráficos presentan una presentación de cuadro doble (LFC). Este rápido cambio de Hz puede provocar un cintilação momentáneo de luminancia."
      },
      {
        "label": "Cambio de gama OLED",
        "description": "Las telas OLED son particularmente propensas al cintilação gamma VRR porque los tiempos de carga de los subpixels dependen en gran medida da longitud do fotograma. Las texturas de las escenas oscuras pueden parpadear visiblemente durante las caídas da velocidad de quadros."
      }
    ],
    "canObserve": [
      "Identificación visual de cambios en la curva gamma a través de niveles de luminancia de cor cinza oscuro",
      "Detección de bombeo de brilho durante la oscilación de velocidad de quadros simulada",
      "Comparación entre la sensibilidad al cintilação do cinza sutil de tonos medios e la sensibilidad al cintilação casi preto"
    ],
    "cannotMeasure": [
      "Paquetes de temporización de sincronización adaptativa de GPU a tela de hardware",
      "Fluctuaciones exactas de voltaje de subpixels OLED en milivoltios",
      "Detección automática sin evaluación visual do usuario"
    ],
    "interpretation": "Si observa fuertes pulsaciones de brilho, su tela tiene curvas gamma VRR sensibles. Limite su velocidad de quadros ligeramente por debajo da frecuencia de actualización máxima ou desactive VRR en juegos con tiempos de quadros inestables para evitar el cintilação.",
    "nextSteps": {
      "text": "Verifique el rango e la compatibilidad com a frecuencia de actualización variable de su tela.",
      "actionLabel": "Ejecute la teste de capacidad de VRR",
      "actionHref": "/tests/vrr-test"
    }
  },
  "pursuit-camera-test": {
    "overview": "Los ojos humanos siguen los objetos en movimento en la tela con un movimento de persecución suave e continuo. Las fotografías de cámaras fijas estándar no pueden capturar el desenfoque de movimento real porque no se mueven com ou ojo. Una cámara de seguimiento rastrea el patrón de movimento a una velocidad exacta, lo que permite la captura fotográfica do tiempo de respuesta de imagen en movimento (MPRT) percibido real e la mancha fantasma.",
    "whatToLookFor": [
      {
        "label": "Alineación de graduación temporal",
        "description": "La pista superior contiene marcas de graduación blancas verticales. Al realizar un seguimiento fluido con su cámara ou teléfono, estas marcas se fusionarán en una única línea vertical nítida en su foto."
      },
      {
        "label": "Artefactos fantasmas e rastreros",
        "description": "Una vez que se verifica la sincronización do seguimiento mediante marcas verticales nítidas, examine el borde posterior do objeto en movimento para ver la decadencia do fósforo, las coronas sobrecargadas ou los rastros fantasma."
      },
      {
        "label": "Sobremarcha Sobreimpulso (Coronas)",
        "description": "Un contorno brillante que se arrastra detrás do objeto en movimento indica una sobrecarga excesiva de píxeles do monitor (efecto fantasma inverso)."
      }
    ],
    "canObserve": [
      "Sincronización de panorámica de cámara mediante verificación de seguimiento de graduación temporal",
      "Ancho do frotis visual directamente proporcional al MPRT percibido",
      "Distinción entre desenfoque de transición de píxeles (GtG) e desenfoque de seguimiento ocular de muestreo e retención (MPRT)"
    ],
    "cannotMeasure": [
      "Cálculo MPRT automático sin tomar ni medir una fotografía de seguimiento",
      "Curvas de respuesta óptica de fotodiodos de submilisegundos",
      "Velocidad do riel de seguimiento óptico sin hardware calibrado"
    ],
    "interpretation": "Cuando las marcas de graduación temporal forman una línea vertical limpia en su exposición, el seguimiento se sincronizó. El ancho da mancha que se arrastra sobre el objeto refleja el verdadero desenfoque de movimento MPRT da tela.",
    "nextSteps": {
      "text": "Compare el rendimiento do movimento en diferentes configuraciones de overdrive en el OSD de su monitor.",
      "actionLabel": "Ejecutar teste de imagen fantasma",
      "actionHref": "/tests/ghosting-test"
    }
  },
  "audio-sync-test": {
    "overview": "O teste de synchronisation audio/vidéo verifica l'alignement temporel entre les repères sonores et les animations visuelles pour éliminer tout décalage (lip-sync).",
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
    "overview": "Los controladores de juegos utilizan potenciómetros analógicos ou sensores magnéticos de efecto Hall para traducir el movimento do joystick en coordenadas direccionales. Con el tiempo, el desgaste interno do limpiador de carbono, la degradación de los resortes e la contaminación por polvo hacen que la palanca registre coordenadas descentradas cuando permanece intacta, un defecto conocido como deriva da palanca.",
    "whatToLookFor": [
      {
        "label": "Deriva do palo en reposo",
        "description": "Suelte ambos joysticks por completo. Si el indicador en forma de cruz se encuentra fuera do punto cero central ou se desplaza continuamente, hay deriva da palanca."
      },
      {
        "label": "Error de circularidad",
        "description": "Gire los palos a lo largo de sus límites exteriores. Los gamepads de calidad producen un círculo limpio e suave sin quedar plano nas esquinas diagonales."
      },
      {
        "label": "Umbral de zona muerta",
        "description": "Comprueba hasta qué punto debes empujar la palanca antes de que responda la coordenada. Las zonas muertas excesivas hacen que apuntar sea lento, mientras que las zonas muertas demasiado pequeñas provocan desviaciones."
      },
      {
        "label": "Suavidad do disparador analógico",
        "description": "Apriete gradualmente los gatillos LT e RT. La lectura do porcentaje debe subir suavemente do 0 % al 100 % sin saltar ni quedarse pegado."
      }
    ],
    "canObserve": [
      "Lecturas de coordenadas X/Y do joystick analógico en tiempo real e valores de deriva en reposo",
      "Matriz de actuación digital completa de 16 botones e porcentajes de presión de disparo analógico",
      "Estado de conexión do controlador, nombre de ID do dispositivo e tasa de sondeo a través da API HTML5 Gamepad"
    ],
    "cannotMeasure": [
      "Resistencia física do limpiador do potenciómetro en ohmios",
      "Nivel de voltaje da batería interna (a menos que sea compatible con extensiones de navegador patentadas)",
      "Interferencias de radio inalámbricas Bluetooth ou tasas de caída de paquetes"
    ],
    "interpretation": "Un valor de coordenadas en reposo inferior a 0,05 (5 %) suele ser absorbido por las zonas muertas do juego estándar. Los valores superiores a 0,10 (10%) provocarán una desviación visible da cámara en el juego e sugerirán una recalibración ou limpieza.",
    "nextSteps": {
      "text": "Pruebe la latencia de entrada de su tela e su tiempo de reacción personal.",
      "actionLabel": "Ejecutar teste de tiempo de reacción",
      "actionHref": "/tests/reaction-time-test"
    }
  },
  "battery-test": {
    "overview": "O teste de batterie monitora l'état de charge, l'autonomie estimée et l'impact énergétique de l'écran sur votre appareil portable.",
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
    "overview": "O teste de vitesse réseau mede le débit descendant, la latence et la stabilité de votre connexion Internet directement dans le navigateur.",
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
    "overview": "El Simulador de daltonismo aplica filtros de matriz de cor SVG calibrados matemáticamente para emular 8 tipos distintos de deficiencia de visión do cor (CVD). Permite a los desarrolladores e diseñadores evaluar la legibilidad da interfaz de usuario, las relaciones de contraste e la accesibilidad a la información codificada por cores.",
    "whatToLookFor": [
      {
        "label": "Protanopía e protanomalía (rojo-débil)",
        "description": "La deficiencia de cono L hace que los rojos puros parezcan marrón oscuro ou carbón; Las distinciones rojo-verde disminuyen."
      },
      {
        "label": "Deuteranopia e Deuteranomalía (Verde-Débil)",
        "description": "La deficiencia do cono M desdibuja los verdes e rojos en tonos amarillentos; la forma más frecuente de ECV."
      },
      {
        "label": "Tritanopía e tritanomalía (azul-débil)",
        "description": "La deficiencia do cono S hace que los azules parezcan verdosos e los amarillos parezcan violeta claro ou cinza."
      },
      {
        "label": "Acromatopsia (monocromacia total)",
        "description": "Ausencia total de fotorreceptores cónicos funcionales, percibiendo la visualización en tonos puros de cinza."
      }
    ],
    "canObserve": [
      "Transformación óptica en tiempo real de texto, íconos, gráficos e muestras en 8 matrices CVD",
      "Comparación lado a lado da visión tricromática normal frente a la deficiencia de cor simulada",
      "Degradación do contraste entre los indicadores clave de estado da interfaz de usuario (verde de éxito frente a rojo de error)",
      "Legibilidad do texto contra los tonos de fondo bajo cada variante de visión do cor."
    ],
    "cannotMeasure": [
      "Diagnóstico clínico da capacidad genética de visión do cor do usuario humano (p. ej., teste Farnsworth-Munsell 100-Hue)",
      "Variaciones exactas da sensibilidad retiniana de conos e bastones individuales",
      "Visualización física de picos de emisión espectral sin espectroradiómetro."
    ],
    "interpretation": "Si sus indicadores críticos da interfaz de usuario (como alertas de error, gráficos ou botones de acción principal) se vuelven indistinguibles en Deuteranopia ou Protanopia, complemente las señales de cor con íconos, tipografía en negrita e contornos de formas distintas para cumplir con las pautas WCAG 2.2.",
    "nextSteps": {
      "text": "Inspeccione la cobertura da gama de cores física de su monitor en sRGB e DCI-P3.",
      "actionLabel": "Comprobar gama de cores",
      "actionHref": "/tests/color-gamut-test"
    }
  },
  "screen-recorder": {
    "overview": "O gravador de tela permite capturer votre écran ou une fenêtre d'application en haute résolution et à cadence élevée sans installer de logiciel.",
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
    "overview": "O teste du mode sombre verifica la détection automatique du thème du système et la lisibilité des éléments graphiques sur fond sombre.",
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
    "overview": "El visualizador de retraso de entrada proporciona un punto de referencia estadístico de reacción de 10 testes e latencia de canalización. Mide el delta entre un estímulo visual aleatorio e el registro do clic do mouse ou la actuación do teclado, gráficando el promedio, la desviación estándar e un histograma de distribución de respuesta.",
    "whatToLookFor": [
      {
        "label": "Tiempo de reacción do estímulo visual",
        "description": "Mide los milisegundos transcurridos desde el cuadro exacto do cambio de cor hasta el clic do puntero."
      },
      {
        "label": "Consistencia estadística (Std Dev)",
        "description": "Una desviación estándar baja (< 25 ms) indica una sincronización de canalización de hardware e percepción consistente."
      },
      {
        "label": "Picos atípicos e comienzos en falso",
        "description": "Detecta clics preventivos realizados antes de que aparezca el disparador visual verde."
      },
      {
        "label": "Histograma de distribución",
        "description": "Visualiza la agrupación de latencia para distinguir la reacción biológica de los retrasos nas colas do sistema."
      }
    ],
    "canObserve": [
      "Marcas de tiempo de milisegundos de alta resoluçãou a través de performance.now() desde la representación do estímulo hasta el envíou do evento",
      "Métricas estadísticas: promedio, mejor (más rápido), peor (más lento) e desviación estándar en 10 ensayos",
      "Máquina de estado visual en tiempo real que evita clics falsos",
      "Histograma de tiempo de respuesta que asigna depósitos de latencia"
    ],
    "cannotMeasure": [
      "Latencia de clic a fotón de fotodiodo óptico aislado sin sondas de hardware externas (por ejemplo, LDAT)",
      "Microintervalos de sondeo USB internos separados da programación de interrupciones do sistema operativo",
      "Tiempo de respuesta de sobremarcha do monitor físico"
    ],
    "interpretation": "Una reacción humana combinada más una puntuación de canal de visualización de 180 ms a 240 ms es típica para configuraciones de juegos de alta actualización. Las puntuaciones superiores a 300 ms sugieren un retraso en el posprocesamiento da visualización (modo de juego desactivado) ou una mayor latencia de entrada.",
    "nextSteps": {
      "text": "Verifique la frecuencia de actualización do hardware real de su tela e el ritmo de entrega de quadros.",
      "actionLabel": "Iniciar teste de frecuencia de actualización",
      "actionHref": "/tests/refresh-rate-test"
    }
  },
  "ambient-light-test": {
    "overview": "El inspector do sensor de luz ambiental lee los niveles de iluminancia en lux (lx) utilizando la API AmbientLightSensor. Evalúa las condiciones de iluminación da habitación, proporciona recomendaciones ergonómicas de brilho da tela e representa gráficamente las fluctuaciones da luz a lo largo do tiempo.",
    "whatToLookFor": [
      {
        "label": "Iluminancia Lux en tiempo real",
        "description": "Supervisa la intensidad da luz ambiental en lux capturada por fotodetectores de dispositivos integrados."
      },
      {
        "label": "Consejos de brilho ergonómico",
        "description": "Recomienda niveles óptimos do control deslizante de nit/brilho do monitor para las condiciones actuales de su habitación."
      },
      {
        "label": "Advertencia de riesgo de deslumbramiento",
        "description": "Identifica si una iluminación ambiental intensa (> 1000 lx) requiere sombreado antideslumbrante ou brilho máximo."
      },
      {
        "label": "Estabilidad da iluminación ambiental",
        "description": "Realiza un seguimiento de los cambios de iluminación da habitación a lo largo do tiempo para identificar bombillas parpadeantes ou cambios de luz natural."
      }
    ],
    "canObserve": [
      "Valores de iluminancia ambiental en tiempo real en lux de fotodetectores de hardware",
      "Categorización de zonas de iluminación (Totalmente oscuro, Habitación tenue, Oficina, Interiores luminosos, Luz natural)",
      "Porcentaje de brilho de tela recomendado según las pautas de ergonomía ISO",
      "Gráfico histórico de niveles de luz durante la sesión activa."
    ],
    "cannotMeasure": [
      "Lecturas de luz ambiental en navegadores ou sistemas operativos que carecen de compatibilidad con API de sensor genérico",
      "Temperatura de cor (Kelvin) ou clasificación CRI da iluminación da habitación sin un sensor ambiental RGB",
      "Ángulos do vector de deslumbramiento direccional que inciden en la superficie do panel"
    ],
    "interpretation": "Para una lectura cómoda sin fatiga visual, un entorno de oficina debe oscilar entre 300 lux e 500 lux com ou brilho da tela configurado en aproximadamente 120-150 nits. Los valores inferiores a 50 lx requieren reducir el brilho da tela para minimizar la fatiga.",
    "nextSteps": {
      "text": "Calibre el brilho da tela e el umbral do nivel de preto.",
      "actionLabel": "Iniciar teste de brilho",
      "actionHref": "/tests/brightness-test"
    }
  },
  "dpi-calculator": {
    "overview": "A calculadora de DPI et PPI détermine la densité physique de pixels de votre écran selon sa diagonale et sa résolution native.",
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
    "overview": "Las testes de diseñou de subpixels analizan la geometría física microscópica de las tiras emisoras rojas, verdes e azules dentro de cada píxel. Las variaciones entre los diseños RGB estándar, BGR invertido, QD-OLED triangular e WOLED determinan directamente si el antialiasing de texto do sistema operativo (como Windows ClearType) aparece nítido ou presenta halos de cor magenta/verde.",
    "whatToLookFor": [
      {
        "label": "Estructura de geometría de subpixels",
        "description": "Identifica si su panel utiliza franjas verticales RGB estándar, franjas BGR ou subpixels triangulares no estándar."
      },
      {
        "label": "Bordes de texto de alto contraste",
        "description": "Inspecciona el texto preto sobre branco e branco sobre preto en busca de halos de cores (verde arriba, magenta abajo)."
      },
      {
        "label": "Alineación de cuadrícula de 1px",
        "description": "Verifica si las líneas alternas de 1 píxel se representan como un cinza completamente neutro sin artefactos de cor."
      },
      {
        "label": "Calibración de antialiasing ClearType",
        "description": "Evalúa si la ejecución de Windows cttune ou el suavizado de fuentes elimina la decoloración de los bordes."
      }
    ],
    "canObserve": [
      "Artefactos de franjas de cor representados en fuentes serif, sans-serif e monoespaciadas de alto contraste",
      "Alineación de subpixels contra rejillas de líneas verticales e horizontales alternas de 1 píxel calibradas",
      "Simulación visual de estructuras de emisión de subpixels en 6 arquitecturas de paneles principales"
    ],
    "cannotMeasure": [
      "Verificación óptica con microscopio físico da geometría do emisor de silicio submilimétrico",
      "configuraçãou de registro directo do rasterizador de fuentes do sistema operativo host",
      "Interpolación de subpixels do escalador de hardware dentro de tarjetas de captura de video externas"
    ],
    "interpretation": "Si el texto muestra bordes verdes ou magenta tenues en una tela de 1440p ou 4K, es probable que su tela tenga un diseñou de subpixels BGR ou QD-OLED. Ejecutar Windows ClearType Tuner ou cambiar a antialiasing en escala de tons de cinza resolverá los bordes.",
    "nextSteps": {
      "text": "¿Quiere inspeccionar la nitidez general da tela e la escala de resoluçãou?",
      "actionLabel": "Iniciar teste de claridad de texto",
      "actionHref": "/tests/text-clarity-test"
    }
  },
  "pwm-flicker-test": {
    "overview": "La modulación de ancho de pulso (PWM) es una técnica de atenuación utilizada por ciertas luces de fondo LCD e paneles OLED que enciende e apaga rápidamente la fuente de luz para lograr un brilho más bajo. Si bien es invisible a simple vista en altas frecuencias, el PWM de baja frecuencia (120 Hz a 480 Hz) provoca fatiga visual intensa, ojos secos, dolores de cabeza e migrañas.",
    "whatToLookFor": [
      {
        "label": "Perlas fantasma estroboscópicas",
        "description": "Mover los ojos ou agitar un objeto frente a la tela rompe las líneas en movimento en distintas cuentas fantasmas si hay PWM presente."
      },
      {
        "label": "Líneas de escaneo do obturador do teléfono inteligente",
        "description": "El uso da cámara de un teléfono a 1/1000 ou más rápido revela bandas horizontales de desplazamiento oscuro causadas por la modulación do ciclo de trabajo."
      },
      {
        "label": "Umbral de brilho sin parpadeos",
        "description": "Identifica en qué porcentaje de brilho OSD do monitor la tela cambia de atenuación de CC a PWM."
      },
      {
        "label": "Luminiscencia do ciclo de trabajo",
        "description": "Mide la relación óptica entre la duración de ENCENDIDO e la duración de APAGADO durante cada ciclo de atenuación."
      }
    ],
    "canObserve": [
      "Patrones de interferencia estroboscópica visual generados por rejillas de desplazamiento de alta velocidad",
      "Interacción óptica entre los movimentos oculares sacádicos do usuario e los ciclos de actualización do panel.",
      "Directrices para la verificación da frecuencia PWM da cámara de un teléfono inteligente"
    ],
    "cannotMeasure": [
      "Frecuencia de pulso físico exacta en Hertz sin una sonda de osciloscopio de fotodiodo externo",
      "Índice de distorsión armónica do circuito controlador LED.",
      "Ondulación de microvoltaje en el riel de alimentación de retroiluminación"
    ],
    "interpretation": "Las telas certificadas como \"sin cintilação\" ou \"TÜV Eye Comfort\" utilizan corriente directa (CC) continua para atenuar el brilho hasta un 0 %. Si ve rastros de cuentas fantasma, su panel utiliza atenuación PWM en configuraciones de brilho bajo.",
    "nextSteps": {
      "text": "¿Quiere probar las fluctuaciones de luminancia VRR de alta frecuencia?",
      "actionLabel": "Inicie la teste de cintilação VRR",
      "actionHref": "/tests/vrr-flicker-test"
    }
  },
  "dead-pixel-mapper": {
    "overview": "Dead Pixel RMA Coordinate Mapper es una herramienta de inspección interactiva diseñada para documentar píxeles de paneles defectuosos. Permite a los compradores identificar las coordenadas de los píxeles defectuosos, clasificar los defectos por tipo, calcular la elegibilidad da garantía ISO 9241-307 e exportar registros formales de inspección RMA para reclamos de reemplazo do fabricante.",
    "whatToLookFor": [
      {
        "label": "Píxeles muertos (oscuros)",
        "description": "Tríadas de subpixels permanentemente desconectadas que permanecen completamente negras contra telas blancas, cian e amarillas."
      },
      {
        "label": "subpixels atascados (brillantes)",
        "description": "subpixels bloqueados en un estado abierto, brillando en rojo, verde, azul ou branco sobre fondos negros puros."
      },
      {
        "label": "Coordenadas do defecto (X, Y)",
        "description": "Dirección de píxel precisa desde el origen superior izquierdo para demostrar la ubicación do defecto a los técnicos de servicio."
      },
      {
        "label": "Umbrales de clase ISO 9241-307",
        "description": "Comparación automática con los límites de reemplazo de Clase 1 (Cero defectos) e Clase 2 (Asignación al consumidor)."
      }
    ],
    "canObserve": [
      "Coordenadas de tela exactas (X, Y) de los puntos defectuosos registrados en 9 fondos de teste sólidos",
      "Cálculo da agrupación de defectos da zona central versus la zona periférica",
      "Cumplimiento de devolución de garantía ISO 9241-307 Clase 1 e Clase 2"
    ],
    "cannotMeasure": [
      "Detección algorítmica automática de defectos sin inspección visual manual do usuario",
      "Polvo de vidrio subterráneo versus falla real do transistor TFT sin aumento óptico",
      "Continuidad eléctrica interna do IC do controlador do panel"
    ],
    "interpretation": "La mayoría de los principales fabricantes de monitores (Dell, LG, ASUS, Samsung) cumplen com a norma ISO 9241-307 Clase 2, que permite hasta 2 píxeles muertos completos ou 5 subpixels atascados por millón. Las telas profesionales e de juegos premium a menudo cuentan con cobertura Zero Bright Dot (Clase 1).",
    "nextSteps": {
      "text": "¿Se han atascado subpixels que permanecen encendidos? Intente revivirlos con nuestro ejercitador de alta velocidad.",
      "actionLabel": "Inicie el reparador de píxeles atascados",
      "actionHref": "/tests/stuck-pixel-fixer"
    }
  },
  "gtg-response-time-test": {
    "overview": "El tiempo de respuesta de cinza a cinza (GtG) mide el tiempo necesario para que un píxel de cristal líquido pase de un nivel de cinza intermedio arbitrario a otro. Si bien los fabricantes anuncian GtG de 1 ms ou 0,5 ms, las transiciones en el mundo real varían significativamente e las configuraciones de overdrive agresivas a menudo causan un efecto fantasma inverso severo (sobreimpulso).",
    "whatToLookFor": [
      {
        "label": "Manchas negras do panel VA",
        "description": "Inspecciona las transiciones de 0 % de preto puro a 20 % de cinza oscuro, donde los cristales líquidos VA son más lentos."
      },
      {
        "label": "Sobremarcha Sobreimpulso (Coronas)",
        "description": "Comprueba si hay halos invertidos de cor branco brillante u oscuros detrás de objetos en movimento causados ​​por un voltaje de sobremarcha excesivo."
      },
      {
        "label": "Desenfoque inicial vs final",
        "description": "Compara el tiempo de subida (de oscuro a claro) com ou tiempo de caída (de claro a oscuro) en objetivos en movimento a alta velocidad."
      },
      {
        "label": "Equilibrio do modo Overdrive",
        "description": "Guía la selección do nivel de sobremarcha OSD óptimo (Apagado, Normal, Rápido, Extremo)."
      }
    ],
    "canObserve": [
      "Senderos visuales fantasma a través de valores de luminancia de tons de cinza iniciales e finales personalizables",
      "Simulación de sobreimpulso de corona de sobremarcha en niveles de sobremarcha de cristal líquido estándar",
      "nitidez e claridad de los bordes de objetos en movimento a través de niveles de velocidad calibrados"
    ],
    "cannotMeasure": [
      "Curvas de transición de osciloscopio de fotodiodo de submilisegundos (tiempo de subida do 10% al 90%)",
      "Valores de búsqueda da tabla de voltaje de sobremarcha interna dentro do escalador de monitor ASIC",
      "Cambios en la viscosidad do cristal líquido que dependen da temperatura"
    ],
    "interpretation": "Si los objetos en movimento muestran un halo brillante ou una silueta inversa, el OSD Overdrive de su monitor está configurado demasiado alto (\"Extremo\"). Volver a marcar a 'Rápido' ou 'Normal' brindará una claridad de movimento más limpia sin artefactos de corona.",
    "nextSteps": {
      "text": "¿Quieres comparar la nitidez de los OVNIs en movimento e el desenfoque persistente?",
      "actionLabel": "Lanzar teste de imagen fantasma",
      "actionHref": "/tests/ghosting-test"
    }
  },
  "oled-burn-in-calculator": {
    "overview": "A calculadora de rémanence OLED avalia le risque de marquage permanent en fonction de vos habitudes d'utilisation quotidienne et de la luminosité.",
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
    "overview": "O teste de fréquence de souris mede le taux d'interrogation (Hz) et la régularité des rapports de position de votre souris ou périphérique de pointage.",
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
    "overview": "O benchmark graphique WebGL avalia les performances de rendu 3D de votre carte graphique et la stabilité du débit d'images sous charge.",
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
    "overview": "El Certificado de inspección de exhibición es una herramienta formal de documentación de calidad. Agrega parámetros de hardware detectados automáticamente (resoluçãou nativa, profundidad de cor, amplia gama, densidad de píxeles) con calificaciones de inspección visual manual para generar un informe de inspección certificado e imprimible para calificaciones de reventa ou reclamos de garantía RMA do fabricante.",
    "whatToLookFor": [
      {
        "label": "Registro de especificaciones de hardware",
        "description": "Certifica la resoluçãou nativa do panel, la profundidad de bits do cor, la proporción de píxeles do dispositivo e la compatibilidad con una amplia gama de cores."
      },
      {
        "label": "Resumen de auditoría de defectos",
        "description": "Registra recuentos exactos de píxeles muertos, subpixels atascados e gravedad do sangrado de retroiluminación."
      },
      {
        "label": "Cumplimiento da norma ISO 9241-307",
        "description": "Documenta si el panel cumple con los criterios de reemplazo do consumidor Clase 1 (cero puntos brillantes) ou Clase 2."
      },
      {
        "label": "Diseñou de verificación listo para imprimir",
        "description": "Formatea todos los datos en un certificado limpio e certificado con marca de agua optimizado para la exportación e impresión de PDF."
      }
    ],
    "canObserve": [
      "Recopilación de parámetros de visualización informados por el sistema e grados de calidad verificados por el usuario.",
      "Generación de ID de verificación criptográfica únicas e marcas de tiempo de inspección",
      "Diseñou de documentos optimizado para impresión que oculta la navegación e los controles interactivos da interfaz de usuario."
    ],
    "cannotMeasure": [
      "Lectura automatizada do número de serie do panel físico desde el firmware EDID interno (requiere entrada manual)",
      "Suscripción legal de reclamaciones de garantía do fabricante fuera de los centros de servicio oficiales do fabricante.",
      "Precisión do cor do espectrorradiómetro Verificación Delta E sin corímetros de hardware externos"
    ],
    "interpretation": "Los certificados de inspección de telas brindan documentación confiable al comprar ou vender monitores usados ​​ou al presentar reclamos de devolución RMA durante los períodos de devolución do fabricante.",
    "nextSteps": {
      "text": "¿Necesita identificar las coordenadas de píxeles defectuosos antes de generar su certificado?",
      "actionLabel": "Inicie el mapeador de píxeles muertos",
      "actionHref": "/tools/dead-pixel-mapper"
    }
  },
  "osd-calibration-guide": {
    "overview": "El Asistente de calibración do monitor OSD interactivo es una guía visual para calibrar los botones físicos do hardware de visualización en tela (OSD) de su tela. Guía a los usuarios a través de 6 pasos esenciales: brilho, contraste, gamma 2.2, temperatura de cor de 6500 K, nitidez e sobremarcha, sin necesidad de costosos corímetros de hardware.",
    "whatToLookFor": [
      {
        "label": "brilho (recorte preto)",
        "description": "Ajusta el brilho de OSD para que el parche n.° 16 sea apenas visible mientras que el parche n.° 0 permanezca preto como la tinta."
      },
      {
        "label": "Contraste (saturación de blancos)",
        "description": "Ajusta el contraste de OSD para que el parche casi branco #253 permanezca distinguible do branco puro #255."
      },
      {
        "label": "Mezcla óptica gamma 2.2",
        "description": "Alinea la luminancia de los medios tonos usando un patrón óptico donde el disco central se mezcla en 2,2."
      },
      {
        "label": "Temperatura de cor (6500K D65)",
        "description": "Equilibra los controles deslizantes de ganancia rojo, verde e azul para lograr tonos blancos e tons de cinza limpios e neutros."
      }
    ],
    "canObserve": [
      "Objetivos de retroalimentación visual diseñados específicamente para rangos de ajuste OSD de monitores estándar",
      "Tableros de mezcla óptica que verifican la alineación de sRGB Gamma 2.2 sin sondas de calibración",
      "Texto de alto contraste e objetivos de bloques móviles para ajustar la nitidez e los niveles de sobremarcha"
    ],
    "cannotMeasure": [
      "Control directo do software sobre los botones OSD do monitor físico mediante el protocolo DDC/CI",
      "Temperatura de cor exacta en Kelvin sin espectrofotómetro ni sonda de corímetro",
      "Calibración interna de hardware LUT (Look-Up Table) dentro de monitores profesionales de gradación de cor"
    ],
    "interpretation": "La configuraçãou predeterminada de fábrica do monitor casi siempre está sobresaturada, demasiado brillante (100%) e demasiado fría (8000K+). Seguir esta guía de ajuste OSD de 6 pasos acercará significativamente su tela a los estándares internacionales de masterización sRGB/Rec.709.",
    "nextSteps": {
      "text": "¿Quiere verificar la cobertura da gama de cores e la precisión de ColorChecker?",
      "actionLabel": "Iniciar la teste de precisión do cor",
      "actionHref": "/tests/color-accuracy-test"
    }
  },
  "bright-pixel-test": {
    "overview": "Los píxeles brillantes ou calientes son subpixels (rojo, verde, azul ou branco) que permanecen atrapados en un estado iluminado ou parcialmente energizado, visibles contra fondos negros puros e oscuros.",
    "whatToLookFor": [
      {
        "label": "Puntos de subpixels calientes",
        "description": "Pinchazos de cor brillantes aislados visibles contra marcos oscuros en una habitación oscura."
      },
      {
        "label": "Resplandor cromático de subpixels",
        "description": "Los canales de subpixels rojos, verdes ou azules individuales se quedan abiertos mientras los subpixels vecinos están apagados."
      },
      {
        "label": "Píxeles calientes agrupados",
        "description": "Múltiples píxeles brillantes defectuosos agrupados muy juntos, que normalmente califican para devolución en garantía."
      },
      {
        "label": "Sangrado versus píxeles brillantes",
        "description": "Distinga los pinchazos nítidos de 1 píxel do sangrado difuso e nublado da retroiluminación do borde."
      }
    ],
    "canObserve": [
      "Coordenadas exactas de píxeles en tonos negros (#000000) e fondos oscuros",
      "Aislamiento do canal de cor nos marcos de teste blancos e RGB primarios",
      "Relación de contraste entre los subpixels calientes e el lienzo circundante oscuro"
    ],
    "cannotMeasure": [
      "Corriente de fuga de puerta de transistor de silicio",
      "Profundidad do defecto físico do cristal de silicio debajo do sustrato de vidrio",
      "Características de deriva térmica do panel posterior"
    ],
    "interpretation": "Las telas ISO 9241-307 Clase 1 no permiten píxeles brillantes, mientras que los paneles Clase 2 normalmente permiten hasta 2 píxeles permanentemente brillantes por millón.",
    "nextSteps": {
      "text": "¿Has localizado un subpixel atascado? Intente una estimulación visual rápida para despegarlo.",
      "actionLabel": "Inicie el reparador de píxeles atascados",
      "actionHref": "/tests/stuck-pixel-fixer"
    }
  },
  "burn-in-test": {
    "overview": "El desgaste da tela (retención permanente da imagen) se produce cuando los compuestos orgánicos OLED ou los fósforos se degradan de manera desigual debido a elementos estáticos de alta luminosidad, como barras de tareas, logotipos de canales ou medidores HUD.",
    "whatToLookFor": [
      {
        "label": "Siluetas fantasmas da barra de tareas",
        "description": "Contornos tenues de las barras de tareas do sistema operativo ou de las barras de navegación do navegador visibles en cinza en tela completa."
      },
      {
        "label": "HUD e sombras do logotipo",
        "description": "Sombras persistentes de barras estáticas de salud de videojuegos ou carteles de noticias de televisión."
      },
      {
        "label": "50% sombreado de campo cinza",
        "description": "Manchas moteadas desiguales ou falta de uniformidad de brilho en lienzos de cor cinza medio."
      },
      {
        "label": "Retención temporal versus permanente",
        "description": "Verifique se la sombra se disipa después de ejecutar contenido de vídeo no estático durante 15 minutos."
      }
    ],
    "canObserve": [
      "Siluetas tenues en la imagen residual en un 50 % de tons de cinza e cores primarios sólidos",
      "Consistencia de luminiscencia de cuadrante en toda el área de visualización",
      "Detección de huellas de límites estáticos en campos de cor uniformes"
    ],
    "cannotMeasure": [
      "Porcentaje de degradación química de subpixels emisores orgánicos OLED",
      "Horas totales de encendido do panel interno (POH)",
      "Contador de ciclos de compensación de fábrica e compensaciones de voltaje."
    ],
    "interpretation": "La retención de imagen temporal (TIR) ​​se desvanece en cuestión de minutos, mientras que la retención permanente permanece visible indefinidamente sobre fondos tons de cinza e coloreados uniformes.",
    "nextSteps": {
      "text": "Calcule el riesgo de desgaste a largo plazo de su panel en función de sus hábitos de uso diario.",
      "actionLabel": "Inicie la calculadora de desgaste OLED",
      "actionHref": "/tools/oled-burn-in-calculator"
    }
  },
  "color-test": {
    "overview": "Las testes de cor de tela evalúan la reproducción do cor primario e secundario, la pureza espectral de subpixels e la consistencia da representación do lienzo digital a analógico nos campos de cor de tela completa.",
    "whatToLookFor": [
      {
        "label": "Pureza e saturación do cor",
        "description": "Asegúrese de que el rojo, verde, azul, cian, magenta e amarillo sólidos llenen la tela de manera uniforme e sin manchas."
      },
      {
        "label": "Uniformidad cromática do borde",
        "description": "Verifique que los cores no cambien de matiz ou tono cerca de los límites do bisel exterior."
      },
      {
        "label": "Bandas en cores saturados",
        "description": "Inspeccione si los cores puros intensos provocan bandas de contorno ou posterización."
      },
      {
        "label": "Aislamiento de defectos de subpixels",
        "description": "Observe motas individuales oscuras ou descoloridas que se vuelven visibles solo en campos de cores específicos."
      }
    ],
    "canObserve": [
      "Visualización en tela completa de campos de cor hexadecimal sRGB e P3 calibrados",
      "Temperatura de cor visual de borde a borde e consistencia do tinte",
      "Respuesta de cambio de canal de cor sin imágenes residuales persistentes"
    ],
    "cannotMeasure": [
      "Coordenadas de cor espectrofotométricas absolutas (CIE 1931 xy)",
      "Nits de pico óptico por canal de cor individual",
      "Picos espectrales de fósforo de retroiluminación física"
    ],
    "interpretation": "Las telas IPS e OLED de calidad ofrecen una saturación de cor uniforme de borde a borde sin cambios de temperatura de cor ni tintes.",
    "nextSteps": {
      "text": "¿Quiere inspeccionar la precisión do cor e las desviaciones delta?",
      "actionLabel": "Iniciar la teste de precisión do cor",
      "actionHref": "/tests/color-accuracy-test"
    }
  },
  "grayscale-test": {
    "overview": "La teste de escala de tons de cinza evalúa la capacidad de un monitor para representar pasos de luminancia neutros e suaves desde el preto absoluto (0%) hasta el branco máximo (100%) sin matices cromáticos ni recortes de pasos.",
    "whatToLookFor": [
      {
        "label": "Equilibrio de tonos de tons de cinza neutros",
        "description": "Los escalones tons de cinza deben parecer completamente neutros sin tintes rosados, verdes ou azules."
      },
      {
        "label": "Separación de pasos distintos",
        "description": "Cada bloque en la rampa de 16 ou 32 escalones debe distinguirse individualmente de su vecino."
      },
      {
        "label": "Paso oscuro aplastado",
        "description": "Verifique que los pasos 1, 2 e 3 no colapsen en preto puro."
      },
      {
        "label": "Resaltar recorte de pasos",
        "description": "Verifique que los pasos más brillantes por debajo do 100% sean claramente visibles contra el branco puro."
      }
    ],
    "canObserve": [
      "Discriminación de luminancia gradual a través de rampas estandarizadas de 16/32/64 bloques",
      "Neutralidad óptica e equilibrio de cor entre parches vecinos en escala de tons de cinza.",
      "Representación do lienzo do navegador de pasos lineales e en escala de tons de cinza sRGB"
    ],
    "cannotMeasure": [
      "Función de transferencia física exponente de curva gamma sin corímetro",
      "Luminancia do suelo preto en candelas por metro cuadrado (cd/m²)",
      "Profundidad de bits da tabla de búsqueda interna de hardware (LUT 1D/3D)"
    ],
    "interpretation": "Incluso los pasos con equilibrio de cor neutro indican una calibración de fábrica adecuada. Los bloques tons de cinza teñidos indican una desviación do punto branco ou configuraciones de ganancia RGB desequilibradas.",
    "nextSteps": {
      "text": "Evalúe la curva matemática de transferencia de luminancia de su tela.",
      "actionLabel": "Iniciar teste gamma",
      "actionHref": "/tests/gamma-test"
    }
  },
  "saturation-test": {
    "overview": "Las testes de saturación verifican qué tan limpiamente una tela pasa de un cinza neutro completamente desaturado (0%) a un cor puro completamente saturado (100%) nos canales primarios e secundarios.",
    "whatToLookFor": [
      {
        "label": "Pasos de saturación lineal",
        "description": "Cada incremento do 10% do 0% al 100% debería mostrar un salto igual e distinto en la intensidad do cor."
      },
      {
        "label": "Recorte de cor prematuro",
        "description": "Asegúrese de que los cores no alcancen la saturación máxima prematuramente al 80% ou 90%."
      },
      {
        "label": "Cambios de tono durante la desaturación",
        "description": "Esté atento a los cambios de cor (por ejemplo, el rojo se vuelve naranja a medida que disminuye la saturación)."
      },
      {
        "label": "Sobresaturación de amplia gama",
        "description": "Verifique se los cores parecen naturalmente equilibrados ou anormalmente neón."
      }
    ],
    "canObserve": [
      "Rampas de saturación de 10 pasos en rojo, verde, azul, cian, magenta e amarillo",
      "Claridad visual de los límites de los pasos e suavidad de progresión",
      "Consistencia de sujeción do espacio de cor do navegador"
    ],
    "cannotMeasure": [
      "Porcentaje de pureza espectrofotométrica",
      "Distribución de potencia espectral de las emisiones de cor.",
      "Volumen físico da gama óptica en unidades CIELAB"
    ],
    "interpretation": "Las telas con una buena gestión do cor muestran incrementos de saturación claros e distintos sin aplanarse en bloques de cor sólido antes do 100%.",
    "nextSteps": {
      "text": "Inspeccione si su tela admite espacios de cor amplios más allá de sRGB.",
      "actionLabel": "Iniciar teste de gama de cores",
      "actionHref": "/tests/color-gamut-test"
    }
  },
  "color-banding-test": {
    "overview": "Las bandas de cor se producen cuando los gradientes sutiles se dividen en bandas escalonadas visibles ou contornos de posterización debido a una profundidad de bits insuficiente, una cuantificación da GPU ou un procesamiento deficiente da imagen do monitor.",
    "whatToLookFor": [
      {
        "label": "Contornos de bandas escalonadas",
        "description": "Líneas duras visibles a través de gradientes suaves en lugar de una transición perfecta."
      },
      {
        "label": "Posterización de degradado oscuro",
        "description": "Artefactos de pasos en bloques en regiones de sombras oscuras do degradado."
      },
      {
        "label": "Grano de ruido de tramado",
        "description": "Grano de ruido espacial fino visible cuando el tramado temporal ou espacial (FRC) está activo."
      },
      {
        "label": "Teñido de cor en degradados",
        "description": "Rayas cromáticas que aparecen dentro de degradados monocromáticos ou tons de cinza supuestamente neutros."
      }
    ],
    "canObserve": [
      "Suavidad de gradiente visual en gradientes RGB de 8 e 10 bits",
      "Presencia de ruido de tramado espacial e artefactos de cuantificación de pasos.",
      "Consistencia de renderizado de degradado lineal e radial"
    ],
    "cannotMeasure": [
      "Profundidad de bits do panel de hardware nativo (8 bits reales frente a 6 bits + FRC)",
      "Formato de cor de salida de GPU (submuestreo RGB 4:4:4 vs 4:2:2/4:2:0)",
      "Algoritmos de matriz de difuminado do escalador interno"
    ],
    "interpretation": "Los degradados suaves sin líneas marcadas indican una transmisión de cor adecuada de 8 ou 10 bits. Las bandas visibles sugieren limitaciones de FRC de 6 bits ou configuraciones de rango dinámico limitado.",
    "nextSteps": {
      "text": "Pruebe rampas de gradiente multicanal en espectros RGB personalizados.",
      "actionLabel": "Iniciar la teste de bandas de gradiente",
      "actionHref": "/tests/gradient-banding-test"
    }
  },
  "color-gamut-test": {
    "overview": "Las testes de gama de cores evalúan si su tela, controlador de GPU e navegador admiten espacios de cor amplios, como DCI-P3 e Rec. 2020 más allá do estándar sRGB.",
    "whatToLookFor": [
      {
        "label": "Objetivo de extensión de gama P3",
        "description": "Un símbolo ou número oculto visible solo en telas capaces de mostrar cores Display P3."
      },
      {
        "label": "Límite de sujeción sRGB",
        "description": "Observe si los cores fuera de sRGB se recortan ou se reproducen con precisión."
      },
      {
        "label": "Saturación de rojo intenso e verde",
        "description": "Verifique se los rojos e verdes se ven significativamente más ricos que nos monitores de oficina estándar."
      },
      {
        "label": "Estado de gestión do cor do navegador",
        "description": "Verifique que su navegador web esté utilizando activamente los perfiles de administración de cor do sistema operativo."
      }
    ],
    "canObserve": [
      "Detección de consultas de medios de gama de cores CSS do navegador (@media (cor-gamut: p3))",
      "Diferenciación visual entre parches de cor sRGB e Display P3",
      "Representación do perfil de cor de amplia gama de lienzos"
    ],
    "cannotMeasure": [
      "Cobertura porcentual de DCI-P3 ou AdobeRGB sin espectrofotómetro",
      "Volumen óptico en unidades CIELAB",
      "Longitudes de onda de emisión de fósforo físico."
    ],
    "interpretation": "Si el logotipo do indicador P3 se distingue claramente do fondo sRGB, el hardware de su tela, el sistema operativo e el navegador admiten activamente amplias gamas de cores.",
    "nextSteps": {
      "text": "Verifique el brilho máximo de alto rango dinámico e el manejo de metadatos.",
      "actionLabel": "Inicie la teste de capacidad HDR",
      "actionHref": "/tests/hdr-capability-test"
    }
  },
  "color-accuracy-test": {
    "overview": "La inspección da precisión do cor utiliza parches de cor de referencia estandarizados para detectar visualmente cambios de tono, errores de percepción do cor e distorsión do tono da piel en la tela.",
    "whatToLookFor": [
      {
        "label": "Uniformidad do parche de referencia",
        "description": "Inspeccione los parches estándar estilo ColorChecker para verificar su equilibrio e neutralidad."
      },
      {
        "label": "Naturalidad do tono de piel",
        "description": "Verifique que los tonos de piel do retrato no parezcan quemados artificialmente por el sol (demasiado rojos) ou ictéricos (demasiado amarillos)."
      },
      {
        "label": "Alineación do eje cinza neutro",
        "description": "Verifique que la fila cinza neutra muestre cero tintes cromáticos."
      },
      {
        "label": "Equilibrio de cor secundario",
        "description": "Asegúrese de que el cian, el magenta e el amarillo mantengan los tonos puros sin desviarse hacia los primarios."
      }
    ],
    "canObserve": [
      "Representación de paleta de cores de referencia estándar de 24 parches",
      "Alineación visual con valores de referencia digitales estandarizados",
      "Coherencia de parches en paralelo en todas las regiones da tela"
    ],
    "cannotMeasure": [
      "Valores de desviación numéricos Delta E (ΔE 2000) sin sensor externo",
      "Coordenadas absolutas CIE L*a*b*",
      "Impacto da llamarada de luz ambiental en la percepción"
    ],
    "interpretation": "Las telas bien calibradas mantienen el tono e la saturación precisos en todas las zonas de teste sin enrojecimiento excesivo nos tonos de piel ou tons de cinza verdosos.",
    "nextSteps": {
      "text": "Aprenda a calibrar su monitor usando controles de visualización en tela de hardware.",
      "actionLabel": "Inicie la guía de calibración OSD",
      "actionHref": "/tools/osd-calibration-guide"
    }
  },
  "brightness-test": {
    "overview": "Las testes de brilho inspeccionan los detalles de las sombras casi negras (niveles do 1 % al 10 %) para garantizar que los elementos oscuros de los juegos, películas e fotografías no queden aplastados en un tono preto impenetrable.",
    "whatToLookFor": [
      {
        "label": "Visibilidad do cuadrado casi preto",
        "description": "Las manchas cuadradas con valores de luminancia do 1% al 5% apenas deberían distinguirse do fondo preto."
      },
      {
        "label": "Separación de pasos oscuros",
        "description": "Cada cuadrado sucesivo debe ser visiblemente más brillante que el anterior."
      },
      {
        "label": "Piso nivel preto",
        "description": "El fondo debe permanecer preto intenso e no decolorarse hasta convertirse en cinza carbón."
      },
      {
        "label": "Impacto da iluminación da habitación",
        "description": "Apague las luces da habitación para verificar que los sutiles cuadrados oscuros sigan siendo discernibles."
      }
    ],
    "canObserve": [
      "Distinción visual de cuadrados casi negros frente a preto puro",
      "Umbral de visibilidad de paso a través de incrementos sutiles de luminancia",
      "Contraste entre el suelo preto e los niveles de cinza más bajos"
    ],
    "cannotMeasure": [
      "Pico absoluto ou luminancia mínima en candelas por metro cuadrado (nits)",
      "Curvas de regulación de voltaje de retroiluminación.",
      "Porcentaje de deslumbramiento reflejado en el ambiente"
    ],
    "interpretation": "Una visualización óptima revela el paso 2% ou 3% sin que el fondo preto de referencia do 0% se desvanezca e se convierta en un cinza brumoso.",
    "nextSteps": {
      "text": "Ahora verifique que las luces brillantes no se recorten en un branco puro.",
      "actionLabel": "Iniciar teste de contraste",
      "actionHref": "/tests/contrast-test"
    }
  },
  "contrast-test": {
    "overview": "Las testes de contraste verifican la relación dinámica entre los blancos más brillantes e los negros más oscuros, asegurando que tanto las texturas de las luces como los detalles de las sombras permanezcan visibles simultáneamente.",
    "whatToLookFor": [
      {
        "label": "Diferenciación de paso branco",
        "description": "Verifique que los cuadrados do 90% al 99% de luminancia se distingan do fondo branco puro."
      },
      {
        "label": "Separación de pasos negros",
        "description": "Verifique que los cuadrados oscuros do 1% al 10% permanezcan visibles contra el preto."
      },
      {
        "label": "Resaltar la floración",
        "description": "Asegúrese de que los bloques blancos brillantes no transmitan brilho óptico a las áreas oscuras adyacentes."
      },
      {
        "label": "Medios tonos descoloridos",
        "description": "Verifique que el contraste no se aumente artificialmente, lo que aplasta los degradados de cor."
      }
    ],
    "canObserve": [
      "Visibilidad simultánea de parches de teste casi blancos e casi negros",
      "Separación de límites a través de rampas de contraste de varios pasos",
      "Equilibrio de rango dinámico visual en toda la tela"
    ],
    "cannotMeasure": [
      "Relación de contraste ANSI estática (por ejemplo, 1000:1 frente a 3000:1) sin sonda óptica",
      "Velocidad de modulación de contraste dinámico",
      "Relación de reflectancia do panel"
    ],
    "interpretation": "El contraste configurado correctamente permite que los cuadrados casi blancos (hasta un 98 %) sean visibles sin recortarlos en branco puro, mientras se mantienen distintos los cuadrados casi negros.",
    "nextSteps": {
      "text": "Examine los detalles de las sombras profundas en entornos de visualización de cuartos oscuros.",
      "actionLabel": "Iniciar teste de nivel de preto",
      "actionHref": "/tests/black-level-test"
    }
  },
  "black-level-test": {
    "overview": "La teste de nivel de preto mide la reproducción de los detalles de las sombras e la profundidad do suelo preto, asegurando que las señales de luminancia más baja se representen con precisión sin aplastamiento do preto ni neblina cinza.",
    "whatToLookFor": [
      {
        "label": "Paso cinza visible más bajo",
        "description": "Localice el cuadro de porcentaje más bajo (1%, 2% ou 3%) que pueda distinguir do preto verdadero."
      },
      {
        "label": "Estabilidad do fondo preto puro",
        "description": "Confirme que el fondo exterior se renderice al 0% (RGB 0,0,0)."
      },
      {
        "label": "Resplandor versus profundidad negra",
        "description": "Tenga en cuenta si el fondo es realmente oscuro ou elevado por el brilho/sangrado de retroiluminación de IPS."
      },
      {
        "label": "Falta de uniformidad nas esquinas",
        "description": "Verifique se el nivel de preto aumenta cerca de las esquinas da tela en comparación com ou centro."
      }
    ],
    "canObserve": [
      "Umbral exacto do paso más bajo visible casi preto (1% a 8%)",
      "Profundidad visual do preto en una sala de visualización oscura",
      "Interferencia do brilho de las esquinas que afecta la percepción de las sombras."
    ],
    "cannotMeasure": [
      "Luminancia negra mínima absoluta en cd/m² (nits)",
      "Relación de polarización de bloqueo de luz de cristal líquido",
      "Integridad do sello da luz do panel"
    ],
    "interpretation": "En los paneles OLED, el preto verdadero emite 0 nits. En los paneles LCD, un brilho tenue es normal, pero los pasos do 1% al 2% deben permanecer distintos do fondo.",
    "nextSteps": {
      "text": "Pruebe la respuesta en escala de tons de cinza de baja luminosidad cerca do 0 % al 5 %.",
      "actionLabel": "Lanzar teste casi negra",
      "actionHref": "/tests/near-black-test"
    }
  },
  "white-level-test": {
    "overview": "La teste de nivel de branco inspecciona los aspectos más destacados da tela para garantizar que los detalles blancos brillantes (niveles 240 a 254 en 8 bits) no queden atrapados en un lavado branco sin rasgos distintivos.",
    "whatToLookFor": [
      {
        "label": "Límites do cuadrado casi branco",
        "description": "Verifique se los cuadrados 250, 252 e 254 son visiblemente distintos do fondo branco puro (255)."
      },
      {
        "label": "Decoloración en reflejos brillantes",
        "description": "Asegúrese de que los cuadrados blancos pico no adquieran un tono amarillento ou cian."
      },
      {
        "label": "Fatiga ocular/deslumbramiento",
        "description": "Verifique se el branco máximo causa molestias oculares com a iluminación actual de su habitación."
      },
      {
        "label": "Resaltar la floración",
        "description": "Observe si los bloques blancos de alto brilho desvían la luz hacia los límites vecinos."
      }
    ],
    "canObserve": [
      "Límites distinguibles de cuadrados de alta luminosidad contra el branco puro (255)",
      "Neutralidad do cor do branco máximo nos cuadrantes da tela",
      "Umbral de recorte de resaltado de borde"
    ],
    "cannotMeasure": [
      "Luminancia máxima sostenida en liendres sin fotómetro",
      "Temperatura de cor óptica do branco máximo (p. ej., 6500 K) sin corímetro",
      "Curvas de aceleración do limitador automático de brilho (ABL)"
    ],
    "interpretation": "Si los cuadrados casi blancos de hasta 253 ou 254 se distinguen do fondo branco, su monitor evita el recorte de luces e conserva las nubes e los detalles especulares.",
    "nextSteps": {
      "text": "Inspeccione la uniformidad general da luminancia en toda la superficie da tela.",
      "actionLabel": "Lanzar teste de uniformidad",
      "actionHref": "/tests/uniformity-test"
    }
  },
  "gamma-test": {
    "overview": "Las testes gamma utilizan campos ópticos de tramado de medios tonos para calibrar visualmente las curvas de luminancia da tela al estándar 2.2 sin necesidad de un costoso corímetro de hardware.",
    "whatToLookFor": [
      {
        "label": "Mezcla de patrones sólidos e difuminados",
        "description": "Observe dónde los círculos sólidos internos se mezclan completamente com ou fondo de rayas alternas."
      },
      {
        "label": "Ajuste da distancia de visualización",
        "description": "Retroceda ou entrecierre ligeramente los ojos para que las líneas finas de 1 píxel se difuminen e formen un tono sólido."
      },
      {
        "label": "Punto de fusión de curva gamma",
        "description": "Identifique qué valor numérico (1,8, 2,0, 2,2, 2,4, 2,6) coincide com ou fondo."
      },
      {
        "label": "Deriva de cor en cinza",
        "description": "Observe si el punto de fusión difiere entre los canales rojo, verde e azul."
      }
    ],
    "canObserve": [
      "Punto de coincidencia perceptual entre campos de interpolación de luminancia do 50 % e muestras de cinza sólido",
      "Aproximación visual do exponente efectivo da curva gamma.",
      "Equilibrio de cor e neutralidad cromática de los medios tonos."
    ],
    "cannotMeasure": [
      "Curva gamma paramétrica multipunto exacta de 10 puntos/20 puntos",
      "Datos de perfil LUT de hardware dentro do monitor escalar",
      "Función de transferencia de conversión de digital a óptico en milicandelas"
    ],
    "interpretation": "Para informática general e masterización sRGB, el patrón debe mezclarse perfectamente com ou fondo en la marca do indicador 2.2 cuando se ve desde una distancia normal.",
    "nextSteps": {
      "text": "Calibre la configuraçãou de su monitor usando los botones de hardware en tela.",
      "actionLabel": "Inicie la guía de calibración OSD",
      "actionHref": "/tools/osd-calibration-guide"
    }
  },
  "solid-color-test": {
    "overview": "Las testes de campo de cor sólido presentan fondos primarios, secundarios, negros, blancos e tons de cinza de tela completa para inspeccionar la uniformidad do panel, la pureza do cor e los defectos de subpixels.",
    "whatToLookFor": [
      {
        "label": "Cambios de cor de borde",
        "description": "Verifique se la temperatura do cor cambia cerca de los bordes perimetrales da tela."
      },
      {
        "label": "Efecto de tela sucia (DSE)",
        "description": "En campos tons de cinza e blancos, inspeccione si hay manchas, nubes ou bandas."
      },
      {
        "label": "Aislamiento de defectos de subpixels",
        "description": "Detecte subpixels muertos ou atascados que solo se revelan en campos de cores primarios específicos."
      },
      {
        "label": "Viñeteado/sombreado de esquinas",
        "description": "Observe si las esquinas extremas aparecen ligeramente oscurecidas en comparación com ou centro."
      }
    ],
    "canObserve": [
      "Consistencia de cor visual en tela completa en 8 campos de cor estandarizados",
      "Cambios de brilho de borde a centro e viñeteado",
      "Detección visual de partículas de polvo e subpixels defectuosos"
    ],
    "cannotMeasure": [
      "Porcentaje de uniformidad ANSI fotométrico de 9 puntos ou 25 puntos",
      "Variación do espesor do panel en micrómetros.",
      "Eficiencia de transmisión óptica do difusor de retroiluminación."
    ],
    "interpretation": "Los cores sólidos uniformes indican una alta calidad do panel e una distribución uniforme da luz de fondo. Las manchas irregulares ou las viñetas nas esquinas son comunes nas telas LCD económicas.",
    "nextSteps": {
      "text": "Inspeccione la uniformidad da luminancia e la temperatura de cor do panel de 9 zonas.",
      "actionLabel": "Lanzar teste de uniformidad",
      "actionHref": "/tests/uniformity-test"
    }
  },
  "viewing-angle-test": {
    "overview": "La teste de ángulo de visión evalúa cómo se degradan la saturación do cor, el brilho e el contraste cuando la tela se ve desde ángulos descentrados, oblicuos e verticales.",
    "whatToLookFor": [
      {
        "label": "Decoloración do cor en ángulos",
        "description": "Mueva la cabeza de lado a lado e observe si los cores vibrantes se desvanecen en tonos pastel."
      },
      {
        "label": "Cambio de gamma/pérdida de contraste",
        "description": "Observe si los detalles de las sombras oscuras se desvanecen e los niveles de preto se elevan a un cinza lechoso."
      },
      {
        "label": "IPS Glow frente a VA Gamma Shift",
        "description": "Los paneles IPS muestran un brilho plateado/branco en ángulos amplios; Los paneles VA pierden contraste central."
      },
      {
        "label": "Inversión Vertical (Paneles TN)",
        "description": "Mire desde abajo para comprobar si los cores se invierten en imágenes negativas en paneles TN económicos."
      }
    ],
    "canObserve": [
      "El cor percibido e el contraste cambian a medida que el ángulo de visión aumenta en relación con lo normal",
      "Radial gradient uniformity when viewed off-axis",
      "Estabilidad angular do texto e líneas de alto contraste."
    ],
    "cannotMeasure": [
      "Exact VESA-defined 178°/178° viewing angle contrast threshold (10:1 CR)",
      "Optical polarizing filter extinction ratio",
      "Refractive index of panel glass substrate"
    ],
    "interpretation": "IPS and OLED panels maintain high cor fidelity across wide angles. VA panels suffer contrast loss and gamma shift, while TN panels invert colors vertically.",
    "nextSteps": {
      "text": "Check if off-angle viewing exposes corner backlight bleed.",
      "actionLabel": "Launch Backlight Bleed Test",
      "actionHref": "/tests/backlight-bleed-test"
    }
  },
  "blooming-test": {
    "overview": "Las testes de floración inspeccionan artefactos de halo en telas Mini-LED e con atenuación local de matriz completa (FALD) donde la luz se filtra desde las zonas de retroiluminación activa hacia los píxeles oscuros circundantes.",
    "whatToLookFor": [
      {
        "label": "Halos brillantes alrededor de los objetivos",
        "description": "Inspeccione pequeñas cajas blancas sobre preto en busca de un aura brillante difusa alrededor de sus perímetros."
      },
      {
        "label": "Subtítulo que florece en barras negras",
        "description": "Verifique se el texto branco provoca destellos de luz que distraen la atención nas áreas do buzón preto."
      },
      {
        "label": "Llamarada do campo estelar",
        "description": "Observe pequeñas estrellas blancas de 1 px para ver si las zonas de retroiluminación adyacentes se iluminan innecesariamente."
      },
      {
        "label": "Pulsación de transición de zona",
        "description": "Mueva objetos de alto contraste por la tela para comprobar si hay un retraso en el brilho da zona de retroiluminación."
      }
    ],
    "canObserve": [
      "Extensión do halo visual e contraste de luminancia en diámetros objetivo calibrados (1 px, 5 px, 20 px, 100 px)",
      "Seguimiento dinámico de elementos móviles de alto contraste nos cuadrantes da tela",
      "nitidez de límites de subpixels frente a lienzos en preto verdadero (RGB 0,0,0)"
    ],
    "cannotMeasure": [
      "Recuento total de zonas físicas de atenuación Mini-LED dentro do chasis",
      "Zone microcontroller algorithm response time in milliseconds",
      "Absolute optical halo luminance without a spot photometer"
    ],
    "interpretation": "Blooming is a physical characteristic of Mini-LED zone count resolution. Reducing local dimming intensity or adding ambient bias lighting minimizes the effect.",
    "nextSteps": {
      "text": "Compare el sangrado da retroiluminación do borde com ou rendimiento da atenuación local.",
      "actionLabel": "Launch Backlight Bleed Test",
      "actionHref": "/tests/backlight-bleed-test"
    }
  },
  "tv-overscan-test": {
    "overview": "La teste de sobreexploración de TV verifica si su televisor ou tela externa genera imágenes con un mapeo de píxeles exacto de 1:1 ou acerca e corta artificialmente los bordes do perímetro.",
    "whatToLookFor": [
      {
        "label": "0 % de visibilidad do borde do borde",
        "description": "Las líneas de límite blancas marcadas con 0% deben tocar perfectamente el marco físico da tela nos cuatro lados."
      },
      {
        "label": "Flechas indicadoras recortadas",
        "description": "Verifique se las puntas de flecha nos bordes exteriores están truncadas u ocultas detrás do bisel."
      },
      {
        "label": "Escalar el desenfoque",
        "description": "Inspeccione si el texto e los bordes de un solo píxel aparecen suaves e borrosos debido a la interpolación de escala."
      },
      {
        "label": "nitidez de línea de 1px",
        "description": "Las líneas de borde alternadas de 1 px deberían mostrarse nítidamente sin interferencias de muaré."
      }
    ],
    "canObserve": [
      "Porcentaje de recorte de bordes (0%, 2,5%, 5%) nos cuatro bordes de visualización",
      "Visibilidad da flecha de límite e alineación exacta do píxel al bisel",
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
    "overview": "Las testes de escala e relación de aspecto validan la simetría geométrica nas relaciones de visualización estándar (16:9, 16:10, 21:9, 32:9, 4:3), asegurando que los círculos permanezcan perfectamente redondos e sin deformaciones.",
    "whatToLookFor": [
      {
        "label": "Simetría de círculos concéntricos",
        "description": "Verifique que los círculos sean perfectamente redondos, sin distorsiones, estiramientos ni aplastamientos ovalados."
      },
      {
        "label": "Uniformidad de aspecto cuadrado",
        "description": "Verifique que las cuadrículas cuadradas tengan un ancho e alto de píxeles idénticos."
      },
      {
        "label": "Ortogonalidad de cuadrícula lineal",
        "description": "Asegúrese de que las líneas horizontales e verticales se encuentren en ángulos rectos exactos de 90 grados."
      },
      {
        "label": "Interpolación muaré",
        "description": "Inspeccione los anillos concéntricos en busca de alias irregulares ou brilho muaré."
      }
    ],
    "canObserve": [
      "Simetría circular visual frente a cuadrículas de píxeles en relaciones de aspecto estándar",
      "Distorsión da relación de aspecto causada por GPU incorrecta ou modos de escala de tela",
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
    "overview": "El desgarro da tela ocurre cuando la velocidad de quadros da tarjeta gráfica no está sincronizada con los ciclos de actualización fijos do monitor, lo que hace que los quadros consecutivos se representen en cortes horizontales divididos.",
    "whatToLookFor": [
      {
        "label": "Líneas de división horizontales",
        "description": "Busque líneas de fractura horizontales que corten barras verticales en movimento."
      },
      {
        "label": "movimento discontinuo",
        "description": "Observe cuando la parte superior de un elemento móvil se desplaza por delante da parte inferior."
      },
      {
        "label": "Artefactos de múltiples lágrimas",
        "description": "A velocidades de quadros altas, busque múltiples desgarros simultáneos en la altura da tela."
      },
      {
        "label": "V-Sync tartamudea frente a desgarro",
        "description": "Verifique se al habilitar V-Sync se producen desgarros por micro tartamudeos periódicos."
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
    "overview": "Las testes de cintilação da tela exponen rápidas fluctuaciones periódicas de luminancia causadas por retroiluminación PWM de baja frecuencia, ondulación de voltaje ou inestabilidad de sincronización do controlador do panel.",
    "whatToLookFor": [
      {
        "label": "Visual estroboscópico ou brillante",
        "description": "Detecta zumbidos ou destellos sutiles de alta frecuencia en patrones de rayas finas."
      },
      {
        "label": "Líneas fantasma estroboscópicas",
        "description": "Mueva sus ojos rápidamente por la tela; Las líneas aparecerán con cuentas si hay cintilação."
      },
      {
        "label": "Sensibilidad da visión periférica",
        "description": "Mire ligeramente lejos do monitor para ver si el cintilação es más pronunciado en la visión periférica."
      },
      {
        "label": "Umbral de brilho",
        "description": "Ajuste el brilho do monitor hacia abajo para ver si el cintilação comienza solo por debajo de cierto nivel."
      }
    ],
    "canObserve": [
      "Percepción visual de patrones de cintilação a través de rejillas finas e campos alternos.",
      "Interacción estroboscópica con movimentos oculares sacádicos humanos.",
      "El patrón brilla en máscaras de luminancia de alta frecuencia"
    ],
    "cannotMeasure": [
      "Frecuencia de pulso eléctrico precisa en Hertz sin fotodiodo de osciloscopio",
      "Porcentaje do ciclo de trabajo do controlador de retroiluminación",
      "Índice de cintilação armónico"
    ],
    "interpretation": "Visible flicker on solid or patterned backgrounds indicates low-frequency PWM dimming or refresh instability, a primary cause of eye fatigue and headaches.",
    "nextSteps": {
      "text": "Perform a dedicated test for pulse-width modulation dimming.",
      "actionLabel": "Iniciar la teste de cintilação PWM",
      "actionHref": "/tests/pwm-flicker-test"
    }
  },
  "resolution-checker": {
    "overview": "El Comprobador de resoluçãou proporciona diagnósticos en tiempo real da resoluçãou da tela física, las dimensiones da ventana gráfica CSS, la relación de píxeles do dispositivo (DPR) e la densidad de píxeles.",
    "whatToLookFor": [
      {
        "label": "Coincidencia de resoluçãou nativa",
        "description": "Verifique que los píxeles físicos da tela informados coincidan con las especificaciones do fabricante de su monitor."
      },
      {
        "label": "Factor de escala DPR de alto DPI",
        "description": "Verifique se la proporción de píxeles de su dispositivo está configurada en 1,0x (100%), 1,25x (125%), 1,5x (150%) ou 2,0x (200%)."
      },
      {
        "label": "Dimensiones da ventana gráfica lógica",
        "description": "Observe el espacio de píxeles CSS disponible presentado en páginas web e aplicaciones."
      },
      {
        "label": "Clasificación de relación de aspecto",
        "description": "Confirm that the calculated aspect ratio matches standard 16:9, 16:10, or ultra-wide dimensions."
      }
    ],
    "canObserve": [
      "Dimensiones da ventana gráfica do navegador (`window.innerWidth`, `window.innerHeight`)",
      "Dimensiones da tela do sistema operativo (`screen.width`, `screen.height`)",
      "Device Pixel Ratio (`window.devicePixelRatio`) reported by the browser environment",
      "Orientación da tela e espacio de trabajo de escritorio disponible"
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
    "overview": "Los diagnósticos de tela táctil prueban la precisión, la capacidad de respuesta, las zonas muertas e la sensibilidad de los bordes do sensor táctil en dispositivos móviles, tabletas e monitores de tela táctil.",
    "whatToLookFor": [
      {
        "label": "Precisión do seguimiento táctil",
        "description": "Las líneas dibujadas deben seguir directamente debajo da yema do dedo sin desplazamientos ni retrasos."
      },
      {
        "label": "Zonas muertas que no responden",
        "description": "Pruebe todas las esquinas e bordes para asegurarse de que cada cuadrante registre entradas táctiles."
      },
      {
        "label": "Latencia táctil / seguimiento",
        "description": "Observe la distancia entre el dedo en movimento e el rastro de tinta dibujado."
      },
      {
        "label": "Registro de borde",
        "description": "Verifique que toque a lo largo do borde exterior extremo do registro de tela de manera confiable."
      }
    ],
    "canObserve": [
      "Coordenadas táctiles en tiempo real en el lienzo da tela.",
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
    "overview": "Las testes de nitidez evalúan la representación de fuentes, la claridad de los bordes e el timbre de mejora artificial de los bordes causado por una configuraçãou excesiva de nitidez da visualización en tela do monitor.",
    "whatToLookFor": [
      {
        "label": "Anillo de halo branco",
        "description": "Busque bordes ou franjas de cor branco brillante alrededor do texto preto e líneas de alto contraste."
      },
      {
        "label": "resoluçãou espuria da estrella Siemens",
        "description": "Verifique se las líneas de los radios convergen limpiamente hacia el centro sin artefactos muaré circulares."
      },
      {
        "label": "Claridad de trama de línea fina de 1 px",
        "description": "Las líneas alternas en branco e preto deben aparecer nítidas sin manchas tons de cinza turbias."
      },
      {
        "label": "Borde do texto manchado",
        "description": "Inspeccione pequeñas muestras de texto para asegurarse de que las letras estén nítidas e sin ruido artificial de nitidez."
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
      "actionLabel": "Iniciar teste de claridad de texto",
      "actionHref": "/tests/text-clarity-test"
    }
  },
  "compare-displays": {
    "overview": "A ferramenta de comparaison de telas permite verificar simultanément le rendu des couleurs, la balance des blancs et la luminosité sur deux moniteurs côte à côte.",
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
    "overview": "La teste de Información de tela recopila los parámetros técnicos disponibles a través do navegador: resoluçãou lógica e física, relación de píxeles (DPR), profundidad de cor e taxa de atualização.",
    "whatToLookFor": [
      {
        "label": "resoluçãou nativa correcta",
        "description": "Verifique que la resoluçãou informada coincida con las especificaciones do panel."
      },
      {
        "label": "Escalado do sistema (DPR)",
        "description": "Verifique se el factor de escala refleja la configuraçãou de su sistema operativo (100%, 125%, 150%, 200%)."
      }
    ],
    "canObserve": [
      "resoluçãou de tela e ventana",
      "Profundidad de cor en bits",
      "Relación de aspecto e DPR"
    ],
    "cannotMeasure": [
      "Dimensiones físicas en pulgadas",
      "Marca e modelo do panel a nivel de hardware"
    ],
    "interpretation": "Confirmar que el sistema operativo e el navegador reconocen la resoluçãou completa evita pérdida de nitidez.",
    "nextSteps": {
      "text": "¿Desea verificar la nitidez do texto?",
      "actionLabel": "Iniciar teste de nitidez",
      "actionHref": "/tests/sharpness-test"
    }
  },
  "custom-pattern": {
    "overview": "Le générateur de mires personnalisées permite créer des grilles, bandes de couleur et formes géométriques pour valider la précision de votre affichage.",
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
    "overview": "La teste Multi-Touch analiza la capacidad da tela táctil para registrar múltiples puntos de contacto simultáneos de manera precisa e sin retrasos.",
    "whatToLookFor": [
      {
        "label": "Número máximo de toques",
        "description": "Coloque varios dedos simultáneamente en la tela para comprobar cuántos puntos detecta su panel."
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
      "Tiempo de escaneo do controlador táctil"
    ],
    "interpretation": "Los paneles modernos deben reconocer al menos 10 toques simultáneos sin toques fantasma.",
    "nextSteps": {
      "text": "¿Desea comprobar la respuesta táctil simple?",
      "actionLabel": "Iniciar teste táctil",
      "actionHref": "/tests/touch-screen-test"
    }
  },
  "accelerometer-test": {
    "overview": "La teste do acelerómetro evalúa los sensores de movimento de su dispositivo nos tres ejes espaciales (X, Y, Z).",
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
      "Sensibilidad al movimento"
    ],
    "cannotMeasure": [
      "Calibración interna de fábrica do chip",
      "Deriva por temperatura"
    ],
    "interpretation": "Una respuesta inmediata e un valor cercano a 9,8 m/s² en reposo confirman el correcto funcionamiento.",
    "nextSteps": {
      "text": "¿Desea probar el giroscopio?",
      "actionLabel": "Iniciar teste de giroscopio",
      "actionHref": "/tests/gyroscope-test"
    }
  },
  "gyroscope-test": {
    "overview": "La teste do giroscopio comprueba la velocidad angular e los movimentos de rotación nos tres ejes.",
    "whatToLookFor": [
      {
        "label": "Estabilidad en reposo",
        "description": "Sin mover el dispositivo, los valores deben mantenerse cerca de 0."
      },
      {
        "label": "Detección de rotación",
        "description": "Verifique que girar el dispositivo en cualquier sentido se refleje con fluidez."
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
    "interpretation": "Valores estables en reposo e respuesta rápida a los giros indican que el sensor está en perfecto estado.",
    "nextSteps": {
      "text": "¿Desea probar la vibración do dispositivo?",
      "actionLabel": "Iniciar teste de vibración",
      "actionHref": "/tests/vibration-test"
    }
  },
  "vibration-test": {
    "overview": "La teste de vibración comprueba el motor háptico interno do dispositivo, su intensidad e los pulsos de respuesta.",
    "whatToLookFor": [
      {
        "label": "nitidez da vibración",
        "description": "Verifique que el motor vibre limpiamente sin sonidos extraños ni piezas sueltas."
      },
      {
        "label": "Patrones de pulso",
        "description": "Verifique se responde a pulsos cortos e secuencias continuas."
      }
    ],
    "canObserve": [
      "Activación do motor mediante la API de vibración",
      "Diferentes ritmos e pulsos"
    ],
    "cannotMeasure": [
      "Aceleración física real en Grms",
      "Consumo de energía do motor"
    ],
    "interpretation": "Un funcionamiento claro e sin ruidos mecánicos anómalos confirma el buen estado do actuador háptico.",
    "nextSteps": {
      "text": "¿Desea probar los altavoces?",
      "actionLabel": "Iniciar teste de altavoces",
      "actionHref": "/tests/speaker-test"
    }
  },
  "webcam-test": {
    "overview": "La teste de cámara web permite verificar la señal de vídeo, resoluçãou máxima, tasa de quadros e balance de cor en tiempo real.",
    "whatToLookFor": [
      {
        "label": "resoluçãou e nitidez",
        "description": "Verifique que la imagen sea nítida e coincida com a resoluçãou esperada."
      },
      {
        "label": "Fluidez de movimento",
        "description": "Asegúrese de que el movimento se capture a 30 ou 60 fps sin tirones."
      },
      {
        "label": "Exposición e cor",
        "description": "Verifique que no haya sobreexposición ni ruido excesivo en zonas oscuras."
      }
    ],
    "canObserve": [
      "Vista previa de vídeo en directo",
      "resoluçãou e tasa de quadros activas",
      "Calidad de imagen e cor"
    ],
    "cannotMeasure": [
      "Ruido de sensor a nivel físico de fotodiodos",
      "Distorsión óptica de lentes"
    ],
    "interpretation": "Una imagen clara, fluida e con cores naturales confirma que su cámara web está lista para videollamadas.",
    "nextSteps": {
      "text": "¿Desea verificar el micrófono?",
      "actionLabel": "Iniciar teste de micrófono",
      "actionHref": "/tests/microphone-test"
    }
  },
  "speaker-test": {
    "overview": "La teste de altavoces comprueba la separación estéreo de los canales izquierdo e derecho, la respuesta en frecuencia e la distorsión acústica.",
    "whatToLookFor": [
      {
        "label": "Separación estéreo",
        "description": "Asegúrese de que el sonido izquierdo suene únicamente por el altavoz izquierdo e viceversa."
      },
      {
        "label": "Barrido de frecuencias",
        "description": "Escuche el barrido de graves a agudos para detectar vibraciones molestas ou cortes."
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
    "interpretation": "Una separación estéreo nítida e un barrido sin vibraciones garantizan un rendimiento sonoro correcto.",
    "nextSteps": {
      "text": "¿Desea probar la sincronización de audio e vídeo?",
      "actionLabel": "Iniciar teste de sincronización",
      "actionHref": "/tests/audio-sync-test"
    }
  },
  "microphone-test": {
    "overview": "La teste de micrófono analiza la sensibilidad de entrada de audio, el espectro de frecuencias e el nivel de ruido de fondo.",
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
      "Sensibilidad e ganancia"
    ],
    "cannotMeasure": [
      "Ruido intrínseco do sensor electroacústico",
      "Patrón polar de captación"
    ],
    "interpretation": "Una voz clara e un nivel bajo de ruido de fondo indican que el micrófono funciona correctamente.",
    "nextSteps": {
      "text": "¿Desea probar el tiempo de reacción?",
      "actionLabel": "Iniciar teste de tiempo de reacción",
      "actionHref": "/tests/reaction-time-test"
    }
  },
  "reaction-time-test": {
    "overview": "La teste de tiempo de reacción mide su velocidad de reflejos visuales combinada com a latencia do sistema e do ratón.",
    "whatToLookFor": [
      {
        "label": "Tiempo medio de respuesta",
        "description": "Haga clic lo más rápido posible cuando el cor cambie a verde para medir sus milisegundos (ms)."
      },
      {
        "label": "Consistencia de resultados",
        "description": "Realice varias testes consecutivas para calcular su media real."
      }
    ],
    "canObserve": [
      "Tiempo de reacción exacto en milisegundos",
      "Estadísticas e media de intentos",
      "Beneficio de telas de alta frecuencia"
    ],
    "cannotMeasure": [
      "Tiempo de conducción neuronal aislado do hardware",
      "Tiempo de rebote físico do interruptor do ratón"
    ],
    "interpretation": "El promedio en adultos sanos se sitúa entre 200 e 250 ms. Menos de 200 ms refleja reflejos muy rápidos.",
    "nextSteps": {
      "text": "¿Desea probar la tasa de sondeo do ratón?",
      "actionLabel": "Iniciar teste de sondeo",
      "actionHref": "/tests/mouse-polling-test"
    }
  },
  "pixel-inversion-test": {
    "overview": "La teste de inversión de píxeles (VCOM) comprueba el equilibrio de polaridad en telas LCD para evitar parpadeos e patrones de muaré.",
    "whatToLookFor": [
      {
        "label": "cintilação rápido",
        "description": "Observe si alguno de los patrones tramados parpadea intensamente ou si se muestra como un cinza quieto."
      },
      {
        "label": "Tono cinza uniforme",
        "description": "En un panel bien calibrado, los patrones deben verse neutros e estables a distancia normal."
      }
    ],
    "canObserve": [
      "cintilação visual con patrones de inversión de fase",
      "Comportamiento do tipo de inversión do panel",
      "Estabilidad de frecuencia"
    ],
    "cannotMeasure": [
      "Voltaje VCOM interno en voltios",
      "Ángulo de retardo de las moléculas do cristal líquido"
    ],
    "interpretation": "Si los patrones se perciben como un cinza fijo sin centelleo, la tensión VCOM está correctamente calibrada.",
    "nextSteps": {
      "text": "¿Desea comprobar el cintilação PWM?",
      "actionLabel": "Iniciar teste de cintilação PWM",
      "actionHref": "/tests/pwm-flicker-test"
    }
  }
};
