import { levelArr, levelKeyboardMap, inputText, infoArr } from "./variables.js";
import { shuffleArray, getRandomIntegerArr } from "./elementUtils.js";
import { keysArr, logicKeyboard } from "./keyboard.js";
// import { keysArr, logicKeyboard, disableKeyboard, activeKeyboard } from "./keyboard.js";

let sequence = []
let userSequence = []
const flagRepeatSequence = { value: true };
// let flagRepeatSequence = true;

function createSequence (roundNum) {
  const lengthSequence = roundNum * 2;

  // Нахожу активный уровень
  const activeElement = levelArr.find(el => el.classList.contains('active'));

  // Получаю набор символов, соотв. уровню
  // console.log(levelKeyboardMap.get(activeElement));
  const levelKeyboardStr = levelKeyboardMap.get(activeElement);

  const maxIndex = levelKeyboardStr.length - 1;

  sequence = getRandomIntegerArr(0, maxIndex, lengthSequence, levelKeyboardStr)
  // return sequence

}

// console.log('Привет game')

// console.log(createSequence(5))

/************************************** */
/************************************** */


function activateKey(seqEl) {
  const tile = keysArr.find(el => el.getAttribute('data-key') === seqEl);

  tile.classList.add('active-seq');

// Динамически устанавливаю длительность анимации
// для удобства отладки
  const animationDuration = '1s';
  tile.style.animationDuration = animationDuration; 

  // inputText.value = seqEl // можно показывать последовательность
  // inputText.value += seqEl // можно показывать последовательность
  // Удаляю класс анимации после завершения анимации
  tile.addEventListener('animationend', () => {
      tile.classList.remove('active-seq');

  }, { once: true }); // обработчик будет вызван только один раз
}

/******************** */

function playSequence(index = 0) {
  infoArr.forEach((el, index) => {
    if (index !== 0) { // пропускаю round
      el.classList.add('disabled')
    }
  })

  document.removeEventListener('keydown', logicKeyboard);

  inputText.placeholder = 'remember the sequence'

  // останавливаю работу клавы пока играет последовательность
  if (index < sequence.length) {
    activateKey(sequence[index]); // Активирую текущую клавишу
    setTimeout(() => {
      playSequence(index + 1); // Рекурсивно вызываю функцию для следующего индекса
    }, 1500);
    // Задержка перед активацией следующего тайла
    // должна быть больше времени анимации
  } else { // когда доиграет всё включаю
    keysArr.forEach(el => {
      el.classList.remove('disabled')
    })

    // activeKeyboard()
    document.addEventListener('keydown', logicKeyboard);

    infoArr.forEach((el) => {
        el.classList.remove('disabled')
    })

    inputText.placeholder = 'type the sequence'

    if (!flagRepeatSequence.value) infoArr[2].classList.add('disabled')
  }

}

function repeatSequence () {
  if (!flagRepeatSequence) return;

  inputText.placeholder = 'remember the sequence'
  // console.log(sequence)
  keysArr.forEach(el => {
    el.classList.add('disabled')
  })

  setTimeout(() => {
    playSequence();
  }, 1000);

  flagRepeatSequence.value = false;
  // infoArr[2].classList.add('disabled')
}


export { createSequence, sequence, playSequence, repeatSequence, flagRepeatSequence }
