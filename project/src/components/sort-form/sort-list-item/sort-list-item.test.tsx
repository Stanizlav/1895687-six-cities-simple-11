import { render, screen } from '@testing-library/react';
import SortListItem from './sort-list-item';
import SortType from '../../../types/sort-type';
import userEvent from '@testing-library/user-event';


describe('Component: SortForm', ()=>{
  const TAB_INDEX = 0;
  const SORT_TYPE = SortType.Popular;
  const ON_CLICK_CALLBACK = jest.fn();

  const fakeSortListItem = (
    <SortListItem tabIndex={TAB_INDEX} sortType={SORT_TYPE} currentSortType={SORT_TYPE} onClick={ON_CLICK_CALLBACK}/>
  );

  it('should render correctly', ()=>{
    render(fakeSortListItem);

    expect(screen.getByText(`${SORT_TYPE}`)).toBeInTheDocument();
  });

  it('should call the obtained callback when a user clicks on the component', async()=>{
    const LIKELY_CALLS_COUNT = 1;

    render(fakeSortListItem);

    await userEvent.click(screen.getByRole('listitem'));

    expect(ON_CLICK_CALLBACK).nthCalledWith(LIKELY_CALLS_COUNT, SORT_TYPE);
  });

});
