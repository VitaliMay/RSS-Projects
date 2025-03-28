import createTitleH1 from '../pages/garage-page/garage';
import { main } from '../components/wrapper/wrapper';

// const [buttonGarage, buttonWinners] = buttonsHeader;

export const routes = {
  '/garage': () => {
    createTitleH1('Garage', main);
    // buttonGarage.disabled = true;
  },
  '/winners': () => createTitleH1('Winners', main),
  '*': () => createTitleH1('Error. Go to Garage or to Winners ', main),
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
