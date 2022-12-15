import { RatingTitle } from '../../../../consts/consts';

type RatingStarProps = {
  value: number;
  rating: number;
  disabled?: boolean;
}

function RatingStar({value, rating, disabled = false}:RatingStarProps):JSX.Element{
  const id = `${value}-stars`;
  const isChecked = rating === value;
  const title = RatingTitle[value as keyof typeof RatingTitle];
  const labelClassList = `reviews__rating-label${disabled ? '' : ' form__rating-label'}`;

  return(
    <>
      <input disabled={disabled} className="form__rating-input visually-hidden" name="rating" value={value} id={id} type="radio" checked={isChecked} readOnly/>
      <label htmlFor={id} className={labelClassList} title={title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default RatingStar;
