// console.log('Привет index2')

import { dataPets } from './js/products.js';
import { checkBurger } from './js/burger.js'

// console.log(dataPets)
// console.log(dataPets[0].name)
// console.log(checkBurger)

let modalPopup  // чтобы была видна модалка

/******************************************** */
/******************************************** */

// window.addEventListener('resize', function() {
//   // const resizeCardNumber = resizeCardNumber ()
//    if (window.innerWidth >= 767.9 && menu.classList.contains("open")) {
//       closeMenu()
//    }
  
// });

/*************************************** */

import { randomNumber } from './js/temp-module.js'; 

// console.log (randomNumber())

import { petsNameArr } from './js/temp-module.js';
console.log(petsNameArr)

/*************************************************** */

import { createPetsNameIndexArr } from './js/temp-module.js';

// const newPetsNameIndexArr = createPetsNameIndexArr()
// console.log(newPetsNameIndexArr)

/************************************************* */

import { shuffle } from './js/temp-module.js';

/************************************************* */

import { createPaginationArr } from './js/temp-module.js';

let paginationArr = createPaginationArr()
console.log(paginationArr)

/************************************************* */

import { cardCreation } from './js/temp-module.js';

import { appendNewCardInElement } from './js/temp-module.js';

import { startPagePets } from './js/temp-module.js';

// формирование стартовой страницы

const sliderStripPage = document.querySelector('.slider-strip--page')
startPagePets(paginationArr, sliderStripPage)

/*************************************** */

import { generatePagePets } from './js/temp-module.js';

/*************************************** */

import { removeAllCard } from './js/temp-module.js';

const paginationNavigation = document.querySelector('.navigation')

const buttonPaginationArr = [...document.querySelectorAll('.button--arrow')]
const buttonPaginationStart = buttonPaginationArr[0]
const buttonPaginationPrePage = buttonPaginationArr[1]
const buttonPaginationCurrentPage = buttonPaginationArr[2]
const buttonPaginationNextPage = buttonPaginationArr[3]
const buttonPaginationEnd = buttonPaginationArr[4]

let flagCurrentPage = 0

paginationNavigation.addEventListener('click', paginationControl)

function paginationControl (event) {
   if (event.target === buttonPaginationStart) {
      removeAllCard(sliderStripPage)
      generatePagePets(paginationArr[0], sliderStripPage)
      flagCurrentPage = 0
      buttonPaginationCurrentPage.textContent = `${flagCurrentPage + 1}`
   }
   if (event.target === buttonPaginationEnd) {
      removeAllCard(sliderStripPage)
      generatePagePets(paginationArr[paginationArr.length - 1], sliderStripPage)
      flagCurrentPage = paginationArr.length - 1
      buttonPaginationCurrentPage.textContent = `${flagCurrentPage + 1}`
   }
   if (event.target === buttonPaginationPrePage) {
      if (flagCurrentPage >= 1) {
         removeAllCard(sliderStripPage)
         generatePagePets(paginationArr[flagCurrentPage - 1], sliderStripPage)
         flagCurrentPage = flagCurrentPage - 1
         buttonPaginationCurrentPage.textContent = `${flagCurrentPage + 1}`
      }
   }
   if (event.target === buttonPaginationNextPage) {
      if (flagCurrentPage < paginationArr.length - 1) {
         removeAllCard(sliderStripPage)
         generatePagePets(paginationArr[flagCurrentPage + 1], sliderStripPage)
         flagCurrentPage = flagCurrentPage + 1
         buttonPaginationCurrentPage.textContent = `${flagCurrentPage + 1}`
      }
   }

   // console.log(event.target)
}

// buttonPaginationEnd.addEventListener('click', () => {
//    removeAllCard(sliderStripPage);
// });

// buttonPaginationEnd.addEventListener('click', removeAllCard(sliderStripPage))

// buttonPaginationEnd.addEventListener('click', function(){
//    console.log('последняя страница пагинации')
// })

/*************************************** */

// генерация карточек

// const sliderStripPage = document.querySelector('.slider-strip--page')

// appendNewCardInElement(0, sliderStripPage)
// appendNewCardInElement(0, sliderStripPage)

/*************************************** */
/*************************************** */
/*************************************** */



