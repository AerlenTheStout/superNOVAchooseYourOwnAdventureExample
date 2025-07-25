let totalPunches = 0, stage = 1, donnyMaxHealth = 200, donnyHealth = donnyMaxHealth;
let baseDamage = 10, bonusDamage = 0, autoClicks = 0, multiplier = 1, autoInterval = 1000;

const punchSound = document.getElementById('punch-sound'), koSound = document.getElementById('ko-sound');
const scoreDisplay = document.getElementById('score'), stageDisplay = document.getElementById('stage');
const healthFill = document.getElementById('health-fill'), donny = document.getElementById('donny');
const flashText = document.getElementById('flash-text'), fist = document.getElementById('fist');
const upgradeMsg = document.getElementById('upgrade-msg');

const btnClickUp = document.getElementById('upgrade-click'), btnAutoUp = document.getElementById('upgrade-auto');
const btnMultiUp = document.getElementById('upgrade-multiplier'), btnSpeedUp = document.getElementById('upgrade-speed');

const achList = document.getElementById('ach-list');
const modeToggle = document.getElementById('mode-toggle');

let clickCost = 50, autoCost = 200, multiCost = 500, speedCost = 300;
let achievements = [];

// Developer Tools
let devPanel = document.createElement('div');
devPanel.id = 'dev-panel';
devPanel.innerHTML = `
    <h3>Developer Console</h3>
    <input type="text" id="dev-code" placeholder="Enter Dev Code">
    <button id="dev-activate">Activate Dev Mode</button>
    <input type="number" id="dev-punches" placeholder="Set Punches" disabled>
    <input type="number" id="dev-stage" placeholder="Set Stage" disabled>
    <input type="number" id="dev-health" placeholder="Set Health" disabled>
    <input type="number" id="dev-damage" placeholder="Set Damage" disabled>
    <button id="dev-reset" disabled>Reset Game</button>
`;
document.body.appendChild(devPanel);

// Developer Powers Logic
function openDevTools(code) {
    if (code === '1215') {
        devPanel.style.display = 'block';  // Show the panel
    }
}

// Update UI
function updateUI() {
    scoreDisplay.textContent = totalPunches;
    stageDisplay.textContent = stage;
    healthFill.style.width = (donnyHealth / donnyMaxHealth) * 100 + '%';
    btnClickUp.querySelector('span').textContent = clickCost;
    btnAutoUp.querySelector('span').textContent = autoCost;
    btnMultiUp.querySelector('span').textContent = multiCost;
    btnSpeedUp.querySelector('span').textContent = speedCost;
    btnClickUp.disabled = totalPunches < clickCost || stage < 2;
    btnAutoUp.disabled = totalPunches < autoCost || stage < 3;
    btnMultiUp.disabled = totalPunches < multiCost || stage < 4;
    btnSpeedUp.disabled = totalPunches < speedCost || autoClicks === 0;
    checkAchievements();
}

// Punch Logic
function punch() {
    if (donnyHealth <= 0) return;
    punchSound.currentTime = 0;
    punchSound.play();
    donny.classList.add('punched');
    fist.classList.remove('active');
    void fist.offsetWidth;
    fist.classList.add('active');
    totalPunches++;
    let dmg = (baseDamage + bonusDamage) * multiplier;
    donnyHealth = Math.max(0, donnyHealth - dmg);
    flashText.textContent = ['POW!', 'WHAM!', 'CRACK!', 'SMACK!'][Math.floor(Math.random() * 4)];
    flashText.classList.add('active');
    setTimeout(() => { donny.classList.remove('punched'); flashText.classList.remove('active') }, 300);
    if (donnyHealth === 0) nextStage();
    updateUI();
}

function nextStage() {
    koSound.play();
    stage++;
    donnyMaxHealth += 200 * stage;
    donnyHealth = donnyMaxHealth;
    upgradeMsg.textContent = `Stage ${stage} begins!`;
    updateUI();
    setTimeout(() => upgradeMsg.textContent = '', 1500);
}

// Upgrade Logic
function buyClick() {
    if (totalPunches >= clickCost) {
        totalPunches -= clickCost;
        bonusDamage += 5;
        clickCost = Math.floor(clickCost * 1.8);
        upgradeMsg.textContent = 'Click damage ↑';
        updateUI();
    }
}

function buyAuto() {
    if (totalPunches >= autoCost) {
        totalPunches -= autoCost;
        autoClicks++;
        autoCost = Math.floor(autoCost * 2);
        upgradeMsg.textContent = 'Auto Clicker unlocked!';
        if (autoClicks === 1) startAuto();
        updateUI();
    }
}

function buyMultiplier() {
    if (totalPunches >= multiCost) {
        totalPunches -= multiCost;
        multiplier *= 2;
        multiCost = Math.floor(multiCost * 3);
        upgradeMsg.textContent = 'Multiplier ↑';
        updateUI();
    }
}

function buySpeed() {
    if (totalPunches >= speedCost && autoClicks > 0) {
        totalPunches -= speedCost;
        autoInterval = Math.max(200, autoInterval - 200);
        speedCost = Math.floor(speedCost * 2);
        upgradeMsg.textContent = 'Auto speed ↑';
        clearInterval(autoID);
        startAuto();
        updateUI();
    } else {
        upgradeMsg.textContent = 'Buy auto clicker first!';
    }
}

let autoID;
function startAuto() {
    autoID = setInterval(punch, autoInterval);
}

// Achievements Logic
const achDefs = [
    { id: '100p', text: '100 Punches', check: () => totalPunches >= 100 },
    { id: 'stage5', text: 'Reach Stage 5', check: () => stage >= 5 },
    { id: '500p', text: '500 Punches', check: () => totalPunches >= 500 },
    { id: 'stage10', text: 'Reach Stage 10', check: () => stage >= 10 },
];

function checkAchievements() {
    achDefs.forEach(a => {
        if (!achievements.includes(a.id) && a.check()) {
            achievements.push(a.id);
            let li = document.createElement('li');
            li.textContent = `✅ ${a.text}`;
            achList.appendChild(li);
        }
    });
}

// Reset Game
function resetGame() {
    totalPunches = 0;
    stage = 1;
    donnyMaxHealth = 200;
    donnyHealth = donnyMaxHealth;
    baseDamage = 10;
    bonusDamage = 0;
    autoClicks = 0;
    multiplier = 1;
    autoInterval = 1000;
    clickCost = 50;
    autoCost = 200;
    multiCost = 500;
    speedCost = 300;
    achievements = [];
    updateUI();
}

// Event Listeners
modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    document.body.classList.toggle('dark');
    modeToggle.textContent = document.body.classList.contains('light') ? 'Switch to Dark Mode' : 'Switch to Light Mode';
});

document.getElementById('punch-btn').onclick = punch;
donny.onclick = punch;
btnClickUp.onclick = buyClick;
btnAutoUp.onclick = buyAuto;
btnMultiUp.onclick = buyMultiplier;
btnSpeedUp.onclick = buySpeed;

document.getElementById('dev-activate').onclick = () => {
    const devCode = document.getElementById('dev-code').value;
    if (devCode === '1215') {
        devPanel.style.display = 'block';  // Show dev panel if code is correct
        document.getElementById('dev-punches').disabled = false;
        document.getElementById('dev-stage').disabled = false;
        document.getElementById('dev-health').disabled = false;
        document.getElementById('dev-reset').disabled = false;
    } else {
        alert('Incorrect code!');
    }
};

// Developer Power Actions
document.getElementById('dev-punches').addEventListener('change', () => {
    totalPunches = parseInt(document.getElementById('dev-punches').value);
    updateUI();
});

document.getElementById('dev-stage').addEventListener('change', () => {
    stage = parseInt(document.getElementById('dev-stage').value);
    donnyMaxHealth += (stage - 1) * 200;
    donnyHealth = donnyMaxHealth;
    updateUI();
});

document.getElementById('dev-health').addEventListener('change', () => {
    donnyHealth = parseInt(document.getElementById('dev-health').value);
    updateUI();
});

document.getElementById('dev-reset').addEventListener('click', resetGame);

updateUI();
