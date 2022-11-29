import { LatLngLiteral } from 'leaflet';
import Location from '../types/location';

const getLatLng = (location:Location):LatLngLiteral => ({
  lat: location.latitude,
  lng: location.longitude
});

const arePointsEqual = (sample:Location, pattern:Location) =>
  sample.latitude === pattern.latitude && sample.longitude === pattern.longitude;

export {getLatLng, arePointsEqual};
