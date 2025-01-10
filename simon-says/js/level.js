import { levelBlock, levelEasy, levelMedium, levelHard, levelArr, keyboardNum, keyboardLetter, keyboardArr, info, infoArr, startButton } from "./variables.js";
import { keysArr } from "./keyboard.js";

levelBlock.addEventListener('click', changeLevel)
startButton.addEventListener('click', startGame)

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

  keysArr.forEach(el => {
      el.classList.remove('disabled')
  })
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