import { createEl, body } from '../../utils/elementUtils';
import createButton from '../../components/button/button';
import constrols from '../../store/constrols';

const getContextMenu = (() => {
  let instance;
  return () => {
    if (!instance) {
      instance = createEl({
        classes: ['context-menu'],
        parent: body,
      });

      const editButton = createButton('Edit', instance, ['button_max']);
      const deleteButton = createButton('Delete', instance, ['button_max']);

      constrols.contextMenu.menu = instance;
      constrols.contextMenu.editButton = editButton;
      constrols.contextMenu.deleteButton = deleteButton;

      document.addEventListener('click', (event) => {
        if (!instance.contains(event.target)) {
          instance.style.display = 'none';
        }
      });
    }
    return instance;
  };
})();

export default getContextMenu;
