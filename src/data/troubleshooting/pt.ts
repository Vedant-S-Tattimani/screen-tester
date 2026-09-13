import { TroubleshootingTopic } from "./types";

export const PT_TROUBLESHOOTING_TOPICS: TroubleshootingTopic[] = [
  {
    "id": "no-image",
    "title": "Sem imagem (tela preta / vazia)",
    "category": "display",
    "categoryTitle": "Problemas de exibição",
    "symptom": "O LED de alimentação do monitor pode acender, mas o painel permanece totalmente escuro, sem imagem, ícones ou luz de fundo.",
    "possibleCauses": [
      "Cabo de energia da tela ou fonte externa desconectada ou frouxa",
      "Monitor ajustado para a fonte de entrada errada (ex.: HDMI 2 em vez de DisplayPort 1)",
      "Cabo de vídeo frouxo, solto ou danificado entre a placa de vídeo e o monitor",
      "Dispositivo de origem em suspensão profunda, hibernação ou travamento do driver de vídeo",
      "Combinação de resolução e taxa de atualização incompatível enviada durante a inicialização",
      "Falha na placa de alimentação interna, no inversor do backlight ou na placa lógica T-Con"
    ],
    "checks": [
      "Observe o LED do monitor: Apagado (sem energia), âmbar/laranja (espera) ou branco/azul contínuo (ativo)?",
      "Pressione os botões físicos do menu OSD na carcaça do monitor: O menu de fábrica aparece? (Se aparecer, o painel funciona e a falha está no sinal ou no cabo)",
      "Reconecte com firmeza ambas as pontas do cabo DisplayPort ou HDMI na GPU e no monitor",
      "Certifique-se de conectar o cabo diretamente na placa de vídeo dedicada (GPU), não na porta de vídeo da placa-mãe",
      "Teste com outro cabo de vídeo comprovadamente funcional ou em uma porta de entrada diferente"
    ],
    "whatScreenTesterCanTest": {
      "description": "Assim que a exibição de imagem for restabelecida, o Screen Tester permite testar a estabilidade do sinal e gerar padrões contínuos.",
      "links": [
        {
          "label": "Informações da tela",
          "testId": "display-info",
          "testPath": "/tests/display-info"
        },
        {
          "label": "Verificador de resolução",
          "testId": "resolution-checker",
          "testPath": "/tests/resolution-checker"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Tensão da rede elétrica de CA ou saída de CC da fonte de alimentação",
      "Falha no barramento PCIe da placa-mãe ou nas linhas de tensão da GPU",
      "Continuidade dos circuitos internos do inversor ou das barras de LED"
    ],
    "actions": [
      "Desligue e ligue o monitor: Remova o cabo de força por 30 segundos, segure o botão liga/desliga por 10 segundos e reconecte",
      "Use o atalho do Windows Win + Ctrl + Shift + B para reiniciar o subsistema do driver gráfico",
      "Inicie no modo de segurança ou no BIOS UEFI para forçar um sinal básico de 1024x768 a 60 Hz",
      "Teste o monitor com uma segunda fonte de vídeo (console, notebook) para descobrir se o problema é do PC ou da tela"
    ],
    "whenToStop": "Interrompa os testes se sentir cheiro de queimado, ouvir zumbidos agudos de capacitores ou se o menu OSD não aparecer com os cabos desconectados."
  },
  {
    "id": "no-signal",
    "title": "Sem sinal / Cabo não conectado",
    "category": "display",
    "categoryTitle": "Problemas de exibição",
    "symptom": "O monitor liga e exibe um aviso como 'Sem sinal', 'Verificar cabo de sinal' ou entra em modo de economia de energia de imediato.",
    "possibleCauses": [
      "Porta de entrada física incorreta selecionada no menu OSD do monitor",
      "Largura de banda do cabo de vídeo insuficiente ou pinos tortos no conector DisplayPort/HDMI",
      "Dock USB-C / Thunderbolt, switch KVM ou adaptador com falha na negociação de sinal",
      "O sistema operacional está enviando uma frequência de atualização ou resolução incompatível",
      "Driver de vídeo desativado ou com falha durante a inicialização da tela"
    ],
    "checks": [
      "Altere manualmente a entrada no OSD de 'Auto' para a porta física utilizada",
      "Desconecte o cabo em ambas as pontas e inspecione se há pinos amassados ou sujeira",
      "Ignore adaptadores e hubs e ligue a placa de vídeo diretamente ao monitor",
      "Experimente outra saída DisplayPort ou HDMI na placa de vídeo"
    ],
    "whatScreenTesterCanTest": {
      "description": "O Screen Tester analisa o pipeline de hardware reportado pelo navegador, taxas de atualização e metadados de resolução.",
      "links": [
        {
          "label": "Informações da tela",
          "testId": "display-info",
          "testPath": "/tests/display-info"
        },
        {
          "label": "Teste de taxa de atualização",
          "testId": "refresh-rate-test",
          "testPath": "/tests/refresh-rate-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Integridade física do sinal elétrico ou atenuação do cabo",
      "Bloqueios de handshake de proteção criptográfica HDCP no firmware",
      "Danos mecânicos internos nos conectores da placa de vídeo"
    ],
    "actions": [
      "Substitua o cabo por um modelo certificado (HDMI 2.1 Ultra High Speed ou DisplayPort 1.4/2.1 VESA)",
      "Reinstale os drivers de vídeo de forma limpa usando o DDU em modo de segurança",
      "Restaure o monitor para os padrões de fábrica pelo menu OSD",
      "Atualize o firmware do monitor e da placa gráfica"
    ],
    "whenToStop": "Interrompa se vários cabos certificados e diferentes computadores não conseguirem sinal em nenhuma porta (falha na placa principal ou T-Con)."
  },
  {
    "id": "wrong-resolution",
    "title": "Resolução incorreta / Tela esticada ou com faixas pretas",
    "category": "display",
    "categoryTitle": "Problemas de exibição",
    "symptom": "A área de trabalho parece borrada, esticada, achatada ou exibe barras pretas laterais ou verticais (letterboxing/pillarboxing).",
    "possibleCauses": [
      "Sistema operacional configurado em uma resolução não nativa",
      "Escalonamento de GPU ajustado para 'Manter taxa de proporção' ou 'Centralizado' em vez de 'Tela inteira'",
      "Proporção de tela forçada de modo incorreto no OSD do monitor (ex.: 4:3 em tela 16:9)",
      "Cabo HDMI antigo limitando a largura de banda a 1080p em vez de 4K",
      "Driver de vídeo genérico ou desatualizado em uso"
    ],
    "checks": [
      "Consulte as especificações do fabricante para saber a resolução nativa do painel",
      "Nas configurações de vídeo do Windows, confirme se a resolução indicada como '(Recomendável)' está ativa",
      "No menu OSD do monitor, defina a proporção de imagem como '1:1' ou 'Auto'",
      "Verifique as opções de escala no Painel de Controle da NVIDIA ou no AMD Software"
    ],
    "whatScreenTesterCanTest": {
      "description": "O Screen Tester renderiza grades com precisão de 1 pixel e formas geométricas para revelar distorções de proporção.",
      "links": [
        {
          "label": "Verificador de resolução",
          "testId": "resolution-checker",
          "testPath": "/tests/resolution-checker"
        },
        {
          "label": "Teste de escala e proporção",
          "testId": "scaling-aspect-test",
          "testPath": "/tests/scaling-aspect-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Algoritmos de escalonamento internos do hardware do monitor em relação à GPU",
      "Corrupção de blocos EEPROM EDID na placa do monitor"
    ],
    "actions": [
      "Defina a resolução nativa exata nas configurações do sistema",
      "Atualize os drivers de vídeo diretamente nos sites da NVIDIA, AMD ou Intel",
      "Ative o dimensionamento por GPU no painel de controle e escolha a taxa de proporção",
      "Crie uma resolução personalizada (Custom Resolution) via CRU caso o EDID esteja com falhas"
    ],
    "whenToStop": "Se o próprio menu OSD do monitor for desenhado com distorções geométricas, o chip escalonador interno está avariado."
  },
  {
    "id": "wrong-refresh-rate",
    "title": "Taxa de atualização incorreta / Bloqueado em 60 Hz",
    "category": "display",
    "categoryTitle": "Problemas de exibição",
    "symptom": "Um monitor gamer de 144 Hz, 240 Hz ou 360 Hz parece engasgar e fica limitado a 60 Hz no sistema operacional.",
    "possibleCauses": [
      "O monitor está conectado com um cabo HDMI 1.4 antigo que não suporta taxas altas",
      "As configurações de exibição avançadas do Windows voltaram para 60 Hz após atualização",
      "O OSD do monitor está ajustado para DisplayPort 1.1 / 1.2 em vez de DP 1.4 com DSC",
      "O uso de múltiplos monitores com taxas diferentes interfere na sincronia da GPU",
      "A GPU integrada está controlando a saída de vídeo do notebook"
    ],
    "checks": [
      "No Windows: Configurações > Sistema > Tela > Configurações avançadas de tela > Taxa de atualização",
      "No menu OSD do monitor, verifique a versão do DisplayPort em uso (selecione DP 1.4 ou 2.1)",
      "Verifique o cabo: O DisplayPort é preferível ao HDMI para taxas elevadas no PC",
      "Ative a taxa de atualização variável (G-Sync/FreeSync) no OSD e nos drivers"
    ],
    "whatScreenTesterCanTest": {
      "description": "O Screen Tester mede os tempos de quadro com precisão via requestAnimationFrame para detectar micro-travamentos e quedas.",
      "links": [
        {
          "label": "Teste de taxa de atualização",
          "testId": "refresh-rate-test",
          "testPath": "/tests/refresh-rate-test"
        },
        {
          "label": "Teste de VRR",
          "testId": "vrr-test",
          "testPath": "/tests/vrr-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Jitter do clock de hardware nas saídas físicas da GPU",
      "Versão do firmware do módulo de hardware G-Sync"
    ],
    "actions": [
      "Configure manualmente a taxa máxima no Windows e no painel da placa de vídeo",
      "Troque para um cabo certificado DisplayPort 1.4 ou HDMI 2.1",
      "Restaure o OSD para os padrões de fábrica e ative o modo Overclock do monitor se disponível",
      "Atualize os drivers da placa de vídeo"
    ],
    "whenToStop": "Se o monitor apresentar telas pretas contínuas ao selecionar a taxa nominal máxima, há estrangulamento de banda ou defeito no painel."
  },
  {
    "id": "screen-tearing",
    "title": "Screen Tearing / Ruptura horizontal da imagem",
    "category": "display",
    "categoryTitle": "Problemas de exibição",
    "symptom": "Linhas horizontais cortam e desalinham a tela durante movimentações rápidas de câmera.",
    "possibleCauses": [
      "V-Sync desligado no jogo ou nas opções do driver da placa gráfica",
      "A taxa de quadros da GPU excede ou cai para fora da faixa de atuação do G-Sync/VRR",
      "G-Sync / FreeSync não está ativado no driver ou no OSD do monitor",
      "O jogo roda em modo janela sem bordas com composição de área de trabalho incompatível",
      "A placa gráfica entrega quadros dessincronizados em relação ao ciclo de varredura do painel"
    ],
    "checks": [
      "Verifique se o G-Sync/FreeSync está habilitado no menu OSD do monitor",
      "No Painel de Controle da NVIDIA, confirme se a opção 'Configurar G-SYNC' está marcada",
      "Verifique se o FPS ultrapassa a frequência máxima do monitor",
      "Ative o V-Sync no painel do driver e limite o FPS em 3 unidades abaixo da taxa máxima"
    ],
    "whatScreenTesterCanTest": {
      "description": "O Screen Tester exibe barras de alto contraste em alta velocidade para evidenciar linhas de rasgo e sincronismo.",
      "links": [
        {
          "label": "Teste de Screen Tearing",
          "testId": "screen-tearing-test",
          "testPath": "/tests/screen-tearing-test"
        },
        {
          "label": "Teste de VRR",
          "testId": "vrr-test",
          "testPath": "/tests/vrr-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Inconsistências de compasso de quadros (frame pacing) em motores gráficos DirectX/Vulkan",
      "Latências internas da fila de quadros (swapchain)"
    ],
    "actions": [
      "Ative o G-Sync / FreeSync",
      "Limite a taxa de quadros globalmente (ex.: 141 FPS para 144 Hz, 237 FPS para 240 Hz)",
      "Ligue o V-Sync no driver gráfico para eliminar o tearing no limite superior da taxa de atualização",
      "Utilize um cabo DisplayPort (a compatibilidade com G-Sync geralmente exige DisplayPort)"
    ],
    "whenToStop": "Se linhas horizontais persistirem em imagens estáticas ou na tela do BIOS, não se trata de tearing, mas de falha física no painel."
  },
  {
    "id": "flickering",
    "title": "Oscilação de tela / Piscadas e apagões intermitentes",
    "category": "display",
    "categoryTitle": "Problemas de exibição",
    "symptom": "A tela pisca de forma irregular, apaga por 1 a 2 segundos ou apresenta variações rápidas de luminosidade.",
    "possibleCauses": [
      "Cabo DisplayPort/HDMI de baixa qualidade ou muito longo perdendo integridade de sinal",
      "Oscilação de brilho de VRR/G-Sync (Brightness Flickering) em quedas bruscas de framerate",
      "Backlight utilizando modulação por largura de pulso (PWM) em baixa frequência",
      "Ruído elétrico proveniente de tomada ou filtro de linha instável",
      "Conflito de gerenciamento de energia no driver da placa de vídeo"
    ],
    "checks": [
      "A oscilação acontece apenas ao jogar (com G-Sync) ou também na área de trabalho?",
      "Verifique se o cabo está perfeitamente conectado nas duas extremidades",
      "Altere o brilho no menu OSD: A oscilação cessa em 100% de brilho? (Indício de PWM)",
      "Desative temporariamente o G-Sync / FreeSync"
    ],
    "whatScreenTesterCanTest": {
      "description": "O Screen Tester oferece testes de oscilação e uniformidade para avaliar respostas estroboscópicas.",
      "links": [
        {
          "label": "Teste de oscilação",
          "testId": "flicker",
          "testPath": "/tests/flicker"
        },
        {
          "label": "Teste de VRR",
          "testId": "vrr-test",
          "testPath": "/tests/vrr-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Frequência exata do PWM em quilohertz (exige sensor óptico e osciloscópio)",
      "Pequenas oscilações de voltagem na fonte de alimentação"
    ],
    "actions": [
      "Utilize um cabo certificado pela VESA de comprimento adequado",
      "Conecte o monitor diretamente a uma tomada de parede confiável",
      "No painel da GPU, desative o G-Sync para o modo janela ou ative o controle de oscilação VRR",
      "Faça uma instalação limpa dos drivers de vídeo"
    ],
    "whenToStop": "Se o painel oscilar mesmo dentro do próprio menu OSD sem nenhum cabo de vídeo conectado, a fonte interna ou os LEDs estão danificados."
  },
  {
    "id": "dead-stuck-bright-pixel",
    "title": "Pixels mortos, presos e subpixels brilhantes",
    "category": "pixels",
    "categoryTitle": "Problemas de pixels",
    "symptom": "Um ponto minúsculo fica sempre preto (morto), travado em vermelho/verde/azul (preso) ou aceso em branco brilhante.",
    "possibleCauses": [
      "Falha de gravação na matriz de transistores TFT durante a fabricação do painel",
      "Transistor sem condução (subpixel morto) ou travado em estado condutor (subpixel brilhante)",
      "Partícula de poeira presa entre as camadas polarizadoras e o substrato de vidro",
      "Dano por pressão mecânica ou limpeza com força excessiva"
    ],
    "checks": [
      "Limpe a tela com cuidado usando pano de microfibra para descartar sujeira externa",
      "Exiba fundos sólidos em tela cheia (vermelho, verde, azul, branco, preto) para identificar o ponto",
      "Use uma lente de aumento para checar se é um único subpixel ou um pixel inteiro"
    ],
    "whatScreenTesterCanTest": {
      "description": "O Screen Tester conta com localizadores de pixels defeituosos e ciclos rápidos de cores para tentar soltar cristais presos.",
      "links": [
        {
          "label": "Teste de dead pixel",
          "testId": "dead-pixel-test",
          "testPath": "/tests/dead-pixel-test"
        },
        {
          "label": "Recuperador de pixels presos",
          "testId": "stuck-pixel-fixer",
          "testPath": "/tests/stuck-pixel-fixer"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Cobertura de garantia pela norma ISO 9241-307 sem contagem manual",
      "Danos físicos microscópicos nas camadas semicondutoras"
    ],
    "actions": [
      "Deixe a ferramenta de reparo de pixel preso rodando sobre o local por 20 a 30 minutos",
      "Consulte os critérios da garantia do fabricante quanto a defeitos de pixels",
      "Solicite a troca comercial se ainda estiver dentro do prazo de devolução",
      "Não pressione a tela com os dedos (isso pode danificar os transistores vizinhos)"
    ],
    "whenToStop": "Pixels mortos (pretos) são transistores fisicamente queimados e não podem ser consertados por software. Solicite suporte."
  },
  {
    "id": "washed-out-colors",
    "title": "Cores desbotadas / Contraste incorreto e desvio de matiz",
    "category": "imageQuality",
    "categoryTitle": "Qualidade de imagem",
    "symptom": "As cores parecem sem vida, os tons pretos ficam acinzentados ou a imagem exibe um tom amarelado, esverdeado ou azulado.",
    "possibleCauses": [
      "Faixa dinâmica de saída RGB incorreta (Limitada 16-235 em vez de Completa 0-255)",
      "Windows HDR ativado em conteúdo SDR sem o ajuste correto de brilho",
      "Luz noturna / filtro de luz azul ativado no sistema operacional ou no monitor",
      "Perfil de cor ICC incorreto ou corrompido carregado no Windows",
      "Formato de cor ajustado para YCbCr420 em vez de RGB 4:4:4"
    ],
    "checks": [
      "No painel da placa de vídeo, verifique: A faixa dinâmica está em 'Completa' (0-255)?",
      "Desative a Luz Noturna nas configurações de tela do Windows",
      "No menu OSD do monitor, ajuste a temperatura de cor para 'Padrão' ou 'sRGB'",
      "Desative temporariamente o Windows HDR (Win + Alt + B)"
    ],
    "whatScreenTesterCanTest": {
      "description": "O Screen Tester analisa a fidelidade das cores, a escala de cinzas e a separação de contraste.",
      "links": [
        {
          "label": "Teste de precisão de cores",
          "testId": "color-test",
          "testPath": "/tests/color-test"
        },
        {
          "label": "Teste de contraste",
          "testId": "contrast-test",
          "testPath": "/tests/contrast-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Desvios cromáticos quantitativos Delta-E (exige colorímetro físico)",
      "Gravação da tabela interna de calibragem (LUT) do monitor"
    ],
    "actions": [
      "Configure a faixa dinâmica para 'Completa' e a profundidade para 8 ou 10 bits no driver",
      "Execute a calibração de cores do Windows (dccw) ou reinstale o perfil de fábrica",
      "Ajuste o OSD para o modo sRGB ou DCI-P3 dependendo de sua atividade",
      "Ajuste o controle de brilho para conteúdo SDR nas opções de HDR do Windows"
    ],
    "whenToStop": "Se o painel exibir um tom amarelado ou descolorido incurável mesmo no OSD de fábrica, a iluminação LED está desgastada."
  },
  {
    "id": "blurry-text",
    "title": "Texto borrado e franjas coloridas nos subpixels",
    "category": "imageQuality",
    "categoryTitle": "Qualidade de imagem",
    "symptom": "As fontes parecem sem foco, suaves demais ou com contornos coloridos (vermelho/azul) nas bordas das letras.",
    "possibleCauses": [
      "Escala de DPI do Windows fracionada (ex.: 125% ou 175% sem otimização do ClearType)",
      "Arranjo de subpixels não convencional (BGR, WRGB ou padrão triangular QD-OLED)",
      "Resolução diferente da resolução nativa em uso",
      "Subamostragem de croma ativa (YCbCr 4:2:2 ou 4:2:0 em vez de RGB 4:4:4)",
      "Nitidez ajustada de forma excessiva ou muito baixa no menu OSD"
    ],
    "checks": [
      "Execute o assistente de ajuste de texto ClearType no Windows",
      "Confirme se a saída de vídeo está definida como RGB 4:4:4 sem compressão",
      "Defina a nitidez do monitor no valor padrão (normalmente 50%)",
      "Descubra se o seu monitor possui um painel com estrutura de subpixels BGR"
    ],
    "whatScreenTesterCanTest": {
      "description": "O Screen Tester fornece padrões tipográficos detalhados para inspecionar a nitidez das bordas de subpixels.",
      "links": [
        {
          "label": "Teste de clareza de texto",
          "testId": "text-clarity-test",
          "testPath": "/tests/text-clarity-test"
        },
        {
          "label": "Teste de nitidez",
          "testId": "sharpness-test",
          "testPath": "/tests/sharpness-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Mecanismos de rasterização de fontes internos às APIs do sistema operacional",
      "Geometria microscópica dos subpixels"
    ],
    "actions": [
      "Complete o assistente ClearType no Windows escolhendo as amostras mais nítidas",
      "Garanta o uso da resolução nativa e do formato RGB completo",
      "Em telas BGR, configure o ClearType para o modo BGR no registro ou com o BetterClearTypeTuner",
      "Prefira fatores de escala regulares (100%, 150%, 200%)"
    ],
    "whenToStop": "Em monitores OLED com disposição triangular de subpixels, pequenas franjas coloridas são inevitáveis e inerentes à tecnologia."
  },
  {
    "id": "uneven-brightness",
    "title": "Brilho desigual / Vinhetagem / Efeito tela suja (DSE)",
    "category": "imageQuality",
    "categoryTitle": "Qualidade de imagem",
    "symptom": "Cantos escurecidos (vinhetagem), manchas nubladas em cinzas ou aspecto de marcas de sujeira no painel (DSE).",
    "possibleCauses": [
      "Variações de tolerância nas placas difusoras ou fitas de LED nas bordas (Edge-lit)",
      "Efeito de tela suja (DSE) resultante da colagem das camadas da tela",
      "Aperto excessivo da moldura externa pressionando a matriz de cristal líquido",
      "Desgaste térmico irregular dos LEDs ao longo do tempo"
    ],
    "checks": [
      "Exiba telas cinzas sólidas (25%, 50%, 75%) em tela cheia",
      "Tire uma foto com exposição baixa para registrar a formação de nuvens de luz",
      "Cheque se o efeito muda conforme o ângulo de visão (comportamento óptico normal em painéis VA/IPS)"
    ],
    "whatScreenTesterCanTest": {
      "description": "O Screen Tester avalia a uniformidade em toda a tela e o comportamento em tons próximos ao preto.",
      "links": [
        {
          "label": "Teste de uniformidade",
          "testId": "uniformity-test",
          "testPath": "/tests/uniformity-test"
        },
        {
          "label": "Teste próximo ao preto",
          "testId": "near-black-test",
          "testPath": "/tests/near-black-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Uniformidade de luminância quantitativa em cd/m² com grade de 9 pontos",
      "Deformação térmica de guias de luz internas"
    ],
    "actions": [
      "Reduza o brilho do monitor para níveis confortáveis (120-150 cd/m²) para amenizar o defeito",
      "Ative a compensação de uniformidade no menu OSD se o monitor contar com esse recurso",
      "Ajuste a iluminação da sala para evitar reflexos e contrastes excessivos",
      "Se o problema for severo em um equipamento novo, solicite a troca"
    ],
    "whenToStop": "Uma perda de luminosidade de até 15% nos cantos é considerada comum nos padrões de fabricação de telas de consumo."
  },
  {
    "id": "backlight-bleed-ips-glow",
    "title": "Vazamento de luz (Backlight Bleed) vs. Brilho IPS (IPS Glow)",
    "category": "imageQuality",
    "categoryTitle": "Qualidade de imagem",
    "symptom": "Clarões de luz nas bordas em cenas escuras ou reflexo prateado/dourado que muda conforme o ângulo de visão.",
    "possibleCauses": [
      "Backlight Bleed: Falha na vedação da moldura que deixa a luz do backlight escapar pelas laterais",
      "IPS Glow: Característica óptica da disposição dos cristais líquidos nas telas IPS sob ângulos laterais",
      "Pressão mecânica provocada pelo aperto excessivo dos parafusos de suporte VESA"
    ],
    "checks": [
      "Posicione-se bem de frente para o monitor a 1,5 metro: O brilho diminui? (Se sim: é IPS Glow)",
      "Há manchas de luz fixas nos cantos visíveis de qualquer ângulo? (Se sim: é Backlight Bleed)",
      "Afrouxe ligeiramente os parafusos do suporte VESA se notar tensão na carcaça"
    ],
    "whatScreenTesterCanTest": {
      "description": "O Screen Tester fornece telas pretas otimizadas para diferenciar claramente o Bleed do Glow.",
      "links": [
        {
          "label": "Teste de vazamento de luz",
          "testId": "backlight-bleed-test",
          "testPath": "/tests/backlight-bleed-test"
        },
        {
          "label": "Teste de nível de preto",
          "testId": "black-level-test",
          "testPath": "/tests/black-level-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Limites de tolerância de garantia do fabricante sem laudo de laboratório",
      "Torque de aperto dos parafusos da estrutura interna"
    ],
    "actions": [
      "Aumente a distância da tela e posicione o monitor na altura dos olhos (reduz bastante o IPS Glow)",
      "Instale uma iluminação ambiente suave atrás do monitor (bias lighting)",
      "Diminua o brilho geral do monitor para uma faixa entre 30% e 50%",
      "Acione a garantia se feixes intensos de luz forem visíveis em ambientes normais"
    ],
    "whenToStop": "O IPS Glow não pode ser consertado por ser inerente aos painéis IPS. Apenas telas OLED entregam pretos perfeitos sem nenhum brilho."
  },
  {
    "id": "hdr-not-working",
    "title": "HDR não funciona / Imagem lavada ou cinza no modo HDR",
    "category": "imageQuality",
    "categoryTitle": "Qualidade de imagem",
    "symptom": "Ao ligar o HDR as cores perdem o vigor, a área de trabalho fica escura ou os destaques estouram sem detalhes.",
    "possibleCauses": [
      "O monitor possui apenas selo 'DisplayHDR 400' básico sem local dimming real nem ampla gama de cores",
      "A calibração do Windows HDR não foi realizada",
      "Mapeamento de tom (Tone Mapping) incorreto no jogo ou no OSD do monitor",
      "Largura de banda do cabo insuficiente para conduzir 10 bits HDR em altas taxas de atualização",
      "Aceleração de hardware do navegador desabilitada para reprodução HDR"
    ],
    "checks": [
      "Confirme se o HDR está ativo no Windows (Win + Alt + B)",
      "Execute o aplicativo Calibração de HDR do Windows na Microsoft Store",
      "No menu OSD do monitor, defina o modo HDR como 'Auto' ou 'DisplayHDR'",
      "Verifique o cabo de vídeo (DisplayPort 1.4 ou HDMI 2.1 obrigatório)"
    ],
    "whatScreenTesterCanTest": {
      "description": "O Screen Tester afere picos de luminosidade, cobertura de ampla gama e corte de realces no sinal HDR.",
      "links": [
        {
          "label": "Teste de HDR",
          "testId": "hdr-test",
          "testPath": "/tests/hdr-test"
        },
        {
          "label": "Teste de recursos HDR",
          "testId": "hdr-capability-test",
          "testPath": "/tests/hdr-capability-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Luminância máxima real em nits (exige equipamento óptico calibrado)",
      "Quantidade e tempo de resposta das zonas de iluminação Mini-LED"
    ],
    "actions": [
      "Utilize o app de Calibração HDR do Windows para marcar os limites mínimo e máximo de nits",
      "Ajuste o controle deslizante de conteúdo SDR nas configurações de tela do Windows",
      "Atualize os drivers de vídeo e defina a profundidade de cor em 10 bpc",
      "Em telas sem local dimming, desative o HDR no uso diário e utilize-o apenas em jogos certificados"
    ],
    "whenToStop": "Se o monitor não possuir retroiluminação Mini-LED FALD ou painel OLED, o modo HDR não terá capacidade de gerar contraste marcante."
  },
  {
    "id": "tv-overscan-fit",
    "title": "Imagem não cabe na TV (Overscan / Bordas cortadas)",
    "category": "tv",
    "categoryTitle": "Problemas de TV",
    "symptom": "A barra de tarefas do Windows ou as bordas das janelas ficam cortadas nas extremidades ou cercadas por faixas pretas.",
    "possibleCauses": [
      "Recurso de sobrevarredura (Overscan) ligado na TV",
      "Formato de tela da TV configurado em '16:9' em vez de 'Ajuste exato' / '1:1'",
      "O driver da placa gráfica aplica uma compensação de subvarredura inadequada",
      "A entrada HDMI da TV não está nomeada como 'PC'"
    ],
    "checks": [
      "No controle remoto da TV, localize a tecla de formato de tela (Aspect / Formato)",
      "Verifique a identificação da porta HDMI na TV: mude o rótulo para 'PC'",
      "No painel da placa gráfica, veja se a opção de redimensionar área de trabalho está ligada"
    ],
    "whatScreenTesterCanTest": {
      "description": "O Screen Tester disponibiliza grades de alinhamento 1:1 e marcas de porcentagem para verificar o enquadramento exato.",
      "links": [
        {
          "label": "Teste de Overscan de TV",
          "testId": "tv-overscan-test",
          "testPath": "/tests/tv-overscan-test"
        },
        {
          "label": "Teste de escala e proporção",
          "testId": "scaling-aspect-test",
          "testPath": "/tests/scaling-aspect-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Filtros de pós-processamento internos aplicados pelo televisor",
      "Comandos e protocolos de sincronismo HDMI-CEC"
    ],
    "actions": [
      "Defina o formato de tela da TV como 'Ajuste exato', 'Ponto a ponto' ou '1:1'",
      "Renomeie a entrada HDMI na TV para 'PC' (isso desliga automaticamente o overscan e a nitidez forçada)",
      "No software da GPU, restaure as opções de tamanho da tela para o padrão",
      "Ajuste a nitidez da TV para o nível neutro (geralmente 0 ou 50)"
    ],
    "whenToStop": "Quando a linha periférica de 1 pixel do Screen Tester tocar perfeitamente a moldura física da TV, o ajuste estará concluído."
  },
  {
    "id": "multi-touch-issues",
    "title": "Problemas no touch e reconhecimento multitouch",
    "category": "deviceInput",
    "categoryTitle": "Problemas de dispositivos e entrada",
    "symptom": "A tela sensível ao toque erra toques, ignora gestos com múltiplos dedos ou registra toques fantasmas (Ghost Touches).",
    "possibleCauses": [
      "Gordura, sujeira ou umidade acumulada sobre a superfície do vidro",
      "Película protetora muito grossa ou defeituosa prejudicando a capacitância",
      "Ruído elétrico originado por carregadores de tomada paralelos ou de baixa qualidade",
      "Driver do painel touch desatualizado ou calibragem corrompida no Windows"
    ],
    "checks": [
      "A falha também acontece com o dispositivo fora da tomada?",
      "Limpe o vidro cuidadosamente com pano macio e apropriado",
      "Verifique quantos pontos de contato simultâneos a tela consegue reconhecer"
    ],
    "whatScreenTesterCanTest": {
      "description": "O Screen Tester rastreia pontos de contato de forma interativa exibindo coordenadas em tempo real.",
      "links": [
        {
          "label": "Teste de multitouch",
          "testId": "multi-touch-test",
          "testPath": "/tests/multi-touch-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Trilhas rompidas na malha do digitalizador de vidro",
      "Taxa de amostragem de hardware do controlador touch em hertz"
    ],
    "actions": [
      "Utilize o carregador original para descartar correntes parasitas",
      "Abra a calibragem touch do Windows no Painel de Controle e execute o assistente",
      "Remova a película caso as falhas tenham surgido após a aplicação dela",
      "Atualize os drivers da tela sensível ao toque no Gerenciador de Dispositivos"
    ],
    "whenToStop": "Se toques fantasmas continuarem acontecendo com o vidro limpo e longe da tomada, o digitalizador está com defeito físico."
  },
  {
    "id": "accelerometer-issues",
    "title": "Problemas no acelerômetro e sensores de movimento",
    "category": "deviceInput",
    "categoryTitle": "Problemas de dispositivos e entrada",
    "symptom": "A tela não gira sozinha, jogos não respondem à inclinação ou os valores de leitura sofrem desvio contínuo.",
    "possibleCauses": [
      "Bloqueio de rotação ativo nos atalhos rápidos do sistema",
      "O navegador de internet não possui autorização para acessar os sensores de movimento",
      "Sensor descalibrado após uma queda ou impacto",
      "Modo de economia de energia limitando a leitura contínua dos sensores"
    ],
    "checks": [
      "Verifique se a rotação automática está desbloqueada na central de controle",
      "Confira as permissões de sensores do navegador web (Safari/Chrome)",
      "Coloque o aparelho sobre uma superfície reta e lisa e observe os valores"
    ],
    "whatScreenTesterCanTest": {
      "description": "O Screen Tester faz a leitura das forças de aceleração nos eixos X, Y e Z em tempo real via API DeviceMotion.",
      "links": [
        {
          "label": "Teste de acelerômetro",
          "testId": "accelerometer-test",
          "testPath": "/tests/accelerometer-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Mecânica interna microscópica (MEMS) do sensor eletrônico",
      "Desvio de calibragem armazenado no processador de segurança"
    ],
    "actions": [
      "Ligue a rotação automática nas configurações do aparelho",
      "Autorize o acesso a sensores de movimento nas opções do navegador",
      "Reinicie o dispositivo para resetar o subsistema de sensores",
      "Faça a calibragem de nível e bússola nas configurações do sistema"
    ],
    "whenToStop": "Se todos os três eixos informarem zero absoluto ou valores estáticos no limite máximo, o chip MEMS sofreu avaria física."
  },
  {
    "id": "gyroscope-issues",
    "title": "Problemas no giroscópio e sensores de orientação",
    "category": "deviceInput",
    "categoryTitle": "Problemas de dispositivos e entrada",
    "symptom": "A mira em aplicativos de realidade virtual ou vídeos em 360 graus treme, desvia ou gira sem controle.",
    "possibleCauses": [
      "Interferência magnética de capas com fecho magnético ou suportes veiculares",
      "Permissão de orientação recusada nas opções do navegador",
      "O giroscópio MEMS precisa de calibragem com movimento em formato de 8",
      "Falha no serviço do sistema encarregado da orientação"
    ],
    "checks": [
      "Retire qualquer capinha com ímã ou suporte metálico",
      "Mova o celular pelo ar desenhando o número oito para calibrar os sensores",
      "Verifique as permissões de orientação na barra de endereços do navegador"
    ],
    "whatScreenTesterCanTest": {
      "description": "O Screen Tester reproduz os ângulos Alfa, Beta e Gama em uma simulação física tridimensional em tempo real.",
      "links": [
        {
          "label": "Teste de giroscópio",
          "testId": "gyroscope-test",
          "testPath": "/tests/gyroscope-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Fusão algorítmica de dados entre giroscópio e magnetômetro no driver",
      "Ruído de leitura em altas frequências"
    ],
    "actions": [
      "Recalibre os sensores fazendo movimentos em 8 com as mãos",
      "Evite capas protetoras com travas magnéticas",
      "Reinicie o aparelho",
      "Atualize o navegador para a versão mais recente"
    ],
    "whenToStop": "Se não houver resposta de rotação em nenhum dos três eixos espaciais, o giroscópio está com avaria mecânica interna."
  },
  {
    "id": "vibration-issues",
    "title": "Problemas na API de vibração e resposta tátil",
    "category": "deviceInput",
    "categoryTitle": "Problemas de dispositivos e entrada",
    "symptom": "O aparelho não vibra ao receber avisos ou durante os testes de retorno tátil na web.",
    "possibleCauses": [
      "Vibração desativada nas opções de som ou modo Não Perturbe ativado",
      "O navegador bloqueia comandos navigator.vibrate() sem um clique prévio do usuário",
      "O Safari no iOS não possui suporte à especificação W3C Vibration API por decisão da Apple",
      "Motor tátil linear (Taptic Engine) ou rotor ERM danificado internamente"
    ],
    "checks": [
      "Confira se a vibração funciona nos ajustes de som e toques do sistema",
      "Toque na tela antes de disparar o teste para cumprir o requisito de ativação do navegador",
      "Verifique se o dispositivo é um iPhone ou iPad (dispositivos iOS bloqueiam vibração web)"
    ],
    "whatScreenTesterCanTest": {
      "description": "O Screen Tester dispara sequências de pulsos táteis padronizados e personalizados pela API Vibration do HTML5.",
      "links": [
        {
          "label": "Teste de vibração",
          "testId": "vibration-test",
          "testPath": "/tests/vibration-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Frequência mecânica de ressonância do motor em hertz",
      "Alimentação elétrica aplicada ao atuador de vibração"
    ],
    "actions": [
      "Ative a resposta tátil e vibração nas configurações do sistema",
      "Execute o teste no Google Chrome para Android ou em outro navegador compatível",
      "Desative o modo de economia de bateria (ele costuma desligar os motores táteis)",
      "Reinicie o aparelho"
    ],
    "whenToStop": "Se o celular não vibrar sequer durante chamadas telefônicas ou no despertador, o motor de vibração está quebrado."
  },
  {
    "id": "webcam-issues",
    "title": "Problemas na webcam e autorização de câmera",
    "category": "deviceInput",
    "categoryTitle": "Problemas de dispositivos e entrada",
    "symptom": "A transmissão da câmera fica escura, o navegador avisa 'Câmera não encontrada' ou o acesso é bloqueado.",
    "possibleCauses": [
      "Permissão de câmera negada no navegador ou nos ajustes de privacidade do sistema",
      "Tampa física de privacidade fechada na frente da lente",
      "Outro programa (ex.: Zoom, Teams, OBS) monopolizando o sinal da câmera",
      "Botão físico ou tecla de atalho (Fn) desativando a câmera no teclado",
      "Driver USB da webcam corrompido ou desatualizado"
    ],
    "checks": [
      "Olhe para a lente e certifique-se de que a tampa protetora móvel está aberta",
      "Verifique se uma combinação de teclas (ex.: Fn + F6) desativou o dispositivo",
      "Feche completamente todos os outros aplicativos que utilizam vídeo",
      "Clique no ícone de cadeado na barra de endereços do navegador e permita a câmera"
    ],
    "whatScreenTesterCanTest": {
      "description": "O Screen Tester avalia resolução nativa, taxa de quadros, reprodução de cores e atraso de vídeo.",
      "links": [
        {
          "label": "Teste de webcam",
          "testId": "webcam-test",
          "testPath": "/tests/webcam-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Relação sinal-ruído (SNR) no sensor de imagem",
      "Falhas no firmware do microcontrolador da câmera"
    ],
    "actions": [
      "Conceda autorização no pop-up de permissão do navegador",
      "Revise as permissões de privacidade no Windows/macOS para liberar o navegador",
      "Atualize ou reinstale o driver da webcam no Gerenciador de Dispositivos",
      "Conecte a câmera externa em outra porta USB direta do computador"
    ],
    "whenToStop": "Se a webcam aparecer com código de erro 10 ou 43 no Gerenciador de Dispositivos em vários PCs, ela está inoperante."
  },
  {
    "id": "speaker-issues",
    "title": "Problemas nos alto-falantes e saída de som",
    "category": "deviceInput",
    "categoryTitle": "Problemas de dispositivos e entrada",
    "symptom": "Não há saída de som, apenas um canal funciona (esquerdo/direito) ou o áudio sai distorcido com estalos.",
    "possibleCauses": [
      "Dispositivo de saída de som errado selecionado nas opções do sistema",
      "Alto-falantes desligados ou aba do navegador em modo mudo",
      "Plugue P2 de 3,5 mm mal encaixado na entrada de áudio",
      "Balanço de áudio deslocado apenas para um dos lados",
      "Incompatibilidade de taxa de amostragem no driver de som (ex.: 44,1 kHz vs 48 kHz)"
    ],
    "checks": [
      "Confira o volume no sistema e no controle físico das caixas de som",
      "Certifique-se de que a saída escolhida são os seus fones ou caixas habituais",
      "Empurre o conector de 3,5 mm com firmeza até o encaixe total",
      "Verifique se a aba do navegador não está silenciada"
    ],
    "whatScreenTesterCanTest": {
      "description": "O Screen Tester gera frequências senoidais puras, varreduras tonais e testes de separação de canal esquerdo/direito.",
      "links": [
        {
          "label": "Teste de alto-falantes",
          "testId": "speaker-test",
          "testPath": "/tests/speaker-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Taxa de distorção harmônica total (THD) do amplificador",
      "Deformações físicas na bobina móvel do alto-falante"
    ],
    "actions": [
      "Defina o dispositivo correto como padrão nas configurações de som",
      "Centralize o balanço de áudio estéreo (50% esquerda / 50% direita)",
      "Atualize os drivers de áudio (ex.: Realtek)",
      "Experimente outro cabo auxiliar ou outro fone de ouvido"
    ],
    "whenToStop": "Se o cone do alto-falante raspar mecanicamente ou estalar em qualquer intensidade de volume, o transdutor está estourado."
  },
  {
    "id": "microphone-issues",
    "title": "Problemas no microfone e entrada de som",
    "category": "deviceInput",
    "categoryTitle": "Problemas de dispositivos e entrada",
    "symptom": "O microfone não capta áudio, a barra de volume não se move ou a voz sai sumida e cheia de chiado.",
    "possibleCauses": [
      "Permissão de microfone negada no navegador ou na segurança do sistema",
      "Chave de mudo física ativada no fio do fone de ouvido",
      "Dispositivo de entrada errado selecionado nas opções de áudio",
      "Sensibilidade do microfone ajustada em 0 nas propriedades de som",
      "Conector inserido na entrada errada (fone em vez de microfone)"
    ],
    "checks": [
      "Verifique o botão de mudo no cabo do fone de ouvido ou microfone",
      "Clique no ícone de cadeado no navegador e autorize o microfone",
      "Fale no microfone e veja se a barra de intensidade responde nas configurações do Windows",
      "Em fones com plugue único P3, utilize o cabo adaptador em Y correto no computador"
    ],
    "whatScreenTesterCanTest": {
      "description": "O Screen Tester monitora o sinal de entrada, visualiza o espectro de frequências e avalia o nível em tempo real.",
      "links": [
        {
          "label": "Teste de microfone",
          "testId": "microphone-test",
          "testPath": "/tests/microphone-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "Ruído de fundo intrínseco da cápsula em dB(A)",
      "Alimentação fantasma de 48V em microfones profissionais XLR"
    ],
    "actions": [
      "Libere o microfone na janela do navegador e nos ajustes de privacidade do sistema operacional",
      "Defina o microfone correto como dispositivo de entrada padrão",
      "Aumente o ganho para 80-100% e adicione amplificação de microfone se necessário",
      "Atualize os drivers de áudio da placa-mãe"
    ],
    "whenToStop": "Se o microfone não registrar sinal em nenhum computador nem em portas distintas, a cápsula ou o fio estão rompidos."
  }
];
