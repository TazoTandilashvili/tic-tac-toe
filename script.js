'use strict'
const choiceButtons = document.querySelectorAll('.btn-box');
const playButtons = document.querySelectorAll('.play-btn');
const home = document.getElementById('home');
const board = document.getElementById('board');
const roundStat = document.getElementById('round-stat');

const xScoreText = document.getElementById('x-score-text');
const oScoreText = document.getElementById('o-score-text');
const xScoreElement = document.getElementById('x-score');
const oScoreElement = document.getElementById('o-score');
const tieScoreElement = document.getElementById('tie-score');

const turnIndicator = document.querySelector('.turn-icon');
const restartGameButton = document.querySelector('.restart');


const winnerSide = document.querySelector('.title-winner');
const winnerIcon = document.querySelector('.winner-icon');
const winnerColor = document.querySelector('.winner-color');

let newGameCheck = true;
let player1 = 'x';
let mode = 'cpu';
let turn = 'x';
let freeButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let xArray = [];
let oArray = [];
let winnerCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let xScore = 0;
let oScore = 0;
let tieScore = 0;


// check the winner
function checkWinner(array) {
  for (let i = 0; i < winnerCombinations.length; i++) {
    let combination = winnerCombinations[i];
    let matchingCount = 0;
    for (let j = 0; j < combination.length; j++) {
      if (array.includes(combination[j])) {
        matchingCount++;
      }
    }
    if (matchingCount === 3) {
      return true; // Found a winning combination
    }
  }
  return false; // No winning combination found
}
const activateChoice = (icon) => {
  if (icon === 'x') {
    choiceButtons[0].classList.add('active');
    choiceButtons[1].classList.remove('active');
    player1 = 'x';
  } else {
    choiceButtons[0].classList.remove('active');
    choiceButtons[1].classList.add('active');
    player1 = 'o';
  }
}
function cpuMove() {
  if (freeButtons.length === 0) {
    return; // No free buttons left
  }
  // Choose a random index from the freeButtons array
  const randomIndex = Math.floor(Math.random() * freeButtons.length);
  const selectedButtonIndex = freeButtons[randomIndex];
  freeButtons.splice(randomIndex, 1);

  const icon = document.createElement('img');

  if (mode === 'cpu' && player1 !== 'x') {
    icon.src = "./assets/icon-x.svg";
    playButtons[selectedButtonIndex].appendChild(icon);
    turn = 'o';
    turnIndicator.src = './assets/icon-o-gray.svg';
    playButtons[selectedButtonIndex].onclick = 'null';
    xArray.push(selectedButtonIndex);
    console.log('arvici dzmoa')

  } else if (mode === 'cpu' && player1 === 'x') {
    icon.src = "./assets/icon-o.svg";
    playButtons[selectedButtonIndex].appendChild(icon);
    turn = 'x';
    turnIndicator.src = './assets/icon-x-gray.svg';
    playButtons[selectedButtonIndex].onclick = 'null';
    oArray.push(selectedButtonIndex);


  }

  if (checkWinner(player1 === 'x' ? oArray : xArray)) {
    roundStatFunction(); // Update round status after CPU's move
  }

}


const createClickedFunction = () => {
  for (let index = 0; index < playButtons.length; index++) {
    playButtons[index].onclick = (event) => {
      const spliceIndex = freeButtons.indexOf(index);
      freeButtons.splice(spliceIndex, 1);
      const icon = document.createElement('img');
      if (turn === 'x') {
        if (mode === 'cpu' && turn === 'x') {
          icon.src = "./assets/icon-x.svg";
          event.target.append(icon)
          xArray.push(index);
          turn = 'o';
          turnIndicator.src = './assets/icon-o-gray.svg';
          event.target.onclick = null; // Disable click after player's move
          if (freeButtons.length > 0) {
            setTimeout(() => { // Delay CPU move for better UX
              cpuMove();
            }, 500);
          }

        } else if (mode === 'player' && turn === 'x') {
          icon.src = "./assets/icon-x.svg";
          event.target.append(icon)
          xArray.push(index);
          turn = 'o';
          event.target.onclick = null;
        }
      } else {
        if (mode === 'cpu' && turn === 'o') {
          icon.src = "./assets/icon-o.svg";
          event.target.append(icon)
          oArray.push(index);
          turn = 'o';
          turnIndicator.src = './assets/icon-o-gray.svg';
          event.target.onclick = null; // Disable click after player's move
          setTimeout(() => { // Delay CPU move for better UX
            cpuMove();
          }, 500);
        } else if (mode === 'player' && turn === 'o') {
          icon.src = "./assets/icon-o.svg";
          event.target.append(icon)
          oArray.push(index);
          turn = 'x';
          event.target.onclick = null;
        }
      }
      event.target.onclick = null; // Disable click after player's move
      roundStatFunction();
    }
  }
}




const roundStatFunction = () => {
  if (checkWinner(xArray)) {
    xScore++;
    xScoreElement.textContent = xScore.toString();
    disableAllButtons();
    roundStat.style.display = 'block';
    winnerIcon.style.display = 'block';
    winnerIcon.src = "./assets/icon-x.svg";
    winnerColor.style.color = "#31c3bd";
    winnerColor.textContent = 'TAKES THE ROUND';
    if (mode === 'cpu' && player1 === 'x') {
      winnerSide.textContent = 'you won';
    } else if (mode === 'cpu' && player1 !== 'x') {
      winnerSide.textContent = 'OH NO, YOU LOST…';
    } else if (mode === 'player' && player1 === 'x') {
      winnerSide.textContent = 'PLAYER 1 WINS!!'
    }

  } else if (checkWinner(oArray)) {
    oScore++;
    oScoreElement.textContent = oScore.toString();
    disableAllButtons();
    roundStat.style.display = 'block';
    winnerIcon.style.display = 'block';
    winnerIcon.src = "./assets/icon-o.svg";
    winnerColor.style.color = "#f2b137"
    winnerColor.textContent = 'TAKES THE ROUND';
    if (mode === 'cpu' && player1 === 'x') {

      winnerSide.textContent = 'OH NO, YOU LOST…'
    } else if (mode === 'cpu' && player1 !== 'x') {
      winnerSide.textContent = 'you won';
    } else if (mode === 'player' && player1 === 'x') {
      winnerSide.textContent = 'PLAYER 2 WINS!!'
    } else if (mode === 'player' && player1 !== 'x') {
      winnerSide.textContent = 'PLAYER 1 WINS!!'
    }

  } else if (freeButtons.length === 0) {
    tieScore++;
    tieScoreElement.textContent = tieScore.toString()
    roundStat.style.display = 'block';
    winnerIcon.style.display = 'none';
    tie.style.color = '#a8bfc9';
    winnerSide.textContent = '';
    winnerColor.textContent = 'ROUND TIED';

    disableAllButtons()
  }
}
const roundEndFnc = (endParam) => {
  if (endParam === "quit") {
    board.style.display = "none";
    roundStat.style.display = "none";
    home.style.display = "flex";
    restartGame();
  } else {
    roundStat.style.display = "none";
    freeButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    xArray = [];
    oArray = [];
    turn = 'x';
    turnIndicator.src = "./assets/icon-x-gray.svg";
    playButtons.forEach(playButton => {
      while (playButton.firstChild) {
        playButton.removeChild(playButton.firstChild);
      }
    });
    createClickedFunction();
  }
  if (player1 !== 'x') {
    cpuMove();
  }
}
const startGame = (modeParam) => {
  home.style.display = "none";
  board.style.display = "flex";
  restartGame();
  createClickedFunction();
  if (modeParam === "cpu") {
    mode = 'cpu';
    // newGameCheck = false;
    if (player1 === 'x') {
      xScoreText.textContent = "X (you)";
      oScoreText.textContent = "o (cpu)";
    } else {
      xScoreText.textContent = "x (cpu)";
      oScoreText.textContent = "o (you)";
    }
  } else {
    mode = 'player';
    if (player1 === 'x') {
      xScoreText.textContent = "X (p1)";
      oScoreText.textContent = "o (p2)";

    } else {
      xScoreText.textContent = "X (p2)";
      oScoreText.textContent = "o (p1)";
      // pop up 
      winnerSide.textContent = 'PLAYER 2 WINS!'
    }
  }
}
const restartGame = () => {
  freeButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  xArray = [];
  oArray = [];
  turn = 'x';
  turnIndicator.src = "./assets/icon-x-gray.svg";
  playButtons.forEach(playButton => {
    while (playButton.firstChild) {
      playButton.removeChild(playButton.firstChild);
    }
  });
  oScore = 0;
  xScore = 0;
  tieScore = 0;
  oScoreElement.textContent = '0';
  xScoreElement.textContent = '0';
  tieScoreElement.textContent = '0';
  createClickedFunction();
  if (player1 !== 'x') {
    cpuMove();
  }
}


restartGameButton.addEventListener('click', restartGame);

function disableAllButtons() {
  for (let i = 0; i < playButtons.length; i++) {
    playButtons[i].onclick = null;
  }
}
