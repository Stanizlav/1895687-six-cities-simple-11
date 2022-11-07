import { useState } from 'react';
import Advert from '../../types/advert';
import AdvertCard from '../advert-card/advert-card';

type OffersListProps = {
  offers: Advert[];
  count: number;
}

const INITIAL_ACTIVE_CARD_ID = -Infinity;

function OffersList({offers, count}: OffersListProps):JSX.Element{

  const [, setActiveCardId] = useState(INITIAL_ACTIVE_CARD_ID);

  const handleOffersListMouseOver = (id:number) => {
    setActiveCardId((previousActiveCardId) => id);
    // eslint-disable-next-line no-console
    console.log(`Offer's list's state is changing to: ${id}`);
  };

  return (
    <>
      {offers.slice(0, count).map((offer) => (
        <AdvertCard key={offer.id} offer={offer} onMouseOver={handleOffersListMouseOver}/>)
      )}
    </>
  );
}

export default OffersList;
