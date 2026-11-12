
const choices = {
    rock: "./assets/rock.png",
    paper: "./assets/paper.png",
    scissors: "./assets/scissor.png"
};

const playerChoice = document.querySelector(".player-choice img");

const rockButton = document.querySelector(".btn-rock");
const paperButton = document.querySelector(".btn-paper");
const scissorsButton = document.querySelector(".btn-scissors");
const resetButton = document.querySelector(".btn-reset");


const animationChoices = [
    choices.rock,
    choices.paper,
    choices.scissors
];

//    animation details
let animationIndex = 0;
let animationInterval;

function startAnimation(){
    clearInterval(animationInterval);
    animationIndex = 0;
    animationInterval = setInterval(() => {
        const Image = animationChoices[animationIndex];

        playerChoice.src = Image;
        computerChoice.src = Image;

        animationIndex++;

        if (animationIndex === animationChoices.length) {
            animationIndex = 0;
        }

    }, 200);
}

function stopAnimation(playerMove,computerMove){
    clearInterval(animationInterval);
    playerChoice.src = choices[playerMove];
    computerChoice.src = choices[computerMove];
} 
// all button event except button
// rockButton.addEventListener("click",() =>{
//     startAnimation();

//     setTimeout(()=>{
//         stopAnimation("rock");
//     },3000)
// });
// paperButton.addEventListener("click",()=>{
//     startAnimation();
//     setTimeout(()=>{
//        stopAnimation("paper");
//     },3000)
// });
// scissorsButton.addEventListener("click",()=>{
//     startAnimation();
//     setTimeout(()=>{
//         stopAnimation("scissors");
//     },3000)
// });

rockButton.addEventListener("click", ()=> playGame("rock"));
paperButton.addEventListener("click",()=>playGame("paper"));
scissorsButton.addEventListener("click",()=> playGame("scissors"));

let gameTimeout;
function playGame(playerMove){
     toggleMoveButtons(true);
     startAnimation();
    
    const computerMove =getComputerChoice();
    
    gameTimeout =  setTimeout(()=>{
        stopAnimation(playerMove,computerMove);
        const result = getWinner(playerMove,computerMove);
        updateScore(result);
        updateHistory(playerMove,computerMove,result);

        const resultMessage=document.querySelector(".result-message");
        resultMessage.textContent=
              result === "win"? "You Win!":
              result ==="loss" ?"you Lose!":"It's is a Draw!";

        resultMessage.className=`result-message ${result}`;
        toggleMoveButtons(false);             
              
    },2000);
}
// reset button event
resetButton.addEventListener("click",resetGame)

// computer animation
const computerChoice =document.querySelector(".computer-choice img");
const Com_choices = ["rock", "paper", "scissors"];

function getComputerChoice(){
    const index = Math.floor(Math.random()* Com_choices.length);
    return Com_choices[index];
}


//  winner 

function getWinner(playerMove,computerMove){
    if(playerMove == computerMove)return "draw";

    if(
        (playerMove === "rock" && computerMove === "scissors") ||
        (playerMove === "paper" && computerMove ==="rock") ||
        (playerMove ==="scissors" && computerMove === "paper")
    )return "win";

    return "loss";
}


let wins = 0;
let losses = 0;
let draws = 0;
let gameCount =0;


const winElement = document.querySelector("#wins");
const lossesElement = document.querySelector("#losses");
const drawsElement = document.querySelector("#draws");

const historyList = document.querySelector(".history-list");
const historySection = document.querySelector(".history");

function updateScore(result){
  if(result == "win")wins++;
  else if(result == "loss")losses++;
  else draws++;

  winElement.textContent = wins;
  lossesElement.textContent = losses;
  drawsElement.textContent = draws;
}

function updateHistory(playerMove,computerMove,result){
    gameCount++;

    const historyItem = document.createElement("tr");
   historyItem.innerHTML=`
        <td>${gameCount}</td>
        <td>${playerMove}</td>
        <td>${computerMove}</td>
        <td class="${result}">${result.toUpperCase()}</td>
   `
    
    historyList.prepend(historyItem);
    while(historyList.children.length> 5){
        historyList.removeChild(historyList.lastChild);
    }
    document.querySelector(".game-rules").hidden = true;
    document.querySelector(".history-content").hidden = false;
}
function resetGame(){
    console.log("Reset function called");
    clearInterval(animationInterval);
    clearTimeout(gameTimeout);
    toggleMoveButtons(false);
    wins = 0;
    losses = 0;
    draws = 0;

    gameCount = 0;

    winElement.textContent = wins;
    lossesElement.textContent = losses;
    drawsElement.textContent = draws;
    historyList.innerHTML = "";
    document.querySelector(".game-rules").hidden  = false;
    document.querySelector(".history-content").hidden = true;

    playerChoice.src = choices.rock;
    computerChoice.src=choices.rock;
    const resultMessage=document.querySelector(".result-message")
    resultMessage.textContent="Choose your move!";
    resultMessage.className="result-message";

}

function toggleMoveButtons(disabled){
    rockButton.disabled = disabled;
    paperButton.disabled = disabled;
    scissorsButton.disabled = disabled;
}