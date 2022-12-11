import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { render, screen } from '@testing-library/react';
import NotFoundScreen from './not-found-screen';

describe('Component: NotFoundScreen', ()=>{
  it('should render correctly', ()=>{
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <NotFoundScreen/>
      </HistoryRouter>
    );

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  });
});
