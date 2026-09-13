import { InspectionWorkflow } from "./types";

export const PT_INSPECTION_WORKFLOWS: InspectionWorkflow[] = [
  {
    "id": "general",
    "route": "/monitor-inspection/general",
    "title": "Verificação geral da tela",
    "shortDescription": "Verificação visual essencial e completa para qualquer tela.",
    "longDescription": "Uma sequência diagnóstica equilibrada e essencial projetada para inspecionar qualquer monitor de mesa, tela de notebook ou display externo em busca de pixels mortos, fidelidade de cores, brilho, contraste, uniformidade e taxa de atualização.",
    "inspectionTip": "Ajuste sua tela para a resolução nativa e escala recomendada antes de iniciar a verificação.",
    "browserLimitations": "Os testes no navegador avaliam padrões renderizados pelo cliente e não podem inspecionar a estabilidade da fonte interna nem as portas físicas de vídeo.",
    "sequence": [
      "/tests/resolution-checker",
      "/tests/dead-pixel-test",
      "/tests/uniformity-test",
      "/tests/near-black-test",
      "/tests/gradient-banding-test",
      "/tests/text-clarity-test",
      "/tests/scaling-aspect-test",
      "/tests/ghosting-test",
      "/tests/refresh-rate-test"
    ],
    "steps": [
      {
        "title": "Resolução e informações da tela",
        "description": "Verifique resolução nativa, proporção de escala (DPR) e parâmetros do display."
      },
      {
        "title": "Localizador de pixels mortos",
        "description": "Alterne fundos de cores puras para localizar subpixels inativos ou travados."
      },
      {
        "title": "Uniformidade da tela",
        "description": "Inspecione cinzas neutros e campos sólidos contra manchas de luz ou vinhetagem."
      },
      {
        "title": "Detalhes em sombras (Near-Black)",
        "description": "Verifique a separação de tons escuros e detalhamento de sombras próximo ao preto puro."
      },
      {
        "title": "Gradientes e banding",
        "description": "Avalie transições suaves de preto a branco sem degraus de quantização perceptíveis."
      },
      {
        "title": "Nitidez de texto e subpixels",
        "description": "Examine a suavização de fontes e nitidez nas bordas dos subpixels em vários tamanhos."
      },
      {
        "title": "Escala e proporção de tela",
        "description": "Cheque círculos geométricos e grades contra distorções ou estiramentos."
      },
      {
        "title": "Ghosting e rastros de movimento",
        "description": "Observe blocos contrastantes em movimento para testar o tempo de resposta dos pixels."
      },
      {
        "title": "Taxa de atualização e sincronia",
        "description": "Compare a cadência de animação do navegador com a taxa nominal do painel."
      }
    ]
  },
  {
    "id": "used",
    "route": "/monitor-inspection/used",
    "title": "Inspeção de monitor usado",
    "shortDescription": "Inspeção focada de 10 testes com anotações e geração de relatório antes da compra.",
    "longDescription": "Um fluxo de trabalho rigoroso de verificação pré-compra, especialmente planejado para avaliar monitores de segunda mão ou recondicionados. Abrange parâmetros de hardware, defeitos de pixel, degradação de backlight e consolida as conclusões em um relatório.",
    "inspectionTip": "Ajuste o brilho para 100% ao examinar uma tela usada para expor marcas de burn-in latentes, desgaste desigual de LEDs e danos na carcaça.",
    "browserLimitations": "O total de horas de uso e a telemetria térmica interna exigem acesso ao menu de serviço de fábrica do monitor por meio de seus botões físicos.",
    "sequence": [
      "/tests/display-info",
      "/tests/resolution-checker",
      "/tests/dead-pixel-test",
      "/tests/stuck-pixel-test",
      "/tests/color-test",
      "/tests/brightness-test",
      "/tests/uniformity-test",
      "/tests/backlight-bleed-test",
      "/tests/ghosting-test",
      "/tests/refresh-rate-test"
    ],
    "steps": [
      {
        "title": "1. Informações da tela",
        "description": "Consulte parâmetros de exibição informados pelo navegador e recursos gráficos."
      },
      {
        "title": "2. Resolução e geometria",
        "description": "Verifique resolução nativa, escala de exibição (DPR) e enquadramento total."
      },
      {
        "title": "3. Pixels mortos",
        "description": "Varra telas brancas e primárias em busca de subpixels permanentemente escuros."
      },
      {
        "title": "4. Pixels travados",
        "description": "Inspecione fundos escuros para identificar subpixels acesos continuamente."
      },
      {
        "title": "5. Reprodução de cores",
        "description": "Confira primárias RGB e secundárias CMY contra desvios ou perda de canais."
      },
      {
        "title": "6. Brilho e separação de sombras",
        "description": "Certifique-se de que a luz de fundo atinge boa luminância sem esmagar sombras."
      },
      {
        "title": "7. Uniformidade da tela",
        "description": "Verifique fundos cinzas a 25%, 50% e 75% contra amarelamento ou vinhetagem."
      },
      {
        "title": "8. Vazamento de luz e pressão do aro",
        "description": "Em ambiente escuro, avalie pontos de pressão da moldura e vazamento de luz."
      },
      {
        "title": "9. Ghosting e degradação de resposta",
        "description": "Avalie rastros de resposta dos pixels e comportamento do overdrive em movimento."
      },
      {
        "title": "10. Estabilidade da taxa de atualização",
        "description": "Confirme que o painel opera em sua frequência com total fluidez."
      },
      {
        "title": "11. Notas de inspeção",
        "description": "Registre o estado cosmético físico, integridade de portas e impressões visuais."
      },
      {
        "title": "12. Relatório final de teste",
        "description": "Gere um relatório completo, imprimível e exportável com todos os resultados."
      }
    ]
  },
  {
    "id": "gaming",
    "route": "/monitor-inspection/gaming",
    "title": "Inspeção de monitor gamer",
    "shortDescription": "Avalie taxa de atualização, ghosting, overdrive, tearing, black smearing, HDR e resposta.",
    "longDescription": "Um fluxo de testes especializado desenvolvido para monitores gamers de alta frequência (120Hz, 144Hz, 240Hz, 360Hz+). Avalia estabilidade de sincronização, ghosting, sobreimpulso de overdrive (ghosting inverso), screen tearing, black smearing em painéis VA e resposta HDR.",
    "inspectionTip": "Teste seu monitor na taxa máxima anunciada com o Overdrive em 'Normal' antes de testar 'Extremo/Rápido' para identificar halos de ghosting inverso.",
    "browserLimitations": "A taxa de atualização variável dinâmica (G-Sync / FreeSync) requer jogos nativos em DirectX/Vulkan para testar variações extremas de framerate.",
    "sequence": [
      "/tests/vrr-test",
      "/tests/screen-tearing-test",
      "/tests/refresh-rate-test",
      "/tests/ghosting-test",
      "/tests/hdr-test",
      "/tests/text-clarity-test"
    ],
    "steps": [
      {
        "title": "Inspeção de VRR e Adaptive Sync",
        "description": "Observe a constância do ritmo de quadros sob cargas variáveis de trabalho."
      },
      {
        "title": "Screen Tearing e V-Sync",
        "description": "Coloque à prova o rasgo de tela em movimentos laterais de alta velocidade."
      },
      {
        "title": "Verificação da taxa de atualização",
        "description": "Compare o timing de requestAnimationFrame do navegador com a taxa do painel."
      },
      {
        "title": "Ghosting, Overdrive e Black Smearing",
        "description": "Avalie transições de pixels, halos de sobreimpulso e arrasto escuro em painéis VA."
      },
      {
        "title": "Inspeção visual de HDR",
        "description": "Verifique o alcance de brilho especular, clipping de altas luzes e ampla gama."
      },
      {
        "title": "Clareza de texto e HUD de jogos",
        "description": "Avalie a legibilidade de fontes miúdas e elementos gráficos de interface."
      }
    ]
  },
  {
    "id": "oled",
    "route": "/monitor-inspection/oled",
    "title": "Inspeção de tela OLED",
    "shortDescription": "Inspecione campos escuros, uniformidade, banding, retenção, burn-in, HDR e movimento.",
    "longDescription": "Um fluxo de diagnóstico especializado para telas autoemissivas OLED, QD-OLED e WOLED. Avalia gradações próximas ao preto, banding vertical, uniformidade do painel, retenção temporária vs. burn-in permanente, alcance dinâmico HDR e nitidez de movimento.",
    "inspectionTip": "Examine padrões de cinza escuro (1%, 2%, 5% de cinza) em um quarto totalmente escuro para avaliar o banding vertical near-black sem reflexos.",
    "browserLimitations": "O limitador automático de brilho (ABL) do OLED reduz a luminosidade em janelas brancas amplas; quantificar burn-in exige equipamentos ópticos laboratoriais.",
    "sequence": [
      "/tests/near-black-test",
      "/tests/uniformity-test",
      "/tests/hdr-test",
      "/tests/text-clarity-test",
      "/tests/motion-blur-test",
      "/tests/dead-pixel-test"
    ],
    "steps": [
      {
        "title": "Near-Black e separação de sombras",
        "description": "Examine passos de 0,25% a 5% de cinza para avaliar sutilezas no acendimento do OLED."
      },
      {
        "title": "Luminância e uniformidade em escuros",
        "description": "Verifique a uniformidade em cinzas a 5%, 20% e 50% para detectar banding vertical."
      },
      {
        "title": "HDR e realces de brilho especular",
        "description": "Confira a entrega de ampla gama de cores e curva de brilho sem corte brusco do ABL."
      },
      {
        "title": "Renderização de texto e subpixels",
        "description": "Examine a formação tipográfica (RGB/WRGB/QD-OLED) em busca de bordas coloridas."
      },
      {
        "title": "Nitidez de movimento Sample-and-Hold",
        "description": "Observe a transição instantânea dos subpixels OLED junto à persistência visual humana."
      },
      {
        "title": "Queda de subpixels e checagem de burn-in",
        "description": "Percorra telas coloridas sólidas para identificar emissores inativos ou marcas de UI."
      }
    ]
  },
  {
    "id": "laptop",
    "route": "/monitor-inspection/laptop",
    "title": "Inspeção de tela de notebook",
    "shortDescription": "Cheque resolução, brilho, uniformidade, cores, renderização de texto, taxa de quadros e HDR.",
    "longDescription": "Um fluxo de testes dedicado a telas integradas de notebooks (MacBook Retina, ultrabooks Windows, notebooks gamers). Valida dimensionamento em alta densidade DPI, reserva de brilho máximo, uniformidade de painel e nitidez tipográfica ClearType.",
    "inspectionTip": "Ligue o notebook à tomada e desative os sensores de brilho automático para evitar que perfis de economia de bateria escureçam a tela durante os testes.",
    "browserLimitations": "As porcentagens de cobertura de gama de cor (ex.: 100% sRGB ou DCI-P3) são características físicas do painel que demandam um colorímetro para medição exata.",
    "sequence": [
      "/tests/resolution-checker",
      "/tests/brightness-test",
      "/tests/uniformity-test",
      "/tests/solid-color-test",
      "/tests/sharpness-test",
      "/tests/refresh-rate-test",
      "/tests/hdr-capability-test"
    ],
    "steps": [
      {
        "title": "Resolução e escala High-DPI",
        "description": "Verifique escala lógica, proporção de pixels (DPR) e resolução nativa do painel."
      },
      {
        "title": "Brilho e alcance dinâmico",
        "description": "Confirme a saída luminosa máxima e visibilidade de sombras em ambientes claros."
      },
      {
        "title": "Uniformidade da tela e tensão do aro",
        "description": "Inspecione marcas de pressão da moldura, vazamentos laterais ou cantos escuros."
      },
      {
        "title": "Vivacidade e uniformidade de cor",
        "description": "Confirme a homogeneidade das cores primárias e secundárias por toda a tela."
      },
      {
        "title": "Renderização de texto e subpixels",
        "description": "Analise a suavização de fontes (ClearType) em várias escalas de tamanho (8px–24px)."
      },
      {
        "title": "Verificação da taxa de atualização",
        "description": "Garanta que taxas elevadas (90Hz, 120Hz ProMotion, 144Hz+) estejam ativadas."
      },
      {
        "title": "HDR e ampla gama (se aplicável)",
        "description": "Verifique compatibilidade com HDR e ampla gama de cores em telas compatíveis."
      }
    ]
  },
  {
    "id": "new",
    "route": "/monitor-inspection/new",
    "title": "Inspeção de monitor novo",
    "shortDescription": "Verificações fundamentais antes do primeiro uso e dentro do prazo de troca.",
    "longDescription": "Um checklist abrangente recém-saído da caixa, concebido para examinar monitores recém-adquiridos contra defeitos de montagem, falhas de pixels, vazamentos de luz e desempenho geral antes do encerramento do prazo de devolução.",
    "inspectionTip": "Inspecione em um cômodo iluminado (acabamento da tela, reflexos e microarranhões) e também em um quarto totalmente escuro (vazamentos de luz e brilho IPS).",
    "browserLimitations": "Navegadores não conseguem testar conexões físicas (DisplayPort, HDMI, USB-C PD) nem módulos proprietários G-Sync. Realize também checagens manuais de cabos.",
    "sequence": [
      "/tests/resolution-checker",
      "/tests/sharpness-test",
      "/tests/dead-pixel-test",
      "/tests/stuck-pixel-test",
      "/tests/solid-color-test",
      "/tests/grayscale-test",
      "/tests/brightness-test",
      "/tests/contrast-test",
      "/tests/black-level-test",
      "/tests/white-level-test",
      "/tests/uniformity-test",
      "/tests/backlight-bleed-test",
      "/tests/ghosting-test",
      "/tests/refresh-rate-test",
      "/tests/hdr-capability-test"
    ],
    "steps": [
      {
        "title": "Resolução e recursos da tela",
        "description": "Verifique resolução nativa, proporção de pixels e taxa de atualização declarada."
      },
      {
        "title": "Nitidez de texto e clareza de subpixel",
        "description": "Cheque renderização tipográfica, suavização de fontes e nitidez sem artefatos."
      },
      {
        "title": "Verificação de pixels mortos",
        "description": "Percorra telas de cores primárias para localizar subpixels escuros inativos."
      },
      {
        "title": "Inspeção de pixels presos",
        "description": "Verifique se há subpixels acesos sem interrupção que não alternam para escuro."
      },
      {
        "title": "Uniformidade de cores puras",
        "description": "Confirme a consistência de telas vermelha, verde, azul, ciano, magenta e amarela."
      },
      {
        "title": "Degraus de gradiente em escala de cinza",
        "description": "Avalie passagens de 0% a 100% de luminância sem bandas rígidas de quantização."
      },
      {
        "title": "Brilho e alcance dinâmico",
        "description": "Assegure que todo o espectro luminoso de preto a branco seja diferenciável."
      },
      {
        "title": "Passos de contraste",
        "description": "Verifique separação nítida entre as amostras de contraste escalonadas."
      },
      {
        "title": "Corte do nível de preto",
        "description": "Calibre o preto para evitar que sombras densas fiquem afogadas em escuridão total."
      },
      {
        "title": "Corte do nível de branco",
        "description": "Ajuste o contraste para impedir que realces claros estourem em branco plano."
      },
      {
        "title": "Uniformidade de luminância na tela",
        "description": "Procure por manchas nubladas, vinhetagem ou efeito de tela suja em cinzas."
      },
      {
        "title": "Vazamento de luz e brilho IPS",
        "description": "Teste no escuro para isolar vazamentos da moldura em relação ao IPS Glow angular."
      },
      {
        "title": "Ghosting e tempo de resposta",
        "description": "Observe formas móveis de alto contraste para avaliar atrasos e borrões."
      },
      {
        "title": "Taxa de atualização e frame timing",
        "description": "Confirme a correspondência do requestAnimationFrame com a frequência do painel."
      },
      {
        "title": "HDR e ampla gama de cores",
        "description": "Confira o suporte a HDR pelo sistema e compatibilidade com espaço de cores P3."
      }
    ]
  },
  {
    "id": "tv",
    "route": "/monitor-inspection/tv",
    "title": "Inspeção de tela de TV",
    "shortDescription": "Avalie a qualidade de exibição, local dimming e desempenho da sua televisão.",
    "longDescription": "Um pacote de testes especializado para Smart TVs de sala e telas de grande porte conectadas por HDMI. Identifica halos de iluminação local (blooming), efeito de tela suja (DSE), trepidação em 24p, corte de bordas por sobrevarredura e HDR.",
    "inspectionTip": "Altere o modo de imagem da TV para 'PC', 'Jogo' ou 'Filmmaker' e fixe o formato de tela em 'Just Scan' / '1:1' para desligar o realce de bordas e o corte de overscan.",
    "browserLimitations": "Recursos de pós-processamento da TV (como interpolação de movimento / efeito novela) devem ser configurados diretamente no menu próprio da TV.",
    "sequence": [
      "/tests/hdr-test",
      "/tests/near-black-test",
      "/tests/uniformity-test",
      "/tests/tv-overscan-test",
      "/tests/scaling-aspect-test",
      "/tests/viewing-angle-test"
    ],
    "steps": [
      {
        "title": "Inspeção visual de HDR",
        "description": "Verifique a curva de realces de alta luminosidade e reprodução de ampla gama."
      },
      {
        "title": "Detalhes em sombras Near-Black",
        "description": "Verifique o nível de preto HDMI para evitar sombras empastadas ou pretos lavados."
      },
      {
        "title": "Uniformidade e efeito tela suja (DSE)",
        "description": "Passeie por telas cinzas para detectar faixas verticais ou pontos escuros."
      },
      {
        "title": "Overscan de TV e mapeamento 1:1",
        "description": "Garanta saída 4K/1080p integral sem perda de pixels cortados pela sobrevarredura."
      },
      {
        "title": "Proporção de tela e geometria",
        "description": "Confirme que padrões circulares e quadrados mantêm proporções perfeitas."
      },
      {
        "title": "Ângulos de visão na sala de estar",
        "description": "Avalie a queda de contraste e saturação a partir de posições de assento laterais."
      }
    ]
  }
];
