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

export const REDIRECT_ACTION_TYPE = 'Application/redirectToRoute';

export enum CommentSizeLimit{
  Min = 50,
  Max = 300
}

export enum CardsCount{
  Default = 5,
  ForNearPlaces = 3
}

export enum MarkerSize{
  Full = 40,
  Half = 20
}

export enum MapLayerInfo{
  Url = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  Attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}

export enum QuantityCap{
  ForComments = 10,
  ForImages = 6
}

export enum ResponseStatusCode{
  BadRequest = 400,
  Unauthorised = 401,
  NotFound = 404,
  Ok = 200,
  NoContent = 204
}

export const SORT_FORM_TAB_INDEX_START = 0;
export const SORT_FORM_ACTIVITY_CLASS = 'places__options--opened';

export const RATING_MAX = 5;
export const PERCENTAGE_MULTIPLAYER = 100 / RATING_MAX;
