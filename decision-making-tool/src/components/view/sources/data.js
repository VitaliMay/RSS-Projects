import { MemoryStore } from './save-state';

export const store = new MemoryStore();

export const data = store.getData();

export const optionItemArr = [];

window.addEventListener('beforeunload', () => {
    store.setList(data);
});
