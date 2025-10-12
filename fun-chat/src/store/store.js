class MemoryStore {
  constructor() {
    this.storageKey = 'VitaliMay_Fun-Chat_login';
    this.data = this.getData();
  }

  getData() {
    const lsOptions = sessionStorage.getItem(this.storageKey); // узнаю,что хранится в Local Storage

    if (!this.isLsEmpty(lsOptions)) {
      // если что-то есть
      return JSON.parse(lsOptions);
    }
    return { dataUser: { login: '', password: '' } };
  }

  setData() {
    sessionStorage.setItem(this.storageKey, JSON.stringify(this.data));
  }

  addItem(login, password) {
    const item = {
      login,
      password,
    };
    this.data.dataUser = item;
    this.setData();
  }

  clearStorage() {
    sessionStorage.removeItem(this.storageKey);
    this.data = { dataUser: { login: '', password: '' } };
  }

  isLsEmpty(obj) {
    return !obj || Object.keys(obj).length === 0;
  }
}

const storeLogin = new MemoryStore();

export default storeLogin;
