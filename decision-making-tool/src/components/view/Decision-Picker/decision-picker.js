// import '../../../mixins.scss';
import './main.scss';

import { createEl } from '../../utils/elementUtils';

export const createMain = () => {
    return createEl({
        tag: 'main',
        classes: ['main'],
    });
};

export const main = createMain();

export const createTitleH1 = () => {
    return createEl({
        tag: 'h1',
        classes: ['title-h1'],
        text: 'Decision Making Tool',
        parent: main,
    });
};

// export const titleH1 = createTitleH1();

export const createForm = () =>
    createEl({
        tag: 'form',
        classes: ['form-duration'],
        parent: main,
    });

export const createInfoItem = () => {
    return createEl({
        tag: 'p',
        classes: ['info'],
        text: 'Press Start Button',
        parent: main,
    });
};
// export const infoItem = createInfoItem();

export const createButton = (title, text, parent) => {
    return createEl({
        tag: 'button',
        classes: ['button', 'button_small'],
        attributes: {
            title: title,
            type: 'button',
        },
        text: text,
        parent: parent,
    });
};

// export const backButton = createButton('Back', 'Back');
// export const soundButton = createButton('Sound', 'Sound');

// export const createBackButton = () => {
//     return createEl({
//         tag: 'button',
//         classes: ['button', 'button_small'],
//         attributes: {
//             title: 'Back',
//             type: 'button',
//         },
//         text: 'Back',
//         parent: form,
//     });
// };

// export const backButton = createBackButton();

// export const createSoundButton = () => {
//     return createEl({
//         tag: 'button',
//         classes: ['button', 'button_small'],
//         attributes: {
//             title: 'Sound',
//             type: 'button',
//         },
//         text: 'Sound',
//         parent: form,
//     });
// };

// export const soundButton = createSoundButton();

export const createDurationItem = (parent) => {
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

        parent: parent,
    });
};

// export const durationItem = createDurationItem();

export const createStartButton = (parent) => {
    return createEl({
        tag: 'button',
        classes: ['button'],
        attributes: {
            title: 'Pick',
            // type: 'button',
        },
        text: 'Start Button',
        parent: parent,
    });
};

// export const startButton = createStartButton();

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
