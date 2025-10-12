import { createEl, removeAllChild } from '../../utils/elementUtils';
import { createButton } from '../decision-picker/decision-picker';
import { data, listOptions } from '../sources/data';
import { counterID } from '../option-page';
import { createListArr } from '../option-page';

export const modalTextAreaElement = (parent) => {
    return createEl({
        tag: 'textarea',
        attributes: {
            rows: '8',
            cols: '40',
            placeholder: 'Paste a list of new options',
        },
        // parent: null,
        parent: parent,

        classes: ['paste-list'],
    });
};

export const modalFormElement = (callback) => {
    const form = createEl({
        tag: 'form',
        classes: ['form-paste-list'],
        parent: null,
    });

    const textArea = modalTextAreaElement(form);

    const confirmButton = createButton('Confirm', 'Confirm', form, ['button_confirm']);

    confirmButton.addEventListener('click', () => {
        const validResultArr = parseCSV(textArea.value);

        if (validResultArr.length > 0) {
            validResultArr.forEach((item) => data.list.push(item));
            data.lastId = validResultArr[validResultArr.length - 1].id; // обновляю данные data

            removeAllChild(listOptions.list);
            createListArr(data.list, listOptions.list);
        }

        // console.log(data);
        callback();
    });

    return form;
};

function parseCSV(value) {
    const rowsArr = value.split('\n'); // разделяею строки
    const result = [];

    rowsArr.forEach((row) => {
        const values = row.split(','); // разделяю значения в строке
        const weight = values.pop(); // забираю последнее значение (weight)
        const title = values.join(','); //  остальные значения в строку

        const isNumber = !isNaN(weight);
        if (isNumber && title.trim().length > 0) {
            result.push({ id: counterID.getCount(), title, weight: Number(weight) }); // Сохраняем в массив объектов
        }
        // else {
        //     // weight - это не число
        //     console.log('weight - это не число');
        // }

        // result.push({ title, weight }); // Сохраняем в массив объектов
    });
    // console.log(result);
    // console.log(data);
    return result;
}
