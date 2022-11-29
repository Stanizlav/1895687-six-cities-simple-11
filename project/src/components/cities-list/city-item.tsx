import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute} from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { changeCity } from '../../store/actions';
import CitiesName from '../../types/cities-name';

type CityItemProps = {
  cityName: CitiesName;
}

function CityItem({cityName}:CityItemProps):JSX.Element{
  const isActive = useAppSelector((state) => state.chosenCity === cityName);
  const dispatch = useAppDispatch();

  const handleLinkClick = (event:MouseEvent<HTMLAnchorElement>)=>{
    event.preventDefault();
    if (isActive){
      return;
    }
    dispatch(changeCity({chosenCity: cityName}));
  };
  const classList = `locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`;

  return(
    <li className="locations__item">
      <Link
        className={classList}
        to={AppRoute.Main}
        onClick={handleLinkClick}
      >
        <span>{cityName}</span>
      </Link>
    </li>
  );
}

export default CityItem;

