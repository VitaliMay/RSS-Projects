import { createButton } from './decision-picker/decision-picker';

import { createEl, createCounter, removeById } from '../utils/elementUtils';

import { data } from './sources/data';
export const counterID = createCounter(data.lastId);

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

export const createListItemBlock = (parent, id = counterID.getCount()) => {
    const listItem = createListItem(parent);
    createListItem_Id(listItem, id);
    const title = createListItem_Title(listItem, id);
    const weight = createListItem_Weight(listItem);

    const delButton = createDeleteButton(listItem, ['but-del']);
    delButton.addEventListener('click', () => {
        removeById(data.list, id);
        listItem.remove();

        console.log(data);
    });

    // слушатели для обновления data.list
    title.addEventListener('input', () => {
        const item = data.list.find((item) => item.id === id);
        if (item) {
            item.title = title.value; // обновление title в data.list
        }
    });

    weight.addEventListener('input', () => {
        const item = data.list.find((item) => item.id === id);
        if (item) {
            item.weight = Number(weight.value); // обновление weight в data.list
        }
    });

    data.list.push({ id: id, title: title.value, weight: weight.value });
    data.lastId = id;

    console.log(data);
};

export const createListArr = (option, parent) => {
    if (option) {
        option.forEach((item) => {
            // option.forEach((item, index) => {
            const listItem = createListItem(parent);
            createListItem_Id(listItem, item.id);
            // createListItem_Id(listItem, index);
            const title = createListItem_Title(listItem, item.id);
            title.value = item.title;
            // title.value = item.text;

            title.addEventListener('input', () => {
                const foundItem = data.list.find((el) => el.id === item.id);
                if (foundItem) {
                    foundItem.title = title.value; // обновление title в data.list
                }
            });

            const weight = createListItem_Weight(listItem);
            weight.value = item.weight;

            weight.addEventListener('input', () => {
                const foundItem = data.list.find((el) => el.id === item.id);
                if (foundItem) {
                    foundItem.weight = Number(weight.value); // обновление title в data.list
                }
            });

            const delButton = createDeleteButton(listItem, ['but-del']);

            delButton.addEventListener('click', () => {
                // listItem.remove();
                removeById(data.list, item.id);
                listItem.remove();

                console.log(data);
            });
        });
    }
};
