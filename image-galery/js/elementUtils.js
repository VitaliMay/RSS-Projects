
function createEl (options) {
  const { tag = 'div', text = '', classes = [], attributes = {}, styles = {}} = options;

  const element = document.createElement(tag);
  element.textContent = text;
  element.classList.add(...classes);

  if (attributes) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }

  if (styles) {
    Object.keys(styles).forEach(key => {
      element.style[key] = styles[key];
    });
  }

  return element
}

/*************************************************** */
// Параметры для создания элементов

const optionsLink = {
  tag: 'a',
  classes: ['cover'],
  attributes: {
    'target': '_blank',
  }
};

const optionsLinkInnerRatio = {
  classes: ['cover-inner', 'cover-inner--ratio'],
};

const optionsLinkContent = {
  classes: ['cover-content'],
}

/********************************************************* */
// удаление всех карточек со страницы (удаления у элемента всех дочерних)

function removeAllCard(element) {
  while (element.firstElementChild) {
      element.removeChild(element.firstElementChild)
  }
}

/********************************************************* */


export { createEl, optionsLink, optionsLinkInnerRatio, optionsLinkContent, removeAllCard }