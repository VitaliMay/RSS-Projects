import { createEl } from './elementUtils.js';

const body = document.querySelector('body');

const wrapper = createEl({ classes: ['wrapper'], parent: body });

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

const btnInterfaceArr = [btnReset, btnRandom, btnSolution, btnSelect];
// console.log('Привет интерфейс');

export { body, titleH1, canvasContainer, btnContainer, btnInterfaceArr };
