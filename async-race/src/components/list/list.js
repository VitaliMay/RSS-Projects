import { createEl, createSvgUse, removeAllChild, rgbToHex } from '../../utils/elementUtils';
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
    // console.log('id=', id);
    // eslint-disable-next-line no-param-reassign
    btnSend.disabled = false;
    inpColor.disabled = false;
    inpText.disabled = false;

    btnSendCreat.disabled = true;
    inpColorCreat.disabled = true;
    inpTextCreat.disabled = true;

    inpColorCreat.value = '#000000';
    inpTextCreat.value = '';

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

    const carName = infoCarName.textContent;
    controlsBtnState.chooseCarName.textContent = carName;
    inpText.value = carName;

    // controlsBtnState.chooseCarName.textContent = infoCarName.textContent;
    // inpText.value = infoCarName.textContent;

    // inpColor.value = colorCar;
    // inpColor.value = trackBlock.style.color;
    // eslint-disable-next-line no-param-reassign
    // trackBlock.style.color = inpColor.value;
    // controlsBtnState.svgModel.style.color = inpColor.value;

    const hexColor = rgbToHex(trackBlock.style.color);
    controlsBtnState.svgModel.style.color = hexColor;
    // controlsBtnState.svgModel.style.color = trackBlock.style.color;
    // console.log(hexColor);
    // console.log(trackBlock.style.color);
    controlsBtnState.formSelect.inputColor.value = hexColor;
    // controlsBtnState.formSelect.inputColor.value = trackBlock.style.color;
    // controlsBtnState.formSelect.inputColor.value = '#000000';

    // controlsBtnState.formSelect.inputColor.value = controlsBtnState.svgModel.style.color;
    // console.log(controlsBtnState.svgModel.style.color);
    // svgModel.style.color = inpColor.value;

    controlsBtnState.infoCarNameSelectCar = infoCarName;

    // const { selectID } = controlsBtnState;
    // const { colorCar, textCar } = dataStore.formCreateCarStore;
    // const data = {
    //   name: textCar,
    //   color: colorCar,
    // };

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

    // startButton.classList.add('buttonAnimation');
    const carData = await startCarAnimation(trackBlock, svgCar, id, startButton);
    // startButton.classList.remove('buttonAnimation');

    startAnimation(carData.track, carData.svg, carData.duration);

    checkDriveStatus(id, svgCar);

    // startAnimation(trackBlock, svgCar, fetchStarted(id));
    // startAnimation(trackBlock, svgCar, 2000);

    // startButton.classList.remove('buttonAnimation');

    startButton.disabled = true;
    backButton.disabled = false;

    startRaceButton.disabled = true;
  });

  backButton.addEventListener('click', async () => {
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
    backButton.classList.add('buttonAnimation');

    await fetchStopped(id, backLogic);

    backButton.classList.remove('buttonAnimation');
  });

  svgCar.addEventListener('animationend', async () => {
    const { winner, isRace } = currentPage;
    // console.log(winner.id, winner.name);
    if (!currentPage.winner.id && isRace === true) {
      winner.id = id;
      winner.name = infoCarName.textContent;
      winner.time = Number.parseFloat(svgCar.style.animationDuration);

      console.log('Привет победитель');
      console.log(winner.name, winner.id, winner.time);
      const timeSec = Math.round(winner.time) / 1000;

      const dataWinner = {
        id,
        wins: 1,
        time: timeSec,
        // time: winner.time,
      };

      const textModal = `Winner ${winner.name} for ${timeSec} sec`;
      modalWinner(modalTitleElement, textModal);

      const dataWinnerServer = await fetchGetWinner(id);
      console.log('dataWinnerServer', dataWinnerServer, dataWinnerServer.length);

      if (dataWinnerServer.length === 0) {
        // console.log('надо делать fetchAddWinner');
        fetchAddWinner(dataWinner);
      } else {
        console.log('надо делать fetchUpdateWinner');

        const { wins, time } = dataWinnerServer[0];

        console.log('wins=', wins);
        console.log('time=', time);
        // wins: number,
        // time: number

        // const test = {
        //   wins: 10,
        //   time: 2,
        // };

        const dataUpdateWinner = {
          wins: Number(wins) + 1,
          // time: 35,
          time: Math.min(timeSec, Number(time)),
        };
        // dataWinnerServer.wins += 1;
        // dataWinnerServer.time = ;
        // fetchUpdateWinner(id, test);
        fetchUpdateWinner(id, dataUpdateWinner);
      }
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

    backLogic();

    // fetchStopped(id, backLogic);
  });

  return listItem;
}

// Функция для запуска анимации
export function startAnimation(parent, child, duration) {
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

export async function checkDriveStatus(id, svg) {
  try {
    const statusDrive = await fetchDrive(id);
    if (!statusDrive) {
      svg.classList.add('pause');
      // track.textContent = 'Авария на трассе';
    }
  } catch (error) {
    console.error('Ошибка при проверке статуса:', error);
  }
}

// export async function startCarAnimation(track, svg, id, button) {
//   // export async function startCarAnimation(track, svg, id) {
//   try {
//     button.classList.add('buttonAnimation');
//     const duration = await fetchStarted(id); // Ждем, пока получим длительность
//     button.classList.remove('buttonAnimation');
//     startAnimation(track, svg, duration); // Запускаем анимацию

//     const statusDrive = await fetchDrive(id);
//     console.log(statusDrive);
//     if (!statusDrive) {
//       svg.classList.add('pause');
//     }
//   } catch (error) {
//     console.error('Ошибка при запуске анимации:', error);
//   }
// }

export async function startCarAnimation(track, svg, id, button) {
  try {
    button.classList.add('buttonAnimation');
    const duration = await fetchStarted(id); // время для каждой машинки
    button.classList.remove('buttonAnimation');

    // Данные для синхронного старта
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
