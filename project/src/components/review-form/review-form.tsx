import { ChangeEvent, FormEvent } from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { RAITING_MAX, RatingTitle } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { setSending } from '../../store/actions';
import { makeComment } from '../../store/thunk-actions';
import NewCommentData from '../../types/new-comment-data';

const INITIAL_COMMENT = '';
const INITIAL_RATING = 0;
const MINIMAL_COMMENT_SIZE = 50;

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

type ReviewFormProps = {
  hotelId:number;
}

function ReviewForm({hotelId}:ReviewFormProps):JSX.Element{
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState(INITIAL_COMMENT);
  const [rating, setRating] = useState(INITIAL_RATING);

  const {isSending} = useAppSelector((state)=>state);

  useEffect(()=>{
    if(!isSending){
      setComment(INITIAL_COMMENT);
      setRating(INITIAL_RATING);
    }
  },[isSending]);

  const handleTextAreaInput = (event:ChangeEvent<HTMLTextAreaElement>)=>{
    const typedComment:string = event.target.value ?? '';
    setComment((previousComment:string) => typedComment);
  };

  const handleRatingChange = (event:ChangeEvent<HTMLInputElement>)=>{
    const changedRating = Number(event.target.value);
    setRating((previousRating:number) => changedRating);
  };

  const handleFormSubmit = (evt:FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(comment.length < MINIMAL_COMMENT_SIZE){
      const message = `The comment must be at least ${MINIMAL_COMMENT_SIZE} caracters`;
      toast.warn(message);
      return;
    }
    const newComment: NewCommentData = {comment, rating};
    dispatch(setSending(true));
    dispatch(makeComment({hotelId, newComment}));
  };

  return(
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
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
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MINIMAL_COMMENT_SIZE} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
