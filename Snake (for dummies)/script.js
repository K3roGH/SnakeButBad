const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

let snake = [{x: 200, y: 200}];
let snakeSize = 20;
let direction = {x: 0, y: 0};
let food = getRandomFoodPosition();
let score = 0;
let speed = 100;
let isGameRunning = true;

document.getElementById('settingsButton').addEventListener('click', toggleSettings);
document.getElementById('speed').addEventListener('input', function () {
    speed = this.value;
});

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    if (!isGameRunning) return;

    if (isGameOver()) {
        alert("Game Over!");
        resetGame();
        return;
    }

    setTimeout(function () {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        gameLoop();
    }, speed);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = "#e74c3c";
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, snakeSize, snakeSize);
        ctx.strokeStyle = "#c0392b";
        ctx.strokeRect(part.x, part.y, snakeSize, snakeSize);
    });
}

function moveSnake() {
    const head = {x: snake[0].x + direction.x * snakeSize, y: snake[0].y + direction.y * snakeSize};
    snake.unshift(head);
    if (!checkCollisionWithFood()) {
        snake.pop();
    }
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const up = 38, down = 40, left = 37, right = 39;

    if (keyPressed === up && direction.y === 0) {
        direction = {x: 0, y: -1};
    } else if (keyPressed === down && direction.y === 0) {
        direction = {x: 0, y: 1};
    } else if (keyPressed === left && direction.x === 0) {
        direction = {x: -1, y: 0};
    } else if (keyPressed === right && direction.x === 0) {
        direction = {x: 1, y: 0};
    }
}

function getRandomFoodPosition() {
    let randomX = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
    let randomY = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;
    return {x: randomX, y: randomY};
}

function drawFood() {
    ctx.fillStyle = "#f1c40f";
    ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

function checkCollisionWithFood() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        food = getRandomFoodPosition();
        score++;
        document.getElementById("score").textContent = score;
        return true;
    }
    return false;
}

function isGameOver() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    snake = [{x: 200, y: 200}];
    direction = {x: 0, y: 0};
    score = 0;
    document.getElementById("score").textContent = score;
    food = getRandomFoodPosition();
    isGameRunning = true;
    gameLoop();
}

function toggleSettings() {
    const settingsMenu = document.getElementById("settingsMenu");
    settingsMenu.classList.toggle("hidden");
}

gameLoop();
