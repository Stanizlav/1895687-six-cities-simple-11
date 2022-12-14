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
import { CardsCount } from './consts/consts';

const Settings = {
  defaultCardsCount: CardsCount.Default,
  nearPlacesCardsCount: CardsCount.ForNearPlaces
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
