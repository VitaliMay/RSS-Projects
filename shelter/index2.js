console.log(`Привет, ещё раз) 
   При resize, пагинация работает так:
    - если стр 1 перехожу на страницу 1, 
    - если стр последняя перехожу на последнюю страницу,
    - в остальных случаях переход на страницу,
      на которой находится карточка, 
      стоящая первой на предыдущей странице.
   * Массивы страниц и петов оставляю в консоли, чтобы проверять было удобнее)`)

import { dataPets } from './js/products.js';
import { checkBurger } from './js/burger.js'

// console.log(dataPets)
// console.log(dataPets[0].name)
// console.log(checkBurger)

let modalPopup  // чтобы была видна модалка
// let modalBtnClose  // чтобы была видна модалка

const body = document.querySelector('body')
const fon = document.querySelector('.fon')
const menu = document.querySelector(".menu")
// const menu = document.querySelector(".menu__list")
const burgerButton = document.getElementById('burger-button')

const menuLink = document.querySelectorAll('.menu__list-item');

/********************************************** */

burgerButton.addEventListener("click", function(event) {
   // console.log('Проверка')
   // alert('Ещё одна проверка')

   // if(!menu.contains(event.target)) {
   //     menu.classList.remove('open');
   //   }

   menu.classList.toggle("open")
   burgerButton.classList.toggle("rotade")
   body.classList.toggle('lock')
   fon.classList.toggle('work')


})

menu.addEventListener('click', burgerMenu)

function burgerMenu (event) {
   // console.log(event.target)
   if (event.target.classList.contains('menu__list-link')){
      closeMenu()
      
   }
}

// menuLink.forEach(link => link.addEventListener('click', closeMenu));

/********************************************** */

// import { closeMenu } from './js/closeMenu.js';

// fon.addEventListener('click', function(event) {
//    if (event.target === fon) {
//      closeMenu(menu, burgerButton, body, fon);
//    }
//  });
// fon.addEventListener('click', () =>  closeMenu(menu, burgerButton, body, fon, modalPopup));
fon.addEventListener('click', closeMenu);

// modalBtnClose.addEventListener('click', function(event) { 
//    // Клик произошел именно на родительском элементе
//    // closeMenu()
//    // console.log(event.target)
//    closeMenu(menu, burgerButton, body, fon, modalPopup)
// })

// // modal.addEventListener('click', function () {console.log(event.target.conta)})

// Чтобы закрывалось при клике под кнопкой bntClose и слева от нее, когда попадает не на фон а на родителя
// modalPopup.addEventListener('click', function(event) { 
//    if (event.target === this) {
//      // Клик произошел именно на родительском элементе
//      // closeMenu()
//      closeMenu(menu, burgerButton, body, fon, modalPopup)
//    } 
// })
/******************************************** */
/******************************************** */

import { calculationFlagCurrentPage } from './js/temp-module.js';

window.addEventListener('resize', function() {
  // const resizeCardNumber = resizeCardNumber ()
   if (window.innerWidth >= 767.9 && menu.classList.contains("open")) {
      closeMenu()
   }
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
      // console.log('большой размер')

      // flagCurrentPage = 0
      removeAllCard(sliderStripPage)
      generatePagePets(paginationArrCurrent[flagCurrentPage], sliderStripPage)
      buttonPaginationCurrentPage.textContent = `${flagCurrentPage + 1}`
   }
   if (newWidth <= 1100.9 && newWidth > 659.9 && (currentWidth > 1100.9 || currentWidth <= 659.9)) {

      flagCurrentPage = calculationFlagCurrentPage(paginationArrCurrent, paginationArrTablet, flagCurrentPage)

      paginationArrCurrent = [...paginationArrTablet]
      // console.log('средний размер')
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
      // console.log('малый размер')

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

/**************************************** */
// запускаю модалку

sliderStripPage.addEventListener('click', startModal)

// import { modalCreation } from './js/modal.js';

function startModal (event) {
   const modalCard = event.target.closest('.card')
    if (modalCard) {
      //   console.log(`Ура Почти модалка`)
      //   console.log(`${modalCard.getAttribute('data-uniqueIndex')}`)
        const dataIndex = modalCard.getAttribute('data-uniqueIndex')
      //   // console.log(typeof Number(dataIndex))
      //   modalCreation(Number(dataIndex))
        modalCreation(Number(dataIndex), body)
        body.classList.add('lock');
        fon.classList.add('work');
    }
}

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

function closeMenu() {

   // if (menu && menu.classList) {
     menu.classList.remove('open');
   // }
   // if (burgerButton && burgerButton.classList) {
     burgerButton.classList.remove('rotade');
   // }
   // if (body && body.classList) {
     body.classList.remove('lock');
   // }
   // if (fon) {
   // if (fon && fon.classList) {
     fon.classList.remove('work');
   // }
 
   // if (modalPopup && modalPopup.classList) {
   if (modalPopup) {
       modalPopup.classList.remove('modal--active')
       setTimeout(function() { 
           modalPopup.remove()
       }, 400);
   }
   
 }


/********************************************** */
/********************************************** */


function modalCreation (dataUniqueIndex, body) {
   const modal = document.createElement("div");
   modal.classList.add("modal");

   // const fonModal = document.createElement("div");
   // fonModal.classList.add('fon')

   const btnClose = document.createElement("div");
   btnClose.classList.add('button')
   btnClose.classList.add('button--close')
   btnClose.classList.add('modal-btn--close')
   btnClose.innerHTML = `
       <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path class="button__svg--close" fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#292929" />
       </svg>
   `

   const modalContainer = document.createElement("div");
   modalContainer.classList.add('modal-container')

   const modalFoto = document.createElement('div')
   modalFoto.classList.add('photo')
   modalFoto.classList.add(`photo--card-${(dataUniqueIndex + 1).toString().padStart(2, '0')}`)  // подкорректировать с padstart
   modalFoto.classList.add('photo--modal') 

   const modalContent = document.createElement("div");
   modalContent.classList.add('modal-content')

   const modalTitle = document.createElement("div");
   modalTitle.classList.add('modal-title')

   const modalTitleName = document.createElement("h3");
   modalTitleName.classList.add('modal-title-name')
   modalTitleName.textContent = `${dataPets[dataUniqueIndex].name}`


   const modalTitleBreed = document.createElement("p");
   modalTitleBreed.classList.add('modal-title-breed')
   modalTitleBreed.textContent = `${dataPets[dataUniqueIndex].type} - ${dataPets[dataUniqueIndex].breed}`

   modalTitle.appendChild(modalTitleName)
   modalTitle.appendChild(modalTitleBreed)

   
   const modalDescription = document.createElement("p");
   modalDescription.classList.add('modal-description')
   modalDescription.textContent = `${dataPets[dataUniqueIndex].description}`

   const modalList = document.createElement('ul')
   modalList.classList.add('modal-list')

   const modalListItemAge = document.createElement('li')
   modalListItemAge.classList.add('modal-list__item')

   const modalListItemAgeTitle = document.createElement('span')
   modalListItemAgeTitle.classList.add('modal-list__item-title')
   modalListItemAgeTitle.classList.add('modal-list__item-title--age')
   modalListItemAgeTitle.textContent = 'Age:'

   const modalListItemAgeContent = document.createElement('span')
   modalListItemAgeContent.classList.add('modal-list__item-content')
   modalListItemAgeContent.textContent = ` ${dataPets[dataUniqueIndex].age}`

   modalListItemAge.appendChild(modalListItemAgeTitle)
   modalListItemAge.appendChild(modalListItemAgeContent)

   modalList.appendChild(modalListItemAge)

   const modalListItemInoculations = document.createElement('li')
   modalListItemInoculations.classList.add('modal-list__item')

   const modalListItemInoculationsTitle = document.createElement('span')
   modalListItemInoculationsTitle.classList.add('modal-list__item-title')
   modalListItemInoculationsTitle.textContent = 'Inoculations:'

   const modalListItemInoculationsContent = document.createElement('span')
   modalListItemInoculationsContent.classList.add('modal-list__item-content')
   modalListItemInoculationsContent.textContent = ` ${dataPets[dataUniqueIndex].inoculations.join(', ')}`

   modalListItemInoculations.appendChild(modalListItemInoculationsTitle)
   modalListItemInoculations.appendChild(modalListItemInoculationsContent)

   const modalListItemDiseases = document.createElement('li')
   modalListItemDiseases.classList.add('modal-list__item')

   const modalListItemDiseasesTitle = document.createElement('span')
   modalListItemDiseasesTitle.classList.add('modal-list__item-title')
   modalListItemDiseasesTitle.textContent = 'Diseases:'

   const modalListItemDiseasesContent = document.createElement('span')
   modalListItemDiseasesContent.classList.add('modal-list__item-content')
   modalListItemDiseasesContent.textContent = ` ${dataPets[dataUniqueIndex].diseases.join(', ')}`

   modalListItemDiseases.appendChild(modalListItemDiseasesTitle)
   modalListItemDiseases.appendChild(modalListItemDiseasesContent)

   const modalListItemParasites = document.createElement('li')
   modalListItemParasites.classList.add('modal-list__item')

   const modalListItemParasitesTitle = document.createElement('span')
   modalListItemParasitesTitle.classList.add('modal-list__item-title')
   modalListItemParasitesTitle.textContent = 'Parasites:'

   const modalListItemParasitesContent = document.createElement('span')
   modalListItemParasitesContent.classList.add('modal-list__item-content')
   modalListItemParasitesContent.textContent = ` ${dataPets[dataUniqueIndex].parasites.join(', ')}`

   modalListItemParasites.appendChild(modalListItemParasitesTitle)
   modalListItemParasites.appendChild(modalListItemParasitesContent)

   modalList.appendChild(modalListItemAge)
   modalList.appendChild(modalListItemInoculations)
   modalList.appendChild(modalListItemDiseases)
   modalList.appendChild(modalListItemParasites)

   modalContent.appendChild(modalTitle)
   modalContent.appendChild(modalDescription)
   modalContent.appendChild(modalList)

   modalContainer.appendChild(modalFoto)
   modalContainer.appendChild(modalContent)

   // modal.appendChild(fonModal)
   modal.appendChild(btnClose)
   modal.appendChild(modalContainer)

//    sliderFilm.append(cardElement);
//    sliderFilm.prepend(cardElement);

   body.appendChild(modal)

   modalPopup = modal // чтобы переменная modal была видна
   // btnCloseModalPopup = btnClose
   // fon = fonModal
   //  return cardElement;
   // btnCloseModalPopup.addEventListener('click', closeMenu)
   btnClose.addEventListener('click', closeMenu)
   // modal.addEventListener('click', function () {console.log(event.target.conta)})
   
   // Чтобы закрывалось при клике под кнопкой bntClose и слева от нее, когда попадает не на фон а на родителя
   modal.addEventListener('click', function(event) { 
       if (event.target === this) {
         // Клик произошел именно на родительском элементе
         closeMenu()
       } 
   })
   // modal.addEventListener('click', function(event) {
   //     if (event.target === this) {
   //       // Клик произошел именно на родительском элементе
   //       console.log('Клик произошел на родителе');
   //     } else {
   //       // Клик произошел на дочернем элементе
   //       console.log('Клик произошел на дочернем элементе');
   //     }
   // })

   setTimeout(function() { // проявляю модалку
      modal.classList.add('modal--active')
      modalPopup = modal
      // modal.classList.add('modal--active')
   }, 0);

}

