// =============================================
// ゲームのデータ
// =============================================
const quizzes = [
    { title: "第一の記録", question: `学舎（まなびや）と学舎を繋ぐ大いなる橋。その影となりし場所に目を向けよ。<br>異国の文字が踊る店で、春雨を用いた宴が催されている。<br>その店の品書きにこそ、賢人の言葉は隠されている。`, answer: "クロスロード", keyword: "『3204』に向かえ" },
    { title: "第二の記録", question: `森の名を冠した門をくぐり、光で作られし幻影の世界へ。<br>特殊な眼鏡をかければ、ここではないどこかへと旅立てるだろう。<br>幻影世界への案内人が持つ「許可証」に、次の言葉は記されている。`, answer: "ダイブ", keyword: "管理者を『番人』と呼び声をかけろ" },
    { title: "第三の記録", question: `第三の学び舎にて、一瞬の時を永遠に封じ込める小部屋を探せ。<br>目映い光と共に、君の姿は一枚の紙へと転写される。<br>その小部屋を覆う帳（とばり）に、賢人の言葉は縫い付けられている。`, answer: "メモリア", keyword: "自身のことを『革命家』と名乗れ" },
    { title: "第四の記録", question: `再び、第三の学び舎へ。若きアスリートたちの汗と栄光が刻まれた壁がある。<br>数多の激戦を伝える紙の中で、最も新しき勝利の雄叫びを見つけよ。<br>その見出しこそが、次への道しるべとなる。`, answer: "ヘッドライン", keyword: "あいことばは『正義の均衡をもう一度』" },
    { title: "第五の記録", question: `第五の探求の館へ向かえ。そこには富の流れと社会の理（ことわり）を追う者たちが集う。<br>彼らの英知の源たる書物、その「活動記録」と題された最初の頁に言葉は眠る。`, answer: "アセット", keyword: "錠の暗号は『1034』" },
    { title: "第六の記録", question: `再び、大いなる橋の影へ。冷えた体を温める湯気が立ち上る場所がある。<br>黄金の出汁に浸かる数々の宝。その中で、最も清き白亜の円が示すものこそ最後の言葉だ。`, answer: "ホット", keyword: "『天秤の傾きを等しくする』行動をとれ" }
];
const scenarios = [
    { title: "序章：あらすじ", text: "この記録にアクセスできた、未来の希望たる君へ。\n我々は崩壊しつつある未来から、最後の望みを託してこのメッセージを送っている。\n我らが学び舎には古より伝わる秘宝『均衡の天秤』が存在していた。だが世界の公正を司るその天秤が、とある時代に何者かによって奪われてしまった。そして今もその天秤は失われたままだ。\n天秤が失われたことにより、歴史の歪みは時を超えて年々大きくなり、我々の時代に修復不可能な崩壊を引き起こしている。\nだが最後の希望はある。我々は決死の覚悟で調査を行い、天秤が「君の時代の白門祭のどこか」に隠されていることを、確実な事実として突き止めた。\nなぜそれが分かったのか。それはかつて、この時代で秘密裏に調査を進めていた六人の賢人が、その在処へと繋がる手がかりを遺していたからだ。\nしかし、賢人たちの記録は悪しき者の手に渡らぬよう固く封印されている。それを解き明かせるのは、正義の心と叡智を兼ね備えた者…そう、このメッセージを読んでいる君のような人物しかいない。\n未来を救うという、あまりにも大きな使命を託すことを許してほしい。\nだが、どうか賢人たちの手がかりを見つけ出し、失われた天秤を取り戻してくれ！" },
    { title: "第一章：賢人の影", text: "君が最初の記録を解読してくれたおかげで、我々の時代の崩壊が僅かに緩やかになった。感謝する。\n第一の賢人が遺した記録によれば、当時の学び舎では「正義」の名の下に個性を抑圧する、冷たい規則だけが蔓延していたという。学生たちの探求心は色褪せ、ただ従順であることだけが求められる日々。その淀んだ空気に、敢然と反旗を翻した者たちがいた。彼らは現状を変えるべく、白門祭の喧騒の裏で密に行動を開始したのだ。賢人は彼らの理想に共感しつつも、その過激化を危惧し、多大な犠牲を払いながら彼らの拠点とされる場所を突き止めた。それが君が手にした最初の数字だ。" },
    { title: "第二章：番人の葛藤", text: "記録を辿ると、反発した者たちの苦悩が見えてくる。彼らは決して悪ではなかった。むしろ、誰よりも強く本来あるべき正義の姿を渇望していたのだ。議論は夜を徹して繰り返され、葛藤の末に彼らは、大学に警鐘を鳴らすため『均衡の天秤』を盗み出すという、後戻りのできない決断を下す。だが、彼らが手にした時、天秤はすでにその輝きを失い、僅かに傾いていたという。世界の歪みは、彼らが行動を起こすずっと前から始まっていたのだ。これ以上の歪みを防ぎ、真の継承者が現れるまで天秤を守る。そう誓った彼らは、歴史の影で『番人』と呼ばれる存在となった。" },
    { title: "第三章：革命家を待ち望んで", text: "番人たちは、天秤を永遠に私物化するつもりはなかった。彼らが待ち望んでいたのは、腐敗した正義を打ち破り、新たな時代を築く強い意志と実行力を持つ者…すなわち『革命家』の出現だ。それは、ただ現状を破壊する者ではない。過去を敬い、未来を憂い、そして何より、真の正義のために自らを顧みない覚悟を持つ者。君が自らをそう名乗るのなら、彼らは君に時代の未来を託すに値するか、次なる試練を課すだろう。その資格があることを、行動で示してほしい。" },
    { title: "第四章：原初への回帰", text: "革命家に求められる資質、それは破壊ではない。失われたものを取り戻し、未来へ繋ぐ力だ。番人たちが真に望んだのは、創設者たちが掲げた原初の理念…『正義の均衡をもう一度』取り戻すことだった。いつからか忘れ去られてしまった、自由闊達な議論と、多様な価値観を認め合う寛容さ。形骸化した規則ではなく、学生一人ひとりの心の中に真の正義が息づく学び舎を未来へ遺すことこそ、彼らが天秤に託した悲願だったのだ。" },
    { title: "第五章：テミスの試練", text: "番人たちは、革命家を名乗る者が本当にその資格を持つか見極めるため、最後の試練を用意した。原初の正義の象徴であり、法を司る女神『テミス』。彼女が持つ天秤は、権力にも富にも決して揺らぐことはない。その名を冠した鍵は、見せかけの正義に惑わされぬ、曇りなき眼を持つ者にしか解き明かせないのだ。多くの偽りの革命家がこの試練の前に敗れ去ったと聞く。君がその暗号を解いたのなら、天秤への道はもうすぐだ。" },
    { title: "第六章：最後の行動", text: "すべての試練を乗り越えた君に、番人たちは最後の問いを投げかける。天秤の前に立った時、君はどう行動するのか。力で支配するのか、知恵で導くのか、それとも…。真に世界の均衡を願う者ならば、自ずと答えは分かるはずだ。もし君が天秤の歪みを正し、その傾きを等しくすることができたなら、その時こそ君は真の革命家…『正義を革命せし者』として歴史に認められるだろう。未来は、君の最後の選択にかかっている。" },
    { title: "終章：未来への選択", text: "君の行動により、天秤はついにその輝きを取り戻した。…こちらでも、未来の崩壊が完全に停止したのを確認した。本当に、ありがとう。君は我々の世界を、そして学び舎の未来を救ってくれたのだ。だが、物語はこれで終わりではない。取り戻された均衡は、脆く儚いガラス細工のようなものだ。それを守り続けるのは、未来からの干渉者である我々ではなく、いつの時代も「今」を生きる君たち自身なのだ。どうか、その胸にある正義の心を忘れず、輝かしい未来を歩んでほしい。我々は、君の時代の行く末を見守っている。" }
];
const FINAL_KEYWORD = "正義を革命せし者";

// =============================================
// ページの初期化処理
// =============================================
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("quiz-selection")) { initIndexPage(); }
    if (document.getElementById("scenario-selection")) { initScenarioListPage(); }
    if (document.getElementById("scenario-title")) { initScenarioViewerPage(); }
    if (document.getElementById("quizTitle")) { setupQuiz(); }
    if (document.getElementById("summary-list")) { displaySummary(); }
    if (document.getElementById("finalAnswerInput")) { /* final_keyword.html用の処理 */ }
});

function initIndexPage() {
    const quizContainer = document.getElementById("quiz-selection");
    if (!quizContainer) return;
    const solvedCount = getSolvedCount();
    quizContainer.innerHTML = '';
    quizzes.forEach((quiz, index) => {
        const link = document.createElement("a");
        link.innerText = quiz.title;
        if (index <= solvedCount) {
            link.href = `quiz.html?q=${index + 1}`;
        } else {
            link.classList.add("locked");
            link.onclick = (e) => e.preventDefault();
        }
        quizContainer.appendChild(link);
    });
    const summaryLink = document.createElement("a");
    summaryLink.href = "summary.html";
    summaryLink.className = "summary-link";
    summaryLink.innerText = "手がかりを一覧で見る";
    quizContainer.appendChild(summaryLink);
    const mapLink = document.createElement("a");
    mapLink.href = "map.html";
    mapLink.className = "map-link";
    mapLink.innerText = "探索マップを確認する";
    quizContainer.appendChild(mapLink);
}

function initScenarioListPage() {
    const scenarioContainer = document.getElementById("scenario-selection");
    if (!scenarioContainer) return;
    const solvedCount = getSolvedCount();
    scenarioContainer.innerHTML = '';
    scenarios.forEach((scenario, index) => {
        const link = document.createElement("a");
        link.innerText = scenario.title;
        let isUnlocked = false;
        if (index === scenarios.length - 1) {
            if (solvedCount >= quizzes.length) {
                isUnlocked = true;
                link.href = `final_keyword.html`;
            }
        } else if (index <= solvedCount) {
            isUnlocked = true;
            link.href = `scenario_viewer.html?id=${index}`;
        }
        if (isUnlocked) {
            scenarioContainer.appendChild(link);
        } else {
            link.classList.add("locked");
            link.onclick = (e) => e.preventDefault();
            scenarioContainer.appendChild(link);
        }
    });
}

function initScenarioViewerPage() {
    const params = new URLSearchParams(window.location.search);
    const scenarioId = parseInt(params.get("id"));
    const scenarioData = scenarios[scenarioId];
    if (scenarioData) {
        document.getElementById("scenario-title").innerText = scenarioData.title;
        document.getElementById("scenario-text").innerHTML = `<p>${scenarioData.text.replace(/\n/g, '<br><br>')}</p>`;
    }
}

// =============================================
// ゲームの進行管理
// =============================================
function getSolvedCount() {
    const count = localStorage.getItem('solvedQuizCount');
    return count ? parseInt(count) : 0;
}

function setSolvedCount(count) {
    localStorage.setItem('solvedQuizCount', count);
}

function checkAnswer() {
    const params = new URLSearchParams(window.location.search);
    const quizId = parseInt(params.get("q"));
    const quizIndex = quizId - 1;
    const correctAnswer = quizzes[quizIndex].answer;
    const userAnswer = document.getElementById("answerInput").value;
    const resultElement = document.getElementById("result");

    if (userAnswer === correctAnswer) {
        const currentSolvedCount = getSolvedCount();
        let resultMessage = `封印解除...！<br>賢人の記録を入手した。<br>`;
        if (quizId > currentSolvedCount) {
            resultMessage += `新たな物語が解放された。<br>`;
            setSolvedCount(quizId);
        }
        resultMessage += `<span class="keyword">${quizzes[quizIndex].keyword}</span>`;
        resultElement.innerHTML = resultMessage;
        
        showSolvedState(quizzes[quizIndex]);

    } else {
        resultElement.textContent = "あいことばが違うようだ…";
        resultElement.style.color = "red";
    }
}

function setupQuiz() {
    const params = new URLSearchParams(window.location.search);
    const quizId = parseInt(params.get("q"));
    const quizIndex = quizId - 1;
    const quizData = quizzes[quizIndex];
    if (quizData) {
        document.getElementById("quizTitle").innerText = quizData.title;
        document.getElementById("quizQuestion").innerHTML = quizData.question;
        const solvedCount = getSolvedCount();
        if (quizId <= solvedCount) {
            showSolvedState(quizData);
        }
    }
}

function showSolvedState(quizData) {
    const answerInput = document.getElementById("answerInput");
    const submitButton = document.querySelector("button");
    const resultElement = document.getElementById("result");
    answerInput.style.display = "none";
    submitButton.style.display = "none";
    
    // ページを再読み込みした場合は、正解時のメッセージではなく、シンプルな「解放済み」メッセージを表示
    if (resultElement.innerHTML.includes('封印解除')) {
        // 正解直後なので何もしない
    } else {
        resultElement.innerHTML = `記録解放済み：<br><span class="keyword">${quizData.keyword}</span>`;
    }
    resultElement.style.color = "#4a3d2b";
}


function displaySummary() {
    const summaryContainer = document.getElementById("summary-list");
    if (!summaryContainer) return;
    const solvedCount = getSolvedCount();
    summaryContainer.innerHTML = '';
    quizzes.forEach((quiz, index) => {
        const summaryItem = document.createElement("div");
        summaryItem.classList.add("summary-item");
        let contentHTML;
        // ★★★ ここが今回の修正箇所です ★★★
        const titleParts = ["第一の賢人の記録", "第二の賢人の記録", "第三の賢人の記録", "第四の賢人の記録", "第五の賢人の記録", "第六の賢人の記録"];
        
        if (index < solvedCount) {
            summaryItem.classList.add("solved");
            // `<h3>`には賢人の記録タイトルを、`<p>`にはキーワード本文を表示
            contentHTML = `<h3>${titleParts[index]}</h3><p>${quiz.keyword}</p>`;
        } else {
            // 未解答の場合は、謎のタイトルを表示
            contentHTML = `<h3>${quiz.title}</h3><p>--- LOCKED ---</p>`;
        }
        summaryItem.innerHTML = contentHTML;
        summaryContainer.appendChild(summaryItem);
    });
    if (solvedCount >= quizzes.length) {
        const finalMessage = document.createElement("div");
        finalMessage.classList.add("final-message");
        finalMessage.innerText = "この手がかりをもとに、失われた天秤を探しに行こう";
        summaryContainer.parentNode.appendChild(finalMessage);
    }
}

function checkFinalKeyword() {
    const userAnswer = document.getElementById("finalAnswerInput").value;
    const resultElement = document.getElementById("result");
    if (userAnswer === FINAL_KEYWORD) {
        window.location.href = `scenario_viewer.html?id=${scenarios.length - 1}`;
    } else {
        resultElement.textContent = "言葉が違う…天秤はまだ君を認めていない。";
        resultElement.style.color = "red";
    }
}

