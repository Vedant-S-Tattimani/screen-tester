import { KnowledgeArticle } from "./types";

export const JA_KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    "slug": "resolution-and-scaling",
    "category": "display-basics",
    "title": "モニターの解像度、アスペクト比、およびOSスケーリング",
    "subtitle": "物理ピクセル、論理ビューポート、DPIスケーリング、および等倍（1:1）表示の仕組み。",
    "description": "解像度、アスペクト比、OSの拡大率設定が画面の鮮明さやテキストの読みやすさに与える影響を解説します。",
    "directAnswer": "ディスプレイ解像度は画面を構成する物理ピクセルの格子であり、OSスケーリングは高精細画面（高PPI）でUIや文字の視認性を保つ拡大機能です。",
    "whyItMatters": "非ネイティブ解像度や不適切な小数倍率スケーリングを使用すると、文字の滲みやモアレが発生し、本来の鮮明さが失われます。",
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
    "primarySearchIntent": "モニター 解像度 スケーリング アスペクト比 鮮明さ 拡大率",
    "readingTimeMinutes": 5
  },
  {
    "slug": "refresh-rate-and-frame-rates",
    "category": "display-basics",
    "title": "マルチモニター環境：リフレッシュレート混在・DPIスケーリング・カクつき対策",
    "subtitle": "リフレッシュレートの不一致、コンポジターのフレームペーシング、OSスケーリング、およびマルチ画面の滑らかさの改善。",
    "description": "異なるリフレッシュレート（60Hz、144Hz、165Hz）やDPIスケーリングが混在するマルチモニター環境でカクつき（スタッター）が発生する原因と改善策を解説します。",
    "directAnswer": "マルチモニター環境で生じるカクつきやスケーリングの乱れは、OSのデスクトップコンポジター、グラフィックドライバー、またはアプリケーションが、異なるリフレッシュレートや小数倍のDPIスケーリングを複数の画面間で同期処理しきれない場合に発生します。",
    "whyItMatters": "高速ゲーミングモニターと通常のサブモニター、あるいはノートPCと外付け4Kディスプレイの併用は一般的です。しかし、リフレッシュレートやピクセル密度、色域が異なると、マウスカーソルの引っかかり、動画のコマ落ち、文字のぼやけなどが生じることがあります。正確に対処するには、問題がモニター本体、GPUドライバー、OSコンポジター、アプリ描画のどこにあるかを切り分ける必要があります。",
    "whatToLookFor": [
      "高リフレッシュレートのメイン画面からサブ画面へカーソルを動かした際の引っかかりや違和感",
      "片方の画面で動画を再生しながら、もう一方の画面でスクロールや操作を行う際に生じるカクつき",
      "異なるスケーリングのモニター間をウィンドウが移動する際に生じる急激な拡大縮小や文字のぼやけ",
      "サブモニターを接続している際にウィンドウ表示のゲームやブラウザ描画で生じる微小なカクつき（マイクロスタッター）",
      "マルチモニター環境の各画面間におけるブラウザスクロールのスムーズさのばらつき",
      "スリープ復帰時や起動時にモニターのリフレッシュレートや解像度が低い設定に勝手に戻ってしまう現象"
    ],
    "howToTest": [
      "Screen Testerの[リフレッシュレート測定](/tests/refresh-rate-test)を開き、各モニター上で個別にフレームペーシングの安定性を確認します。",
      "[リフレッシュレート測定](/tests/refresh-rate-test)のブラウザウィンドウを画面の境界をまたぐようにドラッグし、フレーム供給がスムーズに適応するか観察します。",
      "[VRR（可変リフレッシュレート）テスト](/tests/vrr-test)を実行し、マルチディスプレイ環境でテアリングや周期の乱れがないか確認します。",
      "[文字の視認性テスト](/tests/text-clarity-test)を使用して、異なるスケーリングにおけるフォントの鮮明さと描画の境界を点検します。",
      "[動画・モーションブラーテスト](/tests/motion-blur-test)および[残像（ゴースト）テスト](/tests/ghosting-test)で、両モニターの残像感を比較します。",
      "[ディスプレイ情報](/tests/display-info)を開き、ブラウザが認識している解像度、デバイスピクセル比（DPR）などのパラメータを確認します。",
      "[ブラウザ互換性ツール](/tools/browser-compatibility)で、ハードウェアアクセラレーションや各種画面APIの対応状況を確認します。",
      "モニターが低いリフレッシュレートで固定されてしまう場合は、インタラクティブな[トラブルシューティングガイド](/knowledge-base/troubleshooting)を参照してください。"
    ],
    "whatScreenTesterCanObserve": [
      "アクティブな画面における `requestAnimationFrame` を通じたブラウザ階層のアニメーション時刻記録",
      "ブラウザ描画間隔の統計的標準偏差（微小なカクつきやコマ落ちの視覚的検出）",
      "ブラウザが取得したDevice Pixel Ratio (`window.devicePixelRatio`) およびCSS論理画面解像度",
      "AC電源接続時とバッテリー駆動時における動作の滑らかさ、振り子周期、スクロール挙動の比較",
      "マルチスクリーン配置およびディスプレイ列挙に関するブラウザAPIのサポート状況"
    ],
    "whatScreenTesterCannotDetermine": [
      "DisplayPort/HDMIケーブル上の物理的なパネル走査線タイミングやクロック同期信号",
      "ハードウェア電源レールの実効電圧、ACPIバッテリー給電状態、サーマルスロットリング制限",
      "GPUの動作クロック状態（P-states/D-states）、内部MUXスイッチの切り替え位置、PCIe ASPM電力モード",
      "OSのデスクトップウィンドウマネージャー（DWM、Wayland、Quartz）内部の描画バッファ更新スケジュール",
      "OSの拡大縮小設定から独立したディスプレイの物理的DPIおよびパネル画素密度"
    ],
    "commonCauses": [
      "OSのデスクトップコンポジターが異なるリフレッシュレートの描画タイミングを整流しきれていない",
      "サブ画面でのハードウェア動画再生がGPU描画スレッドを動画のフレームレート（60Hz等）に固定してしまう",
      "小数倍のDPIスケーリング差（例：1440pの100%と4Kの150%）により、旧型アプリがビットマップ拡大されてぼやける",
      "ウィンドウモードの可変リフレッシュレート（G-Sync/FreeSync）がサブ画面のバックグラウンド更新と干渉する",
      "モニターのタイミング仕様の違いにより、GPUのメモリクロックが最高状態に固定されたり乱高下する",
      "ノートPCのハイブリッドグラフィックスで、外部画面の信号が内蔵GPUのバッファを経由して転送遅延を生む"
    ],
    "whatToDoNext": [
      "OSのディスプレイ詳細設定を開き、各モニターが本来の最高リフレッシュレートに設定されているか確認する。",
      "カクつきが続く場合、サブモニターをメインモニターの整数比（約数）に設定できるか試す（例：144Hzと60Hzの場合、120Hzを試す）。",
      "可能であればスケーリング倍率を揃えるか、古いアプリの互換性設定で高DPI動作モードを調整する。",
      "GPU管理画面でG-SyncまたはFreeSyncを「ウィンドウと全画面」から「全画面のみ」に変更して試す。",
      "サブモニターを一時的に外し、カクつきがモニター単体の問題かマルチ画面特有のものかを切り分ける。"
    ],
    "sections": [
      {
        "title": "リフレッシュレート混在環境で動作が不安定になりやすい理由",
        "content": [
          "144Hz、165Hz、240Hzなどの高速ゲーミングモニターに、60Hzや75Hzの一般的なサブモニターを組み合わせる運用は一般的です。しかし、2台目を接続した直後から、単体使用時には見られなかった微小な引っかかりを感じることがあります。",
          "代表的な症状には、ブラウザのスクロール時のカクつき、ウィンドウアニメーションのコマ落ち、マウスカーソルのぎこちなさ、動画再生時の不規則な引っかかりなどがあります。リフレッシュレートの違い自体がモニターを故障させるわけではありません。最近のGPUとOSは、本来複数の独立した画面タイミングを同時に処理する能力を備えています。",
          "滑らかさが保たれるかどうかは、OSのウィンドウコンポジター、グラフィックドライバー、ブラウザのハードウェアアクセラレーション、動画再生エンジン、GPUの省電力機能などの複雑な連携に左右されます。モニターの故障を疑う前に、これらソフトウェア層の相互作用を切り分けて点検することが大切です。"
        ],
        "bullets": [
          "リフレッシュレートの違いが即座に故障を意味するわけではありませんが、OSコンポジターの負荷は増大します。",
          "マウスカーソルの引っかかり、スクロールのガタつき、ウィンドウのコマ落ちなどが生じることがあります。",
          "全体の滑らかさはOS、ドライバー、ハードウェアアクセラレーション、画面タイミングの調和に依存します。",
          "ブラウザテストはアプリレベルのフレーム供給を測定するもので、物理パネルの走査を直接測るものではありません。"
        ]
      },
      {
        "title": "リフレッシュレート混在の実態：フレーム供給と非同期処理",
        "content": [
          "マルチモニター環境では、各ディスプレイがグラフィックカードから独立した垂直同期信号（V-Sync）を受け取ります。例えば60Hzと144Hzを併用する場合、60Hz画面は約16.67msごとに、144Hz画面は約6.94msごとに更新されるため、画面更新のタイミングは揃いません。",
          "60Hzのサブ画面で動画やアニメーションを再生しつつ、144Hzのメイン画面で作業やゲームを行うと、OSのウィンドウマネージャーは非同期の描画待機列を同時に管理する必要があります。一世代前のシステムでは、デスクトップ全体を最も低いリフレッシュレートに同期させてしまい、高速画面まで60 FPSに制限されることがありました。",
          "最新のコンポジターは画面ごとに独立した描画ループを実行しますが、それでも競合は起こり得ます。60Hz側で動画再生がハードウェアデコードされると、GPU描画スレッドがそのリズムに引っ張られることがあります。各モニターを単体でテストすることで、ソフトウェア的な制約かどうかを判別できます。"
        ],
        "bullets": [
          "60Hzと144Hzのような非対称な組み合わせは、更新タイミングが常にずれた状態で動作します。",
          "OSのデスクトップマネージャーは各モニター用のバッファを別々に処理する必要があります。",
          "サブ画面での動画再生がGPU描画スレッドを拘束し、メイン画面の動作に影響を与えることがあります。",
          "ブラウザのrequestAnimationFrame測定はソフトウェア側のタイミングを観察するものです。"
        ]
      },
      {
        "title": "複数画面におけるDPIスケーリング：小数倍率と文字の鮮明さ",
        "content": [
          "マルチモニター環境では、解像度やサイズが大きく異なる画面を並べることが多くあります。例えば、27インチ4Kモニター（スケーリング150%）の横に24インチフルHDモニター（100%）を置く構成や、小型ノートPCを大型外部モニターに繋ぐ構成です。",
          "スケーリング倍率が異なる場合（100%、125%、150%、200%など）、OSはターゲットの画素密度に合わせて画面UIを別々に描画します。モニターごとのDPI変更に対応した現代のアプリは、ウィンドウが画面境界をまたいだ瞬間に文字やベクター図形を再計算し、鮮明さを維持します。",
          "しかし、古いデスクトップアプリは画面ごとの動的リサイズに対応していません。倍率の違うモニターに移動させると、OSが画像を拡大するように引き伸ばすため、文字やアイコンがぼやけてしまいます。[文字の視認性テスト](/tests/text-clarity-test)を行うことで、文字のぼやけがスケーリング拡大によるものか、サブピクセル配置によるものかを判断できます。"
        ],
        "bullets": [
          "倍率が異なる画面の混在は、OSに画面ごとの解像度・密度計算を要求します。",
          "対応アプリは画面を移動してもフォントやUIを再描画してくっきりと表示します。",
          "古いアプリはOSによってビットマップとして拡大され、文字がぼやけやすくなります。",
          "画面間をウィンドウがまたぐ瞬間に、一時的なレイアウトの乱れが生じることがあります。"
        ]
      },
      {
        "title": "解像度・表示領域・スケーリングの関係：デジタル座標と物理画面",
        "content": [
          "マルチモニターの挙動を正しく理解するには、物理パネルの仕様とソフトウェアの描画概念を明確に分ける必要があります。OSのスケーリング、アプリのズーム、ブラウザの拡大、CSSピクセル、画面の物理素子は混同されがちです。",
          "物理解像度はパネルガラスに製造された微小なサブピクセルの格子数（例：3840×2160組のRGB素子）です。デバイスピクセル比（DPR）はOSがブラウザに伝える拡大倍率で、150%設定なら1.5、200%なら2.0となります。論理ビューポート（CSSピクセル）はWebページがレイアウトを組むための仮想的な座標空間（`window.innerWidth`など）です。",
          "Screen Testerは正確な情報提供を原則としています。WebブラウザはAPIを通じて論理サイズや報告された`window.devicePixelRatio`を正確に取得できます。しかし、ブラウザはモニター内部の光学的な素子ピッチや内蔵スケーラーを直接検査することはできません。"
        ],
        "bullets": [
          "物理解像度：ディスプレイパネル上に固定された微小な物理ピクセルの格子。",
          "Device Pixel Ratio（DPR）：OSからブラウザエンジンに伝達されるスケーリング倍率。",
          "CSS論理ピクセル：Webページのレイアウトやフォント配置に使用される座標空間。",
          "測定の限界：Web APIが報告するのはソフトウェア座標であり、光学的な測定値ではありません。"
        ]
      },
      {
        "title": "段階的なマルチモニター診断手順：体系的なチェックの流れ",
        "content": [
          "カクつきやカーソルの引っかかり、文字のぼやけを点検する際は、闇雲に設定を変えず、体系的な手順で確認することが重要です。",
          "ステップA：基本構成の記録。各モニターの解像度、設定リフレッシュレート、スケーリング倍率、接続端子（DisplayPort/HDMI）、HDRのオン/オフを記録します。",
          "ステップB：各モニターを単体で点検。サブモニターのケーブルを抜き、メイン画面単体で[リフレッシュレート測定](/tests/refresh-rate-test)を行い、単体での滑らかさを確認します。",
          "ステップC：マルチ画面のアイドル状態を点検。サブモニターを再接続し、重いアプリを開かない状態で再度[リフレッシュレート測定](/tests/refresh-rate-test)を実行します。",
          "ステップD：ウィンドウを画面間で移動。テストウィンドウを画面の境目をまたぐように動かし、フレームレートが落ちたり文字がぼやけたりしないか見ます。",
          "ステップE：スクロールとアニメーションの点検。両方の画面で[リフレッシュレート測定](/tests/refresh-rate-test)と[動画・モーションブラーテスト](/tests/motion-blur-test)を実行し、スクロールのスムーズさを比較します。",
          "ステップF：動画再生負荷の追加。サブモニターで動画を再生しながらメイン画面で動作テストを行い、描画の干渉が起きないか確認します。",
          "ステップG：設定変更は必ず1つずつ。ハードウェアアクセラレーションの切り替えやリフレッシュレートの変更を行う際は、1項目ずつ変更して効果を検証します。"
        ],
        "bullets": [
          "ステップA：各画面の解像度、周波数、拡大率、接続ケーブルを控える。",
          "ステップB：画面を1台ずつ接続して、単体での性能が正常か確かめる。",
          "ステップC：2台接続したアイドル状態で、フレームペーシングの安定性を測る。",
          "ステップD・E：画面をまたぐウィンドウ移動やスクロールの滑らかさを点検する。",
          "ステップF・G：動画再生負荷を試し、設定の調整は1項目ずつ慎重に行う。"
        ]
      },
      {
        "title": "原因となっている階層の特定：レイヤー別診断モデル",
        "content": [
          "カクつきの原因はシステムの複数の階層にまたがるため、レイヤーごとに問題を切り分けることが有効です。",
          "1. ディスプレイ・パネル層：モニター本体のファームウェア、DDCピンを通じたEDID情報の読み取り不良、OSDの過度なオーバードライブ設定など。[残像（ゴースト）テスト](/tests/ghosting-test)で点検します。",
          "2. 接続・信号層：ケーブルの帯域不足、規格外の変換アダプター、MSTハブの帯域飽和など。[ディスプレイ情報](/tests/display-info)で確認します。",
          "3. GPU・ドライバー層：GPUの描画キュー、マルチ画面時のメモリクロック制御、省電力モードの不具合。ドライバーの更新や再インストールを試します。",
          "4. OSコンポジター層：デスクトップマネージャー（Windows DWMなど）による非同期V-Syncの調和不良。単体表示と複数表示で比較します。",
          "5. アプリ・ブラウザ層：ブラウザのマルチプロセス設計、GPUラスタライズ設定、バックグラウンドタブの制限。[ブラウザ互換性ツール](/tools/browser-compatibility)で確認します。",
          "6. 動画再生層：ハードウェア動画デコーダーがGPUの表示リズムを動画の固定フレームレート（24/30/60 FPS等）に引っ張ってしまう現象。"
        ],
        "bullets": [
          "モニター層：ファームウェア、EDID通信、またはOSDの設定。",
          "信号層：ケーブル帯域幅、端子の規格、ハブのボトルネック。",
          "GPU層：描画キュー、メモリクロック、グラフィックドライバーの設定。",
          "コンポジター層：異なるリフレッシュレートを統合するウィンドウマネージャー。",
          "アプリ層：ブラウザの描画パイプラインやハードウェアアクセラレーション。",
          "動画層：ハードウェアデコーダーによるフレームレート固定の影響。"
        ]
      },
      {
        "title": "HDRとSDRの混在環境：輝度・色空間・コンポジターの変換処理",
        "content": [
          "HDR対応モニターと従来のSDRモニターを並べて使うと、デスクトップコンポジターの処理負荷がさらに上がります。片方がHDR、もう片方がSDRの場合、OSは2つの異なる色空間と輝度カーブを同時にリアルタイム処理する必要があります。",
          "Windowsの場合、コンポジターは通常のsRGB描画をHDR画面向けに拡張コンテナへ変換しつつ、SDR画面には標準の8ビットsRGBを出力します。OSの「SDRコンテンツの明るさ」スライダーの調整が合っていないと、白いウィンドウが片方の画面で眩しすぎたり、暗すぎたりします。",
          "また、動画再生ウィンドウを画面間でまたぐと、OSはトーンマッピングを即座に再計算するため、一時的な引っかかりや色味の急変が起きることがあります。[ディスプレイ情報](/tests/display-info)でHDR検出状態を確認できますが、OSの色管理精度まではWebツールで測定できません。"
        ],
        "bullets": [
          "HDRとSDRの混在は、異なる色空間と輝度マッピングの同時計算を要求します。",
          "SDRコンテンツの明るさ設定を調整し、隣り合う画面の白の明るさを揃えることが大切です。",
          "画面間でメディアを移動させると、トーンマッピングのリアルタイム切り替えが起きます。",
          "ブラウザのメディアクエリは対応状況を報告しますが、色の絶対精度は保証できません。"
        ]
      },
      {
        "title": "マルチモニター環境における可変リフレッシュレート（VRR）：ウィンドウ同期の課題",
        "content": [
          "NVIDIA G-Sync、AMD FreeSync、VESA Adaptive-Syncに代表される可変リフレッシュレート（VRR）は、モニターのリフレッシュレートをゲームの描画フレームレートに合わせる技術です。単一画面の全画面ゲームでは極めて滑らかですが、マルチモニター環境では特有の挙動を示すことがあります。",
          "GPU管理画面でVRRを「ウィンドウモードと全画面モード」に設定していると、ドライバーは前面のウィンドウに画面周波数を合わせようとします。このとき、サブ画面でブラウザや動画、チャットツールなどのアニメーションが動くと、どちらの更新に合わせるべきかドライバーが迷い、画面のちらつきやカクつきが発生することがあります。",
          "Screen Testerの[VRRテスト](/tests/vrr-test)や[リフレッシュレート測定](/tests/refresh-rate-test)で動作の滑らかさを点検できます。ウィンドウ表示のゲームで引っかかりが生じる場合は、GPU管理画面でVRRを「全画面モードのみ」に制限すると解決することが多くあります。"
        ],
        "bullets": [
          "VRRはモニターの更新速度をGPUのフレーム出力にリアルタイムで一致させます。",
          "ウィンドウモードのVRRは、サブモニターのアニメーションによって誤作動することがあります。",
          "同期の迷いによって、デスクトップのちらつきやカクつきが誘発される場合があります。",
          "Screen Testerで目視確認が可能ですが、ドライバーの内部レジスタまでは読み取れません。"
        ]
      },
      {
        "title": "ノートPCと外部モニター：ドック・省電力モード・ハイブリッドグラフィックス",
        "content": [
          "ノートPCに外部モニターを接続する場合、デスクトップPCとは異なる構造上の注意点があります。近年のノートPCの多くは、内蔵GPU（iGPU）と専用GPU（dGPU）が協調して動作するハイブリッドグラフィックスを採用しています。",
          "マザーボードの配線構造により、ノート内蔵画面は省電力の内蔵GPUで駆動され、外部出力端子は専用GPUに直結されているか、あるいは内蔵GPUの画面バッファを経由して出力されます。内蔵GPUを経由する構造の場合、完成した描画データをシステムバス経由でコピーする必要があり、これが微小な遅延やカクつきの原因になることがあります。",
          "さらに、バッテリー駆動時は厳しい省電力制御が働きます。必ずしも画面周波数が落ちるとは限りませんが、多くのノートPCが自動的に60Hzに制限されたり、PCIeの速度を抑えたりします。電源アダプターを接続した状態でテストすることで、純粋な省電力動作と設定の問題を切り分けることができます。"
        ],
        "bullets": [
          "ハイブリッドグラフィックスは内蔵画面と外部端子を異なるGPUで制御することがあります。",
          "内蔵GPUを経由して出力される信号は、システムバスの転送遅延の影響を受ける場合があります。",
          "USB-CやThunderboltドックは映像、データ、ネットワークで帯域を共有します。",
          "バッテリー駆動時は省電力制御が入るため、点検は電源アダプターを接続して行います。"
        ]
      },
      {
        "title": "バッテリー駆動とAC電源での挙動差：電力レール、動作周波数、動的スケーリング",
        "content": [
          "ノートPCをACコンセントから外して内蔵バッテリー（DC電力）で駆動させると、熱設計および消費電力の許容範囲が根本的に変化します。バッテリー持続時間を最大限に延ばすため、OS、CPU、GPUのファームウェアは描画や動作の滑らかさに影響を与える動的な電力抑制機構を起動します。",
          "バッテリー駆動時、OSの電源モード（Windowsの「トップクラスの電力効率」「バランス」「最適なパフォーマンス」、macOSの「低電力モード」、Linuxの省電力設定）はバックグラウンド動作を制限します。GPUはコアクロックとメモリクロック（P-states）を引き下げ、PCIeバスは省電力モード（ASPM L0s/L1）に移行してGPUとディスプレイコントローラー間の転送帯域を狭めます。",
          "同時に、最新のディスプレイは動的なリフレッシュレート変更を行います。Windows 11のダイナミックリフレッシュレート（DRR）やメーカーのファームウェアにより、高駆動パネル（120Hz、144Hz、240Hz）はアイドル時やバッテリー駆動時に自動的に60Hzへ引き下げられたり、パネルセルフリフレッシュ（PSR）が作動します。さらにCABC、Intel DPST、AMD Vari-Brightなどの機能が画面の表示内容に応じて輝度とガンマ曲線を動的に変化させます。",
          "ただし、すべてのノートPCがバッテリー駆動時に画質やリフレッシュレートを一律に低下させるわけではありません。MUXスイッチを搭載したゲーミングノートPCは、バッテリー消耗と引き換えに高リフレッシュレートを維持できる場合もあります。見られる挙動が正常な省電力動作なのか不具合なのかを切り分けるには、段階的な検証が必要です。"
        ],
        "bullets": [
          "バッテリー駆動は消費電力を抑えるためCPU、GPU、PCIe ASPMの省電力状態を起動します。",
          "動的リフレッシュレート（DRR）やパネルセルフリフレッシュ（PSR）が画面を60Hzに落とす場合があります。",
          "適応型輝度機能（CABC、Intel DPST、AMD Vari-Bright）が表示内容に応じてコントラストを動的に調整します。",
          "省電力動作は全機種一律ではなく、メーカー専用ユーティリティやOS設定により挙動が異なります。"
        ]
      },
      {
        "title": "内蔵パネルと外部モニター出力におけるバッテリー駆動時の挙動差",
        "content": [
          "近年のノートPCはハイブリッドグラフィックス構成（NVIDIA Optimus、AMD SmartAccess Graphics、Apple Unified Memoryなど）を採用しており、内蔵画面と外部出力端子は異なるコントローラーに割り当てられています。",
          "一般的な設計では、内蔵ディスプレイはeDP（Embedded DisplayPort）経由で省電力な内蔵GPU（iGPU）に直結されています。バッテリー駆動時は電力を節約するため、高性能な専用GPU（dGPU）が完全にスリープします。dGPUでの処理が必要なアプリを動かす場合、描画フレームをPCIeバス経由でiGPUの表示回路へ転送する必要があり、バス帯域が制限されるバッテリー駆動時にはこの転送負荷が微小なカクつきを生む原因になります。",
          "HDMI、USB-C DisplayPort Alternate Mode、またはThunderboltドック経由で接続される外部モニターには、さらに別の要素が加わります。外部ポートはdGPUに直結されている場合や、USBドック内でデータやLAN通信と帯域を共有している場合があります。AC電源を抜くと、ドックがUSB Power Deliveryプロファイルを再ネゴシエーションしたり、dGPUが大幅なクロックダウンを起こし、AC接続時には生じないコマ落ちが外部画面で発生することがあります。"
        ],
        "bullets": [
          "内蔵液晶はeDPでiGPUに接続され、バッテリー駆動時はdGPUが頻繁に省電力休止します。",
          "GPU間のフレームコピー処理は、バッテリーによるバス帯域制限時にカクつきを招く要因となります。",
          "ThunderboltやUSB-Cドックは帯域を共有し、給電遮断時にネゴシエーションがやり直されることがあります。",
          "外部モニターの動作確認をAC電源で行うことで、ドックの給電制限と表示不具合を切り分けられます。"
        ]
      },
      {
        "title": "ノートPCのバッテリー vs AC電源比較検証手順：規律ある確認プロトコル",
        "content": [
          "カクつき、リフレッシュレートの低下、輝度変化がOSの省電力設定によるものか機器の異常によるものかを特定するため、以下の5段階の手順を実施してください：",
          "フェーズ1：AC電源接続時の基準測定。付属の純正ACアダプターを接続します。OSの電源モードを「バランス」または「最適なパフォーマンス」に設定します。Screen Testerの[リフレッシュレートテスト](/tests/refresh-rate-test)および[モーションブラーテスト](/tests/motion-blur-test)を開き、安定した描画レートと滑らかさを記録します。",
          "フェーズ2：充電器の取り外し。Screen Testerを開いたままACケーブルを外します。直後に生じる変化を確認します：画面が暗くなりますか？ Windowsのディスプレイ設定や[リフレッシュレートテスト](/tests/refresh-rate-test)で120Hz/144Hzから60Hzへの低下が示されますか？ [HDRテスト](/tests/hdr-test)で省電力のためHDRが無効化されたかを確認します。",
          "フェーズ3：動的操作時のフレーム挙動確認。マウスカーソルを激しく動かしたり、テキストをスクロールします。Windows DRR搭載機では、操作時にレートが一時的に復帰するか、60Hzに固定されたままかを観察します。対応パネルの場合は[VRRテスト](/tests/vrr-test)も確認します。",
          "フェーズ4：外部モニターの動作確認。外部画面を接続している場合、バッテリー駆動時にウィンドウ移動がカクつくかを観察します。[ディスプレイ情報](/tests/display-info)や[ブラウザ互換性](/tools/browser-compatibility)で動作環境を確認します。",
          "フェーズ5：AC電源の再接続。充電ケーブルを再び接続します。リフレッシュレート、輝度、描画の滑らかさが即座に元の水準に復帰するか、アプリの再起動が必要かを確認します。"
        ],
        "bullets": [
          "フェーズ1：純正AC電源とパフォーマンス設定で、滑らかさの基準となるデータを記録します。",
          "フェーズ2：給電を外し、Hz低下、画面輝度、HDR設定の即時変化を確認します。",
          "フェーズ3：マウス操作やスクロールを行い、Windows DRRの動的復帰挙動をテストします。",
          "フェーズ4：外部モニターをバッテリーとACで比較し、ドックの給電制限による影響を分離します。",
          "フェーズ5：AC電源を再接続し、高リフレッシュレートと輝度が正常に復帰するかを確かめます。"
        ]
      },
      {
        "title": "電力起因の表示カクつき診断：正常な動作と不具合の判別",
        "content": [
          "意図的な省電力動作と実際のシステム不具合を正しく区別することで、不要な設定変更や誤認を防ぐことができます：",
          "正常な省電力動作の例：(1) Windowsのバッテリー節約機能が有効になった際に144Hz/165Hzから60Hzへ自動的に切り替わること；(2) Intel DPSTやAMD Vari-Brightにより、暗い画面でコントラストやバックライトがわずかに変動すること；(3) バッテリー駆動時に「バッテリー持続時間を最適化」が選択されている場合にHDRが自動でオフになること；(4) 最大輝度がわずかに抑えられること。",
          "点検・対処が推奨される不具合の例：(1) 純正ACアダプター接続時でもマウスカーソルが連続して引っかかる、または著しいフレーム落ちが生じること；(2) 電源ケーブルを抜き差しした際に激しい画面のチラつきや長時間のブラックアウトが発生すること；(3) 高駆動パネルであるにもかかわらず、AC電源接続時でも60Hzから変更できないこと；(4) AC電源使用時でも外部モニターを接続すると極端なマイクロスタッターが生じること。",
          "安全な改善手順：Windowsの詳細ディスプレイ設定でリフレッシュレートを確認します；メーカー製ユーティリティ（Lenovo Vantage、ASUS Armoury Crate、Dell Optimizerなど）で独自の省電力ロックがかかっていないか確認します；グラフィックドライバーをクリーンインストールします；ACアダプターの定格ワット数を確認します（規格よりワット数の低いUSB-C充電器を使うと、コンセントに繋いでいてもバッテリー保護のスロットリングが作動することがあります）。故障診断には[トラブルシューティングガイド](/knowledge-base/troubleshooting)をご活用ください。"
        ],
        "bullets": [
          "正常：バッテリー節約時の60Hz化、CABCによるコントラスト調整、電力節約のためのHDRオフ。",
          "不具合：AC接続時の恒常的なカクつき、給電抜き差し時のチラつき、AC接続時の60Hz固定。",
          "メーカー専用ソフト（Armoury Crate、Vantage等）のリフレッシュレート固定設定を確認する。",
          "容量不足の充電器による給電スロットリングを防ぐため、定格ワット数のAC電源を使用する。"
        ]
      },
      {
        "title": "段階的マルチモニター切り分けプロトコル：系統的診断フロー",
        "content": [
          "マルチモニター環境でのカクつき、不均一なフレームペーシング、スケーリング異常を診断する際、無作為な設定変更は原因究明を困難にします。原因となっているソフトウェア、ディスプレイ、インターフェース層を正確に特定するため、安全で体系的な切り分け手順を実施してください。",
          "診断レイヤーと確認根拠：観測結果を正しく解釈するため、4つのレイヤーを明確に区別します：(1) ブラウザ検出値：rAFフレーム配信周期、devicePixelRatio、ビューポート寸法（ソフトウェア描画ループを反映し、物理パネルのスキャンアウトそのものではありません）；(2) OS報告値：OSディスプレイ設定に反映される設定周波数、拡大率、HDR状態；(3) ユーザー視覚確認：目視で確認できるスタッター、カーソルの引っかかり、ウィンドウ移動の滑らかさ；(4) メーカー仕様：パネル上限周波数、コネクタ帯域、ドック処理能力。",
          "系統的切り分け手順（必ず1度に1つの項目のみ変更すること）：",
          "手順1：現状（ベースライン）の記録。変更を加える前に、各画面の解像度、リフレッシュレート、OS拡大率、HDR状態、接続ケーブルの種類をすべて書き出します。",
          "手順2：各画面の単体テスト。OS設定でサブ画面を無効化するかケーブルを安全に外し、メインの高周波モニター単体で [Refresh Rate Test](/tests/refresh-rate-test) と [Motion Blur Test](/tests/motion-blur-test) を実行し、完全な滑らかさを確認します。",
          "手順3：同一リフレッシュレートでの検証。サブ画面を再度有効化し、一時的にすべての画面を同一の周波数（例：両方とも60Hz）に揃えます。周波数が一致した状態でスタッターが発生するか確認します。",
          "手順4：混在リフレッシュレートの検証。メイン画面を本来の高周波（144Hzや165Hzなど）に戻し、サブ画面は60Hzのままにします。サブ画面で動画再生やブラウザ操作を行った際にメイン画面のフレーム配信が乱れるか観察します。",
          "手順5：スケーリング設定の検証。まず両画面を100%に揃えてテストし、次に混在拡大率（例：100%と125%）をテストします。画面境界をまたいでウィンドウをドラッグし、文字のぼやけや引っかかりを観察します。",
          "手順6：HDR / SDR混在環境の検証。HDR対応モニターとSDRモニターを併用している場合、OS設定でHDRのオン/オフを切り替え、トーンマッピングやデスクトップ輝度の安定性を比較します。",
          "手順7：VRR（可変リフレッシュレート）の検証。G-Sync / FreeSyncを使用している場合、GPUコントロールパネルでVRRのオン/オフを切り替え、[VRR Test](/tests/vrr-test) でウィンドウ同期の挙動を確認します。",
          "手順8：ノートPC内蔵パネルと外部出力の比較。ノートPCでは内蔵液晶単体での動作を確認した後、ハブを介さずに本体端子へ直結した外部モニターと比較します。",
          "手順9：ドックや変換アダプターのバイパス。USB-CドックやMSTハブを使用している場合、一時的に本体の映像端子へ直接接続し、ドックコントローラーの帯域飽和の有無を切り分けます。",
          "手順10：ブラウザ表示とOS設定値の照合。[Display Information](/tests/display-info) および [Browser Compatibility](/tools/browser-compatibility) の検出結果とOS設定値を照合します。危険なハードウェアの分解やケーブルの乱暴な抜き差しは避けてください。詳細は [トラブルシューティングガイド](/knowledge-base/troubleshooting) をご参照ください。"
        ]
      }
    ],
    "faq": [
      {
        "question": "サブ画面で動画を流すと、144Hzモニターが60Hzのようにカクつくのはなぜですか？",
        "answer": "60Hzのサブモニターでハードウェア動画再生を行うと、OSのコンポジターやブラウザがGPUの描画リズムを60Hzに引きずられて固定してしまうことがあります。ブラウザのハードウェアアクセラレーションを切り替えるか、最新のグラフィックドライバーに更新することで改善する場合があります。"
      },
      {
        "question": "60Hzモニターと144Hzや165Hzのゲーミングモニターを併用するのは良くないですか？",
        "answer": "問題ありません。最近のGPUとOSは異なる周波数の同時出力に標準で対応しています。古いシステムでは同期に苦労することがありましたが、現代の環境で起きる問題はハードウェアの限界ではなく、ソフトウェア側の描画負荷の競合によるものが大半です。"
      },
      {
        "question": "異なるスケーリングのモニター間でウィンドウを移動すると文字がぼやけるのはなぜですか？",
        "answer": "モニターごとの動的DPI変更に対応していない古いアプリは、画面移動時に文字やUIを再描画できません。OSが画像を無理に引き伸ばすように処理するため、文字やアイコンがぼやけて表示されます。"
      },
      {
        "question": "マルチモニター環境でG-SyncやFreeSyncがカクつきの原因になることはありますか？",
        "answer": "はい。特にVRRを「ウィンドウモードと全画面モード」で有効にしている場合に起こり得ます。サブ画面で別のアプリが更新されると、GPUドライバーがどちらの画面周波数を優先すべきか迷い、ちらつきやカクつきが発生することがあります。"
      },
      {
        "question": "ノートPCで外部モニターを使う際、バッテリー駆動だとカクつくのはなぜですか？",
        "answer": "バッテリー駆動中は厳しい省電力設定が適用され、GPUのメモリ速度やPCIeバス帯域が制限されることがあります。電源アダプターを接続してテストすることで、純粋な省電力動作か設定の不備かを判断できます。"
      },
      {
        "question": "Screen TesterでGPUの内部タイミングを測定したり、カクつきを自動修正できますか？",
        "answer": "いいえ。Webブラウザは保護されたサンドボックス内で動作するため、GPUのハードウェアレジスタや物理ケーブルの信号タイミングに直接アクセスすることはできません。Screen Testerは動作を目視確認するためのテストパターンを提供します。設定の変更はOSやドライバー側で行う必要があります。"
      },
      {
        "question": "充電器を抜くとノートPCの画面が120Hzや144Hzから60Hzに下がるのはなぜですか？",
        "answer": "これはWindowsのダイナミックリフレッシュレート（DRR）、グラフィックドライバー、またはメーカー専用ソフト（Lenovo VantageやASUS Armoury Crateなど）による設計通りの省電力動作です。毎秒120回や144回の画面更新は電力を多く消費するため、バッテリー駆動時は自動的に60Hzに抑えられます。バッテリー駆動時も滑らかさを重視したい場合は、Windowsのディスプレイ設定やメーカー製ソフトで固定設定に変更できます。"
      },
      {
        "question": "バッテリーとAC電源を切り替えたときに画面の明るさやコントラストが変わるのはなぜですか？",
        "answer": "この現象は、WindowsのCABC、Intel Display Power Saving Technology（DPST）、またはAMD Vari-Brightといった省電力機能によるものです。バッテリー消費を抑えるため、表示内容の明暗に合わせてバックライトの強さとガンマ曲線を動的に変化させます。色味や明るさの変化が気になる場合は、Intelグラフィックス・コマンド・センターやAMD Softwareからこれらの機能を無効に設定できます。"
      },
      {
        "question": "Screen TesterはノートPCがバッテリー駆動かAC電源接続かを直接判別できますか？",
        "answer": "いいえ。Webブラウザは安全なサンドボックス内で動作しており、特別な権限なしにハードウェアの電源レールやACPI充電状態、OSの電源プランを直接読み取ることはできません。Screen Testerはブラウザ層での描画タイミングやテストパターンの動作を測定しますが、動作低下がバッテリーによるものか温度制限や設定によるものかを自動判別することはできません。"
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
    "title": "HDRの基礎、トーンマッピング、およびピーク輝度",
    "subtitle": "ピーク輝度（Nits）、10ビット階調、PQ/HLGガンマ曲線、ローカルディミングの仕組み。",
    "description": "High Dynamic Range（HDR）の技術原理、ピーク輝度、FALD直下型バックライト、トーンマッピングについて解説します。",
    "directAnswer": "HDR（ハイダイナミックレンジ）は輝度と色域を大幅に拡張し、漆黒の表現と1,000ニトを超える高輝度ハイライトを両立させる技術です。",
    "whyItMatters": "真正なHDRにはハードウェア輝度とローカルディミングが不可欠です。調光のない擬似HDRではコントラストが低下し色が白飛びします。",
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
    "primarySearchIntent": "hdr モニター ピーク輝度 ニト トーンマッピング ローカルディミング",
    "readingTimeMinutes": 7
  },
  {
    "slug": "color-depth-and-banding",
    "category": "display-basics",
    "title": "色深度、量子化、およびカラーバンディング",
    "subtitle": "8ビット対10ビット、FRC（フレームレートコントロール）、階調飛びとグラデーション。",
    "description": "6bit+FRC、8bit、ネイティブ10bitの違い、バンディング（縞模様）が発生する原因と検証方法を解説します。",
    "directAnswer": "色深度（ビット深度）は各色チャンネル（RGB）が表示可能な離散的な明るさの段階数を示し、8ビットの256段階から10ビットの1,024段階まであります。",
    "whyItMatters": "色深度が不足すると、夕焼けや影のグラデーションに不自然な縞模様（バンディング）が現れ、画像編集の正確性が損なわれます。",
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
    "primarySearchIntent": "色深度 バンディング モニター 8ビット 10ビット frc 階調",
    "readingTimeMinutes": 5
  },
  {
    "slug": "black-levels-and-shadow-detail",
    "category": "display-basics",
    "title": "黒レベル、コントラスト、および暗部階調表現",
    "subtitle": "静的コントラスト比、暗部階調、ニアブラックの量子化、黒つぶれの診断。",
    "description": "パネルごとの黒の再現性、暗部のディテールが消失する「黒つぶれ」の原因、およびガンマ校正の方法を学びます。",
    "directAnswer": "黒レベルとは、ディスプレイが完全な黒を表示する際に発する最小の残留輝度であり、cd/m²単位で測定されます。",
    "whyItMatters": "黒レベルが浮いていると暗いシーンが白っぽく見え、逆にガンマが狂っていると暗部の細部が潰れて視認できなくなります。",
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
    "primarySearchIntent": "黒レベル コントラスト 暗部階調 黒つぶれ ガンマ モニター",
    "readingTimeMinutes": 6
  },
  {
    "slug": "display-uniformity",
    "category": "display-basics",
    "title": "画面の均一性と輝度ムラ分布",
    "subtitle": "周辺部の減光（ビネット）、色温度の偏り、バックライトの不均一性。",
    "description": "画面全体の輝度ムラや四隅の暗がり、色温度のドリフトを正確に診断します。",
    "directAnswer": "ディスプレイの均一性（ユニフォミティ）とは、画面の中央から四隅・外周にかけて輝度と色味が一定に保たれている度合いを指します。",
    "whyItMatters": "四隅の輝度が15%以上落ちていたり、左右で黄色や青色の色ムラがあると、写真補正やデザイン作業の基準が狂ってしまいます。",
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
    "primarySearchIntent": "画面均一性 輝度ムラ 色ムラ ビネット バックライト モニター",
    "readingTimeMinutes": 5
  },
  {
    "slug": "dead-pixel-vs-stuck-pixel",
    "category": "display-problems",
    "title": "ドット抜け（ドット落ち）vs 輝点（スタックピクセル）：識別、ISO規格と保証規定",
    "subtitle": "画素欠陥の分類基準、ISO 9241-307規格の目安、メーカー保証（RMA）基準と販売店の初期不良・返品規定を徹底解説。",
    "description": "ドット抜け（黒点）と輝点（スタックピクセル）の違い、ISO 9241-307規格の欠陥クラス、メーカー修理保証（RMA）と販売店の返品・交換対応の違いを分かりやすく解説します。",
    "directAnswer": "ドット抜け（黒点）は通電せず明るい背景で黒く見える非発光サブピクセルであり、輝点（スタックピクセル）は特定の色（赤・緑・青）で常時点灯してしまう異常です。ISO 9241-307は工学的な品質分類フレームワークであり、それ自体が自動的な返品や無償交換の法的義務を生じさせるものではありません。実際の対応は販売店規約、メーカー保証書、および地域の消費者保護法に基づいて決定されます。",
    "whyItMatters": "購入したモニターに画素欠陥を発見した場合、初期不良期間、メーカー無償保証、返品の可否など判断に迷うことが少なくありません。技術的なエルゴノミクス基準（ISO 9241-307）、メーカーの個別保証契約（RMA規定）、販売店の返品・交換規約、法律上の消費者権利の4つの層を正確に区別して理解することが重要です。",
    "whatToLookFor": [
      "ドット抜け（黒点）：白、シアン、マゼンタ、黄などの明るい単色画面で常時黒い点として視認される欠陥",
      "輝点（スタックピクセル）：黒や暗い単色画面で常時赤・緑・青に発光し続けるサブピクセル",
      "全点灯ピクセル（ホットピクセル）：RGB全サブピクセルが常時フル発光し、黒画面上で白い点として視認される状態",
      "欠陥の密集（クラスター）：近接するごく狭い範囲に複数の欠陥画素が集中して存在する状態",
      "視野角による見え方の変化：頭を動かしたときに画素と位置がズレる表面のゴミやホコリとの違い",
      "サブピクセル欠損による混色ムラ：1つのサブピクセルが欠落することで、特定の中間色のみが不自然に見える現象"
    ],
    "howToTest": [
      "画面表面のホコリを乾いた柔らかいマイクロファイバークロスで優しく拭き取ります",
      "Screen Testerの[ドット抜けテスト](/tests/dead-pixel-test)を開き、赤・緑・青・白・黒の全画面表示に切り替えて確認します",
      "直射日光や強い映り込みのない適切な室内照明環境下で、画面をグリッド状に規則正しく目視確認します",
      "[輝点テスト](/tests/stuck-pixel-test)を黒およびダークグレー背景で実行し、常時点灯しているサブピクセルを探します",
      "単色の切り替えによって欠陥の見え方がどう変化するか、特定の色でのみ現れるかを確認します",
      "欠陥のおおよその画面座標（中央部か外周部か）を記録します",
      "輝点が疑われる場合は、[スタックピクセル修復ツール](/tests/stuck-pixel-fixer)による非破壊的な高速カラーチェンジを試します",
      "当サイトの[新品モニター初期確認ガイド](/guides/new-monitor-inspection-return-window)や[中古モニター確認チェックリスト](/guides/used-monitor-inspection-checklist)を活用して記録します"
    ],
    "whatScreenTesterCanObserve": [
      "RGB単色、純白、純黒を含む厳密なテストカラーの画面表示",
      "ユーザーによる目視異常の報告、座標の記録、テスト時のメモの保存",
      "ブラウザの描画エンジンを用いた高速なRGBカラーサイクリングパターンの実行",
      "白背景で暗く見える欠陥と暗背景で光る欠陥の目視による識別",
      "標準的な単色パターンや解像度における表示異常の比較・観察"
    ],
    "whatScreenTesterCannotDetermine": [
      "薄膜トランジスタ（TFT）回路の導通状態やゲート絶縁膜の物理的絶縁破壊",
      "ISO 9241-307ディスプレイ欠陥クラスへの正式な適合証明や光学ラボ基準の合否",
      "特定製品におけるメーカー商用保証やRMA（無償修理・交換）適格性の判定",
      "販売店ごとの返品・交換規約の適用可否、返品期限の計算、再梱包手数料の有無",
      "法令上の消費者保護権利、民法・消費者契約法上の瑕疵（契約不適合）認定"
    ],
    "commonCauses": [
      "クリーンルーム内での半導体リソグラフィ（薄膜トランジスタ製造）工程における微細な製造誤差",
      "液晶パネルの基板貼り合わせ工程における微小な異物の混入",
      "輸送や組み立て時に発生した過度な物理的圧力、衝撃、フレームのねじれ",
      "透明電極（ITO配線）の断線によりサブピクセルに制御電圧が印加されない状態",
      "セル内の液晶分子が特定のアライメントで物理的に引っかかり動作しない状態",
      "熱的・電気的過負荷による駆動回路や画素電極接合部の損傷"
    ],
    "whatToDoNext": [
      "マクロ写真撮影と詳細なメモにより、欠陥の位置と色の変化を記録する",
      "購入した販売店の初期不良対応や返品・交換期限を最優先で確認する（最も迅速な解決策となる場合が多い）",
      "モニターの型番に対応するメーカー公式の画素欠陥（ドット抜け）保証規定を確認する",
      "単色の点灯であれば[スタックピクセル修復ツール](/tests/stuck-pixel-fixer)を一定時間実行してみる",
      "サポート窓口に問い合わせる前に[トラブルシューティングガイド](/knowledge-base/troubleshooting)の確認事項をチェックする"
    ],
    "sections": [
      {
        "title": "ドット抜け（黒点）vs 輝点（スタックピクセル）：技術的概要",
        "content": [
          "現代のフラットパネルディスプレイ（IPS、VA、TN方式の液晶やOLED）は、数百万個の微細な画素によって構成されています。一般的な液晶パネルでは、各画素が赤（R）・緑（G）・青（B）の3つのサブピクセルで構成され、それぞれ独立した薄膜トランジスタ（TFT）が液晶の分子配向を制御してバックライト光の透過率を調整しています。",
          "ドット抜け（黒点・デッドピクセル）は、サブピクセルの駆動回路が電気的に完全に遮断された場合に生じます。ノーマリーブラック（電圧印加時に光を通す）方式の液晶では、無通電状態のサブピクセルは常に光を遮るため、白や黄色などの明るい背景上で黒い点として視認されます。",
          "輝点（スタックピクセル）は、サブピクセルが常時通電状態や光を透過する状態で固着した場合に発生します。カラーフィルターを透過した赤・緑・青のいずれかの光がそのまま漏れ出るため、黒や暗い背景上で鮮やかに光る点として視認されます。自発光のOLEDでも、不点灯素子は完全な黒点となり、ショートした素子は常時点灯します。",
          "表示する背景色によって欠陥の視認性は大きく変化します。例えば緑のサブピクセル異常は青背景では全く見えませんが、白やマゼンタ背景では際立ちます。ブラウザテストは人間の肉眼による視覚的観察を支援するものであり、内部の電子回路を物理的に測定するものではありません。"
        ],
        "bullets": [
          "ドット抜け（黒点）：通電せず光を通さないサブピクセルで、白や明るい背景で黒い点として目立つ。",
          "輝点（スタックピクセル）：常時発光状態にあるサブピクセルで、黒や暗い背景で赤・緑・青に光る。",
          "全画素欠陥 vs サブピクセル欠陥：全画素欠陥はすべての色で異常となり、サブピクセル欠陥は混色の色再現を乱す。",
          "ブラウザの役割：高コントラストな単色パターンを提供して目視確認を助けるツールであり、ハードウェアの電子計測は行わない。"
        ]
      },
      {
        "title": "ISO 9241-307規格とは何か：工学的な品質分類フレームワーク",
        "content": [
          "ディスプレイ製造業界における客観的な用語統一と測定基準を確立するため、国際標準化機構（ISO）は電子視覚ディスプレイに関する国際規格としてISO 13406-2およびその後継規格であるISO 9241-307（人間工学規格群の一部）を策定しました。",
          "ISO 9241-307は、ディスプレイの視覚的欠陥を測定・分類するための工学的手法を定義しています。欠陥はタイプ1（常時最大輝度で点灯する輝点）、タイプ2（常時消灯している黒点）、タイプ3（異常な発光や色を示すサブピクセル欠陥）などに体系化されています。",
          "本規格では、100万画素あたりに許容される欠陥数に基づいて理論的なパネル品質クラス（クラス0、クラスI、クラスII、クラスIIIなど）が定義されています。クラス0は完全な無欠陥を意味しますが、一般の市販モニターの多くはクラスIやクラスIIに分類され、一定数の欠陥が製造公差として想定されています。",
          "ISO 9241-307は工学的な品質基準・測定規格であり、個別の消費者売買契約における返金や無条件交換の義務を定める法律ではありません。"
        ],
        "bullets": [
          "工学規格：ディスプレイの人間工学、測定手法、画素欠陥の分類体系を定義。",
          "欠陥の分類：タイプ1（輝点）、タイプ2（黒点）、タイプ3（サブピクセル異常）に規格化。",
          "クラス分け：クラス0（完全無欠陥）からクラスIIIまで、100万画素あたりの理論的許容基準を提示。",
          "品質の目安：工学的な設計・品質管理基準であり、消費者への自動的な返金権を規定するものではない。"
        ]
      },
      {
        "title": "ISO規格に適合・非適合でも自動交換・返金にはならない",
        "content": [
          "モニター購入者の間でよくある誤解として、「ドット抜けが1つでもあればISO違反で交換してもらえる」「ISOクラスを超えていれば必ず全額返金される」というものがあります。",
          "ISO 9241-307は技術的な品質評価フレームワークであり、それ自体が自動的な交換や返金の法的義務を生じさせるものではありません。国際標準規格は、個別の民間商取引に対して直接的な強制力を持ちません。",
          "メーカーは製品スペック表にISOクラスを記載することがありますが、実際の保証適用の可否はメーカーが定めた個別の保証規約（保証書）に基づいて判断されます。消費者法規や個別の販売契約で明示的に義務付けられていない限り、ISO規格の文言のみで無償交換（RMA）を要求することはできません。",
          "問題の解決は、技術基準（ISO 9241-307）、メーカー保証（RMA）、販売店の返品規定、法定の消費者権利という4つの独立した枠組みを正しく見極める必要があります。"
        ],
        "bullets": [
          "自動的な権利ではない：規格の記載があることと、自動的な返金・交換請求権があることは異なる。",
          "保証書が優先：実際の無償交換可否は、各メーカーの書面による製品保証規定が決定する。",
          "4つの層を区別：ISO規格、メーカー保証、販売店初期不良対応、消費者法を混同しない。",
          "設計基準としてのISO：メーカーは設計指標としてISOを参照するが、直接の無条件交換基準とするとは限らない。"
        ]
      },
      {
        "title": "メーカー保証規定とRMA（無償修理・交換）手続き",
        "content": [
          "メーカー保証は、購入後の一定期間内に生じた不具合について、メーカーが修理や交換を約束する任意の契約的合意です。",
          "画素欠陥に対する保証対応として、メーカー各社は独自のRMA（返品・修理認可）基準を定めています。この基準はメーカー、製品ブランド、価格帯によって大きく異なります。例えば、プロ用デザインモニターや高級ゲーミング製品では購入初期の「輝点ゼロ保証（Zero Bright Dot）」が付帯することがある一方、標準的なオフィスモニターでは数個の黒点やサブピクセル異常が許容範囲とされるのが一般的です。",
          "メーカーの判定基準では、暗い画面で目立つ輝点と明るい画面で目立つ黒点が明確に区別され、欠陥の総数だけでなく画面中央部にあるか、一定範囲内に密集しているかなどが審査されます。",
          "RMA申請にはシリアル番号、購入証明、欠陥写真などの客観的な証拠が必要です。判断基準は必ず各メーカーの公式サポート規約を確認してください。"
        ],
        "bullets": [
          "メーカーごとの個別基準：許容数、保証期間、対象部位は各社が独自に設定している。",
          "輝点と黒点の区別：目立ちやすい輝点には厳しい基準が、黒点には比較的緩やかな基準が適用される傾向がある。",
          "位置の重要性：画面中央部分の欠陥のみを対象とする、あるいは密集欠陥のみを交換対象とする場合がある。",
          "公式情報が正：競合他社と同じ基準であると思い込まず、当該製品の公式保証書を確認する。"
        ]
      },
      {
        "title": "販売店の初期不良対応・返品・交換規約",
        "content": [
          "多くの購入トラブルにおいて、販売店（小売店・ECサイト）が提供する初期不良対応や返品規定を利用する方が、メーカーのRMA手続きよりも迅速かつ柔軟に解決できるケースが多々あります。",
          "販売店は通常、商品到着後や購入後の一定期間、初期不良交換や購入者都合の返品期間を設けています。この期間内であれば、メーカーの厳しいRMA欠陥基準を満たしていなくても、店舗の顧客サービス基準として交換や返品を受け付けてもらえることがあります。",
          "ただし、返品規約は販売店ごとに個別に制定されており、内容が大きく異なります。返品期間は店舗、商品区分、購入形態（オンライン通販か実店舗か）によって異なり、「一律に何日間」という世界共通の日数は存在しません。また、開封済み商品の返品制限や再梱包手数料の有無も店舗ごとに異なります。",
          "販売店の初期不良期間は暦日（日数）で厳格に管理されるため、商品が届いたら直ちに開梱・通電して表示を確認することが非常に重要です。"
        ],
        "bullets": [
          "販売店対応の利点：メーカー規定よりも柔軟に初期不良交換や返品に応じてもらえる場合がある。",
          "日数は一律ではない：返品期間は店舗規約ごとに異なるため、納品書や注文履歴で確認する。",
          "コンディション要件：外箱、緩衝材、付属品が揃っていることが返品の条件となる場合が多い。",
          "届いたらすぐ点検：初期不良期限を逃さないよう、開梱後すぐに全画面テストを行う。"
        ]
      },
      {
        "title": "法律上の消費者権利（法定権利と契約不適合）",
        "content": [
          "メーカーの任意保証や販売店の商業的な返品規定とは別に、すべての取引には地域の民法や消費者保護法に基づく法定の権利が存在します。",
          "多くの法域では、購入した商品が契約の趣旨に適合し、通常期待される品質を備えていることを求める法定保証（契約不適合責任・瑕疵担保責任など）が定められています。重大な契約不適合が存在する場合、メーカー保証の記載内容に関わらず販売者に対して法的な救済を求められる場合があります。",
          "ただし、法的な消費者権利の適用範囲や「何個のドット抜けが法的な契約不適合に該当するか」の判断は、各国の判例、売買形態（BtoCかBtoBか）、製品価格帯などによって大きく異なります。",
          "Screen Testerは技術的な検証情報を提供するツールであり、法的助言を行うものではありません。法的な紛争が生じた場合は、各地域の消費生活センター、公的相談窓口、または弁護士等の専門家にご相談ください。"
        ],
        "bullets": [
          "法定の権利：メーカーの任意保証書とは独立して、法律上の契約不適合責任が存在する。",
          "適合性の要求：商品が本来果たすべき品質や説明に適合しているかを法的に判断する。",
          "法域による差異：具体的な法的判断や救済手段は国や地域の法律・判例に左右される。",
          "法的助言ではない：技術的なテスト結果を根拠としつつ、法的な争訟は適切な公的窓口へ相談する。"
        ]
      },
      {
        "title": "Screen Testerが支援できること（および支援できないこと）",
        "content": [
          "Screen Testerは、ユーザーが画面上の視覚的異常を体系的に発見し、観察し、客観的に記録するための使いやすいブラウザベースの検証環境を提供しています。",
          "Screen Testerが支援できること：(1) [ドット抜けテスト](/tests/dead-pixel-test)や[輝点テスト](/tests/stuck-pixel-test)による制御された単色テストパターンの全画面表示、(2) 明暗や原色の切り替えによる目視異常の発見、(3) 黒点・輝点・密集欠陥の視覚的区別、(4) 観察メモの作成、(5) 当サイトの[新品モニター初期確認ガイド](/guides/new-monitor-inspection-return-window)、[中古モニター確認チェックリスト](/guides/used-monitor-inspection-checklist)、[モニター総合検査スイート](/monitor-inspection)による体系的な記録、(6) [スタックピクセル修復ツール](/tests/stuck-pixel-fixer)による色切り替え刺激のテスト。",
          "Screen Testerが支援できないこと：(1) ISO 9241-307規格への正式な適合証明、(2) TFT素子の電圧や微細回路の電子顕微鏡レベルの測定、(3) 個別メーカーの保証基準合致の公式認定、(4) 法的な欠陥（契約不適合）の決定、(5) メーカーのRMA承認や販売店返金の確約。",
          "当サイトは技術的な誠実性を重視し、「ユーザーによる目視観察」「ブラウザ描画パターン」「メーカーの公式仕様」「法律・規約情報」の境界を明確に区別しています。"
        ],
        "bullets": [
          "できること：全画面単色パターンの表示、目視による異常箇所の特定、メモの整理、高速色サイクルの実行。",
          "できないこと：回路測定、ISO適合性の正式認定、メーカー保証の審査、返金の確約。",
          "法的拘束力なし：当サイトの検査結果はユーザー個人の観察記録であり、法的証明書ではない。",
          "用語の透明性：ブラウザテストとハードウェア測定、規約判断を厳密に区別する。"
        ]
      },
      {
        "title": "サポート申請のための証拠・記録チェックリスト",
        "content": [
          "画素欠陥を発見し、販売店やメーカーに問い合わせを行う場合、客観的で整理された記録を準備しておくことで対応が格段にスムーズになります。",
          "1. 機器情報の記録：モニターの正確な型番、ハードウェアリビジョン、シリアル番号を控える（シリアル番号は問い合わせ時のみ使用し、一般のネット掲示板等には投稿しない）。",
          "2. 購入証明の保管：購入時の領収書、納品書、注文確認メール、配送伝票、注文番号を保存する。",
          "3. 規約の事前確認：販売店の初期不良対応期限およびメーカーの画素欠陥保証基準を確認しておく。",
          "4. 検査ログの作成：テスト実施日、室内の明るさ、解像度設定、欠陥の位置（中央付近か画面端か）を記録する。",
          "5. カラー別の見え方：どの単色背景で欠陥が見え、どの色で目立たなくなるかを整理する。",
          "6. 写真証拠の撮影：欠陥部分を大きく捉えた鮮明なマクロ（接写）写真と、画面全体のどの位置にあるかを示す引きの全体写真を撮影する。",
          "プライバシーに関する重要なお知らせ：サポート窓口や販売店に写真や書類を提出する際は、自宅住所、電話番号、クレジットカード情報、アカウントパスワードなどの個人情報を必ず黒塗り（マスキング）して保護してください。"
        ],
        "bullets": [
          "型番と製造番号：公式窓口への提示用にモデル名とシリアル番号を正確に控える。",
          "購入証明：レシート、納品書、注文日、店舗の返品期日を手元に準備する。",
          "写真撮影：欠陥箇所のアップ写真と、画面全体の中での位置が分かる全景写真の両方を撮る。",
          "個人情報マスキング：住所、電話番号、決済情報などは提出前に必ず黒塗りして隠す。"
        ]
      },
      {
        "title": "画素欠陥を見つけた時の行動フロー：意思決定モデル",
        "content": [
          "Screen Testerで画面を点検する際は、以下の実践的な行動フローに沿って対処方針を決定してください：",
          "目視観察 → 複数のテストパターンで異常を再確認 → 客観的に記録 → 販売店の初期不良・返品期限を確認 → メーカーの保証・RMA基準を確認 → 法令上の権利を確認 → 最適な問い合わせルートを選択。",
          "点検結果は以下の標準的な用語で整理してください：",
          "• 正常に見える（Looks normal）：RGB、白、黒の全テスト画面で均一な発色を示し、持続的な黒点や輝点は見られない。",
          "• 要確認（Needs attention）：1つ以上のテスト背景で、黒い点や特定色に光るサブピクセルが持続的に確認できる。記録を作成し規約と照合する。",
          "• 判定保留（Unsure）：小さな点が見えるが、頭を動かすと位置がズレるなど外部のゴミや汚れが疑われる。クロスで清掃して再テストする。",
          "「要確認」に該当する場合は、まず販売店の初期不良・返品期間内であるかを確認してください。初期不良期間が過ぎている場合はメーカー保証のRMA条件を確認し、解決しない場合は消費者窓口等への相談を検討します。"
        ],
        "bullets": [
          "行動フロー：観察 → パターン確認 → 記録作成 → 店舗規約確認 → メーカーRMA確認 → 手続き。",
          "正常に見える：すべての単色テストでムラなく均一に表示される状態。",
          "要確認：複数のテスト画面で持続的な欠陥が確認できる状態。",
          "判定保留：表面の汚れやホコリの可能性があるため、清掃後に再検査を行う状態。"
        ]
      },
      {
        "title": "画素欠陥に関するよくある誤解と事実",
        "content": [
          "一般的な誤解を正しく理解することで、無用なトラブルや誤った期待を防ぐことができます：",
          "誤解1：「ドット抜けが1個でもあれば必ず新品交換してもらえる。」 事実：完全無欠陥保証（ゼロ輝点保証など）が付帯しているか、販売店の返品期間内である場合を除き、一般的なメーカー保証では一定数以上の欠陥がないとRMA対象になりません。",
          "誤解2：「ISO規格は完全にドット抜けのない画面を保証している。」 事実：ISO 9241-307は各クラスごとに許容される欠陥数の上限を定めたものであり、完全無欠陥を保証するものではありません。",
          "誤解3：「メーカー保証と販売店の返品規定は同じものである。」 事実：販売店の返品規定は店舗独自の商業サービスであり、メーカー保証はメーカーが定める長期的な品質契約です。",
          "誤解4：「返品可能期間は法律で一律14日と決まっている。」 事実：返品期間は販売店、国、製品カテゴリー、購入形態（通販か実店舗か）によって大きく異なります。一律の日数は存在しません。",
          "誤解5：「Screen Testerを使えばISO規格違反を法的に証明できる。」 事実：Screen Testerは目視観察用のパターンを表示するウェブツールであり、公的な検査証明書を発行するものではありません。",
          "誤解6：「写真を送ればそれだけで必ず保証が認められる。」 事実：写真は初期審査の重要な材料ですが、最終的な保証適用はメーカーの規定や実機確認に基づいて総合的に判断されます。",
          "誤解7：「どんなスタックピクセルもソフトウェアで直せる。」 事実：色の高速切り替えによって動作が不安定な液晶分子が復帰することはありますが、物理的な回路の断線や素子破壊はソフトウェアで修復できません。"
        ],
        "bullets": [
          "単一欠陥の扱い：1個の欠陥では、標準保証の交換基準に届かないことが多い。",
          "ISOの真意：許容される欠陥数の目安を定めた規格であり、無欠陥を約束するものではない。",
          "制度の違い：販売店の初期不良対応とメーカー保証は別個の規約として運用される。",
          "期間は店舗次第：返品期間は購入店ごとに異なるため、必ず個別に確認する。",
          "ソフトウェアの限界：配線の物理的断線や破損はプログラムで直すことはできない。"
        ]
      }
    ],
    "faq": [
      {
        "question": "ドット抜けが1個あった場合、すぐに新品交換してもらえますか？",
        "answer": "メーカー保証の基準では、直ちに交換対象とならない場合が一般的です。多くの通常保証では一定数以上の欠陥が規定されており、「無輝点保証（ゼロブライトドット）」が付帯していない限り交換できません。ただし、購入直後で販売店の初期不良対応期間内であれば、店舗規約に基づいて交換や返品を受け付けてもらえることがあります。"
      },
      {
        "question": "輝点（スタックピクセル）とドット抜け（黒点）の違いは何ですか？",
        "answer": "ドット抜け（黒点）はサブピクセルに通電せず常に光を遮断するため、白などの明るい背景で黒い点として見えます。輝点（スタックピクセル）はサブピクセルが常時通電または開いた状態で固着し、黒などの暗い背景で赤・緑・青のいずれかの色に光り続けます。"
      },
      {
        "question": "スタックピクセル修復ツールを使うとモニターが壊れることはありますか？",
        "answer": "いいえ。当サイトの[スタックピクセル修復ツール](/tests/stuck-pixel-fixer)は通常のウェブブラウザ上で色の高速切り替えを行っているだけであり、モニターの電圧やハードウェアに過負荷を与えることはありません。ただし、点滅する光に敏感な方は画面を直視しないようご注意ください。"
      },
      {
        "question": "パソコンのスクリーンショットにドット抜けが写らないのはなぜですか？",
        "answer": "スクリーンショットはパソコンのグラフィックボード内部で生成されたデジタル画像を保存する機能です。ドット抜けはモニターの物理的な液晶パネルのハードウェア故障であるため、パソコン内部の画像データには存在せず、写真として外部からカメラで撮影する必要があります。"
      },
      {
        "question": "ISO 9241-307の欠陥クラスとメーカー保証の違いは何ですか？",
        "answer": "ISO 9241-307は国際的な学術・工業規格であり、ディスプレイの品質区分や測定基準を定めたものです。メーカー保証は、メーカーと購入者の間で結ばれる民間の製品保証契約であり、実際の修理・交換の受付条件を定めたものです。"
      },
      {
        "question": "画素欠陥を見つけたら、まず販売店とメーカーのどちらに連絡すべきですか？",
        "answer": "まずは購入した販売店の初期不良期間内であるかを確認してください。初期不良期間内であれば、販売店に連絡する方が手続きが迅速で対応が柔軟な傾向があります。販売店の期間が過ぎている場合は、メーカー保証の規定を確認してサポート窓口に連絡してください。"
      },
      {
        "question": "ISO 9241-307規格は法的に返金や交換を強制するものですか？",
        "answer": "いいえ。ISO 9241-307は人間工学的な分類・測定のための技術規格であり、消費者に対する自動的な返金や交換の法的権利を直接生じさせるものではありません。実際の救済は各メーカーの保証書、販売店の売買規約、および地域の消費者保護法に基づいて決定されます。"
      },
      {
        "question": "モニターの返品期間は「14日間」など世界共通で決まっていますか？",
        "answer": "いいえ。返品期間は販売店、購入国、購入形態（通信販売か店頭か）、製品区分によって全く異なります。共通の法定日数があるわけではありません。購入時のレシート、納品書、またはショップの利用規約に記載された期限を必ず確認してください。"
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
    "title": "バックライト漏れとIPSグローの違い：見分け方と曲面ディスプレイの特性",
    "subtitle": "ベゼルの圧力、曲面パネルの幾何学構造、液晶の複屈折、暗室での視覚診断。",
    "description": "バックライト漏れとIPSグローの違い、視野角や画面の曲率が見え方に与える影響、暗室での目視確認方法を解説します。",
    "directAnswer": "バックライト漏れはベゼル周辺の隙間から物理的に漏れる光であり、観察角度を変えても同じ位置にとどまります。一方、IPSグローなどの角度依存の光は、視点を動かすと位置や明るさが変化するパネル特有の光学特性です。",
    "whyItMatters": "平面または曲面パネルにおける通常の角度依存のグローを初期不良と誤認すると、同一の光学特性を持つ交換品を受け取るだけの不要な返品につながります。一方で、ベゼルの強い圧迫による物理的なバックライト漏れは、暗室でのコントラストを恒常的に損ないます。画面の曲率、視聴距離、パネル駆動方式の違いを正しく理解することで、的確な状態把握とメーカー相談が可能になります。",
    "whatToLookFor": [
      "バックライト漏れ：ベゼル外周や四隅から内側に向かって差し込む局所的な白や黄色の光で、頭を動かしても位置が変わらないもの",
      "IPSグロー：四隅に広がる銀色、金色、または紫がかった拡散光で、その角を正面から垂直に見つめると消灯または移動するもの",
      "曲面エッジの光輪：画面の設計曲率半径より極端に近接または離れて着席した際に、左右の外周端に生じる拡散光",
      "VAパネルの視野角ガンマシフト：曲面または平面VAパネルを斜めから見た際に生じる暗部シャドウの浮き上がりや色の抜け",
      "ベゼル圧迫痕：シャーシのネジ固定部やフレーム接合部の強い挟み込みによって生じるシャープな光漏れ"
    ],
    "howToTest": [
      "夜間に照明を消した完全な暗室で、外光の映り込みがない状態で検査を実施します",
      "モニターのOSD輝度を、極端な高輝度ではなく、通常の使用環境に適した快適なSDR輝度に設定します（通常の作業環境でない限り、100%の最大輝度に設定することは避けてください）。",
      "Screen Testerの[バックライト漏れテスト](/tests/backlight-bleed-test)を全画面で起動し、完全な黒画面を表示します",
      "ディスプレイの設計曲率半径（例：1000Rなら約1.0m）の位置に着席し、視線の高さを画面の垂直中心に合わせます",
      "パララックス視点移動テスト：頭を上下左右に動かします。光が移動したり消えたりする場合は光学的なグローです",
      "2〜3メートル後方に下がります：距離を取ると角度依存のグローは大幅に減少しますが、物理的な光漏れはベゼル端に残ります"
    ],
    "whatScreenTesterCanObserve": [
      "平面および曲面ディスプレイにおけるデジタル純黒（RGB 0, 0, 0）テスト画面の表示",
      "頭部移動時の静的な光漏れと角度依存グローの視覚的挙動の分離確認",
      "焦点半径での垂直視線アライメントを確認するためのオプション中央照準クロスヘア",
      "黒レベルの均一性を評価するための段階的ダークグレー背景（1%〜5%）",
      "ユーザーによる視覚的異常の確認、視聴距離の変化、および暗室での観察メモ"
    ],
    "whatScreenTesterCannotDetermine": [
      "カンデラ毎平方メートル（cd/m²またはnits）による物理輝度出力や絶対コントラスト比",
      "モニター外枠ネジの締め付けトルク、シャーシ挟み込み圧力、曲面フレームの物理公差",
      "液晶分子の光学的位相差（複屈折）、偏光板の透過効率の数値測定",
      "物理的な視点移動を伴わないガラス応力歪みと偏光漏れの自動判別",
      "メーカー保証基準、RMA交換適格性、または販売店の初期不良判定"
    ],
    "commonCauses": [
      "バックライト漏れ：製造時のベゼル組み立て圧力が過剰で、パネル積層体の外周が圧迫されている",
      "バックライト漏れ：長時間の点灯に伴う熱膨張により、内部の導光板（LGP）やフレームがわずかに歪んでいる",
      "IPSグロー：インプレーンスイッチング方式の水平配向液晶における、斜め入射光の光学的複屈折",
      "曲率ジオメトリの影響：モニターの設計曲率半径よりも著しく近い距離に座ることで、画面端が急な斜め視野角になってしまうこと。",
      "曲面VAガンマシフト：垂直配向液晶を斜めから見ることにより、端部の暗部階調が白っぽく浮き上がる"
    ],
    "whatToDoNext": [
      "画面周辺部の斜め視野角を最小限に抑えるため、モニターの曲率半径（焦点距離）に近い位置に視点を合わせてください。",
      "暗所での瞳孔の開きを抑え、画面への直接の映り込みを防ぎながら黒の締まりを高めるため、ディスプレイ背面に穏やかで自然な間接照明（バイアスライト）を配置してください。",
      "[ユニフォミティテスト](/tests/uniformity-test)で暗部グレー画面を確認し、[視野角ガイド](/guides/monitor-viewing-angles-explained)を参照します",
      "2メートル離れて正面から見ても強い白や黄色の光漏れが局所的に固定されている場合は、販売店に交換を相談してください"
    ],
    "sections": [
      {
        "title": "光漏れの物理的メカニズム：ベゼル圧迫と光学的複屈折",
        "content": [
          "液晶ディスプレイ（LCD）は自己発光しません。エッジライト型または直下型バックライトの光が、反射シート、拡散板、プリズムシート、偏光フィルム、液晶層という複数の層を通過して画面に届きます。",
          "バックライト漏れは機械的な構造不良です。外枠ベゼルやネジがパネル外周を不均一に圧迫すると、光学積層体が挟み込まれます。このわずかな隙間から変調されていない光が直接漏れ出し、角や縁に固定されたトーチ状の光として現れます。",
          "対照的に、IPSグローはIPSパネルの液晶配向に起因する自然な光学現象です。IPSパネルでは液晶分子がガラス基板に対して水平に並んでいます。垂直（90度）から見ると光は完全に遮断されますが、斜めから光が通過するとわずかな位相差（複屈折）が生じ、斜め方向から見た際に銀色や琥珀色の拡散光として観察されます。"
        ],
        "bullets": [
          "バックライト漏れは機械的な組み立て不良であり、液晶制御を受けない光が外枠から漏れます。",
          "IPSグローは、水平配向液晶を斜めから見た際に生じる光学的な複屈折特性です。",
          "漏れはベゼルに固定されますが、グローは頭を動かすと画面上を動きます。"
        ]
      },
      {
        "title": "曲面ディスプレイ：視覚ジオメトリと光の入射角",
        "content": [
          "曲面モニターは1000R、1500R、1800Rといった特定の曲率半径で作られています（数字はミリメートル単位の半径を表し、1000Rは半径1.0メートルを意味します）。その主な人間工学的目的は、横長画面のどの位置に対しても目からの距離を等しく保つことです。",
          "しかし、曲面構造は光の入射角を大きく変化させます。ユーザーが設計焦点中心（1000Rの場合は1.0m）に座ると、視線は中央にも左右の端にもほぼ垂直に交差します。しかし焦点より近すぎる位置（例：1800Rに50cm）に座ったり中心から外れると、外周端が極端な斜め角度で視界に入ります。",
          "この幾何学的変化が均一性の見え方に影響します。曲面IPSモニターで近すぎる位置に座ると、外周部が急角度となり角のグローが強く認識されます。曲面構造そのものがバックライト漏れを引き起こすわけではなく、目の位置によって光の入射角が変わる点が重要です。"
        ],
        "bullets": [
          "曲率表記（1000R、1500R、1800R）はミリメートル単位の理想的な焦点距離を示します。",
          "焦点半径から外れると、外周部の画面端が急な斜め角度で見えることになります。",
          "曲面は視覚ジオメトリを変化させますが、曲率そのものが物理的な光漏れを作るわけではありません。"
        ]
      },
      {
        "title": "曲面パネルで機械的バックライト漏れと角度依存グローを見分ける方法",
        "content": [
          "曲面ディスプレイの明るい領域が初期不良か正常なグローかを判別するには、パララックス（視差）頭部移動テストが有効です。",
          "ステップ1：部屋の照明を消し、Screen Testerの[バックライト漏れテスト](/tests/backlight-bleed-test)で全画面黒を表示します。通常の着席位置から四隅を確認します。",
          "ステップ2：頭をゆっくり上下左右に動かします。光の位置が画面上を移動したり、色味が変わったり、弱まったりする場合は、角度依存の光学グローです。",
          "ステップ3：気になる角に対して真正面（90度）から視線を向けます。垂直から見て光が消える場合、パネルは正常な光学特性の範囲内です。2メートル離れた正面位置から見ても強い白や黄色の光がベゼル際に張り付いている場合は、機械的なバックライト漏れです。"
        ],
        "bullets": [
          "視差移動テスト：頭を動かして光が移動するか固定されているかを確認します。",
          "垂直視線確認：角を真正面から見て光が消える場合は、通常の光学グローです。",
          "固定光の確認：2メートル離れてもベゼル際に固定して見える光は物理的圧迫を示します。"
        ]
      },
      {
        "title": "曲面ディスプレイにおける駆動方式の比較：IPS、VA、TN、OLED",
        "content": [
          "曲面加工されたディスプレイでは、液晶駆動方式によって光学的な振る舞いが異なります。パネル方式を踏まえて観察することが不可欠です：",
          "IPS方式：色再現性に優れ広視野角です。しかし液晶が水平配向のため、曲面IPSでは焦点から外れて座ると外周端にグローが現れやすくなります。専用のA-TW偏光板で低減できますが、一部の高級機に限られます。",
          "VA方式：暗部で液晶が垂直に並ぶため、3000:1〜5000:1の高いネイティブコントラストと漆黒を実現し、暗室でも黒画面のグローが極めて少なくなります。ただし斜めから見ると暗部が浮くガンマシフトが生じるため、メーカーは大型VAパネルをあえて湾曲させ、端部を視線に垂直に向けて色の抜けを防いでいます。",
          "TN方式：高速応答ですが視野角が狭く上下反転が生じるため、近年の曲面製品での採用例は稀です。",
          "有機EL（OLED）：各サブピクセルが個別に自発光するアーキテクチャ。OLEDディスプレイはサブピクセルを完全に消灯させることで真の深みのある黒を表現し、平面・曲面を問わずバックライト漏れやIPSグローは一切発生しません。曲面OLEDでも広視野角において安定したコントラストを維持します（極端な斜め角度では反射防止コーティングによるわずかな色変化が生じる場合があります）。"
        ],
        "bullets": [
          "IPS：優れた発色を持ちますが、黒画面を斜めから見た際に特有のグローを生じます。",
          "VA：3000:1以上の高コントラスト。画面の湾曲は斜めガンマシフトの防止に効果的です。",
          "TN：視野角が狭く色反転が生じるため、曲面用途には適していません。",
          "OLED：自発光ピクセルにより、バックライト漏れとIPSグローの双方が完全に排除されます。"
        ]
      },
      {
        "title": "曲面ディスプレイのための暗室目視点検プロトコル",
        "content": [
          "曲面ディスプレイの輝度分布を客観的に評価するには、環境要因を排除した秩序ある点検手順が必要です：",
          "1. 室内照明の遮断：頭上の照明やデスクライトを消灯します。凹面の曲面スクリーンは背後の光源を集光し、引き伸ばされた反射ノイズを生じさせます。",
          "2. 焦点位置の調整：モニターの曲率半径（1000Rなら1.0m、1500Rなら1.5m）に合わせて椅子を配置し、視線の高さを画面の中央に合わせます。",
          "3. 輝度の適正化：モニターのOSD輝度を、室内の照明に合わせた快適で標準的なSDR輝度レベルに調整します。完全な暗室で最大輝度のまま画面を評価すると、漏れ光や光学的なグローが過度に誇張されて見えてしまいます。",
          "4. Screen Testerの実行：[バックライト漏れテスト](/tests/backlight-bleed-test)で全画面の黒表示を確認し、[ユニフォミティテスト](/tests/uniformity-test)でダークグレーのテストパターンを表示して輝度ムラを評価します。さらに[視野角テスト](/tests/viewing-angle-test)および[モニター視野角ガイド](/guides/monitor-viewing-angles-explained)で角度による色の変化を確認してください。"
        ],
        "bullets": [
          "凹面ガラスの集光反射を防ぐため、背後の照明を完全に消灯します。",
          "指定された曲率半径（1000R、1500R、1800R）の位置に正確に着席します。",
          "最大輝度を強制するのではなく、日常使いに適した快適なSDR輝度に設定する。",
          "ダークグレーのフィールドを活用し、局所的なベゼル圧迫とパネル全体の緩やかなグラデーションを区別する。"
        ]
      },
      {
        "title": "サポート相談のための証拠記録とメーカー保証の考え方",
        "content": [
          "目視点検で機械的なバックライト漏れが疑われる場合、メーカーや販売店へ相談する前に客観的な記録を残すことが重要です：",
          "写真撮影による記録（任意）：ディスプレイの評価は肉眼による直接観察が基本基準となります。カメラのセンサーダイナミックレンジ、自動トーンマッピング、ホワイトバランス、画像処理は見た目を大きく変化させるため、写真は肉眼の代わりにはなりません。サポートへの提示や比較のために撮影する場合は、撮影ごとの露出設定を一定に保つことで写真間の比較精度が向上します。スマートフォンの自動夜景モードによる過度な露出オーバーを避けるため、可能であればマニュアル設定を使用し、肉眼で見えている状態に近づくようプレビューを調整してください。",
          "複数アングルでの撮影：焦点位置からの全体写真と、気になる角に対して真正面から近づいた接写写真の2枚を記録します。正面接写でも光が写る場合、ベゼルの物理的圧迫を示す確実な根拠になります。",
          "販売店の初期不良期間の活用：メーカー保証では光学的なグローが許容範囲内と判断されることが多いため、視覚的に気になる場合は購入店の初期不良交換・返品期間内に相談するのが確実です。詳細は[トラブルシューティングガイド](/knowledge-base/troubleshooting)をご確認ください。"
        ],
        "bullets": [
          "カメラの夜間モードを切り、手動露出で肉眼の見え方に合わせて撮影します。",
          "焦点位置からの全体写真と、角に対して垂直な接写写真を組み合わせて記録します。",
          "メーカーのRMA保証規定より、販売店の初期不良返品期間のほうがスムーズに対応されます。",
          "詳細はScreen Testerの[トラブルシューティングガイド](/knowledge-base/troubleshooting)をご参照ください。"
        ]
      }
    ],
    "faq": [
      {
        "question": "画面が曲がっていること自体がバックライト漏れの原因になりますか？",
        "answer": "いいえ。曲率そのものがバックライト漏れを作るわけではありません。バックライト漏れはベゼルの締め付け圧力や内部フレームの歪みなど機械的な要因で発生します。ただし、焦点から外れた位置で見ると曲面によって端部の入射角が斜めになり、正常な光学グローが強く見えやすくなります。"
      },
      {
        "question": "曲面モニターに近づいて座ると四隅が白く光って見えるのはなぜですか？",
        "answer": "モニターの設計曲率半径よりも著しく近い距離に座ると、視線が画面の端に急な斜め角度で入ることになります。IPSパネルの場合、これが斜め方向の複屈折（IPSグロー）を引き起こします。推奨される焦点距離まで視点を下げることで、より垂直に近い視線が確保され、四隅の白浮きが大幅に軽減されます。"
      },
      {
        "question": "多くの曲面ゲーミングモニターがIPSではなくVAパネルを採用しているのはなぜですか？",
        "answer": "VAパネルは3000:1〜5000:1の非常に高いコントラストを持ち、暗室でも黒画面の光漏れ感がほとんど生じません。また、VAは斜めから見ると暗部が白っぽくなる特性があるため、画面を湾曲させて端をユーザーの視線に正対させることで、その弱点を効果的に抑え込めるためです。"
      },
      {
        "question": "スマートフォンでバックライト漏れを白飛びさせずに正しく撮影するには？",
        "answer": "写真による記録はあくまで任意であり、肉眼での直接観察の代わりにはなりません。カメラのセンサーや露出補正アルゴリズムは輝度を誇張して記録してしまうためです。撮影する場合は、極端に明るく写る自動夜景モードを避け、マニュアル撮影で露出を固定し、暗室で肉眼で見えている明るさに近づけて撮影してください。"
      },
      {
        "question": "Screen Testerでモニターのコントラスト比やnit輝度を計測できますか？",
        "answer": "いいえ。Screen TesterはWebブラウザ上で動作し、OS経由でデジタルテスト画面を表示するツールです。外部の色彩計や光センサー機器と通信できないため、物理的なnit輝度やコントラスト比を計測することはできません。本ツールは人間の目による適正な視覚点検を支援します。"
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
    "title": "モニターのゴースト、モーションブラーとオーバードライブオーバーシュート",
    "subtitle": "VAの暗部スミアリング、応答速度オーバードライブ調整、逆ゴースト（コロナ）、およびモーション残像。",
    "description": "VAモニターで暗部スミアリングが発生する理由、過剰なオーバードライブが明るいハローや逆ゴーストを引き起こす原因、およびScreen Testerを使用した視覚的診断方法を解説します。",
    "directAnswer": "モニターのゴーストは、液晶分子の応答速度の遅さによって生じる尾引き現象であり、特にVAパネルの暗部・ニアブラック階調間で顕著に現れます。逆にオーバードライブのオーバーシュート（逆ゴースト）は、過剰な電圧が液晶分子を目標輝度を超えて行き過ぎさせることで、明るいまたは反転したハロー（コロナ）を発生させます。",
    "whyItMatters": "オーバードライブ調整は根本的なトレードオフです。電圧加速が不十分だと遷移がもたつき暗部スミアリングが生じますが、過度な加速は目標階調を超過させ不自然な発光ハローを生みます。最適なモーション明瞭度を得るには、リフレッシュレートや動作温度に応じたバランスの見極めが不可欠です。",
    "whatToLookFor": [
      "暗いグレーや中間調の背景上を移動する暗いグラフィックの後方に生じる黒や紫の長い尾引き（VAパネル特有の暗部スミアリング）",
      "動く物体の輪郭の前後に現れる白く発光するまたは色反転したハロー・コロナ（オーバードライブオーバーシュート / 逆ゴースト）",
      "発光輪郭を伴わず動く物体と同色の薄い影が追従する現象（液晶の遷移遅延による従来のGtGゴースト）",
      "サンプル＆ホールド方式の画面上を人間の眼が滑らかに追従することで生じる画面全体の均一なぼやけ（MPRT残像）",
      "低リフレッシュレート動作時やVRR（可変リフレッシュレート）のフレームレート低下時に生じる尾引き長の変化や突然のコロナ出現",
      "パネルの物理的応答速度ではなくGPUのフレーム生成・配信の乱れに起因する断続的なコマ飛びやカクつき（スタッター）"
    ],
    "howToTest": [
      "Screen Testerで[ゴーストテスト](/tests/ghosting-test)を開き、高コントラストおよびダークグレー背景上を移動するブロックを観察します。",
      "低速・中速・高速を切り替え、移動速度によって尾引きの長さがどのように変化するかを確認します。",
      "モニターのOSDメニューを開き、オーバードライブ / 応答速度設定を見つけます（[モニターOSD設定ガイド](/guides/monitor-osd-settings-explained)を参照）。",
      "利用可能なオーバードライブレベル（オフ、ノーマル、ファスト、エクストリームなど）を順に切り替え、ハローを出さずに尾引きを最小化できる設定を探します。",
      "[モーションブラーテスト](/tests/motion-blur-test)を実行して、網膜のサンプル＆ホールド残像と液晶の物理応答遅延を識別します。",
      "G-SyncやFreeSyncをお使いの場合は、[VRRテスト](/tests/vrr-test)を用いてフレームレート低下時にオーバーシュートが強まらないか確認します。",
      "普段使用するリフレッシュレートで、かつモニターの温度が安定して熱平衡に達した状態でテストを再確認します。"
    ],
    "whatScreenTesterCanObserve": [
      "動くテストパターンの後方に現れる暗い尾引き、色シルエット、発光オーバーシュートコロナの視覚的観察",
      "ダークグレー対ブラックやシアン対グレーなど、多様なコントラスト組み合わせによる校正テストパターンの描画",
      "モニターOSDのオーバードライブプリセット変更に伴う尾引き長やハロー強度の相対的な視覚的変化",
      "異なるリフレッシュレート設定下でのテスト時にユーザー自身が知覚する動きの明瞭度の差異",
      "人間の眼球追従による網膜残像と液晶の遷移遅延との視覚的な比較識別"
    ],
    "whatScreenTesterCannotDetermine": [
      "実験室のフォトダイオードとオシロスコープによってミリ秒単位で測定されるGtG（中間階調応答時間）カーブ",
      "すべての開始輝度および到達輝度を網羅する256階調の完全なピクセル遷移マトリクス",
      "同期追従型ハイスピードカメラによって記録される認証済みMPRT（動画応答時間）",
      "パネルタイミングコントローラー（T-Con）の駆動電圧波形および厳密なオーバーシュート率",
      "ディスプレイ全体の入力レイテンシや内部スケーラーの画像処理遅延時間"
    ],
    "commonCauses": [
      "暗部間およびニアブラック階調における液晶分子の再配向の遅さ（VAパネル構造特有の物理的性質）",
      "モニターのオーバードライブ / Trace Free / AMAが過度な「Extreme」に設定され、深刻な電圧超過を起こしている",
      "モニターのオーバードライブが無効（Off）になっており、液晶に一切の電圧加速がかけられていない",
      "可変オーバードライブ機能がなく、固定設定のためVRRでフレームレートが低下した際に極端なコロナが発生する",
      "部屋の室温が低く、モニターが暖まる前に液晶材料の粘性が高くなっていることによる一時的な遅延",
      "GPUのフレーム配信の乱れやV-Syncの脱落を、パネルの物理応答性能の限界と誤認しているケース"
    ],
    "whatToDoNext": [
      "モニターOSDで標準的・ニュートラルな画像プロファイルを選択し、過度な輪郭強調やFPSモードを避けます。",
      "オーバードライブ設定をバランスの良い中間レベル（通常は「Normal」または「Fast」）に設定し、「Extreme」は避けます。",
      "OSのディスプレイ設定で、モニターが公称の最大リフレッシュレートに正しく設定されていることを確認します。",
      "[ゴーストテスト](/tests/ghosting-test)と[モーションブラーテスト](/tests/motion-blur-test)を実行して、尾引きの低減効果を確認します。",
      "VRR（G-SyncやFreeSync）を使用する場合は、[VRRテスト](/tests/vrr-test)で低FPS時にハローが目立たないか検証します。",
      "尾引きとは無関係にカクつきが続く場合は、[トラブルシューティングガイド](/knowledge-base/troubleshooting)でグラフィック環境を確認します。"
    ],
    "sections": [
      {
        "title": "VA暗部スミアリング：ニアブラック遷移が遅れる理由",
        "content": [
          "VA（Vertical Alignment）パネルは、電圧がかかっていない待機状態で液晶分子をガラス基板に対して垂直に配列させます。この配置によりバックライトの光漏れを極めて強固に遮断できます。VAディスプレイは多くのIPSディスプレイよりも高いネイティブ静的コントラスト比を備えるのが一般的ですが、具体的な特性はパネルやモデルによって異なります。",
          "しかし、完全な黒（RGB 0,0,0）から暗いグレーへと遷移させる際、印加される電圧の差は極めて小さくなります。微小な電圧差で液晶分子を再配向させるには、白から黒のような大きな電圧変化を伴う遷移と比べて大幅に長い物理的時間が必要です。暗い背景上で暗い物体が動くと、この応答遅れが黒や紫の引きずりとなり、暗部スミアリング（Dark-Level Smearing）として視認されます。",
          "重要なのは、暗部遷移の応答性はパネルの世代、個別のモニターモデル、ファームウェア、オーバードライブ設計、動作温度によって大きく異なるという点です。高電圧駆動を行う近年の「Fast VA」パネルは、従来型VAと比較してこの差を大幅に圧縮しています。メーカー公称値の「1ms GtG」は最も有利な単一条件の測定値であり、暗部遷移の実情を反映するものではありません。"
        ],
        "bullets": [
          "暗部間やニアブラック遷移は電圧ステップが小さいため、白への遷移よりも分子の回転が遅くなります。",
          "ダークモードのテキストスクロール時や、薄暗いゲームマップを移動する際に黒い尾引きが顕著になります。",
          "パネル世代やスケーラー設計、温度により挙動は大きく異なり、すべてのVAパネルに共通する単一のミリ秒数値は存在しません。",
          "メーカーの「1ms」というスペック表記は、実用性の低い極端な設定での限定的な測定結果である場合がほとんどです。"
        ]
      },
      {
        "title": "応答速度オーバーシュートと逆ゴースト：オーバードライブの代償",
        "content": [
          "液晶の緩慢な遷移を加速するため、モニター設計者はオーバードライブ（Trace Free、AMA、応答速度など各社呼称）を搭載しています。これはフレームサイクルの開始時に一時的な高い電圧パルスを印加し、通常電圧よりも強力に液晶分子を回転させる技術です。",
          "適切に調整されていれば液晶はフレーム時間内に目標輝度へ到達します。しかし電圧が高すぎると、液晶分子が目標輝度を行き過ぎてしまいます。この光学的オーバーシュートが「逆ゴースト」や「コロナ」と呼ばれる現象です。",
          "逆ゴーストは、動く物体の輪郭に現れる白く発光する、あるいは明暗が反転したハローとして視認されます。オーバードライブは明確なトレードオフ関係にあります。数値を下げるとハローは消えますが通常の尾引きが増え、数値を上げると遷移は早まりますが眩しいコロナのリスクが高まります。オーバードライブを上げ続ければ無制限に画質が良くなるわけではありません。"
        ],
        "bullets": [
          "オーバードライブはフレーム開始時に高めの電圧サージを瞬間的に供給して液晶の配向を早めます。",
          "過剰な電圧は液晶を目標輝度を超えて跳ね上がらせ、明るい発光ハロー（コロナ）を発生させます。",
          "オーバードライブ調整は、通常のスミアリング低減と逆ゴースト発生との間の直接的なトレードオフです。",
          "「Extreme」などの最大設定は、ほぼ例外なく深刻なオーバーシュートを引き起こし視認性を悪化させます。"
        ]
      },
      {
        "title": "5大モーション現象を正確に見分ける",
        "content": [
          "動いている画面の不完全さをすべて「ブレ」と一括りにしてしまうと、適切な対処ができません。的確な診断を行うには、同一画面上で同時に発生し得る5つの独立した物理現象を区別する必要があります：",
          "1. 暗部スミアリング（Dark-Level Smearing）：暗い背景上で暗い物体が動いた際に生じる紫や黒の長い尾引き。ニアブラック液晶の応答遅延に起因します（VAで顕著）。",
          "2. 従来のゴースト（Conventional Ghosting）：動く物体と同じ色の薄い影が後方に追従する現象。液晶のGtG応答時間がフレーム周期よりも長い場合に発生します。",
          "3. オーバードライブオーバーシュート（逆ゴースト）：物体の輪郭を取り囲む明るいハローや反転した縁取り。過剰なオーバードライブ電圧が原因です。",
          "4. 網膜追従残像（サンプル＆ホールド / MPRT）：静止画が保持されたまま画面上を動く物体を人間の眼が滑らかに追従することで網膜上で生じる全面的なボケ。ほぼ瞬時にピクセルが切り替わるOLEDを含むすべてのホールド型画面で発生し、高リフレッシュレート化や黒挿入で軽減されます。",
          "5. フレームペーシング不整・スタッター：GPUのコマ送り間隔の不均等や同期ズレによる断続的なカクつき。パネルのピクセル応答速度とは無関係です。"
        ],
        "bullets": [
          "暗部スミアリング：ニアブラックの遅延；暗い背景上で黒い引きずりが発生。",
          "従来のゴースト：同色の薄い影；液晶のGtG応答速度全体の遅延が原因。",
          "逆ゴースト（オーバーシュート）：白く光るハロー；オーバードライブ電圧の過剰印加。",
          "網膜残像（MPRT）：ホールド型画面特有の全体的なボケ；高リフレッシュレート化で低減。",
          "スタッター・コマ落ち：カクつく移動；GPUや垂直同期の要因であり液晶起因ではない。"
        ]
      },
      {
        "title": "VRR・リフレッシュレートとオーバードライブの連動性",
        "content": [
          "オーバードライブのチューニングは特定のフレーム周期を基準に行われます。165Hzでは1フレームは約6.06msと短いため強い電圧パルスが必要です。しかし60Hzになると1フレームは16.67msまで延び、液晶には遷移のための時間が約3倍も与えられます。",
          "高度なスケーラーを積んだモニターは「可変オーバードライブ」を採用しており、VRR（G-SyncやFreeSync）でフレームレートが低下した際に電圧パルスを自動で減衰させます。これにより165Hzのキレを保ちつつ60Hzでのハローを防ぎます。",
          "一方で普及帯のモニターではオーバードライブ電圧が固定されていることが多く、165Hzで良好な設定のままゲームが60〜80Hzに落ち込むと激しいオーバーシュートが発生します。[VRRテスト](/tests/vrr-test)と[ゴーストテスト](/tests/ghosting-test)を併用して挙動を確認してください。"
        ],
        "bullets": [
          "リフレッシュレートが下がると1フレームの表示時間が大幅に伸びます（165Hzで6.06ms、60Hzで16.67ms）。",
          "可変オーバードライブを持たないディスプレイは、低FPSのVRR駆動時に強いオーバーシュートが出やすくなります。",
          "可変オーバードライブ搭載機は、動作周波数に応じて印加電圧を動的に調整し破綻を防ぎます。",
          "最高Hzだけでなく60〜80Hzでの状態も確認し、FPS低下時にも安定するプリセットを選択してください。"
        ]
      },
      {
        "title": "動作温度・使用環境と製品個体差",
        "content": [
          "液晶分子は粘性を持つ特殊な液体の中に封入されており、その流動性は周囲の室温に大きく左右されます。冬季など寒い部屋でモニターの電源を入れた直後は液体が硬く、分子の回転が一時的に遅くなります。",
          "起動直後に感じられる強い暗部スミアリングも、バックライトの熱によってパネル内部が適正動作温度に達するにつれて自然と軽減されます。ピクセルの遷移挙動は温度などの動作環境によって変動するため、画一的なウォームアップ時間を規定すべきではありません。応答性の評価は必ず熱的に安定した状態で行ってください。",
          "また、同じ液晶パネル型番を採用したモニター同士であっても、スケーラーの処理能力、メーカー独自のファームウェア、工場出荷時のオーバードライブLUTによって実際の動作感は大きく異なります。"
        ],
        "bullets": [
          "低温環境下では液晶液の粘度が高まり、画面が温まるまで一時的に尾引きが強調されます。",
          "使用環境でディスプレイが安定した動作温度に達してから動的明瞭度を評価してください。固定の予熱時間を前提にしないでください。",
          "同一パネル採用機でも、制御回路やファームウェアの味付けによってゴーストの出方は異なります。",
          "起動直後の冷えた状態でのスミアリングを恒久的な製品故障と判断しないでください。"
        ]
      },
      {
        "title": "実用的なOSD検証手順",
        "content": [
          "特殊な測定器を使わずにご自身のモニターで最適なオーバードライブ設定を見つけるには、Screen Testerを用いた体系的な確認が効果的です：",
          "1. モニターOSDで標準的・ニュートラルなプリセット（標準またはカスタム）を選び、OS側で目的のリフレッシュレートが有効であることを確認します。",
          "2. Screen Testerの[ゴーストテスト](/tests/ghosting-test)を起動し、暗部グレーや中間色の背景上を移動するブロックを注視します。",
          "3. モニターのOSDを開いてオーバードライブ設定を表示し（[モニターOSD設定ガイド](/guides/monitor-osd-settings-explained)参照）、オフからノーマル、ファスト、エクストリームへと順に切り替えます。",
          "4. 尾引きが目に見えて減少し、かつ発光するハロー（オーバーシュート）が出現する直前の最適な一段階を見極めます。",
          "5. 重量級ゲームでVRRを使用する場合は、低フレームレート時にもハローが邪魔にならないか確認します。",
          "「常に最大にすべき」といった画一的な設定は避けてください。ベストな設定は機種ごとに異なり、尾引きとハローのバランスの上に成り立っています。"
        ],
        "bullets": [
          "ステップ1：ニュートラルな画質プロファイルを選び、OS側で推奨Hzを確認する。",
          "ステップ2：[ゴーストテスト](/tests/ghosting-test)を実行して明暗背景での尾引き状態を観察する。",
          "ステップ3：OSDのオーバードライブをOffから順に引き上げて比較する。",
          "ステップ4：明るいハローや反転輪郭が出ない範囲で最も尾引きが少ない設定を選ぶ。",
          "ステップ5：VRR用途を想定し、低リフレッシュレート時でも破綻しないか確認する。"
        ]
      },
      {
        "title": "視覚的解釈ガイド：目に見える現象の正体",
        "content": [
          "テストパターンを観察した際に視認される現象と、その背後にある物理的メカニズムの対応表です：",
          "暗い物体の後ろに黒い尾引きが見える：暗部階調の遷移遅延の可能性（VAパネルの典型特性）。ハローが出ない範囲でオーバードライブを一段階引き上げ、モニターが温まっているか確認してください。",
          "物体の周囲に明るいまたは暗いコロナが現れる：過剰な電圧印加によるオーバードライブオーバーシュート（逆ゴースト）。OSDのオーバードライブを一段階下げてください。",
          "動く画面全体が均一にぼやけて見える：サンプル＆ホールド画面における人間の網膜追従残像（MPRT）。リフレッシュレートを上げるか、対応している場合は黒挿入（バックライトストロボ）を試してください。",
          "周波数によって見え方がバラつく：リフレッシュレートに依存したオーバードライブ設計（VRR時の可変オーバードライブ不足）。低FPSでもハローが出ない一段階控えめな設定を選びます。",
          "滑らかでなくコマ飛びやカクつきを感じる：パネルの応答速度ではなく、GPUの描画配信、垂直同期、ブラウザ性能を疑ってください。[トラブルシューティングガイド](/knowledge-base/troubleshooting)を参照してください。"
        ],
        "bullets": [
          "黒い尾引き → 暗部遷移の遅れ；適度なオーバードライブを試し室温を確認。",
          "光るハロー → オーバードライブ過多；OSDのオーバードライブを一段階下げる。",
          "全体的なボケ → サンプル＆ホールド眼球追従残像（MPRT）；リフレッシュレートを上げる。",
          "低FPS時のみハロー → VRR時の固定オーバードライブ；低Hzでも破綻しない設定を選択。",
          "カクつく動作 → フレーム配信や同期の問題；[トラブルシューティングガイド](/knowledge-base/troubleshooting)を参照。"
        ]
      }
    ],
    "faq": [
      {
        "question": "なぜVAモニターはIPSやTNよりも暗部スミアリングが目立つのですか？",
        "answer": "VAピクセルは非通電時に液晶分子を垂直にして光を強く遮断するため高いコントラスト比を誇ります。しかし、ニアブラック間の遷移は微小な電圧差で行われるため分子の回転が物理的に遅延しやすくなります。この度合いはパネル世代やファームウェア、オーバードライブ、温度によって左右されます。"
      },
      {
        "question": "明るいまたは反転した「コロナ」（オーバーシュート / 逆ゴースト）の原因は何ですか？",
        "answer": "オーバーシュートは、モニターが応答速度を早めようとして過大な電圧パルスを液晶にかけることで発生します。液晶分子が目標輝度でピタリと止まらず行き過ぎてしまうため、動く物体の輪郭に白く浮き上がるハローが生じます。"
      },
      {
        "question": "モニターのオーバードライブは常に最高レベルにするべきですか？",
        "answer": "いいえ。「Extreme」などの最高設定はほぼ例外なく深刻なオーバーシュート（逆ゴースト）を引き起こします。最適な設定は製品ごとに異なり、通常の尾引きを減らしつつ目障りなハローを出さないバランスを見つける必要があります。"
      },
      {
        "question": "VRRゲームでフレームレートが落ちた際に光るハローが現れるのはなぜですか？",
        "answer": "低リフレッシュレート（例：60Hz）では1フレームの表示時間が長く（165Hzの6msに対し16.7ms）なります。モニターが可変オーバードライブを備えていない場合、165Hz向けの高電圧パルスがそのまま印加され、60Hz時に大きなオーバーシュートを招きます。"
      },
      {
        "question": "室温が低いとモニターのゴーストが悪化することはありますか？",
        "answer": "はい。液晶材料は液体中に存在するため、低温環境では粘性が増して分子の動きが鈍くなります。寒い部屋で使い始めた直後は応答が鈍く見えることがありますが、内部が温まるにつれて通常性能へと復帰します。"
      },
      {
        "question": "Screen Testerでモニターのミリ秒単位の応答速度を測定できますか？",
        "answer": "測定できません。Webブラウザはハードウェアのフォトダイオードやオシロスコープにアクセスできません。Screen Testerは尾引きやハローを視覚的に観察・比較するためのツールであり、認定されたミリ秒計測には専用の測定器具が必要です。"
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
    "title": "画面のテアリングとV-Sync技術",
    "subtitle": "画像の水平断裂、バッファ切り替え、Adaptive Sync、G-Sync、FreeSync、入力遅延。",
    "description": "画面の水平断裂（テアリング）の発生原因、V-SyncやVRRによる防止策、入力遅延への影響を解説します。",
    "directAnswer": "テアリングは、モニターの走査中にグラフィックカードがフレームバッファを更新することで、上下で異なる画像が描画される現象です。",
    "whyItMatters": "テアリングは視覚的な没入感を損ないます。従来のV-Syncはテアリングを防ぎますが、操作の遅延やカクつきを生じさせます。",
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
    "primarySearchIntent": "テアリング 画面のズレ vsync gsync freesync vrr 入力遅延",
    "readingTimeMinutes": 5
  },
  {
    "slug": "text-clarity-and-subpixel-rendering",
    "category": "display-problems",
    "title": "文字の鮮明さ、サブピクセル配列、フォントレンダリング",
    "subtitle": "標準RGB、BGR、QD-OLEDの三角形配列、ClearType、文字の色滲み現象。",
    "description": "文字がぼやけたり輪郭に色滲みが生じる理由、サブピクセル幾何構造の影響、フォント描画の最適化方法を解説します。",
    "directAnswer": "テキストの鮮明さはピクセル密度（PPI）、フォントのアンチエイリアス、および各ピクセル内のサブピクセル物理配列に依存します。",
    "whyItMatters": "BGR配列やQD-OLED三角配列のパネルでは、OSが標準のRGB配列を前提としている場合に文字の輪郭に赤や青の色滲みが発生します。",
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
    "primarySearchIntent": "文字の滲み テキスト鮮明さ サブピクセル rgb bgr cleartype",
    "readingTimeMinutes": 6
  },
  {
    "slug": "oled-burn-in-and-image-retention",
    "category": "display-problems",
    "title": "OLEDのABL、ピクセルシフト、および焼き付き防止",
    "subtitle": "自動輝度制限（ABL）、ウィンドウサイズによる輝度変動、ピクセルオービティング、および静止画保護機能。",
    "description": "OLEDの自動輝度制限（ABL）がウィンドウサイズに応じてどのように動作するか、ピクセルシフトが発生する理由、および安全な目視点検方法を解説します。",
    "directAnswer": "OLEDの自動輝度制限（ABL）は、画面全体の平均輝度レベル（APL）に応じて全体の明るさを制御し、消費電力と発熱を安全域に抑える内部保護機構です。同時に、ピクセルシフト（ピクセルオービティング）は画面全体の表示位置を数ピクセル単位で定期的に移動させ、静止した高コントラストのエッジによる負荷を近隣のサブピクセルへ分散させます。",
    "whyItMatters": "OLEDピクセルは自発光の有機ダイオードであるため、累積的な発熱と電流負荷を管理することがパネル寿命の維持に不可欠です。ABLの挙動を知らないと、ウィンドウ拡大時の輝度低下を故障と誤認したり、ピクセルシフトによるわずかな移動を画面の揺れと錯覚しがちです。これらの保護機構を正しく理解することで、適切なOSD設定を選択し、正常な保護動作と実際の不具合を正確に見分けることができます。",
    "whatToLookFor": [
      "白い書類やブラウザウィンドウを小さめの枠から最大化・全画面にした際に画面全体がスッと暗くなる現象（標準的な自動輝度制限 ABL）",
      "街灯やネオンサインなどの極小エリアのハイライトが、大面積の白画面よりも格段に明るく眩しく表示される挙動",
      "デスクトップ画面全体が数ピクセル単位で周期的に移動し、ときおりベゼル沿いに極細の非発光ラインが現れる挙動（ピクセルシフト / オービティング）",
      "静止したタスクバーや一時停止した動画などを数分間放置した際に、画面が段階的におだやかに減光する現象（ASBL / 静止画保護）",
      "ウィンドウを閉じた後も輪郭が薄く残るが、動的な動画を全画面再生すると自然に消失する影（一時的なイメージリテンション）",
      "パネルのリフレッシュメンテナンスを実行した後も、単色のグレーやカラー画面上で特定の輪郭が消えずに残り続ける症状（恒久的な焼き付き）"
    ],
    "howToTest": [
      "Screen Testerの[輝度テスト](/tests/brightness-test)を開き、ブラウザウィンドウを小型から全画面へ拡大しながら輝度の変化を目視で観察します。",
      "[HDRテスト](/tests/hdr-test)を実行し、高輝度なHDRテストパターンで小さなハイライトと大面積の白表示との挙動差を確認します。",
      "[ユニフォミティテスト](/tests/uniformity-test)で5%、20%、50%、100%の均一なグレー画面を表示し、残像の影や輝度ムラがないか点検します。",
      "[ニアブラックテスト](/tests/near-black-test)で純黒の直上にある最暗部ステップ（1〜16）を表示し、黒つぶれなく階調が分離しているか確認します。",
      "[グラデーション・バンディングテスト](/tests/gradient-banding-test)で階調の変化が滑らかか、不自然な縞模様（トーンジャンプ）がないか確認します。",
      "[テキスト鮮明度テスト](/tests/text-clarity-test)で明暗両モードの文字フォントを表示し、サブピクセル配列による色にじみを点検します。",
      "[ディスプレイ情報](/tests/display-info)でブラウザAPIが認識している色深度やHDR対応状況を確認します。",
      "お使いのモニターに輝度を一定に保つ機能があるかどうか、[モニターOSD設定ガイド](/guides/monitor-osd-settings-explained)を参照してください。"
    ],
    "whatScreenTesterCanObserve": [
      "白いテスト領域の拡大に伴って人間の眼が知覚する相対的な明るさの変化の目視確認",
      "残像の有無を確認するための全画面5%、20%、50%、100%均一グレーおよび原色パターンの表示",
      "シャドウディテールを検証するための極低輝度ニアブラック階調（ステップ1〜16）の描画",
      "Web APIを通じてブラウザが取得した色域、色深度、およびHDRメディアクエリ情報",
      "高コントラストな文字パターンの輪郭におけるサブピクセル色にじみの目視確認"
    ],
    "whatScreenTesterCannotDetermine": [
      "フォトダイオードを用いて校正されたカンデラ毎平方メートル（cd/m²またはnits）単位の絶対輝度測定",
      "内部電源ユニットの消費電力ワット数、駆動電流値、またはパネル温度センサーの内部データ",
      "メーカー出荷時にファームウェアへ書き込まれた正確なABL作動閾値や制限LUTカーブ",
      "有機EL発光素子の残存寿命、劣化率パーセンテージ、または将来の焼き付き発生確率",
      "内部のリフレッシュサイクル実行履歴、診断カウンター、または正確なピクセルシフト座標値"
    ],
    "commonCauses": [
      "平均輝度レベル（APL）の高い画面が表示され、電源回路と熱上昇を保護するためにABLが作動している状態",
      "静止境界による局所的な素子劣化を防ぐため、バックグラウンドでピクセルシフト（オービティング）が動作している状態",
      "静止した書類やウェブページを長時間表示したことで、ファームウェアの自動静止画減光（ASBL）が作動した状態",
      "均一輝度モードではなく、小面積のピーク輝度を極大化するアグレッシブなHDR設定を選択している状態",
      "タスクバーや固定UIなどの高コントラストな静止要素を高輝度設定のまま何時間も固定表示している状態",
      "電源タップのスイッチでモニターの主電源を直接遮断したため、待機時の自動リフレッシュ機能が中断された状態"
    ],
    "whatToDoNext": [
      "文字入力や事務作業でウィンドウ移動時の明るさ変動が気になる場合は、OSDで「均一輝度（Uniform Brightness）」設定をお試しください。",
      "ピクセルシフト、ロゴ輝度制限、スタンバイ時の自動メンテナンスなど、メーカー標準の保護機能は常に有効に保ってください。",
      "OSの設定でタスクバーの自動非表示を有効化し、適切な画面オフタイマー（5〜10分程度）を設定してください。",
      "静止画作業の後に薄い影が残った場合は、全画面動画をしばらく再生するか、モニターをスタンバイ状態にしてリフレッシュを実行させてください。",
      "明るさの変化が不安定だと感じる場合は、[モニターOSD設定ガイド](/guides/monitor-osd-settings-explained)および[トラブルシューティングガイド](/knowledge-base/troubleshooting)をご確認ください。"
    ],
    "sections": [
      {
        "title": "OLEDの自動輝度制限（ABL）の仕組みと目的",
        "content": [
          "有機EL（OLED）ディスプレイは、すべてのサブピクセルが自ら光を放つ自発光構造を備えており、従来の液晶パネルとは動作原理が大きく異なります。この構造では、画面の一部分だけを光らせる際の消費電力はごくわずかですが、画面全体を同時に最高輝度で光らせると膨大な電流が必要となり、薄い有機発光層の内部に強い熱が蓄積します。",
          "回路の過負荷や過熱によるパネルの早期劣化を防ぎ、安全な動作を維持するために、各メーカーは自動輝度制限（Automatic Brightness Limiting、通称ABL）を組み込んでいます。ABLは画面全体の平均輝度レベル（APL）をリアルタイムに監視し、白い面積が広がるにつれて全体の最大輝度をおだやかに抑制する制御ループです。",
          "この制限動作はすべてのOLEDモニターで均一ではありません。制限が開始される面積比率、減光カーブの緩やかさ、全画面時の輝度は、パネル構造（WOLED、QD-OLED、AMOLED）、世代、放熱板の設計、および選択中の画面プリセットによって大きく異なります。全機種共通の単一のABLカーブは存在しません。"
        ],
        "bullets": [
          "自発光ピクセルは点灯数と明るさに応じて比例的に電力と熱を発生させます。",
          "ABLは平均輝度（APL）を常時計算し、過熱防止のため白い面積の拡大に合わせて輝度を抑えます。",
          "パネルの種類（WOLED対QD-OLED）、冷却構造、ファームウェア設計により挙動は大きく異なります。",
          "ABLはパネルを保護するための意図的な設計であり、バックライトの不具合や電源不良ではありません。"
        ]
      },
      {
        "title": "コンテンツやウィンドウサイズによって明るさが変わる理由",
        "content": [
          "OLEDモニターを使い始めたユーザーが最初に戸惑うのが、日常のデスクトップ操作中に明るさが自然と変化する点です。白い背景のブラウザを小さく開いているときは画面全体のAPLが低いため、発熱制限に余裕があり、そのウィンドウ内を高い輝度で明るく表示できます。しかしそのウィンドウを全画面へ最大化するとAPLが急激に跳ね上がり、ABLが作動して画面全体の輝度を一段階落とします。",
          "この特性により、表示内容による見え方の違いが生まれます。暗い背景に現れるネオンサインや花火などの小さなハイライトは、電力を集中できるため非常に鮮烈に輝きます。一方で、全画面の白いオフィス文書や雪景色は最大のAPLとなるため、最も強い減光がかかり、落ち着いた明るさに調整されます。",
          "また、HDRモードとSDRモードでも挙動が異なります。HDRではピークの眩しさを際立たせる設計のため大面積での減光が目立ちやすくなります。これに対しSDR環境では、多くの最新モニターに「均一輝度（Uniform Brightness）」という機能が用意されており、最大輝度をあらかじめ一定の低めに制限することで、ウィンドウサイズを変えても明るさが一切変動しない快適な作業環境を作ることができます。"
        ],
        "bullets": [
          "小さな白いウィンドウはAPLが低いため高輝度を維持し、鮮明に見えます。",
          "全画面への最大化に伴いAPLが跳ね上がり、ABLの制御によって輝度が控えめに抑制されます。",
          "HDRモードはピークの輝きを強調する反面、広い面積での減光幅が大きくなる傾向があります。",
          "SDRモードでは「均一輝度」オプションにより、ウィンドウ伸縮時の明るさ変化を完全に抑えられます。"
        ]
      },
      {
        "title": "ABLを目視で確認する安全な手順とブラウザの限界",
        "content": [
          "特別な測定ソフトを使わなくても、日常のブラウザ操作でモニターのABL動作を安全に観察できます。デスクトップ背景を黒かニュートラルなダークグレーに設定し、白い無地ページまたは[輝度テスト](/tests/brightness-test)を開き、画面の4分の1サイズから全画面へとウィンドウを徐々に広げてみてください。広がるにつれて白画面の明るさがどのように推移するかを観察します。",
          "続いて[HDRテスト](/tests/hdr-test)を開き、HDR環境下で小さな輝きと全面表示とで光り方にどのような違いがあるかを確認します。これらをSDRとHDRの両方で、またモニターの均一輝度モードのオン・オフを切り替えて比較します。",
          "この点検を行うにあたっては、Webツールの能力範囲を正しく認識することが重要です。Screen Testerは目視比較のための幾何学パターンを正確に描画しますが、ブラウザから照度計や比色計などの物理プローブにアクセスすることは不可能です。すべての評価はユーザーの視覚とAPI仕様に基づくものであり、nits単位の絶対測定値ではありません。"
        ],
        "bullets": [
          "手順1: 暗い背景上で[輝度テスト](/tests/brightness-test)を小さめのウィンドウで開く。",
          "手順2: ウィンドウを徐々に広げ、どの段階でどのように輝度が減光するかを目視する。",
          "手順3: [HDRテスト](/tests/hdr-test)を用い、SDRとHDRでの輝度制御カーブの違いを見比べる。",
          "測定の限界: Webブラウザは物理的なnits（カンデラ）や実消費電力を計測することはできません。"
        ]
      },
      {
        "title": "ピクセルシフト（オービティング）：意図的な画面移動保護",
        "content": [
          "ピクセルシフト（ピクセルオービティング、スクリーンシフトとも呼ばれる）は、現代のOLEDモニターやテレビに標準搭載されている最も基本的なハードウェア保護技術です。ディスプレイ内部のスケーラーが、画面全体の表示位置を数時間かけて縦横に数ピクセルずつゆっくりとずらし続けます。",
          "この機能の技術的な目的は、アプリケーションのウィンドウ枠、タスクバーの境界線、ゲームのHUD（体力バーなど）といった高コントラストの静止したエッジが、全く同一のサブピクセルを連続して刺激し続けるのを防ぐことです。表示位置をごくわずかに巡回させることで、有機ダイオードの負荷が周囲のピクセルへ広く分散され、局所的な劣化を大幅に遅らせることができます。",
          "この移動は映像鑑賞の邪魔にならないよう極めてゆっくりと実行されます。しかし静止画の作業に集中していると、文字の位置がわずかにずれたように見えたり、画面の左右どちらかの端に細い黒い隙間が一時的に生じることがあります。これは保護機能が正常に機能している証拠であり、画面の揺れやケーブルの接触不良ではありません。"
        ],
        "bullets": [
          "ピクセルシフトは定期的に画面全体の表示座標を縦横へ数ピクセルずらします。",
          "固定された境界線を移動させることで、特定の有機EL素子だけが集中的に劣化するのを防ぎます。",
          "オービティングの周期によって、画面端に極細の非表示マージンが一時的に見えることがあります。",
          "このわずかな移動は設計された正常な保護機能であり、画面の故障や不具合ではありません。"
        ]
      },
      {
        "title": "静止画保護機能：4つの独立した仕組みを見分ける",
        "content": [
          "有機発光素子を保護するために複数の機能が連動して動作していますが、これらは混同されがちです。適切な点検のためには、以下の4つの仕組みを明確に区別して理解する必要があります：",
          "1. ピクセルシフト（Pixel Orbiting）：画面を使用している最中に、表示位置をミリ単位で微細に巡回させ続ける幾何学的な保護。",
          "2. 静止画自動減光（ASBL / TPC / ロゴ検出）：映像信号内に動きのない要素（テレビの局ロゴ、固定されたタスクバー、停止した動画）を監視するファームウェア機能。数分間動きがないと、熱の上昇を防ぐために画面全体または該当エリアの明るさを自動的に落とします。",
          "3. OSの画面オフおよびスクリーンセーバー：WindowsやmacOSが入力の途絶を検知して信号を切り、画面を真っ暗にして休止させるソフトウェア側の省電力機能。",
          "4. パネルメンテナンスサイクル（ピクセルリフレッシュ / 補正）：モニターがスタンバイに入った際に自動で実行される内部調整。数時間使用するごとに素子の電気抵抗を測って印加電圧を揃えるショートサイクルと、数百時間ごとに行われる深層補正があります。",
          "これらの調整方針は機器によって異なり、テレビは映画向けに強い減光をかける傾向がある一方、PC用ゲーミングモニターは作業に配慮してOSDから減光強度を選べる製品が多く見られます。"
        ],
        "bullets": [
          "ピクセルオービティング: 使用中に画面を微動させ、固定エッジの素子疲労を分散。",
          "静止画減光（ASBL）: 動きのない画面やロゴを検知した際に明るさを自動抑制。",
          "OSの休止設定: キーボード操作のない放置時に画面をスリープさせる基本設定。",
          "待機時リフレッシュ: スタンバイ中に素子の駆動電圧を自動校正する極めて重要な機能。"
        ]
      },
      {
        "title": "一時的なイメージリテンションと恒久的な焼き付きの違い",
        "content": [
          "OLEDにおいて極めて重要なのが、「一時的なイメージリテンション（残像）」と「恒久的な焼き付き（バーンイン）」の明確な違いです。イメージリテンションは、コントラストの強い絵柄を長く表示した後に、駆動用トランジスタ（TFT）や発光層に微弱な電荷が一時的に留まる電気的な現象です。単色のグレー画面に戻した際にうっすらと直前の輪郭が見えることがありますが、動画を流したりスタンバイ時の自動メンテナンスを経ることで完全に元の均一な状態へ戻ります。",
          "一方の恒久的な焼き付きは、有機発光材料そのものが物理的・化学的に不可逆な劣化を起こした状態です。特定のサブピクセルだけが非常に明るい状態で何千時間も点灯し続けた場合、その部分の素子は発光効率を永久に失います。その結果、どの色の全画面を表示しても暗い影として輪郭が残り続けます。",
          "近年のOLEDパネルは、多層発光素材、グラフェンや大型アルミ放熱板、リアルタイム熱センサー、高度な均一化アルゴリズムを導入しており、通常のゲームや動画、PC利用で恒久的な焼き付きが起きるリスクは格段に低下しています。Webブラウザから素子の寿命を直接調べることはできませんが、Screen Testerのパターンを使って現在の均一性を安全に点検できます。"
        ],
        "bullets": [
          "イメージリテンション: 一時的な電荷の滞留；動画の再生やスタンバイ補正で自然に解消。",
          "恒久的焼き付き: 何千時間もの固定表示による有機EL材料の不可逆的な発光効率の低下。",
          "最新の保護設計: 優れた放熱構造と自動補正により、近年のパネルでは焼き付きリスクが大幅低減。",
          "ブラウザ点検の範囲: Webツールで素子の残存寿命や劣化率を数値測定することはできません。"
        ]
      },
      {
        "title": "Screen Testerを活用したOLED特性の点検方法",
        "content": [
          "Screen Testerには、OLEDディスプレイの光学的特性を目視でチェックするための専門ツールが揃っています。各ツールの役割を正しく理解することで、適切な点検が行えます：",
          "[HDRテスト](/tests/hdr-test): ブラウザのHDRトーンマッピングや白飛びの具合を目視で評価します。正確な最大nits数を物理測定するものではありません。",
          "[ユニフォミティテスト](/tests/uniformity-test): 全画面の5%、20%、50%、100%グレーおよび原色画面を表示し、残像の影や画面全体の輝度ムラを目視確認します。実験室のDelta-E色差マップを作成するものではありません。",
          "[ニアブラックテスト](/tests/near-black-test): 純黒のすぐ上の最暗部階調（ステップ1〜16）を段階表示し、暗部の階調が黒につぶれず滑らかに見えているかを点検します。パネルの駆動電圧を測るものではありません。",
          "[グラデーション・バンディングテスト](/tests/gradient-banding-test): 8ビットおよび10ビットのカラーグラデーションを表示し、不自然な段差やディザリング破綻がないか確認します。内部処理回路のビット深度を調べるものではありません。",
          "[輝度テスト](/tests/brightness-test): ウィンドウサイズの変化に伴う知覚的な明るさの変化を比較し、ABLの効き始めと強さを視覚的に把握します。絶対的なcd/m²を測るものではありません。",
          "[テキスト鮮明度テスト](/tests/text-clarity-test): 白背景と黒背景で文字フォントを表示し、特殊なサブピクセル配列（WOLEDやQD-OLED）による文字のにじみ具合を確認します。OSの文字レンダラーを変更するものではありません。",
          "[ディスプレイ情報](/tests/display-info): ブラウザAPIが取得した解像度、色深度、HDR対応状況を整理して表示します。モニター内部の制御ファームウェアを読み取るものではありません。"
        ],
        "bullets": [
          "[HDRテスト](/tests/hdr-test): HDRの階調表現を目視点検；絶対nits値は測定不可。",
          "[ユニフォミティテスト](/tests/uniformity-test): 5%〜50%グレーで残像の影を露出；Delta-Eは算出不可。",
          "[ニアブラックテスト](/tests/near-black-test): 最暗部の階調分離を確認；ブラック電圧は測定不可。",
          "[グラデーション・バンディングテスト](/tests/gradient-banding-test): 10ビット階調の滑らかさを点検。",
          "[輝度テスト](/tests/brightness-test): ウィンドウサイズによるABL減光を観察；cd/m²は測定不可。",
          "[テキスト鮮明度テスト](/tests/text-clarity-test): サブピクセル配置によるフォントのにじみを点検。",
          "[ディスプレイ情報](/tests/display-info): ブラウザが認識している基本性能を表示。"
        ]
      },
      {
        "title": "目視結果の正しい判断基準：正常な挙動と注意すべき状態",
        "content": [
          "OLEDの点検時は、曖昧なスコアではなく明確な技術基準に沿って状態を分類します：",
          "1. 正常な状態（Looks Normal）：白いウィンドウを全画面にした際に明るさが滑らかに一段落ちる（正常なABL動作）。長時間使用するうちに表示位置が数ピクセル移動し、ベゼル沿いに極細の枠が見えることがある（正常なピクセルシフト）。静止画面の後に残った薄い影が、動画の再生やスタンバイ時の自動メンテナンスで完全に消える（無害な一時的リテンション）。",
          "2. 注意が必要な状態（Needs Attention）：通常の文書作成やブラウジング中に画面が過度に暗くなり、文字を読むのが困難になる（静止画減光ASBLの効きすぎ、環境光センサーの干渉、またはHDR設定のミスマッチを確認）。複数回のリフレッシュを実行しても、単色グレーやカラー画面上で特定のシルエットやロゴが完全に消えない（素子の偏摩耗・焼き付きの疑い）。",
          "3. 判断保留（Unsure）：ゲーム中などに明るさが頻繁に激しく変動する。ゲーム自体のトーンマッピング、WindowsのAuto HDR、またはモニターのABLが重なっている可能性があります。ブラウザツールから内部回路の限界を測定することはできないため、モニターの取扱説明書や最新ファームウェアのリリースノートをご確認ください。"
        ],
        "bullets": [
          "正常: 全画面時のABL減光、緩やかなピクセルシフト、動画で消える一時的残像。",
          "注意: デスクトップ作業での極端な減光、または単色画面で完全に消えない固定の影。",
          "保留: ゲーム中の不規則な明暗変化；ゲーム側やWindowsのHDR処理との兼ね合いを確認。",
          "診断の限界: WebツールはABLカーブが仕様の許容範囲内にあるかを判定することはできません。"
        ]
      },
      {
        "title": "実用的なOLED点検・保護チェックリスト",
        "content": [
          "OLEDディスプレイを最適な状態で長く使い続けるための10項目点検チェックリストです：",
          "1. SDRとHDRの使い分け: 日常の文書作成には落ち着いた輝度のSDRを使用し、HDRは対応ゲームや映画のみに限定して、不要な全画面ABL減光を避ける。",
          "2. ウィンドウサイズ点検: [輝度テスト](/tests/brightness-test)で白画面を拡大し、お使いのモニターのABL特性を把握する。",
          "3. 均一輝度機能の確認: モニターのOSDに「均一輝度」設定がある場合、作業時のチラつき防止に役立つか試す。",
          "4. ピクセルシフトの有効化: モニターのメンテナンスメニューでピクセルシフトがオンになっていることを確認する。",
          "5. ロゴ検出の設定: 静止ロゴ減光を中程度に設定し、ゲームHUDや固定UIを保護する。",
          "6. シャドウディテールの点検: [ニアブラックテスト](/tests/near-black-test)で暗部階調が黒つぶれしていないか確認する。",
          "7. グレー均一性の定期点検: 暗い部屋で[ユニフォミティテスト](/tests/uniformity-test)の5%および50%グレーを確認し、影の有無を点検する。",
          "8. カラー階調の確認: [グラデーション・バンディングテスト](/tests/gradient-banding-test)で色段差のない滑らかな表示を確認する。",
          "9. 文字の視認性評価: [テキスト鮮明度テスト](/tests/text-clarity-test)で明暗両モードでのフォントのにじみを確認する。",
          "10. 待機時電源の維持: 使用後すぐに電源タップでコンセントを切らず、スタンバイ状態にして自動メンテナンスを完了させる。"
        ],
        "bullets": [
          "点検1: デスクトップ作業はSDR、映像やゲームはHDRと適切に切り替える。",
          "点検2: [輝度テスト](/tests/brightness-test)で白画面拡大時のABL挙動を把握する。",
          "点検3: 画面のチラつきが気になる場合はOSDの均一輝度機能を試す。",
          "点検4: ピクセルシフトとロゴ保護が有効になっていることを確認する。",
          "点検5: [ニアブラックテスト](/tests/near-black-test)で暗部階調の分離度を確認する。",
          "点検6: [ユニフォミティテスト](/tests/uniformity-test)で全画面グレーの均一性を点検する。",
          "点検7: [グラデーション・バンディングテスト](/tests/gradient-banding-test)で色の連続性を確認する。",
          "点検8: [テキスト鮮明度テスト](/tests/text-clarity-test)で文字フォントの可読性を確認する。",
          "点検9: [ディスプレイ情報](/tests/display-info)で出力設定を照合する。",
          "点検10: 自動メンテナンスのため、使用後も主電源は切らずスタンバイを保つ。"
        ]
      },
      {
        "title": "トラブルシューティングと次のステップ",
        "content": [
          "OLEDモニターの明るさや表示に関して疑問が生じた場合は、以下の手順で原因を切り分けてください：",
          "文書を読んでいる最中に画面が暗くなる: 長時間の静止画表示により、静止画減光（ASBL）が作動した可能性が高いです。マウスを動かすかウィンドウを切り替えてみてください。感度を調整できるかどうか、[モニターOSD設定ガイド](/guides/monitor-osd-settings-explained)をご確認ください。",
          "ウィンドウ伸縮時の明るさ変動が煩わしい: OSDで「均一輝度」を有効にするか、SDR時の基本輝度を少し下げて、全画面時でもABL閾値を超えないように調整してください。",
          "画面位置がわずかにずれる・端に黒い枠がある: ピクセルシフトが動作している証拠です。画面の保護が正常に行われている証拠であり、故障ではありません。",
          "薄い残像が消えない: 動画を10〜15分再生しても消えない場合は、モニターの電源ボタンを押してスタンバイ状態にし、自動リフレッシュを実行させてください。",
          "ケーブル接続、色合いのずれ、電源管理に関する詳しい解説は、[トラブルシューティングガイド](/knowledge-base/troubleshooting)をご覧ください。"
        ],
        "bullets": [
          "文章閲覧中の減光 → ASBLの作動；マウス操作やOSDのロゴ設定を確認。",
          "サイズ変更時の明暗変化 → ABLの正常動作；OSDの均一輝度を試す。",
          "表示位置の微小な移動 → ピクセルシフト作動中；正常な保護機能。",
          "消えにくい残像 → モニターをスタンバイにして自動リフレッシュを実行。",
          "総合的な不具合診断 → [トラブルシューティングガイド](/knowledge-base/troubleshooting)を参照。"
        ]
      }
    ],
    "faq": [
      {
        "question": "白いブラウザを全画面にするとOLEDモニターが暗くなるのはなぜですか？",
        "answer": "これは自動輝度制限（ABL）による正常な動作です。白いウィンドウが画面全体に広がると平均輝度レベル（APL）が急増します。過剰な電力消費と発熱を防ぎパネルを保護するため、モニターが自動的に全体の明るさを控えめに調整します。"
      },
      {
        "question": "OLEDモニターのデスクトップ画面が少し横にずれるのは正常ですか？",
        "answer": "正常です。これはピクセルシフト（ピクセルオービティング）と呼ばれる保護機能です。静止したウィンドウの境界線が特定の素子だけを集中的に劣化させるのを防ぐため、表示位置を定期的に数ピクセルずつゆっくり移動させています。"
      },
      {
        "question": "作業中にOLEDモニターの明るさが頻繁に変わるのを防ぐ方法はありますか？",
        "answer": "SDRモードで控えめな明るさに設定して使用するか、モニターに「均一輝度（Uniform Brightness）」機能が搭載されている場合はOSDで有効にしてください。これによりウィンドウサイズにかかわらず輝度が一定に維持されます。"
      },
      {
        "question": "一時的なイメージリテンションと恒久的な焼き付きの違いは何ですか？",
        "answer": "リテンションは回路内に一時的に電荷が溜まる現象で、動画再生やスタンバイ時のメンテナンスで完全に消去されます。焼き付きは、何千時間もの固定表示によって有機EL素子そのものが物理的に劣化し、恒久的に暗い影が残る現象です。"
      },
      {
        "question": "OLEDモニターの使用後すぐにコンセントを抜いてはいけないのはなぜですか？",
        "answer": "OLEDモニターは数時間使用した後、スタンバイ状態の間にピクセルの駆動電圧を自動校正するメンテナンスサイクルを実行します。コンセントから直接電源を切ると、この重要な保護動作が中断されてしまいます。"
      },
      {
        "question": "Screen Testerで正確なピークnitsや焼き付きまでの寿命を測定できますか？",
        "answer": "測定できません。Webブラウザは測定機器やパネル内部の劣化カウンターに直接接続することはできません。Screen Testerは目視点検用のテストパターンを提供するものであり、正確な測定には専門の実験室機器が必要です。"
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
    "title": "テレビのオーバースキャンとドットバイドット（1:1）表示",
    "subtitle": "画面端のトリミング、HDMIスケーリング、Just Scan、文字のぼやけ解消。",
    "description": "テレビのオーバースキャンの原因、PC接続時にタスクバーが切れたり文字がぼやける問題、およびドットバイドット設定を解説します。",
    "directAnswer": "オーバースキャンは画面外縁の2%〜5%を切り落として引き伸ばす旧来のテレビ処理であり、PC画面の端が欠ける原因になります。",
    "whyItMatters": "オーバースキャンが有効なテレビにPCを繋ぐと、文字が引き伸ばされて補間され、本来のシャープさが大きく失われます。",
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
    "primarySearchIntent": "テレビ オーバースキャン 画面端 切れる ドットバイドット 1対1表示",
    "readingTimeMinutes": 5
  },
  {
    "slug": "aspect-ratio-and-scaling-artifacts",
    "category": "tv-and-display-setup",
    "title": "アスペクト比、レターボックス、非整数スケーリングの歪み",
    "subtitle": "16:9、16:10、21:9ウルトラワイド、幾何学的歪み、GPU対ディスプレイのスケーリング。",
    "description": "画面比率の仕組み、非ネイティブ解像度が滲む原因、整数スケーリングによるシャープな拡大表示を解説します。",
    "directAnswer": "アスペクト比は画面の幅と高さの比率であり、誤った比率で拡大すると正円が楕円に歪んで表示されます。",
    "whyItMatters": "比率が狂うと人物の顔やグラフィックが不自然に引き伸ばされ、非整数スケーリングは文字や線の解像感をぼやけさせます。",
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
    "primarySearchIntent": "アスペクト比 画面比率 黒帯 レターボックス スケーリング 歪み",
    "readingTimeMinutes": 5
  },
  {
    "slug": "multi-touch-and-touchscreen-testing",
    "category": "device-and-input",
    "title": "マルチタッチおよびタッチスクリーンデジタイザの診断",
    "subtitle": "静電容量方式デジタイザ、ポインタイベント、複数接触点追跡、入力遅延。",
    "description": "タッチパネルが同時に指を認識する仕組み、navigator.maxTouchPointsの役割、タッチ無反応エリアの検出方法を解説します。",
    "directAnswer": "マルチタッチとは、画面上で複数の指の接触を同時に検出し、ピンチズームや回転などのジェスチャーを可能にする技術です。",
    "whyItMatters": "デジタイザの故障は反応しない死角や、触れていないのに勝手に反応するゴーストタッチを引き起こします。",
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
    "primarySearchIntent": "マルチタッチ タッチパネル テスト ゴーストタッチ 反応しない",
    "readingTimeMinutes": 5
  },
  {
    "slug": "webcam-diagnostics-and-privacy",
    "category": "device-and-input",
    "title": "Webカメラの診断、フレームレート、およびプライバシー検証",
    "subtitle": "WebRTC getUserMedia、解像度ネゴシエーション、露出によるFPS低下、ローカル検証。",
    "description": "ブラウザがカメラにアクセスする仕組み、暗所でのフレームレート低下原因、ローカル処理によるプライバシー保護を解説します。",
    "directAnswer": "Webカメラテストは、ブラウザ内のローカルWebRTCストリームを介して、実際の解像度、フレームレート、色再現性を安全に診断します。",
    "whyItMatters": "Webカメラは薄暗い部屋でフレームレートが半減したり画質が劣化しやすいため、事前の診断が円滑なビデオ会議を保証します。",
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
    "primarySearchIntent": "webカメラ テスト フレームレート fps 解像度 プライバシー 診断",
    "readingTimeMinutes": 5
  },
  {
    "slug": "audio-channel-testing-and-stereo-separation",
    "category": "device-and-input",
    "title": "オーディオチャンネル分離とステレオ定位テスト",
    "subtitle": "Web Audio API、ステレオパン、同相・逆相、周波数スイープ、音響特性。",
    "description": "左右のチャンネルが正常に分離されているか、逆相接続による打ち消しがないかをWeb Audio APIを用いて検証します。",
    "directAnswer": "ステレオオーディオテストは、左右のチャンネルが混信なく独立して再生され、位相の整合性が取れているかを確認します。",
    "whyItMatters": "左右が逆になっているとゲームや映像での音の方向感覚が狂い、逆相接続では人の声がこもって低音が消失します。",
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
    "primarySearchIntent": "オーディオ ステレオ テスト 左右 チャンネル分離 スピーカー 位相",
    "readingTimeMinutes": 5
  },
  {
    "slug": "mobile-motion-sensors-accelerometer-gyroscope",
    "category": "device-and-input",
    "title": "モバイルモーションセンサー：加速度センサーとジャイロスコープ",
    "subtitle": "DeviceMotionEvent、DeviceOrientationEvent、3軸ベクトル、権限サンドボックス。",
    "description": "モバイル端末が動きや傾きを検出する仕組み、ブラウザAPIの動作、セキュリティ制限について解説します。",
    "directAnswer": "加速度センサーは3軸（X・Y・Z）方向の直線加速度を測り、ジャイロスコープはそれらの軸周りの回転角速度を測定します。",
    "whyItMatters": "モーションセンサーはゲームやVR、手ブレ補正を支えており、センサー本体の故障と権限設定の不備を切り分けることができます。",
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
    "primarySearchIntent": "加速度センサー ジャイロスコープ モバイル モーション センサー テスト",
    "readingTimeMinutes": 5
  },
  {
    "slug": "what-browser-display-tests-can-and-cannot-measure",
    "category": "browser-and-testing",
    "title": "ブラウザベースの画面テストで測定できること・測定できないこと",
    "subtitle": "Web APIの機能限界、クライアント側の観測範囲、および物理測定の境界線。",
    "description": "ブラウザテストの技術的境界：ブラウザ上で数学的に検証できる項目と、物理的な光学測定機器が必要な項目の違いを明確にします。",
    "directAnswer": "ブラウザは正確な色データを描画しフレーム間隔を計測できますが、画面から放射される実光量、Delta E、物理応答速度は測れません。",
    "whyItMatters": "一部のサイトではブラウザだけで輝度や色精度が測れると誤認させています。正確な限界を知ることで正しい診断が行えます。",
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
    "primarySearchIntent": "ブラウザ ディスプレイ テスト 限界 測定できること ニト delta e",
    "readingTimeMinutes": 6
  },
  {
    "slug": "browser-compatibility-and-hardware-apis",
    "category": "browser-and-testing",
    "title": "ブラウザの互換性とハードウェアWeb API",
    "subtitle": "Chromium、Gecko、WebKitの各エンジンによるAPI実装差とセキュリティ権限。",
    "description": "主要ブラウザエンジンがディスプレイ、音声、センサーAPIをどのようにサポートしているか、権限の分離設計を解説します。",
    "directAnswer": "ブラウザ互換性とは、Blink、Gecko、WebKitなどの各描画エンジンが、ハードウェア連携規格をどれだけ忠実に実装しているかを示します。",
    "whyItMatters": "バイブレーションなどの機能はAndroid版Chromeでは動作しますが、iOS版Safariではセキュリティポリシーにより制限されます。",
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
    "primarySearchIntent": "ブラウザ 互換性 web api ハードウェア chromium webkit gecko",
    "readingTimeMinutes": 5
  },
  // New Feature Guide: Pixel Inversion, VCOM Calibration & Pixel Walk
  {
    "slug": "pixel-inversion-and-vcom",
    "category": "display-problems",
    "title": "ピクセル反転・VCOM電圧調整・ピクセルウォーク",
    "subtitle": "液晶の極性反転駆動、VCOM共通電極バランス、市松模様のチラツキ現象を理解する。",
    "description": "LCDの極性反転が液晶劣化を防ぐ仕組み、VCOMの不均衡によるチラツキやピクセルウォークの原因、表示検査手順を詳しく解説します。",
    "directAnswer": "ピクセル反転とは、直流電圧による液晶分子の恒久的な劣化を防ぐため、毎フレーム極性（+V / -V）を反転させるハードウェア技術です。",
    "whyItMatters": "工場出荷時のVCOM基準電圧がわずかにズレていると、正負の輝度が一致せず、高周波パターンで30Hz/60Hzの微細な振動や眼精疲労が発生します。",
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
    "title": "黒挿入・バックライトストロボ・ストロボクロストーク",
    "subtitle": "残像低減技術（ULMB、DyAc、ELMB）、ストロボ発光タイミング、二重像ゴーストの原理。",
    "description": "バックライトストロボとBFIが視線追従ブレを消す仕組み、画面上下で発生するクロストークの要因、位相調整方法を解説します。",
    "directAnswer": "バックライトストロボは、液晶分子の応答完了後にのみバックライトを一瞬パルス点灯させることで、ホールドボケを大幅に低減する機能です。",
    "whyItMatters": "液晶やOLEDは目の追従によりブレが生じます。ストロボはCRT並みの明瞭さを実現しますが、走査タイミングのズレにより二重像が発生します。",
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
    "title": "VRR輝度フリッカー・ガンマ変動・LFC遷移ショック",
    "subtitle": "G-SyncやFreeSyncでフレームレートが急変した際にOLEDやVAパネルが明滅する原因。",
    "description": "可変リフレッシュレート（VRR）動作時の暗部明滅とガンマ変動の原因、FPS変動がチラツキを引き起こす仕組みと安定化対策を解説します。",
    "directAnswer": "VRR輝度フリッカーは、フレーム保持時間の変化によってサブピクセルの蓄積電荷とガンマ特性が変動し、暗部が脈動する現象です。",
    "whyItMatters": "ロード画面や急激なFPS低下時に暗部が点滅し、没入感を損なうだけでなく強い眼精疲労の原因となります。",
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
    "title": "追尾カメラ（Pursuit Camera）同期と写真によるMPRT測定",
    "subtitle": "移動パターンにカメラを滑らかに同期させて撮影し、真の体感残像（MPRT）を捉える手法。",
    "description": "追尾カメラ写真の原理、固定カメラでは残像を測定できない理由、スマートフォンを用いた科学的なMPRT撮影手順を解説します。",
    "directAnswer": "追尾カメラは、人間の眼球追従運動と同じ速度でカメラを動かしながら露光することで、実際に目に見えている残像を捉える測定方法です。",
    "whyItMatters": "静止撮影ではフレームが重なるだけです。追尾撮影を行うことで、ピクセル応答（GtG）と表示ホールド時間（MPRT）を正確に分離・評価できます。",
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
    "title": "音声・映像リップシンク調整と遅延キャリブレーション",
    "subtitle": "映像処理遅延、サウンドバーのデコード遅延、Bluetoothコーデック遅延の正確な測定と補正。",
    "description": "音声と映像のタイミングがズレる要因、ミリ秒単位のスイープパターンを用いた測定方法、システム遅延の補正手順を解説します。",
    "directAnswer": "音画同期キャリブレーションは、視覚フラッシュと音響ビープ音を一致させ、表示処理や音声バッファの遅れを補正する作業です。",
    "whyItMatters": "HDR処理やアップスケーリングは映像を遅延させ、Bluetoothは音声を遅延させます。このズレが発話のリップシンク破綻を引き起こします。",
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
    "title": "ゲームパッド診断：スティックドリフト・真円度・デッドゾーン",
    "subtitle": "ポテンショメータの摩耗、ホールエフェクト磁気センサー、無操作時の座標ドリフトと設定。",
    "description": "コントローラーのスティックドリフトが発生する原因、Gamepad APIを用いたアナログ入力検査、デッドゾーン調整を解説します。",
    "directAnswer": "スティックドリフトとは、内部の炭素抵抗体が摩耗または汚損し、スティックに触れていない状態でも誤った入力が送信される現象です。",
    "whyItMatters": "エイムが狂ったり勝手にカメラが回転します。早期に診断することで、デッドゾーン調整、クリーニング、または保証交換が行えます。",
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
    "title": "ディスプレイ帯域幅・映像タイミング・ケーブル規格",
    "subtitle": "非圧縮データレート、VESA DSC視覚可逆圧縮、HDMIおよびDisplayPort規格の限界と計算。",
    "description": "映像帯域幅の計算式、VESA CVT-RBのブランキング時間、インターフェース限界、DSC圧縮が必要な条件を詳しく解説します。",
    "directAnswer": "ディスプレイ帯域幅とは、解像度、リフレッシュレート、色深度、彩度サンプリングに基づいて映像信号を伝送するために必要な伝送速度（Gbps）です。",
    "whyItMatters": "4K 240Hzなどの最新モニターは旧型ケーブルの帯域幅を容易に超え、ブラックアウトや色深度低下、接続切断の原因となります。",
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
    "title": "人間工学的適正視距離・視力・Retina PPD計算",
    "subtitle": "視野角あたりの画素密度（PPD）、視力1.0（20/20）限界値、THX/SMPTE推奨視野角。",
    "description": "モニターやTVの理想的な視聴距離、PPDの概念、画面の画素が判別できなくなるRetina境界の算出方法を解説します。",
    "directAnswer": "適正視距離とは、人間の限界解像力（60 PPD）と快適な人間工学的視野角を両立させ、画素の網目を見えなくする最適な配置距離です。",
    "whyItMatters": "近すぎると画素の格子が見え首に負担がかかり、遠すぎると没入感が損なわれ小さな文字が読みづらくなります。",
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
    "title": "デュアルモニター白色点一致とマルチディスプレイ色調整",
    "subtitle": "色温度、RGBゲイン調整、異種パネル間におけるメタメリズム不一致の視覚的解決。",
    "description": "同じ設定でも隣り合うモニターの白が異なる理由、メタメリズム障害の影響、手動での白色点マッチング手順を解説します。",
    "directAnswer": "白色点マッチングとは、基準となる白色画面を見比べながらRGBゲインを調整し、隣接するモニターの色温度と色合いを統一する手法です。",
    "whyItMatters": "片方が暖色（黄色系）、もう片方が寒色（青色系）に見えると作業集中力が阻害され、デザインや動画編集の精度に悪影響を与えます。",
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
    "title": "ディスプレイ検査証明書・欠陥ログ記録・初期不良保証エビデンス",
    "subtitle": "ドット抜け、輝点、バックライト漏れを座標付きで記録し、返品やRMA保証請求用の証明書を作成。",
    "description": "初期不良期間内の画面欠陥記録方法、ISO 9241-307のピクセル欠陥クラス、保証請求に有効な証明書の出力方法を解説します。",
    "directAnswer": "ディスプレイ検査レポートは、検出したドット抜け座標、輝度均一性メモ、ハードウェア情報を整理した正式な検査証明書です。",
    "whyItMatters": "販売店やメーカーは返品期間内に明確な証拠を求めます。正確な座標記録付きレポートにより、初期不良交換がスムーズに進行します。",
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
