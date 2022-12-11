import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkAuthorisation, fetchOffers } from './store/thunk-actions';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './services/browser-history';
import { DEFAULT_CARDS_COUNT, DEFAULT_NEAR_PLACES_COUNT } from './consts/consts';

const Settings = {
  defaultCardsCount: DEFAULT_CARDS_COUNT,
  nearPlacesCardsCount: DEFAULT_NEAR_PLACES_COUNT
};

store.dispatch(checkAuthorisation());
store.dispatch(fetchOffers());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App defaultCardsCount={Settings.defaultCardsCount} nearPlacesCardsCount={Settings.nearPlacesCardsCount}/>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
