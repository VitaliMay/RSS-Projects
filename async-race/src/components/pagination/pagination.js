import { createEl } from '../../utils/elementUtils';
import { createButton } from '../button/button';
import { controlsBtnState, currentPage } from '../../store/controls-store';

export function createPaginationBlock(parent) {
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

// export default createPaginationBlock;

export function paginationButtonHolder() {
  if (currentPage.totalCars <= 7) {
    currentPage.numberCurrentPage = 1;
  }
  const { numberCurrentPage, totalCars } = currentPage;
  // const { pagination } = controlsBtnState;
  const { title, buttonPrev, buttonNext } = controlsBtnState.pagination;
  // const { buttonPrev, buttonNext } = controlsBtnState.pagination;

  buttonPrev.disabled = true;
  buttonNext.disabled = true;

  const maxPage = Math.ceil(totalCars / 7);
  if (numberCurrentPage > 1) {
    buttonPrev.disabled = false;
  }
  if (numberCurrentPage > 1) {
    buttonPrev.disabled = false;
  }
  if (numberCurrentPage < maxPage) {
    buttonNext.disabled = false;
  }
  if (numberCurrentPage > maxPage) {
    currentPage.numberCurrentPage = maxPage;
  }

  title.textContent = `Page: ${currentPage.numberCurrentPage} / ${maxPage}`;
}
