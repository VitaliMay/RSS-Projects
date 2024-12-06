
import { createEl, createSvgEl, removeAllChild, toUpperFirstLetter, } from "./elementUtils.js";
import { initData } from "./data.js"
import { bestGiftCardContainer, giftCardContainer } from "./card.js";

const body = document.querySelector('body')
const modalContainer = document.querySelector('.modal-container')

const modal = document.querySelector('.modal')
const modalCategory = modal.querySelector('.modal__category')
const modalTitle = modal.querySelector('.modal__title')
const modalDescription = modal.querySelector('.modal__description')
const modalSuperpowers = modal.querySelector('.superpowers')


/********************************************************* */

// if (bestGiftCardContainer) {
//   bestGiftCardContainer.addEventListener('click', catchCard)
// }

// if (giftCardContainer) {
//   giftCardContainer.addEventListener('click', catchCard)
// }

// Массив с элементами, на которые нужно повесить обработчик события поиска карточек при клике
const containers = [bestGiftCardContainer, giftCardContainer];

// Проходим по каждому элементу в массиве
containers.forEach(container => {
    if (container) { // если есть на странице - навешиваем обработчик
        container.addEventListener('click', initModal);
        // container.addEventListener('click', catchCard);
    }
});

/**************************************************** */
/**************************************************** */

async function initModal (event) {
  try {
    const data = await initData()
    catchCard (event, data)
  }
  catch (error) {
    console.error('Error fetching data:', error);
  }
}

/**************************************************** */
/**************************************************** */

const superpowersItemOptions = {
  tag: 'ul',
  classes: ['superpowers-item'],
}

const superpowersItemTitleOptions = {
  tag: 'li',
  classes: ['superpowers-item__title'],
}

const superpowersItemScoreOptions = {
  tag: 'li',
  classes: ['superpowers-item__score'],
}

const superpowersItemStarsOptions = {
  tag: 'li',
  classes: ['superpowers-item__stars'],
}

const starsOptions = {
  tag: 'span',
  classes: ['superpowers-item__stars-item']
}


function createSuperpowersContent (dataSuperpowers) {
  const superpowersItemArr = []
  for ( const key in dataSuperpowers) {
    const keyTitle = toUpperFirstLetter(key) // валидирую ключи (делаю первую букву большой)
    const keyValue = dataSuperpowers[key] // получаю значение типа '+400'

    const starsActiveNumber = Math.floor(Number(keyValue) / 100) // получаю число крашеных звёзд

    const superpowersItemTitle = createEl({...superpowersItemTitleOptions, text: keyTitle})
    const superpowersItemScore = createEl({...superpowersItemScoreOptions, text: keyValue})
    const superpowersItemStars = createEl({...superpowersItemStarsOptions, children: createStars (starsActiveNumber)})
    // const superpowersItemStars = createEl(superpowersItemStarsOptions)

    const childrenArr = [superpowersItemTitle, superpowersItemScore, superpowersItemStars]
    const superpowersItem = createEl({ ...superpowersItemOptions, children: childrenArr})

    superpowersItemArr.push(superpowersItem)
  }

  return superpowersItemArr
}


function createStars (starsActiveNumber) {
  const starsArr = []
  // let starActiveClass = 'superpowers-item__stars-item'
  for (let i = 0; i < 5; i += 1) {
    let starsOptionsCreate = {...starsOptions}

    if (i < starsActiveNumber) {
      starsOptionsCreate = {...starsOptions, styles: {color: 'rgb(255, 70, 70)'}}
    }

    const star = createEl(starsOptionsCreate)

    let svgSpritePath = './assets/img/svgSprite.svg#logo__img-symbol'

    if (giftCardContainer) { // на разных страницах разные пути
      svgSpritePath = '../assets/img/svgSprite.svg#logo__img-symbol'
    }

    // Вынес SVG-спрайт в отдельный файл и изменил путь
    // Т.е. остальные варианты с путями без изменений
    const svgMarkup = `
      <svg class="logo__img" width="16" height="16">
        <use href="${svgSpritePath}"></use>
      </svg>
    `
    // const svgMarkup = `
    //   <svg class="logo__img" width="16" height="16">
    //     <use href="#logo__img-symbol"></use>
    //   </svg>
    // `

    const svgElement = createSvgEl(svgMarkup)
    star.append(svgElement)

    // Не плохой вариант

    // star.insertAdjacentHTML('beforeend', `
    //   <svg class="logo__img" width="16" height="16">
    //     <use href="#logo__img-symbol"></use>
    //   </svg>
    // `);

    // В данном случае только самого себя путать

    // <use xlink:href="#logo__img-symbol"></use>  // надо href вместо xlink:href
    // const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    // svg.setAttribute("class", "logo__img");
    // svg.setAttribute("width", "16");
    // svg.setAttribute("height", "16");
    // const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    // use.setAttribute("href", "#logo__img-symbol"); // Использование href вместо xlink:href
    // svg.appendChild(use);
    // star.appendChild(svg);


    starsArr.push(star)
  }
  return starsArr
}


/**************************************************** */

function catchCard (event, data) {
  const { target } = event
  const giftCard = target.closest('.gift-card__btn')
  // const giftCard = target.closest('.gift-card')

  if (giftCard) {
    const giftCardIndex = giftCard.getAttribute('data-index')
    const giftCardCategory = giftCard.getAttribute('data-card') // у карточки категория уже валидирована
    // console.log(giftCardIndex, giftCardCategory)

    const dataModal = data[giftCardIndex]
    const { name, description, category, superpowers } = dataModal

    modal.setAttribute('data-card', giftCardCategory)
    modalCategory.textContent = category
    modalTitle.textContent = name
    modalDescription.textContent = description

    removeAllChild(modalSuperpowers)  // очищаю контейнер суперсилы

    createSuperpowersContent(superpowers).forEach(item => modalSuperpowers.appendChild(item)) // ставлю в разметку

    modalContainer.classList.add('modal-container--active')
    body.classList.add('lock')
  }
}


// Закрываю модалку
modalContainer.addEventListener('click', function (event) {
  const { target } = event
  const btnCross = target.closest('.button-cross')
  if (target === this || btnCross) {
    // Клик произошел именно на родительском элементе или крестике
    this.classList.remove('modal-container--active')
    body.classList.remove('lock')
  }
})


export { modalContainer, body }


// setTimeout(function() { // проявляю модалку
//   modal.classList.add('modal--active')
//   modalPopup = modal
// }, 0);


