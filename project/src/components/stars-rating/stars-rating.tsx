import { PERCENTAGE_MULTIPLAYER } from '../../consts/consts';

type StarsRatingProps = {
  rating:number;
  className?:string;
}

function StarsRating({rating, className}:StarsRatingProps):JSX.Element{
  const appendedClass = className ? `${className} ` : '';
  const classList = `${appendedClass}rating__stars`;
  const ratingPercentage = Math.round(rating) * PERCENTAGE_MULTIPLAYER;
  const stringRatingPercentage = `${ratingPercentage}%`;
  return(
    <div className={classList}>
      <span data-testid="stars" style={{
        width: stringRatingPercentage
      }}
      >
      </span>
      <span className="visually-hidden">Rating</span>
    </div>
  );
}

export default StarsRating;
