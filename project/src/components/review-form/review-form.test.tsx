import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewForm from './review-form';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import NameSpace from '../../types/name-space';
import { MINIMAL_COMMENT_SIZE, RAITING_MAX } from '../../consts/consts';

const HOTEL_ID = 73;

const mockStore = configureMockStore();
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

  it('should render properly', ()=>{
    render(fakeReviewForm);

    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons.length).toBe(RAITING_MAX);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(/To submit review please make sure to set /i)).toBeInTheDocument();
    expect(screen.getByText(/rating/i)).toBeInTheDocument();
    expect(screen.getByText(/ and describe your stay with at least /i)).toBeInTheDocument();
    expect(screen.getByText(`${MINIMAL_COMMENT_SIZE} characters`)).toBeInTheDocument();
  });

  it('should change the textarea content and the radiogroup state when a user interacts', async()=>{
    const MOCK_OPINION = 'simple living conditions around it are very good';
    const FIRST_MOCK_RATING_INDEX = RAITING_MAX - 1;
    const SECOND_MOCK_RATING_INDEX = 0;

    render(fakeReviewForm);
    const textarea = screen.getByRole('textbox');
    const radioButtons = screen.getAllByRole('radio');

    expect(textarea).toHaveDisplayValue('');
    radioButtons.forEach((button)=>expect(button).not.toBeChecked());

    await userEvent.type(textarea, MOCK_OPINION);
    await userEvent.click(radioButtons[FIRST_MOCK_RATING_INDEX]);

    expect(textarea).toHaveDisplayValue(MOCK_OPINION);
    let lickelyUnchecked = radioButtons.filter((button, index)=> index !== FIRST_MOCK_RATING_INDEX);
    lickelyUnchecked.forEach((button)=>expect(button).not.toBeChecked());
    expect(radioButtons[FIRST_MOCK_RATING_INDEX]).toBeChecked();

    await userEvent.click(radioButtons[SECOND_MOCK_RATING_INDEX]);

    lickelyUnchecked = radioButtons.filter((button, index)=> index !== SECOND_MOCK_RATING_INDEX);
    lickelyUnchecked.forEach((button)=>expect(button).not.toBeChecked());
    expect(radioButtons[SECOND_MOCK_RATING_INDEX]).toBeChecked();

  });

});
