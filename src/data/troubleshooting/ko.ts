import { TroubleshootingTopic } from "./types";

export const KO_TROUBLESHOOTING_TOPICS: TroubleshootingTopic[] = [
  {
    "id": "no-image",
    "title": "화면 안 나옴 (검은 화면 / 빈 화면)",
    "category": "display",
    "categoryTitle": "디스플레이 문제",
    "symptom": "모니터 전원 LED는 켜질 수 있지만, 화면은 아무런 영상, 아이콘, 백라이트 불빛 없이 완전히 검은 상태를 유지합니다.",
    "possibleCauses": [
      "디스플레이 전원 코드 또는 외부 AC 어댑터가 분리되었거나 느슨하게 연결됨",
      "모니터 입력 소스가 잘못 설정됨 (예: DisplayPort 1 대신 HDMI 2)",
      "GPU와 모니터 사이의 비디오 케이블이 느슨하거나 걸쇠가 풀림 또는 손상됨",
      "소스 기기가 절전 모드, 최대 절전 모드에 있거나 그래픽 드라이버가 충돌함",
      "부팅 시 운영체제에서 지원하지 않는 해상도/주사율 조합이 전송됨",
      "모니터 내부 인버터 보드, 전원 공급 기판 또는 T-Con 로직 보드 고장"
    ],
    "checks": [
      "모니터 전원 LED 확인: 꺼짐(전원 없음), 주황색/대기(절전 상태), 흰색/파란색 켜짐(활성 상태)?",
      "모니터 본체의 물리 OSD 메뉴 버튼을 누름: 제조사 설정 메뉴가 화면에 표시됩니까? (표시된다면 패널과 백라이트는 정상이므로 케이블이나 PC 문제입니다)",
      "DisplayPort 또는 HDMI 케이블 양쪽 끝을 GPU와 모니터에 단단히 다시 장착",
      "비디오 케이블이 메인보드 내장 단자가 아닌 외장 그래픽카드(GPU) 단자에 직결되었는지 확인",
      "다른 정상 케이블이나 다른 입력 포트에 연결하여 테스트"
    ],
    "whatScreenTesterCanTest": {
      "description": "기본 화면이 복구되면 Screen Tester를 통해 비디오 신호 안정성을 벤치마크하고 연속 테스트 패턴을 출력할 수 있습니다.",
      "links": [
        {
          "label": "디스플레이 정보",
          "testId": "display-info",
          "testPath": "/tests/display-info"
        },
        {
          "label": "해상도 체커",
          "testId": "resolution-checker",
          "testPath": "/tests/resolution-checker"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "물리적 AC 벽면 콘센트 전압이나 파워 어댑터의 DC 출력 전압",
      "메인보드 PCIe 슬롯의 레인 인식 또는 GPU 하드웨어 전원부 불량",
      "내부 인버터 회로 또는 LED 백라이트 스트립의 전기적 단선"
    ],
    "actions": [
      "모니터 전원 리셋: AC 전원 코드를 30초 동안 뽑고 전원 버튼을 10초간 누른 후 다시 연결",
      "Windows 단축키 Win + Ctrl + Shift + B를 눌러 그래픽 드라이버 서브시스템 재시작",
      "안전 모드 또는 UEFI BIOS로 부팅하여 기본 1024x768 60Hz 비디오 신호 강제 출력",
      "모니터를 다른 영상 기기(콘솔, 노트북 등)에 연결하여 PC와 모니터 중 어느 쪽 문제인지 분리"
    ],
    "whenToStop": "타는 냄새가 나거나 고주파 노이즈가 들리거나 케이블을 모두 뺀 상태에서도 내장 OSD 메뉴가 뜨지 않으면 하드웨어 수리를 받으세요."
  },
  {
    "id": "no-signal",
    "title": "신호 없음 / 케이블 연결 안 됨",
    "category": "display",
    "categoryTitle": "디스플레이 문제",
    "symptom": "모니터 전원은 켜지지만 '신호 없음', '케이블을 확인하십시오'라는 경고가 뜨고 즉시 절전 모드로 들어갑니다.",
    "possibleCauses": [
      "모니터 OSD 메뉴에서 잘못된 물리 입력 포트가 수동 선택됨",
      "비디오 케이블 대역폭 초과 또는 핀 휨/접촉 불량 (DisplayPort 핀 손상 등)",
      "USB-C / Thunderbolt 독, KVM 스위치 또는 젠더 어댑터의 연결 협상 실패",
      "운영체제가 패널에서 지원하지 않는 픽셀 클럭, 주사율 또는 해상도를 출력함",
      "디스플레이 초기화 중 GPU 드라이버가 비활성화되거나 오류 발생"
    ],
    "checks": [
      "OSD 메뉴에서 입력을 '자동 감지'에서 실제 연결된 포트로 수동 전환",
      "케이블 양쪽을 분리하여 핀이 휘었거나 이물질이 끼었는지 육안 확인",
      "허브나 젠더를 우회하여 GPU에서 모니터로 케이블을 직접 연결",
      "그래픽카드의 다른 DisplayPort 또는 HDMI 포트에 연결해보기"
    ],
    "whatScreenTesterCanTest": {
      "description": "브라우저가 보고하는 하드웨어 파이프라인, 주사율 및 해상도 메타데이터를 정밀하게 검증합니다.",
      "links": [
        {
          "label": "디스플레이 정보",
          "testId": "display-info",
          "testPath": "/tests/display-info"
        },
        {
          "label": "주사율 테스트",
          "testId": "refresh-rate-test",
          "testPath": "/tests/refresh-rate-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "물리적 하드웨어 신호 무결성 또는 전송 선로 감쇠율",
      "펌웨어 수준에서의 HDCP 암호화 핸드셰이크 거절",
      "GPU 단자 내부의 물리적 핀 접촉 불량"
    ],
    "actions": [
      "인증된 정품 케이블(HDMI 2.1 Ultra High Speed 또는 DP 1.4/2.1 VESA 인증품)로 교체",
      "DDU(Display Driver Uninstaller)를 이용해 안전 모드에서 GPU 드라이버 클린 재설치",
      "모니터 OSD 메뉴에서 공장 초기화 수행",
      "모니터 및 그래픽카드 펌웨어 최신 버전으로 업데이트"
    ],
    "whenToStop": "여러 개의 인증 케이블과 다른 기기들을 연결해도 모든 포트에서 신호를 잡지 못하면 메인보드나 T-Con 보드 고장입니다."
  },
  {
    "id": "wrong-resolution",
    "title": "잘못된 해상도 / 화면 늘어남 / 블랙바 발생",
    "category": "display",
    "categoryTitle": "디스플레이 문제",
    "symptom": "바탕화면 글씨가 흐릿하고 좌우로 늘어나거나 찌그러지며 상하좌우에 검은 여백(레터박스/필러박스)이 생깁니다.",
    "possibleCauses": [
      "운영체제 디스플레이 설정이 권장 네이티브 해상도가 아닌 다른 값으로 설정됨",
      "GPU 스케일링 설정이 '전체 화면'이 아닌 '종횡비 유지' 또는 '중앙'으로 구성됨",
      "모니터 OSD 메뉴에서 종횡비가 비정상적으로 강제 고정됨 (16:9 패널에 4:3 강제 등)",
      "저품질 HDMI 케이블이 대역폭을 제한하여 4K 대신 1080p로만 잡힘",
      "호환되지 않거나 오래된 기본 디스플레이 드라이버가 로드됨"
    ],
    "checks": [
      "모니터 제품 사양표에서 패널의 정확한 권장 네이티브 해상도를 확인",
      "Windows 디스플레이 설정에서 '(권장)'으로 표시된 해상도가 선택되어 있는지 확인",
      "모니터 OSD 설정에서 화면 배율을 '1:1' 또는 '자동'으로 설정",
      "NVIDIA 제어판 또는 AMD Software에서 바탕화면 크기 및 위치 조절 확인"
    ],
    "whatScreenTesterCanTest": {
      "description": "1픽셀 단위 정밀 그리드와 기하학적 정원 패턴을 통해 스케일링 왜곡을 한눈에 식별할 수 있습니다.",
      "links": [
        {
          "label": "해상도 체커",
          "testId": "resolution-checker",
          "testPath": "/tests/resolution-checker"
        },
        {
          "label": "스케일링 및 종횡비 테스트",
          "testId": "scaling-aspect-test",
          "testPath": "/tests/scaling-aspect-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "모니터 하드웨어 스케일러와 GPU 스케일링의 내부 알고리즘 차이",
      "모니터 내부 EEPROM의 손상된 EDID 데이터 블록"
    ],
    "actions": [
      "운영체제 설정에서 정확한 네이티브 해상도를 선택",
      "NVIDIA, AMD 또는 Intel 공식 사이트에서 최신 그래픽 드라이버 설치",
      "GPU 제어판에서 스케일링 수행 방식을 'GPU'로 선택하고 종횡비 지정",
      "EDID 인식 오류가 있을 경우 CRU(Custom Resolution Utility)로 사용자 지정 해상도 등록"
    ],
    "whenToStop": "모니터 자체 OSD 설정 화면 자체가 기하학적으로 일그러져 보인다면 모니터 스케일러 칩의 물리적 고장입니다."
  },
  {
    "id": "wrong-refresh-rate",
    "title": "잘못된 주사율 / 60Hz로 고정됨",
    "category": "display",
    "categoryTitle": "디스플레이 문제",
    "symptom": "144Hz, 240Hz, 360Hz 게이밍 모니터인데도 화면이 뚝뚝 끊기며 운영체제 설정에서 60Hz만 선택 가능합니다.",
    "possibleCauses": [
      "고주사율을 지원하지 않는 구형 HDMI 1.4 케이블로 연결됨",
      "드라이버 업데이트나 윈도우 업데이트 후 고급 디스플레이 설정이 60Hz로 초기화됨",
      "모니터 OSD에서 DisplayPort 버전이 DP 1.1/1.2로 제한되어 있음",
      "주사율이 서로 다른 다중 모니터 사용으로 인한 GPU 클럭 동기화 혼선",
      "노트북에서 외장 출력이 내장 그래픽(iGPU)을 경유하도록 제한됨"
    ],
    "checks": [
      "Windows 설정 > 시스템 > 디스플레이 > 고급 디스플레이에서 새로 고침 빈도(주사율) 확인",
      "모니터 OSD 메뉴에서 활성화된 DisplayPort 버전 확인 (DP 1.4 또는 2.1로 변경)",
      "케이블 종류 확인: PC 고주사율 환경에서는 HDMI보다 DisplayPort 연결을 권장합니다",
      "모니터 OSD와 드라이버 제어판에서 가변 주사율(G-Sync/FreeSync) 활성화"
    ],
    "whatScreenTesterCanTest": {
      "description": "requestAnimationFrame을 활용한 정밀 프레임 타이밍 측정으로 프레임 드랍과 마이크로 스터터링을 감지합니다.",
      "links": [
        {
          "label": "주사율 테스트",
          "testId": "refresh-rate-test",
          "testPath": "/tests/refresh-rate-test"
        },
        {
          "label": "VRR 테스트",
          "testId": "vrr-test",
          "testPath": "/tests/vrr-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "GPU 물리 출력단의 하드웨어 클럭 지터",
      "G-Sync 하드웨어 전용 모듈의 내부 펌웨어 상태"
    ],
    "actions": [
      "Windows 디스플레이 및 그래픽 제어판에서 최대 주사율을 수동으로 지정",
      "VESA 인증 DisplayPort 1.4 또는 HDMI 2.1 케이블로 교체",
      "모니터 OSD 설정을 초기화하고 패널 오버클럭 옵션이 있다면 활성화",
      "그래픽카드 드라이버를 최신 버전으로 업데이트"
    ],
    "whenToStop": "공식 사양의 주사율을 선택했을 때 화면에 블랙아웃이 반복되면 케이블 대역폭 부족이거나 패널 불량입니다."
  },
  {
    "id": "screen-tearing",
    "title": "화면 찢어짐 (티어링) / 가로줄 어긋남 현상",
    "category": "display",
    "categoryTitle": "디스플레이 문제",
    "symptom": "빠른 화면 회전이나 움직임 중에 화면이 가로로 찢어지거나 상하가 어긋나서 표시됩니다.",
    "possibleCauses": [
      "게임 내 또는 드라이버 설정에서 수직동기화(V-Sync)가 비활성화됨",
      "GPU 프레임레이트가 모니터의 VRR(G-Sync/FreeSync) 작동 범위를 벗어남",
      "드라이버 제어판 또는 모니터 OSD에서 G-Sync / FreeSync가 꺼져 있음",
      "게임이 테두리 없는 창 모드로 실행되어 윈도우 창 관리자(DWM)와 충돌",
      "GPU가 모니터의 주사 주기와 비동기 상태로 프레임버퍼를 교체함"
    ],
    "checks": [
      "모니터 OSD 설정에서 G-Sync/FreeSync가 켜져 있는지 확인",
      "NVIDIA 제어판의 'G-SYNC 설정' 메뉴에서 활성화 체크",
      "게임 내 프레임레이트가 모니터의 최대 주사율을 초과하는지 확인",
      "제어판에서 수직동기를 '켜기'로 두고 최대 프레임 속도를 최대 주사율보다 3 낮게 제한"
    ],
    "whatScreenTesterCanTest": {
      "description": "초고속 이동 고대비 바 패턴을 생성하여 티어링 라인과 프레임 동기화 상태를 시각적으로 확인합니다.",
      "links": [
        {
          "label": "화면 티어링 테스트",
          "testId": "screen-tearing-test",
          "testPath": "/tests/screen-tearing-test"
        },
        {
          "label": "VRR 테스트",
          "testId": "vrr-test",
          "testPath": "/tests/vrr-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "DirectX/Vulkan 게임 엔진 내부의 프레임 페이싱 미세 편차",
      "그래픽 드라이버 스왑체인 내부 레이턴시"
    ],
    "actions": [
      "G-Sync / FreeSync를 활성화",
      "프레임 제한기 설정 (예: 144Hz 패널은 141 FPS, 240Hz 패널은 237 FPS로 제한)",
      "드라이버 수직동기화를 켜서 주사율 상한 도달 시 티어링 방지",
      "DisplayPort 케이블 사용 (G-Sync Compatible 기능은 주로 DP에서만 정상 작동합니다)"
    ],
    "whenToStop": "정지 화면이나 BIOS 진입 화면에서도 가로줄이 계속 남아있다면 티어링이 아니라 디스플레이 패널 불량입니다."
  },
  {
    "id": "flickering",
    "title": "화면 깜빡임 (플리커) / 간헐적 꺼짐 현상",
    "category": "display",
    "categoryTitle": "디스플레이 문제",
    "symptom": "화면이 불규칙하게 깜빡거리거나 1~2초간 꺼졌다 켜지며 밝기가 요동칩니다.",
    "possibleCauses": [
      "품질이 낮거나 너무 긴 케이블로 인한 전송 신호 감쇠 및 노이즈 유입",
      "프레임 급변 시 발생하는 가변 주사율(VRR/G-Sync) 특유의 밝기 플리커링",
      "백라이트가 저주파 PWM(펄스폭 변조) 방식으로 디밍됨",
      "불안정한 멀티탭이나 전원 공급 장치로 인한 전기 노이즈",
      "GPU 드라이버의 전원 절약 스테이트 전환 오류"
    ],
    "checks": [
      "깜빡임이 게임 중(G-Sync 동작 시)에만 발생합니까? 아니면 바탕화면에서도 발생합니까?",
      "케이블이 양쪽 단자에 헐겁지 않게 단단히 꽂혀 있는지 확인",
      "모니터 밝기를 OSD에서 조절: 100% 밝기에서 깜빡임이 사라집니까? (PWM 특성)",
      "G-Sync / FreeSync 기능을 임시로 꺼보기"
    ],
    "whatScreenTesterCanTest": {
      "description": "고주파 플리커 패턴 및 균일도 테스트를 통해 스트로보 현상을 진단할 수 있습니다.",
      "links": [
        {
          "label": "플리커 테스트",
          "testId": "flicker",
          "testPath": "/tests/flicker"
        },
        {
          "label": "VRR 테스트",
          "testId": "vrr-test",
          "testPath": "/tests/vrr-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "kHz 단위의 정확한 PWM 주파수 수치 (광센서와 오실로스코프 필요)",
      "전원 어댑터의 미세 전압 리플"
    ],
    "actions": [
      "VESA 인증을 받은 신뢰할 수 있는 단축 케이블로 교체",
      "모니터 전원 코드를 멀티탭 대신 벽면 콘센트에 직접 연결",
      "GPU 제어판에서 창 모드 G-Sync 비활성화 또는 VRR 플리커 억제 옵션 사용",
      "그래픽 드라이버 클린 재설치 수행"
    ],
    "whenToStop": "영상 케이블을 전혀 연결하지 않은 상태에서 모니터 자체 OSD 메뉴가 깜빡이면 내부 전원부나 LED 고장입니다."
  },
  {
    "id": "dead-stuck-bright-pixel",
    "title": "불량 화소 (데드 픽셀, 스턱 픽셀, 광점 결함)",
    "category": "pixels",
    "categoryTitle": "픽셀 문제",
    "symptom": "화면의 미세한 점 하나가 항상 검은색(데드), 특정 색상(빨강/초록/파랑)으로 고정 점등(스턱), 또는 흰색으로 밝게 빛납니다.",
    "possibleCauses": [
      "패널 생산 공정 중 박막 트랜지스터(TFT) 형성 과정의 결함",
      "트랜지스터 단선(영구 소등된 흑점) 또는 전도 상태 고착(영구 점등된 광점)",
      "편광판과 유리 기판 사이에 먼지나 이물질이 유입됨",
      "청소 시 과도한 힘으로 누르거나 외부 충격으로 인한 압력 손상"
    ],
    "checks": [
      "극세사 천으로 화면을 부드럽게 닦아 표면 먼지가 아님을 확인",
      "전체 화면 단색(빨강, 초록, 파랑, 흰색, 검정)을 번갈아 띄워 해당 화소 상태 관찰",
      "돋보기나 스마트폰 접사 렌즈로 단일 서브픽셀인지 전체 픽셀인지 확인"
    ],
    "whatScreenTesterCanTest": {
      "description": "불량 화소 탐색 모드와 고속 색상 순환 플래시를 통해 고착된 액정 분자의 자극을 시도합니다.",
      "links": [
        {
          "label": "데드 픽셀 테스트",
          "testId": "dead-pixel-test",
          "testPath": "/tests/dead-pixel-test"
        },
        {
          "label": "스턱 픽셀 복구기",
          "testId": "stuck-pixel-fixer",
          "testPath": "/tests/stuck-pixel-fixer"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "육안 계수 없는 ISO 9241-307 국제 표준 보증 등급 판정",
      "실리콘 소자 수준에서의 미세 회로 파손"
    ],
    "actions": [
      "해당 영역에 스턱 픽셀 복구기를 20~30분간 실행",
      "제조사의 불량 화소 보증 기준(광점/흑점 허용 개수) 확인",
      "구매 후 14일 이내 초기 불량 반품/교환 기간 활용",
      "손가락으로 패널을 강하게 문지르지 마십시오 (주변 정상 화소까지 파손될 수 있습니다)"
    ],
    "whenToStop": "완전히 검게 죽은 흑점(Dead Pixel)은 물리적으로 회로가 끊어진 것이므로 소프트웨어로 복구할 수 없습니다."
  },
  {
    "id": "washed-out-colors",
    "title": "물 빠진 색감 / 색상 왜곡 및 대비 불량",
    "category": "imageQuality",
    "categoryTitle": "화질",
    "symptom": "색상이 바래 보이고 검은색이 뿌옇게 뜨며 화면 전체에 노란색, 초록색, 또는 파란색 톤이 돕니다.",
    "possibleCauses": [
      "RGB 출력 동적 범위 설정 불일치 (전체 0-255가 아닌 제한 16-235로 설정됨)",
      "SDR 환경에서 적절한 밝기 보정 없이 Windows HDR이 켜져 있음",
      "운영체제 또는 모니터의 야간 모드 / 블루라이트 차단 기능 활성화",
      "손상되었거나 잘못된 ICC 색상 프로필이 시스템에 로드됨",
      "컬러 포맷이 RGB 4:4:4가 아닌 YCbCr420으로 압축 전송됨"
    ],
    "checks": [
      "GPU 제어판에서 출력 동적 범위가 '전체(0-255)'로 설정되어 있는지 확인",
      "Windows 설정의 야간 모드를 끄기",
      "모니터 OSD 설정에서 색온도를 '표준' 또는 'sRGB'로 지정",
      "Windows HDR(Win + Alt + B)을 임시로 꺼서 색감 비교"
    ],
    "whatScreenTesterCanTest": {
      "description": "색역 충실도, 그레이스케일 계조 분리력, 대비 단계 표현력을 다각도로 검증합니다.",
      "links": [
        {
          "label": "색상 정확도 테스트",
          "testId": "color-test",
          "testPath": "/tests/color-test"
        },
        {
          "label": "대비 테스트",
          "testId": "contrast-test",
          "testPath": "/tests/contrast-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "측색기를 이용한 정량적 Delta-E 색차 수치",
      "모니터 내부 하드웨어 LUT 프로그래밍 수정"
    ],
    "actions": [
      "드라이버 제어판에서 출력 범위를 '전체'로, 색 심도를 8비트 또는 10비트로 지정",
      "Windows 디스플레이 색 보정(dccw)을 실행하거나 기본 프로필 복원",
      "작업 목적에 맞춰 OSD 색상 모드를 sRGB 또는 DCI-P3로 교정",
      "Windows HDR 설정 내 'SDR 콘텐츠 밝기' 슬라이더를 편안한 수준으로 조절"
    ],
    "whenToStop": "모니터 자체 OSD 메뉴에서도 누런 끼나 심각한 색 바램이 개선되지 않는다면 백라이트 LED 소자의 노화입니다."
  },
  {
    "id": "blurry-text",
    "title": "흐릿한 텍스트 / 서브픽셀 색 번짐 현상",
    "category": "imageQuality",
    "categoryTitle": "화질",
    "symptom": "글씨의 외곽선이 뭉개져 흐릿하게 보이거나 글자 테두리에 빨간색 또는 파란색 색 번짐(프린징)이 나타납니다.",
    "possibleCauses": [
      "정수 배율이 아닌 Windows DPI 배율 사용 (ClearType 미조정 상태의 125%, 175% 등)",
      "비표준 서브픽셀 배열 (BGR 구조, WRGB 구조, 또는 QD-OLED 삼각 배열)",
      "모니터의 네이티브 권장 해상도가 아닌 해상도 선택",
      "크로마 서브샘플링(YCbCr 4:2:2 또는 4:2:0)으로 인한 색상 압축",
      "모니터 OSD의 선명도(Sharpness) 수치가 지나치게 높거나 낮음"
    ],
    "checks": [
      "Windows의 'ClearType 텍스트 조정' 마법사 실행",
      "컬러 출력이 압축 없는 RGB 4:4:4로 설정되어 있는지 확인",
      "모니터 OSD의 선명도 수치를 기본값(보통 50%)으로 초기화",
      "사용 중인 모니터가 BGR 배열 패널인지 사양 정보 확인"
    ],
    "whatScreenTesterCanTest": {
      "description": "다양한 폰트 크기와 렌더링 방식별 패턴을 통해 글자 외곽선의 선명도를 세밀하게 판별합니다.",
      "links": [
        {
          "label": "텍스트 선명도 테스트",
          "testId": "text-clarity-test",
          "testPath": "/tests/text-clarity-test"
        },
        {
          "label": "선명도 테스트",
          "testId": "sharpness-test",
          "testPath": "/tests/sharpness-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "운영체제 내부 DirectWrite/GDI 폰트 래스터라이저 엔진",
      "전자현미경 수준에서의 물리적 서브픽셀 배열 구조"
    ],
    "actions": [
      "ClearType 텍스트 튜너를 진행하여 가장 또렷한 텍스트 샘플을 신중하게 선택",
      "네이티브 해상도와 비압축 RGB 출력을 반드시 유지",
      "BGR 패널의 경우 BetterClearTypeTuner나 레지스트리를 통해 ClearType을 BGR 모드로 변경",
      "DPI 배율을 100%, 150%, 200% 등 정수/규격 비율로 설정"
    ],
    "whenToStop": "QD-OLED 등 특수 서브픽셀 구조의 패널에서는 고대비 문자 테두리의 미세한 색 번짐이 기술 구조상 정상입니다."
  },
  {
    "id": "uneven-brightness",
    "title": "불균일한 밝기 / 비네팅 / 더티 스크린 현상 (DSE)",
    "category": "imageQuality",
    "categoryTitle": "화질",
    "symptom": "화면 네 모서리가 어둡거나(비네팅), 회색 화면에서 얼룩덜룩한 구름 무늬나 얼룩 자국(DSE)이 보입니다.",
    "possibleCauses": [
      "확산판 제조 공차 또는 엣지형 LED 배치의 구조적 한계",
      "패널 층간 접착 불균일로 인한 더티 스크린 현상(DSE)",
      "외부 베젤 프레임의 과도한 압박으로 인한 액정 분자 눌림",
      "오랜 사용으로 인한 백라이트 LED 소자의 불균등한 열화"
    ],
    "checks": [
      "단색 중성 회색(25%, 50%, 75%) 화면을 띄우고 균일도 관찰",
      "스마트폰 카메라로 노출을 낮춰 촬영하여 육안으로 애매한 얼룩의 분포 확인",
      "시야각을 바꾸었을 때 얼룩 위치가 달라지는지 확인 (시야각에 따른 자연스러운 감쇠와 구별)"
    ],
    "whatScreenTesterCanTest": {
      "description": "패널 전역의 휘도 균일성과 암부 근처(Near-Black)의 계조 표현력을 정확히 검증합니다.",
      "links": [
        {
          "label": "균일도 테스트",
          "testId": "uniformity-test",
          "testPath": "/tests/uniformity-test"
        },
        {
          "label": "니어 블랙 테스트",
          "testId": "near-black-test",
          "testPath": "/tests/near-black-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "9포인트 측정 그리드에 의한 정량적 cd/m² 휘도 균일도 수치",
      "도광판 내부의 열적 변형 상태"
    ],
    "actions": [
      "작업 환경에 맞춰 모니터 밝기를 120~150 cd/m² 수준으로 낮추어 얼룩 인지 완화",
      "모니터 OSD에 '균일도 보정(Uniformity Compensation)' 기능이 있다면 활성화",
      "실내 조명을 조절하여 과도한 대비차를 줄임",
      "새 제품에서 심각한 얼룩이 발견되면 초기 불량 교환 신청"
    ],
    "whenToStop": "일반 소비자용 모니터에서 네 모서리의 10~15% 밝기 저하는 패널 제조 공정상 정상 허용 범위로 간주됩니다."
  },
  {
    "id": "backlight-bleed-ips-glow",
    "title": "빛샘 현상 (Backlight Bleed) vs. IPS 글로우 (IPS Glow)",
    "category": "imageQuality",
    "categoryTitle": "화질",
    "symptom": "어두운 화면에서 테두리 틈새로 빛이 새어 나오거나 비스듬히 볼 때 은색/금색으로 뿌옇게 빛납니다.",
    "possibleCauses": [
      "빛샘(Bleed): 베젤 하우징의 조립 유격이나 압박으로 인해 백라이트 빛이 테두리 밖으로 누출됨",
      "IPS 글로우: 비스듬한 각도에서 IPS 패널의 액정 분자를 볼 때 발생하는 고유한 광학적 특성",
      "모니터 암 VESA 나사를 너무 세게 조여 프레임이 뒤틀림"
    ],
    "checks": [
      "화면에서 1.5m 떨어져 정중앙 정면에서 바라봄: 뿌연 빛이 사라집니까? (사라진다면 IPS 글로우입니다)",
      "각도를 바꾸어도 모서리나 특정 지점에 빛 뭉침이 그대로 유지됩니까? (유지된다면 빛샘입니다)",
      "모니터 암 거치대 나사가 과도하게 조여져 있다면 살짝 풀어줌"
    ],
    "whatScreenTesterCanTest": {
      "description": "빛샘과 IPS 글로우를 명확하게 구분할 수 있도록 최적화된 암시야 테스트 패턴을 제공합니다.",
      "links": [
        {
          "label": "백라이트 빛샘 테스트",
          "testId": "backlight-bleed-test",
          "testPath": "/tests/backlight-bleed-test"
        },
        {
          "label": "블랙 레벨 테스트",
          "testId": "black-level-test",
          "testPath": "/tests/black-level-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "암실 광학 측정 없는 제조사 무상 보증 판정",
      "하우징 내부 볼트의 조임 토크값"
    ],
    "actions": [
      "시청 거리를 충분히 확보하고 화면 중앙을 눈높이에 맞춤 (IPS 글로우 대폭 감소)",
      "모니터 뒤쪽에 은은한 간접 조명(바이어스 라이트)을 배치하여 눈부심 완화",
      "모니터 밝기를 100%에서 적정 수준(30~50%)으로 낮춤",
      "실내 일반 조명 환경에서도 확연히 보일 정도로 심한 빛샘은 제조사 교환 신청"
    ],
    "whenToStop": "IPS 글로우는 IPS 패널의 고유한 광학 특성이므로 수리로 없앨 수 없습니다. 완벽한 암부를 원하신다면 OLED 패널을 권장합니다."
  },
  {
    "id": "hdr-not-working",
    "title": "HDR 안 됨 / HDR 켜면 화면이 물 빠지거나 어두워짐",
    "category": "imageQuality",
    "categoryTitle": "화질",
    "symptom": "HDR을 활성화하면 색이 바래 보이고 바탕화면이 어두워지거나 밝은 영역이 하얗게 날아가 디테일이 사라집니다.",
    "possibleCauses": [
      "모니터가 로컬 디밍이나 넓은 색역이 없는 보급형 규격 (DisplayHDR 400 등)",
      "Windows HDR 보정(Calibration)을 실행하지 않음",
      "게임 내 톤 매핑 설정과 모니터 OSD 설정의 불일치",
      "케이블 대역폭 부족으로 고주사율 10비트 HDR 신호 전송 제한",
      "웹 브라우저의 하드웨어 가속이 꺼져 있어 HDR 디코딩 실패"
    ],
    "checks": [
      "Windows에서 HDR이 켜져 있는지 확인 (Win + Alt + B)",
      "Microsoft Store에서 'Windows HDR Calibration' 앱을 다운로드하여 실행",
      "모니터 OSD 메뉴에서 HDR 모드가 '자동' 또는 'DisplayHDR'로 설정되어 있는지 확인",
      "DisplayPort 1.4 또는 HDMI 2.1 케이블로 제대로 연결되어 있는지 확인"
    ],
    "whatScreenTesterCanTest": {
      "description": "HDR 피크 밝기, 광색역 지원 범위, 고휘도 하이라이트 클리핑 현상을 시각적으로 진단합니다.",
      "links": [
        {
          "label": "HDR 테스트",
          "testId": "hdr-test",
          "testPath": "/tests/hdr-test"
        },
        {
          "label": "HDR 기능 테스트",
          "testId": "hdr-capability-test",
          "testPath": "/tests/hdr-capability-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "휘도계를 통한 정량적 피크 밝기(nit 수치) 실측",
      "Mini-LED 백라이트 디밍 존의 개수 및 제어 반응 속도"
    ],
    "actions": [
      "Windows HDR 보정 앱을 실행하여 최소/최대 니트 수치를 프로필에 저장",
      "Windows 디스플레이 설정의 'SDR 콘텐츠 밝기' 슬라이더를 편안한 수준으로 조절",
      "그래픽 드라이버를 업데이트하고 출력 색 심도를 10 bpc로 지정",
      "로컬 디밍이 없는 모니터에서는 일상 작업 시 SDR을 유지하고 HDR 지원 게임 시에만 활성화"
    ],
    "whenToStop": "FALD(직하형 로컬 디밍)나 OLED가 적용되지 않은 일반 모니터에서는 구조적으로 HDR의 극적인 명암비를 낼 수 없습니다."
  },
  {
    "id": "tv-overscan-fit",
    "title": "화면이 TV 테두리에 맞지 않음 (오버스캔 / 모서리 잘림)",
    "category": "tv",
    "categoryTitle": "TV 문제",
    "symptom": "Windows 작업 표시줄이나 창 테두리가 TV 화면 밖으로 잘려 나가거나 화면 둘레에 검은 테두리가 생깁니다.",
    "possibleCauses": [
      "TV 자체의 오버스캔(과거 아날로그 브라운관 규격) 기능이 활성화됨",
      "TV의 화면 비율 설정이 '16:9' 등 확대 모드로 고정됨",
      "GPU 드라이버에서 부적절한 언더스캔 크기 축소 보정이 적용됨",
      "TV의 HDMI 입력 단자 이름(라벨)이 'PC'로 설정되지 않음"
    ],
    "checks": [
      "TV 리모컨에서 화면 크기/화면 비율 버튼 찾기",
      "연결된 HDMI 포트의 입력 라벨을 'PC'로 변경해보기",
      "GPU 제어판에서 '바탕화면 크기 및 위치 조절' 옵션이 임의로 적용되어 있는지 확인"
    ],
    "whatScreenTesterCanTest": {
      "description": "1:1 픽셀 매핑 정밀 격자와 백분율 경계선을 통해 정확한 화면 맞춤 상태를 검사합니다.",
      "links": [
        {
          "label": "TV 오버스캔 테스트",
          "testId": "tv-overscan-test",
          "testPath": "/tests/tv-overscan-test"
        },
        {
          "label": "스케일링 및 종횡비 테스트",
          "testId": "scaling-aspect-test",
          "testPath": "/tests/scaling-aspect-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "TV 내부 영상 화질 개선 프로세서의 자체 필터링 알고리즘",
      "HDMI-CEC 제어 프로토콜"
    ],
    "actions": [
      "TV 화면 비율을 '원본 크기', '화면 맞춤', '점대점(Just Scan)' 등으로 설정",
      "TV의 HDMI 입력 라벨을 'PC'로 변경 (오버스캔 및 인위적 선명화 처리가 자동 해제됩니다)",
      "GPU 제어판의 화면 크기 설정을 기본값으로 복원",
      "TV의 선명도(Sharpness) 값을 0 또는 중간 중립 값으로 낮춤"
    ],
    "whenToStop": "Screen Tester의 외곽 1픽셀 라인이 TV 베젤 경계선과 정확히 일치하면 설정이 완료된 것입니다."
  },
  {
    "id": "multi-touch-issues",
    "title": "터치스크린 인식 불량 및 멀티터치 오류",
    "category": "deviceInput",
    "categoryTitle": "장치 및 입력 문제",
    "symptom": "터치 위치가 어긋나거나, 여러 손가락 제스처를 인식하지 못하거나, 만지지 않았는데 마음대로 눌리는 고스트 터치가 발생합니다.",
    "possibleCauses": [
      "유리 표면에 기름기, 지문, 이물질 또는 수분이 묻어 있음",
      "두껍거나 조잡한 보호 필름으로 인한 정전용량 감쇠",
      "비인증 저가형 충전기에서 유입되는 전기적 노이즈",
      "터치스크린 드라이버 오류 또는 Windows 터치 보정 데이터 뒤틀림"
    ],
    "checks": [
      "충전기를 분리한 상태에서도 터치 오작동이 계속 발생합니까?",
      "극세사 천으로 화면 유리를 깨끗하게 닦아보기",
      "화면이 동시에 몇 개의 접점을 정상적으로 인식하는지 확인"
    ],
    "whatScreenTesterCanTest": {
      "description": "실시간 좌표 추적과 터치 접점 카운트를 통해 멀티터치 감도와 정확도를 검사합니다.",
      "links": [
        {
          "label": "멀티터치 테스트",
          "testId": "multi-touch-test",
          "testPath": "/tests/multi-touch-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "유리 디지타이저 내부의 미세 배선 단선",
      "터치 컨트롤러 IC의 하드웨어 샘플링 속도(Hz)"
    ],
    "actions": [
      "정품 충전기를 사용하여 접지 노이즈를 차단",
      "Windows 제어판의 '태블릿 PC 설정'에서 터치 보정 재설정",
      "보호 필름 부착 직후 문제가 생겼다면 필름을 제거해보기",
      "장치 관리자에서 휴먼 인터페이스 장치(HID) 터치 드라이버 업데이트"
    ],
    "whenToStop": "화면을 깨끗이 닦고 충전기를 뺀 상태에서도 고스트 터치가 지속된다면 디지타이저 패널의 물리적 고장입니다."
  },
  {
    "id": "accelerometer-issues",
    "title": "가속도계 및 모션 센서 오류",
    "category": "deviceInput",
    "categoryTitle": "장치 및 입력 문제",
    "symptom": "기기를 기울여도 화면이 자동 회전되지 않거나, 게임에서 기울기 조작이 먹히지 않거나, 수치가 한쪽으로 쏠립니다.",
    "possibleCauses": [
      "운영체제 빠른 설정에서 화면 회전 잠금이 켜져 있음",
      "브라우저에서 모션 센서 접근 권한이 차단됨",
      "낙하 충격 등으로 인한 MEMS 센서의 영점 틀어짐",
      "배터리 절약 모드로 인한 백그라운드 센서 폴링 중단"
    ],
    "checks": [
      "제어 센터에서 화면 회전 잠금이 활성화되어 있는지 확인",
      "브라우저 사이트 권한 설정에서 모션 센서가 허용되어 있는지 확인",
      "기기를 완전히 평평한 탁자 위에 올려놓았을 때의 측정값 확인"
    ],
    "whatScreenTesterCanTest": {
      "description": "DeviceMotion API를 통해 X축, Y축, Z축에 가해지는 가속도 데이터를 실시간으로 모니터링합니다.",
      "links": [
        {
          "label": "가속도 센서 테스트",
          "testId": "accelerometer-test",
          "testPath": "/tests/accelerometer-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "센서 반도체 내부의 MEMS 미세 기계 구조 파손",
      "프로세서 보안 영역에 저장된 공장 출하 캘리브레이션 오프셋"
    ],
    "actions": [
      "설정에서 화면 자동 회전을 켬",
      "브라우저 설정(특히 iOS Safari 등)에서 모션 및 방향 접근을 허용",
      "기기를 재부팅",
      "기기 설정의 수평계/센서 보정 도구 실행"
    ],
    "whenToStop": "모든 축의 측정값이 영구적으로 0이거나 최댓값에 고정되어 변하지 않는다면 센서 부품의 물리적 파손입니다."
  },
  {
    "id": "gyroscope-issues",
    "title": "자이로스코프 및 방향 센서 오류",
    "category": "deviceInput",
    "categoryTitle": "장치 및 입력 문제",
    "symptom": "VR/AR 앱이나 360도 동영상 시점이 미세하게 떨리거나, 제자리에서 헛돌거나, 회전 추종이 지연됩니다.",
    "possibleCauses": [
      "자석이 내장된 케이스나 차량용 거치대의 강한 자기장 간섭",
      "웹 브라우저에서 방향(DeviceOrientation) 센서 권한 거부",
      "MEMS 자이로의 8자 회전 보정이 필요함",
      "운영체제의 센서 백그라운드 서비스 오류"
    ],
    "checks": [
      "자석 케이스나 금속 부착물을 기기에서 분리",
      "기기를 손에 쥐고 공중에서 숫자 '8'을 그리듯 크게 휘둘러 센서 리셋",
      "브라우저 주소창에서 사이트 권한 확인"
    ],
    "whatScreenTesterCanTest": {
      "description": "Alpha(방위각), Beta(피치), Gamma(롤) 회전각을 3D 물리 시뮬레이션으로 실시간 시각화합니다.",
      "links": [
        {
          "label": "자이로스코프 테스트",
          "testId": "gyroscope-test",
          "testPath": "/tests/gyroscope-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "드라이버 수준에서의 자이로와 지자기 센서 융합 알고리즘",
      "고주파 샘플링 노이즈"
    ],
    "actions": [
      "공중 8자 돌리기로 자이로 및 나침반 센서 재보정",
      "자석이 달린 액세서리 제거",
      "기기 재부팅",
      "웹 브라우저 최신 버전으로 업데이트"
    ],
    "whenToStop": "기기를 어느 방향으로 회전시켜도 3축 수치가 전혀 반응하지 않는다면 자이로 칩의 하드웨어 고장입니다."
  },
  {
    "id": "vibration-issues",
    "title": "진동 API 및 햅틱 피드백 미작동",
    "category": "deviceInput",
    "categoryTitle": "장치 및 입력 문제",
    "symptom": "알림 수신 시 또는 웹 기반 햅틱 테스트 실행 시 기기가 진동하지 않습니다.",
    "possibleCauses": [
      "기기 사운드 설정에서 진동이 꺼져 있거나 '방해금지 모드' 활성화",
      "브라우저 보안 규격으로 인해 사용자 터치(클릭) 없는 진동 실행 차단",
      "iOS Safari가 W3C Vibration API 표준 명세를 지원하지 않음",
      "선형 햅틱 모터(Taptic Engine 등) 또는 편심 모터의 물리적 고장"
    ],
    "checks": [
      "기기 설정에서 벨소리/알림 진동이 작동하는지 확인",
      "테스트 시작 전 화면을 손가락으로 반드시 터치했는지 확인 (User-Activation 요건)",
      "사용 중인 기기가 iPhone/iPad인지 확인 (iOS는 웹 진동을 지원하지 않습니다)"
    ],
    "whatScreenTesterCanTest": {
      "description": "HTML5 Vibration API를 이용한 단타, 장타, 펄스 등 다양한 햅틱 진동 패턴을 테스트합니다.",
      "links": [
        {
          "label": "진동 테스트",
          "testId": "vibration-test",
          "testPath": "/tests/vibration-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "진동 모터의 기계적 공진 주파수 수치(Hz)",
      "햅틱 액추에이터에 공급되는 구동 전류"
    ],
    "actions": [
      "시스템 설정에서 진동 및 햅틱 피드백을 활성화",
      "Android의 Google Chrome 등 지원 브라우저에서 실행",
      "절전 모드(보통 진동을 차단함) 해제",
      "기기 재부팅"
    ],
    "whenToStop": "전화 수신이나 알람에서도 전혀 진동이 오지 않는다면 진동 모터 모듈의 하드웨어 고장입니다."
  },
  {
    "id": "webcam-issues",
    "title": "웹캠 인식 불량 및 카메라 접근 오류",
    "category": "deviceInput",
    "categoryTitle": "장치 및 입력 문제",
    "symptom": "카메라 미리보기가 까맣게 나오고 브라우저에서 '카메라를 찾을 수 없음' 또는 '접근 거부' 메시지가 뜹니다.",
    "possibleCauses": [
      "브라우저 또는 운영체제 개인정보 보호 설정에서 카메라 권한이 차단됨",
      "웹캠 렌즈의 물리적 사생활 보호 셔터가 닫혀 있음",
      "Zoom, Teams, OBS 등 다른 프로그램이 카메라를 독점 점유 중",
      "노트북 키보드의 카메라 끄기 기능키(Fn)가 눌려 있음",
      "USB 웹캠 드라이버 손상 또는 충돌"
    ],
    "checks": [
      "카메라 렌즈의 물리 슬라이드 덮개가 열려 있는지 확인",
      "키보드 기능키(예: Fn + F6 등)로 카메라가 꺼져 있지 않은지 확인",
      "실행 중인 다른 화상 회의 프로그램을 완전히 종료",
      "브라우저 주소창의 자물쇠 아이콘을 눌러 카메라 권한을 '허용'으로 변경"
    ],
    "whatScreenTesterCanTest": {
      "description": "실제 입력 해상도, 프레임레이트, 색상 표현력 및 지연 시간을 웹 브라우저에서 측정합니다.",
      "links": [
        {
          "label": "웹캠 테스트",
          "testId": "webcam-test",
          "testPath": "/tests/webcam-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "센서 픽셀 레벨에서의 신호 대 잡음비(SNR)",
      "카메라 모듈 내부 마이크로컨트롤러 펌웨어 오류"
    ],
    "actions": [
      "브라우저 권한 팝업에서 '허용' 선택",
      "Windows/macOS 개인정보 보호 설정에서 브라우저의 카메라 접근 허용",
      "장치 관리자에서 카메라 드라이버를 업데이트하거나 제거 후 재검색",
      "외장 웹캠을 PC 후면의 다른 직접 USB 포트에 연결"
    ],
    "whenToStop": "장치 관리자에서 오류 코드 10이나 43이 뜨고 다른 PC에서도 인식되지 않는다면 웹캠 하드웨어 고장입니다."
  },
  {
    "id": "speaker-issues",
    "title": "스피커 소리 안 남 및 오디오 출력 오류",
    "category": "deviceInput",
    "categoryTitle": "장치 및 입력 문제",
    "symptom": "소리가 전혀 들리지 않거나, 좌우 한쪽에서만 소리가 나거나, 찢어지는 잡음이나 틱틱거리는 소리가 납니다.",
    "possibleCauses": [
      "운영체제 사운드 설정에서 엉뚱한 출력 장치가 기본값으로 설정됨",
      "스피커 전원이 꺼져 있거나 브라우저 탭이 음소거됨",
      "3.5mm 오디오 잭이 끝까지 완전히 꽂히지 않음",
      "시스템 스테레오 밸런스가 한쪽으로 쏠려 있음",
      "오디오 드라이버의 샘플 레이트 불일치 충돌 (44.1kHz vs 48kHz)"
    ],
    "checks": [
      "PC 및 외장 스피커의 볼륨 다이얼 확인",
      "재생 장치가 사용 중인 스피커나 헤드폰으로 올바르게 지정되었는지 확인",
      "오디오 플러그를 끝까지 딸깍 소리가 날 때까지 밀어 넣기",
      "브라우저 탭에 음소거 아이콘이 켜져 있지 않은지 확인"
    ],
    "whatScreenTesterCanTest": {
      "description": "순수 사인파 스윕 사운드, 좌우 개별 채널 분리 테스트 및 주파수 대역 테스트를 지원합니다.",
      "links": [
        {
          "label": "스피커 테스트",
          "testId": "speaker-test",
          "testPath": "/tests/speaker-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "앰프 회로의 전고조파 왜곡률(THD)",
      "스피커 유닛 보이스코일의 물리적 편심 손상"
    ],
    "actions": [
      "사운드 설정에서 올바른 출력 장치를 '기본 장치'로 설정",
      "오디오 속성에서 좌우 밸런스를 정중앙(50:50)으로 복원",
      "오디오 드라이버(Realtek 등) 최신 버전 업데이트",
      "다른 케이블이나 다른 이어폰을 연결하여 재현 여부 확인"
    ],
    "whenToStop": "볼륨 크기와 상관없이 스피커 진동판에서 바스락거리는 기계적 마찰음이 난다면 코일이나 댐퍼 파손입니다."
  },
  {
    "id": "microphone-issues",
    "title": "마이크 입력 안 됨 및 소리 먹통 현상",
    "category": "deviceInput",
    "categoryTitle": "장치 및 입력 문제",
    "symptom": "마이크가 소리를 잡지 못하거나, 볼륨 레벨 미터가 전혀 움직이지 않거나, 목소리가 극도로 작고 노이즈만 들립니다.",
    "possibleCauses": [
      "브라우저 또는 운영체제 설정에서 마이크 접근 권한 차단",
      "헤드셋 케이블의 물리적 마이크 음소거(Mute) 스위치 켜짐",
      "엉뚱한 입력 장치가 기본 마이크로 설정됨",
      "사운드 속성에서 마이크 입력 볼륨 레벨이 0으로 되어 있음",
      "잭 단자 연결 오류 (마이크 단자 대신 헤드폰 출력 단자에 연결됨)"
    ],
    "checks": [
      "헤드셋 케이블이나 마이크 본체의 물리 음소거 스위치 확인",
      "브라우저 주소창 자물쇠 아이콘에서 마이크 권한을 '허용'으로 변경",
      "Windows 사운드 설정에서 말할 때 입력 게이지 바가 움직이는지 확인",
      "4극 통합 단자(CTIA)와 3극 마이크 단자(TRS) 변환 젠더를 적절히 사용했는지 확인"
    ],
    "whatScreenTesterCanTest": {
      "description": "Web Audio API를 활용하여 실시간 입력 볼륨, 주파수 스펙트로그램 및 파형을 모니터링합니다.",
      "links": [
        {
          "label": "마이크 테스트",
          "testId": "microphone-test",
          "testPath": "/tests/microphone-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "마이크 캡슐 자체의 고유 노이즈 레벨(dB A)",
      "XLR 팬텀 파워(48V) 공급 전압 상태"
    ],
    "actions": [
      "브라우저 및 Windows 개인정보 보호 설정에서 마이크 접근 허용",
      "소리 제어판에서 실제 사용하는 마이크를 '기본 장치'로 지정",
      "마이크 볼륨을 80~100%로 올리고 필요시 마이크 증폭을 10~20dB 설정",
      "메인보드 오디오 드라이버 업데이트"
    ],
    "whenToStop": "다른 PC나 포트에 연결해도 전혀 파형이 잡히지 않는다면 마이크 캡슐 불량이거나 케이블 내부 단선입니다."
  }
];
