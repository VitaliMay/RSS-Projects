const score = `
Привет. Вроде как всё по ТЗ сделал)
Функционал не хуже, чем в демке. Может немного лучше :)
Дизайн, ну, тут на вкус и цвет... Черпал вдохновение в демке)
Score 60/60

`

console.log(score)

// подключаю плейлист
import { arrSong } from "./playList.js";

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

const cover = document.querySelector('.cover') // для перелистывания

const coverContent = document.querySelector('.cover-content')

const audio = new Audio();

let isPlay = false;
let songNum = 0;
let currentSong = arrSong[songNum].src

audio.src = currentSong;

audio.addEventListener('loadeddata', function() {
  timeDuration.textContent = `${timeFromSec(audio.duration)}`;

  updateSongInfo()  // обновление информации о треке
});

let playbackPosition = 0;

function playAudio() {

  audio.src = currentSong;
  audio.currentTime = playbackPosition;

   
//   audio.addEventListener('loadedmetadata', function() {
  audio.addEventListener('loadeddata', function() {
    // console.log(`Время песни: ${audio.duration} секунд`);
    // console.log(`Время песни: ${timeFromSec(audio.duration)} секунд`);
    timeDuration.textContent = `${timeFromSec(audio.duration)}`;
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
/************************************************* */
// Обнуляю конец трека: (Сейчас не использую. Надо при проигрывании одного трека)

function savePlaybackPosition() {
  audio.currentTime = 0;
  playbackPosition = audio.currentTime;
  timeCurrent.textContent = '0:00'
  // playbackPosition = 0;
  // console.log(`Конец`)
  // playBtn.classList.remove('pause');
  titleSong.textContent = `${arrSong[songNum].name} - track playback finished`;
}

/* Проигрываю только один трек */
// audio.addEventListener('ended', savePlaybackPosition);

/*************************************************************************** */
/* Проигрываю треки по кругу */
audio.addEventListener('ended', nextSong);

/************************************************* */


function prevSong(){
  if (!songNum) { songNum = arrSong.length-1}
  else {songNum -= 1}
  currentSong = arrSong[songNum].src;
  updateSongInfo(); // обновление информации о песне (для работы на мобиле Safari)

  if (isPlay) {
    isPlay = false;
    playbackPosition = 0;
    playAudio();
  } else {
    audio.src = currentSong;
    playbackPosition = 0;
    audio.addEventListener('loadeddata', function() {
      timeDuration.textContent = `${timeFromSec(audio.duration)}`;
    });
  }
}


function nextSong(){
  if (songNum === arrSong.length - 1) { songNum = 0}
  else {songNum += 1}
  currentSong = arrSong[songNum].src;
  updateSongInfo(); // обновление информации о песне (для работы на мобиле Safari)
  if (isPlay) {
    isPlay = false;
    playbackPosition = 0;
    playAudio();
  } else {
    audio.src = currentSong;
    playbackPosition = 0;
    audio.addEventListener('loadeddata', function() {
      timeDuration.textContent = `${timeFromSec(audio.duration)}`;
    });
  }
}

function updateSongInfo() {
  titleSinger.textContent = `${arrSong[songNum].group}`;
  titleSong.textContent = `${arrSong[songNum].name}`;
  wrapper.style.backgroundImage =`url(${arrSong[songNum].cover})`;
  coverContent.style.backgroundImage =`url(${arrSong[songNum].cover})`;
}

/*************************************************************** */

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

function timePointer(event) {
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



timeLine.addEventListener("click", timePointer, {passive: false});
// timeLine.addEventListener("click", event => {
//   timePointer(event)
// }, {passive: false});



/*****Добавляю перетаскивание **************************************/

// Сохраняем информацию о том, была ли нажата кнопка мыши
let isMouseDown = false;

// Добавляем слушатель события mousedown на элемент timeLine
timeLine.addEventListener("mousedown", event => {
  // Устанавливаем флаг, что кнопка мыши была нажата
  isMouseDown = true;
});

// Добавляем слушатель события mousemove на элемент timeLine
timeLine.addEventListener("mousemove", event => {
  // Проверяем, была ли нажата кнопка мыши
  if (isMouseDown) {
    timePointer(event)
  }
});

// Добавляем слушатель события mouseup на элемент timeline
timeLine.addEventListener("mouseup", event => {
  // Сбрасываем флаг, указывающий на то, что кнопка мыши не нажата
  isMouseDown = false;
});

/*******для мобилок*************************************** */

timeLine.addEventListener("touchstart", event => {
  isMouseDown = true;
  timePointer(event);
}, {passive: false});

timeLine.addEventListener("touchmove", event => {
  if (isMouseDown) {
    // event.preventDefault(); // предотвращаем прокрутку страницы
    timePointer(event);
  }
}, {passive: false});

timeLine.addEventListener("touchend", event => {
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


/************************************************** */
/**********    свайп на мобилках  ************* */

// чтобы не появлялось контекстное меню при длительном таче
// cover.addEventListener('contextmenu', function (event) {
wrapper.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});


function createTouchHandler() {    // добавляю замыкание, чтобы избежать глобальных переменных
  let xStart = null;
  let swipe = null;

  return function handleTouch(event) {
    const touch = event.touches[0];

    if (event.type === 'touchstart') {
      xStart = touch.clientX;
    }

    if (event.type === 'touchmove' && xStart !== null) {
      let xMove = touch.clientX;
      swipe = xMove - xStart;

      if (swipe < 0) {
        nextSong();
      }
      if (swipe > 0) {
        prevSong();
      }
      xStart = null;
      swipe = null;
    }
  };
}

const handleTouch = createTouchHandler(); // чтобы работало замыкание и не было глобальных переменных

cover.addEventListener('touchstart', handleTouch, { passive: false });
cover.addEventListener('touchmove', handleTouch, { passive: true });




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


