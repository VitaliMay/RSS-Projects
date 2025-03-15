import {
    main,
    createTitleH1,
    createForm,
    createInfoItem,
    createButton,
    createDurationItem,
    createStartButton,
} from './decision-picker/decision-picker';

import { CanvasWheel } from './decision-picker/wheel';

import { removeAllChild } from '../utils/elementUtils';

export const createWheelPage = (option) => {
    const titleH1 = createTitleH1();

    const form = createForm();

    const infoItem = createInfoItem();

    const backButton = createButton('Back', 'Back', form);
    const soundButton = createButton('Sound', 'Sound', form);

    const durationItem = createDurationItem(form);

    const startButton = createStartButton(form);

    const canvasWheel = new CanvasWheel(option, startButton, infoItem);

    canvasWheel.drawCanvas();

    startButton.addEventListener('click', () => {
        if (durationItem.value >= 6) {
            const durationRandom = durationItem.value * 1000 + Math.floor(Math.random() * 8) * 100; // для большего рандома меняю длительность анимации от 0 до 0,4с
            canvasWheel.animate(durationRandom);
        }
    });

    backButton.addEventListener('click', () => {
        removeAllChild(main);
    });

    return [titleH1, form, infoItem, backButton, soundButton, durationItem, startButton];
};
