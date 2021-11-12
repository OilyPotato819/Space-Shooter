// Space Shooter

// Setup Canvas and Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables
let shipX = 100;
let bullet1X = shipX + 10;
let bullet1Y = 480;
let bullet2X = shipX + 10;
let bullet2Y = 480;
let bullet1Shot = false;
let bullet2Shot = false;
let whichBullet = "2up";
let rightIsPressed = false;
let leftIsPressed = false;
let spaceIsPressed = false;
let frameCount1 = 0;
let frameCount2 = 0;
let spaceFrameCount = 0;

// Document Event Stuff
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler() {
    if (event.code == "KeyD" || event.code == "ArrowRight") {
        rightIsPressed = true;
    }
    if (event.code == "KeyA" || event.code == "ArrowLeft") {
        leftIsPressed = true;
    }
    if (event.code == "Space") {
        spaceIsPressed = true;
    }
}

function keyupHandler() {
    if (event.code == "KeyD" || event.code == "ArrowRight") {
        rightIsPressed = false;
    }
    if (event.code == "KeyA" || event.code == "ArrowLeft") {
        leftIsPressed = false;
    }
    if (event.code == "Space") {
        spaceIsPressed = false;
        if (whichBullet == 1) {
            whichBullet = "1up";
        } else if (whichBullet == 2) {
            whichBullet = "2up";
        } else if (whichBullet == "1wait") {
            whichBullet = "1up";
        } else if (whichBullet == "2wait") {
            whichBullet = "2up";
        }
        spaceFrameCount = 0;
    }
}

// Main Program Loop (60 FPS)
requestAnimationFrame(loop);

function loop() {
    // Background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    // Decide which bullet to shoot
    if (spaceIsPressed) {
        spaceFrameCount++;
        if (spaceFrameCount == 2) {
            if (whichBullet == 1) {
                whichBullet = "1wait";
            } else {
                whichBullet = "2wait";
            }
        } else if (spaceFrameCount == 30) {
            if (whichBullet == "1wait") {
                whichBullet = 2;
            } else {
                whichBullet = 1;
            }
            spaceFrameCount = 0;
        } else if (whichBullet == "1up") {
            whichBullet = 2;
        } else if (whichBullet == "2up") {
            whichBullet = 1;
        }
    }

    if (whichBullet == 1) {
        bullet1Shot = true;
    }

    if (whichBullet == 2) {
        bullet2Shot = true;
    }

    // Bullet1
    if (bullet1Shot) {
        ctx.fillStyle = "red";
        ctx.fillRect(bullet1X, bullet1Y, 5, 20);
        bullet1Y -= 10;

        frameCount1++;
        if (frameCount1 == 60) {
            bullet1Shot = false;
            frameCount1 = 0;
            bullet1X = shipX + 10;
            bullet1Y = 480;
        }
    }

    // Update bullet1 position
    if (!bullet1Shot) {
        bullet1X = shipX + 10;
        bullet1Y = 480
    }

    // // Bullet2
    if (bullet2Shot) {
        ctx.fillStyle = "blue";
        ctx.fillRect(bullet2X, bullet2Y, 5, 20);
        bullet2Y -= 10;

        frameCount2++;
        if (frameCount2 == 60) {
            bullet2Shot = false;
            frameCount2 = 0;
            bullet2X = shipX + 10;
            bullet2Y = 480;
        }
    }

    // Update bullet2 position
    if (!bullet2Shot) {
        bullet2X = shipX + 10;
        bullet2Y = 480;
    }

    // Ship

    // Draw
    ctx.fillStyle = "black";
    ctx.fillRect(shipX, 500, 25, 25);

    // Move
    if (rightIsPressed) {
        shipX += 5;
    } else if (leftIsPressed) {
        shipX -= 5;
    }

    // Prevent ship from going off screen
    if (shipX < -15) {
        shipX = cnv.width;
    }
    if (shipX > cnv.width) {
        shipX = -15;
    }

    requestAnimationFrame(loop);
}
