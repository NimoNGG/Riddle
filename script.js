// ★ ここに10個の謎をすべて設定します
const quizzes = [
    {
        title: "第一の記録",
        question: `NONONONONONONONONONONON<br><br>仙人は遺言の手がかりを暗号にして後世に残した。<br>この暗号を読み取り、世界を救う旅に出よう。`, // PDFの謎を入れました
        answer: "のりのつくだに", // あいことば（答え）
        keyword: "白" // 正解時に表示されるキーワード
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
        keyword: "に"
    }
    // ...以下、第十の記録まで追加していきます
];

// ページの読み込みが完了したときに実行される処理
document.addEventListener("DOMContentLoaded", () => {
    // quiz.html の場合のみ、謎の表示処理を行う
    if (document.getElementById("quizTitle")) {
        setupQuiz();
    }
});

// 謎のページをセットアップする関数
function setupQuiz() {
    // URLから "?q=X" の部分を取得
    const params = new URLSearchParams(window.location.search);
    // "q" の値（謎の番号）を取得。番号は1から始まるが、配列は0からなので-1する
    const quizId = parseInt(params.get("q")) - 1;

    // quizzes配列から、対応する謎のデータを取得
    const quizData = quizzes[quizId];

    if (quizData) {
        // HTMLの各要素に、問題のタイトルと問題文を設定
        document.getElementById("quizTitle").innerText = quizData.title;
        document.getElementById("quizQuestion").innerHTML = quizData.question;
    } else {
        // もし存在しない番号が指定されたら
        document.getElementById("quizTitle").innerText = "エラー";
        document.getElementById("quizQuestion").innerText = "指定された謎は存在しません。";
    }
}

// 「こたえを送信」ボタンが押されたときに実行される関数
function checkAnswer() {
    // URLから謎の番号を取得
    const params = new URLSearchParams(window.location.search);
    const quizId = parseInt(params.get("q")) - 1;

    // 正解の答えを取得
    const correctAnswer = quizzes[quizId].answer;

    // 入力された値を取得
    const userAnswer = document.getElementById("answerInput").value;

    // 結果を表示するためのHTML要素を取得
    const resultElement = document.getElementById("result");

    // 正解かどうかをチェック
    if (userAnswer === correctAnswer) {
        // 正解だった場合
        resultElement.innerHTML = `正解！<br>キーワードは「<span class="keyword">${quizzes[quizId].keyword}</span>」だ。`;
        resultElement.style.color = "#4a3d2b";
    } else {
        // 不正解だった場合
        resultElement.textContent = "不正解…もう一度考えてみよう。";
        resultElement.style.color = "red";
    }
}
