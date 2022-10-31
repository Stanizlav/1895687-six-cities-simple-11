import { useState } from 'react';
import Advert from '../../types/advert';
import AdvertCard from '../advert-card/advert-card';

type OffersListProps = {
  offers: Advert[];
  count: number;
}

type OffersListState = {
  activeCardId: number;
}

const INITIAL_STATE: OffersListState = {activeCardId:-Infinity};

function OffersList({offers, count}: OffersListProps):JSX.Element{

  const [, setState] = useState(INITIAL_STATE);

  const handleOffersListMouseOver = (id:number) => {
    setState({activeCardId:id});
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
