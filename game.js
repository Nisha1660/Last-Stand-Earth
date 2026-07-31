const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
    x: canvas.width/2,
    y: canvas.height/2,
    size: 25,
    speed: 5,
    health:100
};

const keys={};

let bullets=[];
let enemies=[];
let kills=0;

window.addEventListener("keydown",e=>keys[e.key]=true);
window.addEventListener("keyup",e=>keys[e.key]=false);

canvas.addEventListener("click",shoot);

function shoot(){

    bullets.push({
        x:player.x,
        y:player.y,
        dx:mouse.x-player.x,
        dy:mouse.y-player.y
    });

}

const mouse={
    x:0,
    y:0
};

canvas.addEventListener("mousemove",e=>{
    mouse.x=e.clientX;
    mouse.y=e.clientY;
});

function spawnEnemy(){

    let side=Math.floor(Math.random()*4);

    let x,y;

    if(side===0){
        x=0;
        y=Math.random()*canvas.height;
    }

    if(side===1){
        x=canvas.width;
        y=Math.random()*canvas.height;
    }

    if(side===2){
        x=Math.random()*canvas.width;
        y=0;
    }

    if(side===3){
        x=Math.random()*canvas.width;
        y=canvas.height;
    }

    enemies.push({
        x,
        y,
        size:20,
        speed:2
    });

}

setInterval(spawnEnemy,1000);

function update(){

    if(keys["w"]||keys["ArrowUp"]) player.y-=player.speed;
    if(keys["s"]||keys["ArrowDown"]) player.y+=player.speed;
    if(keys["a"]||keys["ArrowLeft"]) player.x-=player.speed;
    if(keys["d"]||keys["ArrowRight"]) player.x+=player.speed;

    bullets.forEach(b=>{

        let len=Math.hypot(b.dx,b.dy);

        b.x+=b.dx/len*10;
        b.y+=b.dy/len*10;

    });

    enemies.forEach(e=>{

        let dx=player.x-e.x;
        let dy=player.y-e.y;

        let len=Math.hypot(dx,dy);

        e.x+=dx/len*e.speed;
        e.y+=dy/len*e.speed;

    });

    bullets.forEach((b,bi)=>{

        enemies.forEach((e,ei)=>{

            if(Math.hypot(b.x-e.x,b.y-e.y)<20){

                bullets.splice(bi,1);
                enemies.splice(ei,1);

                kills++;

                document.getElementById("kills").textContent=kills;

            }

        });

    });

    enemies.forEach(e=>{

        if(Math.hypot(player.x-e.x,player.y-e.y)<25){

            player.health--;

            document.getElementById("health").textContent=player.health;

        }

    });

}

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="cyan";

    ctx.beginPath();
    ctx.arc(player.x,player.y,player.size,0,Math.PI*2);
    ctx.fill();

    ctx.fillStyle="yellow";

    bullets.forEach(b=>{

        ctx.beginPath();
        ctx.arc(b.x,b.y,5,0,Math.PI*2);
        ctx.fill();

    });

    ctx.fillStyle="red";

    enemies.forEach(e=>{

        ctx.beginPath();
        ctx.arc(e.x,e.y,e.size,0,Math.PI*2);
        ctx.fill();

    });

}

function gameLoop(){

    update();
    draw();

    requestAnimationFrame(gameLoop);

}

gameLoop();
