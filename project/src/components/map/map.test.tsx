import { render, screen } from '@testing-library/react';
import getRandomCity from '../../utils/get-random-city';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Map from './map';
import NameSpace from '../../types/name-space';

const mockStore = configureMockStore();

describe('Component: Map', ()=>{

  it('should render correctly', ()=>{
    const city = getRandomCity();
    const store = mockStore({
      [NameSpace.Application]: {
        selectedPoint: city.location
      }
    });

    render(
      <Provider store={store}>
        <Map city={city} points={[]}/>
      </Provider>
    );

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

});
