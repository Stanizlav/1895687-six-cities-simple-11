import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import LoginForm from './login-form';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { State } from '../../types/state';
import { Action } from 'redux';
import AdditionalURL from '../../types/additional-url';
import userEvent from '@testing-library/user-event';
import { logIn } from '../../store/thunk-actions';
import { generateUser } from '../../utils/mocks';
import { ResponseStatusCode } from '../../consts/consts';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action<string>>(middlewares);

const store = mockStore();

const fakeLoginForm = (
  <Provider store={store}>
    <LoginForm/>
  </Provider>
);

describe('Component: LoginForm', ()=>{
  const MOCK_EMAIL = 'someEmail@mockEmail.com';
  const MOCK_PASSWORD = 'password123';

  it('should render correctly', ()=>{
    render(fakeLoginForm);

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should change the input fields content when a user types', async()=>{
    render(fakeLoginForm);

    const emailField = screen.getByTestId('email');
    const passwordField = screen.getByTestId('password');

    expect(emailField).toHaveDisplayValue('');
    expect(passwordField).toHaveDisplayValue('');

    await userEvent.type(emailField, MOCK_EMAIL);
    await userEvent.type(passwordField, MOCK_PASSWORD);

    expect(emailField).toHaveDisplayValue(MOCK_EMAIL);
    expect(passwordField).toHaveDisplayValue(MOCK_PASSWORD);

    expect(screen.getByDisplayValue(MOCK_EMAIL)).toBeInTheDocument();
    expect(screen.getByDisplayValue(MOCK_PASSWORD)).toBeInTheDocument();
  });

  it('should dispatch the "logIn" action when user is getting authorised', async()=>{
    const user = {
      ...generateUser(),
      email: MOCK_EMAIL
    };
    mockAPI
      .onPost(AdditionalURL.Login)
      .reply(ResponseStatusCode.Ok, user);

    Storage.prototype.setItem = jest.fn();

    render(fakeLoginForm);

    await userEvent.type(screen.getByTestId('email'), MOCK_EMAIL);
    await userEvent.type(screen.getByTestId('password'), MOCK_PASSWORD);

    expect(store.getActions()).toEqual([]);

    await userEvent.click(screen.getByRole('button'));

    const actions = store.getActions().map(({type}) => type);

    expect(actions.includes(logIn.pending.type)).toBe(true);
    expect(Storage.prototype.setItem).toBeCalled();
  });

});
