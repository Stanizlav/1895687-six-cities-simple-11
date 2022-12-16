import { render, screen } from '@testing-library/react';
import { generateImages, generateInteger } from '../../utils/mocks';
import PropertyGoodsList from './property-goods-list';

describe('Component: PropertyGoodsList', ()=>{
  const MockGoodsCountLimit = {
    Min: 1,
    Max: 10
  } as const;

  it('should render properly', ()=>{
    const mockGoodsCount = generateInteger(MockGoodsCountLimit.Min, MockGoodsCountLimit.Max);
    const goods = generateImages(mockGoodsCount);

    render(<PropertyGoodsList goods={goods}/>);
    expect(screen.getByRole('list')).toBeInTheDocument();
    const goodItems = screen.getAllByRole('listitem');
    expect(goodItems.length).toBe(goods.length);
    goodItems.forEach((item) => expect(item).toBeInTheDocument());
  });

});
