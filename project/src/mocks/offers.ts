import { Accomodation } from '../types/accomodation';
import Advert from '../types/advert';
import { PICTURES, TITLES } from './consts';

const
  OFFERS_COUNT = 4,
  MIN_PRICE = 50,
  PRICE_AMPLITUDE = 200,
  MAX_MARK = 5;

const generateAnAdvert = (id = 0):Advert => {
  const titleIndex = id % TITLES.length;
  const pictureIndex = id % PICTURES.length;
  const generatedPrice = PRICE_AMPLITUDE * Math.random() + MIN_PRICE;
  const mark = MAX_MARK * Math.random();

  const advert: Advert = {
    id,
    title: TITLES[titleIndex],
    picture: `img/${PICTURES[pictureIndex]}.jpg`,
    isPremium: Math.random() > 0.5,
    price: Math.floor(generatedPrice),
    accomodation: Accomodation.Apartment,
    rating: mark
  };
  return advert;
};

export const offers: Advert[] = Array.from(Array(OFFERS_COUNT), (item,k)=>generateAnAdvert(k));
