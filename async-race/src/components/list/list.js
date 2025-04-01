import { createEl, createSvgUse, createCounterID } from '../../utils/elementUtils';
import { createButton } from '../button/button';

import { controlsBtnState } from '../../store/controls-store';

export const list = createEl({ tag: 'ul', classes: ['list'] });

// export const counterID = createCounterID(6);

export function createListItem(id, colorCar, nameCar) {
  // export function createListItem(id, colorCar, nameCar, svgModel) {
  // export function createListItem(id, colorCar, nameCar, inpText, inpColor, btnSend, svgModel) {
  const inpText = controlsBtnState.formSelect.inputText;
  const inpColor = controlsBtnState.formSelect.inputColor;
  const btnSend = controlsBtnState.formSelect.buttonSendCreateCar;

  const inpTextCreat = controlsBtnState.formCreat.inputText;
  const inpColorCreat = controlsBtnState.formCreat.inputColor;
  const btnSendCreat = controlsBtnState.formCreat.buttonSendCreateCar;

  const listItem = createEl({
    tag: 'li',
    attributes: { id },
    classes: ['list-item'],
    parent: list,
  });
  const optionBlock = createEl({ parent: listItem, classes: ['list-item__option', 'option'] });
  const selectButton = createButton('select', optionBlock);
  const deleteButton = createButton('delete', optionBlock);
  const infoCarName = createEl({ text: 'Mersedes', parent: optionBlock, classes: ['info-car-name'] });
  infoCarName.textContent = nameCar;

  const raceBlock = createEl({ parent: listItem, classes: ['list-item__race', 'race-block'] });

  const startButton = createButton('A', raceBlock);
  const backButton = createButton('B', raceBlock);
  backButton.disabled = true;

  const trackBlock = createEl({ parent: raceBlock, classes: ['race-block__track'] });
  trackBlock.style.color = colorCar;

  const svgCar = createSvgUse('#car', 'car-race');
  trackBlock.append(svgCar);

  const svgFlag = createSvgUse('#flag', 'flag-style');
  trackBlock.append(svgFlag);

  deleteButton.addEventListener('click', () => {
    listItem.remove();
  });

  selectButton.addEventListener('click', () => {
    // eslint-disable-next-line no-param-reassign
    btnSend.disabled = false;
    inpColor.disabled = false;
    inpText.disabled = false;

    btnSendCreat.disabled = true;
    inpColorCreat.disabled = true;
    inpTextCreat.disabled = true;

    // В самом list-item лучше не менять,
    // чтобы не вводить доп кнопку возврата к исходному состоянию
    controlsBtnState.svgSelectCar = svgCar;
    controlsBtnState.selectTrack = trackBlock;

    if (controlsBtnState.btnSelectListItem) {
      controlsBtnState.btnSelectListItem.disabled = false;
    }
    controlsBtnState.btnSelectListItem = selectButton;
    controlsBtnState.deleteBtnSelectCar = deleteButton;
    selectButton.disabled = true;
    deleteButton.disabled = true;

    controlsBtnState.chooseCarName.textContent = infoCarName.textContent;
    inpText.value = infoCarName.textContent;
    // inpColor.value = colorCar;
    // inpColor.value = trackBlock.style.color;
    // eslint-disable-next-line no-param-reassign
    // trackBlock.style.color = inpColor.value;
    // controlsBtnState.svgModel.style.color = inpColor.value;
    controlsBtnState.svgModel.style.color = trackBlock.style.color;
    controlsBtnState.formSelect.inputColor.value = '#000000';
    // controlsBtnState.formSelect.inputColor.value = controlsBtnState.svgModel.style.color;
    // console.log(controlsBtnState.svgModel.style.color);
    // svgModel.style.color = inpColor.value;

    controlsBtnState.infoCarNameSelectCar = infoCarName;
  });

  startButton.addEventListener('click', () => {
    trackBlock.classList.remove('race-block__track_adapt');
    svgCar.classList.remove('move');
    svgCar.style = '';

    startAnimation(trackBlock, svgCar, 2000);
    startButton.disabled = true;
    backButton.disabled = false;
  });

  backButton.addEventListener('click', () => {
    // svgCar.classList.remove('move');
    // svgCar.style.transform = 'translateX(0) scaleX(-1);';
    trackBlock.classList.remove('race-block__track_adapt');
    svgCar.classList.remove('move');
    svgCar.style = '';
    startButton.disabled = false;
    backButton.disabled = true;
  });

  svgCar.addEventListener('animationend', () => {
    svgCar.classList.remove('move');
    svgCar.style = '';
    trackBlock.classList.add('race-block__track_adapt');
    startButton.disabled = false;
    backButton.disabled = false;
  });

  return listItem;
}

// Функция для запуска анимации
function startAnimation(parent, child, duration) {
  const parentWidth = parent.clientWidth;
  const childWidth = child.clientWidth;
  const moveDistance = parentWidth - childWidth;

  // длительность анимации
  // eslint-disable-next-line no-param-reassign
  child.style.animationDuration = `${duration}ms`;

  // конечная точка
  child.style.setProperty('--move-distance', `${moveDistance}px`);

  // Добавляем класс для запуска анимации
  child.classList.add('move');
}
