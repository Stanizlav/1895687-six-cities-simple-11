import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-router/history-router';
import { createMemoryHistory } from 'history';
import MainScreen from './main-screen';
import NameSpace from '../../types/name-space';
import { generateOffer } from '../../utils/mocks';
import SortType from '../../types/sort-type';
import { render, screen } from '@testing-library/react';
import { DEFAULT_CARDS_COUNT } from '../../consts/consts';
import { cities } from '../../consts/cities';
import CitiesName from '../../types/cities-name';
import AppRoute from '../../types/app-route';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: MainScreen', ()=>{
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
          <MainScreen defaultCardsCount={DEFAULT_CARDS_COUNT}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    cities.forEach((city) => expect(screen.getByText(city.name)).toBeInTheDocument());
    expect(screen.getByText(`1 place to stay in ${chosenCity}`)).toBeInTheDocument();
    expect(screen.getByText(/sort by/i)).toBeInTheDocument();
  });

  it('should render correctly without loaded offers', ()=>{
    const chosenCity = CitiesName.Brussels;
    const sortType = SortType.Popular;

    const store = mockStore({
      [NameSpace.Data]: {
        offers:[],
      },
      [NameSpace.Application]: {
        chosenCity,
        sortType,
      },
      [NameSpace.User]:{
        user: null
      }
    });

    history.push(AppRoute.Main);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainScreen defaultCardsCount={DEFAULT_CARDS_COUNT}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    cities.forEach((city) => expect(screen.getByText(city.name)).toBeInTheDocument());
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${chosenCity}`)).toBeInTheDocument();
  });

});
