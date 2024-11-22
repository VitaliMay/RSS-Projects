
import { createAllCards, dataIndexArrAll, dataIndexPP, dataIndexArrAllShuffle, dataIndexArrWork, dataIndexArrHealth, dataIndexArrHarmony, giftCardContainer, } from "./card.js";

const tabContainer = document.querySelector('.gift-tab-container')
const tabsAll = document.querySelectorAll('.tab')

if (tabContainer) {
  tabContainer.addEventListener('click', selectСategory)
}

const categoryObjIndexArr = {
  // 'all': dataIndexArrAllShuffle,
  'all': dataIndexPP,
  'for_work': dataIndexArrWork,
  'for_health': dataIndexArrHealth,
  'for_harmony': dataIndexArrHarmony,
}

function selectСategory (event) {
  const { target } = event
  const tab = target.closest('.tab')

  if (tab) {
    const tabCategory = tab.getAttribute('data-category')
    const dataIndexArr = categoryObjIndexArr[tabCategory]

    removeActiveClass(tabsAll)
    createAllCards(dataIndexArr, giftCardContainer)
    tab.classList.add('tab--active')
  }
}

function removeActiveClass (tabs) {
  tabs.forEach(tab => {
    tab.classList.remove('tab--active');
  });
}

export { tabContainer }
