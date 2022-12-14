import { Action } from 'redux';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/state';
import AdditionalURL from '../types/additional-url';
import { checkAuthorisation, fetchOffers, fetchTheOffer, logIn, logOut, sendComment } from './thunk-actions';
import { generateComment } from '../utils/mocks';
import AuthData from '../types/auth-data';
import { redirectToRoute } from './actions';
import { AUTH_TOKEN_KEY } from '../services/token';

describe('Async actions', ()=>{
  const LIKELY_CALLS_COUNT = 1;

  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action<string>,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch the "checkAuthorisation" actions to store when checking authorisation is successful', async()=>{
    mockAPI
      .onGet(AdditionalURL.Login)
      .reply(200);

    const store = mockStore();

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthorisation());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthorisation.pending.type,
      checkAuthorisation.fulfilled.type
    ]);
  });

  it('should dispatch the "sendComment" actions to store when sending is successful', async()=>{
    const MOCK_HOTEL_ID = 5;
    const mockComment = generateComment();
    const sendingCommentUrl = `${AdditionalURL.CommentsPrefix}${MOCK_HOTEL_ID}`;
    mockAPI
      .onPost(sendingCommentUrl)
      .reply(200, [mockComment]);

    const store = mockStore();

    expect(store.getActions()).toEqual([]);

    const newComment = {comment: mockComment.comment, rating: mockComment.rating};
    await store.dispatch(sendComment({hotelId: MOCK_HOTEL_ID, newComment}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      sendComment.pending.type,
      sendComment.fulfilled.type
    ]);
  });

  it('should dispatch the "fetchTheOffer" actions to store when data is successfuly delivered', async()=>{
    const MOCK_OFFER_ID = 73;
    const theOfferUrl = `${AdditionalURL.Offers}/${MOCK_OFFER_ID}`;
    const offersNearbyUrl = `${AdditionalURL.OffersNearbyPrefix}${MOCK_OFFER_ID}${AdditionalURL.OffersNearbyPostfix}`;
    const commentsUrl = `${AdditionalURL.CommentsPrefix}${MOCK_OFFER_ID}`;

    mockAPI
      .onGet(theOfferUrl)
      .reply(200)
      .onGet(offersNearbyUrl)
      .reply(200)
      .onGet(commentsUrl)
      .reply(200);

    const store = mockStore();

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchTheOffer(MOCK_OFFER_ID));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchTheOffer.pending.type,
      fetchTheOffer.fulfilled.type
    ]);
  });

  it('should dispatch the "fetchOffers" actions to store when data is successfuly delivered', async()=>{
    mockAPI
      .onGet(AdditionalURL.Offers)
      .reply(200);

    const store = mockStore();

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOffers());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOffers.pending.type,
      fetchOffers.fulfilled.type
    ]);
  });

  it('should dispatch the "logIn" actions and the redirect action to store when loged in', async()=>{
    const mockAuthData: AuthData = {email: 'some.email@email.com', password: '123password248'};
    const mockToken = 'some_token';

    mockAPI
      .onPost(AdditionalURL.Login)
      .reply(200, {token: mockToken});

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    expect(store.getActions()).toEqual([]);

    await store.dispatch(logIn(mockAuthData));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logIn.pending.type,
      redirectToRoute.type,
      logIn.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(LIKELY_CALLS_COUNT);
    expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY, mockToken);

  });

  it('should dispatch the "logOut" actions to store when loged out', async()=>{
    mockAPI
      .onDelete(AdditionalURL.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    expect(store.getActions()).toEqual([]);

    await store.dispatch(logOut());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logOut.pending.type,
      logOut.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(LIKELY_CALLS_COUNT);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY);

  });

});
