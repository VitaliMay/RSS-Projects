
/*
class mineInfo {
  constructor() {
    this.mineHere = false // мина здесь?
    this.mineNear = 0 // сколько мин рядом
    this.mineOpen = false // состояни ячейки, открыта или нет
  }
}
*/

let mineNumber = 10  // всего (количество) мин
let column = 10
let row = 10

let scoreCloseBlock = column*row - mineNumber

const colorNumber = ['one', 'two', 'three', 'foor', 'five', 'six', 'seven', 'eight']

// let matrix = Array(row).fill(Array(column).fill(new mineInfo)) // создаю чистую матрицу
// console.log(matrix)

/************************************************************************************************** */
/************************************************************************************************** */
// let column = 10
// let row = 10

// const mine = {
//   x: 0,
//   y: 0
// }
const mine = {
  x: 0,
  y: 0,
  mineHere: false,
  mineNear: 0,
  mineOpen: false
}

//let matrix = Array(row).fill(Array(column).fill((mine))) // создаю чистую матрицу не работает, похоже ссылается сама на себя
// придется делать циклом

//let matrix = []

// let column = 10
// let row = 10

/*
let matrix = new Array(row);
for (let i = 0; i < row; i++) {
  matrix[i] = new Array(column);
  for (let j = 0; j < column; j++) {
    // надо создавать новый объект для каждой ячейки, т.к. иначе будет ссылка на один и тот же объект и X и Y примут последние значения
    // поэтому лучше использовать класс
    matrix[i][j] = {
      x: i,
      y: j,
      mineHere: false,
      mineNear: 0,
      mineOpen: false
    };
    mine.x = i
    mine.y = j
    matrix[i][j] = mine
  }
}
*/
class Mine {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.mineHere = false;
    this.mineNear = 0;
    this.mineOpen = false;
  }
}

let matrix = new Array(row);
/*
for (let i = 0; i < row; i++) {
  matrix[i] = new Array(column);
  for (let j = 0; j < column; j++) {
    matrix[i][j] = new Mine(i, j);
  }
}
*/

// matrix[0][8].x = 25;
// console.log(matrix[0][8].x);
// console.log(matrix[0]);

/******************************************************* */
// функция расстановки мин

const minePlacement = function(){

  /* создаю матрицу игрового поля */
  matrix = new Array(row); 
  for (let x = 0; x < row; x++) {
    matrix[x] = new Array(column);
    for (let y = 0; y < column; y++) {
      matrix[x][y] = new Mine(x, y);
    }
  }

  /* генерирую случайную расстановку мин */
  let countMine = mineNumber
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
      /* тест */
      //if() matrix[i][k].mineNear = 88;
    }
  }
}

minePlacement()
mineAround()
console.log(matrix)

/*******Мой код из басик js****(Считает количество мин вокруг ячейки)****************************************************** */
/*
function minesweeper(matrix) {
  let result = [] // объявляю результирующий массив

  for (let i = 0; i < matrix.length; i++) {
    result[i] = [] // продолжаю формировать массив результата
    for (let k = 0; k < matrix[i].length; k++) {
      result[i][k] = 0 // присваиваю начальные значерия в массив результата
      // суть решения - обхожу по кругу каждую ячейку матрицы,
      // если нахожу мину(true) увеличиваю значение счётчика (или соответствующей ячейки результирующего массива)
      if ((i-1) >= 0 && (k-1) >= 0 && matrix[i-1][k-1] === true) result[i][k] = result[i][k] + 1;
      if ((i-1) >= 0 && (k) >= 0 && matrix[i-1][k] === true) result[i][k] = result[i][k] + 1;
      if ((i-1) >= 0 && (k + 1) < matrix[i].length && matrix[i-1][k+1] === true) result[i][k] = result[i][k] + 1;
      if ((i) >= 0 && (k + 1) < matrix[i].length && matrix[i][k+1] === true) result[i][k] = result[i][k] + 1;
      if ((i+1) < matrix.length && (k + 1) < matrix[i].length && matrix[i+1][k+1] === true) result[i][k] = result[i][k] + 1;
      if ((i+1) < matrix.length && (k) < matrix[i].length && matrix[i+1][k] === true) result[i][k] = result[i][k] + 1;
      if ((i+1) < matrix.length && (k-1) >= 0 && matrix[i+1][k-1] === true) result[i][k] = result[i][k] + 1;
      if ((i) < matrix.length && (k-1) >= 0 && matrix[i][k-1] === true) result[i][k] = result[i][k] + 1;
    }
  }
  return result
}
*/


let razm = 'block'  // переменная для игр с размером поля

if(row === 20) razm = 'block_big'


// minePlacement()
// console.log(matrix)


// cell unit block item elem (ячейка клетка блок)

/************************************************************************ */

function start(){

  document.querySelector('body').innerHTML += `<main class="main"></main>`;
  document.querySelector('.main').innerHTML = `<h1 class="title">Minesweeper</h1>`;
  //document.querySelector('.main').innerHTML += `<div class="wrapper-text"></div>`; // обёртка для ввода текста
  document.querySelector('.main').innerHTML += `<div class="playboard"></div>`;

  let init = '';

  for (let i = 0; i < row*column; i++){

    mine.x = i % row // определяю координату X ячейки
    mine.y = Math.floor(i/row) //  определяю координату Y ячейки

    let mineJSON = JSON.stringify(mine)  // это уже строка, поэтому кавычек в data НЕ НАДО!!!

    // let block = `<div class="block" data="${mine}">${i+1}</div>`;
    //let block = `<div class="block" data="${mineJSON}"><div>${i+1}</div></div>`;
    //let block = `<div class="block" data="${JSON.stringify(mine)}" data-x="${Math.floor(i/row)}" data-y="${i%row}"><div>${i+1}</div></div>`;
    // let block = `<div class="block" data-asds=${minewer} data-x="${Math.floor(i/row)}" data-y="${i%row}"><div>${i+1}</div></div>`;
    //let block = `<div class="block" data=${mineJSON} data-x="${Math.floor(i/row)}"><div>${i+1}</div></div>`;

    let temp_bomb = ''
    /* тестовая расстановка бомб */
    // temp_bomb = matrix[mine.x][mine.y].mineNear
    // if(matrix[mine.x][mine.y].mineHere) temp_bomb = 88;


    // let block = `<div class="block" data=${mineJSON} "><div>${i+1}</div></div>`;

    //let block = `<div class="block" data=${mineJSON} "><div>${temp_bomb}</div></div>`;
    let block = `<div class=${razm} data=${mineJSON} "><div>${temp_bomb}</div></div>`;

    init = init + block;
  }

  /*формирую HTML*/

  document.querySelector('.playboard').innerHTML = init;

}

start()

/* получаю Node коллекцию блоков */
let matrixDoc = document.querySelectorAll('.block')

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

/****************************************************** */

/* обработчик правой клавиши */
// document.querySelectorAll('.block')[99].addEventListener('contextmenu', function(event) {
// document.querySelectorAll('.block').forEach(function(block){
document.querySelector('.playboard').addEventListener('contextmenu', function(event) {
    event.preventDefault()
    // matrixDoc[1].innerHTML = 'Ура'
    console.log(event.target.getAttribute("data"))
    let coorXY = JSON.parse(event.target.getAttribute("data"))
    //console.log(coorXY)
    //console.log(matrix[coorXY.x][coorXY.y])
    //if(event.target.matches('.block')) {
    if(event.target.matches('.block') && matrix[coorXY.x][coorXY.y].mineOpen !== true) {
      // если ячейка нужная и еще не открывалась

      //event.target.innerHTML = 'Bomb'
      //console.log('Нашли ячейку')
      //console.log(matrix[coorXY.x][coorXY.y])
      event.target.classList.toggle('guess')
    }

  })

/***************************************************** */

/************************************************************************************** */
/*  Открытие ячейки */

const open = function(event){  // запускается при клике
  let coorXY = JSON.parse(event.target.getAttribute("data"))
  let x = coorXY.x
  let y = coorXY.y
  console.log(`функция open x=${x}`)

  openNullBlock(x, y)
}

const openNullBlock = function(x, y){ // координаты будет передавать функция open в которую я вставлю эту
  let index = y*row + x
  if(matrix[x][y].mineOpen) return; //если ячейка уже открыта - выходим из функции
  if(matrix[x][y].mineHere) {
    // temp_bomb = matrix[coordinate.x][coordinate.y].mineNear
    // if(matrix[coordinate.x][coordinate.y].mineHere) temp_bomb = '💥';
    alert('Игра окончена. Попробуйте еще раз')
  } else { // если мины нет
      let temp_bomb = ''
      temp_bomb = matrix[x][y].mineNear
      if(temp_bomb === 0) temp_bomb = '';
      matrix[x][y].mineOpen = true
      matrixDoc[index].innerHTML = `${temp_bomb}`
      matrixDoc[index].classList.add('null') // Node коллекция всех блоков (стоят по порядку)
      
      //if(temp_bomb) matrixDoc[index].classList.add('one'); // меняет цвет цифр
      if(temp_bomb) matrixDoc[index].classList.add(`${colorNumber[Number(temp_bomb)-1]}`); // меняет цвет цифр

      scoreCloseBlock = scoreCloseBlock - 1 // считаю, сколько ячеек осталось открыть
      
      if(scoreCloseBlock === 0) alert('Ура! Вы нашли все мины. Победа');

      //if(matrix[x][y].mineNear === 0){ // опция открытия пустых ячеек
        
      
        //if (matrix[x][y].mineNear <= 0) { // опция открытия пустых ячеек
        if (matrix[x][y].mineNear == 0) { // опция открытия пустых ячеек
          for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
              if (i >= 0 && j >= 0 && i <matrix.length && j < matrix[x].length && (i !== x || j !== y)) {
                openNullBlock(i, j);
              }
            }
          }
        }

      



        /*
        if (matrix[x][y].mineNear === 0) {
          for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
              if (i >= 0 && j >= 0 && i < matrix.length && j < matrix[x].length && (i != x || j != y) && matrix[i][j].mineNear === 0) {
                openNullBlock(i, j);
              }
            }
          }
        }
        */
        
        
        /*
        let startX = x - 1
        if(startX < 0) startX = x;

        let finishX = x + 1
        if(finishX > row) finishX = x;

        let startY = y - 1
        if(startY < 0) startY = y;

        let finishY = y + 1
        if(finishY > column) finishY = y;

        for(let i = startX; i <= finishX; i++) { // пробегаемся по всем соседним ячейкам
          for (let j = startY; j <= finishY; j++) {
            openNullBlock(i, j)
          }
        }
        */
      
        
          // for (let i = 0; i < matrix.length; i++) {
            // for (let k = 0; k < matrix[i].length; k++) {
        /*
              if ((x-1) >= 0 && (y-1) >= 0 && matrix[x-1][y-1].mineNear === 0) openNullBlock(x-1, y-1);
              if ((x-1) >= 0 && (y) >= 0 && matrix[x-1][y].mineNear === 0) openNullBlock(x-1, y);
              if ((x-1) >= 0 && (y + 1) < matrix[x].length && matrix[x-1][y+1].mineNear === 0) openNullBlock(x-1, y+1);
              if ((x) >= 0 && (y + 1) < matrix[x].length && matrix[x][y+1].mineNear === 0) openNullBlock(x, y+1);
              if ((x+1) < matrix.length && (y + 1) < matrix[x].length && matrix[x+1][y+1].mineNear === 0) openNullBlock(x+1, y+1);
              if ((x+1) < matrix.length && (y) < matrix[x].length && matrix[x+1][y].mineNear === 0) openNullBlock(x+1, y);
              if ((x+1) < matrix.length && (y-1) >= 0 && matrix[x+1][y-1].mineNear === 0) openNullBlock(x+1, y-1);
              if ((x) < matrix.length && (y-1) >= 0 && matrix[x][y-1].mineNear === 0) openNullBlock(x, y-1);
         */    
          //  }
          // }
        






      //}

  }

}


document.querySelector('.playboard').addEventListener('click', function(event) {
  if(event.target.matches('.block') && !(event.target.matches('.guess'))) {
    open(event)
  }
})


/********************************************************* */



/* Добавляю область для ввода текста */

/*
//let str = 'EEE' опыты со строкой ввода
let str = '' //опыты со строкой ввода

function text() {
  document.querySelector('.wrapper-text').innerHTML += `<textarea class="textarea" type="text" id="text-input" rows="6" cols="70" autofocus></textarea>`;
}

text()
*/

/*********************************************** */
/* Игры с языком */
/*
let lang = document.getElementById('lang')
console.log(lang)


function changeLange () {
  if (k === 0) {k = 1}
    else{
        k = 0
      }
      console.log(`Переменная к = ${k}`)
}
*/

/***************************************************** */
/* пробую сделать, чтобы не можно было возвращаться к вводу с виртуальной клавиатуры*/

/*
let textInput = document.getElementById("text-input"); // это одно и тоже - переделать не успеваю
let textarea = document.querySelector('textarea'); // это одно и тоже - переделать не успеваю

let currentText = textarea.value;
*/

/******  работа клавиатуры *******************************************/

/*
let flag = false // отлавливает Shift + Alt
document.onkeydown = (event) => {

  // console.log(event) надо было вытащить code ропущенного DEL

  if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') flag = true  // отлавливает Shift + Alt
  if (event.code == 'AltLeft' && flag || event.code === 'AltRight' && flag){ // отлавливает Shift + Alt
    flag = false // чтобы сработало только один раз
    console.log('Ура заработало')
  } // отлавливает Shift + Alt
*/

  /* загнал в одну функцию, надо вешать слушатели, но не успеваю */
  /*
  document.querySelectorAll('.key').forEach(function (element) {
    element.classList.remove('active')
  })
  */
 /*
  document.querySelector(`.key[data="${event.code}"]`).classList.add('active');
  textInput.focus();  // чтобы сразу вводило в форму
}
*/

/*******  работа виртуальной клавиатуры    *********************************************************** */
/*
document.querySelectorAll('.keyboard .key').forEach(function (element) {
  
  element.onclick = function(event){
*/
    /******Ловлю переменную для смены языка***************************************************************************** */
/*    
    console.log(`Привет что-то ${element.innerHTML}---------------------`)

    if(element.innerHTML === 'lang') {
      console.log(`Тест на язык-----------------------------------------`)
      changeLange ()  // пока только меняет переменную 'k' при нажатии на 'lang'
      // start()
      // text()
    }
*/
    /************************************************************************************************* */
/*
    document.querySelectorAll('.keyboard .key').forEach(function (element) {

      element.classList.remove('active')
    });

    let code = this.getAttribute('data')
    this.classList.add('active')
    console.log(code)


    let cursorStart = textarea.selectionStart;
    let cursorEnd = textarea.selectionEnd;

    // console.log(cursorStart)
    // console.log(cursorEnd)

    let indexFuncButton = codeKeyboard.indexOf(code)

    if (funcButtonIndexArr.includes(indexFuncButton)){
      console.log(`Начинаются мучения`)
      console.log(`Индекс= ${codeKeyboard.indexOf(code)}`)

      if(indexFuncButton === 13){
        
        if (cursorStart === 0) cursorStart = 1;
        textarea.value = textarea.value.slice(0, cursorStart-1) + textarea.value.slice(cursorEnd); //работает но только один раз потом курсор убегает

        textarea.selectionStart = textarea.selectionEnd = cursorEnd - 1 // чтобы курсор не убегал
        if (textarea.selectionStart < 0 || textarea.selectionEnd < 0) textarea.selectionStart = textarea.selectionEnd = 0;
        textInput.focus();
      }

      if(indexFuncButton === 28){  // работа клавиши DEL
        //console.log(`Началось`)
        textarea.value = textarea.value.slice(0, cursorStart) + textarea.value.slice(cursorEnd+1); 
        textarea.selectionStart = textarea.selectionEnd = cursorStart// чтобы курсор не убегал
        textInput.focus();
      }

      if(indexFuncButton === 14){
        
        textarea.value = textarea.value.slice(0, cursorStart) + '  ' + textarea.value.slice(cursorEnd); //работает но только один раз потом курсор убегает

        //textarea.value = textarea.value.slice(0, cursorStart) + '\t' + textarea.value.slice(cursorEnd);
        textarea.selectionStart = textarea.selectionEnd = cursorEnd + 2 // чтобы курсор не убегал
        //textarea.selectionStart = textarea.selectionEnd  + '\t' // чтобы курсор не убегал

        textInput.focus();
      }
      if(indexFuncButton === 41){
        
        textarea.value = textarea.value.slice(0, cursorStart) + '\n' + textarea.value.slice(cursorEnd); //работает но только один раз потом курсор убегает

        textarea.selectionStart = textarea.selectionEnd = cursorEnd + 2 // чтобы курсор не убегал

        textInput.focus();
      }

    } else {


    //let currentText = textarea.value; // пока нигде не использую
    let letter = `${String.fromCharCode(abcKeys[codeKeyboard.indexOf(code)])}`;


    //textarea.value = textarea.value.setRangeText(letter, cursorStart, cursorEnd, "end")   //не работает

    textarea.value = textarea.value.slice(0, cursorStart) + letter + textarea.value.slice(cursorEnd); //работает но только один раз потом курсор убегает
    textInput.focus();
    textarea.selectionStart = textarea.selectionEnd = cursorEnd + 1 // чтобы курсор не убегал


    }


  }
})

*/



