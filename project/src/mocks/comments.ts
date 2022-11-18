import { RAITING_MAX } from '../consts';
import Comment from '../types/comment';
import { AVATARS, COMMENTS } from './consts';

const generateAComment = (id = 0):Comment => {
  const mark = RAITING_MAX * Math.random();
  const commentIndex = id % COMMENTS.length;
  const avatarIndex = id % AVATARS.length;
  const date = new Date();
  const formatedDate = `${date.getMonth()} ${date.getFullYear()}`;
  return{
    id,
    comment: COMMENTS[commentIndex],
    date: formatedDate,
    rating: mark,
    user: {
      avatarUrl: AVATARS[avatarIndex],
      id: avatarIndex,
      isPro: Math.random() > 0.5,
      name: 'Unknown'
    }
  };
};

export const comments = Array.from({length: 5}, (item,index)=>generateAComment(index));
