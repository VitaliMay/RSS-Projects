import { removeAllChild, createEl } from '../utils/elementUtils';
import { createTitleH1, createChooseBlock, svgUseCar, createBlock } from '../pages/garage-page/garage';
import { main } from '../components/wrapper/wrapper';
import { createButton } from '../components/button/button';
import createPaginationBlock from '../components/pagination/pagination';
import { list } from '../components/list/list';

// const [buttonGarage, buttonWinners] = buttonsHeader;

export const routes = {
  '/garage': () => {
    removeAllChild(main);
    createTitleH1('Garage (total cars: 236)', main);
    createPaginationBlock(main);
    const blockCreateCar = createBlock(main);
    createChooseBlock('create', blockCreateCar);
    blockCreateCar.append(svgUseCar);
    createButton('create 100 random cars', blockCreateCar);
    createEl({ parent: blockCreateCar, classes: ['choose-car-name'], text: 'honda premium v8' });
    createChooseBlock('update', blockCreateCar);
    // createButton('create 100 cars', main);
    createButton('reset race', main);
    createButton('start race', main);

    main.append(list);
  },
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
