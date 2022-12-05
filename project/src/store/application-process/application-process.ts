import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CitiesName from '../../types/cities-name';
import Location from '../../types/location';
import SortType from '../../types/sort-type';
import NameSpace from '../../types/name-space';
import { ApplicationProcess } from '../../types/state';

const imaginaryPoint:Location = {latitude:-Infinity, longitude: -Infinity};

const initialState:ApplicationProcess = {
  selectedPoint: imaginaryPoint,
  sortType: SortType.Popular,
  chosenCity: CitiesName.Paris
};

export const applicationProcess = createSlice({
  name: NameSpace.Application,
  initialState,
  reducers: {
    selectPoint: (state, action: PayloadAction<Location>) => {
      state.selectedPoint = action.payload;
    },
    getRidOfSelectedPoint: (state)=>{
      state.selectedPoint = imaginaryPoint;
    },
    chooseSortType: (state, action:PayloadAction<SortType>)=>{
      state.sortType = action.payload;
    },
    changeCity: (state, action:PayloadAction<CitiesName>)=>{
      state.chosenCity = action.payload;
      state.sortType = initialState.sortType;
    }
  }
});

export const {selectPoint, getRidOfSelectedPoint, chooseSortType, changeCity} = applicationProcess.actions;

