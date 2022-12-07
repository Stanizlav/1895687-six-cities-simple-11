import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CompleteOffer from '../../components/complete-offer/complete-offer';
import Feedback from '../../components/feedback/feedback';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import Navigation from '../../components/navigation/navigation';
import OffersList from '../../components/offers-list/offers-list';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { getTheOfferData } from '../../store/application-data/selectors';
import { fetchTheOffer } from '../../store/thunk-actions';
import NotFoundScreen from '../not-found-screen/not-found-screen';

type PropertyScreenProps = {
  cardsCount: number;
}

function PropertyScreen({cardsCount}:PropertyScreenProps):JSX.Element{
  const dispatch = useAppDispatch();
  const {isLoading, offer, comments, offersNearby} = useAppSelector(getTheOfferData);
  const params = useParams();
  const offerId = Number(params.id);

  useEffect(()=>{
    if(isNaN(offerId)){
      return;
    }
    dispatch(fetchTheOffer(offerId));
  },[dispatch, offerId]);

  if(isLoading) {
    return <LoadingSpinner/>;
  }

  if (offer === null || isNaN(offerId) || offer.id !== offerId) {
    return <NotFoundScreen/>;
  }

  const {city, location, id} = offer;
  const offersToShow = offersNearby.slice(0,cardsCount);
  const points = offersToShow.map((item) => item.location).concat(location);

  return(
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo/>
            <Navigation/>
          </div>
        </div>
      </header>
      <main className="page__main page__main--property">
        <section className="property">
          <CompleteOffer offer={offer}/>
          <Feedback comments={comments} hotelId={id}/>
          <Map className="property__map" city={city} points={points} standingOutPoint={location}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={offersToShow} isForNearPlaces/>
          </section>
        </div>
      </main>
    </>
  );
}

export default PropertyScreen;
