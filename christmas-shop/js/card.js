
import { createEl, removeAllChild } from "./elementUtils.js";
import { data } from "./data.js"

const giftCardContainer = document.querySelector('.gift')
const bestGiftCardContainer = document.querySelector('.bestGift')


// для ПП
const dataIndexPP = [1, 13, 0, 2, 12, 26, 14, 25, 15, 3, 24, 27]
const dataIndexBestPP = [1, 15, 3, 27]

// чтобы не шафлить data буду шафлить индексы
// const dataIndexArr = new Array(data.length).fill(0).map((item, i) => item = i);
const dataIndexArr = [...Array(data.length).keys()]


const cardBaseOptions = {
  classes: ['gift-card'],
  attributes: {
    'data-card': 'work',
  },
}

const cardImgOptions = {
  classes: ['gift-card__img'],
}

const cardContentOptions = {
  classes: ['gift-card__content'],
}

const cardContentCategoryOptions = {
  tag: 'h4',
  classes: ['gift-card__category'],
  text: 'For work',
}

const cardContentTitleOptions = {
  tag: 'h3',
  classes: ['gift-card__title'],
  text: 'Console.log Guru',
}


// const cardContentTitle = createEl(cardContentTitleOptions)
// const cardContentCategory = createEl(cardContentCategoryOptions)

// const cardContent = createEl({...cardContentOptions, children: [cardContentCategory, cardContentTitle]})
// const cardImg = createEl(cardImgOptions)

// const cardBase = createEl({...cardBaseOptions, children: [cardImg, cardContent], parent: giftCardContainer,})


function getCategoryFromString(str) {
  const lowerCasedString = str.toLowerCase();
  // Убираю возможные лишние пробелы вокруг
  const trimmedString = lowerCasedString.trim();
  // Заменяю пробелы на нижнее подчеркивание
  // const resultString = trimmedString.replace(/^for\s*/, '');
  const resultString = trimmedString.replace(/\s/g, '_');

  return resultString;
}


function сreatCard (index, dataIndexArr, parentCard) {
    // const indexPP = index  // нормальный вариант
    const indexPP = dataIndexArr[index]  // вариант для PP
    // const indexPP = dataIndexPP[index]  // вариант для PP

    cardContentTitleOptions.text = data[indexPP].name
    const category = data[indexPP].category
    cardContentCategoryOptions.text = category
    cardBaseOptions.attributes = { 'data-card': `${getCategoryFromString(category)}`}

    const cardContentTitle = createEl(cardContentTitleOptions)
    const cardContentCategory = createEl(cardContentCategoryOptions)

    const cardContent = createEl({...cardContentOptions, children: [cardContentCategory, cardContentTitle]})
    const cardImg = createEl(cardImgOptions)

    createEl({...cardBaseOptions, children: [cardImg, cardContent], parent: parentCard,})
    // createEl({...cardBaseOptions, children: [cardImg, cardContent], parent: giftCardContainer,})
}


function testCreatCard (dataIndexArr, parentCard) {

  if (!parentCard) {
    return; // Если элемент не найден, выход из функции
  }

  // if (parent === null) {
  //   console.error("Parent element is null.");
  //   return; // Выход из функции, если родительский элемент не существует
  // }

  removeAllChild(parentCard)
  // removeAllChild(giftCardContainer)

  dataIndexArr.forEach((_, index) => {
    сreatCard(index, dataIndexArr, parentCard);
  });

  // for( let index = 0; index < dataIndexPP.length; index += 1) {
  //   сreatCard (index)
  // }
}


// function testCreatCard () {
//   removeAllChild(giftCardContainer)

//   for( let i = 0; i < dataIndexPP.length; i += 1) {
//     let indexPP = dataIndexPP[i]
//     cardContentTitleOptions.text = data[indexPP].name
//     const category = data[indexPP].category
//     cardContentCategoryOptions.text = category
//     cardBaseOptions.attributes = { 'data-card': `${getCategoryFromString(category)}`}

//     const cardContentTitle = createEl(cardContentTitleOptions)
//     const cardContentCategory = createEl(cardContentCategoryOptions)

//     const cardContent = createEl({...cardContentOptions, children: [cardContentCategory, cardContentTitle]})
//     const cardImg = createEl(cardImgOptions)

//     createEl({...cardBaseOptions, children: [cardImg, cardContent], parent: giftCardContainer,})
//   }
// }

export { testCreatCard, dataIndexArr, dataIndexPP, dataIndexBestPP, giftCardContainer, bestGiftCardContainer, }
