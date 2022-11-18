import { PERCENTAGE_MULTIPLAYER } from '../../consts';
import Comment from '../../types/comment';

type VisualisedCommentProps = {
  commentary: Comment;
}

function VisualisedComment({commentary}:VisualisedCommentProps):JSX.Element{
  const {user, date, rating, comment} = commentary;
  const {avatarUrl, name} = user;

  const showingDate = date;
  const formatedDate = date;
  const ratingPercentage = Math.round(rating) * PERCENTAGE_MULTIPLAYER;
  const stringRatingPercentage = `${ratingPercentage}%`;

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
          <div className="reviews__stars rating__stars">
            <span style={{
              width: stringRatingPercentage
            }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={formatedDate}>{showingDate}</time>
      </div>
    </>
  );
}

export default VisualisedComment;
