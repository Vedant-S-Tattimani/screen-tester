import { KnowledgeArticle } from "./types";

export const KO_KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    "slug": "resolution-and-scaling",
    "category": "display-basics",
    "title": "모니터 해상도, 화면비 및 운영체제 디스플레이 스케일링",
    "subtitle": "물리적 픽셀, 논리적 뷰포트, DPI 스케일링 및 1:1 픽셀 매칭의 이해.",
    "description": "화면 해상도, 화면비 및 운영체제 배율 설정이 텍스트 가독성과 1:1 원시 픽셀 렌더링에 미치는 영향을 설명합니다.",
    "directAnswer": "디스플레이 해상도는 가로 및 세로의 물리적 픽셀 배열을 뜻하며, OS 스케일링은 고밀도(고PPI) 환경에서 UI 가독성을 유지하는 배율 기능입니다.",
    "whyItMatters": "비원시 해상도를 사용하거나 최적화되지 않은 배율을 적용하면 디지털 픽셀이 물리적 화소와 1:1로 일치하지 않아 글자가 흐려집니다.",
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
    "primarySearchIntent": "모니터 해상도 배율 스케일링 화면비 텍스트 가독성",
    "readingTimeMinutes": 5
  },
  {
    "slug": "refresh-rate-and-frame-rates",
    "category": "display-basics",
    "title": "다중 모니터 설정: 주사율 불일치, DPI 배율 및 끊김(스터터링) 해결 가이드",
    "subtitle": "주사율 차이, 컴포지터 프레임 페이싱, 운영체제 디스플레이 배율, 다중 화면 모션 부드러움의 이해.",
    "description": "서로 다른 주사율(60Hz, 144Hz, 165Hz)과 DPI 배율을 가진 다중 모니터 환경에서 발생하는 화면 끊김(스터터링)의 원인과 해결 방법을 알아봅니다.",
    "directAnswer": "다중 모니터 환경에서 나타나는 화면 끊김이나 스케일링 오류는 운영체제 데스크톱 컴포지터, 그래픽 드라이버, 애플리케이션 렌더링 엔진이 서로 다른 주사율과 분수 형태의 DPI 배율을 여러 디스플레이에 걸쳐 원활하게 동기화하지 못할 때 발생합니다.",
    "whyItMatters": "고주사율 게이밍 모니터 옆에 일반 60Hz 모니터를 두거나 노트북에 외장 4K 모니터를 연결하는 구성은 매우 흔합니다. 하지만 화면 간 주사율, 픽셀 밀도, 색 공간이 다르면 마우스 커서 끊김, 동영상 재생 시 떨림(저더), 텍스트 번짐 등이 발생할 수 있습니다. 이를 해결하려면 모니터 하드웨어, 드라이버, 운영체제 컴포지터, 애플리케이션 렌더링 중 어디에서 병목이 생기는지 단계별로 격리 진단해야 합니다.",
    "whatToLookFor": [
      "고주사율 기본 모니터에서 보조 모니터로 마우스 커서를 이동할 때 느껴지는 끊김과 둔탁한 움직임",
      "한쪽 화면에서 동영상을 재생할 때 다른 화면에서 스크롤하거나 작업하면 나타나는 프레임 드롭",
      "서로 다른 배율의 모니터 사이로 창을 끌어 옮길 때 창 크기가 갑자기 튀거나 글씨가 흐려지는 현상",
      "보조 모니터가 연결되어 있을 때 창 모드 게임이나 브라우저 애니메이션에서 발생하는 미세 끊김(마이크로 스터터)",
      "다중 화면 환경에서 각 모니터마다 다르게 체감되는 브라우저 스크롤 부드러움 차이",
      "절전 모드 해제 후 모니터 주사율이나 해상도가 의도치 않게 낮은 수치로 초기화되는 현상"
    ],
    "howToTest": [
      "Screen Tester의 [주사율 측정 테스트](/tests/refresh-rate-test)를 열고 각 모니터에서 개별적으로 프레임 페이싱 간격을 관찰합니다.",
      "[주사율 측정 테스트](/tests/refresh-rate-test) 창을 두 모니터의 경계면에 걸치거나 이동시키며 프레임 공급이 매끄럽게 적응하는지 확인합니다.",
      "[VRR(가변 주사율) 테스트](/tests/vrr-test)를 실행하여 다중 화면 환경에서 티어링이나 프레임 끊김이 발생하는지 시각적으로 점검합니다.",
      "[텍스트 선명도 테스트](/tests/text-clarity-test)를 통해 배율이 다른 화면 간 글꼴 렌더링 상태를 평가합니다.",
      "[모션 블러 테스트](/tests/motion-blur-test) 및 [고스팅 테스트](/tests/ghosting-test)로 두 모니터의 잔상과 응답 특성을 비교합니다.",
      "[디스플레이 정보](/tests/display-info)에서 브라우저가 인식한 해상도 및 디바이스 픽셀 비율(DPR)을 확인합니다.",
      "[브라우저 호환성 검사](/tools/browser-compatibility)를 통해 하드웨어 가속 및 화면 관련 API 지원 상태를 점검합니다.",
      "모니터가 기본 주사율에 계속 묶여 있다면 대화형 [문제 해결 가이드](/knowledge-base/troubleshooting)를 참조하십시오."
    ],
    "whatScreenTesterCanObserve": [
      "활성 화면에서 `requestAnimationFrame`을 통한 브라우저 계층 애니메이션 콜백 타임스탬프",
      "브라우저 프레임 전달 간격의 통계적 표준편차(마이크로 스터터 및 프레임 드롭 검출)",
      "브라우저가 보고한 Device Pixel Ratio (`window.devicePixelRatio`) 및 화면별 CSS 뷰포트 기하학",
      "AC 전원 및 배터리 작동 상태 간 동작 매끄러움, 진자 주기 및 스크롤 반응성의 시각적 비교",
      "다중 화면 창 배치 및 디스플레이 열거를 위한 최신 브라우저 API 지원 현황"
    ],
    "whatScreenTesterCannotDetermine": [
      "DisplayPort/HDMI 케이블 상의 물리적 패널 주사선 타이밍 및 클록 발진기 동기화 신호",
      "내부 하드웨어 전원 레일 전압, ACPI 배터리 충전 원격 측정값 및 발열 스로틀링 한계치",
      "GPU 동작 클록 상태(P-states/D-states), 내부 MUX 스위치 물리적 위치 및 PCIe ASPM 전력 상태",
      "운영체제 데스크톱 윈도우 관리자(DWM, Wayland, Quartz) 내부 버퍼 스왑 스케줄",
      "운영체제 배율 설정을 배제한 모니터의 실제 물리적 DPI 및 패널 픽셀 밀도"
    ],
    "commonCauses": [
      "운영체제 창 관리자가 서로 다른 주사율 간 독립적인 화면 프레젠테이션 주기를 원활히 조정하지 못함",
      "보조 모니터에서 하드웨어 가속 동영상 재생 시 GPU 프레젠테이션 스레드가 해당 주사율로 고정됨",
      "분수 DPI 배율 불일치(예: 1440p의 100%와 4K의 150%)로 인해 구형 앱이 비트맵으로 확대되어 흐려짐",
      "창 모드 가변 주사율(G-Sync/FreeSync)이 보조 화면의 백그라운드 앱 애니메이션과 충돌함",
      "모니터 간 타이밍 규격 차이로 인해 GPU 메모리 클럭이 최고 상태로 묶이거나 불안정하게 요동침",
      "노트북 하이브리드 그래픽 구조에서 외장 디스플레이 신호가 내장 GPU 버퍼를 거치며 병목 발생"
    ],
    "whatToDoNext": [
      "운영체제 고급 디스플레이 설정에서 각 모니터가 사양에 맞는 최고 주사율로 설정되어 있는지 확인합니다.",
      "주사율 혼용 환경에서 끊김이 지속된다면 보조 모니터를 기본 모니터의 정수 배율 주사율로 구동해 봅니다.",
      "가능하면 디스플레이 배율을 통일하거나 구형 소프트웨어의 경우 속성에서 고DPI 호환성 설정을 조정합니다.",
      "그래픽 드라이버 설정에서 G-Sync/FreeSync를 '창 모드 및 전체 화면' 대신 '전체 화면 전용'으로 전환해 봅니다.",
      "보조 모니터를 잠시 연결 해제하여 끊김 현상이 단일 모니터 문제인지 다중 모니터 문제인지 구분합니다."
    ],
    "sections": [
      {
        "title": "주사율이 다른 다중 모니터 환경에서 움직임이 달라지는 이유",
        "content": [
          "144Hz, 165Hz, 240Hz 등의 고주사율 게이밍 모니터에 60Hz나 75Hz의 일반 보조 모니터를 함께 사용하는 것은 대단히 대중적인 구성입니다. 하지만 보조 모니터를 연결한 직후부터 단일 모니터 사용 시에는 없었던 미세한 움직임의 위화감을 느끼는 경우가 많습니다.",
          "대표적인 증상으로는 브라우저 스크롤 시의 덜컥거림, 창 애니메이션의 프레임 누락, 마우스 커서의 불규칙한 움직임, 동영상 재생 시의 잔떨림 등이 있습니다. 중요한 점은 주사율이 다르다는 사실 자체가 하드웨어 고장을 일으키는 것은 아니라는 점입니다. 최신 그래픽 카드와 운영체제는 여러 개의 독립적인 화면 클록을 동시에 출력할 수 있도록 설계되어 있습니다.",
          "실제 움직임이 부드럽게 유지되는지는 운영체제 컴포지터 구조, 그래픽 드라이버 스케줄링, 브라우저 하드웨어 가속, 동영상 렌더링 파이프라인, GPU 전력 상태 관리 등이 복합적으로 작용합니다. 따라서 모니터 자체의 결함으로 단정하기 전에 이러한 소프트웨어 계층 간의 상호작용을 체계적으로 점검해야 합니다."
        ],
        "bullets": [
          "주사율 차이가 자동으로 하드웨어 고장을 일으키지는 않지만, 데스크톱 컴포지터의 처리 부담을 가중시킵니다.",
          "마우스 커서 떨림, 불규칙한 스크롤, 창 프레임 드롭 등의 현상이 나타날 수 있습니다.",
          "전체적인 부드러움은 운영체제, 드라이버, 하드웨어 가속, 화면 타이밍 표준의 조화에 달렸습니다.",
          "브라우저 테스트는 애플리케이션 계층의 프레임 전달을 측정하며, 물리적 패널 주사를 직접 측정하지는 않습니다."
        ]
      },
      {
        "title": "실제 주사율 혼용 환경: 대표적 시나리오와 프레임 프레젠테이션",
        "content": [
          "다중 화면 환경에서 각 디스플레이는 그래픽 카드로부터 독립적인 수직 블랭킹 신호를 받습니다. 60Hz와 144Hz, 60Hz와 165Hz, 120Hz와 144Hz 같은 일반적인 조합에서는 화면 갱신 주기가 일치하지 않습니다. 예를 들어 60Hz 화면은 약 16.67ms마다, 144Hz 화면은 약 6.94ms마다 갱신됩니다.",
          "60Hz 보조 화면에서 동영상이나 애니메이션이 재생되는 동시에 144Hz 기본 화면에서 작업이나 게임을 진행할 때, 운영체제 창 관리자는 두 개의 비동기 프레젠테이션 큐를 처리해야 합니다. 과거 시스템에서는 바탕화면 전체를 가장 낮은 주사율(60 FPS)에 동기화하여 고주사율 모니터까지 제한하는 경우가 잦았습니다.",
          "최신 컴포지터는 각 화면별로 분리된 렌더링 루프를 사용합니다. 그러나 여전히 소프트웨어 레벨의 간섭은 발생할 수 있습니다. 60Hz 화면에서 동영상이 하드웨어 가속으로 디코딩되면 GPU 프레젠테이션 스레드가 일시적으로 묶일 수 있습니다. 각 모니터를 따로 점검하면 소프트웨어적 제약 여부를 확인할 수 있습니다."
        ],
        "bullets": [
          "비대칭 주사율 조합(예: 60Hz + 144Hz)은 서로 다른 시간 간격으로 작동합니다.",
          "데스크톱 컴포지터는 연결된 모니터마다 버퍼를 독립적으로 관리해야 합니다.",
          "보조 화면의 동영상 재생이 GPU 렌더링 스레드를 일시적으로 제약할 수 있습니다.",
          "requestAnimationFrame 기반 측정은 소프트웨어 프레임 타이밍을 평가하는 도구입니다."
        ]
      },
      {
        "title": "다중 모니터의 DPI 스케일링: 분수 배율과 텍스트 선명도",
        "content": [
          "다중 모니터 환경은 화면 크기와 해상도가 완전히 다른 기기를 함께 사용하는 경우가 많습니다. 27인치 4K 모니터(150% 배율) 옆에 24인치 FHD 모니터(100% 배율)를 두거나, 소형 노트북을 대형 외장 모니터에 연결하는 것이 대표적입니다.",
          "서로 다른 배율(100%, 125%, 150%, 200%)이 적용되면, 운영체제는 목표 픽셀 밀도에 맞춰 화면 인터페이스를 개별적으로 계산해야 합니다. 모니터별 DPI 인식 기능을 지원하는 최신 프로그램은 창이 모니터 경계를 넘나들 때 글꼴과 벡터 그래픽을 즉시 선명하게 다시 그립니다.",
          "반면 모니터별 DPI 기능을 지원하지 않는 구형 프로그램은 창을 동적으로 다시 그리지 못합니다. 배율이 다른 모니터로 이동하면 운영체제가 창을 비트맵 이미지처럼 늘려버리기 때문에 글꼴과 아이콘이 흐려집니다. [텍스트 선명도 테스트](/tests/text-clarity-test)를 활용하면 글꼴 번짐이 스케일링 확대 문제인지 서브픽셀 렌더링 문제인지 쉽게 구별할 수 있습니다."
        ],
        "bullets": [
          "혼합 배율 환경에서는 운영체제가 모니터마다 다른 픽셀 밀도를 처리해야 합니다.",
          "최신 앱은 모니터를 옮겨도 벡터와 폰트를 실시간으로 다시 계산하여 선명함을 유지합니다.",
          "구형 프로그램은 운영체제에 의해 비트맵처럼 확대되어 텍스트가 흐려지기 쉽습니다.",
          "창이 배율 경계를 넘는 순간 일시적인 인터페이스 튕김 현상이 발생할 수 있습니다."
        ]
      },
      {
        "title": "해상도, 뷰포트, 스케일링의 상호작용: 디지털 좌표와 물리 패널",
        "content": [
          "다중 모니터의 특성을 정확히 이해하려면 물리적 패널 사양과 소프트웨어적 렌더링 개념을 분리해서 보아야 합니다. 운영체제 배율, 애플리케이션 줌, 브라우저 줌, CSS 픽셀, 물리 서브픽셀은 혼동되기 쉽습니다.",
          "물리 해상도는 모니터 패널에 제조된 미세한 하드웨어 화소 격자(예: 3840 × 2160개의 RGB 서브픽셀)를 의미합니다. 디바이스 픽셀 비율(Device Pixel Ratio, DPR)은 운영체제가 브라우저에 전달하는 배율 계수입니다. 150% 배율이면 DPR은 1.5, 200%면 2.0이 됩니다. 논리 뷰포트(CSS 픽셀)는 웹페이지가 레이아웃을 계산하는 좌표 공간입니다(`window.innerWidth` 등).",
          "Screen Tester는 기술적 투명성을 중시합니다. 웹 브라우저는 표준 API를 통해 뷰포트 치수와 `window.devicePixelRatio`를 신뢰성 있게 보고할 수 있습니다. 그러나 브라우저는 패널의 물리적 화소 간격이나 모니터 내부 스케일러 필터를 광학 장비 없이 직접 측정할 수는 없습니다."
        ],
        "bullets": [
          "물리 해상도: 디스플레이 패널에 고정된 미세한 하드웨어 서브픽셀의 배열.",
          "Device Pixel Ratio(DPR): 운영체제가 브라우저 엔진에 보고하는 화면 스케일링 배율.",
          "CSS 논리 픽셀: 웹 페이지 레이아웃과 폰트 배치에 사용되는 소프트웨어 좌표계.",
          "측정의 한계: 웹 API가 보고하는 것은 소프트웨어 좌표이며 광학적 실측치가 아닙니다."
        ]
      },
      {
        "title": "체계적인 다중 모니터 점검 절차: 단계별 테스트 순서",
        "content": [
          "다중 화면에서 끊김, 커서 지연, 흐린 텍스트가 나타날 때 무작정 설정을 바꾸는 것은 원인 파악을 어렵게 만듭니다. 체계적인 7단계 절차를 권장합니다:",
          "단계 A: 기본 설정 기록. 각 모니터의 기본 해상도, 설정 주사율, 배율 비율, 케이블 종류(DisplayPort/HDMI), HDR 활성화 여부를 기록합니다.",
          "단계 B: 모니터 단독 점검. 보조 모니터를 분리하고 기본 모니터만 연결한 상태에서 [주사율 측정 테스트](/tests/refresh-rate-test)를 실행하여 단일 화면의 부드러움을 확인합니다.",
          "단계 C: 다중 화면 기본 상태 점검. 보조 모니터를 다시 연결하고 다른 프로그램을 띄우지 않은 상태에서 [주사율 측정 테스트](/tests/refresh-rate-test)를 재실행합니다.",
          "단계 D: 화면 간 창 이동 점검. 테스트 창을 두 모니터의 경계면으로 드래그하면서 프레임이 급락하거나 글씨가 흐려지는지 관찰합니다.",
          "단계 E: 스크롤 및 애니메이션 점검. 양쪽 모니터에서 [주사율 측정 테스트](/tests/refresh-rate-test)와 [모션 블러 테스트](/tests/motion-blur-test)를 사용하여 빠른 스크롤 시 부드러움을 비교합니다.",
          "단계 F: 동영상 재생 부하 테스트. 보조 모니터에 동영상을 재생한 상태에서 기본 모니터의 모션 테스트를 진행하여 컴포지터 병목이 발생하는지 확인합니다.",
          "단계 G: 한 번에 한 가지 설정만 변경. 하드웨어 가속 전환이나 주사율 변경 시 한 번에 하나의 변수만 바꾸고 효과를 재확인합니다."
        ],
        "bullets": [
          "단계 A: 해상도, 주사율, 배율, 케이블 종류를 기록해 둡니다.",
          "단계 B: 모니터를 하나씩 단독으로 점검하여 기본 성능을 확인합니다.",
          "단계 C: 두 화면을 연결한 유휴 상태에서 프레임 페이싱을 점검합니다.",
          "단계 D 및 E: 화면을 넘나드는 창 이동 및 스크롤 부드러움을 확인합니다.",
          "단계 F 및 G: 동영상 부하를 가하고 설정을 하나씩 단계적으로 조정합니다."
        ]
      },
      {
        "title": "원인 계층의 분리: 계층별 진단 모델",
        "content": [
          "바탕화면의 끊김은 시스템 구조의 여러 계층에서 비롯될 수 있으므로, 현상을 계층별로 나누어 진단하는 것이 효과적입니다:",
          "1. 디스플레이 및 패널 계층: 모니터 펌웨어 오류, DDC 라인을 통한 EDID 신호 불량, OSD 오버드라이브 설정 부적합. [고스팅 테스트](/tests/ghosting-test)로 점검합니다.",
          "2. 신호 및 케이블 계층: 케이블 대역폭 부족, 구형 변환 젠더, MST 허브의 대역폭 한계. [디스플레이 정보](/tests/display-info)로 확인합니다.",
          "3. GPU 및 드라이버 계층: 프레젠테이션 대기열 처리, 다중 화면 시 메모리 클럭 이상, 드라이버 전력 모드. 드라이버 클린 설치로 해결합니다.",
          "4. OS 컴포지터 계층: 윈도우 창 관리자(Windows DWM 등)가 비동기 V-Sync 주기를 원활히 조율하지 못함. 단일 화면과 다중 화면 동작을 비교합니다.",
          "5. 애플리케이션 및 브라우저 계층: 브라우저 멀티프로세스 정책, GPU 가속 플래그, 백그라운드 탭 억제. [브라우저 호환성 검사](/tools/browser-compatibility)로 확인합니다.",
          "6. 동영상 재생 계층: 하드웨어 가속 비디오 디코더가 GPU 프레젠테이션 주기를 동영상 프레임레이트(24, 30, 60 FPS)에 묶어버림."
        ],
        "bullets": [
          "디스플레이 계층: 모니터 펌웨어, EDID 통신, OSD 오버드라이브 설정.",
          "신호 계층: 케이블 대역폭 규격, 단자 버전, 허브 장치 병목.",
          "GPU 계층: 화면 출력 큐, 메모리 클럭 상태, 드라이버 설정.",
          "컴포지터 계층: 서로 다른 주사율을 조율하는 창 관리자 스케줄링.",
          "애플리케이션 계층: 브라우저 렌더링 엔진, 하드웨어 가속, 프로세스 관리.",
          "동영상 계층: 미디어 디코더가 고정 주사율로 화면을 제약하는 현상."
        ]
      },
      {
        "title": "HDR과 SDR 혼용 환경: 밝기, 색 공간, 컴포지터 매핑",
        "content": [
          "HDR 모니터와 일반 SDR 모니터를 나란히 사용할 경우 데스크톱 컴포지터의 처리 작업은 훨씬 복잡해집니다. 한쪽 화면은 HDR로, 다른 쪽 화면은 SDR로 작동하면 운영체제는 서로 다른 색 공간과 톤 커브를 동시에 실시간으로 처리해야 합니다.",
          "Windows의 경우 컴포지터는 일반 sRGB 요소를 HDR 화면을 위한 확장 컨테이너로 변환하면서 동시에 SDR 화면에는 기본 8비트 sRGB를 출력합니다. 이때 운영체제의 'SDR 콘텐츠 밝기' 슬라이더가 적절히 조율되지 않으면 흰색 창이 한쪽 화면에서는 지나치게 밝고 다른 쪽에서는 칙칙해 보일 수 있습니다.",
          "또한 동영상 창을 화면 사이로 이동시킬 때 운영체제가 실시간으로 톤 매핑을 다시 계산해야 하므로 일시적인 끊김이나 색감 튐이 발생할 수 있습니다. [디스플레이 정보](/tests/display-info)에서 브라우저가 감지한 HDR 지원 여부를 확인할 수 있지만, OS 내부의 색 관리 정확도까지 웹 도구로 보증할 수는 없습니다."
        ],
        "bullets": [
          "HDR과 SDR 혼용은 컴포지터에 이중 색 공간과 톤 매핑의 동시 처리를 요구합니다.",
          "SDR 콘텐츠 밝기 설정을 조절하여 양쪽 화면의 흰색 밸런스를 맞추어야 합니다.",
          "화면 간에 미디어를 드래그하면 실시간 톤 매핑 재계산이 유발됩니다.",
          "브라우저 미디어 쿼리는 보고된 HDR 지원만 확인하며 절대적 색 정확도를 재지는 못합니다."
        ]
      },
      {
        "title": "다중 모니터 환경에서의 가변 주사율(VRR): 창 모드 동기화의 현실",
        "content": [
          "NVIDIA G-Sync, AMD FreeSync, VESA Adaptive-Sync 등 가변 주사율(VRR) 기술은 모니터의 주사율을 그래픽 카드의 프레임 출력에 실시간으로 맞추어 줍니다. 단일 모니터 전체 화면 게임에서는 압도적인 부드러움을 제공하지만, 다중 모니터 바탕화면 환경에서는 예기치 않은 상호작용이 일어날 수 있습니다.",
          "GPU 제어판에서 VRR을 '창 모드 및 전체 화면 모드'로 활성화하면 드라이버는 현재 포커스를 가진 창에 주사율을 맞추려고 시도합니다. 이때 보조 화면에서 브라우저, 동영상, 메신저 등 애니메이션 요소가 동작하면 드라이버가 어느 주사율을 따라가야 할지 혼선을 빚어 바탕화면 깜빡임이나 끊김이 발생할 수 있습니다.",
          "Screen Tester의 [VRR 테스트](/tests/vrr-test)와 [주사율 측정 테스트](/tests/refresh-rate-test)를 통해 화면의 안정성을 눈으로 점검할 수 있습니다. 창 모드 게임 중 끊김이 심하다면 그래픽 제어판에서 VRR을 '전체 화면 전용'으로 전환하는 것만으로 충돌이 해결되는 경우가 많습니다."
        ],
        "bullets": [
          "VRR은 모니터 주사율을 그래픽 카드의 프레임 공급에 유연하게 동기화합니다.",
          "창 모드 VRR은 보조 모니터의 백그라운드 애니메이션에 의해 간섭을 받을 수 있습니다.",
          "동기화 우선순위 혼선으로 인해 화면 깜빡임이나 끊김이 유발될 수 있습니다.",
          "Screen Tester로 움직임을 시각 점검할 수 있지만 드라이버 내부 레지스터를 읽지는 않습니다."
        ]
      },
      {
        "title": "노트북과 외장 모니터: 도킹 스테이션, 전원 상태, 하이브리드 그래픽",
        "content": [
          "노트북에 외장 모니터를 연결하는 구조는 데스크톱 PC와 구별되는 고유한 특징이 있습니다. 최신 노트북의 대다수는 내장 GPU(iGPU)와 외장 GPU(dGPU)가 함께 협력하는 하이브리드 그래픽 구조(NVIDIA Optimus 등)를 채택하고 있습니다.",
          "메인보드 설계에 따라 노트북 자체 화면은 저전력 내장 GPU가 구동하고, 외부 출력 포트(HDMI, USB-C)는 외장 GPU에 직결되어 있거나 내장 GPU 버퍼를 거쳐 전달됩니다. 신호가 내장 GPU를 통과해야 하는 구조라면 완성된 화면을 시스템 버스로 복사하는 과정에서 추가적인 지연과 미세 끊김이 생길 수 있습니다.",
          "또한 배터리로 작동할 때는 시스템과 그래픽 카드가 적극적인 절전 정책을 켭니다. 주사율이 무조건 떨어지는 것은 아니지만, 많은 노트북이 60Hz로 전환되거나 PCIe 링크 속도를 줄입니다. 전원 어댑터를 연결한 상태에서 테스트하면 단순 절전 모드 영향인지 설정 오류인지를 확실하게 가려낼 수 있습니다."
        ],
        "bullets": [
          "하이브리드 그래픽은 내부 화면과 외부 단자를 서로 다른 컨트롤러에 분배합니다.",
          "내장 그래픽을 경유하는 외부 신호는 시스템 버스 복사 지연을 유발할 수 있습니다.",
          "USB-C나 썬더볼트 도크는 영상 신호와 데이터, 네트워크 대역폭을 공유합니다.",
          "배터리 모드는 그래픽 클럭을 제한하므로 테스트는 전원 어댑터를 연결하고 진행합니다."
        ]
      },
      {
        "title": "노트북 배터리 vs AC 전원 디스플레이 거동: 전력 레일, 클록 및 동적 스케일링",
        "content": [
          "노트북을 상시 전원(AC) 대신 배터리(DC 전력)로 구동하면 시스템의 열 설계 및 전력 공급 한계가 근본적으로 재조정됩니다. 배터리 구동 시간을 연장하기 위해 운영체제, CPU 및 GPU 펌웨어는 화면 렌더링 및 모션 유연성을 가시적으로 변경할 수 있는 동적 전력 제한 메커니즘을 적용합니다.",
          "배터리 구동 시 운영체제 전원 모드(Windows의 '최고의 전원 효율성', '균형', '최고의 성능'; macOS의 '저전력 모드'; Linux의 에너지 절약 프로필)는 백그라운드 작업을 제한합니다. GPU는 코어 및 메모리 클록(P-states)을 낮추고, PCIe 버스는 대기 전력 절감 모드(ASPM L0s/L1)로 진입하여 GPU와 디스플레이 컨트롤러 사이의 데이터 전송 대역폭을 줄입니다.",
          "동시에 최신 디스플레이 패널은 동적 주사율 변경 기술을 가동합니다. Windows 11의 동적 주사율(DRR)이나 제조사 펌웨어에 의해 120Hz, 144Hz, 240Hz 패널이 유휴 상태나 배터리 구동 시 자동으로 60Hz로 전환되거나 패널 자체 재생(PSR)을 활성화합니다. 또한 콘텐츠 적응형 밝기 제어(CABC), Intel DPST, AMD Vari-Bright 기능이 화면의 어두운 영역과 밝은 영역에 맞춰 백라이트 밝기와 감마 곡선을 실시간으로 변조합니다.",
          "그러나 배터리 구동이 모든 노트북에서 무조건 주사율을 낮추거나 화면을 제약하는 것은 아닙니다. MUX 스위치를 탑재한 고성능 게이밍 노트북은 배터리 소모를 감수하고 고주사율을 유지할 수 있으며, 슬림형 노트북은 전력 효율을 최우선시합니다. 나타나는 증상이 의도된 절전 거동인지 설정 병목인지 확인하려면 단계별 점검이 필요합니다."
        ],
        "bullets": [
          "배터리 모드는 전력 절감을 위해 CPU, GPU 및 PCIe ASPM 절전 상태를 가동합니다.",
          "동적 주사율(DRR) 및 패널 자체 재생(PSR)에 의해 배터리 사용 시 화면이 60Hz로 낮아질 수 있습니다.",
          "적응형 밝기 제어(CABC, Intel DPST, AMD Vari-Bright)가 명암비와 밝기를 실시간으로 조절합니다.",
          "배터리 모드가 화면을 무조건 제한하는 것은 아니며, 제조사 및 OS 설정에 따라 달라집니다."
        ]
      },
      {
        "title": "배터리 구동 시 노트북 내부 패널과 외부 모니터 출력 구조",
        "content": [
          "최신 노트북은 하이브리드 그래픽 구조(NVIDIA Optimus, AMD SmartAccess Graphics, Apple 통합 메모리 등)를 활용하여 내부 화면과 외부 출력 단자를 서로 다른 그래픽 컨트롤러에 분배합니다.",
          "일반적으로 내부 패널은 eDP(Embedded DisplayPort) 버스를 통해 저전력 내장 그래픽(iGPU)에 직결됩니다. 배터리 구동 시에는 에너지를 아끼기 위해 고성능 외장 그래픽(dGPU)이 절전 상태로 들어갑니다. dGPU 연산이 필요한 프로그램이 실행되면 완성된 프레임이 PCIe 버스를 거쳐 iGPU로 복사되어 출력되는데, 배터리 구동으로 버스 대역폭이 제약받는 상황에서는 이 복사 단계가 미세한 스터터를 유발할 수 있습니다.",
          "HDMI, USB-C DisplayPort Alt Mode 또는 썬더볼트 독을 통해 연결된 외부 모니터는 또 다른 변수를 가집니다. 외부 포트는 외장 그래픽에 직접 연결되어 있거나, 독 내부에서 데이터 및 네트워크와 대역폭을 공유합니다. AC 전원 케이블을 분리하면 독이 전원 공급(PD) 프로필을 재협상하거나 외장 그래픽이 급격한 절전 상태로 진입하여, AC 연결 시에는 없던 프레임 드롭이 외부 화면에서 발생할 수 있습니다."
        ],
        "bullets": [
          "내부 액정은 eDP로 iGPU에 연결되며, 배터리 사용 시 dGPU는 자주 절전 모드로 전환됩니다.",
          "그래픽 프로세서 간 프레임 복사 과정은 배터리 구동 시 버스 대역폭 제한으로 스터터를 유발할 수 있습니다.",
          "썬더볼트 및 USB-C 독은 대역폭을 공유하며 전원 분리 시 전력 프로필을 재협상할 수 있습니다.",
          "AC 전원 상태에서 외부 모니터를 테스트하면 독 전력 제약과 화면 설정 문제를 구별할 수 있습니다."
        ]
      },
      {
        "title": "노트북 배터리 vs AC 전원 비교 검증 절차: 체계적인 점검 프로토콜",
        "content": [
          "화면 끊김, 주사율 하락 또는 밝기 변화가 운영체제의 정상적인 절전 정책 때문인지 시스템 결함 때문인지 분별하려면 다음 5단계 절차를 수행하세요:",
          "1단계: AC 전원 연결 상태에서 기준선 측정. 정품 AC 어댑터를 연결합니다. 운영체제 전원 모드를 '균형' 또는 '최고의 성능'으로 설정합니다. Screen Tester에서 [주사율 테스트](/tests/refresh-rate-test) 및 [모션 블러 테스트](/tests/motion-blur-test)를 실행하고 프레임 안정성과 부드러움을 기록합니다.",
          "2단계: 충전 케이블 분리. Screen Tester를 실행한 상태에서 충전 케이블을 분리합니다. 즉각 나타나는 변화를 기록하세요: 화면이 어두워지나요? Windows 디스플레이 설정이나 [주사율 테스트](/tests/refresh-rate-test)에서 120Hz/144Hz가 60Hz로 떨어지나요? [HDR 테스트](/tests/hdr-test)에서 배터리 절전 정책으로 인해 HDR이 꺼졌는지 확인합니다.",
          "3단계: 동적 상호작용 및 프레임 페이싱 검증. 마우스 커서를 빠르게 휘젓고 텍스트를 스크롤합니다. Windows DRR 지원 기기에서는 조작 시 주사율이 일시적으로 복귀하는지, 아니면 60Hz에 고정되어 있는지 관찰합니다. 패널이 지원하는 경우 [VRR 테스트](/tests/vrr-test)도 점검합니다.",
          "4단계: 외부 모니터 동작 평가. 외부 모니터가 연결된 경우 창 이동 시 배터리 상태에서 AC 연결 대비 끊김이 발생하는지 관찰합니다. [디스플레이 정보](/tests/display-info) 및 [브라우저 호환성](/tools/browser-compatibility)으로 동작 환경을 확인하세요.",
          "5단계: AC 전원 재연결. 충전기를 다시 연결합니다. 주사율, 밝기 및 화면 페이싱이 즉시 원래대로 복귀하는지, 아니면 프로그램을 다시 시작해야 하는지 확인합니다."
        ],
        "bullets": [
          "1단계: 정품 충전기를 연결하고 성능 모드에서 모션 부드러움의 기준 데이터를 기록합니다.",
          "2단계: 전원을 분리하고 주사율, 화면 밝기 및 HDR의 즉각적인 변화를 관찰합니다.",
          "3단계: 마우스 조작과 스크롤을 통해 Windows DRR의 동적 복귀 반응성을 테스트합니다.",
          "4단계: 외부 모니터를 배터리와 AC 상태에서 비교하여 독의 전력 병목을 구별합니다.",
          "5단계: 전원을 재연결하고 고주사율과 밝기가 지연 없이 정상 복귀하는지 검증합니다."
        ]
      },
      {
        "title": "전력 관련 화면 끊김 진단: 정상적인 절전 거동과 시스템 이상 구별법",
        "content": [
          "의도된 정상 절전 기능과 실제 하드웨어/드라이버 결함을 명확히 구분해야 불필요한 설정 왜곡을 막을 수 있습니다:",
          "정상적인 절전 거동 예시: (1) Windows 배터리 절약 모드 진입 시 주사율이 144Hz/165Hz에서 60Hz로 자동 전환되는 현상; (2) Intel DPST 또는 AMD Vari-Bright로 인해 어두운 화면에서 명암비와 백라이트가 미세하게 요동치는 현상; (3) '배터리 수명에 맞게 최적화' 설정으로 인해 배터리 구동 시 HDR이 자동 해제되는 현상; (4) 배터리 상태에서 최대 밝기가 소폭 제한되는 현상.",
          "점검과 조치가 필요한 이상 현상: (1) 정품 충전기를 연결한 상태에서도 마우스 커서가 지속적으로 끊기거나 심한 프레임 드롭이 발생하는 경우; (2) 전원 케이블을 꽂거나 뺄 때 화면이 심하게 깜빡이거나 장시간 블랙아웃되는 경우; (3) 고주사율 패널임에도 AC 전원 상태에서 60Hz 고정이 풀리지 않는 경우; (4) AC 전원 상태에서 외부 모니터를 연결했을 때 극심한 마이크로 스터터가 나타나는 경우.",
          "안전한 문제 해결 단계: Windows 고급 디스플레이 설정에서 설정된 주사율을 확인하세요; 제조사 소프트웨어(Lenovo Vantage, ASUS Armoury Crate, Dell Optimizer 등)에서 에코 모드로 인한 화면 잠금이 걸려 있지 않은지 확인하세요; 그래픽 드라이버를 클린 설치하세요; 충전기 정격 와트(W)를 확인하세요(저출력 USB-C 충전기를 쓰면 전원선이 꽂혀 있어도 배터리 스로틀링이 작동할 수 있습니다). 하드웨어 이상 점검은 [문제 해결 가이드](/knowledge-base/troubleshooting)를 참조하세요."
        ],
        "bullets": [
          "정상: 배터리 절약 시 60Hz 강등, CABC 명암 조절, 전력 보존을 위한 HDR 자동 해제.",
          "이상: 정품 충전기 연결 시 지속적인 끊김, 케이블 탈착 시 화면 깜빡임, AC 연결 시 60Hz 고정.",
          "제조사 소프트웨어(Armoury Crate, Vantage 등)의 강제 주사율 제한 여부를 확인하세요.",
          "충전기 출력 부족으로 인한 스로틀링을 방지하기 위해 정격 출력 어댑터를 사용하세요."
        ]
      },
      {
        "title": "단계별 멀티 모니터 격리 진단 프로토콜: 체계적인 문제 해결 절차",
        "content": [
          "멀티 모니터 환경에서 모션 버벅거림, 불규칙한 프레임 페이싱 또는 스케일링 결함을 점검할 때 무작위 설정 변경은 원인 파악을 방해합니다. 하드웨어 손상 위험이 없는 체계적인 격리 절차에 따라 소프트웨어, 디스플레이, 연결 인터페이스 중 어느 계층에 원인이 있는지 단계별로 규명하십시오.",
          "진단 아키텍처 및 증거 계층: 결과를 정확히 해석하기 위해 4가지 관찰 계층을 구분합니다: (1) 브라우저 보고 값: rAF 프레임 디스패치 주기, devicePixelRatio, 뷰포트 크기 (물리적 패널 스캔아웃이 아닌 소프트웨어 렌더링 루프를 반영); (2) OS 보고 값: 디스플레이 설정에 보고된 설정 주사율, 배율 비율, HDR 활성화 상태; (3) 사용자 육안 관찰: 화면 끊김(스터터), 커서 버벅거림, 창 드래그 부드러움; (4) 제조사 규격: 패널 지원 주사율 한계, 인터페이스 대역폭, 독 처리 능력.",
          "단계별 격리 절차 (한 번에 '한 가지' 변수만 변경):",
          "1단계: 베이스라인(기준 상태) 기록. 설정을 변경하기 전 각 모니터의 해상도, 주사율, OS 텍스트 배율, HDR 상태, 연결 케이블 종류를 기록해 둡니다.",
          "2단계: 각 디스플레이 독립 테스트. OS 설정에서 보조 모니터를 비활성화하거나 케이블을 안전하게 분리한 후, 기본 고주사율 모니터 단독으로 [Refresh Rate Test](/tests/refresh-rate-test) 및 [Motion Blur Test](/tests/motion-blur-test)를 실행하여 단일 화면의 부드러움을 확인합니다.",
          "3단계: 동일 주사율 일치 테스트. 보조 모니터를 다시 켜되 모든 디스플레이를 동일한 주사율(예: 모두 60Hz)로 임시 설정합니다. 주사율이 일치할 때 컴포지터 버벅거림이 사라지는지 관찰합니다.",
          "4단계: 혼합 주사율 테스트. 메인 모니터를 본래의 고주사율(144Hz 또는 165Hz)로 복원하고 보조 모니터는 60Hz로 둡니다. 보조 화면에서 동영상 재생이나 하드웨어 가속 앱 구동 시 메인 화면에 프레임 지터가 유발되는지 확인합니다.",
          "5단계: 디스플레이 스케일링 설정 격리. 두 모니터를 모두 100% 배율로 테스트한 다음 혼합 배율(예: 100%와 125%)을 테스트합니다. 모니터 경계를 가로질러 창을 드래그하며 텍스트 번짐이나 컴포지터 지연을 확인합니다.",
          "6단계: HDR / SDR 혼합 구성 테스트. HDR 모니터와 SDR 모니터를 함께 사용하는 경우, OS 설정에서 HDR을 켰을 때와 껐을 때를 비교하여 톤 매핑 전환 및 데스크톱 밝기 일관성을 평가합니다.",
          "7단계: VRR(가변 주사율) 켜기/끄기 비교. 가변 주사율(G-Sync / FreeSync)을 사용하는 경우 GPU 제어판에서 VRR을 켜고 끄며 [VRR Test](/tests/vrr-test)를 실행하여 창 모드 동기화 충돌을 점검합니다.",
          "8단계: 노트북 내장 패널 vs 외장 디스플레이 라우팅. 노트북의 경우 내장 화면 단독 동작을 테스트한 후, 중간 허브 없이 본체 비디오 단자에 직결된 외장 모니터와 동작을 비교합니다.",
          "9단계: 도킹 스테이션 및 변환 젠더 우회 테스트. USB-C 도크나 MST 허브를 사용하는 경우 모니터를 본체 기본 비디오 포트에 직접 연결하여 도크 컨트롤러 대역폭 포화 여부를 확인합니다.",
          "10단계: 브라우저 관찰값과 OS 설정 비교. [Display Information](/tests/display-info) 및 [Browser Compatibility](/tools/browser-compatibility)에서 확인한 브라우저 보고 값을 OS 디스플레이 설정과 대조합니다. 위험한 하드웨어 분해나 무리한 케이블 탈착은 피하십시오. 추가 해결 방법은 [문제 해결 가이드](/knowledge-base/troubleshooting)를 참조하십시오."
        ]
      }
    ],
    "faq": [
      {
        "question": "보조 모니터에서 동영상을 틀면 144Hz 주 모니터가 60Hz처럼 끊기는 이유는 무엇인가요?",
        "answer": "60Hz 보조 화면에서 하드웨어 가속 동영상이 재생되면 운영체제 창 컴포지터나 브라우저 엔진이 GPU 렌더링 스레드를 60Hz 주기에 맞춰버리는 현상이 발생할 수 있습니다. 브라우저 하드웨어 가속을 끄거나 최신 그래픽 드라이버로 업데이트하면 해결되는 경우가 많습니다."
      },
      {
        "question": "60Hz 모니터와 144Hz 또는 165Hz 게이밍 모니터를 함께 쓰는 것이 좋지 않은가요?",
        "answer": "그렇지 않습니다. 최신 그래픽 카드와 운영체제는 화면별 독립 주사율 출력을 완벽히 지원합니다. 과거 시스템에서는 페이싱 문제가 종종 발생했으나, 현재 발생하는 문제는 하드웨어의 한계가 아니라 특정 소프트웨어의 리소스 점유 문제인 경우가 대부분입니다."
      },
      {
        "question": "배율이 다른 모니터 사이로 창을 옮기면 왜 글씨가 흐려지나요?",
        "answer": "모니터별 동적 DPI 인식 기능을 갖추지 못한 구형 프로그램은 화면이 바뀔 때 글꼴을 다시 그리지 못합니다. 운영체제가 창을 비트맵 그림처럼 강제로 늘려 표시하기 때문에 글씨와 경계면이 흐릿해집니다."
      },
      {
        "question": "다중 모니터 환경에서 G-Sync나 FreeSync가 화면 끊김을 유발할 수 있나요?",
        "answer": "네. 특히 가변 주사율이 '창 모드 및 전체 화면'으로 활성화된 경우에 나타날 수 있습니다. 보조 화면에서 백그라운드 앱이 갱신되면 드라이버가 어느 화면 주사율을 따라갈지 혼란을 겪어 화면 깜빡임과 끊김이 생길 수 있습니다."
      },
      {
        "question": "노트북에 외장 모니터를 연결했을 때 배터리 모드에서 화면이 끊기는 이유는 무엇인가요?",
        "answer": "배터리로 작동할 때는 전력 절약 정책이 개입하여 GPU 메모리 클럭이나 PCIe 대역폭을 낮출 수 있습니다. 전원 어댑터를 연결한 상태에서 테스트해 보면 단순 절전 모드 동작인지 설정 오류인지를 쉽게 판별할 수 있습니다."
      },
      {
        "question": "Screen Tester가 GPU 하드웨어 타이밍을 직접 측정하거나 다중 모니터 끊김을 자동 수정할 수 있나요?",
        "answer": "아닙니다. 웹 브라우저는 보안 샌드박스 내에서 실행되므로 저수준 GPU 레지스터나 물리 케이블 신호에 직접 접근할 수 없습니다. Screen Tester는 상태를 눈으로 확인할 수 있는 시각 패턴을 제공하며, 수정은 운영체제나 그래픽 드라이버에서 직접 진행해야 합니다."
      },
      {
        "question": "충전기를 뽑으면 노트북 화면이 120Hz/144Hz에서 60Hz로 떨어지는 이유는 무엇인가요?",
        "answer": "이는 Windows 동적 주사율(DRR), 그래픽 드라이버 또는 제조사 소프트웨어(Lenovo Vantage, ASUS Armoury Crate 등)가 관리하는 정상적인 전력 절감 기능입니다. 초당 120회 또는 144회 화면을 갱신하는 것은 전력을 크게 소모하므로 배터리 구동 시 60Hz로 낮춰집니다. 배터리 상태에서도 부드러운 화면을 원하신다면 Windows 고급 디스플레이 설정이나 제조사 프로그램에서 설정을 변경할 수 있습니다."
      },
      {
        "question": "배터리와 AC 전원을 전환할 때 화면 밝기나 명암비가 달라지는 이유는 무엇인가요?",
        "answer": "이러한 현상은 Windows CABC, Intel Display Power Saving Technology(DPST) 또는 AMD Vari-Bright와 같은 적응형 절전 기능 때문에 발생합니다. 배터리 소모를 줄이기 위해 표시되는 화면 내용의 명암에 맞춰 백라이트 밝기와 감마 곡선을 실시간으로 조절합니다. 이러한 색감 변화가 불편하시다면 Intel 그래픽 제어 센터나 AMD Software에서 해당 기능을 끌 수 있습니다."
      },
      {
        "question": "Screen Tester로 내 노트북이 배터리로 구동 중인지 전원에 연결되어 있는지 알 수 있나요?",
        "answer": "아닙니다. 웹 브라우저는 보안 샌드박스 내부에서 실행되므로 명시적 권한 없이 하드웨어 전원선, ACPI 충전 상태 또는 전원 관리 옵션을 직접 읽을 수 없습니다. Screen Tester는 브라우저 수준의 애니메이션 주기와 화면 반응성을 측정할 뿐이며, 성능 저하가 배터리 모드 때문인지 발열이나 드라이버 설정 때문인지는 직접 판별할 수 없습니다."
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
    "title": "HDR 기초 원리, 톤 매핑 및 최대 피크 밝기",
    "subtitle": "피크 밝기(Nits), 10비트 양자화, PQ/HLG 감마 커브 및 로컬 디밍 구조.",
    "description": "High Dynamic Range(HDR)의 기본 원리, 최대 밝기, FALD 직하형 백라이트, 톤 매핑 및 OS HDR 파이프라인을 학습합니다.",
    "directAnswer": "HDR은 명암비와 색 영역을 크게 확장하여 깊은 암부 블랙과 1,000니트 이상의 강렬한 하이라이트를 생생하게 표현하는 기술입니다.",
    "whyItMatters": "진정한 HDR 구현에는 하드웨어 밝기와 로컬 디밍(FALD 또는 OLED)이 필수적이며, 무늬만 HDR인 모니터는 명암비를 떨어뜨립니다.",
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
    "primarySearchIntent": "hdr 모니터 피크 밝기 니트 톤 매핑 로컬디밍",
    "readingTimeMinutes": 7
  },
  {
    "slug": "color-depth-and-banding",
    "category": "display-basics",
    "title": "색 심도, 양자화 및 컬러 밴딩 현상",
    "subtitle": "8비트 대 10비트, FRC(프레임 레이트 제어), 밴딩 왜곡 및 색상 그라데이션.",
    "description": "6비트+FRC, 8비트, 네이티브 10비트의 차이점, 그라데이션에서 밴딩(계단 현상)이 발생하는 이유와 점검 방법을 알아봅니다.",
    "directAnswer": "색 심도는 디스플레이가 표현할 수 있는 색상 채널당(RGB) 밝기 단계 수를 나타내며, 8비트의 256단계부터 10비트의 1,024단계까지 다양합니다.",
    "whyItMatters": "색 심도가 부족하면 노을이나 그림자 등 부드러운 색상 전환부에 계단식 줄무늬(밴딩)가 생겨 그래픽 작업에 치명적입니다.",
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
    "primarySearchIntent": "색 심도 밴딩 모니터 8비트 10비트 frc 계단현상",
    "readingTimeMinutes": 5
  },
  {
    "slug": "black-levels-and-shadow-detail",
    "category": "display-basics",
    "title": "블랙 레벨, 명암비 및 암부 그림자 디테일 표현력",
    "subtitle": "정적 명암비, 암부 계조 유지, 니어 블랙 양자화 및 블랙 크러시 현상.",
    "description": "패널의 암부 표현 방식, 어두운 디테일이 뭉개지는 블랙 크러시 원인 및 감마 보정 방법을 알아봅니다.",
    "directAnswer": "블랙 레벨은 디스플레이가 완전한 검은색을 표현할 때 방출하는 최소 잔류 휘도로, cd/m² 단위로 측정됩니다.",
    "whyItMatters": "블랙이 뜨면 어두운 장면이 뿌옇게 흐려지고, 감마가 잘못 설정되면 암부 세부 묘사가 뭉개지는 블랙 크러시가 발생합니다.",
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
    "primarySearchIntent": "블랙 레벨 명암비 암부 디테일 블랙 크러시 감마 모니터",
    "readingTimeMinutes": 6
  },
  {
    "slug": "display-uniformity",
    "category": "display-basics",
    "title": "화면 균일도 및 패널 밝기 편차 분포",
    "subtitle": "주변부 비네팅, 색온도 편차 및 백라이트 불균일 현상 진단.",
    "description": "화면 전체의 밝기 균일도와 모서리 어두움, 좌우 색온도 왜곡을 체계적으로 점검합니다.",
    "directAnswer": "화면 균일도는 패널 중앙부터 모서리 외곽까지 화면 전반의 휘도와 색온도가 얼마나 일정하게 유지되는지를 나타냅니다.",
    "whyItMatters": "모서리 밝기가 15% 이상 떨어지거나 화면 한쪽이 누렇게 뜨는 현상은 정확한 사진 편집과 디자인 판별을 방해합니다.",
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
    "primarySearchIntent": "화면 균일도 밝기 편차 색온도 비네팅 백라이트 모니터",
    "readingTimeMinutes": 5
  },
  {
    "slug": "dead-pixel-vs-stuck-pixel",
    "category": "display-problems",
    "title": "불량 화소 vs 스턱 픽셀: 식별 방법, ISO 규격 및 보증 정책",
    "subtitle": "화소 결함 분류 체계, ISO 9241-307 기준, 제조사 무상 보증(RMA) 기준 및 판매처 교환·반품 정책 총정리.",
    "description": "불량 화소(데드 픽셀)와 스턱 픽셀의 차이점을 알아보고, ISO 9241-307 결함 등급과 제조사 보증 규정 및 판매처 반품 기한에 따른 올바른 대처법을 확인하세요.",
    "directAnswer": "데드 픽셀(암점)은 전원이 공급되지 않아 밝은 배경에서 영구적으로 검게 보이는 화소이며, 스턱 픽셀(휘점)은 특정 서브픽셀이 항상 켜져 있어 붉은색, 초록색, 파란색으로 고정 발광하는 결함입니다. ISO 9241-307은 공학적 분류 기준일 뿐 자동적인 환불이나 교환 법적 의무를 부여하지 않으므로, 실제 보상은 판매처 규정, 제조사 보증서, 관련 소비자 보호 법률에 따라 결정됩니다.",
    "whyItMatters": "새 모니터나 중고 디스플레이에서 화소 결함을 발견하면 반품 기한, 무상 보증 교환 여부, 수리 가능성에 대해 즉각적인 혼란이 생깁니다. 이를 현명하게 해결하려면 인체공학 기술 표준(ISO 9241-307), 제조사 보증 계약(RMA), 판매처 반품 규정, 법정 소비자 권리라는 4가지 층위를 명확히 구별해야 합니다.",
    "whatToLookFor": [
      "데드 픽셀 (암점): 흰색, 시안, 마젠타, 노란색 등 밝은 단색 배경에서 계속 검은 점으로 나타나는 결함",
      "스턱 서브픽셀 (휘점): 검은색이나 어두운 배경에서 빨간색, 초록색, 파란색으로 지속 점등되는 화소",
      "핫 픽셀 / 풀 화소 휘점: RGB 3개 서브픽셀이 모두 켜져 검은 화면에서 하얀 점으로 빛나는 상태",
      "결함 집중 (클러스터): 인접한 좁은 구역 내에 여러 개의 암점이나 휘점이 모여 있는 상태",
      "시야각에 따른 변화: 머리를 움직였을 때 화소와 위치가 어긋나 보이는 표면의 먼지나 이물질",
      "서브픽셀 색상 왜곡: 단 하나의 서브픽셀 결함으로 인해 복합 색상이 어색하게 왜곡되는 현상"
    ],
    "howToTest": [
      "표면의 먼지를 깨끗하고 마른 극세사 천으로 부드럽게 닦아내어 외부 이물질을 배제합니다",
      "Screen Tester에서 [데드 픽셀 테스트](/tests/dead-pixel-test)를 실행하고 빨강, 초록, 파랑, 흰색, 검은색 전면 배경을 순차 점검합니다",
      "직사광선이나 반사광이 없는 적절한 실내 조명 아래에서 바둑판 배열을 따라 체계적으로 눈으로 확인합니다",
      "[스턱 픽셀 테스트](/tests/stuck-pixel-test)를 순수 검은색 및 어두운 회색 화면에서 실행하여 점등된 서브픽셀을 찾습니다",
      "기본 색상을 전환할 때 결함이 사라지거나 색상이 바뀌는지 주의 깊게 관찰합니다",
      "결함의 대략적인 화면 좌표를 기록하고 중앙부인지 외곽 테두리 부근인지 확인합니다",
      "스턱 픽셀이 의심되는 경우 [스턱 픽셀 복구 도구](/tests/stuck-pixel-fixer)를 실행하여 비파괴 색상 순환 자극을 시도합니다",
      "당사의 [새 모니터 점검 가이드](/guides/new-monitor-inspection-return-window) 또는 [중고 모니터 점검 체크리스트](/guides/used-monitor-inspection-checklist)를 활용하여 기록합니다"
    ],
    "whatScreenTesterCanObserve": [
      "RGB 원색, 순백색, 순흑색을 포함한 정확한 테스트 색상의 전체 화면 표시",
      "사용자가 보고한 시각적 이상, 좌표 파악 및 테스트 세션 중 작성된 점검 메모",
      "브라우저 렌더링 엔진을 통해 전달되는 고대비 급속 색상 순환 패턴",
      "흰색 배경의 어두운 결함과 어두운 배경의 밝은 결함에 대한 육안 식별",
      "표준 단색 배경 및 화면 해상도 전반에 걸친 시각적 결함의 비교 관찰"
    ],
    "whatScreenTesterCannotDetermine": [
      "박막 트랜지스터(TFT) 회로의 물리적 도통 상태나 게이트 절연막 파괴 여부",
      "ISO 9241-307 디스플레이 결함 등급에 대한 공식 적합성 인증 및 광학 랩 측정치",
      "특정 디스플레이 기기에 대한 제조사 상업 보증 또는 RMA 교환 적격성 판정",
      "판매처별 자체 반품·교환 규정 적용 여부, 청약 철회 기한, 재입고 수수료 부과 여부",
      "법률상의 소비자 권리, 민법 및 상법상 하자(계약 부적합) 인정 여부"
    ],
    "commonCauses": [
      "클린룸 반도체 리소그래피(TFT 어레이) 제조 공정 중 발생한 미세한 오차",
      "기판 접합 공정 중 액정 층 내부에 유입된 미세 입자 오염",
      "배송 또는 조립 중 가해진 물리적 충격, 국소적 압력, 패널 비틀림",
      "투명 전극(ITO 배선) 단선으로 인해 서브픽셀에 제어 전압이 인가되지 않는 상태",
      "셀 내부 액정 분자가 특정 방향으로 기계적으로 끼어 움직이지 않는 상태",
      "열적·전기적 과부하로 인한 서브픽셀 구동 회로 및 전극 접합부 손상"
    ],
    "whatToDoNext": [
      "접사 사진 촬영과 상세한 메모를 통해 결함의 위치와 색상을 기록합니다",
      "구매처의 초기 교환 또는 반품 마감 기한을 최우선으로 확인합니다 (가장 빠르고 유연한 해결책)",
      "해당 모니터 모델에 적용되는 제조사 공식 화소 결함 보증 기준을 확인합니다",
      "단일 색상의 발광 점인 경우 [스턱 픽셀 복구 도구](/tests/stuck-pixel-fixer)를 시험 가동해 봅니다",
      "고객 지원에 문의하기 전 [문제 해결 가이드](/knowledge-base/troubleshooting)를 검토합니다"
    ],
    "sections": [
      {
        "title": "데드 픽셀 vs 스턱 픽셀: 핵심 기술 요약",
        "content": [
          "현대 평면 디스플레이(IPS, VA, TN 패널 및 OLED 매트릭스)는 수백만 개의 미세한 화소로 이루어져 있습니다. 일반적인 LCD 패널에서 각 화소는 빨강(R), 초록(G), 파랑(B) 3개의 독립된 서브픽셀로 나뉘며, 박막 트랜지스터(TFT)가 액정 분자의 배열을 제어하여 백라이트에서 나오는 빛의 양을 조절합니다.",
          "데드 픽셀(암점)은 서브픽셀 제어 회로에 전원 공급이 완전히 끊겼을 때 발생합니다. 일반적인 노멀리 블랙(전압 인가 시 빛 통과) 액정 구조에서는 전원이 차단된 서브픽셀이 빛을 통과시키지 못하므로 흰색, 노란색, 시안 등 밝은 배경에서 지속적인 검은 점으로 나타납니다.",
          "스턱 픽셀(휘점)은 서브픽셀이 켜진 상태로 고정되어 컬러 필터를 통해 빛을 계속 방출할 때 발생합니다. 이로 인해 검은색이나 어두운 배경에서 빨간색, 초록색, 파란색 점이 눈에 띄게 빛납니다. 자체 발광형인 OLED에서도 불량 소자는 영구 암점이 되며, 쇼트가 난 소자는 계속 빛날 수 있습니다.",
          "결함의 시각적 식별은 활성화된 배경 패턴에 따라 달라집니다. 예를 들어 녹색 서브픽셀 결함은 파란색 화면에서는 전혀 보이지 않지만 흰색이나 마젠타 화면에서는 뚜렷하게 드러납니다. 브라우저 기반 테스트는 사용자의 육안 식별을 돕는 화면을 렌더링할 뿐, 패널 내부 반도체 전자 소자를 직접 계측하지는 않습니다."
        ],
        "bullets": [
          "데드 픽셀: 전원이 차단되어 밝은 배경에서 영구적인 검은 점으로 나타나는 서브픽셀.",
          "스턱 픽셀: 켜진 상태로 고정되어 어두운 배경에서 빨강, 초록, 파랑으로 발광하는 서브픽셀.",
          "전체 화소 vs 서브픽셀: 전체 화소 결함은 모든 색상에서 검게 보이며, 서브픽셀 결함은 혼색 표현을 왜곡함.",
          "기술적 한계: 웹 브라우저는 눈으로 관찰할 수 있는 색상 대비 화면을 제공할 뿐, 하드웨어 칩을 진단하지 않음."
        ]
      },
      {
        "title": "ISO 9241-307 규격의 본질: 공학적 품질 분류 체계",
        "content": [
          "디스플레이 제조 업계의 통일된 용어와 측정 기준을 수립하기 위해 국제표준화기구(ISO)는 전자 영상 표시 장치에 대한 규격인 ISO 13406-2와 그 후속 규격인 ISO 9241-307(인간-시스템 상호작용의 인체공학)을 제정했습니다.",
          "ISO 9241-307은 디스플레이의 시각적 결함을 측정하고 분류하는 기술적 절차를 규정합니다. 결함 유형은 타입 1(최대 밝기로 고정 점등되는 휘점), 타입 2(영구적으로 꺼져 있는 암점), 타입 3(비정상적인 색상이나 밝기를 보이는 서브픽셀 결함)으로 세분화됩니다.",
          "이 표준은 100만 화소당 허용되는 결함 수에 따라 패널 품질 등급(클래스 0, 클래스 I, 클래스 II, 클래스 III 등)을 설정합니다. 클래스 0은 완전 무결함을 뜻하지만, 시판되는 대다수 일반 모니터는 클래스 I이나 클래스 II로 분류되어 일정 수준의 결함이 제조 공차로 인정됩니다.",
          "ISO 9241-307은 실험실 측정을 위한 산업 공학 및 품질 평가 지표일 뿐이며, 소비자 소매 매매 계약이나 자동 법적 환불 권리를 구성하지 않습니다."
        ],
        "bullets": [
          "공학 표준: 디스플레이 인체공학, 측정 절차, 화소 결함 분류 체계를 표준화.",
          "결함 유형: 타입 1(휘점), 타입 2(암점), 타입 3(서브픽셀 결함)으로 규정.",
          "등급별 공차: 100만 화소당 허용 결함 수에 따라 클래스 0(결함 0개)부터 클래스 III까지 구분.",
          "정성적 기준: 제조 수율과 품질을 비교하는 지표이며 자동 환불 권리를 부여하지 않음."
        ]
      },
      {
        "title": "ISO 규격이 자동 교환이나 환불을 의미하지 않는 이유",
        "content": [
          "모니터 구매자들 사이에서 흔한 오해 중 하나는 발견된 불량 화소가 ISO 등급 허용치를 초과하면 제조사나 판매처로부터 즉각적인 무상 교환이나 전액 환불을 보장받을 수 있다는 생각입니다.",
          "ISO 9241-307은 기술적 분류 및 평가 프레임워크이며 그 자체가 보편적인 교환이나 환불 의무를 창출하지 않습니다. 국제 기술 표준은 민간 상거래 계약에 대해 독자적인 법적 강제력을 지니지 않습니다.",
          "제조사는 제품 사양표에 ISO 등급을 언급할 수 있으나, 실제 무상 보증 적용 여부는 각 제조사가 발행한 서면 보증 약관에 따라 배타적으로 결정됩니다. 법령이나 개별 판매 계약에서 ISO 기준을 의무화하지 않는 한, ISO 문서 번호만으로 RMA 승인을 강제할 수는 없습니다.",
          "실제 분쟁 해결은 4가지 개별 층위의 상호 작용에 의해 결정됩니다: 기술 표준(ISO 9241-307), 제조사 품질 보증(RMA), 판매처 반품 규정, 법정 소비자 권리."
        ],
        "bullets": [
          "자동 권리 부재: ISO 규격을 충족하거나 초과한다고 해서 자동적인 환불·교환 청구권이 발생하지 않음.",
          "계약의 우선성: 보증 적격성은 ISO 텍스트가 아닌 제조사의 공식 서면 보증서가 규정함.",
          "4가지 층위 구별: ISO 표준, 제조사 보증, 판매처 규정, 소비자 법률을 명확히 구분해야 함.",
          "설계 지표로서의 ISO: 제조사는 설계 기준으로 ISO를 참고할 뿐 이를 무조건 교환 기준으로 삼지 않음."
        ]
      },
      {
        "title": "제조사 품질 보증 및 RMA 정책",
        "content": [
          "제조사의 자발적 품질 보증은 하드웨어 제조사가 구매 후 특정 기간 동안 수리, 교환, 기술 지원을 약속하는 계약상의 합의입니다.",
          "불량 화소 문제에 대응하기 위해 제조사는 자체적인 RMA(Return Merchandise Authorization) 정책을 공시합니다. 이 정책은 제조사, 제품군, 국가별로 상당한 차이가 있습니다. 예를 들어 전문가용 그래픽 모니터나 프리미엄 게이밍 모니터는 초기 일정 기간 동안 '무결점 보증(Zero Bright Dot, ZBD)'을 적용하는 반면, 일반 사무용 보급형 모니터는 몇 개의 암점이나 서브픽셀 결함을 허용 범위로 봅니다.",
          "제조사 기준은 어두운 화면에서 눈에 거슬리는 휘점과 밝은 화면에서 보이는 암점을 엄격히 구분하며, 결함의 개수뿐만 아니라 화면 중앙부에 위치하는지, 좁은 영역에 모여 있는지(클러스터)를 종합 평가합니다.",
          "RMA 접수를 위해서는 사진이나 영수증 등 객관적인 증거가 요구됩니다. 해당 모델에 적용되는 공식 서비스 약관을 제조사 웹사이트에서 직접 확인하는 것이 가장 확실합니다."
        ],
        "bullets": [
          "정책의 다양성: 제조사마다 결함 허용 기준, 보증 기간, 교환 정책을 독자적으로 운영함.",
          "결함 가중치 구분: 눈에 띄기 쉬운 휘점은 암점에 비해 훨씬 엄격한 기준을 적용받음.",
          "위치 조건: 많은 보증 규정에서 화면 중앙 영역이나 밀집된 결함을 우선적으로 교환 대상으로 삼음.",
          "공식 규정이 기준: 타사 기준과 같을 것이라 예단하지 말고 해당 제품의 공식 보증서를 확인해야 함."
        ]
      },
      {
        "title": "판매처(유통사)의 초기 교환 및 반품 정책",
        "content": [
          "많은 소비자 구매 상황에서 판매처(온라인 몰, 오픈마켓, 오프라인 매장)의 반품 및 초기 불량 교환 정책을 이용하는 것이 제조사의 RMA 절차보다 훨씬 빠르고 유연한 해결책이 됩니다.",
          "유통사는 제품 수령 후 일정 기간 동안 고객 만족 차원의 반품이나 초기 교환 기간을 제공합니다. 이 초기 기간에는 제품이 기대에 미치지 못할 경우, 제조사의 까다로운 RMA 결함 수량 기준에 미치지 않더라도 판매처 규정에 따라 교환이나 반품을 진행할 수 있습니다.",
          "그러나 반품 규정은 판매처마다 자율적으로 정해지며 조건이 매우 다양합니다. 반품 가능 기한은 매장, 제품군, 구매 방식(온라인 vs 오프라인)에 따라 다르며 '만국 공통 며칠'이라는 단일 기준은 존재하지 않습니다. 또한 단순 개봉에 따른 재포장 비용 청구나 부속품 훼손 시 제한 규정이 있을 수 있습니다.",
          "판매처의 초기 교환 기한은 날짜에 따라 엄격하게 마감되므로, 제품 수령 직후 지체 없이 테스트를 진행해야 교환 기회를 놓치지 않습니다."
        ],
        "bullets": [
          "유연한 판매처 대응: 제조사 불량 판정서 없이도 초기 교환이나 반품이 가능한 경우가 많음.",
          "단일 기한 부재: 반품 기한은 쇼핑몰 규정마다 다르므로 구매 영수증이나 주문 내역을 확인해야 함.",
          "포장 상태 유지: 박스, 완충재, 케이블 등 모든 구성품이 온전해야 정상 반품이 가능함.",
          "수령 즉시 테스트: 초기 불량 기한을 넘기지 않도록 배송 직후 전체 화면 테스트를 완료해야 함."
        ]
      },
      {
        "title": "법정 소비자 권리 및 관련 법령",
        "content": [
          "제조사의 자발적 품질 보증서나 유통사의 상업적 반품 규정과 별개로, 모든 상거래는 각국의 소비자 보호 관련 법령의 보호를 받습니다.",
          "많은 법역에서 법정 보증 제도는 판매된 제품이 통상적인 품질과 계약 내용에 부합해야 함을 명시합니다. 제품에 중대한 하자(계약 부적합)가 있는 경우, 소비자는 제조사 보증서의 기재 내용과 상관없이 판매자를 상대로 법적 구제를 요청할 수 있습니다.",
          "그러나 법률상 소비자 권리는 국가나 지역에 따라 매우 상이합니다. 실제 분쟁의 해결은 준거법, 일반 소비자 대 기업 거래 여부, 제품 가격, 중대한 하자에 대한 법원의 판례 등에 좌우됩니다.",
          "Screen Tester는 기술적 점검 도구일 뿐 법률 자문을 제공하지 않습니다. 원만한 합의가 어려운 분쟁이 발생하면 해당 지역의 한국소비자원, 공정거래위원회 등 공적 기관이나 법률 전문가에게 문의하시기 바랍니다."
        ],
        "bullets": [
          "독립적 법정 권리: 법률상 계약 부적합 책임은 제조사의 임의 보증서와 무관하게 적용됨.",
          "적합성 원칙: 제품이 통상적인 기대 품질과 계약에 부합해야 함을 법적으로 규정함.",
          "지역별 차이: 구체적인 권리 구제 절차와 기한은 관할 국가 및 법령에 따라 차이가 큼.",
          "법적 조언 불가: 기술적 검사 데이터를 참고하되 법적 다툼은 공인된 전문 상담 기관을 이용해야 함."
        ]
      },
      {
        "title": "Screen Tester가 도울 수 있는 부분 (그리고 할 수 없는 일)",
        "content": [
          "Screen Tester는 사용자가 데스크톱 및 모바일 모니터의 화면 결함을 체계적으로 발견하고, 시각적으로 관찰하며, 객관적으로 기록할 수 있도록 돕는 웹 검사 환경을 제공합니다.",
          "Screen Tester가 지원하는 영역: (1) [데드 픽셀 테스트](/tests/dead-pixel-test)와 [스턱 픽셀 테스트](/tests/stuck-pixel-test)를 통한 제어된 단색 화면 표시, (2) 원색 및 고대비 배경을 통한 시각적 결함 탐색, (3) 암점, 휘점, 결함 집중 부위의 육안 식별, (4) 점검 메모 작성, (5) 당사의 [새 모니터 점검 가이드](/guides/new-monitor-inspection-return-window), [중고 모니터 점검 체크리스트](/guides/used-monitor-inspection-checklist), [모니터 종합 검사 스위트](/monitor-inspection)를 통한 체계적 기록, (6) [스턱 픽셀 복구 도구](/tests/stuck-pixel-fixer)를 통한 색상 전환 자극 테스트.",
          "Screen Tester가 할 수 없는 영역: (1) ISO 9241-307 규격에 대한 공식 적합성 인증, (2) 미세 TFT 회로의 전압이나 물리적 도통 상태 계측, (3) 특정 제조사의 보증 기준 충족 여부 공인, (4) 법적 결함 상태의 판정, (5) 제조사 RMA 승인이나 판매처 환불의 보증.",
          "당사는 '사용자의 육안 관찰', '브라우저 렌더링 패턴', '제조사 하드웨어 규격', '법률 및 약관 정보'의 경계를 엄격히 구분하여 기술적 정직성을 준수합니다."
        ],
        "bullets": [
          "지원 내용: 단색 화면 표출, 시각적 결함 확인, 점검 메모 정리, 급속 색상 순환 실행.",
          "인증 불가: 전자 회로 정밀 측정, 공식 ISO 인증서 발급, 보증 수리 적격 판정 불가.",
          "효력 부재: RMA 승인을 보장하지 않으며 법적인 하자 판정 효력을 지니지 않음.",
          "투명한 용어: 브라우저 패턴과 물리적 하드웨어 스펙, 법적 판단을 엄격히 구분함."
        ]
      },
      {
        "title": "고객 지원 신청을 위한 증빙 자료 준비 체크리스트",
        "content": [
          "화소 결함을 확인하고 판매처나 제조사에 문의하고자 할 때, 체계적이고 객관적인 증거를 준비해 두면 심사 절차를 크게 단축할 수 있습니다:",
          "1. 기기 정보 기록: 정확한 제품 모델명, 하드웨어 리비전, 시리얼 번호를 메모합니다 (시리얼 번호는 공식 문의용으로만 보관하고 공개 인터넷 포럼에는 노출하지 마십시오).",
          "2. 구매 증빙 보관: 구매 영수증, 전자 세금계산서, 배송 조회 내역, 결제 일자를 챙깁니다.",
          "3. 정책 문서 확인: 판매처의 초기 교환 마감일과 해당 모델의 제조사 공식 화소 정책 문서를 북마크해 둡니다.",
          "4. 점검 일지 작성: 점검 일자, 실내 조명 상태, 사용 해상도, 결함의 위치(중앙부인지 모서리인지)를 기록합니다.",
          "5. 색상별 반응 기록: 어떤 단색 배경에서 결함이 선명하게 나타나고 어떤 색상에서 숨겨지는지 정리합니다.",
          "6. 사진 증빙 촬영: 단색 배경에서 결함 부위를 선명하게 확대한 접사 사진과, 화면 전체에서 결함이 어느 위치에 있는지 보여주는 원거리 사진을 함께 촬영합니다.",
          "개인정보 보호 주의사항: 고객 지원 센터나 판매처에 사진이나 증빙 서류를 전송할 때는 자택 주소, 전화번호, 카드 결제 번호, 계정 암호 등 민감한 개인정보를 반드시 마스킹(가림 처리)하여 제출하십시오."
        ],
        "bullets": [
          "기기 식별: 공식 지원 접수를 위해 모델명과 시리얼 번호를 사적으로 기록해 둘 것.",
          "주문 서류: 구매 영수증, 배송 확인서, 판매처 교환 기한을 준비해 둘 것.",
          "사진 증빙: 결함 확대 사진과 화면 전체 구도가 담긴 사진을 함께 준비할 것.",
          "개인정보 보호: 결제 정보, 주소, 연락처 등 민감 정보는 제출 전 반드시 가릴 것."
        ]
      },
      {
        "title": "불량 화소를 발견했을 때의 행동 흐름: 의사결정 모델",
        "content": [
          "Screen Tester로 모니터를 점검한 후 취해야 할 올바른 조치는 다음의 체계적인 흐름을 따라 결정할 수 있습니다:",
          "육안 관찰 → 여러 테스트 패턴으로 이상 재확인 → 객관적 기록 → 판매처 초기 교환·반품 기한 확인 → 제조사 보증·RMA 기준 확인 → 법정 소비자 권리 검토 → 적절한 지원 경로 선택.",
          "점검 결과는 당사의 표준 평가 용어로 분류하십시오:",
          "• 정상으로 보임 (Looks normal): 패널이 모든 RGB 및 흑백 단색 배경에서 균일하게 발색하며 지속적인 암점이나 휘점이 관찰되지 않음.",
          "• 주의 필요 (Needs attention): 하나 이상의 테스트 배경에서 영구적인 검은 점이나 색상 서브픽셀이 명확히 지속 관찰됨. 기록을 남기고 규정과 대조할 것.",
          "• 확인 필요 (Unsure): 미세한 점이 보이나 시야각을 바꾸면 위치가 달라지는 등 외부 먼지로 의심됨. 극세사 천으로 닦은 후 재시험할 것.",
          "평가 결과가 '주의 필요'라면 판매처의 초기 반품 기한을 최우선으로 확인하십시오. 기한이 경과했다면 제조사 RMA 기준을 검토하고, 해결되지 않는 분쟁은 공적 소비자 상담을 고려하십시오."
        ],
        "bullets": [
          "행동 흐름: 관찰 → 다중 패턴 확인 → 증거 기록 → 판매처 기한 → RMA 기준 → 절차 진행.",
          "정상으로 보임: 모든 단색 검사 화면에서 얼룩 없이 균일하게 표현되는 상태.",
          "주의 필요: 다수의 단색 화면에서 영구적인 결함이 명확히 확인되는 상태.",
          "확인 필요: 외부 먼지나 이물질 가능성이 있으므로 화면을 닦은 뒤 각도를 바꿔 재검사."
        ]
      },
      {
        "title": "불량 화소에 대한 흔한 오해와 사실",
        "content": [
          "널리 퍼져 있는 잘못된 인식을 바로잡으면 불필요한 혼란을 예방하고 현실적인 결정을 내릴 수 있습니다:",
          "오해 1: '불량 화소가 1개라도 있으면 무조건 새 제품으로 교환받는다.' 사실: 완전 무결점 보증이 명시되어 있거나 판매처 초기 반품 기간 내인 경우를 제외하면, 일반 제조사 보증은 일정 개수 이상의 결함을 요구합니다.",
          "오해 2: 'ISO 규격은 결함이 전혀 없는 패널을 보장한다.' 사실: ISO 9241-307은 각 등급별 허용 공차 기준을 규정한 공학 지표이며 무결점을 보증하지 않습니다.",
          "오해 3: '제조사 품질 보증과 판매처의 반품 정책은 동일하다.' 사실: 판매처 반품은 판매자의 초기 고객 서비스 정책이며, 제조사 보증은 브랜드의 장기적 결함 보상 계약입니다.",
          "오해 4: '반품 가능 기한은 법적으로 항상 14일이다.' 사실: 반품 기간은 유통사, 국가, 제품 분류, 구매 방식(온라인 vs 오프라인)에 따라 제각각이며 단일한 전 세계 공통 기한은 없습니다.",
          "오해 5: 'Screen Tester로 ISO 규격 위반을 법적으로 입증할 수 있다.' 사실: Screen Tester는 사람의 눈으로 관찰하기 위한 화면 패턴을 띄워주는 도구이며 공인 검사 인증서를 발행하지 않습니다.",
          "오해 6: '사진 한 장만 보내면 무조건 무상 보증이 승인된다.' 사실: 사진은 유용한 초기 심사 자료이지만, 제조사는 자체 규정표와 실물 점검을 종합하여 최종 승인을 결정합니다.",
          "오해 7: '모든 스턱 픽셀은 소프트웨어로 고칠 수 있다.' 사실: 빠른 색상 전환 패턴이 굳어 있는 액정 분자를 깨우는 데 도움을 줄 수 있지만, 회로 단선이나 파손은 소프트웨어로 복구할 수 없습니다."
        ],
        "bullets": [
          "단일 결함 처리: 1개의 암점은 일반 제조사 보증 기준에 미달하는 경우가 많음.",
          "ISO의 본질: 허용 가능한 제조 공차를 정한 규격이며 무결점을 약속하지 않음.",
          "제도의 차이: 유통사 반품 규정과 제조사 RMA는 완전히 별개의 규칙으로 운영됨.",
          "기한의 가변성: 반품 기간은 매장과 조건에 따라 다르므로 개별 확인이 필수적임.",
          "소프트웨어 한계: 급속 색상 자극은 일시적 액정 고착에만 효과가 있으며 영구 파손은 수리 불가."
        ]
      }
    ],
    "faq": [
      {
        "question": "불량 화소가 1개만 있어도 즉시 교환받을 수 있나요?",
        "answer": "제조사 보증 기준으로는 즉시 교환받기 어려운 경우가 많습니다. 대다수 표준 보증 규정은 일정 수량 이상의 결함을 요구하며, 별도의 '무결점 보증' 모델이 아니라면 RMA 승인이 어려울 수 있습니다. 다만 구매 초기 판매처의 교환·반품 기간 내라면 판매점의 고객 만족 정책에 따라 원활하게 교환받을 수 있습니다."
      },
      {
        "question": "스턱 픽셀(휘점)과 데드 픽셀(암점)의 차이는 무엇인가요?",
        "answer": "데드 픽셀은 전원이 들어오지 않아 밝은 배경에서 지속적으로 검은 점으로 나타납니다. 스턱 픽셀은 서브픽셀이 켜진 상태로 고정되어 검은 배경에서 빨간색, 초록색, 파란색 중 하나의 빛을 계속해서 뿜어냅니다."
      },
      {
        "question": "스턱 픽셀 복구 도구를 실행하면 모니터가 고장 날 수 있나요?",
        "answer": "아닙니다. [스턱 픽셀 복구 도구](/tests/stuck-pixel-fixer)는 일반적인 웹 브라우저 그래픽을 통해 전체 화면 색상을 빠르게 전환할 뿐 모니터 전압을 임의로 올리거나 부품을 무리하게 구동하지 않습니다. 다만 깜빡이는 빛에 민감한 분은 도구 실행 중 화면을 직시하지 마십시오."
      },
      {
        "question": "컴퓨터 캡처(스크린샷)에는 왜 데드 픽셀이 찍히지 않나요?",
        "answer": "스크린샷은 그래픽 카드 메모리에서 모니터로 신호를 보내기 전에 생성된 디지털 이미지 데이터를 저장합니다. 불량 화소는 모니터 패널 하드웨어의 물리적 손상이므로 디지털 파일에는 결함이 존재하지 않습니다. 카메라나 스마트폰으로 외부에서 직접 촬영해야 합니다."
      },
      {
        "question": "ISO 9241-307 결함 등급과 제조사 보증의 차이는 무엇인가요?",
        "answer": "ISO 9241-307은 디스플레이의 품질 등급과 측정 방법을 규정한 국제 산업·공학 규격입니다. 제조사 보증은 하드웨어 제조사와 구매자 사이에 체결된 사적 상업 계약으로 구체적인 RMA 수리·교환 기준을 규정합니다."
      },
      {
        "question": "불량 화소를 발견하면 판매처와 제조사 중 어디에 먼저 연락해야 하나요?",
        "answer": "먼저 구매한 판매처의 초기 불량·반품 가능 기간인지 확인하십시오. 이 기간 내라면 판매처를 통하는 것이 절차가 훨씬 빠르고 유연합니다. 판매처 기한이 지났다면 제조사 품질 보증서를 확인하여 RMA 접수 대상인지 검토하십시오."
      },
      {
        "question": "ISO 9241-307 규격이 법적으로 환불이나 교환을 강제하나요?",
        "answer": "아닙니다. ISO 9241-307은 인체공학적 품질 분류 및 평가를 위한 기술 규격입니다. 그 자체가 소비자에게 자동적인 환불이나 교환 법적 권리를 부여하지 않습니다. 실제 권리는 제조사 보증 계약, 판매처 규정, 관련 소비자 보호 법률에 따라 결정됩니다."
      },
      {
        "question": "모니터 반품 기간은 '14일' 등으로 전 세계가 동일한가요?",
        "answer": "아닙니다. 반품 기간은 쇼핑몰, 국가, 온·오프라인 구매 방식, 상품군에 따라 천차만별입니다. 전 세계적으로 통일된 단일 기한은 없습니다. 구매 영수증이나 쇼핑몰 이용 약관에 기재된 날짜를 반드시 확인하십시오."
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
    "title": "백라이트 블리드 vs IPS 글로우: 차이점 구분 및 커브드 모니터 특성",
    "subtitle": "베젤 압력, 커브드 패널 기하학, 액정 복굴절 및 암실 시각 진단.",
    "description": "백라이트 블리드와 IPS 글로우의 차이점, 시야각 및 화면 곡률이 시각적 인식에 미치는 영향, 암실에서의 육안 점검 절차를 확인하세요.",
    "directAnswer": "백라이트 블리드는 베젤 가장자리에서 물리적으로 빛이 새어 나오는 현상으로 시야각과 관계없이 고정된 위치에 머무르며, IPS 글로우는 보는 각도에 따라 위치와 강도가 변하는 패널 고유의 광학적 특성입니다.",
    "whyItMatters": "평면 또는 커브드 화면에서 발생하는 정상적인 각도별 글로우를 제품 불량으로 오인하면, 동일한 광학 특성을 가진 교환품을 다시 받게 되는 불필요한 반품으로 이어집니다. 반면 베젤 조립 압박으로 인한 실제 기계적 백라이트 블리드는 암실 명암비를 영구적으로 저하시킵니다. 화면 곡률, 시청 거리, 패널 방식이 주변부 시각에 미치는 영향을 파악해야 정확한 점검과 판단이 가능합니다.",
    "whatToLookFor": [
      "백라이트 블리드: 베젤 가장자리와 모서리에서 안쪽으로 뻗어 나오는 강한 흰색 또는 노란색 빛줄기로 머리를 움직여도 위치가 고정됨",
      "IPS 글로우: 화면 네 모서리에 나타나는 은빛, 황금빛 또는 보라색 계열의 확산광으로 해당 모서리를 정면에서 바라보면 사라지거나 이동함",
      "커브드 모니터 주변부 빛 번짐: 설계된 곡률 반경보다 너무 가깝거나 멀리 앉았을 때 좌우 외곽 날개 영역에 집중되는 확산광",
      "VA 패널 시야각 감마 시프트: 커브드 또는 평면 VA 패널을 비스듬한 각도에서 바라볼 때 암부 디테일이 들뜨고 색상이 빠지는 현상",
      "베젤 압박 지점: 케이스 나사 결합부나 프레임 이음새 부근에서 나타나는 횃불 모양의 뚜렷한 빛샘"
    ],
    "howToTest": [
      "야간에 모든 실내 조명과 반사광을 차단한 완전한 암실 환경에서 점검을 진행합니다",
      "모니터 OSD 밝기를 극단적인 최대 밝기 대신 편안하고 일반적인 SDR 밝기 수준으로 설정합니다(표준 작업 환경이 아니라면 100% 최대 밝기로 강제하는 것을 지양하십시오).",
      "Screen Tester에서 [백라이트 블리드 테스트](/tests/backlight-bleed-test)를 전체 화면으로 실행하여 순수 블랙 캔버스를 띄웁니다",
      "모니터 설계 곡률 반경(예: 1000R은 약 1.0m) 거리에 앉아 눈높이를 화면 중앙에 맞춥니다",
      "시차 머리 이동 테스트: 머리를 좌우 및 상하로 움직여 모서리를 정면으로 바라봅니다. 빛이 흐려지거나 이동하면 광학적 글로우입니다",
      "2~3미터 뒤로 물러섭니다: 각도 의존적인 글로우는 거리가 멀어지면 크게 줄어들지만, 실제 물리적 빛샘은 베젤 끝에 선명히 남습니다"
    ],
    "whatScreenTesterCanObserve": [
      "평면 및 커브드 디스플레이 전면에 걸친 디지털 순수 블랙(RGB 0, 0, 0) 테스트 화면 표시",
      "사용자 머리 이동에 따른 고정 빛샘과 각도 의존적 글로우의 시각적 구분 관찰",
      "곡률 초점 반경에서 수직 시선 정렬을 확인하기 위한 중앙 십자선 옵션 제공",
      "체감 블랙 레벨 균일도 점검을 위한 단계별 암부 그레이 배경(1%~5%) 지원",
      "점검 과정에서 사용자가 관찰하고 기록한 시각적 이상, 거리별 변화 및 암실 점검 메모"
    ],
    "whatScreenTesterCannotDetermine": [
      "제곱미터당 칸델라(cd/m² 또는 니트) 단위의 물리적 광도 출력 및 절대 명암비",
      "모니터 외곽 나사의 체결 토크, 섀시 압박 압력 및 구조적 프레임 곡률 공차",
      "액정 분자의 광학적 위상 지연값(복굴절) 및 편광 필름 투과 효율의 수학적 수치",
      "물리적 시점 이동 없는 상태에서의 유리 응력 휨과 편광 필름 누설의 자동 판별",
      "제조사 무상 보증 결함 기준, RMA 교체 승인 여부 및 판매처 반품 규정 적격성"
    ],
    "commonCauses": [
      "백라이트 블리드: 공장 조립 시 베젤의 과도한 체결 압력으로 패널 적층체 외곽이 압박됨",
      "백라이트 블리드: 장시간 구동에 따른 열팽창으로 내부 도광판(LGP)이나 섀시 프레임이 미세하게 휨",
      "IPS 글로우: In-Plane Switching 구조에서 수평 배열된 액정 분자의 사각 입사광에 의한 본질적 복굴절",
      "곡률 기하학적 요인: 모니터 설계 곡률 반경보다 현저히 가깝게 앉아 주변부 가장자리가 가파른 사각으로 시선에 들어오는 경우.",
      "커브드 VA 감마 시프트: 수직 배열 액정을 비스듬히 통과하는 빛으로 인해 외곽 가장자리의 암부 톤이 밝아짐"
    ],
    "whatToDoNext": [
      "화면 가장자리의 사각을 최소화할 수 있도록 모니터의 정격 곡률 반경(초점 거리) 부근에 시청 거리를 맞추십시오.",
      "화면에 직접적인 반사를 일으키지 않으면서 어두운 방에서 동공 확장을 줄이고 인식되는 블랙 깊이를 높이기 위해 디스플레이 뒤편에 은은하고 자연스러운 주변 조명(바이어스 조명)을 배치하십시오.",
      "[균일도 테스트](/tests/uniformity-test)로 암부 그레이 균일도를 점검하고 [모니터 시야각 가이드](/guides/monitor-viewing-angles-explained)를 참조하세요",
      "2미터 거리에서 정면으로 보아도 강한 백색 또는 황색 빛줄기가 베젤에 고정되어 있다면 판매처에 제품 교환을 문의하세요"
    ],
    "sections": [
      {
        "title": "빛 누출의 물리적 메커니즘: 베젤 압박 vs 광학적 복굴절",
        "content": [
          "액정 디스플레이(LCD)는 스스로 빛을 내지 못합니다. 엣지형 LED나 직하형 백라이트의 빛은 반사 시트, 확산판, 프리즘 시트, 편광 필터, 액정 기판으로 구성된 복잡한 광학 적층체를 통과해야 합니다.",
          "백라이트 블리드는 기계적 조립 결함입니다. 모니터 베젤이나 내부 브래킷이 패널 외곽에 불균일한 압력을 가하면 광학 적층체가 국소적으로 눌립니다. 이 변형으로 인해 미세한 틈새가 생겨 백라이트 빛이 액정의 제어를 거치지 않고 그대로 새어 나와 횃불 모양의 고정된 빛 번짐을 유발합니다.",
          "반면 IPS 글로우는 In-Plane Switching 패널 구조에서 나타나는 고유한 광학적 특성입니다. IPS 패널에서는 액정 분자가 기판과 수평으로 배열됩니다. 수직(90도)에서 볼 때는 빛이 완벽히 차단되지만, 비스듬한 각도에서 빛이 통과할 때는 미세한 광학적 위상 지연(복굴절)이 발생하여 은빛이나 황금빛의 확산광으로 관찰됩니다."
        ],
        "bullets": [
          "백라이트 블리드는 기계적 조립 결함이며, 제어되지 않은 빛이 틈새로 새어 나옵니다.",
          "IPS 글로우는 수평 액정의 사각 복굴절로 인해 발생하는 본질적 광학 특성입니다.",
          "블리드는 베젤 특정 위치에 고정되지만, 글로우는 머리를 움직이면 화면을 따라 이동합니다."
        ]
      },
      {
        "title": "커브드 디스플레이: 시청 기하학과 광학 입사각",
        "content": [
          "커브드 모니터는 1000R, 1500R, 1800R과 같은 특정 곡률 반경을 기준으로 설계됩니다(숫자는 밀리미터 단위의 가상 원 반경으로, 1000R은 반경 1.0m를 의미함). 인체공학적 주요 목적은 가로로 긴 화면의 모든 지점까지 눈과의 거리를 일정하게 유지하는 것입니다.",
          "하지만 곡률은 빛의 입사각을 근본적으로 변화시킵니다. 사용자가 곡률의 초점 중심(1000R의 경우 1.0m 거리)에 앉으면 중앙과 좌우 모서리를 바라보는 시선이 모두 수직에 가깝게 유지됩니다. 그러나 초점보다 너무 가깝게 앉거나(예: 1800R 패널에 50cm 거리) 중심에서 벗어나면 외곽 모서리가 심한 사각으로 시야에 들어옵니다.",
          "이 기하학적 변화는 균일성 체감에 큰 영향을 미칩니다. 커브드 IPS 모니터에서 너무 가깝게 앉으면 외곽 모서리가 급격한 사각이 되어 글로우가 심하게 느껴집니다. 모니터 곡률 자체가 백라이트 블리드를 유발하는 것은 아니며, 눈에 닿는 빛의 각도를 변화시키는 것입니다."
        ],
        "bullets": [
          "곡률 수치(1000R, 1500R, 1800R)는 밀리미터 단위의 이상적인 초점 거리를 의미합니다.",
          "초점 반경을 벗어나 앉으면 화면 외곽 가장자리를 급격한 사각에서 바라보게 됩니다.",
          "곡률은 시각적 기하학을 변화시킬 뿐, 곡률 자체로 인해 물리적 빛샘이 생기는 것은 아닙니다."
        ]
      },
      {
        "title": "커브드 화면에서 물리적 백라이트 블리드와 각도 의존적 글로우 구분법",
        "content": [
          "커브드 화면의 밝은 영역이 무상 교체 대상 불량인지 정상 글로우인지 판별하려면 시차(Parallax) 머리 이동 테스트를 사용해야 합니다.",
          "1단계: 실내를 완전히 어둡게 하고 [백라이트 블리드 테스트](/tests/backlight-bleed-test)로 순수 블랙 화면을 띄웁니다. 일반 작업 위치에서 모서리의 밝은 부분을 확인합니다.",
          "2단계: 머리를 좌우 및 상하로 천천히 움직입니다. 밝은 영역이 화면을 따라 미끄러지듯 이동하거나 색감이 변하거나 약해진다면 시야각에 의한 광학적 글로우입니다.",
          "3단계: 문제가 되는 모서리와 시선이 수직(90도)이 되도록 정면에서 똑바로 바라봅니다. 정면에서 보았을 때 빛 번짐이 사라진다면 정상적인 광학 허용 범위입니다. 반면 2미터 뒤에서 정면으로 보아도 베젤 프레임에 강한 빛줄기가 달라붙어 있다면 물리적 백라이트 블리드입니다."
        ],
        "bullets": [
          "시차 이동 테스트: 머리를 움직여 밝은 영역이 이동하는지 고정되어 있는지 확인하세요.",
          "수직 모서리 점검: 모서리를 똑바로 보았을 때 빛이 사라진다면 광학적 글로우입니다.",
          "물리적 블리드 확인: 2미터 거리에서도 베젤에 고정된 채 빛이 샌다면 프레임 압박 결함입니다."
        ]
      },
      {
        "title": "커브드 패널 방식별 특성 비교: IPS, VA, TN 및 OLED",
        "content": [
          "디스플레이 패널 방식에 따라 커브드 구조에서의 광학적 거동이 상이하므로 패널 기술을 바탕으로 관찰해야 합니다:",
          "IPS: 정확한 색상 표현과 넓은 시야각을 자랑합니다. 그러나 수평 액정 특성상 커브드 IPS는 초점 반경 밖에서 볼 때 모서리 글로우가 두드러질 수 있습니다. A-TW 편광판으로 억제할 수 있으나 고가 전문가용에 국한됩니다.",
          "VA: 암부에서 액정이 수직으로 정렬되어 3,000:1~5,000:1의 높은 명암비를 제공하며, 암실 블랙 화면에서 글로우가 극히 적습니다. 다만 비스듬히 보면 암부가 들뜨는 감마 시프트가 발생하므로, 대형 VA 패널은 주변부를 눈과 수직으로 맞추어 색상 왜곡을 방지하기 위해 적극적으로 곡률을 적용합니다.",
          "TN: 응답속도가 빠르지만 좁은 시야각과 상하 반전이 발생하여 최신 커브드 모니터에서는 거의 쓰이지 않습니다.",
          "유기 발광 다이오드(OLED): 각 서브픽셀이 독립적으로 자체 발광하는 구조입니다. OLED 디스플레이는 개별 서브픽셀을 완전히 꺼서 진정한 깊은 블랙을 표현하며, 평면과 곡면 모두에서 백라이트 블리드나 IPS 글로우가 전혀 발생하지 않습니다. 곡면 OLED는 넓은 각도에서도 암실 명암비를 안정적으로 유지합니다."
        ],
        "bullets": [
          "IPS: 탁월한 색 정확도를 제공하지만 깊은 블랙 화면에서 특유의 사각 글로우가 발생합니다.",
          "VA: 3,000:1 이상의 깊은 명암비. 곡률 설계는 측면 시야각 감마 시프트를 보완합니다.",
          "TN: 좁은 시야각과 색 반전으로 인해 현대 커브드 모니터 제품군에서는 드뭅니다.",
          "OLED: 자체 발광 픽셀을 통해 백라이트 블리드와 IPS 글로우를 근본적으로 배제합니다."
        ]
      },
      {
        "title": "커브드 디스플레이를 위한 표준 암실 점검 프로토콜",
        "content": [
          "커브드 화면의 빛 분포를 정확하게 평가하려면 주변 환경 간섭을 배제한 절차를 따라야 합니다:",
          "1. 실내 조명 통제: 천장 조명과 스탠드를 끕니다. 오목한 커브드 화면은 사용자 뒤쪽의 조명을 집광하여 길쭉한 반사 띠를 만들어냅니다.",
          "2. 초점 위치 정렬: 모니터 규격 곡률 반경(1000R=1.0m, 1500R=1.5m)에 맞추어 앉고, 눈높이를 화면의 수직 중앙에 맞춥니다.",
          "3. 밝기 정상화: 모니터 OSD 밝기를 실내 조명에 적합한 편안하고 일반적인 SDR 밝기 수준으로 조정하십시오. 칠흑 같은 어둠 속에서 최대 밝기로 화면을 평가하면 빛샘과 광학적 글로우가 비현실적으로 과장되어 보입니다.",
          "4. Screen Tester 실행: [백라이트 블리드 테스트](/tests/backlight-bleed-test)로 전체 화면 블랙 상태를 점검하고, [균일도 테스트](/tests/uniformity-test)에서 짙은 회색 패턴을 전환해가며 휘도 분포를 평가하십시오. [시야각 테스트](/tests/viewing-angle-test) 및 [모니터 시야각 가이드](/guides/monitor-viewing-angles-explained)를 참조하여 시야각에 따른 색상 안정성을 확인하십시오."
        ],
        "bullets": [
          "오목 화면의 집광 반사를 방지하기 위해 실내 모든 조명을 차단하세요.",
          "제조사 곡률 반경(1000R, 1500R, 1800R)에 맞는 초점 거리에 정확히 착석하세요.",
          "최대 밝기를 무리하게 강제하기보다는 편안하고 일반적인 SDR 밝기로 설정하십시오.",
          "짙은 회색 패턴을 활용하여 국소적인 베젤 압박 부위와 패널 전반의 완만한 그라데이션을 구분하십시오."
        ]
      },
      {
        "title": "고객 지원 접수를 위한 증빙 기록 및 제조사 보증 정책 이해",
        "content": [
          "육안 점검 결과 물리적 백라이트 블리드로 의심되는 빛샘이 확인되었다면 문의 전 객관적 증빙을 마련해야 합니다:",
          "선택적 카메라 촬영 기록: 육안을 통한 직접적인 관찰이 디스플레이 평가의 최우선 기준입니다. 카메라 센서의 다이내믹 레인지, 자동 톤 매핑, 화이트 밸런스, 후처리 알고리즘은 실제 시각적 모습을 크게 왜곡하므로 사진이 육안을 대신할 수는 없습니다. 교환 문의나 비교를 위해 사진을 남길 경우, 촬영 간 노출 설정을 일정하게 유지하면 사진 간의 비교 정확도를 높일 수 있습니다. 지나치게 밝게 찍히는 자동 야간 모드를 피하고, 수동 모드를 활용하여 실제 눈으로 보는 모습과 유사하게 미리보기를 조정한 뒤 촬영하십시오.",
          "다각도 촬영: 초점 거리에서의 전체 화면 사진과 문제 모서리 정면에서 수직으로 찍은 근접 사진 두 장을 촬영합니다. 정면 근접 사진에서도 빛줄기가 선명하다면 베젤 압박 결함의 명확한 증거가 됩니다.",
          "판매처 및 제조사 처리: 제조사 보증 규정은 광학적 글로우를 정상 범위로 판정하는 경우가 많습니다. 시각적으로 불편하다면 판매처의 초기 반품 및 교환 기간을 활용하는 것이 가장 확실합니다. Screen Tester의 [문제 해결 가이드](/knowledge-base/troubleshooting)를 참조하세요."
        ],
        "bullets": [
          "스마트폰 카메라의 야간 모드를 끄고 수동 노출로 육안 밝기와 일치시키세요.",
          "초점 거리 전체 샷과 모서리 수직 접사 샷을 함께 확보하여 고정 여부를 입증하세요.",
          "제조사 RMA 절차보다 판매처 초기 반품 및 교환 창구가 훨씬 신속합니다.",
          "추가 점검 사항은 Screen Tester의 [문제 해결 가이드](/knowledge-base/troubleshooting)를 참조하세요."
        ]
      }
    ],
    "faq": [
      {
        "question": "화면이 휘어져 있다는 사실 자체가 백라이트 블리드를 유발하나요?",
        "answer": "아닙니다. 곡률 자체가 백라이트 블리드를 발생시키는 것은 아닙니다. 백라이트 블리드는 프레임 체결 압력이나 조립 공차 등 기계적 요인에 의해 발생합니다. 다만 초점 거리를 벗어나 앉으면 주변부를 비스듬한 각도로 바라보게 되어 정상적인 광학적 글로우가 더 눈에 띄게 느껴질 수 있습니다."
      },
      {
        "question": "커브드 모니터에 가까이 앉으면 모서리가 뿌옇게 빛나는 이유는 무엇인가요?",
        "answer": "모니터의 설계 곡률 반경보다 현저히 가깝게 앉으면 시선이 가장자리 끝에 매우 가파른 사각으로 닿게 됩니다. IPS 패널에서는 이것이 사각 방향의 액정 복굴절(IPS 글로우)을 유발합니다. 권장 초점 거리로 물러나면 시선이 화면과 수직에 가까워져 모서리의 들뜸 현상이 현저히 줄어듭니다."
      },
      {
        "question": "대부분의 커브드 게이밍 모니터가 IPS 대신 VA 패널을 쓰는 이유는 무엇인가요?",
        "answer": "VA 패널은 3,000:1 이상의 깊은 명암비를 제공하여 암실 블랙 화면에서 글로우가 거의 없습니다. 또한 VA는 측면 시야각에서 색상이 바래는 감마 시프트가 발생하기 쉬운데, 화면을 곡면으로 설계하여 가장자리를 눈과 수직으로 맞춰주면 이 단점을 효과적으로 억제할 수 있기 때문입니다."
      },
      {
        "question": "스마트폰으로 빛샘을 찍을 때 과도한 밝기 왜곡 없이 정확히 찍으려면?",
        "answer": "사진 기록은 선택 사항일 뿐 육안을 통한 직접 검사를 대신할 수 없습니다. 카메라 센서와 노출 알고리즘이 인식되는 밝기를 왜곡하기 때문입니다. 자동 야간 모드로 인한 과도한 노출을 피하고, 수동 촬영이 가능하다면 노출을 고정하여 실제 암실에서 눈으로 보는 밝기와 유사하게 맞춰 촬영하십시오."
      },
      {
        "question": "Screen Tester로 모니터의 물리적 명암비나 니트 밝기를 직접 측정할 수 있나요?",
        "answer": "아닙니다. Screen Tester는 웹 브라우저 환경에서 동작하며 운영체제를 통해 디지털 테스트 화면을 렌더링합니다. 웹 브라우저는 외부 휘도계나 색도계 센서와 물리적으로 연결되지 않으므로 니트(cd/m²)나 하드웨어 명암비를 측정할 수 없습니다. 이 도구는 육안 검사를 돕는 표준 패턴을 제공합니다."
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
    "title": "모니터 고스팅, 모션 블러 및 오버드라이브 오버슈트",
    "subtitle": "VA 암부 스미어링, 응답 시간 오버드라이브 튜닝, 역고스팅(코로나) 및 모션 잔상.",
    "description": "VA 모니터에서 암부 스미어링이 발생하는 이유, 과도한 오버드라이브가 밝은 후광이나 역고스팅을 유발하는 원인, Screen Tester를 통한 시각적 진단 방법을 설명합니다.",
    "directAnswer": "모니터 고스팅은 액정 분자의 느린 전환으로 인해 발생하는 끌림 현상으로, 특히 VA 패널의 어두운 톤 및 니어 블랙 계조 간 전환에서 두드러집니다. 반대로 오버드라이브 오버슈트(역고스팅)는 과도한 전압이 액정을 목표 밝기 이상으로 밀어붙일 때 밝거나 반전된 후광(코로나)을 생성하는 현상입니다.",
    "whyItMatters": "오버드라이브 튜닝은 핵심적인 공학적 절충점입니다. 전압 가속이 부족하면 전환이 둔해져 어두운 잔상(스미어링)이 생기고, 지나친 오버드라이브는 목표 계조를 초과하여 눈에 거슬리는 빛나는 코로나를 유발합니다. 최적의 모션 선명도를 얻으려면 주사율과 작동 온도에 맞춰 균형을 잡아야 합니다.",
    "whatToLookFor": [
      "어두운 회색이나 중간 배경 위를 움직이는 어두운 그래픽 뒤에 남는 검은색 또는 보라색 꼬리 끌림 (VA 패널 특유의 암부 스미어링)",
      "움직이는 물체의 윤곽 앞뒤에 나타나는 밝고 하얗게 빛나거나 반전된 색상의 후광/코로나 (오버드라이브 오버슈트 / 역고스팅)",
      "밝은 윤곽선 없이 물체 본래 색상과 일치하는 흐릿한 그림자가 뒤따르는 현상 (느린 전환으로 인한 일반 GtG 고스팅)",
      "샘플 앤 홀드 디스플레이에서 정지 화면을 인간의 망막이 부드럽게 추적하면서 생기는 화면 전체의 균일한 번짐 (MPRT)",
      "낮은 주사율로 전환되거나 가변 주사율(VRR) 환경에서 프레임이 떨어질 때 잔상 길이가 달라지거나 오버슈트 코로나가 갑자기 두드러지는 현상",
      "패널의 물리적 응답 속도가 아니라 GPU 프레임 전달 문제로 인해 발생하는 끊김 또는 스타터링"
    ],
    "howToTest": [
      "Screen Tester에서 [고스팅 테스트](/tests/ghosting-test)를 열고 고대비 및 짙은 회색 배경 위에서 움직이는 블록을 관찰합니다.",
      "저속, 중속, 고속으로 속도를 전환하여 이동 속도에 따라 꼬리 길이가 어떻게 변하는지 확인합니다.",
      "모니터 OSD 메뉴를 열고 오버드라이브 / 응답 시간 설정을 찾습니다 ([모니터 OSD 설정 가이드](/guides/monitor-osd-settings-explained) 참조).",
      "지원되는 오버드라이브 단계(예: 끄기, 보통, 빠름, 매우 빠름 등)를 순차적으로 변경하며 밝은 후광 없이 끌림을 줄여주는 최적 단계를 찾습니다.",
      "[모션 블러 테스트](/tests/motion-blur-test)를 실행하여 안구 망막 잔상(샘플 앤 홀드)과 액정 분자의 물리적 응답 지연을 구분합니다.",
      "G-Sync 또는 FreeSync를 사용하는 경우, [VRR 테스트](/tests/vrr-test)를 통해 낮은 프레임 구간에서 오버슈트가 발생하는지 점검합니다.",
      "주로 작업하는 일반 주사율 환경에서, 그리고 디스플레이가 열적 평형에 도달한 후 관찰을 완료합니다."
    ],
    "whatScreenTesterCanObserve": [
      "움직이는 테스트 패턴 뒤에 나타나는 어두운 꼬리, 색상 윤곽 및 밝은 오버슈트 코로나의 시각적 관찰",
      "다양한 대비 조합(블랙 위 다크 그레이, 그레이 위 시안 등)으로 보정된 테스트 패턴 렌더링",
      "모니터 OSD 오버드라이브 설정 변경에 따른 꼬리 끌림 길이 및 후광 강도의 상대적인 시각적 변화",
      "다양한 주사율 설정에서 테스트할 때 사용자가 관찰하는 움직임 선명도의 차이",
      "인간의 망막 추적 잔상과 물리적 액정 전환 지연 사이의 비교 감별"
    ],
    "whatScreenTesterCannotDetermine": [
      "실험실 환경에서 광다이오드 및 오실로스코프로 측정한 밀리초(ms) 단위의 GtG(Gray-to-Gray) 응답 곡선",
      "모든 시작 및 종료 밝기 계조를 아우르는 256단계 픽셀 전환 매트릭스",
      "동기화된 고속 추적 카메라를 사용하여 측정한 공인 MPRT(동영상 응답 시간)",
      "패널 타이밍 컨트롤러(T-Con)의 구동 전압 파형 및 정밀한 오버슈트 백분율",
      "디스플레이의 전체 입력 지연(인풋랙) 또는 내부 스케일러 이미지 처리 지연 시간"
    ],
    "commonCauses": [
      "어두운 색상 간 및 니어 블랙 계조에서 액정 분자의 재배열 속도 저하 (VA 패널 구조의 대표적 물리적 특성)",
      "모니터 오버드라이브 / Trace Free / AMA 설정이 공격적인 'Extreme'으로 지정되어 심각한 전압 오버슈트 발생",
      "모니터 오버드라이브가 비활성화되거나 'Off'로 설정되어 액정에 전압 가속이 전혀 가해지지 않음",
      "가변 오버드라이브 보정 없이 고정 설정되어 VRR 게임 시 프레임이 낮아질 때 과도한 코로나 유발",
      "낮은 실내 온도로 인해 디스플레이가 예열되기 전 액정 유체의 점도가 일시적으로 상승",
      "GPU 프레임 페이싱 불균형이나 V-Sync 누락을 패널 응답 속도 문제로 오인하는 경우"
    ],
    "whatToDoNext": [
      "모니터 OSD에서 표준적인 뉴트럴 화면 프로필을 선택하고 과도한 인위적 선명도나 극한의 FPS 모드를 피하십시오.",
      "오버드라이브 설정을 균형 잡힌 중간 단계(일반적으로 'Normal' 또는 'Fast')로 설정하고 'Extreme'은 피하십시오.",
      "운영체제 디스플레이 설정에서 모니터가 사양에 맞는 기본 최대 주사율로 작동하는지 확인하십시오.",
      "[고스팅 테스트](/tests/ghosting-test) 및 [모션 블러 테스트](/tests/motion-blur-test)를 통해 끌림 감소 상태를 점검하십시오.",
      "VRR(G-Sync 또는 FreeSync) 게이밍 시 [VRR 테스트](/tests/vrr-test)를 통해 저프레임에서 오버슈트가 발생하지 않는지 확인하십시오.",
      "픽셀 잔상과 무관하게 끊김 현상이 지속되면 [문제 해결 가이드](/knowledge-base/troubleshooting)에서 그래픽 환경을 확인하십시오."
    ],
    "sections": [
      {
        "title": "VA 암부 스미어링: 니어 블랙 전환이 느린 이유",
        "content": [
          "수직 배향(VA) 패널은 전압이 가해지지 않은 휴지 상태에서 액정 분자를 유리 기판에 수직으로 세웁니다. 이 상태에서는 백라이트 빛샘을 대단히 효과적으로 차단합니다. VA 디스플레이는 일반적으로 많은 IPS 디스플레이보다 더 높은 네이티브 정적 명암비를 제공하지만, 정확한 특성은 패널과 모델에 따라 다릅니다.",
          "그러나 완전한 블랙(RGB 0,0,0)에서 짙은 그레이로 전환할 때는 가해지는 전압 차이가 매우 작습니다. 미세한 전압 차이로 액정을 재배열하는 것은 블랙에서 순수 화이트로 바뀌는 전압 전환보다 물리적으로 훨씬 더 많은 시간이 소요됩니다. 어두운 그래픽이 어두운 배경 위를 이동할 때 이 지연이 검거나 보라색 줄무늬로 끌리며 이를 암부 스미어링(Dark-Level Smearing)이라고 부릅니다.",
          "이 현상은 패널 세대, 모니터 모델, 펌웨어, 오버드라이브 튜닝, 온도에 따라 크게 차이가 납니다. 고전압 구동을 적용한 최신 'Fast VA' 패널은 구형 패널에 비해 이 간극을 대폭 줄였습니다. 제조사에서 광고하는 '1ms GtG' 수치는 가장 유리한 단일 시나리오를 측정한 것이며 실제 암부 전환 특성을 대변하지 못합니다."
        ],
        "bullets": [
          "어두운 계조 간 전환은 전압 편차가 작아 화이트 전환보다 액정 분자의 회전 속도가 물리적으로 느립니다.",
          "다크 모드 텍스트를 스크롤하거나 어두운 게임 배경에서 시점을 회전할 때 검은 끌림이 가장 두드러집니다.",
          "패널 세대, 스케일러 보정, 펌웨어 및 온도에 따라 편차가 크므로 단일 밀리초 수치로 일반화할 수 없습니다.",
          "제조사의 1ms 사양은 실사용이 어려운 극한의 오버드라이브 상태에서 측정한 선별된 수치인 경우가 많습니다."
        ]
      },
      {
        "title": "응답 시간 오버슈트 및 역고스팅: 과도한 오버드라이브의 대가",
        "content": [
          "둔한 액정 전환을 가속화하기 위해 모니터 제조사는 오버드라이브(Trace Free, AMA, 응답 속도 등 제조사별 명칭)를 탑재합니다. 이는 프레임 주기 시작 시점에 일시적으로 더 높은 전압 스파이크를 주어 액정 분자를 빠르게 회전시키는 기술입니다.",
          "오버드라이브가 적절히 조율되면 액정은 해당 프레임 시간 내에 목표 밝기에 도달합니다. 하지만 전압이 지나치게 강하면 액정이 목표치를 지나쳐 튀어 오르게 됩니다. 이러한 광학적 오류를 오버슈트(역고스팅 또는 코로나)라고 부릅니다.",
          "역고스팅은 움직이는 물체의 가장자리를 따라 밝게 빛나거나 색상이 반전된 후광으로 나타납니다. 오버드라이브는 직접적인 공학적 절충 관계입니다. 수치를 낮추면 후광은 사라지지만 일반 끌림이 늘어나고, 수치를 높이면 전환은 빨라지지만 눈부신 코로나가 발생합니다. 무작정 최대치로 올린다고 화질이 개선되지 않습니다."
        ],
        "bullets": [
          "오버드라이브는 프레임 시작 시점에 짧은 고전압 서지를 전달하여 액정 분자의 회전을 강제로 가속합니다.",
          "과도한 전압은 액정이 목표 밝기를 지나치게 만들어 밝은 발광 후광(코로나)을 유발합니다.",
          "오버드라이브 튜닝은 일반적인 끌림 번짐과 역고스팅 후광 사이의 직접적인 절충 작업입니다.",
          "설정을 'Extreme' 등 최대로 두면 예외 없이 극심한 오버슈트가 발생하여 모션 선명도를 크게 해칩니다."
        ]
      },
      {
        "title": "5가지 핵심 모션 현상 명확히 구별하기",
        "content": [
          "사용자가 움직임 중의 모든 이상 증상을 단순히 '블러'로 뭉뚱그려 인식하기 때문에 모션 결함은 자주 혼동됩니다. 올바른 진단을 위해서는 동일 화면에서 동시에 발생할 수 있는 5가지 물리적 현상을 구별해야 합니다:",
          "1. 암부 스미어링 (Dark-Level Smearing): 어두운 배경에서 어두운 물체 뒤에 남는 짙은 보라색/검은색 끌림으로, 니어 블랙 액정 전환 지연으로 인해 발생합니다 (VA에서 두드러짐).",
          "2. 일반 고스팅 / 트ेल링 (Conventional Ghosting): 물체 본래 색상과 같은 연한 실루엣이 뒤따르는 현상으로, 프레임 시간보다 GtG 응답 속도가 느릴 때 발생합니다.",
          "3. 오버드라이브 오버슈트 / 역고스팅: 움직이는 모서리를 둘러싼 밝은 후광이나 반전된 테두리(코로나)로, 과도한 오버드라이브 전압에 기인합니다.",
          "4. 망막 잔상 (샘플 앤 홀드 / MPRT): 정지 화면이 유지되는 동안 인간의 눈이 움직이는 물체를 부드럽게 추적하면서 망막에 맺히는 화면 전체의 균일한 번짐입니다. 픽셀 전환이 거의 즉각적인 OLED 디스플레이를 포함한 모든 홀드형 화면에 나타나며 주사율 상승이나 백라이트 스트로빙으로 완화됩니다.",
          "5. 프레임 페이싱 불균형 및 끊김: GPU 프레임 전달 불균형이나 V-Sync 문제로 인한 덜컥거림으로, 디스플레이 패널 응답 속도와는 무관합니다."
        ],
        "bullets": [
          "암부 스미어링: 니어 블랙 액정 전환 지연; 어두운 배경 위 어두운 잔상.",
          "일반 고스팅: 색상이 일치하는 옅은 그림자; 전반적인 액정 GtG 응답 지연.",
          "역고스팅(오버슈트): 밝게 빛나는 후광; 지나친 모니터 오버드라이브 전압.",
          "망막 잔상(MPRT): 화면 전체의 균일한 부드러운 번짐; 주사율 상승으로 개선 가능.",
          "프레임 스타터링: 뚝뚝 끊기는 이동; 패널이 아닌 GPU나 동기화 문제."
        ]
      },
      {
        "title": "VRR 및 주사율에 따른 오버드라이브 상호작용",
        "content": [
          "모니터의 오버드라이브 튜닝은 특정 프레임 지속 시간을 기준으로 최적화됩니다. 165Hz에서 1프레임은 약 6.06ms로 매우 짧아 강한 전압 펄스가 필요합니다. 반면 60Hz에서는 1프레임이 16.67ms로 늘어나 액정이 자연 전환될 시간이 거의 3배나 주어집니다.",
          "고급 스케일러를 갖춘 모니터는 가변 주사율(VRR, G-Sync, FreeSync) 환경에서 주사율이 낮아질 때 전압 강도를 자동으로 낮추는 '가변 오버드라이브'를 탑재합니다. 이를 통해 165Hz에서는 날카로운 전환을 유지하고 60Hz에서는 후광을 방지합니다.",
          "반면 보급형 모니터는 전압 테이블이 고정되어 있어, 165Hz에서 깨끗하던 설정이 고사양 게임에서 60~80Hz로 프레임이 떨어질 때 심한 코로나를 일으킵니다. [VRR 테스트](/tests/vrr-test)와 [고스팅 테스트](/tests/ghosting-test)로 이 특성을 시각적으로 확인하십시오."
        ],
        "bullets": [
          "주사율이 낮아질수록 1프레임 표시 시간이 대폭 늘어납니다 (165Hz의 6.06ms 대 60Hz의 16.67ms).",
          "가변 오버드라이브가 없는 디스플레이는 낮은 VRR 프레임 구간에서 심한 오버슈트 후광을 보일 수 있습니다.",
          "가변 오버드라이브 탑재 모니터는 작동 주사율에 맞춰 전압 펄스를 동적으로 조절합니다.",
          "최대 주사율뿐만 아니라 60~80Hz 환경도 점검하여 프레임 하락 시에도 안정적인 단계를 선택하십시오."
        ]
      },
      {
        "title": "온도, 작동 환경 및 패널 편차",
        "content": [
          "액정 분자는 유체 물질에 떠 있는 상태이며 그 점도는 실내 온도에 크게 영향을 받습니다. 추운 방에서 모니터를 처음 켰을 때는 유체가 뻑뻑해져 분자 회전이 일시적으로 느려집니다.",
          "콜드 부팅 직후에 느껴지는 심한 암부 스미어링도 내부 백라이트의 열기가 패널을 정상 작동 온도로 끌어올림에 따라 서서히 줄어듭니다. 픽셀 전환 동작은 온도를 포함한 작동 환경에 따라 달라질 수 있으므로 일률적인 예열 시간을 규정해서는 안 됩니다. 디스플레이가 열적 평형에 도달한 후 모션 성능을 평가하십시오.",
          "또한 동일한 패널 부품을 공유하는 모니터라 하더라도 스케일러 칩셋, 펌웨어 알고리즘, 공장 오버드라이브 LUT 튜닝에 따라 실제 체감 움직임은 완전히 다를 수 있습니다."
        ],
        "bullets": [
          "추운 실내 환경은 액정 점도를 높여 예열 전까지 잔상을 일시적으로 심화시킵니다.",
          "사용 환경에서 디스플레이가 안정적인 작동 온도에 도달한 후 모션 선명도를 평가하십시오. 고정된 예열 시간을 가정하지 마십시오.",
          "동일한 패널을 사용하더라도 제조사 펌웨어 및 튜닝 방식에 따라 잔상 특성이 달라집니다.",
          "초기 콜드 스타트 시의 잔상을 영구적인 하드웨어 불량으로 단정하지 마십시오."
        ]
      },
      {
        "title": "실전 OSD 점검 절차",
        "content": [
          "전문 장비 없이 모니터에 가장 적합한 오버드라이브 설정을 찾으려면 Screen Tester에서 체계적인 시각 검사를 진행하십시오:",
          "1. 모니터 OSD에서 표준적이고 중립적인 화면 프로필(표준 또는 사용자 정의)을 선택하고 OS 설정에서 목표 주사율을 확인합니다.",
          "2. Screen Tester의 [고스팅 테스트](/tests/ghosting-test)를 실행하고 어두운 회색 및 중간 대비 배경 위를 이동하는 블록을 관찰합니다.",
          "3. 모니터 OSD의 Overdrive / 응답 시간 항목을 열고 ([모니터 OSD 설정 가이드](/guides/monitor-osd-settings-explained) 참조) Off에서 Normal, Fast, Extreme으로 순차 변경합니다.",
          "4. 전환 한계점 찾기: 꼬리 끌림은 확실히 줄어들면서 밝은 발광 후광(오버슈트)이 생기기 직전의 최적 단계를 선택합니다.",
          "5. 고사양 게임에서 VRR을 사용하는 경우 낮은 주사율에서도 후광이 거슬리지 않는지 다시 점검합니다.",
          "무조건 '가장 높은 설정을 쓰라'는 조언은 피해야 합니다. 최적값은 기기마다 다르며 끌림과 후광 사이의 정교한 타협점입니다."
        ],
        "bullets": [
          "1단계: 중립 화면 모드를 설정하고 운영체제에서 기본 주사율을 확인합니다.",
          "2단계: [고스팅 테스트](/tests/ghosting-test)를 실행하여 밝고 어두운 배경에서의 끌림을 관찰합니다.",
          "3단계: OSD에서 오버드라이브 설정을 Off부터 Extreme까지 변경합니다.",
          "4단계: 눈에 띄는 밝은 코로나가 생기지 않는 범위 내에서 가장 높은 단계를 선택합니다.",
          "5단계: VRR 게이밍을 위해 낮은 주사율 구간에서도 안정적인지 교차 점검합니다."
        ]
      },
      {
        "title": "시각적 해석 가이드: 눈으로 본 현상의 원인",
        "content": [
          "테스트 패턴 관찰 시 나타나는 시각 증상과 그 물리적 원인을 파악하는 대조표입니다:",
          "어두운 물체 뒤에 짙은 검은 꼬리가 보임: 어두운 계조의 느린 전환 속도를 의미합니다 (VA 패널 특성). 후광이 생기지 않는 선에서 오버드라이브를 한 단계 올려보고 패널이 예열되었는지 확인하십시오.",
          "움직이는 물체 주변에 밝거나 어두운 코로나가 나타남: 과도한 전압 인가로 인한 오버드라이브 오버슈트(역고스팅)입니다. 모니터 OSD에서 오버드라이브를 한 단계 낮추십시오.",
          "움직일 때 화면 전체가 고르게 흐려짐: 샘플 앤 홀드 디스플레이의 망막 안구 추적 잔상(MPRT)입니다. 주사율을 높이거나 지원되는 경우 백라이트 스트로빙을 활성화하십시오.",
          "주사율에 따라 잔상 특성이 불규칙하게 달라짐: 주사율 의존적인 오버드라이브 설계(VRR 시 가변 오버드라이브 부재). 낮은 FPS에서도 후광이 생기지 않는 보수적인 설정을 선택하십시오.",
          "부드럽지 않고 뚝뚝 끊기거나 덜컥거림: 패널 픽셀 응답 속도가 아니라 GPU 프레임 전달, V-Sync, 브라우저 성능을 먼저 점검하십시오. [문제 해결 가이드](/knowledge-base/troubleshooting)를 참조하십시오."
        ],
        "bullets": [
          "검은 꼬리 잔상 → 어두운 전환 지연; 적절한 오버드라이브 시도 및 온도 확인.",
          "빛나는 후광 → 오버드라이브 과다; OSD 오버드라이브 단계를 낮춤.",
          "전체적인 번짐 → 샘플 앤 홀드 망막 잔상(MPRT); 주사율 올리기.",
          "낮은 FPS에서만 후광 → VRR 시 고정 오버드라이브; 저주사율에도 안정적인 값 선택.",
          "뚝뚝 끊김 → 프레임 페이싱 또는 동기화 결함; [문제 해결 가이드](/knowledge-base/troubleshooting) 참조."
        ]
      }
    ],
    "faq": [
      {
        "question": "VA 모니터가 IPS나 TN 모니터보다 암부 스미어링이 더 심한 이유는 무엇입니까?",
        "answer": "VA 픽셀은 대기 상태에서 액정을 수직으로 세워 빛을 강하게 차단함으로써 높은 명암비를 제공합니다. 그러나 니어 블랙 간의 전환은 매우 미세한 전압 차이로 이루어지므로 물리적 분자 회전이 지연됩니다. 그 정도는 패널 세대, 펌웨어, 오버드라이브, 온도에 따라 다릅니다."
      },
      {
        "question": "밝거나 어두운 '코로나'(오버슈트 / 역고스팅)가 발생하는 원인은 무엇입니까?",
        "answer": "오버슈트는 모니터가 액정 전환을 촉진하려고 지나치게 강한 전압 펄스를 인가할 때 발생합니다. 액정이 목표 밝기에서 부드럽게 멈추지 못하고 목표치를 넘어서면서 물체 주변에 밝거나 반전된 후광이 형성됩니다."
      },
      {
        "question": "모니터의 오버드라이브를 항상 최대 설정으로 두어야 합니까?",
        "answer": "아닙니다. 'Extreme' 등 최대 설정은 거의 예외 없이 극심한 오버슈트(역고스팅)를 초래합니다. 최적의 설정은 모니터마다 다르며 일반 끌림을 줄이면서 방해되는 후광을 방지하는 정밀한 균형점입니다."
      },
      {
        "question": "VRR 게임 중 프레임이 떨어질 때 빛나는 후광이 나타나는 이유는 무엇입니까?",
        "answer": "낮은 주사율(예: 60Hz)에서는 한 프레임의 표시 시간이 길어집니다(165Hz의 6ms 대비 16.7ms). 모니터에 동적 가변 오버드라이브가 없으면 165Hz용으로 설계된 고전압 펄스가 60Hz에서 과도한 오버슈트를 일으킵니다."
      },
      {
        "question": "차가운 실내 온도가 모니터 고스팅을 악화시킬 수 있습니까?",
        "answer": "그렇습니다. 액정 분자는 액체 속에 존재하므로 저온에서는 점도가 높아져 동작이 느려집니다. 추운 방에서 처음 켰을 때는 응답 속도가 느려 보일 수 있으나 내부 열기로 정상 온도에 도달하면 본래 성능으로 회복됩니다."
      },
      {
        "question": "Screen Tester가 모니터의 정확한 응답 시간을 밀리초 단위로 측정할 수 있습니까?",
        "answer": "측정할 수 없습니다. 웹 브라우저는 하드웨어 광다이오드나 오실로스코프와 통신할 수 없습니다. Screen Tester는 끌림과 오버슈트를 시각적으로 관찰할 수 있도록 돕지만, 공인된 밀리초 측정은 실험실 장비가 필요합니다."
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
    "title": "화면 찢김(티어링) 및 V-Sync 동기화 기술",
    "subtitle": "화면 수평 찢김, 프레임 버퍼 스왑, Adaptive Sync, G-Sync, FreeSync 및 지연 시간.",
    "description": "화면 수평 찢김(티어링)이 발생하는 원인, 수직 동기화 및 가변 주사율(VRR)의 해결 원리와 입력 지연 영향을 분석합니다.",
    "directAnswer": "화면 찢김(티어링)은 모니터가 화면을 새로고침하는 도중 그래픽 카드가 새 프레임 버퍼를 교체하여 두 장면이 잘려 보이는 현상입니다.",
    "whyItMatters": "티어링은 게임의 몰입감을 해칩니다. 기존 V-Sync는 찢김을 없애지만 마우스 입력 지연과 미세 끊김(스터터링)을 유발합니다.",
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
    "primarySearchIntent": "화면 찢김 티어링 vsync gsync freesync vrr 입력지연",
    "readingTimeMinutes": 5
  },
  {
    "slug": "text-clarity-and-subpixel-rendering",
    "category": "display-problems",
    "title": "텍스트 가독성, 서브픽셀 배열 및 폰트 렌더링",
    "subtitle": "표준 RGB, BGR, QD-OLED 삼각 서브픽셀, ClearType 및 글자 색 번짐.",
    "description": "글씨가 흐리거나 외곽에 무지갯빛 번짐이 생기는 원인, 서브픽셀 기하학적 구조 및 폰트 선명도 최적화 방법을 살펴봅니다.",
    "directAnswer": "텍스트 가독성은 화소 밀도(PPI), 폰트 안티앨리어싱, 그리고 각 픽셀 내부의 서브픽셀 물리적 배열에 따라 결정됩니다.",
    "whyItMatters": "BGR이나 삼각 QD-OLED 배열 패널의 경우 표준 RGB 스트라이프를 가정한 OS 폰트 엔진에서 글자 가장자리에 색 번짐이 발생합니다.",
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
    "primarySearchIntent": "텍스트 가독성 글자 번짐 서브픽셀 rgb bgr cleartype",
    "readingTimeMinutes": 6
  },
  {
    "slug": "oled-burn-in-and-image-retention",
    "category": "display-problems",
    "title": "OLED ABL, 픽셀 시프트 및 번인 방지 가이드",
    "subtitle": "자동 밝기 제한(ABL), 창 크기별 휘도 변화, 픽셀 오비팅 및 고정 콘텐츠 보호 기술의 이해.",
    "description": "OLED 자동 밝기 제한(ABL)의 창 크기별 작동 원리, 픽셀 시프트가 발생하는 이유 및 화면 상태를 안전하게 점검하는 방법을 설명합니다.",
    "directAnswer": "OLED 자동 밝기 제한(ABL)은 전체 화면의 평균 밝기 수준(APL)에 따라 패널 휘도를 조절하여 전력 소비와 발열을 제어하는 내부 보호 기능이며, 픽셀 시프트(픽셀 오비팅)는 고정된 고대비 경계면의 부하를 주변 서브픽셀로 분산시키기 위해 화면 전체를 주기적으로 몇 픽셀씩 미세하게 이동시키는 기술입니다.",
    "whyItMatters": "OLED 픽셀은 스스로 빛을 내는 유기 발광 다이오드이므로 누적된 열과 전기적 스트레스를 조절하는 것이 패널 수명 연장에 필수적입니다. ABL 특성을 모르는 사용자는 창 크기 조절 시의 밝기 저하를 모니터 불량으로 오해하거나 픽셀 시프트의 미세한 움직임을 화면 떨림으로 착각하기 쉽습니다. 이러한 보호 메커니즘을 정확히 이해하면 OSD 설정을 최적화하고 정상적인 보호 동작과 실제 하드웨어 결함을 올바르게 구분할 수 있습니다.",
    "whatToLookFor": [
      "흰색 문서나 웹 브라우저 창을 작은 크기에서 전체 화면으로 최대화할 때 화면 전체가 부드럽게 어두워지는 현상 (표준 ABL 동작)",
      "가로등이나 불꽃 등 작은 영역의 하이라이트가 넓은 흰색 배경보다 훨씬 더 눈부시고 선명하게 표현되는 특성",
      "데스크톱 화면 전체가 주기적으로 몇 픽셀씩 이동하여 때때로 모니터 한쪽 테두리에 얇은 여백이 나타나는 현상 (픽셀 시프트 / 오비팅)",
      "작업 표시줄, 고정된 메뉴 또는 일시 정지된 영상이 몇 분간 멈춰 있을 때 화면이 점진적으로 어두워지는 현상 (정적 콘텐츠 감광 / ASBL)",
      "고대비 아이콘이나 게임 HUD의 희미한 윤곽이 남았다가 전체 화면 영상을 재생하면 자연스럽게 사라지는 잔상 (일시적 이미지 리텐션)",
      "패널 리프레시 유지관리 주기를 실행한 후에도 단색 그레이나 컬러 화면에서 지워지지 않고 영구적으로 남는 어두운 자국 (영구 번인)"
    ],
    "howToTest": [
      "Screen Tester의 [밝기 테스트](/tests/brightness-test)를 열고 브라우저 창을 작은 크기에서 전체 화면으로 키우며 휘도 변화를 육안으로 관찰합니다.",
      "[HDR 테스트](/tests/hdr-test)를 실행하여 HDR 환경에서 작은 스펙큘러 하이라이트와 넓은 고-APL 화면 사이의 밝기 처리 차이를 확인합니다.",
      "[균일도 테스트](/tests/uniformity-test)에서 5%, 20%, 50%, 100% 균일 그레이 화면을 띄워 잔상 윤곽이나 얼룩(DSE)이 있는지 점검합니다.",
      "[니어 블랙 테스트](/tests/near-black-test)로 순수 블랙 바로 위의 극저휘도 단계(1~16단계)가 뭉개짐(블랙 크러시) 없이 구분되는지 확인합니다.",
      "[그라데이션 및 밴딩 테스트](/tests/gradient-banding-test)를 통해 색상 전환이 매끄럽고 밴딩 현상이 없는지 확인합니다.",
      "[텍스트 선명도 테스트](/tests/text-clarity-test)로 밝은 배경과 어두운 배경에서 글꼴 가독성과 서브픽셀 컬러 프린징을 점검합니다.",
      "[디스플레이 정보](/tests/display-info)에서 브라우저 API가 보고하는 색 심도와 HDR 지원 상태를 확인합니다.",
      "사용 중인 모니터에 밝기 균일화 기능이 있는지 확인하려면 [모니터 OSD 설정 가이드](/guides/monitor-osd-settings-explained)를 참조하십시오."
    ],
    "whatScreenTesterCanObserve": [
      "화면 내 흰색 영역이 넓어짐에 따라 눈으로 체감되는 상대적인 밝기 감소의 시각적 관찰",
      "잔상 윤곽을 점검하기 위한 전체 화면 5%, 20%, 50%, 100% 그레이 및 원색 슬라이드 비교",
      "암부 디테일을 확인하기 위한 순수 블랙 직상의 세밀한 계조 단계(1~16단계) 표시",
      "웹 API를 통해 브라우저가 인식한 색 영역, 색 심도 및 HDR 미디어 쿼리 정보",
      "고대비 텍스트 가장자리에서 관찰되는 서브픽셀 색 번짐의 육안 확인"
    ],
    "whatScreenTesterCannotDetermine": [
      "포토다이오드로 정밀 교정된 1제곱미터당 칸델라(cd/m² 또는 nits) 단위의 절대 휘도 측정",
      "내부 파워서플라이 소비 전력(W), 구동 전류량 또는 패널 제어 보드의 내부 온도 센서 수치",
      "제조사가 펌웨어에 설정한 정확한 ABL 작동 시작점, LUT 곡선 또는 전력 제한 알고리즘",
      "유기 발광 소자의 잔여 수명, 서브픽셀 마모율 백분율 또는 향후 번인 발생 확률",
      "패널 보정 주기 실행 이력, 공장 출하 진단 카운터 또는 정확한 픽셀 시프트 좌표"
    ],
    "commonCauses": [
      "높은 평균 밝기 수준(APL) 화면이 표시되어 전원 공급 장치와 패널 발열을 보호하기 위해 ABL이 작동한 상태",
      "고정된 경계면의 서브픽셀 피로를 줄이기 위해 백그라운드에서 픽셀 시프트(오비팅)가 작동 중인 상태",
      "고정된 문서나 웹페이지를 오래 띄워 두어 펌웨어의 자동 정적 화면 감광(ASBL)이 실행된 상태",
      "균일 휘도 모드 대신 소면적 순간 밝기를 극대화하는 공격적인 HDR 피크 프로필을 선택한 상태",
      "작업 표시줄, 브라우저 상단 바 등 고대비 고정 요소를 높은 밝기로 수 시간 동안 연속 표시한 상태",
      "스위치 멀티탭으로 전원을 즉시 차단하여 대기 모드에서 실행되는 자동 픽셀 리프레시가 중단된 상태"
    ],
    "whatToDoNext": [
      "문서 작업 중 창 크기 변경에 따른 밝기 변화가 불편하다면 OSD에서 '밝기 균일화(Uniform Brightness)' 옵션을 켜십시오.",
      "픽셀 시프트, 로고 밝기 제한, 대기 모드 자동 유지관리 등 제조사 보호 기능을 항상 활성화 상태로 유지하십시오.",
      "OS 설정에서 작업 표시줄 자동 숨김을 설정하고 적절한 화면 꺼짐 시간(적절한 대기 시간)을 지정하십시오.",
      "고정 작업 후 희미한 잔상이 보이면 전체 화면 영상을 재생하거나 모니터를 대기 모드로 두어 보정 사이클을 실행하십시오.",
      "밝기 변화가 불규칙하다고 느껴진다면 [모니터 OSD 설정 가이드](/guides/monitor-osd-settings-explained)와 [문제 해결 가이드](/knowledge-base/troubleshooting)를 참고하십시오."
    ],
    "sections": [
      {
        "title": "OLED 자동 밝기 제한(ABL)의 원리와 목적",
        "content": [
          "유기 발광 다이오드(OLED) 디스플레이는 모든 서브픽셀이 스스로 빛을 내는 자체 발광 구조로, 기존 LCD와 물리적으로 다릅니다. 이 구조에서는 화면 일부만 켤 때 전력 소모가 극히 적지만, 화면 전체를 최고 밝기로 켤 경우 엄청난 전류가 소모되고 얇은 유기물 층에 심한 열이 발생합니다.",
          "전기적 허용치와 열 한계 내에서 안전하게 작동하도록 제조사는 자동 밝기 제한(Automatic Brightness Limiting, ABL)을 탑재합니다. ABL은 화면의 평균 밝기 수준(Average Picture Level, APL)을 실시간으로 감시하여 밝은 영역의 면적이 넓어질수록 화면 전체의 밝기를 점진적으로 낮추는 제어 회로입니다.",
          "이 제한 동작은 모든 OLED 모니터에서 동일하지 않습니다. 제한이 시작되는 화면 비율, 밝기 감소 곡선의 기울기, 전체 화면 최대 휘도는 패널 종류(WOLED, QD-OLED, AMOLED), 패널 세대, 방열판 설계, 펌웨어 및 화면 모드에 따라 크게 다릅니다. 모든 기기에 일괄 적용되는 단일 ABL 곡선은 존재하지 않습니다."
        ],
        "bullets": [
          "자체 발광 픽셀은 켜진 픽셀 수와 목표 밝기에 비례하여 전력을 소비하고 열을 방출합니다.",
          "ABL은 평균 밝기(APL)를 실시간 계산하여 대면적 흰색 화면에서 패널 과열을 막기 위해 밝기를 낮춥니다.",
          "패널 방식(WOLED 대 QD-OLED), 냉각 설계, 펌웨어 버전에 따라 감광 방식이 달라집니다.",
          "ABL은 패널 수명을 지키기 위한 하드웨어 보호 동작이며 백라이트나 전원부 불량이 아닙니다."
        ]
      },
      {
        "title": "콘텐츠와 창 크기에 따라 밝기가 변하는 이유",
        "content": [
          "OLED 모니터를 처음 사용하는 분들은 일반적인 컴퓨터 작업 중 밝기가 저절로 변하는 현상을 경험하게 됩니다. 흰색 창이 작을 때는 화면 전체의 APL이 낮아 패널이 과열되지 않으므로 픽셀들을 비교적 높은 밝기로 유지할 수 있습니다. 그러나 창을 화면 전체로 최대화하면 APL이 급상승하면서 ABL이 작동하여 화면 전체의 밝기를 부드럽게 낮춥니다.",
          "이로 인해 콘텐츠 형태에 따른 시각적 차이가 발생합니다. 어두운 배경에 나타나는 작은 불빛이나 네온사인은 높은 피크 밝기로 눈부시게 빛날 수 있습니다. 반면 전체 화면의 흰색 문서나 설원 풍경은 최고 수준의 APL을 형성하므로 ABL이 가장 강하게 걸려 차분한 밝기로 조정됩니다.",
          "또한 화면 모드에 따라서도 차이가 큽니다. HDR 모드는 작은 하이라이트의 강렬함을 살리는 대신 넓은 화면에서 감광 폭이 커집니다. 반면 SDR 환경에서는 최신 모니터들이 지원하는 '밝기 균일화(Uniform Brightness)' 기능을 켜서 최고 밝기를 일정한 수준으로 고정함으로써 창 크기를 바꾸더라도 밝기가 전혀 변하지 않게 설정할 수 있습니다."
        ],
        "bullets": [
          "작은 흰색 창은 APL이 낮아 열 발생이 적으므로 높은 밝기를 유지합니다.",
          "창을 전체 화면으로 키우면 APL이 급증하여 ABL이 밝기를 부드럽게 낮춥니다.",
          "HDR 모드는 작은 하이라이트를 극대화하는 대신 넓은 화면 감광 폭이 큽니다.",
          "SDR 모드에서는 '밝기 균일화' 기능을 켜서 창 조절 시 밝기 변화를 완전히 없앨 수 있습니다."
        ]
      },
      {
        "title": "ABL 육안 확인 방법 (안전한 절차와 브라우저의 한계)",
        "content": [
          "별도의 장비 없이 일반 웹 브라우저 창만으로도 모니터의 ABL 특성을 안전하게 관찰할 수 있습니다. 바탕화면을 어두운 단색으로 두고, 흰색 페이지나 [밝기 테스트](/tests/brightness-test)를 실행한 뒤 창 크기를 작은 크기에서 전체 화면으로 점진적으로 키워 보십시오. 창이 커짐에 따라 흰색 영역의 밝기가 유지되는지, 혹은 서서히 어두워지는지 살펴봅니다.",
          "이어서 [HDR 테스트](/tests/hdr-test)를 열어 HDR 환경에서 작은 테스트 사각형과 넓은 발광 화면이 어떻게 제어되는지 비교합니다. SDR과 HDR, 그리고 모니터의 밝기 균일화 옵션 켜짐/꺼짐 상태에서 각각 비교해 보십시오.",
          "이러한 점검을 진행할 때는 웹 소프트웨어의 측정 한계를 명확히 이해해야 합니다. Screen Tester는 육안 비교를 위한 정밀 패턴을 제공하지만 브라우저는 색도계나 조도계 같은 물리 센서와 통신할 수 없습니다. 모든 결과는 사용자의 시각적 관찰과 API 보고에 기반하며 nits 단위의 공인 측정값이 아닙니다."
        ],
        "bullets": [
          "1단계: 어두운 배경에서 [밝기 테스트](/tests/brightness-test)를 작은 창으로 실행.",
          "2단계: 창을 전체 화면으로 넓히며 밝기가 언제, 얼마나 부드럽게 감소하는지 관찰.",
          "3단계: [HDR 테스트](/tests/hdr-test)로 SDR과 HDR의 밝기 제어 프로필 차이를 비교.",
          "측정의 한계: 웹 브라우저는 물리적 nits(칸델라)나 소비 전력(W)을 측정할 수 없습니다."
        ]
      },
      {
        "title": "픽셀 시프트(오비팅): 의도적인 화면 이동 보호 기능",
        "content": [
          "픽셀 시프트(픽셀 오비팅, 화면 이동 등으로 명명)는 현대 OLED 모니터와 TV에 내장된 핵심적인 예방 기능입니다. 모니터 내부의 스케일러가 화면 전체 표시 좌표를 가로 및 세로 방향으로 몇 픽셀씩 일정 주기로 미세하게 이동시킵니다.",
          "이 기능의 공학적 목적은 창 테두리, 작업 표시줄 경계선, 게임의 고정 인터페이스(HUD)처럼 대비가 뚜렷한 고정 경계선이 동일한 서브픽셀만을 연속해서 자극하는 것을 막는 데 있습니다. 화면 위치를 부드럽게 순환시킴으로써 유기 다이오드의 발광 부담을 인접 픽셀들로 분산시켜 특정 위치의 조기 노화를 방지합니다.",
          "이 움직임은 사용자가 눈치채지 못하도록 극히 천천히 이루어집니다. 하지만 정적인 PC 작업 중에는 글씨 위치가 미세하게 달라진 것처럼 느껴지거나 베젤 안쪽에 몇 픽셀 두께의 검은 여백이 한쪽으로 치우쳐 보일 수 있습니다. 이는 정상적인 하드웨어 보호 동작이며 화면 떨림이나 케이블 결함이 아닙니다."
        ],
        "bullets": [
          "픽셀 시프트는 전체 화면을 주기적으로 가로/세로 몇 픽셀씩 부드럽게 이동시킵니다.",
          "고정된 경계선을 이동시켜 특정 서브픽셀만 집중적으로 마모되는 것을 분산 방지합니다.",
          "오비팅 주기에 따라 모니터 테두리 한쪽에 극히 얇은 미표시 여백이 보일 수 있습니다.",
          "미세한 위치 이동은 의도된 정상 보호 기능이며 화면 오류나 떨림이 아닙니다."
        ]
      },
      {
        "title": "정적 화면 보호 기술: 서로 다른 4가지 메커니즘 구분",
        "content": [
          "유기 발광 소자를 보호하기 위해 여러 기술이 복합적으로 작동하지만, 사용자들은 이를 한데 묶어 혼동하기 쉽습니다. 정확한 진단을 위해 다음 4가지 시스템을 구분해야 합니다:",
          "1. 픽셀 시프트 (Pixel Orbiting): 모니터를 사용하는 도중에 화면 좌표를 미세하게 이동시키는 기하학적 보호.",
          "2. 정적 콘텐츠 감광 (ASBL / TPC / 로고 감광): 영상 신호 내의 움직임 없는 요소(방송 로고, 고정된 작업 표시줄, 일시 정지 영상)를 감시하는 펌웨어 기능. 몇 분간 화면 변화가 없으면 열 축적을 막기 위해 화면 전체나 해당 영역의 밝기를 자동으로 낮춥니다.",
          "3. 운영체제 절전 및 화면 보호기: Windows나 macOS가 입력 부재 시 신호를 차단하거나 검은 화면을 띄워 모니터를 쉬게 하는 소프트웨어 절전 기능.",
          "4. 패널 보정 사이클 (픽셀 리프레시 / 컴펜세이션): 모니터가 대기 상태에 들어갔을 때 실행되는 내부 유지관리. 누적 사용 수 시간마다 서브픽셀 저항을 측정해 구동 전압을 맞추는 짧은 사이클과 수백 시간마다 실행되는 심층 보정이 있습니다.",
          "제조사마다 세팅 성향이 달라 TV는 영화 감상을 위해 ASBL을 강하게 거는 반면, 게이밍 모니터는 PC 작업 편의를 위해 OSD에서 감광 감도를 조절할 수 있도록 지원합니다."
        ],
        "bullets": [
          "픽셀 오비팅: 사용 중 화면을 미세 이동시켜 고정 테두리의 소자 피로를 분산.",
          "정적 감광(ASBL): 움직임 없는 화면이나 고정 로고 감지 시 밝기를 자동 감폭.",
          "OS 화면 꺼짐: 입력이 없을 때 운영체제 차원에서 화면을 슬립시키는 기본 기능.",
          "대기 모드 보정: 대기 상태에서 소자 전압을 자동 재정렬하는 핵심 펌웨어 루틴."
        ]
      },
      {
        "title": "일시적 이미지 리텐션과 영구 번인의 차이점",
        "content": [
          "OLED 기술에서 가장 중요한 구분은 '일시적 이미지 리텐션(잔상)'과 '영구적 번인(소자 영구 손상)'의 차이를 아는 것입니다. 이미지 리텐션은 고대비 화면을 오래 표시한 뒤 구동 트랜지스터(TFT)나 발광층에 미세한 전하가 일시적으로 머무르면서 생기는 전기적 현상입니다. 균일한 그레이 화면에서 이전 화면의 윤곽이 희미하게 보일 수 있으나, 다양한 영상을 재생하거나 대기 모드 보정 주기를 거치면 깨끗하게 사라집니다.",
          "반면 영구 번인은 유기 발광 물질 자체가 비가역적으로 물리적 열화를 겪은 상태입니다. 특정 서브픽셀만 최대 밝기로 수천 시간 연속 점등되고 주변 픽셀은 변화할 경우, 혹사당한 소자는 발광 효율을 영구히 상실합니다. 그 결과 어떤 색상의 화면을 띄워도 어두운 실루엣이 평생 남게 됩니다.",
          "최신 OLED 패널은 다층 발광 소재, 그래핀 및 대형 알루미늄 방열판, 실시간 온도 센서, 균일화 알고리즘을 갖추어 일반적인 게임, 영상 및 PC 환경에서 영구 번인 위험이 극히 낮아졌습니다. 웹 브라우저로 소자의 화학적 수명을 측정할 수는 없으나, Screen Tester를 통해 현재 패널의 균일도를 육안으로 점검할 수 있습니다."
        ],
        "bullets": [
          "이미지 리텐션: 전하 축적으로 인한 일시적 현상; 영상 시청이나 대기 보정으로 자연 복구.",
          "영구 번인: 수천 시간의 고정 노출로 인한 유기 서브픽셀의 물리적이고 영구적인 효율 저하.",
          "최신 보호 기술: 고성능 방열판과 보호 알고리즘으로 최신 OLED의 번인 위험은 크게 감소.",
          "웹 점검의 한계: 브라우저 도구는 소자의 잔여 수명이나 화학적 마모도를 수치화할 수 없습니다."
        ]
      },
      {
        "title": "Screen Tester를 활용한 OLED 특성 점검 방법",
        "content": [
          "Screen Tester는 OLED 디스플레이의 광학적 특성을 눈으로 점검할 수 있는 전문 웹 도구를 제공합니다. 각 도구의 가능 범위와 한계를 알면 올바른 평가가 가능합니다:",
          "[HDR 테스트](/tests/hdr-test): 브라우저의 HDR 톤 매핑과 하이라이트 표현력을 눈으로 점검합니다. 물리적인 최대 nits 수치를 측정하지는 않습니다.",
          "[균일도 테스트](/tests/uniformity-test): 5%, 20%, 50%, 100% 그레이 및 원색 화면을 띄워 잔상 흔적이나 화면 얼룩(DSE)을 눈으로 확인합니다. 연구실의 델타-E 색차 맵을 그리지는 않습니다.",
          "[니어 블랙 테스트](/tests/near-black-test): 순수 블랙 직상의 세밀한 계조 단계(1~16단계)를 표시하여 암부가 뭉개지지 않고 잘 표현되는지 점검합니다. 패널 전압을 측정하지는 않습니다.",
          "[그라데이션 및 밴딩 테스트](/tests/gradient-banding-test): 8비트 및 10비트 색상 그라데이션의 부드러움을 점검하여 색 층짐이나 디더링 깨짐을 확인합니다. 내부 비트 심도 처리 회로를 분석하지는 않습니다.",
          "[밝기 테스트](/tests/brightness-test): 창 크기 변화에 따른 체감 밝기 변화를 비교하여 ABL의 작동 특성을 시각적으로 확인합니다. 칸델라(cd/m²) 수치를 측정하지는 않습니다.",
          "[텍스트 선명도 테스트](/tests/text-clarity-test): 밝은 배경과 어두운 배경에서 글꼴을 띄워 특수 서브픽셀 배열(WOLED나 QD-OLED)에 따른 텍스트 색 번짐을 확인합니다. OS 글꼴 렌더러를 변경하지는 않습니다.",
          "[디스플레이 정보](/tests/display-info): 브라우저 API가 파악한 해상도, 색 심도, HDR 지원 여부를 정리하여 보여줍니다. 모니터 내부 펌웨어 정보를 직접 읽지는 않습니다."
        ],
        "bullets": [
          "[HDR 테스트](/tests/hdr-test): HDR 톤 매핑을 시각적으로 점검; 절대 nits 측정 불가.",
          "[균일도 테스트](/tests/uniformity-test): 5%~50% 그레이에서 잔상 윤곽 노출; 델타-E 산출 불가.",
          "[니어 블랙 테스트](/tests/near-black-test): 최암부 계조 구분력 확인; 패널 블랙 전압 측정 불가.",
          "[그라데이션 및 밴딩 테스트](/tests/gradient-banding-test): 10비트 색상 전환의 부드러움 점검.",
          "[밝기 테스트](/tests/brightness-test): 창 크기별 ABL 감광 관찰; cd/m² 측정 불가.",
          "[텍스트 선명도 테스트](/tests/text-clarity-test): 서브픽셀 구조에 따른 글꼴 테두리 색 번짐 점검.",
          "[디스플레이 정보](/tests/display-info): 브라우저가 인식한 기본 성능 수치 확인."
        ]
      },
      {
        "title": "관찰 결과의 올바른 해석: 정상 상태와 주의 필요 상태",
        "content": [
          "OLED 화면을 점검할 때는 모호한 점수 대신 객관적인 기술 기준에 따라 상태를 구분해야 합니다:",
          "1. 정상 상태 (Looks Normal): 흰색 창을 전체 화면으로 키웠을 때 밝기가 부드럽게 한 단계 낮아지는 현상 (정상적인 ABL 동작). 장시간 사용 중에 화면 좌표가 몇 픽셀 이동하여 베젤 쪽에 얇은 틈이 나타나는 현상 (정상적인 픽셀 오비팅). 고정 화면 후 남은 희미한 잔상이 영상 재생이나 대기 모드 유지관리 후 완전히 사라지는 현상 (무해한 일시적 리텐션).",
          "2. 주의 필요 상태 (Needs Attention): 일반적인 문서 작성이나 웹 서핑 중 화면이 지나치게 어두워져 글씨를 읽기 힘든 상태 (ASBL 감도 과다, 조도 센서 간섭 또는 HDR 데스크톱 설정 오류 확인). 수차례 수동 패널 리프레시를 돌린 후에도 단색 그레이나 컬러 화면에서 특정 아이콘이나 띠 자국이 영구적으로 남는 상태 (소자 편마모 / 영구 번인 의심).",
          "3. 판단 보류 (Unsure): 게임이나 영상 시청 중 밝기가 불규칙하게 오르내리는 상태. 게임 자체의 동적 톤 매핑, Windows Auto HDR 또는 모니터 ABL이 겹쳐서 나타날 수 있습니다. 브라우저 도구로 내부 회로 한계를 측정할 수는 없으므로 모니터 매뉴얼과 최신 펌웨어 패치 내역을 확인하십시오."
        ],
        "bullets": [
          "정상: 전체 화면 시 ABL 감광, 완만한 픽셀 시프트, 영상 재생으로 사라지는 일시 잔상.",
          "주의: 일반 작업 시 극단적인 어두워짐, 또는 단색 화면에서 지워지지 않는 영구 실루엣.",
          "보류: 게임 중 불규칙한 밝기 변화; 게임 엔진 톤 매핑이나 Windows HDR 설정 확인 필요.",
          "진단 한계: 웹 도구는 ABL 곡선이 제조사 규격 범위 내에 있는지 판정할 수 없습니다."
        ]
      },
      {
        "title": "실전 OLED 점검 및 보호 체크리스트",
        "content": [
          "OLED 모니터를 최적의 상태로 오래 사용하기 위한 10가지 실천 점검 목록입니다:",
          "1. SDR과 HDR 모드 구분: 일반 문서 작업에는 편안한 밝기의 SDR을 사용하고, HDR은 지원 게임이나 영상 감상 시에만 켜서 불필요한 전체 화면 ABL 작동을 방지합니다.",
          "2. 창 크기 반응 확인: [밝기 테스트](/tests/brightness-test)에서 흰 창을 키워보며 모니터의 ABL 특성을 파악합니다.",
          "3. 밝기 균일화 옵션 활용: 모니터 OSD에 'Uniform Brightness' 기능이 있다면 켜서 작업 시 밝기 흔들림을 방지합니다.",
          "4. 픽셀 시프트 활성화: 모니터 유지관리 메뉴에서 픽셀 시프트가 켜져 있는지 확인합니다.",
          "5. 로고 감광 설정: 고정 UI 보호를 위해 로고 밝기 제한을 중간 정도로 켜둡니다.",
          "6. 암부 계조 확인: [니어 블랙 테스트](/tests/near-black-test)로 최암부 계조가 뭉개지지 않는지 확인합니다.",
          "7. 그레이 균일도 정기 점검: 어두운 방에서 [균일도 테스트](/tests/uniformity-test)의 5% 및 50% 그레이 화면을 확인합니다.",
          "8. 색상 계조 점검: [그라데이션 및 밴딩 테스트](/tests/gradient-banding-test)로 색상 전환이 부드러운지 확인합니다.",
          "9. 텍스트 가독성 평가: [텍스트 선명도 테스트](/tests/text-clarity-test)로 글꼴 번짐을 확인합니다.",
          "10. 대기 전원 유지: 사용 직후 멀티탭 스위치로 전원을 바로 끄지 말고, 모니터를 대기 모드로 두어 자동 보정 주기가 완료되도록 합니다."
        ],
        "bullets": [
          "체크 1: 일반 작업은 SDR, 영화나 게임은 HDR로 명확히 구분하여 사용.",
          "체크 2: [밝기 테스트](/tests/brightness-test)로 창 크기별 ABL 감광 특성 파악.",
          "체크 3: 밝기 변화가 거슬린다면 OSD의 밝기 균일화 기능 활용.",
          "체크 4: OSD에서 픽셀 시프트와 로고 보호 기능 활성화 확인.",
          "체크 5: [니어 블랙 테스트](/tests/near-black-test)로 암부 디테일 점검.",
          "체크 6: [균일도 테스트](/tests/uniformity-test)로 전체 화면 그레이 균일도 확인.",
          "체크 7: [그라데이션 및 밴딩 테스트](/tests/gradient-banding-test)로 색상 연속성 점검.",
          "체크 8: [텍스트 선명도 테스트](/tests/text-clarity-test)로 서브픽셀 폰트 렌더링 확인.",
          "체크 9: [디스플레이 정보](/tests/display-info)로 설정된 화면 스펙 교차 확인.",
          "체크 10: 자동 유지관리를 위해 사용 후에도 주 전원을 차단하지 않고 대기 유지."
        ]
      },
      {
        "title": "문제 해결 및 권장 조치 단계",
        "content": [
          "OLED 모니터의 밝기나 화면에 의문점이 생겼다면 다음 순서로 원인을 확인하십시오:",
          "문서를 읽는 중 화면이 어두워짐: 고정된 문서를 오래 읽어 정적 화면 감광(ASBL)이 실행되었을 가능성이 높습니다. 마우스를 흔들거나 창을 전환해 보십시오. 감도를 조절할 수 있는지 [모니터 OSD 설정 가이드](/guides/monitor-osd-settings-explained)를 참조하십시오.",
          "창 조절 시 밝기 변화가 거슬림: OSD에서 'Uniform Brightness'를 켜거나 SDR 기본 밝기를 낮추어 전체 화면에서도 ABL 작동 기준선 아래를 유지하도록 맞추십시오.",
          "화면이 약간 치우쳐 있거나 테두리에 얇은 틈이 보임: 픽셀 시프트가 작동 중인 정상적인 상태입니다. 패널 보호가 잘 이루어지고 있는 증거입니다.",
          "희미한 잔상이 오래 남음: 동영상을 충분히 재생해도 사라지지 않으면 모니터 전원 버튼을 눌러 대기 모드로 전환하고 자동 픽셀 리프레시 사이클을 실행시키십시오.",
          "케이블 연결, 색상 프로필, 전원 관리에 관한 종합적인 가이드는 [문제 해결 가이드](/knowledge-base/troubleshooting)를 참조하십시오."
        ],
        "bullets": [
          "문서 작업 중 어두워짐 → ASBL 작동; 마우스 조작 또는 OSD 로고 설정 확인.",
          "창 크기 조절 시 밝기 변화 → 정상 ABL; OSD의 밝기 균일화 기능 시도.",
          "화면의 미세한 이동 → 픽셀 오비팅 작동 중; 하드웨어 보호 정상 작동.",
          "잘 안 지워지는 잔상 → 모니터를 대기 모드로 두어 자동 리프레시 실행.",
          "종합 하드웨어 점검 → [문제 해결 가이드](/knowledge-base/troubleshooting) 참조."
        ]
      }
    ],
    "faq": [
      {
        "question": "흰색 창을 전체 화면으로 띄우면 OLED 모니터가 어두워지는 이유는 무엇인가요?",
        "answer": "정상적인 자동 밝기 제한(ABL) 동작입니다. 흰색 창이 화면 전체를 채우면 평균 밝기 수준(APL)이 급증합니다. 과도한 전력 소비와 발열을 막아 패널을 보호하기 위해 모니터 제어 회로가 전체 밝기를 자동으로 낮춥니다."
      },
      {
        "question": "OLED 모니터의 화면이 한쪽으로 미세하게 움직이는 것이 정상인가요?",
        "answer": "네, 정상입니다. 이는 픽셀 시프트(픽셀 오비팅)라는 하드웨어 보호 기능입니다. 고정된 창 테두리가 특정 픽셀만 집중적으로 마모시키는 것을 막기 위해 표시 위치를 몇 픽셀씩 주기적으로 부드럽게 이동시킵니다."
      },
      {
        "question": "작업 중에 OLED 모니터의 밝기가 계속 바뀌는 것을 막을 수 있나요?",
        "answer": "SDR 모드에서 적당한 밝기로 사용하거나, 모니터가 지원하는 경우 OSD에서 '밝기 균일화(Uniform Brightness)' 옵션을 켜십시오. 이렇게 하면 모든 창 크기에서 밝기가 일정한 수준으로 고정됩니다."
      },
      {
        "question": "일시적인 이미지 리텐션과 영구 번인의 차이는 무엇인가요?",
        "answer": "리텐션은 회로에 일시적으로 전하가 머무는 현상으로 영상 재생이나 대기 보정 주기로 깨끗이 사라집니다. 번인은 수천 시간의 고정 노출로 인해 유기 서브픽셀 자체가 물리적으로 영구 손상된 상태입니다."
      },
      {
        "question": "OLED 모니터를 끈 직후 콘센트를 바로 뽑으면 안 되는 이유는 무엇인가요?",
        "answer": "OLED 모니터는 몇 시간 사용 후 대기 모드에 머무는 동안 픽셀 전압을 재정렬하는 자동 보정 사이클을 수행합니다. 콘센트 전원을 바로 끄면 이 필수적인 유지관리 과정이 중단됩니다."
      },
      {
        "question": "Screen Tester로 정확한 최대 nits나 번인까지의 수명을 측정할 수 있나요?",
        "answer": "측정할 수 없습니다. 웹 브라우저는 색도계나 패널 내부 수명 카운터와 통신할 수 없습니다. Screen Tester는 시각적 점검용 테스트 패턴을 제공하며, 공인 수치 측정에는 전문 장비가 필요합니다."
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
    "title": "TV 오버스캔 및 1:1 픽셀 매칭(점대점) 설정",
    "subtitle": "화면 가장자리 잘림, HDMI 화면 확장, Just Scan 및 글자 흐림 현상 해결.",
    "description": "TV 연결 시 화면 테두리가 잘리고 글자가 번지는 오버스캔 원인과 1:1 원시 픽셀 매칭 설정법을 알아봅니다.",
    "directAnswer": "오버스캔은 영상 외곽의 2%~5%를 잘라내고 화면을 인위적으로 확대하는 과거 TV 처리 방식으로, PC 작업 표시줄을 가립니다.",
    "whyItMatters": "오버스캔이 켜진 TV에 PC를 연결하면 글자가 1:1로 매칭되지 않고 강제로 보간되어 텍스트 가독성이 심각하게 떨어집니다.",
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
    "primarySearchIntent": "tv 오버스캔 화면 잘림 1대1 픽셀 매칭 점대점 맞춤",
    "readingTimeMinutes": 5
  },
  {
    "slug": "aspect-ratio-and-scaling-artifacts",
    "category": "tv-and-display-setup",
    "title": "화면비, 레터박스 및 비원시 해상도 스케일링 왜곡",
    "subtitle": "16:9, 16:10, 21:9 울트라와이드, 기하학적 왜곡 및 정수 스케일링.",
    "description": "디스플레이 화면비의 원리, 비원시 해상도가 흐려지는 이유 및 왜곡 없는 정수(Integer) 스케일링 활용법을 다룹니다.",
    "directAnswer": "화면비는 디스플레이의 가로와 세로 비율이며, 잘못된 비율로 확장하면 원형 이미지가 타원형으로 일그러져 보입니다.",
    "whyItMatters": "화면비가 맞지 않으면 인물과 그래픽이 비정상적으로 왜곡되며, 비정수 보간 스케일링은 화면에 흐릿함을 초래합니다.",
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
    "primarySearchIntent": "화면비 레터박스 검은 여백 비원시 해상도 스케일링 왜곡",
    "readingTimeMinutes": 5
  },
  {
    "slug": "multi-touch-and-touchscreen-testing",
    "category": "device-and-input",
    "title": "멀티터치 및 터치스크린 디지타이저 정확도 진단",
    "subtitle": "정전용량 방식 디지타이저, 포인터 이벤트, 다중 접점 추적 및 터치 반응 속도.",
    "description": "터치스크린이 동시 접점을 인식하는 원리, navigator.maxTouchPoints 확인법 및 무반응 데드존을 찾아냅니다.",
    "directAnswer": "멀티터치는 화면 표면에서 여러 손가락의 동시 접점을 인식하고 추적하여 줌, 회전 등의 제스처 입력을 가능하게 하는 기술입니다.",
    "whyItMatters": "디지타이저 결함은 터치가 먹히지 않는 사각지대나 손을 대지 않아도 멋대로 눌리는 고스트 터치를 유발합니다.",
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
    "primarySearchIntent": "멀티터치 터치스크린 테스트 고스트 터치 디지타이저 반응",
    "readingTimeMinutes": 5
  },
  {
    "slug": "webcam-diagnostics-and-privacy",
    "category": "device-and-input",
    "title": "웹캠 진단, 프레임 레이트 안정성 및 로컬 개인정보 보호",
    "subtitle": "WebRTC getUserMedia, 협상된 해상도, 노출 부족 프레임 드랍 및 무서버 테스트.",
    "description": "브라우저 카메라 접근 방식, 어두운 조명에서 FPS가 떨어지는 원인 및 서버 전송 없는 100% 로컬 보안 검증을 다룹니다.",
    "directAnswer": "웹캠 테스트는 외부 서버 전송 없이 브라우저 내부 WebRTC 스트림을 통해 실제 해상도, 프레임 안정성, 색 밸런스를 안전하게 점검합니다.",
    "whyItMatters": "웹캠은 조명이 어두우면 프레임이 절반 이하로 떨어지기 쉬우므로, 사전 점검을 통해 화상 회의 품질을 보장해야 합니다.",
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
    "primarySearchIntent": "웹캠 테스트 fps 해상도 개인정보 보호 카메라 진단",
    "readingTimeMinutes": 5
  },
  {
    "slug": "audio-channel-testing-and-stereo-separation",
    "category": "device-and-input",
    "title": "오디오 채널 분리도 및 스테레오 좌우 밸런스 테스트",
    "subtitle": "Web Audio API, 스테레오 패닝, 위상 정합성, 주파수 스윕 및 음향적 한계.",
    "description": "Web Audio API를 통해 좌우 오디오 채널이 명확히 분리되어 있는지, 위상 반전 및 누음이 없는지 정확히 검증합니다.",
    "directAnswer": "스테레오 오디오 테스트는 좌우 채널이 위상 상쇄나 상호 간섭 없이 균형 있게 독립적으로 소리를 출력하는지 점검합니다.",
    "whyItMatters": "좌우가 뒤바뀌면 게임이나 영화에서 방향 분간이 불가능해지며, 위상이 역위상일 경우 목소리가 답답하게 묻히게 됩니다.",
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
    "primarySearchIntent": "오디오 스테레오 테스트 좌우 분리 스피커 밸런스 위상",
    "readingTimeMinutes": 5
  },
  {
    "slug": "mobile-motion-sensors-accelerometer-gyroscope",
    "category": "device-and-input",
    "title": "모바일 모션 센서: 가속도계 및 자이로스코프 진단",
    "subtitle": "DeviceMotionEvent, DeviceOrientationEvent, 3축 벡터 및 권한 샌드박스.",
    "description": "스마트 기기가 움직임과 회전을 감지하는 방식, 모션 API의 원리 및 브라우저 권한 정책을 설명합니다.",
    "directAnswer": "가속도계는 X, Y, Z 3축에 따른 직선 가속도와 중력 방향을 측정하며, 자이로스코프는 각 축 중심의 회전 각속도를 측정합니다.",
    "whyItMatters": "모션 센서는 게임, VR, 카메라 손떨림 보정의 핵심이며, 센서 하드웨어 결함과 브라우저 권한 차단을 명확히 구분할 수 있습니다.",
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
    "primarySearchIntent": "가속도계 자이로스코프 모바일 모션 센서 테스트 스마트폰",
    "readingTimeMinutes": 5
  },
  {
    "slug": "what-browser-display-tests-can-and-cannot-measure",
    "category": "browser-and-testing",
    "title": "웹 브라우저 디스플레이 테스트로 측정 가능한 항목과 불가능한 한계",
    "subtitle": "Web API 기능의 한계, 클라이언트 측 관측 범위 및 물리적 광학 측정 경계선.",
    "description": "브라우저 화면 테스트의 기술적 경계: 브라우저가 수학적으로 검증할 수 있는 항목과 실험실 광학 장비가 필요한 항목의 명확한 구분.",
    "directAnswer": "웹 브라우저는 수학적으로 완벽한 색상 좌표를 그리고 프레임 간격을 잴 수 있지만, 실제 방출 광량, Delta E, 픽셀 응답 속도는 측정할 수 없습니다.",
    "whyItMatters": "일부 사이트는 브라우저만으로 니트나 Delta E 색 정확도를 잴 수 있다고 과장 광고합니다. 진정한 기술적 한계를 알아야 정확한 판단이 가능합니다.",
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
    "primarySearchIntent": "브라우저 화면 테스트 한계 측정 가능 불가능 니트 delta e",
    "readingTimeMinutes": 6
  },
  {
    "slug": "browser-compatibility-and-hardware-apis",
    "category": "browser-and-testing",
    "title": "브라우저 엔진별 호환성 및 웹 하드웨어 API",
    "subtitle": "Chromium, Gecko, WebKit 엔진별 API 지원 격차 및 보안 권한 정책.",
    "description": "주요 브라우저 엔진이 화면, 오디오, 센서 API를 어떻게 다루는지와 플랫폼별 샌드박스 보안 규제를 살펴봅니다.",
    "directAnswer": "브라우저 호환성은 서로 다른 렌더링 엔진(Blink, Gecko, WebKit)이 하드웨어 접근을 위한 W3C 표준 Web API를 얼마나 일관되게 지원하는지 나타냅니다.",
    "whyItMatters": "기기 진동 등의 기능은 안드로이드 크롬에서는 완벽히 작동하지만 iOS 사파리에서는 개인정보 보호 정책에 따라 의도적으로 차단됩니다.",
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
    "primarySearchIntent": "브라우저 호환성 web api 하드웨어 접근 chromium webkit gecko",
    "readingTimeMinutes": 5
  },
  // New Feature Guide: Pixel Inversion, VCOM Calibration & Pixel Walk
  {
    "slug": "pixel-inversion-and-vcom",
    "category": "display-problems",
    "title": "픽셀 인버전, VCOM 전압 캘리브레이션 및 픽셀 워크",
    "subtitle": "액정 극성 반전 구동, VCOM 공통 전압 밸런스, 체크무늬 플리커 현상 이해하기.",
    "description": "LCD 픽셀 인버전이 액정 열화를 방지하는 원리, 불균형한 VCOM으로 인한 깜빡임과 픽셀 워크의 원인 및 점검 방법을 알아봅니다.",
    "directAnswer": "픽셀 인버전은 직류 전압으로 인한 액정의 영구적 손상을 막기 위해 매 프레임 서브픽셀의 극성(+V / -V)을 교대로 반전시키는 하드웨어 구동 기술입니다.",
    "whyItMatters": "공장 출하 시 VCOM 기준 전압이 불균형하면 양극과 음극의 밝기가 달라져 격자 패턴에서 30Hz/60Hz의 미세한 진동과 눈의 피로를 유발합니다.",
    "whatToLookFor": [
      "Shimmering or vibrating 1x1 dot or 2x2 checkerboard grids",
      "Faint vertical or horizontal crawling wave bands across uniform gray backgrounds",
      "Micro-jitter along edges of fine black text on white backgrounds",
      "Subtle green or magenta tint shifts across high-frequency pixel mesh patterns"
    ],
    "howToTest": [
      "Open the Pixel Inversion & VCOM Test in Screen Tester at native resolution with 100% display scaling",
      "Step through 1x1 dot inversion, 2x2 check, vertical stripe, and subpixel mesh patterns",
      "Observe the pattern from your standard operating distance without leaning in too close",
      "Note whether the gray pattern appears steady and calm or vibrates aggressively"
    ],
    "whatScreenTesterCanObserve": [
      "Precise 1-to-1 pixel-mapped alternating checkerboards and subpixel stripe rasters",
      "Visual presence of polarity asymmetry across calibrated gray midtone levels",
      "Response across different inversion architectures (dot, column, row, and subpixel)"
    ],
    "whatScreenTesterCannotDetermine": [
      "Internal analog potentiometer or digital VCOM register voltage value in millivolts",
      "Physical liquid crystal molecular alignment angle under TFT electric field",
      "Automated defect classification without human visual evaluation"
    ],
    "commonCauses": [
      "Factory VCOM potentiometer calibration drift during panel manufacturing or assembly",
      "Aging power supply filter capacitors causing ripple on the analog TFT reference rails",
      "Aggressive panel response time overdrive voltages pushing subpixels past target levels",
      "Non-native display resolution or fractional OS scaling blurring the alternating dot pattern"
    ],
    "whatToDoNext": [
      "Ensure the display is running at native resolution and 100% integer scaling",
      "Allow the monitor to warm up for 15-30 minutes, as cold LCD panels exhibit more VCOM asymmetry",
      "If severe flicker occurs during normal productivity work, contact the manufacturer for warranty replacement under panel defect policies"
    ],
    "sections": [
      {
        "title": "The Physics of Liquid Crystal DC Polarization",
        "content": [
          "Nematic liquid crystals are dipole molecules suspended between transparent glass substrates. When an electric field is applied, the molecules twist or tilt to modulate backlight transmission.",
          "If a continuous direct current (DC) voltage is maintained across the liquid crystal layer, mobile ions within the fluid migrate toward the electrodes, causing chemical plating, permanent polarization, and severe image retention. To prevent this electrolytic destruction, displays alternate the drive voltage polarity (+V and -V relative to a common reference voltage called VCOM) on every single refresh frame."
        ]
      },
      {
        "title": "Inversion Architectures: Dot, Column, and Row",
        "content": [
          "To prevent the entire display from flickering simultaneously during polarity reversal, panels spatial-multiplex polarities across neighboring pixels.",
          "Dot Inversion: Neighboring adjacent pixels alternate polarities (+, -, +, -) in a checkerboard. This cancels optical flicker most effectively and is used in premium monitors.",
          "Column Inversion: Entire vertical columns share polarity. Economical to drive but susceptible to vertical striping and pixel walk artifacts.",
          "Row Inversion: Horizontal lines share polarity. Prone to horizontal line crawl when displaying horizontal UI dividers."
        ]
      }
    ],
    "faq": [
      {
        "question": "Does an OLED panel have pixel inversion?",
        "answer": "No. OLED panels use organic light-emitting diodes that emit light directly via current injection (DC) rather than liquid crystal shuttering, so they do not require AC polarity inversion or VCOM calibration."
      },
      {
        "question": "Can pixel walk damage my monitor?",
        "answer": "No. Pixel walk and VCOM asymmetry are optical artifacts, not destructive flaws. They simply indicate that positive and negative polarities produce slightly unequal luminance."
      }
    ],
    "relatedTestIds": [
      "pixel-inversion-test"
    ],
    "relatedTroubleshootingIds": [
      "screen-flickering"
    ],
    "relatedArticleSlugs": [
      "refresh-rate-and-frame-rates",
      "text-clarity-and-subpixel-rendering"
    ],
    "primarySearchIntent": "pixel inversion test vcom pixel walk explained",
    "readingTimeMinutes": 6
  },
  // New Feature Guide: Backlight Strobing, BFI & Strobe Crosstalk
  {
    "slug": "backlight-strobing-and-strobe-crosstalk",
    "category": "display-basics",
    "title": "백라이트 스트로빙, BFI 및 스트로브 크로스토크",
    "subtitle": "모션 블러 저감 기술(ULMB, DyAc, ELMB), 스트로브 위상 동기화, 이중상 고스팅 현상.",
    "description": "백라이트 스트로빙과 BFI가 시선 추적 블러를 없애는 원리, 화면 상하단 크로스토크 발생 원인 및 위상 조정법을 설명합니다.",
    "directAnswer": "백라이트 스트로빙은 액정 분자가 색상 전환을 완료한 순간에만 백라이트를 순간 발광시켜 샘플 앤 홀드 모션 블러를 완전히 제거하는 기술입니다.",
    "whyItMatters": "평판 디스플레이는 안구 추적으로 인해 필연적인 블러가 발생합니다. 스트로빙은 CRT급 선명도를 제공하지만, 주사 타이밍 차이로 잔상이 생길 수 있습니다.",
    "whatToLookFor": [
      "Sharp single-image moving objects in the screen center zone",
      "Faint ghost silhouette trailing or leading moving bars at the top or bottom edges",
      "Dimming of overall display brightness when backlight strobing is engaged",
      "Red or blue color fringing caused by mismatched phosphor decay times"
    ],
    "howToTest": [
      "Enable blur reduction (ULMB, DyAc, ELMB, PureXP) in your monitor OSD",
      "Launch the Strobe Crosstalk & BFI Inspection Test in Screen Tester",
      "Observe moving vertical bars at 960 px/s across the top, center, and bottom tracks",
      "Determine which vertical third of the screen exhibits the cleanest single image"
    ],
    "whatScreenTesterCanObserve": [
      "Controlled velocity moving targets across multiple vertical screen tracks",
      "Visual comparison between native motion blur and strobed phantom silhouettes",
      "Observation of crosstalk intensity changes at various panning speeds"
    ],
    "whatScreenTesterCannotDetermine": [
      "Hardware strobe pulse width in microseconds (requires a photodiode oscilloscope)",
      "Peak instantaneous flash brightness in nits",
      "Internal display timing controller (TCON) scan-out delay"
    ],
    "commonCauses": [
      "Global backlight flash timing conflicting with progressive top-to-bottom pixel scan-out",
      "Strobe phase centered at screen midpoint, leaving top and bottom pixels mid-transition",
      "Slow liquid crystal transition times (GtG) exceeding the available dark interval",
      "Framerate not locked to the monitor's exact refresh rate"
    ],
    "whatToDoNext": [
      "Adjust Strobe Phase in your monitor OSD or utility software to shift the clean zone to where your crosshair or task sits",
      "Adjust Strobe Length or Duty Cycle to trade between peak brightness and blur reduction",
      "Ensure GPU framerate is capped cleanly at the exact strobed refresh rate to prevent severe stutter"
    ],
    "sections": [
      {
        "title": "Sample-and-Hold Blur vs. Impulse Blur",
        "content": [
          "Modern flat-panel monitors are sample-and-hold displays: pixels remain continuously illuminated for the full duration of each frame (16.7ms at 60Hz, 6.9ms at 144Hz).",
          "When your eyes track a moving object across the screen, your gaze sweeps continuously while the screen holds each frame static. Your retina smears the static frame across your photoreceptors, creating eye-tracking motion blur regardless of how fast individual pixels transition."
        ]
      },
      {
        "title": "The Mechanics of Strobe Crosstalk",
        "content": [
          "Displays draw frames progressively from top to bottom (vertical scan-out). By the time the bottom line is being refreshed, the top line was refreshed milliseconds earlier.",
          "Because the backlight flashes globally across all zones simultaneously, it is impossible for all lines to be in a completed, settled state at the exact moment of the flash. Lines that are still transitioning appear as dual or ghosted silhouettes, known as strobe crosstalk."
        ]
      }
    ],
    "faq": [
      {
        "question": "Can I use G-Sync / FreeSync and Backlight Strobing at the same time?",
        "answer": "Most monitors require a fixed refresh rate for strobing. However, specialized technologies like ASUS ELMB-Sync and ViewSonic PureXP with VRR allow strobing across variable refresh rates within specific ranges."
      },
      {
        "question": "Why does my screen look dimmer with strobing turned on?",
        "answer": "Because the backlight is turned off for the majority of each frame cycle (often 70% to 85% of the time), average light output drops significantly compared to continuous illumination."
      }
    ],
    "relatedTestIds": [
      "strobe-crosstalk-test",
      "motion-blur-test"
    ],
    "relatedTroubleshootingIds": [
      "blurry-motion"
    ],
    "relatedArticleSlugs": [
      "monitor-ghosting-and-motion-blur",
      "refresh-rate-and-frame-rates"
    ],
    "primarySearchIntent": "strobe crosstalk backlight strobing blur reduction explained",
    "readingTimeMinutes": 7
  },
  // New Feature Guide: VRR Brightness Flicker, Gamma Shifts & LFC Fluctuation
  {
    "slug": "vrr-brightness-flicker-and-gamma",
    "category": "display-problems",
    "title": "VRR 밝기 플리커, 감마 변화 및 LFC 전환 충격",
    "subtitle": "G-Sync 및 FreeSync 환경에서 프레임 급변 시 OLED, VA, IPS 패널이 깜빡이는 원인.",
    "description": "가변 주사율(VRR) 환경에서 어두운 영역의 밝기 깜빡임과 감마 왜곡의 근본 원인, 프레임 요동이 미치는 영향과 안정화 팁을 알아봅니다.",
    "directAnswer": "VRR 밝기 플리커는 주사율이 급격히 변할 때 프레임 유지 시간에 따라 서브픽셀의 충전 전압과 감마 곡선이 달라져 암부 밝기가 맥동하는 현상입니다.",
    "whyItMatters": "로딩 화면이나 교전 중 급격한 프레임 저하 시 어두운 배경이 울컥거리며 깜빡여 몰입을 방해하고 극심한 눈 피로를 유발합니다.",
    "whatToLookFor": [
      "Rhythmic brightness pulsation in dark gray textures and shadow areas",
      "Momentary brightness jolts during framerate spikes or dips below the VRR range",
      "Increased flicker on OLED and VA panels compared to standard IPS monitors",
      "Flicker triggered during game loading screens or menu navigation"
    ],
    "howToTest": [
      "Enable G-Sync or FreeSync in your graphics driver and monitor OSD",
      "Launch the VRR Brightness Flicker Stress Test in Screen Tester",
      "Observe 10% and 25% gray test patches as the framerate sweeps between 45Hz and 144Hz",
      "Check if the darkness level stays uniform or pumps visibly during the sweep"
    ],
    "whatScreenTesterCanObserve": [
      "Visual display reaction to simulated framerate swings and dynamic frame presentation intervals",
      "Sensitivity of near-black vs midtone gray levels to refresh-dependent gamma changes",
      "Detection of visual luminance pumping across calibrated test fields"
    ],
    "whatScreenTesterCannotDetermine": [
      "Hardware GPU Adaptive-Sync VESA timing packet metadata",
      "Direct microvolt OLED subpixel driving voltage changes",
      "Whether your specific monitor model has hardware G-Sync module gamma compensation"
    ],
    "commonCauses": [
      "OLED subpixel charging voltage decay during long frame times at low refresh rates",
      "VA panel gamma shifts between low and high refresh frequencies",
      "Low Framerate Compensation (LFC) multiplying frames rapidly near the 48Hz boundary",
      "Uncapped GPU framerate bouncing violently against the maximum refresh ceiling"
    ],
    "whatToDoNext": [
      "Cap your framerate 3 FPS below your monitor's maximum refresh rate using your graphics driver",
      "Adjust graphics settings to eliminate severe framerate drops below the minimum VRR threshold",
      "Enable 'VRR Flicker Mitigation' in your monitor OSD if available",
      "Disable VRR for static or poorly optimized titles with unstable frame pacing"
    ],
    "sections": [
      {
        "title": "The Physics of Refresh-Rate Dependent Gamma",
        "content": [
          "Liquid crystal molecules and OLED emissive capacitors lose charge gradually over the duration of a frame (leakage current). At 144Hz (6.9ms), pixels are refreshed frequently and hold steady voltage. At 48Hz (20.8ms), the voltage decays longer between refreshes.",
          "Panel manufacturers program factory gamma curves optimized for a specific refresh rate. When VRR varies the frame duration dynamically, the panel's actual gamma curve shifts, making near-black shades appear lighter or darker on every alternating frame."
        ]
      },
      {
        "title": "Low Framerate Compensation (LFC) Jolt",
        "content": [
          "When framerate dips below the hardware VRR threshold (e.g. 48Hz), the driver instantly doubles or triples frames (e.g. displaying 45 FPS at 90Hz).",
          "This sudden jump from 48Hz timing to 90Hz timing creates an instant step change in panel gamma, perceived by the human eye as an obvious flash or brightness jolt."
        ]
      }
    ],
    "faq": [
      {
        "question": "Why are OLED monitors more prone to VRR flicker than IPS?",
        "answer": "OLED pixels are driven by thin-film transistors with voltage-dependent subpixel capacitors. Because OLED produces true zero black, the human eye is exceptionally sensitive to tiny luminance percentage swings in the 1% to 10% dark gray range."
      },
      {
        "question": "Does using an HDMI 2.1 or DisplayPort cable make a difference for VRR flicker?",
        "answer": "A high-quality cable prevents signal dropouts, but VRR gamma flicker is an inherent panel characteristic driven by TFT charging physics, not cable bandwidth."
      }
    ],
    "relatedTestIds": [
      "vrr-flicker-test",
      "vrr-test"
    ],
    "relatedTroubleshootingIds": [
      "screen-flickering"
    ],
    "relatedArticleSlugs": [
      "refresh-rate-and-frame-rates",
      "black-levels-and-shadow-detail"
    ],
    "primarySearchIntent": "vrr brightness flicker g-sync freesync gamma shift explained",
    "readingTimeMinutes": 6
  },
  // New Feature Guide: Pursuit Camera Tracking & Photographic MPRT Measurement
  {
    "slug": "pursuit-camera-and-mprt-measurement",
    "category": "display-basics",
    "title": "퍼슛 카메라(Pursuit Camera) 추적 및 사진 기반 MPRT 측정",
    "subtitle": "움직이는 패턴과 카메라를 동기화하여 사람의 눈에 보이는 실제 모션 블러(MPRT)를 포착하는 방법.",
    "description": "퍼슛 카메라 촬영 원리, 고정식 카메라가 모션 블러를 측정할 수 없는 이유, 스마트폰을 이용한 과학적인 MPRT 측정법을 설명합니다.",
    "directAnswer": "퍼슛 카메라는 화면 속 물체의 이동 속도와 동일하게 카메라를 이동시키며 노출하여 사람의 안구 추적 시각을 재현하는 측정 기법입니다.",
    "whyItMatters": "고정 사진은 단순 프레임 중첩만 보여줍니다. 동기화된 추적 촬영을 통해서만 잔상(GtG)과 디스플레이 홀드 시간(MPRT)을 분리 측정할 수 있습니다.",
    "whatToLookFor": [
      "Crisp, single-line alignment of temporal graduation tick marks in captured photos",
      "True width of trailing motion blur directly proportional to pixel hold time",
      "Overdrive coronas (inverse ghosting halo trails) behind moving targets",
      "Phosphor or LED decay trails behind moving high-contrast bars"
    ],
    "howToTest": [
      "Open the Pursuit Camera Sync Track in Screen Tester",
      "Set your smartphone or camera to manual exposure mode with a shutter speed between 1/15s and 1/30s",
      "Pan your camera smoothly alongside the moving pattern from left to right",
      "Inspect your photo: if the vertical tick marks form a clean, straight line, your pan was synchronized"
    ],
    "whatScreenTesterCanObserve": [
      "Precision temporal graduation tracks designed specifically for camera tracking calibration",
      "Constant velocity horizontal moving targets across multiple background contrast levels",
      "Visual reference lines for quantifying motion smear width"
    ],
    "whatScreenTesterCannotDetermine": [
      "Camera panning velocity or shutter synchronization automatically",
      "Microsecond photodiode GtG transition curves without laboratory optical probes",
      "Camera lens optical distortion or motion blur introduced by handshake"
    ],
    "commonCauses": [
      "Camera panning speed too fast or too slow relative to the target on-screen velocity",
      "Camera shutter speed too short (freezing a single static frame instead of tracking)",
      "Inconsistent camera tracking acceleration across the display horizontal axis",
      "Display framerate drops or browser stutter during photographic capture"
    ],
    "whatToDoNext": [
      "Use a smooth tracking surface or slider rail for consistent camera movement",
      "Examine the trailing edge of captured targets to compare monitor overdrive modes (Off, Normal, Extreme)",
      "Calculate MPRT in milliseconds by measuring the smear pixel width divided by velocity in pixels per millisecond"
    ],
    "sections": [
      {
        "title": "Why Stationary Cameras Fail for Motion Blur",
        "content": [
          "When you photograph a moving on-screen target with a stationary camera, the sensor accumulates multiple successive static display refreshes in place, producing stepped ghost duplicates.",
          "Human eyes do not sit still; they track moving objects with continuous smooth pursuit. A pursuit camera reproduces this biological mechanism by panning synchronously across the screen during the camera exposure."
        ]
      },
      {
        "title": "The Temporal Graduation Sync Track",
        "content": [
          "Screen Tester incorporates a temporal graduation track—a series of white vertical ticks offset across successive refresh frames.",
          "When a pursuit camera is perfectly synchronized in speed and angle, the staggered ticks overlap into a single, razor-sharp vertical line in the final photograph, verifying the validity of the measurement."
        ]
      }
    ],
    "faq": [
      {
        "question": "Can I use a modern smartphone for pursuit camera testing?",
        "answer": "Yes! Modern smartphones with 'Pro' or 'Manual' camera modes allow manual shutter speed control (set to 1/15s to 1/30s). Panning smoothly by hand along a desk surface can produce excellent synchronized pursuit photos."
      },
      {
        "question": "What is the difference between GtG and MPRT?",
        "answer": "GtG (Gray-to-Gray) measures how fast liquid crystals physically rotate from one color to another. MPRT (Motion Picture Response Time) measures the total duration a pixel is seen by the eye, dominated by the frame hold duration on sample-and-hold displays."
      }
    ],
    "relatedTestIds": [
      "pursuit-camera-test",
      "ghosting-test",
      "motion-blur-test"
    ],
    "relatedTroubleshootingIds": [
      "blurry-motion"
    ],
    "relatedArticleSlugs": [
      "monitor-ghosting-and-motion-blur",
      "backlight-strobing-and-strobe-crosstalk"
    ],
    "primarySearchIntent": "pursuit camera test mprt ghosting photography explained",
    "readingTimeMinutes": 7
  },
  // New Feature Guide: Audio-Video Lip-Sync Calibration & Latency Alignment
  {
    "slug": "audio-video-sync-and-latency",
    "category": "device-and-input",
    "title": "오디오-비디오 립싱크 교정 및 지연 시간 정렬",
    "subtitle": "화면 렌더링 지연, 사운드바 딜레이, 블루투스 코덱 지연을 정밀 측정하여 오차 없는 동기화 달성.",
    "description": "음성과 영상의 싱크가 어긋나는 이유, 밀리초 단위 스윕 패턴을 활용한 측정법, 오디오 지연 보정 방법을 알아봅니다.",
    "directAnswer": "오디오-비디오 싱크 캘리브레이션은 시각적 플래시와 청각적 비프음을 정확히 일치시켜 영상 처리 및 오디오 버퍼 지연을 보정하는 작업입니다.",
    "whyItMatters": "HDR 및 업스케일링은 화면 지연을 유발하고, 블루투스 및 사운드바는 오디오 지연을 유발하여 대화 시 입모양과 소리가 어긋납니다.",
    "whatToLookFor": [
      "Simultaneous occurrence of the visual flash and acoustic 1 kHz beep",
      "Audio arriving before the visual flash (display lag exceeds audio delay)",
      "Video flash arriving before the audio beep (audio processing or Bluetooth lag)",
      "Consistency of sync across multiple browser tabs and media playback apps"
    ],
    "howToTest": [
      "Open the Audio / Video Lip-Sync Calibration Test in Screen Tester",
      "Ensure your system speakers or headphones are active and unmuted",
      "Watch the rotating dial as it crosses the top zero marker and listen for the tone",
      "Adjust the millisecond offset slider until the flash and sound perceive as perfectly instantaneous"
    ],
    "whatScreenTesterCanObserve": [
      "Human perceptual synchronization between optical visual flashes and acoustic pulses",
      "Calibration offset values in milliseconds (+/- 250ms range)",
      "Acoustic pulse delivery via precise Web Audio API synthesized oscillators"
    ],
    "whatScreenTesterCannotDetermine": [
      "Hardware electrical transit latency across physical HDMI or optical cables",
      "Microsecond acoustic propagation delay through room air",
      "Operating system Bluetooth audio stack internal buffer configurations"
    ],
    "commonCauses": [
      "Heavy TV video processing modes ('Cinema' or 'Vivid' with frame smoothing enabled)",
      "Bluetooth audio compression codec buffers (SBC and AAC have 100ms-200ms latency)",
      "HDMI eARC audio format transcoding delay (e.g. PCM to Dolby Digital bitstream conversion)",
      "Display scaler lag when feeding non-native video resolutions"
    ],
    "whatToDoNext": [
      "Enable 'Game Mode' on your TV or monitor to bypass image processing latency",
      "Use low-latency Bluetooth codecs (aptX Low Latency, LC3) or wired 3.5mm / USB connections",
      "Adjust audio delay settings in your TV, soundbar, or media player (e.g. VLC or Kodi) by the measured offset"
    ],
    "sections": [
      {
        "title": "ITU-R Perceptual Thresholds for Lip-Sync",
        "content": [
          "According to international broadcasting standard ITU-R BT.1359-1, the human brain perceives audio-video misalignment asymmetrically.",
          "Audio can lead video by no more than +45ms before becoming objectionable, while audio can lag behind video by up to -125ms because humans are accustomed to light traveling faster than sound over physical distances."
        ]
      },
      {
        "title": "Bluetooth Audio Latency vs. HDMI eARC",
        "content": [
          "Standard Bluetooth audio profiles (A2DP with SBC or AAC codecs) buffer audio packets to prevent wireless dropouts, typically introducing 120ms to 250ms of delay.",
          "Direct HDMI eARC connections offer near-zero delay when passing uncompressed LPCM, but enabling on-the-fly Dolby Atmos transcoding inside a television can re-introduce 50ms to 100ms of lag."
        ]
      }
    ],
    "faq": [
      {
        "question": "What is an acceptable lip-sync delay for watching movies?",
        "answer": "A delay within +/- 20ms is virtually undetectable by human viewers. A delay exceeding 50ms is noticeable on close-up dialogue, and over 100ms becomes distracting."
      },
      {
        "question": "Why does audio sync drift over time during long videos?",
        "answer": "Clock drift between the display refresh rate (e.g. 59.94Hz vs 60.00Hz) and the audio hardware sample clock (44.1kHz vs 48kHz) can accumulate gradual desync unless re-clocked by the media player."
      }
    ],
    "relatedTestIds": [
      "audio-sync-test",
      "speaker-test"
    ],
    "relatedTroubleshootingIds": [
      "audio-out-of-sync"
    ],
    "relatedArticleSlugs": [
      "audio-channel-testing-and-stereo-separation"
    ],
    "primarySearchIntent": "audio video lip sync calibration test soundbar delay explained",
    "readingTimeMinutes": 6
  },
  // New Feature Guide: Gamepad Diagnostics: Analog Stick Drift, Circularity & Deadzones
  {
    "slug": "gamepad-diagnostics-and-stick-drift",
    "category": "device-and-input",
    "title": "게임패드 진단: 아날로그 스틱 드리프트, 진원도 및 데드존",
    "subtitle": "가변저항 마모, 홀 이펙트 자기 센서, 중립 좌표 쏠림 현상 및 데드존 설정 가이드.",
    "description": "컨트롤러 스틱 쏠림(드리프트)의 원인, Gamepad API를 활용한 실시간 축 점검 및 트리거 입력 테스트 방법을 설명합니다.",
    "directAnswer": "스틱 드리프트는 내부 가변저항의 탄소 패턴이 마모되거나 먼지가 유입되어 스틱을 만지지 않아도 좌표가 쏠리는 현상입니다.",
    "whyItMatters": "정밀 조준이 빗나가고 카메라가 저절로 회전합니다. 조기 진단을 통해 데드존을 조정하거나 A/S 보증 교환을 받을 수 있습니다.",
    "whatToLookFor": [
      "Resting coordinate position shifting away from true center (0.00, 0.00)",
      "Asymmetrical circularity plots showing flat edges or corner clipping",
      "Jittery or erratic axis coordinates when moving thumbsticks smoothly",
      "Analog trigger values failing to reach 100% or registering phantom squeeze input"
    ],
    "howToTest": [
      "Connect your controller via USB cable or Bluetooth",
      "Press any button on the gamepad to wake the HTML5 Gamepad API in Screen Tester",
      "Observe the resting crosshair position with hands completely off both sticks",
      "Rotate the sticks along their outer boundaries to inspect the circular boundary track"
    ],
    "whatScreenTesterCanObserve": [
      "Real-time X and Y axis values normalized between -1.000 and +1.000",
      "All 16 standard digital and pressure-sensitive button actuations",
      "Gamepad device vendor identification and hardware model names"
    ],
    "whatScreenTesterCannotDetermine": [
      "Physical resistance values of potentiometer carbon tracks in ohms",
      "Internal battery charge level (not exposed by standard web APIs)",
      "Hardware internal firmware calibration settings stored on controller EEPROM"
    ],
    "commonCauses": [
      "Frictional wear of the conductive carbon wiper track inside the thumbstick module",
      "Accumulated dust, lint, and plastic particulate inside the sensor housing",
      "Weakened centering springs failing to return the stick to physical neutral",
      "Operating system deadzone configured too low for the controller's physical tolerances"
    ],
    "whatToDoNext": [
      "Clean around the thumbstick ball with compressed air or electronic contact cleaner",
      "Increase in-game inner deadzones to accommodate small resting drift (<5%)",
      "Recalibrate the controller in Windows Game Controllers or Steam settings",
      "Upgrade to controllers equipped with contactless Hall-effect magnetic sensors"
    ],
    "sections": [
      {
        "title": "Potentiometer Thumbsticks vs. Hall-Effect Sensors",
        "content": [
          "Traditional game controllers (Xbox, DualSense, Switch Pro) use analog potentiometers where a physical metal wiper rubs against a carbon resistive track. Over millions of cycles, the carbon rubs away, changing resistance and causing drift.",
          "Modern Hall-effect thumbsticks use permanent magnets and semiconductor sensors that measure magnetic field strength without physical contact, making them immune to mechanical wiper wear and permanent stick drift."
        ]
      },
      {
        "title": "Circularity Error and Deadzones",
        "content": [
          "Circularity error measures how accurately an analog stick travels through a true geometric circle. Excessive outer deadzones clip coordinates into a rounded square, causing sudden diagonal speed boosts.",
          "Inner deadzones define the center resting dead-band. A properly calibrated inner deadzone allows tiny manufacturing tolerances without sending unwanted character movement."
        ]
      }
    ],
    "faq": [
      {
        "question": "How much stick drift is considered normal?",
        "answer": "A resting drift value under 0.05 (5%) is normal mechanical play and is easily absorbed by default game deadzones. Drift exceeding 0.10 (10%) causes noticeable character movement and indicates a worn sensor."
      },
      {
        "question": "Can stick drift be fixed by software updates?",
        "answer": "Firmware updates can recalibrate the software center point or increase default deadzones, but physical carbon track wear cannot be repaired by software."
      }
    ],
    "relatedTestIds": [
      "gamepad-test",
      "reaction-time-test"
    ],
    "relatedTroubleshootingIds": [],
    "relatedArticleSlugs": [
      "what-browser-display-tests-can-and-cannot-measure"
    ],
    "primarySearchIntent": "gamepad tester stick drift controller circularity deadzone test",
    "readingTimeMinutes": 6
  },
  // New Feature Guide: Display Bandwidth, Video Timings & Cable Standards
  {
    "slug": "display-bandwidth-and-cable-standards",
    "category": "tv-and-display-setup",
    "title": "디스플레이 대역폭, 비디오 타이밍 및 케이블 규격",
    "subtitle": "비압축 데이터 전송률 계산, VESA DSC 무손실 압축 및 HDMI / DisplayPort 호환성 가이드.",
    "description": "영상 대역폭 계산 공식, VESA CVT-RB 블랭킹 오버헤드, 인터페이스별 한계와 DSC 압축의 필요성을 상세히 알아봅니다.",
    "directAnswer": "디스플레이 대역폭은 해상도, 주사율, 색상 깊이, 크로마 서브샘플링에 따라 비디오 신호를 전송하는 데 필요한 초당 전송량(Gbps)입니다.",
    "whyItMatters": "4K 240Hz 등 초고주사율 모니터는 구형 케이블 한계를 쉽게 초과하여 화면 깜빡임, 신호 끊김, 색상 왜곡을 초래합니다.",
    "whatToLookFor": [
      "Black screen blinking or signal loss during high-framerate gaming",
      "Automatic downsampling to 4:2:2 or 4:2:0 chroma subsampling causing fringed text",
      "Color depth being clamped to 8-bit instead of 10-bit HDR",
      "Warning messages in GPU control panels regarding bandwidth limits"
    ],
    "howToTest": [
      "Open the Display Bandwidth Calculator in Screen Tester Tools",
      "Select your monitor's resolution, refresh rate, color depth, and chroma subsampling",
      "Review calculated uncompressed and DSC data rates against HDMI and DisplayPort interface standards",
      "Verify whether your existing cable meets the necessary transmission standard"
    ],
    "whatScreenTesterCanObserve": [
      "Mathematical bandwidth calculation incorporating VESA CVT-RB2 blanking intervals",
      "Comparison across HDMI 2.0/2.1, DisplayPort 1.2/1.4/2.1, and Thunderbolt specifications",
      "Verification of whether VESA DSC 1.2a allows transmission over specific interfaces"
    ],
    "whatScreenTesterCannotDetermine": [
      "Physical cable electrical attenuation or signal integrity in decibels",
      "Whether a specific third-party cable is counterfeit or substandard",
      "GPU hardware display pipeline stream count limits"
    ],
    "commonCauses": [
      "Using an older HDMI 2.0 cable (18 Gbps) on a 4K 120Hz/144Hz monitor requiring HDMI 2.1 (48 Gbps)",
      "DisplayPort 1.4 connection bottlenecked at 4K 240Hz without VESA DSC support",
      "Low-quality long cable runs (>3 meters) causing packet loss and display blinks",
      "Monitors sharing bandwidth across multiple MST daisy-chained displays"
    ],
    "whatToDoNext": [
      "Upgrade to certified 'Ultra High Speed HDMI' (48 Gbps) or 'DP80' DisplayPort cables",
      "Enable VESA DSC (Display Stream Compression) in your monitor OSD and GPU driver",
      "Lower color depth from 10-bit to 8-bit or adjust refresh rate if cable bandwidth is constrained"
    ],
    "sections": [
      {
        "title": "The Mathematical Bandwidth Formula",
        "content": [
          "Raw video data rate is calculated as: Total Horizontal Pixels × Total Vertical Pixels × Refresh Rate × Color Depth × Chroma Factor.",
          "However, video transmission also requires blanking intervals (front porch, sync pulse, back porch) defined by standards such as VESA CVT-RB2 (Reduced Blanking v2), adding approximately 15% to 20% overhead above active pixel dimensions."
        ]
      },
      {
        "title": "Understanding VESA DSC 1.2a",
        "content": [
          "Display Stream Compression (DSC 1.2a) is an industry-standard, visually lossless compression algorithm that compresses video data rates by up to 3:1.",
          "DSC operates with sub-millisecond line-buffered latency, allowing ultra-high-resolution gaming (like 4K 240Hz or 8K 60Hz) over DisplayPort 1.4 and HDMI 2.1 interfaces without humanly perceptible visual degradation."
        ]
      }
    ],
    "faq": [
      {
        "question": "Does DSC compression add noticeable input lag?",
        "answer": "No. VESA DSC processes pixels on a scanline-by-scanline basis with a delay of less than a few scanlines—a fraction of a microsecond—which is imperceptible to gamers."
      },
      {
        "question": "What is the difference between DisplayPort 1.4 and DisplayPort 2.1?",
        "answer": "DisplayPort 1.4 supports a maximum data rate of 25.92 Gbps (HBR3). DisplayPort 2.1 introduces UHBR transmission modes, reaching up to 77.37 Gbps (UHBR20), allowing uncompressed 4K 240Hz HDR."
      }
    ],
    "relatedTestIds": [
      "display-bandwidth-calculator"
    ],
    "relatedTroubleshootingIds": [],
    "relatedArticleSlugs": [
      "hdr-display-fundamentals",
      "color-depth-and-banding"
    ],
    "primarySearchIntent": "display bandwidth calculator hdmi displayport dsc cable standards",
    "readingTimeMinutes": 7
  },
  // New Feature Guide: Ergonomic Viewing Distance, Visual Acuity & Retina PPD
  {
    "slug": "viewing-distance-and-retina-resolution",
    "category": "tv-and-display-setup",
    "title": "인체공학적 적정 시청 거리, 시력 및 레티나 PPD 계산",
    "subtitle": "시야각당 픽셀 밀도(PPD), 20/20 시력 한계치 및 THX/SMPTE 권장 시야각 산출법.",
    "description": "모니터와 TV의 이상적인 시청 거리, PPD의 개념, 화면 픽셀 구조가 눈에 띄지 않게 되는 레티나 임계 거리를 확인하세요.",
    "directAnswer": "적정 시청 거리는 인간 시각의 해상력(60 PPD)과 인체공학적 시야각을 조화시켜 픽셀 격자감을 없애고 목 피로를 예방하는 배치 거리입니다.",
    "whyItMatters": "너무 가까우면 픽셀 입자가 보이고 목에 무리가 가며, 너무 멀면 몰입감이 떨어지고 작은 텍스트를 읽기 어렵습니다.",
    "whatToLookFor": [
      "Individual pixel grid or screen-door effect visible at your sitting distance",
      "Eye strain or excessive head movement needed to view screen corners",
      "Text clarity and readability without straining or leaning forward",
      "Immersion level matching recommendations from THX (40°) and SMPTE (30°)"
    ],
    "howToTest": [
      "Open the Viewing Distance & Retina PPD Calculator in Screen Tester Tools",
      "Enter your screen diagonal size (inches), resolution, and current viewing distance",
      "Check your calculated Pixels Per Degree (PPD) against the 60 PPD Retina limit",
      "Review recommended distances for desktop productivity, gaming, and home theater"
    ],
    "whatScreenTesterCanObserve": [
      "Trigonometric calculation of visual angle and Pixels Per Degree (PPD)",
      "Determination of the exact distance where individual pixels become indistinguishable",
      "Field of view calculations matching THX and SMPTE theatrical recommendations"
    ],
    "whatScreenTesterCannotDetermine": [
      "Physical sitting distance from user to screen without user input",
      "Individual user ophthalmic refractive errors (astigmatism, myopia)",
      "Ambient illumination levels impacting pupil dilation and visual acuity"
    ],
    "commonCauses": [
      "Deep desk setups placing small 24-inch 1080p screens too far for comfortable reading",
      "Shallow desks placing 32-inch or 42-inch monitors too close, causing neck fatigue",
      "4K television viewed from standard couch distances (3+ meters) where resolution advantage is lost to the human eye",
      "Incorrect font scaling forcing unnatural forward head posture"
    ],
    "whatToDoNext": [
      "Position desktop monitors approximately an arm's length away (50cm to 75cm / 20in to 30in)",
      "Align the top third of the monitor at or slightly below eye level to prevent neck strain",
      "Increase OS text scaling rather than leaning closer if text feels difficult to read"
    ],
    "sections": [
      {
        "title": "The Science of 20/20 Vision and 60 PPD",
        "content": [
          "Standard 20/20 Snellen visual acuity corresponds to the ability to resolve two points separated by 1 arcminute (1/60th of a degree) of visual angle.",
          "When a display delivers 60 Pixels Per Degree (PPD) at your viewing distance, each pixel subtends exactly 1 arcminute or less. At this threshold—popularized as 'Retina' resolution—the human retina can no longer distinguish individual pixels, and images appear continuous."
        ]
      },
      {
        "title": "Cinematic Field of View: SMPTE vs. THX",
        "content": [
          "SMPTE (Society of Motion Picture and Television Engineers) recommends a 30-degree field of view for general entertainment, providing comfortable viewing without eye strain.",
          "THX recommends a 40-degree field of view for home theaters and cinematic gaming, delivering an immersive experience where the screen fills your primary visual field."
        ]
      }
    ],
    "faq": [
      {
        "question": "Can the human eye see higher resolution than 60 PPD?",
        "answer": "Individuals with exceptional 20/15 or 20/10 vision can resolve up to 80 or 85 PPD. However, for the vast majority of people, 60 PPD represents the practical limit where increasing pixel density yields diminishing visual returns."
      },
      {
        "question": "What is the ideal viewing distance for a 27-inch 1440p monitor?",
        "answer": "For a 27-inch 1440p display (109 PPI), the Retina threshold is approximately 80 cm (31 inches). A typical ergonomic desktop distance of 65 cm to 75 cm provides an ideal balance of sharpness and field of view."
      }
    ],
    "relatedTestIds": [
      "viewing-distance-calculator",
      "resolution-checker"
    ],
    "relatedTroubleshootingIds": [
      "blurry-text"
    ],
    "relatedArticleSlugs": [
      "resolution-and-scaling",
      "text-clarity-and-subpixel-rendering"
    ],
    "primarySearchIntent": "monitor viewing distance calculator retina ppd pixel density",
    "readingTimeMinutes": 6
  },
  // New Feature Guide: Dual-Monitor White Point Matching & Multi-Display Calibration
  {
    "slug": "dual-monitor-color-and-white-point-matching",
    "category": "tv-and-display-setup",
    "title": "듀얼 모니터 화이트 포인트 매칭 및 색상 균일화 캘리브레이션",
    "subtitle": "색온도, RGB 게인 조정 및 서로 다른 패널 간 조건등색(메타메리즘) 불일치 극복하기.",
    "description": "동일한 설정에서도 두 모니터의 흰색 톤이 달라 보이는 이유, 메타메리즘 실패의 영향 및 시각적 일치 기법을 알아봅니다.",
    "directAnswer": "화이트 포인트 매칭은 기준 흰색 화면을 나란히 띄우고 모니터 OSD의 RGB 게인을 조절하여 두 화면의 색온도와 톤을 일치시키는 작업입니다.",
    "whyItMatters": "한쪽은 누렇고 한쪽은 푸르스름하면 작업 시 시각적 피로가 누적되며 그래픽 디자인이나 영상 편집 시 색상 왜곡이 발생합니다.",
    "whatToLookFor": [
      "One screen appearing reddish/warm while the other looks cyan/cool",
      "Brightness disparities across adjacent white web pages or documents",
      "Color shifts across different panel technologies (IPS vs OLED vs VA)",
      "Differing anti-glare matte coatings altering perceived contrast"
    ],
    "howToTest": [
      "Open the Dual-Monitor White Point Matcher in Screen Tester across both screens",
      "Span the window across both displays or open matching browser windows on each monitor",
      "Select your primary calibrated display as the reference standard",
      "Adjust the secondary monitor's physical OSD RGB Gain (Red, Green, Blue) controls until the white fields match"
    ],
    "whatScreenTesterCanObserve": [
      "Split-canvas pure reference white and gray fields for side-by-side visual comparison",
      "Interactive RGB gain offsets and correlated color temperature sliders",
      "Color temperature presets from warm 5000K to cool 9300K"
    ],
    "whatScreenTesterCannotDetermine": [
      "Absolute CIE 1931 xy chromaticity coordinates without an optical colorimeter or spectrophotometer",
      "Backlight spectral emission power distribution (SPD)",
      "Automatic adjustment of physical monitor hardware OSD sliders"
    ],
    "commonCauses": [
      "Different backlight technologies (e.g. standard White-LED vs Quantum Dot WCG vs OLED)",
      "Metameric failure: screens with different light spectrums matching on a colorimeter but looking different to the human eye",
      "Factory calibration differences between different display brands and models",
      "Night Light, f.lux, or True Tone enabled on only one display"
    ],
    "whatToDoNext": [
      "Disable software color filters (Night Light, True Tone) across all operating system displays",
      "Set both monitors to their 'Custom' or 'User' Color Temperature OSD mode",
      "Use the human eye as a null detector: look back and forth rapidly between the screens while fine-tuning RGB Gain"
    ],
    "sections": [
      {
        "title": "The Phenomenon of Metameric Failure",
        "content": [
          "Two light sources with completely different spectral power distributions can stimulate human cone photoreceptors in ways that look identical under certain conditions—a phenomenon called metamerism.",
          "However, modern wide-gamut monitors (such as QD-OLED or Nano-IPS) produce narrow spectral peaks. Even if a hardware colorimeter reports both screens are calibrated to exact D65 (x=0.3127, y=0.3290), the human eye may still perceive one screen as noticeably greener or pinker due to individual observer metameric failure."
        ]
      },
      {
        "title": "Step-by-Step Visual Alignment Technique",
        "content": [
          "1. Designate your highest-quality display as the primary reference and set it to D65 / Standard.",
          "2. Match overall luminance first: adjust the secondary monitor's Brightness control so white pages appear equally luminous.",
          "3. Match tint: if the secondary monitor appears slightly green, reduce the Green gain in its OSD. If it looks cool/blue, reduce Blue or slightly boost Red and Green."
        ]
      }
    ],
    "faq": [
      {
        "question": "Can two completely different monitor models ever match 100% perfectly?",
        "answer": "They can be matched closely enough that the difference is unobtrusive for daily productivity. However, differences in panel coatings (matte vs glossy) and viewing angle gamma shifts mean slight optical differences will always remain."
      },
      {
        "question": "Should I calibrate white point with software profiles or monitor OSD?",
        "answer": "Always adjust the monitor's physical hardware OSD RGB gain controls first. Software GPU LUT adjustments can introduce color banding and reduce dynamic range."
      }
    ],
    "relatedTestIds": [
      "dual-monitor-matcher",
      "color-test",
      "white-level-test"
    ],
    "relatedTroubleshootingIds": [
      "color-tint"
    ],
    "relatedArticleSlugs": [
      "color-depth-and-banding",
      "display-uniformity"
    ],
    "primarySearchIntent": "dual monitor color match white point calibration different screens",
    "readingTimeMinutes": 7
  },
  // New Feature Guide: Display Inspection Reports, Defect Logging & Warranty Evidence
  {
    "slug": "display-inspection-reporting-and-certification",
    "category": "browser-and-testing",
    "title": "디스플레이 검수 보고서, 불량 로그 기록 및 품질 보증 증빙",
    "subtitle": "불량 화소, 빛샘, 패널 스펙을 좌표 기반 검수 인증서로 기록하여 교환 및 환불 증빙 자료 생성.",
    "description": "반품 가능 기간 내에 화면 결함을 완벽히 문서화하는 법, ISO 9241-307 픽셀 결함 등급, 신뢰할 수 있는 보고서 출력법을 설명합니다.",
    "directAnswer": "디스플레이 검수 보고서는 감지된 불량 화소 좌표, 패널 균일도 메모, 하드웨어 사양을 체계적으로 정리한 공식 검수 인증서입니다.",
    "whyItMatters": "제조사와 판매처는 교환 기간 내 명확한 증거를 요구합니다. 좌표와 결함 유형이 명시된 보고서는 RMA 승인을 크게 앞당겨 줍니다.",
    "whatToLookFor": [
      "Dead, stuck, and bright subpixel coordinates plotted across screen zones",
      "Backlight bleed severity and corner IPS glow notes",
      "Hardware GPU, browser user agent, and screen resolution parameters",
      "Timestamped inspection session records"
    ],
    "howToTest": [
      "Run the standard diagnostic sequence (Dead Pixels, Uniformity, Backlight Bleed) in Screen Tester",
      "Click directly on any observed defect to place a tagged marker (Dead, Stuck, or Bright)",
      "Open the Inspection Reports & Defect Log tool",
      "Review recorded observations and click 'Export Report' or 'Print Certificate' for your records"
    ],
    "whatScreenTesterCanObserve": [
      "Interactive coordinate logging of marked pixel defects across the display canvas",
      "Compilation of user observations across all test categories",
      "System hardware diagnostics (screen resolution, pixel ratio, color depth, browser engine)"
    ],
    "whatScreenTesterCannotDetermine": [
      "Physical manufacturer serial numbers etched on the rear monitor chassis label",
      "Retailer warranty policy return window eligibility",
      "Proof of physical shipping impact or drop damage"
    ],
    "commonCauses": [
      "Subpixel transistor failure during panel glass fabrication",
      "Uneven bezel clamp pressure causing localized backlight bleed",
      "Inadequate return window documentation leading to rejected merchant claims",
      "Unrecorded intermittent defects dismissed by technical support"
    ],
    "whatToDoNext": [
      "Save or print the generated inspection certificate as a PDF file",
      "Photograph the defect on the screen alongside the coordinate marker using a smartphone",
      "Submit the documentation to your retailer or monitor manufacturer within the return period"
    ],
    "sections": [
      {
        "title": "Understanding ISO 9241-307 Pixel Defect Classes",
        "content": [
          "Display manufacturers classify panel warranty coverage using ISO standard 9241-307, which defines four defect classes per million pixels:",
          "Class 0: Zero defect tolerance (premium professional medical or mastering monitors).",
          "Class 1: Up to 1 continuously bright pixel, 1 dead pixel, and 2-5 stuck subpixels per million pixels.",
          "Class 2: The standard consumer monitor tier, allowing up to 2 bright pixels, 2 dark pixels, and 5-10 stuck subpixels per million pixels."
        ]
      },
      {
        "title": "How to Build an Unassailable RMA Warranty Claim",
        "content": [
          "When claiming a return on a defective monitor, provide three pieces of documentation:",
          "1. The structured Screen Tester Inspection Certificate showing coordinates and defect classification.",
          "2. A close-up macro photograph showing the subpixel under test (e.g. black subpixel on pure white).",
          "3. A wide-angle photograph showing the full display with the defect visible in context."
        ]
      }
    ],
    "faq": [
      {
        "question": "Will one dead pixel qualify my monitor for a warranty replacement?",
        "answer": "Most consumer monitors fall under ISO Class 2, which requires 3 to 5 dead subpixels before qualifying for replacement. However, many reputable brands offer a 'Zero Bright Dot' guarantee covering any stuck pixel that shines permanently bright."
      },
      {
        "question": "Are inspection reports saved on your servers?",
        "answer": "No. All Screen Tester inspection observations, defect coordinates, and hardware diagnostic profiles are stored strictly locally in your browser's private session memory for maximum privacy."
      }
    ],
    "relatedTestIds": [
      "summary"
    ],
    "relatedTroubleshootingIds": [
      "dead-pixels",
      "stuck-pixels"
    ],
    "relatedArticleSlugs": [
      "dead-pixel-vs-stuck-pixel",
      "what-browser-display-tests-can-and-cannot-measure"
    ],
    "primarySearchIntent": "display inspection report monitor warranty defect documentation",
    "readingTimeMinutes": 6
  }
];
