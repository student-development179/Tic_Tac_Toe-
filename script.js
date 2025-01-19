let Boxes=document.querySelectorAll(".Box");
let Resetbtn=document.querySelector("#button");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let Newgame=document.querySelector("#newbtn");

let TurnO=true; // Player x, Plsyer Y
const winPattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8],
];

const resetGame=()=>{
    TurnO=true;
    counter=0;
    enablebox();
    msgContainer.classList.add("hide");    
}

let counter=0; //keep tracking number of moves
Boxes.forEach(Box => {
    Box.addEventListener("click",()=>{
        console.log("box was clicked");
        
        if (TurnO) { //player O
            Box.innerText="O";
            Box.style.color="yellow"
            TurnO=false;
        }
        else{ //Player X
            Box.innerText="X";
            Box.style.color="red"

            TurnO=true;
        }
        Box.disabled=true;
        counter++;
        checkWinner();
        checkDraw();
    });
    
});
const checkDraw = () => {
    if (counter === 9) { // All boxes are filled
        // No winner yet, so it's a draw
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
        disableBoxes(); // Disable all boxes
    }
};    

const disableBoxes=()=>{
    for (let box of Boxes) {
        box.disabled=true;
    }
}
const enablebox=()=>{
    for (let box of Boxes) {
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner=(winner)=>{

    msg.innerText=(`Congratulation,winner is ${winner}`);
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const checkWinner=()=>{
    for (let pattern of winPattern) {

        let pos1val=Boxes[pattern[0]].innerText;
        let pos2val=Boxes[pattern[1]].innerText;
        let pos3val=Boxes[pattern[2]].innerText;
        
        if (pos1val!=""&&pos2val!=""&&pos3val!="") {
            if (pos1val===pos2val&&pos2val===pos3val) {
                console.log("winner",pos1val);
                
                showWinner(pos1val);
            }
            
        }
    }
};


Newgame.addEventListener("click",resetGame);
Resetbtn.addEventListener("click",resetGame);

