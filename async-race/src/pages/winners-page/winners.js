import './winners.scss';

import { createEl, createSvgUse, removeAllChild } from '../../utils/elementUtils.ts';
import { currentPage, winnersPage } from '../../store/controls-store';
import { main } from '../../components/wrapper/wrapper';
import { createButton } from '../../components/button/button';
import { fetchSortWinner } from '../../api.js/api';

export const createTableWrapper = (parent) => createEl({ parent, classes: ['table-wrapper'] });

export const createTableTitle = (parent) => createEl({ parent, classes: ['table-item', 'table-item_title'] });
export const createTable = (parent) => createEl({ tag: 'ul', parent, classes: ['table'] });
export const createTableItem = (parent) => createEl({ tag: 'li', parent, classes: ['table-item'] });

winnersPage.table.wrapper = createTableWrapper(main);
winnersPage.table.title = createTableTitle(winnersPage.table.wrapper);
winnersPage.table.list = createTable(winnersPage.table.wrapper);

const { title } = winnersPage.table;

const titleN = createEl({ text: 'N', parent: title });
const titleID = createEl({ text: 'ID', parent: title });
const titleSVG = createEl({ text: 'CAR', parent: title });
const titleName = createEl({ text: 'Name', parent: title });
const titleWins = createButton('Wins UP', title, ['button_max']);
const titleTime = createButton('Time UP', title, ['button_max']);

titleWins.addEventListener('click', async () => {
  const { list } = winnersPage.table;
  removeAllChild(list);

  const page = winnersPage.numberCurrentPage;

  winnersPage.currentSort.sort = 'wins';
  winnersPage.currentSort.order = toggleWins();

  const { sort, order } = winnersPage.currentSort;

  const dataSort = await fetchSortWinner(page, sort, order);
  const { dataTotalGarage } = currentPage;

  const optionArr = createPageOptons(dataSort, dataTotalGarage);

  optionArr.forEach((item) => {
    const { index, id, color, name, wins, time } = item;
    creatTableElement(index, id, color, name, wins, time);
  });
});

titleTime.addEventListener('click', async () => {
  const { list } = winnersPage.table;
  removeAllChild(list);

  const page = winnersPage.numberCurrentPage;

  winnersPage.currentSort.sort = 'time';
  winnersPage.currentSort.order = toggleTime();

  const { sort, order } = winnersPage.currentSort;

  const dataSort = await fetchSortWinner(page, sort, order);
  const { dataTotalGarage } = currentPage;

  const optionArr = createPageOptons(dataSort, dataTotalGarage);

  optionArr.forEach((item) => {
    const { index, id, color, name, wins, time } = item;
    creatTableElement(index, id, color, name, wins, time);
  });
});

export async function firstLoad() {
  const { list } = winnersPage.table;
  removeAllChild(list);

  const page = winnersPage.numberCurrentPage;

  const { sort, order } = winnersPage.currentSort;
  const dataSort = await fetchSortWinner(page, sort, order);
  const { dataTotalGarage } = currentPage;

  const optionArr = createPageOptons(dataSort, dataTotalGarage);

  optionArr.forEach((item) => {
    const { index, id, color, name, wins, time } = item;
    creatTableElement(index, id, color, name, wins, time);
  });
}

export function creatTableElement(number, id, color, name, wins, time) {
  const tableItem = createTableItem(winnersPage.table.list);
  createEl({ text: number, parent: tableItem });
  createEl({ text: id, parent: tableItem });

  const svgTable = createSvgUse('#car', 'car-table');
  tableItem.append(svgTable);
  svgTable.style.color = color;

  createEl({ text: name, parent: tableItem });
  createEl({ text: wins, parent: tableItem });
  createEl({ text: time, parent: tableItem });
}

export function createPageOptons(winners, garage) {
  const { numberCurrentPage } = winnersPage;
  const numberCorrection = (numberCurrentPage - 1) * 10;
  const pageOptionsArr = winners.map((itemWinners, index) => {
    const car = garage.find((garageItem) => garageItem.id === itemWinners.id);
    return { ...car, ...itemWinners, index: index + 1 + numberCorrection };
  });

  return pageOptionsArr;
}

function toggleWins() {
  winnersPage.isWinsUP = !winnersPage.isWinsUP;
  const winsState = winnersPage.isWinsUP ? 'Wins UP' : 'Wins DOWN';
  titleWins.textContent = winsState;
  const order = winnersPage.isWinsUP ? 'ASC' : 'DESC';
  return order;
}

function toggleTime() {
  winnersPage.isTimeUP = !winnersPage.isTimeUP;
  const timeState = winnersPage.isTimeUP ? 'Time UP' : 'Time DOWN';
  titleTime.textContent = timeState;
  const order = winnersPage.isTimeUP ? 'ASC' : 'DESC';
  return order;
}

export async function createCurrentListWinners() {
  const { list: listWinner } = winnersPage.table;
  removeAllChild(listWinner);
  const page = winnersPage.numberCurrentPage;
  const { sort, order } = winnersPage.currentSort;
  const dataSort = await fetchSortWinner(page, sort, order);
  const { dataTotalGarage } = currentPage;
  const optionArr = createPageOptons(dataSort, dataTotalGarage);
  optionArr.forEach((item) => {
    const { index, id, color, name, wins, time } = item;
    creatTableElement(index, id, color, name, wins, time);
  });
}
