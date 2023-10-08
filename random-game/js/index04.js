
// подключаю модуль
import arrInfo from "./respInfo.js";


/********************************************* */
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

// const gameScoreHtml = document.querySelector('.color-test')
const gameScoreHtml = document.querySelector('.title')
const immunityScoreHtml = document.querySelector('.immunity')

// получаю ширину и высоту canvas
let canvasWidth = canvas.clientWidth;
let canvasHeight = canvas.clientHeight

console.log(canvasWidth, canvasHeight)

// canvas.width = 300
// canvas.height = 200

/****************************************************** */
/****************************************************** */
// Узнаю размер экрана

// let screenWidth = window.innerWidth; // размер внутреннего окна
// let screenHeight = window.innerHeight;

// let screenWidthOuter = window.outerWidth; // размер внутреннего окна
// let screenHeightOuter = window.outerHeight;

// console.log("Размер экрана: " + screenWidth + " x " + screenHeight);
// console.log("Размер экрана: " + screenWidthOuter + " x " + screenHeightOuter);

console.log("Размер экрана: " + screen.width + " x " + screen.height);


/*****Рисую поле для игры************************************ */
/************************************************************ */

const stepX = 31;
const stepY = 31;
const step = 31 // пока рисую квадраты, потенциально буду менять размер при адаптации

let imgSizeX = stepX-2 // надо уменьшить картинку, чтобы очистка не цепляла линии разметки
let imgSizeY = stepY-2 // надо уменьшить картинку, чтобы очистка не цепляла линии разметки

// ставлю размер поля в зависимость от stepX или stepY

let screenWidth = screen.width
let screenHeight = screen.height

if (screenWidth < 880) {
  canvasWidth = stepX * Math.round(screenWidth*0.9 / stepX)
}
else {
  canvasWidth = stepX * Math.round(canvasWidth / stepX)
}

// canvasWidth = stepX * Math.round(screenWidth / stepX)
// canvasWidth = stepX * Math.round(canvasWidth / stepX)
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
  }
  for (let i = 0; i <= canvasHeight; i = i + stepY) {
    ctx.moveTo(0, i)
    ctx.lineTo(canvasWidth, i)
  }
  ctx.stroke()

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
// const foodImg = new Image();
// foodImg.src = './assets/img/snakeHead-03-48.png'
// foodImg.src = './assets/img/snakeHead-02-48.png'
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

console.log(`foodIndex = ${foodIndex}`)

let food = {
  x: Math.floor((Math.random()*canvasWidth/stepX))*stepX + 1, // 15 (+1 нужен чтобы не цеплять линию разметки)
  y: Math.floor((Math.random()*canvasHeight/stepY))*stepY + 1 // 11
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
let immunityScore = 0
let gameSpeed = 400


/**************************************************************** */
/**************************************************************** */
/**************************************************************** */
// Так и не получилось последовательно стирать каждую картинку
// Надоело разбираться почему, буду перерисовывать поле



function drawPicture() {
  clearField()
  startField()
  ctx.drawImage(foodImg, food.x, food.y, imgSizeX, imgSizeY);

  for (let i = 0; i < snake.length; i++) {
    if (i ===0 ) {ctx.drawImage(snakeImg, (snake[0].x), (snake[0].y), imgSizeX, imgSizeY); }
    else {drawRoundedRectangle(ctx, snake[i].x, snake[i].y, imgSizeX, imgSizeY, 7, '#597059');}
  }

  let snakeHeadX = snake[0].x
  let snakeHeadY = snake[0].y

  // if (direction === 'up') {
  //   if (snakeHeadY < 0) {
  //     snakeHeadY = canvasHeight + 1
  //     gameScore = gameScore - 2
  //     gameScoreHtml.innerHTML = `${gameScore}`
  //   }
  //   else {
  //     snakeHeadY = snakeHeadY - stepY;
  //   }
  // }
  // if (direction === 'right') {
  //   if (snakeHeadX > canvasWidth) { 
  //     snakeHeadX = 0-stepX + 1
  //     gameScore = gameScore - 2
  //     gameScoreHtml.innerHTML = `${gameScore}`
  //   }
  //   else {
  //     snakeHeadX = snakeHeadX + stepX;
  //   }
  // }
  // if (direction === 'down') {
  //   if (snakeHeadY > canvasHeight) { 
  //     snakeHeadY = 0-stepY + 1
  //     gameScore = gameScore - 2
  //     gameScoreHtml.innerHTML = `${gameScore}`
  //   }
  //   else {
  //     snakeHeadY = snakeHeadY + stepY;
  //   }
  // }
  // if (direction === 'left') { 
  //   if (snakeHeadX < 0) { 
  //     snakeHeadX = canvasWidth + 1 
  //     gameScore = gameScore - 2
  //     gameScoreHtml.innerHTML = `${gameScore}`
  //   }
  //   else {
  //     snakeHeadX = snakeHeadX - stepX;
  //   } 
  // }
  // if (direction === 'stop') {
  //   snakeHeadX = snakeHeadX 
  //   snakeHeadY = snakeHeadY
  // };


  if (direction === 'up') {
    // console.log(checkBorder())
    snakeHeadY = (snakeHeadY - stepY + canvasHeight) % canvasHeight;
    // console.log(`snakeHeadY = ${snakeHeadY}`)
    // console.log(`snake[0].y = ${snake[0].y}`)
    // console.log(Math.abs(snake[0].y - snakeHeadY) === stepY)
  }
  if (direction === 'right') {
    snakeHeadX = (snakeHeadX + stepX) % canvasWidth;
  }
  if (direction === 'down') {
    snakeHeadY = (snakeHeadY + stepY) % canvasHeight;
  }
  if (direction === 'left') { 
    snakeHeadX = (snakeHeadX - stepX + canvasWidth) % canvasWidth;
  }
  if (direction === 'stop') {
    snakeHeadX = snakeHeadX 
    snakeHeadY = snakeHeadY
  };


if (checkBorder(snakeHeadX, snakeHeadY)) { // проверка что змейка побывала за пределами поля
  // gameScore = gameScore - 2
  immunityScore = immunityScore - 2
  immunityScoreHtml.innerHTML = `Immunity: ${immunityScore}  Speed: ${gameSpeed}`
  gameScoreHtml.innerHTML = `${gameScore}`
}

/****************************************** */

  if (snakeHeadX === food.x && snakeHeadY === food.y) {
    gameScore = gameScore + 1
    gameScoreHtml.innerHTML = `${gameScore}`

    immunityScore = immunityScore + 1
    // immunityScoreHtml.innerHTML = `Immunity: ${immunityScore}  Speed: ${gameSpeed}`

    foodIndex = Math.floor(foodArrImg.length * Math.random())
    foodImg.src = foodArrImg[foodIndex]

    if (gameSpeed > 100) {  
      clearInterval(startPicture);  
      gameSpeed = gameSpeed - 30; 
      startPicture = setInterval(drawPicture, gameSpeed);
    }

    food = {
      x: Math.floor((Math.random()*canvasWidth/stepX))*stepX + 1, 
      y: Math.floor((Math.random()*canvasHeight/stepY))*stepY + 1 
    }

    immunityScoreHtml.innerHTML = `Immunity: ${immunityScore}  Speed: ${gameSpeed}`
  }
  else {
    snake.pop()
  }

  let snakeHead = {
    x: snakeHeadX,
    y: snakeHeadY
  }

  snake.unshift(snakeHead)

  // if (immunityScore < 0) {
  //   // gameScoreHtml.innerHTML = `Game over`

  //   immunityScoreHtml.innerHTML = 
  //   `Immunity: ${immunityScore} Game over`
  //   clearInterval(startPicture); 
  // }

  if (immunityScore < 0) {
    gameScoreHtml.innerHTML = `Total ${gameScore} Game over`

    setTimeout(() => {
      immunityScoreHtml.innerHTML = `Immunity: ${immunityScore} Be healthy`;
    }, 3000);
    
    immunityScoreHtml.innerHTML = `Immunity: ${immunityScore}`;
    clearInterval(startPicture);
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

function tailSnake(snakeArr) {
  for (let i = 1; i < snakeArr.length; i++) {
    if(snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y && direction !== 'stop') {
      alert(`Зачем есть себя?`)
    }
    
  }
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


document.addEventListener("keydown", moveSnake)

let direction;
let prevDirection

function moveSnake(event) {

	if (codeArr.indexOf(event.code) >= 0) event.preventDefault();

  if (event.code === codeArr[0] || event.code === codeArr[1] || event.code === codeArr[2] ) {
    if (direction === 'stop') { 
      direction = 'stop'
    }
    else if (prevDirection !== 'down') {
      direction = 'up';
      prevDirection = direction
    }

    console.log(`Нажал вверх`)
    console.log(`prevDirection = ${prevDirection}`)
    console.log(`direction = ${direction}`)
   
  }
  if (event.code === codeArr[3] || event.code === codeArr[4] || event.code === codeArr[5] ) {
   
    if (direction === 'stop') { 
      direction = 'stop' 
    }
    else if (prevDirection !== 'left') {
      direction = 'right';
      prevDirection = direction
    }

    console.log(`Нажал вправо`)
    console.log(`prevDirection = ${prevDirection}`)
    console.log(`direction = ${direction}`)
    
  }
  if (event.code === codeArr[6] || event.code === codeArr[7] || event.code === codeArr[8] ) {
    
    if (direction === 'stop') { 
      direction = 'stop' 
    }
    else if (prevDirection !== 'up') {
      direction = 'down';
      prevDirection = direction
    }

    console.log(`Нажал вниз`)
    console.log(`prevDirection = ${prevDirection}`)
    console.log(`direction = ${direction}`)
    
  }
  if (event.code === codeArr[9] || event.code === codeArr[10] || event.code === codeArr[11] ) {
    
    if (direction === 'stop') { 
      direction = 'stop' 
    }
    else if (prevDirection !== 'right') {
      direction = 'left';
      prevDirection = direction
    }

    console.log(`Нажал влево`)
    console.log(`prevDirection = ${prevDirection}`)
    console.log(`direction = ${direction}`)
    
  }
  if (event.code === codeArr[12]) {
    if (direction === 'stop') {
      direction = prevDirection
    }
    else {
      
      direction = 'stop';
    }
    console.log(`Нажал stop`)
    console.log(`prevDirection = ${prevDirection}`)
    console.log(`direction = ${direction}`)
    
  }

  console.log(`****`)
  console.log(direction)
  console.log(`  `)
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

// чтобы сработал setInterval у функции в параметрами
// функцию надо обернуть в стрелочную функцию

// let startPicture = setInterval(() => drawPicture(ctx), gameSpeed);
// let clearSnake = setInterval(() => clearFoodPicture(snake[0].x, snake[0].y), 100);



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


