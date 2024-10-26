
import { dataPets } from "./products.js";

// import { closeMenu } from "./closeMenu.js";

// Модальное окно

function modalCreation (dataUniqueIndex, body, modalPopup, modalBtnClose) {
// function modalCreation (dataUniqueIndex, body, modalPopup, menu, burgerButton, fon) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  // const fonModal = document.createElement("div");
  // fonModal.classList.add('fon')

  const btnClose = document.createElement("div");
  btnClose.classList.add('button')
  btnClose.classList.add('button--close')
  btnClose.classList.add('modal-btn--close')
  btnClose.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="button__svg--close" fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#292929" />
      </svg>
  `

  const modalContainer = document.createElement("div");
  modalContainer.classList.add('modal-container')

  const modalFoto = document.createElement('div')
  modalFoto.classList.add('photo')
  modalFoto.classList.add(`photo--card-${(dataUniqueIndex + 1).toString().padStart(2, '0')}`)  // подкорректировать с padstart
  modalFoto.classList.add('photo--modal') 

  const modalContent = document.createElement("div");
  modalContent.classList.add('modal-content')

  const modalTitle = document.createElement("div");
  modalTitle.classList.add('modal-title')

  const modalTitleName = document.createElement("h3");
  modalTitleName.classList.add('modal-title-name')
  modalTitleName.textContent = `${dataPets[dataUniqueIndex].name}`


  const modalTitleBreed = document.createElement("p");
  modalTitleBreed.classList.add('modal-title-breed')
  modalTitleBreed.textContent = `${dataPets[dataUniqueIndex].type} - ${dataPets[dataUniqueIndex].breed}`

  modalTitle.appendChild(modalTitleName)
  modalTitle.appendChild(modalTitleBreed)

  
  const modalDescription = document.createElement("p");
  modalDescription.classList.add('modal-description')
  modalDescription.textContent = `${dataPets[dataUniqueIndex].description}`

  const modalList = document.createElement('ul')
  modalList.classList.add('modal-list')

  const modalListItemAge = document.createElement('li')
  modalListItemAge.classList.add('modal-list__item')

  const modalListItemAgeTitle = document.createElement('span')
  modalListItemAgeTitle.classList.add('modal-list__item-title')
  modalListItemAgeTitle.classList.add('modal-list__item-title--age')
  modalListItemAgeTitle.textContent = 'Age:'

  const modalListItemAgeContent = document.createElement('span')
  modalListItemAgeContent.classList.add('modal-list__item-content')
  modalListItemAgeContent.textContent = ` ${dataPets[dataUniqueIndex].age}`

  modalListItemAge.appendChild(modalListItemAgeTitle)
  modalListItemAge.appendChild(modalListItemAgeContent)

  modalList.appendChild(modalListItemAge)

  const modalListItemInoculations = document.createElement('li')
  modalListItemInoculations.classList.add('modal-list__item')

  const modalListItemInoculationsTitle = document.createElement('span')
  modalListItemInoculationsTitle.classList.add('modal-list__item-title')
  modalListItemInoculationsTitle.textContent = 'Inoculations:'

  const modalListItemInoculationsContent = document.createElement('span')
  modalListItemInoculationsContent.classList.add('modal-list__item-content')
  modalListItemInoculationsContent.textContent = ` ${dataPets[dataUniqueIndex].inoculations.join(', ')}`

  modalListItemInoculations.appendChild(modalListItemInoculationsTitle)
  modalListItemInoculations.appendChild(modalListItemInoculationsContent)

  const modalListItemDiseases = document.createElement('li')
  modalListItemDiseases.classList.add('modal-list__item')

  const modalListItemDiseasesTitle = document.createElement('span')
  modalListItemDiseasesTitle.classList.add('modal-list__item-title')
  modalListItemDiseasesTitle.textContent = 'Diseases:'

  const modalListItemDiseasesContent = document.createElement('span')
  modalListItemDiseasesContent.classList.add('modal-list__item-content')
  modalListItemDiseasesContent.textContent = ` ${dataPets[dataUniqueIndex].diseases.join(', ')}`

  modalListItemDiseases.appendChild(modalListItemDiseasesTitle)
  modalListItemDiseases.appendChild(modalListItemDiseasesContent)

  const modalListItemParasites = document.createElement('li')
  modalListItemParasites.classList.add('modal-list__item')

  const modalListItemParasitesTitle = document.createElement('span')
  modalListItemParasitesTitle.classList.add('modal-list__item-title')
  modalListItemParasitesTitle.textContent = 'Parasites:'

  const modalListItemParasitesContent = document.createElement('span')
  modalListItemParasitesContent.classList.add('modal-list__item-content')
  modalListItemParasitesContent.textContent = ` ${dataPets[dataUniqueIndex].parasites.join(', ')}`

  modalListItemParasites.appendChild(modalListItemParasitesTitle)
  modalListItemParasites.appendChild(modalListItemParasitesContent)

  modalList.appendChild(modalListItemAge)
  modalList.appendChild(modalListItemInoculations)
  modalList.appendChild(modalListItemDiseases)
  modalList.appendChild(modalListItemParasites)

  modalContent.appendChild(modalTitle)
  modalContent.appendChild(modalDescription)
  modalContent.appendChild(modalList)

  modalContainer.appendChild(modalFoto)
  modalContainer.appendChild(modalContent)

  // modal.appendChild(fonModal)
  modal.appendChild(btnClose)
  modal.appendChild(modalContainer)

//    sliderFilm.append(cardElement);
//    sliderFilm.prepend(cardElement);

  body.appendChild(modal)

  modalPopup = modal // чтобы переменная modal была видна
  modalBtnClose = btnClose // чтобы переменная modal была видна
  // btnCloseModalPopup = btnClose
  // fon = fonModal
  //  return cardElement;
  // btnCloseModalPopup.addEventListener('click', closeMenu)
  
  /************************ */
  /************************ */
  btnClose.addEventListener('click', closeMenu)
  // btnClose.addEventListener('click', function(event) { 
  //     // Клик произошел именно на родительском элементе
  //     // closeMenu()
  //     // console.log(event.target)
  //     closeMenu(menu, burgerButton, body, fon, modalPopup)
  // })

  // // // modal.addEventListener('click', function () {console.log(event.target.conta)})
  
  // Чтобы закрывалось при клике под кнопкой bntClose и слева от нее, когда попадает не на фон а на родителя
  modal.addEventListener('click', function(event) { 
      if (event.target === this) {
        // Клик произошел именно на родительском элементе
        // closeMenu()
        closeMenu()
      } 
  })
  // // Чтобы закрывалось при клике под кнопкой bntClose и слева от нее, когда попадает не на фон а на родителя
  // modal.addEventListener('click', function(event) { 
  //     if (event.target === this) {
  //       // Клик произошел именно на родительском элементе
  //       // closeMenu()
  //       closeMenu(menu, burgerButton, body, fon, modalPopup)
  //     } 
  // })

  /*********************************************** */

  // modal.addEventListener('click', function(event) {
  //     if (event.target === this) {
  //       // Клик произошел именно на родительском элементе
  //       console.log('Клик произошел на родителе');
  //     } else {
  //       // Клик произошел на дочернем элементе
  //       console.log('Клик произошел на дочернем элементе');
  //     }
  // })

  setTimeout(function() { // проявляю модалку
      modal.classList.add('modal--active')
      modalPopup = modal
  }, 0);

}

export { modalCreation }