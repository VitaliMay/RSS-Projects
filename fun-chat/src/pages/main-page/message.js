import constrols from '../../store/constrols';
import { createEl } from '../../utils/elementUtils';
import getContextMenu from './constext-menu';

// export function createMessageSend(parent, text) {
export function createMessageSend(parent, text, addClass = 'message-item_send') {
  const messageSend = createEl({ classes: ['message-item', addClass], parent });
  // const messageSend = createEl({ classes: ['message-item', 'message-item_send'], parent });

  const messageHeader = createEl({ classes: ['message-item__header'], parent: messageSend });
  const messageHeaderFrom = createEl({ classes: ['message-item__from'], text: 'You', parent: messageHeader });
  const messageHeaderTime = createEl({
    classes: ['message-item__time'],
    text: new Date().toLocaleString(),
    // text: '21.04.2025, 14:23:15',
    parent: messageHeader,
  });

  const messageMain = createEl({ classes: ['message-item__text'], text, parent: messageSend });

  const messageFooter = createEl({ classes: ['message-item__footer'], parent: messageSend });
  const messageFooterEdit = createEl({ classes: ['message-item__edit'], text: 'edited', parent: messageFooter });
  const messageFooterStatus = createEl({ classes: ['message-item__status'], text: 'read', parent: messageFooter });

  if (messageSend.classList.contains('message-item_send')) {
    messageSend.addEventListener('contextmenu', (event) => {
      event.preventDefault();

      const contextMenu = getContextMenu();
      contextMenu.style.display = 'flex';
      contextMenu.style.left = `${event.clientX}px`;
      contextMenu.style.top = `${event.clientY}px`;

      const { menu, editButton, deleteButton } = constrols.contextMenu;
      editButton.onclick = () => console.log(text);
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

export function createMessageReceive(parent) {}
