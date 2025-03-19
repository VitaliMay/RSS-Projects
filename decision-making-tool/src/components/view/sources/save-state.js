export class MemoryStore {
    constructor() {
        this.storageKey = 'VitaliMay_DMT_options';
        this.data = this.getData();
    }

    getData() {
        const lsOptions = localStorage.getItem(this.storageKey); // узнаю,что хранится в Local Storage

        if (!this.isLsEmpty(lsOptions)) {
            // если что-то есть
            return JSON.parse(lsOptions);
        } else {
            return { list: [{ id: 1, title: null, weight: null }], lastId: 1 };
        }
    }

    setData() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    addItem(id, title, weight) {
        const item = {
            id: id,
            title: title,
            weight: weight,
        };
        this.data.list.push(item);
        this.setData();
    }

    getList() {
        return this.data && this.data.list ? this.data.list : [];
        // return this.data.list || [];
    }

    getLastId() {
        return this.data && this.data.lastId ? this.data.lastId : 0;
        // return this.data.lastId;
    }

    setList(options) {
        this.data = options;
        this.setData();
    }

    clearStorage() {
        localStorage.removeItem(this.storageKey);
        this.data = { list: [], lastId: 0 };
    }

    isLsEmpty(obj) {
        return !obj || Object.keys(obj).length === 0;
    }

    //     return obj === null || (typeof obj === 'object' && Object.keys(obj).length === 0);
    // }
}

// export const store = new MemoryStore();
