import { createEl } from '../../utils/elementUtils';
import { createButton } from '../button/button';
import { controlsBtnState, currentPage, winnersPage } from '../../store/controls-store';
import { fetchGetTotalWinners } from '../../api.js/api';
// import { Router } from '../../router/router';

// import createTitleH1 from '../../pages/garage-page/garage';
// import { main } from '../wrapper/wrapper';

// export const routes = {
//   '/garage': () => {
//     createTitleH1('Garage', main);
//     // buttonGarage.disabled = true;
//   },
//   '/winners': () => createTitleH1('Winners', main),
//   '*': () => createTitleH1('Error. Go to Garage or to Winners ', main),
// };

// import wrapper from '../wrapper/wrapper';

// export const createWrapper = () => createEl({ parent: body, classes: ['wrapper'] });

// export const createHeader = (parent) => createEl({ tag: 'header', classes: ['header'], parent });

// export function createButton(text, parent, addClasses = []) {
//   return createEl({
//     tag: 'button',
//     parent,
//     text,
//     classes: ['button', ...addClasses],
//     attributes: { type: 'button' },
//   });
// }

export function createHeader(parent) {
  const header = createEl({ tag: 'header', classes: ['header'], parent });
  const buttonGarage = createButton('to garage', header, ['button_nav']);
  const buttonWinners = createButton('to Winners', header, ['button_nav']);

  controlsBtnState.buttonGarage = buttonGarage;
  controlsBtnState.buttonWinners = buttonWinners;

  // const routerModel = new Router(routes);

  // console.log(window.location.hash || '/garage');
  const path = window.location.hash.slice(1) || '/garage';

  if (path === '/garage') {
    buttonGarage.disabled = true;
  }

  buttonGarage.addEventListener('click', () => {
    // Router.navigate('/garage');
    window.location.hash = '/garage';
    buttonGarage.disabled = true;
    buttonWinners.disabled = false;

    // await fetchGetTotalWinners();
  });
  buttonWinners.addEventListener('click', async () => {
    // await fetchGetTotalWinners();
    // Router.navigate('/winners');
    window.location.hash = '/winners';
    buttonWinners.disabled = true;
    buttonGarage.disabled = false;
  });

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1) || '/garage';
    console.log(hash);
    // if (hash !== '/garage' && hash !== '/winners' && hash !== '/') {
    //   buttonWinners.disabled = false;
    //   buttonGarage.disabled = false;
    // }
    if (hash === '/garage' || hash === '/') {
      buttonGarage.disabled = true;
      buttonWinners.disabled = false;
    } else if (hash === '/winners') {
      buttonGarage.disabled = false;
      buttonWinners.disabled = true;
    } else {
      buttonGarage.disabled = false;
      buttonWinners.disabled = false;
    }
  });
}

// export const createButton = (title, text, parent, addClasses = []) =>
//   createEl({
//   tag: 'button',
//   classes: ['button', ...addClasses],
//   // classes: ['button', 'button_small'],
//   attributes: {
//     title,
//     type: 'button',
//   },
//   text,
//   parent,
// });
