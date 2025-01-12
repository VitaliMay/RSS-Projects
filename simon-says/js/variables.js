import { createEl } from "./elementUtils.js"

const body = document.querySelector('body')

const wrapper = createEl({ classes: ['wrapper'], parent: body})

/***** HEADER ********* */
const header = createEl({ tag: 'header', classes: ['header'], parent: wrapper})

/************ */
const levelBlock = createEl({ classes: ['level'], parent: header })

const levelElOption = {
  tag: 'button',
  attributes: {
    type: 'button',
  },
  parent: levelBlock,
}

const levelEasy = createEl({...levelElOption, text: 'easy', classes: ['level__el', 'level__el_easy', 'active', 'key'],})
const levelMedium = createEl({...levelElOption, text: 'medium', classes: ['level__el', 'level__el_medium', 'key'],})
const levelHard = createEl({...levelElOption, text: 'hard', classes: ['level__el', 'level__el_hard', 'key'],})
// const levelEasy = createEl({...levelElOption, text: 'easy', classes: ['level__el', 'level__el_easy', 'disabled', 'key'],})
// const levelMedium = createEl({...levelElOption, text: 'medium', classes: ['level__el', 'level__el_medium', 'disabled', 'key'],})
// const levelHard = createEl({...levelElOption, text: 'hard', classes: ['level__el', 'level__el_hard', 'active', 'key'],})

const levelArr = [levelEasy, levelMedium, levelHard]

// const levelKeyboardObj = {
//   levelEasy: '1234567890',
//   levelMedium: 'qwertyuiopasdfghjklzxcvbnm',
//   levelHard: '1234567890qwertyuiopasdfghjklzxcvbnm'
// }

// Создаю Map, чтобы ключами были созданные елементы
const levelKeyboardMap = new Map();

levelKeyboardMap.set(levelEasy, '1234567890');
levelKeyboardMap.set(levelMedium, 'qwertyuiopasdfghjklzxcvbnm');
levelKeyboardMap.set(levelHard, '1234567890qwertyuiopasdfghjklzxcvbnm');

/************ */
const startBlock = createEl({ classes: ['start'], parent: header })

const startTitleH1 = createEl({ tag: 'h1', text: 'Simon Says', classes: ['title-h1'], parent: startBlock })

const startButtonOption = {
  tag: 'button',
  text: 'Start',
  classes: ['key', 'keyboard-space'],
  attributes: {
    type: 'button',
  },
  parent: startBlock,
}
const startButton = createEl(startButtonOption)
// const startButton = createEl({ tag: 'button', text: 'Start', classes: ['key', 'keyboard-space'], parent: startBlock })

// const nextButtonOption = {
//   tag: 'button',
//   text: 'Next',
//   classes: ['key', 'keyboard-space', 'visually-hidden'],
//   attributes: {
//     type: 'button',
//   },
//   parent: startBlock,
// }
// const nextButton = createEl(nextButtonOption)

/************ */
const info = createEl({ classes: ['info'], parent: header })
// const info = createEl({ classes: ['info', 'visually-hidden'], parent: header })

const infoRoundOption = {
  classes: ['info__el', 'info__el_round', 'key', 'key_info', 'key_info-round', 'visually-hidden'],
  // classes: ['info__el', 'info__el_round', 'key', 'key_info', 'key_info-round'],
  text: '1 round',
  parent: info,
}
const infoRound = createEl(infoRoundOption)

const infoNewGameOption = {
  classes: ['info__el', 'info__el_new-game', 'key', 'key_info', 'visually-hidden'],
  // classes: ['info__el', 'info__el_new-game', 'key', 'key_info'],
  text: 'new game',
  parent: info,
}
const infoNewGame = createEl(infoNewGameOption)

const infoRepeatOption = {
  classes: ['info__el', 'info__el_repeat', 'key', 'key_info', 'visually-hidden'],
  // classes: ['info__el', 'info__el_repeat', 'key', 'key_info'],
  text: 'Repeat the sequence',
  parent: info,
}
const infoRepeat = createEl(infoRepeatOption)

const infoArr = [infoRound, infoNewGame, infoRepeat]


const nextButtonOption = {
    tag: 'button',
    text: 'Next',
    classes: ['info__el', 'key', 'key_info', 'visually-hidden'],
    attributes: {
      type: 'button',
    },
    parent: info,
  }
  const nextButton = createEl(nextButtonOption)


/***** MAIN ********* */
const main = createEl({ tag: 'main', classes: ['main'], parent: wrapper})

const inputTextOption = {
  tag: 'input',
  classes: ['input-text'],
  attributes: {
    type: 'text',
    readonly: true,
    value: '',
    // value: 'qwertyuiopas',
  },
  parent: main,
}

const inputText = createEl(inputTextOption);
const keyboard = createEl({ classes: ['keyboard'], parent: main})

const keyboardNum = createEl({ classes: ['keyboard-num'], parent: keyboard})
const keyboardLetter = createEl({ classes: ['keyboard-letter', 'visually-hidden'], parent: keyboard})

const keyboardArr = [keyboardNum, keyboardLetter]

export { body, wrapper, header, main, inputText, keyboardNum, keyboardLetter, keyboardArr, keyboard,  levelBlock, levelEasy, levelMedium, levelHard, levelArr, levelKeyboardMap, info, infoArr, startButton, nextButton}