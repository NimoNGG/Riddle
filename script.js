// 6つの手がかりと、あいことば、答えを設定
const quizzes = [
    { title: "第一の手がかり", question: `学舎（まなびや）と学舎を繋ぐ大いなる橋。その影となりし場所に目を向けよ。<br>異国の文字が踊る店で、春雨を用いた宴が催されている。<br>その店の品書きにこそ、賢人の言葉は隠されている。`, answer: "クロスロード", keyword: "第一の賢人の記録：場所は『3204』" },
    { title: "第二の手がかり", question: `森の名を冠した門をくぐり、光で作られし幻影の世界へ。<br>特殊な眼鏡をかければ、ここではないどこかへと旅立てるだろう。<br>幻影世界への案内人が持つ「許可証」に、次の言葉は記されている。`, answer: "ダイブ", keyword: "第二の賢人の記録：目指すべきは『前の扉』" },
    { title: "第三の手がかり", question: `第三の学び舎にて、一瞬の時を永遠に封じ込める小部屋を探せ。<br>目映い光と共に、君の姿は一枚の紙へと転写される。<br>その小部屋を覆う帳（とばり）に、賢人の言葉は縫い付けられている。`, answer: "メモリア", keyword: "第三の賢人の記録：扉は『6回』叩け" },
    { title: "第四の手がかり", question: `再び、第三の学び舎へ。若きアスリートたちの汗と栄光が刻まれた壁がある。<br>数多の激戦を伝える紙の中で、最も新しき勝利の雄叫びを見つけよ。<br>その見出しこそが、次への道しるべとなる。`, answer: "ヘッドライン", keyword: "第四の賢人の記録：開門の詠唱は『剣なき秤は無力、秤なき剣は暴力』" },
    { title: "第五の手がかり", question: `第五の探求の館へ向かえ。そこには富の流れと社会の理（ことわり）を追う者たちが集う。<br>彼らの英知の源たる書物、その「活動記録」と題された最初の頁に言葉は眠る。`, answer: "アセット", keyword: "第五の賢人の記録：錠の暗号は『1034』" },
    { title: "第六の手がかり", question: `再び、大いなる橋の影へ。冷えた体を温める湯気が立ち上る場所がある。<br>黄金の出汁に浸かる数々の宝。その中で、最も清き白亜の円が示すものこそ最後の言葉だ。`, answer: "ホット", keyword: "第六の賢人の記録：最後の行動は『天秤の傾きを等しくする』こと" }
];

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("quizTitle")) { setupQuiz(); }
    if (document.getElementById("summary-list")) { displaySummary(); }
    // ★★★ あらすじ開閉ボタンの機能を追加 ★★★
    const synopsisBtn = document.getElementById('toggle-synopsis-btn');
    const synopsisContent = document.getElementById('synopsis-content');
    if (synopsisBtn && synopsisContent) {
        synopsisBtn.addEventListener('click', () => {
            const isOpen = synopsisContent.classList.contains('is-open');
            if (isOpen) {
                synopsisContent.classList.remove('is-open');
                synopsisBtn.textContent = '〜 あらすじを見る 〜';
            } else {
                synopsisContent.classList.add('is-open');
                synopsisBtn.textContent = '〜 あらすじを閉じる 〜';
            }
        });
    }
});
function getSolvedQuizzes() { const solved = localStorage.getItem('solvedQuizzes'); return solved ? JSON.parse(solved) : []; }
function setupQuiz() {
    const params = new URLSearchParams(window.location.search); const quizId = parseInt(params.get("q"));
    const quizIndex = quizId - 1; const quizData = quizzes[quizIndex];
    if (quizData) {
        document.getElementById("quizTitle").innerText = quizData.title; document.getElementById("quizQuestion").innerHTML = quizData.question;
        const solvedQuizzes = getSolvedQuizzes(); if (solvedQuizzes.includes(quizId)) { showSolvedState(quizData); }
    } else { document.getElementById("quizTitle").innerText = "エラー"; document.getElementById("quizQuestion").innerText = "指定された手がかりは存在しません。"; }
}
function checkAnswer() {
    const params = new URLSearchParams(window.location.search); const quizId = parseInt(params.get("q"));
    const quizIndex = quizId - 1; const correctAnswer = quizzes[quizIndex].answer;
    const userAnswer = document.getElementById("answerInput").value; const resultElement = document.getElementById("result");
    if (userAnswer === correctAnswer) {
        resultElement.innerHTML = `封印解除...！<br>賢人の記録を入手した。<br><span class="keyword">${quizzes[quizIndex].keyword}</span>`;
        resultElement.style.color = "#4a3d2b"; let solvedQuizzes = getSolvedQuizzes();
        if (!solvedQuizzes.includes(quizId)) { solvedQuizzes.push(quizId); localStorage.setItem('solvedQuizzes', JSON.stringify(solvedQuizzes)); }
        showSolvedState(quizzes[quizIndex]);
    } else { resultElement.textContent = "あいことばが違うようだ…"; resultElement.style.color = "red"; }
}
function showSolvedState(quizData) {
    const answerInput = document.getElementById("answerInput"); const submitButton = document.querySelector("button");
    const resultElement = document.getElementById("result"); answerInput.style.display = "none";
    submitButton.style.display = "none"; resultElement.innerHTML = `記録解放済み：<br><span class="keyword">${quizData.keyword}</span>`;
    resultElement.style.color = "#4a3d2b";
    if (!document.getElementById("showAnswerBtn")) {
        const showAnswerBtn = document.createElement("button"); showAnswerBtn.id = "showAnswerBtn";
        showAnswerBtn.innerText = "あいことばを確認"; showAnswerBtn.onclick = () => { alert(`この手がかりのあいことばは「${quizData.answer}」だ。`); };
        resultElement.parentNode.insertBefore(showAnswerBtn, resultElement.nextSibling);
    }
    const solvedQuizzes = getSolvedQuizzes();
    if (solvedQuizzes.length === quizzes.length && !document.getElementById("all-solved-link")) {
        const linkContainer = document.createElement("div"); linkContainer.id = "all-solved-link";
        linkContainer.classList.add("all-solved-link-container");
        linkContainer.innerHTML = `<a href="summary.html">全ての手がかりが集った。一覧を見にいこう。</a>`;
        resultElement.parentNode.appendChild(linkContainer);
    }
}
function displaySummary() {
    const summaryContainer = document.getElementById("summary-list"); const solvedQuizzes = getSolvedQuizzes();
    quizzes.forEach((quiz, index) => {
        const quizId = index + 1; const summaryItem = document.createElement("div");
        summaryItem.classList.add("summary-item"); let contentHTML;
        if (solvedQuizzes.includes(quizId)) {
            summaryItem.classList.add("solved");
            contentHTML = `<h3>${quiz.title}</h3><p>${quiz.keyword}</p>`;
        } else { contentHTML = `<h3>${quiz.title}</h3><p>--- LOCKED ---</p>`; }
        summaryItem.innerHTML = contentHTML; summaryContainer.appendChild(summaryItem);
    });
    if (solvedQuizzes.length === quizzes.length) {
        const finalMessage = document.createElement("div"); finalMessage.classList.add("final-message");
        finalMessage.innerText = "この手がかりをもとに、失われた天秤を探しに行こう";
        summaryContainer.parentNode.appendChild(finalMessage);
    }
}

