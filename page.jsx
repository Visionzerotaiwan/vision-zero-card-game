"use client";

import React, { useMemo, useState } from "react";

const COLORS = {
  dark: "#343537",
  sage: "#d4d5c3",
  paper: "#f9f8f7",
  lime: "#e5e76f",
};

const chanceCards = [
  { id: 1, type: "對／錯題", title: "Q1", question: "遇到交通事故，我們只能自認倒霉，因為這都是無法避免的「意外」。", answer: "錯。多數交通事故可以透過道路設計、速度管理、執法與教育降低風險。", points: "+2分" },
  { id: 2, type: "對／錯題", title: "Q2", question: "「交通零死亡願景」的意思是，為了不要有人受傷，我們應該禁止所有人在路上開車。", answer: "錯。Vision Zero 的核心是讓交通系統不再造成死亡與重傷，不是禁止所有人開車。", points: "+2分" },
  { id: 3, type: "對／錯題", title: "Q3", question: "就算是再厲害的司機，也有可能會不小心犯錯。", answer: "對。人都會犯錯，所以道路系統應該設計成即使犯錯也不致死亡或重傷。", points: "+2分" },
  { id: 4, type: "對／錯題", title: "Q4", question: "想要讓車子在學校附近開慢一點，只要在地上畫一個大大的「30」，就絕對有效了。", answer: "錯。標線提醒有幫助，但仍需搭配道路窄化、減速平台、路口設計與執法等措施。", points: "+2分" },
  { id: 5, type: "對／錯題", title: "Q5", question: "馬路就是越寬越好？", answer: "錯。過寬道路會提高車速、增加穿越距離，對行人與弱勢用路人更危險。", points: "+2分" },
  { id: 6, type: "對／錯題", title: "Q6", question: "在馬路上，每個人都應該平等。真正的交通平權，是讓不開車的人也能安全移動。", answer: "對。交通平權重視所有人的安全與移動需求，包含行人、兒童、高齡者、身障者與公共運輸使用者。", points: "+2分" },
  { id: 7, type: "對／錯題", title: "Q7", question: "將筆直的車道改成「彎曲的車道」，會讓車子開得更快更危險。", answer: "錯。適度彎曲、窄化或視覺減速設計，通常可讓駕駛降低速度。", points: "+2分" },
  { id: 8, type: "對／錯題", title: "Q8", question: "減少交通事故，不僅可以保護生命，還能幫國家省下龐大的醫療費用和救護資源。", answer: "對。交通安全改善可降低醫療、救護、照護與社會成本。", points: "+2分" },
  { id: 9, type: "對／錯題", title: "Q9", question: "在一些特別保護行人和兒童的街道，為求安全，車輛的速限甚至可以規定在時速 15 公里。", answer: "對。部分行人優先、校園周邊或生活街道可採更低速限與減速設計。", points: "+2分" },
  { id: 10, type: "對／錯題", title: "Q10", question: "把城市裡本來給汽車走的空間，分一些出來種樹和拓寬人行道，這樣夏天出門走路時會比較涼快，還能對抗地球暖化。", answer: "對。樹蔭、人行空間與減少車流可降低熱島效應，也有助於低碳移動。", points: "+2分" },
  { id: 11, type: "對／錯題", title: "Q11", question: "如果城市天天塞車，解決塞車最好的辦法就是「把馬路越蓋越寬」，這樣大家開車就會很順暢，排出的廢氣也會減少。", answer: "錯。道路越蓋越寬常會誘發更多車流，長期不一定能解決塞車。", points: "+2分" },
  { id: 12, type: "對／錯題", title: "Q12", question: "老人家過馬路特別危險，都是因為他們常常「不看路亂走」，所以只要多處罰他們，就能減少高齡者車禍。", answer: "錯。高齡者需要更安全的穿越時間、庇護島、無障礙設計與降速環境。", points: "+2分" },
  { id: 13, type: "選擇題", title: "Q13", question: `「交通零死亡願景」的最終目標是什麼？
(A) 讓車子開得越快越好
(B) 世界上沒有人會因為使用道路而重傷或死亡
(C) 大家都不要出門就沒事了`, answer: "B。目標是沒有人因使用道路而死亡或重傷。", points: "+5分" },
  { id: 14, type: "選擇題", title: "Q14", question: `根據研究，如果車子的時速降低到幾公里以下，行人被撞到的死亡率可以降到 10%？
(A) 30 公里
(B) 60 公里
(C) 100 公里`, answer: "A。時速越低，碰撞造成死亡或重傷的機率越低。", points: "+5分" },
  { id: 15, type: "選擇題", title: "Q15", question: `以下哪一種道路設計，可以有效幫助車子減速、保護行人？
(A) 把馬路蓋得無限寬敞
(B) 設置實體減速平台（讓斑馬線凸起來跟人行道一樣高）
(C) 拆掉所有的紅綠燈`, answer: "B。實體減速平台能迫使車輛降低速度，也讓行人更容易被看見。", points: "+5分" },
  { id: 16, type: "選擇題", title: "Q16", question: `在馬路上，誰是最需要被特別保護的「脆弱道路使用者」？
(A) 開大卡車的司機
(B) 開警堅固跑車的人
(C) 兒童、長輩和需要使用行動輔具（如輪椅）的人`, answer: "C。兒童、高齡者、身障者等更容易在事故中受傷，應優先被保護。", points: "+5分" },
  { id: 17, type: "選擇題", title: "Q17", question: `很多歐洲國家把市區的最高速限改為時速 30 公里，這樣做有什麼好處？
(A) 可以讓城市變得更安靜，並鼓勵大家多走路或騎腳踏車
(B) 會讓空氣變得更糟
(C) 讓大家上班一定會遲到`, answer: "A。降速能降低噪音與事故風險，也讓步行與騎車更舒適。", points: "+5分" },
  { id: 18, type: "選擇題", title: "Q18", question: `「人本交通」的核心理念是什麼？
(A) 以「車子」好不好開為第一優先
(B) 以「人」的安全和需求為第一優先
(C) 以「馬路」蓋得多不多為第一優先`, answer: "B。人本交通以人的安全、可及性與生活需求為核心。", points: "+5分" },
  { id: 19, type: "選擇題", title: "Q19", question: `有些地方的斑馬線（行穿線）會做得跟人行道一樣高，請問為什麼？
(A) 為了讓馬路看起來比較酷
(B) 迫使車輛經過路口時必須減速
(C) 為了讓車子可以飛起來`, answer: "B。抬高行穿線可降低車速、提高行人可見性。", points: "+5分" },
  { id: 20, type: "選擇題", title: "Q20", question: `為什麼有些國家嚴格規定，斑馬線（路口）的前後 10 公尺內，絕對不可以讓停車格，也不准停車？
(A) 因為怕車子停太久會壞掉
(B) 為了防止違規停車擋住駕駛的視線，造成看不到過馬路小孩的「視覺死角」
(C) 為了讓警察有比較大的空間可以站著開罰單`, answer: "B。路口淨空可減少視覺死角，讓駕駛與行人都更容易看見彼此。", points: "+5分" },
  { id: 21, type: "選擇題", title: "Q21", question: `台灣已經進入「超高齡社會」，為了保護阿公阿嬤變成安全的糖酥奶奶，以下哪一種道路設計「最好有幫助」？
(A) 將馬路線的位置往後退，讓馬路變斜，讓轉彎的車子可以正面看到行人
(B) 在馬路正中央設置「行人庇護島」
(C) 把紅綠燈的標示字體變小，訓練他們的眼力`, answer: "B。行人庇護島能讓長者分段穿越，降低一次穿越太長距離的風險。", points: "+5分" },
  { id: 22, type: "選擇題", title: "Q22", question: `如果我們想減少交通帶來的碳排放，對抗地球暖化，最有效的其中一種策略是什麼？
(A) 鼓勵大家換成電動車，然後繼續蓋更多的高速公路給車走
(B) 把街道空間給人，打造完善的人行道和腳踏車道，讓人們願意改變出門的方式
(C) 規定大家每天只能出門一次`, answer: "B。改善步行、腳踏車與公共運輸環境，可降低汽機車依賴。", points: "+5分" },
  { id: 23, type: "選擇題", title: "Q23", question: `為什麼現在城市的街道上，大部分的空間都是給汽車用的，而人行道卻常常被切得碎碎的、小小的？
(A) 因為法律規定汽車本來就比較尊貴
(B) 因為過去幾十年的城市規劃，都以「車子好不好開」為第一優先，忽略了人的需求
(C) 因為喜歡走路的人本來就比較少`, answer: "B。過去以車為本的規劃，壓縮了行人與公共生活空間。", points: "+5分" },
  { id: 24, type: "選擇題", title: "Q24", question: `如果路上有人走在沒有人行道的馬路邊緣，不小心被車撞到了，新聞常常會說「是因為行人穿深色衣服」。但如果我們問：「在根本沒有退路時，最有效的方法是什麼？」
(A) 規定大家晚上出門只能穿會發光的螢光色衣服
(B) 蓋一條明亮、有實體分隔的安全人行道，讓行人不用走在車道邊緣
(C) 規定沒有開車的人，天黑之後就不能出門`, answer: "B。真正有效的是提供安全、連續、明亮且受保護的行人空間。", points: "+5分" },
  { id: 25, type: "選擇題", title: "Q25", question: `我們每天上下學、去便利商店都會經過的「街道」，除了用來讓汽車和機車開過去之外，它還應該具備重要的功能應該是什麼？
(A) 只能用來當作免費的停車場，停放大家的車子
(B) 是一座城市的「公共空間」，讓大家可以安全地散步、買東西，甚至遇到鄰居可以停下來聊天
(C) 是專門設計給賽車手練習飆車的場地`, answer: "B。街道也是公共生活空間，應兼顧安全、社交、商業與日常移動。", points: "+5分" },
];

function pickRandomCard(excludeId) {
  const pool = chanceCards.filter((card) => card.id !== excludeId);
  if (pool.length === 0) return chanceCards[0];
  return pool[Math.floor(Math.random() * pool.length)];
}

function getPointValue(card) {
  const matched = card.points.match(/\d+/);
  return matched ? Number(matched[0]) : 0;
}

function BrandLogo() {
  return (
    <div className="brandLogo">
      <div className="logoMark">
        <div className="logoCurve" />
        <div className="logoDot" />
      </div>
      <div className="logoText">
        <div>VISION</div>
        <div>ZERO</div>
        <strong>TAIWAN</strong>
        <span>還路於民</span>
      </div>
    </div>
  );
}

function MiniCard({ card }) {
  return (
    <div className="miniCard">
      <div>
        <strong>{card.title}</strong>
        <small>{card.type}</small>
      </div>
      <span>{card.points}</span>
    </div>
  );
}

export default function Page() {
  const [currentCard, setCurrentCard] = useState(chanceCards[0]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [drawCount, setDrawCount] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [hasScoredCurrentCard, setHasScoredCurrentCard] = useState(false);
  const [history, setHistory] = useState([]);

  const currentPointValue = useMemo(() => getPointValue(currentCard), [currentCard]);

  const drawCard = () => {
    const nextCard = pickRandomCard(currentCard.id);
    setCurrentCard(nextCard);
    setShowAnswer(false);
    setHasScoredCurrentCard(false);
    setDrawCount((count) => count + 1);
    setHistory((items) => [nextCard, ...items].slice(0, 5));
  };

  const resetGame = () => {
    setCurrentCard(chanceCards[0]);
    setShowAnswer(false);
    setDrawCount(0);
    setTotalScore(0);
    setHasScoredCurrentCard(false);
    setHistory([]);
  };

  const clearHistory = () => setHistory([]);

  const addCurrentScore = () => {
    if (hasScoredCurrentCard) return;
    setTotalScore((score) => score + currentPointValue);
    setHasScoredCurrentCard(true);
  };

  return (
    <main className="page">
      <div className="backgroundShape topGradient" />
      <div className="backgroundCircle" />
      <div className="backgroundStripe" />

      <div className="container">
        <header className="header">
          <BrandLogo />
          <div className="titleBlock">
            <p>第三屆縣市串連散步節—台北場</p>
            <h1>還路於民大富翁</h1>
            <span>抽卡挑戰｜行人安全｜從你我開始</span>
          </div>
          <div className="scoreBox">
            <small>TOTAL SCORE</small>
            <strong>{totalScore}</strong>
            <span>目前總分</span>
          </div>
        </header>

        <section className="layout">
          <aside className="sidePanel">
            <div className="location">
              <strong>LOCATION</strong>
              <span>大稻埕碼頭廣場</span>
            </div>

            <div className="howTo">
              <strong>HOW TO PLAY</strong>
              <ol>
                <li><b>1</b> 點擊抽卡，抽出一張交通挑戰卡。</li>
                <li><b>2</b> 民眾回答對／錯題或選擇題。</li>
                <li><b>3</b> 工作人員按顯示答案，答對即可加分。</li>
              </ol>
            </div>

            <div className="smallScore">
              <small>CURRENT</small>
              <strong>{totalScore}</strong>
              <span>目前總分</span>
            </div>
          </aside>

          <section className="cardArea">
            <div className="cardMeta">
              <span className="pill dark">{currentCard.type}</span>
              <span className="pill lime">{currentCard.points}</span>
            </div>

            <div className="questionCard">
              <div className="questionHeader">
                <div className="questionNumber">{currentCard.title}</div>
                <div>
                  <small>TRAFFIC CHALLENGE CARD</small>
                  <strong>{currentCard.type}｜{currentCard.points}</strong>
                </div>
              </div>

              <p>{currentCard.question}</p>
            </div>

            {showAnswer && (
              <div className="answerBox">
                <strong>🏆 參考答案／工作人員提示</strong>
                <p>{currentCard.answer}</p>
              </div>
            )}
          </section>

          <aside className="controlPanel">
            <button className="primaryButton" onClick={drawCard}>🎲 抽一張卡</button>
            <button className="outlineButton" onClick={() => setShowAnswer((value) => !value)}>
              {showAnswer ? "🙈 隱藏答案" : "👀 顯示答案"}
            </button>
            <button className="scoreButton" onClick={addCurrentScore} disabled={hasScoredCurrentCard}>
              {hasScoredCurrentCard ? "本題已加分" : `➕ 答對加 ${currentPointValue} 分`}
            </button>
            <button className="darkButton" onClick={resetGame}>↻ 重新開始</button>

            <div className="historyBox">
              <div className="historyTitle">
                <strong>最近抽過</strong>
                <button onClick={clearHistory}>清除</button>
              </div>

              {history.length === 0 ? (
                <p className="empty">尚未開始抽卡</p>
              ) : (
                <div className="historyList">
                  {history.map((card, index) => (
                    <MiniCard key={`${card.id}-${index}`} card={card} />
                  ))}
                </div>
              )}
            </div>

            <div className="tipBox">
              <strong>現場使用建議</strong>
              <p>平板橫放或直放皆可。先按「抽一張卡」，讓民眾回答後，再按「顯示答案」確認；答對時按「答對加分」，系統會自動累計總分。</p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
