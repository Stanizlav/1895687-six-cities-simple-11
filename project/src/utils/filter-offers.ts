import Advert from '../types/advert';
import { CitiesName } from '../types/cities-name';

export const filterOffers = (offers:Advert[], city: CitiesName):Advert[] =>
  offers.filter((advert) => advert.city.name === city);
