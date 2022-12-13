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

const mockStore = configureMockStore();

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

  it('should render when an unauthorised user navigate to "login" url', ()=>{
    const store = mockStoreWithAuthorisation(false);
    render(fakeLoginScreen(store));

    const headerElement = screen.getByRole('heading');
    const buttonElemnent = screen.getByRole('button');

    expect(headerElement).toHaveTextContent(/Sign in/i);
    expect(headerElement).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(buttonElemnent).toHaveTextContent(/Sign in/i);
    expect(buttonElemnent).toBeInTheDocument();
    expect(screen.getByTestId('changing-city-link')).toBeInTheDocument();
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

  it('should not render, but redirect to "/" when user is authorised', ()=>{
    const store = mockStoreWithAuthorisation();

    render(fakeLoginScreen(store));

    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });

});

