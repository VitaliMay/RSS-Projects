
function createEl (options) {
  const { tag = 'div', text = '', classes = [], attributes = {}, styles = {}, parent = null, children = [],} = options;

  const element = document.createElement(tag);
  element.textContent = text;
  element.classList.add(...classes);

  if (attributes) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }

  if (styles) {
    Object.keys(styles).forEach(key => {
      element.style[key] = styles[key];
    });
  }

  if (parent) parent.append(element);

  element.append(...children);

  return element
}

/********************************************************* */

function createSvgEl(rawSvg) {
  const svg = document.createRange().createContextualFragment(rawSvg);
  return svg;
}

/********************************************************* */
// Удаления у элемента всех дочерних

function removeAllChild(element) {
  while (element.firstElementChild) {
      element.removeChild(element.firstElementChild)
  }
}

/*********************************************************************** */
// Функция для перемешивания массива (перемешивание Фишера-Йетса)

function shuffleArray(baseArray) {
  const array = [...baseArray]
  for (let i = array.length - 1; i > 0; i -= 1) {
      // Генерируем случайный индекс от 0 до i (включительно)
      const j = Math.floor(Math.random() * (i + 1));
      // Меняем местами элементы с индексами i и j
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


/*********************************************************************** */
// Функция рандомного числа в диапазоне

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*********************************************************************** */
// Функция рандомного массива индексоа в диапазоне

function getRandomIntegerArr(min, max, length) {

  const randomArr = new Set(); // Set для уникальности

  const getRandomInteger = () => Math.floor(Math.random() * (max - min + 1)) + min;

  while (randomArr.size < length) { // Генерируем до тех пор, пока не достигнута нужная длина
    const randomDigit = getRandomInteger();
    randomArr.add(randomDigit); // Set не допустит дублирования
  }

  return [...randomArr]; // Преобразуем Set обратно в массив
}

/*********************************************************************** */
// Функция для написания строки с большой буквы

function toUpperFirstLetter (str) {
  if (!str) return '';
  const strLowerCase = str.trim().toLowerCase()
  return strLowerCase.charAt(0).toUpperCase() + strLowerCase.slice(1);
}



export {createEl, removeAllChild, shuffleArray, getRandomIntegerArr, toUpperFirstLetter}


/* пробую решить задав право на ошибку в 2px     */

// function isDifferenceInRange(value1, value2) {
//   return Math.abs(value1 - value2) <= 2;
// }


