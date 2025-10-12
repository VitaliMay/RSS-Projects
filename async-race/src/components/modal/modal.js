import './modal.scss';
import { createEl, body } from '../../utils/elementUtils';

export const modalWinner = (innerLayotElement, textModal) => {
  // body.classList.add('lock');

  const modalContainer = createEl({ classes: ['modal-container'], parent: body });

  const removeModal = () => {
    modalContainer.classList.add('modal-del');

    modalContainer.addEventListener('animationend', () => {
      modalContainer.remove();
    });

    // body.classList.remove('lock');
  };

  const modal = createEl({
    tag: 'article',
    classes: ['modal'],
    parent: modalContainer,
  });

  const buttonCross = createEl({
    tag: 'button',
    classes: ['button-cross'],
    attributes: { type: 'button', 'aria-label': 'button-close' },
    parent: modal,
  });
  createEl({
    tag: 'span',
    classes: ['button-cross__item', 'button-cross__item--01'],
    parent: buttonCross,
  });
  createEl({
    tag: 'span',
    classes: ['button-cross__item', 'button-cross__item--02'],
    parent: buttonCross,
  });

  modal.append(innerLayotElement(textModal));

  const buttonClose = createEl({
    tag: 'button',
    classes: ['button', 'button_close'],
    attributes: { type: 'button', 'aria-label': 'button-close' },
    text: 'Close',
    parent: modal,
  });

  buttonClose.addEventListener('click', removeModal);
  buttonCross.addEventListener('click', removeModal);

  modalContainer.addEventListener('click', function (event) {
    const { target } = event;
    if (target === this || target === buttonCross || target === buttonClose) {
      removeModal();
      // body.classList.remove('lock');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      removeModal();
    }
  });
};

export function modalTitleElement(text) {
  return createEl({
    tag: 'h2',
    classes: ['modal__title'],
    text,
    parent: null,
  });
}
