
import { timerInit } from "./js/timer.js";
import { signatureScore } from "./js/score.js";
import { testCreatCard, dataIndexArrAll, dataIndexPP, dataIndexBestPP, giftCardContainer, bestGiftCardContainer } from "./js/card.js";

// timerInit ()

// testCreatCard(dataIndexArrAll, giftCardContainer) // нормальный вариант
// testCreatCard(dataIndexPP, giftCardContainer) // ПП вариант


document.addEventListener("DOMContentLoaded", function() {
  timerInit ()
  // testCreatCard(dataIndexPP, giftCardContainer)
  testCreatCard(dataIndexArrAll, giftCardContainer)
  // testCreatCard(dataIndexBestPP, bestGiftCardContainer)
  testCreatCard(dataIndexBestPP, bestGiftCardContainer)
});


/************************************************** */

signatureScore ()


