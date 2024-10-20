
// подключаю модуль
import data from "./products.js";

// Не передалось ПОЧЕМУ?
// import { closeMenu } from "./burger.js";
// import { fon } from './burger.js';
// import { body } from './burger.js';

const body = document.querySelector('body');
const fon = document.querySelector('.fon');

fon.addEventListener('click', modalClose);

const cardContainer = document.querySelector('.menu-offer__card-container');
const elementsDataCategory = [...document.querySelectorAll('[data-category]')];

const loadMore = document.querySelector('.slider-btn--menu-refresh');

const modal = document.querySelector('.modal');
const modalBtnArray = [...modal.querySelectorAll('.tab-item')];

const modalTitle = modal.querySelector('.modal-content__title');
const modalImg = modal.querySelector('.modal-img__item');
const modalText = modal.querySelector('.modal-content__text');

const modalBtnArraySize = [...modal.querySelectorAll('[data-sizes]')];
const modalBtnArrayAdditives = [...modal.querySelectorAll('[data-additives]')];

const modalBtnText = [...modal.querySelectorAll('.tab-item_text')];
const modalTotalPrice = modal.querySelector('.modal-total__price');
// const modalCloseBtn = modal.querySelector('.modal-btn-close');

let priceTotal = 0;
let priceBase = 0;
let priceSize = 0;
let priceAdditives = 0;

let cardArray = [];  // чтобы ловить количество карточек
// загрузка карточек кофе (первая загрузка страницы)
let category = 'coffee'
createCard(category);

/////////////////////////////////////////////////
/////////////////////////////////////////////////

cardContainer.addEventListener('click', handleCardClick)

function handleCardClick (event) {
  // console.log(event.target)
  // console.log(event.target.closest('.card'))
  // console.log(event.target.parentElement.closest('.card'))
  // const card = event.target.closest('.card') || event.target.parentElement.closest('.card');
  const card = event.target.closest('.card');
  if (card) {
    const titleContent = card.querySelector('.card-content__title').textContent;
    // console.log(`Ищу ${titleContent}`)
    const index = data.findIndex(item => item.name === titleContent);
    // console.log(`Index ${titleContent} = ${index} `)

    priceAdditives = 0;
    priceSize = 0
    modalContent(index)
    modalOpen()

  }
}

function modalOpen() {
  closeMenu();
  fon.classList.add('work');
  modal.classList.add('modal--active');
  body.classList.add('lock');
}

function modalClose() {
  // closeMenu();
  fon.classList.remove('work');
  modal.classList.remove('modal--active');
  body.classList.remove('lock');

  
  modalBtnArray.forEach(item => {
    item.classList.remove('tab-item--active');
  });
  modalBtnArray[0].classList.add('tab-item--active');

  priceAdditives = 0;
  priceSize = 0;
  priceTotal = 0;
  priceBase = 0;
}

function modalContent (index) {
  modalTitle.innerHTML = data[index].name;
  modalText.innerHTML = data[index].description;
  modalImg.style.backgroundImage = `url(${data[index].imageUrl})`

  modalBtnText[0].innerHTML = data[index].sizes.s.size;
  modalBtnText[1].innerHTML = data[index].sizes.m.size;
  modalBtnText[2].innerHTML = data[index].sizes.l.size;
  modalBtnText[3].innerHTML = data[index].additives[0].name;
  modalBtnText[4].innerHTML = data[index].additives[1].name;
  modalBtnText[5].innerHTML = data[index].additives[2].name;

  priceBase = Number(data[index].price);
  priceTotal = priceBase;
  modalTotalPrice.textContent = `$${priceTotal.toFixed(2)}`;

}

modal.addEventListener('click', handleModalButtonClick)

function handleModalButtonClick (event) {
  const btnSize = event.target.closest('.tab-item[data-sizes]');
  const btnAdditiv = event.target.closest('.tab-item[data-additives]');

  const btnClose = event.target.closest('.modal-btn-close');

  const titleContent = modalTitle.textContent;
  const index = data.findIndex(item => item.name === titleContent);

  if (btnSize) {
    // console.log(`Привет Size`)
    logicSizes (btnSize, index)
  }
  if (btnAdditiv) {
    // console.log(`Привет добавка`)
    logicAdditives (btnAdditiv, index)
  }
  if (btnClose) {
    // closeMenu()
    modalClose()
  }

  priceTotal = priceBase + priceSize + priceAdditives;
  modalTotalPrice.textContent = `$${priceTotal.toFixed(2)}`;

  // console.log(`Out размер = ${priceSize}`);
  // console.log(`Out добавки = ${priceAdditives}`);
  // console.log(`Out база = ${priceBase}`);
  // console.log(`Out Итого = ${priceTotal}`);
}

function logicSizes (btnSize, index) {
  if (btnSize.classList.contains('tab-item--active')) {return;}
  else {
    modalBtnArraySize.forEach(otherBtn => {
      if (otherBtn !== btnSize) {
        otherBtn.classList.remove('tab-item--active');
      }
    });
    btnSize.classList.add('tab-item--active')
    const sizeBtn = btnSize.getAttribute('data-sizes')
    priceSize =  Number(data[index].sizes[sizeBtn]["add-price"])

  }
  // return priceSize
}

function logicAdditives (btnAdditiv, index) {
  // btnAdditiv.classList.toggle('tab-item--modal'); // иногда глючит. Добавил в HTML
  btnAdditiv.classList.toggle('tab-item--active');

  priceAdditives = 0;
  modalBtnArrayAdditives.forEach((otherBtn, i) => {
    if (otherBtn.classList.contains('tab-item--active')) {
      priceAdditives += Number(data[index].additives[i]["add-price"]);
    }
  });

  // return priceAdditives
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

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

    if (cardArray.length <= 4) {
    // if (category === 'tea') {
      loadMore.classList.add('close')
    };
  });
});


/**************************************************** */
/**************************************************** */

loadMore.addEventListener('click', loadMoreCard);

function loadMoreCard() {
  // console.log(`Кнопка рефреш`)
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

  cardArray = [...document.querySelectorAll('.card')]
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

// let myVariable = "Hello!";
// export { myVariable };

