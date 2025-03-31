import { removeAllChild, createEl, getRandomColor } from '../utils/elementUtils';
import { createTitleH1, createChooseBlock, svgUseCar, createBlock } from '../pages/garage-page/garage';
import { main } from '../components/wrapper/wrapper';
import { createButton } from '../components/button/button';
import createPaginationBlock from '../components/pagination/pagination';
import { list, createListItem } from '../components/list/list';
import { counterID, getRandomCarName } from '../sources/car-options';

import { controlsBtnState } from '../store/controls-store';

// const [buttonGarage, buttonWinners] = buttonsHeader;

export const routes = {
  '/garage': () => {
    removeAllChild(main);
    createTitleH1('Garage (total cars: 236)', main);
    createPaginationBlock(main);
    const blockCreateCar = createBlock(main);
    createChooseBlock('create', blockCreateCar, 'formCreat');
    // createChooseBlock('create', blockCreateCar);
    controlsBtnState.formCreat.buttonSendCreateCar.disabled = false;

    blockCreateCar.append(svgUseCar);
    const btnCreat100Cars = createButton('create 100 random cars', blockCreateCar);
    controlsBtnState.creat100Cars = btnCreat100Cars;

    controlsBtnState.creat100Cars.addEventListener('click', () => {
      for (let i = 0; i < 100; i += 1) {
        createListItem(counterID.getCount(), getRandomColor(), getRandomCarName());
      }
    });

    const chooseCarName = createEl({ parent: blockCreateCar, classes: ['choose-car-name'], text: '' });
    controlsBtnState.chooseCarName = chooseCarName;

    createChooseBlock('update', blockCreateCar, 'formSelect');
    controlsBtnState.formSelect.buttonSendCreateCar.disabled = true;
    controlsBtnState.formSelect.inputText.disabled = true;
    controlsBtnState.formSelect.inputColor.disabled = true;

    controlsBtnState.formCreat.buttonSendCreateCar.addEventListener('click', () => {
      createListItem(counterID.getCount(), getRandomColor(), getRandomCarName());
    });

    // const [inputText, inputColor, buttonSendCreateCar] = createChooseBlock('update', blockCreateCar);
    createButton('reset race', main);
    createButton('start race', main);

    main.append(list);
    removeAllChild(list);
    createListItem(counterID.getCount(), getRandomColor(), getRandomCarName());
    // createListItem(counterID.getCount(), getRandomColor(), getRandomCarName());
    // createListItem(counterID.getCount(), getRandomColor(), getRandomCarName());

    // createListItem(counterID.getCount(), getRandomColor(), getRandomCarName(), svgUseCar);
    // createListItem(counterID.getCount(), getRandomColor(), getRandomCarName(), svgUseCar);

    // if (controlsBtnState.formSelect.buttonSendCreateCar) {
    //   controlsBtnState.formSelect.buttonSendCreateCar.addEventListener('click', () => {
    //     controlsBtnState.formSelect.buttonSendCreateCar.disabled = true;
    //     controlsBtnState.infoCarNameSelectCar.textContent = controlsBtnState.formSelect.inputText.value;
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
