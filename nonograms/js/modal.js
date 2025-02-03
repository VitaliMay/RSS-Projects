import { getRandomInteger, createEl } from './elementUtils.js';
import {
  body,
  titleH1,
  btnContainer,
  btnInterfaceArr,
  btnSave,
} from './interface.js';
import { data } from './data.js';
import { canvasGame, CanvasGrid, squareSize } from './canvasDraw.js';
import { checkLocalStorage } from './save-game.js';
// import { canvasGame } from './gameLogic.js';

// const body = document.querySelector('body');

// const modalContainer = document.querySelector('.modal-container');

// const canvasContainer = document.querySelector('.canvas-container');

// const btnContainer = document.querySelector('.btn-container');

const [btnReset, btnRandom, btnSolution, btnSelect] = btnInterfaceArr;
const btnSelectArr = [];

/********************************************************** */
/****  Модалка победа                  ******************** */

const modalContainer = createEl({ parent: body, classes: ['modal-container'] });
const modal = createEl({
  tag: 'article',
  classes: ['modal'],
  parent: modalContainer,
});

const buttonCross = createEl({
  tag: 'button',
  classes: ['button-cross'],
  attributes: { type: 'button', 'aria-label': 'button-close' },
  parent: modal,
});
// const buttonCrossItem01 = createEl({
createEl({
  tag: 'span',
  classes: ['button-cross__item', 'button-cross__item--01'],
  parent: buttonCross,
});
// const buttonCrossItem02 = createEl({
createEl({
  tag: 'span',
  classes: ['button-cross__item', 'button-cross__item--02'],
  parent: buttonCross,
});

// const modalTitle = createEl({
const modalTitle = createEl({
  tag: 'h2',
  classes: ['modal-title'],
  text: 'Great! You have solved the nonogram!',
  parent: modal,
});

const buttonClose = createEl({
  tag: 'button',
  classes: ['button', 'button_close'],
  attributes: { type: 'button', 'aria-label': 'button-close' },
  text: 'Close',
  parent: modal,
});

/********************************************************** */
/****  Модалка SELECT                  ******************** */

const modalContainerSelect = createEl({
  parent: body,
  classes: ['modal-container'],
});
const modalSelect = createEl({
  tag: 'article',
  classes: ['modal-select'],
  parent: modalContainerSelect,
});

const buttonCrossSelect = createEl({
  tag: 'button',
  classes: ['button-cross'],
  attributes: { type: 'button', 'aria-label': 'button-close' },
  parent: modalSelect,
});
// const buttonCrossItem01 = createEl({
createEl({
  tag: 'span',
  classes: ['button-cross__item', 'button-cross__item--01'],
  parent: buttonCrossSelect,
});
// const buttonCrossItem02 = createEl({
createEl({
  tag: 'span',
  classes: ['button-cross__item', 'button-cross__item--02'],
  parent: buttonCrossSelect,
});

const infoSelect = createEl({ classes: ['info'], parent: modalSelect });
createEl({
  tag: 'h2',
  classes: ['info__title'],
  text: 'Selected game:',
  parent: infoSelect,
});
const infoOutput = createEl({
  tag: 'output',
  classes: ['info__select-game'],
  parent: infoSelect,
  text: 'butterfly',
});

// const sizeContainerMin = createEl({
//   classes: ['size-container'],
//   parent: modalSelect,
// });

// createEl({
//   tag: 'button',
//   classes: ['button', 'button_select'],
//   attributes: { type: 'button', 'data-gridSize':  },
//   parent: sizeContainerMin,
// });

// const sizeContainerMedium = createEl({
//   classes: ['size-container'],
//   parent: modalSelect,
// });
// const sizeContainerMax = createEl({
//   classes: ['size-container'],
//   parent: modalSelect,
// });

function createButtonSelect(result, parentContainer) {
  for (const size in result) {
    // Контейнер для каждой сетки
    const sizeContainer = createEl({
      classes: ['size-container', `size-container_${size}`],
      parent: parentContainer,
    });

    // Кнопка для каждого значения в массиве
    result[size].forEach((name) => {
      const btn = createEl({
        tag: 'button',
        classes: ['button', 'button_select'],
        attributes: {
          type: 'button',
          'data-gridSize': size,
          'data-name': name,
        },
        text: `${size}x${size} ${name}`, // Название кнопки будет как у матрицы
        parent: sizeContainer,
      });

      if (name === 'butterfly') {
        btn.disabled = true;
      }

      btnSelectArr.push(btn); // заполняю массив кнопок, чтобы снимать дизаблед
    });
  }
}

/*********************************************** */
// Наверное лучше сделать map и навесить на кнопку-ключ сразу матрицу,
// вместо data но нифига не успеваю
// const levelKeyboardMap = new Map();

// levelKeyboardMap.set(levelEasy, '1234567890');
// levelKeyboardMap.set(levelMedium, 'qwertyuiopasdfghjklzxcvbnm');
// levelKeyboardMap.set(levelHard, '1234567890qwertyuiopasdfghjklzxcvbnm');

/*********************************************** */

function groupGridSize(data) {
  const result = {};

  for (const [key, value] of Object.entries(data)) {
    const { gridSize } = value;

    // если массива ещё нет создаю его
    if (!result[gridSize]) {
      result[gridSize] = [];
    }
    result[gridSize].push(key);
  }

  return result;
}

const groupSizeObj = groupGridSize(data);
// const sizeArr = Object.keys(groupSizeObj);
// console.log('size', groupSizeObj);
// console.log('size Arr', sizeArr);
// console.log(groupSizeObj[sizeArr[1]]);

createButtonSelect(groupSizeObj, modalSelect);

/********************************************************** */
const buttonCloseSelect = createEl({
  tag: 'button',
  classes: ['button', 'button_close'],
  attributes: { type: 'button', 'aria-label': 'button-close' },
  text: 'Close',
  parent: modalSelect,
});

/********************************************************** */
/********************************************************** */

function getRandomMatrixOption(squareSize = 30) {
  const keysArr = Object.keys(data);
  const randomIndex = getRandomInteger(0, keysArr.length - 1);
  const matrixName = keysArr[randomIndex];

  // это надо выкинуть из этой функции
  titleH1.textContent = `Hello Nonograms ${matrixName}`;
  infoOutput.textContent = matrixName;
  btnSelectArr.forEach((btn) => {
    btn.disabled = false;
    if (btn.getAttribute('data-name') === matrixName) {
      btn.disabled = true;
    }
  });

  const gridSize = data[matrixName].gridSize;
  const matrix = data[matrixName].matrix;
  return [gridSize, squareSize, 1, matrix];
}

/********************************************************* */

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
    if (target === btnReset) {
      // if (button.classList.contains('button_reset')) {
      currentGame.resetGame();

      btnInterfaceArr.forEach((btn) => {
        btn.disabled = false;
      });
    }
    if (target === btnRandom) {
      // if (button.classList.contains('button_random')) {
      currentGame.removeCanvas();
      const randomMatrixOption = getRandomMatrixOption(squareSize.value);
      canvasGame.currentGame = new CanvasGrid(...randomMatrixOption);

      btnInterfaceArr.forEach((btn) => {
        btn.disabled = false;
      });
      // Достать name и вставить сюда
      // titleH1.textContent = `Hello Nonograms ${matrixName}`;
    }
    if (target === btnSolution) {
      // if (button.classList.contains('button-solution')) {
      currentGame.showSolution();

      btnSave.disabled = true;
      btnSolution.disabled = true;
    }
    if (target === btnSelect) {
      // if (button.classList.contains('button-select')) {
      modalContainerSelect.classList.add('modal-container--active');
      body.classList.add('lock');
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

function initModal(totalSeconds) {
  // const { target } = event;
  modalTitle.textContent = `Great! You have solved the nonogram in ${totalSeconds} seconds!`;

  modalContainer.classList.add('modal-container--active');
  body.classList.add('lock');

  btnSave.disabled = true;
  btnSolution.disabled = true;
}

// Закрываю модалку
modalContainer.addEventListener('click', function (event) {
  const { target } = event;
  // const btnCross = target.closest('.button-cross');
  // const btnClose = target.closest('.button_close');
  // if (target === this || btnCross || btnClose) {
  if (target === this || target === buttonCross || target === buttonClose) {
    // Клик произошел именно на родительском элементе или крестике
    this.classList.remove('modal-container--active');
    body.classList.remove('lock');
  }
});

// Закрываю модалку SELECT
modalContainerSelect.addEventListener('click', function (event) {
  const { target } = event;

  const { currentGame } = canvasGame;
  // const button = target.closest('.button');
  const button = target.closest('.button:not(.button_close)');

  if (
    target === this ||
    target === buttonCrossSelect ||
    target === buttonCloseSelect
  ) {
    // Клик произошел именно на родительском элементе или крестике
    this.classList.remove('modal-container--active');
    body.classList.remove('lock');
  }

  if (button) {
    const matrixName = button.getAttribute('data-name');
    const gridSize = Number(button.getAttribute('data-gridSize'));
    const matrix = data[matrixName].matrix;
    // const squareSize = 30;

    // если не эта кнопка была кликнута ранее
    if (!button.disabled) {
      btnInterfaceArr.forEach((btn) => {
        btn.disabled = false;
      });
    }

    checkLocalStorage();

    const canvasGameOption = [gridSize, squareSize.value, 1, matrix];
    // console.log(typeof gridSize);
    // console.log(matrixName, gridSize);

    // button.setAttribute('disabled', true)
    btnSelectArr.forEach((btn) => {
      btn.disabled = false;
    });
    button.disabled = true;
    infoOutput.textContent = matrixName;

    titleH1.textContent = `Hello Nonograms ${matrixName}`;

    currentGame.removeCanvas();
    canvasGame.currentGame = new CanvasGrid(...canvasGameOption);
  }
});

export { modalContainer, initModal, btnSelectArr };
// export { modalContainer, initModal, canvasContainer };
// export { modalContainer, body, initModal, canvasContainer };
