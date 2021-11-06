// Space Shooter

// Setup Canvas and Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables
let shipX = 50;
let shipY = 50;
let shipDirectionX, shipDirectionY;
let dIsPressed = "false";
let aIsPressed = "false";
let wIsPressed = "false";
let sIsPressed = "false";

// Document Event Stuff
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler() {
    if (event.code == "KeyD") {
        dIsPressed = "true";
        shipDirectionX = "right";
    }
    if (event.code == "KeyA") {
        aIsPressed = "true";
        shipDirectionX = "left";
    }
    if (event.code == "KeyW") {
        wIsPressed = "true";
        shipDirectionY = "up";
    }
    if (event.code == "KeyS") {
        sIsPressed = "true";
        shipDirectionY = "down";
    }
}

function keyupHandler() {
    if (event.code == "KeyD") {
        dIsPressed = "false";
        if (aIsPressed == "true") {
            shipDirectionX = "left";
        } else {
            shipDirectionX = "stay";
        }
    }
    if (event.code == "KeyA") {
        aIsPressed = "false";
        if (dIsPressed == "true") {
            shipDirectionX = "right";
        } else {
            shipDirectionX = "stay";
        }
    }
    if (event.code == "KeyW") {
        wIsPressed = "false";
        if (sIsPressed == "true") {
            shipDirectionY = "down";
        } else {
            shipDirectionY = "stay";
        }
    }
    if (event.code == "KeyS") {
        sIsPressed = "false";
        if (wIsPressed == "true") {
            shipDirectionY = "up";
        } else {
            shipDirectionY = "stay";
        }
    }
}

// Main Program Loop (60 FPS)
requestAnimationFrame(loop);

function loop() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    ctx.fillStyle = "black";
    ctx.fillRect(shipX, shipY, 50, 50);

    if (shipDirectionX == "right") {
        shipX += 5;
    }
    if (shipDirectionX == "left") {
        shipX -= 5;
    }
    if (shipDirectionY == "up") {
        shipY -= 5;
    }
    if (shipDirectionY == "down") {
        shipY += 5;
    }

    requestAnimationFrame(loop);
}