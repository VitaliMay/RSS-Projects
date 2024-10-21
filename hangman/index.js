
//let rusKeys = [1105, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 1081, 1094, 1091, 1082, 1077, 1085, 1075, 1096, 1097, 1079, 1093, 1098, 1092, 1099, 1074, 1072, 1087, 1088, 1086, 1083, 1076, 1078, 1101, 92, 1103, 1095, 1089, 1084, 1080, 1090, 1100, 1073, 1102, 46]

let abcKeys = [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, '', ' ', 113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 92, 91, 93, '', '', 97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39, '', '', 122, 120, 99, 118, 98, 110, 109, 44, 46, 47, '', '', '', '', '', ' ', '', '', '', '', '']
let codeKeyboard = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'Backslash', 'BracketLeft', 'BracketRight', "Delete",'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight']
let funcButtonIndexArr = [13, 14, 28, 29, 41, 42, 53, 54, 55, 56, 57, 59, 60, 61, 62, 63]


function start(){

  document.querySelector('body').innerHTML += `<main class="main"></main>`;
  document.querySelector('.main').innerHTML = `<h1 class="title">Virtual Keyboard</h1>`;
  document.querySelector('.main').innerHTML += `<div class="wrapper-text"></div>`; // обёртка для ввода текста
  document.querySelector('.main').innerHTML += `<div class="keyboard"></div>`;

  let init = '';
  for (let i = 0; i < codeKeyboard.length; i++){

    let addDiv = `<div class="key" data="${codeKeyboard[i]}">` + String.fromCharCode(abcKeys[i]).toUpperCase() +'</div>';

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
      addDiv = `<div class="key" data="${codeKeyboard[i]}">Win</div>`;
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

let str = '' //опыты со строкой ввода

function text() {
  document.querySelector('.wrapper-text').innerHTML += `<textarea class="textarea" type="text" id="text-input" rows="6" cols="70" autofocus></textarea>`;
}

text()

/* пробую сделать, чтобы не можно было возвращаться к вводу с виртуальной клавиатуры*/

let textInput = document.getElementById("text-input"); // это одно и тоже - переделать не успеваю
let textarea = document.querySelector('textarea'); // это одно и тоже - переделать не успеваю

let currentText = textarea.value;



//let str = document.querySelector('.textarea').innerHTML


/******  работа клавиатуры *******************************************/

let flag = false // отлавливает Shift + Alt  реализовать переключение не успеваю
let flagCapsLock = false


document.onkeydown = (event) => {

  // console.log(event) надо было вытащить code ропущенного DEL

  /* Чтобы CapsLock работал и с клавой и с виртуалом вперемешку */
  if (event.code === 'CapsLock'){
    if (flagCapsLock === false){ flagCapsLock = true }
    else { flagCapsLock = false }
  }


  if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') flag = true  // отлавливает Shift + Alt
  if (event.code == 'AltLeft' && flag || event.code === 'AltRight' && flag){ // отлавливает Shift + Alt
    flag = false // чтобы сработало только один раз
    console.log('Ура заработало')
  } // отлавливает Shift + Alt

  /* загнал в одну функцию, надо вешать слушатели, но не успеваю */
  document.querySelectorAll('.key').forEach(function (element) {
    element.classList.remove('active')
  })

  /*Надо написать что-то персональное для табуляции*/
  /************************************************ */
  /************************************************ */


  document.querySelector(`.key[data="${event.code}"]`).classList.add('active');
  textInput.focus();  // чтобы сразу вводило в форму
}


/*******  работа виртуальной клавиатуры    *********************************************************** */

document.querySelectorAll('.keyboard .key').forEach(function (element) {

  element.onclick = function(event){



    document.querySelectorAll('.keyboard .key').forEach(function (element) {

      element.classList.remove('active')
    });

    let code = this.getAttribute('data')
    this.classList.add('active')
    //console.log(code)


    let cursorStart = textarea.selectionStart;
    let cursorEnd = textarea.selectionEnd;

    // console.log(cursorStart)
    // console.log(cursorEnd)

    let indexFuncButton = codeKeyboard.indexOf(code)

    /** работа функциональных клавиш */

    if (funcButtonIndexArr.includes(indexFuncButton)){
      console.log(`Начинаются мучения`)
      console.log(`Индекс= ${codeKeyboard.indexOf(code)}`)

      if(indexFuncButton === 13){  /* клавиша Backspace */

        //if (cursorStart === 0) cursorStart = cursorEnd = 1;
        /*if (cursorStart === 0) cursorStart = 1;
        textarea.value = textarea.value.slice(0, cursorStart-1) + textarea.value.slice(cursorEnd); 

        textarea.selectionStart = textarea.selectionEnd = cursorEnd - 1 // чтобы курсор не убегал
        if (textarea.selectionStart < 0 || textarea.selectionEnd < 0) textarea.selectionStart = textarea.selectionEnd = 0;
        textInput.focus();*/

        if (cursorStart === 0){
          textInput.focus();
        }
        if (cursorStart > 0){
          textarea.value = textarea.value.slice(0, cursorStart-1) + textarea.value.slice(cursorEnd);
          textarea.selectionStart = textarea.selectionEnd = cursorEnd - 1
          textInput.focus();
        }
      }

      if (indexFuncButton === 28){  // работа клавиши DEL
        //console.log(`Началось`)
        textarea.value = textarea.value.slice(0, cursorStart) + textarea.value.slice(cursorEnd+1); 
        textarea.selectionStart = textarea.selectionEnd = cursorStart// чтобы курсор не убегал
        textInput.focus();
      }

      if (indexFuncButton === 14){  // работа клавиши tab

        textarea.value = textarea.value.slice(0, cursorStart) + '  ' + textarea.value.slice(cursorEnd); 

        //textarea.value = textarea.value.slice(0, cursorStart) + '\t' + textarea.value.slice(cursorEnd);
        textarea.selectionStart = textarea.selectionEnd = cursorEnd + 2 // чтобы курсор не убегал
        //textarea.selectionStart = textarea.selectionEnd  + '\t' // чтобы курсор не убегал

        textInput.focus();
      }

      if (indexFuncButton === 41){ // работа клавиши Enter

        textarea.value = textarea.value.slice(0, cursorStart) + '\n' + textarea.value.slice(cursorEnd);

        textarea.selectionStart = textarea.selectionEnd = cursorEnd + 2 // чтобы курсор не убегал

        textInput.focus();
      }
      if(indexFuncButton === 42 || indexFuncButton === 54){ // работа Shift
        flag = true
      }

      
      if(indexFuncButton === 29){ // работа CapsLock 
        if (flagCapsLock === false) {
          //flagCapsLock = 'Бред'
          flagCapsLock = true
          console.log('Почему?')
          console.log(event)
          console.log(flagCapsLock)
        } else{
          flagCapsLock = false
          console.log(flagCapsLock)
        }
        
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
      //let letter = `${String.fromCharCode(abcKeys[codeKeyboard.indexOf(code)])}`; работает
      //textarea.value += letter;

      // let cursorStart = textarea.selectionStart;
      // let cursorEnd = textarea.selectionEnd;

      // console.log(cursorStart)
      // console.log(cursorEnd)

      //textarea.value = textarea.value.setRangeText(letter, cursorStart, cursorEnd, "end")   //не работает
      if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') flag = true
      /* вводит текст в форму */

      let letter = `${String.fromCharCode(abcKeys[codeKeyboard.indexOf(code)])}`;

      if (flagCapsLock) letter = letter.toUpperCase(); // пытаюсь заставить работать CapsLock - ура заработал

      //if (flag) letter = letter.toUpperCase(); // игры с shift

      if (flag) { // заработал shift учитывая capslock
        if (flagCapsLock) {
          console.log (flag)
          console.log (flagCapsLock)
          letter = letter.toLowerCase();}
        if (!flagCapsLock) letter = letter.toUpperCase(); // игры с shift
      }
      flag = false

      
      textarea.value = textarea.value.slice(0, cursorStart) + letter + textarea.value.slice(cursorEnd);

      textInput.focus();
      textarea.selectionStart = textarea.selectionEnd = cursorEnd + 1 // чтобы курсор не убегал


    }


  }
})


/* помогает сформировать массив charCode клавиш*/

let rus = []
// [1081, 1094, 1091, 1082, 1077, 1085, 1075, 1096, 1097, 1079] // Первый ряд

document.onkeypress = function(event){
  // console.log(event)
  rus.push(event.charCode)
  console.log(rus)
}



