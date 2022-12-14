import { Provider } from 'react-redux';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-router/history-router';
import { createMemoryHistory } from 'history';
import MainScreen from './main-screen';
import NameSpace from '../../types/name-space';
import { generateOffer } from '../../utils/mocks';
import SortType from '../../types/sort-type';
import { render, screen } from '@testing-library/react';
import { CardsCount } from '../../consts/consts';
import { cities } from '../../consts/cities';
import CitiesName from '../../types/cities-name';
import AppRoute from '../../types/app-route';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeMainScreen = (storage:MockStore) => (
  <Provider store={storage}>
    <HistoryRouter history={history}>
      <MainScreen defaultCardsCount={CardsCount.Default}/>
    </HistoryRouter>
  </Provider>
);

describe('Component: MainScreen', ()=>{
  it('should render correctly with loaded offers', ()=>{
    const mockOffer = generateOffer();
    const chosenCity = mockOffer.city.name;

    const store = mockStore({
      [NameSpace.Data]: {
        offers: [mockOffer],
      },
      [NameSpace.Application]: {
        chosenCity,
        sortType: SortType.Popular,
        selectedPoint: mockOffer.location
      },
      [NameSpace.User]:{
        user: null
      }
    });

    history.push(AppRoute.Main);

    render(fakeMainScreen(store));

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    cities.forEach((city) => expect(screen.getByText(city.name)).toBeInTheDocument());
    expect(screen.getByText(`1 place to stay in ${chosenCity}`)).toBeInTheDocument();
    expect(screen.getByText(/sort by/i)).toBeInTheDocument();
  });

  it('should render correctly without loaded offers', ()=>{
    const chosenCity = CitiesName.Brussels;

    const store = mockStore({
      [NameSpace.Data]: {
        offers:[],
      },
      [NameSpace.Application]: {
        chosenCity,
        sortType: SortType.Popular,
      },
      [NameSpace.User]:{
        user: null
      }
    });

    history.push(AppRoute.Main);

    render(fakeMainScreen(store));

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    cities.forEach((city) => expect(screen.getByText(city.name)).toBeInTheDocument());
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${chosenCity}`)).toBeInTheDocument();
  });

});
