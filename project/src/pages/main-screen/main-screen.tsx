import CitiesList from '../../components/cities-list/cities-list';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import Navigation from '../../components/navigation/navigation';
import OffersList from '../../components/offers-list/offers-list';
import SortForm from '../../components/sort-form/sort-form';
import { MapClassList } from '../../consts';
import { useAppSelector } from '../../hooks/store-hooks';
import { City } from '../../types/city';
import { cities } from '../../utils/cities';
import { filterOffers } from '../../utils/filter-offers';
import { sortOffers } from '../../utils/sort-offers';

type MainScreenProps = {
  defaultCardsCount: number;
}


function MainScreen({ defaultCardsCount }: MainScreenProps): JSX.Element {
  const cityName = useAppSelector((state)=>state.chosenCity);
  const sortType = useAppSelector((state)=>state.sortType);
  const city = cities.find((element) => element.name === cityName) as City;
  const offers = useAppSelector((state)=>filterOffers(state.offers, cityName));
  const sortedOffers = sortOffers[sortType](offers)
    .slice(0, defaultCardsCount);
  const points = sortedOffers.map((item) => item.location);
  const offersCount = offers.length;
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo/>
            <Navigation/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList/>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} place{offersCount > 1 ? 's' : ''} to stay in {cityName}</b>
              <SortForm/>
              <OffersList offers={sortedOffers} isForNearPlaces={false}/>
            </section>
            <div className="cities__right-section">
              <Map className={MapClassList.Cities} city={city} points={points}/>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MainScreen;
