/**** Музыка ******************************************* */
/**** Музыка ******************************************* */

// const musicBase = document.querySelector('.baseMusic')
const musicBase = new Audio();
musicBase.src = "./src/assets/audio/Snake-muzyka-06-2.mp3"


musicBase.pause()
// Устанавливаю уровень звука (от 0 до 1)
musicBase.volume = 0.3;
musicBase.playbackRate = 0.8;

// const musicFood = document.querySelector('.foodMusic')
const musicFood = new Audio();
musicFood.src = "./src/assets/audio/Snake-am-15.mp3"
musicFood.pause()
musicFood.volume = 0.8; 

// const musicBorder = document.querySelector('.borderMusic')
const musicBorder = new Audio();
musicBorder.src = "./src/assets/audio/Snake-wall-09.mp3"
musicBorder.pause()
musicBorder.volume = 0.8; 

// const musicStop = document.querySelector('.stopMusic')
const musicStop = new Audio();
musicStop.src = "./src/assets/audio/Snake-stop-01.mp3"
musicStop.pause()
musicStop.volume = 0.8; 

// const musicTail = document.querySelector('.tailMusic')
const musicTail = new Audio();
musicTail.src = "./src/assets/audio/Snake-am-16.mp3"
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