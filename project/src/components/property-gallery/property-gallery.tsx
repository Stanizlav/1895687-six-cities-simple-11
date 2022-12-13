import { MAX_IMAGES_COUNT } from '../../consts/consts';
import PropertyGalleryItem from './property-gallery-item';

type PropertyGalleryProps = {
  images: string[];
}

function PropertyGallery({images}:PropertyGalleryProps):JSX.Element{
  const imagesToShow = images.slice(0, MAX_IMAGES_COUNT);

  return(
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {imagesToShow.map((image)=><PropertyGalleryItem key={image} image={image}/>)}
      </div>
    </div>
  );
}

export default PropertyGallery;
