import { createEl, createSvgUse, getRandomColor } from '../../utils/elementUtils';
import { counterID, getRandomCarName } from '../../sources/car-options';
import { createButton } from '../../components/button/button';
import { main } from '../../components/wrapper/wrapper';
import { dataStore } from '../../store/data-store';
import { createListItem } from '../../components/list/list';

import { controlsBtnState } from '../../store/controls-store';

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
controlsBtnState.svgModel = svgUseCar;

export const createChooseBlock = (buttonTitle, parent, keyControlsBtnState) => {
  // const svgUseCarRace = createSvgUse('#car', 'car-race');
  // main.append(svgUseCarRace);

  // const svgUseFlag = createSvgUse('#flag', 'flag-style');
  // main.append(svgUseFlag);

  const formCreateCar = createForm(parent);
  controlsBtnState[`${keyControlsBtnState}Block`] = formCreateCar;

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
    // В самом list-item лучше не менять,
    // чтобы не вводить доп кнопку возврата к исходному состоянию
    // controlsBtnState.svgSelectCar.style.color = inputColor.value;
    dataStore.formCreateCarStore.colorCar = inputColor.value;
  });

  dataStore.formCreateCarStore.colorCar = inputColor.value;

  controlsBtnState[keyControlsBtnState].inputText = inputText;
  controlsBtnState[keyControlsBtnState].inputColor = inputColor;
  controlsBtnState[keyControlsBtnState].buttonSendCreateCar = buttonSendCreateCar;
  // console.log(controlsBtnState.formSelect.buttonSendCreateCar);
  // return [inputText, inputColor, buttonSendCreateCar];

  if (controlsBtnState.formSelect.buttonSendCreateCar) {
    controlsBtnState.formSelect.buttonSendCreateCar.addEventListener('click', () => {
      controlsBtnState.formSelect.buttonSendCreateCar.disabled = true;
      controlsBtnState.infoCarNameSelectCar.textContent = controlsBtnState.formSelect.inputText.value;
      controlsBtnState.btnSelectListItem.disabled = false;
      controlsBtnState.selectTrack.style.color = inputColor.value;

      controlsBtnState.deleteBtnSelectCar.disabled = false;

      // задолбался возиться с форматами цвета, лучше просто обнулю
      controlsBtnState.svgModel.style.color = '#000000';
      controlsBtnState.formSelect.inputColor.value = '#000000';
      controlsBtnState.formSelect.inputColor.disabled = true;
      controlsBtnState.formSelect.inputText.disabled = true;
      // controlsBtnState.svgSelectCar.style.color = inputColor.value;

      controlsBtnState.formSelect.inputText.value = '';
      controlsBtnState.chooseCarName.textContent = '';

      controlsBtnState.formCreat.inputText.disabled = false;
      controlsBtnState.formCreat.inputColor.disabled = false;
      controlsBtnState.formCreat.buttonSendCreateCar.disabled = false;
    });
  }

  // if (controlsBtnState.formCreat.buttonSendCreateCar) {
  //   controlsBtnState.formCreat.buttonSendCreateCar.addEventListener('click', () => {
  //     createListItem(counterID.getCount(), getRandomColor(), getRandomCarName());
  //   });
  // }
};
