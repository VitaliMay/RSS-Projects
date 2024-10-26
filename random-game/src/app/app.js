
import { signatureScore } from "./score.js";
import { varDOM } from "./data/variablesDOM.js";
import { body, canvas, ctx, canvasObj, step, snake, snakeImg, drawRoundedRectangle, updateSnake, food, foodImg, foodSrc, lineBox, evenOddCenter, center, startVar } from "./data/variables.js";
import { drawTriangle, startField } from "./components/fielDraw.js";
import { isDifferenceInRange, isPointInTriangle } from "./utils/elementUtils.js";
import { MemoryStore } from "./utils/storageUtils.js";
import './eventHandlers/contextmenuHandler.js' // слушатель
import { musicBase, musicFood, musicTail, musicBorder, musicStop } from "./eventHandlers/musicHandler.js";
import './eventHandlers/musicHandler.js'  // слушатель
import { adaptCanv } from "./utils/adaptationUtils.js";
import { directionData, optionsTriangle } from "./data/moveData.js";

signatureScore ()

/********************************************* */

const { start, gameScoreHtml, immunityScoreHtml, speedScoreHtml, btnRules, btnSetting, btnStop, testInput, fon, modalLogin, modalSetting, modalRules, fonSetting, modalBtnCross, modalBtnCrossSetting } = varDOM;

let startPicture = null
let gameSpeedInput = 450 - testInput.value

/********************************************* */

fon.addEventListener('click', closeMenu);

function closeMenu() {
  body.classList.remove('lock');
  fon.classList.remove('work');
  modalLogin.classList.remove('modal-login--active')
  startNew()
}

function testOpenModal() {
  modalLogin.classList.add('modal-login--active')
  body.classList.add('lock');
  fon.classList.add('work');
}

modalBtnCross.forEach(function(item) {
  item.addEventListener('click',function() {
    const { flagCup } = startVar;
    if (!flagCup) {
      startNew()
    }
    fon.classList.remove('work');
    closeMenuSetting()
  })
})

modalBtnCrossSetting.forEach(function(item) {
  item.addEventListener('click',function() {
    closeMenuSetting()
  })
})


btnSetting.addEventListener('click', function () {
  startVar.direction = 'stop'
  testOpenModalSetting()
})


btnRules.addEventListener('click', function () {
  startVar.direction = 'stop'
  openModalRules()
})

fonSetting.addEventListener('click', closeMenuSetting);

function closeMenuSetting() {
  body.classList.remove('lock');
  fonSetting.classList.remove('work');

  modalSetting.classList.remove('modal-setting--active')
  modalRules.classList.remove('modal-rules--active')

  modalLogin.classList.remove('modal-login--active')
  startVar.flagCup = false
}

function testOpenModalSetting() {
  modalSetting.classList.add('modal-setting--active')
  body.classList.add('lock');
  fonSetting.classList.add('work');
}

function openModalRules() {
  modalRules.classList.add('modal-rules--active')
  body.classList.add('lock');
  fonSetting.classList.add('work');
}

const modalScoreNumber = Array.from(document.querySelectorAll('.modal-score-line__number'))
const modalScoreResult = Array.from(document.querySelectorAll('.modal-score-line__results'))
const modalMaxCurrentSpeed = document.querySelector('.maxCurrentSpeed')

const modalTotalScore = document.querySelector('.totalScore')


/*********************************************** */
/***        старт игры */
adaptCanv()
startNew()

start.addEventListener('click', function () {
  closeMenuSetting()
  startNew()
})

function startNew() {

  startVar.direction = null
  startVar.prevDirection = null

  const stepX = step.stepX
  const stepY = step.stepY
  const canvasWidth = canvasObj.canvasWidth
  const canvasHeight = canvasObj.canvasHeight

  startVar.gameScore = 0
  gameScoreHtml.textContent = `Score`

  startVar.immunityScore = 0
  immunityScoreHtml.textContent = `0`

  startVar.gameSpeed = 390
  // gameSpeed = 390
  if (testInput.value > 390) testInput.value = 390;
  if (testInput.value < 60) testInput.value = 60;
  gameSpeedInput = 450 - testInput.value

  speedScoreHtml.textContent = `${60} / ${450 - gameSpeedInput}`

  musicBase.playbackRate = 0.8; // восстанавливаю скорость
  musicBase.currentTime = 0; // начинаю воспроизведение с начала
  musicBase.pause()

  food.x = Math.floor((Math.random()*canvasWidth/stepX))*stepX + 1, // 15 (+1 нужен чтобы не цеплять линию разметки)
  food.y =  Math.floor((Math.random()*canvasHeight/stepY))*stepY + 1 // 11

  snake.length = 0
  snake[0] = {
    x: evenOddCenter(canvasWidth, stepX) + 1,
    y: evenOddCenter(canvasHeight, stepY) + 1
  }

  clearInterval(startPicture);
  startPicture = setInterval(drawPicture, startVar.gameSpeed) 
}

/******************************************************************* */
//  Для адаптации

window.addEventListener('resize', () => {
  adaptCanv()
  startNew()
  startField()
})

/******* Создаю объект для работы с Local Storage ***************************** */

const memoryLocalTest = new MemoryStore()

/*********************************************** */
// Функция очистки поля

function clearField() {
  ctx.clearRect(0, 0, canvasObj.canvasWidth, canvasObj.canvasHeight); 
  ctx.closePath()
}

/**************************************************************** */

function drawPicture() {
  const stepX = step.stepX
  const stepY = step.stepY
  const canvasWidth = canvasObj.canvasWidth
  const canvasHeight = canvasObj.canvasHeight

  const { direction } = startVar;

  clearField()
  startField()
  ctx.drawImage(foodImg, food.x, food.y, step.imgSizeX, step.imgSizeY);

  for (let i = 0; i < snake.length; i += 1) {
    if (i === 0 ) {ctx.drawImage(snakeImg, (snake[0].x), (snake[0].y), step.imgSizeX, step.imgSizeY); }
    else {drawRoundedRectangle(ctx, snake[i].x, snake[i].y, step.imgSizeX, step.imgSizeY, 7, '#597059');}
  }

  let snakeHeadX = snake[0].x
  let snakeHeadY = snake[0].y

  if (direction === 'up') {
    snakeHeadY = (snakeHeadY - stepY + canvasHeight) % canvasHeight;
    musicBase.play()
    gameScoreHtml.textContent = `${startVar.gameScore}`
  }

  if (direction === 'right') {
    snakeHeadX = (snakeHeadX + stepX) % canvasWidth;
    musicBase.play()
    gameScoreHtml.textContent = `${startVar.gameScore}`
  }

  if (direction === 'down') {
    snakeHeadY = (snakeHeadY + stepY) % canvasHeight;
    musicBase.play()
    gameScoreHtml.textContent = `${startVar.gameScore}`
  }

  if (direction === 'left') { 
    snakeHeadX = (snakeHeadX - stepX + canvasWidth) % canvasWidth;
    musicBase.play()
    gameScoreHtml.textContent = `${startVar.gameScore}`
  }

  if (direction === 'stop') {
    snakeHeadX = snakeHeadX 
    snakeHeadY = snakeHeadY
    musicBase.pause()
    gameScoreHtml.textContent = `STOP`
  };

  if (checkBorder(snakeHeadX, snakeHeadY)) { // проверка что змейка побывала за пределами поля
    musicBorder.play()
    startVar.immunityScore = startVar.immunityScore - 2
    immunityScoreHtml.textContent = `${startVar.immunityScore}`
    gameScoreHtml.textContent = `${startVar.gameScore}`
  }

  if (isDifferenceInRange(snakeHeadX, food.x) && isDifferenceInRange(snakeHeadY, food.y)) {
    musicFood.play()
    startVar.gameScore = startVar.gameScore + 1
    gameScoreHtml.textContent = `${startVar.gameScore}`
    startVar.immunityScore = startVar.immunityScore + 1
    foodImg.src = foodSrc()

    if (startVar.gameSpeed > gameSpeedInput) {
      clearInterval(startPicture);
      startVar.gameSpeed = startVar.gameSpeed - 30;
      startPicture = setInterval(drawPicture, startVar.gameSpeed);
      musicBase.playbackRate = musicBase.playbackRate + 0.05; // ускоряю музыку
    }

    food.x = Math.floor((Math.random()*canvasWidth/stepX))*stepX + 1, 
    food.y = Math.floor((Math.random()*canvasHeight/stepY))*stepY + 1 

    immunityScoreHtml.textContent = `${startVar.immunityScore}`
    speedScoreHtml.textContent = `${450 - startVar.gameSpeed} / ${450 - gameSpeedInput}`
  }
  else {
    snake.pop()
  }

  let snakeHead = {
    x: snakeHeadX,
    y: snakeHeadY
  }

  snake.unshift(snakeHead)

  if (checkTail(snake, snakeHead)) {
    musicTail.play()
    startVar.immunityScore = startVar.immunityScore - 6
    immunityScoreHtml.textContent = `${startVar.immunityScore}`
  }

  if (startVar.immunityScore < 0) {
    musicBase.pause()
    clearInterval(startPicture);
    musicStop.play()
    closeMenuSetting()
    memoryLocalTest.putScore(450-gameSpeedInput, startVar.gameScore)
    modalNoCup.forEach( item => item.classList.remove('modal-title--noCup-active'))
    modalScoreLocal(gameSpeedInput)
    testOpenModal()
  }
}

/************************************************* */

const btnCup = document.querySelector('.btn_Cup')
const modalNoCup = document.querySelectorAll('.modal-title--noCup')

btnCup.addEventListener('click', () => {
  startVar.flagCup = true;
  modalNoCup.forEach( item => item.classList.add('modal-title--noCup-active'))

  modalLogin.classList.add('modal-login--active')
  body.classList.add('lock');
  fonSetting.classList.add('work');
  startVar.direction = 'stop'
  modalScoreLocal(gameSpeedInput)
})

/*********************************************** */
/*********************************************** */

function modalScoreLocal(gameSpeedInput) {
  let gameKeySpeedInput = 450-gameSpeedInput
  let modalScoreText = memoryLocalTest.getScore()
  let modalScoreTextArr = modalScoreText[gameKeySpeedInput]

  modalMaxCurrentSpeed.textContent = gameKeySpeedInput
  modalTotalScore.textContent = `${startVar.gameScore}`

  // сначала нужно очистить предыдущую модалку
  for (let i = 0; i < modalScoreNumber.length; i += 1) {
    modalScoreNumber[i].textContent = `${(i + 1).toString().padStart(2, '0')}`
    modalScoreResult[i].textContent = ``
  }

  if (modalScoreTextArr) {
    for (let i = 0; i < modalScoreTextArr.length; i++) {
      modalScoreNumber[i].textContent = `${(i+1).toString().padStart(2, '0')} Место`
      modalScoreResult[i].textContent = `набрано очков ${modalScoreTextArr[i]}`
    }
  }
}

/*********************************************** */
/*********************************************** */

function checkBorder(snakeHeadX, snakeHeadY) {
  const stepX = step.stepX
  const stepY = step.stepY

  if (Math.abs(snake[0].y - snakeHeadY) > stepY || Math.abs(snake[0].x - snakeHeadX) > stepX) {
    return true; // Змейка побывала за пределами поля
  }

  return false; // Змейка в пределах поля
}

/*********************************************** */
/*********************************************** */

function checkTail(snakeArr, snakeHead) {
  const { direction } = startVar;
  return snakeArr.slice(1).some(item => item.x === snakeHead.x && item.y === snakeHead.y && direction !== 'stop')
}

// function checkTail(snakeArr, snakeHead) {
//   for (let i = 1; i < snakeArr.length; i++) {
//     if(snakeHead.x === snakeArr[i].x && snakeHead.y === snakeArr[i].y && direction !== 'stop') {
//       return true
//     }
//   }
//   return false
// }

/**************************************************** */
/**************************************************** */

btnStop.addEventListener("click", stopSnake);

function stopSnake() {
  if (startVar.direction === 'stop' && startVar.prevDirection == undefined) {
    startVar.direction = null

    gameScoreHtml.textContent = `${startVar.gameScore}`
  }
  else if (startVar.direction === 'stop') { 
    startVar.direction = startVar.prevDirection
  }
  else {
    startVar.direction = 'stop';
  }
}

/**************************************** */

document.addEventListener("keydown", moveSnake)

canvas.addEventListener("click", moveSnake)

canvas.addEventListener("touchstart", moveSnake, { passive: true });


function moveSnake(event) {

  if (startVar.changeDirection) return;
  startVar.changeDirection = true;

  const { codeDirObj, oppositeDir } = directionData

  if (event.code in codeDirObj) {
    // верну когда сделаю валидацию инпут
    // if (!modalSetting.classList.contains('modal-setting--active')) {
    //   event.preventDefault()
    // }
    event.preventDefault()
  }

  for (const key in oppositeDir) {
    if (codeDirObj[event.code] === key || (isPointInTriangle(optionsTriangle(canvasObj)[key], event.offsetX, event.offsetY)))  {
      if (startVar.direction === 'stop') {
        startVar.direction = 'stop'
      } else if ( startVar.prevDirection !== oppositeDir[key]){
        startVar.direction = key;
        startVar.prevDirection = startVar.direction
      }
    }
  }

  if (codeDirObj[event.code] === 'stop') {
    if (startVar.direction === 'stop' && startVar.prevDirection == undefined) {
      startVar.direction = null

      gameScoreHtml.textContent = `${startVar.gameScore}`
    }
    else if (startVar.direction === 'stop') { // ловлю нажатие в самом начале игры
      startVar.direction = startVar.prevDirection
    }
    else {
      startVar.direction = 'stop';
    }
  }

  if (startVar.immunityScore < 0) {
    startVar.direction = null;
    startVar.prevDirection = null;
  }

  startVar.changeDirection = false;
}


/************************************************* */
/* Убираю возможность нажать на цифры */

document.addEventListener("keydown", numPreventDefolt)

let arrNumPreventDefolt = [
  'Digit1', 'Numpad1',
  'Digit3', 'Numpad3',
  'Digit5', 'Numpad5',
  'Digit7', 'Numpad7',
  'Digit9', 'Numpad9',
  'Digit0', 'Numpad0',
]

/********   Доработать валидацию инпута чтобы учитывал шаг 30 ************* */
function numPreventDefolt(event) {
  // if (!modalSetting.classList.contains('modal-setting--active')) {
  //   if (arrNumPreventDefolt.indexOf(event.code) >= 0) event.preventDefault()
  // }
  if (arrNumPreventDefolt.indexOf(event.code) >= 0) event.preventDefault()
}


