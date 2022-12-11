import { render, screen, renderHook } from '@testing-library/react';
import useMap from './useMap';
import { Map } from 'leaflet';
import { generateCity } from '../utils/mocks';

describe('Hook: useMap', ()=>{
  it('should return Map', ()=>{

    render(<section data-testid="map-section"/>);
    const element = screen.getByTestId('map-section');
    const mapRef = {
      current: element
    };
    const city = generateCity();

    const {result} = renderHook(() => useMap(mapRef, city));

    const map = result.current;

    expect(map).toBeInstanceOf(Map);
  });
});
