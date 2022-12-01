import { Link } from 'react-router-dom';
import { PERCENTAGE_MULTIPLAYER } from '../../consts';
import { useAppDispatch } from '../../hooks/store-hooks';
import { selectPoint } from '../../store/actions';
import Advert from '../../types/advert';
import AppRoute from '../../types/app-route';

type AdvertCardProps = {
  offer:Advert;
  isForNearPlaces: boolean;
  onMouseOver:(offer:Advert)=>void;
  onMouseOut:()=>void;
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

function AdvertCard({offer, isForNearPlaces, onMouseOver, onMouseOut}:AdvertCardProps):JSX.Element{
  const {type, id, title, isPremium, previewImage, price, rating} = offer;

  const handleMouseOver = () => onMouseOver(offer);

  const ratingPercentage = Math.round(rating) * PERCENTAGE_MULTIPLAYER;
  const stringRatingPercentage = `${ratingPercentage}%`;
  const classPrefix = isForNearPlaces ? 'near-places' : 'cities';
  const articleClassList = `${classPrefix}__card place-card`;
  const imageWrapperClassList = `${classPrefix}__image-wrapper place-card__image-wrapper`;

  const dispatch = useAppDispatch();
  const handleLinkClick = ()=>{
    dispatch(selectPoint(offer.location));
  };

  return(
    <article className={articleClassList} onMouseOver={handleMouseOver} onMouseOut={onMouseOut}>
      <PremiumMark isNeeded={isPremium}/>
      <div className={imageWrapperClassList}>
        <Link to={`${AppRoute.Room}/${id}`} onClick={handleLinkClick}>
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
          <Link to={`${AppRoute.Room}/${id}`} onClick={handleLinkClick}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default AdvertCard;
