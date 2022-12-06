import { useAppSelector } from '../../hooks/store-hooks';
import { getOffersData } from '../../store/application-process/selectors';
import { cities, DEFAULT_CITY } from '../../utils/cities';
import Map from '../map/map';
import OffersList from '../offers-list/offers-list';
import SortForm from '../sort-form/sort-form';
import NoPlacesPresentation from './no-places-presentation';

type PlacesPresentationProps = {
  maxCountToShow: number;
}

function PlacesPresentation({maxCountToShow}: PlacesPresentationProps):JSX.Element{

  const {chosenCity, offers} = useAppSelector(getOffersData);
  const offersCount = offers.length;

  if(!offersCount){
    return <NoPlacesPresentation cityName={chosenCity}/>;
  }

  const offersCountMessage = `${offersCount} place${offersCount > 1 ? 's' : ''} to stay in ${chosenCity}`;
  const offersToShow = offers.slice(0, maxCountToShow);
  const city = cities.find((element) => element.name === chosenCity) ?? DEFAULT_CITY ;
  const points = offersToShow.map((item) => item.location);

  return(
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offersCountMessage}</b>
        <SortForm/>
        <OffersList offers={offersToShow}/>
      </section>
      <div className="cities__right-section">
        <Map className="cities__map" city={city} points={points}/>
      </div>
    </div>
  );
}

export default PlacesPresentation;
