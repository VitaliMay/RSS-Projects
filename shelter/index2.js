console.log(`Привет. 
   При resize, 
   если стр 1 перехожу на страницу 1, 
   если стр последняя перехожу на последнюю страницу,
   в остальных случаях переход на страницу,
   на которой находится карточка, стоящая первой.`)

import { dataPets } from './js/products.js';
import { checkBurger } from './js/burger.js'

// console.log(dataPets)
// console.log(dataPets[0].name)
// console.log(checkBurger)

let modalPopup  // чтобы была видна модалка

/******************************************** */
/******************************************** */

import { calculationFlagCurrentPage } from './js/temp-module.js';

window.addEventListener('resize', function() {
  // const resizeCardNumber = resizeCardNumber ()
   // if (window.innerWidth >= 767.9 && menu.classList.contains("open")) {
   //    closeMenu()
   // }
   const newWidth = window.innerWidth;
   if (newWidth > 1100.9 && currentWidth <= 1100.9) {
      // const preArrLenght = paginationArrCurrent.length
      // const currArrLenght = paginationArr.length
      // // const numberElArrs = paginationArr.flat().length
      // const numberElementOnPrePage = paginationArrCurrent[0].length
      // // const numberElementOnPrePage = numberElArrs/preArrLenght
      // const numberElementOnCurrPage = paginationArr[0].length

      // if (flagCurrentPage) {
      //    if (flagCurrentPage === preArrLenght - 1) {
      //       flagCurrentPage = currArrLenght - 1
      //    } else {
      //       flagCurrentPage = Math.ceil(((flagCurrentPage + 1) * numberElementOnPrePage + 1) / numberElementOnCurrPage)
      //    }
      // }
      
      flagCurrentPage = calculationFlagCurrentPage(paginationArrCurrent, paginationArr, flagCurrentPage)

      // flagCurrentPage = () => {
      //    paginationArrCurrent.length
      // }
      /////////////////////////////////////

      paginationArrCurrent = [...paginationArr]
      currentWidth = newWidth;
      console.log('большой размер')

      // flagCurrentPage = 0
      removeAllCard(sliderStripPage)
      generatePagePets(paginationArrCurrent[flagCurrentPage], sliderStripPage)
      buttonPaginationCurrentPage.textContent = `${flagCurrentPage + 1}`
   }
   if (newWidth <= 1100.9 && newWidth > 659.9 && (currentWidth > 1100.9 || currentWidth <= 659.9)) {

      flagCurrentPage = calculationFlagCurrentPage(paginationArrCurrent, paginationArrTablet, flagCurrentPage)

      paginationArrCurrent = [...paginationArrTablet]
      console.log('средний размер')
      currentWidth = newWidth;

      // flagCurrentPage = 0
      removeAllCard(sliderStripPage)
      generatePagePets(paginationArrCurrent[flagCurrentPage], sliderStripPage)
      buttonPaginationCurrentPage.textContent = `${flagCurrentPage + 1}`
   }
   if (newWidth <= 659.9 && currentWidth > 659.9) {

      flagCurrentPage = calculationFlagCurrentPage(paginationArrCurrent, paginationArrMobile, flagCurrentPage)

      paginationArrCurrent = [...paginationArrMobile]
      currentWidth = newWidth;
      console.log('малый размер')

      // flagCurrentPage = 0
      removeAllCard(sliderStripPage)
      generatePagePets(paginationArrCurrent[flagCurrentPage], sliderStripPage)
      buttonPaginationCurrentPage.textContent = `${flagCurrentPage + 1}`
   }


   setPaginationState (flagCurrentPage, buttonPaginationArr)
   // if (flagCurrentPage === 0) {
   //    buttonPaginationStart.disabled = true;
   //    buttonPaginationPrePage.disabled = true;
   //    buttonPaginationEnd.disabled = false;
   //    buttonPaginationNextPage.disabled = false;
   // } else if (flagCurrentPage === paginationArrCurrent.length - 1) {
   //    buttonPaginationStart.disabled = false;
   //    buttonPaginationPrePage.disabled = false;
   //    buttonPaginationEnd.disabled = true;
   //    buttonPaginationNextPage.disabled = true;
   // } else {
   //    buttonPaginationStart.disabled = false;
   //    buttonPaginationPrePage.disabled = false;
   //    buttonPaginationEnd.disabled = false;
   //    buttonPaginationNextPage.disabled = false;
   // }

});

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

/************************************************************* */

import { createPaginationArrDevice } from './js/temp-module.js';

const paginationArrTablet = createPaginationArrDevice (paginationArr, 6)
console.log(paginationArrTablet)
console.log(paginationArrTablet.length)

const paginationArrMobile = createPaginationArrDevice (paginationArr, 3)
console.log(paginationArrMobile)
console.log(paginationArrMobile.length)

/************************************************* */

// let paginationArrCurrent = [...paginationArrMobile]
// let paginationArrCurrent = [...paginationArrTablet]
// let paginationArrCurrent = [...paginationArr]

/************************************************* */

import { cardCreation } from './js/temp-module.js';

import { appendNewCardInElement } from './js/temp-module.js';

import { startPagePets } from './js/temp-module.js';

// формирование стартовой страницы

let paginationArrCurrent = []
let currentWidth = window.innerWidth;

if (currentWidth > 1100.9) {
// if (window.innerWidth > 1100.9) {
   paginationArrCurrent = [...paginationArr]
}
if (currentWidth <= 1100.9 && currentWidth > 659.9) {
// if (window.innerWidth <= 1100.9 && window.innerWidth > 659.9) {
   paginationArrCurrent = [...paginationArrTablet]
}
if (currentWidth <= 659.9) {
// if (window.innerWidth <= 659.9) {
   paginationArrCurrent = [...paginationArrMobile]
}

const sliderStripPage = document.querySelector('.slider-strip--page')
startPagePets(paginationArrCurrent, sliderStripPage)
// startPagePets(paginationArr, sliderStripPage)

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

// buttonPaginationStart.disabled = true;
// buttonPaginationPrePage.disabled = true;

setPaginationState (flagCurrentPage, buttonPaginationArr)

// Функция для установки состояния кнопок пагинации
function setPaginationState (flagCurrentPage, buttonPaginationArr) {
   const buttonPaginationStart = buttonPaginationArr[0]
   const buttonPaginationPrePage = buttonPaginationArr[1]
   const buttonPaginationNextPage = buttonPaginationArr[3]
   const buttonPaginationEnd = buttonPaginationArr[4]

   if (flagCurrentPage === 0) {
      buttonPaginationStart.disabled = true;
      buttonPaginationPrePage.disabled = true;
      buttonPaginationEnd.disabled = false;
      buttonPaginationNextPage.disabled = false;
   } else if (flagCurrentPage === paginationArrCurrent.length - 1) {
      buttonPaginationStart.disabled = false;
      buttonPaginationPrePage.disabled = false;
      buttonPaginationEnd.disabled = true;
      buttonPaginationNextPage.disabled = true;
   } else {
      buttonPaginationStart.disabled = false;
      buttonPaginationPrePage.disabled = false;
      buttonPaginationEnd.disabled = false;
      buttonPaginationNextPage.disabled = false;
   }
}


paginationNavigation.addEventListener('click', paginationControl)

function paginationControl (event) {

   if (event.target === buttonPaginationStart) {
      removeAllCard(sliderStripPage)
      generatePagePets(paginationArrCurrent[0], sliderStripPage)
      // generatePagePets(paginationArrMobile[0], sliderStripPage)
      // generatePagePets(paginationArr[0], sliderStripPage)
      flagCurrentPage = 0
      buttonPaginationCurrentPage.textContent = `${flagCurrentPage + 1}`

      // buttonPaginationStart.classList.add('disabled')
      // buttonPaginationStart.disabled = true;

      // buttonPaginationStart.disabled = true;
      // buttonPaginationPrePage.disabled = true;
      // buttonPaginationEnd.disabled = false;
      // buttonPaginationNextPage.disabled = false;
   }
   if (event.target === buttonPaginationEnd) {
      removeAllCard(sliderStripPage)
      generatePagePets(paginationArrCurrent[paginationArrCurrent.length - 1], sliderStripPage)
      // generatePagePets(paginationArrMobile[paginationArrMobile.length - 1], sliderStripPage)
      // generatePagePets(paginationArr[paginationArr.length - 1], sliderStripPage)
      flagCurrentPage = paginationArrCurrent.length - 1
      // flagCurrentPage = paginationArrMobile.length - 1
      // flagCurrentPage = paginationArr.length - 1
      buttonPaginationCurrentPage.textContent = `${flagCurrentPage + 1}`
   
      // buttonPaginationStart.disabled = false;
      // buttonPaginationPrePage.disabled = false;
      // buttonPaginationEnd.disabled = true;
      // buttonPaginationNextPage.disabled = true;
   }
   if (event.target === buttonPaginationPrePage) {
      if (flagCurrentPage >= 1) {
         removeAllCard(sliderStripPage)
         generatePagePets(paginationArrCurrent[flagCurrentPage - 1], sliderStripPage)
         // generatePagePets(paginationArrMobile[flagCurrentPage - 1], sliderStripPage)
         // generatePagePets(paginationArr[flagCurrentPage - 1], sliderStripPage)
         flagCurrentPage = flagCurrentPage - 1
         buttonPaginationCurrentPage.textContent = `${flagCurrentPage + 1}`
      
         // if (flagCurrentPage === 0) {
         //    buttonPaginationStart.disabled = true;
         //    buttonPaginationPrePage.disabled = true;
         //    buttonPaginationEnd.disabled = false;
         //    buttonPaginationNextPage.disabled = false;
         // } else {
         //    buttonPaginationStart.disabled = false;
         //    buttonPaginationPrePage.disabled = false;
         //    buttonPaginationEnd.disabled = false;
         //    buttonPaginationNextPage.disabled = false;
         // }
      }
   }
   if (event.target === buttonPaginationNextPage) {
      if (flagCurrentPage < paginationArrCurrent.length - 1) {
      // if (flagCurrentPage < paginationArrMobile.length - 1) {
      // if (flagCurrentPage < paginationArr.length - 1) {
         removeAllCard(sliderStripPage)
         generatePagePets(paginationArrCurrent[flagCurrentPage + 1], sliderStripPage)
         // generatePagePets(paginationArrMobile[flagCurrentPage + 1], sliderStripPage)
         // generatePagePets(paginationArr[flagCurrentPage + 1], sliderStripPage)
         flagCurrentPage = flagCurrentPage + 1
         buttonPaginationCurrentPage.textContent = `${flagCurrentPage + 1}`
      }
   }

   setPaginationState (flagCurrentPage, buttonPaginationArr)
   // if (flagCurrentPage === 0) {
   //    buttonPaginationStart.disabled = true;
   //    buttonPaginationPrePage.disabled = true;
   //    buttonPaginationEnd.disabled = false;
   //    buttonPaginationNextPage.disabled = false;
   // } else if (flagCurrentPage === paginationArrCurrent.length - 1) {
   //    buttonPaginationStart.disabled = false;
   //    buttonPaginationPrePage.disabled = false;
   //    buttonPaginationEnd.disabled = true;
   //    buttonPaginationNextPage.disabled = true;
   // } else {
   //    buttonPaginationStart.disabled = false;
   //    buttonPaginationPrePage.disabled = false;
   //    buttonPaginationEnd.disabled = false;
   //    buttonPaginationNextPage.disabled = false;
   // }
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



