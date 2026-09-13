import { InspectionWorkflow } from "./types";

export const KO_INSPECTION_WORKFLOWS: InspectionWorkflow[] = [
  {
    "id": "general",
    "route": "/monitor-inspection/general",
    "title": "일반 디스플레이 점검",
    "shortDescription": "모든 화면을 위한 필수적인 전방위 시각 점검.",
    "longDescription": "데스크톱 모니터, 노트북 액정, 외장 디스플레이를 대상으로 불량 화소, 색 정확도, 밝기, 명암비, 균일도 및 주사율을 종합적으로 검사하도록 설계된 균형 잡힌 필수 진단 과정입니다.",
    "inspectionTip": "점검을 시작하기 전에 디스플레이를 권장 네이티브 해상도와 배율로 설정하십시오.",
    "browserLimitations": "웹 브라우저 테스트는 클라이언트가 렌더링한 패턴을 평가하며, 내부 파워 서플라이의 전압 안정성이나 물리 포트 접촉 상태를 직접 계측할 수는 없습니다.",
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
        "title": "해상도 및 디스플레이 정보",
        "description": "네이티브 해상도, 장치 픽셀 비율(DPR) 및 표시 사양 확인."
      },
      {
        "title": "불량 화소 탐색기",
        "description": "원색 단색 화면을 순회하며 꺼진 화소(흑점)나 켜진 화소(광점)를 탐색."
      },
      {
        "title": "화면 균일도",
        "description": "중성 회색과 단색 화면에서 빛 얼룩, 비네팅, 멍 현상을 점검."
      },
      {
        "title": "암부 근처(Near-Black) 디테일",
        "description": "완전한 블랙에 가까운 미세 어두운 톤의 분리력과 암부 계조를 테스트."
      },
      {
        "title": "그라데이션 및 밴딩",
        "description": "블랙에서 화이트로 이어지는 계조 이행에서 줄무늬(밴딩)가 없는지 확인."
      },
      {
        "title": "텍스트 선명도 및 서브픽셀",
        "description": "다양한 글꼴 크기에서 안티앨리어싱과 글자 외곽선의 또렷함을 평가."
      },
      {
        "title": "스케일링 및 화면비",
        "description": "기하학적 정원과 격자 패턴에서 화면 늘어남이나 찌그러짐을 확인."
      },
      {
        "title": "잔상(고스팅) 및 모션 트레일",
        "description": "움직이는 고대비 블록을 관찰하여 픽셀 응답 속도를 점검."
      },
      {
        "title": "주사율 및 프레임 타이밍",
        "description": "브라우저 애니메이션 타이밍과 패널의 공칭 주사율을 동기화 검증."
      }
    ]
  },
  {
    "id": "used",
    "route": "/monitor-inspection/used",
    "title": "중고 모니터 점검",
    "shortDescription": "구매 전후 불량 확인에 최적화된 메모 및 결과 보고서 출력 10단계 집중 점검.",
    "longDescription": "중고 거래나 리퍼비시 모니터 구입 시 상태를 평가하기 위해 고안된 엄격한 검증 절차입니다. 하드웨어 사양, 화소 결함, 백라이트 노화, 색감, 잔상을 체계적으로 확인하고 결과를 보고서로 저장합니다.",
    "inspectionTip": "중고 기기를 점검할 때는 밝기를 100%로 올려 숨은 번인 자국, 불균일한 백라이트 노화, 베젤 압박 손상을 분명하게 드러나게 하십시오.",
    "browserLimitations": "총 사용 시간과 내부 온도 센서 확인은 모니터 본체 버튼을 이용해 제조사 공장 서비스 메뉴에 진입해야 합니다.",
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
        "title": "1. 디스플레이 사양 정보",
        "description": "브라우저가 인식하는 해상도, 색 심도, 그래픽 하드웨어 특성을 조회."
      },
      {
        "title": "2. 해상도 및 기하학적 정렬",
        "description": "권장 네이티브 해상도, 스케일링 비율, 유효 뷰포트를 검증."
      },
      {
        "title": "3. 데드 픽셀 (흑점)",
        "description": "화이트 및 원색 화면을 스캔하여 완전히 꺼진 불량 서브픽셀을 탐색."
      },
      {
        "title": "4. 스턱 픽셀 (광점)",
        "description": "어두운 화면에서 항상 켜져 있는 원색 서브픽셀을 검사."
      },
      {
        "title": "5. 색상 재현력",
        "description": "RGB 원색 및 CMY 보색 화면에서 채널 열화나 색 틀어짐을 확인."
      },
      {
        "title": "6. 밝기 및 암부 분리",
        "description": "백라이트가 충분한 밝기를 내며 암부 계조를 뭉개지 않는지 확인."
      },
      {
        "title": "7. 화면 균일도",
        "description": "25%, 50%, 75% 회색 화면에서 패널 황변, 모서리 광량 저하를 점검."
      },
      {
        "title": "8. 빛샘 및 베젤 압박",
        "description": "암실에서 베젤 조립 압박으로 인한 테두리 빛샘 누출을 점검."
      },
      {
        "title": "9. 잔상 및 응답 성능",
        "description": "화면 움직임 시 잔상 꼬리 끌림과 오버드라이브 동작을 평가."
      },
      {
        "title": "10. 주사율 안정성",
        "description": "모니터가 마이크로 스터터링 없이 스펙 주사율로 구동되는지 확인."
      },
      {
        "title": "11. 점검 소견 메모",
        "description": "외관 스크래치, 포트 상태, 육안 관찰 소견을 보고서에 기록."
      },
      {
        "title": "12. 최종 모니터 점검 보고서",
        "description": "모든 점검 결과를 정리한 인쇄 및 내보내기 가능한 진단서 생성."
      }
    ]
  },
  {
    "id": "gaming",
    "route": "/monitor-inspection/gaming",
    "title": "게이밍 디스플레이 점검",
    "shortDescription": "주사율, 고스팅, 오버드라이브, 티어링, 블랙 스미어링, HDR, 반응성을 종합 검증.",
    "longDescription": "고주사율(120Hz, 144Hz, 240Hz, 360Hz 이상) 게이밍 모니터 전용으로 설계된 검증 과정입니다. 주사율 동기화, 잔상, 오버드라이브 역잔상(오버슈트), 화면 찢어짐, VA 블랙 스미어링, HDR 반응성을 집중 평가합니다.",
    "inspectionTip": "역잔상(하얀색 테두리 번짐)을 감지하려면 최고 주사율에서 오버드라이브를 먼저 '보통'으로 두고 테스트한 후 '매우 빠름/익스트림'을 비교하십시오.",
    "browserLimitations": "가변 주사율(G-Sync / FreeSync)의 동적 프레임 페이싱 한계 테스트는 DirectX/Vulkan 네이티브 게임 실행이 필요합니다.",
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
        "title": "VRR 및 어댑티브 싱크 점검",
        "description": "프레임레이트 변동 시 화면 떨림과 동기화 유지력을 관찰."
      },
      {
        "title": "화면 티어링 및 V-Sync",
        "description": "고속 횡이동 시 수평 찢어짐 현상을 스트레스 테스트."
      },
      {
        "title": "실제 주사율 측정",
        "description": "requestAnimationFrame을 통해 패널의 실제 렌더링 프레임레이트를 확인."
      },
      {
        "title": "고스팅, 오버드라이브, 블랙 스미어링",
        "description": "픽셀 응답 속도, 역잔상 하얀 테두리, VA 특유의 어두운 잔상을 평가."
      },
      {
        "title": "HDR 시각적 렌더링",
        "description": "하이라이트 밝기, 밝은 영역 디테일 날아감(클리핑), 광색역 표현을 확인."
      },
      {
        "title": "텍스트 및 인게임 HUD 선명도",
        "description": "게임 내 미세 글씨와 인터페이스 요소의 가독성을 평가."
      }
    ]
  },
  {
    "id": "oled",
    "route": "/monitor-inspection/oled",
    "title": "OLED 디스플레이 점검",
    "shortDescription": "암부 계조, 균일도, 밴딩, 잔상, 번인, HDR, 모션 선명도를 정밀 점검.",
    "longDescription": "자발광 OLED, QD-OLED, WOLED 패널 전용 진단 절차입니다. 암부 근처 계조 표현, 수직 밴딩, 패널 균일도, 일시적 잔상 대 영구 번인 식별, HDR 명암비, 움직임 선명도를 다각도로 검사합니다.",
    "inspectionTip": "주변 반사를 완전히 차단하기 위해 암실에서 어두운 회색 패턴(1%, 2%, 5% 그레이)을 띄우고 OLED 특유의 수직 밴딩을 관찰하십시오.",
    "browserLimitations": "OLED의 자동 밝기 제한(ABL)으로 인해 넓은 흰색 브라우저 창은 자동으로 어두워지며, 영구 번인의 정량 계측은 분광 휘도계가 필요합니다.",
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
        "title": "니어 블랙 및 암부 디테일",
        "description": "0.25%에서 5%의 극저조도 단계를 점검하여 OLED 소자의 점등 특성과 암부 표현력 확인."
      },
      {
        "title": "휘도 및 암부 균일성",
        "description": "5%, 20%, 50% 회색 화면에서 세로줄 밴딩이나 밝기 얼룩을 검사."
      },
      {
        "title": "HDR 및 피크 하이라이트",
        "description": "ABL 클리핑 없이 광색역과 최고 밝기가 자연스럽게 표현되는지 확인."
      },
      {
        "title": "글씨 렌더링 및 서브픽셀 구조",
        "description": "RGB/WRGB/QD-OLED 서브픽셀 배열에 따른 폰트 테두리 색 번짐(프린징)을 점검."
      },
      {
        "title": "샘플 앤 홀드 모션 선명도",
        "description": "OLED 소자의 즉각적인 응답과 인간 시선의 홀드 잔상 지각을 관찰."
      },
      {
        "title": "화소 탈락 및 번인 확인",
        "description": "단색 원색 화면을 둘러보며 꺼진 소자나 고정 UI의 영구 잔상을 점검."
      }
    ]
  },
  {
    "id": "laptop",
    "route": "/monitor-inspection/laptop",
    "title": "노트북 디스플레이 점검",
    "shortDescription": "해상도, 밝기, 균일도, 색감, 폰트 렌더링, 주사율, HDR을 종합 검사.",
    "longDescription": "노트북 내장 디스플레이(MacBook Retina, Windows 울트라북, 게이밍 노트북) 전용 점검 절차입니다. 고DPI 배율, 최대 밝기 여유, 패널 균일도, 색감 왜곡, ClearType 글자 선명도를 확인합니다.",
    "inspectionTip": "배터리 절전 모드가 화면 밝기를 자동으로 낮추지 않도록 노트북을 전원 어댑터에 연결하고 자동 밝기 조절 기능을 끈 상태에서 점검하십시오.",
    "browserLimitations": "색역 커버리지(예: 100% sRGB 또는 DCI-P3) 수치의 정확한 측정은 하드웨어 캘리브레이터 계측이 필요합니다.",
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
        "title": "해상도 및 고DPI 배율",
        "description": "논리 뷰포트 배율, 장치 픽셀 비율(DPR), 패널 네이티브 해상도 확인."
      },
      {
        "title": "밝기 및 다이내믹 레인지",
        "description": "야외/실내 사용을 위한 최대 휘도 출력과 암부 구분력을 확인."
      },
      {
        "title": "화면 균일도 및 베젤 압박",
        "description": "베젤 조립 눌림 흔적, 테두리 빛샘, 모서리 어두워짐을 확인."
      },
      {
        "title": "색감의 생생함과 균질성",
        "description": "원색 및 보색 단색 화면에서 패널 전역의 색상 일관성을 확인."
      },
      {
        "title": "텍스트 렌더링 및 서브픽셀",
        "description": "8px~24px 글자 크기에서 폰트 안티앨리어싱(ClearType)의 외곽선을 검사."
      },
      {
        "title": "주사율 정상 동작 확인",
        "description": "고주사율(90Hz, 120Hz ProMotion, 144Hz 등)이 올바르게 적용되었는지 확인."
      },
      {
        "title": "HDR 및 광색역 (지원 패널)",
        "description": "지원 노트북 패널에서 HDR 모드와 광색역 표현력을 검증."
      }
    ]
  },
  {
    "id": "new",
    "route": "/monitor-inspection/new",
    "title": "신품 모니터 초기 점검",
    "shortDescription": "초기 불량 점검 및 구매처 반품/교환 기간 내 필수 확인 체크리스트.",
    "longDescription": "새로 구입한 외장 모니터를 개봉한 직후 초기 조립 결함, 화소 불량, 백라이트 빛샘, 패널 전반의 성능을 확인하여 반품 기간 내에 문제를 발견할 수 있도록 돕는 전체 점검표입니다.",
    "inspectionTip": "패널 마감, 반사, 미세 흠집을 확인하는 밝은 방과 빛샘 및 IPS 글로우를 확인하는 완전한 암실 두 환경 모두에서 점검하십시오.",
    "browserLimitations": "물리적 단자(DisplayPort, HDMI, USB-C PD)나 G-Sync 전용 모듈은 브라우저로 측정할 수 없으므로 케이블 연결 테스트도 수동으로 병행하십시오.",
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
        "title": "디스플레이 해상도 및 기본 사양",
        "description": "네이티브 해상도, 장치 픽셀 비율, OS가 감지한 주사율을 확인."
      },
      {
        "title": "텍스트 선명도 및 윤곽선",
        "description": "폰트 렌더링과 샤프니스 설정에 인위적 노이즈가 없는지 확인."
      },
      {
        "title": "데드 픽셀 (흑점) 확인",
        "description": "원색 화면을 둘러보며 불이 들어오지 않는 검은 결함 화소를 탐색."
      },
      {
        "title": "스턱 픽셀 (광점) 확인",
        "description": "꺼지지 않고 계속 켜져 있는 원색 서브픽셀을 확인."
      },
      {
        "title": "단색 화면 균일도",
        "description": "빨강, 초록, 파랑, 시안, 마젠타, 노랑 전면 화면에서 색 균일성을 확인."
      },
      {
        "title": "그레이스케일 계조 표현",
        "description": "0%부터 100% 휘도까지 계조 이행이 끊김 없이 부드러운지 확인."
      },
      {
        "title": "밝기 및 다이내믹 레인지",
        "description": "완전한 블랙부터 화이트까지 명암 단계가 분명히 구별되는지 확인."
      },
      {
        "title": "명암비 계조 단계",
        "description": "단계별 명암비 기준 사각 패치의 경계선 구분을 확인."
      },
      {
        "title": "블랙 레벨 클리핑 (암부 뭉개짐)",
        "description": "어두운 그림자가 칠흑 같은 어둠 속에 묻히지 않도록 블랙 레벨 조절."
      },
      {
        "title": "화이트 레벨 클리핑 (명부 날아감)",
        "description": "밝은 하이라이트가 하얗게 타버려 디테일을 잃지 않도록 대비 조절."
      },
      {
        "title": "화면 휘도 균일도",
        "description": "회색 화면에서 얼룩덜룩한 멍, 비네팅, 더티 스크린 현상(DSE)을 확인."
      },
      {
        "title": "빛샘 및 IPS 글로우",
        "description": "암실에서 베젤 틈새의 하드웨어 빛샘과 각도에 따른 IPS 글로우를 구별."
      },
      {
        "title": "고스팅 및 픽셀 응답 속도",
        "description": "고대비 움직이는 물체를 관찰하여 꼬리 끌림이나 잔상을 판별."
      },
      {
        "title": "주사율 및 프레임 타이밍",
        "description": "브라우저 requestAnimationFrame 타이밍이 모니터 스펙과 일치하는지 확인."
      },
      {
        "title": "HDR 및 광색역 지원 여부",
        "description": "지원 모델에서 Windows HDR 기능 활성화 및 DCI-P3 지원 상태를 확인."
      }
    ]
  },
  {
    "id": "tv",
    "route": "/monitor-inspection/tv",
    "title": "TV 디스플레이 점검",
    "shortDescription": "HDMI로 연결된 거실 TV의 화질, 로컬 디밍, 표시 성능을 점검.",
    "longDescription": "HDMI로 PC에 연결된 거실 TV나 대형 디스플레이를 위한 전용 테스트입니다. 로컬 디밍 빛 번짐(블루밍), 더티 스크린 효과(DSE), 24p 저더 현상, 오버스캔 잘림, HDR 처리를 점검합니다.",
    "inspectionTip": "TV 화면 모드를 'PC', '게임' 또는 'Filmmaker'로 바꾸고 화면 비율을 '화면 맞춤' / '1:1'로 설정하여 인위적인 윤곽 강조와 가장자리 잘림을 끄십시오.",
    "browserLimitations": "모션 보간(일명 드라마 효과 / 비누 인형 효과)과 같은 TV 자체 화질 엔진은 TV 리모컨의 설정 메뉴에서 직접 조작해야 합니다.",
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
        "title": "HDR 시각적 검사",
        "description": "고명암비 하이라이트 표현과 광색역 색상 재현력을 점검."
      },
      {
        "title": "니어 블랙 암부 디테일",
        "description": "HDMI 블랙 레벨을 맞춰 암부 디테일이 뭉개지거나 블랙이 뜨지 않도록 확인."
      },
      {
        "title": "균일도 및 더티 스크린 효과 (DSE)",
        "description": "회색 화면을 둘러보며 대형 패널에서 흔한 세로줄 밴딩이나 어두운 얼룩을 확인."
      },
      {
        "title": "TV 오버스캔 및 1:1 픽셀 매핑",
        "description": "화면 가장자리 픽셀이 TV 밖으로 잘려 나가지 않고 4K/1080p 전체가 나오는지 확인."
      },
      {
        "title": "화면비 및 기하학적 정렬",
        "description": "원형 및 사각형 패턴이 올바른 가로세로 비율을 유지하는지 확인."
      },
      {
        "title": "거실 시청 각도",
        "description": "소파 모서리나 측면 시청 위치에서의 색상 바램과 명암비 저하를 평가."
      }
    ]
  }
];
