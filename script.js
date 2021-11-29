// Space Shooter

// Setup Canvas and Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables
let enemy1_1 = document.getElementById("enemy1-1_img");
let enemy1_2 = document.getElementById("enemy1-2_img");
let enemy2_1 = document.getElementById("enemy2-1_img");
let enemy2_2 = document.getElementById("enemy2-2_img");
let explodeImg = document.getElementById("explode_img");
let shipImg = document.getElementById("ship_img");
let backgroundImg = document.getElementById("background_img");
let backgroundY1 = 0;
let backgroundY2 = -600;
let shipX = 100;
let bullet1X, bullet1Y;
let bullet2X, bullet2Y;
let bullet1Shot = false;
let bullet2Shot = false;
let whichBullet = "2up";
let rightIsPressed = false;
let leftIsPressed = false;
let spaceIsPressed = false;
let frameCount1 = 0;
let frameCount2 = 0;
let spaceFrameCount = 0;
let enemy1 = {
    x: 60,
    y: 65,
    count: 0,
    explode: false
}
let enemy2 = {
    x: 210,
    y: 70,
    count: 0,
    explode: false
}
let enemy3 = {
    x: 350,
    y: 65,
    count: 0,
    explode: false
}
let enemy4 = {
    x: 490,
    y: 70,
    count: 0,
    explode: false
}
let enemy5 = {
    x: 630,
    y: 65,
    count: 0,
    explode: false
}

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
    if (event.code == "KeyR") {
        location.reload();
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
    // console.log()

    // BACKGROUND
    ctx.fillStyle = "white";
    ctx.drawImage(backgroundImg, 0, backgroundY1)
    ctx.drawImage(backgroundImg, 0, backgroundY2)
    backgroundY1 += 3;
    backgroundY2 += 3;
    if (backgroundY1 > 600) {
        backgroundY1 = -600;
    }
    if (backgroundY2 > 600) {
        backgroundY2 = -600;
    }

    // WHICH BULLET IS SHOT
    if (spaceIsPressed) {
        spaceFrameCount++;
        if (spaceFrameCount == 2) {
            if (whichBullet == 1) {
                whichBullet = "1wait";
            } else if (whichBullet == 2) {
                whichBullet = "2wait";
            }
        } else if (spaceFrameCount == 30) {
            if (whichBullet == "1wait") {
                whichBullet = 2;
            } else {
                whichBullet = 1;
            }
            spaceFrameCount = 0;
        } else if (whichBullet == "1up" && !bullet2Shot) {
            whichBullet = 2;
        } else if (whichBullet == "2up" && !bullet1Shot) {
            whichBullet = 1;
        }
    }

    if (whichBullet == 1) {
        bullet1Shot = true;
    }

    if (whichBullet == 2) {
        bullet2Shot = true;
    }

    // BULLET1
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

    // update bullet1 position
    if (!bullet1Shot) {
        bullet1X = shipX + 45;
        bullet1Y = 450
    }

    // BULLET2
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

    // update bullet2 position
    if (!bullet2Shot) {
        bullet2X = shipX + 45;
        bullet2Y = 450;
    }

    // SHIP

    // draw
    ctx.drawImage(shipImg, shipX, 450, 100, 100)

    // move
    if (rightIsPressed) {
        shipX += 5;
    } else if (leftIsPressed) {
        shipX -= 5;
    }

    // prevent ship from going off screen
    if (shipX < -70) {
        shipX = cnv.width;
    }
    if (shipX > cnv.width) {
        shipX = -70;
    }

    // ENEMIES
    // enemy 1
    enemy1.count++;
    if (enemy1.count <= 40 && enemy1.count > 0) {
        ctx.drawImage(enemy1_1, enemy1.x, enemy1.y, 80, 80);
    } else {
        ctx.drawImage(enemy1_2, enemy1.x, enemy1.y, 80, 80);
        if (enemy1.count > 40) {
            enemy1.count = -40;
        }
    }

    if (bullet1X > enemy1.x + 20 && bullet1X < enemy1.x + 55 && bullet1Y > enemy1.y + 10 && bullet1Y < enemy1.y + 60) {
        enemy1.explode = true;
        bullet1Shot = false;
        frameCount1 = 0;
    } else if (bullet2X > enemy1.x + 20 && bullet2X < enemy1.x + 55 && bullet2Y > enemy1.y + 10 && bullet2Y < enemy1.y + 60) {
        enemy1.explode = true;
        bullet2Shot = false;
        frameCount2 = 0;
    }

    // enemy 2
    enemy2.count++;
    if (enemy2.count <= 40 && enemy2.count > 0) {
        ctx.drawImage(enemy2_1, enemy2.x, enemy2.y, 70, 70);
    } else {
        ctx.drawImage(enemy2_2, enemy2.x, enemy2.y, 70, 70);
        if (enemy2.count > 40) {
            enemy2.count = -40;
        }
    }

    if (bullet1X > enemy2.x + 20 && bullet1X < enemy2.x + 70 && bullet1Y > enemy2.y && bullet1Y < enemy2.y + 70 || bullet1X > enemy2.x - 5 && bullet1X < enemy2.x + 30 && bullet1Y > enemy2.y + 20 && bullet1Y < enemy2.y + 40) {
        bullet1Shot = false;
        
        frameCount1 = 0;
        enemy2.y = -1000;
    } else if (bullet2X > enemy2.x + 20 && bullet2X < enemy2.x + 70 && bullet2Y > enemy2.y && bullet2Y < enemy2.y + 70 || bullet2X > enemy2.x - 5 && bullet2X < enemy2.x + 30 && bullet2Y > enemy2.y + 20 && bullet2Y < enemy2.y + 40) {
        bullet2Shot = false;
        frameCount2 = 0;
        enemy2.y = -1000;
    }

    // enemy 3
    enemy3.count++;
    if (enemy3.count <= 40 && enemy3.count > 0) {
        ctx.drawImage(enemy1_1, enemy3.x, enemy3.y, 80, 80);
    } else {
        ctx.drawImage(enemy1_2, enemy3.x, enemy3.y, 80, 80);
        if (enemy3.count > 40) {
            enemy3.count = -40;
        }
    }

    if (bullet1X > enemy3.x + 20 && bullet1X < enemy3.x + 55 && bullet1Y > enemy3.y + 10 && bullet1Y < enemy3.y + 60) {
        bullet1Shot = false;
        frameCount1 = 0;
        enemy3.y = -1000;
    } else if (bullet2X > enemy3.x + 20 && bullet2X < enemy3.x + 55 && bullet2Y > enemy3.y + 10 && bullet2Y < enemy3.y + 60) {
        bullet2Shot = false;
        frameCount2 = 0;
        enemy3.y = -1000;
    }

    // enemy 4
    enemy4.count++;
    if (enemy4.count <= 40 && enemy4.count > 0) {
        ctx.drawImage(enemy2_1, enemy4.x, enemy4.y, 70, 70);
    } else {
        ctx.drawImage(enemy2_2, enemy4.x, enemy4.y, 70, 70);
        if (enemy4.count > 40) {
            enemy4.count = -40;
        }
    }

    if (bullet1X > enemy4.x + 20 && bullet1X < enemy4.x + 70 && bullet1Y > enemy4.y && bullet1Y < enemy4.y + 70 || bullet1X > enemy4.x - 5 && bullet1X < enemy4.x + 30 && bullet1Y > enemy4.y + 20 && bullet1Y < enemy4.y + 40) {
        bullet1Shot = false;
        frameCount1 = 0;
        enemy4.y = -1000;
    } else if (bullet2X > enemy4.x + 20 && bullet2X < enemy4.x + 70 && bullet2Y > enemy4.y && bullet2Y < enemy4.y + 70 || bullet2X > enemy4.x - 5 && bullet2X < enemy4.x + 30 && bullet2Y > enemy4.y + 20 && bullet2Y < enemy4.y + 40) {
        bullet2Shot = false;
        frameCount2 = 0;
        enemy4.y = -1000;
    }

    // enemy 5
    enemy5.count++;
    if (enemy5.count <= 40 && enemy5.count > 0) {
        ctx.drawImage(enemy1_1, enemy5.x, enemy5.y, 80, 80);
    } else {
        ctx.drawImage(enemy1_2, enemy5.x, enemy5.y, 80, 80);
        if (enemy5.count > 40) {
            enemy5.count = -40;
        }
    }

    if (bullet1X > enemy5.x + 20 && bullet1X < enemy5.x + 55 && bullet1Y > enemy5.y + 10 && bullet1Y < enemy5.y + 60) {
        bullet1Shot = false;
        frameCount1 = 0;
        enemy5.y = -1000;
    } else if (bullet2X > enemy5.x + 20 && bullet2X < enemy5.x + 55 && bullet2Y > enemy5.y + 10 && bullet2Y < enemy5.y + 60) {
        bullet2Shot = false;
        frameCount2 = 0;
        enemy5.y = -1000;
    }

    // explode
    if (enemy1.explode) {
        ctx.drawImage(explodeImg, enemy1.x, enemy1.y, 80, 80);
        enemy1.x = 1000;
    }

    requestAnimationFrame(loop);
}