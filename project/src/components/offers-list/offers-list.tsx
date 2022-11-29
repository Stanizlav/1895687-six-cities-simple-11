import { OffersListClassList } from '../../consts';
import { useAppDispatch } from '../../hooks/store-hooks';
import { getRidOfSelectedPoint, selectPoint } from '../../store/actions';
import Advert from '../../types/advert';
import AdvertCard from '../advert-card/advert-card';

type OffersListProps = {
  offers: Advert[];
  isForNearPlaces?: boolean;
}

function OffersList({offers, isForNearPlaces = false}: OffersListProps):JSX.Element{
  const dispatch = useAppDispatch();

  const handleOffersListMouseOver = (offer:Advert) => {
    if (isForNearPlaces) {return;}
    dispatch(selectPoint({point: offer.location}));
  };

  const handleOffersListMouseOut = () => {
    if (isForNearPlaces) {return;}
    dispatch(getRidOfSelectedPoint());
  };

  return (
    <div className={isForNearPlaces ? OffersListClassList.NearPlaces : OffersListClassList.Cities}>
      {offers.map((offer) => (
        <AdvertCard
          key={offer.id}
          offer={offer}
          isForNearPlaces={isForNearPlaces}
          onMouseOver={handleOffersListMouseOver}
          onMouseOut={handleOffersListMouseOut}
        />)
      )}
    </div>
  );
}

export default OffersList;
