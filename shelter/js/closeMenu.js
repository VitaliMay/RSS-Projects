
function closeMenu(menu, burgerButton, body, fon, modalPopup) {

  if (menu && menu.classList) {
    menu.classList.remove('open');
  }
  if (burgerButton && burgerButton.classList) {
    burgerButton.classList.remove('rotade');
  }
  if (body && body.classList) {
    body.classList.remove('lock');
  }
  if (fon) {
  // if (fon && fon.classList) {
    fon.classList.remove('work');
  }

  // if (modalPopup && modalPopup.classList) {
  if (modalPopup) {
      modalPopup.classList.remove('modal--active')
      setTimeout(function() { 
          modalPopup.remove()
          // modalPopup = modal
      }, 400);
      // modalPopup.remove()
  }
  
  //modal.classList.remove(classModalCard);
  // modal.classList.remove(modal.classList.item(1));
  // modal.classList.remove(modal.classList.item(1));
  /* прописано два раз так как надо удалять два класса*/
  /* второй класс view понадобился чтобы было удобнее делать медиазапросы */


//     modal.classList.remove(modal.addEventListener('click', function(event) {
//     let clickedClass = event.target.className.slice(-4);
//     console.log(clickedClass);
//   }));
  
  
  //modal.addEventListener('click', el => modal.classList.remove(el.target.className.slice(-4)))

}

export { closeMenu }



/************************************************ */
/************************************************ */
/************************************************ */


// Для отслеживания появления нового элемента в DOM можно использовать MutationObserver. MutationObserver - это API, предоставляемое современными браузерами для обнаружения изменений в DOM. Он позволяет отслеживать добавление новых узлов в DOM, что в свою очередь позволяет реагировать на появление новых элементов.

// Вот пример использования MutationObserver для отслеживания появления новых элементов:


// Создание экземпляра MutationObserver с функцией обратного вызова
const observer = new MutationObserver(function(mutationsList, observer) {
  for(let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // Обработка появления новых элементов в DOM
      // Например, навешивание слушателя на кнопку закрытия модального окна
      const newModalBtnClose = document.querySelector('.modal-btn-close');
      if (newModalBtnClose) {
        newModalBtnClose.addEventListener('click', function(event) {
          closeMenu(menu, burgerButton, body, fon, modalPopup);
        });
      }
    }
  }
});

// Настройка экземпляра для отслеживания добавления элементов в DOM
const config = { childList: true, subtree: true };
observer.observe(document.body, config); // Начать отслеживание изменений в body (вы можете указать другой корневой элемент)

// Для остановки отслеживания
// observer.disconnect();

// В этом примере MutationObserver отслеживает изменения внутри document.body (или любого другого указанного узла) и реагирует на добавление новых элементов (событие childList). Когда обнаруживается добавление новых элементов, вы можете выполнять необходимые действия, такие как навешивание слушателей событий на эти новые элементы.

// Таким образом, когда новый элемент, такой как модальное окно или его кнопка закрытия, добавляется в DOM, можно реагировать на это с помощью MutationObserver и выполнить необходимые действия.