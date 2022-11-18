import { City } from '../types/city';
import { Location } from '../types/location';

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

const AVATARS = [
  'img/avatar-max.jpg',
  'img/avatar-angelina.jpg'
];

const COMMENTS = [
  'A quiet cozy and picturesque apartment that hides behind a river by the unique lightness of Amsterdam.',
  'The building is green and from 18th century.',
  'It\'s OK',
];

const ADRESSES: Location[] = [
  {latitude: 52.3909553943508, longitude: 4.85309666406198},
  {latitude: 52.3609553943508, longitude: 4.85309666406198},
  {latitude: 52.3909553943508, longitude: 4.929309666406198},
  {latitude: 52.3809553943508, longitude: 4.939309666406198}
];

const DEFAULT_CITY : City = {
  name: 'Amsterdam',
  location: {
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
    zoom: 11
  }
};

export {DEFAULT_CITY, TITLES, PICTURES, ADRESSES, COMMENTS, AVATARS};
