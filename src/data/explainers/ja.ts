import { ExplainerData, ExplainerLabels } from "./types";

export const JA_LABELS: ExplainerLabels = {
  overviewHeading: "ディスプレイ検査の概要",
  whatToLookForHeading: "検査中に確認すべき項目",
  boundariesHeading: "測定限界と技術的正確性",
  canObserveLabel: "Screen Testerが観察・検出できること",
  cannotMeasureLabel: "ブラウザ上で正確に測定できない項目",
  interpretationHeading: "観察結果の診断と解釈",
  nextStepsHeading: "推奨される次のステップ",
};

export const JA_EXPLAINERS: Record<string, ExplainerData> = {
  "dead-pixel-test": {
    overview: "ドット抜け（デッドピクセル）とは、信号に関係なく完全に消灯したままの液晶サブピクセルまたはOLED素子です。白やシアン、黄色などの明るい単色背景上で、動かない微小な黒点として現れます。",
    whatToLookFor: [
      {
        label: "明るい画面上の動かない微小な黒点",
        description: "明るい単色背景を切り替えても常に消灯したままの極小の黒い点を探します。"
      },
      {
        label: "ホコリとドット抜けの判別",
        description: "画面表面のホコリは視線角度を変えると位置がずれ、拭き取ることができます。ドット抜けは偏光板の奥に位置します。"
      },
      {
        label: "サブピクセル抜けと完全画素抜け",
        description: "赤・緑・青のどれか1つのサブピクセルのみが切れている場合、純黒ではなくわずかに変色した点として見えます。"
      },
      {
        label: "ドット抜けの集中（クラスター欠陥）",
        description: "近接した位置に複数の抜けが存在する場合、重大なパネル不良とみなされ無償交換対象になる場合があります。"
      }
    ],
    canObserve: [
      "明るい単色背景を用いた消灯ピクセルの視覚的識別",
      "画面内における不具合箇所の正確な座標と個数の確認",
      "背景の明るさと欠陥ピクセルのコントラスト検証"
    ],
    cannotMeasure: [
      "液晶薄膜トランジスタ（TFT）の電気的導通や駆動電圧",
      "目視確認を介さないブラウザによる完全自動判定",
      "パネルガラス層内部の物理的製造欠陥の直接解析"
    ],
    interpretation: "ドット抜けは製造時の微細トランジスタ不良により生じます。多くのメーカーはISO 9241-307クラス2基準を採用しており、100万画素あたり数個の欠陥は許容範囲内とされるのが一般的です。",
    nextSteps: {
      text: "黒ではなく特定の色で点灯したままのピクセルが見つかった場合は修復ツールをお試しください。",
      actionLabel: "Stuck Pixel Fixerを起動",
      actionHref: "/tests/stuck-pixel-fixer"
    }
  },

  "stuck-pixel-test": {
    overview: "常時点灯ピクセル（輝点・スタックピクセル）は、液晶セルが通光状態で固まり常に光を通してしまう現象です。黒背景において赤・緑・青・シアン・白などの明るい発光点として目立ちます。",
    whatToLookFor: [
      {
        label: "純黒背景で光る色付きの点",
        description: "部屋を暗くして黒画面を確認します。赤・緑・青に発光し続ける点があれば輝点です。"
      },
      {
        label: "補色背景での確認",
        description: "緑の輝点は緑背景では目立ちませんが、赤や青、黒の背景で強く光って見えます。"
      },
      {
        label: "白色の常時点灯点",
        description: "RGBの3サブピクセルすべてが開きっぱなしになっていると、暗い背景で白色の輝点になります。"
      },
      {
        label: "バックライト漏れとの違い",
        description: "輝点はピンポイントの微小点ですが、バックライト漏れはベゼル周辺のモヤ状の光です。"
      }
    ],
    canObserve: [
      "黒や補色背景における発光サブピクセルの視覚的特定",
      "不具合のある色チャンネル（赤・緑・青）の個別判別",
      "画面上の位置の特定とマッピング"
    ],
    cannotMeasure: [
      "液晶材料の粘性や物理的配向状態",
      "トランジスタゲートの開閉速度や電気抵抗",
      "長期間の観察なしでの恒久的な治癒可否の保証"
    ],
    interpretation: "スタックピクセルは静電気や製造時の不均一性により液晶分子の復帰が妨げられることで生じます。消灯した黒点と異なり、急速な色切り替え刺激で元に戻る場合があります。",
    nextSteps: {
      text: "常時点灯ピクセルが見つかりましたか？高速色刺激ツールで復旧を試みてください。",
      actionLabel: "Stuck Pixel Fixerを試す",
      actionHref: "/tests/stuck-pixel-fixer"
    }
  },

  "stuck-pixel-fixer": {
    overview: "高速なRGB原色切り替えとノイズパターンを用いて、固着した液晶分子を物理的・電気的に激しく駆動し、正常な動作状態への復帰を試みる修復ツールです。",
    whatToLookFor: [
      {
        label: "刺激枠の精密な位置合わせ",
        description: "画面全体の不要な点滅を避けるため、刺激ボックスを対象ピクセルの真上に合わせて配置します。"
      },
      {
        label: "刺激パターンの選択",
        description: "広域刺激を行う「RGBサイクル」と、高周波の「カラーノイズ」を切り替えて試します。"
      },
      {
        label: "推奨実行時間",
        description: "15〜30分間実行した後、一時停止して純黒背景でピクセルが改善したか確認します。"
      },
      {
        label: "光過敏性に関する注意事項",
        description: "めまいや目の疲労を感じた場合は直ちに使用を中止してください。光過敏性発作の既往がある方は使用をお控えください。"
      }
    ],
    canObserve: [
      "ブラウザ上での高速RGBサイクルおよびランダムカラーノイズのリアルタイム再生",
      "刺激エリアの自由なドラッグ移動とセッションごとのタイマー管理",
      "刺激前後におけるピクセルの視覚的な応答確認"
    ],
    cannotMeasure: [
      "回路断線や物理的に破損したトランジスタの修復",
      "確実な回復率の保証（パネルの個体差に強く依存します）",
      "通電しなくなったドット抜け（黒点）の復旧"
    ],
    interpretation: "ソフトウェアによる刺激は一時的な分子の引っかかりにのみ有効です。ハードウェア的に素子が断線・破損している場合は物理的なパネル交換が必要です。",
    nextSteps: {
      text: "刺激の終了後、黒背景のスタックピクセルテストで改善状況を確認してください。",
      actionLabel: "Stuck Pixel Testで確認",
      actionHref: "/tests/stuck-pixel-test"
    }
  },

  "refresh-rate-test": {
    overview: "リフレッシュレート（Hz）は画面が1秒間に画像を書き換える回数です。このテストはブラウザのrequestAnimationFrame APIを用いてフレーム間隔と描画の滑らかさを測定します。",
    whatToLookFor: [
      {
        label: "実測値と設定値の一致",
        description: "測定値がモニターの公称設定値（60Hz、120Hz、144Hz、240Hzなど）と一致しているか確認します。"
      },
      {
        label: "フレーム間隔のブレ（Frame Pacing）",
        description: "安定した144Hz駆動時、フレームは約6.94ミリ秒ごとに均一に更新される必要があります。"
      },
      {
        label: "ブラウザの60Hz制限",
        description: "144Hz設定にもかかわらず60Hzと表示される場合、省電力モードやブラウザのハードウェアアクセラレーション設定を確認してください。"
      },
      {
        label: "移動バーの滑らかさ",
        description: "高リフレッシュレート環境では、バーが引っかかりや残像感なく極めて滑らかに移動します。"
      }
    ],
    canObserve: [
      "ブラウザのrequestAnimationFrame呼び出し頻度と間隔のばらつき",
      "推定描画FPSおよび垂直同期の安定性",
      "アクティブタブにおけるウィンドウ合成の動作状況"
    ],
    cannotMeasure: [
      "ブラウザ環境外における液晶パネル自体の物理駆動周波数",
      "DisplayPortやHDMIケーブルの物理リンク帯域幅",
      "オシロスコープレベルでのVBLANK信号タイミング"
    ],
    interpretation: "WebブラウザはOSのウィンドウコンポジタに同期して描画します。マルチモニター環境で異なるリフレッシュレートが混在していると、60Hzに制限されることがあります。",
    nextSteps: {
      text: "ゲーミングモニターなのに60Hzで頭打ちになっていますか？設定手順をご確認ください。",
      actionLabel: "リフレッシュレートのトラブルシューティング",
      actionHref: "/knowledge-base/troubleshooting#refresh-rate-capped"
    }
  },

  "ghosting-test": {
    overview: "ゴーストとは、動く物体の背後に残像や尾を引く影が見える現象です。液晶分子の色変化速度（応答速度）がフレーム切り替え時間に追いつかない場合に発生します。",
    whatToLookFor: [
      {
        label: "黒い尾を引く残像（標準的なゴースト）",
        description: "動くブロックの後ろに暗い影が残る場合、黒から明色への切り替え速度が遅いことを意味します（VAパネルに多い）。"
      },
      {
        label: "白い輪郭・コロナ（逆ゴースト）",
        description: "物体の背後に白く光る影が出る場合、モニターのオーバードライブ機能が効きすぎています（オーバーシュート）。"
      },
      {
        label: "背景色による応答速度の違い",
        description: "赤や暗いグレーの背景で残像が極端に悪化しないか確認します。"
      },
      {
        label: "視線追従による残像の分離",
        description: "動く物体を目で追いかけ、人間の網膜の残像と液晶自体の応答遅延を区別して観察します。"
      }
    ],
    canObserve: [
      "移動速度に応じた残像やオーバーシュートコロナの視覚的確認",
      "明暗・暗明の遷移色ごとの応答性の違いの比較",
      "モニターのOSDオーバードライブ設定を変更した際の直接的な見え方の変化"
    ],
    cannotMeasure: [
      "ミリ秒（ms）単位での公認規格に準拠した中間階調応答時間（GtG）",
      "追従カメラ（Pursuit Camera）による定量的な輝度減衰曲線",
      "液晶サブピクセルの駆動電圧波形"
    ],
    interpretation: "ゴーストはパネル方式に大きく依存します（TNは高速、IPSは標準的、VAは暗部で遅延しやすく、OLEDはほぼゼロ）。オーバードライブを「中」に設定するとバランスが取れます。",
    nextSteps: {
      text: "オーバードライブの調整と逆ゴーストの解消法について詳しく学びましょう。",
      actionLabel: "ゴースト＆モーションブラーガイドを読む",
      actionHref: "/knowledge-base/monitor-ghosting-and-motion-blur"
    }
  },

  "motion-blur-test": {
    overview: "液晶や有機ELディスプレイの動きボケの主因はホールド型表示（Sample-and-Hold）です。次の書き換えまで画像が保持されるため、目を動かしたときに網膜上で像が引き伸ばされボケを感じます。",
    whatToLookFor: [
      {
        label: "高速移動時の細部消失",
        description: "細い線や文字がスクロールする様子を確認し、どの速度で文字が判読不能になるかを観察します。"
      },
      {
        label: "速度比較",
        description: "240 px/sと960 px/sを比較し、移動速度の上昇に伴って目の追従ボケがどう広がるかを確認します。"
      },
      {
        label: "黒挿入（BFI・バックライトストロボ）の効果",
        description: "モニターの黒挿入機能（ULMB、DyAc、ELMB等）をオンにすると、文字の輪郭が劇的にシャープになります。"
      },
      {
        label: "OLEDにおける動きボケ",
        description: "応答速度0.1msのOLEDであっても、黒挿入なしの60Hzや120Hzではホールドボケが発生します。"
      }
    ],
    canObserve: [
      "移動速度やリフレッシュレートによる知覚的なボケ感の違い",
      "バックライトストロボ機能使用時の解像感の向上",
      "静止時のシャープさと移動時の輪郭ボケの差異"
    ],
    cannotMeasure: [
      "動画応答時間（MPRT）の正確なミリ秒単位の物理測定",
      "人間の眼球網膜における光子積分曲線",
      "ストロボバックライトの点灯デューティ比"
    ],
    interpretation: "ホールド型ボケを減らすには、リフレッシュレートの引き上げ（1コマの保持時間を短縮）か、黒挿入（網膜残像のリセット）が不可欠です。",
    nextSteps: {
      text: "高Hz表示がいかに動きボケを低減させるか、リフレッシュレートテストで確認してください。",
      actionLabel: "リフレッシュレートテストを開く",
      actionHref: "/tests/refresh-rate-test"
    }
  },

  "vrr-test": {
    overview: "可変リフレッシュレート（VRR：NVIDIA G-Sync、AMD FreeSync、VESA Adaptive-Sync）は、GPUのフレーム生成速度に合わせてモニターの書き換え間隔をリアルタイムに同調させ、画面のズレやカクつきを防ぎます。",
    whatToLookFor: [
      {
        label: "画面の分断（テアリング）",
        description: "画像の上半分と下半分がずれて水平な亀裂が入る現象が発生していないか確認します。"
      },
      {
        label: "微小なカクつき（スタッター・ジャダー）",
        description: "フレームレートが揺らいだ際に、インジケーターが一瞬引っかかることなくスムーズに動くかを観察します。"
      },
      {
        label: "ウィンドウモードとフルスクリーン",
        description: "GPUドライバの設定によっては、完全な全画面表示にしないとG-SyncやFreeSyncが有効化されない場合があります。"
      },
      {
        label: "低フレームレート補正（LFC）",
        description: "モニターのVRR下限（例: 48Hz以下）を下回った際に、滑らかにフレーム複製が行われるか確認します。"
      }
    ],
    canObserve: [
      "フレーム間隔変動時におけるテアリング線やスタッターの視覚的有無",
      "描画レート変動時のアニメーションの滑らかさ",
      "全画面とウィンドウ表示での挙動の違い"
    ],
    cannotMeasure: [
      "GPUドライバとモニター内蔵スケーラー間のハードウェア通信",
      "物理G-Sync / FreeSyncモジュールの内部動作ステータス",
      "DisplayPort補助チャンネル（AUX）のリアルタイムメタデータ"
    ],
    interpretation: "WebブラウザはOSのウィンドウマネージャーを介して動作するため、VRRの有効化にはOS側のハードウェアアクセラレータ設定やGPUドライバ設定が正しく構成されている必要があります。",
    nextSteps: {
      text: "VRRを有効にしても画面が分断したりカクつく場合はトラブルシューティングをご覧ください。",
      actionLabel: "VRRトラブルシューティングを読む",
      actionHref: "/knowledge-base/troubleshooting#vrr-stutter-tearing"
    }
  },

  "backlight-bleed-test": {
    overview: "バックライト漏れは、液晶パネルの縁や角からバックライトの光が漏れ出す製造上の歪みです。この全画面黒テストにより、光漏れ箇所を特定し、視野角に依存するIPSグローと区別して診断できます。",
    whatToLookFor: [
      {
        label: "画面端や四隅からの光漏れ",
        description: "ベゼルの縁に沿って現れる黄色や白い光溜まりで、頭の位置を動かしても消えずに残るものを確認します。"
      },
      {
        label: "IPSグローと光漏れの違い",
        description: "頭を左右に動かします。角度によって輝きが移動したり弱まったりする場合は、IPS特有のグロー現象であり故障ではありません。"
      },
      {
        label: "モヤ状のムラ（クラウディング）",
        description: "拡散板の不均一やフレームの歪み圧迫により、画面中央部に雲状の明るいムラが生じる現象です。"
      },
      {
        label: "OLEDやMini-LEDとの比較",
        description: "画素単独発光のOLEDは光漏れがゼロ（完全な0 nit）です。Mini-LEDは明るい箇所の周囲に微小なハローが見えることがあります。"
      }
    ],
    canObserve: [
      "黒背景におけるベゼル圧迫箇所やエッジからの光漏れパターンの視認",
      "暗室環境下における四隅の光漏れの広がりと深刻度",
      "視野角変化による静的な光漏れと動的なIPSグローの切り分け"
    ],
    cannotMeasure: [
      "測光器を用いないcd/m²（nit）単位での絶対輝度値",
      "パネルの静的ネイティブコントラスト比（例: 1000:1 vs 3000:1）",
      "ANSI規格に準拠した16分割コントラスト比"
    ],
    interpretation: "適度なIPSグローは視野角の広いIPS構造の物理的特性です。一方、激しいバックライト漏れはベゼルが導光板を強く圧迫している組立不良です。",
    nextSteps: {
      text: "IPSグロー、バックライト漏れ、OLEDの真の黒の違いを詳しく解説しています。",
      actionLabel: "バックライト漏れ vs IPSグロー解説",
      actionHref: "/knowledge-base/backlight-bleed-vs-ips-glow"
    }
  },

  "near-black-test": {
    overview: "黒浮き・暗部階調テストは、完全な黒（0%）からわずかに明るい極低輝度（0.5%〜5%）までの識別能力を評価します。暗部が黒く潰れる（黒つぶれ）と、映画やゲームの暗いシーンで細部が失われます。",
    whatToLookFor: [
      {
        label: "黒つぶれ（Black Crush）",
        description: "最初のステップ（0.5%または1%）が完全に真っ黒と同化して見えない場合、暗部が潰れています。"
      },
      {
        label: "隣接ステップの識別",
        description: "暗い部屋で、低輝度のグレーブロックの境界線が明瞭に判別できるか確認します。"
      },
      {
        label: "VAパネルの視野角ガンマシフト",
        description: "VAパネルでは、真正面から見ると潰れていた影が、斜めから覗き込むと浮き上がって見えることがあります。"
      },
      {
        label: "室内照明の映り込み",
        description: "室内の照明光は人間の暗部識別力を著しく損ないます。検査時は部屋の明かりを消してください。"
      }
    ],
    canObserve: [
      "0.5%、1%、2%、3%、4%、5%の各暗部グレーパッチの視覚的識別限界",
      "暗い背景におけるシャドウディテールの分離度",
      "ガンマ、ブラックイコライザー、HDMIダイナミックレンジ変更による変化"
    ],
    cannotMeasure: [
      "専用センサーなしでの0.05 nit以下の微小輝度測定",
      "ガンマ曲線規格（BT.1886 vs 2.2）への厳密な数学的一致度",
      "パネルのネイティブ黒輝度（cd/m²）の絶対値"
    ],
    interpretation: "黒つぶれは、GPU出力レンジの不一致（フル0〜255に対してリミテッド16〜235の設定）や、モニターのガンマ設定の狂いが主な原因です。",
    nextSteps: {
      text: "ゲームや映像で暗い部分が見えにくい場合は、黒つぶれ解消手順をご確認ください。",
      actionLabel: "黒つぶれのトラブルシューティング",
      actionHref: "/knowledge-base/troubleshooting#black-crush"
    }
  },

  "gradient-banding-test": {
    overview: "滑らかなグラデーションには十分な色階調が必要です。パネルや信号経路の色深度（ビット深度）が不足していると、滑らかな変化が縞模様の段差（カラーバンディング）になって現れます。",
    whatToLookFor: [
      {
        label: "階段状の縞模様（バンディング線）",
        description: "グレーやRGBのグラデーションにおいて、滑らかではなく明確な境界線の縞が見えないか確認します。"
      },
      {
        label: "特定チャンネルのバンディング",
        description: "青色や暗い部分で特に段差が目立っていないかチェックします。"
      },
      {
        label: "ビット深度とFRCディザリング",
        description: "ネイティブ8bit/10bitパネルは滑らかですが、6bit+FRCパネルでは微細な粒状感や段差が出やすくなります。"
      },
      {
        label: "フルレンジとリミテッドレンジ",
        description: "GPUのHDMI出力が「リミテッド（16〜235）」になっていると、両端の明暗部がバッサリ切り捨てられます。"
      }
    ],
    canObserve: [
      "グレースケールおよびRGBグラデーションにおける階調段差の有無",
      "水平・垂直・多チャンネルグラデーションの表現力の比較",
      "カラープロファイルやGPUダイナミックレンジ設定による階調崩れの確認"
    ],
    cannotMeasure: [
      "OSの申告値から独立したパネルの純粋なハードウェアビット深度",
      "隣接する階調間のDelta E色差の定量測定",
      "ディスプレイスケーラー内部の空間ディザリング計算"
    ],
    interpretation: "バンディングは6bitパネルの性能限界や、HDMIダイナミックレンジの不一致、トーンカーブを切り捨てるICCプロファイルが原因となります。",
    nextSteps: {
      text: "6bit/8bit段差のシミュレーションとディザリングの確認には専用ツールをご利用ください。",
      actionLabel: "カラーバンディング＆ビット深度テスト",
      actionHref: "/tests/color-banding-test"
    }
  },

  "uniformity-test": {
    overview: "画面均一性は、モニター全体で明るさと色温度がどれだけ均等に保たれているかを検査します。拡散板の品質やエッジライトの偏りにより、四隅の減光や汚れのような色ムラ（DSE）が発生します。",
    whatToLookFor: [
      {
        label: "四隅と外周の減光（周辺減光）",
        description: "25%、50%、75%のグレー背景で、四隅が中央部よりも明らかに暗くなっていないか観察します。"
      },
      {
        label: "画面の汚れ効果（Dirty Screen Effect - DSE）",
        description: "単色画面で視線を動かした際に、ガラスに汚れがついているかのようなモヤモヤしたムラを探します。"
      },
      {
        label: "左右の色温度差",
        description: "画面の左側が暖色（赤っぽく/黄色っぽく）、右側が寒色（青っぽく）偏っていないか確認します。"
      },
      {
        label: "5×5グリッドのブロック比較",
        description: "中央から外周に向かって輝度がどの程度変化しているかを各ブロックで見比べます。"
      }
    ],
    canObserve: [
      "グレー・白画面における視覚的な輝度低下、周辺減光、中央ホットスポット",
      "画面左右や四隅における色温度のズレの目視確認",
      "標準化された複数階調における輝度ムラの観察"
    ],
    cannotMeasure: [
      "分光測色計なしでの「98.5%均一」といった精密なパーセンテージ算出",
      "各座標における色温度（ケルビン）の絶対値",
      "内蔵のデジタル均一性補正（DUC）回路の動作状況"
    ],
    interpretation: "一般向けモニターでは外周部で10%〜15%程度の減光が見られるのが普通です。プロ用グラフィックモニターはDUC回路により5%未満の均一性を維持します。",
    nextSteps: {
      text: "DSEや減光が発生する理由と交換基準について解説しています。",
      actionLabel: "画面均一性ガイドを読む",
      actionHref: "/knowledge-base/backlight-bleed-vs-ips-glow"
    }
  },

  "text-clarity-test": {
    overview: "文字の読みやすさは、画素密度（PPI）、OSのスケーリング倍率、サブピクセルの物理配列（RGB、BGR、QD-OLED）、およびフォントレンダリングエンジンによって決まります。",
    whatToLookFor: [
      {
        label: "文字輪郭の色にじみ（カラーフリンジ）",
        description: "文字の縦線に赤や青の薄い影が見える場合、サブピクセル配列とフォントレンダリングの不一致が疑われます。"
      },
      {
        label: "BGR配列による文字ボケ",
        description: "一部のモニターはBGR配列を採用しています。WindowsのClearTypeを再調整しないと文字がぼやけます。"
      },
      {
        label: "OLEDの三角形サブピクセルによる色にじみ",
        description: "WOLEDやQD-OLEDの独自配列では、水平ラインの上端や下端に緑やマゼンタのにじみが出やすくなります。"
      },
      {
        label: "端数スケーリング（125%や150%）によるボケ",
        description: "整数倍でない拡大率では、一部のデスクトップアプリでフォント描画が甘くなることがあります。"
      }
    ],
    canObserve: [
      "8pxから32pxまでのフォントサイズにおける輪郭の色にじみやボケ",
      "明朝・ゴシック・白黒反転表示でのレンダリング品質の比較",
      "ブラウザのズームやOS拡大率による視認性の変化"
    ],
    cannotMeasure: [
      "顕微鏡やマクロレンズなしでのサブピクセルの物理的幾何学形状",
      "DirectWriteやClearTypeの非公開内部レジストリフラグ",
      "光学的な変調伝達関数（MTF）"
    ],
    interpretation: "文字がぼやけて色づいて見える場合、Windowsの「ClearTypeテキストの調整」ウィザードを実行することで大幅に改善することがあります。",
    nextSteps: {
      text: "文字がにじんで読みにくいですか？ClearTypeとスケーリングの最適化手順をご覧ください。",
      actionLabel: "文字の鮮明さトラブルシューティング",
      actionHref: "/knowledge-base/troubleshooting#blurry-text-scaling"
    }
  },

  "hdr-test": {
    overview: "HDR（ハイダイナミックレンジ）は圧倒的なピーク輝度と広色域を提供します。このテストはブラウザのHDR認識状況を確認し、トーンマッピングと白飛びの限界を評価します。",
    whatToLookFor: [
      {
        label: "ブラウザのHDR検出状況",
        description: "「(dynamic-range: high)」が有効と認識されているか確認します。無効の場合、WindowsのHDR設定をオンにしてください。"
      },
      {
        label: "最高輝度付近のディテール保持",
        description: "90%、94%、97%、99%の白テストカード内の記号が、背景と混ざらずに見分けられるか確認します。"
      },
      {
        label: "ハイライトの白飛び（クリッピング）",
        description: "94%〜100%が完全に真っ白に同化して塗りつぶされている場合、モニターが階調を表現しきれていません。"
      },
      {
        label: "広色域（Display P3）の鮮やかさ",
        description: "通常のSDRコンテンツよりも、高彩度の原色が深く鮮明に表現されているかを観察します。"
      }
    ],
    canObserve: [
      "ブラウザが取得した高ダイナミックレンジおよび色深度APIのステータス",
      "ピークホワイト直前までの視覚的なハイライト階調分離度",
      "HDRテストパターンにおける暗部ディテールの視認性"
    ],
    cannotMeasure: [
      "ハードウェア測定器を用いない正確なピーク輝度（nit）",
      "VESA DisplayHDR規格（DisplayHDR 400や1000など）への厳密な準拠性",
      "PQガンマ（ST 2084 EOTF）への数学的な追従精度"
    ],
    interpretation: "「HDR400」と表記されるエントリーモデルの多くはローカルディミングを搭載しておらず、SDR以上の明るさが出ないため、HDRをオンにすると画面全体が白茶けて見えることがあります。",
    nextSteps: {
      text: "HDR画面が薄暗かったり色が不自然な場合は設定ガイドをご確認ください。",
      actionLabel: "HDRトラブルシューティングを開く",
      actionHref: "/knowledge-base/troubleshooting#hdr-not-working"
    }
  },

  "resolution-checker": {
    overview: "OSは高精細モニターで文字やUIの視認性を保つためにスケーリングを適用します。これにより、CSS上の論理解像度とパネルの物理解像度との間に倍率差が生じます。",
    whatToLookFor: [
      {
        label: "物理解像度と論理解像度の関係",
        description: "4Kモニターを150%スケーリングで使用すると、論理画面は2560×1440（DPR 1.5）となり、物理画素は3840×2160です。"
      },
      {
        label: "デバイスピクセル比（DPR）",
        description: "CSSピクセルと物理ドットの倍率比です（1.0＝100%、1.25＝125%、2.0＝200%）。"
      },
      {
        label: "有効デスクトップ領域",
        description: "Screen.availWidth/Heightはタスクバーやドックを除いた実際にウィンドウを展開できる作業領域を示します。"
      },
      {
        label: "ウィンドウ幅と全画面解像度",
        description: "Window.innerWidthは現在のブラウザ内幅であり、モニター全体の解像度とは区別されます。"
      }
    ],
    canObserve: [
      "ブラウザが報告する画面寸法（screen.width, screen.height, availWidth/Height）",
      "デバイスピクセル比（DPR）および計算上の物理レンダリング解像度",
      "CSSレイアウトビューポートの幅・高さおよび向き"
    ],
    cannotMeasure: [
      "GPUや外部分配器が信号をダウンスケールしている場合の物理パネル格子数",
      "キャプチャーボードやテレビが強制する入力解像度の変換",
      "ハードウェアで強制された非正方形ピクセルモード"
    ],
    interpretation: "解像度がモニター仕様と異なって表示される場合、Windowsの「拡大縮小とレイアウト」設定を確認してください。100%に戻すことで物理解像度と1:1になります。",
    nextSteps: {
      text: "複数のモニター解像度や画素密度（PPI）を並べて比較したい場合は比較計算機をお使いください。",
      actionLabel: "ディスプレイ比較＆PPI計算ツール",
      actionHref: "/tests/compare-displays"
    }
  },

  "display-info": {
    overview: "ブラウザが取得できるアクティブなモニター、ウィンドウサイズ、色深度、タッチ入力機能などの環境テレメトリを一覧表示します。",
    whatToLookFor: [
      {
        label: "取得された色深度",
        description: "Screen.colorDepthはビット深度を示します（通常8bit RGBなら24bit、10bit対応なら30bit）。"
      },
      {
        label: "タッチ対応の有無",
        description: "Navigator.maxTouchPointsは、ブラウザがデバイス上のタッチデジタイザーを認識しているかを示します。"
      },
      {
        label: "マルチモニターの制約",
        description: "セキュリティ上の理由から、Webアプリは明示的な権限なしにモニターの型番やシリアル番号を取得することはできません。"
      },
      {
        label: "アニメーション更新ペース",
        description: "リアルタイムのアニメーションクロック測定により、現在の描画同調状況を推定します。"
      }
    ],
    canObserve: [
      "標準DOMのScreen、Window、Navigator、Media Queryパラメータ全般",
      "デバイスピクセル比、色深度、ピクセル深度、画面の向き",
      "ポインターおよびタッチ入力の対応能力"
    ],
    cannotMeasure: [
      "特別な権限なしでのモニター製造元のEDIDモデル名やシリアル番号",
      "DisplayPortやHDMIケーブルの物理的な接続帯域幅",
      "OSの制限から独立したパネル自体の物理リフレッシュレート"
    ],
    interpretation: "Webブラウザは安全なサンドボックス内で動作します。表示される情報は、OSとウィンドウマネージャーがアプリに対して開示している値です。",
    nextSteps: {
      text: "画面の縦横比やスケーリングの歪みを確認したい場合は、アスペクト比テストをご利用ください。",
      actionLabel: "スケーリング＆アスペクト比テストへ",
      actionHref: "/tests/scaling-aspect-test"
    }
  },

  "scaling-aspect-test": {
    overview: "アスペクト比（縦横比）やスケーリングの設定が誤っていると、正円が楕円に歪んだり文字が不鮮明になります。このテストは正円・正方形・十字線と各種アスペクト比枠（16:9, 16:10, 21:9, 4:3）を用いて1:1正方形ピクセル描画を検証します。",
    whatToLookFor: [
      {
        label: "正円の歪み（真円度）",
        description: "中央の円が完全な正円になっているか確認します。楕円に見える場合、縦横比が狂っています。"
      },
      {
        label: "正方形ピクセル（1:1）",
        description: "市松模様の各マス目が、縦横正確に同じ長さになっているかチェックします。"
      },
      {
        label: "アスペクト比枠との一致",
        description: "お使いのモニターの規格（16:9、16:10、21:9等）の外枠と表示領域がぴったり重なるか確認します。"
      },
      {
        label: "GPUスケーリングモード",
        description: "ネイティブ解像度なのに黒帯が出たり画面が引き伸ばされている場合、GPUドライバの拡大縮小設定を確認してください。"
      }
    ],
    canObserve: [
      "ブラウザ表示領域内における正円および正方形グリッドの幾何学的歪みの有無",
      "16:9、16:10、21:9、4:3の基準枠との視覚的な一致度",
      "現在のブラウザビューポートの縦横比の計算"
    ],
    cannotMeasure: [
      "モニター外枠ベゼルの物理的なミリメートル寸法",
      "プロジェクターレンズ等による光学的なアナモルフィック歪み",
      "外部ビデオスケーラー内部のアスペクト比固定モード"
    ],
    interpretation: "画面の歪みは、非ネイティブ解像度選択時にGPUドライバ側で「縦横比を保持する」設定が有効になっていないことが原因で発生します。",
    nextSteps: {
      text: "テレビに接続して使っている場合は、端が切り取られていないかオーバースキャンテストで確認してください。",
      actionLabel: "テレビオーバースキャンテストへ",
      actionHref: "/tests/tv-overscan-test"
    }
  },

  "compare-displays": {
    overview: "モニターのインチサイズ、解像度、画素密度（PPI）は作業領域の広さと文字の精細さを決定します。このツールは2つのモニターの物理寸法、総画素数、PPIを計算し、実寸比率で並べて視覚比較します。",
    whatToLookFor: [
      {
        label: "画素密度（PPI）",
        description: "PPIが高いほど滑らかな表示になります。デスクトップでは約110 PPIが標準、220 PPI前後がRetinaクラスの高精細です。"
      },
      {
        label: "物理的な横幅と高さ",
        description: "27インチの16:9は、29インチのウルトラワイド（21:9）よりも縦の画面高が大幅に広くなります。"
      },
      {
        label: "総ピクセル数",
        description: "4K（約829万画素）は、一般的なフルHD 1080p（約207万画素）の4倍の作業領域を持ちます。"
      },
      {
        label: "最適な視聴距離",
        description: "PPIが高ければ、画素の網目（格子感）を感じることなく画面に近づいて作業できます。"
      }
    ],
    canObserve: [
      "入力された解像度とインチ数に基づくPPI、アスペクト比、表示面積の数学的算出",
      "2つのモニターの縦横寸法を比率通りに並べた視覚的レイアウト比較",
      "画素ピッチ（ドットの間隔・ミリメートル）の計算"
    ],
    cannotMeasure: [
      "ユーザーによるインチ数入力なしでの接続モニターサイズの自動判別",
      "ブラウザAPI経由での光学的な画面実寸の測定",
      "モニターのベゼル幅やスタンドの設置面積"
    ],
    interpretation: "画素密度はピタゴラスの定理に基づき対角画素数をインチ数で割ることで算出されます。ブラウザからは物理インチ数を取得できないため、ユーザーによる入力が必要です。",
    nextSteps: {
      text: "画素密度がOSごとの文字の読みやすさにどう影響するか解説しています。",
      actionLabel: "文字の鮮明さガイドを読む",
      actionHref: "/knowledge-base/text-clarity-and-subpixel-rendering"
    }
  },

  "tv-overscan-test": {
    overview: "オーバースキャンとは、映像の外周2〜5%を切り取って拡大表示する旧来のテレビ規格です。PCやゲーム機を接続した際、タスクバーが隠れたり等倍表示（1:1ピクセルマッピング）が崩れて文字がぼやける原因になります。",
    whatToLookFor: [
      {
        label: "最外周「0%」枠の視認性",
        description: "最外周の白い枠線と「0%」の矢印が見えない場合、テレビがオーバースキャンで端を切り捨てています。"
      },
      {
        label: "切り取り割合の目盛り",
        description: "テレビの枠にどの目盛り（2.5%や5%）が合致しているかで、失われているデスクトップの割合が分かります。"
      },
      {
        label: "四隅の十字線の位置",
        description: "四隅のクロスヘアの先端が、テレビパネルの物理的なフチぴったりで終わっているか確認します。"
      },
      {
        label: "1:1ピクセルマッピングの解像感",
        description: "1ピクセルの市松模様ルーラーを確認します。ちらついたり灰色に濁って見える場合、テレビ側で拡大補間されています。"
      }
    ],
    canObserve: [
      "画面外周の切断有無とパーセンテージ境界線（0%、2.5%、5%）の視認性",
      "スケーラー補間ボケを検出するための1ピクセル細密パターンの再現性",
      "テレビの画面サイズ設定を変更した際の効果の即時目視確認"
    ],
    cannotMeasure: [
      "テレビ内部のOSDメニュー設定のソフトウェアによる直接操作",
      "HDMI CEC経由でのテレビ側アスペクト比プリセットの自動判別",
      "テレビ外枠ベゼルの物理的な被りと電子的な映像切断の切り分け"
    ],
    interpretation: "文字を鮮明にしデスクトップ全体を表示するには、テレビの画面サイズ設定を「フル」「ジャストスキャン」「1:1ピクセル」「画面に合わせる」「ドット・バイ・ドット」のいずれかに変更してください。",
    nextSteps: {
      text: "REGZA、BRAVIA、AQUOS、LG、Samsung等での1:1設定手順を解説しています。",
      actionLabel: "テレビオーバースキャン＆等倍表示ガイド",
      actionHref: "/knowledge-base/tv-overscan-and-pixel-mapping"
    }
  },

  "multi-touch-test": {
    overview: "タッチパネル、タブレット、大型タッチモニターの同時接触点をテストします。座標をリアルタイムで追跡し、アクティブな指の数をカウントして、マルチタッチジェスチャーが正しくブラウザに届いているかを診断します。",
    whatToLookFor: [
      {
        label: "同時タッチ認識数",
        description: "複数本の指を同時に画面に置きます。カウンターが2点、5点、10点と正確に追従してカウントされるか確認します。"
      },
      {
        label: "軌跡追従のスムーズさ",
        description: "複数の指を画面上で滑らせ、途中で線が途切れたり座標が飛んだりしないか観察します。"
      },
      {
        label: "OSジェスチャーの割り込み",
        description: "3本や4本の指を置いた際に、ブラウザ上のタッチではなくOS側のジェスチャー（アプリ切り替え等）が誤作動しないか確認します。"
      },
      {
        label: "パームリジェクション（手のひら除去）",
        description: "指先でタッチしながら手のひらの側面を画面に置いた際、不要な大面積接触が無視されるか確認します。"
      }
    ],
    canObserve: [
      "ブラウザウィンドウに送出されるポインターおよびタッチイベントのリアルタイム追跡",
      "各接触点の座標、ID、および合計同時タッチ点数",
      "ブラウザが通知するnavigator.maxTouchPointsプロパティの確認"
    ],
    cannotMeasure: [
      "デジタイザーの物理サンプリングレート（Hz単位のタッチレポートレート）",
      "専用ハードウェアAPIなしでの静電容量式筆圧レベル",
      "OSドライバが認識しないデジタイザー配線メッシュの物理断線"
    ],
    interpretation: "同時認識可能な点数は、ハードウェアデジタイザーの仕様およびOSドライバの制限によって決まります。",
    nextSteps: {
      text: "画面全体のデッドゾーンや描画の途切れをくまなくテストしたい場合はこちらをお試しください。",
      actionLabel: "タッチスクリーン全面テストを開く",
      actionHref: "/tests/touch-screen-test"
    }
  },

  "webcam-test": {
    overview: "WebRTCのメディアストリームAPI（getUserMedia）を利用してカメラをブラウザ上で直接テストします。解像度（720p, 1080p, 4K）の確認、フレームレートの監視、アクセス許可エラーの診断がローカル環境で完結します。",
    whatToLookFor: [
      {
        label: "映像ストリームの解像度",
        description: "表示される解像度が、カメラの公称スペック（例: 1920×1080 Full HD）通りになっているか確認します。"
      },
      {
        label: "フレームレートの安定性",
        description: "リアルタイムFPSを監視します。暗い部屋では、露光時間を稼ぐために多くのカメラが自動で15〜20 FPS程度まで低下します。"
      },
      {
        label: "色合いと露出バランス",
        description: "顔の白飛び、室内照明下でのホワイトバランス、暗い箇所のノイズ発生状況をチェックします。"
      },
      {
        label: "カメラアクセス権限の動作",
        description: "ブラウザが正しく権限プロンプトを出し、他アプリとの競合なくカメラを占有できているか確認します。"
      }
    ],
    canObserve: [
      "外部サーバーに送信されることなくブラウザ内で完全にローカル処理されるリアルタイム映像",
      "OSドライバとネゴシエーションされたストリーム解像度（幅・高さ）およびFPS",
      "MediaDeviceInfoインターフェースによる接続デバイス名の取得"
    ],
    cannotMeasure: [
      "OSドライバの制限を超えたカメラセンサー本来の物理的解像度",
      "レンズの光学的な歪曲収差や色収差の数値測定",
      "照度計（Lux）基準での正確な光学感度測定"
    ],
    interpretation: "Webカメラの解像度はOS側のカメラドライバを介して決定されます。高解像度が出ない場合は、USBハブの帯域不足や物理プライバシーシャッターをご確認ください。",
    nextSteps: {
      text: "カメラが認識されなかったり権限エラーが出る場合はトラブルシューティングをご覧ください。",
      actionLabel: "Webカメラトラブルシューティング",
      actionHref: "/knowledge-base/troubleshooting#webcam-access-denied"
    }
  },

  "speaker-test": {
    overview: "Web Audio APIを活用してスピーカー、ヘッドホン、外付け音響機器を検査します。左右（L/R/両方）のステレオチャンネル分離を確認し、20Hz〜20,000Hzの周波数スイープで音割れやビビリ音を検出します。",
    whatToLookFor: [
      {
        label: "ステレオチャンネルの完全分離",
        description: "左チャンネル再生時、右側のスピーカーやイヤホンから音が一切漏れ出していないか確認します。"
      },
      {
        label: "重低音（20Hz〜100Hz）の再生限界",
        description: "低音の再生を確認します。ノートPCの内蔵スピーカーは通常80Hz〜100Hz以下が完全にカットされます。"
      },
      {
        label: "高音域（10kHz〜20kHz）の聞き取り限界",
        description: "高周波スイープが進む中で、どの周波数で音が聞こえなくなるかを確認します（機器の限界および個人の聴力特性）。"
      },
      {
        label: "筐体の共振やビビリ音",
        description: "中低音（100Hz〜300Hz）の再生時に、机の上の小物やスピーカーのプラスチック筐体が共振してジリジリ鳴らないか点検します。"
      }
    ],
    canObserve: [
      "左・右・中央チャンネルごとの合成トーン再生とステレオパンニング",
      "人間の可聴域全域（20Hz〜20,000Hz）にわたる連続周波数スイープ再生",
      "AudioContextのサンプリングレートおよびWeb Audio APIの出力機能"
    ],
    cannotMeasure: [
      "校正済み測定用マイクを用いない音圧レベル（SPL・デシベル dB）の絶対測定",
      "スピーカーの全高調波歪率（THD）や電気的インピーダンス",
      "リスニングルームの室内音響周波数特性曲線"
    ],
    interpretation: "ステレオテストにより、OS設定で音声がモノラルにダウンミックスされていないかを確認できます。周波数スイープはコーン紙の破れや筐体のガタつき発見に役立ちます。",
    nextSteps: {
      text: "音が出なかったり左右が逆になっている場合はオーディオトラブルシューティングをご覧ください。",
      actionLabel: "スピーカートラブルシューティング",
      actionHref: "/knowledge-base/troubleshooting#speaker-no-sound"
    }
  },

  "accelerometer-test": {
    overview: "加速度計テストは、DeviceMotionEvent APIを活用して3つの物理軸（X、Y、Z）に沿った直線加速度と地球の1g重力加速度をリアルタイムで測定・可視化します。端末の傾きや動的挙動を高精度に検証できます。",
    whatToLookFor: [
      {
        label: "重力加速度（1g）の分布",
        description: "平らな机に水平に置いた状態では、Z軸が約 ~9.8 m/s²（1g）を示し、X軸とY軸は0 m/s²付近に安定します。"
      },
      {
        label: "傾斜操作に対する応答性",
        description: "端末を左右に傾けるとX軸が、前後に傾けるとY軸の値が滑らかに追従・変化します。"
      },
      {
        label: "急激な動作時のスパイク検知",
        description: "端末を素早く振ったり動かしたりすると、リアルタイム波形グラフに加速度のピークが即座に記録されます。"
      },
      {
        label: "センサー許可ステータス",
        description: "iOS Safariではモーションデータへのアクセスにユーザーによる明示的な許可が必要です。"
      }
    ],
    canObserve: [
      "重力加速度を含む/含まないX・Y・Z軸の加速度（m/s²単位）",
      "ブラウザがサポートするセンサーサンプリング更新間隔",
      "重力ベクトルに連動するインタラクティブな傾きターゲットレティクル"
    ],
    cannotMeasure: [
      "工場出荷時のセンサー校正バイアスや実験室基準のゼロ点ドリフト",
      "MEMSシリコンチップの内部ハードウェア物理欠陥",
      "端末の絶対的な地理的位置やGPS座標"
    ],
    interpretation: "正常な加速度計は、下向きの軸に対して安定した約9.8 m/s²の重力値を示します。数値が静止状態で激しく乱れたりゼロで固まっている場合は、センサー故障やOSの権限ブロックが疑われます。",
    nextSteps: {
      text: "数値が変わらない、またはゼロのままですか？センサートラブルシューティングガイドをご確認ください。",
      actionLabel: "センサートラブルシューティング",
      actionHref: "/knowledge-base/troubleshooting"
    }
  },

  "gyroscope-test": {
    overview: "ジャイロスコープテストは、DeviceOrientationEvent APIによりAlpha（ヨー/Z軸）、Beta（ピッチ/X軸）、Gamma（ロール/Y軸）の3軸回転角度と角速度を計測します。リアルタイム人工水平線と3D姿勢球で回転挙動を確認できます。",
    whatToLookFor: [
      {
        label: "人工水平線の連動",
        description: "端末を左右に傾けると水平線が滑らかに傾き、前後にお辞儀させると上下に移動します。"
      },
      {
        label: "ピッチ角（Beta: -180° 〜 180°）",
        description: "端末を前後に傾けると、ピッチ角が引っかかりなく比例して変化します。"
      },
      {
        label: "ロール角（Gamma: -90° 〜 90°）",
        description: "左右に傾けると、ロール角が遅延や軸の反転なく正確に更新されます。"
      },
      {
        label: "コンパス方位角（Alpha: 0° 〜 360°）",
        description: "端末を水平に回転させると、方位角センサー対応機種ではコンパス方位を追従します。"
      }
    ],
    canObserve: [
      "ブラウザから通知される回転角度（Alpha、Beta、Gamma（度単位））",
      "姿勢指示器（人工水平線）と3D回転プレビュー表示",
      "絶対方位トラッキングと相対モーションの判別"
    ],
    cannotMeasure: [
      "長期静止測定を伴わないMEMSジャイロの温度起因ドリフト率",
      "ブラウザイベントループ（通常60Hz）を超えるチップ内部超高速レート",
      "地磁気センサー非搭載機における磁気干渉自動補正"
    ],
    interpretation: "ジャイロは角速度を積分して姿勢を算出します。静止時の微小なドリフトは正常ですが、数値のフリーズや反転は権限遮断やセンサーロックを示唆します。",
    nextSteps: {
      text: "傾きが反応しない、または逆向きに動く場合はモバイル権限ガイドをご確認ください。",
      actionLabel: "センサートラブルシューティング",
      actionHref: "/knowledge-base/troubleshooting"
    }
  },

  "vibration-test": {
    overview: "バイブレーションテストは、HTML5 Vibration API（navigator.vibrate）を用いてスマートフォン等の内蔵触覚振動モーターを直接作動させます。単一パルス、リズミカルな振動パターン、連続振動をテストできます。",
    whatToLookFor: [
      {
        label: "単一パルスの応答速度",
        description: "200msまたは500msのテストボタンを押した瞬間に、明確で歯切れの良い物理的振動が発生するか確認します。"
      },
      {
        label: "リズムパターンの間隔と停止",
        description: "SOSや心拍パターンにおいて、振動間の無振動インターバルが遅延なく正確に停止するか確認します。"
      },
      {
        label: "モーターの安定性と異音",
        description: "振動の強さが一定であり、端末内部から不快な金属音や異音・ガタつきが発生していないか確認します。"
      },
      {
        label: "ブラウザおよびOSの対応状況",
        description: "Vibration APIはAndroidのChrome/Firefoxで動作しますが、Apple iOS（Safari）では仕様上意図的に無効化されています。"
      }
    ],
    canObserve: [
      "ミリ秒単位でのVibration APIコマンド（単一パルス・配列パターン）の直接実行",
      "navigator.vibrateのブラウザサポートおよびタップ操作検知",
      "振動リズムと完全に同期した画面ビジュアルアニメーション"
    ],
    cannotMeasure: [
      "ハプティックモーターの回転数（RPM）や振動周波数（Hz）",
      "外部測定器を用いない機械的加速度（Gフォース）",
      "ERM偏心回転モーターとLRAリニア振動アクチュエータの物理的判別"
    ],
    interpretation: "Androidで振動しない場合は、端末の「音とバイブレーション」設定で触覚フィードバックがONになっているか、省電力モードが無効になっているかを確認してください。iOSブラウザでは動作しません。",
    nextSteps: {
      text: "ボタンを押しても端末が振動しませんか？バイブレーション解決手順をご覧ください。",
      actionLabel: "バイブレーショントラブルシューティング",
      actionHref: "/knowledge-base/troubleshooting"
    }
  },

  "microphone-test": {
    overview: "マイクテストは、WebRTC getUserMediaおよびWeb Audio APIを通じてマイクの音声入力をリアルタイム解析します。オシロスコープ波形、周波数スペクトラム、VUレベルメーター、ループバック再生でマイク音質を多角的に診断します。",
    whatToLookFor: [
      {
        label: "入力レベルメーターの反応",
        description: "マイクに向かって話すと緑のメーターが滑らかに上昇します。通常の会話音量は40%〜75%の範囲が理想的です。"
      },
      {
        label: "音割れ・クリッピングの監視",
        description: "大声を出した際にメーターが赤色の警告ゾーンに張り付き、デジタルクリッピング音割れが生じないか確認します。"
      },
      {
        label: "波形と周波数バーの連動",
        description: "声の高さや大きさの変化に応じて、オシロスコープ波形と周波数バーがダイナミックに反応するか確認します。"
      },
      {
        label: "ループバック録音再生による音質確認",
        description: "5秒間の音声を録音・再生し、ホワイトノイズ、静電ノイズ、エコー、ロボット音声等の異常がないか聴き比べます。"
      }
    ],
    canObserve: [
      "Web Audio AnalyserNodeによるリアルタイム音声波形および周波数スペクトラム",
      "外部サーバーへ一切送信せずブラウザ内部で完結するRMS音量測定",
      "プライバシー保護されたローカル録音および即時ループバック再生機能"
    ],
    cannotMeasure: [
      "測定器を用いない校正済み音圧レベル（dB SPL）の絶対値",
      "マイクカプセルの物理的指向特性（単一指向性・無指向性など）",
      "A/D変換前のプリアンプ回路における純アナログノイズフロア"
    ],
    interpretation: "正常なマイクは低ノイズで明瞭な録音音声を再生します。極端に音が小さい場合はOSの入力音量設定、激しいノイズがある場合は3.5mmプラグの接触不良やサンプリングレート不一致が考えられます。",
    nextSteps: {
      text: "マイクが音を拾わない、または音割れが起きていますか？マイク解決ガイドをご確認ください。",
      actionLabel: "マイクトラブルシューティング",
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

