import { useAppSelector } from '../../hooks/store-hooks';
import { getChosenCity } from '../../store/application-process/selectors';
import { cities } from '../../utils/cities';
import CityItem from './city-item';

function CitiesList():JSX.Element{
  const chosenCity = useAppSelector(getChosenCity);

  return(
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((item) =>
          <CityItem key={item.name} cityName={item.name} isActive={item.name === chosenCity}/>)}
      </ul>
    </section>
  );
}

export default CitiesList;
