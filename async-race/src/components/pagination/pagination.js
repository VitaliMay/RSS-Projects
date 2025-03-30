import { createEl } from '../../utils/elementUtils';
import { createButton } from '../button/button';

function createPaginationBlock(parent) {
  const paginationBlock = createEl({ classes: ['pagination'], parent });
  const paginationTitle = createEl({ text: 'Page: 1 / 6', classes: ['pagination__title'], parent: paginationBlock });
  const buttonPrev = createButton('Prev', paginationBlock, ['button_pag']);
  buttonPrev.disabled = true;
  const buttonNext = createButton('Next', paginationBlock, ['button_pag']);
  buttonNext.disabled = true;
}

export default createPaginationBlock;
