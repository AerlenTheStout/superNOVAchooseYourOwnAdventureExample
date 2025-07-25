// configuration variables
const FPS = 50;
const BULLET_SPEED = 1.5;
const SPAWN_RATE = 1000; // milliseconds
const ENEMY_ATTACK_RANGE = 25; // Or whatever distance you prefer (e.g., 50 for easier testing)
const ENEMY_ATTACK_DAMAGE = 5;
const ENEMY_ATTACK_COOLDOWN = 10;
const ENEMY_MOVEMENT_RANGE = 200;
const playerMovementSpeed = 1;
const terrain = [
    {t: "tree", x: 50, y: 40},
    {t: "tree", x: 125, y: 125},
    {t: "tree", x: 130, y: 22}
];
// game variables
const s = {
    w: window.innerWidth,
    h: window.innerHeight
};
let loaded = false;
let movementKeysPress = [0, 0, 0, 0]; // W, A, S, D isPressed
let playerx = 0; // player x pos
let playery = 0; // player y pos
let playerd = 0; // player direction
let mousex = s.w / 2; // mouse x pos
let mousey = s.h / 2; // mouse y pos
let inventory = [1, 2, 0];
let activeWeapon = 0;
let bullets = [];
let shooting = false; // is the player shooting?
let reload = 0; // reload time remaining
let health = 100; // player health
let entities = [];
// html elements
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
// images
// background
const background = new Image();
background.src = "https://web.cs.dal.ca/~jyorke/superNOVA/WeekLongProjects/Week3Comets/ZombieGame/static/Map.png";
// terrain
const terrain_tree = new Image();
terrain_tree.src = "https://web.cs.dal.ca/~jyorke/superNOVA/WeekLongProjects/Week3Comets/ZombieGame/static/terrain/tree.png"
// player
const player_img = new Image();
player_img.src = "https://web.cs.dal.ca/~jyorke/superNOVA/WeekLongProjects/Week3Comets/ZombieGame/static/skins/_default.png"
// bullets
const pistol_ammo = new Image();
pistol_ammo.src = "https://web.cs.dal.ca/~jyorke/superNOVA/WeekLongProjects/Week3Comets/ZombieGame/static/weapons/PistolAmmo.png"
const smg_ammo = new Image();
smg_ammo.src = "https://web.cs.dal.ca/~jyorke/superNOVA/WeekLongProjects/Week3Comets/ZombieGame/static/weapons/SMGAmmo.png"
const ammo = [
    null,
    pistol_ammo,
    pistol_ammo,
];
// weapons
const pistol = new Image();
pistol.src = "https://web.cs.dal.ca/~jyorke/superNOVA/WeekLongProjects/Week3Comets/ZombieGame/static/weapons/Pistol.png"
const smg = new Image();
smg.src = "https://web.cs.dal.ca/~jyorke/superNOVA/WeekLongProjects/Week3Comets/ZombieGame/static/weapons/SMG.png"
const weapons = [
    null,
    pistol,
    smg,
];
// enemies
const zombie = new Image();
zombie.src = "https://web.cs.dal.ca/~jyorke/superNOVA/WeekLongProjects/Week3Comets/ZombieGame/static/enemies/Zombie.png";
const skeleton = new Image();
skeleton.src = "https://web.cs.dal.ca/~jyorke/superNOVA/WeekLongProjects/Week3Comets/ZombieGame/static/enemies/Skeleton.png";
const enemies = [
    null,
    zombie,
    skeleton,
];
// event listeners
window.addEventListener("keydown", (e)=> {
    if (e.key == "w") {
        movementKeysPress[0] = 1;
    }
    if (e.key == "a") {
        movementKeysPress[1] = 1;
    }
    if (e.key == "s") {
        movementKeysPress[2] = 1;
    }
    if (e.key == "d") {
        movementKeysPress[3] = 1;
    }
});
window.addEventListener("keyup", (e)=> {
    if (e.key == "w") {
        movementKeysPress[0] = 0;
    }
    if (e.key == "a") {
        movementKeysPress[1] = 0;
    }
    if (e.key == "s") {
        movementKeysPress[2] = 0;
    }
    if (e.key == "d") {
        movementKeysPress[3] = 0;
    }
});
window.addEventListener("keypress", (e)=> {
    if (e.key == "1") {
        activeWeapon = 0;
    }
    if (e.key == "2") {
        activeWeapon = 1;
    }
    if (e.key == "3") {
        activeWeapon = 2;
    }
}); // REMOVE?
canvas.addEventListener("mousemove", (e)=> {
    const canvasRect = canvas.getBoundingClientRect();
    mousex = e.clientX - canvasRect.left;
    mousey = e.clientY - canvasRect.top;
});
canvas.addEventListener("mousedown", (e)=> {
    if (e.button == 0) { // left click
        shooting = true;
    }
});
canvas.addEventListener("mouseup", (e)=> {
    if (e.button == 0) { // left click
        shooting = false;
    }
});
document.addEventListener('contextmenu', event => {
  event.preventDefault();
});
// loops
background.onload = ()=> {
    const Renderer = setInterval(()=> {
        // clear screen
        ctx.clearRect(0, 0, background.width, background.height);
        // draw first layer: background
        ctx.drawImage(background, playerx, playery);
        // draw second layer: terrain
        for (const ter of terrain) {
            if (ter.t = "tree") {
                ctx.drawImage(terrain_tree, ter.x + playerx, ter.y + playery);
            }
        }
        // draw third layer: bullets
        for (const bullet of bullets) {
            if (ammo[inventory[activeWeapon]] != null) {
                const bulletAngle = bullet[0];
                const bulletX = bullet[1] + playerx;
                const bulletY = bullet[2] + playery;
                const bulletWidth = 16;
                const bulletHeight = 16;
                drawRotatedImage(ctx, ammo[inventory[activeWeapon]], bulletX, bulletY, bulletWidth, bulletHeight, bulletAngle);
            } else {
                console.log(`null bullet! info: activeweapon=${activeWeapon}, ammo=${ammo.toString()}`)
            }
        }
        // draw fourth layer: player
        const playerScreenCenterX = s.w / 2;
        const playerScreenCenterY = s.h / 2;
        const playerScreenWidth = 32;
        const playerScreenHeight = 32;
        const playerScreenX = (canvas.width / 2) - (playerScreenWidth / 2);
        const playerScreenY = (canvas.height / 2) - (playerScreenHeight / 2);
        // player angle = playerd
        const playerWidth = 32;
        const playerHeight = 32;
        drawRotatedImage(ctx, player_img, playerScreenX, playerScreenY, playerWidth, playerHeight, playerd);
        // draw fifth layer: enemies
        for (const enemy of entities) {
            if (enemy != null) {
                const enemyType = enemy[0];
                const enemyX = enemy[1] + playerx;
                const enemyY = enemy[2] + playery;
                const enemyD = enemy[4];
                const enemyWidth = 32;
                const enemyHeight = 32;
                if (enemies[enemyType] != null) {
                    drawRotatedImage(ctx, enemies[enemyType], enemyX, enemyY, enemyWidth, enemyHeight, enemyD);
                } else {
                    console.log(`null enemy! info: type=${enemyType}, enemies=${enemies.toString()}`);
                }
            }
        }
        // draw sixth layer: UI
        // inventory: 3 tiles at bottom of screen
        const screen_bottom = canvas.height;
        const screen_middle = canvas.width / 2;
        const inv_slot_padding = 5;
        const inv_slot_width = 20;
        // draw first slot
        ctx.fillStyle = "#000000";
        ctx.fillRect(screen_middle - (inv_slot_width / 2) - inv_slot_padding - inv_slot_width, screen_bottom - (inv_slot_width + inv_slot_padding), inv_slot_width, inv_slot_width);
        if (weapons[inventory[0]] != null) {
            ctx.drawImage(weapons[inventory[0]], screen_middle - (inv_slot_width / 2) - inv_slot_padding - inv_slot_width + 2, screen_bottom - (inv_slot_width + inv_slot_padding) + 2);
        }
        if (activeWeapon == 0) {
            ctx.strokeStyle = "#FFFF00";
            ctx.strokeRect(screen_middle - (inv_slot_width / 2) - inv_slot_padding - inv_slot_width, screen_bottom - (inv_slot_width + inv_slot_padding), inv_slot_width, inv_slot_width);
        }
        // draw second slot
        ctx.fillRect(screen_middle - (inv_slot_width / 2), screen_bottom - (inv_slot_width + inv_slot_padding), inv_slot_width, inv_slot_width);
        if (weapons[inventory[1]] != null) {
            ctx.drawImage(weapons[inventory[1]], screen_middle - (inv_slot_width / 2) + 2, screen_bottom - (inv_slot_width + inv_slot_padding) + 2);
        }
        if (activeWeapon == 1) {
            ctx.strokeStyle = "#FFFF00";
            ctx.strokeRect(screen_middle - (inv_slot_width / 2), screen_bottom - (inv_slot_width + inv_slot_padding), inv_slot_width, inv_slot_width);
        }
        // draw third slot
        ctx.fillRect(screen_middle - (inv_slot_width / 2) + inv_slot_padding + inv_slot_width, screen_bottom - (inv_slot_width + inv_slot_padding), inv_slot_width, inv_slot_width);
        if (weapons[inventory[2]] != null) {
            ctx.drawImage(weapons[inventory[2]], screen_middle - (inv_slot_width / 2) + inv_slot_padding + inv_slot_width + 2, screen_bottom - (inv_slot_width + inv_slot_padding) + 2);
        }
        if (activeWeapon == 2) {
            ctx.strokeStyle = "#FFFF00";
            ctx.strokeRect(screen_middle - (inv_slot_width / 2) + inv_slot_padding + inv_slot_width, screen_bottom - (inv_slot_width + inv_slot_padding), inv_slot_width, inv_slot_width);
        }
        // health bar
        // green bar
        ctx.fillStyle = "#00FF00";
        ctx.fillRect(screen_middle - 50, canvas.height - 35, health, 7);
        // red bar
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(screen_middle + health - 50, canvas.height - 35, 100 - health, 7);
        // TODO: add HUD for pos, etc
    }, Math.floor(1000 / FPS));
};
const inputHandler = setInterval(()=> {
    // x movement
    if (movementKeysPress[1] && !movementKeysPress[3]) {
        playerx += playerMovementSpeed;
    }
    if (movementKeysPress[3] && !movementKeysPress[1]) {
        playerx = playerx - playerMovementSpeed;
    }
    // y movement
    if (movementKeysPress[0] && !movementKeysPress[2]) {
        playery += playerMovementSpeed;
    }
    if (movementKeysPress[2] && !movementKeysPress[0]) {
        playery = playery - playerMovementSpeed;
    }
    // calculate player direction
    const playerScreenCenterX = s.w / 2;
    const playerScreenCenterY = s.h / 2;
    playerd = calculateAngle(mousex, mousey, playerScreenCenterX, playerScreenCenterY);
}, 10);
const bulletHandler = setInterval(()=> {
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        let angleDeg = bullet[0];
        let bulletx = bullet[1];
        let bullety = bullet[2];
        const angleRad = (angleDeg - 90) * Math.PI / 180;
        const velx = BULLET_SPEED * Math.cos(angleRad);
        const vely = BULLET_SPEED * Math.sin(angleRad);
        // update bullet
        bullet[1] += velx;
        bullet[2] += vely;
        // check if bullet is out of bounds
        if (bulletx < -100 || bulletx > s.w + 100 || bullety < -100 || bullety > s.h + 100) {
            bullets.splice(i, 1); // remove bullet
        } else {
            bullets[i] = bullet; // update bullet
        }
    }
    // if shooting, add bullet
    if (shooting && reload == 0) {
        if (inventory[activeWeapon] == 1) { // pistol
            const playerScreenCenterX = s.w / 2;
            const playerScreenCenterY = s.h / 2;
            const angle = calculateAngle(mousex, mousey, playerScreenCenterX, playerScreenCenterY);
            bullets.push([angle, -playerx + 140, -playery + 65]);
            reload = 100; // reload time
        } else if (inventory[activeWeapon] == 2) { // smg
            const playerScreenCenterX = s.w / 2;
            const playerScreenCenterY = s.h / 2;
            const angle = calculateAngle(mousex, mousey, playerScreenCenterX, playerScreenCenterY);
            bullets.push([angle, -playerx + 140, -playery + 65]);
            reload = 30; // reload time
        }
    }
    if (reload > 0) {
        reload--;
    }
});
const enemySpawnHandler = setInterval(()=> {
    if (Math.random() < 1.0) {
        // Ensure enemyType is 1 or 2 (to avoid null from 'enemies' array)
        const enemyType = Math.floor(Math.random() * (enemies.length - 1)) + 1;
        if (enemies[enemyType] != null) {
            const enemyX = Math.random() * s.w; // These are world coordinates
            const enemyY = Math.random() * s.h; // These are world coordinates
            const enemy = [enemyType, enemyX, enemyY, 0, 0.0]; // [type, x, y, attackCooldown, angle]
            entities.push(enemy);
        }
    }
}, SPAWN_RATE);
const enemyMovementHandler = setInterval(()=> {
    const playerScreenCenterX = s.w / 2;
    const playerScreenCenterY = s.h / 2;
    const playerWorldXForCollision = -playerx + playerScreenCenterX;
    const playerWorldYForCollision = -playery + playerScreenCenterY;
    for (const enemy of entities) {
        if (enemy.length < 4) {
            enemy.push(0);
        }
        const enemyWorldX_topLeft = enemy[1];
        const enemyWorldY_topLeft = enemy[2];
        const enemySpriteWidth = 32;
        const enemySpriteHeight = 32;
        const enemyWorldXForCollision = enemyWorldX_topLeft + (enemySpriteWidth / 2);
        const enemyWorldYForCollision = enemyWorldY_topLeft + (enemySpriteHeight / 2);
        let enemyAttackCooldown = enemy[3];
        // --- Debugging logs ---
        // console.log("Player World Center (Collision):", { x: playerWorldXForCollision, y: playerWorldYForCollision });
        // console.log("Enemy World Center (Collision):", { x: enemyWorldXForCollision, y: enemyWorldYForCollision });
        // --- End Debugging logs ---
        const dx = enemyWorldXForCollision - playerWorldXForCollision;
        const dy = enemyWorldYForCollision - playerWorldYForCollision;
        // Calculate the distance
        let dist = Math.sqrt(dx * dx + dy * dy);
        console.log("Calculated Distance (dist):", dist);
        if (dist < ENEMY_ATTACK_RANGE && enemyAttackCooldown <= 0) {
            // Actual game logic for attack
            health -= ENEMY_ATTACK_DAMAGE; // Reduce player's health
            if (health <= 0) {
                health = 0; // Prevent health from going below zero
                console.log("Game Over!");
                alert("You Died!");
                clearInterval(Renderer);
                clearInterval(inputHandler);
                clearInterval(bulletHandler);
                clearInterval(enemySpawnHandler);
                clearInterval(enemyMovementHandler);
            }
            // console.log(`Player hit! Health: ${health}`); // Log health for debugging
            enemy[3] = ENEMY_ATTACK_COOLDOWN;
        }
        if (enemyAttackCooldown > 0) {
            enemy[3]--;
        }
        // movement logic
        if (dist <= ENEMY_MOVEMENT_RANGE) {
            enemy[4] = calculateAngle(playerWorldXForCollision, playerWorldYForCollision, enemyWorldXForCollision, enemyWorldYForCollision);
        }
    }
}, 10);
// helpful functions
function calculateAngle(x1, y1, x2, y2) {
    const deltax = x1 - x2;
    const deltay = y1 - y2;
    const angleRad = Math.atan2(deltay, deltax);
    let angleDeg = angleRad * (180 / Math.PI)
    angleDeg += 90;
    return angleDeg;
}
function drawRotatedImage(ctx, image, x, y, width, height, angleDeg) {
    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    const angleRad = angleDeg * Math.PI / 180;
    ctx.rotate(angleRad);
    ctx.drawImage(image, -width / 2, -height / 2, width, height);
    ctx.restore();
}