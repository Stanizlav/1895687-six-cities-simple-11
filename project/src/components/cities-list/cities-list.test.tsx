import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import CitiesList from './cities-list';
import NameSpace from '../../types/name-space';
import { cities } from '../../consts/cities';
import CitiesName from '../../types/cities-name';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Application]: {
    chosenCity: CitiesName.Paris
  }
});

describe('Component: CitiesList', ()=>{

  it('should render properly', ()=>{
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CitiesList/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
    const cityItems = screen.getAllByRole('listitem');
    expect(cityItems.length).toBe(cities.length);
    cityItems.forEach((item) => expect(item).toBeInTheDocument());

    const likelyCitiesList = cities.map(({name}) => name);
    const actualCitiesList = cityItems.map(({textContent}) => textContent);

    expect(actualCitiesList).toEqual(likelyCitiesList);
  });

});
