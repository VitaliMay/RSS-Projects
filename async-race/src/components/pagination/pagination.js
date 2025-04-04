import { createEl } from '../../utils/elementUtils';
import { createButton } from '../button/button';
import { controlsBtnState } from '../../store/controls-store';

function createPaginationBlock(parent) {
  const paginationBlock = createEl({ classes: ['pagination'], parent });
  const paginationTitle = createEl({ text: 'Page: 1 / ', classes: ['pagination__title'], parent: paginationBlock });
  const buttonPrev = createButton('Prev', paginationBlock, ['button_pag']);
  buttonPrev.disabled = true;
  const buttonNext = createButton('Next', paginationBlock, ['button_pag']);
  buttonNext.disabled = true;

  controlsBtnState.pagination.title = paginationTitle;
  controlsBtnState.pagination.buttonPrev = buttonPrev;
  controlsBtnState.pagination.buttonNext = buttonNext;
}

export default createPaginationBlock;
