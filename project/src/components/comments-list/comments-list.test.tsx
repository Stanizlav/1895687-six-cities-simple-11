import { render, screen } from '@testing-library/react';
import { generateComments, generateInteger } from '../../utils/mocks';
import CommentsList from './comments-list';

describe('Component: CommentsList', ()=>{
  const MockCommentsCountLimit = {
    Min: 1,
    Max: 10
  } as const;

  it('should render correctly', ()=>{
    const mockCommentsCount = generateInteger(MockCommentsCountLimit.Min, MockCommentsCountLimit.Max);
    const mockComments = generateComments(mockCommentsCount);

    render(<CommentsList comments={mockComments}/>);

    expect(screen.getByRole('list')).toBeInTheDocument();
    const commentItems = screen.getAllByRole('listitem');
    expect(commentItems.length).toBe(mockComments.length);
    commentItems.forEach((item) => expect(item).toBeInTheDocument());
  });

});
