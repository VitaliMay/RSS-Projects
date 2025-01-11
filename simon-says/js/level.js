import { levelBlock, levelEasy, levelMedium, levelHard, levelArr, keyboardNum, keyboardLetter, keyboardArr, info, infoArr, startButton, inputText } from "./variables.js";
import { keysArr } from "./keyboard.js";
import { createSequence, playSequence, sequence } from "./game-logic.js";

const [infoRound, infoNewGame, infoRepeat] = infoArr;
console.log(infoRepeat)

levelBlock.addEventListener('click', changeLevel)
startButton.addEventListener('click', startGame)
infoRepeat.addEventListener('click', repeatSequence)


function startGame () {
  startButton.classList.add('visually-hidden')

  levelArr.forEach(el => {
    if (!el.classList.contains('active')) {
      el.classList.add('disabled')
    }
  })

  infoArr.forEach(el => {
      el.classList.remove('visually-hidden')
  })

  // keysArr.forEach(el => {
  //     el.classList.remove('disabled')
  // })

  // inputText.value = createSequence(5).join('')
  createSequence(5)

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

  console.log(sequence.join(''))
}

function repeatSequence () {
  // console.log(sequence)
  keysArr.forEach(el => {
    el.classList.add('disabled')
  })

  setTimeout(() => {
    playSequence();
  }, 1000);
}

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