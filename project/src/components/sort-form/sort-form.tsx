import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { setSortType } from '../../store/actions';
import { SortType } from '../../types/sort-type';
import SortListItem from './sort-list-item';

function SortForm():JSX.Element{
  const currentSortType = useAppSelector((state)=>state.sortType);
  const dispatch = useAppDispatch();
  const [isActive, setActivity] = useState(false);
  const classList = `places__options places__options--custom${ isActive ? ' places__options--opened' : ''}`;

  const handleSortMenuClick = () => {
    setActivity((previous)=>!previous);
  };

  const handleSortMenuItemClick = (sortType:SortType) => {
    setActivity(false);
    dispatch(setSortType({sortType}));
  };

  return(
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleSortMenuClick}>
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={classList}>
        <SortListItem tabIndex={1} sortType={SortType.Popular} currentSortType={currentSortType} onClick={handleSortMenuItemClick}/>
        <SortListItem tabIndex={2} sortType={SortType.PriceAscending} currentSortType={currentSortType} onClick={handleSortMenuItemClick}/>
        <SortListItem tabIndex={3} sortType={SortType.PriceDescending} currentSortType={currentSortType} onClick={handleSortMenuItemClick}/>
        <SortListItem tabIndex={4} sortType={SortType.RatingDescending} currentSortType={currentSortType} onClick={handleSortMenuItemClick}/>
      </ul>
    </form>
  );
}

export default SortForm;
