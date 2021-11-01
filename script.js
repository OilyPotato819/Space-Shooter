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

let frameCount = 0;

// Main Program Loop
requestAnimationFrame(loop);
function loop() {
    // Update Variables
    frameCount++; // update frame count
    console.log(frameCount);

    if (frameCount > 180) {
        rectX += 1;
        rectBlue--;
        rectRed++;
    }
    rectSize += Math.random() * 2 - 1;

    // Draw a background
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    // Draw a square
    ctx.fillStyle = "rgb(" + rectRed + ", 0," + rectBlue + ")";
    ctx.fillRect(rectX, 50, rectSize, rectSize);

    requestAnimationFrame(loop);
}