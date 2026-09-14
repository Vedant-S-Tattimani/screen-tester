import { ExplainerData, ExplainerLabels } from "./types";

export const PT_LABELS: ExplainerLabels = {
  overviewHeading: "Visão Geral da Inspeção de Tela",
  whatToLookForHeading: "O Que Observar Durante a Inspeção",
  boundariesHeading: "Limites de Medição e Honestidade Técnica",
  canObserveLabel: "O Que o Screen Tester Pode Observar",
  cannotMeasureLabel: "O Que o Navegador Não Consegue Medir com Precisão",
  interpretationHeading: "Interpretação das Suas Observações",
  nextStepsHeading: "Próximos Passos Recomendados",
};

export const PT_EXPLAINERS: Record<string, ExplainerData> = {
  "dead-pixel-test": {
    overview: "Um pixel morto é um subpixel de cristal líquido ou emissor OLED permanentemente desligado que permanece totalmente escuro, independentemente do sinal. Em fundos claros — especialmente branco puro, ciano e amarelo —, os pixels mortos se destacam como pequenos pontos pretos imóveis.",
    whatToLookFor: [
      {
        label: "Pontos escuros estáticos em fundos claros",
        description: "Um ponto preto minúsculo que não muda de cor ao alternar entre cores sólidas brilhantes indica um pixel morto."
      },
      {
        label: "Diferenciar pixel morto de poeira",
        description: "A poeira superficial muda de posição conforme o ângulo de visão e pode ser limpa. Pixels mortos reais ficam atrás do polarizador."
      },
      {
        label: "Defeito de subpixel vs. pixel completo",
        description: "Se apenas um subpixel (vermelho, verde ou azul) falhou, o ponto parecerá levemente descolorido em vez de totalmente preto sobre branco."
      },
      {
        label: "Agrupamento de pixels mortos (Clusters)",
        description: "Vários pixels mortos concentrados em uma área pequena representam um defeito grave e geralmente garantem troca imediata pelo fabricante."
      }
    ],
    canObserve: [
      "Identificação visual de pixels desligados sobre fundos sólidos primários e secundários",
      "Coordenadas exatas e contagem de pontos escuros suspeitos nas zonas da tela",
      "Contraste visual entre a luminosidade do fundo e subpixels inativos"
    ],
    cannotMeasure: [
      "Continuidade elétrica ou voltagem dos transistores de película fina (TFT)",
      "Detecção automatizada sem inspeção visual humana direta",
      "Classificação física de defeitos internos sob as camadas de vidro do painel"
    ],
    interpretation: "Pixels mortos surgem de falhas microscópicas de transistores durante a fabricação. A maioria dos fabricantes adota a norma ISO 9241-307 Classe 2, que tolera de 2 a 5 subpixels defeituosos por milhão.",
    nextSteps: {
      text: "¿Detectou subpixels que permanecem acesos em cores sólidas? Experimente nossa ferramenta de estimulação.",
      actionLabel: "Abrir Stuck Pixel Fixer",
      actionHref: "/tests/stuck-pixel-fixer"
    }
  },

  "stuck-pixel-test": {
    overview: "Ao contrário de um pixel morto, um pixel preso (stuck pixel) é causado por uma célula de cristal líquido travada na posição aberta, deixando a luz passar continuamente. Ele aparece como um ponto brilhante constante (vermelho, verde, azul, ciano ou branco), bem visível sobre fundo preto.",
    whatToLookFor: [
      {
        label: "Pontos coloridos brilhantes sobre preto puro",
        description: "Inspecione a tela preta em uma sala escura. Qualquer ponto brilhando em vermelho, verde, azul ou amarelo é um subpixel preso."
      },
      {
        label: "Teste com cores complementares",
        description: "Um subpixel verde preso desaparecerá em fundo verde, mas brilhará intensamente sobre fundos vermelhos, azuis ou pretos."
      },
      {
        label: "Pixels brancos permanentes",
        description: "Se os três subpixels (RGB) estiverem abertos simultaneamente, o defeito aparecerá como um ponto branco estático em fundos escuros."
      },
      {
        label: "Diferença para vazamento de luz",
        description: "Pixels presos são pontos microscópicos isolados; o vazamento de luz cria manchas difusas ao longo das bordas da moldura."
      }
    ],
    canObserve: [
      "Identificação visual de subpixels acesos sobre fundos pretos e complementares",
      "Isolamento dos canais de cor afetados (vermelho, verde ou azul)",
      "Mapeamento dos quadrantes da tela com anomalias ativas"
    ],
    cannotMeasure: [
      "Viscosidade química ou estado de alinhamento físico dos cristais líquidos",
      "Resistência elétrica ou velocidade de chaveamento do transistor",
      "Garantia de permanência do defeito sem acompanhamento ao longo do tempo"
    ],
    interpretation: "Pixels presos acontecem quando as moléculas de cristal líquido ficam estáticas por cargas eletrostáticas ou tolerâncias de fabricação. Ao contrário dos pixels mortos, muitos podem ser destravados por estimulação visual rápida.",
    nextSteps: {
      text: "Localizou um pixel preso? Tente reativá-lo com nosso exercitador de cores rápidas.",
      actionLabel: "Testar Stuck Pixel Fixer",
      actionHref: "/tests/stuck-pixel-fixer"
    }
  },

  "stuck-pixel-fixer": {
    overview: "O Stuck Pixel Fixer utiliza sequências de cores primárias em alta frequência e padrões de ruído visual para estimular as moléculas de cristal líquido a alternarem de estado rapidamente, tentando destravar o subpixel.",
    whatToLookFor: [
      {
        label: "Posicionamento preciso da caixa",
        description: "Posicione a caixa animada diretamente sobre o pixel afetado para evitar flashes desnecessários no restante da tela."
      },
      {
        label: "Escolha do padrão de estímulo",
        description: "Alterne entre Ciclo RGB e Ruído de Cores para aplicar diferentes frequências de comutação."
      },
      {
        label: "Duração recomendada da sessão",
        description: "Deixe a estimulação rodar por 15 a 30 minutos, pause e confira em fundo preto se o pixel voltou a responder."
      },
      {
        label: "Aviso de sensibilidade à luz",
        description: "Interrompa o uso imediatamente se sentir tontura ou cansaço visual. Não recomendado para pessoas com fotossensibilidade."
      }
    ],
    canObserve: [
      "Reprodução fluida de sequências RGB em alta velocidade e padrões de ruído diretamente no navegador",
      "Posicionamento interativo da área de estímulo e cronômetro ajustável",
      "Confirmação visual do estado do pixel antes e depois do ciclo de estimulação"
    ],
    cannotMeasure: [
      "Reparo físico de transistores TFT queimados ou trilhas rompidas",
      "Taxa de sucesso garantida (varia conforme a integridade do painel)",
      "Recuperação de pixels mortos (completamente pretos e sem energia)"
    ],
    interpretation: "Métodos de software só surtem efeito em cristais líquidos temporariamente travados. Se houver dano físico microscópico permanente no transistor, a estimulação visual não surtirá efeito.",
    nextSteps: {
      text: "Após a sessão, retorne ao teste de pixels presos para inspecionar a área em fundo preto sólido.",
      actionLabel: "Verificar com Stuck Pixel Test",
      actionHref: "/tests/stuck-pixel-test"
    }
  },

  "refresh-rate-test": {
    overview: "A taxa de atualização (em Hertz, Hz) indica quantas vezes por segundo a tela reconstrói a imagem. Este teste utiliza a API de animação do navegador (requestAnimationFrame) para calcular a entrega de quadros e verificar se corresponde à taxa configurada no sistema.",
    whatToLookFor: [
      {
        label: "Taxa observada vs. configurada",
        description: "Verifique se a leitura coincide com o valor definido nas configurações do monitor (ex.: 60Hz, 120Hz, 144Hz ou 240Hz)."
      },
      {
        label: "Consistência de quadros (Frame Pacing)",
        description: "Em um monitor estável de 144Hz, os quadros devem chegar em intervalos uniformes de aproximadamente 6,94 ms."
      },
      {
        label: "Navegador travado em 60Hz",
        description: "Se o seu monitor de 144Hz mostrar apenas 60Hz, verifique se modos de economia de bateria ou aceleração de hardware estão limitando a aba."
      },
      {
        label: "Fluidez da barra em movimento",
        description: "Em telas de alta frequência, o elemento móvel deve deslizar sem solavancos nem travamentos visíveis."
      }
    ],
    canObserve: [
      "Frequência e variação temporal das chamadas requestAnimationFrame do navegador",
      "Taxa estimada de FPS e consistência da sincronização vertical",
      "Comportamento do compositor gráfico na aba ativa"
    ],
    cannotMeasure: [
      "Frequência nativa do hardware do painel além dos limites expostos pelo navegador",
      "Largura de banda e protocolo físico de cabos HDMI ou DisplayPort",
      "Intervalos de apagamento vertical (VBLANK) medidos por osciloscópio"
    ],
    interpretation: "Navegadores sincronizam seus ciclos de renderização com o compositor do sistema operacional. Planos de energia ou múltiplos monitores com taxas diferentes podem forçar o navegador a 60Hz.",
    nextSteps: {
      text: "¿Seu monitor gamer está limitado a 60Hz no navegador? Siga nosso guia de solução.",
      actionLabel: "Guia de Taxa de Atualização",
      actionHref: "/knowledge-base/troubleshooting#refresh-rate-capped"
    }
  },

  "ghosting-test": {
    overview: "O ghosting se manifesta como rastros ou sombras borradas atrás de objetos em movimento. Ocorre quando os cristais líquidos demoram mais tempo para mudar de cor (tempo de resposta) do que a duração de exibição de um quadro.",
    whatToLookFor: [
      {
        label: "Rastros escuros (Ghosting tradicional)",
        description: "Sombras escuras atrás de objetos indicam transições lentas de escuro para claro, comuns em painéis VA."
      },
      {
        label: "Halos brilhantes ou coronas (Ghosting inverso)",
        description: "Rastros brancos ou luminosos indicam que o ajuste de Overdrive ou Tempo de Resposta do monitor está agressivo demais (overshoot)."
      },
      {
        label: "Variação por cor de fundo",
        description: "Observe se o arrasto é mais severo em fundos vermelhos ou cinza-escuro do que em tons claros."
      },
      {
        label: "Rastreamento ocular vs. resposta do painel",
        description: "Acompanhe o objeto com os olhos para separar o desfoque retiniano natural do arrasto real dos cristais líquidos."
      }
    ],
    canObserve: [
      "Presença visual de rastros e coronas em diferentes velocidades de deslocamento",
      "Diferença de resposta entre transições claro-no-escuro e escuro-no-claro",
      "Impacto imediato ao alterar os níveis de Overdrive no menu OSD do monitor"
    ],
    cannotMeasure: [
      "Tempo de resposta Cinza a Cinza (GtG) exato em milissegundos com padrão de laboratório",
      "Curvas de decaimento de luz medidas por câmeras de rastreamento óptico (Pursuit Camera)",
      "Tensões de acionamento elétrico dos subpixels"
    ],
    interpretation: "O ghosting depende diretamente da tecnologia do painel (TN é rápido mas com cores fracas, IPS é equilibrado, VA costuma apresentar arrasto em tons escuros e OLED tem resposta quase instantânea). Um nível médio de Overdrive costuma oferecer o melhor balanço.",
    nextSteps: {
      text: "¿Quer aprender a calibrar o Overdrive e eliminar as manchas de ghosting inverso?",
      actionLabel: "Guia de Ghosting e Desfoque",
      actionHref: "/knowledge-base/monitor-ghosting-and-motion-blur"
    }
  },

  "motion-blur-test": {
    overview: "Diferente do ghosting, o desfoque de movimento em telas planas modernas provém do método Sample-and-Hold: como o quadro fica estático até a próxima atualização, os olhos humanos criam desfoque ao acompanhar o movimento contínuo.",
    whatToLookFor: [
      {
        label: "Perda de nitidez em alta velocidade",
        description: "Observe linhas verticais e textos enquanto se deslocam. Repare a partir de qual velocidade os detalhes começam a embaçar."
      },
      {
        label: "Comparação de velocidades",
        description: "Compare deslocamentos a 240 px/s com 960 px/s para perceber como a velocidade amplia o desfoque retiniano."
      },
      {
        label: "Efeito da inserção de quadros pretos (BFI)",
        description: "Se o seu monitor tiver luz estroboscópica (ULMB, ELMB, DyAc), ative-a para notar um ganho expressivo de definição em movimento."
      },
      {
        label: "Sample-and-Hold em telas OLED",
        description: "Mesmo com resposta instantânea de 0,1ms, painéis OLED a 60Hz ou 120Hz sem estroboscopia ainda produzem desfoque por retenção ocular."
      }
    ],
    canObserve: [
      "Diferenças na nitidez percebida em várias velocidades e taxas de atualização",
      "Clareza visual obtida ao ligar modos de luz estroboscópica de hardware (BFI)",
      "Contraste nítido entre bordas estáticas e contornos em movimento"
    ],
    cannotMeasure: [
      "Tempo de resposta de imagem em movimento (MPRT) em milissegundos exatos",
      "Curvas fisiológicas de integração de luz na retina humana",
      "Ciclo de trabalho da pulsação do backlight"
    ],
    interpretation: "Para reduzir o desfoque Sample-and-Hold, é necessário aumentar os hercios da tela (reduzindo o tempo de exibição de cada quadro) ou inserir intervalos escuros (BFI / Estroboscopia).",
    nextSteps: {
      text: "Confira no teste de taxa de atualização como mais hercios atenuam o desfoque.",
      actionLabel: "Testar Taxa de Atualização",
      actionHref: "/tests/refresh-rate-test"
    }
  },

  "vrr-test": {
    overview: "A taxa de atualização variável (VRR: NVIDIA G-Sync, AMD FreeSync, VESA Adaptive-Sync) sincroniza os ciclos do monitor com os quadros gerados pela placa de vídeo, eliminando cortes e engasgos.",
    whatToLookFor: [
      {
        label: "Cortes de tela (Screen Tearing)",
        description: "Procure por divisões horizontais em que a metade de cima e a de baixo mostram quadros desalinhados."
      },
      {
        label: "Microengasgos (Stutter / Judder)",
        description: "Repare se o elemento em movimento desliza suavemente ou dá pequenos solavancos quando os quadros variam."
      },
      {
        label: "VRR em modo janela vs. tela cheia",
        description: "Muitos drivers de vídeo ativam o G-Sync ou FreeSync apenas em tela cheia exclusiva, salvo configuração específica."
      },
      {
        label: "Compensação de baixa taxa (LFC)",
        description: "Quando os quadros caem abaixo do limite mínimo do monitor (ex.: 48Hz), veja se a duplicação de quadros ocorre sem travamentos."
      }
    ],
    canObserve: [
      "Percepção visual de linhas de tearing e microengasgos sob taxas de quadros variáveis",
      "Suavidade da animação durante oscilações de cadência no navegador",
      "Diferença de fluidez entre execução em janela e tela cheia"
    ],
    cannotMeasure: [
      "Comunicação direta de baixo nível entre o driver da placa de vídeo e o monitor",
      "Status de ativação de hardware do módulo G-Sync ou FreeSync",
      "Fluxo de metadados em tempo real nos canais auxiliares DisplayPort"
    ],
    interpretation: "Como o navegador roda dentro do gerenciador de janelas do sistema operacional, o VRR depende de recursos como Agendamento Acelerado de GPU (HAGS) e configurações do driver.",
    nextSteps: {
      text: "¿Observa engasgos ou descompasso mesmo com VRR? Acesse nosso guia de solução de problemas.",
      actionLabel: "Guia de Solução VRR",
      actionHref: "/knowledge-base/troubleshooting#vrr-stutter-tearing"
    }
  },

  "backlight-bleed-test": {
    overview: "O vazamento de luz (backlight bleed) ocorre quando a iluminação traseira de telas LCD escapa pelas bordas ou cantos devido à pressão da moldura. Este teste em tela preta pura ajuda a identificar vazamentos e separá-los do brilho angular dos painéis IPS (IPS Glow).",
    whatToLookFor: [
      {
        label: "Feixes de luz nas bordas e cantos",
        description: "Áreas esbranquiçadas ou amareladas ao longo da moldura que continuam visíveis mesmo mudando o ângulo de visão."
      },
      {
        label: "IPS Glow vs. Vazamento real",
        description: "Mova a cabeça para os lados: se o brilho mudar de intensidade ou posição conforme o ângulo, é IPS Glow normal, não um vazamento mecânico."
      },
      {
        label: "Efeito nuvem (Clouding)",
        description: "Manchas claras difusas espalhadas pela tela, decorrentes de lâminas difusoras irregulares ou torção do chassi."
      },
      {
        label: "Comparação com OLED e Mini-LED",
        description: "Telas OLED emitem luz por pixel e entregam 0 nits sem vazamento. Painéis Mini-LED podem exibir halos discretos ao redor de áreas claras."
      }
    ],
    canObserve: [
      "Vazamentos de luz visíveis em cantos e pontos de pressão da moldura em fundo preto",
      "Distribuição de manchas claras em ambiente totalmente escurecido",
      "Sensibilidade ao ângulo de visão para separar vazamentos estáticos de reflexos de IPS Glow"
    ],
    cannotMeasure: [
      "Luminância absoluta do painel em cd/m² (nits) sem sonda óptica de precisão",
      "Razão de contraste estático nativo (ex.: 1000:1 contra 3000:1)",
      "Certificação oficial de contraste ANSI em 16 zonas"
    ],
    interpretation: "Um brilho moderado (IPS Glow) é uma característica óptica inerente aos painéis IPS. Vazamentos acentuados, por outro lado, são defeitos de montagem em que a moldura aperta a tela.",
    nextSteps: {
      text: "Entenda a fundo as diferenças entre IPS Glow, vazamento de luz e preto puro OLED.",
      actionLabel: "Guia Backlight Bleed vs IPS Glow",
      actionHref: "/knowledge-base/backlight-bleed-vs-ips-glow"
    }
  },

  "near-black-test": {
    overview: "O teste de quase preto avalia a capacidade da tela de distinguir tons de cinza extremamente escuros logo acima do preto absoluto (de 0,5% a 5% de luminância). Se o monitor esmagar esses tons (Black Crush), detalhes essenciais em sombras são perdidos em filmes e jogos.",
    whatToLookFor: [
      {
        label: "Black Crush (Esmagamento de sombras)",
        description: "Se o primeiro bloco (0,5% ou 1%) não puder ser distinguido do fundo preto, o monitor está esmagando os tons escuros."
      },
      {
        label: "Separação entre blocos contíguos",
        description: "Em ambiente escuro, você deve conseguir enxergar os limites entre cada um dos tons baixos de cinza."
      },
      {
        label: "Variação de gamma por ângulo em painéis VA",
        description: "Em telas VA, detalhes em sombras costumam surgir com mais clareza ao observar a tela com leve inclinação."
      },
      {
        label: "Reflexos da luz ambiente",
        description: "A iluminação da sala reduz bastante a capacidade dos olhos de notar cinzas profundos; apague as luzes para testar com precisão."
      }
    ],
    canObserve: [
      "Limiares visuais de percepção para blocos de cinza a 0,5%, 1%, 2%, 3%, 4% e 5%",
      "Separação de detalhes em cenas muito escuras",
      "Impacto de ajustes como Gamma, Equalizador de Preto e Faixa Dinâmica HDMI"
    ],
    cannotMeasure: [
      "Valores fotométricos de luminância abaixo de 0,05 nits sem sensor profissional",
      "Alinhamento matemático estrito com curvas de gamma (BT.1886 vs. 2.2)",
      "Ponto de preto nativo do painel em cd/m²"
    ],
    interpretation: "O esmagamento de sombras costuma resultar de uma faixa dinâmica incorreta na GPU (Limitado 16–235 em vez de Completo 0–255) ou de perfis de contraste dinâmico desregulados.",
    nextSteps: {
      text: "¿Está perdendo detalhes em áreas escuras? Confira nosso guia para corrigir o Black Crush.",
      actionLabel: "Guia de Correção de Black Crush",
      actionHref: "/knowledge-base/troubleshooting#black-crush"
    }
  },

  "gradient-banding-test": {
    overview: "Gradientes suaves exigem transições tonais contínuas. Se a tela, a placa de vídeo ou o perfil de cores operarem com profundidade de bits insuficiente, as transições quebram em degraus visíveis ou faixas marcadas (banding / posterização).",
    whatToLookFor: [
      {
        label: "Linhas de degrau visíveis",
        description: "Repare se surgem divisões bruscas em vez de uma transição gradual em rampas de cinza e cores primárias."
      },
      {
        label: "Banding isolado por canal",
        description: "Verifique se o problema é mais pronunciado em tons de azul ou áreas escuras do que na escala neutra de cinzas."
      },
      {
        label: "Profundidade de bits e pontilhamento FRC",
        description: "Telas de 8 e 10 bits nativos produzem rampas suaves; painéis de 6 bits com FRC costumam exibir leve granulado ou degraus."
      },
      {
        label: "Faixa dinâmica completa vs. limitada",
        description: "Se a placa gráfica emitir sinal 'Limitado' (16–235), os extremos claro e escuro do gradiente serão cortados abruptamente."
      }
    ],
    canObserve: [
      "Degraus visíveis de cores em gradientes monocromáticos e RGB",
      "Comparação entre rampas horizontais, verticais e multicanais",
      "Artefatos causados por perfis ICC corrompidos ou faixa dinâmica reduzida"
    ],
    cannotMeasure: [
      "Profundidade física de bits do painel sem depender dos dados do sistema",
      "Variações mensuráveis Delta E entre degraus de cor vizinhos",
      "Algoritmos internos de dithering espacial embutidos no monitor"
    ],
    interpretation: "O banding pode decorrer de painéis de 6 bits, configuração de faixa HDMI restrita (16–235) ou perfis de cor que podam faixas de valores.",
    nextSteps: {
      text: "¿Quer simular degraus de 6 bits, 8 bits e testar dithering? Use nossa ferramenta especializada.",
      actionLabel: "Testar Profundidade & Dither",
      actionHref: "/tests/color-banding-test"
    }
  },

  "uniformity-test": {
    overview: "A uniformidade de tela afere a constância do brilho e da temperatura de cor em todo o display. Irregularidades nas camadas difusoras do painel causam escurecimento nas bordas ou o Efeito Tela Suja (Dirty Screen Effect - DSE).",
    whatToLookFor: [
      {
        label: "Vinhetagem nas bordas e cantos",
        description: "Examine em cinzas a 25%, 50% e 75% se as extremidades parecem claramente mais escuras que o centro."
      },
      {
        label: "Efeito Tela Suja (DSE)",
        description: "Manchas nebulosas ou texturas turvas que chamam a atenção ao mover a visão sobre fundos sólidos (como campos esportivos)."
      },
      {
        label: "Variação na temperatura de cor",
        description: "Observe se um lado do monitor parece mais quente (amarelado/avermelhado) e o outro mais frio (azulado)."
      },
      {
        label: "Comparação na grade 5x5",
        description: "Compare as células da grade para quantificar visualmente a queda de luz do centro para as bordas."
      }
    ],
    canObserve: [
      "Quedas visuais de luminosidade, vinhetagem periférica e pontos quentes em cinzas e brancos",
      "Diferenças nítidas de temperatura de cor entre setores do display",
      "Avaliação em vários patamares padronizados de brilho"
    ],
    cannotMeasure: [
      "Valores percentuais exatos de uniformidade (ex.: '98,5% uniforme') sem espectrofotômetro multiponto de laboratório",
      "Variação térmica exata em Kelvin nas coordenadas do painel",
      "Estado de circuitos digitais de compensação de uniformidade (DUC)"
    ],
    interpretation: "Monitores convencionais toleram quedas de 10% a 15% de luz nos cantos. Telas profissionais para edição gráfica usam circuitos DUC para manter variações abaixo de 5%.",
    nextSteps: {
      text: "Entenda o que causa o efeito tela suja e quando cabe acionar a garantia do fabricante.",
      actionLabel: "Guia de Uniformidade de Tela",
      actionHref: "/knowledge-base/backlight-bleed-vs-ips-glow"
    }
  },

  "text-clarity-test": {
    overview: "A nitidez dos textos depende da densidade de pixels (PPI), da escala do sistema operacional, do arranjo físico dos subpixels (RGB, BGR, QD-OLED) e dos motores de suavização de fontes.",
    whatToLookFor: [
      {
        label: "Bordas coloridas nas letras",
        description: "Halos vermelhos ou azuis nas hastes verticais indicam divergência entre o arranjo de subpixels e o renderizador do sistema."
      },
      {
        label: "Arranjo BGR invertido",
        description: "Alguns monitores utilizam subpixels BGR em vez de RGB; sem calibrar o ClearType no Windows, as fontes ficam borradas."
      },
      {
        label: "Bordas coloridas em telas OLED",
        description: "Distribuições triangulares em painéis QD-OLED e WOLED geram finos contornos verdes ou magenta em bordas horizontais."
      },
      {
        label: "Desfoque por escala fracionada",
        description: "Fatores como 125% ou 150% podem gerar perda de nitidez em programas legados para desktop."
      }
    ],
    canObserve: [
      "Halos e bordas coloridas nos contornos tipográficos em tamanhos de 8px a 32px",
      "Diferenças de nitidez entre fontes com serifa, sem serifa e com contraste invertido",
      "Influência do zoom do navegador e da escala do sistema operacional na leitura"
    ],
    cannotMeasure: [
      "Geometria física microscópica dos subpixels sem lente macro ou microscópio",
      "Parâmetros internos de renderização do DirectWrite ou ClearType",
      "Função de transferência de modulação óptica (MTF) do painel"
    ],
    interpretation: "Se as letras parecerem embaçadas ou com contornos coloridos, reexecutar o Ajustador de Texto ClearType no Windows costuma corrigir falhas em painéis BGR.",
    nextSteps: {
      text: "¿Fontes borradas ou com halos coloridos? Siga nosso guia para ajustar o ClearType e o escalonamento.",
      actionLabel: "Guia de Nitidez de Texto",
      actionHref: "/knowledge-base/troubleshooting#blurry-text-scaling"
    }
  },

    "hdr-capability-test": {
    "overview": "O Detector de Hardware e Sinal HDR audita se o compositor de janelas do SO, driver de vídeo e pipeline do navegador estão comunicando sinais HDR. Ele analisa CSS Media Queries Nível 4 (dynamic-range: high), gama ampla (Rec.2020 / Display-P3), buffers Canvas P3, alvos WebGL float e codecs de vídeo HDR de 10 bits acelerados por hardware.",
    "whatToLookFor": [
        {
            "label": "Estado do Sinal HDR do Compositor",
            "description": "Confirma se o compositor de janelas do SO emite sinal HDR para o navegador. Se inativo, o HDR está desativado nas configurações do sistema."
        },
        {
            "label": "Profundidade de Buffer e Pipeline",
            "description": "Detecta a profundidade de cor (24 bits SDR vs 30 bits+ HDR) e verifica se Canvas e WebGL2 conseguem alocar buffers P3 e float."
        },
        {
            "label": "Gama Ampla (Rec.2020 e P3)",
            "description": "Avalia se o monitor suporta volume de cor além do sRGB padrão para vermelhos carmesim e verdes esmeralda vibrantes."
        },
        {
            "label": "Aceleração de Codecs de Vídeo HDR",
            "description": "Testa suporte à decodificação por hardware para HDR10 (HEVC Main 10), AV1 de 10 bits (YouTube HDR) e VP9 Perfil 2."
        }
    ],
    "canObserve": [
        "Estado de saída HDR em tempo real do compositor do sistema operacional",
        "Suporte de hardware e navegador para gamas Display-P3 e Rec.2020",
        "Profundidade de cor do buffer de tela e suporte a buffers float",
        "Capacidade de reprodução acelerada por hardware de codecs de 10 bits"
    ],
    "cannotMeasure": [
        "Pico físico de brilho (nits) sem um colorímetro óptico de laboratório",
        "Conformidade de nível de certificação VESA DisplayHDR (ex: DisplayHDR 400 vs 600 vs 1000)",
        "Número de zonas físicas de local dimming em telas Mini-LED"
    ],
    "interpretation": "Se dynamic-range constar como padrão (inativo), pressione Win + Alt + B no Windows ou ative o HDR nas configurações do macOS.",
    "nextSteps": {
        "text": "Deseja inspecionar corte de realces, curvas tonais e nits de pico? Inicie o teste óptico.",
        "actionLabel": "Iniciar Inspeção Visual HDR",
        "actionHref": "/tests/hdr-test"
    }
},

  "hdr-test": {
    "overview": "O teste de Calibração Visual e Inspeção de Realces HDR oferece padrões ópticos controlados para avaliar como o painel responde fisicamente aos sinais HDR. Ele testa pontos de corte em realces especulares, mapeamento de tons, pico de brilho em janela APL de 10%, curvas PQ/EOTF e sombras.",
    "whatToLookFor": [
        {
            "label": "Rolloff e Corte de Realces Especulares",
            "description": "Inspecione os blocos de 90% a 100% de branco pico. As retículas circulares devem permanecer visíveis sem estourar em branco plano."
        },
        {
            "label": "Janela de Brilho Pico 10% APL",
            "description": "Uma janela de 10% sobre fundo preto absoluto testa os nits de pico, local dimming e halos de luz."
        },
        {
            "label": "Gradação de Curva PQ / EOTF",
            "description": "Compara gradientes suaves de 10 bits com rampas de 8 bits para revelar artefatos de banding e compressão tonal excessiva."
        },
        {
            "label": "Detalhe em Sombras (Black Crush)",
            "description": "Verifica se tons escuros sutis (0,5% a 5%) se distinguem do preto 0% absoluto sem elevar os níveis de preto."
        }
    ],
    "canObserve": [
        "Ponto de corte de realces especulares através dos níveis de branco",
        "Halos de local dimming e reserva de brilho pico na janela 10% APL",
        "Fluidez de transições tonais de 10 bits versus banding de 8 bits",
        "Separação de detalhes em sombras e comportamento de esmagamento de pretos"
    ],
    "cannotMeasure": [
        "Pico exato de luminância em nits sem sensores de laboratório",
        "Precisão de temperatura de cor (Kelvin) sem espectrofotômetro",
        "Tempo de resposta de pixel ou overshoot de overdrive"
    ],
    "interpretation": "Monitores com mapeamento de tons deficiente estouram realces acima de 94% ou esmagam detalhes escuros. Telas OLED e Mini-LED premium retêm retículas até 99%.",
    "nextSteps": {
        "text": "Precisa verificar se o sistema operacional e codecs de vídeo suportam HDR? Acesse o detector de hardware.",
        "actionLabel": "Verificar Hardware e Sinal HDR",
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
    "overview": "O inspetor de saúde de bateria e energia monitora o nível de carga, conexão com a tomada e estimativas de autonomia usando a API W3C Battery Status.",
    "whatToLookFor": [
        {
            "label": "Nível de carga em tempo real",
            "description": "Acompanha a porcentagem da bateria reportada pelo sistema operacional."
        },
        {
            "label": "Conexão com adaptador AC",
            "description": "Identifica se o dispositivo está na tomada ou na bateria interna."
        },
        {
            "label": "Tempo de recarga e autonomia",
            "description": "Calcula a duração estimada até carga total ou até o descarregamento."
        },
        {
            "label": "Histórico de descarga",
            "description": "Monitora o consumo elétrico durante a execução de testes visuais."
        }
    ],
    "canObserve": [
        "Porcentagem de bateria em tempo real reportada pelo SO",
        "Transição entre carregamento e descarga via eventos nativos",
        "Segundos estimados até recarga completa ou esgotamento",
        "Tendência de nível de carga na sessão ativa"
    ],
    "cannotMeasure": [
        "Degradação química em mAh sem software do fabricante",
        "Temperatura interna, impedância ou contagem de ciclos",
        "Métricas em navegadores que restringem a API por privacidade"
    ],
    "interpretation": "Se o navegador indicar ausência de suporte, deve-se a proteções de privacidade contra fingerprinting. Quedas repentinas indicam desgaste da bateria.",
    "nextSteps": {
        "text": "Deseja verificar a velocidade de download e latência da rede?",
        "actionLabel": "Testar velocidade de rede",
        "actionHref": "/tests/network-speed-test"
    }
},

  "network-speed-test": {
    "overview": "O teste de velocidade de rede e latência avalia ping, jitter, tipo de conexão e taxa de download através das APIs de temporização do navegador.",
    "whatToLookFor": [
        {
            "label": "Latência Ping (RTT)",
            "description": "Mede o tempo de ida e volta dos pacotes até o servidor em milissegundos."
        },
        {
            "label": "Taxa de Download (Mbps)",
            "description": "Calcula a largura de banda efetiva durante o recebimento de pacotes."
        },
        {
            "label": "Tipo de Conexão",
            "description": "Detecta o tipo de rede efetivo (4G, Wi-Fi, cabo) e teto de downlink."
        },
        {
            "label": "Estabilidade e Jitter",
            "description": "Identifica flutuações e atrasos entre pings consecutivos."
        }
    ],
    "canObserve": [
        "Tempo de ida e volta HTTP/HTTPS em milissegundos",
        "Classe de conexão efetiva via navigator.connection",
        "Velocidade real de download calculada por transferência de dados",
        "Status do modo de economia de dados do navegador"
    ],
    "cannotMeasure": [
        "Latência pura de socket TCP sem sobrecarga do navegador",
        "Atenuação de linha física ou margens de ruído do modem",
        "Interferência de radiofrequência no canal Wi-Fi"
    ],
    "interpretation": "Pings abaixo de 30 ms são excelentes para jogos online. Velocidades acima de 50 Mbps garantem reprodução suave em 4K HDR.",
    "nextSteps": {
        "text": "Deseja verificar o tempo de resposta entre o clique e a tela?",
        "actionLabel": "Testar latência de entrada",
        "actionHref": "/tests/input-lag-test"
    }
},

  "color-blindness-test": {
    "overview": "O simulador de daltonismo aplica matrizes SVG para emular 8 variações de deficiência visual de cores, permitindo auditar acessibilidade e contraste visual.",
    "whatToLookFor": [
        {
            "label": "Protanopia e Protanomalia (Vermelho)",
            "description": "Deficiência de cones L; tons de vermelho tornam-se marrons escuros ou acinzentados."
        },
        {
            "label": "Deuteranopia e Deuteranomalia (Verde)",
            "description": "Deficiência de cones M; verdes e vermelhos fundem-se em nuances amareladas."
        },
        {
            "label": "Tritanopia e Tritanomalia (Azul)",
            "description": "Deficiência de cones S; azul parece esverdeado e amarelo aparece lilás ou cinza."
        },
        {
            "label": "Acromatopsia (Visão monocromática)",
            "description": "Ausência total de cones funcionais; visualização restrita à escala de cinza."
        }
    ],
    "canObserve": [
        "Transformação em tempo real de textos, gráficos e botões com 8 matrizes",
        "Comparativo lado a lado entre visão tricromática normal e deficiência simulada",
        "Perda de contraste entre indicadores de sucesso (verde) e erro (vermelho)",
        "Legibilidade tipográfica em cada variante de visão cromática"
    ],
    "cannotMeasure": [
        "Diagnóstico clínico oftalmológico do usuário",
        "Sensibilidade individual dos fotorreceptores da retina",
        "Espectro de emissão da retroiluminação sem espectrorradiômetro"
    ],
    "interpretation": "Se avisos importantes tornam-se indistinguíveis em Deuteranopia ou Protanopia, adicione ícones e rótulos textuais para atender às diretrizes WCAG 2.2.",
    "nextSteps": {
        "text": "Verifique a cobertura de espaço de cores sRGB e DCI-P3 do monitor.",
        "actionLabel": "Testar gama de cores",
        "actionHref": "/tests/color-gamut-test"
    }
},

  "screen-recorder": {
    "overview": "O gravador de tela e captura utiliza as APIs Screen Capture e MediaRecorder para registrar janelas, guias ou telas inteiras em WebM e salvar capturas em PNG com fidelidade total de pixels.",
    "whatToLookFor": [
        {
            "label": "Resolução do fluxo de vídeo",
            "description": "Verifica se as dimensões do vídeo gravado correspondem à resolução nativa da tela."
        },
        {
            "label": "Taxa de quadros por segundo",
            "description": "Acompanha a fluidez de captura e duração em tempo real."
        },
        {
            "label": "Áudio de sistema integrado",
            "description": "Grava áudio do sistema ou guia junto com a imagem da tela."
        },
        {
            "label": "Captura de tela PNG nítida",
            "description": "Exporta instantaneamente um quadro congelado em alta resolução PNG."
        }
    ],
    "canObserve": [
        "Dimensões do fluxo de vídeo, proporção e taxa de quadros",
        "Tempo de gravação, estado de pausa e tamanho do arquivo WebM",
        "Exportação de buffer Canvas para imagem PNG para download",
        "Permissões do navegador para compartilhamento de tela"
    ],
    "cannotMeasure": [
        "Latência de codificação da GPU no nível do sistema operacional",
        "Conteúdos protegidos por DRM (reproduzidos como tela preta por segurança)",
        "Taxa de atualização física além das limitações do navegador"
    ],
    "interpretation": "Toda a gravação e captura é mantida estritamente na memória local do navegador, sem envio para a nuvem, garantindo confidencialidade.",
    "nextSteps": {
        "text": "Deseja verificar o funcionamento e foco da sua webcam?",
        "actionLabel": "Testar webcam",
        "actionHref": "/tests/webcam-test"
    }
},

  "dark-mode-test": {
    "overview": "O teste de modo escuro e temas avalia a sincronização de prefers-color-scheme, propriedades CSS color-scheme e contraste tipográfico em paletas claras e escuras.",
    "whatToLookFor": [
        {
            "label": "Sincronização com o SO",
            "description": "Verifica se o navegador responde às preferências de tema do sistema operacional."
        },
        {
            "label": "Suporte a CSS color-scheme",
            "description": "Testa barras de rolagem e campos de formulário nativos no modo escuro."
        },
        {
            "label": "Contraste de componentes",
            "description": "Avalia a legibilidade de textos, botões e cartões em ambos os modos."
        },
        {
            "label": "Preto puro para OLED",
            "description": "Avalia o uso de #000000 para economia energética em telas OLED."
        }
    ],
    "canObserve": [
        "Detecção de prefers-color-scheme via matchMedia em tempo real",
        "Suporte a controles de formulário nativos no modo escuro",
        "Alternância interativa entre Sistema, Claro e Escuro",
        "Legibilidade tipográfica em superfícies claras e escuras"
    ],
    "cannotMeasure": [
        "Economia elétrica real em miliamperes sem equipamento de bancada",
        "Adaptação à luz ambiente sem sensor integrado",
        "Filtros de luz azul do sistema operacional"
    ],
    "interpretation": "Telas OLED desligam subpixels em áreas pretas puras, economizando bateria e reduzindo o estresse ocular em ambientes com pouca luz.",
    "nextSteps": {
        "text": "Meça a iluminação do ambiente para regular o brilho ideal da tela.",
        "actionLabel": "Testar sensor de luz ambiente",
        "actionHref": "/tests/ambient-light-test"
    }
},

  "input-lag-test": {
    "overview": "O visualizador de latência de entrada realiza um benchmark estatístico de 10 tentativas medindo o atraso entre o sinal visual e o clique do mouse, com cálculo de média, desvio padrão e histograma.",
    "whatToLookFor": [
        {
            "label": "Tempo de reação visual",
            "description": "Mede os milissegundos decorridos entre a mudança para verde e o clique."
        },
        {
            "label": "Consistência estatística",
            "description": "Desvio padrão baixo (< 25 ms) reflete estabilidade de hardware e reflexos."
        },
        {
            "label": "Detecção de largada falsa",
            "description": "Registra e descarta cliques prematuros na fase vermelha."
        },
        {
            "label": "Histograma de distribuição",
            "description": "Exibe a concentração dos tempos de reação obtidos."
        }
    ],
    "canObserve": [
        "Registros de alta precisão via performance.now()",
        "Métricas estatísticas: média, melhor, pior tempo e desvio padrão em 10 testes",
        "Máquina de estados contra cliques antecipados",
        "Histograma de distribuição de faixas de latência"
    ],
    "cannotMeasure": [
        "Latência clique-para-fóton com sensor óptico externo (como LDAT)",
        "Taxa de polling USB isolada das interrupções do sistema operacional",
        "Tempo de resposta físico dos cristais líquidos"
    ],
    "interpretation": "Valores entre 180 ms e 240 ms são comuns em monitores rápidos. Acima de 300 ms, recomenda-se ativar o Modo Jogo no monitor.",
    "nextSteps": {
        "text": "Verifique a taxa de atualização real do seu monitor.",
        "actionLabel": "Testar taxa de atualização",
        "actionHref": "/tests/refresh-rate-test"
    }
},

  "ambient-light-test": {
    "overview": "O teste do sensor de luz ambiente lê valores de iluminância em lux (lx) usando a API AmbientLightSensor e recomenda níveis ergonômicos de brilho da tela.",
    "whatToLookFor": [
        {
            "label": "Iluminância em lux em tempo real",
            "description": "Mede a luz do ambiente captada pelo sensor do dispositivo."
        },
        {
            "label": "Recomendação ergonômica de brilho",
            "description": "Indica o ajuste ideal de brilho para a iluminação da sala."
        },
        {
            "label": "Aviso de reflexos",
            "description": "Alerta para iluminação excessiva (> 1000 lx) que causa ofuscamento."
        },
        {
            "label": "Estabilidade da luz",
            "description": "Monitora variações de luz natural ou lâmpadas oscilantes."
        }
    ],
    "canObserve": [
        "Valores de iluminância em lux fornecidos pelo sensor físico",
        "Classificação do ambiente (escuro, moderado, escritório, ensolarado)",
        "Porcentagem de brilho sugerida com base em normas ergonômicas",
        "Gráfico do histórico de luminosidade durante a sessão"
    ],
    "cannotMeasure": [
        "Medições em navegadores sem suporte à Generic Sensor API",
        "Temperatura de cor (Kelvin) ou índice IRC das lâmpadas",
        "Ângulos de reflexo direto na superfície da tela"
    ],
    "interpretation": "Ambientes de trabalho confortáveis devem ficar entre 300 e 500 lx com tela ajustada entre 120 e 150 nits. Ambientes escuros (< 50 lx) exigem brilho baixo.",
    "nextSteps": {
        "text": "Calibre o brilho e os pontos de preto do seu monitor.",
        "actionLabel": "Testar brilho",
        "actionHref": "/tests/brightness-test"
    }
},

  "dpi-calculator": {
    "overview": "A calculadora de DPI e PPI calcula densidade de pixels, espaçamento entre pontos (dot pitch), megapixels totais e distância limite Retina a partir do tamanho diagonal e resolução.",
    "whatToLookFor": [
        {
            "label": "Pixels por polegada (PPI)",
            "description": "Mede a concentração de pixels na diagonal da tela."
        },
        {
            "label": "Espaçamento de pontos (Dot Pitch)",
            "description": "Calcula a distância física entre centros de subpixels em milímetros."
        },
        {
            "label": "Distância de visualização Retina",
            "description": "Indica a distância em que o olho humano não distingue pixels individuais (60 PPD)."
        },
        {
            "label": "Proporção e megapixels",
            "description": "Calcula a área total do painel, proporção e número de pixels."
        }
    ],
    "canObserve": [
        "PPI calculado, espaçamento de pontos em mm e total de megapixels",
        "Distâncias ergonômicas e limite Retina em centímetros e polegadas",
        "Predefinições para monitores comuns (24\" 1080p, 27\" 1440p, 32\" 4K)",
        "Controles interativos para diagonal e resolução"
    ],
    "cannotMeasure": [
        "Medidas físicas das bordas externas sem inserção do usuário",
        "Perda de nitidez por revestimentos foscos antirreflexo",
        "Distorção anamórfica sem dimensões exatas"
    ],
    "interpretation": "Densidades acima de 110 PPI proporcionam excelente clareza de texto, enquanto acima de 220 PPI alcançam fidelidade Retina à distância normal de mesa (50 a 60 cm).",
    "nextSteps": {
        "text": "Teste a nitidez tipográfica e a renderização de subpixels.",
        "actionLabel": "Testar clareza de texto",
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

