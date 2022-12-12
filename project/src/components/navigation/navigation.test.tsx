import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import Navigation from './navigation';
import NameSpace from '../../types/name-space';
import { generateUser } from '../../utils/mocks';
import AuthorisationStatus from '../../types/authorisation-status';
import { Route, Routes } from 'react-router-dom';
import AppRoute from '../../types/app-route';
import userEvent from '@testing-library/user-event';
import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { State } from '../../types/state';
import { Action } from 'redux';
import AdditionalURL from '../../types/additional-url';
import { logOut } from '../../store/thunk-actions';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action<string>>(middlewares);

const mockStoreWithAuthorisation = (flag = true) => mockStore({
  [NameSpace.User]: {
    user: flag ? generateUser() : null,
    authorisationStatus: flag ? AuthorisationStatus.Auth : AuthorisationStatus.Unauth
  }
});


const history = createMemoryHistory();

const fakeNavigation = (storage: MockStore) => (
  <Provider store={storage}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path={AppRoute.Other} element={<Navigation/>}/>
        <Route path={AppRoute.Login} element={<h1>This is login page</h1>}/>
      </Routes>
    </HistoryRouter>
  </Provider>
);

describe('Component: Navigation', ()=>{

  beforeEach(()=>history.push('/UNKNOWN_ROUTE'));

  it('should render properly when user is authorised', ()=>{
    const user = generateUser();
    const store = mockStore({
      [NameSpace.User]: {
        user,
        authorisationStatus: AuthorisationStatus.Auth
      }
    });

    render(fakeNavigation(store));

    const {email} = user;

    expect(screen.getByText(email)).toBeInTheDocument();

    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent(/Sign out/i);

  });

  it('should render properly when user is unauthorised', ()=>{
    const store = mockStoreWithAuthorisation(false);

    render(fakeNavigation(store));

    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent(/Sign in/i);

  });

  it('should stay on the page and dispatch the "logOut" action when an authorised user clicks the link', async()=>{
    mockAPI
      .onDelete(AdditionalURL.Logout)
      .reply(204);

    const store = mockStoreWithAuthorisation();
    Storage.prototype.removeItem = jest.fn();

    render(fakeNavigation(store));

    const linkElement = screen.getByRole('link');

    expect(linkElement).toBeInTheDocument();
    expect(screen.queryByText(/This is login page/i)).not.toBeInTheDocument();
    expect(store.getActions()).toEqual([]);

    await userEvent.click(linkElement);

    expect(linkElement).toBeInTheDocument();
    expect(screen.queryByText(/This is login page/i)).not.toBeInTheDocument();

    const actions = store.getActions().map(({type}) => type);

    expect(actions.includes(logOut.pending.type)).toBe(true);

  });

  it('should redirect to login screen when not authorised user clicks the link', async()=>{
    const store = mockStoreWithAuthorisation(false);

    render(fakeNavigation(store));

    const linkElement = screen.getByRole('link');

    expect(linkElement).toBeInTheDocument();
    expect(screen.queryByText(/This is login page/i)).not.toBeInTheDocument();

    await userEvent.click(linkElement);

    expect(screen.getByText(/This is login page/i)).toBeInTheDocument();
    expect(linkElement).not.toBeInTheDocument();

  });

});

