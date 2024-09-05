const score = `
Привет. Вроде всё есть и работает)
Из недостатков
 - в коде полно мусора, дублирования, модульность фактически отсутствует, код не структурирован
 - в пагинации нет плавности
 - бургер меню без прокрутки (при ротации экрана обрезается)
 - модалка с резиновой адаптацией, но не докручена до конца (на мобайл вроде ОК, а на десктопе при масштабировании теряется крестик и позиционирование)
 
 Но это YAGNI и ТЗ не требует
 Сорри за небрежность 
    `;
console.log(score);


import { dataPets } from './js/products.js';
// import { checkBurger } from './js/burger.js'

// console.log(dataPets)
// console.log(dataPets[0].name)
// console.log(checkBurger)

// export const checkIndex = 'Проверка index'

// import { sliderBtnLeft } from './js/burger.js'
// console.log(sliderBtnLeft)

// Slider

const slider = document.querySelector('.slider')
const sliderBtnLeft = document.querySelector('.slider__btn--order-01')
const sliderBtnRight = document.querySelector('.slider__btn--order-02')

const sliderScreen = document.querySelector('.slider__inner')

const sliderFilm = document.querySelector('.slider-strip')

// const cardItem = document.querySelector('.card')  // чтобы определить ширину карточки

let currentSlide = 0;  //
// let currentSlide = -1;  // чтобы стало на 3м кадре

let cardNumber   // переменная для отслеживания количества показываемых карточек 

const counter = counterCreate()  // счётчик на замыкании

// const petsArr = []

// console.log(dataPets.length)

let flagFirstClickSlider = false;
let flagSliderBtnLeftClickDouble = false;
let flagSliderBtnRightClickDouble = false;

const flagBtnArr = ['CURRENTFRAME', 'LEFTFRAME', 'RIGHTFRAME']
// const flagBtnArr = ['STARTCLICK', 'FIRSTCLICK', 'SECONDCLICK']
// let flagSliderBtnLeftClickDouble = false;

let currentFrameArr = []
let previousFrameArr = []

let firstFrameArr = []
let secondFrameArr = []
let flagFrame = flagBtnArr[0]

let isSliderMoving = false; // флаг движения слайдера

const timeAnimationDelay = 800
/************************************************* */

let modalPopup  // чтобы была видна модалка
// let btnCloseModalPopup // чтобы была видна кнопка
/************************************************* */

// window.addEventListener('resize', function() {
//     console.log('Screen width changed to:', window.innerWidth);
//   });

window.addEventListener('resize', function() {
    // const resizeCardNumber = resizeCardNumber ()
     if (window.innerWidth >= 767.9 && menu.classList.contains("open")) {
        closeMenu()
     }
    
    if (resizeCardNumber () !== cardNumber) {
        console.log('Screen width changed to:', window.innerWidth);
        cardNumber = resizeCardNumber()
        console.log(`cardNumber = ${cardNumber}`)

        removeAllCard(sliderFilm)

        for (let i = 0; i < cardNumber; i += 1) {
            // appendNewCard(currentFrameArr[i + 3 - cardNumber])
            appendNewCard(currentFrameArr[i])
        }
    }
});

function resizeCardNumber () {
    const sliderWidth = sliderScreen.offsetWidth;
    const cardWidth = 270;
    const resizeCardNumber = Math.floor(sliderWidth / cardWidth) 
    return resizeCardNumber
}

// const tempRemove = document.querySelector('.footer')
// tempRemove.remove()

// while (node.firstChild) {
//     node.removeChild(node.firstChild);
// }

// console.log(`sliderFilm.firstChild = ${sliderFilm.firstElementChild}`)

// Формирую массив уникальных имён питомцев
/**************************************************************** */
function createPetsNameArr (dataPets) {
    return dataPets.map((item) => item.name)
}

const petsNameArr = createPetsNameArr (dataPets)
console.log(petsNameArr)
/*************************************************************** */

// Получение случайного питомца
/*************************************************************** */
// Случайное целое число в диапазоне, включая минимальное и максимальное
// Math.floor(Math.random() * (max - min + 1)) + min;

function randomNumber () {
    return Math.floor(Math.random() * ((dataPets.length - 1) - 0 + 1))
}

// export { randomNumber }

// let uniqueIndexPetsNameArr = []

for (let index = 0; index < 3; index++) {
    // console.log(`random ${randomNumber ()}`)
    createUniqueIndexPetsName(currentFrameArr)
}

// for (let index = 0; index < 3; index++) {
//     // console.log(`random ${randomNumber ()}`)
//     createUniqueIndexPetsName(uniqueIndexPetsNameArr)
// }


function createUniqueIndexPetsName (uniqueIndexPetsNameArr) {
    const randomDigit = randomNumber()
    const randomDigitTest = (element) => element === randomDigit;

    if(uniqueIndexPetsNameArr.some(randomDigitTest)) {
        createUniqueIndexPetsName(uniqueIndexPetsNameArr)
    } else {
        uniqueIndexPetsNameArr.push(randomDigit)
    }
}
// function createUniqueIndexPetsName () {
//     const randomDigit = randomNumber()
//     const randomDigitTest = (element) => element === randomDigit;

//     if(uniqueIndexPetsNameArr.some(randomDigitTest)) {
//         createUniqueIndexPetsName()
//     } else {
//         uniqueIndexPetsNameArr.push(randomDigit)
//     }
// }

// console.log(uniqueIndexPetsNameArr)
console.log(`currentFrameArr = ${currentFrameArr}`)

function createArrPetsIndex (currentArrPetsIndex) {
    let arrPetsIndex = []
    let arrPetsIndexTemp = [].concat(currentArrPetsIndex)
    for (let index = 0; index < 3; index++) {
        // console.log(`random ${randomNumber ()}`)
        createUniqueIndexPetsName(arrPetsIndexTemp)
    }
    arrPetsIndex = arrPetsIndexTemp.slice(-3)
    return arrPetsIndex
}

// firstFrameArr = createArrPetsIndex(currentFrameArr)
// console.log(firstFrameArr)
// const rightArrPetsIndex = createArrPetsIndex(currentFrameArr)
// console.log(rightArrPetsIndex)

// const leftArrPetsIndex = createArrPetsIndex(uniqueIndexPetsNameArr)
// console.log(leftArrPetsIndex)
// const rightArrPetsIndex = createArrPetsIndex(uniqueIndexPetsNameArr)
// console.log(rightArrPetsIndex)

/*************************************************************** */


// Start

function startMain () {
    for (let i = 0; i < resizeCardNumber(); i += 1) {
    // for (let i = 0; i < 3; i += 1) {
        appendNewCard(currentFrameArr[i])
        // appendNewCard(uniqueIndexPetsNameArr[i])
        // cardTitle.textContent = `AAA- ${i}`
    }

    let sliderWidth = sliderScreen.offsetWidth;
    // console.log(sliderWidth)

    let cardWidth = 270;
    // let cardWidth = cardItem.offsetWidth;
    // console.log(cardWidth)

    let cardGapTotal = sliderWidth % cardWidth
    let cardGap = 40

    cardNumber = Math.floor(sliderWidth / cardWidth) // количество карточек в слайдере
    // let cardNumber = Math.floor(sliderWidth / cardWidth) // количество карточек в слайдере
    // console.log(`Количество карточек ${cardNumber}`)
    // console.log(`Ширина экрана ${sliderWidth}`)

    if (cardGapTotal) {cardGap = cardGapTotal / (cardNumber - 1)}

    sliderFilm.style.transform = `translateX(${currentSlide*(sliderWidth + cardGap)}px)`

}

startMain ()



slider.addEventListener('click', moveSlider)

// slider.addEventListener('click', function(event) {
//     if (isSliderMoving) {
//         event.stopImmediatePropagation(); // Остановка распространения события в случае, если слайдер уже двигается
//         return;
//     }
//     isSliderMoving = true;
//     moveSlider(event);
// });

function moveSlider (event) {

    if (isSliderMoving) {  // если слайдер движется, то не работаем
        return;
    }

    // isSliderMoving = true;
    // sliderBtnLeft.disabled = true;
    // sliderBtnRight.disabled = true;

    const sliderBtn = event.target.closest('.slider__btn')
    if (sliderBtn) {
        isSliderMoving = true;
        sliderBtnLeft.disabled = true;
        sliderBtnRight.disabled = true;
    }

    const modalCard = event.target.closest('.card')
    if (modalCard) {
        // console.log(`Ура Почти модалка`)
        // console.log(`${modalCard.getAttribute('data-uniqueIndex')}`)
        const dataIndex = modalCard.getAttribute('data-uniqueIndex')
        // console.log(typeof Number(dataIndex))
        modalCreation(Number(dataIndex))

        body.classList.add('lock');
        fon.classList.add('work');
    }

    let sliderWidth = sliderScreen.offsetWidth;

    let cardWidth = 270;
    // let cardWidth = cardItem.offsetWidth;
    // console.log(cardWidth)

    let cardGapTotal = sliderWidth % cardWidth
    let cardGap = 40

    cardNumber = Math.floor(sliderWidth / cardWidth)
    // let cardNumber = Math.floor(sliderWidth / cardWidth)
    // console.log(`Количество карточек ${cardNumber}`)
    // console.log(`Ширина экрана ${sliderWidth}`)

    if (cardGapTotal) {cardGap = cardGapTotal / (cardNumber - 1)}
    // console.log(`Расстояние между карточками ${cardGap}`)

    const currentSliderPosition = sliderFilm.style.transform;
    // console.log(`currentSliderPosition = ${currentSliderPosition}`)

    // for (let i = 0; i < cardNumber; i += 1) {
    //     cardCreation ()
    //     // sliderFilm.style.transform = -currentSliderPosition
    //     // sliderFilm.style.transform = `translateX(-${(cardWidth + cardGap)}px)`

    // // Сохранение текущего положения слайдера
    // }

    if (sliderBtn === sliderBtnLeft) {

        currentSlide = currentSlide - 1
        sliderFilm.style.transition = '0s';

        // if (flagFrame === flagBtnArr[1]) {
        //     previousFrameArr = [...currentFrameArr] // поверхностноя копия массива
        //     currentFrameArr = createArrPetsIndex(currentFrameArr)
        // }
        // flagFrame = flagBtnArr[1]

        // if (cardNumber === 3) {
        //     if (flagFrame !== flagBtnArr[2]) {
        //         previousFrameArr = [...currentFrameArr].slice(0, cardNumber) // поверхностноя копия массива
        //         currentFrameArr = createArrPetsIndex(currentFrameArr)
        //         flagFrame = flagBtnArr[1]
        //     }
        //     if (flagFrame === flagBtnArr[2]) {
        //         [currentFrameArr, previousFrameArr] = [[...previousFrameArr].slice(-cardNumber), [...currentFrameArr].slice(0, cardNumber)]
        //         flagFrame = flagBtnArr[1]
        //     }
        // }
        // if (cardNumber !== 3) {
        //     if (flagFrame !== flagBtnArr[2]) {
        //         previousFrameArr = [...currentFrameArr].slice(0, cardNumber) // поверхностноя копия массива
        //         currentFrameArr = createArrPetsIndex(currentFrameArr)
        //         flagFrame = flagBtnArr[1]
        //     }
        //     if (flagFrame === flagBtnArr[2]) {
        //         [currentFrameArr, previousFrameArr] = [[...previousFrameArr].slice(-cardNumber), [...currentFrameArr].slice(0, cardNumber)]
        //         flagFrame = flagBtnArr[1]
        //     }
        // }

        if (flagFrame !== flagBtnArr[2]) {
            previousFrameArr = [...currentFrameArr] // поверхностноя копия массива
            currentFrameArr = createArrPetsIndex(currentFrameArr)
            flagFrame = flagBtnArr[1]
        }
        if (flagFrame === flagBtnArr[2]) {
            // let tempArr = [...currentFrameArr]
            // currentFrameArr = [...previousFrameArr]
            // previousFrameArr = [...tempArr]
            // previousFrameArr = [...currentFrameArr] // поверхностноя копия массива
            // [currentFrameArr, previousFrameArr] = [previousFrameArr, currentFrameArr]
            [currentFrameArr, previousFrameArr] = [[...previousFrameArr], [...currentFrameArr]]
            flagFrame = flagBtnArr[1]
        }

        /*********************************************************************************** */
        // console.log(`new left currentFrameArr = ${currentFrameArr}`)
        // console.log(`new left previousFrameArr = ${previousFrameArr}`)
        /*********************************************************************************** */

        let currentFrameArrPretend = [...currentFrameArr] // чтобы сохранить порядок вывода карточек
        // let currentFrameArrPretend = [...currentFrameArr].reverse() // чтобы сохранить порядок вывода карточек
        // let currentFrameArrPretend = [...currentFrameArr].slice(0, cardNumber).reverse() // чтобы сохранить порядок вывода карточек
        /*********************************************************************************** */

        // console.log(`currentFrameArrPretend = ${currentFrameArrPretend}`)
        /*********************************************************************************** */

        // for (let i = 0; i < 3; i += 1) { // удаляю 3 и вставлять надо 3

        // for (let i = 0; i < cardNumber; i += 1) {
        for (let i = cardNumber - 1; i >= 0; i -= 1) {
            // let currentFrameArrPretend = [...currentFrameArr].reverse()
            // console.log(`currentFrameArrPretend = ${currentFrameArrPretend}`)
            // prependNewCard(currentFrameArrPretend[i + 3 - cardNumber])
            prependNewCard(currentFrameArrPretend[i])
            // prependNewCard(currentFrameArr[i])
        };
            // for (let i = 0; i < cardNumber; i += 1) {
            //     prependNewCard(leftArrPetsIndex[i])
            // };

        sliderFilm.style.transform = `translateX(${currentSlide*(sliderWidth + cardGap)}px)`

        setTimeout(function() {
            sliderFilm.style.transition = '0.7s';
            currentSlide = currentSlide + 1;
            sliderFilm.style.transform = `translateX(${currentSlide*(sliderWidth + cardGap)}px)`

        }, 0);

        setTimeout(function() {
            // for (let i = 0; i < 3; i += 1) { // карточек всегда 3
            for (let i = 0; i < cardNumber; i += 1) {
                removeLastCard(sliderFilm)
                // removeLastCard()
            };
        }, timeAnimationDelay);
        // }, 800);
    }

    if (sliderBtn === sliderBtnRight) {

        // sliderFilm.style.transition = '0.7s';
        // currentSlide = currentSlide - 1
        // for (let i = 0; i < cardNumber; i += 1) {
        //     appendNewCard()
        // }
        // sliderFilm.style.transform = `translateX(${currentSlide*(sliderWidth + cardGap)}px)`

        if (flagFrame !== flagBtnArr[1]) {
            previousFrameArr = [...currentFrameArr] // поверхностноя копия массива
            currentFrameArr = createArrPetsIndex(currentFrameArr)
            flagFrame = flagBtnArr[2]
        }
        if (flagFrame === flagBtnArr[1]) {
            // let tempArr = [...currentFrameArr]
            // currentFrameArr = [...previousFrameArr]
            // previousFrameArr = [...tempArr]
            [currentFrameArr, previousFrameArr] = [[...previousFrameArr], [...currentFrameArr]]
            // previousFrameArr = [...currentFrameArr] // поверхностноя копия массива
            // [currentFrameArr, previousFrameArr] = [previousFrameArr, currentFrameArr]

            flagFrame = flagBtnArr[2]
        }

        /*********************************************************************************** */
        // console.log(`new right currentFrameArr = ${currentFrameArr}`)
        // console.log(`new right previousFrameArr = ${previousFrameArr}`)
        /*********************************************************************************** */


        for (let i = 0; i < cardNumber; i += 1) {
            // appendNewCard(currentFrameArr[i + 3 - cardNumber])
            appendNewCard(currentFrameArr[i])
        }
        // for (let i = 0; i < cardNumber; i += 1) {
        //     appendNewCard(rightArrPetsIndex[i])
        // }

        setTimeout(function() {
            sliderFilm.style.transition = '0.7s';
            currentSlide = currentSlide - 1;
            sliderFilm.style.transform = `translateX(${currentSlide*(sliderWidth + cardGap)}px)`
        }, 0);

        setTimeout(function() {
            sliderFilm.style.transition = '0s';
            currentSlide = currentSlide + 1;

            for (let i = 0; i < cardNumber; i += 1) {
                removeFirstCard(sliderFilm)
            }

            sliderFilm.style.transform = `translateX(${currentSlide*(sliderWidth + cardGap)}px)`
        }, timeAnimationDelay);
        // }, 800);

    }

    // sliderFilm.style.transform = `translateX(${currentSlide*(sliderWidth + cardGap)}px)`

    // setTimeout(function() {
    //     isSliderMoving = false;
    // }, 800);

    setTimeout(function() {
        isSliderMoving = false;
        sliderBtnLeft.disabled = false; // Активируем кнопку
        sliderBtnRight.disabled = false; // Активируем кнопку
    }, timeAnimationDelay); 
    // }, 800); 
}

/************************************************ */

// JavaScript Анимация: Иногда может потребоваться более сложная анимация, которую лучше обрабатывать с помощью JavaScript. Вы можете использовать requestAnimationFrame или библиотеки анимации, такие как GSAP, для управления анимацией перемещения слайдера.
// let start = performance.now();
// let current = parseFloat(sliderFilm.style.transform.replace('translateX(', '').replace('px)', ''));


// function animateSlider(targetPosition) {
//     let start = performance.now();
//     let current = parseFloat(sliderFilm.style.transform.replace('translateX(', '').replace('px)', ''));
    
//     function step(timestamp) {
//         const progress = Math.min((timestamp - start) / 500, 1); // Продолжительность анимации 500 мс
//         sliderFilm.style.transform = `translateX(${current + (targetPosition - current) * progress}px`;

//         if (progress < 1) {
//             requestAnimationFrame(step);
//         }
//     }

//     requestAnimationFrame(step);
// }

// // Использование функции animateSlider для плавного перемещения слайдера
// animateSlider(-currentSlide * sliderWidth); // Где currentSlide - текущий слайд, sliderWidth - ширина слайдера




/**************************************************************************** */

// Генерация карточек

//  <div class="card card--001">
//      <div class="photo photo--card-01"></div>
//     <h4 class="title-card">Katrine</h4>
//      <button class="button button--card">Learn more</button>
//  </div> 

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
   cardTitle.textContent = `${petsNameArr[uniqueIndex]}-${counter()}`

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

// Функция добавления новых элементов в начало слайдера
function prependNewCard(uniqueIndex) {
    const newCard = cardCreation(uniqueIndex); // Создание нового элемента (карточки)
    sliderFilm.prepend(newCard); // Добавление созданной карточки в начало слайдера
}

// Функция добавления новых элементов в конец слайдера
function appendNewCard(uniqueIndex) {
    const newCard = cardCreation(uniqueIndex); // Создание нового элемента (карточки)
    sliderFilm.append(newCard); // Добавление созданной карточки в конец слайдера
}


// Функция удаления элемента из начала слайдера

function removeFirstCard(sliderFilm) {
    const firstCard = sliderFilm.firstElementChild;
    if (firstCard) {
        sliderFilm.removeChild(firstCard)
    }
}

// function removeFirstCard() {
//     const firstCard = sliderFilm.firstElementChild;
//     sliderFilm.removeChild(firstCard)
// }


// Функция удаления элемента из конца слайдера

function removeLastCard(sliderFilm) {
    const lastCard = sliderFilm.lastElementChild;
    if (lastCard) {
        sliderFilm.removeChild(lastCard)
    }
}

// function removeLastCard() {
//     const lastCard = sliderFilm.lastElementChild;
//     sliderFilm.removeChild(lastCard)
// }


// Функция удаления всех дочерних элементов

function removeAllCard(sliderFilm) {
    while (sliderFilm.firstElementChild) {
        sliderFilm.removeChild(sliderFilm.firstElementChild)
    }
}

console.log(`cardNumber = ${cardNumber}`)

// const tempHelp = document.querySelector('.help-list')
// removeAllCard(tempHelp)

// console.log(`sliderFilm.firstChild = ${sliderFilm.firstElementChild}`)

// function removeFirstCard(sliderFilm) {
//     const firstCard = sliderFilm.firstElementChild;
//     if (firstCard) {
//         sliderFilm.removeChild(firstCard);
//     }
// }

// function removeLastCard(sliderFilm) {
//     const lastCard = sliderFilm.lastElementChild;
//     if (lastCard) {
//         sliderFilm.removeChild(lastCard);
//     }
// }

// function removeCard(sliderFilm, isFirstCard) {
//     if (isFirstCard) {
//         const firstCard = sliderFilm.firstElementChild;
//         if (firstCard) {
//             sliderFilm.removeChild(firstCard);
//         }
//     } else {
//         const lastCard = sliderFilm.lastElementChild;
//         if (lastCard) {
//             sliderFilm.removeChild(lastCard);
//         }
//     }
// }


// чтобы удалить карту в зависимости 
// от переданного параметра isFirstCard. 
// Например, вызов removeCard(sliderFilm, true) удалит первую карту, 
// а вызов removeCard(sliderFilm, false) удалит последнюю карту.


/****************************************************** */
// Счетчик

function counterCreate() {
    let count = 0;
  
    return function() {
      count += 1
      return count
    };
}

// const counter = counterCreate()
/****************************************************** */




// const cardElement = document.createElement("div");
// cardElement.classList.add("card");
// // sliderFilm.append(cardElement);
// const cardFoto = document.createElement('div')
// cardFoto.classList.add('photo')
// cardFoto.classList.add('photo--card-06')
// cardElement.appendChild(cardFoto)

// const cardTitle = document.createElement('h4')
// cardTitle.classList.add('title-card')
// cardTitle.textContent = 'AAAnimal'
// cardElement.appendChild(cardTitle)

// const cardButton = document.createElement('button')
// cardButton.classList.add('button')
// cardButton.classList.add('button--card')
// cardElement.appendChild(cardButton)
// cardButton.textContent = 'Learn more'

// sliderFilm.append(cardElement);




// // Функция добавления новых элементов в начало слайдера
// function prependNewCard() {
//     const newCard = createNewCard(); // Создание нового элемента (карточки)
//     sliderFilm.prepend(newCard); // Добавление созданной карточки в начало слайдера
// }

// // Функция перемещения слайдера
// function moveSlider(direction) {
//     const sliderWidth = sliderScreen.offsetWidth; // Получаем ширину области слайдера
//     const cardWidth = cardItem.offsetWidth; // Получаем ширину одной карточки

//     let cardGapTotal = sliderWidth % cardWidth;
//     let cardGap = 40; // Значение расстояния между карточками

//     const cardNumber = Math.floor(sliderWidth / cardWidth); // Вычисление количества карточек в области слайдера

//     if (cardGapTotal) {
//         cardGap = cardGapTotal / (cardNumber - 1); // Вычисление расстояния между карточками
//     }

//     // Производим перемещение слайдера в зависимости от направления (вправо или влево)
//     if (direction === 'left') {
//         // При перемещении влево, добавляем новые элементы в начало слайдера
//         prependNewCard();
//     } else if (direction === 'right') {
//         // При перемещении вправо, добавляем новые элементы в конец слайдера
//         appendNewCard();
//     }

//     // Осуществляем смещение слайдера в соответствии с текущим положением слайдов
//     sliderFilm.style.transform = `translateX(${currentSlide * (sliderWidth + cardGap)}px)`;
// }

// // Функция создания нового элемента (карточки)
// function createNewCard() {
//     const newCardElement = document.createElement("div");
//     // Дополнительная логика: добавление необходимых классов, изображения, текста, кнопок и т.д.
//     return newCardElement;
// }


/***************************************** */

// Для удаления старого кадра из слайдера в чистом JavaScript, вы можете использовать метод remove() или parentNode.removeChild(). 
// Вот обновленный JavaScript-код без использования jQuery для добавления функциональности удаления старого кадра:

// Нажатие кнопки "Add Frame"
// document.getElementById('addFrameBtn').addEventListener('click', function() {
//     var newFrameSrc = 'newFrame.jpg';
//     var slider = document.querySelector('.slider');
//     var newFrame = document.createElement('img');
//     newFrame.src = newFrameSrc;
//     newFrame.alt = 'New Frame';
//     slider.insertBefore(newFrame, slider.firstElementChild);
//     slideToNewFrame();
//   });
  
//   // Плавный переход к новому кадру
//   function slideToNewFrame() {
//     var slider = document.querySelector('.slider');
//     slider.style.marginLeft = '-100%';
//     setTimeout(function() {
//       slider.style.marginLeft = '0';
//       removeOldFrame();
//     }, 400);
//   }
  
//   // Удаление старого кадра
//   function removeOldFrame() {
//     var slider = document.querySelector('.slider');
//     var oldFrame = slider.lastElementChild;
//     slider.removeChild(oldFrame);
//   }

// В этом обновленном коде, после завершения анимации перехода к новому кадру, 
// мы вызываем функцию removeOldFrame(), которая удаляет последний (старый) кадр из слайдера, 
// используя slider.removeChild(oldFrame).


/*************************************************** */
/*************************************************** */
/*************************************************** */
/*************************************************** */


let menu = document.querySelector(".menu__list")
let body = document.querySelector('body')
const burgerButton = document.getElementById('burger-button')
let fon = document.querySelector('.fon')


/************************************ */



/************************************ */


// document.addEventListener("DOMContentLoaded", function() {
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
// })

// закрываю после ссылки

const menuLink = document.querySelectorAll('.menu__list-item');
function closeMenu() {
    menu.classList.remove('open');
    burgerButton.classList.remove('rotade');
    body.classList.remove('lock');
    fon.classList.remove('work');
    if (modalPopup) {
        modalPopup.classList.remove('modal--active')
        setTimeout(function() { // проявляю модалку
            modalPopup.remove()
            // modalPopup = modal
        }, 400);
        // modalPopup.remove()
    }
    
    //modal.classList.remove(classModalCard);
    // modal.classList.remove(modal.classList.item(1));
    // modal.classList.remove(modal.classList.item(1));
    /* прописано два раз так как надо удалять два класса*/
    /* второй класс view понадобился чтобы было удобнее делать медиазапросы */


//     modal.classList.remove(modal.addEventListener('click', function(event) {
//     let clickedClass = event.target.className.slice(-4);
//     console.log(clickedClass);
//   }));
    
    
    //modal.addEventListener('click', el => modal.classList.remove(el.target.className.slice(-4)))

}

menuLink.forEach(link => link.addEventListener('click', closeMenu));

// закрываю при клике мимо меню

fon.addEventListener('click', closeMenu);
// })

/*************************************************** */
/*************************************************** */
/*************************************************** */
/*************************************************** */

// Модальное окно

function modalCreation (dataUniqueIndex) {
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
    }, 0);

 }

//  modalCreation(0)

// btnCloseModalPopup.addEventListener('click', closeMenu)
