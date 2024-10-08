
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

// const menu = document.querySelector(".menu__list");
// const body = document.querySelector('body');
// const burgerButton = document.getElementById('burger-button');
// const fon = document.querySelector('.fon');

// // делегирование событий
// // Вместо назначения обработчика кликов на каждый элемент меню
// menu.addEventListener('click', function(event) {
// //   if (event.target.matches('.menu__list-link')) { // срабатывает только при клике именно на ссылку
// //   if (event.target.classList.contains('.menu__list-link')) {
//     if (event.target.closest('.menu__list-item')) { // срабатывает при клике на любой дочерний элемент


//     closeMenu();
//   }
// });

// burgerButton.addEventListener("click", function(event) {
//     menu.classList.toggle("open");
//     burgerButton.classList.toggle("rotade");
//     body.classList.toggle('lock');
//     fon.classList.toggle('work');
// });

// fon.addEventListener('click', closeMenu);

// function closeMenu() {
//     menu.classList.remove('open');
//     burgerButton.classList.remove('rotade');
//     body.classList.remove('lock');
//     fon.classList.remove('work');

// }

/************************************************ */
/************************************************ */
/************************************************ */



/************************************************ */
// Версия с добавлением в HTML элемента fon
// Резюме после мучений - лучше так не делать
/************************************************ */

const menu = document.querySelector(".menu__list");
const body = document.querySelector('body');
const headerInner = document.querySelector('.header-inner');
const burgerButton = document.getElementById('burger-button');
let fon = null; // лучше объявить fon как переменную с помощью let, чтобы можно было переопределять

// делегирование
menu.addEventListener('click', function(event) {
  if (event.target.closest('.menu__list-item')) {
    closeMenu();
  }
});

burgerButton.addEventListener("click", function(event) {
  if (!fon) {
    fon = document.createElement('div'); // Добавлено объявление элемента fon
    fon.classList.add('fon');
    headerInner.appendChild(fon);
  } else {
    event.stopPropagation(); // остановить всплытие
    closeMenu();
    fon.parentNode.removeChild(fon); // Удаление элемента "fon" из DOM
  }


  menu.classList.toggle("open");
  burgerButton.classList.toggle("rotade");
  body.classList.toggle('lock');
  fon.classList.toggle('work');
});

document.addEventListener('click', function(event) {
  if (!event.target.closest('.menu')) { // при клике не на меню (на фон)
    closeMenu();
  }
});

fon.addEventListener('click', function(event) {
  event.stopPropagation(); // Остановка всплытия события клика на фоне
  closeMenu();
  fon.parentNode.removeChild(fon);
});

function closeMenu() {
  menu.classList.remove('open');
  burgerButton.classList.remove('rotade');
  body.classList.remove('lock');

  if (fon) {
    fon.parentNode.removeChild(fon);
    fon = null;
  }
}