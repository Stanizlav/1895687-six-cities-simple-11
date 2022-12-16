import { render, screen } from '@testing-library/react';
import { RATING_MAX } from '../../../../consts/consts';
import { generateInteger } from '../../../../utils/mocks';
import RatingStar from './rating-star';

describe('Component RatingStar', ()=>{

  it('should render correctly', ()=>{
    const mockRating = generateInteger(1, RATING_MAX);
    const value = generateInteger(1, RATING_MAX);
    render(<RatingStar rating={mockRating} value={value}/>);

    const radioStar = screen.getByRole('radio');
    expect(radioStar).toBeInTheDocument();
    expect(radioStar.hasAttribute('checked')).toBe(value === mockRating);
  });

});
