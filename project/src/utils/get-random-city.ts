import { cities } from '../consts/cities';

const getRandomCity = (percentage?:number) => {
  const random = percentage ?? Math.random();
  const cityIndex = Math.floor(cities.length * random);
  return cities[cityIndex];
};

export default getRandomCity;
