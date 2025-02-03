import { btnSave, btnContinue, btnInterfaceArr, titleH1 } from './interface.js';
import { canvasGame, CanvasGrid, squareSize } from './canvasDraw.js';

btnSave.addEventListener('click', saveCurrentGame);
btnContinue.addEventListener('click', continueSavedGame);

function saveCurrentGame() {
  const { currentGame } = canvasGame;
  currentGame.saveGameState();
}

function continueSavedGame() {
  const { currentGame } = canvasGame;

  let gameOption = [];
  const savedState = localStorage.getItem('VitaliMay_gameState');
  if (savedState) {
    const gameState = JSON.parse(savedState);
    const { gridSize, matrix, matrixName } = gameState;

    gameOption = [gridSize, squareSize.value, squareSize.gapSize, matrix];
    console.log(gameState);

    titleH1.textContent = `Hello Nonograms ${matrixName}`;
  }

  currentGame.removeCanvas();
  canvasGame.currentGame = new CanvasGrid(...gameOption);

  canvasGame.currentGame.loadGameState();

  btnInterfaceArr.forEach((btn) => {
    btn.disabled = false;
  });
}

// console.log('Локал стораге');

export { saveCurrentGame };
