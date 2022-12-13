import {render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import NameSpace from '../../types/name-space';
import SortType from '../../types/sort-type';
import SortForm from './sort-form';
import { SORT_FORM_ACTIVITY_CLASS } from '../../consts/consts';
import userEvent from '@testing-library/user-event';
import { State } from '../../types/state';
import { Action } from 'redux';
import { chooseSortType } from '../../store/application-process/application-process';

const mockStore = configureMockStore<State, Action<string>>();

describe('Component: SortForm', ()=>{
  const SORT_TYPE = SortType.Popular;

  const store = mockStore({
    [NameSpace.Application]:{
      sortType: SORT_TYPE
    }
  });

  const fakeSortForm = (
    <Provider store={store}>
      <SortForm/>
    </Provider>
  );

  it('should render correctly', ()=>{
    render(fakeSortForm);

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    const representativeButton = screen.getByRole('button');
    expect(representativeButton).toBeInTheDocument();
    expect(representativeButton).toHaveTextContent(SORT_TYPE);
    const sortOptionsList = screen.getByRole('list');
    expect(sortOptionsList).toBeInTheDocument();
    expect(sortOptionsList).not.toHaveClass(SORT_FORM_ACTIVITY_CLASS);
    const sortOptions = screen.getAllByRole('listitem');
    const likelySortOptions = Object.values(SortType);
    expect(sortOptions.length).toBe(likelySortOptions.length);
    sortOptions.forEach((sortOption) => expect(sortOption).toBeInTheDocument());
  });

  it('should show the sort options list when user click the representative button', async()=>{
    render(fakeSortForm);

    const representativeButton = screen.getByRole('button');
    const sortOptionsList = screen.getByRole('list');

    expect(sortOptionsList).not.toHaveClass(SORT_FORM_ACTIVITY_CLASS);

    await userEvent.click(representativeButton);

    expect(sortOptionsList).toHaveClass(SORT_FORM_ACTIVITY_CLASS);
  });

  it('should dispatch the "chooseSortType" action when a user clicks another sort type option', async()=>{
    const FIRST_SORT_OPTION_INDEX = 0;

    render(fakeSortForm);

    const sortOptions = screen.getAllByRole('listitem');
    const lastSortOptionIndex = sortOptions.length - 1;

    expect(lastSortOptionIndex > FIRST_SORT_OPTION_INDEX).toBe(true);
    expect(store.getActions()).toEqual([]);

    await userEvent.click(sortOptions[FIRST_SORT_OPTION_INDEX]);
    await userEvent.click(sortOptions[lastSortOptionIndex]);

    const actions = store.getActions().map(({type})=>type);

    expect(actions.includes(chooseSortType.type)).toBe(true);
  });

});
