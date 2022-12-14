import { render, screen } from '@testing-library/react';
import VisualisedComment from './visualised-comment';
import { generateComment } from '../../utils/mocks';
import { getDateTime, getFormatedDate } from '../../utils/date-utils';

describe('Component: VisualisedComment', ()=>{

  it('should render correctly', ()=>{
    const commentary = generateComment();
    render(<VisualisedComment commentary={commentary}/>);

    const {user, date, comment} = commentary;
    const {name} = user;
    const formatedDate = getFormatedDate(date);
    const dateTime = getDateTime(date);

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(comment)).toBeInTheDocument();
    const timeElement = screen.getByRole('time');
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveAttribute('datetime', dateTime);
    expect(timeElement).toHaveTextContent(formatedDate);
  });

});
