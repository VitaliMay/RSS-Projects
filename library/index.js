
const score = `
    1. Вёрстка соответствует макету. Ширина экрана 768px +24
    2. Вёрстка соответствует макету. Ширина экрана 380px +24
    3. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки.
Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15
    4. На ширине экрана 380рх и меньше реализовано адаптивное меню +22\n
    Все пункты требований задания выполнены => 85 баллов из 75 возможных :)) 
    `;
console.log(score);


document.addEventListener("DOMContentLoaded", function() {
    // document.getElementsByClassName("menu_burger").addEventListener("click", function() {
        // console.log('ssdfdff')
        // alert('assdfdfgghhjhjhj')


    document.getElementById("burger-button").addEventListener("click", function() {
        document.querySelector(".header_conteiner").classList.toggle("open")

    })

    // незакрытое меню как-то лучше выглядит )), но надо сделать так(

    const menuLink = document.querySelectorAll('.menu-link');
    function closeMenu() {
        document.querySelector(".header_conteiner").classList.remove('open');
    }

    menuLink.forEach(link => link.addEventListener('click', closeMenu));

})

