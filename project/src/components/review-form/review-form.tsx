import { ChangeEvent } from 'react';
import { useState } from 'react';
import { RAITING_MAX, RatingTitle } from '../../consts';

const INITIAL_COMMENT = '';
const INITIAL_RATING = 0;

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

function ReviewForm():JSX.Element{

  const [comment, setComment] = useState(INITIAL_COMMENT);
  const [rating, setRating] = useState(INITIAL_RATING);

  const handleTextAreaInput = (event:ChangeEvent<HTMLTextAreaElement>)=>{
    const typedComment:string = event.target.value ?? '';
    setComment((previousComment:string) => typedComment);
  };

  const handleRatingChange = (event:ChangeEvent<HTMLInputElement>)=>{
    const changedRating = Number(event.target.value);
    setRating((previousRating:number) => changedRating);
  };

  return(
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating" onChange={handleRatingChange}>
        {Array.from(Array(RAITING_MAX),(v,k)=>RAITING_MAX - k).map((item) => <RatingStar key={item} value={item} rating={rating}/>)}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" onInput={handleTextAreaInput}
        placeholder="Tell how was your stay, what you like and what can be improved" value={comment}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
