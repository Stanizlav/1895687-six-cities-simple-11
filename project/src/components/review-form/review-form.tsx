import { ChangeEvent, FormEvent, useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { MINIMAL_COMMENT_SIZE } from '../../consts/consts';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { isDataSending } from '../../store/application-data/selectors';
import { sendComment } from '../../store/thunk-actions';
import NewCommentData from '../../types/new-comment-data';
import RatingInput from './rating-input';

const INITIAL_RATING = 0;

type ReviewFormProps = {
  hotelId:number;
}

function ReviewForm({hotelId}:ReviewFormProps):JSX.Element{
  const dispatch = useAppDispatch();
  const commentRef = useRef<HTMLTextAreaElement|null>(null);
  const [rating, setRating] = useState(INITIAL_RATING);

  const isSending = useAppSelector(isDataSending);

  useEffect(()=>{
    if(!isSending){
      if(commentRef.current !== null){
        commentRef.current.value = '';
      }
      setRating(INITIAL_RATING);
    }
  },[isSending]);

  const handleRatingChange = (evt:ChangeEvent<HTMLInputElement>)=>{
    const changedRating = Number(evt.target.value);
    setRating(changedRating);
  };

  const handleFormSubmit = (evt:FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(!rating){
      const message = 'You should assess the accomodation before sending the review';
      toast.warn(message);
      return;
    }
    const comment = commentRef.current !== null ? commentRef.current.value : '';

    if(comment.length < MINIMAL_COMMENT_SIZE){
      const message = `The comment must be at least ${MINIMAL_COMMENT_SIZE} caracters`;
      toast.warn(message);
      return;
    }
    const newComment: NewCommentData = {comment, rating};
    dispatch(sendComment({hotelId, newComment}));
  };

  return(
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <RatingInput rating={rating} onChange={handleRatingChange}/>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" ref={commentRef}
        placeholder="Tell how was your stay, what you like and what can be improved"
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
