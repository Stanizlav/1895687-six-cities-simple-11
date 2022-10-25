import { AppRoute } from '../../consts';

function AdvertCard():JSX.Element{
  return(
    <article className="cities__card place-card">
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href={AppRoute.Room}>
          <img className="place-card__image" src="img/apartment-03.jpg" width="260" height="200" alt="Apartment"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;180</b>
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
          <a href={AppRoute.Main}>Nice, cozy, warm big bed apartment</a>
        </h2>
        <p className="place-card__type">Apartment</p>
      </div>
    </article>
  );
}

export default AdvertCard;
