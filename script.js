// Space Shooter

// Setup Canvas and Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables
let shipX = 300;
let shipY = 590;
let bullet1X = shipX + 10;
let bullet1Y = shipY - 20;
let bullet2X = shipX + 10;
let bullet2Y = shipY - 20;
let bullet1Shot = false;
let bullet2Shot = false;
let useBullet2 = 0;
let dIsPressed = false;
let aIsPressed = false;
let wIsPressed = false;
let sIsPressed = false;
let spaceIsPressed = false;
let frameCount1 = 0;
let frameCount2 = 0;
let currentFrame = 0;
let getCurrentFrame = false;

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
        if (useBullet2 == 1) {
            useBullet2++;
        }
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
        if (useBullet2 == 0 && bullet1Shot) {
            useBullet2++;
        }
    }
}

// Main Program Loop (60 FPS)
requestAnimationFrame(loop);

function loop() {
    console.log(useBullet2)
    // Background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    // Bullet1
    if (bullet1Shot) {
        ctx.fillStyle = "blue";
        ctx.fillRect(bullet1X, bullet1Y, 5, 20);
        bullet1Y -= 10;

        frameCount1++;
        if (frameCount1 == 30 && spaceIsPressed) {
            bullet2Shot = true;
            bullet2X = shipX + 10;
            bullet2Y = shipY - 20;
        }
        if (frameCount1 == 60) {
            bullet1Shot = false;
            frameCount1 = 0;
            bullet1X = shipX + 10;
            bullet1Y = shipY - 20;
            useBullet2 = 0;
        }
    }

    if (spaceIsPressed == true) {
        bullet1Shot = true;
    }

    if (!bullet1Shot) {
        bullet1X = shipX + 10;
        bullet1Y = shipY - 20;
    }

    // // Bullet2
    if (useBullet2 == 2) {
        bullet2Shot = true;
    }
    if (bullet2Shot) {
        ctx.fillStyle = "blue";
        ctx.fillRect(bullet2X, bullet2Y, 5, 20);
        bullet2Y -= 10;

        frameCount2++;
        if (frameCount2 == 60) {
            bullet2Shot = false;
            frameCount2 = 0;
            bullet2X = shipX + 10;
            bullet2Y = shipY - 20;
            useBullet2 = 0;
        }
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