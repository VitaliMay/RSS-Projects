
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
    //modal.classList.remove(classModalCard);
    modal.classList.remove(modal.classList.item(1));
    modal.classList.remove(modal.classList.item(1));
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






