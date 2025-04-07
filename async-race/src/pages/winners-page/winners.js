import './winners.scss';

import { createEl, createSvgUse } from '../../utils/elementUtils';
import { currentPage, winnersPage } from '../../store/controls-store';
import { main } from '../../components/wrapper/wrapper';
import { createButton } from '../../components/button/button';
import { fetchSortWinner } from '../../api.js/api';

export const createTableWrapper = (parent) => createEl({ parent, classes: ['table-wrapper'] });

export const createTableTitle = (parent) => createEl({ parent, classes: ['table-item', 'table-item_title'] });
export const createTable = (parent) => createEl({ tag: 'ul', parent, classes: ['table'] });
export const createTableItem = (parent) => createEl({ tag: 'li', parent, classes: ['table-item'] });

// const { wrapper, title, list } = winnersPage.table;

winnersPage.table.wrapper = createTableWrapper(main);
winnersPage.table.title = createTableTitle(winnersPage.table.wrapper);
winnersPage.table.list = createTable(winnersPage.table.wrapper);

// const table = winnersPage.table.list;
// const svgTable = createSvgUse('#car', 'car-table');
// table.append(svgTable);

/** ******************************************** */

const { title } = winnersPage.table;

const titleN = createEl({ text: 'N', parent: title });
const titleID = createEl({ text: 'ID', parent: title });
const titleSVG = createEl({ text: 'CAR', parent: title });
const titleName = createEl({ text: 'Name', parent: title });
const titleWins = createButton('Wins UP', title, ['button_max']);
const titleTime = createButton('Time UP', title, ['button_max']);
// const titleWins = createEl({ text: 'Wins', parent: title });
// const titleTime = createEl({ text: 'Time', parent: title });

// titleWins.addEventListener('click', toggleWins);
// titleTime.addEventListener('click', toggleTime);

titleWins.addEventListener('click', async () => {
  // toggleWins();

  // const page = 1;
  // const sort = 'wins';
  // const sort = 'time';
  // const order = 'DESC';
  // const order = 'ASC';

  const page = winnersPage.numberCurrentPage;
  const sort = 'wins';

  const order = toggleWins();
  const data = await fetchSortWinner(page, sort, order);

  console.log('из кнопки', data);
});
titleTime.addEventListener('click', toggleTime);

/** ******************************************** */

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

  // const tableN = createEl({ text: `${number}`, parent: tableItem });
  // const tableID = createEl({ text: `${id}`, parent: tableItem });

  // const svgTable = createSvgUse('#car', 'car-table');
  // tableItem.append(svgTable);
  // svgTable.style.color = color;

  // const tableName = createEl({ text: `${name}`, parent: tableItem });
  // const tableWins = createEl({ text: `${wins}`, parent: tableItem });
  // const tableTime = createEl({ text: `${time}`, parent: tableItem });
}

creatTableElement(1, 25, 'red', 'Mersedes Fantom Sprinter', 6, 3.717);

/** ********************************************** */

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
  const order = winnersPage.isWinsUP ? 'ASC' : 'DESC';
  return order;
}
