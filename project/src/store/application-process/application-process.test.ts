import CitiesName from '../../types/cities-name';
import SortType from '../../types/sort-type';
import { ApplicationProcess } from '../../types/state';
import { generateLocation } from '../../utils/mocks';
import { applicationProcess, changeCity, chooseSortType, getRidOfSelectedPoint, selectPoint } from './application-process';

const initialState = applicationProcess.getInitialState();

const previousPoint = generateLocation();
const previousSortType = SortType.Popular;
const previousChosenCity = CitiesName.Paris;
const previousState: ApplicationProcess = {
  selectedPoint: previousPoint,
  sortType: previousSortType,
  chosenCity: previousChosenCity
};

const newPoint = generateLocation();
const noPoint = {...initialState.selectedPoint};
const newSortType = SortType.RatingDescending;
const newChosenCity = CitiesName.Brussels;

describe('Reducer: applicationProcess', () => {
  it('without necessery parameters should return the initial state', ()=>{
    expect(applicationProcess.reducer(undefined, {type:'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should change the selected point',()=>{
    expect(applicationProcess.reducer(previousState, selectPoint(newPoint)))
      .toEqual({...previousState, selectedPoint:newPoint});
  });

  it('should get rid of the selected point',()=>{
    expect(applicationProcess.reducer(previousState, getRidOfSelectedPoint()))
      .toEqual({...previousState, selectedPoint:noPoint});
  });

  it('should change the sort type',()=>{
    expect(applicationProcess.reducer(previousState, chooseSortType(newSortType)))
      .toEqual({...previousState, sortType: newSortType});
  });

  it('should change the chosen City',()=>{
    expect(applicationProcess.reducer(previousState, changeCity(newChosenCity)))
      .toEqual({...previousState, chosenCity: newChosenCity});
  });
});

