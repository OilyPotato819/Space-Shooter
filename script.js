// Space Shooter

// Setup Canvas and Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables
let shipX = 50;
let shipY = 50;
let bulletX = shipX
let bulletY = shipY
let shipSpeedX = 0;
let shipSpeedY = 0;
let dIsPressed = false;
let aIsPressed = false;
let wIsPressed = false;
let sIsPressed = false;
let bulletShot = false;
let frameCount = 0;
let spaceIsPressed = false;

// Document Event Stuff
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler() {
    if (event.code == "KeyD") {
        dIsPressed = true;
        shipSpeedX = 5;
    }
    if (event.code == "KeyA") {
        aIsPressed = true;
        shipSpeedX = -5;
    }
    if (event.code == "KeyW") {
        wIsPressed = true;
        shipSpeedY = -5;
    }
    if (event.code == "KeyS") {
        sIsPressed = true;
        shipSpeedY = 5;
    }
    if (event.code == "Space") {
        spaceIsPressed = true;
        bulletShot = true;
    }
}

function keyupHandler() {
    if (event.code == "KeyD") {
        dIsPressed = false;
        if (aIsPressed == true) {
            shipSpeedX = -5;
        } else {
            shipSpeedX = 0;
        }
    }
    if (event.code == "KeyA") {
        aIsPressed = false;
        if (dIsPressed == true) {
            shipSpeedX = 5;
        } else {
            shipSpeedX = 0;
        }
    }
    if (event.code == "KeyW") {
        wIsPressed = false;
        if (sIsPressed == true) {
            shipSpeedY = 5;
        } else {
            shipSpeedY = 0;
        }
    }
    if (event.code == "KeyS") {
        sIsPressed = false;
        if (wIsPressed == true) {
            shipSpeedY = -5;
        } else {
            shipSpeedY = 0;
        }
    }
    if (event.code == "Space") {
        spaceIsPressed = false;
    }
}

function getCurrentFrame() {
    var currentFrame = frameCount;
    console.log(currentFrame, frameCount)
}

// Main Program Loop (60 FPS)
requestAnimationFrame(loop);

function loop() {
    // Background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    // Bullet
    if (spaceIsPressed) {
        bulletShot = true;
    }

    if (bulletShot) {
        ctx.fillStyle = "blue";
        ctx.fillRect(bulletX + 8, bulletY - 20, 5, 20);
        bulletY -= 5;
    }

    if (bulletY < -50) {
        bulletShot = false;
        bulletY = shipY;
        bulletX = shipX;
    }

    if (!bulletShot) {
        bulletX += shipSpeedX
        bulletY += shipSpeedY
    }

    // Ship
    ctx.fillStyle = "black";
    ctx.fillRect(shipX, shipY, 25, 25);

    shipX += shipSpeedX
    shipY += shipSpeedY

    requestAnimationFrame(loop);
}