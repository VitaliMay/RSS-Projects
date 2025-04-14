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
    stateDisabled: false,
  },
  formSelectBlock: null,
  formSelect: {
    inputText: null,
    inputColor: null,
    buttonSendCreateCar: null,
    stateDisabled: true,
  },
  chooseCarName: null,
  btnSelectListItem: null,
  svgSelectCar: null,
  selectTrack: null,
  selectID: null,
  infoCarNameSelectCar: null,
  deleteBtnSelectCar: null,
  pagination: {
    title: null,
    buttonPrev: null,
    buttonNext: null,
  },
};

export const currentPage = {
  isFirstLoad: true,
  numberCurrentPage: 1,
  dataTotalGarage: null,
  totalCars: 4,
  winner: {
    id: null,
    name: null,
    time: null,
  },
  isRace: false,
  list: null,
};

export const winnersPage = {
  isFirstLoad: true,
  title: null,
  totalWinners: 1,
  dataTotalWinners: null,
  numberCurrentPage: 1,
  pagination: {
    title: null,
    buttonPrev: null,
    buttonNext: null,
  },
  table: {
    wrapper: null,
    title: null,
    list: null,
  },
  isWinsUP: true,
  isTimeUP: true,
  currentSort: {
    sort: 'time',
    order: 'ASC',
  },
};

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
