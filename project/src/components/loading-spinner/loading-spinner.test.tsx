import { render, screen } from '@testing-library/react';
import LoadingSpinner from './loading-spinner';

describe('Component: LoadingSpinner', ()=>{

  it('should render correctly', ()=>{
    render(<LoadingSpinner/>);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

});
