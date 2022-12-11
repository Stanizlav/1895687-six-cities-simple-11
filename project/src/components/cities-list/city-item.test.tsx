import { render, screen } from '@testing-library/react';
import { generateCity } from '../../utils/mocks';
import CityItem from './city-item';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';

const mockStore = configureMockStore();
const store = mockStore();
const history = createMemoryHistory();

describe('Component: CityItem', ()=>{
  it('should render correctly', ()=>{
    const cityName = generateCity().name;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CityItem cityName={cityName}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(cityName)).toBeInTheDocument();
  });
});
