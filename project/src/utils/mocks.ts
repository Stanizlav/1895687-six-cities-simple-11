import Advert from '../types/advert';
import Location from '../types/location';
import { name, internet, commerce, date, image } from 'faker';
import Accomodation from '../types/accomodation';
import { RATING_MAX } from '../consts/consts';
import Person from '../types/person';
import Comment from '../types/comment';
import User from '../types/user';
import getRandomCity from './get-random-city';

const MAX_ID = 356;
const MAX_PRICE = 2000;
const MIN_RATING = 1;
const MINIMAL_LATITUDE = -90;
const LATITUDE_RANGE = 180;
const MINIMAL_LONGITUDE = -180;
const LONGITUDE_RANGE = 360;

export const generateLocation = (percentage?:number):Location => {
  const random = percentage ?? Math.random();
  const latitude = MINIMAL_LATITUDE + LATITUDE_RANGE * random;
  const longitude = MINIMAL_LONGITUDE + LONGITUDE_RANGE * (1 - random);
  return ({latitude, longitude});
};

export const generateDifferentLocation = (location:Location):Location => ({
  ...location,
  longitude: -location.longitude
});

export const generateInteger = (min: number, max: number) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generatePerson = ():Person => {
  const random = Math.random();
  return{
    avatarUrl: internet.avatar(),
    id: Math.floor(MAX_ID * random),
    isPro: random > 0.5,
    name: name.firstName()
  };
};

export const generateUser = ():User => {
  const person = generatePerson();
  return{
    ...person,
    email: internet.email(),
    token: internet.password()
  };
};

export const generateOffer = (key?:number):Advert => {
  const types = Object.values(Accomodation);
  const random = Math.random();
  const id = key ?? Math.floor(MAX_ID * random);
  const title = commerce.productName();
  const city = getRandomCity(random);
  const location = generateLocation(random);
  const previewImage = internet.avatar();
  const isPremium = random > 0.5;
  const price = Math.floor(MAX_PRICE * random);
  const typeIndex = Math.floor(types.length * random);
  const type = types[typeIndex];
  const rating = MIN_RATING + Math.floor((RATING_MAX - MIN_RATING + 1) * random);
  const bedrooms = rating;
  const description = commerce.productDescription();
  const goods:string[] = [];
  const host = generatePerson();
  const images:string[] = [];
  const maxAdults = bedrooms;

  return {
    id,
    title,
    city,
    location,
    previewImage,
    isPremium,
    price,
    type,
    rating,
    bedrooms,
    description,
    goods,
    host,
    images,
    maxAdults
  };
};

export const generateImage = () => image.image();

export const generateImages = (count:number) => Array.from({length: count}, (item, index) => generateImage().concat(`${index}`));

export const generateOffers = (count:number):Advert[] => Array.from({length: count}, (item, index)=>generateOffer(index));

export const generateComment = (key?:number):Comment => {
  const random = Math.random();
  const id = key ?? Math.floor(MAX_ID * random);
  const rating = MIN_RATING + Math.floor((RATING_MAX - MIN_RATING + 1) * random);
  return{
    comment: commerce.productDescription(),
    date: date.past().toString(),
    id,
    rating,
    user: generatePerson()
  };
};

export const generateComments = (count:number):Comment[] => Array.from({length:count}, (item, index)=>generateComment(index));
