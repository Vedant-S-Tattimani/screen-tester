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

  "hdr-test": {
    overview: "HDR(하이 다이내믹 레인지)은 높은 최대 밝기와 넓은 색 영역을 제공합니다. 이 테스트는 브라우저의 HDR 인식 여부를 확인하고 톤 매핑과 화이트 클리핑 한계를 점검합니다.",
    whatToLookFor: [
      {
        label: "브라우저 HDR 활성화 감지",
        description: "'(dynamic-range: high)'가 활성 상태인지 확인합니다. 아니라면 Windows 설정에서 HDR을 켜야 합니다."
      },
      {
        label: "최고 밝기 구간의 디테일 유지",
        description: "90%, 94%, 97%, 99% 흰색 카드 안의 내부 기호가 배경과 묻히지 않고 구별되는지 봅니다."
      },
      {
        label: "하이라이트 화이트 클리핑",
        description: "94%부터 100%까지가 전부 똑같은 하얀색 덩어리로 타버려 보인다면 톤 매핑이 실패한 것입니다."
      },
      {
        label: "광색역(Display P3)의 풍부함",
        description: "일반 SDR 콘텐츠에 비해 높은 채도의 색상이 훨씬 깊고 생생하게 표현되는지 관찰합니다."
      }
    ],
    canObserve: [
      "브라우저가 보고하는 고동적 범위 및 색 심도 API 상태",
      "최대 흰색 직전까지의 시각적 하이라이트 계조 분리도",
      "HDR 테스트 패턴 내의 암부 세부 묘사 식별력"
    ],
    cannotMeasure: [
      "측정기 없는 cd/m²(nit) 단위의 실제 최대 물리 밝기",
      "공식 VESA DisplayHDR 등급(예: DisplayHDR 400 vs 1000) 준수 여부",
      "PQ 감마 곡선(ST 2084 EOTF)에 대한 엄밀한 추종 정밀도"
    ],
    interpretation: "'HDR400' 표기 모니터 중 다수는 로컬 디밍이 없고 SDR 수준의 밝기만 낼 수 있어, HDR을 켜면 화면이 허옇게 물빠져 보일 수 있습니다.",
    nextSteps: {
      text: "HDR 화면이 물빠진 것처럼 보이거나 어둡나요? HDR 올바른 설정법을 확인하세요.",
      actionLabel: "HDR 문제 해결 가이드",
      actionHref: "/knowledge-base/troubleshooting#hdr-not-working"
    }
  },

  "resolution-checker": {
    overview: "운영체제는 고해상도 모니터에서 글자 크기를 알맞게 유지하기 위해 배율을 적용합니다. 이로 인해 논리 CSS 픽셀과 모니터의 실제 물리 픽셀 사이에 차이가 발생합니다.",
    whatToLookFor: [
      {
        label: "물리 해상도 vs 논리 해상도",
        description: "4K 모니터를 150% 배율로 쓰면 논리 뷰포트는 2560×1440(DPR 1.5)이 되고 실제 물리 픽셀은 3840×2160입니다."
      },
      {
        label: "디바이스 픽셀 비율 (DPR)",
        description: "CSS 픽셀과 화면 물리 점의 배율입니다(예: 1.0 = 100%, 1.25 = 125%, 2.0 = 200%)."
      },
      {
        label: "실제 사용 가능한 데스크톱 영역",
        description: "Screen.availWidth/Height는 작업 표시줄을 제외하고 창을 띄울 수 있는 실질 작업 영역을 보여줍니다."
      },
      {
        label: "창 크기와 전체 화면 해상도",
        description: "Window.innerWidth는 현재 브라우저 창 크기이며, 모니터 전체 해상도와 구분됩니다."
      }
    ],
    canObserve: [
      "브라우저가 제공하는 화면 치수 (screen.width, screen.height, availWidth/Height)",
      "디바이스 픽셀 비율(DPR) 및 계산된 물리 렌더링 해상도",
      "CSS 레이아웃 뷰포트 크기 및 화면 방향 정보"
    ],
    cannotMeasure: [
      "외장 스케일러나 그래픽카드가 신호를 축소 전송할 때의 실제 패널 물리 격자",
      "캡처 보드나 TV가 강제하는 입력 해상도 다운스케일링",
      "하드웨어로 강제된 비정방형 픽셀 모드"
    ],
    interpretation: "표시되는 해상도가 모니터 스펙과 다르다면 Windows 디스플레이 설정의 텍스트 배율을 확인하세요. 100%로 변경하면 물리 해상도와 1:1로 일치하게 됩니다.",
    nextSteps: {
      text: "여러 모니터의 해상도, 화면 크기, PPI를 나란히 비교해보고 싶다면 비교 계산기를 써보세요.",
      actionLabel: "화면 비교 및 PPI 계산기",
      actionHref: "/tests/compare-displays"
    }
  },

  "display-info": {
    overview: "브라우저는 현재 활성 모니터, 창 크기, 색 심도, 터치 지원 여부 등 다양한 환경 정보를 제공합니다. 이 대시보드는 접근 가능한 모든 파라미터를 정리해 보여줍니다.",
    whatToLookFor: [
      {
        label: "표시되는 색 심도",
        description: "Screen.colorDepth는 비트 깊이를 나타냅니다(보통 8bit RGB는 24bit, 10bit 지원 시 30bit)."
      },
      {
        label: "터치 입력 지원 여부",
        description: "Navigator.maxTouchPoints는 기기에 활성화된 터치 센서가 있는지 알려줍니다."
      },
      {
        label: "다중 모니터 조회 한계",
        description: "보안 정책상 웹 브라우저는 특별한 창 관리 권한 없이 모니터 모델명이나 시리얼 번호를 읽을 수 없습니다."
      },
      {
        label: "애니메이션 주사 페이스",
        description: "실시간 애니메이션 클록을 통해 현재 브라우저 탭의 화면 갱신 동기화 상태를 추정합니다."
      }
    ],
    canObserve: [
      "표준 DOM의 Screen, Window, Navigator, Media Query 매개변수 전반",
      "디바이스 픽셀 비율, 색 심도, 픽셀 깊이 및 화면 방향",
      "포인터 장치 및 터치 입력 지원 스펙"
    ],
    cannotMeasure: [
      "특수 권한 없는 모니터 제조사의 EDID 모델명이나 시리얼 번호",
      "HDMI 또는 DisplayPort 케이블의 물리적 대역폭 규격",
      "운영체제 설정을 무시한 패널 자체의 물리적 최고 주사율"
    ],
    interpretation: "웹 애플리케이션은 샌드박스 안에서 안전하게 동작합니다. 화면에 표시되는 값들은 운영체제와 윈도우 관리자가 앱에 공개한 정보입니다.",
    nextSteps: {
      text: "화면 비율 왜곡이나 스케일링 상태를 검사하고 싶으신가요? 화면비 테스트를 진행해보세요.",
      actionLabel: "스케일링 및 화면비 테스트",
      actionHref: "/tests/scaling-aspect-test"
    }
  },

  "scaling-aspect-test": {
    overview: "화면 비율이나 그래픽카드 스케일링 설정이 잘못되면 원이 타원형으로 찌그러지고 글씨가 흐려집니다. 이 테스트는 정원, 정사각형 및 화면비 가이드(16:9, 16:10, 21:9, 4:3)를 통해 1:1 정방형 픽셀 렌더링을 점검합니다.",
    whatToLookFor: [
      {
        label: "도형의 진원도 (원형 왜곡)",
        description: "중앙의 기준 원이 찌그러짐 없는 완벽한 원인지 확인합니다. 타원처럼 보인다면 화면비가 왜곡된 것입니다."
      },
      {
        label: "정사각형 픽셀 (1:1)",
        description: "체크무늬 격자의 각 사각형 가로와 세로 길이가 정확히 일치하는지 확인합니다."
      },
      {
        label: "화면비 가이드라인 일치",
        description: "모니터 규격(16:9, 16:10, 21:9 등)의 외곽 기준선과 실제 디스플레이 영역이 딱 맞아떨어지는지 봅니다."
      },
      {
        label: "GPU 스케일링 모드",
        description: "권장 해상도인데 검은 여백이 생기거나 늘어나 보인다면 GPU 제어판의 크기 조정 설정을 확인하세요."
      }
    ],
    canObserve: [
      "브라우저 뷰포트 내의 원형 및 정사각형 그리드 기하학적 왜곡 여부",
      "16:9, 16:10, 21:9, 4:3 표준 화면비 프레임과의 정렬 일치도",
      "현재 브라우저 창의 가로세로 비율 계산"
    ],
    cannotMeasure: [
      "모니터 플라스틱 베젤의 물리적 밀리미터 외경 치수",
      "프로젝터 렌즈 등에 의한 광학적 아나모픽 왜곡",
      "외장 비디오 프로세서의 하드웨어 화면비 고정 모드"
    ],
    interpretation: "화면 왜곡은 비권장 해상도를 선택하면서 GPU 제어판에서 '종횡비 유지' 옵션을 켜지 않았을 때 주로 발생합니다.",
    nextSteps: {
      text: "PC를 TV에 연결해 사용 중이신가요? 테두리가 잘리지 않는지 오버스캔 테스트로 확인하세요.",
      actionLabel: "TV 오버스캔 테스트",
      actionHref: "/tests/tv-overscan-test"
    }
  },

  "compare-displays": {
    overview: "화면 인치 크기, 해상도, 화소 밀도(PPI)는 작업 공간의 넓이와 글씨의 선명함을 결정합니다. 이 도구는 두 대의 모니터 치수, 총 픽셀 수, PPI를 계산하여 실측 비율로 나란히 비교합니다.",
    whatToLookFor: [
      {
        label: "화소 밀도 (PPI)",
        description: "PPI가 높을수록 텍스트가 부드럽고 선명합니다. 데스크톱은 약 110 PPI가 표준이며, 220 PPI 전후는 레티나급 선명도입니다."
      },
      {
        label: "물리적 가로 및 세로 길이",
        description: "27인치 16:9 모니터는 29인치 울트라와이드(21:9)보다 세로 높이가 훨씬 넉넉합니다."
      },
      {
        label: "총 픽셀 수",
        description: "4K(약 829만 화소)는 일반적인 풀HD 1080p(약 207만 화소)보다 4배 많은 정보를 표시할 수 있습니다."
      },
      {
        label: "최적 시청 거리",
        description: "PPI가 높을수록 픽셀 사이의 격자선(모기장 현상)을 느끼지 않고 화면에 더 가까이 다가앉을 수 있습니다."
      }
    ],
    canObserve: [
      "입력된 수치에 기반한 PPI, 화면비, 표시 면적의 수학적 계산",
      "두 모니터의 상대적 크기를 비례에 맞춰 나란히 배치한 시각적 비교",
      "도트 피치(픽셀 간격, mm 단위) 계산"
    ],
    cannotMeasure: [
      "사용자의 인치 수 입력 없는 연결 모니터 크기의 자동 판별",
      "브라우저 API를 통한 패널의 광학적 실측 크기 측정",
      "모니터 스탠드 깊이나 테두리 베젤 두께"
    ],
    interpretation: "화소 밀도는 피타고라스 정리에 따라 대각선 픽셀 수를 물리적 대각선 인치로 나누어 계산합니다. 브라우저는 모니터 인치 수를 알 수 없으므로 사용자 입력이 필수적입니다.",
    nextSteps: {
      text: "화소 밀도가 운영체제 글씨 선명도에 어떤 영향을 미치는지 알아보세요.",
      actionLabel: "글자 선명도 가이드 읽기",
      actionHref: "/knowledge-base/text-clarity-and-subpixel-rendering"
    }
  },

  "tv-overscan-test": {
    overview: "오버스캔은 과거 브라운관 TV 시절 영상 외곽 2%~5%를 잘라내고 확대하던 표준입니다. PC나 게임기를 연결했을 때 작업 표시줄이 잘리고 1:1 픽셀 매핑이 깨져 글씨가 번지는 원인이 됩니다.",
    whatToLookFor: [
      {
        label: "최외곽 '0%' 라인의 표시 여부",
        description: "맨 바깥쪽 흰색 테두리와 '0%' 화살표가 보이지 않는다면 TV가 오버스캔으로 화면을 잘라먹고 있는 것입니다."
      },
      {
        label: "잘려나간 비율 눈금",
        description: "TV 프레임에 어떤 눈금(2.5% 또는 5%)이 걸쳐 있는지 확인하여 잘려나간 데스크톱의 양을 파악합니다."
      },
      {
        label: "모서리 십자선의 끝부분",
        description: "네 모서리의 십자선 끝부분이 TV 패널의 물리적 테두리에 정확히 일치하는지 봅니다."
      },
      {
        label: "1:1 매핑 패턴의 선명도",
        description: "1픽셀 체크무늬 눈금을 확인합니다. 깜빡이거나 회색으로 뭉개져 보인다면 TV가 화면을 억지로 확대하고 있는 것입니다."
      }
    ],
    canObserve: [
      "화면 테두리 잘림 유무 및 백분율 경계선(0%, 2.5%, 5%)의 시각적 가시성",
      "스케일러 보간으로 인한 글자 흐림을 감지하는 1픽셀 패턴의 해상력",
      "TV 화면 크기 설정 변경에 따른 실시간 시각적 검증"
    ],
    cannotMeasure: [
      "TV 내부 설정 메뉴(OSD)를 브라우저 소프트웨어로 직접 조작",
      "HDMI-CEC를 통한 TV 화면비 프리셋의 자동 인식",
      "TV 플라스틱 베젤의 덮임과 전자적 신호 잘림의 분리 측정"
    ],
    interpretation: "글씨를 선명하게 하고 바탕화면 전체를 보려면 TV 리모컨의 화면 크기 설정을 '원본 크기', '1:1 픽셀', '화면 맞춤', '저스트 스캔', '도트 바이 도트' 중 하나로 변경하세요.",
    nextSteps: {
      text: "삼성, LG, 소니, 중소기업 TV에서 1:1 화면 맞춤 설정법을 안내해드립니다.",
      actionLabel: "TV 오버스캔 및 1:1 매핑 가이드",
      actionHref: "/knowledge-base/tv-overscan-and-pixel-mapping"
    }
  },

  "multi-touch-test": {
    overview: "터치스크린, 태블릿, 인터랙티브 디스플레이의 다중 동시 접점을 테스트합니다. 실시간 좌표를 시각화하고 터치된 손가락 수를 카운트하여 제스처가 브라우저에 정상적으로 전달되는지 진단합니다.",
    whatToLookFor: [
      {
        label: "동시 터치 인식 개수",
        description: "여러 손가락을 동시에 올려보세요. 카운터가 2점, 5점, 10점을 누락 없이 정확하게 숫자로 표시하는지 확인합니다."
      },
      {
        label: "터치 경로 추적의 부드러움",
        description: "여러 손가락을 화면 위에서 드래그하여 선이 중간에 끊기거나 튀는 현상 없이 따라오는지 봅니다."
      },
      {
        label: "OS 시스템 제스처 간섭",
        description: "3개나 4개의 손가락을 얹었을 때 웹 테스트 대신 OS의 제스처(앱 전환 등)가 오작동하지 않는지 확인합니다."
      },
      {
        label: "팜 리젝션 (손바닥 무시)",
        description: "손가락을 터치하면서 손바닥 면을 화면에 대어 넓은 면적의 오동작을 디지타이저가 잘 무시하는지 봅니다."
      }
    ],
    canObserve: [
      "브라우저 창으로 전달되는 포인터 및 터치 이벤트의 실시간 추적",
      "동시 감지된 터치 점의 좌표, 고유 ID 및 총 접점 개수",
      "브라우저가 보고하는 navigator.maxTouchPoints 속성값"
    ],
    cannotMeasure: [
      "디지타이저의 물리 샘플링 레이트 (Hz 단위 터치 보고율)",
      "전용 하드웨어 API 없는 정전용량식 압력 감도 수치",
      "OS 드라이버가 감지하지 못하는 센서 격자선의 물리 단선"
    ],
    interpretation: "동시 인식 가능한 터치 개수는 화면에 내장된 디지타이저 센서 스펙과 운영체제 드라이버 제한에 따라 결정됩니다.",
    nextSteps: {
      text: "화면 전 영역의 터치 불감증(데드존)과 드로잉 끊김을 검사하고 싶으신가요?",
      actionLabel: "터치스크린 전면 테스트 열기",
      actionHref: "/tests/touch-screen-test"
    }
  },

  "webcam-test": {
    overview: "WebRTC 미디어 스트림 API(getUserMedia)를 통해 브라우저에서 카메라를 직접 점검합니다. 해상도(720p, 1080p, 4K) 지원 확인, 실시간 프레임레이트 측정, 권한 오류 진단을 로컬에서 안전하게 수행합니다.",
    whatToLookFor: [
      {
        label: "비디오 스트림 해상도",
        description: "표시되는 해상도가 웹캠의 스펙(예: 1920×1080 Full HD)에 맞게 수신되는지 확인합니다."
      },
      {
        label: "프레임레이트(FPS) 안정성",
        description: "실시간 FPS를 확인합니다. 어두운 곳에서는 노출 시간을 확보하기 위해 많은 카메라가 자동으로 15~20 FPS로 떨어집니다."
      },
      {
        label: "색감 및 노출 밸런스",
        description: "얼굴의 하이라이트가 하얗게 날아가지 않는지, 실내 형광등 아래 화이트 밸런스와 어두운 곳의 노이즈를 확인합니다."
      },
      {
        label: "카메라 접근 권한 동작",
        description: "브라우저가 권한 요청 창을 올바르게 띄우고 다른 프로그램과의 충돌 없이 단독으로 카메라를 사용하는지 봅니다."
      }
    ],
    canObserve: [
      "외부 서버 전송 없이 브라우저 탭 안에서 100% 로컬로 처리되는 실시간 영상",
      "OS 카메라 드라이버와 협상된 스트림 해상도(가로, 세로) 및 프레임레이트",
      "MediaDeviceInfo 인터페이스를 통한 연결 장치 이름 목록"
    ],
    cannotMeasure: [
      "OS 카메라 드라이버 한계를 넘어선 물리적 센서의 본래 해상도",
      "카메라 렌즈의 광학 왜곡률 및 색수차 계수",
      "조도계(Lux) 기준에 따른 정밀 광학 감도"
    ],
    interpretation: "웹캠 해상도는 운영체제의 카메라 드라이버를 통해 최종 결정됩니다. 고해상도를 선택할 수 없다면 USB 대역폭 부족이나 하드웨어 프라이버시 셔터를 점검하세요.",
    nextSteps: {
      text: "카메라가 감지되지 않거나 권한이 차단되었나요? 문제 해결 가이드를 읽어보세요.",
      actionLabel: "웹캠 문제 해결 가이드",
      actionHref: "/knowledge-base/troubleshooting#webcam-access-denied"
    }
  },

  "speaker-test": {
    overview: "Web Audio API를 활용하여 스피커, 헤드폰, 외장 음향 시스템을 점검합니다. 스테레오 채널 분리(좌, 우, 양쪽)를 확인하고 20Hz부터 20,000Hz까지의 주파수 스윕으로 음 왜곡과 잡음을 찾아냅니다.",
    whatToLookFor: [
      {
        label: "좌우 스테레오 채널 분리",
        description: "왼쪽 채널 테스트 시 오른쪽 스피커나 이어폰에서 소리가 새어 나오지 않는지 확인합니다."
      },
      {
        label: "초저음역(20Hz~100Hz) 재생 한계",
        description: "베이스 소리를 들어보세요. 노트북 내장 스피커는 보통 80Hz~100Hz 이하가 완전히 재생되지 않습니다."
      },
      {
        label: "고음역(10kHz~20kHz) 청취 한계",
        description: "고주파수로 올라가면서 소리가 들리지 않는 지점을 확인합니다(스피커 한계 및 개인의 청력 차이)."
      },
      {
        label: "케이스 떨림 및 잡음 (공진음)",
        description: "중저음(100Hz~300Hz) 재생 시 책상 위 물건이나 모니터 내장 스피커 플라스틱 케이스가 떨리며 지지직거리지 않는지 봅니다."
      }
    ],
    canObserve: [
      "합성 오디오 톤 재생 및 좌, 우, 중앙 채널별 스테레오 패닝 제어",
      "인간 가청 주파수 전 영역(20Hz~20,000Hz)에 걸친 연속 주파수 스윕",
      "AudioContext 샘플링 레이트 및 Web Audio API 출력 기능"
    ],
    cannotMeasure: [
      "측정용 정밀 마이크 없는 음압 레벨(SPL, 데시벨 dB) 수치",
      "스피커의 전고조파 왜곡률(THD) 또는 전기적 임피던스",
      "청취실의 룸 어쿠스틱 주파수 응답 특성 곡선"
    ],
    interpretation: "스테레오 테스트를 통해 사운드 출력이 모노로 잘못 다운믹스되지 않았는지 검증할 수 있습니다. 주파수 스윕은 스피커 진동판 손상이나 하우징 유격을 진단하는 데 유용합니다.",
    nextSteps: {
      text: "소리가 안 나거나 좌우 채널이 반대로 들리나요? 오디오 문제 해결법을 확인하세요.",
      actionLabel: "스피커 문제 해결 가이드",
      actionHref: "/knowledge-base/troubleshooting#speaker-no-sound"
    }
  },

  "accelerometer-test": {
    overview: "가속도계 테스트는 DeviceMotionEvent API를 활용하여 3개의 물리적 축(X, Y, Z)을 따라 선형 가속도와 지구의 1g 중력 가속도를 실시간으로 측정 및 시각화합니다. 기기의 기울기, 동적 움직임 및 충격을 즉시 감지합니다.",
    whatToLookFor: [
      {
        label: "중력 가속도(1g) 분포",
        description: "평평한 테이블에 화면을 위로 두고 놓았을 때, Z축은 약 ~9.8 m/s²(1g)를 나타내고 X축과 Y축은 0 m/s² 근처를 유지해야 합니다."
      },
      {
        label: "기울기에 따른 축 반응",
        description: "기기를 좌우로 기울이면 X축 값이, 앞뒤로 기울이면 Y축 값이 부드럽게 변합니다."
      },
      {
        label: "급격한 움직임 스파이크",
        description: "기기를 빠르게 흔들거나 움직이면 실시간 반응 그래프에 순간적인 가속도 스파이크가 나타납니다."
      },
      {
        label: "센서 권한 상태",
        description: "iOS Safari에서는 모션 데이터에 접근하기 위해 사용자의 명시적인 권한 승인이 필요합니다."
      }
    ],
    canObserve: [
      "중력 포함 및 미포함 X, Y, Z축 가속도(m/s² 단위)",
      "브라우저에서 지원하는 센서 보고 주기(밀리초 간격)",
      "중력 정렬에 반응하는 대화형 타깃 조준선(레티클)"
    ],
    cannotMeasure: [
      "공장 출하 시 보정된 센서 편차 또는 정밀 실험실급 제로점 드리프트",
      "MEMS 실리콘 센서 칩의 내부 물리적 미세 결함",
      "기기의 절대 지리적 위치 또는 GPS 좌표"
    ],
    interpretation: "정상 가속도계는 아래를 향하는 축에 안정적인 ~9.8 m/s² 중력 가속도를 기록합니다. 센서 값이 멈추거나 0으로 고정되면 권한 차단 또는 센서 캘리브레이션 오류를 점검해야 합니다.",
    nextSteps: {
      text: "센서 값이 변하지 않거나 0에 멈춰 있나요? 센서 문제 해결 가이드를 확인하세요.",
      actionLabel: "센서 문제 해결 가이드",
      actionHref: "/knowledge-base/troubleshooting"
    }
  },

  "gyroscope-test": {
    overview: "자이로스코프 테스트는 DeviceOrientationEvent API를 통해 Alpha(요/Z축), Beta(피치/X축), Gamma(롤/Y축) 3축의 각속도와 회전 자세를 측정합니다. 실시간 인공 수평선과 3D 구형 모델로 회전 상태를 검증합니다.",
    whatToLookFor: [
      {
        label: "인공 수평선 정렬",
        description: "기기를 좌우로 기울이면 수평선이 부드럽게 기울어지고, 앞뒤로 기울이면 위아래로 승강해야 합니다."
      },
      {
        label: "피치 각도 (Beta: -180° ~ 180°)",
        description: "기기를 앞뒤로 기울일 때 끊김이나 반전 없이 피치 각도가 비례하여 변하는지 확인합니다."
      },
      {
        label: "롤 각도 (Gamma: -90° ~ 90°)",
        description: "기기를 좌우 측면으로 기울이면 롤 각도가 지연 없이 정확하게 갱신됩니다."
      },
      {
        label: "나침반 방위각 (Alpha: 0° ~ 360°)",
        description: "기기를 수평으로 회전시키면 하드웨어 지원 기기에서 나침반 방위각을 정확히 추적합니다."
      }
    ],
    canObserve: [
      "브라우저에서 전달되는 회전 각도(Alpha, Beta, Gamma, 도 단위)",
      "시각적 인공 수평선 자세 지시계 및 3D 회전 프리뷰",
      "절대 방위 추적과 상대 모션 추적 상태 식별"
    ],
    cannotMeasure: [
      "지속 관찰 없는 MEMS 자이로스코프의 열 드리프트 비율",
      "브라우저 이벤트 루프(통상 60Hz) 이상의 초고속 내부 칩 샘플링 속도",
      "지자기 센서가 없는 기기에서의 전자기 간섭 자동 보정"
    ],
    interpretation: "자이로는 각속도를 적분하여 자세를 측정합니다. 정지 상태에서 미세한 드리프트는 정상이지만, 값이 튀거나 고정되는 것은 센서 오류 또는 시스템 권한 거부를 의미합니다.",
    nextSteps: {
      text: "기울기가 반응하지 않거나 반대로 움직이나요? 모바일 센서 권한을 확인하세요.",
      actionLabel: "센서 문제 해결 가이드",
      actionHref: "/knowledge-base/troubleshooting"
    }
  },

  "vibration-test": {
    overview: "진동 테스트는 HTML5 Vibration API(navigator.vibrate)를 사용하여 기기의 햅틱 진동 모터를 직접 작동시킵니다. 단일 펄스, 리듬 패턴 및 연속 진동 시퀀스의 응답성을 검증합니다.",
    whatToLookFor: [
      {
        label: "단일 펄스 응답성",
        description: "200ms 또는 500ms 테스트 펄스를 눌렀을 때 기기 본체에서 즉각적이고 또렷한 진동 피드백이 발생하는지 확인합니다."
      },
      {
        label: "리듬 패턴과 정지 간격",
        description: "SOS 또는 심장박동 패턴 시 진동 사이의 정지 구간이 모터 딜레이 없이 깔끔하게 구분되는지 점검합니다."
      },
      {
        label: "모터 세기 균일성 및 잡음",
        description: "진동 강도가 일정하게 유지되며 본체 내부에서 비정상적인 덜컥거림이나 긁히는 소리가 없는지 확인합니다."
      },
      {
        label: "브라우저 및 OS 지원 여부",
        description: "Vibration API는 Android Chrome/Firefox에서 지원되지만, Apple iOS Safari에서는 보안 정책상 비활성화되어 있습니다."
      }
    ],
    canObserve: [
      "밀리초 단위의 Vibration API 명령(단일 펄스 및 배열 패턴) 직접 실행",
      "navigator.vibrate 브라우저 지원 여부 및 사용자 터치 액션 감지",
      "진동 시퀀스와 완벽하게 동기화된 대화형 시각 애니메이션"
    ],
    cannotMeasure: [
      "햅틱 액추에이터의 진동수(Hz) 또는 모터 회전수(RPM)",
      "외부 측정기 없는 기계적 가속도 힘(G-포스)",
      "편심 모터(ERM)와 리니어 액추에이터(LRA) 간의 물리적 하드웨어 구분"
    ],
    interpretation: "Android에서 진동이 작동하지 않으면 기기 설정의 소리 및 진동 항목에서 햅틱 피드백이 켜져 있는지, 절전 모드가 해제되어 있는지 확인하세요. iOS 브라우저에서는 진동 API가 지원되지 않습니다.",
    nextSteps: {
      text: "버튼을 눌러도 폰이 진동하지 않나요? 진동 문제 해결 가이드를 확인하세요.",
      actionLabel: "진동 문제 해결 가이드",
      actionHref: "/knowledge-base/troubleshooting"
    }
  },

  "microphone-test": {
    overview: "마이크 테스트는 WebRTC getUserMedia 및 Web Audio API를 통해 마이크 입력 오디오를 실시간 캡처합니다. 오실로스코프 파형, 주파수 스펙트럼, 입력 볼륨 미터, 루프백 재생을 제공하여 마이크 상태를 종합 진단합니다.",
    whatToLookFor: [
      {
        label: "실시간 입력 레벨 미터 반응",
        description: "마이크에 대고 말할 때 녹색 VU 미터가 부드럽게 상승해야 합니다. 일반 대화 음량은 40%~75%가 적정합니다."
      },
      {
        label: "음 왜곡 및 클리핑 방지",
        description: "큰 소리를 낼 때 미터가 빨간색 경고 구간을 초과하여 디지털 클리핑 및 찢어지는 소리가 나지 않는지 확인합니다."
      },
      {
        label: "파형 및 주파수 바의 다이내믹 반응",
        description: "음성의 음높이와 음량 변화에 따라 오실로스코프 파형과 주파수 스펙트럼 바가 역동적으로 반응하는지 봅니다."
      },
      {
        label: "루프백 녹음 재생 선명도",
        description: "5초 동안 테스트 음성을 녹음한 후 재생하여 배경 잡음, 지직거림, 하울링, 로봇 목소리 왜곡이 없는지 청취합니다."
      }
    ],
    canObserve: [
      "Web Audio AnalyserNode를 통한 실시간 오디오 파형 및 주파수 스펙트럼",
      "외부 서버 전송 없이 브라우저 내부에서 100% 로컬로 계산되는 RMS 볼륨 레벨",
      "개인정보가 안전하게 보호되는 로컬 테스트 녹음 및 즉각적인 루프백 청취"
    ],
    cannotMeasure: [
      "측정용 마이크 없는 정밀 음압 레벨(dB SPL)",
      "마이크 캡슐의 물리적 지향 특성(단일지향성, 무지향성, 양지향성)",
      "A/D 변환 전 순수 아날로그 프리앰프 잡음 레벨(EIN)"
    ],
    interpretation: "정상적인 마이크는 낮은 배경 노이즈와 함께 또렷한 음성을 녹음합니다. 소리가 너무 작으면 OS 입력 게인을 확인하고, 심한 잡음은 3.5mm 잭의 접촉 불량이나 드라이버 샘플레이트 불일치를 확인하세요.",
    nextSteps: {
      text: "마이크가 소리를 인식하지 못하거나 음질이 왜곡되나요? 마이크 문제 해결 가이드를 확인하세요.",
      actionLabel: "마이크 문제 해결 가이드",
      actionHref: "/knowledge-base/troubleshooting#mic-not-working"
    }
  },
  "pixel-inversion-test": {
    "overview": "Pixel inversion (also known as VCOM balance or pixel walk) is the technique LCD panels use to prevent liquid crystal degradation. To avoid permanent electrolytic damage from constant DC voltage bias, panels invert the electrical polarity of subpixels every refresh frame (+V then -V). If the common electrode reference voltage (VCOM) is slightly off-balance, positive and negative polarities produce unequal brightness, causing subtle high-frequency flicker or crawling shimmer across fine patterns.",
    "whatToLookFor": [
      {
        "label": "Shimmering or Crawling Patterns",
        "description": "Observe the 1x1 dot, 2x2 check, and stripe patterns from your normal viewing distance. A well-calibrated VCOM will appear as calm, steady neutral gray with no visible vibration."
      },
      {
        "label": "High-Frequency Flicker",
        "description": "If the screen seems to vibrate or flicker rapidly at 30Hz or 60Hz when viewing dot inversion or subpixel grids, your panel's VCOM balance is asymmetric."
      },
      {
        "label": "Subpixel Inversion Balance",
        "description": "Check the RGB micro-mesh pattern. Mismatched subpixel inversion can produce subtle green/magenta color tint shifts across checkerboards."
      },
      {
        "label": "Reading Jitter (Text-Phase)",
        "description": "The text-phase grid simulates black text on white backgrounds. Inversion flaws here appear as slight edge vibrations around fine text."
      }
    ],
    "canObserve": [
      "Visual detection of VCOM asymmetry and polarity balancing errors",
      "Identification of inversion architecture (dot inversion, column inversion, row inversion)",
      "High-frequency pixel walk flicker across calibrated test grids"
    ],
    "cannotMeasure": [
      "Exact millivolt hardware VCOM bias potentiometer setting",
      "Direct liquid crystal physical response times or decay curves",
      "Subpixel physical voltage waveforms without an oscilloscope"
    ],
    "interpretation": "Slight pixel walk is normal on many high-refresh gaming panels due to fast overdrive tuning. Severe flicker indicates a factory calibration flaw or aging power circuitry.",
    "nextSteps": {
      "text": "Notice excessive flicker? Inspect overall panel uniformity and refresh rate stability.",
      "actionLabel": "Run Uniformity Test",
      "actionHref": "/tests/uniformity-test"
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
};

