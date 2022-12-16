import { render, screen } from '@testing-library/react';
import ProperttyGalleryItem from './property-gallery-item';
import { generateImage } from '../../../utils/mocks';

describe('Component: PropertyGalleryItem', ()=>{

  it('should render correctly', ()=>{
    const image = generateImage();
    render(<ProperttyGalleryItem image={image}/>);
    const imageElement = screen.getByRole('img');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', image);
  });

});
