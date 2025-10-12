import { createEl, createSvgUse, removeAllChild, rgbToHex } from '../../utils/elementUtils.ts';
import { createButton } from '../button/button';
import { dataStore, stateData, cleanStateData } from '../../store/data-store';

import { controlsBtnState, currentPage } from '../../store/controls-store';
import {
  fetchDelete,
  fetchStarted,
  fetchDrive,
  fetchStopped,
  fetchPagination,
  fetchGetWinner,
  fetchAddWinner,
  fetchDeleteWinner,
  fetchUpdateWinner,
} from '../../api.js/api';

import { modalWinner, modalTitleElement } from '../modal/modal';

export const list = createEl({ tag: 'ul', classes: ['list'] });

export function createListItem(id, colorCar, nameCar) {
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

  const startButton = createButton('A', raceBlock, ['button_start']);
  const backButton = createButton('B', raceBlock, ['button_back']);
  backButton.disabled = true;

  const trackBlock = createEl({ parent: raceBlock, classes: ['race-block__track'] });
  trackBlock.style.color = colorCar;

  const svgCar = createSvgUse('#car', 'car-race');
  trackBlock.append(svgCar);

  const svgFlag = createSvgUse('#flag', 'flag-style');
  trackBlock.append(svgFlag);

  deleteButton.addEventListener('click', async () => {
    listItem.remove();
    await fetchDelete(id);
    fetchDeleteWinner(id);
    removeAllChild(list);
    fetchPagination(currentPage.numberCurrentPage, createListItem);

    cleanStateData();
  });

  selectButton.addEventListener('click', () => {
    controlsBtnState.selectID = id;
    btnSend.disabled = false;
    inpColor.disabled = false;
    inpText.disabled = false;

    btnSendCreat.disabled = true;
    inpColorCreat.disabled = true;
    inpTextCreat.disabled = true;

    inpColorCreat.value = '#000000';
    inpTextCreat.value = '';

    controlsBtnState.svgSelectCar = svgCar;
    controlsBtnState.selectTrack = trackBlock;

    if (controlsBtnState.btnSelectListItem) {
      controlsBtnState.btnSelectListItem.disabled = false;
    }
    controlsBtnState.btnSelectListItem = selectButton;
    controlsBtnState.deleteBtnSelectCar = deleteButton;
    selectButton.disabled = true;
    deleteButton.disabled = true;

    const carName = infoCarName.textContent;
    controlsBtnState.chooseCarName.textContent = carName;
    inpText.value = carName;

    const hexColor = rgbToHex(trackBlock.style.color);
    controlsBtnState.svgModel.style.color = hexColor;
    controlsBtnState.formSelect.inputColor.value = hexColor;

    controlsBtnState.infoCarNameSelectCar = infoCarName;

    dataStore.formCreateCarStore.textCar = carName;
    dataStore.formCreateCarStore.colorCar = hexColor;

    cleanStateData();
    stateData.stateUpdateText = carName;
    stateData.stateUpdateColor = hexColor;
    stateData.stateSvgColor = hexColor;
    stateData.stateCreateDisabled = true;
  });

  startButton.addEventListener('click', async () => {
    trackBlock.classList.remove('race-block__track_adapt');
    svgCar.classList.remove('move');
    svgCar.classList.remove('pause');
    svgCar.style = '';

    currentPage.isRace = false;

    const carData = await startCarAnimation(trackBlock, svgCar, id, startButton);

    startAnimation(carData.track, carData.svg, carData.duration);

    checkDriveStatus(id, svgCar);

    startButton.disabled = true;
    backButton.disabled = false;

    startRaceButton.disabled = true;
  });

  backButton.addEventListener('click', async () => {
    const backLogic = () => {
      trackBlock.classList.remove('race-block__track_adapt');
      svgCar.classList.remove('move');
      svgCar.classList.remove('pause');
      svgCar.style = '';
      startButton.disabled = false;
      backButton.disabled = true;
    };

    backButton.classList.add('buttonAnimation');

    await fetchStopped(id, backLogic);

    backButton.classList.remove('buttonAnimation');
  });

  svgCar.addEventListener('animationend', async () => {
    const { winner, isRace } = currentPage;
    if (!currentPage.winner.id && isRace === true) {
      winner.id = id;
      winner.name = infoCarName.textContent;
      winner.time = Number.parseFloat(svgCar.style.animationDuration);

      const timeSec = Math.round(winner.time) / 1000;

      const dataWinner = {
        id,
        wins: 1,
        time: timeSec,
      };

      const textModal = `Winner ${winner.name} for ${timeSec} sec`;
      modalWinner(modalTitleElement, textModal);

      const dataWinnerServer = await fetchGetWinner(id);

      if (dataWinnerServer.length === 0) {
        fetchAddWinner(dataWinner);
      } else {
        const { wins, time } = dataWinnerServer[0];

        const dataUpdateWinner = {
          wins: Number(wins) + 1,
          time: Math.min(timeSec, Number(time)),
        };
        fetchUpdateWinner(id, dataUpdateWinner);
      }
    }

    const backLogic = () => {
      trackBlock.classList.remove('race-block__track_adapt');
      svgCar.classList.remove('move');
      svgCar.classList.remove('pause');
      svgCar.style = '';
      trackBlock.classList.add('race-block__track_adapt');
      if (isRace === false) {
        backButton.disabled = false;
      }
    };

    backLogic();
  });

  return listItem;
}

export function startAnimation(parent, child, duration) {
  const parentWidth = parent.clientWidth;
  const childWidth = child.clientWidth;
  const moveDistance = parentWidth - childWidth;

  // eslint-disable-next-line no-param-reassign
  child.style.animationDuration = `${duration}ms`;

  child.style.setProperty('--move-distance', `${moveDistance}px`);

  child.classList.add('move');
}

export async function checkDriveStatus(id, svg) {
  try {
    const statusDrive = await fetchDrive(id);
    if (!statusDrive) {
      svg.classList.add('pause');
    }
  } catch (error) {
    console.error('Ошибка при проверке статуса:', error);
  }
}

export async function startCarAnimation(track, svg, id, button) {
  try {
    button.classList.add('buttonAnimation');
    const duration = await fetchStarted(id);
    button.classList.remove('buttonAnimation');

    return {
      track,
      svg,
      duration,
      id,
    };
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    return null;
  }
}
