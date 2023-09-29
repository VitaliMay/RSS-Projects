
const inputText = document.querySelector('.header-input__text');
const clearButton = document.querySelector('.header-input__clear');

// Отображение крестика, когда в поле ввода есть текст
inputText.addEventListener('input', () => {
  clearButton.style.visibility = inputText.value ? 'visible' : 'hidden';
  clearButton.style.opacity = inputText.value ? '1' : '0';
});

// Очистка поля ввода при нажатии на крестик
clearButton.addEventListener('click', () => {
  inputText.value = '';
  clearButton.style.visibility = 'hidden';
  clearButton.style.opacity = '0'
});

// При вводе текста в поле header-input__text, появится крестик справа от него. 
// Если в поле есть текст, крестик будет отображаться. При клике на крестик текст будет удален.


/************************************************* */

// window.onload = function() {

//   здесь помещаем все, что угодно...
  
//   };

/**************************************************** */

const main = document.querySelector('.main')

start()

function start() {

  for (let index = 0; index < 8; index++) {

    main.innerHTML +=
  `
<div class="cover">
  <div class="cover-inner cover-inner--ratio">
    <div class="cover-content cover-content--${index}">

    </div>
  </div>
</div>
`

  }

}