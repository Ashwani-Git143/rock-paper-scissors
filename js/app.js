
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

        playerChoice.src = animationChoices[animationIndex];

        animationIndex++;

        if (animationIndex === animationChoices.length) {
            animationIndex = 0;
        }

    }, 1000);
}

function stopAnimation(playerMove){
    clearInterval(animationInterval);
    playerChoice.src = choices[playerMove];
} 
// all button event except button
rockButton.addEventListener("click",() =>{
    startAnimation();

    setTimeout(()=>{
        stopAnimation("rock");
    },3000)
});
paperButton.addEventListener("click",()=>{
    startAnimation();
    setTimeout(()=>{
       stopAnimation("paper");
    },3000)
});
scissorsButton.addEventListener("click",()=>{
    startAnimation();
    setTimeout(()=>{
        stopAnimation("scissors");
    },3000)
});
// reset button event
resetButton.addEventListener("click",()=>{
    clearInterval(animationInterval);
})