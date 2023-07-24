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
let clickable = false; // Indicates whether game has started
let colorChanging = false; // Indicates whether the "glow" animation is playing

function startGame() {
  sequence = [];
  score = 0;
  round = 1;
  roundMeter.textContent = `Round: ${round}`;
  message.textContent = "";

  startBtn.style.visibility = "hidden";

  prepareSequence();
}

function prepareSequence() {
  clickable = false;
  for (let i = 0; i < round * 2; i++) {
    let randColorId = Math.floor(Math.random() * 4);
    sequence.push(randColorId);
  }
  clicks = sequence.length;
  showSequence();
}

let isplaying = false;
function showSequence() {
  let i = 0;
  let flashSequence = setInterval(() => {
    flashColor(sequence[i]);
    i++;
    if (i >= sequence.length) {
      clearInterval(flashSequence);
    }
  }, 1000);

  setTimeout(() => {
    message.textContent = "Go!";
  }, 1500 * round * 2);
}

function flashColor(colorID) {
  let currentColor = document.getElementById(colorID);
  const originalColor = currentColor.style.backgroundColor;
  switch (colorID) {
    case 0:
      currentColor.style.backgroundColor = "#FF6454";
      currentColor.style.boxShadow =
        "0px 0px 5px 5px #fff, 0px 0px 20px 7px #FF6454";
      break;
    case 1:
      currentColor.style.backgroundColor = "#61FF61";
      currentColor.style.boxShadow =
        "0px 0px 5px 5px #fff, 0px 0px 20px 7px #61FF61";
      break;
    case 2:
      currentColor.style.backgroundColor = "#FFD754";
      currentColor.style.boxShadow =
        "0px 0px 5px 5px #fff, 0px 0px 20px 7px #FFD754";
      break;
    case 3:
      currentColor.style.backgroundColor = "##54B5FF";
      currentColor.style.boxShadow =
        "0px 0px 5px 5px #fff, 0px 0px 20px 7px #54B5FF";
      break;
  }

  setTimeout(() => {
    currentColor.style.backgroundColor = originalColor;
    currentColor.style.boxShadow = "none";
  }, 500);
}

function handleColorClick(e) {
  console.log(e.target.id);
  flashColor(+e.target.id);
  if (e.target.id == sequence[0]) {
    sequence.shift();
  }
  clicks--;

  if (clicks == 0) {
    clickable = false;
    if (sequence.length == 0) {
      setTimeout(() => {
        message.textContent = "Next Round!";
        setTimeout(() => {
          nextRound();
        }, 3000);
      }, 300);
    } else {
      endGame();
    }
  }
}

function nextRound() {
  message.textContent = "";
  message.style.color = "white";
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
  message.textContent = "Better Luck Next Time...Retry?";
  message.style.color = "red";
  startBtn.style.visibility = "visible";
  startBtn.textContent = "Retry";
}

startBtn.addEventListener("click", startGame);

red.addEventListener("click", handleColorClick);
green.addEventListener("click", handleColorClick);
yellow.addEventListener("click", handleColorClick);
blue.addEventListener("click", handleColorClick);
