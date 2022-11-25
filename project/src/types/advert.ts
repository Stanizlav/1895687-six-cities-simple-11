import { Accomodation } from '../types/accomodation';
import { City } from './city';
import { Location } from './location';

type Advert = {
  id: number;
  title: string;
  city: City;
  location: Location;
  previewImage: string;
  isPremium: boolean;
  price: number;
  accomodation: Accomodation;
  rating: number;
}

export default Advert;
