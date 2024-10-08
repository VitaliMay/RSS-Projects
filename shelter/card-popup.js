
let card = document.querySelectorAll(".card")
let slider = document.querySelector(".slider__inner")
let modal = document.querySelector('.modal-wrapper')
let modalButton = document.querySelector('.modal-wrapper .button--arrow')

//slider.addEventListener('click', el => console.log(el.target.closest('.card').className.slice(-3)))
slider.addEventListener('click', el => console.log(el.target.closest('.card').classList.item(1)))


let classModalCard = 'view--'




//slider.addEventListener('click', el => console.log('qwer' + el.target.closest('.card').className.slice(-5)))


/************************************************************************* */

// document.addEventListener('click', function(event) {
//     // Check if the clicked element is a card
//     if (event.target.classList.contains('card')) {
//       // Store the clicked class in a variable
//       const clickedClass = event.target.classList[0];
//       console.log(clickedClass);
//     }
//   });
  

/************************************************************************* */



// function XXXX (item) {
//     'ssss' + item.target.closest('.card').className.slice(-5)
// }

// let text = [
//     'Привет Карточка 01',
//     'Привет Карточка 02',
//     'Привет Карточка 03',
// ]

// console.log(text)

// let fon = document.querySelector('.fon') уже объявлены в бургер
// let body = document.querySelector('body') Уже объявлены в бургер

// const burgerButton = document.getElementById('burger-button')
// let fon = document.querySelector('.fon')


/********************************************** */
/**проверка подключения */
/*
function checkService() {
    alert('Ещё одна проверка')
}
card.forEach(item => item.addEventListener('click', checkService));
*/
/*********************************************** */

//card.forEach(item => item.addEventListener('click', el => console.log(el.target)));

// slider.addEventListener('click', el => console.log(el.target))

/* Вытягиваю нужный класс у карточки */
// slider.addEventListener('click', el => console.log(el.target.closest('.card').className.slice(-9)))

// function XXX (data){
//     return data;
// }

// function fonCard() {
function openCard() {
    fon.classList.toggle('work')
    body.classList.toggle('lock')
    // modal.classList.toggle('view')
    //modal.classList.toggle(classModalCard)
    slider.addEventListener('click', el => modal.classList.add('view', classModalCard + el.target.closest('.card').className.slice(-3)))
    /* второй класс view понадобился, чтобы удобнее было делать медиазапросы */
}
card.forEach(item => item.addEventListener('click', openCard));
// сard.forEach(item => item.addEventListener('click', fonCard));

// document.addEventListener('click', function(event) {
//     var clickedClass = event.target.className;
//     console.log(clickedClass);
//   });

//console.log(modal.classList)


/* Вытягиваю нужный класс у карточки */
// slider.addEventListener('click', el => console.log(el.target.closest('.card').className.slice(-5)))

// card.addEventListener('click', fonCard()) не функция, т.к. по массиву кликнуть нельзя

modalButton.addEventListener('click', closeMenu);


// burgerButton.addEventListener("click", function(event) {
    // console.log('Проверка')
    // alert('Ещё одна проверка')

    // if(!menu.contains(event.target)) {
    //     menu.classList.remove('open');
    //   }

//     menu.classList.toggle("open")
//     burgerButton.classList.toggle("rotade")
//     body.classList.toggle('lock')
//     fon.classList.toggle('work')


// })





// slider.onclick = function(event) {
//     if (event.target.className != 'photo') return;

//     let numberCard = event.target.closest('.slider__inner');
//     console.log(numberCard)
//   };

/************************************ */


// document.addEventListener("DOMContentLoaded", function() {
    //card.addEventListener("click", function(event) {
        // console.log('Проверка')
        //alert('Ещё одна проверка')

        // if(!menu.contains(event.target)) {
        //     menu.classList.remove('open');
        //   }

        // menu.classList.toggle("open")
        // burgerButton.classList.toggle("rotade")
        // body.classList.toggle('lock')
        // fon.classList.toggle('work')


   // })
// })

// закрываю после ссылки

/* const menuLink = document.querySelectorAll('.menu__list-item');
function closeMenu() {
    menu.classList.remove('open');
    burgerButton.classList.remove('rotade');
    body.classList.remove('lock');
    fon.classList.remove('work');
}

menuLink.forEach(link => link.addEventListener('click', closeMenu));

// закрываю при клике мимо меню

fon.addEventListener('click', closeMenu);
// })
*/





