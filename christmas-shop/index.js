
import { timerInit } from "./js/timer.js";
import { signatureScore } from "./js/score.js";
import { data } from "./js/data.js";
import { getRandomIntegerArr } from "./js/elementUtils.js";
import { testCreatCard, dataIndexArrAll, dataIndexArrAllShuffle, dataIndexPP, dataIndexBestPP, giftCardContainer, bestGiftCardContainer } from "./js/card.js";
import { burgerButton } from "./js/burger.js";
import { modalContainer } from "./js/modal.js";

timerInit ()

// testCreatCard(dataIndexArrAll, giftCardContainer) // нормальный вариант
// testCreatCard(dataIndexPP, giftCardContainer) // ПП вариант


document.addEventListener("DOMContentLoaded", function() {
  timerInit ()
  // testCreatCard(dataIndexBestPP, bestGiftCardContainer)
  // testCreatCard(dataIndexPP, giftCardContainer)

  // testCreatCard(dataIndexArrAll, giftCardContainer)
  // testCreatCard(dataIndexArrAllShuffle, giftCardContainer)
  const randomGiftIndexArr = getRandomIntegerArr(0, data.length - 1, 4)
  testCreatCard(randomGiftIndexArr, bestGiftCardContainer)
  testCreatCard(dataIndexArrAllShuffle, giftCardContainer)

});


/************************************************** */

signatureScore ()


