const score = `
Привет. Вроде как всё по ТЗ сделал)
Функционал не хуже, чем в демке. Может немного лучше :)
Дизайн, ну, тут на вкус и цвет... Черпал вдохновение в демке)
Score 60/60

`

console.log(score)

// подключаю плейлист
import { arrSong } from "./playList.js";
// import arrSong from "./playList.js";


const playBtn = document.querySelector('.btn--play');
const prevBtn = document.querySelector('.btn--prev');
const nextBtn = document.querySelector('.btn--next');
const timeDuration = document.querySelector('.time-duration')
const timeCurrent = document.querySelector('.time-current')
const progressBar = document.querySelector('.time-progress')
const timeLine = document.querySelector('.time-line')

const titleSinger = document.querySelector('.title-singer')
const titleSong = document.querySelector('.title-song')

const wrapper = document.querySelector('.wrapper')

const coverContent = document.querySelector('.cover-content')
// const playerContainer = document.querySelector('.cover-content')
const coverInner = document.querySelector('.cover-inner')
const playerContainer = document.querySelector('.player-container')


const audio = new Audio();



let isPlay = false;
let songNum = 0;
let currentSong = arrSong[songNum].src
// let currentSong = arrSong[songNum]
audio.src = currentSong;

audio.addEventListener('loadeddata', function() {
  timeDuration.innerHTML = `${timeFromSec(audio.duration)}`;

  titleSinger.innerHTML = `${arrSong[songNum].group}`;
  titleSong.innerHTML = `${arrSong[songNum].name}`;
  wrapper.style.backgroundImage =`url(${arrSong[songNum].cover})`
  coverContent.style.backgroundImage =`url(${arrSong[songNum].cover})`
  // playerContainer.style.backgroundImage =`url(${arrSong[songNum].cover})`

});

let playbackPosition = 0;

function playAudio() {

  audio.src = currentSong;
  audio.currentTime = playbackPosition;

   
//   audio.addEventListener('loadedmetadata', function() {
  audio.addEventListener('loadeddata', function() {
    // console.log(`Время песни: ${audio.duration} секунд`);
    // console.log(`Время песни: ${timeFromSec(audio.duration)} секунд`);
    timeDuration.innerHTML = `${timeFromSec(audio.duration)}`;
  });

  // audio.volume = 0.5;

  if (!isPlay) {
    isPlay = true;
    audio.play();
    playBtn.classList.add('pause');
  } else {
    isPlay = false;
    audio.pause();
    playBtn.classList.remove('pause');

    playbackPosition = audio.currentTime
  }
}

/************************************************* */
/***  Игры с адаптацией (сделал медиазапросами)*/

// checkScreenSize()

// function checkScreenSize() {
//   if (window.innerWidth >= window.innerHeight && window.innerHeight <= 599.8) {
//   // if (window.innerWidth >= window.innerHeight && (window.innerHeight <= 599.8 && window.innerHeight >= 450.8)) {
//   // if (window.innerWidth >= window.innerHeight && window.innerWidth <= 599.8) {
//   // if (window.innerWidth >= window.innerHeight && window.innerWidth <= 599.8 || window.innerHeight <= 599.8) {
//     // console.log('Screen width changed to:', window.innerWidth);
//     // coverInner.classList.add('cover-hidden')
//     playerContainer.style.maxWidth = `${window.innerHeight - 100}px`

//     console.log(playerContainer.offsetWidth, playerContainer.offsetHeight, window.innerHeight)
//     coverInner.classList.remove('cover-hidden')
//   } else {
//      if (window.innerHeight <= 449.8) {
//         coverInner.classList.add('cover-hidden')
//      }
//      if (window.innerHeight > 599.8) {
//         playerContainer.style.maxWidth = `600px`
//      }
//     // coverInner.classList.remove('cover-hidden')
    
//     //  coverInner.classList.add('cover-hidden')
//   }
// }


// function checkScreenSize() {
//   if (window.innerWidth >= window.innerHeight && window.innerHeight <= 599.8) {
//     // Установка стилей
//     playerContainer.style.maxWidth = `${window.innerHeight - 100}px`;
//     console.log(playerContainer.offsetWidth, playerContainer.offsetHeight, window.innerHeight);
    
//     // Управление классами
//     coverInner.classList.remove('cover-hidden');
//   } else {
//     // Управление классами
//     if (window.innerHeight <= 449.8) {
//       coverInner.classList.add('cover-hidden');
//       playerContainer.style.maxWidth = `600px`;
//     }
  
//     // Установка стилей
//     if (window.innerHeight > 599.8) {
//       playerContainer.style.maxWidth = `600px`;
//     }
//   }
// }

// window.addEventListener('resize', checkScreenSize);
// window.addEventListener('orientationchange', checkScreenSize);

/************************************************* */

// Обнуляю конец трека:

function savePlaybackPosition() {
  audio.currentTime = 0;
  playbackPosition = audio.currentTime;
  timeCurrent.innerHTML = '0:00'
  // playbackPosition = 0;
  // console.log(`Конец`)
  // playBtn.classList.remove('pause');
  titleSong.innerHTML = `${arrSong[songNum].name} - track playback finished`;
}


audio.addEventListener('ended', savePlaybackPosition);

/************************************************* */


// function prevSong(){
//   if (!songNum) { songNum = arrSong.length-1}
//   else {songNum--}
//   currentSong = arrSong[songNum].src
//   // if (isPlay) { // если песня играет, то пусть играет
//     isPlay = false;
//     playbackPosition = 0;
//     playAudio()
//   // }
//   // else {
//   //   audio.src = currentSong;
//   //   playbackPosition = 0;
//   //   audio.addEventListener('loadeddata', function() {
//   //     timeDuration.innerHTML = `${timeFromSec(audio.duration)}`;
//   //   });
//   // }
// }


function prevSong(){
  if (!songNum) { songNum = arrSong.length-1}
  else {songNum--}
  currentSong = arrSong[songNum].src
  if (isPlay) { // если песня играет, то пусть играет
    isPlay = false;
    playbackPosition = 0;
    playAudio()
  }
  else {
    audio.src = currentSong;
    playbackPosition = 0;
    audio.addEventListener('loadeddata', function() {
      timeDuration.innerHTML = `${timeFromSec(audio.duration)}`;
    });
  }
}



// function nextSong(){
//   // titleSinger.classList.add('hidden')  ///XXXXXXXXXXXXX

//   if (songNum === arrSong.length-1) { songNum = 0}
//   else {songNum++}
//   currentSong = arrSong[songNum].src
//   // if (isPlay) { // если песня играет, то пусть играет
//     isPlay = false;
//     playbackPosition = 0;
//     playAudio()

    
//   // } 
//   // else {
//   //   audio.src = currentSong;
//   //   playbackPosition = 0;
//   //   audio.addEventListener('loadeddata', function() {
//   //     timeDuration.innerHTML = `${timeFromSec(audio.duration)}`;

//   //     // setTimeout(() => {  ///XXXXXXXXXXXXX
//   //     //   titleSinger.innerHTML = `${arrSong[songNum].group}`;  ///XXXXXXXXXXXXX
//   //     //   titleSinger.classList.remove('hidden')  ///XXXXXXXXXXXXX
//   //     // }, 500);
      
//   //   });
//   // }
  
// }

function nextSong(){
  // titleSinger.classList.add('hidden')  ///XXXXXXXXXXXXX

  if (songNum === arrSong.length-1) { songNum = 0}
  else {songNum++}
  currentSong = arrSong[songNum].src
  if (isPlay) { // если песня играет, то пусть играет
    isPlay = false;
    playbackPosition = 0;
    playAudio()
  } 
  else {
    audio.src = currentSong;
    playbackPosition = 0;
    audio.addEventListener('loadeddata', function() {
      timeDuration.innerHTML = `${timeFromSec(audio.duration)}`;

      // setTimeout(() => {  ///XXXXXXXXXXXXX
      //   titleSinger.innerHTML = `${arrSong[songNum].group}`;  ///XXXXXXXXXXXXX
      //   titleSinger.classList.remove('hidden')  ///XXXXXXXXXXXXX
      // }, 500);
      
    });
  }
  
}

setInterval(() => {
  // меняю текущее время
  timeCurrent.textContent = timeFromSec(audio.currentTime);
  // заставляю бежать time-progress
  // progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  progressBar.style.width = `${audio.currentTime / audio.duration * 100}%`;

  playbackPosition = audio.currentTime
}, 100);


/*****Добавляю прокрутку по клику******************************* */

// Функция изменения текущего времени по событию на progress
// function timePointer() {
//   const stylesTimeLine = window.getComputedStyle(timeLine);  // получаю объект со всеми стилями
//   const timePoint = event.offsetX / parseInt(stylesTimeLine.width) * audio.duration;
//   audio.currentTime = timePoint;
// }

/********Добавляю работу для мобилок дополнительно к прокрутке и перетаскиванию**************************************** */

function timePointer() {
  const stylesTimeLine = window.getComputedStyle(timeLine);
  let offsetX;
  if (event.type === "touchmove" || event.type === "touchstart") {
    offsetX = event.touches[0].clientX - timeLine.getBoundingClientRect().left;
  } else {
    offsetX = event.offsetX;
  }
  const timePoint = offsetX / parseInt(stylesTimeLine.width) * audio.duration;
  audio.currentTime = timePoint;
}

/************************************************ */



timeLine.addEventListener("click", event => {
  // const stylesTimeLine = window.getComputedStyle(timeLine);  // получаю объект со всеми стилями
  // // console.log(stylesTimeLine.width)
  // // console.log(parseInt(stylesTimeLine.width))
  // // console.log(`точка клика = ${event.offsetX}`)
  // const timePoint = event.offsetX / parseInt(stylesTimeLine.width) * audio.duration;
  // audio.currentTime = timePoint;

  timePointer()
}, false);

/*****Добавляю перетаскивание **************************************/

// Сохраняем информацию о том, была ли нажата кнопка мыши
let isMouseDown = false;

// Добавляем слушатель события mousedown на элемент timeLine
timeLine.addEventListener("mousedown", e => {
  // Устанавливаем флаг, что кнопка мыши была нажата
  isMouseDown = true;
});

// Добавляем слушатель события mousemove на элемент timeLine
timeLine.addEventListener("mousemove", event => {
  // Проверяем, была ли нажата кнопка мыши
  if (isMouseDown) {
    timePointer()
  }
});

// Добавляем слушатель события mouseup на элемент timeline
timeLine.addEventListener("mouseup", e => {
  // Сбрасываем флаг, указывающий на то, что кнопка мыши не нажата
  isMouseDown = false;
});

/*******для мобилок*************************************** */

timeLine.addEventListener("touchstart", event => {
  isMouseDown = true;
  timePointer();
});

timeLine.addEventListener("touchmove", event => {
  if (isMouseDown) {
    event.preventDefault(); // предотвращаем прокрутку страницы
    timePointer();
  }
});

timeLine.addEventListener("touchend", e => {
  isMouseDown = false;
});

/************************************** */
/************************************** */



playBtn.addEventListener('click', playAudio);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);


/*************************************************** */
// Преобразую секунды в часы и минуты

function timeFromSec(sec) {
    let second = Math.floor(sec);
    let minute = Math.floor(sec/60).toString();
    let hour = Math.floor(sec/(60*60));
    second = (second % 60).toString();

    if (hour === 0) return `${minute}:${second.padStart(2, 0)}`;
    if (hour !== 0) return `${hour.toString().padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(2, '0')}`;
}


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


