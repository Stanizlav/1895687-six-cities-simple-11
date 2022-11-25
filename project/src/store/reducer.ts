import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOffersListUp, getRidOfSelectedPoint, selectPoint, setSortType } from './actions';
import Advert from '../types/advert';
import { CitiesName } from '../types/cities-name';
import { SortType } from '../types/sort-type';
import { Location } from '../types/location';
import { sortOffers } from '../utils/sort-offers';
import { filterOffers } from '../utils/filter-offers';

const imaginaryPoint:Location = {latitude:-Infinity, longitude: -Infinity};

type StateType = {
  selectedPoint: Location;
  sortType: SortType;
  chosenCity: CitiesName;
  offers: Advert[];
  formatedOffers: Advert[];
}

const initialState: StateType = {
  selectedPoint: imaginaryPoint,
  sortType: SortType.Popular,
  chosenCity: CitiesName.Paris,
  offers: [],
  formatedOffers: []
};

const getFormatedOffers = (state:StateType):Advert[] =>
  sortOffers[state.sortType](filterOffers(state.offers, state.chosenCity));

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
      state.formatedOffers = getFormatedOffers(state);
    })
    .addCase(setSortType,(state, action) => {
      const {sortType} = action.payload;
      state.sortType = sortType;
      state.formatedOffers = getFormatedOffers(state);
    })
    .addCase(fillOffersListUp, (state, action)=>{
      const { offers } = action.payload;
      state.offers = offers;
      state.formatedOffers = getFormatedOffers(state);
    });
});

export {reducer};
