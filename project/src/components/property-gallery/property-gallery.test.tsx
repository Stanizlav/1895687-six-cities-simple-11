import { render, screen } from '@testing-library/react';
import { MAX_IMAGES_COUNT } from '../../consts/consts';
import { generateImages } from '../../utils/mocks';
import ProperttyGallery from './property-gallery';

describe('Component: PropertyGallery', ()=>{
  const maxMockImagesCount = MAX_IMAGES_COUNT + 5;

  it('should render correctly', ()=>{
    const mockImagesCount = Math.floor(maxMockImagesCount * Math.random());
    const images = generateImages(mockImagesCount);

    render(<ProperttyGallery images={images}/>);

    const imageElements = screen.getAllByRole('img');
    imageElements.forEach((imageElement) => expect(imageElement).toBeInTheDocument());
    expect(imageElements.length).toBe(Math.min(MAX_IMAGES_COUNT, mockImagesCount));
  });

});
