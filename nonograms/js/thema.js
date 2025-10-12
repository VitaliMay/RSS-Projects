import { canvasGame } from './canvasDraw.js';
import { body, settingMode } from './interface.js';

/******************************************************************* */

// Проверяю локальное хранилище на наличие сохраненной темы
const savedTheme = localStorage.getItem('VitaliMay_Nono_theme');
const isThemaDark = { value: savedTheme === 'dark' }; // Ставлю темную тему, если сохранено 'dark'

// По умолчанию 'true' (то есть тёмная тема), если сохраненное значение не найдено
if (!savedTheme) {
  isThemaDark.value = true;
  localStorage.setItem('VitaliMay_Nono_theme', 'dark'); // Сохраняю по умолчанию в localStorage
}

/******************************************************************* */
// const isThemaDark = { value: true };

const themaColors = {
  squareCrossed: 'rgb(128, 128, 128)',
  squareClicked: 'beige',
  squareRowColHover: 'rgb(107, 107, 107)',
  squareAll: 'rgb(128, 128, 128)',
  squareHover: 'rgb(88, 88, 88)',
  textColor: 'white',

  canvasColor: 'black',
};

function changeThemeBody() {
  // const currentThemeFlag = localStorage.getItem('VitaliMay_theme') || true;
  // isThemaDark.value = currentThemeFlag;
  const theme = isThemaDark.value ? 'dark-mode' : 'light-mode';
  body.className = theme;

  // isThemaDark.value =
  // // Сохраняю новую тему в Local Storage
  // localStorage.setItem('VitaliMay_theme', newTheme);
}

settingMode.addEventListener('click', toggleThemaMode);

function changeThemeCanvas() {
  if (isThemaDark.value) {
    themaColors.squareCrossed = 'rgb(128, 128, 128)';
    themaColors.squareClicked = 'beige';
    themaColors.squareRowColHover = 'rgb(107, 107, 107)';
    themaColors.squareAll = 'rgb(128, 128, 128)';
    themaColors.squareHover = 'rgb(88, 88, 88)';
    themaColors.textColor = 'white';

    themaColors.canvasColor = 'black';
  } else {
    themaColors.squareCrossed = 'white';
    themaColors.squareClicked = 'black';
    themaColors.squareRowColHover = 'rgb(217, 217, 217)';
    themaColors.squareAll = 'white';
    themaColors.squareHover = 'rgb(179, 178, 178)';
    themaColors.textColor = 'black';

    themaColors.canvasColor = 'rgb(206, 195, 236)';
    // themaColors.canvasColor = 'rgb(128, 128, 128)';
  }

  // canvasGame.currentGame.drawSquaresAll();
}

function toggleThemaMode() {
  isThemaDark.value = !isThemaDark.value;
  const themaState = isThemaDark.value ? 'Dark' : 'Light';
  settingMode.textContent = themaState;

  changeThemeBody();
  changeThemeCanvas();
  canvasGame.currentGame.drawSquaresAll(); // не нужна при первоначальной загрузке

  // if (isThemaDark.value) {
  //   themaColors.squareCrossed = 'rgb(128, 128, 128)';
  //   themaColors.squareClicked = 'beige';
  //   themaColors.squareRowColHover = 'rgb(107, 107, 107)';
  //   themaColors.squareAll = 'rgb(128, 128, 128)';
  //   themaColors.squareHover = 'rgb(88, 88, 88)';
  //   themaColors.textColor = 'white';

  //   themaColors.canvasColor = 'black';
  // } else {
  //   themaColors.squareCrossed = 'white';
  //   themaColors.squareClicked = 'black';
  //   themaColors.squareRowColHover = 'rgb(217, 217, 217)';
  //   themaColors.squareAll = 'white';
  //   themaColors.squareHover = 'rgb(179, 178, 178)';
  //   themaColors.textColor = 'black';

  //   themaColors.canvasColor = 'rgb(128, 128, 128)';
  // }

  // canvasGame.currentGame.drawSquaresAll();

  // Сохраняю новую тему в Local Storage
  localStorage.setItem(
    'VitaliMay_Nono_theme',
    isThemaDark.value ? 'dark' : 'light',
  );
}

// Установка начальной темы
changeThemeBody();
changeThemeCanvas();
settingMode.textContent = isThemaDark.value ? 'Dark' : 'Light';

// console.log('tema');

export { themaColors };
