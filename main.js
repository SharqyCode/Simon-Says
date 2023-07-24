const startBtn = document.querySelector(".start");
startBtn.textContent = "Start";

const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");
const blue = document.querySelector(".blue");

const colors = document.querySelector(".colors");

const scoreBoard = document.querySelector(".score");

const message = document.querySelector(".message");

const roundMeter = document.querySelector(".roundMeter");

let round; // round number - increases when player wins, determines the difficulty
let score; // Player score - increases when chosen colors match round preset colors - starts as zero each game
let clicks; // the number of clicks allowed for the user each round - same as sequence length
let sequence = []; // Current pattern of preset colors
let gameOn = false; // Indicates whether game has started

function startGame() {
  gameOn = true;
  sequence = [];
  score = 0;
  round = 1;
  roundMeter.textContent = `Round: ${round}`;
  message.textContent = "";

  startBtn.textContent = "Start";

  prepareSequence();
}

function prepareSequence() {
  for (let i = 0; i < round * 2; i++) {
    let randColorId = Math.floor(Math.random() * 4);
    sequence.push(randColorId);
  }
  clicks = sequence.length;
  showSequence();
}

function showSequence() {
  let i = 0;
  let flashSequence = setInterval(() => {
    flashColor(sequence[i]);
    i++;
    if (i >= sequence.length) {
      clearInterval(flashSequence);
    }
  }, 1000);
}

function flashColor(colorID) {
  let currentColor = document.getElementById(colorID);
  const originalColor = currentColor.style.backgroundColor;
  switch (colorID) {
    case 0:
      currentColor.style.backgroundColor = "#FF6454";
      currentColor.style.boxShadow = "0px 0px 5px 4px white";
      break;
    case 1:
      currentColor.style.backgroundColor = "#61FF61";
      currentColor.style.boxShadow = "0px 0px 5px 4px white";
      break;
    case 2:
      currentColor.style.backgroundColor = "#FFD754";
      currentColor.style.boxShadow = "0px 0px 5px 4px white";
      break;
    case 3:
      currentColor.style.backgroundColor = "##54B5FF";
      currentColor.style.boxShadow = "0px 0px 5px 4px white";
      break;
  }

  setTimeout(() => {
    currentColor.style.backgroundColor = originalColor;
    currentColor.style.boxShadow = "none";
  }, 500);
}

function handleColorClick(e) {
  if (gameOn == true) {
    flashColor(e.target.id);
    if (e.target.id == sequence[0]) {
      sequence.shift();
    }
    clicks--;

    if (clicks == 0) {
      if (sequence.length == 0) {
        message.textContent = "Congrats! You win this round!";
        setTimeout(() => {
          message.textContent = "";
          message.style.color = "white";
          nextRound();
        }, 3000);
      } else {
        endGame();
      }
    }
  }
}

function nextRound() {
  round++;
  score++;
  scoreBoard.textContent = score;
  roundMeter.textContent = `Round: ${round}`;
  sequence = [];
  prepareSequence();
}

function endGame() {
  round = 0;
  score = 0;
  scoreBoard.textContent = score;
  sequence = [];
  gameOn = false;
  message.textContent = "Better Luck Next Time...Retry?";
  message.style.color = "red";
  startBtn.textContent = "Retry";
}

startBtn.addEventListener("click", startGame);

red.addEventListener("click", handleColorClick);
green.addEventListener("click", handleColorClick);
yellow.addEventListener("click", handleColorClick);
blue.addEventListener("click", handleColorClick);
