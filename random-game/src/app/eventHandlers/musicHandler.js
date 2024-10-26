/**** Музыка ******************************************* */
/**** Музыка ******************************************* */

const srcSound = {
  baseMusic: './src/assets/audio/Snake-muzyka-06-2.mp3',
  foodMusic: './src/assets/audio/Snake-am-15.mp3',
  borderMusic: './src/assets/audio/Snake-wall-09.mp3',
  stopMusic: './src/assets/audio/Snake-stop-01.mp3',
  tailMusic: './src/assets/audio/Snake-am-16.mp3',
}

const musicBase = new Audio();
musicBase.src = srcSound.baseMusic


musicBase.pause()
// Устанавливаю уровень звука (от 0 до 1)
musicBase.volume = 0.3;
musicBase.playbackRate = 0.8;

const musicFood = new Audio();
musicFood.src = srcSound.foodMusic
musicFood.pause()
musicFood.volume = 0.8; 

const musicBorder = new Audio();
musicBorder.src = srcSound.borderMusic
musicBorder.pause()
musicBorder.volume = 0.8; 

const musicStop = new Audio();
musicStop.src = srcSound.stopMusic
musicStop.pause()
musicStop.volume = 0.8; 

const musicTail = new Audio();
musicTail.src = srcSound.tailMusic
musicTail.pause()
musicTail.volume = 0.8; 

/********************************* */

const btnSound = document.querySelector('.btn_Sound')

btnSound.addEventListener('click', soundOnOff)
// пробую разобраться с iPhone
// btnSound.addEventListener("touchstart", soundOnOff, { passive: true });
// btnSound.addEventListener("touchend", soundOnOff, { passive: true });

function soundOnOff() {
  btnSound.classList.toggle('btn_Sound--mute')

  if (btnSound.classList.contains('btn_Sound--mute')) {
    musicBase.volume = 0;
    musicFood.volume = 0; 
    musicBorder.volume = 0; 
    musicTail.volume = 0;
    musicStop.volume = 0; 
  }
  else {
    musicBase.volume = 0.3;
    musicFood.volume = 0.8; 
    musicBorder.volume = 0.8; 
    musicTail.volume = 0.8; 
    musicStop.volume = 0.8; 
  }
}

export { musicBase, musicFood, musicTail, musicBorder, musicStop }