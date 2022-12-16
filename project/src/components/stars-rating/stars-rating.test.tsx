import { render, screen } from '@testing-library/react';
import { PERCENTAGE_MULTIPLAYER, RATING_MAX } from '../../consts/consts';
import { generateInteger } from '../../utils/mocks';
import StarsRating from './stars-rating';

describe('Component: StarsRating', ()=>{

  it('should render correctly', ()=>{
    const mockRating = generateInteger(1, RATING_MAX);
    render(<StarsRating rating={mockRating}/>);

    const starsElement = screen.getByTestId('stars');
    expect(starsElement).toBeInTheDocument();
    const likelyWidth = `${PERCENTAGE_MULTIPLAYER * mockRating}%`;
    const likelyStyle = {
      width: likelyWidth
    };
    expect(starsElement).toHaveStyle(likelyStyle);
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
  });

});
