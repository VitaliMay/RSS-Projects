import { createEl } from '../../utils/elementUtils';
import { createButton } from '../button/button';
import { controlsBtnState } from '../../store/controls-store';

export function createHeader(parent) {
  const header = createEl({ tag: 'header', classes: ['header'], parent });
  const buttonGarage = createButton('to garage', header, ['button_nav']);
  const buttonWinners = createButton('to Winners', header, ['button_nav']);

  controlsBtnState.buttonGarage = buttonGarage;
  controlsBtnState.buttonWinners = buttonWinners;

  const path = window.location.hash.slice(1) || '/garage';

  if (path === '/garage') {
    buttonGarage.disabled = true;
  }

  buttonGarage.addEventListener('click', () => {
    window.location.hash = '/garage';
    buttonGarage.disabled = true;
    buttonWinners.disabled = false;
  });
  buttonWinners.addEventListener('click', async () => {
    window.location.hash = '/winners';
    buttonWinners.disabled = true;
    buttonGarage.disabled = false;
  });

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1) || '/garage';
    // console.log(hash);
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
