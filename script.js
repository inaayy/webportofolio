const player = document.getElementById("player");
const gameArea = document.getElementById("gameArea");
const startGame = document.getElementById("startGame");
const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highScore");

let score = 0;
let highScore = localStorage.getItem("spiderHighScore") || 0;
let gameRunning = false;
let obstacleTimer;
let scoreTimer;

highScoreText.textContent = highScore;

// MULAI GAME
function startGameNow() {

    if (gameRunning) return;

    gameRunning = true;
    score = 0;

    scoreText.textContent = "0";

    startGame.textContent = "🕷️ GAME BERJALAN...";

    // Hapus game over
    const gameOver = document.querySelector(".game-over");

    if (gameOver) {
        gameOver.remove();
    }

    // Mulai skor
    scoreTimer = setInterval(() => {

        score++;

        scoreText.textContent = score;

    }, 100);

    // Buat rintangan
    obstacleTimer = setInterval(createObstacle, 1500);
}


// MEMBUAT RINTANGAN
function createObstacle() {

    if (!gameRunning) return;

    const obstacle = document.createElement("div");

    obstacle.classList.add("obstacle");

    obstacle.innerHTML = "💥";

    gameArea.appendChild(obstacle);

    const speed = 1.5 + Math.random();

    obstacle.style.animationDuration = speed + "s";


    // CEK TABRAKAN
    const collision = setInterval(() => {

        if (!gameRunning) {

            clearInterval(collision);
            return;

        }

        const playerRect = player.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top
        ) {

            clearInterval(collision);

            gameOver();

        }

    }, 20);


    setTimeout(() => {

        obstacle.remove();

        clearInterval(collision);

    }, speed * 1000 + 500);

}


// LOMPAT
function jump() {

    if (!gameRunning) return;

    if (player.classList.contains("jump")) return;

    player.classList.add("jump");

    setTimeout(() => {

        player.classList.remove("jump");

    }, 600);

}


// GAME OVER
function gameOver() {

    gameRunning = false;

    clearInterval(obstacleTimer);
    clearInterval(scoreTimer);

    // Simpan high score
    if (score > highScore) {

        highScore = score;

        localStorage.setItem(
            "spiderHighScore",
            highScore
        );

        highScoreText.textContent = highScore;
    }

    startGame.textContent = "🕷️ MAIN LAGI";

    const screen = document.createElement("div");

    screen.classList.add("game-over");

    screen.innerHTML = `
        <h2>GAME OVER!</h2>
        <p>Skor kamu: ${score}</p>
        <p>High Score: ${highScore}</p>
    `;

    gameArea.appendChild(screen);
}


// TOMBOL MULAI
startGame.addEventListener("click", function () {

    if (!gameRunning) {

        startGameNow();

    }

});


// KLIK AREA GAME = LOMPAT
gameArea.addEventListener("click", function () {

    if (gameRunning) {

        jump();

    }

});


// TEKAN SPACE
document.addEventListener("keydown", function(event) {

    if (event.code === "Space") {

        event.preventDefault();

        if (!gameRunning) {

            startGameNow();

        } else {

            jump();

        }

    }

});
const music = document.getElementById("backgroundMusic");
const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", function () {
    if (music.paused) {
        music.play();
        musicBtn.innerHTML = "⏸️ Matikan Musik";
    } else {
        music.pause();
        musicBtn.innerHTML = "🎵 Putar Musik";
    }
});
function playMusic() {
    const music = document.getElementById("myMusic");

    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}