import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { DEFAULT_CARDS_COUNT } from '../../consts/consts';
import AppRoute from '../../types/app-route';
import NameSpace from '../../types/name-space';
import SortType from '../../types/sort-type';
import { generateOffer } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import PlacesPresentation from './places-presentation';


const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: PlacesPresentation', ()=>{
  it('should render correctly with loaded offers', ()=>{
    const offers = [generateOffer()];
    const chosenCity = offers[0].city.name;
    const sortType = SortType.Popular;

    const store = mockStore({
      [NameSpace.Data]: {
        offers,
      },
      [NameSpace.Application]: {
        chosenCity,
        sortType,
        selectedPoint: offers[0].location
      },
      [NameSpace.User]:{
        user: null
      }
    });

    history.push(AppRoute.Main);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlacesPresentation maxCountToShow={DEFAULT_CARDS_COUNT}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(`1 place to stay in ${chosenCity}`)).toBeInTheDocument();
    expect(screen.getByText(/sort by/i)).toBeInTheDocument();
  });
});
