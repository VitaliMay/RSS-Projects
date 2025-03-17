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
// import { removeAllChild, createEl } from '../utils/elementUtils';

// import { data } from './sources/data';

// import { store } from './sources/save-state';

/************************************** */

// import { option } from './sources/option';

// import {
//     createList,
//     createListArr,
//     createListItemBlock,
//     // createListItem,
//     // createListItem_Id,
//     // createListItem_Title,
//     // createListItem_Weight,
//     // createDeleteButton,
// } from './option-page';

import './option-style.scss';
import { createOptionPage } from './option-pageCreate';
/*************************************** */

export const createWheelPage = (option) => {
    removeAllChild(main);

    const titleH1 = createTitleH1();

    const form = createForm();

    const infoItem = createInfoItem();

    const backButton = createButton('Back', 'Back', form, ['button_small']);
    const soundButton = createButton('Sound', 'Sound', form, ['button_small']);

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

    /************************************************ */

    backButton.addEventListener('click', () => {
        // createOptionPage(data.list);
        createOptionPage(option);

        // removeAllChild(main);

        // createTitleH1();

        // const list = createList(main);

        // createListArr(option, list);

        // const addButton = createButton('', 'Add Option', main);
        // addButton.addEventListener('click', () => {
        //     createListItemBlock(list, 444);
        // });

        // createButton('', 'Paste List', main);

        // const clearListButton = createButton('', 'Clear List', main);
        // clearListButton.addEventListener('click', () => {
        //     removeAllChild(list);
        // });

        // const fileButtonsBlock = createEl({ classes: ['file-block'], parent: main });
        // createButton('', 'Save List to file', fileButtonsBlock, ['button_file']);
        // createButton('', 'Load List from file', fileButtonsBlock, ['button_file']);

        // const startButton = createButton('', 'Start', main);
        // startButton.addEventListener('click', () => {
        //     removeAllChild(main);
        //     createWheelPage(option);
        // });

        // store.setData();
    });

    /************************************************************************* */

    return [titleH1, form, infoItem, backButton, soundButton, durationItem, startButton];
};
