export const controlsBtnState = {
  buttonGarage: null,
  buttonWinners: null,
  titleGarage: null,
  startRaceButton: null,
  resetRaceButton: null,
  svgModel: null,
  creat100Cars: null,
  formCreatBlock: null,
  formCreat: {
    inputText: null,
    inputColor: null,
    buttonSendCreateCar: null,
  },
  formSelectBlock: null,
  formSelect: {
    inputText: null,
    inputColor: null,
    buttonSendCreateCar: null,
  },
  chooseCarName: null,
  btnSelectListItem: null,
  svgSelectCar: null,
  selectTrack: null,
  infoCarNameSelectCar: null,
  deleteBtnSelectCar: null,
  pagination: {
    title: null,
    buttonPrev: null,
    buttonNext: null,
  },
};

export const currentPage = {
  numberCurrentPage: 1,
  totalCars: 4,
  winner: {
    id: null,
    name: null,
    time: null,
  },
  isRace: false,
};

// if (controlsBtnState.formSelect.buttonSendCreateCar) {
//   controlsBtnState.formSelect.buttonSendCreateCar.addEventListener('click', () => {
//     console.log('Привет');
//     controlsBtnState.formSelect.buttonSendCreateCar.disabled = true;
//   });
// }
