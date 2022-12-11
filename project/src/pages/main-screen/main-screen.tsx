import CitiesList from '../../components/cities-list/cities-list';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import Logo from '../../components/logo/logo';
import Navigation from '../../components/navigation/navigation';
import PlacesPresentation from '../../components/places-presentation/places-presentation';
import { useAppSelector } from '../../hooks/store-hooks';
import { isDataLoading } from '../../store/application-data/selectors';

type MainScreenProps = {
  defaultCardsCount: number;
}


function MainScreen({ defaultCardsCount }: MainScreenProps): JSX.Element {
  const isLoading = useAppSelector(isDataLoading);

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
          <PlacesPresentation maxCountToShow={defaultCardsCount}/>
        </div>
      </main>
    </>
  );
}

export default MainScreen;
