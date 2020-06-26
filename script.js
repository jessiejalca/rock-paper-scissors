const choices = Array.from(document.querySelectorAll('img.button'));
choices.forEach(choice => choice.addEventListener('click', game));

const computer = document.querySelector('#computer');

const playerScore = document.querySelector('#user-score');
const computerScore = document.querySelector('#cpu-score');

const btnRestart = document.querySelector('#restart');
btnRestart.addEventListener('click', restart);

const gameReport = document.querySelector('#game-report');
const reportTitle = document.querySelector('#report-title');
const reportScore = document.querySelector('#report-score');

let playerWins = 0;
let computerWins = 0;


// Generating computer's play
function computerPlay() {
    const randNum = Math.random();
    let computerSelection;

    // randomly selects rock, paper, or scissors
    if (randNum <= (1 / 3)) {
        computerSelection = 'rock';
    } else if (randNum <= (2 / 3)) {
        computerSelection = 'paper';
    } else {
        computerSelection = 'scissors';
    }

    // shows the computer's play
    computer.classList.add('spin');
    computer.addEventListener( 'animationend',  function() {
        computer.classList.remove('spin');    
    } );
    computer.src = `images/${computerSelection}.png`;
    
    return computerSelection;
}

// Getting the results of a single round
function playRound(playerSelection, computerSelection) {
    let roundResults;
    playerSelection = playerSelection.toLowerCase(); // makes the function case insensitive

    // generates an outcome based on the two plays
    if (
    (playerSelection == 'rock' && computerSelection == 'rock') ||
    (playerSelection == 'paper' && computerSelection == 'paper') ||
    (playerSelection == 'scissors' && computerSelection == 'scissors')
    ) {
        roundResults = "TIE";
    } else if (
    (playerSelection == 'rock' && computerSelection == 'scissors') ||
    (playerSelection == 'paper' && computerSelection == 'rock') ||
    (playerSelection == 'scissors' && computerSelection == 'paper')
    ) {
        roundResults = "WIN";
    } else if (
    (playerSelection == 'rock' && computerSelection == 'paper') ||
    (playerSelection == 'paper' && computerSelection == 'scissors') ||
    (playerSelection == 'scissors' && computerSelection == 'rock')
    ) {
        roundResults = "LOSE";
    } else {
        roundResults = "That wasn't one of the options I gave you. Try again.";
    }

    // console.log(roundResults);
    return roundResults;
}

// Playing a full match
function game(e) {
    let playerSelection;
    let computerSelection;

    let lineBreak = "\r\n";

    // gets each side's play and the results
    playerSelection = e.target.id;
    computerSelection = computerPlay();
    roundResults = playRound(playerSelection, computerSelection);

    // counts the results of each round
    if (roundResults == 'WIN') {
        playerWins++;

        computerScore.classList.remove('winning');
        playerScore.classList.add('winning');
        playerScore.classList.add('content');
        playerScore.textContent = 'You: ' + playerWins;
    } else if (roundResults == 'LOSE') {
        computerWins++;

        playerScore.classList.remove('winning');
        computerScore.classList.add('winning');
        computerScore.classList.add('content');
        computerScore.textContent = 'CPU: ' + computerWins;
    } else {
        computerScore.classList.remove('winning');
        computerScore.classList.add('tie');
        computerScore.addEventListener( 'animationend',  function() {
            computerScore.classList.remove('tie');    
        } );

        playerScore.classList.remove('winning');
        playerScore.classList.add('tie');
        playerScore.addEventListener( 'animationend',  function() {
            playerScore.classList.remove('tie');    
        } );
    }

    if (playerWins >= 5 || computerWins >= 5) endGame();
}

function endGame() {
    gameReport.classList.remove('hide');
    
    let titleText;
    let scoreText = `
        <h2>Final Score</h2>
        <div>
            <p>You: ${playerWins}</p>
            <p>CPU: ${computerWins}</p>
        </div>
        `;

    reportScore.innerHTML = scoreText;

    if (playerWins > computerWins) {
        titleText = 'YOU WIN!';
    } else {
        titleText = 'YOU LOSE!';
    }

    reportTitle.innerHTML = `
        <h1 id="report-header">${titleText}</h1>
        <a id="close" href="index.html">Close</a>
        `;

}

// Resetting the board
function restart() {
    playerWins = 0;
    computerWins = 0;

    playerScore.classList.add('content');
    playerScore.textContent = 'You: ' + playerWins;
    playerScore.classList.remove('winning');

    computerScore.classList.add('content');
    computerScore.textContent = 'CPU: ' + computerWins;
    computerScore.classList.remove('winning');

    computer.classList.add('spin');
    computer.addEventListener( 'animationend',  function() {
        computer.classList.remove('spin');    
    } );
    computer.src = `images/neutral.png`;
}