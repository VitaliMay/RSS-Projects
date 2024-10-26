
const varDOM = {
  start: document.querySelector('.color-test'),

  gameScoreHtml: document.querySelector('.title'),
  immunityScoreHtml: document.querySelector('.stat__score--immunity'),
  speedScoreHtml: document.querySelector('.stat__score--speed'),

  btnRules: document.querySelector('.btn_Rules'),
  btnSetting: document.querySelector('.btn_Setting'),
  btnStop: document.querySelector('.btn_Stop'),

  testInput: document.querySelector('.testInput'),

  fon: document.querySelector('.fon'),
  modalLogin: document.querySelector('.modal-login'),

  modalSetting: document.querySelector('.modal-setting'),
  modalRules: document.querySelector('.modal-rules'),

  fonSetting: document.querySelector('.fon--setting'),

  modalBtnCross: [...document.querySelectorAll('.modal-btn-cross')],

  modalBtnCrossSetting: [...document.querySelectorAll('.modal-btn-cross--setting')],
}

export { varDOM }


