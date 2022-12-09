import Location from '../types/location';

const MINIMAL_LATITUDE = -90;
const LATITUDE_RANGE = 180;
const MINIMAL_LONGITUDE = -180;
const LONGITUDE_RANGE = 360;

export const generateLocation = ():Location => {
  const latitude = MINIMAL_LATITUDE + LATITUDE_RANGE * Math.random();
  const longitude = MINIMAL_LONGITUDE + LONGITUDE_RANGE * Math.random();
  return ({latitude, longitude});
};

export const generateDifferentLocation = (location:Location):Location => ({
  ...location,
  longitude: -location.longitude
});
