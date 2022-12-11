import { render, screen } from '@testing-library/react';
import ReviewForm from './review-form';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import NameSpace from '../../types/name-space';
import { MINIMAL_COMMENT_SIZE } from '../../consts/consts';

const HOTEL_ID = 73;

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Data]: {
    isSending: false
  }
});

describe('Component: ReviewForm', ()=>{

  it('should render properly', ()=>{
    render(
      <Provider store={store}>
        <ReviewForm hotelId={HOTEL_ID}/>
      </Provider>
    );

    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell how was your stay, what you like and what can be improved/i)).toBeInTheDocument();
    expect(screen.getByText(/To submit review please make sure to set /i)).toBeInTheDocument();
    expect(screen.getByText(/rating/i)).toBeInTheDocument();
    expect(screen.getByText(/ and describe your stay with at least /i)).toBeInTheDocument();
    expect(screen.getByText(`${MINIMAL_COMMENT_SIZE} characters`)).toBeInTheDocument();


  });

});
