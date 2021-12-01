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
let shipHealth = 3;
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
let explode1X, explode1Y, explode2X, explode2Y, explode3X, explode3Y, explode4X, explode4Y, explode5X, explode5Y
let enemy1 = {
    x: -580,
    y: 20,
    count: 0,
    explode: false,
    speed: 1,
}
let enemy2 = {
    x: -430,
    y: 15,
    count: 0,
    explode: false,
    speed: 1,
}
let enemy3 = {
    x: -290,
    y: 20,
    count: 0,
    explode: false,
    speed: 1,
}
let enemy4 = {
    x: -150,
    y: 15,
    count: 0,
    explode: false,
    speed: 1,
}
let enemy5 = {
    x: -10,
    y: 20,
    count: 0,
    explode: false,
    speed: 1,
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
    if (backgroundY1 > cnv.height) {
        backgroundY1 = cnv.height * -1;
    }
    if (backgroundY2 > cnv.height) {
        backgroundY2 = cnv.height * -1;
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
    ctx.drawImage(shipImg, shipX, 430, 100, 100)

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

    // health
    ctx.font = "50px courier new";
    ctx.fillStyle = "white";
    ctx.fillText(shipHealth, 10, 588)
    if (shipHealth > 0) {
        ctx.drawImage(shipImg, 40, 530, 70, 70);
    }
    if (shipHealth > 1) {
        ctx.drawImage(shipImg, 90, 530, 70, 70);
    }
    if (shipHealth > 2) {
        ctx.drawImage(shipImg, 140, 530, 70, 70);
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
        explode1();
        bullet1Shot = false;
        frameCount1 = 0;
    } else if (bullet2X > enemy1.x + 20 && bullet2X < enemy1.x + 55 && bullet2Y > enemy1.y + 10 && bullet2Y < enemy1.y + 60) {
        explode1();
        bullet2Shot = false;
        frameCount2 = 0;
    }
    function explode1() {
        enemy1.explode = true;
        explode1X = enemy1.x;
        explode1Y = enemy1.y;
        enemy1.x = 1000;
        enemy1.count = -80;
    }
    if (enemy1.count < -40) {
        ctx.drawImage(explodeImg, explode1X, explode1Y, 80, 80);
    }

    // enemy 2
    enemy2.count++;
    if (enemy2.count <= 40 && enemy2.count > 0) {
        ctx.drawImage(enemy2_1, enemy2.x, enemy2.y, 80, 80);
    } else {
        ctx.drawImage(enemy2_2, enemy2.x, enemy2.y, 80, 80);
        if (enemy2.count > 40) {
            enemy2.count = -40;
        }
    }

    if (bullet1X > enemy2.x + 20 && bullet1X < enemy2.x + 70 && bullet1Y > enemy2.y && bullet1Y < enemy2.y + 70 || bullet1X > enemy2.x - 5 && bullet1X < enemy2.x + 30 && bullet1Y > enemy2.y + 20 && bullet1Y < enemy2.y + 40) {
        explode2();
        bullet1Shot = false;
        frameCount1 = 0;
    } else if (bullet2X > enemy2.x + 20 && bullet2X < enemy2.x + 70 && bullet2Y > enemy2.y && bullet2Y < enemy2.y + 70 || bullet2X > enemy2.x - 5 && bullet2X < enemy2.x + 30 && bullet2Y > enemy2.y + 20 && bullet2Y < enemy2.y + 40) {
        explode2();
        bullet2Shot = false;
        frameCount2 = 0;
    }
    function explode2() {
        enemy2.explode = true;
        explode2X = enemy2.x;
        explode2Y = enemy2.y;
        enemy2.x = 1000;
        enemy2.count = -80;
    }
    if (enemy2.count < -40) {
        ctx.drawImage(explodeImg, explode2X, explode2Y, 80, 80);
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
        explode3();
        bullet1Shot = false;
        frameCount1 = 0;
    } else if (bullet2X > enemy3.x + 20 && bullet2X < enemy3.x + 55 && bullet2Y > enemy3.y + 10 && bullet2Y < enemy3.y + 60) {
        explode3();
        bullet2Shot = false;
        frameCount2 = 0;
    }
    function explode3() {
        enemy3.explode = true;
        explode3X = enemy3.x;
        explode3Y = enemy3.y;
        enemy3.x = 1000;
        enemy3.count = -80;
    }
    if (enemy3.count < -40) {
        ctx.drawImage(explodeImg, explode3X, explode3Y, 80, 80);
    }

    // enemy 4
    enemy4.count++;
    if (enemy4.count <= 40 && enemy4.count > 0) {
        ctx.drawImage(enemy2_1, enemy4.x, enemy4.y, 80, 80);
    } else {
        ctx.drawImage(enemy2_2, enemy4.x, enemy4.y, 80, 80);
        if (enemy4.count > 40) {
            enemy4.count = -40;
        }
    }

    if (bullet1X > enemy4.x + 20 && bullet1X < enemy4.x + 70 && bullet1Y > enemy4.y && bullet1Y < enemy4.y + 70 || bullet1X > enemy4.x - 5 && bullet1X < enemy4.x + 30 && bullet1Y > enemy4.y + 20 && bullet1Y < enemy4.y + 40) {
        explode4();
        bullet1Shot = false;
        frameCount1 = 0;
    } else if (bullet2X > enemy4.x + 20 && bullet2X < enemy4.x + 70 && bullet2Y > enemy4.y && bullet2Y < enemy4.y + 70 || bullet2X > enemy4.x - 5 && bullet2X < enemy4.x + 30 && bullet2Y > enemy4.y + 20 && bullet2Y < enemy4.y + 40) {
        explode4();
        bullet2Shot = false;
        frameCount2 = 0;
    }
    function explode4() {
        enemy4.explode = true;
        explode4X = enemy4.x;
        explode4Y = enemy4.y;
        enemy4.x = 1000;
        enemy4.count = -80;
    }
    if (enemy4.count < -40) {
        ctx.drawImage(explodeImg, explode4X, explode4Y, 80, 80);
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
        explode5();
        bullet1Shot = false;
        frameCount1 = 0;
    } else if (bullet2X > enemy5.x + 20 && bullet2X < enemy5.x + 55 && bullet2Y > enemy5.y + 10 && bullet2Y < enemy5.y + 60) {
        explode5();
        bullet2Shot = false;
        frameCount2 = 0;
    }
    function explode5() {
        enemy5.explode = true;
        explode5X = enemy5.x;
        explode5Y = enemy5.y;
        enemy5.x = 1000;
        enemy5.count = -80;
    }
    if (enemy5.count < -40) {
        ctx.drawImage(explodeImg, explode5X, explode5Y, 80, 80);
    }

    // ANIMATE ENEMIES
    enemy1.x += enemy1.speed;
    enemy2.x += enemy2.speed;
    enemy3.x += enemy3.speed;
    enemy4.x += enemy4.speed;
    enemy5.x += enemy5.speed;

    // right side
    if (enemy1.x > 670) {
        enemy1.speed = -enemy1.speed;
        enemy1.y += 85;
    }
    if (enemy2.x > 670) {
        enemy2.speed = -enemy2.speed;
        enemy2.y += 85;
    }
    if (enemy3.x > 670) {
        enemy3.speed = -enemy3.speed;
        enemy3.y += 85;
    }
    if (enemy4.x > 670) {
        enemy4.speed = -enemy4.speed;
        enemy4.y += 85;
    }
    if (enemy5.x > 670) {
        enemy5.speed = -enemy5.speed;
        enemy5.y += 85;
    }

    // left side
    if (enemy1.x < 10 && enemy1.speed < 0) {
        enemy1.speed = 3
        enemy1.y += 85;
    }
    if (enemy2.x < 10 && enemy2.speed < 0) {
        enemy2.speed = 3
        enemy2.y += 85;
    }
    if (enemy3.x < 10 && enemy3.speed < 0) {
        enemy3.speed = 3
        enemy3.y += 85;
    }
    if (enemy4.x < 10 && enemy4.speed < 0) {
        enemy4.speed = 3
        enemy4.y += 85;
    }
    if (enemy5.x < 10 && enemy5.speed < 0) {
        enemy5.speed = 3
        enemy5.y += 85;
    }

    // WIN
    if (enemy1.explode && enemy2.explode && enemy3.explode && enemy4.explode && enemy5.explode) {
        console.log("yee")
    }

    requestAnimationFrame(loop);
}