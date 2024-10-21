
import { canvasObj } from "./variables.js";

const directionData = {

  codeDirObj: {
    'ArrowUp': 'up',
    'Numpad8': 'up',
    'Digit8': 'up',
    'KeyW': 'up',
    'ArrowRight': 'right',
    'Numpad6': 'right',
    'Digit6': 'right',
    'KeyD': 'right',
    'ArrowDown': 'down',
    'Numpad2': 'down',
    'Digit2': 'down',
    'KeyS': 'down',
    'ArrowLeft': 'left',
    'Numpad4': 'left',
    'Digit4': 'left',
    'KeyA': 'left',
    'Space': 'stop',
  },

  oppositeDir: {
    'up': 'down',
    'right': 'left',
    'down': 'up',
    'left': 'right',
  },
}


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


export { directionData, optionsTriangle }
