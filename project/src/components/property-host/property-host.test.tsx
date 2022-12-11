import { render, screen } from '@testing-library/react';
import { generateUser } from '../../utils/mocks';
import PropertyHost from './property-host';

const mockUser = generateUser();

describe('Component: PropertyHost', ()=>{

  it('should render properly when the host is Pro', ()=>{
    const person = {
      ...mockUser,
      isPro: true
    };

    render(<PropertyHost host={person}/>);

    const {name} = person;
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(/Pro/i)).toBeInTheDocument();
  });

  it('should render properly when the host is not Pro', ()=>{
    const person = {
      ...mockUser,
      isPro: false
    };

    render(<PropertyHost host={person}/>);

    const {name} = person;
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.queryByText(/Pro/i)).not.toBeInTheDocument();
  });

});
