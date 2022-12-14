import Comment from '../../types/comment';
import StarsRating from '../stars-rating/stars-rating';
import { getFormatedDate, getDateTime } from '../../utils/date-utils';
import { memo } from 'react';

type VisualisedCommentProps = {
  commentary: Comment;
}

function VisualisedComment({commentary}:VisualisedCommentProps):JSX.Element{
  const {user, date, rating, comment} = commentary;
  const {avatarUrl, name} = user;
  const dateTime = getDateTime(date);
  const formatedDate = getFormatedDate(date);

  return(
    <>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <StarsRating rating={rating} className="reviews__stars"/>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time role="time" className="reviews__time" dateTime={dateTime}>{formatedDate}</time>
      </div>
    </>
  );
}

export default memo(VisualisedComment, (previous, current) => previous.commentary.id === current.commentary.id);
