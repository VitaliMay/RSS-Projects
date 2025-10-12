
import { createEl, removeAllChild, getRandomIntegerArr, getCategoryFromString } from "./elementUtils.js";
import { instanceData as dataSingleton } from "./data.js"
// import { initData } from "./data.js"

const giftCardContainer = document.querySelector('.gift')
const bestGiftCardContainer = document.querySelector('.bestGift')

// Для ПП
const dataIndexPP = [1, 13, 0, 2, 12, 26, 14, 25, 15, 3, 24, 27]
const dataIndexBestPP = [1, 15, 3, 27]

/************************************************************** */

const initBestGifts = async () => {
  try {
    const data = await dataSingleton.initData()
    // const data = await initData(); // Ждем завершения и получения данных
    // console.log('data', data);

    const randomGiftIndexArr = getRandomIntegerArr(0, data.length - 1, 4);

    console.log('Random', randomGiftIndexArr)

    // Создание карточек в bestGift
    createAllCards(randomGiftIndexArr, bestGiftCardContainer, data); 

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


/************************************************************** */

function createAllCards (dataIndexArr, parentCard, data) {

  if (!parentCard) {
    return; // Если элемент не найден, выход из функции
  }

  removeAllChild(parentCard)

  dataIndexArr.forEach((_, index) => {
    setTimeout(() => {  // для анимации появления
      сreatCard(index, dataIndexArr, parentCard, data);
    }, index * 80);
    // сreatCard(index, dataIndexArr, parentCard, data);
  });

}

function сreatCard (index, dataIndexArr, parentCard, data) {

  const indexPP = dataIndexArr[index]  // вариант для PP

  cardContentTitleOptions.text = data[indexPP].name
  const category = data[indexPP].category
  cardContentCategoryOptions.text = category
  const categoryValid = getCategoryFromString(category)

  cardBaseOptions.attributes = { 'data-card': categoryValid, }

  cardBtnOptions.attributes['data-index'] = `${indexPP}`
  cardBtnOptions.attributes['data-card'] = categoryValid  // дублирование но лень css менять
  const cardBtn = createEl(cardBtnOptions)
  const cardContentTitle = createEl(cardContentTitleOptions)
  const cardContentCategory = createEl(cardContentCategoryOptions)

  const cardContent = createEl({...cardContentOptions, children: [cardContentCategory, cardContentTitle]})
  const cardImg = createEl(cardImgOptions)

  createEl({...cardBaseOptions, children: [cardImg, cardContent, cardBtn], parent: parentCard,})
}

/************************************************************* */


const cardBaseOptions = {
  tag: 'article',
  classes: ['gift-card'],
  attributes: {
    'data-card': 'for_work',
  },
}

const cardBtnOptions = {
  tag: 'button',
  classes: ['gift-card__btn'],
  attributes: {
    'type': 'button',
    'aria-label': 'gift card',
    'data-index': '01',
    'data-card': 'for_work',
  }
}

const cardImgOptions = {
  classes: ['gift-card__img'],
}

const cardContentOptions = {
  classes: ['gift-card__content'],
}

const cardContentCategoryOptions = {
  classes: ['gift-card__category'],
}

const cardContentTitleOptions = {
  tag: 'h3',
  classes: ['gift-card__title'],
  text: 'Console.log Guru',
}


export { initBestGifts, dataIndexPP, dataIndexBestPP, giftCardContainer, bestGiftCardContainer, createAllCards, }
