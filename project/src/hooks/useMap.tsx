import { Map, TileLayer } from 'leaflet';
import { MutableRefObject, useRef, useState, useEffect } from 'react';
import { LAYER_ATTRIBUTION, LAYER_URL } from '../consts';
import City from '../types/city';

function useMap (
  mapRef: MutableRefObject<HTMLElement|null>,
  city: City
): Map|null {
  const [map, setMap] = useState<Map|null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(()=>{
    if(mapRef.current !== null && !isRenderedRef.current){
      const instance = new Map(mapRef.current,{
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude
        },
        zoom: city.location.zoom
      });

      const layer = new TileLayer(LAYER_URL, {attribution:LAYER_ATTRIBUTION});
      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  },[mapRef, city]);

  return map;
}

export default useMap;
