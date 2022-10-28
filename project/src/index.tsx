import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers } from './mocks/offers';

const Settings = {
  OffersCount: 127,
  offers,
  defaultCardsCount: 5,
  nearPlacesCardsCount: 3
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App offersCount={Settings.OffersCount} offers={Settings.offers} defaultCardsCount={Settings.defaultCardsCount} nearPlacesCardsCount={Settings.nearPlacesCardsCount}/>
  </React.StrictMode>,
);
