import { createEl, createSvgUse, getRandomColor, removeAllChild } from '../../utils/elementUtils';
import { counterID, getRandomCarName } from '../../sources/car-options';
import { createButton } from '../../components/button/button';
import { main } from '../../components/wrapper/wrapper';
import { dataStore, stateData } from '../../store/data-store';
import { createListItem, list } from '../../components/list/list';
import { fetchUpdateCar, fetchPagination } from '../../api.js/api';

import { controlsBtnState, currentPage } from '../../store/controls-store';

export function createTitleH1(text, parent) {
  return createEl({
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
  const formCreateCar = createForm(parent);
  controlsBtnState[`${keyControlsBtnState}Block`] = formCreateCar;

  const inputText = createInputText(formCreateCar);
  // inputText.value = dataStore.formCreateCarStore.textCar || '';

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

    if (keyControlsBtnState === 'formCreat') {
      stateData.stateCreateText = inputText.value;
      stateData.stateUpdateText = '';
    }

    if (keyControlsBtnState === 'formSelect') {
      stateData.stateUpdateText = inputText.value;
      stateData.stateCreateText = '';
    }
  });

  // inputColor.value = dataStore.formCreateCarStore.colorCar;
  svgUseCar.style.color = inputColor.value;

  controlsBtnState[keyControlsBtnState].inputText = inputText;
  controlsBtnState[keyControlsBtnState].inputColor = inputColor;
  controlsBtnState[keyControlsBtnState].buttonSendCreateCar = buttonSendCreateCar;

  const {
    inputText: inputTextData,
    inputColor: inputColorData,
    buttonSendCreateCar: buttonSendData,
  } = controlsBtnState[keyControlsBtnState];

  inputColor.addEventListener('input', () => {
    svgUseCar.style.color = inputColor.value;
    // В самом list-item лучше не менять,
    // чтобы не вводить доп кнопку возврата к исходному состоянию
    // controlsBtnState.svgSelectCar.style.color = inputColor.value;
    dataStore.formCreateCarStore.colorCar = inputColor.value;

    stateData.stateSvgColor = inputColor.value;
    if (keyControlsBtnState === 'formCreat') {
      stateData.stateCreateColor = inputColor.value;
      stateData.stateUpdateColor = '#000000';
    }

    if (keyControlsBtnState === 'formSelect') {
      stateData.stateUpdateColor = inputColor.value;
      stateData.stateCreateColor = '#000000';
    }

    console.log(stateData.stateCreateColor);
    console.log(stateData.stateUpdateColor);
  });

  dataStore.formCreateCarStore.colorCar = inputColor.value;

  // controlsBtnState[keyControlsBtnState].inputText = inputText;
  // controlsBtnState[keyControlsBtnState].inputColor = inputColor;
  // controlsBtnState[keyControlsBtnState].buttonSendCreateCar = buttonSendCreateCar;

  if (controlsBtnState.formSelect.buttonSendCreateCar) {
    controlsBtnState.formSelect.buttonSendCreateCar.addEventListener('click', async () => {
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

      // Это может работать и синхронно, нечего тормозить процесс))
      const { selectID } = controlsBtnState;
      const { stateUpdateColor: colorCar, stateUpdateText: textCar } = stateData;
      // const { colorCar, textCar } = dataStore.formCreateCarStore;
      const data = {
        name: textCar,
        color: colorCar,
      };
      await fetchUpdateCar(selectID, data);
      removeAllChild(list);
      fetchPagination(currentPage.numberCurrentPage, createListItem);

      controlsBtnState.selectID = null;

      dataStore.formCreateCarStore.textCar = '';
      dataStore.formCreateCarStore.colorCar = '#000000';

      stateData.stateSvgColor = '#000000';
      stateData.stateUpdateColor = '#000000';
      stateData.stateUpdateDisabled = true;
      stateData.stateCreateDisabled = false;
      stateData.stateUpdateText = '';
    });
  }
};
