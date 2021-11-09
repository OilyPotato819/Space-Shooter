// Space Shooter

// Setup Canvas and Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables
let shipX = 50;
let shipY = 50;
let bullet1X = shipX + 10;
let bullet1Y = shipY - 20;
let bullet2X = shipX + 10;
let bullet2Y = shipY - 20;
let dIsPressed = false;
let aIsPressed = false;
let wIsPressed = false;
let sIsPressed = false;
let bullet1Shot = false;
let bullet2Shot = false;
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
        frameCount = 0;
    }
}

// Main Program Loop (60 FPS)
requestAnimationFrame(loop);

function loop() {
    // Background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    // Bullet1
    if (spaceIsPressed) {
        bullet1Shot = true;

        frameCount++
        if (frameCount = 50) {
            console.log("grebis")
        }
    }


    if (bullet1Shot) {
        ctx.fillStyle = "blue";
        ctx.fillRect(bullet1X, bullet1Y, 5, 20);
        bullet1Y -= 7;
    }

    if (!bullet1Shot) {
        bullet1X = shipX + 10;
        bullet1Y = shipY - 20;
    }

    // Bullet2
    if (bullet2Shot) {
        ctx.fillStyle = "blue";
        ctx.fillRect(bullet2X, bullet2Y, 5, 20);
        bullet2Y -= 7;
    }

    if (bullet2Y < -50) {
        bullet2Shot = false;
    }

    if (!bullet2Shot) {
        bullet2X = shipX + 10;
        bullet2Y = shipY - 20;
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