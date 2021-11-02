// Animation Basics

// Setup Canvas and Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 600;
cnv.height = 400;

// Global Variables
let rectX = 100;
let rectSize = 80;
let rectBlue = 255;
let rectRed = 0;

let dIsPressed = false;

// Main Program Loop (60 FPS)
requestAnimationFrame(loop);
function loop() {
    // Update Variables
    rectX += 1;
    rectSize += Math.random() * 2 - 1;
    rectBlue--;
    rectRed++;

    // Draw a background
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    
    if (dIsPressed) {
        // Draw a square
        ctx.fillStyle = "rgb(" + rectRed + ", 0," + rectBlue + ")";
        ctx.fillRect(rectX, 50, rectSize, rectSize);
    }

    requestAnimationFrame(loop);
}

// Event Stuff
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler() {
    console.log(event.code)
    if (event.code == "KeyD") {
        dIsPressed = true;
    }
}

function keyupHandler() {
    if (event.code == "KeyD") {
        dIsPressed = false;
    }
}