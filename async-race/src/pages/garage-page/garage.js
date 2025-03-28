import { createEl, removeAllChild } from '../../utils/elementUtils';
// import { wrapper } from '../../components/wrapper/wrapper';

// const createMain = (parent) => createEl({ tag: 'main', classes: ['main'], parent });
// const main = createMain(wrapper);

function createTitleH1(text, parent) {
  removeAllChild(parent);

  createEl({
    tag: 'h1',
    classes: ['title-h1'],
    parent,
    text,
  });
}

export default createTitleH1;

// export const createForm = (parent) =>
// createEl({ tag: 'form', classes: ['form-create'], parent });

// export const createButton = (title, text, parent, addClasses = []) =>
//   createEl({
//   tag: 'button',
//   classes: ['button', ...addClasses],
//   // classes: ['button', 'button_small'],
//   attributes: {
//     title,
//     type: 'button',
//   },
//   text,
//   parent,
// });

// export const createDurationItem = (parent) =>
//   createEl({
//   tag: 'input',
//   classes: ['input-duration'],
//   attributes: {
//     type: 'number',
//     name: 'duration',
//     min: 6,
//     max: 60,
//     value: 8,
//     required: '',
//     placeholder: 'input duration animation in sec',
//   },

//   parent,
// });

// export const createStartButton = (parent) => createEl({
//     tag: 'button',
//     classes: ['button'],
//     text: 'Create Car',
//     parent,
//   });
