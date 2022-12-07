import { useAppSelector } from '../../hooks/store-hooks';
import { isStatusAuthorised } from '../../store/user-process/selectors';
import Comment from '../../types/comment';
import CommentsList from '../comments-list/comments-list';
import ReviewForm from '../review-form/review-form';

type FeedbackProps = {
  comments: Comment[];
  hotelId: number;
}

function Feedback({comments, hotelId}:FeedbackProps):JSX.Element{
  const isAuthorised = useAppSelector(isStatusAuthorised);

  return(
    <div className="property__container container">
      <div className="property__wrapper">
        <section className="property__reviews reviews">
          <h2 className="reviews__title">Reviews &middot;
            <span className="reviews__amount">{comments.length}</span>
          </h2>
          <CommentsList comments={comments}/>
          {isAuthorised ? <ReviewForm hotelId={hotelId}/> : null}
        </section>
      </div>
    </div>
  );
}

export default Feedback;
