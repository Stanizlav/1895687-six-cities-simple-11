import { City } from '../../types/city';
import { Point } from '../../types/point';
import { useEffect, useRef } from 'react';
import { Icon, Marker } from 'leaflet';
import useMap from '../../hooks/useMap';
import { MapMarkerUrl } from '../../consts';
import 'leaflet/dist/leaflet.css';

const MARKER_SIZE = 40;
const MARKER_HALF_SIZE = Math.round(MARKER_SIZE / 2);

type MapProps = {
  city: City;
  points: Point[];
  selectedPoint?: Point | undefined;
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

function Map({city, points, selectedPoint}: MapProps):JSX.Element{

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if(map){
      points.forEach((point) => {
        new Marker({lat:point.lat, lng: point.lng},{
          icon: (selectedPoint !== undefined && point.lat === selectedPoint.lat && point.lng === selectedPoint.lng)
            ? currentIcon
            : defaultIcon
        }).addTo(map);
      });
    }
  }, [map, points, selectedPoint]);

  return <section className="cities__map map" ref={mapRef}></section>;
}

export default Map;
