export enum MapMarkerUrl{
  Default = 'img/pin.svg',
  Current = 'img/pin-active.svg'
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

export const REDIRECT_ACTION_TYPE = 'application/redirectToRoute';

export const MINIMAL_COMMENT_SIZE = 50;
export const MAXIMAL_COMMENT_SIZE = 300;

export const DEFAULT_CARDS_COUNT = 5;
export const DEFAULT_NEAR_PLACES_COUNT = 3;

export const SORT_FORM_TAB_INDEX_START = 0;
export const SORT_FORM_ACTIVITY_CLASS = 'places__options--opened';

export const RAITING_MAX = 5;
export const PERCENTAGE_MULTIPLAYER = 100 / RAITING_MAX;

export const LAYER_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
export const LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
