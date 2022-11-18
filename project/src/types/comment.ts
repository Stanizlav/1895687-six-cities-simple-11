import Person from './person';

type Comment = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: Person;
}

export default Comment;
