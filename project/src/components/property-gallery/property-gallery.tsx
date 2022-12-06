import PropertyGalleryItem from './property-gallery-item';

type PropertyGalleryProps = {
  images: string[];
}

function PropertyGallery({images}:PropertyGalleryProps):JSX.Element{
  return(
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {images.map((image)=><PropertyGalleryItem key={image} image={image}/>)}
      </div>
    </div>
  );
}

export default PropertyGallery;
