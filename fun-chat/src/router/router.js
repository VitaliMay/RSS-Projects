import { removeAllChild } from '../utils/elementUtils';

import { createTitleH1 } from '../components/tags/tags';
import { main } from '../components/wrapper/wrapper';
import constrols from '../store/constrols';
import storeLogin from '../store/store';

export const routes = {
  '/login': () => {
    removeAllChild(main);
    createTitleH1('Login )', main);
    main.append(constrols.page.login.formLogin);
  },

  '/about': () => {
    removeAllChild(main);
    createTitleH1('About )', main);
  },

  '/main': () => {
    removeAllChild(main);
    createTitleH1('Main )', main);
    main.append(constrols.page.main.wrapper);
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

    this.authStore = storeLogin;

    // Маршруты, доступные без авторизации
    this.publicRoutes = ['/login', '/about'];

    window.addEventListener('hashchange', this.routeManager.bind(this));
    this.routeManager();
  }

  static navigate(hash) {
    window.location.hash = hash;
  }

  isLogined() {
    const { login, password } = this.authStore.data.dataUser;
    return !!login && !!password;
  }

  isPublicRoute(hash) {
    return this.publicRoutes.includes(hash);
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

    // Защита маршрута /login для авторизованных
    if (hash === '/login' && this.isLogined()) {
      Router.navigate('/main');
      return;
    }

    // Защита авторизованных маршрутов (кроме публичных)
    if (!this.isPublicRoute(hash) && !this.isLogined()) {
      Router.navigate('/login');
      return;
    }

    // Защита авторизованных маршрутов
    // if (hash !== '/login' && !this.isLogined()) {
    //   Router.navigate('/login');
    //   return;
    // }

    this.lastHash = hash;

    const route = this.routes[hash] || this.routes['*'];

    if (typeof route === 'function') {
      route();
    } else {
      console.error(`Route not found for path: ${hash}`);
    }
  }
}

// export const routerItem = new Router(routes);
