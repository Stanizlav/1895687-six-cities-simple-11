import { cities } from '../../utils/cities';
import CityItem from './city-item';

export default function CitiesList():JSX.Element{
  return(
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((item)=><CityItem key={item.name} cityName={item.name}/>)}
      </ul>
    </section>
  );
}
