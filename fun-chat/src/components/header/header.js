import './header.scss';

import { createEl } from '../../utils/elementUtils';
import createButton from '../button/button';
import { createTitleH1 } from '../tags/tags';
import constrols from '../../store/constrols';

function createHeader(parent) {
  const header = createEl({ tag: 'header', classes: ['header'], parent });

  const titleTask = createTitleH1('Bla-Bla Chat', header);
  constrols.titleTask = titleTask;

  const userLogin = createEl({
    tag: 'span',
    text: '4444',
    classes: ['title-login'],
    parent: header,
  });
  constrols.userLogin = userLogin;

  const buttonBlock = createEl({ classes: ['button-block'], parent: header });
  const buttonAbout = createButton('About', buttonBlock, ['button_nav']);
  const buttonLogout = createButton('Logout', buttonBlock, ['button_nav']);

  const path = window.location.hash.slice(1) || '/login';

  if (path === '/') {
    buttonAbout.disabled = true;
  }

  buttonAbout.addEventListener('click', () => {
    window.location.hash = '/about';
    buttonAbout.disabled = true;
    buttonLogout.disabled = false;
  });
  buttonLogout.addEventListener('click', async () => {
    window.location.hash = '/login';
    buttonLogout.disabled = true;
    buttonAbout.disabled = false;
  });

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1) || '/login';
    // console.log(hash);
    if (hash === '/about' || hash === '/') {
      buttonAbout.disabled = true;
      buttonLogout.disabled = false;
    } else if (hash === '/login') {
      buttonAbout.disabled = false;
      buttonLogout.disabled = true;
    } else {
      buttonAbout.disabled = false;
      buttonLogout.disabled = false;
    }
  });
}

export default createHeader;
