
const body = document.querySelector('body');


/************************************ */

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

/************************************ */
// получаю ширину и высоту canvas

const canvasObj = {
  canvasWidth: canvas.clientWidth,
  canvasHeight: canvas.clientHeight,
}

/************************************* */

const step = {
  stepX: 31,
  stepY: 31,
  get imgSizeX() {
    return this.stepX - 2;
  },
  get imgSizeY() {
    return this.stepY - 2;
  },
  set imgSizeX(value) {
    this.stepX = value;
  },
  set imgSizeY(value) {
    this.stepY = value;
  },

}

let imgSizeX = step.stepX-2 // надо уменьшить картинку, чтобы очистка не цепляла линии разметки
let imgSizeY = step.stepY-2 // надо уменьшить картинку, чтобы очистка не цепляла линии разметки

/************************************* */
/****  start var       */

const startVar = {
  direction: null,
  prevDirection: null,
  changeDirection: false,
  startPicture: null,
  flagCup: false,
  gameScore: 0,
  immunityScore: 0,
  gameSpeed: 390,
  gameSpeedInput: 0,

}


/************************************* */
/****  snake       */

const snakeImg = new Image();
snakeImg.src = './src/assets/img/snakeHead-01-48.png'

let snake = []
snake[0] = {
  x: evenOddCenter(canvasObj.canvasWidth, step.stepX) + 1,
  y: evenOddCenter(canvasObj.canvasHeight, step.stepY) + 1
}

// функция для обновления snake в других модулях
function updateSnake(newSnake) {
  snake = newSnake;
}

// Прямоугольник с закругленными углами

function drawRoundedRectangle(ctx, x, y, width, height, borderRadius, color) {
  ctx.beginPath();
  ctx.moveTo(x + borderRadius, y);
  ctx.lineTo(x + width - borderRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius);
  ctx.lineTo(x + width, y + height - borderRadius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - borderRadius, y + height);
  ctx.lineTo(x + borderRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
  ctx.lineTo(x, y + borderRadius);
  ctx.quadraticCurveTo(x, y, x + borderRadius, y);
  ctx.fillStyle = color;
  ctx.fill();
}

/************************************* */
/****  food       */

const foodArrImg = [
  './src/assets/img/fly-02-48.png',
  './src/assets/img/fly-01-48.png',
  './src/assets/img/bird-48.png',
  './src/assets/img/frog-48.png'
]

const foodImg = new Image();
// let foodIndex = Math.floor(foodArrImg.length * Math.random())
// foodImg.src = foodArrImg[foodIndex]
foodImg.src = foodSrc()

const food = {
  x: Math.floor((Math.random()*canvasObj.canvasWidth/step.stepX))*step.stepX + 1, // 15 (+1 нужен чтобы не цеплять линию разметки)
  y: Math.floor((Math.random()*canvasObj.canvasHeight/step.stepY))*step.stepY + 1 // 11
}

function foodSrc () {
  const foodIndex = Math.floor(foodArrImg.length * Math.random())
  const src = foodArrImg[foodIndex]
  return src
}

/************************************* */
// Запоминаю центр и центральные ячейки

const center = {
  centerX: evenOddCenter(canvasObj.canvasWidth, step.stepX) + 1,
  centerY: evenOddCenter(canvasObj.canvasHeight, step.stepY) + 1,

  get centerXbox() {
    return Math.floor(this.centerX / step.stepX)
  },
  get centerYbox() {
    return Math.floor(this.centerY / step.stepY)
  },

}

let lineBox = {
  upX: lineEvent(canvasObj.canvasWidth, step.stepX)*step.stepX + step.stepX/2,
  downX: canvasObj.canvasWidth - (lineEvent(canvasObj.canvasWidth, step.stepX)*step.stepX) - step.stepX/2,
  centerY: evenOddCenter(canvasObj.canvasHeight, step.stepY) + step.stepY/2
}

/*********************************************************** */

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

export { body, canvas, ctx, canvasObj, lineBox, step, imgSizeX, imgSizeY, snake, snakeImg, drawRoundedRectangle, updateSnake, food, foodImg, foodSrc, evenOddCenter, center, startVar }
