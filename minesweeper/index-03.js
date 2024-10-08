

let mineNumber = 10  // всего (количество) мин
let column = 10
let row = 10
let scoreCloseBlock = column*row - mineNumber
const colorNumber = ['one', 'two', 'three', 'foor', 'five', 'six', 'seven', 'eight']
let matrix = new Array(row);

let matrixDoc = []

let firstClick // переменная для первого клика (чтобы сразу не нарваться на мину)
let movesCount = 0 // количество кликов

let time = 0 // игры со временем
let timer

const minesOptions = [10]

for (let i = 0; i < 90; i++) minesOptions[i] = i + 10;  // формирую массив в select для выбора количества мин
//console.log(minesOptions)

/************************************************************************************************** */
/************************************************************************************************** */

const mine = {
  x: 0,
  y: 0
}

class MineInfo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.mineHere = false;
    this.mineNear = 0;
    this.mineOpen = false;
  }
}



const minePlacement = function(){
  matrix = null
  console.log(matrix)
  matrix = new Array(row); 
  for (let x = 0; x < row; x++) {
    matrix[x] = new Array(column);
    for (let y = 0; y < column; y++) {
      matrix[x][y] = new MineInfo(x, y);
    }
  }

  mineNumber = Number(document.querySelector('select').value)

  let countMine = mineNumber

  // console.log(`mineNumber = ${mineNumber}`)
  // console.log(`mineNumber = ${document.querySelector('select').value}`)
  console.log(`mineNumber = ${Number(document.querySelector('select').value)}`)

  while(countMine){
    let x = Math.floor(Math.random() * row)
    let y = Math.floor(Math.random() * column)
    if(matrix[x][y].mineHere === false){
      matrix[x][y].mineHere = true
      countMine--
    }
  }
}

/********************************************************* */
/************** считаю количество мин вокруг ячейки */

const mineAround = function(){
  for (let i = 0; i < matrix.length; i++) {
     for (let k = 0; k < matrix[i].length; k++) {

      if ((i-1) >= 0 && (k-1) >= 0 && matrix[i-1][k-1].mineHere === true) matrix[i][k].mineNear = matrix[i][k].mineNear + 1;
      if ((i-1) >= 0 && (k) >= 0 && matrix[i-1][k].mineHere === true) matrix[i][k].mineNear = matrix[i][k].mineNear + 1;
      if ((i-1) >= 0 && (k + 1) < matrix[i].length && matrix[i-1][k+1].mineHere === true) matrix[i][k].mineNear = matrix[i][k].mineNear + 1;
      if ((i) >= 0 && (k + 1) < matrix[i].length && matrix[i][k+1].mineHere === true) matrix[i][k].mineNear = matrix[i][k].mineNear + 1;
      if ((i+1) < matrix.length && (k + 1) < matrix[i].length && matrix[i+1][k+1].mineHere === true) matrix[i][k].mineNear = matrix[i][k].mineNear + 1;
      if ((i+1) < matrix.length && (k) < matrix[i].length && matrix[i+1][k].mineHere === true) matrix[i][k].mineNear = matrix[i][k].mineNear + 1;
      if ((i+1) < matrix.length && (k-1) >= 0 && matrix[i+1][k-1].mineHere === true) matrix[i][k].mineNear = matrix[i][k].mineNear + 1;
      if ((i) < matrix.length && (k-1) >= 0 && matrix[i][k-1].mineHere === true) matrix[i][k].mineNear = matrix[i][k].mineNear + 1;

    }
  }
}

// minePlacement()
// mineAround()


let razm = 'block'  // переменная для игр с размером поля

if(row === 20) razm = 'block_big'

function startInfoBlock() {
  document.querySelector('body').innerHTML = `<header class="info-block"></header>`;
  document.querySelector('.info-block').innerHTML = `<button class="btn-restart">Restart Game</button>`;
  document.querySelector('.info-block').innerHTML += `<div class="div-timer"></div>`;
  document.querySelector('.info-block').innerHTML += `<div class="div-moves"></div>`;

  document.querySelector('.info-block').innerHTML += `<select class="div-select"></select>`; // добавление элемента для выбора количества мин
  let bombInfo = ''
  for (let i = 0; i < minesOptions.length; i++){
    bombInfo = bombInfo + `<option>${minesOptions[i]}</option>`
  }

  document.querySelector('select').innerHTML = bombInfo;


  document.querySelector('body').innerHTML += `<main class="main"></main>`;

}

startInfoBlock()

minePlacement()
mineAround()



/****************************************************************** */
/****************************************************************** */


function start(){

  document.querySelector('.main').innerHTML = '' // очищаю чтобы работало без перезагрузки
  document.querySelector('.main').innerHTML += `<div class="playboard"></div>`;

  let init = '';

  for (let i = 0; i < row*column; i++){

    mine.x = i % row // определяю координату X ячейки
    mine.y = Math.floor(i/row) //  определяю координату Y ячейки

    let mineJSON = JSON.stringify(mine)  // это уже строка, поэтому кавычек в data НЕ НАДО!!!

    let temp_bomb = ''
    //let block = `<div class="block" data=${mineJSON} "><div>${temp_bomb}</div></div>`;
    let block = `<div class=${razm} data=${mineJSON} ><div>${temp_bomb}</div></div>`;

    init = init + block;
  }
  document.querySelector('.playboard').innerHTML = init;

  /* получаю Node коллекцию блоков */
  matrixDoc = document.querySelectorAll('.block');

  firstClick = false // для первого клика (изменяю в open)
  movesCount = 0 // буду считать количество кликов-ходов
  document.querySelector('.div-moves').innerHTML = `Количество ходов ${movesCount}`;

  // игры со временем
  time = 0
  //let timer
  document.querySelector('.div-timer').innerHTML = `Время ${time} с`;

}


/************************************************************* */

start()


/****************************************************** */

/* правая клавиша мыши */
const right = function(){ // 
  document.querySelector('.playboard').addEventListener('contextmenu', function(event) {
    event.preventDefault()
    // matrixDoc[1].innerHTML = 'Ура'
    //console.log(event.target.getAttribute("data"))
    let coorXY = JSON.parse(event.target.getAttribute("data"))

    if(event.target.matches('.block') && matrix[coorXY.x][coorXY.y].mineOpen !== true) {
      event.target.classList.toggle('guess')
    }

  })
}

right()

/******************************************************************** */
/********* Время игры *********************************************************** */

const startTimer = function() {    // запускаю время
  timer = setInterval(function() {
    time++
    document.querySelector('.div-timer').innerHTML = `Время ${time} с`;
  }, 1000)
}

const stopTimer = function() {   // останавливаю время
  clearInterval(timer)
}

//startTimer()

/********************************************************************************** */
/*********Запуск игры без перезагрузки*********************************************** */

const restartGame = function() {
  minePlacement()
    mineAround()
    start()
    right()
    left()
    scoreCloseBlock = column*row - mineNumber
    stopTimer() // остановить время игры при перезагрузке
}


/***************************************************** */
/************************************************************************************** */
/*  Открытие ячейки */

const open = function(event){ 
  let coorXY = JSON.parse(event.target.getAttribute("data"))
  let x = coorXY.x
  let y = coorXY.y
  console.log(`функция open x=${x}`)

  if (!firstClick) { // пробую словить первый клик

    minePlacement()
    mineAround()
    firstClick = true

    while(matrix[x][y].mineHere){ // если мина перерисовываю matrix
      minePlacement()
      mineAround()
    }
    openNullBlock(x, y)

    // запуск таймера при первом клике
    startTimer()

  } else {
    openNullBlock(x, y)
  }

  // увеличение количества ходов при каждом клике
  movesCount++
  document.querySelector('.div-moves').innerHTML = `Количество ходов ${movesCount}`;

}




/***************************************************** */
/************************************************************************************** */
/*  Открытие ячейки */

/*
const open = function(event){  // запускается при клике
  let coorXY = JSON.parse(event.target.getAttribute("data"))
  let x = coorXY.x
  let y = coorXY.y
  console.log(`функция open x=${x}`)

  openNullBlock(x, y)
}
*/

const openNullBlock = function(x, y){ // координаты будет передавать функция open в которую я вставлю эту
  //matrixDoc = document.querySelectorAll('.block')
  let index = y*row + x
  //console.log(matrix)
  if(matrix[x][y].mineOpen) return; //если ячейка уже открыта - выходим из функции
  if(matrix[x][y].mineHere) {
    temp_bomb = '💥';
    matrixDoc[index].innerHTML = `${temp_bomb}`

    for(let i=0; i < matrixDoc.length; i++){ // чтобы открыть все мины
      let yBomb = Math.floor(i/row)
      let xBomb = i % row
      if((i !== index) && matrix[xBomb][yBomb].mineHere) matrixDoc[i].innerHTML = '💣';
    }

    stopTimer() // остановить время игры при проигрыше

    /* чтобы увидеть взрыв) */

    setTimeout(() => {
      alert('Игра окончена. Попробуйте еще раз');
      restartGame(); // стартую новую игру
    },0);


  } else { // если мины нет
      let temp_bomb = ''
      temp_bomb = matrix[x][y].mineNear
      if(temp_bomb === 0) temp_bomb = '';
      matrix[x][y].mineOpen = true
      matrixDoc[index].innerHTML = `${temp_bomb}`
      matrixDoc[index].classList.add('null') // Node коллекция всех блоков (стоят по порядку)

      if(temp_bomb) matrixDoc[index].classList.add(`${colorNumber[Number(temp_bomb)-1]}`); // меняет цвет цифр

      scoreCloseBlock = scoreCloseBlock - 1 // считаю, сколько ячеек осталось открыть

      if(scoreCloseBlock === 0) {
        //alert('Ура! Вы нашли все мины. Победа');
        stopTimer() // остановить время игры при победе
        setTimeout(() => {
          alert('Ура! Вы нашли все мины. Победа');
          restartGame(); // call restartGame() function to restart the game
        },0);
      }

      //if(matrix[x][y].mineNear === 0){ // опция открытия пустых ячеек

        if (matrix[x][y].mineNear == 0) { // опция открытия пустых ячеек
          for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
              if (i >= 0 && j >= 0 && i <matrix.length && j < matrix[x].length && (i !== x || j !== y)) {
                openNullBlock(i, j);
              }
            }
          }
        }

  }

}


document.querySelector('.playboard').addEventListener('click', function(event) {
  if(event.target.matches('.block') && !(event.target.matches('.guess'))) {
    open(event)
  }
})

const left = function() {
  document.querySelector('.playboard').addEventListener('click', function(event) {
    if(event.target.matches('.block') && !(event.target.matches('.guess'))) {
      open(event)
    }
  })
}

/****** Перезапуск игры  *************************************************** */


document.querySelector('.btn-restart').addEventListener('click', function() {
  //alert("Вы нажали на кнопку");
  restartGame();
});


/************************************************************** */


/* получаю координаты ячейки по клику */
/*
document.querySelectorAll('.block').forEach(function(block){
  block.addEventListener('click', function(){
    //alert(` x=${block.dataset.x}\n y=${block.dataset.y}`) // работает выводит координаты ячейки 
    //console.log(typeof block.getAttribute("data"))
    console.log(JSON.parse(block.getAttribute("data")))
    let coordinate = JSON.parse(block.getAttribute("data"))
    // console.log(` x=${coordinate.x}\n y=${coordinate.y}`)
    // console.log(` x=${coordinate.x}\n y=${coordinate.y}\n mineHere=${coordinate.mineHere}`)
    // console.log(` x=${coordinate.x}\n y=${coordinate.y}\n mineHere=${coordinate.mineHere}\n mineNear=${coordinate.mineNear}`)
    console.log(` x=${coordinate.x}\n y=${coordinate.y}\n mineHere=${coordinate.mineHere}\n mineNear=${coordinate.mineNear}\n mineOpen=${coordinate.mineOpen}`)

    /* тестовое открытие бомб */
    /*
    let temp_bomb = ''
    temp_bomb = matrix[coordinate.x][coordinate.y].mineNear
    if(matrix[coordinate.x][coordinate.y].mineHere) temp_bomb = '💥';
    */

    // 💥 столкновение взрыв HTML-код	&#128165; CSS-код	\1F4A5
    // незакрашенный флаг &#9872; (\2690) в CSS
    // закрашенный флаг &#9873; (\2691) в CSS
    // шлем с белым крестом &#9937;
    // закрашенный улыбающийся смайлик &#9787;
    // православный крест &#9766;
    // крест ✝
    // нахмуренный смайлик &#9785;

    // многоугольник	&#10040;	&#x2738;	✸

    //⛔	 	&#9940;	Вход запрещен (кирпич)
    //⛳	 	&#9971;	Флаг в воронке, местоположение, место встречи, гольф

    // ⛑	&#9937;	\26D1	Шлем с белым крестом
    // ⚑	&#9873;	\2691	Закрашенный флаг
    // ⚐	&#9872;	\2690	Незакрашенный флаг
    // ☹	&#9785;	\2639	Нахмуренный смайлик
    // ☺	&#9786;	\263A	Улыбающийся смайлик
    // ☻	&#9787;	\263B	Закрашенный улыбающийся смайлик

    /* Операции с открытой ячейкой */
    /*
    matrixDoc[coordinate.y*row + coordinate.x].innerHTML = `${temp_bomb}`
    matrixDoc[coordinate.y*row + coordinate.x].classList.add('open')
    */
    /**************************************** */

    //if(!matrix[coordinate.x][coordinate.y].mineNear) если рядом мин нет

    /**************************************** */
    // запоминаю в матрицу, координаты ячейки, которая открывалась
    //matrix[coordinate.x][coordinate.y].mineOpen = true
    //console.log(matrix)
    /*
  })
})
*/

//let matrixDoc = document.querySelectorAll('.block')
//console.log(matrixDoc[1].innerHTML = 'Ура')
//console.log(document.querySelectorAll('.block')[99].innerHTML = 'Ура')


