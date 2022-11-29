import { createAction } from '@reduxjs/toolkit';
import Advert from '../types/advert';
import CitiesName from '../types/cities-name';
import Comment from '../types/comment';
import Location from '../types/location';
import SortType from '../types/sort-type';

export const selectPoint = createAction<{point: Location}>('offers/select');

export const getRidOfSelectedPoint = createAction('offers/get-rid-of-selected');

export const setSortType = createAction<{sortType: SortType}>('offers/set-sort');

export const changeCity = createAction<{chosenCity: CitiesName}>('city/change');

export const fillOffersListUp = createAction<{offers: Advert[]}>('offers/fill-up');

export const fillOffersNearbyListUp = createAction<{offers: Advert[]}>('offers-nearby/fill-up');

export const setConnectionUnsustainable = createAction('connection/set-unsustainable');

export const fillCommentsUp = createAction<{comments: Comment[]}>('comments/fill-up');

export const ceaseLoading = createAction('loading/cease');

export const startLoading = createAction('loading/start');
