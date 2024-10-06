
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

// получаю ширину и высоту canvas
let canvasWidth = canvas.clientWidth;
let canvasHeight = canvas.clientHeight

/************************************* */

let stepX = 31;
let stepY = 31;
const step = 31 // пока рисую квадраты, потенциально буду менять размер при адаптации

let imgSizeX = stepX-2 // надо уменьшить картинку, чтобы очистка не цепляла линии разметки
let imgSizeY = stepY-2 // надо уменьшить картинку, чтобы очистка не цепляла линии разметки


/************************************* */

let snake = []
snake[0] = {
  x: evenOddCenter(canvasWidth, stepX) + 1,
  y: evenOddCenter(canvasHeight, stepY) + 1
}

// функция для обновления snake в других модулях
function updateSnake(newSnake) {
  snake = newSnake;
}

/************************************* */
// Запоминаю центр и центральные ячейки

let centerX = snake[0].x
let centerY = snake[0].y

let centerXbox = Math.floor(centerX / stepX)
let centerYbox = Math.floor(centerY / stepY)

let lineBox = {
  upX: lineEvent(canvasWidth, stepX)*stepX + stepX/2,
  downX: canvasWidth - (lineEvent(canvasWidth, stepX)*stepX) - stepX/2,
  centerY: evenOddCenter(canvasHeight, stepY) + stepY/2
}

/************************************* */

function lineEvent (canvasHeight, stepY) {
  let result
  return result = Math.round(canvasHeight / 4/stepY)
}

/************************************* */
// функция для поиска координат центральной ячейки

function evenOddCenter (canvasWidth, stepX) {
  let result = (canvasWidth/stepX)
  if (result % 2 !== 0) {return Math.floor((canvasWidth - stepX) / 2)}
  else {return (Math.floor(canvasWidth/2) - stepX)}
}

/************************************* */

export { canvas, ctx, canvasWidth, canvasHeight, lineBox, stepX, stepY, imgSizeX, imgSizeY, snake, updateSnake, centerXbox, centerYbox, evenOddCenter }