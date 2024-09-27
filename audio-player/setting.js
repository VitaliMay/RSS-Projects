
const settingClassArr = [
  { class: 'btn--repeat', 
    src: '../assets/svg/icons-repeat-60.png',
  }, 
  { class: 'btn--repeatOne', 
    src: '../assets/svg/icon-repeatOne-60.png',
  }, 
  { class: 'btn--mix', 
    src: '../assets/svg/icons-mix-60.png',
  }, 
];

// export { settingClassArr }

function createImageChanger() {
  let currentImageIndex = 2;
  let prevImageIndex = 1;
  const totalImages = settingClassArr.length;

  function changeBackground(backgroundElement) {

    backgroundElement.classList.remove(settingClassArr[prevImageIndex - 1].class)
    backgroundElement.classList.add(settingClassArr[currentImageIndex - 1].class)
    prevImageIndex = currentImageIndex;
    currentImageIndex += 1;
    if (currentImageIndex > totalImages) {
      currentImageIndex = 1;
    }
  }

  return changeBackground;
}

export { createImageChanger }

