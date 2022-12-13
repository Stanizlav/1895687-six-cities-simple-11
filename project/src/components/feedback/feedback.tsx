import { MAX_COMMENTS_COUNT } from '../../consts/consts';
import { useAppSelector } from '../../hooks/store-hooks';
import { isStatusAuthorised } from '../../store/user-process/selectors';
import Comment from '../../types/comment';
import { getDifference } from '../../utils/date-utils';
import CommentsList from '../comments-list/comments-list';
import ReviewForm from '../review-form/review-form';

type FeedbackProps = {
  comments: Comment[];
  hotelId: number;
}

function Feedback({comments, hotelId}:FeedbackProps):JSX.Element{
  const isAuthorised = useAppSelector(isStatusAuthorised);
  const commentsToShow = comments
    .slice()
    .sort((first, second) => getDifference(second.date, first.date))
    .slice(0, MAX_COMMENTS_COUNT);

  return(
    <div className="property__container container">
      <div className="property__wrapper">
        <section className="property__reviews reviews">
          <h2 className="reviews__title">Reviews &middot;
            <span className="reviews__amount">{comments.length}</span>
          </h2>
          <CommentsList comments={commentsToShow}/>
          {isAuthorised ? <ReviewForm hotelId={hotelId}/> : null}
        </section>
      </div>
    </div>
  );
}

export default Feedback;
