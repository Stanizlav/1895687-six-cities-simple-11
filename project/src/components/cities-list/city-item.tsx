import { MouseEvent, memo } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/store-hooks';
import { changeCity } from '../../store/application-process/application-process';
import AppRoute from '../../types/app-route';
import CitiesName from '../../types/cities-name';

type CityItemProps = {
  cityName: CitiesName;
  isActive?: boolean;
}

function CityItem({cityName, isActive = false}:CityItemProps):JSX.Element{
  const dispatch = useAppDispatch();

  const handleLinkClick = (event:MouseEvent<HTMLAnchorElement>)=>{
    event.preventDefault();
    if (isActive){
      return;
    }
    dispatch(changeCity(cityName));
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

export default memo(CityItem);

