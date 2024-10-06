
// подключаю модуль
import { signatureScore } from "./score.js";

signatureScore ()

/********************************************* */
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

const start = document.querySelector('.color-test')

const gameScoreHtml = document.querySelector('.title')
const immunityScoreHtml = document.querySelector('.stat__score--immunity')
const speedScoreHtml = document.querySelector('.stat__score--speed')

const btnSound = document.querySelector('.btn_Sound')
const btnRules = document.querySelector('.btn_Rules')
const btnSetting = document.querySelector('.btn_Setting')
const btnStop = document.querySelector('.btn_Stop')

const testInput = document.querySelector('.testInput')

// console.log(testInput.value)


/**************************************************** */
const body = document.querySelector('body');
const fon = document.querySelector('.fon');
const modalLogin = document.querySelector('.modal-login')


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
    // console.log(`flag cross start = ${flagCup}`)
    // closeMenu()
    // closeMenuSetting()
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



// console.log( modalScoreNumber[0])



/*********************************************** */

let gameScore = 0
let immunityScore = 0
let gameSpeed = 390

if (testInput.value > 390) testInput.value = 390;
if (testInput.value < 60) testInput.value = 60;

let gameSpeedInput = 450 - testInput.value
// let gameSpeedInput = testInput.value

speedScoreHtml.textContent = `${60} / ${450 - gameSpeedInput}`

/******** Старт ******************************** */
/******** Старт ******************************** */

start.addEventListener('click', function () {
  closeMenuSetting()
  startNew()

})
// start.addEventListener('click', startNew)

function startNew() {

  direction = null
  prevDirection = null

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

  food = {
    x: Math.floor((Math.random()*canvasWidth/stepX))*stepX + 1, // 15 (+1 нужен чтобы не цеплять линию разметки)
    y: Math.floor((Math.random()*canvasHeight/stepY))*stepY + 1 // 11
  }
  
  snake = []
  snake[0] = {
    x: evenOddCenter(canvasWidth, stepX) + 1,
    y: evenOddCenter(canvasHeight, stepY) + 1
  }

  clearInterval(startPicture);
  startPicture = setInterval(drawPicture, gameSpeed) 
}


/**** Музыка ******************************************* */
/**** Музыка ******************************************* */

const musicBase = document.querySelector('.baseMusic')
musicBase.pause()
// Устанавливаю уровень звука (от 0 до 1)
musicBase.volume = 0.3;
musicBase.playbackRate = 0.8;

const musicFood = document.querySelector('.foodMusic')
musicFood.pause()
musicFood.volume = 0.8; 

const musicBorder = document.querySelector('.borderMusic')
musicBorder.pause()
musicBorder.volume = 0.8; 

const musicStop = document.querySelector('.stopMusic')
musicStop.pause()
musicStop.volume = 0.8; 

const musicTail = document.querySelector('.tailMusic')
musicTail.pause()
musicTail.volume = 0.8; 

// let flagSound = true  // не хочу проверять наличие класса у btnSound

btnSound.addEventListener('click', soundOnOff)
btnSound.addEventListener("touchstart", soundOnOff, { passive: true });
btnSound.addEventListener("touchend", soundOnOff, { passive: true });

function soundOnOff() {
  btnSound.classList.toggle('btn_Sound--mute')

  if (btnSound.classList.contains('btn_Sound--mute')) {
    musicBase.volume = 0;
    musicFood.volume = 0; 
    musicBorder.volume = 0; 
    musicTail.volume = 0;
    musicStop.volume = 0; 
  }
  else {
    musicBase.volume = 0.3;
    musicFood.volume = 0.8; 
    musicBorder.volume = 0.8; 
    musicTail.volume = 0.8; 
    musicStop.volume = 0.8; 
  }
}

/******************************************************** */
/******************************************************** */


// получаю ширину и высоту canvas
let canvasWidth = canvas.clientWidth;
let canvasHeight = canvas.clientHeight


/*****Рисую поле для игры************************************ */
/************************************************************ */

let stepX = 31;
let stepY = 31;
const step = 31 // пока рисую квадраты, потенциально буду менять размер при адаптации

let imgSizeX = stepX-2 // надо уменьшить картинку, чтобы очистка не цепляла линии разметки
let imgSizeY = stepY-2 // надо уменьшить картинку, чтобы очистка не цепляла линии разметки

// ставлю размер поля в зависимость от stepX или stepY

let screenWidth = screen.width
let screenHeight = screen.height


if (screenWidth < 700){
  stepX = 26
  stepY = 26
  imgSizeX = stepX-2 // надо уменьшить картинку, чтобы очистка не цепляла линии разметки
  imgSizeY = stepY-2 

  let windowHeight = screenHeight;
  let headerHeight = document.querySelector('.header').clientHeight
  canvasWidth = stepX * Math.round(screenWidth*0.9 / stepX)
  canvasHeight = stepY * Math.round((windowHeight - headerHeight)*0.8 / stepY)
}
else if (screenWidth < 880) {
  canvasWidth = stepX * Math.round(screenWidth*0.9 / stepX)
  
  canvasHeight = stepY * Math.round(screenHeight*0.7 / stepY)
}
else {
  canvasWidth = stepX * Math.round(canvasWidth / stepX)
}

canvas.width = canvasWidth
canvasHeight = stepY * Math.round(canvasHeight / stepY)
canvas.height = canvasHeight


/************************************ */
/************************************ */
// Функция для рисования нового поля

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

    if (i === centerYbox*stepX) {
      // ctx.fillStyle = 'red'
      ctx.fillStyle = '#ddc8ac'
      // ctx.fillStyle = '#dabd97'
      // ctx.fillStyle = '#dec8aa'
      ctx.fillRect(lineBox.upX - stepX/2, i, lineBox.downX - lineBox.upX + stepX, stepY )
    }
  }

  ctx.stroke()
  ctx.closePath()

  drawTriangle(canvasWidth - stepX, centerYbox * stepY + stepY / 2, canvasWidth - stepX*3, centerYbox * stepY - stepY / 2, canvasWidth - stepX*3, centerYbox * stepY + 1.5*stepY)
  drawTriangle(stepX, centerYbox * stepY + stepY / 2, stepX*3, centerYbox * stepY - stepY / 2, stepX*3, centerYbox * stepY + 1.5*stepY)
  drawTriangle(centerXbox * stepX + stepX / 2, canvasHeight - stepY, centerXbox * stepX - stepX / 2, canvasHeight - 3*stepY, centerXbox * stepX + 3*stepX/2, canvasHeight - 3*stepY)
  drawTriangle(centerXbox * stepX + stepX / 2, stepY, centerXbox * stepX - stepX / 2, 3*stepY, centerXbox * stepX + 3*stepX/2, 3*stepY)

}


/******* Создаю класс для работы с Local Storage ***************************** */
/******* Создаю класс для работы с Local Storage ***************************** */

class MemoryStore {
  constructor() {
    this.localKey = 'VitaliMay_Snake_scoreTable'
  }

  getScore() {
    const localScoreTable  = localStorage.getItem(this.localKey)   // узнаю,что хранится в Local Storage

    if (isObjectEmpty(localScoreTable)) { // если что-то есть
      return JSON.parse(localScoreTable)
    }
    else {
      return {}
    }
  }

  putScore(gameSpeed, gameScore) {
    let memoryLocal = this.getScore()
    if (isObjectEmpty(memoryLocal)) {
      if (gameSpeed in memoryLocal) {
      // if (memoryLocal.hasOwnProperty(gameSpeed)) {
        let gameSpeedMemoryLength = memoryLocal[gameSpeed].length
        if (gameSpeedMemoryLength < 10) {
          memoryLocal[gameSpeed].push(gameScore)
          memoryLocal[gameSpeed] = memoryLocal[gameSpeed].sort((a, b) => b - a);
        }
        else {
          if (gameScore > memoryLocal[gameSpeed][gameSpeedMemoryLength-1]) {
            memoryLocal[gameSpeed].pop()
            memoryLocal[gameSpeed].push(gameScore)
            memoryLocal[gameSpeed] = memoryLocal[gameSpeed].sort((a, b) => b - a);
          }
        }
      }
      else {
        memoryLocal[gameSpeed] = [gameScore]
      }
    }  
    else  {
      memoryLocal[gameSpeed] = [gameScore]
    }

    localStorage.setItem(this.localKey, JSON.stringify(memoryLocal))
  }
}

const memoryLocalTest = new MemoryStore()


/************************************ */
/************************************ */

function isObjectEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return true; // Если есть хотя бы один ключ, объект считается не пустым
    }
  }
  return false; // Если нет ни одного ключа, объект считается пустым
}

// function isObjectEmpty(obj) {
//   return Object.keys(obj).length === 0;
// }

/************************************ */
/************************************ */

// Для избежания дублирования кода рисования треугольников

function drawTriangle(x1, y1, x2, y2, x3, y3) {
  ctx.beginPath()
  ctx.fillStyle = '#ddc8ac'
  // ctx.fillStyle = 'red'
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.lineTo(x3, y3)
  ctx.fill()
  ctx.closePath()
}


/*********************************************** */
// Функция очистки поля

function clearField() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight); 
    ctx.closePath() 
}


/******Проверяю пути к фоткам*************************************** */

ctx.beginPath()
const snakeImg = new Image();
snakeImg.src = './assets/img/snakeHead-01-48.png'

/*************************************************************** */

let foodArrImg = [
  './assets/img/fly-02-48.png',
  './assets/img/fly-01-48.png',
  './assets/img/bird-48.png',
  './assets/img/frog-48.png'
]

let foodImg = new Image();
let foodIndex = Math.floor(foodArrImg.length * Math.random())
foodImg.src = foodArrImg[foodIndex]


let food = {
  x: Math.floor((Math.random()*canvasWidth/stepX))*stepX + 1, // 15 (+1 нужен чтобы не цеплять линию разметки)
  y: Math.floor((Math.random()*canvasHeight/stepY))*stepY + 1 // 11
}

/****************************************************************** */
let snake = []
snake[0] = {
  x: evenOddCenter(canvasWidth, stepX) + 1,
  y: evenOddCenter(canvasHeight, stepY) + 1
}

/**** Запоминаю центр и центральные ячейки******************************* */
let centerX = snake[0].x
let centerY = snake[0].y

let centerXbox = Math.floor(centerX / stepX)
let centerYbox = Math.floor(centerY / stepY)

let lineBox = {
  upX: lineEvent(canvasWidth, stepX)*stepX + stepX/2,
  downX: canvasWidth - (lineEvent(canvasWidth, stepX)*stepX) - stepX/2,
  centerY: evenOddCenter(canvasHeight, stepY) + stepY/2
}

/************************************** */

function lineEvent (canvasHeight, stepY) {
  let result
  return result = Math.round(canvasHeight / 4/stepY)
}

/**************************************************************** */
/**************************************************************** */

function drawPicture() {
  clearField()
  startField()
  ctx.drawImage(foodImg, food.x, food.y, imgSizeX, imgSizeY);

  for (let i = 0; i < snake.length; i += 1) {
    if (i === 0 ) {ctx.drawImage(snakeImg, (snake[0].x), (snake[0].y), imgSizeX, imgSizeY); }
    else {drawRoundedRectangle(ctx, snake[i].x, snake[i].y, imgSizeX, imgSizeY, 7, '#597059');}
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

  /****************************************** */

  if (snakeHeadX === food.x && snakeHeadY === food.y) {
    musicFood.play()
    gameScore = gameScore + 1
    gameScoreHtml.textContent = `${gameScore}`
    immunityScore = immunityScore + 1
    foodIndex = Math.floor(foodArrImg.length * Math.random())
    foodImg.src = foodArrImg[foodIndex]

    if (gameSpeed > gameSpeedInput) {
      clearInterval(startPicture);
      gameSpeed = gameSpeed - 30;
      startPicture = setInterval(drawPicture, gameSpeed);
      musicBase.playbackRate = musicBase.playbackRate + 0.05; // ускоряю музыку
    }

    food = {
      x: Math.floor((Math.random()*canvasWidth/stepX))*stepX + 1, 
      y: Math.floor((Math.random()*canvasHeight/stepY))*stepY + 1 
    }

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

const codeArr = [
  'ArrowUp', 'Numpad8', 'Digit8', 'KeyW', 
  'ArrowRight', 'Numpad6', 'Digit6', 'KeyD', 
  'ArrowDown', 'Numpad2', 'Digit2', 'KeyS', 
  'ArrowLeft', 'Numpad4', 'Digit4', 'KeyA',
  'Space'
]


document.addEventListener("keydown", moveSnake)

canvas.addEventListener("click", moveSnake)

canvas.addEventListener("touchstart", moveSnake, { passive: true });
let direction;
let prevDirection
let changeDirection = false;

function moveSnake(event) {

  if (changeDirection) return;
  changeDirection = true;

	if (codeArr.indexOf(event.code) >= 0) event.preventDefault();

  if (event.code === codeArr[0] || event.code === codeArr[1] || event.code === codeArr[2] || event.code === codeArr[3] || (event.offsetY <= lineBox.centerY && event.offsetX > lineBox.upX && event.offsetX < lineBox.downX))  {
  // if (event.code === codeArr[0] || event.code === codeArr[1] || event.code === codeArr[2] || event.offsetY <= lineBox.upY ) {
    if (direction === 'stop') { 
      direction = 'stop'
    }
    else if (prevDirection !== 'down') {
      direction = 'up';
      prevDirection = direction
    }
  }

  if (event.code === codeArr[4] || event.code === codeArr[5] || event.code === codeArr[6] || event.code === codeArr[7] || event.offsetX >= lineBox.downX) {

    if (direction === 'stop') {
      direction = 'stop'
    }
    else if (prevDirection !== 'left') {
      direction = 'right';
      prevDirection = direction
    }
  }

  if (event.code === codeArr[8] || event.code === codeArr[9] || event.code === codeArr[10] || event.code === codeArr[11] || (event.offsetY > lineBox.centerY && event.offsetX > lineBox.upX && event.offsetX < lineBox.downX) ) {

    if (direction === 'stop') {
      direction = 'stop'
    }
    else if (prevDirection !== 'up') {
      direction = 'down';
      prevDirection = direction
    }
  }

  if (event.code === codeArr[12] || event.code === codeArr[13] || event.code === codeArr[14] || event.code === codeArr[15] || (event.offsetX <= lineBox.upX)) {

    if (direction === 'stop') { 
      direction = 'stop'
    }
    else if (prevDirection !== 'right') {
      direction = 'left';
      prevDirection = direction
    }
  }
  if (event.code === codeArr[16]) {
    if (direction === 'stop' && prevDirection == undefined) {
      direction = null

      gameScoreHtml.textContent = `${gameScore}`
      // console.log('Первый раз')
    }
    else if (direction === 'stop') { // ловлю нажатие в самом начале игры
      direction = prevDirection
    }
    else {
      direction = 'stop';
    }
  }

  /********************************* */
  if (immunityScore < 0) {
    direction = null;
    prevDirection = null;
    changeDirection = false;
  }
  /********************************** */

  changeDirection = false;
}



/******************************************************************* */

// функция для поиска координат центральной ячейки
function evenOddCenter (canvasWidth, stepX) {
  let result = (canvasWidth/stepX)
  if (result % 2 !== 0) {return Math.floor((canvasWidth - stepX) / 2)}
  else {return (Math.floor(canvasWidth/2) - stepX)}

}

/******Для отображения картинки **************************************** */

let startPicture = setInterval(drawPicture, gameSpeed) 

/******************************************************* */
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

/************************************************* */
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


/************************************* */
/************************************* */

