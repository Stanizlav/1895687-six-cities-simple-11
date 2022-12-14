import { render, screen, renderHook } from '@testing-library/react';
import useMap from './use-map';
import { Map } from 'leaflet';
import getRandomCity from '../utils/get-random-city';

describe('Hook: useMap', ()=>{
  it('should return Map', ()=>{

    render(<section data-testid="map-section"/>);
    const element = screen.getByTestId('map-section');
    const mapRef = {
      current: element
    };
    const city = getRandomCity();

    const {result} = renderHook(() => useMap(mapRef, city));

    const map = result.current;

    expect(map).toBeInstanceOf(Map);
  });
});
