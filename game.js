const board = document.getElementById("board");
const rollBtn = document.getElementById("roll");
const dice = document.getElementById("dice");
const status = document.getElementById("status");
const mode = document.getElementById("mode");
const restart = document.getElementById("restart");


// Players

let players = [

{
name:"Player 1",
position:0
},

{
name:"Player 2",
position:0
}

];


let turn = 0;
let gameOver = false;



// Snakes

const snakes = {

99:54,
95:72,
89:64,
76:45,
66:34,
48:26,
39:3,
25:5

};


// Ladders

const ladders = {

2:23,
8:30,
21:42,
28:56,
36:57,
51:67,
70:92,
80:99

};



// Create Board

for(let r=9;r>=0;r--){

let row=[];


for(let c=0;c<10;c++){

row.push(r*10+c+1);

}


if((9-r)%2===1){

row.reverse();

}



row.forEach(num=>{


let cell=document.createElement("div");


cell.className="cell "+(num%2===0?"even":"odd");


cell.id="cell"+num;


cell.innerHTML=num;


board.appendChild(cell);


});


}



// Add snake and ladder symbols

Object.keys(snakes).forEach(pos=>{


let cell=document.getElementById("cell"+pos);


if(cell){

cell.innerHTML+=" 🐍";

}

});



Object.keys(ladders).forEach(pos=>{


let cell=document.getElementById("cell"+pos);


if(cell){

cell.innerHTML+=" 🪜";

}

});




// Draw Players

function drawPlayers(){


document.querySelectorAll(".player1,.player2")
.forEach(e=>e.remove());



players.forEach((player,index)=>{


if(player.position>0){


let cell=document.getElementById(
"cell"+player.position
);


let token=document.createElement("div");


token.className=index===0?
"player1":"player2";


cell.appendChild(token);


}


});


}




// Dice faces

function getDice(num){


let faces=[

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



// Roll button

rollBtn.onclick=function(){


if(gameOver)
return;



if(turn===1 && mode.value==="ai"){


aiTurn();


}

else{


playerTurn();


}


};





function playerTurn(){


let roll=
Math.floor(Math.random()*6)+1;



animateDice();


dice.innerHTML=getDice(roll);



movePlayer(
players[turn],
roll
);



if(gameOver)
return;



turn =
turn===0 ? 1 : 0;



updateStatus();




if(turn===1 && mode.value==="ai"){


setTimeout(aiTurn,1000);


}



}




// AI

function aiTurn(){


let roll=
Math.floor(Math.random()*6)+1;



animateDice();


dice.innerHTML=getDice(roll);



movePlayer(
players[1],
roll
);



if(gameOver)
return;



turn=0;


updateStatus();


}





// Move Player

function movePlayer(player,steps){


let newPosition =
player.position + steps;



if(newPosition>100)
return;



player.position=newPosition;




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




// Status

function updateStatus(){


status.innerHTML=
players[turn].name+" Turn";


}




// Dice animation

function animateDice(){


dice.classList.add("rollAnimation");


setTimeout(()=>{


dice.classList.remove("rollAnimation");


},300);


}





// Restart

restart.onclick=function(){


players[0].position=0;


players[1].position=0;


turn=0;


gameOver=false;


dice.innerHTML="🎲";


status.innerHTML="Player 1 Turn";


drawPlayers();


};





drawPlayers();
