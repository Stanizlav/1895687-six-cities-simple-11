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
import { MapClassList, PERCENTAGE_MULTIPLAYER } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { selectPoint } from '../../store/actions';
import { getComments, getOffersNearby, getTheOffer } from '../../store/thunk-actions';
import AuthorisationStatus from '../../types/authorisation-status';
import NotFoundScreen from '../not-found-screen/not-found-screen';

type PropertyScreenProps = {
  cardsCount: number;
}

function PropertyScreen({cardsCount}:PropertyScreenProps):JSX.Element{
  const dispatch = useAppDispatch();
  const {authorisationStatus} = useAppSelector((state)=>state);
  const isAuthorised = authorisationStatus === AuthorisationStatus.Auth;
  const {isLoading} = useAppSelector((state)=>state);
  const {offer} = useAppSelector((state)=>state);
  const offersNearby = useAppSelector((state)=>state.offersNearby).slice(0,cardsCount);
  const {comments} = useAppSelector((state)=>state);
  const params = useParams();
  const offerId = Number(params.id);

  useEffect(()=>{
    if(isNaN(offerId)){ return; }
    dispatch(getTheOffer(offerId));
    dispatch(getComments(offerId));
    dispatch(getOffersNearby(offerId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[offerId]);

  if(isLoading) {return <LoadingSpinner/>;}

  if (offer === null || isNaN(offerId)) {return <NotFoundScreen/>;}

  const {city, location, id, images, isPremium, title, rating, type, bedrooms, maxAdults, price, goods, host, description} = offer;
  dispatch(selectPoint(location));
  const points = offersNearby.map((item) => item.location).concat(location);
  const ratingPercentage = Math.round(rating) * PERCENTAGE_MULTIPLAYER;
  const stringRatingPercentage = `${ratingPercentage}%`;

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
                <div className="property__stars rating__stars">
                  <span style={{
                    width: stringRatingPercentage
                  }}
                  >
                  </span>
                  <span className="visually-hidden">Rating</span>
                </div>
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
          <Map className={MapClassList.Property} city={city} points={points}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={offersNearby} isForNearPlaces/>
          </section>
        </div>
      </main>
    </>
  );
}

export default PropertyScreen;
