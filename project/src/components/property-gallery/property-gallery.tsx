type PropertyGalleryProps = {
  images: string[];
}

function PropertyGallery({images}:PropertyGalleryProps):JSX.Element{
  return(
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {images.map((image)=>(
          <div key={image} className="property__image-wrapper">
            <img className="property__image" src={image} alt="Apartment"/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyGallery;
