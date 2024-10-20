
const menu = document.querySelector('.menu');
const body = document.querySelector('body');
const burgerButton = document.querySelector('.burger-button');
const fon = document.querySelector('.fon');

const containerHeader = document.querySelector('.container--header')

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
}

