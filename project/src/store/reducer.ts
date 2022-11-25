import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOffersListUp, setAdvertActive } from './actions';
import Advert from '../types/advert';
import { CitiesName } from '../types/cities-name';

const initialState = {
  activeCardId: -Infinity,
  chosenCity: CitiesName.Paris,
  offers: [] as Advert[]
};

const reducer = createReducer(initialState, (builder)=>{
  builder
    .addCase(setAdvertActive, (state, action)=>{
      const { activeCardId } = action.payload;
      state.activeCardId = activeCardId;
    })
    .addCase(changeCity, (state, action)=>{
      const { chosenCity } = action.payload;
      state.chosenCity = chosenCity;
    })
    .addCase(fillOffersListUp, (state, action)=>{
      const { offers } = action.payload;
      state.offers = offers;
    });
});

export {reducer};
