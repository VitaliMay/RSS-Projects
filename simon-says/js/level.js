import { levelBlock, levelEasy, levelMedium, levelHard, levelArr, keyboardNum, keyboardLetter, keyboardArr, info, infoArr, startButton, inputText } from "./variables.js";
import { keysArr } from "./keyboard.js";
import { createSequence, playSequence, sequence, repeatSequence, flagRepeatSequence } from "./game-logic.js";

const [infoRound, infoNewGame, infoRepeat] = infoArr;
// console.log(infoRepeat)

const level = { value: 3 };
// let flagRepeatSequence = true;

infoRound.textContent = `${level.value} round`

startButton.addEventListener('click', startGame)
levelBlock.addEventListener('click', changeLevel)

infoRepeat.addEventListener('click', repeatSequence)
infoNewGame.addEventListener('click', startNewGame)


function startNewGame () {
  startButton.classList.remove('visually-hidden')
  sequence.length = 0  // очищаю последовательность
  inputText.value = ''
  // console.log(sequence)
  inputText.placeholder = ''

  infoArr.forEach(el => {
    el.classList.add('visually-hidden')
  })

  levelArr.forEach(el => {
    if (!el.classList.contains('active')) {
      el.classList.remove('disabled')
    }
  })

  keysArr.forEach(el => {
    el.classList.add('disabled')
  })

  flagRepeatSequence.value = true
}


function startGame () {
  inputText.placeholder = 'remember the sequence'

  startButton.classList.add('visually-hidden')

  levelArr.forEach(el => {
    if (!el.classList.contains('active')) {
      el.classList.add('disabled')
    }
  })

  infoArr.forEach(el => {
      el.classList.remove('visually-hidden')
  })

  infoArr.forEach((el, index) => {
    if (index !== 0) { // пропускаю round
      el.classList.add('disabled')
    }
  })

  // keysArr.forEach(el => {
  //     el.classList.remove('disabled')
  // })

  // inputText.value = createSequence(5).join('')
  createSequence(level.value)

  setTimeout(() => {
    playSequence();
  }, 1000);

  // playSequence()

  // setTimeout(() => {
  //   keysArr.forEach(el => {
  //     el.classList.remove('disabled')
  //   })
  // }, 1000);

  // inputText.value = sequence.join('')

  console.log(`${level.value} round ${sequence.join('')}`)

  flagRepeatSequence.value = true
}

// function repeatSequence () {
//   if (!flagRepeatSequence) return;

//   inputText.placeholder = 'remember the sequence'
//   // console.log(sequence)
//   keysArr.forEach(el => {
//     el.classList.add('disabled')
//   })

//   setTimeout(() => {
//     playSequence();
//   }, 1000);

//   flagRepeatSequence = false;
//   // infoArr[2].classList.add('disabled')
// }

/************************************ */
function changeLevel (event) {
  const { target } = event

  const level = target.closest('.level__el')
  if (level) {
    removeActiveClass (levelArr, 'active')
    removeActiveClass (levelArr, 'disabled')

    level.classList.add('active')

    removeActiveClass (keyboardArr, 'visually-hidden')

    if (level === levelEasy) {
      keyboardLetter.classList.add('visually-hidden')
    }
    if (level === levelMedium) {
      keyboardNum.classList.add('visually-hidden')
    }
  }

}

function removeActiveClass (tabs, activeClass) {
  tabs.forEach(tab => {
    tab.classList.remove(activeClass);
  });
}


export { changeLevel }