import { KnowledgeArticle } from "./types";

export const PT_KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    "slug": "resolution-and-scaling",
    "category": "display-basics",
    "title": "Resolução do Monitor, Proporção e Escala do Sistema Operacional",
    "subtitle": "Entenda pixels físicos, viewports lógicos, escala DPI e mapeamento de pixels 1:1.",
    "description": "Descubra como resolução, proporções de tela e escala do sistema operacional impactam a nitidez, legibilidade de texto e renderização 1:1.",
    "directAnswer": "A resolução da tela representa a grade física de pixels horizontais e verticais, enquanto a escala do sistema operacional redimensiona elementos gráficos para manter legibilidade em altas densidades (PPI).",
    "whyItMatters": "Operar um monitor em resolução não nativa ou com escala fracionária inadequada produz texto embaçado e moiré de interpolação porque os pixels digitais não correspondem aos subpixels físicos da matriz.",
    "whatToLookFor": [
      "Fuzzy or smudged font edges across desktop applications",
      "Stretched or squashed circles and squares indicating aspect ratio mismatch",
      "Moiré interference patterns on fine checkerboard or grid patterns",
      "Uneven line thickness across spreadsheet cells or software toolbars"
    ],
    "howToTest": [
      "Open the Resolution Checker test in Screen Tester to inspect physical canvas pixels vs. CSS logical pixels",
      "Verify that your operating system display resolution is set to the panel's native specification",
      "Run the Scaling & Aspect Ratio test to inspect concentric circles for circular symmetry (no oval elongation)"
    ],
    "whatScreenTesterCanObserve": [
      "Browser viewport width and height in CSS pixels (`window.innerWidth`, `window.innerHeight`)",
      "Device Pixel Ratio (`window.devicePixelRatio`) reported by the browser environment",
      "Screen dimensions reported by the operating system window manager (`screen.width`, `screen.height`)",
      "Visual rendering of 1-pixel alternating line gratings and calibrated geometric shapes"
    ],
    "whatScreenTesterCannotDetermine": [
      "Physical diagonal monitor size in inches (unless manually input by the user)",
      "Physical panel pixel pitch (sub-millimeter distance between phosphor dots or subpixels)",
      "Hardware scaling filters implemented inside the monitor chassis scaler chip"
    ],
    "commonCauses": [
      "Operating system set to a non-native resolution (e.g., 1080p selected on a 1440p panel)",
      "Fractional UI scaling (e.g., 125% or 175%) without integer scaling support in legacy Win32 apps",
      "Incorrect monitor OSD aspect ratio setting (e.g., '16:9 Wide' forced on a 16:10 or 4:3 input signal)",
      "GPU driver display scaling configured to 'Stretch' instead of 'Aspect Ratio' or 'No Scaling'"
    ],
    "whatToDoNext": [
      "Set your operating system display resolution to 'Recommended (Native)' in Windows or macOS settings",
      "If text is too small, use integer scaling (e.g., 200% on a 4K display) or calibrate system text antialiasing",
      "Check your monitor on-screen display (OSD) and set Aspect Ratio to 'Auto', 'Original', or '1:1'"
    ],
    "sections": [
      {
        "title": "Physical Resolution vs. Logical Viewport",
        "content": [
          "Physical resolution describes the exact count of microscopic physical light-emitting elements manufactured into the display substrate (e.g., 3840 × 2160 physical subpixel triads).",
          "Logical resolution (CSS pixels) is the abstraction presented to web browsers and desktop software. On high-density screens (such as 4K monitors or Retina laptops), the operating system applies a scale multiplier (Device Pixel Ratio). At 200% scaling, a 3840 × 2160 screen behaves like a 1920 × 1080 logical canvas, with each logical coordinate backed by a 2 × 2 grid of physical pixels."
        ]
      },
      {
        "title": "The Problem of Fractional Scaling",
        "content": [
          "Integer scaling (100%, 200%, 300%) maps single digital pixels cleanly onto exact whole physical pixels (1:1 or 2:2).",
          "Fractional scaling (125%, 150%, 175%) requires software renderers to split single digital pixels across fractional hardware boundaries (e.g., 1 digital pixel spans 1.25 physical pixels). Without advanced vector rendering, bitmap elements must be resampled and interpolated, causing subtle blurriness."
        ]
      }
    ],
    "faq": [
      {
        "question": "Why does my 4K monitor look blurry in some desktop applications?",
        "answer": "Legacy desktop applications that do not support modern Per-Monitor DPI scaling are stretched as low-resolution bitmaps by the operating system window manager, leading to fuzzy fonts and soft window borders."
      },
      {
        "question": "Is 1080p content sharp on a 4K display?",
        "answer": "Because 3840 × 2160 is exactly 2× the width and height of 1920 × 1080, integer scaling allows 4 physical pixels to represent 1 source pixel cleanly without bilinear blur. However, standard bilinear scalers may soften the image unless integer scaling is explicitly enabled in GPU drivers."
      }
    ],
    "relatedTestIds": [
      "resolution-checker",
      "scaling-aspect-test",
      "display-info"
    ],
    "relatedTroubleshootingIds": [
      "wrong-resolution",
      "blurry-text"
    ],
    "relatedArticleSlugs": [
      "text-clarity-and-subpixel-rendering",
      "aspect-ratio-and-scaling-artifacts"
    ],
    "primarySearchIntent": "resolucao monitor escala proporcao tela nitidez display",
    "readingTimeMinutes": 5
  },
  {
    "slug": "refresh-rate-and-frame-rates",
    "category": "display-basics",
    "title": "Configuração multimonitor: Taxas de atualização mistas, escala DPI e gaguejo (stutter)",
    "subtitle": "Disparidade de taxas de atualização, frame pacing do compositor, dimensionamento do SO e fluidez multitelas.",
    "description": "Descubra por que configurações multimonitor com taxas mistas (60Hz, 144Hz, 165Hz) e escala DPI diferente podem engasgar e como recuperar a fluidez do desktop.",
    "directAnswer": "Engasgos, travamentos e anomalias de escala em sistemas multimonitor ocorrem quando o compositor de janelas do sistema operacional, o driver gráfico ou os aplicativos encontram dificuldades para sincronizar taxas de atualização díspares ou coordenar fatores de escala DPI fracionários entre várias telas.",
    "whyItMatters": "Espaços de trabalho modernos combinam frequentemente telas heterogêneas, como um monitor gamer de alta taxa de atualização ao lado de um monitor secundário padrão ou um notebook conectado a uma tela 4K externa. Quando taxas de atualização, densidades de pixels ou espaços de cor divergem, pequenos desalinhamentos provocam atrasos no cursor, travamentos na reprodução de vídeo ou fontes embaçadas. O diagnóstico exige isolar se a falha decorre do hardware da tela, do driver da placa de vídeo, do compositor do SO ou da renderização do aplicativo.",
    "whatToLookFor": [
      "Movimento truncado ou aos trancos no cursor do mouse ao passar da tela principal rápida para o monitor secundário",
      "Engasgos visíveis ou quadros descartados ao reproduzir vídeo em uma tela enquanto rola páginas ou digita na outra",
      "Saltos bruscos de tamanho da janela ou texto desfocado ao arrastar programas entre telas com escalas de DPI diferentes",
      "Microtravamentos (micro-stuttering) ou cadência irregular em jogos em modo janela ou animações web com o segundo monitor ativo",
      "Fluidez de rolagem inconsistente no navegador entre os diferentes monitores que compõem o sistema",
      "Taxa de atualização ou resolução que retorna inesperadamente para um valor baixo após o modo de espera ou reinicialização"
    ],
    "howToTest": [
      "Abra o [Teste de taxa de atualização](/tests/refresh-rate-test) no Screen Tester e acompanhe a cadência de quadros em cada monitor individualmente.",
      "Arraste a janela do navegador com o [Teste de taxa de atualização](/tests/refresh-rate-test) pela borda entre as duas telas para observar a transição de taxa de quadros.",
      "Execute o [Teste de VRR](/tests/vrr-test) para avaliar visualmente a estabilidade de movimento e constatar eventuais quebras ou oscilações de sincronia.",
      "Avalie a precisão tipográfica e as mudanças de escala da interface com o [Teste de nitidez de texto](/tests/text-clarity-test).",
      "Compare a retenção de movimento e o rastro em ambos os monitores com o [Teste de desfoque de movimento](/tests/motion-blur-test) e o [Teste de ghosting](/tests/ghosting-test).",
      "Consulte as dimensões de tela e a relação de pixels informadas pelo navegador em [Informações da tela](/tests/display-info).",
      "Examine o suporte à aceleração por hardware e recursos de exibição em [Compatibilidade do navegador](/tools/browser-compatibility).",
      "Acesse nosso [Guia de solução de problemas](/knowledge-base/troubleshooting) interativo caso um monitor permaneça bloqueado em uma frequência inferior."
    ],
    "whatScreenTesterCanObserve": [
      "Registos temporais de retorno de animação via `requestAnimationFrame` no ecrã ativo",
      "Desvio-padrão estatístico dos intervalos de débito de fotogramas (deteção de micro-soluços e quebras de fluidez)",
      "Device Pixel Ratio (`window.devicePixelRatio`) e geometria lógica CSS reportados pelo navegador",
      "Comparação visual de fluidez de movimento, cadência pendular e deslocamento entre corrente e bateria",
      "Suporte de APIs do navegador para posicionamento de janelas em múltiplos ecrãs e enumeração de monitores"
    ],
    "whatScreenTesterCannotDetermine": [
      "Sincronismo físico de varrimento do painel ou relógio de referência em cabos DisplayPort ou HDMI",
      "Tensão física dos barramentos de alimentação internos, telemetria de carga ACPI ou limites térmicos",
      "Estados de relógio da GPU (P-states/D-states), posição de comutadores MUX ou poupança de energia PCIe ASPM",
      "Programação interna de permuta de memória do compositor do sistema operativo (DWM, Wayland ou Quartz)",
      "Densidade física de píxeis (DPI) real do painel independentemente dos fatores de escala do SO"
    ],
    "commonCauses": [
      "O compositor de janelas do sistema operacional coordena com dificuldade intervalos de saída independentes entre taxas desiguais",
      "A decodificação de vídeo acelerada por hardware no monitor secundário atrela as threads de exibição da GPU à sua frequência",
      "Diferenças de escala DPI fracionária (ex.: 100% em 1440p combinado a 150% em 4K) forçam o reescalonamento borrado em bitmap",
      "Taxa de atualização variável (G-Sync/FreeSync) em modo janela colide com animações em segundo plano no outro monitor",
      "O clock da memória da GPU varia desordenadamente ou trava no patamar máximo por divergências de temporização (CVT vs CVT-RB)",
      "Arquitetura de gráficos híbridos em notebooks transmitindo o sinal da tela externa pelo buffer da GPU integrada"
    ],
    "whatToDoNext": [
      "Confira nas configurações avançadas de vídeo do sistema operacional se cada monitor está definido para sua taxa nativa mais alta.",
      "Se houver engasgos com taxas mistas, teste configurar a tela secundária em um divisor inteiro da principal quando possível.",
      "Padronize a escala do sistema sempre que viável ou ajuste as opções de compatibilidade DPI por monitor para softwares antigos.",
      "Defina o G-Sync ou FreeSync no painel da placa gráfica para 'Apenas tela cheia' para evitar disputas no desktop.",
      "Desconecte temporariamente a tela secundária para isolar se a falha é do próprio monitor ou decorre do uso multitelas."
    ],
    "sections": [
      {
        "title": "Por que sistemas multimonitor com taxas de atualização mistas se comportam de modo diferente",
        "content": [
          "Utilizar múltiplos monitores com taxas de atualização diferentes — como parear uma tela gamer de 144Hz, 165Hz ou 240Hz com um monitor secundário de 60Hz ou 75Hz — é uma prática bastante difundida. Contudo, muitos usuários notam pequenas irregularidades de movimento que não existiam ao usar apenas uma tela rápida.",
          "Entre os sintomas comuns estão travamentos ao rolar páginas no navegador, perda de quadros em janelas animadas, hesitação no ponteiro do mouse ou pequenos engasgos na reprodução de vídeos. Vale frisar que frequências mistas não provocam falhas de hardware por si só; placas de vídeo e sistemas operacionais modernos possuem capacidade arquitetural para fornecer frequências independentes simultâneas.",
          "A preservação da fluidez visual depende do sincronismo de diversos componentes: o compositor de janelas do sistema operacional, o driver gráfico, as opções de aceleração por hardware do navegador, as APIs multimídia e a gestão energética da GPU. Diagnosticar os travamentos exige compreender como essas camadas interagem antes de supor defeito no monitor."
        ],
        "bullets": [
          "Taxas mistas não geram travamentos automaticamente, mas exigem maior esforço do compositor de janelas.",
          "Podem ocorrer saltos no cursor, rolagem irregular no navegador e quadros perdidos em animações.",
          "A fluidez depende do alinhamento entre SO, driver, aceleração gráfica e temporização dos monitores.",
          "Os testes em navegador avaliam o fluxo de quadros das aplicações, não o escaneamento físico do painel."
        ]
      },
      {
        "title": "Taxas de atualização mistas na prática: Cenários comuns e exibição de quadros",
        "content": [
          "Em uma configuração multitelas, cada monitor recebe um sinal de sincronização vertical independente da placa de vídeo. Em arranjos frequentes como 60Hz com 144Hz, 60Hz com 165Hz ou 120Hz com 144Hz, os intervalos de atualização não se cruzam perfeitamente: um monitor de 60Hz atualiza a cada 16,67ms aprox., enquanto o de 144Hz o faz a cada 6,94ms.",
          "Caso uma animação ou vídeo seja reproduzido na tela de 60Hz enquanto a tela de 144Hz executa jogos ou navegação, o compositor do sistema precisa coordenar duas filas de exibição assíncronas. No passado, compositores mais antigos nivelavam toda a interface pelo menor denominador comum, limitando também o monitor veloz a 60 FPS.",
          "Compositores modernos contam com rotinas de exibição desacopladas para cada monitor. Mesmo assim, atritos de software continuam possíveis: a decodificação de vídeo por hardware na tela de 60Hz pode monopolizar threads gráficas. Avaliar cada monitor separadamente ajuda a verificar se limitações de software estão ativas."
        ],
        "bullets": [
          "Frequências assimétricas (ex.: 60Hz + 144Hz) operam com ciclos de atualização desfasados.",
          "O gerenciador de janelas do SO precisa manter buffers de exibição separados para cada monitor.",
          "A reprodução de vídeo na tela secundária pode atrelar temporariamente os processos da GPU à sua taxa.",
          "Medições com requestAnimationFrame avaliam o desempenho do software, sem certificar a eletrônica do painel."
        ]
      },
      {
        "title": "Escala de DPI em múltiplos monitores: Escalonamento fracionário e nitidez de fontes",
        "content": [
          "Espaços multimonitor frequentemente combinam aparelhos de tamanhos e resoluções nativas muito distintas. Um exemplo corriqueiro é um monitor 4K de 27 polegadas (com escala a 150%) ao lado de uma tela Full HD de 24 polegadas (a 100%), ou um notebook compacto ligado a um monitor grande.",
          "Quando os monitores utilizam porcentagens de escala diferentes (100%, 125%, 150% ou 200%), o sistema operacional precisa calcular e desenhar a interface de forma independente para cada densidade. Programas modernos adaptados para DPI por monitor recalculam seus elementos vetoriais e tipografias dinamicamente ao cruzar a borda das telas.",
          "Por outro lado, aplicativos mais antigos sem suporte moderno a DPI por tela não se redesenham em tempo real. Ao passarem para um monitor com outra escala, o sistema estica a janela como um mapa de bits, deixando letras e ícones embaçados. O [Teste de nitidez de texto](/tests/text-clarity-test) permite verificar se a falta de definição se deve ao escalonamento fracionário ou à renderização de subpixels."
        ],
        "bullets": [
          "Escalas mistas exigem que o SO processe densidades de exibição distintas simultaneamente.",
          "Aplicações modernas redesenham fontes e vetores para preservar contornos nítidos entre telas.",
          "Programas antigos sofrem ampliação em bitmap pelo SO, o que produz aspecto desfocado.",
          "Mover janelas entre monitores com escalas desiguais pode gerar pequenos saltos visuais momentâneos."
        ]
      },
      {
        "title": "Resolução, viewports e escala: Coordenadas digitais versus o painel físico",
        "content": [
          "Para avaliar corretamente o comportamento multimonitor é indispensável separar as especificações do painel físico das camadas de software. É frequente confundir o dimensionamento do SO, o zoom do aplicativo, o zoom do navegador, os pixels CSS e os pixels físicos da tela.",
          "A resolução física corresponde à matriz imutável de subpixels fabricada no vidro do painel (ex.: 3840 × 2160 tríades RGB). A relação de pixels do dispositivo (Device Pixel Ratio, DPR) é o multiplicador repassado pelo SO ao navegador: a 150% de escala, o DPR é 1,5; a 200%, vale 2,0. O viewport lógico (pixels CSS) define o plano de coordenadas para a estruturação das páginas web (`window.innerWidth` e `window.innerHeight`).",
          "O Screen Tester opera com transparência técnica: os navegadores relatam as dimensões do viewport e o `window.devicePixelRatio` com precisão por meio de APIs oficiais. Entretanto, o navegador não possui instrumentos ópticos para examinar o espaçamento real dos subpixels ou certificar os filtros de escala do chassi do monitor."
        ],
        "bullets": [
          "Resolução física: A grade de subpixels construída de forma fixa no painel da tela.",
          "Device Pixel Ratio (DPR): O coeficiente de multiplicação fornecido pelo SO aos motores de navegadores.",
          "Pixels lógicos CSS: O plano de coordenadas empregado para diagramar páginas e exibir tipografia.",
          "Limites de aferição: As APIs web fornecem dados lógicos e DPR, sem efetuar medições ópticas de laboratório."
        ]
      },
      {
        "title": "Roteiro estruturado de diagnóstico multimonitor: Sequência metódica",
        "content": [
          "Ao investigar engasgos, instabilidade no cursor ou textos embaçados em múltiplas telas, evite mexer em configurações de modo aleatório. Siga este roteiro em 7 etapas:",
          "Etapa A: Registrar a configuração base. Anote a resolução nativa, a taxa de atualização configurada, a porcentagem de escala, o cabo utilizado (DisplayPort ou HDMI) e o status do HDR em cada tela.",
          "Etapa B: Testar cada tela individualmente. Desconecte os monitores secundários e utilize o [Teste de taxa de atualização](/tests/refresh-rate-test) no monitor principal para certificar-se de sua fluidez básica.",
          "Etapa C: Testar o conjunto sem cargas adicionais. Reconecte o segundo monitor sem abrir programas em segundo plano e repita o [Teste de taxa de atualização](/tests/refresh-rate-test).",
          "Etapa D: Mover janelas entre monitores. Arraste a janela de testes através da divisão das telas para observar se há queda na taxa de quadros ou se as fontes ficam borradas.",
          "Etapa E: Testar rolagem e animação. Faça rolagens rápidas em ambas as telas usando o [Teste de taxa de atualização](/tests/refresh-rate-test) e o [Teste de desfoque de movimento](/tests/motion-blur-test).",
          "Etapa F: Incluir reprodução de vídeo. Execute um vídeo na tela secundária enquanto realiza testes na principal para detectar eventuais gargalos de composição.",
          "Etapa G: Ajustar apenas uma variável por vez. Altere um único parâmetro (como alternar a aceleração gráfica ou trocar a taxa por um múltiplo inteiro) e teste novamente."
        ],
        "bullets": [
          "Etapa A: Documentar resoluções, taxas de atualização, escalas e padrões de cabos.",
          "Etapa B: Verificar cada monitor separadamente para validar o comportamento individual.",
          "Etapa C: Conectar ambas as telas em repouso para analisar a estabilidade da taxa de quadros.",
          "Etapa D e E: Mover janelas entre as telas e verificar a suavidade da rolagem de páginas.",
          "Etapa F e G: Testar com reprodução de mídia e alterar somente uma configuração por teste."
        ]
      },
      {
        "title": "Isolamento da camada responsável: Modelo de diagnóstico em níveis",
        "content": [
          "Como os engasgos no desktop podem se originar em diferentes partes da estrutura do computador, organizá-los por camadas facilita a solução:",
          "1. Camada de tela e painel: Inconsistências no monitor, como falhas de comunicação EDID nas linhas DDC ou overdrives incorretos no menu OSD. Avaliação com o [Teste de ghosting](/tests/ghosting-test).",
          "2. Camada de conexão e sinal: Limitações de largura de banda em cabos, adaptadores passivos obsoletos ou gargalos em hubs DisplayPort MST. Verificação com [Informações da tela](/tests/display-info).",
          "3. Camada de GPU e driver: Gerenciamento das filas de saída gráfica, clocks de memória travados ou estados de economia de energia instáveis. Correção via atualização ou instalação limpa de drivers.",
          "4. Camada do compositor do SO: Dificuldade do gerenciador de janelas (Windows DWM, Linux Wayland/X11, macOS Quartz) em harmonizar ciclos V-Sync assimétricos. Comparação entre tela única e multitelas.",
          "5. Camada de aplicativos e navegador: Estrutura de processos do navegador, renderização gráfica e suspensão de abas inativas. Teste em [Compatibilidade do navegador](/tools/browser-compatibility).",
          "6. Camada de mídia e vídeo: Decodificadores de hardware atrelando os ciclos de apresentação da GPU à cadência fixa dos arquivos de vídeo (24, 30 ou 60 FPS)."
        ],
        "bullets": [
          "Camada de tela: Firmware do monitor, leitura de dados EDID e ajustes OSD.",
          "Camada de sinal: Largura de banda do cabo, versão das portas e limitações de hubs.",
          "Camada de GPU: Filas de saída de vídeo, frequências de memória e parâmetros do driver.",
          "Camada do compositor: Gestor de janelas operando sobre ciclos de varredura desiguais.",
          "Camada de aplicativos: Renderização web, aceleração por hardware e processos do navegador.",
          "Camada de vídeo: Travamento de frequência induzido por decodificadores de mídia."
        ]
      },
      {
        "title": "Ambientes mistos de HDR e SDR: Luminância, espaço de cores e composição",
        "content": [
          "Conectar um monitor HDR ao lado de uma tela SDR comum traz desafios adicionais ao compositor da área de trabalho. Quando uma tela opera em HDR e a contígua em SDR, o sistema precisa calcular dois espaços de cor e duas curvas de luminância em tempo real.",
          "No Windows, o compositor converte elementos sRGB padrão em um formato estendido para o monitor HDR, ao mesmo tempo em que envia sRGB nativo de 8 bits para a tela SDR. Se a barra 'Brilho do conteúdo SDR' estiver desajustada, os fundos brancos parecerão excessivamente claros ou opacos ao comparar os monitores.",
          "Além disso, arrastar programas com reprodução de vídeo entre monitores exige que o sistema refaça o mapeamento de tons na hora, podendo causar pequenos travamentos ou oscilações de tonalidade. A seção [Informações da tela](/tests/display-info) exibe o suporte HDR identificado, mas o navegador não avalia a precisão de cor do SO."
        ],
        "bullets": [
          "Setups combinando HDR e SDR demandam cálculos simultâneos de cores e dinâmica luminosa.",
          "A barra de brilho para conteúdo SDR deve ser calibrada para equilibrar os brancos entre as telas.",
          "Mover janelas de vídeo entre os monitores força o recálculo imediato das curvas de tons.",
          "APIs de navegadores apontam o suporte informado, sem certificar a precisão de calibração do SO."
        ]
      },
      {
        "title": "Taxa de atualização variável (VRR) em múltiplos monitores: Sincronização em janela",
        "content": [
          "Tecnologias de taxa de atualização variável (VRR) — como NVIDIA G-Sync, AMD FreeSync e VESA Adaptive-Sync — ajustam continuamente a frequência do monitor à geração de quadros da placa gráfica. Embora entreguem excelente fluidez em jogos em tela cheia com um só monitor, em arranjos multitelas podem ocorrer comportamentos imprevistos.",
          "Ao habilitar o VRR para 'Modo janela e tela cheia' no painel de controle gráfico, o driver tenta associar a frequência da tela à janela em primeiro plano. Se em outra tela houver animações ativas no navegador, vídeos ou mensageiros, o driver pode hesitar sobre qual aplicativo priorizar, resultando em oscilações de brilho e engasgos.",
          "Por meio do [Teste de VRR](/tests/vrr-test) e do [Teste de taxa de atualização](/tests/refresh-rate-test) no Screen Tester, é possível inspecionar a regularidade do movimento. Havendo travamentos em jogos em modo janela, restringir o VRR para 'Apenas tela cheia' costuma eliminar esses conflitos de sincronia."
        ],
        "bullets": [
          "O VRR acompanha a velocidade com que a placa de vídeo conclui a renderização dos quadros.",
          "O modo janela do VRR pode sofrer interferências de aplicativos em execução nas telas secundárias.",
          "Oscilações no sincronismo podem provocar cintilações ou perda de fluidez na área de trabalho.",
          "O Screen Tester possibilita a avaliação visual da cadência, sem consultar registradores da GPU."
        ]
      },
      {
        "title": "Notebook e monitor externo: Docks, perfis de energia e gráficos híbridos",
        "content": [
          "Ligar uma tela externa a um notebook apresenta particularidades distintas dos computadores de mesa. A maioria dos notebooks atuais utiliza gráficos híbridos (como NVIDIA Optimus, AMD SmartAccess ou memória unificada da Apple), nos quais chips integrados e dedicados compartilham tarefas.",
          "De acordo com o projeto da placa-mãe, o painel do notebook costuma ser alimentado pelo chip integrado de baixo consumo, enquanto as saídas de vídeo externas (HDMI ou USB-C) podem se conectar diretamente à placa dedicada ou transitar pelo buffer do chip integrado. Esse trajeto adicional de transferência de dados pelo barramento pode gerar pequenas latências e engasgos.",
          "Além disso, o funcionamento na bateria impõe perfis rígidos de economia. Sem necessariamente reduzir a taxa em todos os casos, muitos computadores retornam para 60Hz ou cortam a velocidade de vias PCIe. Conduzir os testes com o computador plugado à tomada ajuda a diferenciar limitações de energia de falhas reais de configuração."
        ],
        "bullets": [
          "Sistemas gráficos híbridos dividem telas internas e portas externas entre diferentes controladores.",
          "Sinais roteados através do chip integrado podem sofrer atrasos de cópia no barramento.",
          "Docks USB-C ou Thunderbolt dividem largura de banda com dados e conexões de rede.",
          "O uso na bateria pode restringir clocks da GPU; conduza as verificações conectado à tomada."
        ]
      },
      {
        "title": "Comportamento do ecrã do portátil com bateria vs. corrente: Frequências, energia e dimensionamento",
        "content": [
          "Utilizar um computador portátil alimentado por bateria (CC) altera profundamente os limites térmicos e energéticos face à ligação à rede elétrica (CA). Para maximizar a autonomia, o sistema operativo e os controladores da CPU e da GPU acionam mecanismos de poupança dinâmica que afetam de forma percetível a renderização do ecrã e a fluidez dos movimentos.",
          "Em modo de bateria, os planos do sistema operativo (como Melhor eficiência energética, Equilibrado ou Melhor desempenho no Windows; modo de baixo consumo no macOS; perfis energéticos no Linux) limitam tarefas secundárias. As placas gráficas reduzem as frequências do núcleo e da memória (P-states), enquanto o barramento PCIe entra em modos de poupança ASPM (L0s/L1) para conter o consumo, o que diminui a largura de banda para os controladores de vídeo.",
          "Paralelamente, os ecrãs modernos empregam taxas de atualização dinâmicas. Com a Taxa de Atualização Dinâmica (DRR) do Windows 11 ou o firmware do fabricante, painéis rápidos (120Hz, 144Hz, 240Hz) recuam frequentemente para 60Hz ou acionam o autorrefresco de painel (PSR) quando inativos na bateria. Soluções como CABC, Intel DPST ou AMD Vari-Bright modulam ainda a retroiluminação e a curva de gama com base no conteúdo exibido.",
          "Contudo, a utilização da bateria NÃO restringe a taxa de atualização de forma obrigatória em todos os modelos. Computadores de jogos com comutadores MUX conseguem sustentar frequências elevadas com bateria à custa de um consumo acelerado, ao passo que os modelos ultraportáteis priorizam a duração da carga. Distinguir se uma quebra de desempenho é intencional ou um estrangulamento requer testes comparativos estruturados."
        ],
        "bullets": [
          "A bateria aciona estados de poupança na CPU, GPU e ligações PCIe ASPM para preservar energia.",
          "A taxa dinâmica (DRR) e o autorrefresco (PSR) podem baixar o painel para 60Hz na bateria.",
          "Tecnologias adaptativas (CABC, Intel DPST, AMD Vari-Bright) modulam contraste e brilho dinamicamente.",
          "Os perfis de bateria não limitam os ecrãs de forma universal; depende das configurações OEM e do SO."
        ]
      },
      {
        "title": "Painel interno do portátil vs. monitores externos sob alimentação por bateria",
        "content": [
          "Os portáteis atuais recorrem a arquiteturas gráficas híbridas (como NVIDIA Optimus, AMD SmartAccess Graphics ou a memória unificada da Apple), nas quais o ecrã integrado e as saídas externas são alimentados por controladores distintos.",
          "Geralmente, o ecrã interno está ligado por eDP (Embedded DisplayPort) diretamente à gráfica integrada (iGPU). Em modo de bateria, a gráfica dedicada (dGPU) é desativada para poupar energia. Se uma aplicação exigir a dGPU, as imagens geradas têm de ser transferidas pelo barramento do sistema até ao controlador da iGPU, constituindo uma etapa adicional que pode causar micro-soluços caso a largura de banda do barramento PCIe esteja limitada pela bateria.",
          "Os monitores externos ligados via HDMI, USB-C DisplayPort Alt Mode ou estações Thunderbolt introduzem mais variáveis. Estas saídas comunicam frequentemente de forma direta com a dGPU ou partilham largura de banda com portas USB e ligação de rede. Desligar a alimentação de rede pode forçar a base a renegociar os perfis de alimentação (Power Delivery) ou fazer a dGPU abrandar acentuadamente, provocando quebras de fluidez que não ocorrem quando ligado à tomada."
        ],
        "bullets": [
          "O ecrã interno liga-se por eDP à iGPU; a dGPU fica frequentemente em suspensão com bateria.",
          "A cópia de fotogramas entre gráficas pode gerar micro-soluços se a largura de banda estiver contida.",
          "Bases Thunderbolt e USB-C partilham largura de banda e podem renegociar energia ao desligar da tomada.",
          "Testar monitores externos na tomada elétrica permite separar limitações da base de anomalias no ecrã."
        ]
      },
      {
        "title": "Procedimento controlado de comparação: Bateria vs. Corrente em portáteis",
        "content": [
          "Para aferir se a falta de fluidez, as quebras de frequência ou as oscilações de brilho se devem a políticas de poupança do sistema operativo ou a defeitos de hardware, aplique este protocolo de 5 fases:",
          "Fase 1: Medição de referência na corrente elétrica. Ligue o portátil ao carregador oficial. Defina o perfil energético do sistema operativo para 'Equilibrado' ou 'Melhor desempenho'. Abra o [Teste de taxa de atualização](/tests/refresh-rate-test) e o [Teste de desfoque de movimento](/tests/motion-blur-test) no Screen Tester. Registe a taxa de fotogramas e a suavidade observada.",
          "Fase 2: Desconexão do carregador. Desligue o cabo com o Screen Tester aberto. Observe as reações automáticas: O ecrã escurece? As definições do Windows ou o [Teste de taxa de atualização](/tests/refresh-rate-test) acusam uma quebra de 120Hz/144Hz para 60Hz? O [Teste HDR](/tests/hdr-test) indica a desativação do HDR por restrições de bateria?",
          "Fase 3: Avaliação de resposta dinâmica e cadência. Mova o cursor do rato rapidamente e desloque páginas de texto. Em sistemas com Windows DRR, verifique se o movimento reativa temporariamente a frequência ou se permanece nos 60Hz. Avalie com o [Teste VRR](/tests/vrr-test) caso o painel suporte taxa variável.",
          "Fase 4: Avaliação de monitores externos. Com um ecrã externo ligado, repare se arrastar janelas solavanca com a bateria em comparação com a corrente elétrica. Inspecione os parâmetros do monitor em [Informações do ecrã](/tests/display-info) e o estado de suporte em [Compatibilidade do navegador](/tools/browser-compatibility).",
          "Fase 5: Reconexão à corrente elétrica. Volte a ligar o carregador. Comprove se a taxa de atualização, o brilho e a cadência de fotogramas se restabelecem de imediato ou se exigem o reinício do programa."
        ],
        "bullets": [
          "Fase 1: Registar a fluidez de referência ligado ao carregador oficial nos modos de Desempenho/Equilibrado.",
          "Fase 2: Desligar o carregador e verificar alterações imediatas nas frequências, brilho e HDR pelo SO.",
          "Fase 3: Analisar a resposta dinâmica do cursor e do deslocamento sob a tecnologia Windows DRR.",
          "Fase 4: Comparar o monitor externo na bateria e na corrente para isolar restrições da base de ligação.",
          "Fase 5: Reconectar a corrente e certificar a recuperação integral e estável dos valores normais."
        ]
      },
      {
        "title": "Diagnosticar soluços de ecrã ligados à energia: Comportamento normal vs. Avarias",
        "content": [
          "Saber distinguir as funções de poupança legítimas de defeitos reais de configuração impede alterações desnecessárias nas definições:",
          "Comportamentos de poupança normais: (1) Quebra da taxa de atualização de 144Hz/165Hz para 60Hz ao entrar no modo de Poupança de bateria do Windows; (2) Ligeiras variações dinâmicas de contraste e brilho em fundos escuros causadas pelo Intel DPST ou AMD Vari-Bright; (3) Desativação automática do HDR na bateria se a opção 'Otimizar para duração da bateria' estiver selecionada; (4) Redução ligeira do brilho máximo disponível.",
          "Comportamentos anómalos a investigar: (1) Movimento do cursor permanentemente aos soluços ou quebra acentuada de fotogramas mesmo com o carregador oficial ligado; (2) Cintilações fortes ou ecrã negro demorado ao ligar ou desligar o cabo de corrente; (3) Ecrã bloqueado nos 60Hz mesmo com o carregador ligado num painel de alta velocidade; (4) Micro-soluços acentuados ao ligar monitores externos na tomada de corrente.",
          "Passos seguros de resolução: Verifique a taxa de atualização nas definições avançadas de ecrã do Windows; consulte o software do fabricante (Lenovo Vantage, ASUS Armoury Crate, Dell Optimizer) para assegurar que os perfis ecológicos não bloqueiam o ecrã; instale de raiz os controladores gráficos; e confirme que o carregador entrega a potência nominal em watts (fontes USB-C fracas ativam reduções de desempenho mesmo ligadas à corrente). Para avarias físicas, consulte o [Guia de resolução de problemas](/knowledge-base/troubleshooting)."
        ],
        "bullets": [
          "Normal: Queda para 60Hz na poupança de bateria, ajustes CABC e corte do HDR para poupar energia.",
          "Anomalia: Soluços permanentes na corrente oficial, cintilação ao ligar o cabo ou bloqueio a 60Hz na tomada.",
          "Inspecionar utilitários OEM (Armoury Crate, Vantage, Optimizer) para despistar bloqueios de frequência.",
          "Garantir potência de carregamento suficiente para impedir reduções forçadas de desempenho na tomada."
        ]
      },
      {
        "title": "Protocolo controlado de isolamento multimonitor: Fluxo de diagnóstico passo a passo",
        "content": [
          "Ao diagnosticar quebras de movimento, cadência irregular de fotogramas ou anomalias de escala num ambiente com múltiplos monitores, realizar ajustes aleatórios gera confusão entre variáveis. Siga este procedimento metódico e seguro para isolar a camada responsável de forma conclusiva.",
          "Arquitetura de diagnóstico e níveis de evidência: Distinga claramente quatro níveis de observação: (1) Reportado pelo navegador: cadência de fotogramas rAF, devicePixelRatio e dimensões do viewport (refletem a execução do software e não o varrimento físico do painel); (2) Reportado pelo SO: taxa de atualização configurada, percentagem de escala e estado HDR comunicados pelo sistema operativo; (3) Observado pelo utilizador: quebras de fluidez percetíveis, saltos do cursor e arrastamento de janelas; (4) Especificação do fabricante: limites do painel, largura de banda das portas e capacidade da doca.",
          "Procedimento disciplinado de isolamento (Altere apenas UMA variável de cada vez):",
          "Fase 1: Documentação da BASELINE. Antes de quaisquer alterações, anote as resoluções, taxas de atualização, escalas de visualização, estados de HDR e ligações de cabo de cada ecrã.",
          "Fase 2: Testar cada ecrã de forma independente. Desative os monitores secundários nas definições do sistema ou desligue os cabos com segurança. Teste o monitor principal de alta frequência isoladamente com o [Refresh Rate Test](/tests/refresh-rate-test) e o [Motion Blur Test](/tests/motion-blur-test).",
          "Fase 3: Testar taxas de atualização idênticas. Reative o ecrã secundário mas configure temporariamente todos os ecrãs com a mesma taxa de atualização (por exemplo, ambos a 60 Hz). Avalie se a instabilidade desaparece com frequências emparelhadas.",
          "Fase 4: Testar taxas de atualização mistas. Restaure o monitor principal para a sua taxa alta nativa (144 Hz ou 165 Hz) mantendo o secundário a 60 Hz. Verifique se a reprodução de vídeo ou janelas ativas no ecrã secundário provocam quebras no ecrã principal.",
          "Fase 5: Testar configurações de escala. Teste ambos os monitores a 100% e posteriormente com escalas fracionárias mistas (ex.: 125% ao lado de 100%). Arraste janelas entre ecrãs para avaliar a nitidez do texto e a fluidez do compositor.",
          "Fase 6: Testar combinações de HDR / SDR. Se combinar um ecrã HDR com um SDR, compare o comportamento com HDR ativado e desativado nas definições do sistema para avaliar o mapeamento de tons e a luminosidade do ambiente de trabalho.",
          "Fase 7: Testar VRR Ativado vs. Desativado. Caso utilize taxa de atualização variável (G-Sync / FreeSync), ative e desative o VRR no painel da GPU e execute o [VRR Test](/tests/vrr-test).",
          "Fase 8: Testar ecrã interno vs. saída externa em portáteis. Em computadores portáteis, teste o ecrã integrado isoladamente e compare-o com um monitor externo ligado diretamente ao chassis sem hubs intermédios.",
          "Fase 9: Testar sem docas nem adaptadores intermédios. Se utilizar uma doca USB-C ou hub MST, ligue o monitor diretamente a uma porta de vídeo nativa para excluir saturação da largura de banda do controlador da doca.",
          "Fase 10: Comparar observações do navegador com a configuração do SO. Cruze os dados apresentados em [Display Information](/tests/display-info) e [Browser Compatibility](/tools/browser-compatibility) com as definições do sistema operativo. Não efetue manipulações arriscadas de hardware nem desligue cabos de forma brusca e repetida. Para assistência adicional, consulte o [Guia de Resolução de Problemas](/knowledge-base/troubleshooting)."
        ]
      }
    ],
    "faq": [
      {
        "question": "Por que meu monitor de 144Hz parece operar a 60Hz quando assisto a um vídeo na outra tela?",
        "answer": "A decodificação de vídeo acelerada por hardware em uma tela de 60Hz pode levar o compositor do sistema operacional ou o navegador a sincronizar as threads de exibição da GPU a essa taxa, causando engasgos na tela principal. Desativar a aceleração gráfica no navegador ou atualizar os drivers de vídeo frequentemente soluciona o caso."
      },
      {
        "question": "É prejudicial ou inadequado utilizar um monitor de 60Hz junto a um de 144Hz ou 165Hz?",
        "answer": "Não. Os sistemas operacionais e placas gráficas modernas suportam frequências independentes com tranquilidade. Embora sistemas legados apresentassem falhas de cadência, as instabilidades atuais derivam de sobrecargas pontuais de software e não de restrições de hardware."
      },
      {
        "question": "Por que as janelas ficam embaçadas quando arrastadas entre monitores com escalas de DPI diferentes?",
        "answer": "Programas antigos que não contam com suporte nativo a DPI por monitor não conseguem redesenhar sua interface em tempo real. O sistema operacional redimensiona a janela esticando-a como imagem, o que produz aspecto desfocado em textos e ícones."
      },
      {
        "question": "O G-Sync ou FreeSync pode provocar engasgos na área de trabalho em computadores multimonitor?",
        "answer": "Sim, sobretudo quando a sincronização variável está autorizada para modo janela e tela cheia simultaneamente. Caso uma janela em segundo plano na outra tela seja atualizada, o driver pode hesitar sobre qual taxa priorizar, gerando cintilação e perda de fluidez."
      },
      {
        "question": "Por que a tela externa conectada ao notebook apresenta engasgos quando opero na bateria?",
        "answer": "O uso na bateria aciona esquemas rigorosos de economia de energia que podem reduzir o clock da memória da GPU ou a velocidade de barramentos PCIe. Testar o equipamento ligado à tomada permite constatar se o comportamento provém de economia energética ou de ajustes de tela."
      },
      {
        "question": "O Screen Tester consegue aferir o escaneamento físico da minha GPU ou corrigir engasgos multimonitor?",
        "answer": "Não. Navegadores web rodam em um ambiente restrito de segurança e não têm acesso a registradores de baixo nível da GPU ou aos sinais físicos dos cabos. O Screen Tester disponibiliza padrões para verificação visual; as correções devem ser feitas no sistema operacional ou no driver."
      },
      {
        "question": "Porque desce o ecrã do meu portátil de 120Hz/144Hz para 60Hz ao tirar o carregador?",
        "answer": "Trata-se habitualmente de uma funcionalidade deliberada de poupança gerida pela Taxa de Atualização Dinâmica (DRR) do Windows, pelo controlador gráfico ou por utilitários da marca (como Lenovo Vantage ou ASUS Armoury Crate). Como atualizar o ecrã 120 ou 144 vezes por segundo consome muita energia, o portátil reduz para 60Hz na bateria. É possível alterar isto nas definições avançadas de ecrã do Windows ou no software do portátil se preferir fluidez contínua na bateria."
      },
      {
        "question": "Porque mudam o brilho e o contraste ao alternar entre a bateria e a corrente elétrica?",
        "answer": "Estas oscilações derivam de tecnologias de poupança como o CABC do Windows, o Intel Display Power Saving Technology (DPST) ou o AMD Vari-Bright. Modulam dinamicamente a retroiluminação e as curvas de gama consoante o conteúdo para prolongar a carga da bateria. Caso estas variações causem incómodo visual, podem ser desativadas no Centro de Comando de Gráficos Intel ou no software da AMD."
      },
      {
        "question": "O Screen Tester consegue detetar se o meu portátil está a funcionar na bateria ou na tomada?",
        "answer": "Não. Os navegadores web executam-se numa sandbox de segurança e não conseguem consultar diretamente os barramentos de alimentação física, o estado de carga ACPI nem os planos de energia sem autorizações explícitas. O Screen Tester analisa a cadência temporal do navegador e a resposta dos padrões de teste, mas não consegue discernir se a perda de fluidez decorre da bateria, de limites térmicos ou de configurações de software."
      }
    ],
    "relatedTestIds": [
      "refresh-rate-test",
      "vrr-test",
      "hdr-test",
      "text-clarity-test",
      "motion-blur-test",
      "ghosting-test",
      "display-info"
    ],
    "relatedTroubleshootingIds": [
      "wrong-refresh-rate",
      "screen-tearing",
      "flickering"
    ],
    "relatedArticleSlugs": [
      "screen-tearing-and-v-sync",
      "monitor-ghosting-and-motion-blur",
      "backlight-bleed-vs-ips-glow"
    ],
    "primarySearchIntent": "how to troubleshoot mixed refresh rate, DPI scaling, and stutter on multi-monitor setups",
    "readingTimeMinutes": 12
  },
  {
    "slug": "hdr-display-fundamentals",
    "category": "display-basics",
    "title": "Fundamentos de HDR, Mapeamento de Tons e Pico de Brilho",
    "subtitle": "Pico de luminância (Nits), quantização de 10 bits, curvas gamma PQ/HLG e escurecimento local.",
    "description": "Aprenda os princípios técnicos do High Dynamic Range: brilho máximo, iluminação FALD, tone mapping e pipelines HDR do sistema operacional.",
    "directAnswer": "O High Dynamic Range (HDR) expande o alcance dinâmico e a cobertura cromática de uma tela, proporcionando pretos mais profundos e destaques brilhantes acima de 1.000 nits.",
    "whyItMatters": "O HDR verdadeiro requer capacidade física de brilho e escurecimento local (FALD ou OLED). Monitores com pseudo-HDR clareiam os pretos e desbotam as cores.",
    "whatToLookFor": [
      "Washed-out, gray desktop colors when HDR is enabled in operating system settings",
      "Specular highlights (such as sun reflections or clouds) blending into flat white blocks with zero texture",
      "Dark scenes becoming excessively dark and losing shadow gradations",
      "Flickering or abrupt brightness shifting when bright elements open on desktop"
    ],
    "howToTest": [
      "Run the HDR Capability Test to query browser media query support for dynamic range and wide color gamut (`(dynamic-range: high)` and `(color-gamut: p3)`)",
      "Run the HDR Visual Inspection test in Screen Tester to evaluate stepped luminance highlight roll-off and near-black tone separation"
    ],
    "whatScreenTesterCanObserve": [
      "Browser CSS media query evaluation for High Dynamic Range (`dynamic-range: high`)",
      "Wide color gamut browser support flags (`color-gamut: p3`, `color-gamut: rec2020`)",
      "Visual rendering of high-bit-depth gradient sweeps and specular highlight stepped blocks"
    ],
    "whatScreenTesterCannotDetermine": [
      "Physical peak nit luminance (e.g., whether a panel genuinely hits 600 or 1,000 nits)",
      "Local dimming zone count, physical array layout, or mini-LED halo blooming severity",
      "Hardware monitor tone-mapping algorithm curves (HGIG vs. static clipping vs. dynamic tone mapping)"
    ],
    "commonCauses": [
      "Windows HDR toggle disabled in OS settings, forcing the monitor into SDR emulation mode",
      "Using a 'DisplayHDR 400' edge-lit monitor with no local dimming, resulting in elevated black levels",
      "Browser color profile flag misconfigured, failing to negotiate wide color gamut buffers with the GPU",
      "Monitor HDR picture mode set to an uncalibrated vivid profile rather than accurate reference mode"
    ],
    "whatToDoNext": [
      "Run the Windows HDR Calibration app (available from Microsoft Store) to create an accurate OS profile",
      "Ensure your video cable supports HDMI 2.0/2.1 or DisplayPort 1.4 for full 10-bit RGB uncompressed signal",
      "For OLED displays, enable HGIG or reference clipping modes for gaming to avoid double tone-mapping"
    ],
    "sections": [
      {
        "title": "SDR vs. HDR: Luminance & Color Space",
        "content": [
          "Standard Dynamic Range (SDR) is mastered to the legacy sRGB / Rec. 709 color space and standard ~100 nit reference luminance target using 8-bit precision (256 luminance steps per channel).",
          "HDR content uses the Rec. 2020 wide color container and Perceptual Quantizer (PQ / ST.2084) electro-optical transfer function, supporting up to 10,000 nits peak luminance and 10-bit or 12-bit color depths (1,024 to 4,096 steps per channel)."
        ]
      },
      {
        "title": "The Reality of Tone Mapping",
        "content": [
          "Because consumer monitors rarely output 10,000 or even 2,000 nits, the display processor must perform tone mapping: compressing the wider dynamic range of the source signal down into the physical capabilities of the panel.",
          "Hard clipping preserves accurate midtones but blows out highlights above the panel maximum. Soft roll-off compresses highlights smoothly, maintaining texture at the expense of overall specular contrast."
        ]
      }
    ],
    "faq": [
      {
        "question": "Why does my desktop look dull or gray when I turn on HDR in Windows?",
        "answer": "Windows maps SDR desktop elements to a specific paper-white slider setting in display settings. If this SDR Content Brightness slider is set too low or your monitor lacks adequate peak brightness, desktop windows appear dim."
      },
      {
        "question": "Can a web browser display true 10-bit HDR video?",
        "answer": "Yes, modern browsers on Windows and macOS support HDR video playback and CSS wide-gamut colors when hardware acceleration is enabled and the operating system is in HDR mode."
      }
    ],
    "relatedTestIds": [
      "hdr-test",
      "hdr-capability-test"
    ],
    "relatedTroubleshootingIds": [
      "hdr-not-working",
      "washed-out-colors"
    ],
    "relatedArticleSlugs": [
      "color-depth-and-banding",
      "black-levels-and-shadow-detail"
    ],
    "primarySearchIntent": "hdr monitor pico brilho nits tone mapping local dimming",
    "readingTimeMinutes": 7
  },
  {
    "slug": "color-depth-and-banding",
    "category": "display-basics",
    "title": "Profundidade de Cor, Quantização e Banding de Cores",
    "subtitle": "8 bits vs 10 bits, FRC (Frame Rate Control), artefatos de faixas e gradientes.",
    "description": "Compreenda as diferenças entre 6-bit+FRC, 8 bits e 10 bits nativos, por que faixas de cores aparecem e como testar a suavidade das transições.",
    "directAnswer": "A profundidade de cor define quantos níveis discretos de brilho uma tela pode reproduzir por canal (RGB) — de 256 níveis em 8 bits a 1.024 em 10 bits.",
    "whyItMatters": "Profundidade de cor insuficiente gera faixas visíveis (banding) em gradientes sutis, prejudicando trabalhos de edição fotográfica e criação visual.",
    "whatToLookFor": [
      "Distinct vertical or concentric rings in smooth skies or shadows instead of seamless gradation",
      "Harsh boundary lines separating dark gray tones from pure black",
      "Coarse, noisy checkerboard grain on subtle colors caused by aggressive spatial dithering",
      "Posterization where gradual color changes turn into flat blocks of uniform color"
    ],
    "howToTest": [
      "Run the Gradient & Banding Test in Screen Tester to inspect smooth 24-bit linear RGB and grayscale ramps",
      "Toggle between Horizontal, Vertical, and Dark Shadow (0%–25%) ramps to expose bit-depth truncation",
      "Inspect the 64-step quantization simulator to contrast artificial digital stepping against your panel's native performance"
    ],
    "whatScreenTesterCanObserve": [
      "HTML5 Canvas 2D and WebGL rendering of continuous 32-bit floating-point or 8-bit integer gradients",
      "Screen color depth reported by the windowing environment (`window.screen.colorDepth`, typically 24 or 30)",
      "Visual display of reference stepped gradients and smooth tonal sweeps"
    ],
    "whatScreenTesterCannotDetermine": [
      "Physical panel driver IC bit depth (e.g., true 8-bit native silicon vs. 6-bit + FRC subpixel pulsing)",
      "Temporal Frame Rate Control (FRC) hardware flicker cycles operating at 60Hz or 120Hz sub-frequencies",
      "GPU video output color format quantization (RGB Full 0-255 vs. YCbCr 4:2:2 chroma subsampling)"
    ],
    "commonCauses": [
      "Monitor panel uses a budget 6-bit+FRC architecture that struggles with fine dark-tone gradation",
      "GPU output color format accidentally set to 'Limited (16-235)' or 8-bit instead of 10-bit in graphics drivers",
      "Compressed source content (e.g., highly compressed streaming video or 8-bit JPEG images) with pre-baked banding",
      "Monitor internal gamma or contrast settings pushed beyond native linearity limits"
    ],
    "whatToDoNext": [
      "Open your GPU control panel and ensure Output Color Depth is set to 10 bpc (bits per channel) if supported",
      "Set Output Dynamic Range to 'Full (0-255)' rather than 'Limited (16-235)'",
      "Reset monitor OSD picture settings to factory default gamma to eliminate artificial quantization"
    ],
    "sections": [
      {
        "title": "Understanding Color Bit Depths",
        "content": [
          "Standard 8-bit color provides 2^8 = 256 shades per primary color (Red, Green, Blue), producing 256 × 256 × 256 = 16.7 million total colors.",
          "Professional 10-bit color provides 2^10 = 1,024 shades per channel, producing over 1.07 billion colors. This 64-fold increase in tonal resolution dramatically reduces color banding.",
          "Many affordable displays use 8-bit + FRC (Frame Rate Control): cycling adjacent pixel colors rapidly across successive refresh cycles to simulate intermediate shades through human visual persistence."
        ]
      }
    ],
    "faq": [
      {
        "question": "Is 8-bit + FRC noticeably worse than true native 10-bit?",
        "answer": "For general productivity, gaming, and casual viewing, modern high-frequency FRC algorithms are virtually indistinguishable from native 10-bit. In dark near-black gradients, high-speed camera analysis or close visual inspection may reveal subtle temporal shimmer."
      },
      {
        "question": "Why do I see banding in YouTube videos even on an expensive monitor?",
        "answer": "Video compression algorithms (like AVC, VP9, or AV1) aggressively quantize subtle color changes in dark scenes to save streaming bandwidth. In many cases, the banding is already baked into the video stream rather than caused by your monitor."
      }
    ],
    "relatedTestIds": [
      "gradient-banding-test",
      "color-banding-test",
      "color-gamut-test"
    ],
    "relatedTroubleshootingIds": [
      "washed-out-colors",
      "uneven-brightness"
    ],
    "relatedArticleSlugs": [
      "hdr-display-fundamentals",
      "black-levels-and-shadow-detail"
    ],
    "primarySearchIntent": "profundidade de cor banding tela monitor 8 bits 10 bits frc",
    "readingTimeMinutes": 5
  },
  {
    "slug": "black-levels-and-shadow-detail",
    "category": "display-basics",
    "title": "Níveis de Preto, Contraste e Detalhes de Sombras",
    "subtitle": "Contraste estático, preservação de sombras, quantização perto do preto e Black Crush.",
    "description": "Entenda como os painéis reproduzem pretos, por que o 'Black Crush' engole detalhes escuros e como calibrar a gradação gamma.",
    "directAnswer": "O nível de preto descreve a luminância residual mínima emitida por uma tela ao exibir preto absoluto, medida em candelas por metro quadrado (cd/m²).",
    "whyItMatters": "Pretos acinzentados empobrecem cenas escuras, enquanto um gamma descalibrado causa Black Crush, ocultando detalhes em jogos e filmes.",
    "whatToLookFor": [
      "Milky, glowing dark gray backgrounds in letterbox movie bars or dark scenes",
      "Inability to discern subtle shadow details (like clothing folds or night textures) in games",
      "Sudden, harsh steps between pure black and dark gray rather than a smooth ramp",
      "Uneven gray clouding across the panel when displaying an all-black screen"
    ],
    "howToTest": [
      "Run the Black Level Test to calibrate monitor Brightness until step +1% or +2% is just barely visible against black",
      "Run the Near-Black Test in Screen Tester under dim ambient lighting to inspect 0.25% to 10% dark luminance steps",
      "Inspect the PLUGE (Picture Line-Up Generation Equipment) reference bars to ensure sub-black and above-black separation"
    ],
    "whatScreenTesterCanObserve": [
      "Display of calibrated digital RGB low-luminance steps (from RGB 1 to RGB 25)",
      "PLUGE bar patterns with distinct relative percentage luminance offsets",
      "Visual near-black gradient steps across user-inspected full-screen canvas views"
    ],
    "whatScreenTesterCannotDetermine": [
      "Absolute minimum black floor in physical nits (e.g., 0.000 nits on OLED vs. 0.15 nits on IPS)",
      "True static hardware contrast ratio (e.g., 1,000:1 on IPS vs. 3,000:1 on VA vs. infinite on OLED)",
      "Ambient room light reflections and anti-glare matte coating light scatter"
    ],
    "commonCauses": [
      "Monitor physical Brightness or Black Level setting adjusted too low, causing black crush",
      "Operating system or GPU video dynamic range mismatch (Limited 16-235 input displayed as Full 0-255)",
      "IPS panel physical contrast limitation (~1,000:1) viewed in a pitch-black room without bias lighting",
      "Incorrect gamma preset in monitor OSD (e.g., Gamma 1.8 instead of standard Gamma 2.2)"
    ],
    "whatToDoNext": [
      "Calibrate the monitor Brightness OSD control in a darkened room using the PLUGE pattern",
      "Set your monitor OSD Gamma to 2.2 or sRGB",
      "Verify GPU output dynamic range is configured to 'Full Range (0-255)' over HDMI and DisplayPort"
    ],
    "sections": [
      {
        "title": "Panel Technology and Black Floors",
        "content": [
          "OLED and QD-OLED displays turn off individual subpixels completely, achieving absolute true black (0.000 nits) and theoretically infinite contrast.",
          "VA (Vertical Alignment) LCD panels physically block backlight light more effectively than IPS, delivering static contrast between 3,000:1 and 5,000:1.",
          "IPS panels keep liquid crystals parallel to the glass, allowing microscopic backlight bleed-through that caps static contrast around 1,000:1 to 1,500:1."
        ]
      }
    ],
    "faq": [
      {
        "question": "What is 'black crush'?",
        "answer": "Black crush occurs when near-black grayscale steps (e.g., RGB values 1 through 10) are all displayed at 0 nits pure black, destroying shadow texture and fine details in dark scenes."
      },
      {
        "question": "Should I set monitor Brightness to 100% for better contrast?",
        "answer": "No. On LCD monitors, increasing the 'Brightness' slider typically raises the backlight power, which elevates the black floor and washes out dark scenes. Contrast is the ratio between white and black, not maximum brightness alone."
      }
    ],
    "relatedTestIds": [
      "black-level-test",
      "near-black-test",
      "brightness-test",
      "contrast-test"
    ],
    "relatedTroubleshootingIds": [
      "uneven-brightness",
      "washed-out-colors"
    ],
    "relatedArticleSlugs": [
      "backlight-bleed-vs-ips-glow",
      "hdr-display-fundamentals"
    ],
    "primarySearchIntent": "nivel de preto contraste detalhes sombras black crush monitor",
    "readingTimeMinutes": 6
  },
  {
    "slug": "display-uniformity",
    "category": "display-basics",
    "title": "Uniformidade da Tela e Distribuição de Luminância",
    "subtitle": "Vinheta periférica, desvios cromáticos e inconsistências no painel.",
    "description": "Diagnostique variações de brilho e desvios de temperatura de cor ao longo de toda a superfície do monitor.",
    "directAnswer": "A uniformidade da tela representa a consistência de brilho e equilíbrio cromático entre o centro da tela e suas bordas externas.",
    "whyItMatters": "Quedas de brilho superiores a 15% nos cantos ou variações amareladas/azuladas distorcem a visualização em trabalhos de precisão gráfica.",
    "whatToLookFor": [
      "Vignetting (darkened corners or edges) when viewing full-screen white or light gray documents",
      "Dirty Screen Effect (DSE): subtle cloudy or streaky smudges visible when panning across solid backgrounds",
      "Color temperature shifts: one side of the screen looking noticeably warmer (yellowish) or cooler (bluish)",
      "Center hotspotting where the center of the panel is substantially brighter than the perimeter"
    ],
    "howToTest": [
      "Run the Screen Uniformity test in Screen Tester and cycle between 5%, 20%, 50%, and 100% full-screen grayscale fields",
      "On 50% and 100% white, inspect for color temperature shifts between the left, center, and right zones",
      "On 5% and 20% gray, scan for cloudy patches, vertical banding, or Dirty Screen Effect"
    ],
    "whatScreenTesterCanObserve": [
      "Full-screen flat fields across stepped grayscale luminance levels (5% to 100%)",
      "Full-screen primary color fields (Red, Green, Blue) to inspect color purity uniformity",
      "User visual observation of luminance falloff under controlled ambient lighting"
    ],
    "whatScreenTesterCannotDetermine": [
      "Delta E color temperature deviation across panel quadrants without a physical colorimeter",
      "Numerical luminance uniformity percentages (e.g., ANSI 9-point lux distribution measurement)",
      "Thermal expansion warping inside internal light guide diffuser plates"
    ],
    "commonCauses": [
      "Edge-lit LED backlight arrays with uneven light guide plate diffusion",
      "Manufacturing variations in liquid crystal gap thickness across large panel surfaces",
      "Physical chassis bezel pressure pinching the outer layers of the panel assembly",
      "OLED factory subpixel deposition variations resulting in subtle vertical banding in near-black scenes"
    ],
    "whatToDoNext": [
      "If evaluating a newly purchased monitor, inspect uniformity within your return/exchange window",
      "Ensure ambient room light is balanced: avoid strong side lighting that creates the illusion of uneven panel tint",
      "For creative professional work, calibrate near the center zone where uniformity is most consistent"
    ],
    "sections": [
      {
        "title": "Backlight Architecture & Uniformity",
        "content": [
          "Edge-lit displays place LEDs along the bottom or sides, using acrylic light guide plates to distribute light across the panel. This often causes brighter edges and darker centers.",
          "Full-Array Local Dimming (FALD) and mini-LED displays place thousands of LEDs directly behind the LCD substrate, dramatically improving contrast but potentially introducing local dimming blooming around bright objects.",
          "OLED displays have zero backlight, providing near-perfect pixel-level luminance uniformity, though early-generation panels may exhibit faint vertical banding on 5% dark gray slides."
        ]
      }
    ],
    "faq": [
      {
        "question": "Is 100% perfect screen uniformity possible on an LCD monitor?",
        "answer": "No commercial LCD panel has 100% perfect uniformity. A 10% to 15% brightness falloff from center to corners is standard across consumer displays. Only expensive professional graphics displays with built-in digital uniformity compensation (DUC) achieve near-uniform output."
      },
      {
        "question": "Does Dirty Screen Effect (DSE) get worse over time?",
        "answer": "Typically no. DSE is a physical characteristic of the diffuser sheet and liquid crystal sandwich created during factory assembly. It remains stable throughout the life of the display."
      }
    ],
    "relatedTestIds": [
      "uniformity-test",
      "white-level-test",
      "solid-color-test"
    ],
    "relatedTroubleshootingIds": [
      "uneven-brightness",
      "washed-out-colors"
    ],
    "relatedArticleSlugs": [
      "backlight-bleed-vs-ips-glow",
      "black-levels-and-shadow-detail"
    ],
    "primarySearchIntent": "uniformidade tela brilho uniforme vinheta temperatura cor",
    "readingTimeMinutes": 5
  },
  {
    "slug": "dead-pixel-vs-stuck-pixel",
    "category": "display-problems",
    "title": "Píxeis mortos vs. píxeis presos: Identificação, normas ISO e garantias",
    "subtitle": "Classificação de defeitos de píxeis, referências ISO 9241-307, garantias de fabricantes e políticas de devolução das lojas.",
    "description": "Compreenda a diferença entre píxeis mortos e presos, conheça as classes da norma ISO 9241-307 e faça a gestão correta de trocas e garantias.",
    "directAnswer": "Um píxel morto (dead pixel) é um subpíxel ou tríade completa sem alimentação elétrica que surge escuro em fundos claros, enquanto um píxel preso (stuck pixel) permanece aceso numa cor constante (vermelho, verde ou azul). A norma ISO 9241-307 é uma estrutura técnica de classificação e não gera uma obrigação automática de reembolso ou substituição; a resolução depende da loja, da garantia do fabricante e dos direitos legais do consumidor.",
    "whyItMatters": "Descobrir um defeito de píxel num monitor novo ou usado levanta dúvidas imediatas sobre prazos de devolução, termos de garantia e opções de suporte. Avaliar este cenário requer distinguir normas técnicas ergonómicas (ISO 9241-307), garantias comerciais do fabricante (RMA), políticas de devolução do comerciante e garantias legais de conformidade.",
    "whatToLookFor": [
      "Píxel morto: Um ponto escuro minúsculo que permanece apagado em fundos brancos, ciano, magenta e amarelos",
      "Subpíxel preso: Um ponto brilhante constante nas cores vermelha, verde ou azul visível em fundos escuros ou pretos",
      "Píxel quente / brilhante: Uma tríade completa permanentemente iluminada ao máximo formando um ponto branco em fundo preto",
      "Agrupamento de defeitos (cluster): Vários subpíxeis anómalos concentrados numa área muito reduzida do painel",
      "Variação de ângulo: Poeira ou resíduo cuja posição aparente se desloca ao mover a cabeça diante do ecrã",
      "Desvio cromático de subpíxel: Um subpíxel inativo que altera de forma subtil a fidelidade de tons mistos"
    ],
    "howToTest": [
      "Limpe suavemente a superfície do ecrã com um pano de microfibra seco para descartar poeiras superficiais",
      "Inicie o [Teste de Píxeis Mortos](/tests/dead-pixel-test) no Screen Tester e examine fundos em ecrã inteiro em vermelho, verde, azul, branco e preto",
      "Inspecione o ecrã metodicamente em grelha sob iluminação ambiente suave e sem reflexos diretos",
      "Execute o [Teste de Píxeis Presos](/tests/stuck-pixel-test) sobre fundos pretos e cinzentos para localizar subpíxeis acesos",
      "Observe se a anomalia desaparece ou muda de comportamento ao alternar entre cores primárias",
      "Registe as coordenadas aproximadas e confirme se o defeito fica na área central ou junto às margens",
      "Caso suspeite de um píxel preso, execute o [Fixador de Píxeis Presos](/tests/stuck-pixel-fixer) para tentar uma reativação rápida",
      "Documente as suas conclusões através do nosso [Guia de Inspeção de Monitores Novos](/guides/new-monitor-inspection-return-window) ou da [Lista de Verificação para Monitores Usados](/guides/used-monitor-inspection-checklist)"
    ],
    "whatScreenTesterCanObserve": [
      "Exibição de cores de teste calibradas digitalmente, incluindo campos RGB, branco puro e preto puro",
      "Anomalias visuais observadas pelo utilizador, mapeamento de coordenadas e notas de inspeção",
      "Padrões de transição rápida de cor de alto contraste executados através do motor de renderização do navegador",
      "Distinção visual entre defeitos escuros em fundos claros e anomalias brilhantes em fundos escuros",
      "Comparação visual de artefactos em diferentes tons sólidos e resoluções padrão do ecrã"
    ],
    "whatScreenTesterCannotDetermine": [
      "Continuidade física de circuitos de transístores de película fina (TFT) ou ruturas dielétricas internas",
      "Certificação formal de conformidade com as classes de defeitos da norma ISO 9241-307 ou tolerâncias óticas de laboratório",
      "Elegibilidade comercial de garantia ou substituição por RMA de uma unidade específica do monitor",
      "Políticas comerciais de devolução de lojas específicas, prazos de desistência ou taxas de reposição de stock",
      "Direitos legais estatutários do consumidor, patamares legais de falta de conformidade ou sentenças jurídicas"
    ],
    "commonCauses": [
      "Falhas de litografia em sala limpa durante o fabrico da matriz de transístores TFT",
      "Partículas microscópicas presas na camada de cristais líquidos durante o isolamento dos substratos",
      "Impactos mecânicos, pressão localizada ou torção no chassis ocorridos durante o transporte",
      "Pistas condutoras de óxido de índio e estanho (ITO) partidas que impedem a chegada de tensão ao subpíxel",
      "Moléculas de cristal líquido bloqueadas mecanicamente numa orientação estática na célula",
      "Sobretensões térmicas ou elétricas que danificam os microcircuitos de controlo do subpíxel"
    ],
    "whatToDoNext": [
      "Registe a posição e as cores do defeito através de fotografias macro e anotações minuciosas",
      "Verifique o prazo de devolução da loja onde comprou o monitor, que costuma ser o caminho mais simples",
      "Consulte a política oficial de defeitos de píxeis do fabricante relativa ao seu modelo específico",
      "Se for um ponto colorido isolado, execute o [Fixador de Píxeis Presos](/tests/stuck-pixel-fixer)",
      "Consulte o [Guia de Resolução de Problemas](/knowledge-base/troubleshooting) para passos adicionais antes de contactar o suporte"
    ],
    "sections": [
      {
        "title": "Píxel morto vs. píxel preso: Resumo técnico sucinto",
        "content": [
          "Os ecrãs planos modernos (painéis LCD IPS, VA, TN e matrizes OLED) são compostos por milhões de pontos microscópicos. Nos painéis LCD convencionais, cada píxel é formado por três subpíxeis independentes (vermelho, verde e azul) controlados por transístores TFT que modulam a orientação dos cristais líquidos para dosear a luz da retroiluminação.",
          "Um píxel morto surge quando o controlo do subpíxel perde totalmente a alimentação elétrica. Nas configurações usuais 'normally black', um subpíxel sem energia não deixa passar luz, formando um ponto escuro constante sobre fundos claros como branco, amarelo ou ciano.",
          "Um píxel preso acontece quando um subpíxel permanece energizado, deixando passar luz de forma contínua através do filtro de cor. Isto produz um ponto permanente vermelho, verde ou azul em fundos escuros. Nos ecrãs OLED, onde cada elemento emite a sua própria luz, um subpíxel inativo fica totalmente escuro, enquanto um curto-circuito pode mantê-lo aceso.",
          "A visibilidade do defeito varia consoante o padrão exibido: um subpíxel verde com anomalia pode ser impercetível sobre fundo azul, mas evidente sobre fundo branco ou magenta. Os testes no navegador operam na camada de renderização para facilitar a deteção visual humana, não avaliando a microeletrónica do ecrã."
        ],
        "bullets": [
          "Píxeis mortos: Subpíxeis sem energia que surgem como pontos escuros contínuos sobre fundos claros.",
          "Píxeis presos: Subpíxeis permanentemente ativados que brilham em vermelho, verde ou azul sobre fundos escuros.",
          "Tríade completa vs. subpíxel: Defeitos no píxel total afetam todas as cores; defeitos em subpíxeis alteram cores compostas.",
          "Fronteira técnica: O navegador projeta campos cromáticos para observação visual; não diagnostica o circuito semicondutor."
        ]
      },
      {
        "title": "O que é realmente a norma ISO 9241-307: Enquadramento de classificação técnica",
        "content": [
          "Para uniformizar a terminologia de engenharia e os critérios de medição na indústria de ecrãs, a Organização Internacional de Normalização (ISO) estabeleceu normas para dispositivos de visualização eletrónica, nomeadamente a ISO 13406-2 e a sua sucessora ISO 9241-307 (integrada na ergonomia da interação homem-sistema).",
          "A ISO 9241-307 define métodos técnicos de medição e categorização de imperfeições visuais em ecrãs. Classifica os defeitos em três tipos: Tipo 1 (píxeis constantemente brilhantes com luminância máxima), Tipo 2 (píxeis constantemente escuros) e Tipo 3 (subpíxeis com comportamento cromático ou luminoso anómalo).",
          "Estabelece patamares teóricos de classificação (Classe 0, Classe I, Classe II e Classe III) que determinam tolerâncias máximas de defeitos por cada milhão de píxeis físicos. A Classe 0 exige ausência total de defeitos, enquanto as Classes I e II preveem limites escalonados para píxeis brilhantes, escuros e subpíxeis.",
          "A norma ISO 9241-307 é uma referência técnica de qualidade fabril e metrologia laboratorial; não constitui automaticamente um contrato comercial de compra e venda nem uma garantia ao consumidor."
        ],
        "bullets": [
          "Norma técnica: Define procedimentos de medição e categorias de defeitos de imagem em ecrãs.",
          "Tipos de defeitos: Estandardiza o Tipo 1 (píxeis brilhantes), Tipo 2 (escuros) e Tipo 3 (subpíxeis).",
          "Classes escalonadas: Estipula tolerâncias por milhão de píxeis desde a Classe 0 (zero defeitos) até à Classe III.",
          "Âmbito qualitativo: Serve de referência industrial, não criando por si só um direito legal automático a devoluções."
        ]
      },
      {
        "title": "A norma ISO NÃO significa substituição ou reembolso automáticos",
        "content": [
          "Existe o equívoco frequente entre consumidores de que encontrar defeitos de píxeis acima de determinada classe ISO confere automaticamente o direito à substituição imediata ou devolução integral do valor pago.",
          "A ISO 9241-307 é uma estrutura técnica de classificação e avaliação e não cria em si mesma uma obrigação universal de substituição ou reembolso. Um padrão técnico internacional não possui força coerciva direta sobre contratos de venda particulares.",
          "Os fabricantes podem citar classes ISO nas fichas técnicas para ilustrar parâmetros de produção, mas o direito à garantia é regido exclusivamente pelos termos contratuais redigidos pelo fabricante. A menos que uma lei de consumo ou cláusula contratual expressa vincule a transação a estes valores, a menção a números ISO não basta para forçar um RMA.",
          "A resolução de qualquer caso depende de quatro camadas independentes: o referencial técnico (ISO 9241-307), a garantia comercial do fabricante (RMA), a política de devolução do vendedor e os direitos legais do consumidor."
        ],
        "bullets": [
          "Sem direito automático: Cumprir ou ultrapassar uma classe ISO não gera direito automático a reembolso ou substituição.",
          "Primazia do contrato: A garantia é regulada pelos termos escritos do fabricante, não por normas ISO genéricas.",
          "Quatro camadas distintas: Separe norma ISO, garantia de marca, política de loja e legislação de consumo.",
          "Referência de engenharia: As marcas citam normas ISO como guia de projeto, sem as adotar como critério incondicional de RMA."
        ]
      },
      {
        "title": "Garantia do fabricante e processos RMA",
        "content": [
          "As garantias voluntárias do fabricante são compromissos contratuais que regem a reparação, assistência ou substituição do produto durante um período pós-venda estipulado.",
          "Para tratar defeitos de píxeis, as marcas estabelecem políticas próprias de Autorização de Devolução de Mercadoria (RMA). Estas regras variam consideravelmente entre marcas, gamas de produtos e regiões do mundo. Por exemplo, ecrãs topo de gama para criadores ou jogadores podem incluir garantia 'Zero Bright Dot' (ZBD) durante um período inicial, ao passo que modelos básicos da mesma marca toleram vários subpíxeis escuros.",
          "Os critérios costumam distinguir pontos brilhantes (muito incómodos em imagens escuras) de pontos escuros, avaliando também a posição do defeito (se incide no quadrante central ou em agrupamentos de píxeis próximos).",
          "Para abrir um pedido de RMA é geralmente necessário apresentar provas claras (fotografias nítidas e fatura de compra). A documentação oficial do fabricante é a única fonte vinculativa para conhecer os termos aplicáveis."
        ],
        "bullets": [
          "Diversidade de políticas: Cada fabricante estabelece de forma autónoma os seus limites, prazos e condições.",
          "Ponderação de anomalias: Píxeis brilhantes têm frequentemente regras muito mais rigorosas do que píxeis escuros.",
          "Critério de localização: Certas garantias apenas cobrem defeitos situados na área central do ecrã.",
          "Fonte vinculativa: Consulte sempre a documentação oficial da marca correspondente ao seu modelo específico."
        ]
      },
      {
        "title": "Políticas de devolução e troca das lojas",
        "content": [
          "Em muitas compras de tecnologia, a política de troca ou devolução do comerciante representa uma solução muito mais ágil e acessível do que recorrer ao processo de garantia RMA da marca.",
          "As lojas costumam disponibilizar um período de desistência ou satisfação após a entrega do produto. Durante esse intervalo, o comprador pode frequentemente devolver ou trocar um monitor cujo aspeto visual não lhe agrade, independentemente de os píxeis atingirem ou não os limites de RMA do fabricante.",
          "Contudo, cada loja define livremente as suas condições de venda. Os prazos de devolução diferem bastante consoante a loja, o tipo de produto e o canal (compra online ou loja física); não existe um número universal de dias. Além disso, podem existir regras sobre embalagens abertas ou acessórios originais.",
          "Dado que os prazos de devolução comercial são rigorosamente contabilizados por datas de calendário, inspecionar o monitor logo ao retirá-lo da caixa é fundamental para preservar esta flexibilidade."
        ],
        "bullets": [
          "Via comercial ágil: Os prazos da loja permitem trocas sem a obrigação de provar uma avaria técnica de garantia.",
          "Sem prazo universal: Os períodos de devolução variam consoante o comerciante e o país; confirme sempre a sua fatura.",
          "Estado do equipamento: A embalagem original completa e todos os cabos são habitualmente exigidos para devolução.",
          "Inspeção imediata: Testar o ecrã logo após a receção garante a salvaguarda de todas as opções de devolução."
        ]
      },
      {
        "title": "Direitos legais do consumidor e legislação aplicável",
        "content": [
          "Para além das garantias comerciais facultativas dos fabricantes e das regras de troca das lojas, todas as transações de consumo estão protegidas pela legislação de defesa do consumidor de cada jurisdição.",
          "Em vários países e blocos económicos, as garantias legais asseguram que os bens vendidos estão conformes com o contrato e aptos para a utilização normal. Nestes regimes, o comprador pode ter direito a reparação, troca ou resolução do contrato perante o vendedor caso o artigo manifeste uma falta de conformidade substancial, independentemente do que constar na garantia voluntária do fabricante.",
          "No entanto, as normas de consumo diferem sensivelmente de país para país. A resolução prática de cada caso depende da lei aplicável, da qualidade de consumidor particular ou profissional e do enquadramento judicial de defeito material.",
          "O Screen Tester é uma ferramenta técnica informativa e não presta aconselhamento jurídico. Se enfrentar um litígio comercial não resolvido, contacte os organismos públicos de defesa do consumidor ou juristas competentes da sua região."
        ],
        "bullets": [
          "Garantias legais: Os direitos legais de conformidade aplicam-se independentemente da garantia do fabricante.",
          "Princípio da conformidade: Leis nacionais protegem o comprador caso o bem apresente defeitos substanciais.",
          "Diferenças territoriais: Prazos e regras variam amplamente em função da jurisdição de compra.",
          "Sem valor de assessoria: O Screen Tester fornece dados técnicos; questões legais devem ser colocadas a entidades competentes."
        ]
      },
      {
        "title": "Em que é que o Screen Tester pode (e não pode) ajudar",
        "content": [
          "O Screen Tester proporciona uma plataforma web acessível para apoiar a identificação metódica, a análise visual e o registo de anomalias de imagem em ecrãs de computador e dispositivos móveis.",
          "O Screen Tester ajuda a: (1) apresentar padrões de cor controlados através do [Teste de Píxeis Mortos](/tests/dead-pixel-test) e do [Teste de Píxeis Presos](/tests/stuck-pixel-test); (2) detetar anomalias visuais em cores primárias e de contraste; (3) diferenciar píxeis mortos, presos e agrupados; (4) registar notas de inspeção; (5) organizar as verificações com o nosso [Guia de Inspeção de Monitores Novos](/guides/new-monitor-inspection-return-window), a [Lista de Verificação para Monitores Usados](/guides/used-monitor-inspection-checklist) e o [Conjunto de Inspeção de Monitores](/monitor-inspection); e (6) testar a reativação com o [Fixador de Píxeis Presos](/tests/stuck-pixel-fixer).",
          "Em contrapartida, o Screen Tester NÃO PODE: (1) certificar conformidade com a norma ISO 9241-307; (2) medir tensões ou microcircuitos TFT a nível físico; (3) garantir que um monitor cumpre a garantia de uma marca específica; (4) determinar judicialmente uma falta de conformidade legal; ou (5) assegurar aprovação de RMA ou devolução de dinheiro.",
          "Mantemos uma transparência total ao separar com clareza o que é observado pelo utilizador das especificações de engenharia e das normas legais."
        ],
        "bullets": [
          "Capacidades: Exibir campos de cores sólidas, assinalar anomalias, registar notas e testar ciclagens de cor.",
          "Sem certificação: Não inspeciona semicondutores, não emite certificados ISO nem valida garantias comerciais.",
          "Sem efeito vinculativo: Não garante aceitação de pedidos de RMA nem determina soluções jurídicas.",
          "Vocabulário rigoroso: Distingue com rigor os padrões de teste das especificações físicas e regras legais."
        ]
      },
      {
        "title": "Lista de verificação para provas e documentação",
        "content": [
          "Caso detete um defeito persistente e pretenda contactar o comerciante ou o fabricante, dispor de documentação organizada simplifica consideravelmente a resposta do suporte:",
          "1. Identificação do equipamento: Anote o modelo exato, a revisão de hardware e o número de série (guarde o número de série para o suporte oficial; não o publique em fóruns públicos da internet).",
          "2. Comprovativos de compra: Guarde a fatura com data, o comprovativo de encomenda e a guia de entrega.",
          "3. Consulta de prazos: Tenha à mão o prazo limite de devolução da loja e a tabela oficial de píxeis do fabricante relativa ao seu modelo.",
          "4. Diário de inspeção: Indique data, iluminação do espaço, resolução utilizada e localização aproximada da anomalia (centro ou extremidades).",
          "5. Registo de cores: Documente em que cores de fundo o defeito se torna visível e em que tons ele fica disfarçado.",
          "6. Registo fotográfico: Tire fotografias macro nítidas do defeito em fundos de cor uniforme, combinadas com uma fotografia ampla do monitor completo para situar a sua localização no ecrã.",
          "AVISO DE PRIVACIDADE: Ao submeter imagens ou comprovativos ao suporte, oculte sempre os seus dados pessoais sensíveis, como morada residencial, telefone, dados do cartão de pagamento e palavras-passe."
        ],
        "bullets": [
          "Identificação: Anote modelo e número de série de forma confidencial para os canais de apoio oficiais.",
          "Documentos: Conserve faturas de compra, comprovativos de envio e prazos de desistência da loja.",
          "Fotografias: Tire uma foto aproximada do píxel acompanhada de uma imagem geral do ecrã completo.",
          "Privacidade: Oculte dados bancários, números de telefone e dados de morada antes de partilhar ficheiros."
        ]
      },
      {
        "title": "O que fazer após encontrar um defeito de píxel: Modelo de decisão",
        "content": [
          "Ao inspecionar o seu monitor com o Screen Tester, adote este fluxo estruturado e não vinculativo para escolher a melhor opção:",
          "OBSERVAÇÃO → Confirmar a anomalia visual com vários padrões de teste → DOCUMENTAR → Verificar prazo de devolução da loja → Consultar termos de garantia/RMA do fabricante → Confirmar direitos legais do consumidor → Escolher a via mais adequada.",
          "Classifique o estado do equipamento de acordo com a nossa terminologia padrão:",
          "• Parece normal: O painel responde de forma equilibrada em todos os campos RGB, branco e preto, sem pontos escuros nem píxeis acesos permanentemente.",
          "• Requer atenção: Nota-se um ponto escuro ou subpíxel colorido em um ou mais fundos. O defeito deve ser registado e comparado com os critérios de devolução ou garantia.",
          "• Incerto: Observa-se um pequeno resíduo que muda de posição ao mover a cabeça ou se parece com pó. Limpe o ecrã com um pano de microfibra e repita o teste.",
          "Se a avaliação indicar 'Requer atenção', confira primeiro se ainda está dentro do prazo de devolução da loja. Caso esse prazo tenha terminado, consulte os critérios de RMA do fabricante. Em situações de conflito, avalie as vias legais de consumo locais."
        ],
        "bullets": [
          "Fluxo: Observação → Confirmação cromática → Documentação → Prazo da loja → Critérios RMA → Ação.",
          "Parece normal: Apresentação equilibrada e sem falhas em todos os fundos de inspeção.",
          "Requer atenção: Anomalias pontuais contínuas confirmadas em diferentes cores de teste.",
          "Incerto: Suspeita de poeira exterior; limpe com cuidado o painel e confirme sob outros ângulos."
        ]
      },
      {
        "title": "Dúvidas e erros comuns sobre defeitos de píxeis",
        "content": [
          "Esclarecer falsas ideias ajuda a tomar decisões realistas e sem desilusões:",
          "Mito 1: 'Um único píxel morto dá sempre direito a troca.' Realidade: Salvo em modelos com garantia explícita de zero defeitos ou trocas dentro do período de devolução da loja, a maioria das garantias de fábrica exige múltiplos defeitos para abrir um processo RMA.",
          "Mito 2: 'A norma ISO garante um painel sem qualquer defeito.' Realidade: A ISO 9241-307 prevê tolerâncias aceitáveis para cada classe; não assegura a perfeição absoluta do ecrã.",
          "Mito 3: 'A garantia do fabricante e a devolução da loja são a mesma coisa.' Realidade: A devolução é uma política comercial do vendedor de curta duração; a garantia é um compromisso da marca ao longo de vários anos.",
          "Mito 4: 'O prazo de devolução é sempre de 14 dias.' Realidade: Os prazos diferem bastante entre comerciantes, países, categorias de artigos e modalidades de compra (online vs. presencial); não há um prazo universal.",
          "Mito 5: 'O Screen Tester pode demonstrar uma violação da norma ISO.' Realidade: O Screen Tester exibe padrões no navegador para análise humana; não realiza medições óticas laboratoriais certificadas.",
          "Mito 6: 'Uma fotografia prova por si só a elegibilidade para a garantia.' Realidade: As fotos são úteis para triagem, mas os fabricantes avaliam os pedidos com base nas suas próprias grelhas de defeitos e vistorias técnicas.",
          "Mito 7: 'Qualquer píxel preso pode ser reparado através de software.' Realidade: O ciclar veloz de cores pode desbloquear moléculas de cristais líquidos presas, mas não conserta transístores partidos nem pistas elétricas danificadas."
        ],
        "bullets": [
          "Defeito único: Um píxel morto raramente garante substituição em garantias normais sem cláusula de zero defeitos.",
          "Tolerâncias ISO: A norma estabelece margens admissíveis de produção sem prometer ecrãs perfeitos.",
          "Níveis autónomos: Prazos de loja e termos de marcas funcionam sob lógicas completamente distintas.",
          "Prazos diversos: As devoluções variam entre comerciantes e modalidades sem um padrão fixo internacional.",
          "Limitações técnicas: Ferramentas de cor auxiliam cristais lentos, não circuitos danificados."
        ]
      }
    ],
    "faq": [
      {
        "question": "Ter um único píxel morto dá-me direito a substituição imediata?",
        "answer": "Pela garantia do fabricante, geralmente não. A generalidade das garantias padrão tolera um pequeno número de subpíxeis anómalos antes de permitir a substituição por RMA, salvo se o monitor tiver garantia 'Zero Bright Dot'. No entanto, se estiver dentro do prazo de devolução da loja, a troca costuma ser simples e sem necessidade de justificação técnica."
      },
      {
        "question": "Qual é a diferença entre um píxel preso e um píxel morto?",
        "answer": "Um píxel morto não recebe energia elétrica e fica continuamente preto em fundos claros. Um píxel preso (stuck pixel) permanece energizado e brilha sem parar em vermelho, verde ou azul sobre fundos escuros."
      },
      {
        "question": "As ferramentas web como o Fixador de Píxeis podem danificar o meu ecrã?",
        "answer": "Não. O [Fixador de Píxeis Presos](/tests/stuck-pixel-fixer) limita-se a alternar padrões de cor a ritmo acelerado através do navegador. Não modifica as tensões físicas nem força os componentes do monitor. No entanto, pessoas com sensibilidade a luzes intermitentes não devem olhar diretamente para o ecrã durante a execução."
      },
      {
        "question": "Porque é que uma captura de ecrã (print screen) não mostra o píxel morto?",
        "answer": "Uma captura de ecrã regista a imagem digital processada na placa gráfica antes de ser transmitida ao monitor. Como o defeito de píxel é uma anomalia física da matriz do ecrã, ele não existe no ficheiro digital da imagem. Só pode ser fotografado externamente com uma câmara ou telemóvel."
      },
      {
        "question": "Qual é a diferença entre uma classe ISO 9241-307 e a garantia do fabricante?",
        "answer": "A ISO 9241-307 é uma norma técnica internacional com critérios de medição e definições teóricas de anomalias para ecrãs. A garantia do fabricante é um acordo contratual comercial celebrado entre a marca e o consumidor que determina os critérios específicos de assistência e substituição por RMA."
      },
      {
        "question": "Devo contactar a loja ou o fabricante em primeiro lugar ao detetar um píxel anómalo?",
        "answer": "Verifique primeiro o prazo de devolução ou troca da loja. Se ainda estiver dentro desse intervalo, o vendedor oferece habitualmente a solução mais expedita. Caso o prazo tenha terminado, consulte a tabela de garantia do fabricante para averiguar se o defeito autoriza um processo RMA."
      },
      {
        "question": "A norma ISO 9241-307 obriga legalmente ao reembolso ou substituição do ecrã?",
        "answer": "Não. A ISO 9241-307 é uma norma técnica de classificação de qualidade ergonómica. Não institui um direito legal automático a devoluções ou substituições. Os direitos efetivos dependem da garantia da marca, das políticas da loja e da legislação de proteção ao consumidor em vigor."
      },
      {
        "question": "Existe um prazo de devolução universal (como 14 ou 30 dias) para monitores?",
        "answer": "Não. Os prazos de devolução diferem substancialmente consoante o comerciante, o canal de compra (online ou físico), a tipologia do produto e o país. Não existe uma duração universal. Consulte a data limite discriminada no talão de compra ou na área de cliente da loja."
      }
    ],
    "relatedTestIds": [
      "dead-pixel-test",
      "stuck-pixel-test",
      "stuck-pixel-fixer"
    ],
    "relatedTroubleshootingIds": [
      "dead-stuck-bright-pixel"
    ],
    "relatedArticleSlugs": [
      "oled-burn-in-and-image-retention",
      "display-uniformity",
      "backlight-bleed-vs-ips-glow"
    ],
    "primarySearchIntent": "dead pixel vs stuck pixel ISO warranty and return policy",
    "readingTimeMinutes": 12
  },
  {
    "slug": "backlight-bleed-vs-ips-glow",
    "category": "display-problems",
    "title": "Fugas de luz (Backlight Bleed) vs. IPS Glow: Como distinguir a diferença",
    "subtitle": "Tensão do aro, geometria de painéis curvos, birrefringência de cristais líquidos e diagnóstico em sala escura.",
    "description": "Saiba distinguir fugas de luz de IPS glow, compreenda o impacto dos ângulos de visão e da curvatura na perceção visual e como verificar ambos em sala escura.",
    "directAnswer": "A fuga de luz (backlight bleed) é um escape físico de iluminação junto ao aro do monitor que permanece fixo independentemente do ângulo de visualização, enquanto o IPS glow e o brilho angular são características óticas que mudam de posição e intensidade com o movimento do utilizador.",
    "whyItMatters": "Confundir o brilho angular normal em ecrãs planos ou curvos com um defeito de fabrico resulta frequentemente em devoluções desnecessárias, obtendo-se um equipamento de substituição com comportamento ótico idêntico. Já as fugas mecânicas genuínas por aperto excessivo do aro degradam permanentemente o contraste em ambientes escuros. Compreender como a curvatura e a distância de visualização afetam as extremidades permite documentar anomalias com total rigor.",
    "whatToLookFor": [
      "Fuga de luz (Backlight Bleed): Áreas esbranquiçadas ou amareladas intensas junto ao aro que permanecem estáticas mesmo quando o utilizador se desloca",
      "IPS Glow: Brilho difuso prateado, dourado ou arroxeado nos cantos que desliza ou desaparece ao olhar perpendicularmente para esse canto",
      "Brilho perimétrico em ecrãs curvos: Claridade difusa concentrada nos extremos laterais ao sentar-se fora do raio focal nominal",
      "Desvio de gama em painéis VA: Clareamento de tons escuros e desbotamento de cor ao observar painéis VA curvos ou planos a partir de ângulos oblíquos",
      "Pontos de pressão no aro: Fugas nítidas em forma de tocha concentradas junto a parafusos, fixadores do chassis ou uniões do quadro"
    ],
    "howToTest": [
      "Execute o teste de noite numa sala completamente às escuras, eliminando luzes e reflexos diretos",
      "Ajuste o brilho OSD do monitor para um nível SDR confortável e habitual, em vez de uma configuração extrema (evite forçar o brilho no máximo, a menos que esse seja o seu ambiente de trabalho padrão).",
      "Abra o [Teste de fuga de luz](/tests/backlight-bleed-test) no Screen Tester para exibir um fundo preto digital integral",
      "Sente-se à distância do raio de curvatura especificado (ex.: ~1,0 m para 1000R) com os olhos alinhados ao centro do ecrã",
      "Faça o teste de movimento de cabeça: incline-se e olhe diretamente para o canto; se o brilho desaparecer, é resplendor ótico",
      "Afaste-se 2 a 3 metros: o brilho angular ótico dissipa-se substancialmente à distância, enquanto a fuga física permanece no aro"
    ],
    "whatScreenTesterCanObserve": [
      "Apresentação de cores de teste definidas, incluindo fundos pretos digitais puros (RGB 0, 0, 0) em superfícies planas e curvas",
      "Diferenciação visual entre fugas localizadas fixas e brilho angular mediante a deslocação da cabeça",
      "Mira central opcional para validar o alinhamento perpendicular no raio focal do ecrã",
      "Fundos cinzentos escuros escalonados (1% a 5%) para inspecionar a uniformidade do nível de preto percebido",
      "Anomalias visuais assinaladas pelo utilizador, variações de distância e notas de inspeção em sala escura"
    ],
    "whatScreenTesterCannotDetermine": [
      "Luminância física em candelas por metro quadrado (cd/m² ou nits) ou rácios de contraste absolutos",
      "Binário de aperto dos parafusos do chassis, pressão do aro ou tolerâncias físicas de curvatura",
      "Atraso ótico matemático, ângulos de desfasamento dos cristais líquidos ou eficiência dos filtros polarizadores",
      "Distinção entre deformação física do vidro e fuga de polarização sem movimento físico do observador",
      "Critérios de garantia do fabricante, elegibilidade de RMA ou políticas de devolução dos revendedores"
    ],
    "commonCauses": [
      "Fuga de luz: Pressão de aperto excessiva durante a montagem em fábrica que comprime a periferia do painel",
      "Fuga de luz: Dilatação térmica que deforma a placa guia de luz (LGP) ou a moldura durante uso contínuo",
      "IPS Glow: Birrefringência ótica natural dos cristais líquidos com orientação horizontal sob tecnologia IPS",
      "Geometria de curvatura: Sentar-se substancialmente mais perto do que o raio de curvatura projetado, forçando as bordas periféricas a serem vistas em ângulos bastante oblíquos.",
      "Desvio de gama em VA curvo: Transmissão luminosa oblíqua através dos cristais verticais que aclara tons escuros nas extremidades"
    ],
    "whatToDoNext": [
      "Posicione sua distância de visualização próxima ao raio focal de curvatura do monitor para minimizar ângulos oblíquos periféricos.",
      "Introduza uma iluminação ambiente suave e neutra atrás do monitor (iluminação de fundo/bias lighting) para reduzir a dilatação da pupila no escuro e aprofundar o contraste percebido sem criar reflexos diretos na tela.",
      "Verifique a uniformidade com o [Teste de uniformidade](/tests/uniformity-test) em cinzentos escuros e consulte o [Guia de ângulos de visão](/guides/monitor-viewing-angles-explained)",
      "Se detetar tochas amareladas ou brancas intensas que permanecem fixas quando vistas de frente a 2 metros, solicite a troca ao revendedor"
    ],
    "sections": [
      {
        "title": "Mecânica física da fuga de luz: Compressão do aro vs. Birrefringência ótica",
        "content": [
          "Os ecrãs LCD não produzem luz própria. Seja através de iluminação periférica (Edge-LED) ou direta (Direct-LED), o feixe luminoso tem de percorrer um conjunto complexo de refletores, placas difusoras, prismas de ganho, filtros polarizadores e o substrato de cristais líquidos.",
          "A fuga de luz (backlight bleed) é uma imperfeição mecânica. Quando o aro ou as fixações exercem pressão irregular sobre o bordo do painel, a estrutura é comprimida. Esta deformação abre microaberturas por onde a luz escapa sem qualquer modulação, projetando fachos estáticos esbranquiçados ou amarelados.",
          "Em contrapartida, o IPS Glow é uma propriedade física decorrente da orientação horizontal dos cristais nos painéis In-Plane Switching. Em linha reta (90°), os cristais bloqueiam a luz com eficácia. No entanto, quando a luz incide em ângulos oblíquos, surge um ligeiro atraso de fase (birrefringência), deixando transparecer uma claridade difusa prateada ou dourada para observadores fora do eixo."
        ],
        "bullets": [
          "A fuga de luz é um defeito de montagem; a luz escapa sem ser modulada pelos cristais.",
          "O IPS glow é uma característica ótica natural em cristais com alinhamento horizontal.",
          "As fugas ficam fixas no aro; o glow desloca-se pelo ecrã conforme a cabeça se move."
        ]
      },
      {
        "title": "Ecrãs curvos: Geometria de observação e ângulo ótico de incidência",
        "content": [
          "Os monitores curvos são fabricados com um raio de curvatura específico (1000R, 1500R, 1800R), onde o valor representa o raio de um círculo em milímetros (1000R = 1,0 metro). A sua finalidade ergonómica é manter uma distância equidistante dos olhos até aos vários pontos de um painel panorâmico.",
          "Todavia, a curvatura altera os ângulos de incidência da luz. Se o utilizador se sentar exatamente no centro focal (a 1,0 m num painel 1000R), a linha de visão alcança o centro e as abas laterais quase perpendicularmente. Se se sentar demasiado perto (ex.: a 50 cm de um painel 1800R) ou fora do centro, as laterais ficam orientadas em ângulos acentuadamente oblíquos.",
          "Esta alteração geométrica modifica a perceção da uniformidade. Em ecrãs IPS curvos, sentar-se demasiado perto acentua o brilho percebido nos cantos. Importa sublinhar que a curvatura em si não causa fugas mecânicas; apenas altera a geometria com que os raios oblíquos incidem na retina."
        ],
        "bullets": [
          "O valor de curvatura (1000R, 1500R, 1800R) define a distância focal ideal em milímetros.",
          "Sentar-se fora do raio focal sujeita as margens do ecrã a ângulos de visualização rasantes.",
          "A curvatura altera a geometria visual, mas não produz fugas mecânicas por si própria."
        ]
      },
      {
        "title": "Distinguir fugas mecânicas de resplendor angular em ecrãs curvos",
        "content": [
          "Para identificar se uma zona clara num ecrã curvo constitui um defeito coberto por garantia ou mero brilho angular, utiliza-se o teste de paralaxe por deslocação da cabeça.",
          "Passo 1: Apague as luzes da divisão e projete um fundo preto com o [Teste de fuga de luz](/tests/backlight-bleed-test). Observe as zonas claras a partir da sua posição habitual.",
          "Passo 2: Mova a cabeça devagar para os lados e na vertical. Se a mancha luminosa deslizar sobre o painel, alterar a sua tonalidade ou atenuar-se, trata-se de brilho ótico angular.",
          "Passo 3: Posicione o olhar de forma rigorosamente perpendicular (a 90°) face ao canto suspeito. Se a claridade se dissipar por completo ao olhar de frente, o painel cumpre as tolerâncias normais. Se um feixe branco ou amarelado persistir agarrado ao aro mesmo olhando de frente a 2 metros, trata-se de fuga mecânica genuína."
        ],
        "bullets": [
          "Teste de paralaxe: Repare se o brilho se move ou se permanece fixo no bordo.",
          "Verificação perpendicular: Se a claridade sumir ao olhar de frente, é resplendor ótico.",
          "Identificação de fugas: Fachos estáticos concentrados junto ao chassis indicam compressão mecânica."
        ]
      },
      {
        "title": "Comparação de arquiteturas de painel em ecrãs curvos: IPS, VA, TN e OLED",
        "content": [
          "As várias tecnologias de ecrã exibem reações distintas quando encurvadas. A avaliação das anomalias deve considerar a tecnologia empregue:",
          "IPS: Proporciona fidelidade de cor exemplar. Porém, como os cristais estão em repouso horizontal, os ecrãs IPS curvos revelam um brilho perimétrico quando não se observa do ponto focal exato. A inclusão de polarizadores A-TW atenua o efeito, mas restringe-se a monitores profissionais.",
          "VA: O alinhamento vertical dos cristais confere contrastes nativos elevados (3.000:1 a 5.000:1) e pretos profundos com mínimo brilho parasita. Como os painéis VA sofrem de desvio de gama em ângulo, os fabricantes encurvam painéis grandes para manter as extremidades perpendiculares aos olhos, contendo a perda de saturação perimétrica.",
          "TN: É veloz mas apresenta ângulos reduzidos com inversão cromática na vertical; praticamente não existe em monitores curvos modernos.",
          "Diodo Emissor de Luz Orgânico (OLED): Arquitetura autoemissiva em que cada subpixel se ilumina de forma independente. As telas OLED apresentam pretos puros e profundos com o desligamento individual de subpixels, com zero vazamento de luz e zero IPS glow, tanto em superfícies planas quanto curvas. Monitores OLED curvos mantêm excelente contraste em ângulos amplos, embora revestimentos antirreflexo possam introduzir leves desvios de tonalidade em ângulos muito rasantes."
        ],
        "bullets": [
          "IPS: Elevada precisão cromática com resplendor angular característico em fundos escuros.",
          "VA: Contraste elevado (3.000:1+); a curvatura neutraliza o desvio de gama nas extremidades.",
          "TN: Ângulos restritos com inversão de cor; tecnologia desfasada em ecrãs curvos.",
          "OLED: Píxeis autoemissivos eliminam em definitivo tanto as fugas de luz como o IPS glow."
        ]
      },
      {
        "title": "Protocolo de inspeção em sala escura para monitores curvos",
        "content": [
          "Avaliar com rigor a distribuição de luz num ecrã curvo exige um método disciplinado para afastar enganos causados por iluminação imprópria:",
          "1. Controlo da luz ambiente: Desligue luzes de teto e candeeiros. A concavidade do ecrã concentra as luzes situadas atrás do observador, refletindo-as como faixas alongadas de encandeamento.",
          "2. Alinhamento no raio focal: Sente-se à distância definida pela curvatura (1000R = 1,0 m; 1500R = 1,5 m) e nivele os olhos pela linha média da tela.",
          "3. Normalização de brilho: Ajuste o brilho OSD do monitor para um nível SDR confortável e habitual, adequado ao seu ambiente. Avaliar a tela com brilho máximo em escuridão total exagera de forma irreal vazamentos de luz e o brilho óptico.",
          "4. Executar o Screen Tester: Execute o [Teste de Vazamento de Luz](/tests/backlight-bleed-test) para inspeção em tela preta e alterne pelos campos cinza-escuro no [Teste de Uniformidade](/tests/uniformity-test) para avaliar a distribuição de luminância. Inspecione a estabilidade das cores sob diferentes ângulos com o [Teste de Ângulo de Visão](/tests/viewing-angle-test) e nosso [Guia de Ângulos de Visão](/guides/monitor-viewing-angles-explained)."
        ],
        "bullets": [
          "Elimine a iluminação ambiente para não confundir reflexos na concavidade com defeitos de tela.",
          "Sente-se à distância focal exata correspondente à curvatura (1000R, 1500R ou 1800R).",
          "Ajuste o brilho para um nível SDR confortável e habitual, em vez de forçar a luminância máxima do painel.",
          "Utilize padrões cinza-escuro para distinguir pontos de pressão da moldura de gradientes amplos do painel."
        ]
      },
      {
        "title": "Documentação de anomalias e procedimentos de garantia",
        "content": [
          "Se a inspeção evidenciar anomalias consistentes com fugas mecânicas, reunir documentação objetiva acelerará o contacto com a loja ou marca:",
          "Documentação fotográfica opcional: A observação visual direta é o padrão fundamental para avaliação da tela, pois fotos não substituem a visão humana — a faixa dinâmica do sensor, o mapeamento de tons automático, o balanço de branco e o processamento de imagem alteram significativamente a aparência visual. Se for tirar fotos para suporte ou comparação, manter configurações de exposição consistentes entre as fotos facilita a comparação. Utilize controles manuais para evitar a superexposição do modo noturno automático e ajuste a prévia para que se aproxime do que você observa diretamente.",
          "Registo em múltiplos ângulos: Tire uma fotografia geral a partir do ponto focal e uma fotografia próxima perpendicular ao canto suspeito. Se o feixe de luz se mantiver nítido de frente, terá um elemento de prova forte de compressão do aro.",
          "Garantia vs. Período de devolução: As marcas costumam considerar o brilho angular dentro das tolerâncias aceitáveis. Caso o resultado cause desconforto, recorrer ao prazo inicial de devolução da loja é a solução mais célere. Consulte o nosso [Guia de resolução de problemas](/knowledge-base/troubleshooting)."
        ],
        "bullets": [
          "Ajuste a exposição do telemóvel manualmente para não gerar claridade artificial exagerada.",
          "Capte fotografias gerais no centro focal e planos de pormenor perpendiculares ao canto.",
          "O direito de livre resolução na loja costuma ser mais expedito do que processos formais de RMA.",
          "Consulte o [Guia de resolução de problemas](/knowledge-base/troubleshooting) do Screen Tester."
        ]
      }
    ],
    "faq": [
      {
        "question": "A curvatura do ecrã provoca fugas de luz por si própria?",
        "answer": "Não. A curvatura em si não é causa de fugas de luz. Estas decorrem de tensões mecânicas ou aperto desajustado do aro. Contudo, a curvatura altera os ângulos de visualização periféricos quando o utilizador se senta fora do ponto focal, tornando o resplendor ótico natural mais percetível aos olhos."
      },
      {
        "question": "Porque parecem os cantos do meu ecrã curvo brilhar quando me sento perto?",
        "answer": "Ao sentar-se substancialmente mais perto do que o raio de curvatura projetado, sua linha de visão atinge as bordas externas em ângulos oblíquos acentuados. Em painéis IPS, isso provoca birrefringência óptica (IPS glow). Afastar-se em direção à distância focal recomendada restabelece um ângulo de visão mais perpendicular e reduz visivelmente o brilho nos cantos."
      },
      {
        "question": "Porque usam os monitores de jogos curvos maioritariamente painéis VA em vez de IPS?",
        "answer": "Os painéis VA têm contrastes nativos muito elevados (3.000:1 a 5.000:1) com pretos profundos e quase nulo resplendor no escuro. Adicionalmente, como os painéis VA sofrem de desvio de gama lateral, curvar o ecrã mantém as extremidades perpendiculares à vista, contendo a perda de saturação perimétrica."
      },
      {
        "question": "Como fotografar fugas de luz sem que a câmara do telemóvel as sobre-exponha?",
        "answer": "Registros fotográficos são opcionais e não substituem a inspeção visual direta, pois sensores de câmera, curvas de exposição e algoritmos de pós-processamento distorcem a luminância percebida. Evite modos noturnos automáticos que produzem fotos superexpostas. Se sua câmera tiver controles manuais, mantenha a exposição constante e ajuste a imagem para que se assemelhe ao que você observa no cômodo."
      },
      {
        "question": "O Screen Tester consegue medir o rácio de contraste físico ou nits do meu monitor?",
        "answer": "Não. O Screen Tester funciona no navegador e projeta telas de teste digitais geridas pelo sistema operativo. Os navegadores não acedem a sensores óticos nem a colorímetros, sendo incapazes de quantificar nits ou rácios de contraste reais. O utilitário fornece padrões padronizados para inspeção visual humana."
      }
    ],
    "relatedTestIds": [
      "backlight-bleed-test",
      "uniformity-test",
      "viewing-angle-test",
      "display-info",
      "black-level-test"
    ],
    "relatedTroubleshootingIds": [
      "backlight-bleed-ips-glow",
      "uneven-brightness"
    ],
    "relatedArticleSlugs": [
      "black-levels-and-shadow-detail",
      "display-uniformity",
      "refresh-rate-and-frame-rates"
    ],
    "primarySearchIntent": "backlight bleed vs ips glow difference test",
    "readingTimeMinutes": 8
  },
  {
    "slug": "monitor-ghosting-and-motion-blur",
    "category": "display-problems",
    "title": "Ghosting do monitor, desfoque de movimento e overshoot de overdrive",
    "subtitle": "Smearing em níveis escuros em painéis VA, ajuste de overdrive, halos de ghosting inverso e persistência de movimento.",
    "description": "Entenda por que monitores VA apresentam smearing em tons escuros, como o overdrive agressivo causa halos brilhantes ou ghosting inverso e como diagnosticar artefatos de movimento visualmente.",
    "directAnswer": "O ghosting do monitor é um rastro visual residual causado pela lentidão das transições dos cristais líquidos, particularmente em transições de tons escuros a escuros em painéis VA. Por outro lado, o overshoot de overdrive (ghosting inverso) gera halos brilhantes ou escuros (coroas) quando uma voltagem excessiva impulsiona os cristais além de sua luminância alvo.",
    "whyItMatters": "O ajuste de overdrive é um equilíbrio essencial de engenharia: pouca aceleração de voltagem resulta em transições lentas e arrasto escuro (smearing), enquanto um overdrive excessivo ultrapassa o tom pretendido, gerando coroas brilhantes incômodas. Atingir a nitidez ideal requer balancear essas forças conforme a taxa de atualização e a temperatura operacional.",
    "whatToLookFor": [
      "Rastros escuros ou manchas roxas/pretas atrás de elementos gráficos escuros em movimento sobre fundos cinza-escuro ou médios (smearing escuro característico de painéis VA)",
      "Halos brilhantes brancos ou de cores invertidas (coroas) contornando objetos em movimento (overshoot de overdrive / ghosting inverso)",
      "Silhuetas tênues com a cor original do objeto sem bordas brilhantes (ghosting GtG convencional por transições lentas)",
      "Desfoque uniforme em toda a cena durante o movimento provocado pela persistência retiniana humana em telas sample-and-hold (MPRT)",
      "Alterações no comprimento do rastro ou surgimento súbito de coroas de overshoot em taxas de atualização menores ou quedas de taxa de quadros em VRR",
      "Saltos de quadros ou engasgos (stuttering) decorrentes da entrega de quadros pela GPU e não do tempo de resposta físico do painel"
    ],
    "howToTest": [
      "Abra o [Teste de ghosting](/tests/ghosting-test) no Screen Tester e observe os blocos em movimento contra fundos de alto contraste e cinza-escuro.",
      "Alterne entre velocidades baixa, média e alta para verificar como o comprimento do rastro varia com a velocidade.",
      "Abra o menu OSD do monitor e localize o ajuste de Overdrive / Tempo de resposta (consulte nosso [Guia de configurações OSD do monitor](/guides/monitor-osd-settings-explained)).",
      "Passe sistematicamente por cada nível de overdrive (ex.: Desligado, Normal, Rápido, Extremo); identifique a opção que atenua o rastro sem gerar halos brilhantes.",
      "Inicie o [Teste de desfoque de movimento](/tests/motion-blur-test) para distinguir a persistência ocular (sample-and-hold) dos atrasos físicos dos cristais líquidos.",
      "Se utilizar G-Sync ou FreeSync, avalie o comportamento com o [Teste de VRR](/tests/vrr-test) para verificar se ocorre overshoot em taxas de quadros mais baixas.",
      "Repita a verificação na sua taxa de atualização habitual e após o monitor atingir a temperatura operacional ideal estável."
    ],
    "whatScreenTesterCanObserve": [
      "Observação visual de rastros escuros, silhuetas de cor e coroas brilhantes de overshoot atrás dos padrões em movimento",
      "Exibição de padrões de teste calibrados combinando contrastes variados (incluindo cinza-escuro sobre preto e ciano sobre cinza)",
      "Mudanças visuais relativas no comprimento do rastro e na intensidade do halo entre diferentes predefinições de overdrive no OSD",
      "Diferenças de clareza percebidas pelo usuário ao testar em diversas taxas de atualização configuradas",
      "Comparação direta entre a persistência ocular de rastreamento e o atraso de transição dos cristais líquidos"
    ],
    "whatScreenTesterCannotDetermine": [
      "Curvas de tempo de resposta Gray-to-Gray (GtG) medidas em milissegundos por fotodiodo e osciloscópio de laboratório",
      "Matrizes completas de transição de 256 níveis cobrindo todas as luminâncias de partida e de chegada",
      "Tempo de resposta de imagem em movimento (MPRT) certificado com câmera de perseguição de alta velocidade",
      "Formas de onda de voltagem da controladora T-Con ou porcentagem exata de overshoot",
      "Atraso total de entrada (input lag) ou tempo de processamento da placa de escala interna (scaler)"
    ],
    "commonCauses": [
      "Reorientação vagarosa dos cristais líquidos em transições de escuro para escuro e tons próximos ao preto (propriedade física de painéis VA)",
      "Overdrive / Trace Free / AMA configurado no modo 'Extremo', gerando um pulso excessivo de voltagem e overshoot",
      "Overdrive completamente desativado, deixando os cristais líquidos sem nenhuma aceleração elétrica",
      "Tabela fixa de overdrive sem compensação variável, causando severas coroas luminosas durante quedas de FPS em VRR",
      "Baixa temperatura ambiente aumentando temporariamente a viscosidade do fluido de cristal líquido antes do aquecimento",
      "Instabilidade de entrega de quadros pela GPU (frame pacing) ou falhas de V-Sync confundidas com lentidão da tela"
    ],
    "whatToDoNext": [
      "Selecione um perfil de imagem neutro no OSD e evite modos de nitidez artificial ou modos 'FPS' exagerados.",
      "Ajuste o Overdrive para um nível intermediário balanceado (normalmente 'Normal' ou 'Rápido'); evite 'Extremo'.",
      "Verifique se o monitor está configurado para sua taxa de atualização nativa máxima nas configurações do sistema operacional.",
      "Confira a nitidez no [Teste de ghosting](/tests/ghosting-test) e no [Teste de desfoque de movimento](/tests/motion-blur-test).",
      "Ao jogar com VRR (G-Sync ou FreeSync), confira no [Teste de VRR](/tests/vrr-test) se o overshoot não se torna incômodo em baixas taxas de quadros.",
      "Se notar engasgos independentes do rastro de pixels, inspecione seu pipeline gráfico com o [Guia de solução de problemas](/knowledge-base/troubleshooting)."
    ],
    "sections": [
      {
        "title": "Smearing em tons escuros no VA: por que transições escuras demoram",
        "content": [
          "Os painéis de alinhamento vertical (VA) posicionam as moléculas de cristal líquido de maneira perpendicular ao substrato de vidro em repouso. Nessa posição, bloqueiam a luz de fundo com extrema eficiência; as telas VA comumente oferecem contraste estático nativo mais elevado do que muitos painéis IPS, mas as características exatas variam conforme o painel e o modelo.",
          "Entretanto, a transição do preto puro (RGB 0,0,0) para o cinza-escuro envolve diferenças mínimas de potencial elétrico. Reorientar as moléculas com baixa voltagem exige muito mais tempo físico do que transições completas (como do preto para o branco puro). Quando elementos escuros se movem sobre fundos escuros, esse atraso gera riscos pretos ou roxos — fenômeno conhecido como dark-level smearing.",
          "Esse comportamento varia conforme a geração do painel, o modelo do monitor, o firmware, o overdrive e a temperatura. Painéis modernos 'Fast VA' com acionamento de alta voltagem reduziram significativamente essa diferença. O tempo de resposta anunciado de '1 ms GtG' reflete apenas transições isoladas em condições ideais e não representa o comportamento geral em transições escuras."
        ],
        "bullets": [
          "Transições perto do preto utilizam pequenos degraus de voltagem, girando os cristais mais lentamente do que transições para o branco.",
          "O arrasto preto é especialmente perceptível ao rolar textos em modo escuro ou ao mover a câmera em cenários sombrios.",
          "A intensidade varia consideravelmente com a geração do painel, calibração do scaler e temperatura; não há um número único em ms.",
          "Especificações de 1 ms baseiam-se em medições isoladas com overdrive agressivo e não refletem o uso diário equilibrado."
        ]
      },
      {
        "title": "Overshoot de tempo de resposta e ghosting inverso: o custo do overdrive",
        "content": [
          "Para acelerar transições lentas, os fabricantes implementam o overdrive (também chamado de Trace Free, AMA ou Tempo de Resposta). Ele aplica um pico breve de sobretensão no início do quadro para forçar os cristais a girarem mais depressa do que com a voltagem padrão.",
          "Com moderação, os cristais atingem a luminância correta dentro do intervalo do quadro. Contudo, se a voltagem for agressiva, os cristais ultrapassam o tom desejado antes de se estabilizarem. Esse erro ótico produz o overshoot de tempo de resposta, também chamado de ghosting inverso ou coroas.",
          "O ghosting inverso manifesta-se como halos brilhantes ou invertidos contornando as bordas dos objetos em movimento. O overdrive é um compromisso direto de engenharia: diminuí-lo reduz o overshoot, mas pode aumentar o rastro convencional; aumentá-lo acelera as transições, mas cria coroas luminosas indesejadas. Levá-lo ao máximo não aprimora a fidelidade visual."
        ],
        "bullets": [
          "O overdrive acelera a rotação molecular aplicando um pico de sobretensão no começo de cada quadro.",
          "Voltagem excessiva faz os cristais ultrapassarem o brilho pretendido, gerando halos brilhantes (coroas).",
          "A calibração do overdrive é um equilíbrio direto entre o rastro comum e os halos de ghosting inverso.",
          "Usar o nível máximo ou 'Extremo' quase invariavelmente introduz anomalias de overshoot que prejudicam a imagem."
        ]
      },
      {
        "title": "Diferenciando os cinco principais artefatos de movimento",
        "content": [
          "Imperfeições visuais em movimento são comumente confundidas sob o termo genérico 'desfoque'. Para um diagnóstico correto, é necessário distinguir cinco fenômenos físicos distintos que podem coexistir na mesma tela:",
          "1. Dark-Level Smearing: Rastros escuros ou roxos atrás de elementos escuros sobre fundos escuros, decorrentes da lentidão em transições de tons quase pretos (comum em painéis VA).",
          "2. Ghosting convencional: Silhuetas tênues com a cor original do objeto, causadas por tempos de transição GtG maiores que o ciclo do quadro.",
          "3. Overshoot de overdrive / Ghosting inverso: Halos brilhantes ou com cores invertidas contornando as bordas móveis, provocados por excesso de voltagem de overdrive.",
          "4. Persistência retiniana (Sample-and-Hold / MPRT): Suavização geral em toda a cena decorrente do rastreamento ocular sobre quadros estáticos exibidos continuamente. Ocorre em qualquer tela sample-and-hold (incluindo telas OLED com transições de pixels quase instantâneas) e é atenuada por taxas de atualização maiores ou estroboscopia.",
          "5. Instabilidade de frame pacing e engasgos: Saltos espasmódicos e travamentos decorrentes da placa gráfica ou sincronização de quadros, independentes da velocidade do painel."
        ],
        "bullets": [
          "Dark-Level Smearing: Transições lentas nos pretos; arrasto escuro sobre fundo escuro.",
          "Ghosting convencional: Silhueta da mesma cor; resposta GtG global lenta dos cristais.",
          "Ghosting inverso (Overshoot): Halos brilhantes; voltagem de overdrive em excesso.",
          "Persistência ocular (MPRT): Desfoque uniforme em movimento; mitigado com taxas de hertz maiores.",
          "Frame Pacing / Engasgos: Movimentos aos trancos; falha de sincronização ou da GPU, não do painel."
        ]
      },
      {
        "title": "Interações entre VRR, taxa de atualização e overdrive",
        "content": [
          "A calibração do overdrive é dimensionada para uma duração de quadro específica. Em 165 Hz, cada quadro dura cerca de 6,06 ms, exigindo um impulso elétrico forte. Em 60 Hz, essa duração salta para 16,67 ms, dando quase o triplo de tempo para os cristais mudarem de estado.",
          "Monitores premium possuem 'overdrive variável', que diminui automaticamente a intensidade da sobretensão conforme a taxa cai durante o uso de VRR (G-Sync, FreeSync). Isso mantém a transição limpa em 165 Hz sem provocar halos em 60 Hz.",
          "Já modelos de entrada utilizam tabelas fixas. Um nível impecável em 165 Hz pode gerar coroas agressivas de overshoot quando jogos pesados caem para 60–80 Hz. Você pode inspecionar esse comportamento com o [Teste de VRR](/tests/vrr-test) e o [Teste de ghosting](/tests/ghosting-test)."
        ],
        "bullets": [
          "A duração do quadro aumenta drasticamente em frequências mais baixas (6,06 ms a 165 Hz versus 16,67 ms a 60 Hz).",
          "Monitores sem overdrive variável podem apresentar fortes halos de overshoot em VRR a baixos FPS.",
          "Telas com overdrive variável modulam a intensidade elétrica dinamicamente em toda a faixa de operação.",
          "Teste tanto na taxa máxima quanto em 60–80 Hz para selecionar um overdrive estável mesmo em quedas de quadros."
        ]
      },
      {
        "title": "Temperatura, condições operacionais e variabilidade de fabricação",
        "content": [
          "As moléculas de cristal líquido estão imersas em um fluido cuja viscosidade varia conforme a temperatura ambiente. Ao ligar o monitor em um ambiente frio, o líquido é mais denso, tornando a rotação molecular momentaneamente mais lenta.",
          "O arrasto visual acentuado ao ligar o monitor a frio costuma diminuir gradualmente conforme o calor do backlight estabiliza o painel na sua temperatura de funcionamento normal. O comportamento de transição dos pixels pode variar com as condições de operação, incluindo a temperatura; não prescreva uma duração universal de aquecimento. Avalie o monitor após o equilíbrio térmico.",
          "Além disso, dois monitores que compartilham o mesmo modelo de painel podem exibir clareza de movimento bastante diferente devido a circuitos do scaler, algoritmos de firmware, calibrações de fábrica e tolerâncias dos componentes."
        ],
        "bullets": [
          "Ambientes frios aumentam a viscosidade do cristal líquido, acentuando temporariamente o rastro.",
          "Avalie a nitidez em movimento depois que a tela atingir uma temperatura operacional estável em seu ambiente; não presuma um tempo fixo de aquecimento.",
          "Painéis idênticos comportam-se de forma diferente entre fabricantes devido ao firmware do scaler.",
          "Não classifique o arrasto inicial em dias frios como um defeito definitivo de hardware."
        ]
      },
      {
        "title": "Rotina prática de inspeção no OSD",
        "content": [
          "Para encontrar o melhor ajuste de overdrive no seu monitor sem equipamentos laboratoriais, siga este procedimento no Screen Tester:",
          "1. Ajuste um perfil de imagem neutro (Padrão ou Personalizado) no OSD e confirme a taxa de atualização nativa no sistema operacional.",
          "2. Inicie o [Teste de ghosting](/tests/ghosting-test) no Screen Tester e observe os blocos em movimento contra fundos escuros e médios.",
          "3. Abra o OSD do monitor, procure Overdrive / Tempo de resposta (veja o [Guia de configurações OSD do monitor](/guides/monitor-osd-settings-explained)) e teste de Desligado a Extremo.",
          "4. Encontre o limiar: determine o nível mais alto onde o rastro diminui antes que halos luminosos (overshoot) apareçam.",
          "5. Repita o teste em frequências mais baixas se utiliza VRR em jogos de alto desempenho.",
          "Evite regras universais como 'use sempre o máximo'. A melhor configuração varia por monitor e equilibra arrasto e halos."
        ],
        "bullets": [
          "Etapa 1: Definir perfil neutro e checar a taxa de atualização nativa no sistema operacional.",
          "Etapa 2: Executar o [Teste de ghosting](/tests/ghosting-test) para observar rastros em fundos claros e escuros.",
          "Etapa 3: Alternar as opções de Overdrive no OSD de Desligado até Extremo.",
          "Etapa 4: Selecionar a configuração mais alta que não crie coroas brilhantes perceptíveis.",
          "Etapa 5: Confirmar a estabilidade em taxas de quadros menores para cargas de trabalho em VRR."
        ]
      },
      {
        "title": "Guia de interpretação visual: o que seus olhos observam",
        "content": [
          "Consulte este guia para associar cada sintoma visual observado ao seu mecanismo físico correspondente:",
          "Rastro escuro evidente atrás de objetos escuros: Indica transições mais lentas em tons escuros (típico de painéis VA). Experimente subir um nível de overdrive se não houver halos e assegure-se de que o monitor esteja aquecido.",
          "Coroa brilhante ou escura contornando objetos móveis: Indica overshoot de overdrive (ghosting inverso) por excesso de voltagem. Reduza o overdrive do monitor em um nível no OSD.",
          "Suavização uniforme em toda a cena móvel: Persistência retiniana em telas sample-and-hold (MPRT). Aumente a taxa de atualização ou avalie o uso de estroboscopia se disponível.",
          "Comportamento instável em taxas de atualização diferentes: Calibração de overdrive fixa (falta de overdrive variável em VRR). Escolha um nível intermediário estável em baixos FPS.",
          "Movimento aos trancos ou travamentos: Verifique a entrega de quadros pela GPU, frame pacing, V-Sync ou navegador antes de suspeitar do painel. Veja o [Guia de solução de problemas](/knowledge-base/troubleshooting)."
        ],
        "bullets": [
          "Rastro escuro → Transições escuras lentas; testar overdrive moderado e checar temperatura.",
          "Halos brilhantes → Overshoot de overdrive; reduzir o overdrive no OSD em um nível.",
          "Desfoque uniforme → Persistência ocular (MPRT); elevar a taxa de atualização.",
          "Overshoot só em baixos FPS → Overdrive fixo em VRR; escolher opção estável para baixos hertz.",
          "Engasgos nos quadros → Falha de sincronização ou da GPU; ver o [Guia de solução de problemas](/knowledge-base/troubleshooting)."
        ]
      }
    ],
    "faq": [
      {
        "question": "Por que monitores VA exibem mais smearing escuro do que telas IPS ou TN?",
        "answer": "Os pixels VA alinham os cristais verticalmente em repouso para bloquear a luz de fundo com eficiência, gerando alto contraste. No entanto, transições entre tons quase pretos envolvem variações de voltagem muito sutis, atrasando a rotação física. A intensidade depende da geração do painel, firmware, overdrive e temperatura."
      },
      {
        "question": "O que causa as 'coroas' claras ou escuras (overshoot / ghosting inverso)?",
        "answer": "O overshoot acontece quando o monitor aplica uma sobretensão agressiva para tentar acelerar o cristal líquido. Em vez de parar na luminância certa, o cristal ultrapassa a meta, gerando bordas luminosas ou invertidas ao redor dos objetos em movimento."
      },
      {
        "question": "Devo manter o overdrive do meu monitor sempre no nível máximo?",
        "answer": "Não. O ajuste máximo ou 'Extremo' quase sempre provoca overshoot severo (ghosting inverso). A melhor escolha depende de cada aparelho e consiste em equilibrar a diminuição do rastro sem criar halos perceptíveis."
      },
      {
        "question": "Por que halos brilhantes surgem quando o FPS cai em jogos com VRR?",
        "answer": "Em frequências menores (ex.: 60 Hz), cada quadro permanece exibido por mais tempo (16,7 ms contra 6 ms a 165 Hz). Sem overdrive variável, o pulso elétrico dimensionado para 165 Hz ultrapassa a meta de forma exagerada em 60 Hz."
      },
      {
        "question": "Uma sala fria pode piorar o ghosting do monitor?",
        "answer": "Sim. As moléculas de cristal líquido ficam em um fluido cuja viscosidade sobe em temperaturas baixas. Ao ligar em um ambiente frio, a resposta pode parecer mais lenta até que o calor da luz de fundo estabilize a tela."
      },
      {
        "question": "O Screen Tester mede o tempo de resposta exato em milissegundos?",
        "answer": "Não. Navegadores web não têm acesso a fotodiodos nem a osciloscópios. O Screen Tester permite avaliar visualmente rastros e sobreimpulsos, mas medições milimétricas certificadas requerem equipamentos laboratoriais."
      }
    ],
    "relatedTestIds": [
      "ghosting-test",
      "motion-blur-test",
      "vrr-test",
      "refresh-rate-test"
    ],
    "relatedTroubleshootingIds": [
      "wrong-refresh-rate",
      "flickering"
    ],
    "relatedArticleSlugs": [
      "refresh-rate-and-frame-rates",
      "screen-tearing-and-v-sync"
    ],
    "primarySearchIntent": "monitor ghosting test overdrive overshoot va smearing",
    "readingTimeMinutes": 8
  },
  {
    "slug": "screen-tearing-and-v-sync",
    "category": "display-problems",
    "title": "Screen Tearing e Tecnologias V-Sync",
    "subtitle": "Cortes horizontais, troca de quadros, Adaptive Sync, G-Sync, FreeSync e latência.",
    "description": "Descubra por que ocorre o screen tearing, como V-Sync e VRR o eliminam e os reflexos no atraso de entrada (input lag).",
    "directAnswer": "O screen tearing ocorre quando a placa de vídeo envia novos quadros enquanto o monitor ainda está desenhando a tela anterior, dividindo a imagem ao meio.",
    "whyItMatters": "O tearing quebra a fluidez em cenas de movimento rápido. O V-Sync tradicional elimina os cortes, mas introduz atraso perceptível no ponteiro do mouse.",
    "whatToLookFor": [
      "Horizontal split lines where the top half of the screen does not align with the bottom half during camera pans",
      "Multiple horizontal tear seams cascading down the display during rapid motion",
      "Stutter and mouse latency spikes when frame rate fluctuates below native refresh rate",
      "Pacing judder when watching 24 FPS video on a 60Hz display (3:2 pulldown judder)"
    ],
    "howToTest": [
      "Run the Screen Tearing Test in Screen Tester to watch high-speed vertical bars sweep across the display",
      "Run the VRR Visual Inspection test under dynamic workloads to observe frame pacing stability",
      "Verify whether horizontal tearlines appear when sweeping test objects at maximum browser framerates"
    ],
    "whatScreenTesterCanObserve": [
      "High-velocity vertical bar animation loops timed against the browser compositor",
      "Animation frame delivery intervals via `requestAnimationFrame`",
      "Visual tearing seams visible to user inspection across full-screen canvas viewports"
    ],
    "whatScreenTesterCannotDetermine": [
      "GPU driver frame buffer swapchain latency in milliseconds",
      "Hardware VESA Adaptive-Sync or NVIDIA G-Sync chip hardware handshake packets",
      "Direct mouse-to-display end-to-end system input latency"
    ],
    "commonCauses": [
      "V-Sync disabled while running games at frame rates that do not match the monitor refresh rate",
      "Variable Refresh Rate (G-Sync / FreeSync) not enabled in both GPU drivers and monitor OSD",
      "Game frame rate exceeding the maximum VRR range of the monitor (e.g., rendering 180 FPS on a 144Hz screen)",
      "Windowed mode desktop composition conflicts between multiple monitors with mismatched refresh rates"
    ],
    "whatToDoNext": [
      "Enable G-Sync or FreeSync in your GPU control panel and monitor OSD",
      "When using VRR, enable V-Sync in the GPU driver control panel and cap your frame rate 3 FPS below your max Hz (e.g., cap at 141 FPS on a 144Hz monitor) to stay within the VRR window",
      "If you do not have a VRR monitor, use FastSync (NVIDIA) or Enhanced Sync (AMD) to reduce tearing with minimal latency"
    ],
    "sections": [
      {
        "title": "Why Screen Tearing Happens",
        "content": [
          "Monitors draw images line-by-line from top to bottom at a fixed refresh rate (e.g., 60 or 144 times per second).",
          "Your graphics card renders frames to an internal buffer. Without synchronization, the GPU copies a newly finished frame into the display memory mid-scanout. The monitor draws the top half from the old frame and the bottom half from the new frame, creating a visible horizontal split."
        ]
      }
    ],
    "faq": [
      {
        "question": "Does V-Sync add input lag?",
        "answer": "Yes. Traditional double-buffered V-Sync forces the GPU to wait until the monitor finishes its refresh cycle before rendering the next frame. This backpressure can add 16 to 50 milliseconds of input latency."
      },
      {
        "question": "Why should I cap my FPS 3 below my refresh rate with G-Sync?",
        "answer": "If your FPS reaches or exceeds your monitor's maximum refresh rate (e.g., 144 FPS on 144Hz), G-Sync disengages and reverts to standard V-Sync (adding lag) or no sync (causing tearing). A 3 FPS limiter keeps you permanently inside the tear-free G-Sync window."
      }
    ],
    "relatedTestIds": [
      "screen-tearing-test",
      "vrr-test",
      "refresh-rate-test"
    ],
    "relatedTroubleshootingIds": [
      "screen-tearing",
      "wrong-refresh-rate"
    ],
    "relatedArticleSlugs": [
      "refresh-rate-and-frame-rates",
      "monitor-ghosting-and-motion-blur"
    ],
    "primarySearchIntent": "screen tearing corte na tela vsync gsync freesync vrr",
    "readingTimeMinutes": 5
  },
  {
    "slug": "text-clarity-and-subpixel-rendering",
    "category": "display-problems",
    "title": "Nitidez de Texto, Layout de Subpixels e Renderização de Fontes",
    "subtitle": "RGB padrão, BGR, subpixels triangulares QD-OLED, ClearType e bordas coloridas.",
    "description": "Descubra por que letras podem parecer desfocadas ou com bordas coloridas, a influência do arranjo de subpixels e ajustes de nitidez.",
    "directAnswer": "A nitidez de texto depende da densidade de pixels (PPI), da suavização de fontes do sistema e da disposição geométrica física dos subpixels de cada pixel.",
    "whyItMatters": "Painéis com geometria BGR ou QD-OLED triangular provocam bordas coloridas ao redor de letras quando o sistema assume o padrão tradicional RGB stripe.",
    "whatToLookFor": [
      "Colored red, yellow, or blue fringes on vertical stems of black text against white backgrounds",
      "Soft, blurry, or washed-out typography across word processors and code editors",
      "Uneven horizontal stroke weights where some letter stems appear thicker than others",
      "Eyestrain or fatigue after reading documents for extended periods"
    ],
    "howToTest": [
      "Run the Text Clarity Test in Screen Tester to inspect font rendering across sizes from 8px to 32px",
      "Evaluate positive polarity (dark text on white) and negative polarity (light text on dark)",
      "Inspect high-frequency 1-pixel line gratings to observe subpixel anti-aliasing color halos"
    ],
    "whatScreenTesterCanObserve": [
      "Rendering of system typography across diverse font sizes, weights, and high-contrast pairings",
      "Single-pixel vertical and horizontal line grid sharpness",
      "User visual observation of subpixel fringing halos on letter boundaries"
    ],
    "whatScreenTesterCannotDetermine": [
      "Physical microscopic subpixel layout geometry (standard RGB stripe vs. BGR vs. PenTile vs. QD-OLED)",
      "Operating system registry ClearType configuration parameters",
      "Physical panel anti-glare matte coating grain / sparkle dispersion"
    ],
    "commonCauses": [
      "Display uses a BGR (Blue-Green-Red) subpixel layout instead of standard RGB stripe",
      "OLED or QD-OLED display with non-standard subpixel arrangements (e.g., triangular subpixel arrays)",
      "Windows ClearType antialiasing disabled or calibrated for the wrong subpixel orientation",
      "Display running at low pixel density (under 90 PPI) where individual subpixels are physically large"
    ],
    "whatToDoNext": [
      "If using a BGR monitor, run the Windows ClearType Text Tuner (search 'ClearType' in Windows Start) and select the options that look sharpest",
      "Alternatively, use utility tools like BetterClearTypeTuner or MacType to configure BGR antialiasing",
      "Increase font size or set OS scaling to a higher density level (e.g., 125% or 150%)"
    ],
    "sections": [
      {
        "title": "How Subpixel Antialiasing Works",
        "content": [
          "Standard LCD pixels consist of three vertical stripes: Red, Green, and Blue, from left to right. Because subpixels are 1/3 the width of a full pixel, text rendering engines (like ClearType) illuminate individual subpixels to triple effective horizontal text resolution.",
          "If your monitor has BGR subpixels (Blue on left, Red on right), ClearType illuminates the wrong side of the physical pixel, turning what should be subtle antialiasing into bright colored fringes."
        ]
      }
    ],
    "faq": [
      {
        "question": "Why does text on my QD-OLED or WOLED gaming monitor look slightly blurry?",
        "answer": "First- and second-generation OLED monitors do not use standard rectangular RGB stripes. QD-OLED uses a triangular layout, while WOLED includes an extra white subpixel (WRGB). Font smoothing engines designed for rectangular RGB stripes cause colored halos on high-contrast text edges."
      },
      {
        "question": "Does higher PPI solve subpixel text fringing?",
        "answer": "Yes. On high-density screens (like 4K at 27\" or 32\", ~140–163 PPI), individual subpixels are so microscopic that colored fringing drops below the threshold of human visual acuity at normal viewing distances."
      }
    ],
    "relatedTestIds": [
      "text-clarity-test",
      "sharpness-test",
      "resolution-checker"
    ],
    "relatedTroubleshootingIds": [
      "blurry-text",
      "wrong-resolution"
    ],
    "relatedArticleSlugs": [
      "resolution-and-scaling",
      "tv-overscan-and-pixel-mapping"
    ],
    "primarySearchIntent": "nitidez de texto fontes subpixel rgb bgr cleartype franjas",
    "readingTimeMinutes": 6
  },
  {
    "slug": "oled-burn-in-and-image-retention",
    "category": "display-problems",
    "title": "OLED ABL, deslocamento de pixels e retenção de imagem",
    "subtitle": "Limitador automático de brilho, variações de luminância por tamanho de janela, pixel orbiting e proteção contra conteúdo estático.",
    "description": "Entenda como o ABL em telas OLED atua conforme a área iluminada, por que ocorre o deslocamento de pixels e como inspecionar seu monitor com segurança.",
    "directAnswer": "O Limitador Automático de Brilho (ABL) em telas OLED é um circuito interno de proteção que modula a luminância geral do painel com base no nível médio de imagem (Average Picture Level, APL) para gerenciar o consumo elétrico e a dissipação térmica. Concomitantemente, o deslocamento de pixels (pixel orbiting) move a imagem periodicamente em pequenos passos para distribuir bordas estáticas entre emissores vizinhos.",
    "whyItMatters": "Sendo os pixels OLED diodos orgânicos autoemissivos, gerenciar o calor acumulado e a corrente elétrica é fundamental para a vida útil da tela. Usuários que não conhecem o ABL costumam confundir a atenuação do branco ao redimensionar janelas com defeito do monitor, enquanto o leve movimento do pixel shift pode ser interpretado como instabilidade de sinal. Compreender esses mecanismos ajuda a calibrar o OSD e distinguir proteções normais de problemas reais.",
    "whatToLookFor": [
      "Atenuação visível do brilho ao maximizar uma janela branca de tamanho pequeno para tela cheia (comportamento padrão do ABL)",
      "Destaques especulares pequenos (lâmpadas, néon, faíscas) que brilham com intensidade muito superior a grandes áreas brancas",
      "Deslocamento sutil e periódico de toda a imagem em alguns pixels, revelando ocasionalmente uma borda preta inativa em uma das margens (pixel shifting / orbiting)",
      "Escurecimento gradual e progressivo da tela quando elementos estáticos da área de trabalho ou vídeos pausados ficam imóveis por minutos (ASBL / atenuação estática)",
      "Silhuetas fantasma de ícones ou barras de ferramentas que desaparecem suavemente após reproduzir vídeos em tela cheia (retenção temporária de imagem)",
      "Silhuetas escuras permanentes ou desvios de cor visíveis em telas cinza ou coloridas mesmo após executar ciclos manuais de limpeza do painel (burn-in permanente)"
    ],
    "howToTest": [
      "Abra o [Teste de brilho](/tests/brightness-test) no Screen Tester e observe as áreas de teste enquanto amplia a janela do navegador de compacta para tela cheia.",
      "Inicie o [Teste HDR](/tests/hdr-test) para observar como o monitor administra pequenos destaques luminosos versus cenas amplas de alto APL em HDR.",
      "Execute o [Teste de uniformidade](/tests/uniformity-test) em padrões de cinza a 5%, 20%, 50% e 100% para inspecionar sombras de retenção ou efeito de tela suja (DSE).",
      "Avalie detalhes nas sombras com o [Teste de tons escuros](/tests/near-black-test) para garantir que níveis logo acima do preto (tons 1 a 16) permaneçam distintos.",
      "Verifique transições tonais suaves e profundidade de cor com o [Teste de gradiente e banding](/tests/gradient-banding-test).",
      "Inspecione o contorno de fontes em fundos claros e escuros usando o [Teste de nitidez de texto](/tests/text-clarity-test).",
      "Consulte a profundidade de cor e recursos HDR informados pelo navegador em [Informações da tela](/tests/display-info).",
      "Consulte nosso [Guia de configurações OSD do monitor](/guides/monitor-osd-settings-explained) para verificar se seu aparelho oferece um modo de brilho uniforme."
    ],
    "whatScreenTesterCanObserve": [
      "Observação visual das alterações de brilho percebidas conforme as áreas brancas se expandem pela tela",
      "Inspeção comparativa em fundos sólidos de cinza a 5%, 20%, 50% e 100% e cores primárias para identificar sombras de retenção",
      "Exibição de escalas sutis de tons quase pretos (níveis 1 a 16) para verificar a visibilidade de detalhes nas sombras",
      "Gama de cores, profundidade de bits e suporte HDR comunicados pelo navegador via APIs web",
      "Verificação visual de franjas de cores nos contornos de tipografias de alto contraste"
    ],
    "whatScreenTesterCannotDetermine": [
      "Medições absolutas de luminância calibradas por fotodiodo em candelas por metro quadrado (cd/m² ou nits)",
      "Consumo elétrico da fonte interna em watts, amperagem da corrente ou telemetria térmica dos sensores do painel",
      "Limiares exatos de acionamento do ABL de fábrica, tabelas LUT ou curvas de corte programadas no firmware",
      "Vida útil restante dos emissores orgânicos, porcentagem de desgaste ou probabilidade futura de burn-in",
      "Histórico interno de ciclos de compensação de pixels, contadores de diagnóstico ou coordenadas exatas de deslocamento"
    ],
    "commonCauses": [
      "Conteúdo com alto nível médio de imagem (APL) acionando o limitador ABL para conter a temperatura e a corrente elétrica",
      "Rotinas ativas de 'Pixel Shift' (Pixel Orbiting) deslocando a imagem em pequenos passos para amenizar o desgaste de bordas fixas",
      "Atenuadores automáticos de conteúdo estático (ASBL / TPC) atuando durante tarefas de escritório prolongadas sem movimento",
      "Uso de perfis HDR agressivos voltados a picos extremos em vez de modos de luminância moderada ou uniforme",
      "Exibição contínua de elementos fixos de alto contraste (barras de tarefas, cabeçalhos, placares) com o brilho no máximo",
      "Desligamento do monitor diretamente pela chave do filtro de linha, impedindo a execução dos ciclos de manutenção em espera"
    ],
    "whatToDoNext": [
      "Verifique no OSD se há opção de 'Brilho uniforme' (Uniform Brightness) se as mudanças de luz ao mover janelas incomodarem.",
      "Mantenha ativos os recursos de proteção do fabricante: deslocamento de pixels, atenuação de logotipos e ciclos de espera.",
      "Configure o sistema operacional para ocultar a barra de tarefas automaticamente e determine um tempo de suspensão de inatividade.",
      "Se notar sombras tênues após tarefas estáticas, reproduza vídeos variados em tela cheia ou deixe o monitor em espera para executar um ciclo de renovação.",
      "Se as oscilações de brilho parecerem irregulares, consulte nosso [Guia de configurações OSD do monitor](/guides/monitor-osd-settings-explained) e o [Guia de solução de problemas](/knowledge-base/troubleshooting)."
    ],
    "sections": [
      {
        "title": "Compreendendo o Limitador Automático de Brilho (ABL) do OLED",
        "content": [
          "As telas OLED (Organic Light-Emitting Diode) diferem das telas LCD clássicas pelo fato de que cada subpixel produz sua própria luz. Nessa arquitetura autoemissiva, iluminar poucos pontos requer pouca energia, mas acender toda a superfície com brilho máximo exigiria uma corrente elétrica colossal e geraria um calor intenso nas finas camadas orgânicas.",
          "Para operar com segurança dentro dos limites elétricos e térmicos, os fabricantes implementam o Limitador Automático de Brilho (ABL). O ABL é um circuito de controle em hardware e firmware que monitora o nível médio de imagem (Average Picture Level, APL) e atenua suavemente a luminância geral conforme a área iluminada cresce.",
          "Essa resposta varia significativamente entre dispositivos. O ponto em que o limitador atua, a inclinação da curva de corte e o brilho máximo em tela cheia dependem da tecnologia (WOLED, QD-OLED, AMOLED), da geração do painel, do firmware do escalador, da dissipação térmica e do perfil de imagem selecionado. Não existe uma curva ABL universal."
        ],
        "bullets": [
          "Pixels autoemissivos demandam energia e geram calor proporcionalmente à quantidade de pixels acesos e seu brilho.",
          "O ABL calcula constantemente o APL e reduz a intensidade luminosa quando grandes áreas brancas são exibidas.",
          "O comportamento varia conforme a tecnologia (WOLED versus QD-OLED), dissipador, firmware e perfil de imagem.",
          "O ABL é uma proteção intencional do hardware e não uma falha da fonte ou do painel."
        ]
      },
      {
        "title": "Por que o brilho do OLED muda conforme o conteúdo e a janela",
        "content": [
          "Quem começa a usar um monitor OLED logo percebe oscilações luminosas durante tarefas comuns na área de trabalho. Quando uma janela de navegador branca é pequena, o APL geral permanece baixo, permitindo que a tela alimente esses pixels com alta luminância sem superaquecer. Ao arrastar a janela para tela cheia, o APL salta e o ABL reduz a luminosidade de toda a área visível.",
          "Essa dinâmica cria contrastes nítidos entre conteúdos: pequenos detalhes brilhantes – como chamas, néon ou ícones – parecem extremamente vivos pelo seu tamanho reduzido. Já documentos de texto em tela cheia ou cenários de neve exigem a atuação máxima do ABL, resultando em um branco mais comedido.",
          "Além disso, o modo de operação altera a agressividade do ABL. Em HDR, os aparelhos autorizam picos pontuais muito altos com atuações severas em telas cheias. Em SDR, muitos monitores modernos oferecem a opção 'Brilho uniforme' (Uniform Brightness), que trava o brilho em um patamar sustentável para qualquer tamanho de janela, eliminando oscilações durante o trabalho."
        ],
        "bullets": [
          "Janelas brancas pequenas mantêm maior brilho porque o baixo APL reduz a carga térmica.",
          "Maximizar janelas para tela cheia aciona o ABL, atenuando perceptivelmente a luminância geral.",
          "Perfis HDR priorizam o impacto de pequenos destaques com reduções acentuadas em grandes fundos brancos.",
          "Monitores OLED oferecem em SDR o ajuste 'Uniform Brightness' para acabar com oscilações no desktop."
        ]
      },
      {
        "title": "Como observar o ABL visualmente (Método seguro e limites do navegador)",
        "content": [
          "Você pode observar o comportamento do ABL no seu monitor usando janelas normais de navegador. Escolha um papel de parede escuro ou neutro, abra uma página em branco ou o [Teste de brilho](/tests/brightness-test) e redimensione a janela gradualmente de um quarto de tela até o tamanho máximo. Veja se o branco mantém a mesma intensidade ou se arrefece suavemente conforme se expande.",
          "Em seguida, abra o [Teste HDR](/tests/hdr-test) para conferir a reação do painel em HDR com diferentes cargas de APL, comparando blocos pequenos com telas completas. Teste tanto em SDR quanto em HDR e com o recurso 'Uniform Brightness' ligado e desligado.",
          "Ao realizar essas inspeções, é essencial compreender os limites das ferramentas web. O Screen Tester apresenta padrões geométricos para comparação visual, mas navegadores não possuem ligação com fotodiodos ou sensores de laboratório. As constatações decorrem da percepção do usuário e de relatórios de APIs, nunca de medições laboratoriais de nits."
        ],
        "bullets": [
          "Passo 1: Abrir o [Teste de brilho](/tests/brightness-test) em janela pequena sobre fundo escuro.",
          "Passo 2: Expandir a janela para tela cheia observando quando e com que suavidade a luz se reduz.",
          "Passo 3: Comparar perfis SDR e HDR no [Teste HDR](/tests/hdr-test) para avaliar as curvas de atenuação.",
          "Limites técnicos: Navegadores web não medem valores de nits reais nem o consumo de energia em watts."
        ]
      },
      {
        "title": "Deslocamento de pixels (Pixel Orbiting): Movimento geométrico preventivo",
        "content": [
          "O deslocamento de pixels (conhecido como Pixel Shift, Screen Shift ou Pixel Orbiting) é uma salvaguarda fundamental em monitores e TVs OLED. O processador da tela move sutilmente toda a imagem exibida em passos de poucos pixels nos eixos horizontal e vertical ao longo do tempo.",
          "O objetivo desse movimento é evitar que bordas fixas de alto contraste – como margens de janelas, a barra de tarefas ou medidores fixos de jogos – fiquem acesas continuamente sobre os mesmos subpixels. Ao rotacionar a imagem entre diodos vizinhos, a carga luminosa se distribui por uma área maior, atrasando significativamente o desgaste localizado.",
          "Como essa transição é projetada para não atrapalhar o uso, ela ocorre devagar. No entanto, em tarefas de texto na área de trabalho, usuários atentos podem notar que fontes mudam levemente de posição ao longo das horas ou que uma borda preta muito estreita surge em uma das margens da tela. Isso é um sinal de proteção ativa de hardware e não deve ser confundido com trepidação ou defeito de cabo."
        ],
        "bullets": [
          "O pixel shift translada periodicamente a imagem ativa em alguns pixels na horizontal e vertical.",
          "Espalhar bordas estáticas por subpixels vizinhos distribui a carga luminosa e previne a fadiga.",
          "Pequenas margens pretas inativas temporárias em um dos lados são comuns durante os ciclos.",
          "Esse deslocamento leve é uma salvaguarda deliberada e não representa instabilidade do sinal."
        ]
      },
      {
        "title": "Proteção contra conteúdo estático: Distinguindo quatro sistemas",
        "content": [
          "Para preservar os emissores orgânicos, várias tecnologias coexistem e costumam ser confundidas. É importante distinguir quatro frentes de proteção:",
          "1. Deslocamento de pixels (Pixel Orbiting): A translação geométrica contínua e suave da imagem durante o uso normal da tela.",
          "2. Atenuação estática (ASBL / TPC / Detecção de logotipo): Algoritmos do firmware que analisam o sinal de vídeo à procura de elementos imóveis (marcas de canais, barras de tarefas, telas pausadas). Ao detectar inatividade por minutos, atenuam a luminosidade da tela inteira ou da área fixa para evitar acúmulo térmico.",
          "3. Suspensão e protetor de tela do sistema operacional: Gerenciamento de energia do Windows ou macOS que corta o sinal ou exibe tela preta após inatividade de teclado e mouse.",
          "4. Ciclos de manutenção e compensação do painel: Rotinas internas executadas pelo controlador do monitor em modo de espera. Ciclos curtos ocorrem após algumas horas de uso cumulativo para aferir a resistência dos subpixels e balancear as voltagens, enquanto ciclos profundos atuam a cada centenas de horas.",
          "A calibração varia conforme o fabricante: TVs costumam aplicar um ASBL rigoroso voltado ao cinema, enquanto monitores para jogos oferecem regulagens mais brandas no OSD para não atrapalhar o trabalho."
        ],
        "bullets": [
          "Pixel Orbiting: Movimentação geométrica contínua para atenuar o desgaste em bordas fixas.",
          "Atenuação ASBL/TPC: Redução automática do brilho diante de imagens ou logotipos imóveis.",
          "Suspensão pelo SO: Desligamento do sinal pelo sistema operacional após inatividade.",
          "Ciclos em espera: Manutenção de rotina fundamental do firmware para calibrar voltagens."
        ]
      },
      {
        "title": "Retenção temporária de imagem versus Burn-in definitivo",
        "content": [
          "Um conceito crucial nas telas OLED é a diferença entre retenção temporária e burn-in definitivo. A retenção de imagem é um fenômeno elétrico passageiro causado pelo acúmulo transitório de cargas nos transistores (TFT) ou nas camadas emissivas após a exibição prolongada de elementos contrastantes. Em fundos cinza uniformes, uma sombra suave pode persistir por algum tempo, mas se dissipa naturalmente com a exibição de conteúdos variados ou após um ciclo de compensação em espera.",
          "O burn-in permanente (desgaste diferencial de subpixels), por sua vez, é a degradação física e irreversível dos compostos orgânicos. Se certos diodos – como os de um medidor de jogo – ficarem acesos em intensidade máxima por milhares de horas enquanto os vizinhos variam, esses pixels perdem eficiência luminosa para sempre, projetando uma silueta escura perpétua em fundos lisos.",
          "Os painéis OLED modernos trazem camadas emissivas aprimoradas, dissipadores de grafeno ou alumínio e sensores de temperatura que tornam o burn-in raro em um uso diário variado. Nenhum software web consegue avaliar o estado químico microscópico dos subpixels; o Screen Tester permite avaliar visualmente a uniformidade atual do seu monitor."
        ],
        "bullets": [
          "Retenção temporária: Fenômeno de carga reversível; desaparece com vídeos variados ou em espera.",
          "Burn-in permanente: Perda física irreversível de eficiência após milhares de horas de luz estática.",
          "Evolução técnica: Dissipadores e algoritmos atuais diminuíram muito o risco de marcas definitivas.",
          "Limites do teste: Navegadores não avaliam o desgaste molecular nem calculam a vida útil restante."
        ]
      },
      {
        "title": "Avaliando características OLED no Screen Tester",
        "content": [
          "O Screen Tester dispõe de ferramentas web para você inspecionar visualmente o comportamento da sua tela OLED. Saber o que cada uma faz evita diagnósticos equivocados:",
          "[Teste HDR](/tests/hdr-test): Avalia a decodificação de metadados HDR e o comportamento dos destaques sem estourar os brancos. Não mede valores absolutos de nits de pico.",
          "[Teste de uniformidade](/tests/uniformity-test): Projeta padrões sólidos de cinza a 5%, 20%, 50% e 100% e cores primárias, facilitando a identificação de sombras de retenção ou sujeira de tela (DSE). Não produz mapas delta-E de laboratório.",
          "[Teste de tons escuros](/tests/near-black-test): Navega pelos tons mais escuros (níveis 1 a 16 sobre o preto puro) para checar o detalhamento nas sombras sem esmagamento de pretos. Não mede voltagens internas do painel.",
          "[Teste de gradiente e banding](/tests/gradient-banding-test): Analisa a fluidez de gradientes em 8 e 10 bits para apontar quebras abruptas de cor ou artefatos de pontilhismo. Não inspeciona o processamento interno do escalador.",
          "[Teste de brilho](/tests/brightness-test): Permite comparar visualmente a luminosidade ao redimensionar janelas para verificar a entrada do ABL. Não mede candelas por metro quadrado (cd/m²).",
          "[Teste de nitidez de texto](/tests/text-clarity-test): Mostra fontes em fundos claros e escuros para checar aberrações cromáticas causadas pela disposição dos subpixels OLED (como WOLED ou QD-OLED). Não altera o renderizador de fontes do SO.",
          "[Informações da tela](/tests/display-info): Consulta APIs do navegador para exibir resolução, profundidade de bits e suporte HDR sem acessar dados internos de firmware."
        ],
        "bullets": [
          "[Teste HDR](/tests/hdr-test): Avalia o mapeamento tonal a olho nu; não mede nits absolutos.",
          "[Teste de uniformidade](/tests/uniformity-test): Revela sombras em cinzas de 5% a 50%; não calcula delta-E.",
          "[Teste de tons escuros](/tests/near-black-test): Confere detalhes nas sombras; não afere voltagem do preto.",
          "[Teste de gradiente e banding](/tests/gradient-banding-test): Valida transições limpas de 10 bits sem degraus.",
          "[Teste de brilho](/tests/brightness-test): Mostra o corte do ABL com janelas ampliadas; não mede cd/m².",
          "[Teste de nitidez de texto](/tests/text-clarity-test): Avalia franjas de subpixels em caracteres tipográficos.",
          "[Informações da tela](/tests/display-info): Reúne parâmetros do navegador sem telemetria do controlador."
        ]
      },
      {
        "title": "Interpretando suas observações: Normal versus Anomalia",
        "content": [
          "Ao analisar seu monitor OLED, classifique as constatações segundo critérios técnicos claros:",
          "1. Parece normal: O brilho diminui suavemente quando uma janela branca é expandida para tela inteira (operação normal do ABL). A imagem se move de forma sutil alguns pixels ao longo das horas, formando às vezes uma margem preta fina em um lado (pixel orbiting esperado). Sombras tênues após imagens fixas somem após alguns minutos de vídeo ou ciclo em espera (retenção temporária inofensiva).",
          "2. Requer atenção: A tela escurece com intensidade excessiva durante o trabalho normal de escritório a ponto de dificultar a leitura (verifique ajustes de ASBL, sensores de luz ambiente ou configurações inadequadas de HDR na área de trabalho). Silhuetas escuras persistem em todos os testes de cores e cinzas mesmo após vários ciclos de renovação manual (desgaste diferencial ou burn-in).",
          "3. Inconclusivo: Oscilações imprevisíveis de luz acontecem durante jogos ou filmes. O motivo pode ser o mapeamento de tons do próprio jogo, o Auto HDR do Windows ou a curva ABL do monitor. Como ferramentas web não medem os circuitos internos, consulte o manual e o histórico de atualizações de firmware da sua tela."
        ],
        "bullets": [
          "Parece normal: Corte do ABL em janelas cheias, pixel orbiting discreto e retenção que some com vídeos.",
          "Requer atenção: Escurecimento excessivo no desktop ou silhuetas permanentes em fundos planos.",
          "Inconclusivo: Variações imprevisíveis em jogos; podem envolver tone-mapping do jogo ou HDR do Windows.",
          "Limite do diagnóstico: Ferramentas web não verificam se curvas ABL atendem às tolerâncias de fábrica."
        ]
      },
      {
        "title": "Guia prático de inspeção e conservação do OLED",
        "content": [
          "Para conservar seu monitor em bom estado e checá-lo periodicamente, siga este roteiro de 10 etapas:",
          "1. Escolha entre SDR e HDR: Prefira o modo SDR com brilho moderado para tarefas de trabalho e reserve o HDR para jogos e filmes compatíveis, evitando cortes desnecessários de ABL no uso diário.",
          "2. Teste do tamanho de janela: Veja no [Teste de brilho](/tests/brightness-test) como seu aparelho reage à expansão de janelas claras.",
          "3. Avaliação de brilho uniforme: Se o OSD oferecer 'Uniform Brightness', teste se ele proporciona maior conforto na área de trabalho.",
          "4. Estado do Pixel Shift: Certifique-se de que a função de deslocamento de pixels está habilitada no menu de manutenção do monitor.",
          "5. Ajuste de logotipos estáticos: Ajuste a atenuação de logotipos em nível médio para proteger a tela contra marcadores fixos.",
          "6. Verificação de sombras: Rode o [Teste de tons escuros](/tests/near-black-test) para garantir que os primeiros níveis escuros fiquem visíveis.",
          "7. Inspeção de uniformidade: Analise periodicamente cinzas de 5% e 50% no [Teste de uniformidade](/tests/uniformity-test) em ambiente escuro.",
          "8. Avaliação de gradientes: Certifique-se com o [Teste de gradiente e banding](/tests/gradient-banding-test) de que não há quebras abruptas de cores.",
          "9. Nitidez tipográfica: Confira no [Teste de nitidez de texto](/tests/text-clarity-test) a legibilidade em fundos claros e escuros.",
          "10. Monitor conectado à tomada: Não desligue o filtro de linha logo após o uso para que os ciclos automáticos de compensação possam atuar no modo de espera."
        ],
        "bullets": [
          "Etapa 1: Usar SDR para produtividade e reservar HDR para filmes e jogos adequados.",
          "Etapa 2: Acompanhar o comportamento do ABL no [Teste de brilho](/tests/brightness-test).",
          "Etapa 3: Experimentar modos de brilho constante no OSD para eliminar flutuações.",
          "Etapa 4: Deixar o deslocamento de pixels e a proteção de logos ativados no OSD.",
          "Etapa 5: Checar detalhes nas sombras com o [Teste de tons escuros](/tests/near-black-test).",
          "Etapa 6: Auditar a homogeneidade dos cinzas no [Teste de uniformidade](/tests/uniformity-test).",
          "Etapa 7: Confirmar transições suaves no [Teste de gradiente e banding](/tests/gradient-banding-test).",
          "Etapa 8: Checar contornos de fontes com o [Teste de nitidez de texto](/tests/text-clarity-test).",
          "Etapa 9: Conferir dados técnicos da tela com [Informações da tela](/tests/display-info).",
          "Etapa 10: Manter a tela conectada à energia em espera para os ciclos de manutenção."
        ]
      },
      {
        "title": "Solução de problemas e próximos passos recomendados",
        "content": [
          "Se o seu monitor OLED apresentar variações anômalas de iluminação ou artefatos visuais, aplique esta sequência de verificação:",
          "Escurecimento repentino ao ler textos: Se a tela escurece durante a leitura de documentos estáticos, o atenuador estático (ASBL) provavelmente entrou em ação. Mova o cursor ou alterne de janela. Consulte nosso [Guia de configurações OSD do monitor](/guides/monitor-osd-settings-explained) para verificar se é possível dosar a sensibilidade.",
          "Oscilações irritantes ao mover janelas: Ative o recurso 'Uniform Brightness' no OSD ou reduza o brilho em SDR para mantê-lo abaixo do limiar de ativação do ABL.",
          "Imagem deslocada ou borda preta assimétrica: Verifique se o Pixel Shift está ligado. O deslocamento sutil confirma que a proteção está funcionando bem.",
          "Marcas tênues que não somem: Se uma silhueta não sumir após a reprodução prolongada de vídeo dinâmico, coloque o monitor em modo de espera para que ele realize o ciclo automático de renovação de pixels.",
          "Para orientações sobre cabos, perfis de cores e gerenciamento de energia, consulte o [Guia de solução de problemas](/knowledge-base/troubleshooting)."
        ],
        "bullets": [
          "Escurecimento na leitura → Ativação do ASBL; mover o cursor ou checar o OSD.",
          "Brilho oscilando com janelas → Ação padrão do ABL; testar 'Uniform Brightness'.",
          "Imagem com leve desvio → Pixel Orbiting ativo; proteção operando como devido.",
          "Silhuetas persistentes → Deixar a tela em espera para executar a compensação.",
          "Diagnóstico completo de hardware → Consultar o [Guia de solução de problemas](/knowledge-base/troubleshooting)."
        ]
      }
    ],
    "faq": [
      {
        "question": "Por que meu monitor OLED fica mais escuro quando coloco o navegador branco em tela cheia?",
        "answer": "Trata-se da ação normal do Limitador Automático de Brilho (ABL). Quando uma janela clara cobre toda a tela, o nível médio de imagem (APL) sobe bruscamente. Para conter o consumo elétrico e a dissipação térmica, os circuitos atenuam o brilho geral."
      },
      {
        "question": "É normal a imagem da área de trabalho do meu OLED se mover um pouco para o lado?",
        "answer": "Sim. Esse é o deslocamento de pixels (Pixel Orbiting), um recurso preventivo de hardware. O monitor move a imagem periodicamente em passos de poucos pixels para que bordas estáticas não sobrecarreguem sempre os mesmos emissores."
      },
      {
        "question": "Como evito que meu monitor OLED fique mudando de brilho o tempo todo enquanto trabalho?",
        "answer": "Utilize o modo SDR com brilho comedido ou ative a opção 'Brilho uniforme' (Uniform Brightness) no menu OSD, caso disponível no seu modelo. Isso fixa o pico de luz em um teto constante para qualquer tamanho de janela."
      },
      {
        "question": "Qual é a diferença entre retenção temporária e burn-in definitivo?",
        "answer": "A retenção é um acúmulo temporário de cargas nos circuitos que desaparece com imagens em movimento ou ciclos em espera. O burn-in é o desgaste físico permanente de subpixels após milhares de horas de luz estática intensa."
      },
      {
        "question": "Por que nunca se deve tirar um monitor OLED da tomada logo após desligá-lo?",
        "answer": "Monitores OLED realizam ciclos automáticos de compensação de pixels enquanto permanecem em espera após algumas horas de uso. Cortar a energia na tomada interrompe essa rotina vital de manutenção."
      },
      {
        "question": "O Screen Tester pode medir os nits exatos do meu OLED ou sua durabilidade?",
        "answer": "Não. Navegadores web não conseguem interagir com fotodiodos de laboratório nem com os contadores de desgaste do painel. O Screen Tester disponibiliza padrões visuais, mas medições certificadas exigem instrumentação profissional."
      }
    ],
    "relatedTestIds": [
      "burn-in-test",
      "brightness-test",
      "hdr-test",
      "uniformity-test",
      "near-black-test"
    ],
    "relatedTroubleshootingIds": [
      "uneven-brightness",
      "hdr-not-working"
    ],
    "relatedArticleSlugs": [
      "display-uniformity",
      "black-levels-and-shadow-detail",
      "hdr-display-fundamentals"
    ],
    "primarySearchIntent": "oled abl pixel shifting burn in image retention test",
    "readingTimeMinutes": 10
  },
  {
    "slug": "tv-overscan-and-pixel-mapping",
    "category": "tv-and-display-setup",
    "title": "Overscan de TV e Mapeamento de Pixels 1:1",
    "subtitle": "Corte de margens, escala HDMI, Just Scan e perda de definição ao conectar o PC.",
    "description": "Entenda a causa do overscan em televisores, o corte das bordas da área de trabalho e como ativar mapeamento 1:1 sem zoom.",
    "directAnswer": "O overscan é uma herança de televisores antigos que corta de 2% a 5% das bordas da imagem, ampliando a cena e desfocando os pixels do computador.",
    "whyItMatters": "Conectar um computador a uma TV com overscan ativo degrada a legibilidade do texto, forçando interpolação em vez de preservar os pixels reais.",
    "whatToLookFor": [
      "The Windows taskbar, start button, or window close buttons cut off by the television frame",
      "Blurry, smudged desktop fonts that look far softer than on a standard computer monitor",
      "A fuzzy halo or ringing artifacts along the edges of high-contrast text and icons",
      "Outer 1-pixel border test lines completely invisible when viewing in fullscreen"
    ],
    "howToTest": [
      "Open the TV Overscan & 1:1 Pixel Mapping Test in Screen Tester and toggle Fullscreen mode (press F11)",
      "Check if all four colored 1px, 2px, and 5px outer border lines are fully visible around the top, bottom, left, and right edges",
      "Inspect the central and corner checkerboard patches for moiré shimmering or distortion"
    ],
    "whatScreenTesterCanObserve": [
      "Fullscreen calibrated 1-pixel outer border boundaries and corner registration arrows",
      "High-frequency 1:1 alternating black and white checkerboard test patches",
      "User visual verification of edge cut-off under unscaled browser canvas presentation"
    ],
    "whatScreenTesterCannotDetermine": [
      "Television internal EDID profile negotiation or manufacturer picture preset mode names",
      "HDMI port hardware input labeling (e.g., whether the port is labeled 'PC' or 'Game')",
      "Internal scaler spatial filtering algorithms inside the television SoC"
    ],
    "commonCauses": [
      "Television picture aspect ratio set to '16:9' or 'Standard' instead of 'Just Scan', 'Screen Fit', or '1:1'",
      "HDMI input port on the television not renamed or designated as 'PC' in television input settings",
      "GPU driver control panel (NVIDIA/AMD/Intel) has 'Desktop Resizing' or underscan scaling enabled",
      "AV receiver or HDMI switch applying secondary video processing to the pass-through signal"
    ],
    "whatToDoNext": [
      "On your TV remote, open Picture / Screen Settings, find Aspect Ratio, and change it to 'Just Scan', 'Screen Fit', 'Dot by Dot', or 'Original'",
      "In the TV input source list, edit the HDMI icon and name to 'PC' (this automatically disables overscan and post-processing on LG, Samsung, and Sony TVs)",
      "Open your GPU control panel and reset desktop size / scaling adjustments to 100% with no underscan"
    ],
    "sections": [
      {
        "title": "The Historical Origin of Overscan",
        "content": [
          "In the cathode-ray tube (CRT) era, analogue broadcast video signals contained electrical timing noise, blanking intervals, and broadcast data (like closed captions) along the extreme outer edges of the frame.",
          "Television manufacturers engineered CRT electron beams to intentionally scan 5% beyond the visible tube bezel (overscan) to hide this ugly edge noise from viewers.",
          "When digital flat panels arrived, manufacturers kept overscan enabled by default on TV HDMI inputs to maintain backwards compatibility with analogue cable broadcasts, creating a headache for modern digital PC inputs."
        ]
      }
    ],
    "faq": [
      {
        "question": "Why does my PC desktop look blurry when connected to a 4K TV?",
        "answer": "If overscan is active, the TV crops the outer edge of your 3840 × 2160 signal and scales the remaining ~3650 × 2050 image up to fill the glass, forcing bilinear interpolation across every single pixel. Enabling 1:1 pixel mapping restores crisp, sharp text."
      },
      {
        "question": "What is the overscan setting called on different TV brands?",
        "answer": "LG calls it 'Just Scan: On'. Samsung calls it 'Picture Size: Screen Fit'. Sony calls it 'Wide Mode: Full' with 'Display Area: Full Pixel'. Panasonic calls it '1:1 Pixel Mapping' or 'HD Size: 2'."
      }
    ],
    "relatedTestIds": [
      "tv-overscan-test",
      "scaling-aspect-test",
      "resolution-checker"
    ],
    "relatedTroubleshootingIds": [
      "tv-overscan-fit",
      "wrong-resolution"
    ],
    "relatedArticleSlugs": [
      "resolution-and-scaling",
      "aspect-ratio-and-scaling-artifacts"
    ],
    "primarySearchIntent": "tv overscan bordas cortadas mapeamento de pixels 1 a 1 just scan",
    "readingTimeMinutes": 5
  },
  {
    "slug": "aspect-ratio-and-scaling-artifacts",
    "category": "tv-and-display-setup",
    "title": "Proporção de Tela, Letterboxing e Artefatos de Escalonamento",
    "subtitle": "16:9, 16:10, 21:9 ultrawide, distorção geométrica e escala via GPU vs monitor.",
    "description": "Aprenda como funcionam as proporções, por que resoluções não nativas ficam borradas e como evitar distorções com escala por inteiros.",
    "directAnswer": "A proporção da tela é a relação proporcional entre largura e altura do monitor; escalas incorretas deformam círculos transformando-os em ovais.",
    "whyItMatters": "Proporções incorretas achatam ou esticam rostos e interfaces; escalas não inteiras produzem borrão por interpolação visual.",
    "whatToLookFor": [
      "Geometric distortion: Circles appearing as squashed or stretched ovals",
      "Stretching: 4:3 retro games or 16:9 console video stretched unnaturally across a 21:9 ultrawide monitor",
      "Letterboxing (black bars on top and bottom) or pillarboxing (black bars on left and right sides)",
      "Moiré interference patterns across fine text, hatch patterns, or checkerboards"
    ],
    "howToTest": [
      "Run the Scaling & Aspect Ratio test in Screen Tester to inspect concentric geometric circles and calibrated square grids",
      "Verify that circles appear perfectly round with a physical ruler or visual calibration across all axes",
      "Switch between 16:9, 16:10, 4:3, and 21:9 framing overlays to test how your monitor handles varied input ratios"
    ],
    "whatScreenTesterCanObserve": [
      "Rendering of precision concentric geometric circles and square aspect grids",
      "Reference framing boundaries for standard display aspect ratios",
      "Browser viewport aspect ratio calculations (`window.innerWidth / window.innerHeight`)"
    ],
    "whatScreenTesterCannotDetermine": [
      "Monitor chassis internal scaler chip interpolation algorithms (bicubic vs. bilinear vs. nearest neighbor)",
      "Hardware GPU scaling pipeline latency overhead in microseconds",
      "Physical panel curvature geometry distortion on curved ultrawide displays"
    ],
    "commonCauses": [
      "Monitor OSD aspect ratio setting forced to 'Wide / Full' instead of 'Auto' or 'Aspect'",
      "GPU control panel scaling mode configured to 'Stretch' instead of 'Perform scaling on: GPU - Aspect Ratio'",
      "Playing a console (like PS5 or Nintendo Switch) locked to 16:9 output on a 21:9 ultrawide or 16:10 laptop screen",
      "Operating system display resolution set to an incompatible aspect ratio (e.g., 1920 × 1080 selected on a 1920 × 1200 panel)"
    ],
    "whatToDoNext": [
      "Open your monitor OSD and set Aspect Ratio to 'Aspect' or 'Original' so black bars preserve true geometry",
      "In NVIDIA Control Panel or AMD Software, set scaling to 'Aspect ratio' or 'No scaling'",
      "Ensure games and desktop applications are configured to your display's native aspect ratio in graphics settings"
    ],
    "sections": [
      {
        "title": "Common Aspect Ratios Explained",
        "content": [
          "16:9 (1.78:1): The ubiquitous consumer standard for televisions, YouTube video, and modern gaming (1920×1080, 2560×1440, 3840×2160).",
          "16:10 (1.60:1): Common in modern productivity laptops (MacBook, Dell XPS) and office monitors, providing extra vertical height for documents and code (1920×1200, 2560×1600).",
          "21:9 (2.39:1): Ultrawide format matching anamorphic cinema film, offering expansive peripheral vision for gaming and multitasking (2560×1080, 3440×1440, 5120×2160)."
        ]
      }
    ],
    "faq": [
      {
        "question": "Should I perform scaling on the GPU or on the Display?",
        "answer": "In general, GPU scaling is preferred because modern graphics cards have powerful hardware scalers that support integer scaling and preserve aspect ratios reliably across multiple monitors."
      },
      {
        "question": "Will black bars (letterboxing) damage my OLED screen?",
        "answer": "Black bars turn off OLED pixels completely (0 nits), so they do not cause wear. However, over thousands of hours, the active center image will age slightly faster than the black bar areas, potentially leaving a subtle boundary line. Avoid permanently running 16:9 content on a 21:9 OLED without varied full-screen use."
      }
    ],
    "relatedTestIds": [
      "scaling-aspect-test",
      "tv-overscan-test",
      "resolution-checker"
    ],
    "relatedTroubleshootingIds": [
      "tv-overscan-fit",
      "wrong-resolution"
    ],
    "relatedArticleSlugs": [
      "resolution-and-scaling",
      "tv-overscan-and-pixel-mapping"
    ],
    "primarySearchIntent": "proporcao de tela letterbox barras pretas esticamento escala",
    "readingTimeMinutes": 5
  },
  {
    "slug": "multi-touch-and-touchscreen-testing",
    "category": "device-and-input",
    "title": "Testes de Multitoque e Digitalizador Touchscreen",
    "subtitle": "Digitalizadores capacitivos projetados, eventos de toque, rastreamento múltiplo e latência.",
    "description": "Descubra como os digitalizadores detectam toques múltiplos, o valor reportado em navigator.maxTouchPoints e como achar zonas mortas.",
    "directAnswer": "O multitoque é a capacidade de uma tela registrar e acompanhar múltiplos pontos de contato simultâneos na superfície de vidro.",
    "whyItMatters": "Digitalizadores defeituosos desenvolvem zonas sem resposta ou toques fantasma que disparam comandos involuntários.",
    "whatToLookFor": [
      "Dead touch zones: Areas on the screen where finger contact fails to register or breaks during drags",
      "Ghost touches: Phantom touches registered automatically when the screen is idle, opening apps or moving menus",
      "Dropped touch points: The contact counter decreasing when placing additional fingers on the surface",
      "Edge touch rejection: Inability to register taps near the extreme perimeter or corners of the glass"
    ],
    "howToTest": [
      "Launch the Multi-Touch Test in Screen Tester on your phone, tablet, or touch-enabled laptop",
      "Place 2, 3, 5, and 10 fingers on the glass simultaneously to observe active contact IDs and peak counters",
      "Switch to Grid Mode and touch every quadrant to verify that all digitizer zones register contacts cleanly",
      "Perform the Hold Challenge to verify that simultaneous contacts remain stable without flickering"
    ],
    "whatScreenTesterCanObserve": [
      "DOM Pointer Events (`pointerdown`, `pointermove`, `pointerup`, `pointercancel`) and Touch Events",
      "Active contact count, individual Pointer IDs, coordinate positions (X/Y), and contact pressure (if exposed)",
      "Peak simultaneous contact count registered during the test session",
      "`navigator.maxTouchPoints` reported by the browser environment"
    ],
    "whatScreenTesterCannotDetermine": [
      "Physical digitizer sensor matrix hardware polling rate in Hertz (e.g., 120Hz vs 240Hz touch sampling)",
      "Capacitive electrical resistance changes across raw ITO electrode diamond grids",
      "Hardware palm-rejection firmware algorithms operating beneath the operating system driver"
    ],
    "commonCauses": [
      "Damaged digitizer flex cable or cracked glass breaking electrical matrix continuity",
      "Poor-quality third-party USB charger introducing high-frequency AC electrical noise, causing ghost touches",
      "Operating system or browser gesture engines intercepting edge swipes (like back/forward navigation gestures)",
      "Thick or damaged screen protector creating excessive capacitive standoff distance"
    ],
    "whatToDoNext": [
      "Unplug your device from the charger to test if erratic ghost touches stop (isolating noisy ground loop power adapters)",
      "Clean the glass surface thoroughly: moisture, oil, or water drops register as continuous capacitive contacts",
      "Remove damaged screen protectors that may have air bubbles or adhesive separation"
    ],
    "sections": [
      {
        "title": "How Projected Capacitive (PCAP) Touch Works",
        "content": [
          "Modern smartphones, tablets, and touch laptops use Projected Capacitive (PCAP) digitizers: an ultra-thin grid of transparent conductive traces (Indium Tin Oxide) laminated beneath the cover glass.",
          "When a conductive human finger approaches the glass, it draws a minute electrical current, altering the local electrostatic capacitance. The digitizer controller scans the grid hundreds of times per second to triangulate the exact X/Y position of each touch."
        ]
      }
    ],
    "faq": [
      {
        "question": "Why does my phone only show 5 touches when it supports 10?",
        "answer": "Certain mobile browsers or battery-saver operating system modes cap active pointer event tracking to conserve CPU resources, or built-in multi-finger gesture listeners (like 3-finger screenshot gestures) consume contacts before passing them to the web page."
      },
      {
        "question": "Can software fix a dead touch zone?",
        "answer": "If a specific physical stripe across the screen never registers touch, the ITO trace or digitizer controller ribbon cable is physically fractured. This requires physical screen replacement."
      }
    ],
    "relatedTestIds": [
      "multi-touch-test",
      "touch-screen-test"
    ],
    "relatedTroubleshootingIds": [
      "multi-touch-issues"
    ],
    "relatedArticleSlugs": [
      "mobile-motion-sensors-accelerometer-gyroscope",
      "what-browser-display-tests-can-and-cannot-measure"
    ],
    "primarySearchIntent": "teste multitouch tela de toque toques fantasmas digitalizador",
    "readingTimeMinutes": 5
  },
  {
    "slug": "webcam-diagnostics-and-privacy",
    "category": "device-and-input",
    "title": "Diagnóstico de Webcam, Taxa de Quadros e Privacidade",
    "subtitle": "WebRTC getUserMedia, resoluções negociadas, quedas de quadros por iluminação e privacidade local.",
    "description": "Aprenda como os navegadores acessam a câmera, a influência da exposição nos FPS e as garantias de privacidade de um teste estritamente local.",
    "directAnswer": "O teste de webcam afere disponibilidade física, resolução real negociada, estabilidade de FPS e equilíbrio de cores através de fluxos WebRTC locais.",
    "whyItMatters": "Webcams frequentemente perdem fluidez em ambientes escuros ou enfrentam bloqueios de permissão; testá-las em local garante reuniões tranquilas.",
    "whatToLookFor": [
      "Choppy, stuttering video feeds that drop from 30 FPS down to 15 FPS in normal room lighting",
      "Distorted aspect ratios where your face looks stretched horizontally or squeezed vertically",
      "Grainy, noisy video caused by high digital sensor gain (ISO) compensating for inadequate lighting",
      "Browser permission errors or 'Camera in use by another application' blocking access"
    ],
    "howToTest": [
      "Open the Webcam Test in Screen Tester and grant camera permission when prompted by your browser",
      "Inspect the live stream resolution badge (e.g., 1920 × 1080 at 30 FPS) and real-time frame counter",
      "Toggle the mirror preview and capture a freeze-frame to check focus sharpness and color reproduction"
    ],
    "whatScreenTesterCanObserve": [
      "Negotiated video stream dimensions (`videoWidth`, `videoHeight`) from the active MediaStreamTrack",
      "Real-time frame delivery rate calculated from `requestVideoFrameCallback` or canvas frame rendering",
      "Available video input device labels and device IDs enumerated via `navigator.mediaDevices.enumerateDevices()`",
      "Camera permission state (`granted`, `prompt`, `denied`) via the Permissions API"
    ],
    "whatScreenTesterCannotDetermine": [
      "Physical lens optical resolving power (optical glass sharpness vs. digital sharpening filters)",
      "True sensor pixel dimensions (e.g., physical 720p sensor software-upscaled to 1080p by driver)",
      "Microphone hardware sensitivity, background noise floor, or acoustic frequency response"
    ],
    "commonCauses": [
      "Camera auto-exposure increasing shutter time to brighten dark rooms, automatically cutting frame rate in half",
      "Another application (Zoom, Teams, OBS, Discord) holding an exclusive lock on the camera hardware",
      "Operating system privacy toggle (Windows Settings > Privacy > Camera) globally blocking camera access",
      "Connecting an external webcam through an unpowered USB 2.0 hub, causing bandwidth throttling"
    ],
    "whatToDoNext": [
      "Add direct front-facing light (a desk lamp or ring light) to allow the camera to run at full 30/60 FPS shutter speeds",
      "Close background video calling applications if you receive a 'Device in use' error",
      "Check browser site permissions by clicking the padlock / tune icon in the browser address bar"
    ],
    "sections": [
      {
        "title": "Client-Side Processing & Privacy Guarantee",
        "content": [
          "Screen Tester processes webcam video streams strictly in local device memory (RAM) within your active browser tab.",
          "Video frames are drawn onto a client-side HTML5 canvas for real-time diagnostic rendering. Zero video frames, thumbnails, or telemetry data are ever transmitted to external servers or stored in cookies. When you stop the test or close the tab, all media tracks are immediately destroyed."
        ]
      }
    ],
    "faq": [
      {
        "question": "Why does my 1080p webcam only show 720p in the browser?",
        "answer": "Browsers request video using resolution constraints. If USB bandwidth is constrained or the operating system driver negotiates standard compatibility modes, the browser defaults to 720p. You can select specific resolution constraints in advanced software."
      },
      {
        "question": "Does the Webcam Test access my microphone?",
        "answer": "No. Screen Tester explicitly requests `{ video: true, audio: false }`. Your microphone is never accessed, initialized, or monitored during the webcam test."
      }
    ],
    "relatedTestIds": [
      "webcam-test"
    ],
    "relatedTroubleshootingIds": [
      "webcam-issues"
    ],
    "relatedArticleSlugs": [
      "browser-compatibility-and-hardware-apis",
      "what-browser-display-tests-can-and-cannot-measure"
    ],
    "primarySearchIntent": "teste webcam fps resolucao privacidade diagnostico camera",
    "readingTimeMinutes": 5
  },
  {
    "slug": "audio-channel-testing-and-stereo-separation",
    "category": "device-and-input",
    "title": "Separação de Canais de Áudio e Teste Estéreo",
    "subtitle": "Web Audio API, balanço estéreo, fase acústica, varredura de frequências e limites físicos.",
    "description": "Teste canais esquerdo e direito para checar isolamento sonoro, alinhamento de fase e resposta acústica usando a Web Audio API.",
    "directAnswer": "O teste de áudio estéreo confirma se os canais esquerdo e direito reproduzem sons separados e balanceados, sem cancelamento de fase ou vazamentos.",
    "whyItMatters": "Canais invertidos prejudicam a imersão espacial em jogos; cancelamentos de fase tornam vozes abafadas e esvaziam os graves.",
    "whatToLookFor": [
      "Reversed channels: Test tones intended for the left speaker playing from the right speaker",
      "Channel crosstalk: Audio bleeding into the right speaker when testing the left channel exclusively",
      "Phase cancellation: Sound becoming thin, hollow, or disappearing when both channels play simultaneously",
      "Distortion or rattling at specific low frequencies during continuous tone sweeps"
    ],
    "howToTest": [
      "Open the Speaker Test in Screen Tester and set your system volume to a comfortable listening level",
      "Click 'Test Left Channel' to verify sound emerges exclusively from your left speaker or earphone",
      "Click 'Test Right Channel' to verify sound emerges exclusively from your right speaker or earphone",
      "Run the Frequency Sweep (20Hz to 20,000Hz) to test your audio setup across the audible acoustic spectrum"
    ],
    "whatScreenTesterCanObserve": [
      "Web Audio API sound generation via pure mathematical oscillator nodes (`OscillatorNode`)",
      "Precise stereo coordinate panning using `StereoPannerNode` set to full left (-1.0) and full right (+1.0)",
      "Generation of calibrated white noise, pink noise, and linear/logarithmic continuous frequency sweeps"
    ],
    "whatScreenTesterCannotDetermine": [
      "Physical sound pressure level (SPL) in decibels (dB) without a calibrated measurement microphone",
      "Total Harmonic Distortion (THD) of the physical speaker cone or amplifier circuitry",
      "Physical acoustic room reflections, standing waves, or acoustic phase cancelation in your room"
    ],
    "commonCauses": [
      "Headphones or auxiliary audio cables plugged in backwards or reversed",
      "Operating system 'Mono Audio' accessibility toggle turned ON, forcing all audio into a merged mono signal",
      "Loose or partially inserted 3.5mm audio jack, causing ground loop humming or missing channels",
      "Surround sound virtualization software (Dolby Atmos, Sonic, Nahimic) blending channels for simulated 3D audio"
    ],
    "whatToDoNext": [
      "Ensure your 3.5mm or USB audio connector is fully seated into the jack",
      "Open Windows Sound Settings > Accessibility > Audio and ensure 'Mono Audio' is turned OFF",
      "If using external desktop speakers, check the physical RCA or 3.5mm audio cable connections on the rear sub"
    ],
    "sections": [
      {
        "title": "The Web Audio API Pipeline",
        "content": [
          "Screen Tester generates audio directly in software using the browser's native Web Audio API. When you initiate a test, an `AudioContext` is created with a sample rate of 44.1kHz or 48kHz.",
          "An `OscillatorNode` generates a pure mathematical sine wave with zero harmonic distortion. The signal routes through a `StereoPannerNode` that adjusts the left/right gain matrix before feeding into the destination output. When stopped, oscillators and audio contexts are closed immediately to free audio threads."
        ]
      }
    ],
    "faq": [
      {
        "question": "Why can't I hear frequencies below 40Hz in the sweep test?",
        "answer": "Most laptop speakers, small desktop monitors, and budget earphones cannot physically reproduce frequencies below 50Hz. Low bass reproduction requires large speaker cones or subwoofers capable of moving substantial air volumes."
      },
      {
        "question": "Why can't I hear frequencies above 15,000Hz?",
        "answer": "Human high-frequency hearing naturally declines with age (presbycusis). While healthy children can hear up to 20,000Hz, most adults above age 25 have a natural hearing cutoff between 14,000Hz and 17,000Hz."
      }
    ],
    "relatedTestIds": [
      "speaker-test",
      "microphone-test"
    ],
    "relatedTroubleshootingIds": [
      "speaker-issues",
      "microphone-issues"
    ],
    "relatedArticleSlugs": [
      "webcam-diagnostics-and-privacy",
      "what-browser-display-tests-can-and-cannot-measure"
    ],
    "primarySearchIntent": "teste audio estereo canal esquerdo direito balanceamento som fase",
    "readingTimeMinutes": 5
  },
  {
    "slug": "mobile-motion-sensors-accelerometer-gyroscope",
    "category": "device-and-input",
    "title": "Sensores de Movimento Móvel: Acelerômetro e Giroscópio",
    "subtitle": "DeviceMotionEvent, DeviceOrientationEvent, vetores nos 3 eixos e restrições de permissão.",
    "description": "Descubra como aparelhos móveis registram movimento e orientação, as APIs utilizadas e como as permissões de segurança funcionam.",
    "directAnswer": "Acelerômetros medem aceleração linear e força gravitacional em três eixos (X, Y, Z), enquanto giroscópios captam a velocidade angular de rotação.",
    "whyItMatters": "Sensores de movimento orientam jogos, realidade virtual e estabilização de fotos; diagnósticos isolam falhas físicas de bloqueios de software.",
    "whatToLookFor": [
      "Orientation bubble failing to move when you tilt your phone or tablet",
      "Erratic sensor jumping or drift when the device is placed on a completely flat, stationary table",
      "Browser permission prompts failing or silently blocking motion event delivery on iOS devices",
      "Sensor unavailable notices on desktop PCs that lack physical motion hardware"
    ],
    "howToTest": [
      "Open the Accelerometer Test or Gyroscope Test in Screen Tester on a smartphone or tablet",
      "Tap 'Start Sensor' and tap 'Allow' if your browser prompts for permission (required on iOS Safari)",
      "Tilt your device along all axes to observe real-time G-force reticle displacement and degree angles"
    ],
    "whatScreenTesterCanObserve": [
      "Real-time linear acceleration values (`acceleration.x`, `y`, `z`) in m/s² from `DeviceMotionEvent`",
      "Total acceleration including gravity (`accelerationIncludingGravity`) along all three axes",
      "Rotational rate angles (`rotationRate.alpha`, `beta`, `gamma`) in degrees per second",
      "Device orientation angles (`alpha`, `beta`, `gamma`) from `DeviceOrientationEvent`"
    ],
    "whatScreenTesterCannotDetermine": [
      "Internal microelectromechanical (MEMS) sensor chip calibration tolerances",
      "Compass magnetic declination offsets or geomagnetic interference levels",
      "Presence of physical accelerometer silicon on desktop PCs lacking sensor hardware"
    ],
    "commonCauses": [
      "Testing on a desktop computer: standard desktop PCs and external monitors have no accelerometer hardware",
      "iOS Safari permission requirement: Apple requires explicit user gesture permission via `DeviceMotionEvent.requestPermission()`",
      "Browser security sandbox: sensors are completely blocked inside non-secure HTTP connections (HTTPS is required)",
      "Sensor disabled in mobile browser settings (e.g., Chrome Mobile 'Motion Sensors' toggle set to Blocked)"
    ],
    "whatToDoNext": [
      "Ensure you are accessing Screen Tester over a secure HTTPS connection",
      "On iPhone or iPad, tap 'Allow' when the system dialog asks if you want to allow motion sensors",
      "Perform a device restart if sensors become unresponsive across all operating system applications"
    ],
    "sections": [
      {
        "title": "Accelerometer vs. Gyroscope: How They Cooperate",
        "content": [
          "An accelerometer detects gravity: when resting flat on a table, it measures 9.8 m/s² along the vertical Z axis and 0 m/s² on X and Y.",
          "A gyroscope detects rotational velocity: it measures how fast your phone is spinning around each axis in degrees per second.",
          "Operating systems use sensor fusion algorithms (such as Kalman filters) to combine accelerometer and gyroscope data into stable 3D orientation tracking."
        ]
      }
    ],
    "faq": [
      {
        "question": "Why does the motion test say 'Sensor Unavailable' on my laptop?",
        "answer": "Most traditional desktop computers and standard clamshell laptops do not have MEMS accelerometers installed on their motherboards. These sensors are standard in smartphones, tablets, and 2-in-1 convertible convertibles."
      },
      {
        "question": "Why does iOS require permission for motion sensors?",
        "answer": "Apple introduced explicit permission requirements in iOS 13 to prevent web tracking scripts from fingerprinting users or estimating keystrokes based on microscopic table vibration telemetry."
      }
    ],
    "relatedTestIds": [
      "accelerometer-test",
      "gyroscope-test",
      "vibration-test"
    ],
    "relatedTroubleshootingIds": [
      "accelerometer-issues",
      "gyroscope-issues"
    ],
    "relatedArticleSlugs": [
      "multi-touch-and-touchscreen-testing",
      "browser-compatibility-and-hardware-apis"
    ],
    "primarySearchIntent": "teste acelerometro giroscopio sensor movimento celular orientacao",
    "readingTimeMinutes": 5
  },
  {
    "slug": "what-browser-display-tests-can-and-cannot-measure",
    "category": "browser-and-testing",
    "title": "O Que os Testes de Tela no Navegador Podem e Não Podem Medir",
    "subtitle": "Referência técnica sobre recursos de Web APIs, observação no cliente e limites físicos.",
    "description": "Entenda os limites técnicos dos testes no navegador: o que a programação web pode avaliar e o que depende exclusivamente de aparelhos laboratoriais.",
    "directAnswer": "Navegadores conseguem renderizar cores matematicamente exatas e registrar intervalos de quadros, mas não têm como medir luz emitida, precisão Delta E nem tempo de resposta físico.",
    "whyItMatters": "Muitos sites divulgam que medem nits ou fidelidade Delta E por navegador; compreender os limites reais previne diagnósticos falsos.",
    "whatToLookFor": [
      "Websites claiming to measure physical monitor brightness in nits without a photometer probe (scientifically impossible)",
      "Tools claiming to certify Delta E color accuracy through a web browser (requires a spectrophotometer)",
      "Tools claiming to measure 1ms GtG response times without a high-speed optical pursuit camera",
      "Websites claiming to repair physically broken liquid crystal transistors through software flashing"
    ],
    "howToTest": [
      "Use browser tests for what they excel at: high-contrast visual defect screening, stepped grayscale calibration, and frame pacing diagnostics",
      "Combine browser reference patterns with controlled ambient room lighting and careful human visual inspection",
      "Check the Display Information tool to review exactly what properties your browser environment exposes"
    ],
    "whatScreenTesterCanObserve": [
      "Exact 24-bit and 32-bit RGB color values rendered to HTML5 canvas and WebGL frame buffers",
      "Browser animation timing intervals (`performance.now()`, `requestAnimationFrame`) to estimate refresh rates",
      "Operating system logical viewport dimensions and device pixel scaling ratios (`devicePixelRatio`)",
      "User-reported visual defect markings and interactive diagnostic pass/fail notes"
    ],
    "whatScreenTesterCannotDetermine": [
      "Physical photometric luminance in nits (cd/m²) emitted by the panel backlight or OLED pixels",
      "Color accuracy errors (Delta E) or color gamut volume percentages without a colorimeter sensor",
      "Physical pixel response time (GtG milliseconds) without high-speed photodiode optical oscilloscopes",
      "Hardware monitor internal scalar LUT (Look-Up Table) calibration curves"
    ],
    "commonCauses": [
      "Unscientific marketing claims made by legacy display testing websites",
      "Confusion between digital canvas pixel values (e.g., RGB 255, 255, 255) and physical emitted brightness (nits)",
      "Assuming browser window resolution matches physical panel pixel grid when OS display scaling is active"
    ],
    "whatToDoNext": [
      "Use Screen Tester for visual inspection, panel defect screening, and baseline calibration",
      "If you require certified laboratory calibration for color-critical prepress or film grading, invest in a hardware colorimeter (Calibrite Display Plus or Datacolor Spyder)",
      "Always inspect display patterns with operating system scaling at 100% and ambient lighting properly controlled"
    ],
    "sections": [
      {
        "title": "The Sandbox Principle of Web Browsers",
        "content": [
          "Web browsers are secure application sandboxes designed to protect user privacy and system security. They intentionally isolate web pages from low-level GPU registers, I2C bus monitor communications (DDC/CI), and raw physical hardware sensors.",
          "A browser can command the GPU to draw a solid white box, but it has no physical sensor or photodiode to know how much light actually leaves the glass. That observation belongs to the human user."
        ]
      }
    ],
    "faq": [
      {
        "question": "Can any website measure my monitor's true brightness in nits?",
        "answer": "No. Emitted luminance in nits (candela per square meter) is a physical measurement of photons. Without an external optical sensor placed against the glass, no web browser or software tool can measure nits."
      },
      {
        "question": "What makes Screen Tester different from other test tools?",
        "answer": "Screen Tester adheres strictly to technical honesty: we explain exactly what is observed in browser memory versus what requires physical measurement, eliminating marketing exaggerations."
      }
    ],
    "relatedTestIds": [
      "display-info",
      "color-test",
      "brightness-test",
      "ghosting-test"
    ],
    "relatedTroubleshootingIds": [
      "no-image",
      "washed-out-colors"
    ],
    "relatedArticleSlugs": [
      "browser-compatibility-and-hardware-apis",
      "hdr-display-fundamentals"
    ],
    "primarySearchIntent": "testes de tela navegador limites medir nits delta e precisao",
    "readingTimeMinutes": 6
  },
  {
    "slug": "browser-compatibility-and-hardware-apis",
    "category": "browser-and-testing",
    "title": "Compatibilidade de Navegadores e APIs Web de Hardware",
    "subtitle": "Diferenças entre Chromium, Gecko e WebKit, e suporte a recursos de hardware.",
    "description": "Veja como Chromium, Gecko e WebKit lidam com APIs de tela, áudio e sensores, e as políticas de segurança de cada plataforma.",
    "directAnswer": "A compatibilidade de navegadores expressa o nível de conformidade de diferentes motores (Blink, Gecko, WebKit) na implementação de padrões para hardware.",
    "whyItMatters": "Recursos como vibração háptica funcionam no Chrome no Android mas são bloqueados de forma intencional no Safari no iOS por regras de privacidade.",
    "whatToLookFor": [
      "Vibration API (`navigator.vibrate`) not functioning on desktop browsers or iOS Safari",
      "Motion sensor events requiring explicit permission taps on iOS Safari but running automatically on Android Chrome",
      "Fullscreen API behaving differently on mobile phones versus desktop monitors",
      "Color gamut negotiation differing between macOS Safari (Display P3) and Windows Chrome"
    ],
    "howToTest": [
      "Open the Browser Compatibility tool in Screen Tester to inspect support status across 16 core Web APIs",
      "Review the compatibility status table for your specific active browser and operating system",
      "Test hardware features on alternate browsers (such as Firefox or Edge) if an API is unavailable"
    ],
    "whatScreenTesterCanObserve": [
      "Feature detection of global API objects in the `window` and `navigator` namespaces",
      "Support flags for Web Audio, WebRTC, Pointer Events, Fullscreen, Vibration, and Motion APIs",
      "User agent and browser engine characteristics for diagnostic compatibility grouping"
    ],
    "whatScreenTesterCannotDetermine": [
      "Unreleased or experimental browser flag toggles (`chrome://flags` or `about:config`)",
      "Operating-system level firewall or enterprise group policy restrictions",
      "Third-party privacy extension script blocking behavior"
    ],
    "commonCauses": [
      "Safari / WebKit policy omitting non-standard hardware APIs (like Web Vibration API) for privacy reasons",
      "Accessing a website over unencrypted HTTP: modern browsers disable camera, microphone, and motion APIs on non-HTTPS origins",
      "Strict browser tracking protection or privacy extensions blocking sensor event listeners",
      "Running an outdated browser version lacking modern WebRTC or Canvas 2D color space extensions"
    ],
    "whatToDoNext": [
      "Keep your web browser updated to the latest stable release",
      "Always connect via secure HTTPS to ensure all modern browser Web APIs are unlocked",
      "Use Chrome or Edge on Android when testing physical vibration and haptic feedback"
    ],
    "sections": [
      {
        "title": "API Support Across Major Engines",
        "content": [
          "Chromium (Google Chrome, Microsoft Edge, Brave): Broadest hardware API implementation, including Vibration API, Screen Wake Lock, and Fullscreen API.",
          "Gecko (Mozilla Firefox): Strong standards compliance, excellent canvas rendering and Web Audio support, conservative hardware sensor implementation.",
          "WebKit (Apple Safari): Strict privacy sandboxing, requires explicit user gestures for sensors, omits Vibration API, but provides leading Color Management and Display P3 wide gamut support on Apple displays."
        ]
      }
    ],
    "faq": [
      {
        "question": "Why doesn't the Vibration Test vibrate my iPhone?",
        "answer": "Apple has intentionally never implemented the Web Vibration API in WebKit/Safari to prevent web advertisements and spam sites from triggering intrusive device haptics. Physical vibration testing requires an Android device running Chrome or Firefox."
      },
      {
        "question": "Do I need to install any browser extensions to use Screen Tester?",
        "answer": "No. Screen Tester is 100% zero-install and client-side. It operates entirely on native standard W3C Web APIs supported natively by modern web browsers."
      }
    ],
    "relatedTestIds": [
      "display-info",
      "vibration-test",
      "webcam-test",
      "microphone-test"
    ],
    "relatedTroubleshootingIds": [
      "vibration-issues",
      "webcam-issues",
      "microphone-issues"
    ],
    "relatedArticleSlugs": [
      "what-browser-display-tests-can-and-cannot-measure",
      "webcam-diagnostics-and-privacy"
    ],
    "primarySearchIntent": "compatibilidade navegadores web apis hardware chromium webkit gecko",
    "readingTimeMinutes": 5
  }
];
