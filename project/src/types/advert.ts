import Accomodation from './accomodation';
import City from './city';
import Location from './location';
import Person from './person';

type Advert = {
  id: number;
  title: string;
  city: City;
  location: Location;
  previewImage: string;
  isPremium: boolean;
  price: number;
  type: Accomodation;
  rating: number;
  bedrooms: number;
  description: string;
  goods: string[];
  host: Person;
  images: string[];
  maxAdults: number;
}

export default Advert;
