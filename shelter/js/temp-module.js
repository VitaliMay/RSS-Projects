
import { dataPets } from "./products.js"

/************************************** */

function randomNumber () {
  return Math.floor(Math.random() * ((dataPets.length - 1) - 0 + 1))
}

export { randomNumber }

/*************************************** */

function createPetsNameIndexArr (petsNameIndexArr = []) {
  while (petsNameIndexArr.length < 8) {
    const randomDigit = randomNumber()
    const randomDigitTest = (element) => element === randomDigit;

    if(petsNameIndexArr.some(randomDigitTest)) {
        createPetsNameIndexArr(petsNameIndexArr)
    } else {
        petsNameIndexArr.push(randomDigit)
    }
  }
  return petsNameIndexArr
}

export { createPetsNameIndexArr }
/*************************************** */
/*************************************** */

// Функция для перемешивания массива (перемешивание Фишера-Йетса)
function shuffle(previousArr, slicePre, sliceCurr) {
  let array = [...previousArr]
  for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  let tempArr = previousArr.slice(slicePre)
  tempArr = tempArr.concat(array.slice(0, sliceCurr))
  // tempArr = [...new Set(tempArr)]  // убираю возможные повторы
  // console.log(`tempArr = ${tempArr}`)
  
  if (tempArr.length !== [...new Set(tempArr)].length) {
    return shuffle(previousArr, slicePre, sliceCurr)
  }
  return array;
}

export { shuffle }

/************************************************** */
// формирование массива пагинации

function createPaginationArr () {
  const paginationArr = [] // объявляю финишный массив
  // paginationArr[0] = createPetsNameIndexArr() // добавляю первый элемент (массив)

  for (let i = 0; i < 6; i += 3) {
      paginationArr[i] = createPetsNameIndexArr()
      paginationArr[i + 1] = shuffle(paginationArr[i], -2, 4)
      paginationArr[i + 2] = shuffle(paginationArr[i + 1], -4, 2)
  }
  return paginationArr
}

export { createPaginationArr }


/************************************************************** */
// формирование массивов для пагинации на разных расширениях

function createPaginationArrDevice (paginationArr, deviceCardNumber) {
  const paginationArrFlat = paginationArr.flat()
  const paginationArrDevice = []
  for (let i = 0; i < paginationArrFlat.length; i += deviceCardNumber) {
    paginationArrDevice.push(paginationArrFlat.slice(i, i + deviceCardNumber))
    // console.log(paginationArrDevice)
  }
  return paginationArrDevice
}

export { createPaginationArrDevice }

// Формирую массив уникальных имён питомцев
/**************************************************************** */
function createPetsNameArr (dataPets) {
  return dataPets.map((item) => item.name)
}

const petsNameArr = createPetsNameArr (dataPets)
// console.log(petsNameArr)
export { petsNameArr }
/*************************************************************** */

function cardCreation (uniqueIndex) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.setAttribute('data-uniqueIndex', uniqueIndex);  // Добавление data-атрибута
   // sliderFilm.append(cardElement);
  const cardFoto = document.createElement('div')
  cardFoto.classList.add('photo')
  cardFoto.classList.add(`photo--card-${(uniqueIndex + 1).toString().padStart(2, '0')}`)  // подкорректировать с padstart
   // cardFoto.classList.add(`photo--card-0${uniqueIndex + 1}`)  // подкорректировать с padstart

  cardElement.appendChild(cardFoto)

  const cardTitle = document.createElement('h4')
  cardTitle.classList.add('title-card')
  cardTitle.textContent = `${petsNameArr[uniqueIndex]}`

  cardElement.appendChild(cardTitle)

  const cardButton = document.createElement('button')
  cardButton.classList.add('button')
  cardButton.classList.add('button--card')
  cardElement.appendChild(cardButton)
  cardButton.textContent = 'Learn more'

//    sliderFilm.append(cardElement);
//    sliderFilm.prepend(cardElement);

   return cardElement;
}

export { cardCreation }


/********************************************* */
// добавление карточки в конец родительского элемента

function appendNewCardInElement(uniqueIndex, element) {
  const newCard = cardCreation(uniqueIndex); // Создание нового элемента (карточки)
  element.append(newCard); // Добавление созданной карточки в конец слайдера
}

export { appendNewCardInElement }

/******************************************************** */
// генерация карточек стартовой страницы

function startPagePets(paginationArr, element) {
  for (let i = 0; i < paginationArr[0].length; i += 1) {
    appendNewCardInElement(paginationArr[0][i], element)
  }
  // buttonPaginationStart.disabled = true;
  // buttonPaginationPrePage.disabled = true;
}

export { startPagePets }

// генерация карточек стартовой страницы

function generatePagePets(pagePaginationArr, element) {
  for (let i = 0; i < pagePaginationArr.length; i += 1) {
    appendNewCardInElement(pagePaginationArr[i], element)
  }
}

export { generatePagePets }


/********************************************************* */
// удаление всех карточек со страницы (удаления всех у элемента всех дочерних)

function removeAllCard(element) {
  while (element.firstElementChild) {
      element.removeChild(element.firstElementChild)
  }
}

export { removeAllCard }

/************************************************************** */
  
function calculationFlagCurrentPage(paginationArrPre, paginationArrCurrent, flagCurrentPagePre) {
  const preArrLenght = paginationArrPre.length
  const currArrLenght = paginationArrCurrent.length
  const numberElementOnPrePage = paginationArrPre[0].length
  const numberElementOnCurrPage = paginationArrCurrent[0].length
  let flagCurrentPage = flagCurrentPagePre

  if (flagCurrentPagePre) {
    if (flagCurrentPagePre === preArrLenght - 1) {
       flagCurrentPage = currArrLenght - 1
    } else {
      flagCurrentPage = Math.ceil((flagCurrentPagePre * numberElementOnPrePage + 1) / numberElementOnCurrPage) - 1
      //  flagCurrentPage = Math.ceil((flagCurrentPagePre * numberElementOnPrePage + 1) / numberElementOnCurrPage)
    }
  }

  return flagCurrentPage
}

export { calculationFlagCurrentPage }


