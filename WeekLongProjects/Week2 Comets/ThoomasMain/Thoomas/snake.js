const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const gridSize = 20;
const canvasSize = 400;
const totalCells = canvasSize / gridSize;

// Snake and food settings
let snake = [{x: 8 * gridSize, y: 8 * gridSize}];
let food = {x: 5 * gridSize, y: 5 * gridSize};
let direction = {x: gridSize, y: 0};
let score = 0;

// Listen to arrow keys to change direction
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowUp" && direction.y === 0) direction = {x: 0, y: -gridSize};
    if (e.key === "ArrowDown" && direction.y === 0) direction = {x: 0, y: gridSize};
    if (e.key === "ArrowLeft" && direction.x === 0) direction = {x: -gridSize, y: 0};
    if (e.key === "ArrowRight" && direction.x === 0) direction = {x: gridSize, y: 0};
});

// Function to draw the Snake on the canvas
function drawSnake() {
    ctx.fillStyle = 'green';
    for (let segment of snake) {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    }
}

// Function to draw food on the canvas
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Function to draw the "Snake Game" text
function drawText() {
    ctx.font = '48px sans-serif';  // Large font size for the text
    ctx.fillStyle = 'white';  // White text color
    ctx.textAlign = 'center';
    ctx.fillText('Snake Game', canvasSize / 2, 50);  // Centered at the top
}

// Function to move the snake
function moveSnake() {
    const newHead = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
    snake.unshift(newHead);

    // Check if snake eats food
    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        generateFood();
    } else {
        snake.pop();
    }
}

// Function to check collision with walls or itself
function checkCollision() {
    const head = snake[0];
    
    // Check wall collision
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        return true;
    }

    // Check self-collision
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }

    return false;
}

// Function to generate food at random location
function generateFood() {
    const x = Math.floor(Math.random() * totalCells) * gridSize;
    const y = Math.floor(Math.random() * totalCells) * gridSize;
    food = {x: x, y: y};
}

// Function to update the game state
function update() {
    if (checkCollision()) {
        alert(`Game Over! Score: ${score}`);
        resetGame();
        return;
    }

    moveSnake();

    ctx.clearRect(0, 0, canvasSize, canvasSize);  // Clear the canvas
    drawText();  // Draw the Snake Game text
    drawSnake();
    drawFood();
}

// Function to reset the game
function resetGame() {
    snake = [{x: 8 * gridSize, y: 8 * gridSize}];
    direction = {x: gridSize, y: 0};
    score = 0;
    generateFood();
}

// Game loop
function gameLoop() {
    update();
    setTimeout(gameLoop, 100);  // Run every 100ms
}

// Start the game
generateFood();
gameLoop();
