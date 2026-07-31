let coins = 0;
let xp = 0;
let level = 1;

const healthPacks = [];const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const healthText = document.getElementById("health");
const killsText = document.getElementById("kills");

const player={
    x:canvas.width/2,
    y:canvas.height/2,
    r:22,
    speed:5,
    health:100,
    angle:0
};

const keys={};
const bullets=[];
const enemies=[];
const particles=[];

let kills=0;
let lastShot=0;
let lastDamage=0;

const mouse={x:0,y:0};

window.addEventListener("keydown",e=>keys[e.key.toLowerCase()]=true);
window.addEventListener("keyup",e=>keys[e.key.toLowerCase()]=false);

canvas.addEventListener("mousemove",e=>{
    mouse.x=e.clientX;
    mouse.y=e.clientY;
});

canvas.addEventListener("click",shoot);

function shoot(){

    if(Date.now()-lastShot<180) return;

    lastShot=Date.now();

    const angle=Math.atan2(mouse.y-player.y,mouse.x-player.x);

    bullets.push({
        x:player.x,
        y:player.y,
        dx:Math.cos(angle),
        dy:Math.sin(angle),
        speed:12
    });

}

function spawnEnemy(){

    let side=Math.floor(Math.random()*4);

    let x,y;

    if(side===0){x=0;y=Math.random()*canvas.height;}
    if(side===1){x=canvas.width;y=Math.random()*canvas.height;}
    if(side===2){x=Math.random()*canvas.width;y=0;}
    if(side===3){x=Math.random()*canvas.width;y=canvas.height;}

    enemies.push({
        x,
        y,
        r:20,
        speed:1.7+Math.random()*1.2
    });

}

setInterval(spawnEnemy,900);

function explosion(x,y){

    for(let i=0;i<20;i++){

        particles.push({
            x,
            y,
            dx:(Math.random()-0.5)*8,
            dy:(Math.random()-0.5)*8,
            life:30
        });

    }

}

function update(){

    if(keys["w"]) player.y-=player.speed;
    if(keys["s"]) player.y+=player.speed;
    if(keys["a"]) player.x-=player.speed;
    if(keys["d"]) player.x+=player.speed;

    player.angle=Math.atan2(mouse.y-player.y,mouse.x-player.x);

    bullets.forEach((b,bi)=>{

        b.x+=b.dx*b.speed;
        b.y+=b.dy*b.speed;

        if(
            b.x<0||b.x>canvas.width||
            b.y<0||b.y>canvas.height
        ){
            bullets.splice(bi,1);
        }

    });

    enemies.forEach((e,ei)=>{

        const ang=Math.atan2(player.y-e.y,player.x-e.x);

        e.x+=Math.cos(ang)*e.speed;
        e.y+=Math.sin(ang)*e.speed;

        if(Math.hypot(player.x-e.x,player.y-e.y)<35){

            if(Date.now()-lastDamage>300){

                lastDamage=Date.now();

                player.health--;

                healthText.textContent=player.health;

            }

        }

        bullets.forEach((b,bi)=>{

            if(Math.hypot(b.x-e.x,b.y-e.y)<22){

                explosion(e.x,e.y);

                bullets.splice(bi,1);
                enemies.splice(ei,1);

                kills++;

                killsText.textContent=kills;

            }

        });

    });

    particles.forEach((p,pi)=>{

        p.x+=p.dx;
        p.y+=p.dy;
        p.life--;

        if(p.life<=0)
            particles.splice(pi,1);

    });

}

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // player

    ctx.save();

    ctx.translate(player.x,player.y);
    ctx.rotate(player.angle);

    ctx.fillStyle="cyan";

    ctx.beginPath();
    ctx.arc(0,0,player.r,0,Math.PI*2);
    ctx.fill();

    ctx.fillStyle="white";
    ctx.fillRect(0,-4,30,8);

    ctx.restore();

    // bullets

    ctx.fillStyle="yellow";

    bullets.forEach(b=>{

        ctx.beginPath();
        ctx.arc(b.x,b.y,5,0,Math.PI*2);
        ctx.fill();

    });

    // enemies

    ctx.fillStyle="red";

    enemies.forEach(e=>{

        ctx.beginPath();
        ctx.arc(e.x,e.y,e.r,0,Math.PI*2);
        ctx.fill();

    });

    // particles

    ctx.fillStyle="orange";

    particles.forEach(p=>{

        ctx.fillRect(p.x,p.y,4,4);

    });

    // health bar

    ctx.fillStyle="red";
    ctx.fillRect(20,20,200,20);

    ctx.fillStyle="lime";
    ctx.fillRect(20,20,player.health*2,20);

    if(player.health<=0){

        ctx.fillStyle="white";
        ctx.font="70px Arial";
        ctx.fillText("GAME OVER",canvas.width/2-180,canvas.height/2);

    }

}

function loop(){

    if(player.health>0){

        update();

    }

    draw();

    requestAnimationFrame(loop);

}

loop();const mouse={
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
