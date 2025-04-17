import './main.scss';

import { body, createEl } from '../../utils/elementUtils';
import svgSpriteElement from '../../sources/svg-sprite';
import createHeader from '../header/header';
import createFooter from '../footer/footer';
import constrols from '../../store/constrols';

svgSpriteElement();

const createWrapper = () => createEl({ parent: body, classes: ['wrapper'] });
const wrapper = createWrapper();

const header = createHeader(wrapper);
constrols.header = header;

const createMain = (parent) => createEl({ tag: 'main', classes: ['main'], parent });
const main = createMain(wrapper);
createFooter(wrapper);

export { main, wrapper };
