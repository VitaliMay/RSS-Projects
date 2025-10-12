import { createCounterID, shuffleArray } from '../utils/elementUtils';

const carMark = [
  'Toyota',
  'Reno',
  'Pegeot',
  'BMW',
  'Audi',
  'Ford',
  'Geely',
  'Haval',
  'Honda',
  'Hyundai',
  'Kia',
  'Lada',
  'Mazda',
  'Mersedes',
  'Tesla',
];
const carModel = [
  'Bombel',
  'CRV',
  'G8',
  'Kalina',
  'Daster',
  'Rash',
  '5',
  '3',
  'RAF-4',
  'TT',
  'Scope',
  'A5',
  'CLK',
  'Bla-Bla',
  'Fiesta',
  'Turbo Diesel',
  'Megan',
  'Fantom',
];

export function getRandomCarName() {
  const carModelShuffle = shuffleArray(carModel);
  const carMarkShuffle = shuffleArray(carMark);
  const carMarkIndex = Math.floor(Math.random() * carMark.length);
  const carModelIndex = Math.floor(Math.random() * carModel.length);
  const carName = `${carMarkShuffle[carMarkIndex]} ${carModelShuffle[carModelIndex]}`;
  return carName;
}

export const counterID = createCounterID(0);
