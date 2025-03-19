import './modal.scss';
import { createEl, body } from '../../utils/elementUtils';

export const modal = () => {
    body.classList.add('lock');

    const modalContainer = createEl({ classes: ['modal-container'] });
    // const modalContainer = createEl({ classes: ['modal-container', 'modal-container--active'] });
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

    createEl({
        tag: 'h2',
        classes: ['modal-title'],
        text: 'There must be at least two valid options. An option is considered valid if its title is not empty and its weight is greater than 0',
        parent: modal,
    });

    const buttonClose = createEl({
        tag: 'button',
        classes: ['button', 'button_close'],
        attributes: { type: 'button', 'aria-label': 'button-close' },
        text: 'Close',
        parent: modal,
    });

    const removeModal = () => {
        modalContainer.classList.add('modal-del');

        modalContainer.addEventListener('animationend', () => {
            modalContainer.remove();
        });

        body.classList.remove('lock');
    };

    buttonClose.addEventListener('click', removeModal);
    buttonCross.addEventListener('click', removeModal);

    modalContainer.addEventListener('click', function (event) {
        const { target } = event;
        if (target === this || target === buttonCross || target === buttonClose) {
            // Клик произошел именно на родительском элементе или крестике
            // this.classList.remove('modal-container--active');
            removeModal();
            // body.classList.remove('lock');
        }
    });
};
