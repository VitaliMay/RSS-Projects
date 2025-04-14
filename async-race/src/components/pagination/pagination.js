import { createEl } from '../../utils/elementUtils.ts';
import { createButton } from '../button/button';
import { controlsBtnState, currentPage, winnersPage } from '../../store/controls-store';

export function createPaginationBlock(parent, store) {
  const paginationBlock = createEl({ classes: ['pagination'], parent });
  const paginationTitle = createEl({ text: 'Page: 1 / ', classes: ['pagination__title'], parent: paginationBlock });
  const buttonPrev = createButton('Prev', paginationBlock, ['button_pag']);
  buttonPrev.disabled = true;
  const buttonNext = createButton('Next', paginationBlock, ['button_pag']);
  buttonNext.disabled = true;

  // eslint-disable-next-line no-param-reassign
  store.pagination.title = paginationTitle;
  // eslint-disable-next-line no-param-reassign
  store.pagination.buttonPrev = buttonPrev;
  // eslint-disable-next-line no-param-reassign
  store.pagination.buttonNext = buttonNext;
}

export function paginationButtonHolder() {
  if (currentPage.totalCars <= 7) {
    currentPage.numberCurrentPage = 1;
  }
  const { numberCurrentPage, totalCars } = currentPage;
  const { title, buttonPrev, buttonNext } = controlsBtnState.pagination;

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

export function paginationButtonHolderWinner() {
  if (winnersPage.totalWinners <= 10) {
    winnersPage.numberCurrentPage = 1;
  }
  const { totalWinners, numberCurrentPage } = winnersPage;
  const { title, buttonPrev, buttonNext } = winnersPage.pagination;

  buttonPrev.disabled = true;
  buttonNext.disabled = true;

  const maxPage = Math.ceil(totalWinners / 10);
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

  title.textContent = `Page: ${winnersPage.numberCurrentPage} / ${maxPage}`;
}
