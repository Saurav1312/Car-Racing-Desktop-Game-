let keys = { ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false };
let touchStartX = 0, touchStartY = 0;

document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);

// Mobile Swipe Controls
document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
    let touchEndX = e.touches[0].clientX;
    let touchEndY = e.touches[0].clientY;

    if (touchEndX - touchStartX > 50) keys.ArrowRight = true;
    else if (touchStartX - touchEndX > 50) keys.ArrowLeft = true;

    if (touchEndY - touchStartY > 50) keys.ArrowDown = true;
    else if (touchStartY - touchEndY > 50) keys.ArrowUp = true;
});

document.addEventListener('touchend', () => {
    keys.ArrowUp = keys.ArrowDown = keys.ArrowLeft = keys.ArrowRight = false;
});

function randomColor() {
    const c = () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    return `#${c()}${c()}${c()}`;
}

// Gameplay logic remains mostly unchanged
// Add animations and touch controls for better gameplay experience
