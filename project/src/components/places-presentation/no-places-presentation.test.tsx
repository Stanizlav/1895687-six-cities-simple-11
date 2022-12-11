import NoPlacesPresentation from './no-places-presentation';
import { render, screen } from '@testing-library/react';
import { generateCity } from '../../utils/mocks';

describe('Component: NoPlacesPresentation', ()=>{
  it('should render correctly', ()=>{
    const cityName = generateCity().name;
    render(<NoPlacesPresentation cityName={cityName}/>);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${cityName}`)).toBeInTheDocument();
  });
});
