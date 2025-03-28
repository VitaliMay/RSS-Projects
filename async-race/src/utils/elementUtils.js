export const { body } = document;

function createEl(options) {
  const {
    tag = 'div',
    text = '',
    classes = [],
    attributes = {},
    styles = {},
    parent = null,
    // parent = body,
    children = [],
  } = options;

  const element = document.createElement(tag);
  element.textContent = text;
  element.classList.add(...classes);

  // if (attributes) {
  //   for (const key in attributes) {
  //     element.setAttribute(key, attributes[key]);
  //   }
  // }

  // if (attributes) {
  //   for (const key of Object.keys(attributes)) {
  //     element.setAttribute(key, attributes[key]);
  //   }
  // }

  if (attributes) {
    Object.keys(attributes).forEach((key) => {
      element.setAttribute(key, attributes[key]);
    });
  }

  if (styles) {
    Object.keys(styles).forEach((key) => {
      element.style[key] = styles[key];
    });
  }

  if (parent) parent.append(element);

  element.append(...children);

  return element;
}

/** ******************************************************* */
// для SVG

// function createSvgEl(svgMarkup) {
//     const svgEl = document.createRange().createContextualFragment(svgMarkup);
//     return svgEl;
// }

function createSvgUse(idSvgSymbol, elClass) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', elClass);
  // svg.setAttribute('width', '16');
  // svg.setAttribute('height', '16');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', `${idSvgSymbol}`);
  svg.append(use);
  return svg;
}

/** ******************************************************* */
// Удаления у элемента всех дочерних

function removeAllChild(element) {
  while (element.firstElementChild) {
    element.removeChild(element.firstElementChild);
  }
}

/** ********************************************************************* */
// Функция для перемешивания массива (перемешивание Фишера-Йетса)

function shuffleArray(baseArray) {
  const array = [...baseArray];
  for (let i = array.length - 1; i > 0; i -= 1) {
    // Генерируем случайный индекс от 0 до i (включительно)
    const j = Math.floor(Math.random() * (i + 1));
    // Меняем местами элементы с индексами i и j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/** ********************************************************************* */
// Функция рандомного числа в диапазоне

// function getRandomInteger(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

/** ********************************************************************* */
// Функция рандомного массива индексоа в диапазоне

function getRandomIntegerArr(min, max, length) {
  const randomArr = new Set(); // Set для уникальности

  const getRandomInteger = () => Math.floor(Math.random() * (max - min + 1)) + min;

  while (randomArr.size < length) {
    // Генерируем до тех пор, пока не достигнута нужная длина
    const randomDigit = getRandomInteger();
    randomArr.add(randomDigit); // Set не допустит дублирования
  }

  return [...randomArr]; // Преобразуем Set обратно в массив
}

/** ********************************************************************* */
// Функция для написания строки с большой буквы

function toUpperFirstLetter(str) {
  if (!str) return '';
  const strLowerCase = str.trim().toLowerCase();
  return strLowerCase.charAt(0).toUpperCase() + strLowerCase.slice(1);
}

/** ********************************************************************* */
// Валидирую строку для однообразия в data атрибуте

function getCategoryFromString(str) {
  const lowerCasedString = str.toLowerCase();
  const trimmedString = lowerCasedString.trim();
  const resultString = trimmedString.replace(/\s/g, '_');

  return resultString;
}

/** ********************************************************************* */
// Функция счётчик

function createCounter(initialValue) {
  let count = initialValue;

  return {
    getCount: () => {
      count += 1;
      return count;
    },
    resetCount: () => {
      count = 0;
    },
    loadCount: (loadValue) => {
      count = loadValue;
    },
  };
}

// function createCounter(initialValue) {
//     let count = initialValue;

//     return function () {
//         return (count += 1);
//     };
// }

/** **************************************************************** */
// Функция удаляет из массива объектов,
// элемент-объект у которого есть ключ id c соответствующим значением

function removeById(arrObj, id) {
  const index = arrObj.findIndex((item) => item.id === id);
  if (index !== -1) {
    arrObj.splice(index, 1);
  }

  return arrObj.length;
}

export {
  createEl,
  // createSvgEl,
  createSvgUse,
  removeAllChild,
  shuffleArray,
  // getRandomInteger,
  getRandomIntegerArr,
  toUpperFirstLetter,
  getCategoryFromString,
  createCounter,
  removeById,
};
