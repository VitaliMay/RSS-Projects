import { btnSave, btnContinue, btnInterfaceArr, titleH1 } from './interface.js';
import { canvasGame, CanvasGrid, squareSize } from './canvasDraw.js';
import { btnSelectArr } from './modal.js';

btnSave.addEventListener('click', saveCurrentGame);
btnContinue.addEventListener('click', continueSavedGame);

function checkLocalStorage() {
  // const savedState = localStorage.getItem(localEl);
  const savedState = localStorage.getItem('VitaliMay_gameState');
  if (!savedState) {
    btnContinue.disabled = true;
    // btn.disabled = true;
  } else {
    btnContinue.disabled = false;
    // btn.disabled = false;
  }
}
checkLocalStorage();

function saveCurrentGame() {
  const { currentGame } = canvasGame;
  currentGame.saveGameState();

  if (btnContinue.disabled) {
    btnContinue.disabled = false;
  }
}

function continueSavedGame() {
  const { currentGame } = canvasGame;

  let gameOption = [];
  const savedState = localStorage.getItem('VitaliMay_gameState');
  if (savedState) {
    const gameState = JSON.parse(savedState);
    const { gridSize, matrix, matrixName } = gameState;

    gameOption = [gridSize, squareSize.value, squareSize.gapSize, matrix];
    // console.log(gameState);

    titleH1.textContent = `Hello Nonograms ${matrixName}`;

    btnSelectArr.forEach((btn) => {
      btn.disabled = false;

      if (btn.getAttribute('data-name') === matrixName) {
        btn.disabled = true;
      }
    });
  }

  currentGame.removeCanvas();
  canvasGame.currentGame = new CanvasGrid(...gameOption);

  canvasGame.currentGame.loadGameState();

  btnInterfaceArr.forEach((btn) => {
    btn.disabled = false;
  });
}

// console.log('Локал стораге');

export { saveCurrentGame, checkLocalStorage };
