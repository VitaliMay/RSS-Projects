
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

/************************************ */
// получаю ширину и высоту canvas
// let canvasWidth = canvas.clientWidth;
// let canvasHeight = canvas.clientHeight

const canvasObj = {
  canvasWidth: canvas.clientWidth,
  canvasHeight: canvas.clientHeight,
}

/************************************* */

// let stepX = 31;
// let stepY = 31;

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
// let imgSizeX = stepX-2 // надо уменьшить картинку, чтобы очистка не цепляла линии разметки
// let imgSizeY = stepY-2 // надо уменьшить картинку, чтобы очистка не цепляла линии разметки


/************************************* */

let snake = []
snake[0] = {
  x: evenOddCenter(canvasObj.canvasWidth, step.stepX) + 1,
  y: evenOddCenter(canvasObj.canvasHeight, step.stepY) + 1
  // x: evenOddCenter(canvasWidth, stepX) + 1,
  // y: evenOddCenter(canvasHeight, stepY) + 1
}

// функция для обновления snake в других модулях
function updateSnake(newSnake) {
  snake = newSnake;
}
function updateVariable(variable, value) {
  variable = value;
}

/************************************* */
// Запоминаю центр и центральные ячейки

// let centerX = snake[0].x
// let centerY = snake[0].y

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

// let centerXbox = Math.floor(center.centerX / step.stepX)
// let centerYbox = Math.floor(center.centerY / step.stepY)
// let centerXbox = Math.floor(centerX / step.stepX)
// let centerYbox = Math.floor(centerY / step.stepY)
// let centerXbox = Math.floor(centerX / stepX)
// let centerYbox = Math.floor(centerY / stepY)

let lineBox = {
  upX: lineEvent(canvasObj.canvasWidth, step.stepX)*step.stepX + step.stepX/2,
  downX: canvasObj.canvasWidth - (lineEvent(canvasObj.canvasWidth, step.stepX)*step.stepX) - step.stepX/2,
  centerY: evenOddCenter(canvasObj.canvasHeight, step.stepY) + step.stepY/2
  // upX: lineEvent(canvasWidth, stepX)*stepX + stepX/2,
  // downX: canvasWidth - (lineEvent(canvasWidth, stepX)*stepX) - stepX/2,
  // centerY: evenOddCenter(canvasHeight, stepY) + stepY/2
}

/************************************************** */
/***  Координаты полей (треугольников) для клика и тача */

// const optionsUpTriangle = {
//   x1: canvasObj.canvasWidth / 2, // x координата центра
//   y1: canvasObj.canvasHeight / 2, // y координата центра
//   x2: 0,
//   y2: 0,
//   x3: canvasObj.canvasWidth,
//   y3: 0,
// }

// const optionsRightTriangle = {
//   x1: canvasObj.canvasWidth / 2, // x координата центра
//   y1: canvasObj.canvasHeight / 2, // y координата центра
//   x2: canvasObj.canvasWidth,
//   y2: 0,
//   x3: canvasObj.canvasWidth,
//   y3: canvasObj.canvasHeight,
// }

// const optionsDownTriangle = {
//   x1: canvasObj.canvasWidth / 2, // x координата центра
//   y1: canvasObj.canvasHeight / 2, // y координата центра
//   x2: canvasObj.canvasWidth,
//   y2: canvasObj.canvasHeight,
//   x3: 0,
//   y3: canvasObj.canvasHeight,
// }

// const optionsLeftTriangle = {
//   x1: canvasObj.canvasWidth / 2, // x координата центра
//   y1: canvasObj.canvasHeight / 2, // y координата центра
//   x2: 0,
//   y2: canvasObj.canvasHeight,
//   x3: 0,
//   y3: 0,
// }


/*********************************************************** */
/**    Обновляю  координаты полей (треугольников) после изменения размера convas и => canvasObj*/

function optionsTriangle(canvasObj) {
  const optionsUpTriangle = {
    x1: canvasObj.canvasWidth / 2, // x координата центра
    y1: canvasObj.canvasHeight / 2, // y координата центра
    x2: 0,
    y2: 0,
    x3: canvasObj.canvasWidth,
    y3: 0,
  }
  
  const optionsRightTriangle = {
    x1: canvasObj.canvasWidth / 2, // x координата центра
    y1: canvasObj.canvasHeight / 2, // y координата центра
    x2: canvasObj.canvasWidth,
    y2: 0,
    x3: canvasObj.canvasWidth,
    y3: canvasObj.canvasHeight,
  }
  
  const optionsDownTriangle = {
    x1: canvasObj.canvasWidth / 2, // x координата центра
    y1: canvasObj.canvasHeight / 2, // y координата центра
    x2: canvasObj.canvasWidth,
    y2: canvasObj.canvasHeight,
    x3: 0,
    y3: canvasObj.canvasHeight,
  }
  
  const optionsLeftTriangle = {
    x1: canvasObj.canvasWidth / 2, // x координата центра
    y1: canvasObj.canvasHeight / 2, // y координата центра
    x2: 0,
    y2: canvasObj.canvasHeight,
    x3: 0,
    y3: 0,
  }

  const optionsTriangle = {
    up: optionsUpTriangle,
    right: optionsRightTriangle,
    down: optionsDownTriangle,
    left: optionsLeftTriangle,
  }
  return optionsTriangle;
}

/*********************************************************** */




/************************************************** */

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

export { canvas, ctx, canvasObj, lineBox, step, imgSizeX, imgSizeY, snake, updateSnake, evenOddCenter, center, optionsTriangle }
// export { canvas, ctx, canvasObj, lineBox, step, imgSizeX, imgSizeY, snake, updateSnake, evenOddCenter, center, optionsUpTriangle, optionsRightTriangle, optionsDownTriangle, optionsLeftTriangle, optionsTriangle }
// export { canvas, ctx, canvasObj, lineBox, step, imgSizeX, imgSizeY, snake, updateSnake, centerXbox, centerYbox, evenOddCenter, center }
// export { canvas, ctx, canvasWidth, canvasHeight, lineBox, step, imgSizeX, imgSizeY, snake, updateSnake, centerXbox, centerYbox, evenOddCenter }
// export { canvas, ctx, canvasWidth, canvasHeight, lineBox, step, stepX, stepY, imgSizeX, imgSizeY, snake, updateSnake, centerXbox, centerYbox, evenOddCenter }