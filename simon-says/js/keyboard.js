import { main, keyboardNum, keyboardLetter, keyboard, inputText, levelArr, levelKeyboardMap } from "./variables.js";
import { createEl } from "./elementUtils.js";
import { userSequence, checkUserSequence } from "./game-logic.js";


/*********************************** */

const nums = '1234567890'
const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM';

const keyClassArr = ['key', 'disabled']

const keysArr = []

function createKeyboard (str, classArr, parent) {
  const strArr = str.split('')
  strArr.forEach((key, index) => {
      if (strArr.length > 10 && index === 10) {
        const keyEl = createEl({text: `${key}`, styles: {marginLeft: '4px'}, classes: classArr, parent: parent})
        keyEl.setAttribute('data-key', key.toLowerCase())
        keysArr.push(keyEl);
      } else {
        const keyEl = createEl({text: `${key}`, classes: classArr, parent: parent});
        keyEl.setAttribute('data-key', key.toLowerCase())
        keysArr.push(keyEl);
      }
    });
}

createKeyboard( nums, keyClassArr, keyboardNum )
createKeyboard( letters, keyClassArr, keyboardLetter )

keyboard.addEventListener('click', typeUserSequence)

function typeUserSequence (event) {
  const {target} = event;
  const keyEl = target.closest('[data-key]')

  if (keyEl) {
    const dataEl = keyEl.getAttribute('data-key')

    inputText.value += dataEl;

    userSequence.value = inputText.value

    checkUserSequence()
  }
}

/*********************************************** */
// Определяю что нажата клавиша входящяя в клавиатуру

function startsWithAny(eventCodeStr) {
  const prefixEventCode = ['Key', 'Digit', 'Num'];
  return prefixEventCode.some(prefix => eventCodeStr.startsWith(prefix));
}

/*********************************************** */


let isKeyPressed = null; // Флаг для отслеживания нажатия клавиши (хранение нажатой клавиши)

document.addEventListener('keydown', logicKeyboard);

/********************************* */
// не придумал ничего лучше как заставить клаву не работать
// document.removeEventListener('keydown', logicKeyboard);
/********************************* */

function logicKeyboard (event) {

  keyboard.removeEventListener('click', typeUserSequence) // чтобы нельзя было кликнуть, когда нажата клавиша

  const el = `${event.code}`;
  const elLastSymb = el.charAt(el.length - 1);

  // Проверяю, что нажата клавиша только с англ. буквами и цифрами
  const hasKey = startsWithAny(el)
  if (!hasKey) {
    return; // если нажата клавиша не входящая в клавиатуру (шифт например), то нажатие игнорирую
  }

  if (isKeyPressed) { // проверяю что клавиша нажата
    // Если нажатая клавиша отличается от другой, проявляющей активность, то не реагируем на нажатие
    if (isKeyPressed !== elLastSymb){
      return;
    }
  } else {
    // запоминаю нажатую клавишу
    isKeyPressed = elLastSymb
  }

  // Проверяю, есть ли у хотя бы одного элемента класс 'disabled'
  // Если есть, значит клава в рабочем состоянии
  const hasDisabledClass = levelArr.some(el => el.classList.contains('disabled'));

  // Нахожу активный уровень
  const activeElement = levelArr.find(el => el.classList.contains('active'));

  // Получаю набор символов, соотв. уровню
  const levelKeyboardStr = levelKeyboardMap.get(activeElement).toUpperCase();

  // Проверяю наличие символа в строке-клавиатуре
  const isPresent = levelKeyboardStr.includes(elLastSymb);

  // Нахожу соотв. еl в нарисованой клаве
  if (hasKey) {

    const foundKey = keysArr.find(el => el.getAttribute('data-key').toUpperCase() === elLastSymb);
    if (foundKey) {
      foundKey.classList.add('active')
    }
  }

  if (hasDisabledClass && hasKey && isPresent && !event.repeat) {
    inputText.value += elLastSymb

    userSequence.value = inputText.value

    checkUserSequence()
  }

}

/*************************************************************************** */

// Убираю визуализацию нажатия клавиатуры
document.addEventListener('keyup', (event) => {

  keyboard.addEventListener('click', typeUserSequence) // возвращаю возможность клика по клаве

  const el = `${event.code}`;
  const elLastSymb = el.charAt(el.length - 1);

  if (isKeyPressed === elLastSymb) {
    isKeyPressed = null; // Обнуляю нажатую клавишу после отпускания
  }
  const foundKey = keysArr.find(el => el.getAttribute('data-key') === elLastSymb.toLowerCase());

  if (foundKey) {
      foundKey.classList.remove('active'); // Анимация отпускания клавиши)
  }

});


export { createKeyboard, keysArr, logicKeyboard }
