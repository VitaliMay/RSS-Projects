// import {
//   createEl,
//   createSvgEl,
//   removeAllChild,
//   toUpperFirstLetter,
// } from './elementUtils.js';

import { data } from './data.js';
import { canvasGame, CanvasGrid } from './canvasDraw.js';
// import { canvasGame } from './gameLogic.js';

const body = document.querySelector('body');
const modalContainer = document.querySelector('.modal-container');

const testH1 = document.querySelector('.test-h1');

// const modal = document.querySelector('.modal');

/********************************************************* */
testH1.addEventListener('click', test);

// const checkKat = 'kat';
const checkKat = 'cup';
const checkMatrix = 'matrix';
const testKat = [10, 40, 2, data[checkKat][checkMatrix]];
// const testKat = [10, 40, 2, data.kat.matrix];
function test() {
  const { currentGame } = canvasGame;
  // currentGame.resetGame();

  // canvasGame.resetGame();

  currentGame.removeCanvas();

  canvasGame.currentGame = new CanvasGrid(...testKat);
  // canvasGame.currentGame = new CanvasGrid(10, 40, 2, data.kat.matrix);
}
/**************************************************** */
/**************************************************** */

/**************************************************** */

function initModal() {
  // const { target } = event;

  modalContainer.classList.add('modal-container--active');
  body.classList.add('lock');
}

// Закрываю модалку
modalContainer.addEventListener('click', function (event) {
  const { target } = event;
  const btnCross = target.closest('.button-cross');
  const btnClose = target.closest('.button-close');
  if (target === this || btnCross || btnClose) {
    // Клик произошел именно на родительском элементе или крестике
    this.classList.remove('modal-container--active');
    body.classList.remove('lock');
  }
});

export { modalContainer, body, initModal };
