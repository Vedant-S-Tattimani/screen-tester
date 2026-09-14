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

  "hdr-test": {
    overview: "Telas HDR oferecem picos luminosos mais elevados e uma gama de cores expandida. Este teste afere o suporte a HDR no navegador e permite inspecionar visualmente o mapeamento de tons e o corte em altas luzes.",
    whatToLookFor: [
      {
        label: "Identificação de HDR no navegador",
        description: "Confirme se '(dynamic-range: high)' é informado como ativo. Caso contrário, ative o HDR nas configurações do sistema."
      },
      {
        label: "Detalhamento em brancos extremos",
        description: "Nos cartões de 90%, 94%, 97% e 99% de branco, os símbolos internos devem permanecer discerníveis do fundo."
      },
      {
        label: "Corte de altas luzes (Clipping)",
        description: "Se os blocos de 94% a 100% se fundirem em uma única mancha branca sólida, o monitor está cortando em vez de mapear nuances."
      },
      {
        label: "Amplitude da gama cromática",
        description: "Observe se as cores de alta saturação exibem maior impacto visual do que em conteúdos SDR normais."
      }
    ],
    canObserve: [
      "Sinalização do ambiente do navegador para alto alcance dinâmico e profundidade de cor",
      "Separação visual de nuances claras até o branco de pico",
      "Visibilidade de detalhes em sombras em áreas de teste HDR"
    ],
    cannotMeasure: [
      "Pico real de luminância em cd/m² (nits) sem medidor óptico dedicado",
      "Enquadramento em categorias formais VESA DisplayHDR (ex.: DisplayHDR 400 vs. 1000)",
      "Aderência estrita à curva de resposta eletro-óptica PQ (ST 2084 EOTF)"
    ],
    interpretation: "Vários monitores rotulados como 'HDR400' não possuem escurecimento local (local dimming) nem passam do brilho SDR, podendo gerar imagens lavadas ao ativar o modo.",
    nextSteps: {
      text: "¿O HDR parece lavado ou escuro demais? Leia nosso guia de calibragem de HDR.",
      actionLabel: "Dicas de Solução HDR",
      actionHref: "/knowledge-base/troubleshooting#hdr-not-working"
    }
  },

  "resolution-checker": {
    overview: "Os sistemas operacionais adotam fatores de escala para manter janelas e botões legíveis em telas densas, gerando discrepâncias entre pixels lógicos CSS e pontos físicos do painel. Esta ferramenta verifica resoluções, DPR e área livre.",
    whatToLookFor: [
      {
        label: "Resolução nativa vs. lógica",
        description: "Um monitor 4K com 150% de escala reporta 2560×1440 pixels CSS com DPR de 1,5, perfazendo 3840×2160 pixels físicos reais."
      },
      {
        label: "Proporção de pixels do dispositivo (DPR)",
        description: "O multiplicador de escala entre pixels CSS e pontos da tela (ex.: 1,0 = 100%, 1,25 = 125%, 2,0 = 200%)."
      },
      {
        label: "Área de trabalho disponível",
        description: "Screen.availWidth e availHeight mostram o espaço livre após subtrair a barra de tarefas ou dock do sistema."
      },
      {
        label: "Janela ativa vs. tela inteira",
        description: "Window.innerWidth/innerHeight indica o tamanho da janela do navegador, separado da resolução total do monitor."
      }
    ],
    canObserve: [
      "Dimensões de tela fornecidas pelo navegador (screen.width, screen.height, availWidth/Height)",
      "Fator de escala (devicePixelRatio) e resolução de renderização física calculada",
      "Dimensões do viewport de layout CSS e orientação do display"
    ],
    cannotMeasure: [
      "Matriz física do painel caso a placa gráfica ou um aparelho externo reduza a resolução do sinal",
      "Escalonamentos impostos por placas de captura de vídeo ou aparelhos de TV",
      "Modos de pixel não quadrado forçados via hardware"
    ],
    interpretation: "Se a resolução informada não bater com a caixa do produto, confira a porcentagem de Escala nas configurações de vídeo do Windows; voltar para 100% restabelece a leitura 1:1.",
    nextSteps: {
      text: "Compare resoluções, tamanhos de tela e densidade PPI com nossa ferramenta interativa.",
      actionLabel: "Comparar Telas e Calcular PPI",
      actionHref: "/tests/compare-displays"
    }
  },

  "display-info": {
    overview: "O navegador web disponibiliza dados sobre a tela ativa, área útil de janela, profundidade de cor e recursos de toque. Este painel compila todos os dados acessíveis em uma visão única.",
    whatToLookFor: [
      {
        label: "Profundidade de cores indicada",
        description: "Screen.colorDepth informa os bits por canal (normalmente 24 bits para 8 bits RGB ou 30 bits para 10 bits)."
      },
      {
        label: "Detecção de tela sensível ao toque",
        description: "Navigator.maxTouchPoints revela se o navegador detecta um digitalizador de toque ativo no equipamento."
      },
      {
        label: "Políticas de múltiplos monitores",
        description: "Por segurança, os navegadores não podem ler nomes de modelos ou números de série sem autorização específica de gerenciamento de janelas."
      },
      {
        label: "Ritmo de animação em tempo real",
        description: "A telemetria do relógio de animação oferece uma estimativa em tempo real da cadência de renderização da aba."
      }
    ],
    canObserve: [
      "Parâmetros padronizados DOM de Screen, Window, Navigator e Media Queries",
      "Proporção de pixels do dispositivo, profundidade de cores e orientação",
      "Capacidades de ponteiro e compatibilidade com toques na tela"
    ],
    cannotMeasure: [
      "Número de série ou modelo EDID do monitor sem autorização de nível avançado",
      "Largura de banda de cabos HDMI ou DisplayPort",
      "Frequência de atualização de hardware do painel desconsiderando limitações do sistema"
    ],
    interpretation: "Aplicações de navegador operam em ambiente protegido. Os valores exibidos refletem o que o sistema operacional e o gerenciador de janelas informam à aplicação.",
    nextSteps: {
      text: "¿Quer inspecionar a geometria e a proporção de tela do seu display? Inicie o teste de escala.",
      actionLabel: "Testar Escala e Proporção",
      actionHref: "/tests/scaling-aspect-test"
    }
  },

  "scaling-aspect-test": {
    overview: "Configurações erradas de proporção na GPU ou na tela deformam círculos em ovais e embaçam caracteres. Este teste exibe figuras de referência (círculos e quadrados) e guias de enquadramento (16:9, 16:10, 21:9, 4:3) para garantir proporções 1:1 de pixels quadrados perfeitos.",
    whatToLookFor: [
      {
        label: "Forma circular perfeita",
        description: "Verifique se o círculo central é perfeitamente redondo. Se parecer achatado ou esticado, a proporção está distorcida."
      },
      {
        label: "Pixels perfeitamente quadrados (1:1)",
        description: "Verifique a grade quadriculada: cada quadrado deve ter exatamente a mesma largura e altura."
      },
      {
        label: "Alinhamento com guias de proporção",
        description: "Confira se a área de imagem coincide com os marcos padrão de 16:9 (widescreen), 16:10 ou 21:9 (ultrawide)."
      },
      {
        label: "Modo de escalonamento na GPU",
        description: "Se surgirem faixas pretas mesmo na resolução nativa, confira os ajustes de escala no painel da placa de vídeo."
      }
    ],
    canObserve: [
      "Geometria visual de círculos e grades quadriculadas no viewport do navegador",
      "Alinhamento com gabaritos de aspecto nas proporções 16:9, 16:10, 21:9 e 4:3",
      "Cálculo da proporção dimensional da janela do navegador"
    ],
    cannotMeasure: [
      "Medidas físicas em milímetros da moldura do monitor",
      "Distorções ópticas anamórficas introduzidas por lentes de projetor",
      "Modos de proporção forçados por processadores de vídeo externos"
    ],
    interpretation: "Distorções de tela ocorrem comumente ao usar resoluções fora da nativa sem marcar 'Preservar proporção' nos painéis de controle da NVIDIA, AMD ou Intel.",
    nextSteps: {
      text: "¿Conectou seu computador a uma TV? Verifique cortes nas bordas com o teste de overscan.",
      actionLabel: "Testar Overscan de TV",
      actionHref: "/tests/tv-overscan-test"
    }
  },

  "compare-displays": {
    overview: "Tamanho de tela, resolução e densidade de pixels (PPI) definem a área de trabalho e a nitidez. Esta ferramenta calcula medidas físicas, total de pixels e densidade para colocar dois monitores lado a lado em escala proporcional.",
    whatToLookFor: [
      {
        label: "Densidade de pixels (PPI)",
        description: "Quanto maior o PPI, mais nítidos ficam os textos. ~110 PPI é o padrão em monitores de escritório; ~220 PPI atinge o patamar Retina."
      },
      {
        label: "Largura e altura físicas",
        description: "Compare o espaço visual útil: um monitor de 27 polegadas 16:9 oferece muito mais altura que um ultrawide de 29 polegadas (21:9)."
      },
      {
        label: "Contagem total de pixels",
        description: "Um display 4K (8,29 megapixels) reúne quatro vezes mais pixels que uma tela Full HD padrão de 1080p (2,07 megapixels)."
      },
      {
        label: "Distância ideal de visualização",
        description: "Com densidades mais altas, você pode se aproximar da tela sem enxergar a grade física entre os pixels (efeito tela de arame)."
      }
    ],
    canObserve: [
      "Cálculo matemático de PPI, formatos e áreas úteis conforme os números digitados",
      "Comparativo visual em escala proporcional entre os dois modelos de tela",
      "Cálculo do tamanho do ponto (Dot Pitch em milímetros)"
    ],
    cannotMeasure: [
      "Leitura automática da diagonal do monitor sem entrada do usuário",
      "Detecção óptica do tamanho da tela pelas APIs comuns de navegador",
      "Espessura das bordas ou medidas da base do monitor"
    ],
    interpretation: "A densidade de pixels é calculada pelo teorema de Pitágoras dividindo a resolução diagonal pelas polegadas da tela. Como o navegador não consegue ler as polegadas da carcaça, a inserção manual é obrigatória.",
    nextSteps: {
      text: "Entenda como a densidade de pixels afeta a nitidez dos textos nos diferentes sistemas operacionais.",
      actionLabel: "Guia de Nitidez de Texto",
      actionHref: "/knowledge-base/text-clarity-and-subpixel-rendering"
    }
  },

  "tv-overscan-test": {
    overview: "O overscan é um recurso herdado dos televisores antigos que amplia a imagem e corta entre 2% e 5% das bordas externas. Ao ligar um computador ou videogame, ele esconde a barra de tarefas e embaça as fontes ao quebrar o mapeamento 1:1.",
    whatToLookFor: [
      {
        label: "Visibilidade da margem de 0%",
        description: "Se você não enxergar a linha branca mais externa com os marcadores de '0%', sua TV está cortando a imagem com overscan ativo."
      },
      {
        label: "Marcas percentuais de corte",
        description: "Veja qual linha encosta na moldura da TV (2,5% ou 5%) para saber quanto do seu desktop está sendo descartado."
      },
      {
        label: "Miras de alinhamento nos quatro cantos",
        description: "As miras angulares devem terminar rente ao limite físico do painel do televisor."
      },
      {
        label: "Nitidez do padrão de 1 pixel",
        description: "Examine o quadriculado de 1 pixel: se ele cintilar ou ficar turvo, a TV está interpolando e desfocando a imagem."
      }
    ],
    canObserve: [
      "Visibilidade das bordas e marcas de corte percentual (0%, 2,5%, 5%) em todo o perímetro",
      "Integridade do padrão de 1 pixel para acusar perda de nitidez por reamostragem",
      "Checagem visual antes e depois de trocar os formatos de proporção na TV"
    ],
    cannotMeasure: [
      "Comando de menus internos de configuração da TV através do navegador",
      "Detecção automática do modo de aspecto de imagem ativo via HDMI-CEC",
      "Borda física da carcaça versus corte eletrônico do sinal"
    ],
    interpretation: "Para obter fontes cristalinas e recuperar o desktop inteiro, entre nos ajustes de Formato de Tela ou Tamanho da Imagem da sua TV e mude para 'Ajuste Justo', '1:1 Pixel', 'Ajustar à Tela', 'Ponto a Ponto' ou 'Original'.",
    nextSteps: {
      text: "¿Precisa de ajuda para ativar o mapeamento 1:1 em TVs Samsung, LG, Sony ou TCL?",
      actionLabel: "Guia de Overscan de TV e Mapeamento 1:1",
      actionHref: "/knowledge-base/tv-overscan-and-pixel-mapping"
    }
  },

  "multi-touch-test": {
    overview: "Este teste monitora toques simultâneos em telas táteis, tablets e telas interativas. Ele plota coordenadas, registra o total de pontos ativos e verifica se gestos com múltiplos dedos chegam sem falhas ao navegador.",
    whatToLookFor: [
      {
        label: "Contagem de toques simultâneos",
        description: "Encoste vários dedos ao mesmo tempo na tela. Veja se o contador marca confiavelmente 2, 5 ou 10 toques simultâneos."
      },
      {
        label: "Fluidez no rastreio",
        description: "Arraste vários dedos para confirmar que os traços continuam firmes sem interrupções de leitura."
      },
      {
        label: "Conflito com gestos do sistema",
        description: "Observe se encostar 3 ou 4 dedos ativa atalhos do sistema (como trocar de app) em vez de registrar toques na página."
      },
      {
        label: "Rejeição de palma (Palm Rejection)",
        description: "Apoie a lateral da mão enquanto toca com os dedos para conferir como o painel descarta áreas extensas de contato."
      }
    ],
    canObserve: [
      "Eventos de ponteiro e toque encaminhados em tempo real à janela do navegador",
      "Coordenadas, identificadores e contagem total de toques simultâneos",
      "Propriedade navigator.maxTouchPoints informada pelo navegador"
    ],
    cannotMeasure: [
      "Frequência de amostragem do digitalizador em Hertz (ex.: 120Hz vs 240Hz de taxa de toque)",
      "Níveis de pressão capacitiva sem APIs de hardware dedicadas",
      "Defeitos físicos na malha de trilhas do digitalizador não acusados pelo driver"
    ],
    interpretation: "A quantidade de toques simultâneos depende do sensor digitalizador físico e das permissões de driver do sistema operacional.",
    nextSteps: {
      text: "¿Quer averiguar se existem pontos cegos e testar a continuidade de desenho em toda a tela?",
      actionLabel: "Testar Superfície de Toque",
      actionHref: "/tests/touch-screen-test"
    }
  },

  "webcam-test": {
    overview: "Comunica-se com sua câmera por meio da API WebRTC do navegador (getUserMedia). Permite avaliar a nitidez do vídeo, confirmar resoluções suportadas (720p, 1080p, 4K), verificar a taxa de quadros e resolver bloqueios de permissão localmente.",
    whatToLookFor: [
      {
        label: "Resolução do fluxo de vídeo",
        description: "Confira se a resolução indicada confere com o anunciado na embalagem da câmera (ex.: 1920×1080 Full HD)."
      },
      {
        label: "Estabilidade da taxa de quadros (FPS)",
        description: "Monitore o contador de FPS. Em locais com pouca luz, muitos sensores baixam para 15-20 FPS para clarear a cena."
      },
      {
        label: "Equilíbrio de cores e exposição",
        description: "Verifique se há estouro de luz no rosto, fidelidade de balanço de branco com luz artificial e ruído em áreas escuras."
      },
      {
        label: "Avisos de permissão da câmera",
        description: "Assegure-se de que o navegador solicita e salva o acesso à câmera sem conflitos com outros programas."
      }
    ],
    canObserve: [
      "Fluxo de vídeo ao vivo processado exclusivamente de modo local na aba do seu navegador",
      "Dimensões negociadas da transmissão (largura, altura) e taxa de quadros obtida",
      "Identificação de aparelhos e enumeração pela interface MediaDeviceInfo"
    ],
    cannotMeasure: [
      "Resolução óptica nativa do sensor além do limite imposto pelo driver",
      "Distorções ópticas, aberrações cromáticas ou alcance de zoom da lente",
      "Sensibilidade em lux aferida com calibração sob diferentes intensidades de luz"
    ],
    interpretation: "Os fluxos de vídeo dependem dos drivers do seu sistema operacional. Se faltarem opções de alta resolução, confira a banda das portas USB ou chaves físicas de privacidade.",
    nextSteps: {
      text: "¿A câmera não aparece ou os acessos estão negados? Consulte nosso guia de solução de problemas.",
      actionLabel: "Dicas de Problemas com Webcam",
      actionHref: "/knowledge-base/troubleshooting#webcam-access-denied"
    }
  },

  "speaker-test": {
    overview: "Utiliza a Web Audio API para checar alto-falantes, caixas de som e fones de ouvido. Testa o isolamento dos canais estéreo (Esquerdo, Direito e Ambos) e executa varreduras de frequência (20Hz a 20.000Hz) para encontrar distorções e ruídos.",
    whatToLookFor: [
      {
        label: "Separação estéreo dos canais",
        description: "Ao tocar o tom do Canal Esquerdo, o áudio deve sair exclusivamente do alto-falante ou fone do lado esquerdo."
      },
      {
        label: "Resposta em subgraves (20Hz–100Hz)",
        description: "Preste atenção aos sons mais graves. Alto-falantes embutidos em notebooks costumam cortar frequências abaixo de 80–100Hz."
      },
      {
        label: "Alcance das altas frequências (10kHz–20kHz)",
        description: "Descubra em qual faixa o som deixa de ser audível, seja por limitação física do falante ou atenuação auditiva natural."
      },
      {
        label: "Vibrações e estalos na carcaça",
        description: "Tons médios-graves (100Hz–300Hz) frequentemente revelam peças soltas na mesa ou ressonâncias na caixa de som."
      }
    ],
    canObserve: [
      "Geração de áudio sintetizado e distribuição estéreo nos canais Esquerdo, Direito e Centro",
      "Varreduras ininterruptas de frequência por todo o alcance auditivo humano (20Hz a 20.000Hz)",
      "Taxa de amostragem do AudioContext e compatibilidade de saída da Web Audio API"
    ],
    cannotMeasure: [
      "Pressão sonora real (SPL em decibéis, dB) sem microfone de medição certificado",
      "Distorção harmônica total (THD) ou impedância elétrica dos alto-falantes",
      "Curva de resposta acústica do ambiente em que você se encontra"
    ],
    interpretation: "O teste estéreo assegura que sua saída de som não foi convertida inadvertidamente para mono. Varreduras auxiliam na identificação de diafragmas rompidos ou caixas vibrando.",
    nextSteps: {
      text: "¿Sem som ou os canais estão trocados? Acesse nosso guia de solução para áudio.",
      actionLabel: "Guia de Solução para Alto-Falantes",
      actionHref: "/knowledge-base/troubleshooting#speaker-no-sound"
    }
  },

  "accelerometer-test": {
    overview: "O Teste de Acelerômetro mede a aceleração linear e as forças gravitacionais em três eixos físicos (X, Y e Z) por meio da API DeviceMotionEvent. Visualiza a inclinação, movimentação dinâmica e a atração gravitacional terrestre de 1g em tempo real.",
    whatToLookFor: [
      {
        label: "Distribuição da Gravidade (1g)",
        description: "Repousando sobre uma mesa nivelada, o eixo Z deve marcar aproximadamente ~9,8 m/s² (1g), enquanto X e Y permanecem perto de 0 m/s²."
      },
      {
        label: "Resposta durante Inclinação",
        description: "Inclinar o aparelho para esquerda ou direita altera o eixo X, enquanto inclinar para frente ou trás varia o eixo Y suavemente."
      },
      {
        label: "Picos de Movimento Rápido",
        description: "Sacudir ou mover o aparelho bruscamente gera picos transitórios de aceleração no gráfico interativo em tempo real."
      },
      {
        label: "Permissão de Sensores",
        description: "No iOS Safari, é necessária uma confirmação explícita do usuário para autorizar o acesso aos dados de movimento."
      }
    ],
    canObserve: [
      "Aceleração com e sem gravidade nos eixos X, Y e Z em m/s²",
      "Frequência de amostragem e intervalos de atualização suportados pelo navegador",
      "Retículo visual interativo responsivo ao vetor gravitacional"
    ],
    cannotMeasure: [
      "Desvio calibrado de fábrica ou deslocamento de ponto zero de precisão laboratorial",
      "Microdefeitos estruturais no chip de silício MEMS",
      "Localização geográfica absoluta ou coordenadas GPS"
    ],
    interpretation: "Um acelerômetro funcional exibe uma aceleração gravitacional estável de ~9,8 m/s² no eixo direcionado para baixo. Valores travados ou nulos apontam para restrições de permissões no sistema operacional.",
    nextSteps: {
      text: "Os valores não mudam ou ficam em zero? Consulte nosso guia de solução para sensores.",
      actionLabel: "Ver Solução de Sensores",
      actionHref: "/knowledge-base/troubleshooting"
    }
  },

  "gyroscope-test": {
    overview: "O Teste de Giroscópio mede a velocidade angular e a orientação de rotação nos eixos Alfa (Guinada/Z), Beta (Arfagem/X) e Gama (Rolagem/Y) via API DeviceOrientationEvent. Disponibiliza horizonte artificial e esfera 3D em tempo real.",
    whatToLookFor: [
      {
        label: "Alinhamento do Horizonte Artificial",
        description: "A linha do horizonte artificial deve inclinar suavemente ao ladear o aparelho e subir/descer ao inclinar para frente ou para trás."
      },
      {
        label: "Arfagem (Beta: -180° a 180°)",
        description: "Inclinar o aparelho para frente e para trás altera os graus de arfagem proporcionalmente e sem saltos."
      },
      {
        label: "Rolagem (Gama: -90° a 90°)",
        description: "Inclinar lateralmente atualiza o ângulo de rolagem com precisão e sem inversão de eixos."
      },
      {
        label: "Azimute da Bússola (Alfa: 0° a 360°)",
        description: "Girar o aparelho na horizontal acompanha o norte magnético quando há magnetômetro integrado."
      }
    ],
    canObserve: [
      "Ângulos de orientação angular (Alfa, Beta, Gama em graus) transmitidos pelo navegador",
      "Indicador de horizonte artificial e pré-visualização de rotação 3D",
      "Diferenciação entre movimento relativo e orientação magnética absoluta"
    ],
    cannotMeasure: [
      "Taxa de deriva térmica do giroscópio MEMS sem monitoramento prolongado",
      "Frequência de amostragem interna além do loop de eventos do navegador",
      "Compensação de interferência magnética em dispositivos sem bússola física"
    ],
    interpretation: "O giroscópio monitora a rotação integrando a velocidade angular. Pequena oscilação em repouso é normal, mas valores congelados indicam falta de permissão concedida no navegador.",
    nextSteps: {
      text: "A inclinação está invertida ou não responde? Confira nosso guia de permissões móveis.",
      actionLabel: "Solução de Problemas de Sensores",
      actionHref: "/knowledge-base/troubleshooting"
    }
  },

  "vibration-test": {
    overview: "O Teste de Vibração aciona o motor háptico integrado do seu smartphone por meio da HTML5 Vibration API (navigator.vibrate). Avalia pulsos simples, sequências rítmicas e ciclos contínuos.",
    whatToLookFor: [
      {
        label: "Resposta do Pulso Simples",
        description: "Um pulso de teste de 200ms ou 500ms deve produzir uma resposta mecânica imediata e perceptível no chassi."
      },
      {
        label: "Cadência e Pausas nos Padrões",
        description: "Em ritmos como SOS ou batimento cardíaco, verifique se as pausas intermediárias são limpas e sem inércia mecânica."
      },
      {
        label: "Constância da Força do Motor",
        description: "Certifique-se de que a vibração seja contínua e não gere ruídos estridentes ou peças soltas no interior do aparelho."
      },
      {
        label: "Suporte do Navegador e Sistema",
        description: "A API Vibration funciona no Android Chrome/Firefox, mas é intencionalmente desabilitada pela Apple no iOS Safari."
      }
    ],
    canObserve: [
      "Execução direta de comandos da Vibration API (pulsos simples e arrays) em milissegundos",
      "Verificação de compatibilidade com navigator.vibrate e interação do usuário",
      "Animação visual sincronizada aos pulsos de vibração háptica"
    ],
    cannotMeasure: [
      "Frequência oscilatória do atuador háptico (Hz) ou rotações por minuto do motor",
      "Força mecânica de aceleração (Força G) sem transdutor externo",
      "Classificação técnica entre motores rotativos ERM e atuadores lineares LRA"
    ],
    interpretation: "Se o celular não vibrar no Android, verifique as configurações de Som e Vibração do sistema e desative a economia de bateria. No iOS, nenhum navegador web tem acesso ao motor vibratório.",
    nextSteps: {
      text: "O motor não vibra ao tocar nos botões de teste? Consulte o guia de vibração.",
      actionLabel: "Guia de Solução para Vibração",
      actionHref: "/knowledge-base/troubleshooting"
    }
  },

  "microphone-test": {
    overview: "O Teste de Microfone captura áudio ao vivo por meio da WebRTC getUserMedia e Web Audio API. Disponibiliza osciloscópio, analisador de espectro, medidor VU de volume e reprodução em loop para analisar a fidelidade sonora.",
    whatToLookFor: [
      {
        label: "Nível de Entrada e Medidor VU em Tempo Real",
        description: "Falar ao microfone deve movimentar a barra verde suavemente. Conversação normal costuma ficar entre 40% e 75%."
      },
      {
        label: "Prevenção de Distorção e Clipping",
        description: "Sons altos não devem atingir a zona vermelha do medidor para evitar cortes digitais ásperos."
      },
      {
        label: "Oscilação da Onda e Espectro",
        description: "Veja o formato de onda e as barras de frequência reagirem dinamicamente às variações do tom da sua voz."
      },
      {
        label: "Clareza na Reprodução Local",
        description: "Grave um trecho curto de 5 segundos e ouça o retorno para identificar ruídos elétricos, chiados, eco ou voz robotizada."
      }
    ],
    canObserve: [
      "Forma de onda e espectro de frequência em tempo real via Web Audio AnalyserNode",
      "Volume RMS e margem dinâmica calculados 100% localmente no navegador",
      "Gravação e reprodução em loop imediatas sem transmissão para servidores externos"
    ],
    cannotMeasure: [
      "Nível calibrado de pressão sonora (dB SPL) sem microfone de referência",
      "Padrão polar físico da cápsula (cardioide, omnidirecional, figura 8)",
      "Piso de ruído elétrico analógico do pré-amplificador antes da conversão"
    ],
    interpretation: "Um microfone saudável entrega reprodução límpida com baixo ruído de fundo. Volume muito fraco decorre de baixo ganho no sistema operacional, enquanto ruídos estáticos costumam indicar mau contato no conector P2/P3.",
    nextSteps: {
      text: "O microfone não capta áudio ou soa distorcido? Consulte nosso guia de problemas de microfone.",
      actionLabel: "Solução para Microfone",
      actionHref: "/knowledge-base/troubleshooting#mic-not-working"
    }
  }
};

