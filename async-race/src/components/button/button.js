import { createEl } from '../../utils/elementUtils';

export function createButton(text, parent, addClasses = [], type = 'button') {
  return createEl({
    tag: 'button',
    parent,
    text,
    classes: ['button', ...addClasses],
    attributes: { type },
  });
}
