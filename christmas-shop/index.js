
import { timerInit } from "./js/timer.js";
import { signatureScore } from "./js/score.js";
import { testCreatCard, dataIndexArr, dataIndexPP, dataIndexBestPP, giftCardContainer, bestGiftCardContainer } from "./js/card.js";

// timerInit ()

// testCreatCard(dataIndexArr, giftCardContainer) // нормальный вариант
// testCreatCard(dataIndexPP, giftCardContainer) // ПП вариант

// testCreatCard(dataIndexArr, giftBestCardContainer) // ПП вариант

document.addEventListener("DOMContentLoaded", function() {
  timerInit ()
  testCreatCard(dataIndexPP, giftCardContainer)
  // testCreatCard(dataIndexBestPP, bestGiftCardContainer)
  testCreatCard(dataIndexBestPP, bestGiftCardContainer)
});


/************************************************** */

signatureScore ()


