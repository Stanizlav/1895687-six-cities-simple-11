import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RATING_MAX } from '../../../consts/consts';
import RatingInput from './rating-input';

describe('Component: RatingInput', ()=>{
  const onChange = jest.fn();
  const INITIAL_MOCK_RATING = 0;

  it('should render correctly', ()=>{
    render(<RatingInput onChange={onChange} rating={INITIAL_MOCK_RATING}/>);

    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    const ratingItems = screen.getAllByRole('radio');
    expect(ratingItems.length).toBe(RATING_MAX);
    ratingItems.forEach((item) => expect(item).toBeInTheDocument());
  });

  it('should call the obtained callback when a user clicks on the component', async()=>{
    const InteractionIndex = {
      First: RATING_MAX - 1,
      Last: 0
    } as const;

    render(<RatingInput onChange={onChange} rating={INITIAL_MOCK_RATING}/>);

    const ratingItems = screen.getAllByRole('radio');
    expect(onChange).not.toHaveBeenCalled();

    await userEvent.click(ratingItems[InteractionIndex.First]);

    expect(onChange).toHaveBeenCalledTimes(1);

    await userEvent.click(ratingItems[InteractionIndex.Last]);

    expect(onChange).toHaveBeenCalledTimes(2);
  });

});
