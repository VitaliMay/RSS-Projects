
const slider = document.querySelector('.slider');
const sliderScreen = slider.querySelector('.slider-inner');
const sliderStrip = slider.querySelector('.slider-strip');
const sliderPgArr = [...document.querySelectorAll('.slider-pg__item')];


let slideNumber = 0; // порядковый номер слайда
let sliderWidth = sliderScreen.clientWidth; // узнаю ширину слайда

/************************************************ */
/************************************************ */
/**********    свайп и остановка на мобилках  ************* */

sliderScreen.addEventListener('touchstart', hangleTouchStart, { passive: true })
sliderScreen.addEventListener('touchmove', hangleTouchMove, { passive: true })
sliderScreen.addEventListener('touchend', hangleTouchEnd, false)
sliderScreen.addEventListener('touchcancel', hangleTouchEnd, false)

function hangleTouchStart (event) {
  const touchStart = event.touches[0];
  xStart = touchStart.clientX
  sliderPgArr.forEach(item => item.classList.add('pauseAnimation'));
}

function hangleTouchMove (event) {
  if (!xStart) { return };
  let xMove = event.touches[0].clientX
  swipe = xMove - xStart

  if (swipe > 0) {
    sliderGoLeft();
    sliderPgAnime(slideNumber)
  }
  if (swipe < 0) {
    sliderGoRight();
    sliderPgAnime(slideNumber)
  }
  xStart = null; // обнуляю для корректной работы переменная для перетаскивания
  swipe = null;
}

function hangleTouchEnd () {
  sliderPgArr.forEach(item => item.classList.remove('pauseAnimation'));
}


/******************************************************** */
/******************************************************** */
/**      Новая версия  animationend отрабатывает как setInterval   ******** */


function sliderPgAnime(index) {
  sliderPgArr.forEach(item => item.classList.remove('slider-pg__item--active'));
  sliderPgArr[index].classList.add('slider-pg__item--active');
}

sliderPgArr.forEach((item) => {
  item.addEventListener('animationend', () => {
    slideNumber = (slideNumber + 1) % sliderPgArr.length;
    sliderPgAnime(slideNumber);
    // console.log(`sliderNumber = ${slideNumber}`)

    sliderWidth = sliderScreen.clientWidth;
    sliderStrip.style.transform = `translateX(-${sliderWidth * slideNumber}px)`;
  });
});


/******************************************************** */
/******************************************************** */

slider.addEventListener('click', hangleSlider);

function hangleSlider (event) {
  // console.log(event.target);
  const btnSliderLeft = event.target.closest('.slider-btn--order-01');
  const btnSliderRight = event.target.closest('.slider-btn--order-02');

  sliderWidth = sliderScreen.clientWidth;
  if (btnSliderLeft) {
    sliderGoLeft();
    sliderPgAnime(slideNumber)
  }
  if (btnSliderRight) {
    sliderGoRight();
    sliderPgAnime(slideNumber)
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
}


