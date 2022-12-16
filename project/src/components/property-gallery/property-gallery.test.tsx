import { render, screen } from '@testing-library/react';
import { QuantityCap } from '../../consts/consts';
import { generateImages, generateInteger } from '../../utils/mocks';
import ProperttyGallery from './property-gallery';

describe('Component: PropertyGallery', ()=>{
  const MockImagesCountLimit = {
    Min: 1,
    Max: QuantityCap.ForImages + 5
  } as const;

  it('should render correctly', ()=>{
    const mockImagesCount = generateInteger(MockImagesCountLimit.Min, MockImagesCountLimit.Max);
    const images = generateImages(mockImagesCount);

    render(<ProperttyGallery images={images}/>);

    const imageElements = screen.getAllByRole('img');
    imageElements.forEach((imageElement) => expect(imageElement).toBeInTheDocument());
    expect(imageElements.length).toBe(Math.min(QuantityCap.ForImages, mockImagesCount));
  });

});
