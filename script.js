// ★ ここに6個の謎をすべて設定します
const quizzes = [
    {
        title: "第一の記録",
        question: `NONONONONONONONONONONON<br><br>仙人は遺言の手がかりを暗号にして後世に残した。<br>この暗号を読み取り、世界を救う旅に出よう。`,
        answer: "のりのつくだに",
        keyword: "白"
    },
    {
        title: "第二の記録",
        question: "ここに第二の謎の問題文が入ります。",
        answer: "こたえ2",
        keyword: "門"
    },
    {
        title: "第三の記録",
        question: "ここに第三の謎の問題文が入ります。",
        answer: "こたえ3",
        keyword: "祭"
    },
    {
        title: "第四の記録",
        question: "ここに第四の謎の問題文が入ります。",
        answer: "こたえ4",
        keyword: "へ"
    },
    {
        title: "第五の記録",
        question: "ここに第五の謎の問題文が入ります。",
        answer: "こたえ5",
        keyword: "よ"
    },
    {
        title: "第六の記録",
        question: "ここに第六の謎の問題文が入ります。",
        answer: "こたえ6",
        keyword: "うこそ"
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
    // データがあればJSON形式から配列に戻す。なければ空の配列を返す
    return solved ? JSON.parse(solved) : [];
}

// 謎のページをセットアップする関数
function setupQuiz() {
    const params = new URLSearchParams(window.location.search);
    const quizId = parseInt(params.get("q")); // IDを1から始まる番号として扱う
    const quizIndex = quizId - 1; // 配列用のインデックス（0から始まる）
    const quizData = quizzes[quizIndex];

    if (quizData) {
        document.getElementById("quizTitle").innerText = quizData.title;
        document.getElementById("quizQuestion").innerHTML = quizData.question;

        // この謎が解答済みかどうかをチェック
        const solvedQuizzes = getSolvedQuizzes();
        if (solvedQuizzes.includes(quizId)) {
            // 解答済みの場合の表示に切り替える
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
        resultElement.innerHTML = `正解！<br>キーワードは「<span class="keyword">${quizzes[quizIndex].keyword}</span>」だ。`;
        resultElement.style.color = "#4a3d2b";
        
        // 正解したことをlocalStorageに保存
        let solvedQuizzes = getSolvedQuizzes();
        if (!solvedQuizzes.includes(quizId)) { // まだ保存されていなければ追加
            solvedQuizzes.push(quizId);
            localStorage.setItem('solvedQuizzes', JSON.stringify(solvedQuizzes));
        }

        // 解答済みの表示に切り替える
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

    // 入力欄と送信ボタンを非表示にする
    answerInput.style.display = "none";
    submitButton.style.display = "none";

    // キーワードを常に表示
    resultElement.innerHTML = `キーワードは「<span class="keyword">${quizData.keyword}</span>」だ。`;
    resultElement.style.color = "#4a3d2b";

    // 「あいことばを見る」ボタンを作成（既になければ）
    if (!document.getElementById("showAnswerBtn")) {
        const showAnswerBtn = document.createElement("button");
        showAnswerBtn.id = "showAnswerBtn";
        showAnswerBtn.innerText = "あいことばを見る";
        showAnswerBtn.onclick = () => {
            alert(`この謎のあいことばは「${quizData.answer}」です。`);
        };
        // 結果表示の後ろに追加
        resultElement.parentNode.insertBefore(showAnswerBtn, resultElement.nextSibling);
    }
}
