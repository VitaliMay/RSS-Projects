import { createEl, createSvgUse } from '../../utils/elementUtils';
import { createButton } from '../button/button';

export const list = createEl({ tag: 'ul', classes: ['list'] });

function createListItem() {
  return createEl({ tag: 'li', classes: ['list-item'], parent: list });
}

const listItem = createListItem();

const optionBlock = createEl({ parent: listItem, classes: ['list-item__option', 'option'] });

const selectButton = createButton('select', optionBlock);
const deleteButton = createButton('delete', optionBlock);

const infoCarName = createEl({ text: 'Mersedes', parent: optionBlock, classes: ['info-car-name'] });

const raceBlock = createEl({ parent: listItem, classes: ['list-item__race', 'race-block'] });
const startButton = createButton('A', raceBlock);
const backButton = createButton('B', raceBlock);

const trackBlock = createEl({ parent: raceBlock, classes: ['race-block__track'] });

const svgCar = createSvgUse('#car', 'car-race');
trackBlock.append(svgCar);
// raceBlock.append(svgCar);

const svgFlag = createSvgUse('#flag', 'flag-style');
trackBlock.append(svgFlag);
// raceBlock.append(svgFlag);
