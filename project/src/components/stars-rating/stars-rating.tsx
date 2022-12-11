import { PERCENTAGE_MULTIPLAYER } from '../../consts/consts';

type StarsRatingProps = {
  rating:number;
  className?:string;
}

function StarsRating({rating, className = ''}:StarsRatingProps):JSX.Element{
  const classList = `${className} rating__stars`;
  const ratingPercentage = Math.round(rating) * PERCENTAGE_MULTIPLAYER;
  const stringRatingPercentage = `${ratingPercentage}%`;
  return(
    <div className={classList}>
      <span style={{
        width: stringRatingPercentage
      }}
      >
      </span>
      <span className="visually-hidden">Rating</span>
    </div>
  );
}

export default StarsRating;
