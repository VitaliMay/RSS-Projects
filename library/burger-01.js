
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
    // menu.classList.toggle("open");
    // burgerButton.classList.toggle("rotade");
    // body.classList.toggle('lock');
    // fon.classList.toggle('work');

    if (modalProfileLogin.classList.contains("modal-profile-login--active") || modalRegister.classList.contains('modal-register--active') || modalLogin.classList.contains('modal-login--active')) {
      modalProfileLogin.classList.remove("modal-profile-login--active");
      modalRegister.classList.remove('modal-register--active');
      modalLogin.classList.remove('modal-login--active');

      menu.classList.add("open");
      body.classList.add('lock');
      burgerButton.classList.add("rotade");
    }
    else if (!menu.classList.contains("open")){
      fon.classList.add('work');

      menu.classList.add("open");
      body.classList.add('lock');
      burgerButton.classList.add("rotade");

    }
    else {
      closeMenu()
    }


});

fon.addEventListener('click', closeMenu);

// К сожалению, не по ТЗ (а мне так больше нравится)
// fon.addEventListener('click', function() {
//   if (!modalRegister.classList.contains("modal-register--active")) {
//     closeMenu()
//   }
//   else {
//     closeMenu();
//     fon.classList.add('work');
//   }
// });

function closeMenu() {
    menu.classList.remove('open');
    burgerButton.classList.remove('rotade');
    body.classList.remove('lock');
    fon.classList.remove('work');

    modalProfileLogin.classList.remove("modal-profile-login--active");
    modalRegister.classList.remove('modal-register--active');

    modalLogin.classList.remove('modal-login--active')

}

/*****Убираю меню при клике на профиль*********************** */
/***модалка login при клике на профиль */


const profile = document.querySelector('.profile');
const modalProfileLogin = document.querySelector('.modal-profile-login');
const modalRegister = document.querySelector('.modal-register')
const modalLogin = document.querySelector('.modal-login')


profile.addEventListener("click", function(event) {
  // closeMenu() // было
  // чтобы срабатывало только при клике на картинку
  if (event.target.classList.contains('profile')){

    // при клике должно убираться только меню
    // фон если он есть должен оставаться
    if (menu.classList.contains("open")) {
      menu.classList.remove('open');
      burgerButton.classList.remove('rotade');
      modalProfileLogin.classList.add("modal-profile-login--active");
    } else if (!modalProfileLogin.classList.contains("modal-profile-login--active")) {
      body.classList.add('lock');
      fon.classList.add('work');
      modalProfileLogin.classList.add("modal-profile-login--active");
    } else if (modalProfileLogin.classList.contains("modal-profile-login--active")) {
      body.classList.remove('lock');
      fon.classList.remove('work');
      modalProfileLogin.classList.remove("modal-profile-login--active");
    } 

    if (modalRegister.classList.contains('modal-register--active') || modalLogin.classList.contains('modal-login--active')) {
      // modalRegister.classList.remove('modal-register--active');
      closeMenu()
      // console.log('Привет')
    }

  }

});
/**************************** */

// ловлю все кнопки Register и сразу формирую массив из коллекции NodeList
// чтобы использовать все стандартные методы массива
// также сформировать массив из коллекции можно с помощью спред-оператора

let registerBtnArr = Array.from(document.querySelectorAll('button[name="register"]'))
// console.log(`name Register = ${registerBtnArr}`)

// навешиваю обработчик события на каждый элемент массива
registerBtnArr.forEach(function(item) {
  item.addEventListener('click', function() {
    closeMenu()
    modalRegister.classList.add('modal-register--active');
    
    fon.classList.add('work');
  });
});


/************************************* */

// ловлю все кнопки Log in и сразу формирую массив из коллекции NodeList

let loginBtnArr = Array.from(document.querySelectorAll('button[name="log-in"]'))

// навешиваю обработчик события на каждый элемент массива
loginBtnArr.forEach(function(item) {
  item.addEventListener('click', function() {
    closeMenu()
    modalLogin.classList.add('modal-login--active');
    
    fon.classList.add('work');
  });
});


/************************************ */
/************************************ */
// ловлю все крестики в модалках
const modalBtnCross = [...document.querySelectorAll('.modal-btn-cross')]
// console.log (`cross = ${modalBtnCross}`)
modalBtnCross.forEach(function(item) {
  item.addEventListener('click',function() {
    closeMenu()
  })
})

/************************************************ */

/*********************************************** */

// получаю все кнопки, входящие в карточки
// открываю модал login при клике на кнопку Buy

const cardBtnArr = [...document.querySelectorAll('.card__block .card__block-btn')];

// console.log(`cardBtnArr.length = ${cardBtnArr.length}`)

cardBtnArr.forEach(function(item) {
  item.addEventListener('click', function() {
    closeMenu()
    modalLogin.classList.add('modal-login--active');

    fon.classList.add('work');
  });
});



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
  item.addEventListener('change', function() {  // обработчик события для радиокнопки
    // let label = this.parentElement; //родительский label не нужен, и так сработает
    let selectedValue = this.value;
    let selectedIndexSeason = Array.from(radioButtons).indexOf(item);
    // console.log(selectedIndexSeason);
    // console.log(seasonArr[selectedIndexSeason])
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


/************************************************** */
/************************************************** */
/************************************************** */
/************************************************** */

/*

Отследить начало и конец transform: translate(-47.5rem, 0); и связать это событие с помощью JavaScript.

Чтобы отследить начало и конец анимации, можно использовать события transitionstart и transitionend.

const cardExp01 = document.querySelector('.card-exp01');

cardExp01.addEventListener('transitionstart', () => {
  // Код, который будет выполнен при начале анимации
  console.log('Анимация началась');
});

cardExp01.addEventListener('transitionend', () => {
  // Код, который будет выполнен после завершения анимации
  console.log('Анимация завершена');
});

Чтобы привязать анимацию к событию, можно использовать стандартные события, такие как click, mouseover, scroll и другие, а затем вручную изменить стили элемента.

const cardExp01 = document.querySelector('.card-exp01');
const triggerButton = document.querySelector('.trigger-button');

triggerButton.addEventListener('click', () => {
  cardExp01.style.transform = 'translate(-47.5rem, 0)';
});

Здесь добавляю прослушиватель событий click к кнопке .trigger-button. При нажатии на кнопку, изменяю стиль элемента .card-exp01, применяя transform: translate(-47.5rem, 0). Анимация будет запускаться при клике на кнопку.

*/

/********************************************************** */
/********************************************************** */

// Вспоминаю как получал координаты минёра используя data атрибуты
// определяя data как объект

// const mine = {
//   x: 0,
//   y: 0
// }

// document.querySelector('.main').innerHTML = '' // очищаю чтобы работало без перезагрузки
// document.querySelector('.main').innerHTML += `<div class="playboard"></div>`;

// let init = '';

// mine.x = i % row // определяю координату X ячейки
// mine.y = Math.floor(i/row) //  определяю координату Y ячейки

// let mineJSON = JSON.stringify(mine)  // это уже строка, поэтому кавычек в data НЕ НАДО!!!

// let block = `<div class=${sizeBlock} data=${mineJSON} ><div>${temp_bomb}</div></div>`;
// init = init + block;
// document.querySelector('.playboard').innerHTML = init;

// let coorXY = JSON.parse(event.target.getAttribute("data")


/******************************************************************** */
// Чтобы добавить data атрибут к кнопкам
// const button = document.querySelector(".card__block-btn");
// button.dataset.mine = JSON.stringify(mine);
// Это преобразует объект mine в строку JSON и добавит его как значение атрибута data-mine.

// Таким образом, кнопка будет иметь атрибут data-mine, содержащий значение {"x": 0, "y": 0}.

/*********************************************** */

