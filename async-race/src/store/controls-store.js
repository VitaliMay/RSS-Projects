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
  list: null,
};

export const winnersTotal = {
  title: null,
  table: null,
  totalWinners: 1,
};

// if (controlsBtnState.formSelect.buttonSendCreateCar) {
//   controlsBtnState.formSelect.buttonSendCreateCar.addEventListener('click', () => {
//     console.log('Привет');
//     controlsBtnState.formSelect.buttonSendCreateCar.disabled = true;
//   });
// }

/** ********************************************* */
// Будущий TS

// interface FormControls {
//   inputText: HTMLElement | null;
//   inputColor: HTMLElement | null;
//   buttonSendCreateCar: HTMLElement | null;
// }

// interface ControlsBtnState {
//   buttonGarage: HTMLElement | null;
//   buttonWinners: HTMLElement | null;
//   // ... другие поля
//   formCreat: FormControls;
//   formSelect: FormControls;
//   pagination: {
//     title: HTMLElement | null;
//     buttonPrev: HTMLElement | null;
//     buttonNext: HTMLElement | null;
//   };
// }

// const controlsBtnState: ControlsBtnState = {
//   // ...
// };
