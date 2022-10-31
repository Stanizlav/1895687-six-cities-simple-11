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

function OffersList({offers, count}:OffersListProps):JSX.Element{

  const initialState:OffersListState = {activeCardId:-Infinity};
  const [state, setState] = useState(initialState);

  const handleOffersListMouseOver = (id:number) => {
    setState({activeCardId:id});
    // eslint-disable-next-line no-console
    console.log(state);
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
