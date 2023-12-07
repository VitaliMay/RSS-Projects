
const menu = document.querySelector('.menu');
const body = document.querySelector('body');
const burgerButton = document.querySelector('.burger-button');
const fon = document.querySelector('.fon');
const modal = document.querySelector('.modal')
const containerHeader = document.querySelector('.container--header')

const modalBtnArray = [...modal.querySelectorAll('.tab-item')];

// делегирование событий
// Вместо назначения обработчика кликов на каждый элемент меню

// закрываю при переходе по ссылке
menu.addEventListener('click', function(event) {
  if (event.target.closest('.menu__list-link')) { // срабатывает при клике на любой дочерний элемент
    closeMenu();
  }
});

// закрываю-открываю при нажатии кнопки
burgerButton.addEventListener("click", function(event) {
  if (burgerButton.classList.contains('rotade')) {
    closeMenu();
  }
  else {
    openMenu()
  }
});

// закрываю при клике на фон
fon.addEventListener('click', closeMenu);

function openMenu() {
  menu.classList.add('open');
  burgerButton.classList.add('rotade');
  body.classList.add('lock');
  fon.classList.add('work');
  containerHeader.classList.add('container--header-active')
}

function closeMenu() {
    menu.classList.remove('open');
    burgerButton.classList.remove('rotade');
    body.classList.remove('lock');
    fon.classList.remove('work');
    containerHeader.classList.remove('container--header-active')

    modal.classList.remove('modal--active');
    modalBtnArray.forEach(item => {
      item.classList.remove('tab-item--active');
      // item.removeEventListener('click', handleAdditiveClick);
    });
    modalBtnArray[0].classList.add('tab-item--active');

    priceAdditives = 0;
    priceSize = 0;
    priceTotal = 0;
    priceBase = 0;
}



/******************************************* */
// function modalFind() {
//   if (modal.classList.contains('modal--active')) {
//     console.log('Привет модалка')
//     closeMenu();
//     fon.classList.add('work');

//   }
// }

// modalFind()

function modalOpen() {
  closeMenu();
  fon.classList.add('work');
  modal.classList.add('modal--active');
}

/************************************************ */
/************************************************ */

// Для сохранения стилей бургер-меню при изменении ориентации экрана. Медиа-запросы для ориентации устройства:

// /* Стили для вертикальной ориентации экрана и шириной от 420px до 800px */
// @media (min-width: 421px) and (max-width: 800px) and (orientation: portrait) {
//   .burger-menu {
//     /* ваши стили для выезжающего бургер-меню */
//   }
// }

// /* Стили для горизонтальной ориентации экрана и шириной от 420px до 800px */
// @media (min-width: 421px) and (max-width: 800px) and (orientation: landscape) {
//   .burger-menu {
//     /* ваши стили для выезжающего бургер-меню */
//   }
// }

// /* Стили для других размеров экранов и ориентаций */
// /* Например, для экранов шириной от 800px до 1200px */
// @media (min-width: 801px) and (max-width: 1200px) {
//   .burger-menu {
//     /* другие стили для бургер-меню */
//   }
// }

// import { myVariable } from './index.js';
// console.log(myVariable); // Выведет "Hello!"

