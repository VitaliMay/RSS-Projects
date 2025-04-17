import { createEl } from '../../utils/elementUtils';

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
