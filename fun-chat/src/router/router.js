import { removeAllChild } from '../utils/elementUtils';

import { createTitleH1 } from '../components/tags/tags';
import { main } from '../components/wrapper/wrapper';

export const routes = {
  '/login': () => {
    removeAllChild(main);
    createTitleH1('Login )', main);
  },

  '/about': () => {
    removeAllChild(main);
    createTitleH1('About )', main);
  },

  '/main': () => {
    removeAllChild(main);
    createTitleH1('Main )', main);
  },

  '*': () => {
    removeAllChild(main);
    createTitleH1('Error. Go to Login or to About or to Main', main);
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
    const hash = window.location.hash.slice(1) || '/login';

    if (this.lastHash === hash) {
      return;
    }

    if (hash === '/fun-chat' || hash === '/') {
      Router.navigate('/login');
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
