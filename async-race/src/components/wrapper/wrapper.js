import './main.scss';

import { body, createEl } from '../../utils/elementUtils';
import svgSpriteElement from '../sprite/sprite';
import { createHeader } from '../header/header';

svgSpriteElement();

const createWrapper = () => createEl({ parent: body, classes: ['wrapper'] });
const wrapper = createWrapper();

const buttonsHeader = createHeader(wrapper);

const createMain = (parent) => createEl({ tag: 'main', classes: ['main'], parent });
const main = createMain(wrapper);

export { main, wrapper, buttonsHeader };
