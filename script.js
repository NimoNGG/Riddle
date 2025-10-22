// ★ ここに6個の謎と手がかりを設定します
const quizzes = [
    {
        title: "第一の記録",
        question: `NONONONONONONONONONONON<br><br>仙人は遺言の手がかりを暗号にして後世に残した。<br>この暗号を読み取り、世界を救う旅に出よう。`,
        answer: "のりのつくだに",
        keyword: "第一の賢人の記録：数字は『3204』"
    },
    {
        title: "第二の記録",
        question: "ここに第二の謎の問題文が入ります。",
        answer: "こたえ2",
        keyword: "第二の賢人の記録：目指すべきは『前の扉』"
    },
    {
        title: "第三の記録",
        question: "ここに第三の謎の問題文が入ります。",
        answer: "こたえ3",
        keyword: "第三の賢人の記録：扉は『6回』叩け"
    },
    {
        title: "第四の記録",
        question: "ここに第四の謎の問題文が入ります。",
        answer: "こたえ4",
        keyword: "第四の賢人の記録：開門の詠唱は『剣なき秤は無力、秤なき剣は暴力』"
    },
    {
        title: "第五の記録",
        question: "ここに第五の謎の問題文が入ります。",
        answer: "こたえ5",
        keyword: "第五の賢人の記録：錠の暗号は『1034』"
    },
    {
        title: "第六の記録",
        question: "ここに第六の謎の問題文が入ります。",
        answer: "こたえ6",
        keyword: "第六の賢人の記録：最後の行動は『天秤の傾きを等しくする』こと"
    }
];

// ページの読み込みが完了したときに実行される処理
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("quizTitle")) {
        setupQuiz();
    }
});

// 解答済みの謎のリストをlocalStorageから取得する関数
function getSolvedQuizzes() {
    const solved = localStorage.getItem('solvedQuizzes');
    return solved ? JSON.parse(solved) : [];
}

// 謎のページをセットアップする関数
function setupQuiz() {
    const params = new URLSearchParams(window.location.search);
    const quizId = parseInt(params.get("q"));
    const quizIndex = quizId - 1;
    const quizData = quizzes[quizIndex];

    if (quizData) {
        document.getElementById("quizTitle").innerText = quizData.title;
        document.getElementById("quizQuestion").innerHTML = quizData.question;

        const solvedQuizzes = getSolvedQuizzes();
        if (solvedQuizzes.includes(quizId)) {
            showSolvedState(quizData);
        }
    } else {
        document.getElementById("quizTitle").innerText = "エラー";
        document.getElementById("quizQuestion").innerText = "指定された謎は存在しません。";
    }
}

// 「こたえを送信」ボタンが押されたときの処理
function checkAnswer() {
    const params = new URLSearchParams(window.location.search);
    const quizId = parseInt(params.get("q"));
    const quizIndex = quizId - 1;
    const correctAnswer = quizzes[quizIndex].answer;
    const userAnswer = document.getElementById("answerInput").value;
    const resultElement = document.getElementById("result");

    if (userAnswer === correctAnswer) {
        resultElement.innerHTML = `正解！<br>手がかりを入手した。<br><span class="keyword">${quizzes[quizIndex].keyword}</span>`;
        resultElement.style.color = "#4a3d2b";
        
        let solvedQuizzes = getSolvedQuizzes();
        if (!solvedQuizzes.includes(quizId)) {
            solvedQuizzes.push(quizId);
            localStorage.setItem('solvedQuizzes', JSON.stringify(solvedQuizzes));
        }

        showSolvedState(quizzes[quizIndex]);

    } else {
        resultElement.textContent = "不正解…もう一度考えてみよう。";
        resultElement.style.color = "red";
    }
}

// 解答済みの表示に切り替える関数
function showSolvedState(quizData) {
    const answerInput = document.getElementById("answerInput");
    const submitButton = document.querySelector("button");
    const resultElement = document.getElementById("result");

    answerInput.style.display = "none";
    submitButton.style.display = "none";

    resultElement.innerHTML = `手がかり：<br><span class="keyword">${quizData.keyword}</span>`;
    resultElement.style.color = "#4a3d2b";

    if (!document.getElementById("showAnswerBtn")) {
        const showAnswerBtn = document.createElement("button");
        showAnswerBtn.id = "showAnswerBtn";
        showAnswerBtn.innerText = "あいことばを見る";
        showAnswerBtn.onclick = () => {
            alert(`この謎のあいことばは「${quizData.answer}」です。`);
        };
        resultElement.parentNode.insertBefore(showAnswerBtn, resultElement.nextSibling);
    }
}
