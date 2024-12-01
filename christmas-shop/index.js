
import { timerInit } from "./js/timer.js";
import { signatureScore } from "./js/score.js";
// import { data } from "./js/data.js";
// import { getRandomIntegerArr } from "./js/elementUtils.js";
import { createAllCards, dataIndexArrAll, dataIndexArrAllShuffle, randomGiftIndexArr, dataIndexPP, dataIndexBestPP, giftCardContainer, bestGiftCardContainer } from "./js/card.js";
// import { createAllCards, dataIndexArrAll, dataIndexArrAllShuffle, dataIndexPP, dataIndexBestPP, giftCardContainer, bestGiftCardContainer } from "./js/card.js";
import { burgerButton } from "./js/burger.js";
import { modalContainer, body } from "./js/modal.js";
import { sliderControls } from "./js/slider.js";
import { tabContainer } from "./js/tabs.js";
import { scrollBtn } from "./js/scroll.js";

timerInit ()

// отменяю контекстное меню при длинном таче
body.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});

document.addEventListener("DOMContentLoaded", function() {
  timerInit ()
  // createAllCards(dataIndexBestPP, bestGiftCardContainer) // для ПП
  // createAllCards(dataIndexPP, giftCardContainer) // для ПП

  // const randomGiftIndexArr = getRandomIntegerArr(0, data.length - 1, 4)
  createAllCards(randomGiftIndexArr, bestGiftCardContainer)
  createAllCards(dataIndexArrAllShuffle, giftCardContainer)

  // console.log('Random', randomGiftIndexArr)
});


/************************************************** */

signatureScore ()


