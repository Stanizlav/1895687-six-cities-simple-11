import { ChangeEvent } from 'react';
import { useState } from 'react';

type ReviewFormState = {
  comment: string;
  rating: number;
}

const INITIAL_STATE: ReviewFormState = {
  comment: '',
  rating: 0
};

function ReviewForm():JSX.Element{

  const [state, setState] = useState(INITIAL_STATE);

  const handleTextAreaInput = (event:ChangeEvent<HTMLTextAreaElement>)=>{
    const typedComment:string = event.target.value ? event.target.value : '';
    setState((previousState:ReviewFormState) => ({
      ...previousState,
      comment: typedComment
    }));
  };

  const handleRatingChange = (event:ChangeEvent<HTMLInputElement>)=>{
    if((event.target as Element).matches('input[type=radio]')){
      event.stopPropagation();
      const changedRating = Number(event.target.value);
      setState((previousState)=>({
        ...previousState,
        rating: changedRating
      }));
    }
  };

  return(
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating" onChange={handleRatingChange}>
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" checked={state.rating === 5}/>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" checked={state.rating === 4}/>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" checked={state.rating === 3}/>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" checked={state.rating === 2}/>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" checked={state.rating === 1}/>
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" onInput={handleTextAreaInput}
        placeholder="Tell how was your stay, what you like and what can be improved" value={state.comment}
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
