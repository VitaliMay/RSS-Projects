import { main, createTitleH1, createButton } from './decision-picker/decision-picker';

import { removeAllChild, createEl } from '../utils/elementUtils';

import { createList, createListArr, createListItemBlock, counterID } from './option-page';

import { createWheelPage } from './wheel-page';

import { data, store } from './sources/data';

import './option-style.scss';

import { modal, modalTitleElement, modalTextAreaElement } from './modal/modal-validation';

export const createOptionPage = (option) => {
    removeAllChild(main);

    createTitleH1();

    const list = createList(main);

    createListArr(option, list);

    const addButton = createButton('', 'Add Option', main);
    addButton.addEventListener('click', () => {
        // if (data.list.lenght === 0) {
        //     counterID.resetCount();
        //     console.log(counterID.resetCount());
        //     data.lastId = 0;
        // }

        // counterID.resetCount();
        // console.log(data);

        createListItemBlock(list);
        // createListItemBlock(list, 444);
        // if (data.list.lenght === 0) {
        //     counterID.resetCount();
        //     data.lastId = 0;
        // }

        // console.log(data);
    });

    const pasteListButton = createButton('', 'Paste List', main);
    pasteListButton.addEventListener('click', () => {
        modal(modalTextAreaElement());
    });

    const clearListButton = createButton('', 'Clear List', main);
    clearListButton.addEventListener('click', () => {
        removeAllChild(list);
        data.list = [];
        data.lastId = 0;
        // store.setList(data);
        counterID.resetCount();
    });

    const fileButtonsBlock = createEl({ classes: ['file-block'], parent: main });

    const saveButton = createButton('', 'Save List to file', fileButtonsBlock, ['button_file']);
    /****************************** */
    saveButton.addEventListener('click', () => {
        const json = JSON.stringify(data);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
    /****************************** */

    const loadButton = createButton('', 'Load List from file', fileButtonsBlock, ['button_file']);
    /***************************** */
    loadButton.addEventListener('click', () => {
        const fileInput = createEl({
            tag: 'input',
            attributes: {
                type: 'file',
                accept: '.json',
            },
            styles: { display: 'none' },
        });

        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const jsonData = event.target.result;
                        const dataTemp = JSON.parse(jsonData);
                        data.list = dataTemp.list;
                        data.lastId = dataTemp.lastId;
                        counterID.loadCount(Number(data.lastId));

                        // console.log(data);

                        removeAllChild(list);
                        createListArr(data.list, list);
                    } catch (error) {
                        console.error('Error parse JSON:', error);
                    }
                };
                reader.readAsText(file);
            }
        });

        fileInput.click();
        fileInput.remove();
    });
    /***************************** */
    const startButton = createButton('', 'Start', main);
    startButton.addEventListener('click', () => {
        // console.log(data);
        const { list } = data;
        // if (list.length > 1) {
        //     list.forEach((item) => {
        //         if ( item.title.trim().length > 0 && item.weight > 0) {

        //         }
        //     });
        //     console.log(data);
        // }

        const filteredItems = list.filter((item) => item.title.trim().length > 0 && item.weight > 0);

        // console.log(filteredItems);

        store.setList(data);

        // removeAllChild(main);

        if (filteredItems.length > 1) {
            removeAllChild(main);
            createWheelPage(filteredItems);
        } else {
            // console.log('слишком мало элементов');
            modal(modalTitleElement());
            // modal()
        }
        // createWheelPage(data.list);
    });
};
