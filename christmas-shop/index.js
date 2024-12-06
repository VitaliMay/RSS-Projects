
import { timerInit } from "./js/timer.js";
import { signatureScore } from "./js/score.js";
import { initBestGifts, dataIndexPP, dataIndexBestPP, giftCardContainer, bestGiftCardContainer } from "./js/card.js";
// import { createAllCards, dataIndexArrAll, dataIndexArrAllShuffle, dataIndexPP, dataIndexBestPP, giftCardContainer, bestGiftCardContainer } from "./js/card.js";
import { burgerButton } from "./js/burger.js";
import { modalContainer, body } from "./js/modal.js";
import { sliderControls } from "./js/slider.js";
import { initGifts } from "./js/tabs.js";
import { scrollBtn } from "./js/scroll.js";

timerInit ()

// отменяю контекстное меню при длинном таче
body.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});

document.addEventListener("DOMContentLoaded", function() {
  initBestGifts ()
  timerInit ()
  initGifts ()
  // createAllCards(dataIndexBestPP, bestGiftCardContainer) // для ПП
  // createAllCards(dataIndexPP, giftCardContainer) // для ПП

});


/************************************************** */

signatureScore ()


