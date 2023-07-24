const startBtn = document.querySelector(".start");

const redSec = document.querySelector(".red");
const greenSec = document.querySelector(".green");
const yellow = document.querySelector(".yellow");
const blueSec = document.querySelector(".blue");

const colors = document.querySelector(".colors");

const scoreBoard = document.querySelector(".score");

let round; // round number - increases when player wins, determines the difficulty
let score; // Player score - increases when chosen colors match round preset colors - starts as zero each game
let numOfLights; // Times a color lights up - increases with each round
let sequence = []; // Current pattern of preset colors

// let randomNum = Math.floor(Math.random() * 4); // generate random number from 0 to 3 to choose nex color to light up
function startGame() {
  sequence = [];
  score = 0;
  round = 1;

  prepareSequence();
}

function prepareSequence() {
  for (let i = 0; i < round * 2; i++) {
    let randColorId = Math.floor(Math.random() * 4);
    sequence.push(randColorId);
  }
  console.log(sequence.length);
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
  currentColor.style.backgroundColor = "#fff";
  setTimeout(() => {
    currentColor.style.backgroundColor = originalColor;
  }, 500);
}

startBtn.addEventListener("click", startGame);
