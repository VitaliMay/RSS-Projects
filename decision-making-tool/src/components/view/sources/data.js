import { MemoryStore } from './save-state';

export const store = new MemoryStore();

export const data = store.getData();

export const optionItemArr = [];

export const listOptions = { list: null };

window.addEventListener('beforeunload', () => {
    store.setList(data);
});
