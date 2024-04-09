const carMark = ['Toyota','Reno', 'Pegeot', 'BMW', 'Audi', 'Ford',  'Geely',' Haval','Honda', 'Hyundai', 'Kia','Lada', 'Mazda', 'Mersedes']
const carModel = ['Bombel', 'CRV', 'G8', 'Kalina', 'Daster',  'Rash','5','3', '9', 'TT','Scope', 'A5', 'CLK']

export function generateCarName () {
  const carMarkIndex = Math.floor(Math.random() * (carMark.length));
  const carModelIndex = Math.floor(Math.random() * (carModel.length));
  const carName = `${carMark[carMarkIndex]} ${carModel[carModelIndex]}`
  return carName
}

export function hexaColor () {
  const hexaDecimal = () => Math.floor(Math.random()*(256)).toString(16);
  return `#${hexaDecimal()}${hexaDecimal()}${hexaDecimal()}`
}

export function idCounter(maxKeyValue) {
  let counter = maxKeyValue || 0; // Начальное значение с максимальным ключом (беру из fetch начальной загрузки) или 0
  return () => {
    counter += 1;
    return counter;
  };
}