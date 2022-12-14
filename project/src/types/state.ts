import { store } from '../store/store';
import Advert from './advert';
import Comment from './comment';
import AuthorisationStatus from './authorisation-status';
import User from './user';
import SortType from './sort-type';
import CitiesName from './cities-name';
import Location from './location';

export type ApplicationData = {
  offers: Advert[];
  offer: Advert|null;
  offersNearby: Advert[];
  comments: Comment[];
  isLoading: boolean;
  isSending: boolean;
  hasSendingError: boolean;
}

export type UserProcess = {
  authorisationStatus: AuthorisationStatus;
  user: User|null;
}

export type ApplicationProcess = {
  selectedPoint: Location;
  sortType: SortType;
  chosenCity: CitiesName;
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
