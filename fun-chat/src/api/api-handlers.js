import { ws } from './api';
import constrols from '../store/constrols';
import storeLogin from '../store/store';
import { creatUserListItem } from '../pages/main-page/main-page';
import { createEl, getUUID, removeAllChild } from '../utils/elementUtils';
import { createMessageSend } from '../pages/main-page/message';

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
    if (constrols.isFirstConnection) {
      handleLoginSuccess(data.payload.user);

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

      constrols.isFirstConnection = false;
    }
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
    const { currentUserLogin, currentUserCopy } = constrols.page.main;

    console.log(currentUserLogin, currentUserCopy);
    activeUsers.forEach((item) => {
      console.log(`в сети ${item.login}`);
      const { login } = item;
      if (login !== currentLogin) {
        const id = getUUID();
        const userListItem = creatUserListItem(constrols.page.main.userList, login, id);
        userListItem.classList.add('list-item_active');
      }
      if (currentUserLogin === login) {
        currentUserCopy.classList.add('list-item_active');
      }
    });
  },

  USER_INACTIVE: (data) => {
    const activeUsers = data.payload.users;
    const { login: currentLogin } = storeLogin.data.dataUser;
    const { currentUserLogin, currentUserCopy } = constrols.page.main;
    console.log(constrols.page.main.userList);
    activeUsers.forEach((item) => {
      console.log(`не в сети ${item.login}`);
      const { login } = item;
      if (login !== currentLogin) {
        const id = getUUID();
        creatUserListItem(constrols.page.main.userList, login, id);
      }
      if (currentUserLogin === login) {
        currentUserCopy.classList.remove('list-item_active');
      }
      // const id = getUUID();
      // creatUserListItem(constrols.page.main.userList, login, id);
    });
  },

  MSG_SEND: (data) => {
    const { from, to, text } = data.payload.message;
    const { login: currentLogin } = storeLogin.data.dataUser;
    const { messageWrapper, currentUserLogin } = constrols.page.main;
    // console.log(data.payload.message.text);
    console.log(`from ${from} to ${to} text ${text}`);

    if (from === currentLogin && to === currentUserLogin) {
      createMessageSend(messageWrapper, text);
    }
    if (to === currentLogin && from === currentUserLogin) {
      createMessageSend(messageWrapper, text, 'message-item_receive');
    }

    // createMessageSend(messageWrapper, 'Привет');
    //   createMessageSend(messageWrapper, 'Ещё один Привет', 'message-item_receive');
    //   createMessageSend(messageWrapper, 'Мой привет тебе в ответ');

    // {
    //   id: string,
    //   type: "MSG_SEND",
    //   payload: {
    //     message: {
    //       id: string,
    //       from: string,
    //       to: string,
    //       text: string,
    //       datetime: number,
    //       status: {
    //         isDelivered: boolean,
    //         isReaded: boolean,
    //         isEdited: boolean,
    //       }
    //     }
    //   }
    // }
  },

  MSG_FROM_USER: (data) => {
    const { messages } = data.payload;
    const { login: currentLogin } = storeLogin.data.dataUser;
    const { messageWrapper, currentUserLogin } = constrols.page.main;
    console.log(messages);

    messages.forEach((item) => {
      const { from, to, text } = item;
      if (from === currentLogin && to === currentUserLogin) {
        createMessageSend(messageWrapper, text);
      }
      if (to === currentLogin && from === currentUserLogin) {
        createMessageSend(messageWrapper, text, 'message-item_receive');
      }
    });

    if (messages.length === 0) {
      createEl({
        parent: messageWrapper,
        classes: ['message-item__text'],
        text: 'This is the beginning of the dialogue',
      });
    }
    // console.log(`from ${from} to ${to} text ${text}`);

    // if (from === currentLogin && to === currentUserLogin) {
    //   createMessageSend(messageWrapper, text);
    // }
    // if (to === currentLogin && from === currentUserLogin) {
    //   createMessageSend(messageWrapper, text, 'message-item_receive');
    // }
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
