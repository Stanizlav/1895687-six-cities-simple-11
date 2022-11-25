import { LatLngLiteral } from 'leaflet';
import { Location } from '../types/location';

const getLatLng = (location:Location):LatLngLiteral => ({
  lat: location.latitude,
  lng: location.longitude
});

export {getLatLng};
