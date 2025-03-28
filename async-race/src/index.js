import 'normalize.css';
import './global.scss';

import { createEl, createSvgUse } from './utils/elementUtils';
// import svgSpriteElement from './components/sprite/sprite';

// import { createWrapper } from './components/header/header';
import { wrapper } from './components/wrapper/wrapper';

// import { createHeader } from './components/header/header';

// import svgSprite from './sources/svg-sprite';

import { Router, routes } from './router/router';
// import { Router, routes } from './router/router';

// body.append(svgElement);

// svgSpriteElement();
// const wrapper = createWrapper();

// createOptionPage(data.list);

// const parser = new DOMParser();
// const svgDoc = parser.parseFromString(svgSprite, 'image/svg+xml');

// // Извлекаем и передаем только содержимое SVG
// const svgElement = svgDoc.documentElement;
// body.append(svgElement);

const svgUseCarRace = createSvgUse('#car', 'car-race');
wrapper.append(svgUseCarRace);

const svgUseFlag = createSvgUse('#flag', 'flag-style');
wrapper.append(svgUseFlag);

const svgUseCar = createSvgUse('#car', 'car-color');
wrapper.append(svgUseCar);
// svgUseCar.style.color = 'red';

const inputColor = createEl({
  tag: 'input',
  attributes: { type: 'color' },
  classes: ['input-color'],
  parent: wrapper,
});
svgUseCar.style.color = inputColor.value;
inputColor.addEventListener('input', () => {
  svgUseCar.style.color = inputColor.value;
});

svgUseCar.style.color = inputColor.value;

const inputText = createEl({
  tag: 'input',
  attributes: { type: 'text', placeholder: 'Car name' },
  classes: ['input-text'],
  parent: wrapper,
});

// Router(routes);
const routerItem = new Router(routes);
// routerItem.start();
Router.navigate(window.location.hash.slice(1) || '/garage');
