
import { initData } from "./data.js";
import { shuffleArray, getCategoryFromString, } from "./elementUtils.js";
import { giftCardContainer, createAllCards, } from "./card.js";

const tabContainer = document.querySelector('.gift-tab-container')
const tabsAll = document.querySelectorAll('.tab')


const initGifts = async () => {
  try {
    const data = await initData(); // Ждем завершения и получения данных

    const dataIndexArrAll = [...Array(data.length).keys()];
    const dataIndexArrAllShuffle = shuffleArray(dataIndexArrAll);

    const { dataIndexArrWork, dataIndexArrHealth, dataIndexArrHarmony } = dataIndexArrCreater(data, dataIndexArrAllShuffle);


    const categoryObjIndexArr = {
      'all': dataIndexArrAllShuffle,
      // 'all': dataIndexPP,
      'for_work': dataIndexArrWork,
      'for_health': dataIndexArrHealth,
      'for_harmony': dataIndexArrHarmony,
    }

    createAllCards(dataIndexArrAllShuffle, giftCardContainer, data)

    if (tabContainer) {
      tabContainer.addEventListener('click', (event) => {
        selectСategory(event, categoryObjIndexArr, data);
      });
    }

  }
  catch (error) {
    console.error('Error fetching data:', error);
  }

}


/******************************************************************* */

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


function selectСategory (event, categoryObjIndexArr, data) {

  const { target } = event
  const tab = target.closest('.tab')

  if (tab) {
    const tabCategory = tab.getAttribute('data-category')
    const dataIndexArr = categoryObjIndexArr[tabCategory]

    removeActiveClass(tabsAll)
    createAllCards(dataIndexArr, giftCardContainer, data)
    tab.classList.add('tab--active')
  }
}


function removeActiveClass (tabs) {
  tabs.forEach(tab => {
    tab.classList.remove('tab--active');
  });
}

export { initGifts }
