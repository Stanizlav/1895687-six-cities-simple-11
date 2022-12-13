import HistoryRouter from '../history-router/history-router';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import App from './app';
import AppRoute from '../../types/app-route';
import { render, screen } from '@testing-library/react';
import NameSpace from '../../types/name-space';
import SortType from '../../types/sort-type';
import AuthorisationStatus from '../../types/authorisation-status';
import { cities } from '../../consts/cities';
import { generateOffer } from '../../utils/mocks';
import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import AdditionalURL from '../../types/additional-url';
import { DEFAULT_CARDS_COUNT, DEFAULT_NEAR_PLACES_COUNT } from '../../consts/consts';

const SIGN_IN_ELEMENTS_COUNT = 2;

const offer = generateOffer();
const chosenCity = offer.city.name;
const sortType = SortType.Popular;


const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [NameSpace.Data]: {
    isLoading: false,
    offers: [],
    offer,
    offersNearby: [],
    comments: []
  },
  [NameSpace.User]: {
    user: null,
    authorisationStatus: AuthorisationStatus.Unauth
  },
  [NameSpace.Application]: {
    chosenCity,
    sortType
  }
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App defaultCardsCount={DEFAULT_CARDS_COUNT} nearPlacesCardsCount={DEFAULT_NEAR_PLACES_COUNT}/>
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', ()=>{
  it('should render "MainScreen" when user navigate to "/"', ()=>{
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    cities.forEach((city) => expect(screen.getByText(city.name)).toBeInTheDocument());
    expect(screen.getByText(/to stay/i)).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/login"', ()=>{
    history.push(AppRoute.Login);
    render(fakeApp);

    const signInElements = screen.getAllByText(/Sign in/i);
    expect(signInElements.length).toBe(SIGN_IN_ELEMENTS_COUNT);
    signInElements.forEach((element)=>expect(element).toBeInTheDocument());

    expect(screen.getByTestId('changing-city-link')).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to unknown url', ()=>{
    history.push('/unknown-url');
    render(fakeApp);

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  });

  it('should render "PropertyScreen" when user navigate to "/offer/:id"', ()=>{
    const mockOfferId = offer.id;
    const theOfferUrl = `${AdditionalURL.Offers}/${mockOfferId}`;
    const offersNearbyUrl = `${AdditionalURL.OffersNearbyPrefix}${mockOfferId}${AdditionalURL.OffersNearbyPostfix}`;
    const commentsUrl = `${AdditionalURL.CommentsPrefix}${mockOfferId}`;
    mockAPI
      .onGet(theOfferUrl)
      .reply(200)
      .onGet(offersNearbyUrl)
      .reply(200)
      .onGet(commentsUrl)
      .reply(200);

    const propertyUrl = `${AppRoute.Room}/${mockOfferId}`;
    history.push(propertyUrl);
    render(fakeApp);

    expect(screen.getByText(/what's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/other places in the neighbourhood/i)).toBeInTheDocument();
  });

});
