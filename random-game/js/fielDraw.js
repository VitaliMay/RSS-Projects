
import { ctx, canvasWidth, canvasHeight, lineBox, stepX, stepY, centerXbox, centerYbox } from "./variables.js";

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
  ctx.beginPath()
  ctx.strokeStyle = 'white'

  for (let i = 0; i <= canvasWidth; i = i + stepX) {
    ctx.moveTo(i, 0)
    ctx.lineTo(i, canvasHeight)

    // Проверяем, является ли текущий ряд центральным рядом по вертикали
    if (i === lineBox.upX - stepX/2 || i === lineBox.downX - stepX/2) {
      ctx.fillStyle = '#ddc8ac'
      ctx.fillRect(i, 0, stepX, canvasHeight)
    }

  }
  for (let i = 0; i <= canvasHeight; i = i + stepY) {
    ctx.moveTo(0, i)
    ctx.lineTo(canvasWidth, i)

    if (i === centerYbox * stepX) {
      ctx.fillStyle = '#ddc8ac'
      ctx.fillRect(lineBox.upX - stepX/2, i, lineBox.downX - lineBox.upX + stepX, stepY )
    }
  }

  ctx.stroke()
  ctx.closePath()


  drawTriangle(canvasWidth - stepX, centerYbox * stepY + stepY / 2, canvasWidth - stepX*3, centerYbox * stepY - stepY / 2, canvasWidth - stepX*3, centerYbox * stepY + 1.5*stepY, 'brown')
  drawTriangle(stepX, centerYbox * stepY + stepY / 2, stepX*3, centerYbox * stepY - stepY / 2, stepX*3, centerYbox * stepY + 1.5*stepY, 'brown')
  drawTriangle(centerXbox * stepX + stepX / 2, canvasHeight - stepY, centerXbox * stepX - stepX / 2, canvasHeight - 3*stepY, centerXbox * stepX + 3*stepX/2, canvasHeight - 3*stepY, 'brown')
  drawTriangle(centerXbox * stepX + stepX / 2, stepY, centerXbox * stepX - stepX / 2, 3*stepY, centerXbox * stepX + 3*stepX/2, 3*stepY, 'brown')

}


export { drawTriangle, startField }