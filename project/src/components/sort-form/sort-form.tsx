import { useState, memo } from 'react';
import { SORT_FORM_ACTIVITY_CLASS, SORT_FORM_TAB_INDEX_START } from '../../consts/consts';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { chooseSortType } from '../../store/application-process/application-process';
import { getSortType } from '../../store/application-process/selectors';
import SortType from '../../types/sort-type';
import SortListItem from './sort-list-item';

function SortForm():JSX.Element{
  const sortType = useAppSelector(getSortType);
  const dispatch = useAppDispatch();
  const [isActive, setActivity] = useState(false);
  const appendedClass = isActive ? ` ${SORT_FORM_ACTIVITY_CLASS}` : '';
  const classList = `places__options places__options--custom${appendedClass}`;

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

  const sortOptions = Object.values(SortType);

  return(
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span role="button" className="places__sorting-type" tabIndex={SORT_FORM_TAB_INDEX_START} onClick={handleSortMenuClick}>
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={classList}>
        {sortOptions.map((sortOption, index) =>(
          <SortListItem
            key={sortOption}
            tabIndex={SORT_FORM_TAB_INDEX_START + index + 1}
            sortType={sortOption}
            currentSortType={sortType}
            onClick={handleSortMenuItemClick}
          />)
        )}
      </ul>
    </form>
  );
}

export default memo(SortForm);
