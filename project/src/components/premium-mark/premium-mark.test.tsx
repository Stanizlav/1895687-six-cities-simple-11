import { render, screen } from '@testing-library/react';
import PremiumMark from './premium-mark';

describe('Component: PremiumMark', ()=>{

  it('should render properly', ()=>{
    render(<PremiumMark isPremium/>);

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
  });

  it('should not render if is not needed', ()=>{
    render(<PremiumMark isPremium={false}/>);

    expect(screen.queryByText(/Premium/i)).not.toBeInTheDocument();
  });

});
