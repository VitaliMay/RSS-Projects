
import { canvas, canvasObj, step, center, evenOddCenter } from "../data/variables.js";

function adaptCanv () {
  // let screenWidth = screen.availWidth
  // let screenHeight = screen.availHeight

  let screenWidth = screen.width
  let screenHeight = screen.height

    if (screenWidth < 700){
      step.stepX = 26
      step.stepY = 26
      // imgSizeX = step.stepX-2 // надо уменьшить картинку, чтобы очистка не цепляла линии разметки
      // imgSizeY = step.stepY-2 

      let windowHeight = screenHeight;
      let headerHeight = document.querySelector('.header').clientHeight

      canvasObj.canvasWidth = step.stepX * Math.round(screenWidth*0.9 / step.stepX)
      canvasObj.canvasHeight = step.stepY * Math.round((windowHeight - headerHeight)*0.8 / step.stepY)
    
      center.centerX = evenOddCenter(canvasObj.canvasWidth, step.stepX) + 1
      center.centerY = evenOddCenter(canvasObj.canvasHeight, step.stepY) + 1
    }
    else if (screenWidth < 880) {
      canvasObj.canvasWidth = step.stepX * Math.round(screenWidth*0.9 / step.stepX)
      canvasObj.canvasHeight = step.stepY * Math.round(screenHeight*0.7 / step.stepY)

      center.centerX = evenOddCenter(canvasObj.canvasWidth, step.stepX) + 1
      center.centerY = evenOddCenter(canvasObj.canvasHeight, step.stepY) + 1

    }
    else {
      canvasObj.canvasWidth = step.stepX * Math.round(canvasObj.canvasWidth / step.stepX)

      center.centerX = evenOddCenter(canvasObj.canvasWidth, step.stepX) + 1
      center.centerY = evenOddCenter(canvasObj.canvasHeight, step.stepY) + 1
    }

    canvas.width = canvasObj.canvasWidth
    canvasObj.canvasHeight = step.stepY * Math.round(canvasObj.canvasHeight / step.stepY)
    canvas.height = canvasObj.canvasHeight

}


export { adaptCanv }
