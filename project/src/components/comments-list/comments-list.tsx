import Comment from '../../types/comment';
import VisualisedComment from '../visualised-comment/visualised-comment';

type CommentsListProps = {
  comments: Comment[];
}

function CommentsList({comments}:CommentsListProps):JSX.Element{
  return(
    <ul className="reviews__list">
      {comments.map((item) => <li key={item.id} className="reviews__item"><VisualisedComment commentary={item}/></li>)}
    </ul>
  );
}

export default CommentsList;
