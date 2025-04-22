export class WebSocketModel {
  constructor(url, options = {}) {
    this.url = url;
    this.socket = null;
    this.reconnectInterval = options.reconnectInterval || 3000;
    this.eventListeners = {};

    this.connect();
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
    this.emit('open', event);
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
