// import '../../../mixins.scss';
import './main.scss';

import { createEl } from '../../utils/elementUtils';

export const createMain = () => {
    return createEl({
        tag: 'main',
        classes: ['main'],
    });
};

const main = createMain();

export const createStartButton = () => {
    return createEl({
        tag: 'button',
        classes: ['button'],
        attributes: {
            title: 'Pick',
            type: 'button',
        },
        text: 'Start Button',
        parent: main,
    });
};

export const startButton = createStartButton();

export const createCanvas = () => {
    return createEl({
        tag: 'canvas',
        classes: ['canvas'],
        attributes: {
            width: 600,
            height: 600,
        },
        parent: main,
    });
};
