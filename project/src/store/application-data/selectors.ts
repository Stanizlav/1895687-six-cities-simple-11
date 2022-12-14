import { State } from '../../types/state';
import NameSpace from '../../types/name-space';

export const getOffers = (state:State) => state[NameSpace.Data].offers;

export const getTheOffer = (state:State) => state[NameSpace.Data].offer;

export const getOffersNearby = (state:State) => state[NameSpace.Data].offersNearby;

export const getComments = (state:State) => state[NameSpace.Data].comments;

export const isDataLoading = (state:State) => state[NameSpace.Data].isLoading;

export const isDataSending = (state:State) => state[NameSpace.Data].isSending;

export const hasDataSendingError = (state:State) => state[NameSpace.Data].hasSendingError;

export const getTheOfferData = (state:State) => ({
  offer: getTheOffer(state),
  offersNearby: getOffersNearby(state),
  comments: getComments(state),
  isLoading: isDataLoading(state)
});
