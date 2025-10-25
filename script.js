// =============================================
// ゲームのデータ
// =============================================

// 6つの手がかりのデータ
const quizzes = [
    { title: "第一の記録", question: `学舎（まなびや）と学舎を繋ぐ大いなる橋。その影となりし場所に目を向けよ。<br>異国の文字が踊る店で、春雨を用いた宴が催されている。<br>その店の品書きにこそ、賢人の言葉は隠されている。`, answer: "クロスロード", keyword: "第一の賢人の記録：場所は『3024』" },
    { title: "第二の記録", question: `森の名を冠した門をくぐり、光で作られし幻影の世界へ。<br>特殊な眼鏡をかければ、ここではないどこかへと旅立てるだろう。<br>幻影世界への案内人が持つ「許可証」に、次の言葉は記されている。`, answer: "ダイブ", keyword: "第二の賢人の記録：目指すべきは『前の扉』" },
    { title: "第三の記録", question: `第三の学び舎にて、一瞬の時を永遠に封じ込める小部屋を探せ。<br>目映い光と共に、君の姿は一枚の紙へと転写される。<br>その小部屋を覆う帳（とばり）に、賢人の言葉は縫い付けられている。`, answer: "メモリア", keyword: "第三の賢人の記録：扉は『6回』叩け" },
    { title: "第四の記録", question: `再び、第三の学び舎へ。若きアスリートたちの汗と栄光が刻まれた壁がある。<br>数多の激戦を伝える紙の中で、最も新しき勝利の雄叫びを見つけよ。<br>その見出しこそが、次への道しるべとなる。`, answer: "ヘッドライン", keyword: "第四の賢人の記録：開門後の詠唱は『剣なき秤は無力、秤なき剣は暴力』" },
    { title: "第五の記録", question: `第五の探求の館へ向かえ。そこには富の流れと社会の理（ことわり）を追う者たちが集う。<br>彼らの英知の源たる書物、その「活動記録」と題された最初の頁に言葉は眠る。`, answer: "アセット", keyword: "第五の賢人の記録：錠の暗号は『1034』" },
    { title: "第六の記録", question: `再び、大いなる橋の影へ。冷えた体を温める湯気が立ち上る場所がある。<br>黄金の出汁に浸かる数々の宝。その中で、最も清き白亜の円が示すものこそ最後の言葉だ。`, answer: "ホット", keyword: "第六の賢人の記録：最後の行動は『天秤の傾きを等しくする』こと" }
];

// シナリオのデータ
const scenarios = [
    { title: "序章：あらすじ", text: "この記録にアクセスできた、未来の希望たる君へ。\n\n我々は崩壊しつつある未来から、最後の望みを託してこのメッセージを送っている。\n\n我らが学び舎には古より伝わる秘宝『均衡の天秤』が存在していた。だが世界の公正を司るその天秤が、とある時代に何者かによって奪われてしまった。そして今もその天秤は失われたままだ。\n\n天秤が失われたことにより、歴史の歪みは時を超えて年々大きくなり、我々の時代に修復不可能な崩壊を引き起こしている。\n\nだが最後の希望はある。我々は決死の覚悟で調査を行い、天秤が「君の時代の白門祭のどこか」に隠されていることを、確実な事実として突き止めた。\n\nなぜそれが分かったのか。それはかつて、この時代で秘密裏に調査を進めていた六人の賢人が、その在処へと繋がる手がかりを遺していたからだ。\n\nしかし、賢人たちの記録は悪しき者の手に渡らぬよう固く封印されている。それを解き明かせるのは、正義の心と叡智を兼ね備えた者…そう、このメッセージを読んでいる君のような人物しかいない。\n\n未来を救うという、あまりにも大きな使命を託すことを許してほしい。\nだが、どうか賢人たちの手がかりを見つけ出し、失われた天秤を取り戻してくれ！" },
    { title: "第一章：賢人の影", text: "ここに、第一の手がかりを解いた後のシナリオが入ります。最初の賢人が遺した記録の意味が少しだけ明らかになります。" },
    { title: "第二章：幻影の導き", text: "ここに、第二の手がかりを解いた後のシナリオが入ります。" },
    { title: "第三章：記憶の欠片", text: "ここに、第三の手がかりを解いた後のシナリオが入ります。" },
    { title: "第四章：勝利の代償", text: "ここに、第四の手がかりを解いた後のシナリオが入ります。" },
    { title: "第五章：富の在処", text: "ここに、第五の手がかりを解いた後のシナリオが入ります。" },
    { title: "第六章：最後の封印", text: "ここに、第六の手がかりを解いた後のシナリオが入ります。" },
    { title: "終章：未来への選択", text: "ここに、すべての謎を解き明かした後のシナリオが入ります。天秤の真実と、君がすべき最後の行動が示されます。" }
];


// =============================================
// ページの初期化処理
// =============================================

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("quiz-selection")) { initIndexPage(); }
    if (document.getElementById("scenario-selection")) { initScenarioListPage(); }
    if (document.getElementById("scenario-title")) { initScenarioViewerPage(); }
    if (document.getElementById("quizTitle")) { setupQuiz(); }
    if (document.getElementById("summary-list")) { displaySummary(); }
});

function initIndexPage() {
    const quizContainer = document.getElementById("quiz-selection");
    if (!quizContainer) return;
    const solvedCount = getSolvedCount();
    quizContainer.innerHTML = ''; // コンテナを初期化
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
    scenarioContainer.innerHTML = ''; // コンテナを初期化
    scenarios.forEach((scenario, index) => {
        const link = document.createElement("a");
        link.innerText = scenario.title;
        if (index === 0 || (index > 0 && index <= solvedCount + 1) || (index === scenarios.length - 1 && solvedCount >= quizzes.length)) {
             link.href = `scenario_viewer.html?id=${index}`;
        } else {
            link.classList.add("locked");
            link.onclick = (e) => e.preventDefault();
        }
        scenarioContainer.appendChild(link);
    });
}

function initScenarioViewerPage() {
    const params = new URLSearchParams(window.location.search);
    const scenarioId = parseInt(params.get("id"));
    const scenarioData = scenarios[scenarioId];
    if(scenarioData) {
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
        resultElement.innerHTML = `封印解除...！<br>賢人の記録を入手した。<br><span class="keyword">${quizzes[quizIndex].keyword}</span>`;
        const currentSolvedCount = getSolvedCount();
        if (quizId > currentSolvedCount) {
            setSolvedCount(quizId);
        }
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
    resultElement.innerHTML = `記録解放済み：<br><span class="keyword">${quizData.keyword}</span>`;
    resultElement.style.color = "#4a3d2b";
}

function displaySummary() {
    const summaryContainer = document.getElementById("summary-list");
    if (!summaryContainer) return;
    const solvedCount = getSolvedCount();
    summaryContainer.innerHTML = ''; // コンテナを初期化

    quizzes.forEach((quiz, index) => {
        const summaryItem = document.createElement("div");
        summaryItem.classList.add("summary-item");
        let contentHTML;
        if (index < solvedCount) {
            summaryItem.classList.add("solved");
            contentHTML = `<h3>${quiz.title}</h3><p>${quiz.keyword}</p>`;
        } else {
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
