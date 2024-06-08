let boxes= document.querySelectorAll('.box');
let resetBtn= document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-btn');
let msgContainer= document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let choices= document.querySelector('.select')
let choiceX= document.querySelector('#choiceX');
let choiceO= document.querySelector('#choiceO');
let choiceBtns=document.querySelector('.choices');
let count=0;

//let turn = //playerX, playerO
let turnO;
console.log(choices);

choiceO.addEventListener('click', ()=>{
    turnO=true;    
    choiceBtns.style.display='none'
})
choiceX.addEventListener('click', ()=>{
    turnO=false;    
    choiceBtns.style.display='none'
})

//2D array
const winPattern =[
    //all horizontal, vertical and diagonal elements
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

boxes.forEach((box)=>{
    box.addEventListener('click', ()=>{
        choiceBtns.style.display='none'
        if(turnO){ // playerO turn
            box.innerText ="O"
            turnO= false
            box.style.color="#ff6978"
        } else{ //playerX turn
            box.innerText ="X"
            turnO = true
            box.style.color="black"            
        }
        box.disabled = true //so that we can't change value of box after clicking it once
        count++;
        let isWinner = checkWinner();
        if(count===9 && !isWinner){
            gameDraw();
        }
    })
})

const gameDraw=()=>{
    msg.innerText='Game was a draw';
    msgContainer.classList.remove('hide');
    disableBox();
}
const checkWinner= ()=>{
    for(let pattern of winPattern){ //gives array
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]);
        // console.log(
        //     boxes[pattern[0]].innerText, //position 1 
        //     boxes[pattern[1]].innerText, //position 2 
        //     boxes[pattern[2]].innerText  //position 3
        // );   

            let pos1Val= boxes[pattern[0]].innerText;
            let pos2Val= boxes[pattern[1]].innerText;
            let pos3Val= boxes[pattern[2]].innerText;

            let winner;
            
                if(pos1Val && pos2Val && pos3Val){
                    if(pos1Val==pos2Val && pos2Val==pos3Val){
                        console.log('winner',pos1Val);
                        winner= pos1Val;
                        showWinner(winner);
                    }
                }
            
    }
    
}

const showWinner =(winner) =>{
    msg.innerText =`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disableBox();

}

const disableBox =()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBox=()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
       
    }
}
const resetGame = ()=>{
    turnO = true;
    count =0;
    enableBox();
    msgContainer.classList.add('hide');
    choiceBtns.style.display ='block';

}

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);