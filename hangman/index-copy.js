
/**************************************************************** */
  /**************************************************************** */
  // подключаю модуль
  // import data from "./products";
  console.log(data)
  /**************************************************************** */
  /**************************************************************** */



let abc = [
  [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, '', ' ', 113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 92, 91, 93, '', '', 97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39, '', '', 122, 120, 99, 118, 98, 110, 109, 44, 46, 47, '', '', '', '', '', ' ', '', '', '', '', ''],
  [1105, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 1081, 1094, 1091, 1082, 1077, 1085, 1075, 1096, 1097, 1079, 1093, 1098, 1092, 1099, 1074, 1072, 1087, 1088, 1086, 1083, 1076, 1078, 1101, 92, 1103, 1095, 1089, 1084, 1080, 1090, 1100, 1073, 1102, 46]
]
let k = 0

let rusKeys = [1105, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 1081, 1094, 1091, 1082, 1077, 1085, 1075, 1096, 1097, 1079, 1093, 1098, 1092, 1099, 1074, 1072, 1087, 1088, 1086, 1083, 1076, 1078, 1101, 92, 1103, 1095, 1089, 1084, 1080, 1090, 1100, 1073, 1102, 46]


//let abcKeys = [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, '', ' ', 113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 92, 91, 93, '', 97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39, '', '', 122, 120, 99, 118, 98, 110, 109, 44, 46, 47, '', '', '', '', '', ' ', '', '', '', '', '']
let abcKeys = [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, '', ' ', 113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 92, 91, 93, '', '', 97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39, '', '', 122, 120, 99, 118, 98, 110, 109, 44, 46, 47, '', '', '', '', '', ' ', '', '', '', '', '']
// let codeKeyboard = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'Backslash', 'BracketLeft', 'BracketRight', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight']
let codeKeyboard = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'Backslash', 'BracketLeft', 'BracketRight', "Delete",'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight']
//let funcButtonIndexArr = [13, 14, 28, 40, 41, 52, 53, 54, 55, 56, 58, 59, 60, 61, 62]
let funcButtonIndexArr = [13, 14, 28, 29, 41, 42, 53, 54, 55, 56, 57, 59, 60, 61, 62, 63]

// позиция пробела 57 он и так работает 
//let index = [13, 14, 28, 40, 41, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62]


function start(){

  document.querySelector('body').innerHTML += `<main class="main"></main>`;
  document.querySelector('.main').innerHTML = `<h1 class="title">Hangman game</h1>`;

  document.querySelector('.main').innerHTML += `<div class="hangImg"></div>`;
  document.querySelector('.main').innerHTML += `<div class="hangWord"></div>`;

  document.querySelector('.main').innerHTML += `<div class="wrapper-text"></div>`; // обёртка для ввода текста
  document.querySelector('.main').innerHTML += `<div class="keyboard"></div>`;

  /**** Рисую картинку ******************************************** */

  const hangImgWrapper = document.querySelector('.hangImg');
  const div = document.createElement('div');
  div.classList.add(`hangImgMen`);
  div.classList.add(`hangImgMen_position`)
  hangImgWrapper.appendChild(div);

  const hangImgMen = document.querySelector('.hangImgMen');
  for (let i = 1; i <= 6; i += 1) {
    const div = document.createElement('div');
    div.classList.add(`hangImgMen__item`);
    div.classList.add(`hangImgMen__item_${i}`);
    hangImgMen.appendChild(div);
  }
  // const hangImgWrapper = document.querySelector('.hangImg');
  
  // for (let i = 1; i <= 6; i += 1) {
  //   const div = document.createElement('div');
  //   div.classList.add(`hangImg__item`);
  //   div.classList.add(`hangImg__item_${i}`);
  //   hangImgWrapper.appendChild(div);
  //   console.log(i)
  // }

  // const memoryLocalTest = new MemoryStore();
  // const randomRiddleIndex = Math.floor(Math.random() * memoryLocalTest.getScore().length)
  // // const randomRiddleIndex = Math.floor(Math.random() * data.length)
  // console.log(randomRiddleIndex)
  // const { riddle, answer } = memoryLocalTest.getScore()[randomRiddleIndex];
  // // const { riddle, answer } = data[randomRiddleIndex];
  // console.log(riddle)
  // console.log(answer)

  // const hangWordWrapper = document.querySelector('.hangWord');
  // for (let i = 0; i < answer.length; i += 1) {
  //   const div = document.createElement('div');
  //   div.classList.add(`hangWord__letter`);
  //   div.innerText = answer[i];
  //   hangWordWrapper.appendChild(div);
  // }
  /************************************************************************** */

  let init = '';
  for (let i = 0; i < codeKeyboard.length; i++){

    // let addDiv = `<div class="key" data="${codeKeyboard[i]}">` + String.fromCharCode(abcKeys[i]) +'</div>';  рабочий вариант
    let addDiv = `<div class="key" data="${codeKeyboard[i]}">` + String.fromCharCode(abc[k][i]) +'</div>';

    if (i === 13){
      addDiv = `<div class="key add-key" data="${codeKeyboard[i]}">Backspace</div>`;
    }
    if (i === 14){
      addDiv = `<div class="key" data="${codeKeyboard[i]}">Tab</div>`;
    }
    if (i === 25){
      addDiv = `<div class="key" data="${codeKeyboard[i]}">${String.fromCharCode(abcKeys[i])}</div>`;
    }
    if (i === 28){
      addDiv = `<div class="key" data="${codeKeyboard[i]}">Del</div>`;
    }
    if (i === 29){
      addDiv = `<div class="key capslock-key" data="${codeKeyboard[i]}">Caps Lock</div>`;
    }
    if (i === 41){
      addDiv = `<div class="key enter-key" data="${codeKeyboard[i]}">Enter</div>`;
    }
    if (i === 42){
      addDiv = `<div class="key shift-key" data="${codeKeyboard[i]}">Shift</div>`;
    }
    if (i === 53){
      addDiv = `<div class="key" data="${codeKeyboard[i]}">Up</div>`;
    }
    if (i === 54){
      addDiv = `<div class="key shift-key--small" data="${codeKeyboard[i]}">Shift</div>`;
    }

    /*формирую нижний ряд клавиатуры*/
    if (i === 55){
      addDiv = `<div class="key shift-key--small" data="${codeKeyboard[i]}">Ctrl</div>`;
    }
    if (i === 56){
      addDiv = `<div class="key lang" id="lang" data="${codeKeyboard[i]}">lang</div>`;
    }
    if (i === 57){
      addDiv = `<div class="key" data="${codeKeyboard[i]}">Alt</div>`;
    }
    if (i === 58){
      addDiv = `<div class="key space-key" data="${codeKeyboard[i]}">Space</div>`;
    }
    if (i === 59){
      addDiv = `<div class="key" data="${codeKeyboard[i]}">Alt</div>`;
    }
    if (i === 60){
      addDiv = `<div class="key shift-key--small" data="${codeKeyboard[i]}">Ctrl</div>`;
    }
    if (i === 61){
      addDiv = `<div class="key shift-key--small" data="${codeKeyboard[i]}">Left</div>`;
    }
    if (i === 62){
      addDiv = `<div class="key" data="${codeKeyboard[i]}">Down</div>`;
    }
    if (i === 63){
      addDiv = `<div class="key shift-key--small" data="${codeKeyboard[i]}">Right</div>`;
    }

    init = init + addDiv;
  }

  /*формирую HTML*/

  document.querySelector('.keyboard').innerHTML = init;

}

start()

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
    
    // console.log(`Привет что-то ${element.innerHTML}---------------------`)

    if(element.innerHTML === 'lang') {
      // console.log(`Тест на язык-----------------------------------------`)
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


/******* Создаю класс для работы с Local Storage ***************************** */
/******* Создаю класс для работы с Local Storage ***************************** */



class MemoryStore {
  constructor() {
    this.localKey = 'VitaliMay_game_Hangman';
  }

  getScore() {
    const localData = localStorage.getItem(this.localKey);
    if (localData) {
      return JSON.parse(localData);
    } else {
      return data;
    }
  }

  updateScore(newData) {
    if (newData.length === 0) {
      localStorage.setItem(this.localKey, JSON.stringify(data));

    // Проверка на то, что показаны все вопросы из data
      if (JSON.stringify(this.getScore()) === JSON.stringify(data)) {
        setTimeout(function() {
          alert('Сейчас будет задан последний вопрос и вопросы начнут повторяться, идем на новый круг');
        }, 0);
      }
    
    } else {
      localStorage.setItem(this.localKey, JSON.stringify(newData));
    }
  }

  deleteScore(index) {
    let memoryLocal = this.getScore();
    memoryLocal.splice(index, 1); // Удалить элемент по указанному индексу
    this.updateScore(memoryLocal);
  }
}


  const memoryLocalTest = new MemoryStore();
  // if (memoryLocalTest.getScore().length === 0) {
  //   alert('Закончились вопросы, что пойти на новый круг очисти local storage')
  //   // console.log('Закончились вопросы, что пойти на новый круг очисти local storage')
  // }
  const randomRiddleIndex = Math.floor(Math.random() * memoryLocalTest.getScore().length)
  // const randomRiddleIndex = Math.floor(Math.random() * data.length)
  console.log(randomRiddleIndex)
  const { riddle, answer } = memoryLocalTest.getScore()[randomRiddleIndex];
  // const { riddle, answer } = data[randomRiddleIndex];
  console.log(riddle)
  console.log(answer)

  const hangWordWrapper = document.querySelector('.hangWord');
  for (let i = 0; i < answer.length; i += 1) {
    const div = document.createElement('div');
    div.classList.add(`hangWord__letter`);
    div.innerText = answer[i];
    hangWordWrapper.appendChild(div);
  }



// const memoryLocalTest = new MemoryStore();
// console.log(memoryLocalTest.getScore()[0])
const indexToRemove = 0; // Пример индекса, который нужно удалить
memoryLocalTest.deleteScore(randomRiddleIndex);
