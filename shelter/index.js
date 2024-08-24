const score = `
Привет. Сделал сабмит части своей работы сделаной в 2023.
Сорри за небрежность. До ума буду доводить когда дойдёт до JS
    `;
console.log(score);


import { dataPets } from './js/products.js';
import { checkBurger } from './js/burger.js'

// console.log(dataPets)
// console.log(dataPets[0].name)
console.log(checkBurger)

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
/************************************************* */

// window.addEventListener('resize', function() {
//     console.log('Screen width changed to:', window.innerWidth);
//   });

window.addEventListener('resize', function() {
    // const resizeCardNumber = resizeCardNumber ()
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

    isSliderMoving = true;
    sliderBtnLeft.disabled = true;
    sliderBtnRight.disabled = true;

    const sliderBtn = event.target.closest('.slider__btn')

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

        console.log(`new left currentFrameArr = ${currentFrameArr}`)
        console.log(`new left previousFrameArr = ${previousFrameArr}`)

        let currentFrameArrPretend = [...currentFrameArr] // чтобы сохранить порядок вывода карточек
        // let currentFrameArrPretend = [...currentFrameArr].reverse() // чтобы сохранить порядок вывода карточек
        // let currentFrameArrPretend = [...currentFrameArr].slice(0, cardNumber).reverse() // чтобы сохранить порядок вывода карточек
        console.log(`currentFrameArrPretend = ${currentFrameArrPretend}`)

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

        console.log(`new right currentFrameArr = ${currentFrameArr}`)
        console.log(`new right previousFrameArr = ${previousFrameArr}`)

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


