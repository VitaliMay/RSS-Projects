import { ws } from './api';
import constrols from '../store/constrols';
import storeLogin from '../store/store';
import { creatUserListItem } from '../pages/main-page/main-page';
import { getUUID, removeAllChild } from '../utils/elementUtils';

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

// export function setupWebSocketHandlers() {
//   ws.on('message', (data) => {
//     if (data.type === 'USER_LOGIN') {
//       // Успешная авторизация
//       handleLoginSuccess(data.payload.user);
//     } else if (data.type === 'ERROR') {
//       // Обработка ошибок
//       handleLoginError(data.payload.error);
//     } else {
//       console.warn('Неизвестный тип сообщения:', data.type, data);
//     }
//   });
// }

const messageHandlers = {
  USER_LOGIN: (data) => {
    handleLoginSuccess(data.payload.user);
  },

  ERROR: (data) => {
    handleLoginError(data.payload.error);
  },

  USER_LOGOUT: (data) => {
    const { login } = data.payload.user;
    console.log(`Разлогинелся user ${login}`);

    ws.send({
      id: getUUID(),
      type: 'USER_ACTIVE',
      payload: null,
    });

    ws.send({
      id: getUUID(),
      type: 'USER_INACTIVE',
      payload: null,
    });
  },

  USER_EXTERNAL_LOGIN: (data) => {
    const { login } = data.payload.user;
    // const id = getUUID();
    console.log(`появился новый user ${login}`);
    // creatUserListItem(constrols.page.main.userList, login, id);
    const { userList } = constrols.page.main;
    removeAllChild(userList);

    ws.send({
      id: getUUID(),
      type: 'USER_ACTIVE',
      payload: null,
    });

    ws.send({
      id: getUUID(),
      type: 'USER_INACTIVE',
      payload: null,
    });
  },

  USER_EXTERNAL_LOGOUT: (data) => {
    const { login } = data.payload.user;
    // const id = getUUID();
    console.log(`убрался новый user ${login}`);
    // creatUserListItem(constrols.page.main.userList, login, id);
    const { userList } = constrols.page.main;
    removeAllChild(userList);

    ws.send({
      id: getUUID(),
      type: 'USER_ACTIVE',
      payload: null,
    });

    ws.send({
      id: getUUID(),
      type: 'USER_INACTIVE',
      payload: null,
    });
  },

  USER_ACTIVE: (data) => {
    const activeUsers = data.payload.users;
    const { login: currentLogin } = storeLogin.data.dataUser;
    activeUsers.forEach((item) => {
      console.log(`в сети ${item.login}`);
      const { login } = item;
      if (login !== currentLogin) {
        const id = getUUID();
        const userListItem = creatUserListItem(constrols.page.main.userList, login, id);
        userListItem.classList.add('list-item_active');
      }
    });
  },

  USER_INACTIVE: (data) => {
    const activeUsers = data.payload.users;
    const { login: currentLogin } = storeLogin.data.dataUser;
    activeUsers.forEach((item) => {
      console.log(`не в сети ${item.login}`);
      const { login } = item;
      if (login !== currentLogin) {
        const id = getUUID();
        creatUserListItem(constrols.page.main.userList, login, id);
      }
      // const id = getUUID();
      // creatUserListItem(constrols.page.main.userList, login, id);
    });
  },
};

// creatUserListItem(constrols.page.main.userList, 'user-01', 25);
// creatUserListItem(constrols.page.main.userList, 'user-02', 34);

export function setupWebSocketHandlers() {
  ws.on('message', (data) => {
    const handler = messageHandlers[data.type];
    if (handler) {
      handler(data);
    } else {
      console.warn('Неизвестный тип сообщения:', data.type, data);
    }
  });
}
