import { arePointsEqual } from './location-utils';
import { generateDifferentLocation, generateLocation } from './mocks';

const reference = generateLocation();
const sample = {...reference};
const standingOut = generateDifferentLocation(reference);

describe('Function: arePoinsEqual', ()=>{
  it('should return "true" if points are equal', ()=>{
    expect(arePointsEqual(sample, reference))
      .toBe(true);
  });
  it('should return "false" if points are not equal', ()=>{
    expect(arePointsEqual(standingOut, reference)).toBe(false);
  });
});

