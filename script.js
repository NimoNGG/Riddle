// 「こたえを送信」ボタンが押されたときに実行される関数
function checkAnswer() {
    // 正解の答えを設定
    const correctAnswer = "さつじん";

    // 入力された値を取得
    const userAnswer = document.getElementById("answerInput").value;

    // 結果を表示するためのHTML要素を取得
    const resultElement = document.getElementById("result");

    // 正解かどうかをチェック
    if (userAnswer === correctAnswer) {
        // 正解だった場合
        resultElement.innerHTML = "正解！<br>次なる謎へ進むための扉が開かれた。";
        // 次のページのリンクを表示する
        // aタグ（リンク）を新しく作成
        const nextLink = document.createElement("a");
        nextLink.href = "quiz2.html"; // ★次の謎のページのファイル名
        nextLink.innerText = "ここをクリックして次の謎へ";
        // resultElementに作成したリンクを追加
        resultElement.appendChild(nextLink);
        
    } else {
        // 不正解だった場合
        resultElement.textContent = "不正解…もう一度考えてみよう。";
        resultElement.style.color = "red"; // 文字を赤くする
    }
}