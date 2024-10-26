
import { ctx, canvasObj, lineBox, step, center } from "../data/variables.js";

/***** Треугольники на поле */

function drawTriangle(x1, y1, x2, y2, x3, y3, borderColor = null, borderWidth = 1) {
  ctx.beginPath();
  // ctx.fillStyle = 'red'; // Цвет заливки треугольника
  ctx.fillStyle = '#ddc8ac'
  if (borderColor !== null) {
    ctx.strokeStyle = borderColor; // Цвет границы треугольника
    ctx.lineWidth = borderWidth; // Толщина линии для границы
  }

  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();

  ctx.fill(); // Заливка треугольника
  if (borderColor !== null) {
    ctx.stroke(); // Отрисовка границы треугольника
  }
}

/***** Функция для рисования нового поля */


function startField() {

  const stepX = step.stepX
  const stepY = step.stepY
  const canvasWidth = canvasObj.canvasWidth
  const canvasHeight = canvasObj.canvasHeight

  ctx.beginPath()
  ctx.strokeStyle = 'white'

  for (let i = 0; i <= canvasWidth; i = i + stepX) {
    ctx.moveTo(i, 0)
    ctx.lineTo(i, canvasHeight)
  }
  for (let i = 0; i <= canvasHeight; i = i + stepY) {
    ctx.moveTo(0, i)
    ctx.lineTo(canvasWidth, i)
  }

  ctx.stroke()
  ctx.closePath()

  // верх
  drawTriangle(center.centerXbox * stepX + stepX / 2, stepY, center.centerXbox * stepX - stepX / 2, 3*stepY, center.centerXbox * stepX + 3*stepX/2, 3*stepY, 'brown')
  // право
  drawTriangle(canvasWidth - stepX, center.centerYbox * stepY + stepY / 2, canvasWidth - stepX*3, center.centerYbox * stepY - stepY / 2, canvasWidth - stepX*3, center.centerYbox * stepY + 1.5*stepY, 'brown')
  // низ
  drawTriangle(center.centerXbox * stepX + stepX / 2, canvasHeight - stepY, center.centerXbox * stepX - stepX / 2, canvasHeight - 3*stepY, center.centerXbox * stepX + 3*stepX/2, canvasHeight - 3*stepY, 'brown')
  // лево
  drawTriangle(stepX, center.centerYbox * stepY + stepY / 2, stepX*3, center.centerYbox * stepY - stepY / 2, stepX*3, center.centerYbox * stepY + 1.5*stepY, 'brown')

  drawDiagonal(canvasWidth, canvasHeight)

}

/***** Рисую диагонали (для замены разметки click и touch) */

function drawDiagonal (canvasWidth, canvasHeight) {
  ctx.beginPath();
  ctx.strokeStyle = 'white';
  // ctx.strokeStyle = 'green';
  // ctx.strokeStyle = 'brown';
  ctx.moveTo(0, 0);
  ctx.lineTo(canvasWidth, canvasHeight);
  ctx.moveTo(canvasWidth, 0);
  ctx.lineTo(0, canvasHeight);
  ctx.stroke();
  ctx.closePath();
}

export { drawTriangle, startField }