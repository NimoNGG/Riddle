// =============================================
// ゲームのデータ
// =============================================

// 6つの手がかりのデータ
const quizzes = [
    { title: "第一の記録", question: `学舎（まなびや）と学舎を繋ぐ大いなる橋。その影となりし場所に目を向けよ。<br>異国の文字が踊る店で、春雨を用いた宴が催されている。<br>その店の品書きにこそ、賢人の言葉は隠されている。`, answer: "クロスロード", keyword: "第一の賢人の記録：場所は『3024』" },
    { title: "第二の記録", question: `森の名を冠した門をくぐり、光で作られし幻影の世界へ。<br>特殊な眼鏡をかければ、ここではないどこかへと旅立てるだろう。<br>幻影世界への案内人が持つ「許可証」に、次の言葉は記されている。`, answer: "ダイブ", keyword: "第二の賢人の記録：目指すべきは『前の扉』" },
    // ... (残りの謎データも同様に記述)
];

// シナリオのデータ（一旦ダミーテキストを入れます）
const scenarios = [
    { title: "序章：あらすじ", text: "ここに、ゲームのあらすじが入ります。未来からの緊急メッセージ、失われた天秤、そして六人の賢人について語られます。" },
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
});

// index.html の初期化
function initIndexPage() {
    const quizContainer = document.getElementById("quiz-selection");
    const solvedCount = getSolvedCount();

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

    // 機能ボタンの追加
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

// scenario.html の初期化
function initScenarioListPage() {
    const scenarioContainer = document.getElementById("scenario-selection");
    const solvedCount = getSolvedCount();

    scenarios.forEach((scenario, index) => {
        const link = document.createElement("a");
        link.innerText = scenario.title;

        // index 0 はあらすじなので常に解放
        // index 7 はクリア後シナリオ
        if (index === 0 || (index > 0 && index <= solvedCount) || (index === 7 && solvedCount >= quizzes.length)) {
             link.href = `scenario_viewer.html?id=${index}`;
        } else {
            link.classList.add("locked");
            link.onclick = (e) => e.preventDefault();
        }
        scenarioContainer.appendChild(link);
    });
}

// scenario_viewer.html の初期化
function initScenarioViewerPage() {
    const params = new URLSearchParams(window.location.search);
    const scenarioId = parseInt(params.get("id"));
    const scenarioData = scenarios[scenarioId];

    if(scenarioData) {
        document.getElementById("scenario-title").innerText = scenarioData.title;
        document.getElementById("scenario-text").innerHTML = `<p>${scenarioData.text.replace(/\n/g, '<br>')}</p>`;
    }
}


// =============================================
// ゲームの進行管理
// =============================================

// 解いた謎の数を取得
function getSolvedCount() {
    const count = localStorage.getItem('solvedQuizCount');
    return count ? parseInt(count) : 0;
}

// 解いた謎の数を保存
function setSolvedCount(count) {
    localStorage.setItem('solvedQuizCount', count);
}

// 正解判定
function checkAnswer() {
    const params = new URLSearchParams(window.location.search);
    const quizId = parseInt(params.get("q"));
    const quizIndex = quizId - 1;
    const correctAnswer = quizzes[quizIndex].answer;
    const userAnswer = document.getElementById("answerInput").value;
    const resultElement = document.getElementById("result");

    if (userAnswer === correctAnswer) {
        resultElement.innerHTML = `封印解除...！<br>賢人の記録を入手した。<br><span class="keyword">${quizzes[quizIndex].keyword}</span>`;
        
        // 解いた謎の数を更新
        const currentSolvedCount = getSolvedCount();
        if (quizId > currentSolvedCount) {
            setSolvedCount(quizId);
        }

        showSolvedState(quizzes[quizIndex]);

    } else {
        resultElement.textContent = "あいことばが違うようだ…";
    }
}

// (setupQuiz, showSolvedState, displaySummary などの既存関数はここに続きます... 
// ただし、localStorageの管理方法が変わったので注意)
// 以下、既存の関数を新しい仕様に合わせて調整したものです。

function setupQuiz() {
    // ... (この関数は変更なし)
}

function showSolvedState(quizData) {
    // ... (この関数は変更なし)
}

function displaySummary() {
    // ... (この関数は、getSolvedQuizzes を getSolvedCount に基づいて動作するように修正が必要)
}
