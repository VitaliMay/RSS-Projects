
// let menu = document.querySelector(".menu__list")
// let body = document.querySelector('body')
// const burgerButton = document.getElementById('burger-button')
// let fon = document.querySelector('.fon')


// burgerButton.addEventListener("click", function(event) {
//     menu.classList.toggle("open")
//     burgerButton.classList.toggle("rotade")
//     body.classList.toggle('lock')
//     fon.classList.toggle('work')
// })



// function closeMenu() {
//     menu.classList.remove('open');
//     burgerButton.classList.remove('rotade');
//     body.classList.remove('lock');
//     fon.classList.remove('work');

// }

// const menuLink = document.querySelectorAll('.menu__list-item');
// menuLink.forEach(link => link.addEventListener('click', closeMenu));


// fon.addEventListener('click', closeMenu);

/*********************************************** */
/*********************************************** */
/*********************************************** */

const menu = document.querySelector(".menu__list");
const body = document.querySelector('body');
const burgerButton = document.getElementById('burger-button');
const fon = document.querySelector('.fon');



// делегирование событий
// Вместо назначения обработчика кликов на каждый элемент меню
menu.addEventListener('click', function(event) {
//   if (event.target.matches('.menu__list-link')) { // срабатывает только при клике именно на ссылку
//   if (event.target.classList.contains('.menu__list-link')) {
    

    if (event.target.closest('.menu__list-item')) { // срабатывает при клике на любой дочерний элемент


    closeMenu();
  }
});

burgerButton.addEventListener("click", function(event) {
    menu.classList.toggle("open");
    burgerButton.classList.toggle("rotade");
    body.classList.toggle('lock');
    fon.classList.toggle('work');
});

fon.addEventListener('click', closeMenu);

function closeMenu() {
    menu.classList.remove('open');
    burgerButton.classList.remove('rotade');
    body.classList.remove('lock');
    fon.classList.remove('work');

}

/*****Убираю меню при клике на профиль*********************** */
const profile = document.querySelector('.profile');

profile.addEventListener("click", function(event) {
  closeMenu()
});
/**************************** */



/*************************************************** */
/***********Рабочий вариант*************************************** */

// const sliderPg = document.querySelector(".slider-pg");
// let sliderPgItem = document.getElementsByClassName('slider-pg_item');


// sliderPg.addEventListener('click', function(event) {
//   if (event.target.closest('.slider-pg_container')) { // срабатывает при клике на любой дочерний элемент
//     // Удаляю 'slider-pg_item--active' у всех 'slider-pg_item' 
//     for (let item of sliderPgItem) {
//       item.classList.remove('slider-pg_item--active');
//     }

//     // Добавляю 'slider-pg_item--active'  к тому 'slider-pg_item' на который кликнул
//     event.target.closest('.slider-pg_container').querySelector('.slider-pg_item').classList.add('slider-pg_item--active');
//   }
// });

/*************************************************** */
/*************************************************** */
/*****Меняю цвет кнопок пагинации при клике*********************** */

// const sliderPg = document.querySelector(".slider-pg");
// const sliderPgItems = document.querySelectorAll('.slider-pg_item');

// const sliderPgContainersArr = document.querySelectorAll('.slider-pg_container'); //для получения индекса кнопки

// sliderPg.addEventListener('click', function(event) {
//   const clickedSliderPgContainer = event.target.closest('.slider-pg_container');

//   if (clickedSliderPgContainer) {
//     const clickedSliderPgItem = clickedSliderPgContainer.querySelector('.slider-pg_item');

//     sliderPgItems.forEach(item => {
//       item.classList.remove('slider-pg_item--active');
//     });

//     clickedSliderPgItem.classList.add('slider-pg_item--active');

//     console.log(Array.from(sliderPgContainersArr).indexOf(clickedSliderPgContainer)); // получение индекса кнопки
//   }
// });


/*********************************************************** */
/*********************************************************** */
/*********************************************************** */


// Находим все элементы input с типом radio
// let radioButtons = document.querySelectorAll('input[type="radio"]');
let radioButtons = document.querySelectorAll('.seasons_option');
const seasonArr = document.querySelectorAll('.favorites-items');
let indexSeason = 0 // индекс сезона выбранного по умолчанию
// Добавляем обработчик события для каждого элемента
radioButtons.forEach(function(item) {
  item.addEventListener('change', function() {
    // let label = this.parentElement; //родительский label не нужен, и так сработает
    let selectedValue = this.value;
    let selectedIndexSeason = Array.from(radioButtons).indexOf(item);
    console.log(selectedIndexSeason);
    console.log(seasonArr[selectedIndexSeason])
    seasonArr[indexSeason].classList.remove('favorites-items--active')
    seasonArr[indexSeason].classList.add('favorites-items--hidden')
    seasonArr[selectedIndexSeason].classList.remove('favorites-items--hidden')
    seasonArr[selectedIndexSeason].classList.add('favorites-items--active')
    indexSeason = selectedIndexSeason
    // console.log(selectedValue);
    // console.log(seasonArr[0]);
    // console.log(this);
  });
});


/************************************************************ */
/************************************************************ */
/********Рабочий вариант**************************************************** */

// const stickyEl = document.querySelector('.favorites-form--position')
// console.log (`sticky = ${stickyEl}`)
// console.log (`stickyClass = ${stickyEl.className.includes('element-from-top')}`)
// console.log(stickyEl.getBoundingClientRect().top)

// window.addEventListener('scroll', function() {
//   console.log(stickyEl.getBoundingClientRect().top)
//   if (stickyEl.getBoundingClientRect().top <= 0 && stickyEl.getBoundingClientRect().top > -127) {
//     stickyEl.classList.add('favorites-form--position-sticky')
//   } else {
//     stickyEl.classList.remove('favorites-form--position-sticky')
//   }
// // }, false);
// });


/************************************************* */
/************************************************* */
/************************************************* */
// меняю цвет фона для элемента sticky элемента
// как только элемент скролится до позиции top = 0

// (function(){
//   const stickyEl = document.querySelector('.favorites-form--position')
//   // console.log (`sticky = ${stickyEl}`)
//   // console.log (`stickyClass = ${stickyEl.className.includes('element-from-top')}`)
//   // console.log(stickyEl.getBoundingClientRect().top)

//   window.addEventListener('scroll', function() {
//     // console.log(stickyEl.getBoundingClientRect().top)
//     if (stickyEl.getBoundingClientRect().top <= 0 && stickyEl.getBoundingClientRect().top > -127) {
//       stickyEl.classList.add('favorites-form--position-sticky')
//     } else {
//       stickyEl.classList.remove('favorites-form--position-sticky')
//     }
// // }, false);
//   });
// })();

/******************************************************** */

(function(){
  const stickyEl = document.querySelector('.favorites-form--position')

  window.addEventListener('scroll', function() {
    if (stickyEl.getBoundingClientRect().top <= 0 && stickyEl.getBoundingClientRect().top > -127) {
      stickyEl.classList.add('favorites-form--position-sticky')
    } else {
      stickyEl.classList.remove('favorites-form--position-sticky')
    }

  }, { passive: true }); // Добавляем passive: true

})();


