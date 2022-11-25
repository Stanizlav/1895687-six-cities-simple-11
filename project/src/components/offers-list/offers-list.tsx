import { useState } from 'react';
import { OffersListClassList } from '../../consts';
import Advert from '../../types/advert';
import AdvertCard from '../advert-card/advert-card';

type OffersListProps = {
  offers: Advert[];
  isForNearPlaces: boolean;
  count: number;
}

const INITIAL_ACTIVE_CARD_ID = -Infinity;

function OffersList({offers, isForNearPlaces, count}: OffersListProps):JSX.Element{

  const [, setActiveCardId] = useState(INITIAL_ACTIVE_CARD_ID);

  const handleOffersListMouseOver = (offer:Advert) => {
    setActiveCardId((previousActiveCardId) => offer.id);
    // eslint-disable-next-line no-console
    console.log(`Offer's list's state is changing to: ${offer.id}`);
    //console.log(offer);
  };

  return (
    <div className={isForNearPlaces ? OffersListClassList.NearPlaces : OffersListClassList.Cities}>
      {offers.slice(0, count).map((offer) => (
        <AdvertCard key={offer.id} offer={offer} isForNearPlaces={isForNearPlaces} onMouseOver={handleOffersListMouseOver}/>)
      )}
    </div>
  );
}

export default OffersList;
