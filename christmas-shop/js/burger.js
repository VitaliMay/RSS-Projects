
const burgerButton = document.querySelector('.burger-button')
const body = document.querySelector('body')
const menu = document.querySelector('.menu')


burgerButton.addEventListener("click", function(event) {
  menu.classList.toggle("open")
  burgerButton.classList.toggle("rotade")
  body.classList.toggle('lock')
  // fon.classList.toggle('work')
  window.scrollTo({ top: 0, behavior: 'smooth' }) // чтобы крестик не был частично скрыт

})

menu.addEventListener('click', burgerMenuLinkClose)

function burgerMenuLinkClose (event) {
  if (event.target.classList.contains('menu__list-link')){
     closeMenu()
  }
}


function closeMenu() {

    menu.classList.remove('open');
    burgerButton.classList.remove('rotade');
    body.classList.remove('lock');
    // fon.classList.remove('work');

  // if (modalPopup) {
  //     modalPopup.classList.remove('modal--active')
  //     setTimeout(function() {
  //         modalPopup.remove()
  //     }, 400);
  // }
}


window.addEventListener('resize', function() {
   if (window.innerWidth >= 768.9 && menu.classList.contains("open")) {
      closeMenu()
   }
})


export { burgerButton }