import { Link } from 'react-router-dom';
import { AppRoute, RAITING_MAX } from '../../consts';
import Advert from '../../types/advert';

type AdvertCardProps = {
  offer:Advert;
  onMouseOver:(id:number)=>void;
}

type PremiumMarkProps = {
  isNeeded:boolean;
}

function PremiumMark({isNeeded}:PremiumMarkProps):JSX.Element | null{
  return isNeeded
    ?
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
    : null;
}

function AdvertCard({offer, onMouseOver}:AdvertCardProps):JSX.Element{
  const {accomodation, id, title, isPremium, picture, price, rating} = offer;

  const handleMouseOver = () => onMouseOver(id);
  const percentageMultiplayer = 100 / RAITING_MAX;

  const ratingPercentage = Math.round(rating) * percentageMultiplayer;
  const stringRatingPercentage = `${ratingPercentage}%`;

  return(
    <article className="cities__card place-card" onMouseOver={handleMouseOver}>
      <PremiumMark isNeeded={isPremium}/>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Room}/:${id}`}>
          <img className="place-card__image" src={picture} width="260" height="200" alt="Apartment"/>
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
          <div className="place-card__stars rating__stars">
            <span style={{
              width: stringRatingPercentage
            }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}/:${offer.id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{accomodation}</p>
      </div>
    </article>
  );
}

export default AdvertCard;
