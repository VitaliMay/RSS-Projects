export const dataStore = {
  formCreateCarStore: {
    colorCar: null,
    textCar: null,
  },
};

export const stateData = {
  stateSvgColor: '#000000',
  stateCreateText: '',
  stateCreateColor: '#000000',
  stateCreateDisabled: false,
  stateUpdateText: '',
  stateUpdateColor: '#000000',
  stateUpdateDisabled: true,
};

export function cleanStateData() {
  stateData.stateSvgColor = '#000000';
  stateData.stateCreateText = '';
  stateData.stateCreateColor = '#000000';
  stateData.stateUpdateText = '';
  stateData.stateUpdateColor = '#000000';
  stateData.stateCreateDisabled = false;
  stateData.stateUpdateDisabled = false;
}
