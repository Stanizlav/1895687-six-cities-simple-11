import sortOffers from './sort-offers';
import SortType from '../types/sort-type';

describe('Object sortOffers', ()=>{

  it('must have methods corresponding SortType options', ()=>{
    const sortOptions = Object.values(SortType).sort();
    const methodsKeys = Object.keys(sortOffers).sort();

    expect(sortOptions).toEqual(methodsKeys);
  });

});
