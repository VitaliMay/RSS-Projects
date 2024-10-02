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
const searchDefoltArr = ['random', 'roman', 'carrier', 'submit', 'no', 'repo', 'yes', 'sea', 'some', 'may', 'ocean', 'strange', 'gorgeous', 'fool', 'stupid', 'search']
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
// const errorMessageArr = {
//   en: 'Something went wrong. Maybe the request limit has been exceeded? Try again later',
//   ru: 'Что-то пошло не так. Может превышен лимит запросов? Попробуй позже'
// }

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
/*********************************************************************************************** */

function createEl (options) {
  const { tag = 'div', text = '', classes = [], attributes = {}, styles = {}} = options;

  const element = document.createElement(tag);
  element.textContent = text;
  element.classList.add(...classes);

  if (attributes) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }

  if (styles) {
    Object.keys(styles).forEach(key => {
      element.style[key] = styles[key];
    });
  }

  return element
}


function createLinkEl (options) {
  const { classes, classOne, attributes, styles } = options;

  // 1 ****
  const linkEl = document.createElement('a');
  linkEl.classList.add('cover')
  // linkEl.setAttribute('target', '_blank')
  // linkEl.setAttribute('href', urlFull)
  if (attributes) {
    for (const key in attributes) {
      linkEl.setAttribute(key, attributes[key]);
    }
  }

  // 2 ****
  const coverInnerRatio = document.createElement('div')
  coverInnerRatio.classList.add(...classes)
  // coverInnerRatio.classList.add('cover-inner', 'cover-inner--ratio')

  // 3 ****
  const coverContent = document.createElement('div')
  coverContent.classList.add(...classOne)
  // coverContent.classList.add('cover-content')

  // coverContent.style.backgroundImage = `url(${urlSmall})`

  // if (styles) {
  //   Object.keys(styles).forEach(key => {
  //     coverContent.style[key] = styles[key];
  //   });
  // }

  if (styles) {
    for (const key in styles) {
      coverContent.style[key] = styles[key];
    }
  }


  linkEl.append(coverInnerRatio)
  coverInnerRatio.append(coverContent)

  return linkEl
}

/*********************************************************************************************** */
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

    // if (response.status !== 200) {
    if (response.status >= 400) {
      throw new Error(response.status);
    }

    const data = await response.json();
    // console.log('data', data)

    removeAllCard(main)

    if ('errors' in data) {
      main.append(createErrorEl(data.errors[0]));
    } else {
      if (data.results.length) {
        for (let i = 0; i < data.results.length; i += 1) {
          const fotoUrlSmall = data.results[i].urls.small;
          const fotoUrlFull = data.results[i].urls.full;

          // const linkOptions = {
          //   // urlSmall: fotoUrlSmall,
          //   classes: ['cover-inner', 'cover-inner--ratio'],
          //   classOne: ['cover-content'],
          //   attributes: {
          //     'target': '_blank',
          //     'href': fotoUrlFull,
          //   },
          //   styles: {
          //     'backgroundImage': `url(${fotoUrlSmall})`,
          //   }
          // };

          // // main.append(createLinkEl(fotoUrlSmall, fotoUrlFull))
          // main.append(createLinkEl(linkOptions))

          const optionsLink = {
            tag: 'a',
            classes: ['cover'],
            attributes: {
              'target': '_blank',
              'href': fotoUrlFull,
            }
          };

          const elemLink = createEl (optionsLink)

          const optionsLinkInnerRatio = {
            classes: ['cover-inner', 'cover-inner--ratio'],
          }

          const elemLinkInnerRatio = createEl (optionsLinkInnerRatio)

          const optionsLinkContent = {
            classes: ['cover-content'],
            styles: {
              'backgroundImage': `url(${fotoUrlSmall})`,
            },
          }

          const elemLinkContent = createEl (optionsLinkContent)

          elemLink.append(elemLinkInnerRatio)
          elemLinkInnerRatio.append(elemLinkContent)
          main.append(elemLink)

        }
      } else {
        main.append(createErrorEl(textMessageArr[select.value]))
      }
    }
  }
  catch (error) {
    removeAllCard(main)
    const errorMessage = `${error}\n${errorMessageArr[select.value]}`
    main.append(createErrorEl(errorMessage))
    // main.append(createErrorEl(error))
    // main.append(createErrorEl(error.message))
    // console.log(error);
    // console.log(errorMessage);
  }

}

/*************************************************************************************************************** */
/*************************************************************************************************************** */

signatureScore()

