import Advert from '../types/advert';
import SortType from '../types/sort-type';

const sortOffers = {
  [SortType.Popular]: (offers:Advert[]) => offers,
  [SortType.PriceAscending]: (offers:Advert[]) => offers.slice().sort((a,b: Advert)=>a.price - b.price),
  [SortType.PriceDescending]: (offers:Advert[]) => offers.slice().sort((a,b: Advert)=>b.price - a.price),
  [SortType.RatingDescending]: (offers:Advert[]) => offers.slice().sort((a,b: Advert)=>b.rating - a.rating),
};

export default sortOffers;
