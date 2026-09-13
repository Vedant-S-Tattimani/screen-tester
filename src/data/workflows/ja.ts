import { InspectionWorkflow } from "./types";

export const JA_INSPECTION_WORKFLOWS: InspectionWorkflow[] = [
  {
    "id": "general",
    "route": "/monitor-inspection/general",
    "title": "総合ディスプレイ点検",
    "shortDescription": "あらゆる画面に対応した必須の全項目ビジュアル診断。",
    "longDescription": "デスクトップモニター、ノートPC液晶、外付けディスプレイのドット抜け、色精度、輝度、コントラスト、均一性、リフレッシュレートを総合的かつバランス良く検証するために設計された基本診断手順です。",
    "inspectionTip": "点検を開始する前に、ディスプレイを推奨されるネイティブ解像度とスケーリング設定に合わせてください。",
    "browserLimitations": "ブラウザテストはクライアント側で描画されたテストパターンを検査するものであり、内部電源の安定性や物理的な端子の状態を直接測定することはできません。",
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
        "title": "解像度＆ディスプレイ情報",
        "description": "ネイティブ解像度、DPRスケーリング比率、表示パラメータを検証。"
      },
      {
        "title": "ドット抜け検出ツール",
        "description": "全画面単色表示を切り替え、黒点や輝点などの不良サブピクセルを特定。"
      },
      {
        "title": "画面の輝度均一性",
        "description": "中間グレーや単色フィールドで光ムラ、四隅の落ち込み、汚れ効果を点検。"
      },
      {
        "title": "ニアブラック階調表現",
        "description": "完全な漆黒に近い微小な暗部諧調の分離とシャドウディテールを検証。"
      },
      {
        "title": "グラデーション＆バンディング",
        "description": "黒から白への階調移行において、不自然な段差（トーンジャンプ）がないか確認。"
      },
      {
        "title": "文字鮮明度＆サブピクセル",
        "description": "フォントのアンチエイリアスとサブピクセル境界の鮮明さを複数サイズで判定。"
      },
      {
        "title": "スケーリング＆アスペクト比",
        "description": "正円および方眼グリッドを用いて幾何学的な歪みや引き伸ばしを検査。"
      },
      {
        "title": "残像感（ゴースト）＆応答性",
        "description": "高速移動する高コントラストブロックを目視し、ピクセル応答時間を判定。"
      },
      {
        "title": "リフレッシュレート＆フレーム計測",
        "description": "ブラウザのrequestAnimationFrame計測とパネルの公称レートを照合。"
      }
    ]
  },
  {
    "id": "used",
    "route": "/monitor-inspection/used",
    "title": "中古モニター点検",
    "shortDescription": "購入前や受取時に最適な、メモ記録とレポート出力付き10項目集中点検。",
    "longDescription": "中古品、展示品、リファービッシュ（整備済み）モニターの購入・受取時に特化した厳格な検査手順です。ハードウェア仕様、画素欠陥、バックライト劣化、発色、動的応答を体系的に網羅し、観察結果を直接レポートとして出力できます。",
    "inspectionTip": "中古ディスプレイを点検する際は輝度を100%に設定し、潜在的な焼き付き痕、LEDの不均一な経年劣化、枠の圧迫損傷を浮き彫りにしてください。",
    "browserLimitations": "総通電稼働時間や内部温度センサーのテレメトリを確認するには、モニター本体のボタンからメーカーのサービスメニューに入る必要があります。",
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
        "title": "1. ディスプレイ情報",
        "description": "ブラウザが認識する表示パラメータ、色深度、グラフィック機能を照会。"
      },
      {
        "title": "2. 解像度と表示領域",
        "description": "ネイティブ解像度、スケーリング倍率（DPR）、全表示領域を検証。"
      },
      {
        "title": "3. ドット抜け（黒点）",
        "description": "白および原色画面をスキャンして非発光の黒いサブピクセルを検出。"
      },
      {
        "title": "4. スタックピクセル（輝点）",
        "description": "暗い画面で常時点灯して消えない欠陥サブピクセルを精査。"
      },
      {
        "title": "5. 色再現性と均一性",
        "description": "RGB原色およびCMY二次色で色偏りや特定チャンネルの劣化がないか確認。"
      },
      {
        "title": "6. 輝度と暗部階調分離",
        "description": "バックライトが十分な明るさを発揮し、黒つぶれがないことを確認。"
      },
      {
        "title": "7. 画面全体の均一性",
        "description": "25%、50%、75%グレー画面でLEDの経年劣化、黄ばみ、周辺減光を点検。"
      },
      {
        "title": "8. バックライト漏れ・枠圧迫",
        "description": "暗室環境でベゼル周辺の物理圧迫痕や光漏れ（Bleed）を検査。"
      },
      {
        "title": "9. 残像・応答速度の劣化",
        "description": "スクロール時の残像尾引きやオーバードライブ動作の劣化を判定。"
      },
      {
        "title": "10. リフレッシュレート安定性",
        "description": "フレーム落ちや微小なカクつきなく公称レートで動作するか確認。"
      },
      {
        "title": "11. 外観・状態の点検メモ",
        "description": "外装の傷、ポートの認識状況、目視所見をレポートに記録。"
      },
      {
        "title": "12. 最終点検レポート出力",
        "description": "すべての確認結果をまとめた印刷・保存可能な診断書を作成。"
      }
    ]
  },
  {
    "id": "gaming",
    "route": "/monitor-inspection/gaming",
    "title": "ゲーミングディスプレイ点検",
    "shortDescription": "リフレッシュレート、残像、オーバードライブ、テアリング、黒にじみ、HDR、応答性を検証。",
    "longDescription": "高リフレッシュレート（120Hz、144Hz、240Hz、360Hz以上）ゲーミングモニター向けに最適化された専用手順です。同期の安定性、ゴースト、オーバードライブの逆ゴースト（オーバーシュート）、テアリング、VA黒にじみ、HDR応答をテストします。",
    "inspectionTip": "逆ゴースト（白い輪郭のオーバーシュートノイズ）を見分けるため、まずはオーバードライブを『標準』にして最高レートでテストし、その後に『高速/Extreme』を試してください。",
    "browserLimitations": "可変リフレッシュレート（G-Sync / FreeSync）の動的フレームペーシング変動は、DirectX/Vulkanネイティブゲームでの実負荷実行が必要です。",
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
        "title": "VRR＆Adaptive Sync点検",
        "description": "フレーム生成変動時における映像同期の安定性とスタッターを観察。"
      },
      {
        "title": "画面テアリング＆V-Sync",
        "description": "高速な水平・垂直移動において走査線のズレをストレスチェック。"
      },
      {
        "title": "実効リフレッシュレート検証",
        "description": "requestAnimationFrame計測によりゲームパネルの真の駆動レートを確認。"
      },
      {
        "title": "ゴースト・オーバーシュート・黒にじみ",
        "description": "画素遷移応答、逆ゴーストのハロー現象、VAパネルの暗部尾引きを判定。"
      },
      {
        "title": "HDR視覚的レンダリング",
        "description": "鏡面ハイライトの輝度、白飛びクリッピング、広色域マッピングを点検。"
      },
      {
        "title": "文字＆ゲームUI鮮明度",
        "description": "ゲーム内のHUD表示や微小フォントの輪郭が明瞭に読めるか確認。"
      }
    ]
  },
  {
    "id": "oled",
    "route": "/monitor-inspection/oled",
    "title": "OLEDディスプレイ点検",
    "shortDescription": "暗部階調、均一性、バンディング、残像、焼き付き、HDR、動的鮮明度を検査。",
    "longDescription": "自発光OLED、QD-OLED、WOLEDパネル専用の精密診断手順です。ニアブラックの階調性、縦縞バンディング、パネル均一性、一時的残像と永久焼き付きの違い、HDRダイナミックレンジ、動きの鮮明度を評価します。",
    "inspectionTip": "外光の反射を完全に遮断するため、暗室で暗いグレーパターン（1%、2%、5%グレー）を表示してOLED特有のニアブラック縦縞バンディングを確認してください。",
    "browserLimitations": "OLEDの自動輝度制限（ABL）により大面積の白画面は自動減光されます。恒久的な焼き付きの定量測定には分光放射輝度計が必要です。",
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
        "title": "ニアブラック＆暗部階調分離",
        "description": "0.25%〜5%の極低輝度階調を表示し、OLED素子の点灯立ち上がりと暗部ディテールを検査。"
      },
      {
        "title": "輝度＆暗部均一性",
        "description": "5%、20%、50%のグレー画面で縦縞（バーティカルバンディング）や明暗ムラを点検。"
      },
      {
        "title": "HDR＆ピークハイライト",
        "description": "ABLによる過度な輝度クリッピングなしに広色域とピーク輝度が伸びるか検証。"
      },
      {
        "title": "文字表示＆特殊サブピクセル",
        "description": "RGB/WRGB/QD-OLEDの配列特性による文字輪郭の色にじみ（カラーフリンジ）を精査。"
      },
      {
        "title": "Sample-and-Hold動的鮮明度",
        "description": "OLEDの瞬時応答性と視線追従による残像知覚（ホールドぼやけ）を観察。"
      },
      {
        "title": "画素欠落＆焼き付きチェック",
        "description": "単色全画面を巡回し、発光素子のドット抜けや固定UIの焼き付き影を点検。"
      }
    ]
  },
  {
    "id": "laptop",
    "route": "/monitor-inspection/laptop",
    "title": "ノートPC画面点検",
    "shortDescription": "解像度、輝度、均一性、色再現、フォント描画、リフレッシュレート、HDRを点検。",
    "longDescription": "ノートPC内蔵ディスプレイ（MacBook Retina、Windows Ultrabook、ゲーミングノート）向けの手順です。高DPIスケーリング、最大輝度余裕、パネル均一性、色再現性、ClearType文字鮮明度をテストします。",
    "inspectionTip": "点検中はノートPCをAC電源に接続し、自動明るさ調整センサーを無効化して、バッテリー節電プロファイルによる減光を防いでください。",
    "browserLimitations": "色域カバー率（100% sRGBやDCI-P3など）の厳密な数値判定には、ハードウェアキャリブレーターが必要です。",
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
        "title": "解像度＆高DPIスケーリング",
        "description": "論理ビューポート倍率、デバイスピクセル比（DPR）、ネイティブ解像度を検証。"
      },
      {
        "title": "輝度＆ダイナミックレンジ",
        "description": "屋内・屋外での視認性を左右する最大輝度と階調ステップを確認。"
      },
      {
        "title": "画面均一性＆フレーム圧迫",
        "description": "ヒンジやベゼルの圧迫による光漏れや四隅の減光を点検。"
      },
      {
        "title": "色彩の鮮やかさ＆均質性",
        "description": "原色および二次色フィールドを全画面に表示して色ムラがないか確認。"
      },
      {
        "title": "文字描画＆サブピクセル鮮明度",
        "description": "8px〜24pxの複数フォントサイズでClearType等の文字エッジ描画を判定。"
      },
      {
        "title": "リフレッシュレート動作確認",
        "description": "高レート駆動（90Hz、120Hz ProMotion、144Hz等）が正しく適用されているか確認。"
      },
      {
        "title": "HDR＆広色域（対応機種）",
        "description": "対応ノートPCパネルにおけるHDR出力と広色域表現を点検。"
      }
    ]
  },
  {
    "id": "new",
    "route": "/monitor-inspection/new",
    "title": "新品モニター初期点検",
    "shortDescription": "初期不良の確認と返品可能期間内に実施すべき必須チェックリスト。",
    "longDescription": "新しく購入したモニターを開封直後に検査し、返品・交換の保証期間が切れる前に初期製造不良、画素欠陥、バックライト漏れ、基本性能を洗い出す包括的なチェックリストです。",
    "inspectionTip": "外観の傷やグレア反射を確認する明るい部屋と、バックライト漏れやIPSグローを単離する完全な暗室の両方で点検してください。",
    "browserLimitations": "物理ポート（DisplayPort、HDMI、USB-C給電）やG-Sync専用モジュールはブラウザで直接測定できません。ケーブル類の物理挿抜テストも併せて行ってください。",
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
        "title": "解像度と基本スペック",
        "description": "パネルのネイティブ解像度、ピクセル比、OSが認識したリフレッシュレートを確認。"
      },
      {
        "title": "テキスト輪郭と精細度",
        "description": "文字レンダリングとシャープネス設定に不自然なエッジ強調がないか確認。"
      },
      {
        "title": "ドット抜け（黒点）チェック",
        "description": "純粋な原色画面を切り替え、消灯したままの黒い欠陥画素を捜索。"
      },
      {
        "title": "輝点（スタックピクセル）チェック",
        "description": "消灯できず常時鮮やかに光り続ける欠陥サブピクセルを検査。"
      },
      {
        "title": "単色カラーフィールドの均一性",
        "description": "赤、緑、青、シアン、マゼンタ、黄の各色で画面全体の発色バランスを検証。"
      },
      {
        "title": "グレースケール階調表現",
        "description": "0%から100%輝度までの階調移行が不連続な帯（バンディング）なく滑らかか確認。"
      },
      {
        "title": "輝度とダイナミックレンジ",
        "description": "最暗部から最明部までの全領域がしっかりと識別可能かチェック。"
      },
      {
        "title": "コントラスト階調ステップ",
        "description": "階段状のコントラスト基準パッチの境界線がくっきり分かれるか検証。"
      },
      {
        "title": "黒レベルの階調つぶれ",
        "description": "暗い影の部分が完全な黒につぶれてしまわないよう黒レベルを調整。"
      },
      {
        "title": "白レベルの白飛び",
        "description": "高照度のハイライトが均一な真っ白に飛んでしまわないようコントラストを調整。"
      },
      {
        "title": "面輝度の均一性",
        "description": "均一なグレー画面で光ムラ、四隅の落ち込み、汚れ効果（DSE）をチェック。"
      },
      {
        "title": "バックライト漏れとIPSグロー",
        "description": "暗室で観察し、枠の組み立て圧迫による光漏れと斜めからのIPSグローを区別。"
      },
      {
        "title": "残像感とピクセル応答",
        "description": "高コントラストの移動パターンを目視し、尾引きや滲みの度合いを評価。"
      },
      {
        "title": "リフレッシュレート安定性",
        "description": "ブラウザのアニメーション描画タイミングがパネルの仕様と一致しているか確認。"
      },
      {
        "title": "HDRと広色域サポート",
        "description": "対応機種においてOSのHDR出力およびDCI-P3色空間の描画をチェック。"
      }
    ]
  },
  {
    "id": "tv",
    "route": "/monitor-inspection/tv",
    "title": "テレビ画面点検",
    "shortDescription": "HDMI接続したリビングテレビの画質、ローカルディミング、表示性能を点検。",
    "longDescription": "リビングのテレビや大型サイネージをHDMI接続した環境向けの専用テストです。ローカルディミングのハロー（光漏れ）、画面の汚れ効果（DSE）、24p映画のコマ落ち、オーバースキャンによる端切れ、HDRを点検します。",
    "inspectionTip": "テレビの画質モードを『PC』『ゲーム』または『Filmmaker』にし、画面サイズを『ジャストスキャン』または『1:1』に設定して、人工的な輪郭強調と端の切り落としを無効化してください。",
    "browserLimitations": "倍速駆動補間（コマ補間機能／ソープオペラ効果）などのテレビ独自機能は、テレビ本体のリモコン設定から切り替えてください。",
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
        "title": "HDRビジュアル検査",
        "description": "広ダイナミックレンジでの高照度階調ロールオフと広色域表現を点検。"
      },
      {
        "title": "ニアブラック暗部ディテール",
        "description": "暗部がつぶれたり黒が浮いたりしないようHDMIの黒レベル設定を確認。"
      },
      {
        "title": "均一性＆画面汚れ効果（DSE）",
        "description": "グレー背景を視線移動させて、大型パネルにありがちな縦筋や暗斑を検出。"
      },
      {
        "title": "テレビオーバースキャン＆1:1マッピング",
        "description": "四隅や端のピクセルがテレビの外側に切り取られていないか確認。"
      },
      {
        "title": "アスペクト比＆幾何学スケーリング",
        "description": "正円や正方形パターンが縦横均等の正しい比率を保っているか検証。"
      },
      {
        "title": "リビング視認視野角",
        "description": "ソファの端や斜めの視聴位置からの色褪せやコントラスト低下を評価。"
      }
    ]
  }
];
