
const slider = document.querySelector('.slider');
const sliderScreen = slider.querySelector('.slider-inner');
const sliderStrip = slider.querySelector('.slider-strip');


let slideNumber = 0; // порядковый номер слайда
let sliderWidth = sliderScreen.clientWidth; // узнаю ширину слайда

console.log(`sliderWidth = ${sliderWidth}`)

slider.addEventListener('click', hangleSlider);

function hangleSlider (event) {
  console.log(event.target);
  const btnSliderLeft = event.target.closest('.slider-btn--order-01');
  const btnSliderRight = event.target.closest('.slider-btn--order-02');

  sliderWidth = sliderScreen.clientWidth;
  if (btnSliderLeft) {
    sliderGoLeft();
  }
  if (btnSliderRight) {
    sliderGoRight();

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
  if (slideNumber > 0) {
    slideNumber -= 1;
  }
  else {
    slideNumber = 2;
  }
  sliderStrip.style.transform = `translateX(-${sliderWidth * slideNumber}px)`;
}


/************************************* */
/***  Пробую разобраться с адаптацией слайдера ************************************************* */
/** отслеживаю ширину экрана ********* */

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
