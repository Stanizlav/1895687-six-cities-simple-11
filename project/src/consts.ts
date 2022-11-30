export enum MapMarkerUrl{
  Default = 'img/pin.svg',
  Current = 'img/pin-active.svg'
}

export enum MapClassList{
  Cities = 'cities__map map',
  Property = 'property__map map'
}

export enum OffersListClassList{
  Cities = 'cities__places-list places__list tabs__content',
  NearPlaces = 'near-places__list places__list'
}

export const RatingTitle = {
  1 : 'terribly',
  2 : 'badly',
  3 : 'not bad',
  4 : 'good',
  5 : 'perfect'
} as const;

export const REDIRECT_ACTION_TYPE = 'application/redirect-to-route';

export const RAITING_MAX = 5;
export const PERCENTAGE_MULTIPLAYER = 100 / RAITING_MAX;
export const LAYER_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
export const LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
