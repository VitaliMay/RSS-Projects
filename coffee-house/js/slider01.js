
const slider = document.querySelector('.slider');
const sliderScreen = slider.querySelector('.slider-inner');
const sliderStrip = slider.querySelector('.slider-strip');
const sliderPgArr = [...document.querySelectorAll('.slider-pg__item')];

// console.log(`Привет новая версия`)

let slideNumber = 0; // порядковый номер слайда
let sliderWidth = sliderScreen.clientWidth; // узнаю ширину слайда

let sliderInterval; // переменная для обозначения интервала
// startSliderInterval(); // Запуск интервала при загрузке страницы

// console.log(`sliderWidth = ${sliderWidth}`)

/************************************************ */
/************************************************ */

sliderScreen.addEventListener('touchstart', hangleTouchStart, false)
sliderScreen.addEventListener('touchmove', hangleTouchMove, false)
sliderScreen.addEventListener('touchend', hangleTouchEnd, false)
sliderScreen.addEventListener('touchcancel', hangleTouchEnd, false)

function hangleTouchStart (event) {
  // console.log(event)
  const touchStart = event.touches[0];
  // console.log(touchStart)
  xStart = touchStart.clientX
  // console.log(xStart)

  sliderPgArr.forEach(item => item.classList.add('pauseAnimation'));
}
function hangleTouchMove (event) {
  if (!xStart) { return };
  let xMove = event.touches[0].clientX
  // console.log(xMove)
  swipe = xMove - xStart

  if (swipe > 0) {
    // stopSliderInterval();
    sliderGoLeft();
    // startSliderInterval();
    sliderPgAnime(slideNumber)
  }
  if (swipe < 0) {
    // stopSliderInterval();
    sliderGoRight();
    // sliderStrip.classList.remove('stopAnimation');
    sliderPgAnime(slideNumber)

    // startSliderInterval();
  }
  xStart = null; // начальная переменная для перетаскивания
  swipe = null;
}

let xStart = null; // начальная переменная для перетаскивания
let swipe = null; // для определения направления движения

function hangleTouchEnd () {
  // console.log(event)
  // console.log(touchStart)
  // console.log(xStart)

  sliderPgArr.forEach(item => item.classList.remove('pauseAnimation'));
}


/******************************************************** */
/******************************************************** */
/**      Новая версия                           ******** */

// const sliderProgressContainer = document.querySelector('.slider-pg')
// const sliderProgressActive = document.querySelector('.slider-pg__item--active')
// console.log(sliderProgressActive)

// sliderProgressActive.addEventListener('animationend', hangleAnimeEnd);

// function hangleAnimeEnd (event) {
//   console.log('конец анимации')
// }


// const sliderProgressContainer = document.querySelector('.slider-pg');

// sliderProgressContainer.addEventListener('animationend', function(event) {
//   if (event.target.classList.contains('slider-pg__item--active')) {
//     console.log('конец анимации');
//   }
// });




function sliderPgAnime(index) {
  sliderPgArr.forEach(item => item.classList.remove('slider-pg__item--active'));
  sliderPgArr[index].classList.add('slider-pg__item--active');
}

sliderPgArr.forEach((item) => {
  item.addEventListener('animationend', () => {
    slideNumber = (slideNumber + 1) % sliderPgArr.length;
    sliderPgAnime(slideNumber);
    console.log(`sliderNumber = ${slideNumber}`)

    sliderWidth = sliderScreen.clientWidth;
    sliderStrip.style.transform = `translateX(-${sliderWidth * slideNumber}px)`;
  });
});
// sliderPgArr.forEach((item, index) => {
//   item.addEventListener('animationend', () => {
//     const nextIndex = (index + 1) % sliderPgArr.length;
//     sliderPgAnime(nextIndex);
//     console.log(index, nextIndex)
//   });
// });

/***************************************************** */
/***************************************************** */
/****   Пробую разобраться с остановкой              *********************************************** */


/****  эффект ховер (изменил html)            ********************************** */

// sliderStrip.addEventListener('mouseover', () => {
// // sliderScreen.addEventListener('mouseover', () => {
//   // const sliderPgItemActive = document.querySelector('.slider-pg__item--active');
//   sliderPgArr.forEach(item => item.classList.add('pauseAnimation'));
//   // sliderPgItemActive.classList.add('pauseAnimation');
  
// });

// sliderStrip.addEventListener('mouseout', () => {
// // sliderScreen.addEventListener('mouseout', () => {
//   // const sliderPgItemActive = document.querySelector('.slider-pg__item--active');
  
//   sliderPgArr.forEach(item => item.classList.remove('pauseAnimation'));

//   // .runningAnimation

//   // sliderPgItemActive.classList.remove('pauseAnimation'); // удалите класс, когда указатель мыши покидает .slider-strip
// });

/****************************************************** */

// sliderStrip.addEventListener('touchstart', () => {
// // sliderScreen.addEventListener('touchstart', () => {
//   const sliderPgItemActive = document.querySelector('.slider-pg__item--active');
//   sliderPgItemActive.classList.add('pauseAnimation');
// });

// sliderStrip.addEventListener('touchend', () => {
// // sliderScreen.addEventListener('touchend', () => {
//   const sliderPgItemActive = document.querySelector('.slider-pg__item--active');
//   sliderPgItemActive.classList.remove('pauseAnimation');
// });

// sliderStrip.addEventListener('touchcancel', () => {
// // sliderScreen.addEventListener('touchcancel', () => {
//   const sliderPgItemActive = document.querySelector('.slider-pg__item--active');
//   sliderPgItemActive.classList.remove('pauseAnimation');
// });


// sliderStrip.addEventListener('pointerdown', () => {
//   const sliderPgItemActive = document.querySelector('.slider-pg__item--active');
//   sliderPgItemActive.classList.add('pauseAnimation');
// });

// sliderStrip.addEventListener('pointerup', () => {
//   const sliderPgItemActive = document.querySelector('.slider-pg__item--active');
//   sliderPgItemActive.classList.remove('pauseAnimation');
// });


// sliderStrip.addEventListener('pointerdown', () => {
//   sliderPgArr.forEach(item => item.classList.add('pauseAnimation'));

//   // sliderPgItemActive.classList.add('pauseAnimation');
// });

// sliderStrip.addEventListener('pointerup', () => {
//   sliderPgArr.forEach(item => item.classList.remove('pauseAnimation'));
// });



/******************************************************** */
/******************************************************** */

slider.addEventListener('click', hangleSlider);

function hangleSlider (event) {
  console.log(event.target);
  const btnSliderLeft = event.target.closest('.slider-btn--order-01');
  const btnSliderRight = event.target.closest('.slider-btn--order-02');

  sliderWidth = sliderScreen.clientWidth;
  if (btnSliderLeft) {
    // sliderStrip.classList.add('stopAnimation');
    // stopSliderInterval();
    sliderGoLeft();
    // startSliderInterval();
    sliderPgAnime(slideNumber)
  }
  if (btnSliderRight) {
    // sliderStrip.classList.add('stopAnimation');
    // stopSliderInterval();
    sliderGoRight();
    // sliderStrip.classList.remove('stopAnimation');
    sliderPgAnime(slideNumber)

    // startSliderInterval();
  // Запуск интервала заново
  
  }
}




function sliderGoRight () {

  if (slideNumber < 2) {
    slideNumber += 1;
  }
  else {
    slideNumber = 0;
  }
  sliderStrip.style.transform = `translateX(-${sliderWidth * slideNumber}px)`;

}

function sliderGoLeft () {
  sliderWidth = sliderScreen.clientWidth;

  if (slideNumber > 0) {
    slideNumber -= 1;
  }
  else {
    slideNumber = 2;
  }
  sliderStrip.style.transform = `translateX(-${sliderWidth * slideNumber}px)`;

  // sliderPgAnime(slideNumber)
}

// Переключение анимации в прогресс
// function sliderPgAnime (index) {
//   sliderPgArr.forEach(item => item.classList.remove('slider-pg__item--active'));
//   sliderPgArr[index].classList.add('slider-pg__item--active');
// }

/************************************************ */
/************************************************ */
/****   Работа с интервалом **************** */
// setInterval(sliderGoLeft, 4000);

// Функция для запуска sliderGoLeft() с интервалом 4 секунды
// function startSliderInterval() {
//   sliderInterval = setInterval(sliderGoLeft, 4000);
// }

// Функция для остановки интервала
// function stopSliderInterval() {
//   clearInterval(sliderInterval);
// }

/*********************************************** */


// const animationDuration = parseFloat(getComputedStyle(slider).animationDuration) * 1000;
  // const progress = (performance.now() % animationDuration) / animationDuration;

  // Останавливаем анимацию и запоминаем текущее время выполнения
  // slider.style.animationPlayState = "paused";
  // slider.style.animationDelay = `-${progress * animationDuration}ms`;

  // Определяем требуемый процент
  // const desiredProgress = 0.5; // Например, 50%

  // Запоминаем текущую позицию для корректного перехода
  // const currentPosition = -desiredProgress * 400; // 400px - ширина слайда

  // Задаем переход к требуемой позиции
  // slider.style.transform = `translateX(${currentPosition}px)`;

  // Восстанавливаем анимацию с текущей позиции
//   setTimeout(() => {
//     slider.style.animationPlayState = "running";
//     slider.style.animationDelay = null; // Сброс задержки
//   }, 100); // Небольшая задержка для корректной возобновления анимации



/************************************************** */

// pauseButton.addEventListener('click', function() {
//   // const computedStyle = window.getComputedStyle(sliderStrip); // Получаем текущие вычисленные стили
//   // const currentTransform = computedStyle.getPropertyValue('transform'); // Получаем текущее значение transform

//   sliderStrip.style.transform = currentTransform; // Замораживаем анимацию путем установки текущего значения transform

//   // Вызываем функцию, задающую новое значение transform
//   sliderStrip.style.transform = `translateX(-${sliderWidth * slideNumber}px)`;
// });


/************************************* */
/***  Пробую разобраться с адаптацией слайдера ************************************************* */
/** отслеживаю ширину экрана ********* */
// function resizeScreen () {
//   // решил ловить ширину картинки
// }

// let screenWidth = window.innerWidth; // узнаю ширину экрана
// console.log(`Начальный Размер экрана = ${screenWidth}`)

// function updateScreenWidth() {
//   screenWidth = window.innerWidth;

//   console.log(`Размер экрана = ${screenWidth}`)
//   // if (screenWidth <= 600) {
//   // } else {
//   // }
// }

// window.addEventListener('resize', updateScreenWidth);

// // Вызвать функцию при загрузке страницы
// updateScreenWidth();



/****  Пробую влиять на transform           ********************************** */

// let transformValue = window.getComputedStyle(sliderStrip).getPropertyValue('transform'); // Получаем значение стиля "transform"
// console.log(transformValue); // Выводим значение в консоль


// let style = window.getComputedStyle(sliderScreen); // Получаем вычисленные стили элемента
// let transformValue = style.getPropertyValue('transform'); // Получаем значение стиля "transform"
// console.log(transformValue); 



/************************************************* */
/************************************************* */
/************************************************* */
// Игры с анимацией 

// // Функция для получения текущего времени выполнения анимации
// function getCurrentAnimationTime(element) {
//   const computedStyles = window.getComputedStyle(element); // Получаем вычисленные стили элемента
//   const animationName = computedStyles.getPropertyValue('animation-name'); // Получаем значение свойства 'animation-name'
//   console.log(`Имя анимации: ${animationName}`);
//   const animationDuration = parseFloat(computedStyles.animationDuration) * 1000; // Получаем длительность анимации и переводим в миллисекунды
//   console.log(`Время анимации: ${animationDuration}`);

//   return animationDuration;
//   // return window.getComputedStyle(element).getPropertyValue("animation-duration");
// }

// getCurrentAnimationTime(sliderStrip)

// function getPercentAnimation (element) {
//   const computedStyles = window.getComputedStyle(element); // Получаем вычисленные стили элемента
//   const elapsedTime = performance.now() - parseFloat(computedStyles.animationDelay) * 1000; // Вычисляем время, прошедшее с начала анимации
//   console.log(`Время elapsed: ${elapsedTime}`);
//   let currentPercentage;

//   if (animationDuration === 0) {
//     currentPercentage = 100; // Если анимация нулевой длительности, считаем её выполненной на 100%
//   } else {
//     currentPercentage = (elapsedTime % animationDuration) / animationDuration * 100; // Иначе вычисляем процент выполнения анимации
//   }

//   console.log('Текущий процент выполнения анимации:', currentPercentage);
// }

// getPercentAnimation(sliderStrip)

