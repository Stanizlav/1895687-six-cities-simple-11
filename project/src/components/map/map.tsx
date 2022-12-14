import City from '../../types/city';
import Location from '../../types/location';
import { useEffect, useRef } from 'react';
import { Icon, LayerGroup, Marker } from 'leaflet';
import useMap from '../../hooks/use-map';
import { MapMarkerUrl, MarkerSize } from '../../consts/consts';
import 'leaflet/dist/leaflet.css';
import { arePointsEqual, getLatLng } from '../../utils/location-utils';
import { useAppSelector } from '../../hooks/store-hooks';
import { getSelectedPoint } from '../../store/application-process/selectors';

const defaultIcon = new Icon({
  iconUrl: MapMarkerUrl.Default,
  iconSize: [MarkerSize.Full, MarkerSize.Full],
  iconAnchor: [MarkerSize.Half, MarkerSize.Full]
});

const currentIcon = new Icon({
  iconUrl: MapMarkerUrl.Current,
  iconSize: [MarkerSize.Full, MarkerSize.Full],
  iconAnchor: [MarkerSize.Half, MarkerSize.Full]
});

type MapProps = {
  city: City;
  points: Location[];
  className?: string;
  standingOutPoint?: Location;
}

function Map({city, points, className = '', standingOutPoint}: MapProps):JSX.Element{

  const selectedPoint = useAppSelector(getSelectedPoint);
  const highlightedPoint = standingOutPoint ?? selectedPoint;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const layerGroupRef = useRef(new LayerGroup());
  const classList = `${className} map`;

  useEffect(() => {
    const layerGroup = layerGroupRef.current;
    if(map){
      points.forEach((point) => {
        new Marker(getLatLng(point),{
          icon: (arePointsEqual(point, highlightedPoint))
            ? currentIcon
            : defaultIcon
        }).addTo(layerGroup);
      });
      layerGroup.addTo(map);
      map.flyTo(getLatLng(city.location));
    }
    return ()=>{
      layerGroup.clearLayers();
    };
  }, [map, points, city, highlightedPoint]);

  return <section className={classList} ref={mapRef}></section>;
}

export default Map;
