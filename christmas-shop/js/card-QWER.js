
import { createEl, removeAllChild, shuffleArray, getRandomIntegerArr } from "./elementUtils.js";
import { data } from "./data.js"

const giftCardContainer = document.querySelector('.gift')
const bestGiftCardContainer = document.querySelector('.bestGift')

 console.log('data', data)
const dataIndexPP = [1, 13, 0, 2, 12, 26, 14, 25, 15, 3, 24, 27]
const dataIndexBestPP = [1, 15, 3, 27]

// чтобы не шафлить data буду шафлить индексы
// const dataIndexArrAll = new Array(data.length).fill(0).map((item, i) => item = i);
const dataIndexArrAll = [...Array(data.length).keys()]
const dataIndexArrAllShuffle = shuffleArray(dataIndexArrAll)

/******************************************************** */
function dataIndexArrCreater (data, dataIndexArrAllShuffle) {
  const dataIndexArrWork = []
  const dataIndexArrHealth = []
  const dataIndexArrHarmony = []
  dataIndexArrAllShuffle.forEach((item) => {
    if (getCategoryFromString(data[item].category) === "for_work") dataIndexArrWork.push(item);
    if (getCategoryFromString(data[item].category) === "for_health") dataIndexArrHealth.push(item);
    if (getCategoryFromString(data[item].category) === "for_harmony") dataIndexArrHarmony.push(item);

  // data.forEach((item, index) => {
    // if (getCategoryFromString(item.category) === "for_work") dataIndexArrWork.push(index);
    // if (getCategoryFromString(item.category) === "for_health") dataIndexArrHealth.push(index);
    // if (getCategoryFromString(item.category) === "for_harmony") dataIndexArrHarmony.push(index);
    
    // if (item.category === "For Work") dataIndexArrWork.push(index);
    // if (item.category === "For Health") dataIndexArrHealth.push(index);
    // if (item.category === "For Harmony") dataIndexArrHarmony.push(index);
  })
  return {dataIndexArrWork, dataIndexArrHealth, dataIndexArrHarmony,}
}

// Для ПП
// const {dataIndexArrWork, dataIndexArrHealth, dataIndexArrHarmony} = dataIndexArrCreater(data, dataIndexPP)

const {dataIndexArrWork, dataIndexArrHealth, dataIndexArrHarmony} = dataIndexArrCreater(data, dataIndexArrAllShuffle)

const randomGiftIndexArr = getRandomIntegerArr(0, data.length - 1, 4)


console.log('All', dataIndexArrAllShuffle)
// console.log('All', dataIndexPP) // для ПП
console.log('work', dataIndexArrWork)
console.log('health', dataIndexArrHealth)
console.log('harmony', dataIndexArrHarmony)
console.log('Random', randomGiftIndexArr)

/******************************************************** */


const cardBaseOptions = {
  tag: 'article',
  classes: ['gift-card'],
  attributes: {
    'data-card': 'for_work',
    // 'data-index': '01',
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
  // tag: 'h3',
  classes: ['gift-card__category'],
  // text: 'For work',
}

const cardContentTitleOptions = {
  // tag: 'h4',
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
  // Заменяю пробелы между слов на нижнее подчеркивание
  const resultString = trimmedString.replace(/\s/g, '_');
  // const resultString = trimmedString.replace(/^for\s*/, '');

  return resultString;
}


async function сreatCard (index, dataIndexArr, parentCard) {
    // const indexPP = index  // нормальный вариант
    const indexPP = dataIndexArr[index]  // вариант для PP

    cardContentTitleOptions.text =  await data[indexPP].name
    const category = await data[indexPP].category
    cardContentCategoryOptions.text = category
    const categoryValid = getCategoryFromString(category)

    cardBaseOptions.attributes = { 'data-card': categoryValid, }
    // cardBaseOptions.attributes = { 'data-card': `${getCategoryFromString(category)}`, }

    cardBtnOptions.attributes['data-index'] = `${indexPP}`
    cardBtnOptions.attributes['data-card'] = categoryValid  // дублирование но лень css менять
    const cardBtn = createEl(cardBtnOptions)
    // cardBaseOptions.attributes = { 'data-card': `${getCategoryFromString(category)}`,
    //                                'data-index': `${indexPP}`}

    const cardContentTitle = createEl(cardContentTitleOptions)
    const cardContentCategory = createEl(cardContentCategoryOptions)

    const cardContent = createEl({...cardContentOptions, children: [cardContentCategory, cardContentTitle]})
    const cardImg = createEl(cardImgOptions)

    createEl({...cardBaseOptions, children: [cardImg, cardContent, cardBtn], parent: parentCard,})
}


function createAllCards (dataIndexArr, parentCard) {

  if (!parentCard) {
    return; // Если элемент не найден, выход из функции
  }

  // if (parent === null) {
  //   console.error("Parent element is null.");
  //   return; // Выход из функции, если родительский элемент не существует
  // }

  removeAllChild(parentCard)

  dataIndexArr.forEach((_, index) => {
    сreatCard(index, dataIndexArr, parentCard);
  });

}


export { createAllCards, dataIndexArrAll, dataIndexArrAllShuffle, dataIndexArrWork, dataIndexArrHealth, dataIndexArrHarmony, randomGiftIndexArr, dataIndexPP, dataIndexBestPP, giftCardContainer, bestGiftCardContainer, }
