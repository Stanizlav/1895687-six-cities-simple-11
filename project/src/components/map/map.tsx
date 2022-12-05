import City from '../../types/city';
import Location from '../../types/location';
import { useEffect, useRef } from 'react';
import { Icon, LayerGroup, Marker } from 'leaflet';
import useMap from '../../hooks/useMap';
import { MapMarkerUrl } from '../../consts';
import 'leaflet/dist/leaflet.css';
import { arePointsEqual, getLatLng } from '../../utils/location-utils';
import { useAppSelector } from '../../hooks/store-hooks';
import { getSelectedPoint } from '../../store/application-process/selectors';

const MARKER_SIZE = 40;
const MARKER_HALF_SIZE = Math.round(MARKER_SIZE / 2);

type MapProps = {
  city: City;
  points: Location[];
  className?: string;
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

function Map({city, points, className = ''}: MapProps):JSX.Element{

  const selectedPoint = useAppSelector(getSelectedPoint);
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const layerGroupRef = useRef(new LayerGroup());
  const classList = `${className} map`;

  useEffect(() => {
    if(map){
      layerGroupRef.current.clearLayers();
      points.forEach((point) => {
        new Marker(getLatLng(point),{
          icon: (selectedPoint !== undefined && arePointsEqual(point, selectedPoint))
            ? currentIcon
            : defaultIcon
        }).addTo(layerGroupRef.current);
      });
      layerGroupRef.current.addTo(map);
      map.flyTo(getLatLng(city.location));
    }
  }, [map, points, city, selectedPoint]);

  return <section className={classList} ref={mapRef}></section>;
}

export default Map;
