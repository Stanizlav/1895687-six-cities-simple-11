import { useState, memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { chooseSortType } from '../../store/application-process/application-process';
import { getSortType } from '../../store/application-process/selectors';
import SortType from '../../types/sort-type';
import SortListItem from './sort-list-item';

function SortForm():JSX.Element{
  const sortType = useAppSelector(getSortType);
  const dispatch = useAppDispatch();
  const [isActive, setActivity] = useState(false);
  const classList = `places__options places__options--custom${ isActive ? ' places__options--opened' : ''}`;

  const handleSortMenuClick = () => {
    setActivity((previous)=>!previous);
  };

  const handleSortMenuItemClick = (newSortType:SortType) => {
    setActivity(false);
    if(newSortType === sortType){
      return;
    }
    dispatch(chooseSortType(newSortType));
  };

  const sorters = Object.values(SortType);

  return(
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleSortMenuClick}>
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={classList}>
        {sorters.map((sorter, index) =>(
          <SortListItem
            key={sorter}
            tabIndex={index + 1}
            sortType={sorter}
            currentSortType={sortType}
            onClick={handleSortMenuItemClick}
          />)
        )}
      </ul>
    </form>
  );
}

export default memo(SortForm);
