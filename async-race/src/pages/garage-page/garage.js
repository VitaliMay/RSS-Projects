import { createEl, createSvgUse } from '../../utils/elementUtils';
import { createButton } from '../../components/button/button';
import { main } from '../../components/wrapper/wrapper';
import { dataStore } from '../../store/data-store';

export function createTitleH1(text, parent) {
  createEl({
    tag: 'h1',
    classes: ['title-h1'],
    parent,
    text,
  });
}

export function createForm(parent) {
  return createEl({
    tag: 'form',
    parent,
    classes: ['form-create'],
  });
}

export function createInputColor(parent) {
  return createEl({
    tag: 'input',
    attributes: { type: 'color' },
    classes: ['input-color'],
    parent,
  });
}

export function createInputText(parent) {
  return createEl({
    tag: 'input',
    attributes: { type: 'text', placeholder: 'Car name' },
    classes: ['input-text'],
    parent,
  });
}

export function createBlock(parent) {
  return createEl({
    classes: ['create-cars-block'],
    parent,
  });
}

// blockCreateCar

export const svgUseCar = createSvgUse('#car', 'car-color');

export const createChooseBlock = (buttonTitle, parent) => {
  // const svgUseCarRace = createSvgUse('#car', 'car-race');
  // main.append(svgUseCarRace);

  // const svgUseFlag = createSvgUse('#flag', 'flag-style');
  // main.append(svgUseFlag);

  const formCreateCar = createForm(parent);

  // const svgUseCar = createSvgUse('#car', 'car-color');
  // main.append(svgUseCar);

  const inputText = createInputText(formCreateCar);
  inputText.value = dataStore.formCreateCarStore.textCar || '';

  const inputColor = createInputColor(formCreateCar);
  const buttonSendCreateCar = createButton(buttonTitle, formCreateCar, [], 'submit');
  // const buttonSendCreateCar = createButton('Create', formCreateCar, [], 'submit');
  // buttonSendCreateCar.disabled = true;

  if (inputText.value.length < 3) {
    buttonSendCreateCar.disabled = true;
  } else {
    buttonSendCreateCar.disabled = false;
  }

  inputText.addEventListener('input', () => {
    if (inputText.value.length < 3) {
      buttonSendCreateCar.disabled = true;
    } else {
      buttonSendCreateCar.disabled = false;
    }

    dataStore.formCreateCarStore.textCar = inputText.value;
  });

  inputColor.value = dataStore.formCreateCarStore.colorCar;
  svgUseCar.style.color = inputColor.value;

  inputColor.addEventListener('input', () => {
    svgUseCar.style.color = inputColor.value;
    dataStore.formCreateCarStore.colorCar = inputColor.value;
  });

  dataStore.formCreateCarStore.colorCar = inputColor.value;
};
