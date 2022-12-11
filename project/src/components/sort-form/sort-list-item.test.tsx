import { render, screen } from '@testing-library/react';
import SortListItem from './sort-list-item';
import SortType from '../../types/sort-type';


describe('Component: SortForm', ()=>{

  it('should render correctly', ()=>{
    const sortType = SortType.Popular;
    const onClick = jest.fn();

    render(<SortListItem tabIndex={0} sortType={sortType} currentSortType={sortType} onClick={onClick}/>);

    expect(screen.getByText(`${sortType}`)).toBeInTheDocument();
  });

});
