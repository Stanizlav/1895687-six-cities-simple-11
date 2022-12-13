import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { CommentSizeLimit } from '../../consts/consts';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { hasDataSendingError, isDataSending } from '../../store/application-data/selectors';
import { sendComment } from '../../store/thunk-actions';
import NewCommentData from '../../types/new-comment-data';
import RatingInput from './rating-input';

const INITIAL_RATING = 0;
const INITIAL_COMMENT = '';

type ReviewFormProps = {
  hotelId:number;
}

function ReviewForm({hotelId}:ReviewFormProps):JSX.Element{
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState(INITIAL_COMMENT);
  const [rating, setRating] = useState(INITIAL_RATING);

  const isSending = useAppSelector(isDataSending);
  const hasSendingError = useAppSelector(hasDataSendingError);

  const isSubmitDisabled = isSending || !rating || (comment.length < CommentSizeLimit.Min);
  const submitButtonText = isSending ? 'Sending...' : 'Submit';

  useEffect(()=>{
    if(!isSending && !hasSendingError){
      setComment(INITIAL_COMMENT);
      setRating(INITIAL_RATING);
    }
  },[hasSendingError, isSending]);

  const handleRatingChange = (evt:ChangeEvent<HTMLInputElement>)=>{
    const changedRating = Number(evt.target.value);
    setRating(changedRating);
  };

  const handleCommentChange = (evt:ChangeEvent<HTMLTextAreaElement>)=>{
    const changedComment = (evt.target.value);
    setComment(changedComment);
  };

  const handleFormSubmit = (evt:FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const newComment: NewCommentData = {comment, rating};
    dispatch(sendComment({hotelId, newComment}));
  };

  return(
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <RatingInput disabled={isSending} rating={rating} onChange={handleRatingChange}/>
      <textarea disabled={isSending} className="reviews__textarea form__textarea" id="review" name="review" value={comment}
        maxLength={CommentSizeLimit.Max} onChange={handleCommentChange} placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{CommentSizeLimit.Min} characters</b>.
        </p>
        <button disabled={isSubmitDisabled} className="reviews__submit form__submit button" type="submit">{submitButtonText}</button>
      </div>
    </form>
  );
}

export default ReviewForm;
