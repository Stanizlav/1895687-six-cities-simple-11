import CitiesList from '../../components/cities-list/cities-list';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import Navigation from '../../components/navigation/navigation';
import OffersList from '../../components/offers-list/offers-list';
import { MapClassList } from '../../consts';
import { useAppSelector } from '../../hooks/store-hooks';
import { City } from '../../types/city';
import { cities } from '../../utils/cities';
import { filterOffers } from '../../utils/filter-offers';

type MainScreenProps = {
  defaultCardsCount: number;
}


function MainScreen({ defaultCardsCount }: MainScreenProps): JSX.Element {
  const cityName = useAppSelector((state)=>state.chosenCity);
  const city = cities.find((element) => element.name === cityName) as City;
  const offers = useAppSelector((state)=>filterOffers(state.offers, cityName));
  const points = offers.map((item) => item.location);
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
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={1}>Popular</li>
                  <li className="places__option" tabIndex={2}>Price: low to high</li>
                  <li className="places__option" tabIndex={3}>Price: high to low</li>
                  <li className="places__option" tabIndex={4}>Top rated first</li>
                </ul>
              </form>
              <OffersList offers={offers} isForNearPlaces={false} count={defaultCardsCount}/>
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
