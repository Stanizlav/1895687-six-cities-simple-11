import { render, screen } from '@testing-library/react';
import { generateOffer } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import AdvertCard from './advert-card';

const history = createMemoryHistory();

describe('Component: AdvertCard', ()=>{
  it('should render correctly for premium offer', ()=>{
    const offer = {
      ...generateOffer(),
      isPremium: true
    };
    render(
      <HistoryRouter history={history}>
        <AdvertCard offer={offer}/>
      </HistoryRouter>
    );

    const {price, title, type} = offer;
    const priceMessage = `€${price}`;

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
    expect(screen.getByText(priceMessage)).toBeInTheDocument();
    expect(screen.getByText(/\/ night/i)).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(type)).toBeInTheDocument();
  });

  it('should render correctly for not premium offer', ()=>{
    const offer = {
      ...generateOffer(),
      isPremium: false
    };
    render(
      <HistoryRouter history={history}>
        <AdvertCard offer={offer}/>
      </HistoryRouter>
    );

    const {price, title, type} = offer;
    const priceMessage = `€${price}`;

    expect(screen.queryByText(/Premium/i)).not.toBeInTheDocument();
    expect(screen.getByText(priceMessage)).toBeInTheDocument();
    expect(screen.getByText(/\/ night/i)).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(type)).toBeInTheDocument();
  });

});
