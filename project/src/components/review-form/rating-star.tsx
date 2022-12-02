import { RatingTitle } from '../../consts';

type RatingStarProps = {
  value: number;
  rating: number;
}

function RatingStar({value, rating}:RatingStarProps):JSX.Element{
  const id = `${value}-stars`;
  return(
    <>
      <input className="form__rating-input visually-hidden" name="rating" value={value} id={id} type="radio" checked={rating === value} readOnly/>
      <label htmlFor={id} className="reviews__rating-label form__rating-label" title={RatingTitle[value as keyof typeof RatingTitle]}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default RatingStar;
