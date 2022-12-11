import { memo } from 'react';
import { Link } from 'react-router-dom';
import Advert from '../../types/advert';
import AppRoute from '../../types/app-route';
import PremiumMark from '../premium-mark/premium-mark';
import StarsRating from '../stars-rating/stars-rating';

type AdvertCardProps = {
  offer:Advert;
  isForNearPlaces?: boolean;
  onMouseOver?:(offer:Advert)=>void;
  onMouseOut?:()=>void;
  onClick?:()=>void;
}

function AdvertCard({offer, isForNearPlaces = false, onMouseOver, onMouseOut, onClick}:AdvertCardProps):JSX.Element{
  const {type, id, title, isPremium, previewImage, price, rating} = offer;

  const handleMouseOver = onMouseOver ? () => onMouseOver(offer) : undefined;

  const classPrefix = isForNearPlaces ? 'near-places' : 'cities';
  const articleClassList = `${classPrefix}__card place-card`;
  const imageWrapperClassList = `${classPrefix}__image-wrapper place-card__image-wrapper`;

  return(
    <article
      className={articleClassList}
      onMouseOver={handleMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
    >
      <PremiumMark isPremium={isPremium} className="place-card__mark"/>
      <div className={imageWrapperClassList}>
        <Link to={`${AppRoute.Room}/${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Apartment"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
        </div>
        <div className="place-card__rating rating">
          <StarsRating rating={rating} className="place-card__stars"/>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default memo(AdvertCard, (previous, current) => previous.offer.id === current.offer.id);
