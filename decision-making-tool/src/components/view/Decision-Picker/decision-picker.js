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

const form = createEl({
    tag: 'form',
    classes: ['form-duration'],
    parent: main,
});

export const createStartButton = () => {
    return createEl({
        tag: 'button',
        classes: ['button'],
        attributes: {
            title: 'Pick',
            // type: 'button',
        },
        text: 'Start Button',
        parent: form,
    });
};

export const startButton = createStartButton();

export const createInfoItem = () => {
    return createEl({
        tag: 'p',
        classes: ['info'],
        text: 'Press Start Button',
        parent: main,
    });
};
export const infoItem = createInfoItem();

export const createDurationItem = () => {
    return createEl({
        tag: 'input',
        classes: ['input-duration'],
        attributes: {
            type: 'number',
            name: 'duration',
            min: 6,
            // value: 4,
            required: '',
            placeholder: 'input duration animation in sec',
        },

        parent: form,
    });
};

export const durationItem = createDurationItem();

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
