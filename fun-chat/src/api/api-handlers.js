import { ws } from './api';
import constrols from '../store/constrols';
import storeLogin from '../store/store';

function handleLoginSuccess(userData) {
  const { inputLogin, inputPassword, formLogin } = constrols.page.login;
  console.log('Успешная авторизация:', userData.login);

  constrols.userLogin.textContent = userData.login;
  storeLogin.addItem(inputLogin.value, inputPassword.value);
  formLogin.reset();
  window.location.hash = '/main';
}

export function handleLoginError(errorMessage) {
  const { formLogin } = constrols.page.login;
  console.error('Ошибка авторизации:', errorMessage);
  constrols.userLogin.textContent = errorMessage;
  formLogin.reset();
}

export function setupWebSocketHandlers() {
  ws.on('message', (data) => {
    if (data.type === 'USER_LOGIN') {
      // Успешная авторизация
      handleLoginSuccess(data.payload.user);
    } else if (data.type === 'ERROR') {
      // Обработка ошибок
      handleLoginError(data.payload.error);
    } else {
      console.warn('Неизвестный тип сообщения:', data.type, data);
    }
  });
}
