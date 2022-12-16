import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewForm from './review-form';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import NameSpace from '../../types/name-space';
import { CommentSizeLimit, RATING_MAX, ResponseStatusCode } from '../../consts/consts';
import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { State } from '../../types/state';
import { Action } from 'redux';
import AdditionalURL from '../../types/additional-url';
import { sendComment } from '../../store/thunk-actions';

const MOCK_HOTEL_ID = 73;

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
    <ReviewForm hotelId={MOCK_HOTEL_ID}/>
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
    const InteractionIndex = {
      First: RATING_MAX - 1,
      Last: 0
    } as const;

    render(fakeReviewForm);
    const textarea = screen.getByRole('textbox');
    const radioButtons = screen.getAllByRole('radio');

    expect(textarea).toHaveDisplayValue('');
    radioButtons.forEach((button)=>expect(button).not.toBeChecked());

    await userEvent.type(textarea, MOCK_OPINION);
    await userEvent.click(radioButtons[InteractionIndex.First]);

    expect(textarea).toHaveDisplayValue(MOCK_OPINION);
    let likelyUnchecked = radioButtons.filter((button, index)=> index !== InteractionIndex.First);
    likelyUnchecked.forEach((button)=>expect(button).not.toBeChecked());
    expect(radioButtons[InteractionIndex.First]).toBeChecked();

    await userEvent.click(radioButtons[InteractionIndex.Last]);

    likelyUnchecked = radioButtons.filter((button, index)=> index !== InteractionIndex.Last);
    likelyUnchecked.forEach((button)=>expect(button).not.toBeChecked());
    expect(radioButtons[InteractionIndex.Last]).toBeChecked();
  });

  it('should dispatch the "sendComment" action when a user submits after typing decent comment and choosing rating',
    async()=>{

      const MOCK_RATING_INDEX = RATING_MAX - 1;

      const sendingCommentUrl = `${AdditionalURL.CommentsPrefix}${MOCK_HOTEL_ID}`;
      mockAPI
        .onPost(sendingCommentUrl)
        .reply(ResponseStatusCode.Ok, []);

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
