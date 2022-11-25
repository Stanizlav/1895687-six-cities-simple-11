import { RAITING_MAX } from '../consts';
import { Accomodation } from '../types/accomodation';
import Advert from '../types/advert';
import { cities } from '../utils/cities';
import { ADRESSES, PICTURES, TITLES } from './consts';

const
  OFFERS_COUNT = 24,
  MIN_PRICE = 50,
  PRICE_AMPLITUDE = 200;

const generateAnAdvert = (id = 0):Advert => {
  const titleIndex = id % TITLES.length;
  const pictureIndex = id % PICTURES.length;
  const citiesIndex = id % cities.length;
  const adressesIndex = id % ADRESSES[citiesIndex].length;
  const generatedPrice = PRICE_AMPLITUDE * Math.random() + MIN_PRICE;
  const mark = RAITING_MAX * Math.random();

  const advert: Advert = {
    id,
    title: TITLES[titleIndex],
    city: cities[citiesIndex],
    location: ADRESSES[citiesIndex][adressesIndex],
    previewImage: `img/${PICTURES[pictureIndex]}.jpg`,
    isPremium: Math.random() > 0.5,
    price: Math.floor(generatedPrice),
    accomodation: Accomodation.Apartment,
    rating: mark
  };
  return advert;
};

export const offers: Advert[] = Array.from(Array(OFFERS_COUNT), (item,index)=>generateAnAdvert(index));
