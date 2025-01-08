import { main, keyboardNum, keyboardLetter } from "./variables.js";
import { createEl } from "./elementUtils.js";


function keyboardNumKey () {
  for (let i = 1; i <= 10; i += 1) {
    let keyText = i;
    if (keyText === 10) keyText = 0;
    createEl({text: `${keyText}`, classes: ['key'], parent: keyboardNum})
  }
}

keyboardNumKey()

/*********************************** */


const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
const lettersArr = letters.split('')
lettersArr.forEach((key, index) => {
// lettersArr.forEach(key => {
  // if (key === 'A') {
  if (index === 10) {
    createEl({text: `${key}`, styles: {marginLeft: '4px'}, classes: ['key'], parent: keyboardLetter})
  } else {
    createEl({text: `${key}`, classes: ['key'], parent: keyboardLetter})
  }

});

// keyboardNum.classList.add('visually-hidden')


export { keyboardNumKey }