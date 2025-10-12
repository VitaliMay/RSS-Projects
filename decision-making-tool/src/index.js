import 'normalize.css';
import './canvas.scss';
import './global.scss';

// import { option } from './components/view/sources/option';
// import { createWheelPage } from './components/view/wheel-page';

// import { MemoryStore } from './components/view/sources/save-state';

import { createOptionPage } from './components/view/option-pageCreate';
import { data } from './components/view/sources/data';

// createWheelPage(option);

// const store = new MemoryStore();

// const data = {};
// const data = { list: [], lastId: 0 };
// data.list = store.getList();
// data.lastId = store.getLastId();

// const data = store.getData();
// console.log(data);
// console.log(data.list, data.lastId);

// console.log(store.getList());
// createOptionPage(store.getList());
// createOptionPage(option);
createOptionPage(data.list);
