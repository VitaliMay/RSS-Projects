import { main, keyboardNum, keyboardLetter } from "./variables.js";
import { createEl } from "./elementUtils.js";


/*********************************** */

const nums = '1234567890'
const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM';

const keyClassArr = ['key', 'disabled']

const keysArr = []

function createKeyboard (str, classArr, parent) {
  const strArr = str.split('')
  strArr.forEach((key, index) => {
      if (strArr.length > 10 && index === 10) {
        keysArr.push(createEl({text: `${key}`, styles: {marginLeft: '4px'}, classes: classArr, parent: parent}));
      } else {
        keysArr.push(createEl({text: `${key}`, classes: classArr, parent: parent}));
      }
    });
}

createKeyboard( nums, keyClassArr, keyboardNum )
createKeyboard( letters, keyClassArr, keyboardLetter )


// keyboardNum.classList.add('visually-hidden')
// keyboardNum.classList.remove('visually-hidden')


export { createKeyboard, keysArr }