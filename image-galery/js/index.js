import { arrInfo } from "./respInfo.js"
import { signatureScore } from "./score.js";

const main = document.querySelector('.main')
const form = document.querySelector('.header-form')
const select = document.querySelector('.header-select');
const input = document.querySelector('.header-input')
const inputText = document.querySelector('.header-input__text');
const clearButton = document.querySelector('.header-input__clear');

// let startFoto = false;
let numPage = 1
let perPage = 24

let searchDefolt = null

// Для рандома первой страницы
const searchDefoltArr = ['random', 'roman', 'carrier', 'submit', 'no', 'repo', 'yes', 'some', 'may', 'strange', 'gorgeous', 'fool', 'stupid']
const randomIndexDefoltArr = Math.floor(Math.random() * (searchDefoltArr.length - 1 - 0 + 1)) + 0;
searchDefolt = searchDefoltArr[randomIndexDefoltArr]

let startUrl = `https://api.unsplash.com/search/photos?query=${searchDefolt}&per_page=${perPage}&page=${numPage}&orientation=landscape&client_id=${arrInfo[0]}`

// let startUrl = `https://api.unsplash.com/search/photos?query=${searchDefolt}&per_page=${perPage}&page=${numPage}&orientation=landscape&client_id=${accessKey}`

// для проверки наличия фото
// let flag = true


// if (!startFoto) {  // первый раз)
//   startFoto = true;

//   start();
//   // getFoto(startUrl)

// }
// else {
//   console.log(`startFoto = ${startFoto}`)

// }

getFoto(startUrl)

/*********************************************************************************************** */

form.addEventListener('submit', (event) => {
  event.preventDefault(); // чтобы не перегружало страницу
  let search = input.value
  let lang = select.value

  let searchRequest = `https://api.unsplash.com/search/photos?query=${search}&per_page=${perPage}&page=${numPage}&lang=${lang}&client_id=${arrInfo[0]}`
  // let searchRequest = `https://api.unsplash.com/search/photos?query=${search}&per_page=${perPage}&page=${numPage}&lang=${lang}&client_id=${accessKey}`
  // let searchRequest = `https://api.unsplash.com/search/photos?query=${search}&per_page=${perPage}&page=${numPage}&lang=${lang}&orientation=landscape&client_id=${accessKey}`
  // let searchRequest = `https://api.unsplash.com/search/photos?query=${search}&per_page=${perPage}&page=${numPage}&orientation=landscape&client_id=${accessKey}`
  getFoto(searchRequest)
  // input.value = ''  // не по ТЗ
  inputText.focus();
})


/*********************************************************************************************** */

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



/********************************************************* */
// удаление всех карточек со страницы (удаления у элемента всех дочерних)

function removeAllCard(element) {
  while (element.firstElementChild) {
      element.removeChild(element.firstElementChild)
  }
}

/*********************************************************************************************** */

function creatLinkEl (urlSmall, urlFull) {
  const linkEl = document.createElement('a');
  linkEl.classList.add('cover')
  linkEl.setAttribute('taget', '_blank')
  linkEl.setAttribute('href', urlFull)

  const coverInnerRatio = document.createElement('div')
  coverInnerRatio.classList.add('cover-inner')
  coverInnerRatio.classList.add('cover-inner--ratio')

  const coverContent = document.createElement('div')
  coverContent.classList.add('cover-content')
  coverContent.style.backgroundImage = `url(${urlSmall})`

  linkEl.append(coverInnerRatio)
  coverInnerRatio.append(coverContent)

  return linkEl
}

/*********************************************************************************************** */

// function start(size = 0) {
// function start(size=perPage) {
//   main.innerHTML = '';
//   for (let index = 0; index < size; index += 1) {
//     main.innerHTML +=
//   `
// <a class="cover" target="_blank" href="#">
//   <div class="cover-inner cover-inner--ratio">
//     <div class="cover-content">

//     </div>
//   </div>
// </a>
// `
//   }
// }




// async function getFoto(url, arrCoverContent) {
async function getFoto(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'Accept-Version': 'v1'
      }
    });
    const data = await response.json();
    console.log(data)

    removeAllCard(main)
    if (data.results.length) {
      for (let i = 0; i < data.results.length; i += 1) {
        const fotoUrlSmall = data.results[i].urls.small;
        const fotoUrlFull = data.results[i].urls.full;
        main.append(creatLinkEl(fotoUrlSmall, fotoUrlFull))
      }
    }


    // if (data.results.length < perPage) {
    //   start(data.results.length)

    //   flag = false
    // }
    // else if (!flag) {
    //   flag = true
    //   start()
    //   // start(data.results.length)
    // }


    // let arrCoverContent = Array.from(document.querySelectorAll('.cover-content'))
    // let arrCover = Array.from(document.querySelectorAll('.cover'))

    // for (let i = 0; i < arrCoverContent.length; i += 1) {

    //   let fotoUrl = data.results[i].urls.small;   // нет смысла загружать фоновые картинки большого объема
    //   arrCoverContent[i].style.backgroundImage = `url(${fotoUrl})`

    //   let fotoUrlFull = data.results[i].urls.full;   // а вот для загрузки картинки по ссылке надо полный размер
    //   arrCover[i].href = `${fotoUrlFull}`
    // }

  }
  catch (error) {
    console.log(error);
  }

}

/*************************************************************************************************************** */
/*************************************************************************************************************** */

signatureScore()

