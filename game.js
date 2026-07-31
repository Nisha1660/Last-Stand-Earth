// ======================================
// LAST STAND : EARTH
// PART 3
// ======================================

// Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// UI
const loading = document.getElementById("loading");
const startButton = document.getElementById("startButton");

let gameStarted = false;

// Player
const player = {
    x: 500,
    y: 400,
    radius: 22,
    speed: 5,
    color: "#00ffff",
    angle: 0
};

// Keyboard
const keys = {};

window.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});

// Mouse
const mouse = {
    x: 0,
    y: 0
};

canvas.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Start Game
startButton.addEventListener("click", () => {

    loading.style.display = "none";

    gameStarted = true;

});

// Update
function update() {

    if(keys["w"]) player.y -= player.speed;
    if(keys["s"]) player.y += player.speed;
    if(keys["a"]) player.x -= player.speed;
    if(keys["d"]) player.x += player.speed;

    player.x = Math.max(player.radius,
        Math.min(canvas.width-player.radius,player.x));

    player.y = Math.max(player.radius,
        Math.min(canvas.height-player.radius,player.y));

    player.angle = Math.atan2(
        mouse.y-player.y,
        mouse.x-player.x
    );

}

// Draw Player
function drawPlayer(){

    ctx.save();

    ctx.translate(player.x,player.y);

    ctx.rotate(player.angle);

    // Body
    ctx.fillStyle=player.color;

    ctx.beginPath();
    ctx.arc(0,0,player.radius,0,Math.PI*2);
    ctx.fill();

    // Gun
    ctx.fillStyle="white";
    ctx.fillRect(0,-4,30,8);

    ctx.restore();

}

// Background Grid
function drawGrid(){

    ctx.strokeStyle="rgba(255,255,255,0.05)";

    ctx.lineWidth=1;

    for(let x=0;x<canvas.width;x+=50){

        ctx.beginPath();

        ctx.moveTo(x,0);

        ctx.lineTo(x,canvas.height);

        ctx.stroke();

    }

    for(let y=0;y<canvas.height;y+=50){

        ctx.beginPath();

        ctx.moveTo(0,y);

        ctx.lineTo(canvas.width,y);

        ctx.stroke();

    }

}

// Draw
function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawGrid();

    drawPlayer();

}

// Main Loop
function gameLoop(){

    if(gameStarted){

        update();

        draw();

    }

    requestAnimationFrame(gameLoop);

}

gameLoop();
