import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOffersListUp, getRidOfSelectedPoint, selectPoint, setSortType } from './actions';
import Advert from '../types/advert';
import { CitiesName } from '../types/cities-name';
import { SortType } from '../types/sort-type';
import { Location } from '../types/location';

const imaginaryPoint:Location = {latitude:-Infinity, longitude: -Infinity};

const initialState = {
  selectedPoint: imaginaryPoint,
  sortType: SortType.Popular,
  chosenCity: CitiesName.Paris,
  offers: [] as Advert[]
};

const reducer = createReducer(initialState, (builder)=>{
  builder
    .addCase(selectPoint, (state, action)=>{
      const { point } = action.payload;
      state.selectedPoint = point;
    })
    .addCase(getRidOfSelectedPoint, (state)=>{
      state.selectedPoint = imaginaryPoint;
    })
    .addCase(changeCity, (state, action)=>{
      const { chosenCity } = action.payload;
      state.chosenCity = chosenCity;
      state.sortType = SortType.Popular;
    })
    .addCase(setSortType,(state, action) => {
      const {sortType} = action.payload;
      state.sortType = sortType;
    })
    .addCase(fillOffersListUp, (state, action)=>{
      const { offers } = action.payload;
      state.offers = offers;
    });
});

export {reducer};
