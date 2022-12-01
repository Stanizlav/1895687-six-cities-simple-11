import { useEffect } from 'react';
import CitiesList from '../../components/cities-list/cities-list';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import Navigation from '../../components/navigation/navigation';
import OffersList from '../../components/offers-list/offers-list';
import SortForm from '../../components/sort-form/sort-form';
import { MapClassList } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { getOffers } from '../../store/thunk-actions';
import { cities, DEFAULT_CITY } from '../../utils/cities';

type MainScreenProps = {
  defaultCardsCount: number;
}


function MainScreen({ defaultCardsCount }: MainScreenProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {isLoading} = useAppSelector((state)=>state);
  const {chosenCity} = useAppSelector((state)=>state);
  const city = cities.find((element) => element.name === chosenCity) ?? DEFAULT_CITY ;
  const {formatedOffers} = useAppSelector((state)=>state);
  const offersCount = formatedOffers.length;
  const offersToShow = formatedOffers.slice(0, defaultCardsCount);
  const points = offersToShow.map((item) => item.location);

  useEffect(()=>{
    dispatch(getOffers());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  if(isLoading){
    return <LoadingSpinner/>;
  }

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
              <OffersList offers={offersToShow}/>
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
