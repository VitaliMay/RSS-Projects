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

const expKey = '12345678'

// Для рандома первой страницы
const searchDefoltArr = ['random', 'roman', 'carrier', 'submit', 'no', 'repo', 'yes', 'some', 'may', 'strange', 'gorgeous', 'fool', 'stupid']
const randomIndexDefoltArr = Math.floor(Math.random() * (searchDefoltArr.length - 1 - 0 + 1)) + 0;
searchDefolt = searchDefoltArr[randomIndexDefoltArr]

// let startUrl = `https://api.unsplash.com/search/photos?query=${searchDefolt}&per_page=${perPage}&page=${numPage}&orientation=landscape&client_id=${expKey}`
let startUrl = `https://api.unsplash.com/search/photos?query=${searchDefolt}&per_page=${perPage}&page=${numPage}&orientation=landscape&client_id=${arrInfo[0]}`

const textMessageArr = {
  en: 'No photos were found matching your search criteria',
  ru: 'Не найдено ни одной фотографии, соответствующей вашим критериям поиска'
}

/*********************************************************************************************** */

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

function createLinkEl (urlSmall, urlFull) {
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

function createErrorEl (textMessage) {
  const errorEl = document.createElement('div')
  errorEl.classList.add('error-div')
  errorEl.textContent = textMessage
  // errorEl.textContent = 'По вашему запросу ничего не найдено'

  return errorEl
}

/*********************************************************************************************** */

async function getFoto(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'Accept-Version': 'v1'
      }
    });
    const data = await response.json();
    console.log('data', data)

    removeAllCard(main)

    if ('errors' in data) {
      main.append(createErrorEl(data.errors[0]));
    } else {
      if (data.results.length) {
        for (let i = 0; i < data.results.length; i += 1) {
          const fotoUrlSmall = data.results[i].urls.small;
          const fotoUrlFull = data.results[i].urls.full;
          main.append(createLinkEl(fotoUrlSmall, fotoUrlFull))
        }
      } else {
        main.append(createErrorEl(textMessageArr[select.value]))
      }
    }
  }
  catch (error) {
    removeAllCard(main)
    // main.append(createErrorEl(error))
    main.append(createErrorEl(error.status))
    // main.append(createErrorEl(error.message))
    console.log(error);
  }

}

/*************************************************************************************************************** */
/*************************************************************************************************************** */

signatureScore()

