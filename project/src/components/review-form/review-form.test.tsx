import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewForm from './review-form';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import NameSpace from '../../types/name-space';
import { CommentSizeLimit, RATING_MAX } from '../../consts/consts';
import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { State } from '../../types/state';
import { Action } from 'redux';
import AdditionalURL from '../../types/additional-url';
import { sendComment } from '../../store/thunk-actions';

const HOTEL_ID = 73;

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action<string>>(middlewares);

const store = mockStore({
  [NameSpace.Data]: {
    isSending: false
  }
});

const fakeReviewForm = (
  <Provider store={store}>
    <ReviewForm hotelId={HOTEL_ID}/>
  </Provider>
);

describe('Component: ReviewForm', ()=>{
  const MOCK_OPINION = 'I like it. Simple living conditions around it are very good';

  it('should render properly', ()=>{
    render(fakeReviewForm);

    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons.length).toBe(RATING_MAX);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(/To submit review please make sure to set /i)).toBeInTheDocument();
    expect(screen.getByText(/rating/i)).toBeInTheDocument();
    expect(screen.getByText(/ and describe your stay with at least /i)).toBeInTheDocument();
    expect(screen.getByText(`${CommentSizeLimit.Min} characters`)).toBeInTheDocument();
  });

  it('should change the textarea content and the radiogroup state when a user interacts', async()=>{
    const FIRST_MOCK_RATING_INDEX = RATING_MAX - 1;
    const SECOND_MOCK_RATING_INDEX = 0;

    render(fakeReviewForm);
    const textarea = screen.getByRole('textbox');
    const radioButtons = screen.getAllByRole('radio');

    expect(textarea).toHaveDisplayValue('');
    radioButtons.forEach((button)=>expect(button).not.toBeChecked());

    await userEvent.type(textarea, MOCK_OPINION);
    await userEvent.click(radioButtons[FIRST_MOCK_RATING_INDEX]);

    expect(textarea).toHaveDisplayValue(MOCK_OPINION);
    let likelyUnchecked = radioButtons.filter((button, index)=> index !== FIRST_MOCK_RATING_INDEX);
    likelyUnchecked.forEach((button)=>expect(button).not.toBeChecked());
    expect(radioButtons[FIRST_MOCK_RATING_INDEX]).toBeChecked();

    await userEvent.click(radioButtons[SECOND_MOCK_RATING_INDEX]);

    likelyUnchecked = radioButtons.filter((button, index)=> index !== SECOND_MOCK_RATING_INDEX);
    likelyUnchecked.forEach((button)=>expect(button).not.toBeChecked());
    expect(radioButtons[SECOND_MOCK_RATING_INDEX]).toBeChecked();
  });

  it('should dispatch the "sendComment" action when a user submits after typing decent comment and choosing rating',
    async()=>{

      const MOCK_RATING_INDEX = RATING_MAX - 1;

      const sendingCommentUrl = `${AdditionalURL.CommentsPrefix}${HOTEL_ID}`;
      mockAPI
        .onPost(sendingCommentUrl)
        .reply(200, []);

      render(fakeReviewForm);
      const textarea = screen.getByRole('textbox');
      const ratingButtons = screen.getAllByRole('radio');
      const submit = screen.getByRole('button');

      expect(store.getActions()).toEqual([]);

      await userEvent.type(textarea, MOCK_OPINION);
      await userEvent.click(ratingButtons[MOCK_RATING_INDEX]);
      await userEvent.click(submit);

      const actions = store.getActions().map(({type})=>type);

      expect(actions.includes(sendComment.pending.type)).toBe(true);
    });

});
