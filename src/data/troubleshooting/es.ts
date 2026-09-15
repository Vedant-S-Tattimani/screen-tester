import { TroubleshootingTopic } from "./types";

export const ES_TROUBLESHOOTING_TOPICS: TroubleshootingTopic[] = [
  {
    "id": "no-image",
    "title": "Sin imagen (pantalla negra / en blanco)",
    "category": "display",
    "categoryTitle": "Problemas de pantalla",
    "symptom": "El LED de encendido del monitor puede encenderse, pero el panel permanece completamente negro sin imagen, iconos de escritorio ni iluminación de fondo.",
    "possibleCauses": [
      "Cable de alimentación de la pantalla o adaptador de CA externo desconectado o flojo",
      "Monitor configurado en la fuente de entrada incorrecta (ej. HDMI 2 en lugar de DisplayPort 1)",
      "Cable de vídeo flojo, dañado o mal conectado entre la GPU y el monitor",
      "Dispositivo de origen en suspensión profunda, hibernación o fallo del controlador de la GPU",
      "Combinación de resolución/frecuencia de actualización no compatible enviada durante el arranque",
      "Fallo en la placa de alimentación, inversor de retroiluminación o placa lógica T-Con"
    ],
    "checks": [
      "Compruebe el LED de encendido: ¿Apagado (sin corriente), ámbar/naranja (espera) o blanco/azul fijo (activo)?",
      "Presione los botones físicos del menú OSD en el chasis del monitor: ¿Aparece el menú del fabricante? (Si aparece, el panel funciona y el problema es la fuente o el cable)",
      "Vuelva a conectar firmemente ambos extremos del cable DisplayPort o HDMI en la GPU y el monitor",
      "Asegúrese de conectar el cable directamente a la tarjeta gráfica dedicada (GPU), no al puerto integrado de la placa base",
      "Pruebe con otro cable de vídeo verificado o en un puerto de entrada diferente"
    ],
    "whatScreenTesterCanTest": {
      "description": "Una vez restablecida la imagen, Screen Tester puede comprobar la estabilidad de la señal y renderizar patrones de prueba continuos.",
      "links": [
        {
          "label": "Información de pantalla",
          "testId": "display-info",
          "testPath": "/tests/display-info"
        },
        {
          "label": "Comprobador de resolución",
          "testId": "resolution-checker",
          "testPath": "/tests/resolution-checker"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Voltaje de la red eléctrica de CA o salida de CC del adaptador",
      "Fallo en la ranura PCIe de la placa base o líneas de alimentación de la GPU",
      "Continuidad del circuito inversor o tira de LED interna"
    ],
    "actions": [
      "Reinicie el monitor: Desconecte el cable de CA durante 30 segundos, mantenga presionado el botón de encendido 10 segundos y vuelva a conectar",
      "Use el atajo de Windows Win + Ctrl + Shift + B para reiniciar el subsistema del controlador gráfico",
      "Inicie en modo seguro o UEFI BIOS para forzar una señal básica de 1024x768 a 60 Hz",
      "Pruebe el monitor con una segunda fuente de vídeo (consola, portátil) para aislar si el fallo es del PC o del monitor"
    ],
    "whenToStop": "Detenga la resolución si huele a quemado, escucha silbidos agudos de condensadores o si el OSD integrado no aparece con todos los cables desconectados."
  },
  {
    "id": "no-signal",
    "title": "Sin señal / Cable no conectado",
    "category": "display",
    "categoryTitle": "Problemas de pantalla",
    "symptom": "El monitor se enciende y muestra un aviso como 'Sin señal', 'Comprobar cable de señal' o entra de inmediato en suspensión de ahorro de energía.",
    "possibleCauses": [
      "Puerto de entrada físico incorrecto seleccionado en el menú OSD del monitor",
      "Ancho de banda del cable de vídeo superado o pines defectuosos/doblados en DisplayPort/HDMI",
      "Base USB-C / Thunderbolt, conmutador KVM o adaptador que falla al negociar la conexión",
      "El sistema operativo emite un reloj de píxel, frecuencia o resolución no admitidos",
      "Controlador de GPU deshabilitado o fallando durante la inicialización de pantalla"
    ],
    "checks": [
      "Cambie manualmente la fuente de entrada en el OSD de 'Auto' al puerto físico conectado",
      "Desconecte el cable por ambos lados e inspeccione pines doblados o suciedad",
      "Omita concentradores o adaptadores y conecte la GPU directamente al monitor",
      "Pruebe un puerto DisplayPort o HDMI alternativo en la tarjeta gráfica"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester verifica la canalización de hardware informada por el navegador, frecuencias de actualización y metadatos de resolución.",
      "links": [
        {
          "label": "Información de pantalla",
          "testId": "display-info",
          "testPath": "/tests/display-info"
        },
        {
          "label": "Prueba de frecuencia de actualización",
          "testId": "refresh-rate-test",
          "testPath": "/tests/refresh-rate-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Integridad de señal de hardware o atenuación física del cable",
      "Bloqueos de protocolo criptográfico HDCP a nivel de firmware",
      "Daño mecánico en los puertos internos de la GPU"
    ],
    "actions": [
      "Reemplace el cable por uno certificado (HDMI 2.1 Ultra High Speed o DP 1.4/2.1 VESA)",
      "Reinstale limpiamente los controladores gráficos usando DDU en modo seguro",
      "Restablezca el monitor a los valores de fábrica desde su menú OSD",
      "Actualice el firmware del monitor y de la GPU"
    ],
    "whenToStop": "Deténgase si varios cables certificados y diferentes dispositivos no logran señal en ningún puerto (fallo de placa principal o T-Con)."
  },
  {
    "id": "wrong-resolution",
    "title": "Resolución incorrecta / Pantalla estirada o con barras negras",
    "category": "display",
    "categoryTitle": "Problemas de pantalla",
    "symptom": "El escritorio se ve borroso, estirado, achatado o presenta barras negras laterales/superiores (letterboxing/pillarboxing).",
    "possibleCauses": [
      "El sistema operativo está configurado en una resolución no nativa",
      "Escalado de GPU configurado en 'Mantener relación de aspecto' o 'Centrado' en lugar de 'Pantalla completa'",
      "Relación de aspecto forzada incorrectamente en el OSD del monitor (ej. 4:3 en panel 16:9)",
      "Cable HDMI de baja calidad que limita el ancho de banda a 1080p en lugar de 4K",
      "Controlador de pantalla genérico o desactualizado instalado"
    ],
    "checks": [
      "Identifique la resolución nativa en las especificaciones del fabricante del monitor",
      "Abra Configuración de pantalla de Windows y asegúrese de que esté activa la resolución '(Recomendada)'",
      "En el menú OSD del monitor, ajuste la relación de aspecto en '1:1' o 'Auto'",
      "Revise la configuración de escalado en el Panel de control de NVIDIA o AMD Software"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester visualiza patrones de cuadrícula de 1 píxel y círculos geométricos para detectar distorsiones de escalado al instante.",
      "links": [
        {
          "label": "Comprobador de resolución",
          "testId": "resolution-checker",
          "testPath": "/tests/resolution-checker"
        },
        {
          "label": "Prueba de escala y aspecto",
          "testId": "scaling-aspect-test",
          "testPath": "/tests/scaling-aspect-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Algoritmos de escalado de hardware internos del monitor frente al escalado de GPU",
      "Bloques EEPROM EDID corruptos en la placa del display"
    ],
    "actions": [
      "Seleccione la resolución nativa exacta en la configuración del sistema",
      "Actualice los controladores gráficos directamente desde NVIDIA, AMD o Intel",
      "Habilite el escalado por GPU en el panel de control y elija relación de aspecto",
      "Cree una resolución personalizada mediante el panel de control o CRU si el EDID falla"
    ],
    "whenToStop": "Si el propio menú OSD del monitor se muestra distorsionado geométricamente, el chip escalador de hardware está defectuoso."
  },
  {
    "id": "wrong-refresh-rate",
    "title": "Frecuencia de actualización incorrecta / Bloqueado a 60 Hz",
    "category": "display",
    "categoryTitle": "Problemas de pantalla",
    "symptom": "Un monitor gaming de 144Hz, 240Hz o 360Hz se siente tosco y está limitado a 60 Hz en el sistema operativo.",
    "possibleCauses": [
      "El monitor está conectado mediante un cable HDMI 1.4 antiguo que no soporta altas frecuencias",
      "La configuración de pantalla avanzada de Windows volvió a 60 Hz tras una actualización",
      "En el OSD del monitor está configurado DisplayPort 1.1 / 1.2 en lugar de DP 1.4 con DSC",
      "Múltiples monitores con frecuencias dispares interfieren en la sincronización de la GPU",
      "La GPU integrada está controlando la salida de vídeo del portátil"
    ],
    "checks": [
      "En Windows: Configuración > Sistema > Pantalla > Pantalla avanzada > Frecuencia de actualización",
      "En el menú OSD del monitor, verifique la versión de DisplayPort activa (elija DP 1.4 o 2.1)",
      "Verifique el cable: Se prefiere DisplayPort sobre HDMI para altas frecuencias en PC",
      "Active la frecuencia de actualización variable (G-Sync/FreeSync) en OSD y controladores"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester mide con precisión los tiempos de fotogramas mediante requestAnimationFrame para detectar caídas de cuadros.",
      "links": [
        {
          "label": "Prueba de frecuencia de actualización",
          "testId": "refresh-rate-test",
          "testPath": "/tests/refresh-rate-test"
        },
        {
          "label": "Prueba de VRR",
          "testId": "vrr-test",
          "testPath": "/tests/vrr-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Fluctuación de reloj de hardware en la salida física de la GPU",
      "Versión de firmware del módulo físico G-Sync"
    ],
    "actions": [
      "Configure manualmente la frecuencia máxima en Windows y en el software de la GPU",
      "Cambie a un cable certificado DisplayPort 1.4 o HDMI 2.1",
      "Restablezca el OSD a valores de fábrica y active el modo Overclock del panel si existe",
      "Actualice los controladores de la tarjeta gráfica"
    ],
    "whenToStop": "Si el monitor se queda en negro al seleccionar la frecuencia nominal nativa, existe un problema grave de ancho de banda o de panel."
  },
  {
    "id": "screen-tearing",
    "title": "Screen Tearing / Desgarro horizontal de imagen",
    "category": "display",
    "categoryTitle": "Problemas de pantalla",
    "symptom": "Aparecen líneas de fractura horizontales que dividen la pantalla durante movimientos laterales rápidos.",
    "possibleCauses": [
      "V-Sync desactivado en el juego o en el panel de control gráfico",
      "La tasa de fotogramas de la GPU excede o cae por debajo del rango de VRR/G-Sync",
      "G-Sync / FreeSync no está habilitado en el controlador o en el OSD del monitor",
      "El juego se ejecuta en modo ventana sin bordes con composición de escritorio incompatible",
      "La GPU envía fotogramas de manera desincronizada con el ciclo de refresco del panel"
    ],
    "checks": [
      "Compruebe si G-Sync/FreeSync está activado en el menú OSD del monitor",
      "En el Panel de control de NVIDIA, active 'Configurar G-SYNC'",
      "Verifique si la tasa de fotogramas supera la frecuencia máxima del monitor",
      "Active V-Sync en el panel del controlador y limite los FPS 3 valores por debajo del máximo"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester genera barras de alto contraste a gran velocidad para evidenciar líneas de desgarro y sincronización.",
      "links": [
        {
          "label": "Prueba de desgarro de pantalla",
          "testId": "screen-tearing-test",
          "testPath": "/tests/screen-tearing-test"
        },
        {
          "label": "Prueba de VRR",
          "testId": "vrr-test",
          "testPath": "/tests/vrr-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Inconsistencias de ritmo de fotogramas en motores DirectX/Vulkan nativos",
      "Latencias de cadena de intercambio internas del controlador"
    ],
    "actions": [
      "Habilite G-Sync / FreeSync",
      "Establezca un límite de fotogramas global (ej. 141 FPS para 144 Hz, 237 FPS para 240 Hz)",
      "Active V-Sync en el controlador gráfico para evitar desgarros en los límites de frecuencia",
      "Utilice un cable DisplayPort (la compatibilidad con G-Sync suele requerir DisplayPort)"
    ],
    "whenToStop": "Si las líneas horizontales persisten en imágenes estáticas o en la BIOS, no es desgarro, sino un daño físico en el panel."
  },
  {
    "id": "flickering",
    "title": "Parpadeo de pantalla / Apagones intermitentes",
    "category": "display",
    "categoryTitle": "Problemas de pantalla",
    "symptom": "La pantalla parpadea de forma errática, se apaga durante 1 o 2 segundos o presenta fluctuaciones rápidas de brillo.",
    "possibleCauses": [
      "Cable DisplayPort/HDMI deficiente o excesivamente largo con pérdida de señal",
      "Parpadeo de brillo de G-Sync/FreeSync en caídas bruscas de fotogramas",
      "Retroiluminación con modulación por ancho de pulsos (PWM) de baja frecuencia",
      "Interferencias eléctricas o regleta/fuente de alimentación inestable",
      "Conflicto de estado de energía del controlador de la GPU"
    ],
    "checks": [
      "¿El parpadeo ocurre solo jugando (con G-Sync) o también en el escritorio?",
      "Compruebe la firmeza del cable en ambos extremos",
      "Modifique el brillo en el OSD: ¿Desaparece al 100% de brillo? (Indicio de PWM)",
      "Desactive temporalmente G-Sync / FreeSync"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester proporciona pruebas de parpadeo y uniformidad para evaluar efectos estroboscópicos.",
      "links": [
        {
          "label": "Prueba de parpadeo",
          "testId": "flicker",
          "testPath": "/tests/flicker"
        },
        {
          "label": "Prueba de VRR",
          "testId": "vrr-test",
          "testPath": "/tests/vrr-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Frecuencia exacta de PWM en kilohercios (requiere fotodiodo osciloscopio)",
      "Fluctuaciones de voltaje de la fuente de poder"
    ],
    "actions": [
      "Utilice un cable certificado por VESA de longitud moderada",
      "Conecte el monitor directamente a la toma de pared",
      "En el panel de la GPU, desactive G-Sync para modo ventana o active compensación de parpadeo VRR",
      "Realice una instalación limpia del controlador gráfico"
    ],
    "whenToStop": "Si el panel parpadea incluso en el menú OSD sin ningún cable de vídeo conectado, la fuente interna o los LED están dañados."
  },
  {
    "id": "dead-stuck-bright-pixel",
    "title": "Píxeles muertos, atascados y brillantes",
    "category": "pixels",
    "categoryTitle": "Problemas de píxeles",
    "symptom": "Un punto diminuto permanece permanentemente negro (muerto), fijado en rojo/verde/azul (atascado) o brilla en blanco (brillante).",
    "possibleCauses": [
      "Defecto de fabricación en la matriz de transistores TFT durante la producción del panel",
      "Transistor sin corriente (subpíxel muerto) o bloqueado en estado encendido (subpíxel atascado)",
      "Partícula de polvo atrapada entre las capas polarizadoras y el sustrato de vidrio",
      "Daño por presión mecánica o limpieza inadecuada con fuerza excesiva"
    ],
    "checks": [
      "Limpie suavemente la superficie con un paño de microfibra para descartar polvo externo",
      "Muestre fondos sólidos a pantalla completa (rojo, verde, azul, blanco, negro) para identificar el subpíxel",
      "Use una lupa para comprobar si es un único subpíxel RGB o un píxel completo"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester ofrece localizadores de píxeles defectuosos y secuencias de destellos de alta velocidad para reactivar cristales atascados.",
      "links": [
        {
          "label": "Prueba de píxeles muertos",
          "testId": "dead-pixel-test",
          "testPath": "/tests/dead-pixel-test"
        },
        {
          "label": "Reparador de píxeles atascados",
          "testId": "stuck-pixel-fixer",
          "testPath": "/tests/stuck-pixel-fixer"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Cobertura de garantía según norma ISO 9241-307 sin recuento manual",
      "Daños físicos a nivel microscópico en la capa de silicio"
    ],
    "actions": [
      "Ejecute el Reparador de píxeles atascados en la zona afectada durante 20-30 minutos",
      "Consulte la política de garantía de píxeles defectuosos del fabricante",
      "Tramite la devolución comercial si está dentro del plazo legal de compra",
      "No ejerza presión física sobre el panel (puede dañar más transistores)"
    ],
    "whenToStop": "Los píxeles muertos (negros) son transistores físicamente rotos y no se pueden reparar por software. Solicite soporte oficial."
  },
  {
    "id": "washed-out-colors",
    "title": "Colores lavados / Contraste incorrecto y tintes",
    "category": "imageQuality",
    "categoryTitle": "Calidad de imagen",
    "symptom": "Los colores se ven pálidos, los negros se aprecian grises o la imagen tiene un tono amarillento, verdoso o azulado no deseado.",
    "possibleCauses": [
      "Rango dinámico de salida RGB incorrecto (Limitado 16-235 en lugar de Completo 0-255)",
      "Windows HDR activado en contenido SDR sin la calibración de brillo adecuada",
      "Modo nocturno / filtro de luz azul activado en el sistema operativo o en el monitor",
      "Perfil de color ICC dañado o incorrecto cargado en Windows",
      "Formato de color configurado en YCbCr420 en lugar de RGB 4:4:4"
    ],
    "checks": [
      "En el panel de control de GPU, verifique: ¿Rango dinámico en 'Completo' (0-255)?",
      "Desactive la luz nocturna en la configuración de Windows",
      "En el OSD del monitor, ajuste la temperatura de color a 'Estándar' o 'sRGB'",
      "Desactive temporalmente Windows HDR (Win + Alt + B)"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester evalúa la fidelidad cromática, escala de grises y separación de contraste.",
      "links": [
        {
          "label": "Prueba de precisión de color",
          "testId": "color-test",
          "testPath": "/tests/color-test"
        },
        {
          "label": "Prueba de contraste",
          "testId": "contrast-test",
          "testPath": "/tests/contrast-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Desviaciones cromáticas cuantitativas Delta-E (requiere colorímetro)",
      "Programación de la tabla LUT de hardware interna"
    ],
    "actions": [
      "Ajuste el rango dinámico en el controlador a 'Completo' y la profundidad a 8 o 10 bits",
      "Ejecute la calibración de color de Windows (dccw) o cargue el perfil original",
      "Calibre el OSD en sRGB o DCI-P3 según su uso principal",
      "Ajuste el brillo de contenido SDR en la configuración de HDR de Windows"
    ],
    "whenToStop": "Si el panel muestra un tinte amarillento o descolorido incurable incluso en el OSD, los fósforos o LED están envejecidos."
  },
  {
    "id": "blurry-text",
    "title": "Texto borroso y halos de color en subpíxeles",
    "category": "imageQuality",
    "categoryTitle": "Calidad de imagen",
    "symptom": "El texto se aprecia desenfocado, suave o muestra bordes coloreados (halos rojos/azules) en los caracteres.",
    "possibleCauses": [
      "Escalado de PPP de Windows no entero (ej. 125% o 175% sin optimizar ClearType)",
      "Disposición de subpíxeles no estándar (BGR, WRGB o triangular QD-OLED)",
      "Resolución no nativa seleccionada",
      "Submuestreo cromático activo (YCbCr 4:2:2 o 4:2:0 en lugar de RGB 4:4:4)",
      "Control de nitidez del monitor configurado demasiado alto o bajo"
    ],
    "checks": [
      "Ejecute el Asistente de texto ClearType en Windows",
      "Verifique que la salida de color esté en RGB 4:4:4 sin compresión",
      "Ajuste la nitidez del OSD del monitor al valor predeterminado (habitualmente 50%)",
      "Consulte si su monitor utiliza un panel con estructura de subpíxeles BGR"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester proporciona muestras tipográficas en múltiples tamaños para evaluar el renderizado de bordes.",
      "links": [
        {
          "label": "Prueba de nitidez de texto",
          "testId": "text-clarity-test",
          "testPath": "/tests/text-clarity-test"
        },
        {
          "label": "Prueba de nitidez",
          "testId": "sharpness-test",
          "testPath": "/tests/sharpness-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Kernels de rasterización tipográfica a nivel interno de la API del SO",
      "Geometría física microscópica de los subpíxeles"
    ],
    "actions": [
      "Complete el asistente ClearType de Windows seleccionando las muestras más nítidas",
      "Asegúrese de activar la resolución nativa y el formato RGB completo",
      "En paneles BGR, configure ClearType en modo BGR mediante el registro o BetterClearTypeTuner",
      "Utilice valores de escalado estándar (100%, 150%, 200%)"
    ],
    "whenToStop": "En monitores OLED con disposición triangular de subpíxeles, ciertos halos de color son inherentes al diseño físico."
  },
  {
    "id": "uneven-brightness",
    "title": "Brillo desigual / Viñeteado / Efecto pantalla sucia (DSE)",
    "category": "imageQuality",
    "categoryTitle": "Calidad de imagen",
    "symptom": "Esquinas oscurecidas (viñeteado), manchas turbias en fondos grises o líneas de suciedad visual (DSE).",
    "possibleCauses": [
      "Tolerancias de fabricación en láminas difusoras o tiras LED de borde",
      "Efecto de pantalla sucia (DSE) por pegado no uniforme de las capas del panel",
      "Presión mecánica del marco sobre la matriz de cristal líquido",
      "Degradación térmica o envejecimiento desigual de los LED tras años de uso"
    ],
    "checks": [
      "Muestre fondos grises sólidos (25%, 50%, 75%) a pantalla completa",
      "Tome una fotografía con baja exposición para documentar la nube de luz",
      "Compruebe si el fenómeno cambia con el ángulo de visión (comportamiento normal en paneles VA/IPS)"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester evalúa la uniformidad y el detalle cerca del negro en todo el panel.",
      "links": [
        {
          "label": "Prueba de uniformidad",
          "testId": "uniformity-test",
          "testPath": "/tests/uniformity-test"
        },
        {
          "label": "Prueba de detalle cerca del negro",
          "testId": "near-black-test",
          "testPath": "/tests/near-black-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Uniformidad de luminancia cuantitativa en cd/m² en matriz de 9 puntos",
      "Deformación térmica de las guías de luz internas"
    ],
    "actions": [
      "Reduzca el brillo del monitor a niveles ergonómicos (120-150 cd/m²) para disimular irregularidades",
      "Active la compensación de uniformidad en el menú OSD si su monitor dispone de ella",
      "Ajuste la iluminación ambiental para evitar reflejos que aumenten el contraste del defecto",
      "Si el defecto es severo en un monitor nuevo, solicite su reemplazo comercial"
    ],
    "whenToStop": "Una caída de brillo de hasta el 15% en las esquinas se considera admisible dentro de los estándares de paneles de consumo."
  },
  {
    "id": "backlight-bleed-ips-glow",
    "title": "Fugas de luz (Backlight Bleed) vs. Brillo IPS (IPS Glow)",
    "category": "imageQuality",
    "categoryTitle": "Calidad de imagen",
    "symptom": "Bordes brillantes en escenas oscuras o resplandor blanquecino/dorado que varía según el ángulo de observación.",
    "possibleCauses": [
      "Backlight Bleed: Presión excesiva del bisel o sellado deficiente que deja escapar la luz trasera",
      "IPS Glow: Característica óptica de la estructura de cristales líquidos en paneles IPS al mirarlos de lado",
      "Tensión mecánica por tornillos de soporte VESA apretados en exceso"
    ],
    "checks": [
      "Mire el monitor de frente a 1,5 metros: ¿Desaparece el resplandor? (Si es así: es IPS Glow)",
      "¿Permanecen esquinas o zonas brillantes fijas desde cualquier ángulo? (Si es así: es Backlight Bleed)",
      "Afloje ligeramente los tornillos del soporte VESA si nota tensión en el marco"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester proporciona campos negros de calibración para diferenciar claramente entre Bleed y Glow.",
      "links": [
        {
          "label": "Prueba de fugas de luz",
          "testId": "backlight-bleed-test",
          "testPath": "/tests/backlight-bleed-test"
        },
        {
          "label": "Prueba de nivel de negro",
          "testId": "black-level-test",
          "testPath": "/tests/black-level-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Límites de tolerancia de garantía del fabricante sin informe de laboratorio",
      "Presión de par de apriete en los tornillos internos del chasis"
    ],
    "actions": [
      "Aumente la distancia de visión y sitúe el monitor a la altura de los ojos (reduce drásticamente el IPS Glow)",
      "Añada luz ambiental suave detrás de la pantalla (iluminación bias)",
      "Baje el brillo del monitor del 100% a un valor sensato (30-50%)",
      "Si las fugas son intolerables y visibles con luz ambiental, tramite la garantía"
    ],
    "whenToStop": "El IPS Glow no se puede reparar por ser inherente a la tecnología IPS. Solo los paneles OLED ofrecen negros puros sin glow."
  },
  {
    "id": "hdr-not-working",
    "title": "HDR no funciona / Imagen lavada o gris en modo HDR",
    "category": "imageQuality",
    "categoryTitle": "Calidad de imagen",
    "symptom": "Al encender HDR los colores pierden viveza, el escritorio se oscurece o las luces altas se queman sin detalle.",
    "possibleCauses": [
      "El monitor solo tiene certificación 'DisplayHDR 400' básica sin atenuación local real",
      "No se ha realizado la calibración de HDR en Windows",
      "Mapeo de tonos incorrecto en el juego o en el OSD",
      "Ancho de banda insuficiente en el cable para transmitir 10 bits HDR a alta tasa de refresco",
      "El navegador no tiene habilitada la aceleración por hardware para HDR"
    ],
    "checks": [
      "Verifique si HDR está activado en Windows (Win + Alt + B)",
      "Ejecute la app Calibración HDR de Windows desde Microsoft Store",
      "En el OSD del monitor, ajuste la opción HDR en 'Auto' o 'DisplayHDR'",
      "Verifique el cable (se requiere DP 1.4 o HDMI 2.1)"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester comprueba brillo máximo, cobertura de gama amplia y recorte de iluminaciones en HDR.",
      "links": [
        {
          "label": "Prueba de HDR",
          "testId": "hdr-test",
          "testPath": "/tests/hdr-test"
        },
        {
          "label": "Prueba de capacidades HDR",
          "testId": "hdr-capability-test",
          "testPath": "/tests/hdr-capability-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Luminancia máxima real en nits (requiere fotómetro físico)",
      "Número y velocidad de transición de las zonas de atenuación Mini-LED"
    ],
    "actions": [
      "Utilice la app de Calibración HDR de Windows para registrar los niveles mínimo y máximo de brillo",
      "Ajuste el control deslizante de brillo para contenido SDR en Configuración de pantalla",
      "Actualice los controladores de vídeo y configure la profundidad de color en 10 bpc",
      "En pantallas sin atenuación local, reserve el HDR exclusivamente para juegos o películas compatibles"
    ],
    "whenToStop": "Si el monitor no cuenta con tecnología Mini-LED FALD ni panel OLED, el modo HDR no podrá ofrecer un contraste dinámico real."
  },
  {
    "id": "tv-overscan-fit",
    "title": "La imagen no encaja en la TV (Overscan / Bordes cortados)",
    "category": "tv",
    "categoryTitle": "Problemas de TV",
    "symptom": "La barra de tareas de Windows o los extremos de las ventanas quedan fuera de los márgenes o rodeados por marcos negros.",
    "possibleCauses": [
      "Función de sobreexploración (Overscan) activada en el televisor",
      "Relación de aspecto del televisor fijada en '16:9' en vez de 'Solo escaneo' / '1:1'",
      "El controlador de la GPU aplica una corrección de subexploración incorrecta",
      "El puerto HDMI del televisor no está configurado en modo 'PC'"
    ],
    "checks": [
      "En el mando a distancia del televisor, localice el botón de formato de imagen",
      "Compruebe la etiqueta de entrada del puerto HDMI: cámbiela a 'PC'",
      "En el panel de la GPU, compruebe si está activo el redimensionamiento del escritorio"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester proporciona cuadrículas de alineación 1:1 y marcas de porcentaje para verificar el encuadre exacto.",
      "links": [
        {
          "label": "Prueba de Overscan en TV",
          "testId": "tv-overscan-test",
          "testPath": "/tests/tv-overscan-test"
        },
        {
          "label": "Prueba de escala y aspecto",
          "testId": "scaling-aspect-test",
          "testPath": "/tests/scaling-aspect-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Filtros de posprocesamiento internos del televisor",
      "Protocolos de comunicación HDMI-CEC"
    ],
    "actions": [
      "Configure el formato de imagen del televisor en 'Solo escaneo', 'Ajuste exacto' o 'Punto por punto'",
      "Renombre la entrada HDMI en el menú del televisor como 'PC' (desactiva el overscan automáticamente)",
      "En el software de la GPU, restablezca el tamaño del escritorio a los valores por defecto",
      "Sitúe el control de nitidez del televisor en un nivel neutro (habitualmente 0 o 50)"
    ],
    "whenToStop": "Cuando la línea perimetral de 1 píxel de Screen Tester coincida exactamente con el marco físico del televisor, el problema estará resuelto."
  },
  {
    "id": "multi-touch-issues",
    "title": "Problemas de pantalla táctil y registro multitáctil",
    "category": "deviceInput",
    "categoryTitle": "Problemas de dispositivos y entrada",
    "symptom": "La pantalla táctil responde con imprecisión, ignora gestos con varios dedos o registra pulsaciones fantasma (Ghost Touches).",
    "possibleCauses": [
      "Suciedad, grasa o humedad acumulada en el cristal",
      "Protector de pantalla grueso o de baja calidad que reduce la conductividad capacitiva",
      "Ruido eléctrico provocado por un cargador de pared defectuoso o no homologado",
      "Controlador de pantalla táctil desactualizado o calibración errónea en el sistema"
    ],
    "checks": [
      "¿Ocurre el fallo también cuando el dispositivo está desconectado del cargador?",
      "Limpie la pantalla a fondo con un paño adecuado",
      "Compruebe cuántos puntos de contacto simultáneos detecta el panel"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester realiza un seguimiento interactivo de puntos de contacto con visualización de coordenadas en tiempo real.",
      "links": [
        {
          "label": "Prueba de multitáctil",
          "testId": "multi-touch-test",
          "testPath": "/tests/multi-touch-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Pistas rotas en la matriz física del digitalizador de cristal",
      "Frecuencia de muestreo de hardware del controlador táctil en hercios"
    ],
    "actions": [
      "Utilice el cargador original para evitar derivaciones de corriente parásitas",
      "Restablezca o ejecute la calibración táctil de Windows en el Panel de control",
      "Retire el protector de pantalla si los fallos comenzaron tras colocarlo",
      "Actualice los controladores del dispositivo táctil en el Administrador de dispositivos"
    ],
    "whenToStop": "Si las pulsaciones fantasma persisten con la pantalla limpia y desconectada de la corriente, el digitalizador está roto."
  },
  {
    "id": "accelerometer-issues",
    "title": "Problemas del acelerómetro y sensores de movimiento",
    "category": "deviceInput",
    "categoryTitle": "Problemas de dispositivos y entrada",
    "symptom": "La pantalla no gira automáticamente, los juegos no responden a la inclinación o las mediciones se desvían.",
    "possibleCauses": [
      "Bloqueo de rotación activado en los ajustes rápidos del sistema",
      "El navegador web carece de permisos para acceder a los sensores de movimiento",
      "Sensor descalibrado tras una caída o impacto",
      "El modo de ahorro de batería suspende la lectura continua de sensores"
    ],
    "checks": [
      "Compruebe si el bloqueo de orientación está activo en el centro de control",
      "Revise los permisos del sitio web en el navegador para sensores de movimiento (Safari/Chrome)",
      "Coloque el dispositivo en una superficie totalmente plana y observe las lecturas"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester lee las fuerzas de aceleración en los ejes X, Y y Z en tiempo real mediante la API DeviceMotion.",
      "links": [
        {
          "label": "Prueba de acelerómetro",
          "testId": "accelerometer-test",
          "testPath": "/tests/accelerometer-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Estado electromecánico microscópico del chip MEMS",
      "Desviación de calibración en la memoria segura del procesador"
    ],
    "actions": [
      "Active la rotación automática en los ajustes del dispositivo",
      "Conceda acceso a los sensores en la configuración del navegador móvil",
      "Reinicie el dispositivo para reiniciar el subsistema de sensores",
      "Ejecute la calibración de nivel y movimiento en los ajustes del sistema"
    ],
    "whenToStop": "Si los tres ejes reportan valores estáticos de cero o saturación continua, el chip acelerómetro está físicamente dañado."
  },
  {
    "id": "gyroscope-issues",
    "title": "Problemas de giroscopio y orientación",
    "category": "deviceInput",
    "categoryTitle": "Problemas de dispositivos y entrada",
    "symptom": "El seguimiento en aplicaciones de realidad virtual o vídeos de 360 grados tiembla, se desvía o gira solo.",
    "possibleCauses": [
      "Interferencias magnéticas producidas por fundas con imanes o soportes para coche",
      "Permisos de orientación denegados en el navegador web",
      "El giroscopio MEMS requiere recalibración mediante movimiento en figura de 8",
      "Fallo en el servicio del sistema encargado de la orientación"
    ],
    "checks": [
      "Retire cualquier funda magnética o accesorio metálico",
      "Mueva el dispositivo dibujando un ocho en el aire para recalibrar los sensores",
      "Verifique los permisos de orientación en la barra de direcciones del navegador"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester visualiza los ángulos de giro alfa, beta y gamma con una simulación física tridimensional en tiempo real.",
      "links": [
        {
          "label": "Prueba de giroscopio",
          "testId": "gyroscope-test",
          "testPath": "/tests/gyroscope-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Fusión de datos de sensores con el magnetómetro a nivel de controlador",
      "Ruido de lectura de alta frecuencia"
    ],
    "actions": [
      "Recalibre el dispositivo realizando movimientos en ocho con las manos",
      "Quite las fundas protectoras con cierres magnéticos",
      "Reinicie el terminal móvil o portátil",
      "Actualice el navegador a la última versión disponible"
    ],
    "whenToStop": "Si no se registra variación angular en ninguno de los tres ejes espaciales, el giroscopio está averiado."
  },
  {
    "id": "vibration-issues",
    "title": "Problemas de la API de vibración y respuesta háptica",
    "category": "deviceInput",
    "categoryTitle": "Problemas de dispositivos y entrada",
    "symptom": "El dispositivo no vibra ante notificaciones o durante pruebas web de respuesta háptica.",
    "possibleCauses": [
      "Vibración desactivada en los ajustes de sonido o modo No molestar activo",
      "El navegador bloquea navigator.vibrate() si no hubo interacción previa del usuario",
      "iOS Safari no implementa la especificación W3C Vibration API por diseño",
      "Motor lineal táptico o rotor excéntrico ERM roto internamente"
    ],
    "checks": [
      "Compruebe si la vibración funciona en los ajustes de sonido del sistema operativo",
      "Asegúrese de haber tocado la pantalla antes de iniciar la prueba (requerimiento de activación)",
      "Verifique si utiliza un iPhone o iPad (iOS bloquea la vibración web por defecto)"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester ejecuta patrones de pulsos hápticos estándar y personalizados a través de la API Vibration de HTML5.",
      "links": [
        {
          "label": "Prueba de vibración",
          "testId": "vibration-test",
          "testPath": "/tests/vibration-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Frecuencia mecánica de resonancia en hercios",
      "Entrega de potencia eléctrica al actuador háptico"
    ],
    "actions": [
      "Active la respuesta táctil y la vibración en la configuración del sistema",
      "Pruebe en Google Chrome para Android u otro navegador compatible",
      "Desactive el modo de ahorro de energía (suele cancelar la vibración)",
      "Reinicie el teléfono"
    ],
    "whenToStop": "Si el dispositivo tampoco vibra con llamadas telefónicas ni alarmas del sistema, el motor de vibración está averiado."
  },
  {
    "id": "webcam-issues",
    "title": "Problemas de cámara web y permisos de acceso",
    "category": "deviceInput",
    "categoryTitle": "Problemas de dispositivos y entrada",
    "symptom": "La señal de la cámara aparece en negro, el navegador indica 'Cámara no detectada' o se rechaza el permiso.",
    "possibleCauses": [
      "Permiso de cámara revocado o bloqueado en el navegador o en el sistema operativo",
      "Pestaña física de privacidad (obturador deslizante) cerrada sobre la lente",
      "Otra aplicación (ej. Zoom, Teams, OBS) tiene bloqueado el acceso exclusivo a la cámara",
      "Interruptor físico o tecla de función (Fn) de la cámara desactivado en el teclado",
      "Controlador USB de la cámara desactualizado o corrupto"
    ],
    "checks": [
      "Inspeccione el obturador físico de la cámara web para comprobar que esté abierto",
      "Compruebe si una tecla de acceso rápido (ej. Fn + F6) tiene apagada la cámara",
      "Cierre por completo cualquier otra aplicación de videollamada abierta",
      "Pulse el icono de candado en la barra de direcciones y permita el acceso a la cámara"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester evalúa resolución nativa, tasa de fotogramas, representación del color y latencia en el navegador.",
      "links": [
        {
          "label": "Prueba de cámara web",
          "testId": "webcam-test",
          "testPath": "/tests/webcam-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Relación señal-ruido (SNR) a nivel de sensor",
      "Errores de firmware del microcontrolador interno de la cámara"
    ],
    "actions": [
      "Conceda permiso de cámara en el diálogo emergente del navegador",
      "Revise la configuración de privacidad en Windows/macOS para permitir acceso al navegador",
      "Actualice o reinstale el controlador en el Administrador de dispositivos",
      "Conecte la cámara externa a otro puerto USB directo del equipo"
    ],
    "whenToStop": "Si la cámara figura en el Administrador de dispositivos con código de error 10 o 43 y no funciona en ningún PC, está dañada."
  },
  {
    "id": "speaker-issues",
    "title": "Problemas de altavoces y salida de audio",
    "category": "deviceInput",
    "categoryTitle": "Problemas de dispositivos y entrada",
    "symptom": "No se escucha sonido, solo suena un canal (izquierdo/derecho) o el audio se oye distorsionado con chasquidos.",
    "possibleCauses": [
      "Dispositivo de salida de audio incorrecto seleccionado en el sistema",
      "Altavoces o pestaña del navegador silenciados",
      "Conector de audio analógico de 3,5 mm mal insertado o sucio",
      "Balance estéreo desplazado hacia un único lateral",
      "Conflicto de tasa de muestreo en el controlador de audio (ej. 44,1 kHz vs. 48 kHz)"
    ],
    "checks": [
      "Compruebe el nivel de volumen en el sistema operativo y en los propios altavoces",
      "Asegúrese de que el dispositivo predeterminado sean sus auriculares o altavoces habituales",
      "Empuje firmemente el conector de 3,5 mm hasta el fondo de la clavija",
      "Verifique que la pestaña del navegador no esté en silencio"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester genera tonos senoidales puros, barridos de frecuencia y pruebas de separación estéreo izquierda/derecha.",
      "links": [
        {
          "label": "Prueba de altavoces",
          "testId": "speaker-test",
          "testPath": "/tests/speaker-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Distorsión armónica total (THD) del amplificador",
      "Descentrado mecánico de la bobina del altavoz"
    ],
    "actions": [
      "Seleccione el dispositivo correcto en la configuración de sonido de Windows/macOS",
      "Centre el balance de audio estéreo (50% izquierda / 50% derecha)",
      "Actualice los controladores de sonido (ej. Realtek)",
      "Pruebe con otro cable auxiliar o con unos auriculares diferentes"
    ],
    "whenToStop": "Si el cono del altavoz roza mecánicamente o cruje con cualquier volumen, la membrana o bobina están dañadas."
  },
  {
    "id": "microphone-issues",
    "title": "Problemas de micrófono y entrada de audio",
    "category": "deviceInput",
    "categoryTitle": "Problemas de dispositivos y entrada",
    "symptom": "El micrófono no capta sonido, el vúmetro no se mueve o la voz se escucha excesivamente baja y con ruido.",
    "possibleCauses": [
      "Permiso de micrófono denegado en el navegador o en la privacidad del sistema",
      "Interruptor físico de silenciamiento (Mute) activado en el cable de los auriculares",
      "Dispositivo de entrada incorrecto seleccionado en el sistema",
      "Nivel de ganancia del micrófono ajustado a 0 en las propiedades de sonido",
      "Conector jack enchufado en la toma equivocada (auriculares en lugar de micrófono)"
    ],
    "checks": [
      "Compruebe el interruptor físico de silencio en el cable del micrófono",
      "Pulse el icono de candado en el navegador y autorice el acceso al micrófono",
      "Compruebe en la configuración de sonido de Windows si la barra de nivel reacciona a su voz",
      "En auriculares con cable simple, asegúrese de emplear el adaptador divisor en Y necesario"
    ],
    "whatScreenTesterCanTest": {
      "description": "Screen Tester visualiza el nivel de entrada, espectrograma de frecuencias y monitorización en tiempo real con Web Audio.",
      "links": [
        {
          "label": "Prueba de micrófono",
          "testId": "microphone-test",
          "testPath": "/tests/microphone-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Ruido intrínseco de la cápsula en dB(A)",
      "Alimentación phantom de 48V en micrófonos de estudio XLR"
    ],
    "actions": [
      "Permita el acceso al micrófono en la ventana del navegador y en la privacidad del sistema",
      "Elija el micrófono correcto como dispositivo de entrada predeterminado",
      "Suba el nivel de entrada al 80-100% y añada amplificación de micrófono si es preciso",
      "Actualice los controladores de audio de su placa base"
    ],
    "whenToStop": "Si el micrófono no capta señal en ningún ordenador o puerto, el cable o la cápsula de audio están averiados."
  },
{
  "id": "burn-in-image-retention",
  "title": "Quemado OLED (Burn-In), Retención de Imagen y Sombras",
  "category": "pixels",
  "categoryTitle": "Problemas de Píxeles",
  "symptom": "Siluetas fantasma de barras de tareas, logos o ventanas permanecen grabadas en la pantalla incluso al cambiar de imagen.",
  "possibleCauses": [
    "Elementos estáticos mostrados al brillo máximo durante cientos de horas",
    "Desgaste desigual de los subpíxeles orgánicos en pantallas OLED/QD-OLED",
    "Retención temporal de imagen en paneles LCD/IPS"
  ],
  "checks": [
    "Mostrar fondos gris medio (5% y 50%) y colores primarios para revelar siluetas",
    "Comprobar si la sombra desaparece tras reproducir un vídeo dinámico durante 15 minutos",
    "Consultar el contador de horas de uso en el menú OSD"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester muestra fondos de color y grises para destapar siluetas de quemado, y calcula el riesgo con la Calculadora de Burn-In OLED.",
    "links": [
      {
        "label": "Test de Burn-In",
        "testId": "burn-in-test",
        "testPath": "/tests/burn-in-test"
      },
      {
        "label": "Calculadora Burn-In OLED",
        "testId": "oled-burn-in-calculator",
        "testPath": "/tools/oled-burn-in-calculator"
      },
      {
        "label": "Test de Color Sólido",
        "testId": "solid-color-test",
        "testPath": "/tests/solid-color-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Degradación química interna de los emisores orgánicos"
  ],
  "actions": [
    "Ejecutar el ciclo de limpieza de píxeles (Pixel Refresh) en el menú OSD",
    "Ocultar automáticamente la barra de tareas y reducir el brillo SDR",
    "Configurar suspensión de pantalla tras 5 minutos de inactividad"
  ],
  "whenToStop": "Si las marcas no desaparecen tras varios ciclos de limpieza, se trata de quemado permanente."
},
{
  "id": "temporal-dithering-pixel-inversion",
  "title": "Dithering Temporal (FRC) y Parpadeo de Inversión de Píxeles",
  "category": "pixels",
  "categoryTitle": "Problemas de Píxeles",
  "symptom": "Vibración microscópica, grano tembloroso en grises o fatiga visual intensa y mareos frente a la pantalla.",
  "possibleCauses": [
    "El sistema FRC alterna tonos rápidamente para simular mayor profundidad de color",
    "Desequilibrio de voltaje VCOM al alternar la polaridad de los cristales líquidos",
    "Dithering forzado por el controlador de la tarjeta gráfica"
  ],
  "checks": [
    "Comprobar patrones de 1 píxel para detectar temblores o arrastre",
    "Probar diferentes frecuencias de actualización (60Hz, 120Hz, 144Hz)",
    "Grabar con cámara lenta para evidenciar parpadeo de píxeles"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester genera tramas de fase de inversión y patrones de modulación temporal para identificar vibración en subpíxeles.",
    "links": [
      {
        "label": "Test de Inversión de Píxeles",
        "testId": "pixel-inversion-test",
        "testPath": "/tests/pixel-inversion-test"
      },
      {
        "label": "Test de Dithering Temporal",
        "testId": "temporal-dithering-test",
        "testPath": "/tests/temporal-dithering-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Voltaje de calibración analógica VCOM en placa"
  ],
  "actions": [
    "Cambiar la frecuencia de refresco en el sistema operativo",
    "Hacer coincidir la profundidad de color del controlador con la nativa del panel",
    "Elegir monitores nativos de 8 o 10 bits si padece sensibilidad visual"
  ],
  "whenToStop": "Detenga la prueba de inmediato si experimenta náuseas o dolor de cabeza."
},
{
  "id": "color-calibration-issues",
  "title": "Calibración de Color, Saturación y Desviaciones de Tinte",
  "category": "imageQuality",
  "categoryTitle": "Calidad de Imagen",
  "symptom": "Colores neón excesivamente saturados, tonos de piel antinaturales o diferencias de color entre navegadores.",
  "possibleCauses": [
    "Panel de amplia gama (DCI-P3) sin limitación a espacio sRGB en contenido estándar",
    "Perfiles ICC corruptos o superpuestos en el administrador de color",
    "Desajuste de temperatura de color o curva gamma en el monitor"
  ],
  "checks": [
    "Examinar parches de prueba para detectar rojos o verdes fluorescentes",
    "Comprobar blancos para descartar tintes rosados o verdosos",
    "Revisar el perfil de color activo en la configuración del sistema"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester incluye pruebas de cobertura de gama, parches de precisión cromática, escalas de saturación y referencia D65.",
    "links": [
      {
        "label": "Test de Espacio de Color",
        "testId": "color-gamut-test",
        "testPath": "/tests/color-gamut-test"
      },
      {
        "label": "Test de Precisión de Color",
        "testId": "color-accuracy-test",
        "testPath": "/tests/color-accuracy-test"
      },
      {
        "label": "Test de Temperatura de Color",
        "testId": "color-temperature-test",
        "testPath": "/tests/color-temperature-test"
      },
      {
        "label": "Test de Saturación",
        "testId": "saturation-test",
        "testPath": "/tests/saturation-test"
      },
      {
        "label": "Test de Daltonismo",
        "testId": "color-blindness-test",
        "testPath": "/tests/color-blindness-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Cálculo de error cromático Delta E por sonda"
  ],
  "actions": [
    "Activar el modo 'sRGB' en el menú OSD del monitor",
    "Crear un perfil ICC con un colorímetro de hardware",
    "Restablecer a valores neutros la vibración digital en los ajustes de la GPU"
  ],
  "whenToStop": "Para trabajos profesionales de imprenta se precisa calibración por sonda óptica."
},
{
  "id": "gamma-black-crush-blown-whites",
  "title": "Negros Aplastados, Blancos Quemados y Distorsión de Gamma",
  "category": "imageQuality",
  "categoryTitle": "Calidad de Imagen",
  "symptom": "Detalles en sombras se funden en negro absoluto o las zonas brillantes pierden textura convirtiéndose en blanco plano.",
  "possibleCauses": [
    "Curva gamma desviada del estándar 2.2",
    "Discrepancia en el rango dinámico HDMI (Limitado 16-235 frente a Completo 0-255)",
    "Contraste excesivamente alto en el monitor que recorta las altas luces"
  ],
  "checks": [
    "Verificar el Test de Nivel de Negro: ¿se aprecian los pasos del 1 al 5?",
    "Comprobar el Test de Nivel de Blanco: ¿se distinguen los cuadros 250 a 254?",
    "Examinar la prueba de Gamma en el valor 2.2"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester proporciona escalas de gris de 256 niveles, parches para tonos cercanos al negro y bandas de calibración gamma.",
    "links": [
      {
        "label": "Test de Nivel de Negro",
        "testId": "black-level-test",
        "testPath": "/tests/black-level-test"
      },
      {
        "label": "Test de Nivel de Blanco",
        "testId": "white-level-test",
        "testPath": "/tests/white-level-test"
      },
      {
        "label": "Test de Escala de Grises",
        "testId": "grayscale-test",
        "testPath": "/tests/grayscale-test"
      },
      {
        "label": "Test de Gamma",
        "testId": "gamma-test",
        "testPath": "/tests/gamma-test"
      },
      {
        "label": "Test de Modo Oscuro",
        "testId": "dark-mode-test",
        "testPath": "/tests/dark-mode-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Profundidad de bits de la tabla LUT interna"
  ],
  "actions": [
    "Configurar rango dinámico en 'Completo (0-255)' en el panel de la tarjeta gráfica",
    "Bajar el contraste del monitor (nivel 50-70) para recuperar textura en blancos",
    "Seleccionar Gamma 2.2 en los ajustes del monitor"
  ],
  "whenToStop": "El ajuste es correcto cuando los tonos más oscuros y claros se aprecian por separado."
},
{
  "id": "oled-abl-blooming-hdr-peak",
  "title": "Atenuación Agresiva OLED ABL y Halos de Luz Mini-LED (Blooming)",
  "category": "imageQuality",
  "categoryTitle": "Calidad de Imagen",
  "symptom": "La pantalla reduce el brillo al ampliar ventanas blancas o los objetos brillantes muestran halos luminosos sobre fondos negros.",
  "possibleCauses": [
    "El circuito ABL reduce la potencia en áreas blancas grandes",
    "Zonas de atenuación Mini-LED que desbordan luz alrededor de pequeños brillos",
    "Mapeo de tonos HDR mal ajustado"
  ],
  "checks": [
    "Alternar tamaños de ventana del 1% al 100% para verificar la caída de brillo",
    "Observar puntos blancos móviles sobre fondo negro para evaluar halos",
    "Comparar la luminancia sostenida frente al pico momentáneo"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester evalúa la curva ABL según el tamaño de ventana y analiza la precisión de zonas FALD con pruebas de blooming.",
    "links": [
      {
        "label": "Test OLED ABL",
        "testId": "oled-abl-test",
        "testPath": "/tests/oled-abl-test"
      },
      {
        "label": "Test Brillo Máximo HDR",
        "testId": "hdr-peak-brightness-test",
        "testPath": "/tests/hdr-peak-brightness-test"
      },
      {
        "label": "Test de Blooming",
        "testId": "blooming-test",
        "testPath": "/tests/blooming-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Medición fotométrica de nits"
  ],
  "actions": [
    "Activar el modo 'Brillo Uniforme' en monitores OLED",
    "Ajustar la atenuación local Mini-LED a nivel 'Medio'",
    "Ejecutar la calibración HDR del sistema operativo"
  ],
  "whenToStop": "Cierto nivel de blooming es inevitable en paneles LCD con zonas de iluminación."
},
{
  "id": "response-time-motion-blur-crosstalk",
  "title": "Tiempo de Respuesta Lento, Estelas y Strobe Crosstalk",
  "category": "display",
  "categoryTitle": "Problemas de Pantalla",
  "symptom": "Los objetos en movimiento dejan estelas oscuras (ghosting) o halos blancos brillantes (overshoot) al desplazarse.",
  "possibleCauses": [
    "Tiempos de transición GtG lentos en transiciones oscuras de paneles VA",
    "Ajuste de Overdrive excesivo en el monitor que provoca sobrevoltaje",
    "Desincronización del parpadeo de retroiluminación con el barrido del panel"
  ],
  "checks": [
    "Examinar transiciones de alto contraste en busca de estelas oscuras",
    "Comprobar si el rastro del objeto es negro (ghosting) o blanco brillante (overshoot)",
    "Verificar si hay imágenes dobles en la parte superior e inferior de la pantalla"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester genera objetos en movimiento de alta velocidad y barras de sincronización para cámara de seguimiento.",
    "links": [
      {
        "label": "Test de Tiempo de Respuesta GtG",
        "testId": "gtg-response-time-test",
        "testPath": "/tests/gtg-response-time-test"
      },
      {
        "label": "Test de Strobe Crosstalk",
        "testId": "strobe-crosstalk-test",
        "testPath": "/tests/strobe-crosstalk-test"
      },
      {
        "label": "Test de Cámara de Seguimiento",
        "testId": "pursuit-camera-test",
        "testPath": "/tests/pursuit-camera-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Curva de fotodiodo con osciloscopio"
  ],
  "actions": [
    "Reducir el nivel de Overdrive en el menú OSD a un ajuste intermedio",
    "Ajustar la fase del estroboscopio en los menús de reducción de desenfoque",
    "Mantener los FPS del juego sincronizados con los hercios del monitor"
  ],
  "whenToStop": "El ajuste es óptimo cuando desaparecen las coronas brillantes y la imagen central es nítida."
},
{
  "id": "input-lag-gaming-responsiveness",
  "title": "Alto Input Lag, Retardo del Ratón y Latencia en Juegos",
  "category": "display",
  "categoryTitle": "Problemas de Pantalla",
  "symptom": "Sensación de ratón flotante o esponjoso donde el cursor reacciona con una fracción de segundo de retraso.",
  "possibleCauses": [
    "Filtros de procesado de imagen o suavizado activados en el monitor o televisor",
    "V-Sync tradicional acumulando fotogramas en cola en la GPU",
    "Tasa de sondeo del ratón baja (125Hz) o cuello de botella gráfico"
  ],
  "checks": [
    "Comprobar la frecuencia de sondeo del ratón (debe ser 1000Hz)",
    "Realizar los tests de tiempo de reacción e input lag interactivo",
    "Verificar que la pantalla esté en 'Modo Juego' o 'Modo PC'"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester mide la tasa de refresco USB del ratón, los reflejos de clic y el rendimiento gráfico WebGL.",
    "links": [
      {
        "label": "Test de Input Lag",
        "testId": "input-lag-test",
        "testPath": "/tests/input-lag-test"
      },
      {
        "label": "Test de Tiempo de Reacción",
        "testId": "reaction-time-test",
        "testPath": "/tests/reaction-time-test"
      },
      {
        "label": "Test de Polling del Ratón",
        "testId": "mouse-polling-test",
        "testPath": "/tests/mouse-polling-test"
      },
      {
        "label": "Test Benchmark GPU",
        "testId": "gpu-benchmark-test",
        "testPath": "/tests/gpu-benchmark-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Medición física de fotón a microinterruptor sin sensor LDAT"
  ],
  "actions": [
    "Activar el 'Modo Juego' en el televisor o monitor para saltarse el postprocesado",
    "Desactivar V-Sync tradicional y usar tecnologías de baja latencia como Nvidia Reflex",
    "Configurar el ratón para juegos a 1000Hz (1ms de intervalo)"
  ],
  "whenToStop": "Un retardo total inferior a 15 ms proporciona una respuesta perfecta en juegos."
},
{
  "id": "dual-monitor-color-mismatch",
  "title": "Diferencia de Color entre Dos Monitores y Desalineación",
  "category": "display",
  "categoryTitle": "Problemas de Pantalla",
  "symptom": "Dos monitores colocados juntos muestran blancos dispares, contraste desigual o cambios de color al mover ventanas.",
  "possibleCauses": [
    "Tecnologías de panel diferentes (ej. IPS junto a VA u OLED)",
    "Distinta temperatura de color configurada en cada pantalla",
    "Formatos de salida dispares en la GPU (RGB Completo frente a YCbCr)"
  ],
  "checks": [
    "Extender una ventana blanca entre los dos monitores para apreciar el salto de tono",
    "Abrir la herramienta Comparar Pantallas en ambos monitores",
    "Comprobar los ajustes de color en el panel de control de la GPU"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester proporciona lienzos de prueba sincronizados y la herramienta Dual Monitor Matcher.",
    "links": [
      {
        "label": "Comparar Pantallas",
        "testId": "compare-displays",
        "testPath": "/tests/compare-displays"
      },
      {
        "label": "Patrón Personalizado",
        "testId": "custom-pattern",
        "testPath": "/tests/custom-pattern"
      },
      {
        "label": "Dual Monitor Matcher",
        "testId": "dual-monitor-matcher",
        "testPath": "/tools/dual-monitor-matcher"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Metamerismo óptico entre distintos recubrimientos"
  ],
  "actions": [
    "Usar Dual Monitor Matcher para ajustar los canales RGB del monitor secundario",
    "Configurar ambos monitores en temperatura de color 'Cálida' o '6500K'",
    "Igualar el nivel de brillo de ambos paneles"
  ],
  "whenToStop": "El objetivo es que el blanco resulte coherente al cambiar la mirada de una pantalla a otra."
},
{
  "id": "gamepad-controller-issues",
  "title": "Stick Drift en Mandos, Latencia de Botones y Calibración",
  "category": "deviceInput",
  "categoryTitle": "Problemas de Dispositivos y Entrada",
  "symptom": "El joystick analógico se mueve solo sin tocarlo (stick drift) o los botones fallan al pulsar.",
  "possibleCauses": [
    "Desgaste de las pistas de los potenciómetros del joystick",
    "Zona muerta (deadzone) configurada demasiado reducida",
    "Interferencias en la conexión inalámbrica Bluetooth"
  ],
  "checks": [
    "Iniciar el Test de Mando en Screen Tester y pulsar cualquier botón",
    "Comprobar si los ejes vuelven exactamente a (0.00, 0.00) en reposo",
    "Verificar la respuesta lineal de los gatillos del 0% al 100%"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester utiliza la API Gamepad del navegador para medir el radio de drift, pulsaciones de botones y vibración háptica.",
    "links": [
      {
        "label": "Test de Gamepad",
        "testId": "gamepad-test",
        "testPath": "/tests/gamepad-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Estado físico del potenciómetro interno"
  ],
  "actions": [
    "Aumentar ligeramente la zona muerta en las opciones del juego",
    "Limpiar con spray limpiador de contactos electrónicos",
    "Conectar por cable USB o adaptador inalámbrico de 2.4 GHz"
  ],
  "whenToStop": "Si la desviación en reposo supera el 15%, se requiere cambiar el módulo del joystick."
},
{
  "id": "audio-video-sync-latency",
  "title": "Desincronización de Audio y Vídeo (Lip-Sync) y Retardo Bluetooth",
  "category": "deviceInput",
  "categoryTitle": "Problemas de Dispositivos y Entrada",
  "symptom": "Las voces no coinciden con los labios de los actores o los efectos de sonido de los juegos llegan con retardo.",
  "possibleCauses": [
    "Retardo por códecs Bluetooth tradicionales (150-250 ms de latencia)",
    "Procesamiento de sonido en barras de sonido o receptores por HDMI eARC",
    "Efectos de audio espacial activados en el sistema"
  ],
  "checks": [
    "Comprobar el Test de Sincronización de Audio para ver si el sonido va adelantado o retrasado",
    "Revisar el tamaño del búfer en el Test de Latencia de Audio",
    "Comparar auriculares Bluetooth con una conexión por cable jack"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester genera pulsos visuales y sonoros sincronizados para medir el desfase en milisegundos.",
    "links": [
      {
        "label": "Test de Sincronización de Audio",
        "testId": "audio-sync-test",
        "testPath": "/tests/audio-sync-test"
      },
      {
        "label": "Test de Latencia de Audio",
        "testId": "audio-latency-test",
        "testPath": "/tests/audio-latency-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Tiempo de vuelo acústico por el aire"
  ],
  "actions": [
    "Utilizar auriculares con cable o tecnología inalámbrica RF de 2.4 GHz para juegos",
    "Ajustar la opción 'Audio Delay' en la barra de sonido o televisor",
    "Desactivar mejoras de audio en Windows"
  ],
  "whenToStop": "Un desfase inferior a 40 ms resulta totalmente imperceptible."
},
{
  "id": "sensor-ambient-battery-hardware",
  "title": "Sensor de Luz Ambiental, Ahorro de Batería y Pérdida de Cuadros",
  "category": "deviceInput",
  "categoryTitle": "Problemas de Dispositivos y Entrada",
  "symptom": "La pantalla se oscurece sola en portátiles, la tasa de refresco cae de 120Hz a 60Hz con batería o los vídeos se congelan.",
  "possibleCauses": [
    "El sensor de luz ambiental atenúa el brillo automáticamente",
    "El modo de ahorro de batería reduce la potencia de la GPU y limita los hercios",
    "Inestabilidad o congestión en la conexión Wi-Fi"
  ],
  "checks": [
    "Tapar el sensor de luz para comprobar si Screen Tester detecta el cambio de lux",
    "Desconectar el cargador para verificar si bajan los hercios de la pantalla",
    "Ejecutar el test de velocidad para medir la estabilidad y latencia de red"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester supervisa sensores de luz ambiental (lux), el estado de la batería mediante la Battery API y la calidad de la conexión.",
    "links": [
      {
        "label": "Test de Luz Ambiental",
        "testId": "ambient-light-test",
        "testPath": "/tests/ambient-light-test"
      },
      {
        "label": "Test de Batería",
        "testId": "battery-test",
        "testPath": "/tests/battery-test"
      },
      {
        "label": "Test de Velocidad de Red",
        "testId": "network-speed-test",
        "testPath": "/tests/network-speed-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Degradación química de las celdas de la batería"
  ],
  "actions": [
    "Desactivar el ajuste automático de brillo según la luz en Windows",
    "Seleccionar el plan de energía 'Máximo rendimiento' al usar batería",
    "Conectar a redes Wi-Fi de 5GHz o usar cable Ethernet"
  ],
  "whenToStop": "El sistema está estable cuando el brillo y los hercios se mantienen constantes."
},
{
  "id": "monitor-setup-bandwidth-calibration",
  "title": "Ancho de Banda del Cable, Escalado DPI y Calibración OSD",
  "category": "display",
  "categoryTitle": "Problemas de Pantalla",
  "symptom": "Imposible seleccionar la frecuencia máxima a 4K, texto demasiado pequeño o pérdidas intermitentes de señal.",
  "possibleCauses": [
    "Cable de vídeo con ancho de banda insuficiente (ej. HDMI 2.0 para 4K 144Hz)",
    "Escalado DPI inadecuado que cansa la vista o desenfoca ventanas antiguas",
    "Ajustes de fábrica del menú OSD del monitor no optimizados"
  ],
  "checks": [
    "Calcular el ancho de banda necesario con la Calculadora de Ancho de Banda",
    "Verificar la distancia óptima y los PPI con la Calculadora DPI",
    "Seguir el Asistente para Nuevos Monitores para configurar el OSD"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester proporciona calculadoras de ancho de banda (HDMI/DP/DSC), densidad de píxeles, distancia ergonómica e informes certificados.",
    "links": [
      {
        "label": "Asistente Nuevo Monitor",
        "testId": "new-monitor-wizard",
        "testPath": "/tools/new-monitor-wizard"
      },
      {
        "label": "Calculadora DPI",
        "testId": "dpi-calculator",
        "testPath": "/tools/dpi-calculator"
      },
      {
        "label": "Calculadora de Ancho de Banda",
        "testId": "display-bandwidth-calculator",
        "testPath": "/tools/display-bandwidth-calculator"
      },
      {
        "label": "Calculadora Distancia Visión",
        "testId": "viewing-distance-calculator",
        "testPath": "/tools/viewing-distance-calculator"
      },
      {
        "label": "Grabador de Pantalla",
        "testId": "screen-recorder",
        "testPath": "/tools/screen-recorder"
      },
      {
        "label": "Certificado de Pantalla",
        "testId": "display-certificate",
        "testPath": "/tools/display-certificate"
      },
      {
        "label": "Guía de Calibración OSD",
        "testId": "osd-calibration-guide",
        "testPath": "/tools/osd-calibration-guide"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Blindaje físico interno del cable"
  ],
  "actions": [
    "Utilizar un cable DisplayPort 1.4/2.1 o HDMI 2.1 de ultra alta velocidad",
    "Ajustar el escalado de pantalla en Windows según la densidad PPI",
    "Seguir la Guía de Calibración OSD para optimizar brillo y contraste"
  ],
  "whenToStop": "La pantalla funciona a su resolución y hercios nativos sin cortes."
},
{
  "id": "eink-ghosting-slow-refresh",
  "title": "Efecto Fantasma en Tinta Electrónica E-Ink y Refresco Lento",
  "category": "imageQuality",
  "categoryTitle": "Calidad de Imagen",
  "symptom": "Siluetas de texto o menús anteriores permanecen marcadas en la pantalla de libros electrónicos.",
  "possibleCauses": [
    "Microcápsulas que retienen carga residual impidiendo el movimiento de pigmentos",
    "Uso de modos de refresco ultrarrápido (modo A2)",
    "Baja temperatura ambiental que vuelve viscoso el líquido interno"
  ],
  "checks": [
    "Observar si el fondo tiene sombras grisáceas de páginas previas",
    "Ejecutar la Herramienta de Refresco E-Ink en Screen Tester",
    "Comprobar que el dispositivo esté a temperatura ambiente (18°C a 25°C)"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Tester activa ciclos de parpadeo alternado blanco y negro a pantalla completa para ordenar las partículas.",
    "links": [
      {
        "label": "Herramienta Refresco E-Ink",
        "testId": "eink-refresh-tool",
        "testPath": "/tools/eink-refresh-tool"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "Algoritmos de forma de onda del chip E-Ink"
  ],
  "actions": [
    "Ejecutar varios pulsos de inversión con la herramienta E-Ink",
    "Configurar el e-reader para refrescar la pantalla completa cada 5 a 10 páginas",
    "Seleccionar el modo de lectura de alta calidad (Regal) en lugar del modo rápido"
  ],
  "whenToStop": "El ghosting en tinta electrónica es totalmente reversible; desaparece tras unos parpadeos de inversión."
}
];
