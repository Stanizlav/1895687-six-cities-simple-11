import { createAction } from '@reduxjs/toolkit';
import { REDIRECT_ACTION_TYPE } from '../consts';
import Advert from '../types/advert';
import AppRoute from '../types/app-route';
import AuthorisationStatus from '../types/authorisation-status';
import CitiesName from '../types/cities-name';
import Comment from '../types/comment';
import Location from '../types/location';
import SortType from '../types/sort-type';
import User from '../types/user';

export const selectPoint = createAction<Location>('offers/select');

export const getRidOfSelectedPoint = createAction('offers/get-rid-of-selected');

export const setSortType = createAction<SortType>('offers/set-sort');

export const changeCity = createAction<CitiesName>('city/change');

export const fillOffersListUp = createAction<Advert[]>('offers/fill-up');

export const setTheOffer = createAction<Advert|null>('offers/set-the-offer');

export const fillOffersNearbyListUp = createAction<Advert[]>('offers-nearby/fill-up');

export const setConnectionUnsustainable = createAction('connection/set-unsustainable');

export const fillCommentsUp = createAction<Comment[]>('comments/fill-up');

export const ceaseLoading = createAction('loading/cease');

export const startLoading = createAction('loading/start');

export const setAuthorisationStatus = createAction<AuthorisationStatus>('user/set-authorisation');

export const setUser = createAction<User|null>('user/set');

export const redirectToRoute = createAction<AppRoute>(REDIRECT_ACTION_TYPE);
