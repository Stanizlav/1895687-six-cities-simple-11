import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOffersListUp, fillOffersNearbyListUp, getRidOfSelectedPoint, selectPoint, setSortType, setConnectionUnsustainable, fillCommentsUp, ceaseLoading, startLoading } from './actions';
import Advert from '../types/advert';
import CitiesName from '../types/cities-name';
import SortType from '../types/sort-type';
import Location from '../types/location';
import sortOffers from '../utils/sort-offers';
import filterOffers from '../utils/filter-offers';
import Comment from '../types/comment';

const imaginaryPoint:Location = {latitude:-Infinity, longitude: -Infinity};

type StateType = {
  selectedPoint: Location;
  sortType: SortType;
  chosenCity: CitiesName;
  offers: Advert[];
  formatedOffers: Advert[];
  offersNearby: Advert[];
  comments: Comment[];
  isLoading: boolean;
  isConnectionUnsustainable: boolean;
}

const initialState: StateType = {
  selectedPoint: imaginaryPoint,
  sortType: SortType.Popular,
  chosenCity: CitiesName.Paris,
  offers: [],
  formatedOffers: [],
  offersNearby: [],
  comments: [],
  isLoading: true,
  isConnectionUnsustainable: false
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
    })
    .addCase(fillOffersNearbyListUp, (state, action)=>{
      const {offers} = action.payload;
      state.offersNearby = offers;
    })
    .addCase(setConnectionUnsustainable, (state)=>{
      state.isConnectionUnsustainable = true;
    })
    .addCase(fillCommentsUp, (state, action)=>{
      const {comments} = action.payload;
      state.comments = comments;
    })
    .addCase(ceaseLoading, (state)=>{
      state.isLoading = false;
    })
    .addCase(startLoading, (state)=>{
      state.isLoading = true;
    });
});

export {reducer};
