import { ChangeEvent, useMemo } from 'react';
import { RAITING_MAX } from '../../consts/consts';
import RatingStar from './rating-star';

type RatingInputProps = {
  rating:number;
  onChange: (event:ChangeEvent<HTMLInputElement>)=>void;
}

function RatingInput({rating, onChange}:RatingInputProps):JSX.Element{
  const ratingValues = useMemo(()=>Array.from(Array(RAITING_MAX), (element, index)=>RAITING_MAX - index), []);

  return(
    <div className="reviews__rating-form form__rating" onChange={onChange}>
      {ratingValues.map((item) => <RatingStar key={item} value={item} rating={rating}/>)}
    </div>
  );
}

export default RatingInput;
