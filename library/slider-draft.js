// const BTN_LEFT = document.querySelector(".slider-btn--left");
// const BTN_RIGHT = document.querySelector(".slider-btn--right");
// const sliderInner = document.querySelector(".slider-inner");
// const imgArr = document.querySelectorAll('.slider-inner_item');
// const sliderPgItems = document.querySelectorAll('.slider-pg_item');
// const sliderPgContainersArr = document.querySelectorAll('.slider-pg_container');

// function updateSlider() {
//   for (let item of imgArr) {
//     item.classList.remove(item.classList['2']);
//   }

//   if (index === 0) {
//     imgArr[index].classList.add('card-exp00');
//     BTN_LEFT.classList.add('slider-btn--disabled');
//     BTN_RIGHT.classList.remove('slider-btn--color');
//     BTN_RIGHT.classList.remove('slider-btn--disabled');
//   } else if (index > 0 && index < 4) {
//     imgArr[index].classList.add(`card-exp0${index}`);
//     BTN_LEFT.classList.remove('slider-btn--disabled');
//     BTN_RIGHT.classList.remove('slider-btn--disabled');
//   } else if (index === 4) {
//     imgArr[index].classList.add('card-exp04');
//     BTN_LEFT.classList.remove('slider-btn--disabled');
//     BTN_RIGHT.classList.remove('slider-btn--color');
//     BTN_RIGHT.classList.add('slider-btn--disabled');
//   }

//   // Обновление активного элемента слайдера
//   sliderPgItems.forEach(item => {
//     item.classList.remove('slider-pg_item--active');
//   });

//   sliderPgItems[index].classList.add('slider-pg_item--active');
// }

// BTN_RIGHT.addEventListener('click', () => {
//   if (index < 4) {
//     index++;
//     updateSlider();
//   }
// });

// BTN_LEFT.addEventListener('click', () => {
//   if (index > 0) {
//     index--;
//     updateSlider();
//   }
// });

// sliderPg.addEventListener('click', function(event) {
//   const clickedSliderPgContainer = event.target.closest('.slider-pg_container');

//   if (clickedSliderPgContainer) {
//     index = Array.from(sliderPgContainersArr).indexOf(clickedSliderPgContainer);
//     updateSlider();
//   }
// });

/********************************************* */
/********************************************* */
/********************************************* */

// const BTN_LEFT = document.querySelector(".slider-btn--left");
// const BTN_RIGHT = document.querySelector(".slider-btn--right");
// const sliderInner = document.querySelector(".slider-inner");
// const imgArr = Array.from(document.querySelectorAll('.slider-inner_item'));
// const sliderPg = document.querySelector(".slider-pg");

// const cardExpClasses = ['card-exp00', 'card-exp01', 'card-exp02', 'card-exp03', 'card-exp04'];

// let index = 0;

// BTN_RIGHT.addEventListener('click', () => {
//   if (index < 4) {
//     BTN_RIGHT.classList.add('slider-btn--color');
//     BTN_LEFT.classList.remove('slider-btn--color');

//     imgArr.forEach((item, i) => {
//       item.classList.remove(cardExpClasses[i]);
//       if (i === index) {
//         item.classList.add(cardExpClasses[i + 1]);
//       }
//       if (index === 0) {
//         BTN_LEFT.classList.remove('slider-btn--disabled');
//       }
//       if (index === 3) {
//         BTN_RIGHT.classList.remove('slider-btn--color');
//         BTN_RIGHT.classList.add('slider-btn--disabled');
//       }
//     });

//     index++;
//     updateSliderPagination();
//   }
// });

// BTN_LEFT.addEventListener('click', () => {
//   if (index > 0) {
//     BTN_RIGHT.classList.remove('slider-btn--color');
//     BTN_LEFT.classList.add('slider-btn--color');

//     imgArr.forEach((item, i) => {
//       item.classList.remove(cardExpClasses[i]);
//       if (i === index) {
//         item.classList.add(cardExpClasses[i - 1]);
//       }
//       if (index === 1) {
//         BTN_LEFT.classList.remove('slider-btn--color');
//         BTN_LEFT.classList.add('slider-btn--disabled');
//       }
//       if (index === 4) {
//         BTN_RIGHT.classList.remove('slider-btn--disabled');
//       }
//     });

//     index--;
//     updateSliderPagination();
//   }
// });

// sliderPg.addEventListener('click', (event) => {
//   const clickedSliderPgContainer = event.target.closest('.slider-pg_container');

//   if (clickedSliderPgContainer) {
//     const clickedSliderPgItem = clickedSliderPgContainer.querySelector('.slider-pg_item');
//     const clickedIndex = Array.from(sliderPgItems).indexOf(clickedSliderPgItem);

//     if (clickedIndex !== index) {
//       imgArr.forEach((item, i) => {
//         item.classList.remove(cardExpClasses[i]);
//         if (i === clickedIndex) {
//           item.classList.add(cardExpClasses[clickedIndex]);
//         }
//       });

//       index = clickedIndex;
//       updateSliderPagination();
//     }
//   }
// });

// function updateSliderPagination() {
//   imgArr.forEach((item, i) => {
//     sliderPgItems[i].classList.remove('slider-pg_item--active');
//   });

//   sliderPgItems[index].classList.add('slider-pg_item--active');
// }
