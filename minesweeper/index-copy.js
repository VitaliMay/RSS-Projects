
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






// minePlacement()
// console.log(matrix)


// cell unit block item elem (ячейка клетка блок)

/************************************************************************ */

function start(){

  document.querySelector('body').innerHTML += `<main class="main"></main>`;
  document.querySelector('.main').innerHTML = `<h1 class="title">Minesweeper</h1>`;
  document.querySelector('.main').innerHTML += `<div class="wrapper-text"></div>`; // обёртка для ввода текста
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
    let block = `<div class="block" data=${mineJSON} "><div>${temp_bomb}</div></div>`;

    init = init + block;
  }

  /*формирую HTML*/

  document.querySelector('.playboard').innerHTML = init;

}

start()

/* получаю Node коллекцию блоков */
let matrixDoc = document.querySelectorAll('.block')

/* получаю координаты ячейки по клику */
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
    let temp_bomb = ''
    temp_bomb = matrix[coordinate.x][coordinate.y].mineNear
    if(matrix[coordinate.x][coordinate.y].mineHere) temp_bomb = '&#9785;';
    // незакрашенный флаг &#9872;
    // закрашенный флаг &#9873;
    // шлем с белым крестом &#9937;
    // закрашенный улыбающийся смайлик &#9787;
    // православный крест &#9766;
    // нахмуренный смайлик &#9785;

    /* Операции с открытой ячейкой */

    matrixDoc[coordinate.y*10 + coordinate.x].innerHTML = `${temp_bomb}`
    matrixDoc[coordinate.y*10 + coordinate.x].classList.add('open')

    /**************************************** */

    if(!matrix[coordinate.x][coordinate.y].mineNear)

    /**************************************** */
    // запоминаю в матрицу, координаты ячейки, которая открывалась
    matrix[coordinate.x][coordinate.y].mineOpen = true
    //console.log(matrix)
  })
})

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
    let qwer = JSON.parse(event.target.getAttribute("data"))
    console.log(qwer)
    if(event.target.matches('.block')) {
      //event.target.innerHTML = 'Bomb'
      //console.log('Нашли ячейку')
      event.target.classList.toggle('guess')
    }

  })



/************************************************************************************** */

/* Добавляю область для ввода текста */

//let str = 'EEE' опыты со строкой ввода
let str = '' //опыты со строкой ввода

function text() {
  //document.querySelector('.wrapper-text').innerHTML += `<textarea class="textarea" autofocus accesskey="s"></textarea>`;
  document.querySelector('.wrapper-text').innerHTML += `<textarea class="textarea" type="text" id="text-input" rows="6" cols="70" autofocus></textarea>`;
  //document.querySelector('.wrapper-text').innerHTML += `<textarea class="textarea" value="EEE" id="text-input" rows="6" cols="70" autofocus>${str}</textarea>`;
  //document.querySelector('.wrapper-text').innerHTML += `<textarea class="textarea" id="text-input" rows="6" cols="70" autofocus>${str}</textarea>`;
}

text()

/* Игры с языком */

let lang = document.getElementById('lang')
console.log(lang)

// let lang = document.querySelector('.lang')
// console.log(lang)
// lang.addEventListener("click", console.log(k));

// function changeLange() {
//   if (k === 0) {k = 1}
//     else{
//         k = 0
//       }
//       console.log(k)
// }

// btn_del.onclick = function clear () {
//   textarea.value = "";
// }

function changeLange () {
  if (k === 0) {k = 1}
    else{
        k = 0
      }
      console.log(`Переменная к = ${k}`)
}

//lang.addEventListener("click", console.log(k));

// if(indexFuncButton === 56){

//   console.log('Как поживает язык')
//   if (k === 0) {k = 1}else{
//     k = 0
//     start()
//     text()
//   }

// }



/* пробую сделать, чтобы не можно было возвращаться к вводу с виртуальной клавиатуры*/

let textInput = document.getElementById("text-input"); // это одно и тоже - переделать не успеваю
let textarea = document.querySelector('textarea'); // это одно и тоже - переделать не успеваю

let currentText = textarea.value;


// let cursorStart = textarea.selectionStart;
// let cursorEnd = textarea.selectionEnd;

//textInput.focus();

//let str = document.querySelector('.textarea').innerHTML


/******  работа клавиатуры *******************************************/

let flag = false // отлавливает Shift + Alt
document.onkeydown = (event) => {

  // console.log(event) надо было вытащить code ропущенного DEL

  if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') flag = true  // отлавливает Shift + Alt
  if (event.code == 'AltLeft' && flag || event.code === 'AltRight' && flag){ // отлавливает Shift + Alt
    flag = false // чтобы сработало только один раз
    console.log('Ура заработало')
  } // отлавливает Shift + Alt

  /* загнал в одну функцию, надо вешать слушатели, но не успеваю */
  document.querySelectorAll('.key').forEach(function (element) {
    element.classList.remove('active')
  })

 
  document.querySelector(`.key[data="${event.code}"]`).classList.add('active');
  textInput.focus();  // чтобы сразу вводило в форму
}


/*******  работа виртуальной клавиатуры    *********************************************************** */

document.querySelectorAll('.keyboard .key').forEach(function (element) {
  
  element.onclick = function(event){

    /******Ловлю переменную для смены языка***************************************************************************** */
    
    console.log(`Привет что-то ${element.innerHTML}---------------------`)

    if(element.innerHTML === 'lang') {
      console.log(`Тест на язык-----------------------------------------`)
      changeLange ()  // пока только меняет переменную 'k' при нажатии на 'lang'
      // start()
      // text()
    }

    /************************************************************************************************* */

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
        // console.log(`Началось`)

        // console.log(textarea.value)
        /*
        let letter = `${String.fromCharCode(abcKeys[codeKeyboard.indexOf(code)])}`;
        */

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
        // console.log(`И снова Началось`)

        // console.log(textarea.value)
        /*
        let letter = `${String.fromCharCode(abcKeys[codeKeyboard.indexOf(code)])}`;
        */


        textarea.value = textarea.value.slice(0, cursorStart) + '  ' + textarea.value.slice(cursorEnd); //работает но только один раз потом курсор убегает

        //textarea.value = textarea.value.slice(0, cursorStart) + '\t' + textarea.value.slice(cursorEnd);
        textarea.selectionStart = textarea.selectionEnd = cursorEnd + 2 // чтобы курсор не убегал
        //textarea.selectionStart = textarea.selectionEnd  + '\t' // чтобы курсор не убегал

        textInput.focus();
      }
      if(indexFuncButton === 41){
        // console.log(`И снова Началось`)

        // console.log(textarea.value)
        /*
        let letter = `${String.fromCharCode(abcKeys[codeKeyboard.indexOf(code)])}`;
        */


        textarea.value = textarea.value.slice(0, cursorStart) + '\n' + textarea.value.slice(cursorEnd); //работает но только один раз потом курсор убегает

        textarea.selectionStart = textarea.selectionEnd = cursorEnd + 2 // чтобы курсор не убегал

        textInput.focus();
      }

      


    } else {

    /* формирую массив нужных индексов */
    // console.log(`Индекс= ${codeKeyboard.indexOf(code)}`)
    // index.push(codeKeyboard.indexOf(code))
    // console.log(index)

    /* вводит текст в форму */

   // document.querySelector('.textarea').innerHTML += `${String.fromCharCode(abcKeys[codeKeyboard.indexOf(code)])}`; // работает только до переключения на основную клавиатуру
   //document.querySelector('.textarea').value += `${String.fromCharCode(abcKeys[codeKeyboard.indexOf(code)])}`; // работает
   //document.querySelector('.textarea').value += `${String.fromCharCode(abcKeys[codeKeyboard.indexOf(code)])}`;
   //textarea.value += `${String.fromCharCode(abcKeys[codeKeyboard.indexOf(code)])}`;
    //textInput.focus();

    //let currentText = textarea.value; // пока нигде не использую
    let letter = `${String.fromCharCode(abcKeys[codeKeyboard.indexOf(code)])}`;
    //textarea.value += letter;

    // let cursorStart = textarea.selectionStart;
    // let cursorEnd = textarea.selectionEnd;

    // console.log(cursorStart)
    // console.log(cursorEnd)

    //textarea.value = textarea.value.setRangeText(letter, cursorStart, cursorEnd, "end")   //не работает

    textarea.value = textarea.value.slice(0, cursorStart) + letter + textarea.value.slice(cursorEnd); //работает но только один раз потом курсор убегает
    textInput.focus();
    textarea.selectionStart = textarea.selectionEnd = cursorEnd + 1 // чтобы курсор не убегал


    }


  }
})



/* Две клавиши, комбинации клавиш */

// let flag = false
// document.onkeydown = function (event) {

// // codeKeyboard.push(event.code)
// console.log(event.code)
// // console.log(codeKeyboard)
//   // надо формировать event.code
//   if (event.code == 'AltLeft') flag = true
//   if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') flag = true
//   if (event.code == 'KeyN' && flag) {
//     flag = false // чтобы сработало только один раз
//     console.log('Ура заработало')}

// }



/* Две клавиши, комбинации клавиш */

// document.onkeydown = function (event) {
//   if (event.code == 'AltLeft') {
//     document.onkeyup = function (event) {
//       console.log(event)
//           if (event.code == 'KeyN') {
//             console.log('New version')
//           } 
//           else {
//             document.onkeydown = null
//           } 
//     }
//   }
// }



/* помогает сформировать массив charCode клавиш*/

// let rus = []

// document.onkeypress = function(event){
//   // console.log(event)
//   rus.push(event.charCode)
//   console.log(rus)
// }



