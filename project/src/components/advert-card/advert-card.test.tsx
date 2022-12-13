import { render, screen } from '@testing-library/react';
import { generateOffer } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import AdvertCard from './advert-card';
import Advert from '../../types/advert';
import { Route, Routes } from 'react-router-dom';
import AppRoute from '../../types/app-route';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const fakeAdvertCard = (offer: Advert) => (
  <HistoryRouter history={history}>
    <Routes>
      <Route path={AppRoute.Other} element={<AdvertCard offer={offer}/>}/>
      <Route path={`${AppRoute.Room}/:id`} element={<h1>This is property page</h1>}/>
    </Routes>
  </HistoryRouter>
);

describe('Component: AdvertCard', ()=>{
  const mockOffer = generateOffer();

  beforeEach(()=>history.push('/UNKNOWN_ROUTE'));

  it('should render correctly for premium offer', ()=>{
    const offer = {
      ...mockOffer,
      isPremium: true
    };
    render(fakeAdvertCard(offer));

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
      ...mockOffer,
      isPremium: false
    };
    render(fakeAdvertCard(offer));

    const {price, title, type} = offer;
    const priceMessage = `€${price}`;

    expect(screen.queryByText(/Premium/i)).not.toBeInTheDocument();
    expect(screen.getByText(priceMessage)).toBeInTheDocument();
    expect(screen.getByText(/\/ night/i)).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(type)).toBeInTheDocument();
  });

  it('should redirect to property screen when a user clicks on the image link', async()=>{
    render(fakeAdvertCard(mockOffer));

    const imageLink = screen.getByTestId('image-link');

    expect(screen.queryByText(/This is property page/i)).not.toBeInTheDocument();
    await userEvent.click(imageLink);
    expect(screen.getByText(/This is property page/i)).toBeInTheDocument();
  });

  it('should redirect to property screen when a user clicks on the title link', async()=>{
    render(fakeAdvertCard(mockOffer));

    const titleLink = screen.getByTestId('title-link');

    expect(screen.queryByText(/This is property page/i)).not.toBeInTheDocument();
    await userEvent.click(titleLink);
    expect(screen.getByText(/This is property page/i)).toBeInTheDocument();
  });

});
