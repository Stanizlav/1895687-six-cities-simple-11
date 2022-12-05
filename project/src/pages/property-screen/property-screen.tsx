import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentsList from '../../components/comments-list/comments-list';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import Navigation from '../../components/navigation/navigation';
import OffersList from '../../components/offers-list/offers-list';
import PropertyGallery from '../../components/property-gallery/property-gallery';
import PropertyGoodsList from '../../components/property-goods-list/property-goods-list';
import PropertyHost from '../../components/property-host/property-host';
import ReviewForm from '../../components/review-form/review-form';
import StarsRating from '../../components/stars-rating/stars-rating';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { getComments, getOffersNearby, getTheOffer, isDataLoading } from '../../store/application-data/selectors';
import { selectPoint } from '../../store/application-process/application-process';
import { fetchTheOffer } from '../../store/thunk-actions';
import { isStatusAuthorised } from '../../store/user-process/selectors';
import NotFoundScreen from '../not-found-screen/not-found-screen';

type PropertyScreenProps = {
  cardsCount: number;
}

function PropertyScreen({cardsCount}:PropertyScreenProps):JSX.Element{
  const dispatch = useAppDispatch();
  const
    isAuthorised = useAppSelector(isStatusAuthorised),
    isLoading = useAppSelector(isDataLoading),
    offer = useAppSelector(getTheOffer),
    comments = useAppSelector(getComments),
    offersNearby = useAppSelector(getOffersNearby);
  const offersToShow = offersNearby.slice(0,cardsCount);
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

  const {city, location, id, images, isPremium, title, rating, type, bedrooms, maxAdults, price, goods, host, description} = offer;
  dispatch(selectPoint(location));
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
          <PropertyGallery images={images}/>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium ?
                <div className="property__mark">
                  <span>Premium</span>
                </div>
                : null}
              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
              </div>
              <div className="property__rating rating">
                <StarsRating rating={rating} className="property__stars"/>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">{type}</li>
                <li className="property__feature property__feature--bedrooms">{bedrooms} Bedrooms</li>
                <li className="property__feature property__feature--adults">Max {maxAdults} adults</li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <PropertyGoodsList goods={goods}/>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <PropertyHost host={host}/>
                <div className="property__description">
                  <p className="property__text">{description}</p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                <CommentsList comments={comments}/>
                {isAuthorised ? <ReviewForm hotelId={id}/> : null}
              </section>
            </div>
          </div>
          <Map className="property__map" city={city} points={points}/>
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
