import 'normalize.css';
import './global.scss';

// import { Router } from './router/router';
import { Router, routes } from './router/router';
import { setupWebSocketHandlers } from './api/api-handlers';

const routerItem = new Router(routes);
Router.navigate(window.location.hash.slice(1) || '/login');

setupWebSocketHandlers();
