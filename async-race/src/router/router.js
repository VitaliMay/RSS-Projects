import { removeAllChild, createEl, getRandomColor } from '../utils/elementUtils.ts';
import { createTitleH1, createChooseBlock, svgUseCar, createBlock } from '../pages/garage-page/garage';
import { main } from '../components/wrapper/wrapper';
import { createButton } from '../components/button/button';
import {
  createPaginationBlock,
  paginationButtonHolder,
  paginationButtonHolderWinner,
} from '../components/pagination/pagination';
import { list, createListItem, startCarAnimation, startAnimation, checkDriveStatus } from '../components/list/list';
import { counterID, getRandomCarName } from '../sources/car-options';

import { controlsBtnState, currentPage, winnersPage } from '../store/controls-store';
import {
  fetchAdd,
  fetchInitial,
  fetchPagination,
  fetchStopped,
  fetchGetTotalWinners,
  fetchGetTotalGarage,
} from '../api.js/api';

import { firstLoad, createCurrentListWinners } from '../pages/winners-page/winners';
import { stateData } from '../store/data-store';

export const routes = {
  '/garage': async () => {
    removeAllChild(main);
    const titleGarage = createTitleH1('Garage (total cars: )', main);
    controlsBtnState.titleGarage = titleGarage;

    createPaginationBlock(main, controlsBtnState);
    const blockCreateCar = createBlock(main);
    createChooseBlock('create', blockCreateCar, 'formCreat');
    controlsBtnState.formCreat.buttonSendCreateCar.disabled = false;

    blockCreateCar.append(svgUseCar);
    const btnCreat100Cars = createButton('create 100 random cars', blockCreateCar);
    controlsBtnState.creat100Cars = btnCreat100Cars;

    controlsBtnState.creat100Cars.addEventListener('click', async () => {
      const requests = [];

      const { numberCurrentPage } = currentPage;
      currentPage.totalCars += 100;

      for (let i = 0; i < 100; i += 1) {
        const carID = counterID.getCount();
        const colorCar = getRandomColor();
        const carName = getRandomCarName();

        requests.push(fetchAdd({ id: carID, color: colorCar, name: carName }));
      }

      try {
        await Promise.all(requests);
      } catch (error) {
        console.error('Global error:', error);
      }

      removeAllChild(list);
      fetchPagination(numberCurrentPage, createListItem);
    });

    const { buttonPrev, buttonNext } = controlsBtnState.pagination;

    buttonNext.addEventListener('click', () => {
      currentPage.numberCurrentPage += 1;
      removeAllChild(list);
      fetchPagination(currentPage.numberCurrentPage, createListItem);
    });

    buttonPrev.addEventListener('click', () => {
      currentPage.numberCurrentPage -= 1;
      removeAllChild(list);
      fetchPagination(currentPage.numberCurrentPage, createListItem);
    });

    const chooseCarName = createEl({ parent: blockCreateCar, classes: ['choose-car-name'], text: '' });
    controlsBtnState.chooseCarName = chooseCarName;

    createChooseBlock('update', blockCreateCar, 'formSelect');
    controlsBtnState.formSelect.buttonSendCreateCar.disabled = true;
    controlsBtnState.formSelect.inputText.disabled = true;
    controlsBtnState.formSelect.inputColor.disabled = true;

    controlsBtnState.formCreat.buttonSendCreateCar.addEventListener('click', () => {
      const { inputText, inputColor } = controlsBtnState.formCreat;

      const carID = counterID.getCount();
      const colorCar = inputColor.value || getRandomColor();
      const carName = inputText.value || getRandomCarName();

      const carOnPage = [...list.querySelectorAll('.list-item')].length;

      if (carOnPage < 7) {
        createListItem(carID, colorCar, carName);
      }

      currentPage.totalCars += 1;
      controlsBtnState.titleGarage.textContent = `Garage (total cars: ${currentPage.totalCars})`;

      paginationButtonHolder();

      fetchAdd({ id: carID, color: colorCar, name: carName });

      inputColor.value = '#000000';
      inputText.value = '';
      svgUseCar.style.color = inputColor.value;

      stateData.stateSvgColor = '#000000';
      stateData.stateCreateColor = '#000000';
      stateData.stateUpdateDisabled = true;
      stateData.stateCreateDisabled = false;
      stateData.stateCreateText = '';
    });

    const resetRaceButton = createButton('reset race', main);
    const startRaceButton = createButton('start race', main);
    controlsBtnState.startRaceButton = startRaceButton;
    controlsBtnState.resetRaceButton = resetRaceButton;

    startRaceButton.addEventListener('click', async () => {
      const { winner } = currentPage;
      winner.id = null;
      winner.name = null;
      winner.time = null;

      currentPage.isRace = true;

      const blockArr = [...list.querySelectorAll('.list-item')];
      const trackArr = [...list.querySelectorAll('.race-block__track')];
      const svgArr = [...list.querySelectorAll('.car-race')];

      const startButtonArr = [...list.querySelectorAll('.button_start')];

      const buttonsAll = [...document.querySelectorAll('.button')];

      buttonsAll.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.disabled = true;
      });

      const { formCreat } = controlsBtnState;
      formCreat.inputText.disabled = true;
      formCreat.inputColor.disabled = true;

      resetRaceButton.disabled = false;

      const carsData = await Promise.all(
        blockArr.map((item, index) => startCarAnimation(trackArr[index], svgArr[index], item.id, startButtonArr[index])),
      );

      carsData.forEach((car) => {
        if (car) {
          startAnimation(car.track, car.svg, car.duration);
          checkDriveStatus(car.id, car.svg);
        }
      });
    });

    resetRaceButton.addEventListener('click', async () => {
      const buttonsAll = [...document.querySelectorAll('.button')];

      buttonsAll.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.disabled = false;
      });
      paginationButtonHolder();

      controlsBtnState.buttonGarage.disabled = true;
      controlsBtnState.formSelect.buttonSendCreateCar.disabled = true;

      const { formCreat } = controlsBtnState;
      formCreat.inputText.disabled = false;
      formCreat.inputColor.disabled = false;

      const blockArr = [...list.querySelectorAll('.list-item')];
      const trackArr = [...list.querySelectorAll('.race-block__track')];
      const svgArr = [...list.querySelectorAll('.car-race')];
      const backButtonArr = [...list.querySelectorAll('.button_back')];

      backButtonArr.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.disabled = true;
        item.classList.add('buttonAnimation');
      });

      const backLogic = (index) => {
        trackArr[index].classList.remove('race-block__track_adapt');
        svgArr[index].classList.remove('pause');
        svgArr[index].classList.remove('move');
        svgArr[index].style = '';
      };

      await Promise.all(blockArr.map((item, index) => fetchStopped(item.id, () => backLogic(index))));

      backButtonArr.forEach((item) => {
        item.classList.remove('buttonAnimation');
      });
    });

    main.append(list);
    removeAllChild(list);

    if (currentPage.isFirstLoad) {
      await fetchInitial(createListItem);
      currentPage.isFirstLoad = false;
    } else {
      await fetchPagination(currentPage.numberCurrentPage, createListItem);
    }

    // console.log(stateData.stateCreateColor);
    // console.log(stateData.stateUpdateColor);

    const { selectID, svgModel } = controlsBtnState;
    if (selectID) {
      const block = document.getElementById(`${selectID}`);
      const option = block.querySelector('.option');
      const buttonArr = option.querySelectorAll('.button');
      buttonArr.forEach((item) => (item.disabled = true));
    }
    const { inputText, inputColor, buttonSendCreateCar: buttonSendSelect } = controlsBtnState.formSelect;
    const {
      inputText: inputTextCreate,
      inputColor: inputColorCreate,
      buttonSendCreateCar: buttonSendCreate,
    } = controlsBtnState.formCreat;

    inputTextCreate.value = stateData.stateCreateText;
    inputColorCreate.value = stateData.stateCreateColor;
    svgModel.style.color = stateData.stateSvgColor;

    inputColor.value = stateData.stateUpdateColor;
    inputText.value = stateData.stateUpdateText;

    inputText.disabled = stateData.stateUpdateDisabled;
    inputColor.disabled = stateData.stateUpdateDisabled;
    buttonSendSelect.disabled = stateData.stateUpdateDisabled;

    inputTextCreate.disabled = stateData.stateCreateDisabled;
    inputColorCreate.disabled = stateData.stateCreateDisabled;
    buttonSendCreate.disabled = stateData.stateCreateDisabled;

    chooseCarName.textContent = stateData.stateUpdateText;
  },

  '/winners': async () => {
    removeAllChild(main);

    currentPage.dataTotalGarage = await fetchGetTotalGarage();
    await fetchGetTotalWinners();

    const titleWinners = createTitleH1(`Winners (total: ${winnersPage.totalWinners})`, main);
    winnersPage.title = titleWinners;

    createPaginationBlock(main, winnersPage);
    paginationButtonHolderWinner();

    if (winnersPage.isFirstLoad) {
      await firstLoad();
      winnersPage.isFirstLoad = false;
    }

    main.append(winnersPage.table.wrapper);

    await createCurrentListWinners();

    const { buttonPrev, buttonNext } = winnersPage.pagination;

    buttonNext.addEventListener('click', async () => {
      winnersPage.numberCurrentPage += 1;
      paginationButtonHolderWinner();

      await createCurrentListWinners();
    });

    buttonPrev.addEventListener('click', async () => {
      winnersPage.numberCurrentPage -= 1;
      paginationButtonHolderWinner();

      await createCurrentListWinners();
    });

    // console.log(stateData.stateCreateColor);
    // console.log(stateData.stateUpdateColor);
  },

  '*': () => {
    removeAllChild(main);
    createTitleH1('Error. Go to Garage or to Winners ', main);
  },
};

export class Router {
  constructor(path) {
    this.routes = path;
    this.lastHash = '';

    window.addEventListener('hashchange', this.routeManager.bind(this));
    this.routeManager();
  }

  static navigate(hash) {
    window.location.hash = hash;
  }

  routeManager() {
    const hash = window.location.hash.slice(1) || '/garage';

    if (this.lastHash === hash) {
      return;
    }

    if (hash === '/async-race' || hash === '/') {
      Router.navigate('/garage');
      return;
    }

    this.lastHash = hash;

    const route = this.routes[hash] || this.routes['*'];

    if (typeof route === 'function') {
      route();
    } else {
      console.error(`Route not found for path: ${hash}`);
    }
  }
}
