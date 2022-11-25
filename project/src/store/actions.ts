import { createAction } from '@reduxjs/toolkit';
import Advert from '../types/advert';
import { CitiesName } from '../types/cities-name';
import { Location } from '../types/location';
import { SortType } from '../types/sort-type';

export const selectPoint = createAction<{point: Location}>('offers/select');

export const getRidOfSelectedPoint = createAction('offers/get-rid-of-selected');

export const setSortType = createAction<{sortType: SortType}>('offers/set-sort');

export const changeCity = createAction<{chosenCity: CitiesName}>('cities/change');

export const fillOffersListUp = createAction<{offers: Advert[]}>('offers/fillUp');
