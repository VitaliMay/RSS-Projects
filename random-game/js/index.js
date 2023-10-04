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

// получаю ширину и высоту canvas
const canvasWidth = canvas.clientWidth;
const canvasHeight = canvas.clientHeight

/*****Рисую поле для игры************************************ */

const stepX = 48;
const stepY = 48;
const step = 48 // пока рисую квадраты, потенциально буду менять размер при адаптации

ctx.beginPath()
// ctx.strokeStyle = 'whitesmoke'
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

/*********************************************** */

// function playField(stepX, stepY) {  // написать функцию для рисования нового поля

function clearField() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight); // oчищаю поле, убираю сетку но оставляю стили (фон и т.д.)
  ctx.closePath() // на всякий случай закрою
}

// clearField()

/******Проверяю пути к фоткам*************************************** */

ctx.beginPath()
const foodImg = new Image();
// foodImg.src = './assets/img/snakeHead-03-48.png'
// foodImg.src = './assets/img/snakeHead-02-48.png'
foodImg.src = './assets/img/snakeHead-01-48.png'

// foodImg.src = './assets/img/fly-02-48.png'
// foodImg.src = './assets/img/fly-01-48.png'
// foodImg.src = './assets/img/bird-48.png'
// foodImg.src = './assets/img/frog-48.png'

/**************************************************************** */

function drawPicture() {
  // let x = Math.floor(canvasWidth/2) - stepX; // Чётное вычисляем центрированное положение по X
  let x = Math.floor((canvasWidth - stepX) / 2); // Нечётное вычисляем центрированное положение по X
  let y = (canvasHeight - stepY) / 2; // вычисляем центрированное положение по Y
  ctx.drawImage(foodImg, x, y, stepX, stepY); // передаем координаты и размер изображения
  // ctx.clearRect(x, y, stepX, stepY); // Стирание предыдущей картинки
}

/******Для отображения картинки **************************************** */

foodImg.onload = function() {
  drawPicture();
};

// let startPicture = setInterval(drawPicture, 100) //запускаю drawFood каждые 0.1с



/*****Тестирую удаление картинки************************************************* */

function clearFoodPicture() {

  // Получаем ширину и высоту картинки
  const foodImgWidth = foodImg.width;
  const foodImgHeight = foodImg.height;

  console.log(foodImgWidth, foodImgHeight)
  
  let foodImgX = Math.floor((canvasWidth - stepX) / 2); // Нечётное вычисляем центрированное положение по X
  let foodImgY = (canvasHeight - stepY) / 2;

  
  // Очищаем прямоугольную область, содержащую картинку foodImg
  ctx.clearRect(foodImgX, foodImgY, foodImgWidth, foodImgHeight);
}

// foodImg.onload = function() { // лучший вариант
//   clearFoodPicture()
// };

// let clearImg = setInterval(clearFoodPicture, 100) // не полностью очищает

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


