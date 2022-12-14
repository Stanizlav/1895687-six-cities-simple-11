import { render, screen } from '@testing-library/react';
import Feedback from './feedback';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { generateComments, generateInteger } from '../../utils/mocks';
import NameSpace from '../../types/name-space';
import AuthorisationStatus from '../../types/authorisation-status';
import { QuantityCap } from '../../consts/consts';

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.User]: {
    authorisationStatus: AuthorisationStatus.Unauth,
    user: null
  }
});

describe('Component: Feedback', ()=>{
  const MOCK_HOTEL_ID = 37;
  const MIN_MOCK_COMMENTS_COUNT = 1;

  it('should render correctly', ()=>{
    const maxMockCommentsCount = QuantityCap.ForComments + 5;
    const commentsCount = generateInteger(MIN_MOCK_COMMENTS_COUNT, maxMockCommentsCount);
    const comments = generateComments(commentsCount);

    render(
      <Provider store={store}>
        <Feedback comments={comments} hotelId={MOCK_HOTEL_ID}/>
      </Provider>
    );

    expect(screen.getByText(/Reviews ·/i)).toBeInTheDocument();
    expect(screen.getByText(commentsCount)).toBeInTheDocument();

    const commentItems = screen.getAllByRole('listitem');
    commentItems.forEach((commentItem) => expect(commentItem).toBeInTheDocument());
    expect(commentItems.length).toBe(Math.min(commentsCount, QuantityCap.ForComments));
  });
});
