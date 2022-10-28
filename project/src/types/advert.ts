import { Accomodation } from '../types/accomodation';

type Advert = {
  id: number;
  title: string;
  picture: string;
  isPremium: boolean;
  price: number;
  accomodation: Accomodation;
  rating: number;
}

export default Advert;
