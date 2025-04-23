import './main-page.scss';

import { createEl, removeAllChild } from '../../utils/elementUtils';
import createButton from '../../components/button/button';
import constrols from '../../store/constrols';

import { createMessageSend } from './message';

const createMainPageWrapper = (parent) => {
  const mainPageWrapper = createEl({ classes: ['main-wrapper'], parent });
  constrols.page.main.wrapper = mainPageWrapper;

  const usersBlock = createEl({ classes: ['users-block'], parent: mainPageWrapper });

  const inputSearch = createEl({
    tag: 'input',
    classes: ['search-input', 'login-input'],
    parent: usersBlock,
    attributes: {
      name: 'search',
      type: 'search',
      placeholder: 'Search...',
    },
  });
  constrols.page.main.inputSearch = inputSearch;

  const userList = createEl({ tag: 'ul', classes: ['list'], parent: usersBlock });
  constrols.page.main.userList = userList;

  const messageBlock = createEl({ classes: ['message-block'], parent: mainPageWrapper });
  constrols.page.main.messageBlock = messageBlock;

  const currentUserInfo = createEl({ classes: ['current-user'], parent: messageBlock });
  constrols.page.main.currentUserInfo = currentUserInfo;

  const messageWrapper = createEl({ classes: ['message-wrapper'], parent: messageBlock });
  constrols.page.main.messageWrapper = messageWrapper;

  createMessageSend(messageWrapper, 'Привет');
  // createMessageSend(messageWrapper, 'Привет', 'message-item_send');
  createMessageSend(messageWrapper, 'Ещё один Привет', 'message-item_receive');
  createMessageSend(messageWrapper, 'Мой привет тебе в ответ');

  createFormMessage(null);
  // constrols.page.main.messageBlock.append(constrols.page.main.formMessage);
};

function createFormMessage(parent) {
  const formMessage = createEl({ tag: 'form', classes: ['form-message'], parent });
  constrols.page.main.formMessage = formMessage;

  const inputMessage = createEl({
    tag: 'textarea',
    classes: ['input-message', 'login-input'],
    parent: formMessage,
    attributes: { placeholder: 'Send message', autocomplete: 'off' },
  });
  constrols.page.main.inputMessage = inputMessage;

  const buttonSendMessage = createButton('Send', formMessage, [], 'submit');
  buttonSendMessage.disabled = true;
  constrols.page.main.buttonSendMessage = buttonSendMessage;

  inputMessage.addEventListener('input', () => {
    if (inputMessage.value.length > 0) {
      buttonSendMessage.disabled = false;
    } else {
      buttonSendMessage.disabled = true;
    }
  });
}

const creatUserListItem = (parent, text, id) => {
  const userListItem = createEl({
    tag: 'li',
    classes: ['list-item'],
    // classes: ['list-item', 'list-item_active'],
    parent,
    text,
    attributes: { id },
  });

  userListItem.addEventListener('click', () => {
    const listItemCopy = userListItem.cloneNode(true);
    const { userList, currentUserInfo, currentUser } = constrols.page.main;
    // constrols.page.main.currentUserInfo.append(listItemCopy);
    removeAllChild(currentUserInfo);
    currentUserInfo.append(listItemCopy);
    // if (currentUser) {
    //   userList.append(currentUser);
    // }
    // currentUserInfo.append(userListItem);
    constrols.page.main.currentUser = userListItem;
    constrols.page.main.currentUserLogin = userListItem.textContent;
    constrols.page.main.currentUserID = userListItem.id;

    console.log(constrols.page.main.currentUserID);

    constrols.page.main.messageBlock.append(constrols.page.main.formMessage);
  });
  return userListItem;
};

// export default createMainPageWrapper;

export { createMainPageWrapper, creatUserListItem };
