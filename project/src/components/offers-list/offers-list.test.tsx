import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import OffersList from './offers-list';
import { generateInteger, generateOffers } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import Advert from '../../types/advert';
import { getRidOfSelectedPoint, selectPoint } from '../../store/application-process/application-process';
import { State } from '../../types/state';
import { Action } from 'redux';

const history = createMemoryHistory();
const mockStore = configureMockStore<State, Action<string>>();

const fakeOffersList = (storage: MockStore, offers:Advert[]) => (
  <Provider store={storage}>
    <HistoryRouter history={history}>
      <OffersList offers={offers} />
    </HistoryRouter>
  </Provider>
);

describe('Component: OffersList', ()=>{
  const MockOffersCountLimit = {
    Min: 2,
    Max: 10
  } as const;

  const mockOffersCount = generateInteger(MockOffersCountLimit.Min, MockOffersCountLimit.Max);
  const mockOffers = generateOffers(mockOffersCount);

  let store:MockStore<State, Action<string>>;

  beforeEach(() => {
    store = mockStore();
  });

  it('should render poperly', ()=>{
    render(fakeOffersList(store, mockOffers));

    expect(screen.getByRole('list')).toBeInTheDocument();
    const cards = screen.getAllByRole('article');
    expect(cards.length).toBe(mockOffers.length);
    cards.forEach((card) => expect(card).toBeInTheDocument());
  });

  it('should dispatch actions in accordance with user\'s interactions', async()=>{
    const CardIndexToInteract = {
      First: 0,
      Last: mockOffers.length - 1
    };

    render(fakeOffersList(store, mockOffers));

    const cards = screen.getAllByRole('article');
    expect(store.getActions()).toEqual([]);

    await userEvent.hover(cards[CardIndexToInteract.First]);
    await userEvent.unhover(cards[CardIndexToInteract.First]);
    await userEvent.click(cards[CardIndexToInteract.Last]);

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      selectPoint.type,
      getRidOfSelectedPoint.type,
      selectPoint.type,
      getRidOfSelectedPoint.type
    ]);
  });

});
