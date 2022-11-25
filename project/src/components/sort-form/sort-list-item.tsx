import { SortType } from '../../types/sort-type';

type SortListItemProps = {
  tabIndex: number;
  sortType: SortType;
  currentSortType: SortType;
  onClick: (sortType: SortType) => void;
}

function SortListItem({tabIndex, sortType, currentSortType, onClick}:SortListItemProps):JSX.Element{
  const classList = `places__option${ sortType === currentSortType ? ' places__option--active' : ''}`;
  const handleTheItemClick = () => onClick(sortType);

  return <li className={classList} tabIndex={tabIndex} onClick={handleTheItemClick}>{sortType}</li>;
}

export default SortListItem;
