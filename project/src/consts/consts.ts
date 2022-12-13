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

export enum CommentSizeLimit{
  Min = 50,
  Max = 300
}

export const MAX_COMMENTS_COUNT = 10;

export const MAX_IMAGES_COUNT = 6;

export const DEFAULT_CARDS_COUNT = 5;
export const DEFAULT_NEAR_PLACES_COUNT = 3;

export const SORT_FORM_TAB_INDEX_START = 0;
export const SORT_FORM_ACTIVITY_CLASS = 'places__options--opened';

export const RATING_MAX = 5;
export const PERCENTAGE_MULTIPLAYER = 100 / RATING_MAX;

export const LAYER_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
export const LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
