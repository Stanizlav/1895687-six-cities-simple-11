import { OffersListClassList } from '../../consts/consts';
import { useAppDispatch } from '../../hooks/store-hooks';
import { getRidOfSelectedPoint, selectPoint } from '../../store/application-process/application-process';
import Advert from '../../types/advert';
import AdvertCard from '../advert-card/advert-card';

type OffersListProps = {
  offers: Advert[];
  isForNearPlaces?: boolean;
}

function OffersList({offers, isForNearPlaces = false}: OffersListProps):JSX.Element{
  const dispatch = useAppDispatch();
  const classList = isForNearPlaces ? OffersListClassList.NearPlaces : OffersListClassList.Cities;

  const handleOfferMouseOver = (offer:Advert) => {
    dispatch(selectPoint(offer.location));
  };

  const handleOfferMouseOut = () => {
    dispatch(getRidOfSelectedPoint());
  };

  const handleOfferClick = () => {
    dispatch(getRidOfSelectedPoint());
  };

  return (
    <div role="list" className={classList}>
      {offers.map((offer) => (
        <AdvertCard
          key={offer.id}
          offer={offer}
          isForNearPlaces={isForNearPlaces}
          onMouseOver={isForNearPlaces ? undefined : handleOfferMouseOver}
          onMouseOut={isForNearPlaces ? undefined : handleOfferMouseOut}
          onClick={isForNearPlaces ? undefined : handleOfferClick}
        />)
      )}
    </div>
  );
}

export default OffersList;
