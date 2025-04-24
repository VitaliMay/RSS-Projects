import constrols from '../../store/constrols';
import { createEl } from '../../utils/elementUtils';
import getContextMenu from './constext-menu';

/* **************************************************** */

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date
    .toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // 24-часовой формат
    })
    .replace(',', ''); // не нравится запятая
}

/* **************************************************** */

// export function createMessageSend(parent, text) {
export function createMessageSend(parent, text, addClass = 'message-item_send', option = {}) {
  // const { from, to, text, datetime, status } = option;

  const { from, to = '', datetime, status } = option || {};
  // const { from = 'Unknown', to = '', datetime = new Date(), status = 'sent' } = option || {};

  const sender = (addClass || '') === 'message-item_send' ? 'You' : from;
  const timeLocale = formatTimestamp(datetime);
  const isEditStatus = status.isEdited ? 'edited' : '';
  const isDeliveredStatus = status.isDelivered ? 'delivered' : 'undelivered';
  const isReadStatus = status.isReaded ? 'read' : 'unread';

  const messageSend = createEl({ classes: ['message-item', addClass], parent });
  // const messageSend = createEl({ classes: ['message-item', 'message-item_send'], parent });

  const messageHeader = createEl({ classes: ['message-item__header'], parent: messageSend });
  const messageHeaderFrom = createEl({ classes: ['message-item__from'], text: sender, parent: messageHeader });
  const messageHeaderTime = createEl({
    classes: ['message-item__time'],
    text: timeLocale,
    // text: new Date().toLocaleString(),
    // text: '21.04.2025, 14:23:15',
    parent: messageHeader,
  });

  const messageMain = createEl({ classes: ['message-item__text'], text, parent: messageSend });

  const messageFooter = createEl({ classes: ['message-item__footer'], parent: messageSend });

  const messageFooterEdit = createEl({ classes: ['message-item__edit'], text: '', parent: messageFooter });
  const messageFooterDelivered = createEl({
    classes: ['message-item__status'],
    text: isDeliveredStatus,
    parent: messageFooter,
  });

  const messageFooterReaded = createEl({
    classes: ['message-item__status'],
    text: isReadStatus,
    parent: messageFooter,
  });

  if (addClass === 'message-item_send') {
    messageFooterEdit.textContent = isEditStatus;
  }

  if (messageSend.classList.contains('message-item_send')) {
    messageSend.addEventListener('contextmenu', (event) => {
      event.preventDefault();

      const contextMenu = getContextMenu();
      contextMenu.style.display = 'flex';
      contextMenu.style.left = `${event.clientX}px`;
      contextMenu.style.top = `${event.clientY}px`;

      const { menu, editButton, deleteButton } = constrols.contextMenu;
      editButton.onclick = () => {
        // console.log(text);
        constrols.page.main.currentEditMessage = messageSend;
        constrols.page.main.currentEditMessageMain = messageMain;
        constrols.page.main.inputMessage.value = text;
        console.log(constrols.page.main.inputMessage);
      };
      deleteButton.onclick = () => {
        messageSend.remove();
        menu.style.display = 'none';
      };
      // deleteButton.onclick = () => console.log(messageHeaderTime.textContent);
    });
  }

  // const { editButton, deleteButton } = constrols.contextMenu;

  // if (editButton) {
  //   editButton.onclick = console.log('Привет edit');
  // }
}

// export function createMessageSend(parent, text, addClass = 'message-item_send', option = {}) {
//   // const {from, to, text}

//   const messageSend = createEl({ classes: ['message-item', addClass], parent });
//   // const messageSend = createEl({ classes: ['message-item', 'message-item_send'], parent });

//   const messageHeader = createEl({ classes: ['message-item__header'], parent: messageSend });
//   const messageHeaderFrom = createEl({ classes: ['message-item__from'], text: 'You', parent: messageHeader });
//   const messageHeaderTime = createEl({
//     classes: ['message-item__time'],
//     text: new Date().toLocaleString(),
//     // text: '21.04.2025, 14:23:15',
//     parent: messageHeader,
//   });

//   const messageMain = createEl({ classes: ['message-item__text'], text, parent: messageSend });

//   const messageFooter = createEl({ classes: ['message-item__footer'], parent: messageSend });
//   const messageFooterEdit = createEl({ classes: ['message-item__edit'], text: 'edited', parent: messageFooter });
//   const messageFooterStatus = createEl({ classes: ['message-item__status'], text: 'read', parent: messageFooter });

//   if (messageSend.classList.contains('message-item_send')) {
//     messageSend.addEventListener('contextmenu', (event) => {
//       event.preventDefault();

//       const contextMenu = getContextMenu();
//       contextMenu.style.display = 'flex';
//       contextMenu.style.left = `${event.clientX}px`;
//       contextMenu.style.top = `${event.clientY}px`;

//       const { menu, editButton, deleteButton } = constrols.contextMenu;
//       editButton.onclick = () => {
//         // console.log(text);
//         constrols.page.main.currentEditMessage = messageSend;
//         constrols.page.main.currentEditMessageMain = messageMain;
//         constrols.page.main.inputMessage.value = text;
//         console.log(constrols.page.main.inputMessage);
//       };
//       deleteButton.onclick = () => {
//         messageSend.remove();
//         menu.style.display = 'none';
//       };
//       // deleteButton.onclick = () => console.log(messageHeaderTime.textContent);
//     });
//   }

//   // const { editButton, deleteButton } = constrols.contextMenu;

//   // if (editButton) {
//   //   editButton.onclick = console.log('Привет edit');
//   // }
// }

export function createMessageReceive(parent) {}
