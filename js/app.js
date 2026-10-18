
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
scissorsButton.addEventListener("click",()=> playGame("scissor"));
function playGame(playerMove){
    startAnimation();

    const computerMove =getComputerChoice();
    setTimeout(()=>{
        stopAnimation(playerMove,computerMove);
    },2000);
}
// reset button event
resetButton.addEventListener("click",()=>{
    clearInterval(animationInterval);
})


// computer animation
const computerChoice =document.querySelector(".computer-choice img");
const Com_choices = ["rock", "paper", "scissors"];

function getComputerChoice(){
    const index = Math.floor(Math.random()* Com_choices.length);
    return Com_choices[index];
}