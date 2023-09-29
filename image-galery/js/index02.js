
const accessKey = 'AgIOi8YzpBhcLPxcfuRxOgz8rB0kBz01guzjO1JH2Kk'
const Authentication = `https://api.unsplash.com/photos/?client_id=${accessKey}`

let startFoto = false;
let numPage = 1
let perPage = 24
// let searchDefolt = 'image'
let searchDefolt = 'strange'
let startUrl = `https://api.unsplash.com/search/photos?query=${searchDefolt}&per_page=${perPage}&page=${numPage}&orientation=landscape&client_id=${accessKey}`


const input = document.querySelector('.header-input')
const form = document.querySelector('.header-form')
const main = document.querySelector('.main')


if (!startFoto) {
  startFoto = true;

  start();

  // let arrCoverContent = Array.from(document.querySelectorAll('.cover-content'))

  getFoto(startUrl)
  // getFoto(startUrl, arrCoverContent)
}
else {
  console.log(`startFoto = ${startFoto}`)






}

/*********************************************** */
/*********************************************** */

/********************************************** */

form.addEventListener('submit', (event) => {
  event.preventDefault(); // чтобы не перегружало страницу
  let search = input.value
  console.log(`Поиск = ${search}`)
  let searchRequest = `https://api.unsplash.com/search/photos?query=${search}&per_page=${perPage}&page=${numPage}&orientation=landscape&client_id=${accessKey}`
  getFoto(searchRequest)
  // input.value = ''
  inputText.focus();
})


/********************************************* */

const inputText = document.querySelector('.header-input__text');
const clearButton = document.querySelector('.header-input__clear');

// Отображение крестика, когда в поле ввода есть текст
inputText.addEventListener('input', () => {
  clearButton.style.visibility = inputText.value ? 'visible' : 'hidden';
  clearButton.style.opacity = inputText.value ? '1' : '0';
  inputText.focus();
});

// Очистка поля ввода при нажатии на крестик
clearButton.addEventListener('click', () => {
  inputText.value = '';
  clearButton.style.visibility = 'hidden';
  clearButton.style.opacity = '0'
  inputText.focus();
});

// При вводе текста в поле header-input__text, появится крестик справа от него. 
// Если в поле есть текст, крестик будет отображаться. При клике на крестик текст будет удален.

/*********************************************** */
/*********************************************** */

function start() {

  for (let index = 0; index < perPage; index++) {
    main.innerHTML +=
  `
<div class="cover">
  <div class="cover-inner cover-inner--ratio">
    <div class="cover-content">

    </div>
  </div>
</div>
`
  }
}


async function getFoto(url, arrCoverContent) {
  try {
    const response = await fetch(url, {
      headers: {
        'Accept-Version': 'v1'
      }
    });
    const data = await response.json();
    console.log(data)

    // if (!data.total) alert('Поиск неадекватен')
    if (data.results.length < perPage) {
      alert('Поиск results неадекватен')
      inputText.focus();
    }

    let arrCoverContent = Array.from(document.querySelectorAll('.cover-content'))

    for (let i = 0; i < arrCoverContent.length; i++) {
      let fotoUrl = data.results[i].urls.full;
      arrCoverContent[i].style.backgroundImage =`url(${fotoUrl})`
    }


  }
  catch (error) {
    console.log(error);
  }

}

