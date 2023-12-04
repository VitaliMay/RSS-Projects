const score = `
Привет. При проверке, если не закрыть бургер-меню 
и перейти на десктопную версию, контент не будет скролится. 
Так как по факту, ты в бургер меню)) хоть кнопки и не видно). 
Нажми в любом месте, чтобы учесть такие случаи выставил фон. 
Или просто нажми на любую ссылку, или закрой бургер-меню в мобайл. 
Такие танцы понадобились, чтобы бургер меню могло скролится, 
если не помещается на экране, например, при повороте экрана. 
Можно поиграться, если выставить, например, iPhone XR и крутить экран,
точно поймешь о чём речь, если объяснил путано)

`

console.log(score)

// подключаю модуль
import data from "./products.js";

// const category = ['coffee', 'tea', 'dessert'];


const cardContainer = document.querySelector('.menu-offer__card-container');
const elementsDataCategory = [...document.querySelectorAll('[data-category]')];

const loadMore = document.querySelector('.slider-btn--menu-refresh');

// загрузка карточек кофе
let category = 'coffee'
createCard(category);


elementsDataCategory.forEach(element => {
  element.addEventListener('click', function() {
    category = element.getAttribute('data-category')

    createCard(category);

    elementsDataCategory.forEach(el => {
      if (el === element) {
        el.classList.add('tab-item--active');
      } else {
        el.classList.remove('tab-item--active');
        hiddenMoreCard()
      }
    });

    if (category === 'tea') {
      loadMore.classList.add('close')
    };


  });
});

/**************************************************** */

loadMore.addEventListener('click', loadMoreCard);

function loadMoreCard() {
  console.log(`Кнопка рефреш`)
  cardContainer.classList.add('open')
  loadMore.classList.add('close')
}

function hiddenMoreCard() {
  cardContainer.classList.remove('open')
  loadMore.classList.remove('close')
}

/************************************************* */

function createCard (category) {
  cardContainer.innerHTML = '';
    let out = '';
  data.map((item) => { if (item.category === category) 
    {out += 
      `
  <div class="card">
    <div class="card-img">
      <div class="card-img__item" style="background-image: url('${item.imageUrl}')"></div>
    </div>
    <div class="card-content">
        <h3 class="card-content__title title-3">${item.name}</h3>
        <p class="card-content__text">${item.description}</p>
        <p class="card-content__price title-3">$${item.price}</p>
    </div>
  </div>

  `
    }});

    cardContainer.innerHTML = out;
}


/******************************************************** */
/*** Работа с файлом products.json ****** */

// fetch('./js/products.json')
//   .then(response => response.json())
//   .then(data => {
//     data.forEach(item => console.log(item.name))
//     // console.log(data[0].name); // Выводим значение свойства "name" первого объекта в массиве
// });

// fetch('./js/products.json')
//     .then(response => response.json())
//     .then(data => {
//       data.forEach(item => console.log(item.description))
//       // console.log(data);
//     })
//     .catch(error => {
//         console.error('Ошибка загрузки данных:', error);
//     });

// Или
/***************************************************** */

// async function fetchData() {
//   try {
//     const response = await fetch('./js/products.json');
//     const data = await response.json();
//     // console.log(data);
//     // data.forEach(item => console.log(item.price))
//     // data.forEach(item => console.log(item.name, item.description))
//     // data.forEach(item => console.log(item.name))
//     // data.forEach(item => console.log(item.description))
//     data.forEach(item => data.forEach(item => console.log(item.name + '\n' + item.description)));

//   } catch (error) {
//     console.error('Ошибка загрузки данных:', error);
//   }
// }

// // Вызываю функцию для выполнения загрузки данных
// fetchData();


/********************************************* */




