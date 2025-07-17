const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
  x: 180,
  y: 550,
  width: 32,
  height: 32,
  speed: 6,
  color: "lime"
};

const blocks = [];
const blockWidth = 40;
const blockHeight = 40;
const blockSpeed = 3;

function spawnBlock() {
  const x = Math.floor(Math.random() * (canvas.width - blockWidth));
  blocks.push({ x, y: -blockHeight });
}

let keys = {};

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBlocks() {
  ctx.fillStyle = "red";
  for (let block of blocks) {
    ctx.fillRect(block.x, block.y, blockWidth, blockHeight);
    block.y += blockSpeed;
  }
}

function detectCollision(a, b) {
  return a.x < b.x + blockWidth &&
         a.x + a.width > b.x &&
         a.y < b.y + blockHeight &&
         a.y + a.height > b.y;
}

function update() {
  if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
  if (keys["ArrowRight"] && player.x + player.width < canvas.width) player.x += player.speed;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawBlocks();

  for (let block of blocks) {
    if (detectCollision(player, block)) {
      alert("Game Over!");
      document.location.reload();
    }
  }

  requestAnimationFrame(update);
}

setInterval(spawnBlock, 600);
update();

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);




