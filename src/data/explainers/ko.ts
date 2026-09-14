import { ExplainerData, ExplainerLabels } from "./types";

export const KO_LABELS: ExplainerLabels = {
  overviewHeading: "디스플레이 검사 개요",
  whatToLookForHeading: "검사 중 확인해야 할 사항",
  boundariesHeading: "측정 한계 및 기술적 정직성",
  canObserveLabel: "Screen Tester가 관찰 및 감지할 수 있는 항목",
  cannotMeasureLabel: "브라우저에서 정확하게 측정할 수 없는 항목",
  interpretationHeading: "관찰 결과 해석 및 진단",
  nextStepsHeading: "권장되는 다음 단계",
};

export const KO_EXPLAINERS: Record<string, ExplainerData> = {
  "dead-pixel-test": {
    overview: "데드 픽셀(암점)은 신호와 무관하게 전원이 들어오지 않아 완전히 꺼진 상태를 유지하는 액정 서브픽셀 또는 OLED 소자입니다. 순백색, 시안, 노란색 등 밝은 단색 배경에서 움직이지 않는 선명한 검은 점으로 나타납니다.",
    whatToLookFor: [
      {
        label: "밝은 화면 위의 고정된 검은 점",
        description: "밝은 단색 배경을 번갈아 확인해도 색상이 켜지지 않고 검게 남아있는 미세한 점을 찾습니다."
      },
      {
        label: "먼지와 데드 픽셀 구별",
        description: "패널 표면의 먼지는 보는 각도에 따라 위치가 달라지며 닦아낼 수 있습니다. 데드 픽셀은 편광판 안쪽에 위치합니다."
      },
      {
        label: "서브픽셀 불량 vs 완전 화소 불량",
        description: "R/G/B 중 하나의 서브픽셀만 꺼진 경우, 흰색 배경에서 완전한 검은색 대신 약간 변색된 점으로 보입니다."
      },
      {
        label: "불량 화소 집중(클러스터 결함)",
        description: "좁은 영역에 여러 개의 불량 화소가 모여 있는 경우 중대한 패널 결함으로 간주되어 보증 교환 대상이 될 수 있습니다."
      }
    ],
    canObserve: [
      "밝은 원색 및 보조색 배경을 활용한 꺼진 픽셀의 시각적 식별",
      "의심되는 불량 지점의 화면 내 좌표 및 개수 파악",
      "배경 밝기와 꺼진 픽셀 간의 명암 대비 확인"
    ],
    cannotMeasure: [
      "박막 트랜지스터(TFT)의 전기적 도통 상태 및 전압 측정",
      "사람의 육안 검사 없는 브라우저의 완전 자동 결함 판별",
      "패널 내부 유리층 밑의 물리적 제조 결함 직접 분석"
    ],
    interpretation: "데드 픽셀은 제조 공정 중 미세 트랜지스터 고장으로 발생합니다. 대부분의 제조사는 ISO 9241-307 Class 2 기준을 따르며, 100만 픽셀당 2~5개 정도의 불량 화소는 정상 범위로 간주되기도 합니다.",
    nextSteps: {
      text: "검은 점이 아니라 특정 색상으로 계속 켜져 있는 픽셀이 있다면 복구 툴을 실행해보세요.",
      actionLabel: "Stuck Pixel Fixer 실행",
      actionHref: "/tests/stuck-pixel-fixer"
    }
  },

  "stuck-pixel-test": {
    overview: "꺼져서 검게 보이는 데드 픽셀과 달리, 스터크 픽셀(휘점)은 액정 셀이 열린 채로 굳어져 백라이트 빛이 계속 통과하는 현상입니다. 순수 검은색 배경에서 빨강, 초록, 파랑, 시안, 흰색 등으로 밝게 빛납니다.",
    whatToLookFor: [
      {
        label: "순수 검은색 화면에서 빛나는 유색 점",
        description: "방의 불을 끄고 검은 화면을 확인합니다. 빨간색, 초록색, 파란색 등으로 계속 켜져 있는 점을 찾습니다."
      },
      {
        label: "보색 배경에서의 확인",
        description: "초록색 휘점은 초록 배경에서는 잘 보이지 않지만, 빨강, 파랑, 검은색 배경에서 강하게 빛납니다."
      },
      {
        label: "상시 점등되는 흰색 점",
        description: "RGB 3개의 서브픽셀이 모두 열린 채 고정된 경우, 어두운 배경에서 밝은 흰색 점으로 나타납니다."
      },
      {
        label: "빛샘 현상과의 구별",
        description: "휘점은 단일 픽셀 단위의 미세한 점 형태이지만, 빛샘은 베젤 가장자리를 따라 뭉게구름처럼 번지는 빛입니다."
      }
    ],
    canObserve: [
      "검은색 및 보색 배경을 통한 상시 발광 서브픽셀의 시각적 특정",
      "고장 난 특정 색상 채널(R, G, B)의 개별 분리 파악",
      "화면 내 비정상 픽셀의 위치 매핑"
    ],
    cannotMeasure: [
      "액정 재료의 점성 또는 물리적 배향 상태",
      "트랜지스터 게이트의 스위칭 저항 및 응답 속도",
      "장기 관찰 없는 영구적 복구 가능 여부 보증"
    ],
    interpretation: "스터크 픽셀은 정전기나 제조 편차로 인해 액정 분자가 복귀하지 못하고 걸려서 발생합니다. 완전히 꺼진 암점과 달리, 고속 색상 전환 자극을 주면 정상으로 복구되는 경우가 있습니다.",
    nextSteps: {
      text: "계속 켜져 있는 픽셀을 발견하셨나요? 고속 색상 자극 툴로 복구를 시도해보세요.",
      actionLabel: "Stuck Pixel Fixer 시도하기",
      actionHref: "/tests/stuck-pixel-fixer"
    }
  },

  "stuck-pixel-fixer": {
    overview: "고속 RGB 원색 사이클과 노이즈 패턴을 통해 굳어 있는 액정 분자에 전기적·시각적 자극을 집중 가하여 원래의 정상 동작 상태로 풀어주는 복구 도구입니다.",
    whatToLookFor: [
      {
        label: "자극 박스의 정확한 정렬",
        description: "화면 전체의 불필요한 깜빡임을 방지하기 위해 움직이는 자극 상자를 해당 픽셀 바로 위에 맞춥니다."
      },
      {
        label: "자극 패턴 선택",
        description: "넓은 영역을 자극하는 'RGB 사이클'과 고주파 '컬러 노이즈'를 번갈아 사용하여 테스트합니다."
      },
      {
        label: "권장 세션 시간",
        description: "15분에서 30분 정도 실행한 뒤 일시정지하고, 검은 화면에서 픽셀이 복구되었는지 확인합니다."
      },
      {
        label: "광과민성 주의사항",
        description: "눈의 피로나 어지러움을 느끼면 즉시 중단하세요. 광과민성 발작 병력이 있는 분은 사용하지 마십시오."
      }
    ],
    canObserve: [
      "브라우저에서 직접 재생되는 고속 RGB 전환 및 무작위 노이즈 애니메이션",
      "자극 영역의 자유로운 드래그 이동과 세션별 타이머 측정",
      "자극 전후 픽셀 반응 상태의 육안 검증"
    ],
    cannotMeasure: [
      "물리적으로 손상되거나 타버린 TFT 트랜지스터의 하드웨어 수리",
      "성공 확률에 대한 확정적 보증 (패널 상태에 따라 상이함)",
      "완전히 꺼진 데드 픽셀(암점)의 복구"
    ],
    interpretation: "소프트웨어 방식은 일시적으로 걸린 액정 셀에만 효과가 있습니다. 트랜지스터 회로가 물리적으로 단선되었거나 소손된 경우에는 패널 교체 서비스를 받아야 합니다.",
    nextSteps: {
      text: "자극이 끝난 후, 검은 배경의 스터크 픽셀 테스트에서 복구 여부를 확인하세요.",
      actionLabel: "Stuck Pixel Test로 확인",
      actionHref: "/tests/stuck-pixel-test"
    }
  },

  "refresh-rate-test": {
    overview: "주사율(Hz)은 모니터가 1초에 화면을 새로고침하는 횟수입니다. 이 테스트는 브라우저의 requestAnimationFrame API를 사용하여 프레임 전송 간격과 부드러움을 측정합니다.",
    whatToLookFor: [
      {
        label: "측정값과 모니터 설정값 일치 여부",
        description: "측정 주사율이 OS 디스플레이 설정(예: 60Hz, 120Hz, 144Hz, 240Hz)과 일치하는지 확인합니다."
      },
      {
        label: "프레임 간격의 균일도 (Frame Pacing)",
        description: "안정적인 144Hz 모니터라면 약 6.94ms 간격으로 오차 없이 프레임이 전달되어야 합니다."
      },
      {
        label: "브라우저의 60Hz 제한 현상",
        description: "144Hz 모니터인데 60Hz로 고정된다면 절전 모드나 브라우저 하드웨어 가속 설정을 확인하세요."
      },
      {
        label: "이동 바의 부드러움",
        description: "고주사율 환경에서는 이동하는 표시줄이 끊김이나 잔상 없이 매끄럽게 활주합니다."
      }
    ],
    canObserve: [
      "브라우저의 requestAnimationFrame 호출 주기 및 델타 시간 편차",
      "추정 브라우저 FPS 및 수직 동기화 안정성",
      "활성 탭에서의 윈도우 합성 동기화 동작"
    ],
    cannotMeasure: [
      "브라우저 한계를 벗어난 패널 본연의 물리적 구동 주파수",
      "DisplayPort 또는 HDMI 케이블의 물리적 링크 대역폭",
      "오실로스코프 수준의 수직 귀선 기간(VBLANK) 신호 파형"
    ],
    interpretation: "웹 브라우저는 운영체제의 윈도우 컴포지터와 동기화됩니다. 주사율이 다른 멀티 모니터를 연결했거나 전원 관리 옵션이 켜져 있으면 60Hz로 제한될 수 있습니다.",
    nextSteps: {
      text: "게이밍 모니터인데 60Hz로 제한되어 있나요? 해결 방법을 확인해보세요.",
      actionLabel: "주사율 문제 해결 가이드",
      actionHref: "/knowledge-base/troubleshooting#refresh-rate-capped"
    }
  },

  "ghosting-test": {
    overview: "모니터 고스팅은 움직이는 물체 뒤로 흐릿한 그림자나 잔상이 끌리는 현상입니다. 액정 분자가 다른 색으로 전환되는 속도(응답 속도)가 한 프레임의 표시 시간보다 느릴 때 발생합니다.",
    whatToLookFor: [
      {
        label: "검은 끌림 잔상 (일반 고스팅)",
        description: "움직이는 블록 뒤로 어두운 그림자가 생기면 어두운 색으로의 전환 속도가 느린 것입니다(VA 패널 흔함)."
      },
      {
        label: "밝은 역상 고스팅 / 코로나 현상",
        description: "물체 뒤로 하얗게 빛나는 잔상이 생기면 모니터의 오버드라이브 설정이 너무 과도한 것입니다(오버슈트)."
      },
      {
        label: "배경색별 잔상 차이",
        description: "빨간색이나 어두운 회색 배경에서 유독 끌림이 심해지지 않는지 비교 확인합니다."
      },
      {
        label: "시선 추적을 통한 잔상 분리",
        description: "움직이는 물체를 눈으로 따라가며 망막의 생리적 잔상과 패널의 물리적 응답 잔상을 구분해 관찰합니다."
      }
    ],
    canObserve: [
      "속도에 따른 잔상 끌림 및 오버슈트 코로나의 시각적 확인",
      "밝은 배경과 어두운 배경 간의 색상 전환 속도 차이 비교",
      "모니터 OSD의 오버드라이브/응답 속도 설정 변경에 따른 실시간 변화"
    ],
    cannotMeasure: [
      "실험실 계측 표준에 따른 밀리초(ms) 단위의 GtG 응답 속도",
      "추적 카메라(Pursuit Camera)를 통한 휘도 감쇠 곡선",
      "액정 서브픽셀의 인가 전압 파형"
    ],
    interpretation: "고스팅은 패널 종류(TN은 빠름, IPS는 균형, VA는 암부 잔상 발생, OLED는 즉각 반응)에 좌우됩니다. 모니터 설정에서 오버드라이브를 '중간'으로 맞추는 것이 가장 이상적입니다.",
    nextSteps: {
      text: "오버드라이브 조절법과 역잔상 제거 방법에 대해 자세히 알아보세요.",
      actionLabel: "고스팅 및 잔상 가이드 읽기",
      actionHref: "/knowledge-base/monitor-ghosting-and-motion-blur"
    }
  },

  "motion-blur-test": {
    overview: "평판 디스플레이의 움직임 흐림(모션 블러)은 주로 홀드형 표시 방식(Sample-and-Hold) 때문에 생깁니다. 화면이 다음 갱신까지 멈춰 있기 때문에, 눈이 움직임을 쫓는 동안 망막에 상이 번지게 됩니다.",
    whatToLookFor: [
      {
        label: "고속 이동 시 세부 디테일 손실",
        description: "스크롤되는 세로선과 글자가 어느 정도 속도에서 뭉개져 식별 불가능해지는지 관찰합니다."
      },
      {
        label: "이동 속도별 비교",
        description: "240 px/s와 960 px/s를 비교하여 이동 속도 증가에 따라 시선 추적 블러가 어떻게 확대되는지 봅니다."
      },
      {
        label: "백라이트 스트로빙(BFI) 효과",
        description: "모니터의 스트로빙 기능(ULMB, DyAc, ELMB 등)을 켜면 움직이는 패턴이 비약적으로 또렷해집니다."
      },
      {
        label: "OLED에서의 홀드 블러",
        description: "0.1ms의 빠른 응답 속도를 가진 OLED라도 스트로빙 없는 60Hz/120Hz에서는 홀드 블러가 발생합니다."
      }
    ],
    canObserve: [
      "이동 속도와 주사율 변화에 따른 시각적 흐림 정도의 차이",
      "하드웨어 백라이트 스트로빙 모드 활성화 시 선명도 개선 효과",
      "정지 상태의 또렷한 외곽선과 이동 중 흐려진 윤곽의 대비"
    ],
    cannotMeasure: [
      "정밀 밀리초(ms) 단위의 동영상 응답 시간(MPRT)",
      "인간 망막의 광자 누적 곡선",
      "스트로빙 듀티비 백분율"
    ],
    interpretation: "홀드형 모션 블러를 줄이려면 주사율을 높이거나(프레임 노출 시간 단축), 화면 사이에 암흑 구간을 넣는 백라이트 스트로빙(BFI)이 필요합니다.",
    nextSteps: {
      text: "높은 주사율이 어떻게 모션 블러를 줄여주는지 주사율 테스트에서 비교해보세요.",
      actionLabel: "주사율 테스트 열기",
      actionHref: "/tests/refresh-rate-test"
    }
  },

  "vrr-test": {
    overview: "가변 주사율(VRR: NVIDIA G-Sync, AMD FreeSync, VESA Adaptive-Sync)은 GPU의 프레임 생성 속도에 맞춰 모니터 화면 갱신 주기를 실시간 동기화하여 화면 찢어짐과 끊김을 없애줍니다.",
    whatToLookFor: [
      {
        label: "화면 찢어짐 현상 (Screen Tearing)",
        description: "화면 상단과 하단이 어긋나 가로로 균열이 가는 현상이 생기는지 확인합니다."
      },
      {
        label: "미세 끊김 현상 (Stutter / Judder)",
        description: "프레임이 변동할 때 움직이는 표시줄이 매끄럽게 흐르지 않고 뚝뚝 끊기는지 봅니다."
      },
      {
        label: "창 모드 vs 전체 화면 VRR",
        description: "그래픽 드라이버 설정에 따라 전체 화면에서만 G-Sync/FreeSync가 작동하는 경우가 많습니다."
      },
      {
        label: "저프레임 보상(LFC) 작동",
        description: "주사율이 최저치(예: 48Hz 이하)로 떨어질 때 매끄럽게 프레임 복제가 이루어지는지 봅니다."
      }
    ],
    canObserve: [
      "가변 프레임 렌더링 상황에서의 테어링 라인 및 미세 끊김 여부",
      "프레임 레이트 변동 시 움직임의 부드러움 변화",
      "창 모드와 전체 화면 모드 간의 화면 동기화 차이"
    ],
    cannotMeasure: [
      "GPU 드라이버와 모니터 스케일러 간의 하드웨어 핸드셰이크 신호",
      "물리적 G-Sync / FreeSync 하드웨어 모듈의 활성 상태",
      "DisplayPort 보조 채널(AUX)의 실시간 패킷 데이터"
    ],
    interpretation: "웹 브라우저는 OS의 윈도우 관리자 안에서 실행되므로, VRR을 적용하려면 Windows 하드웨어 가속 GPU 일정 예약 및 드라이버 설정이 올바르게 켜져 있어야 합니다.",
    nextSteps: {
      text: "VRR을 켰는데도 화면이 찢어지거나 끊기나요? 설정 가이드를 확인해보세요.",
      actionLabel: "VRR 문제 해결 가이드 읽기",
      actionHref: "/knowledge-base/troubleshooting#vrr-stutter-tearing"
    }
  },

  "backlight-bleed-test": {
    overview: "빛샘(백라이트 블리드)은 LCD 패널을 감싸는 베젤 프레임의 기계적 압박으로 인해 백라이트 빛이 모서리나 틈새로 새어 나오는 현상입니다. 이 순수 검은 화면 테스트로 빛샘을 확인하고 시야각에 따른 IPS 글로우와 구별할 수 있습니다.",
    whatToLookFor: [
      {
        label: "베젤 모서리와 테두리의 빛 번짐",
        description: "머리를 좌우로 움직여도 위치나 밝기가 변하지 않고 테두리에 노랗거나 하얗게 맺혀 있는 빛을 확인합니다."
      },
      {
        label: "IPS 글로우 vs 실제 빛샘",
        description: "시선 각도를 비스듬히 바꿔보세요. 각도에 따라 빛의 위치나 색감이 달라진다면 정상적인 IPS 글로우 현상입니다."
      },
      {
        label: "클라우딩 (얼룩 현상)",
        description: "도광판의 압박이나 불균일로 인해 화면 중앙부에 구름처럼 얼룩덜룩하게 밝은 영역이 나타나는 현상입니다."
      },
      {
        label: "OLED 및 Mini-LED 비교",
        description: "OLED는 소자 자체가 발광하므로 빛샘이 전혀 없습니다(0 nit). Mini-LED는 밝은 물체 주변에 옅은 헤일로가 보일 수 있습니다."
      }
    ],
    canObserve: [
      "검은 배경에서 베젤 압박 부위 및 모서리 빛샘 패턴의 육안 확인",
      "완전 암전 환경에서의 모서리 빛 번짐 심각도 파악",
      "시야각 이동을 통한 고정형 빛샘과 각도형 IPS 글로우의 구분"
    ],
    cannotMeasure: [
      "측정 장비 없는 cd/m²(nit) 단위의 절대 휘도 수치",
      "패널의 네이티브 정적 명암비 (예: 1000:1 vs 3000:1)",
      "공인 ANSI 16분할 명암비 측정값"
    ],
    interpretation: "약간의 IPS 글로우는 광시야각 IPS 구조의 정상적인 특성입니다. 반면 테두리가 심하게 번지는 빛샘은 케이스 조립 시 패널을 너무 세게 눌러 발생한 조립 결함입니다.",
    nextSteps: {
      text: "IPS 글로우, 빛샘, OLED 완전한 블랙의 차이점을 상세히 알아보세요.",
      actionLabel: "빛샘 vs IPS 글로우 가이드",
      actionHref: "/knowledge-base/backlight-bleed-vs-ips-glow"
    }
  },

  "near-black-test": {
    overview: "암부 계조 테스트는 완전한 검은색(0%) 바로 위의 아주 어두운 회색(0.5%~5%)을 디스플레이가 얼마나 잘 구분해 표현하는지 평가합니다. 모니터가 암부를 뭉개버리면(블랙 크러시) 어두운 영상의 디테일이 사라집니다.",
    whatToLookFor: [
      {
        label: "블랙 크러시 (암부 뭉개짐)",
        description: "첫 번째 단계(0.5% 또는 1%)가 배경 검은색과 구별되지 않고 완전히 묻혀버린다면 암부가 뭉개진 것입니다."
      },
      {
        label: "단계별 경계면 식별",
        description: "어두운 방에서 각 저휘도 회색 블록 간의 경계선이 선명히 구분되는지 확인합니다."
      },
      {
        label: "VA 패널의 시야각 감마 시프트",
        description: "VA 패널에서는 정면에서 묻혔던 그림자가 비스듬히 보면 떠올라 보이는 현상이 흔히 나타납니다."
      },
      {
        label: "주변 조명 반사",
        description: "실내 조명 빛은 사람 눈의 암부 구분 능력을 크게 떨어뜨립니다. 검사할 때는 방 불을 끄세요."
      }
    ],
    canObserve: [
      "0.5%, 1%, 2%, 3%, 4%, 5% 각 저휘도 회색 패치의 시각적 식별 한계선",
      "어두운 색상 간의 그림자 세부 묘사 분리도",
      "감마, 블랙 이퀄라이저, HDMI 동적 범위 설정에 따른 변화"
    ],
    cannotMeasure: [
      "전문 센서 없는 0.05 nit 이하의 미세 휘도 측정",
      "수학적 감마 표준 곡선(BT.1886 vs 2.2)과의 엄밀한 일치율",
      "패널 자체의 네이티브 블랙 포인트 절대값 (cd/m²)"
    ],
    interpretation: "암부 뭉개짐은 그래픽카드 출력 범위 불일치(전체 0~255 대신 제한 16~235)나 과도한 명암비 보정 설정 때문에 자주 발생합니다.",
    nextSteps: {
      text: "어두운 장면에서 그림자가 뭉개지나요? 블랙 크러시 해결 가이드를 읽어보세요.",
      actionLabel: "블랙 크러시 해결법 보기",
      actionHref: "/knowledge-base/troubleshooting#black-crush"
    }
  },

  "gradient-banding-test": {
    overview: "부드러운 그라데이션을 표현하려면 풍부한 색상 단계가 필요합니다. 패널이나 그래픽 경로의 색 심도(비트 수)가 부족하면 매끄러운 계조가 계단 형태의 층(컬러 밴딩)으로 끊겨 보입니다.",
    whatToLookFor: [
      {
        label: "계단형 밴딩 줄무늬",
        description: "회색 및 RGB 그라데이션에서 부드러운 변화 대신 선명한 가로/세로 경계선이 나타나는지 봅니다."
      },
      {
        label: "특정 색상 채널의 계단 현상",
        description: "파란색이나 어두운 암부 영역에서 유독 밴딩이 두드러지지 않는지 확인합니다."
      },
      {
        label: "비트 심도와 FRC 디더링",
        description: "트루 8bit/10bit 패널은 매끄럽지만, 6bit+FRC 패널은 미세한 자글거림이나 계단이 보일 수 있습니다."
      },
      {
        label: "전체 vs 제한 동적 범위",
        description: "GPU의 HDMI 출력이 '제한(16~235)'으로 설정되어 있으면 양 끝의 밝고 어두운 영역이 칼로 자른 듯 끊깁니다."
      }
    ],
    canObserve: [
      "그레이스케일 및 원색 그라데이션에서의 계단형 밴딩 유무 확인",
      "가로, 세로 및 다채널 색상 램프의 계조 표현력 비교",
      "ICC 프로파일이나 제한된 동적 범위 설정으로 인한 색상 왜곡 확인"
    ],
    cannotMeasure: [
      "OS 보고 정보와 무관한 패널의 순수 물리 비트 심도",
      "인접 계조 단계 간의 수치적 Delta E 색차 측정",
      "모니터 스케일러 칩셋 내부의 공간 디더링 알고리즘"
    ],
    interpretation: "밴딩은 6bit 패널의 하드웨어 한계, 잘못된 HDMI 출력 범위(16~235), 계조를 잘라먹는 왜곡된 ICC 프로파일 때문에 발생합니다.",
    nextSteps: {
      text: "6bit, 8bit 단계와 디더링을 시뮬레이션해보고 싶으신가요? 전용 도구를 사용해보세요.",
      actionLabel: "컬러 밴딩 & 비트 심도 테스트",
      actionHref: "/tests/color-banding-test"
    }
  },

  "uniformity-test": {
    overview: "화면 균일도는 모니터 표면 전체에서 밝기와 색온도가 얼마나 균일하게 유지되는지를 검사합니다. 백라이트 확산판의 편차나 베젤 압박으로 인해 가장자리가 어두워지거나 얼룩덜룩한 DSE 현상이 생깁니다.",
    whatToLookFor: [
      {
        label: "모서리 및 외곽 비네팅 (주변부 감광)",
        description: "25%, 50%, 75% 회색 배경에서 모서리와 테두리가 중앙부보다 눈에 띄게 어두운지 확인합니다."
      },
      {
        label: "화면 얼룩 현상 (Dirty Screen Effect - DSE)",
        description: "단색 화면에서 시선을 움직일 때 유리 표면이 오염된 것처럼 보이는 얼룩덜룩한 음영을 찾습니다."
      },
      {
        label: "좌우 색온도 편차",
        description: "화면의 한쪽은 따뜻한 톤(붉은빛/노란빛)이고 반대쪽은 차가운 톤(푸른빛)으로 치우치지 않는지 봅니다."
      },
      {
        label: "5x5 그리드 영역별 비교",
        description: "중앙 블록과 외곽 블록의 밝기 차이를 격자별로 비교 분석합니다."
      }
    ],
    canObserve: [
      "회색 및 흰색 화면에서 육안으로 확인되는 주변부 감광 및 밝기 편차",
      "화면 좌우 및 구역 간의 체감 색온도 차이",
      "표준화된 여러 단계의 단색 밝기에서의 균일도 비교"
    ],
    cannotMeasure: [
      "측정 장비 없는 '98.5% 균일'과 같은 정밀 백분율 수치 계산",
      "패널 좌표별 정밀 색온도 편차(켈빈 K 수치)",
      "모니터 내부 디지털 균일도 보정(DUC) 회로의 동작 상태"
    ],
    interpretation: "일반 소비자용 모니터는 모서리 쪽으로 10%~15% 정도 어두워지는 것이 일반적입니다. 전문가용 그래픽 모니터는 DUC 회로를 통해 편차를 5% 이내로 제어합니다.",
    nextSteps: {
      text: "DSE 현상의 원인과 패널 교환 기준에 대해 자세히 알아보세요.",
      actionLabel: "화면 균일도 가이드 읽기",
      actionHref: "/knowledge-base/backlight-bleed-vs-ips-glow"
    }
  },

  "text-clarity-test": {
    overview: "글자의 선명도는 화소 밀도(PPI), OS 디스플레이 배율, 서브픽셀 배열(RGB, BGR, QD-OLED) 및 글꼴 렌더링 엔진에 의해 결정됩니다.",
    whatToLookFor: [
      {
        label: "글자 테두리의 색 번짐 (컬러 프린징)",
        description: "세로 획 가장자리에 붉은색이나 푸른색 테두리가 보인다면 서브픽셀 배열과 글꼴 렌더링이 맞지 않는 것입니다."
      },
      {
        label: "BGR 배열로 인한 글자 번짐",
        description: "일부 모니터는 BGR 배열을 사용합니다. Windows ClearType을 재조정하지 않으면 글자가 흐리멍덩해집니다."
      },
      {
        label: "OLED 고유 서브픽셀로 인한 번짐",
        description: "WOLED나 QD-OLED의 삼각형 구조는 가로 획 위아래로 옅은 녹색 또는 마젠타색 번짐을 유발할 수 있습니다."
      },
      {
        label: "소수점 배율로 인한 흐림",
        description: "125%나 150% 같은 배율은 일부 구형 데스크톱 앱에서 텍스트를 흐릿하게 렌더링할 수 있습니다."
      }
    ],
    canObserve: [
      "8px부터 32px까지의 글꼴 크기별 윤곽 색 번짐 및 선명도",
      "명조, 고딕, 색상 반전 환경에서의 글꼴 렌더링 품질 비교",
      "브라우저 줌과 OS 배율 설정이 글자 가독성에 미치는 영향"
    ],
    cannotMeasure: [
      "확대경이나 현미경 없는 서브픽셀의 물리적 미세 구조",
      "DirectWrite 또는 ClearType의 비공개 내부 레지스트리 설정",
      "모니터의 광학적 변조 전달 함수(MTF)"
    ],
    interpretation: "글자가 흐릿하고 색 번짐이 보인다면, Windows의 'ClearType 텍스트 조정'을 다시 실행하여 BGR 배열에 맞게 보정할 수 있습니다.",
    nextSteps: {
      text: "글씨가 번져서 눈이 피로한가요? ClearType과 배율 최적화 가이드를 따라해보세요.",
      actionLabel: "글자 선명도 문제 해결",
      actionHref: "/knowledge-base/troubleshooting#blurry-text-scaling"
    }
  },

    "hdr-capability-test": {
    "overview": "HDR 하드웨어 및 신호 감지기는 OS 창 컴포지터, 그래픽 드라이버 및 브라우저 파이프라인이 HDR 신호를 올바르게 송수신하는지 진단합니다. CSS Media Queries Level 4 (dynamic-range: high), 광색역(Rec.2020 / Display-P3), Canvas P3 색상 버퍼, WebGL float 렌더 타겟 및 10비트 HDR 비디오 코덱을 진단합니다.",
    "whatToLookFor": [
        {
            "label": "컴포지터 HDR 신호 상태",
            "description": "OS 창 컴포지터가 브라우저로 HDR 신호를 출력하고 있는지 확인합니다. 비활성화된 경우 OS 설정에서 HDR이 꺼져 있는 것입니다."
        },
        {
            "label": "버퍼 비트 심도 및 파이프라인",
            "description": "화면 colorDepth(24비트 SDR vs 30비트+ HDR)를 감지하고 Canvas 및 WebGL2가 P3 및 float 버퍼를 할당할 수 있는지 확인합니다."
        },
        {
            "label": "광색역(Rec.2020 및 P3)",
            "description": "모니터가 sRGB를 초과하는 깊은 진홍색과 생생한 에메랄드 초록을 표현할 수 있는 색상 볼륨을 보고하는지 평가합니다."
        },
        {
            "label": "HDR 비디오 코덱 가속",
            "description": "HDR10 (HEVC Main 10), AV1 10비트 (YouTube HDR) 및 VP9 Profile 2의 하드웨어 디코딩 지원 여부를 테스트합니다."
        }
    ],
    "canObserve": [
        "운영체제 컴포지터의 실시간 HDR 출력 상태",
        "Display-P3 및 Rec.2020 색 영역에 대한 하드웨어 및 브라우저 지원",
        "화면 버퍼 색 심도 및 부동 소수점(float) 버퍼 지원",
        "하드웨어 가속 10비트 비디오 코덱 재생 능력"
    ],
    "cannotMeasure": [
        "하드웨어 색도계 없는 물리적 패널 피크 밝기(nits)",
        "VESA DisplayHDR 인증 등급(예: DisplayHDR 400 vs 600 vs 1000) 준수 여부",
        "Mini-LED 백라이트의 물리적 로컬 디밍 존 개수"
    ],
    "interpretation": "dynamic-range가 standard(비활성)로 보고되면 Windows에서 Win + Alt + B를 누르거나 macOS 디스플레이 설정에서 HDR을 켜십시오.",
    "nextSteps": {
        "text": "실제 하이라이트 클리핑, 톤 커브 및 피크 니트를 시각적으로 검사하고 싶으신가요? 광학 테스트를 실행하십시오.",
        "actionLabel": "HDR 시각 검사 시작",
        "actionHref": "/tests/hdr-test"
    }
},

  "hdr-test": {
    "overview": "HDR 시각적 캘리브레이션 및 하이라이트 검사 테스트는 디스플레이 패널이 HDR 신호에 광학적으로 어떻게 반응하는지 평가하는 테스트입니다. 반사 하이라이트 클리핑 포인트, 톤 매핑 롤오프, 10% APL 피크 휘도 버스트, PQ/EOTF 톤 커브 램프 및 암부 디테일을 정밀 검사합니다.",
    "whatToLookFor": [
        {
            "label": "반사 하이라이트 롤오프 및 클리핑",
            "description": "90%부터 100% 피크 화이트 패치를 관찰하십시오. 원형 레티클 타겟이 단색 흰색으로 날아가지 않고 구별되어야 합니다."
        },
        {
            "label": "10% APL 피크 휘도 버스트 윈도우",
            "description": "순수 검은색 배경의 10% 창을 통해 디스플레이의 피크 니트, 로컬 디밍 반응성 및 헤일로 번짐을 측정합니다."
        },
        {
            "label": "PQ / EOTF 톤 커브 그라데이션",
            "description": "매끄러운 10비트 그라데이션과 8비트 양자화 램프를 비교하여 밴딩 아티팩트 및 과도한 톤 압축을 확인합니다."
        },
        {
            "label": "암부 디테일 및 블랙 크러시",
            "description": "미세한 저휘도 단계(0.5%~5%)가 블랙 레벨을 들뜨게 하지 않으면서 0% 순수 블랙과 구별되는지 검증합니다."
        }
    ],
    "canObserve": [
        "단계별 흰색 휘도 레벨에 따른 반사 하이라이트 클리핑 지점",
        "10% APL 창에서의 로컬 디밍 헤일로 및 최대 밝기 여유도",
        "8비트 밴딩 대비 10비트 톤 전환의 매끄러움",
        "암부 디테일 분리도 및 블랙 크러시 현상"
    ],
    "cannotMeasure": [
        "실험실 센서 없는 정확한 광도 피크 휘도(nits)",
        "분광광도계 없는 색온도(Kelvin) 정확도",
        "픽셀 응답 시간 또는 오버드라이브 오버슈트"
    ],
    "interpretation": "톤 매핑이 부실한 디스플레이는 94% 이상에서 하이라이트를 조기 클리핑하거나 암부를 뭉개버립니다. 우수한 OLED 및 Mini-LED는 99%까지 디테일을 유지합니다.",
    "nextSteps": {
        "text": "운영체제와 비디오 코덱이 HDR을 지원하는지 진단하려면 하드웨어 감지기를 확인하십시오.",
        "actionLabel": "HDR 하드웨어 및 신호 확인",
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
    "overview": "배터리 상태 및 전원 정보 도구는 W3C Battery Status API를 통해 배터리 충전율, 전원 연결 여부, 완전 충전 및 잔여 작동 예상 시간을 실시간으로 모니터링합니다.",
    "whatToLookFor": [
        {
            "label": "실시간 충전량",
            "description": "운영체제가 보고하는 배터리 잔량 퍼센트를 감시합니다."
        },
        {
            "label": "전원 어댑터 연결 상태",
            "description": "외부 전원 충전 중인지 내부 배터리 사용 중인지 판별합니다."
        },
        {
            "label": "충전 및 방전 소요 시간",
            "description": "100% 충전까지 또는 방전까지 남은 시간을 추정합니다."
        },
        {
            "label": "방전 추이 기록",
            "description": "화면 구동 중 배터리 소모 패턴을 확인합니다."
        }
    ],
    "canObserve": [
        "운영체제 전원 관리자가 제공하는 실시간 배터리 잔량",
        "충전/방전 상태 전환 이벤트 감지",
        "완전 충전 또는 방전까지 남은 예상 시간",
        "테스트 진행 중 배터리 수준 변화 추이"
    ],
    "cannotMeasure": [
        "물리적 mAh 화학 용량 퇴화율",
        "내부 배터리 온도, 내부 저항 및 충방전 사이클 수",
        "개인정보 보호로 API가 차단된 브라우저에서의 정보 수집"
    ],
    "interpretation": "API 미지원 표시가 나타나면 브라우저의 트래킹 방지 정책 때문입니다. 가벼운 부하에서도 급격한 방전이 발생하면 배터리 노후화를 의심할 수 있습니다.",
    "nextSteps": {
        "text": "인터넷 연결 속도와 지연 시간을 측정해 보시겠습니까?",
        "actionLabel": "네트워크 속도 테스트 시작",
        "actionHref": "/tests/network-speed-test"
    }
},

  "network-speed-test": {
    "overview": "네트워크 속도 및 지연 시간 테스트는 브라우저 타이밍 API와 Network Information API를 활용하여 인터넷 핑 지연, 지터, 연결 유형 및 다운로드 대역폭을 정밀 측정합니다.",
    "whatToLookFor": [
        {
            "label": "핑 지연 시간 (RTT)",
            "description": "브라우저와 서버 간 패킷 왕복 시간을 밀리초 단위로 측정합니다."
        },
        {
            "label": "다운로드 처리량 (Mbps)",
            "description": "데이터 전송 스트림을 통해 실제 다운로드 대역폭을 산출합니다."
        },
        {
            "label": "연결 프로필 및 유형",
            "description": "인식된 유효 연결 유형(4G, Wi-Fi, 이더넷 등)을 감지합니다."
        },
        {
            "label": "회선 안정성 및 지터",
            "description": "연속 핑 요청 간의 편차를 감지하여 버퍼블로트 여부를 파악합니다."
        }
    ],
    "canObserve": [
        "밀리초 단위의 HTTP/HTTPS 왕복 지연 시간(RTT)",
        "navigator.connection 객체를 통한 네트워크 등급",
        "실제 패킷 수신 시간을 기반으로 한 다운로드 속도",
        "데이터 세이버 모드 활성화 여부"
    ],
    "cannotMeasure": [
        "브라우저 스택 오버헤드를 배제한 순수 TCP 소켓 왕복 시간",
        "물리적 통신선 감쇠율 및 신호 대 잡음비(SNR)",
        "공유기 주변 Wi-Fi 주파수 전파 간섭"
    ],
    "interpretation": "30ms 이하의 핑은 실시간 온라인 게임과 원격 데스크톱에 최적입니다. 50Mbps 이상의 대역폭은 4K UHD 스트리밍을 버퍼링 없이 재생합니다.",
    "nextSteps": {
        "text": "마우스 클릭부터 화면 반응까지의 입력 지연을 측정해 보시겠습니까?",
        "actionLabel": "입력 지연 테스트 시작",
        "actionHref": "/tests/input-lag-test"
    }
},

  "color-blindness-test": {
    "overview": "색맹 시뮬레이터는 정밀 보정된 SVG 컬러 매트릭스 필터를 적용하여 8가지 색각 이상 유형을 재현하며, UI 디자인의 웹 접근성 및 대비 가독성을 점검할 수 있도록 지원합니다.",
    "whatToLookFor": [
        {
            "label": "제1색각이상 (적색맹/적색약)",
            "description": "L-원추세포 이상으로 빨간색이 어두운 갈색으로 인식되며 녹색과의 구별이 감소합니다."
        },
        {
            "label": "제2색각이상 (녹색맹/녹색약)",
            "description": "M-원추세포 이상으로 녹색과 빨간색이 황색 계열로 혼동되는 가장 흔한 유형입니다."
        },
        {
            "label": "제3색각이상 (청색맹/청색약)",
            "description": "S-원추세포 이상으로 파란색이 청록색으로, 노란색이 보라/회색으로 보입니다."
        },
        {
            "label": "전색맹 (완전 색각 이상)",
            "description": "기능적 원추세포 부재로 인해 모든 색채가 명도 차이인 흑백 그레이스케일로 인식됩니다."
        }
    ],
    "canObserve": [
        "8가지 필터 매트릭스를 적용한 텍스트, 컴포넌트, 그래프의 실시간 변환",
        "정상 시각과 시뮬레이션 뷰의 나란히 비교",
        "상태 표시 색상(정상 녹색 vs 오류 빨강) 간의 식별력 저하 관찰",
        "각 유형별 텍스트와 배경 간의 대비 가독성 평가"
    ],
    "cannotMeasure": [
        "사용자 안과 진료 수준의 의학적 색각 정밀 진단",
        "개인 망막 수용체별 고유 민감도 차이",
        "분광복사계 장비 없는 디스플레이의 물리적 파장 스펙트럼"
    ],
    "interpretation": "제1/제2색각이상에서 주요 상태 표시가 구별되지 않는다면, WCAG 2.2 가이드라인에 따라 색상뿐만 아니라 아이콘, 텍스트 라벨, 테두리 형태를 병행해야 합니다.",
    "nextSteps": {
        "text": "모니터의 sRGB 및 DCI-P3 색역 커버리지를 점검해 보세요.",
        "actionLabel": "색역 테스트 확인",
        "actionHref": "/tests/color-gamut-test"
    }
},

  "screen-recorder": {
    "overview": "화면 녹화기 및 스크린샷 유틸리티는 Screen Capture API와 MediaRecorder API를 사용하여 별도의 프로그램 설치 없이 화면 녹화(WebM) 및 고해상도 스크린샷(PNG)을 안전하게 캡처합니다.",
    "whatToLookFor": [
        {
            "label": "스트림 캡처 해상도",
            "description": "캡처되는 비디오 트랙의 픽셀 해상도가 모니터 규격과 일치하는지 확인합니다."
        },
        {
            "label": "프레임 레이트 및 지속 시간",
            "description": "실시간 녹화 진행 시간과 비디오 프레임 안정성을 모니터링합니다."
        },
        {
            "label": "오디오 트랙 동시 녹음",
            "description": "화면과 함께 시스템 사운드 또는 탭 오디오를 동시에 녹음할 수 있습니다."
        },
        {
            "label": "무손실 PNG 스냅샷",
            "description": "캔버스 버퍼를 통해 즉시 다운로드 가능한 단일 프레임 PNG를 생성합니다."
        }
    ],
    "canObserve": [
        "비디오 트랙의 해상도 규격, 화면 비율 및 초당 프레임 수",
        "녹화 경과 시간, 일시정지 제어 및 생성된 WebM 파일 크기",
        "HTML5 Canvas를 활용한 단일 프레임 캡처 및 다운로드",
        "브라우저의 화면 공유 권한 부여 상태"
    ],
    "cannotMeasure": [
        "운영체제 그래픽 카드 비디오 인코더 자체의 하드웨어 지연",
        "DRM 보안이 적용된 미디어 콘텐츠 (보안상 검은 화면으로 처리됨)",
        "물리 모니터의 초고주사율 하드웨어 동기화"
    ],
    "interpretation": "모든 캡처 및 녹화 데이터는 로컬 브라우저 메모리 안에서만 처리되며 외부 서버로 전송되지 않으므로 개인정보가 완벽히 보호됩니다.",
    "nextSteps": {
        "text": "웹캠 카메라의 작동 상태와 화질을 점검해 보시겠습니까?",
        "actionLabel": "웹캠 테스트 실행",
        "actionHref": "/tests/webcam-test"
    }
},

  "dark-mode-test": {
    "overview": "다크 모드 및 테마 호환성 테스트는 운영체제의 prefers-color-scheme 감지, CSS color-scheme 렌더링, 시스템 폼 컨트롤 및 라이트/다크 테마 환경에서의 대비 가독성을 분석합니다.",
    "whatToLookFor": [
        {
            "label": "OS 기본 설정 동기화",
            "description": "운영체제의 다크/라이트 모드 전환을 브라우저가 정확히 감지하는지 확인합니다."
        },
        {
            "label": "CSS color-scheme 지원",
            "description": "다크 모드 시 스크롤바와 기본 입력창의 네이티브 다크 렌더링을 점검합니다."
        },
        {
            "label": "컴포넌트 대비 및 가독성",
            "description": "텍스트, 카드, 버튼 등 주요 UI의 명암비와 시인성을 비교합니다."
        },
        {
            "label": "OLED 완전 블랙(#000000)",
            "description": "OLED 패널에서 소자를 끄는 리얼 블랙 적용 여부를 확인합니다."
        }
    ],
    "canObserve": [
        "matchMedia API를 통한 실시간 다크 모드 감지 상태",
        "브라우저의 CSS color-scheme 속성 및 시스템 컨트롤 지원 여부",
        "시스템, 라이트, 다크 모드 간의 대화형 즉시 전환",
        "밝은 배경과 어두운 배경에서의 텍스트 명암비 가독성"
    ],
    "cannotMeasure": [
        "외부 측정기 없는 실제 OLED 패널의 밀리암페어 전력 소모 절감량",
        "센서 지원 없는 실내 조명 밝기 자동 적응",
        "야간 모드 블루라이트 차단에 따른 색온도 편차"
    ],
    "interpretation": "OLED 디스플레이는 완전한 검은색 영역에서 픽셀을 꺼 배터리를 크게 절약하며, 어두운 환경에서 눈의 피로를 덜어줍니다.",
    "nextSteps": {
        "text": "실내 조명에 맞춘 최적의 모니터 밝기를 확인해 보시겠습니까?",
        "actionLabel": "주변광 센서 테스트 시작",
        "actionHref": "/tests/ambient-light-test"
    }
},

  "input-lag-test": {
    "overview": "입력 지연 시각화기는 10회에 걸친 반응 속도 및 지연 시간 벤치마크를 수행하여 화면 색상 변화부터 마우스 클릭 등록까지의 시간을 측정하고 평균, 표준편차, 분포 히스토그램을 제공합니다.",
    "whatToLookFor": [
        {
            "label": "시각 자극 반응 속도",
            "description": "녹색 화면 전환 시점부터 마우스 클릭 감지까지의 밀리초를 측정합니다."
        },
        {
            "label": "통계적 일관성 (표준편차)",
            "description": "표준편차가 25ms 미만이면 시스템과 반응의 일관성이 높음을 나타냅니다."
        },
        {
            "label": "부정 출발 감지",
            "description": "녹색 신호가 나타나기 전 성급하게 누른 클릭을 감지하여 방지합니다."
        },
        {
            "label": "반응 시간 분포 히스토그램",
            "description": "측정된 지연 시간들의 밀집도를 히스토그램으로 시각화합니다."
        }
    ],
    "canObserve": [
        "performance.now()를 활용한 고정밀 밀리초 타임스탬프",
        "10회 시행에 대한 평균, 최고, 최저, 표준편차 통계 지표",
        "부정 입력을 차단하는 실시간 상태 제어",
        "반응 지연 구간별 빈도수를 나타내는 히스토그램"
    ],
    "cannotMeasure": [
        "외부 광센서 하드웨어(LDAT 등) 없는 순수 광학 클릭-투-포톤 지연",
        "운영체제 인터럽트와 분리된 순수 USB 폴링 주기",
        "디스플레이 액정의 물리적 응답 속도"
    ],
    "interpretation": "고주사율 게이밍 환경에서는 180ms~240ms가 일반적입니다. 300ms 이상 측정된다면 모니터의 게임 모드 활성화 여부를 확인해야 합니다.",
    "nextSteps": {
        "text": "디스플레이의 실제 주사율 및 프레임 표시 안정성을 점검해 보세요.",
        "actionLabel": "주사율 테스트 확인",
        "actionHref": "/tests/refresh-rate-test"
    }
},

  "ambient-light-test": {
    "overview": "주변광 센서 테스트는 AmbientLightSensor API를 통해 실내 조도(lx)를 측정하고, 눈의 피로를 최소화하는 인체공학적 최적 모니터 밝기를 제안합니다.",
    "whatToLookFor": [
        {
            "label": "실시간 조도 판독 (lx)",
            "description": "기기 내장 광센서로 실내 환경 밝기를 측정합니다."
        },
        {
            "label": "인체공학 권장 밝기",
            "description": "현재 조명 조건에 적합한 최적의 디스플레이 밝기를 추천합니다."
        },
        {
            "label": "눈부심 위험 경고",
            "description": "1000 lx 이상의 강한 조명으로 인한 반사 위험을 경고합니다."
        },
        {
            "label": "조도 변화 추이",
            "description": "외광 변화나 조명 깜빡임에 따른 조도 변동을 그래프로 추적합니다."
        }
    ],
    "canObserve": [
        "하드웨어 센서 기반 실시간 조도(lux) 수치",
        "조명 환경 등급 분류 (암실, 어두운 방, 사무실, 밝은 실내, 주광)",
        "국제 표준 기준 권장 모니터 밝기 백분율",
        "측정 시간 동안의 조도 변화 이력 차트"
    ],
    "cannotMeasure": [
        "Generic Sensor API를 지원하지 않는 브라우저에서의 수집",
        "RGB 센서 없는 실내 조명의 색온도(Kelvin) 및 연색지수(CRI)",
        "화면 표면으로 직접 반사되는 빛의 입사 각도"
    ],
    "interpretation": "일반 사무 환경에서는 300~500 lx 조도에 화면 밝기 120~150 nits가 이상적입니다. 50 lx 미만의 어두운 환경에서는 모니터 밝기를 낮추어 눈을 보호하세요.",
    "nextSteps": {
        "text": "화면의 밝기와 블랙 레벨 표현력을 정밀 조정해 보세요.",
        "actionLabel": "밝기 테스트 시작",
        "actionHref": "/tests/brightness-test"
    }
},

  "dpi-calculator": {
    "overview": "DPI 및 PPI 계산기는 화면 대각선 크기와 해상도를 바탕으로 픽셀 밀도(PPI), 도트 피치, 총 화소수 및 인간의 시각으로 개별 픽셀을 식별할 수 없는 레티나(Retina) 한계 시청 거리를 정밀 계산합니다.",
    "whatToLookFor": [
        {
            "label": "인치당 픽셀 수 (PPI)",
            "description": "화면 대각선 1인치당 배열된 물리적 픽셀 밀도를 산출합니다."
        },
        {
            "label": "도트 피치 (Dot Pitch)",
            "description": "인접한 서브픽셀 중심 간의 물리적 간격을 밀리미터 단위로 계산합니다."
        },
        {
            "label": "레티나 최적 시청 거리",
            "description": "정상 시력(1.0) 기준으로 픽셀 격자가 눈에 보이지 않게 되는 거리(60 PPD)를 도출합니다."
        },
        {
            "label": "화면 비율 및 총 메가픽셀",
            "description": "디스플레이 표면적, 가로세로 비율 및 렌더링되는 총 픽셀 수를 계산합니다."
        }
    ],
    "canObserve": [
        "산출된 PPI 수치, 밀리미터 단위 도트 피치, 총 메가픽셀 수",
        "센티미터 및 인치 단위의 인체공학 권장 시청 거리 및 레티나 임계값",
        "주요 모니터 프리셋 원클릭 적용 (24\" FHD, 27\" QHD, 32\" 4K, 16\" 맥북)",
        "대화형 해상도 및 화면 크기 조절 슬라이더"
    ],
    "cannotMeasure": [
        "사용자 입력 없는 모니터 플라스틱 베젤의 외형 규격",
        "논글레어 매트 코팅에 의한 미세 입상감 및 빛 번짐 영향",
        "비표준 변칙 비율 패널의 아나모픽 왜곡"
    ],
    "interpretation": "일반 데스크톱 환경에서는 110 PPI 이상이면 확대 배율 없이도 텍스트가 선명하게 보이며, 220 PPI를 넘어서면 일반적인 거리(50~60cm)에서 완벽한 레티나 화질을 제공합니다.",
    "nextSteps": {
        "text": "글꼴 크기별 서브픽셀 렌더링 및 텍스트 선명도를 직접 확인해 보세요.",
        "actionLabel": "텍스트 가독성 테스트 시작",
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

