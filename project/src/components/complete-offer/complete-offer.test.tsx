import { render, screen } from '@testing-library/react';
import { generateOffer } from '../../utils/mocks';
import CompleteOffer from './complete-offer';

describe('Component: CompleteOffer', ()=>{
  it('should render correctly for premium offer', ()=>{
    const offer = {
      ...generateOffer(),
      isPremium: true
    };

    render(<CompleteOffer offer={offer}/>);

    const {title, rating, type, bedrooms, maxAdults, price, description} = offer;
    const priceMessage = `€${price}`;
    const bedroomsMessage = `${bedrooms} Bedroom${bedrooms > 1 ? 's' : ''}`;
    const capacityMessage = `Max ${maxAdults} adult${maxAdults > 1 ? 's' : ''}`;

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(rating)).toBeInTheDocument();
    expect(screen.getByText(type)).toBeInTheDocument();
    expect(screen.getByText(bedroomsMessage)).toBeInTheDocument();
    expect(screen.getByText(capacityMessage)).toBeInTheDocument();
    expect(screen.getByText(priceMessage)).toBeInTheDocument();
    expect(screen.getByText(/night/i)).toBeInTheDocument();
    expect(screen.getByText(/what's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();

  });

  it('should render correctly for not premium offer', ()=>{
    const offer = {
      ...generateOffer(),
      isPremium: false
    };

    render(<CompleteOffer offer={offer}/>);

    const {title, rating, type, bedrooms, maxAdults, price, description} = offer;
    const priceMessage = `€${price}`;
    const bedroomsMessage = `${bedrooms} Bedroom${bedrooms > 1 ? 's' : ''}`;
    const capacityMessage = `Max ${maxAdults} adult${maxAdults > 1 ? 's' : ''}`;

    expect(screen.queryByText(/Premium/i)).not.toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(rating)).toBeInTheDocument();
    expect(screen.getByText(type)).toBeInTheDocument();
    expect(screen.getByText(bedroomsMessage)).toBeInTheDocument();
    expect(screen.getByText(capacityMessage)).toBeInTheDocument();
    expect(screen.getByText(priceMessage)).toBeInTheDocument();
    expect(screen.getByText(/night/i)).toBeInTheDocument();
    expect(screen.getByText(/what's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();

  });

});
