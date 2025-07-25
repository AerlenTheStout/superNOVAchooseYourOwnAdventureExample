// Start Menu Logic
const startMenu = document.getElementById("start-menu");
const startButton = document.getElementById("start-button");
const gameContainer = document.getElementById("game-container");

startButton.addEventListener("click", () => {
  startMenu.style.display = "none";
  gameContainer.style.display = "block";
});

let triangles = 0;
let trianglesPerClick = 1;
let autoClickers = 0;
let conspiracyIndex = 0;

const triangleDisplay = document.getElementById("triangle-count");
const illuminati = document.getElementById("illuminati");
const conspiracies = document.getElementById("conspiracies");
const betterClickBtn = document.getElementById("better-click");
const autoClickerBtn = document.getElementById("auto-clicker");

const conspiracyList = [
  "The moon landing was staged!",
  "Birds are government drones!",
  "The Earth is flat (according to them)!",
  "Area 51 houses alien tech!",
  "Pyramids are ancient power plants!",
  "5G controls your mind!",
  "Reptilians run the world!",
  "AI is a tool of the Illuminati!",
  "Time travel is real and hidden!",
  "Apple runs the Illuminati!",
  "Because they make products that start with I.",
  "The Illuminati starts with I!",
  "Their watching you right now..."
];

// Click to earn triangles
illuminati.addEventListener("click", () => {
  triangles += trianglesPerClick;
  updateDisplay();
  revealConspiracy();
});

// Upgrade: Better Click
betterClickBtn.addEventListener("click", () => {
  if (triangles >= 50) {
    triangles -= 50;
    trianglesPerClick += 1;
    updateDisplay();
  }
});

// Upgrade: Auto Clicker
autoClickerBtn.addEventListener("click", () => {
  if (triangles >= 100) {
    triangles -= 100;
    autoClickers += 1;
    updateDisplay();
  }
});

// Passive income from auto clickers
setInterval(() => {
  if (autoClickers > 0) {
    triangles += autoClickers;
    updateDisplay();
    revealConspiracy();
  }
}, 1000);

function updateDisplay() {
  triangleDisplay.textContent = `Triangles: ${triangles}`;
}

function revealConspiracy() {
  if (triangles % 100 === 0 && conspiracyIndex < conspiracyList.length) {
    const li = document.createElement("li");
    li.textContent = conspiracyList[conspiracyIndex];
    conspiracies.appendChild(li);
    conspiracyIndex++;
  }
}
