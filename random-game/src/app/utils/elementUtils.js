
function createEl (options) {
  const { tag = 'div', text = '', classes = [], attributes = {}, styles = {}, parent = null,} = options;

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

  return element
}

/*************************************************** */
// Параметры для создания элементов

// const optionsLink = {
//   tag: 'a',
//   classes: ['cover'],
//   attributes: {
//     'target': '_blank',
//   }
// };

// const optionsLinkInnerRatio = {
//   classes: ['cover-inner', 'cover-inner--ratio'],
// };

// const optionsLinkContent = {
//   classes: ['cover-content'],
// }

/********************************************************* */
// Удаления у элемента всех дочерних

function removeAllChild(element) {
  while (element.firstElementChild) {
      element.removeChild(element.firstElementChild)
  }
}

/*********************************************************************** */

/* После выхода змейки за границы поля иногда происходит сбой координат в 1px     */
/* и змейка не видит еду */
/* пробую решить задав право на ошибку координат в 2px     */

function isDifferenceInRange(value1, value2) {
  return Math.abs(value1 - value2) <= 2;
}


/*********************************************************************** */

// Функция для определения положения точки (клик и тача) относительно треугольника

function isPointInTriangle(options, x, y) {
  const {x1, y1, x2, y2, x3, y3} = options;

  let halfS = 0.5 * (-y2 * x3 + y1 * (-x2 + x3) + x1 * (y2 - y3) + x2 * y3);
  let signS = halfS < 0 ? -1 : 1;

  let s = signS * (y1 * x3 - x1 * y3 + (y3 - y1) * x + (x1 - x3) * y) / (2 * halfS);
  let t = signS * (x1 * y2 - y1 * x2 + (y1 - y2) * x + (x2 - x1) * y) / (2 * halfS);

  return s > 0 && t > 0 && 1 - s - t > 0;
}


export { isDifferenceInRange, isPointInTriangle }