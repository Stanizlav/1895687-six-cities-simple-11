import { ChangeEvent, useMemo } from 'react';
import { RATING_MAX } from '../../consts/consts';
import RatingStar from './rating-star';

type RatingInputProps = {
  rating:number;
  onChange: (event:ChangeEvent<HTMLInputElement>)=>void;
  disabled?: boolean;
}

function RatingInput({rating, onChange, disabled = false}:RatingInputProps):JSX.Element{
  const ratingValues = useMemo(()=>Array.from(Array(RATING_MAX), (element, index)=>RATING_MAX - index), []);

  return(
    <div role="radiogroup" className="reviews__rating-form form__rating" onChange={onChange}>
      {ratingValues.map((item) => <RatingStar key={item} value={item} rating={rating} disabled={disabled}/>)}
    </div>
  );
}

export default RatingInput;
