import { main, createTitleH1, createButton } from './decision-picker/decision-picker';

import { removeAllChild, createEl } from '../utils/elementUtils';

import { createList, createListArr, createListItemBlock } from './option-page';

import { createWheelPage } from './wheel-page';

import { data, store } from './sources/data';

import './option-style.scss';

export const createOptionPage = (option) => {
    removeAllChild(main);

    createTitleH1();

    const list = createList(main);

    createListArr(option, list);

    const addButton = createButton('', 'Add Option', main);
    addButton.addEventListener('click', () => {
        createListItemBlock(list);
        // createListItemBlock(list, 444);
    });

    createButton('', 'Paste List', main);

    const clearListButton = createButton('', 'Clear List', main);
    clearListButton.addEventListener('click', () => {
        removeAllChild(list);
    });

    const fileButtonsBlock = createEl({ classes: ['file-block'], parent: main });
    createButton('', 'Save List to file', fileButtonsBlock, ['button_file']);
    createButton('', 'Load List from file', fileButtonsBlock, ['button_file']);

    const startButton = createButton('', 'Start', main);
    startButton.addEventListener('click', () => {
        console.log(data);
        store.setList(data);

        removeAllChild(main);
        // createWheelPage(data.list);
        createWheelPage(option);
    });
};
