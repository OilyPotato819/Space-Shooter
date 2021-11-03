// Simple Paint

// Setup Canvas and Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables
let mouseIsPressed = false;
let mouseX, mouseY, pmouseX, pmouseY;
let size = 5;
let penColor = "black";

// Main Program Loop (60 FPS)
requestAnimationFrame(loop);

function loop() {
    // Draw a circle if mouseIsPressed
    if (mouseIsPressed) {
        for (let currentX = pmouseX; currentX != mouseX; currentX++) {
            console.log(currentX)
            console.log("mouseX)
        }
        ctx.fillStyle = penColor;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, size, 0, 2 * Math.PI);
        ctx.fill();
        console.log("pmouse " + mouseX);
        console.log("mouse " + pmouseX);
    }
    requestAnimationFrame(loop);
}

// Document Event Stuff
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
    // Save previous mouse x and y
    pmouseX = mouseX;
    pmouseY = mouseY;

    // Update mouseX and mouseY
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
        console.log(size)
    } else if (event.code == "ArrowDown" && size > 1) {
        console.log(size)
        size--;
    }
}

// Color Events
document.getElementById("redBtn").addEventListener("click", setRed);
document.getElementById("greenBtn").addEventListener("click", setGreen);
document.getElementById("blueBtn").addEventListener("click", setBlue);
document.getElementById("color-picker").addEventListener("change", changeColor);

function setRed() {
    penColor = "red";
}

function setGreen() {
    penColor = "green";
}

function setBlue() {
    penColor = "blue";
}

function changeColor() {
    penColor = document.getElementById("color-picker").value;
}