import { render, screen } from '@testing-library/react';
import Feedback from './feedback';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { generateComment } from '../../utils/mocks';
import NameSpace from '../../types/name-space';
import AuthorisationStatus from '../../types/authorisation-status';

const HOTEL_ID = 37;

const comments = [generateComment()];
const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.User]: {
    authorisationStatus: AuthorisationStatus.Unauth,
    user: null
  }
});

describe('Component: Feedback', ()=>{
  it('should render correctly', ()=>{
    render(
      <Provider store={store}>
        <Feedback comments={comments} hotelId={HOTEL_ID}/>
      </Provider>
    );

    expect(screen.getByText(/Reviews ·/i)).toBeInTheDocument();
    expect(screen.getByText(comments.length)).toBeInTheDocument();
  });
});
