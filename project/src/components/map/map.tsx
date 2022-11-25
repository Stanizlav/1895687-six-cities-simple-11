import { City } from '../../types/city';
import { Location } from '../../types/location';
import { useEffect, useRef } from 'react';
import { Icon, Marker } from 'leaflet';
import useMap from '../../hooks/useMap';
import { MapMarkerUrl } from '../../consts';
import 'leaflet/dist/leaflet.css';
import { getLatLng } from '../../utils/convert-location';

const MARKER_SIZE = 40;
const MARKER_HALF_SIZE = Math.round(MARKER_SIZE / 2);

type MapProps = {
  city: City;
  points: Location[];
  selectedPoint?: Location;
  className: string;
}

const defaultIcon = new Icon({
  iconUrl: MapMarkerUrl.Default,
  iconSize: [MARKER_SIZE, MARKER_SIZE],
  iconAnchor: [MARKER_HALF_SIZE, MARKER_SIZE]
});

const currentIcon = new Icon({
  iconUrl: MapMarkerUrl.Current,
  iconSize: [MARKER_SIZE, MARKER_SIZE],
  iconAnchor: [MARKER_HALF_SIZE, MARKER_SIZE]
});

function Map({city, points, selectedPoint, className}: MapProps):JSX.Element{

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if(map){
      points.forEach((point) => {
        new Marker(getLatLng(point),{
          icon: (selectedPoint !== undefined && point.latitude === selectedPoint.latitude && point.longitude === selectedPoint.longitude)
            ? currentIcon
            : defaultIcon
        }).addTo(map);
      });
      map.flyTo(getLatLng(city.location));
    }
  }, [map, points, city, selectedPoint]);

  return <section className={className} ref={mapRef}></section>;
}

export default Map;
