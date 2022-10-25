export enum AppRoute{
  Main = '/',
  Login = '/login',
  Room = '/offer/:id',
  Other = '*'
}

export enum AuthorisationStatus {
  Auth = 'AUTH',
  Unauth = 'UNAUTH',
  Unknown = 'UNKNOWN'
}

const DEFAULT_CARDS_COUNT = 5;
const DEFAULT_NEAR_PLACES_COUNT = 3;

export { DEFAULT_CARDS_COUNT, DEFAULT_NEAR_PLACES_COUNT };
