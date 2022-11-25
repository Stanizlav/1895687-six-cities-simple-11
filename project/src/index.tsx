import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { comments } from './mocks/comments';
import { Provider } from 'react-redux';
import { store } from './store/store';

const Settings = {
  offers,
  comments,
  defaultCardsCount: 5,
  nearPlacesCardsCount: 3
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={Settings.offers} comments={Settings.comments} defaultCardsCount={Settings.defaultCardsCount} nearPlacesCardsCount={Settings.nearPlacesCardsCount}/>
    </Provider>
  </React.StrictMode>,
);
