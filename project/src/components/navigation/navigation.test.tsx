import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Navigation from './navigation';
import NameSpace from '../../types/name-space';
import { generateUser } from '../../utils/mocks';
import AuthorisationStatus from '../../types/authorisation-status';


const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Navigation', ()=>{

  it('should render properly when user is authorised', ()=>{
    const user = generateUser();
    const store = mockStore({
      [NameSpace.User]: {
        user,
        authorisationStatus: AuthorisationStatus.Auth
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Navigation/>
        </HistoryRouter>
      </Provider>
    );

    const {email} = user;

    expect(screen.getByText(email)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();

  });

  it('should render properly when user is unauthorised', ()=>{
    const store = mockStore({
      [NameSpace.User]: {
        user: null,
        authorisationStatus: AuthorisationStatus.Unauth
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Navigation/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();

  });

});

