import { render, screen } from '@testing-library/react';
import { MAX_IMAGES_COUNT } from '../../consts/consts';
import { generateImages, generateInteger } from '../../utils/mocks';
import ProperttyGallery from './property-gallery';

const MIN_MOCK_IMAGES_COUNT = 1;

describe('Component: PropertyGallery', ()=>{

  it('should render correctly', ()=>{
    const maxMockImagesCount = MAX_IMAGES_COUNT + 5;
    const mockImagesCount = generateInteger(MIN_MOCK_IMAGES_COUNT, maxMockImagesCount);
    const images = generateImages(mockImagesCount);

    render(<ProperttyGallery images={images}/>);

    const imageElements = screen.getAllByRole('img');
    imageElements.forEach((imageElement) => expect(imageElement).toBeInTheDocument());
    expect(imageElements.length).toBe(Math.min(MAX_IMAGES_COUNT, mockImagesCount));
  });

});
