import { CitiesName } from '../types/cities-name';
import { City } from '../types/city';

const COMMON_ZOOM = 11;

export const DEFAULT_CITY = {
  name: CitiesName.Paris,
  location: {
    latitude: 48.5009553943508,
    longitude: 2.20009666406198,
    zoom: COMMON_ZOOM
  }
};

export const cities: City[] = [
  {
    name: CitiesName.Amsterdam,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: COMMON_ZOOM
    }
  },
  {
    name: CitiesName.Dusseldorf,
    location: {
      latitude: 51.2217553943508,
      longitude: 6.77616666406198,
      zoom: COMMON_ZOOM
    }
  },
  DEFAULT_CITY,
  {
    name: CitiesName.Hamburg,
    location: {
      latitude: 53.5510853943508,
      longitude: 9.99368666406198,
      zoom: COMMON_ZOOM
    }
  },
  {
    name: CitiesName.Brussels,
    location: {
      latitude: 50.8504500943508,
      longitude: 4.34878006406198,
      zoom: COMMON_ZOOM
    }
  },
  {
    name: CitiesName.Cologne,
    location: {
      latitude: 45.5786200943508,
      longitude: 9.94180006406198,
      zoom: COMMON_ZOOM
    }
  }
];
