import './main.scss';

import { body, createEl } from '../../utils/elementUtils';
import svgSpriteElement from '../../sources/svg-sprite';
import createHeader from '../header/header';
import createFooter from '../footer/footer';
import constrols from '../../store/constrols';
import createFormLogin from '../../pages/login-page/login-page';
// import createMainPageWrapper from '../../pages/main-page/main-page';
import { createMainPageWrapper, creatUserListItem } from '../../pages/main-page/main-page';

svgSpriteElement();

const createWrapper = () => createEl({ parent: body, classes: ['wrapper'] });
const wrapper = createWrapper();
constrols.wrapper = wrapper;

const header = createHeader(wrapper);
constrols.header = header;

const createMain = (parent) => createEl({ tag: 'main', classes: ['main'], parent });
const main = createMain(wrapper);
constrols.main = main;

createFormLogin(constrols.main);

createMainPageWrapper(constrols.main);

creatUserListItem(constrols.page.main.userList, 'user-01', 25);
creatUserListItem(constrols.page.main.userList, 'user-02', 34);

createFooter(wrapper);

export { main, wrapper };
