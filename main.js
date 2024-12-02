// Game variables
const player = { start: false, speed: 5, score: 0, x: 0, y: 0, keys: {} };
const keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

// Select DOM elements
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
const scoreElement = document.querySelector('.score');

// Start game function
function startGame() {
    // Hide start screen
    startScreen.classList.add('hide');

    // Reset game state
    gameArea.innerHTML = '';
    player.start = true;
    player.score = 0;

    // Create player car
    const car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);

    // Position the car in the center of the game area
    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // Add road lines and enemies
    createRoadLines();
    createEnemies();

    window.requestAnimationFrame(playGame);
}

// Play game function
function playGame() {
    const car = document.querySelector('.car');

    if (player.start) {
        moveLines();
        moveEnemies(car);
        handlePlayerMovement(car);
        player.score++;
        scoreElement.innerText = `Score: ${player.score}`;

        window.requestAnimationFrame(playGame);
    }
}

// Handle player movement
function handlePlayerMovement(car) {
    const gameAreaBounds = gameArea.getBoundingClientRect();

    if (keys.ArrowUp && player.y > gameAreaBounds.top) player.y -= player.speed;
    if (keys.ArrowDown && player.y < gameAreaBounds.bottom - car.offsetHeight) player.y += player.speed;
    if (keys.ArrowLeft && player.x > 0) player.x -= player.speed;
    if (keys.ArrowRight && player.x < gameAreaBounds.width - car.offsetWidth) player.x += player.speed;

    car.style.top = player.y + 'px';
    car.style.left = player.x + 'px';
}

// Create road lines
function createRoadLines() {
    for (let i = 0; i < 5; i++) {
        const line = document.createElement('div');
        line.setAttribute('class', 'lines');
        line.style.top = (i * 150) + 'px';
        gameArea.appendChild(line);
    }
}

// Move road lines
function moveLines() {
    const lines = document.querySelectorAll('.lines');

    lines.forEach(line => {
        if (line.offsetTop >= 700) {
            line.style.top = '0px';
        } else {
            line.style.top = line.offsetTop + player.speed + 'px';
        }
    });
}

// Create enemy cars
function createEnemies() {
    for (let i = 0; i < 3; i++) {
        const enemy = document.createElement('div');
        enemy.setAttribute('class', 'enemy');
        enemy.style.top = (i * 150) + 'px';
        enemy.style.left = Math.floor(Math.random() * 350) + 'px';
        gameArea.appendChild(enemy);
    }
}

// Move enemies
function moveEnemies(car) {
    const enemies = document.querySelectorAll('.enemy');

    enemies.forEach(enemy => {
        if (enemy.offsetTop >= 700) {
            enemy.style.top = '-100px';
            enemy.style.left = Math.floor(Math.random() * 350) + 'px';
        } else {
            enemy.style.top = enemy.offsetTop + player.speed + 'px';
        }

        // Collision detection
        if (isCollide(car, enemy)) {
            endGame();
        }
    });
}

// Collision detection function
function isCollide(car, enemy) {
    const carRect = car.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    return !(
        carRect.bottom < enemyRect.top ||
        carRect.top > enemyRect.bottom ||
        carRect.right < enemyRect.left ||
        carRect.left > enemyRect.right
    );
}

// End game function
function endGame() {
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = `Game Over!<br>Your Score: ${player.score}<br>Click to Restart`;
}

// Event listeners for key presses
function pressOn(event) {
    event.preventDefault();
    keys[event.key] = true;
}

function pressOff(event) {
    event.preventDefault();
    keys[event.key] = false;
}

// Attach event listeners
startScreen.addEventListener('click', startGame);
startScreen.addEventListener('touchstart', startGame);
window.addEventListener('keydown', pressOn);
window.addEventListener('keyup', pressOff);
