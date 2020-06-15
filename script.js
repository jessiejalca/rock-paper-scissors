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
    
    // console.log(computerSelection);
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
        roundResults = "DRAW";
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
function game() {
    let playerSelection;
    let computerSelection;
    let playerWins = 0;
    let computerWins = 0;

    let lineBreak = "\r\n";

    // repeats the process of playing the game as 2 out of 3 and giving the results for each round
    while (playerWins < 2 && computerWins < 2) {
        // gets each side's play and the results
        playerSelection = prompt("Enter 'rock', 'paper', or 'scissors'.");
        computerSelection = computerPlay();
        roundResults = playRound(playerSelection, computerSelection);

        // counts the results of each round
        if (roundResults == 'WIN') {
            playerWins++;
        } else if (roundResults == 'LOSE') {
            computerWins++;
        }

        // reports the results at the end of each round
        console.log(roundResults);
        alert(
            "Computer: " + computerSelection + lineBreak + // computer's play
            "User: " + playerSelection + lineBreak + // user's play
            roundResults); // round result
    }

    // reports a winner or loser at the end of the game
    if (playerWins > computerWins) {
        alert("Congratulations! You beat the computer, 2 out of 3!");
    } else {
        alert("Too bad. The computer beat you, 2 out of 3.");
    }
}