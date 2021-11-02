// Simple Paint

// Setup Canvas and Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 600;
cnv.height = 400;

// Global Variables
let mouseIsPressed = false;
let mouseX, mouseY;
let size = 5;
let penColor = "black";

// Main Program Loop (60 FPS)
requestAnimationFrame(loop);

function loop() {
    // Draw a circle if mouseIsPressed
    if (mouseIsPressed) {
        ctx.fillStyle = penColor;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, size, 0, 2 * Math.PI);
        ctx.fill();
    }

    requestAnimationFrame(loop);
}

// Event Stuff
document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);
document.addEventListener("mousemove", mousemoveHandler);
document.addEventListener("keydown", keydownHandler);

function mousedownHandler() {
    mouseIsPressed = true;
}

function mouseupHandler() {
    mouseIsPressed = false;
}

function mousemoveHandler() {
    let cnvRect = cnv.getBoundingClientRect();
    mouseX = event.x - cnvRect.x;
    mouseY = event.y - cnvRect.y;
}

function keydownHandler() {
    if (event.code == "Space") {
        // Draw a background
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, cnv.width, cnv.height);
    } else if (event.code == "ArrowUp") {
        size++;
    } else if (event.code == "ArrowDown" && size > 1) {
        console.log(size)
        size--;
    } else if (event.code == "Digit1") {
        penColor = "red";
    } else if (event.code == "Digit2") {
        penColor = "green";
    } else if (event.code == "Digit3") {
        penColor = "blue";
    }
}