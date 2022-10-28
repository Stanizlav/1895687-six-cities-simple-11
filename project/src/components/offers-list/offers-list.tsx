import Advert from '../../types/advert';
import AdvertCard from '../advert-card/advert-card';

type OffersListProps = {
  offers: Advert[];
  count: number;
}

function OffersList({offers, count}:OffersListProps):JSX.Element{
  return (
    <>
      {offers.slice(0, count).map((offer) => AdvertCard({offer}))}
    </>
  );
}

export default OffersList;
