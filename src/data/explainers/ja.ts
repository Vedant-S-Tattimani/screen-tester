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

    "hdr-capability-test": {
    "overview": "HDRハードウェア＆信号検出器は、OSコンポジター、ディスプレイドライバ、ブラウザがHDR信号を正しく連携しているかを監査します。CSS Media Queries Level 4 (dynamic-range: high)、広色域（Rec.2020 / Display-P3）、Canvas P3色バッファ、WebGL floatレンダーターゲット、および10ビットHDR動画コーデックを診断します。",
    "whatToLookFor": [
        {
            "label": "コンポジターHDR信号状態",
            "description": "OSウィンドウコンポジターがブラウザにHDR信号を出力しているか確認します。無効な場合、OS設定でHDRがオフになっています。"
        },
        {
            "label": "バッファ色深度とパイプライン",
            "description": "画面の色深度（24ビットSDR vs 30ビット+ HDR）を検出し、CanvasおよびWebGL2がP3およびfloatバッファを割り当て可能か確認します。"
        },
        {
            "label": "広色域（Rec.2020およびDisplay-P3）",
            "description": "標準sRGBを超える深い深紅やエメラルドグリーンを表現できる広色域をモニターが報告しているかを評価します。"
        },
        {
            "label": "HDR動画コーデックのアクセラレーション",
            "description": "HDR10 (HEVC Main 10)、AV1 10ビット (YouTube HDR)、VP9 Profile 2のハードウェアデコード対応状況を検査します。"
        }
    ],
    "canObserve": [
        "OSコンポジターのリアルタイムHDR出力状態",
        "Display-P3およびRec.2020に対するハードウェアおよびブラウザの対応",
        "ブラウザがアクセス可能な画面色深度およびfloatバッファサポート",
        "ハードウェアアクセラレーション対応10ビット動画再生機能"
    ],
    "cannotMeasure": [
        "ハードウェア測色計なしでの物理パネル最大輝度（nits）",
        "VESA DisplayHDR認証基準（DisplayHDR 400 / 600 / 1000など）への厳密な準拠",
        "Mini-LEDバックライトの物理分割駆動ゾーン数"
    ],
    "interpretation": "dynamic-rangeがstandard（無効）と表示された場合、Windowsでは Win + Alt + B を押すか、macOSのディスプレイ設定でHDRを有効にしてください。",
    "nextSteps": {
        "text": "実際のハイライト白飛びやトーンカーブ、最大輝度を視覚的に検査したい場合は光学検査をご利用ください。",
        "actionLabel": "HDR視覚検査を開始",
        "actionHref": "/tests/hdr-test"
    }
},

  "hdr-test": {
    "overview": "HDR視覚キャリブレーション＆ハイライト検査テストは、ディスプレイパネルがHDR信号にどのように光学的に応答するかを評価する専用テストです。鏡面ハイライトのロールオフ、白飛び点、10% APLピーク輝度ウィンドウ、PQ/EOTFトーンカーブ階調、および暗部ディテールを検査します。",
    "whatToLookFor": [
        {
            "label": "鏡面ハイライトのロールオフと白飛び",
            "description": "90%から100%ピーク白のパッチを観察します。円形レティクルが均一なベタ白に潰れず見えるか確認してください。"
        },
        {
            "label": "10% APLピーク輝度ウィンドウ",
            "description": "純黒背景の10%白ウィンドウにより、最大輝度（nits）、分割バックライトの制御、ハロー（光漏れ）を検査します。"
        },
        {
            "label": "PQ / EOTFトーンカーブ階調",
            "description": "滑らかな10ビット階調と8ビット段階リファレンスを比較し、バンディングや急激なトーン圧縮がないかを観察します。"
        },
        {
            "label": "暗部階調と黒潰れ (Near-Black)",
            "description": "極低輝度のステップ（0.5%〜5%）が、黒レベルを浮かせることなく純黒0%から正しく識別できるかを確認します。"
        }
    ],
    "canObserve": [
        "各段階の白輝度レベルにおけるハイライト白飛びの限界点",
        "10% APLウィンドウでの分割バックライトのハローおよび最大輝度余裕度",
        "8ビットバンディングに対する10ビット階調遷移のなめらかさ",
        "暗部階調の分離度および黒潰れ（Black Crush）の有無"
    ],
    "cannotMeasure": [
        "実験室センサーなしでの正確な光度最大輝度（nits）",
        "分光測色計なしでの色温度（ケルビン）精度",
        "画素応答速度やオーバードライブのオーバーシュート"
    ],
    "interpretation": "トーンマッピングが劣るディスプレイは94%以上で白飛びを起こすか、暗部を真っ黒に潰します。優れたOLEDやMini-LEDは99%までレティクルを保持します。",
    "nextSteps": {
        "text": "OSコンポジターや動画コーデックがHDRに対応しているか診断したい場合は検出器をご確認ください。",
        "actionLabel": "HDRハードウェア＆信号を確認",
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
    "overview": "バッテリー健全性・電源情報テストは、W3C Battery Status APIを使用して充電率、電源接続状態、フル充電までの推定時間およびバッテリー駆動時間をリアルタイムで測定します。",
    "whatToLookFor": [
        {
            "label": "リアルタイム充電残量",
            "description": "OS電源サブシステムが報告するバッテリー残量パーセンテージを監視します。"
        },
        {
            "label": "ACアダプター接続状態",
            "description": "電源供給中か内蔵バッテリー駆動中かを判別します。"
        },
        {
            "label": "充電および放電推定時間",
            "description": "満充電までの時間またはバッテリー残存時間を算出します。"
        },
        {
            "label": "放電推移グラフ",
            "description": "ディスプレイ動作中のバッテリー消費ペースを可視化します。"
        }
    ],
    "canObserve": [
        "OSから取得したリアルタイムのバッテリーパーセンテージ",
        "充電中/放電中のイベント遷移検知",
        "充電完了または消耗までの推定秒数",
        "セッション中のバッテリー推移ログ"
    ],
    "cannotMeasure": [
        "mAh単位での物理的バッテリーセル劣化度",
        "内部温度、内部抵抗、充放電サイクル回数",
        "プライバシー保護でAPIが無効化されているブラウザでの計測"
    ],
    "interpretation": "非対応と表示される場合はブラウザのフィンガープリント防止機能によるものです。急激な残量減少はバッテリー劣化を示唆します。",
    "nextSteps": {
        "text": "ネットワーク速度とレイテンシーを測定しますか？",
        "actionLabel": "ネットワーク速度テストを実行",
        "actionHref": "/tests/network-speed-test"
    }
},

  "network-speed-test": {
    "overview": "ネットワーク速度・レイテンシーテストは、タイミングAPIおよびNetwork Information APIを使用して、インターネット接続のPing応答時間、ジッター、接続タイプ、ダウンロードスループットを計測します。",
    "whatToLookFor": [
        {
            "label": "Ping応答時間 (RTT)",
            "description": "ブラウザとテストサーバー間のパケット往復時間をミリ秒単位で測定します。"
        },
        {
            "label": "ダウンロードスループット (Mbps)",
            "description": "ペイロード受信時の持続最大帯域幅を計算します。"
        },
        {
            "label": "接続種別プロファイル",
            "description": "有効接続タイプ（4G、Wi-Fi、有線LANなど）を識別します。"
        },
        {
            "label": "接続安定性とジッター",
            "description": "連続するPingのばらつきから回線の揺らぎを評価します。"
        }
    ],
    "canObserve": [
        "ミリ秒単位でのHTTP/HTTPS往復応答時間（RTT）",
        "navigator.connectionによる実効ネットワーククラス",
        "転送データ量と所要時間から算出したダウンロード実効速度",
        "データセーバー機能の有効/無効状態"
    ],
    "cannotMeasure": [
        "ブラウザオーバーヘッドを除いた純粋なTCPソケットレイテンシー",
        "光回線やモデムの物理的なS/N比や光入力レベル",
        "Wi-Fi周波数帯における電波干渉状況"
    ],
    "interpretation": "30ms未満のレイテンシーはクラウドゲーミングやオンライン対戦に最適です。50Mbps以上あれば高画質4K動画を快適に視聴できます。",
    "nextSteps": {
        "text": "クリックから画面描画までの入力遅延を測定しますか？",
        "actionLabel": "入力遅延テストを実行",
        "actionHref": "/tests/input-lag-test"
    }
},

  "color-blindness-test": {
    "overview": "色覚異常シミュレーターは、数学的に補正されたSVGカラーマトリクスフィルターを用いて8種類の色覚多様性を再現し、UIデザインやアクセシビリティの検証を可能にします。",
    "whatToLookFor": [
        {
            "label": "1型色覚（赤色盲・赤色弱）",
            "description": "L錐体の特性変化により赤が暗い茶色や灰色に見え、緑との区別が難しくなります。"
        },
        {
            "label": "2型色覚（緑色盲・緑色弱）",
            "description": "M錐体の特性変化により緑と赤が黄褐色系に混ざり合います。最も多いタイプです。"
        },
        {
            "label": "3型色覚（青色盲・青色弱）",
            "description": "S錐体の特性変化により青が緑がかって見え、黄色が紫や灰色に見えます。"
        },
        {
            "label": "全色盲（1色覚・桿体一色覚）",
            "description": "錐体細胞の機能欠如により、色彩を感知できず明暗のグレースケールのみで知覚します。"
        }
    ],
    "canObserve": [
        "8種類のマトリクスを用いたテキスト、アイコン、配色パレットのリアルタイム変化",
        "通常色覚とシミュレーション表示の並列比較",
        "状態表示色（成功の緑と警告・エラーの赤）の識別性低下の検証",
        "各色覚特性下におけるテキストコントラストと可読性"
    ],
    "cannotMeasure": [
        "医療用眼科検査機器による個人の臨床的診断",
        "ユーザー網膜の個別の受光感度特性",
        "分光放射輝度計を用いない物理パネルの発光スペクトル"
    ],
    "interpretation": "緑と赤の判別が困難な場合、WCAG 2.2ガイドラインに準拠し、色彩のみに依存せずアイコンや形状、下線などの補助識別情報を付与することが推奨されます。",
    "nextSteps": {
        "text": "ディスプレイのsRGBおよびDCI-P3カバー率を確認しますか？",
        "actionLabel": "色域テストを実行",
        "actionHref": "/tests/color-gamut-test"
    }
},

  "screen-recorder": {
    "overview": "スクリーンレコーダー＆スクリーンショットツールは、Screen Capture APIおよびMediaRecorder APIを活用し、追加ソフト不要で画面録画（WebM形式）および高解像度静止画（PNG形式）を取得します。",
    "whatToLookFor": [
        {
            "label": "キャプチャ解像度",
            "description": "キャプチャストリームのピクセル寸法がディスプレイの解像度と一致しているか確認します。"
        },
        {
            "label": "フレームレートと滑らかさ",
            "description": "録画時間とフレームレートをリアルタイムで追跡します。"
        },
        {
            "label": "音声トラックの同期",
            "description": "画面映像とともにシステム音声やタブ音声を同時録音します。"
        },
        {
            "label": "高画質PNGスクリーンショット",
            "description": "キャンバスレンダリングにより瞬時に劣化のないPNG画像を書き出します。"
        }
    ],
    "canObserve": [
        "キャプチャ映像の縦横解像度、アスペクト比、フレームレート情報",
        "録画経過時間、一時停止状態および生成されるWebMファイル容量",
        "HTML5 Canvasを用いたPNG画像出力バッファ",
        "画面共有に関するブラウザ許可状態"
    ],
    "cannotMeasure": [
        "OSハードウェアGPUエンコーダー内部のレイテンシー",
        "DRM保護コンテンツ（著作権保護動画は黒画面としてキャプチャされます）",
        "物理モニターの高リフレッシュレート同期限界"
    ],
    "interpretation": "すべてのキャプチャデータはブラウザ内部メモリでのみ処理され、外部サーバーへ送信されることは一切ありません。機密作業時も安全に利用できます。",
    "nextSteps": {
        "text": "ウェブカメラの解像度やマイク入力を確認しますか？",
        "actionLabel": "ウェブカメラテストを実行",
        "actionHref": "/tests/webcam-test"
    }
},

  "dark-mode-test": {
    "overview": "ダークモード・テーマ適合性テストは、OSのprefers-color-schemeメディアクエリの同期、CSS color-schemeの対応状況、フォーム部品の描画、およびライト/ダーク両テーマでのコントラスト比を検証します。",
    "whatToLookFor": [
        {
            "label": "OS設定との同期性",
            "description": "Windows、macOS、スマホのダークモード切替をブラウザが即座に反映するか検証します。"
        },
        {
            "label": "CSS color-scheme対応",
            "description": "ダークモード時のネイティブスクロールバーや入力フォームの描画を確認します。"
        },
        {
            "label": "コンポーネント視認性",
            "description": "明暗両モードにおけるテキスト、カード、ボタンのコントラスト比を測定します。"
        },
        {
            "label": "OLED向け純黒（#000000）最適化",
            "description": "有機ELディスプレイで電力を消費しない純粋な黒背景の適用状況を確認します。"
        }
    ],
    "canObserve": [
        "matchMediaによるprefers-color-schemeのリアルタイム判定",
        "ネイティブCSS color-schemeプロパティへのブラウザ対応状況",
        "システム、ライト、ダークモードの瞬時プレビュー切り替え",
        "各テーマにおけるフォントの視認性とコントラスト"
    ],
    "cannotMeasure": [
        "ハードウェア計測器なしでのOLEDパネルの物理消費電力（mA）",
        "環境光センサー非搭載端末での周囲の照度適応",
        "Night Shift等のブルーライトカット機能による色温度変化"
    ],
    "interpretation": "有機ELディスプレイは完全な黒の描画時にサブピクセルを完全消灯するため、消費電力削減と暗所での眼精疲労軽減に極めて有効です。",
    "nextSteps": {
        "text": "部屋の明るさに応じた最適な画面輝度を測定しますか？",
        "actionLabel": "環境光センサーテストを実行",
        "actionHref": "/tests/ambient-light-test"
    }
},

  "input-lag-test": {
    "overview": "入力遅延ビジュアライザーは、10回の試行を通じて視覚刺激からマウスクリック検出までの遅延時間を統計測定し、平均値、標準偏差、分布ヒストグラムを出力します。",
    "whatToLookFor": [
        {
            "label": "視覚刺激反応時間",
            "description": "画面が緑に変化したフレームからクリック検知までのミリ秒を算出します。"
        },
        {
            "label": "統計的安定性（標準偏差）",
            "description": "標準偏差が25ms未満であれば、安定したハードウェアおよび神経系パイプラインを示します。"
        },
        {
            "label": "お手つき（フライング）検出",
            "description": "緑に変わる前のクリックを無効化しペナルティを与えます。"
        },
        {
            "label": "遅延分布ヒストグラム",
            "description": "計測データのばらつきをヒストグラムでグラフィカルに可視化します。"
        }
    ],
    "canObserve": [
        "performance.now()による高精度ミリ秒タイムスタンプ",
        "10回テストに基づく平均値、最速値、最遅値、標準偏差の集計",
        "フライング防止ステートマシン制御",
        "反応時間の度数分布ヒストグラム"
    ],
    "cannotMeasure": [
        "専用ハードウェア光センサー（LDAT等）を用いない純粋な光学クリック・ツー・フォトン遅延",
        "OS割り込み処理から独立したUSBポーリング周期",
        "液晶分子の物理的オーバードライブ応答速度"
    ],
    "interpretation": "高リフレッシュレート環境では180ms〜240msが標準的です。300msを超える場合はディスプレイの後処理遅延（ゲームモードOFF）が疑われます。",
    "nextSteps": {
        "text": "ディスプレイのハードウェアリフレッシュレートを確認しますか？",
        "actionLabel": "リフレッシュレートテストを実行",
        "actionHref": "/tests/refresh-rate-test"
    }
},

  "ambient-light-test": {
    "overview": "環境光センサーテストは、AmbientLightSensor APIを用いて室内の照度（ルクス・lx）をリアルタイム取得し、人間工学に基づいた最適な画面輝度設定を推奨します。",
    "whatToLookFor": [
        {
            "label": "リアルタイム照度（lx）",
            "description": "デバイス内蔵の受光センサーが捉えた環境照度を計測します。"
        },
        {
            "label": "人間工学輝度アドバイス",
            "description": "室内の明るさに応じた眼精疲労の少ない適正輝度を提案します。"
        },
        {
            "label": "グレア・映り込み警告",
            "description": "1000 lx以上の強い光環境による視認性低下リスクを判定します。"
        },
        {
            "label": "照度推移グラフ",
            "description": "照明のチラつきや外光の変動を時系列グラフで確認します。"
        }
    ],
    "canObserve": [
        "ハードウェア照度センサーによるリアルタイムのルクス値",
        "照明環境ゾーン判定（暗室、薄暗い部屋、オフィス、明るい室内、直射光）",
        "ISO規格に基づく推奨ディスプレイ輝度パーセンテージ",
        "テストセッション中の環境光推移グラフ"
    ],
    "cannotMeasure": [
        "Generic Sensor APIに対応していないブラウザでの測定",
        "RGBセンサーなしでの室内照明の色温度（ケルビン）や演色性（CRI）",
        "パネル表面に対する外光の入射角と反射ベクトル"
    ],
    "interpretation": "オフィス作業では300〜500 lxの照度に対し、画面輝度120〜150 nitsが推奨されます。50 lx未満の暗所では輝度を十分に下げて眼の負担を軽減してください。",
    "nextSteps": {
        "text": "画面の黒レベルと輝度諧調を最適化しますか？",
        "actionLabel": "輝度テストを実行",
        "actionHref": "/tests/brightness-test"
    }
},

  "dpi-calculator": {
    "overview": "DPI & PPI計算機は、画面サイズ（インチ）と解像度から画素密度（PPI）、ドットピッチ（画素間隔）、総画素数（メガピクセル）、および肉眼でドットを識別できなくなるRetina視認限界距離を算出します。",
    "whatToLookFor": [
        {
            "label": "画素密度（PPI: Pixels Per Inch）",
            "description": "対角1インチあたりの画素集積度を測定します。"
        },
        {
            "label": "ドットピッチ（画素間隔）",
            "description": "隣接するサブピクセル中心間の物理的距離をミリメートル単位で計算します。"
        },
        {
            "label": "Retina（網膜限界）視認距離",
            "description": "標準視力（1.0）の人間が画素の粒状感を識別できなくなる最適距離（60 PPD）を算出します。"
        },
        {
            "label": "画面面積と総メガピクセル",
            "description": "アスペクト比、表示有効面積、および総描画ピクセル数を計算します。"
        }
    ],
    "canObserve": [
        "算出したPPI値、ミリメートル単位のドットピッチ、総メガピクセル数",
        "センチメートルおよびインチ単位での推奨視認距離とRetina境界距離",
        "標準モニター用プリセット（24インチFHD、27インチQHD、32インチ4Kなど）",
        "スライダーによるカスタム解像度・対角サイズの即時シミュレーション"
    ],
    "cannotMeasure": [
        "入力なしでのモニター外枠ベゼルの物理寸法",
        "ノングレア（非光沢）コーティングによる光散乱・ギラつきの影響",
        "特殊アスペクト比における意図的な引き伸ばし変形"
    ],
    "interpretation": "一般的なデスクワークでは110 PPI以上で快適なテキスト視認性が得られ、220 PPIを超えると通常の作業距離（50〜60cm）で完全なRetina品質に達します。",
    "nextSteps": {
        "text": "様々なフォントサイズでの文字の鮮明さとレンダリングを確認しますか？",
        "actionLabel": "文字鮮明度テストを実行",
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

