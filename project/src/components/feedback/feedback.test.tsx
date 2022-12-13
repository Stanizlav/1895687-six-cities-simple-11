import { render, screen } from '@testing-library/react';
import Feedback from './feedback';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { generateComments, generateInteger } from '../../utils/mocks';
import NameSpace from '../../types/name-space';
import AuthorisationStatus from '../../types/authorisation-status';
import { MAX_COMMENTS_COUNT } from '../../consts/consts';

const HOTEL_ID = 37;
const MIN_MOCK_COMMENTS_COUNT = 1;

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.User]: {
    authorisationStatus: AuthorisationStatus.Unauth,
    user: null
  }
});

describe('Component: Feedback', ()=>{

  it('should render correctly', ()=>{
    const maxMockCommentsCount = MAX_COMMENTS_COUNT + 5;
    const commentsCount = generateInteger(MIN_MOCK_COMMENTS_COUNT, maxMockCommentsCount);
    const comments = generateComments(commentsCount);

    render(
      <Provider store={store}>
        <Feedback comments={comments} hotelId={HOTEL_ID}/>
      </Provider>
    );

    expect(screen.getByText(/Reviews ·/i)).toBeInTheDocument();
    expect(screen.getByText(commentsCount)).toBeInTheDocument();

    const commentItems = screen.getAllByRole('listitem');
    commentItems.forEach((commentItem) => expect(commentItem).toBeInTheDocument());
    expect(commentItems.length).toBe(Math.min(commentsCount, MAX_COMMENTS_COUNT));
  });
});
