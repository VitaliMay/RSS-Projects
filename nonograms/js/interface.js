import { createEl } from './elementUtils.js';

const body = document.querySelector('body');

const wrapper = createEl({ classes: ['wrapper'], parent: body });

/************************************ */
const settingsContainer = createEl({
  classes: ['settings-container'],
  parent: wrapper,
});

const settingSound = createEl({
  tag: 'button',
  classes: ['button', 'button_setting'],
  attributes: {
    type: 'button',
  },
  text: 'Sound ON',
  parent: settingsContainer,
});

const settingWinners = createEl({
  tag: 'button',
  classes: ['button', 'button_setting'],
  attributes: {
    type: 'button',
  },
  text: 'Winners',
  parent: settingsContainer,
});

const settingMode = createEl({
  tag: 'button',
  classes: ['button', 'button_setting'],
  attributes: {
    type: 'button',
  },
  text: 'Dark',
  parent: settingsContainer,
});

/*********************************** */

const titleH1 = createEl({
  tag: 'h1',
  classes: ['title-h1'],
  text: 'Hello Nonograms butterfly',
  parent: wrapper,
});

const container = createEl({ classes: ['container'], parent: wrapper });

const canvasContainer = createEl({
  classes: ['canvas-container'],
  parent: container,
});

const btnContainer = createEl({
  classes: ['btn-container'],
  parent: container,
});

const btnOptions = {
  tag: 'button',
  classes: ['button'],
  attributes: {
    type: 'button',
  },
  parent: btnContainer,
};
const btnReset = createEl({ ...btnOptions, text: 'Reset Game' });
const btnRandom = createEl({ ...btnOptions, text: 'Random Game' });
const btnSolution = createEl({ ...btnOptions, text: 'Solution' });
const btnSelect = createEl({ ...btnOptions, text: 'Select Game' });

const btnContinue = createEl({ ...btnOptions, text: 'Continue Last Game' });
const btnSave = createEl({ ...btnOptions, text: 'Save Game' });

const btnInterfaceArr = [
  btnReset,
  btnRandom,
  btnSolution,
  btnSelect,
  btnContinue,
  btnSave,
];
// console.log('Привет интерфейс');

export {
  body,
  titleH1,
  canvasContainer,
  btnContainer,
  btnInterfaceArr,
  btnContinue,
  btnSave,
  settingSound,
  settingMode,
  settingWinners,
};
