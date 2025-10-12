import 'normalize.css';
import './global.scss';

import { Router, routes } from './router/router';

const routerItem = new Router(routes);
Router.navigate(window.location.hash.slice(1) || '/garage');
