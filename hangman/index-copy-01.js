
const note = `
Привет. Сорри, за кривую, мягко говоря незаконченную работу.
Пятый день с температурой больше 38. Всё в тумане(
Если будет возможность, проверь, плиз в последний день кросс-чека.
Может приду в себя - соберу, приведу в порядок разрозненные детали.
А так, клавиатура работает, висельник крутится,  
загадки задаются из local storage не повторяются, 
но ходят по кругу когда заканчиваются
(alert предупредит, специально сделал для удобства тестирования).
В общем, спасибо за понимание. Удачи и здоровья

Немного доделал. Не реагирует на язык. Добавил подобие адаптива.
Textarea оставил чтобы показать как работает клавиатура. Не реагирует
на повторное нажатие. Обидно, конечно, заваливать таск. 
Там делов то на пару часов ясного сознания. Но всё бывает(
`
console.log(note)
/**************************************************************** */
/**************************************************************** */

// console.log(qwer)


let abc = [
  [113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 97, 115, 100, 102, 103, 104, 106, 107, 108, 122, 120, 99, 118, 98, 110, 109, ],
  [1105, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 1081, 1094, 1091, 1082, 1077, 1085, 1075, 1096, 1097, 1079, 1093, 1098, 1092, 1099, 1074, 1072, 1087, 1088, 1086, 1083, 1076, 1078, 1101, 92, 1103, 1095, 1089, 1084, 1080, 1090, 1100, 1073, 1102, 46]
]

let k = 0 // переменная переключения языка

let rusKeys = [1105, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 1081, 1094, 1091, 1082, 1077, 1085, 1075, 1096, 1097, 1079, 1093, 1098, 1092, 1099, 1074, 1072, 1087, 1088, 1086, 1083, 1076, 1078, 1101, 92, 1103, 1095, 1089, 1084, 1080, 1090, 1100, 1073, 1102, 46]

let abcKeys = [113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 97, 115, 100, 102, 103, 104, 106, 107, 108, 122, 120, 99, 118, 98, 110, 109, ]
let codeKeyboard = ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', ]

// let funcButtonIndexArr = [13, 14, 28, 29, 41, 42, 53, 54, 55, 56, 57, 59, 60, 61, 62, 63]


function start(){

  document.querySelector('body').innerHTML += `<main class="main"></main>`;
  document.querySelector('.main').innerHTML = `<h1 class="title">Hangman game</h1>`;

  document.querySelector('.main').innerHTML += `<div class="hangImg"></div>`;
  document.querySelector('.main').innerHTML += `<div class="hangRiddle"></div>`;
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
  // console.log(`Длина клавиатуры = ${codeKeyboard.length}`)

  let init = '';
  for (let i = 0; i < codeKeyboard.length; i++){

    let addDiv = `<div class="key" data="${codeKeyboard[i]}">` + String.fromCharCode(abc[k][i]) +'</div>';

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
  document.querySelector('.wrapper-text').innerHTML += `<textarea class="textarea" type="text" id="text-input" rows="6" cols="70" autofocus></textarea>`;
}

text()

/* пробую сделать, чтобы не можно было возвращаться к вводу с виртуальной клавиатуры*/

let textInput = document.getElementById("text-input"); // это одно и тоже - переделать не успеваю
let textarea = document.querySelector('textarea'); // это одно и тоже - переделать не успеваю

let currentText = textarea.value;

/******  работа клавиатуры *******************************************/

let flag = false // отлавливает Shift + Alt

// document.onkeydown = (event) => {
//   /* загнал в одну функцию, надо вешать слушатели, но не успеваю */
//   document.querySelectorAll('.key').forEach(function (element) {
//     element.classList.remove('active')
//   })
//   document.querySelector(`.key[data="${event.code}"]`).classList.add('active');
//   textInput.focus();  // чтобы сразу вводило в форму
// }

let letterHang = '';
const keyboard = document.querySelectorAll('.key');

document.addEventListener('keydown', function(event) {
  const keyElement = document.querySelector(`.key[data="${event.code}"]`);
  if (codeKeyboard.includes(event.code) && !keyElement.classList.contains('active')) {
    event.preventDefault(); // чтобы не вводило две буквы
    // keyboard.forEach(function (element) {
    // // document.querySelectorAll('.key').forEach(function (element) {
    //   element.classList.remove('active')
    // })
    keyElement.classList.add('active');
    // document.querySelector(`.key[data="${event.code}"]`).classList.add('active');
    const englishKey = engLayout[event.code];
    letterHang = englishKey;

    textInput.focus();  // чтобы сразу вводило в форму

    textInput.value += englishKey;

    // Здесь можно разместить код, который будет выполняться при нажатии буквенной клавиши
    console.log('Нажата буквенная клавиша: ' + event.key);
    console.log('Нажата клавиша: ' + event.code);
    console.log('Нажата клавиша Английская: ' + englishKey);
    console.log('Выбрана буква Английская: ' + letterHang);
  } 
  // } else {alert('ОШИБКА ВВОДА, такой Eng буквы нет')}
});


// function checkLetter() {

// }
/*******  работа виртуальной клавиатуры    *********************************************************** */

// document.querySelectorAll('.keyboard .key').forEach(function (element) {


document.querySelectorAll('.key').forEach(function (element) {
  element.onclick = function(event){

    // keyboard.forEach(function (element) {
    // // document.querySelectorAll('.key').forEach(function (element) {
    // // document.querySelectorAll('.keyboard .key').forEach(function (element) {

    //   element.classList.remove('active')
    // });

    let code = this.getAttribute('data')
    const englishKey = engLayout[code];

    this.classList.add('active')

    let cursorStart = textarea.selectionStart;
    let cursorEnd = textarea.selectionEnd;

    let letter = englishKey;
    // let letter = `${String.fromCharCode(abcKeys[codeKeyboard.indexOf(code)])}`;

    textarea.value = textarea.value.slice(0, cursorStart) + letter + textarea.value.slice(cursorEnd); //работает но только один раз потом курсор убегает
    textInput.focus();
    textarea.selectionStart = textarea.selectionEnd = cursorEnd + 1 // чтобы курсор не убегал

  }
})


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
  // console.log(randomRiddleIndex)
  const { riddle, answer } = memoryLocalTest.getScore()[randomRiddleIndex];
  // const { riddle, answer } = data[randomRiddleIndex];
  // console.log(riddle)
  // console.log(answer)

  // if you want to live, guess the riddle
  const hangRiddleWrapper = document.querySelector('.hangRiddle');
  // hangRiddleWrapper.innerText = `RIDDLE: ${riddle}`;
  hangRiddleWrapper.innerText = riddle;

  const hangWordWrapper = document.querySelector('.hangWord');
  for (let i = 0; i < answer.length; i += 1) {
    const div = document.createElement('div');
    div.classList.add(`hangWord__letter`);
    div.innerText = answer[i];
    hangWordWrapper.appendChild(div);
  }



// const memoryLocalTest = new MemoryStore();
// console.log(memoryLocalTest.getScore()[0])
// const indexToRemove = 0; // Пример индекса, который нужно удалить
memoryLocalTest.deleteScore(randomRiddleIndex);
