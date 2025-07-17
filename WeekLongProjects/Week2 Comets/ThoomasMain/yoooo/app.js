let score = 0;
let autoClickers = 0;
let autoClickerCost = 50;

const scoreEl = document.getElementById("score");
const cookieEl = document.getElementById("cookie");
const buyAutoEl = document.getElementById("buy-auto");
const autoCountEl = document.getElementById("autoCount");

cookieEl.addEventListener("click", () => {
  score++;
  updateDisplay();
});

buyAutoEl.addEventListener("click", () => {
  if (score >= autoClickerCost) {
    score -= autoClickerCost;
    autoClickers++;
    autoClickerCost = Math.floor(autoClickerCost * 1.5); // Increase cost
    buyAutoEl.textContent = `Buy Auto Clicker (Cost: ${autoClickerCost})`;
    updateDisplay();
  }
});

// Auto clicker interval
setInterval(() => {
  score += autoClickers;
  updateDisplay();
}, 1000);

function updateDisplay() {
  scoreEl.textContent = score;
  autoCountEl.textContent = autoClickers;
}
