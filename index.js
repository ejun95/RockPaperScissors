let playerWins = 0;
let compWins = 0;
let playerSelection = "";
let isGameOver = false;

const buttons = document.querySelectorAll("button:not(#reset)"); // Gets all the buttons, EXCLUDING the reset button
const result = document.querySelector("#round-result");
result.setAttribute("class", "round-result");
const playerScore = document.querySelector("#player-score");
const compScore = document.querySelector("#comp-score")
const resetButton = document.getElementById("reset");

// Make Reset button invisible since its not needed until a game is won/lost
resetButton.style.visibility = "hidden";

// Adds a click event to all the buttons that calls the playRound function
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    button.disabled = false;
    playerSelection = button.innerText;
    result.innerText = playRound(playerSelection, getComputerChoice());
    playerScore.innerText = "Wins: " + playerWins;
    compScore.innerText = "Loses: " + compWins;

    // When the game is over, stop the current game and prepare for a new game
    if(checkIfGameOver()) {
      toggleButtons();
      resetButton.style.visibility = "visible";
    }
  });
});

// Resets the game score and reenable the buttons
resetButton.addEventListener("click", () => {
  playerWins = 0;
  compWins = 0;
  playerScore.innerText = "Wins: " + playerWins;
  compScore.innerText = "Loses: " + compWins;
  toggleButtons();
  resetButton.style.visibility = "hidden";
  isGameOver = false;
});

// Computer will randomly choose between RPS
function getComputerChoice() {
  const choices = ["ROCK", "PAPER", "SCISSORS"];

  return choices[Math.floor(Math.random() * 3)];
}

// Plays a round of RPS between Human and Computer
function playRound(select, computerSelection) {
  select = playerSelection.toUpperCase();
  switch(select) {
    case "ROCK":
      if(computerSelection === "ROCK") {
        return "Draw! Try again!"
        break;
      } else if(computerSelection === "PAPER") {
        compWins += 1;
        return "You Lose! Rock loses to Paper!"
        break;
      } else {
        playerWins += 1;
        return "You Win! Rock beats Scissors!"
        break;
      }
    case "PAPER":
      if(computerSelection === "ROCK") {
        playerWins += 1;
        return "You Win! Paper beats Rock!"
        break;
      } else if(computerSelection === "PAPER") {
        return "Draw! Try again!"
        break;
      } else {
        compWins += 1;
        return "You Lose! Paper loses to Scissors!"
        break;
      }
    case "SCISSORS":
      if(computerSelection === "ROCK") {
        compWins += 1;
        return "You Lose! Scissors loses to Rock!"
        break;
      } else if(computerSelection === "PAPER") {
        playerWins += 1;
        return "You Win! Scissors beats Paper!"
        break;
      } else {
        return "Draw! Try again!"
        break;
      }
    default:
      return "That is not a valid choice, Please enter Rock, Paper, or Scissors!"
      break;
  }
}

function toggleButtons() {
  buttons.forEach((button) => {
    button.disabled = !button.disabled;
  });
}

function checkIfGameOver() {
  if(playerWins == 5 || compWins == 5) {
    isGameOver = true;
    return isGameOver;
  }
}

function resetGame() {
  playerWins = 0;
  compWins = 0;
  playerScore.innerText = "Wins: " + playerWins;
  compScore.innerText = "Loses: " + compWins;
}