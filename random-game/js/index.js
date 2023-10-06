const score = `
Проверка подключения.
Всё в порядке)

`

console.log(score)

// подключаю модуль
import arrInfo from "./respInfo.js";

console.log(arrInfo[0])




/********************************************* */
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

// const gameScoreHtml = document.querySelector('.color-test')
const gameScoreHtml = document.querySelector('.title')

// получаю ширину и высоту canvas
let canvasWidth = canvas.clientWidth;
let canvasHeight = canvas.clientHeight

console.log(canvasWidth, canvasHeight)

// canvas.width = 300
// canvas.height = 200



/*****Рисую поле для игры************************************ */
/************************************************************ */

const stepX = 31;
const stepY = 31;
const step = 31 // пока рисую квадраты, потенциально буду менять размер при адаптации

let imgSizeX = stepX-2 // надо уменьшить картинку, чтобы очистка не цепляла линии разметки
let imgSizeY = stepY-2 // надо уменьшить картинку, чтобы очистка не цепляла линии разметки

// ставлю размер поля в зависимость от stepX или stepY
canvasWidth = stepX * Math.round(canvasWidth / stepX)
canvas.width = canvasWidth
canvasHeight = stepY * Math.round(canvasHeight / stepY)
canvas.height = canvasHeight


/************************************ */
/************************************ */

function startField() {
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
}

// ctx.beginPath()
// // ctx.strokeStyle = 'whitesmoke'
// ctx.strokeStyle = 'white'

// for (let i = 0; i <= canvasWidth; i = i + stepX) {
//   ctx.moveTo(i, 0)
//   ctx.lineTo(i, canvasHeight)
// }
// for (let i = 0; i <= canvasHeight; i = i + stepY) {
//   ctx.moveTo(0, i)
//   ctx.lineTo(canvasWidth, i)
// }
// ctx.stroke()

// ctx.closePath()

/*********************************************** */

// function playField(stepX, stepY) {  // написать функцию для рисования нового поля

function clearField() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight); // oчищаю поле, убираю сетку но оставляю стили (фон и т.д.)
  ctx.closePath() // на всякий случай закрою
}

// clearField()

/******Проверяю пути к фоткам*************************************** */

ctx.beginPath()
const snakeImg = new Image();
// const foodImg = new Image();
// foodImg.src = './assets/img/snakeHead-03-48.png'
// foodImg.src = './assets/img/snakeHead-02-48.png'
snakeImg.src = './assets/img/snakeHead-01-48.png'
// foodImg.width = '30px'


// foodImg.src = './assets/img/fly-02-48.png'
// foodImg.src = './assets/img/fly-01-48.png'
// foodImg.src = './assets/img/bird-48.png'
// foodImg.src = './assets/img/frog-48.png'

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

console.log(`foodIndex = ${foodIndex}`)

let food = {
  x: Math.floor((Math.random()*canvasWidth/stepX))*stepX + 1, // 15 (+1 нужен чтобы не цеплять линию разметки)
  y: Math.floor((Math.random()*canvasHeight/stepY))*stepY + 1 // 11
  // x: Math.floor((Math.random()*canvasWidth/stepX))*stepX , // 15
  // y: Math.floor((Math.random()*canvasHeight/stepY))*stepY // 11
}

console.log (`x food = ${food.x / stepX}`)
console.log (`y food = ${food.y / stepY}`)

let snake = []
snake[0] = {
  x: evenOddCenter(canvasWidth, stepX) + 1,
  y: evenOddCenter(canvasHeight, stepY) + 1
}

console.log (`x center = ${snake[0].x / stepX}`)
console.log (`y center = ${snake[0].y / stepY}`)


let gameScore = 0
let gameSpeed = 400

// let prevSnakeX = snake[0].x;
// let prevSnakeY = snake[0].y;

// let sizeFotoX = stepX - 10  // тестовая переменная


/**************************************************************** */
/**************************************************************** */
/**************************************************************** */
// Так и не получилось последовательно стирать каждую картинку
// Надоело разбираться почему, буду перерисовывать поле



function drawPicture() {
  clearField()
  startField()
  // ctx.clearRect(food.x, food.y, imgSizeX, imgSizeY);
  ctx.drawImage(foodImg, food.x, food.y, imgSizeX, imgSizeY);


  for (let i = 0; i < snake.length; i++) {

    // ctx.clearRect(snake[i].x, snake[i].y, imgSizeX, imgSizeY);
    // ctx.clearRect(prevSnakeX, prevSnakeY, imgSizeX, imgSizeY);

    if (i ===0 ) {ctx.drawImage(snakeImg, (snake[0].x), (snake[0].y), imgSizeX, imgSizeY); }

    else {
      drawRoundedRectangle(ctx, snake[i].x, snake[i].y, imgSizeX, imgSizeY, 7, '#597059');

      // ctx.beginPath()
      // ctx.fillStyle = 'green'; 
      // ctx.fillRect(snake[i].x, snake[i].y, imgSizeX, imgSizeY)
      // ctx.closePath()
    }


  }

  let snakeHeadX = snake[0].x
  let snakeHeadY = snake[0].y

  if (snakeHeadX === food.x && snakeHeadY === food.y) {
    gameScore = gameScore + 1

    gameScoreHtml.innerHTML = `${gameScore}`

    // Меняю скорость, если змейка съела еду
    

    if (gameSpeed > 100) {
      clearInterval(startPicture);  // очищаю текущий интервал startPicture
      gameSpeed = gameSpeed - 30; 
      // console.log (`gameSpeed = ${gameSpeed}`)
      startPicture = setInterval(drawPicture, gameSpeed);
    }
    console.log (`gameSpeed = ${gameSpeed}`)

    food = {
      x: Math.floor((Math.random()*canvasWidth/stepX))*stepX + 1, 
      y: Math.floor((Math.random()*canvasHeight/stepY))*stepY + 1 
    }
  }
  else {
    snake.pop()
  }


  if (direction === 'up') snakeHeadY = snakeHeadY - stepY;
  if (direction === 'right') snakeHeadX = snakeHeadX + stepX;
  if (direction === 'down') snakeHeadY = snakeHeadY + stepY;
  if (direction === 'left') snakeHeadX = snakeHeadX - stepX;
  if (direction === 'stop') {
    snakeHeadX = snakeHeadX 
    snakeHeadY = snakeHeadY
  };

  let snakeHead = {
    x: snakeHeadX,
    y: snakeHeadY
  }

  snake.unshift(snakeHead)

  
  // prevSnakeX = snake[0].x;
  // prevSnakeY = snake[0].y;

  
  // const borderRadius = 7;
  // const color = '#597059';
  // const color = '#486048';
  
  // drawRoundedRectangle(ctx, snake[0].x + stepX, snake[0].y + stepY, imgSizeX, imgSizeY, 7, '#597059');
  // drawRoundedRectangle(ctx, snake[0].x + stepX, snake[0].y + stepY, imgSizeX, imgSizeY, borderRadius, color);
}




/**************************************************** */
/**************************************************** */
// function drawPicture() {
//   // let x = Math.floor(canvasWidth/2) - stepX; // Чётное вычисляем центрированное положение по X
  
//   // let x = Math.floor((canvasWidth - stepX) / 2); // Нечётное вычисляем центрированное положение по X
//   // let y = (canvasHeight - stepY) / 2; // вычисляем центрированное положение по Y
//   // ctx.drawImage(foodImg, x, y, stepX, stepY); // передаем координаты и размер изображения
//   // ctx.drawImage(foodImg, snake[0].x, snake[0].y, stepX, stepY); // передаем координаты и размер изображения
//   // ctx.drawImage(foodImg, (snake[0].x + 1), (snake[0].y + 1), sizeFotoX, sizeFotoX); // передаем координаты и размер изображения
//   // ctx.drawImage(foodImg, (snake[0].x + 1), (snake[0].y + 1), sizeFotoX, sizeFotoX); // передаем координаты и размер изображения
  
//   // ctx.drawImage(snakeImg, (snake[0].x + 1), (snake[0].y + 1), (stepX-2), (stepY-2)); // передаем координаты и размер изображения
  
//   // ctx.clearRect(x, y, stepX, stepY); // Стирание предыдущей картинки

//   // ctx.clearRect(food.x, food.y, imgSizeX, imgSizeY);
//   ctx.drawImage(foodImg, food.x, food.y, imgSizeX, imgSizeY);
//   // ctx.drawImage(foodImg, food.x, food.y, (stepX-2), (stepY-2));

//   // ctx.clearRect(food.x, food.y, imgSizeX, imgSizeY);
//   for (let i = 0; i < snake.length; i++) {
//     // cтереть перед отрисовкой
//     ctx.clearRect(snake[i].x, snake[i].y, imgSizeX, imgSizeY);

//     if (i ===0 ) {ctx.drawImage(snakeImg, (snake[0].x), (snake[0].y), imgSizeX, imgSizeY); }
//     // if (i ===0 ) {ctx.drawImage(snakeImg, (snake[0].x), (snake[0].y), (stepX-2), (stepY-2)); }
//     // if (i ===0 ) {ctx.drawImage(snakeImg, (snake[0].x + 1), (snake[0].y + 1), (stepX-2), (stepY-2)); }
//     else {
//       ctx.beginPath()
//       ctx.fillStyle = 'green'; 
//       ctx.fillRect(snake[i].x, snake[i].y, (stepX-2), (stepY-2))
//       ctx.closePath()
//     }
//     // ctx.clearRect(snake[i].x, snake[i].y, imgSizeX, imgSizeY);

//   }
//   // for (let i = 0; i < snake.length; i++) {
//   //   ctx.beginPath()
//   //   ctx.fillStyle = 'green';  
//   //   ctx.fillRect(snake[i].x, snake[i].y, (stepX-2), (stepY-2))
//   //   ctx.closePath()
    
//   // }

//   let snakeHeadX = snake[0].x
//   let snakeHeadY = snake[0].y

//   snake.pop()

//   if (direction === 'up') snakeHeadY = snakeHeadY - stepY;
//   if (direction === 'right') snakeHeadX = snakeHeadX + stepX;
//   if (direction === 'down') snakeHeadY = snakeHeadY + stepY;
//   if (direction === 'left') snakeHeadX = snakeHeadX - stepX;

//   let snakeHead = {
//     x: snakeHeadX,
//     y: snakeHeadY
//   }

//   snake.unshift(snakeHead)

// }



/******************************************************************* */

// document.addEventListener("keydown", (event) => console.log(event.code))

const codeArr = [
  'ArrowUp', 'Numpad8', 'Digit8', 
  'ArrowRight', 'Numpad6', 'Digit6', 
  'ArrowDown', 'Numpad2', 'Digit2', 
  'ArrowLeft', 'Numpad4', 'Digit4',
  'Space'
]

/**************************************************************** */

document.addEventListener("keydown", moveSnake)

let direction;
let prevDirection

function moveSnake(event) {

  if (event.code === codeArr[0] || event.code === codeArr[1] || event.code === codeArr[2] ) {
    // console.log(`Нажал вверх`)
    if (prevDirection !== 'down') {
      direction = 'up';
      prevDirection = direction
    }
  }
  if (event.code === codeArr[3] || event.code === codeArr[4] || event.code === codeArr[5] ) {
    // console.log(`Нажал вправо`)
    if (prevDirection !== 'left') {
      direction = 'right';
      prevDirection = direction
    }
  }
  if (event.code === codeArr[6] || event.code === codeArr[7] || event.code === codeArr[8] ) {
    // console.log(`Нажал вниз`)
    if (prevDirection !== 'up') {
      direction = 'down';
      prevDirection = direction
    }
  }
  if (event.code === codeArr[9] || event.code === codeArr[10] || event.code === codeArr[11] ) {
    // console.log(`Нажал влево`)
    if (prevDirection !== 'right') {
      direction = 'left';
      prevDirection = direction
    }
  }
  if (event.code === codeArr[12]) {
    prevDirection = direction;
    direction = 'stop';
  }

  // console.log(direction)
}



/******************************************************************* */

// функция для поиска координат центральной ячейки
function evenOddCenter (canvasWidth, stepX) {
  let result = (canvasWidth/stepX)
  if (result % 2 !== 0) {return Math.floor((canvasWidth - stepX) / 2)}
  else {return (Math.floor(canvasWidth/2) - stepX)}

}

/******Для отображения картинки **************************************** */

// snakeImg.onload = function() {
//   drawPicture();
// };
// foodImg.onload = function() {
//   drawPicture();
// };


let startPicture = setInterval(drawPicture, gameSpeed) 
// let startPicture = setInterval(drawPicture, 400) //запускаю drawFood каждые 0.1с

/************************************ */
/************************************ */
/************************************ */
// пробую рисовать круг
// function drawCircle(x, y, radius, color) {
//   ctx.beginPath();
//   ctx.arc(x, y, radius, 0, 2 * Math.PI);
//   ctx.fillStyle = color;
//   ctx.fill();
//   ctx.closePath();
// }

// drawCircle(100, 100, 50, 'blue');

/******************************************************* */
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


/******************************************************************************** */
/*****Тестирую удаление картинки************************************************* */

// clearFoodPicture(food.x, food.y)

// function clearFoodPicture(xClear, yClear) {

//   ctx.clearRect(xClear, yClear, imgSizeX, imgSizeY);
//   // ctx.clearRect(xClear, yClear, stepX-2, stepY-2);
// }

// чтобы сработал setInterval у функции в параметрами
// функцию надо обернуть в стрелочную функцию

// let clearImg = setInterval(() => clearFoodPicture(food.x, food.y), 100);
// let clearSnake = setInterval(() => clearFoodPicture(snake[0].x, snake[0].y), 100);

/**************************************** */
/**************************************** */


// function clearFoodPicture() {

//   // Получаем ширину и высоту картинки
//   const foodImgWidth = foodImg.width;
//   const foodImgHeight = foodImg.height;

//   console.log(foodImgWidth, foodImgHeight)
  
//   let foodImgX = Math.floor((canvasWidth - stepX) / 2); // Нечётное вычисляем центрированное положение по X
//   let foodImgY = (canvasHeight - stepY) / 2;

  
//   // Очищаем прямоугольную область, содержащую картинку foodImg
//   // ctx.clearRect(foodImgX, foodImgY, foodImgWidth, foodImgHeight);
//   ctx.clearRect(foodImgX+1, foodImgY+1, stepX-2, stepY-2);
// }

/****************************** */

// Ширина линий поля 1px по умолчанию. 
// Чтобы их не стерло, это надо учитывать при размещении картинки и установки её размеров


// foodImg.onload = function() { // лучший вариант
//   clearFoodPicture()
// };

/****************** */
/****************** */
// let clearImg = setInterval(clearFoodPicture, 100) // не полностью очищает

// надо поиграться с размером картинки

// window.onload = function() { // не полностью очищает
//   clearFoodPicture()
// };
// document.onload = function() { // не полностью очищает
//   clearFoodPicture()
// };

// window.requestAnimationFrame(clearFoodPicture) //не полностью очищает

/********************************************* */

// // Загрузка шрифта Roboto  (canvas его почему то не видит)
// const font = new FontFace('Roboto', 'url(./assets/fonts/Roboto-Bold.ttf)');
// font.load().then(() => {
//   // После загрузки шрифта, применить его к контексту Canvas
//   document.fonts.add(font);
  
//   ctx.fillRect(0, 0, 100, 100); // черный квадрат

//   ctx.beginPath()
//   ctx.fillStyle = 'green';  // красный квадрат
//   ctx.fillRect(100, 100, 200, 200)
//   ctx.closePath()

//   ctx.beginPath()
//   ctx.moveTo(300, 300);
//   ctx.lineTo(400, 400);
//   ctx.stroke();
//   ctx.closePath()

//   ctx.beginPath()
//   ctx.strokeStyle = 'red'
//   ctx.moveTo(320, 300)
//   ctx.lineTo(400, 400)
//   ctx.stroke()
//   ctx.closePath()

//   ctx.beginPath()
//   ctx.font = '30px Roboto'
//   ctx.textAlign = 'center'
//   // ctx.textAlign = 'left'
//   // ctx.textAlign = 'right'
//   // ctx.textBaseline = 'top'
//   // ctx.textBaseline = 'bottom'
//   ctx.fillText('Snake', 300, 400)

//   ctx.fillRect(300, 400, 4, 4)
// });



//***Для кнопок*************************************
// Коды HTML

// &#9658;	►	Треугольная стрелка вправо
// &#9668;	◄	Треугольная стрелка влево

// ‖
// &#8214;
// \2016
// U+2016
// &Vert;
// Двойная вертикальная линия

// ⊲
// &#8882;
// \22B2
// U+22B2
// &vltri;
// Нормальная подгруппа
// ⊳
// &#8883;
// \22B3
// U+22B3
// &vrtri;
// Содержит как нормальную подгруппу


