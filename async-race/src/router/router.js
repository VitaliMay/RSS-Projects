import { removeAllChild, createEl, getRandomColor } from '../utils/elementUtils';
import { createTitleH1, createChooseBlock, svgUseCar, createBlock } from '../pages/garage-page/garage';
import { main } from '../components/wrapper/wrapper';
import { createButton } from '../components/button/button';
import createPaginationBlock from '../components/pagination/pagination';
import { list, createListItem, startCarAnimation } from '../components/list/list';
import { counterID, getRandomCarName } from '../sources/car-options';

import { controlsBtnState, currentPage } from '../store/controls-store';
import { fetchAdd, fetchInitial, fetchPagination, fetchStopped } from '../api.js/api';

// const [buttonGarage, buttonWinners] = buttonsHeader;

export const routes = {
  '/garage': () => {
    removeAllChild(main);
    const titleGarage = createTitleH1('Garage (total cars: )', main);
    controlsBtnState.titleGarage = titleGarage;
    // console.log(controlsBtnState.titleGarage);

    createPaginationBlock(main);
    const blockCreateCar = createBlock(main);
    createChooseBlock('create', blockCreateCar, 'formCreat');
    // createChooseBlock('create', blockCreateCar);
    controlsBtnState.formCreat.buttonSendCreateCar.disabled = false;

    blockCreateCar.append(svgUseCar);
    const btnCreat100Cars = createButton('create 100 random cars', blockCreateCar);
    controlsBtnState.creat100Cars = btnCreat100Cars;

    controlsBtnState.creat100Cars.addEventListener('click', async () => {
      const requests = [];
      // const { pagination } = controlsBtnState;
      // const titlePagination = pagination.title;
      // const { buttonNext } = pagination;

      const { numberCurrentPage } = currentPage;
      currentPage.totalCars += 100;

      for (let i = 0; i < 100; i += 1) {
        const carID = counterID.getCount();
        const colorCar = getRandomColor();
        const carName = getRandomCarName();
        // createListItem(carID, colorCar, carName);

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

    const chooseCarName = createEl({ parent: blockCreateCar, classes: ['choose-car-name'], text: '' });
    controlsBtnState.chooseCarName = chooseCarName;

    createChooseBlock('update', blockCreateCar, 'formSelect');
    controlsBtnState.formSelect.buttonSendCreateCar.disabled = true;
    controlsBtnState.formSelect.inputText.disabled = true;
    controlsBtnState.formSelect.inputColor.disabled = true;

    controlsBtnState.formCreat.buttonSendCreateCar.addEventListener('click', () => {
      const carID = counterID.getCount();
      const colorCar = getRandomColor();
      const carName = getRandomCarName();

      const carOnPage = [...list.querySelectorAll('.list-item')].length;

      if (carOnPage < 7) {
        createListItem(carID, colorCar, carName);
      }

      currentPage.totalCars += 1;
      // const titleGarage = createTitleH1('Garage (total cars: )', main);
      controlsBtnState.titleGarage.textContent = `Garage (total cars: ${currentPage.totalCars})`;

      const maxPage = Math.ceil(currentPage.totalCars / 7);

      const { pagination } = controlsBtnState;
      const { numberCurrentPage } = currentPage;

      pagination.title.textContent = `Page: ${numberCurrentPage} / ${maxPage}`;

      // createListItem(counterID.getCount(), getRandomColor(), getRandomCarName());
      fetchAdd({ id: carID, color: colorCar, name: carName });
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

      const buttonsAll = [...document.querySelectorAll('.button')];

      buttonsAll.forEach((item) => {
        item.disabled = true;
      });

      const { formCreat } = controlsBtnState;
      formCreat.inputText.disabled = true;
      formCreat.inputColor.disabled = true;

      resetRaceButton.disabled = false;
      controlsBtnState.buttonWinners.disabled = false;

      // blockArr.forEach((item, index) => {
      //   startCarAnimation(trackArr[index], svgArr[index], item.id);
      // });

      await Promise.all(
        blockArr.map((item, index) => startCarAnimation(trackArr[index], svgArr[index], item.id))
        // if (!item.id) throw new Error(`Элемент с индексом ${index} не имеет ID`);
      );
    });

    resetRaceButton.addEventListener('click', async () => {
      // startRaceButton.disabled = false;

      const buttonsAll = [...document.querySelectorAll('.button')];

      buttonsAll.forEach((item) => {
        item.disabled = false;
      });

      controlsBtnState.buttonGarage.disabled = true;
      controlsBtnState.formSelect.buttonSendCreateCar.disabled = true;

      const { formCreat } = controlsBtnState;
      formCreat.inputText.disabled = false;
      formCreat.inputColor.disabled = false;

      const blockArr = [...list.querySelectorAll('.list-item')];
      const trackArr = [...list.querySelectorAll('.race-block__track')];
      const svgArr = [...list.querySelectorAll('.car-race')];
      const backButtonArr = [...list.querySelectorAll('.button_back')];

      const backLogic = (index) => {
        trackArr[index].classList.remove('race-block__track_adapt');
        svgArr[index].classList.remove('move');
        svgArr[index].classList.remove('pause');
        svgArr[index].style = '';
        backButtonArr[index].disabled = true;
      };

      await Promise.all(
        blockArr.map((item, index) => fetchStopped(item.id, () => backLogic(index)))
        // if (!item.id) throw new Error(`Индекс ${index} не имеет ID`);
      );

      // blockArr.forEach((item) => {
      //   const { id } = item;
      // });
    });
    // startRaceButton.addEventListener('click', fetchTotal);
    // startRaceButton.addEventListener('click', () => {
    //   console.log('Привет');
    //   fetchTotal();
    // });
    // const data = fetchTotal();
    // console.log(data);

    // // startRaceButton.addEventListener('click', async () => {
    //   const data = await fetchTotal();
    //   console.log(data);
    // // });

    // mainFunc(fetchTotal, console.log);
    // mainFunc(fetchTotal, createListItem);

    fetchInitial(createListItem);

    // fetchTotal().then(data => {
    //   console.log(data);
    // }).catch(error => {
    //   console.error('Error fetching data:', error);
    // });

    main.append(list);
    removeAllChild(list);

    // createListItem(counterID.getCount(), getRandomColor(), getRandomCarName());

    // createListItem(counterID.getCount(), getRandomColor(), getRandomCarName());
    // createListItem(counterID.getCount(), getRandomColor(), getRandomCarName());

    // createListItem(counterID.getCount(), getRandomColor(), getRandomCarName(), svgUseCar);
    // createListItem(counterID.getCount(), getRandomColor(), getRandomCarName(), svgUseCar);

    // if (controlsBtnState.formSelect.buttonSendCreateCar) {
    //   controlsBtnState.formSelect.buttonSendCreateCar.addEventListener('click', () => {
    //     controlsBtnState.formSelect.buttonSendCreateCar.disabled = true;
    //     controlsBtnState.infoCarNameSelectCar.textContent =
    // controlsBtnState.formSelect.inputText.value;
    //     controlsBtnState.btnSelectListItem.disabled = false;
    //     controlsBtnState.selectTrack.style.color = controlsBtnState.formSelect.inputColor.value;
    //     // controlsBtnState.svgSelectCar.style.color = inputColor.value;
    //   });
    // }
  },
  //   createListItem(
  //     counterID.getCount(),
  //     getRandomColor(),
  //     getRandomCarName(),
  //     inputText,
  //     inputColor,
  //     buttonSendCreateCar,
  //     svgUseCar
  //   );
  //   createListItem(
  //     counterID.getCount(),
  //     getRandomColor(),
  //     getRandomCarName(),
  //     inputText,
  //     inputColor,
  //     buttonSendCreateCar,
  //     svgUseCar
  //   );
  // },
  '/winners': () => {
    removeAllChild(main);
    createTitleH1('Winners', main);
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

// const routerItem = new Router(routes);
