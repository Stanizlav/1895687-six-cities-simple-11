export enum AppRoute{
  Main = '/',
  Login = '/login',
  Room = '/offer',
  Other = '*'
}

export enum AuthorisationStatus{
  Auth = 'AUTH',
  Unauth = 'UNAUTH',
  Unknown = 'UNKNOWN'
}

export const RatingTitle = {
  1 : 'terribly',
  2 : 'badly',
  3 : 'not bad',
  4 : 'good',
  5 : 'perfect'
} as const;

const RAITING_MAX = 5;

export {RAITING_MAX};
