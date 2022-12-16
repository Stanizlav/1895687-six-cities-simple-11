import { render, screen } from '@testing-library/react';
import HistoryRouter from '../../components/history-router/history-router';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import PropertyScreen from './property-screen';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { CardsCount, ResponseStatusCode } from '../../consts/consts';
import { generateOffer } from '../../utils/mocks';
import NameSpace from '../../types/name-space';
import AppRoute from '../../types/app-route';
import AuthorisationStatus from '../../types/authorisation-status';
import { Route, Routes } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import AdditionalURL from '../../types/additional-url';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const offer = generateOffer();

const store = mockStore({
  [NameSpace.Data]: {
    offer,
    offersNearby: [],
    comments: []
  },
  [NameSpace.User]: {
    user: null,
    authorisationStatus: AuthorisationStatus.Unauth
  },
  [NameSpace.Application]: {
    selectedPoint: offer.location
  }
});


describe('Component: PropertyScreen', ()=>{
  const mockId = offer.id;
  const theOfferUrl = `${AdditionalURL.Offers}/${mockId}`;
  const offersNearbyUrl = `${AdditionalURL.OffersNearbyPrefix}${mockId}${AdditionalURL.OffersNearbyPostfix}`;
  const commentsUrl = `${AdditionalURL.CommentsPrefix}${mockId}`;
  mockAPI
    .onGet(theOfferUrl)
    .reply(ResponseStatusCode.Ok)
    .onGet(offersNearbyUrl)
    .reply(ResponseStatusCode.Ok)
    .onGet(commentsUrl)
    .reply(ResponseStatusCode.Ok);

  it('should render correctly', ()=>{
    const propertyUrl = `${AppRoute.Room}/${mockId}`;
    history.push(propertyUrl);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={`${AppRoute.Room}/:id`} element={<PropertyScreen cardsCount={CardsCount.ForNearPlaces} />} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    const {title, rating, type, bedrooms, maxAdults, price, description} = offer;
    const priceMessage = `€${price}`;
    const bedroomsMessage = `${bedrooms} Bedroom${bedrooms > 1 ? 's' : ''}`;
    const capacityMessage = `Max ${maxAdults} adult${maxAdults > 1 ? 's' : ''}`;

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(rating)).toBeInTheDocument();
    expect(screen.getByText(type)).toBeInTheDocument();
    expect(screen.getByText(bedroomsMessage)).toBeInTheDocument();
    expect(screen.getByText(capacityMessage)).toBeInTheDocument();
    expect(screen.getByText(priceMessage)).toBeInTheDocument();
    expect(screen.getByText(/night/i)).toBeInTheDocument();
    expect(screen.getByText(/what's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByText(/reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/other places in the neighbourhood/i)).toBeInTheDocument();
  });

});
