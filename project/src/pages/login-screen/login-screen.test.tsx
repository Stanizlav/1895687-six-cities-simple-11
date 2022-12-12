import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import LoginScreen from './login-screen';
import AppRoute from '../../types/app-route';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NameSpace from '../../types/name-space';
import AuthorisationStatus from '../../types/authorisation-status';
import { Route, Routes } from 'react-router-dom';
import { changeCity } from '../../store/application-process/application-process';
import CitiesName from '../../types/cities-name';
import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import AdditionalURL from '../../types/additional-url';
import { State } from '../../types/state';
import { Action } from 'redux';
import { logIn } from '../../store/thunk-actions';
import { generateUser } from '../../utils/mocks';

const MOCK_EMAIL = 'someEmail@mockEmail.com';
const MOCK_PASSWORD = 'password123';
const SIGN_IN_ELEMENTS_COUNT = 2;

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action<string>>(middlewares);

const mockStoreWithAuthorisation = (flag = true) => mockStore({
  [NameSpace.User]:{
    authorisationStatus: flag ? AuthorisationStatus.Auth : AuthorisationStatus.Unauth,
    user: null
  }
});

const history = createMemoryHistory();

const fakeLoginScreen = (storage:MockStore) => (
  <Provider store={storage}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path={AppRoute.Login} element={<LoginScreen/>}/>
        <Route path={AppRoute.Main} element={<h1>This is main page</h1>}/>
      </Routes>
    </HistoryRouter>
  </Provider>
);

describe('Component: LoginScreen', ()=>{

  beforeEach(() => history.push(AppRoute.Login));

  it('should render when an unauthorised user navigate to "login" url', async()=>{
    const store = mockStoreWithAuthorisation(false);

    render(fakeLoginScreen(store));

    const signInElements = screen.getAllByText(/Sign in/i);
    expect(signInElements.length).toBe(SIGN_IN_ELEMENTS_COUNT);
    signInElements.forEach((element)=>expect(element).toBeInTheDocument());

    expect(screen.getByTestId('changing-city-link')).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('email'), MOCK_EMAIL);
    await userEvent.type(screen.getByTestId('password'), MOCK_PASSWORD);

    expect(screen.getByDisplayValue(MOCK_EMAIL)).toBeInTheDocument();
    expect(screen.getByDisplayValue(MOCK_PASSWORD)).toBeInTheDocument();
  });

  it('should redirect to "/" when user clicks the "changing-city-link"', async()=>{
    const store = mockStoreWithAuthorisation(false);

    render(fakeLoginScreen(store));

    const changingCityLink = screen.getByTestId('changing-city-link');
    const linkText = changingCityLink.textContent ?? '';
    const citiesNames: string[] = Object.values(CitiesName);

    expect(citiesNames.includes(linkText)).toBe(true);
    const chosenCity: CitiesName = linkText as CitiesName;

    expect(changingCityLink).toBeInTheDocument();
    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    expect(store.getActions()).toEqual([]);

    await userEvent.click(changingCityLink);

    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
    expect(store.getActions()).toEqual([
      changeCity(chosenCity)
    ]);

  });

  it('should dispatch the "logIn" action when user is getting authorised', async()=>{
    const user = {
      ...generateUser(),
      email: MOCK_EMAIL
    };
    mockAPI
      .onPost(AdditionalURL.Login)
      .reply(200, user);

    const store = mockStoreWithAuthorisation(false);
    Storage.prototype.setItem = jest.fn();

    render(fakeLoginScreen(store));

    await userEvent.type(screen.getByTestId('email'), MOCK_EMAIL);
    await userEvent.type(screen.getByTestId('password'), MOCK_PASSWORD);

    expect(store.getActions()).toEqual([]);

    await userEvent.click(screen.getByRole('button'));

    const actions = store.getActions().map(({type}) => type);

    expect(actions.includes(logIn.pending.type)).toBe(true);

  });

  it('should not render, but redirect to "/" when user is authorised', ()=>{
    const store = mockStoreWithAuthorisation();

    render(fakeLoginScreen(store));

    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });

});

