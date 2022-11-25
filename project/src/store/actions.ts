import { createAction } from '@reduxjs/toolkit';
import Advert from '../types/advert';
import { CitiesName } from '../types/cities-name';

export const setAdvertActive = createAction<{activeCardId: number}>('offers/set-active');

export const changeCity = createAction<{chosenCity: CitiesName}>('cities/change');

export const fillOffersListUp = createAction<{offers: Advert[]}>('offers/fillUp');
