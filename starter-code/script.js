'use strict'
const choiceButtons = document.querySelectorAll('.btn-box');
const home = document.getElementById('home');
const board = document.getElementById('board');

let player1 = 'x';

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

const startGame = (mode) => {
  home.style.display = "none";
  board.style.display = "flex";
}