import { createEl } from '../../utils/elementUtils';

function createButton(text: string, parent: HTMLElement, addClasses = [], type = 'button'): HTMLButtonElement {
  return createEl({
    tag: 'button',
    parent,
    text,
    classes: ['button', ...addClasses],
    attributes: { type },
  }) as HTMLButtonElement;
}

export default createButton;
