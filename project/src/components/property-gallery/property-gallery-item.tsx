type ProperttyGalleryItemProps = {
  image:string;
}

function ProperttyGalleryItem({image}:ProperttyGalleryItemProps):JSX.Element{
  return(
    <div className="property__image-wrapper">
      <img className="property__image" src={image} alt="Apartment"/>
    </div>
  );
}

export default ProperttyGalleryItem;
