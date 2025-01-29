import { getRandomInteger } from './elementUtils.js';

import { data } from './data.js';
import { canvasGame, CanvasGrid } from './canvasDraw.js';
// import { canvasGame } from './gameLogic.js';

const body = document.querySelector('body');
const modalContainer = document.querySelector('.modal-container');
const canvasContainer = document.querySelector('.canvas-container');

const btnContainer = document.querySelector('.btn-container');

/********************************************************** */

function getRandomMatrixOption(squareSize = 30) {
  const keysArr = Object.keys(data);
  const randomIndex = getRandomInteger(0, keysArr.length - 1);
  const matrixName = keysArr[randomIndex];
  const gridSize = data[matrixName].gridSize;
  const matrix = data[matrixName].matrix;
  return [gridSize, squareSize, 1, matrix];
}

/********************************************************* */
btnContainer.addEventListener('click', test);

// const checkKat = 'kat';
// const gridSize = 15;
// const squareSize = 30;
// const checkKat = 'dogLarge';
// // const checkKat = 'cup';
// const checkMatrix = 'matrix';
// const testKat = [gridSize, squareSize, 1, data[checkKat][checkMatrix]];
// const testKat = [10, 40, 2, data[checkKat][checkMatrix]];
// const testKat = [10, 40, 2, data.kat.matrix];

function test(event) {
  const { currentGame } = canvasGame;

  const { target } = event;
  const button = target.closest('.button');

  if (button) {
    if (button.classList.contains('button_reset')) {
      currentGame.resetGame();
    }
    if (button.classList.contains('button_random')) {
      currentGame.removeCanvas();
      canvasGame.currentGame = new CanvasGrid(...getRandomMatrixOption());
    }
    if (button.classList.contains('button-solution')) {
      currentGame.showSolution();
    }
  }

  // currentGame.resetGame();

  // canvasGame.resetGame();

  // currentGame.removeCanvas();
  // canvasGame.currentGame = new CanvasGrid(...testKat);

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
  const btnClose = target.closest('.button_close');
  if (target === this || btnCross || btnClose) {
    // Клик произошел именно на родительском элементе или крестике
    this.classList.remove('modal-container--active');
    body.classList.remove('lock');
  }
});

export { modalContainer, body, initModal, canvasContainer };
