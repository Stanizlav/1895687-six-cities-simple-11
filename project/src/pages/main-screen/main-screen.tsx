import { useEffect } from 'react';
import CitiesList from '../../components/cities-list/cities-list';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import Navigation from '../../components/navigation/navigation';
import OffersList from '../../components/offers-list/offers-list';
import SortForm from '../../components/sort-form/sort-form';
import { MapClassList } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { fillOffersListUp } from '../../store/actions';
import Advert from '../../types/advert';
import { cities, DEFAULT_CITY } from '../../utils/cities';

type MainScreenProps = {
  defaultCardsCount: number;
  offers: Advert[];
}


function MainScreen({ defaultCardsCount, offers}: MainScreenProps): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(fillOffersListUp({offers}));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const {chosenCity} = useAppSelector((state)=>state);
  const city = cities.find((element) => element.name === chosenCity) ?? DEFAULT_CITY ;
  const {formatedOffers} = useAppSelector((state)=>state);
  const offersCount = formatedOffers.length;
  const offersToShow = formatedOffers.slice(0, defaultCardsCount);
  const points = offersToShow.map((item) => item.location);

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
              <b className="places__found">{offersCount} place{offersCount > 1 ? 's' : ''} to stay in {chosenCity}</b>
              <SortForm/>
              <OffersList offers={offersToShow} isForNearPlaces={false}/>
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
