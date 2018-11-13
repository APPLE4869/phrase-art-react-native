export interface Phrase {
  id: string;
  group: string;
  text: string;
  author: string;
}

const phrases: Phrase[] = [
  {
    id: "1",
    group: "FAIRY TAIL",
    text: "男には二つの道しかねえのサ。ダンディに生きるか・・止まって死ぬか。",
    author: "ウォーリー"
  },
  { id: "2", group: "FAIRY TAIL", text: "この不公平な世界を知らずに生きるのは罪だ。", author: "エリゴール" },
  { id: "3", group: "FAIRY TAIL", text: "自由とは心の中にある。", author: "ロブ" },
  { id: "4", group: "FAIRY TAIL", text: "そうだよ。全ては信じる心からはじまるんだよ。", author: "ロブ" },
  {
    id: "5",
    group: "FAIRY TAIL",
    text: "人間は物事の善悪を意識し始めると思いもよらない負の感情を生む。",
    author: "パンサー・リリー ヒビキ"
  },
  {
    id: "6",
    group: "FAIRY TAIL",
    text:
      "王子・・・変化に素早く順応する必要なんてありません。もっとゆっくりでいいのです。歩くような速さでも、人はその一歩を踏み出せる。未来へと向かっていけるのです。",
    author: "パンサー・リリー"
  },
  {
    id: "7",
    group: "FAIRY TAIL",
    text: "恐怖は悪ではない。それは己れの弱さを知るという事だ。弱さを知れば人は強くも優しくもなれる。",
    author: "ギルダーツ"
  },
  {
    id: "8",
    group: "FAIRY TAIL",
    text:
      "『仲間』とは言葉だけのものではない。仲間とは心。無条件で信じられる相手。どうか私を頼ってください。私もいつかきっとあなたを頼ることがあるでしょう。",
    author: "メイビス"
  },
  {
    id: "9",
    group: "FAIRY TAIL",
    text: "生き死にだけが決着の全てじゃねえだろ？もう少し前を向いて生きろよ、オマエ等全員さ・・・",
    author: "グレイ"
  },
  {
    id: "10",
    group: "FAIRY TAIL",
    text: "おまえたちの自由は、まだ偽りの中にある。それは闇にとらわれている限り永遠にだ！！",
    author: "ジェラール"
  },
  {
    id: "11",
    group: "FAIRY TAIL",
    text:
      "国民は皆混乱している。変化する世界に素早く順応できる人間はそういない。だからこそ新しい指導者が必要となる。新しい世界の王。不安に脅える民をまとめ、皆を幸せに導く新たな王が。",
    author: "ジェラール"
  },
  {
    id: "12",
    group: "FAIRY TAIL",
    text: "世界を変えようとする意志だけが歴史を動かす事ができる！",
    author: "ジェラール"
  },
  { id: "13", group: "FAIRY TAIL", text: "あんなバカたちがいないと・・・この世界は面白くない。", author: "ジェラール" },
  {
    id: "14",
    group: "FAIRY TAIL",
    text: "人には必ず生きる意味がある。どんなに小さな事でも必ず・・・あなたには意味がある。",
    author: "ミラジェーン"
  },
  { id: "15", group: "FAIRY TAIL", text: "一人が寂しいと気づいた時、人はやさしくなれるの。", author: "ミラジェーン" },
  { id: "16", group: "FAIRY TAIL", text: "罪なんかじゃない！仲間を想う気持ちは罪なんかじゃない！", author: "ルーシィ" },
  {
    id: "17",
    group: "FAIRY TAIL",
    text: "あたしに必要なものはお金でも綺麗な洋服でもない。あたしという人格を認めてくれる場所。",
    author: "ルーシィ"
  },
  {
    id: "18",
    group: "FAIRY TAIL",
    text: "キズつけられた仲間の為に戦う！敵は人間でも悪魔でも神でも何でもいい！",
    author: "ナツ"
  },
  {
    id: "19",
    group: "FAIRY TAIL",
    text: "誰にだって未来を選ぶ資格はある。オレたちは自分で選んだ未来へ進んでいく。",
    author: "ナツ"
  },
  {
    id: "20",
    group: "FAIRY TAIL",
    text: "魔力があろうがなかろうが、大事なのは生きてるってこ事だろ！命だろーが！",
    author: "ナツ"
  },
  {
    id: "21",
    group: "FAIRY TAIL",
    text: "本当の罪は・・・眼をそらす事。誰も信じられなくなる事だァ！\r\n",
    author: "ナツ"
  },
  { id: "22", group: "FAIRY TAIL", text: "知らねえから互いに手を伸ばすんだろォ！\r\n", author: "ナツ" },
  { id: "23", group: "FAIRY TAIL", text: "死ぬことが決着かよ、あ？逃げてんじゃねえぞコラ。\r\n", author: "ナツ" },
  {
    id: "24",
    group: "FAIRY TAIL",
    text:
      "涙など虚空。人が死ぬから悲しいのか？悲しみが人を殺すのか？答えは各々の胸の奥に。誇り高きクソガキどもよ、生きよ！未来へ！\r\nカロフ",
    author: "マカロフ"
  },
  {
    id: "25",
    group: "FAIRY TAIL",
    text: "世の中には孤独を好む者もおる。しかし、孤独に耐えられる者は一人もおらん。\r\n",
    author: "マカロフ"
  },
  {
    id: "26",
    group: "FAIRY TAIL",
    text:
      "たとえ姿が見えなくとも、たとえ遠く離れていようと、ワシはいつでもおまえを見てる。おまえをずっと・・・見守っている。\r\n",
    author: "マカロフ"
  },
  {
    id: "27",
    group: "FAIRY TAIL",
    text:
      "まったく・・・不器用な奴じゃの・・・。もう少し肩の力を抜かんかい。そうすれば今まで見えなかったものが見えてくる。聞こえなかった言葉が聞こえてくる。人生はもっと楽しいぞ！\r\n",
    author: "マカロフ"
  },
  { id: "28", group: "FAIRY TAIL", text: "人間の法律で自分を守れるなどと夢々思うなよ。\r\n", author: "マカロフ" },
  {
    id: "29",
    group: "FAIRY TAIL",
    text: "自分の信じた道を進めェい！それが妖精の尻尾の魔道士じゃ！\r\n",
    author: "マカロフ"
  },
  { id: "30", group: "FAIRY TAIL", text: "理を超える力は、すべて理の中より生まれる。\r\n", author: "マカロフ" },
  {
    id: "31",
    group: "FAIRY TAIL",
    text: "この命をあきらめる事は、旅立って行った者たちへの冒涜。\r\n",
    author: "エルザ"
  },
  {
    id: "32",
    group: "FAIRY TAIL",
    text: "強くなければ生きていてはいけないのか？違うだろ！！生きていく事が強さなんだ！！\r\n",
    author: "エルザ"
  },
  {
    id: "33",
    group: "FAIRY TAIL",
    text: "弱さも恐怖も、全てを乗り越えていく。強さがある！それが生きる者だ！\r\n",
    author: "エルザ"
  },
  {
    id: "34",
    group: "FAIRY TAIL",
    text: "誰にも負けたくなければ、まずは己れの弱さを知る事だ。そして常に、優しくあれ。\r\n",
    author: "エルザ"
  },
  {
    id: "35",
    group: "FAIRY TAIL",
    text: "お前には生きる義務がある。たとえ醜くても・・・弱くても・・・必死に生き抜いて見せろ・・・\r\n",
    author: "エルザ"
  },
  {
    id: "36",
    group: "FAIRY TAIL",
    text:
      "つらい思い出は明日への糧となり、私たちを強くする。誰もがそうだ。人間にはそうできる力がある。強く歩け。私も強く歩き続ける。\r\nエルザ",
    author: "エルザ"
  },
  {
    id: "37",
    group: "FAIRY TAIL",
    text: "過去は未来に変えて歩き出すんだ。そして今日の一歩は必ず明日へと繋がる一歩となる。\r\n",
    author: "エルザ"
  },
  {
    id: "38",
    group: "FAIRY TAIL",
    text: "そうだ・・・仲間の為に死ぬのではない。仲間の為に生きるのだ。それが、幸せな未来に繋がることだから・・・\r\n",
    author: "エルザ"
  },
  {
    id: "39",
    group: "FAIRY TAIL",
    text: "自分の中の弱さや足りないものを埋めてくれるのが、仲間という存在ではないのか？\r\n",
    author: "エルザ"
  },
  { id: "40", group: "FAIRY TAIL", text: "従っても逃げても自由は手に入らない。\r\n", author: "エルザ" },
  {
    id: "41",
    group: "FAIRY TAIL",
    text: "たまにはいいじゃないか・・・自分に優しい日があっても・・・\r\n",
    author: "エルザ"
  }
];

export default phrases;
