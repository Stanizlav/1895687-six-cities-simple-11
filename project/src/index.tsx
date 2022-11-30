import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings = {
  defaultCardsCount: 5,
  nearPlacesCardsCount: 3
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App defaultCardsCount={Settings.defaultCardsCount} nearPlacesCardsCount={Settings.nearPlacesCardsCount}/>
    </Provider>
  </React.StrictMode>,
);
