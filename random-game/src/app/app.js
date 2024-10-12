
import { signatureScore } from "./score.js";
import { body, canvas, ctx, canvasObj, step, snake, snakeImg, drawRoundedRectangle, updateSnake, food, foodImg, foodSrc, lineBox, evenOddCenter, center } from "./data/variables.js";
// import { body, canvas, ctx, canvasObj, step, snake, snakeImg, drawRoundedRectangle, updateSnake, food, foodImg, foodSrc, lineBox, evenOddCenter, center, optionsTriangle } from "./data/variables.js";
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

const start = document.querySelector('.color-test')

const gameScoreHtml = document.querySelector('.title')
const immunityScoreHtml = document.querySelector('.stat__score--immunity')
const speedScoreHtml = document.querySelector('.stat__score--speed')

// const btnSound = document.querySelector('.btn_Sound')
const btnRules = document.querySelector('.btn_Rules')
const btnSetting = document.querySelector('.btn_Setting')
const btnStop = document.querySelector('.btn_Stop')

const testInput = document.querySelector('.testInput')


/**************************************************** */
// const body = document.querySelector('body');
const fon = document.querySelector('.fon');
const modalLogin = document.querySelector('.modal-login')

/**************************************************** */

let direction = null;
let prevDirection = null;
let changeDirection = false;

/****************************************************************** */
/******Для отображения картинки ************* */

let startPicture = null 

/****************************************************************** */

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

// ловлю все крестики в модалках
const modalBtnCross = [...document.querySelectorAll('.modal-btn-cross')]

modalBtnCross.forEach(function(item) {
  item.addEventListener('click',function() {
    if (!flagCup) {
      startNew()
    }
    fon.classList.remove('work');
    closeMenuSetting()
  })
})

let flagCup = false;


// у настроек не должна запускаться новая игра
const modalSetting = document.querySelector('.modal-setting')
const modalRules = document.querySelector('.modal-rules')

const fonSetting = document.querySelector('.fon--setting')

const modalBtnCrossSetting = [...document.querySelectorAll('.modal-btn-cross--setting')]

modalBtnCrossSetting.forEach(function(item) {
  item.addEventListener('click',function() {
    closeMenuSetting()
  })
})


btnSetting.addEventListener('click', function () {
  direction = 'stop'
  testOpenModalSetting()
})


btnRules.addEventListener('click', function () {
  direction = 'stop'
  openModalRules()
})

fonSetting.addEventListener('click', closeMenuSetting);

function closeMenuSetting() {
  body.classList.remove('lock');
  fonSetting.classList.remove('work');

  modalSetting.classList.remove('modal-setting--active')
  modalRules.classList.remove('modal-rules--active')

  modalLogin.classList.remove('modal-login--active')
  flagCup = false
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

let gameScore = 0
let immunityScore = 0
let gameSpeed = 390

let gameSpeedInput = 450 - testInput.value

adaptCanv()
startNew()

/******** Старт ******************************** */
/******** Старт ******************************** */

start.addEventListener('click', function () {
  closeMenuSetting()
  startNew()
})

function startNew() {

  direction = null
  prevDirection = null

  const stepX = step.stepX
  const stepY = step.stepY
  const canvasWidth = canvasObj.canvasWidth
  const canvasHeight = canvasObj.canvasHeight

  gameScore = 0
  gameScoreHtml.textContent = `Score`

  immunityScore = 0
  immunityScoreHtml.textContent = `0`

  gameSpeed = 390
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
  startPicture = setInterval(drawPicture, gameSpeed) 
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
    gameScoreHtml.textContent = `${gameScore}`
  }

  if (direction === 'right') {
    snakeHeadX = (snakeHeadX + stepX) % canvasWidth;
    musicBase.play()
    gameScoreHtml.textContent = `${gameScore}`
  }

  if (direction === 'down') {
    snakeHeadY = (snakeHeadY + stepY) % canvasHeight;
    musicBase.play()
    gameScoreHtml.textContent = `${gameScore}`
  }

  if (direction === 'left') { 
    snakeHeadX = (snakeHeadX - stepX + canvasWidth) % canvasWidth;
    musicBase.play()
    gameScoreHtml.textContent = `${gameScore}`
  }

  if (direction === 'stop') {
    snakeHeadX = snakeHeadX 
    snakeHeadY = snakeHeadY
    musicBase.pause()
    gameScoreHtml.textContent = `STOP`
  };

  if (checkBorder(snakeHeadX, snakeHeadY)) { // проверка что змейка побывала за пределами поля
    musicBorder.play()
    immunityScore = immunityScore - 2
    immunityScoreHtml.textContent = `${immunityScore}`
    gameScoreHtml.textContent = `${gameScore}`
  }

  if (isDifferenceInRange(snakeHeadX, food.x) && isDifferenceInRange(snakeHeadY, food.y)) {
    musicFood.play()
    gameScore = gameScore + 1
    gameScoreHtml.textContent = `${gameScore}`
    immunityScore = immunityScore + 1
    foodImg.src = foodSrc()

    if (gameSpeed > gameSpeedInput) {
      clearInterval(startPicture);
      gameSpeed = gameSpeed - 30;
      startPicture = setInterval(drawPicture, gameSpeed);
      musicBase.playbackRate = musicBase.playbackRate + 0.05; // ускоряю музыку
    }

    food.x = Math.floor((Math.random()*canvasWidth/stepX))*stepX + 1, 
    food.y = Math.floor((Math.random()*canvasHeight/stepY))*stepY + 1 

    immunityScoreHtml.textContent = `${immunityScore}`
    speedScoreHtml.textContent = `${450-gameSpeed} / ${450 - gameSpeedInput}`
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
    immunityScore = immunityScore - 6
    immunityScoreHtml.textContent = `${immunityScore}`
  }

  if (immunityScore < 0) {

    musicBase.pause()
    clearInterval(startPicture);
    musicStop.play()
    closeMenuSetting()
    memoryLocalTest.putScore(450-gameSpeedInput, gameScore)
    modalNoCup.forEach( item => item.classList.remove('modal-title--noCup-active'))
    modalScoreLocal(gameSpeedInput)
    testOpenModal()
  }
}

/************************************************* */

const btnCup = document.querySelector('.btn_Cup')
const modalNoCup = document.querySelectorAll('.modal-title--noCup')

btnCup.addEventListener('click', () => {
  flagCup = true;
  modalNoCup.forEach( item => item.classList.add('modal-title--noCup-active'))

  modalLogin.classList.add('modal-login--active')
  body.classList.add('lock');
  fonSetting.classList.add('work');
  direction = 'stop'
  modalScoreLocal(gameSpeedInput)
})

/*********************************************** */
/*********************************************** */

function modalScoreLocal(gameSpeedInput) {
  let gameKeySpeedInput = 450-gameSpeedInput
  let modalScoreText = memoryLocalTest.getScore()
  let modalScoreTextArr = modalScoreText[gameKeySpeedInput]
  // console.log(`Массив из локал ${modalScoreTextArr}`)

  modalMaxCurrentSpeed.textContent = gameKeySpeedInput
  modalTotalScore.textContent = `${gameScore}`

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
  if (direction === 'stop' && prevDirection == undefined) {
    direction = null

    gameScoreHtml.textContent = `${gameScore}`
    // console.log('Первый раз')
  }
  else if (direction === 'stop') { 
    direction = prevDirection
  }
  else {
    direction = 'stop';
  }
}

/**************************************** */

document.addEventListener("keydown", moveSnake)

canvas.addEventListener("click", moveSnake)

canvas.addEventListener("touchstart", moveSnake, { passive: true });


function moveSnake(event) {

  if (changeDirection) return;
  changeDirection = true;

  const { codeDirObj, oppositeDir } = directionData

  if (event.code in codeDirObj) {event.preventDefault()}

  for (const key in oppositeDir) {
    if (codeDirObj[event.code] === key || (isPointInTriangle(optionsTriangle(canvasObj)[key], event.offsetX, event.offsetY)))  {
      if (direction === 'stop') {
        direction = 'stop'
      } else if ( prevDirection !== oppositeDir[key]){
        direction = key;
        prevDirection = direction
      }
    }
  }

  if (codeDirObj[event.code] === 'stop') {
    if (direction === 'stop' && prevDirection == undefined) {
      direction = null

      gameScoreHtml.textContent = `${gameScore}`
    }
    else if (direction === 'stop') { // ловлю нажатие в самом начале игры
      direction = prevDirection
    }
    else {
      direction = 'stop';
    }
  }

  if (immunityScore < 0) {
    direction = null;
    prevDirection = null;
    changeDirection = false;
  }

  changeDirection = false;
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

function numPreventDefolt(event) {
	if (arrNumPreventDefolt.indexOf(event.code) >= 0) event.preventDefault()
}


