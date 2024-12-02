
import { createEl, removeAllChild, shuffleArray, getRandomIntegerArr } from "./elementUtils.js";
import { initializeData } from "./data.js"

const giftCardContainer = document.querySelector('.gift')
const bestGiftCardContainer = document.querySelector('.bestGift')

// console.log('data', data)

const dataIndexPP = [1, 13, 0, 2, 12, 26, 14, 25, 15, 3, 24, 27]
const dataIndexBestPP = [1, 15, 3, 27]

/************************************************************** */

const init = async () => {
  try {
    const data = await initializeData(); // Ждем завершения и получения данных
    console.log('data', data);

    const dataIndexArrAll = [...Array(data.length).keys()];
    const dataIndexArrAllShuffle = shuffleArray(dataIndexArrAll);

    const { dataIndexArrWork, dataIndexArrHealth, dataIndexArrHarmony } = dataIndexArrCreater(data, dataIndexArrAllShuffle);

    const randomGiftIndexArr = getRandomIntegerArr(0, data.length - 1, 4);

    // Логирование для проверки
    console.log('All', dataIndexArrAllShuffle);
    console.log('work', dataIndexArrWork);
    console.log('health', dataIndexArrHealth);
    console.log('harmony', dataIndexArrHarmony);
    console.log('Random', randomGiftIndexArr);

    // Создание карточек
    createAllCards(randomGiftIndexArr, bestGiftCardContainer, data); // Используем одну из категорий для создания карточек
    // createAllCards(dataIndexArrWork, giftCardContainer); // Используем одну из категорий для создания карточек
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const dataIndexArrCreater = (data, dataIndexArrAllShuffle) => {
  const dataIndexArrWork = [];
  const dataIndexArrHealth = [];
  const dataIndexArrHarmony = [];
  dataIndexArrAllShuffle.forEach((item) => {
    if (getCategoryFromString(data[item].category) === "for_work") dataIndexArrWork.push(item);
    if (getCategoryFromString(data[item].category) === "for_health") dataIndexArrHealth.push(item);
    if (getCategoryFromString(data[item].category) === "for_harmony") dataIndexArrHarmony.push(item);
  });
  return { dataIndexArrWork, dataIndexArrHealth, dataIndexArrHarmony };
};

init();

/************************************************************** */


// const dataIndexArrAll = [...Array(data.length).keys()]
// const dataIndexArrAllShuffle = shuffleArray(dataIndexArrAll)

// function dataIndexArrCreater (data, dataIndexArrAllShuffle) {
//   const dataIndexArrWork = []
//   const dataIndexArrHealth = []
//   const dataIndexArrHarmony = []
//   dataIndexArrAllShuffle.forEach((item) => {
//     if (getCategoryFromString(data[item].category) === "for_work") dataIndexArrWork.push(item);
//     if (getCategoryFromString(data[item].category) === "for_health") dataIndexArrHealth.push(item);
//     if (getCategoryFromString(data[item].category) === "for_harmony") dataIndexArrHarmony.push(item);

//   })
//   return {dataIndexArrWork, dataIndexArrHealth, dataIndexArrHarmony,}
// }


// const {dataIndexArrWork, dataIndexArrHealth, dataIndexArrHarmony} = dataIndexArrCreater(data, dataIndexArrAllShuffle)

// const randomGiftIndexArr = getRandomIntegerArr(0, data.length - 1, 4)


// console.log('All', dataIndexArrAllShuffle)
// console.log('work', dataIndexArrWork)
// console.log('health', dataIndexArrHealth)
// console.log('harmony', dataIndexArrHarmony)
// console.log('Random', randomGiftIndexArr)


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


function getCategoryFromString(str) {
  const lowerCasedString = str.toLowerCase();
  const trimmedString = lowerCasedString.trim();
  const resultString = trimmedString.replace(/\s/g, '_');

  return resultString;
}


async function сreatCard (index, dataIndexArr, parentCard, data) {
    const indexPP = dataIndexArr[index]  // вариант для PP

    cardContentTitleOptions.text = data[indexPP].name
    const category = await data[indexPP].category
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

function createAllCards (dataIndexArr, parentCard, data) {

  if (!parentCard) {
    return; // Если элемент не найден, выход из функции
  }


  removeAllChild(parentCard)

  dataIndexArr.forEach((_, index) => {
    сreatCard(index, dataIndexArr, parentCard);
  });

}


export { createAllCards, dataIndexPP, dataIndexBestPP, giftCardContainer, bestGiftCardContainer, }
// export { createAllCards, dataIndexArrAll, dataIndexArrAllShuffle, dataIndexArrWork, dataIndexArrHealth, dataIndexArrHarmony, randomGiftIndexArr, dataIndexPP, dataIndexBestPP, giftCardContainer, bestGiftCardContainer, }
