import { ChangeEvent } from 'react';
import { RAITING_MAX } from '../../consts';
import RatingStar from './rating-star';

type RatingInputProps = {
  rating:number;
  onChange: (event:ChangeEvent<HTMLInputElement>)=>void;
}

function RatingInput({rating, onChange}:RatingInputProps):JSX.Element{
  return(
    <div className="reviews__rating-form form__rating" onChange={onChange}>
      {Array.from(Array(RAITING_MAX),(v,k)=>RAITING_MAX - k).map((item) => <RatingStar key={item} value={item} rating={rating}/>)}
    </div>
  );
}

export default RatingInput;
