import { TroubleshootingTopic } from "./types";

export const JA_TROUBLESHOOTING_TOPICS: TroubleshootingTopic[] = [
  {
    "id": "no-image",
    "title": "映像が出ない（黒画面／無表示）",
    "category": "display",
    "categoryTitle": "ディスプレイの問題",
    "symptom": "モニターの電源LEDは点灯している場合がありますが、画面は真っ暗で映像、アイコン、バックライトの点灯が一切ありません。",
    "possibleCauses": [
      "ディスプレイの電源コードまたは外部ACアダプターが外れている、または緩んでいる",
      "モニターの入力ソース設定が誤っている（例：DisplayPort 1ではなくHDMI 2）",
      "GPUとモニター間の映像ケーブルの緩み、ロック外れ、または断線",
      "ソース機器がディープスリープ、休止状態、またはGPUドライバがクラッシュしている",
      "起動時にOSからサポート外の解像度／リフレッシュレートが送信されている",
      "内部パネルのインバーター、電源基板、またはT-Conロジックボードのハードウェア故障"
    ],
    "checks": [
      "電源LEDを確認：消灯（通電なし）、オレンジ／琥珀（スタンバイ）、白／青点灯（アクティブ）？",
      "モニター本体のOSDメニューボタンを押す：内蔵メニューが表示されますか？（表示されればパネルとバックライトは正常で、原因はケーブルかPC側です）",
      "DisplayPortまたはHDMIケーブルの両端をGPUとモニターにしっかりと挿し直す",
      "映像ケーブルがマザーボード側ではなく、グラフィックボード（GPU）の端子に直結されているか確認",
      "別の検証済み映像ケーブルまたは異なる入力端子でテストする"
    ],
    "whatScreenTesterCanTest": {
      "description": "基本的な映像出力が復旧した後、Screen Testerで信号安定性のベンチマークと連続テストパターンの描画を行えます。",
      "links": [
        {
          "label": "ディスプレイ情報",
          "testId": "display-info",
          "testPath": "/tests/display-info"
        },
        {
          "label": "解像度チェッカー",
          "testId": "resolution-checker",
          "testPath": "/tests/resolution-checker"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "ACコンセントの電圧やACアダプターのDC出力電圧",
      "マザーボードPCIeスロットのレーン認識やGPUの電源供給障害",
      "内部インバーター回路やLEDバックライトストリップの断線"
    ],
    "actions": [
      "モニターの放電（コールドリセット）：電源コードを30秒間抜き、電源ボタンを10秒間長押ししてから再接続",
      "Windowsショートカット「Win + Ctrl + Shift + B」でグラフィックドライバを再起動",
      "セーフモードまたはUEFI BIOSを起動し、基本の1024x768 60Hz信号を強制出力",
      "モニターを別の機器（ゲーム機、ノートPC等）に接続し、PC側とモニター側のどちらに原因があるかを切り分け"
    ],
    "whenToStop": "焦げた臭いがする、高周波の異音が聞こえる、または全ケーブルを抜いた状態でも内蔵OSDが表示されない場合は修理をご依頼ください。"
  },
  {
    "id": "no-signal",
    "title": "信号なし／ケーブル未接続",
    "category": "display",
    "categoryTitle": "ディスプレイの問題",
    "symptom": "モニターの電源は入りますが「信号なし」「ケーブルを確認してください」と表示され、すぐに省電力スリープに入ります。",
    "possibleCauses": [
      "モニターのOSDで間違った入力端子が手動選択されている",
      "映像ケーブルの帯域幅不足、または端子のピン曲がり・破損（DisplayPortピン曲がり等）",
      "USB-C / Thunderboltドック、KVM切替器、変換アダプターでのハンドシェイク失敗",
      "OSがパネルの非対応ピクセルクロック、周波数、解像度を出力している",
      "グラフィックドライバが無効化されているか、画面初期化時にクラッシュしている"
    ],
    "checks": [
      "OSDメニューで入力を「自動検出」から実際に接続している端子へ手動で切り替える",
      "ケーブルを両端から外し、端子ピンの曲がりやホコリの付着を確認する",
      "ハブやアダプターを経由せず、GPUからモニターへ直接ケーブルを接続する",
      "グラフィックボード側の別のDisplayPort／HDMI出力端子を試す"
    ],
    "whatScreenTesterCanTest": {
      "description": "ブラウザが認識しているハードウェアパイプライン、リフレッシュレート、解像度メタデータを検証します。",
      "links": [
        {
          "label": "ディスプレイ情報",
          "testId": "display-info",
          "testPath": "/tests/display-info"
        },
        {
          "label": "リフレッシュレートテスト",
          "testId": "refresh-rate-test",
          "testPath": "/tests/refresh-rate-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "ハードウェア信号の物理的な波形品質やケーブル減衰率",
      "ファームウェアレベルでのHDCP暗号化ハンドシェイク拒絶",
      "GPU側コネクタ端子の内部的な物理破損"
    ],
    "actions": [
      "認証済みケーブル（HDMI 2.1 Ultra High SpeedまたはDP 1.4/2.1 VESA認証品）に交換",
      "DDU（Display Driver Uninstaller）を使用してセーフモードでGPUドライバを完全クリーン再インストール",
      "モニターのOSDメニューから工場出荷時設定にリセット",
      "モニターおよびGPUのファームウェアを最新に更新"
    ],
    "whenToStop": "複数の認証済みケーブルおよび別機器を試しても全ての入力端子で信号を受信できない場合はハード故障です。"
  },
  {
    "id": "wrong-resolution",
    "title": "解像度が正しくない／画面が引き伸ばされる・黒帯が出る",
    "category": "display",
    "categoryTitle": "ディスプレイの問題",
    "symptom": "デスクトップがぼやける、縦横に引き伸ばされる、または上下左右に黒帯（レターボックス／ピラーボックス）が表示されます。",
    "possibleCauses": [
      "OSのディスプレイ設定がネイティブ以外の解像度に設定されている",
      "GPUスケーリングが「全画面」ではなく「縦横比を保持」や「中央配置」になっている",
      "モニターのOSDでアスペクト比が不適切に強制設定されている（16:9パネルに4:3固定等）",
      "低品質なHDMIケーブルが帯域を制限し、4Kではなく1080pしか認識しない",
      "汎用ディスプレイドライバ（Microsoft基本ディスプレイアダプター）が適用されている"
    ],
    "checks": [
      "モニターの仕様書でパネルの正確なネイティブ解像度を確認する",
      "Windowsの設定＞システム＞ディスプレイで「（推奨）」と記載された解像度を選択しているか確認",
      "モニターのOSDメニューで画像スケーリングを「1:1」または「自動」に設定",
      "NVIDIAコントロールパネルまたはAMD Softwareでスケーリング設定を確認"
    ],
    "whatScreenTesterCanTest": {
      "description": "1ピクセル精度の幾何学グリッドと正円テストパターンにより、スケーリングの歪みや引き伸ばしを直感的に検出します。",
      "links": [
        {
          "label": "解像度チェッカー",
          "testId": "resolution-checker",
          "testPath": "/tests/resolution-checker"
        },
        {
          "label": "スケーリング＆アスペクト比テスト",
          "testId": "scaling-aspect-test",
          "testPath": "/tests/scaling-aspect-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "モニター内蔵スケーラーチップとGPUスケーリングの内部補間演算比較",
      "モニター内部EEPROMのEDID破損"
    ],
    "actions": [
      "OSのディスプレイ設定で正確なネイティブ解像度を選択",
      "NVIDIA、AMD、またはIntelの公式サイトから最新ドライバを適用",
      "GPUコントロールパネルで「GPUによるスケーリング」を有効化しアスペクト比を選択",
      "EDIDの認識障害がある場合はCRU等のツールでカスタム解像度を作成"
    ],
    "whenToStop": "モニター自身のOSDメニュー画面自体が幾何学的に歪んで表示される場合は、スケーラー基板のハードウェア故障です。"
  },
  {
    "id": "wrong-refresh-rate",
    "title": "リフレッシュレートが正しくない／60Hzに固定される",
    "category": "display",
    "categoryTitle": "ディスプレイの問題",
    "symptom": "144Hz、240Hz、360Hzの高リフレッシュレート対応モニターなのに動作がもたつき、OS上で60Hzしか選択できません。",
    "possibleCauses": [
      "高レート非対応の古いHDMI 1.4ケーブルで接続されている",
      "OSアップデートやドライバ更新によってWindowsの詳細設定が60Hzにリセットされた",
      "モニターOSDでDisplayPortのバージョンがDP 1.1/1.2に制限されている",
      "異なるリフレッシュレートのマルチモニター混在環境によるGPU同期の不整合",
      "ノートPCの映像出力が内蔵グラフィックス（iGPU）経由で制限されている"
    ],
    "checks": [
      "Windows設定＞システム＞ディスプレイ＞ディスプレイの詳細設定でリフレッシュレートを確認",
      "モニターのOSDメニューでDisplayPortのバージョン設定を確認（DP 1.4や2.1に変更）",
      "ケーブル種別を確認：PCの高リフレッシュレート用途にはHDMIよりDisplayPortが推奨されます",
      "モニターOSDおよびドライバ設定で可変リフレッシュレート（G-Sync/FreeSync）を有効化"
    ],
    "whatScreenTesterCanTest": {
      "description": "requestAnimationFrameによる高精度フレームタイミング計測で、実効レートとスタッター（カクつき）を検証します。",
      "links": [
        {
          "label": "リフレッシュレートテスト",
          "testId": "refresh-rate-test",
          "testPath": "/tests/refresh-rate-test"
        },
        {
          "label": "VRRテスト",
          "testId": "vrr-test",
          "testPath": "/tests/vrr-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "GPU物理出力端子のクロックジッター",
      "G-Syncハードウェアモジュールのファームウェア内部ステータス"
    ],
    "actions": [
      "WindowsおよびGPUコントロールパネルでリフレッシュレートを手動で最大値に設定",
      "認証済みのDisplayPort 1.4またはHDMI 2.1ケーブルに交換",
      "モニターのOSD設定を初期化し、オーバークロック設定があれば有効化",
      "グラフィックドライバを最新にアップデート"
    ],
    "whenToStop": "公称リフレッシュレートを選択した際に画面がブラックアウトを繰り返す場合は、帯域不足またはパネルの不良です。"
  },
  {
    "id": "screen-tearing",
    "title": "画面のテアリング／水平方向の画像ズレ",
    "category": "display",
    "categoryTitle": "ディスプレイの問題",
    "symptom": "ゲーム画面で素早く視点を動かした際に、画面が水平方向に引き裂かれたようにズレて表示されます。",
    "possibleCauses": [
      "ゲーム内またはドライバ設定で垂直同期（V-Sync）が無効になっている",
      "GPUの出力フレームレートがVRR（G-Sync/FreeSync）の有効動作範囲を超過または下回っている",
      "ドライバまたはモニター側でG-Sync / FreeSyncが適切に有効化されていない",
      "ゲームがボーダレスウィンドウモードで動作し、デスクトップコンポジションと干渉している",
      "GPUのフレームバッファ更新がパネルのスキャンサイクルと非同期になっている"
    ],
    "checks": [
      "モニターのOSDメニューでG-Sync/FreeSyncがオンになっているか確認",
      "NVIDIAコントロールパネルで「G-SYNCの設定」が有効になっているか確認",
      "フレームレートがモニターの最大リフレッシュレートを超えていないか確認",
      "ドライバ側でV-Syncを「オン」にし、フレームレートリミッターを最大値のマイナス3fpsに設定"
    ],
    "whatScreenTesterCanTest": {
      "description": "高速移動するハイコントラストバーを生成し、テアリングの発生ラインと同期状態を視覚的に浮き彫りにします。",
      "links": [
        {
          "label": "画面テアリングテスト",
          "testId": "screen-tearing-test",
          "testPath": "/tests/screen-tearing-test"
        },
        {
          "label": "VRRテスト",
          "testId": "vrr-test",
          "testPath": "/tests/vrr-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "DirectX/Vulkanネイティブレンダリングエンジン内部のフレームペーシングブレ",
      "ドライバスワップチェーン内部の遅延時間"
    ],
    "actions": [
      "G-Sync / FreeSyncを有効にする",
      "グローバルフレームレート上限を設定（例：144Hzなら141fps、240Hzなら237fps）",
      "グラフィックドライバ側のV-Syncを有効にして上限付近でのテアリングを抑制",
      "DisplayPortケーブルを使用する（G-Sync Compatibleは多くの場合DisplayPort必須です）"
    ],
    "whenToStop": "静止画やBIOS画面でも水平線やズレが常時出ている場合は、テアリングではなく液晶パネルの物理故障です。"
  },
  {
    "id": "flickering",
    "title": "画面のチラつき（フリッカー）／一時的なブラックアウト",
    "category": "display",
    "categoryTitle": "ディスプレイの問題",
    "symptom": "画面が不規則にチラつく、1〜2秒間暗転する、または明暗が高速で振動するように変動します。",
    "possibleCauses": [
      "低品質または長すぎるDisplayPort/HDMIケーブルによる信号減衰・ノイズ混入",
      "フレームレート急変時に生じるG-Sync/VRR特有の輝度フリッカー",
      "バックライトが低周波PWM（パルス幅変調）調光を使用している",
      "タコ足配線や不安定な電源タップによる電気ノイズ・電圧低下",
      "GPUドライバの省電力ステート切り替え時の不具合"
    ],
    "checks": [
      "チラつきはゲーム中（G-Sync動作時）のみですか？それともデスクトップ画面でも発生しますか？",
      "ケーブルが両端で緩んでいないか確実に差し直す",
      "モニターの輝度をOSDで変更：100%に設定するとチラつきが止まりますか？（PWMの兆候）",
      "G-Sync / FreeSyncを一時的にオフにして様子を見る"
    ],
    "whatScreenTesterCanTest": {
      "description": "ストロボ効果やモアレを誘発する専用パターンで、目に見えにくいフリッカーを浮き彫りにします。",
      "links": [
        {
          "label": "フリッカーテスト",
          "testId": "flicker",
          "testPath": "/tests/flicker"
        },
        {
          "label": "VRRテスト",
          "testId": "vrr-test",
          "testPath": "/tests/vrr-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "kHz単位での厳密なPWM調光周波数（オシロスコープと光電管が必要）",
      "AC電源の微小な電圧リップル"
    ],
    "actions": [
      "信頼性の高いVESA認証済み短尺ケーブルに交換",
      "モニターの電源プラグを壁面コンセントへ直接接続",
      "GPU設定でウィンドウモードのG-Syncを無効化、またはVRRフリッカー低減機能を有効化",
      "グラフィックドライバのクリーンインストールを実施"
    ],
    "whenToStop": "映像ケーブルを一切接続していない状態で、モニター内蔵OSD自体がチラつく場合は電源またはLEDの故障です。"
  },
  {
    "id": "dead-stuck-bright-pixel",
    "title": "ドット抜け（デッドピクセル／輝点／スタックピクセル）",
    "category": "pixels",
    "categoryTitle": "ピクセルの問題",
    "symptom": "画面上の極小の点が常に黒いまま（デッド）、特定の色（赤・緑・青）に固定点灯（スタック）、または白く発光（輝点）します。",
    "possibleCauses": [
      "液晶パネル製造時のTFTトランジスタ形成における微小欠陥",
      "トランジスタの断線（常時消灯の黒点）または短絡（常時点灯の輝点）",
      "偏光板とガラス基板の間に異物や埃が混入している",
      "清掃時の強い押し込みや物理的圧力による破損"
    ],
    "checks": [
      "画面表面をマイクロファイバー布で優しく拭き、ホコリや汚れではないことを確認",
      "全画面単色表示（赤、緑、青、白、黒）を切り替えて該当箇所の状態を観察",
      "ルーペやスマホの拡大鏡で単一サブピクセルかピクセル全体かを確認"
    ],
    "whatScreenTesterCanTest": {
      "description": "ドット抜け検出ツールおよび高速色循環フラッシュ機能により、固着した液晶分子の刺激を試みることができます。",
      "links": [
        {
          "label": "ドット抜けテスト",
          "testId": "dead-pixel-test",
          "testPath": "/tests/dead-pixel-test"
        },
        {
          "label": "スタックピクセル修復ツール",
          "testId": "stuck-pixel-fixer",
          "testPath": "/tests/stuck-pixel-fixer"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "手動計数なしでのISO 9241-307規格に基づく保証基準の合致判定",
      "シリコン基板レベルでの物理的な回路断線"
    ],
    "actions": [
      "スタックピクセル修復ツールを該当部位上で20〜30分間実行してみる",
      "メーカーのドット抜け保証規定（許容される輝点・黒点の個数）を確認",
      "初期不良の返品・交換期間内であれば販売店へ相談",
      "画面を指で強く揉んだり圧迫したりしない（周囲の正常なピクセルを破壊する恐れがあります）"
    ],
    "whenToStop": "完全に黒いドット抜け（黒点）は回路が物理的に切断されているため、ソフトウェアで修復することはできません。"
  },
  {
    "id": "washed-out-colors",
    "title": "色が白っぽい・褪せている／コントラスト異常・色かぶり",
    "category": "imageQuality",
    "categoryTitle": "画質",
    "symptom": "画面全体の色がくすんで白っぽく見える、黒が浮いてグレーになる、または全体に黄色・緑・青の偏りがあります。",
    "possibleCauses": [
      "RGB出力レンジの不整合（フルレンジ0-255ではなくリミテッドレンジ16-235になっている）",
      "SDRコンテンツ表示中にWindows HDRが適切な輝度設定なしで有効になっている",
      "OSまたはモニター側の夜間モード／ブルーライトカット機能が有効になっている",
      "破損または不適切なICCカラープロファイルがWindowsに読み込まれている",
      "カラーフォーマットがRGB 4:4:4ではなくYCbCr420になっている"
    ],
    "checks": [
      "GPUコントロールパネルで出力ダイナミックレンジが「フル（0-255）」になっているか確認",
      "Windows設定の「夜間モード」をオフにする",
      "モニターのOSDで色温度を「標準」または「sRGB」に設定",
      "Windows HDR（Win + Alt + B）を一時的にオフにして発色を比較"
    ],
    "whatScreenTesterCanTest": {
      "description": "色の再現性、グレースケールの諧調分離、コントラストステップの視認性を検証します。",
      "links": [
        {
          "label": "色精度テスト",
          "testId": "color-test",
          "testPath": "/tests/color-test"
        },
        {
          "label": "コントラストテスト",
          "testId": "contrast-test",
          "testPath": "/tests/contrast-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "キャリブレーターを用いた定量的なDelta-E色差値",
      "モニター内部ハードウェアLUTの書き換え"
    ],
    "actions": [
      "GPUドライバでダイナミックレンジを「フル」に、出力色深度を8bitまたは10bitに設定",
      "Windowsの色の管理（dccw）を実行するか標準プロファイルに戻す",
      "用途に合わせてモニターのOSDプロファイルをsRGBやDCI-P3に調整",
      "Windows HDR設定内の「SDRコンテンツの明るさ」スライダーを快適な位置に調整"
    ],
    "whenToStop": "OSDメニュー自体でも白化や強い色転びが直らない場合は、バックライトLEDや蛍光体の劣化です。"
  },
  {
    "id": "blurry-text",
    "title": "文字のにじみ・ぼやけ／サブピクセルの色にじみ",
    "category": "imageQuality",
    "categoryTitle": "画質",
    "symptom": "フォントがぼやけて読みづらい、輪郭が不鮮明、文字の端に赤や青の色のにじみ（フリンジ）が見えます。",
    "possibleCauses": [
      "Windowsのスケーリング倍率が中途半端（ClearType未調整の125%や175%等）",
      "変則的なサブピクセル配列（BGR配列、WRGB、またはQD-OLEDの三角形配列）",
      "パネルのネイティブ解像度以外の解像度が選ばれている",
      "クロマサブサンプリング（YCbCr 4:2:2または4:2:0）による色情報の圧縮",
      "モニターのシャープネス設定が過剰または不足している"
    ],
    "checks": [
      "Windowsの「ClearType テキストの調整」ウィザードを実行",
      "カラーフォーマットが圧縮なしのRGB 4:4:4になっているか確認",
      "モニターOSDのシャープネスを標準値（通常50%）にリセット",
      "お使いのモニターがBGR配列パネルを採用しているか製品情報を確認"
    ],
    "whatScreenTesterCanTest": {
      "description": "多様なフォントサイズとレンダリングモードによる文字鮮明度テストパターンを提供します。",
      "links": [
        {
          "label": "テキスト鮮明度テスト",
          "testId": "text-clarity-test",
          "testPath": "/tests/text-clarity-test"
        },
        {
          "label": "シャープネステスト",
          "testId": "sharpness-test",
          "testPath": "/tests/sharpness-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "OS深層のDirectWrite/GDIフォントラスタライザ処理",
      "電子顕微鏡レベルでの物理的サブピクセル配置"
    ],
    "actions": [
      "ClearType調整ツールで最も鮮明に見えるサンプルを丁寧に選択",
      "ネイティブ解像度と非圧縮RGB出力を確実に適用",
      "BGRパネルの場合はBetterClearTypeTunerやレジストリでClearTypeをBGR対応に変更",
      "スケーリング設定を100%、150%、200%などの標準倍率に設定"
    ],
    "whenToStop": "QD-OLED等特殊なピクセル配列を持つパネルでは、高コントラストな文字の微小な色フリンジは構造上避けられません。"
  },
  {
    "id": "uneven-brightness",
    "title": "輝度ムラ／周辺光量落ち／画面の汚れ効果（DSE）",
    "category": "imageQuality",
    "categoryTitle": "画質",
    "symptom": "画面の四隅が暗い、グレー背景で雲状の明暗斑がある、カメラをパンした際に汚れが付着したように見える（DSE）。",
    "possibleCauses": [
      "拡散板の成型公差やエッジライト型LED配置による構造的な偏り",
      "パネル各層の貼り合わせムラによるダーティスクリーンエフェクト（DSE）",
      "外枠ベゼルの物理的圧迫による液晶分子の歪み",
      "経年使用によるLEDの熱劣化や輝度低下の不均一"
    ],
    "checks": [
      "中間グレー（25%、50%、75%）の全画面パターンを表示して観察",
      "スマホカメラで露出を下げて撮影し、肉眼で見えにくいムラの分布を記録",
      "視線角度を変えても同じ位置にムラがあるか確認（視野角による変化との区別）"
    ],
    "whatScreenTesterCanTest": {
      "description": "画面全体の輝度均一性およびニアブラック階調の諧調表現を精密に検査できます。",
      "links": [
        {
          "label": "均一性テスト",
          "testId": "uniformity-test",
          "testPath": "/tests/uniformity-test"
        },
        {
          "label": "ニアブラックテスト",
          "testId": "near-black-test",
          "testPath": "/tests/near-black-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "9点測定グリッド等によるcd/m²単位での公的均一性測定",
      "導光板内部の熱的変形"
    ],
    "actions": [
      "作業環境に合わせてモニター輝度を適切な水準（120〜150 cd/m²程度）まで下げる",
      "モニターのOSDに「ムラ補正機能（Uniformity Compensation）」があれば有効化",
      "室内の照明を調整して過度なコントラスト差を抑える",
      "購入直後で許容できないほど著しいムラがある場合は初期不良交換を相談"
    ],
    "whenToStop": "一般的な民生用モニターにおいて四隅の10〜15%程度の輝度低下は構造上の許容範囲とされています。"
  },
  {
    "id": "backlight-bleed-ips-glow",
    "title": "バックライト漏れ vs IPSグロー（視野角の光漏れ）",
    "category": "imageQuality",
    "categoryTitle": "画質",
    "symptom": "暗い部屋で画面の端から光が漏れている、または斜めから見ると白や金色にボヤッと光って見えます。",
    "possibleCauses": [
      "バックライト漏れ：ベゼルの締め付け不良や隙間からLEDの光が物理的に漏出",
      "IPSグロー：斜め方向から液晶分子を見た際に生じるIPSパネル特有の光学的性質",
      "モニターアーム固定ネジの締めすぎによるフレームの歪み"
    ],
    "checks": [
      "画面から1.5メートル離れて真正面から見る：光は消えますか？（消えるならIPSグローです）",
      "角度を変えても四隅や縁に同じ光の漏れが残りますか？（残るならバックライト漏れです）",
      "VESAマウントのネジがきつすぎる場合は少し緩めてみる"
    ],
    "whatScreenTesterCanTest": {
      "description": "最適化された暗視野テストパターンで、漏れとグローの性質を的確に切り分けることができます。",
      "links": [
        {
          "label": "バックライト漏れテスト",
          "testId": "backlight-bleed-test",
          "testPath": "/tests/backlight-bleed-test"
        },
        {
          "label": "黒レベルテスト",
          "testId": "black-level-test",
          "testPath": "/tests/black-level-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "光学的暗室測定なしでのメーカー保証許容限度判定",
      "筐体内部のネジ締め付けトルク"
    ],
    "actions": [
      "画面から適切な視認距離を保ち、目線の高さに画面中央を合わせる（IPSグローが大幅軽減）",
      "モニター背面に間接照明（バイアスライト）を設置して黒浮きの知覚を緩和",
      "輝度設定を100%から適切な水準（30〜50%）に落とす",
      "通常照明環境下でもはっきり視認できる激しい光漏れがある場合は修理相談"
    ],
    "whenToStop": "IPSグローはIPS方式の物理的特性のため修理で解消することはできません。完全な漆黒を求める場合はOLEDをご検討ください。"
  },
  {
    "id": "hdr-not-working",
    "title": "HDRが効かない／HDRを有効にすると画面が白っぽく・暗くなる",
    "category": "imageQuality",
    "categoryTitle": "画質",
    "symptom": "HDRをオンにするとデスクトップが暗くなる、色が薄く褪せる、または明るい部分が白飛びして階調が消えます。",
    "possibleCauses": [
      "モニターがローカルディミングや広色域を持たないエントリー基準（DisplayHDR 400等）",
      "Windows HDRのキャリブレーションが行われていない",
      "ゲーム内またはモニターOSDでのトーンマッピング設定の不一致",
      "ケーブルの帯域不足で高リフレッシュレート時の10bit HDR伝送が制限されている",
      "ブラウザ側でハードウェアアクセラレーションが無効になっている"
    ],
    "checks": [
      "WindowsでHDRが正常にオンになっているか確認（Win + Alt + B）",
      "Microsoft Storeから「Windows HDR Calibration」アプリを入手して実行",
      "モニターOSDでHDRモードが「自動」または「DisplayHDR」になっているか確認",
      "DisplayPort 1.4またはHDMI 2.1ケーブルで正しく接続されているか確認"
    ],
    "whatScreenTesterCanTest": {
      "description": "HDRピーク輝度、広色域カバレッジ、高照度部の白飛びクリッピングを視覚的に検査します。",
      "links": [
        {
          "label": "HDRテスト",
          "testId": "hdr-test",
          "testPath": "/tests/hdr-test"
        },
        {
          "label": "HDR機能テスト",
          "testId": "hdr-capability-test",
          "testPath": "/tests/hdr-capability-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "照度計を用いた実測ピーク輝度（nit値）",
      "Mini-LEDバックライトのローカルディミングゾーン数と応答速度"
    ],
    "actions": [
      "Windows HDR Calibrationアプリで黒レベル・白レベル・最大輝度を正確に登録",
      "Windowsのディスプレイ設定にある「SDRコンテンツの明るさ」スライダーを調整",
      "グラフィックドライバを更新し、出力カラー深度を10bpcに設定",
      "ローカルディミング非搭載のモニターでは、デスクトップ作業時はSDRを使いHDR対応ゲーム時のみオンにする"
    ],
    "whenToStop": "FALD（直下型分割駆動）やOLEDを搭載していない通常の液晶モニターでは、構造上HDRの劇的な高コントラストは得られません。"
  },
  {
    "id": "tv-overscan-fit",
    "title": "テレビ画面に映像が収まらない（オーバースキャン／端が切れる）",
    "category": "tv",
    "categoryTitle": "テレビの問題",
    "symptom": "Windowsのタスクバーやウィンドウの端がテレビの外側にはみ出して切れる、または画面の周囲に黒帯が出ます。",
    "possibleCauses": [
      "テレビ側のオーバースキャン機能（旧来のアナログ放送用拡大機能）が有効になっている",
      "テレビの画面サイズ設定が「16:9」等の固定拡大モードになっている",
      "GPUドライバ側で不要なアンダースキャン縮小補正が適用されている",
      "テレビのHDMI端子の入力名称（ラベル）が「PC」に設定されていない"
    ],
    "checks": [
      "テレビのリモコンで「画面サイズ」「アスペクト比」ボタンを探す",
      "接続しているHDMI入力端子のラベル設定を確認し、「PC」に変更してみる",
      "GPUコントロールパネルで「デスクトップのサイズと位置の調整」が有効になっていないか確認"
    ],
    "whatScreenTesterCanTest": {
      "description": "1:1ピクセルマッピング確認用グリッドとパーセンテージ境界線で、正確な表示枠を検査できます。",
      "links": [
        {
          "label": "テレビオーバースキャンテスト",
          "testId": "tv-overscan-test",
          "testPath": "/tests/tv-overscan-test"
        },
        {
          "label": "スケーリング＆アスペクト比テスト",
          "testId": "scaling-aspect-test",
          "testPath": "/tests/scaling-aspect-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "テレビ内蔵の映像処理プロセッサによる輪郭強調アルゴリズム",
      "HDMI-CEC連動プロトコル"
    ],
    "actions": [
      "テレビ側の画面サイズを「ジャストスキャン」「フルピクセル」「ドット・バイ・ドット」等に設定",
      "テレビのHDMI入力名を「PC」に設定（オーバースキャンや輪郭強調が自動で完全無効化されます）",
      "GPUコントロールパネルのスケーリング設定をデフォルトに戻す",
      "テレビのシャープネス設定を中立（0または中央値）に下げる"
    ],
    "whenToStop": "Screen Testerの外周1ピクセル枠がテレビのベゼル内縁と完全に一致すれば設定完了です。"
  },
  {
    "id": "multi-touch-issues",
    "title": "タッチパネルの反応不良・マルチタッチ認識エラー",
    "category": "deviceInput",
    "categoryTitle": "デバイスと入力の問題",
    "symptom": "タッチ操作の位置がズレる、マルチタッチジェスチャーが反応しない、触れていない場所が勝手に押される（ゴーストタッチ）。",
    "possibleCauses": [
      "画面ガラス表面に皮脂、汚れ、水分、結露が付着している",
      "粗悪または厚すぎる保護フィルム・ガラスフィルムによる静電容量の減衰",
      "安価な非純正充電器からの漏れ電流によるノイズ干渉",
      "タッチスクリーンのドライバ不良またはWindowsのタッチ調整データの狂い"
    ],
    "checks": [
      "充電ケーブルを抜いた状態でも誤作動が発生しますか？",
      "乾いた清潔な布で画面をきれいに拭き取る",
      "同時に何点のタッチが正常に追従・認識されるか確認"
    ],
    "whatScreenTesterCanTest": {
      "description": "リアルタイムな座標追従と接触点数カウントにより、タッチパネルのマルチタッチ認識を検査します。",
      "links": [
        {
          "label": "マルチタッチテスト",
          "testId": "multi-touch-test",
          "testPath": "/tests/multi-touch-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "デジタイザーガラス内部の微細な断線",
      "タッチコントローラーICのハードウェアサンプリングレート"
    ],
    "actions": [
      "純正の充電器を使用して給電ノイズの影響を排除する",
      "Windowsコントロールパネルの「タブレットPC設定」からタッチ調整をリセット・再実行",
      "保護フィルムを貼った直後から発生している場合はフィルムを剥がしてみる",
      "デバイスマネージャーからヒューマンインターフェイスデバイス（HID）のタッチドライバを更新"
    ],
    "whenToStop": "画面を清掃し充電器を外してもゴーストタッチが続く場合は、デジタイザー基板の物理故障です。"
  },
  {
    "id": "accelerometer-issues",
    "title": "加速度センサー・モーションセンサーの不具合",
    "category": "deviceInput",
    "categoryTitle": "デバイスと入力の問題",
    "symptom": "端末を傾けても画面が自動回転しない、ゲームで傾き操作が効かない、数値が一定方向に勝手に流れる。",
    "possibleCauses": [
      "OSのコントロールセンターで画面の自動回転ロックが有効になっている",
      "ブラウザに対してモーションセンサーの利用許可が与えられていない",
      "落下や衝撃によるMEMSセンサーのゼロ点ズレ",
      "バッテリーセーバー機能によるバックグラウンドセンサー取得の制限"
    ],
    "checks": [
      "クイック設定やコントロールセンターで回転ロックがオンになっていないか確認",
      "ブラウザのサイト権限でモーションセンサーへのアクセスが許可されているか確認",
      "水平な平らな机の上に端末を静置したときの測定値を確認"
    ],
    "whatScreenTesterCanTest": {
      "description": "DeviceMotion APIを通じて、X軸・Y軸・Z軸にかかる加速度データをリアルタイムに可視化します。",
      "links": [
        {
          "label": "加速度センサーテスト",
          "testId": "accelerometer-test",
          "testPath": "/tests/accelerometer-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "センサーIC内部のMEMS微細構造の破損",
      "セキュリティ領域に保持されるファクトリーキャリブレーションオフセット"
    ],
    "actions": [
      "設定で「画面の自動回転」を有効にする",
      "ブラウザ設定（特にiOSのSafariなど）でモーションと画面の向きへのアクセスを許可",
      "端末を再起動する",
      "端末の設定にあるセンサー／水準器の調整ツールを実行"
    ],
    "whenToStop": "すべての軸の測定値が完全にゼロ固定または最大値に張り付いたまま動かない場合はセンサーのハード故障です。"
  },
  {
    "id": "gyroscope-issues",
    "title": "ジャイロスコープ・方位センサーの不具合",
    "category": "deviceInput",
    "categoryTitle": "デバイスと入力の問題",
    "symptom": "VR/ARアプリや360度動画の視点が小刻みに震える、意図せず回転し続ける、または追従が遅れる。",
    "possibleCauses": [
      "マグネット式スマホケースや車載ホルダーの強力な磁気干渉",
      "ブラウザで向き（DeviceOrientation）センサーへの許可が拒否されている",
      "MEMSジャイロのキャリブレーションが狂っている",
      "OSのセンサー管理サービスがフリーズしている"
    ],
    "checks": [
      "マグネット付きケースや金属製アクセサリーを外す",
      "端末を持って空中で大きな「8の字」を描くように動かして地磁気・ジャイロを補正",
      "ブラウザのアドレスバーからサイト権限を確認"
    ],
    "whatScreenTesterCanTest": {
      "description": "Alpha（方位角）、Beta（ピッチ）、Gamma（ロール）の回転角度を3D空間物理シミュレーションで可視化します。",
      "links": [
        {
          "label": "ジャイロスコープテスト",
          "testId": "gyroscope-test",
          "testPath": "/tests/gyroscope-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "ドライバレベルでのジャイロと地磁気のセンサーフュージョン内部アルゴリズム",
      "超高周波サンプリングノイズ"
    ],
    "actions": [
      "端末を8の字に数回回してジャイロ・コンパスをリフレッシュ",
      "磁石付きカバーを避ける",
      "端末を再起動する",
      "ブラウザアプリを最新バージョンに更新"
    ],
    "whenToStop": "端末をどの方向に回転させても3軸すべての数値が全く変化しない場合は、ジャイロセンサーの物理故障です。"
  },
  {
    "id": "vibration-issues",
    "title": "バイブレーションAPI・触覚フィードバック（ハプティクス）の動作不良",
    "category": "deviceInput",
    "categoryTitle": "デバイスと入力の問題",
    "symptom": "通知時やウェブ上の触覚テスト時に端末が振動しない。",
    "possibleCauses": [
      "端末のサウンド設定でバイブレーションが無効、または「おやすみモード」が有効",
      "ブラウザのセキュリティ仕様によりユーザー操作（タップ）なしの振動実行が遮断された",
      "iOS SafariがW3C Vibration APIの標準仕様を意図的にサポートしていない",
      "リニアハプティックモーター（Taptic Engine等）または振動モーターの故障"
    ],
    "checks": [
      "端末の設定で着信時や操作時のバイブレーションが動作するか確認",
      "テスト開始前に必ず画面を指でタップしたか確認（ユーザーアクティベーション要件）",
      "使用中の端末がiPhone/iPadでないか確認（iOSはWebバイブレーション非対応です）"
    ],
    "whatScreenTesterCanTest": {
      "description": "HTML5 Vibration APIを使用した短振動、長振動、パルスパターンの再生をテストします。",
      "links": [
        {
          "label": "バイブレーションテスト",
          "testId": "vibration-test",
          "testPath": "/tests/vibration-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "モーターの機械的共振周波数（Hz）",
      "アクチュエーターへの駆動電流値"
    ],
    "actions": [
      "OSの設定で触覚フィードバックとバイブレーションを有効にする",
      "AndroidのGoogle Chromeなど対応ブラウザで実行する",
      "省電力モード（バイブを遮断することが多い）を解除する",
      "端末を再起動する"
    ],
    "whenToStop": "着信やアラームでも端末が全く振動しない場合は、バイブレーションモーターの物理的な断線・破損です。"
  },
  {
    "id": "webcam-issues",
    "title": "ウェブカメラの認識不良・カメラアクセスエラー",
    "category": "deviceInput",
    "categoryTitle": "デバイスと入力の問題",
    "symptom": "カメラのプレビュー画面が真っ暗なまま、ブラウザで「カメラが見つかりません」または「アクセス拒否」と表示される。",
    "possibleCauses": [
      "ブラウザまたはOSのプライバシー設定でカメラの許可がブロックされている",
      "カメラのレンズカバー（プライバシーシャッター）が閉じたままになっている",
      "Zoom、Teams、OBSなどの他アプリがカメラを排他的に占有している",
      "ノートPCのキーボードにあるカメラ無効化ボタン（Fnキー）が押されている",
      "USBカメラのドライバが破損しているか競合している"
    ],
    "checks": [
      "カメラレンズの物理的なスライドカバーが開いているか目視で確認",
      "キーボードのファンクションキー（例：Fn + F6等）でカメラが切られていないか確認",
      "起動中の他のビデオ会議ソフトを完全に終了する",
      "ブラウザのアドレスバーの鍵アイコンをクリックし、カメラのアクセスを「許可」にする"
    ],
    "whatScreenTesterCanTest": {
      "description": "実際の入力解像度、フレームレート、色再現性、表示レイテンシーをブラウザ上で測定します。",
      "links": [
        {
          "label": "ウェブカメラテスト",
          "testId": "webcam-test",
          "testPath": "/tests/webcam-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "センサ画素レベルでのS/N比（ノイズ特性）",
      "カメラモジュール内部のマイクロコントローラファームウェアエラー"
    ],
    "actions": [
      "ブラウザの権限ポップアップで「許可」を選択",
      "Windows/macOSのプライバシー設定でブラウザに対するカメラアクセスをオンにする",
      "デバイスマネージャーでカメライバーを更新または削除して再検出",
      "外付けカメラを別のUSBポート（PC背面の直結ポート推奨）に挿し替える"
    ],
    "whenToStop": "デバイスマネージャー上でエラーコード10や43が表示され、他のPCでも認識されない場合はカメラ自体の故障です。"
  },
  {
    "id": "speaker-issues",
    "title": "スピーカーの音が出ない・オーディオ出力の異常",
    "category": "deviceInput",
    "categoryTitle": "デバイスと入力の問題",
    "symptom": "音が鳴らない、左右の片側からしか音が出ない、音が割れる・パチパチというノイズが入る。",
    "possibleCauses": [
      "OSのサウンド設定で意図しない出力デバイスが既定になっている",
      "スピーカーの電源がオフ、またはブラウザのタブがミュートされている",
      "3.5mmオーディオプラグが奥まで完全に差し込まれていない",
      "システムのステレオバランスが片側に極端に偏っている",
      "オーディオドライバのサンプリングレート不整合（44.1kHzと48kHzの競合等）"
    ],
    "checks": [
      "PC本体および外付けスピーカーのボリュームダイヤルを確認",
      "再生デバイスがお使いのスピーカーやヘッドホンになっているか確認",
      "オーディオプラグを奥までしっかりカチッと音がするまで押し込む",
      "ブラウザのタブにスピーカーの消音アイコンが付いていないか確認"
    ],
    "whatScreenTesterCanTest": {
      "description": "純粋な正弦波スイープ音、左右個別チャンネルテスト、特定周波数テストを安全に再生します。",
      "links": [
        {
          "label": "スピーカテスト",
          "testId": "speaker-test",
          "testPath": "/tests/speaker-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "アンプ回路の全高調波歪率（THD）",
      "スピーカーコーンのボイスコイルの物理的偏芯"
    ],
    "actions": [
      "OSのサウンド設定で正しいデバイスを「既定のデバイス」に指定",
      "サウンドの詳細プロパティで左右バランスを中央（50:50）にリセット",
      "オーディオドライバ（Realtek等）を最新版に更新",
      "別のケーブルまたは別のイヤホンを接続して再現性を確認"
    ],
    "whenToStop": "音量を問わずスピーカーの振動板から機械的な擦れ音や異音が鳴る場合は、コーンの破れやコイルの焼け焦げです。"
  },
  {
    "id": "microphone-issues",
    "title": "マイクが音を拾わない・音声入力の異常",
    "category": "deviceInput",
    "categoryTitle": "デバイスと入力の問題",
    "symptom": "マイクが反応しない、入力レベルメーターが動かない、または声が極端に小さく「サー」というホワイトノイズに埋もれる。",
    "possibleCauses": [
      "ブラウザまたはOSのセキュリティ設定でマイクのアクセスがブロックされている",
      "ヘッドセットのケーブル途中にあるハードウェアミュートスイッチがオンになっている",
      "意図しない入力デバイスが既定のマイクとして選択されている",
      "マイクの入力レベル（感度）が0になっている",
      "端子の挿し間違い（マイク端子ではなくヘッドホン端子に挿入されている）"
    ],
    "checks": [
      "ヘッドセットやマイク本体にある物理ミュートスイッチを確認",
      "ブラウザのアドレスバーにある鍵マークからマイクのアクセスを「許可」にする",
      "Windowsのサウンド設定で話しかけた際に入力インジケーターが動くか確認",
      "4極端子（CTIA）と3極端子（TRS）の変換プラグが正しく使われているか確認"
    ],
    "whatScreenTesterCanTest": {
      "description": "Web Audio APIにより、マイクのリアルタイム入力音量、周波数スペクトログラム、波形を可視化します。",
      "links": [
        {
          "label": "マイクテスト",
          "testId": "microphone-test",
          "testPath": "/tests/microphone-test"
        }
      ]
    },
    "whatScreenTesterCannotDetermine": [
      "マイクカプセルの固有自己雑音レベル（dB A）",
      "XLRファンタム電源（48V）の電圧供給状態"
    ],
    "actions": [
      "ブラウザおよびWindowsのプライバシー設定でマイクへのアクセスを許可",
      "サウンド設定で使用するマイクを「既定のデバイス」に設定",
      "マイクのプロパティで入力ボリュームを80〜100%に上げ、必要に応じてマイクブーストを設定",
      "マザーボードのオーディオドライバを更新"
    ],
    "whenToStop": "複数の端子や別PCに接続しても一切の入力波形が確認できない場合は、マイクカプセルの故障または断線です。"
  },
{
  "id": "burn-in-image-retention",
  "title": "OLED焼き付き（Burn-In）・残像・固定UIゴースト",
  "category": "pixels",
  "categoryTitle": "画素・ピクセルの問題",
  "symptom": "タスクバー、ゲームのHUD、ウィンドウの枠線などの薄い影が、画面を切り替えても消えずに残り続ける。",
  "possibleCauses": [
    "高輝度での固定UIや静止画の数百時間に及ぶ連続表示",
    "OLED/QD-OLED有機EL素子の不均一な発光劣化と熱摩耗",
    "液晶（LCD/IPS）パネルにおける一時的な電圧保持による残像"
  ],
  "checks": [
    "5%および50%のグレーや単色全画面を表示して焼き付きの輪郭を確認",
    "動きのある映像を15分間流して残像が薄くなるか検証（一時的残像か恒久的焼き付きか）",
    "OSDで使用時間（稼働時間）を確認"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Testerは全画面単色・グレーパターンで焼き付きの影を可視化し、「OLED焼き付き計算機」でリスクを診断します。",
    "links": [
      {
        "label": "焼き付きテスト",
        "testId": "burn-in-test",
        "testPath": "/tests/burn-in-test"
      },
      {
        "label": "OLED焼き付き計算機",
        "testId": "oled-burn-in-calculator",
        "testPath": "/tools/oled-burn-in-calculator"
      },
      {
        "label": "単色全画面テスト",
        "testId": "solid-color-test",
        "testPath": "/tests/solid-color-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "有機EL素子の物理的な劣化深度"
  ],
  "actions": [
    "モニターのOSDから手動で「ピクセルリフレッシュ（パネルメンテナンス）」を実行する",
    "OSのタスクバーを自動的に隠す設定にし、SDR表示時の輝度を下げる",
    "無操作5分で画面オフまたは動的スクリーンセーバーが起動するよう設定する"
  ],
  "whenToStop": "リフレッシュサイクルを複数回実行しても輪郭が消えない場合、恒久的な焼き付きのためパネル交換が必要です。"
},
{
  "id": "temporal-dithering-pixel-inversion",
  "title": "時間的ディザリング（FRC）と画素反転（Pixel Inversion）チラつき",
  "category": "pixels",
  "categoryTitle": "画素・ピクセルの問題",
  "symptom": "中間色やグレーの画面で微細なチラつき、ザラつき、または短時間の使用で激しい目の奥の痛みや頭痛が生じる。",
  "possibleCauses": [
    "FRC技術によるフレームごとの高速階調切り替え",
    "液晶素子のVCOM極性反転の電圧アンバランスによる微細パターンの振動",
    "GPUグラフィックドライバによる強制ディザリング出力"
  ],
  "checks": [
    "1画素の微細な市松模様やストライプでの明滅・這い出し現象を確認",
    "リフレッシュレートを60Hz、120Hz、144Hzと切り替えて変化を比較",
    "スマートフォンの高速度撮影（スローモーション）で画面の振動を確認"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Testerは画素反転チェックパターンとFRC検出用テストグリッドを用いて、微小画素の振動とチラつきを検証します。",
    "links": [
      {
        "label": "画素反転テスト",
        "testId": "pixel-inversion-test",
        "testPath": "/tests/pixel-inversion-test"
      },
      {
        "label": "時間的ディザリングテスト",
        "testId": "temporal-dithering-test",
        "testPath": "/tests/temporal-dithering-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "液晶VCOMトリム抵抗の物理電圧値"
  ],
  "actions": [
    "OSの設定でリフレッシュレートを変更してみる",
    "GPUコントロールパネルで出力色深度をモニターの物理仕様と一致させる",
    "光過敏や偏頭痛がある場合はネイティブ8bit/10bitディスプレイを選択する"
  ],
  "whenToStop": "めまいや吐き気を感じた場合は直ちに画面から目を離して休憩してください。"
},
{
  "id": "color-calibration-issues",
  "title": "色域クランプ・色温度とカラーキャリブレーションの不一致",
  "category": "imageQuality",
  "categoryTitle": "画質・色の問題",
  "symptom": "肌色が緑っぽく見える、赤色が蛍光色のように過飽和する、あるいはアプリごとに色味が激しく異なる。",
  "possibleCauses": [
    "広色域（DCI-P3/AdobeRGB）モニターでsRGBへの制限（クランプ）が行われていない",
    "OSのカラーマネジメントにおける破損したICCプロファイルの競合",
    "モニターの工場出荷時色温度やガンマ設定の狂い"
  ],
  "checks": [
    "標準カラーパッチを表示して原色が不自然に強調されていないか確認",
    "白い背景にピンクや緑の不快な色被りがないか確認",
    "OSのカラー設定で適用されているデフォルトプロファイルを確認"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Testerは色域判定テスト、標準カラーチェッカー風の精度確認、飽和度段階、D65白色点比較を提供します。",
    "links": [
      {
        "label": "色域テスト",
        "testId": "color-gamut-test",
        "testPath": "/tests/color-gamut-test"
      },
      {
        "label": "色精度テスト",
        "testId": "color-accuracy-test",
        "testPath": "/tests/color-accuracy-test"
      },
      {
        "label": "色温度テスト",
        "testId": "color-temperature-test",
        "testPath": "/tests/color-temperature-test"
      },
      {
        "label": "彩度・飽和度テスト",
        "testId": "saturation-test",
        "testPath": "/tests/saturation-test"
      },
      {
        "label": "色覚テスト",
        "testId": "color-blindness-test",
        "testPath": "/tests/color-blindness-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "測色器なしでのΔE値の計測"
  ],
  "actions": [
    "通常のWebブラウジングではモニターのOSDで「sRGBモード」を有効にする",
    "ハードウェア測色器（キャリブレーター）を用いて正確なICCプロファイルを作成する",
    "GPU設定の「デジタルバイブランス」などの強調機能をリセットする"
  ],
  "whenToStop": "プロフェッショナルな印刷・映像制作ではハードウェアキャリブレーションを行ってください。"
},
{
  "id": "gamma-black-crush-blown-whites",
  "title": "黒つぶれ（Black Crush）・白飛びとガンマカーブの歪み",
  "category": "imageQuality",
  "categoryTitle": "画質・色の問題",
  "symptom": "暗い影の階調が真っ黒に潰れて見えなくなる、または明るいハイライトが真っ白に塗りつぶされてディテールが消える。",
  "possibleCauses": [
    "モニターのガンマ曲線が標準の2.2から大きく乖離している",
    "HDMIダイナミックレンジの不一致（限定 16-235 と フル 0-255 のミスマッチ）",
    "モニターのコントラスト設定が高すぎて白側の階調がクリップされている"
  ],
  "checks": [
    "黒レベルテスト：背景（0）とステップ1〜5の四角が識別できるか確認",
    "白レベルテスト：純白（255）に対してステップ250〜254の境界が見えるか確認",
    "ガンマテストで2.2の基準線が周囲のパターンと均一に溶け合っているか確認"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Testerは256階調グレースケール、極暗部（Near-Black）評価パターン、光学ガンマ調整スライダを提供します。",
    "links": [
      {
        "label": "黒レベルテスト",
        "testId": "black-level-test",
        "testPath": "/tests/black-level-test"
      },
      {
        "label": "白レベルテスト",
        "testId": "white-level-test",
        "testPath": "/tests/white-level-test"
      },
      {
        "label": "グレースケールテスト",
        "testId": "grayscale-test",
        "testPath": "/tests/grayscale-test"
      },
      {
        "label": "ガンマテスト",
        "testId": "gamma-test",
        "testPath": "/tests/gamma-test"
      },
      {
        "label": "ダークモードテスト",
        "testId": "dark-mode-test",
        "testPath": "/tests/dark-mode-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "モニター内部LUTのビット深度処理"
  ],
  "actions": [
    "GPU設定でダイナミックレンジを「フル（0-255）」に設定する",
    "白レベルの各段階が見えるようになるまでモニターのコントラストを下げる（通常50〜70程度）",
    "モニターのOSDでガンマ設定を「2.2」に切り替える"
  ],
  "whenToStop": "黒レベルのステップ1〜3、白レベルの252〜254が目視で識別できれば調整完了です。"
},
{
  "id": "oled-abl-blooming-hdr-peak",
  "title": "OLED急減光（ABL）とMini-LEDのハロー現象（ブルーミング）",
  "category": "imageQuality",
  "categoryTitle": "画質・色の問題",
  "symptom": "白いウィンドウを広げると画面が暗くなる（ABL）、または暗い背景の文字やカーソルの周りに光の輪が漏れ出る（ブルーミング）。",
  "possibleCauses": [
    "OLEDの過熱防止と消費電力抑制のための自動輝度リミッター（ABL）作動",
    "Mini-LEDのローカルディミング（分割調光）ゾーンからの光漏れ",
    "OS側のHDRトーンマッピングの不整合"
  ],
  "checks": [
    "1%〜100%のウィンドウサイズを切り替えて減光の度合いを測定",
    "黒背景で動く白い点を目視し、調光ゾーンの光芒（ハロー）の大きさを確認",
    "10%ピークウィンドウと全画面白の明るさの差を比較"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Testerはウィンドウ面積ごとの輝度低下カーブをテストし、動的ターゲットでローカルディミングのブルーミングを視覚化します。",
    "links": [
      {
        "label": "OLED ABLテスト",
        "testId": "oled-abl-test",
        "testPath": "/tests/oled-abl-test"
      },
      {
        "label": "HDRピーク輝度テスト",
        "testId": "hdr-peak-brightness-test",
        "testPath": "/tests/hdr-peak-brightness-test"
      },
      {
        "label": "ブルーミングテスト",
        "testId": "blooming-test",
        "testPath": "/tests/blooming-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "センサーなしでの絶対nit値"
  ],
  "actions": [
    "OLEDモニターのOSDで「均一輝度モード」を有効にして明るさ変動をなくす",
    "Mini-LEDのローカルディミング強度を「中」にして光漏れとコントラストのバランスをとる",
    "Windows HDR Calibrationアプリでピーク輝度を設定する"
  ],
  "whenToStop": "Mini-LEDの構造上、わずかなブルーミングは正常な挙動です（完全な漆黒と無ハローはOLEDの特長です）。"
},
{
  "id": "response-time-motion-blur-crosstalk",
  "title": "応答速度の遅延・モーションブラー・ストロボクロストーク",
  "category": "display",
  "categoryTitle": "ディスプレイの問題",
  "symptom": "高速に動く物体の背後に黒い尾を引く残像（ゴースト）や、白い輪郭の光（オーバーシュート）、二重像が発生する。",
  "possibleCauses": [
    "暗部階調における液晶素子のGtG応答速度の遅延（特にVAパネル）",
    "モニターのオーバードライブ設定が強すぎて生じる逆ゴースト（過電圧オーバーシュート）",
    "黒挿入（バックライトストロボ）の発光タイミングとパネル走査のズレ"
  ],
  "checks": [
    "GtGテストで高コントラスト部の黒い尾引き（スメアリング）を確認",
    "UFOテストで残像が黒いか（通常ゴースト）、白く光っているか（オーバーシュート）を判別",
    "ストロボ有効時に画面の上部・中央・下部で二重像（クロストーク）を比較"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Testerは高精度な動的ターゲット、GtG階調テスト、追従カメラ（Pursuit Camera）同期バーを提供します。",
    "links": [
      {
        "label": "GtG応答速度テスト",
        "testId": "gtg-response-time-test",
        "testPath": "/tests/gtg-response-time-test"
      },
      {
        "label": "ストロボクロストークテスト",
        "testId": "strobe-crosstalk-test",
        "testPath": "/tests/strobe-crosstalk-test"
      },
      {
        "label": "追従カメラテスト",
        "testId": "pursuit-camera-test",
        "testPath": "/tests/pursuit-camera-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "オシロスコープによるマイクロ秒単位の電圧測定"
  ],
  "actions": [
    "モニターOSDでオーバードライブを「最強（Extreme）」から一段階下げて中間設定にする",
    "黒挿入機能（DyAcやELMBなど）のパルス位相を調整する",
    "ゲーム内のフレームレート（FPS）をリフレッシュレート（Hz）と完全に一致させる"
  ],
  "whenToStop": "白い輪郭のオーバーシュートが消え、中央部でブレのない単一の像が確認できれば完了です。"
},
{
  "id": "input-lag-gaming-responsiveness",
  "title": "入力遅延（Input Lag）・マウスの遅れとゲーム応答性の低下",
  "category": "display",
  "categoryTitle": "ディスプレイの問題",
  "symptom": "マウスを動かした際にカーソルがワンテンポ遅れてついてくるような、浮遊感やもたつきを感じる。",
  "possibleCauses": [
    "テレビやモニター内部の画像補正回路（超解像や倍速補間など）によるフレーム遅延",
    "垂直同期（V-Sync）によるグラフィック描画バッファのキュー滞留",
    "マウスのポーリングレートが標準の125Hzのまま、またはフレームレート不足"
  ],
  "checks": [
    "Screen Testerでマウスのポーリングレートを測定（500Hz〜1000Hz出ているか）",
    "反応時間テストと入力遅延テストを実施して応答性を数値化",
    "モニターまたはテレビの映像設定が「ゲームモード」になっているか確認"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen TesterはマウスのUSBポーリング周波数、クリック反射テスト、ブラウザWebGL GPUベンチマークを測定します。",
    "links": [
      {
        "label": "入力遅延テスト",
        "testId": "input-lag-test",
        "testPath": "/tests/input-lag-test"
      },
      {
        "label": "反応速度テスト",
        "testId": "reaction-time-test",
        "testPath": "/tests/reaction-time-test"
      },
      {
        "label": "マウスポーリングテスト",
        "testId": "mouse-polling-test",
        "testPath": "/tests/mouse-polling-test"
      },
      {
        "label": "GPUベンチマークテスト",
        "testId": "gpu-benchmark-test",
        "testPath": "/tests/gpu-benchmark-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "スイッチから光子までの専用センサーによる直接遅延計測"
  ],
  "actions": [
    "テレビやモニターの画質設定で「ゲームモード」を必ず有効にする",
    "ゲーム内のV-Syncをオフにし、Nvidia ReflexやAMD Anti-Lagを活用する",
    "ゲーミングマウスの設定ソフトでポーリングレートを1000Hz（1ms）に引き上げる"
  ],
  "whenToStop": "トータル遅延が15ms以下になれば、直感的で瞬時の操作感が得られます。"
},
{
  "id": "dual-monitor-color-mismatch",
  "title": "デュアルモニターの色味のズレ・色温度の不一致",
  "category": "display",
  "categoryTitle": "ディスプレイの問題",
  "symptom": "並べた2台のモニターで白の色合い（黄色っぽさ・青っぽさ）やコントラストが異なり、ウィンドウを跨ぐと違和感がある。",
  "possibleCauses": [
    "異なるパネル方式（IPSとVA、または液晶とOLED）の併用による視野角や発光スペクトルの差異",
    "モニターごとの工場出荷時ホワイトバランスの個体差",
    "GPU設定で片方がRGBフルレンジ、もう片方が限定レンジやYCbCrになっている"
  ],
  "checks": [
    "白いブラウザウィンドウを2台の画面の中央にまたがって配置し、境界での色の差を確認",
    "両方の画面で同時に「ディスプレイ比較」テストを実行",
    "GPU設定で両モニターの出力形式が「RGB フル 0-255」になっているか確認"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Testerは左右画面の同期比較ツール、グリッドパターン、デュアルモニターカラーマッチツールを提供します。",
    "links": [
      {
        "label": "ディスプレイ比較",
        "testId": "compare-displays",
        "testPath": "/tests/compare-displays"
      },
      {
        "label": "カスタムパターン",
        "testId": "custom-pattern",
        "testPath": "/tests/custom-pattern"
      },
      {
        "label": "デュアルモニター調整ツール",
        "testId": "dual-monitor-matcher",
        "testPath": "/tools/dual-monitor-matcher"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "異なるバックライト蛍光体によるメタメリズム（条件等色）の差"
  ],
  "actions": [
    "デュアルモニター調整ツール（Dual Monitor Matcher）を使い、片方のRGBゲインを手動微調整する",
    "両方のモニターのOSD色温度設定を「6500K」または「暖色」に統一する",
    "両画面の明るさ（輝度）を揃える"
  ],
  "whenToStop": "視線を移動させた際に白の色調に違和感がなくなれば調整完了です。"
},
{
  "id": "gamepad-controller-issues",
  "title": "ゲームパッドのスティックドリフト・ボタン遅延・デッドゾーン調整",
  "category": "deviceInput",
  "categoryTitle": "入力機器・デバイスの問題",
  "symptom": "コントローラーに触れていないのに視点やキャラクターが勝手に動く（ドリフト現象）、またはボタン反応が悪い。",
  "possibleCauses": [
    "アナログスティック内部の可変抵抗器（ポテンショメーター）の摩耗やカーボン削れかす",
    "ゲーム内デッドゾーン（無反応域）の設定が小さすぎる",
    "Bluetooth接続時の電波干渉による入力パケットの脱落"
  ],
  "checks": [
    "Screen Testerのゲームパッドテストを開き、いずれかのボタンを押して認識させる",
    "スティックから手を離した状態で座標が(0.00, 0.00)に戻るか確認",
    "トリガーボタンが0%から100%まで滑らかに反応するか確認"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen TesterはHTML5 Gamepad APIを使用して、スティックのドリフト半径、全ボタンの入力状態、振動モーターを診断します。",
    "links": [
      {
        "label": "ゲームパッドテスト",
        "testId": "gamepad-test",
        "testPath": "/tests/gamepad-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "内部接点の物理的な摩耗深さ"
  ],
  "actions": [
    "ゲーム内のスティック中心デッドゾーン設定を少し広げてドリフトを相殺する",
    "接点復活剤を塗布するか、ホールエフェクト（磁気センサー）式スティックを採用した機器に換装する",
    "Bluetoothではなく有線USBまたは2.4GHz専用ドングル接続を使用する"
  ],
  "whenToStop": "無操作時のズレが15%を超える場合はスティックモジュールの修理・交換が必要です。"
},
{
  "id": "audio-video-sync-latency",
  "title": "映像と音声の同期ズレ（リップシンク）とBluetooth音声遅延",
  "category": "deviceInput",
  "categoryTitle": "入力機器・デバイスの問題",
  "symptom": "映画や動画で口の動きと声が一致しない（音ズレ）、またはゲームで発砲音や打撃音が遅れて聞こえる。",
  "possibleCauses": [
    "一般的なBluetooth接続（SBC/AACコーデックによる150〜250msの遅延）",
    "テレビやサウンドバー（HDMI eARC）での音声処理ディレイ",
    "OS側の立体音響（Windows Sonic等）によるバッファ増加"
  ],
  "checks": [
    "オーディオシンクテストで、視覚的マーカーと音が重なる瞬間を確認",
    "音声レイテンシテストでバッファサイズと遅延値（ms）を確認",
    "Bluetoothと有線イヤホンで音ズレの差を比較"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Testerは閃光アニメーションと同期音声パルスを組み合わせ、Web Audioの遅延を計測します。",
    "links": [
      {
        "label": "音声同期テスト",
        "testId": "audio-sync-test",
        "testPath": "/tests/audio-sync-test"
      },
      {
        "label": "音声レイテンシテスト",
        "testId": "audio-latency-test",
        "testPath": "/tests/audio-latency-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "スピーカーから耳に届くまでの空気中伝播遅延"
  ],
  "actions": [
    "タイミングがシビアなゲームでは有線（3.5mm/USB）または2.4GHz無線を使用する",
    "テレビやAVアンプの「リップシンク / 音声遅延調整」でズレを相殺する",
    "Windowsサウンドプロパティで「オーディオの拡張機能」を無効にする"
  ],
  "whenToStop": "ズレが40ms以内であれば、人間の聴覚では完全な同期として認識されます。"
},
{
  "id": "sensor-ambient-battery-hardware",
  "title": "環境光センサー・バッテリー節電による描画制限・ネットワーク遅延",
  "category": "deviceInput",
  "categoryTitle": "入力機器・デバイスの問題",
  "symptom": "ノートPCの画面が急に暗くなる、バッテリー駆動時に120Hzから60Hzに低下する、または動画再生時にコマ落ちする。",
  "possibleCauses": [
    "環境光センサーによる画面の自動減光が意図せず作動している",
    "OSの「バッテリー節約機能」がGPUクロックを制限し、ディスプレイを60Hzに強制固定している",
    "Wi-Fiの電波干渉や高ジッターによるネットワークパケットの滞留"
  ],
  "checks": [
    "ノートPCのカメラ横のセンサーを手で覆い、Screen Testerで照度（lux）の変化を確認",
    "ACアダプターを抜いた際にリフレッシュレートが低下するか確認",
    "ネットワーク速度テストでPingのジッターと実効通信速度を測定"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Testerは環境光照度センサー、Battery Status APIによる充電・放電状態、ネットワーク通信安定性を測定します。",
    "links": [
      {
        "label": "環境光センサーテスト",
        "testId": "ambient-light-test",
        "testPath": "/tests/ambient-light-test"
      },
      {
        "label": "バッテリーテスト",
        "testId": "battery-test",
        "testPath": "/tests/battery-test"
      },
      {
        "label": "通信速度テスト",
        "testId": "network-speed-test",
        "testPath": "/tests/network-speed-test"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "バッテリーセルの物理的劣化度"
  ],
  "actions": [
    "Windowsのディスプレイ設定で「照明が変化した場合に明るさを自動的に変更する」をオフにする",
    "電源モードを「最適なパフォーマンス」に設定してバッテリー時でも高リフレッシュレートを維持する",
    "混雑した2.4GHz Wi-Fiから5GHz/6GHz帯または有線LANに切り替える"
  ],
  "whenToStop": "照度による意図しない減光がなく、バッテリー時も高リフレッシュレートが維持できれば設定完了です。"
},
{
  "id": "monitor-setup-bandwidth-calibration",
  "title": "映像ケーブル帯域のボトルネック・DPIスケーリングとOSD設定",
  "category": "display",
  "categoryTitle": "ディスプレイの問題",
  "symptom": "4K解像度で最高リフレッシュレートが選べない、文字が極端に小さい、または画面が時々ブラックアウトする。",
  "possibleCauses": [
    "HDMIやDisplayPortケーブルのデータ転送帯域不足（例：4K 144Hzに古いHDMI 2.0ケーブルを使用）",
    "OSのスケーリング設定が不適切で文字がかすむ、または小さすぎて目が疲れる",
    "モニター本体のOSD設定が最適化されていない"
  ],
  "checks": [
    "「帯域幅計算機」で必要な伝送データ量（Gbps）を算出",
    "「DPI計算機」と「視聴距離計算機」で画面の精細度と適切な距離を確認",
    "「初期設定ウィザード」でモニターの各種機能をチェック"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Testerは映像ケーブル帯域計算ツール、PPI密度算出、最適視聴距離計算、ディスプレイ検査証明書発行機能を提供します。",
    "links": [
      {
        "label": "新品モニター初期設定ウィザード",
        "testId": "new-monitor-wizard",
        "testPath": "/tools/new-monitor-wizard"
      },
      {
        "label": "DPI計算機",
        "testId": "dpi-calculator",
        "testPath": "/tools/dpi-calculator"
      },
      {
        "label": "映像帯域計算機",
        "testId": "display-bandwidth-calculator",
        "testPath": "/tools/display-bandwidth-calculator"
      },
      {
        "label": "最適視聴距離計算機",
        "testId": "viewing-distance-calculator",
        "testPath": "/tools/viewing-distance-calculator"
      },
      {
        "label": "画面録画ツール",
        "testId": "screen-recorder",
        "testPath": "/tools/screen-recorder"
      },
      {
        "label": "ディスプレイ検査証明書",
        "testId": "display-certificate",
        "testPath": "/tools/display-certificate"
      },
      {
        "label": "OSDキャリブレーションガイド",
        "testId": "osd-calibration-guide",
        "testPath": "/tools/osd-calibration-guide"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "ケーブル内部のシールド品質"
  ],
  "actions": [
    "認証取得済みのDisplayPort 1.4/2.1またはUltra High Speed HDMI 2.1ケーブルに交換する",
    "計算されたPPI値に基づきOSの拡大縮小率（125%、150%等）を最適化する",
    "OSDガイドに従いコントラストや色温度を適正値に合わせる"
  ],
  "whenToStop": "最高解像度・最高周波数で暗転や乱れなく安定表示できれば完了です。"
},
{
  "id": "eink-ghosting-slow-refresh",
  "title": "電子ペーパー（E-Ink）の文字残像（ゴースト）と低速リフレッシュ",
  "category": "imageQuality",
  "categoryTitle": "画質・色の問題",
  "symptom": "電子書籍リーダーで、前のページの文字やメニューアイコンの薄い影が白背景に残ったまま消えない。",
  "possibleCauses": [
    "電気泳動マイクロカプセル内の残留電荷による粒子の不完全移動",
    "スクロールや描画速度を優先する高速モード（A2モード）の使用",
    "室温が低く、カプセル内の粘性流体が固くなっている"
  ],
  "checks": [
    "読書画面の余白が澄んだ白か、薄い灰色の文字影が残っているか確認",
    "Screen Testerの「E-Inkリフレッシュツール」を実行",
    "端末の使用温度が18℃〜25℃の適正範囲にあるか確認"
  ],
  "whatScreenTesterCanTest": {
    "description": "Screen Testerは全画面白黒反転パルスを連続照射し、滞留した粒子をリセットして残像を一掃します。",
    "links": [
      {
        "label": "E-Inkリフレッシュツール",
        "testId": "eink-refresh-tool",
        "testPath": "/tools/eink-refresh-tool"
      }
    ]
  },
  "whatScreenTesterCannotDetermine": [
    "電子ペーパー制御IC内部の波形テーブル"
  ],
  "actions": [
    "E-Inkリフレッシュツールで白黒反転パルスを数回実行する",
    "電子書籍端末の設定で5〜10ページごとの定期全画面リフレッシュを有効化する",
    "読書時は高速モードではなく高画質モード（Regalモード等）を使用する"
  ],
  "whenToStop": "E-Inkの残像は完全に回復可能であり、反転パルスによって元の純白に戻れば完了です。"
}
];
