const board=document.getElementById("board");
const rollBtn=document.getElementById("roll");
const dice=document.getElementById("dice");
const status=document.getElementById("status");
const mode=document.getElementById("mode");

let players=[
    {
        name:"Player 1",
        position:0,
        color:"red"
    },
    {
        name:"Player 2",
        position:0,
        color:"blue"
    }
];

let turn=0;
let gameOver=false;


// Snakes and ladders

const snakes={

97:78,
95:75,
88:48,
62:19,
56:36,
49:11,
47:26,
16:6

};


const ladders={

2:23,
7:29,
18:37,
21:42,
28:84,
51:67,
71:91,
80:99

};


// Create board

for(let r=9;r>=0;r--){

let nums=[];

for(let c=0;c<10;c++){

nums.push(r*10+c+1);

}

if((9-r)%2==1)
nums.reverse();


nums.forEach(num=>{

let cell=document.createElement("div");

cell.className="cell "+(num%2==0?"even":"odd");

cell.id="cell"+num;

cell.innerHTML=num;

board.appendChild(cell);

});

}


// Move player graphics

function drawPlayers(){

document.querySelectorAll(".player1,.player2")
.forEach(e=>e.remove());


players.forEach((p,index)=>{

if(p.position>0){

let cell=document.getElementById(
"cell"+p.position
);


let token=document.createElement("div");

token.className=index===0?
"player1":"player2";


cell.appendChild(token);

}

});

}


// Roll dice

rollBtn.onclick=function(){

if(gameOver) return;


if(turn===1 && mode.value==="ai"){

aiMove();

return;

}


playTurn();

};



function playTurn(){

let roll=Math.floor(Math.random()*6)+1;


dice.innerHTML=getDice(roll);


movePlayer(
players[turn],
roll
);


if(gameOver)return;


turn=turn===0?1:0;


updateStatus();


if(turn===1 && mode.value==="ai"){

setTimeout(aiMove,800);

}

}



function aiMove(){

let roll=Math.floor(Math.random()*6)+1;


dice.innerHTML=getDice(roll);


movePlayer(players[1],roll);


turn=0;

updateStatus();

}




function movePlayer(player,steps){

let newPos=player.position+steps;


if(newPos>100)
return;


player.position=newPos;



// Ladder

if(ladders[player.position]){

player.position=ladders[player.position];

}


// Snake

if(snakes[player.position]){

player.position=snakes[player.position];

}


drawPlayers();



if(player.position===100){

status.innerHTML=
"🏆 "+player.name+" Wins!";


gameOver=true;

return;

}

}




function updateStatus(){

status.innerHTML=
players[turn].name+" Turn";

}




function getDice(num){

const faces=[
"",
"⚀",
"⚁",
"⚂",
"⚃",
"⚄",
"⚅"
];

return faces[num];

}



drawPlayers();
