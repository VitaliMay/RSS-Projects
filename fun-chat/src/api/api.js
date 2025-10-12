import { createModal, modalTitleElement } from '../components/modal/modal';
import storeLogin from '../store/store';
import { getUUID } from '../utils/elementUtils';

// const { login, password } = storeLogin.data.dataUser;

export class WebSocketModel {
  constructor(url, options = {}) {
    this.url = url;
    this.socket = null;
    this.reconnectInterval = options.reconnectInterval || 3000;
    this.eventListeners = {};

    this.modalInstance = null; // ссылка на модальное окно (чтобы было только один раз)
    this.connectionLost = false; // Флаг потери соединения

    this.loginData = null; // для авторизации при отключении
    // this.loadLoginData(); // для авторизации при отключении

    this.isFirstConnection = true; // Флаг первого подключения
    this.connect();
  }

  // Забираю логин и пароль из storage
  // loadLoginData() {
  //   const { login, password } = storeLogin.data.dataUser;
  //   if (login && password) {
  //     this.loginData = { login, password };
  //   }
  // }

  // Метод для автоматической авторизации
  autoLogin() {
    const { login, password } = storeLogin.data.dataUser;
    console.log('Попытка автоматической авторизации');
    console.log(`посылаю логин ${login} и пароль ${password}`);
    // console.log(`посылаю логин ${this.loginData.login} и пароль ${this.loginData.password}`);

    // if (this.loginData) {
    //   console.log(`посылаю логин ${this.loginData.login} и пароль ${this.loginData.password}`);
    this.send({
      id: getUUID(),
      type: 'USER_LOGIN',
      payload: {
        user: {
          login,
          password,
          // login: this.loginData.login,
          // password: this.loginData.password,
        },
      },
    });
    // console.log('Попытка автоматической авторизации');
    // }
  }

  connect() {
    this.socket = new WebSocket(this.url);

    // Обработчики
    this.socket.onopen = (event) => this.handleOpen(event);
    this.socket.onmessage = (event) => this.handleMessage(event);
    this.socket.onerror = (error) => this.handleError(error);
    this.socket.onclose = (event) => this.handleClose(event);
  }

  send(data) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      const payload = typeof data === 'object' ? JSON.stringify(data) : data;
      this.socket.send(payload);
    } else {
      console.error('WebSocket не подключен');
    }
  }

  on(event, callback) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
  }

  emit(event, ...args) {
    const listeners = this.eventListeners[event];
    if (listeners) {
      listeners.forEach((callback) => callback(...args));
    }
  }

  handleOpen(event) {
    console.log('WebSocket подключен');

    // Если было восстановление соединения и модальное окно существует
    if (this.connectionLost && this.modalInstance) {
      this.removeConnectionModal();
      this.connectionLost = false;

      // Авторизация только при повторном подключении
      if (!this.isFirstConnection) {
        setTimeout(() => {
          if (this.socket?.readyState === WebSocket.OPEN) {
            this.autoLogin();
          }
        }, 100);
      }
    }

    this.isFirstConnection = false;
    // setTimeout(() => {
    //   if (this.socket?.readyState === WebSocket.OPEN) {
    //     this.autoLogin();
    //   }
    // }, 100);
    // this.autoLogin();
    this.emit('open', event);
  }

  // Метод для удаления модального окна
  removeConnectionModal() {
    if (this.modalInstance) {
      this.modalInstance.remove();
      this.modalInstance = null;
    }
  }

  handleMessage(event) {
    try {
      const data = JSON.parse(event.data);
      this.emit('message', data);
    } catch (e) {
      this.emit('message', event.data);
    }
  }

  handleError(error) {
    console.error('WebSocket ошибка:', error);
    this.emit('error', error);
  }

  handleClose(event) {
    console.log('WebSocket отключен:', event.code, event.reason);

    // Показываю модальное окно только при первой потере соединения
    if (!this.connectionLost) {
      const modalText = 'Соединение отключено, идут попытки подключения';
      this.modalInstance = createModal(modalTitleElement, modalText);
      this.connectionLost = true;
    }

    // modalWinner(modalTitleElement, 'Cоединение отключено');
    this.emit('close', event);

    // Переподключение
    if (event.code !== 1000) {
      setTimeout(() => {
        console.log('Попытка переподключения');
        this.connect();
      }, this.reconnectInterval);
    }
  }
}

// Создаю подключение
export const ws = new WebSocketModel('ws://127.0.0.1:4000/', {
  reconnectInterval: 4000,
});
