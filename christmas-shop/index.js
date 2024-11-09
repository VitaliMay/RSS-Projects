
import { timerInit } from "./js/timer.js";
import { signatureScore } from "./js/score.js";
import { testCreatCard, dataIndexArrAll, dataIndexArrAllShuffle, dataIndexPP, dataIndexBestPP, giftCardContainer, bestGiftCardContainer } from "./js/card.js";

// timerInit ()

// testCreatCard(dataIndexArrAll, giftCardContainer) // нормальный вариант
// testCreatCard(dataIndexPP, giftCardContainer) // ПП вариант


document.addEventListener("DOMContentLoaded", function() {
  // timerInit ()
  testCreatCard(dataIndexPP, giftCardContainer)
  // testCreatCard(dataIndexArrAll, giftCardContainer)
  // testCreatCard(dataIndexArrAllShuffle, giftCardContainer)

  testCreatCard(dataIndexBestPP, bestGiftCardContainer)
});


/************************************************** */

signatureScore ()


