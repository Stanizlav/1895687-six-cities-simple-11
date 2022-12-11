import { render, screen } from '@testing-library/react';
import VisualisedComment from './visualised-comment';
import { generateComment } from '../../utils/mocks';

describe('Component: VisualisedComment', ()=>{

  it('should render correctly', ()=>{
    const commentary = generateComment();
    render(<VisualisedComment commentary={commentary}/>);

    const {user, date, comment} = commentary;
    const {name} = user;

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(comment)).toBeInTheDocument();
    expect(screen.getByText(date)).toBeInTheDocument();

  });

});
