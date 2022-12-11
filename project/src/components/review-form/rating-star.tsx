import { RatingTitle } from '../../consts/consts';

type RatingStarProps = {
  value: number;
  rating: number;
}

function RatingStar({value, rating}:RatingStarProps):JSX.Element{
  const id = `${value}-stars`;
  const isChecked = rating === value;
  const title = RatingTitle[value as keyof typeof RatingTitle];

  return(
    <>
      <input className="form__rating-input visually-hidden" name="rating" value={value} id={id} type="radio" checked={isChecked} readOnly/>
      <label htmlFor={id} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default RatingStar;
