import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import AppRoute from '../../types/app-route';
import Logo from './logo';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();


describe('Component: Logo', ()=>{

  it('should redirect to "/" when is clicked', async()=>{
    history.push('/UNKNOWN_ROUTE');
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path={AppRoute.Other} element={<Logo/>}/>
          <Route path={AppRoute.Main} element={<h1>This is the main page</h1>}/>
        </Routes>
      </HistoryRouter>
    );

    const linkElement = screen.getByRole('link');

    expect(screen.queryByText(/This is the main page/i)).not.toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();

    await userEvent.click(linkElement);

    expect(screen.getByText(/This is the main page/i)).toBeInTheDocument();
  });

});
