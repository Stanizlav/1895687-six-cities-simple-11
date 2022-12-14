import { render, screen } from '@testing-library/react';
import getRandomCity from '../../utils/get-random-city';
import CityItem from './city-item';
import { Provider } from 'react-redux';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import CitiesName from '../../types/cities-name';
import userEvent from '@testing-library/user-event';
import { changeCity } from '../../store/application-process/application-process';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeCityItem = (storage: MockStore, cityName:CitiesName, isActive = false) => (
  <Provider store={storage}>
    <HistoryRouter history={history}>
      <CityItem cityName={cityName} isActive={isActive}/>
    </HistoryRouter>
  </Provider>
);

describe('Component: CityItem', ()=>{
  let store: MockStore;
  let cityName: CitiesName;

  beforeEach(() => {
    store = mockStore();
    cityName = getRandomCity().name;
  });

  it('should render correctly', ()=>{
    render(fakeCityItem(store, cityName));

    expect(screen.getByText(cityName)).toBeInTheDocument();
  });

  it('should dispatch the "changeCity" action when a user clicks the inactive item', async()=>{
    render(fakeCityItem(store, cityName));

    const linkElement = screen.getByRole('link');
    expect(store.getActions()).toEqual([]);

    await userEvent.click(linkElement);

    expect(store.getActions()).toEqual([
      changeCity(cityName)
    ]);

  });

  it('should not dispatch the "changeCity" action when a user clicks the active item', async()=>{
    render(fakeCityItem(store, cityName, true));

    const linkElement = screen.getByRole('link');
    expect(store.getActions()).toEqual([]);

    await userEvent.click(linkElement);

    expect(store.getActions()).toEqual([]);

  });

});
