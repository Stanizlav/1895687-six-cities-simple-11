import { memo } from 'react';
import Advert from '../../types/advert';
import PremiumMark from '../premium-mark/premium-mark';
import PropertyGallery from '../property-gallery/property-gallery';
import PropertyGoodsList from '../property-goods-list/property-goods-list';
import PropertyHost from '../property-host/property-host';
import StarsRating from '../stars-rating/stars-rating';

type CompleteOfferProps = {
  offer: Advert;
}

function CompleteOffer({offer}:CompleteOfferProps):JSX.Element{
  const {images, isPremium, title, rating, type, bedrooms, maxAdults, price, goods, host, description} = offer;

  return(
    <>
      <PropertyGallery images={images}/>
      <div className="property__container container">
        <div className="property__wrapper">
          <PremiumMark isPremium={isPremium} className="property__mark"/>
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
        </div>
      </div>
    </>
  );
}

export default memo(CompleteOffer, (previous, current)=>previous.offer.id === current.offer.id);
