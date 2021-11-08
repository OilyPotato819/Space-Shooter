// Space Shooter

// Setup Canvas and Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables
let shipX = 50;
let shipY = 50;
let bulletX = shipX;
let bulletY = shipY;
let dIsPressed = false;
let aIsPressed = false;
let wIsPressed = false;
let sIsPressed = false;
let bulletShot = false;
let frameCount = 0;
let currentFrame = 0;
let getCurrentFrame = false;
let spaceIsPressed = false;

// Document Event Stuff
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler() {
    if (event.code == "KeyD") {
        dIsPressed = true;
    }
    if (event.code == "KeyA") {
        aIsPressed = true;
    }
    if (event.code == "KeyW") {
        wIsPressed = true;
    }
    if (event.code == "KeyS") {
        sIsPressed = true;
    }
    if (event.code == "Space") {
        spaceIsPressed = true;
    }
}

function keyupHandler() {
    if (event.code == "KeyD") {
        dIsPressed = false;
    }
    if (event.code == "KeyA") {
        aIsPressed = false;
    }
    if (event.code == "KeyW") {
        wIsPressed = false;
    }
    if (event.code == "KeyS") {
        sIsPressed = false;
    }
    if (event.code == "Space") {
        spaceIsPressed = false;
    }
}

// Main Program Loop (60 FPS)
requestAnimationFrame(loop);

function loop() {
    console.log(currentFrame)
    frameCount++;

    // Background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    // Bullet
    if (spaceIsPressed) {
        bulletShot = true;
    }

    if (bulletShot) {
        ctx.fillStyle = "blue";
        ctx.fillRect(bulletX + 10, bulletY - 20, 5, 20);
        bulletY -= 7;

        if (currentFrame == 0) {
            getCurrentFrame = true;
        }

        if (getCurrentFrame) {
            currentFrame = frameCount;
            console.log(currentFrame)
            getCurrentFrame = false;
        }
    
        if (currentFrame + 50 == frameCount) {
            console.log("grebis")
            currentFrame = 0;
        }
    }

    if (bulletY < -50) {
        bulletShot = false;
    }

    if (!bulletShot) {
        bulletX = shipX;
        bulletY = shipY;
    }

    // Ship
    ctx.fillStyle = "black";
    ctx.fillRect(shipX, shipY, 25, 25);

    if (dIsPressed) {
        shipX += 5;
    } else if (aIsPressed) {
        shipX -= 5;
    }
    if (wIsPressed) {
        shipY -= 5;
    } else if (sIsPressed) {
        shipY += 5;
    }

    requestAnimationFrame(loop);
}