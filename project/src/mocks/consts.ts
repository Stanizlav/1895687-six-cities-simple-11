import { City } from '../types/city';
import { Point } from '../types/point';

const TITLES = [
  'Wood and stone place',
  'Nice, cozy, warm big bed apartment',
  'Canal View Prinsengracht',
  'Beautiful & luxurious apartment at great location'
];

const PICTURES = [
  'apartment-01',
  'apartment-02',
  'apartment-03'
];

const ADRESSES: Point[] = [
  {lat: 52.3909553943508, lng: 4.85309666406198},
  {lat: 52.3609553943508, lng: 4.85309666406198},
  {lat: 52.3909553943508, lng: 4.929309666406198},
  {lat: 52.3809553943508, lng: 4.939309666406198}
];

const DEFAULT_CITY : City = {
  title: 'Amsterdam',
  lat: 52.3909553943508,
  lng: 4.85309666406198,
  zoom: 11
};

export {DEFAULT_CITY, TITLES, PICTURES, ADRESSES};
