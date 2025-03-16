import { createButton } from './decision-picker/decision-picker';

import { createEl } from '../utils/elementUtils';

export const createListItem = (parent) => {
    return createEl({
        tag: 'li',
        classes: ['list-item'],
        parent: parent,
    });
};

export const createListItem_Id = (parent, id) => {
    return createEl({
        tag: 'label',
        classes: ['list-item__id'],
        attributes: {
            for: `list-item_#${id}`,
        },
        text: `#${id}`,
        parent: parent,
    });
};

export const createListItem_Title = (parent, id) => {
    return createEl({
        tag: 'input',
        classes: ['list-item__title'],
        attributes: {
            value: '',
            name: 'title',
            id: `list-item_#${id}`,
            placeholder: 'Title',
        },
        parent: parent,
    });
};

// createListItem_Title(main, 6);

// {/* <input class="_weight_58a16_33" type="number" value="" placeholder="Weight" name="weight"></input>; */}

export const createListItem_Weight = (parent) => {
    return createEl({
        tag: 'input',
        classes: ['list-item__weight'],
        attributes: {
            type: 'number',
            min: 0,
            value: '',
            name: 'weight',
            placeholder: 'Weight',
        },
        parent: parent,
    });
};

export const createDeleteButton = (parent, addClasses) => {
    return createButton('', 'Delete', parent, addClasses);
};

// createDeleteButton(main);

export const createList = (parent) => {
    return createEl({
        tag: 'ul',
        classes: ['list'],
        parent: parent,
    });
};

export const createListItemBlock = (parent, id = 123) => {
    const listItem = createListItem(parent);
    createListItem_Id(listItem, id);
    createListItem_Title(listItem, id);
    createListItem_Weight(listItem);
    const delButton = createDeleteButton(listItem, ['but-del']);

    delButton.addEventListener('click', () => {
        listItem.remove();
    });
};

export const createListArr = (option, parent) => {
    option.forEach((item, index) => {
        const listItem = createListItem(parent);
        createListItem_Id(listItem, index);
        const title = createListItem_Title(listItem, index);
        title.value = item.text;
        const weight = createListItem_Weight(listItem);
        weight.value = item.weight;
        const delButton = createDeleteButton(listItem, ['but-del']);

        delButton.addEventListener('click', () => {
            listItem.remove();
        });
    });
};
