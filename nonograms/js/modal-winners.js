import { createEl, removeAllChild } from './elementUtils.js';
import { body, settingWinners } from './interface.js';
import { gameWinnersStorage } from './modal-winners-LS.js';

/********************************************************** */
/****  Модалка таблица результатов     ******************** */
/****  Модалка таблица Winners         ******************** */

const modalContainerWinners = createEl({
  parent: body,
  classes: ['modal-container'],
});
const modalWinners = createEl({
  tag: 'article',
  classes: ['modal-winners'],
  parent: modalContainerWinners,
});

const buttonCrossWinners = createEl({
  tag: 'button',
  classes: ['button-cross'],
  attributes: { type: 'button', 'aria-label': 'button-close' },
  parent: modalWinners,
});
// const buttonCrossItem01 = createEl({
createEl({
  tag: 'span',
  classes: ['button-cross__item', 'button-cross__item--01'],
  parent: buttonCrossWinners,
});
// const buttonCrossItem02 = createEl({
createEl({
  tag: 'span',
  classes: ['button-cross__item', 'button-cross__item--02'],
  parent: buttonCrossWinners,
});

// const infoSelect = createEl({ classes: ['info'], parent: modalSelect });
createEl({
  tag: 'h2',
  classes: ['modal-winners__title'],
  text: 'Winners (Last Five Results)',
  parent: modalWinners,
});

const modalWinnersBlock = createEl({
  classes: ['modal-winners__block', 'winners-block'],
  parent: modalWinners,
});

/*************************************** */

function formatSeconds(sec) {
  const minutes = Math.floor(sec / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (sec % 60).toString().padStart(2, '0');
  return { seconds, minutes };
}

function creatModalWinnersContent() {
  const winnersArr = gameWinnersStorage.getWinners();

  winnersArr.sort((a, b) => a.timer - b.timer);

  winnersArr.forEach((winner, index) => {
    const { matrixName, gridSize, timer } = winner;

    const { seconds, minutes } = formatSeconds(timer);

    const modalWinnersElement = createEl({
      classes: ['winners-item'],
      parent: modalWinnersBlock,
    });

    createEl({
      classes: ['winners-item__el', 'winners-item__el_index'],
      parent: modalWinnersElement,
      text: index + 1, // Индекс, увеличенный на 1 для удобства отображения
    });

    createEl({
      classes: ['winners-item__el', 'winners-item__el_name'],
      parent: modalWinnersElement,
      text: matrixName,
    });

    createEl({
      classes: ['winners-item__el', 'winners-item__el_size'],
      parent: modalWinnersElement,
      text: `${gridSize}x${gridSize}`,
    });

    createEl({
      classes: ['winners-item__el', 'winners-item__el_time'],
      parent: modalWinnersElement,
      text: `${minutes} : ${seconds}`,
    });
  });
}
/*************************************** */

// const modalWinnersElement = createEl({
//   classes: ['winners-item'],
//   parent: modalWinnersBlock,
// });

// createEl({
//   classes: ['winners-item__el', 'winners-item__el_index'],
//   parent: modalWinnersElement,
//   text: '8',
// });

// createEl({
//   classes: ['winners-item__el', 'winners-item__el_name'],
//   parent: modalWinnersElement,
//   text: 'butterfly',
// });

// createEl({
//   classes: ['winners-item__el', 'winners-item__el_size'],
//   parent: modalWinnersElement,
//   text: '15x15',
// });

// createEl({
//   classes: ['winners-item__el', 'winners-item__el_time'],
//   parent: modalWinnersElement,
//   text: '88 : 32',
// });

// const modalWinnersElement02 = createEl({
//   classes: ['winners-item'],
//   parent: modalWinnersBlock,
// });

// createEl({
//   classes: ['winners-item__el', 'winners-item__el_index'],
//   parent: modalWinnersElement02,
//   text: '8',
// });

// createEl({
//   classes: ['winners-item__el', 'winners-item__el_name'],
//   parent: modalWinnersElement02,
//   text: 'butterfly',
// });

// createEl({
//   classes: ['winners-item__el', 'winners-item__el_size'],
//   parent: modalWinnersElement02,
//   text: '15x15',
// });

// createEl({
//   classes: ['winners-item__el', 'winners-item__el_time'],
//   parent: modalWinnersElement02,
//   text: '88 : 32',
// });

/************************************** */

const buttonCloseWinners = createEl({
  tag: 'button',
  classes: ['button', 'button_close'],
  attributes: { type: 'button', 'aria-label': 'button-close' },
  text: 'Close',
  parent: modalWinners,
});

/********************************************************** */
// Открываю модалку Winners

settingWinners.addEventListener('click', initModalWinners);

function initModalWinners() {
  removeAllChild(modalWinnersBlock);
  creatModalWinnersContent();

  modalContainerWinners.classList.add('modal-container--active');
  body.classList.add('lock');

  // console.log('Привет Модалка Победители');
}

// Закрываю модалку Winners
modalContainerWinners.addEventListener('click', function (event) {
  const { target } = event;

  // const { currentGame } = canvasGame;
  // const button = target.closest('.button:not(.button_close)');

  if (
    target === this ||
    target === buttonCrossWinners ||
    target === buttonCloseWinners
  ) {
    // Клик произошел именно на родительском элементе или крестике
    this.classList.remove('modal-container--active');
    body.classList.remove('lock');
  }
});

// console.log('Привет Победители');
export { modalContainerWinners };
