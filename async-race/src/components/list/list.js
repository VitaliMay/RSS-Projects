import { createEl, createSvgUse } from '../../utils/elementUtils';
import { createButton } from '../button/button';

import { controlsBtnState, currentPage } from '../../store/controls-store';
import { fetchDelete, fetchStarted, fetchDrive, fetchStopped } from '../../api.js/api';

import { modalWinner, modalTitleElement } from '../modal/modal';

export const list = createEl({ tag: 'ul', classes: ['list'] });

// export const counterID = createCounterID(6);

export function createListItem(id, colorCar, nameCar) {
  // export function createListItem(id, colorCar, nameCar, svgModel) {
  // export function createListItem(id, colorCar, nameCar, inpText, inpColor, btnSend, svgModel) {
  const inpText = controlsBtnState.formSelect.inputText;
  const inpColor = controlsBtnState.formSelect.inputColor;
  const btnSend = controlsBtnState.formSelect.buttonSendCreateCar;

  const inpTextCreat = controlsBtnState.formCreat.inputText;
  const inpColorCreat = controlsBtnState.formCreat.inputColor;
  const btnSendCreat = controlsBtnState.formCreat.buttonSendCreateCar;

  const { startRaceButton } = controlsBtnState;

  const listItem = createEl({
    tag: 'li',
    attributes: { id },
    classes: ['list-item'],
    parent: list,
  });
  const optionBlock = createEl({ parent: listItem, classes: ['list-item__option', 'option'] });
  const selectButton = createButton('select', optionBlock);
  const deleteButton = createButton('delete', optionBlock);
  const infoCarName = createEl({ text: 'Mersedes', parent: optionBlock, classes: ['info-car-name'] });
  infoCarName.textContent = nameCar;

  const raceBlock = createEl({ parent: listItem, classes: ['list-item__race', 'race-block'] });

  const startButton = createButton('A', raceBlock);
  const backButton = createButton('B', raceBlock, ['button_back']);
  backButton.disabled = true;

  const trackBlock = createEl({ parent: raceBlock, classes: ['race-block__track'] });
  trackBlock.style.color = colorCar;

  const svgCar = createSvgUse('#car', 'car-race');
  trackBlock.append(svgCar);

  const svgFlag = createSvgUse('#flag', 'flag-style');
  trackBlock.append(svgFlag);

  deleteButton.addEventListener('click', () => {
    listItem.remove();
    fetchDelete(id);
    // removeAllChild(list);
    // fetchPagination(currentPage.numberCurrentPage, createListItem);
  });

  selectButton.addEventListener('click', () => {
    // eslint-disable-next-line no-param-reassign
    btnSend.disabled = false;
    inpColor.disabled = false;
    inpText.disabled = false;

    btnSendCreat.disabled = true;
    inpColorCreat.disabled = true;
    inpTextCreat.disabled = true;

    // В самом list-item лучше не менять,
    // чтобы не вводить доп кнопку возврата к исходному состоянию
    controlsBtnState.svgSelectCar = svgCar;
    controlsBtnState.selectTrack = trackBlock;

    if (controlsBtnState.btnSelectListItem) {
      controlsBtnState.btnSelectListItem.disabled = false;
    }
    controlsBtnState.btnSelectListItem = selectButton;
    controlsBtnState.deleteBtnSelectCar = deleteButton;
    selectButton.disabled = true;
    deleteButton.disabled = true;

    controlsBtnState.chooseCarName.textContent = infoCarName.textContent;
    inpText.value = infoCarName.textContent;
    // inpColor.value = colorCar;
    // inpColor.value = trackBlock.style.color;
    // eslint-disable-next-line no-param-reassign
    // trackBlock.style.color = inpColor.value;
    // controlsBtnState.svgModel.style.color = inpColor.value;
    controlsBtnState.svgModel.style.color = trackBlock.style.color;
    controlsBtnState.formSelect.inputColor.value = '#000000';
    // controlsBtnState.formSelect.inputColor.value = controlsBtnState.svgModel.style.color;
    // console.log(controlsBtnState.svgModel.style.color);
    // svgModel.style.color = inpColor.value;

    controlsBtnState.infoCarNameSelectCar = infoCarName;
  });

  startButton.addEventListener('click', () => {
    trackBlock.classList.remove('race-block__track_adapt');
    svgCar.classList.remove('move');
    svgCar.classList.remove('pause');
    svgCar.style = '';

    currentPage.isRace = false;

    startCarAnimation(trackBlock, svgCar, id);
    // startAnimation(trackBlock, svgCar, fetchStarted(id));
    // startAnimation(trackBlock, svgCar, 2000);
    startButton.disabled = true;
    backButton.disabled = false;

    startRaceButton.disabled = true;
  });

  backButton.addEventListener('click', () => {
    // svgCar.classList.remove('move');
    // svgCar.style.transform = 'translateX(0) scaleX(-1);';

    // trackBlock.classList.remove('race-block__track_adapt');
    // svgCar.classList.remove('move');
    // svgCar.classList.remove('pause');
    // svgCar.style = '';
    // startButton.disabled = false;
    // backButton.disabled = true;

    const backLogic = () => {
      trackBlock.classList.remove('race-block__track_adapt');
      svgCar.classList.remove('move');
      svgCar.classList.remove('pause');
      svgCar.style = '';
      startButton.disabled = false;
      backButton.disabled = true;
    };

    // backLogic();

    fetchStopped(id, backLogic);
  });

  svgCar.addEventListener('animationend', () => {
    // svgCar.classList.remove('move');
    // svgCar.classList.remove('pause');
    // svgCar.style = '';
    // trackBlock.classList.add('race-block__track_adapt');
    // // startButton.disabled = false;
    // backButton.disabled = false;

    const { winner, isRace } = currentPage;
    // console.log(winner.id, winner.name);
    if (!currentPage.winner.id && isRace === true) {
      winner.id = id;
      winner.name = infoCarName.textContent;
      winner.time = Number.parseFloat(svgCar.style.animationDuration);

      console.log('Привет победитель');
      console.log(winner.name, winner.id, winner.time);

      const timeSec = Math.round(winner.time) / 1000;
      const textModal = `Winner ${winner.name} for ${timeSec} sec`;
      modalWinner(modalTitleElement, textModal);
    }

    const backLogic = () => {
      trackBlock.classList.remove('race-block__track_adapt');
      svgCar.classList.remove('move');
      svgCar.classList.remove('pause');
      svgCar.style = '';
      trackBlock.classList.add('race-block__track_adapt');
      // startButton.disabled = false;
      if (isRace === false) {
        backButton.disabled = false;
      }
    };

    fetchStopped(id, backLogic);
  });

  return listItem;
}

// Функция для запуска анимации
function startAnimation(parent, child, duration) {
  const parentWidth = parent.clientWidth;
  const childWidth = child.clientWidth;
  const moveDistance = parentWidth - childWidth;

  // длительность анимации
  // eslint-disable-next-line no-param-reassign
  child.style.animationDuration = `${duration}ms`;

  // конечная точка
  child.style.setProperty('--move-distance', `${moveDistance}px`);

  // Добавляем класс для запуска анимации
  child.classList.add('move');
}

export async function startCarAnimation(track, svg, id) {
  try {
    const duration = await fetchStarted(id); // Ждем, пока получим длительность
    startAnimation(track, svg, duration); // Запускаем анимацию

    const statusDrive = await fetchDrive(id);
    console.log(statusDrive);
    if (!statusDrive) {
      // console.log(svg.style.transform.translateX);

      // const computedStyle = getComputedStyle(svg);
      // const { transform } = computedStyle;
      // console.log(transform);
      // // Парсим translateX из матрицы (transform)
      // const matrix = new DOMMatrix(transform);
      // const currentPosition = matrix.m41; // m41 = translateX
      // console.log(currentPosition);

      svg.classList.add('pause');
    }
  } catch (error) {
    console.error('Ошибка при запуске анимации:', error);
  }
}

// Функция для запуска анимации
// function startAnimation(parent, child, duration) {
//   const parentWidth = parent.clientWidth;
//   const childWidth = child.clientWidth;
//   const moveDistance = parentWidth - childWidth;

//   // длительность анимации
//   // eslint-disable-next-line no-param-reassign
//   child.style.animationDuration = `${duration}ms`;

//   // конечная точка
//   child.style.setProperty('--move-distance', `${moveDistance}px`);

//   // Добавляем класс для запуска анимации
//   child.classList.add('move');
// }
