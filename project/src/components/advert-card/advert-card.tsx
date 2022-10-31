import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import Advert from '../../types/advert';

type AdvertCardProps = {
  offer:Advert;
  onMouseOver:(id:number)=>void;
}

type PremiumMarkProps = {
  isNeeded:boolean;
}

function PremiumMark({isNeeded}:PremiumMarkProps):JSX.Element{
  return isNeeded
    ? (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    )
    : (
      <>
      </>
    );
}

function AdvertCard({offer, onMouseOver}:AdvertCardProps):JSX.Element{

  const handleMouseOver = (event:MouseEvent) => {
    if((event.target as Element).closest('article')){
      event.stopPropagation();
      onMouseOver(offer.id);
    }
  };

  return(
    <article key={offer.id} className="cities__card place-card" onMouseOver={handleMouseOver}>
      <PremiumMark isNeeded={offer.isPremium}/>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Room}/:${offer.id}`}>
          <img className="place-card__image" src={offer.picture} width="260" height="200" alt="Apartment"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{
              width: '80%'
            }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}/:${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.accomodation}</p>
      </div>
    </article>
  );
}

export default AdvertCard;
