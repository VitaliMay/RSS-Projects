import { arrInfo } from "./respInfo.js"
import { signatureScore } from "./score.js";
import { createEl, optionsLink, optionsLinkInnerRatio, optionsLinkContent, removeAllCard } from "./elementUtils.js";

const main = document.querySelector('.main')
const form = document.querySelector('.header-form')
const select = document.querySelector('.header-select');
const input = document.querySelector('.header-input')
const inputText = document.querySelector('.header-input__text');
const clearButton = document.querySelector('.header-input__clear');

const infoBlock = document.querySelector('.info')
const openPages = document.querySelector('.info-page--current')
const totalPages = document.querySelector('.info-page--total')
const btnShowMore = document.querySelector('.info-page--btn-showMore')

// let startFoto = false;
let numPage = 1
let perPage = 24

let searchDefolt = null


// Для рандома первой страницы
const searchDefoltArr = ['random', 'roman', 'no', 'repo', 'sea', 'cloud', 'may', 'ocean', 'strange', 'abstract', 'mountain', 'sky', 'ground', 'fire', 'water', 'sand', 'air', 'art']
// const searchDefoltArr = ['random', 'roman', 'carrier', 'submit', 'no', 'repo', 'yes', 'sea', 'some', 'may', 'ocean', 'strange', 'gorgeous', 'fool', 'stupid', 'search', 'abstract']
const randomIndexDefoltArr = Math.floor(Math.random() * (searchDefoltArr.length - 1 - 0 + 1)) + 0;
searchDefolt = searchDefoltArr[randomIndexDefoltArr]

let startUrl = `https://api.unsplash.com/search/photos?query=${searchDefolt}&per_page=${perPage}&page=${numPage}&orientation=landscape&client_id=${arrInfo[0]}`

const textMessageArr = {
  en: 'No photos were found matching your search criteria',
  ru: 'Не найдено ни одной фотографии, соответствующей вашим критериям поиска'
}

const errorMessageArr = {
  en: 'Something went wrong. Try again later',
  ru: 'Что-то пошло не так. Попробуй позже'
}

/*********************************************************************************************** */

getFoto(startUrl)

/*********************************************************************************************** */

function searchRequestFn (numPage) {
  const search = input.value
  const lang = select.value
  const searchRequest =  `https://api.unsplash.com/search/photos?query=${search}&per_page=${perPage}&page=${numPage}&lang=${lang}&client_id=${arrInfo[0]}`
  return searchRequest
}

/*********************************************************************************************** */

form.addEventListener('submit', (event) => {
  event.preventDefault(); // чтобы не перегружало страницу
  // let search = input.value
  // let lang = select.value
  numPage = 1

  // let searchRequest = `https://api.unsplash.com/search/photos?query=${search}&per_page=${perPage}&page=${numPage}&lang=${lang}&client_id=${arrInfo[0]}`
  const searchRequest = searchRequestFn (numPage)

  removeAllCard(main)
  getFoto(searchRequest)

  openPages.textContent = numPage
  // input.value = ''  // не по ТЗ
  inputText.focus();


})

/*********************************************************************************************** */

btnShowMore.addEventListener('click', showMoreFn)

function showMoreFn () {
 numPage += 1
 const searchRequest = searchRequestFn (numPage)
 getFoto(searchRequest)
 openPages.textContent = numPage
}

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

/*********************************************************************************************** */

async function getFoto(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'Accept-Version': 'v1'
      }
    });

    // if (response.status !== 200) {
    if (response.status >= 400) {
      throw new Error(response.status);
    }

    const data = await response.json();
    // console.log('data', data)

    // removeAllCard(main)

    if ('errors' in data) {
      main.append(createEl({classes: ['error-div'], text: data.errors[0]}));
    } else {
      if (data.results.length) {
        for (let i = 0; i < data.results.length; i += 1) {
          const fotoUrlSmall = data.results[i].urls.small;
          const fotoUrlFull = data.results[i].urls.full;

          const elemLink = createEl ({ ...optionsLink, parent: main })
          elemLink.href = `${fotoUrlFull}`

          const elemLinkInnerRatio = createEl ({ ...optionsLinkInnerRatio, parent: elemLink })

          const elemLinkContent = createEl ({ ...optionsLinkContent, parent: elemLinkInnerRatio })
          elemLinkContent.style.backgroundImage = `url(${fotoUrlSmall})`

        }

        if (input.value) { // определяю что это не первоначальная загрузка
          infoBlock.classList.add('info--active')
          totalPages.textContent = data.total_pages
        }


      } else {
        main.append(createEl({classes: ['error-div'], text: textMessageArr[select.value]}))
        infoBlock.classList.remove('info--active')
      }
    }
  }
  catch (error) {
    removeAllCard(main)
    const errorMessage = `${error}\n${errorMessageArr[select.value]}`
    // поправить чтобы при исчерпании лимита не стирались открытые фото
    // main.prepend(createEl({classes: ['error-div'], text: errorMessage}))
    main.append(createEl({classes: ['error-div'], text: errorMessage}))
    infoBlock.classList.remove('info--active')
  }
}

/*************************************************************************************************************** */
/*************************************************************************************************************** */

signatureScore()

