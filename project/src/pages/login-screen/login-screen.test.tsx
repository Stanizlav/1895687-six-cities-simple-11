import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import LoginScreen from './login-screen';
import AppRoute from '../../types/app-route';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NameSpace from '../../types/name-space';
import AuthorisationStatus from '../../types/authorisation-status';
import CitiesName from '../../types/cities-name';

const MOCK_EMAIL = 'someEmail@mockEmail.com';
const MOCK_PASSWORD = 'password123';
const SIGN_IN_ELEMENTS_COUNT = 2;

const chosenCity = CitiesName.Paris;

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.User]:{
    authorisationStatus: AuthorisationStatus.Unauth
  },
  [NameSpace.Application]:{
    chosenCity
  }
});
const history = createMemoryHistory();

describe('Component: LoginScreen', ()=>{
  it('should render when user navigate to "login" url', async()=>{
    history.push(AppRoute.Login);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginScreen/>
        </HistoryRouter>
      </Provider>
    );

    const signInElements = screen.getAllByText(/Sign in/i);
    expect(signInElements.length).toBe(SIGN_IN_ELEMENTS_COUNT);
    signInElements.forEach((element)=>expect(element).toBeInTheDocument());

    expect(screen.getByText(chosenCity)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('email'), MOCK_EMAIL);
    await userEvent.type(screen.getByTestId('password'), MOCK_PASSWORD);

    expect(screen.getByDisplayValue(MOCK_EMAIL)).toBeInTheDocument();
    expect(screen.getByDisplayValue(MOCK_PASSWORD)).toBeInTheDocument();
  });
});

